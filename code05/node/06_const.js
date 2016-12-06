"use strict";

// 常量 没有作用域提升， 必须先声明，后使用
// console.log(foo); // => 报错

// 通过 const  声明了一个常量
// 一般只在全局定义常量，不要在代码块中使用 const ，没有意义
const foo = 'bar';

// 不允许给常量赋值
// foo = 'baz';

console.log(foo);

// 常量声明的时候，必须初始化赋值
// const name; // => Missing initializer in const declaration

const obj = {
  foo: 'bar'
};

// 常量一旦声明，不可改变
// obj = {}; // => Assignment to constant variable.

// 对于引用类型来说，下面这句代码表示 修改
// 常量不可变的是 值，里面的数据无所谓
obj.foo = 'baz';

console.log('常量：',obj);
