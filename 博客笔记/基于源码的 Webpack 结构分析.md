## 分享背景

即使目前优秀的构建工具层出不穷，Webpack 还是保持着其在现代前端开发工具链中不可替代的地位。这主要得益于其优秀的灵活性以及强大的生态系统。

然而，随着版本更替，Webpack 的功能越来越庞大，整体的代码量日渐夸张，大大提高了学习难度。与此同时，大多数人对 Webpack 的使用都停留在配置层面，这容易陷入几个问题：

-   想实现某个功能，但是不清楚原理，只能花大量时间调研方案。
    
-   简历上写了用 Webpack 实现了 xx 功能，结果面试官连续追问直至原理🫠。
    

因此，深入学习 Webpack 底层原理以及架构设计是非常必要的，考虑到 Webpack 体系庞大，这边依据结构将其分为三个部分：

1.  JS 打包的核心流程
    
2.  Plugin 的作用与原理
    
3.  Loader 的作用与原理
    

> Attention：
> 
> -   这篇分享着重在给读者梳理一个对 Webpack 完整的认知体系，并不会具体涉及到代码分割、按需加载、HMR、sourcemap、Tree-shaking 这一系列的功能实现，如果感兴趣，可以在浏览器单点搜索，学习相关的实现，后续我也会抽时间对这些重要功能逐一研究，整理一些文章出来。
>     
> -   文中涉及大量源码，防止篇幅过长，已经做过压缩处理，同时加上了注释，方便阅读。
>     
> -   本文会聚焦于 **「JS 打包的核心流程」**进行介绍，Plugin、Loader 会简单带过。
>     

## **「基本概念」**

![Image](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73zicCnBbmDVHDRibuWX28yDuhBDSyDxECV7G7aerd7nMWV1tMkCMtAQDK1clLwvj5U0y6lazp67aLbtQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 摘自 webpack：
> 
> Webpack is a module bundler. Its main purpose is to bundle JavaScript files for >usage in a browser, yet it is also capable of transforming, bundling, or >packaging just about any resource or asset.

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)，它通过分析目标项目结构，找到 JavaScript 模块以及其项目中一些不能直接在浏览器运行的扩展语言(如 SCSS，TypeScript 等)，并将其转换和打包为合适的格式供浏览器使用。

在了解 Webpack 原理前，我们需要先了解几个核心名词的概念：

-   入口（Entry）：**「构建的起点」**。Webpack 从这里开始执行构建。通过 Entry 配置能够确定哪个文件作为构建过程的开始，进而识别出应用程序的**「依赖图谱」**。
    
-   模块（Module）：**「构成应用的单元」**。在 Webpack 的视角中，一切文件皆可视为模块，包括 JavaScript、CSS、图片或者是其他类型的文件。Webpack 从 Entry 出发，**「递归」**地构建出一个包含所有依赖文件的模块网络。
    
-   代码块（Chunk）：**「代码的集合体」**。Chunk 由模块合并而成，被用来优化输出文件的结构。Chunk 使得 Webpack 能够更灵活地组织和分割代码，支持代码的懒加载、拆分等高级功能。
    
-   加载器（Loader）：**「模块的转换器」**。Loader 让 Webpack 有能力去处理那些非 JavaScript 文件（Webpack 本身只理解 JavaScript）。通过 Loader，各种资源文件可以被转换为 Webpack 能够处理的模块，如将 CSS 转换为 JS 模块，或者将高版本的 JavaScript 转换为兼容性更好的形式（降级）。
    
-   插件（Plugin）：**「构建流程的参与者」**。Webpack 的构建流程中存在众多的事件钩子（hooks），Plugin 可以监听这些事件的触发，在触发时加入自定义的构建行为，如自动压缩打包后的文件、生成应用所需的 HTML 文件等。
    

我们可以根据一个结构图来理解 Webpack 的全流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## JS 打包的核心流程

在这一部分，我们会淡化 Plugin、Loader 在构建过程中的影响，大家可以把 Webpack（https://github.com/webpack/webpack）源码拉到本地，方便学习。

## **「编译的开始」**

### 核心实现

