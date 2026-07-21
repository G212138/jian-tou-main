System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Graphics, Label, tween, Vec2, Vec3, app, _dec, _class, _crd, ccclass, property, RopeRun;

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRopeManager(extras) {
    _reporterNs.report("RopeManager", "./RopeManager", _context.meta, extras);
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
      tween = _cc.tween;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "36d013YoTVJUIvcUdhbm0VG", "RopeRun", undefined);

      __checkObsolete__(['_decorator', 'color', 'Color', 'Component', 'EventTouch', 'Graphics', 'Label', 'Node', 'tween', 'UIOpacity', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("RopeRun", RopeRun = (_dec = ccclass('RopeRun'), _dec(_class = class RopeRun extends Component {
        constructor() {
          super(...arguments);
          this.ropeColor = "#111433";
          this._currentStep = 100;
          this.ropeManager = null;
          this.screenSize = new Vec2(0, 0);
          this.runOutTool = {
            ropeArrays: []
          };
          this.isRunning = false;
          this.runSpeed = 0.01;
          this.runSpeedError = 0.03;
          //插针1个值
          this.chazhenTimes = 2;
          //记录当前绳子是否已经失败了，如果是的话，重复失败不记录
          this.isFail = false;
          // 存储当前正在执行的tween动画实例
          this.currentTween = null;
          // 定义颜色状态
          this.RED = new Color(200, 0, 0);
          // 中间颜色：红色
          this.currentColor = new Color();
        }

        start() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on('ROPE_RUN', this.onRopeRun, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.beiZhuangJiShark, this.onBeiZhuangJiShark, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.colorArrowChange, this.onChangeRopeColor, this);
        }

        onDestroy() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.off('ROPE_RUN', this.onRopeRun, this); // 停止当前正在执行的tween动画

          if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = null;
          }

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.off((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.beiZhuangJiShark, this.onBeiZhuangJiShark, this);
        }

        getRopeConfig() {
          return this.runOutTool.ropeArrays;
        }

        setRopeConfig(ropeConfig) {
          this.runOutTool.ropeArrays = ropeConfig;
        } //id: number, ropeConfig: [number, number][]


        onRopeRun(gridPos) {
          //判断坐标在不在自己绳子上
          if (!this.checkisThisRope(gridPos)) {
            return;
          }

          if (this.isRunning) {
            return;
          } //多重判断，可以去掉


          if (this.ropeManager.sheqiTouch) {
            return;
          }

          this.unscheduleAllCallbacks();

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getDaoJuHammerUse()) {
            //使用道具2，不检查是否能移动
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.DaoJuHammerUseOver);
            this.qiaoSuiRope();
            this.clearRopeCells(this.runOutTool.ropeArrays); //记录一下当前关卡已经逃逸了多少个绳子

            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.addEscapeRopeCount(1); //判断是否胜利

            if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getEscapeRopeCount() === (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getRopeCount()) {
              //延迟一会胜利
              setTimeout(() => {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.sound.playEffect({
                  name: 'effect/success'
                });
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.vibrate.playVibrate();
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.ui.show({
                  name: "PopResult",
                  data: {
                    SuccessDialog: true
                  }
                });
              }, 500);
            }

            return;
          }

          var res = this.ropeManager.checkRunable(this.runOutTool.ropeArrays);

          if (res != null) {
            //TODO 碰撞回弹 
            //不能移动，做红色修改
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.beiZhuangJiShark, res);
            this.doRunError(res);
            return;
          }

          this.clearRopeCells(this.runOutTool.ropeArrays);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.vibrate.playVibrateShort(); //播放钢琴音效

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.playPianoSound);
          this.isRunning = true; // this.runOutTool.ropeArrays = ropeConfig;

          this.schedule(this.moveRunOut.bind(this, this.runOutTool), this.runSpeed, this._currentStep); //记录一下当前关卡已经逃逸了多少个绳子

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.addEscapeRopeCount(1); //判断是否胜利

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getEscapeRopeCount() === (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getRopeCount()) {
            //延迟一会胜利
            setTimeout(() => {
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.sound.playEffect({
                name: 'effect/success'
              });
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.vibrate.playVibrate();
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.show({
                name: "PopResult",
                data: {
                  SuccessDialog: true
                }
              }); //引导结束

              if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getNeedGuideOne() && (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.getLevel() === 1) {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.globaldata.setNeedGuideOne(false);
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.guideOneEnd);
              } else if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.getNeedGuideTwo() && (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.getLevel() === 2) {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.globaldata.setNeedGuideTwo(false);
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.guideTwoEnd);
              }
            }, 500);
          } //如果存在引导


          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getNeedGuideOne()) {
            //移动新手引导一到指定位置
            // 检查是否还有引导位置
            if (this.ropeManager.GuidePosList.length === 0) {
              return;
            }

            var pos = this.ropeManager.GuidePosList.pop();
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.eventname.guideOneMove, this.ropeManager.gridToWorldPos(pos[0], pos[1]));
          }
        }

        checkisThisRope(gridPos) {
          for (var i = 0; i < this.runOutTool.ropeArrays.length; i++) {
            var rope = this.runOutTool.ropeArrays[i];

            if (rope[0] === gridPos.x && rope[1] === gridPos.y) {
              //在绳子上
              return true;
            }
          }

          return false;
        } // 出逃


        moveRunOut(ropeConfig) {
          if (this._currentStep <= 0) {
            this.node.destroy();
            return;
          } // 假设路径中至少有两个节点来确定方向


          if (ropeConfig.ropeArrays.length < 2) {
            return;
          }

          var firstNode = ropeConfig.ropeArrays[ropeConfig.ropeArrays.length - 1];
          var secondNode = ropeConfig.ropeArrays[ropeConfig.ropeArrays.length - 2]; // 计算方向向量

          var dirX = firstNode[0] - secondNode[0];
          var dirY = firstNode[1] - secondNode[1]; // console.log(`RopeManager: 计算方向向量 - X: ${dirX}, Y: ${dirY}`);
          // 如果方向向量为0，则不需要移动

          if (dirX === 0 && dirY === 0) {
            return;
          } // 查找对应的绳子节点


          var ropeNode = this.node; // 获取Graphics组件（用于动画）

          if (ropeNode) {
            var graphics = ropeNode.getComponent(Graphics);

            if (graphics) {
              // 计算新的路径节点：所有节点都按照自己的方向移动出去
              // 按照绳子方向，每个节点都向前移动一个格子大小的距离；根据插针值判断是否前进
              this.chazhenTimes--; //newPathNodes是下一步要达到的格子，如果chazhen次数走到0，才进行替换runouttool

              var newPathNodes = [];

              for (var i = 1; i < ropeConfig.ropeArrays.length; i++) {
                var node = ropeConfig.ropeArrays[i];
                newPathNodes.push(node);
              }

              newPathNodes.push([firstNode[0] + dirX, firstNode[1] + dirY]);
              var currentPathNodes = [];

              for (var j = 0; j < ropeConfig.ropeArrays.length; j++) {
                var [oldX, oldY] = ropeConfig.ropeArrays[j];
                var [newX, newY] = newPathNodes[j];

                if (j === ropeConfig.ropeArrays.length - 1) {
                  //最后一个节点，插针值需要根据chazhentimes影响
                  if (this.chazhenTimes == 1) {
                    //第一次，只能前进0.25
                    // 线性插值
                    var x1 = oldX + (newX - oldX) * 0.5;
                    var y1 = oldY + (newY - oldY) * 0.5;
                    currentPathNodes.push(this.ropeManager.gridToWorldPos(x1, y1));
                    continue;
                  }
                }

                if (j === 0) {
                  //根据插针值进行判断是否需要前进
                  if (this.chazhenTimes == 0) {
                    currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
                    continue;
                  }
                } // 线性插值


                var x2 = oldX + (newX - oldX) * 0.5;
                var y2 = oldY + (newY - oldY) * 0.5;
                currentPathNodes.push(this.ropeManager.gridToWorldPos(x2, y2));
                currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
              }

              if (this.chazhenTimes == 0) {
                //前进一格
                this.runOutTool.ropeArrays = newPathNodes; //重置为2

                this.chazhenTimes = 2;
              } // 清除画布


              graphics.clear();
              graphics.lineWidth = this.ropeManager.ropeThickness; // 绘制当前帧的绳子路径

              graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);

              for (var _i = 1; _i < currentPathNodes.length; _i++) {
                graphics.lineTo(currentPathNodes[_i].x, currentPathNodes[_i].y);
              } // 设置样式


              graphics.lineCap = Graphics.LineCap.ROUND;
              graphics.lineJoin = Graphics.LineJoin.ROUND;
              graphics.strokeColor = new Color(this.ropeColor);
              graphics.stroke(); // 绘制箭头

              this.drawArrow(graphics, ropeConfig.ropeArrays, graphics.strokeColor, false, currentPathNodes[currentPathNodes.length - 1]); //判断最后一个元素的横坐标和纵坐标是否超出size

              if (Math.abs(currentPathNodes[currentPathNodes.length - 1].x) > this.screenSize.x * 2 || Math.abs(currentPathNodes[currentPathNodes.length - 1].y) > this.screenSize.y * 2) {
                this._currentStep = 0;
              }

              this._currentStep--;
            }
          }
        } // 清除绳子占用的格子


        clearRopeCells(ropeConfig) {
          var gridArray = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getGridArray();

          for (var i = 0; i < ropeConfig.length; i++) {
            var [gridX, gridY] = ropeConfig[i];
            gridArray[gridY][gridX] = false;
          }
        } //绘制箭头


        drawArrow(graphics, ropeConfig, color, doubleDraw, WorldstartPos) {
          if (doubleDraw === void 0) {
            doubleDraw = false;
          }

          if (WorldstartPos === void 0) {
            WorldstartPos = null;
          }

          var angle = 0; // 默认向上（0弧度）

          if (ropeConfig.length >= 2) {
            var [startGridX, startGridY] = ropeConfig[ropeConfig.length - 1]; // 第一个节点（起点）

            var [nextGridX, nextGridY] = ropeConfig[ropeConfig.length - 2]; // 第二个节点
            // 方向向量：从第二个节点指向起点（next → start）

            var dirGridX = startGridX - nextGridX;
            var dirGridY = startGridY - nextGridY; // 转换为旋转角度（弧度），箭头朝向起点（与绳子延伸方向相反）

            if (dirGridX === 1 && dirGridY === 0) angle = -Math.PI / 2; // 右（90°）→ 箭头朝右（指向起点）
            else if (dirGridX === -1 && dirGridY === 0) angle = Math.PI / 2; // 左（-90°）→ 箭头朝左
            else if (dirGridX === 0 && dirGridY === -1) angle = 0; // 下（0°）→ 箭头朝下（修正方向）
            else if (dirGridX === 0 && dirGridY === 1) angle = Math.PI; // 上（180°）→ 箭头朝上（修正方向）
            else if (dirGridX === 1 && dirGridY === 1) angle = Math.PI / 4; // 右上（45°）→ 箭头朝右上
            else if (dirGridX === 1 && dirGridY === -1) angle = 3 * Math.PI / 4; // 右下（135°）→ 箭头朝右下
            else if (dirGridX === -1 && dirGridY === -1) angle = -3 * Math.PI / 4; // 左下（-135°）→ 箭头朝左下
            else if (dirGridX === -1 && dirGridY === 1) angle = -Math.PI / 4; // 左上（-45°）→ 箭头朝左上
          } // 临时移动原点到箭头位置


          if (WorldstartPos == null) {
            WorldstartPos = this.ropeManager.gridToWorldPos(ropeConfig[ropeConfig.length - 1][0], ropeConfig[ropeConfig.length - 1][1]);
          } // const startPos = this.ropeManager.gridToWorldPos(ropeConfig[ropeConfig.length - 1][0], ropeConfig[ropeConfig.length - 1][1]);


          var startPos = WorldstartPos; // 绘制箭头（三角形+中心线）

          graphics.moveTo(startPos.x, startPos.y); // 优化的正三角形三个顶点（初始方向向上）

          var height = this.ropeManager.arrowSize;
          var halfWidth = this.ropeManager.arrowSize / 2;

          if (doubleDraw) {
            height *= 1.5;
            halfWidth *= 1.5;
          } // 计算三角形三个顶点（相对于起点）


          var top = {
            x: startPos.x,
            y: startPos.y + height / 2
          };
          var left = {
            x: startPos.x - halfWidth,
            y: startPos.y - height / 2
          };
          var right = {
            x: startPos.x + halfWidth,
            y: startPos.y - height / 2
          }; // 旋转顶点

          var rotatedTop = this.ropeManager.rotatePoint(top, startPos.x, startPos.y, angle);
          var rotatedLeft = this.ropeManager.rotatePoint(left, startPos.x, startPos.y, angle);
          var rotatedRight = this.ropeManager.rotatePoint(right, startPos.x, startPos.y, angle); // 绘制旋转后的三角形

          graphics.moveTo(rotatedTop.x, rotatedTop.y);
          graphics.lineTo(rotatedLeft.x, rotatedLeft.y);
          graphics.lineTo(rotatedRight.x, rotatedRight.y);
          graphics.close(); // 设置箭头的绘制参数

          graphics.lineWidth = this.ropeManager.arrowLineWidth;
          graphics.strokeColor = color;
          graphics.fillColor = color; // 填充箭头

          graphics.fill(); // 描边箭头轮廓

          graphics.stroke(); // console.log(`RopeManager: 箭头绘制完成`);
        } // 现在是画绿色箭头有用到这个东西 


        reDrawRope(ropeConfig, color, doubleDraw) {
          if (doubleDraw === void 0) {
            doubleDraw = false;
          }

          var graphics = this.node.getComponent(Graphics);

          if (graphics) {
            var worldPoints = [];
            ropeConfig.forEach(_ref => {
              var [gridX, gridY] = _ref;
              var worldPos = this.ropeManager.gridToWorldPos(gridX, gridY);
              worldPoints.push(worldPos);
            });
            graphics.clear(); // 清除画布

            graphics.lineWidth = this.ropeManager.ropeThickness;

            if (doubleDraw) {
              graphics.lineWidth = this.ropeManager.ropeThickness * 1.5;
            } // 绘制当前帧的绳子路径


            graphics.moveTo(worldPoints[0].x, worldPoints[0].y);

            for (var i = 1; i < worldPoints.length; i++) {
              graphics.lineTo(worldPoints[i].x, worldPoints[i].y);
            } // 设置样式


            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND;
            graphics.strokeColor = color;
            graphics.fillColor = color;
            graphics.stroke(); // 绘制箭头

            this.drawArrow(graphics, ropeConfig, color, doubleDraw);
          }
        }

        qiaoSuiRope() {
          var _this = this;

          this.node.getComponent(Graphics).clear();
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.playEffect({
            name: 'effect/qiaoSui'
          }); //震动一下

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.vibrate.playVibrate(); //遍历子节点

          var _loop = function _loop() {
            var ropeArray = _this.runOutTool.ropeArrays[i];

            var worldPos = _this.ropeManager.gridToWorldPos(ropeArray[0], ropeArray[1]); //创建一个ceil节点


            var ceilNode = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.getCeilNode();
            ceilNode.setPosition(new Vec3(worldPos.x, worldPos.y, 1));

            _this.node.addChild(ceilNode);

            ceilNode.getComponent(Label).color = Color.BLACK; //50%概率

            if (Math.random() > 0.5) {
              ceilNode.getComponent(Label).string = '|';
            } else {
              ceilNode.getComponent(Label).string = '—';
            } // 生成随机水平偏移量 (-150到150之间的随机数)


            var randomXOffset = (Math.random() - 0.5) * 300; // 创建抛物线掉落效果

            tween(ceilNode) // 第一阶段：轻微向上并向一侧移动（爆炸效果的开始）
            .to(0.1, {
              position: new Vec3(ceilNode.position.x + randomXOffset * 0.3, ceilNode.position.y + 50, 0)
            }) // 第二阶段：抛物线下落，水平位移增加
            .to(0.7, {
              position: new Vec3(ceilNode.position.x + randomXOffset, -800, 0)
            }) // 完成后清空文本
            .call(() => {
              ceilNode.getComponent(Label).string = '';
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.globaldata.returnCeilNode(ceilNode);
              ceilNode.removeFromParent();

              _this.node.destroy();
            }).start();
          };

          for (var i = 0; i < this.runOutTool.ropeArrays.length; i++) {
            _loop();
          }
        }

        doRunError(target) {
          var firstDoBack = true;
          var chazhenTimes = 2;
          var graphics = this.getComponent(Graphics);
          if (!graphics) return;
          var firstNode = this.runOutTool.ropeArrays[this.runOutTool.ropeArrays.length - 1]; //判断firstNode距离target的距离

          var distance = Math.abs(firstNode[0] - target[0]) + Math.abs(firstNode[1] - target[1]);
          var tempArray = {
            ropeArrays: [...this.runOutTool.ropeArrays]
          }; //记录一下回退的步骤

          var backStep = [];
          var startPos = [];

          for (var j = 0; j < tempArray.ropeArrays.length; j++) {
            var pos = tempArray.ropeArrays[j];
            startPos.push(this.ropeManager.gridToWorldPos(pos[0], pos[1]));
          }

          backStep.push(startPos); //靠了，画箭头需要index坐标，不是世界坐标

          var backStepIndex = [];
          backStepIndex.push(tempArray.ropeArrays); //前进方向

          var doRunBlack = () => {
            chazhenTimes--;
            var firstNode = tempArray.ropeArrays[tempArray.ropeArrays.length - 1];
            var secondNode = tempArray.ropeArrays[tempArray.ropeArrays.length - 2]; // 计算方向向量

            var dirX = firstNode[0] - secondNode[0];
            var dirY = firstNode[1] - secondNode[1]; // 如果方向向量为0，则不需要移动

            if (dirX === 0 && dirY === 0) {
              return;
            }

            var newPathNodes = [];

            for (var i = 1; i < tempArray.ropeArrays.length; i++) {
              var node = tempArray.ropeArrays[i];
              newPathNodes.push(node);
            }

            newPathNodes.push([firstNode[0] + dirX, firstNode[1] + dirY]);
            var currentPathNodes = [];

            for (var _j = 0; _j < tempArray.ropeArrays.length; _j++) {
              var [oldX, oldY] = tempArray.ropeArrays[_j];
              var [newX, newY] = newPathNodes[_j];

              if (_j === tempArray.ropeArrays.length - 1) {
                //最后一个节点，插针值需要根据chazhentimes影响
                if (chazhenTimes == 1) {
                  //第一次，只能前进0.25
                  // 线性插值
                  var x1 = oldX + (newX - oldX) * 0.5;
                  var y1 = oldY + (newY - oldY) * 0.5;
                  currentPathNodes.push(this.ropeManager.gridToWorldPos(x1, y1));
                  continue;
                }
              }

              if (_j === 0) {
                //根据插针值进行判断是否需要前进
                if (chazhenTimes == 0) {
                  currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
                  continue;
                }
              } // 线性插值


              var x = oldX + (newX - oldX) * 0.5;
              var y = oldY + (newY - oldY) * 0.5;
              currentPathNodes.push(this.ropeManager.gridToWorldPos(x, y));
              currentPathNodes.push(this.ropeManager.gridToWorldPos(newX, newY));
            } //记录回退的步骤


            backStep.push(currentPathNodes);

            if (chazhenTimes == 0) {
              //前进一格
              tempArray.ropeArrays = newPathNodes; //重置为2

              chazhenTimes = 2;
            }

            graphics.clear();
            graphics.lineWidth = this.ropeManager.ropeThickness; // 绘制当前帧的绳子路径

            graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);

            for (var _i2 = 1; _i2 < currentPathNodes.length; _i2++) {
              graphics.lineTo(currentPathNodes[_i2].x, currentPathNodes[_i2].y);
            } // 设置样式


            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND; //彩色箭头侵入

            graphics.strokeColor = new Color(this.ropeColor);
            graphics.stroke(); // 绘制箭头
            // console.log('tempArray.ropeArrays',tempArray.ropeArrays);

            this.drawArrow(graphics, tempArray.ropeArrays, graphics.strokeColor, false, currentPathNodes[currentPathNodes.length - 1]);
          }; //倒退方向


          var doRunRed = () => {
            // 第一帧触发错误
            if (firstDoBack) {
              if (!this.isFail) {
                (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).config.eventname.gameHeartJian);
                this.isFail = true;
              } //触发红色闪烁


              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).config.eventname.errorFlash);
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.sound.playEffect({
                name: 'effect/error'
              }); //震动一下

              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.vibrate.playVibrateHeavy();
            }

            firstDoBack = false;

            if (backStep.length === 0) {
              return;
            }

            var currentPathNodes = backStep.pop(); // console.log('currentPathNodes',currentPathNodes);
            //回退的index坐标

            var currentPathNodesIndex = backStepIndex[0];
            graphics.clear();
            graphics.lineWidth = this.ropeManager.ropeThickness; // 绘制当前帧的绳子路径

            graphics.moveTo(currentPathNodes[0].x, currentPathNodes[0].y);

            for (var i = 1; i < currentPathNodes.length; i++) {
              graphics.lineTo(currentPathNodes[i].x, currentPathNodes[i].y);
            } // 设置样式


            graphics.lineCap = Graphics.LineCap.ROUND;
            graphics.lineJoin = Graphics.LineJoin.ROUND; //彩色箭头 默认装机之后仍显示红色

            graphics.strokeColor = Color.RED;
            graphics.stroke(); // 绘制箭头

            this.drawArrow(graphics, currentPathNodesIndex, Color.RED, false, currentPathNodes[currentPathNodes.length - 1]);
          };

          this.schedule(doRunBlack.bind(this), this.runSpeedError, distance * 2 - 1); // 计算schedule完全结束所需的时间：(repeat次数) * 间隔时间
          // 当repeat为distance-1时，总共有distance次执行，间隔次数为distance-1次

          this.schedule(doRunRed.bind(this), this.runSpeedError, distance * 2, (distance * 2 + 1) * this.runSpeedError);
        }

        onBeiZhuangJiShark(res) {
          var _this2 = this;

          if (res != null) {
            var _loop2 = function _loop2() {
              if (_this2.runOutTool.ropeArrays[i][0] == res[0] && _this2.runOutTool.ropeArrays[i][1] == res[1]) {
                //说明是我的节点
                //触发红色闪烁
                var graphics = _this2.getComponent(Graphics);

                _this2.tweenColor(graphics, new Color(_this2.ropeColor), _this2.RED, 0.5) // 黑→红（1.5秒）
                .then(() => {
                  _this2.tweenColor(graphics, _this2.RED, new Color(_this2.ropeColor), 0.5); // 红→黑（1.5秒）

                });

                return {
                  v: void 0
                };
              }
            },
                _ret;

            //先判断res是不是我的节点
            for (var i = 0; i < this.runOutTool.ropeArrays.length; i++) {
              _ret = _loop2();
              if (_ret) return _ret.v;
            }
          }
        }

        // 当前颜色缓存
        // 颜色插值过渡方法
        tweenColor(graphics, from, to, duration) {
          var self = this;
          return new Promise(resolve => {
            // 检查组件是否已被销毁
            if (!this.node || this.node.isValid === false) {
              resolve();
              return;
            } // 初始化起始颜色


            this.currentColor.set(from);
            graphics.fillColor = this.currentColor;
            graphics.fill(); // 停止之前的动画

            if (this.currentTween) {
              this.currentTween.stop();
            } // 缓动插值颜色通道


            this.currentTween = tween(this.currentColor).to(duration, {
              r: to.r,
              g: to.g,
              b: to.b
            }, {
              easing: 'smooth',
              // 平滑过渡
              onUpdate: () => {
                // 检查组件和graphics是否有效
                if (!self.node || self.node.isValid === false || !graphics || !graphics.node || !graphics.node.isValid) {
                  if (self.currentTween) {
                    self.currentTween.stop();
                    self.currentTween = null;
                  }

                  return;
                } // 实时更新颜色并重新绘制


                try {
                  graphics.fillColor = self.currentColor;
                  graphics.clear(); // 清除画布

                  if (self.runOutTool && self.runOutTool.ropeArrays) {
                    self.reDrawRope(self.runOutTool.ropeArrays, self.currentColor);
                  }

                  graphics.fill(); // 填充新颜色
                } catch (err) {
                  console.log('Color tween update error:', err);

                  if (self.currentTween) {
                    self.currentTween.stop();
                    self.currentTween = null;
                  }
                }
              },
              onComplete: () => {
                // 检查组件是否有效
                if (!self.node || self.node.isValid === false) {
                  if (self.currentTween) {
                    self.currentTween = null;
                  }

                  resolve();
                  return;
                }

                self.currentTween = null;
                resolve(); // 过渡完成，执行下一步
              }
            }).start();
          });
        }

        onChangeRopeColor() {
          //判断是不是彩色
          var isColorful = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.getIsColorArrow();

          if (isColorful) {
            //从default中随机取一个
            this.ropeColor = this.ropeManager.defaultColorList[Math.floor(Math.random() * this.ropeManager.defaultColorList.length)];
          } else {
            //全局定义一个默认值吧后面
            this.ropeColor = "#111433";
          }

          this.reDrawRope(this.runOutTool.ropeArrays, new Color(this.ropeColor));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=58023f08d491c871b67ac06fe5c1c8a405e4036e.js.map