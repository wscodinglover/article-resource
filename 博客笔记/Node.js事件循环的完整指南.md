![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/83d3vL8fIicazXz8IrRRUVORibwONYeYDwLwnY1kt2ia1arwHLq9iaiaedVjsQ1GZJljlyWesiagGCmO36bpFpQTTBPQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 原文作者：Joseph Mawa
> 
> 原文地址：https://blog.logrocket.com/complete-guide-node-js-event-loop/
> 
> 翻译：一川

`Node.js` 是一个单线程、非阻塞、事件驱动的 `JavaScript` 运行时环境。Node 运行时环境使您能够在服务器端的浏览器之外运行 `JavaScript`。

`Node.js` 的异步和非阻塞功能主要由事件循环编排。在本文中，您将学习 `Node.js` 事件循环，以便可以利用其异步 API 来构建高效的 `Node.js` 应用程序。了解事件循环在内部的工作方式不仅可以帮助您编写健壮且高性能的`Node.js`代码，而且还会教您有效地调试性能问题。

## 什么是 Node.js 中的事件循环？

`Node.js` 事件循环是一个连续运行的半无限循环。只要存在挂起的异步操作，它就会运行。使用该 node 命令启动 `Node.js` 进程将执行您的 JavaScript 代码并初始化事件循环。如果 Node.js 在执行脚本时遇到异步操作（如计时器、文件和网络 I/O），则会将该操作卸载到本机系统或线程池。

大多数 I/O 操作（如读取和写入文件、文件加密和解密以及网络）都非常耗时且计算成本高昂。因此，为了避免阻塞主线程，Node.js 将这些操作卸载到本机系统。在那里，节点进程正在运行，因此系统并行处理这些操作。

大多数现代操作系统内核在设计上都是多线程的。因此，操作系统可以并发处理多个操作，并在这些操作完成时通知 Node.js。事件循环负责执行异步 API 回调。它有六个主要阶段：

-   `Timers`：用于处理 `setTimeout` 和 `setInterval`
    
-   `Pending callbacks`：用于执行延迟回调的挂起回调阶段
    
-   `Idle`：空闲，事件循环用于内部内务处理的准备阶段
    
-   `Poll`：轮询和处理事件（如文件和网络 I/O）的轮询阶段
    
-   `Check`：检查执行 setImmediate 回调的阶段
    
-   `Close`：用于处理某些关闭事件的关闭阶段
    

虽然上面的列表是线性的，但事件循环是循环和迭代的，如下图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在事件循环的最后一个阶段后，如果仍有挂起的事件或异步操作，则事件循环的下一次迭代将开始。否则，它将退出，并且 Node.js 进程结束。

我们将在以下各节中详细探讨事件循环的每个阶段。在此之前，让我们探索上图中出现在事件循环中心的“下一个即时报价”和微任务队列。从技术上讲，它们不是事件循环的一部分。

## Node.js中的微任务队列

`Promise`、`queueMicrotask` 和 `process.nextTick` 都是 `Node.js` 中异步 API 的一部分。当`Promise`结束时， `queueMicrotask` 、 `.then` 、`.catch` 以及`.finally` 回调被添加到微任务队列中。

另一方面，`process.nextTick`回调属于`nextTick`队列。让我们使用下面的示例来说明如何处理微任务和`nextTick`队列：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"setTimeout&nbsp;1"</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">Promise</span>.resolve(<span data-darkreader-inline-color="">"Promise&nbsp;1"</span>).then(<span data-darkreader-inline-color="">console</span>.log);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">Promise</span>.reject(<span data-darkreader-inline-color="">"Promise&nbsp;2"</span>).catch(<span data-darkreader-inline-color="">console</span>.log);<br>&nbsp;&nbsp;queueMicrotask(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"queueMicrotask&nbsp;1"</span>));<br><br>&nbsp;&nbsp;process.nextTick(<span data-darkreader-inline-color="">console</span>.log,&nbsp;<span data-darkreader-inline-color="">"nextTick&nbsp;1"</span>);<br>},&nbsp;<span>0</span>);<br><br>setTimeout(<span data-darkreader-inline-color="">console</span>.log,&nbsp;<span>0</span>,&nbsp;<span data-darkreader-inline-color="">"setTimeout&nbsp;2"</span>);<br><br>setTimeout(<span data-darkreader-inline-color="">console</span>.log,&nbsp;<span>0</span>,&nbsp;<span data-darkreader-inline-color="">"setTimeout&nbsp;3"</span>);<br></code>
```

假设上面的三个计时器同时过期。当事件循环进入计时器阶段时，它会将过期的计时器添加到计时器回调队列中，并从第一个到最后一个执行它们：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在上面的示例代码中，当执行计时器队列中的第一个回调时， `.then`、 `.catch` 和 `queueMicrotask` 回调会添加到微任务队列中。类似地， `process.nextTick` 回调被添加到一个队列中，我们将该队列称为`nextTick`队列。注意， `console.log` 是同步的。

当`timers`队列的第一个回调返回时，将处理`nextTick`队列。如果在处理`nextTick`队列中的回调时生成了更多的`nextTick`，它们将被添加到`nextTick`队列的后面并执行。

当`nextTick`队列为空时，接下来处理微任务队列。如果微任务生成更多微任务，它们也会被添加到微任务队列的后面并执行。

当`nextTick`队列和微任务队列都为空时，事件循环会在计时器队列中执行第二个回调。相同的过程将继续，直到计时器队列为空：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上述过程不限于`timers`阶段。当事件循环在所有其他主要阶段执行 `JavaScript` 时，`nextTick`队列和微任务队列的处理方式类似。

## Node.js的事件循环阶段

如上所述，Node.js事件循环是一个具有六个主要阶段的半无限循环。它有更多的阶段，但事件循环的一些阶段进行内部管理。它们对您编写的代码没有直接影响。因此，我们不会在这里介绍它们。

事件循环中的每个主要阶段都有一个先进先出的回调队列。例如，操作系统将运行`scheduled`的`timers`，直到它们过期。之后，过期的`timers`将添加到`timers`回调队列中。

然后，事件循环在`timers`队列中执行回调，直到队列为空或达到最大回调数。我们将在以下部分中探讨事件循环的主要阶段。

### 定时器阶段

与浏览器一样，Node.js 具有计时器 API，用于调度将来将执行的功能。Node.js 中的计时器 API 类似于浏览器中的计时器 API。但是，存在一些细微的实现差异。

计时器 API 由 `setTimeout` 、 `setInterval` 和 `setImmediate` 函数组成。所有三个计时器都是异步的。事件循环的计时器阶段只负责处理 `setTimeout` 和 `setInterval` 。

另一方面，`check`阶段负责 `setImmediate` 该功能。稍后我们将探讨`check`阶段。 `setTimeout`和`setInterval`两者都具有以下功能签名：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">setTimeout(callback[,&nbsp;delay[,&nbsp;...args]])<br>setInterval(callback[,&nbsp;delay[,&nbsp;...args]])<br></code>
```

