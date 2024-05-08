在 JavaScript 的函数式编程中，`compose`和`pipe`是最强大的概念之一，在我们日常的编程中也非常有用。

**compose**

假设我们要获取一个人的名字，我们需要编写一个获取姓名的函数：

```
<span data-darkreader-inline-color="">const</span>&nbsp;person&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"jack"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">25</span>&nbsp;};<br><span data-darkreader-inline-color="">const</span>&nbsp;getName&nbsp;=&nbsp;<span>(<span data-darkreader-inline-color="">person</span>)&nbsp;=&gt;</span>&nbsp;person.name;<br>getName(person);<br><span data-darkreader-inline-color="">//&nbsp;'jack'</span><br>
```

如果我们想要大写的名字,我们再写一个函数:

```
<span data-darkreader-inline-color="">const</span>&nbsp;upperCase&nbsp;=&nbsp;<span>(<span data-darkreader-inline-color="">string</span>)&nbsp;=&gt;</span>&nbsp;string.toUpperCase();<br>upperCase(<span data-darkreader-inline-color="">"jack"</span>);<br><span data-darkreader-inline-color="">//&nbsp;'JACK'</span><br>
```

如果我们想对`person`执行这两个操作,则需要嵌套函数:

```
upperCase(getName(person));<br>
```

现在我们可以组合这两个函数，使其成为一个执行两个操作的函数：获取对象名字，大写处理。

我们可以这样使用 `compose`:

```
<span data-darkreader-inline-color="">const</span>&nbsp;getNameInUpperCase&nbsp;=&nbsp;compose(upperCase,&nbsp;getName);<br>getNameInUpperCase(person);<br><span data-darkreader-inline-color="">//&nbsp;'JACK'</span><br>
```

它是从右到左执行的。

但是这个 `compose` 的实现问题是它只接受两个函数作为参数。

假设我们需要多个函数，这时就需要使用 `pipe`。

**pipe**

`pipe`与`compose`完全一样，但它是从左到右执行，并且可以接受多个函数作为参数。

我们已经有了获取名字和大写字符串的两个函数。现在，假设我们有一个获取字符串前 4 个字符的函数：

```
<span data-darkreader-inline-color="">const</span>&nbsp;getSubString&nbsp;=&nbsp;<span>(<span data-darkreader-inline-color="">string</span>)&nbsp;=&gt;</span>&nbsp;string.substring(<span data-darkreader-inline-color="">0</span>,&nbsp;<span data-darkreader-inline-color="">4</span>);<br>getSubString(<span data-darkreader-inline-color="">"jack&nbsp;ma"</span>);<br><span data-darkreader-inline-color="">//&nbsp;'jack'</span><br>
```

然后，假设我们有一个反转字符串的函数：

```
reverseString&nbsp;=&nbsp;<span>(<span data-darkreader-inline-color="">string</span>)&nbsp;=&gt;</span>&nbsp;string.split(<span data-darkreader-inline-color="">""</span>).reverse().join(<span data-darkreader-inline-color="">""</span>);<br>reverseString(<span data-darkreader-inline-color="">"jack&nbsp;ma"</span>);<br><span data-darkreader-inline-color="">//&nbsp;'am&nbsp;kcaj'</span><br>
```

现在,如果我们想通过嵌套在单个对象上应用所有这些:

```
reverseString(getSubString(getNameInUpperCase(getName({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"jack&nbsp;ma"</span>&nbsp;}))));<br><span data-darkreader-inline-color="">//&nbsp;'KCAJ'</span><br>
```

但是这样太过冗长，如果函数再增多，复杂度也灾难性增长。

这个时候，`pipe`就发挥大作用了：

```
pipe(<br>&nbsp;&nbsp;getName,<br>&nbsp;&nbsp;getNameInUpperCase,<br>&nbsp;&nbsp;getSubString,<br>&nbsp;&nbsp;reverseString<br>)({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"jack&nbsp;ma"</span>&nbsp;});<br><span data-darkreader-inline-color="">//&nbsp;'KCAJ'</span><br>
```

它可以完美地从左到右工作，并将上一个函数的结果用于下一个函数的参数。按顺序遍历每个函数执行，十分清晰！

