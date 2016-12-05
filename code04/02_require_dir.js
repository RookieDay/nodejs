// 如果main属性指定错误或者没有main属性或者没有package.json 文件
// Node.js 默认找 index.js index.node index.json
var cal = require('./cal');

var jquery = require('./jquery');

console.log(cal.add(1,2));
