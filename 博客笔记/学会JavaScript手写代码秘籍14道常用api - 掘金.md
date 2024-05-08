**愿意花更多的时间、倾注更多的精力来跟大家一起努力。**

## 目录

-   apply
-   async await
-   bind
-   call
-   concurrent-request
-   debounce
-   deep-copy
-   event-bus
-   继承
-   instanceof
-   new
-   object-create
-   promise
-   throttle
-   参与

## apply

-   为函数绑定执行上下文
-   原理：将函数设置为执行上下文的一个方法，然后调用执行上下文的方法
-   tx 指定的函数执行上下文
-   args 剩余参数组成的数组
-   any 返回函数的执行结果

```js
// 为函数绑定执行上下文 // 原理：将函数设置为执行上下文的一个方法，然后调用执行上下文的方法 // ctx 指定的函数执行上下文 // args 剩余参数组成的数组 // any 返回函数的执行结果 Function.prototype.myApply = function (ctx, args) { // fn.myApply(ctx, [arg1, arg2]) // this是正在执行的函数 const fn = this // 保证 ctx[key] 的唯一性，避免和用户设置的 context[key] 冲突 const key = Symbol() // 将执行函数设置到指定的上下文对象上 ctx[key] = fn // 执行函数 const res = ctx[key](...args) // 删除上下文上的 fn 方法 delete ctx[key] // 返回函数的执行结果 return res }
```

## async await

-   async await 是 Generator 的语法糖，其本质是 Generator + 自动执行器
-   Generator 函数
-   执行 generator 函数，拿到 yield 表达式的执行结果 => { next: () => void }
-   自动执行器
-   { value: any, done: boolean }
-   说明 yield 后面跟的是 Promise 实例

```js
// async await 是 Generator 的语法糖，其本质是 Generator + 自动执行器 // Generator 函数 module.exports = function asyncAwait(generatorFn) { // 执行 generator 函数，拿到 yield 表达式的执行结果 => { next: () => void } const yieldExpRet = generatorFn() // 自动执行器 function autoActuator() { // { value: any, done: boolean } const ret = yieldExpRet.next() if (!ret.done) { if (object.prototype.toString.call(ret?.value?.then) === '[object Function]') { // 说明 yield 后面跟的是 Promise 实例 ret.value.then(() => { autoActuator() }) } else { // 同步 autoActuator() } } } autoActuator() }
```

## bind

-   为函数绑定执行上下文
-   原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法
-   ctx 指定的函数执行上下文
-   args 剩余参数组成的数组
-   fn.myBind(ctx, \[arg1, arg2\])
-   this是正在执行的函数
-   保证 ctx\[key\] 的唯一性，避免和用户设置的 context\[key\] 冲突
-   将执行函数设置到指定的上下文对象上
-   返回一个可执行函数
-   bind 方法支持预设一部分参数，剩下的参数通过返回的函数设置，具有柯里化的作用
-   执行函数

```js
// 为函数绑定执行上下文 // 原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法 // ctx 指定的函数执行上下文 // args 剩余参数组成的数组 Function.prototype.myBind = function (ctx, ...args) { // fn.myBind(ctx, [arg1, arg2]) // this是正在执行的函数 const fn = this // 保证 ctx[key] 的唯一性，避免和用户设置的 context[key] 冲突 const key = Symbol() // 将执行函数设置到指定的上下文对象上 ctx[key] = fn // 返回一个可执行函数 // bind 方法支持预设一部分参数，剩下的参数通过返回的函数设置，具有柯里化的作用 return function(...otherArgs) { // 执行函数 return ctx[key](...args, ...otherArgs) } }
```

## call

-   为函数绑定指定上下文
-   原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法
-   ctx 指定的函数执行上下文
-   args 剩余参数组成的数组
-   any 返回函数的执行结果
-   fn.myCall(ctx, arg1, arg2)
-   this是正在执行的函数
-   保证 ctx\[key\] 的唯一性，避免和用户设置的 context\[key\] 冲突
-   将执行函数设置到指定的上下文对象上
-   执行函数
-   删除上下文上的fn方法
-   返回函数的执行结果

```js
// 为函数绑定指定上下文 // 原理：将函数设置为执行上下文的一个方法，然后调用执行上下文上的方法 // ctx 指定的函数执行上下文 // args 剩余参数组成的数组 // any 返回函数的执行结果 Function.prototype.myCall = function (ctx, ...args) { // fn.myCall(ctx, arg1, arg2) // this是正在执行的函数 const fn = this // 保证 ctx[key] 的唯一性，避免和用户设置的 context[key] 冲突 const key = Symbol() // 将执行函数设置到指定的上下文对象上 ctx[key] = fn // 执行函数 const res = ctx[key](...args) // 删除上下文上的fn方法 delete ctx[key] // 返回函数的执行结果 return res }
```

