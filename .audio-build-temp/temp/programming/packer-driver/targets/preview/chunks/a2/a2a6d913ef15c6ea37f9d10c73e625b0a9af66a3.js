System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Camera, Color, Component, Director, Material, RenderTexture, Sprite, SpriteFrame, UIOpacity, UITransform, _decorator, director, Core, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, requireComponent, UIMgrShade;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../../../Core", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Camera = _cc.Camera;
      Color = _cc.Color;
      Component = _cc.Component;
      Director = _cc.Director;
      Material = _cc.Material;
      RenderTexture = _cc.RenderTexture;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      UIOpacity = _cc.UIOpacity;
      UITransform = _cc.UITransform;
      _decorator = _cc._decorator;
      director = _cc.director;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d02952bsB1JPJ4xXteObDOr", "UIMgrShade", undefined);

      __checkObsolete__(['Camera', 'Color', 'Component', 'Director', 'Material', 'RenderTexture', 'Sprite', 'SpriteFrame', 'UIOpacity', 'UITransform', '_decorator', 'director']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);

      _export("default", UIMgrShade = (_dec = ccclass('UIMgrShade'), _dec2 = requireComponent(Sprite), _dec3 = requireComponent(UIOpacity), _dec4 = property(Material), _dec5 = property(SpriteFrame), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class UIMgrShade extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "blurMaterial", _descriptor, this);

          _initializerDefineProperty(this, "shadeFrame", _descriptor2, this);

          _initializerDefineProperty(this, "_delay", _descriptor3, this);

          _initializerDefineProperty(this, "_begin", _descriptor4, this);

          _initializerDefineProperty(this, "_end", _descriptor5, this);

          _initializerDefineProperty(this, "_speed", _descriptor6, this);

          this.inited = false;
          this.drawing = false;
          this.timedown = 0;
          this.blurFrame = null;
        }

        get delay() {
          return this._delay;
        }

        set delay(v) {
          this._delay = Math.max(v, 0);
        }

        get begin() {
          return this._begin;
        }

        set begin(v) {
          if (v >= 0 && v <= 255) this._begin = v;
        }

        get end() {
          return this._end;
        }

        set end(v) {
          if (v >= 0 && v <= 255) this._end = v;
        }

        get speed() {
          if (this.begin == this.end) {
            return 0;
          } else if (this.begin > this.end) {
            return this._speed > 0 ? -this._speed : this._speed;
          } else {
            return this._speed >= 0 ? this._speed : -this._speed;
          }
        }

        set speed(v) {
          this._speed = v;
        }

        get sprite() {
          return this.node.getComponent(Sprite);
        }

        get opacity() {
          return this.node.getComponent(UIOpacity);
        }

        init(delay, begin, end, speed, blur) {
          if (blur) {
            director.targetOff(this);
            this.inited = false;
            this.drawing = false;
            this.sprite.color = Color.WHITE;
            this.sprite.customMaterial = null;
            this.sprite.spriteFrame = this.blurFrame;
            if (this.blurFrame) this.blurFrame.flipUVY = false;
            var count = 0;
            var cameras = director.getScene().getComponentsInChildren(Camera);
            director.on(Director.EVENT_BEFORE_RENDER, () => {
              var _this$blurFrame2;

              count++;
              var renderTexture = new RenderTexture();
              var size = this.node.getComponent(UITransform);
              renderTexture.reset({
                width: size.width / 2,
                height: size.height / 2
              });
              renderTexture.addRef();
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.screenshot(renderTexture, {
                cameraList: cameras
              });

              if (count === 1) {
                var _this$blurFrame;

                this.blurFrame = new SpriteFrame();
                (_this$blurFrame = this.blurFrame) == null || (_this$blurFrame = _this$blurFrame.texture) == null || _this$blurFrame.decRef();
                this.blurFrame.texture = renderTexture;
                this.blurFrame.flipUVY = true;
                this.sprite.spriteFrame = this.blurFrame;
                this.sprite.customMaterial = this.blurMaterial;
                this.blurMaterial.setProperty('blurLevel', 2);
                return;
              }

              if (count === 5) {
                director.targetOff(this);
                this.sprite.spriteFrame.flipUVY = false;
                this.sprite.customMaterial = null;
                return;
              }

              (_this$blurFrame2 = this.blurFrame) == null || (_this$blurFrame2 = _this$blurFrame2.texture) == null || _this$blurFrame2.decRef();
              this.blurFrame.texture = renderTexture;
              this.blurFrame.flipUVY = true;
              this.sprite.spriteFrame = this.blurFrame;
              this.sprite.customMaterial = this.blurMaterial;
              this.blurMaterial.setProperty('blurLevel', count === 2 ? 3 : 1);
            }, this);
          } else {
            director.targetOff(this);
            this.sprite.spriteFrame = this.shadeFrame;
            this.sprite.color = Color.BLACK;
            this.sprite.customMaterial = null;
          }

          this.delay = delay;
          this.begin = begin;
          this.end = end;
          this.speed = speed;
          this.drawing = true;
          if (this.inited) return;
          this.inited = true;
          this.timedown = this.delay; // 初始透明度

          this.opacity.opacity = this.timedown > 0 ? 0 : this.begin;
        }

        clear() {
          var _this$blurFrame3, _this$blurFrame4;

          this.inited = false;
          this.drawing = false;
          director.targetOff(this);
          (_this$blurFrame3 = this.blurFrame) == null || (_this$blurFrame3 = _this$blurFrame3.texture) == null || _this$blurFrame3.decRef();
          (_this$blurFrame4 = this.blurFrame) == null || _this$blurFrame4.destroy();
          this.blurFrame = null;
          this.sprite.spriteFrame = null;
        }

        update(dt) {
          if (!this.inited) return;
          if (!this.drawing) return;

          if (this.timedown > 0) {
            this.timedown -= dt;
            if (this.timedown > 0) return; // 初始透明度

            this.opacity.opacity = this.begin;
          }

          var uiOpacity = this.opacity;

          if (this.speed > 0) {
            uiOpacity.opacity += this.speed * dt;

            if (uiOpacity.opacity > this.end) {
              uiOpacity.opacity = this.end;
            }
          } else if (this.speed < 0) {
            uiOpacity.opacity += this.speed * dt;

            if (uiOpacity.opacity < this.end) {
              uiOpacity.opacity = this.end;
            }
          }

          if (uiOpacity.opacity == this.end) {
            this.drawing = false;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "blurMaterial", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shadeFrame", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "delay", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "delay"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_begin", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "begin", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "begin"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_end", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 255;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "end", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "end"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "speed", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "speed"), _class2.prototype)), _class2)) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a2a6d913ef15c6ea37f9d10c73e625b0a9af66a3.js.map