```
<section><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="0" data-is_biz_ban="0" data-origin_num="50" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><p data-style="outline: 0px; color: rgb(0, 0, 0); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">点击上方&nbsp;</span><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">React</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，关注公众号</span><span data-darkreader-inline-outline="" data-darkreader-inline-color=""></span></p><p data-style="outline: 0px; color: rgb(34, 34, 34); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; word-spacing: 0.8px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">回复</span><span data-style="outline: 0px; color: rgb(0, 0, 0); caret-color: rgb(51, 51, 51); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 14px; letter-spacing: 0.544px; word-spacing: 2px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">加群</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，加入技术交流群交流</span></p>
```

作者：字节商业化前端-Minoyu

链接：https://juejin.cn/post/7314493192187265074

这是我们团队号工程化系列的第二篇文章，将会来讲讲渲染性能优化。全系列文章如下，欢迎和大家一同交流讨论：

-   字节三年，谈谈一线团队如何搞工程化一（全景篇）
    

> 团队尚有HC，感兴趣的小伙伴可以私信~（注明期望岗位城市：北京、上海、杭州）

___

> 什么？今天我被 Leader 拉进小黑屋了！
> 
> “有很多用户吐槽咱的页面太卡了啊，这个情况你了解不？”，吓的我立马答道 “不可能，绝对不可能，我开发的时候可是一点都不卡...”
> 
> “你自己过来看看，你看这输入框，只要我**输入速度一变快，整个页面都肉眼可见的变卡了！** ”
> 
> “啊这，确...确实”，铁证如山 ，我一时无言以对，“怎么会这样呢，唉不对，这个页面配置下发的表单项也太多了吧，之前测试时可没有这么多...”
> 
> Leader 开始触发李氏连招，“**表单项多就是它卡的理由吗**，再说哪里多了？这么多年了中后台项目的表单项都是这么多，不要睁着眼睛乱说，中后台想做好很难的……有的时候找找自己原因，这么多年了技术水平涨没涨，有没有在认真工作？....”
> 
> “好好，我再去研究研究，想想办法......”
> 
> （以上对话纯属艺术加工，咱团队的 Leader 还是很 Nice 的 ：）

## 前言

对于前端开发攻城狮们来说，**性能优化**是一个永恒的话题。随着前端需求复杂度的不断升高，在项目中想始终保持着良好的性能也逐渐成为了一个有挑战的事情。本文会首先简述我们在 React 项目中**常用的一些性能优化方式**，并将从笔者近期参与的一个**实际业务需求出发**，讲述我在 React 中后台场景下所遇到**性能问题排查**时的**心路历程。**

本文标题中的卡顿减少，指的是对项目执行输入操作后，所花费的**单帧渲染耗时的降低比例**。单帧渲染耗时通过 React Developer Tools 插件测得。一般来说浏览器运行帧率为 60hz，因此对于帧率要求较高的场景如内容输入后的响应、动画等，需要尽可能的将单帧耗时控制在 **16.6** **ms**（1s / 60）以内，防止 JS 长期霸占主线程，用户才能完全**感知不到系统的卡顿**。同时，这方面的用户体验正是 Interaction to Next Paint （INP） 指标所衡量的。良好的 **INP** 指标意味着页面能够始终如一、迅捷可靠地响应用户的输入。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

## React 如何做性能优化

**事实上，React 框架本身为了追求高性能，已经做了非常多的努力。**

UI 更新需要进行昂贵的 DOM 操作，为此引入了虚拟 DOM，减少了实际 DOM 操作的次数，同时也为声明式、基于状态驱动的 UI 编程方式打开了大门。

为了追求最小化的 DOM 操作范围，提出了高效的 Diff 算法（Reconciliation），通过抽象出两个假设，将比较两棵 DOM 树差异的复杂度缩小到 O(n)。

从 React 16 开始引入了 Fiber 架构，“这是一种重新实现 React 核心算法的方式”，基于 JS 的`Generator`函数，使用协程的概念使得可中断的渲染成为可能，同时给不同的任务分配了优先级，从而在更小的粒度调度和优化 React 应用程序的渲染过程。

## 我们该怎么做？

站在了巨人的肩膀上，我们所能做的，便是在不添乱的前提下，**帮助React更快、更高效的完成遍历渲染的过程，使更新链路尽可能的短的走完**。这也是 React 性能优化的**核心目标**。

**一、控制组件重渲染的波及范围**，只让该更新的更新，不该更新的不更新，灵活运用`React.memo` 跳过重渲染。

-   在 React 的默认行为中，一个组件触发更新，那么它会递归遍历其所有子组件，生成新的虚拟 DOM 树，最后再进行 Diff，决定哪些需要提交到真实的 DOM 中。
    
-   尽管最后更新的实际 DOM 节点并不多，但组件调用和 Diff 的成本也是昂贵的。当变更的组件层级较高，或者组件内部逻辑复杂，将会导致一些性能问题。
    

**二、避免组件入参的不必要变更**，在使用 `memo` 对组件进行缓存后，默认情况下，React 将使用 `Object.is` 来浅比较每个 prop。这就意味着当存在数组、对象、函数等形式的入参时，需要格外注意，否则我们的 Memo 可能永远不会生效。

-   **对于需要生成** **数组** **、对象等场景**，可使用 `useMemo` 来跳过昂贵计算的重复生成，在不必要更新时保持对象的引用不变。尽量避免在 JSX 内直接写字面量来创建新的对象、数组。
    
-   **对于需向子组件传递** **回调函数** **等场景**，可使用 `useCallback` 来缓存所需传入的回调函数，使得此函数在父组件重渲染时不会被重新生成，保持函数引用的统一。尽量规避在 JSX 内传参时写内连函数，这会在每次渲染时创建一个新函数。
    
-   **对于使用了** **Context 上下文** **的场景**，向 Provider 传递 Value 时也需要格外注意。如果 Value 是一个对象类型，可以将其用 useMemo 包裹，否则所有依赖此上下文的子组件都将随着 Provider 的父组件的重渲染而渲染，哪怕此子组件已经被 memo 包裹。
    

**三、避免频繁、重复、无意义的 setState，** 调用 setState 即意味着即将触发重渲染，递归调用所有子组件的运行和 Diff 成本可能是昂贵的。

-   **和页面展示/更新无关的数据，不维护在 State 中。** 如果这个变量都不会在界面上显示，或者说，不会因为这个变量的改变而触发更新，可以考虑维护不在 State 中维护，例如，像用作计数器之类的变量，可以使用 useRef 存储。
    
-   **合并 state，减少频繁 setState 的场景。** 例如，在异步获取多个接口数据的场景中，相比各个接口请求完成后设置独立的 state，可以等待他们都请求完成之后，合并设置到一个 state 中。这样可以有效减少重渲染次数，毕竟中间设置的 state 引发的重渲染是没有意义的。
    

以上三点总结，是我们在日常开发迭代中，最常用且往往都能获得高收益的性能优化手段。

当然，React 性能优化方式还有很多，社区里也有较为充分的沉淀，我在这里就不多赘述了，推荐两篇文章，感兴趣的读者可以延伸阅读。

-   React 官方文档 性能优化篇 - 关于性能优化这块最官方的介绍
    
-   Twitter 分享 如何构建高性能的 React 应用
    

## 从一个实际业务需求出发

如何优化 React 项目的性能，方向是清晰的，但路线是曲折的。方法论我们是略知一二了，实际的需求场景可是五花八门。接下来我将从近期参与的一个实际业务需求出发，记录下我在这个项目中遇到性能问题时，**发现问题、解决问题**的**心路历程。**

## 优化效果

| 优化方式 | 优化前耗时 | 优化后耗时 | 提升百分比 |
| --- | --- | --- | --- |
| 通过Memo阻断整个表单部分重渲染问题，useCallback包裹回调方法。 | **195ms** | **88.3ms** | **54.71%** |
| 通过自行实现简易Diff拦截，减少不必要的setState调用。 | **88.3ms** | **25.9ms** | **70.6%** |
| 复杂计算使用useMemo缓存结果，抽出简单的纯函数组件，使用Memo包裹 | **25.9ms** | **9.5ms** | **63.3%** |
| **总计提升** | **195ms** | **9.5ms** | **95.14%** |

## 需求背景

首先咱们先来简单介绍下这个业务需求的大概背景。

