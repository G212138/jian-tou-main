# 项目理解与重启上下文

> 给后续接手本项目的 Codex/开发者：开始工作前先读本文，再针对任务阅读相关源码。本文只记录 2026-07-20 对当前工作区的只读梳理结果，不代表产品需求文档，也没有替代 Cocos Creator 场景/Prefab 配置。

## 1. 一句话概览

这是一个基于 **Cocos Creator 3.8.8 + TypeScript + XForge 2.0.0** 的竖屏 2D 休闲解谜小游戏，游戏名/分享文案为“箭了还箭！”。玩家需要按正确顺序点击网格中的带方向箭头，让所有箭头路径在不撞到其他路径的情况下移出棋盘。

当前明确构建过的目标是 **字节跳动小游戏**，代码中同时保留了较多微信小游戏能力（广告、数据上报、推荐组件、分享等）。

## 2. 技术与工程基线

- Cocos Creator：`3.8.8`（见 `package.json`）。
- TypeScript：项目 `tsconfig.json` 继承 `temp/tsconfig.cocos.json`，`strict: false`，但 `noImplicitAny: true`。
- XForge：`extensions/app/package.json` 为 `2.0.0`，负责 App 生命周期、Manager、UI、资源加载、音频、事件、存储等。
- 扩展包：
  - `@gamex/cc-store 2.0.7`：Proxy 响应式 Store 与 `bindStore`。
  - 自研 `adManager` 与 `platformService`：分别封装广告，以及分享/震动等平台能力。
- 设计分辨率：`750 x 1334`，竖屏，`fitWidth: true`。
- 当前场景：`assets/app-scene/main.scene`，场景 UUID 与 `settings/v2/packages/scene.json` 一致。
- 主场景主要节点：`Canvas`、`AppInitLayer`、`UserInterface`、`UserManager`、两个 Camera；后三者承担 XForge 初始化、UI 容器和 Manager 容器职责。

## 3. 应优先关注的目录

```text
assets/
  app/                         App 单例、生命周期钩子、全局框架设置
  app-appinit/                 首屏加载界面和业务 Bundle 预加载
  app-builtin/
    app-admin/executor.ts      XForge 生成的类型/注册入口
    app-model/                 事件名、本地存储 key、响应式 game store
    app-manager/               全局数据、体力、震动、数据上报 Manager
  app-bundle/
    app-sound/                 BGM 与音效
    app-view/page/home/        首页
    app-view/page/main/        主玩法页及核心玩法逻辑
    app-view/page/sp-level/    创意关卡列表
    app-view/pop/result/       成功、失败、复活、体力不足等弹窗
    app-view/pop/setting/      设置弹窗
  app-scene/main.scene         唯一主场景
  pkg-export/                  cc-store 的导出桥接

extensions/app/                XForge 框架源码与编辑器扩展
extensions/pkg/                项目内安装的 @gamex 扩展包
settings/                      Cocos 项目/构建/引擎设置
profiles/                      Cocos 本机/构建 profile（通常被 gitignore）
build/                         已生成的构建产物（通常被 gitignore）
library/、temp/                Cocos 缓存和生成文件（通常被 gitignore）
```

业务改动通常只应落在 `assets`。不要手工修改 `library`、`temp`、`build`。`assets/app-builtin/app-admin/executor.ts` 带有明显的自动生成性质，新增 UI/Manager/Model 后应优先使用 XForge/Cocos 的刷新机制，而不是长期手改该文件。

## 4. 启动与初始化流程

1. `assets/app/app.ts` 创建全局 `app` 单例，继承 XForge `Core<IApp>`；开发环境还会把 `app` 和 `App` 暴露到 `window`。
2. `assets/app-appinit/view/AppInit.ts` 与 `BaseAppInit` 协作：
   - 框架加载 `app-model`、`app-admin`、`app-manager` 等 Bundle；
   - 业务侧预加载 6 个 Bundle：`page-home-res`、`page-home`、`page-main-res`、`page-main`、`page-sp-level-res`、`page-sp-level`；
   - 每个业务 Bundle 完成后调用一次 `nextInit()` 并更新进度条。
3. XForge 实例化系统 Manager 与用户 Manager，随后触发 `EVENT_APPINIT_FINISHED`。
4. `assets/app/handle.ts::appInited()`：
   - 从本地存储恢复主线关卡，首次启动设为第 1 关；
   - 注册菜单分享；
   - 获取小游戏 AppID 并初始化广告配置。
