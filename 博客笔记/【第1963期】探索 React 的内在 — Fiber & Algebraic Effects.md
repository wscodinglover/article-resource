前言

今日早读文章由WPS前端工程师@Shockw4ver投稿分享。

> @Shockw4ver,热爱技术原理探索，尤其对具体实现之上的概念、模式等抽象意义较强的领域感兴趣，通过理解各种框架的内在理念来优化具体的代码。重视质量，热衷于在架构过程中实践各种理论，并寻找到“最优解”，提升的可扩展性和可维护性。技术座右铭：未经审视的代码是不值得写的...

正文从这开始~~

#### Fiber

对于大部分前端开发者来说，在谈到 Fiber 的时候，第一反应想到的大概就是 React 的“新” Reconciler 架构

然而，就 Fiber 本身来说，在计算机领域并非多么新潮的概念，其早在 1996 年就红极一时，在不同的应用中有各种各样的实践，其中最负盛名的大概就是 Microsoft Windows 中的用户线程架构了（还有 Symbian OS 哦）

那么我们就从 Fiber 本身触发，来理解一下它到底是干什么的

#### 先抬个大概出来

简单来说，Fiber 是一种关注程序“执行”的泛模型（generic model），其思想是让不同的执行单元（unit of execution）更好的协同工作（work together cooperative）

#### 类比理解——光纤（Optical Fiber）

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/meG6Vo0MevjQTDJKWkjZVG5hDmicdtf0xpjia95icBUjvU4dFYiaX1kPb9F3PMQHw24HVoczSNLQ2TbHZomiaucGYpw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

如图，光纤的原理就是在同一管道内集成多束光导纤维，然后在终端将反射过来的信号聚合

显而易见，在光纤中的“程序执行”就是传输这一过程，那么优化这个过程的思路就是调整材质、单位管道内纤维密度等因素了，由此则衍生出了各种各样的光纤类型，如红外光纤、掺氟光纤、复合光纤等等，在效率、功耗上各不相同

#### 回过头来

提取上图的灵魂，用前面提到 Fiber 的几个概念，大致可以总结为下图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Emm...

> Fibers 描述的概念和协程就一回事儿。如果非要整出个差别，那就是协程是语言级的实现，是一种控制流；而 fibers 是系统级的实现，表现为线程的并行。业界一直在吵吵这两个概念的优先级：fibers 到底是协程的一种具体实现，还是实现的协程的一种基质 译自 wikipedia

Emm x2...

好了，先别管业界的吵吵，现在协程才是主角，我们来消费一下主角

#### 协程（Coroutines）

什么是协程呢？

> 协程是一种通过管理子程序的暂停（挂起）和恢复来实现非抢占式多任务处理的计算机程序 译自 wikipedia

我们提取一下这段话的两个要点：

-   管理子程序（subroutine）……的计算机程序：Emm x3，看来是程序管程序，比线程要轻量一些了
    
-   非抢占式：不抢占资源，那一定存在某种共享，但又不开线程，那子程序就需要在相应的时刻让出（yield）资源
    

由此，我们总结出如下的示意：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这就比较清晰了，协程就是通过主程序管理子程序调用（call）和让出（yield）来决定当前的运行时处理哪部分内容：资源让出的时候，当前子程序挂起，等到资源被释放回来的时候，又恢复执行，从而通过合理使用资源实现了多任务处理

PS：显然这里的“多任务”并非指的是并行，而是类似于并发的意义。并行是系统级的多线程（进程）同时运行，而协程只是在线程的基础上充分利用资源来达到多任务处理的效果，理论上协程本身依然是单线程的；当然，也有一些跨线程的协程应用，但这已经脱离了协程本身，我们不作展开

#### JavaScript？

诶，既然提到了单线程，那么就不得不让人想起 JavaScript 这门语...

Emm x4... 这好像才是主题

#### React 做的事

尬不多说

经过前面的铺垫，我们大致已经知道，React 就是在其运行时里面搞了个协程，而协程实际上多应用于系统级或是后端的程序调度中，是什么样的契机使它来到了 React 中呢？

