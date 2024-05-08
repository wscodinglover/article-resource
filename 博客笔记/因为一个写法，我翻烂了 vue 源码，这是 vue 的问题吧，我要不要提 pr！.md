## 问题背景

我已经老了。。。。`面对现在的观众不知该如何表达`。既然这样的话

那......

直接上代码吧：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"test"</span>&nbsp;<span data-darkreader-inline-color="">:style</span>=<span data-darkreader-inline-color="">"[is&nbsp;?&nbsp;{backgroundColor:'red'}&nbsp;:&nbsp;'',bg]"</span>&gt;</span>这是测试页面<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span></span><br>&lt;<span data-darkreader-inline-color="">/template&gt;<br>&lt;script&nbsp;setup&gt;<br>import&nbsp;{&nbsp;ref&nbsp;}&nbsp;from&nbsp;'vue'<br>const&nbsp;is=ref(true)<br>const&nbsp;bg&nbsp;=&nbsp;ref({'background-color':&nbsp;'yellow'})<br>setInterval(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is.value=!is.value<br>},&nbsp;5000);<br>&lt;/</span>script&gt;<br><span><span data-darkreader-inline-color="">&lt;<span>style</span>&gt;</span><span><br><span data-darkreader-inline-color="">.test</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">500px</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">500px</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">text-align</span>:&nbsp;center;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">line-height</span>:&nbsp;<span data-darkreader-inline-color="">500px</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">font-size</span>:&nbsp;<span data-darkreader-inline-color="">40px</span>;<br>}<br></span><span data-darkreader-inline-color="">&lt;/<span>style</span>&gt;</span></span><br></code>
```

事情就发在昨天，在我们单位的办公大厅里，有一个产品向我走来。他主动介绍自己，他对我说，“老骥：你这个页面有问题，很大很大的问题，现在我是特地来告诉你，对我来说，还得辛苦你给我解决问题”

我很慌乱.....

因为此时我的正在吃早饭，嘴里还有个茶叶蛋

我慌忙的咽了下去，提醒焦急的产品：

我知道你很急，但.....

请你不要着急！！

我得一点一点的排查问题。

具体业务问题就不交代了，复现代码请见开头

具体现象如下,`请细品`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Kapture 2023-06-14 at 17.10.50.gif

首先我设置了一个定时器，定时器中通过一个变量控制者绑定的`style` 在以上代码中，虽然定时器在不停的执行，

但是，由于`bg`这个值是个常量，理论上来说他的页面背景应该一直呈现黄色

有人问，为啥你要设置成黄色？

额，这不是重点，可能因为我们是`黄种人`。

然而现实情况却在黄色和没有颜色之间徘徊，这是为什么？

## 问题探究过程

抱着好奇的态度我首先怀疑的是我的我对于`vue`的`style`动态的值的绑定是不是理解的不透彻

#### 探究vue文档

我怀着忐忑的心情，找到了vue文档，在文档中我只需要确认两点:

-   1、style绑定数据的规则
    
-   2、style的驼峰写法规则
    

###### style绑定数据的规则&style的驼峰写法规则

在他的官方文档中我们可以发现

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span data-darkreader-inline-color="">:style</span>=<span data-darkreader-inline-color="">"[baseStyles,&nbsp;overridingStyles]"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br></code>
```

他的绑定朴实无华，并且根据我翻看源码得出结论，数组后方的变量覆盖前方的变量

