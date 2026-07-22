import { _decorator, HorizontalTextAlignment, Label, Node, Sprite, SpriteFrame, Toggle, UITransform } from 'cc';
import BaseView from 'db://app/base/BaseView';
import { LevelActionType, LevelResultType } from 'db://assets/app-builtin/app-manager/report/ReportManager';
import { app } from 'db://assets/app/app';
import { GameLanguage, i18n } from 'db://assets/app/i18n';

const { ccclass, property } = _decorator;
@ccclass('PopSetting')
export class PopSetting extends BaseView {

    @property(Node) effect: Node = null;
    @property(Node) music: Node = null;
    @property(Node) vibrate: Node = null;
    @property(Node) colorArrow: Node = null;

    @property(SpriteFrame)
    On: SpriteFrame = null;
    @property(SpriteFrame)
    Off: SpriteFrame = null;
    @property(SpriteFrame)
    OnEnglish: SpriteFrame = null;
    @property(SpriteFrame)
    OffEnglish: SpriteFrame = null;

    @property(Node) homeButton: Node = null;

    @property(Node) settingLayout: Node = null;
    
    private updatingLanguageToggles = false;

    // 初始化的相关逻辑写在这
    onLoad() {
        i18n.apply(this.node);
        this.bindLanguageToggles();
    }

    // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)
    onShow(params: any) {
        i18n.apply(this.node);
        this.refreshLanguageButtons();

        //判断是否是首页
        if (params.isHome) {
            this.homeButton.active = false;

        }else{
            this.homeButton.active = true;
        }
        
    }

    // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)
    onHide(result: undefined) {
        // app.manager.ui.show<PaperHomeSetting>({name: 'PaperHomeSetting', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
        return result;
    }

    effect_click() {
        if (app.manager.sound.isEffectMute) {
            app.manager.sound.setEffectMute(false, true);
            this.effect.getComponent(Sprite).spriteFrame = this.enabledSpriteFrame;
        } else {
            app.manager.sound.setEffectMute(true, true);
            this.effect.getComponent(Sprite).spriteFrame = this.disabledSpriteFrame;
        }

    }

    music_click() {
        if (app.manager.sound.isMusicMute) {
            app.manager.sound.setMusicMute(false, true);
            this.music.getComponent(Sprite).spriteFrame = this.enabledSpriteFrame;
        } else {
            app.manager.sound.setMusicMute(true, true);
            this.music.getComponent(Sprite).spriteFrame = this.disabledSpriteFrame;
        }
    }

    vibrate_click() {
        if (app.manager.vibrate.isVibrateMute) {
            app.manager.vibrate.setVibrateMute(false);
            app.manager.vibrate.playVibrate();
            this.vibrate.getComponent(Sprite).spriteFrame = this.enabledSpriteFrame;
        } else {
            app.manager.vibrate.setVibrateMute(true);
            this.vibrate.getComponent(Sprite).spriteFrame = this.disabledSpriteFrame;
        }

    }

    colorArrow_click() {
        if (app.manager.globaldata.getIsColorArrow()) {
            app.manager.globaldata.setIsColorArrow(false);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.disabledSpriteFrame;
        } else {
            app.manager.globaldata.setIsColorArrow(true);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.enabledSpriteFrame;
        }

        //触发一次事件
        app.manager.event.emit(app.config.eventname.colorArrowChange);
    }


    private get enabledSpriteFrame(): SpriteFrame {
        return i18n.isEnglish && this.OnEnglish ? this.OnEnglish : this.On;
    }

    private get disabledSpriteFrame(): SpriteFrame {
        return i18n.isEnglish && this.OffEnglish ? this.OffEnglish : this.Off;
    }

    private refreshToggleSprites() {
        this.effect.getComponent(Sprite).spriteFrame = app.manager.sound.isEffectMute
            ? this.disabledSpriteFrame
            : this.enabledSpriteFrame;
        this.music.getComponent(Sprite).spriteFrame = app.manager.sound.isMusicMute
            ? this.disabledSpriteFrame
            : this.enabledSpriteFrame;
        this.vibrate.getComponent(Sprite).spriteFrame = app.manager.vibrate.isVibrateMute
            ? this.disabledSpriteFrame
            : this.enabledSpriteFrame;
        this.colorArrow.getComponent(Sprite).spriteFrame = app.manager.globaldata.getIsColorArrow()
            ? this.enabledSpriteFrame
            : this.disabledSpriteFrame;
    }
    private bindLanguageToggles(): void {
        const languageRow = this.settingLayout?.getChildByName('bg_language');
        const zhToggle = languageRow?.getChildByName('ZhButton')?.getComponent(Toggle);
        const enToggle = languageRow?.getChildByName('EnButton')?.getComponent(Toggle);
        zhToggle?.node.on(Toggle.EventType.TOGGLE, this.onZhToggle, this);
        enToggle?.node.on(Toggle.EventType.TOGGLE, this.onEnToggle, this);
    }

