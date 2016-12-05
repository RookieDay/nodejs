/**
 * global
 * 在 Node 中，默认也有一个全局对象：global，类似于浏览器中的 window
 * 默认在文件中，声明的变量、函数、对象。。都属于该文件模块作用于之内的
 * 在 REPL 运行环境中，就和我们浏览器中的 window 基本特性一致
 * 在一次模块系统的执行过程中，所有文件都共享一个 global 对象
 * 在 Node 中，默认都是文件模块作用域，没有全局作用域的概念了
 * 在Node.js中，天生就支持 模块化了
 */

var cal = require('./cal.js');

console.log('cal对象：',cal);

var foo = 'bar';

console.log(foo);

// console.log(global.foo);

// global.foo = foo;
console.log('global 中的 foo 变量：',global.foo);
