System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, SpriteFrame, app, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, gameHeartManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2840dLj6ORMEaDCgw7YNoTL", "gameHeartManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("gameHeartManager", gameHeartManager = (_dec = ccclass('gameHeartManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(SpriteFrame), _dec5 = property(SpriteFrame), _dec(_class = (_class2 = class gameHeartManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "heartLayout", _descriptor, this);

          _initializerDefineProperty(this, "time", _descriptor2, this);

          _initializerDefineProperty(this, "heartLose", _descriptor3, this);

          _initializerDefineProperty(this, "heartRed", _descriptor4, this);

          this.heartNum = 3;
        }

        onLoad() {
          this.heartLayout.children.forEach(heart => {
            heart.active = true;
          });
          this.time.active = false;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.gameHeartJian, this.updateGameHeartJian, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.gameHeartAdd, this.updateGameHeartAdd, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this.resetHeart, this);
        }

        resetHeart() {
          this.heartNum = 3;
          this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = this.heartRed;
          });
        }

        updateGameHeartJian() {
          console.log('gameHeartJian', this.heartNum); //生命值减1

          this.heartNum--;
          this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = index < this.heartNum ? this.heartRed : this.heartLose;
          }); //如果生命值小于0，游戏结束

          if (this.heartNum <= 0) {
            // 暂停倒计时
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.pauseCountDown); // app.manager.ui.showToast('游戏结束');

            setTimeout(() => {
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.sound.playEffect({
                name: 'effect/fail'
              });
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.show({
                name: 'PopResult',
                data: {
                  noGameHeart: true
                }
              });
            }, 500);
            return;
          } //启动时间显示恢复生命值


          this.time.active = true;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.startGameDaoJiShi);
        }

        updateGameHeartAdd() {
          //生命值加1
          this.heartNum++; //如果生命值大于3，生命值设为3

          if (this.heartNum > 3) {
            this.heartNum = 3;
          }

          this.heartLayout.children.forEach((heartNode, index) => {
            heartNode.getComponent(Sprite).spriteFrame = index < this.heartNum ? this.heartRed : this.heartLose;
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "heartLayout", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "heartLose", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "heartRed", [_dec5], {
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
//# sourceMappingURL=37c4bf70771c1fd4f2dbcdb178d46f7c6f6314c8.js.map