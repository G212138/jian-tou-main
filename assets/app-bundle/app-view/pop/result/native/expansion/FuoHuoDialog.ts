import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { adManager } from 'db://assets/app/tiktok.ads';
const { ccclass, property } = _decorator;

@ccclass('FuoHuoDialog')
export class FuoHuoDialog extends Component {
    @property(Node)
    private btnClose: Node = null;

    @property(Node)
    private btnAd: Node = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(Label)
    private labelTip: Label = null;
    onLoad() {
        let remainCount = app.manager.globaldata.ropeCount - app.manager.globaldata.escapeRopeCount;
        this.labelTip.string = `再消除${remainCount}个箭头即可通关`;
        this.progressBar.progress = app.manager.globaldata.escapeRopeCount / app.manager.globaldata.ropeCount;

        //上报
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.FAIL,
            externInfo: {
                failType: 'NoHeart'
            },
            levelProgress: this.progressBar.progress,
        });
    }

    start() {
        this.btnClose.on(Node.EventType.TOUCH_END, this.onClickClose, this);
        this.btnAd.on(Node.EventType.TOUCH_END, this.onClickAd, this);
    }

    private onClickClose() {
        app.manager.event.emit("ShowRestartDialog","NoHeart");
    }

    private onClickAd() {
       
        // 暂停倒计时
        app.manager.event.emit(app.config.eventname.pauseCountDown);
        adManager.showRewardedVideoAd({
            onClose: (success) => {
                if(!success){
                    app.manager.ui.showToast("广告未播放完成");
                    // 恢复倒计时
                    app.manager.event.emit(app.config.eventname.resumeCountDown);
                   
                    return;
                }
                app.manager.event.emit(app.config.eventname.gameHeartAdd, 0);
                app.manager.ui.hide({name: 'PopResult'});
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);

                //上报
                app.manager.report.reportEvent({
                    levelID: app.store.game.level,
                    levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                    levelResult: LevelResultType.REVIVE,
                    externInfo: {
                        failType: 'NoHeart',
                        adProgress: 'Success',
                    },
                    levelProgress: this.progressBar.progress,
                });
            },
            onError: () => {
                app.manager.ui.showToast("广告播放失败");
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
            }
        })
        
    }
}


