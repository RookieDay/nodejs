'use strict';
const path = require('path');
module.exports = {
    port: 3000,
    host: '127.0.0.1',
    templateFilePath: path.join(__dirname, 'views'),
    musicPath: __dirname
}