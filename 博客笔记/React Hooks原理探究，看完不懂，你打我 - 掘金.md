## 概览

React 中通常使用 类定义 或者 函数定义 创建组件:

在类定义中，我们可以使用到许多 React 特性，例如 state、 各种组件生命周期钩子等，但是在函数定义中，我们却无能为力，因此 React 16.8 版本推出了一个新功能 (React Hooks)，通过它，可以更好的在函数定义组件中使用 React 特性。

**好处:**

1、跨组件复用: 其实 render props / HOC 也是为了复用，相比于它们，Hooks 作为官方的底层 API，最为轻量，而且改造成本小，不会影响原来的组件层次结构和传说中的嵌套地狱；

2、类定义更为复杂: 不同的生命周期会使逻辑变得分散且混乱，不易维护和管理； 时刻需要关注this的指向问题； 代码复用代价高，高阶组件的使用经常会使整个组件树变得臃肿；

3、状态与UI隔离: 正是由于 Hooks 的特性，状态逻辑会变成更小的粒度，并且极容易被抽象成一个自定义 Hooks，组件中的状态和 UI 变得更为清晰和隔离。

**注意:**

避免在 循环/条件判断/嵌套函数 中调用 hooks，保证调用顺序的稳定； 只有 函数定义组件 和 hooks 可以调用 hooks，避免在 类组件 或者 普通函数 中调用； 不能在useEffect中使用useState，React 会报错提示； 类组件不会被替换或废弃，不需要强制改造类组件，两种方式能并存；

**重要钩子:**

-   useState: 用于定义组件的 State，对标到类组件中this.state的功能
-   useEffect：通过依赖触发的钩子函数，常用于模拟类组件中的componentDidMount，componentDidUpdate，componentWillUnmount方法
-   其它内置钩子:useContext: 获取 context 对象
-   useReducer: 类似于 Redux 思想的实现，但其并不足以替代 Redux，可以理解成一个组件内部的 redux，并不是持久化存储，会随着组件被销毁而销毁；属于组件内部，各个组件是相互隔离的，单纯用它并无法共享数据；配合useContext的全局性，可以完成一个轻量级的 Redux
-   useCallback: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；
-   useMemo: 用于缓存传入的 props，避免依赖的组件每次都重新渲染；
-   useRef: 获取组件的真实节点；
-   useLayoutEffect：DOM更新同步钩子。用法与useEffect类似，只是区别于执行时间点的不同。useEffect属于异步执行，并不会等待 DOM 真正渲染后执行，而useLayoutEffect则会真正渲染后才触发；可以获取更新后的 state；
-   自定义钩子(useXxxxx): 基于 Hooks 可以引用其它 Hooks 这个特性，我们可以编写自定义钩子。

## 利用数组模拟useState的实现原理

