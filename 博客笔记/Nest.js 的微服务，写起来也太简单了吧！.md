想必大家都写过 http 服务，接受 http 请求、做一些处理、返回 http 响应。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGhqMwI7EZkh7ibPLefqPpWdt7wxwtxpPACZ4luSibQfVKMe1WLWRLl1qErIfG7O0KloewiaQDQCCK9Jg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这样完成 web 服务器的功能没问题，但随着功能的越来越多，比如现在有一百多个模块了，总不能都放在一个服务里吧，这样管理不方便。

于是就有了拆分的需求，也就有了微服务的概念。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YprkEU0TtGhqMwI7EZkh7ibPLefqPpWdtQDEZIpeK5Nicd7YdxIFRvVoBgibI1ubwVBJh8JcZFUt4ReFAAuEAApFQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

拆分微服务是很自然的事情，但有个问题，微服务和 http 服务之间怎么通信呢？

用 HTTP？

这个是可以，但是 HTTP 是文本协议，传输效率太低了。

所以一般都直接用 TCP 通信。

微服务架构是主流了，各种服务端开发框架都提供了微服务的支持，Nest 自然也不例外。

而且，Nest 对微服务封装的很好，写个微服务是特别简单的事情。

不信我们一起来写一个吧！

首先全局安装 nest 的 cli 工具：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;i&nbsp;-g&nbsp;@nestjs/cli<br></code>
```

然后用 nest 的 cli 快速创建一个 nest 项目：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">nest&nbsp;new&nbsp;xxx<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

选一个依赖管理工具，我这里用的 yarn。

执行 yarn start 就可以看到跑起来的 http 服务了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

浏览器访问下 http://localhost:3000

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

到这一步，http 服务就启动成功了。

然后我们创建个微服务，同样的方式，用 nest new 创建个项目：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">nest&nbsp;new&nbsp;micro-service-calc<br></code>
```

这里要创建微服务，需要安装一个包：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;@nestjs/microservices<br></code>
```

然后改下 main.ts：

之前创建 http 服务是这样的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在要改成这样：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;NestFactory&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/core'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Transport,&nbsp;MicroserviceOptions&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/microservices'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;AppModule&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./app.module'</span>;<br><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">bootstrap</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;NestFactory.createMicroservice&lt;MicroserviceOptions&gt;(<br>&nbsp;&nbsp;&nbsp;&nbsp;AppModule,<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transport</span>:&nbsp;Transport.TCP,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">options</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">port</span>:&nbsp;<span data-darkreader-inline-color="">8888</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;app.listen();<br>}<br>bootstrap();<br></code>
```

很容易理解，之前是启 http 服务，现在是起微服务了嘛，所以启动方式不一样。

启动的时候指定用 TCP 来传输消息，然后指定 TCP 启动的端口为 8888。

之后在 AppController 里注册下怎么处理 TCP 的消息：

这里用 MessagePattern 的方式来声明处理啥消息：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;MessagePattern&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/microservices'</span>;<br><br>@Controller()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">AppController</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>()&nbsp;{}<br><br>&nbsp;&nbsp;@MessagePattern(<span data-darkreader-inline-color="">'sum'</span>)<br>&nbsp;&nbsp;sum(numArr:&nbsp;<span data-darkreader-inline-color="">Array</span>&lt;number&gt;):&nbsp;number&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;numArr.reduce(<span>(<span>total,&nbsp;item</span>)&nbsp;=&gt;</span>&nbsp;total&nbsp;+&nbsp;item,&nbsp;<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

这个 sum 方法就是接受 sum 消息，返回求和的结果的 handler。

然后同样是 yarn start 把这个微服务跑起来：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在我们有两个服务了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一个 http 服务，一个 TCP 协议的微服务，然后把两者连起来就可以了。

怎么连起来呢？

我们来改造下 http 服务。