我们从以下两个原因深入来探索一下

-   优化思路
    
-   历史原因
    

##### 优化思路

前端的落地语言主要是 JavaScript，而 JavaScript 的运行时是单线程的，优化单线程的调度，协程是 比较不错的思路

进一步的，浏览器的刷新频率为 60 fps，也就是说每一帧的消耗掉的时间为 1s/60 ≈ 16ms。而所谓的优化，则是尽量在这 16ms 中做尽量多有意义的事

而什么是有意义的事呢？让用户舒服就是有意义的事🙂

顺着这个思路，我们往下走

##### 历史原因

顺着上文（Emm x5... 就是前一句）的思路，既然 React 实现 Fiber 就是要通过协程优化这 16ms，也就是让用户舒服，那在 Fiber 出现之前，是不是曾让用户不舒服了呢？对，至少在 FB 工程师眼里，React 让用户不舒服了，而这一切都源自于 React 的前任 Reconciler —— Stack Reconciler

我们来消费一下它

##### Stack Reconciler

PS：由于懒，以下都简称 Stack

顾名思义，Stack 就是通过栈的方式实现任务的调度，所以它的原理很容易示意：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如图所示，Stack 的原理就是将一堆任务给压入了一个栈中，而浏览器每次绘制的时候，都会执行这个栈中已经注册的任务，而这些任务显然就是 JavaScript 脚本

然而，我们知道浏览器这每一帧的时间极其短暂，其中对用户来说最有意义的并非这些脚本的执行，因为他们并不关心代码是怎么运行的，只关心页面展示出了什么东西——即有关于绘制页面的一切——剩下的 css 树重新计算、dom 树重新计算、paint

那么，如果脚本的执行时间过长，超过了 16ms，或者说是占有了其他三个绘制页面相关任务的执行机会，就会导致浏览器在这一帧里没有绘制页面，也就是所谓的掉帧！

再来看图，Stack 这种架构的特点就是，所有任务都按顺序的压入了栈中，而执行的时候无法确认当前的任务是否会耗去过长的脚本运行时间，使得这 16ms 里浏览器能做的事不可控，甚至让 fetch data 这类实时意义很大的任务要等很久才能执行。

如此一来，我们想要的就是：

-   让该先行的逻辑先行——即使得 fetch data 这类任务的优先级更高
    
-   让浏览器能尽量在每一帧中都可以进行页面绘制——想办法让 JavaScript 的执行不影响到绘制任务
    

Ok，那么就来想想怎么解决它们：

优先级：我们给每类任务定义不同的优先级，来决定谁先上车（进 16ms），假设就是如下这种形式：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">FetchTask</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  tag</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'sideEffect'</span><span data-darkreader-inline-color="">,</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  priority</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'high'</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">ComputeTask</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  tag</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'compute'</span><span data-darkreader-inline-color="">,</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  priority</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'middle'</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">DomTask</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  tag</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'dom-update'</span><span data-darkreader-inline-color="">,</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  priority</span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">'low'</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

缩短 16ms 中 JavaScript 占有的时间：

Emm x6... 这个怎么搞呢？毕竟 JavaScript 操控着整个页面的逻辑诶...

如果低优先级的任务可以把执行权让给高优先级的任务，而这整个执行过程又可以在 16ms 中让出时间给绘制任务

Emm x7...

让过去让过来的，那不就是前面提到的

协程嘛！

#### Fiber Reconciler

PS：以下 Fiber Reconciler 统一简称为 Fiber，原因同上

终于要开始消费 Fiber 了

其实到现在，算上优化无止境这一永恒真理，我们基本已经明白了 Fiber 的目标就是：

-   合理布置逻辑的运行
    
-   尽量不阻塞浏览器的绘制，最大限度的减少的掉帧的可能
    

我们来看一个示意图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这张图是 Lin Clark 在 React Conf 2017 上展示出的新旧 reconciler 对比，左边是 Stack 右边是 Fiber

我们可以很明显地看到，Stack 这边掉帧非常严重，而 Fiber 却很柔顺，对，《柔顺》

