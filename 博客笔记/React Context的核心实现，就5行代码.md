大家好，我是被单。  

很多项目的源码非常复杂，让人望而却步。但在打退堂鼓前，我们应该思考一个问题：源码为什么复杂？

造成源码复杂的原因不外乎有三个：

1.  功能本身复杂，造成代码复杂
    
2.  编写者功力不行，写的代码复杂
    
3.  功能本身不复杂，但同一个模块耦合了太多功能，看起来复杂
    

如果是原因3，那实际理解起来其实并不难。我们需要的只是有人能帮我们剔除无关功能的干扰。

`React Context`的实现就是个典型例子，当剔除无关功能的干扰后，他的核心实现，仅需**「5行代码」**。

本文就让我们看看`React Context`的核心实现。

## 简化模型

`Context`的完整工作流程包括3步：

1.  定义`context`
    
2.  赋值`context`
    
3.  消费`context`
    

以下面的代码举例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;createContext(<span data-darkreader-inline-color="">null</span>);<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{1}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span></span><br>&nbsp;);<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Cpn</span>(<span></span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;num&nbsp;=&nbsp;useContext(ctx);<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>{num}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span>;<br>}<br></code>
```

其中：

-   `const ctx = createContext(null)` 用于定义
    
-   `<ctx.Provider value={1}>` 用于赋值
    
-   `const num = useContext(ctx)` 用于消费
    

`Context`数据结构（即`createContext`方法的返回值）也很简单：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">createContext</span>(<span>defaultValue</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;context&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">$$typeof</span>:&nbsp;REACT_CONTEXT_TYPE,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Provider</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">_currentValue</span>:&nbsp;defaultValue<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;context.Provider&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">$$typeof</span>:&nbsp;REACT_PROVIDER_TYPE,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">_context</span>:&nbsp;context<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;context;<br>}<br></code>
```

其中`context._currentValue`保存`context`当前值。

`context`工作流程的三个步骤其实可以概括为：

1.  实例化`context`，并将默认值`defaultValue`赋值给`context._currentValue`
    
2.  每遇到一个同类型`context.Provier`，将`value`赋值给`context._currentValue`
    
3.  `useContext(context)`就是简单的取`context._currentValue`的值就行
    

了解了工作流程后我们会发现，`Context`的核心实现其实就是步骤2。

## 核心实现

核心实现需要考虑什么呢？还是以上面的示例为例，当前只有一层`<ctx.Provider>`包裹`<Cpn />`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{1}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span></span><br>&nbsp;);<br>}<br></code>
```

在实际项目中，消费`ctx`的组件（示例中的`<Cpn/>`）可能被多级`<ctx.Provider>`包裹，比如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;createContext(<span data-darkreader-inline-color="">0</span>);<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{1}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{2}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{3}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

在上面代码中，`ctx`的值会从0（默认值）逐级变为3，再从3逐级变为0，所以沿途消费`ctx`的`<Cpn />`组件取得的值分别为：3、2、1。

整个流程就像**「操作一个栈」**，1、2、3分别入栈，3、2、1分别出栈，过程中栈顶的值就是`context`当前的值。

![Image](https://mmbiz.qpic.cn/mmbiz_png/5Q3ZxrD2qNAofHF48hzPia1Et1mzFXMNE3rWhYfQPqRbqNsC7W0mAQtPIm0pbT7zOlreicTOevAEoLiclOjqkypkg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

基于此，`context`的核心逻辑包括两个函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">pushProvider</span>(<span>context,&nbsp;newValue</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">popProvider</span>(<span>context</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>}<br></code>
```

其中：

-   进入`ctx.Provider`时，执行`pushProvider`方法，类比入栈操作
    
-   离开`ctx.Provider`时，执行`popProvider`方法，类比出栈操作
    

