> 作者：几木 https://zhuanlan.zhihu.com/p/525244896

这篇尝试通过源码结合图解，还原 React Fiber 树的实现。文中你将看到：

-   Fiber 树在协调过程中的作用
    
-   Fiber 树的数据结构和遍历方式
    
-   Diffing 的思路，和它在伴随树构造过程的实现
    
-   Diffing 结果的标识和收集
    
-   节点宿主实例的关联方式
    

## 1\. 背景

### 1.1 Virtual DOM

众所周知，React 构造了一层 Virtual DOM。

> Virtual DOM 是一种编程概念。在这个概念里， UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的” DOM 同步。这一过程叫做协调。
> 
> ——Virtual DOM 及内核 – React

Virtual DOM 像 DOM 一样，是一棵树。在协调过程中，我们创建、改变的 React 组件，构建出新Virtual DOM 树，通过 Diffing 算法和老树对比，得到差值，再同步给视图要修改哪些部分。

### 1.2 Fiber

那 Fiber 又是什么？

> React Fiber 是 React 核心算法的重新实现。
> 
> ——GitHub - acdlite/react-fiber-architecture: A description of React’s new core algorithm, React Fiber

广义的 Fiber，是一种新架构。为了实现这套架构，React 也在 Virtual DOM 上重建了树和节点结构，叫做 fiber 树和 fiber 节点。

## 2\. Fiber 树的组织方式

先不管 Fiber 怎么实现的。现在想想，让你表示一棵树，要怎么表示？

### 2.1 基于 children 数组的树

最先想到的用 children 是吧：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"A"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"children"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"B"</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"C"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"children"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"E"</span>&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"D"</span>&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>}<br></code>
```

这也是最常见的方式，很多场景比如 DOM 树、antd 的 Tree 组件数据等等，都这么组织。这种结构符合正常思维，读起来清晰舒服，特别适合广度优先遍历。

### 2.2 基于链表的树

另一种则是通过节点之间的指针表示他们的关系，形成一棵树。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;对于多个&nbsp;children，往往是父节点指向第一个子节点&nbsp;child，再通过子节点的兄弟节点&nbsp;sibling&nbsp;指针横着指</span><br><span data-darkreader-inline-color="">//&nbsp;也可以加上&nbsp;return&nbsp;指父节点</span><br>A&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">child</span>:&nbsp;B&nbsp;}<br>B&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">return</span>:&nbsp;A,&nbsp;<span data-darkreader-inline-color="">sibling</span>:&nbsp;C&nbsp;}<br>C&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">return</span>:&nbsp;A,&nbsp;<span data-darkreader-inline-color="">sibling</span>:&nbsp;D,&nbsp;<span data-darkreader-inline-color="">child</span>:&nbsp;E&nbsp;}<br>D&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">return</span>:&nbsp;A&nbsp;}<br>E&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">return</span>:&nbsp;C&nbsp;}</code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

虽然损失了一些可读性，这个结构却有很多优势：

-   调整节点位置很灵活，只要改改指针
    
-   方便进行各种方式的遍历
    
-   可以随时从某一个节点出发还原整棵树
    

这一切，正符合 Fiber 架构的要求：遍历、分割、暂停……

## 3\. Fiber 树的遍历方式

前面说过：「React 构建出新Virtual DOM 树，通过 Diffing 算法和老树对比」。但实际上 Fiber 树是边构建、边遍历、边对比的，这样最大程度减少了遍历次数，也符合「可中断」的设定。

咱们暂且只关注遍历方式，先说答案，Fiber 树是深度优先遍历的。Part 1 那棵树的遍历顺序是：ABCED。

### 3.1 遍历的实现

通过源码我们看看遍历是如何实现的。从“协调”的入口开始，会删掉一些代码，只关注遍历相关的部分。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;packages/react-reconciler/src/ReactFiberScheduler.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">workLoop</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;performUnitOfWork(workInProgress);<br>&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">//&nbsp;packages/react-reconciler/src/ReactFiberScheduler.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">performUnitOfWork</span>(<span>unitOfWork:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;next;<br>&nbsp;&nbsp;next&nbsp;=&nbsp;beginWork(current,&nbsp;unitOfWork,&nbsp;renderExpirationTime);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(next&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;next&nbsp;=&nbsp;completeUnitOfWork(unitOfWork);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;next;<br>}<br></code>
```

遍历需要一个指针指向当前遍历到的节点，workInProgress 就是这个指针，进一步是 performUnitOfWork 的 next 指针，遍历在指针为 null 的时候结束。

next 先从 beginWork 获取，如果没有，就从 completeUnitOfWork 获取。这里 beginWork 是“递”，即不停向下找到当前分支最深叶子节点的过程；completeUnitOfWork 是“归”，即结束这个分支，向右或向上的过程。

### 3.2 递

