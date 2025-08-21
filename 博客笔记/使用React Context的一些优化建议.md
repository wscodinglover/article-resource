## React Context

> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

## 常用 API

### `React.createContext`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg" data-fail="0"></span><code><span>const</span>&nbsp;MyContext&nbsp;=&nbsp;React.createContext(defaultValue);<br></code>
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

### `Context.Provider`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg" data-fail="0"></span><code>&lt;MyContext.Provider&nbsp;value={<span>/*&nbsp;某个值&nbsp;*/</span>}&gt;<br></code>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

### `useContext`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>const</span>&nbsp;store&nbsp;=&nbsp;useContext(MyContext)<br></code>
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

`当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染`

了解了 API 后，我们来看一个简单的例子。

## 示例

index.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>const</span>&nbsp;MyContext&nbsp;=&nbsp;React.createContext(<span>null</span>);<br><br><span><span>function</span>&nbsp;<span>reducer</span>(<span>state,&nbsp;action</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>switch</span>&nbsp;(action.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'addCount'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...state,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>count</span>:&nbsp;state.count&nbsp;+&nbsp;<span>1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span>'addNum'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...state,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>num</span>:&nbsp;state.num&nbsp;+&nbsp;<span>1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>default</span>:&nbsp;<span>return</span>&nbsp;state;<br>&nbsp;&nbsp;}<br>}<br><br><span>const</span>&nbsp;MyProvider&nbsp;=&nbsp;<span>(<span>{&nbsp;children&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[store,&nbsp;dispatch]&nbsp;=&nbsp;useReducer(reducer,&nbsp;{&nbsp;<span>count</span>:&nbsp;<span>0</span>,&nbsp;<span>num</span>:&nbsp;<span>0</span>&nbsp;})<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>&lt;<span>MyContext.Provider</span>&nbsp;<span>value</span>=<span>{{store,</span>&nbsp;dispatch}}&gt;</span>{children}<span>&lt;/<span>MyContext.Provider</span>&gt;</span></span><br>};<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>MyProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ChildCount</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ChildNum</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Child</span>&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>MyProvider</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

ChildCount.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;{&nbsp;state,&nbsp;dispatch&nbsp;}&nbsp;=&nbsp;React.useContext(MyContext);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildCount'</span>,&nbsp;state.count)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>count&nbsp;is:&nbsp;{state.count}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addCount'&nbsp;})}&gt;&nbsp;AddCount&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></code>
```

ChildNum.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;{&nbsp;state,&nbsp;dispatch&nbsp;}&nbsp;=&nbsp;React.useContext(MyContext);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildNum'</span>,&nbsp;state.num)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>num&nbsp;is:&nbsp;{state.num}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addNum'&nbsp;})}&gt;&nbsp;AddNum&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></code>
```

Child.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;Child'</span>)<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>&lt;<span>div</span>&gt;</span>Child<span>&lt;/<span>div</span>&gt;</span></span><br>}<br></code>
```

点击 `AddCount` 按钮，输出：

**re-render ChildCount 1**  
**re-render ChildNum 0**

点击 `AddNum` 按钮，输出：

**re-render ChildCount 1**  
**re-render ChildNum 1**

我们可以发现，`Context.Provider` 下的所有消费组件，在 `Provider.value` 变化后，都会 `re-render`

改变 `count 、num` 任意一个值，`ChildCount，ChildNum` 都会 `re-render`

针对以上 `re-render` 情况，有以下方案可以优化

## 优化

### 针对子组件做函数记忆

#### React.memo

我们如下修改所有的 Child 组件

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;React.memo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;{&nbsp;state,&nbsp;dispatch&nbsp;}&nbsp;=&nbsp;React.useContext(MyContext);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildCount'</span>,&nbsp;state.count)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>count&nbsp;is:&nbsp;{state.count}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addCount'&nbsp;})}&gt;&nbsp;AddCount&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>})<br></code>
```

点击 `AddCount` 后发现，依然打印出  
re-render ChildCount 1  
re-render ChildNum 0  
`？？？`

我们重新认识下 `React.memo`

**React.memo 默认情况下仅仅对传入的 props 做浅比较，如果是内部自身状态更新(useState, useContext等)，依然会重新渲染，在上面的例子中，useContext 返回的 state 一直在变化，导致就算被 memo 包裹的组件依然触发更新了。**

