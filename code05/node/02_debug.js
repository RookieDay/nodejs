var foo = 'bar';

console.log('1');

process.nextTick(function() {
    console.log('2');
});

console.log('3');