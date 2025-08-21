##  前言

通过前面的学习我们已经知道，JS任务分为同步任务和异步任务，异步任务与主程序可以同时并发执行。常见异步任务包括：setTimeout,setInterval,setImmediate,Promise.then(),I/O操作等。  

JS代码执行引擎是单线程设计，它是如何保证异步任务同时并发执行呢？为什么浏览器JS执行引擎要设计成单线程，不像java、c语言一样多线程设计呢？  

通过这章学习彻底解决你的疑惑。  

## JS引擎单线程设计

> 进程与线程
> 
> 简单理解： 一个应用程序对应一个进程，一个进程对应多个线程。
> 
> 比如：QQ程序有发送消息和接收消息功能，QQ程序看作一个进程，发送消息和接收消息需要同时执行，设计成发消息线程和接收消息线程。  

无论是 C、C++还是 JAVA，都是支持多线程，在处理异步任务时，可以创建线程与主程序同时并发执行从而提高执行效率。而javascript语言没有提供创建线程的API，JavaScript是单线程，不支持多线程。  

这跟 JavaScript的作用有关，都知道 JavaScript是主要运行在浏览器的脚本语言，最终操作的是页面的 DOM结构，当两个 JavaScript脚本同时修改页面的同一个 DOM节点时，浏览器该执行哪个呢？所以当时设计 JavaScript时，便要求当前修改操作完成后方可进行下一步修改操作。

### 浏览器内核

执行Javascript代码的JS执行引擎是单线程设计 ，但在浏览器内核中还有很多线程，它们与JS引擎线程并发执行，共同完成复杂任务。  

-   **GUI渲染线程** 
    

主要负责页面的渲染，解析HTML、CSS，构建DOM树，布局和绘制等。

当界面需要重绘或者由于某种操作引发回流时，将执行该线程。

该线程与JS引擎线程互斥，当执行JS引擎线程时，GUI渲染会被挂起，当任务队列空闲时，JS引擎才会去执行GUI渲染。

-   **JS引擎线程**
    

该线程当然是主要负责处理 JavaScript脚本，执行代码。

也是主要负责执行准备好待执行的事件，即定时器计数结束，或者异步请求成功并正确返回时，将依次进入任务队列，等待 JS引擎线程的执行。

当然，该线程与 GUI渲染线程互斥，当 JS引擎线程执行 JavaScript脚本时间过长，将导致页面渲染的阻塞。

-   **事件触发线程**
    

主要负责将准备好的事件交给 JS引擎线程执行。

比如 setTimeout定时器计数结束， ajax等异步请求成功并触发回调函数，或者用户触发点击事件时，该线程会将整装待发的事件依次加入到任务队列的队尾，等待 JS引擎线程的执行。

-   **定时器触发线程**
    

顾名思义，负责执行异步定时器一类的函数的线程，如：setTimeout，setInterval。

主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待JS引擎线程执行。

-   **HTTP请求线程**
    

顾名思义，负责执行异步请求一类的函数的线程，如：Promise，anxios，ajax等。

主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待JS引擎线程执行。

## JS事件循环机制

> JavaScript（JS）的事件循环机制是其异步编程的核心。事件循环机制允许JavaScript在单线程上执行任务，同时还能处理异步事件。

```
<span><span>console</span>.log(<span>1</span>);</span>
```

上面代码输出结果是什么？如果没有异步任务setTimeout相信你能很快给出答案。

首先主程序会从上向下解析执行，第一条conosle语句执行输出1，fn1和fn2是函数声明，调用时执行；setTimeout定时器异步任务被启动，交给定时器线程处理；接着执行fn2()函数调用语句，输出3, 再调用fn1()函数，输出2，然后执行console.log(5) ，输出5，主程序执行完再执行setTimeout异步任务语句，输出4。 答案是: 1，3，2，5，4  

### 事件循环机制原理

-   调用栈: 执行javascript代码
    
-   异步处理模块： 处理异步任务，存入执行队列
    
-   事件轮询： 从执行队列循环取任务执行
    

