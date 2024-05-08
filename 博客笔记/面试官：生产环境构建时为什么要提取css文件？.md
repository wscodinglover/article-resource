> 作者：wks 
> 
> https://juejin.cn/post/7241364419359801405

## 前言

面试官: **`webpack`生产环境构建时为什么要将`css`文件提取成单独的文件？**

> 我：**基于性能考虑，如可以进行缓存控制**

面试官：**还有吗？**

> 我：**基于可读性考虑，独立的`css`文件更方便代码的阅读与调试**

面试官：**那你有了解过**`css`**是怎么提取成单独文件的吗？**

> 我：**嗯...?**

看完本篇之后，希望小伙伴面试的时候碰到这个问题时你的回答是这样的

面试官: **`webpack`生产环境构建时为什么要将`css`文件提取成单独的文件？**

> 你会这么回答
> 
> -   更好的缓存，当 CSS 和 JS 分开时，浏览器可以缓存 CSS 文件并重复使用，而不必重新加载，也不用因为js内容的变化，导致css缓存失效
>     
> -   更快的渲染速度，浏览器是同时可以并行加载多个静态资源，当我们将css从js中抽离出来时，能够加快js的加载与解析速度，最终加快页面的渲染速度
>     
> -   更好的代码可读性，独立的`css`文件更方便代码的阅读与调试
>     

面试官: **那你有了解过**`css`**是怎么提取成单独文件的吗？**

> 你会这么回答
> 
> -   有了解过，提取`css`的时候，我们一般会使用`mini-css-extract-plugin`这个库提供的`loader`与`plugin`结合使用，达到提取`css`文件的目的
>     
> -   而MiniCssExtractPlugin这个插件的原理是
>     
> 
> -   `MiniCssExtractPlugin`插件会先注册`CssModuleFactory`与`CssDependency`
>     
> -   然后在`MiniCssExtractPlugin.loader`使用`child compiler`(`webpack`5.33.2之后默认使用importModule方法)以`css`文件为入口进行子编译，子编译流程跑完之后，最终会得到`CssDependency`
>     
> -   然后`webpack`会根据模块是否有`dependencies`，继续解析子依赖，当碰到`CssDenpendcy`的时候会先找到`CssModuleFactory`，然后通过`CssModuleFactory.create`创建一个`css module`
>     
> -   当所有模块都处理完之后，会根据`MiniCssExtractPlugin`插件内注册的`renderManifest` `hook` `callback`，将当前`chunk`内所有的`css module`合并到一起，然后`webpack`会根据`manifest`创建`assets`
>     
> -   最终`webpack`会根据`assets`在生成最终的文件
>     

本篇的主要目的不仅是为了面试的时候不被难倒，更是为了通过抽离`css`这个事，来了解`webpack`的构建流程，帮助我们对`webpack`有更深的了解，成为一个更好的`webpack`配置工程师

本篇的主要内容包括

-   `webpack`中样式处理方式
    
-   `webpack`构建流程
    
-   `css`文件提取原理
    

看完之后，你可以学到

-   `webpack`基础的**构建流程**
    
-   `pitch` `loader`与行内`loader`的使用
    
-   `webpack`插件的编写
    
-   了解`webpack` `child compiler`
    

## 如何处理css

## 开发环境

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">module</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">test</span>:&nbsp;<span data-darkreader-inline-color="">/\.css$/</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">use</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">loader</span>:&nbsp;<span data-darkreader-inline-color="">'style-loader'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">loader</span>:&nbsp;<span data-darkreader-inline-color="">'css-loader'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">loader</span>:&nbsp;<span data-darkreader-inline-color="">'postcss-loader'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;}<br>}<br></code>
```

样式先经过`postcss-loader`处理，然后在经过`css-loader`处理，最后在通过`style-loader`处理，以`style`标签的形式插入到`html`中

## 生产环境

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">module.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;module:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;rules:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test:&nbsp;/\.css$/,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;use:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br><span data-darkreader-inline-color="">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loader:&nbsp;'style-loader',</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loader:&nbsp;MiniCssExtractPlugin.loader</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loader:&nbsp;'css-loader',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loader:&nbsp;'postcss-loader',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;},<br>&nbsp;plugins:&nbsp;[<br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;new&nbsp;MiniCssExtractPlugin(</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename:&nbsp;'css/[name].[contenthash].css',</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunkFilename:&nbsp;'css/[name].[contenthash].css',</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;experimentalUseImportModule:&nbsp;false</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br><span data-darkreader-inline-color="">+&nbsp;&nbsp;&nbsp;&nbsp;)</span><br>&nbsp;&nbsp;]<br>}<br></code>
```

