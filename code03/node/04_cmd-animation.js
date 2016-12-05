var frames = [];

frames.push(`
╭~~~╮
(o^.^o)
`);

frames.push(`
╭~~~╮
(o~.~o)
`);

frames.push(`
╭~~~╮
(o@.@o) 
`);

frames.push(`
╭ ﹌╮
(o'.'o)
`);

// frames.push(`
//  ╭%╮ ╭'''╮ 
//  (@^o^@) (⌒:⌒) 
//  (~):(~) (~)v(~) 
// `);

var fps = 10;

var index = 0;

// node clear cmd 一种方法

// var lines = process.stdout.getWindowSize()[1];
// for(var i = 0; i < lines; i++) {
//     console.log('\r\n');
// }

// setInterval 每执行一次，就相当于走了一帧
setInterval(function() {
    // 清屏 node clear cmd
    process.stdout.write('\u001b[2J\u001b[0;0H');

    // 输出
    process.stdout.write(frames[index]);

    index++;
    if (index >= frames.length) {
        index = 0;
    }

}, 1000 / fps);