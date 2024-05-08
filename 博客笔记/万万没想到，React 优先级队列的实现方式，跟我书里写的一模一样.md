> React 知命境第 33 篇，原创第 138 篇

我曾经写了一本书《JavaScript 核心进阶》，我用**大量文字篇幅以及配套详细视频讲解**，在《V8 的垃圾回收机制底层算法原理》一文中，跟大家介绍了算法上如何从深度优先遍历，转向广度优先遍历。以及为什么广度优先遍历可以做到任务可中断而深度优先遍历做不到。又在《数据结构堆》一文中，跟大家分享了如何利用二叉堆实现优先级队列。

这可就赶巧了，React 的优先级队列的实现方式，居然跟我书里里介绍的方法几乎一样。

## 1

**React 中的优先级队列**

我们来看一下 React 源码里是怎么写的。

在这之前，先瞄一眼二叉堆的可视图形结构如下。这是一个小顶堆。父节点的数字总是比子节点小。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcFUCxT2aVibKwWicHoYLicKSlM5MydOicDBNQ3drY1j8ISat2lQ4q7aDyxu2p2CxMF5IOIpK8apOWQLxg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当我想要插入一个节点时，只能从二叉堆结构的最后一个位置插入。但是他插入进来之后，如果优先级不符合小顶堆/大顶堆的比较规则，则需要调整新节点的位置。因此，新的节点需要跟它的父节点进行优先级的比较，然后根据比较结果调整位置，这个比较可能会发生多次，直到完全符合规则为止。

React 源码里定义了一个 `shftUp` 来实现这个逻辑

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">siftUp</span>(<span>heap,&nbsp;node,&nbsp;i</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>var</span>&nbsp;index&nbsp;=&nbsp;i;<br><br>&nbsp;&nbsp;<span>while</span>&nbsp;(index&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;parentIndex&nbsp;=&nbsp;index&nbsp;-&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;&gt;&gt;&gt;&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;parent&nbsp;=&nbsp;heap[parentIndex];<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(compare(parent,&nbsp;node)&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;The&nbsp;parent&nbsp;is&nbsp;larger.&nbsp;Swap&nbsp;positions.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[parentIndex]&nbsp;=&nbsp;node;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[index]&nbsp;=&nbsp;parent;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index&nbsp;=&nbsp;parentIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;The&nbsp;parent&nbsp;is&nbsp;smaller.&nbsp;Exit.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

从逻辑里来看，React 实现的是一个小顶堆。数字越小，优先级越高。

