// 定时器
// 在 js 中，定时器不一定准确
// 在 js 中，console 提供了一个方法 time timeEnd
// time 和 timeEnd 通常用来统计一段代码的执行时间
// time 和 timeEnd 方法需要一个参数，对于同一段业务逻辑代码来说，该参数必须一致
// 要想在一个脚本文件中使用多次，必须使用参数 戳 来标记

// console.time('timer');
// for( var i = 0; i< 100000000; i++ ){

// }
// console.timeEnd('timer'); // timer: 113.024ms

// var beginTime = +new Date();

// setTimeout(function() {
//   console.log(+new Date() - beginTime);
//   console.log('1秒时间到了');
// }, 1000);

// setTimeout(function() {
//   console.log(+new Date() - beginTime);
//   console.log('3秒时间到了');
// }, 3000);

// 在第一个定时器中，已经远远超出了定时器的一个误差范围
// 在 Node.js 中，尤其是异步代码中，千万不要写 大计算量的代码 例如计算 兔子数列
// 放到代码角度，不要写具有大量循环的代码
// 后面要学到一个利用 多进程 来解决这个问题

// 当前的代码，死循环，后面代码不会继续执行
// 以后学习了 多进程 就可以把 死循环放到另一个进程中去执行
// while (true) {

// }

// console.time('1000毫秒的定时器');
// setTimeout(function() {
//   for (var i = 0; i < 10000000000; i++) {

//   }
//   console.timeEnd('1000毫秒的定时器');   这个写在了里面 来计算时间
//   console.log('1秒时间到了');
// }, 1000);


// console.time('3000毫秒的定时器');
// setTimeout(function() {
//   console.timeEnd('3000毫秒的定时器');
//   console.log('3秒时间到了');
// }, 3000);

var fs = require('fs');

fs.readFile('./README.md', function(err, data) {
    // 优先判断 异步代码中有没有错误
    if (err) {
        throw err;
    }
    // 如果没有 err 对象，标识我们可以使用正确的数据了

});