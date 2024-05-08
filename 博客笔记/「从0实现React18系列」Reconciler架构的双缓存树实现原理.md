### 从0实现React核心模块系列文章：

「1」. 自己动手实现一个JSX转换

「2」. Fiber架构的实现原理

## 前言

通过上一篇文章的学习，了解了`Fiber`是什么，知道了`Fiber`节点可以保存对应的`DOM节点`。`Fiber节点`构成的`Fiber Tree`会对应`DOM Tree`。

前面也提到`Fiber`是一种新的调和算法，那么它是如何更新`DOM节点的`呢？

## 单个节点的创建更新流程

对于同一个节点，React 会比较这个节点的`ReactElement`与`FiberNode`，生成`子FiberNode`。并根据比较的结果生成不同标记（插入、删除、移动...），对应不同宿主环境API的执行。

![Image](https://mmbiz.qpic.cn/mmbiz_png/w3FlUSAia6FibziaFiaaNxKQOeHicFibSI4JITVwdMiaerJqTmpQSUtLb5ALvgouEV9q38RKaLETKR0EkuibRfmiaETQfqw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

根据上面的Reconciler的工作流程，举一个例子：

比如：

**mount阶段**，挂载`<div></div>`

1.  先通过`jsx("div")`生成 React Element <div></div>
    
2.  生成的对应的`fiberNode`为null（由于是由于是挂载阶段，React还未构建组件树）
    
3.  生成子`fiberNode`（实际上就是这个div的fiber节点）
    
4.  生成`Placement`标记
    

将`<div></div>`更新为`<p></p>`

**update阶段**，更新将`<div></div>`更新为`<p></p>`

1.  先通过`jsx("p")`生成 React Element <p></p>
    
2.  `p`与对应的`fiberNode`作比较（FiberNode {type: 'div'}）
    
3.  生成子`fiberNode`为null
    
4.  生成对应标记`Delement Placement`
    

用一张图解释上面的流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当所有的`ReactElement`比较完后，会生成一颗`fiberNode Tree`，一共会存在两棵`fiberNode Tree`

-   **current**：与视图中真实UI对应的`fiberNode`树；
    
-   **workInProgress**：触发更新后，正在`reconciler`中计算的`fiberNode Tree`（用于下一次的视图更新，在下一次视图更新后，会变成`current Tree`）；
    

这就是React中的"双缓存树"技术。

## 什么是"双缓存"？

双缓存技术是一种计算机图形学中**用于减少屏幕闪烁和提高渲染性能**的技术。

就好像你是一个画家，你需要在一个画布上绘制一幅画。在没有双缓存技术的情况下，你会直接在画布上作画。当你绘制一条线或一个形状时，观众会立即看到这个过程。如果你的绘画速度较慢，观众可能会看到画面的闪烁和变化，这会导致视觉上的不舒适。

引入双缓存技术就好比你有两个画布：一个是主画布，观众可以看到它；另一个是隐藏画布，观众看不到它。在这种情况下，你会在隐藏画布上进行绘画。当你完成一个阶段性的绘制任务后，你将隐藏画布上的图像瞬间复制到主画布上。观众只能看到主画布上的图像，而看不到隐藏画布上的绘制过程。这样，即使你的绘画速度较慢，观众也不会看到画面的闪烁和变化，从而获得更流畅的视觉体验。

使用双缓存技术时，计算机会在一个**隐藏的缓冲区（后台缓冲区）上进行绘制**，然后**将绘制好的图像一次性复制到屏幕上（前台缓冲区）**。这样可以减少屏幕闪烁，并提高渲染性能。

这种**在内存中构建并直接替换**的技术叫作双缓存。

React 中使用"双缓存"来完成`Fiber Tree`的构建与替换，对应着`DOM Tree`的创建于与更新。

## 双缓存Fiber树

`Fiber`架构中同时存在两棵`Fiber Tree`，一颗是"真实UI对应的 `Fiber Tree`"可以理解为**前缓冲区**。另一课是"正在内存中构建的 `Fiber Tree`"可以理解为**后缓冲区**，这里值宿主环境（比如浏览器）。

当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

`current Fiber树`中的Fiber节点被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

双缓存树一个显著的特点就是两棵树之间会互相切换，通过`alternate`属性连接。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">currentFiber.alternate&nbsp;===&nbsp;workInProgressFiber;<br>workInProgressFiber.alternate&nbsp;===&nbsp;currentFiber;<br></code>
```

### 双缓存树切换的规则

`React`应用的根节点通过`current指针`在不同Fiber树的`HostRootFiber根节点`（ReactDOM.render创建的根节点）间切换。

-   在 mount时（首次渲染），会根据`jsx方法`返回的`React Element`构建`Fiber`对象，形成`Fiber`树；
    

-   然后这棵`Fiber树`会作为`current Fiber`应用到真实DOM上
    

-   在 update时（状态更新），会根据状态变更后的`React Element`和`current Fiber`作对比形成新的`workInProgress Fiber`树
    

-   即当`workInProgress Fiber树`构建完成交给`Renderer（渲染器）`渲染在页面上后，应用根节点的`current指针`指向`workInProgress Fiber树`
    
-   然后`workInProgress Fiber`切换成`current Fiber`应用到真实DOM上，这就达到了更新的目的。
    

> 这一切都是在内存中发生的，从而减少了对DOM的直接操作。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成DOM更新，这就是React中用的**双缓存树切换规则**。

> Renderer 是一个与特定宿主环境（如浏览器 DOM、服务器端渲染、React Native 等）相关的模块。Renderer 负责将 React 组件树转换为特定宿主环境下的实际 UI。从而使 React 能够在多个平台上运行。

上面的语言可能有些枯燥，我们来画个图演示一下。

比如有下面这样一段代码，点击元素把div切换成p元素：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[elementType,&nbsp;setElementType]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">'div'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;handleClick&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;setElementType(<span><span>prevElementType</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;prevElementType&nbsp;===&nbsp;<span data-darkreader-inline-color="">'div'</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">'p'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'div'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据&nbsp;elementType&nbsp;的值动态创建对应的元素</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;Element&nbsp;=&nbsp;elementType;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Element</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{handleClick}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点击我切换&nbsp;div&nbsp;和&nbsp;p&nbsp;标签<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Element</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-color="">"#root"</span>);<br>ReactDOM.createRoot(root).render(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>);<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接下来，我们分别从 mount（首次渲染）和 update（更新）两个角度讲解 Fiber 架构的工作原理。

## mount 时 Fiber Tree的构建

mount 时有两种情况：

1.  整个应用的首次渲染，这种情况发生**首次进入页面时**。
    
2.  某个组件的首次渲染，当 isShow 为 true时，Btn 组件进入 mount 首次渲染流程。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{isShow&nbsp;?&nbsp;<span>&lt;<span data-darkreader-inline-color="">Btn</span>&nbsp;/&gt;</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>}<br></code>
```

假如有这样一段代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[num,&nbsp;add]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;add(num&nbsp;+&nbsp;1)}&gt;{num}<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-color="">"#root"</span>);<br>ReactDOM.createRoot(root).render(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>)<br></code>
```

mount 时上面的`Fiber树`构建过程如下：

1.  首次执行`ReactDOM.createRoot(root)`会创建`fiberRootNode`；
    
2.  接着执行到`render(<App />)`时会创建`HostRootFiber`，实际上它是一个`HostRoot节点`；
    

> **fiberRootNode** 是整个应用的根节点，**HostRootFiber** 是 **<App />** 所在组件树的根节点

3.  从`HostRootFiber`开始，以DFS（深度优先搜索）的的顺序遍历子节点，以及生成对应的`FiberNode`；
    
4.  在遍历过程中，为`FiberNode`标记"代表不同副作用的 flags"，以便后续在宿主环境中渲染的使用；
    

在上面我们之所以要区分`fiberRootNode`和`HostRootFiber`是因为在整个React应用程序中开发者可以多次多次调用`render方法`渲染不同的组件树，它们会有不同的`HostRootFiber`，但是**整个应用的根节点只有一个**，那就是`fiberRootNode`。

执行 ReactDOM.createRoot 会创建如图所示结构：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### mount 首屏渲染阶段

由于是**首屏渲染**阶段，页面中还没有挂载任何`DOM节点`，所以`fiberRootNode.current`指向的`HostRootFiber`没有任何`子Fiber节点`（即`current Fiber树`为空）。

当前仅有一个`HostRootFiber`，对应"首屏渲染时只有根节点的空白画面"。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"root"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br></code>
```

