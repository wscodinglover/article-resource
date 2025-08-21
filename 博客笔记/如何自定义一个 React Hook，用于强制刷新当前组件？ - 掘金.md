## 写在前面

在 react 中，如果 state 数据发生变化，我们知道，会重新渲染该组件。

但是这个前提是我们需要依赖 state 数据的变化，那比如我们并不想定义 state，又或者说我们的操作不能引起 state 的变化，此时我们也想刷新组件怎么办？

这里我们就来实现一个自定义的 hooks，它的作用就是`强制刷新当前组件`。

## 实现

如果想刷新组件，很重要的一点就是改变 state，当 state 的值发生变化时，组件会重新渲染。

**一个重要的点：react hook 和组件的关系**

> -   当在组件中使用一个自定义 hook 时，这个 hook 的`状态和逻辑`会成为该组件的一部分。
> -   具体来说，hook 内部的状态会被`管理`在使用这个 hook 的组件的`状态树`中。

通俗点说就是，我们自定义一个 hook，并且在组件中使用，那这个 hook 的 state 也会成为这个组件的一部分，也就是 hook 的 state 变化，会引起使用该 hook 的组件的变化。

说的太多可能还不明白，我们直接看代码。

## hook

我们先自定义一个hook，实现原理就是利用 state 的变化，每次调用该 hook 的时候，state 的值都会发生变化。

> -   使用 useState 来存储一个计数器 tick。
> -   setTick 每次调用时会增加计数器，这会触发组件重新渲染。
> -   使用 useCallback 确保 forceUpdate 函数在组件的整个生命周期内保持相同的引用。
> -   返回 forceUpdate 函数，以便在使用这个 hook 的组件中调用它。

```js
import { useState, useCallback } from "react"; const useForceUpdate = () => { const [, setTick] = useState(0); // 只需要 setTick 函数，不需要 tick 值 const forceUpdate = useCallback(() => { setTick(tick => tick + 1); // 使用回调函数来确保更新基于最新状态 }, []); return forceUpdate; // 返回 forceUpdate 函数 }; export default useForceUpdate;
```

**忽略状态值**

这里的逗号（`,`）表示我们只解构出数组的第二个元素 `setTick`，而忽略第一个元素。

因为我们只需要 state 发生变化，不需要使用该 state，直接写为空也行。

```js
const [, setTick] = useState(0);
```

## 组件使用

组件使用就比较简单了，直接引入 useForceUpdate，并在需要调用的时机执行即可，为了证明是否刷新，我们打印了一条语句并执行了随机时间显示到页面上，我们来看一下效果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7312f869fd644839d245f1ee4f73cea~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=996&h=221&s=199675&e=gif&f=99&b=eef3f3)

```js
import React from "react"; import useForceUpdate from "./useForceUpdate"; const MyComponent = () => { const forceUpdate = useForceUpdate(); // 获取 forceUpdate 函数 const handleClick = () => { forceUpdate(); // 调用 forceUpdate 函数触发重新渲染 }; console.log('组件刷新！'); // 每次重新渲染时打印日志 return ( <div> <p>当前时间: {Date.now()}</p> <button onClick={handleClick}>强制刷新</button> </div> ); }; export default MyComponent;
```

## 总结一下

**为什么 `MyComponent` 会刷新？**

当我们在 `MyComponent` 中使用 `useForceUpdate` hook 时，`useForceUpdate` 内部的状态 `tick` 会成为 `MyComponent组件` 的一部分。

调用 `forceUpdate` 函数会更新 `tick` 状态，触发 `MyComponent` 的重新渲染。

这是因为 react 的状态更新机制会导致使用该状态的组件重新渲染，即使这个状态在组件中没有直接使用。