> React 知命境第 35 篇，原创第 142 篇

我们知道，Scheduler 是 React 提供的底层调度器。但是这个调度器具体是如何用的，可能大部分人都不太清楚了，好在 React 把内部的模块封装得都相对独立，因此，我们可以想个办法，单独把他的 Scheduler 或者 Reconciler 单独掏出来用。

## 1

**怎么掏**

在 React 的 github 仓库中，找到如下路径的文件：`./packages/scheduler/src`

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcFaD56KicibxDywZEp4ZbcuEvS3Bq9LSg1sNnOibue8KLcweibMSqpEnUib6licSbd8FqtOESUVq8D9go7Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这里就是 Scheduler 的全部代码，如图所示，我们可以在 forks 目录中，找到 `Scheduler.js`，这就是我们的目标文件，他引用了外部的几个小模块的内容

```
<span data-darkreader-inline-color="">//&nbsp;packages/scheduler/src/forks/Scheduler.js</span><br><span>import</span>&nbsp;<span>type</span>&nbsp;{PriorityLevel}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'../SchedulerPriorities'</span>;<br><br><span>import</span>&nbsp;{<br>&nbsp;&nbsp;enableSchedulerDebugging,<br>&nbsp;&nbsp;enableProfiling,<br>&nbsp;&nbsp;enableIsInputPending,<br>&nbsp;&nbsp;enableIsInputPendingContinuous,<br>&nbsp;&nbsp;frameYieldMs,<br>&nbsp;&nbsp;continuousYieldMs,<br>&nbsp;&nbsp;maxYieldMs,<br>&nbsp;&nbsp;userBlockingPriorityTimeout,<br>&nbsp;&nbsp;lowPriorityTimeout,<br>&nbsp;&nbsp;normalPriorityTimeout,<br>}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'../SchedulerFeatureFlags'</span>;<br><br><span>import</span>&nbsp;{push,&nbsp;pop,&nbsp;peek}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'../SchedulerMinHeap'</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;<span data-darkreader-inline-color="">TODO:</span>&nbsp;Use&nbsp;symbols?</span><br><span>import</span>&nbsp;{<br>&nbsp;&nbsp;ImmediatePriority,<br>&nbsp;&nbsp;UserBlockingPriority,<br>&nbsp;&nbsp;NormalPriority,<br>&nbsp;&nbsp;LowPriority,<br>&nbsp;&nbsp;IdlePriority,<br>}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'../SchedulerPriorities'</span>;<br><span>import</span>&nbsp;{<br>&nbsp;&nbsp;markTaskRun,<br>&nbsp;&nbsp;markTaskYield,<br>&nbsp;&nbsp;markTaskCompleted,<br>&nbsp;&nbsp;markTaskCanceled,<br>&nbsp;&nbsp;markTaskErrored,<br>&nbsp;&nbsp;markSchedulerSuspended,<br>&nbsp;&nbsp;markSchedulerUnsuspended,<br>&nbsp;&nbsp;markTaskStart,<br>&nbsp;&nbsp;stopLoggingProfilingEvents,<br>&nbsp;&nbsp;startLoggingProfilingEvents,<br>}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'../SchedulerProfiling'</span>;<br><br><span>export</span>&nbsp;<span>type</span>&nbsp;Callback&nbsp;=&nbsp;<span><span>boolean</span>&nbsp;=&gt;</span>&nbsp;?Callback;<br>
```

> 这里需要注意的是，从 github 上掏出来的代码不是用 TS 写的，而是用 flow 写的，因此这里部分语法可能会报错，需要我们要自己稍作调整才能直接使用，不过改动不大

