System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, macro, BaseManager, app, _dec, _class, _crd, ccclass, property, TiliManager;

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../../../extensions/app/assets/base/BaseManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      macro = _cc.macro;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "527bbsDr1pKy4yDve3kjJH2", "TiliManager", undefined);

      __checkObsolete__(['_decorator', 'macro']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TiliManager", TiliManager = (_dec = ccclass('TiliManager'), _dec(_class = class TiliManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor(...args) {
          super(...args);
          this.maxHearts = 5;
          // 最大体力值
          this.recoveryTime = 5 * 60;
        }

        // 体力恢复时间（秒）
        // [无序] 加载完成时触发
        onLoad() {
          // 初始化生命值 - 只有在本地存储中没有生命值时才设置初始值
          const currentHearts = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.TILI_KEY);

          if (currentHearts === null || currentHearts === undefined) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setTiLi(5);
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setTiLi(currentHearts);
          } // 初始化最后一次恢复体力的时间戳 - 只有在本地存储中没有时间戳时才设置初始值


          const lastRecoveryTimestamp = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.LAST_RECOVERY_TIMESTAMP_KEY);

          if (lastRecoveryTimestamp === null || lastRecoveryTimestamp === undefined) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setLastRecoveryTimestamp(0);
          } else {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setLastRecoveryTimestamp(lastRecoveryTimestamp);
          }
        } // [无序] 自身初始化完成, init执行完毕后被调用


        onInited() {
          // 初始化时从存储中读取体力数据
          this.schedule(this.JianTingHeart, 1, macro.REPEAT_FOREVER);
        } // [无序] 所有manager初始化完成


        onFinished() {} // [无序] 初始化manager，在初始化完成后，调用finish方法


        init(finish) {
          super.init(finish);
        }

        JianTingHeart() {
          let heart = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.TILI_KEY);

          if (heart >= this.maxHearts) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setLastRecoveryTimestamp(0);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setDaoJiShi("");
            return;
          } //查看是否有本地的恢复时间


          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.getLastRecoveryTimestamp() == 0) {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setLastRecoveryTimestamp(Date.now());
          } else {
            //说明本地有恢复时间记录。计算现在距离恢复时间的时间差
            let timeDiff = (Date.now() - (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.getLastRecoveryTimestamp()) / 1000; //timeDiff 够几个 recoveryTime 就恢复多少体力

            let recoverCount = Math.floor(timeDiff / this.recoveryTime); // 恢复 recoverCount 点体力

            if (recoverCount < 0) {
              recoverCount = 0;
            }

            heart += recoverCount; // 计算当前时间距离下一次恢复的时间差

            let timeDiffNext = timeDiff % this.recoveryTime;
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setLastRecoveryTimestamp(Date.now() - timeDiffNext * 1000); //保留整数

            timeDiffNext = this.recoveryTime - Math.floor(timeDiffNext); // 确保体力不超过最大体力值

            heart = Math.min(heart, this.maxHearts);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setTiLi(heart); // 体力满了，就不继续恢复了

            if (heart >= this.maxHearts) {
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.setLastRecoveryTimestamp(0);
            }

            let daoJiShi = this.parseTime(timeDiffNext);
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.setDaoJiShi(daoJiShi);
          }
        }

        parseTime(daoJiShi) {
          let str = "";

          if (daoJiShi > -1) {
            // 格式化倒计时显示
            const minutes = Math.floor(daoJiShi / 60);
            const seconds = daoJiShi % 60; // 使用替代方法实现补零，避免padStart兼容性问题

            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
            str = `${formattedMinutes}:${formattedSeconds}`;
          }

          return str;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0f50b5e9196f8565e54604ade11fececc4ea1a29.js.map