-   callback 是计时器到期时要调用的函数
    
-   delay 是调用之前等待的毫秒数 callback，默认为一毫秒
    
-   args 是传递给的 callback 可选参数
    

使用 `setTimeout` 和`callback` 在经过时 `delay` 调用一次。另一方面， `setInterval` `scheduled`的`callback` 每毫秒运行一次 `delay` 。

下图显示了删除除计时器阶段之外的所有阶段后的事件循环：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为简单起见，让我们采取三个同时过期 `setTimeout` 的`scheduled`。以下步骤描述了当事件循环进入计时器阶段时会发生什么情况：

-   三个过期的计时器将添加到计时器队列中
    
-   事件循环执行第一个 `setTimeout` 回调。如果在执行第一个回调时生成了`nextTick`或微任务，它们将被添加到各自的队列中
    
-   当第一个 `setTimeout` 回调返回时，将处理`nextTick`队列。如果在处理`nextTick`队列时生成了更多`nextTick`，它们将被添加到`nextTick`队列的后面并立即处理。如果生成了微任务，则会将其添加到微任务队列中
    
-   当`nextTick`队列为空时，将处理微任务队列。如果生成了更多“微任务”，它们将被添加到微任务队列的后面并立即处理
    
-   如果`nextTick`队列和微任务队列都为空，则事件循环将在计时器队列中执行第二个回调。对第二个和第三个回调重复步骤 2-4
    
-   执行所有过期的计时器回调或最大回调次数后，事件循环进入下一阶段
    