每次执行`pushProvider`时将`context._currentValue`更新为当前值：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">pushProvider</span>(<span>context,&nbsp;newValue</span>)&nbsp;</span>{<br>&nbsp;context._currentValue&nbsp;=&nbsp;newValue;<br>}<br></code>
```

同理，`popProvider`执行时将`context._currentValue`更新为上一个`context._currentValue`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">popProvider</span>(<span>context</span>)&nbsp;</span>{<br>&nbsp;context._currentValue&nbsp;=&nbsp;<span data-darkreader-inline-color="">/*&nbsp;上一个context&nbsp;value&nbsp;*/</span><br>}<br></code>
```

该如何表示上一个值呢？我们可以增加一个全局变量`prevContextValue`，用于保存**「上一个同类型的context.\_currentValue」**：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;prevContextValue&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">pushProvider</span>(<span>context,&nbsp;newValue</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;保存上一个同类型context&nbsp;value</span><br>&nbsp;&nbsp;prevContextValue&nbsp;=&nbsp;context._currentValue;<br>&nbsp;&nbsp;context._currentValue&nbsp;=&nbsp;newValue;<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">popProvider</span>(<span>context</span>)&nbsp;</span>{<br>&nbsp;&nbsp;context._currentValue&nbsp;=&nbsp;prevContextValue;<br>}<br></code>
```

在`pushProvider`中，执行如下语句前：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">context._currentValue&nbsp;=&nbsp;newValue;<br></code>
```

`context._currentValue`中保存的就是**「上一个同类型的context.\_currentValue」**，将其赋值给`prevContextValue`。

以下面代码举例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;createContext(<span data-darkreader-inline-color="">0</span>);<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">ctx.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{1}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctx.Provider</span>&gt;</span></span><br>&nbsp;);<br>}<br></code>
```

进入`ctx.Provider`时：

-   `prevContextValue`赋值为0（`context`实例化时传递的默认值）
    
-   `context._currentValue`赋值为1（当前值）
    

当`<Cpn />`消费`ctx`时，取得的值就是1。

离开`ctx.Provider`时：

-   `context._currentValue`赋值为0（`prevContextValue`对应值）
    

但是，我们当前的实现只能应对一层`ctx.Provider`，如果是多层`ctx.Provider`嵌套，我们不知道沿途`ctx.Provider`对应的`prevContextValue`。

所以，我们可以增加一个栈，用于保存沿途所有`ctx.Provider`对应的`prevContextValue`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;prevContextValueStack&nbsp;=&nbsp;[];<br><span data-darkreader-inline-color="">let</span>&nbsp;prevContextValue&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">pushProvider</span>(<span>context,&nbsp;newValue</span>)&nbsp;</span>{<br>&nbsp;prevContextValueStack.push(prevContextValue);<br>&nbsp;&nbsp;<br>&nbsp;prevContextValue&nbsp;=&nbsp;context._currentValue;<br>&nbsp;context._currentValue&nbsp;=&nbsp;newValue;<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">popProvider</span>(<span>context</span>)&nbsp;</span>{<br>&nbsp;context._currentValue&nbsp;=&nbsp;prevContextValue;<br>&nbsp;prevContextValue&nbsp;=&nbsp;prevContextValueStack.pop();<br>}<br></code>
```

其中：

-   执行`pushProvider`时，让`prevContextValue`入栈
    
-   执行`popProvider`时，让`prevContextValue`出栈
    

至此，完成了`React Context`的核心逻辑，其中`pushProvider`三行代码，`popProvider`两行代码。

## 两个有意思的点

关于`Context`的实现，有两个有意思的点。

第一个点：这个实现太过简洁（核心就5行代码），以至于让人严重怀疑是不是有`bug`？

比如，全局变量`prevContextValue`用于保存**「上一个同类型的context.\_currentValue」**，如果我们把不同`context`嵌套使用时会不会有问题？

