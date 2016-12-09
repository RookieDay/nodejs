'use strict';

const net = require('net');

let clients = [];

// createServer 方法的第一个参数可以传递一个函数，默认监听 connection 事件
// 只要有 客户端连接上来，就会触发 连接回调处理函数
// 每一个函数中自动分配了一个与该客户端通信的 socket电话机
// 假如：有10个客户端连接到了我们的服务器
// 也就意味着 connection 回调处理函数被触发了 10次
// 而每个回调函数中的 socket 对象都是不一样的
  // 如果不采用 事件驱动的方式
  // 服务器端的socket要提前创建好（创建多少呢？）
  // 就意味着你要写这样的代码
  // 如果张三要连接服务器了。我们给它一个跟他通信的socket
const server = net.createServer((socket) => {

  // 同一个客户端连接进来之后，只会触发一次当前的回调函数
  // 所以 socket 对象 只会被push进一次
  clients.push(socket);

  console.log(socket.remotePort);

  // 监听和客户端通信的Socket的error事件
  // 例如：当客户端强制关闭的时候就会导致服务器异常挂掉
  // 只要 error 事件被触发，就意味着 当前这个 Socket 有异常对象了
  // 为了解决 客户端异常退出导致 服务器挂掉。所以我们一定要监听这个 error 事件
  socket.on('error', (err) => {
    console.log('有客户端异常退出了');
  });

  // 当客户端给服务器发送了消息的时候
  // 服务器上的这个与 客户端通信的 socket 就会触发一个 data 事件
  // 而该 data 事件中的第一个参数回调函数中的第一个参数接收到的也是 二进制数据
  socket.on('data',(data) => {
    console.log(data.toString());
  });

  // 服务器给当前连接上来的这个客户端发送一个 hello 数据消息
  // 默认 write 方法的第二个参数就是用来指定编码的
  // 当编码不指定的时候，默认就是 utf8
  // 每一个socket 里面都保存了客户端所在的ip地址和端口号
  // 所以在调用 write 的时候，会先根据该 socket 对象中的 ip地址和 端口号 定位过去，在发送数据
  // socket.write('hello');


  clients.forEach((client) => {
    client.write('hello');
  });

}).on('error', (err) => {
  throw new Error('端口号被占用');
});

// ip地址用来定位一台计算机的，而端口号是用来定义一个具体的应用程序的
// 当 server.listen 方法的第一个参数端口号为0的时候,node自动帮我们随机分配一个可用的没有被占用的端口号
// 要想获取这个随机端口号,可以通过 server.address() 方法里面的属性 port 获取
// server.listen(0,() => {
//   console.log(`server is runnig at port ${server.address().port}`);
// });

let port = 3000;

server.listen(port, () => {
  console.log(`server is runnig at port ${port}`);
});
