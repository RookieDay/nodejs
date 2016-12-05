// // 当你用的 第三方库越来越多的时候，根目录下的子目录会越来越多
// var _ = require('./underscore-master/underscore.js');

// // _.each([1,23,456],function (value,index) {
// //   console.log(index,value);
// // });

// var arr = ['a', 'b', 'c'];

// var arr = _.map(arr, function(s) {
//   return s+='_hello_world'; 
// });

// console.log(arr);

// console.log(_.random(1000,9999));

// 包的查找规则和 变量的作用域 查找规则很像
// 先在当前目录下的 node_modules 目录下找
// ，如果找不到，跑到上一级目录下的 node_modules 目录下找
// ......依次向上查找
// 最后到根目录下的 node_modules 还找不到，报错
// [ 'C:\\Users\\iroc\\Desktop\\code\\node_modules',
//   'C:\\Users\\iroc\\Desktop\\node_modules',
//   'C:\\Users\\iroc\\node_modules',
//   'C:\\Users\\node_modules',
//   'C:\\node_modules' ]

console.log(module.paths);

var _ = require('underscore');

console.log(_.random(10,99));

var cal = require('./cal');

console.log('cal模块中的random方法：',cal.random());
