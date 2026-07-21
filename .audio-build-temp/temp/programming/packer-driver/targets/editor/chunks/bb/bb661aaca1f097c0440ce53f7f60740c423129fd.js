System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, AudioClip, Button, Game, _decorator, game, isValid, sys, Core, BaseManager, AudioEngine, _dec, _class, _class2, _crd, ccclass, storage, MusicName, EffectName, BundleName, SoundManager;

  function _reportPossibleCrUseOfIEffectName(extras) {
    _reporterNs.report("IEffectName", "../../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMusicName(extras) {
    _reporterNs.report("IMusicName", "../../../../../assets/app-builtin/app-admin/executor", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCore(extras) {
    _reporterNs.report("Core", "../../Core", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBaseManager(extras) {
    _reporterNs.report("BaseManager", "../../base/BaseManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAudioEngine(extras) {
    _reporterNs.report("AudioEngine", "./AudioEngine", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      AudioClip = _cc.AudioClip;
      Button = _cc.Button;
      Game = _cc.Game;
      _decorator = _cc._decorator;
      game = _cc.game;
      isValid = _cc.isValid;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      Core = _unresolved_2.default;
    }, function (_unresolved_3) {
      BaseManager = _unresolved_3.default;
    }, function (_unresolved_4) {
      AudioEngine = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "58002Ha2adOWbt2LDr8rmBT", "SoundManager", undefined);

      __checkObsolete__(['AssetManager', 'AudioClip', 'Button', 'Game', '_decorator', 'game', 'isValid', 'sys']);

      ({
        ccclass
      } = _decorator);
      storage = {
        set(key, value) {
          sys.localStorage.setItem(key, JSON.stringify(value));
        },

        get(key) {
          const data = sys.localStorage.getItem(key);

          if (data && typeof data === 'string') {
            return JSON.parse(data);
          }

          return undefined;
        }

      };
      /**
       * 音乐名字枚举
       */

      MusicName = new Proxy({}, {
        get: function (target, key) {
          if (target[key]) return target[key];
          target[key] = key;
          return key;
        }
      });
      /**
       * 音效名字枚举
       */

      EffectName = new Proxy({}, {
        get: function (target, key) {
          if (target[key]) return target[key];
          target[key] = key;
          return key;
        }
      });
      BundleName = 'app-sound';

      _export("default", SoundManager = (_dec = ccclass('SoundManager'), _dec(_class = (_class2 = class SoundManager extends (_crd && BaseManager === void 0 ? (_reportPossibleCrUseOfBaseManager({
        error: Error()
      }), BaseManager) : BaseManager) {
        constructor(...args) {
          super(...args);
          this.musicMuteCacheKey = 'SoundManager:MusicMute';
          this.effectMuteCacheKey = 'SoundManager:EffectMute';
          this.musicVolumeScaleCacheKey = 'SoundManager:MusicVolumeScale';
          this.effectVolumeScaleCacheKey = 'SoundManager:EffectVolumeScale';
          this.defaultMusicName = '';
          this.defaultMusicVolume = 1;
          this.defaultEffectName = '';
          this.defaultEffectVolume = 1;
          this.audioCache = {};
          this.effectInterval = {};
          this.playingMusic = {
            uuid: '',
            id: -1,
            name: '',
            volume: 1,
            playing: false,
            paused: false
          };
        }

        init(finish) {
          var _setting$preload;

          const setting = SoundManager.setting; // 默认音乐

          if (setting.defaultMusicName) this.defaultMusicName = setting.defaultMusicName;
          if (typeof setting.defaultMusicVolume === 'number') this.defaultMusicVolume = setting.defaultMusicVolume; // 默认按钮音效

          if (setting.defaultEffectName) this.defaultEffectName = setting.defaultEffectName;
          if (typeof setting.defaultEffectVolume === 'number') this.defaultEffectVolume = setting.defaultEffectVolume;

          if (this.musicMuteCacheKey) {
            const musicMute = storage.get(this.musicMuteCacheKey) === true;
            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.setMusicMute(musicMute);
          } else {
            this.warn('musicMuteCacheKey不能为空');
          }

          if (this.effectMuteCacheKey) {
            const effectMute = storage.get(this.effectMuteCacheKey) === true;
            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.setGlobalEffectsMute(effectMute);
          } else {
            this.warn('effectMuteCacheKey不能为空');
          }

          if (this.musicVolumeScaleCacheKey) {
            const musicVolumeScale = storage.get(this.musicVolumeScaleCacheKey);
            if (typeof musicVolumeScale === 'number') (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.setMusicVolumeScale(musicVolumeScale);
          } else {
            this.warn('musicVolumeScaleCacheKey不能为空');
          }

          if (this.effectVolumeScaleCacheKey) {
            const effectVolumeScale = storage.get(this.effectVolumeScaleCacheKey);
            if (typeof effectVolumeScale === 'number') (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.setGlobalEffectsVolumeScale(effectVolumeScale);
          } else {
            this.warn('effectVolumeScaleCacheKey不能为空');
          }

          super.init(finish); // 预加载

          (_setting$preload = setting.preload) == null || _setting$preload.forEach(path => {
            (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
              error: Error()
            }), Core) : Core).inst.manager.loader.preload({
              bundle: BundleName,
              type: AudioClip,
              path: path
            });
          });
        }

        onLoad() {
          game.on(Game.EVENT_HIDE, function () {
            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.pauseAll();
          });
          game.on(Game.EVENT_SHOW, function () {
            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.resumeAll();
          });
        }
        /**
         * 预加载声音资源
         * @param name sound路径
         * @param bundle Bundle名，默认为app-sound
         */


        preload(name, ...args) {
          const bundleName = args.length >= 1 && typeof args[0] === 'string' ? args[0] || BundleName : BundleName;
          const complete = args.length >= 1 && args[args.length - 1] instanceof Function ? args[args.length - 1] : null;

          if (!name) {
            this.error('preload', 'fail');
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(null);
            });
            return;
          }

          if (name.indexOf('effect') !== 0 && name.indexOf('music') !== 0) {
            this.error('preload', 'fail', name);
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(null);
            });
            return;
          } // 远程加载


          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.preload({
            bundle: bundleName,
            path: name,
            type: AudioClip,
            onComplete: complete
          });
        }
        /**
         * 加载声音资源
         * @param name sound路径
         * @param bundle Bundle名，默认为app-sound
         * @param progress 加载进度回调
         * @param complete 加载完成回调
         */


        load(name, ...args) {
          const bundleName = args.length >= 1 && typeof args[0] === 'string' ? args[0] || BundleName : BundleName;
          const progress = args.length >= 2 && args[args.length - 1] instanceof Function && args[args.length - 2] instanceof Function ? args[args.length - 2] : null;
          const complete = args.length >= 1 && args[args.length - 1] instanceof Function ? args[args.length - 1] : null;

          if (!name) {
            this.error('load', 'fail');
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(null);
            });
            return;
          }

          const soundName = `${bundleName}://${name}`; // 判断有无缓存

          const audio = this.audioCache[soundName];

          if (audio) {
            complete && setTimeout(() => {
              if (!isValid(this)) return;
              complete(audio);
            });
            return;
          } // 远程加载


          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.load({
            path: name,
            bundle: bundleName,
            type: AudioClip,
            onProgress: progress,
            onComplete: audioClip => {
              if (!isValid(this)) return;

              if (audioClip) {
                this.audioCache[soundName] = audioClip;
                complete && complete(audioClip);
              } else {
                complete && complete(null);
              }
            }
          });
        }
        /**
         * 释放声音资源
         * @param name 声音路径
         * @param bundle Bundle名，默认为app-sound
         */


        release(name, bundle) {
          const bundleName = bundle || BundleName;
          const soundName = `${bundleName}://${name}`;
          delete this.audioCache[soundName];
          (_crd && Core === void 0 ? (_reportPossibleCrUseOfCore({
            error: Error()
          }), Core) : Core).inst.manager.loader.release({
            bundle: bundleName,
            path: name,
            type: AudioClip
          });
        }
        /**
         * 播放默认音乐
         */


        playDefaultMusic(onPlay) {
          if (this.defaultMusicName) {
            this.playMusic({
              name: this.defaultMusicName,
              volume: this.defaultMusicVolume,
              onPlay
            });
          } else {
            this.warn('defaultMusicName 不存在');
          }
        }
        /**
         * 播放默认音效
         */


        playDefaultEffect(onPlay) {
          if (this.defaultEffectName) {
            this.playEffect({
              name: this.defaultEffectName,
              volume: this.defaultEffectVolume,
              onPlay
            });
          } else {
            this.warn('defaultEffectName 不存在');
          }
        }
        /**
         * 设置按钮点击播放的音效，优先级高于默认音效
         * @param name 音效(如果为空，则使用默认音效)
         * @param opts.volume 音量
         * @param opts.interval 多少秒内不会重复播放
         */


        setButtonEffect(target, name, opts) {
          if (name) {
            const {
              volume = 1,
              interval = 0
            } = opts || {}; //@ts-ignore

            target.node['useDefaultEffect'] = false;
            target.node.targetOff(this);
            target.node.on(Button.EventType.CLICK, function () {
              this.playEffect({
                name,
                volume,
                interval
              });
            }, this);
          } else {
            //@ts-ignore
            target.node['useDefaultEffect'] = true;
            target.node.targetOff(this);
          }
        }
        /**
         * 播放音效
         * @param name 音效
         * @param bundle Bundle名，默认为app-sound
         * @param loop 循环播放
         * @param volume 音量
         * @param interval 多少秒内不会重复播放
         */


        playEffect({
          name,
          bundle,
          volume = 1,
          loop = false,
          interval = 0,
          onEnded,
          onPlay,
          onError
        }) {
          if (!name) {
            onError && onError();
            return;
          }

          const bundleName = bundle || BundleName;
          const soundName = `${bundleName}://${name}`; // 静音不允许播放

          if (this.isEffectMute) {
            onError && onError();
            return;
          } // 正在播放中，不允许重复播放


          if (this.effectInterval[soundName] && Date.now() < this.effectInterval[soundName]) {
            onError && onError();
            return;
          } // 加载音乐


          this.load(name, bundleName, audioClip => {
            if (!isValid(this)) {
              onError && onError();
              return;
            } // 静音不允许播放


            if (this.isEffectMute) {
              onError && onError();
              return;
            } // 正在播放中，不允许重复播放


            if (this.effectInterval[soundName] && Date.now() < this.effectInterval[soundName]) {
              onError && onError();
              return;
            }

            if (!audioClip) {
              this.error(`playEffect ${name} 不存在或加载失败`);
              onError && onError();
              return;
            }

            if (interval > 0) {
              this.effectInterval[soundName] = Date.now() + interval * 1000;
            }

            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.playEffect(audioClip, volume, loop, onPlay, onEnded);
          });
        }
        /**
         * 播放音效
         * @param name 音效
         * @param bundle Bundle名，默认为app-sound
         * @param loop 循环播放
         * @param volume 音量
         * @param interval 多少秒内不会重复播放
         * @returns 如果Promise返回值是null(非真)，则播放失败
         */


        async playEffectAsync(params) {
          return new Promise(resolve => {
            this.playEffect({ ...params,
              onPlay: audioID => {
                resolve(audioID);
              },
              onError: () => {
                resolve(null);
              }
            });
          });
        }
        /**
         * 暂停音效
         * @param id 
         * @returns 
         */


        pauseEffect(id) {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.pauseEffect(id);
        }
        /**
         * 暂停所有音效
         * @returns 
         */


        pauseAllEffects() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.pauseAllEffects();
        }
        /**
         * 恢复音效
         * @param id 
         * @returns 
         */


        resumeEffect(id) {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.resumeEffect(id);
        }
        /**
         * 恢复所有音效
         * @returns 
         */


        resumeAllEffects() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.resumeAllEffects();
        }
        /**
         * 停止音效
         * @param id 
         * @returns 
         */


        stopEffect(id) {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.stopEffect(id);
        }
        /**
         * 停止所有音效
         * @returns 
         */


        stopAllEffects() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.stopAllEffects();
        }
        /**
         * 播放音乐
         * @param volume 音量
         * @param bundle Bundle名，默认为app-sound
         * @param force 是否强制重新播放
         */


        playMusic({
          name,
          bundle,
          volume = 1,
          force = false,
          onPlay,
          onError
        }) {
          if (!name) {
            onError && onError();
            return;
          }

          const bundleName = bundle || BundleName;
          const soundName = `${bundleName}://${name}`; // 该音乐正在播放中

          if (!force && this.playingMusic.id !== -1 && this.playingMusic.name === soundName) {
            (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.setMusicVolume(volume);
            onPlay && onPlay();
            return;
          } // 先停止当前音乐


          this.stopMusic(); // 播放操作uuid

          const uuid = this.createUUID();
          this.playingMusic.uuid = uuid; // 记录要播放音乐的名字

          this.playingMusic.name = soundName; // 记录要播放音乐的音量

          this.playingMusic.volume = volume; // 记录音乐状态

          this.playingMusic.playing = true;
          this.playingMusic.paused = false; // 静音

          if (this.isMusicMute) {
            onPlay && onPlay();
            return;
          } // 加载音乐


          this.load(name, bundleName, audioClip => {
            if (!isValid(this)) {
              onError && onError();
              return;
            } // 不合法


            if (this.playingMusic.id !== -1) {
              onError && onError();
              return;
            }

            if (this.playingMusic.name !== soundName) {
              onError && onError();
              return;
            }

            if (this.playingMusic.uuid !== this.playingMusic.uuid) {
              onError && onError();
              return;
            } // 不存在


            if (!audioClip) {
              this.error(`playMusic ${name} 不存在或加载失败`);
              onError && onError();
              return;
            } // 静音


            if (this.isMusicMute) {
              onPlay && onPlay();
              return;
            }

            this.playingMusic.id = (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
              error: Error()
            }), AudioEngine) : AudioEngine).inst.playMusic(audioClip, volume, onPlay);
          });
        }
        /**
         * 播放音乐
         * @param volume 音量
         * @param bundle Bundle名，默认为app-sound
         * @param force 是否强制重新播放
         * @returns 如果Promise返回值是false，则播放失败
         */


        playMusicAsync(params) {
          return new Promise(resolve => {
            this.playMusic({ ...params,
              onPlay: () => {
                resolve(true);
              },
              onError: () => {
                resolve(false);
              }
            });
          });
        }
        /**
         * 重新播放音乐
         */


        replayMusic(onPlay) {
          if (!this.playingMusic.playing) return;
          if (!this.playingMusic.name) return;

          if (this.playingMusic.name.indexOf('://') > 0) {
            const [bundle, name] = this.playingMusic.name.split('://');
            this.playMusic({
              name,
              bundle,
              volume: this.playingMusic.volume,
              force: true,
              onPlay
            });
          } else {
            this.playMusic({
              name: this.playingMusic.name,
              volume: this.playingMusic.volume,
              force: true,
              onPlay
            });
          }
        }
        /**
         * 暂停音乐
         */


        pauseMusic() {
          if (!this.playingMusic.playing) return false;
          this.playingMusic.paused = true;
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.pauseMusic();
        }
        /**
         * 恢复音乐
         */


        resumeMusic() {
          if (!this.playingMusic.playing) return false;
          this.playingMusic.paused = false;
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.resumeMusic();
        }
        /**
         * 停止音乐
         */


        stopMusic() {
          this.playingMusic.playing = false;
          this.playingMusic.paused = false;
          this.playingMusic.volume = 1;
          this.playingMusic.name = '';
          this.playingMusic.uuid = '';
          this.playingMusic.id = -1;
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.stopMusic();
        }
        /**
         * 设置音乐静音
         * @param mute 是否静音
         * @param isCache 静音状态是否写入缓存(通过localstorage)
         */


        setMusicMute(mute, isCache = false) {
          isCache && storage.set(this.musicMuteCacheKey, mute);
          (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.setMusicMute(mute);

          if (!mute && this.playingMusic.name) {
            if (this.playingMusic.name.indexOf('://') > 0) {
              const [bundle, name] = this.playingMusic.name.split('://');
              this.playMusic({
                name,
                bundle,
                volume: this.playingMusic.volume
              });
            } else {
              this.playMusic({
                name: this.playingMusic.name,
                volume: this.playingMusic.volume
              });
            }
          }
        }
        /**
         * 音乐是否正在播放
         */


        get isMusicPlaying() {
          return this.playingMusic.playing;
        }
        /**
         * 音乐是否暂停
         */


        get isMusicPaused() {
          return this.playingMusic.paused;
        }
        /**
         * 音乐是否静音
         */


        get isMusicMute() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.getMusicMute();
        }
        /**
         * 设置音效静音
         * @param mute 是否静音
         * @param isCache 静音状态是否写入缓存(通过localstorage)
         */


        setEffectMute(mute, isCache = false) {
          (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.setGlobalEffectsMute(mute);
          isCache && storage.set(this.effectMuteCacheKey, mute);
        }
        /**
         * 音效是否静音
         */


        get isEffectMute() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.getGlobalEffectsMute();
        }
        /**
         * 设置音乐音量倍率
         * @param scale 
         * @param isCache 音量倍率是否写入缓存(通过localstorage)
         */


        setMusicVolumeScale(scale, isCache = false) {
          (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.setMusicVolumeScale(scale);
          isCache && storage.set(this.musicVolumeScaleCacheKey, scale);
        }
        /**
         * 音乐音量倍率
         */


        get musicVolumeScale() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.getMusicVolumeScale();
        }
        /**
         * 设置音效音量倍率
         * @param scale 
         * @param isCache 音量倍率是否写入缓存(通过localstorage)
         */


        setEffectVolumeScale(scale, isCache = false) {
          (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.setGlobalEffectsVolumeScale(scale);
          isCache && storage.set(this.effectVolumeScaleCacheKey, scale);
        }
        /**
         * 音效音量倍率
         */


        get effectVolumeScale() {
          return (_crd && AudioEngine === void 0 ? (_reportPossibleCrUseOfAudioEngine({
            error: Error()
          }), AudioEngine) : AudioEngine).inst.getGlobalEffectsVolumeScale();
        }

      }, _class2.setting = {}, _class2.MusicName = MusicName, _class2.EffectName = EffectName, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bb661aaca1f097c0440ce53f7f60740c423129fd.js.map