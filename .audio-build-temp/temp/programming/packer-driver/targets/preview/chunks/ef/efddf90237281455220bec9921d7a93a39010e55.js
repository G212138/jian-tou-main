System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Watcher, _crd, lazilyWatchers, depsMap, parentMap, proxyMap, activeWatcher;

  function reactive() {
    lazilyWatchers.forEach(watcher => watcher.run());
    lazilyWatchers.clear();
  } // 原始对象 => 每个key对应的Watcher实例集合


  /**
   * 收集依赖(只要是访问某个对象的某个属性，都要调用track函数，以收集依赖到当前的watcher中)
   * - 将当前watcher实例添加到对象属性对应的依赖集合中，同时将集合添加到当前watcher的依赖集合中(这一步主要用于在watcher中可以取消依赖追踪，即watcher.cancel())
   */
  function track(obj, prop) {
    if (!activeWatcher) return;
    var objDeps = depsMap.get(obj);

    if (!objDeps) {
      objDeps = new Map();
      depsMap.set(obj, objDeps);
    } // 每个key对应的Watcher实例集合


    var propDeps = objDeps.get(prop);

    if (!propDeps) {
      propDeps = new Set();
      objDeps.set(prop, propDeps);
    }

    if (!propDeps.has(activeWatcher)) {
      propDeps.add(activeWatcher);
      activeWatcher.deps.add(propDeps);
    }
  }
  /**
   * 触发依赖追踪
   * @param obj 
   * @param prop 
   */


  function trigger(obj, prop) {
    var objDeps = depsMap.get(obj);
    if (!objDeps) return;
    var propDeps = objDeps.get(prop);
    if (!propDeps) return; // 延迟执行

    propDeps.forEach(watcher => {
      lazilyWatchers.add(watcher);
    }); // 立即执行(创建副本避免循环)
    // new Set(propDeps).forEach(watcher => watcher.run());
  }
  /**
   * 触发依赖追踪的后续操作(向上触发父级依赖追踪)
   * @param obj 
   */


  function triggerOver(obj) {
    var parent = parentMap.get(obj);
    if (!parent) return;
    var grandpa = parentMap.get(parent.obj);
    if (!grandpa) return;
    var objDeps = depsMap.get(grandpa.obj);
    if (!objDeps) return;
    var propDeps = objDeps.get(grandpa.prop);
    if (!propDeps) return; // 延迟执行

    propDeps.forEach(watcher => {
      lazilyWatchers.add(watcher);
    }); // 立即执行(创建副本避免循环)
    // new Set(propDeps).forEach(watcher => watcher.run());

    triggerOver(parent.obj);
  }

  function watch(callback, target) {
    var watcher = new Watcher(callback, target);
    watcher.run();
    return () => watcher.cancel();
  } // 数组方法


  function handleArray(obj, prop, receiver) {
    // 修改类操作
    if (prop === 'splice') {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var start = args[0];
        var deleteCount = args.length > 1 ? args[1] : obj.length - start;
        var addCount = args.length > 2 ? args.length - 2 : 0;
        var result = Array.prototype.splice.apply(obj, args);
        var triggerCalled = false;

        if (deleteCount === addCount) {
          for (var i = start; i < start + deleteCount; ++i) {
            triggerCalled = true;
            trigger(obj, i);
          }
        } else {
          for (var _i = start; _i < obj.length; ++_i) {
            trigger(obj, _i);
          }

          trigger(obj, 'length');
          triggerCalled = true;
        }

        if (triggerCalled) {
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
        }

        return result;
      };
    }

    if (prop === 'fill') {
      return function () {
        var oldArr = obj.slice();

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var result = Array.prototype.fill.apply(obj, args);
        var length = Math.max(oldArr.length, obj.length);
        var triggerCalled = false;

        for (var i = 0; i < length; ++i) {
          if (oldArr[i] === obj[i]) continue;
          triggerCalled = true;
          trigger(obj, i);
        }

        if (oldArr.length !== obj.length) {
          trigger(obj, 'length');
          triggerCalled = true;
        }

        if (triggerCalled) {
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
        }

        return result;
      };
    }

    if (prop === 'push') {
      return function () {
        var oldLen = obj.length;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        var result = Array.prototype.push.apply(obj, args);
        if (oldLen === obj.length) return result;

        for (var i = oldLen; i < obj.length; ++i) {
          trigger(obj, i);
        }

        trigger(obj, 'length');
        trigger(obj, Symbol.iterator);
        triggerOver(obj);
        return result;
      };
    }

    if (prop === 'pop') {
      return function () {
        var oldLen = obj.length;
        var result = Array.prototype.pop.call(obj);
        if (oldLen === obj.length) return result;
        trigger(obj, obj.length);
        trigger(obj, 'length');
        trigger(obj, Symbol.iterator);
        triggerOver(obj);
        return result;
      };
    }

    if (prop === 'shift' || prop === 'unshift') {
      return function () {
        var oldLen = obj.length;

        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        var result = Array.prototype[prop].apply(obj, args);
        if (oldLen === obj.length) return result;
        var length = Math.max(oldLen, obj.length);

        for (var i = 0; i < length; ++i) {
          trigger(obj, i);
        }

        trigger(obj, 'length');
        trigger(obj, Symbol.iterator);
        triggerOver(obj);
        return result;
      };
    }

    if (prop === 'sort' || prop === 'reverse') {
      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        var result = Array.prototype[prop].apply(obj, args);
        if (obj.length <= 1) return result;

        for (var i = 0; i < obj.length; ++i) {
          trigger(obj, i);
        }

        trigger(obj, Symbol.iterator);
        triggerOver(obj);
        return result;
      };
    } // 获取类操作


    if (prop === 'forEach') {
      return function (callback) {
        track(obj, 'size');
        obj.forEach((val, key) => {
          track(obj, key);
          callback(create(val), key, obj);
        });
      };
    }

    var value = Reflect.get(obj, prop, receiver);
    return create(value);
  }

  function handleMap(obj, prop, receiver) {
    // 修改类操作
    if (prop === 'set') {
      return function (key, val) {
        var oldVal = Map.prototype.get.call(obj, key);
        if (oldVal === val) return this;
        var hasProp = Map.prototype.has.call(obj, key);
        Map.prototype.set.call(obj, key, val); // 触发更新

        trigger(obj, key);

        if (!hasProp) {
          trigger(obj, 'size');
        }

        trigger(obj, Symbol.iterator);
        triggerOver(obj);
        return this;
      };
    }

    if (prop === 'delete') {
      return function (key) {
        var hasProp = Map.prototype.has.call(obj, key);
        if (!hasProp) return true;

        if (Map.prototype.delete.call(obj, key)) {
          // 触发更新
          trigger(obj, key);
          trigger(obj, 'size');
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
          return true;
        }

        return false;
      };
    }

    if (prop === 'clear') {
      return function () {
        if (obj.size === 0) return;
        obj.forEach((val, key) => {
          if (!Map.prototype.delete.call(obj, key)) return; // 触发更新

          trigger(obj, key);
        });
        trigger(obj, 'size');
        trigger(obj, Symbol.iterator);
        triggerOver(obj);
      };
    } // 获取类操作


    if (prop === 'has') {
      return function (key) {
        track(obj, key);
        return Map.prototype.has.call(obj, key);
      };
    }

    if (prop === 'get') {
      return function (key) {
        track(obj, key);
        var val = Map.prototype.get.call(obj, key);
        return create(val);
      };
    }

    if (prop === 'forEach') {
      return function (callback) {
        track(obj, 'size');
        obj.forEach((val, key) => {
          track(obj, key);
          callback(create(val), key, obj);
        });
      };
    }

    if (prop === 'keys') {
      return function () {
        track(obj, 'size');
        return Map.prototype.keys.call(obj);
      };
    }

    if (prop === 'values' || prop === 'entries') {
      return function () {
        track(obj, 'size');
        return () => {
          // 返回迭代器工厂函数
          return new Proxy(Map.prototype[prop].call(obj), {
            get: (iterator, method) => {
              if (method === 'next') {
                return () => {
                  var value = iterator.next();
                  return create(value);
                };
              }

              return Reflect.get(iterator, method, receiver);
            }
          });
        };
      };
    }

    var value = Reflect.get(obj, prop);
    return create(value);
  }

  function handleSet(obj, prop, receiver) {
    // 修改类操作
    if (prop === 'add' || prop === 'delete' || prop === 'clear') {
      return function (val) {
        var oldSize = obj.size;
        var result = Set.prototype[prop].call(obj, val); // 触发更新

        if (oldSize !== obj.size) {
          trigger(obj, 'size');
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
        } // add方法返回的是Set对象，但是这里要转换为返回Proxy对象，以便后续可以继续拦截操作


        if (result === obj) {
          return this;
        }

        return result;
      };
    } // 获取类操作


    if (prop === 'has') {
      return function (val) {
        track(obj, 'size');
        return Set.prototype.has.call(obj, val);
      };
    }

    if (prop === 'forEach') {
      return function (callback) {
        track(obj, 'size');
        obj.forEach((val, value2) => {
          callback(create(val), value2, obj);
        });
      };
    }

    if (prop === 'keys') {
      return function () {
        track(obj, 'size');
        return Set.prototype.keys.call(obj);
      };
    }

    if (prop === 'values' || prop === 'entries') {
      return () => {
        // 返回迭代器工厂函数
        track(obj, 'size');
        return new Proxy(Set.prototype[prop].call(obj), {
          get: (iterator, method) => {
            if (method === 'next') {
              return () => {
                var value = iterator.next();
                return create(value);
              };
            }

            return Reflect.get(iterator, method, receiver);
          }
        });
      };
    }

    var value = Reflect.get(obj, prop);
    return create(value);
  }

  function create(target) {
    if (target instanceof WeakMap) {
      console.error('Store: 不支持WeakMap类型数据');
      return target;
    }

    if (target === null || target === undefined || typeof target !== 'object' || target instanceof Date || target instanceof RegExp) {
      return target;
    }

    if (proxyMap.has(target)) {
      return proxyMap.get(target);
    }

    var proxy = new Proxy(target, {
      get(obj, prop, receiver) {
        // 依赖收集
        track(obj, prop); // Symbol.iterator(迭代器，用于for...of循环)

        if (prop === Symbol.iterator) {
          return () => {
            // 返回迭代器工厂函数
            return new Proxy(obj[Symbol.iterator](), {
              get: (iterator, method) => {
                if (method === 'next') {
                  return () => {
                    var value = iterator.next();
                    return create(value);
                  };
                }

                return Reflect.get(iterator, method, receiver);
              }
            });
          };
        } // 访问数组属性


        if (Array.isArray(obj)) {
          return handleArray(obj, prop, receiver);
        } // 访问Map属性


        if (obj instanceof Map) {
          return handleMap(obj, prop, receiver);
        } // 访问Set属性


        if (obj instanceof Set) {
          return handleSet(obj, prop, receiver);
        } // 获取值


        var value = Reflect.get(obj, prop, receiver); // 如果值是函数，直接返回

        if (typeof value === 'function') {
          return value;
        } // 如果是WeakMap，直接返回


        if (value instanceof WeakMap) {
          console.warn('Store: 不支持追踪WeakMap内的数据');
          return value;
        } // 一些基本类型，直接返回


        if (value === null || value === undefined || typeof value !== 'object' || value instanceof Date || value instanceof RegExp) {
          return value;
        } // 记录对象属性的父级引用


        parentMap.set(value, {
          obj,
          prop
        }); // 递归响应式转换

        return create(value);
      },

      set(obj, prop, value, receiver) {
        var oldVal = Reflect.get(obj, prop, receiver);
        if (oldVal === value) return true;
        var result = Reflect.set(obj, prop, value, receiver);

        if (result) {
          // 触发更新
          trigger(obj, prop);
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
        }

        return result;
      },

      deleteProperty(obj, prop) {
        var hasProp = Reflect.has(obj, prop);
        var result = Reflect.deleteProperty(obj, prop); // 触发更新

        if (result && hasProp) {
          trigger(obj, prop);
          trigger(obj, Symbol.iterator);
          triggerOver(obj);
        }

        return result;
      }

    });
    proxyMap.set(target, proxy);
    return proxy;
  }

  _export({
    reactive: reactive,
    watch: watch,
    create: create
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c224fwfWnZNJ6WqFmWegIXc", "Store", undefined);

      /* eslint-disable @typescript-eslint/no-this-alias */
      lazilyWatchers = new Set();
      depsMap = new WeakMap(); // 原始对象 => 父级引用

      parentMap = new WeakMap(); // 原始对象 => 代理对象

      proxyMap = new WeakMap(); // 当前正在执行的 watcher 实例

      activeWatcher = null;
      Watcher = class Watcher {
        constructor(callback, target) {
          this.deps = void 0;
          this.callback = callback;
          this.target = target;
          this.deps = new Set();
        }

        run() {
          // 清理旧依赖
          this.deps.forEach(dep => dep.delete(this));
          this.deps.clear(); // 收集新依赖

          var prevWatcher = activeWatcher;
          activeWatcher = this;
          this.callback.call(this.target);
          activeWatcher = prevWatcher;
        }

        cancel() {
          this.deps.forEach(dep => dep.delete(this));
          this.deps.clear();

          if (lazilyWatchers.has(this)) {
            lazilyWatchers.delete(this);
          }
        }

      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=efddf90237281455220bec9921d7a93a39010e55.js.map