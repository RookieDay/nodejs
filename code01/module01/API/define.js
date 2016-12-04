/**
 * define 第一个参数为对象
 */
// define({
//   foo: 'bar'
// });


/**
 * define 第一个参数为字符串
 */

// define('I am a template string {name}');


/**
 * define 参数为函数形式
 */

// 注意：当define的参数为一个函数的时候
// 函数中的参数 require 和 exports 和 module  不允许改变名称
// 位置也不能改变
// 按照约定；为了避免出错，三个参数都写上
define(function(require, exports, module) {
    // require 返回值就是 另一个模块中暴露的 module.exports 接口
    // 模块标识可以省略后缀名 .js
    // ./ 相对于 require 所在的模块的文件所属目录路径
    var config = require('./config');
    // var g_config = require('../config.js');

    // console.log('全局：',g_config);
    console.log(config);
});