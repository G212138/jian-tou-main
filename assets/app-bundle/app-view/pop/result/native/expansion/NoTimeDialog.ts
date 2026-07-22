import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { i18n } from 'db://assets/app/i18n';
import { adManager } from 'db://assets/app/tiktok.ads';
const { ccclass, property } = _decorator;

@ccclass('NoTimeDialog')
export class NoTimeDialog extends Component {
    @property(Node)
    private btnClose: Node = null;
    
    @property(Node)
    private btnAd: Node = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;
    
    @property(Label)
    private labelTip: Label = null;
    onEnable() {
        i18n.apply(this.node);
    }

    onLoad() {
        let remainCount = app.manager.globaldata.ropeCount - app.manager.globaldata.escapeRopeCount;
        this.labelTip.string = i18n.t('result.remaining', { count: remainCount });
        this.progressBar.progress = app.manager.globaldata.escapeRopeCount / app.manager.globaldata.ropeCount;
        // 报告失败事件
                app.manager.report.reportEvent({
                    levelID: app.store.game.level,
                    levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                    levelResult: LevelResultType.FAIL,
                    externInfo: {
                        itemType: 'NoTime',
                    },
                    levelProgress: this.progressBar.progress,
                });
    }
    
    start() {
            this.btnClose.on(Node.EventType.TOUCH_END, this.onClickClose, this);
            this.btnAd.on(Node.EventType.TOUCH_END, this.onClickAd, this);
    }
    
    private onClickClose() {
        app.manager.event.emit("ShowRestartDialog","NoTime");
    }
    
    private onClickAd() {
        
        adManager.showRewardedVideoAd({
            onClose: (success) => {
                if(!success){
                    app.manager.ui.showToast(i18n.t('toast.ad_incomplete'));
                    
                    return;
                }
                app.manager.event.emit(app.config.eventname.timeAdd,120);
                app.manager.ui.hide({name: 'PopResult'});
                // 报告成功事件
                app.manager.report.reportEvent({
                    levelID: app.store.game.level,
                    levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                    levelResult: LevelResultType.AD_REWARD,
                    externInfo: {
                        failType: 'NoTime',

                        adProgress: 'Success',

                    },
                    levelProgress: this.progressBar.progress,
                });
            },
            onError: () => {
                app.manager.ui.showToast(i18n.t('toast.ad_failed'));
            }
        });
    }
}


