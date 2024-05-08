大厂技术  高级前端  Node进阶

点击上方 程序员成长指北，关注公众号

回复1，加入高级Node交流群

作者：晚安啦  
https://juejin.cn/post/7223325932357795895

React.js 目前是前端开发人员十分流行的 JavaScript 库。它由 Facebook 发明，但作为开源项目提供给世界各地的开发人员和企业使用。

React 真正改变了我们构建单页面应用程序的方式，其中最大的特点之一是函数组件的应用。Hooks 是19年推出的，使我们能够在处理状态时使用函数组件而不是基于类的组件。除了内置的 hooks 外，React 还提供了实现自定义 hooks 的方法。

这里是一些我最喜欢的自定义 hooks 实现，您也可以在自己的应用程序和项目中使用。

## 1\. useTimeout

使用这个hooks，我们可以使用声明式方法来实现setTimeout。首先，我们创建一个自定义hooks子，其中包含回调函数和延迟参数。然后，我们使用useRef hooks为回调函数创建一个引用。最后，我们两次使用useEffect，一次用于记住上次的回调函数，一次用于设置超时并清理。

以下是一个计时器的实现示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useEffect}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><span data-darkreader-inline-color="">const</span>&nbsp;useTimeout&nbsp;=&nbsp;<span>(<span>callback,delay</span>)=&gt;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;savedCallback=React.useRef();<br>&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;savedCallback.current=callback<br>&nbsp;&nbsp;},[callback]);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;tick=<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;savedCallback.current();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(delay!==<span data-darkreader-inline-color="">null</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;id=setTimeout(tick,delay);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>=&gt;</span>clearTimeout(id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},[delay])<br>}<br></code>
```

## 2\. useInterval

如果你想以声明性的方式实现setInterval，你可以使用名为useInterval的hooks。

首先，我们需要创建一个自定义hooks，接受一个回调函数和一个延迟时间作为参数。然后，我们使用useRef为回调函数创建一个ref。最后，我们使用useEffect来记住最新的回调函数，并设置和清除间隔。

该示例展示了自定义ResourceCounter的实现。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useRef,useEffect}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;useInterval&nbsp;=&nbsp;<span>(<span>callback,delay</span>)=&gt;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;savedCallback=React.useRef();<br>&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;savedCallback.current=callback<br>&nbsp;&nbsp;},[callback]);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;tick=<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;savedCallback.current();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(delay!==<span data-darkreader-inline-color="">null</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;id=setInterval(tick,delay);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>=&gt;</span>clearInterval(id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},[delay])<br>}<br></code>
```

## 3\. usePrevious

这是另一个可以在我们的应用程序中使用的很棒的自定义钩子。通过它，我们可以存储props或先前的状态。首先，我们创建一个接受值的自定义钩子。然后，我们使用useRef钩子为该值创建一个ref。最后，我们使用useEffect来记住最新的值。这个示例展示了一个计数器的实现。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useRef,useEffect}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;usePrevious=<span><span>value</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ref=useRef();<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ref.current=value<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[])<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;ref.current;<br>}<br></code>
```

## 4\. useClickInside

如果你需要处理包装组件内部的点击事件处理，那么useClickInside hooks就是适合你的选择。首先，我们创建一个自定义hooks，它接受一个ref和一个回调函数来处理点击事件。然后，我们使用useEffect来附加和清除点击事件。最后，我们使用useRef为需要被点击的组件创建一个ref，并将其传递给useClickInside hooks。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useEffect}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;useClickInside&nbsp;=&nbsp;<span>(<span>ref,callback</span>)=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;handleClick=<span><span>e</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(ref.current&amp;&amp;ref.current.contains(e.target)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;callback();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'click'</span>,handleClick);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.removeEventListener(<span data-darkreader-inline-color="">'click'</span>,handleClick);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[])<br>}<br></code>
```

## 5\. useClickOutside

useClickOutside hooks与useClickInside hooks非常相似，但它处理的是在包装组件外部的点击，而不是内部的点击。因此，我们再次创建一个自定义hooks，它接受一个ref和一个回调函数来处理点击事件。然后，我们使用useEffect来附加和清除点击事件。最后，我们使用useRef为组件创建一个ref，并将其传递给useClickOutside hooks。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useEffect}<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;useClickOutside&nbsp;=&nbsp;<span>(<span>ref,callback</span>)=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;handleClick=<span><span>e</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(ref.current&amp;&amp;!ref.current.contains(e.target)){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;callback();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;handleClick);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.removeEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;handleClick);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[])<br>}<br></code>
```

## 6\. 参考

> 8 Awesome React Hooks -- Simon Holdorf    
> https://link.juejin.cn/?target=https%3A%2F%2Fmedium.com%2Fbetter-programming%2F8-awesome-react-hooks-2cb31aed4f3d

**—— The  End ——**

### 

Node 社群  

```
<section mpa-from-tpl="t" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-tools="135编辑器" data-id="89226"><section mpa-from-tpl="t" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section><section mpa-from-tpl="t" data-style="margin-left: 10px; outline: 0px; border-top: 4px solid rgb(68, 68, 68); display: inline-block; width: 50px;" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section></section><p data-style="outline: 0px; color: rgb(34, 34, 34); letter-spacing: 0.544px; white-space: normal; font-family: system-ui, -apple-system, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;" data-darkmode-color="rgb(196, 196, 196)" data-darkmode-original-color="rgb(34, 34, 34)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-style="outline: 0px; color: rgb(63, 63, 63); font-variant-ligatures: common-ligatures; letter-spacing: 0.544px; text-align: left; font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; word-spacing: 0.8px;" data-darkreader-inline-outline="" data-darkreader-inline-color="">我组建了一个氛围特别好的 Node.js 社群，里面有很多 Node.js小伙伴，如果你对Node.js学习感兴趣的话（后续有计划也可以），我们可以一起进行Node.js相关的交流、学习、共建。下方加 考拉 好友回复「Node」即可。</span></p><p data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><img data-cropselx1="0" data-cropselx2="147" data-cropsely1="0" data-cropsely2="178" data-fileid="100016913" data-galleryid="" data-ratio="1.29073482428115" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwtUt8z7MwaX6yicG6weUJYZ4kDUq34gs35gHuAVHnxrwxSQgclB6MXAyUIogJvUrFgZA7CuuFjNeLA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" data-type="jpeg" data-w="626" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="" data-original-style="outline: 0px; border-style: none; border-radius: 8px; background-color: rgb(36, 36, 36); color: rgb(18, 18, 18); font-family: -apple-system, system-ui, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; display: initial; background-size: 16px !important; visibility: visible !important; width: 236.945px !important; --darkreader-inline-outline: initial; --darkreader-inline-bgcolor: #1b1d1e; --darkreader-inline-color: #dddad5;" data-index="2" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="236.945px" crossorigin="anonymous" alt="Image"></p><pre data-style="margin-bottom: 1rem; outline: 0px; font-family: SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; font-size: 1em; color: rgb(33, 37, 41); overflow: auto; letter-spacing: 0.544px;" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-color=""><p data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;</span><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;“分享、点赞</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">、</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">在看” 支持一下</span></span><span data-darkreader-inline-color=""></span></p></pre>
```