先看 beginWork。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;packages/react-reconciler/src/ReactFiberBeginWork.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">beginWork</span>(<span>&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber,&nbsp;renderExpirationTime:&nbsp;ExpirationTime,<br></span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">switch</span>&nbsp;(workInProgress.tag)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;ClassComponent:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;updateClassComponent(current,&nbsp;workInProgress,&nbsp;Component,&nbsp;resolvedProps);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

beginWork 本身对递归没什么实际进展，主要是根据 tag 分发逻辑。我们关注的是 beginWork 把 updateClassComponent 的返回作为下一个遍历节点返回，按深度优先规则，这个节点应该是当前节点的第一个子节点。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;packages/react-reconciler/src/ReactFiberBeginWork.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">updateClassComponent</span>(<span>current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber,&nbsp;Component:&nbsp;any,&nbsp;nextProps</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;nextUnitOfWork&nbsp;=&nbsp;finishClassComponent(current,&nbsp;workInProgress,&nbsp;Component,&nbsp;shouldUpdate);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;nextUnitOfWork;<br>}<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">finishClassComponent</span>(<span><br>&nbsp;&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber,&nbsp;Component:&nbsp;any,&nbsp;shouldUpdate:&nbsp;boolean,&nbsp;hasContext:&nbsp;boolean<br></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;workInProgress.child;&nbsp;<br>}<br></code>
```

updateClassComponent 调 finishClassComponent，返回 workInProgress.child，确实是当前节点的第一个子节点。

### 3.3 归

需要注意的是，next 指针不应该重复经过同一个节点。因为如果向下的过程中经过某个节点，在向上的过程中又出现，就会再次进入 beginWork，造成死循环。继续看 completeUnitOfWork 如何解决这个问题。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">completeUnitOfWork</span>(<span>unitOfWork:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;unitOfWork;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">do</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;siblingFiber&nbsp;=&nbsp;workInProgress.sibling;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(siblingFiber&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;siblingFiber;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;returnFiber&nbsp;=&nbsp;workInProgress.return;<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;returnFiber;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">null</span>;<br>}<br></code>
```

completeUnitOfWork 内部又创建了一层循环，搭配一个向上的新指针 workInProgress（此workInProgress非彼workInProgress），然后循环看当前指针节点，有兄弟节点就返回交还给外层循环，没有就向上到父节点，直到最上面的根节点。

### 3.4 一张图总结

假设我们有如下这样一棵树。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   整个遍历由 performUnitOfWork 发起，为深度优先遍历
    
-   从根节点开始，循环调 beginWork 向下爬树（黄色箭头，每个箭头表示一次调用）
    
-   到达叶子节点（beginWork 爬不下去）后，调 completeUnitOfWork 向上爬到下一个未遍历过的节点，也就是第一个出现的祖先兄弟节点（绿色箭头，每个箭头表示一次调用）
    
-   所以 beginWork 可能连续调用多次，一次最多只爬一步，但 completeUnitOfWork 只可能在 beginWork 之间连续调用一次，一次可以向上爬若干步
    
-   completeUnitOfWork 内部包下了若干步循环向上的爬树操作（绿色虚线箭头）
    

到这里有个疑问，Fiber 实现深度优先遍历为什么要这么复杂？为什么要区分内外两层循环？

### 3.5 服务于功能的遍历过程

Fiber 树是边创建边遍历的，每个节点都经历了「创建、Diffing、收集副作用（要改哪些节点）」的过程。其中，创建、Diffing要自上而下，因为有父才有子；收集副作用要自下而上最终收集到根节点。

现在我们回头看遍历过程。外层循环每一步（也就是 beginWork 每次执行）都是自上而下的，并保证每个节点只走一次；内层循环每一步（在 completeUnitOfWork 里）都是自下而上的。显然，beginWork 负责创建、Diffing，completeUnitOfWork 负责收集副作用。

那这些功能具体又是怎么体现的？

## 4\. 树的构建和 Diffing

首先明确一点，所谓的 Diffing 算法并不是独立存在的，不是说先把树建完再执行 Diffing 算法找出差距，而是将 Diffing 算法体现在构建过程中对老节点的复用策略。

### 4.1 背景：两棵树

在React中最多会同时存在两棵Fiber树：

-   当前屏幕上显示内容对应的Fiber树称为 current Fiber 树
    
-   正在构建的Fiber树称为 workInProgress Fiber 树，我们这里讨论的所有遍历都在这棵树上
    

当一次协调发起，首先会开一棵新 workInProgress Fiber 树，然后从根节点开始构建并遍历 workInProgress Fiber 树。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果构建到一半被打断，current 树还在。如果构建并提交完成，直接把 current 树丢掉，让 workInProgress Fiber 树成为新的 current 树。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所谓 Diffing 也是在这两棵树之间，如果构建过程中确认新节点对旧节点的复用关系，新旧节点间也会通过 alternate 指针相连。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.2 Diffing 算法思想

正常情况下，完全找到两棵树的差异，是个时间复杂度很高的操作。但 Diffing 算法通过一些假设，权衡了执行开销和完整性。

