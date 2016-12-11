'use strict';

var mysql = require('mysql');

exports.query = function(sql, callback) {
  var connection = mysql.createConnection({
    host: 'localhost', // 数据库地址
    user: 'root', // 连接数据库的用户名
    password: 'root',
    database: 'music'
  });

  connection.connect();

  connection.query(sql, callback);

  connection.end();
}
