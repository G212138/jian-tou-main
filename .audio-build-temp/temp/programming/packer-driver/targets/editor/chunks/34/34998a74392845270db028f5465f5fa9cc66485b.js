System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, Label, UIOpacity, UITransform, _decorator, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _crd, ccclass, property, requireComponent, UIMgrToastCell;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
      Label = _cc.Label;
      UIOpacity = _cc.UIOpacity;
      UITransform = _cc.UITransform;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6cc63HWsI5O44ve4wfEKIc0", "UIMgrToastCell", undefined);

      __checkObsolete__(['Component', 'Label', 'UIOpacity', 'UITransform', '_decorator']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);

      _export("default", UIMgrToastCell = (_dec = ccclass('UIMgrToastCell'), _dec2 = requireComponent(UIOpacity), _dec3 = requireComponent(UITransform), _dec4 = property(Label), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class UIMgrToastCell extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "title", _descriptor, this);
        }

        init(title) {
          if (title.split('\n').find(v => v.length > 30)) {
            this.title.overflow = Label.Overflow.RESIZE_HEIGHT;
            this.title.getComponent(UITransform).width = 600;
          } else {
            this.title.overflow = Label.Overflow.NONE;
          }

          this.title.string = title;
          this.title.updateRenderData(true);
        }

        unuse() {
          this.title.string = '';
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=34998a74392845270db028f5465f5fa9cc66485b.js.map