将开发环境使用`style-loader`替换成`MinicssExtractPlugin.loader`，并且添加`MinicssExtractPlugin`插件，最终`webpack`构建的结果会包含单独的`css`文件，这是为什么？继续往下看

## css-loader原理

在看`mini-css-extract-plugin`插件的作用之前，先简单看下`css-loader`的原理 首先`webpack`是无法处理`css`文件的，只有添加了对应的`loader`比如，`css-loader`。`css`文件经过`loader`处理之后，将`css`转化为`webpack`能够解析的`javascript`才不会报错 比如

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">.wrap</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:&nbsp;red;<br>}<br></code>
```

经过`css-loader`处理后

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;最终css-loader处理后返回的内容</span><br><span data-darkreader-inline-color="">//&nbsp;Imports</span><br><span data-darkreader-inline-color="">import</span>&nbsp;___CSS_LOADER_API_SOURCEMAP_IMPORT___&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"../node_modules/.pnpm/css-loader@6.7.3_webpack@5.79.0/node_modules/css-loader/dist/runtime/sourceMaps.js"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;___CSS_LOADER_API_IMPORT___&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"../node_modules/.pnpm/css-loader@6.7.3_webpack@5.79.0/node_modules/css-loader/dist/runtime/api.js"</span>;<br><span data-darkreader-inline-color="">var</span>&nbsp;___CSS_LOADER_EXPORT___&nbsp;=&nbsp;___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);<br><span data-darkreader-inline-color="">//&nbsp;Module</span><br>___CSS_LOADER_EXPORT___.push([<span data-darkreader-inline-color="">module</span>.id,&nbsp;<span data-darkreader-inline-color="">".wrap&nbsp;{\n&nbsp;&nbsp;color:&nbsp;red;\n}\n"</span>,&nbsp;<span data-darkreader-inline-color="">""</span>,{<span data-darkreader-inline-color="">"version"</span>:<span data-darkreader-inline-color="">3</span>,<span data-darkreader-inline-color="">"sources"</span>:[<span data-darkreader-inline-color="">"webpack://./src/app.css"</span>],<span data-darkreader-inline-color="">"names"</span>:[],<span data-darkreader-inline-color="">"mappings"</span>:<span data-darkreader-inline-color="">"AAAA;EACE,UAAU;AACZ"</span>,<span data-darkreader-inline-color="">"sourcesContent"</span>:[<span data-darkreader-inline-color="">".wrap&nbsp;{\n&nbsp;&nbsp;color:&nbsp;red;\n}\n"</span>],<span data-darkreader-inline-color="">"sourceRoot"</span>:<span data-darkreader-inline-color="">""</span>}]);<br><span data-darkreader-inline-color="">//&nbsp;Exports</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;___CSS_LOADER_EXPORT___;<br></code>
```

从产物我们可以看到

-   `css-loader`会将`css`处理成字符串
    
-   `css`模块经过`css-loader`处理之后，返回的内容变成了一个`js`模块
    

