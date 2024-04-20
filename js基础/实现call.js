// call做了什么:
// 将函数设为对象的属性
// 执⾏&删除这个函数
// 指定this到函数并传⼊给定参数执⾏函数
// 如果不传⼊参数，默认指向为 window
// 模拟 call bar.mycall(null);
//实现⼀个call⽅法：
Function.prototype.myCall = function (context) {
  //此处没有考虑context⾮object情况
  context.fn = this;
  let args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  context.fn(...args);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
