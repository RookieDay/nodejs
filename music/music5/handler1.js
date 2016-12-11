'use strict';
const fs = require('fs');
const path = require('path');
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
}
exports.getMuslicList = (req, res) => {
    let send = {
        musicList: musicList
    }
    let sendStr = JSON.stringify(send);
    let sendBuf = new Buffer(sendStr);
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8'
    })
    res.end(sendBuf);
}
exports.transferMusic = (req, res) => {
    let fullPath = path.join(musicPath, req.pathName);
    let readStream = fs.createReadStream(fullPath);
    readStream.pipe(res);
}
exports.renderAdd = (req, res) => {
    res.render('add');
}