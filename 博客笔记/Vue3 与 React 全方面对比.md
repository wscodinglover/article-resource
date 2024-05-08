## 1\. 编程风格 & 视图风格

## 1.1 编程风格

1.  `React` 语法少、难度大；`Vue` 语法多，难度小
    

例如指令：

**Vue**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">v-model</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"username"</span>/&gt;</span><br><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">v-for</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"(item,index)&nbsp;in&nbsp;list"</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">:key</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"index"</span>&gt;</span>{{&nbsp;item&nbsp;}}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br><br></code>
```

**React**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{username}</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">onChange</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{e</span>&nbsp;=&gt;</span>&nbsp;setUsername(e.target.value)}/&gt;<br><br><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>{&nbsp;list.map((item,index)&nbsp;=&gt;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">key</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{index}</span>&gt;</span>{item}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span>)&nbsp;}<br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br><br></code>
```

`Vue` 给我们提供了很多的指令功能，而这些功能在 `React` 中基本都需要我们使用原生 `js` 来实现。

所以会有很多人说: "使用 Vue 实际上你就是在操作 Vue，使用 React 实际上你是在操作 js"。

2.  React 魔改少，手动实现；Vue 魔改多，自动完成。
    

例如事件：

**Vue**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-outline="" data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"handleClick('hello')"</span>&gt;</span>点击<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br><br>const&nbsp;handleClick&nbsp;=&nbsp;(msg)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;console.log('msg')<br>}<br><br></code>
```

**React**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"handleClick('hello')"</span>&gt;</span>点击<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br><br>const&nbsp;handleClick&nbsp;=&nbsp;(msg)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(msg)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></code>
```

像在点击事件中传参数这种功能：

1.  我们知道 `dom` 的点击事件是需要我们传递一个函数过去的，就像在 `React` 中例子一样，你的 `handleClick` 肯定需要返回一个函数（或者在 `jsx` 中写箭头函数调用 `handleClick`）。
    
2.  而在 `Vue` 中可以在 `@click` 中直接调用 `handleClick` 函数，而这个函数又没有返回一个新的函数，按道理这样调用 `handleClick` 是会返回 `undefined` 的，但是由于 `Vue` 底层做了魔改优化，使得我们不再需要在返回一个函数。
    

上面两个例子中，我们说不上哪种好哪种不好，只能说你更喜欢哪一种。`React` 中的实现更符合 `js` 的逻辑但却稍显麻烦，`Vue` 中的实现简单但却没有遵循原生 `js` 的特点。

编程风格上的总结：就像我们前面讲的，`Vue` 写起来更像是写 `Vue` 代码，`React` 写起来更像是写 `JavaScript` 代码。

## 1.2 视图风格

1.  `Vue` 采用 `<template>` 字符串模板。更贴近 `HTML`，学习成本低，但有时候不灵活。
    
2.  `React` 采用 `JSX` 语法，更类似于 `js` ，限制比较多，（像一些关键字 `class`、`for`，单标签要闭合、属性要驼峰、组件名要大写等等这些都要注意），但是可以跟模板语法很好的进行结合
    

比如下面是一个通过 `level` 的值来渲染不同的标签在 `Vue` 和 `React` 中的不同实现

**Vue**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">v-if</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"level&nbsp;===&nbsp;1"</span>&gt;</span>标题1<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h2</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">v-if</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"level&nbsp;===&nbsp;2"</span>&gt;</span>标题2<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br><br></code>
```

**React**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">let</span>&nbsp;App&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;level&nbsp;=&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;Tag&nbsp;=&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'h'</span>&nbsp;+&nbsp;level<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Tag</span>&gt;</span>标题{level}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Tag</span>&gt;</span>}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br><br></code>
```

可以想象，如果当我们的条件判断很多时，使用 `JSX` 的方式会比使用模版字符串要灵活的多。

**注意**: `Vue` 一开始并不直接支持 `JSX` ，在 `Vue 2.1.0` 版本中，`Vue` 引入了 `render` 函数来代替模板，这使得使用 `JSX` 作为组件渲染函数成为可能。在`Vue 2.1.0`版本后的 `create-vue` 和 `Vue CLI` 都有预置的 `JSX` 语法支持。所以说在 `Vue` 中如果你想写 `JSX` 这个它也是支持的，但是在 `React` 是没办法用字符串模板的方式写。

## 2\. 组件 & 路由 & 状态管理

## 2.1 组件风格

1.  `Vue2` 中采用 **选项式 API**，但是由于它**不够灵活**，而且 `this` 指向不够简单，`Vue3` 中给我们提供了 **组合式API** 的写法，**组合式 API** 更偏向函数式编程的方式，它的复用能力和组合的能力更强，而且没有 `this` 指向问题，也是 `Vue` 比较推荐的写法。
    
