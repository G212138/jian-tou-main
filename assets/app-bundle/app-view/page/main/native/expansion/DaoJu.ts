import { _decorator, Button, Component, Node } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { i18n } from 'db://assets/app/i18n';
import { adManager } from 'db://assets/app/tiktok.ads';
const { ccclass, property } = _decorator;

@ccclass('DaoJu')
export class DaoJu extends Component {

    @property(Node)
    public DaoJuTip: Node = null;
    @property(Node)
    public DaoJuHammer: Node = null;

    @property(Node)
    public DaoJuHammerTip: Node = null;

    start() {
        this.DaoJuHammer.on(Button.EventType.CLICK, this.onDaoJuHammerUse, this);
        this.DaoJuTip.on(Button.EventType.CLICK, this.onDaoJuTipUse, this);

        app.manager.event.on(app.config.eventname.DaoJuHammerUseOver, this.onDaoJuHammerUseOver, this);
    }

    private onDaoJuTipUse() {
        // 暂停倒计时
        app.manager.event.emit(app.config.eventname.pauseCountDown);
        adManager.showRewardedVideoAd({
           onClose: (success) => {
                if(!success){
                    app.manager.ui.showToast(i18n.t('toast.ad_incomplete'));
                    // 恢复倒计时
                    app.manager.event.emit(app.config.eventname.resumeCountDown);
                   
                    return;
                }
                app.manager.event.emit(app.config.eventname.DaoJuTipUse);
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
                 // 报告使用道具事件
                    app.manager.report.reportEvent({
                        levelID: app.store.game.level,
                        levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                        levelResult: LevelResultType.USE_ITEM,
                        externInfo: {
                            itemType: 'Tip',
                            adProgress: 'Success',
                        },
                    });
                
            },
            onError: () => {
                app.manager.ui.showToast(i18n.t('toast.video_failed'));
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
               
            }
        });
    }   
    private onDaoJuHammerUse() {
      
        // 暂停倒计时
        app.manager.event.emit(app.config.eventname.pauseCountDown);
        adManager.showRewardedVideoAd({
            onClose: (success) => {
                if(!success){
                    app.manager.ui.showToast(i18n.t('toast.ad_incomplete'));
                    // 恢复倒计时
                    app.manager.event.emit(app.config.eventname.resumeCountDown);
                   
                    return;
                }
                app.manager.globaldata.setDaoJuHammerUse(true);
                this.DaoJuHammerTip.active = true;
                // 报告使用道具事件
                app.manager.report.reportEvent({
                    levelID: app.store.game.level,
                    levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                    levelResult: LevelResultType.USE_ITEM,
                    externInfo: {
                        itemType: 'Hammer',
                        adProgress: 'Success',
                    },
                });
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
            },
            onError: () => {
                app.manager.ui.showToast(i18n.t('toast.video_failed'));
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
               
            }
        });
    }
    private onDaoJuHammerUseOver() {
        this.DaoJuHammerTip.active = false;
        app.manager.globaldata.setDaoJuHammerUse(false);
    }
    
}


