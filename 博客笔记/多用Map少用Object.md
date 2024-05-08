![Image](https://mmbiz.qpic.cn/mmbiz_jpg/cqZHxcufibMXXgghrR47H71LW0aIKXmBKdufnkyxr6ibxSTKCoDArFqb8Wia0RzLBbVceDyZo6y5dSRCu3lpjTkicg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

`JavaScript`中的`Object`非常强大。它们可以做任何事情！确切地说……任何事情。

但是，就像所有事物一样，仅仅因为你可以做某事，并不意味着你（一定）应该这样做。

```
<span data-darkreader-inline-color="">// 🚩</span><br><span data-darkreader-inline-color="">const</span> mapOfThings <span data-darkreader-inline-color="">=</span> <span>{</span><span>}</span><br><br>mapOfThings<span>[</span>myThing<span>.</span>id<span>]</span> <span data-darkreader-inline-color="">=</span> myThing<br><br><span data-darkreader-inline-color="">delete</span> mapOfThings<span>[</span>myThing<span>.</span>id<span>]</span><br>
```

例如，如果你在`JavaScript`中使用对象来存储任意键值对，并且你经常会添加和删除键，那么你真的应该考虑使用`Map`而不是普通对象。

```
<span data-darkreader-inline-color="">// ✅</span><br><span data-darkreader-inline-color="">const</span> mapOfThings <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>)</span><br><br>mapOfThings<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>myThing<span>.</span>id<span>,</span> myThing<span>)</span><br><br>mapOfThings<span>.</span><span data-darkreader-inline-color="">delete</span><span>(</span>myThing<span>.</span>id<span>)</span><br>
```

与对象相比，对象在性能上存在问题，其中删除操作符以性能低下而臭名昭著，而`Map`针对这种情况进行了优化，并且在某些情况下可以显著提高速度。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在此基准测试中，`Map`比对象快约5倍。

MDN本身澄清了`Map`针对频繁添加和删除键的此用例进行了专门优化，与对象相比，对象对于此用例并不那么优化：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`MDN`文档指出，与对象相比，Map在涉及频繁添加和删除键值对的情况下性能更好。

如果您好奇为什么，这与`JavaScript`虚拟机如何优化`JS`对象有关，它们假设了对象的形状，而`Map`是专门为哈希映射用例而构建的，其中键是动态的并且经常变化的。

但是除了性能外，Map还解决了对象存在的几个问题。

## 内置键问题

对象用于哈希映射类似用例的一个主要问题是，对象已经预先填充了大量键。什么？

```
<span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span>{</span><span>}</span><br><br>myMap<span>.</span>valueOf <span data-darkreader-inline-color="">// =&gt; [Function: valueOf]</span><br>myMap<span>.</span>toString <span data-darkreader-inline-color="">// =&gt; [Function: toString]</span><br>myMap<span>.</span>hasOwnProperty <span data-darkreader-inline-color="">// =&gt; [Function: hasOwnProperty]</span><br>myMap<span>.</span>isPrototypeOf <span data-darkreader-inline-color="">// =&gt; [Function: isPrototypeOf]</span><br>myMap<span>.</span>propertyIsEnumerable <span data-darkreader-inline-color="">// =&gt; [Function: propertyIsEnumerable]</span><br>myMap<span>.</span>toLocaleString <span data-darkreader-inline-color="">// =&gt; [Function: toLocaleString]</span><br>myMap<span>.</span>constructor <span data-darkreader-inline-color="">// =&gt; [Function: Object]</span><br>
```

因此，如果您尝试访问这些属性中的任何一个，即使这个对象应该是空的，每个属性都已经有了值。

仅此就应该是不使用对象作为任意键哈希映射的明显理由之一，因为它可能导致一些你只能在后来发现的非常棘手的错误。

## 遍历的尴尬

说到`JavaScript`对象处理键的奇怪方式，遍历对象充满了陷阱。

例如，你可能已经知道不要这样做：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> key <span data-darkreader-inline-color="">in</span> myObject<span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">// 🚩 你可能会碰到一些你不想要的继承的键</span><br><span>}</span><br>
```

你可能被告知要这样做：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> key <span data-darkreader-inline-color="">in</span> myObject<span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>myObject<span>.</span><span data-darkreader-inline-color="">hasOwnProperty</span><span>(</span>key<span>)</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">// 🚩</span><br>  <span>}</span><br><span>}</span><br>
```

但是这仍然有问题，因为`myObject.hasOwnProperty`可以很容易被覆盖为任何其他值。任何人都可以做`myObject.hasOwnProperty = () => explode()`。

所以你真的应该做这个古怪的混乱：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> key <span data-darkreader-inline-color="">in</span> myObject<span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span><span data-darkreader-inline-color="">Object</span><span>.</span>prototype<span>.</span><span data-darkreader-inline-color="">hasOwnProperty</span><span>.</span><span data-darkreader-inline-color="">call</span><span>(</span>myObject<span>,</span> key<span>)</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">// 😕</span><br>  <span>}</span><br><span>}</span><br>
```

或者如果你喜欢你的代码不看起来像一团糟，你可以使用最近添加的`Object.hasOwn`：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> key <span data-darkreader-inline-color="">in</span> myObject<span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>Object<span>.</span><span data-darkreader-inline-color="">hasOwn</span><span>(</span>myObject<span>,</span> key<span>)</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">// 😐</span><br>  <span>}</span><br><span>}</span><br>
```

或者你可以完全放弃`for`循环，只使用`Object.keys`和`forEach`。

```
Object<span>.</span><span data-darkreader-inline-color="">keys</span><span>(</span>myObject<span>)</span><span>.</span><span data-darkreader-inline-color="">forEach</span><span>(</span><span>key</span> <span data-darkreader-inline-color="">=&gt;</span> <span>{</span><br>  <span data-darkreader-inline-color="">// 😬</span><br><span>}</span><span>)</span><br>
```

然而，对于`map`，完全没有这样的问题。你可以使用标准的`for`循环，标准的迭代器，以及一个非常好的解构模式，一次性获取键和值：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> <span>[</span>key<span>,</span> value<span>]</span> <span data-darkreader-inline-color="">of</span> myMap<span>)</span> <span>{</span><br> <span data-darkreader-inline-color="">// 😍</span><br><span>}</span><br>
```

我们现在有了一个`Object.entries`方法来使用对象做类似的事情。

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> <span>[</span>key<span>,</span> value<span>]</span> <span data-darkreader-inline-color="">of</span> Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>myObject<span>)</span><span>)</span> <span>{</span><br> <span data-darkreader-inline-color="">// 🙂</span><br><span>}</span><br>
```

将它添加到“对象中的循环很丑陋，所以请选择以下5个选项中的一个”的长列表中。

但对于`Maps`，很高兴知道有一种简单而优雅的方法可以直接迭代。

另外，您还可以仅遍历键或值：

```
<span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> value <span data-darkreader-inline-color="">of</span> myMap<span>.</span><span data-darkreader-inline-color="">values</span><span>(</span><span>)</span><span>)</span> <span>{</span><br> <span data-darkreader-inline-color="">// 🙂</span><br><span>}</span><br><br><span data-darkreader-inline-color="">for</span> <span>(</span><span data-darkreader-inline-color="">const</span> key <span data-darkreader-inline-color="">of</span> myMap<span>.</span><span data-darkreader-inline-color="">keys</span><span>(</span><span>)</span><span>)</span> <span>{</span><br> <span data-darkreader-inline-color="">// 🙂</span><br><span>}</span><br>
```

## 键排序

`Maps`的另一个额外好处是它们保留其键的顺序。这是长期以来要求对象的一个优质特性，现在`Maps`中也存在。

这给了我们另一个非常酷的功能，那就是我们可以直接从`Maps`中解构键，按照它们的确切顺序：

```
<span data-darkreader-inline-color="">const</span> <span>[</span><span>[</span>firstKey<span>,</span> firstValue<span>]</span><span>]</span> <span data-darkreader-inline-color="">=</span> myMap<br>
```

这也可以打开一些有趣的用例，比如轻松实现`O(1)LRU`缓存：

## Copying

现在你可能会说，哦，好吧，对象有一些优势，比如它们很容易复制，例如，使用对象展开或分配。

```
<span data-darkreader-inline-color="">const</span> copied <span data-darkreader-inline-color="">=</span> <span>{</span><span data-darkreader-inline-color="">...</span>myObject<span>}</span><br><span data-darkreader-inline-color="">const</span> copied <span data-darkreader-inline-color="">=</span> Object<span>.</span><span data-darkreader-inline-color="">assign</span><span>(</span><span>{</span><span>}</span><span>,</span> myObject<span>)</span><br>
```

但事实证明，`Maps`也同样容易复制：

```
<span data-darkreader-inline-color="">const</span> copied <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>myMap<span>)</span><br>
```

这能够工作的原因是`Map`的构造函数接受一个`[key, value]`元组的可迭代对象。并且方便的是，`Maps`是可迭代的，产生它们的键和值的元组。很好。

同样地，您还可以做映射的深拷贝，就像您可以使用`structuredClone`做对象一样：

```
<span data-darkreader-inline-color="">const</span> deepCopy <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">structuredClone</span><span>(</span>myMap<span>)</span><br>
```

## 将`Maps`转换为对象和对象转换为`Maps`

使用`Object.fromEntries`可以很容易地将`Maps`转换为对象：

```
<span data-darkreader-inline-color="">const</span> myObj <span data-darkreader-inline-color="">=</span> Object<span>.</span><span data-darkreader-inline-color="">fromEntries</span><span>(</span>myMap<span>)</span><br>
```

而反过来也很简单，使用`Object.entries`：

```
<span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>myObj<span>)</span><span>)</span><br>
```

现在我们知道这一点了，我们再也不需要使用元组构造映射：

```
<span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>[</span><span>[</span><span data-darkreader-inline-color="">'key'</span><span>,</span> <span data-darkreader-inline-color="">'value'</span><span>]</span><span>,</span> <span>[</span><span data-darkreader-inline-color="">'keyTwo'</span><span>,</span> <span data-darkreader-inline-color="">'valueTwo'</span><span>]</span><span>]</span><span>)</span><br>
```

您可以像对象一样构造它们，这对我来说在视觉上更加舒服：

```
<span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span><span>{</span><br>  key<span>:</span> <span data-darkreader-inline-color="">'value'</span><span>,</span><br>  keyTwo<span>:</span> <span data-darkreader-inline-color="">'valueTwo'</span><span>,</span><br><span>}</span><span>)</span><span>)</span><br>
```

或者您也可以制作一个方便的小助手：

```
<span data-darkreader-inline-color="">const</span> <span data-darkreader-inline-color="">makeMap</span> <span data-darkreader-inline-color="">=</span> <span>(</span><span>obj</span><span>)</span> <span data-darkreader-inline-color="">=&gt;</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>obj<span>)</span><span>)</span><br><br><span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">makeMap</span><span>(</span><span>{</span> key<span>:</span> <span data-darkreader-inline-color="">'value'</span> <span>}</span><span>)</span><br>
```

或者使用TypeScript：

```
<span data-darkreader-inline-color="">const</span> makeMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">&lt;</span><span data-darkreader-inline-color="">V</span> <span data-darkreader-inline-color="">=</span> unknown<span data-darkreader-inline-color="">&gt;</span><span>(</span><span>obj<span>:</span> Record<span data-darkreader-inline-color="">&lt;</span>string<span>,</span> <span data-darkreader-inline-color="">V</span><span data-darkreader-inline-color="">&gt;</span></span><span>)</span> <span data-darkreader-inline-color="">=&gt;</span> <br>  <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span data-darkreader-inline-color="">&lt;</span>string<span>,</span> <span data-darkreader-inline-color="">V</span><span data-darkreader-inline-color="">&gt;</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>obj<span>)</span><span>)</span><br><br><span data-darkreader-inline-color="">const</span> myMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">makeMap</span><span>(</span><span>{</span> key<span>:</span> <span data-darkreader-inline-color="">'value'</span> <span>}</span><span>)</span><br><span data-darkreader-inline-color="">// =&gt; Map&lt;string, string&gt;</span><br>
```

## 键类型

`Maps`不仅是在JavaScript中处理键值`Maps`的更符合人体工程学和性能更好的方式。它们甚至可以做一些只有使用普通对象根本无法完成的事情。

例如，`Maps`不限于只有字符串作为键 - 你可以使用`任何类型`的对象作为`Maps`的键。

```
myMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span><span>{</span><span>}</span><span>,</span> value<span>)</span><br>myMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span><span>[</span><span>]</span><span>,</span> value<span>)</span><br>myMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>document<span>.</span>body<span>,</span> value<span>)</span><br><br><br>myMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span><span data-darkreader-inline-color="">function</span><span>(</span><span>)</span> <span>{</span><span>}</span><span>,</span> value<span>)</span><br>myMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>myDog<span>,</span> value<span>)</span><br>
```

但是，为什么？

其中一个有用的用例是在不直接修改对象的情况下将元数据与对象关联起来。

```
<span data-darkreader-inline-color="">const</span> metadata <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>)</span><br><br>metadata<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>myDomNode<span>,</span> <span>{</span><br>  internalId<span>:</span> <span data-darkreader-inline-color="">'...'</span><br><span>}</span><span>)</span><br><br>metadata<span>.</span><span data-darkreader-inline-color="">get</span><span>(</span>myDomNode<span>)</span><br><span data-darkreader-inline-color="">// =&gt; { internalId: '...' }</span><br>
```

这可能很有用，例如，当您想要将临时状态与您从数据库中读取和写入的对象相关联时。您可以添加与对象引用直接关联的临时数据，而不会有风险。

```
<span data-darkreader-inline-color="">const</span> metadata <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>)</span><br><br>metadata<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>myTodo<span>,</span> <span>{</span><br>  focused<span>:</span> <span data-darkreader-inline-color="">true</span><br><span>}</span><span>)</span><br><br>metadata<span>.</span><span data-darkreader-inline-color="">get</span><span>(</span>myTodo<span>)</span><br><span data-darkreader-inline-color="">// =&gt; { focused: true }</span><br>
```

现在，当我们将`myTodo`保存回数据库时，只有我们想要保存的值存在，我们的临时状态（位于另一个映射中）不会被意外包含。

通常情况下，垃圾回收器会收集这个对象并将其从内存中删除。然而，由于我们的`Maps`持有一个引用，它将永远不会被垃圾回收，从而导致内存泄漏。

## WeakMaps

这就是我们可以使用`WeakMap`类型的地方。`WeakMap`完美地解决了上述内存泄漏问题，因为它们对对象保持了弱引用。

因此，如果所有其他引用都被移除，对象将自动被垃圾回收并从该弱映射中删除。

```
<span data-darkreader-inline-color="">const</span> metadata <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">WeakMap</span><span>(</span><span>)</span><br><br><span data-darkreader-inline-color="">// ✅ 没有内存泄漏，当没有其他引用时，`myTodo`将自动从`Map`中移除</span><br>metadata<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>myTodo<span>,</span> <span>{</span><br>  focused<span>:</span> <span data-darkreader-inline-color="">true</span><br><span>}</span><span>)</span><br>
```

## 更多Map相关内容

在我们继续之前，还有一些有用的关于Map的事情需要知道：

```
map<span>.</span><span data-darkreader-inline-color="">clear</span><span>(</span><span>)</span> <span data-darkreader-inline-color="">// 清空整个映射</span><br>map<span>.</span>size <span data-darkreader-inline-color="">// 获取映射的大小</span><br>map<span>.</span><span data-darkreader-inline-color="">keys</span><span>(</span><span>)</span> <span data-darkreader-inline-color="">// 所有映射键的迭代器</span><br>map<span>.</span><span data-darkreader-inline-color="">values</span><span>(</span><span>)</span> <span data-darkreader-inline-color="">// 所有映射值的迭代器</span><br>
```

`Map`有很好的方法。

##### 集合

如果我们谈论`Map`，我们也应该提到它们的表兄弟，即集合（`Sets`），它们为我们提供了一种更高效的方法来创建唯一元素的列表，我们可以轻松地添加、删除和查找集合中是否包含一个项目：

```
<span data-darkreader-inline-color="">const</span> <span data-darkreader-inline-color="">set</span> <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span><span>[</span><span data-darkreader-inline-color="">1</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>,</span> <span data-darkreader-inline-color="">3</span><span>]</span><span>)</span><br><br><span data-darkreader-inline-color="">set</span><span>.</span><span data-darkreader-inline-color="">add</span><span>(</span><span data-darkreader-inline-color="">3</span><span>)</span><br><span data-darkreader-inline-color="">set</span><span>.</span><span data-darkreader-inline-color="">delete</span><span>(</span><span data-darkreader-inline-color="">4</span><span>)</span><br><span data-darkreader-inline-color="">set</span><span>.</span><span data-darkreader-inline-color="">has</span><span>(</span><span data-darkreader-inline-color="">5</span><span>)</span><br>
```

在某些情况下，集合的性能比使用数组进行等效操作要好得多。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

类似地，我们在`JavaScript`中还有一个`WeakSet`类，它也将帮助我们避免内存泄漏。

```
<span data-darkreader-inline-color="">// 这里没有内存泄漏，上尉 🫡</span><br><span data-darkreader-inline-color="">const</span> checkedTodos <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">WeakSet</span><span>(</span><span>[</span>todo1<span>,</span> todo2<span>,</span> todo3<span>]</span><span>)</span><br>
```

##### 序列化

现在你可能会说，普通对象和数组相对于映射和集合还有一个优势 —— 序列化。

`JSON.stringify()/ JSON.parse()` 对对象和映射的支持非常方便。

但是，你有没有注意到，当你想要漂亮地打印`JSON`时，你总是不得不添加一个`null`作为第二个参数？你知道这个参数到底是干什么的吗？

```
<span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">stringify</span><span>(</span>obj<span>,</span> <span data-darkreader-inline-color="">null</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>)</span><br><span data-darkreader-inline-color="">//                  ^^^^ 这个参数是干嘛的</span><br>
```

事实证明，这个参数对我们非常有帮助。它被称为`replacer`，它允许我们定义任何自定义类型应该如何被序列化。

我们可以利用这一点，轻松地将映射和集合转换为对象和数组进行序列化：

```
<span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">stringify</span><span>(</span>obj<span>,</span> <span>(</span><span>key<span>,</span> value</span><span>)</span> <span data-darkreader-inline-color="">=&gt;</span> <span>{</span><br>  <span data-darkreader-inline-color="">// 将映射转换为普通对象</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value <span data-darkreader-inline-color="">instanceof</span> <span data-darkreader-inline-color="">Map</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> Object<span>.</span><span data-darkreader-inline-color="">fromEntries</span><span>(</span>value<span>)</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">// 将集合转换为数组</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value <span data-darkreader-inline-color="">instanceof</span> <span data-darkreader-inline-color="">Set</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> Array<span>.</span><span data-darkreader-inline-color="">from</span><span>(</span>value<span>)</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">return</span> value<br><span>}</span><span>)</span><br>
```

现在我们只需将此抽象为一个基本的可重用函数，并进行序列化即可。

```
<span data-darkreader-inline-color="">const</span> test <span data-darkreader-inline-color="">=</span> <span>{</span> <span data-darkreader-inline-color="">set</span><span>:</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span><span>[</span><span data-darkreader-inline-color="">1</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>,</span> <span data-darkreader-inline-color="">3</span><span>]</span><span>)</span><span>,</span> map<span>:</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>[</span><span>[</span><span data-darkreader-inline-color="">"key"</span><span>,</span> <span data-darkreader-inline-color="">"value"</span><span>]</span><span>]</span><span>)</span> <span>}</span><br><br><span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">stringify</span><span>(</span>test<span>,</span> replacer<span>)</span><br><span data-darkreader-inline-color="">// =&gt; { set: [1, 2, 3], map: { key: value } }</span><br>
```

要进行转换回来，我们可以使用相同的技巧与JSON.parse()，但通过使用它的reviver参数，当解析时将数组转换回集合，将对象转换回映射：

```
<span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">parse</span><span>(</span>string<span>,</span> <span>(</span><span>key<span>,</span> value</span><span>)</span> <span data-darkreader-inline-color="">=&gt;</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>Array<span>.</span><span data-darkreader-inline-color="">isArray</span><span>(</span>value<span>)</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span>value<span>)</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value <span data-darkreader-inline-color="">&amp;&amp;</span> <span data-darkreader-inline-color="">typeof</span> value <span data-darkreader-inline-color="">===</span> <span data-darkreader-inline-color="">'object'</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>value<span>)</span><span>)</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">return</span> value<br><span>}</span><span>)</span><br>
```

还要注意，replacer和reviver都可以递归工作，因此它们能够在我们的JSON树中的任何位置序列化和反序列化映射和集合。

但是，我们上面的序列化实现有一个小问题。

我们当前无法在解析时区分普通对象或数组与映射或集合，因此我们不能在我们的JSON中混合使用普通对象和映射，否则我们会得到这样的结果：

```
<span data-darkreader-inline-color="">const</span> obj <span data-darkreader-inline-color="">=</span> <span>{</span> hello<span>:</span> <span data-darkreader-inline-color="">'world'</span> <span>}</span><br><span data-darkreader-inline-color="">const</span> str <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">stringify</span><span>(</span>obj<span>,</span> replacer<span>)</span><br><span data-darkreader-inline-color="">const</span> parsed <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">parse</span><span>(</span>obj<span>,</span> reviver<span>)</span><br><span data-darkreader-inline-color="">// Map&lt;string, string&gt;</span><br>
```

我们可以

通过创建一个特殊的属性来解决这个问题；例如，称为\_\_type的属性，来表示何时应该是映射或集合，而不是普通对象或数组，如下所示：

```
<span data-darkreader-inline-color="">function</span> <span data-darkreader-inline-color="">replacer</span><span>(</span><span>key<span>,</span> value</span><span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value <span data-darkreader-inline-color="">instanceof</span> <span data-darkreader-inline-color="">Map</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> <span>{</span> __type<span>:</span> <span data-darkreader-inline-color="">'Map'</span><span>,</span> value<span>:</span> Object<span>.</span><span data-darkreader-inline-color="">fromEntries</span><span>(</span>value<span>)</span> <span>}</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value <span data-darkreader-inline-color="">instanceof</span> <span data-darkreader-inline-color="">Set</span><span>)</span> <span>{</span><br>    <span data-darkreader-inline-color="">return</span> <span>{</span> __type<span>:</span> <span data-darkreader-inline-color="">'Set'</span><span>,</span> value<span>:</span> Array<span>.</span><span data-darkreader-inline-color="">from</span><span>(</span>value<span>)</span> <span>}</span><br>  <span>}</span><br>  <span data-darkreader-inline-color="">return</span> value<br><span>}</span><br><br><span data-darkreader-inline-color="">function</span> <span data-darkreader-inline-color="">reviver</span><span>(</span><span>key<span>,</span> value</span><span>)</span> <span>{</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value<span data-darkreader-inline-color="">?</span><span>.</span>__type <span data-darkreader-inline-color="">===</span> <span data-darkreader-inline-color="">'Set'</span><span>)</span> <span>{</span> <br>    <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span>value<span>.</span>value<span>)</span> <br>  <span>}</span><br>  <span data-darkreader-inline-color="">if</span> <span>(</span>value<span data-darkreader-inline-color="">?</span><span>.</span>__type <span data-darkreader-inline-color="">===</span> <span data-darkreader-inline-color="">'Map'</span><span>)</span> <span>{</span> <br>    <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span>Object<span>.</span><span data-darkreader-inline-color="">entries</span><span>(</span>value<span>.</span>value<span>)</span><span>)</span> <br>  <span>}</span><br>  <span data-darkreader-inline-color="">return</span> value<br><span>}</span><br><br><span data-darkreader-inline-color="">const</span> obj <span data-darkreader-inline-color="">=</span> <span>{</span> <span data-darkreader-inline-color="">set</span><span>:</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span><span>[</span><span data-darkreader-inline-color="">1</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>]</span><span>)</span><span>,</span> map<span>:</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>[</span><span>[</span><span data-darkreader-inline-color="">'key'</span><span>,</span> <span data-darkreader-inline-color="">'value'</span><span>]</span><span>]</span><span>)</span> <span>}</span><br><span data-darkreader-inline-color="">const</span> str <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">stringify</span><span>(</span>obj<span>,</span> replacer<span>)</span><br><span data-darkreader-inline-color="">const</span> newObj <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">JSON</span><span>.</span><span data-darkreader-inline-color="">parse</span><span>(</span>str<span>,</span> reviver<span>)</span><br><span data-darkreader-inline-color="">// { set: new Set([1, 2]), map: new Map([['key', 'value']]) }</span><br>
```

现在我们完全支持映射和集合的JSON序列化和反序列化。不错。

你应该在什么时候使用什么  
对于具有明确定义键集的结构化对象 —— 比如每个事件都应该有一个标题和一个日期 —— 通常你会想要一个对象。

```
<span data-darkreader-inline-color="">// 对于结构化对象，请使用Object</span><br><span data-darkreader-inline-color="">const</span> event <span data-darkreader-inline-color="">=</span> <span>{</span><br>  title<span>:</span> <span data-darkreader-inline-color="">'Builder.io Conf'</span><span>,</span><br>  date<span>:</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Date</span><span>(</span><span>)</span><br><span>}</span><br>
```

当你有任意数量的键，并且你可能需要频繁添加和删除键时，请考虑使用映射以获得更好的性能和人性化。

```
<span data-darkreader-inline-color="">// 对于动态哈希映射，请使用Map</span><br><span data-darkreader-inline-color="">const</span> eventsMap <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Map</span><span>(</span><span>)</span><br>eventsMap<span>.</span><span data-darkreader-inline-color="">set</span><span>(</span>event<span>.</span>id<span>,</span> event<span>)</span><br>eventsMap<span>.</span><span data-darkreader-inline-color="">delete</span><span>(</span>event<span>.</span>id<span>)</span><br>
```

当你创建一个数组时，其中元素的顺序很重要，并且你可能有意想要数组中的重复项时，一个普通的数组通常是一个很好的选择。

```
<span data-darkreader-inline-color="">// 对于有序列表，或者可能需要重复项的列表，请使用Array</span><br><span data-darkreader-inline-color="">const</span> myArray <span data-darkreader-inline-color="">=</span> <span>[</span><span data-darkreader-inline-color="">1</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>,</span> <span data-darkreader-inline-color="">3</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>,</span> <span data-darkreader-inline-color="">1</span><span>]</span><br>
```

但是，当你知道你永远不想要重复项，并且项目的顺序不重要时，请考虑使用集合。

```
<span data-darkreader-inline-color="">// 对于无序唯一列表，请使用Set</span><br><span data-darkreader-inline-color="">const</span> <span data-darkreader-inline-color="">set</span> <span data-darkreader-inline-color="">=</span> <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Set</span><span>(</span><span>[</span><span data-darkreader-inline-color="">1</span><span>,</span> <span data-darkreader-inline-color="">2</span><span>,</span> <span data-darkreader-inline-color="">3</span><span>]</span><span>)</span>
```