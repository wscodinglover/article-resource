> 本文作者系360奇舞团前端开发工程师

## 一 介绍

Handsfree是一个通过计算机视觉集成手势，面部表情和各种姿势识别的前端库。其核心ai技术用到了tensorflow，可在浏览器上触发交互事件，比如滚动网页，检测人脸并展示相关表情，控制桌面游戏。也可以通过websocket接口控制任意与电脑连接的设备。

原来这个库有详细的文档和相关代码示例，但不清楚为什么最近都找不到了，作者也很多年没有更新了，这个库使用起来比较简单，所以抽时间整理下，也有相关其他库可替代，比如Handtrack.js，用来检测人手部动作。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEAYy7Jyic5G0XYVibhKYltg7h86zF0SEQnrXIRib3TDibCSY8UXj9icN9xxcCmTWhicv4WOg41vphe5AbZw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

官网截图

## 二 使用方法

#### 初始化

1.  在 DOM 中包含 Handsfree.js JavaScript 和样式表即可。
    
    ```
    &lt;link&nbsp;rel=<span data-darkreader-inline-color="">"stylesheet"</span>&nbsp;href=<span data-darkreader-inline-color="">"https://unpkg.com/handsfree@8.5.1/build/lib/assets/handsfree.css"</span>&nbsp;/&gt;<br>&nbsp;&lt;script&nbsp;src=<span data-darkreader-inline-color="">"https://unpkg.com/handsfree@8.5.1/build/lib/handsfree.js"</span>&gt;&lt;/script&gt;<br>
    ```
    
    引用后会将`Handsfree`类以及指针的基本样式添加到页面中。下一步是创建一个实例`Handsfree`：
    
    ```
    const&nbsp;config&nbsp;=&nbsp;{<br>&nbsp;&nbsp;showDebug:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;hands:&nbsp;<span data-darkreader-inline-color="">true</span><br>}<br>const&nbsp;handsfree&nbsp;=&nbsp;new&nbsp;Handsfree(config)<br>handsfree.start()<br>
    ```
    

2.  使用npm
    
    ```
    npm&nbsp;i&nbsp;handsfree<br>handsfree&nbsp;=&nbsp;new&nbsp;Handsfree({<br>&nbsp;&nbsp;showDebug:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;hands:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;enabled:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;}<br>})<br>handsfree.start()<br>
    ```
    

Handsfree.js 提供了几种方法。两个主要的方法是 start() 和 stop()，分别用于加载检测模型和获取预测结果。

handsfree可添加插件，例如下面的 `consoleLogger`，可打印instance实例，获取很多有用信息的属性。

```
handsfree.start()<br>handsfree.use(<span data-darkreader-inline-color="">'consoleLogger'</span>,&nbsp;(instance)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;console.log(instance.head.pointer.x)<br>&nbsp;&nbsp;console.log(instance.head.pointer.y)<br>})<br>
```

#### 元素类名

当页面状态发生变化的时候，body标签会自动加上class类名，或者加上显隐状态

```
handsfree-show-when-stopped&nbsp;handsfree-hide-when-loading&nbsp;//&nbsp;默认隐藏loading,没有开启时展示开始按钮<br>handsfree-show-when-started&nbsp;handsfree-hide-when-loading&nbsp;//&nbsp;默认隐藏loading,当开始运行时展示停止按钮<br>
```

## 三 代码示例

可复制代码在电脑跑下看看效果，开启摄像头权限后，用手捏住上下滑动即可滑动对应的dom节点背景图。

