import {
    BlockInputEvents,
    Color,
    Game,
    Graphics,
    HorizontalTextAlignment,
    Label,
    Node,
    UITransform,
    VerticalTextAlignment,
    _decorator,
    game,
} from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { bindStore } from 'db://assets/pkg-export/@gamex/cc-store';
import { app } from 'db://assets/app/app';
import { ShouChangDialog } from '../../../pop/result/native/expansion/ShouChangDialog';
import { platformService } from 'db://assets/app/platform';
import { tiktokRequiredFeatures } from 'db://assets/app/tiktok.required';
import { i18n } from 'db://assets/app/i18n';
import { MAIN_LEVEL_COUNT } from 'db://assets/app/config.level';
import { adManager } from 'db://assets/app/tiktok.ads';
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

    private tiktokEntriesBound = false;
    private sidebarGuide: Node = null;
    private levelSelector: Node = null;
    private levelGrid: Node = null;
    private levelPageLabel: Label = null;
    private levelAdPrompt: Node = null;
    private levelAdShowing = false;
    private levelSelectPage = 0;
    private readonly levelsPerPage = 30;


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
        this.createLevelSelectEntry();
        game.on(Game.EVENT_SHOW, this.onPlatformShow, this);
        this.btnStart.on(Node.EventType.TOUCH_END, this.startSelectedMainLevel, this);
        this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);
        this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
        this.btnShouChang.on(Node.EventType.TOUCH_END, this.onClickShouChang, this);
    }

    // 点击设置按钮
    private onClickSetting() {
        app.manager.ui.show({name: 'PopSetting', data: {isHome: true}});
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        i18n.apply(this.node);
        this.level.string = i18n.t('level.main', { level: app.store.game.level });
        this.refreshLevelSelectEntry();
        this.refreshTikTokRequiredEntries();
        this.showMiniViews({ views: this.miniViews });

        this.btnStart.active = true;
        //创意关卡
        if(app.store.game.getMaxUnlockedLevel() > 5){
            this.specialDesc.active = false;
        }
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PageHome>({name: 'PageHome', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    private startSelectedMainLevel() {
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

        if (!this.tiktokEntriesBound) {
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
            this.tiktokEntriesBound = true;
        }

        this.refreshTikTokRequiredEntries();
        void tiktokRequiredFeatures.refreshCapabilities()
            .then(() => this.refreshTikTokRequiredEntries());
    }

    private refreshTikTokRequiredEntries(): void {
        const panel = this.node.getChildByName('TikTokRequiredEntries');
        if (!panel) return;

        const homeReward = panel.getChildByName('HomeReward');
        const revisitReward = panel.getChildByName('RevisitReward');
        const showShortcut = tiktokRequiredFeatures.shouldShowShortcutEntry;
        const showRevisit = tiktokRequiredFeatures.shouldShowRevisitEntry;

        if (homeReward) {
            homeReward.active = showShortcut;
            const label = homeReward.getComponentInChildren(Label);
            if (label) label.string = i18n.t('tiktok.home_entry');
        }
        if (revisitReward) {
            revisitReward.active = showRevisit;
            const label = revisitReward.getComponentInChildren(Label);
            if (label) {
                label.string = tiktokRequiredFeatures.isSidebarTaskCompleted
                    && !tiktokRequiredFeatures.isSidebarRewardClaimed
                    ? i18n.t('tiktok.sidebar_entry_ready')
                    : i18n.t('tiktok.sidebar_entry');
            }
        }
        panel.active = showShortcut || showRevisit;
    }

    private async onClickTikTokShortcut() {
        const result = await tiktokRequiredFeatures.runShortcutMission();
        if (result.status !== 'rewarded') app.manager.ui.showToast(result.message);
    }

    private onClickTikTokRevisit() {
        this.showSidebarGuide();
    }

    private showSidebarGuide(): void {
        if (this.sidebarGuide?.isValid) {
            this.sidebarGuide.active = true;
            this.refreshSidebarGuideButton();
            return;
        }

        const rootSize = this.node.getComponent(UITransform)?.contentSize;
        const width = rootSize?.width || 390;
        const height = rootSize?.height || 844;
        const overlay = this.createGuideNode('SidebarGuide', this.node, width, height, 0, 0);
        overlay.addComponent(BlockInputEvents);
        this.sidebarGuide = overlay;

        const mask = overlay.addComponent(Graphics);
        mask.fillColor = new Color(5, 10, 22, 220);
        mask.rect(-width / 2, -height / 2, width, height);
        mask.fill();

        const card = this.createGuideNode('Card', overlay, 366, 746, 0, -4);
        const cardScale = Math.min((width - 42) / 366, (height - 80) / 746);
        card.setScale(cardScale, cardScale, 1);
        const cardGraphics = card.addComponent(Graphics);
        cardGraphics.fillColor = new Color(30, 49, 58, 255);
        cardGraphics.roundRect(-183, -373, 366, 746, 22);
        cardGraphics.fill();
        cardGraphics.lineWidth = 4;
        cardGraphics.strokeColor = new Color(102, 157, 146, 255);
        cardGraphics.roundRect(-181, -371, 362, 742, 21);
        cardGraphics.stroke();

        this.createGuideLabel(
            card,
            i18n.t('tiktok.sidebar_title'),
            326,
            27,
            new Color(255, 209, 42, 255),
            292,
            HorizontalTextAlignment.CENTER,
            'Title',
            16,
        );

        const close = this.createGuideNode('Close', card, 50, 50, -151, 326);
        const closeGraphics = close.addComponent(Graphics);
        closeGraphics.fillColor = new Color(61, 216, 178, 255);
        closeGraphics.circle(0, 0, 23);
        closeGraphics.fill();
        this.createGuideLabel(
            close,
            '×',
            1,
            38,
            new Color(21, 47, 54, 255),
            46,
            HorizontalTextAlignment.CENTER,
        );
        close.on(Node.EventType.TOUCH_END, this.closeSidebarGuide, this);

        this.createSidebarStep(card, '1', i18n.t('tiktok.sidebar_step_1'), 260);
        this.createSidebarMenuMock(card, 183);
        this.createSidebarStep(card, '2', i18n.t('tiktok.sidebar_step_2'), 112);
        this.createSidebarAppsMock(card, 8);
        this.createSidebarStep(card, '3', i18n.t('tiktok.sidebar_step_3'), -107);
        this.createSidebarReward(card, -202);

        this.createGuideLabel(
            card,
            i18n.t('tiktok.sidebar_daily'),
            -262,
            15,
            new Color(183, 207, 205, 255),
            280,
            HorizontalTextAlignment.CENTER,
        );

        const action = this.createGuideNode('Action', card, 282, 68, 0, -319);
        action.on(Node.EventType.TOUCH_END, this.onClickSidebarGuideAction, this);
        this.createGuideLabel(
            action,
            '',
            0,
            25,
            new Color(255, 255, 255, 255),
            252,
            HorizontalTextAlignment.CENTER,
            'ActionLabel',
        );
        this.refreshSidebarGuideButton();
    }

    private createSidebarStep(parent: Node, number: string, text: string, y: number): void {
        const badge = this.createGuideNode('Step' + number, parent, 48, 48, -146, y);
        const graphics = badge.addComponent(Graphics);
        graphics.fillColor = new Color(61, 216, 178, 255);
        graphics.circle(0, 0, 22);
        graphics.fill();
        this.createGuideLabel(
            badge,
            number,
            0,
            25,
            new Color(16, 44, 50, 255),
            42,
            HorizontalTextAlignment.CENTER,
        );
        this.createGuideLabel(
            parent,
            text,
            y,
            22,
            new Color(255, 255, 255, 255),
            280,
            HorizontalTextAlignment.LEFT,
            'StepLabel' + number,
            28,
        );
    }

    private createSidebarMenuMock(parent: Node, y: number): void {
        const panel = this.createGuideNode('MenuGuideImage', parent, 314, 96, 0, y);
        const graphics = panel.addComponent(Graphics);
        graphics.fillColor = new Color(7, 11, 17, 255);
        graphics.roundRect(-157, -48, 314, 96, 8);
        graphics.fill();
        graphics.fillColor = new Color(28, 32, 39, 255);
        graphics.rect(-157, 18, 314, 30);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = new Color(255, 255, 255, 255);
        for (let i = -1; i <= 1; i++) {
            graphics.moveTo(-137, i * 9);
            graphics.lineTo(-113, i * 9);
        }
        graphics.stroke();
        this.createGuideLabel(panel, '同城', -1, 17, new Color(255, 255, 255, 255), 55, HorizontalTextAlignment.CENTER, 'Local', -52);
        this.createGuideLabel(panel, '商城', -1, 17, new Color(255, 255, 255, 255), 55, HorizontalTextAlignment.CENTER, 'Shop', 18);
        this.createGuideLabel(panel, '推荐', -1, 17, new Color(255, 255, 255, 255), 55, HorizontalTextAlignment.CENTER, 'Recommend', 88);
        this.createGuideLabel(panel, '⌕', 0, 31, new Color(255, 255, 255, 255), 42, HorizontalTextAlignment.CENTER, 'Search', 137);
    }

    private createSidebarAppsMock(parent: Node, y: number): void {
        const panel = this.createGuideNode('AppsGuideImage', parent, 314, 150, 0, y);
        const graphics = panel.addComponent(Graphics);
        graphics.fillColor = new Color(244, 247, 248, 255);
        graphics.roundRect(-157, -75, 314, 150, 9);
        graphics.fill();
        this.createGuideLabel(panel, '常用小游戏', 52, 17, new Color(45, 55, 62, 255), 270, HorizontalTextAlignment.LEFT, 'AppsTitle');

        const iconXs = [-92, 0, 92];
        const iconColors = [
            new Color(255, 116, 111, 255),
            new Color(49, 154, 255, 255),
            new Color(184, 88, 239, 255),
        ];
        iconXs.forEach((x, index) => {
            const icon = this.createGuideNode('AppIcon' + index, panel, 54, 54, x, 3);
            const iconGraphics = icon.addComponent(Graphics);
            iconGraphics.fillColor = iconColors[index];
            iconGraphics.roundRect(-27, -27, 54, 54, 12);
            iconGraphics.fill();
            this.createGuideLabel(
                icon,
                index === 1 ? '➜' : index === 0 ? '◆' : '★',
                0,
                27,
                new Color(255, 255, 255, 255),
                48,
                HorizontalTextAlignment.CENTER,
            );
        });
        this.createGuideLabel(panel, '小游戏', -49, 14, new Color(67, 73, 78, 255), 70, HorizontalTextAlignment.CENTER, 'AppName0', -92);
        this.createGuideLabel(panel, i18n.isEnglish ? 'Arrow Zen' : '难不到我吧', -49, 14, new Color(30, 99, 178, 255), 100, HorizontalTextAlignment.CENTER, 'AppName1', 0);
        this.createGuideLabel(panel, '更多游戏', -49, 14, new Color(67, 73, 78, 255), 70, HorizontalTextAlignment.CENTER, 'AppName2', 92);
    }

    private createSidebarReward(parent: Node, y: number): void {
        const reward = this.createGuideNode('Reward', parent, 110, 110, 0, y);
        const graphics = reward.addComponent(Graphics);
        graphics.lineWidth = 5;
        graphics.strokeColor = new Color(255, 210, 55, 150);
        for (let i = 0; i < 12; i++) {
            const angle = Math.PI * 2 * i / 12;
            graphics.moveTo(Math.cos(angle) * 42, Math.sin(angle) * 42);
            graphics.lineTo(Math.cos(angle) * 53, Math.sin(angle) * 53);
        }
        graphics.stroke();
        graphics.fillColor = new Color(255, 205, 48, 255);
        graphics.circle(0, 0, 39);
        graphics.fill();
        graphics.lineWidth = 4;
        graphics.strokeColor = new Color(255, 245, 180, 255);
        graphics.circle(0, 0, 33);
        graphics.stroke();
        this.createGuideLabel(reward, '+2', 8, 30, new Color(91, 58, 8, 255), 80, HorizontalTextAlignment.CENTER);
        this.createGuideLabel(reward, i18n.t('tiktok.energy'), -22, 16, new Color(91, 58, 8, 255), 80, HorizontalTextAlignment.CENTER);
    }

    private async onClickSidebarGuideAction(): Promise<void> {
        if (tiktokRequiredFeatures.isSidebarRewardClaimed) {
            app.manager.ui.showToast(i18n.t('tiktok.revisit_claimed'));
            return;
        }

        const result = await tiktokRequiredFeatures.runRevisitMission();
        if (result.status !== 'rewarded' && result.status !== 'started') {
            app.manager.ui.showToast(result.message);
        }
        this.refreshTikTokRequiredEntries();
        this.refreshSidebarGuideButton();
    }

    private refreshSidebarGuideButton(): void {
        const action = this.sidebarGuide?.getChildByName('Card')?.getChildByName('Action');
        if (!action) return;

        const claimed = tiktokRequiredFeatures.isSidebarRewardClaimed;
        const completed = tiktokRequiredFeatures.isSidebarTaskCompleted;
        const label = action.getChildByName('ActionLabel')?.getComponent(Label);
        if (label) {
            label.string = claimed
                ? i18n.t('tiktok.sidebar_claimed')
                : completed
                    ? i18n.t('tiktok.sidebar_claim')
                    : i18n.t('tiktok.sidebar_go');
        }

        const graphics = action.getComponent(Graphics) || action.addComponent(Graphics);
        graphics.clear();
        graphics.fillColor = claimed
            ? new Color(126, 139, 145, 255)
            : completed
                ? new Color(255, 190, 45, 255)
                : new Color(61, 216, 178, 255);
        graphics.roundRect(-141, -34, 282, 68, 18);
        graphics.fill();
    }

    private closeSidebarGuide(): void {
        if (!this.sidebarGuide?.isValid) return;
        this.sidebarGuide.destroy();
        this.sidebarGuide = null;
    }

    private createLevelSelectEntry(): void {
        if (this.node.getChildByName('LevelSelectEntry')) return;
        const entry = this.createGuideNode('LevelSelectEntry', this.node, 260, 70, 0, -535);
        const graphics = entry.addComponent(Graphics);
        graphics.fillColor = new Color(50, 139, 255, 255);
        graphics.roundRect(-130, -35, 260, 70, 20);
        graphics.fill();
        graphics.lineWidth = 3;
        graphics.strokeColor = new Color(255, 255, 255, 230);
        graphics.roundRect(-127, -32, 254, 64, 18);
        graphics.stroke();
        this.createGuideLabel(
            entry,
            '',
            0,
            28,
            new Color(255, 255, 255, 255),
            235,
            HorizontalTextAlignment.CENTER,
            'EntryLabel',
        );
        entry.on(Node.EventType.TOUCH_END, this.openLevelSelector, this);
        this.refreshLevelSelectEntry();
    }

    private refreshLevelSelectEntry(): void {
        const label = this.node
            .getChildByName('LevelSelectEntry')
            ?.getChildByName('EntryLabel')
            ?.getComponent(Label);
        if (label) label.string = i18n.t('level.select');
    }

    private openLevelSelector(): void {
        if (this.levelSelector?.isValid) {
            this.levelSelector.active = true;
            this.refreshLevelSelector();
            return;
        }

        const rootSize = this.node.getComponent(UITransform)?.contentSize;
        const width = rootSize?.width || 750;
        const height = rootSize?.height || 1334;
        const overlay = this.createGuideNode('LevelSelector', this.node, width, height, 0, 0);
        overlay.addComponent(BlockInputEvents);
        this.levelSelector = overlay;

        const mask = overlay.addComponent(Graphics);
        mask.fillColor = new Color(8, 15, 45, 210);
        mask.rect(-width / 2, -height / 2, width, height);
        mask.fill();

        const card = this.createGuideNode('Card', overlay, 620, 980, 0, 0);
        const cardScale = Math.min((width - 50) / 620, (height - 100) / 980);
        card.setScale(cardScale, cardScale, 1);
        const cardGraphics = card.addComponent(Graphics);
        cardGraphics.fillColor = new Color(244, 249, 255, 255);
        cardGraphics.roundRect(-310, -490, 620, 980, 30);
        cardGraphics.fill();
        cardGraphics.fillColor = new Color(69, 104, 235, 255);
        cardGraphics.roundRect(-310, 390, 620, 100, 30);
        cardGraphics.fill();
        cardGraphics.rect(-310, 390, 620, 50);
        cardGraphics.fill();

        this.createGuideLabel(
            card,
            i18n.t('level.select_title', { count: MAIN_LEVEL_COUNT }),
            440,
            31,
            new Color(255, 255, 255, 255),
            490,
            HorizontalTextAlignment.CENTER,
            'Title',
        );
        const close = this.createGuideNode('Close', card, 62, 62, 267, 442);
        const closeGraphics = close.addComponent(Graphics);
        closeGraphics.fillColor = new Color(255, 255, 255, 255);
        closeGraphics.circle(0, 0, 29);
        closeGraphics.fill();
        this.createGuideLabel(
            close,
            '×',
            1,
            43,
            new Color(69, 104, 235, 255),
            58,
            HorizontalTextAlignment.CENTER,
        );
        close.on(Node.EventType.TOUCH_END, this.closeLevelSelector, this);

        this.levelGrid = this.createGuideNode('Grid', card, 570, 720, 0, 10);
        this.createLevelPageButton(card, 'Previous', i18n.t('level.previous'), -210, -430, () => {
            this.levelSelectPage--;
            this.refreshLevelSelector();
        });
        this.createLevelPageButton(card, 'Next', i18n.t('level.next_page'), 210, -430, () => {
            this.levelSelectPage++;
            this.refreshLevelSelector();
        });
        this.levelPageLabel = this.createGuideLabel(
            card,
            '',
            -430,
            22,
            new Color(66, 76, 112, 255),
            150,
            HorizontalTextAlignment.CENTER,
            'PageLabel',
        );

        this.levelSelectPage = Math.floor((app.store.game.getLevel() - 1) / this.levelsPerPage);
        this.refreshLevelSelector();
    }

    private refreshLevelSelector(): void {
        if (!this.levelGrid?.isValid) return;
        this.levelGrid.children.slice().forEach((child) => child.destroy());

        const totalPages = Math.ceil(MAIN_LEVEL_COUNT / this.levelsPerPage);
        this.levelSelectPage = Math.max(0, Math.min(totalPages - 1, this.levelSelectPage));
        const firstLevel = this.levelSelectPage * this.levelsPerPage + 1;
        const currentLevel = app.store.game.getLevel();

        for (let index = 0; index < this.levelsPerPage; index++) {
            const level = firstLevel + index;
            if (level > MAIN_LEVEL_COUNT) break;
            const column = index % 5;
            const row = Math.floor(index / 5);
            const x = (column - 2) * 110;
            const y = 295 - row * 118;
            const unlocked = app.store.game.isLevelUnlocked(level);
            const selected = level === currentLevel;
            const button = this.createGuideNode('Level' + level, this.levelGrid, 92, 92, x, y);
            const graphics = button.addComponent(Graphics);
            graphics.fillColor = selected
                ? new Color(255, 153, 46, 255)
                : unlocked
                    ? new Color(66, 190, 108, 255)
                    : new Color(190, 198, 214, 255);
            graphics.roundRect(-46, -46, 92, 92, 18);
            graphics.fill();
            if (selected) {
                graphics.lineWidth = 5;
                graphics.strokeColor = new Color(255, 226, 88, 255);
                graphics.roundRect(-43, -43, 86, 86, 16);
                graphics.stroke();
            }
            this.createGuideLabel(
                button,
                String(level),
                unlocked ? 0 : 8,
                29,
                unlocked ? new Color(255, 255, 255, 255) : new Color(105, 114, 137, 255),
                82,
                HorizontalTextAlignment.CENTER,
            );
            if (!unlocked) {
                this.createGuideLabel(
                    button,
                    i18n.t('level.ad_badge'),
                    -26,
                    15,
                    new Color(105, 114, 137, 255),
                    62,
                    HorizontalTextAlignment.CENTER,
                    'Lock',
                );
            }
            button.on(Node.EventType.TOUCH_END, () => this.selectMainLevel(level), this);
        }

        if (this.levelPageLabel) {
            this.levelPageLabel.string = i18n.t('level.page', {
                page: this.levelSelectPage + 1,
                total: totalPages,
            });
        }
        const card = this.levelSelector?.getChildByName('Card');
        const previous = card?.getChildByName('Previous');
        const next = card?.getChildByName('Next');
        if (previous) previous.active = this.levelSelectPage > 0;
        if (next) next.active = this.levelSelectPage < totalPages - 1;
    }

    private createLevelPageButton(
        parent: Node,
        name: string,
        text: string,
        x: number,
        y: number,
        callback: () => void,
    ): void {
        const button = this.createGuideNode(name, parent, 150, 60, x, y);
        const graphics = button.addComponent(Graphics);
        graphics.fillColor = new Color(69, 104, 235, 255);
        graphics.roundRect(-75, -30, 150, 60, 16);
        graphics.fill();
        this.createGuideLabel(
            button,
            text,
            0,
            21,
            new Color(255, 255, 255, 255),
            134,
            HorizontalTextAlignment.CENTER,
        );
        button.on(Node.EventType.TOUCH_END, callback, this);
    }

    private selectMainLevel(level: number): void {
        if (!app.store.game.isLevelUnlocked(level)) {
            this.showLevelAdPrompt(level);
            return;
        }
        app.store.game.setLevel(level);
        app.manager.globaldata.setIsSpecialLevel(false);
        this.level.string = i18n.t('level.main', { level });
        this.closeLevelSelector();
    }

    private showLevelAdPrompt(level: number): void {
        if (!this.levelSelector?.isValid || this.levelAdShowing) return;
        this.closeLevelAdPrompt();

        const selectorSize = this.levelSelector.getComponent(UITransform)?.contentSize;
        const width = selectorSize?.width || 750;
        const height = selectorSize?.height || 1334;
        const overlay = this.createGuideNode('LevelAdPrompt', this.levelSelector, width, height, 0, 0);
        overlay.addComponent(BlockInputEvents);
        this.levelAdPrompt = overlay;

        const mask = overlay.addComponent(Graphics);
        mask.fillColor = new Color(8, 15, 45, 175);
        mask.rect(-width / 2, -height / 2, width, height);
        mask.fill();

        const card = this.createGuideNode('Card', overlay, 540, 330, 0, 0);
        const cardScale = Math.min(1, (width - 60) / 540);
        card.setScale(cardScale, cardScale, 1);
        const cardGraphics = card.addComponent(Graphics);
        cardGraphics.fillColor = new Color(250, 253, 255, 255);
        cardGraphics.roundRect(-270, -165, 540, 330, 28);
        cardGraphics.fill();
        cardGraphics.fillColor = new Color(69, 104, 235, 255);
        cardGraphics.roundRect(-270, 75, 540, 90, 28);
        cardGraphics.fill();
        cardGraphics.rect(-270, 75, 540, 45);
        cardGraphics.fill();

        this.createGuideLabel(
            card,
            i18n.t('level.unlock_ad_title', { level }),
            112,
            32,
            new Color(255, 255, 255, 255),
            470,
            HorizontalTextAlignment.CENTER,
        );
        this.createGuideLabel(
            card,
            i18n.t('level.unlock_ad_desc'),
            22,
            24,
            new Color(66, 76, 112, 255),
            470,
            HorizontalTextAlignment.CENTER,
        );

        this.createLevelAdButton(card, 'Cancel', i18n.t('common.cancel'), -135, -103, new Color(160, 172, 194, 255), () => {
            this.closeLevelAdPrompt();
        });
        this.createLevelAdButton(card, 'WatchAd', i18n.t('level.watch_ad'), 120, -103, new Color(255, 151, 45, 255), () => {
            this.closeLevelAdPrompt();
            this.unlockLevelByAd(level);
        }, 220);
    }

    private createLevelAdButton(
        parent: Node,
        name: string,
        text: string,
        x: number,
        y: number,
        color: Color,
        callback: () => void,
        width = 180,
    ): void {
        const button = this.createGuideNode(name, parent, width, 68, x, y);
        const graphics = button.addComponent(Graphics);
        graphics.fillColor = color;
        graphics.roundRect(-width / 2, -34, width, 68, 18);
        graphics.fill();
        this.createGuideLabel(
            button,
            text,
            0,
            24,
            new Color(255, 255, 255, 255),
            width - 20,
            HorizontalTextAlignment.CENTER,
        );
        button.on(Node.EventType.TOUCH_END, callback, this);
    }

    private unlockLevelByAd(level: number): void {
        if (this.levelAdShowing || app.store.game.isLevelUnlocked(level) || level > MAIN_LEVEL_COUNT) return;
        this.levelAdShowing = true;
        adManager.showRewardedVideoAd({
            onClose: (completed) => {
                this.levelAdShowing = false;
                if (!completed) {
                    app.manager.ui.showToast(i18n.t('toast.ad_incomplete'));
                    return;
                }
                app.store.game.unlockLevelWithAd(level);
                app.store.game.setLevel(level);
                app.manager.globaldata.setIsSpecialLevel(false);
                this.closeLevelSelector();
                this.startSelectedMainLevel();
            },
            onError: () => {
                this.levelAdShowing = false;
                app.manager.ui.showToast(i18n.t('toast.rewarded_ad_failed'));
            },
        });
    }

    private closeLevelAdPrompt(): void {
        if (!this.levelAdPrompt?.isValid) return;
        this.levelAdPrompt.destroy();
        this.levelAdPrompt = null;
    }

    private closeLevelSelector(): void {
        if (!this.levelSelector?.isValid) return;
        this.closeLevelAdPrompt();
        this.levelSelector.destroy();
        this.levelSelector = null;
        this.levelGrid = null;
        this.levelPageLabel = null;
    }

    private onPlatformShow(): void {
        setTimeout(() => {
            this.refreshTikTokRequiredEntries();
            this.refreshSidebarGuideButton();
        }, 250);
    }

    protected onDestroy(): void {
        game.off(Game.EVENT_SHOW, this.onPlatformShow, this);
        this.closeSidebarGuide();
        this.closeLevelSelector();
    }

    private createGuideNode(
        name: string,
        parent: Node,
        width: number,
        height: number,
        x: number,
        y: number,
    ): Node {
        const node = new Node(name);
        node.layer = this.node.layer;
        parent.addChild(node);
        node.setPosition(x, y, 0);
        node.addComponent(UITransform).setContentSize(width, height);
        return node;
    }

    private createGuideLabel(
        parent: Node,
        text: string,
        y: number,
        fontSize: number,
        color: Color,
        width = 286,
        align = HorizontalTextAlignment.LEFT,
        name = 'Label',
        x = 0,
    ): Label {
        const node = this.createGuideNode(name, parent, width, 42, x, y);
        const label = node.addComponent(Label);
        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = Math.ceil(fontSize * 1.25);
        label.color = color;
        label.horizontalAlign = align;
        label.verticalAlign = VerticalTextAlignment.CENTER;
        label.overflow = Label.Overflow.SHRINK;
        return label;
    }
}
