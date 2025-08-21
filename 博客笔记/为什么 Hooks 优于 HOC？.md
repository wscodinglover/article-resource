```
<pre data-style="margin-bottom: 1rem; outline: 0px; font-family: SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; font-size: 14.875px; letter-spacing: 0.544px; text-align: left; word-spacing: 0.8px; background-color: rgb(255, 255, 255); color: rgb(33, 37, 41); overflow: auto; visibility: visible;"><section><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="0" data-is_biz_ban="0" data-origin_num="50" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><p data-style="outline: 0px; color: rgb(0, 0, 0); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; visibility: visible;"><span>击上方&nbsp;</span><span><span>React</span></span><span>，关注公众号</span><span></span></p><p data-style="outline: 0px; color: rgb(34, 34, 34); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; word-spacing: 0.8px; visibility: visible;"><span>回复</span><span data-style="outline: 0px; color: rgb(0, 0, 0); caret-color: rgb(51, 51, 51); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 14px; letter-spacing: 0.544px; word-spacing: 2px; visibility: visible;"><span>加群</span></span><span>，加入技术交流群交流</span></p></pre>
```

在现代的 `React`世界中，每个人都在使用带有 `React Hooks`的函数组件。然而，高阶组件（`HOC`）的概念在现代的 `React`世界中仍然适用，因为它们可以用于类组件和函数组件。因此，它们是在历史和现代 React 组件之间使用可重用抽象的完美桥梁。  

高阶组件可以增强组件的可组合性质。然而，高阶组件存在问题，而且这些问题完全被 `React Hooks` 解决了。这就是为什么我想指出这些问题，以便开发人员可以做出明智的决定，无论是在某些场景下使用 `HOC`还是`Hooks`，还是他们最终是否想要全面采用 `React Hooks`。

## HOC 与 Hooks：属性混乱

让我们来看下面这个用于条件渲染的高阶组件（`HOC`）。如果出现错误，它会渲染一个错误消息。如果没有错误，它会渲染给定的组件：

```
<span>import</span> <span>*</span> <span>as</span> React <span>from</span> <span>'react'</span>;<br><br><span>const</span> <span>withError</span> <span>=</span> (Component) <span>=&gt;</span> (props) <span>=&gt;</span> {<br>  <span>if</span> (props.error) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Something went wrong ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> <span><span>&lt;</span><span>Component</span> <span>{</span><span>...</span><span>props</span><span>}</span> <span>/&gt;</span></span>;<br>};<br><br><span>export</span> <span>default</span> withError;<br>
```

请注意，如果没有错误，`HOC`会将所有属性传递给给定的组件。这种方式应该可以正常工作，然而，可能会有太多的属性传递给下一个组件，而下一个组件并不一定关心所有这些属性。

例如，下一个组件可能根本不关心错误，因此最好的做法是在将属性传递给下一个组件之前，使用剩余运算符从属性中删除错误：

```
<span>import</span> <span>*</span> <span>as</span> React <span>from</span> <span>'react'</span>;<br><br><span>const</span> <span>withError</span> <span>=</span> (Component) <span>=&gt;</span> ({ error, <span>...</span>rest }) <span>=&gt;</span> {<br>  <span>if</span> (error) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Something went wrong ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> <span><span>&lt;</span><span>Component</span> <span>{</span><span>...</span><span>rest</span><span>}</span> <span>/&gt;</span></span>;<br>};<br><br><span>export</span> <span>default</span> withError;<br>
```

这个版本也应该可以工作，至少如果给定的组件不需要错误属性的话。然而，这两个版本的`HOC`都显示了在使用`HOC`时出现属性混乱的问题。通常情况下，属性只是通过使用展开运算符传递给 `HOC`，而且仅在 `HOC` 本身中部分使用。通常情况下，从一开始就不清楚给定的组件是否需要 `HOC`提供的所有属性（第一个版本）或者是否只需要部分属性（第二个版本）。

这是使用`HOC` 的第一个警告；当使用多个组合在一起的 `HOC` 时，情况会很快变得不可预测，因为这样就不仅要考虑给定组件需要哪些属性，还要考虑组合中其他`HOC` 需要哪些属性。例如，假设我们有另一个用于渲染条件加载指示器的 `HOC`：

