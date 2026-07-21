System.register(["cc", "cc/env"], function (_export, _context) {
  "use strict";

  var _cclegacy, DEV, Logger, _crd;

  function empty() {}
  /**
   * 日志管理类，用于统一日志输出格式
   */


  _export("Logger", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0b581Lotn1LqYPYEsoeRs/Q", "logger", undefined);

      _export("Logger", Logger = class Logger {
        /**
         * 创建日志输出函数
         */
        static create(level, styleColor, title, titleColor = '#fff') {
          if (this.setting.filter.indexOf(level) == -1) {
            return empty;
          }

          if (DEV) {
            return window.console[level].bind(window.console, '%c %s %c %s ', `background:${styleColor}; padding: 2px; border-radius: 5px 0 0 5px; border: 1px solid ${styleColor}; color: ${titleColor}; font-weight: normal;`, `${title} ${new Date().toLocaleString()}`, `background:#ffffff ; padding: 2px; border-radius: 0 5px 5px 0; border: 1px solid ${styleColor}; color: ${styleColor}; font-weight: normal;`);
          }

          return window.console[level].bind(window.console, `${title} [${new Date().toLocaleString()}]`);
        }
        /**
         * 用于输出一般信息
         */


        get log() {
          return Logger.create('log', '#6495ed', '[LOG]', '#000');
        }
        /**
         * 用于输出警告信息
         */


        get warn() {
          return Logger.create('warn', '#ff7f50', '[WARN]', '#000');
        }
        /**
         * 用于输出错误信息
         */


        get error() {
          return Logger.create('error', '#ff4757', '[ERROR]', '#000');
        }
        /**
         * 用于输出调试信息
         */


        get debug() {
          return Logger.create('log', '#ff6347', '[DEBUG]', '#000');
        }
        /**
         * 用于输出成功信息
         */


        get success() {
          return Logger.create('log', '#00ae9d', '[SUCC]', '#000');
        }

      });

      Logger.setting = {
        filter: ['error', 'log', 'warn']
      };

      _export("default", new Logger());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b4a5749c0e6d1dfca6112371943e068b5f37f602.js.map