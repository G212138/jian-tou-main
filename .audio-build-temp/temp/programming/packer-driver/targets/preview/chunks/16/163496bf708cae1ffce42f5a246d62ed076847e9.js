System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Director, director, EventTarget, js, DEV, EDITOR, debug, logger, storage, task, Core, _crd, EventType, Lib, Config, Data, Store, controller, Controller, Manager, manager, eventTarget, EventMap;

  function _reportPossibleCrUseOflogger(extras) {
    _reporterNs.report("logger", "./lib/logger/logger", _context.meta, extras);
  }

  function _reportPossibleCrUseOfstorage(extras) {
    _reporterNs.report("storage", "./lib/storage/storage", _context.meta, extras);
  }

  function _reportPossibleCrUseOftask(extras) {
    _reporterNs.report("task", "./lib/task/task", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "./manager/event/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLoaderManager(extras) {
    _reporterNs.report("LoaderManager", "./manager/loader/LoaderManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./manager/sound/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTimerManager(extras) {
    _reporterNs.report("TimerManager", "./manager/timer/TimerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./manager/ui/UIManager", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Director = _cc.Director;
      director = _cc.director;
      EventTarget = _cc.EventTarget;
      js = _cc.js;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      debug = _unresolved_2;
    }, function (_unresolved_3) {
      logger = _unresolved_3.default;
    }, function (_unresolved_4) {
      storage = _unresolved_4.default;
    }, function (_unresolved_5) {
      task = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b4a49Ny+p5ESLkbKbyXAdn/", "Core", undefined);

      __checkObsolete__(['Component', 'Director', 'director', 'EventTarget', 'js']);

      EventType = /*#__PURE__*/function (EventType) {
        EventType["EVENT_APPINIT_FINISHED"] = "EVENT_APPINIT_FINISHED";
        EventType["EVENT_SYS_MANAGER_INITED"] = "EVENT_SYS_MANAGER_INITED";
        EventType["EVENT_USER_MANAGER_INITED"] = "EVENT_USER_MANAGER_INITED";
        EventType["EVENT_MANAGER_INITED"] = "EVENT_MANAGER_INITED";
        EventType["EVENT_MANAGER_FINISHED"] = "EVENT_MANAGER_FINISHED";
        return EventType;
      }(EventType || {});

      Lib = {
        task: _crd && task === void 0 ? (_reportPossibleCrUseOftask({
          error: Error()
        }), task) : task,
        storage: _crd && storage === void 0 ? (_reportPossibleCrUseOfstorage({
          error: Error()
        }), storage) : storage,
        debug,
        logger: _crd && logger === void 0 ? (_reportPossibleCrUseOflogger({
          error: Error()
        }), logger) : logger
      };
      Config = {};
      Data = {};
      Store = {};
      controller = {};
      Controller = {};
      Manager = {};
      manager = {};
      eventTarget = new EventTarget();
      EventMap = {};
      director.on(Director.EVENT_RESET, () => {
        js.clear(Config);
        js.clear(Data);
        js.clear(Store);
        js.clear(controller);
        js.clear(Controller);
        js.clear(Manager);
        js.clear(manager);
        EventMap = {};
      });

      _export("default", Core = class Core {
        static get inst() {
          if (!this._inst) this._inst = new Core();
          return this._inst;
        }

        constructor() {
          this.lib = Lib;
          this.config = null;
          this.data = null;
          this.store = null;
          this.Controller = null;
          this.controller = null;
          this.Manager = null;
          this.manager = null;
          this.config = Config;
          this.data = Data;
          this.store = Store;
          this.Controller = Controller;
          this.controller = controller;
          this.Manager = Manager;
          this.manager = manager;

          if (!EDITOR || DEV) {
            if (this.constructor !== Core && !js.getClassById('App')) {
              js.setClassAlias(this.constructor, 'App');
            }
          }
        }

        on(event, callback, target) {
          if (EventMap[event]) callback.call(target);
          eventTarget.on(event, callback, target);
        }

        once(event, callback, target) {
          if (EventMap[event]) {
            callback.call(target);
          } else {
            eventTarget.once(event, callback, target);
          }
        }

        off(event, callback, target) {
          eventTarget.off(event, callback, target);
        }

        targetOff(target) {
          eventTarget.targetOff(target);
        }
        /**
         * 请不要手动调用
         */


        static emit(event) {
          EventMap[event] = true;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          eventTarget.emit(event, ...args);
        }

      });

      Core.EventType = EventType;
      Core._inst = void 0;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=163496bf708cae1ffce42f5a246d62ed076847e9.js.map