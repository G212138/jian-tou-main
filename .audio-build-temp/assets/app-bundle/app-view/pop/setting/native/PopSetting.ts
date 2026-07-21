import { _decorator, Node, Sprite, SpriteFrame } from 'cc';
import BaseView from 'db://app/base/BaseView';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';

const { ccclass, property } = _decorator;
@ccclass('PopSetting')
export class PopSetting extends BaseView {

    @property(Node) effect: Node = null;
    @property(Node) music: Node = null;
    @property(Node) vibrate: Node = null;
    @property(Node) colorArrow: Node = null;

    @property(SpriteFrame)
    On: SpriteFrame = null;
    @property(SpriteFrame)
    Off: SpriteFrame = null;

    @property(Node) homeButton: Node = null;

    @property(Node) settingLayout: Node = null;
    
    // 初始化的相关逻辑写在这
    onLoad() {
      
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        if (app.manager.sound.isEffectMute) {
            this.effect.getComponent(Sprite).spriteFrame = this.Off;
        } else {
            this.effect.getComponent(Sprite).spriteFrame = this.On;
        }
        if (app.manager.sound.isMusicMute) {
            this.music.getComponent(Sprite).spriteFrame = this.Off;
        } else {
            this.music.getComponent(Sprite).spriteFrame = this.On;
        }
        if (app.manager.vibrate.isVibrateMute) {
            this.vibrate.getComponent(Sprite).spriteFrame = this.Off;
        } else {
            this.vibrate.getComponent(Sprite).spriteFrame = this.On;
        }

        //本地读取是否是彩色箭头
        let isColorArrow = app.manager.globaldata.getIsColorArrow();
        if (isColorArrow) {
            this.colorArrow.getComponent(Sprite).spriteFrame = this.On;
        } else {
            this.colorArrow.getComponent(Sprite).spriteFrame = this.Off;
        }

        //判断是否是首页
        if (params.isHome) {
            this.homeButton.active = false;

        }else{
            this.homeButton.active = true;
        }
        
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PaperHomeSetting>({name: 'PaperHomeSetting', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    effect_click() {
        if (app.manager.sound.isEffectMute) {
            app.manager.sound.setEffectMute(false, true);
            this.effect.getComponent(Sprite).spriteFrame = this.On;
        } else {
            app.manager.sound.setEffectMute(true, true);
            this.effect.getComponent(Sprite).spriteFrame = this.Off;
        }

    }

    music_click() {
        if (app.manager.sound.isMusicMute) {
            app.manager.sound.setMusicMute(false, true);
            this.music.getComponent(Sprite).spriteFrame = this.On;
        } else {
            app.manager.sound.setMusicMute(true, true);
            this.music.getComponent(Sprite).spriteFrame = this.Off;
        }
    }

    vibrate_click() {
        if (app.manager.vibrate.isVibrateMute) {
            app.manager.vibrate.setVibrateMute(false);
            app.manager.vibrate.playVibrate();
            this.vibrate.getComponent(Sprite).spriteFrame = this.On;
        } else {
            app.manager.vibrate.setVibrateMute(true);
            this.vibrate.getComponent(Sprite).spriteFrame = this.Off;
        }

    }

    colorArrow_click() {
        if (app.manager.globaldata.getIsColorArrow()) {
            app.manager.globaldata.setIsColorArrow(false);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.Off;
        } else {
            app.manager.globaldata.setIsColorArrow(true);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.On;
        }

        //触发一次事件
        app.manager.event.emit(app.config.eventname.colorArrowChange);
    }

    back_level_click() {
        app.manager.ui.show({name: 'PageHome'});
        // 报告退出关卡事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.EXIT,
        });
        this.hide();
    }

    //重玩游戏
    restart_click() {
       //判断体力是否足够
        if(app.store.game.tili < 1){
            //展示体力不足的弹窗
            // app.manager.ui.showToast('体力不足');
            // 展示体力不足的弹窗
            app.manager.ui.show({name: 'PopResult',data: {TiLiDialog: true}});
            // 报告失败事件
            app.manager.report.reportEvent({
                levelID: app.store.game.level,
                levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                levelResult: LevelResultType.RETRY,
                externInfo: {
                    failType: 'NoTiLi',
                },
            });
            return;
        }
        app.store.game.setTiLi(app.store.game.getTiLi() - 1);
        app.manager.sound.resumeMusic();
        // 触发重新开始事件
        app.manager.event.emit(app.config.eventname.restart);
        // 报告成功事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.RETRY,
        });
        // 关闭弹窗
        this.hide();
    }
}