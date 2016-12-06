"use strict";

// 以后再写代码的时候，无论你有没有使用 es6 都开启严格模式

// 在ws 中，进入设置选项：语言 && 框架：javascript -> 语言版本 -> ECMAScript 6
// let foo = 'bar';
//
// console.log(foo);

// 通过 var 声明的变量，块内的变量会把全局的给覆盖掉
// var foo = 'bar';
//
// if (true) {
//   var foo = 'baz';
// }
//
// console.log(foo);

// 通过 let 声明的变量只在当前代码块中有效

var foo = 'bar';

if (true) {

  // 通过 let 声明的变量，只在当前代码块中有效
  let foo = 'baz';

  if (true) {
    let foo = 'haha';
    // let foo = 'bar'; 不要重复声明，否则报错
    console.log('local:', foo); // => haha
  }

  console.log('local:', foo); // => baz
}

console.log('global:', foo);

// let 必须先声明，后使用，否则报错
// foo = 'bar';