#### useMemo

我们如下修改所有的 Child 组件

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;{&nbsp;state,&nbsp;dispatch&nbsp;}&nbsp;=&nbsp;React.useContext(MyContext);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;useMemo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildCount'</span>,&nbsp;state.count)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>count&nbsp;is:&nbsp;{state.count}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addCount'&nbsp;})}&gt;&nbsp;AddCount&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[state.count,&nbsp;dispatch])<br>}<br></code>
```

点击 `addCount` 后发现，只打印出了  
**re-render ChildCount 1**

点击 `addNum` 后发现，只打印出了  
**re-render ChildNum 1**

useMemo 可以做更细粒度的缓存，我们可以在依赖数组里来管理组件是否更新

> 我们可以思考一下，有没有一种办法，不用 useMemo 也可以做到按需渲染。就像 react-redux 中 useSelector 一样实现按需渲染

### 动手实现 useSelector

我们先想一下，在上面的例子中，触发子组件`re-render`的原因是什么？

没错就是因为 `Provider.value` 的值一直在变更，那我们要想个办法让子组件感知不到 `value` 的变更，同时在 `value` 的某个值发生变更的时候，能够触发消费 `value` 的子组件 `re-render`

> 我们使用 `观察者模式` 实现

1、我们使用 `useMemo` 缓存首次的 value，让子组件感知不到 value 的变化  
2、如果 value 不变化，那子组件就不会`re-render`，此时我们需要在真正 value 变化的时候，`re-render`子组件，我们需要一个 `hooks（useSelector）` 帮助我们实现子组件 `re-render`  
3、子组件在初始化时，`useSelector` 要帮助其订阅 state 变更的回调函数，并返回最新的 state（函数内部获取前后两次的 state 做对比，不一样则强制更新组件）  
4、在 `Context.Provider` 中创建一个收集子组件订阅state变更回调的集合，在其内部监听 `state（value）`，如果变更则遍历集合，执行所有回调函数

基于以上，我们依次实现了`Context.Provider, useSelector, useDispatch`

#### `Context.Provider`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>const</span>&nbsp;MyProvider&nbsp;=&nbsp;<span>(<span>{children}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[state,&nbsp;dispatch]&nbsp;=&nbsp;useReducer(reducer,&nbsp;initState);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>//&nbsp;ref&nbsp;state</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;stateRef&nbsp;=&nbsp;useRef(<span>null</span>);<br>&nbsp;&nbsp;stateRef.current&nbsp;=&nbsp;state;<br><br>&nbsp;&nbsp;<span>//&nbsp;ref&nbsp;订阅回调数组</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;subscribersRef&nbsp;=&nbsp;useRef([]);<br><br>&nbsp;&nbsp;<span>//&nbsp;state&nbsp;变化，遍历执行回调</span><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;subscribersRef.current.forEach(<span><span>sub</span>&nbsp;=&gt;</span>&nbsp;sub());<br>&nbsp;&nbsp;},&nbsp;[state]);<br><br>&nbsp;&nbsp;<span>//&nbsp;缓存&nbsp;value，&nbsp;利用&nbsp;ref&nbsp;拿到最新的&nbsp;state,&nbsp;subscribe&nbsp;状态</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;value&nbsp;=&nbsp;useMemo(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dispatch,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>subscribe</span>:&nbsp;<span><span>cb</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subscribersRef.current.push(cb);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subscribersRef.current&nbsp;=&nbsp;subscribersRef.current.filter(<span><span>item</span>&nbsp;=&gt;</span>&nbsp;item&nbsp;!==&nbsp;cb);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>getState</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;stateRef.current<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;[]<br>&nbsp;&nbsp;)<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>&lt;<span>MyContext.Provider</span>&nbsp;<span>children</span>=<span>{children}</span>&nbsp;<span>value</span>=<span>{value}</span>&nbsp;/&gt;</span></span>;<br>}<br></code>
```

