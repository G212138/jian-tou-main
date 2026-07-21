System.register("chunks:///_virtual/app-model",["./config.eventname.ts","./config.localkey.ts","./store.game.ts"],(function(){return{setters:[null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/config.eventname.ts",["cc"],(function(e){var t;return{setters:[function(e){t=e.cclegacy}],execute:function(){t._RF.push({},"7a75bdyG+dGMpk+BUFCOoZi","config.eventname",void 0);e("default",(function(){this.onLevelChanged="onLevelChanged",this.restart="restart",this.DaoJuTipUse="DaoJuTipUse",this.DaoJuHammerUse="DaoJuHammerUse",this.DaoJuHammerUseOver="DaoJuHammerUseOver",this.heartChange="heartChange",this.gameHeartJian="gameHeartJian",this.gameHeartAdd="gameHeartAdd",this.timeAdd="timeAdd",this.startGameDaoJiShi="startGameDaoJiShi",this.DianTool="DianTool",this.showGuideOne="showGuideOne",this.guideOneMove="guideOneMove",this.showGuideTwo="showGuideTwo",this.guideOneEnd="guideOneEnd",this.guideTwoEnd="guideTwoEnd",this.errorFlash="errorFlash",this.playPianoSound="playPianoSound",this.beiZhuangJiShark="beiZhuangJiShark",this.colorArrowChange="colorArrowChange",this.StartSpecialLevel="StartSpecialLevel",this.UpdateSPLevelStatus="UpdateSPLevelStatus",this.pauseCountDown="pauseCountDown",this.resumeCountDown="resumeCountDown"}));t._RF.pop()}}}));

System.register("chunks:///_virtual/config.localkey.ts",["cc"],(function(e){var i;return{setters:[function(e){i=e.cclegacy}],execute:function(){i._RF.push({},"781564rgaNJFILiUBEB4Mir","config.localkey",void 0);e("default",(function(){this.LEVEL_KEY="LEVEL_KEY",this.SpecialLevelKey="SpecialLevelKey",this.TILI_KEY="TILI_KEY",this.LAST_RECOVERY_TIMESTAMP_KEY="LAST_RECOVERY_TIMESTAMP_KEY",this.NeedGuideOne="NeedGuideOne",this.NeedGuideTwo="NeedGuideTwo",this.NewUser="NewUser",this.ShareMsg="箭了还箭！",this.isColorArrow="isColorArrow",this.LEVEL_STATUS_KEY="LEVEL_STATUS_KEY"}));i._RF.pop()}}}));

System.register("chunks:///_virtual/store.game.ts",["cc","./app.ts","./cc-store.ts","./index.ts"],(function(e){var t,i,s;return{setters:[function(e){t=e.cclegacy},function(e){i=e.app},null,function(e){s=e.createStore}],execute:function(){t._RF.push({},"cb64ajj/+pMrbVCIevQ8ilL","store.game",void 0);e("default",function(){function e(){return this.tili=5,this.lastRecoveryTimestamp=0,this.level=1,this.daojishi="",this.specialLevel=1,s(this)}var t=e.prototype;return t.setTiLi=function(e){this.tili=e,i.lib.storage.set(i.config.localkey.TILI_KEY,e)},t.getTiLi=function(){return this.tili},t.setLastRecoveryTimestamp=function(e){this.lastRecoveryTimestamp=e,i.lib.storage.set(i.config.localkey.LAST_RECOVERY_TIMESTAMP_KEY,e)},t.getLastRecoveryTimestamp=function(){return this.lastRecoveryTimestamp},t.setLevel=function(e){this.level=e,i.lib.storage.set(i.config.localkey.LEVEL_KEY,e)},t.getLevel=function(){return this.level},t.setDaoJiShi=function(e){this.daojishi=e},t.getDaoJiShi=function(){return this.daojishi},t.setSpecialLevel=function(e){this.specialLevel=e,i.lib.storage.set(i.config.localkey.SpecialLevelKey,e)},t.getSpecialLevel=function(){return this.specialLevel},e}());t._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/app-model', 'chunks:///_virtual/app-model'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});