System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Localkey, _crd;

  function _reportPossibleCrUseOfIModel(extras) {
    _reporterNs.report("IModel", "../../../extensions/app/assets/base/BaseModel", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "781564rgaNJFILiUBEB4Mir", "config.localkey", undefined);

      // config中不能定义任何方法, 任何变量在外部访问都是readonly
      // 如果config中的内容是服务器下发的，可以使用Object.assign覆盖config中的内容
      _export("default", Localkey = class Localkey {
        constructor() {
          //关卡
          this.LEVEL_KEY = 'LEVEL_KEY';
          this.SpecialLevelKey = 'SpecialLevelKey';
          this.TILI_KEY = 'TILI_KEY';
          // 最后一次恢复体力的时间戳
          this.LAST_RECOVERY_TIMESTAMP_KEY = 'LAST_RECOVERY_TIMESTAMP_KEY';
          //是否需要新手引导
          this.NeedGuideOne = 'NeedGuideOne';
          this.NeedGuideTwo = 'NeedGuideTwo';
          // 是否是新用户
          this.NewUser = 'NewUser';
          this.ShareMsg = "箭了还箭！";
          // 颜色箭头改变
          this.isColorArrow = 'isColorArrow';
          // 创意关卡状态
          this.LEVEL_STATUS_KEY = 'LEVEL_STATUS_KEY';
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2b44402019db6c0bea4a335ce3128edba8404365.js.map