> 作者：edisonC

> 原文地址：https://juejin.im/post/6854573222415826957

## 简介

😛 闲暇时间想做一个聊天室复盘一下这些年学习到的技术，于是在2020年6月24号就开始了 Genal 聊天室的开发之旅。  
😈 项目采用全 typescript 开发，这是为了以后的功能迭代打基础。当然，我本身也是很喜欢 typescript 的。

## 项目界面

 ![Image](https://mmbiz.qpic.cn/mmbiz_gif/YBFV3Da0NwthzZHH0XvSRTIw64h1wBMmia6vcoDRdaxQyxIgZH9EILGwTXdF6GnnJTOTxWQqp7buWP0gYiaiauxKQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1) 

## 功能介绍  

-   更改用户名/头像上传
    
-   群聊/私聊
    
-   创建群/加入群聊/模糊搜索群
    
-   添加好友/模糊搜索好友
    
-   表情包
    
-   消息分页
    

## 技术概览

-   **Typescript**：JavaScript 的一个超集，它最大的优势是提供了类型系统和提高了代码的可读性和可维护性。
    
-   **Vue2.6.x**：前端渐进式框架。
    
-   **Socket/io**：实现实时通信，websocket 第三方库。
    
-   **Vuex**：专为 Vue.js 应用程序开发的状态管理模式。
    
-   **Nestjs**：是一个用于构建高效、可扩展的 Node.js 服务端应用框架，基于 TypeScript 编写并且结合了 OOP1、FP2、FRP3 的相关理念。
    
-   **Typeorm**: 支持最新的 JavaScript 特性并提供额外的特性以帮助你开发任何使用数据库的应用程序。
    
-   **ES6+**：采用 ES6+ 语法，箭头函数、async/await 等等语法很好用。
    
-   **SASS(SCSS)**：用 SCSS 做 CSS 预处理语言，可以使用最高效的方式，以少量的代码创建复杂的设计。
    

## 数据库表结构设计

数据库使用了六张表，分别是

-   user 用户表
    
-   group 群表
    
-   user\_group 用户\_群中间表
    
-   group\_message 群消息表
    
-   user\_friend 用户\_好友中间表
    
-   friend\_message 私聊消息表
    

其中中间表用于建立对于群/好友与用户之间的联系。下面是我画的思维导图，相信大家看完就能理解其中的奥妙啦。  
![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## WebSocket的建立逻辑

### 用户房间的建立

每个用户进入聊天室都会自动加入名为 public 的 WebSocket 房间和以用户 id 为命名的 WebSocket 房间，其中建立用户房间是为了方便系统针对用户单独广播事件。如果不了解房间的概念，可以认为只有房间内的人才能接收到房间内的广播，更多信息请移步 socket.io 官网。

### 群聊房间的建立

以 groupId 作为 WebSocket 房间的名字，每次有新用户加入群都会在群房间内广播用户进群事件并附带上新用户的详细信息，然后其他用户会存储新用户的信息。当新用户发消息的时候，其他用户收到消息后可以通过消息的userId找到对应用户的详细信息。这样能保证消息发出后其他用户能够快速知道消息的主人.

### 私聊房间的建立

每当发起一个添加好友的请求，就会把用户的 userId 和好友的 userId 拼接成的字符串作为 WebSocket 的房间名，从而建立私聊房间。

## 后端架构

后端使用了 nestjs 这个近几年发展迅猛的 node.js 框架。nestjs 的优势有很多， 我只列举出以下几点：

1.  基于 TypeScript 构建，同时兼容普通的 ES6。
    
2.  nestjs 的依赖注入以及模块化的思想，使得代码结构清晰，便于维护。
    
3.  nestjs 的 @nestjs/websockets 包封装好了对于 WebSocket 事件的处理，对于开发聊天室有优势。
    

下面是一些后端的逻辑代码。

1.  使用 nestjs 建立 WebSocket 连接
    

```
<span data-darkreader-inline-color="">//&nbsp;chat.gateway.ts</span><br>@WebSocketGateway()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">ChatGateway</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;socket连接钩子</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;handleConnection(client:&nbsp;Socket):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;string&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;userRoom&nbsp;=&nbsp;client.handshake.query.userId;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;连接默认加入public房间</span><br>&nbsp;&nbsp;&nbsp;&nbsp;client.join(<span data-darkreader-inline-color="">'public'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;用户独有消息房间&nbsp;根据userId</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(userRoom)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;client.join(userRoom);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">'连接成功'</span><br>&nbsp;&nbsp;}<br>}<br>
```

2.  封装全局的中间件，方便在开发过程中调试。
    

```
<span data-darkreader-inline-color="">//&nbsp;middleware.js</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>logger</span>(<span>req,&nbsp;res,&nbsp;next</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;method,&nbsp;path&nbsp;}&nbsp;=&nbsp;req;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${method}</span>&nbsp;<span data-darkreader-inline-color="">${path}</span>`</span>);<br>&nbsp;&nbsp;next();<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;main.js&nbsp;</span><br>使用全局中间件<br>app.use(logger)<br>
```

3.  nestjs 的静态资源配置
    

```
<span data-darkreader-inline-color="">//&nbsp;main.js</span><br>配置静态资源<br>app.useStaticAssets(join(__dirname,&nbsp;<span data-darkreader-inline-color="">'../public/'</span>,&nbsp;<span data-darkreader-inline-color="">'static'</span>),&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">prefix</span>:&nbsp;<span data-darkreader-inline-color="">'/static/'</span>,&nbsp;<br>});<br>
```

4.  nestjs 自定义异常过滤器
    

```
<span data-darkreader-inline-color="">//&nbsp;http-exception.filter.ts</span><br>@Catch(HttpException)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">HttpExceptionFilter</span>&nbsp;<span data-darkreader-inline-color="">implements</span>&nbsp;<span data-darkreader-inline-color="">ExceptionFilter</span>&lt;<span data-darkreader-inline-color="">HttpException</span>&gt;&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">catch</span>(exception:&nbsp;HttpException,&nbsp;<span data-darkreader-inline-color="">host</span>:&nbsp;ArgumentsHost)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;host.switchToHttp();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;response&nbsp;=&nbsp;ctx.getResponse();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;request&nbsp;=&nbsp;ctx.getRequest();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;status&nbsp;=&nbsp;exception.getStatus();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;exceptionRes:&nbsp;any&nbsp;=&nbsp;exception.getResponse();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message,<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;=&nbsp;exceptionRes;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;以下格式将在发生错误是返回给前端</span><br>&nbsp;&nbsp;&nbsp;&nbsp;response.status(status).json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">timestamp</span>:&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Date</span>().toISOString(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">path</span>:&nbsp;request.url,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br>
```

## 前端架构

### 页面初始化

初始化会调起 WebSocket 连接函数，然后拿到用户所有的群信息和所有的好友信息，再通过建立 WebSocket 通信的规则加入到对应的房间，然后使用 vuex 派发最新的数据。

### 数据处理

群的数据类型

```
<span data-darkreader-inline-color="">//&nbsp;群组</span><br>interface&nbsp;Group&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">groupId</span>:&nbsp;string;<br>&nbsp;&nbsp;userId:&nbsp;string;&nbsp;<span data-darkreader-inline-color="">//&nbsp;群主id</span><br>&nbsp;&nbsp;groupName:&nbsp;string;<br>&nbsp;&nbsp;notice:&nbsp;string;<br>&nbsp;&nbsp;messages:&nbsp;GroupMessage[];<br>&nbsp;&nbsp;createTime:&nbsp;number;<br>}<br>
```

好友的数据类型

```
<span data-darkreader-inline-color="">//&nbsp;好友</span><br>interface&nbsp;Friend&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;string;<br>&nbsp;&nbsp;username:&nbsp;string;<br>&nbsp;&nbsp;avatar:&nbsp;string;<br>&nbsp;&nbsp;role?:&nbsp;string;<br>&nbsp;&nbsp;tag?:&nbsp;string;<br>&nbsp;&nbsp;messages:&nbsp;FriendMessage[];<br>&nbsp;&nbsp;createTime:&nbsp;number;<br>}<br>
```

我曾经用对象数组 \[ friend1 , friend2 ... \] 这样的结构去管理所有的 群/好友 数据，但是当数据量很大的时候，查询和更新 群/好友 数据会变得很消耗性能。每次好友名字变了或者头像变了就得遍历查找一遍数组才能更新相应信息。  
后来我用对象的结构，优化了聊天室的代码。我使用一个对象 gather 来管理 群/好友 的信息， gather 的键为 groupId/userId ，值为对应的 群/好友 的数据，结构如下

```
gather&nbsp;=&nbsp;{<br>&nbsp;<span data-darkreader-inline-color="">'userId'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;<span data-darkreader-inline-color="">'userId'</span><br>&nbsp;&nbsp;&nbsp;username:&nbsp;<span data-darkreader-inline-color="">'xxx'</span><br>&nbsp;&nbsp;&nbsp;messages:&nbsp;[];<br>&nbsp;&nbsp;&nbsp;...<br>&nbsp;}<br>}<br>
```

每个群和用户都有独一无二的 id，所以无需担心重复。使用这样的结构后，更新数据便非常的轻松，只需要拿到需要更新的id，然后直接覆盖 gather.id 对应的值就行了

## vuex

聊天室涉及到数据的即时更新和各个 vue 组件的数据同步，处理这样的业务场景是 vuex 的强项。我把建立 WebSocket 连接的函数写在了 vuex 的 action 中，在用户登录成功后调起连接函数，下面是精简后的代码。

```
<span data-darkreader-inline-color="">//&nbsp;actions.ts</span><br><span data-darkreader-inline-color="">const</span>&nbsp;actions:&nbsp;ActionTree&lt;ChatState,&nbsp;RootState&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;初始化WebSocket</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;connectSocket({commit,&nbsp;state,&nbsp;dispatch,&nbsp;rootState},&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;WebSocket连接建立</span><br>&nbsp;&nbsp;&nbsp;&nbsp;socket.on(<span data-darkreader-inline-color="">'connect'</span>,&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;订阅群消息时间</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;socket.on(<span data-darkreader-inline-color="">'groupMessage'</span>,&nbsp;(res:&nbsp;any)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'on&nbsp;groupMessage'</span>,&nbsp;res)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!res.code)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对群消息进行处理</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commit(ADD_GROUP_MESSAGE,&nbsp;res.data)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>
```

不得不说 vuex-class 这个库帮了我很大的忙，它是 vuex 结合 typescript 开发的很好的粘合剂。使用了 vuex-class ，那么在 vue 组件中调用 vuex 的方法只需要这么写：

```
<span data-darkreader-inline-color="">//&nbsp;GenalChat.vue</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;namespace&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vuex-class'</span><br><span data-darkreader-inline-color="">const</span>&nbsp;appModule&nbsp;=&nbsp;namespace(<span data-darkreader-inline-color="">'app'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">GenalChat</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Vue</span>&nbsp;</span>{<br>&nbsp;&nbsp;@appModule.Getter(<span data-darkreader-inline-color="">'user'</span>)&nbsp;user:&nbsp;User;<br>&nbsp;&nbsp;@appModule.Action(<span data-darkreader-inline-color="">'login'</span>)&nbsp;login:&nbsp;<span data-darkreader-inline-color="">Function</span>;<br>}<br>
```

## 总结

  目前聊天室已经完成日常聊天的基础功能，因为聊天室的数据结构基本都大同小异，因此目前的聊天室架构是非常利于在此基础上进行扩展和新增功能的。同时，我今后也会陆续开发很多酷炫的功能，喜欢的朋友给个 star 鼓励一下我吧！

## 项目地址

github：https://github.com/genaller/genal-chat