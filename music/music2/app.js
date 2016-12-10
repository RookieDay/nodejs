'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const mime = require('./mime.json');
const querystring = require('querystring'); // 该模块内部提供了一些方法专门用于解析 查询字符串的

const musicList = [{
  id: '1',
  title: '富士山下',
  time: '04:19',
  singer: '陈奕迅',
  src: '/files/陈奕迅 - 富士山下.mp3'
}, {
  id: '2',
  title: '大哥',
  time: '03:57',
  singer: '卫兰',
  src: '/files/卫兰 - 大哥.mp3'
}, {
  id: '3',
  title: '血染的风采',
  time: '03:35',
  singer: '黄耀明',
  src: '/files/陈奕迅 - 富士山下.mp3'
}, {
  id: '4',
  title: '相思',
  time: '03:02',
  singer: ' 毛阿敏',
  src: '/files/陈奕迅 - 富士山下.mp3'
}, {
  id: '5',
  title: '梦里水乡',
  time: '04:53',
  singer: ' 江珊',
  src: '/files/陈奕迅 - 富士山下.mp3'
}, {
  id: '6',
  title: '石头记',
  time: '04:38',
  singer: ' 达明一派',
  src: '/files/陈奕迅 - 富士山下.mp3'
}];

// 创建 http 服务器
const server = http.createServer();

// 监听 request 请求事件，设置事件处理函数
server.on('request', (req, res) => {

  res.render = render(res);
  res.json = responseJson(res);



  // 获取当前的请求路径
  let url = decodeURI(req.url);

  let method = req.method;

  console.log(url);

  // /node_modules/bootstrap/dist/css/bootstrap.css
  // /node_modules/jquery/dist/jquery.js
  // /node_modules/bootstrap/dist/js/bootstrap.js
  // /node_modules/art-template/dist/template.js

  if (method === 'GET' && url === '/') {
    res.render('index');
  } else if (method === 'GET' && url.startsWith('/node_modules/')) {

    // 获取当前静态资源请求的绝对路径
    let fullPath = path.join(__dirname, url);

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(fullPath)] || 'text/plain'
      });
      res.end(data);
    });

  } else if (method === 'GET' && url === '/music') {

    // 先构造要响应给客户端的json对象
    let send = {
      musicList: musicList
    };

    // 因为无法通过网络传递 json 对象， 所以我们把 json 对象转换为 json 格式字符串
    let sendStr = JSON.stringify(send);

    // 因为网络中传递的都是 二进制数据，所以我们需要把 字符串 转换为 二进制数据
    let sendBuf = new Buffer(sendStr);

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });

    // 将二进制数据 传递给我们的客户端
    // 注意：end接收的参数，可以是一个字符串，也可以是一个buffer对象（二进制数据）
    // 原因就在于：当你传入了字符串之后，end 内部会自动帮你再转换为 buffer 对象（二进制数据）发送给客户端
    res.end(sendBuf);
  } else if (method === 'GET' && url.startsWith('/files/')) {
    // 对面下面这种写法来说，mp3 文件很大，这种做法是一次性的将数据读取出来然后响应到了客户端
    // fs.readFile(path.join(__dirname,'files/卫兰 - 大哥.mp3'),(err,data) => {
    //   if (err) {
    //     return res.end(err.message);
    //   }
    //   res.end(data);
    // });

    // 对于这种大文件，我们推荐使用 流 的方式来解决提供性能，提高用户体验
    // 我们通过 手动的方式创建一个读取流
    let fullPath = path.join(__dirname, url);

    let readSteam = fs.createReadStream(fullPath);

    // 我们可以使用 node 原生为流提供的一种实现机制：pipe （管道）
    // 我们通过 调用 读取流的 pipe 方法，传入一个 写入流对象，就实现了流
    readSteam.pipe(res);
  } else if (method === 'GET' && url === '/add') {
    res.render('add');
  } else if (method === 'POST' && url === '/add') {

    let data = '';

    // 接收 post 方式提交的数据
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      let obj = querystring.parse(data);
      // 判断该编号必须是唯一的
      let mid = obj.id;

      let music = musicList.find((m) => {
        return m.id === mid;
      });

      // 如果 music 已存在，告诉用户改歌曲已存在
      if (music) {
        return res.json({
          code: '5001',
          msg: 'musicid already exists'
        });
      }

      // 代码执行到这里，意味着，可以添加歌曲了

      musicList.push(obj);

      res.json({
        code: '5000',
        msg: 'success'
      });
    });

  }
});

// 当调用了 render  方法之后，render 方法内部又返回了一个新的函数
// 一般对于这种方式：我们称之为 高阶函数
// 实际上就是 函数内部返回一个新的函数 
function render(res) {
  return function(fileName) {
    fs.readFile(`${path.join(__dirname, fileName)}.html`, (err, data) => {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(data);
    });
  };
}

function responseJson(res) {
  return function(jsonObj) {
    let jsonStr = JSON.stringify(jsonObj);
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end(jsonStr);
  }
}

// 开启监听，设置监听成功只有回调处理函数
server.listen(config.port, config.host, () => {
  console.log(`server is listening at port ${config.port}`);
});