5. XForge 根据 `assets/app/setting.ts` 默认打开 `PageHome`，默认播放 `music/bgm`。
6. `AppInit.onFinish()` 检查 `newUser`。首次用户会直接打开 `PageMain`，并将新用户标记写为 `false`；最后销毁加载层。

## 5. XForge 使用方式

业务通过 `app` 访问全局能力：

- `app.manager.ui`：`show/hide/showToast/showLoading` 等 UI 操作。
- `app.manager.event`：跨组件事件总线。
- `app.manager.loader`：按 Bundle 加载资源。
- `app.manager.sound`：BGM、音效和静音状态。
- `app.manager.globaldata`：本项目运行时全局数据。
- `app.manager.tili`：体力恢复。
- `app.manager.vibrate`：震动设置和触发。
- `app.manager.report`：关卡行为上报。
- `app.store.game`：响应式全局状态；UI 使用 `bindStore` 自动刷新 Label。
- `app.lib.storage`：本地持久化。

UI 名称已生成到 `executor.ts`：`PageHome`、`PageMain`、`PageSpLevel`、`PopResult`、`PopSetting`。预加载 UI 为 `PopResult`、`PageMain`、`PopSetting`，默认 UI 为 `PageHome`。

## 6. 核心玩法模型

### 6.1 关卡数据

- 主线：`assets/app-bundle/app-view/page/main/resources/mapdata.txt`，当前共 **498** 条。
- 创意关卡：`assets/app-bundle/app-view/page/sp-level/resources/mapdata.txt`，当前共 **30** 条。
- 文件内容是 JSON 字符串数组，每条字符串格式：

```text
grid_width;grid_height;path1|path2|...
```

每条 path 是用逗号分隔的一维格子索引。`GlobaldataManager.CreateMapDataByStr()` 按 `x = index % width`、`y = floor(index / width)` 还原为：

```ts
{
  grid_width: number,
  grid_height: number,
  ropes: [number, number][][]
}
```

主线关卡超过配置范围后，`getLevelConfig()` 试图循环使用约第 400～499 关的数据；当前文件实际只有 498 条，最终还带有末项兜底。

### 6.2 绘制与点击

- `RopeManager.ts` 是棋盘入口：读取关卡、计算自适应格子尺寸、生成二维占用数组、逐条创建 Rope 节点。
- 每条 Rope 使用 Cocos `Graphics` 绘制路径和末端三角箭头，并动态挂载 `RopeRun`。
- 路径数组最后两个点决定箭头朝向；点击棋盘后，屏幕坐标转换为网格坐标，再通过全局 `ROPE_RUN` 事件让各 `RopeRun` 判断点击是否命中自己。
- `RopeManager.checkRunable()` 从箭头端沿方向扫描二维占用数组：
  - 没有阻挡：清空该 Rope 占用的格子，播放钢琴音/震动，并用逐帧重绘让整条路径滑出屏幕；
  - 有阻挡：路径向前试探后红色回弹，阻挡路径闪红，扣 1 点局内生命。
- 全部 Rope 移出后打开成功弹窗。
- `Drag.ts` 支持棋盘单指平移、双指缩放和鼠标滚轮缩放，并限制棋盘不露出父节点范围。

### 6.3 局内资源和失败条件

- 局外体力：上限 5，每次进入或重开消耗 1；不足时显示 `TiLiDialog`。
- 体力恢复：每 5 分钟恢复 1 点，`TiliManager` 每秒根据时间戳结算并维护倒计时文本。
- 局内生命：每局 3 点；一次错误碰撞只扣当前 Rope 的一次生命。生命归零时暂停倒计时并进入失败/复活流程。
- 局内倒计时：代码实际为 **480 秒**（注释仍写“10 分钟/600 秒”）。目前它在第一次受伤后由 `gameHeartManager` 启动，而不是进入关卡立即启动。
- 复活：激励视频可恢复 1 点局内生命，或在超时后增加 120 秒。
- 道具：
  - 提示道具：看激励视频后高亮一条可直接移出的 Rope；
  - 锤子道具：看激励视频后，下一次点击可直接敲碎目标 Rope。

## 7. 页面与用户流程

### PageHome

- 展示主线关卡和体力，播放 BGM。
- 开始按钮消耗 1 体力、清除创意关卡标记、打开 `PageMain` 并触发 `restart`。
- 主线超过第 5 关后可进入创意关卡列表。
- 提供设置、分享和玩法说明入口。

### PageMain

