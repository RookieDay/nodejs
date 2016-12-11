'use strict'
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music'
})
connection.connect();
connection.query('select * from music', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    console.log(fields)
})
connection.end();