2.  `React` 在 `16.8` 版本之前都是采用**类组件**的方式开发，**类组件**也会有 `this` 指向以及写起来很**繁琐难度大**的问题，在 `16.8` 之后 `React` 提供了**函数组件**的写法，其**实函数组件**和 `Vue` 的 **组合式 API** 是很像的，它的组合和复用的能力更强，而且也没有 `this` 指向问题，比类组件写起来简单很多，也是 `React` 比较推荐的写法
    

**Vue 组件示意图：**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"my-component"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;HTML模板&nbsp;--&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">default</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;JavaScript代码</span><br>}<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><br><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">style</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">.my-component</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">/*&nbsp;CSS样式&nbsp;*/</span><br>}<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">style</span>&gt;</span><br><br></code>
```

**React 组件示意图：**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'react'</span>;<br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./MyComponent.css'</span>;<br><br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">MyComponent</span>(<span data-darkreader-inline-outline=""></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;JavaScript代码</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">className</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"my-component"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/*&nbsp;HTML模板&nbsp;*/}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">default</span>&nbsp;MyComponent;<br><br></code>
```

总结：这两种框架它们的最终趋势都是函数式编程，不管是 `Vue` 还是 `React` 都是推荐我们引入大量内置的函数或者是 use 函数来进行组合并且完成我们的开发需求。而简化使用面向对象或者是配置的写法，能简化我们使用 `this` 的场景从而提升代码的灵活度和简易度。

## 2.2 路由风格

`Vue` 采用 `Vue-Router`；React 采用 `React-Router`

相比而言 `vue` 语法更加简练（useRouter useRoute），而 `react` 的 use 函数太多，不够统一化（useLocation、useParams、useSearchParams、useNavigate......）

而像下面这些常规的功能它们都是大差不差的：

1.  路由表的配置
    
2.  嵌套路由
    
3.  动态路由
    
4.  编程式路由
    
5.  守卫路由
    

**Vue-Router 示例代码**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;index.html&nbsp;--&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"app"</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">router-view</span>&gt;</span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">router-view</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;main.js</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createApp&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createRouter,&nbsp;createWebHistory&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue-router'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;Home&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./components/Home.vue'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;About&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./components/About.vue'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;router&nbsp;=&nbsp;createRouter({<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">history</span>:&nbsp;createWebHistory(),<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">routes</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">path</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'/'</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">component</span>:&nbsp;Home&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">path</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'/about'</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">component</span>:&nbsp;About&nbsp;}<br>&nbsp;&nbsp;]<br>})<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;createApp({<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;空的&nbsp;`setup`&nbsp;函数</span><br>&nbsp;&nbsp;setup()&nbsp;{}<br>})<br><br>app.use(router)<br>app.mount(<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'#app'</span>)<br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;!--&nbsp;Home.vue&nbsp;--&gt;<br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>Home&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-outline="" data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"goToAbout"</span>&gt;</span>Go&nbsp;to&nbsp;About&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span></span><br><br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">setup</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useRouter&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue-router'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;router&nbsp;=&nbsp;useRouter()<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;goToAbout&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;router.push(<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'/about'</span>)<br>}<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span></span><br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;!--&nbsp;About.vue&nbsp;--&gt;<br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>About&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">p</span>&gt;</span>Param:&nbsp;{{&nbsp;$route.params.id&nbsp;}}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">router-link</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/"</span>&gt;</span>Go&nbsp;to&nbsp;Home&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">router-link</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span></span><br><br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">setup</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useRoute&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue-router'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;route&nbsp;=&nbsp;useRoute()<br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;id&nbsp;=&nbsp;route.params.id<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span></span><br><br><br></code>
```

**React-Router 示例代码**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'react'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BrowserRouter&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">as</span>&nbsp;Router,&nbsp;Switch,&nbsp;Route,&nbsp;Link,&nbsp;useParams,&nbsp;useHistory&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'react-router-dom'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;Home&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./components/Home'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;About&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./components/About'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;App&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Router</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/"</span>&gt;</span>Home<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&gt;</span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/about"</span>&gt;</span>About<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&gt;</span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">hr</span>/&gt;</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Switch</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">exact</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Home</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Route</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Route</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">path</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/about"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">About</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Route</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Switch</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Router</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;Home&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;history&nbsp;=&nbsp;useHistory()<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;handleClick&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;history.push(<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'/about'</span>)<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>Home&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{handleClick}</span>&gt;</span>Go&nbsp;to&nbsp;About&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;About&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;id&nbsp;}&nbsp;=&nbsp;useParams()<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>About&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">p</span>&gt;</span>Param:&nbsp;{id}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">to</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"/"</span>&gt;</span>Go&nbsp;to&nbsp;Home&nbsp;Page<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Link</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">default</span>&nbsp;App<br><br><br></code>
```

