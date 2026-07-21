System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Audio, AudioManager, _crd;

  function _reportPossibleCrUseOfAudio(extras) {
    _reporterNs.report("Audio", "./Audio", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Audio = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5902c7PSWZGdZWpqw8PJxhX", "AudioManager", undefined);

      _export("default", AudioManager = class AudioManager {
        static get inst() {
          if (!this._inst) this._inst = new AudioManager();
          return this._inst;
        }

        constructor() {
          this.audioArray = [];
        }

        getAudio() {
          if (this.audioArray.length) {
            return this.audioArray.pop();
          }

          return new (_crd && Audio === void 0 ? (_reportPossibleCrUseOfAudio({
            error: Error()
          }), Audio) : Audio)();
        }

        putAudio(audio) {
          audio.clear();
          this.audioArray.push(audio);
        }

      });

      AudioManager._inst = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7ac5435a7d7cc2ddb734c33ad96558a42d9bb6f4.js.map