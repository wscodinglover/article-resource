**READING**

**前言**

大家好，我是声网 RTE 开发者社区作者 @小曾同学，小伙伴们也可以叫我小曾～

如果你想**实现一对一音视频通话和屏幕共享功能**，不妨来看看这篇文章，保姆级教程，不需要从零实现，直接集成声网 SDK 即可轻松上手。  

本文也分享了我在实践过程中遇到的一些问题，帮助小伙伴们避坑。如果文章知识点有错误的地方，还请大家指正，让我们一起学习，一起进步～

_01_

背景介绍

声网提供了各端丰富的音视频 SDK，本文将要使用的是 Web 端 SDK。

本篇文章主要给小伙伴们分享如何使用声网 SDK 实现 Web 端音视频通话及屏幕共享功能，其中也会涵盖在实践过程中遇到的一些问题，以此记录防止小伙伴们踩坑，同时也希望通过从 0 到 1 实战的分享，能够帮助更多的小伙伴。

_02_

前期准备

在实战之前，需要有以下准备条件：

> • Npm & Node.js  
> 
> • 前端开发基础，如 html & CSS & JavaScript
> 
> • 注册声网账号，申请声网APPID、临时Token ，详见开始使用声网平台。

**如果你还没有声网账号，可以****通过文末的链接免费注册，每个账户每月都有 10000 分钟免费额度**。如果是个人学习/调试，时长完全够用。  

我个人的开发环境，具体信息如下：

> • MacBook Pro
> 
> • Visual Studio Code：v1.75.1
> 
> • Npm：v8.19.3
> 
> • Node.js：v16.19.0
> 
> • 声网 SDK：v4.2.1 ，sdk的下载可查看\*\*这里\*\*。
> 
> • Google Chrome ：v110.0.5481.177

_03_

实战环节

通过\[前期准备\]，我们已经完成了相关配置，已经拥有了 **App ID、Channel、临时 Token、声网 SDK**，在本次实战中，主要详细讲解两个 demo，分别是音视频通话及屏幕共享连麦。  

**3.1 实现音视频通话**

在开始实战之前，先声明下 Demo 组成架构，

创建一个文件夹名为 Agora\_VideoCall，文件夹中包含五个文件，分别是：

> • index.html：用于设计 Web 应用的用户界面
> 
> • index.css：用于设计网页样式
> 
> • basicVideoCall.js：实现音视频通话逻辑代码，主要通过 AgoraRTCClient 实现
> 
> • AgoraRTC\_N-4.2.1.js：声网音视频SDK
> 
> • assets：第三方库，主要用于设计用户界面

在 index.html 文件中导入声网SDK，具体内容可查看详细代码，接下来主要详细讲解音视频通话及屏幕共享实现逻辑。

```
<span><span>&lt;<span>script</span> <span>src</span>=<span>"./AgoraRTC-N-4.2.1.js"</span>&gt;</span><span>&lt;/<span>script</span>&gt;</span></span>
```

**3.1.1 实现音视频通话逻辑**

以下代码均在 basicVideoCall.js 文本中写入

1）首先调用 AgoraRTC.createClient 方法创建一个 client 对象，也就是创建客户端对象

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">var</span> client = AgoraRTC.createClient({ <span data-darkreader-inline-outline="">mode</span>: <span data-darkreader-inline-outline="">"rtc"</span>, <span data-darkreader-inline-outline="">codec</span>: <span data-darkreader-inline-outline="">"vp8"</span> });</span>
```

2）定义变量 App ID，Token、Channel、User ID，并使用箭头函数实现当页面被调用时用于加入音视频通话通道。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">var</span> options = {</span>
```

3）加入频道

定义 join 函数主要是将本地音视频 track 加入一个 RTC 频道，此时需要在函数中传入 App ID，Token、Channel、User ID。加入房间后，需要发布音视频track，所以还需要创建音视频 track，并调用 publish 方法将这些本地音视频track对象当作参数发布到频道中。

注意注意，在创建音视频 track 时需要先调用 createMicrophoneAudioTrack ：通过麦克风采集的音频创建本地音频轨道对象；再调用 createCameraVideoTrack ：通过摄像头采集的视频创建本地视频轨道对象。（如果先调用createCameraVideoTrack ，那么页面中将不会显示本地视频预览画面）