- 复用同一个 Prefab 承载主线和创意关卡。
- `restart` 是最重要的“重置本局”事件：重新读图、重置局内生命、计时和拖拽状态，并重置全局逃逸计数。
- 设置按钮仅在所有 Rope 绘制完成后允许打开。
- 每成功移出一条 Rope，依次循环播放 A～G 钢琴音效。

### PageSpLevel

- 30 个创意关卡名称目前硬编码在 `PageSpLevel.ts`，必须与创意 `mapdata.txt` 顺序保持一致。
- 状态：`Unlock(未解锁)`、`Challenge(待挑战)`、`Complete(已完成)`。
- 第一关默认待挑战，其他未解锁；未解锁项可通过激励视频直接变为待挑战。
- 完成某关且之前关卡都已完成时，会顺序解锁下一关。
- 点击待挑战/已完成关卡时，将配置写入 `GlobaldataManager`，再复用 `PageMain`。

### PopResult / PopSetting

- `PopResult` 是一个聚合弹窗，通过 data 参数切换超时、无生命、重开确认、玩法说明、成功、体力不足等子节点。
- 成功弹窗负责成功上报、下一关/首页/创意列表/分享。
- 设置弹窗控制音乐、音效、震动和彩色箭头；局内还可返回首页或消耗体力重玩。

## 8. 状态与本地存储

`store.game.ts` 中的响应式状态：

- `tili`：局外体力。
- `lastRecoveryTimestamp`：体力恢复基准时间。
- `level`：主线关卡，默认 1。
- `daojishi`：体力恢复倒计时显示字符串。
- `specialLevel`：创意关卡显示值，默认 1；当前代码没有看到随创意关卡选择更新它。

主要本地 key（定义于 `config.localkey.ts`）：

- `LEVEL_KEY`：主线关卡。
- `SpecialLevelKey`：创意关卡数值。
- `TILI_KEY`、`LAST_RECOVERY_TIMESTAMP_KEY`：体力和恢复时间。
- `NeedGuideOne`、`NeedGuideTwo`：第 1/2 关引导。
- `NewUser`：首次用户标记。
- `isColorArrow`：彩色箭头开关。
- `LEVEL_STATUS_KEY`：序列化后的创意关卡状态数组。

运行时但未持久化的关键数据在 `GlobaldataManager`：当前占用网格、Rope 总数/已绘制数/已逃逸数、锤子状态、当前创意配置、创意索引、插屏可展示状态和本关耗时等。

## 9. 事件总线要点

集中定义在 `config.eventname.ts`，主要分组如下：

- 局流程：`restart`、`onLevelChanged`。
- 道具：`DaoJuTipUse`、`DaoJuHammerUse`、`DaoJuHammerUseOver`。
- 局内生命/时间：`gameHeartJian`、`gameHeartAdd`、`timeAdd`、`startGameDaoJiShi`、`pauseCountDown`、`resumeCountDown`。
- 引导：`showGuideOne/Two`、`guideOneMove`、`guideOneEnd`、`guideTwoEnd`。
- 反馈：`errorFlash`、`playPianoSound`、`beiZhuangJiShark`、`colorArrowChange`。
- 创意关卡：`StartSpecialLevel`、`UpdateSPLevelStatus`。

另有未集中定义的字符串事件：`ROPE_RUN` 和 `ShowRestartDialog`。

## 10. Bundle 与首包策略

页面脚本与资源分开成 Bundle，例如：

- `page-home` / `page-home-res`
- `page-main` / `page-main-res`
- `page-sp-level` / `page-sp-level-res`
- `pop-result` / `pop-result-res`
- `pop-setting` / `pop-setting-res`

字节、微信等小游戏平台下配置为 subpackage，体现了 XForge 的脚本/资源分包策略。修改目录 meta 或 Bundle 名称会影响 `AppInit.InitList`、UI 加载和构建分包，必须同步检查。

## 11. 小游戏平台、广告与上报

- `handle.ts` 支持从微信 `wx` 或字节 `tt` 获取 AppID。
- 广告配置表目前只有 3 个微信 AppID，且广告单元 ID 都是 `adunit-*`；未知 AppID 使用默认项。
- 当前字节构建 profile 的 `appid` 是 `testappId`，正式发布前必须使用真实 AppID 并核对对应广告单元。
- 激励视频用于提示、锤子、复活、加体力和创意关卡解锁；成功弹窗在条件满足时展示插屏。
- 插屏开关在 `GlobaldataManager` 初始化 6 分钟后开启；主线第 3 关成功时优先拉起微信推荐组件。
- `ReportManager` 只在存在 `wx.getMiniReportManager` 时初始化，固定事件 ID 为 `10000003`；否则仅警告/打印，不真正上报。
- 推荐组件 `wx.createPageManager` 也是微信专用能力。
- `adManager` 和 `platformService` 会按能力依次解析 `TTMinis.game`、`tt`、`wx`。在真机/平台工具中验证广告、分享、震动和 API 兼容性非常重要。

