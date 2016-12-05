/**
 * 加载目录的规则
 */

// 如果写全了文件路径+扩展名 Node.js 会直接把该路径解析为一个绝对路径直接加载，如果没有，直接报错
// 
// 如果省略了扩展名，Node.js 优先尝试找有没有一个叫做 cal 目录
// 如果有 cal 目录，在该目录下，找有没有一个叫做 package.json 的文件
// 找到 package.json 文件之后 找文件下有没有一个 main 属性
// 如果得到 main 属性的值，直接根据该值去加载文件模块
// 如果没有package.json 文件 或者 文件中没有 main属性或者 main 属性中的文件路径值不存在
// 这个时候，Noide.js 会直接找该目录下 index.js  index.node index.json
// 以后自己在写js代码的时候，文件最好不要与目录同名
var cal = require('./cal'); // ./cal.js ./cal.node ./cal.json  最后得到了一个目录 ./cal 目录

console.log(cal);
