// 传入参数 杀掉进程 
var args = process.argv.slice(2);
var pid = args[0];
process.kill(pid);