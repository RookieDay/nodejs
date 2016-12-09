'use strict';
const net = require('net');
const server = net.createServer();
const users = {};

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        data = data.toString().trim();
        try {
            let singal = JSON.parse(data);
            let protocol = signal.protocol;
            switch (protocol) {
                case 'signup':
                    signup(signal);
                    break;
                case 'broadcast':
                    broadcast(singal);
                    break;
                case 'p2p':
                    p2p(signal);
                    break;
            }
        } catch (e) {
            socket.write('sorry wrong');
        }
    }).on('error', (err) => {

    })
})

function p2p(signal) {
    let someBody = singal.to;
    let user = users[someBody];
    if (!user) {
        let send = {
            protocol: 'p2p',
            code: 2002,
            message: 'not exists'
        }
        return socket.write(JSON.stringfy(send));
    }
    let send = {
        protocol: 'p2p',
        from: singal.from,
        messaeg: singal.message
    };
    user.write(JSON.stringfy(send));
}

function broadcast(singal) {
    let send = {
        protocol: 'broadcast',
        nickName: signal.from,
        message: sinal.message
    }
    let sendStr = JSON.stringfy(send);
    for (let nickName in users) {
        users[nickName].write(sendStr);
    }
}

function signup(signal) {
    if (users[signal.nickName]) {
        let send = {
            protocol: 'signup',
            code: '1001',
            message: 'exists'
        }
        return socket.write(JSON.stringfy(send));
    }
    user[singal.nickName] = socket;
    let send = {
        protocol: 'signup',
        code: '1000',
        nickName: singal.nickName,
        message: 'ok'
    }
    return socket.write(JSON.stringfy(send));
}

let port = 3000;
server.listen(port, '127.0.0.1', () => {
    console.log('listening....')
})