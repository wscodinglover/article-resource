### react 强制刷新

component.forceUpdate() 一个不常用的生命周期方法, 它的作用就是强制刷新。

官网解释如下：

1.  默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。
    
2.  调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。
    

通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。

shouldComponentUpdate 在初始化 和 forceUpdate 不会执行。

### React 组件中怎么做事件代理？它的原理是什么？

React基于Virtual DOM实现了一个SyntheticEvent层（合成事件层），定义的事件处理器会接收到一个合成事件对象的实例，它符合W3C标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。

在React底层，主要对合成事件做了两件事：

-   **事件委派：** React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
    
-   **自动绑定：** React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。
    

### React-Router怎么设置重定向？

在React Router中设置重定向可以通过使用`<Redirect>`组件来实现。

以下是不同版本React Router中设置重定向的基本方法：

1.  React Router v4至v5:
    

在React Router v4和v5中，你可以直接在路由配置中使用`<Redirect>`组件来进行重定向：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BrowserRouter&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;Router,&nbsp;Route,&nbsp;Redirect&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-router-dom'</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">Router</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;重定向示例&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-color="">exact</span>&nbsp;<span data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-color="">"/old-path"</span>&nbsp;<span data-darkreader-inline-color="">render</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">Redirect</span>&nbsp;<span data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-color="">"/new-path"</span>&nbsp;/&gt;</span>}&nbsp;/&gt;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;其他路由配置&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-color="">"/new-path"</span>&nbsp;<span data-darkreader-inline-color="">component</span>=<span data-darkreader-inline-color="">{NewPage}</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;...&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Router</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

在这个例子中，当用户访问路径`/old-path`时，将会被重定向到`/new-path`。

2.  React Router v6
    

在React Router v6中，`<Redirect>`组件已经被移除，取而代之的是使用`navigate()`函数或者在`element`属性中执行条件重定向：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BrowserRouter&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;Router,&nbsp;Routes,&nbsp;Route,&nbsp;useNavigate&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-router-dom'</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">App</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;navigate&nbsp;=&nbsp;useNavigate();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用navigate函数重定向</span><br>&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(shouldRedirect)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;navigate(<span data-darkreader-inline-color="">'/new-path'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">replace</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;});&nbsp;<span data-darkreader-inline-color="">//&nbsp;replace防止原路径保留在历史记录中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},&nbsp;[shouldRedirect,&nbsp;navigate]);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">Router</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;或者在Route内部执行条件重定向&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Routes</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-color="">"/old-path"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;/*&nbsp;检查某些条件并重定向&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{conditionalRedirect&nbsp;&amp;&amp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Navigate</span>&nbsp;<span data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-color="">"/new-path"</span>&nbsp;<span data-darkreader-inline-color="">replace</span>&nbsp;/&gt;</span>}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Route</span>&gt;</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-color="">"/new-path"</span>&nbsp;<span data-darkreader-inline-color="">element</span>=<span data-darkreader-inline-color="">{</span>&lt;<span data-darkreader-inline-color="">NewPage</span>&nbsp;/&gt;</span>}&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;...&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Routes</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Router</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

在v6中，如果要在渲染阶段直接重定向，可以使用`<Navigate>`组件，并根据需要设置`to`属性为目标路径。如果需要根据某些条件动态重定向，则可以配合useState或者其他状态管理工具，在满足条件时触发重定向。

### 什么是上下文Context

Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

