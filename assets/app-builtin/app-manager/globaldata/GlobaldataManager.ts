import { _decorator, instantiate, Label, Node, Prefab, TextAsset } from 'cc';
import BaseManager from '../../../../extensions/app/assets/base/BaseManager';
import { app } from 'db://assets/app/app';
import type { UnfinishedGameSnapshot } from 'db://assets/app/game.resume';
const { ccclass, property } = _decorator;

@ccclass('GlobaldataManager')
export class GlobaldataManager extends BaseManager {
    @property({ type: Prefab, tooltip: "格子预制体（用于绘制绳子路径）" })
    ceilPrefab: Prefab = null;

    private gridArray: boolean[][] = [];
    private pendingResumeSession: UnfinishedGameSnapshot | null = null;
    private skipAutoResumeOnce: boolean = false;
    // [无序] 加载完成时触发
    protected onLoad() {

        // 初始化是否需要新手引导
        this.needGuideOne = app.lib.storage.get(app.config.localkey.NeedGuideOne);
        if (this.needGuideOne == undefined || this.needGuideOne == null) {
            this.needGuideOne = true;
            this.setNeedGuideOne(true);
        }else{
            this.needGuideOne = this.needGuideOne as boolean;
        }
        
        this.needGuideTwo = app.lib.storage.get(app.config.localkey.NeedGuideTwo);
        if (this.needGuideTwo == undefined || this.needGuideTwo == null) {
            this.needGuideTwo = true;
            this.setNeedGuideTwo(true);
        }else{
            this.needGuideTwo = this.needGuideTwo as boolean;
        }       
        // 初始化是否是新用户
        this.newUser = app.lib.storage.get(app.config.localkey.NewUser);
        if (this.newUser == undefined || this.newUser == null) {
            this.newUser = true;
            this.setNewUser(true);
        }else{
            this.newUser = this.newUser as boolean;
        }

        // 初始化深色模式，首次进入时默认使用浅色模式。
        const savedDarkMode = app.lib.storage.get(app.config.localkey.IsDarkMode);
        this.isDarkMode = savedDarkMode === true;
        if (savedDarkMode === undefined || savedDarkMode === null) {
            this.setIsDarkMode(false);
        }
     }

    // [无序] 自身初始化完成, init执行完毕后被调用
    protected onInited() {
        this.initLevelConfigArrays();
        //启动一个定时器
        setTimeout(() => {
            this.setCanShowInterAd(true);
        }, 6 * 60 * 1000);
        //第一关需要启动
        this.startLevelTimeTimer();

        app.manager.event.on(app.config.eventname.restart, this.onRestart, this);
     }

    private onRestart(): void {
        this.startLevelTimeTimer();
        this.setAlreadyDrawRopeCount(0);
        this.setEscapeRopeCount(0);
    }

    protected onDestroy(): void {
        app.manager.event.off(app.config.eventname.restart, this.onRestart, this);
        this.stopLevelTimeTimer();
    }

    // [无序] 所有manager初始化完成
    protected onFinished() { }

    // [无序] 初始化manager，在初始化完成后，调用finish方法
    protected init(finish: Function) {
        this.initCeilNodePool();
        super.init(finish);
        
    }

    //初始化关卡配置数组
    private initLevelConfigArrays() {
         try {
            app.manager.loader.load({
                path: '/mapdata',
                bundle: 'page-main-res',
                type: TextAsset,
                onComplete: (asset) => {
                    this.setLevelConfigArrays(JSON.parse(asset.text));
                }
            });
            
        } catch (err) {
            console.error("RopeManager: 加载配置失败：", err);
        }
    }

    // 获取格子是否被占用的二维数组
    getGridArray() {
        return this.gridArray;
    }

    /** 暂存本次即将恢复的游戏快照，供关卡、计时器和生命组件共同读取。 */
    setPendingResumeSession(snapshot: UnfinishedGameSnapshot | null): void {
        this.pendingResumeSession = snapshot;
    }

    /** 获取本次即将恢复的游戏快照，不提前消费，避免多个组件只能有一个读到。 */
    getPendingResumeSession(): UnfinishedGameSnapshot | null {
        return this.pendingResumeSession;
    }

    /** 标记刚从游戏页返回首页，防止首页立即自动跳回未完成关卡。 */
    setSkipAutoResumeOnce(skip: boolean): void {
        this.skipAutoResumeOnce = skip;
    }

    /** 消费一次首页自动恢复抑制标记，应用重启后该内存标记会自然清空。 */
    consumeSkipAutoResumeOnce(): boolean {
        const shouldSkip = this.skipAutoResumeOnce;
        this.skipAutoResumeOnce = false;
        return shouldSkip;
    }

    // 设置格子是否被占用的二维数组
    setGridArray(array: boolean[][]) {
        this.gridArray = array;
    }

