import { _decorator, Color, EventTouch, Graphics, Label, Node, ProgressBar, Sprite, tween, UITransform, UIOpacity } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { PopSetting } from '../../../pop/setting/native/PopSetting';
import { LevelActionType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { i18n } from 'db://assets/app/i18n';
import type { UnfinishedGameSnapshot } from 'db://assets/app/game.resume';
import { RopeManager } from './expansion/RopeManager';
import { Time } from './expansion/Time';
import { gameHeartManager } from './expansion/gameHeartManager';
import { TouchZoomPan } from './expansion/TouchZoomPan';
const { ccclass, property } = _decorator;
@ccclass('PageMain')
export class PageMain extends BaseView {

    @property({type: Node})
    private settingBtn: Node = null;

    //关卡显示
    @property({type: Label})
    private level: Label = null;

    @property({type: Node})
    private errorFlash: Node = null;

    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = [];

    private playTimes: number = 0;

    private levelProgress: ProgressBar = null;
    private levelProgressGraphics: Graphics = null;

    // 初始化的相关逻辑写在这
    onLoad() {
        app.manager.event.on(app.config.eventname.errorFlash, this.onErrorFlash, this);
        // 播放钢琴音效
        app.manager.event.on(app.config.eventname.playPianoSound, this.onPlayPianoSound, this);
        app.manager.event.on(app.config.eventname.ropeProgressChanged, this.onRopeProgressChanged, this);
        app.manager.event.on(app.config.eventname.themeChanged, this.applyTheme, this);
        app.manager.event.on(app.config.eventname.restart, this.updateTransformFeatureVisibility, this);
        const levelProgressNode = this.node.getChildByPath('UI/LevelProgress');
        this.levelProgress = levelProgressNode?.getComponent(ProgressBar) ?? null;
        // 独立子节点避免与默认 Sprite 共用节点时发生 UI 渲染组件冲突。
        let dividerGraphicsNode = levelProgressNode?.getChildByName('DividerGraphics') ?? null;
        if (levelProgressNode && !dividerGraphicsNode) {
            dividerGraphicsNode = new Node('DividerGraphics');
            dividerGraphicsNode.layer = levelProgressNode.layer;
            dividerGraphicsNode.parent = levelProgressNode;
            dividerGraphicsNode.addComponent(UITransform).setContentSize(
                levelProgressNode.parent?.getComponent(UITransform)?.contentSize.width ?? 750,
                16,
            );
        }
        this.levelProgressGraphics = dividerGraphicsNode?.getComponent(Graphics)
            ?? dividerGraphicsNode?.addComponent(Graphics)
            ?? null;
        // 隐藏引擎默认的带边框贴图，改用圆头细线绘制分割式进度条。
        const progressTrackSprite = levelProgressNode?.getComponent(Sprite);
        const progressBarSprite = levelProgressNode?.getChildByName('Bar')?.getComponent(Sprite);
        if (progressTrackSprite) progressTrackSprite.enabled = false;
        if (progressBarSprite) progressBarSprite.enabled = false;

        const zoomSliderNode = this.node.getChildByPath('UI/ZoomSlider');
        this.bindZoomIconHitAreas(zoomSliderNode);
        this.bindBackButtonFromPrefab();
        this.onRopeProgressChanged(
            app.manager.globaldata.getEscapeRopeCount(),
            app.manager.globaldata.getRopeCount(),
        );
        this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);
        this.applyTheme();
        this.updateTransformFeatureVisibility();

        bindStore(this.level, 'string', () => {
            return i18n.t('level.main', { level: app.store.game.level });
        });

        app.manager.sound.playMusic({
            name:'music/bgm',
            volume:0.7,
            force:false
        });

        //监听restart
        // app.manager.event.on(app.config.eventname.restart, this.onRestart, this);
       

    }

    onRestart(){
        // 报告进入关卡事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.ENTER,
        });
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        i18n.apply(this.node);
        this.applyTheme();
        this.updateTransformFeatureVisibility();
        this.showMiniViews({ views: this.miniViews });
        //判断是不是创意关卡来的
        if(params && params.isSpecialLevel){
            // 绑定关卡显示
            this.level.string = params.name;
        }
        // 报告进入关卡事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.ENTER,
        });
        this.scheduleResumeSessionConsumption();

    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PageMain>({name: 'PageMain', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    // 设置按钮点击事件
    private onClickSetting() {
        if(app.manager.globaldata.getAlreadyDrawRopeCount()
            + app.manager.globaldata.getEscapeRopeCount()
            < app.manager.globaldata.getRopeCount()){
            // 还没有绘制完绳子，不能打开设置
            app.manager.ui.showToast(i18n.t('toast.drawing'));
            return;
        }
        app.manager.ui.show<PopSetting>({name: 'PopSetting', data: {isHome: false}});
    }

    /** 绑定 PageMain 预制体上已挂载的返回按钮，代码不再动态创建界面节点。 */
    private bindBackButtonFromPrefab(): void {
        const buttonNode = this.node.getChildByPath('UI/BackButton');
        if (!buttonNode) {
            console.warn('[PageMain] PageMain.prefab 缺少 UI/BackButton');
            return;
        }
        if (!buttonNode.getComponent(Sprite)) {
            console.warn('[PageMain] UI/BackButton 缺少图片组件');
        }
    }

    /** 点击返回时保存未完成进度、暂停计时并直接切换到首页。 */
    public onClickBack(): void {
        this.saveUnfinishedGameSnapshot();
        app.manager.globaldata.setSkipAutoResumeOnce(true);
        app.manager.event.emit(app.config.eventname.pauseCountDown);
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel
                ? LevelActionType.CREATIVE_LEVEL
                : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.EXIT,
        });
        app.manager.ui.show({name: 'PageHome'});
    }

    /** 从当前箭头、倒计时和生命组件生成完整断点，并持久化到本地。 */
    private saveUnfinishedGameSnapshot(): boolean {
        const ropeManager = this.node.getComponentInChildren(RopeManager);
        const remainingLevelConfig = ropeManager?.getRemainingLevelConfig();
        const originalLevelConfig = ropeManager?.getOriginalLevelConfig();
        const totalRopeCount = app.manager.globaldata.getRopeCount();

        if (!remainingLevelConfig || !originalLevelConfig
            || remainingLevelConfig.ropes.length === 0 || totalRopeCount <= 0) {
            app.lib.storage.remove(app.config.localkey.UnfinishedGame);
            app.manager.globaldata.setPendingResumeSession(null);
            return false;
        }

        const time = this.node.getComponentInChildren(Time);
        const hearts = this.node.getComponentInChildren(gameHeartManager);
        const escapedRopeCount = Math.max(
            app.manager.globaldata.getEscapeRopeCount(),
            totalRopeCount - remainingLevelConfig.ropes.length,
        );
        const snapshot: UnfinishedGameSnapshot = {
            version: 1,
            level: app.store.game.getLevel(),
            isSpecialLevel: app.manager.globaldata.getIsSpecialLevel(),
            specialLevelIndex: app.manager.globaldata.getSpecialLevelIndex(),
            levelName: this.level.string,
            remainingLevelConfig,
            originalLevelConfig,
            totalRopeCount,
            escapedRopeCount: Math.min(totalRopeCount, escapedRopeCount),
            remainingSeconds: time?.getRemainingSeconds() ?? 8 * 60,
            heartNum: hearts?.getHeartNum() ?? 3,
            savedAt: Date.now(),
        };

        app.lib.storage.set(app.config.localkey.UnfinishedGame, snapshot);
        return true;
    }

    /** 恢复页稳定运行后消费持久化快照，避免关卡结束后再次加载旧断点。 */
    private scheduleResumeSessionConsumption(): void {
        const resumeSession = app.manager.globaldata.getPendingResumeSession();
        if (!resumeSession) return;

        this.scheduleOnce(() => this.clearConsumedResumeSession(resumeSession), 1.2);
    }

    /** 仅清理当前已消费的快照，若期间产生了新快照则保留新数据。 */
    private clearConsumedResumeSession(resumeSession: UnfinishedGameSnapshot): void {
        const savedSession = app.lib.storage.get(app.config.localkey.UnfinishedGame) as UnfinishedGameSnapshot;
        if (savedSession?.savedAt === resumeSession.savedAt) {
            app.lib.storage.remove(app.config.localkey.UnfinishedGame);
        }
        if (app.manager.globaldata.getPendingResumeSession()?.savedAt === resumeSession.savedAt) {
            app.manager.globaldata.setPendingResumeSession(null);
        }
    }

    private onErrorFlash(){
        // 错误闪烁 0.5秒闪烁一次
        this.errorFlash.active = true;
        let opacity = this.errorFlash.getComponent(UIOpacity);
        opacity.opacity = 255;
        tween(opacity)
            .to(1, {opacity: 0})    
            .call(() => {
                this.errorFlash.active = false;
            })
            .start();
    }

    // 播放钢琴音效
    private onPlayPianoSound(){
        //当playtime为0-6时，播放ABCDEFG
        if(this.playTimes %7 === 0){
            app.manager.sound.playEffect({name:'effect/piano/A'});
        }else if(this.playTimes %7 === 1){
            app.manager.sound.playEffect({name:'effect/piano/B'});
        }else if(this.playTimes %7 === 2){
            app.manager.sound.playEffect({name:'effect/piano/C'});
        }else if(this.playTimes %7 === 3){
            app.manager.sound.playEffect({name:'effect/piano/D'});
        }else if(this.playTimes %7 === 4){
            app.manager.sound.playEffect({name:'effect/piano/E'});
        }else if(this.playTimes %7 === 5){
            app.manager.sound.playEffect({name:'effect/piano/F'});
        }else if(this.playTimes %7 === 6){
            app.manager.sound.playEffect({name:'effect/piano/G'});
        }
        this.playTimes++;
    }

    /** 根据本关已消除箭头数，实时刷新顶部进度条。 */
    private onRopeProgressChanged(escapedCount: number, totalCount: number): void {
        if (!this.levelProgress) {
            return;
        }

        const progress = totalCount > 0 ? escapedCount / totalCount : 0;
        this.levelProgress.progress = Math.min(1, Math.max(0, progress));
        this.drawLevelProgressDivider(this.levelProgress.progress);
    }

    /** 绘制兼具区域分割作用的圆头细线进度条。 */
    private drawLevelProgressDivider(progress: number): void {
        const graphics = this.levelProgressGraphics;
        if (!graphics) return;

        const isDarkMode = app.manager.globaldata.getIsDarkMode();
        const trackColor = isDarkMode
            ? new Color(53, 59, 85, 255)
            : new Color(193, 201, 220, 255);
        const fillColor = isDarkMode
            ? new Color(170, 183, 244, 255)
            : new Color(113, 132, 216, 255);
        // 使用 UI 容器当前宽度，保证不同屏幕尺寸下分割线始终横向铺满。
        const progressNode = graphics.node.parent;
        const totalWidth = progressNode?.parent?.getComponent(UITransform)?.contentSize.width
            ?? progressNode?.getComponent(UITransform)?.contentSize.width
            ?? 750;
        const startX = -totalWidth * 0.5;
        const clampedProgress = Math.min(1, Math.max(0, progress));

        graphics.clear();
        graphics.lineCap = Graphics.LineCap.ROUND;
        graphics.strokeColor = trackColor;
        graphics.lineWidth = 5;
        graphics.moveTo(startX, 0);
        graphics.lineTo(startX + totalWidth, 0);
        graphics.stroke();

        if (clampedProgress <= 0) return;
        graphics.strokeColor = fillColor;
        graphics.lineWidth = 8;
        graphics.moveTo(startX, 0);
        graphics.lineTo(startX + totalWidth * clampedProgress, 0);
        graphics.stroke();
    }

    /** 绑定预制体里的左右放大镜热区，并拦截事件避免误操作中间滑轨。 */
    private bindZoomIconHitAreas(zoomSliderNode: Node | null): void {
        const zoomOutHitArea = zoomSliderNode?.getChildByName('ZoomOutHitArea');
        const zoomInHitArea = zoomSliderNode?.getChildByName('ZoomInHitArea');
        if (!zoomOutHitArea || !zoomInHitArea) {
            console.warn('[PageMain] PageMain.prefab 缺少缩放放大镜点击热区');
            return;
        }

        zoomOutHitArea.on(Node.EventType.TOUCH_START, this.stopZoomIconTouch, this);
        zoomOutHitArea.on(Node.EventType.TOUCH_MOVE, this.stopZoomIconTouch, this);
        zoomOutHitArea.on(Node.EventType.TOUCH_END, this.onClickZoomOut, this);
        zoomOutHitArea.on(Node.EventType.TOUCH_CANCEL, this.stopZoomIconTouch, this);
        zoomInHitArea.on(Node.EventType.TOUCH_START, this.stopZoomIconTouch, this);
        zoomInHitArea.on(Node.EventType.TOUCH_MOVE, this.stopZoomIconTouch, this);
        zoomInHitArea.on(Node.EventType.TOUCH_END, this.onClickZoomIn, this);
        zoomInHitArea.on(Node.EventType.TOUCH_CANCEL, this.stopZoomIconTouch, this);
    }

    /** 阻止放大镜点击继续冒泡给 Slider，避免点击图标时滑块跳到边缘。 */
    private stopZoomIconTouch(event: EventTouch): void {
        event.propagationStopped = true;
    }

    /** 点击左侧减号放大镜时缩小一档。 */
    private onClickZoomOut(event: EventTouch): void {
        this.stopZoomIconTouch(event);
        this.node.getComponentInChildren(TouchZoomPan)?.stepZoom(-0.1);
    }

    /** 点击右侧加号放大镜时放大一档。 */
    private onClickZoomIn(event: EventTouch): void {
        this.stopZoomIconTouch(event);
        this.node.getComponentInChildren(TouchZoomPan)?.stepZoom(0.1);
    }

    /** 普通第一关隐藏缩放条，其他主线关卡和创意关卡正常显示。 */
    private updateTransformFeatureVisibility(): void {
        const zoomSlider = this.node.getChildByPath('UI/ZoomSlider');
        if (!zoomSlider) return;

        const isNormalFirstLevel = !app.manager.globaldata.getIsSpecialLevel()
            && app.store.game.getLevel() === 1;
        zoomSlider.active = !isNormalFirstLevel;
    }

    /** 按参考图配色切换游戏背景、顶栏、进度条和底部工具区域。 */
    private applyTheme(): void {
        const isDarkMode = app.manager.globaldata.getIsDarkMode();
        const pageBackgroundColor = isDarkMode
            ? new Color(42, 46, 68, 255)
            : new Color(226, 232, 245, 255);
        const arrowAreaColor = isDarkMode
            ? new Color(30, 32, 45, 255)
            : new Color(247, 248, 243, 255);
        const primaryColor = isDarkMode
            ? new Color(171, 183, 244, 255)
            : new Color(17, 20, 51, 255);
        const mutedColor = isDarkMode
            ? new Color(64, 70, 104, 255)
            : new Color(207, 213, 246, 255);
        const navigationButtonBackgroundColor = isDarkMode
            ? new Color(58, 65, 99, 255)
            : new Color(211, 219, 246, 255);
        const navigationButtonIconColor = isDarkMode
            ? new Color(190, 200, 248, 255)
            : new Color(58, 69, 122, 255);
        const countdownPanelColor = isDarkMode
            ? new Color(53, 59, 88, 255)
            : new Color(213, 221, 244, 255);
        const zoomTrackColor = isDarkMode
            ? new Color(59, 65, 92, 255)
            : new Color(36, 42, 74, 255);
        const zoomHandleColor = isDarkMode
            ? new Color(132, 147, 226, 255)
            : new Color(244, 174, 45, 255);
        const zoomIconColor = isDarkMode
            ? new Color(171, 183, 244, 255)
            : new Color(36, 42, 74, 255);

        // 外层背景与箭头区域保留轻微色差，让上下功能区和棋盘区更容易辨认。
        this.setSpriteColor(this.node.getChildByName('bg'), pageBackgroundColor);
        this.setSpriteColor(this.node.getChildByPath('zezao/Bg'), arrowAreaColor);
        this.setLabelColor(this.node.getChildByPath('UI/levelinfo/level'), primaryColor);
        this.setLabelColor(this.node.getChildByPath('UI/levelinfo/CountdownPanel/daojishi'), primaryColor);
        // 倒计时底框和秒表使用独立主题色，保证信息清晰但不会抢过关卡与生命区域的视觉焦点。
        this.setSpriteColor(this.node.getChildByPath('UI/levelinfo/CountdownPanel'), countdownPanelColor);
        this.setSpriteColor(this.node.getChildByPath('UI/levelinfo/CountdownPanel/Stopwatch'), primaryColor);
        // 返回、设置按钮共用导航按钮主题色，底板和图标分别着色以保证两种模式下都有清晰对比。
        this.setSpriteColor(this.node.getChildByPath('UI/BackButton'), navigationButtonBackgroundColor);
        this.setSpriteColor(this.node.getChildByPath('UI/BackButton/Arrow'), navigationButtonIconColor);
        this.setSpriteColor(this.node.getChildByPath('UI/setting'), navigationButtonBackgroundColor);
        this.setSpriteColor(this.node.getChildByPath('UI/setting/Gear'), navigationButtonIconColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/Panel'), pageBackgroundColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/Track'), zoomTrackColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/Handle'), zoomHandleColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/ZoomOutHitArea'), zoomIconColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/ZoomInHitArea'), zoomIconColor);
        this.drawLevelProgressDivider(this.levelProgress?.progress ?? 0);
        this.setSpriteColor(this.node.getChildByPath('UI/daoJu/btn_tips'), mutedColor);
        this.setSpriteColor(this.node.getChildByPath('UI/daoJu/btn_hammer'), mutedColor);
    }

    /** 安全设置节点精灵颜色，节点不存在时跳过。 */
    private setSpriteColor(node: Node | null, color: Color): void {
        const sprite = node?.getComponent(Sprite);
        if (sprite) sprite.color = color;
    }

    /** 安全设置节点文字颜色，节点不存在时跳过。 */
    private setLabelColor(node: Node | null, color: Color): void {
        const label = node?.getComponent(Label);
        if (label) label.color = color;
    }

    protected onDestroy(): void {
        app.manager.event.off(app.config.eventname.errorFlash, this.onErrorFlash, this);
        app.manager.event.off(app.config.eventname.playPianoSound, this.onPlayPianoSound, this);
        app.manager.event.off(app.config.eventname.ropeProgressChanged, this.onRopeProgressChanged, this);
        app.manager.event.off(app.config.eventname.themeChanged, this.applyTheme, this);
        app.manager.event.off(app.config.eventname.restart, this.updateTransformFeatureVisibility, this);
    }
}
