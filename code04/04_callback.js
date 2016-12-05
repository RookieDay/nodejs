function eat(doSomething) {
  process.nextTick(function() {
    console.log('开始吃饭');
    console.log('吃完了'); // 程序执行到这里才意味着 吃完饭了
    // 这里才是吃完饭之后要做的事儿，代码应该写在下面
    doSomething && doSomething(); // 把用户传进来的这个参数当成一个函数来调用 我们把该函数称之为一个任务
  });
}

function callPhone() {
  console.log('打电话');
}

// 当前吃饭这件事儿并没有阻塞下面的继续打电话这个任务
// eat();

// 我想吃完饭后干嘛呢？  不确定
// 将 sing 函数作为一个参数传递给 eat 函数
// 一般在 eat 函数执行完毕 之后 才会执行 sing  函数
// eat(sing);


eat(function () {
  console.log('做其它事儿');
});

function sing() {
  console.log('唱歌');
}

function sleep() {
  console.log('睡觉');
}

function hitSomebody(name) {
  console.log('打：' + name);
}

callPhone();
