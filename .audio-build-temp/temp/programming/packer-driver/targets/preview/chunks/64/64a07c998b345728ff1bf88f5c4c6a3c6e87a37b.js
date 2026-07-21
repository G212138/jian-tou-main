System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, BaseView, app, FailDialog, adManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, PopResult;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "../../../../../../extensions/app/assets/base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFailDialog(extras) {
    _reporterNs.report("FailDialog", "./expansion/FailDialog", _context.meta, extras);
  }

  function _reportPossibleCrUseOfadManager(extras) {
    _reporterNs.report("adManager", "db://assets/app/tiktok.ads", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      BaseView = _unresolved_2.default;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      FailDialog = _unresolved_4.FailDialog;
    }, function (_unresolved_5) {
      adManager = _unresolved_5.adManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "77c6bD2eqxG1ros8FIDKCWl", "PopResult", undefined);

      __checkObsolete__(['_decorator', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PopResult", PopResult = (_dec = ccclass('PopResult'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec(_class = (_class2 = class PopResult extends (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
        error: Error()
      }), BaseView) : BaseView) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "noTimeNode", _descriptor, this);

          _initializerDefineProperty(this, "noGameHeartNode", _descriptor2, this);

          _initializerDefineProperty(this, "reStartNode", _descriptor3, this);

          _initializerDefineProperty(this, "ShouChangDialogNode", _descriptor4, this);

          _initializerDefineProperty(this, "SuccessDialog", _descriptor5, this);

          _initializerDefineProperty(this, "TiLiDialog", _descriptor6, this);

          this._noTime = false;
          this._noGameHeart = false;
        }

        // 初始化的相关逻辑写在这
        onLoad() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on("ShowRestartDialog", this.showRestart, this);
        } // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)


        onShow(params) {
          if (params) {
            if (params.noTime) {
              this._noTime = true;
              this.noTimeNode.active = true;
              this.reStartNode.active = false;
              this.noGameHeartNode.active = false;
              this.ShouChangDialogNode.active = false;
              this.SuccessDialog.active = false;
              this.TiLiDialog.active = false;
            }

            if (params.noGameHeart) {
              this._noGameHeart = true;
              this.noGameHeartNode.active = true;
              this.reStartNode.active = false;
              this.noTimeNode.active = false;
              this.ShouChangDialogNode.active = false;
              this.SuccessDialog.active = false;
              this.TiLiDialog.active = false;
            }

            if (params.ShouChangDialog) {
              this.reStartNode.active = false;
              this.noTimeNode.active = false;
              this.noGameHeartNode.active = false;
              this.ShouChangDialogNode.active = true;
              this.SuccessDialog.active = false;
              this.TiLiDialog.active = false;
            }

            if (params.SuccessDialog) {
              this.reStartNode.active = false;
              this.noTimeNode.active = false;
              this.noGameHeartNode.active = false;
              this.ShouChangDialogNode.active = false;
              this.SuccessDialog.active = true;
              this.TiLiDialog.active = false; //判断是否需要显示插屏广告

              if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).store.game.getLevel() > 1) {
                //判断是否需要显示推荐组件
                if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                  error: Error()
                }), app) : app).store.game.getLevel() == 3) {
                  (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                    error: Error()
                  }), app) : app).manager.globaldata.showRecommend();
                } else {
                  //判断是否可以显示插屏广告
                  if ((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                    error: Error()
                  }), app) : app).manager.globaldata.getCanShowInterAd() && (_crd && adManager === void 0 ? (_reportPossibleCrUseOfadManager({
                    error: Error()
                  }), adManager) : adManager).canShowInterstitialAd()) {
                    (_crd && adManager === void 0 ? (_reportPossibleCrUseOfadManager({
                      error: Error()
                    }), adManager) : adManager).showInterstitialAd({
                      onError: error => console.warn('[PopResult] Interstitial ad failed', error)
                    });
                  }
                }
              }
            }

            if (params.TiLiDialog) {
              this.reStartNode.active = false;
              this.noTimeNode.active = false;
              this.noGameHeartNode.active = false;
              this.ShouChangDialogNode.active = false;
              this.SuccessDialog.active = false;
              this.TiLiDialog.active = true;
            }
          }
        } // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)


        onHide(result) {
          // app.manager.ui.show<PopResult>({name: 'PopResult', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
          return result;
        }

        showRestart(type) {
          this.reStartNode.getComponent(_crd && FailDialog === void 0 ? (_reportPossibleCrUseOfFailDialog({
            error: Error()
          }), FailDialog) : FailDialog).type = type;
          this.reStartNode.active = true;
          this.noTimeNode.active = false;
          this.noGameHeartNode.active = false;
        }

        NoRestart() {
          //不开始
          this.reStartNode.active = false;

          if (this._noTime) {
            this.noTimeNode.active = true;
          }

          if (this._noGameHeart) {
            this.noGameHeartNode.active = true;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "noTimeNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "noGameHeartNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "reStartNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ShouChangDialogNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "SuccessDialog", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "TiLiDialog", [_dec7], {
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
//# sourceMappingURL=64a07c998b345728ff1bf88f5c4c6a3c6e87a37b.js.map