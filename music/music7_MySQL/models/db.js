'use strict'
exports.query = function(sql, callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'music'
    })
    connection.connect();
    connection.query(sql, callback)
    connection.end();
}