在上面的步骤中，我们使用了由三个过期计时器组成的队列。然而，在实践中并非总是如此。事件循环将处理计时器队列，直到它为空或达到最大回调数，然后再进入下一阶段。

执行 JavaScript 回调时，事件循环被阻塞。如果回调需要很长时间来处理，则事件循环将等待直到返回。由于 Node.js 主要在服务器端运行，因此阻塞事件循环将导致性能问题。

同样，传递给计时器函数的`delay`参数并不总是执行 `setTimeout` 或 `setInterval` 回调之前的确切等待时间。这是最短的等待时间。所需持续时间取决于事件循环的繁忙程度以及所使用的系统计时器。

### Pending回调

在轮询阶段（我们将在稍后介绍）期间，事件循环轮询文件和网络 I/O 操作等事件。事件循环处理轮询阶段中的一些轮询事件，并将特定事件推迟到事件循环的下一次迭代中的挂起阶段。

在挂起阶段，事件循环将延迟的事件添加到挂起的回调队列并执行它们。在挂起回调阶段处理的事件包括系统发出的某些 `TCP` 套接字错误。例如，某些操作系统将 `ECONNREFUSED` 错误事件的处理推迟到此阶段。

### Idle和prepare

事件循环使用`Idle`和`prepare`阶段进行内部内务处理操作。它不会直接影响您编写的 Node.js 代码。虽然我们不会详细探讨它，但有必要知道它的存在。

### 轮询阶段

轮询阶段有两个功能。第一种是处理轮询队列中的事件并执行其回调。第二个函数是确定阻塞事件循环和轮询 I/O 事件的时间。

当事件循环进入轮询阶段时，它会将挂起的 I/O 事件排队并执行它们，直到队列为空或达到与系统相关的限制。在执行 JavaScript 回调之间，“`nextTick`”和微任务队列被耗尽，就像在其他阶段一样。

轮询阶段与其他阶段之间的区别在于，事件循环有时会在一段时间内阻塞事件循环并轮询 I/O 事件，直到超时结束或达到最大回调限制后。

事件循环在决定是否阻塞事件循环以及阻塞事件循环多长时间时会考虑多个因素。其中一些因素包括挂起的 I/O 事件的可用性和事件循环的其他阶段，例如`timers`阶段：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### check阶段

