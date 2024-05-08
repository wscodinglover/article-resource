![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHkeys7LZdzYcwaLqGcnkongaibLMx2KmE4JtzrBcI2XKCRPVknyiaT2gXzlzqiaMzlcpCqVTRR0EGeA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

接下来，我们将会以大量的实践案例来展开 React 19 新 hook 的运用。

本文模拟的实践案例为**点击按钮更新数据**。这在开发中是一个非常常见的场景。

案例完成之后的最终演示效果图如下

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/Kn1wMOibzLcHkeys7LZdzYcwaLqGcnkonq0jcibREpBN7AdeyYFWskldKybcClNB06zaOMaDibx4ksOn1xTgSw7gA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们直接用 React 19 新的开发方式来完成这个需求。

## 1

**基础实现**

首先创建一个方法用于请求数据。

```
<span data-darkreader-inline-color="">const</span>&nbsp;getApi&nbsp;=&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;fetch(<span data-darkreader-inline-color="">'https://api.chucknorris.io/jokes/random'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res.json()<br>}<br>
```

这里一个非常关键的地方就在于，当我们要更新的数据时，我们不再需要设计一个 `loading` 状态去记录数据是否正在发生请求行为，因为 `Suspense` 帮助我们解决了 Loading 组件的显示问题。

与此同时，`use()` 又帮助我们解决了数据获取的问题。那么问题就来了，这个就是，好像我们也不需要设计一个状态去存储数据。那么应该怎么办呢？

这里有一个**非常巧妙**的方式，就是把**创建的 promise 作为状态值**来触发组件的重新执行。每次点击，我们都需要创建新的 promise

代码如下

```
<span data-darkreader-inline-color="">//&nbsp;记住这个初始值</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[api,&nbsp;setApi]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">null</span>)<br>
```

这个时候，当我们点击事件执行时，则只需要执行如下代码去触发组件的更新。

```
<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">__clickToGetMessage</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;每次点击，都会创建新的&nbsp;promise</span><br>&nbsp;&nbsp;setApi(getApi())<br>}<br>
```

`getApi()` 执行，新的请求会发生。他的执行结果，又返回了一个新的 promise.

因此，点击之后会创建的新 promise 值，api 此时就会作为状态更改触发组件的更新。

完整代码如下

```
<span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Index</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[api,&nbsp;setApi]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">null</span>)<br><br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">__clickToGetMessage</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;setApi(getApi())<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">'tips'</span>&gt;</span>点击按钮获取一条新的数据<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{__clickToGetMessage}</span>&gt;</span>获取数据<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">"content"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Suspense</span>&nbsp;<span data-darkreader-inline-color="">fallback</span>=<span data-darkreader-inline-color="">{</span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>loading...<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span>}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Item</span>&nbsp;<span data-darkreader-inline-color="">api</span>=<span data-darkreader-inline-color="">{api}</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Suspense</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>nothing<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'a_value'</span>&gt;</span>{joke.value}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

案例写完之后。我们基本上就能够实现最开始截图中的交互效果了。但是现别急，还没有完。我们还需要进一步分析一下这个案例。

## 2

**案例分析**

这里我们需要注意观察两个事情。

一个是观察当前组件更新，更上层的父组件是否发生了变化。我们可以在 `App` 组件中执行一次打印。

此时可以发现，当我们重新请求时，当前组件更新，但是上层组件并不会重新执行。

我们可以出得结论：**更简洁的状态设计，有利于命中 React 默认的性能优化规则**。

> 具体的规则请在 React 知命境合集中查看。

更简洁的状态设计，也是 React 19 所倡导的开发思路。

另外一个事情，是我们要特别特别注意观察子组件 `Item` 的实现。

首先因为我们初始化时，给 `api` 赋予的默认值是 `null`。

```
<span data-darkreader-inline-color="">//&nbsp;记住这个初始值</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[api,&nbsp;setApi]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">null</span>)<br>
```

之后，我们就将 api 传给了子组件 `Item`

```
&lt;Item&nbsp;api={api}&nbsp;/&gt;<br>
```

然后在 Item 组件的内部实现中，因为我们直接把 api 传给了 `use`，那么此时直接执行肯定会报错

```
<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>
```

要注意的是，我们刚才说，使用 `Suspense` 会捕获子组件的异常，但是不是捕获所有异常，它只能识别 promise 的异常。因此，这里的报错会直接影响到整个页面。

所以，为了处理好初始化时传入 `api` 值为 null，我在内部实现代码逻辑中，使用了 `if` 判断该条件，然后执行了一次 `return`。我试图让 `use(null)` 得不到执行的时机。

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时，api&nbsp;==&nbsp;null'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;&lt;div&gt;nothing&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;const&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;className='a_value'&gt;{joke.value}&lt;/</span>div&gt;<br>&nbsp;&nbsp;)<br>}<br>
```

那么，我的意图是否能成功呢？

我们在 return 后面插入一个 `console.log` 来观察代码的执行情况，代码如下

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时，api&nbsp;==&nbsp;null'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>nothing<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时这里是否执行'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'a_value'</span>&gt;</span>{joke.value}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

演示效果如下图所示

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们发现，当我反复刷新页面，让初始化流程执行时，`return` 后面的代码并不会执行。

再然后，我们新增一点内容，比如在 `return` 后面使用一个 `useEffect`

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时，api&nbsp;==&nbsp;null'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>nothing<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'xxx'</span>)<br>&nbsp;&nbsp;},&nbsp;[])<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时这里是否执行'</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'a_value'</span>&gt;</span>{joke.value}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

然后演示再看看。我们发现 `effect` 也不会执行。然后我们还可以搞点好玩的。

`Item` 代码改造如下

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[count,&nbsp;setCount]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">0</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时，api&nbsp;==&nbsp;null'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;setCount(count&nbsp;+&nbsp;1)}&gt;nothing,&nbsp;{count}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时这里是否执行'</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'a_value'</span>&gt;</span>{joke.value}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

注意看，我们在 if 条件判断中，单独创建了一个 `useState`，并在对应的元素上添加了一个让 `count` 递增的交互。

这段在之前版本的开发中一定会触发语法错误提示的代码。

> 最终也是能勉强运行，但是代码会疯狂报错

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

代码演示结果如下

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后，我继续一个骚操作，我在 if 中条件判断中，使用 `useEffect`，代码如下

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'useEffect&nbsp;在&nbsp;if&nbsp;中执行'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[])<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;&lt;div&gt;nothing&lt;<span data-darkreader-inline-color="">/div&gt;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;console.log('初始化时这里是否执行')<br><br>&nbsp;&nbsp;const&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;return&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&nbsp;className='a_value'&gt;{joke.value}&lt;/</span>div&gt;<br>&nbsp;&nbsp;)<br>}<br>
```

也能正常执行。观察一下演示效果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**结论：**

很明显，`react 19` 的 hook 在底层发生了一些优化更新，我们可以不用非得把所有的 hook 都放在函数组件的最前面去执行了。

**在 React 19 中，我们可以把 hook 放到 return 之后，也可以放到条件判断中去执行。**

但是，我们一定要注意的是，并非表示我们可以随便乱写。当条件互斥时，状态之间如果存在不合理的耦合关系，依然不能正常执行。我们列举两个案例来观察这个事情。

第一个案例，我们依然在 if 中执行一个 useEffect，但是不同的是，我把在 if 之外的状态 `counter` 作为依赖项传入。

代码如下。

```
<span data-darkreader-inline-color="">const</span>&nbsp;Item&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">0</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!props.api)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'useEffect&nbsp;在&nbsp;if&nbsp;中执行'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;[counter])<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>nothing<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'初始化时这里是否执行'</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;joke&nbsp;=&nbsp;use(props.api)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'a_value'</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;setCounter(counter&nbsp;+&nbsp;1)}&gt;{joke.value}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br>
```

此时一个很明显的问题就是，if 内部在 UI 逻辑上本和外部是互斥的关系，但是我们在状态逻辑上却相互关联。因此这个之后，代码执行就会报错，明确的告诉你这种写法不合理。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第二个案例。我在条件判断中，定义了一个状态 `bar`，但是我并没有在 if 中 `return`，而是继续往后执行。代码如下：

```
<span data-darkreader-inline-color="">const</span>&nbsp;[counter,&nbsp;setCounter]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">0</span>)<br><span data-darkreader-inline-color="">if</span>&nbsp;(counter&nbsp;==&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[bar,&nbsp;setBar]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">'bar'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'bar'</span>,&nbsp;bar)<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;[foo,&nbsp;setFoo]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">'foo'</span>)<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'foo'</span>,&nbsp;foo)<br><span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&lt;button&nbsp;onClick={<span><span>()</span>&nbsp;=&gt;</span>&nbsp;setCounter(counter&nbsp;+&nbsp;<span data-darkreader-inline-color="">1</span>)}&gt;counter&nbsp;++&nbsp;foo:&nbsp;{foo}&lt;<span data-darkreader-inline-color="">/button&gt;<br>)<br></span>
```

这个现象的解释就是**我们之前在面试时经常会聊的一个话题**：为什么不能将 hook 放在条件判断中去执行。

由于在 fiber 中，是通过有序链表的方式来存储 hook 的值。因此，当随着 `counter` 递增，条件判断中的 hook 不再执行，但是它的值已经被缓存上了，后续的执行中，`foo` 就变成了第 1 个 hook，从而导致 `foo` 获取到了 `bar` 的值。

好在 react 19 对这种情况做出了明确的判断，当你这样写时，代码会明确报错终止程序的运行。所以在开发过程中我们也不用特别去区分什么情况下不能用。

## 3

**需求变动**

现在我们做一点小小的需求变动。

在之前的案例实现中，组件代码初始化时，并没有初始化请求一条数据。因此，默认渲染结果是 `nothing`

此时，我们如果希望组件首次渲染时，就一定要请求一次接口，我们的代码应该怎么改呢？

在以前版本的实现中，接口数据的触发方式不同，因此我们需要分别处理这两种触发时机。

初始化时的数据请求，我们利用 `useEffect` 来实现。

```
<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">PreIndex</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[data,&nbsp;setData]&nbsp;=&nbsp;useState({<span data-darkreader-inline-color="">value</span>:&nbsp;<span data-darkreader-inline-color="">''</span>})<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[loading,&nbsp;setLoading]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">true</span>)<br><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;api().then(<span><span>res</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setData(res)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span data-darkreader-inline-color="">false</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;},&nbsp;[])<br>}<br>
```

按钮点击事件触发时，我们通过回调函数来实现

```
<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">PreIndex</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[data,&nbsp;setData]&nbsp;=&nbsp;useState({value:&nbsp;<span data-darkreader-inline-color="">''</span>})<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[loading,&nbsp;setLoading]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">true</span>)<br><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;api().then(<span><span>res</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setData(res)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span data-darkreader-inline-color="">false</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;},&nbsp;[])<br><br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">_clickHandler</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span data-darkreader-inline-color="">true</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;api().then(<span><span>res</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setData(res)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setLoading(<span data-darkreader-inline-color="">false</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;...<br>}<br>
```

然而，在新的开发方式中，我们只需要在上面的案例做一个非常小的变动，那就是把 `api` 的参数使用 `getApi()` 去初始化，而不是 `null`，就可以做到了。

```
<span data-darkreader-inline-color="">//&nbsp;只需要改这一点代码</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[api,&nbsp;setApi]&nbsp;=&nbsp;useState(getApi())<br>
```

改完之后，演示效果如下

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**非常的方便省事。**

当然这样写会造成冗余的接口请求执行。因此我们可以稍作调整就可以了。

> 这里需要根据需求调整，案例只做演示。

```
<span data-darkreader-inline-color="">const</span>&nbsp;_initApi&nbsp;=&nbsp;getApi()<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Index</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[api,&nbsp;setApi]&nbsp;=&nbsp;useState(_initApi)<br>&nbsp;&nbsp;...<br>}<br>
```

OK，今天的案例就介绍到这里，后续的章节我们还会继续更多的实战案例的分析。

## end

**合集介绍**

**「React19 全解」**是 **「React 知命境」**的续集。由于公众号文章比较零散，许多读者不知道整个合集在哪里看，因此我创作了一个小程序，用于收录我创作的所有公众号文章，我将同一个合集的文章归类放入到一个目录中。以便大家分类查看。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大家可以收藏我的小程序「前端码易」就能随时看到合集文章。

扫码或搜索添加我的微信 `icanmeetu`，可以加入 react19 讨论群，大家一起探讨与分享 React19 的使用心得，并且后续的更新公告、直播公告、**直播录屏**都会在群里放出。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)