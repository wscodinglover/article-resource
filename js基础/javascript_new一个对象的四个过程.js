//  1. 创建空对象
var obj = {};

// 2. 设置原型链： 设置新对象的 `constructor` 属性为构造函数的名称。
// 设置新对象的 `__proto__` 属性指向构造函数的 `prototype` 对象
obj.constructor = Person;
obj.__proto__ = Person.prototype;

// 3. 改变 `this` 指向 使用新对象调用函数
// 函数中的 `this` 指向新实例对象obj
var result = Person.call(obj); // {}.构造函数

// 4. 返回值：
// 如果无返回值或者返回一个非对象值 则将新对象返回
// 如果返回值是一个新对象的话 那么直接返回该对象
if (typeof result == "object") {
  person = result;
} else {
  person = obj;
}