**假设一：不同类型的节点元素会有不同的形态**

当节点为不同类型的元素时，React 会拆卸原有节点并且建立起新的节点。举个例子，当一个元素从 a 变成 img，从 Article 变成 Comment，都会触发一个完整的重建流程。

该算法不会尝试匹配不同组件类型的子树。如果你发现你在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。

**假设二：节点不会进行跨父节点移动**

只会对比两个关联父节点的子节点，多了就加少了就减。没有提供任何方式追踪他们是否被移动到别的地方。

**假设三：用户会给每个子节点提供一个 key，标记它们“是同一个”**

当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。在新增 key 之后，使得树的转换效率得以提高。比如两个兄弟节点调换了位置，有 key 的情况下能保证二者都复用仅做移动，但无 key 就会造成两个不必要的卸载重建。

### 4.3 深入 Diffing 过程

接下来我们看 Diffing 算法如何体现在具体实现中的。（代码会精简掉很多无关逻辑，只关注 Diffing 过程）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">performUnitOfWork</span>(<span>unitOfWork:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;current&nbsp;=&nbsp;unitOfWork.alternate;<br>&nbsp;&nbsp;next&nbsp;=&nbsp;beginWork(current,&nbsp;unitOfWork);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;next;<br>}<br></code>
```

对每个遍历到的新节点 unitOfWork，取出它关联复用的 current 树节点，称为「current」，然后新旧节点一并传给 beginWork。这个关联关系是在前面某轮循环执行 beginWork 构造 unitOfWork 时建立的，取决于当时的 Diffing 判断新旧节点是否复用。所以可能存在 current 为 null 的情况。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">beginWork</span>(<span>&nbsp;current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">switch</span>&nbsp;(workInProgress.tag)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;HostComponent:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;updateHostComponent(current,&nbsp;workInProgress);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

beginWork 根据当前节点 tag 做分发，这里的 tag 比较丰富，都是从shared/ReactWorkTags.js导入的常量，常见的 HostComponent、FunctionComponent、ClassComponent、Fragment 等都在此列。以 updateHostComponent 为例。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">updateHostComponent</span>(<span>current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber</span>)&nbsp;</span>{<br>&nbsp;&nbsp;reconcileChildren(current,&nbsp;workInProgress,&nbsp;workInProgress.pendingProps.children);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;workInProgress.child;<br>}<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reconcileChildren</span>(<span>current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber,&nbsp;nextChildren:&nbsp;any</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(current&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress.child&nbsp;=&nbsp;mountChildFibers(workInProgress,&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;nextChildren);<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;workInProgress.child&nbsp;=&nbsp;reconcileChildFibers(workInProgress,&nbsp;current.child,&nbsp;nextChildren);<br>&nbsp;&nbsp;}<br>}<br></code>
```

updateHostComponent 从 workInProgress 属性中取出 children，这个 children 不是 fiber 节点，而是组件 render 方法根据 JSX 结构 createElement 创建的 element 数组，这点不要混淆。

然后在 reconcileChildren 中构造子节点。可以看到如果 current 节点为 null，也就是当前节点无复用，就直接放弃子节点 Diffing 了。所以**父节点可复用，是子节点复用的必要不充分条件**。

**这里也遵循了 Diffing 算法的假设二——节点不会进行跨父节点移动，只对比关联节点的子节点的增减，不管它们有没有被移动到别处或从别处移动来。**

再往下看触发 Diffing 的 reconcileChildFibers。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reconcileChildFibers</span>(<span>returnFiber:&nbsp;Fiber,&nbsp;currentFirstChild:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;newChild:&nbsp;any</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isObject&nbsp;=&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;newChild&nbsp;===&nbsp;<span data-darkreader-inline-color="">'object'</span>&nbsp;&amp;&amp;&nbsp;newChild&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isObject)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">switch</span>&nbsp;(newChild.$$<span data-darkreader-inline-color="">typeof</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;REACT_ELEMENT_TYPE:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;placeSingleChild(reconcileSingleElement(returnFiber,&nbsp;currentFirstChild,&nbsp;newChild));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isArray(newChild))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;reconcileChildrenArray(returnFiber,&nbsp;currentFirstChild,&nbsp;newChild);<br>&nbsp;&nbsp;}<br>}<br></code>
```

children 可能是单个对象也可能是数组，这里优先走 reconcileSingleElement 处理单个子节点情况，其次走 reconcileChildrenArray 处理多个子节点。说明单多节点是不一样的逻辑。

**这是一种「先做简单题」的思路。单节点的场景比较多但计算简单，到这里能结束多数场景避免不必要开销；而多节点计算复杂，不要轻易发起。**

**无论内部逻辑有什么差异，单多节点的协调函数都要做几件事：**

-   **和 current 节点的子节点做 Diffing，创建或复用**
    
-   **为可复用的新旧子节点建立 alternate 关联**
    
-   **返回第一个子节点（会一直往外返回给到 next 指针，作为下一步遍历对象）**
    

这个口径统一了，我们再分开看二者的差异。

### 4.4 子节点 Diffing：当 workInProgress 子节点为单节点

先想一下，为什么说单节点的场景计算简单？因为我只需要一层循环，把 current 节点的所有子节点挨个拿出来对比，找到一个和单节点匹配的就算 Diffing 完了。看代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reconcileSingleElement</span>(<span>returnFiber:&nbsp;Fiber,&nbsp;currentFirstChild:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;element:&nbsp;ReactElement</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;=&nbsp;element.key;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;child&nbsp;=&nbsp;currentFirstChild;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(child&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(child.key&nbsp;===&nbsp;key)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(child.elementType&nbsp;===&nbsp;element.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deleteRemainingChildren(returnFiber,&nbsp;child.sibling);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;existing&nbsp;=&nbsp;useFiber(child,&nbsp;element.props);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;existing.return&nbsp;=&nbsp;returnFiber;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;existing;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deleteRemainingChildren(returnFiber,&nbsp;child);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deleteChild(returnFiber,&nbsp;child);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;child&nbsp;=&nbsp;child.sibling;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;created&nbsp;=&nbsp;createFiberFromElement(element,&nbsp;returnFiber.mode);<br>&nbsp;&nbsp;created.return&nbsp;=&nbsp;returnFiber;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;created;<br>}<br></code>
```