-   用法：在父组件上定义getChildContext方法，返回一个对象，然后它的子组件就可以通过this.context属性来获取
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;React,{Component}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;ReactDOM&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react-dom'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;PropTypes&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'prop-types'</span>;<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Header</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Component</span></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Title</span>/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Title</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Component</span></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;contextTypes={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:PropTypes.string<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">style</span>=<span data-darkreader-inline-color="">{{color:this.context.color}}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Main</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Component</span></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Content</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">Content</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Content</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Component</span></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;contextTypes={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:&nbsp;PropTypes.string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">changeColor</span>:PropTypes.func<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">style</span>=<span data-darkreader-inline-color="">{{color:this.context.color}}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>=&gt;</span>this.context.changeColor('green')}&gt;绿色<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>=&gt;</span>this.context.changeColor('orange')}&gt;橙色<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Page</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Component</span></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state={<span data-darkreader-inline-color="">color</span>:<span data-darkreader-inline-color="">'red'</span>};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;childContextTypes={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:&nbsp;PropTypes.string,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">changeColor</span>:PropTypes.func<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;getChildContext()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.state.color,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">changeColor</span>:<span>(<span>color</span>)=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({color})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Header</span>/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Main</span>/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>ReactDOM.render(<span>&lt;<span data-darkreader-inline-color="">Page</span>/&gt;</span>,<span data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-color="">'#root'</span>));<br></code>
```

### 在构造函数调用 super 并将 props 作为参数传入的作用

在调用 super() 方法之前，子类构造函数无法使用this引用，ES6 子类也是如此。  
将 props 参数传递给 super() 调用的主要原因是在子构造函数中能够通过this.props来获取传入的 props

**传递了props**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyComponent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">this</span>.props);&nbsp;<span data-darkreader-inline-color="">//&nbsp;{&nbsp;name:&nbsp;'sudheer',age:&nbsp;30&nbsp;}</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

**没传递 props**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyComponent</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">this</span>.props);&nbsp;<span data-darkreader-inline-color="">//&nbsp;undefined</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;但是&nbsp;Props&nbsp;参数仍然可用</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(props);&nbsp;<span data-darkreader-inline-color="">//&nbsp;Prints&nbsp;{&nbsp;name:&nbsp;'sudheer',age:&nbsp;30&nbsp;}</span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;构造函数外部不受影响</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">this</span>.props);&nbsp;<span data-darkreader-inline-color="">//&nbsp;{&nbsp;name:&nbsp;'sudheer',age:&nbsp;30&nbsp;}</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

### React Hooks在平时开发中需要注意的问题和原因

（1）**不要在循环，条件或嵌套函数中调用Hook，必须始终在 React函数的顶层使用Hook**

这是因为React需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用Hook，就容易导致调用顺序的不一致性，从而产生难以预料到的后果。

（2）**使用useState时候，使用push，pop，splice等直接更改数组对象的坑**

使用push直接更改数组无法获取到新值，应该采用析构方式，但是在class里面不会有这个问题。代码示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Indicatorfilter</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;[num,setNums]&nbsp;=&nbsp;useState([<span data-darkreader-inline-color="">0</span>,<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">2</span>,<span data-darkreader-inline-color="">3</span>])<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;test&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里坑是直接采用push去更新num</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;setNums(num)是无法更新num的</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;必须使用num&nbsp;=&nbsp;[...num&nbsp;,1]</span><br>&nbsp;&nbsp;&nbsp;&nbsp;num.push(<span data-darkreader-inline-color="">1</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;num&nbsp;=&nbsp;[...num&nbsp;,1]</span><br>&nbsp;&nbsp;&nbsp;&nbsp;setNums(num)<br>&nbsp;&nbsp;}<br><span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-color="">'filter'</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{test}</span>&gt;</span>测试<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{num.map((item,index)&nbsp;=&gt;&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">{index}</span>&gt;</span>{item}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;))}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Indicatorfilter</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&lt;<span data-darkreader-inline-color="">any</span>,<span data-darkreader-inline-color="">any</span>&gt;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props:any){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">nums</span>:[<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">2</span>,<span data-darkreader-inline-color="">3</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.test&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.test.bind(<span data-darkreader-inline-color="">this</span>)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;class采用同样的方式是没有问题的</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state.nums.push(<span data-darkreader-inline-color="">1</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">nums</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.state.nums<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;render(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;{nums}&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.state<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{this.test}</span>&gt;</span>测试<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{nums.map((item:any,index:number)&nbsp;=&gt;&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-color="">{index}</span>&gt;</span>{item}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;))}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

（3）**useState设置状态的时候，只有第一次生效，后期需要更新状态，必须通过useEffect**

TableDeail是一个公共组件，在调用它的父组件里面，我们通过set改变columns的值，以为传递给TableDeail 的 columns是最新的值，所以tabColumn每次也是最新的值，但是实际tabColumn是最开始的值，不会随着columns的更新而更新：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;TableDeail&nbsp;=&nbsp;<span>(<span>{&nbsp;&nbsp;&nbsp;&nbsp;columns,}:TableData</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[tabColumn,&nbsp;setTabColumn]&nbsp;=&nbsp;useState(columns)&nbsp;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;正确的做法是通过useEffect改变这个值</span><br><span data-darkreader-inline-color="">const</span>&nbsp;TableDeail&nbsp;=&nbsp;<span>(<span>{&nbsp;&nbsp;&nbsp;&nbsp;columns,}:TableData</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[tabColumn,&nbsp;setTabColumn]&nbsp;=&nbsp;useState(columns)&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;useEffect(<span><span>()</span>&nbsp;=&gt;</span>{setTabColumn(columns)},[columns])<br>}<br><br><br></code>
```

