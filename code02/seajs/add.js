define(function (require,exports,module) {
  // exports.foo = 'baz';

  // exports.add = function (x, y) {
  //   return x + y;
  // };

  // 不要这样写，没有效果
  // exports = function () {
    
  // }

  console.log('add.js文件被加载了');

  module.exports = function (x, y) {
    return x + y;
  };

});
