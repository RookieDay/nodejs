var fs = require('fs');

// 读取该文件

var begin = +new Date();

fs.readFile('./喜欢你.lrc', function(err, data) {
  if (err) {
    throw err; // throw 之后，程序就会结束退出
  }

  // 文件读取。默认读取的都是二进制数据
  // 要想解析这个二进制数据，直接调用 toString() 方法即可

  data = data.toString();

  // 将歌词文件中的结果，按照换行分解成一个数组
  var lines = data.split('\n');

  var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;

  lines.forEach(function(line, index) {

    var maches = regex.exec(line);

    if (maches) {
      var m = maches[1];
      var s = maches[2];
      var ms = maches[3];
      var content = maches[4];

      var offset = +new Date() - begin;

      // 计算时间
      var time = parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms) - offset;

      console.log(time);

      setTimeout(function() {
        console.log(content);
      }, time);
    }

  });

});
