'use strict';

const fs = require('fs');
const path = require('path');

let sourcePath = 'D:/Softwares/OS/ubuntu-15.04-desktop-amd64.iso';
let distPath = 'C:/Users/iroc/Desktop/ubuntu-15.04-desktop-amd64.iso';

// 获取文件的字节大小
let totalSize = fs.statSync(sourcePath).size;

// 1. 创建一个可读流
let rs = fs.createReadStream(sourcePath);

// 2. 创建一个可写流
let ws = fs.createWriteStream(distPath);

var curSize = 0;

// 3. 监听可读流的data事件，只要该事件被触发，那么我们就把该事件回调函数中的第一个参数chunk
// chunk 英文含义就是 数据块 的意思，所以说 chunk 本身就是二进制数据（Buffer）
// 然后将 chunk 中的二进制数据 写入到 可写流中
rs.on('data',(chunk) => {
  // 把每一次读取的buffer的字节大小累加起来获取最新的读取进度
  curSize += chunk.length;
  
  let percentage = (curSize / totalSize * 100).toFixed(2);

  console.log(percentage);

  ws.write(chunk);
});


// 4. 可读流什么时候读取结束，我们不知道，但是可以通过监听 可读流的 end  事件来处理读取结束只要要做的事情
rs.on('end',() => {
  // 读取结束的时候，把写入流关闭
  ws.close();
});
