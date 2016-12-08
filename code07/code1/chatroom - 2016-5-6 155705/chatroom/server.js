'use strict';

const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('有客户端连接上来了');

    // 监听服务器上那个跟你通话的电话机,一旦对方的电话发生异常了,就会触发我自己的 error 事件
    socket.on('error', (err) => {
        console.log('有客户端异常退出了');
    });

    // 监听客户端发送过来的数据
    socket.on('data', (data) => {
        data = data.toString();
        console.log(data);
        let answer = '';
        switch (data) {
            case 'hello':
                answer = 'world';
                break;
            case 'haha':
                answer = 'hehe';
                break;
            case '你吃了吗':
                answer = '我吃的小豆包';
                break;
            default:
                answer = '嫩说啥';
                break;
        }
        socket.write(answer);
    });

});

let port = 3000;

server.listen(port, '192.168.1.103', () => {
    console.log(`server is listening ar port ${port}`);
});