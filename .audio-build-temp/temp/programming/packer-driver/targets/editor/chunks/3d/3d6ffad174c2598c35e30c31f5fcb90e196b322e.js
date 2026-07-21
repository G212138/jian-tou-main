System.register(["__unresolved_0", "cc", "__unresolved_1", "cc/env", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, director, Director, app, EDITOR, EDITOR_NOT_IN_PREVIEW, config_eventname, config_localkey, store_game, _crd;

  function init() {
    if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) Object.assign((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
      error: Error()
    }), app) : app).config, {
      eventname: new (_crd && config_eventname === void 0 ? (_reportPossibleCrUseOfconfig_eventname({
        error: Error()
      }), config_eventname) : config_eventname)(),
      localkey: new (_crd && config_localkey === void 0 ? (_reportPossibleCrUseOfconfig_localkey({
        error: Error()
      }), config_localkey) : config_localkey)()
    });
    if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) Object.assign((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
      error: Error()
    }), app) : app).data, {});
    if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) Object.assign((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
      error: Error()
    }), app) : app).store, {
      game: new (_crd && store_game === void 0 ? (_reportPossibleCrUseOfstore_game({
        error: Error()
      }), store_game) : store_game)()
    });
    if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) Object.assign((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
      error: Error()
    }), app) : app).Controller, {});
    if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) Object.assign((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
      error: Error()
    }), app) : app).controller, {});
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "../../app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfconfig_eventname(extras) {
    _reporterNs.report("config_eventname", "../app-model/config.eventname", _context.meta, extras);
  }

  function _reportPossibleCrUseOfconfig_localkey(extras) {
    _reporterNs.report("config_localkey", "../app-model/config.localkey", _context.meta, extras);
  }

  function _reportPossibleCrUseOfstore_game(extras) {
    _reporterNs.report("store_game", "../app-model/store.game", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobaldataManager(extras) {
    _reporterNs.report("GlobaldataManager", "../app-manager/globaldata/GlobaldataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfReportManager(extras) {
    _reporterNs.report("ReportManager", "../app-manager/report/ReportManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTiliManager(extras) {
    _reporterNs.report("TiliManager", "../app-manager/tili/TiliManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfVibrateManager(extras) {
    _reporterNs.report("VibrateManager", "../app-manager/vibrate/VibrateManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../../../extensions/app/assets/manager/event/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLoaderManager(extras) {
    _reporterNs.report("LoaderManager", "../../../extensions/app/assets/manager/loader/LoaderManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../../../extensions/app/assets/manager/sound/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTimerManager(extras) {
    _reporterNs.report("TimerManager", "../../../extensions/app/assets/manager/timer/TimerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../../../extensions/app/assets/manager/ui/UIManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      director = _cc.director;
      Director = _cc.Director;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
      EDITOR_NOT_IN_PREVIEW = _ccEnv.EDITOR_NOT_IN_PREVIEW;
    }, function (_unresolved_3) {
      config_eventname = _unresolved_3.default;
    }, function (_unresolved_4) {
      config_localkey = _unresolved_4.default;
    }, function (_unresolved_5) {
      store_game = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f187bY5C+FCHKyW84kaJgMh", "executor", undefined);
      /* eslint-disable */


      __checkObsolete__(['Component', 'director', 'Director']);

      if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) director.on(Director.EVENT_RESET, init);
      if (!EDITOR || !EDITOR_NOT_IN_PREVIEW) init();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3d6ffad174c2598c35e30c31f5fcb90e196b322e.js.map