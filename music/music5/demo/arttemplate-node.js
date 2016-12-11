'use strict';

const fs = require('fs');
const artTemplate = require('art-template');

fs.readFile('./a.html', (err, data) => {
  if (err) {
    throw err;
  }
  // 现在的 data  就是一个 buffer 对象（二进制数据）

  let dataObj = {
    foo: 'bar',
    list: [
      { name: 'jack' },
      { 'name': 'rose' }
    ]
  };


  // 1. 调用 compile ，传入模板字符换，得到一个 render 渲染函数
  let render = artTemplate.compile(data.toString());

  // 2. 调用 render 渲染函数，传入 模板字符串中需要是数据对象，返回解析和替换过后的 字符串
  let htmlStr = render(dataObj);

  console.log(htmlStr);




});