源码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">normalizeStyle</span>(<span data-darkreader-inline-color=""><br>&nbsp;&nbsp;value:&nbsp;unknown<br></span>):&nbsp;<span data-darkreader-inline-color="">NormalizedStyle</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;判断样式数组的情况</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isArray(value))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;最后格式化之后的样式对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res:&nbsp;NormalizedStyle&nbsp;=&nbsp;{}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对当前数组进行遍历，此处就可以预示着，在初始值后方的数组内容会覆盖前方的</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">let</span>&nbsp;i&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;i&nbsp;&lt;&nbsp;value.length;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;拿到数组中的每一项</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;item&nbsp;=&nbsp;value[i]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果是个字符串，那就表示这个样式需要解析</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;normalized&nbsp;=&nbsp;isString(item)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;parseStringStyle(item)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;否则防止是个多维数组，递归调用最终将所有的都放在res中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;(normalizeStyle(item)&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;NormalizedStyle)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(normalized)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;normalized)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res[key]&nbsp;=&nbsp;normalized[key]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;其他情况暂且不看</span><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isString(value))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isObject(value))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value<br>&nbsp;&nbsp;}<br>}<br></code>
```

同样是通过上述源码中内容可以发现，他并没有对于类似`background-color`以及 `backgroundColor`做统一的格式处理，这个所谓的`normalizeStyle`其实就是将绑定的值，做一个`集成处理`,方便在后续绑定的时候做统一的处理循环绑定。

此时我们先排除了代码的写法错误，接下来我的排查方向其实应该就是vue源码中的`蛛丝马迹`。

于是我首先将问题定位在了源码中的的模板解析错误

## 查看模板解析

我们知道vue的`模板`的的编译结果是可以在浏览器中查看的，具体查看方式有两种

#### 在`vue-devtools` 中可以直接查看编译结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

从源码中我们可以看到他先调用上方的`normalizeStyle`方法对绑定样式做处理，在调用`createElementVNode` 去创建`vnode`

当然如果你嫌弃vue提供的不清不楚，不头不尾，别急。。。。

我们在浏览器的控制台中也能看到`端倪`

#### 在浏览器中查看

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

如上图所示，在开发环境下，我们利用 `sourcemap`，可以完美的查看到整个代码结构，以及编译后的源码，包括他的引用`链条`，并且他还可以打`断点`!

从上述代码中我们可以清楚的发现，这个常亮的值确实被编译成功了

那既然这样的话，我就开始怀疑是`createElementVNode` 的问题

#### 排查createElementVNode

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">createBaseVNode</span>(<span data-darkreader-inline-color=""><br>&nbsp;&nbsp;type:&nbsp;VNodeTypes&nbsp;|&nbsp;ClassComponent&nbsp;|&nbsp;typeof&nbsp;NULL_DYNAMIC_COMPONENT,<span data-darkreader-inline-color="">//</span>&nbsp;vnode类型<br>&nbsp;&nbsp;props:&nbsp;(Data&nbsp;&amp;&nbsp;VNodeProps</span>)&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>,//&nbsp;属性<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">children</span>:&nbsp;<span data-darkreader-inline-color="">unknown</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>,//&nbsp;子节点<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">patchFlag</span>&nbsp;=&nbsp;0,&nbsp;//&nbsp;补丁标记<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">dynamicProps</span>:&nbsp;<span data-darkreader-inline-color="">string</span>[]&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">shapeFlag</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;===&nbsp;<span data-darkreader-inline-color="">Fragment</span>&nbsp;?&nbsp;0&nbsp;:&nbsp;<span data-darkreader-inline-color="">ShapeFlags</span>.<span data-darkreader-inline-color="">ELEMENT</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">isBlockNode</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">needFullChildrenNormalization</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span><br>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建vnode</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;vnode&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">__v_isVNode</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">__v_skip</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;type,<br>&nbsp;&nbsp;&nbsp;&nbsp;props,<span data-darkreader-inline-color="">//&nbsp;中间包含style内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">key</span>:&nbsp;props&nbsp;&amp;&amp;&nbsp;normalizeKey(props),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">ref</span>:&nbsp;props&nbsp;&amp;&amp;&nbsp;normalizeRef(props),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">scopeId</span>:&nbsp;currentScopeId,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">slotScopeIds</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;children,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">component</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">suspense</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">ssContent</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">ssFallback</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">dirs</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transition</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">el</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">anchor</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">target</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">targetAnchor</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">staticCount</span>:&nbsp;<span data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;shapeFlag,<br>&nbsp;&nbsp;&nbsp;&nbsp;patchFlag,<br>&nbsp;&nbsp;&nbsp;&nbsp;dynamicProps,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">dynamicChildren</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">appContext</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">ctx</span>:&nbsp;currentRenderingInstance<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;VNode<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(needFullChildrenNormalization)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;normalizeChildren(vnode,&nbsp;children)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(__FEATURE_SUSPENSE__&nbsp;&amp;&amp;&nbsp;shapeFlag&nbsp;&amp;&nbsp;ShapeFlags.SUSPENSE)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;(type&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;SuspenseImpl).normalize(vnode)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(children)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;compiled&nbsp;element&nbsp;vnode&nbsp;-&nbsp;if&nbsp;children&nbsp;is&nbsp;passed,&nbsp;only&nbsp;possible&nbsp;types&nbsp;are</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;string&nbsp;or&nbsp;Array.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;vnode.shapeFlag&nbsp;|=&nbsp;isString(children)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;ShapeFlags.TEXT_CHILDREN<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;ShapeFlags.ARRAY_CHILDREN<br>&nbsp;&nbsp;}<br><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(__DEV__&nbsp;&amp;&amp;&nbsp;vnode.key&nbsp;!==&nbsp;vnode.key)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;warn(<span data-darkreader-inline-color="">`VNode&nbsp;created&nbsp;with&nbsp;invalid&nbsp;key&nbsp;(NaN).&nbsp;VNode&nbsp;type:`</span>,&nbsp;vnode.type)<br>&nbsp;&nbsp;}<br><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;isBlockTreeEnabled&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;!isBlockNode&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;currentBlock&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;(vnode.patchFlag&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;||&nbsp;shapeFlag&nbsp;&amp;&nbsp;ShapeFlags.COMPONENT)&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;vnode.patchFlag&nbsp;!==&nbsp;PatchFlags.HYDRATE_EVENTS<br>&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;currentBlock.push(vnode)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(__COMPAT__)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;convertLegacyVModelProps(vnode)<br>&nbsp;&nbsp;&nbsp;&nbsp;defineLegacyVNodeProperties(vnode)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;vnode<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createBaseVNode&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;createElementVNode&nbsp;}<br></code>
```

