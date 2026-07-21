System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Button, Component, EventTouch, Node, Settings, _decorator, assetManager, isValid, settings, warn, EDITOR, Core, BaseManager, _dec, _class, _crd, ccclass, AdminBundleName, ModelBundleName, ControlBundleName, ControllerBundleName, ManagerBundleName, DontRewriteFuns, BaseAppInit;

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "./BaseManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Button = _cc.Button;
      Component = _cc.Component;
      EventTouch = _cc.EventTouch;
      Node = _cc.Node;
      Settings = _cc.Settings;
      _decorator = _cc._decorator;
      assetManager = _cc.assetManager;
      isValid = _cc.isValid;
      settings = _cc.settings;
      warn = _cc.warn;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      BaseManager = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2110bB6HGxDDrnZkm2wbIsw", "BaseAppInit", undefined);

      __checkObsolete__(['Button', 'Component', 'EventTouch', 'Node', 'Settings', '_decorator', 'assetManager', 'isValid', 'settings', 'warn']);

      ({
        ccclass
      } = _decorator);
      AdminBundleName = 'app-admin';
      ModelBundleName = 'app-model';
      ControlBundleName = 'app-control';
      ControllerBundleName = 'app-controller';
      ManagerBundleName = 'app-manager';
      DontRewriteFuns = ['startInit', 'nextInit'];

      _export("default", BaseAppInit = (_dec = ccclass('BaseAppInit'), _dec(_class = class BaseAppInit extends Component {
        get _base_mgr_total() {
          return Math.max(0, (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
            error: Error()
          }), BaseManager) : BaseManager).getTotalAssetNum(assetManager.getBundle(ManagerBundleName)));
        }

        get _base_user_total() {
          return Math.max(0, this.getUserAssetNum());
        }

        get _base_total() {
          return this._base_mgr_total + this._base_user_total;
        }

        get _base_completed() {
          return this._base_mgr_completed + Math.min(this._base_user_total, this._base_user_completed);
        }

        constructor() {
          super();
          this._base_mgr_completed = 0;
          this._base_user_completed = 0;
          this._base_inited = false;
          this._base_finished = false;

          if (EDITOR) {
            DontRewriteFuns.forEach(funName => {
              if (BaseAppInit.prototype[funName] !== this[funName]) {
                warn(`[AppInit] 不应该重写父类方法{${funName}}`);
              }
            });
          }
        }
        /**
         * [避免重写] 开始初始化
         */


        startInit() {
          const projectBundles = settings.querySettings(Settings.Category.ASSETS, 'projectBundles');
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createAny() // 预加载control、model、admin、manager
          .add([(next, retry) => {
            // 预加载control(废弃)
            if (projectBundles.indexOf(ControlBundleName) === -1) return next();
            assetManager.preloadAny({
              url: ControlBundleName
            }, {
              ext: 'bundle'
            }, null, err => {
              if (err) return retry(0.1);
              next();
            });
          }, (next, retry) => {
            // 预加载controller
            if (projectBundles.indexOf(ControllerBundleName) === -1) return next();
            assetManager.preloadAny({
              url: ControllerBundleName
            }, {
              ext: 'bundle'
            }, null, err => {
              if (err) return retry(0.1);
              next();
            });
          }, (next, retry) => {
            // 预加载model
            if (projectBundles.indexOf(ModelBundleName) === -1) return next();
            assetManager.preloadAny({
              url: ModelBundleName
            }, {
              ext: 'bundle'
            }, null, err => {
              if (err) return retry(0.1);
              next();
            });
          }, (next, retry) => {
            // 预加载admin
            if (projectBundles.indexOf(AdminBundleName) === -1) return next();
            assetManager.preloadAny({
              url: AdminBundleName
            }, {
              ext: 'bundle'
            }, null, err => {
              if (err) return retry(0.1);
              next();
            });
          }, (next, retry) => {
            // 预加载manage
            if (projectBundles.indexOf(ManagerBundleName) === -1) return next();
            assetManager.preloadAny({
              url: ManagerBundleName
            }, {
              ext: 'bundle'
            }, null, err => {
              if (err) return retry(0.1);
              next();
            });
          }]) // 加载control(废弃)
          .add((next, retry) => {
            if (projectBundles.indexOf(ControlBundleName) === -1) return next();
            assetManager.loadBundle(ControlBundleName, err => {
              if (err) return retry(0.1);
              next();
            });
          }) // 加载controller
          .add((next, retry) => {
            if (projectBundles.indexOf(ControllerBundleName) === -1) return next();
            assetManager.loadBundle(ControllerBundleName, err => {
              if (err) return retry(0.1);
              next();
            });
          }) // 加载model
          .add((next, retry) => {
            if (projectBundles.indexOf(ModelBundleName) === -1) return next();
            assetManager.loadBundle(ModelBundleName, err => {
              if (err) return retry(0.1);
              next();
            });
          }) // 加载admin
          .add((next, retry) => {
            if (projectBundles.indexOf(AdminBundleName) === -1) return next();
            assetManager.loadBundle(AdminBundleName, err => {
              if (err) return retry(0.1);
              next();
            });
          }) // 加载manager
          .add((next, retry) => {
            if (projectBundles.indexOf(ManagerBundleName) === -1) return next();
            assetManager.loadBundle(ManagerBundleName, err => {
              if (err) return retry(0.1);
              next();
            });
          }).start(() => {
            this._base_inited = true;
            this.onProgress(0, this._base_total); // 初始化app, 使用complete来实现onUserInit的切换以确保manager已完全加载

            (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
              error: Error()
            }), BaseManager) : BaseManager).init(assetManager.getBundle(ManagerBundleName), () => {
              this.innerNextInit();
            }, () => {
              this.onUserInit();
              if (this._base_completed < this._base_total) return; // 全部加载完成

              this.innerFinished();
            });
          });
        }
        /**
         * [不可重写] 用于内部初始化完成
         */


        innerFinished() {
          if (this._base_finished) return;
          this._base_finished = true;
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).emit((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).EventType.EVENT_APPINIT_FINISHED); // 默认音效(Button点击触发, 这个方案可以正常触发input事件)

          if ((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.Manager.Sound.setting.defaultEffectName) {
            const playDefaultEffect = function (e) {
              // SoundManager.setButtonEffect会将Button所在节点的useDefaultEffect设为false
              if (e.target['useDefaultEffect'] === false) return;
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.onceUserInterface(Node.EventType.TOUCH_END, function (event) {
                if (!event.target.getComponent(Button)) return;
                setTimeout(() => {
                  if (!isValid((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                    error: Error()
                  }), Core) : Core).inst.manager.sound)) return; // 如果是scrollView中的button，在滑动后不播放点击音效

                  if (event.eventPhase === EventTouch.CAPTURING_PHASE) return;
                  (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                    error: Error()
                  }), Core) : Core).inst.manager.sound.playDefaultEffect();
                });
              }, null, true);
            };

            const onEnable = Button.prototype.onEnable;

            Button.prototype.onEnable = function () {
              onEnable.call(this);
              this.node.on(Node.EventType.TOUCH_START, playDefaultEffect);
            };

            const onDisable = Button.prototype.onDisable;

            Button.prototype.onDisable = function () {
              this.node.off(Node.EventType.TOUCH_START, playDefaultEffect);
              onDisable.call(this);
            };
          }

          return (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.showDefault(() => {
            // 初始化完成
            this.onFinish(); // 默认音乐(默认播放)

            if ((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.Manager.Sound.setting.defaultMusicName) {
              const onTouch = function () {
                if (!isValid((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.sound)) return;

                if ((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.sound.isMusicPlaying && !(_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.sound.isMusicPaused) {
                  (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                    error: Error()
                  }), Core) : Core).inst.manager.sound.replayMusic(() => {
                    (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                      error: Error()
                    }), Core) : Core).inst.manager.ui.offUserInterface(Node.EventType.TOUCH_START, onTouch, this, true);
                  });
                } else {
                  (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                    error: Error()
                  }), Core) : Core).inst.manager.ui.offUserInterface(Node.EventType.TOUCH_START, onTouch, this, true);
                }
              };

              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.onUserInterface(Node.EventType.TOUCH_START, onTouch, this, true);
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.sound.playDefaultMusic(() => {
                (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.ui.offUserInterface(Node.EventType.TOUCH_START, onTouch, this, true);
              });
            }
          });
        }
        /**
         * [不可重写] 用于内部初始化
         */


        innerNextInit() {
          // 完成+1
          this._base_mgr_completed += 1; // 进度回调

          this.onProgress(this._base_completed, this._base_total);
        }
        /**
         * [避免重写] 初始化下一步，用户部分每完成一步需要调用一次
         */


        nextInit() {
          if (this._base_finished) return;

          if (!this._base_inited) {
            // 完成+1
            this._base_user_completed += 1; // 进度回调

            this.onProgress(this._base_completed, this._base_total);
            return;
          } // 完成+1


          this._base_user_completed += 1; // 进度回调

          this.onProgress(this._base_completed, this._base_total); // 全部加载完成

          if (this._base_completed >= this._base_total) {
            this.innerFinished();
          }
        } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////        以下可重写        ////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * [可以重写] 默认start调用startInit，可以重写后自定义时机
         */


        start() {
          this.startInit();
        }
        /**
         * [可以重写] 获得用户资源总量，这里返回几，就需要用户自行调用几次nextInit
         */


        getUserAssetNum() {
          return 0;
        }
        /**
         * [可以重写] 用户初始化函数，会在框架初始化完成后调用
         */


        onUserInit() {
          return 0;
        }
        /**
         * [可以重写] 监听进度
         * @param {Number} completed
         * @param {Number} total
         */


        onProgress(completed, total) {
          return completed / total;
        }
        /**
         * [可以重写] 初始化完成
         */


        onFinish() {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=420c84cea14d9016adc6703cb44e9538b781720c.js.map