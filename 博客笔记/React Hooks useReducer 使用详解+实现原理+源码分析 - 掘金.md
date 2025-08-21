## 简介

`useReducer` => **useState 的高级方案**

官网说 `useReducer` 是 `useState` 的替代方案，我觉得说是 `useState` 的高级方案更合适  
因为 `useReducer` 本质的作用也是更新 `state`，另外它还支持自定义集成多种更新同一个 `state` 的规则

## 使用方法

![useReducer定义.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5417f56ac5294b5e9c57926e06457473~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

函数签名如下：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

### @param 第一个参数为处理 `state` 改变规则的函数 `reducer`

`reducer` 的参数含义：

```perl
- @param 第一个参数为要处理的 state - @param 第二个参数为 dispatch 绑定的 action（即 dispatch 函数的入参） - @return 返回更新 state
```

### @param 第二个是初始 `state`

### @param 第三个是可选的处理初始 `state` 的函数 `init`

### @return 返回当前 `state`

### @return 返回 `state` 对应的 `dispatch` 方法（触发 `state` 更新的方法 => 类比 `setState`）

```js
// 处理 初始state function init(initialCount) { return {count: initialCount}; } // 处理 state 更新规则的函数，并返回新的 state function reducer(state, action) { switch (action.type) { case 'increment': return {count: state.count + 1}; case 'decrement': return {count: state.count - 1}; case 'reset': return init(action.payload); default: throw new Error(); } } // 计数组件 function Counter({initialCount}) { const [state, dispatch] = useReducer(reducer, initialCount, init); return ( <> Count: {state.count} <button onClick={() => dispatch({type: 'reset', payload: initialCount})}> Reset </button> <button onClick={() => dispatch({type: 'decrement'})}>-</button> <button onClick={() => dispatch({type: 'increment'})}>+</button> </> ); }
```

## 源码分析👇👇👇

**Hook 公共的执行环境判断在useState文章里介绍过**，[点此跳转查看](https://juejin.cn/editor/drafts/7076445633866891272 "https://juejin.cn/editor/drafts/7076445633866891272")  
我们主要来看下 `moun` 阶段里 `mountReducer` 的实现 ，和 `update` 阶段里 `updateReducer` 的实现。

## mount 阶段

在 `mount` 阶段 `useReducer` 调用 `mountState`，`useReducer` 调用 `mountReducer`  
唯一区别就是它们创建的 `queue` 中 `lastRenderedReducer` 不一样，`useState` 默认传入 `basicStateReducer` => **useState 就是有默认 reducer 参数的 useReducer**

![mountReducer源码.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4eaec488f224f9697fb3e6dba81d696~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## update 阶段

![updateReducer源码.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12dc19b1cbf04b3da2898172b43961de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

其中循环处理 `state` 更新队列的原理如下图所示：  
场景：现有两次更新 `update1、update2`，新的更新 `update3、update4`

![循环处理state更新队列的原理流程图.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1845a32c44742b1ada5da7d16615b07~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## **总结：**

其实看到最后啊，我们发现 `useState` 和 `useReducer` 都只是进行数据更新的处理操作，而把新数据更新渲染到页面上，是 fiber 做的事。

在 `useReducer` 里会通过 `markWorkInProgressReceivedUpdate` 方法标记（也就是通知给 `fiber`）完成 `update` 的整合工作，接下来在经过 `fiber` 的调度，通知浏览器，进而表现在页面上。

这也就导致了**函数组件内部获取状态不能实时获取到最新状态**的原因，但是 `dispatch` 提供了函数式入参，这样 `react` 在执行 `queue` 的时候，会传递上一步的 `state` 值到当前函数中。

```ini
setCount(prevCount => prevCount + 1)}
```