![Image](https://mmbiz.qpic.cn/mmbiz_png/2YvPggYPTL8sNTup5ctnEic1Nlt1D9ibtXa7XI3Wc8Bco1srYqZxMickpR3CI9dSF9YhoU6dvTA6U4595Nr1mOK1Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们写的javascript程序代码会被放入**调用栈**中，从上向下顺序执行，如果是同步代码，立即执行得到结果，如果是异步任务放入**异步处理模块,** 满足条件后放入任务队列等待执行，任务队列分为**宏任务队列和微任务队列**，setTimeout、setInterval、setImediate存入宏任务队列，Promise.then 存入微任务队列；当主程序执行完调用栈同步代码后，事件轮循开始先从微任务队列取任务执行，然后从宏任务队列取任务执行。

![Image](https://mmbiz.qpic.cn/mmbiz_png/2YvPggYPTL8sNTup5ctnEic1Nlt1D9ibtXMoViaeib1VrLgBH3MUk7uElIJbXJ7J2SL9vT0rZlISumc9FrkmV08cuA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 事件循环机制示例

```
<span><span>console</span>.log(<span>1</span>)</span>
```

![Image](https://mmbiz.qpic.cn/mmbiz_png/2YvPggYPTL8sNTup5ctnEic1Nlt1D9ibtXiaj1WqEbjDJEYTLcibibtY3KI0ejFHCK6PdIDCmCFfCQsIc5USxx5IjKg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

事件循环动画视频  

### 事件循环机制练习

-   练习一  
    

```
<span>setTimeout(<span><span>function</span> (<span></span>) </span>{</span>
```

-   练习二  
    

```
<span><span>console</span>.log(<span>'1'</span>);</span>
```

-   扩展练习三
    

```
<span><span>console</span>.log(<span>'1'</span>);</span>
```

理解事件循环机制原理基础上尝试以上练习，可以把答案发到评论区一起讨论。

## 总结

本文介绍了javascript执行引擎为什么是单线程设计，浏览器内核，通过动画示例介绍事件循环机制原理。

## 结束

> 我是一名老程序员，也是名热爱生活的中年大叔，欢迎关注。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

长按上图，识别图中二维码即可关注

推荐阅读：  

[动态权限菜单是什么？封装递归组件轻松实现](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646768&idx=1&sn=9e9a0e7094fde0d3d1b99f422c09424c&chksm=849fe435b3e86d231b8cd3c58bb406f55685f9f5eb0e85994aa1635ec701084cb81d6554c3bd&scene=21#wechat_redirect)

[](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646959&idx=1&sn=2b1c5c9097a72c4ec64fa89d7a6e413a&chksm=849fe4eab3e86dfc4a3695813c8d53e47c5420d991c22754ee482862800475d55d5b1e7cff03&scene=21#wechat_redirect)[ElementPlus 表单组件二次封装，提高50%开发效率](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646959&idx=1&sn=2b1c5c9097a72c4ec64fa89d7a6e413a&chksm=849fe4eab3e86dfc4a3695813c8d53e47c5420d991c22754ee482862800475d55d5b1e7cff03&scene=21#wechat_redirect)

[](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646863&idx=1&sn=d318b33d277bbd45641fc91722ac3902&chksm=849fe48ab3e86d9cf8327e3bd241f0d7469caeb11bbe124322f683ffe444868985cd31feb5bd&scene=21#wechat_redirect)[ElementPlus 表格组件二次封装，提高50%开发效率](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646863&idx=1&sn=d318b33d277bbd45641fc91722ac3902&chksm=849fe48ab3e86d9cf8327e3bd241f0d7469caeb11bbe124322f683ffe444868985cd31feb5bd&scene=21#wechat_redirect)

[token是什么? 无感刷新token技术让项目安全性与体验性完美平衡](http://mp.weixin.qq.com/s?__biz=MzA5ODU3OTgxOA==&mid=2447646989&idx=1&sn=767190b5fcfa8f53239331caa7238932&chksm=849fe508b3e86c1e4376fcc728269d9d9f51ba601ae48c9269f1acaedd14915d1700e26d3f07&scene=21#wechat_redirect)