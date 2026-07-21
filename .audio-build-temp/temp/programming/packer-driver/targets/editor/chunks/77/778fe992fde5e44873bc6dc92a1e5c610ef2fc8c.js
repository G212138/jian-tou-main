System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, UITransform, Vec2, math, macro, app, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, TouchZoomPan;

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
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      math = _cc.math;
      macro = _cc.macro;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d0fe00f4NdD8qm84eVxqXHB", "TouchZoomPan", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'EventMouse', 'Vec3', 'UITransform', 'Vec2', 'math', 'macro']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TouchZoomPan", TouchZoomPan = (_dec = ccclass('TouchZoomPan'), _dec2 = property({
        type: Node,
        tooltip: "需要控制的目标节点（例如地图、图片）"
      }), _dec3 = property({
        tooltip: "最小缩放值"
      }), _dec4 = property({
        tooltip: "最大缩放值"
      }), _dec5 = property({
        tooltip: "鼠标滚轮缩放速度"
      }), _dec(_class = (_class2 = class TouchZoomPan extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "targetNode", _descriptor, this);

          _initializerDefineProperty(this, "minScale", _descriptor2, this);

          _initializerDefineProperty(this, "maxScale", _descriptor3, this);

          _initializerDefineProperty(this, "wheelSpeed", _descriptor4, this);

          // --- 内部变量 ---
          this._initialDistance = 0;
          this._initialScale = new Vec3();
          this._tempVec3 = new Vec3();
          this._viewSize = new math.Size();
          this._contentSize = new math.Size();
          this._isZooming = false;
        }

        // 标记是否正在缩放中
        onLoad() {
          // 开启多点触控（保险起见）
          macro.ENABLE_MULTI_TOUCH = true;

          if (!this.targetNode) {
            console.error("TouchZoomPan: 请在属性面板中绑定 Target Node !");
            return;
          } // 注册触摸事件


          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.node.on(Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this); //监听restart

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this._onRestart, this);
        }

        _onRestart() {
          // 重置拖动状态
          this.node.setPosition(0, 0);
          this.node.setScale(1, 1);
        }

        onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.node.off(Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        }

        onTouchStart(event) {
          // 这里的逻辑其实可以简化，主要逻辑放在 Move 里处理会更稳健
          // 仅仅用来清理状态
          if (event.getTouches().length < 2) {
            this._isZooming = false;
          }
        }

        onTouchMove(event) {
          const touches = event.getTouches(); // =========================
          //      双指缩放逻辑
          // =========================

          if (touches.length === 2) {
            const p1 = touches[0].getUILocation();
            const p2 = touches[1].getUILocation();
            const currentDistance = Vec2.distance(p1, p2); // 关键修复：如果在 Move 过程中发现变成了双指，但还没开始记录初始值，立刻记录

            if (!this._isZooming) {
              this._initialDistance = currentDistance;

              this._initialScale.set(this.targetNode.scale);

              this._isZooming = true; // 锁定状态，防止单指逻辑干扰

              return; // 第一帧只记录，不缩放，防止跳变
            }

            if (this._initialDistance > 0) {
              // 计算缩放倍率
              const scaleFactor = currentDistance / this._initialDistance;
              let newScale = this._initialScale.x * scaleFactor; // 限制缩放范围

              newScale = Math.max(this.minScale, Math.min(newScale, this.maxScale)); // 应用缩放

              this.targetNode.setScale(new Vec3(newScale, newScale, 1)); // 限制边界

              this.targetNode.getPosition(this._tempVec3);
              this.limitPosition(this._tempVec3, newScale);
              this.targetNode.setPosition(this._tempVec3); //取消缩放引导

              if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getNeedGuideTwo()) {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.globaldata.setNeedGuideTwo(false); // 移除新手引导二

                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.guideTwoEnd);
              }
            }
          } // =========================
          //      单指移动逻辑
          // =========================
          else if (touches.length === 1) {
            // 如果刚刚松开一只手（从双指变单指），需要重置状态，不要立刻移动，否则会跳变
            if (this._isZooming) {
              this._isZooming = false;
              return;
            }

            const delta = event.getUIDelta();
            this.targetNode.getPosition(this._tempVec3);
            this._tempVec3.x += delta.x;
            this._tempVec3.y += delta.y;
            this.limitPosition(this._tempVec3, this.targetNode.scale.x);
            this.targetNode.setPosition(this._tempVec3);
          }
        }

        onTouchEnd(event) {
          const touches = event.getTouches(); // 如果手指少于2根，重置缩放状态

          if (touches.length < 2) {
            this._isZooming = false;
          }
        }

        onMouseWheel(event) {
          const scrollY = event.getScrollY();
          const scaleDiff = (scrollY > 0 ? 1 : -1) * this.wheelSpeed;
          let newScale = this.targetNode.scale.x + scaleDiff;
          newScale = Math.max(this.minScale, Math.min(newScale, this.maxScale));
          this.targetNode.setScale(new Vec3(newScale, newScale, 1));
          this.targetNode.getPosition(this._tempVec3);
          this.limitPosition(this._tempVec3, newScale);
          this.targetNode.setPosition(this._tempVec3); //取消缩放引导

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getNeedGuideTwo()) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setNeedGuideTwo(false); // 移除新手引导二

            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.guideTwoEnd);
          }
        }
        /**
         * 边界限制：保留显示2/3
         */


        limitPosition(pos, scale) {
          const viewTrans = this.node.getComponent(UITransform);
          const contentTrans = this.targetNode.getComponent(UITransform);
          if (!viewTrans || !contentTrans) return;
          this._viewSize = viewTrans.contentSize;
          this._contentSize = contentTrans.contentSize;
          const scaledW = this._contentSize.width * scale;
          const scaledH = this._contentSize.height * scale;
          const limitX = Math.max(scaledW, this._viewSize.width) * 1 / 4;
          if (pos.x > limitX) pos.x = limitX;
          if (pos.x < -limitX) pos.x = -limitX;
          const limitY = Math.max(scaledH, this._viewSize.height) * 1 / 4;
          if (pos.y > limitY) pos.y = limitY;
          if (pos.y < -limitY) pos.y = -limitY;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minScale", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxScale", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wheelSpeed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=778fe992fde5e44873bc6dc92a1e5c610ef2fc8c.js.map