'use strict';

const path = require('path');
const fs = require('fs');
const querystring = require('querystring');


const musicPath = require('../config').musicPath;

const musicList = require('../models/music');

const Music = musicList;

exports.renderIndex = (req, res) => {
  res.render('index');
};

exports.getMusicList = (req, res) => {

  Music.getAll((err, rows) => {
    if (err) {
      return res.end(err.message);
    }
    res.json({
      musicList: rows
    });
  });

  // // 先构造要响应给客户端的json对象
  // let send = {
  //   musicList: musicList
  // };

  // // 因为无法通过网络传递 json 对象， 所以我们把 json 对象转换为 json 格式字符串
  // let sendStr = JSON.stringify(send);

  // // 因为网络中传递的都是 二进制数据，所以我们需要把 字符串 转换为 二进制数据
  // let sendBuf = new Buffer(sendStr);

  // res.writeHead(200, {
  //   'Content-Type': 'text/plain; charset=utf-8'
  // });

  // // 将二进制数据 传递给我们的客户端
  // // 注意：end接收的参数，可以是一个字符串，也可以是一个buffer对象（二进制数据）
  // // 原因就在于：当你传入了字符串之后，end 内部会自动帮你再转换为 buffer 对象（二进制数据）发送给客户端
  // res.end(sendBuf);
};

exports.transferMusic = (req, res) => {
  let fullPath = path.join(musicPath, req.pathname);

  let readSteam = fs.createReadStream(fullPath);

  // 我们可以使用 node 原生为流提供的一种实现机制：pipe （管道）
  // 我们通过 调用 读取流的 pipe 方法，传入一个 写入流对象，就实现了流
  readSteam.pipe(res);
};

exports.renderAdd = (req, res) => {
  res.render('add');
};


exports.doAdd = (req, res) => {
  let data = '';

  // 接收 post 方式提交的数据
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    // let obj = querystring.parse(data);
    // // 判断该编号必须是唯一的
    // let mid = obj.id;

    // let music = musicList.find((m) => {
    //   return m.id === mid;
    // });

    // // 如果 music 已存在，告诉用户改歌曲已存在
    // if (music) {
    //   return res.json({
    //     code: '5001',
    //     msg: 'musicid already exists'
    //   });
    // }

    // // 代码执行到这里，意味着，可以添加歌曲了
    // musicList.push(obj);

    // res.writeHead(302, {
    //   'Location': 'http://127.0.0.1:3000/'
    // });

    // // 自己封装一个 redirect 函数，可以支持重定向
    // // res.redirect('http://127.0.0.1:3000/');

    // res.end();
    // // res.json({
    // //   code: '5000',
    // //   msg: 'success'
    // // });


    let obj = querystring.parse(data);

    let music = new Music(obj);

    music.save((err,rows) => {
      if (err) {
        return res.end(err.message);
      }

      // 保存成功之后，跳转到首页
      res.writeHead(302,{
        'Location': 'http://127.0.0.1:3000'
      });

      res.end();
    });

  });
};

exports.renderEdit = (req, res) => {
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
};

exports.doEdit = (req, res) => {
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
};

exports.doRemove = (req, res) => {
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
  musicList.splice(index, 1);

  res.json({
    code: '6000',
    msg: 'remove success'
  });
};
