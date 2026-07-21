System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Graphics, Label, Node, Sprite, SpriteFrame, UITransform, Vec2, LevelStatus, app, adManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, spLevelItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfLevelStatus(extras) {
    _reporterNs.report("LevelStatus", "../PageSpLevel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadManager(extras) {
    _reporterNs.report("adManager", "db://assets/app/tiktok.ads", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPageMain(extras) {
    _reporterNs.report("PageMain", "../../../main/native/PageMain", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      LevelStatus = _unresolved_2.LevelStatus;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      adManager = _unresolved_4.adManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2cfe7FkjoNMNps10gL1mRNZ", "spLevelItem", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Graphics', 'Label', 'Node', 'Sprite', 'SpriteFrame', 'UITransform', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("spLevelItem", spLevelItem = (_dec = ccclass('spLevelItem'), _dec2 = property({
        type: SpriteFrame
      }), _dec3 = property({
        type: SpriteFrame
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Label
      }), _dec(_class = (_class2 = class spLevelItem extends Component {
        constructor(...args) {
          super(...args);

          //三种状态的spriteFrame
          _initializerDefineProperty(this, "unlockSpriteFrame", _descriptor, this);

          _initializerDefineProperty(this, "completeSpriteFrame", _descriptor2, this);

          _initializerDefineProperty(this, "challengeSpriteFrame", _descriptor3, this);

          _initializerDefineProperty(this, "graphicsNode", _descriptor4, this);

          _initializerDefineProperty(this, "levelName", _descriptor5, this);

          this._index = 0;
          this._levelName = "";
          this._status = 0;
          this._levelConfig = null;
          this.gridWidth = 30;
          this.gridHeight = 50;
          this.cellPixelSize = 0;
          this.ropeThickness = 4;
          this.arrowSize = 6;
          this.arrowLineWidth = 1;
          this.isColorful = false;
          this.strokeColor = '#114113';
          this.colors = ["#1ba784", "#ed5126", "#2A52BE", "#96c24e", "#f9595c", "#fc8c23", "#4A7856", "#C77DFF", "#577590", "#F9C74F", "#43AA8B", "#E63946", "#4CC9F0", "#194B96", "#FFD166", "#7209B7", "#F72585"];
        }

        start() {
          this.node.on(Node.EventType.TOUCH_END, this.onLevelItemClick, this);
        } //设置关卡信息


        setLevelInfo(index, name, status, levelConfig) {
          this._index = index;
          this._levelName = name;
          this._status = status;
          this._levelConfig = levelConfig; //设置关卡名字

          this.levelName.string = this._levelName;
          this.updateLevelStatus(status);
          this.drawArrow();
        }

        onLevelItemClick() {
          //根据状态，来做不同的变化
          if (this._status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Unlock) {
            // 未解锁状态，点击后跳转挑战界面
            // TODO 看激励视频
            (_crd && adManager === void 0 ? (_reportPossibleCrUseOfadManager({
              error: Error()
            }), adManager) : adManager).showRewardedVideoAd({
              onClose: success => {
                if (success) {
                  // 激励视频播放成功，更新关卡状态为已完成
                  this.updateLevelStatus((_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
                    error: Error()
                  }), LevelStatus) : LevelStatus).Challenge); //通知PageSpLevel更新解锁状态

                  (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                    error: Error()
                  }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                    error: Error()
                  }), app) : app).config.eventname.UpdateSPLevelStatus, this._index, this._status);
                } else {
                  // 激励视频播放失败，提示用户重新播放
                  (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                    error: Error()
                  }), app) : app).manager.ui.showToast("激励视频播放失败，请重新播放");
                }
              },
              onError: () => {
                // 激励视频播放失败，提示用户重新播放
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.ui.showToast("激励视频播放失败，请重新播放");
              }
            });
          } else if (this._status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Complete || this._status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Challenge) {
            // 已完成状态，点击后跳转挑战界面
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setIsSpecialLevel(true);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setSpecialConfig(this._levelConfig);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setSpecialLevelIndex(this._index);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: 'PageMain',
              data: {
                isSpecialLevel: true,
                name: this._levelName
              }
            });
          }
        }

        updateLevelStatus(status) {
          this._status = status; //根据状态，来做不同的变化

          if (status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Unlock) {
            // 未解锁状态，点击后跳转挑战界面
            // TODO 看激励视频
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.unlockSpriteFrame;
          } else if (status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Complete) {
            // 已完成状态，点击后跳转挑战界面
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.completeSpriteFrame;
            this.node.getChildByName("ad").active = false;
          } else if (status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Challenge) {
            // 待挑战状态，点击后跳转挑战界面
            this.node.getChildByName("ad").active = false;
            this.node.getChildByName("status").getComponent(Sprite).spriteFrame = this.challengeSpriteFrame;
          }
        } //根据状态，来画不同的箭头


        drawArrow() {
          if (this._status == (_crd && LevelStatus === void 0 ? (_reportPossibleCrUseOfLevelStatus({
            error: Error()
          }), LevelStatus) : LevelStatus).Complete) {
            this.isColorful = true;
          }

          this.gridWidth = this._levelConfig.grid_width;
          this.gridHeight = this._levelConfig.grid_height;
          this.adjustCellSize();
          this.drawAllRopes();
        }

        adjustCellSize() {
          const screenSize = this.graphicsNode.getComponent(UITransform).contentSize; // 计算最大可容纳的格子尺寸（不超出屏幕）

          const maxCellWidth = screenSize.width / this.gridWidth;
          const maxCellHeight = screenSize.height / this.gridHeight;
          this.cellPixelSize = Math.min(maxCellWidth, maxCellHeight) * 0.9; // 留10%边距
          //画点  TODO
        }

        drawAllRopes() {
          const graphics = this.graphicsNode.getComponent(Graphics); // 清空

          graphics.clear();

          if (!this.isColorful) {
            //从default中根据_index循环来取，防止索引越界
            this.strokeColor = this.colors[this._index % this.colors.length];
          }

          for (let i = 0; i < this._levelConfig.ropes.length; i++) {
            const ropeConfig = this._levelConfig.ropes[i]; //异步执行

            setTimeout(() => {
              this.drawSingleRope(ropeConfig, graphics);
            }, 0);
          }
        } // 绘制单条绳子（连续线段+起点标记）


        drawSingleRope(ropeConfig, graphics) {
          //判断是不是彩色
          if (this.isColorful) {
            //从default中随机取一个
            this.strokeColor = this.colors[Math.floor(Math.random() * this.colors.length)];
          } // 转换路径节点为世界坐标


          const worldPoints = [];
          ropeConfig.forEach(([gridX, gridY]) => {
            const worldPos = this.gridToWorldPos(gridX, gridY);
            worldPoints.push(worldPos);
          }); // 绘制绳子路径和起点箭头（使用同一个Graphics组件）

          this.drawRopePath(graphics, worldPoints, ropeConfig, this.strokeColor);
        } // 用 Graphics 绘制绳子路径和起点箭头（连续线段+圆角端点+箭头）


        drawRopePath(graphics, points, ropeConfig, strokeColor) {
          // 设置箭头的绘制参数
          graphics.lineWidth = this.ropeThickness; //把string转为color

          graphics.strokeColor = new Color(strokeColor);
          graphics.fillColor = new Color(strokeColor);

          if (points.length < 2) {
            console.warn('RopeManager: 路径点数量少于2，无法绘制绳子');
            return;
          }

          graphics.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length; i++) {
            graphics.lineTo(points[i].x, points[i].y); // 移动到起点
          }

          graphics.stroke(); // 第二部分：绘制起点箭头
          // 计算箭头方向（第二个节点 → 第一个节点）

          let angle = 0; // 默认向上（0弧度）

          if (ropeConfig.length >= 2) {
            const [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1]; // 第一个节点（起点）

            const [nextGridX, nextGridY] = ropeConfig[ropeConfig.length - 2]; // 第二个节点
            // 方向向量：从第二个节点指向起点（next → start）

            const dirGridX = startGridX - nextGridX;
            const dirGridY = startGridY - nextGridY; // 转换为旋转角度（弧度），箭头朝向起点（与绳子延伸方向相反）

            if (dirGridX === 1 && dirGridY === 0) angle = -Math.PI / 2; // 右（90°）→ 箭头朝右（指向起点）
            else if (dirGridX === -1 && dirGridY === 0) angle = Math.PI / 2; // 左（-90°）→ 箭头朝左
            else if (dirGridX === 0 && dirGridY === -1) angle = 0; // 下（180°）→ 箭头朝下（修正方向）
            else if (dirGridX === 0 && dirGridY === 1) angle = Math.PI; // 上（0°）→ 箭头朝上（修正方向）
            else if (dirGridX === 1 && dirGridY === 1) angle = Math.PI / 4; // 右上（45°）→ 箭头朝右上
            else if (dirGridX === 1 && dirGridY === -1) angle = 3 * Math.PI / 4; // 右下（135°）→ 箭头朝右下
            else if (dirGridX === -1 && dirGridY === -1) angle = -3 * Math.PI / 4; // 左下（-135°）→ 箭头朝左下
            else if (dirGridX === -1 && dirGridY === 1) angle = -Math.PI / 4; // 左上（-45°）→ 箭头朝左上
          } // 临时移动原点到箭头位置


          const startX = points[points.length - 1].x;
          const startY = points[points.length - 1].y;
          graphics.lineWidth = this.arrowLineWidth; // 绘制箭头（三角形+中心线）

          graphics.moveTo(startX, startY); // 优化的正三角形三个顶点（初始方向向上）

          const height = this.arrowSize;
          const halfWidth = this.arrowSize / 2; // 计算三角形三个顶点（相对于起点）

          const top = {
            x: startX,
            y: startY + height / 2
          };
          const left = {
            x: startX - halfWidth,
            y: startY - height / 2
          };
          const right = {
            x: startX + halfWidth,
            y: startY - height / 2
          }; // 旋转顶点

          const rotatedTop = this.rotatePoint(top, startX, startY, angle);
          const rotatedLeft = this.rotatePoint(left, startX, startY, angle);
          const rotatedRight = this.rotatePoint(right, startX, startY, angle); // 绘制旋转后的三角形

          graphics.moveTo(rotatedTop.x, rotatedTop.y);
          graphics.lineTo(rotatedLeft.x, rotatedLeft.y);
          graphics.lineTo(rotatedRight.x, rotatedRight.y);
          graphics.close();

          try {
            // 填充箭头
            graphics.fill(); // 描边箭头轮廓

            graphics.stroke();
          } catch (err) {// console.log('err',err);
          }
        } // 格子坐标 -> 世界坐标（2D 版本，居中显示）


        gridToWorldPos(gridX, gridY) {
          // console.log(`RopeManager: 转换格子坐标 (${gridX}, ${gridY}) 到世界坐标`);
          // GridContainer 锚点为(0.5,0.5)，中心为原点
          const totalWidth = this.gridWidth * this.cellPixelSize;
          const totalHeight = this.gridHeight * this.cellPixelSize;
          const x = gridX * this.cellPixelSize + this.cellPixelSize / 2 - totalWidth / 2;
          const y = gridY * this.cellPixelSize + this.cellPixelSize / 2 - totalHeight / 2; //上下反过来

          const worldPos = new Vec2(x, -y); // console.log(`RopeManager: 转换结果 - 世界坐标: (${worldPos.x}, ${worldPos.y})`);

          return worldPos;
        } // 工具方法：旋转点（围绕中心点旋转指定角度）


        rotatePoint(point, centerX, centerY, angle) {
          const dx = point.x - centerX;
          const dy = point.y - centerY; // 旋转公式：x' = dx*cosθ - dy*sinθ + cx; y' = dx*sinθ + dy*cosθ + cy

          const x = dx * Math.cos(angle) - dy * Math.sin(angle) + centerX;
          const y = dx * Math.sin(angle) + dy * Math.cos(angle) + centerY;
          return {
            x,
            y
          };
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "unlockSpriteFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "completeSpriteFrame", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "challengeSpriteFrame", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "graphicsNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "levelName", [_dec6], {
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
//# sourceMappingURL=471add6419819ce43ca2b3ef940766dfe481b465.js.map