import { game, sys } from 'cc';
import { App } from './app';
import { TIKTOK_AD_CONFIG, getWechatAdConfig } from './config.ads';
import { adManager } from './tiktok.ads';
import { platformService } from './platform';
import { tiktokRequiredFeatures } from './tiktok.required';
import type { TikTokMissionType } from './tiktok.required';

/**
 * ccc除物理引擎等外的基础功能已经准备好了
 */
export function cccReady(app: App) {
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
        app.store.game.setLevel(currentLevel);
        console.log(`appReady: 发现已存在关卡值: ${currentLevel}`);
    }
    //分享初始化
    platformService.openMenuShare({
        title: app.config.localkey.ShareMsg
        // imageUrl: '分享图片URL'
    });

    const runtime = globalThis as any;

    // TikTok Native Mini Games 官方命名空间为 TTMinis.game；
    // Cocos/字节兼容构建也可能暴露 tt。
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

    // TikTok 与微信广告位完全分开，禁止在 TikTok 环境回退到 adunit-* 微信广告位。
    const adConfig = isTikTokMiniGame()
        ? TIKTOK_AD_CONFIG
        : getWechatAdConfig(getAppID());

    if (isTikTokMiniGame() && (!adConfig.videoID || !adConfig.interstitialID)) {
        console.warn('[Ads] TikTok Placement ID 尚未配置，请填写 assets/app/config.ads.ts');
    }

    adManager.init(adConfig);

    // TikTok Native Mini Game 必接能力：静默登录、桌面快捷方式、个人主页回访。
    // 服务内部会自行判断平台；Creator DEV 预览启用 mock，便于检查首页入口和奖励流程。
    tiktokRequiredFeatures.initialize({
        onGrantReward: (type: TikTokMissionType, amount: number) => {
            app.store.game.setTiLi(app.store.game.tili + amount);
            const rewardName = type === 'shortcut' ? 'Home Reward' : 'Revisit Reward';
            app.manager.ui.showToast(`${rewardName}: +${amount} Energy`);
        },
        onNotice: (message: string) => app.manager.ui.showToast(message),
    });
}