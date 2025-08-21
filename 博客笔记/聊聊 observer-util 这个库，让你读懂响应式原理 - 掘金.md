响应式对使用过 Vue 或 RxJS 的小伙伴来说，应该都不会陌生。响应式也是 Vue 的核心功能特性之一，因此如果要想掌握 Vue，我们就必须深刻理解响应式。接下来阿宝哥将从观察者模式说起，然后结合 [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 这个库，带大家一起深入学习响应式的原理。

### 一、观察者模式

观察者模式，它定义了一种 **一对多** 的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。在观察者模式中有两个主要角色：Subject（主题）和 Observer（观察者）。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f6c25b9f32a4d189bc6964e6d73964d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 关注「全栈修仙之路」阅读阿宝哥原创的 4 本免费电子书（累计下载 2.2万+）及 50 几篇 “重学TS” 教程。

由于观察者模式支持简单的广播通信，当消息更新时，会自动通知所有的观察者。下面我们来看一下如何使用 TypeScript 来实现观察者模式：

#### 1.1 定义 ConcreteObserver

```typescript
interface Observer { notify: Function; } class ConcreteObserver implements Observer{ constructor(private name: string) {} notify() { console.log(`${this.name} has been notified.`); } }
```

#### 1.2 定义 Subject 类

```typescript
class Subject { private observers: Observer[] = []; public addObserver(observer: Observer): void { this.observers.push(observer); } public notifyObservers(): void { console.log("notify all the observers"); this.observers.forEach(observer => observer.notify()); } }
```

#### 1.3 使用示例

```typescript
// ① 创建主题对象 const subject: Subject = new Subject(); // ② 添加观察者 const observerA = new ConcreteObserver("ObserverA"); const observerC = new ConcreteObserver("ObserverC"); subject.addObserver(observerA); subject.addObserver(observerC); // ③ 通知所有观察者 subject.notifyObservers();
```

对于以上的示例来说，主要包含三个步骤：① 创建主题对象、② 添加观察者、③ 通知观察者。上述代码成功运行后，控制台会输出以下结果：

```erlang
notify all the observers ObserverA has been notified. ObserverC has been notified.
```

在前端大多数场景中，我们所观察的目标是数据，当数据发生变化的时候，页面能实现自动的更新，对应的效果如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ebbee6ed7474520bc02b8874935c447~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

要实现自动更新，我们需要满足两个条件：一个是能实现精准地更新，另一个是能检测到数据的异动。要能实现精准地更新就需要收集对该数据异动感兴趣的更新函数（观察者），在完成收集之后，当检测到数据异动，就可以通知对应的更新函数。

上面的描述看起来比较绕，其实要实现自动更新，我们就是要让 **① 创建主题对象、② 添加观察者、③ 通知观察者** 这三个步骤实现自动化，这就是实现响应式的核心思路。接下来，我们来举一个具体的示例：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a06a20cf20f427380ca3896d232df2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

相信熟悉 Vue2 响应式原理的小伙伴，对上图中的代码都不会陌生，其中第二步骤也被称为收集依赖。通过使用 [Object.defineProperty](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty") API，我们可以拦截对数据的读取和修改操作。

若在函数体中对某个数据进行读取，则表示此函数对该数据的异动感兴趣。当进行数据读取时，就会触发已定义的 getter 函数，这时就可以把数据的观察者存储起来。而当数据发生异动的时候，我们就可以通知观察者列表中的所有观察者，从而执行相应的更新操作。

Vue3 使用了 [Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy") API 来实现响应式，[Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy") API 相比 [Object.defineProperty](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty") API 有哪些优点呢？这里阿宝哥不打算展开介绍了，后面打算写一篇专门的文章来介绍 [Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy") API。下面阿宝哥将开始介绍本文的主角 —— [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util")：

> Transparent reactivity with 100% language coverage. Made with ❤️ and ES6 Proxies.
> 
> [github.com/nx-js/obser…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util")

该库内部也是利用了 ES6 的 Proxy API 来实现响应式，在介绍它的工作原理前，我们先来看一下如何使用它。

### 二、observer-util 简介

[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 这个库使用起来也很简单，利用该库提供的 `observable` 和 `observe` 函数，我们就可以方便地实现数据的响应式。下面我们先来举个简单的例子：

#### 2.1 已知属性

```javascript
import { observable, observe } from '@nx-js/observer-util'; const counter = observable({ num: 0 }); const countLogger = observe(() => console.log(counter.num)); // 输出 0 counter.num++; // 输出 1
```

在以上代码中，我们从 `@nx-js/observer-util` 模块中分别导入 `observable` 和 `observe` 函数。其中 `observable` 函数用于创建可观察的对象，而 `observe` 函数用于注册观察者函数。以上的代码成功执行后，控制台会依次输出 `0` 和 `1`。除了已知属性外，[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 也支持动态属性。

#### 2.2 动态属性

```javascript
import { observable, observe } from '@nx-js/observer-util'; const profile = observable(); observe(() => console.log(profile.name)); profile.name = 'abao'; // 输出 'abao'
```

以上的代码成功执行后，控制台会依次输出 `undefined` 和 `abao`。[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 除了支持普通对象之外，它还支持数组和 ES6 中的集合，比如 Map、Set 等。这里我们以常用的数组为例，来看一下如何让数组对象变成响应式对象。

#### 2.3 数组

```javascript
import { observable, observe } from '@nx-js/observer-util'; const users = observable([]); observe(() => console.log(users.join(', '))); users.push('abao'); // 输出 'abao' users.push('kakuqo'); // 输出 'abao, kakuqo' users.pop(); // 输出 'abao,'
```

这里阿宝哥只介绍了几个简单的示例，对 [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 其他使用示例感兴趣的小伙伴，可以阅读该项目的 `README.md` 文档。接下来，阿宝哥将以最简单的例子为例，来分析一下 [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 这个库响应式的实现原理。

> 如果你想在本地运行以上示例的话，可以先修改 `debug/index.js` 目录下的 `index.js` 文件，然后在根目录下执行 `npm run debug` 命令。

### 三、observer-util 原理解析

首先，我们再来回顾一下最早的那个例子：

```javascript
import { observable, observe } from '@nx-js/observer-util'; const counter = observable({ num: 0 }); // A const countLogger = observe(() => console.log(counter.num)); // B counter.num++; // C
```

在第 A 行中，我们通过 `observable` 函数创建了可观察的 `counter` 对象，该对象的内部结构如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29726f9d951d4747832d5d118b1f2b7d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

通过观察上图可知，counter 变量所指向的是一个 Proxy 对象，该对象含有 3 个 Internal slots。那么 `observable` 函数是如何将我们的 `{ num: 0 }` 对象转换成 [Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy") 对象呢？在项目的 `src/observable.js` 文件中，我们找到了该函数的定义：

```javascript
// src/observable.js export function observable (obj = {}) { // 如果obj已经是一个observable对象或者不应该被包装，则直接返回它 if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj)) { return obj } // 如果obj已经有一个对应的observable对象，则将其返回。否则创建一个新的observable对象 return rawToProxy.get(obj) || createObservable(obj) }
```

在以上代码中出现了 `proxyToRaw` 和 `rawToProxy` 两个对象，它们被定义在 `src/internals.js` 文件中：

```javascript
// src/internals.js export const proxyToRaw = new WeakMap() export const rawToProxy = new WeakMap()
```

这两个对象分别存储了 `proxy => raw` 和 `raw => proxy` 之间的映射关系，其中 `raw` 表示原始对象，`proxy` 表示包装后的 `Proxy` 对象。很明显首次执行时，`proxyToRaw.has(obj)` 和 `rawToProxy.get(obj)` 分别会返回 `false` 和 `undefined`，所以会执行 `||` 运算符右侧的逻辑。

下面我们来分析一下 `shouldInstrument` 函数，该函数的定义如下：

```javascript
// src/builtIns/index.js export function shouldInstrument ({ constructor }) { const isBuiltIn = typeof constructor === 'function' && constructor.name in globalObj && globalObj[constructor.name] === constructor return !isBuiltIn || handlers.has(constructor) }
```

在 `shouldInstrument` 函数内部，会使用参数 obj 的构造函数判断其是否为内置对象，对于 `{ num: 0 }` 对象来说，它的构造函数是 `ƒ Object() { [native code] }`，因此 `isBuiltIn` 的值为 true，所以会继续执行 `||` 运算符右侧的逻辑。其中 `handlers` 对象是一个 Map 对象：

```javascript
// src/builtIns/index.js const handlers = new Map([ [Map, collectionHandlers], [Set, collectionHandlers], [WeakMap, collectionHandlers], [WeakSet, collectionHandlers], [Object, false], [Array, false], [Int8Array, false], [Uint8Array, false], // 省略部分代码 [Float64Array, false] ])
```

看完 `handlers` 的结构，很明显 `!builtIns.shouldInstrument(obj)` 表达式的结果为 `false`。所以接下来，我们的焦点就是 `createObservable` 函数：

```javascript
function createObservable (obj) { const handlers = builtIns.getHandlers(obj) || baseHandlers const observable = new Proxy(obj, handlers) // 保存raw => proxy，proxy => raw 之间的映射关系 rawToProxy.set(obj, observable) proxyToRaw.set(observable, obj) storeObservable(obj) return observable }
```

通过观察以上代码，我们就知道了为什么调用 `observable({ num: 0 })` 函数之后，返回的是一个 Proxy 对象。对于 Proxy 的构造函数来说，它支持两个参数：

> ```javascript
> const p = new Proxy(target, handler)
> ```

-   target：要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）;
-   handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

示例中的 target 指向的就是 `{ num: 0 }` 对象，而 `handlers` 的值会根据 obj 的类型而返回不同的 `handlers`：

```javascript
// src/builtIns/index.js export function getHandlers (obj) { return handlers.get(obj.constructor) // [Object, false], }
```

而 `baseHandlers` 是一个包含了 get、has 和 set 等 “陷阱“ 的对象：

```javascript
export default { get, has, ownKeys, set, deleteProperty }
```

在创建完 `observable` 对象之后，会保存 **raw => proxy，proxy => raw** 之间的映射关系，然后再调用 `storeObservable` 函数执行存储操作，storeObservable 函数被定义在 `src/store.js` 文件中：

```javascript
// src/store.js const connectionStore = new WeakMap() export function storeObservable (obj) { // 用于后续保存obj.key -> reaction之间映射关系 connectionStore.set(obj, new Map()) }
```

介绍了那么多，阿宝哥用一张图来总结一下前面的内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/610be58ee3dd430d8482fb682509878f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

至于 `proxyToRaw` 和 `rawToProxy` 对象有什么用呢？相信看完以下代码，你就会知道答案。

```javascript
// src/observable.js export function observable (obj = {}) { // 如果obj已经是一个observable对象或者不应该被包装，则直接返回它 if (proxyToRaw.has(obj) || !builtIns.shouldInstrument(obj)) { return obj } // 如果obj已经有一个对应的observable对象，则将其返回。否则创建一个新的observable对象 return rawToProxy.get(obj) || createObservable(obj) }
```

下面我们来开始分析第 B 行：

```javascript
const countLogger = observe(() => console.log(counter.num)); // B
```

`observe` 函数被定义在 `src/observer.js` 文件中，其具体定义如下：

```javascript
// src/observer.js export function observe (fn, options = {}) { // const IS_REACTION = Symbol('is reaction') const reaction = fn[IS_REACTION] ? fn : function reaction () { return runAsReaction(reaction, fn, this, arguments) } // 省略部分代码 reaction[IS_REACTION] = true // 如果非lazy，则直接运行 if (!options.lazy) { reaction() } return reaction }
```

在上面代码中，会先判断传入的 `fn` 是不是 **reaction** 函数，如果是的话，直接使用它。如果不是的话，会把传入的 `fn` 包装成 **reaction** 函数，然���再调用该函数。在 **reaction** 函数内部，会调用另一个函数 —— `runAsReaction`，顾名思义该函数用于运行 **reaction** 函数。

`runAsReaction` 函数被定义在 `src/reactionRunner.js` 文件中：

```javascript
// src/reactionRunner.js const reactionStack = [] export function runAsReaction (reaction, fn, context, args) { // 省略部分代码 if (reactionStack.indexOf(reaction) === -1) { // 释放(obj -> key -> reactions) 链接并复位清理器链接 releaseReaction(reaction) try { // 压入到reactionStack堆栈中，以便于在get陷阱中能建立(observable.prop -> reaction)之间的联系 reactionStack.push(reaction) return Reflect.apply(fn, context, args) } finally { // 从reactionStack堆栈中，移除已执行的reaction函数 reactionStack.pop() } } }
```

在 `runAsReaction` 函数体中，会把当前正在执行的 **reaction** 函数压入 `reactionStack` 栈中，然后使用 `Reflect.apply` API 调用传入的 `fn` 函数。当 `fn` 函数执行时，就是执行 `console.log(counter.num)` 语句，在该语句内，会访问 `counter` 对象的 `num` 属性。 `counter` 对象是一个 Proxy 对象，当访问该对象的属性时，会触发 `baseHandlers` 中 `get` 陷阱：

```javascript
// src/handlers.js function get (target, key, receiver) { const result = Reflect.get(target, key, receiver) // 注册并保存(observable.prop -> runningReaction) registerRunningReactionForOperation({ target, key, receiver, type: 'get' }) const observableResult = rawToProxy.get(result) if (hasRunningReaction() && typeof result === 'object' && result !== null) { // 省略部分代码 } return observableResult || result }
```

在以上的函数中，`registerRunningReactionForOperation` 函数用于保存 `observable.prop -> runningReaction` 之间的映射关系。其实就是为对象的指定属性，添加对应的观察者，这是很关键的一步。所以我们来重点分析 `registerRunningReactionForOperation` 函数：

```javascript
// src/reactionRunner.js export function registerRunningReactionForOperation (operation) { // 从栈顶获取当前正在执行的reaction const runningReaction = reactionStack[reactionStack.length - 1] if (runningReaction) { debugOperation(runningReaction, operation) registerReactionForOperation(runningReaction, operation) } }
```

在 `registerRunningReactionForOperation` 函数中，首先会从 `reactionStack` 堆栈中获取正在运行的 reaction 函数，然后再次调用 `registerReactionForOperation` 函数为当前的操作注册 reaction 函数，具体的处理逻辑如下所示：

```javascript
// src/store.js export function registerReactionForOperation (reaction, { target, key, type }) { // 省略部分代码 const reactionsForObj = connectionStore.get(target) // A let reactionsForKey = reactionsForObj.get(key) // B if (!reactionsForKey) { // C reactionsForKey = new Set() reactionsForObj.set(key, reactionsForKey) } if (!reactionsForKey.has(reaction)) { // D reactionsForKey.add(reaction) reaction.cleaners.push(reactionsForKey) } }
```

在调用 `observable(obj)` 函数创建可观察对象时，会为以 obj 对象为 key，保存在 `connectionStore` （**connectionStore.set(obj, new Map())** ）对象中。阿宝哥把 `registerReactionForOperation` 函数内部的处理逻辑分为 4 个部分：

-   (A)：从 connectionStore （WeakMap）对象中获取 target 对应的值，会返回一个 reactionsForObj（Map）对象；
-   (B)：从 reactionsForKey （Map）对象中获取 key（对象属性）对应的值，如果不存在的话，会返回 undefined；
-   (C)：如果 reactionsForKey 为 undefined，则会创建一个 Set 对象，并把该对象作为 value，保存在 reactionsForObj（Map）对象中；
-   (D)：判断 reactionsForKey（Set）集合中是否含有当前的 reaction 函数，如果不存在的话，把当前的 reaction 函数添加到 reactionsForKey（Set）集合中。

为了让大家能够更好地理解该部分的内容，阿宝哥继续通过画图来总结上述的内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2f2ef42fde244c19d53351c2aa841ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

因为对象中的每个属性都可以关联多个 **reaction** 函数，为了避免出现重复，我们使用 Set 对象来存储每个属性所关联的 **reaction** 函数。而一个对象又可以包含多个属性，所以 [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 内部使用了 Map 对象来存储每个属性与 **reaction** 函数之间的关联关系。

此外，为了支持能把多个对象变成 observable 对象并在原始对象被销毁时能及时地回收内存， [observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 定义了 WeakMap 类型的 `connectionStore` 对象来存储对象的链接关系。对于当前的示例，`connectionStore` 对象的内部结构如下所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fda4ae86b6d640bd8d084eb879025b72~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

最后，我们来分析 `counter.num++;` 这行代码。简单起见，阿宝哥只分析核心的处理逻辑，对完整代码感兴趣的小伙伴，可以阅读该项目的源码。当执行 `counter.num++;` 这行代码时，会触发已设置的 `set` 陷阱：

```javascript
// src/handlers.js function set (target, key, value, receiver) { // 省略部分代码 const hadKey = hasOwnProperty.call(target, key) const oldValue = target[key] const result = Reflect.set(target, key, value, receiver) if (!hadKey) { queueReactionsForOperation({ target, key, value, receiver, type: 'add' }) } else if (value !== oldValue) { queueReactionsForOperation({ target, key, value, oldValue, receiver, type: 'set' }) } return result }
```

对于我们的示例，将会调用 `queueReactionsForOperation` 函数：

```javascript
// src/reactionRunner.js export function queueReactionsForOperation (operation) { // iterate and queue every reaction, which is triggered by obj.key mutation getReactionsForOperation(operation).forEach(queueReaction, operation) }
```

在 `queueReactionsForOperation` 函数内部会继续调用 `getReactionsForOperation` 函数获取当前 key 对应的 reactions：

```javascript
// src/store.js export function getReactionsForOperation ({ target, key, type }) { const reactionsForTarget = connectionStore.get(target) const reactionsForKey = new Set() if (type === 'clear') { reactionsForTarget.forEach((_, key) => { addReactionsForKey(reactionsForKey, reactionsForTarget, key) }) } else { addReactionsForKey(reactionsForKey, reactionsForTarget, key) } // 省略部分代码 return reactionsForKey }
```

在成功获取当前 key 对应的 reactions 对象之后，会遍历该对象执行每个 reaction，具体的处��逻辑被定义在 `queueReaction` 函数中：

```javascript
// src/reactionRunner.js function queueReaction (reaction) { debugOperation(reaction, this) // queue the reaction for later execution or run it immediately if (typeof reaction.scheduler === 'function') { reaction.scheduler(reaction) } else if (typeof reaction.scheduler === 'object') { reaction.scheduler.add(reaction) } else { reaction() } }
```

因为我们的示例并没有配置 `scheduler` 参数，所以就会直接执行 `else` 分支的代码，即执行 `reaction()` 该语句。

好的，[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 这个库内部如何把普通对象转换为可观察对象的核心逻辑已经分析完了。对于普通对象来说，[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 内部通过 Proxy API 提供 get 和 set 陷阱，实现自动添加观察者（添加 reaction 函数）和通知观察者（执行 reaction 函数）的处理逻辑。

如果你看完本文所介绍的内容，应该就可以理解 Vue3 中 reactivity 模块内 `targetMap` 的相关定义：

```typescript
// vue-next/packages/reactivity/src/effect.ts type Dep = Set<ReactiveEffect> type KeyToDepMap = Map<any, Dep> const targetMap = new WeakMap<any, KeyToDepMap>()
```

除了普通对象和数组之外，[observer-util](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnx-js%2Fobserver-util "https://github.com/nx-js/observer-util") 还支持 ES6 中的集合，比如 Map、Set 和 WeakMap 等。当处理这些对象时，在创建 Proxy 对象时，会使用 `collectionHandlers` 对象，而不是 `baseHandlers` 对象。这部分内容，阿宝哥就不再展开介绍，感兴趣的小伙伴可以自行阅读相关代码。

> 关注「全栈修仙之路」阅读阿宝哥原创的 4 本免费电子书（累计下载2.1万+）及 10 篇源码分析系列教程。

### 四、参考资源

-   [what-is-an-internal-slot-of-an-object-in-javascript](https://link.juejin.cn/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F33075262%2Fwhat-is-an-internal-slot-of-an-object-in-javascript "https://stackoverflow.com/questions/33075262/what-is-an-internal-slot-of-an-object-in-javascript")
-   [MDN-Proxy](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FProxy "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy")
-   [MDN-Reflect](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FReflect "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect")