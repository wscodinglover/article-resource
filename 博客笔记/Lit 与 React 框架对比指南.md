![Image](https://mmbiz.qpic.cn/mmbiz_gif/9RM1R8UKDIYY8YKWQb1pQKyM9Im9uPOgYyIMol0VVzwZEAzLB5hENg20iaIqCOXPWCfYmzNHcTOthwgicJgwGN5w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)关注下方公众号，获取更多热点资讯![Image](https://mmbiz.qpic.cn/mmbiz_gif/9RM1R8UKDIYY8YKWQb1pQKyM9Im9uPOgYyIMol0VVzwZEAzLB5hENg20iaIqCOXPWCfYmzNHcTOthwgicJgwGN5w/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp)

![Image](https://mmbiz.qpic.cn/mmbiz_png/9RM1R8UKDIZQInasUkYQqWXyl395x7ibxgfeJgib8kRqqByw5YdKeictQHpo3BIaC6GYib7a2NoOicvtLEAZ3VibQRBg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

对于开发人员来说，选择前端框架可能是一个困难的决定，因为有太多的选择。React 是最受欢迎的选择之一，它已经建立了良好的基础，在 2022 年的 JS 状态调查中获得了 83% 的满意度。不过，还有其他一些具有有趣特性和功能的框架值得研究。

如果你有选择困难症，在为下一个项目选择框架时，建议你考虑以下问题：

-   **框架是否具有我所需要的功能？**
    
-   **框架的运行速度如何，是否优于其他框架？**
    
-   **框架的易学易用程度如何？**
    
-   **框架的社区规模如何？**
    

在 2022 年的 JS 状态调查中，Lit 的总体满意度为 70%。Lit 易于学习和使用。

![Image](https://mmbiz.qpic.cn/mmbiz_png/9RM1R8UKDIZQInasUkYQqWXyl395x7ibxiaRPN1pgECnG8PHaZFJTBcY3zKMAFeuhRvY9cFZjqggyYKKreU4e0bQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在谷歌的支持下，Lit.js 是现代 JavaScript 框架的快速替代品。它建立在Web Components 之上，只占用极少的模板空间，而这正是困扰现代 JavaScript 框架的问题所在。

Lit.js 由 Google 支持，是现代 JavaScript 框架的快速替代品。它建立在 `Web Components` 之上，只占用极少的模板空间，而这正是困扰现代 JavaScript 框架的问题所在。

本文首先对 Lit 做一个基本的介绍，从语法、模版、组件、hook、生命周期等方面与 React 做一个对比，最后讨论在下一个项目中是否要选择 Lit。

-   **Lit 基本介绍**
    
-   **Lit 与 React 全方位对比**
    
-   **如何选择？**
    

## 1.Lit 基本介绍

Lit 是 Google 提供的一组开源库，可帮助开发者构建快速、轻量且适用于任何框架的组件。借助 Lit，您可以构建可共享的组件、应用、设计系统等。

Lit 不同于其他前端框架的特点：

-   LitElement 基类是对原生 HTMLElement 方便而通用的扩展。该类可扩展用于定义自己的组件
    
-   富有表现力且声明式的模板使得定义组件的渲染方式变得容易。
    
-   响应式属性是 Lit 组件的内部状态。当响应式属性发生变化时，组件会自动重新渲染。
    
-   作用域样式有助于保持CSS选择器的简单性，确保组件样式不会影响其他上下文。
    
-   支持原生 JavaScript、TypeScript 和人性化（装饰器和类型声明）
    

刚刚 Lit 团队发布了最新一个大版本 Lit 3.0，带来了一些重大变化：

-   不再支持 IE11。
    
-   Lit的 npm 模块现已发布为 ES2021。
    
-   删除了 Lit 2.0 版本中废弃的 API。
    
-   SSR hydration支持模块已移至 `@lit-labs/ssr-client` 包。
    
-   在TypeScript 实验性装饰器和标准装饰器之间统一装饰器行为。
    
-   不再支持 Babel 装饰器 "2018-09" 版本
    

更多信息详见：[前端快讯｜Lit 3.0 已发布，再见 IE，你好 TC39 装饰器！](http://mp.weixin.qq.com/s?__biz=MzI2NjUxODkzOA==&mid=2247484910&idx=1&sn=98e277d7e6a869b14d664944a978ecf1&chksm=ea8dad1bddfa240d5fcd3da08e3c370048ede761374c155fab9221604b00c78f77e9b3d317d2&scene=21#wechat_redirect)

## 2.Lit 与 React 对比

Lit 的核心概念和功能在很多方面与 React 类似，React自2013年以来一直存在，并且比Lit更为流行，Lit 也与其存在一些重要的区别和差异：

### 2.1.包的体积

Lit 非常小：经缩减大小和 gzip 压缩后可减至 5kb 左右，而 React + ReactDOM 的大小超过 40kb。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2.2.渲染性能

在对 Lit 的模板系统 lit-html 与 React 的 VDOM 进行对比的公开基准测试中，lit-html 在最糟糕的情况下比 React 快 8-10%，在比较常见的用例中快 50% 以上。

LitElement（Lit 的组件基类）给 lit-html 增加的开销极低，但在内存用量、交互时间和启动用时等组件特性的对比中却比 React 的性能高 16-30%。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2.3.编译构建

借助新的浏览器功能（例如 ES 模块和带标记模板字面量），Lit 不需要编译即可运行。也就是说，您可以使用脚本标记、浏览器和服务器设置开发环境，然后 Lit 便可正常运行。

借助 ES 模块以及 Skypack 或 UNPKG 等现代 CDN，您甚至有可能无需 NPM 即可开始使用 Lit！

不过，如果您愿意，您仍可构建并优化 Lit 代码，Lit 就是常规 JavaScript，不需要框架专用的 CLI，也不需要构建处理。

### 2.4.与框架无关

Lit 的组件以一组名为 Web Components 的网页标准为基础构建。这意味着，在 Lit 中构建组件可确保在当前和未来的框架中都能正常工作。如果它支持 HTML 元素，那么它就支持 Web Components。

框架互操作性方面的唯一问题是有些框架对 DOM 的支持有限制。React 就是其中一种框架，不过它通过引用提供了解决办法，但 React 中的引用并不是让人愉快的开发者体验。

Lit 3.0 发布的 `@lit/react` 的项目，它会自动解析您的 Lit 组件并生成 React 封装容器，让您无需使用引用。

### 2.5.TypeScript 支持

虽然您可以使用 JavaScript 编写所有 Lit 代码，但 Lit 是使用 TypeScript 编写的，而且 Lit 团队也建议开发者使用 TypeScript！

Lit 团队一直与 Lit 社区合作来帮助维护项目，即使用 `lit-analyzer` 和 `lit-plugin` 在开发中和构建时实现 TypeScript 类型检查和 Lit 模板智能感知。

### 2.6.开发者工具内置

Lit 组件就是 DOM 中的 HTML 元素。这意味着，即使为了检查组件，您也不需要为浏览器安装任何工具或扩展程序。只需打开 `DevTools`，选择某个元素，然后浏览其属性或状态即可。

### 2.7.投入产出比

使用 Lit 不需要大量的投入！您可以在 Lit 中构建组件并将其添加到现有项目中。如果不喜欢这些组件，那么您不必立刻转换整个应用，因为网页组件可在其他框架中工作！

### 2.8.功能特性

#### 1）JSX 和模板

JSX 是 JavaScript 的语法扩展，其功能类似于模板语言，但具有 JavaScript 的全部功能。React 用户可以使用 JSX 在 JavaScript 代码中轻松编写模板。Lit 模板的作用与此类似，只是将组件 UI 表述为其状态的函数。

下面是 React 中的 JSX 模板示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;ReactDOM&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;<span data-darkreader-inline-color="">'World'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;el&nbsp;=&nbsp;(<br>&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello,&nbsp;{name}<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>How&nbsp;are&nbsp;you?&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>);<br>ReactDOM.render(<br>&nbsp;&nbsp;el,<br>&nbsp;&nbsp;mountNode<br>);<br></code>
```

下面是 Lit 中的 JSX 模板示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{html,&nbsp;render}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lit'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;<span data-darkreader-inline-color="">'World'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;el&nbsp;=&nbsp;html`<span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello,&nbsp;</span><span data-darkreader-inline-color="">${name}</span><span><span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>How&nbsp;are&nbsp;you?<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span>`</span>;<br><br>render(<br>&nbsp;&nbsp;el,<br>&nbsp;&nbsp;mountNode<br>);<br></code>
```

正如我们在上述示例中看到的，Lit 不需要 React 片段来在其模板中组合多个元素。相反，Lit 模板使用 HTML 标记的模板字面进行包装。

### 2）组件和属性

组件是自包含的、可重用的代码片段。它们执行的操作与 JavaScript 函数相同，但它们可以独立工作并返回 HTML。React 组件分为两种类型：类组件和函数组件。

**类组件：**

Lit 组件的等效物是 LitElement，它是一种基于 Lit HTML 模板编写组件的绝佳方式。LitElement 遵循面向对象编程（OOP）范例，并提供一个基类，帮助您管理其属性和各种属性API。

**函数组件：**

Lit 不使用 JSX，所以没有与 React 函数组件一一对应的对应关系。但是，可以更简单地编写一个接受属性并根据这些属性渲染 DOM 的函数。

下面是一个 React 函数组件的示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Welcome</span>(<span>props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello,&nbsp;{props.name}<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span></span>;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;el&nbsp;=&nbsp;<span>&lt;<span data-darkreader-inline-color="">Welcome</span>&nbsp;<span data-darkreader-inline-color="">name</span>=<span data-darkreader-inline-color="">"World"</span>/&gt;</span><br>ReactDOM.render(<br>&nbsp;&nbsp;el,<br>&nbsp;&nbsp;mountNode<br>);<br></code>
```

下面是一个 Lit 函数组件的示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{html,&nbsp;render}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lit'</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Welcome</span>(<span>props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;html`<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello,&nbsp;</span><span data-darkreader-inline-color="">${props.name}</span><span><span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span>`</span>;<br>}<br><br>render(<br>&nbsp;&nbsp;Welcome({<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'World}),<br>&nbsp;&nbsp;document.body.querySelector('</span>#root<span data-darkreader-inline-color="">')<br>);<br></span></code>
```

#### 3）状态和生命周期

`state` 是一个包含组件数据或信息的 React 对象。组件的状态可以随时间变化。每当状态改变时，组件重新渲染。

Lit 的响应性属性是 React 状态和属性的结合体。当发生变化时，响应性属性可以触发组件生命周期，重新渲染组件，并可以选择性地读取或写入属性。响应性属性有两种变体：

-   公共响应性属性
    
-   内部响应状态
    

React中的响应性属性实现如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state&nbsp;=&nbsp;{<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'there'</span>}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;componentWillReceiveProps(nextProps)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">this</span>.props.name&nbsp;!==&nbsp;nextProps.name)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({<span data-darkreader-inline-color="">name</span>:&nbsp;nextProps.name})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

Lit 的响应式属性示例如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{LitElement}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lit'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{property}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lit/decorators.js'</span>;<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">LitElement</span>&nbsp;</span>{<br>&nbsp;&nbsp;@property()&nbsp;name&nbsp;=&nbsp;<span data-darkreader-inline-color="">'there'</span>;<br>}<br></code>
```

内部响应状态指的是不暴露给组件公共 API 的响应式属性。这些状态属性缺乏相应的属性，并且不打算在组件外部使用。组件的内部响应状态应该由组件自身确定。

React 和 Lit 有相似的生命周期，但也有一些小而显著的差异。让我们更仔细地看一些这些框架共同拥有的方法。

**a）`constructor`**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;React</span><br><span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;Chart&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'chart.js'</span>;<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">counter</span>:&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._privateProp&nbsp;=&nbsp;<span data-darkreader-inline-color="">'private'</span>;<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Lit</span><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">LitElement</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;<span data-darkreader-inline-color="">get</span>&nbsp;properties()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">counter</span>:&nbsp;{<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">Number</span>}&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.counter&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._privateProp&nbsp;=&nbsp;<span data-darkreader-inline-color="">'private'</span>;<br>&nbsp;&nbsp;}<br>}<br></code>
```

**b）`render`**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;React</span><br>render()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Hello&nbsp;World<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Lit</span><br>render()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;html`<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Hello&nbsp;World<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span>`</span>;<br>}<br></code>
```

**c）`componentDidMount` vs `firstUpdated` and `connectedCallback`**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;React</span><br>componentDidMount()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._chart&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Chart(<span data-darkreader-inline-color="">this</span>.chartElRef.current,&nbsp;{...});<br>}<br><br>componentDidMount()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.window.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.boundOnResize);<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Lit</span><br>firstUpdated()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._chart&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Chart(<span data-darkreader-inline-color="">this</span>.chartEl,&nbsp;{...});<br>}<br><br>connectedCallback()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>.connectedCallback();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.window.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.boundOnResize);<br>}<br></code>
```

**d）`componentWillUnmount` vs `disconnectedCallback`**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;React</span><br>componentWillUnmount()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.window.removeEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.boundOnResize);<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Lit</span><br>disconnectedCallback()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>.disconnectedCallback();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.window.removeEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.boundOnResize);<br>}<br></code>
```

#### 4）React Hooks vs LitElement

Hooks 是一种允许 React 函数组件 “连接到” React 状态和生命周期特性的函数。Hooks 不能在类中使用，但是它们允许我们在不使用类的情况下使用React。

与 React 不同，Lit 不提供一种从函数创建自定义元素的方式，但是 LitElement 通过以下方式解决了大多数与React类组件的主要问题：

-   在构造函数中不接受参数
    
-   自动绑定所有@event绑定（通常是到自定义元素的引用）
    
-   将类属性实例化为类成员
    

下面是Hooks在React中的示例（在创建Hooks时的时间点上）：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;ReactDOM&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span>;<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props);&nbsp;<span data-darkreader-inline-color="">//&nbsp;Leaky&nbsp;implementation</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state&nbsp;=&nbsp;{<span data-darkreader-inline-color="">count</span>:&nbsp;<span data-darkreader-inline-color="">0</span>};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._chart&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Deemed&nbsp;messy</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Num&nbsp;times&nbsp;clicked&nbsp;{count}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{this.clickCallback}</span>&gt;</span>click&nbsp;me<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;clickCallback()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Errors&nbsp;because&nbsp;`this`&nbsp;no&nbsp;longer&nbsp;refers&nbsp;to&nbsp;the&nbsp;component</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({<span data-darkreader-inline-color="">count</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.count&nbsp;+&nbsp;<span data-darkreader-inline-color="">1</span>});<br>&nbsp;&nbsp;}<br>}<br></code>
```

实现相同的，使用 LitElement:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyEl</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">LitElement</span>&nbsp;</span>{<br>&nbsp;&nbsp;@property({<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">Number</span>})&nbsp;count&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;No&nbsp;need&nbsp;for&nbsp;constructor&nbsp;to&nbsp;set&nbsp;state</span><br>&nbsp;&nbsp;private&nbsp;_chart&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Public&nbsp;class&nbsp;fields&nbsp;introduced&nbsp;to&nbsp;JS&nbsp;in&nbsp;2019</span><br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;html<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;Num&nbsp;times&nbsp;clicked&nbsp;${count}&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;@click=${this.clickCallback}&gt;click&nbsp;me&lt;/</span>button&gt;<span data-darkreader-inline-color="">`;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;private&nbsp;clickCallback()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;No&nbsp;error&nbsp;because&nbsp;`</span><span data-darkreader-inline-color="">this</span><span data-darkreader-inline-color="">`&nbsp;refers&nbsp;to&nbsp;component<br>&nbsp;&nbsp;&nbsp;&nbsp;this.count++;<br>&nbsp;&nbsp;}<br>}<br></span></code>
```

