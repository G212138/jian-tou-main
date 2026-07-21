System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Game, game, DEBUG, DEV, EDITOR, Core, appInited, appReady, cccInited, cccReady, App, _crd, app;

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../../extensions/app/assets/Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIApp(extras) {
    _reporterNs.report("IApp", "../app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfappInited(extras) {
    _reporterNs.report("appInited", "./handle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfappReady(extras) {
    _reporterNs.report("appReady", "./handle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcccInited(extras) {
    _reporterNs.report("cccInited", "./handle", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcccReady(extras) {
    _reporterNs.report("cccReady", "./handle", _context.meta, extras);
  }

  _export("App", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Game = _cc.Game;
      game = _cc.game;
    }, function (_ccEnv) {
      DEBUG = _ccEnv.DEBUG;
      DEV = _ccEnv.DEV;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      appInited = _unresolved_3.appInited;
      appReady = _unresolved_3.appReady;
      cccInited = _unresolved_3.cccInited;
      cccReady = _unresolved_3.cccReady;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "121dfhPYx1FV4MaGWQefe6o", "app", undefined);

      __checkObsolete__(['Game', 'game']);

      _export("App", App = class App extends (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
        error: Error()
      }), Core) : Core) {
        static get inst() {
          if (!this._inst) this._inst = new App();
          return this._inst;
        }

        constructor() {
          super();
        }

      });

      App._inst = void 0;

      _export("app", app = App.inst);

      if (DEBUG) {
        //@ts-ignore
        window['app'] = app; //@ts-ignore

        window['App'] = App;
      }

      if (!EDITOR || DEV) {
        (_crd && cccReady === void 0 ? (_reportPossibleCrUseOfcccReady({
          error: Error()
        }), cccReady) : cccReady) && (_crd && cccReady === void 0 ? (_reportPossibleCrUseOfcccReady({
          error: Error()
        }), cccReady) : cccReady)(app);
        (_crd && appReady === void 0 ? (_reportPossibleCrUseOfappReady({
          error: Error()
        }), appReady) : appReady) && (_crd && appReady === void 0 ? (_reportPossibleCrUseOfappReady({
          error: Error()
        }), appReady) : appReady)(app);
        (_crd && cccInited === void 0 ? (_reportPossibleCrUseOfcccInited({
          error: Error()
        }), cccInited) : cccInited) && game.once(Game.EVENT_ENGINE_INITED, function () {
          (_crd && cccInited === void 0 ? (_reportPossibleCrUseOfcccInited({
            error: Error()
          }), cccInited) : cccInited)(app);
        });
        (_crd && appInited === void 0 ? (_reportPossibleCrUseOfappInited({
          error: Error()
        }), appInited) : appInited) && app.once(App.EventType.EVENT_APPINIT_FINISHED, function () {
          (_crd && appInited === void 0 ? (_reportPossibleCrUseOfappInited({
            error: Error()
          }), appInited) : appInited)(app);
        });
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=eb6295d2fc7ffa87c5537db3bce37ab01e95f444.js.map