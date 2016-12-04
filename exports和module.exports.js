function Module() {
    this.exports = {};
}

var module = new Module();

var result = change(module.exports, module);

function change(exports, module) {
    // 相当于 执行了下面这句代码，exports拿到的是实际上 module.exports的一个引用
    // var exports = module.exports;

    console.log(exports === module.exports);

    // 下面是进行属性的挂载
    // exports === module.exports

    // module.exports.foo = 'bar';
    exports.foo = 'bar';

    // module.exports.test = function(){};
    exports.test = function() {
        console.log('测试方法');
    };

    // 一旦exports重新赋值就改变了,切断了exports === module.exports 之间的引用，不会影响我们的module.exports
    // exports = 重新开辟了一个空间，丢失了原来的引用
    // module.exports = 

    return module.exports; //现在return的是module.export 他和改变后的exports不是一个东西了
}

// 举例
var obj = {
    foo: 'bar'
};

var obj2 = obj;

console.log(obj2); // => { foo: 'bar' }

obj2 = {};

// 情况1
function changeObj(o) {
    o.foo = 'baz';
}

changeObj(obj2);

console.log(obj); // => { foo: 'baz' }
console.log(obj2); // => { foo: 'baz' }


// 情况2

function changeObj(o) {
    var o = obj2;
    // o.foo = 'baz';
    o = {};
}
changeObj(obj2);
console.log(obj); // => { foo: 'bar' }
console.log(obj2); // => { foo: 'bar' }


// 情况3
obj2 = {};
// function changeObj(o) {
//     var o = obj2;
//     // o.foo = 'baz';
//     o = {};
// }
changeObj(obj2);
console.log(obj); // => { foo: 'bar' }
console.log(obj2); // => { foo: 'bar' }