（4）**善用useCallback**

父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。

（5）**不要滥用useContext**

可以使用基于 useContext 封装的状态管理工具。

### hooks父子传值

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">父传子<br>在父组件中用useState声明数据<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[&nbsp;data,&nbsp;setData&nbsp;]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">false</span>)<br><br>把数据传递给子组件<br>&lt;Child&nbsp;data={data}&nbsp;/&gt;<br><br>子组件接收<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;data&nbsp;}&nbsp;=&nbsp;props<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(data)<br>}<br>--------<br>子传父<br>子传父可以通过事件方法传值，和父传子有点类似。<br>在父组件中用useState声明数据<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[&nbsp;data,&nbsp;setData&nbsp;]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">false</span>)<br><br>把更新数据的函数传递给子组件<br>&lt;Child&nbsp;setData={setData}&nbsp;/&gt;<br><br>子组件中触发函数更新数据，就会直接传递给父组件<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>props</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;setData&nbsp;}&nbsp;=&nbsp;props<br>&nbsp;&nbsp;&nbsp;&nbsp;setData(<span data-darkreader-inline-color="">true</span>)<br>}<br>--------<br>如果存在多个层级的数据传递，也可依照此方法依次传递<br><br><span data-darkreader-inline-color="">//&nbsp;多层级用useContext</span><br><span data-darkreader-inline-color="">const</span>&nbsp;User&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;直接获取，不用回调</span><br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;user,&nbsp;setUser&nbsp;}&nbsp;=&nbsp;useContext(UserContext);<br>&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">Avatar</span>&nbsp;<span data-darkreader-inline-color="">user</span>=<span data-darkreader-inline-color="">{user}</span>&nbsp;<span data-darkreader-inline-color="">setUser</span>=<span data-darkreader-inline-color="">{setUser}</span>&nbsp;/&gt;</span>;<br>};<br></code>
```

### React中constructor和getInitialState的区别?

两者都是用来初始化state的。前者是ES6中的语法，后者是ES5中的语法，新版本的React中已经废弃了该方法。

getInitialState是ES5中的方法，如果使用createClass方法创建一个Component组件，可以自动调用它的getInitialState方法来获取初始化的State对象，

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;APP&nbsp;=&nbsp;React.creatClass&nbsp;({<br>&nbsp;&nbsp;getInitialState()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">userName</span>:&nbsp;<span data-darkreader-inline-color="">'hi'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;<span data-darkreader-inline-color="">0</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;}<br>})<br><br></code>
```

