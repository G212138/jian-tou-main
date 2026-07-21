System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BaseManager, DailyTimer, IntervalTimer, Timer, _dec, _class4, _crd, ccclass, TimerManager;

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../base/BaseManager", _context.meta, extras);
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

      _cclegacy._RF.push({}, "b5636+NNRZFEKq6dPkgK4qf", "TimerManager", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass
      } = _decorator);
      DailyTimer = class DailyTimer {
        // 获取当前时间相对于当日零点的毫秒数
        static getDayTimeMs(date) {
          return (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
        } // 静态方法解析时间为毫秒数


        static parseTimeToMs(h, m, s) {
          return (h * 3600 + m * 60 + s) * 1000 % 86400000;
        }

        constructor(time, callback, target, once) {
          if (once === void 0) {
            once = false;
          }

          this.startMs = void 0;
          // 起始时间毫秒数（相对于当日零点）
          this.endMs = void 0;
          // 结束时间毫秒数
          // 用于检查当前时间是否可触发回调
          this.checkDay = 0;
          this.callback = callback;
          this.target = target;
          this.once = once;
          // 使用解构赋值提高可读性
          var [startSegment, endSegment = startSegment] = time.split('-'); // 开始时间

          var [startH = 0, startM = 0, startS = 0] = startSegment.split(':').map(part => Math.max(0, parseInt(part, 10) || 0));
          this.startMs = DailyTimer.parseTimeToMs(startH, startM, startS); // 结束时间

          var [endH = 0, endM = 0, endS = 0] = endSegment.split(':').map(part => Math.max(0, parseInt(part, 10) || 0));
          this.endMs = DailyTimer.parseTimeToMs(endH, endM, endS); // 结束时间与开始时间不能相同

          if (this.endMs === this.startMs) {
            if (startM === 0 && startS === 0) {
              this.endMs = DailyTimer.parseTimeToMs(startH + 1, startM, startS);
            } else if (startS === 0) {
              this.endMs = DailyTimer.parseTimeToMs(startH, startM + 1, startS);
            } else {
              this.endMs = DailyTimer.parseTimeToMs(startH, startM, startS + 1);
            }
          }
        } // 获取当前时间是否在时间范围内


        isInRange(now) {
          var currentMs = DailyTimer.getDayTimeMs(now); // 处理跨天时间段（如 23:00-01:00）

          return this.startMs <= this.endMs ? currentMs >= this.startMs && currentMs < this.endMs : currentMs >= this.startMs || currentMs < this.endMs;
        }

        update(now) {
          var dateDay = now.getDay();
          if (this.checkDay === dateDay) return false;
          if (!this.isInRange(now)) return false;
          this.checkDay = dateDay;
          this.callback.call(this.target);
          return this.once;
        }

      };
      IntervalTimer = class IntervalTimer {
        constructor(interval, callback, target, once) {
          if (once === void 0) {
            once = false;
          }

          this.elapsed = 0;
          this.interval = interval;
          this.callback = callback;
          this.target = target;
          this.once = once;
        }

        update(dt) {
          this.elapsed += dt;
          var completed = false; // 处理可能多次触发的情况（当dt > interval时）

          while (this.elapsed >= this.interval) {
            this.callback.call(this.target);
            this.elapsed -= this.interval;

            if (this.once) {
              completed = true;
              break;
            }
          }

          return completed;
        }

      };
      Timer = class Timer {
        constructor() {
          this.intervalTimer = [];
          this.dailyTimers = [];
        }

        static update(timer, dt) {
          return timer.update(dt);
        }

        /**
         * 注册定时器
         * @param interval 
         * @param callback 
         * @param target 
         * @param once 
         */
        register(interval, callback, target, once) {
          var timer = new IntervalTimer(interval, callback, target, once || false);
          this.intervalTimer.push(timer);
        }
        /**
         * 取消定时器
         * @param callback 
         * @param target 
         */


        unregister(callback, target) {
          if (typeof target === 'undefined') {
            this.intervalTimer = this.intervalTimer.filter(timer => timer.callback !== callback);
          } else {
            this.intervalTimer = this.intervalTimer.filter(timer => !(timer.callback === callback && timer.target === target));
          }
        }
        /**
         * 取消所有定时器
         */


        unregisterAll() {
          this.intervalTimer = [];
        }

        /**
         * 注册每日触发器
         * @param time 24小时制,精确到秒
         * 
         * @example
         * registerDailyTrigger('16', ...) 等同于 registerDailyTrigger('16-17', ...)
         * registerDailyTrigger('8-9:00', ...) 等同于 registerDailyTrigger('8', ...)
         * registerDailyTrigger('8:00:01-24', ...)
         */
        registerDailyTrigger(time, callback, target, once) {
          var timer = new DailyTimer(time, callback, target, once || false);
          this.dailyTimers.push(timer);
        }
        /**
         * 取消每日触发器
         */


        unregisterDailyTrigger(callback, target) {
          if (typeof target === 'undefined') {
            this.dailyTimers = this.dailyTimers.filter(timer => timer.callback !== callback);
          } else {
            this.dailyTimers = this.dailyTimers.filter(timer => !(timer.callback === callback && timer.target === target));
          }
        }
        /**
         * 取消所有每日触发器
         */


        unregisterAllDailyTrigger() {
          this.dailyTimers = [];
        }
        /**
         * 清除所有定时器和触发器
         */


        clear() {
          this.intervalTimer = [];
          this.dailyTimers = [];
        }

        update(dt) {
          for (var index = 0; index < this.intervalTimer.length; index++) {
            var timer = this.intervalTimer[index];

            if (timer.update(dt)) {
              this.intervalTimer.splice(index, 1);
              index--;
            }
          }

          var date = new Date();

          for (var _index = 0; _index < this.dailyTimers.length; _index++) {
            var _timer = this.dailyTimers[_index];

            if (_timer.update(date)) {
              this.dailyTimers.splice(_index, 1);
              _index--;
            }
          }
        }

      };

      _export("default", TimerManager = (_dec = ccclass('TimerManager'), _dec(_class4 = class TimerManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor() {
          super(...arguments);
          this.timers = new Map();
        }

        /**
         * 清除所有定时器
         */
        clear() {
          this.timers.forEach(timer => {
            timer.clear();
          });
          this.timers.clear();
        }
        /**
         * 删除定时器
         * @param key 定时器key
         */


        delete(key) {
          var timer = this.timers.get(key);
          if (!timer) return;
          this.timers.delete(key);
          timer.clear();
        }
        /**
         * 获取定时器
         * @param key 定时器key
         */


        get(key) {
          if (this.timers.has(key)) {
            return this.timers.get(key);
          }

          var timer = new Timer();
          this.timers.set(key, timer);
          return timer;
        }

        update(dt) {
          this.timers.forEach(timer => {
            Timer.update(timer, dt);
          });
        }

      }) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=aa31103297b550b3ca780ecffb9c592e8a4b3f61.js.map