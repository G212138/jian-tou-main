System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, AudioSource, Node, Audio, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      AudioSource = _cc.AudioSource;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a40e7emzaxEXKUMqM7SQR28", "Audio", undefined);

      __checkObsolete__(['AudioClip', 'AudioSource', 'Node']);

      _export("default", Audio = class Audio {
        get playing() {
          return this._playing;
        }

        set playing(value) {
          this._playing = value;
        }

        get paused() {
          return this._paused;
        }

        set paused(value) {
          this._paused = value;
        }

        constructor() {
          this.volume = 1;
          this.volumeScale = 1;
          this.mute = false;
          this.endedCallback = null;
          this.startedCallback = null;
          this._playing = false;
          this._paused = false;
          this.audioSource = null;
          var node = new Node('audio');
          this.audioSource = node.addComponent(AudioSource);
          node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
          node.on(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        }

        onAudioEnded() {
          if (this.endedCallback) {
            var endedCallback = this.endedCallback;
            this.endedCallback = null;
            endedCallback();
          }
        }

        onAudioStarted() {
          if (this.startedCallback) {
            var startedCallback = this.startedCallback;
            this.startedCallback = null;
            startedCallback();
          }
        }

        play(clip, onEnded, onStarted) {
          if (onEnded === void 0) {
            onEnded = null;
          }

          if (onStarted === void 0) {
            onStarted = null;
          }

          this.audioSource.clip = clip;
          this.endedCallback = onEnded;
          this.startedCallback = onStarted;
          this.audioSource.play();
          this.playing = true;
          this.paused = false;
          return this;
        }

        stop() {
          this.playing = false;
          this.paused = false;
          this.audioSource.stop();
          this.audioSource.node.emit(AudioSource.EventType.ENDED);
          return this;
        }

        pause() {
          if (!this.playing) return this;
          this.paused = true;
          this.audioSource.pause();
          return this;
        }

        resume() {
          if (!this.playing) return this;
          if (!this.paused) return this;
          this.paused = false;
          this.audioSource.play();
          return this;
        }

        setVolume(volume, scale) {
          if (volume === void 0) {
            volume = 1;
          }

          this.volume = volume;
          if (typeof scale === 'number') this.volumeScale = scale;
          this.audioSource.volume = volume * this.volumeScale * (this.mute ? 0 : 1);
          return this;
        }

        getVolume() {
          return this.volume;
        }

        setVolumeScale(scale) {
          if (scale === void 0) {
            scale = 1;
          }

          this.volumeScale = scale;
          this.audioSource.volume = this.volume * scale * (this.mute ? 0 : 1);
          return this;
        }

        getVolumeScale() {
          return this.volumeScale;
        }

        setLoop(loop) {
          this.audioSource.loop = loop;
          return this;
        }

        getLoop() {
          return this.audioSource.loop;
        }

        setMute(mute) {
          if (mute === void 0) {
            mute = true;
          }

          this.mute = mute;
          this.setVolume(this.volume);
          return this;
        }

        getMute() {
          return this.mute;
        }

        onEnded(endedCallback) {
          this.endedCallback = endedCallback;
          return this;
        }

        clear() {
          this.volume = 1;
          this.volumeScale = 1;
          this.mute = false;
          this.paused = false;
          this.endedCallback = null;
          this.startedCallback = null;

          if (this.audioSource) {
            this.audioSource.stop();
            this.audioSource.volume = 1;
            this.audioSource.clip = null;
            this.audioSource.loop = false;
          }

          return this;
        }

        destroy() {
          this.clear();
          this.audioSource.destroy();
          this.audioSource.node.destroy();
          this.audioSource = null;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5bb9e03d3250942bdf06043807244cd0f5459990.js.map