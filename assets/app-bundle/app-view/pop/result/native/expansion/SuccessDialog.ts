import { _decorator, Button, Component, Label, Node, tween } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { platformService } from 'db://assets/app/platform';
import { i18n } from 'db://assets/app/i18n';
const { ccclass, property } = _decorator;

@ccclass('SuccessDialog')
export class SuccessDialog extends Component {

    @property(Node)
    private btnNext: Node = null;

    @property(Node)
    private btnBackList: Node = null;

    @property(Node)
    private btnShare: Node = null;

    //首页
    @property(Node)
    private btnHome: Node = null;

    @property(Node)
    private guang: Node = null;

    @property(Label)
    private specialTips: Label = null;


    onEnable() {
        i18n.apply(this.node);
    }

    start() {
        this.btnHome.on(Node.EventType.TOUCH_END, this.onClickHome, this);
        this.btnNext.on(Button.EventType.CLICK, this.onClickNext, this);
        
        this.btnBackList.on(Node.EventType.TOUCH_END, this.onClickBackList, this);

        //guang一直转圈圈 - 使用更可靠的无限旋转方式
        tween(this.guang)
            .by(2, { angle: 360 })
            .repeatForever()
            .start();

        //获取当前关卡值
        const lv = 5 - app.store.game.getLevel();
        if (lv > 0) {
            this.specialTips.string = i18n.t('result.unlock_after', { count: lv });
            this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
            this.btnShare.getComponentInChildren(Label).string = i18n.t('share.button');
        } else if (lv === 0) {
            this.specialTips.string = i18n.t('creative.unlocked');
            this.btnShare.on(Node.EventType.TOUCH_START, this.onClickSpecialLevel, this);
            this.btnShare.getComponentInChildren(Label).string = i18n.t('creative.play');
        }else{
            this.specialTips.string = i18n.t('result.great');
            this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
            this.btnShare.getComponentInChildren(Label).string = i18n.t('share.button');
        }
         // 报告点击事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.SUCCESS,
            levelTime: app.manager.globaldata.getLevelTime(),
        });

        app.store.game.setLevel(app.store.game.level + 1);

        //判断是不是创意关卡
        if(app.manager.globaldata.getIsSpecialLevel()){
            //通知修改本地存储
            app.manager.event.emit(app.config.eventname.UpdateSPLevelStatus, app.manager.globaldata.getSpecialLevelIndex(),2);
            this.btnNext.active = false;
            this.btnBackList.active = true;
        }else{
            this.btnBackList.active = false;
            this.btnNext.active = true;
        }
       
    }

    //返回创意关卡列表
    private onClickBackList() {
        app.manager.ui.show({name: 'PageSpLevel'});
        app.manager.ui.hide({name: 'PopResult'});
    }

    private onClickHome() {
        app.manager.ui.show({name: 'PageHome'});
        app.manager.ui.hide({name: 'PopResult'});
    }
    private onClickNext() {       
       //复用restart事件
       app.manager.event.emit(app.config.eventname.restart);
       app.manager.ui.hide({name: 'PopResult'});
        // 报告点击事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.ENTER
        });
    }
    private onClickShare() {
       //分享游戏
      platformService.share({
        title: i18n.t('share.success'),
      });
      //上报
      app.manager.report.reportEvent({
        levelID: app.store.game.level,
        levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
        levelResult: LevelResultType.SHARE,
      });
    }
    private onClickSpecialLevel() {
        // TODO 跳转到体验关卡列表
        app.manager.ui.show({name: 'PageSpLevel'});
        app.manager.ui.hide({name: 'PopResult'});
    }
}


