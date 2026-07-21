System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Button, Color, Graphics, HorizontalTextAlignment, Label, Node, UITransform, VerticalTextAlignment, Widget, _decorator, BaseView, bindStore, app, platformService, tiktokRequiredFeatures, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, PageHome;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "../../../../../../extensions/app/assets/base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMiniViewNames(extras) {
    _reporterNs.report("IMiniViewNames", "../../../../../app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfbindStore(extras) {
    _reporterNs.report("bindStore", "db://assets/pkg-export/@gamex/cc-store", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfplatformService(extras) {
    _reporterNs.report("platformService", "db://assets/app/platform", _context.meta, extras);
  }

  function _reportPossibleCrUseOftiktokRequiredFeatures(extras) {
    _reporterNs.report("tiktokRequiredFeatures", "db://assets/app/tiktok.required", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Button = _cc.Button;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      HorizontalTextAlignment = _cc.HorizontalTextAlignment;
      Label = _cc.Label;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      VerticalTextAlignment = _cc.VerticalTextAlignment;
      Widget = _cc.Widget;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      BaseView = _unresolved_2.default;
    }, function (_unresolved_3) {
      bindStore = _unresolved_3.bindStore;
    }, function (_unresolved_4) {
      app = _unresolved_4.app;
    }, function (_unresolved_5) {
      platformService = _unresolved_5.platformService;
    }, function (_unresolved_6) {
      tiktokRequiredFeatures = _unresolved_6.tiktokRequiredFeatures;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3c964M12+1GMbfDio3xbSyK", "PageHome", undefined);

      __checkObsolete__(['Button', 'Color', 'Graphics', 'HorizontalTextAlignment', 'Label', 'Node', 'UITransform', 'VerticalTextAlignment', 'Widget', '_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PageHome", PageHome = (_dec = ccclass('PageHome'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec(_class = (_class2 = class PageHome extends (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
        error: Error()
      }), BaseView) : BaseView) {
        constructor(...args) {
          super(...args);
          // 子界面列表，数组顺序为子界面排列顺序
          this.miniViews = [];

          _initializerDefineProperty(this, "btnStart", _descriptor, this);

          _initializerDefineProperty(this, "tili", _descriptor2, this);

          _initializerDefineProperty(this, "level", _descriptor3, this);

          _initializerDefineProperty(this, "settingBtn", _descriptor4, this);

          _initializerDefineProperty(this, "btnShare", _descriptor5, this);

          _initializerDefineProperty(this, "btnShouChang", _descriptor6, this);

          _initializerDefineProperty(this, "specialDesc", _descriptor7, this);

          this.tiktokEntries = null;
        }

        // 初始化的相关逻辑写在这
        onLoad() {
          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.tili, 'string', () => {
            return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.tili.toString();
          });
          (_crd && bindStore === void 0 ? (_reportPossibleCrUseOfbindStore({
            error: Error()
          }), bindStore) : bindStore)(this.level, 'string', () => {
            return '第' + (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).store.game.level.toString() + '关';
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.sound.playMusic({
            name: 'music/bgm',
            volume: 0.7,
            force: false
          });
          this.createTikTokRequiredEntries();
        } // 点击设置按钮


        onClickSetting() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PopSetting',
            data: {
              isHome: true
            }
          });
        } // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)


        onShow(params) {
          this.showMiniViews({
            views: this.miniViews
          });
          this.btnStart.on(Node.EventType.TOUCH_END, this.onClickStart, this);
          this.settingBtn.on(Node.EventType.TOUCH_END, this.onClickSetting, this);
          this.btnShare.on(Node.EventType.TOUCH_END, this.onClickShare, this);
          this.btnShouChang.on(Node.EventType.TOUCH_END, this.onClickShouChang, this); //创意关卡

          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.getLevel() > 5) {
            this.specialDesc.active = false;
          }
        } // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)


        onHide(result) {
          // app.manager.ui.show<PageHome>({name: 'PageHome', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
          return result;
        }

        onClickStart() {
          // 检查是否有足够的体力
          if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.tili < 1) {
            // app.manager.ui.showToast('体力不足');
            // 展示体力不足的弹窗
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: 'PopResult',
              data: {
                TiLiDialog: true
              }
            });
            return;
          } // 消耗1个体力


          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.setTiLi((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).store.game.tili - 1);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.globaldata.setIsSpecialLevel(false);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PageMain'
          });
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.emit((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart);
        } // 点击分享按钮


        onClickShare() {
          (_crd && platformService === void 0 ? (_reportPossibleCrUseOfplatformService({
            error: Error()
          }), platformService) : platformService).share({
            title: (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).config.localkey.ShareMsg
          });
        } // 点击使用说明按钮


        onClickShouChang() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.show({
            name: 'PopResult',
            data: {
              ShouChangDialog: true
            }
          });
        }

        createTikTokRequiredEntries() {
          var _this$tiktokEntries;

          if (!(_crd && tiktokRequiredFeatures === void 0 ? (_reportPossibleCrUseOftiktokRequiredFeatures({
            error: Error()
          }), tiktokRequiredFeatures) : tiktokRequiredFeatures).shouldShowEntries || (_this$tiktokEntries = this.tiktokEntries) != null && _this$tiktokEntries.isValid) return;
          const panel = new Node('TikTokRequiredEntries');
          panel.layer = this.node.layer;
          panel.addComponent(UITransform).setContentSize(250, 180);
          this.node.addChild(panel);
          const widget = panel.addComponent(Widget);
          widget.isAlignLeft = true;
          widget.left = 18;
          widget.isAlignTop = true;
          widget.top = 230;
          widget.updateAlignment();
          this.createTikTokEntryButton(panel, 'HomeReward', 'Home Reward  +3 Energy', 46, new Color(31, 166, 114, 255), () => this.onClickTikTokShortcut());
          this.createTikTokEntryButton(panel, 'RevisitReward', 'Revisit Reward  +2 Energy', -46, new Color(254, 44, 85, 255), () => this.onClickTikTokRevisit());
          this.tiktokEntries = panel;
        }

        createTikTokEntryButton(parent, name, text, y, color, onClick) {
          const buttonNode = new Node(name);
          buttonNode.layer = this.node.layer;
          parent.addChild(buttonNode);
          buttonNode.setPosition(0, y);
          buttonNode.addComponent(UITransform).setContentSize(230, 70);
          const background = buttonNode.addComponent(Graphics);
          background.fillColor = color;
          background.roundRect(-115, -35, 230, 70, 16);
          background.fill();
          const button = buttonNode.addComponent(Button);
          button.transition = Button.Transition.SCALE;
          button.zoomScale = 0.96;
          button.duration = 0.08;
          buttonNode.on(Node.EventType.TOUCH_END, onClick, this);
          const labelNode = new Node(`${name}Label`);
          labelNode.layer = this.node.layer;
          buttonNode.addChild(labelNode);
          labelNode.addComponent(UITransform).setContentSize(210, 56);
          const label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = 21;
          label.lineHeight = 26;
          label.color = Color.WHITE;
          label.horizontalAlign = HorizontalTextAlignment.CENTER;
          label.verticalAlign = VerticalTextAlignment.CENTER;
          label.overflow = Label.Overflow.SHRINK;
        }

        async onClickTikTokShortcut() {
          const result = await (_crd && tiktokRequiredFeatures === void 0 ? (_reportPossibleCrUseOftiktokRequiredFeatures({
            error: Error()
          }), tiktokRequiredFeatures) : tiktokRequiredFeatures).runShortcutMission();
          if (result.status !== 'rewarded') (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.showToast(result.message);
        }

        async onClickTikTokRevisit() {
          const result = await (_crd && tiktokRequiredFeatures === void 0 ? (_reportPossibleCrUseOftiktokRequiredFeatures({
            error: Error()
          }), tiktokRequiredFeatures) : tiktokRequiredFeatures).runRevisitMission();
          if (result.status !== 'rewarded') (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.showToast(result.message);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnStart", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tili", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "level", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "settingBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnShare", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnShouChang", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "specialDesc", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3a2e4c22b523a8ecbb1b222d583e528f9ba82e6b.js.map