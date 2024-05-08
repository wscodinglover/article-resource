最近做了一个 AI 问答的项目，需要获取用户的摄像头，录像录音，实时语音转文字等等功能，记录一下踩过的坑。以及目前的最佳实现。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/lCQLg02gtibs1kMiaABKUvnon7sxIAf8WuqQkvod3dkaXv29szvZru7oHbQicicU2icFUsic2yyoYEtGJD3uTvcjSe7g/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

## WebRTC 技术介绍

> ❝
> 
> WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。
> 
> ❞

一句话总结就是：支持浏览器实时的传输音频流和视频流。

具体的应用案例有：

-   单/多人的视频会议
    
-   视频直播
    
-   等等
    

## 前言

本文里面没有 视频直播，多人会议的 case，因为我们这个项目需要快速落地，在最开始架构的时候，没有考虑采用流式的数据传输，还是传统的 ajax 前后端分离的项目，只不过使用 WebRTC 中的一些能力实现了录音和录像，并解决了一些过程中遇到的坑。

不过腾讯有一个 TRTC 产品，一个很成熟的方案，使用的是流式的数据传输，用来解决视频直播等等场景。

## 获取用户的设备（摄像头，麦克风）

### API 介绍

主要是使用了 getUserMedia 这个 api。

兼容性如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibs1kMiaABKUvnon7sxIAf8WuwA4EqiahYACD32xuUwSPL3vCrvy5bmjbrFRLoASAOjuVnickicibM4pOJw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image-1.png

