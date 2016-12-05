/**
 * 模块的基本加载规则
 */

// require 优先从缓存中加载
// require('./06_exports.js');
// require('./06_exports.js');

// 以 ./ 或者 ../ 开头的 相对路径 文件模块，相对于 当前文件模块所属的目录
// require('./06_exports.js');
// require('./a/a.js');

// 在 Windows 中， / 标识 相对于当前的磁盘根目录
// 在 Windows 中，最好不要使用这种方式
// 在 Linux 上，根本就没有盘符的概念
// require('/a.js');

require('./06_exports');

