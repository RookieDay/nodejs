'use strict';

const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('有客户端连接上来了');

  // 监听服务器上那个跟你通话的电话机,一旦对方的电话发生异常了,就会触发我自己的 error 事件
  socket.on('error',(err) => {
    console.log('有客户端异常退出了');
  });

  // 监听客户端发送过来的数据
  socket.on('data',(data) => {
    data = data.toString();
    console.log(data);
    if (data==='hello') {
      socket.write('world');
    }
  });

});

let port = 3000;

server.listen(port, '192.168.12.21', () => {
  console.log(`server is listening ar port ${port}`);
});
