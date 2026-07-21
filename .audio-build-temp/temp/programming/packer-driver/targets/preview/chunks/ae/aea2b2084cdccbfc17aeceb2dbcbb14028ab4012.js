System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, error, js, log, sys, Storage, _crd, chars, weekOfYear, getWeekUpdateTime, getDayUpdateTime;

  function encode(text, key) {
    key = key || chars;
    var encrypted = '';

    for (var i = 0; i < text.length; i++) {
      var charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(charCode);
    }

    return encrypted;
  }

  function decode(encryptedText, key) {
    key = key || chars;
    var decrypted = '';

    for (var i = 0; i < encryptedText.length; i++) {
      var charCode = encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode);
    }

    return decrypted;
  }

  _export("Storage", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      error = _cc.error;
      js = _cc.js;
      log = _cc.log;
      sys = _cc.sys;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "be3dafKG7VKQYlL+CdRx47y", "storage", undefined);

      __checkObsolete__(['error', 'js', 'log', 'sys']);

      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      weekOfYear = function weekOfYear(curDate) {
        /*
         date1是当前日期
         date2是当年第一天
         d是当前日期是今年第多少天
         用d + 当前年的第一天的周差距的和在除以7就是本年第几周
         */
        curDate = curDate || new Date();
        var a = curDate.getFullYear();
        var b = curDate.getMonth() + 1;
        var c = curDate.getDate();
        var date1 = new Date(a, b - 1, c),
            date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
      };

      getWeekUpdateTime = function getWeekUpdateTime() {
        var date = new Date();
        var year = date.getFullYear();
        var week = weekOfYear(date);
        return year + '' + week;
      };

      getDayUpdateTime = function getDayUpdateTime(curDate) {
        curDate = curDate || new Date();
        return curDate.toLocaleDateString();
      };

      _export("Storage", Storage = class Storage {
        constructor() {
          this._cache = {};
        }

        /**
         * 返回值为false代表调用失败
         */
        set(key, value) {
          if (typeof key === 'string' && typeof value !== 'undefined') {
            try {
              var data = JSON.stringify(value);

              if (Storage.setting.secretKey) {
                sys.localStorage.setItem(key, encode(data, Storage.setting.secretKey));
              } else {
                sys.localStorage.setItem(key, data);
              } // 设置缓存


              this._cache[key] = data;
              return true;
            } catch (err) {
              log(err);
            }
          } else {
            error('storage set error');
          }

          return false;
        }
        /**
         * 返回值为undefined代表调用失败
         */


        get(key) {
          // 先读取缓存
          if (typeof this._cache[key] !== 'undefined') {
            return JSON.parse(this._cache[key]);
          }

          var result = null;

          try {
            var data = sys.localStorage.getItem(key);

            if (data && typeof data === 'string') {
              if (Storage.setting.secretKey) data = decode(data, Storage.setting.secretKey); // 设置缓存

              this._cache[key] = data;
              result = JSON.parse(data);
            } else if (data !== '' && data !== null) {
              result = undefined;
            }
          } catch (e) {
            result = undefined;
          }

          return result;
        }
        /**
         * 返回值为false代表调用失败
         */


        add(key, value) {
          if (value === void 0) {
            value = 1;
          }

          var result = this.get(key);

          if (result !== undefined) {
            result = result || 0;
            result += value;

            if (this.set(key, result)) {
              return result;
            }
          }

          return false;
        }
        /**
         * 返回值为false代表调用失败
         */


        remove(key) {
          try {
            sys.localStorage.removeItem(key);
            delete this._cache[key];
            return true;
          } catch (err) {
            return false;
          }
        }
        /**
         * 返回值为false代表调用失败
         */


        clear() {
          try {
            sys.localStorage.clear();
            js.clear(this._cache);
            return true;
          } catch (err) {
            return false;
          }
        }
        /**
         * 设置本周数据 [返回值为false代表调用失败]
         * @param {Function} cb 当已存在本周的数据时，会根据cb的返回决定是否存储，true代表存储
         */


        setWeek(key, value, cb) {
          var updateTime = getWeekUpdateTime();

          if (cb) {
            var data = this.getWeek(key);

            if (data !== undefined) {
              if (data === null || cb(data, value)) {
                return this.set(key, {
                  data: value,
                  updateTime: updateTime
                });
              }
            }
          } else {
            return this.set(key, {
              data: value,
              updateTime: updateTime
            });
          }

          return false;
        }
        /**
         * 获取本周数据 [返回值为undefined代表调用失败]
         */


        getWeek(key) {
          var data = this.get(key);

          if (data && data.updateTime == getWeekUpdateTime()) {
            return data.data;
          }

          return data && null;
        }
        /**
         * 设置本天数据 [返回值为false代表调用失败]
         * @param {Function} cb 当已存在本天的数据时，会根据cb的返回决定是否存储，true代表存储
         */


        setDay(key, value, cb) {
          var updateTime = getDayUpdateTime();

          if (cb) {
            var data = this.getDay(key);

            if (data !== undefined) {
              if (data === null || cb(data, value)) {
                return this.set(key, {
                  data: value,
                  updateTime: updateTime
                });
              }
            }
          } else {
            return this.set(key, {
              data: value,
              updateTime: updateTime
            });
          }

          return false;
        }
        /**
         * 获取本天数据 [返回值为undefined代表调用失败]
         * @param {*} key 
         */


        getDay(key) {
          var data = this.get(key);

          if (data && data.updateTime == getDayUpdateTime()) {
            return data.data;
          }

          return data && null;
        }

      });

      Storage.setting = {
        secretKey: ''
      };

      _export("default", new Storage());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=aea2b2084cdccbfc17aeceb2dbcbb14028ab4012.js.map