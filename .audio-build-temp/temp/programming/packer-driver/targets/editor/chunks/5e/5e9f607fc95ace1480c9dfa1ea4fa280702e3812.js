System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, instantiate, Label, Prefab, TextAsset, BaseManager, app, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GlobaldataManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../../../extensions/app/assets/base/BaseManager", _context.meta, extras);
  }

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
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Prefab = _cc.Prefab;
      TextAsset = _cc.TextAsset;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      app = _unresolved_3.app;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f8619vmGBJNz7UCJHuO/1m9", "GlobaldataManager", undefined);

      __checkObsolete__(['_decorator', 'instantiate', 'Label', 'Node', 'Prefab', 'TextAsset']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GlobaldataManager", GlobaldataManager = (_dec = ccclass('GlobaldataManager'), _dec2 = property({
        type: Prefab,
        tooltip: "格子预制体（用于绘制绳子路径）"
      }), _dec(_class = (_class2 = class GlobaldataManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ceilPrefab", _descriptor, this);

          this.gridArray = [];
          this.LevelConfigArrays = [];
          //当前关卡有多少绳子
          this.ropeCount = 0;
          //当前关卡已经绘制了多少绳子
          this.alreadyDrawRopeCount = 0;
          //当前关卡已经逃逸了多少绳子
          this.escapeRopeCount = 0;
          //道具2 是否使用
          this.daojuHammerUse = false;
          this.needGuideOne = false;
          this.needGuideTwo = false;
          this.newUser = false;

          /**
          *  推荐组件参考代码
          *  核心由 pageManager实例 + openlink值 决定活动，开发者可根据下方代码自行适配
          */
          this.recommendPageManager = null;
          //ceil的节点池
          this.ceilNodePool = [];
          this.isColorArrow = false;
          //创意关卡内容
          this.isSpecialLevel = false;
          this.specialConfig = null;
          //创意关卡的index
          this.specialLevelIndex = 0;
          this.canShowInterAd = false;
          // 关卡使用时间（秒）
          this.levelTime = 0;
          this.levelTimeTimer = null;
        }

        // [无序] 加载完成时触发
        onLoad() {
          // 初始化是否需要新手引导
          this.needGuideOne = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideOne);

          if (this.needGuideOne == undefined || this.needGuideOne == null) {
            this.needGuideOne = true;
            this.setNeedGuideOne(true);
          } else {
            this.needGuideOne = this.needGuideOne;
          }

          this.needGuideTwo = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideTwo);

          if (this.needGuideTwo == undefined || this.needGuideTwo == null) {
            this.needGuideTwo = true;
            this.setNeedGuideTwo(true);
          } else {
            this.needGuideTwo = this.needGuideTwo;
          } // 初始化是否是新用户


          this.newUser = (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NewUser);

          if (this.newUser == undefined || this.newUser == null) {
            this.newUser = true;
            this.setNewUser(true);
          } else {
            this.newUser = this.newUser;
          }
        } // [无序] 自身初始化完成, init执行完毕后被调用


        onInited() {
          this.initLevelConfigArrays(); //启动一个定时器

          setTimeout(() => {
            this.setCanShowInterAd(true);
          }, 6 * 60 * 1000); //第一关需要启动

          this.startLevelTimeTimer();
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, this.startLevelTimeTimer, this);
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).manager.event.on((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.eventname.restart, () => {
            this.setAlreadyDrawRopeCount(0);
            this.setEscapeRopeCount(0);
          }, this);
        } // [无序] 所有manager初始化完成


        onFinished() {} // [无序] 初始化manager，在初始化完成后，调用finish方法


        init(finish) {
          this.initCeilNodePool();
          super.init(finish);
        } //初始化关卡配置数组


        initLevelConfigArrays() {
          try {
            (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
              error: Error()
            }), app) : app).manager.loader.load({
              path: '/mapdata',
              bundle: 'page-main-res',
              type: TextAsset,
              onComplete: asset => {
                this.setLevelConfigArrays(JSON.parse(asset.text));
              }
            });
          } catch (err) {
            console.error("RopeManager: 加载配置失败：", err);
          }
        } // 获取格子是否被占用的二维数组


        getGridArray() {
          return this.gridArray;
        } // 设置格子是否被占用的二维数组


        setGridArray(array) {
          this.gridArray = array;
        }

        // 设置关卡配置数组
        setLevelConfigArrays(arr) {
          // console.log("setLevelConfigArrays: ", arr);
          this.LevelConfigArrays = arr;
        } // 获取关卡配置数组


        getLevelConfigArrays() {
          return this.LevelConfigArrays;
        } //获取指定关卡数据


        getLevelConfig(index) {
          //配置的关卡是从1开始的，我们这里需要减1
          index--;

          if (index < 0 || index >= this.LevelConfigArrays.length) {
            //如果超出关卡列表的时候，重复返回第400-500关的数据
            //计算索引：400-500关对应的索引是399-499
            index = 399 + index % 100; //确保索引在有效范围内

            if (index >= this.LevelConfigArrays.length) {
              index = this.LevelConfigArrays.length - 1;
            }
          }

          return this.LevelConfigArrays[index];
        }

        setRopeCount(count) {
          this.ropeCount = count;
        }

        getRopeCount() {
          return this.ropeCount;
        }

        setAlreadyDrawRopeCount(count) {
          this.alreadyDrawRopeCount = count;
        }

        addAlreadyDrawRopeCount(count) {
          this.alreadyDrawRopeCount += count;
        }

        getAlreadyDrawRopeCount() {
          return this.alreadyDrawRopeCount;
        }

        setEscapeRopeCount(count) {
          this.escapeRopeCount = count;
        }

        addEscapeRopeCount(count) {
          this.escapeRopeCount += count;
        }

        getEscapeRopeCount() {
          return this.escapeRopeCount;
        }

        setDaoJuHammerUse(use) {
          this.daojuHammerUse = use;
        }

        getDaoJuHammerUse() {
          return this.daojuHammerUse;
        }

        setNeedGuideOne(v) {
          this.needGuideOne = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideOne, v);
        }

        getNeedGuideOne() {
          return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideOne);
        }

        setNeedGuideTwo(v) {
          this.needGuideTwo = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideTwo, v);
        }

        getNeedGuideTwo() {
          return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NeedGuideTwo);
        }

        setNewUser(v) {
          this.newUser = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NewUser, v);
        }

        getNewUser() {
          return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.NewUser);
        }

        /**
        *  游戏内提前加载推荐组件数据
        */
        async loadRecommend() {
          //@ts-ignore
          if (!wx.createPageManager) {
            return;
          } //@ts-ignore


          this.recommendPageManager = wx.createPageManager();
          await this.recommendPageManager.load({
            openlink: 'TWFRCqV5WeM2AkMXhKwJ03MhfPOieJfAsvXKUbWvQFQtLyyA5etMPabBehga950uzfZcH3Vi3QeEh41xRGEVFw' // 推荐组件OPENLINK常量，直接复制即可，无需理解含义

          });
        }
        /**
        *  拉起推荐组件
        */


        async showRecommend() {
          console.log("showRecommend");

          if (!this.recommendPageManager) {
            await this.loadRecommend();
          }

          return await this.recommendPageManager.show();
        }

        initCeilNodePool() {
          //箭头长度一般小于15
          for (let i = 0; i < 15; i++) {
            const newNode = instantiate(this.ceilPrefab); //敲碎道具用到

            newNode.addComponent(Label);
            this.ceilNodePool.push(newNode);
          }
        } // 从节点池获取节点


        getCeilNode() {
          if (this.ceilNodePool.length > 0) {
            return this.ceilNodePool.pop();
          } // 如果节点池为空，创建新节点


          const newNode = instantiate(this.ceilPrefab);
          newNode.addComponent(Label);
          return newNode;
        } // 将节点返回节点池


        returnCeilNode(node) {
          this.ceilNodePool.push(node);
        }

        setIsColorArrow(v) {
          this.isColorArrow = v;
          (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.set((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.isColorArrow, v);
        }

        getIsColorArrow() {
          return (_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).lib.storage.get((_crd && app === void 0 ? (_reportPossibleCrUseOfapp({
            error: Error()
          }), app) : app).config.localkey.isColorArrow);
        } //解析关卡数据
        //解析关卡配置


        CreateMapDataByStr(data_str) {
          if (data_str.length < 1) return null;
          var arr = data_str.split(";");

          if (arr.length == 3) {
            var width = parseInt(arr[0]);
            var height = parseInt(arr[1]);
            var arrow_arr = new Array();
            var v_arr = arr[2].split("|");

            for (var i = 0; i < v_arr.length; i++) {
              var t_arr = v_arr[i].split(",");

              if (t_arr.length > 0) {
                var path_arr = new Array();

                for (var j = 0; j < t_arr.length; j++) {
                  var index = parseInt(t_arr[j]);
                  var x = Math.floor(index % width);
                  var y = Math.floor(index / width);
                  path_arr.push([x, y]);
                }

                arrow_arr.push(path_arr);
              }
            }

            return {
              grid_width: width,
              grid_height: height,
              ropes: arrow_arr
            };
          }

          return null;
        }

        setIsSpecialLevel(v) {
          this.isSpecialLevel = v;
        }

        getIsSpecialLevel() {
          return this.isSpecialLevel;
        }

        setSpecialConfig(v) {
          this.specialConfig = v;
        }

        getSpecialConfig() {
          return this.specialConfig;
        }

        setSpecialLevelIndex(v) {
          this.specialLevelIndex = v;
        }

        getSpecialLevelIndex() {
          return this.specialLevelIndex;
        }

        setCanShowInterAd(v) {
          this.canShowInterAd = v;
        }

        getCanShowInterAd() {
          return this.canShowInterAd;
        }

        // 开始计时
        startLevelTimeTimer() {
          // 清除之前的定时器
          this.stopLevelTimeTimer(); // 每秒增加1

          this.levelTimeTimer = setInterval(() => {
            this.levelTime++; // console.log("levelTime", this.levelTime);
          }, 1000);
        } // 停止计时


        stopLevelTimeTimer() {
          if (this.levelTimeTimer !== null) {
            clearInterval(this.levelTimeTimer);
            this.levelTimeTimer = null;
          }

          this.levelTime = 0;
        } // 重置计时


        resetLevelTime() {
          this.stopLevelTimeTimer();
          this.levelTime = 0;
        } // 获取关卡使用时间


        getLevelTime() {
          return this.levelTime;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ceilPrefab", [_dec2], {
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
//# sourceMappingURL=5e9f607fc95ace1480c9dfa1ea4fa280702e3812.js.map