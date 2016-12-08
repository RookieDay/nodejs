Day01:
### 全局函数

- 命名冲突的问题
- 模块的关系不够明显

### 对象封装

- 理论意义上解决了命名冲突的问题（通过人为约定的方式）
- 没有私有化空间，容易被外部修改

### 划分私有空间

- 防止内部属性被外部修改了

### 模块的维护扩展

- 模块的扩展一定要遵守一个约定：开闭原则
- 对添加开放、对修改封闭

### 模块的第三方依赖

- 不要直接在模块内部使用第三方依赖
- 模块与模块之间的依赖关系不够明显
- 最好通过 将 依赖项 注入 的形式 来解决第三方依赖的问题  依赖注入

### 总结

- 最大的问题，规范的问题
- 如果在多人协作开发过程中，会有很大的问题
- 多人协作开发过程中：代码的风格一定要统一

# Node.js 第一天课程笔记

## 模块化开发复习 

### 什么是模块化

- 现实中的模块化
  + 就是一种生产的方式而已
  + 生产效率高
  + 维护方便，成本低
- 程序中的模块化
  + 就是开发方式而已（代码的编写和组织方式）
  + 开发效率高
  + 方便维护了（维护的成本更低）

- 为什么要在 程序 中使用 模块化的开发方式
  + 命名冲突
  + 文件依赖
### 说一下 SeaJS 和 jQuery 是什么关系？

- 它们之间没有任何的关系
- jQuery 专注于 DOM 操作，帮我们解决一些兼容性的问题，直接干活的，直接参与我们的业务逻辑，就是一个冲锋陷阵的士兵

- SeaJS 用来管理为组织我们的代码的
    + 解决了命名冲突
    + 解决了文件依赖的问题
    + 后勤
    + SeaJS是专注于js文件的和js代码
### `SeaJS` 的使用

- 定义模块 `define`
- 定义模块 `define`
- 的撒打算大大萨啊的撒按时撒
- 加载模块 `require`
  + 在一个模块系统中，`require` 加载过的模块会被缓存
  + 默认 `require` 是同步加载模块的
  + 可以通过 `require.async('模块标识',callback)` 使用异步的方式加载一个模块
- 暴露接口 `exports` 和 `module.exports`
- 启动模块系统 `seajs.use(callback)`
  + seajs.use 和 Document 的 ready 没有任何关系
  + 要想保证 文档结构加载完毕再执行你的 js 代码，一定要在 seajs.use  内部通过 window.onload 或者 $(function(){})

- 分清楚前台模块化和node中的模块化的区别

- 掌握模块化的思想

exports.js
define(function (require, exports, module) {

  module.exports.add = function (x,y) {
    return x + y;
  };

  // 当你想向外暴露多个函数的时候，可以通过 多次调用 exports.挂载的属性 向外暴露

  // 为了少了一个 . 少了一层命名空间，实际上还是一个东西
  exports.add = function (x,y) {
    return x + y;
  };

  exports.substract = function (x,y) {
    return x - y;
  };
});
module.exports.js
define(function (require, exports, module) {
  // module.exports 适用于 单独的暴露单独的一个函数、变量或者对象
  module.exports = function () {
    
  };
});



## Node 简介

### PHP 是世界上最好的语言吗？

```
$a
$b
echo
```

### JavaScript 是世界上最好的语言？

JavaScript并不一定是世界上最好的语言，但是一定是最流行的语言

### 客户端 JavaScript 是怎样的？

- 什么是客户端
  + 面向用户的端就是客户端
  + 和服务器端是对立的：提供服务的

- 什么是 JavaScript？
  + 一种语言
  + 弱类型
  + 脚本语言（不需要预编译的语言）
    * 计算机只能识别 0 和 1  ，也就是二进制代码
    * 脚本语言就是不需要提前编译，而是在*运行时动态的编译和解析执行*
    * 脚本语言也叫作 动态语言
    * 还有一种语言叫作：静态语言（静态语言需要经过编译之后才能执行）
  + 运行在浏览器中
  + JavaScript 就是一种运行在 浏览器 中的 脚本语言
- JavaScript 是运行环境是什么？
  + 浏览器
  + 理论意义上，JavaScript 是运行在 浏览器中的 js 解析引擎中
- 浏览器中的 JavaScript 可以做什么？
  + 从 JavaScript 语言角度来说：if else var while for switch [] {} function
  + 理论意义上的js  是指  ECMAScript 3（JavaScript 语言标准规范）
  + DOM操作
  + window  document onclik  onmousemove 它们都是 浏览器 开放给 程序员的 接口
  + ajax 编程  var xhr = new XMLHTTPRequest();
  + 事件驱动编程
  + 使用 JavaScript 语言 在浏览器中做界面交互和基本的程序逻辑（表单校验）
- 浏览器中的 JavaScript 不可以做什么？
  + 相对于 传统的 c、Java、c#、c++ 等等这些语言来说
  + 文件操作
    * 注意：JavaScript 本身不是不可以操作文件
    * 为了 安全性
  + 客户端的 JavaScript 可以向 服务器 发送请求
  + 客户端 JavaScript 只能发送请求，而不能接收请求
- 在开发人员能力相同的情况下编程语言的能力取决于什么？
  + 最重要的一个区别
  + 最重要的区别 取决于 你的 执行环境
  + 一些后台语言：Java、PHP、c#、c++ 运行环境不一样
  + 编程语言的能力 真正 取决于 这个语言在哪儿运行（运行环境）
- JavaScript 只可以运行在浏览器中吗？
  + JavaScript 不仅仅能够运行在浏览器中？
    * 汽车中的发动机
    * 引擎最重要的特定：可移植
- Chrome 浏览器的实现结构

