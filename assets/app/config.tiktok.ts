/** 抖音侧边栏复访与国际 TikTok 任务奖励配置。 */
export interface TikTokRequiredFeatureConfig {
    shortcutRewardTili: number;
    /** 抖音侧边栏复访（或国际 TikTok 回访任务）奖励体力。 */
    revisitRewardTili: number;
    /** 仅用于 Creator 浏览器开发预览，不会进入正式包逻辑。 */
    enableDevMock: boolean;
}

export const TIKTOK_REQUIRED_FEATURE_CONFIG: TikTokRequiredFeatureConfig = {
    shortcutRewardTili: 3,
    revisitRewardTili: 2,
    enableDevMock: true,
};