## 12. 如何打开、预览和构建

1. 用 **Cocos Creator 3.8.8** 直接打开项目根目录。
2. 打开 `assets/app-scene/main.scene`。
3. 编辑器预览用于验证 Web/桌面基础玩法；广告、分享、报告、推荐组件必须在相应小游戏开发工具或真机验证。
4. 构建面板选择 `bytedance-mini-game`，竖屏。当前输出目录为 `build/bytedance-mini-game`。
5. 根目录的 npm scripts 主要用于 XForge CLI 和扩展包管理，不包含常规的 `start/build/test` 游戏脚本：
   - `npm run cli`
   - `npm run upgrade`
   - `npm run package`
   - `npm run pkg:add|pkg:remove|pkg:update`

## 13. 当前验证基线（2026-07-20）

- 根目录没有 `node_modules`，也没有发现业务测试文件或测试脚本。
- 已存在一次字节小游戏成功构建：日志 `temp/builder/log/bytedance-mini-game2026-7-17 15-11.log` 最终显示 **2026-07-17 15:13:44 构建完成**，耗时约 1 分 51 秒；`build/bytedance-mini-game` 有完整输出和分包目录。
- 日志中间出现过构建子进程 `SIGTERM` 调试信息，但最终所有构建阶段完成，不能仅凭该中间日志判断构建失败。
- 使用本机 Cocos 3.8.8 自带 `tsc --noEmit` 直接检查时返回 226 个错误：131 个来自 Cocos 声明，95 个来自 XForge/扩展包，`assets` 业务源码匹配到 0 个错误。这个命令不等同于 Cocos 正式构建，现阶段应以编辑器构建为准。
- 当前目录没有 `.git` 元数据，因此无法执行 `git status`；`.gitignore` 存在，并配置忽略 `temp/build/library/profiles` 等生成目录。

## 14. 已观察到、后续改动前应复核的点

以下只是代码阅读发现，本文未做修复：

1. `SuccessDialog.start()` 在判断是否为创意关卡之前，无条件执行 `setLevel(level + 1)`；因此完成创意关卡看起来也会推进主线关卡。
2. `PageMain.onShow()` 对同一个关卡 Label 连续调用两次 `bindStore`：先绑定“第 N 关”，随后又无条件绑定“创意关卡 N”；主线关卡标题显示逻辑需要在实际运行中确认。
3. `Time.ts` 的注释写 10 分钟/600 秒，实际配置为 480 秒，并且当前仅在第一次错误碰撞后启动倒计时。
4. 新用户在资源初始化完成后直接进入 `PageMain`，但代码路径中没有看到像首页开始按钮那样扣除 1 点体力；这可能是有意的新手福利，也可能需要产品确认。
5. 创意关卡名称是硬编码数组；新增/排序创意地图时必须同步修改。
6. `specialLevel` Store 有持久化方法，但进入创意关卡时实际使用的是 `GlobaldataManager.specialLevelIndex/specialConfig`，未看到同步更新 `specialLevel`。
7. 正式字节发布前需要重点复核 `testappId`、默认微信样式广告单元、`adManager` 的平台兼容层，以及微信专用上报/推荐功能在字节环境中的降级行为。
8. 原 `readme.md` 主要是 XForge 框架介绍，当前终端读取存在明显乱码，不能当作本游戏的完整说明。

## 15. 后续接手建议

- 涉及玩法时，优先从 `RopeManager.ts`、`RopeRun.ts`、`GlobaldataManager.ts` 和两份 `mapdata.txt` 入手。
- 涉及流程/UI 时，先查 `PageHome.ts`、`PageMain.ts`、`PageSpLevel.ts`、`PopResult.ts` 及对应 Prefab。
- 涉及持久化时，同时检查 `config.localkey.ts`、`store.game.ts` 和 `GlobaldataManager.ts`。
- 涉及广告/平台时，同时检查 `handle.ts`、`tiktok.ads.ts`、`platform.ts` 和具体平台真机行为。
- 改动事件名、UI 名、Bundle 名或 Manager/Model 后，检查 XForge 自动生成/注册结果与所有字符串引用。
- 提交前至少做：Cocos 编辑器预览、目标小游戏构建、对应平台开发工具运行；广告/分享/复活/关卡存档需真机回归。
