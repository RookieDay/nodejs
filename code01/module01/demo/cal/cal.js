// 2. 定义一个模块
define(function(require, exports, module) {
  // 在这里写 cal.js  文件模块的代码
  console.log('cal.js文件模块被加载了并执行了');

  // require 会得到该模块内部的 module.exports 返回值
  var add = require('./add.js');

  var substract = require('./substract.js');

  module.exports = {
    add: add,
    substract: substract
  };

});
