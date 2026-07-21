System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Director, director, Node, create, reactive, watch, _crd, WatchCache, BindCache;

  /**
   * 立即通知监听者数据变化了
   * - watchStore和bindStore监听的数据变化，都是延迟到Director.EVENT_AFTER_UPDATE中触发的，使用此函数可以立即通知变化
   */
  function notifyWatchers() {
    (_crd && reactive === void 0 ? (_reportPossibleCrUseOfreactive({
      error: Error()
    }), reactive) : reactive)();
  }
  /**
   * 在constructor中执行createStore(this)，自动将类的实例转换成store
   */


  function createStore(target) {
    return (_crd && create === void 0 ? (_reportPossibleCrUseOfcreate({
      error: Error()
    }), create) : create)(target);
  }

  /**
   * 监听数据变化
   * @param watcher 响应式函数
   * @param target  函数绑定的上下文
   * @param once 只监听一次
   */
  function watchStore(watcher, target, once) {
    if (once) {
      (_crd && watch === void 0 ? (_reportPossibleCrUseOfwatch({
        error: Error()
      }), watch) : watch)(watcher, target)();
      return;
    }

    var watchItem = [watcher, target, null];
    WatchCache.push(watchItem);
    var disposer = (_crd && watch === void 0 ? (_reportPossibleCrUseOfwatch({
      error: Error()
    }), watch) : watch)(watcher, target);

    if (WatchCache.indexOf(watchItem) !== -1) {
      watchItem[2] = disposer;
    } else {
      disposer();
    }
  }
  /**
   * 取消监听数据变化
   * @description 在不需要时一定要手动调用此方法，否则会造成内存泄漏
   * @param watcher 响应式函数
   * @param target  函数绑定的上下文
   */


  function stopWatch(watcher, target) {
    for (var index = 0; index < WatchCache.length; index++) {
      var [_watcher, _target, _disposer] = WatchCache[index];
      if (watcher !== _watcher) continue;
      if (typeof target !== 'undefined' && target !== _target) continue;
      WatchCache.splice(index--, 1);
      if (_disposer) _disposer();
    }
  }
  /**
   * 判断是否正在监听数据变化
   * @param watcher 响应式函数
   * @param target 函数绑定的上下文
   */


  function isWatching(watcher, target) {
    for (var index = 0; index < WatchCache.length; index++) {
      var [_watcher, _target] = WatchCache[index];
      if (watcher !== _watcher) continue;
      if (typeof target !== 'undefined' && target !== _target) continue;
      return true;
    }

    return false;
  }

  /**
   * 将Node或Component的属性与store绑定
   * @description 在Node或Component销毁时将自动解绑
   * @description 但如果是调用node.removeFromParent移除node，并不会自动解绑，如果需要请手动解绑
   */
  function bindStore(obj, key, value) {
    var map = BindCache.get(obj);

    if (!map) {
      map = new Map();
      BindCache.set(obj, map);
    } // 如果已经绑定过了，则不再重复绑定


    if (map.has(key)) return;

    var callback = comOrNode => {
      if (Node.isNode(comOrNode)) {
        return stopBind(obj, key);
      }

      if (comOrNode !== obj) return;
      stopBind(obj, key);
    };

    var disposer = (_crd && watch === void 0 ? (_reportPossibleCrUseOfwatch({
      error: Error()
    }), watch) : watch)(() => obj[key] = value());
    map.set(key, [disposer, callback]);

    if (Node.isNode(obj)) {
      obj.on(Node.EventType.NODE_DESTROYED, callback);
    } else {
      obj.node.on(Node.EventType.COMPONENT_REMOVED, callback);
      obj.node.on(Node.EventType.NODE_DESTROYED, callback);
    }
  }
  /**
   * 将Node或Component的属性与store解绑
   */


  function stopBind(obj, key) {
    var map = BindCache.get(obj);
    if (!map) return;
    var fns = map.get(key);
    if (!fns) return;
    map.delete(key);

    if (map.size === 0) {
      BindCache.delete(obj);
    }

    var [disposer, callback] = fns;

    if (Node.isNode(obj)) {
      obj.off(Node.EventType.NODE_DESTROYED, callback);
    } else {
      obj.node.off(Node.EventType.COMPONENT_REMOVED, callback);
      obj.node.off(Node.EventType.NODE_DESTROYED, callback);
    }

    disposer();
  }

  function _reportPossibleCrUseOfcreate(extras) {
    _reporterNs.report("create", "./assets/Store", _context.meta, extras);
  }

  function _reportPossibleCrUseOfreactive(extras) {
    _reporterNs.report("reactive", "./assets/Store", _context.meta, extras);
  }

  function _reportPossibleCrUseOfwatch(extras) {
    _reporterNs.report("watch", "./assets/Store", _context.meta, extras);
  }

  _export({
    notifyWatchers: notifyWatchers,
    createStore: createStore,
    watchStore: watchStore,
    stopWatch: stopWatch,
    isWatching: isWatching,
    bindStore: bindStore,
    stopBind: stopBind
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Director = _cc.Director;
      director = _cc.director;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      create = _unresolved_2.create;
      reactive = _unresolved_2.reactive;
      watch = _unresolved_2.watch;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fb312ZthWlHZaApQ/KihRHx", "index", undefined);

      __checkObsolete__(['Component', 'Director', 'director', 'Node']);

      director.on(Director.EVENT_AFTER_UPDATE, _crd && reactive === void 0 ? (_reportPossibleCrUseOfreactive({
        error: Error()
      }), reactive) : reactive);
      WatchCache = [];
      BindCache = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7b58d4dc04dd4e855c52c88b6357ec2974eeeac5.js.map