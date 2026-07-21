System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Eventname, _crd;

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

      _cclegacy._RF.push({}, "7a75bdyG+dGMpk+BUFCOoZi", "config.eventname", undefined);

      // config中不能定义任何方法, 任何变量在外部访问都是readonly
      // 如果config中的内容是服务器下发的，可以使用Object.assign覆盖config中的内容
      _export("default", Eventname = class Eventname {
        constructor() {
          // 关卡改变
          this.onLevelChanged = 'onLevelChanged';
          // 重新开始
          this.restart = 'restart';
          //道具1 使用
          this.DaoJuTipUse = 'DaoJuTipUse';
          //道具2 使用
          this.DaoJuHammerUse = 'DaoJuHammerUse';
          //道具2 使用结束
          this.DaoJuHammerUseOver = 'DaoJuHammerUseOver';
          // 体力值改变
          this.heartChange = 'heartChange';
          // 游戏中生命值改变
          this.gameHeartJian = 'gameHeartJian';
          // 游戏中生命值增加
          this.gameHeartAdd = 'gameHeartAdd';
          //恢复时间
          this.timeAdd = 'timeAdd';
          // 恢复生命值
          this.startGameDaoJiShi = 'startGameDaoJiShi';
          //DianTool  绘制辅助点点
          this.DianTool = 'DianTool';
          // 引导
          this.showGuideOne = 'showGuideOne';
          // 新手引导一移动
          this.guideOneMove = 'guideOneMove';
          // 显示引导二
          this.showGuideTwo = 'showGuideTwo';
          //引导结束
          this.guideOneEnd = 'guideOneEnd';
          // 新手引导二结束
          this.guideTwoEnd = 'guideTwoEnd';
          // 错误闪烁
          this.errorFlash = 'errorFlash';
          // 播放钢琴音效
          this.playPianoSound = 'playPianoSound';
          // 被庄机撞击
          this.beiZhuangJiShark = 'beiZhuangJiShark';
          // 颜色箭头改变
          this.colorArrowChange = 'colorArrowChange';
          // 开始创意关卡
          this.StartSpecialLevel = 'StartSpecialLevel';
          // 更新关卡状态
          this.UpdateSPLevelStatus = 'UpdateSPLevelStatus';
          // 暂停倒计时
          this.pauseCountDown = 'pauseCountDown';
          // 恢复倒计时
          this.resumeCountDown = 'resumeCountDown';
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1c9fc8e889d252e9e09cb73f7d0444119a9ed86d.js.map