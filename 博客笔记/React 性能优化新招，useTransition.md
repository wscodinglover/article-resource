> React 知命境第 31 篇

在 React 中，有一个高大上的概念，叫做并发模式 **Concurrent React**。在并发模式中，引入了两个新概念：**任务优先级、异步可中断**。当一个任务正在 Reconciler 阶段执行时，如果此时 Scheduler 发现了一个优先级更高的任务，那么，React 可以把正在执行的任务中断，从 Scheculer 中把优先级更高的任务拿过来执行。

| Scheduler | Reconciler | Renderer |
| --- | --- | --- |
| 收集 | diff | 操作 DOM |
| 优先级 | 可中断 |   
 |

当有多个 UI 发生变化，我们可以利用这个并发机制，将耗时比较长，会阻塞其他 UI 渲染的更新，标记为低优先级，这样，一部分 UI 就可以顺利无卡顿的渲染，耗时较长的更新则在其他 UI 更新完毕之后再更新。

## 0

**什么样的任务是可中断的**

我们这里首先要思考的是任务最小粒度的问题。这是大多数人在学习并发模式时，忽略的重要问题。如果你无法思考清楚，那么你的 React 可能从来没有做到过异步可中断更新，一直是同步更新。

首先我们要明确一个基本概念：**一个函数的执行是不可以被中断的**。例如有这样一个组件

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">SlowComponent</span>(<span>{&nbsp;text&nbsp;}:&nbsp;Props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>let</span>&nbsp;startTime&nbsp;=&nbsp;performance.now();<br>&nbsp;&nbsp;<span>while</span>&nbsp;(performance.now()&nbsp;-&nbsp;startTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">1000</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&nbsp;className=<span data-darkreader-inline-color="">"item"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Text:&nbsp;{text}<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/li&gt;<br>&nbsp;&nbsp;)<br>}<br></span>
```

我们发现，函数 SlowComponent 的执行过程中，我们模拟他被阻塞了 1000ms，这个阻塞在函数内部我们没有任何办法能够中断他的执行。React 底层是通过**广度优先遍历**的方式，将更新任务转换为队列。而这个函数任务已经是最小粒度，无法拆分自然也无法中断。

因此，要做到可中断的更新，我们在编写代码时，应该把阻塞拆分到多个子组件中去。这样每个子组件的执行时间可能稍微比较短，但是多个子组件综合起来的时间就会比较长而造成卡顿。拆分之后，那么在协调器遍历执行子组件的任务时，对于整个大任务而言，就有机会在协调器遍历没有完成时，做到任务中断。否则，React 也无法做到中断。

因此，合理的手动拆分任务，是 React 并发模式能够发挥作用的关键。

例如，我们要渲染一个列表组件，如果列表组件是父组件，列表项是子组件，那么我们应该确保父组件不会有长时间的逻辑要执行，从而把渲染压力拆分到子组件中去，例如如下代码。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">SlowList</span>(<span>{&nbsp;text&nbsp;}:&nbsp;Props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>let</span>&nbsp;items&nbsp;=&nbsp;[];<br>&nbsp;&nbsp;<span>for</span>&nbsp;(<span>let</span>&nbsp;i&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;i&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">250</span>;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;items.push(&lt;SlowItem&nbsp;key={i}&nbsp;text={text}&nbsp;/&gt;);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul&nbsp;className=<span data-darkreader-inline-color="">"items"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{items}<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/ul&gt;<br>&nbsp;&nbsp;);<br>}<br><br>function&nbsp;SlowItem({&nbsp;text&nbsp;}:&nbsp;Props)&nbsp;{<br>&nbsp;&nbsp;let&nbsp;startTime&nbsp;=&nbsp;performance.now();<br>&nbsp;&nbsp;while&nbsp;(performance.now()&nbsp;-&nbsp;startTime&nbsp;&lt;&nbsp;1)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;/</span><span data-darkreader-inline-color="">/&nbsp;每个&nbsp;item&nbsp;暂停&nbsp;1ms，模拟极其缓慢的代码<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&nbsp;className="item"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Text:&nbsp;{text}<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>li&gt;<br>&nbsp;&nbsp;)<br>}<br>
```

## 1

**复现卡顿**

我们来尝试写一个 demo 复现一下 input 输入卡顿的问题。当我在输入内容时，列表组件会根据我输入内容的变化而发生变化。此时列表组件是一个耗时较长的渲染，因此在 input 中输入内容时会感觉到明显的卡顿。

如下图，此时我在快速输入内容，但输入时卡顿明显。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

