System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Sprite, SpriteFrame, BaseView, LevelActionType, LevelResultType, app, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, PopSetting;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "db://app/base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelActionType(extras) {
    _reporterNs.report("LevelActionType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelResultType(extras) {
    _reporterNs.report("LevelResultType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      BaseView = _unresolved_2.default;
    }, function (_unresolved_3) {
      LevelActionType = _unresolved_3.LevelActionType;
      LevelResultType = _unresolved_3.LevelResultType;
    }, function (_unresolved_4) {
      app = _unresolved_4.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c5afaktXMpD3as2HIQE73Vy", "PopSetting", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PopSetting", PopSetting = (_dec = ccclass('PopSetting'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec8 = property(Node), _dec9 = property(Node), _dec(_class = (_class2 = class PopSetting extends (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
        error: Error()
      }), BaseView) : BaseView) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "effect", _descriptor, this);

          _initializerDefineProperty(this, "music", _descriptor2, this);

          _initializerDefineProperty(this, "vibrate", _descriptor3, this);

          _initializerDefineProperty(this, "colorArrow", _descriptor4, this);

          _initializerDefineProperty(this, "On", _descriptor5, this);

          _initializerDefineProperty(this, "Off", _descriptor6, this);

          _initializerDefineProperty(this, "homeButton", _descriptor7, this);

          _initializerDefineProperty(this, "settingLayout", _descriptor8, this);
        }

        // 初始化的相关逻辑写在这
        onLoad() {} // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)


        onShow(params) {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.isEffectMute) {
            this.effect.getComponent(Sprite).spriteFrame = this.Off;
          } else {
            this.effect.getComponent(Sprite).spriteFrame = this.On;
          }

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.isMusicMute) {
            this.music.getComponent(Sprite).spriteFrame = this.Off;
          } else {
            this.music.getComponent(Sprite).spriteFrame = this.On;
          }

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.vibrate.isVibrateMute) {
            this.vibrate.getComponent(Sprite).spriteFrame = this.Off;
          } else {
            this.vibrate.getComponent(Sprite).spriteFrame = this.On;
          } //本地读取是否是彩色箭头


          let isColorArrow = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getIsColorArrow();

          if (isColorArrow) {
            this.colorArrow.getComponent(Sprite).spriteFrame = this.On;
          } else {
            this.colorArrow.getComponent(Sprite).spriteFrame = this.Off;
          } //判断是否是首页


          if (params.isHome) {
            this.homeButton.active = false;
          } else {
            this.homeButton.active = true;
          }
        } // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)


        onHide(result) {
          // app.manager.ui.show<PaperHomeSetting>({name: 'PaperHomeSetting', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
          return result;
        }

        effect_click() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.isEffectMute) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.setEffectMute(false, true);
            this.effect.getComponent(Sprite).spriteFrame = this.On;
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.setEffectMute(true, true);
            this.effect.getComponent(Sprite).spriteFrame = this.Off;
          }
        }

        music_click() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.isMusicMute) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.setMusicMute(false, true);
            this.music.getComponent(Sprite).spriteFrame = this.On;
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.setMusicMute(true, true);
            this.music.getComponent(Sprite).spriteFrame = this.Off;
          }
        }

        vibrate_click() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.vibrate.isVibrateMute) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.vibrate.setVibrateMute(false);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.vibrate.playVibrate();
            this.vibrate.getComponent(Sprite).spriteFrame = this.On;
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.vibrate.setVibrateMute(true);
            this.vibrate.getComponent(Sprite).spriteFrame = this.Off;
          }
        }

        colorArrow_click() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getIsColorArrow()) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setIsColorArrow(false);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.Off;
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setIsColorArrow(true);
            this.colorArrow.getComponent(Sprite).spriteFrame = this.On;
          } //触发一次事件


          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.colorArrowChange);
        }

        back_level_click() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageHome'
          }); // 报告退出关卡事件

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
            }), LevelResultType) : LevelResultType).EXIT
          });
          this.hide();
        } //重玩游戏


        restart_click() {
          //判断体力是否足够
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.tili < 1) {
            //展示体力不足的弹窗
            // app.manager.ui.showToast('体力不足');
            // 展示体力不足的弹窗
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: 'PopResult',
              data: {
                TiLiDialog: true
              }
            }); // 报告失败事件

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
                failType: 'NoTiLi'
              }
            });
            return;
          }

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.setTiLi((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.getTiLi() - 1);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.resumeMusic(); // 触发重新开始事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart); // 报告成功事件

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
            }), LevelResultType) : LevelResultType).RETRY
          }); // 关闭弹窗

          this.hide();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "effect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "music", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vibrate", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "colorArrow", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "On", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "Off", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "homeButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "settingLayout", [_dec9], {
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
//# sourceMappingURL=f07a35eea77d96ff902e347e2be8c3fd61999507.js.map