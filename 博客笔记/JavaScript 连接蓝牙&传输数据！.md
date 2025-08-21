```
<p data-style="margin-bottom: 0px; outline: 0px; color: rgb(34, 34, 34); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; letter-spacing: 0.544px; white-space: normal; background-color: rgb(255, 255, 255); text-align: center; visibility: visible;"><span>点击下方“</span><span data-style="outline: 0px; color: rgb(255, 0, 0); letter-spacing: 0.544px; word-spacing: 2px; font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, Arial, sans-serif; visibility: visible;">前端开发爱好者</span><span>”，选择“</span><span data-style="outline: 0px; color: rgb(255, 169, 0); letter-spacing: 0.544px; word-spacing: 2px; font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, Arial, sans-serif; visibility: visible;">设为星标</span><span>”</span></p><pre><section data-style="margin-right: 16px; margin-bottom: 8px; margin-left: 16px; outline: 0px; color: rgb(63, 63, 63); letter-spacing: 0.544px; white-space: normal; font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; word-spacing: 0.8px; text-align: center; visibility: visible; line-height: normal;"><span>第一时间关注技术干货！</span></section></pre><section><mp-common-profile data-pluginname="mpprofile" data-id="MzUzNTk3MjE2Ng==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/kzFgl6ibibNKqOYTBZZIvzRTwWDnIeeC7AWFC1GtPQq7mibycgPf3ZIp77hpNWedYwcxfaWicT2VuwwXERM0A6mM3w/300?wx_fmt=png&amp;wxfrom=19" data-nickname="前端开发爱好者" data-alias="web_share_" data-signature="分享 web 前端相关技术文章、工具资源、精选课程、视频教程资源、热点资讯等" data-from="0" data-is_biz_ban="0" data-origin_num="132" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section>
```

> 哈喽，大家好 我是 `xy`👨🏻💻。今天给大家分享一个如何用 `js` `连接蓝牙`设备并`传输数据`！！！

## 需求背景

最近项目上接到一个新的需求：`实现一个在浏览器端通过连接蓝牙打印机打印文件的功能`！

以下是关于这个需求的`详细描述`：

-   **支持主流浏览器**：如 Chrome、Firefox、Safari 等以及不同操作系统（如 Windows、macOS、Linux 等）。
    
-   **蓝牙连接**：用户能够通过浏览器自动搜索并连接到附近的蓝牙打印机。
    
-   **文件打印**：用户可以选择本地文件（如 PDF、Word、图片等格式）并通过蓝牙打印机进行打印。
    
-   **用户界面**：提供一个简洁明了的用户界面，方便用户选择打印机、上传文件和开始打印。
    

为了实现这个功能，我们将采用 `Web Bluetooth API` 技术方案：

`Web Bluetooth API` 是一个用于与`蓝牙设备通信`的 Web API，可以让我们在浏览器端直接与蓝牙打印机进行交互。

## 环境准备与权限获取

在使用 `Web Bluetooth API` 之前，请确保您的网站运行在支持该 `API` 的浏览器上（目前主要是 Chrome 和基于 Chromium 的浏览器）。

同时，用户需要授权网站访问蓝牙设备。这意味着您需要在网站中添加适当的 UI 提示，引导用户授权。

## 连接蓝牙设备

❗️Web Bluetooth API 规定，对于需要用户授权的操作，必须在用户有`明确交互行为`（例如点击按钮）发生时才能进行。这是为了保护用户隐私，防止自动化访问。

要连接蓝牙设备，首先需要使用 `navigator.bluetooth.requestDevice()`方法请求用户选择一个蓝牙设备。

这个方法接受一个 `acceptAllDevices:true` 参数，表示请求脚本可以接受所有蓝牙设备。

```
<span></span><code>&nbsp;&nbsp;<span>&lt;!--&nbsp;按钮点击连接蓝牙&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>id</span>=<span>"connect"</span>&nbsp;<span>onclick</span>=<span>"handleConnect()"</span>&gt;</span>连接蓝牙设备<span>&lt;/<span>button</span>&gt;</span><br></code>
```

