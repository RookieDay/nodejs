'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let url = req.url;
    console.log(`req path: ${url}`);
    switch (url) {
        case '/':
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            })
            break;
        case '/login':
            fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            })
            break;
        case '/register':
            res.end('register site');
            break;
        case '/about':
            res.end('index about');
            break;
        case '/favicon.ico':
            res.end();
            break;
        case '/main.css':
            fs.readFile(path.join(__dirname, 'main.css'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            })
            break;
        case '/main.js':
            fs.readFile(path.join(__dirname, 'main.js'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            })
            break;
        case '/01.jpg':
            fs.readFile(path.join(__dirname, '01.jpg'), (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            })

            break;
        default:
            res.end('404 not found');
            break;
    }
});
server.listen(3000, () => {
    console.log('server listen ....')
})