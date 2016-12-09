'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeObj = require('./mime.json');

const server = http.createServer((req, res) => {

  // res.statusCode = 200;
  // res.statusMessage = 'success';
  // res.setHeader('Content-Type','text/plain; charset=utf-8');

  // 你要发送给客户端的数据，最好告诉人家你发送的数据是什么类型
  // 一般来说，都是根据不同的文件后缀名：来区分 Content-Type 的
  // res.writeHead(200,{
  //   'Content-Type': 'text/plain; charset=utf-8'
  // });

  // res.end(`当前客户端请求路径是：${req.url}`);

  // 浏览器中的中文路径在传递给后台的时候会编码之后再传递
  // 所以，为了解决中文路径的问题，我们需要通过 decodeURI 该方法把编码的url解码
  let url = decodeURI(req.url);

  // 当用户访问 /index.html 的时候，我们读取 path.join(__dirname,url)
  // 当用户访问 /css/main.css 的时候，我们读取 path.join(__dirname,url)

  let filePath = path.join(__dirname, url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 当发生错误的时候，我们可以直接把错误信息传递到客户端
      // 在开发过程中，可以这么玩儿
      // 目的是有错误的时候可以快速在浏览器中看到错误信息而不用打开cmd查看错误消息了
      // 即便有错误，服务器也不会挂掉
      // 当发生错误之后，就不要让代码继续往后执行了
      res.end(err.message);
      return;
    }

    // 根据文件后缀名，获取对应的 Content-Type 类型
    let mime = mimeObj[path.extname(filePath)] || 'text/plain; charset=utf-8';

    // 处理文件文本，最好设置一下 utf-8 编码
    mime.startsWith('text/') ?
      mime += '; charset=utf-8' : mime;

    // 在发送数据之前，就要把响应头写好
    res.writeHead(200, {
      'Content-Type':mime
    });

    // 当代码执行到这里的时候，就表示读取文件成功，没有问题了，可以继续操作了
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('server is runnig at port 3000');
});