```
<span>import</span> <span>*</span> <span>as</span> React <span>from</span> <span>'react'</span>;<br><br><span>const</span> <span>withLoading</span> <span>=</span> (Component) <span>=&gt;</span> ({ isLoading, <span>...</span>rest }) <span>=&gt;</span> {<br>  <span>if</span> (isLoading) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Loading ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> <span><span>&lt;</span><span>Component</span> <span>{</span><span>...</span><span>rest</span><span>}</span> <span>/&gt;</span></span>;<br>};<br><br><span>export</span> <span>default</span> withLoading;<br>
```

现在，两个`HOC`，`withError`和 `withLoading`，都组合在一个组件上。一旦使用了这个组件，它可能会像下面这样：

```
<span>const</span> DataTableWithFeedback <span>=</span> <span>compose</span>(<br>  withError,<br>  withLoading,<br>)(DataTable);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>DataTableWithFeedback</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>      data<span>=</span><span>{</span>data<span>}</span><br>      error<span>=</span><span>{</span>error<span>}</span><br>      isLoading<span>=</span><span>{</span>isLoading<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

在不了解 `HOC`实现细节的情况下，你能知道哪些属性被 `HOC` 使用，哪些属性被用于底层组件吗？不清楚哪些属性实际传递给了实际的 `DataTable` 组件，哪些属性被`HOC` 在传递过程中使用。

让我们进一步看一个示例，引入另一个用于数据获取的`HOC`，我们不展示其实现细节：

```
<span>const</span> DataTableWithFeedback <span>=</span> <span>compose</span>(<br>  withFetch,<br>  withError,<br>  withLoading,<br>)(DataTable);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>const</span> url <span>=</span> <span>'https://api.mydomain/mydata'</span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>DataTableWithFeedback</span><br>      url<span>=</span><span>{</span>url<span>}</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

突然间，我们不再需要 `data`、`isLoading`和 `error`，因为所有这些信息都是在新的 `withFetch HOC` 中通过使用 `url` 生成的。有趣的是，虽然 `isLoading` 和 `error`是在 w`ithFetch HOC`中生成的，但它们会在传递过程中被 `withLoading`和 `withError` 消费。另一方面，从 `withFetch`生成的（这里是获取的）数据将作为属性传递给底层`DataTable` 组件。

```
App     withFetch   withError   withLoading   DataTable<br><br>        data-&gt;      data-&gt;      data-&gt;        data<br>url-&gt;   error-&gt;     error<br>        isLoading-&gt; isLoading-&gt; isLoading<br>
```

除了所有这些隐藏的魔法之外，还要看到顺序也很重要：`withFetch` 需要是外部`HOC`，而 `withLoading` 和 `withError` 则没有特定的顺序，这给错误留下了很多空间。

总之，所有这些从 `HOC` 进出的属性都以某种方式通过黑盒子传递，我们需要仔细观察才能真正理解在途中生成了哪些属性，哪些属性在途中被消费，哪些属性被传递。不查看 `HOC`，我们不知道在这些层之间发生了什么。

最后，让我们比较一下，看看 `React Hooks`如何用一个简单易懂的代码片段解决了这个问题：

