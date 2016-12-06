'use strict';

const fs = require('fs');
const path = require('path');

console.log(1);

// 异步调用获取文件内容
// fs.readFile(path.join(__dirname,'README.md'), 'utf8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(2);
// });


console.log(3);
// 同步调用获取文件内容
try {
    let data = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
    console.log(data);
} catch (e) {
    console.log('糟了，读取文件失败了');
}