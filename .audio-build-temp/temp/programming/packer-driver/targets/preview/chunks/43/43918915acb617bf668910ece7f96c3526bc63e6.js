System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, app, bindStore, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TiLiHome;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbindStore(extras) {
    _reporterNs.report("bindStore", "db://pkg/@gamex/cc-store", _context.meta, extras);
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
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }, function (_unresolved_3) {
      bindStore = _unresolved_3.bindStore;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "48047jAUJJGm6v6T0CZ5yo/", "TiLiHome", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'macro', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TiLiHome", TiLiHome = (_dec = ccclass('TiLiHome'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = class TiLiHome extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "daoJiShi", _descriptor, this);

          _initializerDefineProperty(this, "tiLi", _descriptor2, this);
        }

        start() {
          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.tiLi, 'string', () => {
            return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.tili.toString();
          });
          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.daoJiShi, 'string', () => {
            return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.getDaoJiShi();
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "daoJiShi", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tiLi", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=43918915acb617bf668910ece7f96c3526bc63e6.js.map