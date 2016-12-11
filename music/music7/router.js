'use strict';

const url = require('url');
const path = require('path');
const fs = require('fs');

// 服务器发送给客户端的数据，最好要告诉人家：我给你发送的数据是什么类型
// 客户端会按照这个 Content-Type  去解析 服务器发给自己的数据
const mime = require('./mime.json');

// node 原生提供的 querystring 模块中有一个方法叫做 parse 可以将查询字符串转换为 一个 方便我们操作的 json 对象
const querystring = require('querystring'); // 该模块内部提供了一些方法专门用于解析 查询字符串的

const handler = require('./handler');

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
        handler.renderIndex(req, res);
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
        handler.getMusicList(req, res);
    } else if (method === 'GET' && pathname.startsWith('/files/')) {
        handler.transferMusic(req, res);
    } else if (method === 'GET' && pathname === '/add') {
        handler.renderAdd(req, res);
    } else if (method === 'POST' && pathname === '/add') {
        handler.addMusic(req, res);

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
        musicList.splice(index, 1);

        res.json({
            code: '6000',
            msg: 'remove success'
        });
    } else if (pathname === '/login') {
        res.render('login', {
            title: '用户登陆'
        });
    }

};