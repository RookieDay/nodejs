'use strict';

const http = require('http'); // 该模块用来创建一个 http 服务器的
const fs = require('fs'); // 用来操作文件
const path = require('path'); // 用来操作路径的

// 我们的应用因为有一些经常变动的东西，一种方式是直接在代码中写死，后期去改的时候找到源代码去修改
// 因为修改源代码风险很大，所以我们把一些变化的项放到配置文件中，
// 那么我们在后期进行修改的时候，就方便很多了
const config = require('./config.js');

// 服务器发送给客户端的数据，最好要告诉人家：我给你发送的数据是什么类型
// 客户端会按照这个 Content-Type  去解析 服务器发给自己的数据
const mime = require('./mime.json');

// node 原生提供的 querystring 模块中有一个方法叫做 parse 可以将查询字符串转换为 一个 方便我们操作的 json 对象
const querystring = require('querystring'); // 该模块内部提供了一些方法专门用于解析 查询字符串的

// node  原生提供了一个 url 模块，就是专门用来处理 url 路径的
// url 模块中有一个 parse 方法，可以将一个 标准的 url 路径解析为一个 json 对象，方便我们操作
const url = require('url');

// 模板引擎
const artTemplate = require('art-template');

// 配置后台模板语法解析的开始标记和结束标记
// 目的是：为了防止前后台模板标记的冲突
// 在配置的时候，前后不要一致，否则不会解析
artTemplate.config('openTag', '<<');
artTemplate.config('closeTag', '>>');

// artTemplate 默认会缓存读取到的模板字符换
// 但是我们在开发过程中，不需要缓存这一项，所以配置下面的 cache 为 false 即可
artTemplate.config('cache', false);

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

// 在 http 通信模型中，始终是以 一问一答 的形式进行通信数据交互的
// 没有 请求 就 没有 响应
// http 后台服务器是无法主动给客户端发送响应数据的

