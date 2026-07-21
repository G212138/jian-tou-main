System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, TIKTOK_AD_CONFIG, WECHAT_AD_CONFIG_MAP, DEFAULT_WECHAT_AD_CONFIG;

  function getWechatAdConfig(appID) {
    return WECHAT_AD_CONFIG_MAP[appID] || DEFAULT_WECHAT_AD_CONFIG;
  }

  _export("getWechatAdConfig", getWechatAdConfig);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "52ceaKfts1C0YHbFzc4j2GS", "config.ads", undefined);
      /**
       * 小游戏平台广告位配置。
       *
       * TikTok Placement ID 可在 Developer Portal 的
       * Operation -> Monetization -> In-App Ads (IAAs) 中创建并启用。
       * 广告位 ID 不是密钥，可以随客户端代码发布。
       */


      /**
       * TikTok Mini Games 广告位。
       *
       * 正式联调前必须替换为空字符串以外的真实 Placement ID：
       * - videoID: Rewarded ad Placement ID
       * - interstitialID: Interstitial ad Placement ID
       */
      _export("TIKTOK_AD_CONFIG", TIKTOK_AD_CONFIG = {
        videoID: 'ad7664534731647715348',
        interstitialID: 'ad7663666997092583444'
      });
      /** 微信小游戏按 AppID 区分的现有广告位。 */


      _export("WECHAT_AD_CONFIG_MAP", WECHAT_AD_CONFIG_MAP = {
        wxc712915df99c3f3f: {
          videoID: '',
          interstitialID: ''
        },
        wx1a6d00deb8d9b382: {
          videoID: '',
          interstitialID: ''
        },
        wx61a36a9b0b6fc3dc: {
          videoID: '',
          interstitialID: ''
        }
      });

      _export("DEFAULT_WECHAT_AD_CONFIG", DEFAULT_WECHAT_AD_CONFIG = WECHAT_AD_CONFIG_MAP.wxc712915df99c3f3f);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d7af9bdd5f516bab0cbdaecafe32b790f02c6605.js.map