    private onZhToggle(toggle: Toggle): void {
        if (!this.updatingLanguageToggles && toggle.isChecked) {
            this.selectLanguage('zh-CN');
        }
    }

    private onEnToggle(toggle: Toggle): void {
        if (!this.updatingLanguageToggles && toggle.isChecked) {
            this.selectLanguage('en-US');
        }
    }


    language_zh_click() {
        this.selectLanguage('zh-CN');
    }

    language_en_click() {
        this.selectLanguage('en-US');
    }

    private selectLanguage(language: GameLanguage) {
        i18n.setLanguage(language);
        i18n.apply(this.node);
        this.refreshLanguageButtons();
    }

    private refreshLanguageButtons() {
        const languageRow = this.settingLayout?.getChildByName('bg_language');
        const zhButton = languageRow?.getChildByName('ZhButton');
        const enButton = languageRow?.getChildByName('EnButton');
        const rowFontSize = i18n.isEnglish ? 34 : 40;

        ['bg_music', 'bg_effect', 'bg_vib', 'bg_color', 'bg_language'].forEach((rowName) => {
            const labelNode = this.settingLayout?.getChildByName(rowName)
                ?.getChildByName('name')
                ?.getChildByName('Label');
            const rowLabel = labelNode?.getComponent(Label);
            const labelTransform = labelNode?.getComponent(UITransform);
            if (!labelNode || !rowLabel || !labelTransform) return;

            // 所有名称使用相同左边界和固定文本区域，长文案自动缩小而不侵入控件区。
            labelNode.setPosition(55, 0, 0);
            labelTransform.setAnchorPoint(0, 0.5);
            labelTransform.setContentSize(rowName === 'bg_language' ? 180 : 210, 56);
            rowLabel.horizontalAlign = HorizontalTextAlignment.LEFT;
            rowLabel.overflow = Label.Overflow.SHRINK;
            rowLabel.fontSize = rowFontSize;
            rowLabel.lineHeight = rowFontSize;
        });

        this.refreshToggleSprites();
        if (!zhButton || !enButton) return;

        // 与语言名称保持安全间距，同时确保右侧按钮不超出背景。
        const zhToggle = zhButton.getComponent(Toggle);
        const enToggle = enButton.getComponent(Toggle);
        if (!zhToggle || !enToggle) return;

        zhButton.setPosition(105, 0, 0);
        enButton.setPosition(215, 0, 0);
        zhButton.setScale(1, 1, 1);
        enButton.setScale(1, 1, 1);
        zhButton.getComponent(UITransform)?.setContentSize(105, 58);
        enButton.getComponent(UITransform)?.setContentSize(105, 58);

        const zhLabel = zhButton.getChildByName('Label')?.getComponent(Label);
        const enLabel = enButton.getChildByName('Label')?.getComponent(Label);
        if (zhLabel) zhLabel.string = '\u4E2D\u6587';
        if (enLabel) enLabel.string = 'EN';

        this.updatingLanguageToggles = true;
        zhToggle.isChecked = i18n.language === 'zh-CN';
        enToggle.isChecked = i18n.language === 'en-US';
        this.updatingLanguageToggles = false;
    }

    back_level_click() {
        app.manager.ui.show({name: 'PageHome'});
        // 报告退出关卡事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.EXIT,
        });
        this.hide();
    }

    //重玩游戏
    restart_click() {
       //判断体力是否足够
        if(app.store.game.tili < 1){
            //展示体力不足的弹窗
            // app.manager.ui.showToast('体力不足');
            // 展示体力不足的弹窗
            app.manager.ui.show({name: 'PopResult',data: {TiLiDialog: true}});
            // 报告失败事件
            app.manager.report.reportEvent({
                levelID: app.store.game.level,
                levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
                levelResult: LevelResultType.RETRY,
                externInfo: {
                    failType: 'NoTiLi',
                },
            });
            return;
        }
        app.store.game.setTiLi(app.store.game.getTiLi() - 1);
        app.manager.sound.resumeMusic();
        // 触发重新开始事件
        app.manager.event.emit(app.config.eventname.restart);
        // 报告成功事件
        app.manager.report.reportEvent({
            levelID: app.store.game.level,
            levelAction: app.manager.globaldata.isSpecialLevel ? LevelActionType.CREATIVE_LEVEL : LevelActionType.MAIN_LEVEL,
            levelResult: LevelResultType.RETRY,
        });
        // 关闭弹窗
        this.hide();
    }
}