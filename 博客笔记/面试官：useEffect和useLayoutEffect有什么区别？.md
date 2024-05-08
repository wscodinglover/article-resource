**您好，如果喜欢我的文章，可以关注我的公众号[「量子前端」](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247483762&idx=1&sn=ec6dc22adeadad8b58cf67c4f3457275&chksm=cfa1d45ff8d65d4937bd7c3076642b1f57691b226a9c6b453a729b014939c7709cf6a4845eb3&token=1905047246&lang=zh_CN&scene=21#wechat_redirect)，将不定期关注推送前端好文~**

## Effect数据结构

顾名思义，`React`底层在函数式组件的`Fiber`节点设计中带入了`hooks`链表的概念（`memorizedState`），在此变量上专门存储每一个函数式组件对应的链表。

而对于副作用（`useEffect` or `useLayoutEffect`）来说，对应其`hook`类型就是`Effect`。

单个的effect对象包括以下几个属性：

-   create: 传入`useEffect` or `useLayoutEffect`函数的第一个参数，即回调函数；
    
-   destroy: 回调函数return的函数，在该effect销毁的时候执行，渲染阶段为`undefined`；
    
-   deps: 依赖项，改变重新执行副作用；
    
-   next: 指向下一个`effect`；
    
-   tag: effect的类型，区分是`useEffect`还是`useLayoutEffect`；
    

单纯看这些字段，和平时使用层面来联想还是很通俗易懂的，这里还是补充一下`hooks`链表的概念，有如下的例子：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;Hello&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[&nbsp;text,&nbsp;setText&nbsp;]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">'hello'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'effect1'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'destory1'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;useLayoutEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'effect2'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'destory2'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>effect<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>}<br><br></code>
```

挂载到`Hello`组件`fiber`上`memoizedState`如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

可以看到，打印出来结果和组件中声明`hook`的顺序是一样的，不难看出这是一个链表，这也是为什么`react hook`要求`hook`的使用不能放在条件分支语句中的原因，如果第一次`mount`走的是A情况，第二次`updateMount`走的是B情况，就会出现`hooks`链表混乱的情况，保证官方范式是比较重要的原因。

## Hook

从上图的例子中可以看到，`memorizedState`的值会根据不同`hook`来决定。

-   使用`useState`时，`memorizedState`对应是`string`（hello）；
    
-   使用`useEffect`和`useLayoutEffect`，对应的是`Effect`；
    

`Hook`类型如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;Hook&nbsp;=&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;memoizedState:&nbsp;<span data-darkreader-inline-color="">any</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;Hook&nbsp;自身维护的状态&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;baseQueue:&nbsp;<span data-darkreader-inline-color="">any</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;baseState:&nbsp;<span data-darkreader-inline-color="">any</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;queue:&nbsp;UpdateQueue&lt;<span data-darkreader-inline-color="">any</span>,&nbsp;<span data-darkreader-inline-color="">any</span>&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;Hook&nbsp;自身维护的更新队列&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;next:&nbsp;Hook&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;next&nbsp;指向下一个&nbsp;Hook&nbsp;</span><br>};<br></code>
```

## 创建副作用流程

基于上面的数据结构，对于use（Layout）Effect来说，React做的事情就是

-   render阶段：函数组件开始渲染的时候，创建出对应的hook链表挂载到`workInProgress`的`memoizedState`上，并创建effect链表，也就是挂载到对应的`fiber`节点上，但是基于上次和本次依赖项的比较结果， 创建的effect是有差异的。这一点暂且可以理解为：依赖项有变化，`effect`可以被处理，否则不会被处理。
    
-   commit阶段：异步调度`useEffect`或者同步处理`useLayoutEffect`的`effect`。等到`commit`阶段完成后，更新应用到页面上之后，开始处理`useEffect`产生的`effect`，或是直接处理`commit`阶段同步执行阻塞页面更新的`useLayoutEffect`产生的`effect`。
    

第二点提到了一个重点，就是useEffect和useLayoutEffect的执行时机不一样，前者被异步调度，当页面渲染完成后再去执行，不会阻塞页面渲染。后者是在commit阶段新的DOM准备完成，但还未渲染到屏幕之前，同步执行。

## 创建effect链表

`useEffect`的工作是在`currentlyRenderingFiber`加载当前的`hook`，具体流程就是判断当前`fiber`是否已经存在`hook`（就是判断`fiber.memoizedState`），存在的话则创建一个`effect hook`到链表的最后，也就是`.next`，没有的话则创建一个`memoizedState`。

先看一下创建一个`Effect`的入口函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">mountEffect</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;create:&nbsp;()&nbsp;=&gt;&nbsp;(()&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">void</span>)&nbsp;|&nbsp;<span data-darkreader-inline-color="">void</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;deps:&nbsp;<span data-darkreader-inline-color="">Array</span>&lt;mixed&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span><br></span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;mountEffectImpl(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UpdateEffect&nbsp;|&nbsp;PassiveEffect,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HookPassive,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;create,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deps,<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>};<br></code>
```

可以看到本质上是调用了`mountEffectImpl`函数，传了上一节所说的`Effect type`中的字段，这里有个问题，为什么`destroy`没传呢？获取上一次`effect`的`destroy`函数，也就是`useEffect`回调中`return`的函数，在创建阶段是第一次，所以为`undefined`。

**这里看一下创建阶段调用的`mountEffectImpl`函数：**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">mountEffectImpl</span>(<span>fiberFlags,&nbsp;hookFlags,&nbsp;create,&nbsp;deps</span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建hook对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;hook&nbsp;=&nbsp;mountWorkInProgressHook();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取依赖</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;nextDeps&nbsp;=&nbsp;deps&nbsp;===&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;:&nbsp;deps;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;为fiber打上副作用的effectTag</span><br>&nbsp;&nbsp;currentlyRenderingFiber.flags&nbsp;|=&nbsp;fiberFlags;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建effect链表，挂载到hook的memoizedState上和fiber的updateQueue</span><br>&nbsp;&nbsp;hook.memoizedState&nbsp;=&nbsp;pushEffect(<br>&nbsp;&nbsp;&nbsp;&nbsp;HookHasEffect&nbsp;|&nbsp;hookFlags,<br>&nbsp;&nbsp;&nbsp;&nbsp;create,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">undefined</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;nextDeps,<br>&nbsp;&nbsp;);<br>}<br><br></code>
```

