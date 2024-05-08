给前端以福利，给编程以复利。大家好，我是大家的林语冰。

React 团队爆料最新主版本升级 React 19 Beta（公测版）已经正式上线 npm，想要提前体验最新版本的 React 发烧友可以参考这份 React 官方博客的升级指南。

React 19 中新增的改进需要某些破坏性更改，但预计这些变更不会影响大多数应用程序。

在这篇 React 官方博客中，我们将科普将库升级到 React 19 beta（公测版）相关的破坏性更改。

![Image](https://mmbiz.qpic.cn/mmbiz_png/3LcRhAf5AsbgiaebWyyIiasHd1RLBHicZBib9O56cLo5dOmvrfiaswibXfsfURce51v108NLiajjq9bg20sbd3n6td2pQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## React 18.3 正式发布

为了辅助你更轻松地升级到 React 19，我们发布了与 React 18.2 等价的 `react@18.3` 版本，但添加了废弃 API 的相关警告，以及 React 19 所需的其他变更。

粉丝请注意，React 19 公测版是 React 19 主版本的前戏。React 发烧友请先升级到 React 18.3，然后耐心等待 React 19 稳定版，切勿操之过急，否则后果自负。

如果你想辅助我们测试 React 19，请按照这份升级指南中的步骤操作，并报告你遭遇的任何问题。

## 安装

我们现在需要新型 JSX 转换。

我们在 2020 年引入了新型 JSX 转换，改进打包体积，且在不导入 React 的情况下使用 JSX。

在 React 19 中，我们新增了其他改进，比如使用 `ref` 作为 `prop`，以及需要新型转换的 JSX 速度优化。

我们预计大多数应用程序不会受到影响，因为转换已在大多数环境中启用。

要安装最新版本的 React 和 React DOM：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;install&nbsp;react@beta&nbsp;react-dom@beta<br></code>
```

如果你使用 TS，你还需要更新类型。一旦 React 19 稳定发布，你就可以照常安装 `@types/react` 和 `@types/react-dom` 中的类型。

在公测期间，这些类型在不同的包中可用，这需要在你的 `package.json` 中强制升级：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/react"</span>:&nbsp;<span data-darkreader-inline-color="">"npm:types-react@beta"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/react-dom"</span>:&nbsp;<span data-darkreader-inline-color="">"npm:types-react-dom@beta"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"overrides"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/react"</span>:&nbsp;<span data-darkreader-inline-color="">"npm:types-react@beta"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/react-dom"</span>:&nbsp;<span data-darkreader-inline-color="">"npm:types-react-dom@beta"</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

## 破坏性更改

### 渲染中的错误不会重新抛出

在 React 早期版本中，渲染时抛出的错误会被捕获，且重新抛出。在开发环境中，我们还会打印到 `console.error`，导致重复的错误日志。

在 React 19 中，我们改进了错误处理方式，禁止重新抛出从而减少重复：

-   未捕获的错误：Error Boundary 未捕获的错误将报告给 `window.reportError`。
    
-   捕获的错误：Error Boundary 捕获的错误将报告给 `console.error`。
    

此更改不会影响大多数应用程序，但如果你的生产错误报告依赖重新抛出的错误，你可能需要更新错误处理。为了支持这一点，我们向 `createRoot` 和 `hydrateRoot` 添加了新方法，来进行自定义错误处理：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;createRoot(container,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">onUncaughtError</span>:&nbsp;<span>(<span>error,&nbsp;errorInfo</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...&nbsp;打印错误报告</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">onCaughtError</span>:&nbsp;<span>(<span>error,&nbsp;errorInfo</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...&nbsp;打印错误报告</span><br>&nbsp;&nbsp;}<br>})<br></code>
```

### 已删除弃用的 React API

#### 已删除：函数的 `propTypes` 和 `defaultProps`

`PropTypes` 于 2017 年 4 月（React 15.5）已弃用。

在 React 19 中，我们从 React 包中删除了 `propType` 检查，并且使用它们将被静默忽略。如果你在使用 `propTypes`，我们建议迁移到 TS 或其他类型检查方案。

我们还从函数组件中删除了 `defaultProps`，使用 ES6 的默认参数代替。由于没有 ES6 替代方案，类式组件将继续支持 `defaultProps`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">// 切换前：<br>import PropTypes from 'prop-types'<br><br>function Heading({ text }) {<br>  return &lt;h1&gt;{text}&lt;/h1&gt;<br>}<br>Heading.propTypes = {<br>  text: PropTypes.string<br>}<br>Heading.defaultProps = {<br>  text: 'Hello, world!'<br>}<br><br>// 切换后：<br>interface Props {<br>  text?: string<br>}<br>function Heading({ text = 'Hello, world!' }: Props) {<br>  return &lt;h1&gt;{text}&lt;/h1&gt;<br>}<br></code>
```

#### 已删除：使用 `contextTypes` 和 `getChildContext` 的过时 Context

过时的 Context 于 2018 年 10 月（React 16.6）已弃用。

过时的 Context 能且仅能在使用 `contextTypes` 和 `getChildContext` API 的类式组件中可用，且由于存在感低下的细微 bug 而被 `contextType` 替换。

在 React 19 中，我们删除了过时的 Context，使 React 更加短小精悍。

如果你仍在类式组件中使用过时 Context，则需要迁移到新的 `contextType` API：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;PropTypes&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'prop-types'</span><br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Parent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;childContextTypes&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">foo</span>:&nbsp;PropTypes.string.isRequired<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;getChildContext()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">foo</span>:&nbsp;<span data-darkreader-inline-color="">'bar'</span>&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;}<br>}<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Child</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;contextTypes&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">foo</span>:&nbsp;PropTypes.string.isRequired<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>{this.context.foo}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span data-darkreader-inline-color="">const</span>&nbsp;FooContext&nbsp;=&nbsp;React.createContext()<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Parent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">FooContext</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">"bar"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">FooContext</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;}<br>}<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Child</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;contextType&nbsp;=&nbsp;FooContext<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>{this.context}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;}<br>}<br></code>
```

#### 已删除：字符串 `ref`

字符串 `ref` 于 2018 年 3 月（React 16.3.0）已弃用。

类式组件支持字符串 `ref`，之后由于若干缺陷被 `ref` 回调函数取代。在 React 19 中，我们删除了字符串 `ref`，使 React 更简单粗暴。

如果你仍在类式组件中使用字符串 `ref`，则需要迁移到 `ref` 回调函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyComponent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;componentDidMount()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.refs.input.focus()<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">ref</span>=<span data-darkreader-inline-color="">"input"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyComponent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;componentDidMount()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.input.focus()<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">ref</span>=<span data-darkreader-inline-color="">{input</span>&nbsp;=&gt;</span>&nbsp;(this.input&nbsp;=&nbsp;input)}&nbsp;/&gt;</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

粉丝请注意，为了辅助迁移，React 团队将发布一个 react-codemod，自动用 `ref` 回调函数替换字符串 `ref`。

#### 已删除：模块模式工厂

模块模式工厂于 2019 年 8 月（React 16.9）已弃用。

这种模式很少使用，且支持它会导致 React 更大更慢。在 React 19 中，我们将删除对模块模式工厂的支持，你需要迁移到常规函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">FactoryComponent</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">FactoryComponent</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;/&gt;</span><br>}<br></code>
```

#### 已删除：`React.createFactory`

`createFactory` 于 2020 年 2 月（React 16.13）已弃用。

在 JSX 得到广泛支持之前，使用 `createFactory` 司空见惯，但如今寥寥无几，且以用 JSX 代替。

在 React 19 中，我们将删除 `createFactory`，你需要迁移到 JSX：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createFactory&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;button&nbsp;=&nbsp;createFactory(<span data-darkreader-inline-color="">'button'</span>)<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span data-darkreader-inline-color="">const</span>&nbsp;button&nbsp;=&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;/&gt;</span><br></code>
```

