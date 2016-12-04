define(function(require, exports, module) {
    console.log('a.js文件模块被加载了');

    // 当调用 require 之后，实际上就得到了 b.js 文件模块中的 module.exports 对象
    var b = require('./b.js');

    console.log(b.foo);

    b.sayHello();

    // module.exports = 'bar';
    module.exports.foo = '我是a.js文件中的bar';
});