## 引言

李小萌和王大锤是好朋友。他们都从事程序开发工作。两人有空经常会在一起讨论技术。小萌最近正在做一个管理系统，首页要求用柱状图和折线图实时展示菜品信息变化。效果如下图所示。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/2YvPggYPTLibaB2mp6wu6bfIODL7TyicdNJwkXdUABiaBFmzehGvFibiaSY5dCTxic6FE5gibiba2JJic7tCQA5QpmhLh9Q/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

## 推送技术

小萌首先想到的是使用websocket技术实现，但以前没有这块开发经历，于是和大锤展开讨论。

> WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准。

### 技术回顾

大锤是名经验丰富的老程序员，他捋捋胡子说：消息推送在很久很久以前手机邮箱APP开发中做过。用户收到新邮件时，邮箱服务器推送邮件消息，通知用户查看。

当时消息推送技术发展缓慢，用的是客户端轮循技术，每隔几秒调用服务端接口获取邮件数据。这种方式实现简单，但效率低下，消息接收不及时。

后来采用短信通知方式。当用户有新邮件时，邮箱服务器向用户发送一条短信，用户手机邮箱app收到后，调用邮件接口获取邮件数据。

短信通知解决了轮循效率低下，接收消息不及时问题。但它仍然是客户端向服务端发起请求。

websocket在2011年成为标准后，发展迅速，现如今很多应用都在使用这门技术。大锤建议小萌尝试websocket。

### websocket

WebSocket是一种网络通信协议，它提供了在单个TCP连接上进行全双工通信的能力。这意味着数据可以在客户端和服务器之间双向流动，而无需客户端通过轮询或重复请求来获取更新。

### **WebSocket的使用场景：**

-   实时游戏：WebSocket可以用于实现在线多人游戏的实时交互。
    
-   聊天应用：即时通讯和聊天室可以通过WebSocket实现实时消息传递。
    
-   股票行情：实时股票交易平台可以利用WebSocket推送最新的市场数据。
    
-   协作工具：在线文档编辑或实时绘图工具等协作平台可以使用WebSocket来同步用户操作。
    

WebSocket技术实现聊天应用:

### 客户端实现

1.  创建WebSocket连接：使用`new WebSocket(url)`构造函数创建一个新的WebSocket对象，其中`url`是WebSocket服务器的地址。
    
2.  设置事件处理程序：为WebSocket对象设置各种事件处理程序，如`onopen`、`onmessage`、`onerror`和`onclose`。
    
3.  发送消息：当WebSocket连接成功建立后（即`onopen`事件触发时），客户端可以通过调用`send`方法发送消息。
    
4.  接收消息：当服务器发送消息时（即`onmessage`事件触发时），客户端可以接收消息。
    
5.  关闭连接：当不再需要WebSocket连接时，可以调用`close`方法关闭连接。
    

#### 示例代码（HTML + JavaScript）：

