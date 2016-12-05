/**
 * 需求：动态的将一个 md 文件转换为 HTML 文件
 */

var fs = require('fs');

// nodejs 还有一种特殊的模块加载规则，叫做：包的加载
// 当模块标识 既不是文件模块，也不是核心模块的时候，
// Node.js按照一定的规则去查找该 包模块
// 先找当前的 node_modules 目录下有没有 node-markdown ，如果有，优先找 package.json 文件
// 找到 package.json 文件之后，找 里面的 main 属性
// 如果 package.json 文件没有 或者 没有 main 属性 或者 main属性指定的文件模块不存在
// Node.js 会取上一级目录下的 node_modules 目录下 找 node-markdown  继续走上面的流程
// 直到 根目录下 如果还找不到  那么就报错
var md = require("node-markdown").Markdown;

// 第一步：读取原始的 md 文件，得到文件中的字符串内容
fs.readFile('../README.md',function (err, data) {
  if (err) {
    throw new Error('读取文件失败，有错误发生了');
  }

  // 第二步：得到该内容之后，将内容转换为 HTML 字符串

  var html = md(data.toString(),true);

  // 第三步：将HTML字符串保存到一个文件中
  fs.writeFile('../README.html',html,function (err) {
    if (err) {
      throw err;
    }
    console.log('文件转换成功');
  });

});

// console.log(module.paths);

// 默认第一个元素就是当前文件模块所属目录绝对路径+node_modules
// 第二个元素就是当前文件模块上一级目录绝对路径+node_modules
// ..../node_modules
// ../node_moudles
// [ 'C:\\Users\\iroc\\Desktop\\md-transform\\node_modules',
//   'C:\\Users\\iroc\\Desktop\\node_modules',
//   'C:\\Users\\iroc\\node_modules',
//   'C:\\Users\\node_modules',
//   'C:\\node_modules' ]
