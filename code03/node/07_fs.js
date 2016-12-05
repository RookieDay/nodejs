/**
 * fs 核心模块
 * 目标：了解异步编程
 */

var fs = require('fs');

// console.log(1);

// 所有的异步代码 try-catch 捕获不到
// try {
//   fs.writeFile('./a.txt', '闻郎江上唱歌声');
// } catch (e) {
//   console.log('抱歉，出错了');
// }

// try {
//   setTimeout(function() {
//     JSON.parse('nfdkjlnfkdlas');
//   }, 1000);
// } catch (e) {
//   console.log('抱歉，出错了');
// }

// try-catch 只能捕获同步代码出现的异常
// 同步就是按照顺序执行
// 异步就是 不会阻塞后续代码的继续执行
// try {
//   JSON.parse('nfdkjlnfkdlas');
// } catch (e) {
//   console.log('抱歉，出错了');
// }

// console.log(3);

// 所有异步代码中，return 是不管用的
function parseJsonStrToObj(str, callback) {
    process.nextTick(function() {
        try {
            var obj = JSON.parse(str);
            callback(null, obj);
        } catch (e) {
            callback(e, null);
        }
    });
}

parseJsonStrToObj('dsadsa', function(err, obj) {
    if (err) {
        console.log('抱歉，出错了');
    } else {
        console.log('success', obj);
    }
});