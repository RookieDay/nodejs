'use strict';

const artTemplate = require('art-template');
const templateFilePath = require('../config').templateFilePath;

artTemplate.config('openTag', '<<');
artTemplate.config('closeTag', '>>');
artTemplate.config('cache', false);

// 当调用了 render  方法之后，render 方法内部又返回了一个新的函数
// 一般对于这种方式：我们称之为 高阶函数
// 实际上就是 函数内部返回一个新的函数
function render(res) {
  return function(fileName, data) {
    // 对于有的页面不需要注入数据，所以我们写了一个短路的 data || {}
    // 目的是为了出现 undefined
    let htmlStr = artTemplate(`${templateFilePath}/${fileName}`, data || {});
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(htmlStr);
  };
}

module.exports = render;
