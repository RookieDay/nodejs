log('hello');
log('world');

// console.log 本身就是封装的下面的这段代码
function log(msg) {
  process.stdout.write(msg+'\n');
}
