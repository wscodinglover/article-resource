## diff算法解析

## 为何用diff算法

由于在浏览器中操作DOM的代价是非常“昂贵”的，所以才在Vue引入了 Virtual DOM，即使使用了Virtual DOM来进行真实DOM的渲染，在页面更新的时候，也不能全量地将整颗Virtual DOM进行渲染，而是去渲染改变的部分，这时候就需要一个计算Virtual DOM树改变部分的算法了。

## 传统diff算法

传统的Diff算法通过循环递归对节点进行比较，然后判断每个节点的状态以及要做的操作（add，remove，change），最后 根据Virtual DOM进行DOM的渲染

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/XUve7xLr9taKjonVf9mNHAPuS0lQgr7bIwumpL4CblgTCHuXhCd9bv23AN7aFAavQiauDicWu4nsvzo8PsgZTOEw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

比如左侧树每个节点与右侧树每个节点依次进行遍历对比(A->A、A->D、A->B、A->C ......)，时间复杂度O(n^2)，在每个循环中，还需要比较两个元素是否相等，这需要进行一次额外的循环，时间复杂度为O(n)。因此，总时间复杂度为O(n^2 \* n) = O(n^3)。

## vue2 diff算法

### vue数据驱动

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   通过Object.defineProperty函数改写了数据的getter和setter函数，来实现依赖收集和派发更新
    
-   一个key值对应一个Dep实例，一个Dep实例可以包含多个Watcher，一个Wathcer也可以包含多个Dep
    
-   Dep用于依赖的收集与管理，并通知对应的Watcher执行相应的操作
    
-   依赖收集的时机是在执行render方法的时候，读取vm上的数据,触发getter函数。而派发更新即在变更数据的时候，触发setter函数，通过dep.notify()，通知到所收集的watcher，执行相应操作
    

### diff算法原理图

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### diff算法的策略

深度优先，同层比较

1.  比较只会在同层进行，不会跨层比较
    
2.  比较的过程中，循环从两边向中间靠拢
    

### updateChildren

1.  同级比较，减少对比次数，提高对比性能，时间复杂度在O(n)
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  首尾指针法
    

1.  依次比对，当成功后退出当前比较
    
2.  渲染结构以newVnode为准
    
3.  每次比较成功后，start点和end点向中间靠拢
    
4.  当新旧节点中有一个start点跑到end点右侧时，终止比较
    
5.  如果都匹配不到，则旧虚拟dom key只去对比新虚拟dom的ke值，如果key相同则服用，并移动到新虚拟dom的位置
    

### 比对顺序

1.  首先，旧虚拟节点的start和新虚拟节点的start做比对，如果没有比对成功，就用旧虚拟节点的start和新虚拟节点的end做比对
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  如果依旧没有比对成功，就用旧虚拟节点的end和新虚拟节点的start做比对，如果依旧没有成功，就虚拟节点的end和新虚拟节点的end做比对
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3.  当比对成功，就退出比对，渲染结果也会以新虚拟节点的结果为准
    
4.  每次比对成功后，比对成功的start会右移，end会向左移动。在移动的过程中，当start点跑到end的右侧就终止比较
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## vue3的diff算法

### 静态节点

