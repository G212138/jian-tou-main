System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Node, ProgressBar, LevelActionType, LevelResultType, app, adManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, FuoHuoDialog;

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
      Label = _cc.Label;
      Node = _cc.Node;
      ProgressBar = _cc.ProgressBar;
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

      _cclegacy._RF.push({}, "dba5bf9HldLNKPHZjuZlwkp", "FuoHuoDialog", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FuoHuoDialog", FuoHuoDialog = (_dec = ccclass('FuoHuoDialog'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(ProgressBar), _dec5 = property(Label), _dec(_class = (_class2 = class FuoHuoDialog extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "btnClose", _descriptor, this);

          _initializerDefineProperty(this, "btnAd", _descriptor2, this);

          _initializerDefineProperty(this, "progressBar", _descriptor3, this);

          _initializerDefineProperty(this, "labelTip", _descriptor4, this);
        }

        onLoad() {
          var remainCount = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.ropeCount - (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.escapeRopeCount;
          this.labelTip.string = "\u518D\u6D88\u9664" + remainCount + "\u4E2A\u7BAD\u5934\u5373\u53EF\u901A\u5173";
          this.progressBar.progress = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.escapeRopeCount / (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.ropeCount; //上报

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
            }), LevelResultType) : LevelResultType).FAIL,
            externInfo: {
              failType: 'NoHeart'
            },
            levelProgress: this.progressBar.progress
          });
        }

        start() {
          this.btnClose.on(Node.EventType.TOUCH_END, this.onClickClose, this);
          this.btnAd.on(Node.EventType.TOUCH_END, this.onClickAd, this);
        }

        onClickClose() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit("ShowRestartDialog", "NoHeart");
        }

        onClickAd() {
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
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.gameHeartAdd, 0);
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.hide({
                name: 'PopResult'
              }); // 恢复倒计时

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.resumeCountDown); //上报

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
                }), LevelResultType) : LevelResultType).REVIVE,
                externInfo: {
                  failType: 'NoHeart',
                  adProgress: 'Success'
                },
                levelProgress: this.progressBar.progress
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnAd", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelTip", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=343f7be67c1e79c74df7c9397a8bb776c9d37479.js.map