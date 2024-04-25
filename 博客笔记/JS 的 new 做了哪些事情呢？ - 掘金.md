我们在日常的开发中经常会用到 `new` 操作符，来看看它到底做了什么事情；了解完它的原理之后接着来自己实现一下 `new` 的功能吧。

### JavaScript 对象的创建

在 JavaScript 中，创建对象的方式有两种：**对象字面量和使用 `new` 表达式**。

对象字面量是一种灵活方便的书写方式，如：

```js
let obj = { a: 1, b: 2, }
```

不过对象字面量写法的缺点是，每创建一个新的对象都需要写出完整的定义语句，不便于创建大量相同类型的对象，不利于使用继承等高级特性。

而 `new` 表达式是配合构造函数使用的，**通过 `new` 一个构造函数去继承构造函数的属性**。

### `new` 做了哪些事情？

**`new` 运算符创建一个用户定义的对象数据类型的实例或者具有构造函数内置对象的实例**。

它进行的操作：

-   首先创建一个新的空对象
-   然后将空对象的 `__proto__` 指向构造函数的原型
    -   它将新生成的对象的 `__proto__` 属性赋值为构造函数的 `prototype` 属性，使得通过构造函数创建的所有对象可以共享相同的原型。
    -   这意味着同一个构造函数创建的所有对象都继承自一个相同的对象，因此它们都是同一个类的对象。
-   改变 `this` 的指向，指向空对象
-   对构造函数的返回值做判断，然后返回对应的值
    -   一般是返回第一步创建的空对象；
    -   但是当 **构造函数有返回值时** 则需要做判断再返回对应的值，是 **对象类型则返回该对象**，是 **原始类型则返回第一步创建的空对象**。

### `new` 的实现

`new` 的实现很简单，就是一步一步把它要做的操作给实现出来：

```js
function myNew(Con, ...args) { // 创建一个新的空对象 let obj = {}; // 将这个空对象的__proto__指向构造函数的原型 // obj.__proto__ = Con.prototype; Object.setPrototypeOf(obj, Con.prototype); // 将this指向空对象 let res = Con.apply(obj, args); // 对构造函数返回值做判断，然后返回对应的值 return res instanceof Object ? res : obj; }
```

### 实现的验证

```js
// 构造函数Person function Person(name) { this.name = name; } let per = myNew(Person, '你好，new'); console.log(per); // {name: "你好，new"} console.log(per.constructor === Person); // true console.log(per.__proto__ === Person.prototype); // true
```

一般情况下构造函数是没有返回值的，但是作为函数，是可以有返回值的。

```js
function Person(name) { this.name = name; return { age: 22 } } let per = myNew(Person, '你好，new'); // 当构造函数返回对象类型的数据时，会直接返回这个数据， new 操作符无效 console.log(per); // {age: 22}
```

```js
function Person(name) { this.name = name; return '十二点的程序员' } let per = myNew(Person, '你好，new'); // 而当构造函数返回基础类型的数据，则会被忽略 console.log(per); // {name: "你好，new"}
```