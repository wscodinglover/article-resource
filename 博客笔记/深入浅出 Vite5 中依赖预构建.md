## 引言  

大多数同学提到 `Vite` ，会下意识的反应出 “快”、“noBundle”等关键词。

那么，为什么 Vite 相较于 Webpack、Rollup 之类的会更加快，亦或是大多数同学认为 Vite 是 "noBundle" 又是否正确呢？

接下来，这篇文章和大家一起来深入浅出 Vite 中的核心的“预构建”过程。

> ❝
> 
> 文章中 vite 版本为最新的 `5.0.0-beta.18`。
> 
> ❞

## 预构建

## 概念

既然提到预构建，那么预构建究竟是一个什么样的概念呢？

熟悉 Vite 的朋友可能清楚，Vite 在开发环境中存在一个优化**「依赖预构建」**（Dependency Pre-Bundling）的概念。

简单来说，所谓依赖预构建指的是在 `DevServer` 启动之前，Vite 会扫描使用到的依赖从而进行构建，之后在代码中每次导入(`import`)时会动态地加载构建过的依赖这一过程，

也许大多数同学对于 Vite 的认知更多是 No Bundle，但上述的依赖预构建过程的确像是 Bundle 的过程。

简单来说，Vite 在一开始将应用中的模块区分为 **「依赖」** 和 **「源码」** 两类：

-   **「依赖部分」** 更多指的是代码中使用到的第三方模块，比如 `vue`、`lodash`、`react` 等。
    
    Vite 将会使用 esbuild 在应用启动时对于依赖部分进行预构建依赖。
    
-   **「源码部分」** 比如说平常我们书写的一个一个 `js`、`jsx`、`vue` 等文件，这部分代码会在运行时被编译，并不会进行任何打包。
    
    Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。
    

我们在文章中接下来要聊到的**「依赖预构建」**，其实更多是针对于第三方模块的预构建过程。

## 什么是预构建

我们在使用 `vite` 启动项目时，细心的同学会发现项目 `node_modules` 目录下会额外增加一个 `node_modules/.vite/deps` 的目录：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个目录就是 `vite` 在开发环境下预编译的产物。

项目中的**「依赖部分」**：`ahooks`、`antd`、`react` 等部分会被预编译成为一个一个 `.js` 文件。

同时，`.vite/deps` 目录下还会存在一个 `_metadata.json`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

`_metadata.json` 中存在一些特殊属性：

-   `hash`
    
-   `browserHash`
    
-   `optimized`
    
-   `chunks`
    

简单来说 `vite` 在预编译时会对于项目中使用到的第三方依赖进行依赖预构建，将构建后的产物存放在 `node_modules/.vite/deps` 目录中，比如 `ahooks.js`、`react.js` 等。

同时，预编译阶段也会生成一个 `_metadata.json` 的文件用来保存预编译阶段生成文件的映射关系(optimized 字段)，方便在开发环境运行时重写依赖路径。

上边的概念大家也不需要过于在意，现在不清楚也没关系。我们只需要清楚，依赖预构建的过程简单来说就是生成 `node_modules/deps` 文件即可。

## 为什么需要预构建

那么为什么需要预构建呢？

首先第一点，我们都清楚 Vite 是基于浏览器 `Esmodule` 进行模块加载的方式。

那么，对于一些非 `ESM` 模块规范的第三方库，比如 `react`。在开发阶段，我们需要借助预构建的过程将这部分非 `esm` 模块的依赖模块转化为 `esm` 模块。从而在浏览器中进行 `import` 这部分模块时也可以正确识别该模块语法。

另外一个方面，同样是由于 Vite 是基于 `Esmodule` 这一特性。在浏览器中每一次 `import` 都会发送一次请求，部分第三方依赖包中可能会存在许多个文件的拆分从而导致发起多次 `import` 请求。

比如 `lodash-es` 中存在超过 600 个内置模块，当我们执行 `import { debounce } from 'lodash'` 时，如果不进行预构建浏览器会同时发出 600 多个 HTTP 请求，这无疑会让页面加载变得明显缓慢。

正式通过依赖预构建，将 `lodash-es` 预构建成为单个模块后仅需要一个 HTTP 请求就可以解决上述的问题。

基于上述两点，Vite 中正是为了**「模块兼容性」**以及**「性能」**这两方面大的原因，所以需要进行依赖预构建。

## 思路导图

那么，预构建究竟是怎么样的过程？我们先来看一幅关于依赖预构建的思维导图

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在开始后续的内容之前，我们先来简单和大家聊聊这张图中描述的各个关键步骤。

1.  调用 `npm run dev`(vite) 启动开发服务器。首先，当我们在 vite 项目中首次启动开发服务器时，默认情况下（未指定 `build.rollupOptions.input`/`optimizeDeps.entries` 情况下），Vite 抓取项目目录下的所有的(`config.root`) `.html` 文件来检测需要预构建的依赖项（忽略了`node_modules`、`build.outDir`、`__tests__` 和 `coverage`）。
    

> ❝
> 
> 通常情况下，单个项目我们仅会使用单个 `index.html` 作为入口文件。
> 
> ❞

2.  分析 index.html 入口文件内容。其次，当首次运行启动命令后。Vite 会寻找到入口 HTML 文件后会分析该入口文件中的 `<script>` 标签寻找引入的 js/ts 资源（图中为 `/src/main.ts`）。
    
3.  分析 `/src/main.ts` 模块依赖 之后，会进入 `/src/main.ts` 代码中进行扫描，扫描该模块中的所有 `import` 导入语句。这一步主要会将依赖分为两种类型从而进行不同的处理方式：
    

-   对于源码中引入的第三方依赖模块，比如 `lodash`、`react` 等第三方模块。Vite 会在这个阶段将导入的第三方依赖的入口文件地址记录到内存中，简单来说比如当碰到 `import antd from 'antd'`时 Vite 会记录 `{ antd: '/Users/19Qingfeng/Desktop/vite/vite-use/node_modules/antd/es/index.js' }`，同时会将第三方依赖当作外部(`external`)进行处理（并不会递归进入第三方依赖进行扫描）。
    
-   对于模块源代码，就比如我们在项目中编写的源代码。Vite 会依次扫描模块中所有的引入，对于非第三方依赖模块会再次递归进入扫描。
    

5.  递归分析非第三方模块中的依赖引用 同时，在扫描完成 `/src/main.ts` 后，Vite 会对于该模块中的源码模块进行递归分析。这一步会重新进行第三步骤，唯一不同的是扫描的为 `/src/App.tsx`。
    
    最终，经过上述步骤 Vite 会从入口文件出发扫描出项目中所有依赖的第三方依赖，同时会存在一份类似于如下的映射关系表：
    
    ```
    <span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"antd"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;key&nbsp;为引入的第三方依赖名称，value&nbsp;为该包的入口文件地址</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"src"</span>:&nbsp;<span data-darkreader-inline-color="">"/Users/19Qingfeng/Desktop/vite/vite-use/node_modules/antd/es/index.js"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}，<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br></code>
    ```
    
6.  生产依赖预构建产物
    
    经过上述的步骤，我们已经生成了一份源码中所有关于第三方导入的依赖映射表。最后，Vite 会根据这份映射表调用 EsBuild 对于扫描出的所有第三方依赖入口文件进行打包。将打包后的产物存放在 `node_modules/.vite/deps` 文件中。比如，源码中导入的 `antd` 最终会被构建为一个单独的 `antd.js` 文件存放在 `node_modules/.vite/deps/antd.js` 中。
    

