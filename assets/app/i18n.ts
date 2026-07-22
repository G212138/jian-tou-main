import { director, Label, Node, sys } from 'cc';

export type GameLanguage = 'zh-CN' | 'en-US';
export type I18nParams = Record<string, string | number>;

const LANGUAGE_STORAGE_KEY = 'GAME_LANGUAGE';

const messages: Record<string, Record<GameLanguage, string>> = {
    'language.name': { 'zh-CN': '中文', 'en-US': 'English' },
    'language.chinese': { 'zh-CN': '中文', 'en-US': 'Chinese' },
    'language.english': { 'zh-CN': '英文', 'en-US': 'English' },
    'share.default': { 'zh-CN': '箭了还箭！', 'en-US': 'Arrow Escape!' },
    'share.success': { 'zh-CN': '我用《箭头》通关了！', 'en-US': 'I cleared Arrow Escape!' },
    'share.button': { 'zh-CN': '分享', 'en-US': 'Share' },
    'creative.unlocked': { 'zh-CN': '已解锁创意关卡！', 'en-US': 'Creative Levels unlocked!' },
    'creative.play': { 'zh-CN': '去挑战', 'en-US': 'Play Now' },
    'result.great': { 'zh-CN': '你太棒了！', 'en-US': 'Great job!' },
    'level.main': { 'zh-CN': '第 {level} 关', 'en-US': 'Level {level}' },
    'level.creative': { 'zh-CN': '创意关卡 {level}', 'en-US': 'Creative Level {level}' },
    'result.remaining': { 'zh-CN': '再消除 {count} 个箭头即可通关', 'en-US': 'Remove {count} more arrows to win' },
    'result.progress': { 'zh-CN': '当前进度 {progress}%，还差一点点就能通关了！', 'en-US': '{progress}% complete — almost there!' },
    'result.unlock_after': { 'zh-CN': '再玩 {count} 局解锁创意关卡！', 'en-US': 'Play {count} more rounds to unlock Creative Levels!' },
    'toast.ad_incomplete': { 'zh-CN': '广告未播放完成', 'en-US': 'Watch the full ad to receive the reward' },
    'toast.ad_failed': { 'zh-CN': '广告播放失败', 'en-US': 'Ad failed to play' },
    'toast.rewarded_ad_failed': { 'zh-CN': '激励视频播放失败，请重新播放', 'en-US': 'Rewarded video failed. Please try again' },
    'toast.video_failed': { 'zh-CN': '视频播放失败', 'en-US': 'Video failed to play' },
    'toast.drawing': { 'zh-CN': '箭头绘制中...', 'en-US': 'Drawing arrows...' },
    'toast.creative_locked': { 'zh-CN': '第五关后开启！', 'en-US': 'Unlocks after Level 5!' },
    'tiktok.home_reward': { 'zh-CN': '桌面奖励', 'en-US': 'Home Reward' },
    'tiktok.revisit_reward': { 'zh-CN': '回访奖励', 'en-US': 'Revisit Reward' },
    'tiktok.energy': { 'zh-CN': '体力', 'en-US': 'Energy' },
    'tiktok.reward_granted': { 'zh-CN': '{name}：+{amount} 体力', 'en-US': '{name}: +{amount} Energy' },
    'tiktok.home_entry': { 'zh-CN': '桌面奖励  +3 体力', 'en-US': 'Home Reward  +3 Energy' },
    'tiktok.revisit_entry': { 'zh-CN': '回访奖励  +2 体力', 'en-US': 'Revisit Reward  +2 Energy' },
    'tiktok.home_unavailable': { 'zh-CN': '暂不支持添加桌面快捷方式', 'en-US': 'Home screen shortcut is unavailable' },
    'tiktok.revisit_unavailable': { 'zh-CN': '暂不支持回访奖励', 'en-US': 'Revisit Reward is unavailable' },
    'tiktok.update_home': { 'zh-CN': '请更新 TikTok 后领取桌面奖励', 'en-US': 'Please update TikTok to use Home Reward' },
    'tiktok.update_revisit': { 'zh-CN': '请更新 TikTok 后领取回访奖励', 'en-US': 'Please update TikTok to use Revisit Reward' },
    'tiktok.home_claimed': { 'zh-CN': '桌面奖励已领取', 'en-US': 'Home Reward already claimed' },
    'tiktok.revisit_claimed': { 'zh-CN': '回访奖励已领取', 'en-US': 'Revisit Reward already claimed' },
    'tiktok.home_started': { 'zh-CN': '已添加，请从桌面重新打开游戏领取 +3 体力', 'en-US': 'Added. Reopen from the Home Screen to claim +3 Energy' },
    'tiktok.revisit_started': { 'zh-CN': '请从 TikTok 个人主页打开游戏领取 +2 体力', 'en-US': 'Open the game from your TikTok Profile to claim +2 Energy' },
    'tiktok.home_failed': { 'zh-CN': '桌面奖励失败，请重试', 'en-US': 'Home Reward failed. Please try again' },
    'tiktok.revisit_failed': { 'zh-CN': '回访奖励失败，请重试', 'en-US': 'Revisit Reward failed. Please try again' },
    'tiktok.delivery_failed': { 'zh-CN': '奖励发放失败，请重试', 'en-US': 'Reward delivery failed. Please try again' },
};