#### 已删除：`react-test-renderer/shallow`

在 React 18 中，我们更新了 `react-test-renderer/shallow`，来重新导出 `react-shallow-renderer`。

在 React 19 中，我们删除了 `react-test-render/shallow` 来直接安装包：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;install&nbsp;react-shallow-renderer&nbsp;--save-dev<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">-&nbsp;import&nbsp;ShallowRenderer&nbsp;from&nbsp;'react-test-renderer/shallow';</span><br><span data-darkreader-inline-color="">+&nbsp;import&nbsp;ShallowRenderer&nbsp;from&nbsp;'react-shallow-renderer';</span><br></code>
```

请重新考虑浅层渲染。

浅层渲染取决于 React 内部结构，且可能会阻止你未来的升级。我们建议将你的测试迁移到 `@testing-library/react` 或 `@testing-library/react-native`。

### 删除了已弃用的 React DOM API

#### 已删除：`react-dom/test-utils`

我们已将 `act` 从 `react-dom/test-utils` 移至 `react` 包，你可以从 `react` 导入 `act`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">-&nbsp;import&nbsp;{act}&nbsp;from&nbsp;'react-dom/test-utils'</span><br><span data-darkreader-inline-color="">+&nbsp;import&nbsp;{act}&nbsp;from&nbsp;'react';</span><br></code>
```

