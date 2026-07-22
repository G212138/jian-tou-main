import { _decorator, Component, Label, Node, ProgressBar } from 'cc';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { i18n } from 'db://assets/app/i18n';
import { adManager } from 'db://assets/app/tiktok.ads';
const { ccclass, property } = _decorator;

@ccclass('FailDialog')
export class FailDialog extends Component {

    @property(Node)
    private btnFuHuo: Node = null;

    //首页
    @property(Node)
    private btnHome: Node = null;


    @property(Node)
    private btnRestart: Node = null;

    @property(ProgressBar)
    private progressBar: ProgressBar = null;
    
    @property(Label)
    private labelTip: Label = null;

    public type: 'NoHeart' | 'NoTime' = null;

    onEnable() {
        i18n.apply(this.node);
    }

    onLoad() {
        
        this.progressBar.progress = app.manager.globaldata.escapeRopeCount / app.manager.globaldata.ropeCount;
        //把progress转换为百分数，保留0位小数
        let progressPercent = (this.progressBar.progress * 100).toFixed(0);
        this.labelTip.string = i18n.t('result.progress', { progress: progressPercent });
        
    }

    start() {
        this.btnHome.on(Node.EventType.TOUCH_END, this.onClickHome, this);
        this.btnFuHuo.on(Node.EventType.TOUCH_END, this.onClickAD, this);
        this.btnRestart.on(Node.EventType.TOUCH_END, this.onClickRestart, this);
    }

    private onClickHome() {
        app.manager.ui.show({name: 'PageHome'});
        app.manager.ui.hide({name: 'PopResult'});

        //上报
         app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.EXIT,
            externInfo: {
                failType: this.type
            },
            levelProgress: this.progressBar.progress,
        });

    }
    private onClickAD() {
       
        // 暂停倒计时
        app.manager.event.emit(app.config.eventname.pauseCountDown);
      //TODO 复活需要判断是加生命还是加时间
      adManager.showRewardedVideoAd({
        onClose: (success) => {
          if(!success){
            app.manager.ui.showToast(i18n.t('toast.ad_incomplete'));
            // 恢复倒计时
            app.manager.event.emit(app.config.eventname.resumeCountDown);
            
            return;
          }
          if(this.type == 'NoHeart'){
                app.manager.event.emit(app.config.eventname.gameHeartAdd);
            }
            if(this.type == 'NoTime'){
                app.manager.event.emit(app.config.eventname.timeAdd, 120);
            }
            app.manager.ui.hide({name: 'PopResult'});
            // 恢复倒计时
            app.manager.event.emit(app.config.eventname.resumeCountDown);
            //上报
            app.manager.report.reportEvent({
                levelID: app.store.game.level,
                levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                levelResult: LevelResultType.REVIVE,
                externInfo: {
                    failType: this.type,
                    adProgress: 'Success',
                },
                levelProgress: this.progressBar.progress,
            });
            
        },
        onError: () => {
          app.manager.ui.showToast(i18n.t('toast.ad_failed'));
          // 恢复倒计时
          app.manager.event.emit(app.config.eventname.resumeCountDown); 
        }
      })
    }
    private onClickRestart() {
       
      if(app.store.game.tili < 1){
            app.manager.ui.show({name: 'PopResult',data: {TiLiDialog: true}});
           
            return;
      }
      app.store.game.setTiLi(app.store.game.getTiLi() - 1);
      //发出restart事件
      app.manager.event.emit(app.config.eventname.restart);
      //重新开始游戏
      app.manager.ui.hide({name: 'PopResult'});

       //上报
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.RETRY,
            externInfo: {
                failType: this.type,
            },
            levelProgress: this.progressBar.progress,
        });
      
    }
}


