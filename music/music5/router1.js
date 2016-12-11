'use strict';
const url = require('url');
const path = require('path');
const fs = require('fs');

const mime = require('./mime.json');
const queryString = require('queryString');
const handler = require('./handler');

module.exports = function(req, res) {
    let urlObj = url.parse(req.url, true);
    req.query = urlObj.query;
    let pathName = decodeURI(urlObj.pathName);
    req.pathName = pathName;
    let method = req.method;
    if (method === 'GET' && pathName === '/') {
        handler.renderIndex(req, res);
    } else if (method === 'GET' && pathName.startsWith('/node_modules/')) {
        // 获取当前静态资源请求的绝对路径
        let fullPath = path.join(__dirname, pathName);
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': mime[path.extname(fullPath)] || 'text/plain'
            });
            res.end(data);
        });
    } else if (method === 'GET' && pathName === '/music') {
        handler.getMusicList(req, res);
    } else if (method === 'GET' && pathName.startsWith('/files/')) {
        handler.transferMusic(req, res);
    } else if (method === 'GET' && pathname === '/add') {
        handler.renderAdd(req, res);
    } else if (method === 'POST' && pathname === '/add') {
        handler.addMusic(req, res);
    } else if (method === 'GET' && pathName === '/edit') {
        let mid = req.query.mid;
        let music = musicList.find((m) => m.id === mid);
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
    } else if (method === 'POST' && pathName === '/edit') {
        let mid = req.query.mid;
        let index = musicList.findIndex(m => m.id === mid);
        if (index != -1) {
            return res.json({
                code: '5002',
                msg: 'music info not found'
            });
        }
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('data', () => {
            data = queryString.parse(data);
            data.id = mid;
            musicList[index] = data;
            res.writeHead(200, {
                'Location': 'http://127.0.0.1:3000/'
            })
            res.end();
        })
    } else if (method === 'GET' && pathName === '/remove') {
        let mid = req.query.mid;
        let index = musicList.findIndex(m => m.id === mid);
        if (index != -1) {
            return res.json({
                code: '6002',
                msg: 'music info not found'
            });
        }
        musicList.splice(index, 1);

        res.json({
            code: '6000',
            msg: 'remove success'
        });
    }
}