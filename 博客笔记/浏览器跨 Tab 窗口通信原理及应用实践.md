最近，相信大家一定被这么个动效给刷屏了：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/SMw0rcHsoNK7IWTnC0icLWGP9G8KKpHic139gQpUFLZgic2VYicxaRFojUSpRBK46rahePfJAPULSrvgHniaGkicq92Q/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

以至于，基于这个效果的二次创作层出不穷，眼花缭乱。

基于跨窗口通信的弹弹球：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/SMw0rcHsoNK7IWTnC0icLWGP9G8KKpHic1Xop5DTXvNOVaAmNrvlibkfujlKHUwHy5M51UJP196vaXm8xeFjqDkmg/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

基于跨窗口通信的 Flippy Bird：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我也尝试制作了一个跨 Tab 窗口的 CSS 动画联动，效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

代码不多，核心代码 200 行，感兴趣的可以戳这里：Github - broadcastAnimation<sup data-darkreader-inline-color="">[1]</sup>

当然，本文的核心不是去一一剖析上面的效果具体的实现方式，而是讲讲其中比较关键的一个技术点：

而是**应用如何在多窗口下进行互相通信**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所谓**多窗口下进行互相通信，是指在浏览器中，不同窗口（包括不同标签页、不同浏览器窗口甚至不同浏览器实例）之间进行数据传输和通信的能力。**

当然，本文我们探讨的是**纯前端的跨 Tab 页面通信**，在非纯前端的方式下，我们可以借助诸如 Web Socket 等方式，藉由后端这个中间载体，进行跨页面通信。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因为，本文，我们更多的重心将放在，如何基于纯前端技术，实现**多窗口下进行互相通信。**

为了实现跨窗口通信，它应该需要具备以下能力：

1.  **数据传输能力**：能够将数据从一个窗口发送到另一个窗口，以及接收来自其他窗口的数据。
    
2.  **实时性**：能够实现实时或近实时的数据传输，以便及时更新不同窗口的内容。
    
3.  安全性：确保通信过程中的数据安全，防止恶意窃取或篡改通信数据。当然，这个不是本文讨论的重点，但是是实际应用中不应该忽视的一个重点。
    

## 方式一：Broadcast Channel()

Broadcast Channel 是一个较新的 Web API，用于在不同的浏览器窗口、标签页或框架之间**实现跨窗口通信**。它基于发布-订阅模式，允许一个窗口发送消息，并由其他窗口接收。

其核心步骤如下：

1.  创建一个 BroadcastChannel 对象：在发送和接收消息之前，首先需要在每个窗口中创建一个 BroadcastChannel 对象，使用相同的频道名称进行初始化。
    
2.  发送消息：通过 BroadcastChannel 对象的 postMessage() 方法，可以向频道中的所有窗口发送消息。
    
3.  接收消息：通过监听 BroadcastChannel 对象的 message 事件，可以在窗口中接收到来自其他窗口发送的消息。
    

同时，Broadcast Channel 遵循浏览器的同源策略。这意味着只有在同一个协议、主机和端口下的窗口才能正常进行通信。如果窗口不满足同源策略，将无法互相发送和接收消息。

因为有同源限制，我们需要起一个服务，这里我基于 Vite 快速起了一个 Vue 项目，简单的基于 `.vue` 文件下进行一个演示。

