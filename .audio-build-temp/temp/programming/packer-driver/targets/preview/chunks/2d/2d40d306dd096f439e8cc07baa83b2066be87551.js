System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Graphics, app, _dec, _class, _crd, ccclass, property, DianTool;

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
      Component = _cc.Component;
      Graphics = _cc.Graphics;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "234aeUX5CBKOo2a4RCpIHdv", "DianTool", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Graphics', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DianTool", DianTool = (_dec = ccclass('DianTool'), _dec(_class = class DianTool extends Component {
        onLoad() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.DianTool, this.onDianTool, this);
        }

        onDianTool(gridWidth, gridHeight, ropeManager) {
          var graphics = this.getComponent(Graphics);
          graphics.clear(); // 获取当前关卡的绳子配置

          var currentLevel = ropeManager['currentLevel'];

          if (!currentLevel || !currentLevel.ropes) {
            console.warn('DianTool: 没有找到关卡配置或绳子数据');
            return;
          } // 创建一个 Set 来存储所有有绳子的格子坐标


          var ropePoints = new Set();
          currentLevel.ropes.forEach(rope => {
            rope.forEach(_ref => {
              var [gridX, gridY] = _ref;
              ropePoints.add(gridX + "," + gridY);
            });
          }); // 只绘制有绳子的点

          for (var i = 0; i < gridWidth; i++) {
            for (var j = 0; j < gridHeight; j++) {
              // 检查当前格子是否有绳子
              if (!ropePoints.has(i + "," + j)) {
                continue;
              } // 设置颜色


              graphics.fillColor.set(204, 204, 204, 255);
              graphics.strokeColor.set(204, 204, 204, 255); // 获取位置并绘制圆形

              var pos = ropeManager.gridToWorldPos(i, j);
              graphics.circle(pos.x, pos.y, 3); // 填充和描边

              graphics.fill();
              graphics.stroke();
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2d40d306dd096f439e8cc07baa83b2066be87551.js.map