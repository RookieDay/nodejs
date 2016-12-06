'use strict';

const fs = require('fs');

// 默认通过 fs 读取出来的文件内容 都是 二进制数据
// 要想将该二进制数据转换成你认识的字符
fs.readFile('./b.txt', 'gbk', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