我们可以使用Array模拟useState的原理，正如文章[React hooks: not magic, just arrays](https://link.juejin.cn/?target=https%3A%2F%2Fmedium.com%2F%40ryardley%2Freact-hooks-not-magic-just-arrays-cd4f1857236e "https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e")所说，但是React底层真实的实现，是利用的链表，这里我们下面会说到

当调用 useState 的时候，会返回形如 (变量, 函数) 的一个元祖。并且 state 的初始值就是外部调用 useState 的时候，传入的参数。

理清楚了传参和返回值，再来看下 useState 还做了些什么。正如下面代码所示，当点击按钮的时候，执行setNum，状态 num 被更新，并且 UI 视图更新。显然，useState 返回的用于更改状态的函数，自动调用了render方法来触发视图更新。

```js
function App() { const [num, setNum] = useState(0); return ( <div> <div>num: {num}</div> <button onClick={() => setNum(num + 1)}>加 1</button> </div> ); }
```

**初步模拟**

```js
function render() { ReactDOM.render(<App />, document.getElementById("root")); } let state; function useState(initialState){ state = state || initialState; function setState(newState) { state = newState; render(); } return [state, setState]; } render(); // 首次渲染
```

**初步模拟让我们发现了Hooks的第一个核心原理：`闭包`，是的Hooks返回的`state`和`setState`方法，在hooks内部都是利用闭包实现的**

但是真实的`useXXX`都是可以多次声明使用的，所以我们这里的初步实现并不支持对多个变量声明

## 为什么不能在循环、判断内部使用Hook

**首先，利用Array模拟React Hook原理**

前面 useState 的简单实现里，初始的状态是保存在一个全局变量中的。以此类推，多个状态，应该是保存在一个专门的全局容器中。这个容器，就是一个朴实无华的 Array 对象。具体过程如下：

-   第一次渲染时候，根据 useState 顺序，逐个声明 state 并且将其放入全局 Array 中。每次声明 state，都要将 cursor 增加 1。
-   更新 state，触发再次渲染的时候。cursor 被重置为 0。按照 useState 的声明顺序，依次拿出最新的 state 的值，视图更新。

举例：

```js
function RenderFunctionComponent() { const [firstName, setFirstName] = useState("Rudi"); const [lastName, setLastName] = useState("Yardley"); return ( <Button onClick={() => setFirstName("Fred")}>Fred</Button> ); }
```

**上面代码的创建流程**

**1）初始化**

创建两个Array， `setters` and `state`，设置游标cursor = 0；

![hooks_create_1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ad0a0b1d0884e12b895eca1541cdaa6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**2) 首次渲染**

遍历所有的`useState`，将`setters`push进入数组，将`state`push进入状态数组

![hooks_create_2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f258426af1514a2e99d020b136f769ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**3）重渲染**

后续的每次重渲染都会重置游标cursor = 0，并依次从数组中取出之前的state

**4）事件触发**

每个事件都有对应游标的state值，任何state事件触发，都会修改state数组中对应的state值

![hooks_create_3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d497c9979c644d3a5e104339420f307~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**完整模拟useState**

```js
import React from "react"; import ReactDOM from "react-dom"; const states = []; let cursor = 0; function useState(initialState) { const currenCursor = cursor; states[currenCursor] = states[currenCursor] || initialState; // 检查是否渲染过 function setState(newState) { states[currenCursor] = newState; render(); } cursor+=1; // 更新游标 return [states[currenCursor], setState]; } function App() { const [count1, setCount1] = useState(0); const [count2, setCount2] = useState(1); return ( <div> <div>count1: {count1}</div> <div> <button onClick={() => setCount1(count1 + 1)}>add1 1</button> <button onClick={() => setCount1(count1 - 1)}>delete1 1</button> </div> <hr /> <div>num2: {num2}</div> <div> <button onClick={() => setCount2(count2 + 1)}>add2 1</button> <button onClick={() => setCount2(count2 - 1)}>delete2 1</button> </div> </div> ); } function render() { ReactDOM.render(<App />, document.getElementById("root")); cursor = 0; // 重置cursor } render(); // 首次渲染
```

**如果在循环，判断中使用Hooks**

```js
let firstRender = true; function RenderFunctionComponent() { let initName; if(firstRender){ [initName] = useState("Rudi"); firstRender = false; } const [firstName, setFirstName] = useState(initName); const [lastName, setLastName] = useState("Yardley"); return ( <Button onClick={() => setFirstName("Fred")}>Fred</Button> ); }
```

**创建流程示意图**

![hooks_create_4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/180650d0ddb74b939a2ec65ed4e05865~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**重渲染**

![hooks_create_5.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c904c913c5b4d75952d545553b39194~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到，因为`firstRender`的条件判断，游标为0的state值会被异常设置成`useState(initName)`，游标为1的state会被异常设置成`useState("Yardley")`，而其实`Yardley`是游标为2的state的值

也就是说初始化组件的时候，hooks会直接维护一套数组，对应相应的state和setState方法，如果在条件渲染中使用，会导致重渲染的时候，异常的游标对应，异常的游标对应也会导致调用的setState方法失效

## 模拟useEffect的实现原理

`useEffect`可能是我们在使用hooks的时候，使用频率仅次于`useState`的的钩子方法了，它的作用是`副作用`，说直白就是某些state或者props变化的时候，需要监听并执行相应的操作，那么我们就需要使用`useEffect`了，对标就是Class组件中的componentDidMount，componentDidUpdate，componentWillUnmount方法的集合

**模拟实现（依然是利用Array + Cursor的思路）**

```js
const allDeps = []; let effectCursor = 0; function useEffect(callback, deps = []) { if (!allDeps[effectCursor]) { // 初次渲染：赋值 + 调用回调函数 allDeps[effectCursor] = deps; effectCursor+=1; callback(); return; } const currenEffectCursor = effectCursor; const rawDeps = allDeps[currenEffectCursor]; // 检测依赖项是否发生变化，发生变化需要重新render const isChanged = rawDeps.some( (dep,index) => dep !== deps[index] ); // 依赖变化 if (isChanged) { // 执行回调 callback(); // 修改新的依赖 allDeps[effectCursor] = deps; } // 游标递增 effectCursor+=1; } function render() { ReactDOM.render(<App />, document.getElementById("root")); effectCursor = 0; // 注意将 effectCursor 重置为0 }
```

## 真实的React实现

我们用数组模拟出了Hooks的实现原理，但是React的真实实现是用`单链表`的形式代替数组的，通过`next`串联起所有的hook

首先让我们看一张图

![hooks_6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/979747680b7a4567b86885052cf35104~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## Dispatcher

dispatcher 是一个包含了 hooks 函数的共享对象。它将基于 ReactDOM 的渲染阶段被动态地分配或清理，并且它将确保用户无法在React组件外访问到Hooks，[源码参考](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberDispatcher.js%23L24 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberDispatcher.js#L24")

`hooks`在启用时被一个叫做`enableHooks` 的标志位变量启用或禁用，在渲染根组件时，判断该标志位并简单的切换到合适的 dispatcher 上，[源码参考](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberScheduler.js%23L1211 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberScheduler.js#L1211")

**部分源码**

```js
function renderRoot(root: FiberRoot, isYieldy: boolean): void { invariant( !isWorking, 'renderRoot was called recursively. This error is likely caused ' + 'by a bug in React. Please file an issue.', ); flushPassiveEffects(); isWorking = true; // 控制hooks的当前Dispatcher if (enableHooks) { ReactCurrentOwner.currentDispatcher = Dispatcher; } else { ReactCurrentOwner.currentDispatcher = DispatcherWithoutHooks; } ...
```

当完成渲染后，dispatcher将被置为null，这是为了防止在ReactDOM的渲染外被异常访问，[源码参考](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberScheduler.js%23L1211 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberScheduler.js#L1211")

**部分源码**

```js
// We're done performing work. Time to clean up. isWorking = false; ReactCurrentOwner.currentDispatcher = null; resetContextDependences(); resetHooks();
```

在Hooks内部，使用`resolveDispatcher`方法解析当前的`dispatcher`引用，如果当前的`dispatcher`异常，则会报错

**部分源码**

```js
function resolveDispatcher() { const dispatcher = ReactCurrentOwner.currentDispatcher; invariant( dispatcher !== null, 'Hooks can only be called inside the body of a function component.', ); return dispatcher; }
```

## 真正的Hooks

可以说Dispatcher是Hooks机制下的对外统一暴露控制器，渲染过程中，通过flag标志控制当前的`上下文dispatcher`，核心意义就是严格控制hooks的调用渲染，防止hooks在异常的地方被调用了

### hooks queue

hooks的表现是：按照调用顺序被链接在一起的节点（nodes）。总结一下hooks的一些属性

-   初次渲染创建初始状态
-   状态值可以被更新
-   React会在重渲染后，记住之前的状态值
-   React会按照调用顺序，取得和更新正确的状态
-   React知道当前的hook是属于哪个fiber的

所以我们看Hooks的时候，就不能单纯的认为每个hook节点是一个对象，而是一个链表节点，而整个hooks模型，则是一个队列

```js
{ memoizedState: 'foo', next: { memoizedState: 'bar', next: { memoizedState: 'baz', next: null } } }
```

我们可以看到源码对于一个Hook和Effect模型的定义，[源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberHooks.js%23L381 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L381")

```js
export type Hook = { memoizedState: any, baseState: any, baseUpdate: Update<any> | null, queue: UpdateQueue<any> | null, next: Hook | null, }; type Effect = { tag: HookEffectTag, create: () => mixed, destroy: (() => mixed) | null, inputs: Array<mixed>, next: Effect, }; ... export function useState<S>( initialState: (() => S) | S, ): [S, Dispatch<BasicStateAction<S>>] { return useReducer( basicStateReducer, // useReducer has a special case to support lazy useState initializers (initialState: any), ); }
```

首先，可以看到useState的实现就是useReducer的某一种情况的实现，所以在官方文档上，也说了useReducer是useState的另外一种实现方案，结合了Redux的思想，可以避免过多的传递回调函数，而可以直接传递dispatch到深层次的组件中去 [官网关于useReducer的说明](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-reference.html%23usereducer "https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer")

这里我还是贴上关于useReducer的用法案例，其实主要是能理解`redux`或者`dva`的原理和用法，就可以对标`useReducer`的用法

```js
const initialState = {count: 0}; function reducer(state, action) { switch (action.type) { case 'increment': return {count: state.count + 1}; case 'decrement': return {count: state.count - 1}; default: throw new Error(); } } function Counter() { const [state, dispatch] = useReducer(reducer, initialState); return ( <> Count: {state.count} <button onClick={() => dispatch({type: 'decrement'})}>-</button> <button onClick={() => dispatch({type: 'increment'})}>+</button> </> ); }
```

回到Hook的定义，我们现在就可以对每个参数进行说明了

-   `memoizedState`：hook更新后的缓存state
-   `baseState`：初始化initialState
-   `baseUpdate`：最近一次调用更新state方法的action
-   `queue`：调度操作的队列，等待进入reducer
-   `next`：link到下一个hook，通过next串联每个hook

### 结合fiber看hooks

对于fiber实现，这里不做详细解释，我们这里只需要知道，React在V16中，对组件构建渲染的机制，从`栈`模式改为了`fiber`模式，变成了具有链表和指针的单链表树遍历算法。通过指针映射，每个单元都记录着遍历当下的上一步和下一步，从而使遍历变得可以被暂停或者重启 这里的理解就是一种任务分割调度算法，将原先同步更新渲染的任务分割成一个个独立的小任务单位，根据不同的优先级，将小任务分散到浏览器的空闲时间执行，充分利用主进程的时间循环机制

fiber简单说概念，就是组件渲染的一个基础任务切割单元，里面包含了当前组件构建的最基础的一个任务内容单元

**其中，要提到一个很重要的概念`memoizedState`，这个字段是不是很眼熟，上面关于hook的定义里面，也有这个字段，是的，fiber数据结构中，也有这个字段，在fiber中，`memoizedState`的意义就是指向属于这个fiber的hooks队列的首个hook，而hook中的`memoizedState`则指的是当前hook缓存的state值（这里笔者在看一些博客的时候，发现有的博主把两个数据结构中的同名字段搞混淆了）**

我们可以看源码

```js
// There's no existing queue, so this is the initial render. if (reducer === basicStateReducer) { // Special case for `useState`. if (typeof initialState === 'function') { initialState = initialState(); } } else if (initialAction !== undefined && initialAction !== null) { initialState = reducer(initialState, initialAction); } // 注意：重点 workInProgressHook.memoizedState = workInProgressHook.baseState = initialState;
```

上面可以看到，`initialState`作为初始state值，被同时赋值给了`baseState`和`memoizedState`

再看三段段段源码，[源码链接](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberHooks.js%23L243 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L243")

```js
// Hooks are stored as a linked list on the fiber's memoizedState field. The // current hook list is the list that belongs to the current fiber. The // work-in-progress hook list is a new list that will be added to the // work-in-progress fiber. let firstCurrentHook: Hook | null = null; let currentHook: Hook | null = null; let firstWorkInProgressHook: Hook | null = null; let workInProgressHook: Hook | null = null;
```

```js
export function prepareToUseHooks( current: Fiber | null, workInProgress: Fiber, nextRenderExpirationTime: ExpirationTime, ): void { if (!enableHooks) { return; } renderExpirationTime = nextRenderExpirationTime; currentlyRenderingFiber = workInProgress; firstCurrentHook = current !== null ? current.memoizedState : null; // The following should have already been reset // currentHook = null; // workInProgressHook = null; // remainingExpirationTime = NoWork; // componentUpdateQueue = null; // isReRender = false; // didScheduleRenderPhaseUpdate = false; // renderPhaseUpdates = null; // numberOfReRenders = 0; }
```

```js
export function finishHooks( Component: any, props: any, children: any, refOrContext: any, ): any { if (!enableHooks) { return children; } // This must be called after every function component to prevent hooks from // being used in classes. while (didScheduleRenderPhaseUpdate) { // Updates were scheduled during the render phase. They are stored in // the `renderPhaseUpdates` map. Call the component again, reusing the // work-in-progress hooks and applying the additional updates on top. Keep // restarting until no more updates are scheduled. didScheduleRenderPhaseUpdate = false; numberOfReRenders += 1; // Start over from the beginning of the list currentHook = null; workInProgressHook = null; componentUpdateQueue = null; children = Component(props, refOrContext); } renderPhaseUpdates = null; numberOfReRenders = 0; const renderedWork: Fiber = (currentlyRenderingFiber: any); renderedWork.memoizedState = firstWorkInProgressHook; renderedWork.expirationTime = remainingExpirationTime; renderedWork.updateQueue = (componentUpdateQueue: any); const didRenderTooFewHooks = currentHook !== null && currentHook.next !== null; renderExpirationTime = NoWork; currentlyRenderingFiber = null; firstCurrentHook = null; currentHook = null; firstWorkInProgressHook = null; workInProgressHook = null; remainingExpirationTime = NoWork; componentUpdateQueue = null; ...
```

其中一段源码有这么一段注释：`Hooks are stored as a linked list on the fiber's memoizedState field.`，大概意思是Hooks是以链表的形式储存在`fiber`的`memoizedState`字段中

第二段代码是fiber中，hook执行前置函数

第三段代码是fiber中，hook执行后置函数，方法中有这么一句`renderedWork.memoizedState = firstWorkInProgressHook;`

#### 所以我们来总结一下

1）Hook数据结构中和fiber数据结构中都有`memoizedState`字段，但是表达的意义不同，Hook中是作为缓存的state值，但是fiber中是指向的当前fiber下的hooks队列的首个hook（hook是链表结构，指向首个，就意味着可以访问整个hooks队列）

2）fiber中调用hook的时候，会先调用一个前置函数，其中 `currentlyRenderingFiber = workInProgress;`

`firstCurrentHook = current !== null ? current.memoizedState : null;`

这两句代码分别将当前渲染的`fiber`和当前执行的hooks队列的首个hook赋值给了当前的全局变量`currentlyRenderingFiber`和`firstCurrentHook`

再看下关于`currentlyRenderingFiber`变量的源码说明

```js
// The work-in-progress fiber. I've named it differently to distinguish it from // the work-in-progress hook. let currentlyRenderingFiber: Fiber | null = null;
```

`currentlyRenderingFiber`就是定义当前正在渲染中的fiber结构

3）fiber调用hooks结束的时候，会调用`finishHooks`方法，可以看到，会将当前fiber的`memoizedState`字段存入`firstWorkInProgressHook`，也就是将hooks队列的首个hook存入，然后将`currentlyRenderingFiber`字段置为null

## Class or Hooks

从当下的环境来看，Hooks已经逐渐成为主流组件方式，比如Ant4.x的组件，已经全面推荐Hooks模式，Hooks的有点主要在于精简的编码模式，函数式编程思想，而Calss组件的主要优点在于【完整】，【精准】的组件流程控制，包括可以使用`shouldComponentUpdate`等生命周期对渲染做严格控制

## Class组件

在业务开发时的思考模式是：【先做什么，再做什么】，`this.setState`第二个回调的参数，就是这种思想的绝对体现，然后配合【生命周期函数】完成一整个组件的功能，对于组件封装和复用的角度，HOC模式也必须依赖Class实现

## Hooks

对标Class组件，使用Hooks需要有一个编程思路上的转变，Hooks的业务开发的思考模式是：【依赖】，【副作用】

所有的状态维护好后，需要思考的就是围绕这些状态产生的【副作用】，我的什么state或者props变了之后，对应的【副作用】需要干什么事，也是这种设计理念下，`useEffect`的功能可以直接对标Class组件的`componentDidMount`，`componentDidUpdate`，`componentWillUnmount`方法的集合

但是Class在目前来说任有不可替代性，因为Class拥有完整的生命周期控制，比如`shouldComponentUpdate`等生命周期，而Hooks则无法做到如此精细化的控制

通过 Hooks 我们可以对 state 逻辑进行良好的封装，轻松做到隔离和复用，优点主要体现在：

-   复用代码更容易：hooks 是普通的 JavaScript 函数，所以开发者可以将内置的 hooks 组合到处理 state 逻辑的自定义 hooks中，这样复杂的问题可以转化一个单一职责的函数，并可以被整个应用或者 React 社区所使用；
-   使用组合方式更优雅：不同于 render props 或高阶组件等的模式，hooks 不会在组件树中引入不必要的嵌套，也不会受到 mixins 的负面影响；
-   更少的代码量：一个 useEffect 执行单一职责，可以干掉生命周期函数中的重复代码。避免将同一职责代码分拆在几个生命周期函数中，更好的复用能力可以帮助优秀的开发者最大限度降低代码量；
-   代码逻辑更清晰：hooks 帮助开发者将组件拆分为功能独立的函数单元，轻松做到“分离关注点”，代码逻辑更加清晰易懂；

【Tips：function组件没有实例,所以无法通过ref控制,但是Hooks下可以使用`React.forwardRef`来将ref传递给function组件，然后通过`useImperativeHandle`将子组件的实例操作，选择性的暴露给父组件】

参考：

[\[译\] React Hooks 底层解析](https://juejin.cn/post/6844904032708853767#heading-2 "https://juejin.cn/post/6844904032708853767#heading-2")

[React Hooks 原理](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbrickspert%2Fblog%2Fissues%2F26 "https://github.com/brickspert/blog/issues/26")

[Under the hood of React’s hooks system](https://link.juejin.cn/?target=https%3A%2F%2Fmedium.com%2Fthe-guild%2Funder-the-hood-of-reacts-hooks-system-eb59638c9dba "https://medium.com/the-guild/under-the-hood-of-reacts-hooks-system-eb59638c9dba")

[React-ReactFiberHooks源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2F5f06576f51ece88d846d01abd2ddd575827c6127%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberHooks.js%23L243 "https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L243")