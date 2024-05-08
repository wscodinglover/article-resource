> 本文作者为 360 奇舞团前端开发工程师

## 前言

> 本文中使用的`React`版本为18，在摘取代码的过程中删减了部分代码，具体以源代码为准。

在`React 18`里，通过`ReactDOM.createRoot`创建根节点。并且通过调用原型链上的`render`来渲染。 本文主要是从以下两个方法来介绍展开。

```
<span>import</span>&nbsp;React&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span>import</span>&nbsp;ReactDOM&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom/client'</span>;<br><span>import</span>&nbsp;App&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'./App.tsx'</span>;<br><br>ReactDOM.createRoot(<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>)).render(<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>React.StrictMode</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>App</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>React.StrictMode</span>&gt;</span></span><br>);<br>
```

## 一、createRoot()

`createRoot`这个方法主要是用来创建`FiberRoot`（全局唯一，保存全局状态）和`RootFiber`(是应用里的第一个fiber对象)，并将其关系关联起来。主要有以下过程：

1.  校验`container`有效性，以及处理`options`参数
    
2.  创建`FiberRoot`和`rootFiber`，并关联起来
    
3.  事件代理
    
4.  返回`ReactDOMRoot`实例
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">createRoot</span>(<span><br>&nbsp;&nbsp;container:&nbsp;Element&nbsp;|&nbsp;Document&nbsp;|&nbsp;DocumentFragment,<br>&nbsp;&nbsp;options?:&nbsp;CreateRootOptions,<br></span>):&nbsp;<span data-darkreader-inline-color="">RootType</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;校验合法性，以及处理options参数，此处省略</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(!isValidContainer(container))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//...</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用&nbsp;createFiberRoot，创建FiberRoot和rootFiber，并关联关系，最终返回FiberRoot。FiberRoot.current&nbsp;=&nbsp;rootFiber;&nbsp;rootFiber.stateNode&nbsp;=&nbsp;FiberRoot;</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;root&nbsp;=&nbsp;createContainer(<br>&nbsp;&nbsp;&nbsp;&nbsp;container,<br>&nbsp;&nbsp;&nbsp;&nbsp;ConcurrentRoot,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;isStrictMode,<br>&nbsp;&nbsp;&nbsp;&nbsp;concurrentUpdatesByDefaultOverride,<br>&nbsp;&nbsp;&nbsp;&nbsp;identifierPrefix,<br>&nbsp;&nbsp;&nbsp;&nbsp;onRecoverableError,<br>&nbsp;&nbsp;&nbsp;&nbsp;transitionCallbacks,<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;标记container和rootFiber关系&nbsp;&nbsp;container['__reactContainer$'&nbsp;+&nbsp;randomKey]&nbsp;=&nbsp;root.current</span><br>&nbsp;&nbsp;markContainerAsRoot(root.current,&nbsp;container);&nbsp;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>const</span>&nbsp;rootContainerElement:&nbsp;Document&nbsp;|&nbsp;Element&nbsp;|&nbsp;DocumentFragment&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;container.nodeType&nbsp;===&nbsp;COMMENT_NODE<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;(container.parentNode:&nbsp;any)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;container;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;listenToAllSupportedEvents(rootContainerElement);&nbsp;<span data-darkreader-inline-color="">//&nbsp;事件代理</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;实例化，挂载render，unmount方法</span><br>&nbsp;&nbsp;<span>return</span>&nbsp;<span>new</span>&nbsp;ReactDOMRoot(root);&nbsp;<span data-darkreader-inline-color="">//&nbsp;this._internalRoot&nbsp;=&nbsp;root;</span><br>}<br>
```

### 关系结构示意图

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 二、render()

`render`主要是通过调用`updateContainer`，将组件渲染在页面上。

```
ReactDOMHydrationRoot.prototype.render&nbsp;=&nbsp;ReactDOMRoot.prototype.render&nbsp;=&nbsp;<span><span>function</span>(<span><br>&nbsp;&nbsp;children:&nbsp;ReactNodeList,<br></span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;root&nbsp;=&nbsp;<span>this</span>._internalRoot;<br>&nbsp;&nbsp;<span>if</span>&nbsp;(root&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>throw</span>&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Error</span>(<span data-darkreader-inline-color="">'Cannot&nbsp;update&nbsp;an&nbsp;unmounted&nbsp;root.'</span>);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;updateContainer(children,&nbsp;root,&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">null</span>);<br>};<br>
```

### updateContainer

`updateContainer`主要执行了以下步骤：

1.  获取当前时间`eventTime`和任务优先级`lane`，调用`createUpdate`生成`update`;
    
2.  执行`enqueueUpdate`将更新添加到更新队列里，并返回`FiberRoot`;
    
3.  `scheduleUpdateOnFiber` 调度更新;
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">updateContainer</span>(<span><br>&nbsp;&nbsp;element:&nbsp;ReactNodeList,<br>&nbsp;&nbsp;container:&nbsp;OpaqueRoot,<br>&nbsp;&nbsp;parentComponent:&nbsp;?React$Component&lt;<span data-darkreader-inline-color="">any</span>,&nbsp;<span data-darkreader-inline-color="">any</span>&gt;,<br>&nbsp;&nbsp;callback:&nbsp;?<span data-darkreader-inline-color="">Function</span>,<br></span>):&nbsp;<span data-darkreader-inline-color="">Lane</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;current&nbsp;=&nbsp;container.current;&nbsp;<span data-darkreader-inline-color="">//&nbsp;rootFiber</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;eventTime&nbsp;=&nbsp;requestEventTime();&nbsp;<span data-darkreader-inline-color="">//&nbsp;更新触发时间</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;lane&nbsp;=&nbsp;requestUpdateLane(current);&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取任务优先级</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...&nbsp;context&nbsp;处理&nbsp;</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建update：{eventTime,&nbsp;lane,&nbsp;tag:&nbsp;UpdateState&nbsp;//&nbsp;更新类型,&nbsp;payload:&nbsp;null,&nbsp;callback:&nbsp;null,&nbsp;next:&nbsp;null,&nbsp;//&nbsp;下一个更新}</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;update&nbsp;=&nbsp;createUpdate(eventTime,&nbsp;lane);&nbsp;<br>&nbsp;&nbsp;update.payload&nbsp;=&nbsp;{element};&nbsp;<span data-darkreader-inline-color="">//&nbsp;element首次渲染时为App</span><br><br>&nbsp;&nbsp;callback&nbsp;=&nbsp;callback&nbsp;===&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;:&nbsp;callback;<br>&nbsp;&nbsp;<span>if</span>&nbsp;(callback&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;update.callback&nbsp;=&nbsp;callback;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;root&nbsp;=&nbsp;enqueueUpdate(current,&nbsp;update,&nbsp;lane);&nbsp;<span data-darkreader-inline-color="">//&nbsp;将update添加到concurrentQueues队列里，返回&nbsp;FiberRoot</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(root&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;scheduleUpdateOnFiber(root,&nbsp;current,&nbsp;lane,&nbsp;eventTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;调度</span><br>&nbsp;&nbsp;&nbsp;&nbsp;entangleTransitions(root,&nbsp;current,&nbsp;lane);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;lane;<br>}<br>
```

### 调度阶段

#### 调度入口：scheduleUpdateOnFiber

主要有以下过程：

1.  在`root`上标记更新
    
2.  通过执行`ensureRootIsScheduled`来调度任务
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">scheduleUpdateOnFiber</span>(<span><br>&nbsp;&nbsp;root:&nbsp;FiberRoot,<br>&nbsp;&nbsp;fiber:&nbsp;Fiber,<br>&nbsp;&nbsp;lane:&nbsp;Lane,<br>&nbsp;&nbsp;eventTime:&nbsp;<span data-darkreader-inline-color="">number</span>,<br></span>)&nbsp;</span>{<br>&nbsp;&nbsp;markRootUpdated(root,&nbsp;lane,&nbsp;eventTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;在root上标记更新&nbsp;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;root.pendingLanes&nbsp;|=&nbsp;lane;&nbsp;将update的lane放到root.pendingLanes</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置lane对应事件时间&nbsp;root.eventTimes[laneToIndex(lane)]&nbsp;=&nbsp;eventTime;</span><br><br>&nbsp;&nbsp;<span>if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;(executionContext&nbsp;&amp;&nbsp;RenderContext)&nbsp;!==&nbsp;NoLanes&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;===&nbsp;workInProgressRoot<br>&nbsp;&nbsp;)&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;更新是在渲染阶段调度提示错误&nbsp;...</span><br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">//&nbsp;正常更新</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;ensureRootIsScheduled(root,&nbsp;eventTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;调度任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;}<br>}<br>
```

#### 调度优先级：ensureRootIsScheduled

该函数用于调度任务，一个root只能有一个任务在执行

1.  设置任务的过期时间，有过期任务加入到`expiredLanes`中
    
2.  获取下一个要处理的优先级，没有要执行的则退出
    
3.  判断优先级相等则复用，否则取消当前执行的任务，重新调度。
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">ensureRootIsScheduled</span>(<span>root:&nbsp;FiberRoot,&nbsp;currentTime:&nbsp;<span data-darkreader-inline-color="">number</span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;existingCallbackNode&nbsp;=&nbsp;root.callbackNode;&nbsp;<span data-darkreader-inline-color="">//&nbsp;正在执行的任务</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;遍历root.pendingLanes，没有过期时间设置root.expirationTimes，有过期时间判断是否过期，是则加入到root.expiredLanes中</span><br>&nbsp;&nbsp;markStarvedLanesAsExpired(root,&nbsp;currentTime);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;过期时间设置&nbsp;root.expirationTimes&nbsp;=&nbsp;currentTime+t(普通任务5000ms，用户输入250ms);</span><br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取要处理的下一个lanes</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;nextLanes&nbsp;=&nbsp;getNextLanes(<br>&nbsp;&nbsp;&nbsp;&nbsp;root,<br>&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;===&nbsp;workInProgressRoot&nbsp;?&nbsp;workInProgressRootRenderLanes&nbsp;:&nbsp;NoLanes,<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;没有要执行的lanes</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(nextLanes&nbsp;===&nbsp;NoLanes)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(existingCallbackNode&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;取消正在执行的任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cancelCallback(existingCallbackNode);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;root.callbackNode&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;root.callbackPriority&nbsp;=&nbsp;NoLane;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;newCallbackPriority&nbsp;=&nbsp;getHighestPriorityLane(nextLanes);&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取最高优先级的lane</span><br><br>&nbsp;&nbsp;<span>const</span>&nbsp;existingCallbackPriority&nbsp;=&nbsp;root.callbackPriority;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;优先级相等复用已有的任务</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;existingCallbackPriority&nbsp;===&nbsp;newCallbackPriority&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;!(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__DEV__&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReactCurrentActQueue.current&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;existingCallbackNode&nbsp;!==&nbsp;fakeActCallbackNode<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;优先级变化，取消正在执行的任务，重新调度</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(existingCallbackNode&nbsp;!=&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cancelCallback(existingCallbackNode);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>let</span>&nbsp;newCallbackNode;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注册调度任务</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;同步任务，不可中断</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;1.&nbsp;调用scheduleSyncCallback将任务添加到队列syncQueue里；</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2.&nbsp;创建微任务，调用flushSyncCallbacks，遍历syncQueue队列执行performSyncWorkOnRoot，清空队列；</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(newCallbackPriority&nbsp;===&nbsp;SyncLane)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(root.tag&nbsp;===&nbsp;LegacyRoot)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(<span data-darkreader-inline-color="">null</span>,&nbsp;root));<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduleSyncCallback(performSyncWorkOnRoot.bind(<span data-darkreader-inline-color="">null</span>,&nbsp;root));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(supportsMicrotasks)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;支持微任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduleMicrotask(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(executionContext&nbsp;&amp;&nbsp;(RenderContext&nbsp;|&nbsp;CommitContext))&nbsp;===<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NoContext<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flushSyncCallbacks();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduleCallback(ImmediateSchedulerPriority,&nbsp;flushSyncCallbacks);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;newCallbackNode&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>let</span>&nbsp;schedulerPriorityLevel;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>switch</span>&nbsp;(lanesToEventPriority(nextLanes))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;DefaultEventPriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schedulerPriorityLevel&nbsp;=&nbsp;NormalSchedulerPriority;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>default</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schedulerPriorityLevel&nbsp;=&nbsp;NormalSchedulerPriority;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;非同步任务，可中断</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;1.&nbsp;维护了两个队列&nbsp;timerQueue&nbsp;taskQueue</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2.&nbsp;通过requestHostCallback开启宏任务执行任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;newCallbackNode&nbsp;=&nbsp;scheduleCallback(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schedulerPriorityLevel,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;performConcurrentWorkOnRoot.bind(<span data-darkreader-inline-color="">null</span>,&nbsp;root),<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;root.callbackPriority&nbsp;=&nbsp;newCallbackPriority;<br>&nbsp;&nbsp;root.callbackNode&nbsp;=&nbsp;newCallbackNode;<br>}<br>
```

#### 调度任务 scheduleSyncCallback or scheduleCallback

-   `scheduleSyncCallback` 只有一个队列，将任务添加到队列里。按照顺序同步执行，不能中断。
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">scheduleSyncCallback</span>(<span>callback:&nbsp;SchedulerCallback</span>)&nbsp;</span>{&nbsp;<span data-darkreader-inline-color="">//&nbsp;callback&nbsp;=》performSyncWorkOnRoot</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(syncQueue&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;syncQueue&nbsp;=&nbsp;[callback];<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;syncQueue.push(callback);<br>&nbsp;&nbsp;}<br>}<br>
```

-   `scheduleCallback` 有两个队列（小顶堆），`timerQueue`存放未就绪的任务，`taskQueue`存放已就绪任务。每次循环，判断`timerQueue`里是否有可执行任务，并将其移动到`taskQueue`中，然后从`taskQueue`中取出任务执行。
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">unstable_scheduleCallback</span>(<span>priorityLevel,&nbsp;callback,&nbsp;options</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...&nbsp;startTime&nbsp;timeout&nbsp;expirationTime&nbsp;等初始化</span><br>&nbsp;&nbsp;<span>var</span>&nbsp;newTask&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">//&nbsp;新的调度任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;taskIdCounter++,<br>&nbsp;&nbsp;&nbsp;&nbsp;callback,&nbsp;<span data-darkreader-inline-color="">//&nbsp;render时为performConcurrentWorkOnRoot.bind(null,&nbsp;root),</span><br>&nbsp;&nbsp;&nbsp;&nbsp;priorityLevel,<br>&nbsp;&nbsp;&nbsp;&nbsp;startTime,&nbsp;<span data-darkreader-inline-color="">//&nbsp;getCurrentTime()</span><br>&nbsp;&nbsp;&nbsp;&nbsp;expirationTime,&nbsp;<span data-darkreader-inline-color="">//&nbsp;startTime&nbsp;+&nbsp;timeout(根据priorityLevel,-1、250、1073741823、10000、5000、)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;sortIndex:&nbsp;<span data-darkreader-inline-color="">-1</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;startTime&nbsp;&gt;&nbsp;currentTime&nbsp;?&nbsp;startTime:&nbsp;expirationTime,</span><br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;按照是否过期将任务推到队列timerQueue或者taskQueue里</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(startTime&nbsp;&gt;&nbsp;currentTime)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;startTime;<br>&nbsp;&nbsp;&nbsp;&nbsp;push(timerQueue,&nbsp;newTask);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(peek(taskQueue)&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;newTask&nbsp;===&nbsp;peek(timerQueue))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(isHostTimeoutScheduled)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cancelHostTimeout();&nbsp;<span data-darkreader-inline-color="">//&nbsp;取消当前的timeout</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isHostTimeoutScheduled&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;本质上是从timerQueue去取可以执行的任务放到taskQueue里，然后执行requestHostCallback</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestHostTimeout(handleTimeout,&nbsp;startTime&nbsp;-&nbsp;currentTime);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;newTask.sortIndex&nbsp;=&nbsp;expirationTime;<br>&nbsp;&nbsp;&nbsp;&nbsp;push(taskQueue,&nbsp;newTask);<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调度任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(!isHostCallbackScheduled&nbsp;&amp;&amp;&nbsp;!isPerformingWork)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isHostCallbackScheduled&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestHostCallback(flushWork);&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置isMessageLoopRunning，开启宏任务【schedulePerformWorkUntilDeadline】（优先级：setImmediate&nbsp;&gt;&nbsp;MessageChannel&nbsp;&gt;&nbsp;setTimeout）执行&nbsp;performWorkUntilDeadline()</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;newTask;<br>}<br>
```

> 这里要注意下，一直以来都认为是`MessageChannel`优先级大于`setTimeout`，但在浏览器打印之后发现事实相反。这个原因是chrome在某次更新里修改了二者的优先级顺序。想了解更多可以查看这篇文章：聊聊浏览器宏任务的优先级 - 掘金

#### 执行任务 performWorkUntilDeadline

当监听到`MessageChannel message`的时候，执行该方法。通过调用`scheduledHostCallback`(即`flushWork->workLoop`返回的)结果，判断是否还有任务，若有则开启下一个宏任务。

```
<span>const</span>&nbsp;performWorkUntilDeadline&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(scheduledHostCallback&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;currentTime&nbsp;=&nbsp;getCurrentTime();<br>&nbsp;&nbsp;&nbsp;&nbsp;startTime&nbsp;=&nbsp;currentTime;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;hasTimeRemaining&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>let</span>&nbsp;hasMoreWork&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hasMoreWork&nbsp;=&nbsp;scheduledHostCallback(hasTimeRemaining,&nbsp;currentTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;scheduledHostCallback&nbsp;=&nbsp;flushWork&nbsp;-&gt;workLoop</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>finally</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(hasMoreWork)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schedulePerformWorkUntilDeadline();&nbsp;<span data-darkreader-inline-color="">//&nbsp;开启下一个宏任务MessageChannel，执行&nbsp;performWorkUntilDeadline()</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isMessageLoopRunning&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheduledHostCallback&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;isMessageLoopRunning&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;needsPaint&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>};<br>
```

#### workLoop

从`taskQueue`取出任务执行`task.callback`即（`performConcurrentWorkOnRoot`）。如果`callback`返回的是函数，则表示任务被中断。否则任务执行完毕，则弹出该任务。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">workLoop</span>(<span>hasTimeRemaining,&nbsp;initialTime</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>let</span>&nbsp;currentTime&nbsp;=&nbsp;initialTime;<br>&nbsp;&nbsp;advanceTimers(currentTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;将&nbsp;timerQueue里到时间执行的定时任务移动到&nbsp;taskQueue&nbsp;里</span><br>&nbsp;&nbsp;currentTask&nbsp;=&nbsp;peek(taskQueue);&nbsp;<span data-darkreader-inline-color="">//&nbsp;从&nbsp;taskQueue&nbsp;取任务</span><br>&nbsp;&nbsp;<span>while</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;currentTask&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;!(enableSchedulerDebugging&nbsp;&amp;&amp;&nbsp;isSchedulerPaused)<br>&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;任务未过期并且任务被中断</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentTask.expirationTime&nbsp;&gt;&nbsp;currentTime&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(!hasTimeRemaining&nbsp;||&nbsp;shouldYieldToHost())<br>&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;callback&nbsp;=&nbsp;currentTask.callback;&nbsp;<span data-darkreader-inline-color="">//&nbsp;在scheduleCallback接受的第二个参数：performConcurrentWorkOnRoot</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(<span>typeof</span>&nbsp;callback&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentTask.callback&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentPriorityLevel&nbsp;=&nbsp;currentTask.priorityLevel;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;didUserCallbackTimeout&nbsp;=&nbsp;currentTask.expirationTime&nbsp;&lt;=&nbsp;currentTime;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果返回是函数，则代表要重新执行；</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;continuationCallback&nbsp;=&nbsp;callback(didUserCallbackTimeout);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentTime&nbsp;=&nbsp;getCurrentTime();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(<span>typeof</span>&nbsp;continuationCallback&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;任务暂停重新赋值callback</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentTask.callback&nbsp;=&nbsp;continuationCallback;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;任务完成弹出</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(currentTask&nbsp;===&nbsp;peek(taskQueue))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pop(taskQueue);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advanceTimers(currentTime);&nbsp;<span data-darkreader-inline-color="">//&nbsp;每次执行完，去timerQueue查看有没有到时间的任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pop(taskQueue);&nbsp;<span data-darkreader-inline-color="">//&nbsp;弹出该任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;currentTask&nbsp;=&nbsp;peek(taskQueue);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回给外部判断是否还有任务需要执行，即performWorkUntilDeadline里面的hasMoreWork</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(currentTask&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;taskQueue里面没有任务了，从timerQueue取任务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;firstTimer&nbsp;=&nbsp;peek(timerQueue);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(firstTimer&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;目的将timerQueue里的任务，移动到taskQueue里执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestHostTimeout(handleTimeout,&nbsp;firstTimer.startTime&nbsp;-&nbsp;currentTime);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;}<br>}<br>
```

### Render 阶段

> 这里render不是实际的dom render，而是fiber树的构建阶段。

#### Render入口

-   performSyncWorkOnRoot: 同步更新 =》 renderRootSync =》 workLoopSync
    
-   performConcurrentWorkOnRoot: 异步更新 =》 renderRootConcurrent =》 workLoopConcurrent
    

二者的区别主要是是否调用`shouldYield`，判断是否中断循环。

render之后就进入了commit阶段。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">performConcurrentWorkOnRoot</span>(<span>root,&nbsp;didTimeout</span>)&nbsp;</span>{<br>&nbsp;&nbsp;currentEventTime&nbsp;=&nbsp;NoTimestamp;<br>&nbsp;&nbsp;currentEventTransitionLane&nbsp;=&nbsp;NoLanes;<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;originalCallbackNode&nbsp;=&nbsp;root.callbackNode;<br>&nbsp;&nbsp;<span>const</span>&nbsp;didFlushPassiveEffects&nbsp;=&nbsp;flushPassiveEffects();<br>&nbsp;&nbsp;<span>if</span>&nbsp;(didFlushPassiveEffects)&nbsp;{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>let</span>&nbsp;lanes&nbsp;=&nbsp;getNextLanes(<br>&nbsp;&nbsp;&nbsp;&nbsp;root,<br>&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;===&nbsp;workInProgressRoot&nbsp;?&nbsp;workInProgressRootRenderLanes&nbsp;:&nbsp;NoLanes,<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<span>if</span>&nbsp;(lanes&nbsp;===&nbsp;NoLanes)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;判断是否有用户输入、过期任务打断，需要同步渲染</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;shouldTimeSlice&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;!includesBlockingLane(root,&nbsp;lanes)&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;!includesExpiredLane(root,&nbsp;lanes)&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;(disableSchedulerTimeoutInWorkLoop&nbsp;||&nbsp;!didTimeout);&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;renderRootConcurrent｜renderRootSync里都会调用prepareFreshStack：构建新的workInProgress树</span><br>&nbsp;&nbsp;<span>let</span>&nbsp;exitStatus&nbsp;=&nbsp;shouldTimeSlice<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;renderRootConcurrent(root,&nbsp;lanes)<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;renderRootSync(root,&nbsp;lanes);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;render执行完成或抛出异常</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;!==&nbsp;RootInProgress)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;===&nbsp;RootErrored)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;===&nbsp;RootFatalErrored)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;===&nbsp;RootDidNotComplete)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;markRootSuspended(root,&nbsp;lanes);<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;render完成</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;renderWasConcurrent&nbsp;=&nbsp;!includesBlockingLane(root,&nbsp;lanes);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;finishedWork:&nbsp;Fiber&nbsp;=&nbsp;(root.current.alternate:&nbsp;<span data-darkreader-inline-color="">any</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderWasConcurrent&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!isRenderConsistentWithExternalStores(finishedWork)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exitStatus&nbsp;=&nbsp;renderRootSync(root,&nbsp;lanes);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;===&nbsp;RootErrored)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(exitStatus&nbsp;===&nbsp;RootFatalErrored)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将新的fiber树赋值给root.finishedWork</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;root.finishedWork&nbsp;=&nbsp;finishedWork;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;root.finishedLanes&nbsp;=&nbsp;lanes;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;进入commit阶段-&gt;调用&nbsp;commitRoot-&gt;&nbsp;commitRootImpl;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;commitRootImpl&nbsp;执行完成之后会清空重置root.callbackNode和root.callbackPriority；以及重置workInProgressRoot、workInProgress、workInProgressRootRenderLanes。</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finishConcurrentRender(root,&nbsp;exitStatus,&nbsp;lanes);&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;ensureRootIsScheduled(root,&nbsp;now());&nbsp;<span data-darkreader-inline-color="">//&nbsp;退出前检测，是否有其他更新，需要发起调度</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(root.callbackNode&nbsp;===&nbsp;originalCallbackNode)&nbsp;{&nbsp;<span data-darkreader-inline-color="">//&nbsp;没有改变，说明任务被中断，返回function，等待调用</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;performConcurrentWorkOnRoot.bind(<span data-darkreader-inline-color="">null</span>,&nbsp;root);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span data-darkreader-inline-color="">null</span>;<br>}<br>
```

#### 是否可中断循环

workLoopSync 和 workLoopConcurrent

-   共同点：用于构建fiber树，`workInProgress`从根开始，遍历创建fiber节点。
    
-   区别是：`workLoopConcurrent`里面增加了`shouldYield`判断。
    

```
function workLoopSync() {<br>  while (workInProgress !== null) {<br>    performUnitOfWork(workInProgress);<br>  }<br>}<br><br>function workLoopConcurrent() {<br>  while (workInProgress !== null &amp;&amp; !shouldYield()) {<br>    performUnitOfWork(workInProgress);<br>  }<br>}<br>
```

#### 递归阶段 performUnitOfWork

> 遍历过程：从rootFiber向下采用深度优先遍历，当遍历到叶子节点时（递），然后会进入到归阶段，即遍历该节点的兄弟节点，如果没有兄弟节点则返回父节点。然后进行递归的交错执行。

-   递阶段 `beginWork`: 创建或复用fiber节点。diff过程在此发生；
    
-   归阶段 `completeWork`: 由下至上根据fiber创建或复用真实节点，并赋值给`fiber.stateNode`；
    

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">performUnitOfWork</span>(<span>unitOfWork:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{&nbsp;<span data-darkreader-inline-color="">//&nbsp;unitOfWork即workInProgress，指向下一个节点</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;current&nbsp;=&nbsp;unitOfWork.alternate;<br>&nbsp;&nbsp;<span>let</span>&nbsp;next;<br>&nbsp;&nbsp;next&nbsp;=&nbsp;beginWork(current,&nbsp;unitOfWork,&nbsp;renderLanes);&nbsp;<br><br>&nbsp;&nbsp;unitOfWork.memoizedProps&nbsp;=&nbsp;unitOfWork.pendingProps;<br>&nbsp;&nbsp;<span>if</span>&nbsp;(next&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;遍历到叶子节点后，开始归阶段，并创建dom节点</span><br>&nbsp;&nbsp;&nbsp;&nbsp;completeUnitOfWork(unitOfWork);<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;next;&nbsp;<span data-darkreader-inline-color="">//&nbsp;workInProgress指向next</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;ReactCurrentOwner.current&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>}<br>
```

#### 递归后的新的fiber树

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### Commit 阶段

通过`commitRoot`进入`commit`阶段。此阶段是同步执行的，不可中断。接下来经历了三个过程：

1.  before mutation阶段（执行DOM操作前）：处理DOM节点渲染/删除后的focus、blur逻辑；调用getSnapshotBeforeUpdate生命周期钩子；调度useEffect。
    
2.  mutation阶段（执行DOM操作）：DOM 插入、更新、删除
    
3.  layout阶段（执行DOM操作后）：调用类组件的 `componentDidMount、componentDidUpdate、setState` 的回调函数；或函数组件的`useLayoutEffect`的`create`函数；更新`ref`。
    

### 页面渲染结果

```
import { useState } from 'react';<br><br>export default function Count() {<br>  const [num, setNum] = useState(1);<br>  const onClick = () =&gt; {<br>    setNum(num + 1);<br>  };<br>  return (<br>    &lt;div&gt;<br>      num is {num}<br>      &lt;button onClick={onClick}&gt;点击+1&lt;/button&gt;<br>    &lt;/div&gt;<br>  );<br>}<br><br>function List() {<br>  const arr = [1, 2, 3];<br>  return (<br>    &lt;ul&gt;<br>      {arr.map((item) =&gt; (<br>        &lt;li key={item}&gt;{item}&lt;/li&gt;<br>      ))}<br>    &lt;/ul&gt;<br>  );<br>}<br><br>function App() {<br>  return (<br>    &lt;div&gt;<br>      &lt;Count /&gt;<br>      &lt;List /&gt;<br>    &lt;/div&gt;<br>  );<br>}<br><br>export default App;<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 参考文章

\[1\] React _https://github.com/facebook/react_  
\[2\] React技术揭秘 _https://react.iamkasong.com/_  
\[3\] 图解React _https://7km.top/main/macro-structure/_  
\[4\] 聊聊浏览器宏任务的优先级 _https://juejin.cn/post/7202211586676064315_

-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2023 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！