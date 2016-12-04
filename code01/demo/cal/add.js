define(function(require, exports, module) {

  // exports = function (x,y) {
    
  // };

  var foo = 'baz';

  // 通过 module.exports 向外暴露接口，外部通过 require 就可以得到 module.exports
  module.exports = function(x, y) {
    return x + y;
  };
});
  