```
<section><span><span></span><span></span><span></span></span><span> </span></section><pre data-title="true"><code data-line="67"><span><span>&lt;</span><span>!</span>DOCTYPE html<span>&gt;</span><br></span><span><span>&lt;</span>html lang<span>=</span><span>"en"</span><span>&gt;</span><br></span><span><span>&lt;</span>head<span>&gt;</span><br></span><span>    <span>&lt;</span>meta charset<span>=</span><span>"UTF-8"</span><span>&gt;</span><br></span><span>    <span>&lt;</span>title<span>&gt;</span>WebSocket Chat Example<span>&lt;</span><span>/</span>title<span>&gt;</span><br></span><span>    <span>&lt;</span>script<span>&gt;</span><br></span><span>        <span>// 当文档加载完毕时执行</span><br></span><span>        document<span>.</span><span>addEventListener</span><span>(</span><span>'DOMContentLoaded'</span><span>,</span> <span>function</span><span>(</span><span>)</span> <span>{</span><br></span><span>            <span>var</span> ws<span>;</span><br></span><span>            <span>var</span> chatBox <span>=</span> document<span>.</span><span>getElementById</span><span>(</span><span>'chatBox'</span><span>)</span><span>;</span><br></span><span>            <span>var</span> messageInput <span>=</span> document<span>.</span><span>getElementById</span><span>(</span><span>'messageInput'</span><span>)</span><span>;</span><br></span><span>            <span>var</span> sendButton <span>=</span> document<span>.</span><span>getElementById</span><span>(</span><span>'sendButton'</span><span>)</span><span>;</span><br></span><span><br></span><span>            <span>// 尝试连接到WebSocket服务器</span><br></span><span>            <span>function</span> <span>connect</span><span>(</span><span>)</span> <span>{</span><br></span><span>                ws <span>=</span> <span>new</span> <span>WebSocket</span><span>(</span><span>"ws://localhost:8080"</span><span>)</span><span>;</span><br></span><span>                ws<span>.</span><span>onopen</span> <span>=</span> <span>function</span><span>(</span><span>)</span> <span>{</span><br></span><span>                    <span>console</span><span>.</span><span>log</span><span>(</span><span>'WebSocket 连接成功'</span><span>)</span><span>;</span><br></span><span>                <span>}</span><span>;</span><br></span><span>                ws<span>.</span><span>onmessage</span> <span>=</span> <span>function</span><span>(</span>event<span>)</span> <span>{</span><br></span><span>                    <span>console</span><span>.</span><span>log</span><span>(</span><span>'收到消息：'</span><span>,</span> event<span>.</span>data<span>)</span><span>;</span><br></span><span>                    chatBox<span>.</span>textContent <span>+=</span> event<span>.</span>data <span>+</span> <span>'\n'</span><span>;</span><br></span><span>                <span>}</span><span>;</span><br></span><span>                ws<span>.</span><span>onerror</span> <span>=</span> <span>function</span><span>(</span>error<span>)</span> <span>{</span><br></span><span>                    <span>console</span><span>.</span><span>error</span><span>(</span><span>'WebSocket 出现错误：'</span><span>,</span> error<span>)</span><span>;</span><br></span><span>                <span>}</span><span>;</span><br></span><span>                ws<span>.</span><span>onclose</span> <span>=</span> <span>function</span><span>(</span><span>)</span> <span>{</span><br></span><span>                    <span>console</span><span>.</span><span>log</span><span>(</span><span>'WebSocket 连接关闭'</span><span>)</span><span>;</span><br></span><span>                <span>}</span><span>;</span><br></span><span>            <span>}</span><br></span><span><br></span><span>            <span>// 发送消息</span><br></span><span>            <span>function</span> <span>sendMessage</span><span>(</span><span>)</span> <span>{</span><br></span><span>                <span>if</span> <span>(</span>ws<span>.</span>readyState <span>===</span> WebSocket<span>.</span>OPEN<span>)</span> <span>{</span><br></span><span>                    ws<span>.</span><span>send</span><span>(</span>messageInput<span>.</span>value<span>)</span><span>;</span><br></span><span>                    messageInput<span>.</span>value <span>=</span> <span>''</span><span>;</span><br></span><span>                <span>}</span> <span>else</span> <span>{</span><br></span><span>                    <span>console</span><span>.</span><span>error</span><span>(</span><span>'WebSocket 连接未建立'</span><span>)</span><span>;</span><br></span><span>                <span>}</span><br></span><span>            <span>}</span><br></span><span><br></span><span>            <span>// 绑定按钮点击事件</span><br></span><span>            sendButton<span>.</span><span>onclick</span> <span>=</span> <span>function</span><span>(</span><span>)</span> <span>{</span><br></span><span>                <span>sendMessage</span><span>(</span><span>)</span><span>;</span><br></span><span>            <span>}</span><span>;</span><br></span><span><br></span><span>            <span>// 自动连接WebSocket</span><br></span><span>            <span>connect</span><span>(</span><span>)</span><span>;</span><br></span><span>        <span>}</span><span>)</span><span>;</span><br></span><span>    <span>&lt;</span><span>/</span>script<span>&gt;</span><br></span><span><span>&lt;</span><span>/</span>head<span>&gt;</span><br></span><span><span>&lt;</span>body<span>&gt;</span><br></span><span>    <span>&lt;</span>h1<span>&gt;</span>WebSocket Chat<span>&lt;</span><span>/</span>h1<span>&gt;</span><br></span><span>    <span>&lt;</span>pre id<span>=</span><span>"chatBox"</span><span>&gt;</span><span>&lt;</span><span>/</span>pre<span>&gt;</span><br></span><span>    <span>&lt;</span>input type<span>=</span><span>"text"</span> id<span>=</span><span>"messageInput"</span><span>&gt;</span><br></span><span>    <span>&lt;</span>button id<span>=</span><span>"sendButton"</span><span>&gt;</span>发送<span>&lt;</span><span>/</span>button<span>&gt;</span><br></span><span><span>&lt;</span><span>/</span>body<span>&gt;</span><br></span><span><span>&lt;</span><span>/</span>html<span>&gt;</span><br></span></code></pre>
```

