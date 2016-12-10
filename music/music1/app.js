'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const mime = require('./mime.json');

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
    singer: '卫兰'
}, {
    id: '3',
    title: '血染的风采',
    time: '03:35',
    singer: '黄耀明'
}, {
    id: '4',
    title: '相思',
    time: '03:02',
    singer: ' 毛阿敏'
}, {
    id: '5',
    title: '梦里水乡',
    time: '04:53',
    singer: ' 江珊'
}, {
    id: '6',
    title: '石头记',
    time: '04:38',
    singer: ' 达明一派'
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
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data);
        })
    } else if (url.startWith('/node_modules/')) {
        let fullPath = path.join(__dirname, url);
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': mime[path.extename(fullPath)] || 'text/plain'
            })
            res.end(data);
        })
    } else if (url === '/music') {
        let send = {
            musicList: musicList
        }
        let sendStr = JSON.stringify(send);
        let sendBuf = new Buffer(sendStr);
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.end(sendBuf);
    }
})

server.listen(config.port, config.host, () => {
    console.log(`server is listening at port ${config.port}`)
})