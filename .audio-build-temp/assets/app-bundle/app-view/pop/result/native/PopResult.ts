import { _decorator, Node } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { app } from 'db://assets/app/app';
import { FailDialog } from './expansion/FailDialog';
import { adManager } from 'db://assets/app/tiktok.ads';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
const { ccclass, property } = _decorator;
@ccclass('PopResult')
export class PopResult extends BaseView {
    @property(Node)
    noTimeNode: Node;
    @property(Node)
    noGameHeartNode: Node;
    @property(Node)
    reStartNode: Node;
    @property(Node)
    ShouChangDialogNode: Node;
    @property(Node)
    SuccessDialog: Node = null;
    @property(Node)
    TiLiDialog: Node = null;

    private _noTime: boolean = false;
    private _noGameHeart: boolean = false;
        
    // 初始化的相关逻辑写在这
    onLoad() {
        app.manager.event.on("ShowRestartDialog", this.showRestart, this);
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        if(params){
            if(params.noTime){
                this._noTime = true;
                this.noTimeNode.active = true;
                this.reStartNode.active = false;
                this.noGameHeartNode.active = false;
                this.ShouChangDialogNode.active = false;
                this.SuccessDialog.active = false;
                this.TiLiDialog.active = false;
                
            }
            if(params.noGameHeart){
                this._noGameHeart = true;
                this.noGameHeartNode.active = true;
                this.reStartNode.active = false;
                this.noTimeNode.active = false;
                this.ShouChangDialogNode.active = false;
                this.SuccessDialog.active = false;
                this.TiLiDialog.active = false;
                
            }
            if(params.ShouChangDialog){
                this.reStartNode.active = false;
                this.noTimeNode.active = false;
                this.noGameHeartNode.active = false;
                this.ShouChangDialogNode.active = true;
                this.SuccessDialog.active = false;
                this.TiLiDialog.active = false;
            }
            if(params.SuccessDialog){
                this.reStartNode.active = false;
                this.noTimeNode.active = false;
                this.noGameHeartNode.active = false;
                this.ShouChangDialogNode.active = false;
                this.SuccessDialog.active = true;
                this.TiLiDialog.active = false;

                //判断是否需要显示插屏广告
                if(app.store.game.getLevel() > 1){
                    //判断是否需要显示推荐组件
                    if(app.store.game.getLevel() == 3){
                        app.manager.globaldata.showRecommend();
                    }else{
                        //判断是否可以显示插屏广告
                        if(app.manager.globaldata.getCanShowInterAd() && adManager.canShowInterstitialAd()){
                            adManager.showInterstitialAd({
                                onError: (error) => console.warn('[PopResult] Interstitial ad failed', error),
                            });
                        }
                    }
                }
                
            }
            if(params.TiLiDialog){
                this.reStartNode.active = false;
                this.noTimeNode.active = false;
                this.noGameHeartNode.active = false;
                this.ShouChangDialogNode.active = false;
                this.SuccessDialog.active = false;
                this.TiLiDialog.active = true;
            }
        }
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PopResult>({name: 'PopResult', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    showRestart(type: 'NoHeart' | 'NoTime'){
        this.reStartNode.getComponent(FailDialog).type = type;
        this.reStartNode.active = true;
        this.noTimeNode.active = false;
        this.noGameHeartNode.active = false;
    }

    NoRestart(){
        //不开始
        this.reStartNode.active = false;
        if(this._noTime){
            this.noTimeNode.active = true;
        }
        if(this._noGameHeart){
            this.noGameHeartNode.active = true;
        }
    }
}