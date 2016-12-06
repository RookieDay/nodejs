'use strict';

const fs = require('fs');
const path = require('path');

let sourcePath = 'D:/Softwares/OS/CentOS-7-x86_64-DVD-1511.iso';
let distPath = 'C:/Users/iroc/Desktop/CentOS-7-x86_64-DVD-1511.iso';

// 获取文件总字节大小
let totalSize = fs.statSync(sourcePath).size;

// 1. 创建一个读取流
let readStream = fs.createReadStream(sourcePath);

// 2. 创建一个写入流
let writeStream = fs.createWriteStream(distPath);

let curSize = 0;

// 读取流会源源不断的读取数据，只要读取到了数据就会触发读取流的 data 事件，
// 同时把数据传递给 data 事件的回调函数中的第一个参数
// chunk 标识 读取流使用一个 瓢 读取到的二进制数据（Buffer）
readStream.on('data',(chunk) => {
  // 要想实现进度条，就要获取当前最新已经读取的长度
  // 然后让 最新读取的字节大小 除以 总大小  再 * 100  得到 百分比
  curSize+=chunk.length;
  let percentage = curSize / totalSize * 100;
  console.log(`已复制：${percentage}%`);

  // 通过 写入流的 write 方法可以向这个流中写数据
  writeStream.write(chunk);
});

// 当文件被读取文件之后，就可以关闭了
readStream.on('end',() => {
  writeStream.close();
});
