'use strict';

const iconv = require('iconv-lite');
const fs = require('fs');

// fs.writeFile('./c.txt',iconv.encode('哈哈', 'GBK'),(err) => {

// });

// fs.appendFile('./c.txt','今天天气不错','utf8',(err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('success');
// });


// 在文件中，要偏移四个字节往后写
// fs.writeFile('./c.txt',iconv.encode('哈哈', 'GBK'),(err) => {

// });

fs.readFile('./c.txt', (err, data) => {
  if (err) {
    throw err;
  }

  // let oldStr = iconv.decode(data.slice(0,4), 'GBK');
  let newStr = iconv.decode(data.slice(4),'utf8');
  console.log(newStr);
});

// fs.appendFile('./c.txt','\n我爱北京天安门','utf8',(err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('success');
// });