React在ES6的实现中去掉了getInitialState这个hook函数，规定state在constructor中实现，如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Class&nbsp;App&nbsp;extends&nbsp;React.Component{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.state={};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br></code>
```

### React的事件和普通的HTML事件有什么不同？

区别：

-   对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；
    
-   对于事件函数处理语法，原生事件为字符串，react 事件为函数；
    
-   react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。
    

合成事件是 react 模拟原生 DOM 事件所有能力的一个事件对象，其优点如下：

-   兼容所有浏览器，更好的跨平台；
    
-   将事件统一存放在一个数组，避免频繁的新增与删除（垃圾回收）。
    
-   方便 react 统一管理和事务机制。
    

事件的执行顺序为原生事件先执行，合成事件后执行，合成事件会冒泡绑定到 document 上，所以尽量避免原生事件与合成事件混用，如果原生事件阻止冒泡，可能会导致合成事件不执行，因为需要冒泡到document 上合成事件才会执行。

### React 中的高阶组件运用了什么设计模式？

使用了装饰模式，高阶组件的运用：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">withWindowWidth</span>(<span>BaseComponent</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">DerivedClass</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;state&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">windowWidth</span>:&nbsp;<span data-darkreader-inline-color="">window</span>.innerWidth,<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;onResize&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">windowWidth</span>:&nbsp;<span data-darkreader-inline-color="">window</span>.innerWidth,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;componentDidMount()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">window</span>.addEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.onResize)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;componentWillUnmount()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">window</span>.removeEventListener(<span data-darkreader-inline-color="">'resize'</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.onResize);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">BaseComponent</span>&nbsp;{<span data-darkreader-inline-color="">...this.props</span>}&nbsp;{<span data-darkreader-inline-color="">...this.state</span>}/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;DerivedClass;<br>}<br><span data-darkreader-inline-color="">const</span>&nbsp;MyComponent&nbsp;=&nbsp;<span>(<span>props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Window&nbsp;width&nbsp;is:&nbsp;{props.windowWidth}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>};<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;withWindowWidth(MyComponent);<br><br></code>
```

装饰模式的特点是不需要改变 被装饰对象 本身，而只是在外面套一个外壳接口。JavaScript 目前已经有了原生装饰器的提案，其用法如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">@testable<br>&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyTestableClass</span>&nbsp;</span>{<br>}<br></code>
```

### 什么是高阶组件

高阶组件不是组件，是 增强函数，可以输入一个元组件，返回出一个新的增强组件

-   属性代理 (Props Proxy) 在我看来属性代理就是提取公共的数据和方法到父组件，子组件只负责渲染数据，相当于设计模式里的模板模式，这样组件的重用性就更高了
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">proxyHoc</span>(<span>WrappedComponent</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newProps&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">count</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">WrappedComponent</span>&nbsp;{<span data-darkreader-inline-color="">...this.props</span>}&nbsp;{<span data-darkreader-inline-color="">...newProps</span>}&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></code>
```

-   反向继承
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;MyContainer&nbsp;=&nbsp;<span>(<span>WrappedComponent</span>)=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">WrappedComponent</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;render(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">super</span>.render();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

### 高阶组件的应用场景

权限控制

利用高阶组件的 **条件渲染** 特性可以对页面进行权限控制，权限控制一般分为两个维度：**页面级别** 和 **页面元素级别**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;HOC.js&nbsp;&nbsp;&nbsp;&nbsp;</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">withAdminAuth</span>(<span>WrappedComponent</span>)&nbsp;</span>{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state&nbsp;=&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">isAdmin</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;componentWillMount()&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;currentRole&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;getCurrentUserRole();&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setState({&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">isAdmin</span>:&nbsp;currentRole&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Admin'</span>,&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">this</span>.state.isAdmin)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>&lt;<span data-darkreader-inline-color="">WrappedComponent</span>&nbsp;{<span data-darkreader-inline-color="">...this.props</span>}&nbsp;/&gt;</span>;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<span><span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>您没有权限查看该页面，请联系管理员！<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span>);&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;};&nbsp;&nbsp;&nbsp;&nbsp;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;使用</span><br><span data-darkreader-inline-color="">//&nbsp;pages/page-a.js&nbsp;&nbsp;&nbsp;&nbsp;</span><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">PageA</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(props)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(props);&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;something&nbsp;here...&nbsp;&nbsp;&nbsp;&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;componentWillMount()&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;fetching&nbsp;data&nbsp;&nbsp;&nbsp;&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;render()&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;render&nbsp;page&nbsp;with&nbsp;data&nbsp;&nbsp;&nbsp;&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>}&nbsp;&nbsp;&nbsp;&nbsp;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;withAdminAuth(PageA);&nbsp;&nbsp;&nbsp;&nbsp;<br></code>
```

可能你已经发现了，高阶组件其实就是装饰器模式在 React 中的实现：通过给函数传入一个组件（函数或类）后在函数内部对该组件（函数或类）进行功能的增强（不修改传入参数的前提下），最后返回这个组件（函数或类），即允许向一个现有的组件添加新的功能，同时又不去修改该组件，属于 **包装模式(Wrapper Pattern)** 的一种。

什么是装饰者模式：**在不改变对象自身的前提下在程序运行期间动态的给对象添加一些额外的属性或行为**

**可以提高代码的复用性和灵活性**。

再对高阶组件进行一个小小的总结：

-   高阶组件 **不是组件**，**是** 一个把某个组件转换成另一个组件的 **函数**
    
-   高阶组件的主要作用是 **代码复用**
    
-   高阶组件是 **装饰器模式在 React 中的实现**
    

**封装组件的原则**

封装原则

1、单一原则：负责单一的页面渲染

2、多重职责：负责多重职责，获取数据，复用逻辑，页面渲染等

3、明确接受参数：必选，非必选，参数尽量设置以\_开头，避免变量重复

4、可扩展：需求变动能够及时调整，不影响之前代码

5、代码逻辑清晰

6、封装的组件必须具有高性能，低耦合的特性

7、组件具有单一职责：封装业务组件或者基础组件，如果不能给这个组件起一个有意义的名字，证明这个组件承担的职责可能不够单一，需要继续抽组件，直到它可以是一个独立的组件即可

### Redux 中异步的请求怎么处理

可以在 componentDidmount 中直接进⾏请求⽆须借助redux。但是在⼀定规模的项⽬中,上述⽅法很难进⾏异步流的管理,通常情况下我们会借助redux的异步中间件进⾏异步处理。redux异步流中间件其实有很多，当下主流的异步中间件有两种redux-thunk、redux-saga。

**（1）使用react-thunk中间件**

**redux-thunk**优点:

-   体积⼩: redux-thunk的实现⽅式很简单,只有不到20⾏代码
    
-   使⽤简单: redux-thunk没有引⼊像redux-saga或者redux-observable额外的范式,上⼿简单
    

**redux-thunk**缺陷:

-   样板代码过多: 与redux本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的
    
-   耦合严重: 异步操作与redux的action偶合在⼀起,不⽅便管理
    
-   功能孱弱: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装
    

使用步骤：

-   配置中间件，在store的创建中配置
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{createStore,&nbsp;applyMiddleware,&nbsp;compose}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'redux'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;reducer&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./reducer'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;thunk&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'redux-thunk'</span><br><br><span data-darkreader-inline-color="">//&nbsp;设置调试工具</span><br><span data-darkreader-inline-color="">const</span>&nbsp;composeEnhancers&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&nbsp;?&nbsp;<span data-darkreader-inline-color="">window</span>.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})&nbsp;:&nbsp;compose;<br><span data-darkreader-inline-color="">//&nbsp;设置中间件</span><br><span data-darkreader-inline-color="">const</span>&nbsp;enhancer&nbsp;=&nbsp;composeEnhancers(<br>&nbsp;&nbsp;applyMiddleware(thunk)<br>);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;store&nbsp;=&nbsp;createStore(reducer,&nbsp;enhancer);<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;store;<br><br></code>
```

