# TikTok Mini Games 必接能力说明

更新时间：2026-07-20

## 官方必接范围

当前 TikTok Native Mini Game 官方开发表明确标注以下能力为必接：

1. Silent Login：`TTMinis.game.login`
2. Rewarded Ads：`TTMinis.game.createRewardedVideoAd`
3. Home Screen Shortcut：`addShortcut` + `getShortcutMissionReward`
4. Revisit From Profile：`startEntranceMission` + `getEntranceMissionReward`

显式用户授权（昵称、头像）和 IAP 不是本游戏当前必接项。插屏广告也不是必接项，但项目已经一并接入。

官方资料：

- https://developers.tiktok.com/doc/develop-your-mini-game
- https://developers.tiktok.com/doc/silent-login
- https://developers.tiktok.com/doc/home-screen-shortcut
- https://developers.tiktok.com/doc/revisit-from-profile
- https://developers.tiktok.com/doc/acceptance-testing-guidlines

## 项目实现

- `assets/app/tiktok.ads.ts`：激励视频和插屏广告适配。
- `assets/app/config.ads.ts`：TikTok 广告 Placement ID 配置。
- `assets/app/tiktok.required.ts`：静默登录、版本能力检查、快捷方式任务、个人主页回访任务、奖励防重复。
- `assets/app/config.tiktok.ts`：任务奖励和开发预览配置。
- `assets/app/handle.ts`：应用初始化完成后启动 TikTok 必接能力。
- `assets/app-bundle/app-view/page/home/native/PageHome.ts`：首页常驻两个任务入口。

任务奖励：

- Home Reward：3 点体力。
- Revisit Reward：2 点体力。
- 只有 TikTok 返回 `canReceiveReward === true` 才会在正式环境发奖。
- 本地存储记录领取状态，避免同一设备重复发奖。

## 上线前必须配置

### 1. 纯客户端静默登录

当前游戏不需要用户身份、跨设备存档、排行榜或 IAP，因此不建设登录后端。

客户端启动时仍调用 `TTMinis.game.login`，用于满足平台能力检测并确认当前 TikTok 会话可用；返回的一次性 code 不保存、不打印、不上传。项目中不包含 Client Secret、OpenID 或 Access Token。

如果未来增加跨设备用户数据或 IAP，届时必须再建设服务端 OAuth 链路，不能在客户端使用 Client Secret。

### 2. 广告位

填写 `assets/app/config.ads.ts` 中的：

```ts
videoID: 'Rewarded Placement ID',
interstitialID: 'Interstitial Placement ID',
```

### 3. Developer Portal

- 填写有效的 Terms of Service URL 和 Privacy Policy URL，否则登录可能返回 `102102`。
- 如果以后增加网络请求，把对应 HTTPS 域名添加到 Trusted domains；当前必接功能不依赖业务后端。
- 启用 IAA，创建并激活 Rewarded Placement；插屏按需启用。
- 最低 TikTok 客户端/SDK 能力需覆盖 41.0.0，因为两个回访任务 API 从该版本开始提供。
- 添加真实 TikTok 测试账号，使用 `ttmg dev` 做 Remote Debugging 和 Real Device Preview。
- 提交前检查英文兼容、包体大小、空文件、动态脚本来源和网络请求域名。

## 已完成的本地验证

- Cocos Creator 3.8.8 资源刷新成功。
- Creator 浏览器预览可以进入首页。
- 两个入口正常显示并响应点击。
- DEV Mock 奖励分别正确增加 3/2 点体力。
- 重复点击不会重复发放奖励。
- 本次修改文件 TypeScript 错误数为 0。

真实 `TTMinis.game.login`、广告、桌面快捷方式和个人主页跳转只能通过 TikTok DevTool/真机预览最终验证。