1.  去 current 子节点里找一个和 workInProgress 唯一子节点 key 相同的节点，过程中遍历到的所有 key 不相同的都 deleteChild 删掉
    
2.  找得到且 type 相同，就 useFiber 复用，并把复用节点挂到 workInProgress 下
    
3.  找得到但 type 不同，就 deleteChild 删掉，创建一个新节点并挂在 workInProgress 下。无论2、3哪一种，剩余的 current 子节点都可以 deleteRemainingChildren 批量删掉，因为不会再有 key 相同的了
    
4.  找不到，创建一个新节点并挂在 workInProgress 下
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**这里的2、3遵循了 Diffing 思想的假设一——不同类型的节点元素会有不同的形态，所以 type 不同就直接被删掉了。**

### 4.5 useFiber 做了什么

基于可复用节点和新属性复制一个 workInProgress 节点出来，并将二者通过 alternate 关联。这就是 useFiber 做的事。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">useFiber</span>(<span>fiber:&nbsp;Fiber,&nbsp;pendingProps:&nbsp;mixed</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;clone&nbsp;=&nbsp;createWorkInProgress(fiber,&nbsp;pendingProps);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;clone;<br>}<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">createWorkInProgress</span>(<span>current:&nbsp;Fiber,&nbsp;pendingProps:&nbsp;any</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;workInProgress&nbsp;=&nbsp;createFiber(current.tag,&nbsp;pendingProps,&nbsp;current.key,&nbsp;current.mode);<br>&nbsp;&nbsp;workInProgress.alternate&nbsp;=&nbsp;current;<br>&nbsp;&nbsp;current.alternate&nbsp;=&nbsp;workInProgress;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;workInProgress;<br>}<br></code>
```

其实 createWorkInProgress 还有很大篇幅的其他属性复制，这里没有列出来。

### 4.6 Effect：删掉的含义是什么

删掉一个节点，在 React 中叫做“副作用 Effect”。Effect 的细节会在下一节展开，这里我们暂时只需要知道 Effect 是挂在节点上的一个标记，用来最终执行对 DOM 的删除操作。同样前面也有个 placeSingleChild 函数，其实也是标记了一个新增 DOM 的 Effect。

### 4.7 子节点 Diffing：当 workInProgress 子节点为多节点

当 workInProgress 子节点是个数组，就会调 reconcileChildrenArray 进行多节点对比，返回第一个子节点。

由于相对复杂，我们直接拆开函数体。首先定义了一堆指针/索引：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;resultingFirstChild:&nbsp;Fiber&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;构建后的第一个子节点，也就是&nbsp;return&nbsp;回去的节点</span><br><span data-darkreader-inline-color="">let</span>&nbsp;previousNewFiber:&nbsp;Fiber&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;前一个新节点，用来接&nbsp;sibling&nbsp;指针的</span><br><span data-darkreader-inline-color="">let</span>&nbsp;oldFiber&nbsp;=&nbsp;currentFirstChild;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;旧节点遍历指针</span><br><span data-darkreader-inline-color="">let</span>&nbsp;lastPlacedIndex&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;最后的放置位置，这个和节点位置交叉移动方式有关</span><br><span data-darkreader-inline-color="">let</span>&nbsp;newIdx&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;新&nbsp;children&nbsp;的遍历&nbsp;index</span><br><span data-darkreader-inline-color="">let</span>&nbsp;nextOldFiber&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;旧节点遍历指针</span><br></code>
```

