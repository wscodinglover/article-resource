关注我，回复“加群”

加入我们一起学习，天天进步

在 React 世界里，`useMemo` 是一个神奇的 Hook，它能够帮助我们优化组件性能，通过缓存计算结果来避免重复的计算开销。

`useMemo` 的工作机制是接受一个函数和一个依赖数组，只有当依赖项发生改变时，才会重新计算函数并更新缓存值。

## 基本用法

首先，让我们回顾一下 `useMemo` 的基本用法：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useMemo&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;MyComponent&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;memoizedValue&nbsp;=&nbsp;useMemo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行计算或逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;计算结果;<br>&nbsp;&nbsp;},&nbsp;[dependency1,&nbsp;dependency2]);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;这里使用缓存的值&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>{memoizedValue}<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>};<br></code>
```

在这个例子中，`useMemo` 缓存了一个计算结果。初始渲染时，传入的函数会被执行一次，之后的渲染中，只有当依赖数组中的某个依赖项发生变化时，该函数才会被重新执行。

### 浅比较的局限性

`useMemo` 默认使用浅比较来检查依赖项是否发生变化。这意味着如果依赖的对象或数组引用发生了变化，即使内容完全相同，`useMemo` 也会认为依赖项发生了变化，从而触发重新计算。例如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj1&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'Muyiy'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>&nbsp;};<br><span data-darkreader-inline-color="">const</span>&nbsp;obj2&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'Muyiy'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>&nbsp;};<br>obj1&nbsp;===&nbsp;obj2&nbsp;<span data-darkreader-inline-color="">//&nbsp;false</span><br></code>
```

此时可以使用对象属性作为依赖，但是如果属性较多或者依赖是数组时，那可用性就不高了

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'Muyiy'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;memoizedValue&nbsp;=&nbsp;useMemo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行计算或逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;计算结果;<br>&nbsp;&nbsp;},&nbsp;[obj.name,&nbsp;obj.age]);<br></code>
```

## 实现深比较的策略

为了解决浅比较的问题，我们可以采用深比较的策略。以下是两种常见的深比较方法：

1.  **使用 JSON.stringify 进行深比较**
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useMemo&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;MyComponent&nbsp;=&nbsp;<span>(<span>{&nbsp;data&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;stringifiedData&nbsp;=&nbsp;<span data-darkreader-inline-color="">JSON</span>.stringify(data);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;memoizedValue&nbsp;=&nbsp;useMemo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行昂贵的计算或逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;计算结果;<br>&nbsp;&nbsp;},&nbsp;[stringifiedData]);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;这里使用缓存的值&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>{memoizedValue}<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>};<br></code>
```

这种方法通过将对象转换为字符串来实现深比较，但需要注意的是，如果数据结构发生变化，即使实际内容没有变化，也会导致重新计算。

2.  **使用 Lodash 的 isEqual 进行深比较**
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useMemo,&nbsp;useRef&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;_&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;MyComponent&nbsp;=&nbsp;<span>(<span>{&nbsp;data&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ref&nbsp;=&nbsp;useRef(data);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;memoizedValue&nbsp;=&nbsp;useMemo(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!_.isEqual(ref.current,&nbsp;data))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行昂贵的计算或逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ref.current&nbsp;=&nbsp;data;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;ref.current;<br>&nbsp;&nbsp;},&nbsp;[data]);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;这里使用缓存的值&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>{memoizedValue}<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>};<br></code>
```

这种方法使用 Lodash 的 `isEqual` 函数进行深度比较，确保只有在数据内容真正发生变化时，才会触发重新计算。

## 总结

`useMemo` 是一个非常有用的性能优化工具，但它默认只支持浅比较。在需要深比较的场景下，我们可以通过 JSON.stringify 或 Lodash 的 isEqual 函数来实现。

同样的原理也适用于 `useEffect` 和 `useCallback` 这两个 Hook。正确使用这些工具，可以帮助我们优化 React 组件的性能，提升应用程序的响应性和用户体验。

在实际开发中，我们应该根据具体情况选择最合适的深比较方法。

最后不要忘了点赞和在看呦！![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

祝 2024 年暴富！暴美！暴瘦！