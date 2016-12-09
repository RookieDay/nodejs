// 运行nodemon server.js
// 运行nodemon client.js

'use strict';

const net = require('net');

// 创建一个网络服务器
const server = net.createServer();

// 用户集合对象，用来存储每个连接上来的用户昵称和用户对象
const users = {};

// 监听用户的 connection 事件，只要用户连接上来就会触发该回调处理函数，同时服务器会生成一个 socket 用来与客户端进行通信
server.on('connection', (socket) => {

    // 服务器监听到客户端 socket 发送过来的数据之后，不知道 客户端到底发送的是什么
    // 所以我们已经按照自己约定好的 协议数据格式来解析 客户端发送给我的数据
    socket.on('data', (data) => {
        data = data.toString().trim();

        try {
            // 将 json 格式字符串转换为 json 对象，方便我们操作
            let signal = JSON.parse(data);
            let protocol = signal.protocol;

            // 根据客户端发送的不同数据协议，做不同的处理
            switch (protocol) {
                case 'signup':
                    signup(signal); // 用户注册
                    break;
                case 'broadcast':
                    broadcast(signal); // 用户要发送广播数据
                    break;
                case 'p2p':
                    p2p(signal); // 用户要发送 点对点 的数据
                    break;
            }
        } catch (e) {
            socket.write('小样儿，别来了');
        }

    }).on('error', (err) => {

    });

    function p2p(signal) {
        let someBody = signal.to;
        let user = users[someBody];

        // 用户私聊的时候，要查看一下有没有该用户，如果没有该用户要告诉用户
        if (!user) {
            let send = {
                protocol: 'p2p',
                code: 2002,
                message: 'nickname not exists'
            };
            return socket.write(JSON.stringify(send));
        }

        // 当用户信息存在的情况下，将数据发送给要发送的用户
        let send = {
            protocol: 'p2p',
            from: signal.from,
            message: signal.message
        };
        user.write(JSON.stringify(send));
    }

    function broadcast(signal) {
        let send = {
            protocol: 'broadcast',
            nickname: signal.from,
            message: signal.message
        };
        let sendStr = JSON.stringify(send);

        // 循环遍历 users ，对其中的每一个 socket 对象 调用 write 方法 ，将数据发送给具体的某个用户
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