#### `useSelector`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>const</span>&nbsp;useSelector&nbsp;=&nbsp;<span><span>selector</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>//&nbsp;强制更新</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;[,&nbsp;forceRender]&nbsp;=&nbsp;useReducer(<span><span>v</span>&nbsp;=&gt;</span>&nbsp;v&nbsp;+&nbsp;<span>1</span>,&nbsp;<span>0</span>);<br>&nbsp;&nbsp;<span>const</span>&nbsp;store&nbsp;=&nbsp;useContext(MyContext);<br><br>&nbsp;&nbsp;<span>//&nbsp;获取当前使用的&nbsp;state</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;selectedStateRef&nbsp;=&nbsp;useRef(<span>null</span>)<br>&nbsp;&nbsp;selectedStateRef.current&nbsp;=&nbsp;selector(store.getState());<br><br>&nbsp;&nbsp;<span>//&nbsp;对比更新回调</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;checkForUpdates&nbsp;=&nbsp;useCallback(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;获取变更后的&nbsp;state</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;newState&nbsp;=&nbsp;selector(store.getState());<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;对比前后两次&nbsp;state</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(newState&nbsp;!==&nbsp;selectedStateRef.current)&nbsp;forceRender({});<br>&nbsp;&nbsp;},&nbsp;[store]);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>//&nbsp;订阅&nbsp;state</span><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;subscription&nbsp;=&nbsp;store.subscribe(checkForUpdates);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;subscription();<br>&nbsp;&nbsp;},&nbsp;[store,&nbsp;checkForUpdates]);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>//&nbsp;返回需要的&nbsp;state</span><br>&nbsp;&nbsp;<span>return</span>&nbsp;selectedStateRef.current;<br>}<br></code>
```

#### `useDispatch`

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>const</span>&nbsp;useDispatch&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;store&nbsp;=&nbsp;useContext(MyContext);<br>&nbsp;&nbsp;<span>return</span>&nbsp;store.dispatch<br>}<br></code>
```

我们用上面重写的 API，改写下刚开始的例子

index.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>MyProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ChildCount</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ChildNum</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Child</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>Provider</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>}<br></code>
```

ChildCount.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;dispatch&nbsp;=&nbsp;useDispatch();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;count&nbsp;=&nbsp;useSelector(<span><span>state</span>&nbsp;=&gt;</span>&nbsp;state.count);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildCount'</span>,&nbsp;count)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>count&nbsp;is:&nbsp;{count}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addCount'&nbsp;});}&gt;&nbsp;AddCount&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>};<br></code>
```

ChildNum.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;dispatch&nbsp;=&nbsp;useDispatch();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;num&nbsp;=&nbsp;useSelector(<span><span>state</span>&nbsp;=&gt;</span>&nbsp;state.num);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;ChildNum'</span>,&nbsp;num)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&gt;</span>num&nbsp;is:&nbsp;{num}<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>button</span>&nbsp;<span>onClick</span>=<span>{()</span>&nbsp;=&gt;</span>&nbsp;dispatch({&nbsp;type:&nbsp;'addNum'&nbsp;});}&gt;&nbsp;AddNum&nbsp;<span>&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br></code>
```

Child.js

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/LwcbhAmMnZDvcicHGfzUGkhwr048oVYBLpyutJdKdYe2koJlCVnm7CsFDLW4S1iaEiasTiaA8CG7ic0BkGtic4DJVpl1mSPL79TfcN/640?wx_fmt=svg&amp;from=appmsg"></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>'re-render&nbsp;Child'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>&lt;<span>div</span>&gt;</span>Child<span>&lt;/<span>div</span>&gt;</span></span><br>}<br></code>
```

点击`AddCount`: 只打印了 re-render ChildCount 1

点击`AddNum`: 只打印了 re-render ChildNum 1

> 以上通过对 Context 使用中的一些思考，我们简单的实现了 useSelector，实现了 Context 组件的按需渲染

## 总结

在使用 Context API 的时候，要避免不必要的`re-render`，可以使用 `useMemo` 做细粒度更新，也可以使用 `useSelector` 实现按需渲染

**这里可以看到本文的示例！**在线demo(https://codesandbox.io/s/context-demo-modmz?file=/src/App.js)

\- END \-

## 关于奇舞团

奇舞团是 360 集团最大的大前端团队，代表集团参与 W3C 和 ECMA 会员（TC39）工作。奇舞团非常重视人才培养，有工程师、讲师、翻译官、业务接口人、团队 Leader 等多种发展方向供员工选择，并辅以提供相应的技术力、专业力、通用力、领导力等培训课程。奇舞团以开放和求贤的心态欢迎各种优秀人才关注和加入奇舞团。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)