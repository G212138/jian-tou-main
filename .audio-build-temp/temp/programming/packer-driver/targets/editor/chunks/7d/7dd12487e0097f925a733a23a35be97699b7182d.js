System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, CallbackInfo, CallbackList, EventEmitter, SuperBaseControl, _crd;

  function BaseControl(Event) {
    var _class5;

    return _class5 = class BaseControl extends SuperBaseControl {
      static get inst() {
        if (this._base_inst === null) {
          this._base_inst = new this();
        }

        return this._base_inst;
      }

    }, _class5.Event = Event, _class5._base_inst = null, _class5;
  }

  _export("default", BaseControl);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fb103m5F/JDta0mjXTmkbT1", "BaseControl", undefined);

      CallbackInfo = class CallbackInfo {
        constructor(callback, target = null, once = false) {
          this.callback = null;
          this.target = null;
          this.once = false;
          this.callback = callback;
          this.target = target;
          this.once = once;
        }

      };
      CallbackList = class CallbackList {
        constructor() {
          this.callbacks = [];
        }

        size() {
          return this.callbacks.length;
        }

        add(callback, target = null, once = false) {
          this.callbacks.push(new CallbackInfo(callback, target, once));
        }

        emit(args) {
          for (let index = 0; index < this.callbacks.length; index++) {
            const info = this.callbacks[index]; // 先移除

            if (info.once) {
              this.callbacks.splice(index, 1);
              --index;
            }

            if (info.callback) {
              info.callback.apply(info.target, args);
            }
          }
        }

        call(args) {
          if (this.callbacks.length === 0) return;
          const info = this.callbacks[0]; // 先移除

          if (info.once) this.callbacks.splice(0, 1);
          if (!info.callback) return;
          return info.callback.apply(info.target, args);
        }

        remove(callback, target = null) {
          for (let index = this.callbacks.length - 1; index >= 0; index--) {
            const info = this.callbacks[index];
            if (info.callback !== callback || info.target !== target) continue;
            this.callbacks.splice(index, 1);
          }
        }

        removeByCallback(callback) {
          for (let index = this.callbacks.length - 1; index >= 0; index--) {
            const info = this.callbacks[index];
            if (info.callback !== callback) continue;
            this.callbacks.splice(index, 1);
          }
        }

        removeByTarget(target) {
          for (let index = this.callbacks.length - 1; index >= 0; index--) {
            const info = this.callbacks[index];
            if (info.target !== target) continue;
            this.callbacks.splice(index, 1);
          }
        }

      };
      EventEmitter = class EventEmitter {
        constructor() {
          this.listeners = {};
        }

        on(event, cb, target) {
          if (!event.toString() || !cb) return;
          if (!this.listeners[event]) this.listeners[event] = new CallbackList();
          this.listeners[event].add(cb, target);
        }

        once(event, cb, target) {
          if (!event.toString() || !cb) return;
          if (!this.listeners[event]) this.listeners[event] = new CallbackList();
          this.listeners[event].add(cb, target, true);
        }

        off(event, cb, target) {
          if (!event.toString() || !cb) return;
          if (!this.listeners[event]) return;
          this.listeners[event].remove(cb, target);
        }

        targetOff(target) {
          if (!target) return;

          for (const key in this.listeners) {
            if (Object.prototype.hasOwnProperty.call(this.listeners, key)) {
              const element = this.listeners[key];
              element.removeByTarget(target);
            }
          }
        }

        emit(event, args) {
          if (!event.toString()) return;
          if (!this.listeners[event]) return;
          this.listeners[event].emit(args);
        }

        call(event, args) {
          if (!event.toString()) return;
          if (!this.listeners[event]) return;
          return this.listeners[event].call(args);
        }

      };
      SuperBaseControl = class SuperBaseControl {
        constructor() {
          //用于类型提示推导//
          this.e = void 0;
          ////
          this.t = void 0;
          ////
          /////////////////
          this.event = new EventEmitter();
        }

        call(key, ...args) {
          return this.event.call.call(this.event, key, args);
        }

        emit(key, ...args) {
          return this.event.emit.call(this.event, key, args);
        }

        on(...args) {
          return this.event.on.apply(this.event, args);
        }

        once(...args) {
          return this.event.once.apply(this.event, args);
        }

        off(...args) {
          return this.event.off.apply(this.event, args);
        }

        targetOff(target) {
          return this.event.targetOff.call(this.event, target);
        }

      };
      /**
       * @deprecated 废弃，请使用Controller代替Control
       */

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7dd12487e0097f925a733a23a35be97699b7182d.js.map