创建之后即可调用 play 方法展示本地预览，并调用 publish 方法发布到 RTC 频道中。注意 play 和 publish 方法的使用没有先后顺序，谁在前在后没有什么影响。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">async</span> <span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">function</span> <span data-darkreader-inline-outline="">join</span>(<span data-darkreader-inline-outline=""></span>) </span>{</span>
```

4）在频道中添加或移除远端用户逻辑

实现将同频道的远端用户添加到本地接口，当远端用户取消发布时，则从本地将用户移除。

```
<span><span><span>function</span> <span>handleUserPublished</span>(<span>user, mediaType</span>) </span>{</span>
```

5）订阅远端音视频逻辑

当远端用户发布音视频时，本地用户需要对其订阅，从而实现音视频通话，在 subscribe 函数中需要传入两个参数，分别是同频道远端用户 user id 和远端 mediaType，并调用 play 方法，播放远端用户音视频，从而实现一对一连麦。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">async</span> <span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">function</span> <span data-darkreader-inline-outline="">subscribe</span>(<span data-darkreader-inline-outline="">user, mediaType</span>) </span>{</span>
```

6）监听事件

当远端用户发布或者取消发布音视频 track 时，本地还需要对其监听，在 join 函数中，监听 client.on("user-published", handleUserPublished) 事件和 client.on("user-unpublished", handleUserUnpublished) 事件，具体如下

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">client</span>.<span data-darkreader-inline-outline="">on</span>(<span data-darkreader-inline-outline="">"user-published"</span>, handleUserPublished);</span>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  

7）离开频道

当用户点击 leave 按钮时，则将 stop 本地和远端音视频 track。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">async</span> <span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">function</span> <span data-darkreader-inline-outline="">leave</span>(<span data-darkreader-inline-outline=""></span>) </span>{</span>
```

**3.1.2 Demo展示**

接下来可以运行我们的 Demo 啦，输入 APPID、Token、Channel、Userid，点击 join，即可看到自己本地的画面，如果想和别人连麦，可以再复制一下网址，输入相同的 APPID、Token、Channel，即可实现连麦，赶快试试吧。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**3.2 屏幕共享连麦**

屏幕共享就是将本地用户的屏幕内容，以视频画面的方式分享给其他远端用户观看。其工作原理实际上是通过 createScreenVideoTrack 创建一个屏幕共享的视频轨道对象来实现。采集屏幕的过程中浏览器会询问需要共享哪些屏幕，根据终端用户的选择去获取屏幕信息。

在上述音视频 demo 的基础上实现屏幕共享功能。

**3.2.1 添加屏幕共享UI**

在 index.html 页面中添加屏幕共享（ScreenShare）button

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**3.2.2 屏幕共享实现逻辑**

以下代码均在 basicVideoCall.js 文本中写入

1）实现 share 函数

和上述 join 函数功能类似，主要用于开启屏幕共享，使用 createScreenVideoTrack 创建屏幕共享的视频轨道对象，同时也可以对视频编码进行一些简单的配置。函数中同样也需要添加监听事件。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">async</span> function <span data-darkreader-inline-outline="">share</span>(<span data-darkreader-inline-outline=""></span>)</span> {</span>
```

2）添加屏幕共享音视频轨道，并调用 play 方法播放本地屏幕共享的视频。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">if</span>(screenTrack <span data-darkreader-inline-outline="">instanceof</span> <span data-darkreader-inline-outline="">Array</span>){</span>
```

3）发布屏幕共享

发布本地音频和屏幕共享画面至 RTC 频道中。

```
<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">if</span>(localTracks.screenAudioTrack == <span data-darkreader-inline-outline="">null</span>){</span>
```

4）在 share 函数实现逻辑中需要绑定 "track-ended" 事件，当屏幕共享停止时，会有一个警报通知最终用户。

```
<span data-darkreader-inline-outline="">localTracks.screenVideoTrack.on(<span data-darkreader-inline-outline="">"track-ended"</span>, () =&gt; {</span>
```

**3.2.3 Demo 展示**

当点击 ScreenShare 时，会提示用户选择哪一个 page 进行分享，同时也有一个默认音频选项，点击分享之后，即可发布屏幕共享。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

_04_

小结

如果你想实现音视频和屏幕共享的 Web 应用，完全可以借鉴本篇文章 + 声网SDK，如果不是很熟悉的话，可以先看声网给出的「快速开始 - 实现音视频通话」。

在实践过程中需要注意的是：在创建音视频 track 时需要先调用 createMicrophoneAudioTrack ，再调用 createCameraVideoTrack ，如果先调用 createCameraVideoTrack  那么页面中将不会显示本地视频预览画面。

Generally，本篇文章给出的 demo 比较简单，**如果想要添加其他的功能比如，虚拟背景、AI降噪等，可以在此基础上继续添加功能**。  

**（正文完）**

___

**READING**

**参考资料**

**• 注册声网账号：**

_https://sso2.agora.io/cn/signup_  

**• 相关 SDK 下载：**

_https://docs.agora.io/cn/All/downloads_

**• 快速开始 - 实现音视频通话：**  

_https://docs.agora.io/cn/video-call-4.x/start\_call\_android\_ng?platform=Android_  

点击左下角**「阅读原文」**，一键注册声网账号

领取每月 10000 分钟免费额度

___

关注「声网开发者」

关注实时互动领域的

_**技术实践**_**、**_**行业洞察**_**、**_**人物观点**_

☟☟☟