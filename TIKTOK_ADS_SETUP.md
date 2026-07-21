# TikTok Mini Games 广告接入说明

## 当前状态

项目已使用独立 `adManager` 接入 TikTok Mini Games 的激励视频和插屏广告；所有弹窗和关卡脚本均已移除 MiniSDK 依赖。

- `assets/app/handle.ts`：识别 TikTok/ByteDance 运行环境，加载广告配置并初始化 `adManager`。
- `assets/app/config.ads.ts`：集中保存 TikTok 与微信广告位配置。
- `assets/app/tiktok.ads.ts`：封装 TikTok 原生广告 API、回调清理、并发保护、激励发放判断和插屏冷却。

## 上线前必须填写

在 TikTok for Developers 后台进入 Mini Game 的 **Operation > Monetization > In-App Ads**，启用广告并创建、激活广告位。然后把生成的 Placement ID 填到：

```ts
// assets/app/config.ads.ts
export const TIKTOK_AD_CONFIG: AdPlacementConfig = {
    videoID: '激励视频 Placement ID',
    interstitialID: '插屏 Placement ID',
};
```

不要填写原微信小游戏的 `adunit-*`；TikTok 与微信广告位配置必须保持独立。

## 运行行为

- 优先调用 `TTMinis.game.createRewardedVideoAd` / `createInterstitialAd`，兼容旧环境的 `tt` 命名空间。
- 激励视频只有在关闭回调返回 `isEnded === true` 时才发放奖励。
- 每次激励请求创建一个新实例，符合 TikTok 单个实例只能展示一次的限制。
- 插屏广告设置 30 秒最短展示间隔，并阻止重复并发调用。
- Creator 浏览器开发预览会模拟成功回调，便于继续调试游戏流程；真实广告必须在 TikTok 设备预览或发布环境验证。

## 验证建议

1. 在 Cocos Creator 构建 ByteDance Mini Game。
2. 使用 TikTok Mini Games CLI/设备远程预览运行构建产物。
3. 开发阶段开启 TikTok Ad Mock，分别验证完整观看、提前关闭和加载失败。
4. 检查完整观看才获得奖励，提前关闭不发奖励，插屏关闭后游戏流程能继续。

## 官方资料

- https://developers.tiktok.com/doc/in-app-ads
- https://developers.tiktok.com/doc/mini-games-sdk-overview
- https://developers.tiktok.com/doc/debug-your-mini-game
