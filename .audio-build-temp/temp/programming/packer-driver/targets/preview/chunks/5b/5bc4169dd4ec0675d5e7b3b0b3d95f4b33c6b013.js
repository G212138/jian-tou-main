System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, NodePool, Prefab, Tween, UIOpacity, UITransform, _decorator, instantiate, tween, view, UIMgrToastCell, _dec, _dec2, _dec3, _class, _class2, _descriptor, _crd, property, ccclass, requireComponent, UIMgrToast;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfUIMgrToastCell(extras) {
    _reporterNs.report("UIMgrToastCell", "./UIMgrToastCell", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
      NodePool = _cc.NodePool;
      Prefab = _cc.Prefab;
      Tween = _cc.Tween;
      UIOpacity = _cc.UIOpacity;
      UITransform = _cc.UITransform;
      _decorator = _cc._decorator;
      instantiate = _cc.instantiate;
      tween = _cc.tween;
      view = _cc.view;
    }, function (_unresolved_2) {
      UIMgrToastCell = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cde15KM9mxA9L3SJ78TjOHf", "UIMgrToast", undefined);

      __checkObsolete__(['Component', 'NodePool', 'Prefab', 'Tween', 'UIOpacity', 'UITransform', '_decorator', 'instantiate', 'tween', 'view']);

      ({
        property,
        ccclass,
        requireComponent
      } = _decorator);

      _export("default", UIMgrToast = (_dec = ccclass('UIMgrToast'), _dec2 = requireComponent(UITransform), _dec3 = property(Prefab), _dec(_class = _dec2(_class = (_class2 = class UIMgrToast extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "cell", _descriptor, this);

          /**每条信息显示几秒 */
          this.lifeTime = 2;

          /**消失时花费几秒渐隐 */
          this.outTime = 0.2;

          /**挤压基础速度 */
          this.squeezeSpeed = 200;

          /**节点缓存池子 */
          this.pool = new NodePool();
        }

        add(data) {
          var cell = this.pool.get() || instantiate(this.cell);
          cell.setPosition(0, 0, 0);
          cell.parent = this.node;
          cell.active = true;
          cell.getComponent(_crd && UIMgrToastCell === void 0 ? (_reportPossibleCrUseOfUIMgrToastCell({
            error: Error()
          }), UIMgrToastCell) : UIMgrToastCell).init(data.message);
          cell.getComponent(UIOpacity).opacity = 255;
          tween(cell.getComponent(UIOpacity)).delay(data.timeout || this.lifeTime).to(this.outTime, {
            opacity: 0
          }).call(() => {
            this.pool.put(cell);
          }).start();
        }

        clear() {
          var children = this.node.children;

          for (var index = children.length - 1; index >= 0; index--) {
            Tween.stopAllByTarget(children[index].getComponent(UIOpacity));
            children[index].destroy();
          }
        }

        get size() {
          return this.node.children.length;
        }

        onDestroy() {
          this.pool.clear();
        }

        update(dt) {
          var children = this.node.children;

          for (var index = children.length - 1, recovery = false; index >= 0; index--) {
            var zero = index === children.length - 1;
            var curr = children[index]; // 直接触发回收逻辑

            if (recovery) {
              Tween.stopAllByTarget(curr.getComponent(UIOpacity));
              this.pool.put(curr);
              continue;
            }

            if (zero) {
              var currUT = curr.getComponent(UITransform);
              var lastMaxY = 0 - currUT.height / 2;
              var currMinY = curr.position.y + lastMaxY;

              if (currMinY > lastMaxY) {
                // 存在空隙
                var addLen = Math.max(-this.squeezeSpeed * dt * (children.length - index), lastMaxY - currMinY);
                curr.setPosition(curr.position.x, curr.position.y + addLen, curr.position.z);
              }
            } else {
              var last = children[index + 1];

              var _currUT = curr.getComponent(UITransform);

              var lastUT = last.getComponent(UITransform);

              var _currMinY = curr.position.y - _currUT.height / 2 - 6; //6像素的间隔


              var _lastMaxY = last.position.y + lastUT.height / 2;

              if (_currMinY < _lastMaxY) {
                // 存在重叠
                var _addLen = Math.min(this.squeezeSpeed * dt * (children.length - index - 1), _lastMaxY - _currMinY);

                curr.setPosition(curr.position.x, curr.position.y + _addLen, curr.position.z);
                var winSize = view.getVisibleSize();

                if (_currMinY > winSize.height / 2) {
                  // 触发回收逻辑
                  recovery = true;
                  Tween.stopAllByTarget(curr.getComponent(UIOpacity));
                  this.pool.put(curr);
                }
              } else if (_currMinY > _lastMaxY) {
                // 存在空隙
                var _addLen2 = Math.max(-this.squeezeSpeed * dt * (children.length - index), _lastMaxY - _currMinY);

                curr.setPosition(curr.position.x, curr.position.y + _addLen2, curr.position.z);
              }
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cell", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5bc4169dd4ec0675d5e7b3b0b3d95f4b33c6b013.js.map