/**
 * 进程：一个正在运行的程序
 * process：就是用来获取当前 node 运行进程的一些信息
 */

// 当程序退出的时候，进程也就结束了
// setTimeout(function() {
//   console.log('end');
// }, 10000);

// process.env  获取的是环境变量

// console.log(process.env['MYSQL_HOME']);

// 开发环境 直接打印日志到控制台
// 生产环境 不要打印了，把错误消息日志写入到文件中

// 如果是开发环境：NODE_ENV=develop
// 如果是生产环境，NODE_ENV=production
// var env = process.env['NODE_ENV'];

// if (env == 'develop') {
//   console.log('开发环境');
// } else if (env == 'production') {
//   console.log('生产环境');
// }

// exports.foo = 'bar';

// console.log(process.mainModule);

// console.log(process.memoryUsage());

console.log(1);

setTimeout(function() {
    console.log(2);
}, 0);

// 异步的执行一个回调函数
process.nextTick(function() {
    console.log(3);
    console.log('回调函数被执行了');
});

console.log(4);