**在 JavaScript 中的用法**

`pipe`和`compose`都不是 JavaScript 的原生函数，可以使用一些工具库如 lodash、ramda 等来引入它们。

但我们也可以自己实现一个简单的版本，在不导入任何库的情况下在 JavaScript 中使用这两个函数。

我们可以这样实现 pipe：

```
<span data-darkreader-inline-color="">const</span>&nbsp;pipe&nbsp;=<br>&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">...fns</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">accValue</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;fns.reduce(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">currentValue,&nbsp;currentFunction</span>)&nbsp;=&gt;</span>&nbsp;currentFunction(currentValue),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accValue<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>
```

在这种实现中，我们的`pipe`函数接受 `fns` 函数列表，使用`reduce`来遍历执行每个函数，返回结果，并且把这个结果用于传给下一个函数。

实现 compose:

```
<span data-darkreader-inline-color="">const</span>&nbsp;compose&nbsp;=<br>&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">...fns</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">x</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;fns.reduceRight(<span>(<span data-darkreader-inline-color="">v,&nbsp;f</span>)&nbsp;=&gt;</span>&nbsp;f(v),&nbsp;x);<br>
```

**在React 中的应用**

我们知道，React 的组件其实本质上也是一个函数，那么我们在遇到 Provider 嵌套很多的情况下，也一样可以用本文的思路来解决：

假设我们需要管理一些全局的小状态，Provider 变的越来越多了，有时候会遇到嵌套地狱的情况：

```
<span data-darkreader-inline-color="">const</span>&nbsp;StateProviders&nbsp;=&nbsp;<span>(<span data-darkreader-inline-color="">{&nbsp;children&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;(<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>LogProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>UserProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>MenuProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>AppProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{children}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>AppProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>MenuProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>UserProvider</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>LogProvider</span>&gt;</span></span><br>)<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span data-darkreader-inline-color=""></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>StateProviders</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>Main</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>StateProviders</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

此时我们自己写一个 `composeProvider` 方法：

```
<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">composeProviders</span>(<span data-darkreader-inline-color="">...providers</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>(<span data-darkreader-inline-color="">{&nbsp;children&nbsp;}</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;providers.reduce(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(<span data-darkreader-inline-color="">prev,&nbsp;Provider</span>)&nbsp;=&gt;</span>&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>Provider</span>&gt;</span>{prev}<span data-darkreader-inline-color="">&lt;/<span>Provider</span>&gt;</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;children,<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br>
```

代码就可以简化成这样：

```
<span data-darkreader-inline-color="">const</span>&nbsp;StateProviders&nbsp;=&nbsp;composeProviders(<br>&nbsp;&nbsp;LogProvider,<br>&nbsp;&nbsp;UserProvider,<br>&nbsp;&nbsp;MenuProvider,<br>&nbsp;&nbsp;AppProvider,<br>)<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span data-darkreader-inline-color=""></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">&lt;<span>StateProvider</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>Main</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>StateProvider</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

**JS Pipeline 语法提案**

其实 tc39 已经出了一个官方提案叫做 `Pipe Operator (|>) for JavaScript`，目前在 stage-2 阶段，它可以使得 JS 原生实现 pipe 函数的功能。

对于文中的例子，就可以用这样的语法改写：

```
<span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"张三"</span>&nbsp;};<br><br>obj<br>|&gt;&nbsp;getName(%)<br>|&gt;&nbsp;getNameInUpperCase(%)<br>|&gt;&nbsp;getSubString(%)<br>|&gt;&nbsp;reverseString(%);<br>
```

语法不一定正确，提案也可能有变动，但是大致上就是这个意思，还是挺方便的。

**总结**

希望这篇文章可以对你有一些启发，帮助你理解`compose`和`pipe`的工作原理。

你可以写个函数，像工厂传送带一样接收数据，数据经过不同的函数流动处理，最终得到一个流水线加工过后的结果。

参考：

-   https://dev.to/hardiksharma/compose-and-pipe-in-javascript-l0e
    
-   https://juejin.cn/post/6889247428797530126
    

-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2023 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！