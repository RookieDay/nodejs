'use strict';

const fs = require('fs');
const path = require('path');

// fs.exists('C:/Users/iroc',(exists) => {
//   if (exists) {
//     console.log('该路径存在');
//   }else {
//     console.log('路径不存在');
//   }
// });


// 获取文件或目录的信息
// fs.stat(path.join(__dirname,'README.md'),(err,stats) => {
//   if (err) {
//     throw err;
//   }
//   if (stats.isFile()) {
//     console.log('是文件');
//   }else if (stats.isDirectory()) {
//     console.log('是目录');
//   }

//   // mtime 可以获取文件的修改时间
//   console.log(stats.mtime.getHours());
//   console.log(stats.mtime.getMinutes());
// });


// 重命名文件
// let oldPath = path.join(__dirname, 'a.txt');
// let newPath = path.join(__dirname, 'b.txt');
// fs.rename(oldPath, newPath, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('success');
// });

// 移动文件, rename 也可以用来移动文件，移动的同时也可以重命名
let oldPath = path.join(__dirname, 'b.txt');
let newPath = path.join(__dirname, '../b.txt');

fs.rename(oldPath,newPath,(err) => {
  if (err) {
    throw err;
  }
  console.log('success');
});