### render 生成workInProgress树阶段

接下来进入`render阶段`，根据组件返回的`JSX`在内存中依次构建创建`Fiber节点`并连接在一起构建`Fiber树`，被称为`workInProgress Fiber树`。

在构建`workInProgress Fiber树`时会尝试复用`current Fiber树`中已有的`Fiber节点`内的属性，（在首屏渲染时，只有`HostRootFiber`），也可以理解为首屏渲染时，它以自己的身份生成了一个`workInProgress 树`只不过还是`HostRootFiber`（`HostRootFiber.alternate`。

基于DFS（深度优先搜索）依次生成的`workInProgress节点`，并连接起来构成`wip 树`的过程如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上图中已构建完的`workInProgress Fiber树`会在`commit阶段`被渲染到页面。

### commit 阶段

等到页面渲染完成时，`workInProgress Fiber树`会替换之前的`current Fiber树`，进而`fiberRootNode`的`current`指针会指向新的`current Fiber树`。

完成双缓存树的切换工作，曾经的`Wip Fiber树`变为`current Fiber树`。

过程如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## update 时 Fiber Tree的更迭

1.  接下来我们点击`p`节点触发状态改变。这会开启一次新的`render阶段`并构建一课新的`workInProgress Fiber树`。
    

> 和mount时一样，`workInProgress Fiber`的创建可以复用`current Fiber树`对应节点的数据，这个决定是否服用的过程就是Diff算法， 后面章节会详细讲解

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  `workInProgress Fiber树`在`render阶段`完成构建后会进入`commit阶段`渲染到页面上。渲染完成后，`workInProgress Fiber树`变为`current Fiber树`。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## render 阶段的流程

