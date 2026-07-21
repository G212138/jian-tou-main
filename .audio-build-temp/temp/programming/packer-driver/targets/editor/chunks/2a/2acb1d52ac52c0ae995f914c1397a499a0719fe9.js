System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, EventTarget, Prefab, Widget, _decorator, error, instantiate, js, path, warn, DEBUG, DEV, EDITOR, Core, Logger, _dec, _class2, _crd, ccclass, UserManagerPath, DontRewriteFuns, uuid, loadBegin, loadFinish, loadError, initBegin, initFinish, BaseManager;

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLogger(extras) {
    _reporterNs.report("Logger", "../lib/logger/logger", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
      EventTarget = _cc.EventTarget;
      Prefab = _cc.Prefab;
      Widget = _cc.Widget;
      _decorator = _cc._decorator;
      error = _cc.error;
      instantiate = _cc.instantiate;
      js = _cc.js;
      path = _cc.path;
      warn = _cc.warn;
    }, function (_ccEnv) {
      DEBUG = _ccEnv.DEBUG;
      DEV = _ccEnv.DEV;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      Logger = _unresolved_3.Logger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "302056smx5PRICBe3D/jWxS", "BaseManager", undefined);

      __checkObsolete__(['AssetManager', 'Component', 'EventTarget', 'Prefab', 'Widget', '_decorator', 'error', 'instantiate', 'js', 'path', 'warn']);

      ({
        ccclass
      } = _decorator);
      UserManagerPath = 'UserManager';
      DontRewriteFuns = ['emit', 'on', 'once', 'off', 'targetOff'];
      uuid = new class UUID {
        constructor() {
          this.index = 0;
        }

        create() {
          if (this.index++ > 10000000) {
            this.index = 0;
          }

          return `${Date.now()}-${this.index}`;
        }

      }();
      loadBegin = (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).create('log', '#32cd32', DEV ? '[BaseManager] 下载开始' : '[BaseManager] [下载开始]');
      loadFinish = (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).create('log', '#00ae9d', DEV ? '[BaseManager] 下载完成' : '[BaseManager] [下载完成]');
      loadError = (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).create('log', '#ff4757', DEV ? '[BaseManager] 下载失败' : '[BaseManager] [下载失败]');
      initBegin = (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).create('log', '#3e4145', DEV ? '[BaseManager] 初始化开始' : '[BaseManager] [初始化开始]');
      initFinish = (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).create('log', '#008080', DEV ? '[BaseManager] 初始化完成' : '[BaseManager] [初始化完成]');

      _export("default", BaseManager = (_dec = ccclass('BaseManager'), _dec(_class2 = class BaseManager extends Component {
        get managerName() {
          return this._base_manager_name;
        }

        constructor() {
          super();
          // 事件管理器
          this._base_event = new EventTarget();
          // manager名字
          this._base_manager_name = js.getClassName(this);

          if (EDITOR) {
            DontRewriteFuns.forEach(funName => {
              if (BaseManager.prototype[funName] !== this[funName]) {
                warn(`[${this._base_manager_name}] 不应该重写父类方法{${funName}}`);
              }
            });
          }

          if (this._base_manager_name !== 'Manager' && this._base_manager_name.slice(-7) === 'Manager') {
            const managerName = this._base_manager_name.slice(0, -7);

            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.Manager[managerName] = this.constructor;
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager[managerName.toLowerCase()] = this;
          } else if (EDITOR) {
            error(`[${this._base_manager_name}] manager命名错误(应为 xxxxManager 以Manager结尾)`);
          } else if (DEBUG) {
            error(`[${this._base_manager_name}] manager命名错误(应为 xxxxManager 以Manager结尾)`);
          }
        } // 用来初始化组件或节点的一些属性，当该组件被第一次添加到节点上或用户点击了它的 Reset 菜单时调用。这个回调只会在编辑器下调用。


        resetInEditor() {
          const widget = this.node.getComponent(Widget) || this.node.addComponent(Widget);
          widget.isAlignBottom = true;
          widget.isAlignLeft = true;
          widget.isAlignRight = true;
          widget.isAlignTop = true;
          widget.top = 0;
          widget.left = 0;
          widget.right = 0;
          widget.bottom = 0;
          widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        }
        /**
         * [无序] 自身初始化完成, init执行完毕后被调用
         */


        onInited() {}
        /**
         * [无序] 所有manager初始化完成
         */


        onFinished() {}
        /**
         * [无序] 初始化manager，在初始化完成后，调用finish方法
         * @param {Function} finish 
         */


        init(finish) {
          finish && finish();
        }

        createUUID() {
          return uuid.create();
        }
        /**打印日志 */


        get log() {
          if (DEV) {
            return window.console.log.bind(window.console, '%c %s %c %s ', 'background:#4169e1; padding: 2px; border-radius: 5px 0 0 5px; border: 1px solid #4169e1; color: #fff; font-weight: normal;', `[${this._base_manager_name}] LOG ${new Date().toLocaleString()}`, 'background:#ffffff ; padding: 2px; border-radius: 0 5px 5px 0; border: 1px solid #4169e1; color: #4169e1; font-weight: normal;');
          }

          return window.console.log.bind(window.console, `[${this._base_manager_name}] [LOG] [${new Date().toLocaleString()}]`);
        }
        /**打印警告 */


        get warn() {
          if (DEV) {
            return window.console.warn.bind(window.console, '%c %s %c %s ', 'background:#ff7f50; padding: 2px; border-radius: 5px 0 0 5px; border: 1px solid #ff7f50; color: #fff; font-weight: normal;', `[${this._base_manager_name}] WARN ${new Date().toLocaleString()}`, 'background:#ffffff ; padding: 2px; border-radius: 0 5px 5px 0; border: 1px solid #ff7f50; color: #ff7f50; font-weight: normal;');
          }

          return window.console.warn.bind(window.console, `[${this._base_manager_name}] [WARN] [${new Date().toLocaleString()}]`);
        }
        /**打印错误 */


        get error() {
          if (DEV) {
            return window.console.error.bind(window.console, '%c %s %c %s ', 'background:#ff4757; padding: 2px; border-radius: 5px 0 0 5px; border: 1px solid #ff4757; color: #fff; font-weight: normal;', `[${this._base_manager_name}] ERROR ${new Date().toLocaleString()}`, 'background:#ffffff ; padding: 2px; border-radius: 0 5px 5px 0; border: 1px solid #ff4757; color: #ff4757; font-weight: normal;');
          }

          return window.console.error.bind(window.console, `[${this._base_manager_name}] [ERROR] [${new Date().toLocaleString()}]`);
        }
        /**
         * [系统内置] 事件分发
         */


        emit(event, ...data) {
          this._base_event.emit(event, ...data);
        }
        /**
         * [系统内置] 事件监听
         */


        on(event, cb, target) {
          this._base_event.on(event, cb, target);
        }
        /**
         * [系统内置] 事件监听
         */


        once(event, cb, target) {
          this._base_event.once(event, cb, target);
        }
        /**
         * [系统内置] 事件移除监听
         */


        off(event, cb, target) {
          this._base_event.off(event, cb, target);
        }
        /**
         * [系统内置] 事件移除监听
         */


        targetOff(target) {
          this._base_event.targetOff(target);
        }
        /***********************************静态***********************************/

        /**
         * 框架内置Manager的数量
         * @private
         */


        static get sysMgrCount() {
          return 5;
        }
        /**
         * 获得初始化资源的数量(包括sysMgrCount)
         * @private
         */


        static getTotalAssetNum(bundle) {
          let count = this.sysMgrCount;
          if (!bundle) return count;
          const array = bundle.getDirWithPath('/', Prefab);
          array.forEach(function (item) {
            if (item.path.endsWith('Manager')) {
              count++;
            }
          });
          return count;
        }
        /**
         * 获得初始化资源的数量
         * @private
         */


        static getUserAssetUrls(bundle) {
          const pathArr = [];
          if (!bundle) return pathArr;
          const array = bundle.getDirWithPath('/', Prefab);
          array.forEach(function (item) {
            if (item.path.endsWith('Manager')) {
              pathArr.push(item.path);
            }
          });
          return pathArr;
        }
        /**
         * 静态方法，初始化manager，该方法必须在场景初始化完毕之后调用
         * @private
         */


        static init(bundle, progress, complete) {
          const urls = this.getUserAssetUrls(bundle);
          const totalAsset = urls.length + this.sysMgrCount;
          let completeAsset = 0;

          const onProgress = function (next, manager) {
            if (DEBUG) {
              var _window;

              const startTime = (_window = window) != null && (_window = _window.performance) != null && _window.now ? performance.now() : Date.now();
              initBegin(manager.managerName);
              return function () {
                manager.onInited();

                if (DEBUG) {
                  var _window2;

                  const endTime = (_window2 = window) != null && (_window2 = _window2.performance) != null && _window2.now ? performance.now() : Date.now();
                  initFinish(`${manager.managerName} 耗时:${(endTime - startTime).toFixed(6)} ms`);
                }

                progress && progress(++completeAsset, totalAsset);
                next();
              };
            }

            return function () {
              manager.onInited();
              progress && progress(++completeAsset, totalAsset);
              next();
            };
          }; // 用户manager(动态添加)


          const userMgrList = []; // 系统manager(静态内置)

          const sysMgrList = [(_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.event, (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.timer, (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader, (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui, (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.sound]; // 初始化系统manager

          const initSysMgrTask = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createASync();
          sysMgrList.forEach(function (manager) {
            initSysMgrTask.add(function (next) {
              manager.init(onProgress(next, manager));
            });
          }); // 加载用户manager

          const loadUserMgrTask = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createASync();
          const UserManagerRoot = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.root.getChildByPath(UserManagerPath);
          urls.forEach(function (url) {
            loadUserMgrTask.add(function (next, retry) {
              if (DEBUG) {
                var _window3;

                const managerName = path.basename(url);
                const startTime = (_window3 = window) != null && (_window3 = _window3.performance) != null && _window3.now ? performance.now() : Date.now();
                loadBegin(managerName);
                bundle.load(url, Prefab, function (err, prefab) {
                  if (err || !prefab) {
                    loadError(managerName, '重试...');
                    retry(1);
                  } else {
                    var _window4;

                    const endTime = (_window4 = window) != null && (_window4 = _window4.performance) != null && _window4.now ? performance.now() : Date.now();
                    loadFinish(`${managerName} 耗时:${(endTime - startTime).toFixed(6)} ms`);
                    const node = instantiate(prefab);
                    node.parent = UserManagerRoot;
                    node.active = true;
                    userMgrList.push(node.getComponent(BaseManager));
                    next();
                  }
                });
                return;
              }

              bundle.load(url, Prefab, function (err, prefab) {
                if (err || !prefab) {
                  loadError(path.basename(url), '重试...');
                  retry(1);
                } else {
                  const node = instantiate(prefab);
                  node.parent = UserManagerRoot;
                  node.active = true;
                  userMgrList.push(node.getComponent(BaseManager));
                  next();
                }
              });
            });
          });
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createAny().add([next => initSysMgrTask.start(next), next => loadUserMgrTask.start(next)]).add(function (next) {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).emit((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).EventType.EVENT_SYS_MANAGER_INITED);
            next();
          }).add(function (next) {
            // 初始化用户manager
            const initUserMgrTask = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.lib.task.createASync();
            userMgrList.forEach(manager => {
              initUserMgrTask.add(function (next) {
                manager.init(onProgress(next, manager));
              });
            });
            initUserMgrTask.start(next);
          }).add(function (next) {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).emit((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).EventType.EVENT_USER_MANAGER_INITED);
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).emit((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).EventType.EVENT_MANAGER_INITED);
            next();
          }).add(function (next) {
            // 所有manager初始化完成后，触发回调
            sysMgrList.forEach(function (manager) {
              manager.onFinished();
            });
            userMgrList.forEach(function (manager) {
              manager.onFinished();
            });
            next();
          }).start(function () {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).emit((_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).EventType.EVENT_MANAGER_FINISHED);
            complete && complete(totalAsset);
          });
        }

      }) || _class2));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2acb1d52ac52c0ae995f914c1397a499a0719fe9.js.map