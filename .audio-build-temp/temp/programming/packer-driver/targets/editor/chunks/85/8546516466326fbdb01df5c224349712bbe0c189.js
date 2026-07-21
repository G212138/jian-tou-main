System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EventTarget, _decorator, BaseManager, Event, _dec, _class2, _crd, ccclass, EventManager;

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../base/BaseManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      EventTarget = _cc.EventTarget;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4ea6NEN3hCPZiqp3hRVbvU", "EventManager", undefined);

      __checkObsolete__(['EventTarget', '_decorator']);

      ({
        ccclass
      } = _decorator);
      Event = class Event {
        constructor() {
          // 事件管理器
          this._event = new EventTarget();
        }

        static destroy(event) {
          if (!event) return;
          event._event = null;
        }

        /**
         * 事件分发
         */
        emit(event, ...data) {
          if (!this._event) {
            throw Error('当前event已销毁，无法继续调用');
          }

          this._event.emit(event, ...data);
        }
        /**
         * 事件监听
         */


        on(event, cb, target) {
          if (!this._event) {
            throw Error('当前event已销毁，无法继续调用');
          }

          this._event.on(event, cb, target);
        }
        /**
         * 事件监听
         */


        once(event, cb, target) {
          if (!this._event) {
            throw Error('当前event已销毁，无法继续调用');
          }

          this._event.once(event, cb, target);
        }
        /**
         * 事件移除监听
         */


        off(event, cb, target) {
          if (!this._event) {
            throw Error('当前event已销毁，无法继续调用');
          }

          this._event.off(event, cb, target);
        }
        /**
         * 事件移除监听
         */


        targetOff(target) {
          if (!this._event) {
            throw Error('当前event已销毁，无法继续调用');
          }

          this._event.targetOff(target);
        }

      };

      _export("default", EventManager = (_dec = ccclass('EventManager'), _dec(_class2 = class EventManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor(...args) {
          super(...args);
          this.events = new Map();
        }

        clear() {
          this.events.forEach(event => Event.destroy(event));
          return this.events.clear();
        }

        delete(key) {
          Event.destroy(this.events.get(key));
          return this.events.delete(key);
        }

        get(key) {
          if (this.events.has(key)) {
            return this.events.get(key);
          }

          const event = new Event();
          this.events.set(key, event);
          return event;
        }

      }) || _class2));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8546516466326fbdb01df5c224349712bbe0c189.js.map