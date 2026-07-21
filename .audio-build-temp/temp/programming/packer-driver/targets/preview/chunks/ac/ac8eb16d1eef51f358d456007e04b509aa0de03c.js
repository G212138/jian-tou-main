System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Graphics, Vec2, Color, Layers, UITransform, v3, tween, CCFloat, app, RopeRun, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, RopeManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRopeRun(extras) {
    _reporterNs.report("RopeRun", "./RopeRun", _context.meta, extras);
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
      Graphics = _cc.Graphics;
      Vec2 = _cc.Vec2;
      Color = _cc.Color;
      Layers = _cc.Layers;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
      tween = _cc.tween;
      CCFloat = _cc.CCFloat;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }, function (_unresolved_3) {
      RopeRun = _unresolved_3.RopeRun;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d0395NO7QhEC4DokiMoix85", "RopeManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Graphics', 'Vec2', 'Color', 'Label', 'Sprite', 'Layers', 'UITransform', 'JsonAsset', 'EventTouch', 'Input', 'instantiate', 'Prefab', 'v3', 'TextAsset', 'tween', 'CCFloat', 'CCString']);

      ({
        ccclass,
        property
      } = _decorator); // 关卡配置接口

      _export("RopeManager", RopeManager = (_dec = ccclass('RopeManager'), _dec2 = property({
        type: Node,
        tooltip: "格子容器（用于定位绳子坐标）"
      }), _dec3 = property({
        type: CCFloat,
        tooltip: "每个格子的像素尺寸"
      }), _dec4 = property({
        type: CCFloat,
        tooltip: "绳子粗细（像素）"
      }), _dec5 = property({
        type: CCFloat,
        tooltip: "绳子端点圆角半径"
      }), _dec6 = property({
        type: CCFloat,
        tooltip: "箭头三角形边长（像素）"
      }), _dec7 = property({
        type: CCFloat,
        tooltip: "箭头线宽度（像素）"
      }), _dec8 = property({
        tooltip: "箭头颜色（默认白色，与黑色绳子区分）"
      }), _dec(_class = (_class2 = class RopeManager extends Component {
        constructor() {
          super(...arguments);
          this.defaultColorList = ["#1ba784", "#ed5126", "#2A52BE", "#96c24e", "#f9595c", "#fc8c23", "#4A7856", "#C77DFF", "#577590", "#F9C74F", "#43AA8B", "#E63946", "#4CC9F0", "#194B96", "#FFD166", "#7209B7", "#F72585"];

          _initializerDefineProperty(this, "gridContainer", _descriptor, this);

          _initializerDefineProperty(this, "cellPixelSize", _descriptor2, this);

          // 可根据屏幕大小调整
          _initializerDefineProperty(this, "ropeThickness", _descriptor3, this);

          // @property({ type: Prefab, tooltip: "格子预制体（用于绘制绳子路径）" })
          // ceilPrefab: Prefab = null;
          _initializerDefineProperty(this, "ropeCornerRadius", _descriptor4, this);

          // 圆角效果，0 为直角
          // 新增：箭头样式配置（可在编辑器中调整）
          _initializerDefineProperty(this, "arrowSize", _descriptor5, this);

          _initializerDefineProperty(this, "arrowLineWidth", _descriptor6, this);

          _initializerDefineProperty(this, "strokeColor", _descriptor7, this);

          this.currentLevel = null;
          this.gridWidth = 30;
          this.gridHeight = 50;
          // 新增：存储绳子节点和配置的映射关系
          // public ropeNodesMap: Map<Node, number> = new Map<Node, number>();
          this.GuidePosList = [[5, 9], [7, 9], [8, 9], [8, 10], [8, 11]];
          this.sheqiTouch = false;
          this.moveDistance = 0;
        }

        onLoad() {
          //监听restart事件 和 下一关事件
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this.start, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.DaoJuTipUse, this.onDaoJuTipUse, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        start() {
          console.log('RopeManager: 开始初始化组件'); // 1. 加载配置文件

          this.loadLevelConfig();
        }

        onDestroy() {
          // 移除节点事件监听
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        }

        onTouchStart(event) {
          this.sheqiTouch = false;
          this.moveDistance = 0;
        }

        onTouchMove(event) {
          this.moveDistance += Math.abs(event.getDelta().x) + Math.abs(event.getDelta().y); //忽略触摸事件,如果移动距离大于10像素

          if (this.moveDistance > 10) {
            this.sheqiTouch = true;
          }
        }

        onTouchEnd(event) {
          if (this.sheqiTouch) {
            return;
          }

          this.moveDistance = 0; //找到end的点在哪个格子里

          var pos = event.getUILocation(); //  console.log(`RopeManager: 触摸位置 - 屏幕坐标: (${pos.x}, ${pos.y})`);
          //转为节点坐标

          var worldPos = this.getComponent(UITransform).convertToNodeSpaceAR(v3(pos.x, pos.y, 1)); // console.log(`RopeManager: 转换结果 - 世界坐标: (${worldPos.x}, ${worldPos.y})`);

          var gridPos = this.worldToGridPos(worldPos.x, worldPos.y); // console.log(`RopeManager: 转换结果 - 格子坐标: (${gridPos.x}, ${gridPos.y})`);

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit('ROPE_RUN', gridPos);
        } // 动态调整格子尺寸，适配屏幕


        adjustCellSize() {
          var screenSize = this.getComponent(UITransform).contentSize;
          console.log("RopeManager: \u5F53\u524D\u5C4F\u5E55\u5C3A\u5BF8 - \u5BBD: " + screenSize.width + ", \u9AD8: " + screenSize.height); // 计算最大可容纳的格子尺寸（不超出屏幕）

          var maxCellWidth = screenSize.width / this.gridWidth;
          var maxCellHeight = screenSize.height / this.gridHeight;
          this.cellPixelSize = Math.min(maxCellWidth, maxCellHeight) * 0.9; // 留10%边距

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.DianTool, this.gridWidth, this.gridHeight, this);
          this.ropeThickness = Math.min(Math.max(this.cellPixelSize * 0.4, 4), 14);
          this.arrowSize = this.ropeThickness * 2;
          console.log("RopeManager: \u8C03\u6574\u540E\u7684\u683C\u5B50\u5C3A\u5BF8\u4E3A " + this.cellPixelSize + "px");
          console.log("RopeManager: \u8C03\u6574\u540E\u7684\u7EF3\u5B50\u7C97\u7EC6\u4E3A " + this.ropeThickness + "px");
        } // 加载关卡配置


        loadLevelConfig() {
          var _this = this;

          return _asyncToGenerator(function* () {
            var self = _this; //获取当前是第几关

            var currentLevelId = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.getLevel(); //创意关卡入侵

            if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getIsSpecialLevel()) {
              _this.currentLevel = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getSpecialConfig();
            } else {
              console.log("RopeManager: \u5F53\u524D\u662F\u7B2C " + currentLevelId + " \u5173"); // 从全局配置中获取当前关卡

              var levelConfigString = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getLevelConfig(currentLevelId);

              if (!levelConfigString) {
                console.error("RopeManager: \u672A\u627E\u5230\u5173\u5361 " + currentLevelId);
                return;
              }

              var levelConfig = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.CreateMapDataByStr(levelConfigString);

              if (!levelConfig) {
                console.error("RopeManager: \u89E3\u6790\u5173\u5361 " + currentLevelId + " \u914D\u7F6E\u5931\u8D25");
                return;
              }

              self.currentLevel = levelConfig;
            }

            self.gridWidth = self.currentLevel.grid_width;
            self.gridHeight = self.currentLevel.grid_height;
            self.adjustCellSize(); //记录一下当前关卡有多少个绳子

            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setRopeCount(self.currentLevel.ropes.length);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setEscapeRopeCount(0); //根据关卡配置文件，维护一个二维数组，用于存储每个格子是否被占用

            self.geneArray(self.currentLevel.ropes);
            self.drawAllRopes(); //如果是第一关，需要判断是否需要引导

            if (currentLevelId == 1) {
              if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getNeedGuideOne()) {
                //需要引导
                _this.showGuideOne();
              }
            } else if (currentLevelId == 2) {
              if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getNeedGuideTwo()) {
                //需要引导
                _this.showGuideTwo();
              }
            }
          })();
        } // 生成一个二维数组，用于存储每个格子是否被占用


        geneArray(ropes) {
          var array = [];

          for (var i = 0; i < this.gridHeight; i++) {
            array.push([]);

            for (var j = 0; j < this.gridWidth; j++) {
              array[i].push(false);
            }
          } // 遍历所有绳子，标记占用的格子


          ropes.forEach((rope, index) => {
            rope.forEach(_ref => {
              var [gridX, gridY] = _ref;
              array[gridY][gridX] = true;
            });
          });
          console.log("RopeManager: \u751F\u6210\u7684\u5360\u7528\u683C\u5B50\u6570\u7EC4\u4E3A", array);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.setGridArray(array);
        } // 绘制当前关卡所有绳子


        drawAllRopes() {
          var _this2 = this;

          if (!this.currentLevel) {
            console.warn('RopeManager: 当前没有选中的关卡，跳过绘制');
            return;
          } // 清空格子容器（删除之前绘制的所有绳子）


          this.gridContainer.destroyAllChildren(); // 清空映射表
          // this.ropeNodesMap.clear();

          var _loop = function _loop(i) {
            var ropeConfig = _this2.currentLevel.ropes[i]; //异步执行

            setTimeout(() => {
              _this2.drawSingleRope(ropeConfig, i);
            }, Math.random() * 1000);
          };

          for (var i = 0; i < this.currentLevel.ropes.length; i++) {
            _loop(i);
          }
        } // 绘制单条绳子（连续线段+起点标记）


        drawSingleRope(ropeConfig, index) {
          //判断是不是彩色
          var isColorful = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getIsColorArrow();

          if (isColorful) {
            //从default中随机取一个
            this.strokeColor = this.defaultColorList[Math.floor(Math.random() * this.defaultColorList.length)];
          } else {
            this.strokeColor = "#111433";
          } // 创建绳子节点


          var ropeNode = new Node("Rope_" + index);
          ropeNode.layer = Layers.Enum.UI_2D;
          ropeNode.parent = this.gridContainer;
          ropeNode.addComponent(UITransform);
          ropeNode.getComponent(UITransform).setContentSize(0, 0);
          var ropeRun = ropeNode.addComponent(_crd && RopeRun === void 0 ? (_reportPossibleCrUseOfRopeRun({
            error: Error()
          }), RopeRun) : RopeRun);
          ropeRun.ropeManager = this;
          ropeRun.setRopeConfig(ropeConfig);
          ropeRun.screenSize = new Vec2(this.getComponent(UITransform).contentSize.width, this.getComponent(UITransform).contentSize.height);
          ropeRun.ropeColor = this.strokeColor; // 添加Graphics组件

          var graphics = ropeNode.addComponent(Graphics);
          graphics.strokeColor = new Color(this.strokeColor);
          graphics.lineWidth = this.ropeThickness; // 转换路径节点为世界坐标

          var worldPoints = [];
          ropeConfig.forEach(_ref2 => {
            var [gridX, gridY] = _ref2;
            var worldPos = this.gridToWorldPos(gridX, gridY);
            worldPoints.push(worldPos);
          }); // 绘制绳子路径和起点箭头（使用同一个Graphics组件）

          this.drawRopePath(graphics, worldPoints, ropeNode, ropeConfig, index, this.strokeColor);
        } // 用 Graphics 绘制绳子路径和起点箭头（连续线段+圆角端点+箭头）


        drawRopePath(graphics, points, ropeNode, ropeConfig, index, strokeColor) {
          var self = this;

          if (points.length < 2) {
            console.warn('RopeManager: 路径点数量少于2，无法绘制绳子');
            return;
          }

          graphics.clear(); // 清空画布
          // console.log(`RopeManager: 清空画布，开始绘制路径`);

          var currentIndex = 1; // 当前绘制到的点索引
          // 第一部分：绘制绳子路径

          graphics.moveTo(points[0].x, points[0].y); // 移动到起点

          graphics.lineCap = Graphics.LineCap.ROUND; // 端点圆角

          graphics.lineJoin = Graphics.LineJoin.ROUND; // 转角圆角
          // 逐帧绘制（每帧画一个线段）

          var drawStep = () => {
            if (currentIndex >= points.length) {
              // 绘制完成，停止调度
              graphics.unschedule(drawStep); //绘制箭头

              drawArrow();
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.addAlreadyDrawRopeCount(1);
              return;
            } // 同步绘制当前线段（保证顺序）


            graphics.lineTo(points[currentIndex].x, points[currentIndex].y);
            graphics.stroke(); // 提交绘制（可选：也可最后统一stroke）

            currentIndex++;
          }; // 启动逐帧绘制（每50ms画一段，和原setTimeout间隔一致）


          graphics.schedule(drawStep, 50 / 1000); // schedule的间隔单位是秒
          // // 绘制线段：连接所有路径节点
          // for (let i = 1; i < points.length; i++) {
          //     setTimeout(() => {
          //         graphics.lineTo(points[i].x, points[i].y);
          //         // console.log(`RopeManager: 设置绳子端点样式为圆角`);
          //         graphics.strokeColor = new Color(strokeColor);
          //         try{
          //             graphics.stroke();
          //         }catch(err){
          //             // console.log('err',err);
          //         }
          //     }, 50*i);
          // }
          // 第二部分：绘制起点箭头

          var drawArrow = () => {
            // 设置箭头的绘制参数
            graphics.lineWidth = this.arrowLineWidth; //把string转为color

            graphics.strokeColor = new Color(strokeColor);
            graphics.fillColor = new Color(strokeColor); // 计算箭头方向（第二个节点 → 第一个节点）

            var angle = 0; // 默认向上（0弧度）

            if (ropeConfig.length >= 2) {
              var [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1]; // 第一个节点（起点）

              var [nextGridX, nextGridY] = ropeConfig[ropeConfig.length - 2]; // 第二个节点
              // 方向向量：从第二个节点指向起点（next → start）

              var dirGridX = startGridX - nextGridX;
              var dirGridY = startGridY - nextGridY; // 转换为旋转角度（弧度），箭头朝向起点（与绳子延伸方向相反）

              if (dirGridX === 1 && dirGridY === 0) angle = -Math.PI / 2; // 右（90°）→ 箭头朝右（指向起点）
              else if (dirGridX === -1 && dirGridY === 0) angle = Math.PI / 2; // 左（-90°）→ 箭头朝左
              else if (dirGridX === 0 && dirGridY === -1) angle = 0; // 下（180°）→ 箭头朝下（修正方向）
              else if (dirGridX === 0 && dirGridY === 1) angle = Math.PI; // 上（0°）→ 箭头朝上（修正方向）
              else if (dirGridX === 1 && dirGridY === 1) angle = Math.PI / 4; // 右上（45°）→ 箭头朝右上
              else if (dirGridX === 1 && dirGridY === -1) angle = 3 * Math.PI / 4; // 右下（135°）→ 箭头朝右下
              else if (dirGridX === -1 && dirGridY === -1) angle = -3 * Math.PI / 4; // 左下（-135°）→ 箭头朝左下
              else if (dirGridX === -1 && dirGridY === 1) angle = -Math.PI / 4; // 左上（-45°）→ 箭头朝左上
            } // 临时移动原点到箭头位置


            var startX = points[points.length - 1].x;
            var startY = points[points.length - 1].y; // 绘制箭头（三角形+中心线）

            graphics.moveTo(startX, startY); // 优化的正三角形三个顶点（初始方向向上）

            var height = this.arrowSize;
            var halfWidth = this.arrowSize / 2; // 计算三角形三个顶点（相对于起点）

            var top = {
              x: startX,
              y: startY + height / 2
            };
            var left = {
              x: startX - halfWidth,
              y: startY - height / 2
            };
            var right = {
              x: startX + halfWidth,
              y: startY - height / 2
            }; // 旋转顶点

            var rotatedTop = this.rotatePoint(top, startX, startY, angle);
            var rotatedLeft = this.rotatePoint(left, startX, startY, angle);
            var rotatedRight = this.rotatePoint(right, startX, startY, angle); // 绘制旋转后的三角形

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
          };
        } // 格子坐标 -> 世界坐标（2D 版本，居中显示）


        gridToWorldPos(gridX, gridY) {
          // console.log(`RopeManager: 转换格子坐标 (${gridX}, ${gridY}) 到世界坐标`);
          // GridContainer 锚点为(0.5,0.5)，中心为原点
          var totalWidth = this.gridWidth * this.cellPixelSize;
          var totalHeight = this.gridHeight * this.cellPixelSize;
          var x = gridX * this.cellPixelSize + this.cellPixelSize / 2 - totalWidth / 2;
          var y = gridY * this.cellPixelSize + this.cellPixelSize / 2 - totalHeight / 2; //上下反过来

          var worldPos = new Vec2(x, -y); // console.log(`RopeManager: 转换结果 - 世界坐标: (${worldPos.x}, ${worldPos.y})`);

          return worldPos;
        } // 世界坐标 -> 格子坐标（2D 版本，居中显示）


        worldToGridPos(worldX, worldY) {
          // console.log(`RopeManager: 转换世界坐标 (${worldX}, ${worldY}) 到格子坐标`);
          // GridContainer 锚点为(0.5,0.5)，中心为原点
          var totalWidth = this.gridWidth * this.cellPixelSize;
          var totalHeight = this.gridHeight * this.cellPixelSize; // 基于gridToWorldPos的逆运算，考虑格子中心偏移

          var gridX = Math.floor((worldX + totalWidth / 2) / this.cellPixelSize);
          var gridY = Math.floor((-worldY + totalHeight / 2) / this.cellPixelSize); // console.log(`RopeManager: 转换结果 - 格子坐标: (${gridX}, ${gridY})`);

          return new Vec2(gridX, gridY);
        } // 工具方法：旋转点（围绕中心点旋转指定角度）


        rotatePoint(point, centerX, centerY, angle) {
          var dx = point.x - centerX;
          var dy = point.y - centerY; // 旋转公式：x' = dx*cosθ - dy*sinθ + cx; y' = dx*sinθ + dy*cosθ + cy

          var x = dx * Math.cos(angle) - dy * Math.sin(angle) + centerX;
          var y = dx * Math.sin(angle) + dy * Math.cos(angle) + centerY;
          return {
            x,
            y
          };
        } // 绳子点击处理函数


        onRopeClick(ropeConfig, index) {
          console.log("RopeManager: \u70B9\u51FB\u7EF3\u5B50\u7D22\u5F15 " + index);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit('ROPE_RUN', index);
        } //展示一个可以出逃的绳子


        onDaoJuTipUse() {
          var _this3 = this;

          //遍历子节点
          var children = this.node.children;

          var _loop2 = function _loop2() {
            var child = children[i];
            var ropeRun = child.getComponent(_crd && RopeRun === void 0 ? (_reportPossibleCrUseOfRopeRun({
              error: Error()
            }), RopeRun) : RopeRun);

            if (ropeRun) {
              var ropeConfig = ropeRun.getRopeConfig();

              if (ropeConfig.length < 2) {
                return 0; // continue
              }

              var checkRes = _this3.checkRunable(ropeConfig);

              if (checkRes == null) {
                // 使用tween实现无限闪烁效果
                tween(ropeRun).delay(0).call(() => {
                  ropeRun.reDrawRope(ropeConfig, Color.GREEN, true);
                }).delay(0.5) // 200ms绿色
                .call(() => {
                  ropeRun.reDrawRope(ropeConfig, Color.BLACK);
                }).delay(0.5) // 200ms黑色
                .call(() => {
                  ropeRun.reDrawRope(ropeConfig, Color.GREEN, true);
                }).start();
                return {
                  v: void 0
                };
              }
            }
          },
              _ret;

          for (var i = 0; i < children.length; i++) {
            _ret = _loop2();
            if (_ret === 0) continue;
            if (_ret) return _ret.v;
          }
        } // 检查绳子是否可以成功跑出去


        checkRunable(ropeConfig) {
          var gridArray = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getGridArray();
          var [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1]; // 判断箭头方向
          // 假设路径中至少有两个节点来确定方向

          if (ropeConfig.length < 2) {
            return null;
          }

          var firstNode = ropeConfig[ropeConfig.length - 1];
          var secondNode = ropeConfig[ropeConfig.length - 2]; // 计算方向向量

          var dirX = firstNode[0] - secondNode[0];
          var dirY = firstNode[1] - secondNode[1]; // 如果方向向量为0，则不需要移动

          if (dirX === 0 && dirY === 0) {
            return null;
          } //dirX为1，说明箭头指向右
          //dirX为-1，说明箭头指向左
          //dirY为1，说明箭头指向上
          //dirY为-1，说明箭头指向下


          if (dirX === 1) {
            //判断二维数组中这个方向有没有占用的格子
            for (var i = startGridX; i < gridArray[0].length - 1; i++) {
              if (gridArray[startGridY][i + 1]) {
                return [i + 1, startGridY];
              }
            }
          } else if (dirX === -1) {
            //判断二维数组中这个方向有没有占用的格子
            for (var _i = startGridX; _i > 0; _i--) {
              if (gridArray[startGridY][_i - 1]) {
                return [_i - 1, startGridY];
              }
            }
          } else if (dirY === 1) {
            //判断二维数组中这个方向有没有占用的格子
            for (var _i2 = startGridY; _i2 < gridArray.length - 1; _i2++) {
              if (gridArray[_i2 + 1][startGridX]) {
                return [startGridX, _i2 + 1];
              }
            }
          } else if (dirY === -1) {
            //判断二维数组中这个方向有没有占用的格子
            for (var _i3 = startGridY; _i3 > 0; _i3--) {
              if (gridArray[_i3 - 1][startGridX]) {
                return [startGridX, _i3 - 1];
              }
            }
          }

          return null;
        } //展示新手引导一


        showGuideOne() {
          // 展示一个可以出逃的绳子
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.showGuideOne);
          var uiPos = this.gridToWorldPos(9, 10); // 发送新手引导一移动事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.guideOneMove, uiPos);
        } //展示新手引导二


        showGuideTwo() {
          // 展示一个可以出逃的绳子
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.showGuideTwo);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gridContainer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cellPixelSize", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ropeThickness", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ropeCornerRadius", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "arrowSize", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "arrowLineWidth", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "strokeColor", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "#111433";
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ac8eb16d1eef51f358d456007e04b509aa0de03c.js.map