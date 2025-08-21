![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUL4msaxiaDqQ0NFOHfLfo7EJoPTUfQECe3WvpRFeawpjlgshTRmmibqhQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

说实话现在我很激动。

从 React Compiler 开源到现在我连续研究分析 React Compiler 已经四天时间了，这期间我积累了大量的使用心得，整体感受就是**它真的太强了！！！**

现在我迫不及待地想跟大家分享 React Compiler 的**深度使用体验**。

这篇文章我会结合三个实践案例为大家解读 React Compiler 到底强在哪，这可能会有一点难理解，不过道友们请放心，我会做好知识铺垫，尽量用更简单的方式来表达。内容梗概如下：

-   **如何查看编译之后的代码**
    
-   **`Symbol.for()` 基础介绍**
    
-   **实现原理详细分析**
    
-   **实践案例一：counter 递增**
    
-   **实践案例二：渲染成本昂贵的子组件**
    
-   **实践案例三：Tab 切换**
    
-   **强悍的性能表现：超细粒度缓存式/记忆化更新**
    
-   **项目开发中，最佳实践应该怎么做**
    

本文共 **7395** 字，阅读需要花费 14 分钟。

> ✓
> 
> 在[之前的文章中](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649869339&idx=1&sn=c245638ed9147cf37fe93e04fd576276&chksm=f3e59d88c492149ec71c38e875d1e05211edb6708065e28f2cac240a8182195a18d5456525c7&scene=21#wechat_redirect)，我已经跟大家分享了如何在项目中引入 React Compiler，本文就不再赘述。

> !
> 
> > 经过验证发现由于 React19 之前的版本内部不包含 compiler-runtime，因此无法正常使用，我猜测可能会在以后提供插件来支持编译老版本的项目。目前我是在 React 19 RC 版本中结合 Compiler。不过好消息是将项目升级到 React 19 难度并不高。许多三方库也已经积极的适配了 React 19

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUVM4Pia38vDmZwFtDO3nKTrsggmxNhiayjzOrKu2JaHCECYg5Ss88DNyg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 1

**如何查看编译之后的代码**

通常情况下，你只需要在合适的位置打印一个 log。然后我们就可以通过下图所示的位置，在 `console` 面板中，点击跳转到编译之后的代码。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUKKiaibqqaLzrRpL4ib4vPgUqcKpsYcwxzdGKJh1ZUnAJCMMWbBsjNjtWA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

当然，我们可以直接在 Sources 面板中查看。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUDeiaHZnw7s5zqLCbiaCJj00KKg0XWI1ibaefTtaI3FLt4Nt5Slldb6Xlg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

除此之外，你也可以把代码拷贝到 **React Compiler Playground**。这是一个在线的代码编译转换工具。我们可以利用这个工具方便的将代码转换成 Compiler 编译之后的代码，学习非常方便。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUvdesc6iacxKeMIQ26BHJHliaXiaNnCxxmvAKwMJQpoAPmjbibw9xjzdibSA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

React Compiler Playground 的在线地址如下。除此之外，如果你存在任何疑问，完整的链接可以包含你的具体案例，在沟通和交流上非常方便。你可以在 react 的 issue 里看到大量 Compiler 不支持的骚操作。

> ✓
> 
> **https://playground.react.dev/**

知道了怎么查看编译之后的代码之后，那我们就需要看得懂才行。因此接下来

## 2

**Symbol.for**

我本来最初的想法是看懂编译之后的代码不是很有必要。但是有的时候会出现一些情况，程序运行的结果跟我预想的不一样。

出现这种迷惑行为的时候就感觉贼困惑，为啥会这样呢？布吉岛 ～，如何调整我自己的写法呢？也不知道。我很不喜欢这种一脸懵逼的感觉。

看是得看懂才行。虽然这个代码很不像是正常人应该去阅读的代码。先来感受一下编译之后的代码长什么样

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEU1KHnIbAP5wx0APKGPPmDoqhops6HggfZOQKWjb4JIpnyDdumyqicNMQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在 Compiler 编译后的代码中，有一个比较少见的语法会频繁出现：`Symbol.for`，我先把这个知识点科普一下。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEUaslJUhXAStSukmpWW2CGw8QCztsgJRP550NoT8zibRjNDXYzMolIPqw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Symbol 在 JavaScript 中，是一种基础数据类型。我们常常用 Symbol 来创建全局唯一值。例如，下面两个变量，虽然写法是一样的，但是他们的比较结果并不相等

```
<span>var</span>&nbsp;a&nbsp;=&nbsp;<span>Symbol</span>(<span>'hello'</span>)<br><span>var</span>&nbsp;b&nbsp;=&nbsp;<span>Symbol</span>(<span>'hello'</span>)<br><br>a&nbsp;===&nbsp;b&nbsp;<span>//&nbsp;false</span><br>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcEA1Wu8hhv5QcDFY33rAFEU3ibEdHolAJmdsqWfnuibCKAj0UBKlZaCOsRyUCA3CUMtB5GsAAibdXYKg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Symbol.for 则不同，Symbol.for 传入相同字符串时，它不会重复创建不同的值。而是在后续的调用中，读取之前已经创建好的值。因此下面的代码对比结果为 true

```
<span>var</span>&nbsp;a&nbsp;=&nbsp;<span>Symbol</span>.for(<span>'for'</span>)<br><span>var</span>&nbsp;b&nbsp;=&nbsp;<span>Symbol</span>.for(<span>'for'</span>)<br><br>a&nbsp;===&nbsp;b&nbsp;<span>//&nbsp;true</span><br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

或者我们用另外一种说法来表达这种**创建 -> 读取**的过程。

```
<span>//&nbsp;创建一个&nbsp;symbol&nbsp;并放入&nbsp;symbol&nbsp;注册表中，键为&nbsp;"foo"</span><br><span>Symbol</span>.for(<span>"foo"</span>);<br><br><span>//&nbsp;从&nbsp;symbol&nbsp;注册表中读取键为"foo"的&nbsp;symbol</span><br><span>Symbol</span>.for(<span>"foo"</span>);&nbsp;<br>
```

在 Compiler 编译后的代码中，组件依赖 `useMemoCache` 来缓存所有运算表达式，包括组件、函数等。在下面的例子中，`useMemoCache` 传入参数为 12，说明在该组件中，有 12 个单位需要被缓存。

在初始化时，会默认给所有的缓存变量初始一个值。

```
$&nbsp;=&nbsp;useMemoCache(<span>12</span>)<br><br><span>for</span>&nbsp;(<span>let</span>&nbsp;$i&nbsp;=&nbsp;<span>0</span>;&nbsp;$i&nbsp;&lt;&nbsp;<span>12</span>;&nbsp;$i&nbsp;+=&nbsp;<span>1</span>)&nbsp;{<br>&nbsp;&nbsp;$[$i]&nbsp;=&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>);<br>}<br>
```

那么，组件就可以根据缓存值是否等于 `Symbol.for` 的初始值，来判断某一段内容是否被初始化过。**如果相等，则没有被初始化。**

如下：

```
<span>let</span>&nbsp;t1;<br><br><span>if</span>&nbsp;($[<span>1</span>]&nbsp;===&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>))&nbsp;{<br>&nbsp;&nbsp;t1&nbsp;=&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>id</span>=<span>"tips"</span>&gt;</span>Tab&nbsp;切换<span>&lt;/<span>div</span>&gt;</span></span>;<br>&nbsp;&nbsp;$[<span>1</span>]&nbsp;=&nbsp;t1;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t1&nbsp;=&nbsp;$[<span>1</span>];<br>}<br>
```

## 3

**缓存原理详细分析**

我们需要重新详细解读一下上面那段代码。这是整个编译原理的核心理论。对于每一段可缓存内容，这里以一个元素为例，

```
&lt;div&nbsp;id=<span>"tips"</span>&gt;Tab&nbsp;切换&lt;<span>/div&gt;<br></span>
```

我们会先声明一个中间变量，用于接收元素对象。

```
<span>let</span>&nbsp;t1<br>
```

但是在接收之前，我们需要判断一下是否已经初始化过。如果没有初始化，那么则执行如下逻辑，创建该元素对象。创建完成之后，赋值给 t1，并缓存在 `$[1]` 中。

```
<span>if</span>&nbsp;($[<span>1</span>]&nbsp;===&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>))&nbsp;{<br>&nbsp;&nbsp;t1&nbsp;=&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>id</span>=<span>"tips"</span>&gt;</span>Tab&nbsp;切换<span>&lt;/<span>div</span>&gt;</span></span>;<br>&nbsp;&nbsp;$[<span>1</span>]&nbsp;=&nbsp;t1;<br>}<br>
```

如果已经初始化过，那么就直接读取之前缓存在 `$[1]` 中的值即可。

```
...<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t1&nbsp;=&nbsp;$[<span>1</span>];<br>}<br>
```

这样，当函数组件多次执行时，该元素组件就永远只会创建一次，而不会多次创建。

> i
> 
> > > 这里需要注意的是，**判断成本非常低**，但是创建元素的成本会偏高，因此这种置换是非常划算的，我们后续会明确用数据告诉大家判断的成本

对于一个函数组件中声明的函数而言，缓存的逻辑会根据情况不同有所变化。这里主要分为两种情况，一种情况是函数内部不依赖外部状态，例如

```
<span><span>function</span>&nbsp;<span>__clickHanler</span>(<span>index</span>)&nbsp;</span>{<br>&nbsp;&nbsp;tabRef.current[index].appeared&nbsp;=&nbsp;<span>true</span><br>&nbsp;&nbsp;setCurrent(index)<br>}<br>
```

那么编译缓存逻辑与上面的元素是完全一致的，代码如下

```
<span>let</span>&nbsp;t0;<br><br><span>if</span>&nbsp;($[<span>0</span>]&nbsp;===&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>))&nbsp;{<br>&nbsp;&nbsp;t0&nbsp;=&nbsp;<span><span>function</span>&nbsp;<span>__clickHanler</span>(<span>index</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;tabRef.current[index].appeared&nbsp;=&nbsp;<span>true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;setCurrent(index);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;$[<span>0</span>]&nbsp;=&nbsp;t0;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t0&nbsp;=&nbsp;$[<span>0</span>];<br>}<br>
```

另外一种情况是有依赖外部状态，例如

```
<span>const</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span>0</span>)<br><br><span>//&nbsp;此时依赖&nbsp;counter，注意区分他们的细微差别</span><br><span><span>function</span>&nbsp;<span>__clickHanler</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>console</span>.log(counter)<br>&nbsp;&nbsp;setCounter(counter&nbsp;+&nbsp;<span>1</span>)<br>}<br>
```

那么编译结果，则只需要把是否重新初始化的判断条件调整一下即可

```
<span>let</span>&nbsp;t0;<br><br><span>if</span>&nbsp;($[<span>0</span>]&nbsp;!==&nbsp;counter)&nbsp;{<br>&nbsp;&nbsp;t0&nbsp;=&nbsp;<span><span>function</span>&nbsp;<span>__clickHanler</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(counter);<br>&nbsp;&nbsp;&nbsp;&nbsp;setCounter(counter&nbsp;+&nbsp;<span>1</span>);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;$[<span>0</span>]&nbsp;=&nbsp;counter;<br>&nbsp;&nbsp;$[<span>1</span>]&nbsp;=&nbsp;t0;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t0&nbsp;=&nbsp;$[<span>1</span>];<br>}<br>
```

这样，当 counter 发生变化，t0 就会重新赋值，而不会采用缓存值，从而完美的绕开了闭包问题。

除此在外，无论是函数、还是组件元素的缓存判断条件，都会优先考虑外部条件，使用 `Symbol.for` 来判断时，则表示没有其他任何值的变化会影响到该缓存结果。

例如，一个组件元素如下所示

```
&lt;button&nbsp;onClick={__clickHanler}&gt;counter++&lt;<span>/button&gt;<br></span>
```

此时它的渲染结果受到 `__clickHanler` 的影响，因此，判断条件则不会使用 `Symbol.for`，编译结果如下

```
<span>let</span>&nbsp;t2;<br><br><span>if</span>&nbsp;($[<span>3</span>]&nbsp;!==&nbsp;__clickHanler)&nbsp;{<br>&nbsp;&nbsp;t2&nbsp;=&nbsp;<span><span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{__clickHanler}</span>&gt;</span>counter++<span>&lt;/<span>button</span>&gt;</span></span>;<br>&nbsp;&nbsp;$[<span>3</span>]&nbsp;=&nbsp;__clickHanler;<br>&nbsp;&nbsp;$[<span>4</span>]&nbsp;=&nbsp;t2;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t2&nbsp;=&nbsp;$[<span>4</span>];<br>}<br>
```

又例如下面这个元素组件，他的渲染结果受到 `counter` 的影响。

```
&lt;div&nbsp;className=<span>"counter"</span>&gt;<br>&nbsp;&nbsp;counter:&nbsp;{counter}<br>&lt;<span>/div&gt;<br></span>
```

因此，它的编译结果为：

```
<span>let</span>&nbsp;t3;<br><br><span>if</span>&nbsp;($[<span>5</span>]&nbsp;!==&nbsp;counter)&nbsp;{<br>&nbsp;&nbsp;t3&nbsp;=&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"counter"</span>&gt;</span>counter:&nbsp;{counter}<span>&lt;/<span>div</span>&gt;</span></span>;<br>&nbsp;&nbsp;$[<span>5</span>]&nbsp;=&nbsp;counter;<br>&nbsp;&nbsp;$[<span>6</span>]&nbsp;=&nbsp;t3;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t3&nbsp;=&nbsp;$[<span>6</span>];<br>}<br>
```

对于这样的编译细节的理解至关重要。在以后的开发中，我们就可以完全不用担心闭包问题而导致程序出现你意想不到的结果了。

所有的可缓存对象，全部都是这个类似的逻辑。他的粒度细到每一个函数，每一个元素。这一点意义非凡，它具体代表着什么，我们在后续聊性能优化的时候再来明确。

不过需要注意的是，对于 map 的循环语法，在编译结果中，缓存的是整个结果，而不是渲染出来的每一个元素。

```
{tabs.map(<span>(<span>item,&nbsp;index</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>item.component</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>appearder</span>=<span>{item.appeared}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>key</span>=<span>{item.title}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>index}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;)<br>})}<br>
```

编译结果表现如下：

```
<span>let</span>&nbsp;t4;<br><br><span>if</span>&nbsp;($[<span>7</span>]&nbsp;!==&nbsp;current)&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;tabs.map(<span>(<span>item_0,&nbsp;index_1</span>)&nbsp;=&gt;</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>item_0.component</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>appearder</span>=<span>{item_0.appeared}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>key</span>=<span>{item_0.title}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>index_1}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;));<br>&nbsp;&nbsp;$[<span>7</span>]&nbsp;=&nbsp;current;<br>&nbsp;&nbsp;$[<span>8</span>]&nbsp;=&nbsp;t4;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;$[<span>8</span>];<br>}<br>
```

> ✓
> 
> 对这种情况的了解非常重要，因为有的时候我们需要做更极限的性能优化时，map 循环可能无法满足我们的需求。因为此时循环依然在执行，后面的案例中我们会更具体的分析 Map 的表现

目前这个阶段，我们最主要的是关心程序执行逻辑与预想的要保持一致，因此接下来，我们利用三个案例，来分析编译之后的执行过程。

## 4

实践案例一：counter 递增

通过上面对 Compiler 渲染结果的理解，我们应该已经大概知道下面这段代码最终会渲染成什么样。我们目前要思考的问题就是，这个例子，编译之后，**收益表现在哪里？**

```
<span><span>function</span>&nbsp;<span>Index</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span>0</span>)<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span>__clickHanler</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(counter)<br>&nbsp;&nbsp;&nbsp;&nbsp;setCounter(counter&nbsp;+&nbsp;<span>1</span>)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>id</span>=<span>'tips'</span>&gt;</span>基础案例，state&nbsp;递增<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{__clickHanler}</span>&gt;</span>counter++<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"counter"</span>&gt;</span>counter:&nbsp;{counter}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

一起来分析一下，当我们点击按钮时，此时 `counter` 增加，因此 `__clickHanler` 无法缓存，需要重新创建，那么 button 按钮和 counter 标签都无法缓存。

此时，只有 `tips` 元素可以被缓存。但是 `tips` 元素本身是一个基础元素，在原本的逻辑中，经历一个简单的判断就能知道不需要重新创建节点因此本案例的编译之后收益非常有限。

编译代码结果如下

```
<span><span>function</span>&nbsp;<span>Index</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;$&nbsp;=&nbsp;_c(<span>10</span>);<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span>0</span>);<br>&nbsp;&nbsp;<span>let</span>&nbsp;t0;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;($[<span>0</span>]&nbsp;!==&nbsp;counter)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t0&nbsp;=&nbsp;<span><span>function</span>&nbsp;<span>__clickHanler</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(counter);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setCounter(counter&nbsp;+&nbsp;<span>1</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>0</span>]&nbsp;=&nbsp;counter;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>1</span>]&nbsp;=&nbsp;t0;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t0&nbsp;=&nbsp;$[<span>1</span>];<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>const</span>&nbsp;__clickHanler&nbsp;=&nbsp;t0;<br>&nbsp;&nbsp;<span>let</span>&nbsp;t1;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;($[<span>2</span>]&nbsp;===&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t1&nbsp;=&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>id</span>=<span>"tips"</span>&gt;</span>基础案例，state&nbsp;递增<span>&lt;/<span>div</span>&gt;</span></span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>2</span>]&nbsp;=&nbsp;t1;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t1&nbsp;=&nbsp;$[<span>2</span>];<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>let</span>&nbsp;t2;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;($[<span>3</span>]&nbsp;!==&nbsp;__clickHanler)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t2&nbsp;=&nbsp;<span><span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{__clickHanler}</span>&gt;</span>counter++<span>&lt;/<span>button</span>&gt;</span></span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>3</span>]&nbsp;=&nbsp;__clickHanler;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>4</span>]&nbsp;=&nbsp;t2;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t2&nbsp;=&nbsp;$[<span>4</span>];<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>let</span>&nbsp;t3;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;($[<span>5</span>]&nbsp;!==&nbsp;counter)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t3&nbsp;=&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"counter"</span>&gt;</span>counter:&nbsp;{counter}<span>&lt;/<span>div</span>&gt;</span></span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>5</span>]&nbsp;=&nbsp;counter;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>6</span>]&nbsp;=&nbsp;t3;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t3&nbsp;=&nbsp;$[<span>6</span>];<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>let</span>&nbsp;t4;<br><br>&nbsp;&nbsp;<span>if</span>&nbsp;($[<span>7</span>]&nbsp;!==&nbsp;t2&nbsp;||&nbsp;$[<span>8</span>]&nbsp;!==&nbsp;t3)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t4&nbsp;=&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t1}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t2}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t3}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>7</span>]&nbsp;=&nbsp;t2;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>8</span>]&nbsp;=&nbsp;t3;<br>&nbsp;&nbsp;&nbsp;&nbsp;$[<span>9</span>]&nbsp;=&nbsp;t4;<br>&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;t4&nbsp;=&nbsp;$[<span>9</span>];<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;t4;<br>}<br>
```

## 5

**实践案例二：昂贵的子组件**

在上面一个例子的基础之上，我们新增一个子组件。该子组件的渲染非常耗时。

```
<span><span>function</span>&nbsp;<span>Expensive</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>var</span>&nbsp;cur&nbsp;=&nbsp;performance.now()<br>&nbsp;&nbsp;<span>while</span>&nbsp;(performance.now()&nbsp;-&nbsp;cur&nbsp;&lt;&nbsp;<span>1000</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;block&nbsp;1000ms</span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span>console</span>.log(<span>'hellow'</span>)<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span>我是一个耗时组件<span>&lt;/<span>div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

父组件中引入该子组件，其他逻辑完全一致。

```
function&nbsp;Index()&nbsp;{<br>&nbsp;&nbsp;const&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(0)<br><br>&nbsp;&nbsp;function&nbsp;__clickHanler()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;setCounter(counter&nbsp;+&nbsp;1)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;id='tips'&gt;基础案例，state&nbsp;递增&lt;/div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;onClick={__clickHanler}&gt;counter++&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;className="counter"&gt;counter:&nbsp;{counter}&lt;/div&gt;<br><span>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Expensive&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&nbsp;&nbsp;)<br>}<br>
```

我们在之前「React 知命境」的学习中，对于性能优化已经有非常深厚的积累。因此我们知道，在这种情况之下，由于父组件的状态发生了变化，导致子组件 `Expensive` 会在 counter 递增时重复执行。从而导致页面渲染时非常卡顿。

编译之后，针对这一段逻辑的优化代码如下

```
<span>let</span>&nbsp;t4;<br><br><span>if</span>&nbsp;($[<span>7</span>]&nbsp;===&nbsp;<span>Symbol</span>.for(<span>"react.memo_cache_sentinel"</span>))&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;<span>&lt;<span>Expensive</span>&nbsp;/&gt;</span>;<br>&nbsp;&nbsp;$[<span>7</span>]&nbsp;=&nbsp;t4;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;$[<span>7</span>];<br>}<br>
```

正如代码所表达的一样，由于这一个组件，并没有依赖任何外部状态，因此只需要在初始化时赋值一次即可。后续直接使用缓存值。

因此，在这个案例中，Compiler 编译之后的**优化效果非常明显，收益巨大**。

## 6

**实践案例三：Tab 切换**

这个案例会非常的复杂，经验稍微欠缺一点的前端开发可能都实现不了。我们先来看一下我想要实现的演示效果。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从演示效果上来看，这是一个普通的 tab 切换。但是先别急，我还有要求。我希望能实现极限的性能优化。

1、我希望首次渲染时，页面渲染更少的内容，因此此时，只能先渲染默认的 Panel。其他 Panel 需要在点击对应的按钮时，才渲染出来。

2、在切换过程中，我希望能够缓存已经渲染好的 Panel，只需要在样式上做隐藏，而不需要在后续的交互中重复渲染内容

3、当四个页面都渲染出来之后，再做切换时，此时只会有两个页面会发生变化，上一个选中的页面与下一个选中的页面。另外的页面不参与交互，则不应该 re-render。

> ✓
> 
> 这个案例和要求不算特别难，但是对综合能力的要求还是蛮高的，大家有空可以自己尝试实现一下，看看能不能完全达到要求

具体的完整实现我们会在后续的直播中跟大家分享。大家可以加我好友「icanmeetu」然后进 React19 讨论群，React19 相关的直播消息会第一时间在群内公布。

这里，我主要想跟大家分享的就是 map 方法的小细节。有如下代码

```
{tabs.map(<span>(<span>item,&nbsp;index</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>item.component</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>appearder</span>=<span>{item.appeared}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>key</span>=<span>{item.title}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>index}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;)<br>})}<br>
```

它的编译结果表现如下：

```
<span>let</span>&nbsp;t4;<br><br><span>if</span>&nbsp;($[<span>7</span>]&nbsp;!==&nbsp;current)&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;tabs.map(<span>(<span>item_0,&nbsp;index_1</span>)&nbsp;=&gt;</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>item_0.component</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>appearder</span>=<span>{item_0.appeared}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>key</span>=<span>{item_0.title}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>index_1}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;));<br>&nbsp;&nbsp;$[<span>7</span>]&nbsp;=&nbsp;current;<br>&nbsp;&nbsp;$[<span>8</span>]&nbsp;=&nbsp;t4;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t4&nbsp;=&nbsp;$[<span>8</span>];<br>}<br>
```

我们会发现，此时编译缓存的是整个 map 表达式，但是由于 map 表达式又依赖于 `current`，因此，在我们点击切换的交互过程中，每一次的 current 都会发生变化，那么这里针对 map 表达式的缓存就没有了任何意义。

但是实际上，我们可以观察到，我们有 4 个 Panel，点击切换的交互发生时，实际上只有两个 Pannel 发生了变化。因此，最极限的优化是，只有这两个组件对应的函数需要重新 `re-render`，那么我们的代码应该怎么写呢？

其实非常简单，那就是不用 map，将数组拆开直接手写，代码如下

```
<span>let</span>&nbsp;c1&nbsp;=&nbsp;tabRef.current[<span>0</span>]<br><span>let</span>&nbsp;c2&nbsp;=&nbsp;tabRef.current[<span>1</span>]<br><span>let</span>&nbsp;c3&nbsp;=&nbsp;tabRef.current[<span>2</span>]<br><span>let</span>&nbsp;c4&nbsp;=&nbsp;tabRef.current[<span>3</span>]<br>
```

```
&lt;c1.component&nbsp;appearder={c1.appeared}&nbsp;selected={current&nbsp;===&nbsp;<span>0</span>}/&gt;<br><span>&lt;<span>c2.component</span>&nbsp;<span>appearder</span>=<span>{c2.appeared}</span>&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>1}/</span>&gt;</span><br><span>&lt;<span>c3.component</span>&nbsp;<span>appearder</span>=<span>{c3.appeared}</span>&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>2}/</span>&gt;</span><br><span>&lt;<span>c4.component</span>&nbsp;<span>appearder</span>=<span>{c4.appeared}</span>&nbsp;<span>selected</span>=<span>{current</span>&nbsp;===&nbsp;<span>3}/</span>&gt;</span><br>
```

然后，我们就会发现，在编译结果中，不再缓存 map 表达式的结果，而是缓存每一个组件

```
<span>let</span>&nbsp;t5;<br><br><span>if</span>&nbsp;($[<span>7</span>]&nbsp;!==&nbsp;c1.component&nbsp;||&nbsp;$[<span>8</span>]&nbsp;!==&nbsp;c1.appeared&nbsp;||&nbsp;$[<span>9</span>]&nbsp;!==&nbsp;t4)&nbsp;{<br>&nbsp;&nbsp;t5&nbsp;=&nbsp;<span>&lt;<span>c1.component</span>&nbsp;<span>appearder</span>=<span>{c1.appeared}</span>&nbsp;<span>selected</span>=<span>{t4}</span>&nbsp;/&gt;</span>;<br>&nbsp;&nbsp;$[<span>7</span>]&nbsp;=&nbsp;c1.component;<br>&nbsp;&nbsp;$[<span>8</span>]&nbsp;=&nbsp;c1.appeared;<br>&nbsp;&nbsp;$[<span>9</span>]&nbsp;=&nbsp;t4;<br>&nbsp;&nbsp;$[<span>10</span>]&nbsp;=&nbsp;t5;<br>}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;t5&nbsp;=&nbsp;$[<span>10</span>];<br>}<br>
```

> ✓
> 
> 这样做的收益在特定场景下的收益将会非常高。

## 7

**强悍的性能：细粒度记忆化更新**

经过上面的学习，想必各位道友对 React Compiler 的工作机制已经有了非常深刻的理解。此时，我们就需要分析一下，这样的记忆化更新机制，到底有多强。

首先明确一点，和 Vue 等其他框架的依赖收集不同，React Compiler 依然不做依赖收集。

React 依然通过从根节点自上而下的 diff 来找出需要更新的节点。在这个过程中，我们会通过大量的判断来决定使用缓存值。可以明确的是，Compiler 编译之后的代码，缓存命中的概率非常高，几乎所有应该缓存的元素和函数都会被缓存起来。

**因此，React Compiler 也能够在不做依赖收集的情况下，做到元素级别的超级细粒度更细。**但是，这样做的代价就是，React 需要经历大量的判断来决定是否需要使用缓存结果。

所以这个时候，我们就需要明确，我所谓的大量判断的时间成本，到底有多少？它会不会导致新的性能问题？

可以看到，Compiler 编译之后的代码中，几乎所有的比较都是使用了全等比较，因此，我们可以写一个例子来感知一下，超大量的全等比较到底需要花费多少时间。

测试代码如下

```
<span>var</span>&nbsp;cur&nbsp;=&nbsp;performance.now()<br><br><span>for</span>(<span>let</span>&nbsp;i&nbsp;=&nbsp;<span>0</span>;&nbsp;i&nbsp;&lt;&nbsp;<span>1000000</span>;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;<span>'xxx'</span>&nbsp;==&nbsp;<span>'xx'</span><br>}<br><span>var</span>&nbsp;now&nbsp;=&nbsp;performance.now()<br><span>console</span>.log(now&nbsp;-&nbsp;cur)<br>
```

执行结果，比较 100 万次，只需要花费不到 **1.3 毫秒**。卧槽(¬д¬。)，这太强了啊。我们很难有项目能够达到 1000,000 次的比较级别，甚至许多达到 10000 都难。那也就意味着，这里大量的比较成本，落实到你的项目中，几乎可以忽略不计。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为了对比具体的效果，我们可以判断一下依赖收集的时间成本。

首先是使用数组来收集依赖。依然是 100 万次收集，具体执行结果如下。耗时 8 毫秒。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用 Map 来收集依赖。100 万次依赖收集耗时 54 ms。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用 WeakMap 来收集依赖，那就更慢了。100万次依赖收集耗时 200 毫秒。

> ✓
> 
> WeakMap 的 key 不能是一个 number 类型

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

数据展示给大家了，具体强不强，大家自行判断。

> ✓
> 
> 这里我要明确的是，这样的性能表现，在之前版本的项目中，合理运用 `useCallback/memo` 也能做到。只是由于对 React 底层默认命中规则不理解，导致大多数人不知道如何优化到这种程度。React Compiler 极大的简化了这个过程

## 8

**React Compiler 最佳实践**

有许多骚操作，React Compiler 并不支持，例如下面这种写法。

```
{[<span>1</span>,&nbsp;<span>2</span>,&nbsp;<span>3</span>,&nbsp;<span>4</span>,&nbsp;<span>5</span>].map(<span>(<span>counter</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[number,&nbsp;setNumber]&nbsp;=&nbsp;useState(<span>0</span>)<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&nbsp;<span>key</span>=<span>{</span>`<span>hello</span>${<span>counter</span>}`}&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;setNumber(number&nbsp;+&nbsp;1)}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number:&nbsp;{number}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>})}<br>
```

这个操作骚归骚，但是真的有大佬想要这样写。React 之前的版本依然不支持这种写法。不过好消息是，React 19 支持了...

但是 React Compiler 并不支持。对于这些不支持的语法，React Compiler 的做法就是直接跳过不编译，而直接沿用原组件写法。

因此，React Compiler 的最佳实践我总结了几条

-   1、不再使用 useCallback、useMemo、Memo 等缓存函数
    
-   2、丢掉闭包的心智负担，放心使用即可
    
-   3、引入严格模式
    
-   4、在你不熟悉的时候引入 eslint-plugin-react-compiler
    
-   5、当你熟练之后，弃用它，因为有的时候我们就是不想让它编译我们的组件
    
-   6、更多的使用 use 与 Action 来处理异步逻辑
    
-   7、尽可能少地使用 useEffect
    

这里，一个小小的彩蛋就是，当你不希望你的组件被 Compiler 编译时，你只需要使用 `var` 来声明状态即可。因为这不符合它的语法规范

```
<span>var</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span>0</span>)<br>
```

而你改成 `const/let`，它就会又重新编译该组件。可控性与自由度非常高。

> ✓
> 
> 顶尖前端都在关注我，就差你啦，戳左下角
> 
> 成为 React 高手，[推荐阅读 React 哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)