    private LevelConfigArrays: string[] = [];

    // 设置关卡配置数组
    setLevelConfigArrays(arr: string[]) {
        // console.log("setLevelConfigArrays: ", arr);
        this.LevelConfigArrays = arr;
    }

    // 获取关卡配置数组
    getLevelConfigArrays() {
        return this.LevelConfigArrays;
    }

    //获取指定关卡数据
    getLevelConfig(index: number) {
        //配置的关卡是从1开始的，我们这里需要减1
        index--;
        if (index < 0 || index >= this.LevelConfigArrays.length) {
            //如果超出关卡列表的时候，重复返回第400-500关的数据
            //计算索引：400-500关对应的索引是399-499
            index = 399 + (index % 100);
            //确保索引在有效范围内
            if (index >= this.LevelConfigArrays.length) {
                index = this.LevelConfigArrays.length - 1;
            }
        }
        return this.LevelConfigArrays[index];
    }

    //当前关卡有多少绳子
    ropeCount: number = 0;
    setRopeCount(count: number) {
        this.ropeCount = count;
    }
    getRopeCount() {
        return this.ropeCount;
    }

    //当前关卡已经绘制了多少绳子
    alreadyDrawRopeCount: number = 0;
    setAlreadyDrawRopeCount(count: number) {
        this.alreadyDrawRopeCount = count;
    }
    addAlreadyDrawRopeCount(count: number) {
        this.alreadyDrawRopeCount += count;
    }
    getAlreadyDrawRopeCount() {
        return this.alreadyDrawRopeCount;
    }

    //当前关卡已经逃逸了多少绳子
    escapeRopeCount: number = 0;
    setEscapeRopeCount(count: number) {
        this.escapeRopeCount = count;
        // 统一通知游戏界面刷新箭头消除进度，避免各类消除方式分别维护 UI。
        app.manager.event.emit(
            app.config.eventname.ropeProgressChanged,
            this.escapeRopeCount,
            this.ropeCount,
        );
    }
    addEscapeRopeCount(count: number) {
        this.escapeRopeCount += count;
        // 普通移出和锤子消除都会经过这里，因此两种方式都能实时更新进度条。
        app.manager.event.emit(
            app.config.eventname.ropeProgressChanged,
            this.escapeRopeCount,
            this.ropeCount,
        );
    }
    getEscapeRopeCount() {
        return this.escapeRopeCount;
    }

    //道具2 是否使用
    daojuHammerUse: boolean = false;
    setDaoJuHammerUse(use: boolean) {
        this.daojuHammerUse = use;
    }
    getDaoJuHammerUse() {
        return this.daojuHammerUse;
    }

    needGuideOne: boolean = false;
    setNeedGuideOne(v: boolean) {
        this.needGuideOne = v;
        app.lib.storage.set(app.config.localkey.NeedGuideOne, v);
    }
    getNeedGuideOne() {
        return app.lib.storage.get(app.config.localkey.NeedGuideOne) as boolean;
    }

    needGuideTwo: boolean = false;
    setNeedGuideTwo(v: boolean) {
        this.needGuideTwo = v;
        app.lib.storage.set(app.config.localkey.NeedGuideTwo, v);
    }
    getNeedGuideTwo() {
        return app.lib.storage.get(app.config.localkey.NeedGuideTwo) as boolean;
    }

    newUser: boolean = false;
    setNewUser(v: boolean) {
        this.newUser = v;
        app.lib.storage.set(app.config.localkey.NewUser, v);
    }
    getNewUser() {
        return app.lib.storage.get(app.config.localkey.NewUser) as boolean;
    }

     /**
    *  推荐组件参考代码
    *  核心由 pageManager实例 + openlink值 决定活动，开发者可根据下方代码自行适配
    */
    private recommendPageManager: any = null;
    /**
    *  游戏内提前加载推荐组件数据
    */
    public async loadRecommend(): Promise<boolean> {
        const runtime = globalThis as any;
        const platformApi = [runtime.TTMinis?.game, runtime.TTMinis, runtime.tt, runtime.wx]
            .find((api) => typeof api?.createPageManager === 'function');
        //@ts-ignore
        if (typeof platformApi?.createPageManager !== 'function') {
            return false;
        }
        //@ts-ignore
        this.recommendPageManager = platformApi.createPageManager();
        try {
            await this.recommendPageManager.load({
            openlink: 'TWFRCqV5WeM2AkMXhKwJ03MhfPOieJfAsvXKUbWvQFQtLyyA5etMPabBehga950uzfZcH3Vi3QeEh41xRGEVFw', // 推荐组件OPENLINK常量，直接复制即可，无需理解含义
            });
            return true;
        } catch (error) {
            this.recommendPageManager = null;
            console.warn('[GlobaldataManager] Failed to load recommend page', error);
            return false;
        }
    }

