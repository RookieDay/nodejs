'use strict';

const net = require('net');

const client = net.connect({ port: 3000, host: '127.0.0.1' });

// 在外部定义一个变量，用来做判断用户是否已注册的标记，如果用户没有注册，那么这个标记就是undefined
// 如果该用户已注册了，nickname 就是用户的昵称名称
let nickname;


// 当客户端连接服务器成功的时候，会触发 自己的 connect 事件
// 所以，如果想让客户端想服务器发送数据，必须在 connect 事件处理函数中发送数据
client.on('connect', () => {
  process.stdout.write('请输入用户名：');

  // 通过监听 标准输入（本身也是一个流对象） 的 data 事件，获取用户的输入
  process.stdin.on('data', (data) => {

    // 用户通过控制台输入数据敲回车，就会触发 当前 data 事件，
    // data事件处理函数会把用户输入的数据传递给回调处理函数
    // 因为用户是敲回车触发的 data  事件，所以用户输入的数据中包含了回车换行符
    // 所以我们要把该数据进行 trim() 一下，把回车换行符 去除。
    data = data.toString().trim();

    // 如果用户昵称不存在，表示用户要发送注册的数据
    if (!nickname) {

      let send = {
        protocol: 'signup',
        nickname: data
      };

      // 因为在网络中传输数据只能发送二进制数据
      // 所以我们将 json 对象转换为 json 格式的字符串
      // 然后将 json 格式字符串 通过 socket 端口 编码成二进制数据 发往我们的服务器
      return client.write(JSON.stringify(send));

    }

    // 我们约定好，如果用户输入不包含冒号，那么表示用户要发送广播数据
    // 如果用户发送的数据中有冒号，就表示用户要发送 点对点 数据
    let arr = data.split(':');

    let send = {};

    // 用户要发送 点对点数据
    if (arr.length == 2) {
      send = {
        protocol: 'p2p',
        from: nickname,
        to: arr[0],
        message: arr[1]
      };
    } else if (arr.length == 1) { // 用户要发送广播数据
      send = {
        protocol: 'broadcast',
        from: nickname,
        message: data
      };
    }

    client.write(JSON.stringify(send));
  });
});

// 当服务器通过 socket 调用了 write 方法之后，就会触发自己的 data 事件
client.on('data', (data) => {
  try {
    let signal = JSON.parse(data);

    let protocol = signal.protocol;

    if (protocol === 'signup') {
      switch (signal.code) {
        case '1000':
          nickname = signal.nickname;
          console.log('恭喜，注册成功了');
          break;
        case '1001':
          console.log('不好一次，用户名已存在');
          break;
        case '1002':
          console.log('用户名非法，请重新输入：');
          break;
      }
    } else if (protocol === 'broadcast') {
      console.log(`${signal.nickname}说：${signal.message}`);
    } else if (protocol === 'p2p') {
      let code = signal.code;

      // 没有code 的情况下就是消息
      if (!code) {
        console.log(`${signal.from}对你说：${signal.message}`);
      } else {
        console.log('该用户不存在');
      }
    }
  } catch (e) {
    console.log('服务器发送的数据格式有异常');
  }
});

client.on('end', () => {
  console.log('disconnected from server');
});