那么 Fiber 到底是怎么做的呢？

##### 设计原则

我们提炼一下官方给出的一些相关内容，大致可得：

-   更新 UI 是一件相当耗时的事情，而并不是每一次更新都需要立即的呈现出来；过多的执行 UI 的更新可能引起掉帧，影响用户体验；
    
-   不同类型的 UI 更新应该有不同的优先级，比如，相比把数据呈现到界面上，连续的动画具有更高的绘制优先权，一旦数据更新占用了过场的时间，就会导致动画掉帧，而 React 则做了一些事情来使得更新操作可以延迟执行，不打断动画的发挥
    
-   React 使用 pull-based 的方式来使得计算在必要的时候才执行
    
-   React 这个名字取得很差，应该叫 Dispatch 🙂
    

##### 探索

说到底，React 是一个构件用户界面的库，所以它所有的原则都建立在对 UI 的控制上，也就是说，React 的优先级定义，都是针对 UI 进行的

由于无论业务逻辑如何花里胡哨，最终都是会反应到 UI 上，因此专注于 UI 会让优化显得更加纯粹有效 好了，我们知道 React 给更新任务分了优先级，那么它到底是怎么实现协程的呢？

PS ：以下内容在不同的平台实现方式也不一样，本文仅讨论 react-dom

这就要提到两个重点 API 了

-   requestAnimationFrame
    
-   requestIdleCallback
    

###### requestAnimationFrame

实际上，这个 API 在前端世界可谓是曝光率极高了，它的作用就是将传入的 callback 在下一帧开始时立即执行

有时候，我们甚至会忌惮于框架本身的性能从而选择用它来实现一些 UI 的更新

而 React 则利用了它，在每一帧的浏览器任务开始的时候，将高优先级的任务从任务队列中 pull 下来（还记得之前说的 pull-based 吗？）

这样就使得该先行的任务尽量优先的执行

###### requestIdleCallback

这是个相当机灵的 API，我们看看 MDN 上的定义

> window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。by MDN

哈（讲道理这段话的翻译是不是该补点语文？好在大致能 get）！

也太机灵了吧！

对，Fiber 就是通过它使得低优先级的任务可以让出资源来供高优先级的任务和浏览器绘制先行，如果这些任务耗尽了这帧的时间，那低优先级的任务就会被排到下次帧空闲的时候执行

##### 浪里个浪

总结前面的内容，我们尝试画出 Fiber 的示意：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

分三步来分析这个图：

-   我们可以看到，低优先级的任务都是在 16ms 中的最后一段时间（Idle）内执行，这是基于浏览器在这段时间开始前已经结束了 high 和 paint 两种任务，简单来说就是已经完成了让用户舒服的事情，可以得闲做点儿剩余工作了
    
-   再看：
    

-   high 类型的任务来自于 requestAnimationFrame 中的回调
    
-   相应地 low 类型的任务则来自 requestIdleCallback 的回调
    

而他们都会在需要自己的执行的时候，从 Fiber 的队列中 pull 任务下来，这就是前面提到的，pull-based 让计算可以在需要执行的时候才执行

最后，顶层的 Fiber 队列里存储着一大堆的 FiberNode，它们都是我们在触发 UI 更新逻辑后所得的产物。其实这个队列的结构相当复杂，但我们这里不作展开，只提一下里面很关键的两个因素

我们知道，React 组件的展示是由其 props 和 state 来控制的，那么对于最终的 DOM 呈现，我们可以将 props 和 state 都视为 props

在 Fiber 中包含了一个 pendingProps 和 memorizedProps 状态，其中：

-   pendingProps 定义于执行更新开始的时候
    
-   memorizedProps 则在执行更新结束（暂停）的时候
    

而我们知道，更新时，低优先级的任务的执行资源会被让出，也就是说整体的更新执行会被暂停，这就是 memorizedProps 被定义的时机；而到了下次恢复这次整体的更新时，Fiber 会对比 memorizedProps 和新定义的 pendingProps，如果相等，则复用上次更新的结果，这就是所说的 Fiber 复用已完成任务结果的方式