有必要提一嘴，因为不论新旧，Fiber 子节点都是 sibling 链表相连的，所以用指针；但我们用来生成新节点的 children 是 element 数组，所以用 index。

接下来逻辑进入到多节点 Diffing，仍然体现了“先做简单题”的思路。

### 4.8 第一轮：先假设子节点从头开始的 key顺序不变

最简单的情况是，“新旧节点的 key 顺序不变，仅仅在尾部增删节点”。那对比过程中至多只有三种操作：

1.  新增尾部若干个新子节点
    
2.  删除尾部若干个旧子节点
    
3.  替换掉 key 相同但 type 不同的节点
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">for</span>&nbsp;(;&nbsp;oldFiber&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;newIdx&nbsp;&lt;&nbsp;newChildren.length;&nbsp;newIdx++)&nbsp;{<br>&nbsp;&nbsp;nextOldFiber&nbsp;=&nbsp;oldFiber.sibling;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;=&nbsp;oldFiber&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;?&nbsp;oldFiber.key&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newFiber&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(newChild.key&nbsp;===&nbsp;key)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(current&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;current.elementType&nbsp;===&nbsp;element.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newFiber&nbsp;=&nbsp;useFiber(oldFiber,&nbsp;newChild.props);<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newFiber&nbsp;=&nbsp;createFiberFromElement(newChild);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(newFiber&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(oldFiber&nbsp;&amp;&amp;&nbsp;newFiber.alternate&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;deleteChild(returnFiber,&nbsp;oldFiber);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;lastPlacedIndex&nbsp;=&nbsp;placeChild(newFiber,&nbsp;lastPlacedIndex,&nbsp;newIdx);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(previousNewFiber&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;resultingFirstChild&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;previousNewFiber.sibling&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;previousNewFiber&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;oldFiber&nbsp;=&nbsp;nextOldFiber;<br>}<br></code>
```

首先，发起循环，从第一个子节点开始逐步构建后续兄弟节点。循环是组件 children 数组 newIdx 发起的，在内部新（newFiber）老（oldFiber）节点指针也跟着跑。这个过程中新节点 siblings 链表也同步建起来。

过程中位置同步且 key 相同的节点会进行复用或替换。如果新旧节点 key 相同、type 相同，复用；key 相同、type不同，deleteChild 删掉旧节点。placeChild 中也依赖这个判断，有 alternate 就复用，没有就插入新节点（加一个“Placement”的 Effect）

循环结束的可能有三种原因：

1.  这个循环继续的假设是“新旧节点的 key 顺序不变”，所以一旦不满足这个条件就退出了。代码体现为：“本轮循环不满足 newChild.key === oldFiber.key”—>“newFiber 为 null”—>“break”。
    
2.  旧节点跑完了。代码体现为：“oldFiber 为 null” —> “key 为 null” —> “newFiber 为 null”—>“break”。
    
3.  新节点跑完了。也就是循环正常退出。
    

退出后怎么办？

如果是上面原因 3，就删掉剩余的所有旧节点（可能正好没有剩余），对比结束：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">if</span>&nbsp;(newIdx&nbsp;===&nbsp;newChildren.length)&nbsp;{<br>&nbsp;&nbsp;deleteRemainingChildren(returnFiber,&nbsp;oldFiber);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;resultingFirstChild;<br>}<br></code>
```

如果是上面原因 2，就继续新增剩余所有新节点，并构造链表，然后对比结束：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">if</span>&nbsp;(oldFiber&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(;&nbsp;newIdx&nbsp;&lt;&nbsp;newChildren.length;&nbsp;newIdx++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newFiber&nbsp;=&nbsp;createChild(returnFiber,&nbsp;newChildren[newIdx]);<br>&nbsp;&nbsp;&nbsp;&nbsp;lastPlacedIndex&nbsp;=&nbsp;placeChild(newFiber,&nbsp;lastPlacedIndex,&nbsp;newIdx);<br>&nbsp;&nbsp;&nbsp;&nbsp;previousNewFiber.sibling&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;&nbsp;&nbsp;previousNewFiber&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;resultingFirstChild;<br>}<br></code>
```

到此为止，“简单题”就做完了，大多数场景都能用这种相对低开销的方式解决。一张图回顾下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那中途退出的呢？进入第二轮

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.9 第二轮

能进到第二轮有几种情况：

1.  中途出现了增删的节点
    
2.  有节点位置发生交换
    

这时，循环的 index 已经不足以映射新旧节点的 key 了，所以首先要建一个 map。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;existingChildren&nbsp;=&nbsp;mapRemainingChildren(returnFiber,&nbsp;oldFiber);<br></code>
```

