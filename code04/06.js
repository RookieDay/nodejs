var fs = require('fs');
var begin = +new Date();
fs.readFile('./倩女幽魂.lrc', function(err, data) {
    if (err) {
        throw err;
    }
    // console.log(data.toString());
    // 按照换行符分解
    data = data.toString();
    var lines = data.split('\n');
    //  /\[00\:08\.03\]人生路 美梦似路长/
    var regex = /\[(\d{2})\:(\d{2}).(\d{2})\](.+)/;

    lines.forEach(function(line, index) {
        // console.log(line);
        var matches = regex.exec(line);
        // console.log(matches)
        if (matches) {
            var m = matches[1];
            var s = matches[2];
            var ms = matches[3];
            var content = matches[4];
            var offset = +new Date() - begin;
            var time = parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms) - offset;
            // 定时器的时间 需要减去代码执行 或者读取文件的时间
            setTimeout(function() {
                console.log(content)
            }, time)
        }
    });
});