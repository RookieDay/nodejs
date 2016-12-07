'use strict';
const fs = require('fs');
const path = require('path');

let sourcePath = ' ';
let distPath = ' ';
let totalSize = fs.statSync(sourcePath).size;

let readStream = fs.createReadStream(sourcePath);
let writeStream = fs.createWriteStream(distPath);

let curSize = 0;

readStream.on('data', (chunk) => {
    curSize += chunk;
    let percentage = curSize / totalSize * 100;
    console.log(`Copy:${percentage}`);
    writeStream.write(chunk);
})

readStream.on('end', (on) => {
    writeStream.close();
})