接下来，我们来看看用原理，在源码中它是如何实现的。

`Reconciler`工作的阶段在 React 内部被称为 render 阶段，ClassComponent 的render函数、Function Component函数本身也都在 render 阶段被调用。

根据`Scheduler`调度的结果不同，`render`阶段可能开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。

也就是说React在执行render阶段的初期会依赖于`Scheduler`（调度器）的结果来判断执行哪个方法，比如`Scheduler`（调度器）会根据任务的优先级选择执行`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法。这取决于**任务的类型和优先级**。**同步任务通常具有较高优先级，需要立即执行，而并发任务会在空闲时间段执行以避免阻塞主线程**。

这里补充一下，调度器可能的执行结果，以用来判断执行什么入口函数：

如果不知道调度器的执行结构都有哪几类，可以跳过这段代码向下看：

现在还不需要学习这两个方法，只需要知道在这两个方法中会调用 `performUnitOfWork`方法就好。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;performSyncWorkOnRoot会调用该方法</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">workLoopSync</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;performUnitOfWork(workInProgress);<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;performConcurrentWorkOnRoot会调用该方法</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">workLoopConcurrent</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;!shouldYield())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;performUnitOfWork(workInProgress);<br>&nbsp;&nbsp;}<br>}<br></code>
```

可以看到，它们唯一的区别就是是否会调用`shouldYield`。如果当前浏览器帧没有剩余时间，`shouldYield`会终止循环，直到浏览器有空闲时间再继续遍历。

也就说当更新正在进行时，如果有 **"更高优先级的更新"** 产生，则会终端当前更新，优先处理高优先级更新。

高优先级的更新比如："鼠标悬停"，"文本框输入"等用户更易感知的操作。

`workInProgress`代表当前正在工作的一个`fiberNode`，它是一个全局的指针，指向当前正在工作的 `fiberNode`，一般是`workInProgress`。

`performUnitOfWork`方法会创建下一个`Fiber节点`，并赋值给`workInProgress`，并将`workInProgress`与已经创建好的`Fiber节点`连接起来构成`Fiber`树。

> 这里为什么指向的是 workInProgress 呢？ 因为在每次渲染更新时，即将展示到界面上的是 workInProgress 树，只有在首屏渲染的时候它才为空。

### render阶段流程概览