const staticTranslations: Array<{ 'zh-CN': string; 'en-US': string }> = [
    { 'zh-CN': '游戏加载中', 'en-US': 'Loading...' },
    {
        'zh-CN': '抵制不良游戏，拒绝盗版游戏。 注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。 合理安排时间，享受健康生活。',
        'en-US': 'Play responsibly and protect your personal information.\nTake regular breaks and enjoy a healthy gaming experience.',
    },
    { 'zh-CN': '音 乐', 'en-US': 'Music' },
    { 'zh-CN': '音 效', 'en-US': 'Sound' },
    { 'zh-CN': '震 动', 'en-US': 'Vibration' },
    { 'zh-CN': '彩色箭头', 'en-US': 'Color Arrows' },
    { 'zh-CN': '返回主页', 'en-US': 'Home' },
    { 'zh-CN': '重新开始', 'en-US': 'Restart' },
    { 'zh-CN': '设置', 'en-US': 'Settings' },
    { 'zh-CN': '语言', 'en-US': 'Language' },
    { 'zh-CN': '创意关卡', 'en-US': 'Creative Levels' },
    { 'zh-CN': '开始游戏', 'en-US': 'Play' },
    { 'zh-CN': '第5关解锁', 'en-US': 'Unlocks after Level 5' },
    { 'zh-CN': '复活', 'en-US': 'Revive' },
    { 'zh-CN': '恢复1点血量', 'en-US': 'Restore 1 HP' },
    { 'zh-CN': '再消除2个箭头即可通关', 'en-US': 'Remove 2 more arrows to win' },
    { 'zh-CN': '立即复活', 'en-US': 'Revive Now' },
    { 'zh-CN': '通关失败', 'en-US': 'Level Failed' },
    { 'zh-CN': '当前进度5%，还差一点点就能通关了！', 'en-US': '5% complete — almost there!' },
    { 'zh-CN': '增加时间', 'en-US': 'Add Time' },
    { 'zh-CN': '增加120秒时长', 'en-US': 'Add 120 Seconds' },
    { 'zh-CN': '获取体力', 'en-US': 'Get Energy' },
    { 'zh-CN': '立即恢复 3 点体力', 'en-US': 'Restore 3 Energy' },
    { 'zh-CN': '立即领取', 'en-US': 'Claim Now' },
    { 'zh-CN': '通关成功', 'en-US': 'Level Complete' },
    { 'zh-CN': '你太棒了！', 'en-US': 'Great job!' },
    { 'zh-CN': '返回列表', 'en-US': 'Back to List' },
    { 'zh-CN': '下一关', 'en-US': 'Next Level' },
    { 'zh-CN': '上一关', 'en-US': 'Previous Level' },
    { 'zh-CN': '分享', 'en-US': 'Share' },
    { 'zh-CN': '收藏小程序', 'en-US': 'Save This Game' },
    { 'zh-CN': '我知道了', 'en-US': 'Got It' },
    { 'zh-CN': '点击敲碎指定箭头', 'en-US': 'Tap to smash an arrow' },
    { 'zh-CN': '已解锁创意关卡！', 'en-US': 'Creative Levels unlocked!' },
    { 'zh-CN': '去挑战', 'en-US': 'Play Now' },
    { 'zh-CN': '桌面奖励  +3 体力', 'en-US': 'Home Reward  +3 Energy' },
    { 'zh-CN': '回访奖励  +2 体力', 'en-US': 'Revisit Reward  +2 Energy' },
];

