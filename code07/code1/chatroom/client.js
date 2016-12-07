'use strict';

const net = require('net');

const client = net.connect({ port: 3000, host: '192.168.12.21' });

let nickname;

client.on('connect', () => {
  process.stdout.write('请输入用户名：');
  process.stdin.on('data', (data) => {
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

    let send = {
      protocol: 'broadcast',
      from: nickname,
      message: data
    };

    client.write(JSON.stringify(send));

  });
});

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
    }

  } catch (e) {
    console.log('服务器发送的数据格式有异常');
  }
});

client.on('end', () => {
  console.log('disconnected from server');
});
