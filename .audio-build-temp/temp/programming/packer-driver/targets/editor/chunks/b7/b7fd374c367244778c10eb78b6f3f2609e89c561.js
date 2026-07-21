System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7a377zr4IZOcZm99E2rQNJP", "BaseModel", undefined); // export type IModel<T> = {
      //     [P in keyof T]: T[P] extends Function
      //     ? '❌此处不能定义任何方法'
      //     : (
      //         T[P] extends Array<infer R>
      //         ? (
      //             R extends Function
      //             ? '❌此处不能定义任何方法'
      //             : T[P]
      //         )
      //         : T[P] // IModel<T[P]> 性能消耗大
      //     );
      // };
      // export type IStore<T> = {
      //     [P in keyof T]: T[P] extends Function
      //     ? T[P]
      //     : (
      //         T[P] extends Array<infer R>
      //         ? (
      //             R extends Function
      //             ? '❌此处不能定义任何方法'
      //             : IModel<T[P]>
      //         )
      //         : IModel<T[P]>
      //     );
      // };
      // export type IStore<T> = {
      //     [P in keyof T]: T[P] extends Function
      //     ? T[P]
      //     : IModel<T[P]>;
      // };


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b7fd374c367244778c10eb78b6f3f2609e89c561.js.map