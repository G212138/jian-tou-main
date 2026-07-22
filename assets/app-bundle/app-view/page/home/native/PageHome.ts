import {
    Label,
    Node,
    _decorator,
} from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { ShouChangDialog } from '../../../pop/result/native/expansion/ShouChangDialog';
import { platformService } from 'db://assets/app/platform';
import { tiktokRequiredFeatures } from 'db://assets/app/tiktok.required';
import { i18n } from 'db://assets/app/i18n';
const { ccclass, property } = _decorator;
@ccclass('PageHome')
export class PageHome extends BaseView {
    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = [];

    @property(Node)
    private btnStart: Node = null;

    @property(Label)
    private tili: Label = null;

    @property(Label)
    private level: Label = null;

    @property(Node)
    private settingBtn: Node = null;

    @property(Node)
    private btnShare: Node = null;

    @property(Node)
    private btnShouChang: Node = null;

    @property(Node)
    specialDesc: Node = null;


    // 初始化的相关逻辑写在这
    onLoad() {
        bindStore(this.tili, 'string', () => {
            return app.store.game.tili.toString();
        });
        bindStore(this.level, 'string', () => {
            return i18n.t('level.main', { level: app.store.game.level });
        });

        app.manager.sound.playMusic({
            name:'music/bgm',
            volume:0.7,
            force:false
        });

        this.bindTikTokRequiredEntries();
    }

    // 点击设置按钮
    private onClickSetting() {
        app.manager.ui.show({name: 'PopSetting', data: {isHome: true}});
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        i18n.apply(this.node);
        this.level.string = i18n.t('level.main', { level: app.store.game.level });
        this.showMiniViews({ views: this.miniViews });

        this.btnStart.on(Node.EventType.TOUCH_END, this.onClickStart, this);
        this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);
        this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
        this.btnShouChang.on(Node.EventType.TOUCH_END, this.onClickShouChang, this);

        //创意关卡
        if(app.store.game.getLevel() > 5){
            this.specialDesc.active = false;
        }
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PageHome>({name: 'PageHome', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    private onClickStart() {
        // 检查是否有足够的体力
        if (app.store.game.tili < 1) {
            // app.manager.ui.showToast('体力不足');
            // 展示体力不足的弹窗
            app.manager.ui.show({name: 'PopResult',data: {TiLiDialog: true}});
            return;
        }
        
        // 消耗1个体力
        app.store.game.setTiLi(app.store.game.tili - 1);
        app.manager.globaldata.setIsSpecialLevel(false);
        app.manager.ui.show({name: 'PageMain'});
        app.manager.event.emit(app.config.eventname.restart);
    }


    // 点击分享按钮
    private onClickShare() {
        platformService.share({
            title: i18n.t('share.default')
        });
    }

    // 点击使用说明按钮
    private onClickShouChang() {
        app.manager.ui.show({name: 'PopResult',data: {ShouChangDialog: true}});
    }
    private bindTikTokRequiredEntries(): void {
        const panel = this.node.getChildByName('TikTokRequiredEntries');

        if (!panel) {
            console.warn('[PageHome] TikTokRequiredEntries is missing from PageHome.prefab');
            return;
        }

        panel.active = tiktokRequiredFeatures.shouldShowEntries;
        if (!panel.active) return;

        panel.getChildByName('HomeReward')?.on(
            Node.EventType.TOUCH_END,
            this.onClickTikTokShortcut,
            this,
        );
        panel.getChildByName('RevisitReward')?.on(
            Node.EventType.TOUCH_END,
            this.onClickTikTokRevisit,
            this,
        );
    }

    private async onClickTikTokShortcut() {
        const result = await tiktokRequiredFeatures.runShortcutMission();
        if (result.status !== 'rewarded') app.manager.ui.showToast(result.message);
    }

    private async onClickTikTokRevisit() {
        const result = await tiktokRequiredFeatures.runRevisitMission();
        if (result.status !== 'rewarded') app.manager.ui.showToast(result.message);
    }
}