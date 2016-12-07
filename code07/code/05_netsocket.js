'use strict';

const net = require('net');

const server = net.createServer();

let count = 0;

// 每一个客户端只要连接到我的服务器，服务器都都会分配一个电话机用来与该客户端进行通信
server.on('connection', (socket) => {
  count++;
  console.log(`welcome ${socket.localAddress}  ${socket.remotePort} join our chat room`);
  console.log(`当前有${count}个客户端连接上来了`);
  socket.write(`当前有${count}个客户端连接上来了`);
});

let port = 3000;

server.listen(port,() => {
  console.log(`server is listening at port ${port}`);
});