而这里又会引出另一个问题，既然是暂停，那么恢复之后应当继续执行当前的任务嘛，怎么会涉及到 props 的对比呢？

我们下面就进入 Algebraic Effect 的相关内容来解答它

#### Algebraic Effect

Algeraic Effect 翻译过来为代数效应（以下都用中文代称），听起来貌似是一个很数学的概念

其实呢，代数效应本身是一种抽象的机制，在函数式编程的范式中应用得比较多，所以显得很数学化，我们来看看论文《Handling Polymorphic Algebraic Effects》中是怎么介绍它的：

> 运行时系统会在某个效应产生的时候，寻找离这个产生的效应最近的处理器来处理它；如果这个处理器存在，那么它将根据导致效应产生的参数及本身的计算续体执行对应的操作。计算续体使得运行时可以应用这一系列操作产生的结果来恢复效应产生前的计算。译自《Handling Polymorphic Algeraic Effects》

我们提取几个关键点来解构一下这个概念

-   效应（Effect）,这个概念描述的是代数产生的相关效应
    
-   处理器（Handler）,这个概念描述的是处理代数效应的相关逻辑
    
-   计算续体（Continuation）,它使得计算可以在某个效应的处理结束后延续之前的逻辑
    
-   恢复（Resume）,对应的，计算必定能够“暂停”
    

啊，这样我们好像就可以用个图来表示一下了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，对于一个函数 f(x, y, z)，在正常的流程下，运行时只需要计算出 x + y - z 即到达终点，也就是得到函数的返回值

那么来看右边，当 a、b 两个因素导致了产生在 x 上的一个效应的时候，x 的处理器 f(a, b) 则被调用，得到一个新的 x，而这个新的 x 作为这次效应处理的结果，被恢复到了 A Computation 中产生该效应的位置，参与剩余的计算

在 JavaScript 语境下，许多解释代数效应的文章都使用了 try/catch 块来帮助理解（其实都是在抄 Dan Aramov 那篇文章罢了）

这里也稍微提一下，来看这么一段代码：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> A_Computation</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> getX</span><span data-darkreader-inline-color="">()</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

我们看到，当这个函数进行的时候，x 是从 getX 这个方法中拿取的，也就是说，x 的值由 getX 的返回值决定，那么如果这个 getX 有产生错误，即 throw Error 的可能，我们或许就要这么写：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> A_Computation</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">try</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> getX</span><span data-darkreader-inline-color="">()</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">}</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">catch</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">E</span><span data-darkreader-inline-color="">)</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">// TODO</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

上面代码的意义就是，对 try 块中捕获到的错误，由 catch 块进行处理

这句话换个说法就可以是：对 try 块中因 getX 抛出错误产生的效应，使用 catch 进行处理

啊，有那味儿了，那么设想一下，如果有这么一种语句：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> A_Computation</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  effect </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    getX</span><span data-darkreader-inline-color="">()</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">}</span><span data-darkreader-inline-color=""> handle </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">if</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">getX</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">        resume parseInt</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">Matn</span><span data-darkreader-inline-color="">.</span><span data-darkreader-inline-color="">random</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">*</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">}</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">else</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      resume getX</span><span data-darkreader-inline-color="">()</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> getX</span><span data-darkreader-inline-color="">()</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

这段目前并不存在的语法表示的是，对于 getX 产生的效应，由 handle 块进行处理，并加上了一些逻辑，最后通过 resume 运算符将结果再恢复到函数的执行中，那么如此一来，我们的 x 就永远不会大于 3 了

这基本就是代数效应所蕴含的东西了

#### React 又做了啥？

到现在，我们阐释了代数效应的一些基本机制，但是这和 React 有什么关系呢？

Emm x7...

你可能已经想到了，对，就是那个！

当当当当... React Hooks!

##### Hooks

