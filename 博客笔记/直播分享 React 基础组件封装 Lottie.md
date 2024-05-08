Lottie 组件应用到实践中的效果如下

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/Kn1wMOibzLcHH8QQnGzmHHUIQzmpLZd2jsksag7XFz3Arha5mBuEFLoNkU427sAq9hRXLoON8KTWzjOMsWwUmdw/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Lottie 是在客户端的一个动画通用解决方案。如果你对 Lottie 还不了解的话，可以通过[这篇文章](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649866785&idx=1&sn=d0d4a9cf680417eea96c0f78417ad898&chksm=f3e593b2c4921aa480173ecd2fe457d48586b974f988f9e0469f749f4fb8859b5c3d53127007&scene=21#wechat_redirect)简单了解一下。

在 web 上，Lottie 的运用**比较简单**。不过本次分享的内容是基于 Taro 开发微信小程序，将 Lottie 封装成为一个项目通用 React 基础组件。

实现它的主要难度在于：**Taro 虽然提供了 Lottie 组件，但是并不支持微信小程序。**

因此，在实现目标的过程中，踩了很多坑。结合这些踩坑经历，封装该组件的过程，糅合了许多基础知识，使得 Lottie 组件变成了一个综合性很强的应用场景，对于学习 React 有非常大的指导意义。

## \-

**直播时间**

**时间：**今天下午两点「2023.12.02 14:00」

**地址：**http://live.bilibili.com/23135848

> 或者在 B 站直播搜索我的昵称：**这波能反杀\_**

**内容**：

**解决方案：**需求是基于 Taro 在微信小程序中实现简单易用的 Lottie 组件，并支持如下属性，支持 ref 引用

```
interface&nbsp;LottieProps&nbsp;{<br>&nbsp;&nbsp;data?:&nbsp;any,<br>&nbsp;&nbsp;path?:&nbsp;string,<br>&nbsp;&nbsp;loop?:&nbsp;boolean,<br>&nbsp;&nbsp;autoplay?:&nbsp;boolean,<br>&nbsp;&nbsp;width?:&nbsp;number,<br>&nbsp;&nbsp;height?:&nbsp;number,<br>&nbsp;&nbsp;...<br>}<br>
```

**踩坑经历**：踩坑经历对于个人成长而言远比解决方案本身更具有价值，往往丰富的踩坑经验也代表了丰富的工作经验

**基础知识**：结合踩坑经历分享相关的基础知识的实践运用，本次的基础知识主要包括以下几点

```
<span data-darkreader-inline-color="">1.</span>&nbsp;useEffect<br><span data-darkreader-inline-color="">2.</span>&nbsp;useImperativeHandle<br><span data-darkreader-inline-color="">3.</span>&nbsp;forwardRef<br><span data-darkreader-inline-color="">4.</span>&nbsp;useLoad/useReady<br><span data-darkreader-inline-color="">5.</span>&nbsp;useRef<br><span data-darkreader-inline-color="">6.</span>&nbsp;引用数据类型<br><span data-darkreader-inline-color="">7.</span>&nbsp;<span>this</span><br><span data-darkreader-inline-color="">8.</span>&nbsp;React&nbsp;render&nbsp;机制<br><span data-darkreader-inline-color="">9.</span>&nbsp;ts&nbsp;应用<br>...<br>
```

错过直播的同学可以在**React 知命境付费群**中后续观看，购买[React哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)可加入该付费群