在下面代码中，`ctxA`与`ctxB`嵌套出现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;ctxA&nbsp;=&nbsp;createContext(<span data-darkreader-inline-color="">'default&nbsp;A'</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;ctxB&nbsp;=&nbsp;createContext(<span data-darkreader-inline-color="">'default&nbsp;B'</span>);<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">ctxA.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{</span>'<span data-darkreader-inline-color="">A0</span>'}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ctxB.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{</span>'<span data-darkreader-inline-color="">B0</span>'}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ctxA.Provider</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{</span>'<span data-darkreader-inline-color="">A1</span>'}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctxA.Provider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctxB.Provider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Cpn</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ctxA.Provider</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

当离开最内层`ctxA.Provider`时，`ctxA._currentValue`应该从`'A1'`变为`'A0'`。考虑到`prevContextValue`变量的唯一性以及栈的特性，`ctxA._currentValue`会不会错误的变为`'B0'`？

答案是：不会。

`JSX`结构的确定意味着以下两点是确定的：

1.  `ctx.Provider`的进入与离开顺序
    
2.  多个`ctx.Provider`之间嵌套的顺序
    

第一点保证了当进入与离开同一个`ctx.Provider`时，`prevContextValue`的值始终与该`ctx`相关。

第二点保证了不同`ctx.Provider`的`prevContextValue`被以正确的顺序入栈、出栈。

第二个有意思的点：我们知道，`Hook`的使用有个限制 —— 不能在条件语句中使用`hook`。

究其原因，对于同一个函数组件，`Hook`的数据保存在一条链表上，所以必须保证遍历链表时，链表数据与`Hook`一一对应。

但我们发现，`useContext`获取的其实并不是链表数据，而是`ctx._currentValue`，这意味着`useContext`其实是不受这个限制影响的。

## 总结

以上五行代码便是`React Context`的核心实现。在实际的`React`源码中，`Context`相关代码远不止五行，这是因为他与其他特性耦合在一块，比如：

-   性能优化相关代码
    
-   `SSR`相关代码
    

所以，当我们面对复杂代码时，不要轻言放弃。仔细分析下，没准儿核心代码只有几行呢？

```
<section data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">面试社群</span><br></section><ul data-darkreader-inline-outline="" data-darkreader-inline-color=""><li data-darkreader-inline-outline=""><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-tools="135编辑器" data-id="89226" data-darkreader-inline-color=""><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section></section></li><li data-darkreader-inline-outline=""></li><li data-darkreader-inline-outline=""><p data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">如果你最近正在找工作或接下来计划找工作，扫码回复「</span><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">面试</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">」，一起讨论</span></p></li><li data-darkreader-inline-outline=""></li><li data-darkreader-inline-outline=""><p data-darkreader-inline-outline="" data-darkreader-inline-color=""><img data-fileid="501661987" data-galleryid="" data-ratio="1.175" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_png/ZWVxrQ7G0WQEgnhiacVDhaHCjRSY62XJqdcZGGOFvicygXhQ4KDr2iatAq6xXF0MDSyHy2G40l2zheIjP8sZiaFgQg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" data-type="png" data-w="800" data-darkreader-inline-outline="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="" data-darkreader-inline-bgcolor="" data-original-style="outline: 0px; display: initial; -webkit-font-smoothing: antialiased; border-width: 1px; border-style: solid; border-color: rgb(238, 237, 235); background-color: rgb(238, 237, 235); background-size: 40px; font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 15px; letter-spacing: 0.544px; background-position: center center; background-repeat: no-repeat; visibility: visible !important; width: 244px !important; --darkreader-inline-outline: initial; --darkreader-inline-border-top: #353a3c; --darkreader-inline-border-right: #353a3c; --darkreader-inline-border-bottom: #353a3c; --darkreader-inline-border-left: #353a3c; --darkreader-inline-bgcolor: #222527;" data-index="4" src="https://mmbiz.qpic.cn/mmbiz_png/ZWVxrQ7G0WQEgnhiacVDhaHCjRSY62XJqdcZGGOFvicygXhQ4KDr2iatAq6xXF0MDSyHy2G40l2zheIjP8sZiaFgQg/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" _width="244px" crossorigin="anonymous" alt="Image" data-fail="0"></p></li></ul>
```