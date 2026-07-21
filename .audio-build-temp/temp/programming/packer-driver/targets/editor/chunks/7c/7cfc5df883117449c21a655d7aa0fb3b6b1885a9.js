System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Game, game, sys, DEV, TIKTOK_REQUIRED_FEATURE_CONFIG, TikTokRequiredFeatures, _crd, CLAIM_STORAGE_KEYS, tiktokRequiredFeatures;

  function _reportPossibleCrUseOfTIKTOK_REQUIRED_FEATURE_CONFIG(extras) {
    _reporterNs.report("TIKTOK_REQUIRED_FEATURE_CONFIG", "./config.tiktok", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTikTokRequiredFeatureConfig(extras) {
    _reporterNs.report("TikTokRequiredFeatureConfig", "./config.tiktok", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Game = _cc.Game;
      game = _cc.game;
      sys = _cc.sys;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }, function (_unresolved_2) {
      TIKTOK_REQUIRED_FEATURE_CONFIG = _unresolved_2.TIKTOK_REQUIRED_FEATURE_CONFIG;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "24621HekKJBj63O3+RuTyeJ", "tiktok.required", undefined);

      __checkObsolete__(['Game', 'game', 'sys']);

      CLAIM_STORAGE_KEYS = {
        shortcut: 'TIKTOK_SHORTCUT_REWARD_CLAIMED',
        revisit: 'TIKTOK_REVISIT_REWARD_CLAIMED'
      };
      /**
       * TikTok Native Mini Game 必接能力适配层。
       *
       * - 启动时调用 silent login；当前单机玩法不保存、不上传一次性 code。
       * - 对 41.0.0+ 的快捷方式与个人主页回访 API 先执行 canIUse。
       * - 平台返回 canReceiveReward 后才发放奖励，并用本地标记阻止重复发放。
       */

      TikTokRequiredFeatures = class TikTokRequiredFeatures {
        constructor() {
          this.config = _crd && TIKTOK_REQUIRED_FEATURE_CONFIG === void 0 ? (_reportPossibleCrUseOfTIKTOK_REQUIRED_FEATURE_CONFIG({
            error: Error()
          }), TIKTOK_REQUIRED_FEATURE_CONFIG) : TIKTOK_REQUIRED_FEATURE_CONFIG;
          this.callbacks = {};
          this.initialized = false;
          this.platformLoggedIn = false;
          this.loginPromise = null;
          this.checkingRewards = false;
          this.devClaimed = new Set();
          this.loginStatus = 'idle';
        }

        get runtime() {
          return globalThis;
        }

        get api() {
          var _this$runtime$TTMinis;

          return ((_this$runtime$TTMinis = this.runtime.TTMinis) == null ? void 0 : _this$runtime$TTMinis.game) || this.runtime.tt || null;
        }

        get isTikTokRuntime() {
          var _this$runtime$TTMinis2;

          const platform = sys.platform;
          const platforms = sys.Platform;
          return !!((_this$runtime$TTMinis2 = this.runtime.TTMinis) != null && _this$runtime$TTMinis2.game) || !!this.runtime.tt || platform === platforms.BYTEDANCE_MINI_GAME || platform === platforms.BYTEDANCE_GAME;
        }

        get shouldShowEntries() {
          return this.isTikTokRuntime || DEV && this.config.enableDevMock;
        }

        initialize(callbacks, config = _crd && TIKTOK_REQUIRED_FEATURE_CONFIG === void 0 ? (_reportPossibleCrUseOfTIKTOK_REQUIRED_FEATURE_CONFIG({
          error: Error()
        }), TIKTOK_REQUIRED_FEATURE_CONFIG) : TIKTOK_REQUIRED_FEATURE_CONFIG) {
          this.callbacks = callbacks;
          this.config = config;
          if (this.initialized || !this.shouldShowEntries) return;
          this.initialized = true;
          game.on(Game.EVENT_SHOW, this.onGameShow, this);
          void this.silentLogin().then(() => this.checkPendingMissionRewards());
        }

        async silentLogin() {
          console.log("静默登录");
          if (this.platformLoggedIn) return true;
          if (this.loginPromise) return this.loginPromise;

          if (DEV && !this.api && this.config.enableDevMock) {
            this.platformLoggedIn = true;
            this.loginStatus = 'mock';
            return true;
          }

          const api = this.api;

          if (typeof (api == null ? void 0 : api.login) !== 'function') {
            this.loginStatus = 'failed';
            console.error('[TikTokRequired] TTMinis.game.login is unavailable');
            return false;
          }

          this.loginStatus = 'logging_in';
          const loginRequest = new Promise(resolve => {
            api.login({
              success: result => {
                console.log("静默登录成功");

                if (!(result != null && result.code)) {
                  this.loginStatus = 'failed';
                  console.error('[TikTokRequired] Silent login returned no authorization code');
                  resolve(false);
                  return;
                } // 当前项目不需要用户 OpenID；code 仅用于确认静默登录能力可用，随后立即丢弃。


                this.platformLoggedIn = true;
                this.loginStatus = 'authenticated';
                resolve(true);
              },
              fail: error => {
                console.log("静默登录失败");
                this.loginStatus = 'failed';
                console.error('[TikTokRequired] Silent login failed', error);
                resolve(false);
              }
            });
          });
          this.loginPromise = loginRequest.then(result => {
            this.loginPromise = null;
            return result;
          }, error => {
            this.loginPromise = null;
            throw error;
          });
          return this.loginPromise;
        }

        async runShortcutMission() {
          if (!this.shouldShowEntries) return this.unavailable('Home screen shortcut is unavailable');

          if (DEV && !this.api && this.config.enableDevMock) {
            return this.grantDevReward('shortcut');
          }

          await this.silentLogin();

          if (!this.canUse('getShortcutMissionReward') || !this.canUse('addShortcut')) {
            return this.unavailable('Please update TikTok to use Home Reward');
          }

          try {
            const canReceiveReward = await this.queryMissionReward('getShortcutMissionReward');
            if (canReceiveReward) return this.grantReward('shortcut');

            if (this.hasClaimed('shortcut')) {
              return {
                status: 'already_claimed',
                message: 'Home Reward already claimed'
              };
            }

            await this.callVoidApi('addShortcut');
            return {
              status: 'started',
              message: 'Added. Reopen from the Home Screen to claim +3 Energy'
            };
          } catch (error) {
            console.error('[TikTokRequired] Home screen shortcut failed', error);
            return {
              status: 'error',
              message: 'Home Reward failed. Please try again'
            };
          }
        }

        async runRevisitMission() {
          if (!this.shouldShowEntries) return this.unavailable('Revisit Reward is unavailable');

          if (DEV && !this.api && this.config.enableDevMock) {
            return this.grantDevReward('revisit');
          }

          await this.silentLogin();

          if (!this.canUse('getEntranceMissionReward') || !this.canUse('startEntranceMission')) {
            return this.unavailable('Please update TikTok to use Revisit Reward');
          }

          try {
            const canReceiveReward = await this.queryMissionReward('getEntranceMissionReward');
            if (canReceiveReward) return this.grantReward('revisit');

            if (this.hasClaimed('revisit')) {
              return {
                status: 'already_claimed',
                message: 'Revisit Reward already claimed'
              };
            }

            await this.callVoidApi('startEntranceMission');
            return {
              status: 'started',
              message: 'Open the game from your TikTok Profile to claim +2 Energy'
            };
          } catch (error) {
            console.error('[TikTokRequired] Profile revisit mission failed', error);
            return {
              status: 'error',
              message: 'Revisit Reward failed. Please try again'
            };
          }
        }

        async checkPendingMissionRewards() {
          if (this.checkingRewards || !this.isTikTokRuntime) return;
          this.checkingRewards = true;

          try {
            await this.silentLogin();
            await this.checkAndGrant('shortcut', 'getShortcutMissionReward');
            await this.checkAndGrant('revisit', 'getEntranceMissionReward');
          } finally {
            this.checkingRewards = false;
          }
        }

        canUse(apiName) {
          const api = this.api;

          if (typeof (api == null ? void 0 : api.canIUse) === 'function') {
            try {
              return !!api.canIUse(apiName);
            } catch (error) {
              console.warn(`[TikTokRequired] canIUse(${apiName}) failed`, error);
            }
          }

          return typeof (api == null ? void 0 : api[apiName]) === 'function';
        }

        queryMissionReward(apiName) {
          return new Promise((resolve, reject) => {
            this.api[apiName]({
              success: result => {
                resolve((result == null ? void 0 : result.canReceiveReward) === true);
              },
              fail: reject
            });
          });
        }

        callVoidApi(apiName) {
          return new Promise((resolve, reject) => {
            this.api[apiName]({
              success: resolve,
              fail: reject
            });
          });
        }

        async checkAndGrant(type, apiName) {
          if (this.hasClaimed(type) || !this.canUse(apiName)) return;

          try {
            if (await this.queryMissionReward(apiName)) this.grantReward(type);
          } catch (error) {
            console.warn(`[TikTokRequired] ${apiName} check failed`, error);
          }
        }

        grantReward(type) {
          if (this.hasClaimed(type)) {
            return {
              status: 'already_claimed',
              message: `${this.rewardName(type)} already claimed`
            };
          }

          const amount = this.rewardAmount(type);

          try {
            var _this$callbacks$onGra, _this$callbacks;

            (_this$callbacks$onGra = (_this$callbacks = this.callbacks).onGrantReward) == null || _this$callbacks$onGra.call(_this$callbacks, type, amount);
            sys.localStorage.setItem(CLAIM_STORAGE_KEYS[type], '1');
            return {
              status: 'rewarded',
              message: `${this.rewardName(type)}: +${amount} Energy`
            };
          } catch (error) {
            console.error('[TikTokRequired] Failed to grant mission reward', error);
            return {
              status: 'error',
              message: 'Reward delivery failed. Please try again'
            };
          }
        }

        grantDevReward(type) {
          var _this$callbacks$onGra2, _this$callbacks2;

          if (this.devClaimed.has(type)) {
            return {
              status: 'already_claimed',
              message: `${this.rewardName(type)} mock already claimed`
            };
          }

          this.devClaimed.add(type);
          const amount = this.rewardAmount(type);
          (_this$callbacks$onGra2 = (_this$callbacks2 = this.callbacks).onGrantReward) == null || _this$callbacks$onGra2.call(_this$callbacks2, type, amount);
          return {
            status: 'rewarded',
            message: `[DEV] ${this.rewardName(type)}: +${amount} Energy`
          };
        }

        hasClaimed(type) {
          return sys.localStorage.getItem(CLAIM_STORAGE_KEYS[type]) === '1';
        }

        rewardAmount(type) {
          return type === 'shortcut' ? this.config.shortcutRewardTili : this.config.revisitRewardTili;
        }

        rewardName(type) {
          return type === 'shortcut' ? 'Home Reward' : 'Revisit Reward';
        }

        unavailable(message) {
          return {
            status: 'unavailable',
            message
          };
        }

        onGameShow() {
          if (this.loginStatus === 'failed') void this.silentLogin();
          setTimeout(() => this.checkPendingMissionRewards(), 500);
        }

      };

      _export("tiktokRequiredFeatures", tiktokRequiredFeatures = new TikTokRequiredFeatures());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7cfc5df883117449c21a655d7aa0fb3b6b1885a9.js.map