简单来说，上述的 5 个步骤就是 `Vite` 依赖预构建的过程。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

有些同学可能会好奇，预构建生成这样的文件怎么使用呢？

这个问题其实和这篇文章关系并不是很大，本篇文章中着重点更多是和让大家了解预构建是在做什么以及是怎么实现的过程。

简单来说，预构建对于第三方依赖生成 `node_modules/.vite/deps` 资源后。在开发环境下 `vite` 会“拦截”所有的 ESM 请求，将源码中对于第三方依赖的请求地址重写为我们预构建之后的资源产物，比如我们在源码中编写的 antd 导入：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

最终在开发环境下 Vite 会将对于第三方模块的导入路径重新为：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  

其实 `import { Button } from '/node_modules/.vite/deps/antd.js?v=09d70271'` 这个地址正是我们将 `antd` 在预构建阶段通过 Esbuild 在 `/node_modules/.vite/deps` 生成的产物。

至于 Vite 在开发环境下是如何重写这部分第三方导入的地址这件事，我们会在下一篇关于实现 Vite 的文章会和大家详细讲解。

## 简单实现

上边的过程我们对于 Vite 中的预构建进行了简单的流程梳理。

经过上述的章节我们了解了预构建的概念，以及预构建究竟的大致步骤。

接下来，我会用最简单的代码来和大家一起实现 Vite 中预构建这一过程。

> ❝
> 
> 因为源码的分支 case 比较繁琐，容易扰乱我们的思路。所以，我们先实现一个精简版的 Vite 开始入手巩固大家的思路，最后我们在循序渐进一步一步阅读源码。
> 
> ❞

### 搭建开发环境

工欲善其事，必先利其器。在着手开发之前，让我们先花费几分钟来稍微梳理一下开发目录。

这里，我创建了一个 `vite` 的简单目录结构：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">.<br>├──&nbsp;README.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reamdme&nbsp;说明文件<br>├──&nbsp;bin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>│&nbsp;&nbsp;&nbsp;└──&nbsp;vite&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;环境变量脚本文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>├──&nbsp;package.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>└──&nbsp;src&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源码目录<br><span>&nbsp;&nbsp;&nbsp;&nbsp;├──&nbsp;config.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;读取配置文件</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;└──&nbsp;server&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;服务文件目录</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──&nbsp;index.js&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;服务入口文件</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──&nbsp;middleware&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中间件目录文件夹</span><br></code>
```

创建了一个简单的目录文件，同时在 `bin/vite` 与 `package.json` 中的 `bin` 字段进行关联：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#!/usr/bin/env&nbsp;node</span><br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'hello&nbsp;custom-vite!'</span>);<br><br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"custom-vite"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"bin"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"custom-vite"</span>:&nbsp;<span data-darkreader-inline-color="">"./bin/vite"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>}<br></code>
```

关于 `bin` 字段的作用这里我就不再赘述了，此时当我们在本地运行 `npm link` 后，在控制台执行 `custom-vite` 就会输出 `hello custom-vite!`:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 编写开发服务器

接下来，让我们按照思维导图的顺序一步一步来。

在运行 `vite` 命令后需要启动一个开发服务器用来承载应用项目（启动目录下）的 `index.html` 文件作为入口文件，那么我们就从编译一个开发服务器开始。

首先，让我们先来修改 Vite 命令的入口文件 `/bin/vite`:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#!/usr/bin/env&nbsp;node</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createServer&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../src/server'</span>;<br><br>(<span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;server&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;createServer();<br>&nbsp;&nbsp;server.listen(<span data-darkreader-inline-color="">'9999'</span>,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'start&nbsp;server'</span>);<br>&nbsp;&nbsp;});<br>})();<br></code>
```

上边的 `/bin/vite` 文件中，我们从 `/src/server` 中引入了一个 `createServer` 创建开发服务器的方法。

随后，利用了一个自执行的函数调用该 `createServer` 方法，同时调用 `server.listen` 方法将开发服务器启动到 `9999` 端口。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;/src/server/index.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;connect&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'connect'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;http&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'node:http'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;staticMiddleware&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./middleware/staticMiddleware.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;resolveConfig&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../config.js'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;创建开发服务器<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>createServer</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;connect();&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建&nbsp;connect&nbsp;实例</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;resolveConfig();&nbsp;<span data-darkreader-inline-color="">//&nbsp;模拟配置清单&nbsp;（类似于&nbsp;vite.config.js）</span><br>&nbsp;&nbsp;app.use(staticMiddleware(config));&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用静态资源中间件</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;server&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;listen(port,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;启动服务</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http.createServer(app).listen(port,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;server;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createServer&nbsp;}<br></code>
```

我们 `/src/server/index.js` 中定义了一个创建根服务器的方法: `createServer`。

`createServer` 中首先我们通过 `connect` 模块配置 `nodejs http` 模块创建了一个支持中间件系统的应用服务。

> ❝
> 
> `connect` 为 `nodejs http` 模块提供了中间件的扩展支持，Express 4.0 之前的中间件模块就是基于 connect 来实现的。
> 
> ❞

之后，我们在 `createServer` 方法中通过 `resolveConfig` 方法来模拟读取一些必要的配置属性（该方法类似于从应用本身获取 `vite.config.js` 中的配置）:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/utils.js</span><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;windows&nbsp;下路径适配（将&nbsp;windows&nbsp;下路径的&nbsp;//&nbsp;变为&nbsp;/）<br>&nbsp;*&nbsp;<span data-darkreader-inline-color="">@param&nbsp;<span data-darkreader-inline-color="">{*}</span>&nbsp;<span data-darkreader-inline-color="">path</span></span><br>&nbsp;*&nbsp;<span data-darkreader-inline-color="">@returns</span><br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>normalizePath</span>(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;path.replace(<span data-darkreader-inline-color="">/\\/g</span>,&nbsp;<span data-darkreader-inline-color="">'/'</span>);<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;normalizePath&nbsp;};<br><br><br><span data-darkreader-inline-color="">//&nbsp;/src/config.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;normalizePath&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./utils.js'</span>;<br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;加载&nbsp;vite&nbsp;配置文件<br>&nbsp;*&nbsp;（模拟）<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>resolveConfig</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;normalizePath(process.cwd())&nbsp;<span data-darkreader-inline-color="">//&nbsp;仅定义一个项目根目录的返回</span><br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;config;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;resolveConfig;<br></code>
```

可以看到在 `resolveConfig` 中我们模拟了一个 `config` 对象进行返回，此时 `config` 对象是一个固定的路径：为调用 `custom-vite` 命令的 pwd 路径。

关于 root 配置项的作用，可以参考 Vite Doc Config，我们接下来会用该字段匹配的路径来寻找项目根入口文件(`index.html`)的所在地址。

初始化配置文件后，我们再次调用 `app.use(staticMiddleware(config));` 为服务使用了静态资源目录的中间件，保证使用 custom-vite 的目录下的静态资源在服务上的可访问性。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;serveStatic&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'serve-static'</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>staticMiddleware</span>(<span>{&nbsp;root&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;serveStatic(root);<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;staticMiddleware;<br></code>
```

上边我们使用了 serve-static 作为中间件来提供创建服务的静态资源功能。

此时，当我们在任意项目中使用 `custom-vite` 命令时 terminal 中打印出：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

同时，我们在浏览器中输入 `localhost:9999` 即可访问到我们根据使用到的项目创建的服务。

