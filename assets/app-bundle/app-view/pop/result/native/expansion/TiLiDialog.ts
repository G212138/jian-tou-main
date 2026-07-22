import { _decorator, Component, Node } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { i18n } from 'db://assets/app/i18n';
import { adManager } from 'db://assets/app/tiktok.ads';
const { ccclass, property } = _decorator;

@ccclass('TiLiDialog')
export class TiLiDialog extends Component {

    @property(Node)
    CloseNode: Node;
    @property(Node)
    AdNode: Node;
    onEnable() {
        i18n.apply(this.node);
    }

    start() {
        this.CloseNode.on(Node.EventType.TOUCH_END, this.CloseDialog, this);
        this.AdNode.on(Node.EventType.TOUCH_END, this.AddTiLi, this);
        
    }

    //关闭弹窗
    CloseDialog() {
        app.manager.ui.show({name: 'PageHome'});
        app.manager.ui.hide({name: 'PopResult'});
        
    }
    //添加体力
    AddTiLi() {
        
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
                app.store.game.setTiLi(app.store.game.getTiLi() + 3);
                app.manager.event.emit(app.config.eventname.restart);
                app.manager.ui.hide({name: 'PopResult'});
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
                // 报告点击事件
                app.manager.report.reportEvent({
                    levelID: app.store.game.level,
                    levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                    levelResult: LevelResultType.USE_ITEM,
                    externInfo: {
                        failType: 'TiLi',
                        adProgress: 'Success',
                    },
                });
            },
            onError: () => {
                app.manager.ui.showToast(i18n.t('toast.ad_failed'));
                // 恢复倒计时
                app.manager.event.emit(app.config.eventname.resumeCountDown);
            }
        })
        
    }
}