## concurrent-request

-   并发请求，控制请求并发数
-   taskQueues 一个个请求任务组成的数组
-   concurrentNum 请求的并发数
-   存放所有任务的执行结果
-   开始先发送指定数量的并发请求
-   当每个请求完成后再递归的调用自身，发送任务队列的下一个请求
-   递归终止条件(任务队列为空)
-   从任务队列中弹出一个任务
-   执行任务
-   当任务完成后递归调用 req, 发送队列中的下一个请求
-   并将任务结果 push 进结果数组中

```js
// 并发请求，控制请求并发数 // taskQueues 一个个请求任务组成的数组 // concurrentNum 请求的并发数 module.exports = function concurrentRequest(taskQueues = [], concurrentNum = 1) { return new Promise(resolve => { // 存放所有任务的执行结果 const taskRet = [] // 开始先发送指定数量的并发请求 while (concurrentNum > 0) { req() concurrentNum-- } // 当每个请求完成后再递归的调用自身，发送任务队列的下一个请求 function req() { // 递归终止条件(任务队列为空) if (!taskQueues.length) return Promise.allSettled(taskRet).then(res => { resolve(res) }) // 从任务队列中弹出一个任务 const task = taskQueues.shift() // 执行任务 const ret = task() // 当任务完成后递归调用 req, 发送队列中的下一个请求 res.then(() => { req() }) // 并将任务结果 push 进结果数组中 taskRet.push(ret) } }) }
```

## debounce

-   防抖
-   原理：事件被触发 wait 毫秒后执行回调fn, 如果在wait期间再次触发事件，则重新计时
-   fn 事件触发后的回调函数
-   wait 延迟时间，wait 毫秒后执行fn
-   返回经过包装后的事件处理函数
-   定时器，这里用到了闭包
-   返回经过包装后的事件处理函数
-   如果 timer 为不为空，则说明在 wait 时间内已经触发过该事件了，而且事件处理函数仍未被调用
-   说明在wait事件内事件被重复触发了，则需要进行防抖处理，即清除之前的定时器，这样上一次事件触发后的回调就不会被执行
-   定时器也会重新设置
-   通过定时器来实现事件触发后在 wait 毫秒后执行事件处理函数
-   需要给回调绑定上下文this，即触发事件的目标对象

```js
// 防抖 // 原理：事件被触发 wait 毫秒后执行回调fn, 如果在wait期间再次触发事件，则重新计时 // fn 事件触发后的回调函数 // wait 延迟时间，wait 毫秒后执行fn // 返回经过包装后的事件处理函数 function debounce(fn, wait = 50) { // 定时器，这里用到了闭包 let timer = null // 返回经过包装后的事件处理函数 return function(...args) { // 如果 timer 为不为空，则说明在 wait 时间内已经触发过该事件了，而且事件处理函数仍未被调用 // 说明在wait事件内事件被重复触发了，则需要进行防抖处理，即清除之前的定时器，这样上一次事件触发后的回调就不会被执行 // 定时器也会重新设置 if (timer) { clearTimeout(timer) } // 通过定时器来实现事件触发后在 wait 毫秒后执行事件处理函数 timer = setTimeout(() => { // 需要给回调绑定上下文this，即触发事件的目标对象 fn.apply(this, args) timer = null }, wait) } }
```

## deep-copy

-   深拷贝
-   src 原数据
-   返回拷贝后的数据
-   拷贝原始值，直接返回原始值本身
-   解决循环引用的问题
-   拷贝数组
-   拷贝 Map 对象
-   拷贝函数
-   拷贝对象
-   判断数据是否为原始值类型(Number, Boolean，String，Symbol ，BigInt ，Null ，Undefined)
-   Number,Boolean,String,Symbol,BigInt,Null,Undefined,Object,Array,Function,Date...

