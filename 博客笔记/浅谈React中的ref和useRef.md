![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/83d3vL8fIicZlKuBMR4vEfOiar4ia8J0KP9l40f09s49ng6OV7LLicoGmwwSfhRIB5adMAdQLqBCYTNKRUN31BaKiaA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 原文作者：Joel Adewole
> 
> 原文地址：https://refine.dev/blog/react-useref-hook-and-ref/

> 翻译：一川

在各种 `JavaScript` 库和框架中，`React` 因其开发人员友好性和支持性而得到认可。

大多数开发人员发现 `React` 非常舒适且可扩展，因为它提供了钩子。钩子是 `React` 附带的内置 API，允许开发人员与 `React`的状态和生命周期功能进行交互。钩子在类内部不起作用，因此它们只能在功能组件中使用。开发人员还可以决定创建自定义钩子。

`React` 比大多数 UI 库更能让你重新思考设计标准，允许开发人员自定义UI组件，例如使用 `React` 和 `JSX` 的抽象机制而不是典型的 DOM 规范创建视图。

在本文中，我们将讨论 React钩子函数 `useRef` ，使用 `ref` 访问 DOM 以及 `ref` 和 `useRef` 之间的区别。

## 什么是useRef？

React 中包含的各种钩子之一是 `useRef` 钩子;它用于引用功能组件中的对象，并在重新渲染之间保留引用对象的状态。

`useRef` 有一个名为“`current`”的属性，用于随时检索引用对象的值，同时还接受初始值作为参数。您可以通过更新 `current` 值来更改引用对象的值。

以下是创建引用对象的方法：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useRef&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;‘react’<br><br><span data-darkreader-inline-color="">const</span>&nbsp;myComponent&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;refObj&nbsp;=&nbsp;useRef(initialValue)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//…</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></code>
```

在上面的代码片段中，我们有一个要在应用程序中引用的对象 `refObj` ，要访问值或更新值，我们可以像这样调用 `current` 该属性：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;inside&nbsp;a&nbsp;function</span><br><span data-darkreader-inline-color="">const</span>&nbsp;handleRefUpdate&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;accessing&nbsp;the&nbsp;referenced&nbsp;object’s&nbsp;value</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;value&nbsp;=&nbsp;refObj.current<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;updating&nbsp;the&nbsp;referenced&nbsp;object’s&nbsp;value</span><br>&nbsp;&nbsp;&nbsp;refObj.current&nbsp;=&nbsp;newValue<br>}<br></code>
```

您应该注意：

-   引用对象的值在重新渲染之间保持不变。
    
-   更新引用对象的值不会触发重新呈现。
    

## 使用 ref 访问 DOM 元素

请记住，`DOM` 元素也是对象，我们可以使用`useRef`引用它们。但是现在，我们需要利用另一个名为 `ref`。

`ref` 是一个 `HTML` 属性，它将引用的对象分配给 `DOM` 元素。让我们看看这是如何工作的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useRef}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;‘react’<br><br><span data-darkreader-inline-color="">const</span>&nbsp;myComponent&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;elementRef&nbsp;=&nbsp;useRef()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>input</span>&nbsp;<span>ref</span>=<span data-darkreader-inline-color="">{elementRef}</span>&nbsp;<span>type</span>=<span data-darkreader-inline-color="">”text”</span>&nbsp;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></code>
```

在上面的代码片段中，我们创建了一个新的引用对象，`elementRef` 并使用属性 `ref` 将其分配给输入标记。我们可以访问输入标签的值并像这样更新值：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;handleInput&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//accessing&nbsp;the&nbsp;input&nbsp;element&nbsp;value</span><br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;textValue&nbsp;=&nbsp;elementRef.current.value<br><br><br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;update&nbsp;the&nbsp;input&nbsp;element&nbsp;value</span><br>&nbsp;&nbsp;&nbsp;elementRef.current.value&nbsp;=&nbsp;“Hello&nbsp;World”<br>}<br></code>
```

