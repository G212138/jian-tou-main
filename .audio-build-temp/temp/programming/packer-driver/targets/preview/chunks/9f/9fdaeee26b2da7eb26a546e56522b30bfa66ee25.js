System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, UITransform, Vec2, Widget, macro, v3, app, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, Drag;

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
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Widget = _cc.Widget;
      macro = _cc.macro;
      v3 = _cc.v3;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a5146yTOyRHv7JVrc/qlghI", "Drag", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'UITransform', 'EventTouch', 'Touch', 'EventMouse', 'Vec2', 'Widget', 'Canvas', 'input', 'Input', 'macro', 'v3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Drag", Drag = (_dec = ccclass('Drag'), _dec2 = property({
        displayName: "启用拖动"
      }), _dec3 = property({
        displayName: "限制在屏幕内"
      }), _dec4 = property({
        displayName: "启用鼠标缩放"
      }), _dec5 = property({
        displayName: "最小缩放",
        visible: function visible() {
          return this.enableScale;
        }
      }), _dec6 = property({
        displayName: "最大缩放",
        visible: function visible() {
          return this.enableScale;
        }
      }), _dec7 = property({
        displayName: "缩放速度",
        visible: function visible() {
          return this.enableScale;
        }
      }), _dec8 = property({
        type: Node,
        displayName: "父节点，不能超出父节点范围"
      }), _dec(_class = (_class2 = class Drag extends Component {
        constructor() {
          super(...arguments);

          // 是否启用拖动
          _initializerDefineProperty(this, "enableDrag", _descriptor, this);

          // 是否限制在屏幕内
          _initializerDefineProperty(this, "limitInScreen", _descriptor2, this);

          // 是否启用鼠标缩放
          _initializerDefineProperty(this, "enableScale", _descriptor3, this);

          // 最小缩放
          _initializerDefineProperty(this, "minScale", _descriptor4, this);

          // 最大缩放
          _initializerDefineProperty(this, "maxScale", _descriptor5, this);

          // 缩放速度
          _initializerDefineProperty(this, "scaleSpeed", _descriptor6, this);

          // 私有变量
          this._isDragging = false;
          this._offset = new Vec2();
          this._widget = null;
          this._widgetEnabled = false;

          _initializerDefineProperty(this, "parentNode", _descriptor7, this);

          // 双指缩放相关
          this._isScaling = false;
          this._lastDistance = 0;
          this._lastTouchCenter = new Vec2();
          this._touches = [];
          //用来计算单指移动的距离
          this.moveDistance = 0;
        }

        onLoad() {
          // 检查是否有Widget组件
          this._widget = this.node.getComponent(Widget); //监听restart

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this._onRestart, this);
        }

        start() {
          // 注册触摸事件
          this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this); // 注册鼠标滚轮事件

          if (this.enableScale) {
            this.node.on(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
          } //加一个保护机制，不知道什么原因导致滑动出了屏幕外面，需要重置回来


          this.schedule(this.checkPosition, 1, macro.REPEAT_FOREVER);
        }

        checkPosition() {
          //获取屏幕限制
          var screenSize = this._getScreenLimit(); //获取自己的坐标


          var nodeWorldPos = this.node.worldPosition; //判断是否超出屏幕

          if (nodeWorldPos.x < screenSize.minX) {
            this.node.setWorldPosition(v3(screenSize.minX, nodeWorldPos.y, nodeWorldPos.z));
          } else if (nodeWorldPos.x > screenSize.maxX) {
            this.node.setWorldPosition(v3(screenSize.maxX, nodeWorldPos.y, nodeWorldPos.z));
          }

          if (nodeWorldPos.y < screenSize.minY) {
            this.node.setWorldPosition(v3(nodeWorldPos.x, screenSize.minY, nodeWorldPos.z));
          } else if (nodeWorldPos.y > screenSize.maxY) {
            this.node.setWorldPosition(v3(nodeWorldPos.x, screenSize.maxY, nodeWorldPos.z));
          }
        }

        onDestroy() {
          // 注销触摸事件
          this.node.off(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this._onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this); // 注销鼠标滚轮事件

          if (this.enableScale) {
            this.node.off(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
          } // 注销保护机制


          this.unschedule(this.checkPosition);
        }

        _onRestart() {
          // 重置拖动状态
          this.node.setPosition(0, 0);
          this.node.setScale(1, 1);
        }

        _onTouchStart(event) {
          this.moveDistance = 0;
          var touches = event.getTouches(); // 如果已经有两个触摸点，则不响应

          if (this._touches.length === 2) return; //取前两个点，若果已经有一个点，则取一个点

          if (this._touches.length === 1) {
            this._touches.push(touches[0]);
          } else {
            this._touches.push(...touches.slice(0, 2));
          }

          if (this._touches.length === 1) {
            // 单指按下 - 开始或继续拖动
            // 如果之前在缩放，不响应
            if (this._isScaling) {
              return;
            }

            if (this.enableDrag) {
              // 设置拖动状态
              this._isDragging = true;
              this._isScaling = false; // 禁用Widget（如果有）

              if (this._widget && this._widget.enabled) {
                this._widgetEnabled = this._widget.enabled;
                this._widget.enabled = false;
              } // 重要：每次单指按下都重新计算偏移量
              // 这样可以确保节点不会跳动


              var touchPos = this._touches[0].getUILocation();

              var nodeWorldPos = this.node.worldPosition;

              this._offset.set(touchPos.x - nodeWorldPos.x, touchPos.y - nodeWorldPos.y);
            }
          } else if (this._touches.length >= 2) {
            // 双指按下 - 开始缩放
            if (this.enableScale) {
              // 停止拖动，开始缩放
              this._isDragging = false;
              this._isScaling = true; // 禁用Widget（如果有）

              if (this._widget && this._widget.enabled) {
                if (!this._widgetEnabled) {
                  this._widgetEnabled = this._widget.enabled;
                }

                this._widget.enabled = false;
              } //重要：基于当前双指位置初始化缩放数据


              var touch1 = this._touches[0].getUILocation();

              var touch2 = this._touches[1].getUILocation();

              this._lastDistance = this._getTouchDistance(touch1, touch2);

              this._lastTouchCenter.set((touch1.x + touch2.x) / 2, (touch1.y + touch2.y) / 2);
            }
          }
        }

        _onTouchMove(event) {
          // 双指缩放
          if (this._touches.length >= 2 && this._isScaling && this.enableScale) {
            var touch1 = this._touches[0].getUILocation();

            var touch2 = this._touches[1].getUILocation(); // 计算当前双指距离


            var currentDistance = this._getTouchDistance(touch1, touch2); // 计算距离变化比例


            var distanceRatio = currentDistance / this._lastDistance; // 如果距离变化太小，忽略（可能是手指抖动）

            if (Math.abs(distanceRatio - 1.0) < 0.01) {
              this._lastDistance = currentDistance;
              return;
            } // 计算新的缩放值


            var currentScale = this.node.scale.x;
            var newScale = currentScale * distanceRatio; // 限制在最小最大范围内

            newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale)); // 如果缩放值没变化，只更新距离

            if (newScale === currentScale) {
              this._lastDistance = currentDistance;
              return;
            } //取消缩放引导


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
            } // 计算当前双指中心点


            var currentCenter = new Vec2((touch1.x + touch2.x) / 2, (touch1.y + touch2.y) / 2); // 获取节点当前的世界坐标

            var nodeWorldPos = this.node.worldPosition; // 计算中心点相对于节点中心的偏移

            var offsetX = currentCenter.x - nodeWorldPos.x;
            var offsetY = currentCenter.y - nodeWorldPos.y; // 应用缩放

            this.node.setScale(newScale, newScale, newScale); // 计算缩放后，为了保持中心点位置不变，节点应该移动到的新位置

            var scaleRatio = newScale / currentScale;
            var newWorldX = currentCenter.x - offsetX * scaleRatio;
            var newWorldY = currentCenter.y - offsetY * scaleRatio; // 应用屏幕限制

            if (this.limitInScreen && this.parentNode) {
              var limit = this._getScreenLimit();

              if (limit) {
                newWorldX = Math.max(limit.minX, Math.min(limit.maxX, newWorldX));
                newWorldY = Math.max(limit.minY, Math.min(limit.maxY, newWorldY));
              }
            } // 更新节点位置


            this.node.setWorldPosition(newWorldX, newWorldY, nodeWorldPos.z); // 更新上一次的距离

            this._lastDistance = currentDistance;
            return;
          } // 单指拖动


          if (this._touches.length === 1 && this._isDragging && this.enableDrag && !this._isScaling) {
            // 获取触摸点的世界坐标
            var touchPos = this._touches[0].getUILocation(); // 计算新的世界坐标位置（减去偏移）


            var _newWorldX = touchPos.x - this._offset.x;

            var _newWorldY = touchPos.y - this._offset.y; // 限制在屏幕范围内


            if (this.limitInScreen && this.parentNode) {
              var _limit = this._getScreenLimit();

              if (_limit) {
                _newWorldX = Math.max(_limit.minX, Math.min(_limit.maxX, _newWorldX));
                _newWorldY = Math.max(_limit.minY, Math.min(_limit.maxY, _newWorldY));
              }
            } // 更新节点的世界坐标


            this.node.setWorldPosition(_newWorldX, _newWorldY, this.node.worldPosition.z);
          }
        }

        _onTouchEnd(event) {
          var touches = event.getTouches(); // 移除触摸点

          touches.forEach(touch => {
            this._touches = this._touches.filter(t => t.getID() !== touch.getID());
          });

          if (this._touches.length === 1) {
            this._isDragging = true;
            this._isScaling = false; //设置单指偏移量

            this._offset.set(this._touches[0].getUILocation().x - this.node.worldPosition.x, this._touches[0].getUILocation().y - this.node.worldPosition.y);
          }

          if (this._touches.length === 2) {
            this._isScaling = true;
            this._isDragging = false; //设置双指缩放相关数据

            this._lastDistance = this._getTouchDistance(this._touches[0].getUILocation(), this._touches[1].getUILocation());

            this._lastTouchCenter.set((this._touches[0].getUILocation().x + this._touches[1].getUILocation().x) / 2, (this._touches[0].getUILocation().y + this._touches[1].getUILocation().y) / 2);
          } // 所有手指都抬起 - 完全重置状态


          if (this._touches.length === 0) {
            // 清除所有状态
            this._isDragging = false;
            this._isScaling = false; // 注意：不清除 _offset，它会在下次 TouchStart 时重新计算
            // 清除缩放相关数据

            this._lastDistance = 0;

            this._lastTouchCenter.set(0, 0); // 恢复Widget（如果有）


            if (this._widget) {
              this._widget.enabled = this._widgetEnabled;
            }
          }
        }

        _onMouseWheel(event) {
          console.log("鼠标滚轮滚动事件", event);
          if (!this.enableScale) return;
          var uiTransform = this.node.getComponent(UITransform);
          if (!uiTransform) return; // 获取滚轮滚动方向

          var scrollY = event.getScrollY(); // 计算新的缩放值

          var currentScale = this.node.scale.x; // 假设xyz缩放一致

          var scaleChange = scrollY > 0 ? this.scaleSpeed : -this.scaleSpeed;
          var newScale = currentScale + scaleChange; // 限制在最小最大范围内

          newScale = Math.max(this.minScale, Math.min(this.maxScale, newScale)); // 如果缩放值没变化，直接返回

          if (newScale === currentScale) return; // 获取鼠标在世界坐标系中的位置

          var mouseWorldPos = event.getUILocation(); // 获取节点当前的世界坐标

          var nodeWorldPos = this.node.worldPosition; // 计算鼠标相对于节点中心的偏移（世界坐标）

          var offsetX = mouseWorldPos.x - nodeWorldPos.x;
          var offsetY = mouseWorldPos.y - nodeWorldPos.y; // 应用缩放

          this.node.setScale(newScale, newScale, newScale); // 计算缩放后，为了保持鼠标位置不变，节点应该移动到的新位置
          // 缩放会改变偏移量，所以需要重新计算节点位置

          var scaleRatio = newScale / currentScale;
          var newWorldX = mouseWorldPos.x - offsetX * scaleRatio;
          var newWorldY = mouseWorldPos.y - offsetY * scaleRatio; // 应用屏幕限制

          if (this.limitInScreen && this.parentNode) {
            var limit = this._getScreenLimit();

            if (limit) {
              newWorldX = Math.max(limit.minX, Math.min(limit.maxX, newWorldX));
              newWorldY = Math.max(limit.minY, Math.min(limit.maxY, newWorldY));
            }
          } //取消缩放引导


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
          } // 更新节点位置


          this.node.setWorldPosition(newWorldX, newWorldY, nodeWorldPos.z);
        }
        /**
        
         * 获取屏幕限制范围（世界坐标）
        
         * 确保物体完全覆盖屏幕，不露出黑边
        
         */


        _getScreenLimit() {
          var selfTransform = this.node.getComponent(UITransform);
          var canvasTransform = this.parentNode.getComponent(UITransform);

          if (!selfTransform || !canvasTransform) {
            return null;
          } // 获取Canvas的世界坐标和尺寸


          var canvasWorldPos = this.parentNode.worldPosition;
          var canvasWidth = canvasTransform.width;
          var canvasHeight = canvasTransform.height; // 获取节点的尺寸（考虑缩放）

          var selfWidth = selfTransform.width * Math.abs(this.node.scale.x);
          var selfHeight = selfTransform.height * Math.abs(this.node.scale.y); // 计算节点的半尺寸

          var halfWidth = selfWidth / 2;
          var halfHeight = selfHeight / 2; // 计算Canvas的边界（世界坐标）

          var canvasLeft = canvasWorldPos.x - canvasWidth / 2;
          var canvasRight = canvasWorldPos.x + canvasWidth / 2;
          var canvasBottom = canvasWorldPos.y - canvasHeight / 2;
          var canvasTop = canvasWorldPos.y + canvasHeight / 2; // 如果节点比屏幕小：限制节点不能离开屏幕

          if (selfWidth <= canvasWidth && selfHeight <= canvasHeight) {
            return {
              minX: canvasLeft + halfWidth,
              maxX: canvasRight - halfWidth,
              minY: canvasBottom + halfHeight,
              maxY: canvasTop - halfHeight
            };
          } // 如果节点比屏幕大：限制节点必须覆盖整个屏幕（不能露出黑边）


          return {
            minX: canvasRight - halfWidth,
            // 中心不能太靠左，否则右边露出
            maxX: canvasLeft + halfWidth,
            // 中心不能太靠右，否则左边露出
            minY: canvasTop - halfHeight,
            // 中心不能太靠下，否则上边露出
            maxY: canvasBottom + halfHeight // 中心不能太靠上，否则下边露出

          };
        }
        /**
        
         * 计算两个触摸点之间的距离
        
         */


        _getTouchDistance(touch1, touch2) {
          var dx = touch2.x - touch1.x;
          var dy = touch2.y - touch1.y;
          return Math.sqrt(dx * dx + dy * dy);
        }
        /**
        
         * 设置是否启用拖动
        
         */


        setEnableDrag(enable) {
          this.enableDrag = enable;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enableDrag", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "limitInScreen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enableScale", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "minScale", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxScale", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpeed", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "parentNode", [_dec8], {
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
//# sourceMappingURL=9fdaeee26b2da7eb26a546e56522b30bfa66ee25.js.map