为了更好的支持中后台业务上的**各种规则配置、预览等需求**，需要开发一套**模版字段编辑器组件。** 简单来说，就是来_让用户在左边的表单部分编辑相关字段的值，并在右边部分实时展示对应生成的规则结果_。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

通过这样的交互可以让用户更好的理解配置的内容，明确当前编辑的字段在整体复杂规则中所起到的位置和作用，并对最后生成的规则进行**实时预览**。

在实现上，为了降低各业务方的接入和维护成本，提升可扩展性，编辑器左侧的表单部分和右侧的模版部分均**采用配置化动态下发的形式**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

> **左侧的表单编辑部分**，与后端同学一同定义了一套描述表单的 JSON Schema 以实现配置的动态下发，前端对配置进行解析，渲染成实际的表单项，表单部分底层使用了 Antd 的 Form 来实现。
> 
> **右侧的模版部分**采用的是 HTML 格式，支持在 Html 中通过简单的标记语句标注来实现**字段插空、循环遍历、判断、表单值之间的联动**等功能，相当于在内部实现了一套简易的模版引擎，最终在展示时将解析成 React Element，以更方便的处理点击事件、样式变化等。

## 性能压测

作为一个通用组件，业务方在实际调用时，可能会以列表形式呈现，在一个页面中堆叠多个实例。因此，编辑器组件的性能表现就尤为关键。

一是不能让用户在编辑器内修改字段时、实时预览时感受到卡顿 ，保证编辑时的用户体验；

二是不能因为随着编辑器实例数量的增加，导致宿主页面出现卡顿的问题。

在按照常规思路完成了编辑器的实现之后，为了能更好的了解编辑器的性能表现，这里造了一个较为复杂的测试用例进行一个压力测试。

> **测试用例如下：**
> 
> 表单项 共计 90 项 (普通表单项 30 个，表格组件 20 行 \* 每行 3 个表单项)
> 
> 模版插空 共计 152 个 (普通插空 30 个，需循环遍历生成的语句共 3 段，共计遍历生成插空 122 个)

**测得优化前性能表现：**

聚焦某表单项（**171.1ms**） => 修改值（**195.5ms**） => 失焦（**140.5ms**）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 虽然说这是一个较为极端的测试用例，一般来说业务实际的配置字段可能不会有这么多。但从结果上看，我们实现的编辑器在这种重表单场景下的性能表现还是很拉垮的，进一步的性能优化刻不容缓。

## 排查思路

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

回到当前的项目中，在使用 React Developer Tools 插件开启了渲染时高亮后，我们可以很清晰的看到，表单项中**任意值的改变都会引发整个表单的重新渲染**。通过 Profiler 功能录制操作过程，也可以发现，目前在编辑器的实现中，任何值的改变都是**牵一发而动全身**的，表单部分占了渲染耗时的大头。

## 1\. 表单重渲染问题

编辑器通过向 Form 传递 onFieldsChange 方法来收集表单的当前值和校验状态，在右侧模版内容进行展示。计划先通过简单的二分法大致定位问题所在，在注释掉 Form 的 onFieldsChange 方法以及给每个字段的 onFocus、onBlur 方法后，对表单执行相同操作的耗时回落到了 0.9ms。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

> 这说明 Antd 的 Form 本身，在处理普通的输入项时的性能是很优秀的，内部做好了充分的 memo 优化，单个表单项改变时并不会引起整个表单的重渲染。
> 
> 推测主要的性能瓶颈在于对表单值的收集、以及对模版的解析和处理上。

由于对编辑器来说，对表单状态变化的实时监听是必不可少的，先把 onFieldsChange 加回去，看看问题出在哪。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，在 onFieldsChange 添加后，我这会把 Form 的当前表单值更新到一个 state 中，也许是这个全局 state 的变化导致了**整个 Form 的重渲染**，每一个值的改变耗时达到了 148ms，其中表单重渲染的开销占了 73.3ms，尝试对这部分先行优化。

在当前实现的层级中 Form 与我们存储的 formValue state 同属一个层级，因此 state 的改变必然导致 Form 的再次渲染。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**解决方案：**

1.  考虑对 Form 部分单独拆分组件，并使用 Memo 包裹。
    
