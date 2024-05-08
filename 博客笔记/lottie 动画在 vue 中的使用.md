## 前言

最近我所负责的项目中采用了动画效果，最早使用 gif 来实现。然而，在实践过程中，我发现 gif 格式的动画在 git 中出现了明显的锯齿感，这让我非常困扰。为了追求更完美的表现效果，我最终选择了 lottie 来实现我的动画需求。我深知动画效果的呈现对于用户体验至关重要，因此我非常认真地对待每一个细节，希望通过我的努力，为用户带来更加流畅、自然的视觉体验。

## Lottie 简介

Lottie 是一个适用于 Android、iOS、Web 和 Windows 的库，它使用 Bodymovin 解析导出为 JSON 的 Adobe After Effects 动画，并在移动设备和 Web 上原生渲染它们！

这是第一次，设计师可以创建和发布精美的动画，而无需工程师精心手工重新创建它们。他们说一图胜千言，请看示例：

![Image](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibv7cGkWyNYF5wvtn03nickyCsfrj5E85XBVfeuzjwiaGOCZoXO6dv06flO0P2VvUr7iamqicFfQTqUyicg/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Introduction\_00\_sm.gif

上述动画是在 After Effects 中创建的，可以使用简单的 JSON 文件在所有平台上进行本机渲染。

## lottie 的安装

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#&nbsp;由于在&nbsp;web&nbsp;端，所以安装的是&nbsp;lottie-web</span><br>pnpm&nbsp;add&nbsp;lottie-web<br></code>
```

## lottie 的使用

简单介绍 lottie 的使用

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>import</span>&nbsp;lottie&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'lottie-web'</span><br><span>import</span>&nbsp;animationData&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'xx/xx/xx.json'</span><br><br>lottie.loadAnimation({<br>&nbsp;&nbsp;&nbsp;&nbsp;animationData,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>loop</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>autoplay</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>renderer</span>:&nbsp;<span data-darkreader-inline-color="">'svg'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>container</span>:&nbsp;<span data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-color="">'container'</span>)<br>})<br></code>
```

调用 `lottie.loadAnimation()` 以启动动画。它将一个对象作为唯一的参数，下面是对象中字段的解释说明：

-   animationData: 包含导出的动画数据的 Object。
    
-   path: 动画对象的相对路径。（animationData 和 path 互斥）
    
-   loop: 动画循环次数，可选值 `true/false/number`
    
-   autoplay: 准备就绪后自动开始播放，可选值 `true/false`
    
-   name: 动画名称，供将来参考
    
-   renderer: 设置渲染器，可选值 `svg/canvas/html`
    
-   container: 用于渲染动画的 DOM 元素
    

它返回您可以通过播放、暂停、setSpeed 等方式控制的动画实例。

## 动画实例中的常用方法

-   **「anim.play()」**：播放动画
    
-   **「anim.stop()」**：停止动画
    
-   **「anim.pause()」**：暂停动画
    
-   **「anim.setLocationHref(locationHref)」**：一个参数通常作为 'location.href' 传递。当你在 safari 中遇到掩码问题时，它很有用，因为你的 url 没有 “#” 符号。
    
-   **「anim.setSpeed(speed)」**：设置动画速度(1为正常速度)
    
-   **「anim.goToAndStop(value, isFrame)」**：跳到某个时刻并停止，第一个参数是数值，如果第二个参数为true，则第一个参数为帧，如果为false则为时间(默认为false)
    
-   **「anim.goToAndPlay(value, isFrame)」**  跳到某个时刻并播放，第一个参数是数值，如果第二个参数为true，则第一个参数为帧，如果为false则为时间(默认为false)
    
-   **「anim.setDirection(direction)」**：设置方向 (1 为正常.)
    
-   **「anim.playSegments(segments, forceFlag)」**：第一个参数是单个数组或多个数组，每个数组有两个值(fromFrame,toFrame)，第二个参数是一个布尔值，用于立即强制执行
    
-   **「anim.setSubframe(flag)」**：如果为 false，它将尊重原始 AE fps。如果为 true，它将尽可能多地更新。(默认值为true)
    
-   **「anim.destroy()」**：销毁动画实例
    

## Lottie 中常用的方法

-   **「lottie.play()」**：通过 `name` 来指定运行的动画
    
-   **「lottie.stop()」**：通过 `name` 来指定停止的动画
    
-   **「lottie.setSpeed()」**：通过 `name` 来指定动画的速度
    
-   **「lottie.setDirection()」**：通过 `name` 来指定动画的方向
    
-   **「lottie.searchAnimations()」**：查找 class 为 “lottie” 的元素
    
-   **「lottie.loadAnimation()」**：加载动画并返回要单独控制的动画实例
    
-   **「lottie.destroy()」**：销毁和释放资源，DOM 元素将被清空。
    
-   **「lottie.registerAnimation()」**：你可以直接用 registerAnimation 注册一个元素。它必须有 “data-animation-path” 属性指向 data.json 的 url
    
-   **「lottie.setQuality()」**：默认 'high'，设置 'high','medium','low'，或一个数字 >1 .提高播放器表现。在一些动画中，低至2不会显示任何差异。
    

> ❝
> 
> name 为 lottie.loadAnimation() 方法中设置的 name
> 
> ❞

## Events

以下是可以直接使用 element.onXxxx 绑定的事件。

-   onComplete
    
-   onLoopComplete
    
-   onEnterFrame
    
-   onSegmentStart
    

你也可以使用 addEventListener 来处理以下事件:

-   complete：动画完成时触发
    
-   loopComplete：当 loop 为 true 时，每次加载完成时触发
    
-   enterFrame：每进入一帧就会触发，播放时每一帧都会触发一次
    
-   segmentStart：每开始进入一帧就会触发，播放时每一帧都会触发一次
    
-   config\_ready：config 初始化时触发
    
-   data\_ready：当动画的所有部分都加载完成时
    
-   DOMLoaded：当元素被添加到DOM中时
    
-   destroy：当动画被销毁时触发
    

## 封装基础组件

在 vue 中为了使用方便，可以封装为一个通用组件来使用。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;<span>template</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>component</span>&nbsp;<span data-darkreader-inline-color="">:is</span>=<span data-darkreader-inline-color="">"props.tag"</span>&nbsp;<span data-darkreader-inline-color="">ref</span>=<span data-darkreader-inline-color="">"container"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>slot</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>slot</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>component</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>template</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;<span>script</span>&gt;</span><span><br><span>import</span>&nbsp;lottie&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">"lottie-web"</span>;<br><span>import</span>&nbsp;{&nbsp;ref,&nbsp;onMounted,&nbsp;onUnmounted,&nbsp;shallowRef&nbsp;}&nbsp;<span>from</span>&nbsp;<span data-darkreader-inline-color="">'vue'</span><br><br><span data-darkreader-inline-color="">//&nbsp;默认配置</span><br><span>const</span>&nbsp;defaultConfig&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>renderer</span>:&nbsp;<span data-darkreader-inline-color="">"svg"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>loop</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>autoplay</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>};<br><br><span>const</span>&nbsp;props&nbsp;=&nbsp;defineProps({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>tag</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">String</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>default</span>:&nbsp;<span data-darkreader-inline-color="">"div"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>options</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">Object</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>default</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;({}),<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>})<br><br><span>const</span>&nbsp;container&nbsp;=&nbsp;ref(<span data-darkreader-inline-color="">null</span>)<br><span>const</span>&nbsp;instance&nbsp;=&nbsp;shallowRef(<span data-darkreader-inline-color="">null</span>)<br><br><span data-darkreader-inline-color="">//&nbsp;处理配置&nbsp;animationData&nbsp;字段中&nbsp;assets&nbsp;部分的图片路径</span><br><span data-darkreader-inline-color="">//&nbsp;把&nbsp;动画需要的图片资源，放到&nbsp;public&nbsp;目录下的&nbsp;lotties目录下</span><br><span data-darkreader-inline-color="">//&nbsp;每个动画资源都在&nbsp;lotties&nbsp;下新建一个目录去存放</span><br><span>const</span>&nbsp;parseAssets&nbsp;=&nbsp;<span>(<span>assets</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;assetsBaseURL&nbsp;=&nbsp;process.env.VUE_APP_ROUTE_BASE_URL&nbsp;+&nbsp;<span data-darkreader-inline-color="">'/lotties'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;assets.map(<span><span>item</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...item,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>u</span>:&nbsp;assetsBaseURL&nbsp;+&nbsp;item.u,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br><br><span>const</span>&nbsp;init&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;配置</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;conf&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...defaultConfig,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...props.options,<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;assets&nbsp;=&nbsp;parseAssets(conf.animationData.assets&nbsp;||&nbsp;[]);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>(conf.animationData)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conf.animationData&nbsp;=&nbsp;{&nbsp;...conf.animationData,&nbsp;assets&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;instance.value&nbsp;=&nbsp;lottie.loadAnimation({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>container</span>:&nbsp;container.value,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...conf,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br><br>onMounted(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;init();<br>})<br><br>onUnmounted(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(instance.value&nbsp;&amp;&amp;&nbsp;instance.value.destroy)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance.value.destroy();<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>})<br></span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br></code>
```

## 参考

Web (airbnb.io)