在这个基础之上，React 又封装了一个更语义化的 `push` 方法来完成任务节点的插入。传入的参数 heap 就是 React 源码里维护的队列。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">push</span>(<span>heap,&nbsp;node</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>var</span>&nbsp;index&nbsp;=&nbsp;heap.length;<br>&nbsp;&nbsp;heap.push(node);<br>&nbsp;&nbsp;siftUp(heap,&nbsp;node,&nbsp;index);<br>}<br>
```

当小顶堆最顶部的元素被删掉之后，二叉堆结构就出现了混乱，我们会首先将树结构中的最后一个节点，补充到堆顶位置。

补充之后，当前的树结构多半不符合小顶堆的特性，因此我们需要将新的堆顶的元素与它子元素进行比较，找到最小子元素并与其交换位置，这个行为，我们可以称之为**下沉**。这个比较可能会发生多次，至少完全符合规则为止。

react 源码里也提供了一个下沉的方法

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">siftDown</span>(<span>heap,&nbsp;node,&nbsp;i</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>var</span>&nbsp;index&nbsp;=&nbsp;i;<br>&nbsp;&nbsp;<span>var</span>&nbsp;length&nbsp;=&nbsp;heap.length;<br>&nbsp;&nbsp;<span>var</span>&nbsp;halfLength&nbsp;=&nbsp;length&nbsp;&gt;&gt;&gt;&nbsp;<span data-darkreader-inline-color="">1</span>;<br><br>&nbsp;&nbsp;<span>while</span>&nbsp;(index&nbsp;&lt;&nbsp;halfLength)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;leftIndex&nbsp;=&nbsp;(index&nbsp;+&nbsp;<span data-darkreader-inline-color="">1</span>)&nbsp;*&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;-&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;left&nbsp;=&nbsp;heap[leftIndex];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;rightIndex&nbsp;=&nbsp;leftIndex&nbsp;+&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;If&nbsp;the&nbsp;left&nbsp;or&nbsp;right&nbsp;node&nbsp;is&nbsp;smaller,&nbsp;swap&nbsp;with&nbsp;the&nbsp;smaller&nbsp;of&nbsp;those.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;right&nbsp;=&nbsp;heap[rightIndex];&nbsp;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(compare(left,&nbsp;node)&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(rightIndex&nbsp;&lt;&nbsp;length&nbsp;&amp;&amp;&nbsp;compare(right,&nbsp;left)&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[index]&nbsp;=&nbsp;right;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[rightIndex]&nbsp;=&nbsp;node;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index&nbsp;=&nbsp;rightIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[index]&nbsp;=&nbsp;left;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[leftIndex]&nbsp;=&nbsp;node;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index&nbsp;=&nbsp;leftIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;<span>if</span>&nbsp;(rightIndex&nbsp;&lt;&nbsp;length&nbsp;&amp;&amp;&nbsp;compare(right,&nbsp;node)&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[index]&nbsp;=&nbsp;right;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;heap[rightIndex]&nbsp;=&nbsp;node;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index&nbsp;=&nbsp;rightIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Neither&nbsp;child&nbsp;is&nbsp;smaller.&nbsp;Exit.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

有了这个方法之后，删除节点的封装就比较简单了

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">pop</span>(<span>heap</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(heap.length&nbsp;===&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>var</span>&nbsp;first&nbsp;=&nbsp;heap[<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;<span>var</span>&nbsp;last&nbsp;=&nbsp;heap.pop();<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;(last&nbsp;!==&nbsp;first)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;heap[<span data-darkreader-inline-color="">0</span>]&nbsp;=&nbsp;last;<br>&nbsp;&nbsp;&nbsp;&nbsp;siftDown(heap,&nbsp;last,&nbsp;<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;first;<br>}<br>
```

React 还提供了一个工具方法 peek，用于获取当前的堆顶元素

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">peek</span>(<span>heap</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;heap.length&nbsp;===&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;:&nbsp;heap[<span data-darkreader-inline-color="">0</span>];<br>}<br>
```

最关键的是优先级的比较方法。非常的简单，就跟 sort 排序需要的参数长得差不多。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">compare</span>(<span>a,&nbsp;b</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Compare&nbsp;sort&nbsp;index&nbsp;first,&nbsp;then&nbsp;task&nbsp;id.</span><br>&nbsp;&nbsp;<span>var</span>&nbsp;diff&nbsp;=&nbsp;a.sortIndex&nbsp;-&nbsp;b.sortIndex;<br>&nbsp;&nbsp;<span>return</span>&nbsp;diff&nbsp;!==&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;?&nbsp;diff&nbsp;:&nbsp;a.id&nbsp;-&nbsp;b.id;<br>}<br>
```

从 compare 方法中，我们可以发现，React 的优先级的比较，会先比较 `sortIndex`，然后比较节点 `id`。我们可以继续通过源码学习他们代表的具体含义来进一步理解这个规则。

## 2

**具体的优先级**

> React 中，有三套不同的优先级机制：事件优先级、Lane 优先级、Scheduler 优先级。他们可以在特定的场景相互转换，我们这篇文章主要探讨 Scheduler 中的优先级规则是如何设计的，在并发模式中，这是最重要的一个部分，Lane 优先级最终也会转换为 Scheduler 的优先级

