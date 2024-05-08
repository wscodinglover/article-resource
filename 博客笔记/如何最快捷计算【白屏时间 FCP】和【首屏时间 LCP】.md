> **模拟面试、简历指导、入职指导、项目指导、答疑解惑**可私信找我~已帮助100+名同学完成改造！

## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心~

![Image](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdiasnibiaMibtqDD8cngbBJHVbwdUe6zs8HMwTDQ9Ysd6VrmvTZByeeibrsV5vWNnWkdKRsxe1ic0UpDbvQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当我们被问到网页的性能问题时，我们往往会想到 `首屏时间、白屏时间`，但是其实很多人根本分不清这两个到底有啥区别，一问也是三不知，问你怎么计算的你也不知道，所以本文章教你怎么去计算这两个时间吧~

## 白屏时间 & 首屏时间

### 白屏时间

白屏时间指的是，从网页开始加载，到你网页第一个字节出现，这段时间称为 `白屏时间`，也叫`First Content Paint`，也就是第一次内容渲染出来的时候，简称 `FCP`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 首屏时间

首屏时间指的是，从网页加载，到你网页第一屏渲染完成，这段时间称为 `首屏时间`，很多项目都是用`Larget Content Paint`来衡量，也就是最大内容渲染出来的时候，简称`LCP`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 区别

其实也就是`FCP、LCP`的区别

-   **FCP：** 第一个字节渲染出来的时间，这时候用户看不到主体网页结构
    
-   **LCP：** 最大内容渲染出来的事件，这时候用户已经能看到主体网页的结构了
    

## 如何计算

我们刚刚说了，这两个时间的计算，都是 `从网页加载，到XXX渲染完成`，这段时间是我们需要计算的时间，也就是我们需要算出这两个时间点：

-   网页开始加载
    
-   XXX渲染完成
    

### 网页开始加载

如何计算网页开始加载的时间呢？我们可以通过 `performance.getEntriesByType('navigation')[0]`去获取到一个属性 `activationStart`，他就是网页开始加载的时间

```
<span data-darkreader-inline-color="">const</span>&nbsp;startTime&nbsp;=&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;performance.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getEntriesByType(<span data-darkreader-inline-color="">'navigation'</span>)[<span data-darkreader-inline-color="">0</span>].<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activationStart&nbsp;??&nbsp;<span data-darkreader-inline-color="">0</span><br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 计算 FCP

我们已经拥有网页开始加载的时间点`startTime`了，我们想要计算`FCP`，那么只需要获取到第一个字节渲染完时的时间点，减去`startTime`，就可以得到`FCP`了

```
FCP&nbsp;=&nbsp;第一字节渲染时间点&nbsp;-&nbsp;startTime<br>
```

我们要怎么获得 第一字节渲染时间点 呢？我们可以使用 `PerformanceObserver`，他是一个浏览器提供给我们用来监测网页性能的观察器

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用方法如下，传入不同的 `type`，他可以监听并返回不同的加载列表，比如你想监听 `FCP`，那么你就得传入 `paint`

至于这个`buffered`，你可以理解为，你设为`true`之后，你就不用把这个监听放在文档前了，而是可以放在任意位置去监听

```
<span data-darkreader-inline-color="">const</span>&nbsp;observer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;PerformanceObserver(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>list,&nbsp;obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entries&nbsp;=&nbsp;list.getEntries();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(entries)<br>});<br>observer.observe({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'paint'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">buffered</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>});<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

传入`type = paint`，我们会得到两种加载事件项，一种是 `first-paint`，一种是`first-content-paint`，但是我们只想要后者，前者其实就是`FP`，现在这个指标的意义已经不大了，所以我们需要过滤，去计算`FCP`

而渲染事件对象里的`startTime`就是第一字节渲染完成的时间点

```
<span data-darkreader-inline-color="">let</span>&nbsp;FCP&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br><span data-darkreader-inline-color="">let</span>&nbsp;po&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;startTime&nbsp;=&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;performance.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getEntriesByType(<span data-darkreader-inline-color="">'navigation'</span>)[<span data-darkreader-inline-color="">0</span>].<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activationStart&nbsp;??&nbsp;<span data-darkreader-inline-color="">0</span><br><span data-darkreader-inline-color="">const</span>&nbsp;observer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;PerformanceObserver(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>list,&nbsp;obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entries&nbsp;=&nbsp;list.getEntries();<br>&nbsp;&nbsp;entries.forEach(<span><span>entry</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(entry.name&nbsp;===&nbsp;<span data-darkreader-inline-color="">'first-contentful-paint'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;计算&nbsp;FCP</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FCP&nbsp;=&nbsp;<span data-darkreader-inline-color="">Math</span>.max(entry.startTime&nbsp;-&nbsp;startTime,&nbsp;<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;计算完立即取消监听</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;po!.disconnect();<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;});<br>});<br>po&nbsp;=&nbsp;observer.observe({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'paint'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">buffered</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>});<br><br>
```

### 计算 LCP

当你的传入的`type = largest-contentful-paint`时，能监听最大内容渲染的渲染事件

```
<span data-darkreader-inline-color="">const</span>&nbsp;observer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;PerformanceObserver(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>list,&nbsp;obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entries&nbsp;=&nbsp;list.getEntries();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(entries)<br>});<br>observer.observe({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'largest-contentful-paint'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">buffered</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>});<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

计算方式还是按照刚刚`FCP`的计算方式去计算即可

```
<span data-darkreader-inline-color="">let</span>&nbsp;LCP&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br><span data-darkreader-inline-color="">let</span>&nbsp;po&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;startTime&nbsp;=&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;performance.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getEntriesByType(<span data-darkreader-inline-color="">'navigation'</span>)[<span data-darkreader-inline-color="">0</span>].<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;activationStart&nbsp;??&nbsp;<span data-darkreader-inline-color="">0</span><br><span data-darkreader-inline-color="">const</span>&nbsp;observer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;PerformanceObserver(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>list,&nbsp;obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entries&nbsp;=&nbsp;list.getEntries();<br>&nbsp;&nbsp;entries.forEach(<span><span>entry</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;计算&nbsp;FCP</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FCP&nbsp;=&nbsp;<span data-darkreader-inline-color="">Math</span>.max(entry.startTime&nbsp;-&nbsp;startTime,&nbsp;<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;计算完立即取消监听</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;po!.disconnect();<br>&nbsp;&nbsp;});<br>});<br>po&nbsp;=&nbsp;observer.observe({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'largest-contentful-paint'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">buffered</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>});<br>
```

## 结语

我是林三心

-   一个待过**小型toG型外包公司、大型外包公司、小公司、潜力型创业公司、大公司**的作死型前端选手；
    
-   一个偏前端的全干工程师；
    
-   一个不正经的掘金作者；
    
-   逗比的B站up主；
    
-   不帅的小红书博主；
    
-   喜欢打铁的篮球菜鸟；
    
-   喜欢历史的乏味少年；
    
-   喜欢rap的五音不全弱鸡
    

如果你想一起学习前端，一起摸鱼，一起研究简历优化，一起研究面试进步，一起交流历史音乐篮球rap，可以来俺的摸鱼学习群哈哈，点这个，有7000多名前端小伙伴在等着一起学习哦 --> 

> 广州的兄弟可以约饭哦，或者约球~我负责打铁，你负责进球，谢谢~