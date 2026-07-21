import { _decorator, instantiate, Node, Prefab, TextAsset } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { app } from 'db://assets/app/app';
import { spLevelItem } from './expansion/spLevelItem';
import { PageHome } from '../../home/native/PageHome';
const { ccclass, property } = _decorator;

export enum LevelStatus {
    Unlock = 0,
    Challenge = 1,
    Complete = 2,
}

@ccclass('PageSpLevel')
export class PageSpLevel extends BaseView {
    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = [];

    @property(Prefab)
    private levelItemPrefab: Prefab = null;

    @property(Node)
    private levelItemContainer: Node = null;

    @property(Node)
    private homeNode: Node = null;

    //关卡名字存储在配置文件改动太大，直接coding在这里，和datamap中注意匹配
    private levelNames: string[] = [
        "米奇头",
        "猫",
        "呆呆",
        "圣诞树",
        "圣诞袜",
        "菠萝",
        "太空人",
        "糖果",
        "小蜜蜂",
        "冰淇淋",
        "花朵",
        "企鹅",
        "摇摇马",
        "剪刀",
        "螃蟹",
        "手柄",
        "姜饼人",
        "狐狸",
        "金鱼",
        "兔子",
        "脚掌",
        "兔子",
        "城堡",
        "蝴蝶结",
        "福",
        "大黄鸭",
        "伞",
        "天鹅",
         "玩偶",
        "LABUBU",
        
    ];
    //还需要本地记录关卡的状态，分为 已完成 待挑战 未解锁
    private levelStatus: LevelStatus[] = [];
    //初始化关卡状态
    private initLevelStatus() {
        // 从本地存储中读取关卡状态配置
        const savedLevelStatus = app.lib.storage.get(app.config.localkey.LEVEL_STATUS_KEY);
        
        if (savedLevelStatus) {
            // 如果有保存的状态，解析并赋值
            const parsedStatus = JSON.parse(savedLevelStatus) as LevelStatus[];
            // 确保解析后的数组长度与关卡数量一致
            this.levelStatus = parsedStatus.slice(0, this.levelNames.length);
            
            // 如果解析后的数组长度不足，补充默认状态
            while (this.levelStatus.length < this.levelNames.length) {
                this.levelStatus.push(LevelStatus.Unlock);
            }
        } else {
            // 如果没有保存的状态，初始化默认状态
            for (let i = 0; i < this.levelNames.length; i++) {
                if (i === 0) {
                    // 第一个关卡设置为待挑战状态
                    this.levelStatus.push(LevelStatus.Challenge);
                } else {
                    // 其他关卡设置为未解锁状态
                    this.levelStatus.push(LevelStatus.Unlock);
                }
            }
            // 保存默认状态到本地存储
            this.saveLevelStatus();
        }

    }
    
    //保存关卡状态到本地存储
    private saveLevelStatus() {
        app.lib.storage.set(app.config.localkey.LEVEL_STATUS_KEY, JSON.stringify(this.levelStatus));
    }