### 服务器端实现

服务器端的实现会依赖于你选择的后端技术。以下是使用Node.js和ws库的一个简单示例：

#### 示例代码（Node.js + ws）：

```
<section><span><span></span><span></span><span></span></span><span> </span></section><pre data-title="true"><code data-line="30"><span><span>const</span> WebSocket <span>=</span> <span>require</span><span>(</span><span>'ws'</span><span>)</span><span>;</span><br></span><span><span>const</span> server <span>=</span> <span>new</span> <span>WebSocket<span>.</span>Server</span><span>(</span><span>{</span> port<span>:</span> 8080 <span>}</span><span>)</span><span>;</span><br></span><span><br></span><span>server<span>.</span><span>on</span><span>(</span><span>'connection'</span><span>,</span> <span>function</span><span>(</span>socket<span>)</span> <span>{</span><br></span><span>    <span>console</span><span>.</span><span>log</span><span>(</span><span>'新客户端已连接'</span><span>)</span><span>;</span><br></span><span><br></span><span>    <span>// 监听客户端发送的消息</span><br></span><span>    socket<span>.</span><span>on</span><span>(</span><span>'message'</span><span>,</span> <span>function</span><span>(</span>message<span>)</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>'收到消息：'</span><span>,</span> message<span>)</span><span>;</span><br></span><span>        <span>// 将收到的消息广播给所有客户端</span><br></span><span>        server<span>.</span>clients<span>.</span><span>forEach</span><span>(</span><span>function</span><span>(</span>client<span>)</span> <span>{</span><br></span><span>            <span>if</span> <span>(</span>client<span>.</span>readyState <span>===</span> WebSocket<span>.</span>OPEN<span>)</span> <span>{</span><br></span><span>                client<span>.</span><span>send</span><span>(</span>message<span>)</span><span>;</span><br></span><span>            <span>}</span><br></span><span>        <span>}</span><span>)</span><span>;</span><br></span><span>    <span>}</span><span>)</span><span>;</span><br></span><span><br></span><span>    socket<span>.</span><span>on</span><span>(</span><span>'close'</span><span>,</span> <span>function</span><span>(</span><span>)</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>'客户端已断开连接'</span><span>)</span><span>;</span><br></span><span>    <span>}</span><span>)</span><span>;</span><br></span><span><span>}</span><span>)</span><span>;</span><br></span></code></pre>
```

在这个例子中，服务器会监听8080端口上的WebSocket连接。每当有新消息时，它将消息广播给所有连接的客户端。

这个简单的实例展示了WebSocket如何实现客户端和服务器之间的实时双向通信。

## 轻量级推送技术SSE

小萌经过对websocket的研究，已经成功将其应用到项目开发中。作为软件开发工程师的小萌又利用业余时间研究了另外一个轻量级推送技术-SSE。