我们来看看 hooks 是怎么使用的：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">AComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useState</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  useEffect</span><span data-darkreader-inline-color="">(()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">if</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">x </span><span data-darkreader-inline-color="">&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      setX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">parseInt</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">Math</span><span data-darkreader-inline-color="">.</span><span data-darkreader-inline-color="">random</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">*</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">))</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">},</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">])</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;h1&gt;</span><span data-darkreader-inline-color="">{</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">}&lt;/</span><span data-darkreader-inline-color="">h1</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

Yes！我们仅仅是将前面那段并不存在的语法用 Hooks 进行了某种转义！

A\_Computation 的 x 值由 getX 决定，而 AComponent 的 x 值由 hook useState 决定初始值，并根据该 hook 返回的 setX 进行修改，那么我们就可以说，setX 是使得 x 产生效应的一个因素；而对于由 x 产生的效应，我们使用了 hook useEffect 进行处理，并且将 x 传入了该 hook 的依赖列表里，并且是唯一了，那么我们就可以说，这个 useEffect 就是 x 的处理器了，从而我们可以进一步封装：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> useX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">initial</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> max</span><span data-darkreader-inline-color="">)</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useState</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">initial</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  useEffect</span><span data-darkreader-inline-color="">(()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">if</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">x </span><span data-darkreader-inline-color="">&gt;</span><span data-darkreader-inline-color=""> max</span><span data-darkreader-inline-color="">)</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      setX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">parseInt</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">Math</span><span data-darkreader-inline-color="">.</span><span data-darkreader-inline-color="">random</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">*</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">))</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">},</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">])</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">AComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;h1&gt;</span><span data-darkreader-inline-color="">{</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">)&lt;/</span><span data-darkreader-inline-color="">h1</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

这样以来，我们的 x 作为一个具有效应及效应处理器的代数，不仅为 AComponent 服务，还可以被复用于其他组件了

##### Resume 呢？

Emm x8...

好了，我们现在已经看到 React 用 Hooks 完成代数效应的的效应和处理器两个因素，那么 resume 呢？这似乎才是代数效应最具魔力的地方，怎么开启这个特性呢？

答案是：

JavaScript 有个🔨的 resume...

Emm x9...

所以，既然没能 Resume，那就把函数再执行一遍呗...

Emm x10...

这就解释了前面那个遗留的问题，即为什么会有 pendingProps 和 memorizedProps 的对比这一操作的存在，重新执行一遍函数，如果没有新旧状态的对比，那一旦状态庞大又复杂，效率将很低下，所以这个也是 Fiber 做的一个优化

#### 我们可以做哪些优化？

React 在底层搞了个 momorizedProps 来缓存状态，在上层，则向开发者提供了 useMemo 和 useCallback 两个 hooks 进行手动的优化，它们的使用方式也很简单，我们先举一个例子：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">AComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">y</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setY</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useY</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> xMulti5 </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">*</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">5</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> plusX</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    setX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">h1 onClick</span><span data-darkreader-inline-color="">={</span><span data-darkreader-inline-color="">plusX</span><span data-darkreader-inline-color="">}&gt;{</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> xMulti5 </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">}&lt;/</span><span data-darkreader-inline-color="">h1</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

可以看到，这个组件包含了一个根据 x 的值改变的 xMulti5 变量和一个改变 x 值 的方法 plusX，根据我们目前所知道的，这个组件（函数）在产生效应的时候，会被重新（装载）一次，也就是说，即便是来自于 y 的效应，也会引起 xMulti5 和 plusX 被不断的重新定义—— plusX 甚至是永远需要重新定义的——一旦组件量多起来，这对 JavaScript 的引擎进行垃圾回收（GC）就是一个挑战了。因此我们需要让它们只在该重新定义的时候才重新定义，那么用 useMemo 和 useCallback 改造一下这个组件：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">AComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setX</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useX</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">y</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> setY</span><span data-darkreader-inline-color="">]</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useY</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">0</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">3</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> xMulti5 </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useMemo</span><span data-darkreader-inline-color="">(()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">*</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">5</span><span data-darkreader-inline-color="">,</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[</span><span data-darkreader-inline-color="">x</span><span data-darkreader-inline-color="">])</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> plusX </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useCallback</span><span data-darkreader-inline-color="">(()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">set</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">1</span><span data-darkreader-inline-color="">),</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">[])</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">h1 onClick</span><span data-darkreader-inline-color="">={</span><span data-darkreader-inline-color="">plusX</span><span data-darkreader-inline-color="">}&gt;{</span><span data-darkreader-inline-color=""> x </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> xMulti5 </span><span data-darkreader-inline-color="">+</span><span data-darkreader-inline-color=""> y </span><span data-darkreader-inline-color="">}&lt;/</span><span data-darkreader-inline-color="">h1</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