最终`webpack`输出的产物（关闭压缩与scope hosting）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">/******/</span>&nbsp;(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{&nbsp;<span data-darkreader-inline-color="">//&nbsp;webpackBootstrap</span><br><span data-darkreader-inline-color="">/******/</span>&nbsp;&nbsp;<span data-darkreader-inline-color="">"use&nbsp;strict"</span>;<br><span data-darkreader-inline-color="">/******/</span>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;__webpack_modules__&nbsp;=&nbsp;({<br><br><span data-darkreader-inline-color="">/***/</span>&nbsp;<span data-darkreader-inline-color="">410</span>:<br><span data-darkreader-inline-color="">/***/</span>&nbsp;(<span><span data-darkreader-inline-color="">function</span>(<span>module,&nbsp;__unused_webpack___webpack_exports__,&nbsp;__webpack_require__</span>)&nbsp;</span>{<br><br><span data-darkreader-inline-color="">/*&nbsp;harmony&nbsp;import&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__&nbsp;=&nbsp;__webpack_require__(<span data-darkreader-inline-color="">912</span>);<br><span data-darkreader-inline-color="">/*&nbsp;harmony&nbsp;import&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default&nbsp;=&nbsp;<span data-darkreader-inline-color="">/*#__PURE__*/</span>__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);<br><span data-darkreader-inline-color="">/*&nbsp;harmony&nbsp;import&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__&nbsp;=&nbsp;__webpack_require__(<span data-darkreader-inline-color="">568</span>);<br><span data-darkreader-inline-color="">/*&nbsp;harmony&nbsp;import&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default&nbsp;=&nbsp;<span data-darkreader-inline-color="">/*#__PURE__*/</span>__webpack_require__.n(_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);<br><span data-darkreader-inline-color="">//&nbsp;Imports</span><br><br><br><span data-darkreader-inline-color="">var</span>&nbsp;___CSS_LOADER_EXPORT___&nbsp;=&nbsp;_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_7_3_webpack_5_79_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));<br><span data-darkreader-inline-color="">//&nbsp;Module</span><br>___CSS_LOADER_EXPORT___.push([<span data-darkreader-inline-color="">module</span>.id,&nbsp;<span data-darkreader-inline-color="">".wrap&nbsp;{\n&nbsp;&nbsp;color:&nbsp;red;\n}\n"</span>,&nbsp;<span data-darkreader-inline-color="">""</span>,{<span data-darkreader-inline-color="">"version"</span>:<span data-darkreader-inline-color="">3</span>,<span data-darkreader-inline-color="">"sources"</span>:[<span data-darkreader-inline-color="">"webpack://./src/app.css"</span>],<span data-darkreader-inline-color="">"names"</span>:[],<span data-darkreader-inline-color="">"mappings"</span>:<span data-darkreader-inline-color="">"AAAA;EACE,UAAU;AACZ"</span>,<span data-darkreader-inline-color="">"sourcesContent"</span>:[<span data-darkreader-inline-color="">".wrap&nbsp;{\n&nbsp;&nbsp;color:&nbsp;red;\n}\n"</span>],<span data-darkreader-inline-color="">"sourceRoot"</span>:<span data-darkreader-inline-color="">""</span>}]);<br><span data-darkreader-inline-color="">//&nbsp;Exports</span><br><span data-darkreader-inline-color="">/*&nbsp;unused&nbsp;harmony&nbsp;default&nbsp;export&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;__WEBPACK_DEFAULT_EXPORT__&nbsp;=&nbsp;((<span data-darkreader-inline-color="">/*&nbsp;unused&nbsp;pure&nbsp;expression&nbsp;or&nbsp;super&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;&amp;&amp;&nbsp;(___CSS_LOADER_EXPORT___)));<br><span data-darkreader-inline-color="">/***/</span>&nbsp;}),<br><br><span data-darkreader-inline-color="">/***/</span>&nbsp;<span data-darkreader-inline-color="">568</span>:<br><span data-darkreader-inline-color="">/***/</span>&nbsp;(<span><span data-darkreader-inline-color="">function</span>(<span>module</span>)&nbsp;</span>{<br><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>cssWithMappingToString</span>)&nbsp;</span>{};<br><br><span data-darkreader-inline-color="">/***/</span>&nbsp;}),<br><br><span data-darkreader-inline-color="">/***/</span>&nbsp;<span data-darkreader-inline-color="">912</span>:<br><span data-darkreader-inline-color="">/***/</span>&nbsp;(<span><span data-darkreader-inline-color="">function</span>(<span>module</span>)&nbsp;</span>{<br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>item</span>)&nbsp;</span>{};<br><br><span data-darkreader-inline-color="">/***/</span>&nbsp;})<br><br><span data-darkreader-inline-color="">/******/</span>&nbsp;&nbsp;});<br><br><span data-darkreader-inline-color="">var</span>&nbsp;__webpack_exports__&nbsp;=&nbsp;{};<br><span data-darkreader-inline-color="">//&nbsp;This&nbsp;entry&nbsp;need&nbsp;to&nbsp;be&nbsp;wrapped&nbsp;in&nbsp;an&nbsp;IIFE&nbsp;because&nbsp;it&nbsp;need&nbsp;to&nbsp;be&nbsp;isolated&nbsp;against&nbsp;other&nbsp;modules&nbsp;in&nbsp;the&nbsp;chunk.</span><br>!<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br><span data-darkreader-inline-color="">/*&nbsp;harmony&nbsp;import&nbsp;*/</span>&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;_app_css__WEBPACK_IMPORTED_MODULE_0__&nbsp;=&nbsp;__webpack_require__(<span data-darkreader-inline-color="">410</span>);<br><br><span data-darkreader-inline-color="">document</span>.write(<span data-darkreader-inline-color="">1111</span>);<br>}();<br><span data-darkreader-inline-color="">/******/</span>&nbsp;})()<br>;<br><span data-darkreader-inline-color="">//#&nbsp;sourceMappingURL=app.014afe2d9ceb7dcded8a.js.map</span><br></code>
```

从上面生成的代码可以看到只经过`css-loader`处理，在生成环境是无法正常加载样式的，因为没有用`style`处理，也没有被提取成单独的`css`文件

## webpack构建流程

在了解`webpack`提取`css`样式文件的原理前，我们需要先对`webpack`构建流程有一个初步的了解，只有了解了`webpack`构建流程，才能掌握`webpack`提取`css`的原理

示例代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;foo}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./foo'</span><br><br><span data-darkreader-inline-color="">document</span>.write(foo)<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;foo&nbsp;=&nbsp;1<br></code>
```

