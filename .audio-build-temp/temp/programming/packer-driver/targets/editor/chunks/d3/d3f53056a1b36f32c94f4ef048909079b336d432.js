System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, Graphics, Node, Size, UITransform, _decorator, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, requireComponent, UIMgrLoading;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      Node = _cc.Node;
      Size = _cc.Size;
      UITransform = _cc.UITransform;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4a8e5aXrnhKSo0IF6zGgjon", "UIMgrLoading", undefined);

      __checkObsolete__(['Component', 'Graphics', 'Node', 'Size', 'UITransform', '_decorator']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);

      _export("default", UIMgrLoading = (_dec = ccclass('UIMgrLoading'), _dec2 = requireComponent(UITransform), _dec3 = property(Node), _dec4 = property({
        tooltip: '动画的尺寸'
      }), _dec5 = property({
        tooltip: '等待几秒后开始动画'
      }), _dec(_class = _dec2(_class = (_class2 = class UIMgrLoading extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "loading", _descriptor, this);

          _initializerDefineProperty(this, "size", _descriptor2, this);

          _initializerDefineProperty(this, "delay", _descriptor3, this);

          this.progress = 0;
          this.ringScale = 1;
          this.reverse = false;
          this.angleSpeed = 120;
          this.ringSpeed = 0.02;
          this.inited = false;
          this.drawing = false;
          this.timedown = 0;
        }

        init() {
          if (this.inited) return;
          this.inited = true;
          this.progress = 0;
          this.ringScale = 1;
          this.loading.angle = 0;
          this.reverse = false;
          this.drawing = false;
          this.timedown = this.delay;
          this.loading.getComponent(Graphics).clear();
        }

        clear() {
          this.inited = false;
          this.drawing = false;
        }
        /**
         * 需要重写
         */


        onDraw() {
          const graphics = this.loading.getComponent(Graphics);
          const uiTransform = this.loading.getComponent(UITransform);
          const centerX = this.size.width * (0.5 - uiTransform.anchorX);
          const centerY = this.size.height * (0.5 - uiTransform.anchorY);
          const r = Math.min(this.size.width / 2, this.size.height / 2);
          const allPI = Math.PI;
          const offst = 0;
          graphics.clear();

          if (this.reverse) {
            const start = 0.5 * Math.PI + offst;
            const end = 0.5 * Math.PI + this.progress * 2 * allPI + offst;
            graphics.arc(centerX, centerY, r, start, end, true);
          } else {
            const start = 0.5 * Math.PI - offst;
            const end = 0.5 * Math.PI - this.progress * 2 * allPI - offst;
            graphics.arc(centerX, centerY, r, start, end, false);
          }

          graphics.stroke();
        }

        update(dt) {
          if (!this.inited) return; // 倒计时

          if (!this.drawing) {
            if (this.timedown > 0) {
              this.timedown -= dt;
            }

            if (this.timedown <= 0) {
              this.drawing = true;
            } else {
              return;
            }
          } // 旋转


          this.loading.angle -= this.angleSpeed * dt;

          if (this.loading.angle >= 360 || this.loading.angle <= -360) {
            this.loading.angle = this.loading.angle % 360;
          } // 进度


          if (this.ringScale > 0) {
            this.progress = Math.min(1, this.progress + this.ringSpeed * this.ringScale);

            if (this.progress == 1) {
              this.ringScale = -1;
              this.reverse = !this.reverse;
            }
          } else {
            this.progress = Math.max(0, this.progress + this.ringSpeed * this.ringScale);

            if (this.progress == 0) {
              this.ringScale = 1;
              this.reverse = !this.reverse;
            }
          }

          this.onDraw();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Size(60, 60);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "delay", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d3f53056a1b36f32c94f4ef048909079b336d432.js.map