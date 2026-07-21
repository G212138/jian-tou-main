System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Label, Node, tween, UIOpacity, BaseView, bindStore, app, LevelActionType, LevelResultType, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, PageMain;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "../../../../../../extensions/app/assets/base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMiniViewNames(extras) {
    _reporterNs.report("IMiniViewNames", "../../../../../app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbindStore(extras) {
    _reporterNs.report("bindStore", "db://assets/pkg-export/@gamex/cc-store", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPopSetting(extras) {
    _reporterNs.report("PopSetting", "../../../pop/setting/native/PopSetting", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelActionType(extras) {
    _reporterNs.report("LevelActionType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelResultType(extras) {
    _reporterNs.report("LevelResultType", "db://assets/app-builtin/app-manager/report/ReportManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Label = _cc.Label;
      Node = _cc.Node;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      BaseView = _unresolved_2.default;
    }, function (_unresolved_3) {
      bindStore = _unresolved_3.bindStore;
    }, function (_unresolved_4) {
      app = _unresolved_4.app;
    }, function (_unresolved_5) {
      LevelActionType = _unresolved_5.LevelActionType;
    }, function (_unresolved_6) {
      LevelResultType = _unresolved_6.LevelResultType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "faa7cHg5dxMMrahjGX6seWS", "PageMain", undefined);

      __checkObsolete__(['_decorator', 'Label', 'Node', 'tween', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PageMain", PageMain = (_dec = ccclass('PageMain'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = class PageMain extends (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
        error: Error()
      }), BaseView) : BaseView) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "settingBtn", _descriptor, this);

          //关卡显示
          _initializerDefineProperty(this, "level", _descriptor2, this);

          _initializerDefineProperty(this, "errorFlash", _descriptor3, this);

          // 子界面列表，数组顺序为子界面排列顺序
          this.miniViews = [];
          this.playTimes = 0;
        }

        // 初始化的相关逻辑写在这
        onLoad() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.errorFlash, this.onErrorFlash, this); // 播放钢琴音效

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.playPianoSound, this.onPlayPianoSound, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.playMusic({
            name: 'music/bgm',
            volume: 0.7,
            force: false
          }); //监听restart
          // app.manager.event.on(app.config.eventname.restart, this.onRestart, this);
        }

        onRestart() {
          // 报告进入关卡事件
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
        } // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)


        onShow(params) {
          this.showMiniViews({
            views: this.miniViews
          }); // 绑定关卡显示

          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.level, 'string', () => {
            return '第' + (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.level.toString() + '关';
          }); // 绑定设置按钮点击事件

          this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this); //创意关卡
          // 绑定关卡显示

          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.level, 'string', () => {
            return '创意关卡 ' + (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.specialLevel.toString();
          }); //判断是不是创意关卡来的

          if (params && params.isSpecialLevel) {
            // 绑定关卡显示
            this.level.string = params.name;
          } // 报告进入关卡事件


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
        } // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)


        onHide(result) {
          // app.manager.ui.show<PageMain>({name: 'PageMain', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
          return result;
        } // 设置按钮点击事件


        onClickSetting() {
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getAlreadyDrawRopeCount() < (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getRopeCount()) {
            // 还没有绘制完绳子，不能打开设置
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.showToast('箭头绘制中...');
            return;
          }

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PopSetting',
            data: {
              isHome: false
            }
          });
        }

        onErrorFlash() {
          // 错误闪烁 0.5秒闪烁一次
          this.errorFlash.active = true;
          let opacity = this.errorFlash.getComponent(UIOpacity);
          opacity.opacity = 255;
          tween(opacity).to(1, {
            opacity: 0
          }).call(() => {
            this.errorFlash.active = false;
          }).start();
        } // 播放钢琴音效


        onPlayPianoSound() {
          //当playtime为0-6时，播放ABCDEFG
          if (this.playTimes % 7 === 0) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/A'
            });
          } else if (this.playTimes % 7 === 1) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/B'
            });
          } else if (this.playTimes % 7 === 2) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/C'
            });
          } else if (this.playTimes % 7 === 3) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/D'
            });
          } else if (this.playTimes % 7 === 4) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/E'
            });
          } else if (this.playTimes % 7 === 5) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/F'
            });
          } else if (this.playTimes % 7 === 6) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.sound.playEffect({
              name: 'effect/piano/G'
            });
          }

          this.playTimes++;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "settingBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "level", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "errorFlash", [_dec4], {
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
//# sourceMappingURL=647bb32c9fdc009be039f48eed2fe9e852bb05e9.js.map