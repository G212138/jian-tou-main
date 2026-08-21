import { game, sys } from 'cc';
import { App } from './app';
import { TIKTOK_AD_CONFIG, getWechatAdConfig } from './config.ads';
import { adManager } from './tiktok.ads';
import { platformService } from './platform';
import { tiktokRequiredFeatures } from './tiktok.required';
import type { TikTokMissionType } from './tiktok.required';
import { i18n } from './i18n';
import { MAIN_LEVEL_COUNT } from './config.level';

/**
 * ccc除物理引擎等外的基础功能已经准备好了
 */
export function cccReady(app: App) {
    i18n.init();
    // 为了防止web环境中异常掉帧问题(关键代码在cc.game._pacer._handleRAF中)
    if (sys.isBrowser) {
        // game.frameRate = 100; // 在60、90帧率手机上满帧率运行，120帧率手机上以60帧率运行(可能不够流畅但省电)
        game.frameRate = 200; // 满帧率运行
    }
}

/**
 * ccc全部功能都初始化完毕了
 */
export function cccInited(app: App) {

}

/**
 * app除了用户自定义Manager未加载外，其它都已准备好了
 */
export function appReady(app: App) {

}

/**
 * app全部功能都初始化完毕了
 */
export function appInited(app: App) {
    // 初始化关卡 - 只有在本地存储中没有关卡值时才设置初始值
    const currentLevel = app.lib.storage.get(app.config.localkey.LEVEL_KEY);
    if (currentLevel === null || currentLevel === undefined) {
        app.store.game.setLevel(1);
        console.log('appReady: 初始化关卡为1');
    } else {
        const normalizedLevel = Math.min(MAIN_LEVEL_COUNT, Math.max(1, Number(currentLevel) || 1));
        app.store.game.setLevel(normalizedLevel);
        console.log(`appReady: 发现已存在关卡值: ${normalizedLevel}`);
    }
    const savedMaxLevel = Number(app.lib.storage.get(app.config.localkey.MAX_UNLOCKED_LEVEL_KEY)) || 1;
    const migratedMaxLevel = Math.min(
        MAIN_LEVEL_COUNT,
        Math.max(savedMaxLevel, app.store.game.getLevel()),
    );
    app.store.game.setMaxUnlockedLevel(migratedMaxLevel);
    const savedAdUnlockedLevels = app.lib.storage.get(app.config.localkey.AD_UNLOCKED_LEVELS_KEY);
    let adUnlockedLevels: number[] = [];
    if (savedAdUnlockedLevels) {
        try {
            const parsedLevels = JSON.parse(savedAdUnlockedLevels);
            if (Array.isArray(parsedLevels)) adUnlockedLevels = parsedLevels;
        } catch (error) {
            console.warn('Invalid ad unlocked level data, resetting it.', error);
        }
    }
    app.store.game.setAdUnlockedLevels(
        adUnlockedLevels.filter((level) => Number(level) <= MAIN_LEVEL_COUNT),
    );
    //分享初始化
    platformService.openMenuShare({
        title: i18n.t('share.default')
        // imageUrl: '分享图片URL'
    });

    const runtime = globalThis as any;

    // 国际 TikTok 使用 TTMinis.game，国内抖音小游戏由 Cocos 暴露 tt。
    const isTikTokMiniGame = (): boolean => {
        const platform = sys.platform as any;
        const platforms = sys.Platform as any;
        return !!runtime.TTMinis?.game
            || !!runtime.tt
            || platform === platforms.BYTEDANCE_MINI_GAME
            || platform === platforms.BYTEDANCE_GAME;
    };

    // 获取当前平台的 AppID（微信广告配置需要按 AppID 区分）。
    const getAppID = (): string => {
        if (sys.platform === sys.Platform.WECHAT_GAME && runtime.wx) {
            return runtime.wx.getAccountInfoSync().miniProgram.appId;
        }
        return '';
    };

    // 字节系小游戏与微信广告位完全分开，禁止回退到 adunit-* 微信广告位。
    const adConfig = isTikTokMiniGame()
        ? TIKTOK_AD_CONFIG
        : getWechatAdConfig(getAppID());

    if (isTikTokMiniGame() && !adConfig.videoID) {
        console.warn('[Ads] 抖音激励视频广告位未配置，请填写 assets/app/config.ads.ts');
    }
    if (isTikTokMiniGame() && !adConfig.interstitialID) {
        console.info('[Ads] 抖音插屏广告位未配置，插屏将保持关闭');
    }

    adManager.init(adConfig);

    // 抖音必接能力：尽早监听启动参数、检测侧边栏并提供侧边栏复访入口。
    // 国际 TikTok 仍兼容桌面快捷方式和个人主页任务；Creator DEV 预览启用 mock。
    tiktokRequiredFeatures.initialize({
        onGrantReward: (type: TikTokMissionType, amount: number) => {
            app.store.game.setTiLi(app.store.game.tili + amount);
            const rewardName = i18n.t(type === 'shortcut' ? 'tiktok.home_reward' : 'tiktok.revisit_reward');
            app.manager.ui.showToast(i18n.t('tiktok.reward_granted', { name: rewardName, amount }));
        },
        onNotice: (message: string) => app.manager.ui.showToast(message),
    });
}
