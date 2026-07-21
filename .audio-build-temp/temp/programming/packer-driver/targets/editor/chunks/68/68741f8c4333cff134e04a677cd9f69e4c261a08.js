System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, game, sys, TIKTOK_AD_CONFIG, getWechatAdConfig, adManager, platformService, tiktokRequiredFeatures, _crd;

  /**
   * ccc除物理引擎等外的基础功能已经准备好了
   */

  /**
   * ccc全部功能都初始化完毕了
   */

  /**
   * app除了用户自定义Manager未加载外，其它都已准备好了
   */

  /**
   * app全部功能都初始化完毕了
   */
  function cccReady(app) {
    // 为了防止web环境中异常掉帧问题(关键代码在cc.game._pacer._handleRAF中)
    if (sys.isBrowser) {
      // game.frameRate = 100; // 在60、90帧率手机上满帧率运行，120帧率手机上以60帧率运行(可能不够流畅但省电)
      game.frameRate = 200; // 满帧率运行
    }
  }

  function cccInited(app) {}

  function appReady(app) {}

  function appInited(app) {
    // 初始化关卡 - 只有在本地存储中没有关卡值时才设置初始值
    const currentLevel = app.lib.storage.get(app.config.localkey.LEVEL_KEY);

    if (currentLevel === null || currentLevel === undefined) {
      app.store.game.setLevel(1);
      console.log('appReady: 初始化关卡为1');
    } else {
      app.store.game.setLevel(currentLevel);
      console.log(`appReady: 发现已存在关卡值: ${currentLevel}`);
    } //分享初始化


    (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
      error: Error()
    }), platformService) : platformService).openMenuShare({
      title: app.config.localkey.ShareMsg // imageUrl: '分享图片URL'

    });
    const runtime = globalThis; // TikTok Native Mini Games 官方命名空间为 TTMinis.game；
    // Cocos/字节兼容构建也可能暴露 tt。

    const isTikTokMiniGame = () => {
      var _runtime$TTMinis;

      const platform = sys.platform;
      const platforms = sys.Platform;
      return !!((_runtime$TTMinis = runtime.TTMinis) != null && _runtime$TTMinis.game) || !!runtime.tt || platform === platforms.BYTEDANCE_MINI_GAME || platform === platforms.BYTEDANCE_GAME;
    }; // 获取当前平台的 AppID（微信广告配置需要按 AppID 区分）。


    const getAppID = () => {
      if (sys.platform === sys.Platform.WECHAT_GAME && runtime.wx) {
        return runtime.wx.getAccountInfoSync().miniProgram.appId;
      }

      return '';
    }; // TikTok 与微信广告位完全分开，禁止在 TikTok 环境回退到 adunit-* 微信广告位。


    const adConfig = isTikTokMiniGame() ? _crd && TIKTOK_AD_CONFIG === void 0 ? (_reportPossibleCrUseOfTIKTOK_AD_CONFIG({
      error: Error()
    }), TIKTOK_AD_CONFIG) : TIKTOK_AD_CONFIG : (_crd && getWechatAdConfig === void 0 ? (_reportPossibleCrUseOfgetWechatAdConfig({
      error: Error()
    }), getWechatAdConfig) : getWechatAdConfig)(getAppID());

    if (isTikTokMiniGame() && (!adConfig.videoID || !adConfig.interstitialID)) {
      console.warn('[Ads] TikTok Placement ID 尚未配置，请填写 assets/app/config.ads.ts');
    }

    (_crd && adManager === void 0 ? (_reportPossibleCrUseOfadManager({
      error: Error()
    }), adManager) : adManager).init(adConfig); // TikTok Native Mini Game 必接能力：静默登录、桌面快捷方式、个人主页回访。
    // 服务内部会自行判断平台；Creator DEV 预览启用 mock，便于检查首页入口和奖励流程。

    (_crd && tiktokRequiredFeatures === void 0 ? (_reportPossibleCrUseOftiktokRequiredFeatures({
      error: Error()
    }), tiktokRequiredFeatures) : tiktokRequiredFeatures).initialize({
      onGrantReward: (type, amount) => {
        app.store.game.setTiLi(app.store.game.tili + amount);
        const rewardName = type === 'shortcut' ? 'Home Reward' : 'Revisit Reward';
        app.manager.ui.showToast(`${rewardName}: +${amount} Energy`);
      },
      onNotice: message => app.manager.ui.showToast(message)
    });
  }

  function _reportPossibleCrUseOfApp(extras) {
    _reporterNs.report("App", "./app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTIKTOK_AD_CONFIG(extras) {
    _reporterNs.report("TIKTOK_AD_CONFIG", "./config.ads", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetWechatAdConfig(extras) {
    _reporterNs.report("getWechatAdConfig", "./config.ads", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadManager(extras) {
    _reporterNs.report("adManager", "./tiktok.ads", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplatformService(extras) {
    _reporterNs.report("platformService", "./platform", _context.meta, extras);
  }

  function _reportPossibleCrUseOftiktokRequiredFeatures(extras) {
    _reporterNs.report("tiktokRequiredFeatures", "./tiktok.required", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTikTokMissionType(extras) {
    _reporterNs.report("TikTokMissionType", "./tiktok.required", _context.meta, extras);
  }

  _export({
    cccReady: cccReady,
    cccInited: cccInited,
    appReady: appReady,
    appInited: appInited
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      game = _cc.game;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      TIKTOK_AD_CONFIG = _unresolved_2.TIKTOK_AD_CONFIG;
      getWechatAdConfig = _unresolved_2.getWechatAdConfig;
    }, function (_unresolved_3) {
      adManager = _unresolved_3.adManager;
    }, function (_unresolved_4) {
      platformService = _unresolved_4.platformService;
    }, function (_unresolved_5) {
      tiktokRequiredFeatures = _unresolved_5.tiktokRequiredFeatures;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8afafha+81CE6rLLpM3km/u", "handle", undefined);

      __checkObsolete__(['game', 'sys']);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=68741f8c4333cff134e04a677cd9f69e4c261a08.js.map