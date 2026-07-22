import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
import { i18n } from './i18n';

const { ccclass, property } = _decorator;

@ccclass('LocalizedSprite')
export class LocalizedSprite extends Component {
    @property(SpriteFrame)
    zhSprite: SpriteFrame = null;

    @property(SpriteFrame)
    enSprite: SpriteFrame = null;

    private readonly handleLanguageChanged = () => this.refresh();

    protected onLoad() {
        i18n.onChange(this.handleLanguageChanged);
        this.refresh();
    }

    protected onEnable() {
        this.refresh();
    }

    protected onDestroy() {
        i18n.offChange(this.handleLanguageChanged);
    }

    private refresh() {
        const sprite = this.getComponent(Sprite);
        if (!sprite) return;
        sprite.spriteFrame = i18n.language === 'zh-CN' ? this.zhSprite : this.enSprite;
    }
}