这里 existingChildren 就是一个 key 到旧节点的 map。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">for</span>&nbsp;(;&nbsp;newIdx&nbsp;&lt;&nbsp;newChildren.length;&nbsp;newIdx++)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newFiber&nbsp;=&nbsp;updateFromMap(existingChildren,&nbsp;returnFiber,&nbsp;newIdx,&nbsp;newChildren[newIdx]);<br>&nbsp;&nbsp;lastPlacedIndex&nbsp;=&nbsp;placeChild(newFiber,&nbsp;lastPlacedIndex,&nbsp;newIdx);<br>&nbsp;&nbsp;previousNewFiber.sibling&nbsp;=&nbsp;newFiber;<br>&nbsp;&nbsp;previousNewFiber&nbsp;=&nbsp;newFiber;<br>}<br></code>
```

updateFromMap 会试图到 map 里找一个 key 和 type 都相同的旧节点复用（调 useFiber）并返回，或者创建一个新节点。这很易懂，但下一行 placeChild 就有点意思了，前面也调过，这次打开看看。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">placeChild</span>(<span>newFiber:&nbsp;Fiber,&nbsp;lastPlacedIndex:&nbsp;number,&nbsp;newIndex:&nbsp;number</span>):&nbsp;<span data-darkreader-inline-color="">number</span>&nbsp;</span>{<br>&nbsp;&nbsp;newFiber.index&nbsp;=&nbsp;newIndex;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;current&nbsp;=&nbsp;newFiber.alternate;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(current&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;oldIndex&nbsp;=&nbsp;current.index;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(oldIndex&nbsp;&lt;&nbsp;lastPlacedIndex)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;This&nbsp;is&nbsp;a&nbsp;move.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newFiber.effectTag&nbsp;=&nbsp;Placement;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;lastPlacedIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;This&nbsp;item&nbsp;can&nbsp;stay&nbsp;in&nbsp;place.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;oldIndex;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;This&nbsp;is&nbsp;an&nbsp;insertion.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;newFiber.effectTag&nbsp;=&nbsp;Placement;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;lastPlacedIndex;<br>&nbsp;&nbsp;}<br>}<br></code>
```

首先无论如何，这个函数都会返回最近操作的节点 index。然后注意当有可复用节点（current !== null）时的逻辑：

-   如果旧节点位置比最近操作的位置靠左，就标记“Placement”，“移动”到新位置
    
-   如果旧节点位置比最近操作的位置相同或靠右，不需要任何操作
    

所以当新树对旧树的子节点进行了交叉换位，一定是左边的旧节点挪到右边，而右边的不动。咱们用一个例子再试下下

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.10 小结

这章内容比较多，稍微总结下：

-   Fiber 树通过 beginWork 同时进行创建和“向下”遍历
    
-   创建过程也是 current（旧）、workInProgress（新）两棵树 Diffing 的过程，决定哪些旧节点需要复用、删除、移动，哪些新节点需要创建
    
-   只有父节点相互复用，才会触发子节点 Diffing，所以跨父节点的移动是铁定 Diffing 不到的
    
-   复用的条件是 key 和 type 都相同，所以 key 能提升复用率
    
-   子节点间的 Diffing 是一个“先做简单题”的过程，假设的优先级为：新子节点只有一个 —> 子节点只发生末尾的增删 —> 其他情况
    
-   对应的，Diffing 策略也分为：单节点 Diffing —> 一轮循环 —> 二轮循环
    
-   Diffing 过程中会把结果（操作）以 Effect 的形式挂到节点上
    

## 5\. EffectList 副作用及其收集

在 Diffing 的过程中，我们已经注意到几次 effectTag 的标记，比如 placeChild 中的newFiber.effectTag = Placement;，deleteChild 中的 childToDelete.effectTag = Deletion;，来标记节点的创建、移动、删除。

React 的所有 effect 类型都在这里 packages/shared/ReactSideEffectTags.js。

### 5.1 为什么要向上收集？

给单个节点添加 effectTag 很好理解，等 Diffing 全部结束，我们统一找到有 effectTag 的节点做对应操作就好。比如某个节点标记了 Deletion，并且关联了一个 DOM 节点，就可以卸载这个 DOM 了。

从性能的角度，因为我们可以预见 Diffing 结束后要收集全部节点的 effectTag，那必然再发起一轮遍历，是不划算的，就不如在 Diffing 过程中直接同步完成收集。

还有另外一个场景：某个旧节点标记了 Deletion，但 Diffing 结束后，新树中并没有这个节点，也就不知道要删这个节点。那看起来唯一的办法就是把这个节点以某种形式挂到新节点上，但它自己又没有关联节点，就只能往上挂父节点的关联节点（这个是存在的，因为前面 Diffing 就发生在“已存在复用关系的新旧节点的子节点之间”）。

## 5.2 effectList 链表

Diffing 遍历过程是深度优先的，必然存在“子节点 effect 早于父节点得出”，所以在遍历离开节点时，只要不断沿着树向父节点传递，就能让每个节点收集到所有后代节点的 effect，最终传到根节点就完成了整棵树的收集。

