生命周期是指组件从创建、更新到最终销毁的完整过程。在不同的阶段，`React` 内置了一些函数以便开发者用来执行不同的逻辑处理。

**装载阶段**

-   `constructor`
    
-   `static getDerivedStateFromProps`
    
-   `UNSAFE_componentWillMount`
    
-   `render`
    
-   `componentDidMount`
    

**更新阶段**

-   `UNSAFE_componentWillReceiveProps`
    
-   `static getDerivedStateFromProps`
    
-   `shouldComponentUpdate`
    
-   `UNSAFE_componentWillUpdate`
    
-   `render`
    
-   `getSnapshotBeforeUpdate`
    
-   `componentDidUpdate`
    

**卸载阶段**

-   `componentWillUnMount`
    

**错误捕获**

-   `static getDerivedStateFromError`
    
-   `componentDidCatch`
    

`React` 的作者 `Dan Abramov` 画了一张图来帮助我们更好地理解 `React` 的生命周期。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/kTnUXxRKH9wxzwxw8mCXqBrKlMicWnf1jlaIM9IYibzSiaWuOUjuv14FcQhWo8hicwJ0iaUv7IQo8dibzCVqJFXz8x3g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

生命周期图

**为什么部分生命周期要加 `UNSAFE_`**

在 `React 16` 之前，`React` 的更新都是采用递归的方式同步更新。生命周期一但开始，结束结束之前是不会停止的，所以像 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 都能顺序地正常执行。

而在 `React16` 中，采用 `Fiber` + `Time Slice` 的方式处理每个任务，任务是可以暂停和继续执行的。这意味着一次完整的执行中，挂载和更新之前的生命周期可能多次执行。所以在 `React 16.3.0` 中，将 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 前面加上了 `UNSAFE_`，一来是为了渐进式升级 `React`，不能一刀切。二来来提示使用者，这几个方法在新版本的 `React` 中使用起来可能会存在一些风险，建议使用最新的生命周期来开发，以防止出现一些意外的 `bug`。

对于不同生命周期的作用，想必大家都有所了解，不清楚的可以查看 官方文档 https://zh-hans.reactjs.org/docs/react-component.html 进行学习。

接下来，我们从一个简单的例子入手，顺着它的执行来看看生命周期在源码中是如何实现的。

## Demo 组件代码

