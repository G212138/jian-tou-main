System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Node, Prefab, v3, app, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Guide;

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
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "81660hR3WdKK5V0IsEd2D4R", "Guide", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Node', 'Prefab', 'v3', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Guide", Guide = (_dec = ccclass('Guide'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Node), _dec(_class = (_class2 = class Guide extends Component {
        constructor() {
          super(...arguments);

          // 新手引导一
          _initializerDefineProperty(this, "guideOneNode", _descriptor, this);

          // 新手引导二   
          _initializerDefineProperty(this, "guideTwoNode", _descriptor2, this);

          _initializerDefineProperty(this, "guideParentNode", _descriptor3, this);
        }

        onLoad() {
          // 监听新手引导一
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.showGuideOne, this.showGuideOne, this); // 监听新手引导一移动事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.guideOneMove, this.guideOneMove, this); // 监听新手引导二

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.showGuideTwo, this.showGuideTwo, this); // 监听新手引导结束

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.guideOneEnd, this.guideOneEnd, this); // 监听新手引导二结束

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.guideTwoEnd, this.guideTwoEnd, this);
        } // 显示新手引导一


        showGuideOne() {
          // 移除新手引导一
          this.guideParentNode.removeAllChildren();

          if (this.guideOneNode) {
            this.guideParentNode.addChild(instantiate(this.guideOneNode));
          }
        } // 新手引导一移动事件


        guideOneMove(pos) {
          if (this.guideOneNode) {
            // 移动新手引导一到指定位置
            console.log("Guide: \u65B0\u624B\u5F15\u5BFC\u4E00\u79FB\u52A8\u5230 " + pos);
            var hand = this.guideParentNode.getChildByName('hand');

            if (!hand) {
              this.showGuideOne();
              hand.setPosition(v3(pos.x, pos.y, 0));
            } else {
              hand.setPosition(v3(pos.x, pos.y, 0));
            }
          }
        } // 显示新手引导二


        showGuideTwo() {
          // 移除新手引导一
          this.guideParentNode.removeAllChildren();

          if (this.guideTwoNode) {
            this.guideParentNode.addChild(instantiate(this.guideTwoNode));
          }
        } // 新手引导结束事件


        guideOneEnd() {
          if (this.guideOneNode) {
            // 移除新手引导一
            var hand = this.guideParentNode.getChildByName('hand');

            if (hand) {
              this.guideParentNode.removeChild(hand);
            }
          }
        } // 新手引导二结束事件


        guideTwoEnd() {
          console.log('Guide: 新手引导二结束');

          if (this.guideTwoNode) {
            console.log('Guide: 新手引导二节点存在'); // 移除新手引导二

            var suofang = this.guideParentNode.getChildByName('suofang');

            if (suofang) {
              console.log('Guide: 新手引导二节点存在，移除');
              this.guideParentNode.removeChild(suofang);
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "guideOneNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "guideTwoNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "guideParentNode", [_dec4], {
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
//# sourceMappingURL=8daeb37c2cf0845026eeb41fa484ff5a64d8ce51.js.map