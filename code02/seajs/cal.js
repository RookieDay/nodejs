define(function(require, exports, module) {
  // module.exports.foo = 'bar'; 等价于 下面这句代码

  // 在整个模块系统中， require 加载的文件模块会被缓存，一次加载，后面就不用重新加载了
  // require 默认就是 同步加载一个模块

  // require 实际上得到的是 add.js 文件中暴露的接口对象 module.exports
  var add = require('./add.js');

  console.log(add(1,2)); // 3

  exports.foo = 'bar';
  exports.add = add;

  var divide = require('./divide.js');

  console.log(divide(10,10));

  console.log(require('./add.js')(10,10)); // 20


  // 异步形式加载一个模块，通过 在回调函数中 传入一个形参用来接收该模块中暴露的 module.exports 对象
  require.async('./substract.js',function (substract) {
    console.log(substract(10,1));
  });
  
});
