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

// pipe 就是那根管子，pipe 左边就是 油箱 右边就是 你的容器
// 通过调用可读流的 pipe 方法，传入一个可写流  就自动实现了 流，node内部做了防爆仓控制
// 流 不仅仅有文件流，还有 网络流  内存流
// 流：流就是一种处理数据的高效方式
rs.pipe(ws);
