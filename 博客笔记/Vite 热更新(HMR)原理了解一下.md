> ❝
> 
> 幸福的三大要素是：有要做的事（something to do）、有要爱的人（someone to love）、有寄予希望的东西（something to hope for）
> 
> ❞

前言  

用过`Vite`进行项目开发的同学，肯定听说过，`Vite`在开发环境和生产环境是两种不同的资源处理方式。

在开发环境，`Vite`以[原生ESM](https://mp.weixin.qq.com/s?__biz=Mzg3NjU2OTE1Mw==&mid=2247488468&idx=1&sn=dc38787b741856708e4e984a32b2733a&scene=21#wechat_redirect)方式提供源码，让浏览器接管了打包程序的部分工作：`Vite` 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaLRfeEbCibyicMqQGoZaZZrokzPEU1xTBJZ9HWL0iakKaWBM0TlLF2Zc6g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

而在本地开发中，肯定会有本地代码的变更处理，如何最大限度的在不刷新整体页面的情况下，进行代码的替换呢。这就用到HMR<sup>[1]</sup>这一特性。而承载`HMR`的部分就是，我们需要在开发阶段启动一个`Dev Server`。体现在代码中就是我们在`Vite`的配置文件- `vite.config.ts`中会有一个单独的字段 - `server`,更详细的解释可以参看vite\_开发服务器选项<sup>[2]</sup>

> ❝
> 
> `HMR` 允许我们在不刷新页面的情况下更新代码，比如编辑组件标记或调整样式，这些更改会立即反映在浏览器中，从而实现更快的代码交互和更好的开发体验。
> 
> ❞

在生产环境中，`Vite`利用`Rollup`对代码进行打包处理，并配合着`tree-shaking`/懒加载和`chunk`分割的方式为浏览器提供最后的代码资源。体现在代码中就是我们在`Vite`的配置文件- `vite.config.ts`中会有一个单独的字段 - `build`,更详细的解释可以参看vite\_构建选项<sup>[3]</sup>

我们在之前的[浅聊Vite](https://mp.weixin.qq.com/s?__biz=Mzg3NjU2OTE1Mw==&mid=2247488826&idx=1&sn=26eaf7f17620b13acdbf8130b69929f2&scene=21#wechat_redirect)中介绍过了，`Vite`内部打包流程。

![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaJ0f4souDPauSIpgq7hOMRGUoibdDmWbXMmGhKDDFYyGHjT66iaJtoNicg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> ❝
> 
> 而今天我们来讲讲，在开发环境中，`Vite`是如何实现`HMR`的。
> 
> ❞

当然，针对不同的打包工具，可能有自己的实现原理。如果大家对其他工具的`HMR`感兴趣。可以从下方链接中自行探索。

1.  webpack-hrm<sup>[4]</sup>
    
2.  rollup-plugin-hot<sup>[5]</sup>
    

当然，我们下面的内容，尽量从代码的顶层设计去探索，如果大家想看`Vite -HMR`的具体实现可以找到对应的部分，自行探索。

1.  /@vite/client 源码<sup>[6]</sup> 下文会有对应介绍
    
2.  vite\_hmr的核心部分<sup>[7]</sup>
    
3.  vite\_hmr传播<sup>[8]</sup> 下文会有对应介绍
    

好了，天不早了，干点正事哇。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaN3AlbbwkAqOyChAArwv8wdyKJfoQNcRpeUwibN2fK62D6r1ibibTEY6NQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

### 我们能所学到的知识点

> ❝
> 
> 1.  模块替换
>     
> 2.  HMR何时发生
>     
> 3.  HMR 客户端
>     
> 
> ❞

___

## 1\. 模块替换

> ❝
> 
> `模块替换`的基本原理是，在应用程序**「运行时动态替换模块」**。
> 
> ❞

大多数打包工具使用 `ECMAScript` 模块（`ESM`）作为模块，因为它**「更容易分析导入和导出」**，这有助于确定一个模块的替换会如何影响其他相关模块。关于`ESM`的介绍，可以看我们之前的文章~[你真的了解ESM吗？](https://mp.weixin.qq.com/s?__biz=Mzg3NjU2OTE1Mw==&mid=2247488468&idx=1&sn=dc38787b741856708e4e984a32b2733a&scene=21#wechat_redirect)

一个模块通常可以访问 `HMR API`，以处理`旧模块删除`和`新模块新增`的情况。在 `Vite` 中，我们可以使用以下 API：

-   import.meta.hot.accept()<sup>[9]</sup>
    
-   import.meta.hot.dispose()<sup>[10]</sup>
    
-   import.meta.hot.prune()<sup>[11]</sup>
    
-   import.meta.hot.invalidate()<sup>[12]</sup>
    

从更高层次上看，我们就可以得到如下的模块处理流程。

![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfadK1T2REdSOM2MZm1wnQbZL8vKlwOHAfwW35zJ19oCw09Qtl9u4MHOA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

还需要注意的是，我们需要使用这些 `API` 才能让 `HMR` 工作。例如，`Vite` 默认情况下会为 `CSS` 文件使用这些 `API`，但对于像 `Vue` 这样的其他文件，我们可以使用一个 `Vite` 插件来使用这些 `HMR API`。或者根据需要手动处理。否则，对文件的更新将导致默认情况下进行完整页面重新加载。

针对不同的语言环境，也是需要对应的插件进行这些api的调用处理。下面列举几个比较场景的插件实现

1.  `React`: Fast Refresh<sup>[13]</sup>和@vitejs/plugin-react<sup>[14]</sup>
    
2.  `Vue`: @vue/runtime-core<sup>[15]</sup> 和 @vitejs/plugin-vue<sup>[16]</sup>
    
3.  `Svelte`:svelte-hmr<sup>[17]</sup>和@vitejs/plugin-svelte<sup>[18]</sup>
    

> ❝
> 
> 在`Vite`官网中，有这样的介绍，![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaCHY2wYuhcWgLM9hxKSFZuVpZia9oQ98HwChpvwg6iaP2Ktw3Nh7qrXlg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)而`handleHotUpdate`用于处理`HRM更新`。![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaD2xUEIjicoIrWOQoOgQ7wFoHsQVTa9giclQV2w5yN0ZU9W8Xkja6B61w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)我们从`vite-vue`中就可以看到对应的处理过程。![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfaicuMHW00qLENRywQI56SN1wRrWRWbKyxRPRicic2pqUPpSQbhmK1CTOmQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
> 
> ❞

上面是写插件需要注意的地方，而我们继续深入`vite`中`HRM`的对应API的工作原理。

___

## accept()

```
<span></span><code><span>import</span>.meta.hot.accept()<br></code>
```

当我们使用 `import.meta.hot.accept()` 添加一个回调时，该回调将负责**「用新模块替换旧模块」**。使用此 API 的模块也称为 `已接受模块`。

> ❝
> 
> `已接受模块`创建了一个 `HMR 边界`。一个 `HMR 边界`包含模块本身以及所有递归导入的模块。`接受模块`通常也是 `HMR 边界`的 `根`，因为边界通常是**「图形结构」**。
> 
> ❞

![Image](https://mmbiz.qpic.cn/mmbiz_png/rv5jxwmzMCUoZiaszcbRwUphxzr4csjfahZIg4bz2EicAVOeiaULgP7UTHbdKOknQWlrj8zL2ZcucHTpZrcJGMxgQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

`已接受模块`也可以根据 `HMR回调`的位置缩小范围，如果`accept`中只接受一个回调，此时模块被称为 `自接受模块`。

`import.meta.hot.accept` 有两种函数签名：

-   `import.meta.hot.accept(cb: Function)` - 接受来自自身的更改
    
-   `import.meta.hot.accept(deps: string | string[], cb: Function)` - 接受来自导入的模块的更改
    

如果使用第一种签名，就是`自接受模块`。

### 自接受模块

```
<span></span><code><span>export</span>&nbsp;<span>let</span>&nbsp;data&nbsp;=&nbsp;[<span>1</span>,&nbsp;<span>2</span>,&nbsp;<span>3</span>]<br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept(<span>(<span>newModule</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;用新值替换旧值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;data&nbsp;=&nbsp;newModule.data<br>&nbsp;&nbsp;})<br>}<br></code>
```

### 已接受模块

```
<span></span><code><span>import</span>&nbsp;{&nbsp;value&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'./stuff.js'</span><br><br><span>document</span>.querySelector(<span>'#value'</span>).textContent&nbsp;=&nbsp;value<br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept([<span>'./stuff.js'</span>],&nbsp;([newModule])&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;用新值重新渲染</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>document</span>.querySelector(<span>'#value'</span>).textContent&nbsp;=&nbsp;newModule.value<br>&nbsp;&nbsp;})<br>}<br></code>
```

## dispose()

```
<span></span><code><span>import</span>.meta.hot.dispose()<br></code>
```

当一个`已接受模块`被`替换为新模块`，或者`被移除时`，我们可以使用 `import.meta.hot.dispose()` 进行清理。这允许我们清理掉旧模块创建的`任何副作用`，例如`删除事件监听器`、`清除计时器`或`重置状态`。

```
<span></span><code>globalThis.__my_lib_data__&nbsp;=&nbsp;{}<br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.dispose(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;重置全局状态</span><br>&nbsp;&nbsp;&nbsp;&nbsp;globalThis.__my_lib_data__&nbsp;=&nbsp;{}<br>&nbsp;&nbsp;})<br>}<br></code>
```

## prune()

```
<span></span><code><span>import</span>.meta.hot.prune()<br></code>
```

当一个模块要从运行时**「完全移除时」**，例如一个文件被删除，我们可以使用 `import.meta.hot.prune()` 进行**「最终清理」**。这类似于 `import.meta.hot.dispose()`，但只在模块被移除时调用一次。

`Vite` 通过`导入分析阶段`来进行模块清理，因为我们能够知道**「一个模块不再被使用的唯一时机是当它不再被任何模块导入」**。

以下是 `Vite` 使用该 API 处理 `CSS HMR` 的示例：

```
<span></span><code><span>//&nbsp;导入用于更新/移除&nbsp;HTML&nbsp;中样式标签的工具</span><br><span>import</span>&nbsp;{&nbsp;updateStyle,&nbsp;removeStyle&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'/@vite/client'</span><br><br>updateStyle(<span>'/src/style.css'</span>,&nbsp;<span>'body&nbsp;{&nbsp;color:&nbsp;red;&nbsp;}'</span>)<br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>//&nbsp;空的回调表示我们接受了这个模块，但是我们可以啥都不做</span><br>&nbsp;&nbsp;<span>//&nbsp;`updateStyle`&nbsp;将自动删除旧的样式标签。</span><br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept()<br>&nbsp;&nbsp;<span>//&nbsp;当模块不再被使用时，移除样式</span><br>&nbsp;&nbsp;<span>import</span>.meta.hot.prune(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;removeStyle(<span>'/src/style.css'</span>)<br>&nbsp;&nbsp;})<br>}<br></code>
```

## invalidate()

```
<span></span><code><span>import</span>.meta.hot.invalidate()<br></code>
```

与上述 API 不同，`import.meta.hot.invalidate()` 是一个**「操作」**，而不是一个生命周期钩子。我们通常会在 `import.meta.hot.accept` 中使用它，在运行时可能会意识到模块无法安全更新时，我们需要退出。

当调用这个方法时，`Vite服务器`将被告知**「该模块已失效」**，就像该模块已被更新一样。`HMR传播`将再次执行，以确定其导入者是否可以递归地接受此更改。

```
<span></span><code><span>export</span>&nbsp;<span>let</span>&nbsp;data&nbsp;=&nbsp;[<span>1</span>,&nbsp;<span>2</span>,&nbsp;<span>3</span>]<br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept(<span>(<span>newModule</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;如果&nbsp;`data`&nbsp;导出被删除或重命名</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(!(data&nbsp;<span>in</span>&nbsp;newModule))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;退出并使模块失效</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>import</span>.meta.hot.invalidate()<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>}<br></code>
```

上述就是针对涉及到`HRM`的相关API的简单介绍。更具体的解释，可以参考vite\_hmr<sup>[19]</sup>

___

## 2\. HMR何时发生

既然，`HMR API`赋予了我们`替换`和`删除`模块的能力，光有能力是不行的，我们需要了解它们何时才会起作用。其实，`HMR` 通常发生在**「编辑文件之后」**，但是之后又发生了啥，我们不得而知，这就是我们这节需要了解的内容。

它的总体流程如下：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

让我们来逐步揭开它神秘的面纱！

## 编辑文件

当我们编辑文件并保存时，`HMR` 就开始了。文件系统监视器（例如 chokidar<sup>[20]</sup>）会检测到更改并将编辑后的**「文件路径」**传递到下一步。

## 处理编辑后的模块

`Vite 开发服务器`得知了编辑后的文件路径。然后**「使用文件路径来找到模块图中相关的模块」**。

> ❝
> 
> `文件`和`模块`是两个不同的概念，一个文件可能对应一个或多个模块。  
> 例如，一个 `Vue` 文件可以编译成一个 `JavaScript模块`和一个相关的 `CSS模块`。
> 
> ❞

然后，这些模块被传递给 `Vite 插件`的 `handleHotUpdate()` 钩子进行进一步处理。它们可以选择`过滤`或`扩展`模块数组。最终的模块将传递到下一步。

### 过滤模块数组

在上一节介绍`HMR API`时，就介绍过`handleHotUpdate`,为了节省时间，我们再次将其搬过来。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span></span><code><span><span>function</span>&nbsp;<span>vuePlugin</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>'vue'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;handleHotUpdate(ctx)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(ctx.file.endsWith(<span>'.vue'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;oldContent&nbsp;=&nbsp;cache.get(ctx.file)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;newContent&nbsp;=&nbsp;<span>await</span>&nbsp;ctx.read()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;如果编辑文件时只有样式发生了变化，我们可以过滤掉 JS 模块，并仅触发 CSS 模块的 HMR。</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(isOnlyStyleChanged(oldContent,&nbsp;newContent))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;ctx.modules.filter(<span><span>m</span>&nbsp;=&gt;</span>&nbsp;m.url.endsWith(<span>'.css'</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

上面只是一个简单示例，像我们比较熟悉的`vite-vue`其实处理`HMR`的逻辑差不多，只不过新增了一些额外的校验和处理。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更详细的代码是可以实现，可以参考github\_vite-plugin-vue<sup>[21]</sup>

### 扩展模块数组

```
<span></span><code><br><span><span>function</span>&nbsp;<span>globalCssPlugin</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>'global-css'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;handleHotUpdate(ctx)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(ctx.file.endsWith(<span>'.css'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;如果编辑了 CSS 文件，我们还会触发此特殊的&nbsp;`virtual:global-css`&nbsp;模块的 HMR，该模块需要重新转换。</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;mod&nbsp;=&nbsp;ctx.server.moduleGraph.getModuleById(<span>'virtual:global-css'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(mod)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;ctx.modules.concat(mod)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

___

## 模块失效

在 `HMR传播`之前，我们需要将最终更新的模块数组及其导入者`递归失效`。每个模块的**「转换代码都将被移除，并附加一个失效时间戳」**。时间戳将用于在客户端的下一个请求中获取新模块。

## HMR 传播

现在，最终的更新模块数组将通过 `HMR 传播`。这是`HMR`是否起作用的核心步骤，如果传播过程有数据丢失，那么`HMR`就会达不到我们想要的预期，也就是部分模块没及时更新或者更新失败了。

> ❝
> 
> `HMR 传播`就是以`更新的模块`作为起点，向四周扩散，最后找到与该模块相关的模块信息，并且形成一个**「无形」**的环。或者给它起一个更高大上的名字 - `HMR 边界`
> 
> -   如果所有更新的模块都在一个边界内，`Vite 开发服务器`将通知 `HMR 客户端`通知接受的模块执行 `HMR`。
>     
> -   如果有些模块不在边界内，则会触发完整的页面重新加载。
>     
> 
> ❞

### 案例分析

为了更好地理解它是如何工作的，让我们来看几个例子。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

1.  `app.jsx` 是一个`接受模块`，也就意味着，在其内部触发了`import.meta.hot.accept()`
    
2.  与`app.jsx`相关的文件有`stuff.js`和`utils.js`，也就意味着，它们三个会形成一个`HMR 边界`
    

#### 情况 1

如果更新 `stuff.js`，传播将**「递归查找」**其导入者以找到一个`接受的模块`。在这种情况下，我们将发现 `app.jsx` 是一个接受的模块。但在结束传播之前，我们需要确定 `app.jsx` 是否可以接受来自 `stuff.js` 的更改。这取决于 `import.meta.hot.accept()` 的调用方式。

-   情况 1（a）:如果 `app.jsx` 是`自接受`的，或者它接受来自 `stuff.js` 的更改，我们可以在这里停止传播，因为没有其他来自 `stuff.js` 的导入者。然后，`HMR 客户端`将通知 `app.jsx` 执行 `HMR`。
    
-   情况 1（b）:如果 `app.jsx` 不接受这个更改，我们将继续向上传播以找到一个接受的模块。但由于没有其他接受的模块，我们将到达项目的**「根节点」** - `index.html` 文件。此时将触发整个项目的重新加载。
    

#### 情况 2：

如果更新 `main.js` 或 `other.js`，传播将再次递归查找其**「导入者」**。然而，没有接受的模块，我们将到达项目的**「根节点」** - `index.html` 文件。因此，将触发完整的页面重新加载。

#### 情况 3：

如果更新 `app.jsx`，我们立即发现它是一个接受的模块。然而，一些模块可能无法更新其自身的更改。我们可以通过检查它们是否是自接受的模块来确定它们是否可以更新自身。

-   情况 3（a）：如果 `app.jsx` 是自接受的，我们可以在这里停止，并让 `HMR 客户端`通知它执行 HMR。
    
-   情况 3（b）：如果 `app.jsx`不是自接受的，我们将继续向上传播以找到一个接受的模块。但由于它们都没有，我们将到达项目的**「根节点」** - `index.html` 文件，将触发完整的页面重新加载。
    

#### 情况 4：

如果更新 `utils.js`，传播将再次递归查找其导入者。首先，我们将找到 `app.jsx` 作为接受的模块，并在那里停止传播（例如`情况 1（a）`）。然后，我们也会递归查找 `other.js` 及其导入者，但没有接受的模块，我们将到达项目的**「根节点」** - `index.html` 文件。

> ❝
> 
> 最后，`HMR传播`的结果是是否需要进行完整页面重新加载，或者是否应该在客户端应用 HMR 更新。
> 
> ❞

___

## 3\. HMR 客户端

在 `Vite` 应用中，我们可能会注意到 `HTML` 中添加了一个特殊的脚本`<script type="module" src="/@vite/client"></script>`，请求 `/@vite/client`。这个脚本包含了 `HMR 客户端`！

我们可以在`Chrome-devtool-sources`中进行查看

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> ❝
> 
> `HMR 客户端`负责：
> 
> 1.  与 `Vite 开发服务器`建立 `WebSocket` 连接。
>     
> 2.  监听来自服务器的 `HMR 载荷`。
>     
> 3.  在运行时提供和触发 `HMR API`。
>     
> 4.  将任何事件发送回 `Vite 开发服务器`。
>     
> 
> ❞

从更广泛的角度来看，`HMR 客户端`帮助将 `Vite 开发服务器`和 `HMR API` 粘合在一起。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 客户端初始化

在 `HMR 客户端`能够从 `Vite 开发服务器`接收任何消息之前，它首先需要建立与其的连接，通常是通过 WebSockets<sup>[22]</sup>。

下面是一个设置 `WebSocket` 连接并处理 `HMR 传播`结果的示例：

### /@vite/client

```
<span></span><code><span>const</span>&nbsp;ws&nbsp;=&nbsp;<span>new</span>&nbsp;WebSocket(<span>'ws://localhost:5173'</span>)<br><br>ws.addEventListener(<span>'message'</span>,&nbsp;({&nbsp;data&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;payload&nbsp;=&nbsp;<span>JSON</span>.parse(data)<br>&nbsp;&nbsp;<span>switch</span>&nbsp;(payload.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'...'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;处理载荷...</span><br>&nbsp;&nbsp;}<br>})<br><br><span>//&nbsp;将任何事件发送回&nbsp;Vite&nbsp;开发服务器</span><br>ws.send(<span>'...'</span>)<br></code>
```

除此之外，`HMR 客户端`还初始化了一些处理 `HMR` 所需的状态，并导出了几个 API，例如 `createHotContext()`，供使用 `HMR API` 的模块使用。例如：

### app.jsx

```
<span></span><code><span>//&nbsp;由&nbsp;Vite&nbsp;的导入分析插件注入</span><br><span>import</span>&nbsp;{&nbsp;createHotContext&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'/@vite/client'</span><br><span>import</span>.meta.hot&nbsp;=&nbsp;createHotContext(<span>'/src/app.jsx'</span>)<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span>App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>&lt;<span>div</span>&gt;</span>Hello&nbsp;Front789<span>&lt;/<span>div</span>&gt;</span></span><br>}<br><br><span>//&nbsp;由&nbsp;`@vitejs/plugin-react`&nbsp;注入</span><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>//&nbsp;...</span><br>}<br></code>
```

传递给 `createHotContext()` 的 URL 字符串（也称为 `owner 路径`）有助于**「标识哪个模块能够接受更改」**。在`createHotContext` 将注册的 HMR 回调分配单例类型，而该类型用于存储`owner 路径`到接受回调、处理回调和修剪回调之间的关联信息。`const ownerPathToAcceptCallbacks = new Map<string, Function[]>()`

这基本上就是模块如何与 HMR 客户端交互并执行 HMR 更改的方式。

## 处理来自服务器的信息

建立 `WebSocket` 连接后，我们可以开始处理来自 `Vite 开发服务器`的信息。

### /@vite/client

```
<span></span><code>ws.addEventListener(<span>'message'</span>,&nbsp;({&nbsp;data&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;payload&nbsp;=&nbsp;<span>JSON</span>.parse(data)<br>&nbsp;&nbsp;<span>switch</span>&nbsp;(payload.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'full-reload'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;location.reload()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'update'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;updates&nbsp;=&nbsp;payload.updates<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;=&gt;&nbsp;{&nbsp;type:&nbsp;string,&nbsp;path:&nbsp;string,&nbsp;acceptedPath:&nbsp;string,&nbsp;timestamp:&nbsp;number&nbsp;}[]</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;update&nbsp;<span>of</span>&nbsp;updates)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handleUpdate(update)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'prune'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handlePrune(payload.paths)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>break</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;处理其他载荷类型...</span><br>&nbsp;&nbsp;}<br>})<br></code>
```

上面的示例处理了 `HMR 传播`的结果，根据 `full-reload` 和 `update` 信息类型触发完整页面重新加载或 `HMR 更新`。当模块不再使用时，它还处理修剪。

还有更多类型的信息类型需要处理

-   `connected`：当建立 `WebSocket` 连接时发送。
    
-   `error`：当服务器端出现错误时发送，`Vite` 可以在浏览器中显示错误覆盖层。
    
-   `custom`：由 `Vite` 插件发送，通知客户端任何事件。对于客户端和服务器之间的通信非常有用。
    

接下来，让我们看看 `HMR 更新`实际上是如何工作的。

## HMR 更新

> ❝
> 
> `HMR 传播`期间找到的每个 `HMR 边界`通常对应一个 `HMR 更新`。
> 
> ❞

在 `Vite` 中，更新采用这种签名：

```
<span></span><code><span>interface</span>&nbsp;Update&nbsp;{<br>&nbsp;&nbsp;<span>//&nbsp;更新的类型</span><br>&nbsp;&nbsp;<span>type</span>:&nbsp;<span>'js-update'</span>&nbsp;|&nbsp;<span>'css-update'</span><br>&nbsp;&nbsp;<span>//&nbsp;接受模块（HMR&nbsp;边界根）的&nbsp;URL&nbsp;路径</span><br>&nbsp;&nbsp;path:&nbsp;<span>string</span><br>&nbsp;&nbsp;<span>//&nbsp;被接受的&nbsp;URL&nbsp;路径（通常与上面的路径相同）</span><br>&nbsp;&nbsp;acceptedPath:&nbsp;<span>string</span><br>&nbsp;&nbsp;<span>//&nbsp;更新发生的时间戳</span><br>&nbsp;&nbsp;timestamp:&nbsp;<span>number</span><br>}<br></code>
```

在 `Vite` 中，它被区分为 `JS 更新` 或 `CSS 更新`，其中 `CSS 更新`被特别处理为在更新时简单地交换 `HTML` 中的链接标签。

对于 `JS 更新`，我们需要找到相应的模块，以调用其 `import.meta.hot.accept()` 回调，以便它可以对自身应用 HMR。由于在 `createHotContext()` 中我们已经**「将路径注册为第一个参数」**，因此我们可以通过更新的路径轻松找到匹配的模块。有了更新的时间戳，我们还可以获取模块的新版本以传递给 `import.meta.hot.accept()`。

下面是一个实现的示例：

## /@vite/client

```
<span></span><code><span>//&nbsp;由&nbsp;`createHotContext()`&nbsp;填充的映射</span><br><span>const</span>&nbsp;ownerPathToAcceptCallbacks&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;string,&nbsp;<span>Function</span>[]&gt;()<br><br><span>async</span>&nbsp;<span><span>function</span>&nbsp;<span>handleUpdate</span>(<span>update:&nbsp;Update</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;acceptCbs&nbsp;=&nbsp;ownerPathToAcceptCallbacks.get(update.path)<br>&nbsp;&nbsp;<span>const</span>&nbsp;newModule&nbsp;=&nbsp;<span>await</span>&nbsp;<span>import</span>(<span>`<span>${update.acceptedPath}</span>?t=<span>${update.timestamp}</span>`</span>)<br><br>&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;cb&nbsp;<span>of</span>&nbsp;acceptCbs)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cb(newModule)<br>&nbsp;&nbsp;}<br>}<br></code>
```

之前我们就介绍过，`import.meta.hot.accept()` 有两个函数签名

1.  `import.meta.hot.accept(cb: Function)`
    
2.  `import.meta.hot.accept(deps: string | string[], cb: Function)`
    

上面的实现对于第一个函数签名（`自接受模块`）的情况处理良好，但对于第二个函数签名则不适用。第二个函数签名的**「回调函数只有在依赖项发生更改时才需要被调用」**。为了解决这个问题，我们可以将每个回调函数绑定到一组依赖项。

### app.jsx

```
<span></span><code><span>import</span>&nbsp;{&nbsp;add&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'./utils.js'</span><br><span>import</span>&nbsp;{&nbsp;value&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'./stuff.js'</span><br><br><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept(...)<br>&nbsp;&nbsp;<span>//&nbsp;{&nbsp;deps:&nbsp;['/src/app.jsx'],&nbsp;fn:&nbsp;...&nbsp;}</span><br><br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept(<span>'./utils.js'</span>,&nbsp;...)<br>&nbsp;&nbsp;<span>//&nbsp;{&nbsp;deps:&nbsp;['/src/utils.js'],&nbsp;fn:&nbsp;...&nbsp;}</span><br><br>&nbsp;&nbsp;<span>import</span>.meta.hot.accept([<span>'./stuff.js'</span>],&nbsp;...)<br>&nbsp;&nbsp;<span>//&nbsp;{&nbsp;deps:&nbsp;['/src/stuff.js'],&nbsp;fn:&nbsp;...&nbsp;}</span><br>}<br></code>
```

然后，我们可以使用 `acceptedPath` 来匹配依赖关系并触发正确的回调函数。

例如，如果更新了 `stuff.js`，那么 `acceptedPath` 将是 `/src/stuff.js`，而 `path` 将是 `/src/app.jsx`。这样，我们可以通知`拥有者路径`接受路径（`acceptedPath`）已经更新，而拥有者可以处理其更改。我们可以调整 HMR 处理程序如下：

## /@vite/client

```
<span></span><code><span>//&nbsp;由&nbsp;`createHotContext()`&nbsp;填充的映射</span><br><span>const</span>&nbsp;ownerPathToAcceptCallbacks&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;<br>&nbsp;&nbsp;string,<br>&nbsp;&nbsp;{&nbsp;<span>deps</span>:&nbsp;string[];&nbsp;fn:&nbsp;<span>Function</span>&nbsp;}[]<br>&gt;()<br><br><span>async</span>&nbsp;<span><span>function</span>&nbsp;<span>handleUpdate</span>(<span>update:&nbsp;Update</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;acceptCbs&nbsp;=&nbsp;ownerPathToAcceptCallbacks.get(update.path)<br>&nbsp;&nbsp;<span>const</span>&nbsp;newModule&nbsp;=&nbsp;<span>await</span>&nbsp;<span>import</span>(<span>`<span>${update.acceptedPath}</span>?t=<span>${update.timestamp}</span>`</span>)<br><br>&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;cb&nbsp;<span>of</span>&nbsp;acceptCbs)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;确保只执行可以处理&nbsp;`acceptedPath`&nbsp;的回调函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(cb.deps.some(<span>(<span>deps</span>)&nbsp;=&gt;</span>&nbsp;deps.includes(update.acceptedPath)))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cb.fn(newModule)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

但我们还没有完成！在导入新模块之前，我们还需要确保正确处理旧模块，使用 `import.meta.hot.dispose()`。

## /@vite/client

```
<span></span><code><span>//&nbsp;由&nbsp;`createHotContext()`&nbsp;填充的映射</span><br><span>const</span>&nbsp;ownerPathToAcceptCallbacks&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;<br>&nbsp;&nbsp;string,<br>&nbsp;&nbsp;{&nbsp;<span>deps</span>:&nbsp;string[];&nbsp;fn:&nbsp;<span>Function</span>&nbsp;}[]<br>&gt;()<br><span>const</span>&nbsp;ownerPathToDisposeCallback&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;string,&nbsp;<span>Function</span>&gt;()<br><br><span>async</span>&nbsp;<span><span>function</span>&nbsp;<span>handleUpdate</span>(<span>update:&nbsp;Update</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;acceptCbs&nbsp;=&nbsp;ownerPathToAcceptCallbacks.get(update.path)<br><br>&nbsp;&nbsp;<span>//&nbsp;如果有的话调用&nbsp;dispose&nbsp;回调</span><br>&nbsp;&nbsp;ownerPathToDisposeCallbacks.get(update.path)?.()<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;newModule&nbsp;=&nbsp;<span>await</span>&nbsp;<span>import</span>(<span>`<span>${update.acceptedPath}</span>?t=<span>${update.timestamp}</span>`</span>)<br><br>&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;cb&nbsp;<span>of</span>&nbsp;acceptCbs)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;确保只执行可以处理&nbsp;`acceptedPath`&nbsp;的回调函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(cb.deps.some(<span>(<span>deps</span>)&nbsp;=&gt;</span>&nbsp;deps.includes(update.acceptedPath)))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cb.fn(newModule)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

上面的代码基本上实现了大部分的 `HMR 客户端`！

## HMR 修剪

我们之前聊过，在 `导入分析` 阶段，`Vite` 内部处理了 `HMR 修剪`。当一个模块不再被任何其他模块导入时，`Vite 开发服务器`将向 `HMR 客户端`发送一个 `{ type: 'prune', paths: string[] }` 载荷，其中它将独立地在运行时修剪模块。

### /@vite/client

```
<span></span><code><span>//&nbsp;由&nbsp;`createHotContext()`&nbsp;填充的映射</span><br><span>const</span>&nbsp;ownerPathToDisposeCallback&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;string,&nbsp;<span>Function</span>&gt;()<br><span>const</span>&nbsp;ownerPathToPruneCallback&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>&lt;string,&nbsp;<span>Function</span>&gt;()<br><br><span><span>function</span>&nbsp;<span>handlePrune</span>(<span>paths:&nbsp;string[]</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;p&nbsp;<span>of</span>&nbsp;paths)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ownerPathToDisposeCallbacks.get(p)?.()<br>&nbsp;&nbsp;&nbsp;&nbsp;ownerPathToPruneCallback.get(p)?.()<br>&nbsp;&nbsp;}<br>}<br></code>
```

## HMR 作废

与其他 `HMR API` 不同，`import.meta.hot.invalidate()` 是可以在 `import.meta.hot.accept()` 中调用的动作，以退出 `HMR`。在 `/@vite/client` 中，只需发送一个 `WebSocket` 消息到 `Vite 开发服务器`：

### /@vite/client

```
<span></span><code><span>//&nbsp;`ownerPath`&nbsp;来自于&nbsp;`createHotContext()`</span><br><span><span>function</span>&nbsp;<span>handleInvalidate</span>(<span>ownerPath:&nbsp;string</span>)&nbsp;</span>{<br>&nbsp;&nbsp;ws.send(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>JSON</span>.stringify({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span>'custom'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>event</span>:&nbsp;<span>'vite:invalidate'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>data</span>:&nbsp;{&nbsp;<span>path</span>:&nbsp;ownerPath&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;)<br>}<br></code>
```

当 `Vite 服务器`接收到此消息时，它将从其导入者再次执行 `HMR 传播`，结果（完整重新加载或 HMR 更新）将发送回 `HMR 客户端`。

## HMR 事件

虽然不是 `HMR` 必需的，但 `HMR 客户端`还可以在运行时发出事件，当收到特定信息时。`import.meta.hot.on` 和 `import.meta.hot.off` 可以用于监听和取消监听这些事件。

```
<span></span><code><span>if</span>&nbsp;(<span>import</span>.meta.hot)&nbsp;{<br>&nbsp;&nbsp;<span>import</span>.meta.hot.on(<span>'vite:invalidate'</span>,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;...</span><br>&nbsp;&nbsp;})<br>}<br></code>
```

发出和跟踪这些事件与上面处理 HMR 回调的方式非常相似。

### /@vite/client（URL）

```
<span></span><code><span>+&nbsp;const&nbsp;eventNameToCallbacks&nbsp;=&nbsp;new&nbsp;Map&lt;string,&nbsp;Set&lt;Function&gt;&gt;()</span><br><br>//&nbsp;`ownerPath`&nbsp;来自于&nbsp;`createHotContext()`<br>function&nbsp;handleInvalidate(ownerPath:&nbsp;string)&nbsp;{<br><span>+&nbsp;&nbsp;eventNameToCallbacks.get('vite:invalidate')?.forEach((cb)&nbsp;=&gt;&nbsp;cb())</span><br>&nbsp;&nbsp;ws.send(<br>&nbsp;&nbsp;&nbsp;&nbsp;JSON.stringify({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:&nbsp;'custom',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event:&nbsp;'vite:invalidate',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data:&nbsp;{&nbsp;path:&nbsp;ownerPath&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;)<br>}<br></code>
```

## HMR 数据

最后，`HMR 客户端`还提供了一种存储数据以在 HMR API 之间共享的方法，即 `import.meta.hot.data`。这些数据也可以传递给 `import.meta.hot.dispose()` 和 `import.meta.hot.prune()` 的 HMR 回调函数。

保留数据也与我们跟踪 HMR 回调的方式类似。

以 `HMR 修剪`代码为例：

### /@vite/client

```
<span></span><code>//&nbsp;由&nbsp;`createHotContext()`&nbsp;填充的映射<br>const&nbsp;ownerPathToDisposeCallback&nbsp;=&nbsp;new&nbsp;Map&lt;string,&nbsp;Function&gt;()<br>const&nbsp;ownerPathToPruneCallback&nbsp;=&nbsp;new&nbsp;Map&lt;string,&nbsp;Function&gt;()<br><span>+&nbsp;const&nbsp;ownerPathToData&nbsp;=&nbsp;new&nbsp;Map&lt;string,&nbsp;Record&lt;string,&nbsp;any&gt;&gt;()</span><br><br>function&nbsp;handlePrune(paths:&nbsp;string[])&nbsp;{<br>&nbsp;&nbsp;for&nbsp;(const&nbsp;p&nbsp;of&nbsp;paths)&nbsp;{<br><span>+&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;data&nbsp;=&nbsp;ownerPathToData.get(p)</span><br><span>+&nbsp;&nbsp;&nbsp;&nbsp;ownerPathToDisposeCallbacks.get(p)?.(data)</span><br><span>+&nbsp;&nbsp;&nbsp;&nbsp;ownerPathToPruneCallback.get(p)?.(data)</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

### Reference

\[1\]

HMR: https://www.youtube.com/watch?v=e5M\_5jKPaL4

\[2\]

vite\_开发服务器选项: https://cn.vitejs.dev/config/server-options.html

\[3\]

vite\_构建选项: https://cn.vitejs.dev/config/build-options.html

\[4\]

webpack-hrm: https://blog.nativescript.org/deep-dive-into-hot-module-replacement-with-webpack-part-one-the-basics/

\[5\]

rollup-plugin-hot: https://github.com/rixo/rollup-plugin-hot

\[6\]

/@vite/client 源码: https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts

\[7\]

vite\_hmr的核心部分: https://github.com/vitejs/vite/blob/main/packages/vite/src/shared/hmr.ts

\[8\]

vite\_hmr传播: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/hmr.ts

\[9\]

import.meta.hot.accept(): https://vitejs.dev/guide/api-hmr.html#hot-accept-cb

\[10\]

import.meta.hot.dispose(): https://vitejs.dev/guide/api-hmr.html#hot-dispose-cb

\[11\]

import.meta.hot.prune(): https://vitejs.dev/guide/api-hmr.html#hot-prune-cb

\[12\]

import.meta.hot.invalidate(): https://vitejs.dev/guide/api-hmr.html#hot-invalidate-message-string

\[13\]

Fast Refresh: https://github.com/facebook/react/tree/main/packages/react-refresh

\[14\]

@vitejs/plugin-react: https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/src/fast-refresh.ts

\[15\]

@vue/runtime-core: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/hmr.ts

\[16\]

@vitejs/plugin-vue: https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/src/main.ts

\[17\]

svelte-hmr: https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr

\[18\]

@vitejs/plugin-svelte: https://github.com/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/src/utils/compile.js

\[19\]

vite\_hmr: https://vitejs.dev/guide/api-hmr.html

\[20\]

chokidar: https://github.com/paulmillr/chokidar

\[21\]

github\_vite-plugin-vue: https://github.com/vitejs/vite-plugin-vue/blob/46d0baa45c9e7cf4cd3ed773af5ba9f2a503b446/packages/plugin-vue/src/index.ts#L156

\[22\]

WebSockets: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

奇舞团是 360 集团最大的大前端团队，非常重视人才培养，有工程师、讲师、翻译官、业务接口人、团队 Leader 等多种发展方向供员工选择，并辅以提供相应的技术力、专业力、通用力、领导力等培训课程。奇舞团以开放和求贤的心态欢迎各种优秀人才关注和加入奇舞团。