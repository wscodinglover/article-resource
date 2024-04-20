let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
  name: "姓名",
  age: 18,
};
render(template, data); // 我是姓名，年龄18，性别undefined
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) {
    // 判断模板⾥是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板⾥第⼀个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第⼀个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

// 驼峰名转换
var s1 = "get-element-by-id";
// 转化为 getElementById
var f = function (s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};