Vue3的编译器会在编译阶段对模板进行静态分析，将静态节点和动态节点分开，将静态节点标记为常量，并将其生成为一个单独的常量节点。在渲染时，Vue3会直接使用常量节点，而不需要重新创建节点，从而提高渲染性能。可以手动标记静态节点：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">template</span>&nbsp;<span data-darkreader-inline-color="">v-slot:header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>静态头部<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">teamplate</span>&gt;</span><br></code>
```

vue3 diff算法是一种按序比较，在同层节点比较的基础上，将比较的范围延伸到新旧DOM树中，适用于更加复杂的节点结构。充分理由虚拟dom中节点的结构信息。如静态节点的优化，会将静态节点拆分出来单独处理。

当 Vue3 Patch 函数接收到新旧 VNode 后，会让新旧 VNode 树进行上述的 Profiling 过程，然后将标记过的节点传递过来。Patch 函数在得到标记后的两棵树后，首先递归比较新旧树的根节点是否相同。

如果不相同，那么同 React Diff 算法一样，查找新 VNode 在旧 VNode 数组中是否存在。如果旧 VNode 中不存在，代表这是一个新增节点，直接使用 createVNode 创建 newNode 并插入到旧 VNode 的 DOM 中；否则的话，可能是新 VNode 与某个旧 VNode 是同个父节点下的兄弟节点，也可能是新 VNode 嵌套在某个旧 VNode 的子树中。

对于这两种情况分别进行处理：

### 情况1：新旧 VNode 是兄弟节点

在这种情况下，Vue3 Diff 算法会采用“按序比较”的策略。会生成新旧 VNode 的 keys 数组，然后对两个 keys 数组做一次 fuzzy 的匹配，得到一个新旧 keys 数组的映射表（Map）。根据映射表的数据可以知道新旧 VNode 的映射关系，从而知道该做什么来完成更新。

举个例子：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!--&nbsp;before&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;!--&nbsp;旧&nbsp;VNode&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"a"</span>&gt;</span>A<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"b"</span>&gt;</span>B<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"c"</span>&gt;</span>C<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;!--&nbsp;after&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;!--&nbsp;新&nbsp;VNode&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"c"</span>&gt;</span>C<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"b"</span>&gt;</span>B<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"d"</span>&gt;</span>D<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;!--&nbsp;首先生成新旧 VNode 的 keys 数组：&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;Old:&nbsp;["a",&nbsp;"b",&nbsp;"c"]&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;New:&nbsp;["c",&nbsp;"b",&nbsp;"d"]&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;通过 fuzzy 匹配得到以下的映射表：&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;M:&nbsp;{a:&nbsp;undefined,&nbsp;b:&nbsp;1,&nbsp;c:&nbsp;0,&nbsp;d:&nbsp;undefined}&nbsp;--&gt;</span><br><br><span data-darkreader-inline-color="">&lt;!--&nbsp;此时将新 VNode 映射为&nbsp;[C, B, D]，而旧 VNode 映射为&nbsp;[A, B, C]。&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;接下来的工作，就是根据映射关系，在旧节点中进行增删改操作。&nbsp;--&gt;</span><br><span data-darkreader-inline-color="">&lt;!--&nbsp;最终完成的 DOM 如下：&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"c"</span>&gt;</span>C<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;!--&nbsp;旧的节点&nbsp;b&nbsp;变成了新的&nbsp;b&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"b"</span>&gt;</span>B<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;!--&nbsp;新增了一个节点&nbsp;d&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">"d"</span>&gt;</span>D<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br></code>
```

### 情况2：新 VNode 在旧 VNode 中的子节点里

如果新 VNode 在旧 VNode 子树中间，那么需要将它递归更新。

在遍历新旧 VNode 期间，Vue3 Diff 算法会按照 key 值或 index 值优先匹配新旧 VNode，这样可以显著地优化性能。同时，出于优化的目的，Vue3 Diff 算法还对一些特定情况做了特殊处理，例如处理静态节点，处理数组时的优化，等等。

综上所述，Vue3 Diff 算法采用了更为高效且灵活的“按序比较”策略，提高了数据处理的速度和效率，从而实现更快的页面渲染并更好地回应用户的操作。

## vue和react的diff算法比较

1.  vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。
    
2.  vue对比节点。当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而react认为是同类型节点，只是修改节点属性。
    
3.  vue的列表对比，采用的是两端到中间比对的方式，而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个
    

## 总结

1.  `react-diff`: 双端对比（列表顺序变化会损失性能）
    
2.  `vue-diff`: 双指针方式对比（潜逃过深的节点结果会导致算法性能下降）
    
3.  总体来讲`vue的diff算法更佳`,总体规律就是找到新节点所对应的旧节点列表中的节点,而后给真实的对应的dom移动到正确的位置
    

> 文章出自：https://juejin.cn/post/7224382896626614332
> 
> 作者：OoO酱