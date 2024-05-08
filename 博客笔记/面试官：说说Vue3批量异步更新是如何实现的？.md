  

## 写在前面

这是Vue3源码分析的第三篇，与响应式系统中调度执行有关，其中**computed**、**watch**等核心功能都离不开它，可见其重要程度。

除了实现可调度性，我们还会借助它来实现vue中一个非常重要的功能，**批量更新**或者叫**异步更新**

多次修改数据(例如自身num10次)，只进行一次页面渲染（页面只会渲染最后一次num10）。

1.  [面试官：Vue3响应式系统都不会写，还敢说精通？](http://mp.weixin.qq.com/s?__biz=MzI4ODYzOTk1OQ==&mid=2247490287&idx=1&sn=4c7ff6b49da0312c30b8ac006ea7c415&chksm=ec3a0457db4d8d4189ef72ffc4674b05511c115c79cdd348c0183ab78182581c8541bdc0bbc0&scene=21#wechat_redirect)
    
2.  [面试官：你觉得Vue的响应式系统仅仅是一个Proxy？](http://mp.weixin.qq.com/s?__biz=MzI4ODYzOTk1OQ==&mid=2247489156&idx=1&sn=4e7eff3ea084bbeec3529bf7796ce687&chksm=ec3a083cdb4d812aa33ad50392463eb387a4d556005cff5ce5db9b860b8aaaacd3013f549cb9&scene=21#wechat_redirect)
    

## 什么是调度执行？

**什么是调度执行？**

> 指的是响应式数据发生变化出发副作用函数重新执行时，我们有能力去决定副作用函数的**执行时机**、**次数**和**方式**。

来看个例子

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">num</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>})<br><br>effect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'num'</span>,&nbsp;state.num)<br>})<br><br>state.num++<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'end'</span>)<br><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果我们想要它按照这个顺序书序呢？

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">1</span><br>end<br><span data-darkreader-inline-color="">2</span><br><br></code>
```

你可能会说，我调换一下代码顺序就好了哇！！！

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">num</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>})<br><br>effect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'num'</span>,&nbsp;state.num)<br>})<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'end'</span>)<br><br>state.num++<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

淫才啊！😄 瞬间就解决了问题。不过看起来这不是我们想要最终答案。

我们想要通过实现可调度性来解决这个问题。

## 如何实现可调度？

我们从结果出发来思考如何实现可调度的特性。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">num</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>})<br><br>effect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(state.num)<br>},&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注意这里，假如num发生变化的时候执行的是scheduler函数</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;那么end将会被先执行，因为我们用setTimeout包裹了一层fn</span><br>&nbsp;&nbsp;scheduler&nbsp;(fn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;异步执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn()<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;<span data-darkreader-inline-color="">0</span>)<br>&nbsp;&nbsp;}<br>})<br><br>state.num++<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'end'</span>)<br></code>
```

看到这里也许你已经明白了，我们将通过**scheduler**来自主控制副作用函数的执行时机。

在这之前，执行`state.num++`之后，`console.log(state.num)`将会被马上执行，而添加scheduler后，num发生变化后将执行scheduler中的逻辑。

**源码实现**

虽然可调度性在Vue中非常重要，但实现这个机制却非常简单，我们甚至只要增加两行代码就可以搞定。

**第一行代码**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;增加options参数</span><br><span data-darkreader-inline-color="">const</span>&nbsp;effect&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>fn,&nbsp;options&nbsp;=&nbsp;{}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;effectFn&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;....</span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将options参数挂在effectFn上，便于effectFn执行时可以读取到scheduler</span><br>&nbsp;&nbsp;effectFn.options&nbsp;=&nbsp;options<br>}<br></code>
```

**第二行代码**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">trigger</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br><span data-darkreader-inline-color="">//&nbsp;...</span><br><br>&nbsp;&nbsp;effectsToRun.forEach(<span>(<span>effectFn</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当指定了scheduler时，将执行scheduler而不是注册的副作用函数effectFn</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(effectFn.options.scheduler)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effectFn.options.scheduler(effectFn)<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effectFn()<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>}<br></code>
```

是不是简单到离谱？

## 批量更新 & 异步更新

来看段诡异的代码，请问num会被执行多少次？100还是101？

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">num</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>})<br><br>effect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'num'</span>,&nbsp;state.num)<br>})<br><br><span data-darkreader-inline-color="">let</span>&nbsp;count&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span><br><br><span data-darkreader-inline-color="">while</span>&nbsp;(count--)&nbsp;{<br>&nbsp;&nbsp;state.num++<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对于页面渲染来说1到101中间的2~100仅仅只是过程，并不是最终的结果，处于性能考虑Vue只会渲染最后一次的101。

**Vue是如何做到的呢？**

利用可调度性，再加点**事件循环**的知识，我们就可以做到这件事。

1.  num的每次变化都会导致scheduler的执行，并将注册好的副作用函数存入jobQueue队列，因为Set本身的去重性质，最终只会存在一个fn
    
2.  利用Promise微任务的特性，当num被更改100次之后同步代码全部执行结束后，then回调将会被执行，此时num已经是101，而jobQueue中也只有一个fn，所以最终只会打印一次101
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">num</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>})<br><br><span data-darkreader-inline-color="">const</span>&nbsp;jobQueue&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Set</span>()<br><span data-darkreader-inline-color="">const</span>&nbsp;p&nbsp;=&nbsp;<span data-darkreader-inline-color="">Promise</span>.resolve()<br><span data-darkreader-inline-color="">let</span>&nbsp;isFlushing&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;flushJob&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isFlushing)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;isFlushing&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;微任务</span><br>&nbsp;&nbsp;p.then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;jobQueue.forEach(<span>(<span>job</span>)&nbsp;=&gt;</span>&nbsp;job())<br>&nbsp;&nbsp;}).finally(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;结束后充值设置为false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;isFlushing&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;})<br>}<br><br>effect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'num'</span>,&nbsp;state.num)<br>},&nbsp;{<br>&nbsp;&nbsp;scheduler&nbsp;(fn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;每次数据发生变化都往队列中添加副作用函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;jobQueue.add(fn)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;并尝试刷新job，但是一个微任务只会在事件循环中执行一次，所以哪怕num变化了100次，最后也只会执行一次副作用函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;flushJob()<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-color="">let</span>&nbsp;count&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span><br><br><span data-darkreader-inline-color="">while</span>&nbsp;(count--)&nbsp;{<br>&nbsp;&nbsp;state.num++<br>}<br><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 结尾

最近在阅读**霍春阳**大佬的 **《Vue.js技术设计与实现》**，本文的内容主要来源于这本书，强烈推荐对Vue底层实现感兴趣的同学阅读。