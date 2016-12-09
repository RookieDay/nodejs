'use strict';

// 开发基于 HTTP 的服务器

const http = require('http');

// 1. 创建 http 服务器

const server = http.createServer();

// 2. 监听 客户端的 request 请求事件

// 只要有客户端连接进来了，就会触发服务器的 request 请求事件
// 如果不在该请求处理中做具体的响应，那么客户端就会一直保持挂起的状态登陆你的响应
// 服务器在拿到客户端的请求报文之后，会将 客户端 的请求报文解析为一个对象叫作 request
// request 就是一个 可读流
// ，传递给request 请求处理函数的第一个参数
// 服务器把对于和该客户端进行通信的 Socket 封装成了一个 响应对象 Response
// 把响应对象 Response 作为第二个参数传递给了 request 请求处理函数中的 第二个参数
// response 就是一个 可写流
server.on('request',(request,response) => {
  console.log('有客户端请求进来了，客户端的请求路径是：' + request.url);
  // 可以使用 write 方法向客户端发送数据
  response.write('hello');

  // 当用户访问 / 的时候，给用户响应一个 <h1>welcome out website</h1>
  // 当用户访问 /about 的时候，给用户响应一个 <h1>register site</h1>
  // // 当用户访问 /login 的时候，给用户响应一个 登陆页面（login.html）

  // write 方法可以被调用多次，（在一次请求和响应处理过程中）
  response.write('world');

  // 使用了 write 之后，一定要记住 end 用来结束响应,否则客户端会一直以为你的数据还没有发送完毕
  
  response.end();

  // 在一次请求和响应过程当中，只要调用了  end 就不能再继续 write 了
  // 只要发生了这个错误：Error: write after end
  // 就说明你是在一次请求和响应处理过程中已经结束了响应，但是又去 向客户端发送数据
  // 这个时候就会报错
  // response.write('end');


  // 还有一种简写的方式
  // end 方法不仅可以用来结束响应，有可以用来传递第二个参数（要发送到数据）
  // 传递了参数标识  response.write('hello world')  response.end()
  // 更加简答 
  // 多次end 是不管用的
  // response.end('hello world');
});

// 3. 开启监听
server.listen(3000,'127.0.0.1',() => {
  console.log('server is listening at port 3000');
});
