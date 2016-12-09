'use strict';

const net = require('net');

// 1. 客户端连接服务器
// node 会自动给客户端分配一个端口号用来与服务器进行通信
// connet 中的 3000 端口号指定的是服务器的端口号：用来定位服务器上服务器软件的具体位置的
// net.connect 得到的
const client = net.connect(3000,'127.0.0.1');

// 当客户端连接服务器成功之后会触发 connect 事件
client.on('connect',() => {
  console.log('客户端连接服务器成功了');
});

// socket 是一个可度读可写的流
// 因为网络中传递的都是二进制数据 （0或者1）
// 所以说，当我们接收到服务器发送给我们的消息的时候
// 将该二进制数据通过编码转换成我们人类可以识别的字符
client.on('data',(data) => {
  data = data.toString();

  console.log(data);

  // 当客户端接收到服务器发送的消息的时候，给服务器响应一个 world
  // 当客户端在调用 write 方法的时候，会定位到 ip地址（127.0.0.1）和端口号（3000）
  client.write('world');

});