```js
// 深拷贝 // src 原数据 // 返回拷贝后的数据 module.exports = function deepCopy(src, cache = new WeakMap()) { // 拷贝原始值，直接返回原始值本身 if (isPrimitiveType(src)) return src // 解决循环引用的问题 if (cache.has(src)) return src cache.set(src, true) // 拷贝数组 if (isArray(src)) { const ret = [] for (let i = 0, len = src.length; i < len; i++) { ret.push(deepCopy(src[i], cache)) } return ret } // 拷贝 Map 对象 if (isMap(src)) { const ret = new Map() src.forEach((value, key) => { ret.set(key, deepCopy(value, cache)) }) return ret } // 拷贝函数 if (isFunction(src)) { copyFunction(src) } // 拷贝对象 if (isObject(src)) { // 获取对象上的所有key const keys = [...Object.keys(src), ...Object.getOwnPropertySymbols(src)] const ret = {} // 遍历所有的key，递归调用 deepCopy 拷贝 obj[key] 的值 keys.forEach(item => { ret[item] = deepCopy(src[item], cache) }) // 返回拷贝后的对象 return ret } } // 判断数据是否为原始值类型(Number, Boolean，String，Symbol ，BigInt ，Null ，Undefined) function isPrimitiveType(data) { const primitiveType = ['Number', 'Boolean', 'String', 'Symbol', 'BigInt', 'Null', 'Undefined'] return primitiveType.includes(getDataType(data)) } // 判断数据是否为Object类型 function isObject(data) { return getDataType(data) === 'Object' } // 判断数据是否为函数 function isFunction(data) { return getDataType(data) === 'Function' } // 判断数据是否为数组 function isArray(data) { return getDataType(data) === 'Array' } // 判断数据是否为Map function isMap(data) { return getDataType(data) === 'Map' } // 获取数据类型 // Number,Boolean,String,Symbol,BigInt,Null,Undefined,Object,Array,Function,Date... function getDataType(data) { return Object.prototype.toString.apply(data).slice(8, -1) } // 拷贝函数 function copyFunction(src) { const fnName = src.name let srcStr = src.toString() // 匹配function fnName, 比如 function fnName() {} const fnDecExp = new RegExp(`function (${fnName})?`) // 切除匹配内容，srcStr = (xxx) {} 或 (xxx) => {} srcStr = srcStr.replace(fnDecExp, '') // 匹配函数参数 const argsExg = /\((.*)\)/ let args = argsExg.exec(srcStr) // 函数体 const fnBody = srcStr.replace(argsExg, '').trim() // { return 'test' } => return 'test' const fnBodyCode = /^{(.*)}$/.exec(fnBody) // 得到了函数的名称，参数，函数体，重新声明函数 return new Function(...args[1].split(','), fnBodyCode[1]) }
```

## event-bus

-   Event bus
-   发布订阅设计模式的应用，node.js 的基础模块，也是前端组件通信的一种手段，比如Vue的$on和$emit
-   以事件名为key，事件处理函数组成的数组为value
-   监听事件
-   eventName 事件名
-   cb 事件处理函数

```js
// Event bus // 发布订阅设计模式的应用，node.js 的基础模块，也是前端组件通信的一种手段，比如Vue的$on和$emit function EventBus() { // 以事件名为key，事件处理函数组成的数组为value this.events = {} } module.exports = EventBus // 监听事件 // eventName 事件名 // cb 事件处理函数 EventBus.prototype.$on = function(eventName, cb) { if (!Array.isArray(cb)) { cb = [cb] } this.events[eventName] = (this.events[eventName] || []).concat(cb) } EventBus.prototype.$emit = function(eventName, ...args) { this.events[eventName].foEach(fn => { fn.apply(this, args) }) }
```

## 继承

-   JavaScript 的继承方式有很多，比如简单的基于 Object.create 实现的继承，每种方式或多或少都有些缺陷
-   这种缺陷是语言层面导致的，避免不了，即使是 class 语法（糖）。
-   组合式继承，class 语法糖的本质
-   在this上继承父类的属性
-   继承父类的方法
-   恢复子类的构造函数，上面一行会将 Child.prototype.constructor 改为 Parent.prototype.constructor

```js
// JavaScript 的继承方式有很多，比如简单的基于 Object.create 实现的继承，每种方式或多或少都有些缺陷， // 这种缺陷是语言层面导致的，避免不了，即使是 class 语法（糖）。 // 组合式继承，class 语法糖的本质 function Parent(...args) { this.name = 'Parent name' this.args = args } Parent.prototype.parentFn = function() { console.log('name = ', this.name) console.log('args = ', this.args) } function Chid(args1,args2) { // 在this上继承父类的属性 Parent.call(this, args1, args2) this.childName = 'child name' } // 继承父类的方法 Child.prototype = Object.create(Parent.prototype) // 恢复子类的构造函数，上面一行会将 Child.prototype.constructor 改为 Parent.prototype.constructor Child.prototype.constructor = Child module.exports = Child
```

## instanceof

-   instanceof运算符
-   定义：判断对象是否属于某个构造函数的实例
-   原理：判断构造函数的原型对象是否出现在对象的原型链上

```js
// instanceof运算符 // 定义：判断对象是否属于某个构造函数的实例 // 原理：判断构造函数的原型对象是否出现在对象的原型链上 module.exports = function customINstanceof (ins, constructor) { const proto = Object.getPrototypeOf(ins) if (proto === constructor.prototype) return true if (!proto) return false return customINstanceof(proto, constructor) }
```

