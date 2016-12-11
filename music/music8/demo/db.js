'use strict';

var mysql = require('mysql');

// 创建一个连接，，得到一个连接实例
var connection = mysql.createConnection({
  host: 'localhost',  // 数据库地址
  user: 'root',  // 连接数据库的用户名
  password: 'root',
  database: 'music'
});

// 执行连接
connection.connect();

// 通过改连接操作数据库
// err 表示查询的时候可能出错的对象
// rows 表示 查询结果
// 查询所有数据
// connection.query('SELECT * FROM music', function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 查询特定字段
// connection.query('SELECT title,time FROM music', function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 根据条件查询数据
// connection.query('SELECT title,time FROM music WHERE id in(1,2)', function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 插入数据, VALUES 中的值一定要和 字段中名字一致
// connection.query('INSERT INTO music(title,time,singer,src) VALUES("今天","05:21","刘德华","/files/今天 - 刘德华.mp3")', function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 更新数据
// 当 update  的时候，如果不指定条件，默认修改全部
// let updateSql = `
// UPDATE music
//   SET title="哈哈"
// `;
// connection.query(updateSql, function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 根据条件修改数据
// 当 update  的时候，如果不指定条件，默认修改全部
// let updateSql = `
// UPDATE music
//   SET title="呵呵"
//   WHERE id =4
// `;
// connection.query(updateSql, function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 删除数据
// 不指定条件的情况下默认删除所有
// let deleteSql = `
// DELETE from music
// `;
// connection.query(deleteSql, function(err, rows) {
//   if (err) throw err;
//   console.log(rows);
// });

// 根据条件删除数据
let deleteSql = `
DELETE from music
WHERE id=6
`;
connection.query(deleteSql, function(err, rows) {
  if (err) throw err;
  console.log(rows);
});

// 关闭连接
connection.end();
