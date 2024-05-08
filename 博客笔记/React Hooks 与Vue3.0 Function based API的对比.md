## 【每日一题】(38题)谈谈React Hooks 与Vue3.0 Function based API的区别？

___

## 一、简述

**React Hooks** 是 React16.8 引入的新特性，支持在类组件之外使用 state、生命周期等特性。

**Vue Function-based API** 是 Vue3.0 最重要的 RFC (Requests for Comments)，将 2.x 中与组件逻辑相关的选项以 API函数 的形式重新设计。

目录：

•React Hooks•React Hooks是什么•useState Hook•useEffect Hook•React Hooks 引入的原因以及设计原则•React Hooks 使用原则及其背后的原理•Vue3.0 Function-based API•基本用法•引入的原因以及解决的问题•React Hooks 与 Vue3.0 Function-based API 的对比

## 二、React Hooks

### React Hooks 是什么？

引用官网的一段话：

> 从概念上讲，React 组件更像是函数。而 Hooks 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hooks 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

另外，Hooks 是100%向后兼容的，也是完全可选的。

React Hooks 提供了三个基础 Hook : `useState`、`useEffect`、`useContext`，其他 Hooks 可参考React Hooks API<sup>[1]</sup>。

### useState Hook

下面是一个实现计数器功能的类组件示例：

```
<span>import React from 'react';</span>
```

需求很简单，设定初始值为0，当点击按钮时，`count` 加 1。

当使用 useState Hook 实现上述需求时：

```
<span>import React, { useState } from 'react';</span>
```

其中 `useState Hook` 做了哪些事情呢？

1.在调用 useState 方法时，定义了一个state变量count，它与类组件中的this.state功能完全相同。对于普通变量，在函数退出后即消失，而state中的变量会被 React 保留。2.useState 方法只接收一个参数，那就是初始值。useState 方法一次只定义一个变量，如果想在state中存储两个变量，只需要调用两次 useState() 即可。3.useState 的返回值是一个由 `当前state` 以及 `更新state的函数` 组成的数组。这也是采用 **数组解构** 方式来获取的原因。

在使用 Hooks 实现的示例中，会发现 useState 让代码更加简洁了：

•获取state：类组件中使用 `this.state.count` ，而使用了 useSatet Hook 的函数组件中直接使用 `count` 即可。•更新state：类组件中使用 `this.setState()` 更新，函数组件中使用 `setCount()` 即可。

这里抛出几个疑问，在讲解原理的地方会进行详细解释：

•**React 是如何记住 useState 上次值的？**。•**React 是如何知道 useState 对应的是哪一个组件？**。•**如果一个组件内有多个 useState，那重新渲染时 useState 的取值顺序又是怎么确定的？**。

### useEffect Hook

在讲 `useEffect` 之前，先讲一下 React 的副作用。

在 React 中，数据获取、订阅或者手动修改DOM等操作，均被称为 '副作用'，或者 '作用' 。

而 useEffect 就是一个 Effect Hook ，为函数组件添加操作副作用的能力，可以把它看作是类组件中的`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`三个周期函数的组合。

下面是一个关于订阅的例子：

```
<span>import React from 'react';</span>
```

从上述的代码中不难发现，存在一定的重复代码，逻辑不得不拆分在三个生命周期内部。另外由于类组件不会默认绑定 this ，在定义 `handleStatusChange` 时，还需要为它 `绑定this`。

这里补充一点，对于类组件，需要**谨慎**对待 JSX 回调函数中的 `this`，类组件默认是不会绑定 this 的，下面提供几种绑定 this 的方法：

1.通常的做法是将事件处理函数声明为 class 中的方法，如：constructor内部 `this.handleClick = this.handleClick.bind(this)`2.在 onClick 内部使用箭头函数， 如：`onClick={e=>this.handleClick(id, e)}`，注意：该方法在每次渲染时都会创建不同的回调函数。在大多数情况下，没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。3.在 onClick 内部使用 bind 绑定， 如：`onClick={this.handleClick.bind(this, e)}`4.使用 class fields 绑定：如：`handleClick = (e) => {}`

这也是 React 引入 Hooks 的其中一个原因。

下面让我们看一下 useEffect Hook 是如何实现上述需求的：

```
<span>import React, { useState, useEffect } from 'react';</span>
```

在上述例子中，你可能会对 useEffect Hook 产生以下疑问：