接下来我们都知道，`React`或`Vue`都是状态改变导致页面重渲染，而`useEffect` or `useLayoutEffect`都会会根据`deps`变化重新执行，所以猜都猜得到，在更新时调用的`updateEffectImpl`函数，对比`mountEffectImpl`函数多出来的一部分内容其实就是对比上一次的`Effect`的依赖变化，以及执行上一次`Effect`中的`destroy`部分内容~代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">updateEffectImpl</span>(<span>fiberFlags,&nbsp;hookFlags,&nbsp;create,&nbsp;deps</span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;hook&nbsp;=&nbsp;updateWorkInProgressHook();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;nextDeps&nbsp;=&nbsp;deps&nbsp;===&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;:&nbsp;deps;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;destroy&nbsp;=&nbsp;<span data-darkreader-inline-color="">undefined</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(currentHook&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;从currentHook中获取上一次的effect</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;prevEffect&nbsp;=&nbsp;currentHook.memoizedState;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取上一次effect的destory函数，也就是useEffect回调中return的函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;destroy&nbsp;=&nbsp;prevEffect.destroy;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(nextDeps&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;prevDeps&nbsp;=&nbsp;prevEffect.deps;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;比较前后依赖，push一个不带HookHasEffect的effect</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(areHookInputsEqual(nextDeps,&nbsp;prevDeps))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pushEffect(hookFlags,&nbsp;create,&nbsp;destroy,&nbsp;nextDeps);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;currentlyRenderingFiber.flags&nbsp;|=&nbsp;fiberFlags;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果前后依赖有变，在effect的tag中加入HookHasEffect</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;并将新的effect更新到hook.memoizedState上</span><br>&nbsp;&nbsp;hook.memoizedState&nbsp;=&nbsp;pushEffect(<br>&nbsp;&nbsp;&nbsp;&nbsp;HookHasEffect&nbsp;|&nbsp;hookFlags,<br>&nbsp;&nbsp;&nbsp;&nbsp;create,<br>&nbsp;&nbsp;&nbsp;&nbsp;destroy,<br>&nbsp;&nbsp;&nbsp;&nbsp;nextDeps,<br>&nbsp;&nbsp;);<br>}<br><br></code>
```

可以看到在`mountEffectImpl`和`updateEffectImpl`中，最后的结果走向都是`pushEffect`函数，它的工作很纯粹，就是创建出`effect`对象，把对象挂到链表中。

**`pushEffect`代码如下：**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">pushEffect</span>(<span>tag,&nbsp;create,&nbsp;destroy,&nbsp;deps</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建effect对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;effect:&nbsp;Effect&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;tag,<br>&nbsp;&nbsp;&nbsp;&nbsp;create,<br>&nbsp;&nbsp;&nbsp;&nbsp;destroy,<br>&nbsp;&nbsp;&nbsp;&nbsp;deps,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Circular</span><br>&nbsp;&nbsp;&nbsp;&nbsp;next:&nbsp;(<span data-darkreader-inline-color="">null</span>:&nbsp;<span data-darkreader-inline-color="">any</span>),<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;从workInProgress节点上获取到updateQueue，为构建链表做准备</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;componentUpdateQueue:&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;|&nbsp;FunctionComponentUpdateQueue&nbsp;=&nbsp;(currentlyRenderingFiber.updateQueue:&nbsp;<span data-darkreader-inline-color="">any</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(componentUpdateQueue&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果updateQueue为空，把effect放到链表中，和它自己形成闭环</span><br>&nbsp;&nbsp;&nbsp;&nbsp;componentUpdateQueue&nbsp;=&nbsp;createFunctionComponentUpdateQueue();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将updateQueue赋值给WIP节点的updateQueue，实现effect链表的挂载</span><br>&nbsp;&nbsp;&nbsp;&nbsp;currentlyRenderingFiber.updateQueue&nbsp;=&nbsp;(componentUpdateQueue:&nbsp;<span data-darkreader-inline-color="">any</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;componentUpdateQueue.lastEffect&nbsp;=&nbsp;effect.next&nbsp;=&nbsp;effect;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;updateQueue不为空，将effect接到链表的后边</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;lastEffect&nbsp;=&nbsp;componentUpdateQueue.lastEffect;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(lastEffect&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentUpdateQueue.lastEffect&nbsp;=&nbsp;effect.next&nbsp;=&nbsp;effect;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;firstEffect&nbsp;=&nbsp;lastEffect.next;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastEffect.next&nbsp;=&nbsp;effect;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effect.next&nbsp;=&nbsp;firstEffect;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentUpdateQueue.lastEffect&nbsp;=&nbsp;effect;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;effect;<br>}<br><br></code>
```