在上面的代码片段中，我们创建了一个函数，该函数获取输入元素的当前值并将其分配给 `textValue`。我们还将输入元素的值更新为“`Hello World`”。

## Ref和useRef之间的区别

既然我们了解了`useRef`和`Ref`工作方式及它们的差异，让我们看看如何在实际应用程序中使用它们。例如，我们希望为弹出窗口实现一个点击离开事件侦听器。我们可以利用`ref`访问弹出窗口的 DOM 元素，并在弹出窗口外单击时进行侦听。

在你的react 应用中，你可以创建一个名为“`hooks`”的文件夹，这个文件夹将包含自定义钩子。

在文件夹中创建一个新文件 `useClickAway` ，并在文件中输入以下代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useEffect}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br>&nbsp;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">useClickAway</span>(<span>ref:&nbsp;any,&nbsp;callback:&nbsp;Function</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">handleClickAway</span>(<span>event:&nbsp;any</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(ref.current&nbsp;&amp;&amp;&nbsp;!ref.current.contains(event.target))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;callback();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;<span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">"mousedown"</span>,&nbsp;handleClickAway);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.removeEventListener(<span data-darkreader-inline-color="">"mousedown"</span>,&nbsp;handleClickAway);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;},&nbsp;[ref]);<br>&nbsp;};<br></code>
```

在上面的代码片段中，我们创建了一个接受引用对象作为 `ref` 和回调函数的自定义钩子，然后我们执行了一个事件侦听器来检查何时单击鼠标，如果单击不在当前 `ref` 上，则我们触发回调函数。

以下是产品页面上自定义挂钩的实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useRef&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react"</span>;<br><span data-darkreader-inline-color="">//..&nbsp;Other&nbsp;importations</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Storefront</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;targetElement&nbsp;=&nbsp;useRef(<span data-darkreader-inline-color="">null</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;alertClickAway&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;alert(<span data-darkreader-inline-color="">"Clicked&nbsp;outside&nbsp;product&nbsp;1"</span>)<br>&nbsp;}<br>&nbsp;useClickAway(targetElement,&nbsp;alertClickAway)<br>&nbsp;<span data-darkreader-inline-color="">//..&nbsp;Other&nbsp;functions</span><br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">//..&nbsp;Other&nbsp;parts&nbsp;of&nbsp;the&nbsp;application}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;className=<span data-darkreader-inline-color="">"gallery"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span>className</span>=<span data-darkreader-inline-color="">"col"</span>&nbsp;<span>ref</span>=<span data-darkreader-inline-color="">{targetElement}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>img</span>&nbsp;<span>src</span>=<span data-darkreader-inline-color="">"https://i.postimg.cc/G207QNV7/image.png"</span>&nbsp;<span>alt</span>=<span data-darkreader-inline-color="">"Product&nbsp;1"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>p</span>&gt;</span>iWatch&nbsp;Series&nbsp;6<span data-darkreader-inline-color="">&lt;/<span>p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span>className</span>=<span data-darkreader-inline-color="">"btns"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>img</span>&nbsp;<span>src</span>=<span data-darkreader-inline-color="">"https://api.iconify.design/flat-color-icons:like.svg?color=%23888888"</span>&nbsp;<span>alt</span>=<span data-darkreader-inline-color="">"like"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>img</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>src</span>=<span data-darkreader-inline-color="">"https://api.iconify.design/icon-park:buy.svg?color=%23888888"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>alt</span>=<span data-darkreader-inline-color="">"add"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span></span><br>&nbsp;)<br>}<br></code>
```

在上面的代码片段中，我们有一个店面组件，我们在其中导入了自定义钩子，然后我们创建了一个新的引用对象 `targetElement` 并将其分配给产品库中的 `div`，然后我们创建了一个回调函数`useClickAway`，以便在使用`ref`在产品项外部单击鼠标时发出警报 `targetElement` 。

现在让我们看看输出：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## Ref和useRef的使用案例

你现在对什么是`ref`以及`useRef`，以及它们的使用有了一定的了解。`ref`和`useRef`两者都很容易被滥用，会造成使用开销比较大。现在你可能需要考虑的是何时使用，以及如何尽可能避免使用。

以下是参考的一些用途：

-   与输入元素交互：通过使用 `refs` 可以访问输入元素并执行焦点、更改跟踪或自动完成等功能。
    
-   与第三方 UI 库交互：`ref` 可用于与第三方 UI 库创建的元素进行交互，这些元素使用标准 DOM 方法访问可能很棘手。例如，如果您使用第三方库生成滑块，则可以使用`ref`访问滑块的 DOM 元素，而无需被告知滑块库源代码的结构。
    
-   媒体播放：您还可以使用 `refs` 访问图像、音频或视频等媒体资产，并与它们的呈现方式进行交互。例如，当元素进入视口时自动播放视频或延迟加载图像。
    
-   复杂动画触发：传统上，`CSS` 关键帧或超时用于确定何时启动动画。在某些情况下（可能更复杂），您可以使用 `refs` 来观察 DOM 元素并确定何时开始动画。
    

在某些情况下（如下所示），不应使用引用：

-   声明性案例：即使在使用 `refs` 的简单解决方案的情况下，也无需编写更昂贵的代码来执行相同的任务。例如，使用条件渲染来隐藏或显示 DOM 元素而不是 `ref`。
    
-   影响状态的元素：有时，使用`refs`的概念非常有趣，以至于您忽略了对元素所做的修改对应用程序生命周期的影响。您应该记住，对 `ref` 的更改不会导致重新渲染，并且`ref`在渲染中保持其对象的值。因此，建议避免在状态更改需要触发重新渲染的情况下使用 `ref`。
    
-   访问功能组件：不应被误认为功能组件的 DOM 元素可以使用`Ref` 属性进行引用。因为，与类组件或 DOM 元素不同，功能组件没有实例。例如：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{useRef}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;‘react’<br><br><span data-darkreader-inline-color="">const</span>&nbsp;FunctionalComponent&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>h1</span>&gt;</span>Hello&nbsp;World<span data-darkreader-inline-color="">&lt;&gt;</span><br>)<br>}<br><br>const&nbsp;myComponent&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;elementRef&nbsp;=&nbsp;useRef()<br><br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>FunctionalComponent</span>&nbsp;<span>ref</span>=<span data-darkreader-inline-color="">{elementRef}</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></span></code>
```

由于组件 `FunctionalComponent` 没有实例，因此上述代码片段中的 `ref` 将不起作用。相反，我们可以将其转换为`FunctionalComponent`类组件或在 `FunctionalComponent` 组件的 `forwardRef` 中使用。

## 结论

在本文中，我们讨论了如何使用 `useRef` 钩子创建引用，该钩子采用初始值并修改引用对象的“`current`”属性的值以更新其值。

我们看到了如何将“`current`”值与“`ref`”一起使用来访问 DOM 元素并与其属互。

我们将介绍如何创建一个接受引用 DOM 元素的自定义钩子和一个回调函数，以便在应用程序中使用 “`ref`” 和 “`useRef`” 来观察 DOM 元素上的单击事件。

此外，我们还讨论了“`ref`”和“`useRef`”的用例，何时使用它们，何时不使用它们。

在了解了`ref` 以及`useRef` 如何在不重新渲染父组件的情况下跟踪和更新可变值之后，您可以通过查看`Refs` 和 `useRefs` 的 `React` 的相关官方文档，来探索更多关于它们的信息或了解更多信息，甚至尝试其他 `React` 钩子。

## 一川说

觉得文章不错的读者，不妨点个关注，收藏起来上班摸鱼的时候品尝。

欢迎关注笔者公众号「宇宙一码平川」，助你技术路上一码平川。