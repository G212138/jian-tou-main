System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, ProgressBar, UIOpacity, _decorator, assetManager, BaseAppInit, app, Core, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, AppInit;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseAppInit(extras) {
    _reporterNs.report("BaseAppInit", "../../../extensions/app/assets/base/BaseAppInit", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "../../app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "db://app/Core", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      ProgressBar = _cc.ProgressBar;
      UIOpacity = _cc.UIOpacity;
      _decorator = _cc._decorator;
      assetManager = _cc.assetManager;
    }, function (_unresolved_2) {
      BaseAppInit = _unresolved_2.default;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      Core = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "598f2EhUohEebUzsqwXHool", "AppInit", undefined);

      __checkObsolete__(['AssetManager', 'Node', 'ProgressBar', 'UIOpacity', '_decorator', 'assetManager', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AppInit", AppInit = (_dec = ccclass('AppInit'), _dec2 = property(Node), _dec3 = property(ProgressBar), _dec(_class = (_class2 = class AppInit extends (_crd && BaseAppInit === void 0 ? (_reportPossibleCrUseOfBaseAppInit({
        error: Error()
      }), BaseAppInit) : BaseAppInit) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "logo", _descriptor, this);

          this.InitList = ["page-home-res", "page-home", "page-main-res", "page-main", "page-sp-level-res", "page-sp-level"];

          _initializerDefineProperty(this, "progressBar", _descriptor2, this);
        }

        /**
        * 获得用户资源总量，这里返回几，就需要用户自行调用几次nextInit
        */
        getUserAssetNum() {
          return this.InitList.length;
        }

        onLoad() {
          // 执行初始化操作
          const opacity = this.logo.getComponent(UIOpacity);
          opacity.opacity = 255;
          this.initRes();
        }

        onProgress(completed, total) {
          // 执行进度操作
          console.log(`AppInit进度: ${completed}/${total}`);
          this.progressBar.progress = completed / total;
        }

        initRes() {
          const self = this;
          const task = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createAny();
          this.InitList.forEach(item => {
            task.add(next => {
              self.preloadRes(item).then(() => {
                // self.progressBar.progress = 0;
                next();
              });
            });
          });
          task.start();
        }

        onFinish() {
          //判断是不是新用户
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.newUser) {
            // 是新用户，直接进入第一关
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: "PageMain"
            });
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.setNewUser(false);
          } // 执行完成操作


          this.node.destroy();
        }

        preloadRes(name) {
          return new Promise((resolve, reject) => {
            const self = this;
            assetManager.loadBundle(name, (err, bundle) => {
              if (err) {
                console.log(err);
                reject(err);
                return;
              }

              bundle.loadDir("", function (finished, total, item) {// self.progressBar.progress = finished / total;
                // console.log(name,finished,total);
              }, function (err, assets) {
                if (err) {
                  console.log(err);
                  reject(err);
                  return;
                }

                resolve(assets);
                self.nextInit();
              });
            });
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "logo", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=17c68371e5c69b619e5d5244254dfa92965f07de.js.map