'use strict';

const net = require('net');

// 1. 创建一个 Server 服务器,得到服务器实例
const server = net.createServer();

// 我们创建的服务器就是用来处理客户端的连接的
// 但是 客户端什么时候连接，你能预测吗？

// 所以，我们可以通过监听 服务器的 connection 连接事件，来处理客户端的连接请求
// 2. 监听服务器的连接事件,只要有客户端连接进来了,就会触发connection 事件
server.on('connection',(socket) => {
  console.log('有客户端进来了');
});

// 3. 开启服务器监听，其实就是让我们的服务器真正的运行起来，但是需要监听一个端口
server.listen(8124,() => {
  console.log('server is running');
});