-   添加一个返回函数的actionCreator，将异步请求逻辑放在里面
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">/**&nbsp;&nbsp;发送get请求，并生成相应action，更新store的函数&nbsp;&nbsp;<span data-darkreader-inline-color="">@param&nbsp;</span>url&nbsp;{string}&nbsp;请求地址&nbsp;&nbsp;<span data-darkreader-inline-color="">@param&nbsp;</span>func&nbsp;{function}&nbsp;真正需要生成的action对应的actionCreator&nbsp;&nbsp;<span data-darkreader-inline-color="">@return&nbsp;<span data-darkreader-inline-color="">{function}</span>&nbsp;</span>*/</span><br><span data-darkreader-inline-color="">//&nbsp;dispatch为自动接收的store.dispatch函数&nbsp;</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;getHttpAction&nbsp;=&nbsp;<span>(<span>url,&nbsp;func</span>)&nbsp;=&gt;</span>&nbsp;<span>(<span>dispatch</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;axios.get(url).then(<span><span data-darkreader-inline-color="">function</span>(<span>res</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;action&nbsp;=&nbsp;func(res.data)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dispatch(action)<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>}<br><br></code>
```

-   生成action，并发送action
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">componentDidMount(){<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;action&nbsp;=&nbsp;getHttpAction(<span data-darkreader-inline-color="">'/getData'</span>,&nbsp;getInitTodoItemAction)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;发送函数类型的action时，该action的函数体会自动执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;store.dispatch(action)<br>}<br><br></code>
```

**（2）使用redux-saga中间件**

**redux-saga**优点:

-   异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
    
-   action摆脱thunk function: dispatch 的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function
    
-   异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
    
-   功能强⼤: redux-saga提供了⼤量的Saga 辅助函数和Effect 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤
    
-   灵活: redux-saga可以将多个Saga可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步flow
    
-   易测试，提供了各种case的测试⽅案，包括mock task，分⽀覆盖等等
    

**redux-saga**缺陷:

