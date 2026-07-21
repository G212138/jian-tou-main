/** TikTok Mini Games 必接能力的项目配置。 */
export interface TikTokRequiredFeatureConfig {
    shortcutRewardTili: number;
    revisitRewardTili: number;
    /** 仅用于 Creator 浏览器开发预览，不会进入正式包逻辑。 */
    enableDevMock: boolean;
}

export const TIKTOK_REQUIRED_FEATURE_CONFIG: TikTokRequiredFeatureConfig = {
    shortcutRewardTili: 3,
    revisitRewardTili: 2,
    enableDevMock: true,
};