我们看下`webpack`是怎么解析js文件，从`entry`(这里是index.js)到所有依赖的模块解析完成的过程，以`normalModule`为例，如下图所示 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

详细流程图

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

专用导出页.png

伪代码如下所示

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;entry,&nbsp;options,&nbsp;context&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;EntryPlugin.createDependency(entry,&nbsp;options);<br><br>compiler.hooks.make.tapAsync(<span data-darkreader-inline-color="">"EntryPlugin"</span>,&nbsp;(compilation,&nbsp;callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;compilation.addEntry(context,&nbsp;dep,&nbsp;options,&nbsp;err&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;callback(err);<br>&nbsp;&nbsp;});<br>});<br><br>addEntry从entry开始解析，然后会调用addModuleTree开始构建依赖数<br><br>addModuleTree({&nbsp;context,&nbsp;dependency,&nbsp;contextInfo&nbsp;},&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;Dep&nbsp;=&nbsp;dependency.constructor;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;dependencyFactories会根据保存创建依赖模块的构造函数</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;比如EntryDependency=&gt;normalModuleFactory</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;比如HarmonyImportSideEffectDependency&nbsp;=&gt;&nbsp;normalModuleFactory</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;比如HarmonyImportSpecifierDependency&nbsp;=&gt;&nbsp;normalModuleFactory</span><br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;moduleFactory&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.dependencyFactories.get(Dep);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过模块工厂函数创建module实例</span><br>&nbsp;moduleFactory.create()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过loader处理，将所有的资源转化成js</span><br>&nbsp;&nbsp;runLoaders()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;loader处理完之后，在通过parse成ast</span><br>&nbsp;&nbsp;NormalModule.parser.parse()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;最后遍历ast，找到import&nbsp;require这样的dependency</span><br>&nbsp;&nbsp;parser.hooks.import.tap(<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"HarmonyImportDependencyParserPlugin"</span>,<br>&nbsp;&nbsp;(statement,&nbsp;source)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;sideEffectDep&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;HarmonyImportSideEffectDependency(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parser.state.lastHarmonyImportOrder,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assertions<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;parser.state.module.addDependency(sideEffectDep);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;最后在遍历模块的依赖，又回到前面的根据依赖找模块工厂函数，然后开始创建模块，解析模块，一直到所有模块解析完</span><br>&nbsp;&nbsp;processModuleDependencies()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当所有的模块解析结束之后，就要生成模块内容</span><br>&nbsp;&nbsp;codeGeneration()<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;生成模块内容的时候，最终又会通过依赖，来找依赖模版构造函数</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">constructor</span>&nbsp;=&nbsp;dependency.<span data-darkreader-inline-color="">constructor</span>;<br>&nbsp;&nbsp;//&nbsp;比如&nbsp;HarmonyImportSideEffectDependency&nbsp;=&gt;&nbsp;HarmonyImportSideEffectDependencyTemplate<br>&nbsp;&nbsp;//&nbsp;比如&nbsp;HarmonyImportSpecifierDependency&nbsp;=&gt;&nbsp;HarmonyImportSpecifierDependencyTemplate<br>&nbsp;const&nbsp;template&nbsp;=&nbsp;generateContext.dependencyTemplates.<span data-darkreader-inline-color="">get</span>(<span data-darkreader-inline-color="">constructor</span>);<br>&nbsp;<br>&nbsp;&nbsp;//&nbsp;最后创建assets，根据assets生成最终的文件<br>&nbsp;&nbsp;createChunkAssets()<br>}<br></code>
```

`import`语句解析成`ast`之后的数据 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

根据`ast`， 解析`dependency` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

index.js模块的`depedencies` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

foo.js模块的`depedencies` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 从上面的伪代码我们可以知道`webpack`内部是怎么创建模块，解析模块并最终生成模块代码的，简单来说就是`import` or `require`的文件当成一个依赖，而根据这个依赖会生成一个对应的`module`实例，最后在生成模块代码的时候，又会根据依赖模版构造函数生成模块内容，所以`dependency`、`moduleFactory`、`DependencyTemplate`都是密切关联的

## css提取原理

了解了`webpack`的基本构建流程之后，我们现在来看`mini-css-extract-plugin`插件是如何将所有的`css`文件提取出来，并根据`chunk`来进行合并`css`内容

案例代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">.wrap&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">color</span>:&nbsp;red<br>}<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;<span data-darkreader-inline-color="">'./index.css'</span><br><br>document.wirte(111)<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">  mode: 'production',<br>  devtool: 'source-map',<br>  output: {<br>    path: path.join(__dirname, '../dist'),<br>    filename: 'js/[name].[chunkhash].js',<br>    chunkFilename: 'chunk/[name].[chunkhash].js',<br>    publicPath: './'<br>  },<br>  module: {<br>    rules: [<br>      {<br>        test: /\.css$/,<br>        use: [<br>          {<br>            loader: MiniCssExtractPlugin.loader<br>          },<br>          {<br>            loader: 'css-loader',<br>          },<br>        ]<br>      },<br>    ]<br>  },<br>  optimization: {<br>    minimize: false,<br>    concatenateModules: false,<br>  },<br>  entry: {<br>    app: path.join(__dirname, '../src/index')<br>  },<br>  plugins: [<br>    new MiniCssExtractPlugin(<br>      {<br>        filename: 'css/[name].[contenthash].css',<br>        chunkFilename: 'css/[name].[contenthash].css',<br>        experimentalUseImportModule: false<br>      }<br>    )<br>  ]<br>}<br></code>
```

`css`提取原理是(以上面的案例为例，且不考虑`importModule`场景)

-   通过`mini-css-extract-plugin`的`picth loader`先匹配到index.css文件，然后创建一个`child compiler`，`child compiler`指定index.css文件为`entry`文件
    
-   父`compiler`陷入异步等待过程，子编译器根据`css` `entry`开始编译，匹配到`css-loader`(entry `css`使用了行内`loader`并禁用了rules内的`loader`匹配)，经过`css-loader`处理之后，继续进行编译，一直到`child compiler`编译流程结束
    
-   进入子编译器执行成功之后的`callback`，根据子编译流程的结果构造`cssDependency`，然后通过`this._module.addDependency(new cssDependency())` api将`cssDependency`添加到index.css模块的`dependency`中，然后调用callback(null, `export {};`); 阻断后续`loader`执行也就是`css-loader`执行
    
-   继续父`compiler`编译流程，index.css编译结束，有一个`cssDependency`依赖，然后根据`cssDependency`依赖找到`cssModuleFactory`，然后通过`cssModuleFactory`创建`css module`实例，调用`css module`上的build方法构建`css module`，最终`css module`没有`dependencies`，所有模块解析完成
    
-   进入`createAssets`流程，会触发`renderManifest` `hook`，通过`mini-css-extract-plugin`插件注册的`renderManifest` `hook` `callback`会创建一个包含当前`chunk`内所有`css module`的`render`方法
    
-   最终通过遍历`manifest`，生成一个`css asset`，一个`js asset`
    

提取流程如下图所示 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下面是`css module`创建，及`css asset`创建的伪代码过程

## 创建css module

伪代码如下所示

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;mini-css-extract-plugin处理逻辑</span><br><br><span data-darkreader-inline-color="">//&nbsp;定义CssModule、CssDependency、CssModuleFactory、CssDependencyTemplate</span><br><span data-darkreader-inline-color="">//&nbsp;CssModule&nbsp;用于生产css&nbsp;module实例</span><br><span data-darkreader-inline-color="">//&nbsp;CssDependency&nbsp;用于构建css&nbsp;dependency</span><br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">CssModule</span>&nbsp;</span>{}<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">CssDependency</span></span>{}<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">CssModuleFactory</span>&nbsp;</span>{<br>&nbsp;&nbsp;create({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">dependencies</span>:&nbsp;[dependency]<br>&nbsp;&nbsp;},&nbsp;callback)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;callback(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">undefined</span>,&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;CssModule(&nbsp;<span data-darkreader-inline-color="">/**&nbsp;@type&nbsp;{CssDependency}&nbsp;*/</span>dependency));<br>&nbsp;&nbsp;}<br>}<br>compilation.dependencyFactories.set(CssDependency,&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;CssModuleFactory());<br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">CssDependencyTemplate</span>&nbsp;</span>{<br>&nbsp;&nbsp;apply()&nbsp;{}<br>}<br>compilation.dependencyTemplates.set(CssDependency,&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;CssDependencyTemplate());<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;index.css匹配到.css相关的loader，也就是先进入mini-css-extract-plugin.loader<br>//&nbsp;跳过importModule处理模块的方式<br><br>//&nbsp;创建子编译器，子编译器，会继承父compiler的大部分hook及插件，然后在子编译器依赖树构建完成之后，会将assets赋值到父compiler的assets上，才能最终输出文件<br>const&nbsp;childCompiler&nbsp;=&nbsp;this._compilation.createChildCompiler(`<span data-darkreader-inline-color="">${MiniCssExtractPlugin.pluginName}</span>&nbsp;<span data-darkreader-inline-color="">${request}</span>`,&nbsp;outputOptions);<br><br>//&nbsp;指定css文件为entry，注意路径带有!!前缀，禁止匹配rules中的loader<br>EntryOptionPlugin.applyEntryOption(childCompiler,&nbsp;this.context,&nbsp;{<br>&nbsp;&nbsp;child:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;library:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">"commonjs2"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;request&nbsp;/node_modules/css-loader/dist/cjs.js!/Users/wangks/Documents/f/github-project/webpack-time-consuming/src/index.css<br>&nbsp;&nbsp;&nbsp;&nbsp;import:&nbsp;[`!!<span data-darkreader-inline-color="">${request}</span>`]<br>&nbsp;&nbsp;}<br>});<br><br>childCompiler.hooks.compilation.tap(MiniCssExtractPlugin.pluginName,<br>&nbsp;&nbsp;compilation&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;compilation.hooks.processAssets.tap(MiniCssExtractPlugin.pluginName,&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>&nbsp;=&nbsp;compilation.assets[childFilename]&nbsp;&amp;&amp;&nbsp;compilation.assets[childFilename].<span data-darkreader-inline-color="">source</span>();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;主动删除子编译器产生的assets,避免子编译器编译结束之后，进行assets赋值<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation.chunks.forEach(chunk&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunk.files.forEach(file&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation.deleteAsset(file);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br><br>//&nbsp;对css文件作为entry的子编译器开始进行编译<br>childCompiler.runAsChild((error,&nbsp;entries,&nbsp;compilation)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;//&nbsp;子编译流程结束，依赖树构建完成<br><br>&nbsp;&nbsp;//&nbsp;创建CssDependency<br>&nbsp;&nbsp;const&nbsp;CssDependency&nbsp;=&nbsp;MiniCssExtractPlugin.getCssDependency(webpack);<br><br>&nbsp;&nbsp;//&nbsp;并赋值给当前模块的dependencies中，便于解析出css&nbsp;module<br>&nbsp;&nbsp;this._module.addDependency(lastDep&nbsp;=&nbsp;new&nbsp;CssDependency(&nbsp;/**&nbsp;@<span data-darkreader-inline-color="">type</span>&nbsp;{Dependency}&nbsp;*/<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependency,&nbsp;/**&nbsp;@<span data-darkreader-inline-color="">type</span>&nbsp;{Dependency}&nbsp;*/<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependency.context,&nbsp;count))<br><br>&nbsp;&nbsp;//&nbsp;返回空对象，阻断后续loader执行<br>&nbsp;callback(null,&nbsp;`<span data-darkreader-inline-color="">export</span>&nbsp;{};`);<br>})<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 注意点：

-   子编译器是以`css`文件作为entry进行编译
    
-   子编译处理入口`css`的时候，因为带来!!前缀，所以不会在匹配到自身的`loader`处理逻辑
    
-   `mini-css-extract-plugin.loader`是一个`pitch loader`，当子编译结束之后，将`cssDependency`添加到`_module.addDependency`，调用callback阻断后续`loader`处理流程
    

简单理解就是当父`compiler`解析js文件的时候，js中发现有引用`css`文件，那么会先将`css`文件当成普通的`nomarlModule`,然后经过`mini-css-extract-plugin.loader`处理后，这个`nomarlNodule`会得到`cssDependency`，然后在根据`cssDependency`继续在父`compiler`创建出`css module`实例

主`compiler`处理完之后的`modules`合集，如下图所示 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 第一个`module`实例是index.js对应的`normalmodule`实例 第二个`module`实例是index.css对应的`normalmodule`实例，但是内容为空 第三个`module`实例是index.css对应的`css module`实例，内容就是`css`文件的内容 这样经过`mini-css-extract-plugin`插件处理之后，`css`样式就被单独提取出来了，且最后的index.css对应的`normalmodule`实例因为内容为空，会被干掉

那么`mini-css-extract-plugin`是怎么处理，将index.css对应的`normalmodule`实例变为空，且创建出新的`css module`实例的

这是`css module`创建的过程，那么最终所有的`css module`是怎么生成到一个文件的，以本篇的例子为例继续分析源码

## 创建css asset

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;最后创建assets，根据assets生成最终的文件</span><br>createChunkAssets()<br><br><span data-darkreader-inline-color="">//&nbsp;进入mini-plugin&nbsp;renderManifest逻辑</span><br>compilation.hooks.renderManifest.tap(pluginName,<br>&nbsp;&nbsp;(result,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;chunk<br>&nbsp;&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;过滤css&nbsp;module</span><br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;renderedModules&nbsp;=&nbsp;<span data-darkreader-inline-color="">Array</span>.from(<span data-darkreader-inline-color="">this</span>.getChunkModules(chunk,&nbsp;chunkGraph)).filter(<span><span>module</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">module</span>.type&nbsp;===&nbsp;MODULE_TYPE);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果chunk中包含呢css&nbsp;module，则向数组中push一个对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;result.push({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据manifest生成asset的时候，会调用render方法，决定asset的内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">render</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;renderContentAsset(compiler,&nbsp;compilation,&nbsp;chunk,&nbsp;renderedModules,&nbsp;compilation.runtimeTemplate.requestShortener,&nbsp;filenameTemplate,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">contentHashType</span>:&nbsp;MODULE_TYPE,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunk<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;renderContentAsset(compiler,&nbsp;compilation,&nbsp;chunk,&nbsp;modules,&nbsp;requestShortener,&nbsp;filenameTemplate,&nbsp;pathData)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;usedModules&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.sortModules(compilation,&nbsp;chunk,&nbsp;modules,&nbsp;requestShortener);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ConcatSource,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SourceMapSource,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RawSource<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;=&nbsp;compiler.webpack.sources;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;source&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ConcatSource();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;externalsSource&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ConcatSource();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;合并module内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">module</span>&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;usedModules)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;content&nbsp;=&nbsp;<span data-darkreader-inline-color="">module</span>.content.toString();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content&nbsp;=&nbsp;content.replace(<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">RegExp</span>(ABSOLUTE_PUBLIC_PATH,&nbsp;<span data-darkreader-inline-color="">"g"</span>),&nbsp;<span data-darkreader-inline-color="">""</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content&nbsp;=&nbsp;content.replace(<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">RegExp</span>(BASE_URI,&nbsp;<span data-darkreader-inline-color="">"g"</span>),&nbsp;baseUriReplacement);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">module</span>.sourceMap)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source.add(<span data-darkreader-inline-color="">new</span>&nbsp;SourceMapSource(content,&nbsp;readableIdentifier,&nbsp;<span data-darkreader-inline-color="">module</span>.sourceMap.toString()));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source.add(<span data-darkreader-inline-color="">new</span>&nbsp;RawSource(content));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ConcatSource(externalsSource,&nbsp;source);<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br><br><span data-darkreader-inline-color="">//&nbsp;进入javascriptModulePlugin的renderManifest&nbsp;callback内</span><br>compilation.hooks.renderManifest.tap(PLUGIN_NAME,&nbsp;(result,&nbsp;options)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;result.push({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">render</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.renderMain(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hash,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunk,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependencyTemplates,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;runtimeTemplate,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;moduleGraph,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunkGraph,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;codeGenerationResults,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">strictMode</span>:&nbsp;runtimeTemplate.isModule()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hooks,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilation<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;renderMain()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;allModules&nbsp;=&nbsp;<span data-darkreader-inline-color="">Array</span>.from(<br>&nbsp;&nbsp;&nbsp;chunkGraph.getOrderedChunkModulesIterableBySourceType(<br>&nbsp;&nbsp;&nbsp;&nbsp;chunk,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"javascript"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;compareModulesByIdentifier<br>&nbsp;&nbsp;&nbsp;)&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;iife&nbsp;?&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;ConcatSource(finalSource,&nbsp;<span data-darkreader-inline-color="">";"</span>)&nbsp;:&nbsp;finalSource;<br>&nbsp;&nbsp;}<br>})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;manifest&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.hooks.renderManifest.call([],&nbsp;options)<br><br><span data-darkreader-inline-color="">//&nbsp;遍历manifest，也就是之前hook&nbsp;callback内传入的result,根据manifest生成最终的asset</span><br>asyncLib.forEach(<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;两个manifest，一个是包含css&nbsp;module的asset，一个是包含js&nbsp;module的asset</span><br>&nbsp;&nbsp;manifest,<br>&nbsp;&nbsp;(fileManifest,&nbsp;callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;source&nbsp;=&nbsp;fileManifest.render();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.emitAsset(file,&nbsp;source,&nbsp;assetInfo);<br>&nbsp;&nbsp;})<br></code>
```

总结起来

-   根据`chunk`生成manifest，然后在根据manifest生成`asset`
    
-   `mini-css-extract-plugin`就是利用`renderManifest` `hook`来从`chunk`中剥离`css module`生成最终的`css asset`
    
-   `webpack`最终在输出文件的时候，是以`assets`来生成文件
    

注意点：

-   `chunk`与`asset`不一定是一对一的关系
    

遍历`chunk`从下图看到，本例只有一个`chunk`，这一个`chunk`包含2个`module`实例，一个是`normalmodule`，一个是`css module` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本例中可以看到`renderManifest` `hook`执行完之后，获得的result包含两个值，一个是生成`css asset`，一个是生成js `asset` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下图中可以看到，生成js `asset`的时候，`css module`被过滤了 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

使用 `webpack`提取 `css` 是一种优化 web 应用程序性能的有效方式。当我们使用许多 `css` 库和框架时，这些库和框架通常会包含大量的 `css` 代码，导致页面加载速度变慢。通过使用 `webpack` 将 `css` 打包成一个单独的文件，我们可以减少页面加载时间，并提高用户体验。

本篇不仅讲述了`webpack`提取`css`的原理，其实也讲到了最基础的`webpack`的通用构建流程，`pitch loader`的运用，`webpack plugin`的运用，所以弄懂`mini-css-extract-plugin`插件相关的原理能够帮助我们更深的了解`webpack`原理同时也可以让我们在面试的过程中能够答出面试官满意的答案

推荐阅读  点击标题可跳转

1、[前端组长应该如何管理前端团队](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617724&idx=1&sn=e0153496371690ce959fba0278e7ad6a&chksm=8022ae7db755276b695af17682da3573ca062a73b7f18c1dc6eb6f396978153789d9a6f8bb74&scene=21#wechat_redirect)

2、[Firefox或将被淘汰](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617723&idx=1&sn=d00aeeaa1f4ea1abdfe311b956d20cfc&chksm=8022ae7ab755276c257e251dbf554f8a436ad78b7c2bc289eee7831932a2c205604d126d624f&scene=21#wechat_redirect)

3、[两行CSS让长列表性能渲染提升7倍！](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617694&idx=1&sn=8085adba6c7af9e3c07693aa27ebc140&chksm=8022ae5fb755274966888e777a9af1dd949908eb1faa1141f9100d6addc9d1dbcb1b863fd70d&scene=21#wechat_redirect)