```
<span></span><code>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span>handleConnect</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;navigator.bluetooth<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.requestDevice({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>acceptAllDevices</span>:&nbsp;<span>true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>device</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>"Device&nbsp;Name:"</span>,&nbsp;device.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>"Device&nbsp;ID:"</span>,&nbsp;device.id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;device.gatt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>server</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;连接到设备并发现服务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(<span>(<span>error</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.error(<span>"Error:"</span>,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br></code>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/kzFgl6ibibNKq5nnC9MnOyTba0jpXfLYKa3nicOmSYu886Afic5JF7Mjy8A1f0jbcqUIcRfEwvE0y4s3SxXsbVtTew/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

点击配对按钮，可以获取到  Device Name  以及对应的  Device ID ：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/kzFgl6ibibNKq5nnC9MnOyTba0jpXfLYKahIwAExwdTNqYoIOVEAZQBJAhsiatOFtL5Aic57wIn8JdNZjxd6yGeLPw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 发现服务与特征

成功连接到蓝牙设备后，下一步是发现设备上的`服务`和`特征`。

首先，使用 `connect()` 方法连接到设备。

然后，调用 `getPrimaryService()` 方法获取指定的服务。

❗️ 注意：这里的 `YOUR_SERVICE_UUID` 占位符表示实际的服务 `UUID`。

```
<span></span><code>server.connect()<br>&nbsp;&nbsp;.then(<span><span>server</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;server.getPrimaryService(<span>'YOUR_SERVICE_UUID'</span>);<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;.then(<span><span>service</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;发现特征</span><br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;.catch(<span><span>error</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.error(<span>'Error:'</span>,&nbsp;error);<br>&nbsp;&nbsp;});<br></code>
```

## 读取写入数据

使用 `readValue()` 和 `writeValue()` 方法读取和写入特征值:

```
<span></span><code><span>//&nbsp;读取特征值</span><br>characteristic.readValue()<br>&nbsp;&nbsp;.then(<span><span>value</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'Characteristic&nbsp;Value:'</span>,&nbsp;value);<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;.catch(<span><span>error</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.error(<span>'Error:'</span>,&nbsp;error);<br>&nbsp;&nbsp;});<br><br><span>//&nbsp;写入特征值</span><br><span>const</span>&nbsp;encoder&nbsp;=&nbsp;<span>new</span>&nbsp;TextEncoder();<br><span>const</span>&nbsp;data&nbsp;=&nbsp;encoder.encode(<span>'Hello,&nbsp;Bluetooth!'</span>);<br>characteristic.writeValue(data)<br>&nbsp;&nbsp;.then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'Data&nbsp;written&nbsp;successfully'</span>);<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;.catch(<span><span>error</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.error(<span>'Error:'</span>,&nbsp;error);<br>&nbsp;&nbsp;});<br></code>
```

这样一个简单的连接蓝牙设备并读写数据的功能案例就实现了，接下来就直接按照需求开干了，具体的实现这里不做过多的讲解了，感兴趣的小伙伴可以自己去动手尝试一下！

参考连接：

-   Web Bluetooth API：`https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth`
    

## 写在最后

> `公众号`：`前端开发爱好者` 专注分享 `web` 前端相关`技术文章`、`视频教程`资源、热点资讯等，如果喜欢我的分享，给 🐟🐟 点一个`赞` 👍 或者 ➕`关注` 都是对我最大的支持。

欢迎`长按图片加好友`，我会第一时间和你分享`前端行业趋势`，`面试资源`，`学习途径`等等。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kzFgl6ibibNKq5nnC9MnOyTba0jpXfLYKa6f2nmD1yIHxoTYnZlfvSuU4b7Am0cJicVSFW1L8P237QpwBwJsu19Nw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

添加好友备注【**进阶学习**】拉你进技术交流群

关注公众号后，在首页：

-   回复 **面试题**，获取最新大厂面试资料。
    
-   回复 **简历**，获取 3200 套 简历模板。
    
-   回复 **React 实战**，获取 React 最新实战教程。
    
-   回复 **Vue 实战**，获取 Vue 最新实战教程。
    
-   回复 **ts**，获取 TypeScript 精讲课程。
    
-   回复 **vite**，获取 Vite 精讲课程。
    
-   回复 **uniapp**，获取 uniapp 精讲课程。
    
-   回复 **js 书籍**，获取 js 进阶 必看书籍。
    
-   回复 **Node**，获取 Nodejs+koa2 实战教程。
    
-   回复 **数据结构算法**，获取数据结构算法教程。
    
-   回复 **架构师**，获取 架构师学习资源教程。
    
-   更多教程资源应有尽有，欢迎 **关注获取。**