## 2.3 状态管理风格

`Vue` 采用 `Vuex/Pinia` ；`React` 采用 `Redux/Mobx`

区别：

1.  语法和 `API` 的不同：`Vuex` 和 `Pinia` 是专门为 `Vue.js` 设计的状态管理库，因此它们的语法和API都非常类似。而 `Redux` 和 `Mobx` 可以在任何 `JavaScript` 应用程序中使用，因此**它们的语法和API与特定的框架无关**。
    
2.  数据流的不同：在 `Redux` 中，数据是通过单向数据流进行管理的，即 `action \-> reducer \-> store \-> view`。而在 `Vuex` 和 `Pinia` 中，数据是通过 `Vuex store` 或 `Pinia store` 直接管理的，不需要 `reducer`。而在 `Mobx` 中，数据则是通过响应式数据实现的。
    
3.  异步处理的不同：在 `Redux` 中，异步处理通常需要使用中间件来处理异步操作。而在 `Vuex` 和 `Pinia` 中，异步操作可以通过 `actions` 处理。而在 `Mobx` 中，则可以使用 `async/await` 或 `reaction` 函数来处理异步操作。
    
4.  开销和复杂性的不同：`Redux` 和 `Mobx` 都需要在应用程序中进行额外的设置和配置，并且在处理大量数据时可能会导致性能问题。而 `Vuex` 和 `Pinia` 的设置和配置相对简单，并且在大多数情况下可以处理大量数据。
    

总的来说，`Vuex` 和 `Pinia` 适用于 `Vue.js` 应用程序，**提供了一种简单和直接的状态管理方式**，而 `Redux` 和 `Mobx` 则可以在多种应用程序中使用，**提供了更灵活的状态管理方案**。

**Pinia 示例代码**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;store.js</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;defineStore&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'pinia'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;useCounterStore&nbsp;=&nbsp;defineStore({<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'counter'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">state</span>:&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">count</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;}),<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">actions</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;increment()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">this</span>.count++<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>})<br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;App.vue&nbsp;--&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>Count:&nbsp;{{&nbsp;count&nbsp;}}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-outline="" data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"incrementCount"</span>&gt;</span>Increment<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">setup</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;defineComponent&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useCounterStore&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./store'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;counterStore&nbsp;=&nbsp;useCounterStore()<br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;count&nbsp;=&nbsp;counterStore.count<br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;incrementCount&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;counterStore.increment()<br>}<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;在根组件中注入&nbsp;store&nbsp;--&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><span data-darkreader-inline-outline=""><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createApp&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'vue'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createPinia&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'pinia'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;App&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./App.vue'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;createApp(App)<br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;pinia&nbsp;=&nbsp;createPinia()<br>app.use(pinia)<br>app.mount(<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'#app'</span>)<br></span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><br><br><br></code>
```

**Redux Toolkit 示例代码**

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;store.js</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;configureStore,&nbsp;createSlice&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'@reduxjs/toolkit'</span><br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;counterSlice&nbsp;=&nbsp;createSlice({<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'counter'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">initialState</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">count</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">0</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">reducers</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;increment(state)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state.count++<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;store&nbsp;=&nbsp;configureStore({<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">reducer</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">counter</span>:&nbsp;counterSlice.reducer<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;increment&nbsp;}&nbsp;=&nbsp;counterSlice.actions;<br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;App.js</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useSelector,&nbsp;useDispatch&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'react-redux'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;increment&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./store'</span><br><br><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">App</span>(<span data-darkreader-inline-outline=""></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;count&nbsp;=&nbsp;useSelector(<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">state</span>&nbsp;=&gt;</span>&nbsp;state.counter.count)<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;dispatch&nbsp;=&nbsp;useDispatch()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;incrementCount&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;dispatch(increment())<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span>Count:&nbsp;{count}<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{incrementCount}</span>&gt;</span>Increment<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">div</span>&gt;</span></span><br>&nbsp;&nbsp;)<br>}<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">default</span>&nbsp;App<br><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;在根组件中注入&nbsp;store</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Provider&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'react-redux'</span><br><span data-darkreader-inline-outline="" data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;store&nbsp;}&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'./store'</span><br><br>ReactDOM.render(<br>&nbsp;&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Provider</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">store</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{store}</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">App</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">Provider</span>&gt;</span></span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-outline="" data-darkreader-inline-color="">'root'</span>)<br>);<br><br></code>
```

## 3\. 一些基础功能

## 3.1 模板对比

