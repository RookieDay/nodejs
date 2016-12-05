// ============ 同步代码出现的异常，包括执行顺序 ==============
// function parseJsonStrToObj(str) {
//   var jsonObj = JSON.parse(str);
//   return jsonObj;
// }


// console.log(1);

// try {
//   console.log(2);
//   parseJsonStrToObj('dnsajnfjafnja');
// } catch (e) {
//   console.log('糟了，程序出现异常了');
// }

// console.log(3);
// ============ /同步代码出现的异常，包括执行顺序 ==============





// ============ try-catche 无法捕获异步代码中出现的错误 ==============
// function parseJsonStrToObj(str, callback) {
//   process.nextTick(function() {
//     var jsonObj = JSON.parse(str);
//     // return jsonObj; // 注意，在异步代码的回调函数中，return 函数是没有作用的
//     callback(jsonObj);
//   });
// }

// 利用回调函数接收异步代码的处理结果
// parseJsonStrToObj('{ "foo": "bar" }',function (obj) {
//   console.log(obj);
// });

// try-catche 无法捕获异步代码中出现的错误
// try {
//   parseJsonStrToObj('的撒旦法萨芬', function(obj) {
//     console.log(obj);
//   });
// } catch (e) {
//   console.log('糟了，出错了');
// }
// ============ /try-catche 无法捕获异步代码中出现的错误 ==============




// ==================前无法区分，哪个是正确的结果，哪个是错误的结果============
// function parseJsonStrToObj(str, callback) {
//   process.nextTick(function() {
//     try {
//       var jsonObj = JSON.parse(str);
//       callback(jsonObj); // 正确情况下，jsonObj 的类型是 Object
//     } catch (e) {
//       callback(e); // 错误情况下，e 的类型是 Object
//     }
//   });
// }

// // 当前无法区分，哪个是正确的结果，哪个是错误的结果
// parseJsonStrToObj('dsafasfas',function (obj) {
//   if (typeof obj === 'object') {
//     console.log(obj);
//   }
// });
// ================== /前无法区分，哪个是正确的结果，哪个是错误的结果============




// 关于封装异步代码的规范：如果有多个参数，回调函数一定放在最后一个位置
// 强调错误优先
function parseJsonStrToObj(str, callback) {
  process.nextTick(function() {
    try {
      var jsonObj = JSON.parse(str);

      // 我们约定好，在没有错误的情况下，回调函数的第一个参数为 null
      callback(null, jsonObj);
    } catch (e) {

      // 我们约定好，在有错误的情况下，回调函数的第一个参数为 错误对象
      callback(e,null);
    }
  });
}

// 既然已经约定了，第一个参数为错误对象，第二个参数是真正的数据结果
parseJsonStrToObj('{ "foo": "bar" }', function(err,obj) {
  if (err) {
    return console.log('糟了，出错了'); // 一种简写方式，先执行return右边，再执行return 左边
  }
  console.log('数据正确，可以放心的使用');
  console.log(obj);
});