其核心代码非常简单：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"g-container"</span>&nbsp;id=<span data-darkreader-inline-color="">"j-main"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;{&nbsp;onMounted&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">setup</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">createBroadcastChannel</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastChannel&nbsp;=&nbsp;new&nbsp;BroadcastChannel(<span data-darkreader-inline-color="">'broadcast'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastChannel.onmessage&nbsp;=&nbsp;handleMessage;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;sendMessage(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastChannel.postMessage(data);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;handleMessage(event)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'接收到&nbsp;event'</span>,&nbsp;event);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;TODO:&nbsp;处理接收到信息后的逻辑<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">resizeEventBind</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pos&nbsp;=&nbsp;getCurPos();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sendMessage(pos);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;计算当前元素距离显示器窗口右上角的距离<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">getCurPos</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;barHeight&nbsp;=&nbsp;window.outerHeight&nbsp;-&nbsp;window.innerHeight;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;element&nbsp;=&nbsp;document.getElementById(<span data-darkreader-inline-color="">'j-main'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;rect&nbsp;=&nbsp;element.getBoundingClientRect();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;获取元素相对于屏幕左上角的&nbsp;X&nbsp;和&nbsp;Y&nbsp;坐标<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;x&nbsp;=&nbsp;rect.left&nbsp;+&nbsp;window.screenX;&nbsp;//&nbsp;元素左边缘相对于屏幕左边缘的距离<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;y&nbsp;=&nbsp;rect.top&nbsp;+&nbsp;window.screenY&nbsp;+&nbsp;barHeight;//&nbsp;元素顶部边缘相对于屏幕顶部边缘的距离<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;[x,&nbsp;y];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;onMounted(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createBroadcastChannel();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resizeEventBind();<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{};<br>&nbsp;&nbsp;}<br>};<br>&lt;/script&gt;<br><br>&lt;style&nbsp;lang=<span data-darkreader-inline-color="">"scss"</span>&gt;&lt;/style&gt;<br></code>
```

这里，我们的核心逻辑在于：

-   `createBroadcastChannel()` 函数用于创建一个 BroadcastChannel 对象，并设置消息处理函数。
    
-   `sendMessage(data)` 函数用于向 BroadcastChannel 发送消息。
    
-   `handleMessage(event)` 函数用于处理接收到的消息。
    
-   `resizeEventBind()` 函数用于监听窗口大小变化事件，并在事件发生时获取当前元素的位置信息，并通过 `sendMessage()` 函数发送位置信息到 BroadcastChannel。
    
-   `getCurPos()` 函数用于计算当前元素相对于显示器窗口右上角的距离。
    

在 `onMounted()` 生命周期钩子中，调用了 `createBroadcastChannel()` 和 `resizeEventBind()` 函数，用于在组件挂载后执行相关的初始化操作。

这样，当我们同时打开两个窗口，移动其中一个窗口，就可以向另外一个窗口发生当前窗口希望传递过去的信息，在本例子中就是 `#j-main` 元素距离显示器右上角的距离。

假设 `#j-main` 只是一个在浏览器正中心矩形，我们同时打开两边的控制台，看看会发生什么：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，如果我们同时打开两个一个的页面，当触发右边页面的 Resize，左边的页面会收到基于 `broadcastChannel.onmessage = handleMessage` 接收到的信息，反之同理。

而一个完整的 Event 信息如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

譬如，传递过来的信息放在 data 属性内、同时也可以获取当前的的 Broadcast Name 等。

基于 BroadcastChannel，就可以实现每个 Tab 内的核心信息互传， 可以得知当前在线设备数，再基于这些信息去完成我们想要的动画、交互等效果。

这里的核心点，还是：

1.  数据向其他 Tab 页面传递的能力
    
2.  Tab 页面接受其他页面传递过来的数据的能力
    

其本质就是一个**数据共享池**子。

## 方式二：SharedWorker API

好，介绍完 Broadcast Channel()，我们再来看看 SharedWorker API。

SharedWorker <sup data-darkreader-inline-color="">[2]</sup>API 是 HTML5 中提供的一种多线程解决方案，它可以在多个浏览器 TAB 页面之间共享一个后台线程，从而实现跨页面通信。

与其他 Worker 不同的是，SharedWorker 可以被多个浏览器 TAB 页面共享，且可以在同一域名下的不同页面之间建立连接。这意味着，多个页面可以通过 SharedWorker 实例之间的消息传递，实现跨 TAB 页面的通信。

它的实现与上面的 Broadcast Channel 非常类似，我们来看一看实际的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"g-container"</span>&nbsp;id=<span data-darkreader-inline-color="">"j-main"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;{&nbsp;onMounted&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">setup</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;创建一个&nbsp;SharedWorker&nbsp;对象<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;worker;<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">initWorker</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;创建一个&nbsp;SharedWorker&nbsp;对象<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;worker&nbsp;=&nbsp;new&nbsp;SharedWorker(<span data-darkreader-inline-color="">'/shared-worker.js'</span>,&nbsp;<span data-darkreader-inline-color="">'tabWorker'</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;监听消息事件<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;worker.port.onmessage&nbsp;=&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(event)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'接收到&nbsp;event'</span>,&nbsp;event);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handleMessage(event);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;handleMessage(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;TODO:&nbsp;处理接收到信息后的逻辑<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;sendMessage(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;发送消息<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;worker.port.postMessage(data);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">resizeEventBind</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pos&nbsp;=&nbsp;getCurPos();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sendMessage(pos);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">getCurPos</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;barHeight&nbsp;=&nbsp;window.outerHeight&nbsp;-&nbsp;window.innerHeight;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;element&nbsp;=&nbsp;document.getElementById(<span data-darkreader-inline-color="">'j-main'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;rect&nbsp;=&nbsp;element.getBoundingClientRect();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;获取元素相对于屏幕左上角的&nbsp;X&nbsp;和&nbsp;Y&nbsp;坐标<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;x&nbsp;=&nbsp;rect.left&nbsp;+&nbsp;window.screenX;&nbsp;//&nbsp;元素左边缘相对于屏幕左边缘的距离<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;y&nbsp;=&nbsp;rect.top&nbsp;+&nbsp;window.screenY&nbsp;+&nbsp;barHeight;//&nbsp;元素顶部边缘相对于屏幕顶部边缘的距离<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;[x,&nbsp;y];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;onMounted(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initWorker();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resizeEventBind();<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{};<br>&nbsp;&nbsp;}<br>};<br>&lt;/script&gt;<br><br>&lt;style&nbsp;lang=<span data-darkreader-inline-color="">"scss"</span>&gt;&lt;/style&gt;<br></code>
```

简单描述一下，上面也说了，跨 Tab 页通信的核心在于数据向外的发送与接收的能力：

1.  `initWorker()` 方法中，使用 `worker = new` _`SharedWorker`_`('/shared-worker.js', 'tabWorker')` 创建了一个 `SharedWorker` _，_ 后面每一个被打开的同域浏览器 TAB 页面，都是共享这个 Worker 线程，从而实现跨页面通信
    
2.  基于 `worker.port.postMessage(data)`实现数据的传输
    
3.  基于 `worker.port.onmessage = function() {}` 实现传输数据的监听
    

当然，上面有引入一个 `/shared-worker.js`，这个是需要额外定义的，一个极简版本的代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//shared-worker.js<br>const&nbsp;connections&nbsp;=&nbsp;[];<br><br>onconnect&nbsp;=&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(event)&nbsp;{<br>&nbsp;&nbsp;var&nbsp;port&nbsp;=&nbsp;event.ports[0];<br>&nbsp;&nbsp;connections.push(port);<br><br>&nbsp;&nbsp;port.onmessage&nbsp;=&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(event)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;接收到消息时，向所有连接发送该消息<br>&nbsp;&nbsp;&nbsp;&nbsp;connections.forEach(<span data-darkreader-inline-color="">function</span>&nbsp;(conn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(conn&nbsp;!==&nbsp;port)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.postMessage(event.data);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;port.start();<br>};<br></code>
```

简单解析一下，下面对其进行解析：

1.  上面的代码中，定义了一个数组 connections，用于存储与 SharedWorker 建立连接的各个页面的端口对象；
    
2.  onconnect 是事件处理程序，当有新的连接建立时会触发该事件；
    
3.  在 onconnect 函数中，通过 event.ports\[0\] 获取到与 SharedWorker 建立的连接的第一个端口对象，并将其添加到 connections 数组中，表示该页面与共享 Worker 建立了连接。
    
4.  在连接建立后，为每个端口对象设置了 onmessage 事件处理程序。当端口对象接收到消息时，会触发该事件处理程序。
    
5.  在 onmessage 事件处理程序中，通过遍历 connections 数组，将消息发送给除当前连接端口对象之外的所有连接。这样，消息就可以在不同的浏览器 TAB 页面之间传递。
    
6.  最后，通过调用 port.start() 启动端口对象，使其开始接收消息。
    

总而言之，shared-worker.js 脚本创建了一个共享 Worker 实例，它可以接收来自不同页面的连接请求，并将接收到的消息发送给其他连接的页面。通过使用 SharedWorker API，**实现跨 TAB 页面之间的通信和数据共享**。

同理，我们来看看基于 Worker 的数据传输效果，同样是简化 DEMO，当 Resize 窗口时，向另外一个窗口发送当前窗口下 `#j-main` 元素的坐标：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，如果我们同时打开两个一个的页面，当触发右边页面的 Resize，左边的页面会利用 `worker.port.onmessage = function() {}` 收到基于 `worker.port.postMessage(`_`data`_`)` 发送的信息，反之同理。

而一个完整的 Event 信息如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，在 SharedWorker 方式中，传输数据与 Broadcast Channel 是一样的，都是利用 `Message Event`。简单对比一下：

1.  SharedWorker 通过在多个Tab页面之间共享相同的 Worker 实例，方便地共享数据和状态，SharedWorker 需要多定义一个 `shared-worker.js`;
    
2.  Broadcast Channel 通过向所有订阅同一频道的 Tab 页面广播消息，实现广播式的通信。
    

兼容性方面，到今天(2023-11-26)，broadcast Channel 看着是兼容性更好的方式：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 方式三：localStorage/sessionStorage

OK，最后一种跨 Tab 窗口通信的方式是利用 `localStorage` 、`sessionStorage` 本地化存储 API 以及的 `storage` 事件。

与上面 Broadcast Channel、SharedWorker 稍微不同的地方在于：

1.  `localStorage` 方式，利用了本地浏览器存储，实现了同域下的数据共享；
    
2.  `localStorage` 方式，基于 `window.addEventListener('storage',` _`function`_`(`_`event`_`) {})`事件实现了 localStore 变化时候的数据监听；
    

简单看看代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"g-container"</span>&nbsp;id=<span data-darkreader-inline-color="">"j-main"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;{&nbsp;ref,&nbsp;reactive,&nbsp;computed,&nbsp;onMounted&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">setup</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">initLocalStorage</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;tabArray&nbsp;=&nbsp;JSON.parse(localStorage.getItem(<span data-darkreader-inline-color="">'tab_array'</span>));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!tabArray)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;tabIndex&nbsp;=&nbsp;1;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id&nbsp;=&nbsp;tabIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localStorage.setItem(<span data-darkreader-inline-color="">'tab_array'</span>,&nbsp;JSON.stringify([tabIndex]));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;tabIndex&nbsp;=&nbsp;tabArray[tabArray.length&nbsp;-&nbsp;1]&nbsp;+&nbsp;1;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id&nbsp;=&nbsp;tabIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;newTabArray&nbsp;=&nbsp;[...tabArray,&nbsp;tabIndex];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localStorage.setItem(<span data-darkreader-inline-color="">'tab_array'</span>,&nbsp;JSON.stringify(newTabArray));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;setLocalStorage(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localStorage.setItem(`tab_index_<span data-darkreader-inline-color="">${id}</span>`,&nbsp;JSON.stringify(data));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;handleMessage(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;rArray&nbsp;=&nbsp;JSON.parse(data);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remoteX.value&nbsp;=&nbsp;rArray[0];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remoteY.value&nbsp;=&nbsp;rArray[1];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">resizeEventBind</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pos&nbsp;=&nbsp;getCurPos();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setLocalStorage(pos);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;window.addEventListener(<span data-darkreader-inline-color="">'storage'</span>,&nbsp;(event)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'localStorage 变化了！'</span>,&nbsp;event);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'键名：'</span>,&nbsp;event.key);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'变化前的值：'</span>,&nbsp;event.oldValue);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'变化后的值：'</span>,&nbsp;event.newValue);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handleMessage(event.newValue);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">getCurPos</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;barHeight&nbsp;=&nbsp;window.outerHeight&nbsp;-&nbsp;window.innerHeight;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;element&nbsp;=&nbsp;document.getElementById(<span data-darkreader-inline-color="">'j-main'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;rect&nbsp;=&nbsp;element.getBoundingClientRect();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;获取元素相对于屏幕左上角的&nbsp;X&nbsp;和&nbsp;Y&nbsp;坐标<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;x&nbsp;=&nbsp;rect.left&nbsp;+&nbsp;window.screenX;&nbsp;//&nbsp;元素左边缘相对于屏幕左边缘的距离<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;y&nbsp;=&nbsp;rect.top&nbsp;+&nbsp;window.screenY&nbsp;+&nbsp;barHeight;//&nbsp;元素顶部边缘相对于屏幕顶部边缘的距离<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;[x,&nbsp;y];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;onMounted(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initLocalStorage();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resizeEventBind();<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{};<br>&nbsp;&nbsp;}<br>};<br>&lt;/script&gt;<br><br>&lt;style&nbsp;lang=<span data-darkreader-inline-color="">"scss"</span>&gt;&lt;/style&gt;<br></code>
```

同样的简单解析一下：

1.  每次页面初始化时，都会首先有一个 `initLocalStorage` 过程，用于给当前页面一个唯一 ID 标识，并且存入 localStorage 中
    
2.  每次页面 resize，将当前页面元素 `#j-main` 的坐标值，通过 ID 标识当 Key，存入 localStorage 中
    
3.  其他页面，通过 `window.addEventListener('storage', (`_`event`_`)`_`=>`_ `{})` 监听 localStorage 的变化
    

交互传输结果，与上述两个动图是一致的，就不额外贴图了，但是基于 `storage` 事件传输的值有点不一样，我们展开看看：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们通过 `window.addEventListener('storage', (`_`event`_`)`_`=>`_ `{})` ，可以拿到此次变化的 localStorage key 是什么，前值 `oldValue` 与 `newValue` 等等。

当然，由于 `localStorage` 存储过程只能是字符串，在读取的时候需要利用 `JSON.stringify` 和 `JSON.parse` 额外处理一层，调试的时候需要注意。

我基于上面三种方式：Broadcast Channel、SharedWorker 与 localStorage，都实现了一遍下面这个跨 Tab 页的 CSS 联动动画：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

三种方式的代码都不多，感兴趣的可以戳这里：Github - broadcastAnimation<sup data-darkreader-inline-color="">[3]</sup>

## 实际应用思考

当然，上面的实现其实有很大一个瑕疵。

那就是我们只顾着实现通信，没有考虑实际应用中的一些实际问题：

1.  如何确定何时开始通信？
    
2.  Tab 页频繁的开关，如何知道当前还有多少页面处于打开状态？
    

基于实际应用，我们需要基于上述 3 种方式，进一步细化方案。

上面，为了方便演示，每次传输数据时，只传输动画需要的数据。而实际应用，我们可以需要细化整个传输数据，设定合理的协议。譬如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;传输状态：<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;1&nbsp;-&nbsp;首次传输<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;2&nbsp;-&nbsp;正常通信<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;3&nbsp;-&nbsp;页面关闭<br>&nbsp;&nbsp;&nbsp;&nbsp;status:&nbsp;1&nbsp;|&nbsp;2&nbsp;|&nbsp;3,<br>&nbsp;&nbsp;&nbsp;&nbsp;data:&nbsp;{}<br>}<br></code>
```

接收方需要基于收到信息所展示的不同的状态，做出不同的反馈。

当然，还有一个问题，我们如何知道页面被关闭了？基于组件的 `onUnmounted` 发送当前页面关闭的信息或者基于 window 对象的 `beforeunload` 事件发送当前页面关闭的信息？

这些信息都有可能因为 Tab 页面失活，导致关闭的信息无法正常被发送出去。所以，实际应用中，我们经常用的一项技术是**心跳上报**，一旦建立连接后，间隔 X 秒发送一次心跳广播，告诉其他接收端，我还在线。一旦超过某个时间阈值没有收到心跳上报，各个订阅方可以认为该设备已经下线。

总而言之，跨 Tab 窗口通信应用在实际应用的过程中，我们需要思考更多可能隐藏的问题。

## 跨 Tab 窗口通信应用场景

当然，除了最近大火的跨 Tab 动画应用场景，实际业务中，还有许多场景是它可以发挥作用的。这些场景利用了跨 Tab 通信技术，增强了用户体验并提供了更丰富的功能。

以下是一些常见的应用场景：

1.  实时协作：多个用户可以在不同的 Tab 页上进行实时协作，比如编辑文档、共享白板、协同编辑等。通过跨Tab通信，可以实现实时更新和同步操作，提高协作效率。
    

譬如这个：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  多标签页数据同步：当用户在一个标签页上进行了操作，希望其他标签页上的数据也能实时更新时，可以使用跨 Tab 通信来实现数据同步，保持用户在不同标签页上看到的数据一致性。
    
3.  跨标签页通知：在某些场景下，需要向用户发送通知或提醒，即使用户不在当前标签页上也能及时收到。通过跨 Tab 通信，可以实现跨页面的消息传递，向用户发送通知或提醒。
    
4.  多标签页状态同步：有些应用可能需要在不同标签页之间同步用户的状态信息，例如登录状态、购物车内容等。通过跨 Tab 通信，可以确保用户在不同标签页上看到的状态信息保持一致。
    
5.  页面间数据传输：有时候用户需要从一个页面跳转到另一个页面，并携带一些数据，通过跨Tab通信可以在页面之间传递数据，实现数据的共享和传递。
    

举两个实际的例子：

1.  某系统是一个国际化电商的仓库管理系统，系统能切换到全球各地不同的仓库进行数据操作，当用户打开了页面后，又新开了一个 Tab 页面，并且切换到另外一个仓库进行操作。当用户重新回到第一个打开的页面时，为了防止用户错误操作数据（前端界面是一致的，可能忘记了自己切换过仓库），通过弹窗提醒用户你已经切换过仓库；
    
2.  某音乐播放器 PC 页面，在列表页面进行歌曲播放点击，如果当前没有音乐播放详情页，则打开一个新的播放详情页。但是，如果页面已经存在一个音乐播放详情页，则不会打开新的音乐播放详情页，而是直接使用已经存在的播放详情页面；
    

总之，跨 Tab 窗口通信在实时协作、数据同步、通知提醒等方面都能发挥重要作用，为用户提供更流畅、便捷的交互体验。

## 最后

好了，本文到此结束，希望对你有帮助 :)

如果还有什么疑问或者建议，可以多多交流，原创文章，文笔有限，才疏学浅，文中若有不正之处，万望告知。

### 参考资料

\[1\]

Github - broadcastAnimation: _https://github.com/chokcoco/broadcastAnimation_

\[2\]

SharedWorker : _https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker_

\[3\]

Github - broadcastAnimation: _https://github.com/chokcoco/broadcastAnimation_