从以上代码中我们发现，其实`createElementVNode`主要做的事情只有一个，就是创建`vnode` 并且`vnode`中是包含样式信息的

效果图如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

从上图中我们可以发现，他确实包含两个属性，那就表示，这个`vnode`中应该是包含所有的`style`信息，并没有缺失，那么就只能是样式`更新`的问题了

#### 样式更新

说起样式更新，我们还得老规矩，从`丘处机路过牛家村`开始

在样式的更新操作中，避免不了`patch` 函数，以及`diff`过程，这个过程的主流程咱就不过多赘述了，讲`它`的人已经够多了，俺嘴皮子磨破，也就那么两句，没啥新意，俺就主要讲讲`diff`过程中的跟样式有关的内容，在`diff`的过程中，有很多的类型改变响应的处理函数，而我们的`props`的处理对应的就是`patchProp` 函数 代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;patchProp:&nbsp;DOMRendererOptions[<span data-darkreader-inline-color="">'patchProp'</span>]&nbsp;=&nbsp;(<br>&nbsp;&nbsp;el,<br>&nbsp;&nbsp;key,<br>&nbsp;&nbsp;prevValue,<br>&nbsp;&nbsp;nextValue,<br>&nbsp;&nbsp;isSVG&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;prevChildren,<br>&nbsp;&nbsp;parentComponent,<br>&nbsp;&nbsp;parentSuspense,<br>&nbsp;&nbsp;unmountChildren<br>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;patchStyle(el,&nbsp;prevValue,&nbsp;nextValue)<br><br>}<br></code>
```

而在`patchProp` 函数中还有`patchStyle`函数,用用来专门处理`内联样式`，代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">patchStyle</span>(<span data-darkreader-inline-color="">el:&nbsp;Element,&nbsp;prev:&nbsp;Style,&nbsp;next:&nbsp;Style</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;拿到style样式</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;style&nbsp;=&nbsp;(el&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;HTMLElement).style<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isCssString&nbsp;=&nbsp;isString(next)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//如果不是字符窜</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(next&nbsp;&amp;&amp;&nbsp;!isCssString)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;遍历对象&nbsp;设置style</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;next)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setStyle(style,&nbsp;key,&nbsp;next[key])<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;老的style删除</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(prev&nbsp;&amp;&amp;&nbsp;!isString(prev))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;prev)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;优化手段，如果新的节点没有，那么就表示需要删除，如果按照正常思维，</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//应该是先给老的全删了新的全加上</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(next[key]&nbsp;==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setStyle(style,&nbsp;key,&nbsp;<span data-darkreader-inline-color="">''</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;字符串的情况我们暂且不论</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;currentDisplay&nbsp;=&nbsp;style.display<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isCssString)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(prev&nbsp;!==&nbsp;next)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style.cssText&nbsp;=&nbsp;next&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;string<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(prev)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el.removeAttribute(<span data-darkreader-inline-color="">'style'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">'_vod'</span>&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;el)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style.display&nbsp;=&nbsp;currentDisplay<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

看到这，我相信大家已经一目了然了

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

根本原因就是在`vue`内部没有样式写法做`标准化统一`， 经过测试，`vue2`也会有这个问题，

所以，我就怀疑这是不是`尤大`是故意为之，他不允许你这么`书写`

其实据我粗浅的理解，解决方式非常简单，我们只需要将代码标准化为`驼峰写法`，或者`连字符`写法即可，并且vue3源码中也给了我们对应的函数

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//将连字符转化为转驼峰&nbsp;'on-click'&nbsp;=&gt;&nbsp;'onClick'</span><br><span data-darkreader-inline-color="">const</span>&nbsp;camelizeRE&nbsp;=&nbsp;<span data-darkreader-inline-color="">/-(\w)/g</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;camelize&nbsp;=&nbsp;cacheStringFunction(<span><span data-darkreader-inline-color="">str</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str.replace(camelizeRE,&nbsp;(_,&nbsp;c)&nbsp;=&gt;&nbsp;(c&nbsp;?&nbsp;c.toUpperCase()&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>))<br>})<br><br><br><span data-darkreader-inline-color="">//将小驼峰转化为连字符字符串&nbsp;'onClick'&nbsp;=&gt;&nbsp;'on-click'</span><br><br>onst&nbsp;hyphenateRE&nbsp;=&nbsp;<span data-darkreader-inline-color="">/\B([A-Z])/g</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;hyphenate&nbsp;=&nbsp;cacheStringFunction(<span>(<span data-darkreader-inline-color="">str:&nbsp;string</span>)&nbsp;=&gt;</span>&nbsp;str.replace(hyphenateRE,&nbsp;<span data-darkreader-inline-color="">'-$1'</span>).toLowerCase()&nbsp;)<br></code>
```

而我们只需要在`normalizeStyle`函数中，处理即可，代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(normalized)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;normalized)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res[hyphenate(key)]&nbsp;=&nbsp;normalized[hyphenate(key)]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br></code>
```

好了，问题排查完毕，然后需要发出灵魂一问？

`vue`源码中是刻意不解决这个问题吗？他是一个使用场景的取舍吗？可有大佬告知？

关于本文

作者：老骥farmer

https://juejin.cn/post/7245171528122990650

## 最后

欢迎关注「三分钟学前端」

号内回复：  

「网络」，自动获取三分钟学前端网络篇小书（90+页）

「JS」，自动获取三分钟学前端 JS 篇小书（120+页）

「算法」，自动获取 github 2.9k+ 的前端算法小书

「面试」，自动获取 github 23.2k+ 的前端面试小书

「简历」，自动获取程序员系列的 `120` 套模版

》》面试官也在看的前端面试资料《《  

“在看和转发”就是最大的支持