先安装 @nestjs/microservices  依赖：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;@nestjs/microservices<br></code>
```

然后在 app.module.ts 里注册 calc 那个微服务：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

调用 ClientModule.register 指定名字、传输方式为 TCP、端口为 8888。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Module&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;AppController&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./app.controller'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ClientsModule,&nbsp;Transport&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/microservices'</span>;<br><br>@Module({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">imports</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;ClientsModule.register([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'CALC_SERVICE'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transport</span>:&nbsp;Transport.TCP,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">options</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">port</span>:&nbsp;<span data-darkreader-inline-color="">8888</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;]),<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">controllers</span>:&nbsp;[AppController],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">providers</span>:&nbsp;[],<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">AppModule</span>&nbsp;</span>{}<br></code>
```

这样就注册完了。

然后就可以用了，在 Controller 里注入这个微服务的 clientProxy，也就是客户端代理。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Get,&nbsp;Inject,&nbsp;Query&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ClientProxy&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/microservices'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Observable&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'rxjs'</span>;<br><br>@Controller()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">AppController</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(@Inject('CALC_SERVICE')&nbsp;private&nbsp;calcClient:&nbsp;ClientProxy)&nbsp;{}<br><br>&nbsp;&nbsp;@Get()<br>&nbsp;&nbsp;calc(@Query(<span data-darkreader-inline-color="">'num'</span>)&nbsp;str):&nbsp;Observable&lt;number&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;numArr&nbsp;=&nbsp;str.split(<span data-darkreader-inline-color="">','</span>).map(<span>(<span>item</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">parseInt</span>(item));<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.calcClient.send(<span data-darkreader-inline-color="">'sum'</span>,&nbsp;numArr);<br>&nbsp;&nbsp;}<br>}<br></code>
```

这样就可以接收到 http 请求的时候调用微服务来处理了。

比如上面我们在收到请求的时候，调用代理对象的 send 方法发了一个 TCP 消息给微服务。

这也是为啥叫做 ClientProxy 了，不用你自己发 TCP 消息，你只要调用 send 方法即可。

然后把它重新跑起来：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;start<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后，看：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们 num 传了 1,2,3，这里返回了 6 ，这明显就是 calc 微服务处理的。

这样，我们第一个 Nest 微服务就跑成功了！

是不是挺简单的？

其实微服务还有一种消息传输的类型，这里我们需要响应，所以是 message 的方式，如果不需要响应，那就可以直接声明 event 的方式。

我们再来创建个微服务，用来打印日志。

用 nest new mirco-app-log 创建项目，然后安装 @nestjs/microservices 包，之后像上一个微服务一样改用 createMicroservice 的 api 启动服务。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个微服务起在 9999 端口。

然后 Controller 改一下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里不需要响应，只是处理事件，所以不用 MessagePattern 注册消息了，用 EventPattern。

然后在 main 项目里注册下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

名字叫做 LOG\_SERVICE，端口 9999。

然后在 Controller 里注入这个微服务的 clientProxy：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样我们在这个 http 请求的 handler 里同时用到了两个微服务：

用 calc 微服务来做计算，用 log 微服务来记录日志。

yarn start 重跑一下。

浏览器刷新下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

同样返回了 6，说明 calc 微服务正常。

再去 log 微服务的控制台看看：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

log 的微服务打印了日志，说明 log 微服务正常。

至此，Nest 微服务跑成功了！

完整 demo 代码上传了 github：https://github.com/QuarkGluonPlasma/nest-microservice-demo

## 总结

http 服务大了难免要拆分，现在都是拆成微服务的方式，http 服务负责处理 http 请求，微服务完成不同模块的业务逻辑处理。

微服务和 http 服务之间用 TCP 通信。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

用 nest 跑个微服务的步骤如下：

-   用 nest new 创建一个 main 服务，一个微服务
    
-   都要安装 @nestjs/microservices 包，因为用到其中的 api
    
-   微服务里用 createMicroservice 启动服务，选择传输方式为 TCP，指定端口
    
-   微服务里在 Controller 使用 MessagePattern 或者 EventPattern 注册处理消息的 handler
    
-   main 服务使用 ClientsModule.register 来注册微服务
    
-   main 服务里注入 ClientProxy 对象，调用它的 send 方法给微服务发消息
    

这就是 Nest 跑微服务的方式。

当然，现在都是本机部署的，你完全可以把微服务放到不同的服务器，甚至可以不同微服务用不同的集群部署。

Nest 里跑微服务以及 http 服务里注册微服务的方式，还是挺简单的，这块封装的确实好。