事件循环在 I/O 事件之后立即在检查阶段执行回调 `setImmediate` 。 `setImmediate` 具有以下函数签名：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">setImmediate(callback[,&nbsp;...args])<br></code>
```

-   callback 是要调用的函数
    
-   args 是传递给 callback
    

事件循环按创建顺序执行多个 `setImmediate` 回调。在下面的示例中，事件循环将在轮询阶段执行回调`fs.readFile`，因为它是 I/O 操作。之后，它会在事件循环的同一迭代中的`check`阶段立即执行回调 `setImmediate` 。另一方面，它在事件循环的下一次迭代的`timers`阶段中处理 `setTimeout` 。

当您从 I/O 回调调用 setImmediate 函数时，如下例所示，事件循环将保证它将在事件循环的同一迭代中的检查阶段运行：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fs&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"fs"</span>);<br><br><span data-darkreader-inline-color="">let</span>&nbsp;counter&nbsp;=&nbsp;<span>0</span>;<br><br>fs.readFile(<span data-darkreader-inline-color="">"path/to/file"</span>,&nbsp;{&nbsp;<span>encoding</span>:&nbsp;<span data-darkreader-inline-color="">"utf8"</span>&nbsp;},&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Inside&nbsp;I/O,&nbsp;counter&nbsp;=&nbsp;<span>${++counter}</span>`</span>);<br><br>&nbsp;&nbsp;setImmediate(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`setImmediate&nbsp;1&nbsp;from&nbsp;I/O&nbsp;callback,&nbsp;counter&nbsp;=&nbsp;<span>${++counter}</span>`</span>);<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`setTimeout&nbsp;from&nbsp;I/O&nbsp;callback,&nbsp;counter&nbsp;=&nbsp;<span>${++counter}</span>`</span>);<br>&nbsp;&nbsp;},&nbsp;<span>0</span>);<br><br>&nbsp;&nbsp;setImmediate(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`setImmediate&nbsp;2&nbsp;from&nbsp;I/O&nbsp;callback,&nbsp;counter&nbsp;=&nbsp;<span>${++counter}</span>`</span>);<br>&nbsp;&nbsp;});<br>});<br></code>
```

`check`阶段的回调 `setImmediate`产生的任何微任务和`nextTick`将分别添加到微任务队列和`nextTick`队列中，并像其他阶段一样立即耗尽。

### close回调

此close阶段是 Node.js 执行事件回调 close 事件，并结束给定事件循环迭代的地方。当`socket`关闭时，事件循环将在此阶段处理 close 事件。如果在此阶段生成`nextTick`和微任务，则它们将像在事件循环的其他阶段一样进行处理。

值得强调的是，您可以通过调用该方法 `process.exit` 在任何阶段终止事件循环。Node.js进程将退出，事件循环将忽略挂起的异步操作。

## 实践中的Node.js事件循环

如上所述，了解 Node.js 事件循环对于编写高性能、非阻塞异步代码非常重要。在 Node.js 中使用异步 API 将并行运行您的代码，但您的 JavaScript 回调将始终在单个线程上运行。

因此，在执行 JavaScript 回调时，可能会无意中阻塞事件循环。由于 Node.js 是一种服务器端语言，因此阻塞事件循环会使服务器运行缓慢且无响应，从而降低吞吐量。

在下面的示例中，我故意运行一个 `while` 循环大约一分钟来模拟长时间运行的操作。当您命中`/blocking` 端点时，事件循环将在事件循环的轮询阶段执行`app.get` 回调：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;longRunningOperation&nbsp;=&nbsp;<span>(<span>duration&nbsp;=&nbsp;<span>1</span>&nbsp;*&nbsp;<span>60</span>&nbsp;*&nbsp;<span>1000</span></span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;start&nbsp;=&nbsp;<span data-darkreader-inline-color="">Date</span>.now();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(<span data-darkreader-inline-color="">Date</span>.now()&nbsp;-&nbsp;start&nbsp;&lt;&nbsp;duration)&nbsp;{}<br>};<br><br>app.get(<span data-darkreader-inline-color="">"/blocking"</span>,&nbsp;(req,&nbsp;res)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;longRunningOperation();<br>&nbsp;&nbsp;res.send({&nbsp;<span>message</span>:&nbsp;<span data-darkreader-inline-color="">"blocking&nbsp;route"</span>&nbsp;});<br>});<br><br>app.get(<span data-darkreader-inline-color="">"/non-blocking"</span>,&nbsp;(req,&nbsp;res)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;res.send({&nbsp;<span>message</span>:&nbsp;<span data-darkreader-inline-color="">"non&nbsp;blocking&nbsp;route"</span>&nbsp;});<br>});<br></code>
```

由于回调正在执行耗时的操作，因此事件循环在任务运行的持续时间内被阻塞。对 `/non-blocking` 路由的任何请求也将等待事件循环首次解锁。因此，您的应用程序将变得无响应。来自前端的请求将变得缓慢并最终超时。若要执行此类 CPU 密集型操作，可以利用工作线程。

同样，不要对服务器端的以下模块使用同步 API，因为它们可能会阻塞事件循环：

-   crypto
    
-   zlib
    
-   fs
    
-   child\_process
    

## 关于Node.js的常见问题

### Node.js是多线程的吗？

如上所述，Node.js在单个线程中运行JavaScript代码。但是，它具有用于并发的工作线程。确切地说，除了主线程之外，Node 默认还有一个由四个线程组成的线程池。

`Libuv` 是赋予 `Node.js`其异步、非阻塞 I/O 功能的负责管理线程池的底层库。Node.js 使您能够使用其他线程进行计算成本高昂且持久的操作，以避免阻塞事件循环。

### Promise是否在单独的线程上运行？

Node.js种的`Promise`不会在单独的线程上运行。`.then`、`.catch` 和 `.finally` 回调将添加到微任务队列中。如上所述，微任务队列中的回调在事件循环的所有主要阶段都在同一线程上执行。

### 为什么事件循环在 Node.js 中很重要？

事件循环编排 Node 的异步和非阻塞功能。它负责监视客户端请求并响应服务器端的请求。

如果 JavaScript 回调阻塞了事件循环，您的服务器将变得缓慢且对客户端请求无响应。如果没有事件循环，Node.js 就不会像现在这样强大，而 Node.js 服务器的速度会非常慢。

