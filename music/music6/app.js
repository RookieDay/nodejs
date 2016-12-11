'use strict';

const http = require('http');
const config = require('./config.js');
const render = require('./common/render');
const json = require('./common/json');

const router = require('./router');

const server = http.createServer();

server.on('request', (req, res) => {
  res.render = render(res);
  res.json = json(res);

  // 转发到 路由 处理模块
  router(req, res);
});

server.listen(config.port, config.host, () => {
  console.log(`server is listening at port ${config.port}`);
});
