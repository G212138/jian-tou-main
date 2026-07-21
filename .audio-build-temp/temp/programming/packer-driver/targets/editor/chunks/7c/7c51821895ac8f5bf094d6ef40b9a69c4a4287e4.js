System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BaseManager, _dec, _class, _crd, ccclass, property, LevelActionType, LevelResultType, ReportManager;

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../../../extensions/app/assets/base/BaseManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "408023tRdNAZYny3WKqGker", "ReportManager", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass,
        property
      } = _decorator); // 关卡类型枚举

      _export("LevelActionType", LevelActionType = /*#__PURE__*/function (LevelActionType) {
        LevelActionType[LevelActionType["MAIN_LEVEL"] = 1] = "MAIN_LEVEL";
        LevelActionType[LevelActionType["CREATIVE_LEVEL"] = 2] = "CREATIVE_LEVEL";
        return LevelActionType;
      }({})); // 关卡结果枚举


      _export("LevelResultType", LevelResultType = /*#__PURE__*/function (LevelResultType) {
        LevelResultType[LevelResultType["SUCCESS"] = 1] = "SUCCESS";
        LevelResultType[LevelResultType["FAIL"] = 2] = "FAIL";
        LevelResultType[LevelResultType["RETRY"] = 3] = "RETRY";
        LevelResultType[LevelResultType["REVIVE"] = 4] = "REVIVE";
        LevelResultType[LevelResultType["ENTER"] = 5] = "ENTER";
        LevelResultType[LevelResultType["EXIT"] = 6] = "EXIT";
        LevelResultType[LevelResultType["USE_ITEM"] = 7] = "USE_ITEM";
        LevelResultType[LevelResultType["AD_REWARD"] = 8] = "AD_REWARD";
        LevelResultType[LevelResultType["SHARE"] = 9] = "SHARE";
        return LevelResultType;
      }({}));

      _export("ReportManager", ReportManager = (_dec = ccclass('ReportManager'), _dec(_class = class ReportManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor(...args) {
          super(...args);
          this.logger = null;
          this.FIXED_EVENT_ID = '10000003';
        }

        // [无序] 加载完成时触发
        onLoad() {} // [无序] 自身初始化完成, init执行完毕后被调用


        onInited() {} // [无序] 所有manager初始化完成


        onFinished() {} // [无序] 初始化manager，在初始化完成后，调用finish方法


        init(finish) {
          this.initLogger();
          super.init(finish);
        }

        initLogger() {
          //@ts-ignore
          if (typeof wx !== 'undefined' && wx.getMiniReportManager) {
            //@ts-ignore
            this.logger = wx.getMiniReportManager({
              debug: true,
              eventList: [this.FIXED_EVENT_ID]
            });
          }
        }

        reportLevelEvent(params) {
          if (!this.logger) {
            console.warn('ReportManager: Logger not initialized');
            return;
          }

          this.logger.report({
            eventID: this.FIXED_EVENT_ID,
            levelName: params.levelID.toString(),
            levelID: params.levelID,
            levelAction: params.levelAction,
            levelResult: params.levelResult,
            levelTime: params.levelTime,
            levelProgress: params.levelProgress,
            loginCount: params.loginCount,
            externInfo: params.externInfo
          });
        }

        reportEvent(data) {
          if (!this.logger) {
            console.warn('ReportManager: Logger not initialized');
            console.log('ReportManager: reportEvent', data);
            return;
          }

          this.logger.report({
            eventID: this.FIXED_EVENT_ID,
            levelName: "不关注",
            ...data
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7c51821895ac8f5bf094d6ef40b9a69c4a4287e4.js.map