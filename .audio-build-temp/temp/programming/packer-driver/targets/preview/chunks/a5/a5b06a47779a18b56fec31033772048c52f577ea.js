System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, Node, Prefab, TextAsset, BaseView, app, spLevelItem, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, LevelStatus, PageSpLevel;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseView(extras) {
    _reporterNs.report("BaseView", "../../../../../../extensions/app/assets/base/BaseView", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMiniViewNames(extras) {
    _reporterNs.report("IMiniViewNames", "../../../../../app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfapp(extras) {
    _reporterNs.report("app", "db://assets/app/app", _context.meta, extras);
  }

  function _reportPossibleCrUseOfspLevelItem(extras) {
    _reporterNs.report("spLevelItem", "./expansion/spLevelItem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPageHome(extras) {
    _reporterNs.report("PageHome", "../../home/native/PageHome", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      TextAsset = _cc.TextAsset;
    }, function (_unresolved_2) {
      BaseView = _unresolved_2.default;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }, function (_unresolved_4) {
      spLevelItem = _unresolved_4.spLevelItem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3d129c1jHJH1YwSv+bP4UT8", "PageSpLevel", undefined);

      __checkObsolete__(['_decorator', 'instantiate', 'Node', 'Prefab', 'TextAsset']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LevelStatus", LevelStatus = /*#__PURE__*/function (LevelStatus) {
        LevelStatus[LevelStatus["Unlock"] = 0] = "Unlock";
        LevelStatus[LevelStatus["Challenge"] = 1] = "Challenge";
        LevelStatus[LevelStatus["Complete"] = 2] = "Complete";
        return LevelStatus;
      }({}));

      _export("PageSpLevel", PageSpLevel = (_dec = ccclass('PageSpLevel'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class PageSpLevel extends (_crd && BaseView === void 0 ? (_reportPossibleCrUseOfBaseView({
        error: Error()
      }), BaseView) : BaseView) {
        constructor() {
          super(...arguments);
          // 子界面列表，数组顺序为子界面排列顺序
          this.miniViews = [];

          _initializerDefineProperty(this, "levelItemPrefab", _descriptor, this);

          _initializerDefineProperty(this, "levelItemContainer", _descriptor2, this);

          _initializerDefineProperty(this, "homeNode", _descriptor3, this);

          //关卡名字存储在配置文件改动太大，直接coding在这里，和datamap中注意匹配
          this.levelNames = ["米奇头", "猫", "呆呆", "圣诞树", "圣诞袜", "菠萝", "太空人", "糖果", "小蜜蜂", "冰淇淋", "花朵", "企鹅", "摇摇马", "剪刀", "螃蟹", "手柄", "姜饼人", "狐狸", "金鱼", "兔子", "脚掌", "兔子", "城堡", "蝴蝶结", "福", "大黄鸭", "伞", "天鹅", "玩偶", "LABUBU"];
          //还需要本地记录关卡的状态，分为 已完成 待挑战 未解锁
          this.levelStatus = [];
        }

        //初始化关卡状态
        initLevelStatus() {
          // 从本地存储中读取关卡状态配置
          var savedLevelStatus = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.LEVEL_STATUS_KEY);

          if (savedLevelStatus) {
            // 如果有保存的状态，解析并赋值
            var parsedStatus = JSON.parse(savedLevelStatus); // 确保解析后的数组长度与关卡数量一致

            this.levelStatus = parsedStatus.slice(0, this.levelNames.length); // 如果解析后的数组长度不足，补充默认状态

            while (this.levelStatus.length < this.levelNames.length) {
              this.levelStatus.push(LevelStatus.Unlock);
            }
          } else {
            // 如果没有保存的状态，初始化默认状态
            for (var i = 0; i < this.levelNames.length; i++) {
              if (i === 0) {
                // 第一个关卡设置为待挑战状态
                this.levelStatus.push(LevelStatus.Challenge);
              } else {
                // 其他关卡设置为未解锁状态
                this.levelStatus.push(LevelStatus.Unlock);
              }
            } // 保存默认状态到本地存储


            this.saveLevelStatus();
          }
        } //保存关卡状态到本地存储


        saveLevelStatus() {
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.LEVEL_STATUS_KEY, JSON.stringify(this.levelStatus));
        } // 初始化的相关逻辑写在这


        onLoad() {
          //监听更新关卡状态事件
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.UpdateSPLevelStatus, this.onUpdateLevelStatus, this);
        } //更新关卡状态


        onUpdateLevelStatus(levelIndex, status) {
          if (levelIndex >= 0 && levelIndex < this.levelStatus.length) {
            this.levelStatus[levelIndex] = status; // 刷新当前关卡的显示

            var currentLevelItem = this.levelItemContainer.children[levelIndex];

            if (currentLevelItem) {
              var currentLevelItemComp = currentLevelItem.getComponent(_crd && spLevelItem === void 0 ? (_reportPossibleCrUseOfspLevelItem({
                error: Error()
              }), spLevelItem) : spLevelItem);
              currentLevelItemComp.updateLevelStatus(status);
            } // 补充逻辑：当当前关卡完成且之前所有关卡都完成时，解锁下一关


            if (status === LevelStatus.Complete) {
              // 检查当前关卡之前的所有关卡是否都是 Complete 状态
              var allPreviousComplete = true;

              for (var i = 0; i < levelIndex; i++) {
                if (this.levelStatus[i] !== LevelStatus.Complete) {
                  allPreviousComplete = false;
                  break;
                }
              } // 如果所有之前的关卡都完成了，查找下一个处于 Unlock 状态的关卡


              if (allPreviousComplete) {
                for (var nextLevelIndex = levelIndex + 1; nextLevelIndex < this.levelStatus.length; nextLevelIndex++) {
                  if (this.levelStatus[nextLevelIndex] === LevelStatus.Unlock) {
                    this.levelStatus[nextLevelIndex] = LevelStatus.Challenge; // 刷新下一个关卡的显示

                    var nextLevelItem = this.levelItemContainer.children[nextLevelIndex];
                    var nextLevelItemComp = nextLevelItem.getComponent(_crd && spLevelItem === void 0 ? (_reportPossibleCrUseOfspLevelItem({
                      error: Error()
                    }), spLevelItem) : spLevelItem);
                    nextLevelItemComp.updateLevelStatus(LevelStatus.Challenge);
                    break; // 找到第一个符合条件的关卡后退出循环
                  }
                }
              }
            }

            this.saveLevelStatus();
          }
        }

        setLevelConfigArrays(arr) {
          // console.log("setLevelConfigArrays: ", arr);
          this.levelItemContainer.removeAllChildren(); //遍历创建对象

          for (var i = 0; i < arr.length; i++) {
            var levelConfig = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.globaldata.CreateMapDataByStr(arr[i]);

            if (levelConfig) {
              //生成一个item的prefab，然后给赋值
              var levelItem = instantiate(this.levelItemPrefab);
              levelItem.parent = this.levelItemContainer; //给item赋值

              var levelItemComp = levelItem.getComponent(_crd && spLevelItem === void 0 ? (_reportPossibleCrUseOfspLevelItem({
                error: Error()
              }), spLevelItem) : spLevelItem);
              levelItemComp.setLevelInfo(i, this.levelNames[i], this.levelStatus[i], levelConfig);
            }
          } // 检查是否存在前面所有关卡已完成，当前关卡未解锁的状态，如果有则自动解锁


          var needSave = false;

          for (var _i = 1; _i < this.levelStatus.length; _i++) {
            // 检查当前关卡是否为未解锁状态
            if (this.levelStatus[_i] === LevelStatus.Unlock) {
              // 检查当前关卡前面的所有关卡是否都已完成
              var allPreviousComplete = true;

              for (var j = 0; j < _i; j++) {
                if (this.levelStatus[j] !== LevelStatus.Complete) {
                  allPreviousComplete = false;
                  break;
                }
              } // 如果前面所有关卡都已完成，则自动解锁当前关卡


              if (allPreviousComplete) {
                this.levelStatus[_i] = LevelStatus.Challenge; // 刷新当前关卡的显示

                var _levelItem = this.levelItemContainer.children[_i];

                if (_levelItem) {
                  var _levelItemComp = _levelItem.getComponent(_crd && spLevelItem === void 0 ? (_reportPossibleCrUseOfspLevelItem({
                    error: Error()
                  }), spLevelItem) : spLevelItem);

                  _levelItemComp.updateLevelStatus(LevelStatus.Challenge);
                }

                needSave = true;
              }
            }
          } // 如果有更新，保存关卡状态到本地存储


          if (needSave) {
            this.saveLevelStatus();
          }
        } // 界面打开时的相关逻辑写在这(onShow可被多次调用-它与onHide不成对)


        onShow(params) {
          this.showMiniViews({
            views: this.miniViews
          }); //初始化关卡状态

          this.initLevelStatus();
          this.homeNode.on(Node.EventType.TOUCH_END, () => {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.ui.show({
              name: 'PageHome'
            });
          }, this);
          var loading = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.ui.showLoading(); //加载关卡数据

          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.loader.load({
            path: '/mapdata',
            bundle: 'page-sp-level-res',
            type: TextAsset,
            onComplete: asset => {
              this.setLevelConfigArrays(JSON.parse(asset.text));
              (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
                error: Error()
              }), app) : app).manager.ui.hideLoading(loading);
            }
          });
        } // 界面关闭时的相关逻辑写在这(已经关闭的界面不会触发onHide)


        onHide(result) {
          // app.manager.ui.show<PageSpLevel>({name: 'PageSpLevel', onHide:(result) => { 接收到return的数据，并且有类型提示 }})
          return result;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelItemPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelItemContainer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "homeNode", [_dec4], {
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
//# sourceMappingURL=a5b06a47779a18b56fec31033772048c52f577ea.js.map