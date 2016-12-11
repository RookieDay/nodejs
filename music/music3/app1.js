'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const mime = require('./mime.json');
const queryString = require('queryString');
const url = require('url');
const artTeamplate = require('art-template');
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

    let urlObj = url.parse(req.url, true);
    req.query = urlObj.query;
    let pathName = urlObj.pathName;
    let method = req.method;
    if (method === 'GET' && pathName === '/') {
        res.render('index');
    } else if (method === 'GET' && pathname.startsWith('/node_modules/')) {
        let fullPath = path.join(__dirname, pathName);
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': mime[path.extename(fullPath)] || 'text/plain'
            })
            res.end(data);
        })
    } else if (method === 'GET' && pathName === '/music') {
        let send = {
            musicList: musicList
        }
        let sendStr = JSON.stringify(send);
        let sendBuf = new Buffer(sendStr);
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.send(sendBuf);
    } else if (method === 'GET' && pathName.startsWith('/files/')) {
        let fullPath = path.join(__dirname, pathName);
        let readStream = fs.createReadStream(fullPath);
        readStream.pipe(res);
    } else if (method === 'GET' && pathName === '/add') {
        res.render('add');
    } else if (method === 'post' && pathName === '/add') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            let obj = queryString.parse(data);
            let mid = obj.id;
            let music = musicList.find((m) => {
                return m.id === mid;
            })
        })
        if (music) {
            return res.json({
                code: '5001',
                msg: 'musicid already exists'
            })
        }
        musicList.push(obj);
        res.writeHead(302, {
            'Location': 'http://127.0.0.1:3000/'
        });
        res.end();
    } else if (method === 'GET' && pathname === '/edit') {
        let mid = req.query.mid;
        let music = musicList.find((m) => m.id === mid);
        if (!music) {
            return res.json({
                code: '5003',
                msg: 'music not found'
            });
        }
        res.render('edit', {
            music: music
        })
    }
})


function render(res) {
    return function(fileName, data) {
        let htmlStr = artTemplate(`${__dirname}/${fileName}`, data || {});
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(htmlStr);
    }
}

function responseJson(res) {
    return function(jsonObj) {
        let jsonStr = JSON.stringify(jsonObj);
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.end(jsonStr);
    }
}

server.listen(config.port, config.host, () => {
    console.log(`server is listeing at port ${config.port}`)
})