React 内部有一个方法 `unstable_scheduleCallback`，该方法是专门用来调度任务的

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">unstable_scheduleCallback</span>(<span>priorityLevel,&nbsp;callback,&nbsp;options</span>)&nbsp;</span>{<br>&nbsp;&nbsp;...<br>}<br>
```

在这个方法中，新的任务节点会被创建

```
<span>var</span>&nbsp;newTask&nbsp;=&nbsp;{<br>&nbsp;&nbsp;id:&nbsp;taskIdCounter++,<br>&nbsp;&nbsp;callback:&nbsp;callback,<br>&nbsp;&nbsp;priorityLevel:&nbsp;priorityLevel,<br>&nbsp;&nbsp;startTime:&nbsp;startTime,<br>&nbsp;&nbsp;expirationTime:&nbsp;expirationTime,<br>&nbsp;&nbsp;sortIndex:&nbsp;<span data-darkreader-inline-color="">-1</span><br>};<br>
```

我们可以看到，id 属性是一个递增值，这个就比较好理解。

`sortIndex` 的默认值为 -1，但是他后续的逻辑会因为 `startTime 与 currentTime` 的比较结果重新赋值

```
<span>if</span>&nbsp;(startTime&nbsp;&gt;&nbsp;currentTime)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;This&nbsp;is&nbsp;a&nbsp;delayed&nbsp;task.</span><br>&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;startTime;<br>&nbsp;&nbsp;push(timerQueue,&nbsp;newTask);<br>&nbsp;&nbsp;...<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;expirationTime;<br>&nbsp;&nbsp;push(taskQueue,&nbsp;newTask);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;wait&nbsp;until&nbsp;the&nbsp;next&nbsp;time&nbsp;we&nbsp;yield.</span><br>&nbsp;&nbsp;...<br>}<br>
```

所以这里的三个时间 `startTime` `currentTime` `expirationTime` 就非常关键，我们要去一一搞清楚他们都是干什么的。

先来看看 **currentTime** 的逻辑

```
<span>var</span>&nbsp;currentTime&nbsp;=&nbsp;getCurrentTime();<br>
```

```
<span data-darkreader-inline-color="">/*&nbsp;eslint-disable&nbsp;no-var&nbsp;*/</span><br><span>var</span>&nbsp;getCurrentTime;<br><span>var</span>&nbsp;hasPerformanceNow&nbsp;=&nbsp;<span>typeof</span>&nbsp;performance&nbsp;===&nbsp;<span data-darkreader-inline-color="">'object'</span>&nbsp;&amp;&amp;&nbsp;<span>typeof</span>&nbsp;performance.now&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>;<br><br><span>if</span>&nbsp;(hasPerformanceNow)&nbsp;{<br>&nbsp;&nbsp;<span>var</span>&nbsp;localPerformance&nbsp;=&nbsp;performance;<br><br>&nbsp;&nbsp;getCurrentTime&nbsp;=&nbsp;<span><span>function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;localPerformance.now();<br>&nbsp;&nbsp;};<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;<span>var</span>&nbsp;localDate&nbsp;=&nbsp;<span data-darkreader-inline-color="">Date</span>;<br>&nbsp;&nbsp;<span>var</span>&nbsp;initialTime&nbsp;=&nbsp;localDate.now();<br><br>&nbsp;&nbsp;getCurrentTime&nbsp;=&nbsp;<span><span>function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;localDate.now()&nbsp;-&nbsp;initialTime;<br>&nbsp;&nbsp;};<br>
```

这里做了一个 `performance.now()` 与 `Date.now()` 的兼容处理。可能会涉及到部分同学的知识盲区。这里给大家额外科普一下

`perfomance.now()` 返回值表示从**时间源**开始算起，到调用该方法时所经历的时间。单位是 ms。一般来说，当全局对象是 `Window` 时，时间源会从创建页面上下文开始算起。

而 `Date.now()` 的时间源是从 `1970 年 1 月 1 日 00:00:00 (UTC)` 开始算起。因此，React 源码里，会在 JS 逻辑里重新定义一个初始时间源，然后用调用时的当前时间减去初始时间源，这样他们所表达的含义就基本一致了。

所以，`getCurrentTime()` 表达的含义为，页面创建之初，到当前我调用该方法时，这中间经历的时间（ms）。

我们再来看 **startTime** 的含义

他的逻辑如下

```
<span>var</span>&nbsp;startTime;<br><br><span>if</span>&nbsp;(<span>typeof</span>&nbsp;options&nbsp;===&nbsp;<span data-darkreader-inline-color="">'object'</span>&nbsp;&amp;&amp;&nbsp;options&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;<span>var</span>&nbsp;delay&nbsp;=&nbsp;options.delay;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;(<span>typeof</span>&nbsp;delay&nbsp;===&nbsp;<span data-darkreader-inline-color="">'number'</span>&nbsp;&amp;&amp;&nbsp;delay&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;startTime&nbsp;=&nbsp;currentTime&nbsp;+&nbsp;delay;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;startTime&nbsp;=&nbsp;currentTime;<br>&nbsp;&nbsp;}<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;startTime&nbsp;=&nbsp;currentTime;<br>}<br>
```

可以看到，startTime 基本上都是等于 `currentTime`，不过当 unstable\_scheduleCallback 传入合理的 delay 时，则会在 currentTime 的基础之上，加上 delay 的值，例如

```
unstable_scheduleCallback(NormalPriority,&nbsp;cb,&nbsp;{&nbsp;delay:&nbsp;<span data-darkreader-inline-color="">2000</span>&nbsp;});<br>
```

最后我们来看一下 `expirationTime` 的逻辑，发现他最终的值与 priorityLevel 有关

```
<span>var</span>&nbsp;timeout;<br><br><span>switch</span>&nbsp;(priorityLevel)&nbsp;{<br>&nbsp;&nbsp;<span>case</span>&nbsp;ImmediatePriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;IMMEDIATE_PRIORITY_TIMEOUT;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br><br>&nbsp;&nbsp;<span>case</span>&nbsp;UserBlockingPriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;USER_BLOCKING_PRIORITY_TIMEOUT;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br><br>&nbsp;&nbsp;<span>case</span>&nbsp;IdlePriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;IDLE_PRIORITY_TIMEOUT;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br><br>&nbsp;&nbsp;<span>case</span>&nbsp;LowPriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;LOW_PRIORITY_TIMEOUT;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br><br>&nbsp;&nbsp;<span>case</span>&nbsp;NormalPriority:<br>&nbsp;&nbsp;<span>default</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;NORMAL_PRIORITY_TIMEOUT;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>}<br><br><span>var</span>&nbsp;expirationTime&nbsp;=&nbsp;startTime&nbsp;+&nbsp;timeout;<br>
```

那我们再往上追溯一下几个常量的值。

```
<span data-darkreader-inline-color="">//&nbsp;表示已经到期，立即执行</span><br><span>var</span>&nbsp;IMMEDIATE_PRIORITY_TIMEOUT&nbsp;=&nbsp;<span data-darkreader-inline-color="">-1</span>;<br><br><span>var</span>&nbsp;USER_BLOCKING_PRIORITY_TIMEOUT&nbsp;=&nbsp;<span data-darkreader-inline-color="">250</span>;<br><span>var</span>&nbsp;NORMAL_PRIORITY_TIMEOUT&nbsp;=&nbsp;<span data-darkreader-inline-color="">5000</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;设置一个大值，表示永不过期</span><br><span>var</span>&nbsp;LOW_PRIORITY_TIMEOUT&nbsp;=&nbsp;<span data-darkreader-inline-color="">10000</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;Tasks&nbsp;are&nbsp;stored&nbsp;on&nbsp;a&nbsp;min&nbsp;heap</span><br><span>var</span>&nbsp;IDLE_PRIORITY_TIMEOUT&nbsp;=&nbsp;maxSigned31BitInt;<br>
```

那么此时任务过期时间 `expirationTime` 所代表的含义就非常明确了。

这样，我们再回过头来去看优先级比较的 `sortIndex` 逻辑

```
<span>if</span>&nbsp;(startTime&nbsp;&gt;&nbsp;currentTime)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;This&nbsp;is&nbsp;a&nbsp;delayed&nbsp;task.</span><br>&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;startTime;<br>&nbsp;&nbsp;push(timerQueue,&nbsp;newTask);<br>&nbsp;&nbsp;...<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;expirationTime;<br>&nbsp;&nbsp;push(taskQueue,&nbsp;newTask);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;wait&nbsp;until&nbsp;the&nbsp;next&nbsp;time&nbsp;we&nbsp;yield.</span><br>&nbsp;&nbsp;...<br>}<br>
```

我们可以得出如下结论

首先，`sortIndex` 值越大，优先级越低。

其次，React 源码里会维护两个队列。

```
<span>var</span>&nbsp;taskQueue&nbsp;=&nbsp;[];<br><span data-darkreader-inline-color="">//&nbsp;Incrementing&nbsp;id&nbsp;counter.&nbsp;Used&nbsp;to&nbsp;maintain&nbsp;insertion&nbsp;order.</span><br><span>var</span>&nbsp;timerQueue&nbsp;=&nbsp;[];&nbsp;<br>
```

当我们在调度一个任务时，如果传入 delay 值，任务会进入 timerQueue，优先级 由 delay 决定，当 delay 值越大，优先级越低。

如果不传入 delay， 任务会直接进入 taskQueue，优先级由上面几个常量值来决定，值越大，优先级越低。

timerQueue 中的任务，会结合 setTimeout，在 delay 结束时 push 到 `taskQueue` 中。然后根据优先级执行。

阅读过我在 《JavaScript 核心进阶》 中的 Event Loop 章节的同学应该可以联想到，这里的 timerQueue，跟我们在事件循环里的讲的 `[[PromiseFulfillReactions]]` 队列非常相似。

这就是 React 的优先级调度器逻辑。

有了这一套基础逻辑，我们就可以在此基础之上，非常方便的实现

-   高优先级插队
    
-   任务切片
    
-   任务中断
    
-   任务延迟
    

这里就不再继续扩展，留给大家去探索。

## 3

**思考**

不知道大家有没有玩过网易的手游**阴阳师**。一个回合制游戏，这个游戏的战斗画场景中，出手顺序是按照角色/式神的**速度属性**值来决定的，速度越快，越早出手。但是呢，这个游戏还设定了一个非常有意思的机制，那就是他给场上角色设置了一个出手进度条，你速度越快，进度条跑得就越快，谁跑得越快，就越早出手。除此之外，还有很多技能可以提高进度条的进度，也可以有技能击退别人的进度条。这个机制给 PK 带来了非常多的新玩法

比如，速度慢的出手优先级，会**随着时间的推移变得越来越高**。理解这个现象非常的重要，但是在我们刚才的实现机制中其实已经做到了这一点。因为 `getCurrentTime` 获取到的时间，会随着时间的推移变得越来越大，因此新任务的 `currentTime` 总比老任务更大，优先级就更低。

又比如，速度快的，可能出手了两次，速度慢的，都没机会出手。我们可以用优先出手的式神释放一个技能去击退目标的进度条，去降低他的出手优先级。也就是说，我们可以在优先级高的任务逻辑里，**击退**低优先级任务的 `expirationTime`，让它的优先级进一步变低，这样它就有可能总是会被高优先级的任务插队。

因此，我们可以借鉴 react 里的任务调度机制来实现阴阳师战斗的这个逻辑。

我的解释可能不那么详细，不过玩过阴阳师的朋友估计能理解我大概说的是什么，可以思考一下这个机制的具体实现，想清楚了拿下**网易的 offer** 没难度！

> **「React 知命境」** 是一本从知识体系顶层出发，理论结合实践，通俗易懂，覆盖面广的精品小册，欢迎关注我的公众号，我会持续更新，[购买 React 哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)，或者赞赏本文 30 元，可进入 React 付费讨论群，学习氛围良好，学习进度加倍

> 另：点击阅读原文，可购买我的付费小册《JavaScript 核心进阶》