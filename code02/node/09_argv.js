var cal = require('./cal.js');

var args = process.argv.slice(2);

var x = args[0];
var opt = args[1];
var y = args[2];

var result = 0;
switch (opt) {
  case '+':
    result = cal.add(x, y);
    break;

  case '-':
    result = cal.substract(x, y);
    break;

  case '*':
    result = cal.multiply(x, y);
    break;

  case '/':
    result = cal.divide(x, y);
    break;
}

console.log(result);