`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过递归遍历的方式实现可中断的递归。 因为可以把`performUnitOfWork`方法分为两部分："递"和"归"。

**"递"** 阶段会从 `HostRootFiber`开始向下以 DFS 的方式遍历，为遍历到的每个`fiberNode`执行`beginWork`方法。该方法**会根据传入的fiberNode**创建下一级`fiberNode`。

当遍历到叶子元素（不包含子fiberNode）时，`performUnitOfWork`就会进入 **"归"** 的阶段。

**"归"** 阶段会调用`completeWork`方法处理`fiberNode`。当某个`fiberNode`执行完`complete`方法后，如果其存在`兄弟fiberNode`（fiberNode.sibling !== null），会进入其`兄弟fiber`的"递阶段"。如果不存在`兄弟fiberNode`，会进入`父fiberNode`的 **"归"** 阶段。

**递阶段和归阶段会交错执行**直至`HostRootFiber`的"归"阶段。到此，render阶段的工作就结束了。

举一个例子：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>1229<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jasonshu<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-color="">"#root"</span>);<br>ReactDOM.createRoot(root).render(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>);<br></code>
```

当执行完深度优先搜索之后形成的`workInProgress树`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图中的数组是遍历过程中的顺序，可以看到，遍历的过程中会从应用的根节点`RootFiberNode`开始，依次执行`beginWork`和`completeWork`，最后形成一颗Fiber树，每个节点以child和return项链。

> 注意：当遍历到只有一个子文本节点的Fiber时，该Fiber节点的子节点不会执行beginWork和completeWork，如图中的"jasonshu"文本节点。这是react的一种优化手段

刚刚提到：`workInProgress`代表当前正在工作的一个`fiberNode`，它是一个全局的指针，指向当前正在工作的 `fiberNode`，一般是`workInProgress`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;该函数用于调度和执行&nbsp;FiberNode&nbsp;树的更新和渲染过程</span><br><span data-darkreader-inline-color="">//&nbsp;该函数的作用是处理&nbsp;React&nbsp;程序中更新请求，计算&nbsp;FiberNode&nbsp;树中的每个节点的变化，并把这些变化同步到浏览器的DOM中</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">workLoop</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始执行每个工作单元的工作</span><br>&nbsp;&nbsp;&nbsp;&nbsp;performUmitOfWork(workInProgress);<br>&nbsp;&nbsp;}<br>}<br></code>
```

知道了`beginWork`和`completeWork`它们是怎样的流程后，我们再来看它是如何实现的：

这段代码主要计算`FiberNode`节点的变化，更新`workInProgress`，`beginWork`函数的最初运行也是在下面这个函数中，同时它也完成**递和归**两个阶段的操作。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;在这个函数中，React&nbsp;会计算&nbsp;FiberNode&nbsp;节点的变化，并更新&nbsp;workInProgress</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">performUmitOfWork</span>(<span>fiber:&nbsp;FiberNode</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果有子节点，就一直遍历子节点</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;next&nbsp;=&nbsp;beginWork(fiber);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;递执行完之后，需要更新下工作单元的props</span><br>&nbsp;&nbsp;fiber.memoizedProps&nbsp;=&nbsp;fiber.pendingProps;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;没有子节点的&nbsp;FiberNode&nbsp;了，代表递归到最深层了。</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(next&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;completeUnitOfWork(fiber);<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果有子节点的&nbsp;FiberNode，则更新子节点为新的&nbsp;fiberNode&nbsp;继续执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;next;<br>&nbsp;&nbsp;}<br>}<br></code>
```

在下面的函数中主要进行**归**的操作：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;主要进行归的过程，向上遍历父节点以及兄弟，更新它们节点的变化，并更新&nbsp;workInProgress</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">completeUnitOfWork</span>(<span>fiber:&nbsp;FiberNode</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;node:&nbsp;FiberNode&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;fiber;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">do</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;归：没有子节点之后开始向上遍历父节点</span><br>&nbsp;&nbsp;&nbsp;&nbsp;completeWork(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;sibling&nbsp;=&nbsp;node.sibling;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(sibling&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;有兄弟节点时，将指针指到兄弟节点</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;sibling;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;兄弟节点不存在时，递归应该继续往上指到父亲节点</span><br>&nbsp;&nbsp;&nbsp;&nbsp;node&nbsp;=&nbsp;node.return;<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;node;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(node&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>);<br>}<br></code>
```

到此，`Reconciler`的工作架构架子我们就搭完了。

接下来我们来讲在构建过程中每个`Fiber节点`具体是如何创建的呢？在下一篇会详细讲解`beginWork`和`completeWork`是如何实现的？会正式进入`render阶段`的实现了。