```
<span>const</span> <span>App</span> <span>=</span><br><br> () <span>=&gt;</span> {<br>  <span>const</span> url <span>=</span> <span>'https://api.mydomain/mydata'</span>;<br>  <span>const</span> { data, isLoading, error } <span>=</span> <span>useFetch</span>(url);<br><br>  <span>if</span> (error) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Something went wrong ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>if</span> (isLoading) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Loading ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>DataTable</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>      data<span>=</span><span>{</span>data<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

使用 `React Hooks`时，一切都为我们展现出来：我们看到了所有传入我们“黑盒子”（这里是 `useFetch`）的属性（这里是 `url`），以及所有从中出来的属性（这里是 `data`、`isLoading`、`error`）。即使我们不知道 `useFetch` 的实现细节，我们清楚地看到了哪些输入进去，哪些输出出来。即使 `useFetch` 可以像`withFetch`和其他 `HOC`一样被视为黑盒子，但我们仅仅通过一行代码就看到了这个 `React Hook` 的整个 API 约束。

在以前，这在 `HOC` 中并不明显，因为我们不清楚哪些属性是需要的（输入），哪些属性是生成的（输出）。另外，在这之间没有其他的`HTML`层，因为我们只是在父组件（或子组件）中使用了条件渲染。  
在现代的 `React`世界中，每个人都在使用带有 `React Hooks` 的函数组件。然而，高阶组件（`HOC`）的概念在现代的 `React`世界中仍然适用，因为它们可以用于类组件和函数组件。因此，它们是在历史和现代 React 组件之间使用可重用抽象的完美桥梁。

## HOCS VS HOOKS: 命名冲突

如果给一个组件赋予相同名称的 prop 两次，后者将会覆盖前者：

```
<span><span>&lt;</span><span>Headline</span> text<span><span>=</span><span>"</span>Hello World<span>"</span></span> text<span><span>=</span><span>"</span>Hello React<span>"</span></span> <span>/&gt;</span></span><br>
```

在上一个示例中使用普通组件时，这个问题变得很明显，我们不太可能意外覆盖 `props`（除非我们需要）。然而，当使用 `HOCs`时，当两个 HOCs 传递具有相同名称的 `props`时，问题又变得混乱了。

这个问题的最简单例证是将两个相同的 `HOCs`组合到一个组件之上：

```
<span>const</span> UserWithData <span>=</span> <span>compose</span>(<br>  withFetch,<br>  withFetch,<br>  withError,<br>  withLoading,<br>)(User);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>UserWithData</span><br>      url<span>=</span><span>{</span><span>`</span><span>https://api.mydomain/user/</span><span>${</span>userId<span>}</span><span>`</span><span>}</span><br>      url<span>=</span><span>{</span><span>`</span><span>https://api.mydomain/user/</span><span>${</span>userId<span>}</span><span>/profile</span><span>`</span><span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

这是一个非常常见的情景；通常组件需要从多个 `API`端点获取数据。

正如我们之前学到的，`withFetch HOC`期望一个 `url prop` 用于数据获取。现在我们想要两次使用这个 `HOC`，因此我们不再能够满足两个 `HOCs`的约定。相反，两个 `HOCs` 将会作用于后一个 `URL`，这将导致问题。解决这个问题的一个解决方案（是的，有不止一种解决方案）是将我们的 `withFetch HOC`更改为更强大的东西，以执行不止一个而是多个请求：

```
<span>const</span> UserWithData <span>=</span> <span>compose</span>(<br>  withFetch,<br>  withError,<br>  withLoading,<br>)(User);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>UserWithData</span><br>      urls<span>=</span><span>{</span><span>[</span><br>        <span>`</span><span>https://api.mydomain/user/</span><span>${</span>userId<span>}</span><span>`</span><span>,</span><br>        <span>`</span><span>https://api.mydomain/user/</span><span>${</span>userId<span>}</span><span>/profile</span><span>`</span><span>,</span><br>      <span>]</span><span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

这个解决方案似乎是可行的，但让我们停下来思考一下：以前只关心一个数据获取的 `withFetch HOC`\-- 基于这一个数据获取设置`isLoading`和 `error`状态 -- 突然变成了一个复杂的怪物。这里有很多问题需要回答：

-   即使其中一个请求提前完成，加载指示器是否仍会显示？
    
-   如果只有一个请求失败，整个组件会作为错误渲染吗？
    
-   如果一个请求依赖于另一个请求会发生什么？  
    ……
    

尽管这使得 `HOC`变得非常复杂（但功能强大），我们在内部引入了另一个问题。我们不仅有传递重复的 `prop`（这里是`url`，我们用 `urls`解决了）给 `HOC` 的问题，而且`HOC`将输出重复的 `prop`（这里是 data）并将其传递给底层组件。

因此，在这种情况下，`User`组件必须接收一个合并的数据 `props`\-- 来自两个数据获取的信息 -- 或者接收一个数据数组 -- 其中第一个条目根据第一个`URL`设置，第二个条目根据第二个 `URL`设置。此外，当两个请求不同时完成时，一个数据条目可能为空，而另一个可能已经存在……

好了。我不想在这里进一步解决这个问题。这是有解决方案的，但正如我之前提到的，这将使得 `withFetch` `HOC` 比它应该的更复杂，以及如何在底层组件中使用合并的数据或数据数组的情况并不比开发人员的经验来得更好。

让我们再次看看 `React Hooks`如何通过一个 -- 从使用的角度来说易于理解 -- 代码片段为我们解决这个问题：

```
<span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>const</span> {<br>    data: userData,<br>    isLoading: userIsLoading,<br>    error: userError<br>  } <span>=</span> <span>useFetch</span>(<span>`</span><span>https://api.mydomain/user/</span>${userId}<span>`</span>);<br><br>  <span>const</span> {<br>    data: userProfileData,<br>    isLoading: userProfileIsLoading,<br>    error: userProfileError<br>  } <span>=</span> <span>useFetch</span>(<span>`</span><span>https://api.mydomain/user/</span>${userId}<span>/profile</span><span>`</span>);<br><br>  <span>if</span> (userError <span>||</span> userProfileError) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Something went wrong ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>if</span> (userIsLoading) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>User is loading ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>const</span> userProfile <span>=</span> userProfileIsLoading<br>    <span>?</span> <span><span>&lt;</span>div<span>&gt;</span></span>User profile is loading ...<span><span>&lt;/</span>div<span>&gt;</span></span><br>    : <span><span>&lt;</span><span>UserProfile</span> userProfile<span>=</span><span>{</span>userProfileData<span>}</span> <span>/&gt;</span></span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>User</span><br>      user<span>=</span><span>{</span>userData<span>}</span><span>&gt;</span></span><br>      userProfile={userProfile}<br>    /&gt;<br>  );<br>};<br>
```

你看到我们在这里获得了多大的灵活性吗？只有在用户仍在加载时才提前返回一个加载指示器，然而，如果用户已经存在，只有用户配置文件是挂起的，我们只会部分地渲染一个加载指示器，其中数据丢失了（这里也是由于组件组合的强大）。我们可以对错误做同样的处理，但是因为我们已经掌握了如何处理请求结果的所有权力，我们可以在这个组件中渲染相同的错误消息。如果以后我们决定以不同的方式处理这两个错误，我们可以在这一个组件中做到这一点，而不是在我们的抽象中（无论是 `HOC` 还是`Hook`）。

最终，这就是我们最初得出这个结论的原因，通过重命名从`React Hooks` 中输出的变量，我们避免了名称冲突。当使用 `HOCs`时，我们需要注意 `HOCs`可能在内部使用相同名称的`props`。当使用相同的`HOC`两次时，这往往是明显的，但如果您使用两个不同的`HOCs`\-- 只是偶然间 -- 使用相同的`prop`名称会发生什么呢？它们将互相覆盖彼此的数据，让您困惑为什么您接收的组件没有收到正确的`props`。

## HOCS VS HOOKS: 依赖关系

`HOC`（高阶组件）非常强大，也许太强大了？`HOC` 可以通过两种方式接收参数：一种是从父组件接收 `props`（正如我们之前所见），另一种是增强组件。让我们通过示例来详细说明后者。

以前我们的`withLoading`和 `withError HOCs`为例，但这次更强大：

```
<span>const</span> <span>withLoading</span> <span>=</span> ({ loadingText }) <span>=&gt;</span> (Component) <span>=&gt;</span> ({ isLoading, <span>...</span>rest }) <span>=&gt;</span> {<br>  <span>if</span> (isLoading) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>{loadingText <span>?</span> loadingText : <span>'Loading ...'</span>}<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> <span><span>&lt;</span><span>Component</span> <span>{</span><span>...</span><span>rest</span><span>}</span> <span>/&gt;</span></span>;<br>};<br><br><span>const</span> <span>withError</span> <span>=</span> ({ errorText }) <span>=&gt;</span> (Component) <span>=&gt;</span> ({ error, <span>...</span>rest }) <span>=&gt;</span> {<br>  <span>if</span> (error) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>{errorText <span>?</span> errorText : <span>'Something went wrong ...'</span>}<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> <span><span>&lt;</span><span>Component</span> <span>{</span><span>...</span><span>rest</span><span>}</span> <span>/&gt;</span></span>;<br>};<br>
```

通过这些额外的参数 -- 这里通过包围 `HOC` 的高阶函数传递 -- 我们获得了在创建增强组件时提供参数的额外能力：

```
<span>const</span> DataTableWithFeedback <span>=</span> <span>compose</span>(<br>  <span>withError</span>({ errorText: <span>'The data did not load'</span> }),<br>  <span>withLoading</span>({ loadingText: <span>'The data is loading ...'</span> }),<br>)(DataTable);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>DataTableWithFeedback</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>      data<span>=</span><span>{</span>data<span>}</span><br>      error<span>=</span><span>{</span>error<span>}</span><br>      isLoading<span>=</span><span>{</span>isLoading<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

这为之前的 `Prop Confusion` 问题增加了一个（1）正面和（2）负面影响，因为现在我们有了（2）更多的地方，`HOC`接收`props`（这并不使事情变得更容易理解），但另一方面（1）我们可以避免来自父组件的隐式 `prop`传递（在这里我们不知道这个 `prop` 是由 `HOC` 还是底层组件消费的），并尝试在增强组件时从一开始就传递 `props`。

然而，最终，这些参数（这里是具有 `errorText` 和 `loadingText`的对象）在增强组件时传递的是静态的。我们不能在此处与父组件的任何 `props` 进行插值，因为我们是在任何组件外部创建组合组件。例如，在数据获取示例中，我们将无法引入灵活的用户 `ID`：

```
<span>const</span> UserWithData <span>=</span> <span>compose</span>(<br>  <span>withFetch</span>(<span>'https://api.mydomain/user/1'</span>),<br>  <span>withFetch</span>(<span>'https://api.mydomain/user/1/profile'</span>),<br>)(User);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>UserWithData</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

尽管有办法克服这个问题，但这并不会使整个传递 props 的过程更容易理解：

```
<span>const</span> UserWithData <span>=</span> <span>compose</span>(<br>  <span>withFetch</span>(props <span>=&gt;</span> <span>`</span><span>https://api.mydomain/user/</span>${props.userId}<span>`</span>),<br>  <span>withFetch</span>(props <span>=&gt;</span> <span>`</span><span>https://api.mydomain/user/</span>${props.userId}<span>/profile</span><span>`</span>),<br>)(User);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>UserWithData</span><br>      userId<span>=</span><span>{</span>userId<span>}</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

通过增加另一个挑战使这种情况变得更加复杂：如果第二个请求依赖于第一个请求会发生什么？例如，第一个请求返回一个用户`ID`，第二个请求基于我们只能通过第一个请求获得的 `profileId` 返回一个用户的配置文件：

```
<span>const</span> UserProfileWithData <span>=</span> <span>compose</span>(<br>  <span>withFetch</span>(props <span>=&gt;</span> <span>`</span><span>https://api.mydomain/users/</span>${props.userId}<span>`</span>),<br>  <span>withFetch</span>(props <span>=&gt;</span> <span>`</span><span>https://api.mydomain/profile/</span>${props.profileId}<span>`</span>),<br>)(UserProfile);<br><br><span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>...</span><br><br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>UserProfileWithData</span><br>      columns<span>=</span><span>{</span>columns<span>}</span><br>      userId<span>=</span><span>{</span>userId<span>}</span><br>    <span>/&gt;</span></span><br>  );<br>};<br>
```

我们在这里引入了两个紧密耦合的`HOCs`。在另一个解决方案中，我们可能已经创建了一个强大的`HOC` 来解决这个问题。然而，这告诉我们，创建相互依赖的`HOCs` 是困难的。

相比之下，让我们再次看看这个混乱是如何由`React Hooks`解决的：

```
<span>const</span> <span>App</span> <span>=</span> () <span>=&gt;</span> {<br>  <span>const</span> userId <span>=</span> <span>'1'</span>;<br><br>  <span>const</span> {<br>    data: userData,<br>    isLoading: userIsLoading,<br>    error: userError<br>  } <span>=</span> <span>useFetch</span>(<span>`</span><span>https://api.mydomain/user/</span>${userId}<span>`</span>);<br><br>  <span>const</span> profileId <span>=</span> userData<span>?</span>.profileId;<br><br>  <span>const</span> {<br>    data: userProfileData,<br>    isLoading: userProfileIsLoading,<br>    error: userProfileError<br>  } <span>=</span> <span>useFetch</span>(<span>`</span><span>https://api.mydomain/user/</span>${profileId}<span>/profile</span><span>`</span>);<br><br>  <span>if</span> (userError <span>||</span> userProfileError) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Something went wrong ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>if</span> (userIsLoading <span>||</span> userProfileIsLoading) {<br>    <span>return</span> <span><span>&lt;</span>div<span>&gt;</span></span>Is loading ...<span><span>&lt;/</span>div<span>&gt;</span></span>;<br>  }<br><br>  <span>return</span> (<br>    <span><span>&lt;</span><span>User</span><br>      user<span>=</span><span>{</span>userData<span>}</span><span>&gt;</span></span><br>      userProfile={userProfileData}<br>    /&gt;<br>  );<br>};<br>
```

因为 `React Hooks` 可以直接在函数组件中使用，它们可以相互依赖，如果它们彼此依赖，传递数据也是直截了当的。再次，这里也没有真正的黑盒，因为我们清楚地看到需要传递给这些自定义`hooks` 的信息以及它们输出的信息。使用相互依赖的 `React Hooks` 时，依赖关系比使用`HOCs`更加显式。

HOCs可以从组件中遮蔽复杂性（例如，条件渲染、受保护的路由）。但正如最后的情景所示，它们并不总是最佳解决方案。因此，我的建议是改用 `React Hooks`。

```
<section><span>欢迎关注「</span><span>React</span><span>」</span></section><section data-style="margin-bottom: 0px; outline: 0px; background-color: rgb(255, 255, 255); font-size: 16px; text-align: left; white-space: normal; letter-spacing: 0.544px; color: rgb(102, 102, 102); font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-variant-ligatures: common-ligatures;"><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="2" data-is_biz_ban="0" has-insert-preloading="1" data-index="1" data-origin_num="50" data-isban="0" data-weui-theme="light" data-biz_account_status="0"></mp-common-profile></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); text-wrap: wrap; font-size: 16px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; text-align: left; font-weight: 700; orphans: 4; widows: 1; caret-color: rgb(51, 51, 51); font-variant-ligatures: common-ligatures; letter-spacing: 2px; text-size-adjust: inherit; line-height: 28.8px;"><span><span>号内回复</span></span></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; text-wrap: wrap; font-size: 16px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; text-align: left; font-weight: 700; orphans: 4; widows: 1; caret-color: rgb(51, 51, 51); font-variant-ligatures: common-ligatures; word-spacing: 0.8px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;">&nbsp;"<span>精选</span>" ，将为您推送 历史精选文章"<span>react"</span>&nbsp;，将为您推送 React.js 相关的学习资料&nbsp;"<span>学习指南</span>" ，将为您推送 React-Native学习指南&nbsp;"<span>vue</span>" ，将为您推送vue.js 相关文章&nbsp;"<span>小程序</span>" ，将为您推送小程序相关文章&nbsp;"<span>微信小商店</span>"，将为您推送小程序相关文章&nbsp;"<span>加群</span>" ，添加群主好友拉你进群</section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; text-wrap: wrap; font-size: 16px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; text-align: left; font-weight: 700; orphans: 4; widows: 1; caret-color: rgb(51, 51, 51); font-variant-ligatures: common-ligatures; word-spacing: 0.8px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;">加我私人微信，拉你进 React进阶、面试交流群，互相监督学习进步等！</section><p data-style="margin-bottom: 0em; outline: 0px; color: rgb(0, 0, 0); letter-spacing: 0.544px; text-wrap: wrap; font-size: 16px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-weight: 700; orphans: 4; widows: 1; caret-color: rgb(51, 51, 51); font-variant-ligatures: common-ligatures; word-spacing: 0.8px;"><img data-galleryid="" data-imgfileid="308971948" data-ratio="1.261480787253983" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/e93fo6YQKNlJReqfJKqeft8SuT9o4DliaoUIJqmbtBw72F7nYumlpJ5dxIvLfbNv5W0Nf1ZtIltr9bFsL4qd6fg/640?wx_fmt=other&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1&amp;tp=webp" data-type="jpeg" data-w="1067" data-original-style="outline: 0px;border-style: none;border-radius: 3px;display: initial;background-size: 16px !important;visibility: visible !important;width: 343.915px !important;" data-index="1" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="343.915px" crossorigin="anonymous" alt="Image"><span data-style="outline: 0px; color: rgb(51, 51, 51); font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; word-spacing: 0.8px;"></span></p><section data-brushtype="text" mp-original-font-size="16" mp-original-line-height="25.600000381469727" data-style="margin-bottom: 0em; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(34, 34, 34); letter-spacing: 0.544px; text-wrap: wrap; font-size: 16px; font-weight: 700; orphans: 4; widows: 1; caret-color: rgb(51, 51, 51); font-variant-ligatures: common-ligatures; word-spacing: 0.8px; text-size-adjust: inherit; border-width: 0px; border-style: none; border-color: initial; text-align: right; line-height: 25.6px;" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuhpplm16ibb8iaib7RoGQ5iaHEdy66AHd7QqL7A2s5icSBE0aw4iaKOKPnXGYxQPhG7VMpbbYV6VJprSh7w/640?wx_fmt=png" data-fail="0"><span>“在看和转发”</span><span>就是最大的支持</span></section><section data-tool="mdnice编辑器" data-website="https://www.mdnice.com" data-style="padding-right: 10px; padding-left: 10px; color: rgb(0, 0, 0); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; letter-spacing: 0px; text-align: left; white-space: normal; font-size: 16px; line-height: 1.6; word-break: break-word;" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)"><span></span></section>
```