scroll.gif

该 demo 目录结构如下

```
+&nbsp;App<br>&nbsp;&nbsp;-&nbsp;index.tsx<br>&nbsp;&nbsp;-&nbsp;api.ts<br>&nbsp;&nbsp;-&nbsp;List.tsx<br>&nbsp;&nbsp;-&nbsp;SearchResults.tsx<br>
```

首先模拟一个函数，用于创建列表数据

```
<span>export</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">createList</span>(<span>param?:&nbsp;<span data-darkreader-inline-color="">string</span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;p&nbsp;=&nbsp;(param&nbsp;||&nbsp;<span data-darkreader-inline-color="">''</span>).split(<span data-darkreader-inline-color="">''</span>)<br>&nbsp;&nbsp;<span>const</span>&nbsp;arr:&nbsp;<span data-darkreader-inline-color="">string</span>[]&nbsp;=&nbsp;[]<br>&nbsp;&nbsp;<span>for</span>(<span>var</span>&nbsp;i&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;i&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">250</span>;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;pindex&nbsp;=&nbsp;i&nbsp;%&nbsp;p.length<br>&nbsp;&nbsp;&nbsp;&nbsp;arr.push(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${p[pindex]&nbsp;||&nbsp;<span data-darkreader-inline-color="">'^&nbsp;^'</span>}</span>&nbsp;-&nbsp;<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">Math</span>.random()}</span>`</span>)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;arr<br>}<br>
```

然后我们随意封装一个简单的 List 列表组件，该组件是一个基础 UI 组件，只负责处理数据渲染，不包含逻辑。之所以要这样封装，是为了尽可能的还原真实场景，而非单纯的将本案例看成学习 demo.

```
<span>import</span>&nbsp;{&nbsp;ReactNode&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><span>import</span>&nbsp;s&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./index.module.scss'</span><br><br><span>interface</span>&nbsp;ListProps&lt;T&gt;&nbsp;{<br>&nbsp;&nbsp;list?:&nbsp;T[],<br>&nbsp;&nbsp;renderItem:&nbsp;<span>(<span>item:&nbsp;T</span>)&nbsp;=&gt;</span>&nbsp;ReactNode<br>}<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">List</span>&lt;<span data-darkreader-inline-color="">T</span>&gt;(<span>props:&nbsp;ListProps&lt;T&gt;</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;{list&nbsp;=&nbsp;[],&nbsp;renderItem}&nbsp;=&nbsp;props<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;className={s.list}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{list.map(renderItem)}<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;)<br>}<br></span>
```

然后我们基于刚才的基础组件，开始封装业务组件 **SearchResults**。业务组件表示搜索结果，该组件接收搜索条件，然后根据条件计算出要显示的列表内容，最终由 List 负责展示。我们将列表项子组件 Item 也写在这里，阻塞 1ms 表示子组件渲染耗时。250 个子项则一共至少耗时 250ms.

```
<span>import</span>&nbsp;{&nbsp;createList&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./api'</span><br><span>import</span>&nbsp;List&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./List'</span><br><br><span>interface</span>&nbsp;Props&nbsp;{<br>&nbsp;&nbsp;query:&nbsp;<span data-darkreader-inline-color="">string</span><br>}<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">SearchResults</span>(<span>{&nbsp;query&nbsp;}:&nbsp;Props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;list&nbsp;=&nbsp;createList(query)<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;List&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list={list}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderItem={<span>(<span>item</span>)&nbsp;=&gt;</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Item&nbsp;key={item}&nbsp;text={item}&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)}<br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>&nbsp;&nbsp;)<br>}<br><br><span><span>function</span>&nbsp;<span data-darkreader-inline-color="">Item</span>(<span>props:&nbsp;{&nbsp;text:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>let</span>&nbsp;startTime&nbsp;=&nbsp;performance.now();<br>&nbsp;&nbsp;<span>while</span>&nbsp;(performance.now()&nbsp;-&nbsp;startTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">1</span>)&nbsp;{}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;{props.text}&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;)<br>}<br></span>
```

入口文件的内容比较简单，语义为搜索结果要响应输入内容的变化

```
<span>import</span>&nbsp;{&nbsp;useState&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><span>import</span>&nbsp;SearchResults&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./SearchResults'</span><br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">Demo01</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[text,&nbsp;setText]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">''</span>)<br>&nbsp;&nbsp;<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;<span>type</span>=<span data-darkreader-inline-color="">"text"</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onChange={<span>(<span>e:&nbsp;<span data-darkreader-inline-color="">any</span></span>)&nbsp;=&gt;</span>&nbsp;setText(e.target.value)}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;SearchResults&nbsp;query={text}&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;)<br>}<br></span>
```

这样，当你在连续输入内容时，你会感觉到输入框此时有明显的卡顿感。

## 2

**useTransition**

`useTransition` 是 React 专门为并发模式提供的一个基础 hook。它能够帮助你在不阻塞 UI 渲染的情况下更新状态。意思就是说，将更新任务的优先级调低一点。

```
<span>const</span>&nbsp;[isPending,&nbsp;startTransition]&nbsp;=&nbsp;useTransition()<br>
```

`useTransition` 的调用不需要参数，他的执行返回两个参数

-   isPending：是否还存在等待处理的 transition，表示被降低优先级的更新还没有完成
    
-   startTransition：标记任务的优先级为 transition，该优先级低于正常更新
    

startTransition 的用法如下，我会将更新任务在它的回调函数中执行

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">TabContainer</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[isPending,&nbsp;startTransition]&nbsp;=&nbsp;useTransition();<br>&nbsp;&nbsp;<span>const</span>&nbsp;[tab,&nbsp;setTab]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">'about'</span>);<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">selectTab</span>(<span>nextTab</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;startTransition(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setTab(nextTab);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;……</span><br>}<br>
```

回到刚才那个输入卡顿的例子。此案例中，有两个 UI 更新，一个是输入框的 UI，另外一个是列表的 UI，此时，我们只需要在 `index.tsx` 中，把列表的 UI 使用 **startTransition** 标记为低优先级即可。代码更改如下

```
<span>import</span>&nbsp;{&nbsp;useState,&nbsp;useTransition&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><span>import</span>&nbsp;SearchResults&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./SearchResults'</span><br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">Demo01</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[text,&nbsp;setText]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">''</span>)<br>&nbsp;&nbsp;<span>const</span>&nbsp;[pending,&nbsp;startTransition]&nbsp;=&nbsp;useTransition()<br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">onchange</span>(<span>e:&nbsp;<span data-darkreader-inline-color="">any</span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;startTransition(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setText(e.target.value)<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;<span>type</span>=<span data-darkreader-inline-color="">"text"</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onChange={onchange}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;{pending&nbsp;?&nbsp;<span data-darkreader-inline-color="">'input...'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'end'</span>&nbsp;}&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;SearchResults&nbsp;query={text}&nbsp;/</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;)<br>}<br></span>
```

除此之外，在 SearchResults 组件中，我们观察发现列表的代码已经具备可拆分的可能性，那么，我们就只需要给 SearchResults 组件包裹一层 memo 优化，避免冗余的渲染即可

> 如果不包裹 memo，优化效果会降低很多。

```
function&nbsp;SearchResults({&nbsp;query&nbsp;}:&nbsp;Props)&nbsp;{<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;const&nbsp;list&nbsp;=&nbsp;createList(query)<br><br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;List&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list={list}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderItem={(item)&nbsp;=&gt;&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Item&nbsp;key={item}&nbsp;text={item}&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)}<br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br>&nbsp;&nbsp;)<br>}<br><br>function&nbsp;Item(props:&nbsp;{&nbsp;text:&nbsp;string&nbsp;})&nbsp;{<br>&nbsp;&nbsp;let&nbsp;startTime&nbsp;=&nbsp;performance.now();<br>&nbsp;&nbsp;while&nbsp;(performance.now()&nbsp;-&nbsp;startTime&nbsp;&lt;&nbsp;1)&nbsp;{}<br><br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;{props.text}&lt;/div&gt;<br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;export&nbsp;default&nbsp;memo(SearchResults)</span><br>
```

观察一下运行结果，发现往输入框中输入内容已经变得非常流畅，列表渲染因为多次被中断，加上 memo 的作用，此时我们发现列表的渲染次数变得非常少，最终也能响应最后的正确结果。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

scroll.gif

## 3

**防抖**

我们最终的优化效果与防抖有一点类似。但是他们的原理和解决的问题完全不一样。防抖是结合闭包和 setTiemout **让任务不发生**，更适合用于任务无法拆分的场景。

而 useTransition 则是中断已经开始执行的任务，更适合于任务可以被拆分的场景。

> **「React 知命境」** 是一本从知识体系顶层出发，理论结合实践，通俗易懂，覆盖面广的精品小册，欢迎关注我的公众号，我会持续更新，[购买 React 哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)，或者赞赏本文 30 元，可进入 React 付费讨论群，学习氛围良好，学习进度加倍