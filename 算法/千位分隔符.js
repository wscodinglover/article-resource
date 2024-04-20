// 保留三位⼩数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = integer.replace(/\d(?=(\d{3})+$)/g, "$&,");
  return integer + "." + (decimal ? decimal : "");
}
// 正则表达式(运⽤了正则的前向声明和反前向声明):
function parseToMoney(str) {
  // 仅仅对位置进⾏匹配
  let re = /(?=(?!\b)(\d{3})+$)/g;
  return str.replace(re, ",");
}