### 什么是 Node?

- [https://nodejs.org/en/]()
- Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
  + JavaScript runtime  JavaScript 运行时
  + Chrome's V8 JavaScript engine Chrome 浏览器 V8 引擎
  + Node.js 是一个 构建于 谷歌的 Chrome 浏览器的 V8 引擎之上的一个 `JavaScript运行时` 环境
  + Node.js可以解析和执行 JavaScript 代码
- Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. 
  + event-driven  事件驱动模型
  + non-blocking I/O model  非阻塞IO模型  IO（input/output）输入与输出
  + lightweight[ˈlaɪtweɪt]  轻量级
    * 在软件开发行业中，轻量级标识褒义词
    * 轻量级也就意味着 运行速度快
    * 轻量级也就意味着有更好的 跨平台 特性（平台的差异性，兼容性）
  + efficient[ɪˈfɪʃnt] 高效的
  + Node.js的 事件驱动和非阻塞IO模型使得Node.js本身非常的轻量和高效
- Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
  + package ecosystem npm  包生态系统 npm
  + largest  最大的
  + open source libraries 开源库
    * 理论意义上 开源就表示有成熟的社区，开放源代码
  + Node.js 的npm包生态系统，是世界上 最大的 开源库 生态系统
  + 以前的 客户端中 JavaScript 库 散列在互联网的各个地方
  + npm 就是 把大家经常使用的一些开源库 给 组织到了一起

********************************************************************


Node 是一个可以解析和执行 JavaScript 代码的 运行时环境

是一个在浏览器之外可以解析和执行javascript 代码的运行时环境 或者说是一个运行时平台
理论意义上就是
  Js语言在服务器端的运行环境
  Js语言通过Node在服务器运行 在这个意义上  Node有的像java 虚拟机
  Node提供大量工具库 使得js语言可以与操作系统互动---操作文件 网络IO 操作进程 在这个意义上 Node又是js的工具库
特性：
  无阻塞的IO模型 事件驱动
  通常用来构建实时服务的应用程序

********************************************************************



- Node.js 的作者叫什么？
  + 瑞恩.达尔

- Node.js 是 JavaScript 吗？
  + Node.js 不是 JavaScript ， Node.js 不是一种 语言
  + Node.js 不是 框架、库
  + Node.js 是一个可以解析和执行 JavaScript 代码的一个运行时环境

### Chrome 浏览器的实现结构

- Webkit 渲染、布局引擎
- V8 JavaScript 解析执行引擎   语言本身指  ECMAScript
- 中间层（DOM、BOM） 浏览器暴露出来的接口
- 硬件层

### Node 的实现结构
- V8 JavaScript 解析执行引擎   ECMAScript
- 中间层 （提供了文件操作、网络操作登陆接口）更加接近操作系统的接口供开发人员使用
- 硬件层


### Node 可以做什么

- 操作文件（创建、删除、修改、读取）
- 提供Web服务（在Node中可以接收客户端的请求了）
- Node 可以 开发一些 命令行工具软件
- Node 可以 开发动态网站（有用户业务交互的功能Web站点）
  + 用户登陆
  + 用户注册
  + 添加购物车
  + 商品的展示
- Node 可以帮我们 把之前 所写的 静态页面  -> 动态化
- Node.js 再也不需要操作DOM、BOM了，再也不需要写HTML、css 不需要关心 兼容性的问题
- Node.js 编程实际上就是在 写 JavaScript 代码，关心的是业务功能
- 操作持久化数据
- 可以开发 命令台 工具软件

### Node.js 和 PHP 有什么区别？

- 它们都能操作文件，都有和操作系统底层打交道的 API
- 它们都可以进行网络操作，网络服务
- PHP 需要和 Apache 结合起来才能提供 Web服务
- Node.js 摒弃了以往所有的 服务器 
  + Node.js 可以独立作为一个服务器来使用 他自己本身就是一个服务器
- Java、PHP、.net 能做的事儿，Node.js 基本都能做，而且在某一方面比它们还要做的好

### 谁在使用 Node

国内一些创业公司用用的比较多，功夫熊（做上门保健的，美甲、按摩）

国外的一些大公司都有使用：Facebook、Twitter、Google
国内的一些大公司：Alibaba（天猫所有的页面都是通过Node提供的服务）、Tencent、Baidu

### 如何学习 Node

- 阅读一些大牛写的技术博客
- 看一些大牛写到书
  + 深入浅出Node.js（作者：Alibaba：朴灵）学完Node.js之后，甚至使用Node.js工作了半年了再看
- 多写代码

*** 

## 安装与配置

### 安装包的方式安装

- 下载地址：
- 一路下一步 next
- 如何确认是否安装成功：
  + `win + r` ，然后输入 `cmd` ，然后敲回车 就可以进入 cmd 控制台

### nvm 安装和管理我们的 Node.js版本

## 控制台基本使用

允许用户可以在终端命令台中与操作系统交互，其实就是输入与输出

### 如何打开cmd

1. 通过 按 window 键，输入 `cmd` 打开cmd程序
2. 通过 `win+r`  输入 `cmd`，敲回车就可以进入

### 基本命令

- `dir` directory 列出当前目录下所有的条目
  + 别名 `ls` 在 powershell 中可以使用
- `cd` change directory 切换目录

```
切换到当前目录下的 Desktop 目录
当想切换到当前目录的时候，最好使用 cd ./ 相对路径的形式
C:\Users\iroc>cd Desktop
C:\Users\iroc\Desktop>

在Windows 上切换盘符：
`d:`

切换绝对路径之后再同一个盘符下才有效

切换到上一级目录
C:\Users\iroc\Desktop\code\seajs>cd ../
C:\Users\iroc\Desktop\code>

连续进入多级目录
C:\Users\iroc\Desktop\code>cd seajs/a
C:\Users\iroc\Desktop\code\seajs\a>
```

- `cls` clear screen 清屏
  + 别名 clear 在widnows中的 `powershell` 中可以使用

### path 环境变量

目的是为了在控制台中的任何目录都可以快速打开或者使用该可执行文件

环境变量就是用来存储系统级别的变量

- 添加环境变量
  + 我的电脑 -> 右键选择属性 -> 高级系统设置 -> 切换到`高级`面板 -> 环境变量
  + 第一种方式：直接把可执行文件所属的目录 放到 PATH 环境变量中（如果没有PATH环境变量，自己新建）
  + 第二种方式：新建一个环境变量，变量名规范：逻辑名_HOME 变量值：该可执行文件所属的目录
  + 注意：无论是直接添加的路径还是引用的变量名，一定要用 英文的分号 区分开
  + 引用变量名的时候，变量名两边都是 `%`

`> feiq`
当你在控制台中输入一个程序的名字的时候，cmd 默认把它当成一个可执行文件去执行了，
优先找当前目录下是否有没有一个叫做feiq.exe 的可执行文件，如果有，直接执行打开
如果没有，cmd会进入 path 环境变量中 一个目录一个目录的挨着查找里面是否有该可执行文件

## REPL(Read-eval-print-loop) 运行环境

就是浏览器中的控制台，可以辅助我们做一些API测试

- 通过在控制台中输入 `node` 敲回车就可以计入 REPL 运行环境
- 通过在REPL运行环境中 连续按两次 `Ctrl+C` 就可以退出 REPL 运行环境


## Global
文件之间require他们直接就共享了一个global

### __dirname 和 __filename

它们属于模块作用域，可以直接使用
它们两个用来获取路径的，一般用于操作文件路径的时候，才会用到

## process

process 是一个全局可用对象，可以在任何地方使用

- process.argv
  + 可以通过该属性，获取命令台输入的一些参数

## 模块系统

## 包

## npm

markdown-preview README.md


-----------------------------
hexo 静态博客生成器
npm install -g hexo
cd blog 
hexo server   localhost:4000
hexo new "good day"   //代表创建一个博客

npm configure set prefix "c"\....\node_modules\npm"
npm root -g
npm install -g http-server   (会默认安装到你的本地的node_module npm文件下)
如果你碰到卡死的撞到 到你的用户\GL|.npmrc目录下 删除.npmrc文件

npm install less -g
lessc example.less
lessc example.less example.css

npm install -g bower 全局命令行工具

npm init -y  初始化一个json 文件
npm install underscore --save 保存dependenicies 到json文件当中

1.
这样别人拿上json 就可以 npm install 下载所需要的依赖包
2.
下载最新的 可能比拷贝的版本稳定


npm install -g 包名  -g代表安装一个全局可用的命令行工具

npm install -g hexo-cli 相当于安装了hexo 命令行工具


npm install http-server -g 


npm install -g less 

npm uninstall jQuery

npm install 包名 --registry=https://registry.npm.taobao.org

步骤：
新建一个package.json文件
npm init -y 自动生成 输入信息
新建lib目录  
npm install --save jQuery 会在package.json中保存依赖项
npm install 会根据pakage.json的dependincies下载你的依赖node module包
npm uninstall jQuery --save  会删掉package.json中的依赖
/**
 * 加载目录的规则
 */

// 如果写全了文件路径+扩展名 Node.js 会直接把该路径解析为一个绝对路径直接加载，如果没有，直接报错
// 
// 如果省略了扩展名，Node.js 优先尝试找有没有一个叫做 cal 目录
// 如果有 cal 目录，在该目录下，找有没有一个叫做 package.json 的文件
// 找到 package.json 文件之后 找文件下有没有一个 main 属性
// 如果得到 main 属性的值，直接根据该值去加载文件模块
// 如果没有package.json 文件 或者 文件中没有 main属性或者 main 属性中的文件路径值不存在
// 这个时候，Noide.js 会直接找该目录下 index.js  index.node index.json
// 以后自己在写js代码的时候，文件最好不要与目录同名
var cal = require('./cal'); // ./cal.js ./cal.node ./cal.json  最后得到了一个目录 ./cal 目录

console.log(cal);



// nodejs 还有一种特殊的模块加载规则，叫做：包的加载
// 当模块标识 既不是文件模块，也不是核心模块的时候，
// Node.js按照一定的规则去查找该 包模块
// 先找当前的 node_modules 目录下有没有 node-markdown ，如果有，优先找 package.json 文件
// 找到 package.json 文件之后，找 里面的 main 属性
// 如果 package.json 文件没有 或者 没有 main 属性 或者 main属性指定的文件模块不存在
// Node.js 会取上一级目录下的 node_modules 目录下 找 node-markdown  继续走上面的流程
// 直到 根目录下 如果还找不到  那么就报错
过程：
console.log(module.paths);
// [ 'C:\\Users\\iroc\\Desktop\\md-transform\\node_modules',
//   'C:\\Users\\iroc\\Desktop\\node_modules',
//   'C:\\Users\\iroc\\node_modules',
//   'C:\\Users\\node_modules',
//   'C:\\node_modules' ]


+ 以 `/` 开头的绝对路径文件模块
    * 在 Windows 中， `/` 表示 require 方法所在文件所属的盘符，不要这样使用
    * 在 Linux 中，`/` 就表示 根路径
  + 加载一个目录
    * package.json 文件中的 main 属性
    * index.js index.node index.json
  + 加载一个包
    * module.paths
    * package.json
    * index.js index.node index.json
    * node_modules 目录一般用来放置第三方包的
    * 不要把自己写的模块或者包放到 node_modules 目录下

## npm

### 解决 npm 被墙的问题

- 第一种方式：通过指定镜像源地址来下载包：
`npm install 包名 --registry=https://registry.npm.taobao.org`
http://npm.taobao.org/
- 第二种方式：通过 淘宝提供的一个 cnpm 全局命令行工具
  + 安装全局命令行工具 `npm install -g cnpm`
  + 基本使用`cnpm install 包名`

- 第三种方式：通过一个全局命令行工具 `nrm` 来管理我们的镜像源地址
npm uninstall -g nrm
  + 安装nrm `npm install -g nrm`
  + 基本使用
      nrm
    * 显示当前所有可用镜像源 `nrm ls`    管理我们的镜像地址
    * 显示当前正在使用的镜像源 `nrm current`
    * 切换镜像源 `nrm use 镜像源名称`
# Node.js 第四天课程笔记

***

## 1. 复习

### 1.1 异步编程

同步编程：符合程序员的逻辑思维

异步编程方式：在JavaScript中会经常遇到：
```JavaScript
$.ajax({
  url:'',
  success: function(data){
    // "{ "name": "jack" }"
    // 该异步操作需要上一步异步操作返回来的数据
    $.ajax({
      url: '',
      data: data,
      success: function(data){
        $.ajax({ url: '', data: '', success: function() {} })
      }
    });
  }
});
```

#### 1.1.1 回调函数

将一个函数作为参数传递给另一个函数，并且通常在第一个函数执行完成后被调用

因为第一个函数的执行不确定什么时候执行结束

#### 1.1.2 异常处理
- try-catch 捕获异常
- 回调函数的设计
  + 回调函数一定作为参数的最后一个参数出现
  + 第一个参数默认接收错误信息
  + 第二个参数才是真正的数据

***

## 2. node 调试


npm install -g node-inspector

### 2.1 console.log

`console.log` 是最方便的，也是最快的。

### 2.2 node内置调试器（不推荐使用）

使用方式：在控制台中输入以下命令：
```
node debug 脚本文件名
```

执行上面的命令结束之后，代码会自动停在脚本的第一行，等待用户执行其它调试命令。
可以通过输入 `help` 命令查看可用命令

### 2.3 node-inspector

node-inspector 是一个第三方全局命令行调试工具。
[node-inspector](https://github.com/node-inspector/node-inspector)

#### 2.3.1 安装

```
npm install -g node-inspector
```

#### 2.3.2 启动调试
node-inspector 保持挂起不要关闭
```
node-debug app.js
```

`node-debug` 命令会自动在当前操作系统默认浏览器中加载node调试器

默认情况下，代码会快速执行结束，
所要想让代码停留在程序的第一行位置，可以输入下面的命令启动调试：

```
node --debug-brk app.js
```

这样的话，调试器启动只有会自动停留在程序的第一行位置等待输入命令进行后续调试操作。

调试的快捷键和在 `Chrome` 浏览器中的快捷键是一样的

### 2.4 visual studio code 调试 node

[visuao studio code 官方网站](https://code.visualstudio.com/)

#### 下载

[visuao studio code 下载地址](https://code.visualstudio.com/Docs/?dv=win)

#### 安装

手动安装，一直下一步下一步就可以了

#### 开始调试

[vsc官方文档调试链接](https://code.visualstudio.com/docs/editor/debugging)

1. 必须以项目的方式打开要调试的js脚本所在的目录，目录路径最好不要包含中文，否则可能有问题
2. 在要调试的脚本文件中，找到具体要设置断点的行，在左侧点击设置断点
3. 设置好断点之后，按`F5`启动调试
4. 这个时候，`vsc` 编辑器会提示你选择要调试的环境，这里选择 `Node.js` 即可
5. 当选择完调试环境之后，`vsc` 默认会在当前根目录下生成一个 `.vsccode` 目录
6. 在 `.vsccode` 目录下找到一个叫做 `launch.json` 的文件，打开编辑
7. 在 `launch.json` 文件中，在 `configurations` 节点下找到一个叫做 `program` 的属性节点
8. 将 `program` 属性节点中原来的值 `${workspaceRoot}/app.js` 改为 `${workspaceRoot}/要调试的脚本文件名.js`
9. 修改完毕之后，按 `Ctrl+F5` 保存
10. 上述操作完成之后，按 `F5` 启动调试
11. 尽情的享受 `vsc` 调试带给你的调试的乐趣吧
12. 快捷键和 `Chrome` 浏览器中的调试环境快捷键一致

对于执行了以上操作还没有成功的同学，建议将 `vsc` 关闭重新打开再次按 `F5` 启动调试即可解决

### 2.5 webstorm 调试 node

#### 开始调试

1. 在要调试的文件中具体的行位置左边通过 `Ctrl+F8` 设置一个端点
2. 在当前要调试的文件中通过鼠标右键，然后选择 `Debug 要调试的文件名.js`
3. 这个时候 ws 会自动帮你启动调试模式，并且自动停留在你打击端点的位置
4. `F8` 步进
5. `Shift + F8` 步出
6. `Alt + F8` 可以执行一个表达式
7. `Ctrl + F5` 重新启动调试

***

## 3. ECMAScript 2015

ECMAScript 是当前 JavaScript 语言规范的最新标准，一般称为 es6，
但是因为 该标准规范是在 2015年6月份发布的，所以也叫作 ECMAScript 2015

目前 ECMAScript 2016 标准的指定也在规划中，ECMAScript 2017 也在制定中了，已经有了一些阶段
stage-1 stage-2 stage-3 stage-4

### 3.1 严格模式

要想使用　ES 2015 ，一定要开启 严格模式

开启严格默模式：`"use strict;"`

### 3.2 let 变量声明

es2015 中新增了一种变量声明的方式： `let`，类似于 `var`,
通过 `let` 声明的变量只在 `let` 命令所在代码块内有效。

块级作用域，块级其实就花括号之间的代码自动形成一个单独的作用域

- 为什么要有块级作用域？
  + 内层变量可能会覆盖外层变量
  + 用来计数的循环变量泄露为全局变量

使用 `let` 注意事项：
- 不存在变量提升，变量一定要先声明，后使用，否则报错
- 在相同作用域内，不允许重复声明同名变量，否则报错
- 块级作用域
  + 外层代码块不受内层代码块的影响
  + 外层作用域无法读取内层作用域的变量
  + 内层作用域可以定义外层作用域的同名变量

使用场景：
一般在块内部使用 let 变量进行声明

### 3.3 const

`const` 也是用来声明变量，但是声明的是常量。一旦声明，常量的 `值` 不可改变

使用 `const` 注意事项：
- 通过 `const` 声明常量的同时必须初始化赋值，否则报错
- 一旦声明，常量的值不可改变，否则报错
- `const` 也是块级作用域，只在声明所在的块级作用域内有效，不建议在 块内使用 const
- 不存在变量提升
- 不可重复声明

`cosnt` 使用场景：

所有不希望用户去改变的变量就通过 `const` 声明为常量
```javascript
const fs = require('fs');
const os = require('os');
```

通过 `const` 声明的常量不可改变的是常量的地址，如果该常量是一个对象，依然是可以被修改的

```javascript
'use strict';
const obj = { foo: 'bar' };
console.log(obj.foo); // => bar
obj.foo = 'baz';
console.log(obj.foo); // => baz
```

### 3.3 字符串扩展的一些新特性和API

#### 3.3.1 模板字符串

只要以后涉及到字符串拼接的业务，就直接使用模板字符串    `${a}${b}aaa`

先来看看以前是我们是拼接字符串的：

```
var str = '<h1 id="'+id+'"><a href="'+href+'" class="headerlink" title="'+title+'">'+title+'</a></h1>';
```

对面上面那种方式及其容易出错，而且代码不够直观优雅，所以 es2015 中新增了一个全新的增强版字符串：模板字符串

```
var str = `<h1 id="${id}">
            <a href="${href}" class="headerlink" title="${title}">${title}</a>
           </h1>`;
```

有了模板字符串，我们以后在拼接遇到拼接字符串的场景的时候就不用像以前那样写一大堆看不清楚的拼接了

模板字符串注意事项：
- 模板字符串使用反引号 ` 作为标识，在键盘左上角的Esc 下面（切换到英文状态才可以）
- 模板字符串中所有的空格和缩进都会被保留
- 在模板字符串中嵌入变量：${变量名}，可以使用多次

#### 3.3.2 字符串扩展的一些API

- includes(str)   表示是否找到了参数字符串
- startsWith(str) 表示参数字符串是否在源字符串的头部
- endsWith(str) 表示参数字符串是否在源字符串的尾部
- repeat(num) 将原字符串重复n次并返回


### 3.4 箭头函数

箭头函数就是一种简洁的函数语法糖而已，一般我们在需要使用一个匿名函数的时候，
就可以使用箭头函数来代替了，可以使我们的代码变得更优雅


使用箭头函数注意事项：

- 箭头函数一般用于一次性的函数，也就是匿名函数
- 箭头函数创建的函数不能被实例化
- 箭头函数内部没有 arguments 对象

***

## 4. 文件操作

### 4.1 Buffer

计算机最早诞生的时候，没有中文，在美国

26个英文字母，@ ! , . - + =

计算机只能识别 0 或者 1

把你的字符和计算机真正存储的二进制数据做了一个字典：

可以通过 开源中国 官网网站提供的一个工具页面：http://tool.oschina.net/


随着计算机普及到了世界各地，ASC II 码 已经不能满足世界各地人们的需求了

计算机进入中国之后，后来在原来的 ASC II 码基础之上扩展了一个新的字符集编码：gb2012，
用来支持中文

#### 4.1.1 创建Buffer

Buffer 是一个像 Array 的对象，它的元素为16进制的两位数（0-255的值），主要用于操作字节，
Buffer 是一个全局对象，使用的时候不需要 require

- new Buffer(size)
- new Buffer(str[,encoding])

#### 4.1.2 Buffer的一些属性

- buf[index] 通过下标访问 buffer 的某个字节的数据
- buf.indexOf(value[, byteOffset][, encoding]) 查找某个字符在 buffer 内存中的字节下标
- buf.includes(value[, byteOffset][, encoding])
- buf.length
- buf.slice([start[, end]])
- buf.toString([encoding[, start[, end]]])
- buf.write(string[, offset[, length]][, encoding])

#### 4.1.3 Buffer 的一些类方法

- Buffer.byteLength(string[, encoding])
- Buffer.concat(list[, totalLength])
- Buffer.isBuffer(obj)
- Buffer.isEncoding(encoding)

#### 4.1.4 造成乱码的原因

我们通常所说的编码一般就是指 字符集编码，一般用于字符串

当你把一个 `gbk` 编码文件发送给了你的一个国外友人的时候，
乱码的原因就是：他的机器上没有该编码　

计算机为了让多语言操作系统下可以识别和共享一种编码格式：所以诞生了 超级大字典：`utf-8`

造成乱码的原因其实就是　读取的编码和文件的编码不一致　

要想解决乱码：让文件编码和读取编码统一即可

- 什么是字符集编码
- 为什么要有编码
  + 计算机只能识别二进制
  + 为了让计算机可以识别字符，人类做了一个字典 二进制 -> 字符 的映射关系
- 为什么会产生乱码
  + 文件编码和读取该文件的编码不一致导致的
- 如何解决乱码
  + 让文件和读取的字符编码集一致即可
- 如何解决 Node 原生不支持的一些编码
  + 通过 第三方包：[iconv-lite ](https://www.npmjs.com/package/iconv-lite)
  + 该第三方包可以解决 gbk 等编码不支持的问题


#### 4.1.5 iconv-lite 基本使用

原生node对于某些编码并不支持，为了解决这个问题，
我们可以使用社区提供的一个包：`iconv-lite` 来解决node无法识别的编码的问题

首先，要下载 `iconv-lite` 到当前项目中

```
npm install iconv-lite --save
```

安装之后，就可以在项目中使用了

基本使用：
```javascript
// 引包
const iconv = require('iconv-lite');
 
// 将一个buffer对象按照 gbk 编码来解析，得到的就是一个 解码过后的 字符串
// 注意：前提是你要知道你的 buffer 对象中实际存储的是哪个编码生成的二进制数据
str = iconv.decode(new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'gbk');
 
// 对字符串进行 gbk 编码，得到的就是一个进行 gbk 编码过后的二进制数据
buf = iconv.encode("Sample input string", 'gbk');

// 检查 iconv-lite 是否支持该编码
iconv.encodingExists("us-ascii")
```

## 5. 晚上补课

### 5.1 翻墙

![life without walls](life.jpeg)

#### VPN

![一图看懂vpn](vpn.gif)

#### vps

![一图看懂vps](vps.jpg)

#### shadowsocks

[直接购买](http://www.shadowsocks.com)

[免费 shadowsocks 账号](http://www.ishadowsocks.net/)

[一个比较实惠的vps](https://bandwagonhost.com/)

[自己搭建翻墙服务器](http://shadowsocks.blogspot.com/)

[蓝灯](https://getlantern.org/)

### 5.2 利用 github 免费空间部署自己的个人网站

1. 注册 github 账号
2. 登陆自己的 github 账号
3. 在右上角 找到一个 +号的坐标：选择 New repository 表示新建一个仓库
4. 仓库的名字就用：`你的用户名.github.io` 如果不使用自己的用户名无效
5. 填写完 仓库名称之后，选择下面的 `Create repository` 创建该仓库
6. 创建完成之后自动跳转到了一个页面，然后选择切换到 `HTTPS` 
7. 将后面的仓库地址复制出来
8. 回到操作系统中，找到一个目录
9. 在该目录下 执行： `git clone https://github.com/iroc/iroc.github.io.git`
10. 通过 Sublime 打开该目录，在该目录下新建一个文件 `index.html`
11. 在该文件中写自己的页面就可以了
12. 编辑完之后，在命令行中输入：`git add .`
13. 然后 `git commit -m "2016-5-3 20:17:48"`
14. 然后 `git push`
15. 执行完 `git push` 之后，需要输入自己的github用户名和密码，然后才能提交到github上
16. 最后就可以通过 `iroc.github.io`

### 5.3 修改注册表在鼠标右键中加入  `Open With Sublime Text` 选项

1. 打开注册表编辑器，win+r 输入 regdit
2. 查找该节点
HKEY_CLASSSES_ROOT→ * → Shell 
3. 在该节点下新建项名为 Open With Sublime Text 3
4. 在右边窗口新建字符串值  右键--新建--字符串值，名称为Icon，值：C:\Program\Sublime Text 3\sublime_text.exe,0
5. 在新建的项下面新建项 command。修改右侧窗口中的默认值，修改为：C:\Program Files\Sublime Text 3\sublime_text.exe "%1"
退出，测试是否生效

### YouTube最火短片：[盖章](https://www.youtube.com/watch?v=mLlAWzvoCRU)

- smile
- great
- awesome
- amazing



# Node.js 第6天课程笔记

## 复习

### 同步调用和异步调用

同步会阻塞当前代码的继续执行，直到结果返回之后，在会继续往后执行，
对于同步代码来说，我们需要使用 try-catch 来捕获一样

异步不会阻塞当前代码的继续执行，什么时候执行结束，会触发 我们设置好的回调函数，
对于异步代码来说，通常会把错误对象放到回调函数的第一个参数中，我们通过 判断 第一个参数
err对象是否为空来查看到底有没有发生异常

在有IO操作的地方，异步IO肯定是高效与同步IO的。

// 对于同步IO代码来说，就是我自己去做读取文件这件事儿，而且一次还只能做一件事儿
fs.readFileSync()   100ms
fs.readFileSync()   100ms  +  10ms
fs.readFileSync()   110ms + 200ms
fs.readFileSync()
fs.readFileSync()

这这里的异步IO相当于 找了 五个人去帮我干活了，其中的某个人什么时候把活儿干完了，
那就把最终的结果（包裹） 交给我自己，我自己在回调函数中处理自己的业务
fs.readFile(callback)  不会阻塞后续代码的继续执行
fs.readFile(callback)  不会阻塞
fs.readFile(callback)  不会阻塞
fs.readFile(callback)  不会阻塞
fs.readFile(callback)  不会阻塞

// 找了多个人去帮我去做读取文件的事儿了，而我自己还可以继续处理自己的事情
let var  = 'bar';

## 网络编程

我们处于互联网时代，我们可以随时随地通过 Internet 上网、浏览新闻、玩LOL、上淘宝购物等等。
这些过程都发生了网络数据的交互。树莓派

简单来说：比如你正在手机上浏览网易新闻，对汪峰上头条很感兴趣，点击该链接后，就会进入新闻，
那么就会发生一件事：发出请求给网易服务器（告诉网易服务器我要查看汪峰上头条这条新闻），
服务器解析你的请求，返回汪峰头条新闻的具体内容。这个过程发生了数据的交换，
也就是请求数据传输给了网易服务器，网易服务器又返回响应数据给客户端。

所以，网络编程 是指**编写程序使两台联网的计算机可以完成网络数据交互，完成网络通信。**
注意：这里的计算机泛指可以上网的设备，比如PC、手机、服务器、智能电视等等。

强调：网络编程重在思想，node只是一个可以帮助我们学习网络编程的一个工具而已。
使用其他编程语言或者操作系统进行网络编程，思想都是一样的。

### 为什么叫 Node

Node是一个面向网络而生的平台。

Ryan Dahl 在创建Node项目的时候给它起了一个名字叫做 web.js ，就是一个Web服务器。
类似于 Apache、tomcat、IIS 等服务器软件。

web.js 的发展超出了作者的最初想法，变成了构建网络应用的一个基础平台。
然后就可以在这个基础平台之上构建很多东西，比如服务器、客户端、各种各样的命令行工具等。

Node的目标就是成为一个构建快速、可伸缩的网络应用平台。

每一个Node进程构成网络应用中的一个节点。这就是 Node 的含义。

### Node 没有 Web 容器

.net平台的 ASP或者ASP.net 需要 IIS 作为服务器容器，
PHP需要搭载 Apache 或者 Nginx 作为服务器容器，
Java 的 JSP 需要 tomcat 作为服务器容器，
ruby 的 ruby on rails 需要 搭配 Apache 等作为自己的服务器容器。。。


Node，不需要服务器容器。
Node，不需要服务器容器。
Node，不需要服务器容器。

### 网络协议

关于协议详见PPT第140页。

网络之间传输数据就需要协议。
所谓的协议就是双方约定好的一些数据格式。
否则两台计算机之间如何识别对方发送过来的 0 1 数据。
再次强调，计算机很傻，计算机本身也是人造出来的，
所以说协议本身也是由我们早期的先辈们制定和开发出来的。

在 OSI（开放系统互联(Open System Interconnection)）模型中，把网络通信的工作分为了7层，它们分别是：
- HTTP、SMTP、IMAP等 应用层
- 加密/解密等        表示层
- 通信连接/维持会话  会话层
- TCP/UDP            传输层
- IP                 网络层
- 网络特有的链路接口 链路层
- 网络物理硬件       物理层

也有人将网络通信的工作分为了5层，便于我们的理解。
- 应用层（Application Layer） HTTP、SMTP
- 传输层（Transport Layer）   负责安全可靠的把数据发送到对方的计算机
- 网络层（Network Layer）     负责ip地址、Mac地址 定位网络
- 链路层（Link Layer）        跟网络层很像，也是用来将我们发送的信号进行组网
- 实体层（Physical Layer）     双绞线、光钎、电线（电力猫）、无线电波

越下面的层，越靠近硬件；
越上面的层，越靠近用户。

每一层都是为了完成一种功能，层与层之间相互协作，才能构成计算机之间正常的网络通信。

### TCP 传输层协议

TCP 是面向连接的协议，最大的特性就是在传输之前需要3次握手形成会话。

可靠性。

打开控制台 -> 在查看方式中切换到 类别 -> 程序 -> 启用或关闭Windows功能 -> 
找到 Telnet客户端 选项，打上对勾 然后选择确定即可，这样的话就开启了 Telnet 功能，
就可以在命令台使用了

### Socket

Socket 又叫做套接字，网络编程又叫做套接字编程。
而Socket 地址又称为 套接字地址，可以理解为计算机的网络地址。

假设你想和你的女神打电话，但是必须知道对方的电话号码才可以，
而我们进行网络通信也需要知道对方的 Socket 地址。

在网络通信中，采用类似方法标识Socket地址。
Socket地址最关键的两部分为（ip，port）
就是ip地址和端口号，
比如一个网络地址为 192.168.3.6:3000
那么，192.168.3.6 就是用来定位和区分计算机的
3000端口号就是用来区分不同的套接字的

### TCP 服务的事件：

#### 服务器事件

- listening：调用 server.listen() 绑定端口之后会触发
- connection：每个客户端套接字连接到服务器时触发
- close：当服务器关闭时会触发，只有手动调用 server.close() 之后会触发该事件
- error：当服务器发生异常的时候，会触发该事件

#### 连接事件

- data 当一端调用 write() 方法发送数据时，另一端就会触发 data 事件，事件回调处理函数中的参数就是 write() 发送的数据
- end 当连接中的任意一端发送了 FIN 数据时，将会触发该事件
- connect 该事件用于客户端，当套接字与服务器连接成功时会被触发
- error：当异常发生时，触发该事件
- close：当套接字完全关闭时，触发该事件


## 双向通信

## 控制台聊天室

### 先实现一个可以让服务器回答某些特定问题的功能

当客户端输入 hello 的时候，服务器响应一个 world
当客户端输入 haha 的时候，服务器响应一个 hehe
当客户端输入 你吃了吗 的时候，服务器响应一个 我吃的小豆包
当客户点输入 别的服务器无法识别的问题的时候，响应一个 你说类啥


### 通过 nodemon 实现 保存文件实时重启

1. 安装ndemon ` npm install -g nodemon `
2. 基本使用 `nodemon server.js`

只要执行了上面的命令，那么当你修改了 server.js 那么nodemon会帮你自动重启 server

### 制定协议（服务器和客户端之间数据格式的约定）

nickname


当用户来连接我们的服务器的时候，提示用户：

请输入你的昵称按回车进入：

注册昵称
如果昵称被占用：提示用户，昵称已存在，请重新输入
如果昵称没有被占用，则用户就可以进入聊天室

广播消息
当用户进入聊天室之后，
一种方式，可以直接发送消息，默认就是广播消息
消息体

私聊
当用户想向特定的某人发送消息的时候：
nickname:要说的话

需求如上：

数据格式协议如下：
注册的数据格式
{
  protocol:'signup',
  nickname:''
}

广播的数据格式
{
  protocol: 'broadcast',
  from: '',
  message: ''
}

leijun:atr you ok
私聊
{
  protocol: 'p2p',
  from: '',
  to: '',
  message: ''
}

### 实现广播消息

### 实现用户注册

### 实现点对对消息

### 作业：把今天写的代码写两遍

自己思考一下，加一个群的功能。

要考虑数据结构和数据通信格式问题。




# Node.js 第7天课程笔记

## 复习网络编程

重在思想，node只是一个用来辅助学习网络编程的工具而已。

- 什么是网络编程
- 使用 node 进行网络编程需要使用其它web服务器作为容器吗
- 什么是协议？
- 在网络编程中，为什么要有协议？制定协议有什么好处？
- 什么是 Socket？
  + ip
  + port

### net 模块的基本使用

net模块提供了一个异步网络包装器。
该模块中包含了一些方法用于创建服务器和客户端。
在使用 net 模块的时候，需要单独的 `require('net')`。

### 服务器端相关操作API

- net.createServer([options][, connectionListener])
- listening：调用 server.listen() 绑定端口之后会触发
- connection：每个客户端套接字连接到服务器时触发
- close：当服务器关闭时会触发，只有手动调用 server.close() 之后会触发该事件
- error：当服务器发生异常的时候，会触发该事件
- server.address()
- server.close([callback])
- server.getConnections(callback)
- server.listen(port[, hostname][, backlog][, callback])

#### Socket相关操作API

- socket.connect(options[, connectListener])
- socket.connect(port[, host][, connectListener])
- data 当一端调用 write() 方法发送数据时，另一端就会触发 data 事件，事件回调处理函数中的参数就是 write() 发送的数据
- end 当连接中的任意一端发送了 FIN 数据时，将会触发该事件
- connect 该事件用于客户端，当套接字与服务器连接成功时会被触发
- error：当异常发生时，触发该事件
- close：当套接字完全关闭时，触发该事件
- socket.address()
  + `{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`
- socket.remoteAddress
- socket.remotePort
- socket.setEncoding([encoding])
- socket.write(data[, encoding][, callback])

## http协议

HTTP协议就是 浏览器 和 服务器 之间通信的一个数据格式规范

在HTTP协议中，始终是以一种 一问一答 的形式在进行沟通和交流（数据交换）

服务器如果没有收到浏览器的请求消息，服务器永远不会主动的发送响应消息

浏览器不发出请求，服务器不会主动的发送响应

- 浏览器发送请求数据到服务器
- 服务器解析浏览器发送的请求数据
- 服务器响应数据到客户端浏览器

### B/S 网络架构

通常我们所说的 Web 开始就是一种 B（Browser）/S（Server） 结构开发模型

也就是 浏览器和服务器 交互模型



### 在地址栏输入网址后页面是如何呈现的？

- 输入 URL：http://www.baidu.com
- DNS 域名解析
  + 计算机无法识别域名，计算机与计算机之间要想进行通信，必须通过ip地址用来定位该计算机所在的位置
  + 在浏览器中，输入的ip地址或者域名，默认给你加了一个80端口号（对方的服务器监听的就是80端口）
  + 158.12.25.652  域名就是为了好记
  + 为了好记，所以我们的 万维网提供了 一个 域名这样的概念
  + 当你输入了 ip 地址后，浏览器会自动去 找DNS域名解析服务器，
- 建立 TCP 连接（Socket）：三次握手
- 将用户输入的地址封装成 HTTP Request 请求报文 发送到服务器
  + 浏览器将用户输入的 URL 地址根据HTTP协议 封装成了  http 请求报文（请求头+请求行+请求体）
  + 该报文说白了也就是字符串而已，最终也要被转成了二进制数据再发送到服务器
- 后台服务器接收到用户HTTP Request 请求报文
  + 后台服务器接收到 客户端发送给自己的数据（二进制数据）
    * 首先把二进制数据按照编码解析成字符，（人类可以识别的）
    * 解析成字符之后，再按照 HTTP 协议规范中定义的格式解析出来
- 后台服务器处理用户请求信息
  + 当得到用户请求报文之后，根据请求报文中的 get、port或者 URL、或者URL中的查询字符串或者 请求体中的数据
  + 根据用户的特定的请求数据做特定的处理
- 后台服务器将相应结果封装到 HTTP Response 响应报文中 发送给客户端
  + 当我们解析和处理完用户请求报文消息之后
  + 服务器开始将具体的 要发送给客户端的数据 根据 HTTP 协议规范 封装成 HTTP协议响应报文
  + 响应头、响应字段、响应体
  + 该数据说白了也是具有特定格式的字符串而已，最终这个字符串也要转换成二进制数据发送到客户端
  + 发送到客户端也是通过 Socket（ip地址、端口号） 发送到了该客户单
- 用户浏览器接收到响应后开始渲染html、css，解析和执行 JavaScript 代码
  + 当客户端解析到 服务器发送过来的 二进制数据
  + 客户端浏览器也会将 二进制数据 根据编码类型解析成 字符串
  + 然后根据 HTTP 协议，解析服务器发送过来的 响应报文
  + 然后根据响应报文中的报文内容（报文头、报文体）做具体的解析
- 当浏览器在解析的过程中遇到 一些静态资源时，会再次重复上面的步骤
 
