'use strict';

var template = require('art-template');

var data = {
    foo: 'bar'
};

var tmpStr = `
<h1>{{foo}}</h1>
`;

var htmlStr = template(__dirname + '/a', data);

console.log(htmlStr);
console.log(tmpStr)