const specialLevelNames: Array<{ 'zh-CN': string; 'en-US': string }> = [
    { 'zh-CN': '米奇头', 'en-US': 'Mouse Head' },
    { 'zh-CN': '猫', 'en-US': 'Cat' },
    { 'zh-CN': '呆呆', 'en-US': 'Dazed Face' },
    { 'zh-CN': '圣诞树', 'en-US': 'Christmas Tree' },
    { 'zh-CN': '圣诞袜', 'en-US': 'Christmas Stocking' },
    { 'zh-CN': '菠萝', 'en-US': 'Pineapple' },
    { 'zh-CN': '太空人', 'en-US': 'Astronaut' },
    { 'zh-CN': '糖果', 'en-US': 'Candy' },
    { 'zh-CN': '小蜜蜂', 'en-US': 'Bee' },
    { 'zh-CN': '冰淇淋', 'en-US': 'Ice Cream' },
    { 'zh-CN': '花朵', 'en-US': 'Flower' },
    { 'zh-CN': '企鹅', 'en-US': 'Penguin' },
    { 'zh-CN': '摇摇马', 'en-US': 'Rocking Horse' },
    { 'zh-CN': '剪刀', 'en-US': 'Scissors' },
    { 'zh-CN': '螃蟹', 'en-US': 'Crab' },
    { 'zh-CN': '手柄', 'en-US': 'Gamepad' },
    { 'zh-CN': '姜饼人', 'en-US': 'Gingerbread Man' },
    { 'zh-CN': '狐狸', 'en-US': 'Fox' },
    { 'zh-CN': '金鱼', 'en-US': 'Goldfish' },
    { 'zh-CN': '兔子', 'en-US': 'Rabbit' },
    { 'zh-CN': '脚掌', 'en-US': 'Paw Print' },
    { 'zh-CN': '兔子', 'en-US': 'Rabbit' },
    { 'zh-CN': '城堡', 'en-US': 'Castle' },
    { 'zh-CN': '蝴蝶结', 'en-US': 'Bow' },
    { 'zh-CN': '福', 'en-US': 'Good Fortune' },
    { 'zh-CN': '大黄鸭', 'en-US': 'Rubber Duck' },
    { 'zh-CN': '伞', 'en-US': 'Umbrella' },
    { 'zh-CN': '天鹅', 'en-US': 'Swan' },
    { 'zh-CN': '玩偶', 'en-US': 'Doll' },
    { 'zh-CN': 'LABUBU', 'en-US': 'LABUBU' },
];

type LanguageListener = (language: GameLanguage) => void;

class GameI18n {
    private _language: GameLanguage = 'en-US';
    private initialized = false;
    private listeners = new Set<LanguageListener>();

    get language(): GameLanguage {
        this.init();
        return this._language;
    }

    get isEnglish(): boolean {
        return this.language === 'en-US';
    }

    init(): GameLanguage {
        if (this.initialized) return this._language;
        this.initialized = true;

        const saved = sys.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        this._language = saved === 'zh-CN' || saved === 'en-US'
            ? saved
            : this.normalizeLanguage(this.detectSystemLanguage());
        return this._language;
    }

    setLanguage(language: GameLanguage) {
        this.init();
        if (this._language === language) {
            this.applyToCurrentScene();
            return;
        }

        this._language = language;
        sys.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        this.applyToCurrentScene();
        this.listeners.forEach((listener) => listener(language));
    }

    onChange(listener: LanguageListener) {
        this.listeners.add(listener);
    }

    offChange(listener: LanguageListener) {
        this.listeners.delete(listener);
    }

    t(key: string, params: I18nParams = {}): string {
        this.init();
        const template = messages[key]?.[this._language] ?? messages[key]?.['en-US'] ?? key;
        return template.replace(/\{(\w+)\}/g, (match, name: string) => {
            const value = params[name];
            return value === undefined ? match : String(value);
        });
    }

    specialLevelName(index: number): string {
        this.init();
        return specialLevelNames[index]?.[this._language] ?? String(index + 1);
    }

    apply(root: Node | null | undefined) {
        if (!root?.isValid) return;
        this.init();

        const visit = (node: Node) => {
            const label = node.getComponent(Label);
            if (label?.string) label.string = this.translateVisibleText(label.string);
            node.children.forEach(visit);
        };
        visit(root);
    }

    private applyToCurrentScene() {
        this.apply(director.getScene());
    }

    private translateVisibleText(value: string): string {
        const staticEntry = staticTranslations.find((entry) =>
            entry['zh-CN'] === value || entry['en-US'] === value,
        );
        if (staticEntry) return staticEntry[this._language];

        const specialLevel = specialLevelNames.find((entry) =>
            entry['zh-CN'] === value || entry['en-US'] === value,
        );
        if (specialLevel) return specialLevel[this._language];

        const mainLevel = value.match(/^(?:第\s*(\d+)\s*关|Level\s*(\d+))$/i);
        if (mainLevel) return this.t('level.main', { level: mainLevel[1] ?? mainLevel[2] });

        const creativeLevel = value.match(/^(?:创意关卡\s*(\d+)|Creative Level\s*(\d+))$/i);
        if (creativeLevel) return this.t('level.creative', { level: creativeLevel[1] ?? creativeLevel[2] });

        return value;
    }

    private detectSystemLanguage(): string {
        const runtime = globalThis as any;
        const candidates = [runtime.TTMinis?.game, runtime.tt, runtime.wx];
        for (const api of candidates) {
            try {
                const language = api?.getSystemInfoSync?.()?.language;
                if (language) return language;
            } catch (error) {
                console.warn('[I18n] Failed to read platform language', error);
            }
        }

        return runtime.navigator?.language || 'en-US';
    }

    private normalizeLanguage(language: string): GameLanguage {
        return String(language).toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US';
    }
}

export const i18n = new GameI18n();