`SchedulerFeatureFlags.js` 的代码非常简单，就是定义了一些状态来区分不同的执行阶段

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;Copyright&nbsp;(c)&nbsp;Meta&nbsp;Platforms,&nbsp;Inc.&nbsp;and&nbsp;affiliates.<br>&nbsp;*<br>&nbsp;*&nbsp;This&nbsp;source&nbsp;code&nbsp;is&nbsp;licensed&nbsp;under&nbsp;the&nbsp;MIT&nbsp;license&nbsp;found&nbsp;in&nbsp;the<br>&nbsp;*&nbsp;LICENSE&nbsp;file&nbsp;in&nbsp;the&nbsp;root&nbsp;directory&nbsp;of&nbsp;this&nbsp;source&nbsp;tree.<br>&nbsp;*<br>&nbsp;*&nbsp;@flow&nbsp;strict<br>&nbsp;*/</span><br><br><span>export</span>&nbsp;<span>const</span>&nbsp;enableSchedulerDebugging&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;enableIsInputPending&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;enableProfiling&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;enableIsInputPendingContinuous&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;frameYieldMs&nbsp;=&nbsp;<span data-darkreader-inline-color="">5</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;continuousYieldMs&nbsp;=&nbsp;<span data-darkreader-inline-color="">50</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;maxYieldMs&nbsp;=&nbsp;<span data-darkreader-inline-color="">300</span>;<br><br><span>export</span>&nbsp;<span>const</span>&nbsp;userBlockingPriorityTimeout&nbsp;=&nbsp;<span data-darkreader-inline-color="">250</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;normalPriorityTimeout&nbsp;=&nbsp;<span data-darkreader-inline-color="">5000</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;lowPriorityTimeout&nbsp;=&nbsp;<span data-darkreader-inline-color="">10000</span>;<br>
```

`SchedulerMinHeap.js` 封装了几个小顶堆的操作方法，用于优先级队列的任务管理，因此常用的操作就是 `pop、push、peek`

`SchedulerPriorities.js` 定义了几个优先级的常量

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;Copyright&nbsp;(c)&nbsp;Meta&nbsp;Platforms,&nbsp;Inc.&nbsp;and&nbsp;affiliates.<br>&nbsp;*<br>&nbsp;*&nbsp;This&nbsp;source&nbsp;code&nbsp;is&nbsp;licensed&nbsp;under&nbsp;the&nbsp;MIT&nbsp;license&nbsp;found&nbsp;in&nbsp;the<br>&nbsp;*&nbsp;LICENSE&nbsp;file&nbsp;in&nbsp;the&nbsp;root&nbsp;directory&nbsp;of&nbsp;this&nbsp;source&nbsp;tree.<br>&nbsp;*<br>&nbsp;*&nbsp;@flow&nbsp;strict<br>&nbsp;*/</span><br><br><span>export</span>&nbsp;<span>type</span>&nbsp;PriorityLevel&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">5</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;<span data-darkreader-inline-color="">TODO:</span>&nbsp;Use&nbsp;symbols?</span><br><span>export</span>&nbsp;<span>const</span>&nbsp;NoPriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;ImmediatePriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;UserBlockingPriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">2</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;NormalPriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;LowPriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span>;<br><span>export</span>&nbsp;<span>const</span>&nbsp;IdlePriority&nbsp;=&nbsp;<span data-darkreader-inline-color="">5</span>;<br>
```

`SchedulerProfiling.js` 是用来分析性能的，我们在调试的时候可以用一下。一般来说都会将其关掉。

直接把这些文件复制出来，整理好，就能单独使用了。我们可以看一下 `Scheduler.js` 返回了什么方法

```
<span>export</span>&nbsp;{<br>&nbsp;&nbsp;ImmediatePriority&nbsp;<span>as</span>&nbsp;unstable_ImmediatePriority,<br>&nbsp;&nbsp;UserBlockingPriority&nbsp;<span>as</span>&nbsp;unstable_UserBlockingPriority,<br>&nbsp;&nbsp;NormalPriority&nbsp;<span>as</span>&nbsp;unstable_NormalPriority,<br>&nbsp;&nbsp;IdlePriority&nbsp;<span>as</span>&nbsp;unstable_IdlePriority,<br>&nbsp;&nbsp;LowPriority&nbsp;<span>as</span>&nbsp;unstable_LowPriority,<br>&nbsp;&nbsp;unstable_runWithPriority,<br>&nbsp;&nbsp;unstable_next,<br>&nbsp;&nbsp;unstable_scheduleCallback,<br>&nbsp;&nbsp;unstable_cancelCallback,<br>&nbsp;&nbsp;unstable_wrapCallback,<br>&nbsp;&nbsp;unstable_getCurrentPriorityLevel,<br>&nbsp;&nbsp;shouldYieldToHost&nbsp;<span>as</span>&nbsp;unstable_shouldYield,<br>&nbsp;&nbsp;requestPaint&nbsp;<span>as</span>&nbsp;unstable_requestPaint,<br>&nbsp;&nbsp;unstable_continueExecution,<br>&nbsp;&nbsp;unstable_pauseExecution,<br>&nbsp;&nbsp;unstable_getFirstCallbackNode,<br>&nbsp;&nbsp;getCurrentTime&nbsp;<span>as</span>&nbsp;unstable_now,<br>&nbsp;&nbsp;forceFrameRate&nbsp;<span>as</span>&nbsp;unstable_forceFrameRate,<br>};<br>
```

