define(function(require, exports, module) {
    console.log('b.js文件模块被加载了');
    var sayHello = function() {
        console.log('hello world');
    };

    // 在同一个模块中， exports 和 module.exports 是等价的
    // console.log(exports === module.exports);
    // module.exports.sayHello = sayHello;
    // module.exports.foo = '我是b.js文件模块中的foo变量baz';

    exports.sayHello = sayHello;
    exports.foo = '我是b.js文件模块中的foo变量baz';

    module.exports = {};

    // exports = {}; 后面这个没有覆盖前面这个module.exports

});

// // 第一步
// function Module() {
//     this.exports = {};
// }

// function change(exports, module) {
//     console.log(exports === module.exports) //true
// }
// var module = new Module();
// change(module.exports, module);


// // 第二步
// function Module() {
//     this.exports = {};
// }

// function change(exports, module) {
//     console.log(exports === module.exports) //true
//     exports.foo = "bar";
//     exports.test = function() {
//             console.log("test");
//         }
//         // exports = 
//         // module.exports = 
//     return module.exports;
// }
// var module = new Module();
// var result = change(module.exports, module);