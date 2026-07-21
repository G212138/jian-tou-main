System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, DEBUG, DEV, _crd;

  function jsGetSet(obj, prop, getter, setter) {
    Object.defineProperty(obj, prop, {
      get: getter,
      set: setter,
      enumerable: false,
      configurable: false
    });
  }

  function clear(object) {
    if (!object) return;

    for (const key of Object.keys(object)) {
      delete object[key];
    }
  }
  /**
   * 将某个变量设置为不可观测(不可在浏览器中打印)
   * @param owner object | string | number | boolean | Array | Function | ...
   * @param callback 被观测时触发回调
   * @returns 
   */


  function unobservable(owner, callback) {
    if (DEV || DEBUG) return;
    if (!owner) return;

    function define() {
      function accessor() {
        if (callback) {
          callback();
        } else {
          clear(owner);
        }
      }

      try {
        jsGetSet(owner, 'unobservable', accessor.bind(null, 'de' + 'bu' + 'gg' + 'er'));
      } catch (e) {
        !0;
      }
    }

    define();
  }

  _export("unobservable", unobservable);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_ccEnv) {
      DEBUG = _ccEnv.DEBUG;
      DEV = _ccEnv.DEV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c0d5do7I/BADoW7bHVLnAjr", "debug", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f0b8ab55aad8c475dd1bf2b21a96b1bdc8b9bf47.js.map