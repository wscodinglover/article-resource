**前言**  
在玩游戏的时候，我们必须得遵守游戏的规则，那么游戏才能够进行下去。同理我们在使用任何语言开发的时候，无一例外，都要遵守该语言的语法。在使用任何框架的时候，我们都必须遵守框架的规则。  
在React Hooks中，也有诸多的规则，那我们就一起来看看这些规则、技巧以及正确的使用姿势。

**请勿在循环或者条件语句中使用hooks**这是个基本入门的问题了，也是React Hooks的首要规则，这是因为React Hooks 是以单向循环链表的形式存储，即是有序的。循环是为了从最后一个节点移到一个节点的时候，只需通过next一步就可以拿到第一个节点，而不需要一层层回溯。React Hooks的执行，分为 mount 和 update 阶段，在mount阶段的时候，通过mountWorkInProgressHook() 创建各个hooks (如useState, useMemo, useEffect, useCallback等)，并且将当前hook添加到表尾。在update阶段，在获取或者更新hooks值的时候，会先获取当前hook的状态，hook.memoizedState，并且是按照顺序或读写更新hook，若在条件或者循环语句使用hooks，那么在更新阶段，若增加或者减少了某个hook，hooks的数量发生变化，而React是按照顺序，通过next读取下一个hook，则导致后面的hooks和挂载阶段对应不上，发生读写错值的情况，从而引发bug。  
我们可以看看useState在mount阶段的源码：  

```
<span><span><span>function</span> <span>mountState</span>&lt;<span>S</span>&gt;(<span></span></span></span>
```

useCallback在mount阶段的源码：  

```
<span><span><span>function</span> <span>mountCallback</span>&lt;<span>T</span>&gt;(<span>callback: T, deps: <span>Array</span>&lt;mixed&gt; | <span>void</span> | <span>null</span></span>): <span>T</span> </span>{</span>
```

然后mountWorkInProgressHook的源码如下：  

```
<span><span><span>function</span> <span>mountWorkInProgressHook</span>(<span></span>): <span>Hook</span> </span>{</span>
```

其他hooks的源码也是类似，以mountWorkInProgressHook创建当前hooks, 并且把hook的数据存到hook.memoizedState上，而在update阶段，则是依次读取hooks链表的memoizedState属性来获取状态 (数据)。

React 为什么要以单向循环链表的形式存储hooks呢？直接以key-value的对象形式存储就可以在循环或者条件语句中使用hooks了，岂不更好？  
这是因为react scheduler的调度策略如此，以链表的形式存储是为了可以实现并发、可打断、可恢复、可继续执行下一个fiber任务。

**在使用map循环数组渲染列表时须指定唯一且稳定值的key**  
在渲染列表的时候，我们须给组件或者元素分配一个唯一值的key, key是一个特殊的属性，不会最终加在元素上面，也无法通过props.key来获取，仅在react内部使用。react中的key本质是服务于diff算法, 它的默认值是null, 在diff算法过程中, 新旧节点是否可以复用, 首先就会判定key是否相同, 其后才会进行其他条件的判定（如节点类型，props），从而提升渲染性能，减少重复无效渲染。

为什么在渲染列表组件的时候，为什么不能将index设置为key？  
因为显式地把index设为key，和不设置key的效果是一样，这就所谓的就地复用原则，即react在diff的时候，如果没有key，就会在老虚拟DOM树中，找到对应顺序位置的组件，然后对比组件的类型和props来决定是否需要重新渲染。index作为key，不仅会在数组发生变化的时候，造成无效多余的渲染，还可能在组件含有非受控组件 (如input)的时候，造成UI渲染错误。

例如有如下渲染组件列表：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果是以index作为key，当数组的队首添加一条数据的时候，render过程如下，会造成3次更新，1次添加：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果是给key指定一个唯一且稳定的id，则render过程如下，就只会发生一次添加操作，而其他组件都没有更新：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果渲染列表的时候，key重复了会怎么样？  
首先react会给你输出警告，告诉你key值应该是唯一的，以便组件在更新期间保持其标识。重复的key可能导致子节点被重复使用或省略，从而引发UI bug。

**memo (useMemo, useCallback)**  
在react中，当我们setState之后，若值发生变化，则会重新render当前组件以及其子组件 (默认情况下)，在必要的时候，我可使用memo (class组件则对应shouldComponentUpdate、PureComponent)进行优化，来减少无效渲染。memo是一个高阶组件，接受一个组件作为参数，并返回一个原组件为基础的新组件，而在memo内部，则会使用Object.is来遍历对比新旧props是否发生变化，以决定是否需要重新render。  
在我们使用memo包裹子组件的时候，往往需要父组件配合使用useMemo，useCallback等，来缓存传给子组件props中的引用类型的值和方法 (function其实也是引用类型数据的一种，useCallback也是useMemo的一种特殊情况)，因为对于react函数组件，其本身就是个render函数，每次re-render之后，都会重新执行此函数，而每次执行的时候就会产生一个新的函数作用域，因此默认每次都会创建一个新的变量，如果是引用类型，则会造成Object.is返回false，故而无法达到防止无效渲染的目的。此时我们需要在父组件传给子组件props的值的时候，缓存引用类型数据，来保证在依赖没有变化的情况下，始终返回同一个引用地址。