为了让每个节点都有“保存所有后代节点 effect 的能力”，Fiber 给节点定义一个 effectList，通过链表实现。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   BCZ 都是后代节点（新旧都有可能），因为没有什么能比原节点更能全面覆盖节点的信息，比如它关联的 DOM 等等。
    
-   但此结构和树结构没有任何关系，不要混淆，BCZ可能是子节点、关联旧节点的子节点，或者是若干代以下的新旧节点
    
-   整个链表通过 fisrtEffect —> nextEffect —> lastEffect 串起来，链表的好处在于方便合并，比如下面报上来一串，你可以在链表任意位置打断把那一串拼进去
    

### 5.3 收集过程

当某个节点不存在子节点，就要从这个节点离开了，改执行 completeUnitOfWork。遍历那块说过，completeUnitOfWork 有个内层 do while 循环，从当前节点沿着 Fiber 树往上爬。

每次循环经过一个节点，都会向上合并 effectList，又分为两部分：合并后代节点的、合并自己的。

**合并后代节点 effectList**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">if</span>&nbsp;(returnFiber.firstEffect&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;returnFiber.firstEffect&nbsp;=&nbsp;workInProgress.firstEffect;<br>}<br><span data-darkreader-inline-color="">if</span>&nbsp;(workInProgress.lastEffect&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(returnFiber.lastEffect&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;returnFiber.lastEffect.nextEffect&nbsp;=&nbsp;workInProgress.firstEffect;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;returnFiber.lastEffect&nbsp;=&nbsp;workInProgress.lastEffect;<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**上报自己的 effectTag**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;effectTag&nbsp;=&nbsp;workInProgress.effectTag;<br><span data-darkreader-inline-color="">if</span>&nbsp;(effectTag&nbsp;&gt;&nbsp;PerformedWork)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(returnFiber.lastEffect&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;returnFiber.lastEffect.nextEffect&nbsp;=&nbsp;workInProgress;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;returnFiber.firstEffect&nbsp;=&nbsp;workInProgress;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;returnFiber.lastEffect&nbsp;=&nbsp;workInProgress;<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 5.4 删除旧节点的 effect 怎么上报的？

前面的逻辑没提，其实答案在删除节点时调用的 deleteChild 上。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;deleteChild(returnFiber:&nbsp;Fiber,&nbsp;childToDelete:&nbsp;Fiber):&nbsp;void&nbsp;{<br>&nbsp;&nbsp;const&nbsp;last&nbsp;=&nbsp;returnFiber.lastEffect;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(last&nbsp;!==&nbsp;null)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;last.nextEffect&nbsp;=&nbsp;childToDelete;<br>&nbsp;&nbsp;&nbsp;&nbsp;returnFiber.lastEffect&nbsp;=&nbsp;childToDelete;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;returnFiber.firstEffect&nbsp;=&nbsp;returnFiber.lastEffect&nbsp;=&nbsp;childToDelete;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;childToDelete.nextEffect&nbsp;=&nbsp;null;<br>&nbsp;&nbsp;childToDelete.effectTag&nbsp;=&nbsp;Deletion;<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 6\. Host 实例的关联和更新

到目前为止，Fiber 树上的一系列动作还都没 DOM 什么事。但前面有提到，带有副作用的节点可能关联一个 DOM，并根据 effectTag 操作这个 DOM。

在 React 中，我们自己实现的组件是不直接关联到 DOM 的，但 JSX 中引用的诸如 div、span 这种原生标签由宿主实现，称为 HostComponent。（宿主指的是UI层，比如 react-dom、react-native，他们提供API对接 react 本身的框架能力，并负责具体渲染）。

在这类 fiber 节点上，有一个 stateNode 属性，关联具体的宿主实例，比如 react-dom 下的原生 DOM 对象，它们是通过 ReactFiberHostConfig 连接到宿主环境的诸如 document.createElement 这样的 API 返回的。如果需要的话，react 会在节点 effect 收集前完成对 stateNode 的创建、更新，以及对应 effect 的标记。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 6.1 completeWork

现在回到 completeUnitOfWork。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">completeUnitOfWork</span>(<span>unitOfWork:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;workInProgress&nbsp;=&nbsp;unitOfWork;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">do</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;completeWork(current,&nbsp;workInProgress);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;省略：收集 effect 的逻辑（Part 4）</span><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(workInProgress&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>);<br>}<br></code>
```

在它的内部循环里，可以看到对每个节点，都会在收集 effect 之前调用 completeWork。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">completeWork</span>(<span>current:&nbsp;Fiber&nbsp;|&nbsp;null,&nbsp;workInProgress:&nbsp;Fiber</span>):&nbsp;<span data-darkreader-inline-color="">Fiber</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newProps&nbsp;=&nbsp;workInProgress.pendingProps;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">switch</span>&nbsp;(workInProgress.tag)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;FunctionComponent:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...&nbsp;很多直接&nbsp;break&nbsp;的类型</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;HostComponent:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(current&nbsp;!==&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;workInProgress.stateNode&nbsp;!=&nbsp;<span data-darkreader-inline-color="">null</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;更新分支</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;updateHostComponent(current,&nbsp;workInProgress,&nbsp;type,&nbsp;newProps,&nbsp;rootContainerInstance);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建分支...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

进到 completeWork 后，我们看到大部分组件都直接 break 了，只有少部分涉及 Host 的会做一些操作，比如 HostComponent、HostRoot、HostText、HostPortal 等等。以最典型的 HostComponent 为例，更新/创建 Host 实例 —> 打 effectTag，这个流程又分更新和创建分支。

看分支前，我们先认识一个 markUpdate 方法。只有一行代码，就是给节点打上 Update tag，这也是在 effect 收集前执行的原因 —— 保证 Update tag 能被收集到。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">markUpdate</span>(<span>workInProgress:&nbsp;Fiber</span>)&nbsp;</span>{<br>&nbsp;&nbsp;workInProgress.effectTag&nbsp;|=&nbsp;Update;<br>}<br></code>
```

