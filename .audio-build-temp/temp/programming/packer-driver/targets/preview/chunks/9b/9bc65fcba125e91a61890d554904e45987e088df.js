System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Node, ProgressBar, LevelActionType, LevelResultType, app, adManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, FailDialog;

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

      _cclegacy._RF.push({}, "4ff7eG2BT5B75lHdpws3p02", "FailDialog", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FailDialog", FailDialog = (_dec = ccclass('FailDialog'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(ProgressBar), _dec6 = property(Label), _dec(_class = (_class2 = class FailDialog extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "btnFuHuo", _descriptor, this);

          //首页
          _initializerDefineProperty(this, "btnHome", _descriptor2, this);

          _initializerDefineProperty(this, "btnRestart", _descriptor3, this);

          _initializerDefineProperty(this, "progressBar", _descriptor4, this);

          _initializerDefineProperty(this, "labelTip", _descriptor5, this);

          this.type = null;
        }

        onLoad() {
          this.progressBar.progress = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.escapeRopeCount / (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.ropeCount; //把progress转换为百分数，保留0位小数

          var progressPercent = (this.progressBar.progress * 100).toFixed(0);
          this.labelTip.string = "\u5F53\u524D\u8FDB\u5EA6" + progressPercent + "%\uFF0C\u8FD8\u5DEE\u4E00\u70B9\u70B9\u5C31\u80FD\u901A\u5173\u4E86\uFF01";
        }

        start() {
          this.btnHome.on(Node.EventType.TOUCH_END, this.onClickHome, this);
          this.btnFuHuo.on(Node.EventType.TOUCH_END, this.onClickAD, this);
          this.btnRestart.on(Node.EventType.TOUCH_END, this.onClickRestart, this);
        }

        onClickHome() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageHome'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          }); //上报

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
            }), LevelResultType) : LevelResultType).EXIT,
            externInfo: {
              failType: this.type
            },
            levelProgress: this.progressBar.progress
          });
        }

        onClickAD() {
          // 暂停倒计时
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.pauseCountDown); //TODO 复活需要判断是加生命还是加时间

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

              if (this.type == 'NoHeart') {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.gameHeartAdd);
              }

              if (this.type == 'NoTime') {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.timeAdd, 120);
              }

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
                  failType: this.type,
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

        onClickRestart() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.tili < 1) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: 'PopResult',
              data: {
                TiLiDialog: true
              }
            });
            return;
          }

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.setTiLi((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.getTiLi() - 1); //发出restart事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart); //重新开始游戏

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          }); //上报

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
            }), LevelResultType) : LevelResultType).RETRY,
            externInfo: {
              failType: this.type
            },
            levelProgress: this.progressBar.progress
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnFuHuo", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnHome", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnRestart", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelTip", [_dec6], {
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
//# sourceMappingURL=9bc65fcba125e91a61890d554904e45987e088df.js.map