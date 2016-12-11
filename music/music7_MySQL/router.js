'use strict';

const url = require('url');
const path = require('path');
const fs = require('fs');

// 服务器发送给客户端的数据，最好要告诉人家：我给你发送的数据是什么类型
// 客户端会按照这个 Content-Type  去解析 服务器发给自己的数据
const mime = require('./mime.json');

// node 原生提供的 querystring 模块中有一个方法叫做 parse 可以将查询字符串转换为 一个 方便我们操作的 json 对象
const querystring = require('querystring'); // 该模块内部提供了一些方法专门用于解析 查询字符串的

const music = require('./controllers/music');
const user = require('./controllers/user')
module.exports = function(req, res) {
    //设置 true 自动转化成了json对象 
    let urlObj = url.parse(req.url, true);

    // 把url中的查询字符串对象挂载到 request 对象上
    // 以后在获取 通过 get 请求提交的 查询字符串参数的时候，直接通过 req.query.键名 来获取
    req.query = urlObj.query;
    let pathname = decodeURI(urlObj.pathname);
    req.pathname = pathname;
    let method = req.method;

    // 根据不同的请求 url 路径，做出不同的响应处理
    if (method === 'GET' && pathname === '/') {
        music.renderIndex(req, res);
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

    } else if (method === 'GET' && pathname === '/index.html') {
        music.renderIndex(req, res);
    } else if (method === 'GET' && pathname === '/music') {
        music.getMusicList(req, res);
    } else if (method === 'GET' && pathname.startsWith('/files/')) {
        music.transferMusic(req, res);
    } else if (method === 'GET' && pathname === '/add') {
        music.renderAdd(req, res);
    } else if (method === 'POST' && pathname === '/add') {
        music.doAdd(req, res);
    } else if (method === 'GET' && pathname === '/edit') {
        music.renderEdit(req, res);
    } else if (method === 'POST' && pathname === '/edit') {
        music.doEdit(req, res);
    } else if (method === 'GET' && pathname === '/remove') {
        music.doRemove(req, res);
    } else if (method === 'GET' && pathname === '/login') {
        user.showLogin(req, res);
    } else if (method === 'POST' && pathname === '/login') {
        user.doLogin(req, res);
    }
};