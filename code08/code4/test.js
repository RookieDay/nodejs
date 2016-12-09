'use strict';
require('http').createServer((req,res) => {
  res.end('<h1>hello world</h1>');
}).listen(3000,'192.168.12.77');