1.useEffect 做了什么？首先，接收了一个函数，而 React 会保存这个函数(称为'effect')，并且在执行 DOM 更新后调用这个函数，即添加订阅。2.`[props.friend.id]` 参数设置了什么？•默认情况下，useEffect 接收一个函数作为第一个参数，在不设置第二个参数时，每一次渲染都会执行 effect，这有可能会导致性能问题。•为了解决这个问题，可添加第二个参数，用来控制什么时候将会执行更新，这时候就相当于 `componentDidUpdate` 做的事情。•如果想只运行一次 effect ，即仅在组件挂载和卸载时执行，第二个参数可传递一个空数组`[]`。3.在 useEffect 中为什么要返回一个函数呢？这是一个可选的操作，每一个 effect 都可以返回一个清除函数。在 React 中，有一些副作用是需要清除的，比如 监听函数、定时器等，这时候就需要为 effect 增加一个返回函数，React 会在组件卸载的时候执行清除操作。

Hooks 所提供的功能远不止这些，更多详细的介绍可以查阅官网文档<sup>[2]</sup>。

### React Hooks 引入的原因以及设计原则

React Hooks 具体解决了什么问题呢？React 为什么要引入这一特性呢？

主要有以下三点原因：

1.在组件之间复用状态逻辑很困难。•React 并没有提供将可复用行为附加到组件的途径，一般比较常见的方法是采用 `render props` 和 `高阶组件` 解决。•React Hooks 支持 `自定义Hook`，可以将状态逻辑从组件中提出，使得这些逻辑可进行单独测试、复用，在**无需修改组件结构**的情况下即可实现状态逻辑复用。点击查看自定义Hook使用说明<sup>[3]</sup>。2.复杂组件变得难以理解。•每个生命周期函数内部逻辑复杂、功能不单一，相互关联的需求被拆分在各个生命周期中，而不相关的代码却需要在同一个周期内部进行整合。•为了解决这个问题，React Hooks 将组件中相互关联的部分拆分成更小的函数，引入了 `Effect Hook`，如上述 useEffect 的示例，正是解决了这个问题。3.难以理解的class。•this绑定•打包尺寸，函数通过ES export导出，可以借助 tree-shaking 把没用到的函数移除；压缩混淆，类的属性和方法没法压缩•class热重载不稳定

### React Hooks 设计原则

主要有以下四点：

1.优雅高效的复用状态逻辑2.无 class 困扰3.具备 class 已有的能力4.功能单一的副作用

下面我们根据几个例子来感受 React Hooks 具体是如何体现的。

#### 1、优雅高效的复用状态逻辑

在之前，状态逻辑的复用一般是采用 `Mixins API`、`Render Props`或`HOC`实现，但是由于Render Props 与 HOC 本身也是组件，状态逻辑的复用也是通过封装组件的形式来实现，仍难以避免组件多层嵌套的问题，也比利于后续的理解与维护。

在 React Hooks 中，提供了 `自定义Hook` 来实现状态逻辑的复用。

比如 在聊天程序中，使用订阅获取好友的状态：

```
<span>import React, { useState, useEffect } from 'react';</span>
```

可以看到 useOnline 组件的逻辑是与业务完全无关的，它只是用来添加订阅、取消订阅，以获取用户的状态。

总结：

•数据来源清楚，之间根据函数返回值获得•代码量少，更易维护•避免重复创建组件带来性能损耗

**注意**

•自定义Hook 是一个函数，名称必须以 `'use'` 开头，这是一个约定，如果不遵循，React 将无法自动检测是否违反了 Hook 规则。•在函数的内部可以调用其他 Hook，但是请确保只在顶层无条件地调用其他Hook。•React 会根据名称来检测 Hook 是否违反了规则。•自定义 Hook 是一种重用状态逻辑的机制，每次使用时，内部 state 与副作用是完全隔离的。

#### 2、无 class 困扰

下面我们将根据一个具体例子 **实现根据点击事件，控制节点的展示或者隐藏的需求**，来对 `Render Props`、`HOC`、`Hooks`的实现方式做简单对比。

#### 使用 Render Props 实现

Render Props 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。

创建 `VisibilityHelper`

```
<span>import React from 'react';</span>
```

对 `VisibilityHelper` 的使用:

```
<span>import React from 'react';</span>
```

在 `<ButtonComponent>`组件中，我们使用了一个带有`函数prop`的 `<VisibilityHelper>`组件，实现了代码复用。

#### 使用 HOC 实现

高阶组件，是 React 中复用组件逻辑的一种高级技巧，是一种基于 React 组合特性而形成的设计模式。

定义高阶组件 `VisibilityHelper` ，注意 HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

```
<span>import React from 'react';</span>
```

#### 在 React Hooks 中是如何实现上述逻辑的呢？

