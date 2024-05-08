![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/po6IxVbAMcTnN20iaUhh3qxqIAicGJFlAZd6gJsbml2O4pLU1icoyYQRtWUnk3ayFw020boI9BjNiaKJr6Hurro9iaw/640?tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

莫罗哈夫莱海滩和科罗拉达斯海滩，富埃特文图拉岛，西班牙加那利群岛  
(© Gavin Hellier/Getty Images)

> ❝
> 
> 本文收录于互联网大厂每日一题: Daily Question<sup data-darkreader-inline-color="">[1]</sup>，内含大厂内推机会、面经大全及若干面试题，每天学习五分钟，一年进入大厂中。可在右下角打开原文查看
> 
> -   大厂面经大全: https://q.shanyue.tech/interview
>     
> -   面试准备路线: https://q.shanyue.tech/roadmap
>     
> 
> ❞

使用 JS 实现一个发布订阅器，`Event`，示例如下:

```
<span data-darkreader-inline-color="">const</span>&nbsp;e&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Event()<br><br>e.on(<span data-darkreader-inline-color="">'click'</span>,&nbsp;x&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">console</span>.log(x.id))<br><br>e.once(<span data-darkreader-inline-color="">'click'</span>,&nbsp;x&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">console</span>.log(id))<br><br><span data-darkreader-inline-color="">//=&gt;&nbsp;3</span><br>e.emit(<span data-darkreader-inline-color="">'click'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;})<br><br><span data-darkreader-inline-color="">//=&gt;&nbsp;4</span><br>e.emit(<span data-darkreader-inline-color="">'click'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;})<br><br>
```

API 如下：

```
<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Event</span>&nbsp;</span>{<br>&nbsp;&nbsp;emit&nbsp;(type,&nbsp;...args)&nbsp;{<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;on&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;once&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;off&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;}<br>}<br>
```

一个简单的订阅发布模式实现如下，主要有两个核心 API

-   `emit`: 发布一个事件
    
-   `on`: 监听一个事件
    
-   `off`: 取消一个事件监听
    

实现该模式，使用一个 events 维护发布的事件：

```
<span data-darkreader-inline-color="">const</span>&nbsp;events&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">click</span>:&nbsp;[{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">once</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">listener</span>:&nbsp;callback,<br>&nbsp;&nbsp;},&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">listener</span>:&nbsp;callback<br>&nbsp;&nbsp;}]<br>}<br>
```

具体实现代码如下所示

```
<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Event</span>&nbsp;</span>{<br>&nbsp;&nbsp;events&nbsp;=&nbsp;{}<br>&nbsp;<br>&nbsp;&nbsp;emit&nbsp;(type,&nbsp;...args)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;listeners&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;listener&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;listeners)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listener.listener(...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(listener.once)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.off(type,&nbsp;listener.listener)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;on&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type].push({&nbsp;listener&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;once&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type].push({&nbsp;listener,&nbsp;<span data-darkreader-inline-color="">once</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;off&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type].filter(<span><span>listener</span>&nbsp;=&gt;</span>&nbsp;listener.listener&nbsp;!==&nbsp;listener)<br>&nbsp;&nbsp;}<br>}<br>
```

以上代码不够优雅，且有点小瑕疵，再次实现如下，代码可见 如何实现发布订阅器  - codepen<sup data-darkreader-inline-color="">[2]</sup>

```
<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Event</span>&nbsp;</span>{<br>&nbsp;&nbsp;events&nbsp;=&nbsp;{}<br>&nbsp;<br>&nbsp;&nbsp;emit&nbsp;(type,&nbsp;...args)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;listeners&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;listener&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;listeners)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listener(...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;on&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type].push(listener)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;once&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;callback&nbsp;=&nbsp;<span>(<span>...args</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.off(type,&nbsp;callback)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listener(...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.on(type,&nbsp;callback)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;off&nbsp;(type,&nbsp;listener)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.events[type]&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.events[type].filter(<span><span>callback</span>&nbsp;=&gt;</span>&nbsp;callback&nbsp;!==&nbsp;listener)<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;e&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Event()<br><br><span data-darkreader-inline-color="">const</span>&nbsp;callback&nbsp;=&nbsp;<span><span>x</span>&nbsp;=&gt;</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'Click'</span>,&nbsp;x.id)&nbsp;}<br>e.on(<span data-darkreader-inline-color="">'click'</span>,&nbsp;callback)<br>e.on(<span data-darkreader-inline-color="">'click'</span>,&nbsp;callback)<br><br><span data-darkreader-inline-color="">//&nbsp;只打印一次</span><br><span data-darkreader-inline-color="">const</span>&nbsp;onceCallback&nbsp;=&nbsp;<span><span>x</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'Once&nbsp;Click'</span>,&nbsp;x.id)<br>e.once(<span data-darkreader-inline-color="">'click'</span>,&nbsp;onceCallback)<br>e.once(<span data-darkreader-inline-color="">'click'</span>,&nbsp;onceCallback)<br><br><span data-darkreader-inline-color="">//=&gt;&nbsp;3</span><br>e.emit(<span data-darkreader-inline-color="">'click'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;})<br><br><span data-darkreader-inline-color="">//=&gt;&nbsp;4</span><br>e.emit(<span data-darkreader-inline-color="">'click'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;})<br>
```

## 更多面试

-   [【淘宝】CSP 是干什么用的了](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484065&idx=1&sn=b7f4a4d9b5fb9971a2c0c8c053170729&chksm=9f0c3d98a87bb48ee9f65d326a9f548e410a262736d335b5f7be51ae983ecf89743026aef27a&scene=21#wechat_redirect)
    
-   [【字节】什么是覆盖索引](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484019&idx=1&sn=1cbc3fb793257cfa29ad952e46085ebb&chksm=9f0c3d4aa87bb45c91d25038a373f91e1dfb610a0ce95265335a899235ea635b56c4c432e0bf&scene=21#wechat_redirect)
    
-   [【淘宝】实现一个函数用来解析 URL 的 querystring](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484134&idx=1&sn=1a6a5605df53f112a23df674acf70c31&chksm=9f0c3ddfa87bb4c975d45de4220e1c11a8cdefb56bf740c03d8baabc562e27c23d57015c0a60&scene=21#wechat_redirect)
    
-   [【头条】CORS 如果需要指定多个域名怎么办](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247483847&idx=1&sn=38e68b3c615cf2a24f536ec16fd1adee&chksm=9f0c3efea87bb7e84069fddb5f030e345580c5f396e3fa7e5e1715f321d0175657064b588c58&scene=21#wechat_redirect)
    
-   [【阿里】既然 cors 配置可以做跨域控制，那可以防止 CSRF 攻击吗](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247483857&idx=1&sn=caf1d475253ee8b896a7197b82adc095&chksm=9f0c3ee8a87bb7fe04e682fb27e83bc67cf87197e517dcc5fb3fa156eb8325e15bcce57411a1&scene=21#wechat_redirect)
    

### Reference

\[1\]

Daily Question: _https://q.shanyue.tech_

\[2\]

如何实现发布订阅器  - codepen: _https://codepen.io/shanyue/pen/WNjprpe?editors=0012_