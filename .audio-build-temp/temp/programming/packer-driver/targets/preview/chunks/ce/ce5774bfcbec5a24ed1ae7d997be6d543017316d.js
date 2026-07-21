System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, AudioManager, AudioEngine, _crd;

  function _reportPossibleCrUseOfAudio(extras) {
    _reporterNs.report("Audio", "./Audio", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAudioManager(extras) {
    _reporterNs.report("AudioManager", "./AudioManager", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      AudioManager = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7a6389cgB9OaYjMP8cuG+mF", "AudioEngine", undefined);

      __checkObsolete__(['AudioClip']);

      _export("default", AudioEngine = class AudioEngine {
        static get inst() {
          if (!this._inst) this._inst = new AudioEngine();
          return this._inst;
        }

        constructor() {
          /**effect的id从1开始，music的id始终为0 */
          this.audioID = 1;
          this.endedCallbackMap = new Map();
          this.effectMap = new Map();
          this.music = null;
          this.musicMute = false;
          this.musicVolumeScale = 1;
          this.effectMute = false;
          this.effectVolumeScale = 1;
        }

        ////////////////////////////////
        // 音效                        //
        ////////////////////////////////
        playEffect(audioClip, volume, loop, onStarted, onEnded) {
          if (volume === void 0) {
            volume = 1;
          }

          if (loop === void 0) {
            loop = false;
          }

          if (onStarted === void 0) {
            onStarted = null;
          }

          if (onEnded === void 0) {
            onEnded = null;
          }

          if (this.audioID > 100000) this.audioID = 1;
          var audioID = this.audioID++;
          var audio = (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
            error: Error()
          }), AudioManager) : AudioManager).inst.getAudio();
          this.effectMap.set(audioID, audio);
          if (onEnded) this.endedCallbackMap.set(audioID, onEnded);
          audio.setLoop(loop).setMute(this.effectMute).setVolume(volume, this.effectVolumeScale).play(audioClip, () => {
            (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
              error: Error()
            }), AudioManager) : AudioManager).inst.putAudio(audio);
            this.effectMap.delete(audioID);
            var callback = this.endedCallbackMap.get(audioID);

            if (callback) {
              this.endedCallbackMap.delete(audioID);
              callback();
            }
          }, () => {
            onStarted && onStarted(audioID);
          });
          return audioID;
        }

        stopEffect(id) {
          var _this$effectMap$get;

          return !!((_this$effectMap$get = this.effectMap.get(id)) != null && _this$effectMap$get.stop());
        }

        stopAllEffects() {
          this.effectMap.forEach(audio => {
            audio.stop();
          });
        }

        pauseEffect(id) {
          var _this$effectMap$get2;

          return !!((_this$effectMap$get2 = this.effectMap.get(id)) != null && _this$effectMap$get2.pause());
        }

        pauseAllEffects() {
          this.effectMap.forEach(audio => {
            audio.pause();
          });
        }

        resumeEffect(id) {
          var _this$effectMap$get3;

          return !!((_this$effectMap$get3 = this.effectMap.get(id)) != null && _this$effectMap$get3.resume());
        }

        resumeAllEffects() {
          this.effectMap.forEach(audio => {
            audio.resume();
          });
        }

        setEffectMute(id, mute) {
          var _this$effectMap$get4;

          return !!((_this$effectMap$get4 = this.effectMap.get(id)) != null && _this$effectMap$get4.setMute(mute));
        }

        getEffectMute(id) {
          var _this$effectMap$get5;

          return !!((_this$effectMap$get5 = this.effectMap.get(id)) != null && _this$effectMap$get5.getMute());
        }

        setEffectVolume(id, volume) {
          var _this$effectMap$get6;

          return !!((_this$effectMap$get6 = this.effectMap.get(id)) != null && _this$effectMap$get6.setVolume(volume));
        }

        getEffectVolume(id) {
          var _this$effectMap$get7;

          return ((_this$effectMap$get7 = this.effectMap.get(id)) == null ? void 0 : _this$effectMap$get7.getVolume()) || 0;
        }

        setAllEffectsVolume(volume) {
          this.effectMap.forEach(audio => {
            audio.setVolume(volume);
          });
        }

        setEffectVolumeScale(id, volume) {
          var _this$effectMap$get8;

          return !!((_this$effectMap$get8 = this.effectMap.get(id)) != null && _this$effectMap$get8.setVolumeScale(volume));
        }

        getEffectVolumeScale(id) {
          var _this$effectMap$get9;

          return ((_this$effectMap$get9 = this.effectMap.get(id)) == null ? void 0 : _this$effectMap$get9.getVolumeScale()) || 0;
        }

        setGlobalEffectsVolumeScale(scale) {
          this.effectVolumeScale = scale;
          this.effectMap.forEach(audio => {
            audio.setVolumeScale(scale);
          });
        }

        getGlobalEffectsVolumeScale() {
          return this.effectVolumeScale;
        }

        setGlobalEffectsMute(mute) {
          this.effectMute = mute;
          this.effectMap.forEach(audio => {
            audio.setMute(mute);
          });
        }

        getGlobalEffectsMute() {
          return this.effectMute;
        } ////////////////////////////////
        // 音乐                        //
        ////////////////////////////////


        playMusic(audioClip, volume, onStarted) {
          if (volume === void 0) {
            volume = 1;
          }

          if (onStarted === void 0) {
            onStarted = null;
          }

          this.stopMusic();
          this.music = (_crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
            error: Error()
          }), AudioManager) : AudioManager).inst.getAudio();
          this.music.setLoop(true).setMute(this.musicMute).setVolume(volume, this.musicVolumeScale).play(audioClip, null, onStarted);
          return 0;
        }

        stopMusic() {
          if (!this.music) return false;
          this.music.destroy();
          this.music = null;
          return true;
        }

        pauseMusic() {
          if (!this.music) return false;
          this.music.pause();
          return true;
        }

        resumeMusic() {
          if (!this.music) return false;
          this.music.resume();
          return true;
        }

        setMusicVolume(volume) {
          if (!this.music) return false;
          this.music.setVolume(volume);
          return true;
        }

        getMusicVolume() {
          if (!this.music) return -1;
          return this.music.getVolume();
        }

        setMusicVolumeScale(scale) {
          var _this$music;

          this.musicVolumeScale = scale;
          (_this$music = this.music) == null || _this$music.setVolumeScale(scale);
          return true;
        }

        getMusicVolumeScale() {
          return this.musicVolumeScale;
        }

        setMusicMute(mute) {
          var _this$music2;

          this.musicMute = mute;
          (_this$music2 = this.music) == null || _this$music2.setMute(mute);
          return true;
        }

        getMusicMute() {
          return this.musicMute;
        } ////////////////////////////////
        // 通用                        //
        ////////////////////////////////


        setEndedCallback(audioID, callback) {
          if (audioID === 0) {
            var _this$music3;

            return !!((_this$music3 = this.music) != null && _this$music3.onEnded(callback));
          } else {
            if (this.effectMap.has(audioID)) {
              this.endedCallbackMap.set(audioID, callback);
              return true;
            }

            return false;
          }
        }

        stop(audioID) {
          if (audioID === 0) {
            return this.stopMusic();
          } else {
            return this.stopEffect(audioID);
          }
        }

        pause(audioID) {
          if (audioID === 0) {
            return this.pauseMusic();
          } else {
            return this.pauseEffect(audioID);
          }
        }

        resume(audioID) {
          if (audioID === 0) {
            return this.resumeMusic();
          } else {
            return this.resumeEffect(audioID);
          }
        }

        pauseAll() {
          this.pauseMusic();
          this.pauseAllEffects();
        }

        resumeAll() {
          this.resumeMusic();
          this.resumeAllEffects();
        }

        stopAll() {
          this.stopMusic();
          this.stopAllEffects();
        }

        setVolume(audioID, volume) {
          if (audioID === 0) {
            return this.setMusicVolume(volume);
          } else {
            return this.setEffectVolume(audioID, volume);
          }
        }

        getVolume(audioID) {
          if (audioID === 0) {
            return this.getMusicVolume();
          } else {
            return this.getEffectVolume(audioID);
          }
        }

        setVolumeScale(audioID, scale) {
          if (audioID === 0) {
            return this.setMusicVolumeScale(scale);
          } else {
            return this.setEffectVolumeScale(audioID, scale);
          }
        }

        getVolumeScale(audioID) {
          if (audioID === 0) {
            return this.getMusicVolumeScale();
          } else {
            return this.getEffectVolumeScale(audioID);
          }
        }

      });

      AudioEngine._inst = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ce5774bfcbec5a24ed1ae7d997be6d543017316d.js.map