2.  严格检查封装后 Form 组件的所有入参，尽量避免入参的变化，相关回调方法使用 callback 包裹,需要获取最新的 state 时，尽量使用 setState 的 function 形式，减少对外部 state 更新的直接依赖，造成方法引用的频繁改变
    

**效果评估：**

由于**有效的阻断了每次表单项改变时的全表重渲染**，优化效果是非常立竿见影的，渲染时长由 **195ms 降至 88.3ms**，提升了约 **54.71%**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 2\. 避免 State 的不必要更新

88.3ms 的每次更新耗时依然是远远不够的，这里注意到大部分的耗时都花在了最外层组件本身，`66.7ms of 88.3ms`，首先还是想在 onFieldsChange 方法内部继续寻找可能的优化点。

**onFieldsChange 优化**

我们可以先来看下原先 onFieldsChange 的实现，其实还是比较简单的，大致就是遍历 Form 中返回的 changedFields，然后在外部 State 对应的位置设置上新的值，最后通过浅拷贝设置一个全新的 State 对象。

由于需要尽量保持 onFieldsChange 方法的引用不变，因此此处使用 function 形式来更新 state。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**存在问题：**

1.  每次设置 setState 会设置一个全新的 formValue 对象，formValue 是一个较为复杂的大对象，右侧的渲染部分全部由它生成，Diff 的压力全部交给了 React 的 Virtual DOM 来完成。
    
2.  在测试时发现，Antd Form 的 onFieldsChange 在一个值更改、onBlur 时都可能会重复调用多次，例如下图场景，更改后触发了两次回调，value 值相同，errors 会在第二次调用时返回，如果不加拦截，也会带来不必要的状态更新。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**解决方案**

**新增简易的 Diff 方法**，当新值是简单值类型时，与原先值进行比较，如果完全一致，则拦截此次 setState。

由于我们希望 onFieldsChange 方法的引用不变，外层使用了 useCallback 进行包裹。因此我们这里使用了 function 的形式来设置新的 state，通过在最后返回原 state 对象的方式来拦截此次 setState。（ 确实有点 Hack 但真的很管用 ：）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**优化效果评估**

相当于我们在前置环节，更小的数据字段维度进行了更细粒度、成本更低的一个 Diff。通过输出 needUpdate 变量来观察，可以发现，有大量不必要的 setState 操作被拦截，可大幅减少后续的 Diff 成本

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

对相同输入项执行输入操作，外层组件的单次渲染时长再次由 **88.3ms** 降至 **25.9ms**，**提升了约 70.6%**，相较最开始的 195.5ms，**已提升了 86.7%，主观感受输入的卡顿感明显减少**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 3\. 复杂计算使用 useMemo 缓存结果

一般浏览器运行的帧率是每秒 60 帧，想要完全不卡，我们需将**每次渲染耗时控制在 16.6ms 以内 （1s/60）** 。25.9ms 的成绩与我们的目标还有一定的差距，需要进一步探索原因。

最外层的结构还是比较简单的，猜测的性能开销大户主要就是这两个钩子

> **useFieldList** 负责对后端下发的静态表单配置部分进行预处理和映射，生成表单所需要的配置项。
> 
> **useTemplate** 负责对模版进行解析，替换，生成模版的结果以及 React Element，这个钩子需要对表单值的变更进行实时监听。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**useFieldList**

尝试先从 useFieldList 入手，首先看它有没有性能问题。

这个组件内部的复杂计算，理论上只需要在配置变化时处理一次即可。如果说有不必要的重复计算，即可视为一个需要优化的问题。

通过打 log 输出排查，可以发现 FieldList 部分并没有随着表单值变化而重复计算，得出结论：**先前在开发时已经注重了此处的 Memo，性能表现是符合预期的。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**useTemplate**

接下来便是重点解决 useTemplate 了

这个钩子其实是一个比较难啃的部分，因为它必然需要在每次表单值变化时，重新对模版进行解析、遍历、替换上新的 FormValue、生成新的 ReactElement。

如果加上防抖来减少生成次数，也会给用户造成变更值后预览展示不实时的感觉，反而影响了用户体验。

单纯从 JS 业务逻辑上来看，这段代码是必须需要每次更新的，**每次计算也都最小依赖的 memo 住了，在这点上优化空间已经很小。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

