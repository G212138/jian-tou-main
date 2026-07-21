import { _decorator, Label, Node, tween, UIOpacity } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { PopSetting } from '../../../pop/setting/native/PopSetting';
import { LevelActionType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
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

    // 初始化的相关逻辑写在这
    onLoad() {
        app.manager.event.on(app.config.eventname.errorFlash, this.onErrorFlash, this);
        // 播放钢琴音效
        app.manager.event.on(app.config.eventname.playPianoSound, this.onPlayPianoSound, this);

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
        this.showMiniViews({ views: this.miniViews });
        // 绑定关卡显示
        bindStore(this.level, 'string', () => {
            return '第' + app.store.game.level.toString() + '关';
        });
        // 绑定设置按钮点击事件
        this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);

        //创意关卡
        // 绑定关卡显示
        bindStore(this.level, 'string', () => {
            return '创意关卡 ' + app.store.game.specialLevel.toString();
        });

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
        

    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PageMain>({name: 'PageMain', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    // 设置按钮点击事件
    private onClickSetting() {
        if(app.manager.globaldata.getAlreadyDrawRopeCount() < app.manager.globaldata.getRopeCount()){
            // 还没有绘制完绳子，不能打开设置
            app.manager.ui.showToast('箭头绘制中...');
            return;
        }
        app.manager.ui.show<PopSetting>({name: 'PopSetting', data: {isHome: false}});
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
}