-   额外的学习成本: redux-saga不仅在使⽤难以理解的 generator function,⽽且有数⼗个API,学习成本远超redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与redux-observable不同,redux-observable虽然也有额外学习成本但是背后是rxjs和⼀整套思想
    
-   体积庞⼤: 体积略⼤,代码近2000⾏，min版25KB左右
    
-   功能过剩: 实际上并发控制等功能很难⽤到,但是我们依然需要引⼊这些代码
    
-   ts⽀持不友好: yield⽆法返回TS类型
    

redux-saga可以捕获action，然后执行一个函数，那么可以把异步代码放在这个函数中，使用步骤如下：

-   配置中间件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{createStore,&nbsp;applyMiddleware,&nbsp;compose}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'redux'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;reducer&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./reducer'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;createSagaMiddleware&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'redux-saga'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;TodoListSaga&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./sagas'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;composeEnhancers&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&nbsp;?&nbsp;<span data-darkreader-inline-color="">window</span>.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})&nbsp;:&nbsp;compose;<br><span data-darkreader-inline-color="">const</span>&nbsp;sagaMiddleware&nbsp;=&nbsp;createSagaMiddleware()<br><br><span data-darkreader-inline-color="">const</span>&nbsp;enhancer&nbsp;=&nbsp;composeEnhancers(<br>&nbsp;&nbsp;applyMiddleware(sagaMiddleware)<br>);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;store&nbsp;=&nbsp;createStore(reducer,&nbsp;enhancer);<br>sagaMiddleware.run(TodoListSaga)<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;store;<br><br></code>
```

-   将异步请求放在sagas.js中
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{takeEvery,&nbsp;put}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'redux-saga/effects'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{initTodoList}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./actionCreator'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{GET_INIT_ITEM}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./actionTypes'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;axios&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'axios'</span><br><br><span><span data-darkreader-inline-color="">function</span>*&nbsp;<span data-darkreader-inline-color="">func</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以获取异步返回数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res&nbsp;=&nbsp;<span data-darkreader-inline-color="">yield</span>&nbsp;axios.get(<span data-darkreader-inline-color="">'/getData'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;action&nbsp;=&nbsp;initTodoList(res.data)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将action发送到reducer</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">yield</span>&nbsp;put(action)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<span data-darkreader-inline-color="">catch</span>(e){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'网络请求失败'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br><span><span data-darkreader-inline-color="">function</span>*&nbsp;<span data-darkreader-inline-color="">mySaga</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;自动捕获GET_INIT_ITEM类型的action，并执行func</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">yield</span>&nbsp;takeEvery(GET_INIT_ITEM,&nbsp;func)<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;mySaga<br><br></code>
```

-   发送action
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">componentDidMount(){<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;action&nbsp;=&nbsp;getInitTodoItemAction()<br>&nbsp;&nbsp;store.dispatch(action)<br>}<br><br></code>
```

### 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

**（1）哪些方法会触发 react 重新渲染?**

-   **setState（）方法被调用**
    

setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 setState 传入 null 时，并不会触发 render。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">App</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">Component</span>&nbsp;</span>{<br>&nbsp;&nbsp;state&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">a</span>:&nbsp;<span data-darkreader-inline-color="">1</span><br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;render()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"render"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">React.Fragement</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>{this.state.a}<span>&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.setState({&nbsp;a:&nbsp;1&nbsp;});&nbsp;//&nbsp;这里并没有改变&nbsp;a&nbsp;的值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click&nbsp;me&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;this.setState(null)}&gt;setState&nbsp;null<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">React.Fragement</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

-   **父组件重新渲染**
    

只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

**（2）重新渲染 render 会做些什么?**

-   会对新旧 VNode 进行对比，也就是我们所说的Diff算法。
    
-   对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
    
-   遍历差异对象，根据差异的类型，根据对应对规则更新VNode
    

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

### state 和 props 区别是啥？

-   state 是组件自己管理数据，控制自己的状态，可变；
    
-   props 是外部传入的数据参数，不可变；
    
-   没有state的叫做无状态组件，有state的叫做有状态组件；
    
-   多用 props，少用 state，也就是多写无状态组件。
    

### 应该在 React 组件的何处发起 Ajax 请求

在 React 组件中，应该在 `componentDidMount` 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 `componentDidMount` 中发起网络请求将保证这有一个组件可以更新了。