System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DEV, Logger, CallbackInfo, CallbackList, EventEmitter, SuperBaseController, _crd;

  function BaseController() {
    var _class5;

    return _class5 = class BaseController extends SuperBaseController {
      /**
       * 控制器单例
       * - 尽量使用app.controller，可以避免因跨Bundle引用导致的问题，也可以避免Controller之间循环引用的问题
       */
      static get inst() {
        return this._base_inst;
      }

      constructor() {
        super();
        BaseController._base_inst = this;
      }

    }, _class5.Event = new Proxy({}, {
      get: function get(target, key) {
        if (target[key]) return target[key];
        target[key] = key;
        return key;
      }
    }), _class5._base_inst = null, _class5;
  }

  function _reportPossibleCrUseOfIReadOnly(extras) {
    _reporterNs.report("IReadOnly", "../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLogger(extras) {
    _reporterNs.report("Logger", "../lib/logger/logger", _context.meta, extras);
  }

  _export("default", BaseController);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }, function (_unresolved_2) {
      Logger = _unresolved_2.Logger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7da7CB5gRIfo4MfUWP27NW", "BaseController", undefined);

      CallbackInfo = class CallbackInfo {
        constructor(callback, target, once) {
          if (target === void 0) {
            target = null;
          }

          if (once === void 0) {
            once = false;
          }

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

        add(callback, target, once) {
          if (target === void 0) {
            target = null;
          }

          if (once === void 0) {
            once = false;
          }

          this.callbacks.push(new CallbackInfo(callback, target, once));
        }

        emit(args) {
          for (var index = 0; index < this.callbacks.length; index++) {
            var info = this.callbacks[index]; // 先移除

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
          var info = this.callbacks[0]; // 先移除

          if (info.once) this.callbacks.splice(0, 1);
          if (!info.callback) return;
          return info.callback.apply(info.target, args);
        }

        remove(callback, target) {
          if (target === void 0) {
            target = null;
          }

          for (var index = this.callbacks.length - 1; index >= 0; index--) {
            var info = this.callbacks[index];
            if (info.callback !== callback || info.target !== target) continue;
            this.callbacks.splice(index, 1);
          }
        }

        removeByCallback(callback) {
          for (var index = this.callbacks.length - 1; index >= 0; index--) {
            var info = this.callbacks[index];
            if (info.callback !== callback) continue;
            this.callbacks.splice(index, 1);
          }
        }

        removeByTarget(target) {
          for (var index = this.callbacks.length - 1; index >= 0; index--) {
            var info = this.callbacks[index];
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

          for (var _key in this.listeners) {
            if (Object.prototype.hasOwnProperty.call(this.listeners, _key)) {
              var element = this.listeners[_key];
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
      SuperBaseController = class SuperBaseController {
        constructor() {
          //用于类型提示推导//
          this.t = void 0;
          ////
          /////////////////
          this.event = new EventEmitter();
        }

        /**获取第一个事件回调的返回值 */
        call(key) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return this.event.call.call(this.event, key, args);
        }
        /**发射事件 */


        emit(key) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          return this.event.emit.call(this.event, key, args);
        }

        on() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return this.event.on.apply(this.event, args);
        }

        once() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return this.event.once.apply(this.event, args);
        }

        off() {
          for (var _len5 = arguments.length, args = new Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return this.event.off.apply(this.event, args);
        }

        targetOff(target) {
          return this.event.targetOff.call(this.event, target);
        }
        /**打印日志 */


        get log() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('log', '#4682b4', DEV ? "[" + this['constructor'].name + "] LOG" : "[" + this['constructor'].name + "] [LOG]");
        }
        /**打印警告 */


        get warn() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('warn', '#ff7f50', DEV ? "[" + this['constructor'].name + "] WARN" : "[" + this['constructor'].name + "] [WARN]");
        }
        /**打印错误 */


        get error() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('error', '#ff4757', DEV ? "[" + this['constructor'].name + "] ERROR" : "[" + this['constructor'].name + "] [ERROR]");
        }

      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5e89b9d8787457810460fb8797d4836a6d50f7a3.js.map