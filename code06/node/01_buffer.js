'use strict';

var buf = new Buffer(10);

// write 方法在写入数据的时候，默认编码为 utf8
buf.write('hello'); // => <Buffer 68 65 6c 6c 6f 00 00 00 00 00>

// 如果多次调用了 write 方法，会把之前的覆盖掉
// buf.write('world');

buf.write('world',5); // => <Buffer 68 65 6c 6c 6f 77 6f 72 6c 64>

// 通过调用 buf 对象的 toString 方法就可以转换为可以识别的字符，默认编码就是 utf8
console.log(buf.toString());

// 通过 Buffer 的构造函数，可以将一个字符串转换为一个Buffer对象
var buf2 = new Buffer('hello world');
// var buf2 = Buffer.from('hello world'); // 在 node 6.0.0 中建议这样使用

console.log(buf2.toString());

// Buffer.isEncoding 可以检查node是否支持某种编码类型
console.log(Buffer.isEncoding('gbk'));