这一步，我们通过自己编写的 `custom-vite` 已经拥有一键启动开发环境的功能。

### 寻找/解析 HTML 文件

在调用 `custom-vite` 命令已经可以启动一个简单的开发服务器后，接下来我们就要开始为启动的开发服务器来填充对应的功能了。

了解过 Vite 的朋友都清楚，Vite 中的入口文件和其他沟通工具不同的是：vite 中是以 `html` 文件作为入口文件的。比如，我们新建一个简单的项目：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">.<br>├──&nbsp;index.html<br>├──&nbsp;main.js<br>├──&nbsp;./module.js<br>└──&nbsp;package.json<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;index.html<br><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">html</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">head</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">meta</span>&nbsp;<span data-darkreader-inline-color="">charset</span>=<span data-darkreader-inline-color="">"UTF-8"</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">meta</span>&nbsp;<span data-darkreader-inline-color="">name</span>=<span data-darkreader-inline-color="">"viewport"</span>&nbsp;<span data-darkreader-inline-color="">content</span>=<span data-darkreader-inline-color="">"width=device-width,&nbsp;initial-scale=1.0"</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">title</span>&gt;</span>Document<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">title</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">head</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;Hello&nbsp;vite&nbsp;use<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"module"</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"/main.js"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">html</span>&gt;</span><br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"custom-vite-use"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dev"</span>:&nbsp;<span data-darkreader-inline-color="">"vite"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;\"Error:&nbsp;no&nbsp;test&nbsp;specified\"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"devDependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react"</span>:&nbsp;<span data-darkreader-inline-color="">"^18.2.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vite"</span>:&nbsp;<span data-darkreader-inline-color="">"^5.0.4"</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">'1'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;a&nbsp;};<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import react from 'react';<br>import { a } from './module.js';<br><br>console.log(a);<br>console.log(react, 'react');<br></code>
```

我已在该项目中安装了 `react` 和 `vite`，我们先来看看对于上边这个简单的项目原始的 vite 表现如何。

此时我们在该项目目录下运行 `npm run dev` 命令，等待服务启动后访问 `localhost:5173`：

页面上会展示 `index.html` 的内容：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

同时，浏览器控制台中会打印：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

> ❝
> 
> 当然，也会打印 `1`。因为 `module.js` 是我在后续为了满足递归流程补上来的模块所以这里的图我就不补充了，大家理解即可～
> 
> ❞

同时我们观察浏览器 network 请求：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

network 中的请求顺序分别为 `index.html` => `main.js` => `react.js`，这里我们先专注预构建过程忽略其他的请求以及 `react.js`  后边的查询参数。

当我们打开 `main.js` 查看 sourceCode 时，会发现这个文件中关于 react 的引入已经完全更换了一个路径：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

很神奇对比，**「前边我们说过 vite 在启动开发服务器时对于第三方依赖会进行预构建的过程」**。这里，`/node_modules/.vite/deps/react.js` 正是启动开发服务时 react 的预构建产物。

我们来打开源码目录查看下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

一切都和我们上述提到过的过程看上去是那么的相似对吧。

启动开发服务器时，会首先根据 `index.html` 中的脚本分析模块依赖，将所有项目中引入的第三方依赖（这里为 `react`） 进行预构建。

**「将构建后的产物存储在 `.vite/deps` 目录中，同时将映射关系保存在 `.vite/deps/_metadata.json` 中，其中 `optimized` 对象中的 `react` 表示原始依赖的入口文件而 `file` 则表示经过预构建后生成的产物（两者皆为相对路径）。」**

之后，简单来说我们只要在开发环境下判断如果请求的文件名命中 `optimized` 对象的 `key` 时（这里为 `react`）则直接预构建过程中生成的文件 (`file` 字段对应的文件路径即可）。

接下来，我们就尝试在我们自己的 `custom-vite` 中来实现这一步骤。

首先，让我们从寻找 `index.html` 中出发：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;/src/config.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;normalizePath&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./utils.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;path&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;加载&nbsp;vite&nbsp;配置文件<br>&nbsp;*&nbsp;（模拟）<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>resolveConfig</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;normalizePath(process.cwd()),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">entryPoints</span>:&nbsp;[path.resolve(<span data-darkreader-inline-color="">'index.html'</span>)]&nbsp;<span data-darkreader-inline-color="">//&nbsp;增加一个&nbsp;entryPoints&nbsp;文件</span><br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;config;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;resolveConfig;<br></code>
```

首先，我们来修改下之前的 `/src/config.js` 为模拟的配置文件增加一个 `entryPoints` 入口文件，该文件表示 custom-vite 进行构建时的入口文件，即项目中的 `index.html` 文件。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;/src/server/index.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;connect&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'connect'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;http&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'node:http'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;staticMiddleware&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./middleware/staticMiddleware.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;resolveConfig&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../config.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createOptimizeDepsRun&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../optimizer/index.js'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;创建开发服务器<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>createServer</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;connect();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;resolveConfig();<br>&nbsp;&nbsp;app.use(staticMiddleware(config));<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;server&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;listen(port,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;启动服务之前进行预构建</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;runOptimize(config);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http.createServer(app).listen(port,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;server;<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;预构建<br>&nbsp;*&nbsp;<span data-darkreader-inline-color="">@param&nbsp;<span data-darkreader-inline-color="">{*}</span>&nbsp;<span data-darkreader-inline-color="">config</span></span><br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>runOptimize</span>(<span>config</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;createOptimizeDepsRun(config);<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createServer&nbsp;};<br></code>
```

上边我们对于 `/src/server/index.js` 中 `createServer` 方法进行了修改，在 `listen` 启动服务之前增加了 `runOptimize` 方法的调用。

所谓 `runOptimize` 方法正是在启动服务之前的预构建函数。可以看到在 `runOptimize` 中递归调用了一个 `createOptimizeDepsRun` 方法。

接下来，我们要实现这个 `createOptimizeDepsRun` 方法。这个方法的核心思路正是**「我们希望借助 Esbuild 在启动开发服务器前对于整个项目进行扫描，寻找出项目中所有的第三方依赖进行预构建。」**

让我们新建一个 `/src/optimizer/index.js` 文件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;scanImports&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./scan.js'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;分析项目中的第三方依赖<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;config<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>createOptimizeDepsRun</span>(<span>config</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过&nbsp;scanImports&nbsp;方法寻找项目中的所有需要预构建的模块</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;deps&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;scanImports(config);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(deps,&nbsp;<span data-darkreader-inline-color="">'deps'</span>);<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createOptimizeDepsRun&nbsp;};<br><br><span data-darkreader-inline-color="">//&nbsp;/src/optimizer/scan.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;build&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'esbuild'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;esbuildScanPlugin&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./scanPlugin.js'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;分析项目中的&nbsp;Import<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;config<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>scanImports</span>(<span>config</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;保存扫描到的依赖（我们暂时还未用到）</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;desImports&nbsp;=&nbsp;{};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建&nbsp;Esbuild&nbsp;扫描插件（这一步是核心）</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;scanPlugin&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;esbuildScanPlugin();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;借助&nbsp;EsBuild&nbsp;进行依赖预构建</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;build({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">absWorkingDir</span>:&nbsp;config.root,&nbsp;<span data-darkreader-inline-color="">//&nbsp;esbuild&nbsp;当前工作目录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">entryPoints</span>:&nbsp;config.entryPoints,&nbsp;<span data-darkreader-inline-color="">//&nbsp;入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">bundle</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;是否需要打包第三方依赖，默认&nbsp;Esbuild&nbsp;并不会，这里我们声明为&nbsp;true&nbsp;表示需要</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">format</span>:&nbsp;<span data-darkreader-inline-color="">'esm'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;打包后的格式为&nbsp;esm</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">write</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;不需要将打包的结果写入硬盘中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">plugins</span>:&nbsp;[scanPlugin]&nbsp;<span data-darkreader-inline-color="">//&nbsp;自定义的&nbsp;scan&nbsp;插件</span><br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;之后的内容我们稍微在讲，大家先专注于上述的逻辑</span><br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;scanImports&nbsp;};<br></code>
```