```
&lt;head&gt;<br>&nbsp;&nbsp;&lt;!--&nbsp;Include&nbsp;Handsfree.js&nbsp;--&gt;<br>&nbsp;&nbsp;&lt;link&nbsp;rel=<span data-darkreader-inline-color="">"stylesheet"</span>&nbsp;href=<span data-darkreader-inline-color="">"https://unpkg.com/handsfree@8.5.1/build/lib/assets/handsfree.css"</span>&nbsp;/&gt;<br>&nbsp;&nbsp;&lt;script&nbsp;src=<span data-darkreader-inline-color="">"https://unpkg.com/handsfree@8.5.1/build/lib/handsfree.js"</span>&gt;&lt;/script&gt;<br>&nbsp;&nbsp;&lt;style&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;.handsfree-canvas-video&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;<span data-darkreader-inline-color="">#000;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;0.1;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&lt;/style&gt;<br>&lt;/head&gt;<br><br>&lt;body&gt;<br>&nbsp;&nbsp;&lt;!--&nbsp;Start/stop&nbsp;button&nbsp;with&nbsp;helper&nbsp;classes&nbsp;--&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"text-center"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;class=<span data-darkreader-inline-color="">"handsfree-show-when-stopped&nbsp;handsfree-hide-when-loading"</span>&nbsp;onclick=<span data-darkreader-inline-color="">"toggleModel('hands')"</span>&gt;Start&nbsp;Hand&nbsp;Tracking&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;class=<span data-darkreader-inline-color="">"handsfree-show-when-loading"</span>&nbsp;disabled&gt;Loading&nbsp;...&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;class=<span data-darkreader-inline-color="">"handsfree-show-when-started&nbsp;handsfree-hide-when-loading"</span>&nbsp;onclick=<span data-darkreader-inline-color="">"handsfree.stop()"</span>&gt;Stop&nbsp;Handsfree&lt;/button&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;!--&nbsp;Pincher&nbsp;table&nbsp;with&nbsp;helper&nbsp;classes&nbsp;to&nbsp;toggle&nbsp;things&nbsp;on/off&nbsp;--&gt;<br>&nbsp;&nbsp;&lt;section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Pinch&nbsp;fingers&nbsp;and&nbsp;drag&nbsp;to&nbsp;scroll&nbsp;the&nbsp;area&nbsp;under&nbsp;the&nbsp;pointers.&lt;/h1&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;table&nbsp;class=<span data-darkreader-inline-color="">"multi-hand-scrollers"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&nbsp;width=<span data-darkreader-inline-color="">"50%"</span>&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&nbsp;width=<span data-darkreader-inline-color="">"50%"</span>&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tr&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&nbsp;width=<span data-darkreader-inline-color="">"50%"</span>&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&nbsp;width=<span data-darkreader-inline-color="">"50%"</span>&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/td&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/tr&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/table&gt;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;!--&nbsp;We<span data-darkreader-inline-color="">'ll&nbsp;have&nbsp;the&nbsp;debugger&nbsp;injected&nbsp;into&nbsp;here&nbsp;--&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;id="debugger-holder"&gt;&lt;/div&gt;<br>&nbsp;&nbsp;&lt;/section&gt;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;!--&nbsp;Instantiate&nbsp;and&nbsp;start&nbsp;it&nbsp;--&gt;<br>&nbsp;&nbsp;&lt;script&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;handsfree&nbsp;=&nbsp;new&nbsp;Handsfree({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showDebug:&nbsp;true,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setup:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wrap:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$parent:&nbsp;document.querySelector('</span><span data-darkreader-inline-color="">#debugger-holder')</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;handsfree.enablePlugins(<span data-darkreader-inline-color="">'browser'</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>function</span>&nbsp;toggleModel(name)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;config&nbsp;=&nbsp;{}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config[name]&nbsp;=&nbsp;!handsfree.model[name].enabled<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config.autostart&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handsfree.update(config)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&lt;/script&gt;<br><br>&nbsp;&nbsp;&lt;!--&nbsp;Demo&nbsp;styles&nbsp;--&gt;<br>&nbsp;&nbsp;&lt;style&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;button&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;font-size:&nbsp;1em;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding:&nbsp;.5em;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;h1,&nbsp;table&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin-top:&nbsp;60px;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;section&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;800px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-width:&nbsp;100%;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;auto;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;table&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;.finger-pincher&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline-block;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;32px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;32px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;border-radius:&nbsp;32px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;<span data-darkreader-inline-color="">#000;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;auto;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;.finger-pincher:last-child&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;<span data-darkreader-inline-color="">#f00;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;.text-center&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text-align:&nbsp;center;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;table&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;table;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table-layout:&nbsp;fixed;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;.multi-hand-scrollers&nbsp;td&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;padding:&nbsp;0;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;.multi-hand-scrollers&nbsp;td&nbsp;&gt;&nbsp;div&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-height:&nbsp;300px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;auto;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;.multi-hand-scrollers&nbsp;td&nbsp;&gt;&nbsp;div&nbsp;&gt;&nbsp;div&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;1000px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;1000px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;url(<span data-darkreader-inline-color="">"https://i.imgur.com/W4ja4fR.png"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background-repeat:&nbsp;space;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background-size:&nbsp;32px;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;0.25;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&lt;/style&gt;<br>&lt;/body&gt;<span></span>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

滚动页面.gif

## 四 局限性

浏览器是单线程的：所以必须确保预测操作不会阻塞 UI 线程。每个预测可能需要 50 到 150 毫秒，所以用户会注意到这个延迟。

逐帧跟踪手部动作：如果想要跨帧识别手势，需要编写额外的代码来推断手在进入、移动和离开连续帧时的 ID。

不正确的预测：偶尔会出现不正确的预测（有时候会将脸检测为手）或者同时捏住三根手指的时候无法正确判断。而且不同的摄像头和光线条件都需要不同的模型参数设置（尤其是置信度阈值）才能获得良好的检测效果。

原文链接：https://juejin.cn/post/7319674466169159715

\- END \-

## 关于奇舞团

奇舞团是 360 集团最大的大前端团队，代表集团参与 W3C 和 ECMA 会员（TC39）工作。奇舞团非常重视人才培养，有工程师、讲师、翻译官、业务接口人、团队 Leader 等多种发展方向供员工选择，并辅以提供相应的技术力、专业力、通用力、领导力等培训课程。奇舞团以开放和求贤的心态欢迎各种优秀人才关注和加入奇舞团。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)