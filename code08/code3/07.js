'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const minObj = require('./mime.json');
const server = http.createServer((req, res) => {
    let url = decodeURI(req.url);
    let filePath = path.join(__dirname, url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.end(err.message);
            return;
        }
        let mime = mimeObj[path.extname(filePath)] || 'text/plain;charset=utf-8'
        mime.startsWith('text/') ? mime += ';charset=utf-8' : mime;
        res.writeHead(200, {
            'Content-Type': mime
        })
        res.end(data);
    })
})
server.listen(3000, () => {
    console.log('listening....')
})