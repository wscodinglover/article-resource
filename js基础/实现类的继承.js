function Parent(name) {
  this.parent = name;
}
Parent.prototype.say = function () {
  console.log(`${this.parent}: 你打篮球的样⼦像kunkun`);
};
function Child(name, parent) {
  // 将⽗类的构造函数绑定在⼦类上
  Parent.call(this, parent);
  this.child = name;
}
/**
  1. 这⼀步不⽤Child.prototype =Parent.prototype的原因是怕共享内存，修改⽗类原型对象就会影响⼦类
  2. 不⽤Child.prototype = new Parent()的原因是会调⽤2次⽗类的构造⽅法（另⼀次是call），会存在⼀份多余的⽗类实例属性
  3. Object.create是创建了⽗类原型的副本，与⽗类原型完全隔离
  */
Child.prototype = Object.create(Parent.prototype);
Child.prototype.say = function () {
  console.log(`${this.parent}好，我是练习时⻓两年半的${this.child}`);
};
// 注意记得把⼦类的构造指向⼦类本身
Child.prototype.constructor = Child;
var parent = new Parent("father");
parent.say(); // father: 你打篮球的样⼦像kunkun
var child = new Child("cxk", "father");
child.say(); // father好，我是练习时⻓两年半的cxk
