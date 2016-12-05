// console.log('cal.js文件模块被加载了');
// var foo = 'baz';

// // exports.foo = foo;

// global.foo = foo;

exports.add = function(x, y) {
  return parseFloat(x) + parseFloat(y);
};

exports.substract = function(x, y) {
  return parseFloat(x) - parseFloat(y);
};

exports.multiply = function(x, y) {
  return parseFloat(x) * parseFloat(y);
};

exports.divide = function(x, y) {
  return parseFloat(x) / parseFloat(y);
};
