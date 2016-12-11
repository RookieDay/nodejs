'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const mime = require('./mime.json');
const queryString = require('queryString');

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

const server = http.createServer();
server.on('request', (req, res) => {
    res.render = render(res);
    res.json = responseJson(res);

    let url = decodeURI(req.url);
    let method = req.method;
    // console.log(url);
    if (method === 'GET' && url === '/') {
        res.render('index');
    } else if (method === 'GET' && url.startsWith('/node_modules/')) {
        let fullPath = path.join(__dirname, url)
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': mime[path.extename(fullPath)] || 'text/plain'
            })
            res.end(data);
        })
    } else if (method == 'GET' && url === '/music') {
        let send = {
            musicList: musicList
        }
        let sendStr = JSON.stringify(send);
        let sendBuf = new Buffer(sendStr);
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.end(sendBuf);
    } else if (method === 'GET' && url.startsWith('/files/')) {
        let fullPath = path.join(__dirname, url);
        let readStream = fs.createRedStream(fullPath);
        readStream.pipe(res);
    } else if (method === 'GET' && url === '/add') {
        res.render('add');
    } else if (method === 'post' && url === '/add') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            let obj = queryString.parse(data);
            console.log(obj);
            let mid = obj.id;
            let music = musicList.find((m) => {
                return m.id === mid;
            })
            console.log(mid);
            if (music) {
                return res.json({
                    code: '5001',
                    meg: 'exists'
                })
            }
            console.log(obj)
            musicList.push(obj);
            res.json({
                code: '5000',
                msg: 'success'
            })
        })
    }
})

function render(res) {
    return function(fileName) {
        fs.readFile(`${path.join(__dirname,fileName)}.html`, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.end(data);
        })
    }
}

function responseJson(res) {
    return function(jsonObj) {
        let jsonStr = JSON.stringify(jsonObj);
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.end(data);
    }
}

server.listen(config.port, config.host, () => {
    console.log('listening....')
})