### 异步程序在 Node.js 中是如何工作的？

Node.js 具有多个内置的同步和异步 API。同步 API 会阻止 JavaScript 代码的执行，直到操作完成。

在下面的示例中，我们用于 `fs.readFileSync` 读取文件内容。 `fs.readFileSync` 是同步的。因此，它将阻止其余 `JavaScript` 代码的执行，直到文件读取过程完成，然后再移动到下一行代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fs&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"fs"</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;path&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"path"</span>);<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"At&nbsp;the&nbsp;top"</span>);<br><br><span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;data&nbsp;=&nbsp;fs.readFileSync(path.join(__dirname,&nbsp;<span data-darkreader-inline-color="">"notes.txt"</span>),&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>encoding</span>:&nbsp;<span data-darkreader-inline-color="">"utf8"</span>,<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(data);<br>}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(error);<br>}<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"At&nbsp;the&nbsp;bottom"</span>);<br></code>
```

另一方面，非阻塞异步 API 通过将操作卸载到运行 Node.js 的线程池或本机系统来并行执行操作。操作完成后，事件循环将调度并执行 JavaScript 回调。

例如，`fs`模块的异步形式使用线程池来写入或读取文件内容。当文件操作的内容准备好进行处理时，事件循环会在轮询阶段执行 JavaScript 回调。

在下面的示例中， fs.readFile 是异步和非阻塞的。事件循环将在文件读取操作完成时执行传递给它的回调。代码的其余部分将运行，而无需等待文件操作完成：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fs&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"fs"</span>);<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"At&nbsp;the&nbsp;top"</span>);<br><br>fs.readFile(<span data-darkreader-inline-color="">"path/to/file"</span>,&nbsp;{&nbsp;<span>encoding</span>:&nbsp;<span data-darkreader-inline-color="">"utf8"</span>&nbsp;},&nbsp;(err,&nbsp;data)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(err)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">"error"</span>,&nbsp;err);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"data"</span>,&nbsp;data);<br>});<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"At&nbsp;the&nbsp;bottom"</span>);<br><br></code>
```

### 微任务何时在 Node.js 中执行？

微任务在事件循环的所有主要阶段的操作之间执行。事件循环的每个主要阶段都执行一个 `JavaScript` 回调队列。在阶段队列中连续执行`JavaScript`回调之间，有一个微任务检查点，其中微任务队列被排空。

### 如何退出 Node.js 事件循环？

只要有挂起的事件需要处理，Node.js 事件循环就会运行。如果没有任何挂起的工作，则事件循环在发出 `exit` 事件后退出，并返回退出侦听器回调。

还可以通过使用 `process.exit` 该方法显式退出事件循环。调用 `process.exit` 将立即退出正在运行的 `Node.js` 进程。事件循环中的任何挂起或计划事件都将被放弃：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">process.on(<span data-darkreader-inline-color="">"exit"</span>,&nbsp;(code)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Exiting&nbsp;with&nbsp;exit&nbsp;code:&nbsp;<span>${code}</span>`</span>);<br>});<br><br>process.exit(<span>1</span>);<br></code>
```

您可以收听 exit 事件。但是，侦听器函数必须是同步的，因为 Node.js 进程将在侦听器函数返回后立即退出。

## 总结

Node.js运行时环境具有用于编写非阻塞代码的 API。但是，由于所有 JavaScript 代码都在单个线程上执行，因此可能会无意中阻塞事件循环。深入了解事件循环有助于您编写可靠、安全且高性能的代码，并有效地调试性能问题。

事件循环大约有六个主要阶段。这六个阶段是计时器、挂起、`idle`和`prepare`、轮询、`check`和`close`。每个阶段都有一个事件队列，事件循环会处理这些事件队列，直到它为空或达到与系统相关的硬限制。

执行回调时，事件循环被阻塞。因此，请确保异步回调不会长时间阻塞事件循环，否则服务器将变得缓慢且对客户端请求无响应。您可以使用线程池执行长时间运行或 CPU 密集型任务。

## 一川说

觉得文章不错的读者，不妨点个关注，收藏起来上班摸鱼的时候品尝。

欢迎关注笔者公众号「宇宙一码平川」，助你技术路上一码平川。