'use strict';

const http = require('http');

// 1. 创建一个 http 服务器
const server = http.createServer();

// 2. 监听客户端的请求事件，设置请求事件处理函数
// 客户端的每一次请求都会触发 request 事件
// 然后将本次请求报文解析之后封装成一个 request 对象，放到 请求处理函数中的 第一个参数
// 当前的这个 request 对象就是一个 可读流
// 然后将 用户和本次请求通信的 Socket 对象封装到了 Response 对象中，把它放到了请求处理函数的第二个参数中
// 当前的 Response 对象就是 可写流
server.on('request', (request, response) => {

    // response.write('hello world');
    // response.end();

    response.end('hello world99');

});

// 3. 开启监听，设置监听成功之后的处理函数
server.listen(3000, () => {
    console.log('server is listennig at port 3000');
});