'use strict';

const net = require('net');

// 通过一个 socket 去连接指定的 socket 服务器
const client = net.connect({ port: 3000, host: '192.168.1.103' });

// 当 客户端 socket 和服务器 socket 连接成功之后会触发回调函数
client.on('connect', () => {
    console.log('连接服务器成功了');

    // 只有当客户端 socket 和 服务器 socket 连接成功只有才能向服务器发送数据
    process.stdin.on('data', (data) => {
        data = data.toString().trim();
        client.write(data);
    });
});

client.on('data', (data) => {
    console.log(data.toString());
});

// 当 客户端 socket 关闭的时候，会触发 客户端 socket 的 end 事件
client.on('end', () => {
    console.log('disconnected from server');
});