'use strict';

const net = require('net');

const server = net.createServer();

const clients = [];

server.on('connection', (socket) => {
    console.log('有客户端连接上来了');

    // 监听服务器上那个跟你通话的电话机,一旦对方的电话发生异常了,就会触发我自己的 error 事件
    socket.on('error', (err) => {
        console.log('有客户端异常退出了');
    });

    clients.push(socket);

    socket.on('data', (data) => {
        data = data.toString().trim();
        clients.forEach((client) => {
            client.write(`${socket.remoteAddress}说：${data}`);
        });
    });

});

let port = 3000;

server.listen(port, '192.168.1.103', () => {
    console.log(`server is listening ar port ${port}`);
});