这个 API 的基本使用如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>const</span>&nbsp;isSupportMediaDevicesMedia&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>return</span>&nbsp;!!(navigator.getUserMedia&nbsp;||&nbsp;(navigator.mediaDevices&nbsp;&amp;&amp;&nbsp;navigator.mediaDevices.getUserMedia));<br>};<br><br><span>if</span>&nbsp;(isSupportMediaDevicesMedia())&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;兼容性</span><br>&nbsp;&nbsp;navigator.getUserMedia&nbsp;=&nbsp;navigator.getUserMedia&nbsp;||&nbsp;navigator.webkitGetUserMedia&nbsp;||&nbsp;navigator.mozGetUserMedia&nbsp;||&nbsp;navigator.msGetUserMedia;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;配置</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;mediaOption&nbsp;=&nbsp;{&nbsp;<span>audio</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span>video</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;};<br><br>&nbsp;&nbsp;navigator.mediaDevices<br>&nbsp;&nbsp;&nbsp;&nbsp;.getUserMedia(mediaOption)<br>&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>stream</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`[Log]&nbsp;stream--&gt;`</span>,&nbsp;stream);<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;.catch(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">`[Log]&nbsp;获取摄像头和麦克风权限失败--&gt;`</span>,&nbsp;err);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(navigator.userAgent.toLowerCase().match(<span data-darkreader-inline-color="">/chrome/</span>)&nbsp;&amp;&amp;&nbsp;location.origin.indexOf(<span data-darkreader-inline-color="">'https://'</span>)&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限'</span>);<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'无法获取浏览器录音功能，请升级浏览器或使用chrome'</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

核心就是 getUserMedia 方法和 mediaOption 这个配置。

mediaOption 配置：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>const</span>&nbsp;mediaOption&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>audio</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;true&nbsp;标识需要获取音频流</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;video:&nbsp;true,&nbsp;//&nbsp;true&nbsp;标识需要获取视频流</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;指定视频的宽高和帧率</span><br>&nbsp;&nbsp;<span>video</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>width</span>:&nbsp;{&nbsp;<span>min</span>:&nbsp;<span data-darkreader-inline-color="">980</span>,&nbsp;<span>ideal</span>:&nbsp;<span data-darkreader-inline-color="">980</span>,&nbsp;<span>max</span>:&nbsp;<span data-darkreader-inline-color="">1920</span>&nbsp;},&nbsp;<span data-darkreader-inline-color="">//&nbsp;min,max&nbsp;指定一个范围，ideal&nbsp;表示优先使用的值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>height</span>:&nbsp;{&nbsp;<span>min</span>:&nbsp;<span data-darkreader-inline-color="">560</span>,&nbsp;<span>ideal</span>:&nbsp;<span data-darkreader-inline-color="">560</span>,&nbsp;<span>max</span>:&nbsp;<span data-darkreader-inline-color="">1080</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>frameRate</span>:&nbsp;{&nbsp;<span>ideal</span>:&nbsp;<span data-darkreader-inline-color="">12</span>,&nbsp;<span>max</span>:&nbsp;<span data-darkreader-inline-color="">15</span>&nbsp;},&nbsp;<span data-darkreader-inline-color="">//&nbsp;指定帧率</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>deviceId</span>:&nbsp;{&nbsp;<span>exact</span>:&nbsp;<span data-darkreader-inline-color="">'设备id'</span>&nbsp;},&nbsp;<span data-darkreader-inline-color="">//&nbsp;多设备的时候，可以通过设备id获取指定的设备</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>facingMode</span>:&nbsp;<span data-darkreader-inline-color="">'user'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;user：前置摄像头，environment：后置摄像头</span><br>&nbsp;&nbsp;},<br>};<br></code>
```

`getUserMedia` 返回了一个 `Promise<MediaStream>`，`MediaStream` 就是我们需要媒体流，那么拿到了流就可以干我们想干的事情了。

### 简单 case

OK，先简单实现一个播放这个流。要播放流，其实逻辑很简单，video 标签有一个 srcObject 属性，直接设置就可以了。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import React, { useEffect, useRef, useState } from 'react';<br>import './index.scss';<br><br>function RecordInfo() {<br>  const streamRef = useRef&lt;MediaStream&gt;(); // 流对象<br>  const videoRef = useRef&lt;HTMLVideoElement | null&gt;();<br><br>  useEffect(() =&gt; {<br>    const constraints = {<br>      video: {<br>        width: { min: 980, ideal: 1920, max: 1920 },<br>        height: { min: 560, ideal: 1080, max: 1080 },<br>        frameRate: { ideal: 12, max: 15 },<br>      },<br>      audio: true,<br>    };<br>    navigator.mediaDevices<br>      .getUserMedia(constraints)<br>      .then((stream: MediaStream) =&gt; {<br>        streamRef.current &amp;&amp; streamRef.current.getTracks().forEach((track) =&gt; track.stop());<br>        streamRef.current = stream;<br>        videoRef.current!.srcObject = streamRef.current!; // 用视频标签播放这个流<br>      })<br>      .catch((err) =&gt; {<br>        console.error(`[Log] 用户拒绝使用摄像头和麦克风`, err);<br>      });<br><br>    return () =&gt; {<br>      streamRef.current &amp;&amp; streamRef.current.getTracks().forEach((track) =&gt; track.stop()); // 停止这个流<br>    };<br>  }, []);<br><br>  return (<br>    &lt;div className="record-info-wrapper"&gt;<br>      &lt;div className="record-info-video"&gt;<br>        &lt;video width="640" height="480" autoPlay={true} ref={(el) =&gt; (videoRef.current = el)}&gt;&lt;/video&gt;<br>      &lt;/div&gt;<br>    &lt;/div&gt;<br>  );<br>}<br><br>export default RecordInfo;<br></code>
```

最终效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-2.png

有几个注意点：

1.  video 标签的 autoPlay 属性要是 true，这样流才会播放
    
2.  用完一定要记得停止，防止 cpu 占用过高
    
3.  如果想要静音啥的，直接设置 video 标签相关的属性就好了
    

### 获取指定设备

一台电脑可以外接多个音视频设备， getUserMedia 默认是拿默认设备，如何获取所有设备以及获取指定设备的流呢？

使用到的是 enumerateDevices 这个 API，返回的是 `Promise<MediaDeviceInfo[]>`，

MediaDeviceInfo 有如下属性：

-   kind:设备类型，是摄像头还是麦克风，
    
-   label: 设备名称
    
-   deviceId: 设备 ID
    

有了设备 id 就可以用 getUserMedia 获取指定的设备。

### 录屏

getUserMedia 是通过用户的物理设备来获取流，如果想要获取用户的屏幕的话，需要使用getDisplayMedia 这个 api，使用方法都差不多，不过多说明了。

## 设备检测

设备检测应该是项目里面一个必不可少的环节，主要有网络检测和硬件检测。

### 网络检测

网络检测大体分两种，一个是网速检测，一个是稳定性检测。

不过整体上方案都一样，细节不多说，说一下大体实现：

1.  你需要有一张网络图片，然后构造一个数组，长度 5 到 10 都可以
    

1.  `https://assistant.ceping.com/Images/all_img.png?t=${Math.random()}` 加上随机参数防止缓存
    

3.  循环数据，new Image()，然后设置 src，然后监听 onload 事件，然后记录时间，来实现网速检测
    
4.  稳定性检测，就是看你所有的数据，成功了多少，失败了多少，来判断是否稳定
    

如果你想简单做，可以使用 ahooks 里面封装的 useNetwork，实现如下

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-3.png

### 硬件检测

其实就是直接调用 `getUserMedia`，看看会不会失败。

### 注意点

1.  系统默认的设备如果被占用了，获取流的时候可能会失败，比如你在会议里面共享桌面，然后在去获取流就可能会失败。
    
2.  联想笔记本有一个物理开关，能总控摄像头的访问权限，所以有时候一直是黑屏可以检查一下是不是这个原因。
    

## 录制视频

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

1.gif

### 基本使用

录制视频是使用的 MediaRecorder 这个 API，使用方法也很简单

-   创建一个 MediaRecorder 对象，传入我们获取到的 stream 流，可以使用 mimeType 指定编码类型，默认是 `video/webm`
    
-   监听 dataavailable 事件，类似于 change 事件，会吐出录像数据，数据其实就是二进制的 blob 对象，直接 push 到数组里面就好了
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-5.png

-   调用 start 方法开始录制，如果不传时间参数，那 dataavailable 只会在 stop 的时候触发一次，传了时间参数，就每间隔时间触发 dataavailable 事件
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-6.png

-   调用 stop 方法结束录制
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-7.png

回看的逻辑也很简单，我们 videoBlobs 里面已经收集到了很多的二进制录屏数据，直接 createObjectURL 传给 video 就可以了

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-8.png

### 编码类型

构造 MediaRecorder 可以传递一个 mimeType 类型，用来指定录制的数据的编码类型，但是我**「还没弄明白这些类型最终生成的数据有啥区别」**，建议直接使用 `video/webm`，因为不管是啥编码类型，MediaRecorder 最终生成的文件只会是 webm 格式

贴一个 工具方法，获取当前浏览所有支持的 mimeType 类型

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span>function</span>&nbsp;<span data-darkreader-inline-color="">getSupportedMimeTypes</span>(<span>media:&nbsp;<span data-darkreader-inline-color="">string</span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;videoTypes&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'webm'</span>,&nbsp;<span data-darkreader-inline-color="">'ogg'</span>,&nbsp;<span data-darkreader-inline-color="">'mp4'</span>,&nbsp;<span data-darkreader-inline-color="">'x-matroska'</span>];<br>&nbsp;&nbsp;<span>const</span>&nbsp;audioTypes&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'webm'</span>,&nbsp;<span data-darkreader-inline-color="">'ogg'</span>,&nbsp;<span data-darkreader-inline-color="">'mp3'</span>,&nbsp;<span data-darkreader-inline-color="">'x-matroska'</span>];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;prettier-ignore</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;codecs&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'should-not-be-supported'</span>,&nbsp;<span data-darkreader-inline-color="">'vp9'</span>,&nbsp;<span data-darkreader-inline-color="">'vp9.0'</span>,&nbsp;<span data-darkreader-inline-color="">'vp8'</span>,&nbsp;<span data-darkreader-inline-color="">'vp8.0'</span>,&nbsp;<span data-darkreader-inline-color="">'avc1'</span>,&nbsp;<span data-darkreader-inline-color="">'av1'</span>,&nbsp;<span data-darkreader-inline-color="">'h265'</span>,&nbsp;<span data-darkreader-inline-color="">'h.265'</span>,&nbsp;<span data-darkreader-inline-color="">'h264'</span>,&nbsp;<span data-darkreader-inline-color="">'h.264'</span>,&nbsp;<span data-darkreader-inline-color="">'opus'</span>,&nbsp;<span data-darkreader-inline-color="">'pcm'</span>,&nbsp;<span data-darkreader-inline-color="">'aac'</span>,&nbsp;<span data-darkreader-inline-color="">'mpeg'</span>,&nbsp;<span data-darkreader-inline-color="">'mp4a'</span>];<br>&nbsp;&nbsp;<span>const</span>&nbsp;types&nbsp;=&nbsp;media&nbsp;===&nbsp;<span data-darkreader-inline-color="">'video'</span>&nbsp;?&nbsp;videoTypes&nbsp;:&nbsp;audioTypes;<br>&nbsp;&nbsp;<span>const</span>&nbsp;isSupported&nbsp;=&nbsp;MediaRecorder.isTypeSupported;<br>&nbsp;&nbsp;<span>const</span>&nbsp;supported:&nbsp;<span data-darkreader-inline-color="">string</span>[]&nbsp;=&nbsp;[];<br>&nbsp;&nbsp;types.forEach(<span>(<span><span>type</span></span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;mimeType&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${media}</span>/<span data-darkreader-inline-color="">${<span>type</span>}</span>`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;codecs.forEach(<span>(<span>codec</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${mimeType}</span>;codecs=<span data-darkreader-inline-color="">${codec}</span>`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;`${mimeType};codecs=${codec.toUpperCase()}`,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;].forEach(<span>(<span>variation</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(isSupported(variation))&nbsp;supported.push(variation);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(isSupported(mimeType))&nbsp;supported.push(mimeType);<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span>return</span>&nbsp;supported;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;使用</span><br><span>const</span>&nbsp;videoMimeTypeList&nbsp;=&nbsp;getSupportedMimeTypes(<span data-darkreader-inline-color="">'video'</span>);<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`[Log]&nbsp;videoMimeTypeList--&gt;`</span>,&nbsp;videoMimeTypeList);<br><span>const</span>&nbsp;audioMimeTypeList&nbsp;=&nbsp;getSupportedMimeTypes(<span data-darkreader-inline-color="">'audio'</span>);<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`[Log]&nbsp;audioMimeTypeList--&gt;`</span>,&nbsp;audioMimeTypeList);<br></code>
```

编码类型可以理解成压缩数据的方式，有一些是无损压缩的，有一些是有损的，无损的压缩文件大小就会非常大，这里就不得不提到一些类型了，因为在项目中踩了很多的坑

在本文中，需要了解的视频格式

-   webm: 因为 MediaRecorder 只能录制 webm 格式的数据
    
-   mp4: web 中比较通用的视频格式
    

在本文中，需要了解的音频格式

-   webm: 因为 MediaRecorder 只能录制 webm 格式的数据
    
-   mp3: web 中比较通用的音频格式
    
-   pcm、wav: wav 在 pcm 文件中加入了一些描述信息，其余和 pcm 完全一致，pcm 是一种无损的音频格式，文件十分巨大，webm 可以不是很麻烦的转成 pcm 格式
    

这些文件格式的转换是十分复杂的，但并不是不能实现，需要将 blob 数据转成最原始的二进制数组，然后使用对应的编码方案，操作这个二进制数组。

## 视频截图

原理是画在 canvas 上，然后用 canvas 的 api 转成 blob 二进制数据

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>export</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">takeScreenshot</span>(<span>video:&nbsp;HTMLVideoElement</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;Blob&gt;<span>(<span>(<span>resolve,&nbsp;reject</span>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;canvas&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span>'canvas'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;context&nbsp;=&nbsp;canvas.getContext(<span>'2d'</span>)!;<br>&nbsp;&nbsp;&nbsp;&nbsp;canvas.width&nbsp;=&nbsp;video.videoWidth;<br>&nbsp;&nbsp;&nbsp;&nbsp;canvas.height&nbsp;=&nbsp;video.videoHeight;<br>&nbsp;&nbsp;&nbsp;&nbsp;context.drawImage(<span>video,&nbsp;0,&nbsp;0,&nbsp;canvas.width,&nbsp;canvas.height</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;canvas.toBlob(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span>blob</span>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(<span>blob!</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;图片绘制完成</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'image/jpeg',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;<span data-darkreader-inline-color="">//&nbsp;图片压缩比率</span><br>&nbsp;&nbsp;&nbsp;&nbsp;</span>);<br>&nbsp;&nbsp;}</span>);<br>}<br></span></code>
```

### 可能遇到的坑

1.  截图是黑色的：截图的时间点 video 还没有缓存数据，导致截图是黑色的，需要等 video 缓存数据
    

1.  上面的代码是直接在录屏的时候截图，如果是任意 video 标签截图，需要让 video.load()，并且 loadeddata 事件触发之后，video.readyState 确保加载了足够的帧再截图
    

3.  截的图是重复的：
    

1.  多次截图的时候，video 标签是同一个，有很多原因会导致多次截图的时候，拿到的 video 标签的**「状态」**是一致的，所以截图就是一样的了，建议是 await 一下 takeScreenshot 方法，截图完成之后，再去截下一张图
    

## 频谱-音频可视化

实际的需求是需要获取到说话声音的大小，类似于微信发语音，有一个声音的波动效果。

相信大家都看到过下面这种音乐频谱，能在音乐播放的时候跟随跳动。看上去很酷炫，但是实际底层的实现很简单。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-9.png

我贴一个技术文章和一段代码实现，有兴趣的可以研究研究。

-   Web Audio 在音频可视化中的应用
    

### 代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;分析音频</span><br><span>const</span>&nbsp;analysisAudio&nbsp;=&nbsp;useCallback(<span>(<span>audio:&nbsp;HTMLMediaElement</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建一个用来处理音频的工作环境（上下文），我们可以通过它来进行音频读取、解码等，进行一些更底层的音频操作</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;audioContext&nbsp;=&nbsp;<span>new</span>&nbsp;AudioContext();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置音频数据源</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;source&nbsp;=&nbsp;audioContext.createMediaElementSource(audio);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取音频时间和频率数据，以及实现数据可视化，connect&nbsp;之前调用</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;analyser&nbsp;=&nbsp;audioContext.createAnalyser();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;connect&nbsp;连接器，把声音数据连接到分析器，除了&nbsp;createAnalyser，还有：BiquadFilterNode[提高音色]、ChannelSplitterNode[分割左右声道]&nbsp;等对音频数据进行处理</span><br>&nbsp;&nbsp;source.connect(analyser);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过&nbsp;connect&nbsp;把处理后的数据连接到扬声器进行播放，不需要播放可以不执行</span><br>&nbsp;&nbsp;analyser.connect(audioContext.destination);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;fftSize&nbsp;用来设置分析的精度，值需要是2的幂次方，值越大&nbsp;分析精度越高</span><br>&nbsp;&nbsp;analyser.fftSize&nbsp;=&nbsp;<span data-darkreader-inline-color="">256</span>;<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">analyzeAudio</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;analyser.frequencyBinCount&nbsp;:&nbsp;二进制音频频率数据的数量（个数）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;bufferLength&nbsp;=&nbsp;analyser.frequencyBinCount;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Uint8Array&nbsp;:&nbsp;生成一个长度为&nbsp;analyser.frequencyBinCount&nbsp;的，用于处理二进制数据的数组</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;dataArray&nbsp;=&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Uint8Array</span>(bufferLength);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将当前频率数据复制到&nbsp;freqArray&nbsp;中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;analyser.getByteFrequencyData(dataArray);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;下面的逻辑就是自定义了&nbsp;dataArray&nbsp;中的数据就是频谱数组</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;sum&nbsp;=&nbsp;dataArray.reduce(<span>(<span>pre,&nbsp;cur</span>)&nbsp;=&gt;</span>&nbsp;pre&nbsp;+&nbsp;cur,&nbsp;<span data-darkreader-inline-color="">0</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;scale&nbsp;=&nbsp;<span data-darkreader-inline-color="">Math</span>.min(<span data-darkreader-inline-color="">100</span>,&nbsp;<span data-darkreader-inline-color="">Math</span>.floor((sum&nbsp;*&nbsp;<span data-darkreader-inline-color="">100</span>)&nbsp;/&nbsp;bufferLength&nbsp;/&nbsp;<span data-darkreader-inline-color="">128</span>));<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`[Log]&nbsp;声音大小--&gt;`</span>,&nbsp;scale);<br>&nbsp;&nbsp;&nbsp;&nbsp;requestAnimationFrame(analyzeAudio);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;audioContext.resume().then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;analyzeAudio();<br>&nbsp;&nbsp;});<br>},&nbsp;[]);<br></code>
```

上面的代码完全是模板，所有地方都可以 copy，不用理解是啥意思，照着抄就完事了，然后大致的讲一下一些关键点

-   `const source = audioContext.createMediaElementSource(audio);` 这里是分析了 audio dom，audioContext 还有一个`createMediaStreamSource` 方法，可以分析 MediaStream
    
-   `analyser.connect(audioContext.destination);` 这个是播放分析的音频，如果只分析，不需要播放出来，注释就好了
    
-   `analyser.getByteFrequencyData(dataArray);` 这行就是核心的逻辑，把分析的数据 赋值给 dataArray，执行完之后，可以吧 dataArray log 出来，就是我们需要的频谱信息
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-10.png

-   声音有高声调有低声调，dataArray 的数据就是从低往高声调的一个描述，dataArray\[0\] 表示的是最低的声调，值的大小表示最低声调的饱满程度。
    
-   `analyser.fftSize = 256;` 是用来决定分析的精度，dataArray 的长度是它的一半
    

### 坑点

-   注意 requestAnimationFrame 的性能，我这里是获取到声音的大小之后 setState 渲染组件了，如果不及时的停止的花，会造成页面越来越卡顿
    

## 实时语音转文字

实时语音转文字我们用的是腾讯云的服务，他提供了 对应的 js sdk 示例

sdk 里面的核心功能就是三个：

1.  创建一个声音采集对象，相关的代码在 `webrecorder.js` 里面，这个里面代码直接抄就完事了
    

1.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-11.png
    
2.  这里面也挺有意思的，我们光看函数的命名，就知道这里做了一层 webm 格式的数据转 pcm 格式，细节感兴趣的小伙伴可以看看
    
3.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-16.png
    
4.  AudioWorkletNode MDN
    
5.  createScriptProcessor MDN
    

3.  创建一个声音分析对象，相关的代码在 `speechrecognizer.js` 里面
    

1.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-12.png
    
2.  第一步，建立链接
    
3.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-13.png
    
4.  第二步，发送`webrecorder.js`获取到的声音数据
    
5.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-14.png
    
6.  第三步，将服务端的数据吐给调用者，在 strat 里面建立链接后，监听 onmessage 事件，然后判断服务端返回的数据，做一系列的逻辑判断，最后用很多回调吧数据返回给用户
    
7.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-15.png
    

5.  把这两个关联起来，相关的代码在 `webaudiospeechrecognizer.js` 里面，核心的逻辑就是实例化上面两个类，然后监听录音的回调，拿到声音数据调用 speechrecognizer 示例的 write 方法传输数据给服务端
    

1.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-17.png
    
2.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-18.png
    

## 踩过的坑-本文核心

其实至此，上面提到的代码，去问 GPT，他都已经能给你写个 80%出来了，不得不感慨 GPT 的强大

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-19.png

但是，不出意外肯定是出意外了。

### 坑点 1，录制的 视频/声音 没有时长

这个的表象是啥呢？

-   我们的项目需要获取到声音的时长，模拟 GPT 说话的一种打字效果
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    2.gif
    
-   我们在播放录音数据的时候，获取 audio 标签的 duration 是一个 Infinity，并不是具体的时间值
    

2.  在播放视频文件的时候，不管是下载到本地，还是直接用浏览器的 video 标签播放，播放器的进度条没有 总时长，播放器的控制按钮没有倍数能力
    

1.  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-20.png
    

OK，去百度一圈，发现一个写法，能够准确的拿到文件的时长，就是录音文件播放的时候，在一开始将文件的 currentTime 设置成一个巨大的值，这样他一定会超过文件的时长，让他直接播放完成，在 ontimeupdate 事件中，就可以拿到准确的 duration 了，完事之后再把 currentTime 改成 0，对用户来说还是从头开始播放

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-21.png

这样做有一个小小的缺点，就是如果文件很大的话，一开始并不会全部加载完，这个时候设置 currentTime 会导致进度条跳一下到最后，在跳回起点，这个还是可以看到的，不过整体的体验也没那么糟糕，还算可以接受。

### 坑点 2，不能支持倍数播放

我滴乖乖，上面的坑点也说了，用原生的 video 标签播放浏览器它自己录制的视频，竟然不给我全部功能，还缺胳膊少腿，然后我们的产品还十分重视这个倍速功能

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-22.png

有问题的长这样

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-23.png

正常的长这样，多一个倍速的能力

你说这可咋整，让我百度我都没有头绪去百度啊！

OK，言归正传，在 chromium 的 bug 列表里面，还是能搜出来几个与之相关的问题。

-   Issue1: MediaRecorder output should have Cues element
    
-   Issue2: Videos created with MediaRecorder API are not seekable / scrubbable
    
-   Issue3: No duration or seeking cue for opus audio produced with mediarecoder
    
-   Issue4: MediaRecorder: consider producing seekable WebM files
    

一个视频文件，大体可以分成两个部分，一个是 文件头信息，一个是视频的本体内容，文件头信息里面会记录很多视频的描述数据，比如编码格式，时长，等等。

MediaRecorder 可以录制数据，甚至可以在 strat 方法里面设置一个时间，分段录制数据，所以他并不知道我们的视频是何时停止的，也就不可能往头信息里面写相关的数据，甚至，我们录制的 webm，根本就没有文件头信息。

Chromium 官方已经将上面的 bug 标识为`wont fix` 不会修复，并推荐开发者自行找社区解决。

OK 经过不懈努力，我们现在已经知道 bug 的缘由了，那就找方案解决呗。

文章最开始的时候有提到一嘴，我们录制的 webm 格式的时候，我可以转换成其他格式的数据，只需要解码 webm 格式的数据，在按照相关格式的数据要求的编码方式进行编码就可以了。

能解码 webm 数据，也就是说我们也可以分析 webm 格式的数据，然后按照 WebM 格式的要求修复 文件头信息。

一句话说的很简单，让我们手撸这个过程也太不现实了吧，于是就去百度了一圈，找到几个相关的库。

-   fix-webm-duration
    

官方给的实例里面，我们需要自己手动的去记录视频时长，然后在修复文件头信息，这里的修复只是很简单的修复，并没有解析整个视频文件的内容

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-24.png

-   ts-ebml
    

这个官方给的 案例很简单，甚至看不出来能修复视频时长，在 github issue 里面搜了一圈才搜到完整的用法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>import</span>&nbsp;{&nbsp;tools,&nbsp;Reader,&nbsp;Decoder&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'ts-ebml'</span>;<br><span>import</span>&nbsp;{&nbsp;Buffer&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'buffer'</span>;<br><br><span data-darkreader-inline-color="">window</span>.Buffer&nbsp;=&nbsp;Buffer;&nbsp;<span data-darkreader-inline-color="">//&nbsp;ts-ebml&nbsp;最新版依赖了这个库，需要我们自己外部引入</span><br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span>async</span>&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">fixWebmMetaInfo</span>(<span>blob:&nbsp;Blob</span>):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">Blob</span>&gt;&nbsp;</span>{<br>&nbsp;&nbsp;<span>try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;decoder&nbsp;=&nbsp;<span>new</span>&nbsp;Decoder();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;reader&nbsp;=&nbsp;<span>new</span>&nbsp;Reader();<br>&nbsp;&nbsp;&nbsp;&nbsp;reader.logging&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;reader.drop_default_duration&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;bufSlice&nbsp;=&nbsp;<span>await</span>&nbsp;blob.arrayBuffer();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;ebmlElms&nbsp;=&nbsp;decoder.decode(bufSlice);<br>&nbsp;&nbsp;&nbsp;&nbsp;ebmlElms.forEach(<span>(<span>element</span>)&nbsp;=&gt;</span>&nbsp;reader.read(element));<br>&nbsp;&nbsp;&nbsp;&nbsp;reader.stop();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;refinedMetadataBuf&nbsp;=&nbsp;tools.makeMetadataSeekable(reader.metadatas,&nbsp;reader.duration,&nbsp;reader.cues);&nbsp;<span data-darkreader-inline-color="">//&nbsp;修复出来的文件头二进制数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;body&nbsp;=&nbsp;bufSlice.slice(reader.metadataSize);&nbsp;<span data-darkreader-inline-color="">//&nbsp;原来的数据截断一些，留出文件头的位置</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;result&nbsp;=&nbsp;<span>new</span>&nbsp;Blob([refinedMetadataBuf,&nbsp;body],&nbsp;{&nbsp;<span>type</span>:&nbsp;blob.type&nbsp;});&nbsp;<span data-darkreader-inline-color="">//&nbsp;把文件头拼接回去</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;result;<br>&nbsp;&nbsp;}&nbsp;<span>catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`[Log]&nbsp;fixWebmMetaInfo&nbsp;error--&gt;`</span>,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;blob;<br>&nbsp;&nbsp;}<br>}<br></code>
```

-   fix-webm-metainfo
    

fix-webm-metainfo 的源码其实就是 copy 的 ts-ebml，那这个库存在的意义是解决了什么问题呢？

`new ArrayBuffer()` 读取 二进制数据的时候 ArrayBuffer 的长度最大只有 1GB，如果你的文件大小超过了 1GB，那 ts-ebml 就不太够用了，fix-webm-metainfo 就是在 ts-ebml 基础上，在解析 webm 格式的数据时候，做了一个分段解析 webm 文件的能力。

### 坑点 3，文件格式

我们项目里面还有一个功能，就是需要做语音识别功能，本来是想着把录音数据给到后端，后端去调第三方接口来实现这个功能，但是第三方的接口文档里面，不支持 webm 格式的文件！！！

oh no! 这下不得不做文件格式转换了。

这个时候回想一下我们上面的实时语音转文字功能，其实就已经帮我们实现了这个功能了。

实时的语音转文字就是 webm 转 pcm 格式发送到服务端的，而且`webrecorder.js` 里面居然就存了所有的 pcm 数据，并且在 结束回调里面会传出来。

我滴妈，泪目了，腾讯 你干得好啊，直接把我要做的功能搞定了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-25.png

于是我兴高采烈的去跟我的 leader 反馈这个事情，但是 leader 直接给我泼了一盆凉水，pcm 格式的数据太大了，不适合网络传输，最好还是转成 MP3 格式的文件。

555 虽然但是，我太难了。

期间遇到一个贼搞笑的事情，leader 去问他花钱买的 GPT4.0 怎么吧 webm 转 mp3，结果 GPT 一本正经的在胡说，说有个库直接安装就可以做到，结果这个库都搜不到，问它是不是乱说，结果它又乱说了一个库出来，哈哈哈。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-26.png

ok，来讲一下怎么音频的 webm 转 mp3

目前有两个库

-   lamejs
    
-   github 地址是这个Recorder，npm 包名是叫 `recorder-core`
    

这里只介绍 Recorder 这个库，因为这个库太强大了，就是专门服务于**「音频」**领域的，而且这个库底层的 webm 转 mp3 就是使用 lamejs 这个库实现的。这个库的 api 使用起来也十分的简单

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>import</span>&nbsp;Recorder&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'recorder-core/recorder.mp3.min'</span>;<br>Recorder.CLog&nbsp;=&nbsp;<span><span>function</span>&nbsp;(<span></span>)&nbsp;</span>{};&nbsp;<span data-darkreader-inline-color="">//&nbsp;屏蔽日志</span><br><span>const</span>&nbsp;audioRecorder&nbsp;=&nbsp;Recorder({&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'mp3'</span>,&nbsp;<span>sampleRate</span>:&nbsp;<span data-darkreader-inline-color="">16000</span>,&nbsp;<span>bitRate</span>:&nbsp;<span data-darkreader-inline-color="">16</span>&nbsp;});&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里有一个坑点，采样率和比特率一定要和后端对好，第三方的api对这个有要求</span><br>audioRecorder.open();&nbsp;<span data-darkreader-inline-color="">//&nbsp;初始化&nbsp;的时候需要&nbsp;open&nbsp;一下</span><br><br>audioRecorder.start();&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始录制mp3</span><br>audioRecorder.stop(<span>(<span>blob:&nbsp;Blob</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;audioBlob.current&nbsp;=&nbsp;blob;<br>});&nbsp;<span data-darkreader-inline-color="">//&nbsp;录制结束的时候会吐出&nbsp;mp3&nbsp;数据</span><br><br>audioRecorder.close();&nbsp;<span data-darkreader-inline-color="">//&nbsp;用完需要&nbsp;close&nbsp;一下</span><br></code>
```

## 后续

### 视频格式转换

在上面解决视频不能倍数的过程中搜索到一个 WebAV 库，这个库是 B 站的大佬开发的，主要是做视频剪辑领域的，同时也可以录视频，并且没有上面提到的问题，并且还能够直接输出 MP4 格式，唯一的问题就是，底层使用的是一个浏览器相当新的一个 API 实现的，兼容性十分的差，chrome 都需要 94 版本才能支持。

-   WebCodecs mdn
    
-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    image-27.png
    

### RecordRTC

浏览器录制视频使用的是 MediaRecorder 这个 API，我们已经原生手撸了录制的功能，并且解决了其中遇到的一些坑点。

项目结束之后，回过头来总结的时候，在 github 上搜索到了 RecordRTC这个库，是一个专门用来解决录屏方案的库。

哎，只能怪这个项目时间实在是太赶了，不然肯定就不会手撸录视频的功能了，而是直接使用这个库。

也就是说，音频领域有很成熟的 Recorder 这个库，视频领域有很成熟的 RecordRTC 这个库。

那现在我们稍微的翻翻这个 RecordRTC 库的实现吧 看看它是怎么解决我们上面遇到的问题。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-28.png

在这个文件中我们可以看到，录视频的能力也是使用的 MediaRecorder 这个 API。

MediaRecorder 录制的视频没有 duration 也有相关讨论的 bug

最终的解决方案，作者是说提供了一个 getSeekableBlob 方法，来修复录制出来的 Blob 文件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image-29.png

getSeekableBlob 方法的实现 也是用的 `ts-ebml` 这个库。

哎，原来我们遇到的坑，前人早就遇到并且解决了。

不过现在还有一个坑点，就是 webm 格式的文件，如何转换成 mp4? RecordRTC 这个库并没有一个很好的方案，相关的问题中，也只能使用 `ffmpeg` 在服务端去做这个事情。

前端有 ffmpeg.wasm，目前业务里面还没有遇到视频格式转换的场景，先留坑一下

-   借助 ffmpeg.wasm 纯前端实现多音频和视频的合成
    
-   FFmpeg——在 Vue 项目中使用 FFmpeg
    

## 参考文章

-   Web Audio 在音频可视化中的应用
    
-   Electron / Chromium 屏幕录制 - 那些我踩过的坑