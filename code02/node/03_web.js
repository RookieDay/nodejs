var http = require('http');
var count = 0;
http.createServer(function(req, res) {
  count++;
  res.writeHead(200,{
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end('<h1>好高兴啊，今天我买了' + count + '部 iPhone 7S Plus</h1>');
}).listen(3000, '192.168.3.6');

// http://192.168.3.6:3000
