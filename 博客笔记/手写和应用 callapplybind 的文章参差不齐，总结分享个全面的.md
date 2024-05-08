关注公众号 前端界，回复“加群”

加入我们一起学习，天天进步

## 本文你能学到什么

![Image](https://mmbiz.qpic.cn/mmbiz_png/MDPRplBm9ZWGTYC1LCyUy31BJRF39KB9BZxumnUBY2bwJcYcpH8DL42RRQXW5YrExU5yb0MdtvFzfgia5AvuccQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> **欢迎关注公众号《`前端界`》，文章会同步更新，也可快速加入前端交流群！**

## 前言

最近在复习 `JavaScript` 手写代码。想搜一下 `call/apply/bind`实现，发现搜的结果参差不齐，有的是不对的，有的长篇大论不够精简缺应用场景，于是自己手写总结分享下，希望对看到的同学有帮助，同时也是为了方便以后自己复习吧！

## call 实现

### `call` 函数内部做了什么

1.  函数先通`__proto__`原型链找到 `Function.prototype` 上的 `call` 函数
    
2.  确定 `this` 为执行的函数
    
3.  接下来要执行函数，但是执行函数的上下文需要是传递进来的第一个参数，所以想办法修改函数执行上下文
    
4.  正式执行函数，并返回执行结果
    

### 基础版代码实现

根据前面的分析开始编码

```
<span data-darkreader-inline-color="">Function</span>.prototype.call&nbsp;=&nbsp;(context,...arguments){<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;第一步：this 就是对应执行的函数，也就是调用函数 fun</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;self&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;第二步：想要执行函数时需要函数的上下文为传入的上下文，想要改变调用上下文最好的办法是直接用上下文对象调用函数，这时候函数内部的 this 就指向了上下文&nbsp;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;一个小结论&nbsp;xx1.xx2&nbsp;xx2的&nbsp;this&nbsp;就指向了&nbsp;xx1</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用&nbsp;symbol&nbsp;类型可以保证属性名的唯一性，而且不会被遍历枚举出来</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;symbolKey&nbsp;=&nbsp;<span data-darkreader-inline-color="">Symbol</span>(<span data-darkreader-inline-color="">'fun'</span>);&nbsp;&nbsp;<br>&nbsp;&nbsp;context[symbolKey]&nbsp;=&nbsp;self;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;第三步：执行函数</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;context[symbolKey](...arguments);&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;删除&nbsp;symbol&nbsp;类型的&nbsp;key</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">delete</span>&nbsp;context[symbolKey];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回结果</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;result;&nbsp;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;fun&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>param</span>)</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.a;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(a,param);<br>}<br><br>fun.call({<span>a</span>:<span>234</span>},<span data-darkreader-inline-color="">'哈哈哈'</span>);<br>
```

### 升级版代码实现

上面实现的代码有些问题

1.  如果上下文传递的为 `null` ,会报错 `funA.call()`;
    
2.  如果上下文传递的是整数类型，会报错 `funA.call(123)`;
    

针对以上两种情况，我们升级一下扩展代码

```
<span data-darkreader-inline-color="">Function</span>.prototype.callUpgrade&nbsp;=&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>context,...arguments</span>)</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;校验context是否为空，如果为空，默认值给&nbsp;window</span><br>&nbsp;&nbsp;context&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;?&nbsp;context&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;校验上下文是否为对象，对象基础类型情况需要创建一个对象</span><br>&nbsp;&nbsp;!<span data-darkreader-inline-color="">/^(object|function)$/i</span>.test(<span data-darkreader-inline-color="">typeof</span>&nbsp;context)&nbsp;?&nbsp;context&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>(context)&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;self&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;symbolKey&nbsp;=&nbsp;<span data-darkreader-inline-color="">Symbol</span>(<span data-darkreader-inline-color="">'fun'</span>);<br>&nbsp;&nbsp;context[symbolKey]&nbsp;=&nbsp;self;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;context[symbolKey](...arguments);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">delete</span>&nbsp;context[symbolKey];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;result;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;fun&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>param</span>)</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.a;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(a);<br>}<br>fun.call();<span data-darkreader-inline-color="">//&nbsp;空上下文情况不报错</span><br>fun.call(<span>123</span>);<span data-darkreader-inline-color="">//&nbsp;非对象情况上下文不报错</span><br>
```

## apply 实现

`apply` 不过多说明，因为他与 `call` 唯一的区别是传递参数不同。`call` 可以传递任意数量的参数，这些参数会作为函数的参数按顺序传递进去。`apply` 第二个参数只接受一个数组或者类数组对象。

### 代码实现

```
<span data-darkreader-inline-color="">Function</span>.prototype.bind&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>context,arguments</span>)</span>{<br>&nbsp;&nbsp;context&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;?&nbsp;context&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;!<span data-darkreader-inline-color="">/^(object|function)$/i</span>.test(<span data-darkreader-inline-color="">typeof</span>&nbsp;context)&nbsp;?&nbsp;context&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>(context)&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;self&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;symbolKey&nbsp;=&nbsp;<span data-darkreader-inline-color="">Symbol</span>(<span data-darkreader-inline-color="">'fun'</span>);<br>&nbsp;&nbsp;context[symbolKey]&nbsp;=&nbsp;self;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;context[symbolKey](...arguments);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">delete</span>&nbsp;context[symbolKey];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;result;<br>}<br>
```

> 手写时候使用箭头函数，箭头函数中的 this 指向上一级别

## bind 实现

### bind 内部做了什么

1.  先通过`__proto__`原型连找到 `Function.prototype` 上的 `bind` 函数
    
2.  `bind` 函数内部没有把函数立即执行，是将传来的信息通过必包方式存储起来
    
3.  `bind` 实际返回了一个新的函数。
    
4.  这个新函数内容不完成了函数执行，并把 `this` 上下文和参数改变为之前存储的内容
    

### 基础代码实现

```
<span data-darkreader-inline-color="">//&nbsp;使用&nbsp;call&nbsp;实现&nbsp;bind&nbsp;函数</span><br><span data-darkreader-inline-color="">Function</span>.prototype.bind&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>context,...args</span>)</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;self&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Fun</span>(<span>...params</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.call(context,...args,...params)<br>&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">//&nbsp;使用&nbsp;apply&nbsp;实现&nbsp;bind&nbsp;函数</span><br><span data-darkreader-inline-color="">Function</span>.prototype.bind&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>context,...args</span>)</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;self&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Fun</span>(<span>...params</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;self.apply(context,args.concat(params))<br>&nbsp;&nbsp;}<br>}<br>
```

## call/apply/bind 的几个有趣应用场景

### apply 数组展开能力

开发过程中我想合并一个数组到目标数组(数据添加)，但是不想生成新的数组。

```
<span data-darkreader-inline-color="">let</span>&nbsp;target&nbsp;=&nbsp;[<span>1</span>,<span>2</span>,<span>3</span>];<br><span data-darkreader-inline-color="">let</span>&nbsp;source&nbsp;=&nbsp;[<span>4</span>,<span>5</span>,<span>6</span>];<br>
```

-   扩展运算符 `[...target,...source]` 是做不到的，会生成**新数组**
    
-   `target.concat(source)` 也是做不到的，也是生成**新数组**
    
-   难道我要 `for` 循环，然后每一个值 `push` 进去吗?有没有优雅点的方式
    

可以使用 `apply` 函数

```
<span data-darkreader-inline-color="">Array</span>.prototype.push.apply(target,source)<br>
```

`apply` 函数的第一个参数是调用的函数上下文(即 `this` 值)，第二个参数是一个数组或类数组，会被展开并作为参数传递。在 `push` 函数内部会遍历将传递进来的参数放到数组末尾。其实和我们 `for` 循环遍历添加是相同的

> 因为 `Array.prototype.push` 本身支持多个参数,你也可以直接使用扩展运算符，`target.push(...source)`

### bind 实现函数柯里化

首先理解一下什么是柯里化，是一种将接受多个参数的函数转化为一系列接受一个参数的函数的过程。这种转化使得函数更加灵活，可以通过部分应用来创建新的函数，从而在需要的时候传递剩余的参数。

函数柯里化有助于在函数式编程中实现复杂的函数组合和延迟求值，提高代码的可维护性和复用性。

举个例子来理解一下柯里化的概念

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;原始的普通函数，接受两个参数并返回它们的乘积<br>&nbsp;*&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">multiply</span>(<span>x,&nbsp;y</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;x&nbsp;*&nbsp;y;<br>}<br><span data-darkreader-inline-color="">/*<br>&nbsp;*&nbsp;使用函数柯里化，将上述函数转化为接受一个参数的函数<br>&nbsp;*&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">curriedMultiply</span>(<span>x</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>y</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;x&nbsp;*&nbsp;y;<br>&nbsp;&nbsp;};<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;创建一个新函数，只需要传递一个参数</span><br><span data-darkreader-inline-color="">const</span>&nbsp;double&nbsp;=&nbsp;curriedMultiply(<span>2</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;使用新函数来获取传递的参数的两倍</span><br><span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;double(<span>5</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;2&nbsp;*&nbsp;5&nbsp;=&nbsp;10</span><br><br>
```

函数柯里化的好处在于，您可以在需要的时候提供部分参数，然后在稍后的调用中提供剩余的参数。这对于实现通用的函数，避免重复代码以及构建复杂的函数组合非常有用。

介绍完基础概念，我们回到本文主题 `bind`。更简洁的实现函数柯里化，上面的例子我们可以用 `bind` 来创建一个新函数

```
<span data-darkreader-inline-color="">const</span>&nbsp;multiply&nbsp;=&nbsp;<span>(<span>x,y</span>)=&gt;</span>x*y;<br><span data-darkreader-inline-color="">const</span>&nbsp;double&nbsp;=&nbsp;multiply.bind(<span data-darkreader-inline-color="">null</span>,<span>2</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;double(<span>5</span>);<span data-darkreader-inline-color="">//&nbsp;2*5&nbsp;=&nbsp;10</span><br>
```

> 有趣的小知识，为什么这种实现叫柯里化，柯里化的概念得名于数学家 `Haskell Curry`，他是函数式编程的先驱之一。柯里化的概念最早可以追溯到 `Lambda` 演算，这是一种数学形式化的方法，用于描述函数的运算和变换。`Haskell Curry` 提出了一种将多参数函数转化为一系列单参数函数的思想，这样就能更好地进行函数组合和变换。

#### 柯里化事件绑定应用

柯里化在前端开发中有许多应用场景，特别是函数式编程和高阶函数的概念中。它可以帮助简化代码，提高可复用性，并促进更模块化和函数式的编程风格。再举一个事件处理函数的例子；

在前端开发中 ，处理事件常常需要传递附加的数据和上下文信息。柯里化可以用于**创建高阶事件处理函数，从而将_特定的事件处理逻辑_与_通用的事件逻辑_绑定分离**

```
<span data-darkreader-inline-color="">//&nbsp;使用柯里化创建高阶事件处理函数</span><br><span data-darkreader-inline-color="">const</span>&nbsp;curriedEventHandler&nbsp;=&nbsp;<span><span>eventData</span>&nbsp;=&gt;</span>&nbsp;<span><span>event</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Event:&nbsp;<span>${event.type}</span>,Data:&nbsp;<span>${<span>JSON</span>.stringify(eventData)}</span>`</span>)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;button&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'myButton'</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;handleClick&nbsp;=&nbsp;curriedEventHandler({<span>action</span>:<span data-darkreader-inline-color="">"click"</span>});<br><br>button.addEventListener(<span data-darkreader-inline-color="">"click"</span>,handleClick);<br>
```

### 鸭子类型实现类数组转换

鸭子类型（`Duck Typing`） 是一种在动态语言中常见的类型检查方式。它关注的不是对象的具体类型，而是关注对象是否有特定的方法，属性或行为。如果一个对象的方法，属性或行为与某个类型的期望一致，那么就可以将该对象视为该类型。

类数组是一种具有索引和`length`属性，但本身本身不可以调用 `Array.prototype` 上面的函数的，比如`forEach reduce` 等原型上的函数。这时候可以使用 `bind/call/apply`等函数将数组方法应用于类数组函数。这样就拥有了数组原型上面的函数。

可以这么使用

```
<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">sum</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Array</span>.prototype.reduce.call(<span data-darkreader-inline-color="">arguments</span>,&nbsp;(acc,&nbsp;val)&nbsp;=&gt;&nbsp;acc&nbsp;+&nbsp;val,&nbsp;<span>0</span>);<br>}<br><span data-darkreader-inline-color="">const</span>&nbsp;total&nbsp;=&nbsp;sum(<span>1</span>,&nbsp;<span>2</span>,&nbsp;<span>3</span>,&nbsp;<span>4</span>,&nbsp;<span>5</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;15</span><br>
```

也可以这么转换一下哦

```
<span data-darkreader-inline-color="">const</span>&nbsp;duckArr&nbsp;=&nbsp;<span data-darkreader-inline-color="">Array</span>.prototype.slice.call(<span data-darkreader-inline-color="">arguments</span>,<span>0</span>);<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">Array</span>.isArray(duckArr));<span data-darkreader-inline-color="">//&nbsp;true</span><br>
```

**🦆鸭子类型** 在工作中应用场景和思想还有很多，再举个例子。当我们谈到迭代起模式时，**鸭子类型**的应用是指对象只要有迭代器的行为(如 `next()`方法)，那么这个对象就可以被视为迭代器，无论其实际类型是什么(符合前面提到的鸭子类型的概念)。这意味着你可以在不同类型的对象上使用统一的迭代方式，从而实现更加通用和灵活的代码。

#### 鸭子类迭代器应用

下面举一个简单的例子，展示如何使用鸭子类型来实现迭代器模式：

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;定义一个通用的迭代函数<br>&nbsp;*&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">iterate</span>(<span>iterator</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;iterator.next();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(!result.done)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result.value);<br>&nbsp;&nbsp;&nbsp;&nbsp;result&nbsp;=&nbsp;iterator.next();<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;定义一个模拟的迭代器对象<br>&nbsp;**/</span>&nbsp;<br><span data-darkreader-inline-color="">const</span>&nbsp;mockIterator&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>index</span>:&nbsp;<span>0</span>,<br>&nbsp;&nbsp;<span>values</span>:&nbsp;[<span>1</span>,&nbsp;<span>2</span>,&nbsp;<span>3</span>],<br>&nbsp;&nbsp;next()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">this</span>.index&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">this</span>.values.length)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;<span>done</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span>value</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.values[<span data-darkreader-inline-color="">this</span>.index++]&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;<span>done</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;使用迭代函数遍历不同类型的对象</span><br>iterate(mockIterator);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;1,&nbsp;2,&nbsp;3</span><br>
```

在上述示例中，我们首先定义了一个通用的 `iterate` 函数，该函数接受一个迭代器对象并使用其 `next()` 方法来遍历对象的值。然后，我们定义了一个模拟的迭代器对象 `mockIterator`，它具有 `next()` 方法和要遍历的值。最后，我们使用 `iterate` 函数来遍历 `mockIterator`，实现了迭代器模式。

值得注意的是，`iterate` 函数不关心传入的迭代器对象的具体类型，只要对象具有期望的 `next()` 方法，就可以进行遍历。这就是**鸭子类型**的应用，通过关注对象的行为而不是类型，实现了更灵活的代码。

哈哈哈，发现一个自己的问题，其实总是想要写一篇小文章，但是越写展开的越多，收一下。

> **欢迎关注公众号《`前端界`》，文章会同步更新，也可快速加入前端交流群！**

本文就到这里如果有收获，欢迎大家点赞，转发支持下。

加我微信，拉你进前端进阶、面试交流群，互相监督学习进步等！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 推荐链接

1.  [TypeScript中 interface 和 type 的区别，你真的懂了吗](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247485013&idx=1&sn=9324e663eb2d6ed02a2f167e12b56692&chksm=c20c7aa1f57bf3b7f7e00ecc07d753a201ea08da5ad083dc5f70adc8553ef731f9e295afe8a2&scene=21#wechat_redirect)？
    
2.  [2022年，前端er们都在看哪些网站？](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247485101&idx=1&sn=09322752bb7e63dea5286f9a0c51164a&chksm=c20c7a59f57bf34f2142aef77367ec01e1cd2471637920f48f53552eafcca8b35f93625eaec9&scene=21#wechat_redirect)
    
3.  [前端开发者应该知道的 Centos/Docker/Nginx/Node/Jenkins 操作（大量干货来袭）](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247484619&idx=1&sn=e1e7345d6ac2f0c92c963f02d51c7230&chksm=c20c783ff57bf129b2501684d18e3be745b1e9c8279b1b0a22d05c14e57e4272e550db4363ff&scene=21#wechat_redirect)
    

创作不易，加个点赞、在看 支持一下哦！