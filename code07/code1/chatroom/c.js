'use strict';
const net = require('net');
const client = net.connect({ port: 3000, host: '127.0.0.7' });
let nickName;
client.on('connect', () => {
    process.stdout.write('Pls input:');
    process.stdin.on('data', (data) => {
        data = data.toString.trim();
        if (!nickName) {
            let send = {
                protocol: 'signup',
                nickName: data
            }
            return client.write(JSON.stringify(send));
        }
        let send = {
            protocol: 'broadcast',
            from: nickName,
            message: data
        }
        client.write(JSON.stringify(send));
    })
})

client.on('data', (data) => {
    try {
        let signal = JSON.parse(data);
        let protocol = signal.protocol;
        if (protocol === 'signup') {
            switch (signal.code) {
                case '1000':
                    nickname = signal.nickname;
                    console.log('恭喜，注册成功了');
                    break;
                case '1001':
                    console.log('不好一次，用户名已存在');
                    break;
                case '1002':
                    console.log('用户名非法，请重新输入：');
                    break;
            }
        } else if (protocol === 'broadcast') {
            console.log(`${signal.nickname}说：${signal.message}`);

        }
    } catch (e) {
        console.log('服务器发送的数据格式有异常');

    }
})

client.on('end', () => {
    console.log('disconnected from server');

})