Server-Sent Events（SSE）是一种允许服务器向浏览器推送实时数据的技术。它是基于HTTP协议的，并且是一种轻量级的解决方案，适用于服务器到客户端的单向通信。以下是关于SSE的一些关键点：

### 工作原理

SSE利用HTTP连接来实现服务器到客户端的单向通信。一旦客户端通过EventSource接口连接到服务器，服务器就可以发送数据到客户端。客户端接收到数据后，默认会触发message事件。

### 特点

-   基于HTTP：SSE使用标准的HTTP协议，因此易于实现和部署。
    
-   单向通信：SSE主要用于服务器向客户端的单向数据推送，不支持客户端向服务器的推送。
    
-   轻量级：与WebSocket相比，SSE更简单，不需要复杂的握手过程。
    
-   自动重连：如果连接断开，SSE会自动尝试重连。
    
-   文本数据：SSE主要推送文本数据，对于二进制数据需要进行编码。
    

### 使用场景

-   实时更新：如股票价格、体育比赛得分等。
    
-   社交媒体：实时显示好友动态、消息通知等。
    
-   新闻网站：实时推送新闻头条。
    
-   在线游戏：推送游戏状态更新。
    

数据格式  

SSE 协议非常简单，正常的Http请求，更改请起头相关配置即可

```
<section><span><span></span><span></span><span></span></span><span> </span></section><pre data-title="true"><code data-line="14"><span>Content<span>-</span>Type<span>:</span> text<span>/</span>event<span>-</span>stream<span>,</span>utf<span>-</span>8<br></span><span>Cache<span>-</span>Control<span>:</span> no<span>-</span>cache<br></span><span>Connection<span>:</span> keep<span>-</span>alive</span></code></pre>
```

发送的文本流，用UTF8格式编码。文本事件流的消息由两个换行符分开，以冒号开头的为注释行，会被忽略。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**文本流字段**

event: 用于标识事件类型的字符串，如果没有指定event，浏览器默认认为是message。

