var add = require('./add');
var substract = require('./substract');

// exports.add = add;
// exports.substract = substract;

var _ = require('underscore');

module.exports = {
  add: add,
  substract: substract,
  random: function () {
    return _.random(10,99);
  }
};