`Vue` 的视图变化主要通过：指令 + 模板的方式

`React` 的视图变化主要通过：原生JS + 模板的方式

`React` 的模板比较强大，因为可以编写 `JSX` 结构，所以可以做出更加灵活的结构处理。

## 3.2 样式对比

`Vue` 的 `class` 和 `style` 都有三种写法：字符串、数组、对象

`React` 的 `style` 只能写对象，`class` 只能字符串，可借助 `classnames` 这个库

两个框架基本上都可以满足常见的样式需求。

## 3.3 事件对比

`Vue` 事件功能丰富

`React` 事件传参需要高阶处理

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;Vue&nbsp;--&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">v-for</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"item,index&nbsp;in&nbsp;list"</span>&nbsp;@<span data-darkreader-inline-outline="" data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">"handleClick(index)"</span>&gt;</span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">template</span>&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><br>methods:&nbsp;{<br>&nbsp;handleClick(index){<br>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">script</span>&gt;</span><br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">&lt;!--&nbsp;React&nbsp;--&gt;</span><br><span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;list.map((v,&nbsp;i)=&gt;&nbsp;<span data-darkreader-inline-outline="">&lt;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-outline="" data-darkreader-inline-color="">{handleClick(i)}</span>&gt;</span><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">li</span>&gt;</span>)<br>}<br><span data-darkreader-inline-outline="">&lt;/<span data-darkreader-inline-outline="" data-darkreader-inline-color="">ul</span>&gt;</span><br>const&nbsp;handleClick&nbsp;=&nbsp;(index)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(index)<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;<br>}<br><br><br></code>
```

## 3.4 表单对比

`Vue` 表单双向绑定 `v-model`

`React` 表单受控与非受控

针对表单操作这一块来说，`Vue` 的表单指令 `v-model` 还是非常灵活的，总体对比要比 `React` 使用方便且灵活。

## 3.5 组件通信对比

`Vue` 父子组件通过 `props`属性通信，子父组件通过 `emits` 方法通信

`React` 父子组件也是通过 `props`属性通信，而子父组件则是通过回调函数通信的

`emits` 自定义事件和回调函数，实际上是一样的思想。

跨组件的通信方案也很类似，都是一种依赖注入的方式来实现的。

## 3.6 逻辑复用

`Vue` 选项式采用：`mixins混入`；组合式采用：`use函数`

`React` 类组件采用：`Render Props`、`HOC`；函数组件：`use函数`

可以发现组合式API和函数组件都是采用use函数，所以基本复用是差不多的思想，这也是两个框架推荐的用法。

## 3.7 内容分发

`Vue` 通过插槽，进行接收

`React` 通过 `props.children`，进行接收

## 3.8 DOM操作

`Vue` 通过 `ref` 属性

`React` 也通过 `ref` 属性处理

思路都是差不多的，就是给元素添加 `ref` 属性，在跟对象或字符串绑定在一起，这样就可以直接获取到 `DOM` 元素。

## 4\. 响应式 & 生命周期 & 副作用

## 4.1 响应式数据对比

Vue采用响应式数据，底层通过new Proxy()进行监控，灵活性更高

React采用state状态，通过setState()方法进行内部re-render，可控性更强

## 4.2 生命周期对比

Vue生命周期钩子(常见)

1.  beforeCreate
    
2.  created
    
3.  beforeMount
    
4.  mounted
    
5.  beforeUpdate
    
6.  updated
    
7.  beforeUnmount
    
8.  unmounted
    

React生命周期钩子(常见)

1.  constructor
    
2.  componentDidMount
    
3.  componentDidUpdate
    
4.  componentWillUnmount
    
5.  render 整体对比来看，`Vue` 的生命周期会更丰富一些，`React` 生命周期会更简约一些。
    

## 4.3 副作用处理对比

vue使用，watchEffect()

react使用，useEffect()

都是处理副作用的方法，用法上还是有很大区别的。

watchEffect会自动根据所依赖的值进行重渲染，而useEffect要明确指定对应的值才能进行重渲染，React团队已经给出在未来的版本中可能会改成根据所依赖的值自动进行重渲染的操作，但暂时还不行。

watchEffect在更新前和卸载前触发的方式是通过回调函数的参数被调用来实现的，而useEffect是通过return的返回值来指定的。

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;Vue</span><br>watchEffect(<span data-darkreader-inline-outline="">(<span data-darkreader-inline-outline="">cb</span>)=&gt;</span>{<br>&nbsp;cb(<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//更新前的触发</span><br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>})<br><br></code>
```

```
<span data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;React</span><br>useEffect(<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//更新前的触发</span><br>&nbsp;&nbsp;&nbsp;}<br>})</code>
```