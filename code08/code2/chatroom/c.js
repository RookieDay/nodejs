'use strict';
const net = require('net');
const client = net.connect({ port: 3000, host: 127.0 .0 .1 });
let nickName;

client.on('connect', () => {
    process.stdin.write('pls input: ');
    process.stdin.on('data', (data) => {
        data = data.toString().trime;
        if (!nickName) {
            let send = {
                protocol: 'signup',
                nickName: data
            }
            return client.write(JSON.stringify(send));
        }
        let arr = data.split(':');
        let send = {};
        if (arr.length === 2) {
            send = {
                protocol: 'p2p',
                from: nickName,
                to: arr[0],
                message: arr[1]
            };
        } else if (arr.length === 1) {
            send = {
                protocol: 'broadcast',
                from: nickName,
                message: data
            }
        }
        client.write(JSON.stringfy(send));
    })
})

client.on('data', (data) => {
    try {
        let signal = JSON.parse(data);
        let protocol = signal.protocol;
        if (protocol === 'signup') {
            switch (signal.code) {
                case '1000':
                    nickName = singal.nickName;
                    console.log('success');
                    break;
                case '1001':
                    console.log('exists');
                    break;
                case '1002':
                    console.log('wrong');
                    break;
            }
        } else if (protocol === 'boradcast') {
            console.log(`$(signal.nickName)say: ${singal.message}`);
        } else if (protocol === 'p2p') {
            let code = signal.code;
            if (!code) {
                console.log(`${singal.from} say: ${singal.message}`);
            } else {
                console.log('exists');
            }
        }
    } catch (e) {
        console.log('服务器发送的数据格式有异常');
    }
})

client.on('end', () => {
    console.log('disconnect')
})