## new

-   new 运算符
-   作用：负责实例化一个类（构造函数）
-   1.创建一个构造函数原型对象为原型的对象
-   2.以第一步的对象为上下文执行构造函数
-   3.返回值，如果函数有返回值，则返回函数的返回值，否则返回第一步创建的对象。

```js
// new 运算符 // 作用：负责实例化一个类（构造函数） // 原理： // 1.创建一个构造函数原型对象为原型的对象 // 2.以第一步的对象为上下文执行构造函数 // 3.返回值，如果函数有返回值，则返回函数的返回值，否则返回第一步创建的对象。 // Function 构造函数 // Array 构造函数的其他参数组成的数组 // 对象实例 module.exports = function newOperator(constructor, ...args) { const ins = Object.create(constructor.prototype) const res = constructor.apply(ins, args) return res || ins }
```

## object-create

-   proto 新对象的原型对象
-   props Object.defineProperties 的第二个参数，要定义其可枚举属性或修改的属性描述符的对象。对象中存在的属性描述符：数据描述符和访问器描述符

```js
// Object.create // proto 新对象的原型对象 // props Object.defineProperties 的第二个参数，要定义其可枚举属性或修改的属性描述符的对象。对象中存在的属性描述符：数据描述符和访问器描述符 Object.myCreate = function(proto, props) { if (typeof proto !== 'object') { console.error('Object prototype may only be an Object or null') return } // 创建的空对象 const obj = {} // 设置原型对象 Object.setPrototypeOf(obj, proto) // 设置对象的初始数据 if (props) { Object.defineProperties(obj, props) } return obj }
```

## promise

-   Promise，解决了回调地狱的问题
-   executor 同步执行
-   promise 状态不可逆
-   then 回调必须在 promise 状态改变后执行
-   promise 链式调用，后一个回调的参数是前一个回调的返回值
-   实例化 Promise 时 executor 被同步执行

```js
// Promise，解决了回调地狱的问题 // executor 同步执行 // promise 状态不可逆 // then 回调必须在 promise 状态改变后执行 // promise 链式调用，后一个回调的参数是前一个回调的返回值 // 实例化 Promise 时 executor 被同步执行 function MyPromise(executor) { // 缓存this实例 const _self = this this.status = 'pending' this.value = undefined this.reason = undefined this.fulfilledCb = () => {} this.rejectedCb = () => {} function resolve(value) { setTimeout(() => { // 状态不可逆 if (_self.status === 'pending') { _self.status = 'fulfilled' _self.value = value _self.fulfilledCb(value) } }) } function reject(errMsg) { setTimeout(() => { // 状态不可逆 if (_self.status === 'pending') { _self.status = 'rejected' _self.reason = errMsg _self.rejectedCb(errMsg) } }) } try { executor(resolve, reject) } catch (err) { reject(err) } } MyPromise.prototype.then = function(fulfilledCb, rejectedCb) { const _self = this return new MyPromise((resolve, reject) => { _self.fulfilledCb = function (value) { resolve(fulfilledCb(value)) } _self.rejectedCb = function (reason) { reject(rejectedCb(reason)) } }) } MyPromise.race = function (promiseArr) { return new MyPromise((resolve, reject) => { for (let i = 0, len = promiseArr.length; i < len; i++) { const p = promiseArr[i] p.then(resolve, reject) } }) } MyPromise.all = function (promiseArr) { return new MyPromise((resolve, reject) => { const len = promiseArr.length const result = [] for (let i = 0; i < len; i++) { const p = promiseArr[i] p.then((res) => { result.push(res) if (result.length === len) { resolve(result) } }, (errMsg) => { reject(errMsg) }) } }) } module.exports = MyPromise
```

## throttle

-   节流
-   原理：事件被频繁触发时，事件回调函数会按照固定频率执行，比如1s 执行一次，只有上个事件回调被执行之后下一个事件回调才会执行
-   事件回调函数
-   wait 事件回调的执行频率，每wait毫秒执行一次

```js
// 节流 // 原理：事件被频繁触发时，事件回调函数会按照固定频率执行，比如1s 执行一次，只有上个事件回调被执行之后下一个事件回调才会执行 // 事件回调函数 // wait 事件回调的执行频率，每wait毫秒执行一次 function throttle(fn, wait = 500) { let timer = null return function(...args) { if (timer) return timer = setTimeout(() => { fn.apply(this, args) timer = null }, wait) } }
```

go!go!go!

## 参与

我正在参与掘金技术社区创作者签约计划招募活动，[点击链接报名投稿](https://juejin.cn/post/7112770927082864653 "https://juejin.cn/post/7112770927082864653")。