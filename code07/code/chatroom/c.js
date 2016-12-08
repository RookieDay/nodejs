'use strict';
const net = require('net');
const client = net.connect({ port: 3000, host: '192.168.1.103' });

client.on('connect', () => {
    console.log('conn done');
    client.write('hello');
})
client.on('data', (data) => {
    console.log(data.toString());
})
client.on('end', () => {
    console.log('disconn')
})