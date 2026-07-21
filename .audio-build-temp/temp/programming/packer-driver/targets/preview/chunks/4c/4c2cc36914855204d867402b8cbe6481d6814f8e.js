System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, Enum, Font, Node, Scene, SpriteFrame, UITransform, Widget, _decorator, director, isValid, js, sp, DEV, EDITOR, Core, Logger, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _crd, ccclass, property, disallowMultiple, BlockEvents, HideEvent, ViewType, ViewState, Group, PaperAllToOwner, BaseView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfIMiniViewName(extras) {
    _reporterNs.report("IMiniViewName", "../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMiniViewNames(extras) {
    _reporterNs.report("IMiniViewNames", "../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIViewName(extras) {
    _reporterNs.report("IViewName", "../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLogger(extras) {
    _reporterNs.report("Logger", "../lib/logger/logger", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBaseControl(extras) {
    _reporterNs.report("IBaseControl", "./BaseControl", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBaseController(extras) {
    _reporterNs.report("IBaseController", "./BaseController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
      Enum = _cc.Enum;
      Font = _cc.Font;
      Node = _cc.Node;
      Scene = _cc.Scene;
      SpriteFrame = _cc.SpriteFrame;
      UITransform = _cc.UITransform;
      Widget = _cc.Widget;
      _decorator = _cc._decorator;
      director = _cc.director;
      isValid = _cc.isValid;
      js = _cc.js;
      sp = _cc.sp;
    }, function (_ccEnv) {
      DEV = _ccEnv.DEV;
      EDITOR = _ccEnv.EDITOR;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      Logger = _unresolved_3.Logger;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "eddc0QRQjlCPYcQd/35Kv/C", "BaseView", undefined);

      __checkObsolete__(['Asset', 'Component', 'Enum', 'EventTouch', 'Font', 'Label', 'Node', 'Scene', 'Sprite', 'SpriteFrame', 'UITransform', 'Widget', '_decorator', 'director', 'isValid', 'js', 'sp']);

      ({
        ccclass,
        property,
        disallowMultiple
      } = _decorator);
      BlockEvents = [Node.EventType.TOUCH_START, Node.EventType.TOUCH_MOVE, Node.EventType.TOUCH_END, Node.EventType.TOUCH_CANCEL, Node.EventType.MOUSE_DOWN, Node.EventType.MOUSE_MOVE, Node.EventType.MOUSE_UP, Node.EventType.MOUSE_ENTER, Node.EventType.MOUSE_LEAVE, Node.EventType.MOUSE_WHEEL];
      HideEvent = Enum({
        destroy: 1,
        active: 2
      });

      _export("ViewType", ViewType = /*#__PURE__*/function (ViewType) {
        ViewType["Page"] = "Page";
        ViewType["Paper"] = "Paper";
        ViewType["PaperAll"] = "PaperAll";
        ViewType["Pop"] = "Pop";
        ViewType["Top"] = "Top";
        return ViewType;
      }({}));

      ViewState = /*#__PURE__*/function (ViewState) {
        ViewState[ViewState["BeforeShow"] = 0] = "BeforeShow";
        ViewState[ViewState["Showing"] = 1] = "Showing";
        ViewState[ViewState["Showed"] = 2] = "Showed";
        ViewState[ViewState["BeforeHide"] = 3] = "BeforeHide";
        ViewState[ViewState["Hiding"] = 4] = "Hiding";
        ViewState[ViewState["Hid"] = 5] = "Hid";
        return ViewState;
      }(ViewState || {});

      Group = {
        id: 'BaseView',
        name: 'Settings',
        displayOrder: -Infinity,
        style: 'section'
      }; // 记录PaperAll的owner

      PaperAllToOwner = new Map();

      _export("default", BaseView = (_dec = ccclass('BaseView'), _dec2 = disallowMultiple(), _dec3 = property({
        group: Group,
        type: HideEvent,
        tooltip: '何种模式隐藏节点\n1、destroy: 销毁UI并释放对应的所有资源\n2、active: 缓存UI并加速下次的打开速度'
      }), _dec4 = property({
        group: Group,
        tooltip: '是否是单例模式\n1、单例模式: UI只会被创建一次(onShow会被重复触发)\n2、非单例模式: UI会被重复创建'
      }), _dec5 = property({
        group: Group,
        tooltip: '是否捕获焦点<响应onLostFocus和onFocus>\n1、当一个捕获焦点的UI处于最上层并展示时\n下层的UI永远不会响应focus事件',

        visible() {
          if (this.is3D()) return false;
          return true;
        }

      }), _dec6 = property({
        group: Group,
        tooltip: '是否需要底层遮罩',

        visible() {
          if (this.is3D()) return false;
          if (this.isPage()) return false;
          return true;
        }

      }), _dec7 = property({
        group: Group,
        tooltip: '是否禁止点击事件向下层传递',

        visible() {
          if (this.is3D()) return false;
          return true;
        }

      }), _dec(_class = _dec2(_class = (_class2 = (_class3 = class BaseView extends Component {
        constructor() {
          super(...arguments);
          // 是否被调用过
          this._base_view_created = false;
          // view状态
          this._base_view_state = ViewState.Hid;
          // 当前view的名字
          this._base_view_name = js.getClassName(this);
          // 触摸是否有效
          this._base_touch_enable = true;
          // show/hide等待列表
          this._base_show_hide_delays = [];
          // 子界面融合相关
          this._base_mini_show = new Set();

          _initializerDefineProperty(this, "_hideEvent", _descriptor, this);

          _initializerDefineProperty(this, "_singleton", _descriptor2, this);

          _initializerDefineProperty(this, "_captureFocus", _descriptor3, this);

          _initializerDefineProperty(this, "_shade", _descriptor4, this);

          _initializerDefineProperty(this, "_blockInput", _descriptor5, this);

          /**
           * 子界面(只能用于Page)
           */
          this.miniViews = [];
        }

        /**
         * @deprecated 废弃，请使用BindController代替BindControl
         */
        static BindControl(Control) {
          return class BindControl extends BaseView {
            get control() {
              return Control ? Control.inst : null;
            }

          };
        }
        /**
         * 给UI绑定一个控制器，绑定后可以通过this.controller访问，并能访问一些内部方法(emit、on、once、off、targetOff)
         */


        static BindController(Controller) {
          var _dec8, _class4;

          var BindController = (_dec8 = disallowMultiple(), _dec8(_class4 = class BindController extends BaseView {
            get controller() {
              return Controller ? Controller.inst : null;
            }

          }) || _class4);
          return BindController;
        }
        /**
         * 是否有效，如果返回false的话，app.manager.ui.show会触发onError回调
         */


        static isViewValid(next, data) {
          data;
          next && next(true);
        }

        static isPage(name) {
          return name.indexOf(ViewType.Page) === 0;
        }

        static isPaper(name) {
          return name.indexOf(ViewType.Paper) === 0;
        }

        static isPaperAll(name) {
          return name.indexOf(ViewType.PaperAll) === 0;
        }

        static isPop(name) {
          return name.indexOf(ViewType.Pop) === 0;
        }

        static isTop(name) {
          return name.indexOf(ViewType.Top) === 0;
        }

        isPage() {
          return BaseView.isPage(this._base_view_name);
        }

        isPaper() {
          return BaseView.isPaper(this._base_view_name);
        }

        isPaperAll() {
          return BaseView.isPaperAll(this._base_view_name);
        }

        isPop() {
          return BaseView.isPop(this._base_view_name);
        }

        isTop() {
          return BaseView.isTop(this._base_view_name);
        }

        is2D() {
          return !this.is3D();
        }

        is3D() {
          if (this.node.parent instanceof Scene) {
            return this.node.parent.name === this.viewName;
          }

          var scene = director.getScene();
          return scene.name === this.viewName;
        }

        get hideEvent() {
          if (this.is3D()) return HideEvent.destroy;
          return this._hideEvent;
        }

        set hideEvent(value) {
          if (this.is3D() && value !== HideEvent.destroy) {
            this.log('3D模式下只能是destroy模式');
            return;
          }

          this._hideEvent = value;
        }

        get singleton() {
          if (this.isPage()) return true;
          if (this.isPaperAll()) return true;
          if (this.isPaper()) return true;
          return this._singleton && this.constructor._singleton;
        }

        set singleton(value) {
          if (!value) {
            if (this.isPage()) {
              this.log('Page只能是单例模式');
              return;
            }

            if (this.isPaper()) {
              this.log('Paper只能是单例模式');
              return;
            }
          }

          this._singleton = this.constructor._singleton = !!value;
        }

        get captureFocus() {
          if (this.is3D()) return false;
          return this._captureFocus;
        }

        set captureFocus(value) {
          if (value && this.is3D()) {
            this.log('只有2D模式下才可以捕获焦点');
            return;
          }

          if (!EDITOR && this._captureFocus !== value) {
            var _inst;

            this._captureFocus = value;
            (_inst = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst) == null || (_inst = _inst.manager) == null || (_inst = _inst.ui) == null || _inst.refreshShade();
          } else {
            this._captureFocus = value;
          }
        }

        get shade() {
          if (this.is3D()) return false;
          if (this.isPage()) return false;
          return this._shade;
        }

        set shade(value) {
          if (value) {
            if (this.is3D()) {
              this.log('只有2D模式下才可以设置底层遮罩');
              return;
            }

            if (this.isPage()) {
              this.log('Page不可以设置底层遮罩');
              return;
            }
          }

          if (!EDITOR && this._shade !== value) {
            var _inst2;

            this._shade = value;
            (_inst2 = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst) == null || (_inst2 = _inst2.manager) == null || (_inst2 = _inst2.ui) == null || _inst2.refreshShade();
          } else {
            this._shade = value;
          }
        }

        get blockInput() {
          if (this.is3D()) return false;
          return this._blockInput;
        }

        set blockInput(value) {
          if (value && this.is3D()) {
            this.log('只有2D模式下才可以设置阻断点击事件');
            return;
          }

          this._blockInput = value;
        }

        /**
         * 当前view名字
         */
        get viewName() {
          return this._base_view_name;
        }
        /**
         * 基础名字, 如PageHome => Home
         */


        get baseName() {
          return this._base_view_name.slice(this.typeName.length);
        }
        /**
         * 类型名字, 如PageHome => Page
         */


        get typeName() {
          if (this._base_view_name.indexOf(ViewType.Paper) === 0) return ViewType.Paper;
          if (this._base_view_name.indexOf(ViewType.Pop) === 0) return ViewType.Pop;
          if (this._base_view_name.indexOf(ViewType.Top) === 0) return ViewType.Top;
          return ViewType.Page;
        }
        /**
         * 是否是单例模式
         */


        get isSingleton() {
          return this.singleton;
        }
        /**
         * 是否捕获焦点
         */


        get isCaptureFocus() {
          return this.captureFocus;
        }
        /**
         * 是否需要遮罩
         */


        get isNeedShade() {
          return this.shade;
        }
        /**
         * 是否展示了(不为Hid状态)
         */


        get isShow() {
          return this._base_view_state != ViewState.Hid;
        }
        /**
         * 是否show了某个子界面
         */


        isMiniViewShow(name) {
          return this._base_mini_show.has(name);
        } // 用来初始化组件或节点的一些属性，当该组件被第一次添加到节点上或用户点击了它的 Reset 菜单时调用。这个回调只会在编辑器下调用。


        resetInEditor() {
          if (EDITOR) {
            var is3D = this.is3D();

            if (this.viewName.indexOf(ViewType.Page) >= 0) {
              this.shade = false;
              this.blockInput = is3D ? false : true;
              this.captureFocus = is3D ? false : true;
            } else if (this.viewName.indexOf(ViewType.Paper) >= 0) {
              this.shade = false;
              this.captureFocus = false;
              this.blockInput = false;
            }

            if (is3D) return;
            this.node.getComponent(UITransform) || this.node.addComponent(UITransform);
            var widget = this.node.getComponent(Widget) || this.node.addComponent(Widget);
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
        }
        /**
         * 设置是否可点击
         */


        setTouchEnabled(enabled) {
          if (enabled === void 0) {
            enabled = true;
          }

          this._base_touch_enable = !!enabled;
        }

        blockPropagation(event) {
          if (this.blockInput) {
            event.propagationStopped = true;

            if (event.type === Node.EventType.TOUCH_START) {
              this.log('阻断触摸向下层传递');
            }
          }
        }

        stopPropagation(event) {
          if (!this._base_touch_enable) {
            event.propagationStopped = true;
            event.propagationImmediateStopped = true;

            if (event.type === Node.EventType.TOUCH_START) {
              this.log('屏蔽触摸');
            }
          }
        }

        onBaseViewCreate() {
          var _this = this;

          if (this.is3D()) return;
          var uiTransform = this.getComponent(UITransform);
          if (uiTransform) uiTransform.hitTest = function () {
            if (_this.blockInput) {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return UITransform.prototype.hitTest.apply(uiTransform, args);
            }

            return false;
          };

          for (var i = 0; i < BlockEvents.length; i++) {
            this.node.on(BlockEvents[i], this.blockPropagation, this);
            this.node.on(BlockEvents[i], this.stopPropagation, this, true);
          }
        }
        /**
         * 关闭所有子界面
         */


        hideAllMiniViews(data) {
          this._base_mini_show.forEach(name => {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.ui.hide({
              name,
              data
            });
          });

          this._base_mini_show.clear();
        }
        /**
         * 关闭子界面
         */


        hideMiniViews(_ref) {
          var {
            data,
            views
          } = _ref;
          if (this.miniViews.length === 0) return;
          if (views.length === 0) return;
          views.forEach(name => {
            if (this.miniViews.indexOf(name) === -1) {
              this.warn('hideMiniViews', name + "\u4E0D\u5728miniViews\u4E2D, \u5DF2\u8DF3\u8FC7");
              return;
            } // 验证


            if (!this._base_mini_show.has(name)) return; // 关闭

            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.ui.hide({
              name,
              data
            });
          }); // TODO 手动刷新一下Paper下的UI顺序(原因是原生环境，显示层级正确但触摸层级可能会不正确)

          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.sortUserInterface('Paper');
        }
        /**
         * 展示子界面
         */


        showMiniViews(_ref2) {
          var _this2 = this;

          var {
            data,
            views,
            onShow,
            onHide,
            onFinish
          } = _ref2;
          if (views.length === 0) return false;

          if (this.typeName !== ViewType.Page) {
            this.warn('showMiniViews', '仅支持Page类型');
            return false;
          }

          var task = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createSync();

          var _loop = function _loop() {
            var names = views[index];

            if (names instanceof Array) {
              task.add(next => {
                _this2.createMixMiniViewsTask(names, data, onShow, onHide).start(next);
              });
            } else {
              task.add(next => {
                _this2.createMixMiniViewsTask([names], data, onShow, onHide).start(next);
              });
            }
          };

          for (var index = 0; index < views.length; index++) {
            _loop();
          }

          task.start(onFinish && function () {
            onFinish();
          });
          return true;
        }
        /**
         * 创建自定义加载任务
         */


        createMixMiniViewsTask(views, data, _onShow, _onHide) {
          if (views === void 0) {
            views = [];
          }

          var task = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.lib.task.createSync();

          if (this.typeName !== ViewType.Page) {
            this.warn('showMiniViews', '仅支持Page类型');
            return task;
          }

          views = views.filter(name => {
            if (!name) {
              this.warn('showMiniViews', 'name不能为空');
              return false;
            }

            if (this._base_mini_show.has(name)) {
              this.warn('showMiniViews', "\u91CD\u590D\u878D\u5408" + name + ", \u5DF2\u8DF3\u8FC7");
              return false;
            }

            if (this.miniViews.indexOf(name) === -1) {
              this.warn('showMiniViews', name + "\u4E0D\u5728miniViews\u4E2D, \u5DF2\u8DF3\u8FC7");
              return false;
            }

            if (name.indexOf(this.baseName) !== ViewType.Paper.length && name.indexOf(ViewType.PaperAll) !== 0) {
              this.warn('showMiniViews', name + "\u4E0D\u5C5E\u4E8E\u5F53\u524DPage, \u5DF2\u8DF3\u8FC7");
              return false;
            }

            this._base_mini_show.add(name);

            return true;
          });
          if (views.length === 0) return task; // 先load全部

          task.add(next => {
            var aSync = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.lib.task.createASync();
            views.forEach(name => {
              aSync.add((next, retry) => {
                this.log("\u4E0B\u8F7D\u5B50\u9875\u9762: " + name);
                (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.ui.load(name, result => {
                  result ? next() : this.scheduleOnce(retry, 0.1);
                });
              });
            });
            aSync.start(next);
          }); // 再show全部

          task.add(next => {
            var aSync = (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.lib.task.createASync();
            views.forEach(name => {
              aSync.add(next => {
                var _this$_base_mini_show;

                if (!((_this$_base_mini_show = this._base_mini_show) != null && _this$_base_mini_show.has(name))) return next();
                this.log("\u5C55\u793A\u5B50\u9875\u9762: " + name); // 是PaperAll,设置owner

                if (BaseView.isPaperAll(name)) {
                  PaperAllToOwner.set(name, this.uuid);
                }

                (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.ui.show({
                  name,
                  data,
                  silent: true,
                  attr: {
                    zIndex: this.miniViews.indexOf(name)
                  },
                  onShow: result => {
                    if (_onShow) _onShow(name, result);
                    next();
                  },
                  onHide: result => {
                    var _this$_base_mini_show2;

                    if (BaseView.isPaperAll(name)) {
                      // 验证PaperAll是否属于当前Page
                      var owner = PaperAllToOwner.get(name);

                      if (owner && owner === this.uuid) {
                        PaperAllToOwner.delete(name);
                      }
                    }

                    (_this$_base_mini_show2 = this._base_mini_show) == null || _this$_base_mini_show2.delete(name);
                    if (_onHide) _onHide(name, result);
                  },
                  onError: (result, code) => {
                    var _this$_base_mini_show3;

                    if (code === (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                      error: Error()
                    }), Core) : Core).inst.Manager.UI.ErrorCode.LoadError) return true;

                    if (BaseView.isPaperAll(name)) {
                      // 验证PaperAll是否属于当前Page
                      var owner = PaperAllToOwner.get(name);

                      if (owner && owner === this.uuid) {
                        PaperAllToOwner.delete(name);
                        (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                          error: Error()
                        }), Core) : Core).inst.manager.ui.hide({
                          name
                        });
                      }
                    }

                    (_this$_base_mini_show3 = this._base_mini_show) == null || _this$_base_mini_show3.delete(name);
                    this.warn('忽略子页面', name, result);
                    next();
                  }
                });
              });
            });
            aSync.start(() => {
              // TODO 手动刷新一下Paper下的UI顺序(原因是原生环境，显示层级正确但触摸层级可能会不正确)
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.sortUserInterface('Paper');
              next();
            });
          });
          return task;
        }
        /**
         * 设置节点属性
         */


        setNodeAttr(attr) {
          if (!attr) return;

          if (typeof attr.zIndex === 'number') {
            // 以z坐标来代替2.x时代的zIndex
            this.node.setPosition(this.node.position.x, this.node.position.y, attr.zIndex);
          }

          if (typeof attr.siblingIndex === 'number') {
            this.node.setSiblingIndex(attr.siblingIndex);
          }
        }

        show(data, attr, onShow, onHide, beforeShow) {
          // 当前show操作需要等待其它流程
          if (this._base_view_state !== ViewState.Showed && this._base_view_state !== ViewState.Hid) {
            this._base_show_hide_delays.push(this.show.bind(this, data, attr, onShow, onHide, beforeShow));

            return;
          } // show流程


          var changeState = this._base_view_state === ViewState.Hid;
          if (changeState) this._base_view_state = ViewState.BeforeShow;

          var next = error => {
            if (!error) {
              // 所有Paper只会是单例，而且所有Paper都不允许被当前Page重复show
              // 但PaprAll比较特殊，会被不同的Page使用，在PaperAll被不同的Page重复show时，清除之前的onHide
              if (this.isPaperAll()) this.node.emit('onHide');
            }

            beforeShow && beforeShow(error);

            if (!error) {
              // 设置展示中
              if (changeState) this._base_view_state = ViewState.Showing;
              onHide && this.node.once('onHide', onHide); // 触发onCreate

              if (this._base_view_created === false) {
                this._base_view_created = true;
                this.onBaseViewCreate();
              } // 设置属性


              this.setNodeAttr(attr); // 触发onLoad、onEnable

              if (this.node.active !== true) {
                this.node.active = true;
              }

              this.log('onShow');
              var _result = null;

              try {
                _result = this.onShow(data);
              } catch (err) {
                this.onError();
                console.error(err);
              } // 设置遮罩，触发focus逻辑


              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.refreshShade();

              try {
                onShow && onShow(_result);
                this.node.emit('onShow', _result);
                (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.ui.emit(this._base_view_name, {
                  event: 'onShow',
                  result: _result
                });
                (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                  error: Error()
                }), Core) : Core).inst.manager.ui.emit('onShow', {
                  name: this._base_view_name,
                  result: _result
                });
              } catch (err) {
                console.error(err);
              }

              if (changeState) this._base_view_state = ViewState.Showed;
            } else {
              if (changeState) this._base_view_state = ViewState.Hid;
            }

            if (this._base_show_hide_delays.length > 0) {
              this._base_show_hide_delays.shift()();
            }
          };

          this.log('beforeShow');
          var isNextCalled = false;
          this.beforeShow(error => {
            if (isNextCalled) return this.error('beforeShow', 'next被重复调用');
            isNextCalled = true;
            next(error || null);
          }, data);
        }

        hide( //@ts-ignore
        data, onHide) {
          // 当前hide操作需要等待其它流程
          if (this._base_view_state !== ViewState.Hid && this._base_view_state !== ViewState.Showed) {
            this._base_show_hide_delays.push(this.hide.bind(this, data, onHide));

            return;
          } // hide流程


          var changeState = this._base_view_state === ViewState.Showed;
          if (changeState) this._base_view_state = ViewState.BeforeHide;
          this.log('beforeHide');
          var error = this.beforeHide(data);

          if (!error) {
            this.log('onHide');
            if (changeState) this._base_view_state = ViewState.Hiding;
            this.hideAllMiniViews(data);
            var _result2 = null;

            try {
              _result2 = this.onHide(data);
            } catch (error) {
              console.error(error);
            }

            try {
              onHide && onHide(_result2);
              this.node.emit('onHide', _result2);
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.emit(this._base_view_name, {
                event: 'onHide',
                result: _result2
              });
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.emit('onHide', {
                name: this._base_view_name,
                result: _result2
              });
            } catch (error) {
              console.error(error);
            }

            if (changeState) this._base_view_state = ViewState.Hid;

            if (this.hideEvent === HideEvent.active) {
              this.node.active = false;
            } else if (this.hideEvent === HideEvent.destroy) {
              (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
                error: Error()
              }), Core) : Core).inst.manager.ui.release(this);
            }

            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.ui.refreshShade();
          } else {
            if (changeState) this._base_view_state = ViewState.Showed;
          }

          if (this._base_show_hide_delays.length > 0) {
            this._base_show_hide_delays.shift()();
          }
        }

        focus(boo) {
          var result = null;
          var event = '';

          if (boo) {
            result = this.onFocus();
            event = 'onFocus';
          } else {
            result = this.onLostFocus();
            event = 'onLostFocus';
          }

          this.node.emit(event, result);
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.emit(this._base_view_name, {
            event: event,
            result: result
          });
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.emit(event, {
            name: this._base_view_name,
            result: result
          });
        }
        /**
         * 加载UI目录下resources里面的资源
         * @param path 相对于resources的路径
         * @param callback 回调
         * this.loadRes('Bag', Prefab, function(asset){})
         */


        loadRes(path, type, callback) {
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.loadRes(this, path, type, callback);
        }
        /**
         * 预加载UI目录下resources里面的资源
         * @param path 相对于resources的路径
         * this.preloadRes('Bag', Prefab)
         */


        preloadRes(path, type) {
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.preloadRes(this, path, type);
        }
        /**
         * 加载UI目录下resources里面的资源
         * @param path 相对于resources的路径
         * @param callback 回调
         * this.loadResDir('Bag', Prefab, function(asset){})
         */


        loadResDir(path, type, callback) {
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.loadResDir(this, path, type, callback);
        }
        /**
         * 预加载UI目录下resources里面的资源
         * @param path 相对于resources的路径
         * this.preloadResDir('Bag', Prefab)
         */


        preloadResDir(path, type) {
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.ui.preloadResDir(this, path, type);
        }
        /**
         * 设置字体资源
         * @param path UI的resources目录下的相对路径
         */


        setFont(target, path, onComplete) {
          this.loadRes(path, Font, font => {
            if (!font || !isValid(target)) {
              return onComplete && onComplete(false);
            }

            target.font = font;
            onComplete && onComplete(true);
          });
        }
        /**
         * 设置Spine资源
         * @param path UI的resources目录下的相对路径
         */


        setSpine(target, path, onComplete) {
          this.loadRes(path, sp.SkeletonData, skeletonData => {
            if (!skeletonData || !isValid(target)) {
              return onComplete && onComplete(false);
            }

            target.skeletonData = skeletonData;
            onComplete && onComplete(true);
          });
        }
        /**
         * 设置图片资源
         * @param path UI的resources目录下的相对路径(必须以/spriteFrame结尾)
         * 
         * @example
         * setSprite(sprite, 'img/a/spriteFrame', onComplete:(succ)=>{})
         */


        setSprite(target, path, onComplete) {
          this.loadRes(path, SpriteFrame, spriteFrame => {
            if (!spriteFrame || !isValid(target)) {
              return onComplete && onComplete(false);
            }

            target.spriteFrame = spriteFrame;
            onComplete && onComplete(true);
          });
        }
        /**打印日志 */


        get log() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('log', '#1e90ff', DEV ? "[" + this._base_view_name + "] LOG" : "[" + this._base_view_name + "] [LOG]");
        }
        /**打印警告 */


        get warn() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('warn', '#ff7f50', DEV ? "[" + this._base_view_name + "] WARN" : "[" + this._base_view_name + "] [WARN]");
        }
        /**打印错误 */


        get error() {
          return (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
            error: Error()
          }), Logger) : Logger).create('error', '#ff4757', DEV ? "[" + this._base_view_name + "] ERROR" : "[" + this._base_view_name + "] [ERROR]");
        } //////////////以下为可重写//////////////

        /**
        * 展示
        * @param data 传递给onShow的参数
        * @returns 
        */


        onShow(data) {
          return data;
        }
        /**
         * 隐藏
         * @param data 传递给onHide的参数
         * @returns 
         */


        onHide(data) {
          return data;
        }
        /**
         * 失去焦点
         * @returns 
         */


        onLostFocus() {
          return true;
        }
        /**
         * 获得焦点
         * @returns 
         */


        onFocus() {
          return true;
        }
        /**
         * onShow前调用
         * @param next 回调，传递的error不为空时，表示错误，onShow不会执行
         * @param data 传递给onShow的参数
         */


        beforeShow(next, data) {
          next(null);
        }
        /**
         * hide前调用
         * @param data 传递给onHide的参数
         * @returns 如果返回字符串，则表示错误信息
         */


        beforeHide(data) {
          return null;
        }
        /**
         * onShow报错会执行
         */


        onError() {
          return;
        }
        /**
         * 背景遮照的参数
         */


        onShade() {
          return {};
        }

      }, _class3._singleton = true, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_hideEvent", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return HideEvent.destroy;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "hideEvent", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "hideEvent"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_singleton", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "singleton", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "singleton"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_captureFocus", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "captureFocus", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "captureFocus"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_shade", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "shade", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "shade"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_blockInput", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "blockInput", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "blockInput"), _class2.prototype)), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4c2cc36914855204d867402b8cbe6481d6814f8e.js.map