System.register(["__unresolved_0", "cc", "cc/env", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, DEBUG, Logger, Storage, SoundManager, UIManager, _crd;

  function _reportPossibleCrUseOfLogger(extras) {
    _reporterNs.report("Logger", "db://app/lib/logger/logger", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStorage(extras) {
    _reporterNs.report("Storage", "db://app/lib/storage/storage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "db://app/manager/sound/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "db://app/manager/ui/UIManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_ccEnv) {
      DEBUG = _ccEnv.DEBUG;
    }, function (_unresolved_2) {
      Logger = _unresolved_2.Logger;
    }, function (_unresolved_3) {
      Storage = _unresolved_3.Storage;
    }, function (_unresolved_4) {
      SoundManager = _unresolved_4.default;
    }, function (_unresolved_5) {
      UIManager = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9a8d2pAnrJAWIiDp94P7b0z", "setting", undefined);

      // 如果需要加密内容，请设置密钥的值
      (_crd && Storage === void 0 ? (_reportPossibleCrUseOfStorage({
        error: Error()
      }), Storage) : Storage).setting.secretKey = ''; // 设置日志过滤

      (_crd && Logger === void 0 ? (_reportPossibleCrUseOfLogger({
        error: Error()
      }), Logger) : Logger).setting.filter = DEBUG ? ['error', 'log', 'warn'] : ['error']; // 预加载的UI列表

      (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
        error: Error()
      }), UIManager) : UIManager).setting.preload = ['PopResult', 'PageMain', 'PopSetting']; // 默认UI, 会在首屏流程后自动show

      (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
        error: Error()
      }), UIManager) : UIManager).setting.defaultUI = 'PageHome'; // 通过App菜单创建Page类型的UI后，填入该UI的名称(会有自动提示与类型检查)
      // 是否自动适配分辨率策略

      (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
        error: Error()
      }), UIManager) : UIManager).setting.autoFit = true; // 开启后，会弃用项目设置中的适配策略，并自动根据设备分辨率与设计分辨率计算出新的适配策略
      // 弹窗默认遮罩展现动画配置

      (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
        error: Error()
      }), UIManager) : UIManager).setting.shade = {
        delay: 0,
        begin: 100,
        end: 200,
        speed: 400,
        blur: false
      }; // 预加载的音频(按数组顺序依次预加载)

      (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
        error: Error()
      }), SoundManager) : SoundManager).setting.preload = ['music/bgm', 'effect/Button', 'effect/error', "effect/piano/A", "effect/piano/B", "effect/piano/C", "effect/piano/D", "effect/piano/E", "effect/piano/F", "effect/piano/G"]; // 默认音乐, 会在首屏流程后自动播放

      (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
        error: Error()
      }), SoundManager) : SoundManager).setting.defaultMusicName = 'music/bgm'; // 默认音效, 会在Button被点击后播放

      (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
        error: Error()
      }), SoundManager) : SoundManager).setting.defaultEffectName = 'effect/Button';

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f63302039ae6c9d4ba6f21e09506bdfcbb829392.js.map