## 4\. 纯函数组件使用 Memo 包裹

回到火焰图继续寻找线索，发现了一个有意思的情况：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

> 如果是这个钩子的 js 本身耗时比较高，那应该归到这个钩子调用的父组件，也就是 TemplateFieldEditor 部分。事实上我们看这个节点确实有一定计算的耗时，但充其量不过 8.3ms。依然有 20ms 左右是被子组件消耗掉的。
> 
> 在这里最后一个 rerender 的子组件，耗时 19.7ms，但本身只占用了 0.1ms 不到，但乍一看它并没有大量耗时的子组件存在了。

当 Devtool 宽度不足时，耗时较短的节点将会被省略。需要把 Devtool 宽度拉到很长，同时再在 React Devtools 设置的 Profiler 选项卡中，确认下取消勾选这里的 hide commits 选项。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

之后我们可以看到有很多耗时很短的子组件展示了出来，由于每个字段插空都被 Popover 包裹，绑定 onClick 事件等操作，内部也包含了一些简单的判断，每个组件大概耗时不到 0.1ms。

**星星之火可以燎原**，虽然单个个体看耗时微不足道，但在字段较多的极端场景下，还是会给 React 虚拟 DOM 的 Diff 带来不小的负担，最终造成卡顿感。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**优化方案**

我们可以将每一项子组件抽离出来，封装成简单的**纯函数组件**，并使用 React Memo 包裹。

> 一个函数的返回结果只依赖于它的参数、无任何副作用、相同的输入总能得到相同的输出，该函数就可以称为一个纯函数。《请保持你的组件纯粹》
> 
> 纯函数组件的优势在于我们可以通过**判断函数入参是否改变**，来决定是否**跳过渲染**。这是简单且安全的做法，因为纯函数总是返回相同的结果，可以安全地缓存它们。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

梳理依赖关系，尽量减少入参的更新，保持组件的纯粹。

> 例如：当前激活的对象的高亮，先前是传递激活的 id 进来，在内部判断是否是自己。可以改成在外部判断完，向内传递布尔值，减少子组件的重复渲染。
> 
> 指定 Memo 只去判断有可能变化的值，最小化 memo 的 diff 成本。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

**优化效果评估：**

对相同输入项执行相同的输入操作，外层组件的单次渲染时长再次减少明显，由 **25.9ms** 降至 **9.5ms**，再次提升了约 63.3%，相较最开始的 195.5ms，**已提升了 95.14%，输入时已感受不到任何卡顿和延迟**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

本文首先简述了发生卡顿的原因，并总结了日常开发中常用的React优化方式。我们所做的一切最终目标是为了帮助React**更快、更高效**的完成遍历渲染的过程，**使整个更新链路尽可能的短的走完**

> 1.  控制组件重渲染的波及范围
>     
> 2.  避免组件入参的不必要变更
>     
> 3.  避免频繁、重复、无意义的 setState
>     

随后通过上面的排查思路，我们已成功的将表单值改变时的渲染耗时**控制在了 9 毫秒左右**，此时用户进行常规编辑操作时，已感受不到任何卡顿，用户体验得到了很大程度的提升，通过下表我们可以快速回顾下所使用的优化方式。

| 优化方式 | 优化前耗时 | 优化后耗时 | 提升百分比 |
| --- | --- | --- | --- |
| 通过Memo阻断整个表单部分重渲染问题，useCallback包裹回调方法。 | **195ms** | **88.3ms** | **54.71%** |
| 通过自行实现简易Diff拦截，减少不必要的setState调用。 | **88.3ms** | **25.9ms** | **70.6%** |
| 复杂计算使用useMemo缓存结果，抽出简单的纯函数组件，使用Memo包裹 | **25.9ms** | **9.5ms** | **63.3%** |
| **总计提升** | **195ms** | **9.5ms** | **95.14%** |

## 写在最后

性能优化是一件**有价值、有挑战、也需要耐心、需要持续** **防劣化** **的事情**，在日常需求迭代中养成良好的开发习惯也是必不可少的。