    /**
    *  拉起推荐组件
    */
    public async showRecommend() {
        console.log("showRecommend");
        if (!this.recommendPageManager) {
            await this.loadRecommend();
        }
        if (typeof this.recommendPageManager?.show !== 'function') {
            return false;
        }

        try {
            return await this.recommendPageManager.show();
        } catch (error) {
            console.warn('[GlobaldataManager] Failed to show recommend page', error);
            return false;
        }
    }


    //ceil的节点池
    private ceilNodePool: Node[] = [];
    initCeilNodePool() {
        //箭头长度一般小于15
        for (let i = 0; i < 15; i++) {
            const newNode = instantiate(this.ceilPrefab);
            //敲碎道具用到
            newNode.addComponent(Label);
            this.ceilNodePool.push(newNode);
        }
    }
    // 从节点池获取节点
    getCeilNode(): Node {
        if (this.ceilNodePool.length > 0) {
            return this.ceilNodePool.pop();
        }
        // 如果节点池为空，创建新节点
        const newNode = instantiate(this.ceilPrefab);
        newNode.addComponent(Label);
        return newNode;
    }
    // 将节点返回节点池
    returnCeilNode(node: Node) {
        this.ceilNodePool.push(node);
    }


    isColorArrow: boolean = false;
    setIsColorArrow(v: boolean) {   
        this.isColorArrow = v;
        app.lib.storage.set(app.config.localkey.isColorArrow, v);
    }
    getIsColorArrow() {
        return app.lib.storage.get(app.config.localkey.isColorArrow) as boolean;
    }

    private isDarkMode: boolean = false;

    /** 保存深色模式状态，供所有页面在重新进入时继续使用。 */
    setIsDarkMode(enabled: boolean): void {
        this.isDarkMode = enabled;
        app.lib.storage.set(app.config.localkey.IsDarkMode, enabled);
    }

    /** 获取当前深色模式状态。 */
    getIsDarkMode(): boolean {
        return this.isDarkMode;
    }


    //解析关卡数据
    //解析关卡配置
    public CreateMapDataByStr(data_str: string): Object {
        if (data_str.length < 1)
            return null;

        var arr = data_str.split(";");
        if (arr.length == 3) {
            var width = parseInt(arr[0]);
            var height = parseInt(arr[1]);
            var arrow_arr = new Array();
            var v_arr = arr[2].split("|");
            for (var i = 0; i < v_arr.length; i++) {
                var t_arr = v_arr[i].split(",");
                if (t_arr.length > 0) {
                    var path_arr = new Array();
                    for (var j = 0; j < t_arr.length; j++) {
                        var index = parseInt(t_arr[j]);
                        var x = Math.floor(index % width);
                        var y = Math.floor(index / width);
                        path_arr.push([x, y]);
                    }
                    arrow_arr.push(path_arr);
                }
            }

            return {
                grid_width: width,
                grid_height: height,
                ropes: arrow_arr,
            }
        }
        return null;
    }


    //创意关卡内容
    isSpecialLevel: boolean = false;
    setIsSpecialLevel(v: boolean) {
        this.isSpecialLevel = v;
    }
    getIsSpecialLevel() {
        return this.isSpecialLevel;
    }

    specialConfig: any = null;
    setSpecialConfig(v: any) {
        this.specialConfig = v;
    }
    getSpecialConfig() {
        return this.specialConfig;
    }

    //创意关卡的index
    specialLevelIndex: number = 0;
    setSpecialLevelIndex(v: number) {
        this.specialLevelIndex = v;
    }
    getSpecialLevelIndex() {
        return this.specialLevelIndex;
    }


    canShowInterAd: boolean = false;
    setCanShowInterAd(v: boolean) {
        this.canShowInterAd = v;
    }
    getCanShowInterAd() {
        return this.canShowInterAd;
    }

    // 关卡使用时间（秒）
    private levelTime: number = 0;
    private levelTimeTimer: ReturnType<typeof setInterval> | null = null;

    // 开始计时
    startLevelTimeTimer() {
        // 清除之前的定时器
        this.stopLevelTimeTimer();
        
        // 每秒增加1
        this.levelTimeTimer = setInterval(() => {
            this.levelTime++;
            // console.log("levelTime", this.levelTime);
        }, 1000);
    }

    // 停止计时
    stopLevelTimeTimer() {
        if (this.levelTimeTimer !== null) {
            clearInterval(this.levelTimeTimer);
            this.levelTimeTimer = null;
        }
        this.levelTime = 0;
    }

    // 重置计时
    resetLevelTime() {
        this.stopLevelTimeTimer();
        this.levelTime = 0;
    }

    // 获取关卡使用时间
    getLevelTime() {
        return this.levelTime;
    }

}
