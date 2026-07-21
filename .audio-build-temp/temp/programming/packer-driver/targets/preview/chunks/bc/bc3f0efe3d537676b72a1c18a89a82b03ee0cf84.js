System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Sync, ASync, Any, _crd, task;

  _export({
    Sync: void 0,
    ASync: void 0,
    Any: void 0
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "721e63MqrNI1qpO4br4ISY7", "task", undefined);

      /**
       * 顺序执行
       */
      _export("Sync", Sync = class Sync {
        constructor() {
          this.running = false;
          this.index = -1;
          this.list = [];
          this.finish = null;

          /**
           * 每个handle的返回值，通过next或end存储
           */
          this.results = [];
        }

        /**
         * 任务数量
         * @returns 
         */
        size() {
          return this.list.length;
        }
        /**
         * 添加一个任务
         * @param handle 
         * @returns 
         */


        add(handle) {
          this.list.push(handle);
          this.results.push(undefined);
          return this;
        }
        /**
         * 开始执行所有任务
         * @param finish 执行完毕回调
         * @returns 
         */


        start(finish) {
          if (this.running) {
            return this;
          }

          this.running = true;
          this.index = -1;
          this.finish = finish;
          this.next(this.index);
          return this;
        }
        /**
         * 停止所有任务
         * @returns 
         */


        stop() {
          if (!this.running) {
            return false;
          }

          this.running = false;

          if (this.finish) {
            this.finish(this.results, false);
          }

          return true;
        }
        /**
         * 是否正在执行
         * @returns 
         */


        isRunning() {
          return this.running;
        }
        /**
         * @deprecated
         * @returns 
         */


        isStop() {
          return !this.running;
        }

        end(data) {
          if (!this.running) {
            return false;
          }

          if (typeof data !== 'undefined') {
            this.results[this.index] = data;
          }

          this.running = false;

          if (this.finish) {
            this.finish(this.results, true);
          }

          return true;
        }

        next(index, data) {
          if (!this.running) {
            return false;
          }

          if (index !== this.index) return false;

          if (typeof data !== 'undefined') {
            this.results[this.index] = data;
          }

          if (++this.index < this.list.length) {
            this.retry(this.index);
          } else {
            this.end();
          }

          return true;
        }

        retry(index) {
          var _this = this;

          if (!this.running) {
            return false;
          }

          if (index !== this.index) return false;
          var handle = this.list[index];
          handle && handle(data => this.next(index, data), function (timeout) {
            if (timeout === void 0) {
              timeout = 0;
            }

            return new Promise(resolve => {
              if (timeout > 0) {
                setTimeout(() => {
                  resolve(_this.retry(index));
                }, timeout * 1000);
              } else {
                resolve(_this.retry(index));
              }
            });
          }, data => this.end(data));
          return true;
        }

      });
      /**
       * 同时执行
       */


      _export("ASync", ASync = class ASync {
        constructor() {
          this.running = false;
          this.count = 0;
          this.list = [];
          this.finish = null;

          /**
           * 每个handle的返回值，通过next或end存储
           */
          this.results = [];
        }

        /**
         * 任务数量
         * @returns 
         */
        size() {
          return this.list.length;
        }
        /**
         * 添加一个任务
         * @param handle 
         * @returns 
         */


        add(handle) {
          this.list.push(handle);
          this.results.push(undefined);

          if (this.running) {
            this.retry(this.list.length - 1);
          }

          return this;
        }
        /**
         * 开始执行所有任务
         * @param finish 执行完毕回调
         * @returns 
         */


        start(finish) {
          if (this.running) {
            return this;
          }

          this.running = true;
          this.count = 0;
          this.finish = finish;

          if (this.list.length) {
            for (var index = 0; index < this.list.length; index++) {
              this.retry(index);
            }
          } else {
            this.end && this.end(this.count);
          }

          return this;
        }
        /**
         * 停止所有任务
         * @returns 
         */


        stop() {
          if (!this.running) {
            return false;
          }

          this.running = false;

          if (this.finish) {
            this.finish(this.results, false);
          }

          return true;
        }
        /**
         * 是否正在执行
         * @returns 
         */


        isRunning() {
          return this.running;
        }
        /**
         * @deprecated
         * @returns 
         */


        isStop() {
          return !this.running;
        }

        end(index, data) {
          if (!this.running) {
            return false;
          }

          if (index >= 0 && index < this.results.length) {
            if (this.results[index] || this.results[index] === null) return false;
            this.results[index] = typeof data !== 'undefined' ? data : null;
          }

          this.running = false;

          if (this.finish) {
            this.finish(this.results, true);
          }

          return true;
        }

        next(index, data) {
          if (!this.running) {
            return false;
          }

          if (index >= 0 && index < this.results.length) {
            if (this.results[index] || this.results[index] === null) return false;
            this.results[index] = typeof data !== 'undefined' ? data : null;
          }

          if (++this.count === this.list.length) {
            this.end && this.end(this.count);
          }

          return true;
        }

        retry(index) {
          var _this2 = this;

          if (!this.running) {
            return false;
          }

          var handle = this.list[index];
          handle && handle(data => this.next(index, data), function (timeout) {
            if (timeout === void 0) {
              timeout = 0;
            }

            return new Promise(resolve => {
              if (timeout > 0) {
                setTimeout(() => {
                  resolve(_this2.retry(index));
                }, timeout * 1000);
              } else {
                resolve(_this2.retry(index));
              }
            });
          }, data => this.end(index, data));
          return true;
        }

      });

      _export("Any", Any = class Any {
        constructor() {
          this.task = new Sync();
        }

        /**
         * 每个handle的返回值，通过next或end存储
         */
        get results() {
          return this.task.results;
        }
        /**
         * 任务数量
         * @returns 
         */


        size() {
          return this.task.size();
        }
        /**
         * 添加一个任务
         * @param handle 
         * @returns 
         */


        add(handles) {
          if (handles instanceof Array) {
            var async = new ASync();
            handles.forEach(handle => async.add(handle));
            this.task.add(async.start.bind(async));
          } else {
            this.task.add(handles);
          }

          return this;
        }
        /**
         * 开始执行所有任务
         * @param finish 执行完毕回调
         * @returns 
         */


        start(finish) {
          this.task.start(finish);
          return this;
        }
        /**
         * 停止所有任务
         * @returns 
         */


        stop() {
          return this.task.stop();
        }
        /**
         * 是否正在执行
         * @returns 
         */


        isRunning() {
          return this.task.isRunning();
        }
        /**
         * @deprecated
         * @returns 
         */


        isStop() {
          return this.task.isStop();
        }

      });

      task = {
        /**
         * 任务顺序执行
         */
        createSync() {
          return new Sync();
        },

        /**
         * 任务同时执行
         */
        createASync() {
          return new ASync();
        },

        /**
         * 根据参数指定执行顺序
         * @example
         * createAny()
         * .add(1).add(2).add(3).add(4)
         * .add([5,6,7])
         * .add(8)
         * 执行顺序，1，2，3，4依次执行，然后同时执行5，6，7，最后执行8
         */
        createAny() {
          return new Any();
        },

        /**
         * 执行单个任务
         */
        execute(fun, retryMax, retryFinish) {
          if (retryMax === void 0) {
            retryMax = -1;
          }

          fun(function retry(timeout) {
            if (timeout === void 0) {
              timeout = 0;
            }

            if (retryMax === 0) return retryFinish && retryFinish();
            retryMax = retryMax > 0 ? retryMax - 1 : retryMax;

            if (timeout > 0) {
              setTimeout(() => task.execute(fun, retryMax, retryFinish), timeout * 1000);
            } else {
              task.execute(fun, retryMax, retryFinish);
            }
          });
        }

      };

      _export("default", task);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bc3f0efe3d537676b72a1c18a89a82b03ee0cf84.js.map