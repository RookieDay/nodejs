define(function (require, exports, module) {

  module.exports.add = function (x,y) {
    return x + y;
  };

  // 当你想向外暴露多个函数的时候，可以通过 多次调用 exports.挂载的属性 向外暴露

  // 为了少了一个 . 少了一层命名空间，实际上还是一个东西
  exports.add = function (x,y) {
    return x + y;
  };

  exports.substract = function (x,y) {
    return x - y;
  };
});