// 监听 request 请求事件，设置事件处理函数
server.on('request', (req, res) => {

  // 动态的 给 Response 对象挂载了一个 render 渲染函数
  res.render = render(res);
  res.json = responseJson(res);

  // 我们可以使用 url 模块提供的 parse 方法，将一个 url 路径地址 转换为一个方便我们操作的对象
  // 请求路径部分         pathname
  // 请求查询字符串部分   query  不指定第二个参数的情况下，默认query就是原来的普通字符串，如果指定了第二个参数为 true，那么query会被自动转换为一个 json 对象
  // 请求的协议
  // 请求的端口
  let urlObj = url.parse(req.url, true);

  // 为了后面的代码方便操作，我们约定好，把所有的查询字符串转换为 对象之间挂载到 request 对象上的 query属性
  req.query = urlObj.query;

  // 获取当前的请求路径，不包含查询字符串部分
  let pathname = urlObj.pathname;

  // 获取客户端请求方法
  let method = req.method;

  // /node_modules/bootstrap/dist/css/bootstrap.css
  // /node_modules/jquery/dist/jquery.js
  // /node_modules/bootstrap/dist/js/bootstrap.js
  // /node_modules/art-template/dist/template.js

  // 根据不同的请求 url 路径，做出不同的响应处理
  if (method === 'GET' && pathname === '/') {
    res.render('index');
  } else if (method === 'GET' && pathname.startsWith('/node_modules/')) {

    // 获取当前静态资源请求的绝对路径
    let fullPath = path.join(__dirname, pathname);

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        return res.end(err.message);
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(fullPath)] || 'text/plain'
      });
      res.end(data);
    });

  } else if (method === 'GET' && pathname === '/music') {

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
  } else if (method === 'GET' && pathname.startsWith('/files/')) {
    // 对面下面这种写法来说，mp3 文件很大，这种做法是一次性的将数据读取出来然后响应到了客户端
    // fs.readFile(path.join(__dirname,'files/卫兰 - 大哥.mp3'),(err,data) => {
    //   if (err) {
    //     return res.end(err.message);
    //   }
    //   res.end(data);
    // });

    // 对于这种大文件，我们推荐使用 流 的方式来解决提供性能，提高用户体验
    // 我们通过 手动的方式创建一个读取流
    let fullPath = path.join(__dirname, pathname);

    let readSteam = fs.createReadStream(fullPath);

    // 我们可以使用 node 原生为流提供的一种实现机制：pipe （管道）
    // 我们通过 调用 读取流的 pipe 方法，传入一个 写入流对象，就实现了流
    readSteam.pipe(res);
  } else if (method === 'GET' && pathname === '/add') {
    res.render('add');
  } else if (method === 'POST' && pathname === '/add') {

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

      res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
      });

      // 自己封装一个 redirect 函数，可以支持重定向
      // res.redirect('http://127.0.0.1:3000/');

      res.end();
      // res.json({
      //   code: '5000',
      //   msg: 'success'
      // });
    });

  } else if (method === 'GET' && pathname === '/edit') {

    // 从查询字符串中获取用户要编辑的歌曲信息 id
    let mid = req.query.mid;

    // 根据歌曲id，找到数据中的该项
    // find 函数需要接收一个 函数作为参数
    // find 会自动循环遍历当前调用自己的数组，然后对数组的每一项传入回到函数中，然后执行里面的代码
    // 如果 在某一个回调函数的执行过程中 符合了 函数返回值的 布尔 条件
    // 那么 find  函数就把满足当前条件的该项直接返回
    let music = musicList.find(m => m.id === mid);

    if (!music) {
      return res.json({
        code: '5003',
        msg: 'music not found'
      });
    }

    // 在 es6 中，可以
    res.render('edit', {
      music: music
    });

  } else if (method === 'POST' && pathname === '/edit') {
    let mid = req.query.mid;
    // 接收post请求提交的数据

    // 根据音乐信息 id，查询该音乐信息在数组中的索引下标，如果找不到，那么返回 -1
    // 我们要修改的时候，必须通过数组的索引下标来修改一个元素数据
    let index = musicList.findIndex(m => m.id === mid);

    if (index === -1) {
      return res.json({
        code: '5002',
        msg: 'music info not found'
      });
    }

    // 接收 post 请求提交的数据
    // 1. 在外部定义个变量，用来存储接收到的数据
    let data = '';
    // 2. 监听 request 对象的 data 事件，如果数据量很大的话，该事件就会被触发多次
    // 当每次接收客户端提交过来的数据的时候，我们就把这个数据拼接到 一个 变量中
    req.on('data', (chunk) => {
      // buffer 对象在和字符串拼接的时候，会自动的调用 toString() 函数
      data += chunk;
    });

    // 3. 只有完全接收完了客户端提交过来的数据的时候，我们才能去解析该数据进行自己的业务逻辑处理
    // 什么时候执行完，我们可以通过 监听 request 对象的 end 事件，来确定接收完毕
    req.on('end', () => {
      // 将 post 接收到的数据，解析成一个方便我们操作的对象
      data = querystring.parse(data);

      // 因为在前台已经禁用了 id 元素，所以我们在后台接收到的数据中没有id这一项
      // 所以我们把 查询字符串中 id 动态的挂载给了 data （data就是要修改的那个数据）
      data.id = mid;

      musicList[index] = data;

      res.writeHead(302, {
        'Location': 'http://127.0.0.1:3000/'
      });
      // 写完响应头之后，一定要 end ，否则 响应头不会发送过去
      res.end();
    });
  } else if (method === 'GET' && pathname === '/remove') {
    let mid = req.query.mid;
    // 根据音乐id，找到该音乐信息在数组中的下标
    let index = musicList.findIndex(m => m.id === mid);

    if (index === -1) {
      return res.json({
        code: '6002',
        msg: 'music info not found'
      });
    }

    // 可以做删除这个操作了
    musicList.splice(index,1);

    res.json({
      code:'6000',
      msg:'remove success'
    });
  }
});

// 当调用了 render  方法之后，render 方法内部又返回了一个新的函数
// 一般对于这种方式：我们称之为 高阶函数
// 实际上就是 函数内部返回一个新的函数 
function render(res) {
  return function(fileName, data) {
    // 对于有的页面不需要注入数据，所以我们写了一个短路的 data || {}
    // 目的是为了出现 undefined
    let htmlStr = artTemplate(`${__dirname}/${fileName}`, data || {});
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(htmlStr);
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
