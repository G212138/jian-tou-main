System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, LevelActionType, LevelResultType, app, adManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TiLiDialog;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfLevelActionType(extras) {
    _reporterNs.report("LevelActionType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelResultType(extras) {
    _reporterNs.report("LevelResultType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadManager(extras) {
    _reporterNs.report("adManager", "db://assets/app/tiktok.ads", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      LevelActionType = _unresolved_2.LevelActionType;
      LevelResultType = _unresolved_2.LevelResultType;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      adManager = _unresolved_4.adManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5536afz2uxELobOV8+gKJSx", "TiLiDialog", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TiLiDialog", TiLiDialog = (_dec = ccclass('TiLiDialog'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class TiLiDialog extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "CloseNode", _descriptor, this);

          _initializerDefineProperty(this, "AdNode", _descriptor2, this);
        }

        start() {
          this.CloseNode.on(Node.EventType.TOUCH_END, this.CloseDialog, this);
          this.AdNode.on(Node.EventType.TOUCH_END, this.AddTiLi, this);
        } //关闭弹窗


        CloseDialog() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageHome'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          });
        } //添加体力


        AddTiLi() {
          // 暂停倒计时
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.pauseCountDown);
          (_crd && adManager === void 0 ? (_reportPossibleCrUseOfadManager({
            error: Error()
          }), adManager) : adManager).showRewardedVideoAd({
            onClose: success => {
              if (!success) {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.ui.showToast("广告未播放完成"); // 恢复倒计时

                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.resumeCountDown);
                return;
              }

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.setTiLi((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.getTiLi() + 3);
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.restart);
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.hide({
                name: 'PopResult'
              }); // 恢复倒计时

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.resumeCountDown); // 报告点击事件

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.report.reportEvent({
                levelID: (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).store.game.level,
                levelAction: (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.globaldata.isSpecialLevel ? (_crd && LevelActionType === void 0 ? (_reportPossibleCrUseOfLevelActionType({
                  error: Error()
                }), LevelActionType) : LevelActionType).CREATIVE_LEVEL : (_crd && LevelActionType === void 0 ? (_reportPossibleCrUseOfLevelActionType({
                  error: Error()
                }), LevelActionType) : LevelActionType).MAIN_LEVEL,
                levelResult: (_crd && LevelResultType === void 0 ? (_reportPossibleCrUseOfLevelResultType({
                  error: Error()
                }), LevelResultType) : LevelResultType).USE_ITEM,
                externInfo: {
                  failType: 'TiLi',
                  adProgress: 'Success'
                }
              });
            },
            onError: () => {
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.showToast("广告播放失败"); // 恢复倒计时

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.resumeCountDown);
            }
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "CloseNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "AdNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=01b48319c575aea177b11fc6c2d600dfa3912a4d.js.map