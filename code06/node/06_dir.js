'use strict';

const fs = require('fs');
const path = require('path');

// 创建目录，只能在一个已存在的目录下创建一个一级目录
// 如果想创建多级目录
// /a/b/c/d/e  把他们分割成一个数组，
// 循环数据 取出第一个元素,根据该元素，拼接一个完整的路径，然后创建
// 创建成功，递归调用下一个函数
// fs.mkdir(path.join(__dirname,'b','c'),(err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('created dir success');
// });

// 作业：递归创建一个多级目录
function mkdirs(dirPath) {
  
}

// rmdir 只能删除一个空目录
// 要想删除一个非空目录，必须使用递归的方式自己写API
// fs.rmdir(path.join(__dirname,'b'),(err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('removed success');
// });

// 思考：自己写一个方法，可以递归删除一个非空目录
function rmdirs(dirPath) {
  
}


