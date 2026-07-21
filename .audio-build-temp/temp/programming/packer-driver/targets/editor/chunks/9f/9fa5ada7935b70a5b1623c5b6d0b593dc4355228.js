System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, Label, Node, tween, LevelActionType, LevelResultType, app, platformService, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, SuccessDialog;

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

  function _reportPossibleCrUseOfplatformService(extras) {
    _reporterNs.report("platformService", "db://assets/app/platform", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      Label = _cc.Label;
      Node = _cc.Node;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      LevelActionType = _unresolved_2.LevelActionType;
      LevelResultType = _unresolved_2.LevelResultType;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      platformService = _unresolved_4.platformService;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "eb3cfMERLZDnp+D7hUy9hKS", "SuccessDialog", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'Label', 'Node', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SuccessDialog", SuccessDialog = (_dec = ccclass('SuccessDialog'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec(_class = (_class2 = class SuccessDialog extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "btnNext", _descriptor, this);

          _initializerDefineProperty(this, "btnBackList", _descriptor2, this);

          _initializerDefineProperty(this, "btnShare", _descriptor3, this);

          //首页
          _initializerDefineProperty(this, "btnHome", _descriptor4, this);

          _initializerDefineProperty(this, "guang", _descriptor5, this);

          _initializerDefineProperty(this, "specialTips", _descriptor6, this);
        }

        start() {
          this.btnHome.on(Node.EventType.TOUCH_END, this.onClickHome, this);
          this.btnNext.on(Button.EventType.CLICK, this.onClickNext, this);
          this.btnBackList.on(Node.EventType.TOUCH_END, this.onClickBackList, this); //guang一直转圈圈 - 使用更可靠的无限旋转方式

          tween(this.guang).by(2, {
            angle: 360
          }).repeatForever().start(); //获取当前关卡值

          const lv = 5 - (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.getLevel();

          if (lv > 0) {
            this.specialTips.string = '再玩 ' + lv + ' 局解锁创意关卡！';
            this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
            this.btnShare.getComponentInChildren(Label).string = '分享';
          } else if (lv === 0) {
            this.specialTips.string = '已解锁创意关卡！';
            this.btnShare.on(Node.EventType.TOUCH_START, this.onClickSpecialLevel, this);
            this.btnShare.getComponentInChildren(Label).string = '去挑战';
          } else {
            this.specialTips.string = '你太棒了！';
            this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
            this.btnShare.getComponentInChildren(Label).string = '分享';
          } // 报告点击事件


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
            }), LevelResultType) : LevelResultType).SUCCESS,
            levelTime: (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getLevelTime()
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.setLevel((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.level + 1); //判断是不是创意关卡

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getIsSpecialLevel()) {
            //通知修改本地存储
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.UpdateSPLevelStatus, (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getSpecialLevelIndex(), 2);
            this.btnNext.active = false;
            this.btnBackList.active = true;
          } else {
            this.btnBackList.active = false;
            this.btnNext.active = true;
          }
        } //返回创意关卡列表


        onClickBackList() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageSpLevel'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          });
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
          });
        }

        onClickNext() {
          //复用restart事件
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          }); // 报告点击事件

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
            }), LevelResultType) : LevelResultType).ENTER
          });
        }

        onClickShare() {
          //分享游戏
          (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
            error: Error()
          }), platformService) : platformService).share({
            title: "我用《箭头》通关了！"
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
            }), LevelResultType) : LevelResultType).SHARE
          });
        }

        onClickSpecialLevel() {
          // TODO 跳转到体验关卡列表
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageSpLevel'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.hide({
            name: 'PopResult'
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnNext", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnBackList", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnShare", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnHome", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "guang", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "specialTips", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9fa5ada7935b70a5b1623c5b6d0b593dc4355228.js.map