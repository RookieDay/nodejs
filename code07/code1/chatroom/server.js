'use strict';

const net = require('net');

const server = net.createServer();

const users = {};

server.on('connection', (socket) => {

    // 服务器监听到客户端 socket 发送过来的数据之后，不知道 客户端到底发送的是什么
    // 所以我们已经按照自己约定好的 协议数据格式来解析 客户端发送给我的数据
    socket.on('data', (data) => {
        data = data.toString().trim();

        // 将 json 格式字符串转换为 json 对象，方便我们操作
        let signal = JSON.parse(data);
        let protocol = signal.protocol;

        switch (protocol) {
            case 'signup':
                signup(signal);
                break;
            case 'broadcast':
                broadcast(signal);
                break;
        }

    });

    function broadcast(signal) {
        let send = {
            protocol: 'broadcast',
            nickname: signal.from,
            message: signal.message
        };
        let sendStr = JSON.stringify(send);
        for (let nickname in users) {
            users[nickname].write(sendStr);
        }
    }

    function signup(signal) {
        // 如果用户名已存在，提示用户
        if (users[signal.nickname]) {
            // { protocol:'signup',code:'1001',message:'nickname already exists' }
            // { protocol:'signup',code:'1002',message:'nickname  valid' }
            // { protocol:'signup',code:'1000',message:'ok' }
            let send = {
                protocol: 'signup',
                code: '1001',
                message: 'nickname already exists'
            };

            // 执行了 return 之后，后续代码就不会继续执行了，少了一个 else 嵌套
            return socket.write(JSON.stringify(send));
        }

        // 代码执行到这里，表示用户可以注册，我们把用户名和该用户对应的 socket 对象都放到一个对象中
        users[signal.nickname] = socket;

        // 构建用户注册成功的消息
        let send = {
            protocol: 'signup',
            code: '1000',
            nickname: signal.nickname,
            message: 'ok'
        };
        return socket.write(JSON.stringify(send));
    }

});

let port = 3000;

server.listen(port, '127.0.0.1', () => {
    console.log(`server is listening ar port ${port}`);
});