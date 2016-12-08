'use strict';
const net = require('net');
const server = net.createServer();

server.on('connection', (socket) => {
    console.log('conn done');
    socket.on('error', (err) => {
        console.log('wrong');
    })
    socket.on('data', (data) => {
        data = data.toString();
        console.log(data);
        if (data === 'hello') {
            socket.write('world');
        }
    })
})

let port = 3000;
server.listen(port, '192.168.1.103', () => {
    console.log(`ser in port ${port}`)
})