data: 消息的数据字段，当EventSource收到多个\`\`data:\`\`开头的连续行时，会将它们连接起来，在它们之间插入一个换行符。末尾的换行符也会被删除。

id: 事件ID，会被设置为当前EventSource对象的内部属性“最后一个事件ID”的值。

retry: 重新连接的时间。如果与服务器的连接丢失，浏览器会等待指定的时间，然后重新连接。retry必须是一个整数，它的单位是毫秒。 

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 实现

#### **服务器端**

服务器端使用express框架创建一个持久的HTTP连接，并在有新数据时发送数据到客户端。数据通常以纯文本格式发送，并且每条消息之间以一对换行符分隔。

```
<section><span><span></span><span></span></span><span> </span></section><pre data-title="true"><code data-line="62"><span><span>const</span> express <span>=</span> <span>require</span><span>(</span><span>'express'</span><span>)</span> <span>//引用框架</span><br></span><span><span>const</span> app <span>=</span> <span>express</span><span>(</span><span>)</span> <span>//创建服务</span><br></span><span><span>const</span> port <span>=</span> 8088 <span>//项目启动端口</span><br></span><span><br></span><span><span>//设置跨域访问</span><br></span><span>app<span>.</span><span>all</span><span>(</span><span>'*'</span><span>,</span> <span>function</span> <span>(</span>req<span>,</span> res<span>,</span> next<span>)</span> <span>{</span><br></span><span>    <span>//设置允许跨域的域名，*代表允许任意域名跨域</span><br></span><span>    res<span>.</span><span>header</span><span>(</span><span>'Access-Control-Allow-Origin'</span><span>,</span> <span>'*'</span><span>)</span><br></span><span>    <span>//允许的header类型</span><br></span><span>    res<span>.</span><span>header</span><span>(</span><br></span><span>        <span>'Access-Control-Allow-Headers'</span><span>,</span><br></span><span>        <span>'Content-Type, Authorization, X-Requested-With'</span><br></span><span>    <span>)</span><br></span><span>    <span>//跨域允许的请求方式</span><br></span><span>    res<span>.</span><span>header</span><span>(</span><span>'Access-Control-Allow-Methods'</span><span>,</span> <span>'PUT,POST,GET,DELETE,OPTIONS'</span><span>)</span><br></span><span>    <span>// 可以带cookies</span><br></span><span>    res<span>.</span><span>header</span><span>(</span><span>'Access-Control-Allow-Credentials'</span><span>,</span> true<span>)</span><br></span><span>    <span>if</span> <span>(</span>req<span>.</span>method <span>==</span> <span>'OPTIONS'</span><span>)</span> <span>{</span><br></span><span>        res<span>.</span><span>sendStatus</span><span>(</span>200<span>)</span><br></span><span>    <span>}</span> <span>else</span> <span>{</span><br></span><span>        <span>next</span><span>(</span><span>)</span><br></span><span>    <span>}</span><br></span><span><span>}</span><span>)</span><br></span><span><br></span><span>app<span>.</span><span>get</span><span>(</span><span>'/sse'</span><span>,</span> <span>(</span>req<span>,</span> res<span>)</span> <span>=&gt;</span> <span>{</span><br></span><span>    res<span>.</span><span>set</span><span>(</span><span>{</span><br></span><span>        'Content-Type'<span>:</span> <span>'text/event-stream'</span><span>,</span> <span>//设定数据类型</span><br></span><span>        'Cache-Control'<span>:</span> <span>'no-cache'</span><span>,</span> <span>// 长链接拒绝缓存</span><br></span><span>        'Connection'<span>:</span> <span>'keep-alive'</span><span>,</span> <span>//设置长链接</span><br></span><span>    <span>}</span><span>)</span><br></span><span><br></span><span>    <span>console</span><span>.</span><span>log</span><span>(</span><span>'进入到长连接了'</span><span>)</span><br></span><span>    <span>//持续返回数据</span><br></span><span>    <span>setInterval</span><span>(</span><span>(</span><span>)</span> <span>=&gt;</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>'正在持续返回数据中ing'</span><span>)</span><br></span><span>        <span>const</span> data <span>=</span> <span>{</span><br></span><span>            message<span>:</span> <span>`</span><span>当前时间: </span><span>${</span><span>new</span> <span>Date</span><span>(</span><span>)</span><span>.</span><span>toLocaleTimeString</span><span>(</span><span>)</span><span>}</span><span>`</span><span>,</span><br></span><span>        <span>}</span><br></span><span>        res<span>.</span><span>write</span><span>(</span><span>`</span><span>data: </span><span>${</span><span>JSON</span><span>.</span><span>stringify</span><span>(</span>data<span>)</span><span>}</span><span>\n\n</span><span>`</span><span>)</span><br></span><span>    <span>}</span><span>,</span> 1000<span>)</span><br></span><span><br></span><span>    <span>// 当客户端断开连接时，清理资源</span><br></span><span>    req<span>.</span><span>on</span><span>(</span><span>'close'</span><span>,</span> <span>(</span><span>)</span> <span>=&gt;</span> <span>{</span><br></span><span>        <span>clearInterval</span><span>(</span><span>)</span> <span>// 清除定时器</span><br></span><span>        res<span>.</span><span>end</span><span>(</span><span>)</span> <span>// 结束响应</span><br></span><span>    <span>}</span><span>)</span><br></span><span><span>}</span><span>)</span><br></span><span><br></span><span><span>//创建项目</span><br></span><span>app<span>.</span><span>listen</span><span>(</span>port<span>,</span> <span>(</span><span>)</span> <span>=&gt;</span> <span>{</span><br></span><span>    <span>console</span><span>.</span><span>log</span><span>(</span><span>`</span><span>项目启动成功-http://localhost:</span><span>${</span>port<span>}</span><span>`</span><span>)</span><br></span><span><span>}</span><span>)</span><br></span><span><br></span></code></pre>
```

#### **客户端**

客户端使用EventSource接口来接收服务器推送的数据。以下是一个基本的客户端实现示例：

```
<section><span><span></span><span></span><span></span></span><span> </span></section><pre data-title="true"><code data-line="66"><span><span>&lt;</span><span>!</span>DOCTYPE html<span>&gt;</span><br></span><span><span>&lt;</span>html lang<span>=</span><span>"en"</span><span>&gt;</span><br></span><span><br></span><span><span>&lt;</span>head<span>&gt;</span><br></span><span>    <span>&lt;</span>meta charset<span>=</span><span>"UTF-8"</span><span>&gt;</span><br></span><span>    <span>&lt;</span>meta http<span>-</span>equiv<span>=</span><span>"X-UA-Compatible"</span> content<span>=</span><span>"IE=edge"</span><span>&gt;</span><br></span><span>    <span>&lt;</span>meta name<span>=</span><span>"viewport"</span> content<span>=</span><span>"width=device-width, initial-scale=1.0"</span><span>&gt;</span><br></span><span>    <span>&lt;</span>title<span>&gt;</span>Document<span>&lt;</span><span>/</span>title<span>&gt;</span><br></span><span><span>&lt;</span><span>/</span>head<span>&gt;</span><br></span><span><br></span><span><span>&lt;</span>body<span>&gt;</span><br></span><span>    <span>&lt;</span>ul id<span>=</span><span>"ul"</span><span>&gt;</span><br></span><span><br></span><span>    <span>&lt;</span><span>/</span>ul<span>&gt;</span><br></span><span><span>&lt;</span><span>/</span>body<span>&gt;</span><br></span><span><span>&lt;</span>script<span>&gt;</span><br></span><span><br></span><span>    <span>//生成li元素</span><br></span><span>    <span>function</span> <span>createLi</span><span>(</span>data<span>)</span> <span>{</span><br></span><span>        <span>let</span> li <span>=</span> document<span>.</span><span>createElement</span><span>(</span><span>"li"</span><span>)</span><span>;</span><br></span><span>        li<span>.</span>innerHTML <span>=</span> <span>String</span><span>(</span>data<span>.</span>message<span>)</span><span>;</span><br></span><span>        <span>return</span> li<span>;</span><br></span><span>    <span>}</span><br></span><span><br></span><span>    <span>//判断当前浏览器是否支持SSE</span><br></span><span>    <span>let</span> source <span>=</span> <span>''</span><br></span><span>    <span>if</span> <span>(</span><span>!</span><span>!</span>window<span>.</span>EventSource<span>)</span> <span>{</span><br></span><span>        source <span>=</span> <span>new</span> <span>EventSource</span><span>(</span><span>'http://localhost:8088/sse/'</span><span>)</span><span>;</span><br></span><span>    <span>}</span> <span>else</span> <span>{</span><br></span><span>        <span>throw</span> <span>new</span> <span>Error</span><span>(</span><span>"当前浏览器不支持SSE"</span><span>)</span><br></span><span>    <span>}</span><br></span><span><br></span><span>    <span>//对于建立链接的监听</span><br></span><span>    source<span>.</span><span>onopen</span> <span>=</span> <span>function</span> <span>(</span>event<span>)</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span>source<span>.</span>readyState<span>)</span><span>;</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>"长连接打开"</span><span>)</span><span>;</span><br></span><span>    <span>}</span><span>;</span><br></span><span><br></span><span>    <span>//对服务端消息的监听</span><br></span><span>    source<span>.</span><span>onmessage</span> <span>=</span> <span>function</span> <span>(</span>event<span>)</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>JSON</span><span>.</span><span>parse</span><span>(</span>event<span>.</span>data<span>)</span><span>)</span><span>;</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>"收到长连接信息"</span><span>)</span><span>;</span><br></span><span>        <span>let</span> li <span>=</span> <span>createLi</span><span>(</span><span>JSON</span><span>.</span><span>parse</span><span>(</span>event<span>.</span>data<span>)</span><span>)</span><span>;</span><br></span><span>        document<span>.</span><span>getElementById</span><span>(</span><span>"ul"</span><span>)</span><span>.</span><span>appendChild</span><span>(</span>li<span>)</span><br></span><span>    <span>}</span><span>;</span><br></span><span><br></span><span><br></span><span>    <span>//对断开链接的监听</span><br></span><span>    source<span>.</span><span>onerror</span> <span>=</span> <span>function</span> <span>(</span>event<span>)</span> <span>{</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span>source<span>.</span>readyState<span>)</span><span>;</span><br></span><span>        <span>console</span><span>.</span><span>log</span><span>(</span><span>"长连接中断"</span><span>)</span><span>;</span><br></span><span>    <span>}</span><span>;</span><br></span><span><br></span><span><span>&lt;</span><span>/</span>script<span>&gt;</span><br></span><span><br></span><span><span>&lt;</span><span>/</span>html<span>&gt;</span><br></span><span><br></span></code></pre>
```

## 总结

在数字化时代，信息的即时传递变得至关重要。实时消息推送技术作为连接用户与服务的重要桥梁，使得信息能够迅速、准确地传递给用户。无论是社交媒体的通知、新闻更新、还是应用内的消息提醒，实时消息推送技术都扮演着不可或缺的角色。

本文介绍了web推送技术的几种实现：轮循、短信通知、websocket、SSE，重点介绍websocket和SSE技术实现。给小编来个点赞，在看，转发吧！

## 结束

> 我是一名老程序员，也是名热爱生活的中年大叔，欢迎关注。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

长按上图，识别图中二维码即可关注

推荐阅读：

[动态权限菜单是什么？封装递归组件轻松实现](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646768&idx=1&sn=9e9a0e7094fde0d3d1b99f422c09424c&chksm=849fe435b3e86d231b8cd3c58bb406f55685f9f5eb0e85994aa1635ec701084cb81d6554c3bd&scene=21#wechat_redirect)

[](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646959&idx=1&sn=2b1c5c9097a72c4ec64fa89d7a6e413a&chksm=849fe4eab3e86dfc4a3695813c8d53e47c5420d991c22754ee482862800475d55d5b1e7cff03&scene=21#wechat_redirect)[ElementPlus 表单组件二次封装，提高50%开发效率](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646959&idx=1&sn=2b1c5c9097a72c4ec64fa89d7a6e413a&chksm=849fe4eab3e86dfc4a3695813c8d53e47c5420d991c22754ee482862800475d55d5b1e7cff03&scene=21#wechat_redirect)

[](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646863&idx=1&sn=d318b33d277bbd45641fc91722ac3902&chksm=849fe48ab3e86d9cf8327e3bd241f0d7469caeb11bbe124322f683ffe444868985cd31feb5bd&scene=21#wechat_redirect)[ElementPlus 表格组件二次封装，提高50%开发效率](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646863&idx=1&sn=d318b33d277bbd45641fc91722ac3902&chksm=849fe48ab3e86d9cf8327e3bd241f0d7469caeb11bbe124322f683ffe444868985cd31feb5bd&scene=21#wechat_redirect)

[大文件切片上传，全网最简单的实现没有之一](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&amp;mid=2447647753&amp;idx=1&amp;sn=45dcc53b6528e40fb55e0f4949fd81b4&amp;chksm=849fe00cb3e8691a6e98c41ff86c2ce73f18c22dc665aa014ef6c1aa909cf4308683becd636e&scene=21#wechat_redirect)

## [面试官：为什么忘记密码后需要重置，而不是告诉原密码？60%的人回答不上来！](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447647127&idx=1&sn=055acff5ddfb93a4160a778ef8b3d8f8&chksm=849fe592b3e86c84485c07d255970a54ba0ca249520d7232618d5b2d63e3b876480394a2356e&scene=21#wechat_redirect)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点个在看你最好看

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)