_注意：只有在组件渲染发生了性能问题的时候，例如组件内容较为复杂，render过程比较慢，我们才使用memo (shouldComponentUpdate、PureComponent) 进行优化，否则你会得不偿失，恰得其反，反而造成性能的下降。因为本身在遍历props进行对比的过程，就需要一定的执行时间，如果组件较小，re-render的代价比对比props的代价更低，这时候我们就不适合使用memo (shouldComponentUpdate)。_

useMemo、useCallback其实就是在更新阶段的时候，对比依赖是否发生变化，若发生变化则创建新的值，若没有，则返回旧的值，useMemo的update阶段源码如下：  

```
<span><span><span>function</span> <span>updateMemo</span>&lt;<span>T</span>&gt;(<span></span></span></span>
```

  
**useImperativeHandle (forwardRef)**  
我们会遇到这样的场景：某个组件想要暴露一些方法，来供外部组件来调用。例如我们在开发form表单的时候，就需要把设置表单值、重置值、提交等方法暴露给外部使用。会有如下代码：  

```
<span><span>import</span>&nbsp;{&nbsp;forwardRef&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'react'</span>;</span>
```

在组件外部，只需传入ref属性，即可调用form组件提供的方法。

**获取最新的state**  
由于react中，setState之后，是采用异步调度、批量更新的策略，导致我们无法直接获取最新的state。在使用class组件的时候，我们可以通过传递第二个参数，传一个回调用函数，来让我们获取最新的state (在React 18以后，就算在class component里面，在setTimeout、原生事件回调里面，也是异步批量更新了)。在hooks里面，我目前只能通过useEffect，把当前state当作依赖传入，来在useEffect回调函数里面获取最新的state。  
在setState的时候，其实就是在调用dispatchSetState，源码如下 (删掉了一些注释和DEV代码):  

```
<span><span><span>function</span> <span>dispatchSetState</span>&lt;<span>S</span>, <span>A</span>&gt;(<span></span></span></span>
```

scheduleUpdateOnFiber则是react内部的核心调度方法，源码如下：  

```
<span><span>export</span> <span><span>function</span> <span>scheduleUpdateOnFiber</span>(<span></span></span></span>
```

我们继续追踪ensureRootIsScheduled方法，此源码就省略了，然后会调用scheduleMicrotask方法，源码如下：  

```
<span><span>export</span> <span>const</span> scheduleMicrotask: <span>any</span> =</span>
```

会优先使用queueMicrotask来添加一个微任务，此方法是一个标准的web api，可以不借助Promise来往微任务队列里面添加一个任务。若当前环境不支持queueMicrotask，则依次优先使用Promise，setTimeout。这与vue的nextTick源码实现是基本一致的。通过以上的分析，我们可以大致了解了react异步批量更新的调度过程。

**useRef**  
如果我们想在hooks里面获同步取最新的值，那么则可以使用useRef, 关键源码如下：  

```
<span><span><span>function</span> <span>mountRef</span>&lt;<span>T</span>&gt;(<span>initialValue: T</span>): </span>{|current: T|} {</span>
```

可以看到，代码实现非常简单，创建一个ref对象，然后挂载到hook.memoizedState, 我们在修改的时候，就是直接修改ref.current。useRef其实就是提供一个稳定的变量，在组件的整个生命周期都是持续存在且是同一个引用。  
_注意：修改useRef返回的状态不会引起UI的重渲染。_

为什么在setTimeout的回调函数里面，拿不到useState的最新值？  
主要有以下三点原因：  
•  react 中的state，遵循着状态不可变的原则，在setState之后，不会修改原来老的state的值，而是把新值重新赋值给hook.memoizedState。  
•  对于react函数组件，其本身就是个render函数，每次重渲染之后，都会重新执行此函数，而每次执行的时候就会产生一个新的函数作用域。  
•  setTimeout的回调函数对hook.memoizedState形成了闭包引用，而在setState之后，都会重新执行组件函数，setTimeout 的回调函数会捕获在 setTimeout 被创建时的状态的快照，而不是最新的状态。

但是为什么又能获取useRef的最新值呢？  
useRef本身并不能解决闭包引用的问题，但是它通过创建一个稳定的引用:

```
<span><span><span>function</span> <span>mountRef</span>&lt;<span>T</span>&gt;(<span>initialValue: T</span>): </span>{|current: T|} {</span>
```

mount在整个组件生命周期，只会触发一次，因此只会创建一次。然后这也是为什么要创建一个对象，而对象上近仅创建一个current属性来存储数据，正是为了让开发者在整个生命周期，拿到的始终是同一个引用，可以把它想象成当前组件域下的一个全局变量了，而修改数据仅仅在这个引用上的current属性修改。

简单思考：为什么vue composition api 的 setup函数不存在闭包引用导致的setTimeout回调函数中拿到的是旧值呢？  
因为setup 函数只会执行一次，返回一个render函数，在更新阶段，始终执行的是render函数，因此setTimeout回调函数的闭包引用中引用的是setup函数的状态，不会发生改变。而react中，整个组件函数就是一个render函数，所以引用的状态在每次render的时候都是不同的变量。这是它们的本质区别。