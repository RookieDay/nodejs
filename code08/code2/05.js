'use strict';
const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
    console.log(request, response);
    console.log('请求方法：' + request.method);
    console.log('请求路径：' + request.url);
    console.log('请求HTTP协议版本：' + request.httpVersion);
    response.end('an an');
})
server.listen(3000, () => {
    console.log('listening at port 3000....')
})