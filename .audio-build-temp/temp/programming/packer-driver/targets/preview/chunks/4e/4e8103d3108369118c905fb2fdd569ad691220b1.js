System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Asset, AssetManager, Font, SceneAsset, SpriteFrame, Texture2D, TextureCube, _decorator, assetManager, isValid, path, sp, MINIGAME, BaseManager, Core, Command, Loader, _dec, _class3, _class4, _crd, ccclass, REGEX, LoaderManager;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../base/BaseManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../../Core", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Asset = _cc.Asset;
      AssetManager = _cc.AssetManager;
      Font = _cc.Font;
      SceneAsset = _cc.SceneAsset;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      TextureCube = _cc.TextureCube;
      _decorator = _cc._decorator;
      assetManager = _cc.assetManager;
      isValid = _cc.isValid;
      path = _cc.path;
      sp = _cc.sp;
    }, function (_ccEnv) {
      MINIGAME = _ccEnv.MINIGAME;
    }, function (_unresolved_2) {
      BaseManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      Core = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b3bf5M3DHNHcYe1nnNZYr6B", "LoaderManager", undefined);

      __checkObsolete__(['Asset', 'AssetManager', 'Font', 'ImageAsset', 'JsonAsset', 'Label', 'SceneAsset', 'Sprite', 'SpriteFrame', 'Texture2D', 'TextureCube', '_decorator', 'assetManager', 'isValid', 'path', 'sp']);

      ({
        ccclass
      } = _decorator);
      REGEX = /^https?:\/\/.*/;
      Command = class Command {
        static create(onComplete, onProgress) {
          if (onProgress === void 0) {
            onProgress = null;
          }

          var command = Command.cache.pop() || new Command();
          onProgress && command.onProgress.push(onProgress);
          onComplete && command.onComplete.push(onComplete);
          return command;
        }

        static put(command) {
          command.onProgress.length = 0;
          command.onComplete.length = 0;
          Command.cache.push(command);
        }

        constructor() {
          this.onProgress = [];
          this.onComplete = [];
        }

      };
      Command.cache = [];
      Loader = class Loader {
        constructor() {
          this.assetMap = new Map();
          this.loadingMap = new Map();
        }

        /**
         * 预加载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */
        preload(params) {
          return (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.preload(params);
        }
        /**
         * 预加载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        preloadDir(params) {
          return (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.preloadDir(params);
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundel名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        load(params) {
          var key = (params.bundle || 'resources') + "-" + params.type.name + "-" + params.path + "-" + (params.version || '');

          if (this.loadingMap.has(key)) {
            var _command = this.loadingMap.get(key);

            params.onProgress && _command.onProgress.push(params.onProgress);
            params.onComplete && _command.onComplete.push(params.onComplete);
            return;
          } // 加载中


          var command = Command.create(params.onComplete, params.onProgress);
          this.loadingMap.set(key, command); // 有缓存

          if (this.assetMap.has(key)) {
            var asset = this.assetMap.get(key); // 有缓存的情况下不触发onProgress回调

            setTimeout(() => {
              // 加载无效
              if (!this.loadingMap.has(key)) return;
              this.loadingMap.delete(key);
              command.onComplete.forEach(cb => cb(asset));
              Command.put(command);
            }, 0);
            return;
          }

          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.load(_extends({}, params, {
            onProgress: (finish, total, item) => {
              if (!this.loadingMap.has(key)) return;
              command.onProgress.forEach(cb => cb(finish, total, item));
            },
            onComplete: asset => {
              // 加载无效
              if (!this.loadingMap.has(key)) {
                asset.addRef();
                asset.decRef();
                return;
              }

              this.loadingMap.delete(key);

              if (asset) {
                asset.addRef();
                this.assetMap.set(key, asset);
              }

              command.onComplete.forEach(cb => cb(asset));
              Command.put(command);
            }
          }));
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadAsync(params) {
          return new Promise(resolve => {
            this.load(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundel名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadDir(params) {
          var key = (params.bundle || 'resources') + "-" + params.type.name + "-" + params.path + "-" + (params.version || '') + ":";

          if (this.loadingMap.has(key)) {
            var _command2 = this.loadingMap.get(key);

            params.onProgress && _command2.onProgress.push(params.onProgress);
            params.onComplete && _command2.onComplete.push(params.onComplete);
            return;
          } // 加载中


          var command = Command.create(params.onComplete, params.onProgress);
          this.loadingMap.set(key, command);
          var results = [];
          this.assetMap.forEach((asset, path) => {
            if (path.indexOf(key) === 0) {
              results.push(asset);
            }
          }); // 有缓存

          if (results.length) {
            // 有缓存的情况下不触发onProgress回调
            setTimeout(() => {
              // 加载无效
              if (!this.loadingMap.has(key)) return;
              this.loadingMap.delete(key);
              command.onComplete.forEach(cb => cb(results));
              Command.put(command);
            }, 0);
            return;
          }

          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.loadDir(_extends({}, params, {
            onProgress: (finish, total, item) => {
              if (!this.loadingMap.has(key)) return;
              command.onProgress.forEach(cb => cb(finish, total, item));
            },
            onComplete: assets => {
              // 加载无效
              if (!this.loadingMap.has(key)) {
                assets == null || assets.forEach(asset => {
                  asset.addRef();
                  asset.decRef();
                });
                return;
              }

              this.loadingMap.delete(key);
              assets == null || assets.forEach(asset => {
                asset.addRef();
                this.assetMap.set(key + asset.uuid, asset);
              });
              command.onComplete.forEach(cb => cb(assets));
              Command.put(command);
            }
          }));
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadDirAsync(params) {
          return new Promise(resolve => {
            this.loadDir(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 加载远程资源
         * @example
         * loadRemote({url:'', ext:'.png', onComplete:(result){ }})
         */


        loadRemote(_ref) {
          var {
            url,
            ext,
            onComplete
          } = _ref;

          if (this.loadingMap.has(url)) {
            var _command3 = this.loadingMap.get(url);

            onComplete && _command3.onComplete.push(onComplete);
            return;
          } // 加载中


          var command = Command.create(onComplete);
          this.loadingMap.set(url, command); // 有缓存

          if (this.assetMap.has(url)) {
            var asset = this.assetMap.get(url); // 有缓存的情况下不触发onProgress回调

            setTimeout(() => {
              // 加载无效
              if (!this.loadingMap.has(url)) return;
              this.loadingMap.delete(url);
              command.onComplete.forEach(cb => cb(asset));
              Command.put(command);
            }, 0);
            return;
          }

          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.loadRemote({
            url,
            ext,
            onComplete: asset => {
              // 加载无效
              if (!this.loadingMap.has(url)) {
                asset.addRef();
                asset.decRef();
                return;
              }

              this.loadingMap.delete(url);

              if (asset) {
                asset.addRef();
                this.assetMap.set(url, asset);
              }

              command.onComplete.forEach(cb => cb(asset));
              Command.put(command);
            }
          });
        }
        /**
         * 加载远程资源
         * @example
         * await loadRemoteAsync({url:'', ext:'.png'})
         */


        loadRemoteAsync(params) {
          return new Promise(resolve => {
            this.loadRemote(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 设置字体资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setFont({target:label, path:'font/num', bundle:'resources', onComplete:(succ)=>{}})
         * setFont({target:label, url:'http://img/a/font',ext:'.ttf', onComplete:(succ)=>{}})
         */


        setFont(params) {
          if (params.url) {
            this.loadRemote({
              url: params.url,
              ext: params.ext,
              onComplete: font => {
                if (!font || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.font = font;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          } else {
            this.load({
              path: params.path,
              bundle: params.bundle,
              type: Font,
              onComplete: font => {
                if (!font || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.font = font;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          }
        }
        /**
         * 设置Spine资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setSpine({target:spine, path:'spine/role', bundle:'resources', onComplete:(succ)=>{}})
         */


        setSpine(params) {
          this.load({
            path: params.path,
            bundle: params.bundle,
            type: sp.SkeletonData,
            onComplete: skeletonData => {
              if (!skeletonData || !isValid(params.target)) {
                params.onFail && params.onFail();
                params.onComplete && params.onComplete(false);
                return;
              }

              params.target.skeletonData = skeletonData;
              params.onSuccess && params.onSuccess();
              params.onComplete && params.onComplete(true);
            }
          });
        }
        /**
         * 设置图片资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setSprite({target:sprite, path:'img/a/spriteFrame', bundle:'resources', onComplete:(succ)=>{}})
         * setSprite({target:sprite, url:'http://img/a/avatar',ext:'.png', onComplete:(succ)=>{}})
         */


        setSprite(params) {
          if (params.url) {
            this.loadRemote({
              url: params.url,
              ext: params.ext,
              onComplete: imageAsset => {
                if (!imageAsset || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                var spriteFrame = SpriteFrame.createWithImage(imageAsset);
                params.target.spriteFrame = spriteFrame;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          } else {
            this.load({
              path: params.path,
              bundle: params.bundle,
              type: SpriteFrame,
              onComplete: spriteFrame => {
                if (!spriteFrame || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.spriteFrame = spriteFrame;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          }
        }
        /**
         * 释放所有资源
         */


        releaseAll() {
          var assetList = [];
          this.assetMap.forEach(asset => assetList.push(asset));
          this.assetMap.clear();
          this.loadingMap.clear(); // 延迟一秒释放资源

          setTimeout(() => {
            assetList.forEach(asset => asset.decRef());
          }, 1000);
        }

      };

      _export("default", LoaderManager = (_dec = ccclass('LoaderManager'), _dec(_class3 = (_class4 = class LoaderManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        handle(handle, _ref2) {
          var {
            bundle,
            version,
            path,
            type,
            onProgress,
            onComplete
          } = _ref2;

          if (!handle) {
            this.error('handle is empty');
            return onComplete && onComplete(null);
          }

          if (!path) {
            this.error(handle + " fail. path is empty");
            return onComplete && onComplete(null);
          }

          if (!bundle) bundle = 'resources';
          var args = [path];
          if (type) args.push(type);
          if (onProgress) args.push(onProgress);
          args.push((err, res) => {
            if (err) {
              this.error(handle + " \"" + path + "\" fail", err);

              if (type === SpriteFrame && path.slice(-12) !== '/spriteFrame') {
                this.warn("\u52A0\u8F7DSpriteFrame\u7C7B\u578B\u7684\u8D44\u6E90, \u8DEF\u5F84\u53EF\u80FD\u9700\u8981\u4EE5/spriteFrame\u7ED3\u5C3E, \u5982: \u300C" + path + "\u300D -> \u300C" + path + "/spriteFrame\u300D");
              } else if (type === Texture2D && path.slice(-8) !== '/texture') {
                this.warn("\u52A0\u8F7DTexture2D\u7C7B\u578B\u7684\u8D44\u6E90, \u8DEF\u5F84\u53EF\u80FD\u9700\u8981\u4EE5/texture\u7ED3\u5C3E, \u5982: \u300C" + path + "\u300D -> \u300C" + path + "/texture\u300D");
              } else if (type === TextureCube && path.slice(-12) !== '/textureCube') {
                this.warn("\u52A0\u8F7DTextureCube\u7C7B\u578B\u7684\u8D44\u6E90, \u8DEF\u5F84\u53EF\u80FD\u9700\u8981\u4EE5/textureCube\u7ED3\u5C3E, \u5982: \u300C" + path + "\u300D -> \u300C" + path + "/textureCube\u300D");
              }

              onComplete && onComplete(null);
            } else {
              onComplete && onComplete(res);
            }
          });
          this.loadBundle({
            bundle,
            version,

            onComplete(bundle) {
              if (!bundle) return onComplete && onComplete(null);
              bundle[handle](args[0], args[1], args[2], args[3]);
            }

          });
        }
        /**
         * 预加载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        preload(params) {
          if (SceneAsset === params.type) {
            this.handle('preloadScene', {
              path: params.path,
              bundle: params.bundle,
              version: params.version,
              onProgress: params.onProgress,
              onComplete: params.onComplete
            });
          } else {
            this.handle('preload', params);
          }
        }
        /**
         * 预加载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        preloadDir(params) {
          this.handle('preloadDir', params);
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        load(params) {
          if (SceneAsset === params.type) {
            this.handle('loadScene', {
              path: params.path,
              bundle: params.bundle,
              version: params.version,
              onProgress: params.onProgress,
              onComplete: params.onComplete
            });
          } else {
            this.handle('load', params);
          }
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadAsync(params) {
          return new Promise(resolve => {
            this.load(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadDir(params) {
          this.handle('loadDir', params);
        }
        /**
         * 加载bundle下的资源
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        loadDirAsync(params) {
          return new Promise(resolve => {
            this.loadDir(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 销毁一个bundle中对应path和type的资源
         * @param params.bundle 默认为resources，如果是远程bundle，则使用url末位作为bundle名
         * @param params.path bundle下的相对路径
         * @param params.type 资源类型
         */


        release(_ref3) {
          var _assetManager$getBund;

          var {
            path,
            bundle,
            type
          } = _ref3;
          if (!bundle) bundle = 'resources';
          (_assetManager$getBund = assetManager.getBundle(bundle)) == null || _assetManager$getBund.release(path, type);
        }
        /**
         * 销毁一个bundle中所有的资源
         * @param bundle 默认为resources，如果是远程bundle，则使用url末位作为bundle名
         */


        releaseAll(bundle) {
          if (!bundle) bundle = 'resources';

          var _bundle = assetManager.getBundle(bundle);

          if (!_bundle) return; // 只释放自己内部的资源，依赖的资源只减少引用计数

          _bundle.getDirWithPath('/', Asset).forEach(asset => {
            _bundle.release(asset.path, asset.ctor);
          }); // cocos提供的方法会将依赖的资源也卸载(这个设计很奇怪)
          // _bundle?.releaseAll();

        }
        /**
         * 销毁一个bundle中未使用的资源
         * @param bundle 默认为resources，如果是远程bundle，则使用url末位作为bundle名
         */


        releaseUnused(bundle) {
          var _assetManager$getBund2;

          if (!bundle) bundle = 'resources'; //@ts-ignore

          (_assetManager$getBund2 = assetManager.getBundle(bundle)) == null || _assetManager$getBund2.releaseUnusedAssets();
        }
        /**
         * 加载一个bundle
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        loadBundle(_ref4) {
          var {
            bundle,
            version,
            onComplete
          } = _ref4;
          if (!bundle) bundle = 'resources';

          if (MINIGAME) {
            if (REGEX.test(bundle)) {
              this.warn('小游戏环境下只支持加载远程Bundle的资源数据, 不会加载脚本');
              this.reloadBundle({
                bundle,
                version,
                onComplete
              });
              return;
            }

            if (version && assetManager.downloader.bundleVers[bundle] !== version) {
              this.warn('小游戏环境下只支持更新Bundle的远程资源数据, 不会更新脚本'); // 先加载本地bundle运行脚本

              assetManager.loadBundle(bundle, (err, b) => {
                if (err || !b) return onComplete == null ? void 0 : onComplete(null); // 然后再走重载逻辑更新资源

                this.reloadBundle({
                  bundle,
                  version,
                  onComplete
                });
              });
            } else {
              assetManager.loadBundle(bundle, (err, bundle) => {
                onComplete && onComplete(err ? null : bundle);
              });
            }

            return;
          }

          if (version) {
            assetManager.loadBundle(bundle, {
              version
            }, (err, bundle) => {
              onComplete && onComplete(err ? null : bundle);
            });
          } else {
            assetManager.loadBundle(bundle, (err, bundle) => {
              onComplete && onComplete(err ? null : bundle);
            });
          }
        }
        /**
         * 加载一个bundle
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        loadBundleAsync(params) {
          return new Promise(resolve => {
            this.loadBundle(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 获取一个已经加载的bundle
         * @param bundle 默认为resources，如果是远程bundle，则使用url末位作为bundle名
         */


        getBundle(bundle) {
          if (!bundle) bundle = 'resources';
          return assetManager.getBundle(bundle);
        }
        /**
         * 移除一个已经加载的bundle
         * @param bundle 默认为resources，如果是远程bundle，则使用url末位作为bundle名
         */


        removeBundle(bundle) {
          if (!bundle) bundle = 'resources';
          var b = assetManager.getBundle(bundle);
          if (b) assetManager.removeBundle(b);
        }
        /**
         * 重载一个bundle(只重载资源列表)
         * - 只有远程bundle支持重载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        reloadBundle(_ref5) {
          var _assetManager$cacheMa;

          var {
            bundle,
            version,
            onComplete
          } = _ref5;
          if (!bundle) bundle = 'resources';
          var baseUrl = '';
          var configUrl = '';

          if (REGEX.test(bundle)) {
            baseUrl = bundle;
            var suffix = version ? version + "." : '';
            configUrl = baseUrl + "config." + suffix + "json";
          } else {
            baseUrl = assetManager.downloader.remoteServerAddress + "remote/" + bundle + "/";

            var _suffix = version ? version + "." : '';

            configUrl = baseUrl + "config." + _suffix + "json";
          } // 清除可能存在的config缓存


          (_assetManager$cacheMa = assetManager.cacheManager) == null || _assetManager$cacheMa.removeCache(configUrl);
          assetManager.loadRemote(configUrl, (err, data) => {
            if (err) {
              this.error("\u4E0B\u8F7DBundle\u914D\u7F6E\u5931\u8D25: " + configUrl);
              onComplete == null || onComplete(null);
              return;
            }

            this.releaseAll(path.basename(bundle));
            this.removeBundle(path.basename(bundle));
            var ab = new AssetManager.Bundle();
            var config = data.json;
            config.base = baseUrl;
            ab.init(config);
            onComplete == null || onComplete(ab);
          });
        }
        /**
         * 重载一个bundle(只重载资源列表)
         * - 只有远程bundle支持重载
         * @param params.bundle 默认为resources, 可以是项目中的bundle名，也可以是远程bundle的url(url末位作为bundle名)，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#%E5%8A%A0%E8%BD%BD-asset-bundle
         * @param params.version 远程bundle的版本，参考https://docs.cocos.com/creator/manual/zh/asset/bundle.html#asset-bundle-%E7%9A%84%E7%89%88%E6%9C%AC
         */


        reloadBundleAsync(params) {
          return new Promise(resolve => {
            this.reloadBundle(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 加载远程资源
         * @example
         * loadRemote({url:'', ext:'.png', onComplete:(result){ }})
         */


        loadRemote(_ref6) {
          var {
            url,
            ext,
            onComplete
          } = _ref6;

          if (ext) {
            assetManager.loadRemote(url, {
              ext
            }, (error, res) => {
              if (error) {
                this.error("loadRemote " + url + " fail");
                return onComplete && onComplete(null);
              }

              onComplete && onComplete(res);
            });
          } else {
            assetManager.loadRemote(url, (error, res) => {
              if (error) {
                this.error("loadRemote " + url + " fail");
                return onComplete && onComplete(null);
              }

              onComplete && onComplete(res);
            });
          }
        }
        /**
         * 加载远程资源
         * @example
         * await loadRemoteAsync({url:'', ext:'.png'})
         */


        loadRemoteAsync(params) {
          return new Promise(resolve => {
            this.loadRemote(_extends({}, params, {
              onComplete: resolve
            }));
          });
        }
        /**
         * 设置字体资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setFont({target:label, path:'font/num', bundle:'resources', onComplete:(succ)=>{}})
         * setFont({target:label, url:'http://img/a/font',ext:'.ttf', onComplete:(succ)=>{}})
         */


        setFont(params) {
          if (params.url) {
            this.loadRemote({
              url: params.url,
              ext: params.ext,
              onComplete: font => {
                if (!font || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.font = font;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          } else {
            this.load({
              path: params.path,
              bundle: params.bundle,
              type: Font,
              onComplete: font => {
                if (!font || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.font = font;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          }
        }
        /**
         * 设置Spine资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setSpine({target:spine, path:'spine/role', bundle:'resources', onComplete:(succ)=>{}})
         */


        setSpine(params) {
          this.load({
            path: params.path,
            bundle: params.bundle,
            type: sp.SkeletonData,
            onComplete: skeletonData => {
              if (!skeletonData || !isValid(params.target)) {
                params.onFail && params.onFail();
                params.onComplete && params.onComplete(false);
                return;
              }

              params.target.skeletonData = skeletonData;
              params.onSuccess && params.onSuccess();
              params.onComplete && params.onComplete(true);
            }
          });
        }
        /**
         * 设置图片资源
         * @param params.bundle 默认为resources
         * @param params.path bundle下的相对路径
         * 
         * @example
         * setSprite({target:sprite, path:'img/a/spriteFrame', bundle:'resources', onComplete:(succ)=>{}})
         * setSprite({target:sprite, url:'http://img/a/avatar',ext:'.png', onComplete:(succ)=>{}})
         */


        setSprite(params) {
          if (params.url) {
            this.loadRemote({
              url: params.url,
              ext: params.ext,
              onComplete: imageAsset => {
                if (!imageAsset || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                var spriteFrame = SpriteFrame.createWithImage(imageAsset);
                params.target.spriteFrame = spriteFrame;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          } else {
            this.load({
              path: params.path,
              bundle: params.bundle,
              type: SpriteFrame,
              onComplete: spriteFrame => {
                if (!spriteFrame || !isValid(params.target)) {
                  params.onFail && params.onFail();
                  params.onComplete && params.onComplete(false);
                  return;
                }

                params.target.spriteFrame = spriteFrame;
                params.onSuccess && params.onSuccess();
                params.onComplete && params.onComplete(true);
              }
            });
          }
        }

      }, _class4.Loader = Loader, _class4)) || _class3));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4e8103d3108369118c905fb2fdd569ad691220b1.js.map