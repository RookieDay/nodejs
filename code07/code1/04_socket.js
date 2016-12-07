'use strict';

const net = require('net');

const server = net.createServer();

let count = 0;

// 只要有客户端打电话进来了，就自动分配一个电话机教给回调函数中的第一个参数，然后调用
// 每一个 connection 事件回调函数中的 socket 对象都是不一样的
server.on('connection', (socket) => {

  console.log(`当前有${++count}个客户端连接上来了`);

  // 当前的socket 就是一个网络流  既可以读，又可以写  读写流
  socket.write('hello world');

  socket.on('data', (data) => {
    console.log(data);
  });
});

// 开启服务器监听，监听8124端口，监听成功之后，触发回调函数
server.listen(8124, () => {
  console.log('server is running at port 8124...');
});
