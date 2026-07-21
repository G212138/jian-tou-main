System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Camera, Canvas, Layers, Node, Prefab, ResolutionPolicy, Scene, SceneAsset, Settings, UITransform, Widget, _decorator, director, instantiate, isValid, js, screen, settings, size, view, DEV, Core, BaseManager, BaseView, ViewType, UIMgrLoading, UIMgrShade, UIMgrToast, UIMgrZOrder, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, UIScene, UserInterfacePath, ViewTypes, BlockEvents, ErrorCode, ViewName, MiniViewName, UIManager;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  /**
   * 将驼峰命名转成串式命名
   * @param str 驼峰字符串
   * @returns 
   */
  function stringCaseNegate(str) {
    return str.replace(/[A-Z]/g, (searchStr, startIndex) => {
      if (startIndex === 0) {
        return searchStr.toLowerCase();
      } else {
        return '-' + searchStr.toLowerCase();
      }
    });
  }

  function _reportPossibleCrUseOfIMiniViewName(extras) {
    _reporterNs.report("IMiniViewName", "../../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIViewName(extras) {
    _reporterNs.report("IViewName", "../../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../../Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../base/BaseManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIHideParamOnHide(extras) {
    _reporterNs.report("IHideParamOnHide", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIShade(extras) {
    _reporterNs.report("IShade", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIShowParamAttr(extras) {
    _reporterNs.report("IShowParamAttr", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIShowParamOnHide(extras) {
    _reporterNs.report("IShowParamOnHide", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIShowParamOnShow(extras) {
    _reporterNs.report("IShowParamOnShow", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIViewType(extras) {
    _reporterNs.report("IViewType", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfViewType(extras) {
    _reporterNs.report("ViewType", "../../base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIMgrLoading(extras) {
    _reporterNs.report("UIMgrLoading", "./comp/UIMgrLoading", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIMgrShade(extras) {
    _reporterNs.report("UIMgrShade", "./comp/UIMgrShade", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIMgrToast(extras) {
    _reporterNs.report("UIMgrToast", "./comp/UIMgrToast", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIMgrZOrder(extras) {
    _reporterNs.report("UIMgrZOrder", "./comp/UIMgrZOrder", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Camera = _cc.Camera;
      Canvas = _cc.Canvas;
      Layers = _cc.Layers;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      ResolutionPolicy = _cc.ResolutionPolicy;
      Scene = _cc.Scene;
      SceneAsset = _cc.SceneAsset;
      Settings = _cc.Settings;
      UITransform = _cc.UITransform;
      Widget = _cc.Widget;
      _decorator = _cc._decorator;
      director = _cc.director;
      instantiate = _cc.instantiate;
      isValid = _cc.isValid;
      js = _cc.js;
      screen = _cc.screen;
      settings = _cc.settings;
      size = _cc.size;
      view = _cc.view;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      BaseManager = _unresolved_3.default;
    }, function (_unresolved_4) {
      BaseView = _unresolved_4.default;
      ViewType = _unresolved_4.ViewType;
    }, function (_unresolved_5) {
      UIMgrLoading = _unresolved_5.default;
    }, function (_unresolved_6) {
      UIMgrShade = _unresolved_6.default;
    }, function (_unresolved_7) {
      UIMgrToast = _unresolved_7.default;
    }, function (_unresolved_8) {
      UIMgrZOrder = _unresolved_8.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "234f6Lx69NNFJ9vC2nHCWRJ", "UIManager", undefined);

      __checkObsolete__(['Asset', 'AssetManager', 'Camera', 'Canvas', 'Component', 'Event', 'Layers', 'Node', 'Prefab', 'RenderTexture', 'ResolutionPolicy', 'Scene', 'SceneAsset', 'Settings', 'UITransform', 'Widget', '_decorator', 'director', 'instantiate', 'isValid', 'js', 'screen', 'settings', 'size', 'view']);

      ({
        ccclass,
        property
      } = _decorator);
      UIScene = 'UIScene';
      UserInterfacePath = 'UserInterface';
      ViewTypes = [(_crd && ViewType === void 0 ? (_reportPossibleCrUseOfViewType({
        error: Error()
      }), ViewType) : ViewType).Page, (_crd && ViewType === void 0 ? (_reportPossibleCrUseOfViewType({
        error: Error()
      }), ViewType) : ViewType).Paper, (_crd && ViewType === void 0 ? (_reportPossibleCrUseOfViewType({
        error: Error()
      }), ViewType) : ViewType).Pop, (_crd && ViewType === void 0 ? (_reportPossibleCrUseOfViewType({
        error: Error()
      }), ViewType) : ViewType).Top];
      BlockEvents = [Node.EventType.TOUCH_START, Node.EventType.TOUCH_MOVE, Node.EventType.TOUCH_END, Node.EventType.TOUCH_CANCEL, Node.EventType.MOUSE_DOWN, Node.EventType.MOUSE_MOVE, Node.EventType.MOUSE_UP, Node.EventType.MOUSE_ENTER, Node.EventType.MOUSE_LEAVE, Node.EventType.MOUSE_WHEEL];
      /**
       * 错误码
       */

      ErrorCode = /*#__PURE__*/function (ErrorCode) {
        ErrorCode[ErrorCode["LoadError"] = 0] = "LoadError";
        ErrorCode[ErrorCode["LogicError"] = 1] = "LogicError";
        ErrorCode[ErrorCode["InvalidError"] = 2] = "InvalidError";
        return ErrorCode;
      }(ErrorCode || {});
      /**
       * 界面名字枚举
       */


      ViewName = new Proxy({}, {
        get: function get(target, key) {
          if (target[key]) return target[key];
          target[key] = key;
          return key;
        }
      });
      /**
       * 子界面名字枚举
       */

      MiniViewName = new Proxy({}, {
        get: function get(target, key) {
          if (target[key]) return target[key];
          target[key] = key;
          return key;
        }
      });

      _export("default", UIManager = (_dec = ccclass('UIManager'), _dec2 = property({
        type: Prefab,
        tooltip: '位置: app://manager/ui/prefab/UIMgrLoading'
      }), _dec3 = property({
        type: Prefab,
        tooltip: '位置: app://manager/ui/prefab/UIMgrShade'
      }), _dec4 = property({
        type: Prefab,
        tooltip: '位置: app://manager/ui/prefab/UIMgrToast'
      }), _dec(_class = (_class2 = (_class3 = class UIManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "loadingPre", _descriptor, this);

          _initializerDefineProperty(this, "shadePre", _descriptor2, this);

          _initializerDefineProperty(this, "toastPre", _descriptor3, this);

          // UI根节点
          this.UserInterface = null;
          // 加载和遮罩节点
          this.loading = null;
          this.shade = null;
          this.toast = null;
          this.defaultUI = null;
          this.defaultData = '';
          this.currScene = '';
          this.currPage = null;
          this.currFocus = null;
          // 预制体缓存
          this.prefabCache = {};
          this.sceneCache = {};
          // 全局触摸有效
          this.touchEnabled = true;
          // 记录触摸屏蔽
          this.touchMaskMap = new Map();
          // 记录展示加载
          this.showLoadingMap = new Map();
          // 记录正在加载中的有效的ui
          this.uiLoadingMap = new Map();
          // 记录正在展示中的有效的ui
          this.uiShowingMap = new Map();
          this.showQueue = [];
        }

        /**UI根节点 */
        get root() {
          return this.node.parent.parent;
        }
        /**相机 */


        get camera() {
          return this.canvas.cameraComponent;
        }
        /**画布*/


        get canvas() {
          return this.root.getComponent(Canvas);
        }

        init(finish) {
          var _setting$preload;

          var setting = UIManager.setting;
          this.defaultUI = setting.defaultUI;
          this.defaultData = setting.defaultData;
          super.init(finish); // 预加载,符合AnyTask规则

          if ((_setting$preload = setting.preload) != null && _setting$preload.length) {
            var task = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.lib.task.createAny();
            setting.preload.forEach(preload => {
              if (preload instanceof Array) {
                task.add(preload.map(name => {
                  return next => this.preload(name, next);
                }));
              } else {
                task.add(next => this.preload(preload, next));
              }
            });
            task.start();
          }
        }

        onLoad() {
          this.UserInterface = this.root.getChildByName(UserInterfacePath);
          this.root.getComponentsInChildren(Camera).forEach(camera => {
            // 避免camera.priority<0的情况，否则会造成渲染异常
            if (camera.priority < 0) camera.priority = 0; // 避免camera.far<=camera.near的情况，否则会造成渲染异常

            if (camera.far <= camera.near) camera.far = camera.near + 1;
          });
          director.addPersistRootNode(this.root);
          this.createTypeRoot();
          this.shade = instantiate(this.shadePre);
          this.shade.parent = this.UserInterface;
          this.shade.active = false;
          this.shade.getComponent(Widget).target = this.root;
          this.loading = instantiate(this.loadingPre);
          this.loading.parent = this.node;
          this.loading.active = false; // toast是后面加的，需要做容错

          if (this.toastPre) {
            this.toast = instantiate(this.toastPre);
            this.toast.parent = this.node;
          } // 自动适配分辨率策略


          if (UIManager.setting.autoFit) {
            var designResolution = settings.querySettings(Settings.Category.SCREEN, 'designResolution');
            var windowSize = size(screen.windowSize);
            var resolutionPolicy = designResolution.policy;

            var autoFitResolutionPolicy = function autoFitResolutionPolicy() {
              if (windowSize.width / windowSize.height > designResolution.width / designResolution.height) {
                if (resolutionPolicy === ResolutionPolicy.FIXED_HEIGHT) return;
                view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
                resolutionPolicy = ResolutionPolicy.FIXED_HEIGHT;
              } else {
                if (resolutionPolicy === ResolutionPolicy.FIXED_WIDTH) return;
                view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
                resolutionPolicy = ResolutionPolicy.FIXED_WIDTH;
              }
            };

            autoFitResolutionPolicy();
            this.schedule(() => {
              if (windowSize.equals(screen.windowSize)) return;
              windowSize.set(screen.windowSize);
              autoFitResolutionPolicy();
            }, 0.5);
          }
        }

        createTypeRoot() {
          ViewTypes.forEach(type => {
            var d2 = new Node(type);
            d2.layer = Layers.Enum.UI_2D;
            d2.addComponent(_crd && UIMgrZOrder === void 0 ? (_reportPossibleCrUseOfUIMgrZOrder({
              error: Error()
            }), UIMgrZOrder) : UIMgrZOrder);
            d2.parent = this.UserInterface;
            d2.addComponent(UITransform);
            var widget = d2.addComponent(Widget);
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            widget.isAlignTop = true;
            widget.top = 0;
            widget.left = 0;
            widget.right = 0;
            widget.bottom = 0;
            widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;

            if (DEV) {
              d2.on(Node.EventType.CHILD_ADDED, child => {
                if (!child) return;
                if (child === this.shade) return;
                if (this.getBaseView(child)) return;
                this.warn(UserInterfacePath + "/" + type + "\u4E0B\u975E\u5FC5\u8981\u8BF7\u4E0D\u8981\u6DFB\u52A0\u975EUI\u8282\u70B9:", child == null ? void 0 : child.name);
              }, this);
            }
          });
        }

        addTouchMaskListener() {
          if (!this.touchEnabled) return;
          if (this.touchMaskMap.size > 0) return;

          for (var i = 0; i < BlockEvents.length; i++) {
            this.root.on(BlockEvents[i], this.stopPropagation, this, true);
          }
        }

        removeTouchMaskListener() {
          if (!this.touchEnabled) return;
          if (this.touchMaskMap.size > 0) return;

          for (var i = 0; i < BlockEvents.length; i++) {
            this.root.off(BlockEvents[i], this.stopPropagation, this, true);
          }
        }

        stopPropagation(event) {
          if (!this.touchEnabled || this.touchMaskMap.size > 0) {
            event.propagationStopped = true;

            if (event.type !== Node.EventType.MOUSE_MOVE) {
              this.log('屏蔽触摸');
            }
          }
        }
        /**
         * 获取一个节点上的BaseView组件, 获取不到返回null
         */


        getBaseView(node) {
          if (!node) return null;
          return node.components.find(component => component instanceof (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
            error: Error()
          }), BaseView) : BaseView));
        }
        /**
         * 在所有父节点中找到一个最近的view组件
         * @param target 
         * @returns 
         */


        getViewInParents(target) {
          var node = target;
          var com = null;

          while (node.parent && !(node.parent instanceof Scene)) {
            com = this.getBaseView(node.parent);

            if (!com) {
              node = node.parent;
            } else {
              break;
            }
          }

          return com;
        }
        /**
         * 在子节点中找到一个最近的view组件
         * @param target 
         * @returns 
         */


        getViewInChildren(target) {
          for (var index = 0; index < target.children.length; index++) {
            var node = target.children[index];
            var com = this.getBaseView(node);
            if (com) return com;
          }

          return null;
        }
        /**
         * 根据UI名字获取它的脚本类
         */


        getUIClass(name) {
          return js.getClassByName(name);
        }
        /**
         * 根据UI名字获取UI路径
         * @param name ui名字
         * @returns 
         */


        getUIPath(name) {
          return name;
        }
        /**
         * 获取前缀
         * @param name    ui名字
         */


        getUIPrefix(name) {
          for (var index = 0; index < ViewTypes.length; index++) {
            var typeName = ViewTypes[index];

            if (name.indexOf(typeName) === 0) {
              return typeName;
            }
          }

          this.error('getUIPrefix', "" + name);
        }
        /**
         * 根据UI名字查询父节点
         * @param name    ui名字
         */


        getUIParent(name) {
          if (this.currScene === name) {
            return director.getScene();
          }

          var prefix = this.getUIPrefix(name);

          for (var index = 0; index < ViewTypes.length; index++) {
            var viewType = ViewTypes[index];

            if (viewType === prefix) {
              return this.UserInterface.getChildByName(viewType);
            }
          }

          this.error('getUIParent', "\u627E\u4E0D\u5230" + name + "\u5BF9\u5E94\u7684Parent");
          return null;
        }
        /**
         * 根据UI名字获取场景内的节点
         * @param name    ui名字
         */


        getUIInScene(name, multiple) {
          if (multiple === void 0) {
            multiple = false;
          }

          var parent = this.getUIParent(name);

          if (multiple) {
            var _result = parent.children.filter(node => node.name === name);

            if (_result.length) return _result.filter(node => isValid(node, true));
          } else {
            var _result2 = parent.children.find(node => node.name === name);

            if (_result2) return isValid(_result2, true) ? _result2 : null;
          }

          return multiple ? [] : null;
        }
        /**
         * 根据UI名字获取展示中的节点
         * @param name    ui名字
         */


        getUIInShowing(name, multiple) {
          if (multiple === void 0) {
            multiple = false;
          }

          if (multiple) {
            var _result3 = [];
            this.uiShowingMap.forEach((_name, com) => {
              if (_name === name) _result3.push(com.node);
            });
            return _result3;
          } else {
            var _result4 = null;
            this.uiShowingMap.forEach((_name, com) => {
              if (!_result4 && _name === name) _result4 = com.node;
            });
            return _result4;
          }
        }
        /**
         * 获取UI骨架Bundle名字
         * @deprecated 将会移除，请改为其它方案
         */


        getNativeBundleName(uiName) {
          // 兼容旧版本
          var oldBundleName = "app-view_" + uiName;
          var projectBundles = settings.querySettings(Settings.Category.ASSETS, 'projectBundles');

          if (projectBundles && projectBundles.indexOf(oldBundleName) >= 0) {
            return oldBundleName;
          }

          return stringCaseNegate(uiName);
        }
        /**
         * 获取UI资源Bundle名字
         * @deprecated 将会移除，请改为其它方案
         */


        getResBundleName(uiName) {
          // 兼容旧版本
          var oldBundleName = "app-view_" + uiName + "_Res";
          var projectBundles = settings.querySettings(Settings.Category.ASSETS, 'projectBundles');

          if (projectBundles && projectBundles.indexOf(oldBundleName) >= 0) {
            return oldBundleName;
          }

          return stringCaseNegate(uiName) + "-res";
        }
        /**
         * 初始化Bundle
         */


        initBundle(name, onFinish) {
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createASync().add(next => {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.loadBundle({
              bundle: this.getNativeBundleName(name),
              onComplete: next
            });
          }).add(next => {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.loadBundle({
              bundle: this.getResBundleName(name),
              onComplete: next
            });
          }).start(onFinish);
        }
        /**
         * 安装UI
         */


        installUI(name, complete, progress) {
          if (this.sceneCache[name]) {
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(this.sceneCache[name]);
            });
            return;
          } else if (this.prefabCache[name]) {
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(this.prefabCache[name]);
            });
            return;
          }

          var task = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createSync().add(next => {
            this.initBundle(name, next);
          }).add(next => {
            // 失败
            var uiBundles = task.results[0];
            if (!uiBundles || !uiBundles[0] || !uiBundles[1]) return next(null);
            var isScene = uiBundles[0].getSceneInfo(name);
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.load({
              bundle: this.getNativeBundleName(name),
              path: this.getUIPath(name),
              type: isScene ? SceneAsset : Prefab,
              onProgress: progress,
              onComplete: next
            });
          }).start(results => {
            if (!isValid(this)) return; // 验证缓存

            var cache = this.sceneCache[name] || this.prefabCache[name];

            if (cache) {
              return complete && complete(cache);
            } // 验证有效


            var asset = results[1];

            if (!asset) {
              return complete && complete(null);
            } // 添加引用计数


            asset.addRef(); // 添加缓存

            if (asset instanceof Prefab) {
              this.prefabCache[name] = asset;
            } else {
              this.sceneCache[name] = asset;
            }

            this.log("\u52A0\u8F7D: " + name);
            return complete && complete(asset);
          });
        }
        /**
         * 卸载UI
         */


        uninstallUI(name) {
          if (this.sceneCache[name]) {
            // 释放引用计数
            this.sceneCache[name].decRef(); // 删除缓存

            delete this.sceneCache[name];
          } else if (this.prefabCache[name]) {
            // 释放引用计数
            this.prefabCache[name].decRef(); // 删除缓存

            delete this.prefabCache[name];
          }

          var resBundle = this.getResBundleName(name);
          var naBundle = this.getNativeBundleName(name);
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.releaseAll(resBundle);
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.releaseAll(naBundle);
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.removeBundle(resBundle);
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.removeBundle(naBundle);
          this.log("\u5378\u8F7D: " + name);
        }
        /**
         * 加载ui内部资源
         */


        loadRes(target, path, type, callback) {
          if (typeof target === 'string') {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.load({
              bundle: this.getResBundleName(target),
              path: path,
              type: type,
              onComplete: callback
            });
          } else {
            var _view = this.getBaseView(target.node) || this.getViewInParents(target.node) || this.getViewInChildren(director.getScene());

            if (_view) {
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.loader.load({
                bundle: this.getResBundleName(_view.viewName),
                path: path,
                type: type,
                onComplete: callback
              });
            } else {
              this.error('loadRes', target.name, path);
              callback && callback(null);
            }
          }
        }
        /**
         * 预加载ui内部资源
         */


        preloadRes(target, path, type, complete) {
          if (typeof target === 'string') {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.preload({
              bundle: this.getResBundleName(target),
              path: path,
              type: type,
              onComplete: complete
            });
          } else {
            var _view2 = this.getBaseView(target.node) || this.getViewInParents(target.node) || this.getViewInChildren(director.getScene());

            if (_view2) {
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.loader.preload({
                bundle: this.getResBundleName(_view2.viewName),
                path: path,
                type: type,
                onComplete: complete
              });
            } else {
              this.error('preloadRes', target.name, path);
            }
          }
        }
        /**
         * 加载ui内部资源
         */


        loadResDir(target, path, type, callback) {
          if (typeof target === 'string') {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.loadDir({
              bundle: this.getResBundleName(target),
              path: path,
              type: type,
              onComplete: callback
            });
          } else {
            var _view3 = this.getBaseView(target.node) || this.getViewInParents(target.node) || this.getViewInChildren(director.getScene());

            if (_view3) {
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.loader.loadDir({
                bundle: this.getResBundleName(_view3.viewName),
                path: path,
                type: type,
                onComplete: callback
              });
            } else {
              this.error('loadResDir', target.name, path);
              callback && callback([]);
            }
          }
        }
        /**
         * 预加载ui内部资源
         */


        preloadResDir(target, path, type, complete) {
          if (typeof target === 'string') {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.preloadDir({
              bundle: this.getResBundleName(target),
              path: path,
              type: type,
              onComplete: complete
            });
          } else {
            var _view4 = this.getBaseView(target.node) || this.getViewInParents(target.node) || this.getViewInChildren(director.getScene());

            if (_view4) {
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.loader.preloadDir({
                bundle: this.getResBundleName(_view4.viewName),
                path: path,
                type: type,
                onComplete: complete
              });
            } else {
              this.error('preloadResDir', target.name, path);
            }
          }
        }
        /**
         * 预加载UI
         */


        preload(name, complete) {
          // 验证name是否为真
          if (!name) {
            this.error('preload', 'fail');
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(null);
            });
            return;
          }

          this.initBundle(name, _ref => {
            var [naBundle] = _ref;
            var isScene = naBundle.getSceneInfo(name);
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.preload({
              bundle: this.getNativeBundleName(name),
              path: this.getUIPath(name),
              type: isScene ? SceneAsset : Prefab,
              onComplete: complete
            });
          });
        }
        /**
         * 加载UI
         */


        load(name) {
          var progress = (arguments.length <= 2 ? undefined : arguments[2]) && (arguments.length <= 1 ? undefined : arguments[1]);
          var complete = (arguments.length <= 2 ? undefined : arguments[2]) || (arguments.length <= 1 ? undefined : arguments[1]); // 验证name是否为真

          if (!name) {
            this.error('load', 'fail');
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(null);
            });
            return;
          } // 异步加载


          this.installUI(name, result => {
            if (!result) return complete && complete(null);
            return complete && complete(result);
          }, progress);
        }
        /**
         * 销毁UI，释放资源
         * - 直接销毁，不管是否是show状态
         * - 此流程一定是同步的
         */


        release(nameOrCom) {
          var uiName = typeof nameOrCom === 'string' ? nameOrCom : nameOrCom.viewName;

          if (!uiName) {
            this.error('release', nameOrCom + " fail");
            return;
          } // 传入字符串是释放所有


          if (typeof nameOrCom === 'string') {
            this.getUIInScene(uiName, true).forEach(node => {
              var com = this.getBaseView(node);

              if (!com) {
                this.error('release', uiName + "\u4E0D\u5B58\u5728BaseView\u7EC4\u4EF6");
                return;
              }

              if (com.isShow) {
                this.warn('release', uiName + "\u6B63\u5904\u4E8Eshow\u72B6\u6001, \u6B64\u5904\u5C06\u76F4\u63A5\u9500\u6BC1");
              }

              if (com === this.currPage) {
                this.currPage = null;
              }

              if (com === this.currFocus) {
                this.currFocus = null;
              }

              this.uiShowingMap.delete(com);

              if (node && isValid(node, true)) {
                node.parent = null;
                node.destroy();
              }
            });
          } // 传入组件是释放单个
          else {
            if (nameOrCom.isShow) {
              this.warn('release', uiName + "\u6B63\u5904\u4E8Eshow\u72B6\u6001, \u6B64\u5904\u5C06\u76F4\u63A5\u9500\u6BC1");
            }

            if (nameOrCom === this.currPage) {
              this.currPage = null;
            }

            if (nameOrCom === this.currFocus) {
              this.currFocus = null;
            }

            this.uiShowingMap.delete(nameOrCom);
            var node = nameOrCom.node;

            if (node && isValid(node, true)) {
              node.parent = null;
              node.destroy();
            }
          } // 当全部释放时才清除缓存


          var nodes = this.getUIInScene(uiName, true);

          if (nodes.length === 0 || nodes.every(node => !isValid(node, true))) {
            this.uninstallUI(uiName);
            this.log("\u91CA\u653E\u8D44\u6E90: " + uiName);
          }
        }
        /**
         * 销毁全部UI，释放资源
         * - 直接销毁，不管是否是show状态
         * - 此流程一定是同步的
         */


        releaseAll(exclude) {
          Object.keys(this.prefabCache).forEach(name => {
            if (exclude && exclude.indexOf(name) !== -1) return;
            this.release(name);
          });
          Object.keys(this.sceneCache).forEach(name => {
            if (exclude && exclude.indexOf(name) !== -1) return;
            this.release(name);
          });
        }
        /**
         * 检查UI是否有效
         * - -1: 加载失败
         * - 0: UI无效
         * - 1: UI有效
         */


        checkUIValid(name, data, callback) {
          this.installUI(name, result => {
            if (!result) return callback(-1);
            var View = this.getUIClass(name);
            if (!View) return callback(0);
            if (!View.isViewValid) return callback(1);
            View.isViewValid(valid => {
              callback(valid ? 1 : 0);
            }, data);
          });
        }
        /**
         * 更新阴影的层级及显示
         */


        refreshShade() {
          // 借助refreshShade实现onFocus、onLostFocus(onFocus不会被每次都触发，只有产生变化时才触发)
          var onFocus = false; // 倒序遍历uiRoots

          var uiRoots = this.UserInterface.children;

          for (var index = uiRoots.length - 1; index >= 0; index--) {
            var uiRoot = uiRoots[index];

            if (uiRoot !== this.shade && uiRoot !== this.loading) {
              // 倒序遍历uiRoot
              var children = uiRoot.children;

              for (var i = children.length - 1; i >= 0; i--) {
                var node = children[i];
                if (node === this.shade) continue;
                var com = this.getBaseView(node);
                if (!com) continue; // 触发onFocus

                if (!onFocus && com.isCaptureFocus && com.isShow) {
                  onFocus = true;

                  if (this.currFocus !== com) {
                    isValid(this.currFocus, true) && this.currFocus.constructor.prototype.focus.call(this.currFocus, false);
                    this.currFocus = com;
                    this.currFocus.constructor.prototype.focus.call(this.currFocus, true);
                  }
                } // 添加遮罩


                if (com.isNeedShade && com.isShow) {
                  var shadeSetting = Object.assign({}, UIManager.setting.shade, com.constructor.prototype.onShade.call(com));

                  if (shadeSetting.blur) {
                    this.shade.getComponent(_crd && UIMgrShade === void 0 ? (_reportPossibleCrUseOfUIMgrShade({
                      error: Error()
                    }), UIMgrShade) : UIMgrShade).init(0, 255, 255, 0, true);
                  } else {
                    this.shade.getComponent(_crd && UIMgrShade === void 0 ? (_reportPossibleCrUseOfUIMgrShade({
                      error: Error()
                    }), UIMgrShade) : UIMgrShade).init(typeof shadeSetting.delay !== 'number' ? 0 : shadeSetting.delay, typeof shadeSetting.begin !== 'number' ? 60 : shadeSetting.begin, typeof shadeSetting.end !== 'number' ? 180 : shadeSetting.end, typeof shadeSetting.speed !== 'number' ? 100 : shadeSetting.speed, false);
                  }

                  this.shade.layer = node.layer;
                  this.shade.parent = uiRoot;
                  this.shade.active = true; // 以z坐标来代替2.x时代的zIndex

                  this.shade.setPosition(this.shade.position.x, this.shade.position.y, node.position.z);
                  var shadeIndex = this.shade.getSiblingIndex();
                  var nodeIndex = node.getSiblingIndex();

                  if (shadeIndex > nodeIndex) {
                    this.shade.setSiblingIndex(nodeIndex);
                  } else {
                    this.shade.setSiblingIndex(nodeIndex - 1);
                  }

                  return;
                }
              }
            }
          }

          this.shade.active = false;
          this.shade.getComponent(_crd && UIMgrShade === void 0 ? (_reportPossibleCrUseOfUIMgrShade({
            error: Error()
          }), UIMgrShade) : UIMgrShade).clear();

          if (!onFocus) {
            isValid(this.currFocus, true) && this.currFocus.constructor.prototype.focus.call(this.currFocus, false);
            this.currFocus = null;
          }
        } // 解析prefab


        parsingPrefab(prefab, name) {
          var _node$getComponent;

          if (!prefab) return null;
          var node = instantiate(prefab);
          node.active = false;

          if (node.name !== name) {
            this.warn('parsingPrefab', "\u8282\u70B9\u540D\u4E0EUI\u540D\u4E0D\u4E00\u81F4, \u5DF2\u91CD\u7F6E\u4E3AUI\u540D: " + this.getUIPath(name));
            node.name = name;
          }

          node.parent = this.getUIParent(name);
          (_node$getComponent = node.getComponent(Widget)) == null || _node$getComponent.updateAlignment();
          return node;
        } // 解析scene


        parsingScene(asset, name) {
          if (!asset || !asset.scene) return null;

          if (asset.scene.name !== name) {
            this.warn('parsingScene', "\u573A\u666F\u540D\u4E0EUI\u540D\u4E0D\u4E00\u81F4, \u5DF2\u91CD\u7F6E\u4E3AUI\u540D: " + this.getUIPath(name));
            asset.scene.name = name;
          }

          var view = this.getViewInChildren(asset.scene);

          if (!view) {
            this.error('parsingScene', "\u89E3\u6790\u573A\u666F\u65F6\u672A\u67E5\u8BE2\u5230\u6839\u8282\u70B9\u5B58\u5728BaseView: " + this.getUIPath(name));
            return null;
          }

          view.node.active = false;

          if (view.node.name !== name) {
            this.warn('parsingScene', "\u8282\u70B9\u540D\u4E0EUI\u540D\u4E0D\u4E00\u81F4, \u5DF2\u91CD\u7F6E\u4E3AUI\u540D: " + this.getUIPath(name));
            view.node.name = name;
          }

          return view.node;
        }

        addUILoadingUuid(name, loadingUuid) {
          var uuid = loadingUuid || this.createUUID();

          if (!this.uiLoadingMap.has(name)) {
            this.uiLoadingMap.set(name, [uuid]);
          } else {
            this.uiLoadingMap.get(name).push(uuid);
          }

          return uuid;
        }

        removeUILoadingUuid(name, uuid) {
          if (!this.uiLoadingMap.has(name)) return false;
          var index = this.uiLoadingMap.get(name).indexOf(uuid);
          if (index === -1) return false;
          this.uiLoadingMap.get(name).splice(index, 1);
          return true;
        }
        /**
         * 创建UI
         */


        createUI(name, silent, callback) {
          // 生成一个UI加载的UUID
          var loadingUuid = silent ? '' : this.showLoading();
          var uiLoadingUuid = this.addUILoadingUuid(name, loadingUuid); // 验证name

          if (!name) {
            setTimeout(() => {
              if (!isValid(this)) return; // 验证本次加载是否有效

              if (this.removeUILoadingUuid(name, uiLoadingUuid) === false) {
                return this.hideLoading(loadingUuid);
              }

              callback(null);
              this.hideLoading(loadingUuid);
            });
            return;
          } // 判断是否已经存在节点并且是单例模式


          var node = this.getUIInScene(name);

          if (isValid(node, true) && this.getBaseView(node).isSingleton === true) {
            setTimeout(() => {
              if (!isValid(this)) return; // 验证本次加载是否有效

              if (this.removeUILoadingUuid(name, uiLoadingUuid) === false) {
                return this.hideLoading(loadingUuid);
              } // 验证节点是否有效


              if (isValid(node, true)) {
                if (this.currScene === name) {
                  callback(node, director.getScene());
                } else {
                  callback(node);
                }

                this.hideLoading(loadingUuid);
              } else {
                this.createUI(name, silent, callback);
                this.hideLoading(loadingUuid);
              }
            });
            return;
          } // 加载UI


          this.load(name, asset => {
            if (!isValid(this)) return; // 验证本次加载是否有效

            if (this.removeUILoadingUuid(name, uiLoadingUuid) === false) {
              return this.hideLoading(loadingUuid);
            } // 是场景


            if (asset instanceof SceneAsset) {
              callback(this.parsingScene(asset, name), asset.scene);
              this.hideLoading(loadingUuid);
              return;
            } // 验证是否是单例(一个单例会有被同时load多次的情况，因为判断一个ui是否是单例，必须要至少实例化一个后才能获取)


            var node = this.getUIInScene(name);

            if (!isValid(node, true) || this.getBaseView(node).isSingleton === false) {
              callback(this.parsingPrefab(asset, name));
              this.hideLoading(loadingUuid);
            } else {
              callback(node);
              this.hideLoading(loadingUuid);
            }
          });
        }
        /**
         * 展示默认View
         */


        showDefault(onShow) {
          if (this.defaultUI) {
            this.show({
              name: this.defaultUI,
              data: this.defaultData,
              onShow
            });
          } else {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.ui.showToast('请先设置首界面\n在setting.ts中修改defaultUI', 100);
            onShow && onShow();
            this.warn('defaultUI不存在，请在setting.ts中修改');
          }
        }
        /**
         * 是否展示了(包括加载中和队列中)
         */


        isShow(name) {
          return !!this.getUIInShowing(name) || this.isInQueue(name) || this.isLoading(name);
        }
        /**
         * 是否在队列中
         */


        isInQueue(name) {
          return !!this.showQueue.find(v => {
            return v.name == name;
          });
        }
        /**
         * 是否在加载中
         */


        isLoading(name) {
          return this.uiLoadingMap.has(name) && this.uiLoadingMap.get(name).length > 0;
        }
        /**
         * 放入队列
         */


        putInShowQueue(data) {
          if (data.queue === 'join' || this.showQueue.length === 0) {
            this.showQueue.push(data);
          } else {
            this.showQueue.splice(1, 0, data);
          }

          if (this.showQueue.length === 1) {
            this.consumeShowQueue();
          }
        }
        /**
         * 消耗队列
         */


        consumeShowQueue() {
          if (this.showQueue.length === 0) return;
          var data = this.showQueue[0];
          this.show({
            name: data.name,
            data: data.data,
            onShow: data.onShow,
            onHide: result => {
              data.onHide && data.onHide(result);
              this.showQueue.shift();
              this.consumeShowQueue();
            },
            onError: data.onError ? (error, code) => {
              var ret = data.onError(error, code);
              this.showQueue.shift();
              this.consumeShowQueue();
              return ret;
            } : undefined,
            top: data.top,
            attr: data.attr,
            silent: data.silent
          });
        }

        showUI(params) {
          var {
            name,
            data,
            onShow,
            onHide,
            onError,
            top = true,
            attr = null,
            silent = false
          } = params;
          this.createUI(name, silent, (node, scene) => {
            if (!node) {
              this.error('show', name + " \u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u5931\u8D25"); // 「没有指定onError」或「onError返回true」会自动发起重试

              if (onError && onError(name + " \u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u5931\u8D25", UIManager.ErrorCode.LoadError) !== true) {
                return;
              }

              this.scheduleOnce(() => this.showUI(params), 1);
              if (!silent) this.showLoading(1);
              return;
            }

            !scene && top && node.setSiblingIndex(-1);
            var com = this.getBaseView(node);
            this.uiShowingMap.set(com, name);
            com.constructor.prototype.show.call(com, data, attr, // onShow
            result => {
              this.uiShowingMap.set(com, name);
              onShow && onShow(result);
            }, // onHide
            result => {
              this.uiShowingMap.delete(com);
              onHide && onHide(result);
            }, // beforeShow
            error => {
              if (error) {
                this.uiShowingMap.delete(com);
                onError && onError(error, UIManager.ErrorCode.LogicError);
              } else if ((_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
                error: Error()
              }), BaseView) : BaseView).isPage(name)) {
                this.uiShowingMap.set(com, name);
                var oldCom = this.currPage;
                this.currPage = com;

                if (isValid(oldCom, true) && oldCom !== com && oldCom.isShow) {
                  oldCom.constructor.prototype.hide.call(oldCom, {
                    name
                  });
                }

                if (scene) {
                  if (oldCom !== com) {
                    this.currScene = name;
                    director.runSceneImmediate(scene, null, () => {
                      this.log("\u5207\u6362\u573A\u666F: " + name);
                    });
                  }
                } else if (this.currScene !== UIScene) {
                  this.currScene = UIScene;

                  var _scene = new Scene(UIScene);

                  _scene.autoReleaseAssets = true;
                  director.runSceneImmediate(_scene, null, () => {
                    this.log("\u5207\u6362\u573A\u666F: " + UIScene);
                  });
                }
              }
            });
          });
        }
        /**
         * 展示一个UI
         * - 此流程一定是异步的
         */


        show(params // @ts-ignore
        ) {
          var {
            name,
            data,
            queue,
            onError,
            silent = false
          } = params; // 加入队列中

          if (queue) {
            this.putInShowQueue(params);
            return;
          }

          this.log("show: " + name); // 生成一个UI加载的UUID

          var loadingUuid = silent ? '' : this.showLoading();
          var uiLoadingUuid = this.addUILoadingUuid(name, loadingUuid); // 判断ui是否有效

          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.execute(retry => {
            this.checkUIValid(name, data, valid => {
              // 验证本次加载是否有效
              if (this.removeUILoadingUuid(name, uiLoadingUuid) === false) {
                this.hideLoading(loadingUuid);
                return;
              } // 加载失败


              if (valid === -1) {
                this.error('show', name + " \u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u5931\u8D25"); // 「没有指定onError」或「onError返回true」会自动发起重试

                if (onError && onError(name + " \u4E0D\u5B58\u5728\u6216\u52A0\u8F7D\u5931\u8D25", UIManager.ErrorCode.LoadError) !== true) {
                  return this.hideLoading(loadingUuid);
                }

                return retry(1);
              } // ui无效


              if (valid === 0) {
                this.warn('show', name + " \u65E0\u6548");
                this.uninstallUI(name);
                onError && onError(name + " \u65E0\u6548", UIManager.ErrorCode.InvalidError);
                this.hideLoading(loadingUuid);
                return;
              }

              this.showUI(params);
              this.hideLoading(loadingUuid);
            });
          });
        }
        /**
         * 展示一个UI
         * - 此流程一定是异步的
         */


        showAsync(params // @ts-ignore
        ) {
          return new Promise(resolve => {
            this.show(_extends({}, params, {
              onHide(result) {
                resolve(result);
              }

            }));
          });
        }
        /**
         * 关闭View
         * - 此流程一定是同步的
         */


        hide(_ref2 // @ts-ignore
        ) {
          var {
            name,
            data,
            onHide
          } = _ref2;
          var nodes = this.getUIInShowing(name, true);
          this.log("hide: " + name);

          if (nodes.length === 0) {
            if (!this.uiLoadingMap.has(name) || this.uiLoadingMap.get(name).length === 0) {
              return this.warn('hide', name + " \u4E0D\u5B58\u5728");
            }
          }

          if (this.uiLoadingMap.has(name)) {
            this.uiLoadingMap.get(name).forEach(loadingUuid => this.hideLoading(loadingUuid));
            this.uiLoadingMap.get(name).length = 0;
          }

          for (var index = nodes.length - 1; index >= 0; index--) {
            var node = nodes[index];
            var com = this.getBaseView(node);

            if (this.currPage === com) {
              this.currPage = null;
            }

            com.constructor.prototype.hide.call(com, data, onHide);
          }
        }
        /**
         * 从顶部关闭一个View(不会重复关闭节点)
         * - 此流程一定是同步的
         */


        pop(_ref3 // @ts-ignore
        ) {
          var {
            name,
            data,
            onHide
          } = _ref3;
          var nodes = this.getUIInShowing(name, true);

          if (this.uiLoadingMap.has(name) && this.uiLoadingMap.get(name).length) {
            var loadingUuid = this.uiLoadingMap.get(name).pop();
            this.hideLoading(loadingUuid);
            this.log("pop: " + name);
            return;
          }

          if (nodes.length) {
            var node = nodes.pop();
            var com = this.getBaseView(node);

            if (this.currPage === com) {
              this.currPage = null;
            }

            com.constructor.prototype.hide.call(com, data, onHide);
            this.log("pop: " + name);
            return;
          }

          this.warn('pop', name + " \u4E0D\u5B58\u5728");
        }
        /**
         * 从底部关闭一个View(不会重复关闭节点)
         * - 此流程一定是同步的
         */


        shift(_ref4 // @ts-ignore
        ) {
          var {
            name,
            data,
            onHide
          } = _ref4;
          var nodes = this.getUIInShowing(name, true);

          if (nodes.length) {
            var node = nodes[0];
            var com = this.getBaseView(node);

            if (this.currPage === com) {
              this.currPage = null;
            }

            com.constructor.prototype.hide.call(com, data, onHide);
            this.log("shift: " + name);
            return;
          }

          if (this.uiLoadingMap.has(name) && this.uiLoadingMap.get(name).length) {
            var loadingUuid = this.uiLoadingMap.get(name).shift();
            this.hideLoading(loadingUuid);
            this.log("shift: " + name);
            return;
          }

          this.warn('shift', name + " \u4E0D\u5B58\u5728");
        }
        /**
         * 关闭全部View
         * - 不关闭展示中的Page(加载中的会停止)
         * - 此流程一定是同步的
         */


        hideAll(_temp) {
          var {
            data,
            exclude
          } = _temp === void 0 ? {} : _temp;
          this.log('hideAll'); // 展示中的

          this.uiShowingMap.forEach((name, com) => {
            if ((_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
              error: Error()
            }), BaseView) : BaseView).isPaper(name)) return;
            if (exclude && exclude.indexOf(name) !== -1) return;
            if (com === this.currPage) return;
            com.constructor.prototype.hide.call(com, data);
          }); // 加载中的

          this.uiLoadingMap.forEach((value, name) => {
            if ((_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
              error: Error()
            }), BaseView) : BaseView).isPaper(name)) return;
            if (exclude && exclude.indexOf(name) !== -1) return;
            value.forEach(loadingUuid => this.hideLoading(loadingUuid));
            value.length = 0;
          });
        }

        showLoading(timeout) {
          if (timeout === void 0) {
            timeout = 0;
          }

          this.loading.active = true;
          this.loading.setSiblingIndex(-1);

          if (this.loading.getComponent(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
            error: Error()
          }), UIMgrLoading) : UIMgrLoading)) {
            this.loading.getComponent(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
              error: Error()
            }), UIMgrLoading) : UIMgrLoading).init();
          } else {
            var _this$loading$getComp;

            // 兼容旧版本
            (_this$loading$getComp = this.loading.getComponentInChildren(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
              error: Error()
            }), UIMgrLoading) : UIMgrLoading)) == null || _this$loading$getComp.init();
          }

          var uuid = this.createUUID();
          this.showLoadingMap.set(uuid, true);
          if (timeout > 0) this.scheduleOnce(() => {
            this.hideLoading(uuid);
          }, timeout);
          return uuid;
        }

        hideLoading(uuid) {
          if (!uuid) return;
          this.showLoadingMap.delete(uuid);

          if (this.showLoadingMap.size === 0) {
            if (this.loading.getComponent(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
              error: Error()
            }), UIMgrLoading) : UIMgrLoading)) {
              this.loading.getComponent(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
                error: Error()
              }), UIMgrLoading) : UIMgrLoading).clear();
            } else {
              var _this$loading$getComp2;

              // 兼容旧版本
              (_this$loading$getComp2 = this.loading.getComponentInChildren(_crd && UIMgrLoading === void 0 ? (_reportPossibleCrUseOfUIMgrLoading({
                error: Error()
              }), UIMgrLoading) : UIMgrLoading)) == null || _this$loading$getComp2.clear();
            }

            this.loading.active = false;
          }
        }
        /**
         * 添加触摸屏蔽
         */


        addTouchMask(timeout) {
          if (timeout === void 0) {
            timeout = 0;
          }

          this.addTouchMaskListener();
          var uuid = this.createUUID();
          this.touchMaskMap.set(uuid, true);
          if (timeout > 0) this.scheduleOnce(() => {
            this.removeTouchMask(uuid);
          }, timeout);
          return uuid;
        }
        /**
         * 移除触摸屏蔽
         * @param uuid addTouchMask的返回值
         */


        removeTouchMask(uuid) {
          if (!uuid) return;
          this.touchMaskMap.delete(uuid);
          this.removeTouchMaskListener();
        }
        /**
         * 显示Toast
         * @param message 文本
         * @param timeout 持续时间(秒)，默认2秒
         */


        showToast(message, timeout) {
          if (!this.toast) {
            return this.error('showToast', '请确认首场景中「Canvas/Manager/UIManager」的「Toast Pre」属性存在');
          }

          this.toast.setSiblingIndex(-1);
          this.toast.getComponent(_crd && UIMgrToast === void 0 ? (_reportPossibleCrUseOfUIMgrToast({
            error: Error()
          }), UIMgrToast) : UIMgrToast).add({
            message,
            timeout
          });
        }
        /**
         * 清理Toast
         */


        clearToast() {
          if (!this.toast) return;
          this.toast.getComponent(_crd && UIMgrToast === void 0 ? (_reportPossibleCrUseOfUIMgrToast({
            error: Error()
          }), UIMgrToast) : UIMgrToast).clear();
        }
        /**
         * 设置触摸是否启用
         * @param enabled 是否启用
         */


        setTouchEnabled(enabled) {
          if (enabled) {
            this.touchEnabled = true;
            this.removeTouchMaskListener();
          } else {
            this.addTouchMaskListener();
            this.touchEnabled = false;
          }

          this.warn('setTouchEnabled', this.touchEnabled);
        }
        /**
         * 在2DUI根节点上处理事件
         */


        onUserInterface() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          Node.prototype.on.apply(this.UserInterface, args);
        }
        /**
         * 在2DUI根节点上处理事件
         */


        onceUserInterface() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          Node.prototype.once.apply(this.UserInterface, args);
        }
        /**
         * 在2DUI根节点上处理事件
         */


        offUserInterface() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          Node.prototype.off.apply(this.UserInterface, args);
        }
        /**
         * 在2DUI根节点上处理事件
         */


        targetOffUserInterface() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          Node.prototype.targetOff.apply(this.UserInterface, args);
        }
        /**
         * 立即给2DUI的子节点排序
         */


        sortUserInterface(name) {
          var _this$UserInterface;

          (_this$UserInterface = this.UserInterface) == null || (_this$UserInterface = _this$UserInterface.getChildByName(name)) == null || (_this$UserInterface = _this$UserInterface.getComponent(_crd && UIMgrZOrder === void 0 ? (_reportPossibleCrUseOfUIMgrZOrder({
            error: Error()
          }), UIMgrZOrder) : UIMgrZOrder)) == null || _this$UserInterface.updateZOrder();
        }
        /**
         * 屏幕截图
         * - 需要在Director.EVENT_BEFORE_RENDER事件中调用
         * @example
         * director.once(Director.EVENT_BEFORE_RENDER, () => {
         *   const renderTexture = new RenderTexture();
         *   const size = view.getVisibleSize();
         *   renderTexture.reset({ width: size.width, height: size.height });
         *   app.manager.ui.screenshot(renderTexture);
         * });
         */


        screenshot(renderTexture, opts) {
          var cameras = (opts == null ? void 0 : opts.cameraList) || director.getScene().getComponentsInChildren(Camera);
          var cameraList = cameras.sort((a, b) => a.priority - b.priority).filter(camera => {
            if (!camera.enabledInHierarchy) return false;
            if (camera.targetTexture) return false;
            return opts != null && opts.cameraFilter ? opts.cameraFilter(camera) : true;
          });
          var cameraList2 = cameraList.map(camera => camera.camera);
          cameraList.forEach(camera => {
            camera.targetTexture = renderTexture;
          });
          director.root.pipeline.render(cameraList2);
          cameraList.forEach(camera => {
            camera.targetTexture = null;
          });
          return renderTexture;
        }

      }, _class3.setting = {}, _class3.ErrorCode = ErrorCode, _class3.ViewName = ViewName, _class3.MiniViewName = MiniViewName, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loadingPre", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "shadePre", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toastPre", [_dec4], {
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
//# sourceMappingURL=c9d1dddd4bd2b523ba9f93d19ad1f02af6a0d8e6.js.map