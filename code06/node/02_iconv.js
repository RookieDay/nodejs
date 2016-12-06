'use strict';

const iconv = require('iconv-lite');

let buf = new Buffer('hello world');

let str = iconv.decode(buf, 'utf8');

// console.log(str);

let gbk_buf = iconv.encode('今天天气不错','gbk');

let buf2 = new Buffer(gbk_buf);

console.log(iconv.decode(buf2,'gbk'));


