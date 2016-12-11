'use strict';

const path = require('path');
const fs = require('fs');

const musicPath = require('./config').musicPath;

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


exports.renderIndex = (req, res) => {
    res.render('index');
};

exports.getMusicList = (req, res) => {
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
exports.addMusic = (req, res) => {
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

}