所有其他 `test-utils` 功能已删除。这些实用程序并不常见，且很容易依赖组件和 React 的低级实现细节。

在 React 19 中，这些函数在调用时会出错，且它们的导出将在未来版本中删除。

#### 已删除：`ReactDOM.render`

`ReactDOM.render` 已于 2022 年 3 月（React 18）弃用。

在 React 19 中，我们将删除 `ReactDOM.render`，你需要迁移到使用 `ReactDOM.createRoot`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;render&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span><br>render(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>,&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>))<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createRoot&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom/client'</span><br><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;createRoot(<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>))<br>root.render(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>)<br></code>
```

#### 已删除：`ReactDOM.hydrate`

`ReactDOM.hydrate` 已于 2022 年 3 月弃用（React 18）。

在 React 19 中，我们删除了 `ReactDOM.hydrate`，你需要迁移到使用 `ReactDOM.hydrateRoot`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;hydrate&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span><br>hydrate(<span>&lt;<span data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span>,&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>))<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;hydrateRoot&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom/client'</span><br>hydrateRoot(<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>),&nbsp;&lt;App&nbsp;/&gt;)<br></code>
```

#### 已删除：`unmountComponentAtNode`

`ReactDOM.unmountComponentAtNode` 已于 2022 年 3 月弃用（React 18）。

在 React 19 中，你需要迁移到使用 `root.unmount()`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br>unmountComponentAtNode(<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'root'</span>))<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br>root.unmount()<br></code>
```

#### 已删除：`ReactDOM.findDOMNode`

`ReactDOM.findDOMNode` 已于 2018 年 10 月（React 16.6）弃用。

我们正在删除 `findDOMNode`，因为它是一个过时的逃生舱口，执行速度慢，重构脆弱，仅返回第一个子级元素，并且破坏了抽象级别。

你可以将 `ReactDOM.findDOMNode` 替换为 `DOM refs`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;切换前：</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;findDOMNode&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span><br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">AutoselectingInput</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;input&nbsp;=&nbsp;findDOMNode(<span data-darkreader-inline-color="">this</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;input.select()<br>&nbsp;&nbsp;},&nbsp;[])<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">defaultValue</span>=<span data-darkreader-inline-color="">"Hello"</span>&nbsp;/&gt;</span><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;切换后：</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">AutoselectingInput</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ref&nbsp;=&nbsp;useRef(<span data-darkreader-inline-color="">null</span>)<br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ref.current.select()<br>&nbsp;&nbsp;},&nbsp;[])<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">ref</span>=<span data-darkreader-inline-color="">{ref}</span>&nbsp;<span data-darkreader-inline-color="">defaultValue</span>=<span data-darkreader-inline-color="">"Hello"</span>&nbsp;/&gt;</span><br>}<br></code>
```

## 参考文献

1.  React：https://react.dev
    
2.  Upgrade Guide：https://react.dev/blog/2024/04/25/react-19-upgrade-guide
    
3.  React 19 Beta：https://react.dev/blog/2024/04/25/react-19
    

## 粉丝互动

本期话题是：如何评价 React 19 Beta 公测版？你可以在本文下方自由言论，文明科普。

欢迎持续关注“前端俱乐部”，给前端以福利，给编程以复利。

坚持读完的小伙伴可以给自己点赞！谢谢大家的点赞，掰掰~