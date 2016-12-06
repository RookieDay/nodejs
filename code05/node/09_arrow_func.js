'use strict';

// 箭头函数 也叫作：lambda 表达式，。本质就是一个匿名函数，在其它语言中（Java、c# 。。）
// 里面，一般它们传递参数的叫作：委托 delegate 函数可以作为参数进行传递并且调用

// 箭头函数的用户：省略了 function ，将原来 function 去除，在 参数括号后面加一个 => 
// 一般我们把 => 符号读作： goes to
// setTimeout(() => {
//   console.log('定时器到了');
// }, 1000);

// 使用箭头函数的时候，如果函数体只有一句代码，可以省略花括号函数体
// 箭头函数没有参数的时候，参数括号一定不能省略
setTimeout(() => console.log('定时器到了'), 1000);


// 如果有一个参数或者多个参数的时候，最好使用下面这种方式：
// 一个参数的时候可以省略 参数小括号
// 为什么以后好修改，无论是一个参数还是多个参数，最好都使用 参数括号
setTimeout((foo) => console.log('定时器到了'), 1000);

// 使用场景

var arr = [2, 12, 23];
var arr2 = arr.map(n => n + 1);
// var arr2 = arr.map((n) => {
//     return n + 1;
// })
console.log(arr2);

// 定义构造函数的时候不要使用 箭头函数定义，因为使用箭头函数定义的无法被 new
function Person(name) {
    this.name = name;
}

// 一般我们使用 箭头函数 是用于一个一次性的函数的时候，匿名函数
// 如果你要定义一个被多次使用的函数，还是使用 function 来
Person.prototype.sayHello = function() {
    setTimeout(function() {
        console.log(this.name); //这里的this已经是window了 出来的是undefined
    }, 1000);

    // var that = this;
    // setTimeout(function() {
    //     console.log(that.name); //fix
    // }, 1000);
};


Person.prototype.sayHello = function() {
        // 在箭头函数内部没有arguments 对象 所以不建议这么写
        Person.prototype.sayHello = () => {
            // console.log(arguments);

            setTimeout(() => {
                // 当使用了箭头函数之后，默认就绑定了 this 的指向到当前上下文环境
                console.log(this.name);
            }, 1000);
        };

        var p1 = new Person('Jack');

        p1.sayHello(); // => Jack