这样一来，xMulti5 仅在 x 发生改变的时候才会刷新值，而 plusX 则没有任何改变的理由（一定不能忘了这个空数组）了

##### Suspense

这里再提一下 React.Suspense 是怎么一回事儿

我们知道 React.Suspense 有一种很优雅的使用方式来实现动态组件的加载：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">UserInterface</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">import</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">'some-component'</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">SuspensedComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">React</span><span data-darkreader-inline-color="">.</span><span data-darkreader-inline-color="">Suspense</span><span data-darkreader-inline-color=""> fallback</span><span data-darkreader-inline-color="">={&lt;</span><span data-darkreader-inline-color="">Loading</span><span data-darkreader-inline-color="">&gt;&lt;/</span><span data-darkreader-inline-color="">Loadin</span><span data-darkreader-inline-color="">&gt;}&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">        </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">UserInterface</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">/&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">&lt;/</span><span data-darkreader-inline-color="">React</span><span data-darkreader-inline-color="">.</span><span data-darkreader-inline-color="">Suspense</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

这个组件能够在页面下载 UserInterface 组件完成前显示一个 Loading 组件，前面我们说到了，React 提供的 hooks 为实现代数效应做了一些 hacks，那么 hooks 本身是啥呢？那不也是函数嘛...

hooks 是函数，组件也是函数，那 hooks 实现了代数效应，组件显然也可以嘛

我们再来遐想一种不存在的编写方式：

```
<ol data-darkreader-inline-color=""><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">Suspense</span><span data-darkreader-inline-color="">({</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  fallback</span><span data-darkreader-inline-color="">,</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  children</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">})</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">Child</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> useComponent</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">children</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">Child</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">?</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">Child</span><span data-darkreader-inline-color="">&gt;&lt;/</span><span data-darkreader-inline-color="">Child</span><span data-darkreader-inline-color="">&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">:</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span><span data-darkreader-inline-color=""> fallback </span><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">const</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">UserInterface</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">=&gt;</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">import</span><span data-darkreader-inline-color="">(</span><span data-darkreader-inline-color="">'some-component'</span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">SuspensedComponent</span><span data-darkreader-inline-color="">()</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">{</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">return</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">(</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">      </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">Suspense</span><span data-darkreader-inline-color=""> fallback</span><span data-darkreader-inline-color="">={&lt;</span><span data-darkreader-inline-color="">Loading</span><span data-darkreader-inline-color="">&gt;&lt;/</span><span data-darkreader-inline-color="">Loadin</span><span data-darkreader-inline-color="">&gt;}&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">        </span><span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">UserInterface</span><span data-darkreader-inline-color=""> </span><span data-darkreader-inline-color="">/&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">    </span><span data-darkreader-inline-color="">&lt;/</span><span data-darkreader-inline-color="">Suspense</span><span data-darkreader-inline-color="">&gt;</span></code></span></span></p></li><li data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">  </span><span data-darkreader-inline-color="">)</span></code></span></span></p></li><li data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span data-darkreader-inline-color=""><span><code data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">}</span></code></span></span></p></li></ol>
```

大概就可以这么理解了

当然了，实际的 Suspense 比这个强大多了，也不只是用于动态的加载组件，还可以处理一些异步的状态流，有兴趣的同学可以移步 FB 官方出的状（钩）态（子）管理库 Recoil

#### Class Component

别把 class component 忘了...

