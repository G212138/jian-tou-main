import {
    Button,
    Color,
    Graphics,
    HorizontalTextAlignment,
    Label,
    Node,
    UITransform,
    VerticalTextAlignment,
    Widget,
    _decorator,
} from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { ShouChangDialog } from '../../../pop/result/native/expansion/ShouChangDialog';
import { platformService } from 'db://assets/app/platform';
import { tiktokRequiredFeatures } from 'db://assets/app/tiktok.required';
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

    private tiktokEntries: Node = null;

    // 初始化的相关逻辑写在这
    onLoad() {
        bindStore(this.tili, 'string', () => {
            return app.store.game.tili.toString();
        });
        bindStore(this.level, 'string', () => {
            return '第' + app.store.game.level.toString() + '关';
        });

        app.manager.sound.playMusic({
            name:'music/bgm',
            volume:0.7,
            force:false
        });

        this.createTikTokRequiredEntries();
    }

    // 点击设置按钮
    private onClickSetting() {
        app.manager.ui.show({name: 'PopSetting', data: {isHome: true}});
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
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
            title: app.config.localkey.ShareMsg
        });
    }

    // 点击使用说明按钮
    private onClickShouChang() {
        app.manager.ui.show({name: 'PopResult',data: {ShouChangDialog: true}});
    }
    private createTikTokRequiredEntries() {
        if (!tiktokRequiredFeatures.shouldShowEntries || this.tiktokEntries?.isValid) return;

        const panel = new Node('TikTokRequiredEntries');
        panel.layer = this.node.layer;
        panel.addComponent(UITransform).setContentSize(250, 180);
        this.node.addChild(panel);

        const widget = panel.addComponent(Widget);
        widget.isAlignLeft = true;
        widget.left = 18;
        widget.isAlignTop = true;
        widget.top = 230;
        widget.updateAlignment();

        this.createTikTokEntryButton(
            panel,
            'HomeReward',
            'Home Reward  +3 Energy',
            46,
            new Color(31, 166, 114, 255),
            () => this.onClickTikTokShortcut(),
        );
        this.createTikTokEntryButton(
            panel,
            'RevisitReward',
            'Revisit Reward  +2 Energy',
            -46,
            new Color(254, 44, 85, 255),
            () => this.onClickTikTokRevisit(),
        );

        this.tiktokEntries = panel;
    }

    private createTikTokEntryButton(
        parent: Node,
        name: string,
        text: string,
        y: number,
        color: Color,
        onClick: () => void,
    ) {
        const buttonNode = new Node(name);
        buttonNode.layer = this.node.layer;
        parent.addChild(buttonNode);
        buttonNode.setPosition(0, y);
        buttonNode.addComponent(UITransform).setContentSize(230, 70);

        const background = buttonNode.addComponent(Graphics);
        background.fillColor = color;
        background.roundRect(-115, -35, 230, 70, 16);
        background.fill();

        const button = buttonNode.addComponent(Button);
        button.transition = Button.Transition.SCALE;
        button.zoomScale = 0.96;
        button.duration = 0.08;
        buttonNode.on(Node.EventType.TOUCH_END, onClick, this);

        const labelNode = new Node(`${name}Label`);
        labelNode.layer = this.node.layer;
        buttonNode.addChild(labelNode);
        labelNode.addComponent(UITransform).setContentSize(210, 56);

        const label = labelNode.addComponent(Label);
        label.string = text;
        label.fontSize = 21;
        label.lineHeight = 26;
        label.color = Color.WHITE;
        label.horizontalAlign = HorizontalTextAlignment.CENTER;
        label.verticalAlign = VerticalTextAlignment.CENTER;
        label.overflow = Label.Overflow.SHRINK;
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