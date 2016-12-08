'use strict';
const net = require('net');
const server = net.createServer();
const users = {};

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        data = data.toString.trim();
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
    })
})

function broadcast(signal) {
    let send = {
        protocol: 'broadcast',
        nickName: signal.from.broadcast,
        message: signal.message
    };
    let sendStr = JSON.stringify(send);
    for (let nickName in users) {
        users[nickName].write(sendStr);
    }
}

function signup(signal) {
    if (users[signal.nickName]) {
        let send = {
            protocol: 'signup',
            code: '1001',
            message: 'nickname already exists'
        };
        return socket.write(JSON.stringify(send));
    }
    users[signal.nickName] = socket;
    let send = {
        protocol: 'signup',
        code: '1000',
        nickname: signal.nickname,
        message: 'ok'
    };
    return socket.write(JSON.stringify(send))
}
let port = 3000;
server.listen(port, '127.0.0.1', () => {
    console.log(`server is listening ar port ${port}`);

})