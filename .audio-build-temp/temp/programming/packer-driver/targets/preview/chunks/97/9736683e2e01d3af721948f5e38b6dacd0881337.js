System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, app, createStore, Game, _crd;

  function _reportPossibleCrUseOfIStore(extras) {
    _reporterNs.report("IStore", "../../../extensions/app/assets/base/BaseModel", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "../../app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateStore(extras) {
    _reporterNs.report("createStore", "../../pkg-export/@gamex/cc-store", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }, function (_unresolved_3) {
      createStore = _unresolved_3.createStore;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cb64ajj/+pMrbVCIevQ8ilL", "store.game", undefined);

      // store中只允许在根路径下定义方法，任何变量在外部访问都是readonly
      // store类型的引入是借鉴了Web前端框架中全局状态管理的思路，意图是让数据更安全，更可控。同时框架中还提供了数据绑定的扩展包，可以通过pkg的方式安装，实现「数据->视图」的单向绑定。
      _export("default", Game = class Game {
        // 将当前实例转成Store
        constructor() {
          //体力值
          this.tili = 5;
          // 最后一次恢复体力的时间戳
          this.lastRecoveryTimestamp = 0;
          //关卡
          this.level = 1;
          this.daojishi = "";
          this.specialLevel = 1;
          return (_crd && createStore === void 0 ? (_reportPossibleCrUseOfcreateStore({
            error: Error()
          }), createStore) : createStore)(this); // return不可忽略
        }

        setTiLi(v) {
          this.tili = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.TILI_KEY, v);
        }

        getTiLi() {
          return this.tili;
        }

        setLastRecoveryTimestamp(v) {
          this.lastRecoveryTimestamp = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.LAST_RECOVERY_TIMESTAMP_KEY, v);
        }

        getLastRecoveryTimestamp() {
          return this.lastRecoveryTimestamp;
        }

        setLevel(v) {
          this.level = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.LEVEL_KEY, v);
        }

        getLevel() {
          return this.level;
        }

        setDaoJiShi(v) {
          this.daojishi = v;
        }

        getDaoJiShi() {
          return this.daojishi;
        }

        setSpecialLevel(v) {
          this.specialLevel = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.SpecialLevelKey, v);
        }

        getSpecialLevel() {
          return this.specialLevel;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9736683e2e01d3af721948f5e38b6dacd0881337.js.map