既然要重新执行一遍函数——换成更加 React 化的说话，则是重新装载一遍组件——势必就会造成组件本身逻辑的再执行，对于 class component，就会表现为生命周期的多次执行了，但有时候我们会把生命周期写得过于复杂。为解决这个问题，在提倡函数式组件的同时，React 也在筹备着去掉几个相关的生命周期，当前版本下的 componentWillMount 已经被标记为 UNSAFE\_componentWillMount，而相应的 componentWillReceiveProps 被标记上 UNSAFE 后，更是倡导使用新的 static getDerivdStateFromProps 进行替换

那么 class component 这么麻烦，我们要放弃使用它吗？

完全不用（不用放弃，不用放弃，手动消除歧义）...

既然 React 官方是在对 class component 的声明周期进行优化，而不是完全的去掉这种编写方式，说明生命周期依然是一个很优秀的抽象（如果有一天 React 真去掉了 class component，多半会有什么 react-lifecycle 这种抽象出现，你信不信？）

再者，没了 class component，HOC 不就拉了吗... 什么修饰器、反向继承这些东西的功能，估计就得用不那么优雅的方式实现了

不过有了 Hooks，以前必须使用 HOC 进行的一些事情，有了更好的解决方式，这一切都基于开发者对具体逻辑的理解了

#### 总结

在 Fiber 部分，我们梳理了 Fiber 是如何通过协程来让任务更好的运行的；在代数效应部分，我们又阐释了这些任务是如何产生的

所以我们可以总结为：React 通过代数效应产生一系列的任务，并交付 Fiber 去决定这些任务的执行时机，实现了一种类似于协程的调度优化

不得不说，React 简直就是在 JavaScript 的基础上实现了一个自我的运行时

Emm x10... 不用简直，Dan Abramov 曾用一篇 post 来专门阐述了这个概念

而蕴含在这个概念里的东西，无论是组件还是 hooks，其实都是以函数作为载体，这也印证了 React 在逐步向函数式编程的道路上回归

因此，在 React 下进行应用开发的时候，函数式编程的思想有着非常重要的意义——我们经常会说要优化代码来讨好运行时，那么将组件进行在合理的前提下进行高粒度的函数式解构，不就是在讨好 Fiber 这一 React 的内在运行时吗，我们的应用自然会被 React 更好的照顾

同时，class component 的存在，也给了我们对于不同的逻辑进行不同的抽象的思路。有时候，函数式编程带来的心智负担，比面向对象的范式要重很多——面向对象有时候被阐释为对真实世界的抽象，那么其内在必然是尽量符合开发者在真实世界的思维逻辑的，这对代码的设计和可扩展性都有很重要的意义；而函数式编程相比之下，就有些学术化了，如果在没有足够的理论知识的支撑下强行去全盘的践行这种范式，可能会陷入某种泥潭

毕竟我们经常看到社区里吐槽 React FP 很糟糕，在他们吐槽这种设计理念的同事，愤怒是否是来源于泥潭之下呢？😬😬😬

Anyway, if you like, you will always get.

关于本文 作者：@Shockw4ver 原文：https://www.yuque.com/docs/share/a142f6d5-114a-4924-8d96-17edea329357

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为你推荐  

[【第1945期】彻底搞懂React源码调度原理（Concurrent模式）](http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651236611&idx=1&sn=c908931b15b7981e0c52e972a9e6ed07&chksm=bd4970878a3ef991024f4410c853a65997010183cabb068a8f3e99f71fd0aada3b98276efccc&scene=21#wechat_redirect)  

[【第1530期】React Fiber架构](http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651231450&idx=1&sn=6131d924653be3486f5ca86a8b43d348&chksm=bd494d5e8a3ec448e27aafd87a6e4180460bb6a83a7e188d317a5ebe55b2b56258b3d1e24f36&scene=21#wechat_redirect)  

[【第1912期】探索 webpack5 新特性Module federation在腾讯文档的应用](http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651236238&idx=1&sn=fe46cf50030b8a7ae917b9c8c7de601c&chksm=bd497e0a8a3ef71c8c3ea67ef24603994659fa1f55a1ebb488bba135b0138125620b4100f831&scene=21#wechat_redirect)  

欢迎自荐投稿，前端早读课等你来