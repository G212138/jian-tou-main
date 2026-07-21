System.register(["__unresolved_0", "cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DEV, AdManager, _crd, adManager;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _reportPossibleCrUseOfAdPlacementConfig(extras) {
    _reporterNs.report("AdPlacementConfig", "./config.ads", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cde70QtZCNBM5OzbnWzxIWx", "tiktok.ads", undefined);

      /**
       * Unified ad manager for TikTok Mini Games and the project's legacy mini-game targets.
       * Business code only talks to this class, independent of third-party SDK wrappers.
       */
      AdManager = class AdManager {
        constructor() {
          this.config = {
            videoID: '',
            interstitialID: ''
          };
          this.rewardedShowing = false;
          this.interstitialAd = null;
          this.lastInterstitialShowTime = 0;
          this.interstitialMinInterval = 30 * 1000;
        }

        init(config) {
          this.config = _extends({}, config);
        }

        checkRewardedVideoAd() {
          if (DEV && !this.hasPlatformRuntime) return true;
          return !!this.config.videoID && !!this.resolveApi('createRewardedVideoAd');
        }

        checkInterstitialAd() {
          if (DEV && !this.hasPlatformRuntime) return true;
          return !!this.config.interstitialID && !!this.resolveApi('createInterstitialAd');
        }

        canShowInterstitialAd() {
          if (!this.checkInterstitialAd() || this.interstitialAd) return false;
          return Date.now() - this.lastInterstitialShowTime >= this.interstitialMinInterval;
        }

        showRewardedVideoAd(options) {
          if (options === void 0) {
            options = {};
          }

          if (this.rewardedShowing) {
            options.onError == null || options.onError(this.createError('AD_REWARDED_ALREADY_SHOWING', 'A rewarded video ad is already active'));
            return;
          }

          if (DEV && !this.hasPlatformRuntime) {
            this.rewardedShowing = true;
            setTimeout(() => {
              this.rewardedShowing = false;
              options.onShow == null || options.onShow();
              options.onClose == null || options.onClose(true);
            }, 100);
            return;
          }

          if (!this.config.videoID) {
            this.finishRewardedError(options, this.createError('AD_REWARDED_PLACEMENT_MISSING', 'Rewarded video Placement ID is not configured'));
            return;
          }

          var resolved = this.resolveApi('createRewardedVideoAd');

          if (!resolved) {
            this.finishRewardedError(options, this.createError('AD_REWARDED_API_UNAVAILABLE', 'Rewarded video API is unavailable'));
            return;
          }

          console.info('[AdManager] Rewarded video show requested', {
            source: resolved.source,
            adUnitId: this.config.videoID
          });
          var ad;

          try {
            ad = resolved.api.createRewardedVideoAd({
              adUnitId: this.config.videoID
            });

            if (!ad || typeof ad.show !== 'function') {
              throw this.createError('AD_REWARDED_INSTANCE_INVALID', 'Invalid rewarded video instance');
            }
          } catch (error) {
            this.finishRewardedError(options, error);
            return;
          }

          this.rewardedShowing = true;
          var finished = false;

          var cleanup = () => {
            ad.offClose == null || ad.offClose(handleClose);
            ad.offError == null || ad.offError(handleError);
          };

          var finish = () => {
            cleanup();
            this.destroyAd(ad);
            this.rewardedShowing = false;
          };

          var handleError = error => {
            if (finished) return;
            finished = true;
            finish();
            console.error('[AdManager] Rewarded video failed', error);
            options.onError == null || options.onError(error);
          };

          var handleClose = result => {
            if (finished) return;
            finished = true;
            finish(); // TikTok rewards only when isEnded is explicitly true. Older WeChat
            // runtimes may omit the result after a completed, non-skippable video.

            var completed = (result == null ? void 0 : result.isEnded) === true || resolved.source === 'wx' && result === undefined;
            options.onClose == null || options.onClose(completed);
          };

          ad.onClose == null || ad.onClose(handleClose);
          ad.onError == null || ad.onError(handleError);
          this.displayAd(ad, resolved).then(() => {
            if (!finished) options.onShow == null || options.onShow();
          }).catch(handleError);
        }

        showInterstitialAd(options) {
          if (options === void 0) {
            options = {};
          }

          if (DEV && !this.hasPlatformRuntime) {
            if (this.interstitialAd) {
              options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_ALREADY_SHOWING', 'An interstitial ad is already active'));
              return;
            }

            var _elapsed = Date.now() - this.lastInterstitialShowTime;

            if (_elapsed < this.interstitialMinInterval) {
              options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_COOLDOWN', "Interstitial cooldown: " + (this.interstitialMinInterval - _elapsed) + "ms remaining"));
              return;
            }

            var mockAd = {};
            this.interstitialAd = mockAd;
            setTimeout(() => {
              this.lastInterstitialShowTime = Date.now();
              options.onShow == null || options.onShow();
              if (this.interstitialAd === mockAd) this.interstitialAd = null;
              options.onClose == null || options.onClose();
            }, 100);
            return;
          }

          if (!this.config.interstitialID) {
            options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_PLACEMENT_MISSING', 'Interstitial Placement ID is not configured'));
            return;
          }

          var resolved = this.resolveApi('createInterstitialAd');

          if (!resolved) {
            options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_API_UNAVAILABLE', 'Interstitial API is unavailable'));
            return;
          }

          if (this.interstitialAd) {
            options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_ALREADY_SHOWING', 'An interstitial ad is already active'));
            return;
          }

          var elapsed = Date.now() - this.lastInterstitialShowTime;

          if (elapsed < this.interstitialMinInterval) {
            options.onError == null || options.onError(this.createError('AD_INTERSTITIAL_COOLDOWN', "Interstitial cooldown: " + (this.interstitialMinInterval - elapsed) + "ms remaining"));
            return;
          }

          var ad;

          try {
            ad = resolved.api.createInterstitialAd({
              adUnitId: this.config.interstitialID
            });

            if (!ad || typeof ad.show !== 'function') {
              throw this.createError('AD_INTERSTITIAL_INSTANCE_INVALID', 'Invalid interstitial instance');
            }

            this.interstitialAd = ad;
          } catch (error) {
            options.onError == null || options.onError(error);
            return;
          }

          var finished = false;

          var cleanup = () => {
            ad.offClose == null || ad.offClose(handleClose);
            ad.offError == null || ad.offError(handleError);
            this.destroyAd(ad);
            if (this.interstitialAd === ad) this.interstitialAd = null;
          };

          var handleError = error => {
            if (finished) return;
            finished = true;
            cleanup();
            console.error('[AdManager] Interstitial failed', error);
            options.onError == null || options.onError(error);
          };

          var handleClose = () => {
            if (finished) return;
            finished = true;
            cleanup();
            options.onClose == null || options.onClose();
          };

          ad.onClose == null || ad.onClose(handleClose);
          ad.onError == null || ad.onError(handleError);
          this.displayAd(ad, resolved).then(() => {
            if (finished) return;
            this.lastInterstitialShowTime = Date.now();
            options.onShow == null || options.onShow();
          }).catch(handleError);
        }

        get runtime() {
          return globalThis;
        }

        get hasPlatformRuntime() {
          return !!this.runtime.TTMinis || !!this.runtime.tt || !!this.runtime.wx;
        }

        resolveApi(apiName) {
          var _this$runtime$TTMinis;

          var candidates = [{
            api: (_this$runtime$TTMinis = this.runtime.TTMinis) == null ? void 0 : _this$runtime$TTMinis.game,
            source: 'TTMinis.game',
            needsLoad: false
          }, {
            api: this.runtime.TTMinis,
            source: 'TTMinis',
            needsLoad: false
          }, {
            api: this.runtime.tt,
            source: 'tt',
            needsLoad: true
          }, {
            api: this.runtime.wx,
            source: 'wx',
            needsLoad: true
          }];
          return candidates.find(_ref => {
            var {
              api
            } = _ref;
            return typeof (api == null ? void 0 : api[apiName]) === 'function';
          }) || null;
        }

        displayAd(ad, resolved) {
          if (resolved.needsLoad && typeof ad.load === 'function') {
            return Promise.resolve(ad.load()).then(() => ad.show()).then(() => undefined);
          } // TikTok Native Mini Games requires show() to remain in the user-action
          // call stack. Evaluating ad.show() before Promise.resolve preserves it.


          try {
            return Promise.resolve(ad.show()).then(() => undefined);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        finishRewardedError(options, error) {
          this.rewardedShowing = false;
          console.error('[AdManager] Rewarded video failed', error);
          options.onError == null || options.onError(error);
        }

        destroyAd(ad) {
          try {
            ad == null || ad.destroy == null || ad.destroy();
          } catch (error) {
            console.warn('[AdManager] Failed to destroy ad instance', error);
          }
        }

        createError(errorCode, errMsg) {
          return {
            errorCode,
            errCode: errorCode,
            errMsg
          };
        }

      };

      _export("adManager", adManager = new AdManager());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=87880d280786c59b90523a1985ea9d3cd0f6cf48.js.map