初始化一个简单组件，组件会展示一个数字和一个按钮，每次点击按钮时，数字都会 `+ 1`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;App.jsx<br><br>import&nbsp;{&nbsp;useState&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br>import&nbsp;ChildComponent&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./ChildComponent'</span>;<br><br><span data-darkreader-inline-color="">function</span>&nbsp;<span><span data-darkreader-inline-color="">App</span></span>()&nbsp;{<br>&nbsp;&nbsp;const&nbsp;[show,&nbsp;setShow]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">true</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&lt;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;show&nbsp;&amp;&amp;&nbsp;&lt;ChildComponent&nbsp;count={count}&nbsp;/&gt;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;onClick={()&nbsp;=&gt;&nbsp;setShow(pre&nbsp;=&gt;&nbsp;!pre)}&gt;toggle&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/&gt;<br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;App;<br><br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;ChildComponent.jsx<br><br>import&nbsp;{&nbsp;Component&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;class&nbsp;ChildComponent&nbsp;extends&nbsp;Component&nbsp;{<br>&nbsp;&nbsp;constructor(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;super(props);<br>&nbsp;&nbsp;&nbsp;&nbsp;this.state&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num:&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">render</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;{&nbsp;num&nbsp;}&nbsp;=&nbsp;this.state;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;{num}&lt;/h1&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;onClick={()&nbsp;=&gt;&nbsp;this.setState({&nbsp;num:&nbsp;num&nbsp;+&nbsp;1&nbsp;})}&gt;点击我+1&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;}<br>}<br></code>
```

效果截图如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实现效果截图

当首次进来时，会进入装载 `Mounting` 阶段。

## 装载阶段

从 [第一棵 Fiber 树是如何生成的？](https://mp.weixin.qq.com/s?__biz=MzkzNDE4NjY1OA==&mid=2247484787&idx=1&sn=f3ca0cbbc853f5265c6a50e4fc5ba9b2&scene=21#wechat_redirect) 我们了解到，第一个组件、节点都会经历 `beginWork`、`completeWork`，首先来看一下，最早执行的 `constructor` 是在什么地方实现的。

### constructor

`beginWork` 中判断当前 `workInProgress.tag` 的类型，由于 `ChildComponent` 的 `tag` 是 `ClassComponent`，所以进入：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberBeginWork.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;beginWork(<br>&nbsp;&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;renderLanes:&nbsp;Lanes,<br>):&nbsp;Fiber&nbsp;|&nbsp;null&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;switch&nbsp;(workInProgress.tag)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;ClassComponent:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;updateClassComponent(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;workInProgress,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Component,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolvedProps,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderLanes,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>}<br></code>
```

这个方法是返回 `updateClassComponent` 方法执行后的返回值。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberBeginWork.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;updateClassComponent(<br>&nbsp;&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;Component:&nbsp;any,<br>&nbsp;&nbsp;nextProps:&nbsp;any,<br>&nbsp;&nbsp;renderLanes:&nbsp;Lanes,<br>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;instance&nbsp;=&nbsp;workInProgress.stateNode;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;shouldUpdate;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;根据组件&nbsp;stateNode（组件实例）的值是否为&nbsp;null，以此来判断应该创建组件还是更新组件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(instance&nbsp;===&nbsp;null)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;In&nbsp;the&nbsp;initial&nbsp;pass&nbsp;we&nbsp;might&nbsp;need&nbsp;to&nbsp;construct&nbsp;the&nbsp;instance.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;实例化组件，将组件实例与对应的&nbsp;fiber&nbsp;节点关联<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;constructClassInstance(workInProgress,&nbsp;Component,&nbsp;nextProps);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;将&nbsp;fiber&nbsp;上的&nbsp;state&nbsp;和&nbsp;props&nbsp;更新至组件上<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;并且会检查是否声明了&nbsp;getDervedStateFromProps&nbsp;生命周期<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;有的话则会调用并且使用&nbsp;getDerivedStateFromProps&nbsp;生命周期函数中返回的&nbsp;state&nbsp;来更新组件实例上的&nbsp;state<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;检查是否声明了&nbsp;componentDidMount&nbsp;生命周期，有的话则会收集标示添加到&nbsp;fiber&nbsp;的&nbsp;flags&nbsp;属性上<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mountClassInstance(workInProgress,&nbsp;Component,&nbsp;nextProps,&nbsp;renderLanes);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;创建组件肯定是需要更新的，所以直接为&nbsp;shouldUpdate&nbsp;赋值为&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shouldUpdate&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>}<br></code>
```

这里我们能看到两个关键方法，`constructClassInstance`、`mountClassInstance`。从字面意思上看，我们大概能猜出，这里可能会和 `React` 生命周期的 `constructor` 有关。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberClassComponent.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;constructClassInstance(<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;ctor:&nbsp;any,&nbsp;//&nbsp;ChildComponent<br>&nbsp;&nbsp;props:&nbsp;any,<br>):&nbsp;any&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;实例化组件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;instance&nbsp;=&nbsp;new&nbsp;ctor(props,&nbsp;context);<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;将获取到的组件上的&nbsp;state&nbsp;属性复制给&nbsp;workInProgress.memoizedState<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;state&nbsp;=&nbsp;(workInProgress.memoizedState&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance.state&nbsp;!==&nbsp;null&nbsp;&amp;&amp;&nbsp;instance.state&nbsp;!==&nbsp;undefined<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;instance.state<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;null);<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;将&nbsp;fiber&nbsp;节点与组件实例相互关联，在之前更新时可复用<br>&nbsp;&nbsp;&nbsp;&nbsp;adoptClassInstance(workInProgress,&nbsp;instance);<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(__DEV__)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;ctor.getDerivedStateFromProps&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;instance.getSnapshotBeforeUpdate&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillMountName&nbsp;!==&nbsp;null&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillReceivePropsName&nbsp;!==&nbsp;null&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillUpdateName&nbsp;!==&nbsp;null<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;componentName&nbsp;=&nbsp;getComponentNameFromType(ctor)&nbsp;||&nbsp;<span data-darkreader-inline-color="">'Component'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;newApiName&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;ctor.getDerivedStateFromProps&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">'getDerivedStateFromProps()'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">'getSnapshotBeforeUpdate()'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!didWarnAboutLegacyLifecyclesAndDerivedState.has(componentName))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;didWarnAboutLegacyLifecyclesAndDerivedState.add(componentName);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'Unsafe&nbsp;legacy&nbsp;lifecycles&nbsp;will&nbsp;not&nbsp;be&nbsp;called&nbsp;for&nbsp;components&nbsp;using&nbsp;new&nbsp;component&nbsp;APIs.\n\n'</span>&nbsp;+<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'%s&nbsp;uses&nbsp;%s&nbsp;but&nbsp;also&nbsp;contains&nbsp;the&nbsp;following&nbsp;legacy&nbsp;lifecycles:%s%s%s\n\n'</span>&nbsp;+<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'The&nbsp;above&nbsp;lifecycles&nbsp;should&nbsp;be&nbsp;removed.&nbsp;Learn&nbsp;more&nbsp;about&nbsp;this&nbsp;warning&nbsp;here:\n'</span>&nbsp;+<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'https://reactjs.org/link/unsafe-component-lifecycles'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentName,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newApiName,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillMountName&nbsp;!==&nbsp;null&nbsp;?&nbsp;`\n&nbsp;&nbsp;<span data-darkreader-inline-color="">${foundWillMountName}</span>`&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillReceivePropsName&nbsp;!==&nbsp;null<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;`\n&nbsp;&nbsp;<span data-darkreader-inline-color="">${foundWillReceivePropsName}</span>`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundWillUpdateName&nbsp;!==&nbsp;null&nbsp;?&nbsp;`\n&nbsp;&nbsp;<span data-darkreader-inline-color="">${foundWillUpdateName}</span>`&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;instance;<br>}<br></code>
```

这个方法中，调用 `new ctor(props, context)` 方法，向上找 `ctor` 是什么？在 `beginWork` 对就的 `case ClassComponent` 中可以看到，`ctor` 其它就是 `const Component = workInProgress.type;`，而 `workInProgress.type` 指向的就是 `ChildComponent` 这个 `class`。

通过 `new ctor(props, context)` 新建一个 `class` 的实例，自然，也就会执行这个 `class` 对应的 `constructor` 构造函数了。

此外，在开发环境中，如果我们使用了 `getDerivedStateFromProps` 或者 `getSnapshotBeforeUpdate`，同时又使用了 `UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps`、`UNSAFE_componentWillUpdate` 钩子方法，控制台中会进行报错提示，这也是在 `constructClassInstance` 方法中执行的。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用过期的钩子报错提示

> 小结：`constructor` 的执行位置是：`beginWork > updateClassComponent > constructClassInstance`。

### getDerivedStateFromProps & UNSAFE\_componentWillMount

执行完 `constructor` 生命周期后，继续执行 `mountClassInstance(workInProgress, Component, nextProps, renderLanes);`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberClassComponent.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;mountClassInstance(<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;ctor:&nbsp;any,<br>&nbsp;&nbsp;newProps:&nbsp;any,<br>&nbsp;&nbsp;renderLanes:&nbsp;Lanes,<br>):&nbsp;void&nbsp;{<br>&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;//&nbsp;检查当前组件是否声明了&nbsp;getDerivedStateFromProps&nbsp;生命周期函数<br>&nbsp;&nbsp;const&nbsp;getDerivedStateFromProps&nbsp;=&nbsp;ctor.getDerivedStateFromProps;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(typeof&nbsp;getDerivedStateFromProps&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;有声明的话则会调用并且使用&nbsp;getDerivedStateFromProps&nbsp;生命周期函数中返回的&nbsp;state&nbsp;来更新&nbsp;workInProgress.memoizedState<br>&nbsp;&nbsp;&nbsp;&nbsp;applyDerivedStateFromProps(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;workInProgress,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctor,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getDerivedStateFromProps,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newProps,<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;将更新了的&nbsp;state&nbsp;赋值给组件实例的&nbsp;state&nbsp;属性<br>&nbsp;&nbsp;&nbsp;&nbsp;instance.state&nbsp;=&nbsp;workInProgress.memoizedState;<br>&nbsp;&nbsp;}<br>}<br></code>
```

这个方法会判断组件中是否定义了 `getDerivedStateFromProps`，如果有就会执行 `applyDerivedStateFromProps` 方法：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">applyDerivedStateFromProps(<br>&nbsp;&nbsp;workInProgress,<br>&nbsp;&nbsp;ctor,<br>&nbsp;&nbsp;getDerivedStateFromProps,<br>&nbsp;&nbsp;newProps,<br>);<br></code>
```

在 `applyDerivedStateFromProps` 这个方法中，会调用组件的 `getDerivedStateFromProps` 方法，将方法的返回值赋值给 `workInProgress.memoizedState`，具体的实现方法如下所示：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberClassComponent.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;applyDerivedStateFromProps(<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;ctor:&nbsp;any,<br>&nbsp;&nbsp;getDerivedStateFromProps:&nbsp;(props:&nbsp;any,&nbsp;state:&nbsp;any)&nbsp;=&gt;&nbsp;any,<br>&nbsp;&nbsp;nextProps:&nbsp;any,<br>)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;prevState&nbsp;=&nbsp;workInProgress.memoizedState;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;partialState&nbsp;=&nbsp;getDerivedStateFromProps(nextProps,&nbsp;prevState);<br><br>&nbsp;&nbsp;//&nbsp;Merge&nbsp;the&nbsp;partial&nbsp;state&nbsp;and&nbsp;the&nbsp;previous&nbsp;state.<br>&nbsp;&nbsp;const&nbsp;memoizedState&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;partialState&nbsp;===&nbsp;null&nbsp;||&nbsp;partialState&nbsp;===&nbsp;undefined<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;prevState<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;assign({},&nbsp;prevState,&nbsp;partialState);<br>&nbsp;&nbsp;workInProgress.memoizedState&nbsp;=&nbsp;memoizedState;<br>&nbsp;&nbsp;//&nbsp;...<br>}<br></code>
```

在 `mountClassInstance` 方法中，还有这样的判断

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberClassComponent.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;mountClassInstance(<br>&nbsp;&nbsp;workInProgress:&nbsp;Fiber,<br>&nbsp;&nbsp;ctor:&nbsp;any,<br>&nbsp;&nbsp;newProps:&nbsp;any,<br>&nbsp;&nbsp;renderLanes:&nbsp;Lanes,<br>):&nbsp;void&nbsp;{<br>&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;//&nbsp;In&nbsp;order&nbsp;to&nbsp;support&nbsp;react-lifecycles-compat&nbsp;polyfilled&nbsp;components,<br>&nbsp;&nbsp;//&nbsp;Unsafe&nbsp;lifecycles&nbsp;should&nbsp;not&nbsp;be&nbsp;invoked&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;components&nbsp;using&nbsp;the&nbsp;new&nbsp;APIs.<br>&nbsp;&nbsp;//&nbsp;调用&nbsp;componentWillMount&nbsp;生命周期<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;ctor.getDerivedStateFromProps&nbsp;!==&nbsp;<span data-darkreader-inline-color="">'function'</span>&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;instance.getSnapshotBeforeUpdate&nbsp;!==&nbsp;<span data-darkreader-inline-color="">'function'</span>&nbsp;&amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;(typeof&nbsp;instance.UNSAFE_componentWillMount&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;typeof&nbsp;instance.componentWillMount&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)<br>&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;callComponentWillMount(workInProgress,&nbsp;instance);<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;If&nbsp;we&nbsp;had&nbsp;additional&nbsp;state&nbsp;updates&nbsp;during&nbsp;this&nbsp;life-cycle,&nbsp;<span data-darkreader-inline-color="">let</span><span data-darkreader-inline-color="">'s<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;process&nbsp;them&nbsp;now.<br>&nbsp;&nbsp;&nbsp;&nbsp;processUpdateQueue(workInProgress,&nbsp;newProps,&nbsp;instance,&nbsp;renderLanes);<br>&nbsp;&nbsp;&nbsp;&nbsp;instance.state&nbsp;=&nbsp;workInProgress.memoizedState;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;//&nbsp;判断是否声明了&nbsp;componentDidMount&nbsp;声明周期，声明了则会添加标识&nbsp;Update&nbsp;至&nbsp;flags&nbsp;中，在&nbsp;commit&nbsp;阶段使用<br>&nbsp;&nbsp;if&nbsp;(typeof&nbsp;instance.componentDidMount&nbsp;===&nbsp;'</span><span data-darkreader-inline-color="">function</span><span data-darkreader-inline-color="">')&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;fiberFlags:&nbsp;Flags&nbsp;=&nbsp;Update&nbsp;|&nbsp;LayoutStatic;<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress.flags&nbsp;|=&nbsp;fiberFlags;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;//&nbsp;...<br>}<br></span></code>
```

它的意思是，如果组件没有定义过 `getDerivedStateFromProps`、`getSnapshotBeforeUpdate` 方法，并且有定义 `componentWillMount` || `UNSAFE_componentWillMount` 方法，就会调用 `callComponentWillMount` 去执行 `componentWillMount` || `UNSAFE_componentWillMount` 方法。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;callComponentWillMount(workInProgress,&nbsp;instance)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;oldState&nbsp;=&nbsp;instance.state;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(typeof&nbsp;instance.componentWillMount&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;instance.componentWillMount();<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(typeof&nbsp;instance.UNSAFE_componentWillMount&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;instance.UNSAFE_componentWillMount();<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(oldState&nbsp;!==&nbsp;instance.state)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;classComponentUpdater.enqueueReplaceState(instance,&nbsp;instance.state,&nbsp;null);<br>&nbsp;&nbsp;}<br>}<br></code>
```

执行会判断 `oldState` 和 `instance.state` 是否相等，如果不相等，就会执行 `classComponentUpdater.enqueueReplaceState(instance, instance.state, null);`。

> 小结：`getDerivedStateFromProps()` 的调用位置是 `beginWork > updateClassComponent > mountClassInstance > applyDerivedStateFromProps`。
> 
> 如果没有定义 `getDerivedStateFromProps`、`getSnapshotBeforeUpdate`，有定义 `componentWillMount`、`UNSAFE_componentWillMount` 钩子会在 `beginWork > updateClassComponent > mountClassInstance > callComponentWillMount` 调用。

执行完对应的 `beginWork` 和 `completeWork` 后，就会进入到 `commit` 阶段。

引用一下 `React` 的核心思想

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;state&nbsp;=&nbsp;reconcile(update);<br>const&nbsp;UI&nbsp;=&nbsp;commit(state);<br></code>
```

通过 `const UI = commit(state);` 我们可以看出，`render` 应该是和 `commit` 阶段有关。

### render

`beginWork` 阶段执行了 `constructor`、`static getDerivedStateFromProps`、`UNSAFE_componentWillMount` 生命周期。如何将 `Fiber` 渲染到页面上，这就是 `render` 阶段。

具体将 `Fiber` 渲染到页面上的逻辑在 `commitRootImpl > commitMutationEffects` 处。完整的流程可以查看上一篇文章 [React 之第一棵树是如何渲染到页面上的？](https://mp.weixin.qq.com/s?__biz=MzkzNDE4NjY1OA==&mid=2247485010&idx=1&sn=9d0b6c9a3d48a455dc97ad860e766728&scene=21#wechat_redirect)，这里不再赘述。

### componentDidMount

在 `commitRootImpl` 方法中执行完 `commitMutationEffects` 将 `Fiber` 渲染到页面上后，继续执行 `commitRootImpl` 方法中的 `commitLayoutEffects` 方法。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberCommitWork.old.js<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;commitLayoutEffects(<br>&nbsp;&nbsp;finishedWork:&nbsp;Fiber,<br>&nbsp;&nbsp;root:&nbsp;FiberRoot,<br>&nbsp;&nbsp;committedLanes:&nbsp;Lanes,<br>):&nbsp;void&nbsp;{<br>&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;commitLayoutEffectOnFiber(root,&nbsp;current,&nbsp;finishedWork,&nbsp;committedLanes);<br>}<br></code>
```

`commitLayoutEffects` 方法里执行 `commitLayoutEffectOnFiber` 方法。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberCommitWork.old.js<br><br><span data-darkreader-inline-color="">function</span>&nbsp;commitLayoutEffectOnFiber(<br>&nbsp;&nbsp;finishedRoot:&nbsp;FiberRoot,<br>&nbsp;&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,<br>&nbsp;&nbsp;finishedWork:&nbsp;Fiber,<br>&nbsp;&nbsp;committedLanes:&nbsp;Lanes,<br>):&nbsp;void&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;ClassComponent:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursivelyTraverseLayoutEffects(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finishedRoot,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finishedWork,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;committedLanes,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(flags&nbsp;&amp;&nbsp;Update)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commitClassLayoutLifecycles(finishedWork,&nbsp;current);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>}<br></code>
```

经历过一些判断以及遍历，最后会进入 `case ClassComponent` 阶段的 `commitClassLayoutLifecycles` 中。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;packages\react-reconciler\src\ReactFiberCommitWork.old.js<br><span data-darkreader-inline-color="">function</span>&nbsp;commitClassLayoutLifecycles(<br>&nbsp;&nbsp;finishedWork:&nbsp;Fiber,<br>&nbsp;&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,<br>)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;instance&nbsp;=&nbsp;finishedWork.stateNode;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(current&nbsp;===&nbsp;null)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(shouldProfile(finishedWork))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance.componentDidMount();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;captureCommitPhaseError(finishedWork,&nbsp;finishedWork.return,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;prevProps&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finishedWork.elementType&nbsp;===&nbsp;finishedWork.type<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;current.memoizedProps<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;resolveDefaultProps(finishedWork.type,&nbsp;current.memoizedProps);<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;prevState&nbsp;=&nbsp;current.memoizedState;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(shouldProfile(finishedWork))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance.componentDidUpdate(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prevProps,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prevState,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance.__reactInternalSnapshotBeforeUpdate,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;captureCommitPhaseError(finishedWork,&nbsp;finishedWork.return,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

从这个方法中可以看出，如果 `current === null` （首次加载），就会调用 `instance.componentDidMount();`。如果 `current !== null`（更新），就会调用 `instance.componentDidUpdate`。

> 小结：`componentDidMount` 的执行位置是：`commitRoot > commitRootImpl > commitLayoutEffects > commitLayoutEffectOnFiber > recursivelyTraverseLayoutEffects > commitClassLayoutLifecycles`。

完成的代码执行流程图如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

创建流程图

到目前为止，装载阶段的生命周期就完成了，下面，来看一下更新阶段的生命周期是如何实现的。

## 更新阶段

当我们点击 `Demo` 中的 `点击我+1` 按钮，数字 `1` 将变成 `2`，在此期间，会怎样执行呢？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击按钮更新数字

通过 `setState` 触发 `React` 更新。`React` 会从 `FiberRoot` 开始进行处理。

> 提个问题：为什么每次更新 `React` 都要从根节点开始执行？它是如何保证性能的？这样做的原因是什么？为什么它不从更新的组件开始？
> 
> 这个问题先提到这里，后面再单独总结。

为方便理解，这里将代码的执行流程做成了一个流程图，具体如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更新流程图

当 `workInProgress` 经过 `workLoop` 遍历到 `ChildComponent` 时，又会开始进入它的 `beginWork`。通过之前的学习，我们了解到，在 `Mounting` 阶段，`current` 为 `null`，更新阶段 `current` 不为 `null`。再加上 `ChildComponent` 的 `type` 类型为 `ClassComponent`，所以 `ChildComponent` 会执行 `updateClassComponent` 方法。

执行 `updateClassInstance` 方法，在这个方法中会判断组件中是否定义了 `getDerivedStateFromProps` 或者 `getSnapshotBeforeUpdate`。如果没有定义，才会检查是否有定义 `*_componentWillReceiveProps` 方法并执行它。如果这两种都存在，在 `Mounting` 阶段执行 `constructClassInstance` 就会打印 `error` 信息。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用过期的钩子报错提示

继续执行后面的代码，发现如果组件中有定义 `getDerivedStateFromProps` 就会执行 `getDerivedStateFromProps` 方法，将方法的返回值挂载到 `workInProgress.memoizedState`，所以这个方法可以用来在渲染前根据新的 `props` 和旧的 `state` 计算衍生数据。

执行完 `getDerivedStateFromProps` 就会开始检查是否定义了 `shouldComponentUpdate`，如果有定义，执行 `shouldComponentUpdate` 方法，并将方法的返回值用于判断页面是否需要更新的依据。如果返回 `true`，说明需要更新，如果此时组件中有定义 `componentWillUpdate` 也会执行它，然后根据条件修改 `workInProgress.flags` 的值为 `Update` 或者 `Snapshot`。在 `commit` 阶段，会根据不同的 `flags` 对组件进行不同的处理。

调用 `render` 方法，拿到当前组件的子节点内容。

在将新的内容 `commitMutationEffects` （将新节点渲染到页面之前），调用 `getSnapshotBeforeUpdate`。所以在 `getSnapshotBeforeUpdate` 中，我们可以访问更新前的 `props` 和 `state` 以及旧的 `DOM` 节点信息，并且它的返回值会绑定到当前 `Fiber` 节点的 `__reactInternalSnapshotBeforeUpdate` 属性上面，这个参数会作为后面的 `componentDidUpdate` 钩子的第三个参数调用。

> 这个特性在处理渲染页面前，需要获取之前的页面信息，并根据之前的页面信息执行一些新的交互上有奇效。比如：收到新消息时，需要自动滚动到新消息处。

执行完 `getSnapshotBeforeUpdate`，继续执行 `commitLayoutEffects`，然后在 `commitLayoutEffectOnFiber` 里面经过不同的 `case` 调用  `recursivelyTraverseLayoutEffects` 方法，这个方法又会将 `parentFiber.child` 作为参数继续调用 `commitLayoutEffectOnFiber`，直到找到 `ChildComponent`。执行完 `case ClassComponent` 里面的 `recursivelyTraverseLayoutEffects` 方法，就会开始调用 `commitClassLayoutLifecycles` 方法，这个方法中就会判断，如果有定义 `componentDidUpdate` 就会执行它。如果有执行 `getSnapshotBeforeUpdate`，还会将它的返回值作为第三个参数传给 `componentDidUpdate` 来执行。

> 小结：到目前为止，更新阶段就执行完了。有一些不再维护的生命周期，会根据组件中是否有定义最新的一些生命周期来判断是否需要执行。

## 卸载阶段

当点击 `Demo` 中的 `toggle` 按钮时，会触发 `setShow(false)`。此时页面的展示代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;div&nbsp;style={{&nbsp;padding:&nbsp;20&nbsp;}}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">false</span>&nbsp;&amp;&amp;&nbsp;&lt;ChildComponent&nbsp;count={count}&nbsp;/&gt;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;onClick={()&nbsp;=&gt;&nbsp;setShow(pre&nbsp;=&gt;&nbsp;!pre)}&gt;toggle&lt;/button&gt;<br>&lt;/div&gt;<br></code>
```

`React` 又开始对每个节点进行 `beginWork`。当遍历到 `App` 节点时，它下面有两个子节点，`false` & `<button>` 按钮。进入 `reconcileChildrenArray` 进行 `diff` 算法的比较。当比较 `{ false && <ChildComponent count={count} />}` 时，发现这个节点的值是 `boolean`，它是一个条件判断值，和需要渲染的任何类型都不相关，此时，会将这个节点对应的原来的 `<ChildComponent count={count} />` 添加到它的 `returnFiber` 也就是 `App Fiber` 的 `deleteChild` 属性中，并添加 `App Fiber` 的 `Flag` 为 `ChildDeletion`。这个在 `commit` 阶段，也会遍历节点，如果发现节点有 `deleteChild` 值，在 `commitMutationEffects` 时就会对这个节点进行删除。

真正执行删除前，如果组件中有定义 `componentWillUnmount`，会对 `componentWillUnmount` 进行调用。调用结束后，会执行 `parentInstance.removeChild(child)` 将节点从页面中真正的移除。

完整的执行流程图如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

卸载执行流程图

## 总结

通过上面的学习以及每个步骤的小结，我们知道了 `装载`、`更新`、`卸载` 的具体实现原理。但也留下了几个疑问：

-   为什么每次更新都要从 `FiberRoot` 节点开始？
    
-   错误处理是如何实现的？
    
-   `diff` 算法的具体实现逻辑是什么？
    
-   现在都推荐使用 `Hooks` 写法，`Class` 写法以及它的生命周期还有什么作用，还需要这样深入学习吗？
    
-   `Hooks` 的生命周期是如何实现的？
    

这里的每一个疑问都值得好好思考，后面再单独总结。

最后，文章如果有写得不对的地方，欢迎指正、一起探讨！！！