同时，正如克努特原则所说——“**过早的优化是万恶之源**”。作为一个业务研发团队，我们需要分清当前项目中的主次要矛盾，不宜在开发的早期快速迭代阶段就过分追求性能优化。这可能会导致代码变得过于复杂、难以维护，并且容易引入难以理解的错误。

相比于过早优化，在早期阶段更重要的是**先确保代码的正确性和需求实现**。只有在这个基础上，**当项目逐渐趋于稳定后**，才能更好的进行有针对性的优化，以提升系统的性能。

```
<section data-tool="mdnice编辑器" data-website="https://www.mdnice.com" data-style="padding-right: 10px; padding-left: 10px; outline: 0px; color: black; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; letter-spacing: 0px; text-align: left; white-space: normal; line-height: 1.6; word-break: break-word; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 2px; word-spacing: 2px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline=""></span></span></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 2px; word-spacing: 2px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">欢迎关注「</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">React</span><span data-darkreader-inline-outline="">」</span></span></section><section data-style="margin-bottom: 0px; outline: 0px; background-color: rgb(255, 255, 255); font-size: 16px; text-align: left; white-space: normal; letter-spacing: 0.544px; color: rgb(102, 102, 102); font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-variant-ligatures: common-ligatures;" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor=""><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="2" data-is_biz_ban="0" has-insert-preloading="1" data-index="1" data-origin_num="50" data-isban="0" data-weui-theme="light" data-biz_account_status="0"></mp-common-profile></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 2px; word-spacing: 2px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">号内回复</span></span></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="">&nbsp;"<span data-darkreader-inline-outline="">精选</span>" ，将为您推送 历史精选文章"<span data-darkreader-inline-outline="">react"</span>&nbsp;，将为您推送 React.js 相关的学习资料&nbsp;"<span data-darkreader-inline-outline="">学习指南</span>" ，将为您推送 React-Native学习指南&nbsp;"<span data-darkreader-inline-outline="">vue</span>" ，将为您推送vue.js 相关文章&nbsp;"<span data-darkreader-inline-outline="">小程序</span>" ，将为您推送小程序相关文章&nbsp;"<span data-darkreader-inline-outline="">微信小商店</span>"，将为您推送小程序相关文章&nbsp;"<span data-darkreader-inline-outline="">加群</span>" ，添加群主好友拉你进群</section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="">加我私人微信，拉你进 React进阶、面试交流群，互相监督学习进步等！</section><p data-style="margin-bottom: 0em; outline: 0px; color: rgb(0, 0, 0); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-align: center;" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><img data-galleryid="" data-imgfileid="308971078" data-ratio="1.261480787253983" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/e93fo6YQKNlJReqfJKqeft8SuT9o4DliaoUIJqmbtBw72F7nYumlpJ5dxIvLfbNv5W0Nf1ZtIltr9bFsL4qd6fg/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" data-type="jpeg" data-w="1067" data-darkreader-inline-outline="" data-original-style="margin: 0px; padding: 0px; outline: 0px; border-style: none; vertical-align: bottom; border-radius: 3px; display: initial; box-sizing: border-box !important; height: auto !important; background-size: 16px !important; visibility: visible !important; width: 344px !important; --darkreader-inline-outline: initial;" data-index="31" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="344px" crossorigin="anonymous" alt="Image"><span data-style="outline: 0px; color: rgb(51, 51, 51); font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; word-spacing: 0.8px;" data-darkreader-inline-outline="" data-darkreader-inline-color=""></span></p><section data-brushtype="text" mp-original-font-size="16" mp-original-line-height="25.600000381469727" data-darkreader-inline-outline="" data-style="margin-bottom: 0em; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; background-color: rgb(255, 255, 255); color: rgb(89, 89, 89); font-size: 16px; white-space: normal; letter-spacing: 2px; font-variant-ligatures: common-ligatures; text-size-adjust: inherit; widows: 1; word-spacing: 2px; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; border-width: 0px; border-style: none; border-color: initial; text-align: right; line-height: 25.6px;" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuhpplm16ibb8iaib7RoGQ5iaHEdy66AHd7QqL7A2s5icSBE0aw4iaKOKPnXGYxQPhG7VMpbbYV6VJprSh7w/640?wx_fmt=png" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">“在看和转发”</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">就是最大的支持</span></section></section>
```