    // 初始化的相关逻辑写在这
    onLoad() {
        //监听更新关卡状态事件
        app.manager.event.on(app.config.eventname.UpdateSPLevelStatus, this.onUpdateLevelStatus, this);
    }
    //更新关卡状态
    private onUpdateLevelStatus(levelIndex: number, status: LevelStatus) {
        if (levelIndex >= 0 && levelIndex < this.levelStatus.length) {
            this.levelStatus[levelIndex] = status;
            
            // 刷新当前关卡的显示
            const currentLevelItem = this.levelItemContainer.children[levelIndex];
            if (currentLevelItem) {
                const currentLevelItemComp = currentLevelItem.getComponent(spLevelItem);
                currentLevelItemComp.updateLevelStatus(status);
            }
            
            // 补充逻辑：当当前关卡完成且之前所有关卡都完成时，解锁下一关
            if (status === LevelStatus.Complete) {
                // 检查当前关卡之前的所有关卡是否都是 Complete 状态
                let allPreviousComplete = true;
                for (let i = 0; i < levelIndex; i++) {
                    if (this.levelStatus[i] !== LevelStatus.Complete) {
                        allPreviousComplete = false;
                        break;
                    }
                }
                
                // 如果所有之前的关卡都完成了，查找下一个处于 Unlock 状态的关卡
                if (allPreviousComplete) {
                    for (let nextLevelIndex = levelIndex + 1; nextLevelIndex < this.levelStatus.length; nextLevelIndex++) {
                        if (this.levelStatus[nextLevelIndex] === LevelStatus.Unlock) {
                            this.levelStatus[nextLevelIndex] = LevelStatus.Challenge;
                            // 刷新下一个关卡的显示
                            const nextLevelItem = this.levelItemContainer.children[nextLevelIndex];
                            const nextLevelItemComp = nextLevelItem.getComponent(spLevelItem);
                            nextLevelItemComp.updateLevelStatus(LevelStatus.Challenge);
                            break; // 找到第一个符合条件的关卡后退出循环
                        }
                    }
                }
            }
            
            this.saveLevelStatus();
        }
    }

    private setLevelConfigArrays(arr: string[]) {
        // console.log("setLevelConfigArrays: ", arr);
        this.levelItemContainer.removeAllChildren();
        //遍历创建对象
        for (let i = 0; i < arr.length; i++) {
            const levelConfig = app.manager.globaldata.CreateMapDataByStr(arr[i]);
            if (levelConfig) {
                //生成一个item的prefab，然后给赋值
                const levelItem = instantiate(this.levelItemPrefab);
                levelItem.parent = this.levelItemContainer;
                //给item赋值
                const levelItemComp = levelItem.getComponent(spLevelItem);
                levelItemComp.setLevelInfo(i, this.levelNames[i], this.levelStatus[i], levelConfig);
            }
        }

        // 检查是否存在前面所有关卡已完成，当前关卡未解锁的状态，如果有则自动解锁
        let needSave = false;
        for (let i = 1; i < this.levelStatus.length; i++) {
            // 检查当前关卡是否为未解锁状态
            if (this.levelStatus[i] === LevelStatus.Unlock) {
                // 检查当前关卡前面的所有关卡是否都已完成
                let allPreviousComplete = true;
                for (let j = 0; j < i; j++) {
                    if (this.levelStatus[j] !== LevelStatus.Complete) {
                        allPreviousComplete = false;
                        break;
                    }
                }
                
                // 如果前面所有关卡都已完成，则自动解锁当前关卡
                if (allPreviousComplete) {
                    this.levelStatus[i] = LevelStatus.Challenge;
                    
                    // 刷新当前关卡的显示
                    const levelItem = this.levelItemContainer.children[i];
                    if (levelItem) {
                        const levelItemComp = levelItem.getComponent(spLevelItem);
                        levelItemComp.updateLevelStatus(LevelStatus.Challenge);
                    }
                    
                    needSave = true;
                }
            }
        }
        
        // 如果有更新，保存关卡状态到本地存储
        if (needSave) {
            this.saveLevelStatus();
        }
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        this.showMiniViews({ views: this.miniViews });
        //初始化关卡状态
        this.initLevelStatus(); 
        this.homeNode.on(Node.EventType.TOUCH_END, ()=>{
            app.manager.ui.show<PageHome>({name: 'PageHome'});
        }, this);

        const loading = app.manager.ui.showLoading();
        //加载关卡数据
         app.manager.loader.load({
            path: '/mapdata',
            bundle: 'page-sp-level-res',
            type: TextAsset,
            onComplete: (asset) => {
                this.setLevelConfigArrays(JSON.parse(asset.text));
                app.manager.ui.hideLoading(loading);
            }
        });
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PageSpLevel>({name: 'PageSpLevel', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }
}