Webpack 的执行入口在 ./lib/webpack.js，我们先来看一下核心函数的实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;webpack&nbsp;=&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;接收&nbsp;webpack&nbsp;配置和可选的回调函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>(<span>options,&nbsp;callback</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据配置创建编译器的简化版函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;create&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;compiler&nbsp;<span data-darkreader-inline-color="">//&nbsp;定义编译器实例</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;watch&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;是否开启观察模式的标志</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;watchOptions&nbsp;<span data-darkreader-inline-color="">//&nbsp;观察模式的配置</span><br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果配置是数组，处理为多重编译配置</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;……</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;compiler,&nbsp;watch,&nbsp;watchOptions&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;核心创建和运行逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;compiler,&nbsp;watch,&nbsp;watchOptions&nbsp;}&nbsp;=&nbsp;create();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(watch)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果开启观察模式，调用&nbsp;compiler.watch</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compiler.watch(watchOptions,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果有回调函数，但没有开启观察模式，调用&nbsp;compiler.run</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compiler.run(callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;compiler&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回创建的编译器实例</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;);<br></code>
```

其中，`compiler.run(callback)` 的执行正式开启了 Webpack 的编译过程。

### compiler 和 compilation

在 Webpack 中，存在两个非常重要的核心对象：`compiler`、`compilation`，它们的作用如下：

-   Compiler：Webpack 的核心，贯穿于整个构建周期。`Compiler` 封装了 Webpack 环境的全局配置，包括但不限于**「配置信息、输出路径」**等。
    
-   Compilation：表示单次的构建过程及其产出。与 `Compiler` 不同，`Compilation` 对象在每次构建中都是新创建的，描述了构建的具体过程，包括模块资源、编译后的产出资源、文件的变化，以及依赖关系的状态。在watch mode 下，每当文件变化触发重新构建时，都会生成一个新的 `Compilation` 实例。
    

`Compiler` 是一个长期存在的环境描述，贯穿整个 Webpack 运行周期；而 `Compilation` 是对单次构建的具体描述，每一次构建过程都可能有所不同。接下来我们主要会对 `Compiler` 进行深入的研究。

### compiler 的创建过程

可以看到 `compiler` 是通过同一文件中的 `createCompiler` 创建的，我们先来看看相关的实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;createCompiler&nbsp;=&nbsp;<span><span>rawOptions</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;标准化&nbsp;webpack&nbsp;配置，确保配置格式正确</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;options&nbsp;=&nbsp;getNormalizedWebpackOptions(rawOptions);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;应用基本的&nbsp;webpack&nbsp;配置默认值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;applyWebpackOptionsBaseDefaults(options);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建一个新的&nbsp;Compiler&nbsp;实例</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;compiler&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Compiler(options.context,&nbsp;options);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;应用&nbsp;Node&nbsp;环境相关的插件，设置基础设施日志</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;NodeEnvironmentPlugin({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>infrastructureLogging</span>:&nbsp;options.infrastructureLogging<br>&nbsp;&nbsp;&nbsp;&nbsp;}).apply(compiler);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注册自定义插件（并不会立马执行，而是订阅相关&nbsp;hooks&nbsp;的触发）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">Array</span>.isArray(options.plugins))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;plugin&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;options.plugins)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">typeof</span>&nbsp;plugin&nbsp;===&nbsp;<span data-darkreader-inline-color="">"function"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果插件是一个函数，直接调用并传入&nbsp;compiler</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugin.call(compiler,&nbsp;compiler);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(plugin)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果插件是一个具有&nbsp;apply&nbsp;方法的对象，调用其&nbsp;apply&nbsp;方法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugin.apply(compiler);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;应用剩余的&nbsp;webpack&nbsp;配置默认值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;applyWebpackOptionsDefaults(options);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;触发环境设置相关的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;compiler.hooks.environment.call();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;触发环境设置完成后的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;compiler.hooks.afterEnvironment.call();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;负责最终的配置合成与应用，注册所有内置插件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;WebpackOptionsApply().process(options,&nbsp;compiler);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;触发编译器初始化完成的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;compiler.hooks.initialize.call();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;compiler;<br>};<br></code>
```

从中我们可以得到这些信息：

-   函数调用并返回了 `compiler`，`compiler.run(callback)` 的逻辑会在后面研究；
    
-   函数遍历了 plugins 数组，将用户配置的 plugin 进行注册，等待后续触发，这里涉及到 Tapable 相关的知识，我会在后面进行相关介绍。
    
-   函数执行 `compiler.hooks` 来触发相关生命周期，这个行为会使相关的 plugin 进入执行状态。
    

### WebpackOptionsApply().process 初始化

同时我们可以看看 `new WebpackOptionsApply().process(options, compiler);` 具体做了些什么。

打开 ./lib/WebpackOptionsApply.js，可以看到 WebpackOptionsApply 类中，只有一个 process 方法，代码体积非常庞大，做的主要工作就是：注册内置插件、依据 options 做初始化工作（大部分也是注册内置插件）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，在执行 `compiler.run()` 之前，做了十分充足的准备工作，然后才是真正执行编译的过程，接下来我们来仔细研究一下 `compiler.run()` 的内容。

## 编译阶段

### Compiler 的执行

打开 ./lib/Compiler.js，我们直接来看看 `compiler.run()` 的具体实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">run(callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;编译完成的回调</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onCompiled&nbsp;=&nbsp;<span>(<span>err,&nbsp;_compilation</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;compilation&nbsp;=&nbsp;_compilation;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;检查是否应该输出结果</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">this</span>.hooks.shouldEmit.call(compilation)&nbsp;===&nbsp;<span data-darkreader-inline-color="">false</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理完成后的逻辑...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.nextTick(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理资源输出</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.emitAssets(compilation,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;其他处理逻辑...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;真正开始编译的逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;run&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用&nbsp;beforeRun&nbsp;和&nbsp;run&nbsp;钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.beforeRun.callAsync(<span data-darkreader-inline-color="">this</span>,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.run.callAsync(<span data-darkreader-inline-color="">this</span>,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;读取记录后开始编译</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.readRecords(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.compile(onCompiled);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;run();<br>&nbsp;&nbsp;}<br></code>
```

可以看到，在整个函数实现中，触发了很多的 hooks，比如：beforeRun、run、afterDone……

其中的核心就是 run 周期中的回调函数：`this.compile(onCompiled);`

### 调用 **「compiler.compile()」**

同样的套路，我们直接来看源码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;启动编译流程</span><br>compile(callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;params&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.newCompilationParams();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;在编译之前调用的钩子</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.beforeCompile.callAsync(params,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;触发编译开始的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.compile.call(params);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建一个新的编译实例</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;compilation&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.newCompilation(params);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.make.callAsync(compilation,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;完成模块构建</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.finishMake.callAsync(compilation,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.nextTick(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;完成编译过程的准备工作</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation.finish(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;封闭编译记录，准备输出文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation.seal(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;编译完成后的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.afterCompile.callAsync(compilation,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回编译成功的回调</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;callback(<span data-darkreader-inline-color="">null</span>,&nbsp;compilation);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>}<br></code>
```

好家伙，回调地狱被 Webpack 玩透了，我们先整理一下钩子的执行顺序：`beforeCompile - compile - make - finishMake - afterCompile`（其实并不完全，比如 seal）

其中核心的就是 complie 和 make 阶段。其中 complie 在函数中首先实现了 `compilation` 实例的创建，这一点我们不需要关心，那么接下来我们着重关注一下 make 阶段，顾名思义，这个阶段实现了整个编译过程。

然而我们在代码中并没有看到回调函数中与编译相关的逻辑，由此可以想到，相关的编译逻辑应该是通过钩子触发而调用的，所以我们要在全局中搜索 `compiler.hooks.make.tapAsync`，通过筛选最后锁定到相关的编译逻辑在 ./lib/EntryPlugin.js 中。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">compiler.hooks.make.tapAsync(<span data-darkreader-inline-color="">"EntryPlugin"</span>,&nbsp;(compilation,&nbsp;callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;compilation.addEntry(context,&nbsp;dep,&nbsp;options,&nbsp;err&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;callback(err);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>});<br></code>
```

那么我们要研究一下这个插件是在哪里被注册的，通过全局搜索，发现它在 EntryOptionPlugin 中被实例化，再搜索 EntryOptionPlugin，发现在 WebpackOptionsApply 中被引入，很显然，这个插件在 `compiler.run()` 之前就被注册好了（一切都成了闭环~）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 添加 Entry

回过头来，我们再来看看 EntryPlugin 中，`compilation.addEntry` 都干了什么。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">addEntry</span>(<span>context,&nbsp;entry,&nbsp;optionsOrName,&nbsp;callback</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;TODO&nbsp;webpack&nbsp;6&nbsp;remove</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;options&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;optionsOrName&nbsp;===&nbsp;<span data-darkreader-inline-color="">"object"</span>&nbsp;?&nbsp;optionsOrName&nbsp;:&nbsp;{&nbsp;<span>name</span>:&nbsp;optionsOrName&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._addEntryItem(context,&nbsp;entry,&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>,&nbsp;options,&nbsp;callback);<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">_addEntryItem</span>(<span>context,&nbsp;entry,&nbsp;target,&nbsp;options,&nbsp;callback</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;name&nbsp;}&nbsp;=&nbsp;options;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;尝试获取或初始化入口数据</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;entryData&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.entries.get(name)&nbsp;||&nbsp;<span data-darkreader-inline-color="">this</span>.globalEntry;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;添加入口依赖</span><br>&nbsp;&nbsp;entryData[target].push(entry);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;检查和合并选项，这里简化为直接使用传入选项</span><br>&nbsp;&nbsp;entryData.options&nbsp;=&nbsp;{&nbsp;...entryData.options,&nbsp;...options&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;触发添加入口的钩子</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.addEntry.call(entry,&nbsp;options);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理入口依赖的模块树，这里简化异步处理逻辑</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.addModuleTree({&nbsp;context,&nbsp;<span>dependency</span>:&nbsp;entry&nbsp;},&nbsp;(err,&nbsp;<span data-darkreader-inline-color="">module</span>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;入口添加成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.succeedEntry.call(entry,&nbsp;options,&nbsp;<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;callback(<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;});<br>}<br></code>
```

可以看到这里的工作就是处理 Entry，Entry 的添加过程中，会调用 `addModuleTree()`，依据代码的依赖关系递归构建模块树（Module Tree）

### 添加 Module

具体涉及到 `addModuleTree()` 及后续进程，其实就是生成 Module 的过程，为了让大家完全了解其中的内容，我们再继续看看其中的实现吧：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">addModuleTree({&nbsp;context,&nbsp;dependency,&nbsp;contextInfo&nbsp;},&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取依赖的构造函数，并尝试从dependencyFactories中获取相应的模块工厂</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;Dep&nbsp;=&nbsp;dependency.constructor;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;moduleFactory&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.dependencyFactories.get(Dep);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用模块工厂创建模块，并处理模块创建后的逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.handleModuleCreation({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>factory</span>:&nbsp;moduleFactory,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>dependencies</span>:&nbsp;[dependency],&nbsp;<span data-darkreader-inline-color="">//&nbsp;传入的依赖作为数组</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>originModule</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;原始模块，这里为null，因为是入口模块</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contextInfo,&nbsp;<span data-darkreader-inline-color="">//&nbsp;传入的上下文信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context&nbsp;<span data-darkreader-inline-color="">//&nbsp;传入的上下文路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;(err,&nbsp;result)&nbsp;=&gt;&nbsp;{});<br>}<br><br>handleModuleCreation({factory,&nbsp;dependencies,&nbsp;originModule,&nbsp;contextInfo,&nbsp;context,&nbsp;recursive&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>},&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;moduleGraph&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.moduleGraph;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;currentProfile&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.profile&nbsp;?&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ModuleProfile()&nbsp;:&nbsp;<span data-darkreader-inline-color="">undefined</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用给定的工厂函数创建模块</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.factorizeModule({currentProfile,&nbsp;factory,&nbsp;dependencies,&nbsp;originModule,&nbsp;contextInfo,&nbsp;context},&nbsp;(err,&nbsp;factoryResult)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newModule&nbsp;=&nbsp;factoryResult.module;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将新模块添加到编译过程中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.addModule(newModule,&nbsp;(err,&nbsp;<span data-darkreader-inline-color="">module</span>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;更新模块图，设置解析后的模块和依赖</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.updateModuleGraph({<span data-darkreader-inline-color="">module</span>,&nbsp;dependencies,&nbsp;originModule,&nbsp;factoryResult});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理模块的构建和依赖关系（这里存在递归）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._handleModuleBuildAndDependencies(originModule,&nbsp;<span data-darkreader-inline-color="">module</span>,&nbsp;recursive,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br></code>
```

紧接着在 addModule 中，添加相关的 Module

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">addModule(<span data-darkreader-inline-color="">module</span>,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.addModuleQueue.add(<span data-darkreader-inline-color="">module</span>,&nbsp;callback);<br>}<br><br><span data-darkreader-inline-color="">this</span>.addModuleQueue&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;AsyncQueue({<br>&nbsp;&nbsp;<span>name</span>:&nbsp;<span data-darkreader-inline-color="">"addModule"</span>,<br>&nbsp;&nbsp;<span>parent</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.processDependenciesQueue,<br>&nbsp;&nbsp;<span>getKey</span>:&nbsp;<span>(<span><span data-darkreader-inline-color="">module</span></span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">module</span>.identifier(),<br>&nbsp;&nbsp;<span>processor</span>:&nbsp;<span data-darkreader-inline-color="">this</span>._addModule.bind(<span data-darkreader-inline-color="">this</span>),<br>});<br><br>_addModule(<span data-darkreader-inline-color="">module</span>,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将模块添加到编译过程中</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._modules.set(identifier,&nbsp;<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.modules.add(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;完成模块添加，执行回调</span><br>&nbsp;&nbsp;callback(<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">module</span>);<br>}<br></code>
```

但是在这里看不到构建的内容，经过查找，发现是在 `addModule` 回调中的`_handleModuleBuildAndDependencies()` 中执行构建：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">_handleModuleBuildAndDependencies(originModule,&nbsp;<span data-darkreader-inline-color="">module</span>,&nbsp;recursive,&nbsp;checkCycle,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;构建模块</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.buildModule(<span data-darkreader-inline-color="">module</span>,&nbsp;err&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;递归处理模块依赖</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.processModuleDependencies(<span data-darkreader-inline-color="">module</span>,&nbsp;err&nbsp;=&gt;&nbsp;callback(err&nbsp;?&nbsp;err&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">module</span>));<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br><br>buildModule(<span data-darkreader-inline-color="">module</span>,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.buildQueue.add(<span data-darkreader-inline-color="">module</span>,&nbsp;callback);<br>}<br><br><span data-darkreader-inline-color="">this</span>.buildQueue&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;AsyncQueue({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span data-darkreader-inline-color="">"build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>parent</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.factorizeQueue,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>processor</span>:&nbsp;<span data-darkreader-inline-color="">this</span>._buildModule.bind(<span data-darkreader-inline-color="">this</span>)<br>});<br><br>_buildModule(<span data-darkreader-inline-color="">module</span>,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用构建模块钩子，并添加到已构建模块集合中</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.buildModule.call(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.builtModules.add(<span data-darkreader-inline-color="">module</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;实际进行模块构建</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">module</span>.build(<span data-darkreader-inline-color="">this</span>.options,&nbsp;<span data-darkreader-inline-color="">this</span>,&nbsp;<span data-darkreader-inline-color="">this</span>.resolverFactory.get(<span data-darkreader-inline-color="">"normal"</span>,&nbsp;<span data-darkreader-inline-color="">module</span>.resolveOptions),&nbsp;<span data-darkreader-inline-color="">this</span>.inputFileSystem,<br>&nbsp;&nbsp;&nbsp;&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将构建后的模块存储到缓存中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._modulesCache.store(<span data-darkreader-inline-color="">module</span>.identifier(),&nbsp;<span data-darkreader-inline-color="">null</span>,&nbsp;<span data-darkreader-inline-color="">module</span>,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用构建成功钩子，并返回成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.succeedModule.call(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;callback();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;);<br>}<br><br><span data-darkreader-inline-color="">// ./lib/Module.js 抽象的build方法，定义了模块构建的接口,子类应该实现这个方法以完成具体的构建逻辑。</span><br>build(options,&nbsp;compilation,&nbsp;resolver,&nbsp;fs,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;AbstractMethodError&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"./AbstractMethodError"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;AbstractMethodError();<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;./lib/NormalModule.js</span><br>build(options,&nbsp;compilation,&nbsp;resolver,&nbsp;fs,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;初始化模块构建状态</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.resetBuildState();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取钩子</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;hooks&nbsp;=&nbsp;NormalModule.getCompilationHooks(compilation);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行构建过程</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>._doBuild(options,&nbsp;compilation,&nbsp;resolver,&nbsp;fs,&nbsp;hooks,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;hooks.beforeParse.call(<span data-darkreader-inline-color="">this</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用解析前的钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;source&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>._source.source();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;解析模块内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.parser.parse(<span data-darkreader-inline-color="">this</span>._ast&nbsp;||&nbsp;source,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>current</span>:&nbsp;<span data-darkreader-inline-color="">this</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>module</span>:&nbsp;<span data-darkreader-inline-color="">this</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>compilation</span>:&nbsp;compilation,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>options</span>:&nbsp;options,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;handleParseResult();<br>&nbsp;&nbsp;});<br>}<br></code>
```

虽然代码很长，但是其中的逻辑十分顺畅，唯一要注意的是 `build()` 存在一个继承的问题。

在 ./lib/NormalModule.js 的 `build()` 中，还可以看到 `_doBuild()`：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">_doBuild(options,&nbsp;compilation,&nbsp;resolver,&nbsp;fs,&nbsp;hooks,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用加载器之前的钩子</span><br>&nbsp;&nbsp;hooks.beforeLoaders.call(<span data-darkreader-inline-color="">this</span>.loaders,&nbsp;<span data-darkreader-inline-color="">this</span>,&nbsp;loaderContext);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;processResult&nbsp;=&nbsp;<span>(<span>err,&nbsp;result</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;解析加载器返回的结果</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;source&nbsp;=&nbsp;result[<span>0</span>];&nbsp;<span data-darkreader-inline-color="">//&nbsp;源代码</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;sourceMap&nbsp;=&nbsp;result.length&nbsp;&gt;=&nbsp;<span>1</span>&nbsp;?&nbsp;result[<span>1</span>]&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;源代码映射</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;extraInfo&nbsp;=&nbsp;result.length&nbsp;&gt;=&nbsp;<span>2</span>&nbsp;?&nbsp;result[<span>2</span>]&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;额外信息</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建模块的源代码对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;……</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;callback();<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行加载器处理流程</span><br>&nbsp;&nbsp;runLoaders(<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>resource</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.resource,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>loaders</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.loaders,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;定义如何处理资源的函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>processResource</span>:&nbsp;<span>(<span>loaderContext,&nbsp;resourcePath,&nbsp;callback</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...资源处理逻辑...</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;(err,&nbsp;result)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理加载器返回的最终结果（设置模块的源码和抽象语法树&nbsp;AST）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processResult(err,&nbsp;result.result);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;);<br>};<br></code>
```

在这个过程中，Webpack 会使用 loader 处理 resource 并转化为 JS，将结果返回后于 `processResult()` 处理。

### Loader 处理

毫无疑问，我们得看看 loader 的处理过程了。

可以看到 `runLoaders` 即为 loader 的处理函数，从 `loader-runner` 包中导入：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;getContext,&nbsp;runLoaders&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"loader-runner"</span>);<br></code>
```

那我们直接来看看 `loader-runner` 中的 loader 处理逻辑吧：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">exports.runLoaders&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">runLoaders</span>(<span>options,&nbsp;callback</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;loaders&nbsp;=&nbsp;options.loaders&nbsp;||&nbsp;[];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;loaderContext&nbsp;=&nbsp;options.context&nbsp;||&nbsp;{};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建&nbsp;loader&nbsp;对象</span><br>&nbsp;&nbsp;loaders&nbsp;=&nbsp;loaders.map(createLoaderObject);<br>&nbsp;&nbsp;loaderContext.loaders&nbsp;=&nbsp;loaders;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;loaderContext&nbsp;各类配置&nbsp;……</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;迭代处理&nbsp;loaders</span><br>&nbsp;&nbsp;iteratePitchingLoaders(processOptions,&nbsp;loaderContext,&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>err,&nbsp;result</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;callback(<span data-darkreader-inline-color="">null</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;……</span><br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>};<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">iteratePitchingLoaders</span>(<span>options,&nbsp;loaderContext,&nbsp;callback</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果已处理完所有&nbsp;loader，开始处理资源</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(loaderContext.loaderIndex&nbsp;&gt;=&nbsp;loaderContext.loaders.length)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;processResource(options,&nbsp;loaderContext,&nbsp;callback);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取当前&nbsp;loader</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;currentLoaderObject&nbsp;=&nbsp;loaderContext.loaders[loaderContext.loaderIndex];<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果当前&nbsp;loader&nbsp;的&nbsp;pitch&nbsp;方法已执行，移至下一个&nbsp;loader</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(currentLoaderObject.pitchExecuted)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;loaderContext.loaderIndex++;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;iteratePitchingLoaders(options,&nbsp;loaderContext,&nbsp;callback);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;加载当前&nbsp;loader&nbsp;模块</span><br>&nbsp;&nbsp;loadLoader(currentLoaderObject,&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>err</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;fn&nbsp;=&nbsp;currentLoaderObject.pitch;<br>&nbsp;&nbsp;&nbsp;&nbsp;currentLoaderObject.pitchExecuted&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果没有定义&nbsp;pitch&nbsp;方法，继续处理下一个&nbsp;loader</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!fn)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;iteratePitchingLoaders(options,&nbsp;loaderContext,&nbsp;callback);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行&nbsp;pitch&nbsp;方法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;runSyncOrAsync(fn,&nbsp;loaderContext,&nbsp;[xxx],&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>err</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;args&nbsp;=&nbsp;<span data-darkreader-inline-color="">Array</span>.prototype.slice.call(<span data-darkreader-inline-color="">arguments</span>,&nbsp;<span>1</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;hasArg&nbsp;=&nbsp;args.some(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value&nbsp;!==&nbsp;<span data-darkreader-inline-color="">undefined</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据&nbsp;pitch&nbsp;方法的返回值决定是继续执行下一个&nbsp;pitch&nbsp;方法，还是转向正常的&nbsp;loader&nbsp;处理流程</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(hasArg)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loaderContext.loaderIndex--;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iterateNormalLoaders(options,&nbsp;loaderContext,&nbsp;args,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iteratePitchingLoaders(options,&nbsp;loaderContext,&nbsp;callback);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>}<br></code>
```

可以看到，在 `loader-runner`，通过迭代处理每一个 loader，在 `loadLoader` 中检验并加载好 loader 后，在 `loadLoader` 的回调中执行了 fn（即 loader 的 pitch），完成了 loader 的处理。

### Parse 处理

Parse 主要是对模块代码进行解析，构建出一个能够描述模块依赖关系的**「抽象语法树」**（AST）。在解析阶段，webpack 会分析代码中的 `import`、`require` 等语句，找出模块间的依赖关系，并据此构建出**「模块依赖图」**。这对于后续模块的合并、代码分割和 Tree Shaking 等优化操作至关重要。

简单来说，Loader 的工作是**「“翻译”」**，Parse 的工作是**「“理解”」**。那么我们接下来看看 parse 是如何运作的。

紧接 loader 之后，就要处理 runLoaders 中的回调函数了，在函数最后的 `processResult()` 中，可以看到又执行了另一个回调函数 `callback()`，通过回溯可以看到是在 `build` 中传入的。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

里面可以看到有一个核心逻辑：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;source&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>._source.source();<br><span data-darkreader-inline-color="">this</span>.parser.parse(<span data-darkreader-inline-color="">this</span>._ast&nbsp;||&nbsp;source,&nbsp;{<br>&nbsp;&nbsp;source,<br>&nbsp;&nbsp;<span>current</span>:&nbsp;<span data-darkreader-inline-color="">this</span>,<br>&nbsp;&nbsp;<span>module</span>:&nbsp;<span data-darkreader-inline-color="">this</span>,<br>&nbsp;&nbsp;<span>compilation</span>:&nbsp;compilation,<br>&nbsp;&nbsp;<span>options</span>:&nbsp;options,<br>});<br></code>
```

`parse` 的主要作用其实是处理模块间的依赖关系，并将关系数据存储在`module.dependencies`数组中。

`this.parser.parse` 这个函数从 ./lib/javascript/JavascriptParser.js 引入，其中 `JavascriptParser` 继承自 `Parser`，我们看看具体的实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">parse(source,&nbsp;state)&nbsp;{<br>&nbsp;&nbsp;comments&nbsp;=&nbsp;[];&nbsp;<span data-darkreader-inline-color="">//&nbsp;初始化注释数组</span><br>&nbsp;&nbsp;ast&nbsp;=&nbsp;JavascriptParser._parse(source,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>sourceType</span>:&nbsp;<span data-darkreader-inline-color="">this</span>.sourceType,&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置源码类型（模块或脚本）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>onComment</span>:&nbsp;comments,&nbsp;<span data-darkreader-inline-color="">//&nbsp;收集注释的回调</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>onInsertedSemicolon</span>:&nbsp;<span>(<span>pos</span>)&nbsp;=&gt;</span>&nbsp;semicolons.add(pos),&nbsp;<span data-darkreader-inline-color="">//&nbsp;收集插入的分号位置</span><br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回传入的状态对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;state;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;<span>Parser</span>:&nbsp;AcornParser&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"acorn"</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;parser&nbsp;=&nbsp;AcornParser.extend(importAssertions);<br><br>_parse(code,&nbsp;options)&nbsp;{<br>&nbsp;&nbsp;ast&nbsp;=&nbsp;parser.parse(code,&nbsp;parserOptions);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;ast;<br>}<br></code>
```

可以看到 `parse()` 借助第三方库 acorn 实现了 AST 转换。

对 AST 不理解的同学可以看看相关的文章：前端工程化基石 -- AST（抽象语法树）以及AST的广泛应用（https://juejin.cn/post/7155151377013047304）

接下来就是打包封装模块的过程了，为了保持良好状态继续阅读，这边先用一个结构图来总结一下目前为止所有的事件进程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 打包封装模块

### 封装 Chunk

在处理好 Module 之后，我们就要研究 Webpack 是如何将 Module 打为 Chunk 了。这个过程是在哪里触发的呢？可以看到，后续的执行过程中并没有相关的逻辑了，那不妨再回去看看在 `this.hooks.finishMake` 之后还有什么逻辑：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们看到一个单词：**「seal」**，有“密封”的意思，顾名思义，应该就是封装 chunk 相关的实现，查看 `compilation.seal()`，确实有 chunk 处理的逻辑，那么我们就再来研究一下 seal 的内容：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">seal(callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建ChunkGraph，是模块和chunks之间关系的核心数据结构</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.chunkGraph&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ChunkGraph(xxx);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建chunks的初始化Map，用于记录入口点与其直接和间接依赖的映射</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;chunkGraphInit&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Map</span>();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;[name,&nbsp;{&nbsp;dependencies,&nbsp;includeDependencies,&nbsp;options&nbsp;}]&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;<span data-darkreader-inline-color="">this</span>.entries)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;为每个入口点创建一个chunk</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;chunk&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.addChunk(name);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建Entrypoint对象，并设置其对应的chunk</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entrypoint&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Entrypoint(options);<br>&nbsp;&nbsp;&nbsp;&nbsp;entrypoint.setRuntimeChunk(chunk);<br>&nbsp;&nbsp;&nbsp;&nbsp;entrypoint.setEntrypointChunk(chunk);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;记录入口点和其关联的chunk&nbsp;group</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.namedChunkGroups.set(name,&nbsp;entrypoint);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.entrypoints.set(name,&nbsp;entrypoint);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.chunkGroups.push(entrypoint);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;连接chunk&nbsp;group和chunk</span><br>&nbsp;&nbsp;&nbsp;&nbsp;connectChunkGroupAndChunk(entrypoint,&nbsp;chunk);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理入口点直接和间接依赖的模块</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;entryModules&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Set</span>();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;[...this.globalEntry.dependencies,&nbsp;...dependencies])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">module</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.moduleGraph.getModule(dep);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">module</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将模块与chunk和entrypoint关联起来</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunkGraph.connectChunkAndEntryModule(chunk,&nbsp;<span data-darkreader-inline-color="">module</span>,&nbsp;entrypoint);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entryModules.add(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;记录模块到chunkGraphInit中，为后续构建chunk&nbsp;graph做准备</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;modulesList&nbsp;=&nbsp;chunkGraphInit.get(entrypoint)&nbsp;||&nbsp;[];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modulesList.push(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunkGraphInit.set(entrypoint,&nbsp;modulesList);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理包括的模块</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;includedModules&nbsp;=&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...this.mapAndSortDependencies(includeDependencies),<br>&nbsp;&nbsp;&nbsp;&nbsp;];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;modulesList&nbsp;=&nbsp;chunkGraphInit.get(entrypoint)&nbsp;||&nbsp;[];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">module</span>&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;includedModules)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modulesList.push(<span data-darkreader-inline-color="">module</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;chunkGraphInit.set(entrypoint,&nbsp;modulesList);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;构建chunk&nbsp;graph，确定模块如何分布在chunks中</span><br>&nbsp;&nbsp;buildChunkGraph(<span data-darkreader-inline-color="">this</span>,&nbsp;chunkGraphInit);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.afterChunks.call(<span data-darkreader-inline-color="">this</span>.chunks);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;this.hooks.afterSeal.callAsync(()=&gt;{})&nbsp;内容省略</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.beforeChunkAssets.call();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.createChunkAssets(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cont();<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;callback();<br>}<br></code>
```

seal 的内容非常多，经过压缩后，可以提炼出一个核心的处理过程：

1.  **「创建 ChunkGraph」**：初始化`ChunkGraph`实例，确定哪些模块属于哪个 chunk，以及 chunks 之间如何相互引用。
    
2.  **「遍历入口点」**：对于配置中定义的每个入口点，执行以下步骤：
    

1.  创建 chunk：为每个入口点创建一个新的 chunk。这个 chunk 将作为从该入口点构建出的所有模块的容器。
    
2.  创建并设置 Entrypoint：为每个 chunk 创建一个`Entrypoint`对象，确保了每个入口点都有一个对应的 chunk，且该 chunk 包含了入口点及其依赖的所有模块。
    
3.  处理依赖关系：将入口点的直接和间接依赖的模块与创建的 chunk 进行关联。
    

4.  **「构建 Chunk Graph」**：使用收集的信息（入口点、依赖等）构建完整的`chunkGraph`。
    
5.  **「生成 Chunk Assets」**：将 chunk 转换为输出的 assets，这一步会在后面进行探究。
    

这里还有一个值得琢磨的点：代码拆分是如何实现的？chunk 都有什么类型？封装规则如何？

如果详细研究，篇幅估计要难以承受，这边考虑放到后面单独起一篇文章进行研究🤤。

不过我们可以先了解最基础的两种 chunk：

-   **「Entry Chunks」**
    

-   规则：每个入口点(entry point)至少生成一个entry chunk。
    
-   目的：确保应用或页面的入口有一个对应的chunk，包含所有必要的启动代码。
    
-   配置：通过 `entry` 配置指定。
    

-   **「Async Chunks」**
    

-   规则：使用 `import()` 语句导入的模块会被封装到一个新的 async chunk 中。
    
-   目的：实现代码拆分和懒加载，优化初始加载时间，按需加载额外功能。
    
-   配置：无需特殊配置，Webpack 自动处理动态导入。
    

### 通过 emit 将 Assets 输出

那么接下来我们在聚焦于将 chunk 转换为 assets 的实现逻辑，可以看到 createChunkAssets 中的具体实现：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">createChunkAssets</span>(<span>callback</span>)&nbsp;</span>{<br>&nbsp;&nbsp;asyncLib.forEachLimit(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.chunks,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>15</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;(chunk,&nbsp;callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;manifest;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取chunk将要生成的assets的清单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manifest&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.getRenderManifest({&nbsp;chunk,&nbsp;xxx});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理manifest中的每个文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;asyncLib.forEach(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manifest,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(fileManifest,&nbsp;callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用render方法渲染出最终的资源内容，触发renderManifest钩子</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source&nbsp;=&nbsp;fileManifest.render();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.emitAsset(file,&nbsp;source&nbsp;||&nbsp;alreadyWritten.source,&nbsp;assetInfo);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;callback<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;callback<br>&nbsp;&nbsp;);<br>}<br></code>
```

可以看到核心的处理过程在 `render()` 和 `emitAsset()` 中，我们先来看看 `render()` 中 renderManifest 触发了哪些插件运行。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可见 `render()` 触发了对不同资源的处理，打出最终的资源内容 Source。它用于表示文件的内容及其相关的 source map 信息（如果存在），通常包含以下主要的方法和属性：

-   `source()`: 返回文件内容的**「字符串」**表示。
    
-   `map()`: 返回与文件内容关联的 source map。
    
-   `size()`: 返回内容的大小。
    

紧接着，最终 Source 被传入了 `emitAsset()` 中，用来将生成的资源（assets）添加到最终输出的一部分。可是观察代码，并没有最后的 emit hook 触发，那么最后的输出在哪里呢？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

不妨全局搜索 `this.hooks.emit`，发现在 `compiler.emitAssets` 中触发，同时 `compiler.emitAssets` 在 `compiler.run` 的 `onCompiled` 中被调用，可见这个操作就是一开始的 `this.compile(onCompiled)` 中传入的回调函数，一切又形成了闭环🤣。

那么我们来看看 `compiler.emitAssets` 做了些什么吧！

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">emitAssets(compilation,&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;outputPath&nbsp;=&nbsp;compilation.getPath(<span data-darkreader-inline-color="">this</span>.outputPath,&nbsp;{});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;负责将资源写入文件系统</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;emitFiles&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;assets&nbsp;=&nbsp;compilation.getAssets();&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取所有准备好的资源</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;遍历所有资源，并写入文件系统</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;<span>name</span>:&nbsp;file,&nbsp;source&nbsp;}&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;assets)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;targetFile&nbsp;=&nbsp;file;&nbsp;<span data-darkreader-inline-color="">//&nbsp;目标文件名</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;targetPath&nbsp;=&nbsp;join(<span data-darkreader-inline-color="">this</span>.outputFileSystem,&nbsp;outputPath,&nbsp;targetFile);&nbsp;<span data-darkreader-inline-color="">//&nbsp;目标路径</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取资源的内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;getContent&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;source.buffer&nbsp;===&nbsp;<span data-darkreader-inline-color="">"function"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;source.buffer()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;Buffer.from(source.source(),&nbsp;<span data-darkreader-inline-color="">"utf8"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取内容并写入文件系统</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;content&nbsp;=&nbsp;getContent();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.outputFileSystem.writeFile(targetPath,&nbsp;content,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(err)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;callback(err);&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果有错误，执行回调函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation.emittedAssets.add(file);&nbsp;<span data-darkreader-inline-color="">//&nbsp;标记资源已发射</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以在这里调用更多的钩子，例如&nbsp;assetEmitted</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用emit钩子并开始写入文件</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.emit.callAsync(compilation,&nbsp;(err)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(err)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;callback(err);&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果有错误，执行回调函数</span><br>&nbsp;&nbsp;&nbsp;&nbsp;mkdirp(<span data-darkreader-inline-color="">this</span>.outputFileSystem,&nbsp;outputPath,&nbsp;emitFiles);&nbsp;<span data-darkreader-inline-color="">//&nbsp;确保输出目录存在，然后开始写入文件</span><br>&nbsp;&nbsp;});<br>}<br></code>
```

可以看到在 `compiler.emitAssets` 中执行了 `mkdirp()`，会根据 webpack.config.js 中的 output.path 属性输出文件至目标路径，至此，全部流程就完成了！

同样的，我们再通过一个完整的结构图来回顾一下具体的核心流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 一些常见问题总结

## Asset 和 Bundle 的区别

其实可以把 Bundle 理解为 Asset 的子集。

-   **「Bundle」**：主要是 JavaScript 文件，也可以包含其他类型的文件（如通过插件或 loader 生成的 CSS、HTML ）。
    
-   **「Asset」**：指构建过程中生成的任何类型的文件，包括 Bundle 本身和其他所有资源（如图片、字体、样式表等）。
    

## 如何手写 Webpack 插件

这需要进一步了解一下 Tapable 的内容了，目前有很多优秀的文章可以直接学习：

干货！撸一个webpack插件(内含tapable详解+webpack流程)（https://juejin.cn/post/6844903713312604173）

## 构建工具的横向对比

目前流行的构建工具其实很多，我们通过一个表格来进行初步比对：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

不同的构建工具都有各自的优点，创建项目时，需要综合自己的需求进行选择。

## 怎么读源码

阅读源码确实是一件非常艰难且挑战耐心的事情，我将结合自身的一些经验，分享一些阅读源码的心得：

-   调整状态、心态
    

-   **「自驱力」**：为什么要读源码？想要什么结果？自驱力是持续学习的动力源。
    
-   **「好奇心、探究心」**：对代码背后的逻辑、架构设计和技术决策保持好奇心，不满足于表面的了解，而是深入探究其原理和实现方式。对不懂的、不熟悉的部分保持探究心，通过查阅文档、搜索、实验和询问他人来获得理解
    
-   **「耐力」**：读源码是一个复杂且耗时的任务，需要长时间的专注和努力。在面对难以理解的代码时，耐心地分析、逐步深入，有时也许需要多次阅读和反复实验才能获得透彻的理解。
    
-   **「安静」**：保持安静！让自己能够深入地专注于阅读和理解代码。尤其是不要边听歌边读源码（很难专注）。
    

-   掌握工具
    

-   **「调试源码」**：尝试使用 debugger 调试代码，跟踪整个运行过程。
    
-   **「查阅文档」**：基于一些社区资料（可以是他人的总结，也可以是官方文档……）协助源码的阅读。
    
-   **「结合 AI 精简源码」**：可以将各种代码投喂给 AI 工具，帮代码打出注释，删除异常处理、日志等不重要的内容。
    
-   **「文档记录」**：阅读的过程中可以同步的记录于文档，这篇文章就是一个参考，这样方便上下翻看精简后的代码，同时也能让自己的思路更加清晰。
    

最后，我们还可以基于目标源码的特点来协助阅读。拿 Webpack 来说，虽然代码结构十分复杂，回调地狱满天飞，但是它的 hooks 机制能十分有效地帮助我们了解整体的进程，可以考虑在阅读之前，先从整体了解项目的机制，结合画图来拆解架构，大家不妨试试看！

## 最后

不得不说，Webpack 的内容实在太多了，本想控制一下篇幅，但源码的战线实在拉的太长了，尽管去除了大量无关的内容，还是让文章达到了接近 2w 的字符数。

为了进一步深入 Webpack，后续还会坚持更新更多相关的内容，既然这一篇已经将整体结构梳理完了，那么后面就会考虑从一个具体的模块中进行分析，探索 Webpack 更为细节的内容实现～

与此同时，对于文中不清晰或有误的地方，欢迎阅读原文评论区讨论！