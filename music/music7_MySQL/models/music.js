'use strict'
const db = require('./db');

function Music(music) {
    this.title = music.title;
    this.time = music.time;
    this.singer = music.singer;
    this.src = music.src;
}

Music.getAll = function(callback) {
    db.query('select * from music', (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    })
}
Music.prototype.save = function(callback) {
    db.query(`
    insert into music 
    values(null,"${this.title}","${this.time}","${this.singer}","${this.src}")`, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    })
}
module.exports = Music;