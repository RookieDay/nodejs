'use strict';

const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const moment = require('moment');
const bs = require('browser-sync').create();

bs.init({
  server: './'
});

let env = process.env['NODE_ENV'];

// 得到我们的模板字符串
const templateStr = fs.readFileSync(path.join(__dirname, 'template.less'), 'utf8');

// 得到我们要转换的 Markdown 文件路径
let filePath = path.join(__dirname, 'README.md');

// 当你要监视一个文件是否发生变化的时候，程序是不会退出的
// persistent 默认为 true，不要设置为false，否则不会持续监视
// interval 该参数值用来设置 监视文件的时间间隔，单位为 毫秒。，如何设置根据自己的需求
// 时间越短，越消耗性能
fs.watchFile(filePath, {
  persistent: true,
  interval: 500
}, (curr, prev) => {

  // 为了更加严谨，只要判断当前文件的状态和上一次文件的状态的修改时间就可以确认了
  if (curr.mtime !== prev.mtime) {

    // 当文件发生变化的时候，读取md格式源内容，解析成HTML，然后写入新的文件
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      // 通过调用 md 的 render 方法，可以将一个md格式的字符串转换为一个 HTML 格式字符串
      let htmlStr = md.render(data);

      // 处理路径
      let pathObj = path.parse(filePath);
      pathObj.base = `${pathObj.name}.html`;
      let htmlPath = path.format(pathObj);

      // 当你有问题的时候
      // - 先尝试阅读错误信息，先尝试自己去定位到错误的具体位置
      // 如果还无法解决，尝试把错误信息翻译或者放到搜索引擎上找帮助
      // 如果还不行，尝试问同桌或者朋友
      // 最后再问一些大牛
      // 写一个简单的文档：我在开发一个什么功能，源码如下：````,但是遇到了错误信息：```

      // 把时间和内容都替换一下，然后再写入到新的文件中
      htmlStr = templateStr.replace('^_time_^', moment().format('YYYY-MM-DD hh:mm:ss'))
        .replace('^_content_^', htmlStr);

      // 将 html 字符串写入一个新的文件中
      fs.writeFile(htmlPath, htmlStr, 'utf8', (err) => {
        if (err) {
          throw err;
        }
        // 当修改成功，并且重新生成的html文件也创建成功了，这个时候，刷新浏览器

        if (env === 'develop') {
          bs.reload('README.html');
        }
        console.log('success');
      });
    });
  }
});
