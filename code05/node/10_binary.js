'use strict';

const fs = require('fs');

fs.readFile('./README.md', (err, data) => {
  if (err) {
    throw err;
  }
  // node 默认读取出来的数据是 二进制数据
  console.log(data);
});
