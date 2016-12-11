'use strict';
const artTemplate = require('art-template');
const templateFilePath = require('../config').templateFilePath;
artTemplate.config('openTag', '<<');
artTemplate.config('closeTag', '>>');
artTemplate.config('cache', false);

function render(res) {
    return function(fileName, data) {
        let htmlStr = artTemplate(`${templateFilePath}/${fileName}`, data || {});
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        })
        res.end(htmlStr);
    }
}