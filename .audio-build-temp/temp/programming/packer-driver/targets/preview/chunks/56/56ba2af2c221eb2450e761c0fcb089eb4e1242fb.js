System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BaseManager, storage, platformService, _dec, _class, _crd, ccclass, property, VibrateManager;

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../../../extensions/app/assets/base/BaseManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfstorage(extras) {
    _reporterNs.report("storage", "../../../../extensions/app/assets/lib/storage/storage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplatformService(extras) {
    _reporterNs.report("platformService", "../../../app/platform", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      storage = _unresolved_3.default;
    }, function (_unresolved_4) {
      platformService = _unresolved_4.platformService;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fdb70mj771EDZQF7DC5yASp", "VibrateManager", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("VibrateManager", VibrateManager = (_dec = ccclass('VibrateManager'), _dec(_class = class VibrateManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor() {
          super(...arguments);
          this.VibrateMuteCacheKey = 'VibrateMute';
          this.vibrateMute = false;
          //上次震动时间
          this.lastVibrateTime = 0;
        }

        // [无序] 加载完成时触发
        onLoad() {} // [无序] 自身初始化完成, init执行完毕后被调用


        onInited() {
          var VibrateMute = (_crd && storage === void 0 ? (_reportPossibleCrUseOfstorage({
            error: Error()
          }), storage) : storage).get(this.VibrateMuteCacheKey) === true;
          this.vibrateMute = VibrateMute;
        }

        get isVibrateMute() {
          return this.vibrateMute;
        }

        setVibrateMute(vibrate) {
          this.vibrateMute = vibrate;
          (_crd && storage === void 0 ? (_reportPossibleCrUseOfstorage({
            error: Error()
          }), storage) : storage).set(this.VibrateMuteCacheKey, this.vibrateMute);
        }

        playVibrate() {
          if (!this.vibrateMute) {
            // platformService.vibrateShort();
            (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
              error: Error()
            }), platformService) : platformService).vibrateLong();
          }
        }

        playVibrateHeavy() {
          if (!this.vibrateMute) {
            (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
              error: Error()
            }), platformService) : platformService).vibrateShort({
              type: 'heavy'
            });
          }
        }

        playVibrateShort() {
          //控制一秒只震动一次
          //    const now = Date.now();
          //    if (now - this.lastVibrateTime < 300) {
          //        return;
          //    }
          //    this.lastVibrateTime = now;
          if (!this.vibrateMute) {
            (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
              error: Error()
            }), platformService) : platformService).vibrateShort({
              type: 'light'
            });
          }
        } // [无序] 所有manager初始化完成


        onFinished() {} // [无序] 初始化manager，在初始化完成后，调用finish方法


        init(finish) {
          super.init(finish);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=56ba2af2c221eb2450e761c0fcb089eb4e1242fb.js.map