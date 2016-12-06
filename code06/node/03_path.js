'use strict';

const path = require('path');

// basename 一个参数表示获取文件名+文件后缀名
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));
// returns 'quux.html'

// basename  两个参数，如果第二个参数指定了后缀名，会省略后缀名部分
console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
// returns 'quux'

console.log(path.dirname('C:/Users/iroc/.cnpmrc'));
// returns '/foo/bar/baz/asdf'

console.log(path.extname('/foo/bar/baz/asdf/quux.html'));



// 以后在进行文件操作的时候，都使用绝对路径
console.log(path.join(__dirname, 'README.md'));

console.log(path.parse('c:/foo/bar/baz/asdf/quux.html'));
// { root: 'c:/',
//   dir: 'c:/foo/bar/baz/asdf',
//   base: 'quux.html',
//   ext: '.html',
//   name: 'quux' }
console.log(path.format({
    root: 'c:\\',
    dir: 'c:\\a\\b',
    name: 'hello',
    ext: '.html'
}));
// c:\a\b\hello.html


// 以后再做路径拼接的时候，都使用 path.join 方法，可以避免出错
console.log(path.join('/foo/bar/baz', 'asdf', '../quux.html'));
//  \foo\bar\baz\quux.html
console.log(path.sep);