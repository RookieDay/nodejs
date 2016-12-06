'use strict';

let foo = 'bar';

let name = 'jack';

// 不用拼接字符串了 
// 在 模板字符串中使用变量：${变量名}
let str = `dsafasf
fsafas
dsafasf   ${foo}
fsafsafdas
fasfas
${foo} fsafsafas

hello  ${name}`;

console.log(str);