我们可以在源码中去明确这些方法的具体使用方式，然后根据你的需要选择使用即可。

## 2

**语法介绍**

我们可以使用 `unstable_scheduleCallback` 来调度任务，这个方法接收三个参数

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">unstable_scheduleCallback</span>(<span><br>&nbsp;&nbsp;priorityLevel:&nbsp;PriorityLevel,<br>&nbsp;&nbsp;callback:&nbsp;Callback,<br>&nbsp;&nbsp;options?:&nbsp;{delay:&nbsp;<span data-darkreader-inline-color="">number</span>},<br></span>)<br></span>
```

`priorityLevel` 需要的参数我们在上面已经定义好的，数字越小，优先级越高。

`callback` 就是我们需要被调度的任务

`options` 中，我们可以传入 delay，来进一步降低任务执行的优先级，表示延迟任务。他会进入到 `timerQueue` 队列而无法直接执行，只有在特定时机移入到了 `taskQueue` 中之后才会被执行。

`unstable_scheduleCallback` 返回一个 Task 对象，我们可以在源码中看到这个对象大概长这样

```
<span>var</span>&nbsp;newTask:&nbsp;Task&nbsp;=&nbsp;{<br>&nbsp;&nbsp;id:&nbsp;taskIdCounter++,<br>&nbsp;&nbsp;callback,<br>&nbsp;&nbsp;priorityLevel,<br>&nbsp;&nbsp;startTime,<br>&nbsp;&nbsp;expirationTime,<br>&nbsp;&nbsp;sortIndex:&nbsp;<span data-darkreader-inline-color="">-1</span>,<br>};<br>
```

`unstable_cancelCallback` 可以取消正在调度的任务，在源码内部内容，它通过重置 `task.callback = null` 来取消。

OK，了解了基本用法之后，我们就可以来使用它调度任务了。

## 3

**使用**

**想同优先级**

想想如下代码输出顺序如何？

```
unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">1</span>)<br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">2</span>)<br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">3</span>)<br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>})<br><br><span data-darkreader-inline-color="">//&nbsp;输出顺序：1,&nbsp;2,&nbsp;3,&nbsp;4</span><br>
```

由于他们优先级相同，所以会按照任务创建的先后顺序来确定谁的优先级更高。因此，先创建的先执行。

**不同优先级**

现在我们调整一下优先级，思考一下代码输出顺序如何

```
unstable_scheduleCallback(LowPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">1</span>)<br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">2</span>)<br>})<br><br>unstable_scheduleCallback(ImmediatePriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">3</span>)<br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>})<br><span data-darkreader-inline-color="">//&nbsp;输出结果：3,2,4,1</span><br>
```

此时优先级不同，则优先级越高的先执行。

**任务是否超时**

我们在创建任务时，会给任务添加一个 `expirationTime` 字段来表示任务执行时，是否超时。在回调函数中，可以接收一个参数来标记超时状态

```
unstable_scheduleCallback(NormalPriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)<br>})<br>
```

他的判断标准如下

```
<span>const</span>&nbsp;didUserCallbackTimeout&nbsp;=&nbsp;currentTask.expirationTime&nbsp;&lt;=&nbsp;currentTime;<br>
```

`expirationTime` 的计算规则如下

```
<span>var</span>&nbsp;timeout;<br><span>switch</span>&nbsp;(priorityLevel)&nbsp;{<br>&nbsp;&nbsp;<span>case</span>&nbsp;ImmediatePriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Times&nbsp;out&nbsp;immediately</span><br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;<span data-darkreader-inline-color="">-1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;<span>case</span>&nbsp;UserBlockingPriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Eventually&nbsp;times&nbsp;out</span><br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;userBlockingPriorityTimeout;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;<span>case</span>&nbsp;IdlePriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Never&nbsp;times&nbsp;out</span><br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;maxSigned31BitInt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;<span>case</span>&nbsp;LowPriority:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Eventually&nbsp;times&nbsp;out</span><br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;lowPriorityTimeout;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>&nbsp;&nbsp;<span>case</span>&nbsp;NormalPriority:<br>&nbsp;&nbsp;<span>default</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Eventually&nbsp;times&nbsp;out</span><br>&nbsp;&nbsp;&nbsp;&nbsp;timeout&nbsp;=&nbsp;normalPriorityTimeout;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span>;<br>}<br><br><span>var</span>&nbsp;expirationTime&nbsp;=&nbsp;startTime&nbsp;+&nbsp;timeout;<br>
```

上面案例通常情况下会返回 false，但是我们可以在主线程中执行一下耗时任务，让其无法在超时时间以内执行。NormalPriority 优先级的超时时间至少是 5000ms

```
sunstable_scheduleCallback(NormalPriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)&nbsp;<span data-darkreader-inline-color="">//&nbsp;false</span><br>})<br><br><span>const</span>&nbsp;currentTime&nbsp;=&nbsp;performance.now()<br><span>while</span>(performance.now()&nbsp;-&nbsp;currentTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">5000</span>)&nbsp;{}<br>unstable_scheduleCallback(NormalPriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)&nbsp;<span data-darkreader-inline-color="">//&nbsp;true，执行时已经超时</span><br>})<br><br><span>const</span>&nbsp;currentTime&nbsp;=&nbsp;performance.now()<br><span>while</span>(performance.now()&nbsp;-&nbsp;currentTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">5000</span>)&nbsp;{}<br>
```

再来看一个例子

```
unstable_scheduleCallback(UserBlockingPriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">2</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)&nbsp;<span data-darkreader-inline-color="">//&nbsp;true</span><br>})<br><br>unstable_scheduleCallback(ImmediatePriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">3</span>)<br>&nbsp;&nbsp;<span>const</span>&nbsp;currentTime&nbsp;=&nbsp;performance.now()<br>&nbsp;&nbsp;<span>while</span>(performance.now()&nbsp;-&nbsp;currentTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">100</span>)&nbsp;{}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)&nbsp;<span data-darkreader-inline-color="">//&nbsp;true</span><br>})<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;<span>(<span>isTimeout</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">4</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(isTimeout)&nbsp;<span data-darkreader-inline-color="">//&nbsp;false</span><br>})<br><br><span>const</span>&nbsp;currentTime&nbsp;=&nbsp;performance.now()<br><span>while</span>(performance.now()&nbsp;-&nbsp;currentTime&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">200</span>)&nbsp;{}<br>
```

此时主线程卡住 200ms，因此 3 `ImmediatePriority` 超时。此时 3 执行，又卡了 100ms，那么 2 UserBlockingPriority 对应 250ms 延迟时间，此时也超时了

**任务中断**

此时我们要声明一个任务来遍历一个数组，数组中的每一项的执行时间都比较长，声明数组如下

```
<span>const</span>&nbsp;tasks:&nbsp;<span data-darkreader-inline-color="">any</span>[]&nbsp;=&nbsp;[<br>&nbsp;&nbsp;[<span data-darkreader-inline-color="">"1"</span>,&nbsp;<span data-darkreader-inline-color="">3</span>],<br>&nbsp;&nbsp;[<span data-darkreader-inline-color="">"2"</span>,&nbsp;<span data-darkreader-inline-color="">3</span>],<br>&nbsp;&nbsp;[<span data-darkreader-inline-color="">"3"</span>,&nbsp;<span data-darkreader-inline-color="">5</span>],<br>&nbsp;&nbsp;[<span data-darkreader-inline-color="">"4"</span>,&nbsp;<span data-darkreader-inline-color="">7</span>],<br>&nbsp;&nbsp;[<span data-darkreader-inline-color="">"5"</span>,&nbsp;<span data-darkreader-inline-color="">9</span>],<br>];<br>
```

我们可以结合 `unstable_shouldYield` 来判断当前执行时间是否过长，然后以中断遍历过程的方式，中断任务的执行。

```
<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">node_task</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'开始执行任务'</span>)<br>&nbsp;&nbsp;<span>var</span>&nbsp;task<br>&nbsp;&nbsp;<span>while</span>(task&nbsp;=&nbsp;tasks.shift())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;now&nbsp;=&nbsp;performance.now()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;卡住执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>while</span>(performance.now()&nbsp;-&nbsp;now&nbsp;&lt;&nbsp;task[<span data-darkreader-inline-color="">1</span>])&nbsp;{}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(task[<span data-darkreader-inline-color="">0</span>],&nbsp;<span data-darkreader-inline-color="">'小任务执行完毕'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(unstable_shouldYield())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'执行超过了&nbsp;5ms，中断执行'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;node_task<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

unstable\_shouldYield 是超过 5ms 就需要中断一次，此时我们发现，任务 1 与 任务 2 加起来超过了 5ms，因此 2 执行完之后，会中断一次。，后面的每个任务都比较长，因此每个任务执行完都会中断一次，所以总共会中断 4 次

调度之后，我们看看打印结果

```
unstable_scheduleCallback(NormalPriority,&nbsp;node_task);<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

完整的符合预期。

**高优先级插队**

我们只需要把上面的案例稍作调整，就能做到高优先级插队。在 node\_task 的执行过程中，我们利用 setTimeout 调度一个更高优先级的任务。

```
const&nbsp;tasks:&nbsp;any[]&nbsp;=&nbsp;[<br>&nbsp;&nbsp;["1",&nbsp;3],<br>&nbsp;&nbsp;["2",&nbsp;3],<br>&nbsp;&nbsp;["3",&nbsp;5],<br>&nbsp;&nbsp;["4",&nbsp;7],<br>&nbsp;&nbsp;["5",&nbsp;9],<br>];<br><br>function&nbsp;node_task()&nbsp;{<br>&nbsp;&nbsp;console.log('--开始执行任务--')<br>&nbsp;&nbsp;var&nbsp;task<br>&nbsp;&nbsp;while(task&nbsp;=&nbsp;tasks.shift())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;now&nbsp;=&nbsp;performance.now()<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;卡住执行<br>&nbsp;&nbsp;&nbsp;&nbsp;while(performance.now()&nbsp;-&nbsp;now&nbsp;&lt;&nbsp;task[1])&nbsp;{}<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(task[0],&nbsp;'小任务执行完毕')<br>&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(unstable_shouldYield())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('执行超过了&nbsp;5ms，中断执行')<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;node_task<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br><br>unstable_scheduleCallback(NormalPriority,&nbsp;node_task);<br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;setTimeout(()&nbsp;=&gt;&nbsp;{</span><br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;&nbsp;&nbsp;unstable_scheduleCallback(ImmediatePriority,&nbsp;()&nbsp;=&gt;&nbsp;{</span><br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('我是高优先级插队')</span><br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;&nbsp;});</span><br><span data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">+&nbsp;},&nbsp;10)</span><br>
```

执行结果如下，插队成功

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 4

**总结**

我们可以利用这一套优先级队列的调度，解决实践中的需求。例如，在开发弹幕功能的时候，我们会想办法优先让自己发的弹幕先弹出来。或者在消息弹窗提示时，优先弹出错误警告等。

> **「React 知命境」** 是一本从知识体系顶层出发，理论结合实践，通俗易懂，覆盖面广的精品小册，点击下方标签可阅读其他文章。欢迎关注我的公众号，我会持续更新。[购买 React 哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)，或者赞赏本文 30 元，可进入 **React 付费讨论群**，学习氛围良好，学习进度加倍。赞赏之后也能看到 React 哲学的全部内容