### 6.2 更新 Host 实例

如果 workInProgress.stateNode 存在，说明有绑定旧实例，updateHostComponent。updateHostComponent 会根据宿主配置（是否支持修改、持久化）有几种不同的实现，其中 DOM 下因为支持修改，实现如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">updateHostComponent&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>current:&nbsp;Fiber,workInProgress:&nbsp;Fiber,type:&nbsp;Type,newProps:&nbsp;Props,rootContainerInstance:&nbsp;Container</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;instance:&nbsp;Instance&nbsp;=&nbsp;workInProgress.stateNode;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;currentHostContext&nbsp;=&nbsp;getHostContext();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;updatePayload&nbsp;=&nbsp;prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);<br>&nbsp;&nbsp;workInProgress.updateQueue&nbsp;=&nbsp;(updatePayload:&nbsp;any);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(updatePayload)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;markUpdate(workInProgress);<br>&nbsp;&nbsp;}<br>};<br></code>
```

1.  prepareUpdate（由宿主配置提供）：获取更新现有实例要修改的属性
    
2.  markUpdate：标记 Update effectTag
    

### 6.3 创建 Host 实例

如果 workInProgress.stateNode 不存在，说明没有旧实例，要创建新实例。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;instance&nbsp;=&nbsp;createInstance(type,&nbsp;newProps,&nbsp;rootContainerInstance,&nbsp;currentHostContext,&nbsp;workInProgress);<br>appendAllChildren(instance,&nbsp;workInProgress,&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">false</span>);<br><span data-darkreader-inline-color="">if</span>&nbsp;(finalizeInitialChildren(instance,&nbsp;type,&nbsp;newProps,&nbsp;rootContainerInstance,&nbsp;currentHostContext))&nbsp;markUpdate(workInProgress);<br>workInProgress.stateNode&nbsp;=&nbsp;instance;<br></code>
```

1.  createInstance（由宿主配置提供）：创建新 DOM 对象
    
2.  appendAllChildren：遍历子节点，逐个调 appendInitialChild（由宿主配置提供）把子节点的 DOM 节点挂到当前 DOM 节点下。**这也是从下往上执行的一个重要原因 —— DOM 树也需要先构建子节点再插入父节点。**
    
3.  markUpdate：标记 Update effectTag
    
4.  workInProgress.stateNode = instance：挂载 stateNode
    

## 7\. 总结

本文从协调过程出发，讨论 Fiber 树在构建过程中表现出的遍历方式、Diffing 理念、副作用收集方式。

-   Fiber 树由链表构成，节点间通过 return（父节点）、child（第一个子节点）、sibling（下一个兄弟节点）相连。
    
-   当前视图对应的 Fiber 树称为 current 树，每次协调发起，都会构建新的 workInProgress 树，并在结束时替换 current 树。
    
-   Fiber 树的遍历方式是深度优先遍历，向下的过程由 beginWork 发起，向上的过程由 completeUnitOfWork 发起。beginWork 每次只向下一步，completeUnitOfWork 则每次向上若干步（由其内部若干个一步循环达成）。
    
-   Fiber 树是边构建边遍历的，构建在 beginWork 向下过程中发起。
    
-   Fiber 树的 Diffing 策略体现在构建过程中：父节点已复用、key 和 type 相同是节点复用的基本条件；子节点 Diffing 从易向难，单节点 Diffing —> 多节点末尾增删（一轮循环） —> 多节点其他情况（二轮循环）。
    
-   Diffing 的结果，诸如节点的删除、新增、移动，称为 effect，以 effectTag 的形式挂在节点上。
    
-   completeUnitOfWork 的内部循环会自底向上收集 effect，不断把有 effectTag 的子节点和自身向上合并到父节点的 effectList 中，直至根节点。effectList 是个链表。
    
-   宿主相关组件节点会把宿主实例挂到 stateNode 上，间接调用宿主方法对其完成创建、更新，由此也会产生 effectTag。