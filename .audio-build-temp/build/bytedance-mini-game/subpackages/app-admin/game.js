System.register("chunks:///_virtual/app-admin",["./executor.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/executor.ts",["cc","./app.ts","./config.eventname.ts","./config.localkey.ts","./store.game.ts"],(function(){var e,t,n,c,o,s,a;return{setters:[function(c){e=c.cclegacy,t=c.director,n=c.Director},function(e){c=e.app},function(e){o=e.default},function(e){s=e.default},function(e){a=e.default}],execute:function(){function i(){Object.assign(c.config,{eventname:new o,localkey:new s}),Object.assign(c.data,{}),Object.assign(c.store,{game:new a}),Object.assign(c.Controller,{}),Object.assign(c.controller,{})}e._RF.push({},"f187bY5C+FCHKyW84kaJgMh","executor",void 0),t.on(n.EVENT_RESET,i),i(),e._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/app-admin', 'chunks:///_virtual/app-admin'); 
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