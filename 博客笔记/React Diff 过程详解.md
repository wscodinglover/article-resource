在**传统的diff算法**中复杂度会达到**O(n^3)**。**React**中定义了三种策略，在对比时，根据策略**只需遍历一次树****就可以完成对比**，将复杂度降到了**O(n)，**具体如下：

**1\. tree diff：**

两个树对比时，只会比较同一层级的节点，会忽略掉跨层级

![Image](https://mmbiz.qpic.cn/mmbiz_png/xQYlUJXFiaCpiaL6GIghIic0NM0NX4WkPWNSaib8UBqWY5Uo2FtO5kQtPZlNE3effOq5GbS4zbX5nRia3sSXHYgsr9g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**2\. component diff：**

在对比两个组件时，首先会判断它们两个的类型是否相同，如果不同，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点

![Image](https://mmbiz.qpic.cn/mmbiz_png/xQYlUJXFiaCpiaL6GIghIic0NM0NX4WkPWNicibUReEz5S3jJrsLCQUTaflanxJdkbeanFvFn6OHQQ5c9SetqeoSeqA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)  

**3\. element diff：**

对于同一层级的一组节点，会使用具有唯一性的key来区分是否需要创建，删除，或者是移动。**React diff 提供了三种节点操作**，分别为：

-   **INSERT\_MARKUP（插入）**
    

新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作

-   **MOVE\_EXISTING（移动）**
    

在老集合有新 component 类型，且 element 是可更新的类型,这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。

-   **REMOVE\_NODE（删除）**
    

老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作

**举例说明 - 存在如下结构：**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

新老集合进行 **diff 差异**化对比，**通过 key** 发现新老集合中的节点都是相同的节点，因此**无需进行节点删除和创建**，只需要将老集合中节点的**位置进行移动**，更新为新集合中节点的位置，此时 React 给出的 diff 结果为：**B、D 不做任何操作，A、C 进行移动操作。**

-   首先对新集合的节点进行循环遍历，for (name in nextChildren)
    
-   通过唯一 key 可以判断新老集合中是否存在相同的节点，if (prevChild === nextChild)
    
-   如果存在相同节点，则进行移动操作
    
-   但在移动前需要将当前节点在老集合中的位置与 lastIndex 进行比较
    

-   if (child.\_mountIndex < lastIndex)，则进行节点移动操作，否则不执行该操作。
    
-   lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置）。
    
-   如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作。
    
-   只有当访问的节点比 lastIndex 小时，才需要进行移动操作。
    

-   当完成新集合中所有节点 diff 时，最后还需要对老集合进行循环遍历，判断是否存在新集合中没有但老集合中仍存在的节点，发现存在这样的节点 x，因此删除节点 x，到此 diff 全部完成。