#### 5）React 和 Lit 中的 Ref

Refs 是 React 函数，它允许我们访问 DOM 元素和我们创建的任何 React 元素。当我们想在不使用道具的情况下更改子组件的值时，就会用到它们。

在 Lit 中，使用 @query 和 @queryAll 装饰器创建 refs。这些装饰器几乎分别等同于 querySelector 和 querySelectorAll，并直接呈现到 DOM。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;React</span><br><span data-darkreader-inline-color="">const</span>&nbsp;RefsExample&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;inputRef&nbsp;=&nbsp;React.useRef(<span data-darkreader-inline-color="">null</span>);<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onButtonClick&nbsp;=&nbsp;React.useCallback(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;inputRef.current?.focus();<br>&nbsp;},&nbsp;[inputRef]);<br><br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">{</span>"<span data-darkreader-inline-color="">text</span>"}&nbsp;<span data-darkreader-inline-color="">ref</span>=<span data-darkreader-inline-color="">{inputRef}</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">br</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{onButtonClick}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click&nbsp;to&nbsp;focus&nbsp;on&nbsp;the&nbsp;input&nbsp;above!<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;);<br>};<br><br><br><span data-darkreader-inline-color="">//&nbsp;Lit:&nbsp;使用&nbsp;@query&nbsp;装饰器</span><br>@customElement(<span data-darkreader-inline-color="">"my-element"</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyElement</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">LitElement</span>&nbsp;</span>{<br>&nbsp;&nbsp;@query(<span data-darkreader-inline-color="">'input'</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;Define&nbsp;the&nbsp;query</span><br>&nbsp;&nbsp;inputEl!:&nbsp;HTMLInputElement;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Declare&nbsp;the&nbsp;prop</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Declare&nbsp;the&nbsp;click&nbsp;event&nbsp;listener</span><br>&nbsp;&nbsp;onButtonClick()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Use&nbsp;the&nbsp;query&nbsp;to&nbsp;focus</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.inputEl.focus();<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;html<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type=<span data-darkreader-inline-color="">"text"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">br</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!--&nbsp;Bind&nbsp;the&nbsp;click&nbsp;listener&nbsp;--&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">${this.onButtonClick}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click&nbsp;to&nbsp;focus&nbsp;on&nbsp;the&nbsp;input&nbsp;above!<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;;<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

## 3.如何选择？

每个框架都有其独特的优点和缺点。React支撑着许多大公司的网络应用，如Facebook、Twitter和Airbnb。它还拥有庞大的开发者和贡献者社区。

如果你目前正在使用 React 并对此选择感到满意，那么我认为您没有任何理由改用其他框架。但是，如果您正在开发的项目需要非常快的性能，那么您可以考虑使用 Lit。

如果你在公司内部项目有实践的机会，建议你试试 Lit，也许你会慢慢喜欢上它😍！