可以看到在 `/src/optimizer/scan.js` 的 `scanImports` 方法最后调用了 esbuild `build` 的 build 方法进行构建。

正是在这一部分构建中，我们使用了自己定义的 `scanPlugin` Esbuild Plugin 进行扫描项目依赖，那么 `esbuildScanPlugin` 又是如何实现的呢？

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;/src/optimizer/scanPlugin.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;nodePath&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;fs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'fs-extra'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;htmlTypesRe&nbsp;=&nbsp;<span data-darkreader-inline-color="">/(\.html)$/</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;scriptModuleRe&nbsp;=&nbsp;<span data-darkreader-inline-color="">/&lt;script\s+type="module"\s+src\="(.+?)"&gt;/</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>esbuildScanPlugin</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'ScanPlugin'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;setup(build)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;引入时处理&nbsp;HTML&nbsp;入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build.onResolve({&nbsp;<span data-darkreader-inline-color="">filter</span>:&nbsp;htmlTypesRe&nbsp;},&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;({&nbsp;path,&nbsp;importer&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将传入的路径转化为绝对路径&nbsp;这里简单先写成&nbsp;path.resolve&nbsp;方法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;resolved&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;nodePath.resolve(path);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(resolved)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">path</span>:&nbsp;resolved?.id&nbsp;||&nbsp;resolved,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">namespace</span>:&nbsp;<span data-darkreader-inline-color="">'html'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当加载命名空间为&nbsp;html&nbsp;的文件时</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build.onLoad({&nbsp;<span data-darkreader-inline-color="">filter</span>:&nbsp;htmlTypesRe,&nbsp;<span data-darkreader-inline-color="">namespace</span>:&nbsp;<span data-darkreader-inline-color="">'html'</span>&nbsp;},&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;({&nbsp;path&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将&nbsp;HTML&nbsp;文件转化为&nbsp;js&nbsp;入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;htmlContent&nbsp;=&nbsp;fs.readFileSync(path,&nbsp;<span data-darkreader-inline-color="">'utf-8'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(htmlContent,&nbsp;<span data-darkreader-inline-color="">'htmlContent'</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;htmlContent&nbsp;为读取的&nbsp;html&nbsp;字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[,&nbsp;src]&nbsp;=&nbsp;htmlContent.match(scriptModuleRe);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'匹配到的&nbsp;src&nbsp;内容'</span>,&nbsp;src);&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取匹配到的 src 路径：/main.js</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jsContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">`import&nbsp;<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">JSON</span>.stringify(src)}</span>`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">contents</span>:&nbsp;jsContent,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">loader</span>:&nbsp;<span data-darkreader-inline-color="">'js'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;esbuildScanPlugin&nbsp;};<br></code>
```

简单来说，Esbuild 在进行构建时会对每一次 `import` 匹配插件的 `build.onResolve` 钩子，匹配的规则核心为两个参数，分别为：

-   `filter`: 该字段可以传入一个正则表达式，Esbuild 会为每一次导入的路径与该正则进行匹配，如果一致则认为通过，否则则不会进行该钩子。
    
-   `namespace`: 每个模块都有一个关联的命名空间，默认每个模块的命名空间为 file （表示文件系统），我们可以显示声明命名空间规则进行匹配，如果一致则认为通过，否则则不会进行该钩子。
    

> ❝
> 
> 不熟悉 Esbuild 相关配置和 Plugin 开发的同学可以优先移步 Esbuild 官网手册进行简单的查阅。
> 
> ❞

上述的 `scanPlugin` 的核心思路为：

-   当运行 `build` 方法时，首先入口文件地址会进入 `ScanPlugn` 的 `onResolve` 钩子。
    

此时，由于 `filter` 的正则匹配为后缀为 `.html`，并不存在 namespace(默认为 `file`)。则此时，`index.html` 会进入 `ScanPlugin` 的 `onResolve` 钩子中。

在 `build.onResolve` 中，我们先将传入的 `path` 转化为磁盘上的绝对路径，将 html 的绝对路径进行返回，同时修改入口 html 的 `namespace` 为自定义的 `html`。

> ❝
> 
> 需要注意的是如果同一个 import （导入）如果存在多个 `onResolve` 的话，会按照代码编写的顺序进行顺序匹配，**「如果某一个 `onResolve` 存在返回值，那么此时就不会往下继续执行其他 `onResolve` 而是会进行到下一个阶段(`onLoad`)」**，Esbuild 中其他 hook 也同理。
> 
> ❞

-   之后，由于我们在 `build.onResolve` 中对于入口 `html` 文件进行了拦截处理，在 `onLoad` 钩子中依然进行匹配。
    

`onLoad` 钩子中我们的 `filter` 规则同样为 `htmlTypesRe`,同时增加了匹配 `namespace` 为 `html` 的导入。

此时，我们在上一个 `onResove` 返回的 `namspace` 为 `html` 的入口文件会进行该 `onLoad` 钩子。

> ❝
> 
> build.onLoad 该钩子的主要作用加载对应模块内容，如果 onResolve 中返回 `contents` 内容，则 Esbuild 会将返回的 `contents` 作为内容进行后续解析（并不会对该模块进行默认加载行为解析），否则默认会为 `namespace` 为 `file` 的文件进行 IO 读取文件内容。
> 
> ❞

我们在 `build.onlod` 钩子中，首先根据传入的 `path` 读取入口文件的 `html` 字符串内容获得 `htmlContent`。

之后，我们根据正则对于 `htmlContent` 进行了截取，获取 `<script type="module" src="/main.js />"` 中引入的 js 资源 `/main.js`。

**「此时，虽然我们的入口文件为 `html` 文件，但是我们通过 EsbuildPlugin 的方式从 html 入口文件中截取到了需要引入的 js 文件。」**

之后，我们拼装了一个 `import "/main.js"` 的 `jsContent` 在 `onLoad` 钩子函数中进行返回，同时声明该资源类型为 `js`。

> ❝
> 
> 简单来说 Esbuild 中内置部分文件类型，我们在 `plugin` 的 `onLoad` 钩子中通过返回的 `loader` 关键字来告诉 Esbuild 接下来使用哪种方式来识别这些文件。
> 
> ❞

此时，Esbuil 会对于返回的 `import "/main.js"` 当作 JavaScript 文件进行递归处理，这样也就达成了我们**「解析 HTML 文件」**的目的。

我们来回过头稍微总结下，之所以 Vite 中可以将 HTML 文件作为入口文件。

其实正是借助了 Esbuild 插件的方式，在启动项目时利用 Esbuild 使用 HTML 作为入口文件之后利用 Plugin 截取 HTML 文件中的 script 脚本地址返回，从而寻找到了项目真正的入口 `js` 资源进行递归分析。

### 递归解析 js/ts 文件

上边的章节，我们在 `ScanPlugin` 中分别编写了 `onResolve` 以及 `onLoad` 钩子来分析入口 html 文件。

其实，`ScanPlugin` 的作用并不仅仅如此。这部分，我们会继续完善 `ScanPlugin` 的功能。

我们已经可以通过 HTML 文件寻找到引入的 `/main.js` 了，那么接下来自然我们需要对 js 文件进行递归分析**「寻找项目中需要被依赖预构建的所有模块。」**

递归寻找需要被预构建的模块的思路同样也是通过 Esbuild 中的 Plugin 机制来实现，简单来说我们会根据上一步转化得到的 `import "/main.js"` 导入来进行递归分析。

对于 `/main.js` 的导入语句会分为以下两种情况分别进行不同的处理：

-   对于 `/main.js` 中的导入的**「源码部分」**会进入该部分进行递归分析，比如 `/main.js` 中如果又引入了另一个源码模块 `./module.js` 那么此时会继续进入 `./module.js` 递归这一过程。
    
-   对于 `/main.js` 中导入的**「第三方模块」**会通过 Esbuild 将该模块标记为 external ，从而记录该模块的入口文件地址以及导入的模块名。
    

比如 `/main.js` 中存在 `import react from 'react'`，此时首先我们会通过 Esbuild 忽略进入该模块的扫描同时我们也会记录代码中依赖的该模块相关信息。

> ❝
> 
> 标记为 external 后，esbuild 会认为该模块是一个外部依赖不需要被打包，所以就不会进入该模块进行任何扫描，换句话到碰到第三方模块时并不会进入该模块进行依赖分析。
> 
> ❞

解析来我们首先来一步一步来晚上上边的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/optimizer/scan.js</span><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;分析项目中的&nbsp;Import<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;config<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>scanImports</span>(<span>config</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;保存依赖</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;depImports&nbsp;=&nbsp;{};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建&nbsp;Esbuild&nbsp;扫描插件</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;scanPlugin&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;esbuildScanPlugin(config,&nbsp;depImports);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;借助&nbsp;EsBuild&nbsp;进行依赖预构建</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;build({<br>&nbsp;&nbsp;&nbsp;&nbsp;absWorkingDir:&nbsp;config.root,<br>&nbsp;&nbsp;&nbsp;&nbsp;entryPoints:&nbsp;config.entryPoints,<br>&nbsp;&nbsp;&nbsp;&nbsp;bundle:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span data-darkreader-inline-color="">'esm'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;write:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[scanPlugin]<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;depImports;<br>}<br></code>
```

首先，我们先为 `scanImports` 方法增加一个 depImports 的返回值。

之后，我们继续来完善 `esbuildScanPlugin` 方法：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;fs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'fs-extra'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createPluginContainer&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./pluginContainer.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;resolvePlugin&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../plugins/resolve.js'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;htmlTypesRe&nbsp;=&nbsp;<span data-darkreader-inline-color="">/(\.html)$/</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;scriptModuleRe&nbsp;=&nbsp;<span data-darkreader-inline-color="">/&lt;script\s+type="module"\s+src\="(.+?)"&gt;/</span>;<br><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>esbuildScanPlugin</span>(<span>config,&nbsp;desImports</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;1.&nbsp;Vite&nbsp;插件容器系统</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;container&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;createPluginContainer({<br>&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[resolvePlugin({&nbsp;root:&nbsp;config.root&nbsp;})],<br>&nbsp;&nbsp;&nbsp;&nbsp;root:&nbsp;config.root<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;resolveId&nbsp;=&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;(path,&nbsp;importer)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;container.resolveId(path,&nbsp;importer);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'ScanPlugin'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;setup(build)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;引入时处理&nbsp;HTML&nbsp;入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build.onResolve({&nbsp;filter:&nbsp;htmlTypesRe&nbsp;},&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;({&nbsp;path,&nbsp;importer&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将传入的路径转化为绝对路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;resolved&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;resolveId(path,&nbsp;importer);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(resolved)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path:&nbsp;resolved?.id&nbsp;||&nbsp;resolved,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">namespace</span>:&nbsp;<span data-darkreader-inline-color="">'html'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2.&nbsp;额外增加一个&nbsp;onResolve&nbsp;方法来处理其他模块(非html，比如&nbsp;js&nbsp;引入)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build.onResolve({&nbsp;filter:&nbsp;<span data-darkreader-inline-color="">/.*/</span>&nbsp;},&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;({&nbsp;path,&nbsp;importer&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;resolved&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;resolveId(path,&nbsp;importer);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(resolved)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;id&nbsp;=&nbsp;resolved.id&nbsp;||&nbsp;resolved;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(id.includes(<span data-darkreader-inline-color="">'node_modules'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;desImports[path]&nbsp;=&nbsp;id;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path:&nbsp;id,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;external:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path:&nbsp;id<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当加载命名空间为&nbsp;html&nbsp;的文件时</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build.onLoad(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;filter:&nbsp;htmlTypesRe,&nbsp;<span data-darkreader-inline-color="">namespace</span>:&nbsp;<span data-darkreader-inline-color="">'html'</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;({&nbsp;path&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将&nbsp;HTML&nbsp;文件转化为&nbsp;js&nbsp;入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;htmlContent&nbsp;=&nbsp;fs.readFileSync(path,&nbsp;<span data-darkreader-inline-color="">'utf-8'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[,&nbsp;src]&nbsp;=&nbsp;htmlContent.match(scriptModuleRe);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jsContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">`import&nbsp;<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">JSON</span>.stringify(src)}</span>`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents:&nbsp;jsContent,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loader:&nbsp;<span data-darkreader-inline-color="">'js'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;esbuildScanPlugin&nbsp;};<br></code>
```

esbuildScanPlugin 方法新增了 `createPluginContainer` 和 `resolvePlugin` 两个方法的引入：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/optimizer/pluginContainer.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;normalizePath&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../utils.js'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;创建&nbsp;Vite&nbsp;插件容器<br>&nbsp;* Vite 中正是自己实现了一套所谓的插件系统，可以完美的在 Vite 中使用 RollupPlugin。<br>&nbsp;*&nbsp;简单来说，插件容器更多像是实现了一个所谓的&nbsp;Adaptor，这也就是为什么&nbsp;VitePlugin&nbsp;和&nbsp;RollupPlugin&nbsp;可以互相兼容的原因<br>&nbsp;*&nbsp;@param&nbsp;plugin&nbsp;插件数组<br>&nbsp;*&nbsp;@param&nbsp;root&nbsp;项目根目录<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>createPluginContainer</span>(<span>{&nbsp;plugins&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;container&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;ResolveId&nbsp;插件容器方法<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;path<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;importer<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;@returns<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;resolveId(path,&nbsp;importer)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;resolved&nbsp;=&nbsp;path;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;plugin&nbsp;of&nbsp;plugins)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(plugin.resolveId)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;plugin.resolveId(resolved,&nbsp;importer);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(result)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolved&nbsp;=&nbsp;result.id&nbsp;||&nbsp;result;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;normalizePath(resolved)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;container;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createPluginContainer&nbsp;};<br><br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/plugins/resolve.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;os&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'os'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;path&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;resolve&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'resolve'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;fs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'fs'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;windowsDrivePathPrefixRE&nbsp;=&nbsp;<span data-darkreader-inline-color="">/^[A-Za-z]:[/\\]/</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;isWindows&nbsp;=&nbsp;os.platform()&nbsp;===&nbsp;<span data-darkreader-inline-color="">'win32'</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;裸包导入的正则</span><br><span data-darkreader-inline-color="">const</span>&nbsp;bareImportRE&nbsp;=&nbsp;<span data-darkreader-inline-color="">/^(?![a-zA-Z]:)[\w@](?!.*:\/\/)/</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;这个函数的作用就是寻找模块的入口文件<br>&nbsp;*&nbsp;这块我们简单写，源码中多了&nbsp;exports、imports、main、module、yarn&nbsp;pnp&nbsp;等等之类的判断<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;id<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;importer<br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>tryNodeResolve</span>(<span>id,&nbsp;importer,&nbsp;root</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;pkgDir&nbsp;=&nbsp;resolve.sync(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${id}</span>/package.json`</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;basedir:&nbsp;root<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;pkg&nbsp;=&nbsp;<span data-darkreader-inline-color="">JSON</span>.parse(fs.readFileSync(pkgDir,&nbsp;<span data-darkreader-inline-color="">'utf-8'</span>));<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entryPoint&nbsp;=&nbsp;pkg.<span data-darkreader-inline-color="">module</span>&nbsp;??&nbsp;pkg.main;<br>&nbsp;&nbsp;const&nbsp;entryPointsPath&nbsp;=&nbsp;path.join(path.dirname(pkgDir),&nbsp;entryPoint);<br>&nbsp;&nbsp;return&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;entryPointsPath<br>&nbsp;&nbsp;};<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>withTrailingSlash</span>(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(path[path.length&nbsp;-&nbsp;<span data-darkreader-inline-color="">1</span>]&nbsp;!==&nbsp;<span data-darkreader-inline-color="">'/'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${path}</span>/`</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;path;<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;path.isAbsolute&nbsp;also&nbsp;returns&nbsp;true&nbsp;for&nbsp;drive&nbsp;relative&nbsp;paths&nbsp;on&nbsp;windows&nbsp;(e.g.&nbsp;/something)<br>&nbsp;*&nbsp;this&nbsp;function&nbsp;returns&nbsp;false&nbsp;for&nbsp;them&nbsp;but&nbsp;true&nbsp;for&nbsp;absolute&nbsp;paths&nbsp;(e.g.&nbsp;C:/something)<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isNonDriveRelativeAbsolutePath&nbsp;=&nbsp;<span>(<span>p</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!isWindows)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;p[<span data-darkreader-inline-color="">0</span>]&nbsp;===&nbsp;<span data-darkreader-inline-color="">'/'</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;windowsDrivePathPrefixRE.test(p);<br>};<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;寻找模块所在绝对路径的插件<br>&nbsp;*&nbsp;既是一个&nbsp;vite&nbsp;插件，也是一个&nbsp;Rollup&nbsp;插件<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;param0<br>&nbsp;*&nbsp;@returns<br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>resolvePlugin</span>(<span>{&nbsp;root&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;相对路径</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;window&nbsp;下的&nbsp;/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;绝对路径</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'vite:resolvePlugin'</span>,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;resolveId(id,&nbsp;importer)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果是&nbsp;/&nbsp;开头的绝对路径，同时前缀并不是在该项目（root）&nbsp;中，那么&nbsp;vite&nbsp;会将该路径当作绝对的&nbsp;url&nbsp;来处理（拼接项目所在前缀）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;/foo&nbsp;-&gt;&nbsp;/fs-root/foo</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(id[<span data-darkreader-inline-color="">0</span>]&nbsp;===&nbsp;<span data-darkreader-inline-color="">'/'</span>&nbsp;&amp;&amp;&nbsp;!id.startsWith(withTrailingSlash(root)))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fsPath&nbsp;=&nbsp;path.resolve(root,&nbsp;id.slice(<span data-darkreader-inline-color="">1</span>));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;fsPath;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;相对路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(id.startsWith(<span data-darkreader-inline-color="">'.'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;basedir&nbsp;=&nbsp;importer&nbsp;?&nbsp;path.dirname(importer)&nbsp;:&nbsp;process.cwd();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fsPath&nbsp;=&nbsp;path.resolve(basedir,&nbsp;id);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;fsPath<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;drive&nbsp;relative&nbsp;fs&nbsp;paths&nbsp;(only&nbsp;windows)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isWindows&nbsp;&amp;&amp;&nbsp;id.startsWith(<span data-darkreader-inline-color="">'/'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;同样为相对路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;basedir&nbsp;=&nbsp;importer&nbsp;?&nbsp;path.dirname(importer)&nbsp;:&nbsp;process.cwd();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fsPath&nbsp;=&nbsp;path.resolve(basedir,&nbsp;id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;fsPath<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;绝对路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isNonDriveRelativeAbsolutePath(id))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;bare&nbsp;package&nbsp;imports,&nbsp;perform&nbsp;node&nbsp;resolve</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(bareImportRE.test(id))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;寻找包所在的路径地址</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res&nbsp;=&nbsp;tryNodeResolve(id,&nbsp;importer,&nbsp;root);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;resolvePlugin;<br></code>
```

这里我们来一步一步分析上述增加的代码逻辑。

首先，我们为 `esbuildScanPlugin` 额外增加了一个 `build.onResolve` 来匹配任意路径文件。

**「对于入口的 html 文件，他会匹配我们最开始 filter 为 `htmlTypesRe` 的 onResolve 勾子来处理。而对于上一步我们从 html 文件中处理完成后的入口 js 文件(`/main.js`)，以及 `/main.js` 中的其他引入，比如 `./module.js` 文件并不会匹配 `htmlTypesRe` 的 onResolve 钩子则会继续走到我们新增的 `/.*/` 的 onResolve 钩子匹配中。」**

细心的朋友们会留意到上边代码中，我们把之前 `onResolve` 钩子中的 `path.resolve` 方法变成了 `resolveId(path, importer)` 方法。

所谓的 resolveId 则是通过在 `esbuildScanPlugin` 中首先创建了一个 `pluginContainer` 容器，之后声明的 `resolveId` 方法正是调用了我们创建的 `pluginContainer` 容器的 `resolveId` 方法。(`src/optimizer/pluginContainer.js`)。

我们要理解 pluginContainer 的概念，首先要清楚在 Vite 中实际上在开发环境会使用 Esbuild 进行预构建在生产环境上使用 Rollup 进行打包构建。

通常，我们会在 vite 中使用一些 vite 自身的插件也可以直接使用 rollup 插件，这正是 pluginContainer 的作用。

Vite 中会在进行文件转译时通过创建一个所谓的 pluginContainer 从而在 pluginContainer 中使用一个类似于 Adaptor 的概念。

它会在开发/生产环境下对于文件的导入调用 pluginContainer.resolveId 方法，而 pluginContainer.resolveId 方法则会依次调用配置的 vite 插件/Rollup 插件的 ResolveId 方法。

> ❝
> 
> 其实你会发现 VitePlugin 和 RollupPlugin 的结构是十分相似的，唯一不同的是 VitePlugin 会比 RollupPlugin 多了一些额外的生命周期（钩子）以及相关 context 属性。
> 
> ❞

当然，开发环境下对于文件的转译（比如 `tsx`、`vue` 等文件的转译）正是通过 pluginContainer 来完成的，这篇文章重点在于预构建的过程所以我们先不对于其他方面进行拓展。

**「上述 `esbuildScanPlugin` 会返回一个 Esbuild 插件，然后我们在 Esbuild 插件的 `build.onResolve` 钩子中实际调用的是 `pluginContainer.resolveId` 来处理。」**

**「其实这就是相当于我们在 Esbuild 的预构建过程中调用了 VitePlugin。」**

同时，我们在调用 `createPluginContainer` 方法时传入了一个默认的 `resolvePlugin`，所谓的 resolvePlugin 注意是一个 **「Vite 插件」**。

resolvePlugin(`src/plugins/resolve.js`) 的作用就是通过传入的 `path` 以及 `importer` 获取去引入模块在磁盘上的绝对路径。

> ❝
> 
> 源码中 `resolvePlugin` 边界处理较多，比如虚拟导入语句的处理，yarn pnp、symbolic link 等一系列边界场景处理，这里我稍微做了简化，我们清楚该插件是一个内置插件用来寻找模块绝对路径的即可。
> 
> ❞

自然，在当调用 `custom-vite` 命令后：

-   首先会创建 `pluginContainer` ，这个容器是 vite 内置实现的插件系统。
    
-   之后，Esbuild 会对于入口 html 文件进行处理调用 scanPlugin 的第一个 onResolve 钩子。
    
-   在第一个 onResolve 钩子由于 html 会匹配 `htmlTypesRe` 的正则所以进入该钩子。该 onResolve 方法会调用 Vite 插件容器(`pluginContainer`)的 `resolvedId` 方法，**「通过 Esbuild 插件的 onResolve 来调用 Vite 插件的 ResolveId 方法」**，从而获得 html 入口文件的绝对路径。
    
-   之后在 Esbuild 的 onLoad 方法中截取该 html 中的 `script` 标签上的 `src` 作为模块返回值(js 类型)交给 Esbuild 继续处理(`import "/main.js"`)。
    
-   在之后，Esbuild 会处理 `"/main.js"` 的引入，由于第一个 onResolve 已经不匹配所以会进入第二个 onResolve 钩子，此时会进行相同的步骤调用 VitePlugin 获得该模块在磁盘上的绝对路径。
    

我们会判断返回的路径是否包含 `node_modules`，如果包含则认为它是一个第三方模块依赖。

**「此时，我们会通过 esBuild 将该模块标记为 `external: true` 忽略进行该模块内部进行分析，同时在 `desImports` 中记录该模块的导入名以及绝对路径。」**

如果为一个非第三方模块，比如 `/main.js` 中引入的 `./module.js`，那么此时我们会通过 onResolve 返回该模块在磁盘上的绝对路径。

Esbuild 会继续进入插件的 onLoad 进行匹配，由于 onLoad 的 filter 以及 namesapce 均为 htmlTypesRe 所以并不匹配，默认 Esbuild 会在文件系统中寻找该文件地址根据文件后缀名称进行递归分析。

这样，最终就达到了我们想要的结果。当我们在 `vite-use`(测试项目中) 调用 `custom-vite` 命令，会发现控制台中会打印：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

> ❝
> 
> 此时 `depImports` 中已经记录了我们在源码中引入的第三方依赖。
> 
> ❞

### 生成预构建产物

上边的步骤我们借助 Esbuild 以及 scanPlugin 已经可以在启动 Vite 服务之前完成依赖扫描获得源码中的所有第三方依赖模块。

接下来我们需要做的，正是对于刚刚获取到的 deps 对象中的第三方模块进行构建输出经过预构建后的文件以及一份资产清单 `_metadata.json` 文件。

首先，我们先对于 `src/config.js` 配置文件进行简单的修改：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;normalizePath&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./utils.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;path&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;resolve&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'resolve'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;寻找所在项目目录（实际源码中该函数是寻找传入目录所在最近的包相关信息）<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;basedir<br>&nbsp;*&nbsp;@returns<br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>findNearestPackageData</span>(<span>basedir</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;原始启动目录</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;originalBasedir&nbsp;=&nbsp;basedir;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;pckDir&nbsp;=&nbsp;path.dirname(resolve.sync(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${originalBasedir}</span>/package.json`</span>));<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;path.resolve(pckDir,&nbsp;<span data-darkreader-inline-color="">'node_modules'</span>,&nbsp;<span data-darkreader-inline-color="">'.custom-vite'</span>);<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;加载&nbsp;vite&nbsp;配置文件<br>&nbsp;*&nbsp;（模拟）<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>resolveConfig</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;root:&nbsp;normalizePath(process.cwd()),<br>&nbsp;&nbsp;&nbsp;&nbsp;cacheDir:&nbsp;findNearestPackageData(normalizePath(process.cwd())),&nbsp;<span data-darkreader-inline-color="">//&nbsp;增加一个&nbsp;cacheDir&nbsp;目录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;entryPoints:&nbsp;[path.resolve(<span data-darkreader-inline-color="">'index.html'</span>)]<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;config;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;resolveConfig;<br></code>
```

我们对于 config.js 中的 config 配置进行了修改，简单增加了一个 `cacheDir` 的配置目录。

这个目录是用于当生成预构建文件后的存储目录，这里我们固定写死为当前项目所在的 node\_modules 下的 `.custom-vite` 目录。

之后，我们在回到 `src/optimizer/index.js` 中稍做修改：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/optimizer/index.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;path&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;fs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'fs-extra'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;scanImports&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./scan.js'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;build&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'esbuild'</span>;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;分析项目中的第三方依赖<br>&nbsp;*&nbsp;@param&nbsp;{*}&nbsp;config<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span>createOptimizeDepsRun</span>(<span>config</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;deps&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;scanImports(config);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建缓存目录</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;cacheDir&nbsp;}&nbsp;=&nbsp;config;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;depsCacheDir&nbsp;=&nbsp;path.resolve(cacheDir,&nbsp;<span data-darkreader-inline-color="">'deps'</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建缓存对象&nbsp;（_metaData.json）</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;metadata&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;optimized:&nbsp;{}<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;deps)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取需要被依赖预构建的目录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entry&nbsp;=&nbsp;deps[dep];<br>&nbsp;&nbsp;&nbsp;&nbsp;metadata.optimized[dep]&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src:&nbsp;entry,&nbsp;<span data-darkreader-inline-color="">//&nbsp;依赖模块入口文件（相对路径）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;path.resolve(depsCacheDir,&nbsp;dep&nbsp;+&nbsp;<span data-darkreader-inline-color="">'.js'</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;预编译后的文件（绝对路径）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将缓存文件写入文件系统中</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;fs.ensureDir(depsCacheDir);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;fs.writeFile(<br>&nbsp;&nbsp;&nbsp;&nbsp;path.resolve(depsCacheDir,&nbsp;<span data-darkreader-inline-color="">'_metadata.json'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">JSON</span>.stringify(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>(<span>key,&nbsp;value</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(key&nbsp;===&nbsp;<span data-darkreader-inline-color="">'file'</span>&nbsp;||&nbsp;key&nbsp;===&nbsp;<span data-darkreader-inline-color="">'src'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注意写入的是相对路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;path.relative(depsCacheDir,&nbsp;value);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">2</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;依赖预构建</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;build({<br>&nbsp;&nbsp;&nbsp;&nbsp;absWorkingDir:&nbsp;process.cwd(),<br>&nbsp;&nbsp;&nbsp;&nbsp;define:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'process.env.NODE_ENV'</span>:&nbsp;<span data-darkreader-inline-color="">'"development"'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;entryPoints:&nbsp;<span data-darkreader-inline-color="">Object</span>.keys(deps),<br>&nbsp;&nbsp;&nbsp;&nbsp;bundle:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span data-darkreader-inline-color="">'esm'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;splitting:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;write:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;outdir:&nbsp;depsCacheDir<br>&nbsp;&nbsp;});<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;createOptimizeDepsRun&nbsp;};<br></code>
```

在 `src/optimizer/index.js` 中，之前我们已经通过 scanImports 方法拿到了 deps 对象：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;react:&nbsp;'/Users/ccsa/Desktop/custom-vite-use/node_modules/react/index.js'<br>}&nbsp;<br></code>
```

然后，我们冲 config 对象中拿到了 depsCacheDir 拼接上 `deps` 目录，得到的是存储预构建资源的目录。

同时创建了一个名为 metadata 的对象，遍历生成的 deps 为 metadata.optimize 依次赋值，经过 for of 循环后所有需要经过依赖预构建的资源全部存储在 `metadata.optimize` 对象中，这个对象的结构如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;optimized:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;react:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src:&nbsp;<span data-darkreader-inline-color="">"/Users/ccsa/Desktop/custom-vite-use/node_modules/react/index.js"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;<span data-darkreader-inline-color="">"/Users/ccsa/Desktop/custom-vite-use/node_modules/.custom-vite/deps/react.js"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>}<br></code>
```

> ❝
> 
> 需要注意的是，我们在内存中存储的 `optimize` 全部为绝对路径，而写入硬盘时的路径全部为相对路径。
> 
> ❞

之后同样我们使用 Esbuild 再次对应项目中的所有第三方依赖进行构建打包。不过不同的是这一步我们标记 `write:true` 是需要将构建后的文件写入硬盘中的。

完成上述过程后，我们再次在使用到的项目中 `custom-vite-use` 中运行 `custom-vite` 命令：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

此时，我们已经实现了一个简易版本的 Vite 预构建过程。

之后，启动开发服务器后 Vite 实际会在开发服务器中对于第三方模块的请求进行拦截从而返回预构建后的资源。

至于 Vite 是如何拦截第三方资源以及在是如何在 ESM 源生模块下是如何处理 `.vue/.ts/.tsx` 等等之类的模块转译我会在后续的 Vite 文章中和大家继续进行揭密。

> ❝
> 
> 文章中的代码你可以在这里（https://github.com/19Qingfeng/custom-vite/tree/feat/prepare-scan）找到。
> 
> ❞

## Vite 源码

上边的章节中我们已经自己实现了一个简易的 Vite 预构建过程，接下来我会用上述预构建的过程和源码进行一一对照。

### Cli 命令文件

Vite 源码结构为 `monorepo` 结构，这里我们仅仅关心 vite 目录即可。

首先，Vite 目录下的 /pakcages/vite/bin/vite.js 文件是作为项目 cli 入口文件。

实际当运行 vite 命令时会执行该文件，执行该文件会经过以下调用链：

1.  执行 `/vite/src/node/cli.ts` 文件处理一系列命令行参数。
    
2.  处理完毕后再次调用 `/vite/src/node/server/index.ts` 创建开发服务器。
    

### createServer 方法

当运行一次 Vite 命令后会执行到 `/vite/src/node/server/index.ts` 中的 `createServer` 方法。

实际 createServer 就和我我们上述的 createServer 代表的含义是一致的，都是在开发环境下启动开发服务器。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

> ❝
> 
> 实际上大多数流程和我们上述的代码思路是一致的，比如`resolveConfig` 以及 `serveStaticMiddleware` 之类。
> 
> ❞

### 依赖预构建

在 createServer 方法的下半部分中，我们可以看到：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

1.  container.buildStart
    

所谓 container.buildStart 正是我们之前提到过的 vite 内部有一套自己的插件容器。vite 正是通过这一套插件容器来处理开发模式和生产模式的区别。

container 插件容器会实现一套和 Rollup 一模一样的插件 API，所以 Rollup Plugin 同样也可以通过 container Api 在开发模式下调用。

自然，生产模式下本身就使用 Rollup 进行构建，所以可以实现生产百分百的插件兼容。

2.  initDepsOptimizer
    

initDepsOptimizer 正是在启动开发服务器之前进行依赖预构建的核心方法。

### initDepsOptimizer

initDepsOptimizer 会调用 createDepsOptimizer 方法。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)createDepsOptimizer 方法在开发模式下(!isBuild):

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

discoverProjectDependencies 正如名字那样，这个方法是发现项目中的第三方依赖（依赖扫描）。

discoverProjectDependencies 内部会调用 scanImports（https://github.com/vitejs/vite/blob/main/packages/vite/src/node/optimizer/scan.ts） 方法：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

编辑器左边部分为 scanImports 方法，他会返回 prepareEsbuildScanner 方法的返回值。

而 prepareEsbuildScanner 正是和我们上述思路一致的依赖扫描：借助 Esbuild 以及 esbuildScanPlugin 扫描项目中的第三方依赖。

最终 createDepsOptimizer 方法中会用 `deps` 保存 discoverProjectDependencies 方法的项目中扫描到的所有第三方依赖。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

> ❝
> 
> 这里有两点需要注意。
> 
> ❞

1.  首先 discoverProjectDependencies 寻找到的 react 实际地址是一个 `"/Users/ccsa/Desktop/custom-vite-use/node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"` 的值，这是由于安装依赖时我使用的是 pnpm ，而Vite 中对于 Symbolic link 有处理，而我们上边的代码比较简易并没有处理 Symbolic link。
    
2.  下图中可以看到 prepareEsbuildScanner 方法又创建了一个 pluginContainer。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

Vite 中的 pluginContianer 并不是一个单例，Vite 中会多次调用 createPluginContainer 创建多个插件容器。

在 prepareEsbuildScanner 在与预构建过程同样会创建一个插件容器，这正是我们上述简易版 Vite 中创建的插件容器。

> ❝
> 
> 这里大家只要明白 pluginContainer 在 vite 中不是一个单例即可，后续在编译文件的文章中我们会着重来学习 pluginContainer 的概念。
> 
> ❞

### runOptimizeDeps

上述的步骤 Vite 已经可以通过 discoverProjectDependencies 拿到项目中的需要进行预构建的文件。

之后，createDepsOptimizer 方法中会使用 `prepareKnownDeps` 方法处理拿到的依赖（增加 hash 等）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

然后将 prepareKnownDeps 返回的 knownDeps 交给 runoptimizeDeps 进行处理:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

runOptimizeDeps 方法内部会调用 prepareEsbuildOptimizerRun（https://github.com/vitejs/vite/blob/main/packages/vite/src/node/optimizer/index.ts）。

prepareEsbuildOptimizerRun 方法正是使用 EsBuild 对于前一步扫描生成的依赖进行预构建的方法：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

当 context 准备完毕后，prepareEsbuildOptimizerRun 会调用 `rebuild` 方法进行打包（生成预构建产物）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

当 rebuild 运行完毕后，我们会发现 node\_modules 下的预构建文件也会生成了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

Vite 源码中关于边界处理的 case 特别说，实话说笔者也并没有逐行阅读。

这里的源码部分更多是想起到一个抛砖引玉的作用，希望大家可以在了解预构建的基础思路后可以跟随源码自己手动 debugger 调试一下。

## 结尾

Vite 中依赖预构建截止这里已经给大家分享完毕了，希望文章中的内容可以帮助到大家。

之后我仍会在专栏中分享关于 Vite 中其他进阶内容，比如 Vite 开发环境下的文件转译、热重载以及如何在生产环境下的调用过程。

-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2024 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！