```
<span>import React, { useState } from 'react';</span>
```

从对比中可以发现，使用 Hooks 更简洁，且不需要在担心this绑定地问题。

#### 3、具备 class 已有的能力

对于常用的 class 能力，Hooks 已经基本覆盖。

对于其他不常见的能力，官方给出的回应是：

> 目前暂时还没有对应不常用的 getSnapshotBeforeUpdate 和 componentDidCatch 生命周期的 Hook 等价写法，但我们计划尽早把它们加进来。目前 Hook 还处于早期阶段，一些第三方的库可能还暂时无法兼容 Hook。

#### 4、功能单一的副作用

通过文中的几个示例，应该可以了解到 useEffect Hook 便是设计用来解决副作用分散、逻辑不单一的问题。

在真实的应用场景中，可根据业务需要编写多个 useEffect。

### React Hooks 使用原则

两条使用原则：

1.只在最顶层使用 Hooks，不能在循环、条件或嵌套函数中调用 Hooks。这是为了保证 Hooks 在每一次渲染中都按照同样的顺序被调用。2.只能在 React 的函数组件中或者 自定义Hook 中调用 Hooks。确保组件的状态逻辑在代码中清晰可见。

这两条原则让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

### React Hooks 背后的原理

之前的抛出的疑问：

•**React 是如何记住 useState 上次值的？**。•**React 是如何知道 useState 对应的是哪一个组件？**。•**如果一个组件内有多个 useState，那重新渲染时 useState 的取值顺序又是怎么确定的？**。

在 React 中从编译到渲染成 Dom，都要经历这样的过程：`JSX -> Element -> FiberNode -> Dom`。

Hooks 要想和一个函数组件进行绑定， 就要和这个转换过程的某个节点进行关联，由于 Hooks 只有在 render 过程中进行调用，很明显就只能关联到 `FiberNode` 上。

在 FiberNode 上有 一个属性 `memoizedState`，这个属性在 class 组件中对应最终渲染的 state。

class 组件的state一般是一个对象，在 函数组件中变成 一个链表，如 class 组件 `memoizedState = {a: 1, b: 2} => 函数组件 memoizedState = {state: 1, next: {state: 2, next: ..}}`

每个链表的节点都是一个 useState，从而将所有 Hooks 进行串联起来。不仅仅 State Hook，其它 Hook 也是通过 memoizedState 串联起来的。

第一次渲染后，通过 FiberNode 的 memoizedState 将所有 Hook 进行收集完成。

当执行 setState 进行组件更新时，重新执行函数组件，这时会从收集的 Hooks 中按照执行顺讯依次取出，对于 State Hook 会进行计算将最新的值返回， Effect Hook 会在组件渲染结束后，先执行清除函数，再执行 副作用函数。

过程如图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

过程

## 三、Vue3.0 Function-based API

首先提一下 Vue Function-based API 的升级策略。

Vue3.0目前还未发布(预计2019年发布)，vue官方提供了Vue Function API<sup>[4]</sup>，支持Vue2.x版本使用组件**逻辑复用机制**。当3.0发布后，可无缝替换掉该库。

另外，Vue3.0计划发布两个不同版本：

•兼容版本：同时支持新 API 和 2.x 的所有选项•标准版本：只支持新 API 和部分 2.x 选项

下面是一个基础例子：

```
<span>import { value, computed, watch, onMounted } from 'vue'</span>
```

### Vue Function-based API 引入的原因及解决的问题

引入的原因，借用官方推出的一段话：

> 组件 API 设计所面对的核心问题之一就是如何组织逻辑，以及如何在多个组件之间抽取和复用逻辑。

其实也就是 React Hooks 引入时提到的：在组件之间复用状态逻辑很困难。

在Vue2.0中，有一些常见的逻辑复用模式，如：`Mixins`、`高阶组件`、`Renderless Components`，这些模式均或多或少的存在以下问题：

•模版中的数据来源不清晰•命名空间容易冲突•性能问题，需要额外的组件实例嵌套来封装逻辑，带来不必要的性能开销等

Function-based API 受 React Hooks 的启发，提供一个全新的逻辑复用方案，且不存在上述问题。

## 四、React Hooks 与 Vue Function-based API 的对比

两者均具有基于函数提取和复用逻辑的能力。

React Hooks 在每次组件渲染时都会调用，通过隐式地将状态挂载在当前的内部组件节点上，在下一次渲染时根据调用顺序取出。

而 Vue 的响应式 机制使 setup() 只需要在初始化时调用一次，状态通过引用储存在 setup() 的闭包内。这也是vue不受调用顺序限制的原因。