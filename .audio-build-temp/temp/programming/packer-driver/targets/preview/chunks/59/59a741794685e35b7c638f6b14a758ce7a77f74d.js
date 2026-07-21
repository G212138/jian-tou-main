System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, app, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Time;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      app = _unresolved_2.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f53adUYAsZKbLy47nzhzOjK", "Time", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Time", Time = (_dec = ccclass('Time'), _dec2 = property(Label), _dec(_class = (_class2 = class Time extends Component {
        constructor() {
          super(...arguments);
          // 倒计时总时长（10分钟 = 600秒）
          this.totalSeconds = 480;
          // 当前剩余秒数
          this.remainingSeconds = 0;

          // Label组件引用
          _initializerDefineProperty(this, "timeLabel", _descriptor, this);

          this._isCountdownRunning = false;
          //是否暂停倒计时，观看广告的时候暂停
          this.isStopCountDown = false;
        }

        onLoad() {
          // 初始化倒计时
          this.resetTimer();
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.startGameDaoJiShi, this.startCountdown, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.timeAdd, this.addTime, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this.resetTimer, this); // 监听暂停倒计时事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.pauseCountDown, this.pauseCountDown, this); // 监听恢复倒计时事件

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.resumeCountDown, this.resumeCountDown, this);
        } //暂停倒计时


        pauseCountDown() {
          this.isStopCountDown = true;
        } //恢复倒计时


        resumeCountDown() {
          this.isStopCountDown = false;
        }
        /**
         * 重置计时器
         */


        resetTimer() {
          this._isCountdownRunning = false;
          this.remainingSeconds = this.totalSeconds;
          this.updateTimeLabel();
          this.timeLabel.node.active = false;
          this.isStopCountDown = false;
        }
        /**
         * 开始倒计时
         */


        startCountdown() {
          if (this._isCountdownRunning) {
            //已经计时中
            return;
          }

          this.isStopCountDown = false;
          this._isCountdownRunning = true; // 先取消之前可能存在的倒计时

          this.unschedule(this.updateCountdown); // 立即更新一次时间显示

          this.updateTimeLabel();
          this.timeLabel.node.active = true; // 每1秒执行一次updateCountdown方法

          this.schedule(this.updateCountdown, 1);
        }
        /**
         * 停止倒计时
         */


        stopCountdown() {
          this._isCountdownRunning = false;
          this.timeLabel.node.active = false;
          this.unschedule(this.updateCountdown);
        }
        /**
         * 倒计时更新函数（每秒调用一次）
         */


        updateCountdown() {
          // 如果暂停倒计时，直接返回
          if (this.isStopCountDown) {
            return;
          } // 减少剩余时间


          this.remainingSeconds--; // 更新显示

          this.updateTimeLabel(); // 检查是否倒计时结束

          if (this.remainingSeconds <= 0) {
            this.remainingSeconds = 0;
            this.stopCountdown();
            this.onTimeUp();
          }
        }
        /**
         * 更新时间显示
         */


        updateTimeLabel() {
          if (this.timeLabel) {
            // 计算分钟和秒数
            var minutes = Math.floor(this.remainingSeconds / 60);
            var seconds = Math.floor(this.remainingSeconds % 60); // 格式化时间显示（MM:SS）- 使用兼容性更好的方法

            var formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
            var formattedSeconds = (seconds < 10 ? '0' : '') + seconds;
            var formattedTime = formattedMinutes + ':' + formattedSeconds;
            this.timeLabel.string = formattedTime;
          }
        }
        /**
         * 倒计时结束处理函数
         */


        onTimeUp() {
          this._isCountdownRunning = false;
          console.log('游戏时间到，游戏失败！');
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.playEffect({
            name: 'effect/fail'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PopResult',
            data: {
              noTime: true
            }
          });
        }
        /**
         * 组件销毁时取消所有定时器
         */


        onDestroy() {
          this.unscheduleAllCallbacks();
        }

        addTime(time) {
          this.remainingSeconds += time;
          this.updateTimeLabel();
          this.stopCountdown();
          this.startCountdown();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timeLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=59a741794685e35b7c638f6b14a758ce7a77f74d.js.map