这里的主要逻辑其实就是本节开头所说的，区分两种情况，链表为空或链表存在的情况，值得一提的是这里的`updateQueue`是一个环形链表。

以上，就是`effect`链表的构建过程。我们可以看到，`effect`对象创建出来最终会以两种形式放到两个地方：单个的`effect`，放到`hook.memorizedState`上；环状的`effect`链表，放到`fiber`节点的`updateQueue`中。两者各有用途，前者的`effect`会作为上次更新的`effect`，为本次创建`effect`对象提供参照（对比依赖项数组），后者的`effect`链表会作为最终被执行的主体，带到`commit`阶段处理。

## 提交阶段

## commitRoot

当我们完成更新，进入提交重渲染视图时，主要在`commitRoot`函数中执行，而在这之前创建`Effect`以及插入到`hooks`链表中，`useEffect`和`useLayoutEffect`其实做的都是一样的，也是共用的，在提交阶段，我们会看出两者执行时机不同的实现点。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/react-reconciler/src/ReactFiberWorkLoop.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">commitRoot</span>(<span>root</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;已经完成构建的fiber，上面会包括hook信息</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;finishedWork&nbsp;}&nbsp;=&nbsp;root;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果存在useEffect或者useLayoutEffect</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;((finishedWork.flags&nbsp;&amp;&nbsp;Passive)&nbsp;!==&nbsp;NoFlags)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!rootDoesHavePassiveEffect)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rootDoesHavePassiveEffect&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开启下一个宏任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestIdleCallback(flushPassiveEffect);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'start&nbsp;commit.'</span>);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;判断自己身上有没有副作用</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;rootHasEffect&nbsp;=&nbsp;(finishedWork.flags&nbsp;&amp;&nbsp;MutationMask)&nbsp;!==&nbsp;NoFlags;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果自己的副作用或者子节点有副作用就进行DOM操作</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(rootHasEffect)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当DOM执行变更之后</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'DOM执行完毕'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;commitMutationEffectsOnFiber(finishedWork,&nbsp;root);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行layout&nbsp;Effect</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'开始执行layoutEffect'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;commitLayoutEffects(finishedWork,&nbsp;root);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(rootDoesHavePassiveEffect)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rootDoesHavePassiveEffect&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rootWithPendingPassiveEffects&nbsp;=&nbsp;root;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;等DOM变更之后，更改root中current的指向</span><br>&nbsp;&nbsp;root.current&nbsp;=&nbsp;finishedWork;<br>}<br></code>
```

这里的`rootDoesHavePassiveEffect`是核心判断点，还记得`Effect`类型中的`tag`参数吗？就是依靠这个参数来标识区分`useEffect`和`useLayoutEffect`的。

`rootDoesHavePassiveEffect === false`，则执行宏任务，将`Effect`副作用推入宏任务执行栈中。我们可以简单理解成`useEffect`的回调函数包装在了`requestIdleCallback`中去异步执行，根据`fiber`的知识接下来会去走浏览器当前帧是否有空余时间来判断副作用函数的执行时机。

继续往下走，如果`rootHasEffect === true`，代表有副作用，如果是`useEffect`，副作用已经在上面进入宏任务队列了，所以如果是`useLayoutEffect`，就会在这个条件中去执行，所以在这里我们可以理解到那一句"useEffect和useLayoutEffect的区别是，前者会异步执行副作用函数不会阻塞页面更新，后者会立即执行副作用函数，会阻塞页面更新，不适合写入复杂逻辑。"的原因了。

## 结尾

`useEffect`与`useLayoutEffect`十分相似，就连签名都一样，不同之处就在于前者会在浏览器绘制后延迟执行，而后者会在所有DOM变更之后同步调用`effect`，希望你看到这里，可以对于这个结论的来源有一定的了解和学习，希望可以帮到你~

**如果喜欢我的文章，可以关注我的公众号[「量子前端」](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247483762&idx=1&sn=ec6dc22adeadad8b58cf67c4f3457275&chksm=cfa1d45ff8d65d4937bd7c3076642b1f57691b226a9c6b453a729b014939c7709cf6a4845eb3&token=1905047246&lang=zh_CN&scene=21#wechat_redirect)，将不定期关注推送前端好文~**