/**
 * 小游戏平台广告位配置。
 *
 * 抖音小游戏广告位需在抖音开放平台流量主后台创建并启用；
 * 国际 TikTok 构建仍可复用同一套客户端接口。
 * 广告位 ID 不是密钥，可以随客户端代码发布。
 */
export interface AdPlacementConfig {
    videoID: string;
    interstitialID: string;
}

/**
 * 抖音 / TikTok 小游戏广告位。
 *
 * 正式联调前必须替换为空字符串以外的真实 Placement ID：
 * - videoID: 激励视频广告位 ID（当前游戏的核心广告能力）
 * - interstitialID: 插屏广告位 ID（可选，受启动和间隔频控）
 */
export const TIKTOK_AD_CONFIG: AdPlacementConfig = {
    videoID: 'ad7664534731647715348',
    interstitialID: 'ad7663666997092583444',
};

/** 微信小游戏按 AppID 区分的现有广告位。 */
export const WECHAT_AD_CONFIG_MAP: Record<string, AdPlacementConfig> = {
    wxc712915df99c3f3f: {
        videoID: '',
        interstitialID: '',
    },
    wx1a6d00deb8d9b382: {
        videoID: '',
        interstitialID: '',
    },
    wx61a36a9b0b6fc3dc: {
        videoID: '',
        interstitialID: '',
    },
};

export const DEFAULT_WECHAT_AD_CONFIG = WECHAT_AD_CONFIG_MAP.wxc712915df99c3f3f;

export function getWechatAdConfig(appID: string): AdPlacementConfig {
    return WECHAT_AD_CONFIG_MAP[appID] || DEFAULT_WECHAT_AD_CONFIG;
}
