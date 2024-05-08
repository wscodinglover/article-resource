js中媒体查询的主要方法是使用window对象下的`matchMedia`对象，查询语句和CSS媒体查询一样。

### 封装媒体查询

首先我们先看监听系统主题色的例子

-   首先创建媒体查询对象
    
-   根据查询结果设置对应的值
    
-   然后建立监听事件，并且在退出时取消监听
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useTheme&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;首先创建媒体查询对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;themeMedia&nbsp;=&nbsp;matchMedia(<span data-darkreader-inline-color="">"(prefers-color-scheme:&nbsp;light)"</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据查询结果设置对应的值</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;theme&nbsp;=&nbsp;ref(themeMedia.matches&nbsp;?&nbsp;<span data-darkreader-inline-color="">'light'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'dark'</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onChange&nbsp;=&nbsp;<span>(<span>e:&nbsp;MediaQueryListEvent</span>)&nbsp;=&gt;</span>&nbsp;theme.value&nbsp;=&nbsp;e.matches&nbsp;?&nbsp;<span data-darkreader-inline-color="">'light'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'dark'</span><br>&nbsp;&nbsp;<br>&nbsp;&nbsp;watchEffect(<span>(<span>onCleanup</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;然后建立监听事件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;themeMedia.addEventListener(<span data-darkreader-inline-color="">'change'</span>,&nbsp;onChange)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;并且在退出时取消监听</span><br>&nbsp;&nbsp;&nbsp;&nbsp;onCleanup(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;themeMedia.removeEventListener(<span data-darkreader-inline-color="">'change'</span>,&nbsp;onChange))<br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;theme;<br>}<br></code>
```

我们测试下

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;theme&nbsp;=&nbsp;useTheme()<br><br>watchEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(theme.value,&nbsp;<span data-darkreader-inline-color="">'theme'</span>))<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果我们其他查询查询，我们需要重新设置新的值，所以，接下来我们封装一个更通用的媒体查询hook，如下，

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useMatchMedia&nbsp;=&nbsp;<span>(<span>query:&nbsp;string</span>)&nbsp;=&gt;</span>&nbsp;{<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;themeMedia&nbsp;=&nbsp;matchMedia(query)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;match&nbsp;=&nbsp;ref(themeMedia.matches)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onChange&nbsp;=&nbsp;<span>(<span>e:&nbsp;MediaQueryListEvent</span>)&nbsp;=&gt;</span>&nbsp;match.value&nbsp;=&nbsp;e.matches<br><br>&nbsp;&nbsp;watchEffect(<span>(<span>onCleanup</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;themeMedia.addEventListener(<span data-darkreader-inline-color="">'change'</span>,&nbsp;onChange)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;onCleanup(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;themeMedia.removeEventListener(<span data-darkreader-inline-color="">'change'</span>,&nbsp;onChange))<br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;match<br>}<br></code>
```

这个例子里，我们不再对特定的媒体查询值做处理，同时，我们将查询语句作为动态变量，将结果处理交给开发者。

我们使用通用的hook重写监听系统主题色的hook，如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useTheme&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;theme&nbsp;=&nbsp;useMatchMedia(<span data-darkreader-inline-color="">"(prefers-color-scheme:&nbsp;light)"</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;theme&nbsp;=&nbsp;ref(themeMedia.matches&nbsp;?&nbsp;<span data-darkreader-inline-color="">'light'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'dark'</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;theme&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">'light'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'dark'</span><br>}<br></code>
```

是不是这样更简洁了。

### 封装事件监听

接下来，我们再看第二个简单的例子，监听网络状态。

监听网络状态，主要通过监听`navigator.onLine`的变化，值的变化可以通过addEventListener方法，

有了封装媒体查询的例子，我们首先会想到封装事件监听的值的变化可以通过addEventListener方法，成为一个通用的钩子函数。如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useEventListener&nbsp;=&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">K</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">keyof</span>&nbsp;<span data-darkreader-inline-color="">WindowEventMap</span>&gt;</span>(<br>&nbsp;&nbsp;target:&nbsp;K,<br>&nbsp;&nbsp;listener:&nbsp;(ev:&nbsp;WindowEventMap[K])&nbsp;=&gt;&nbsp;any<br>)&nbsp;=&gt;&nbsp;{<br><br>&nbsp;&nbsp;watchEffect((onCleanup)&nbsp;=&gt;&nbsp;{<br><br>&nbsp;&nbsp;&nbsp;&nbsp;addEventListener(target,&nbsp;listener)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;onCleanup(()&nbsp;=&gt;&nbsp;removeEventListener(target,&nbsp;listener))<br>&nbsp;&nbsp;})<br>}<br></span></code>
```

此时，我们就可以这样封装监听网络状态的hook了

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useNetWork&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isOnLine&nbsp;=&nbsp;ref(navigator.onLine)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;setOnLine&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;isOnLine.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;setOffLine&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;isOnLine.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span><br><br>&nbsp;&nbsp;useEventListener(<span data-darkreader-inline-color="">'online'</span>,&nbsp;setOnLine)<br>&nbsp;&nbsp;useEventListener(<span data-darkreader-inline-color="">'offline'</span>,&nbsp;setOffLine)<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;isOnLine<br>}<br></code>
```

我们测试下

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;isOnLine&nbsp;=&nbsp;useNetWork()<br><br>watchEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(isOnLine.value,&nbsp;<span data-darkreader-inline-color="">'isOnLine'</span>))<br><br>&lt;h1&nbsp;v-<span data-darkreader-inline-color="">if</span>=<span data-darkreader-inline-color="">"isOnLine"</span>&gt;onLine&lt;<span data-darkreader-inline-color="">/h1&gt;<br>&lt;h1&nbsp;v-else&gt;offLine&lt;/</span>h1&gt;<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)接下来我们测试下其他的监听事件，比如监听scroll事件。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">useEventListener(<span data-darkreader-inline-color="">'scroll'</span>,&nbsp;()&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'scroll'</span>))<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

scroll.gif

功能是正常的，但是顺理成章，我们还需要写一个防抖函数

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;debounce&nbsp;=&nbsp;(<br>&nbsp;&nbsp;fn:&nbsp;<span>(<span>...args:&nbsp;any[]</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">void</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">delay</span>:&nbsp;number<br>)&nbsp;=&gt;&nbsp;{<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;timer:&nbsp;NodeJS.Timeout<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;&nbsp;<span>(<span>...args:&nbsp;any[]</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(timer)&nbsp;clearTimeout(timer)<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;timer&nbsp;=&nbsp;setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn.apply(<span data-darkreader-inline-color="">this</span>,&nbsp;args)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;delay)<br>&nbsp;&nbsp;}<br>}<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">useEventListener(<span data-darkreader-inline-color="">'scroll'</span>,&nbsp;debounce(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'scroll'</span>),&nbsp;<span data-darkreader-inline-color="">200</span>))<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

scroll2.gif

好了今天的分享到这了，如果文章中有纰漏的地方欢迎指正，我及时修改，感谢你的阅读

觉得文章还不错点个赞再走吧，十分感谢