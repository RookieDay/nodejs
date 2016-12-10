'use strict';

const http = require('http');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const musicList = [{
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: ' 陈奕迅'
}, {
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: ' 陈奕迅'
}, {
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: ' 陈奕迅'
}, {
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: ' 陈奕迅'
}, {
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: ' 陈奕迅'
}];

const server = http.createServer();

server.on('request', (req, res) => {
  let url = req.url;

  if (url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(data);
    });
  } else if (url.startsWith('/node_modules/')) {
    let fullPath = path.join(__dirname, url);
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        return res.end(err.message);
      }
      res.end(data);
    });
  } else if (url === '/favicon.ico') {
    res.end();
  } else if (url === '/music') {

    // 我们可以通过 fs模块的 readdir 读取一个目录，可以获取该目录下所有的条目（文件名，子目录名）
    // readdir 默认只会获取一级目录下的所有的 文件名、目录名
    // 最后文件名和目录名会放到 第二个参数 回调函数中的 第二个参数中 （他就是一个数组）
    // 数组中存储的就是类似于：[ 'a.txt','b','a.js','index.html' ]
    
    res.writeHead(200,{
      'Content-Type': 'text/plain; charset=utf-8'
    });

    // 这样做的原因是：数组无法格式化
    res.end(JSON.stringify({
      musicList:musicList
    }));

  }
});

server.listen(config.port, config.host, () => {
  console.log(`server is listenning at port ${config.port}`);
});
