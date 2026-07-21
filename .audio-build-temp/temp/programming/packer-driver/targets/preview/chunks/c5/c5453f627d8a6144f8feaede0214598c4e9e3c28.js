System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Director, director, Node, _dec, _class, _crd, ccclass, UIMgrZOrder;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Director = _cc.Director;
      director = _cc.director;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ad5cbUQY55AwqzdOZrQBim5", "UIMgrZOrder", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Director', 'director', 'Node']);

      ({
        ccclass
      } = _decorator);

      _export("default", UIMgrZOrder = (_dec = ccclass('UIMgrZOrder'), _dec(_class = class UIMgrZOrder extends Component {
        constructor() {
          super(...arguments);
          this.zOrder = false;
          this.tempArr = [];
        }

        onLoad() {
          this.checkUpdateZOrder();
          this.node.on(Node.EventType.CHILD_ADDED, this.onChildAdded, this);
          this.node.on(Node.EventType.CHILD_REMOVED, this.onChildRemoveed, this);

          if (Node.EventType.CHILDREN_ORDER_CHANGED) {
            this.node.on(Node.EventType.CHILDREN_ORDER_CHANGED, this.checkUpdateZOrder, this);
          } else {
            this.node.on(Node.EventType.SIBLING_ORDER_CHANGED, this.checkUpdateZOrder, this);
          }
        }

        onDestroy() {
          director.off(Director.EVENT_AFTER_UPDATE, this.updateZOrder, this);
          this.node.off(Node.EventType.CHILD_ADDED, this.onChildAdded, this);
          this.node.off(Node.EventType.CHILD_REMOVED, this.onChildRemoveed, this);

          if (Node.EventType.CHILDREN_ORDER_CHANGED) {
            this.node.off(Node.EventType.CHILDREN_ORDER_CHANGED, this.checkUpdateZOrder, this);
          } else {
            this.node.off(Node.EventType.SIBLING_ORDER_CHANGED, this.checkUpdateZOrder, this);
          }
        }

        onChildAdded(child) {
          this.checkUpdateZOrder();
          child.on(Node.EventType.TRANSFORM_CHANGED, this.checkUpdateZOrder, this);
        }

        onChildRemoveed(child) {
          child.off(Node.EventType.TRANSFORM_CHANGED, this.checkUpdateZOrder, this);
        }

        checkUpdateZOrder() {
          if (this.zOrder) return;
          this.zOrder = true;
          director.once(Director.EVENT_AFTER_UPDATE, this.updateZOrder, this);
        }
        /**
         * 更新节点树排序
         */


        updateZOrder() {
          if (!this.zOrder) return;
          Array.prototype.push.apply(this.tempArr, this.node.children);
          this.tempArr.sort((a, b) => {
            return a.position.z - b.position.z || a.getSiblingIndex() - b.getSiblingIndex();
          }).forEach((child, index) => {
            child.setSiblingIndex(index);
          }); // 一定要放到最后再设置false，
          // 避免更新过程中设置siblingIndex，
          // 导致无限重复调用

          this.zOrder = false;
          this.tempArr.length = 0;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c5453f627d8a6144f8feaede0214598c4e9e3c28.js.map