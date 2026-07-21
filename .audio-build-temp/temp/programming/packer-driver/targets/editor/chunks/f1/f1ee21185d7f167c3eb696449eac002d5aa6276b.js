System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, PlatformService, _crd, platformService;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4ce88Mv2WtLK6Xn/bDejFoy", "platform", undefined);

      /** Native sharing and vibration utilities used by business code. */
      PlatformService = class PlatformService {
        constructor() {
          this.menuShareOptions = {};
          this.menuShareRegisteredOn = null;
        }

        share(options = {}) {
          const api = this.resolveApi('shareAppMessage');

          if (!api) {
            console.warn('[PlatformService] shareAppMessage is unavailable');
            return;
          }

          try {
            api.shareAppMessage(options);
          } catch (error) {
            console.error('[PlatformService] Failed to share', error);
          }
        }

        openMenuShare(options = {}) {
          this.menuShareOptions = { ...options
          };
          const api = this.resolveApi('onShareAppMessage');
          if (!api || this.menuShareRegisteredOn === api) return;
          this.menuShareRegisteredOn = api;

          try {
            api.updateShareMenu == null || api.updateShareMenu({
              withShareTicket: true
            });
            api.showShareMenu == null || api.showShareMenu({
              withShareTicket: true,
              menus: ['shareAppMessage', 'shareTimeline']
            });
            api.onShareAppMessage(() => ({ ...this.menuShareOptions
            }));
            api.onShareTimeline == null || api.onShareTimeline(() => ({ ...this.menuShareOptions
            }));
          } catch (error) {
            this.menuShareRegisteredOn = null;
            console.error('[PlatformService] Failed to enable menu sharing', error);
          }
        }

        vibrateShort(options = {
          type: 'light'
        }) {
          this.callVibration('vibrateShort', options);
        }

        vibrateLong(options = {}) {
          this.callVibration('vibrateLong', options);
        }

        get runtime() {
          return globalThis;
        }

        resolveApi(methodName) {
          var _this$runtime$TTMinis;

          const candidates = [(_this$runtime$TTMinis = this.runtime.TTMinis) == null ? void 0 : _this$runtime$TTMinis.game, this.runtime.tt, this.runtime.wx];
          return candidates.find(api => typeof (api == null ? void 0 : api[methodName]) === 'function') || null;
        }

        callVibration(methodName, options) {
          const api = this.resolveApi(methodName);
          if (!api) return;

          try {
            api[methodName](options);
          } catch (error) {
            console.warn(`[PlatformService] ${methodName} failed`, error);
          }
        }

      };

      _export("platformService", platformService = new PlatformService());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f1ee21185d7f167c3eb696449eac002d5aa6276b.js.map