'use strict';

const fs = require('fs');
const path = require('path');

let sourcePath = 'D:/Softwares/OS/CentOS-7-x86_64-DVD-1511.iso';
let distPath = 'C:/Users/iroc/Desktop/CentOS-7-x86_64-DVD-1511.iso';

// 复制的思路：先读取，再写入
fs.readFile(sourcePath,(err,data) => {
  if (err) {
    throw err;
  }
  fs.writeFile(distPath,data,(err) => {
    if (err) {
      throw err;
    }
    console.log('success');
  });
});
