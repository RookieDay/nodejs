'use strict';
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
const moment = require('moment');
const bs = require('browser-sync').create();

bs.init({
    server: './'
});

let env = proess.env['NODE_ENV'];
const templateStr = fs.readFileSync(path.join(__dirname, 'template.less'), 'utf8');

let filePath = path.join(__dirname, 'README.md');

fs.watchFile(filePath, {
    persistent: true,
    interval: 500
}, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let htmlStr = md.render(data);
            let pathObj = path.parse(filePath);
            // { root: 'c:/',
            //   dir: 'c:/foo/bar/baz/asdf',
            //   base: 'quux.html',
            //   ext: '.html',
            //   name: 'quux' }
            pathObj.base = `${pathObj.name}.html`;
            let htmlPath = path.format(pathObj);
            htmlStr = templateStr.replace('^_time_^', moment().format('YYYY-MM-DD hh:mm:ss'))
                .replace('^_content_^', htmlStr);
            fs.writeFile(htmlPath, htmlStr, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                if (env === 'develop') {
                    bs.reload('README.HTML');
                }
                console.log('done');
            })
        })
    }
})