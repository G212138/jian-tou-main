import { _decorator, Color, Label, Node, ProgressBar, Sprite, tween, UIOpacity } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { PopSetting } from '../../../pop/setting/native/PopSetting';
import { LevelActionType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { i18n } from 'db://assets/app/i18n';
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

    private levelProgress: ProgressBar = null;

    // 初始化的相关逻辑写在这
    onLoad() {
        app.manager.event.on(app.config.eventname.errorFlash, this.onErrorFlash, this);
        // 播放钢琴音效
        app.manager.event.on(app.config.eventname.playPianoSound, this.onPlayPianoSound, this);
        app.manager.event.on(app.config.eventname.ropeProgressChanged, this.onRopeProgressChanged, this);
        app.manager.event.on(app.config.eventname.themeChanged, this.applyTheme, this);
        app.manager.event.on(app.config.eventname.restart, this.updateTransformFeatureVisibility, this);
        this.levelProgress = this.node.getChildByPath('UI/LevelProgress')?.getComponent(ProgressBar) ?? null;
        this.onRopeProgressChanged(
            app.manager.globaldata.getEscapeRopeCount(),
            app.manager.globaldata.getRopeCount(),
        );
        this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);
        this.applyTheme();
        this.updateTransformFeatureVisibility();

        bindStore(this.level, 'string', () => {
            return i18n.t('level.main', { level: app.store.game.level });
        });

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
        i18n.apply(this.node);
        this.applyTheme();
        this.updateTransformFeatureVisibility();
        this.showMiniViews({ views: this.miniViews });
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
            app.manager.ui.showToast(i18n.t('toast.drawing'));
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

    /** 根据本关已消除箭头数，实时刷新顶部进度条。 */
    private onRopeProgressChanged(escapedCount: number, totalCount: number): void {
        if (!this.levelProgress) {
            return;
        }

        const progress = totalCount > 0 ? escapedCount / totalCount : 0;
        this.levelProgress.progress = Math.min(1, Math.max(0, progress));
    }

    /** 普通第一关隐藏缩放条，其他主线关卡和创意关卡正常显示。 */
    private updateTransformFeatureVisibility(): void {
        const zoomSlider = this.node.getChildByPath('UI/ZoomSlider');
        if (!zoomSlider) return;

        const isNormalFirstLevel = !app.manager.globaldata.getIsSpecialLevel()
            && app.store.game.getLevel() === 1;
        zoomSlider.active = !isNormalFirstLevel;
    }

    /** 按参考图配色切换游戏背景、顶栏、进度条和底部工具区域。 */
    private applyTheme(): void {
        const isDarkMode = app.manager.globaldata.getIsDarkMode();
        const pageBackgroundColor = isDarkMode
            ? new Color(37, 40, 57, 255)
            : new Color(245, 247, 252, 255);
        const arrowAreaColor = isDarkMode
            ? new Color(30, 32, 45, 255)
            : new Color(255, 255, 255, 255);
        const primaryColor = isDarkMode
            ? new Color(171, 183, 244, 255)
            : new Color(17, 20, 51, 255);
        const mutedColor = isDarkMode
            ? new Color(64, 70, 104, 255)
            : new Color(207, 213, 246, 255);

        // 外层背景与箭头区域保留轻微色差，让上下功能区和棋盘区更容易辨认。
        this.setSpriteColor(this.node.getChildByName('bg'), pageBackgroundColor);
        this.setSpriteColor(this.node.getChildByPath('zezao/Bg'), arrowAreaColor);
        this.setLabelColor(this.node.getChildByPath('UI/levelinfo/level'), primaryColor);
        this.setLabelColor(this.node.getChildByPath('UI/levelinfo/daojishi'), primaryColor);
        this.setLabelColor(this.node.getChildByPath('UI/ZoomSlider/ZoomOutLabel'), primaryColor);
        this.setLabelColor(this.node.getChildByPath('UI/ZoomSlider/ZoomInLabel'), primaryColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider'), mutedColor);
        this.setSpriteColor(this.node.getChildByPath('UI/ZoomSlider/Handle'), mutedColor);
        this.setSpriteColor(this.node.getChildByPath('UI/LevelProgress'), isDarkMode
            ? new Color(41, 45, 64, 255)
            : new Color(245, 246, 251, 255));
        this.setSpriteColor(this.node.getChildByPath('UI/LevelProgress/Bar'), mutedColor);
        this.setSpriteColor(this.node.getChildByPath('UI/daoJu/btn_tips'), mutedColor);
        this.setSpriteColor(this.node.getChildByPath('UI/daoJu/btn_hammer'), mutedColor);
    }

    /** 安全设置节点精灵颜色，节点不存在时跳过。 */
    private setSpriteColor(node: Node | null, color: Color): void {
        const sprite = node?.getComponent(Sprite);
        if (sprite) sprite.color = color;
    }

    /** 安全设置节点文字颜色，节点不存在时跳过。 */
    private setLabelColor(node: Node | null, color: Color): void {
        const label = node?.getComponent(Label);
        if (label) label.color = color;
    }

    protected onDestroy(): void {
        app.manager.event.off(app.config.eventname.errorFlash, this.onErrorFlash, this);
        app.manager.event.off(app.config.eventname.playPianoSound, this.onPlayPianoSound, this);
        app.manager.event.off(app.config.eventname.ropeProgressChanged, this.onRopeProgressChanged, this);
        app.manager.event.off(app.config.eventname.themeChanged, this.applyTheme, this);
        app.manager.event.off(app.config.eventname.restart, this.updateTransformFeatureVisibility, this);
    }
}
