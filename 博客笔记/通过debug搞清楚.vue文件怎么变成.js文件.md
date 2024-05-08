我们每天写的`vue`代码都是写在`vue`文件中，但是浏览器却只认识`html`、`css`、`js`等文件类型。所以这个时候就需要一个工具将`vue`文件转换为浏览器能够认识的`js`文件，想必你第一时间就想到了`webpack`或者`vite`。但是`webpack`和`vite`本身是没有能力处理`vue`文件的，其实实际背后生效的是vue-loader和@vitejs/plugin-vue。本文以`@vitejs/plugin-vue`举例，通过`debug`的方式带你一步一步的搞清楚`vue`文件是如何编译为`js`文件的，**看不懂你来打我**。

## 举个例子

这个是我的源代码`App.vue`文件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;h1&nbsp;class=<span data-darkreader-inline-color="">"msg"</span>&gt;{{&nbsp;msg&nbsp;}}&lt;/h1&gt;<br>&lt;/template&gt;<br><br>&lt;script&nbsp;setup&nbsp;lang=<span data-darkreader-inline-color="">"ts"</span>&gt;<br>import&nbsp;{&nbsp;ref&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><br>const&nbsp;msg&nbsp;=&nbsp;ref(<span data-darkreader-inline-color="">"hello&nbsp;word"</span>);<br>&lt;/script&gt;<br><br>&lt;style&nbsp;scoped&gt;<br>.msg&nbsp;{<br>&nbsp;&nbsp;color:&nbsp;red;<br>&nbsp;&nbsp;font-weight:&nbsp;bold;<br>}<br>&lt;/style&gt;<br></code>
```

这个例子很简单，在`setup`中定义了`msg`变量，然后在`template`中将`msg`渲染出来。

下面这个是我从`network`中找到的编译后的`js`文件，已经精简过了：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{<br>&nbsp;&nbsp;createElementBlock&nbsp;as&nbsp;_createElementBlock,<br>&nbsp;&nbsp;defineComponent&nbsp;as&nbsp;_defineComponent,<br>&nbsp;&nbsp;openBlock&nbsp;as&nbsp;_openBlock,<br>&nbsp;&nbsp;toDisplayString&nbsp;as&nbsp;_toDisplayString,<br>&nbsp;&nbsp;ref,<br>}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"/node_modules/.vite/deps/vue.js?v=23bfe016"</span>;<br>import&nbsp;<span data-darkreader-inline-color="">"/src/App.vue?vue&amp;type=style&amp;index=0&amp;scoped=7a7a37b1&amp;lang.css"</span>;<br><br>const&nbsp;_sfc_main&nbsp;=&nbsp;_defineComponent({<br>&nbsp;&nbsp;__name:&nbsp;<span data-darkreader-inline-color="">"App"</span>,<br>&nbsp;&nbsp;setup(__props,&nbsp;{&nbsp;expose:&nbsp;__expose&nbsp;})&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;__expose();<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;msg&nbsp;=&nbsp;ref(<span data-darkreader-inline-color="">"hello&nbsp;word"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;__returned__&nbsp;=&nbsp;{&nbsp;msg&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;__returned__;<br>&nbsp;&nbsp;},<br>});<br><br>const&nbsp;_hoisted_1&nbsp;=&nbsp;{&nbsp;class:&nbsp;<span data-darkreader-inline-color="">"msg"</span>&nbsp;};<br><span data-darkreader-inline-color="">function</span>&nbsp;_sfc_render(_ctx,&nbsp;_cache,&nbsp;<span data-darkreader-inline-color="">$props</span>,&nbsp;<span data-darkreader-inline-color="">$setup</span>,&nbsp;<span data-darkreader-inline-color="">$data</span>,&nbsp;<span data-darkreader-inline-color="">$options</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;_openBlock(),<br>&nbsp;&nbsp;&nbsp;&nbsp;_createElementBlock(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"h1"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_hoisted_1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_toDisplayString(<span data-darkreader-inline-color="">$setup</span>.msg),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;TEXT&nbsp;*/<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;);<br>}<br><br>__sfc__.render&nbsp;=&nbsp;render;<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;_sfc_main;<br></code>
```

编译后的`js`代码中我们可以看到主要有三部分，想必你也猜到了这三部分刚好对应`vue`文件的那三块。

-   `_sfc_main`对象的`setup`方法对应`vue`文件中的`<script setup lang="ts">`模块。
    
-   `_sfc_render`函数对应`vue`文件中的`<template>`模块。
    
-   `import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";`对应`vue`文件中的`<style scoped>`模块。
    

## debug搞清楚如何将`vue`文件编译为`js`文件

大家应该都知道，前端代码运行环境主要有两个，`node`端和浏览器端，分别对应我们熟悉的编译时和运行时。浏览器明显是不认识`vue`文件的，所以`vue`文件编译成`js`这一过程肯定不是在运行时的浏览器端。很明显这一过程是在编译时的`node`端。

要在`node`端打断点，我们需要启动一个debug 终端。这里以`vscode`举例，首先我们需要打开终端，然后点击终端中的`+`号旁边的下拉箭头，在下拉中点击`Javascript Debug Terminal`就可以启动一个`debug`终端。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

假如`vue`文件编译为`js`文件是一个毛线团，那么他的线头一定是`vite.config.ts`文件中使用`@vitejs/plugin-vue`的地方。通过这个线头开始`debug`我们就能够梳理清楚完整的工作流程。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## vuePlugin函数

我们给上方图片的`vue`函数打了一个断点，然后在`debug`终端上面执行`yarn dev`，我们看到断点已经停留在了`vue`函数这里。然后点击`step into`，断点走到了`@vitejs/plugin-vue`库中的一个`vuePlugin`函数中。我们看到`vuePlugin`函数中的内容代码大概是这样的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;vuePlugin(rawOptions&nbsp;=&nbsp;{})&nbsp;{<br>const&nbsp;options&nbsp;=&nbsp;shallowRef({<br>&nbsp;&nbsp;&nbsp;&nbsp;compiler:&nbsp;null,<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略...<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">"vite:vue"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;handleHotUpdate(ctx)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;config(config)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;configResolved(config)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;configureServer(server)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">buildStart</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;async&nbsp;resolveId(id)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;load(id,&nbsp;opt)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;transform(code,&nbsp;id,&nbsp;opt)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;..<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>}<br></code>
```

`@vitejs/plugin-vue`是作为一个`plugins`插件在`vite`中使用，`vuePlugin`函数返回的对象中的`buildStart`、`transform`方法就是对应的插件钩子函数。`vite`会在对应的时候调用这些插件的钩子函数，比如当`vite`服务器启动时就会调用插件里面的`buildStart`等函数，当`vite`解析每个模块时就会调用`transform`等函数。更多`vite`钩子相关内容查看官网。

我们这里主要看`buildStart`和`transform`两个钩子函数，分别是服务器启动时调用和解析每个模块时调用。给这两个钩子函数打上断点。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后点击Continue(F5)，`vite`服务启动后就会走到`buildStart`钩子函数中打的断点。我们可以看到`buildStart`钩子函数的代码是这样的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">buildStart</span></span>()&nbsp;{<br>&nbsp;&nbsp;const&nbsp;compiler&nbsp;=&nbsp;options.value.compiler&nbsp;=&nbsp;options.value.compiler&nbsp;||&nbsp;resolveCompiler(options.value.root);<br>}<br></code>
```

将鼠标放到`options.value.compiler`上面我们看到此时`options.value.compiler`的值为`null`，所以代码会走到`resolveCompiler`函数中，点击Step Into(F11)走到`resolveCompiler`函数中。看到`resolveCompiler`函数代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;resolveCompiler(root)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;compiler&nbsp;=&nbsp;tryResolveCompiler(root)&nbsp;||&nbsp;tryResolveCompiler();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;compiler;<br>}<br><br><span data-darkreader-inline-color="">function</span>&nbsp;tryResolveCompiler(root)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;vueMeta&nbsp;=&nbsp;tryRequire(<span data-darkreader-inline-color="">"vue/package.json"</span>,&nbsp;root);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(vueMeta&nbsp;&amp;&amp;&nbsp;vueMeta.version.split(<span data-darkreader-inline-color="">"."</span>)[0]&nbsp;&gt;=&nbsp;3)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;tryRequire(<span data-darkreader-inline-color="">"vue/compiler-sfc"</span>,&nbsp;root);<br>&nbsp;&nbsp;}<br>}<br></code>
```

在`resolveCompiler`函数中调用了`tryResolveCompiler`函数，在`tryResolveCompiler`函数中判断当前项目是否是`vue3.x`版本，然后将`vue/compiler-sfc`包返回。**所以经过初始化后`options.value.compiler`的值就是`vue`的底层库`vue/compiler-sfc`，记住这个后面会用**。

然后点击Continue(F5)放掉断点，在浏览器中打开对应的页面，比如：http://localhost:5173/ 。此时`vite`将会编译这个页面要用到的所有文件，就会走到`transform`钩子函数断点中了。由于解析每个文件都会走到`transform`钩子函数中，但是我们只关注`App.vue`文件是如何解析的，所以为了方便我们直接在`transform`函数中添加了下面这段代码，并且删掉了原来在`transform`钩子函数中打的断点，这样就只有解析到`App.vue`文件的时候才会走到断点中去。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

经过debug我们发现解析`App.vue`文件时`transform`函数实际就是执行了`transformMain`函数，至于`transformStyle`函数后面讲解析`style`的时候会讲：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">transform(code,&nbsp;id,&nbsp;opt)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;{&nbsp;filename,&nbsp;query&nbsp;}&nbsp;=&nbsp;parseVueRequest(id);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!query.vue)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;transformMain(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.value,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;customElementFilter.value(filename)<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;descriptor&nbsp;=&nbsp;query.src&nbsp;?&nbsp;getSrcDescriptor(filename,&nbsp;query)&nbsp;||&nbsp;getTempSrcDescriptor(filename,&nbsp;query)&nbsp;:&nbsp;getDescriptor(filename,&nbsp;options.value);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(query.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">"style"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;transformStyle(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number(query.index&nbsp;||&nbsp;0),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.value,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

## `transformMain`函数

继续debug断点走进`transformMain`函数，发现`transformMain`函数中代码逻辑很清晰。按照顺序分别是：

-   根据源代码code字符串调用`createDescriptor`函数生成一个`descriptor`对象。
    
-   调用`genScriptCode`函数传入第一步生成的`descriptor`对象将`<script setup>`模块编译为浏览器可执行的`js`代码。
    
-   调用`genTemplateCode`函数传入第一步生成的`descriptor`对象将`<template>`模块编译为`render`函数。
    
-   调用`genStyleCode`函数传入第一步生成的`descriptor`对象将`<style scoped>`模块编译为类似这样的`import`语句，`import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";`。
    

### `createDescriptor`函数

我们先来看看`createDescriptor`函数，将断点走到`createDescriptor(filename, code, options)`这一行代码，可以看到传入的`filename`就是`App.vue`的文件路径，`code`就是`App.vue`中我们写的源代码。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`debug`走进`createDescriptor`函数，看到`createDescriptor`函数的代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;createDescriptor(filename,&nbsp;<span data-darkreader-inline-color="">source</span>,&nbsp;{&nbsp;root,&nbsp;isProduction,&nbsp;sourceMap,&nbsp;compiler,&nbsp;template&nbsp;},&nbsp;hmr&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;{&nbsp;descriptor,&nbsp;errors&nbsp;}&nbsp;=&nbsp;compiler.parse(<span data-darkreader-inline-color="">source</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;filename,<br>&nbsp;&nbsp;&nbsp;&nbsp;sourceMap,<br>&nbsp;&nbsp;&nbsp;&nbsp;templateParseOptions:&nbsp;template?.compilerOptions<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;const&nbsp;normalizedPath&nbsp;=&nbsp;slash(path.normalize(path.relative(root,&nbsp;filename)));<br>&nbsp;&nbsp;descriptor.id&nbsp;=&nbsp;getHash(normalizedPath&nbsp;+&nbsp;(isProduction&nbsp;?&nbsp;<span data-darkreader-inline-color="">source</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">""</span>));<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;descriptor,&nbsp;errors&nbsp;};<br>}<br></code>
```

这个`compiler`是不是觉得有点熟悉？`compiler`是调用`createDescriptor`函数时传入的第三个参数解构而来，而第三个参数就是`options`。还记得我们之前在`vite`启动时调用了`buildStart`钩子函数，然后将`vue`底层包`vue/compiler-sfc`赋值给`options`的`compiler`属性。那这里的`compiler.parse`其实就是调用的`vue/compiler-sfc`包暴露出来的`parse`函数，这是一个`vue`暴露出来的底层的`API`，这篇文章我们不会对底层API进行源码解析，通过查看`parse`函数的输入和输出基本就可以搞清楚`parse`函数的作用。下面这个是`parse`函数的类型定义：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;parse(<br><span data-darkreader-inline-color="">source</span>:&nbsp;string,<br>options:&nbsp;SFCParseOptions&nbsp;=&nbsp;{},<br>):&nbsp;SFCParseResult&nbsp;{}<br></code>
```

从上面我们可以看到`parse`函数接收两个参数，第一个参数为`vue`文件的源代码，在我们这里就是`App.vue`中的`code`字符串，第二个参数是一些`options`选项。我们再来看看`parse`函数的返回值`SFCParseResult`，主要有类型为`SFCDescriptor`的`descriptor`属性需要关注。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;SFCParseResult&nbsp;{<br>&nbsp;&nbsp;descriptor:&nbsp;SFCDescriptor<br>&nbsp;&nbsp;errors:&nbsp;(CompilerError&nbsp;|&nbsp;SyntaxError)[]<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;SFCDescriptor&nbsp;{<br>&nbsp;&nbsp;filename:&nbsp;string<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>:&nbsp;string<br>&nbsp;&nbsp;template:&nbsp;SFCTemplateBlock&nbsp;|&nbsp;null<br>&nbsp;&nbsp;script:&nbsp;SFCScriptBlock&nbsp;|&nbsp;null<br>&nbsp;&nbsp;scriptSetup:&nbsp;SFCScriptBlock&nbsp;|&nbsp;null<br>&nbsp;&nbsp;styles:&nbsp;SFCStyleBlock[]<br>&nbsp;&nbsp;customBlocks:&nbsp;SFCBlock[]<br>&nbsp;&nbsp;cssVars:&nbsp;string[]<br>&nbsp;&nbsp;slotted:&nbsp;boolean<br>&nbsp;&nbsp;shouldForceReload:&nbsp;(prevImports:&nbsp;Record&lt;string,&nbsp;ImportBinding&gt;)&nbsp;=&gt;&nbsp;boolean<br>}<br></code>
```

仔细看看`SFCDescriptor`类型，其中的`template`属性就是`App.vue`文件对应的`template`标签中的内容，里面包含了由`App.vue`文件中的`template`模块编译成的`AST抽象语法树`和原始的`template`中的代码。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们再来看`script`和`scriptSetup`属性，由于`vue`文件中可以写多个`script`标签，`scriptSetup`对应的就是有`setup`的`script`标签，`script`对应的就是没有`setup`对应的`script`标签。我们这个场景中只有`scriptSetup`属性，里面同样包含了`App.vue`中的`script`模块中的内容。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们再来看看`styles`属性，这里的`styles`属性是一个数组，是因为我们可以在`vue`文件中写多个`style`模块，里面同样包含了`App.vue`中的`style`模块中的内容。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以这一步执行`createDescriptor`函数生成的`descriptor`对象中主要有三个属性，`template`属性包含了`App.vue`文件中的`template`模块`code`字符串和`AST抽象语法树`，`scriptSetup`属性包含了`App.vue`文件中的`<script setup>`模块的`code`字符串，`styles`属性包含了`App.vue`文件中`<style>`模块中的`code`字符串。`createDescriptor`函数的执行流程图如下：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### `genScriptCode`函数

我们再来看`genScriptCode`函数是如何将`<script setup>`模块编译成可执行的`js`代码，同样将断点走到调用`genScriptCode`函数的地方，`genScriptCode`函数主要接收我们上一步生成的`descriptor`对象，调用`genScriptCode`函数后会将编译后的`script`模块代码赋值给`scriptCode`变量。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;{&nbsp;code:&nbsp;scriptCode,&nbsp;map:&nbsp;scriptMap&nbsp;}&nbsp;=&nbsp;await&nbsp;genScriptCode(<br>&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;options,<br>&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;customElement<br>);<br></code>
```

将断点走到`genScriptCode`函数内部，在`genScriptCode`函数中主要就是这行代码： `const script = resolveScript(descriptor, options, ssr, customElement);`。将第一步生成的`descriptor`对象作为参数传给`resolveScript`函数，返回值就是编译后的`js`代码，`genScriptCode`函数的代码简化后如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;genScriptCode(descriptor,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;scriptCode&nbsp;=&nbsp;`const&nbsp;<span data-darkreader-inline-color="">${scriptIdentifier}</span>&nbsp;=&nbsp;{}`;<br>&nbsp;&nbsp;const&nbsp;script&nbsp;=&nbsp;resolveScript(descriptor,&nbsp;options,&nbsp;ssr,&nbsp;customElement);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(script)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;scriptCode&nbsp;=&nbsp;script.content;<br>&nbsp;&nbsp;&nbsp;&nbsp;map&nbsp;=&nbsp;script.map;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;code:&nbsp;scriptCode,<br>&nbsp;&nbsp;&nbsp;&nbsp;map<br>&nbsp;&nbsp;};<br>}<br></code>
```

我们继续将断点走到`resolveScript`函数内部，发现`resolveScript`中的代码其实也很简单，简化后的代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;resolveScript(descriptor,&nbsp;options,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;resolved&nbsp;=&nbsp;null;<br>&nbsp;&nbsp;resolved&nbsp;=&nbsp;options.compiler.compileScript(descriptor,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;...options.script,<br>&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;descriptor.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;isProd:&nbsp;options.isProduction,<br>&nbsp;&nbsp;&nbsp;&nbsp;inlineTemplate:&nbsp;isUseInlineTemplate(descriptor,&nbsp;!options.devServer),<br>&nbsp;&nbsp;&nbsp;&nbsp;templateOptions:&nbsp;resolveTemplateCompilerOptions(descriptor,&nbsp;options,&nbsp;ssr),<br>&nbsp;&nbsp;&nbsp;&nbsp;sourceMap:&nbsp;options.sourceMap,<br>&nbsp;&nbsp;&nbsp;&nbsp;genDefaultAs:&nbsp;canInlineMain(descriptor,&nbsp;options)&nbsp;?&nbsp;scriptIdentifier&nbsp;:&nbsp;void&nbsp;0,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;resolved;<br>}<br></code>
```

这里的`options.compiler`我们前面第一步的时候已经解释过了，`options.compiler`对象实际就是`vue`底层包`vue/compiler-sfc`暴露的对象，这里的`options.compiler.compileScript()`其实就是调用的`vue/compiler-sfc`包暴露出来的`compileScript`函数，同样也是一个`vue`暴露出来的底层的`API`，后面我们的分析`defineOptions`等文章时会去深入分析`compileScript`函数，这篇文章我们不会去读`compileScript`函数的源码。通过查看`compileScript`函数的输入和输出基本就可以搞清楚`compileScript`函数的作用。下面这个是`compileScript`函数的类型定义：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;compileScript(<br>&nbsp;&nbsp;sfc:&nbsp;SFCDescriptor,<br>&nbsp;&nbsp;options:&nbsp;SFCScriptCompileOptions,<br>):&nbsp;SFCScriptBlock{}<br></code>
```

这个函数的入参是一个`SFCDescriptor`对象，就是我们第一步调用生成`createDescriptor`函数生成的`descriptor`对象，第二个参数是一些`options`选项。我们再来看返回值`SFCScriptBlock`类型：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;SFCScriptBlock&nbsp;extends&nbsp;SFCBlock&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'script'</span><br>&nbsp;&nbsp;setup?:&nbsp;string&nbsp;|&nbsp;boolean<br>&nbsp;&nbsp;bindings?:&nbsp;BindingMetadata<br>&nbsp;&nbsp;imports?:&nbsp;Record&lt;string,&nbsp;ImportBinding&gt;<br>&nbsp;&nbsp;scriptAst?:&nbsp;import(<span data-darkreader-inline-color="">'@babel/types'</span>).Statement[]<br>&nbsp;&nbsp;scriptSetupAst?:&nbsp;import(<span data-darkreader-inline-color="">'@babel/types'</span>).Statement[]<br>&nbsp;&nbsp;warnings?:&nbsp;string[]<br>&nbsp;&nbsp;/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Fully&nbsp;resolved&nbsp;dependency&nbsp;file&nbsp;paths&nbsp;(unix&nbsp;slashes)&nbsp;with&nbsp;imported&nbsp;types<br>&nbsp;&nbsp;&nbsp;*&nbsp;used&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;macros,&nbsp;used&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;HMR&nbsp;cache&nbsp;busting&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;@vitejs/plugin-vue&nbsp;and<br>&nbsp;&nbsp;&nbsp;*&nbsp;vue-loader.<br>&nbsp;&nbsp;&nbsp;*/<br>&nbsp;&nbsp;deps?:&nbsp;string[]<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;SFCBlock&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;string<br>&nbsp;&nbsp;content:&nbsp;string<br>&nbsp;&nbsp;attrs:&nbsp;Record&lt;string,&nbsp;string&nbsp;|&nbsp;<span data-darkreader-inline-color="">true</span>&gt;<br>&nbsp;&nbsp;loc:&nbsp;SourceLocation<br>&nbsp;&nbsp;map?:&nbsp;RawSourceMap<br>&nbsp;&nbsp;lang?:&nbsp;string<br>&nbsp;&nbsp;src?:&nbsp;string<br>}<br></code>
```

返回值类型中主要有`scriptAst`、`scriptSetupAst`、`content`这三个属性，`scriptAst`为编译不带`setup`属性的`script`标签生成的AST抽象语法树。`scriptSetupAst`为编译带`setup`属性的`script`标签生成的AST抽象语法树，`content`为`vue`文件中的`script`模块编译后生成的浏览器可执行的`js`代码。下面这个是执行`vue/compiler-sfc`的`compileScript`函数返回结果：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续将断点走回`genScriptCode`函数，现在逻辑就很清晰了。这里的`script`对象就是调用`vue/compiler-sfc`的`compileScript`函数返回对象，`scriptCode`就是`script`对象的`content`属性 ，也就是将`vue`文件中的`script`模块经过编译后生成浏览器可直接执行的`js`代码`code`字符串。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;genScriptCode(descriptor,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;scriptCode&nbsp;=&nbsp;`const&nbsp;<span data-darkreader-inline-color="">${scriptIdentifier}</span>&nbsp;=&nbsp;{}`;<br>&nbsp;&nbsp;const&nbsp;script&nbsp;=&nbsp;resolveScript(descriptor,&nbsp;options,&nbsp;ssr,&nbsp;customElement);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(script)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;scriptCode&nbsp;=&nbsp;script.content;<br>&nbsp;&nbsp;&nbsp;&nbsp;map&nbsp;=&nbsp;script.map;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;code:&nbsp;scriptCode,<br>&nbsp;&nbsp;&nbsp;&nbsp;map<br>&nbsp;&nbsp;};<br>}<br></code>
```

`genScriptCode`函数的执行流程图如下：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### `genTemplateCode`函数

我们再来看`genTemplateCode`函数是如何将`template`模块编译成`render`函数的，同样将断点走到调用`genTemplateCode`函数的地方，`genTemplateCode`函数主要接收我们上一步生成的`descriptor`对象，调用`genTemplateCode`函数后会将编译后的`template`模块代码赋值给`templateCode`变量。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">({&nbsp;code:&nbsp;templateCode,&nbsp;map:&nbsp;templateMap&nbsp;}&nbsp;=&nbsp;await&nbsp;genTemplateCode(<br>&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;options,<br>&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;customElement<br>))<br></code>
```

同样将断点走到`genTemplateCode`函数内部，在`genTemplateCode`函数中主要就是返回`transformTemplateInMain`函数的返回值，`genTemplateCode`函数的代码简化后如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;genTemplateCode(descriptor,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;template&nbsp;=&nbsp;descriptor.template;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;transformTemplateInMain(<br>&nbsp;&nbsp;&nbsp;&nbsp;template.content,<br>&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;options,<br>&nbsp;&nbsp;&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement<br>&nbsp;&nbsp;);<br>}<br></code>
```

我们继续将断点走进`transformTemplateInMain`函数，发现这里也主要是调用`compile`函数，代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;transformTemplateInMain(code,&nbsp;descriptor,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;result&nbsp;=&nbsp;compile(<br>&nbsp;&nbsp;&nbsp;&nbsp;code,<br>&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;options,<br>&nbsp;&nbsp;&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;...result,<br>&nbsp;&nbsp;&nbsp;&nbsp;code:&nbsp;result.code.replace(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\nexport&nbsp;(<span data-darkreader-inline-color="">function</span>|const)&nbsp;(render|ssrRender)/,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"\n<span data-darkreader-inline-color="">$1</span>&nbsp;_sfc_<span data-darkreader-inline-color="">$2</span>"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;};<br>}<br></code>
```

同理将断点走进到`compile`函数内部，我们看到`compile`函数的代码是下面这样的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">function</span>&nbsp;compile(code,&nbsp;descriptor,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;result&nbsp;=&nbsp;options.compiler.compileTemplate({<br>&nbsp;&nbsp;&nbsp;&nbsp;...resolveTemplateCompilerOptions(descriptor,&nbsp;options,&nbsp;ssr),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>:&nbsp;code<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;result;<br>}<br></code>
```

同样这里也用到了`options.compiler`，调用`options.compiler.compileTemplate()`其实就是调用的`vue/compiler-sfc`包暴露出来的`compileTemplate`函数，这也是一个`vue`暴露出来的底层的`API`。不过这里和前面不同的是`compileTemplate`接收的不是`descriptor`对象，而是一个`SFCTemplateCompileOptions`类型的对象，所以这里需要调用`resolveTemplateCompilerOptions`函数将参数转换成`SFCTemplateCompileOptions`类型的对象。这篇文章我们不会对底层API进行解析。通过查看`compileTemplate`函数的输入和输出基本就可以搞清楚`compileTemplate`函数的作用。下面这个是`compileTemplate`函数的类型定义：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;compileTemplate(<br>&nbsp;&nbsp;options:&nbsp;SFCTemplateCompileOptions,<br>):&nbsp;SFCTemplateCompileResults&nbsp;{}<br></code>
```

入参`options`主要就是需要编译的`template`中的源代码和对应的`AST抽象语法树`。我们来看看返回值`SFCTemplateCompileResults`，这里面的`code`就是编译后的`render`函数字符串。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;SFCTemplateCompileResults&nbsp;{<br>&nbsp;&nbsp;code:&nbsp;string<br>&nbsp;&nbsp;ast?:&nbsp;RootNode<br>&nbsp;&nbsp;preamble?:&nbsp;string<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>:&nbsp;string<br>&nbsp;&nbsp;tips:&nbsp;string[]<br>&nbsp;&nbsp;errors:&nbsp;(string&nbsp;|&nbsp;CompilerError)[]<br>&nbsp;&nbsp;map?:&nbsp;RawSourceMap<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

render

`genTemplateCode`函数的执行流程图如下：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### `genStyleCode`函数

我们再来看最后一个`genStyleCode`函数，同样将断点走到调用`genStyleCode`的地方。一样的接收`descriptor`对象。代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;stylesCode&nbsp;=&nbsp;await&nbsp;genStyleCode(<br>&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;customElement,<br>&nbsp;&nbsp;attachedProps<br>);<br></code>
```

我们将断点走进`genStyleCode`函数内部，发现和前面`genScriptCode`和`genTemplateCode`函数有点不一样，下面这个是我简化后的`genStyleCode`函数代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;genStyleCode(descriptor,&nbsp;pluginContext,&nbsp;customElement,&nbsp;attachedProps)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;stylesCode&nbsp;=&nbsp;``;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(descriptor.styles.length)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">let</span>&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;descriptor.styles.length;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;style&nbsp;=&nbsp;descriptor.styles[i];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;src&nbsp;=&nbsp;style.src&nbsp;||&nbsp;descriptor.filename;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;attrsQuery&nbsp;=&nbsp;attrsToQuery(style.attrs,&nbsp;<span data-darkreader-inline-color="">"css"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;srcQuery&nbsp;=&nbsp;style.src&nbsp;?&nbsp;style.scoped&nbsp;?&nbsp;`&amp;src=<span data-darkreader-inline-color="">${descriptor.id}</span>`&nbsp;:&nbsp;<span data-darkreader-inline-color="">"&amp;src=true"</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;directQuery&nbsp;=&nbsp;customElement&nbsp;?&nbsp;`&amp;inline`&nbsp;:&nbsp;``;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;scopedQuery&nbsp;=&nbsp;style.scoped&nbsp;?&nbsp;`&amp;scoped=<span data-darkreader-inline-color="">${descriptor.id}</span>`&nbsp;:&nbsp;``;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;query&nbsp;=&nbsp;`?vue&amp;<span data-darkreader-inline-color="">type</span>=style&amp;index=<span data-darkreader-inline-color="">${i}</span><span data-darkreader-inline-color="">${srcQuery}</span><span data-darkreader-inline-color="">${directQuery}</span><span data-darkreader-inline-color="">${scopedQuery}</span>`;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;styleRequest&nbsp;=&nbsp;src&nbsp;+&nbsp;query&nbsp;+&nbsp;attrsQuery;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stylesCode&nbsp;+=&nbsp;`<br>import&nbsp;<span data-darkreader-inline-color="">${JSON.stringify(styleRequest)}</span>`;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;stylesCode;<br>}<br></code>
```

我们前面讲过因为`vue`文件中可能会有多个`style`标签，所以`descriptor`对象的`styles`属性是一个数组。遍历`descriptor.styles`数组，我们发现`for`循环内全部都是一堆赋值操作，没有调用`vue/compiler-sfc`包暴露出来的任何`API`。将断点走到 `return stylesCode;`，看看`stylesCode`到底是什么东西？![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过打印我们发现`stylesCode`竟然变成了一条`import`语句，并且`import`的还是当前`App.vue`文件，只是多了几个`query`分别是：`vue`、`type`、`index`、`scoped`、`lang`。再来回忆一下前面讲的`@vitejs/plugin-vue`的`transform`钩子函数，当`vite`解析每个模块时就会调用`transform`等函数。所以当代码运行到这行`import`语句的时候会再次走到`transform`钩子函数中。我们再来看看`transform`钩子函数的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">transform(code,&nbsp;id,&nbsp;opt)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;{&nbsp;filename,&nbsp;query&nbsp;}&nbsp;=&nbsp;parseVueRequest(id);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!query.vue)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;descriptor&nbsp;=&nbsp;query.src&nbsp;?&nbsp;getSrcDescriptor(filename,&nbsp;query)&nbsp;||&nbsp;getTempSrcDescriptor(filename,&nbsp;query)&nbsp;:&nbsp;getDescriptor(filename,&nbsp;options.value);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(query.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">"style"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;transformStyle(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number(query.index&nbsp;||&nbsp;0),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.value,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br></code>
```

当`query`中有`vue`字段，并且`query`中`type`字段值为`style`时就会执行`transformStyle`函数，我们给`transformStyle`函数打个断点。当执行上面那条`import`语句时就会走到断点中，我们进到`transformStyle`中看看。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;transformStyle(code,&nbsp;descriptor,&nbsp;index,&nbsp;options,&nbsp;pluginContext,&nbsp;filename)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;block&nbsp;=&nbsp;descriptor.styles[index];<br>&nbsp;&nbsp;const&nbsp;result&nbsp;=&nbsp;await&nbsp;options.compiler.compileStyleAsync({<br>&nbsp;&nbsp;&nbsp;&nbsp;...options.style,<br>&nbsp;&nbsp;&nbsp;&nbsp;filename:&nbsp;descriptor.filename,<br>&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;`data-v-<span data-darkreader-inline-color="">${descriptor.id}</span>`,<br>&nbsp;&nbsp;&nbsp;&nbsp;isProd:&nbsp;options.isProduction,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>:&nbsp;code,<br>&nbsp;&nbsp;&nbsp;&nbsp;scoped:&nbsp;block.scoped,<br>&nbsp;&nbsp;&nbsp;&nbsp;...options.cssDevSourcemap&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;postcssOptions:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from:&nbsp;filename,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inline:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;annotation:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;:&nbsp;{}<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;code:&nbsp;result.code,<br>&nbsp;&nbsp;&nbsp;&nbsp;map<br>&nbsp;&nbsp;};<br>}<br></code>
```

`transformStyle`函数的实现我们看着就很熟悉了，和前面处理`template`和`script`一样都是调用的`vue/compiler-sfc`包暴露出来的`compileStyleAsync`函数，这也是一个`vue`暴露出来的底层的`API`。同样我们不会对底层API进行解析。通过查看`compileStyleAsync`函数的输入和输出基本就可以搞清楚`compileStyleAsync`函数的作用。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;compileStyleAsync(<br>&nbsp;&nbsp;options:&nbsp;SFCAsyncStyleCompileOptions,<br>):&nbsp;Promise&lt;SFCStyleCompileResults&gt;&nbsp;{}<br></code>
```

我们先来看看`SFCAsyncStyleCompileOptions`入参：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">interface&nbsp;SFCAsyncStyleCompileOptions&nbsp;extends&nbsp;SFCStyleCompileOptions&nbsp;{<br>&nbsp;&nbsp;isAsync?:&nbsp;boolean<br>&nbsp;&nbsp;modules?:&nbsp;boolean<br>&nbsp;&nbsp;modulesOptions?:&nbsp;CSSModulesOptions<br>}<br><br>interface&nbsp;SFCStyleCompileOptions&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">source</span>:&nbsp;string<br>&nbsp;&nbsp;filename:&nbsp;string<br>&nbsp;&nbsp;id:&nbsp;string<br>&nbsp;&nbsp;scoped?:&nbsp;boolean<br>&nbsp;&nbsp;trim?:&nbsp;boolean<br>&nbsp;&nbsp;isProd?:&nbsp;boolean<br>&nbsp;&nbsp;inMap?:&nbsp;RawSourceMap<br>&nbsp;&nbsp;preprocessLang?:&nbsp;PreprocessLang<br>&nbsp;&nbsp;preprocessOptions?:&nbsp;any<br>&nbsp;&nbsp;preprocessCustomRequire?:&nbsp;(id:&nbsp;string)&nbsp;=&gt;&nbsp;any<br>&nbsp;&nbsp;postcssOptions?:&nbsp;any<br>&nbsp;&nbsp;postcssPlugins?:&nbsp;any[]<br>&nbsp;&nbsp;map?:&nbsp;RawSourceMap<br>}<br></code>
```

入参主要关注几个字段，`source`字段为`style`标签中的`css`原始代码。`scoped`字段为`style`标签中是否有`scoped` attribute。`id`字段为我们在观察 DOM 结构时看到的 `data-v-xxxxx`。这个是`debug`时入参截图：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

再来看看返回值`SFCStyleCompileResults`对象，主要就是`code`属性，这个是经过编译后的`css`字符串，已经加上了`data-v-xxxxx`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">interface&nbsp;SFCStyleCompileResults&nbsp;{<br>&nbsp;&nbsp;code:&nbsp;string<br>&nbsp;&nbsp;map:&nbsp;RawSourceMap&nbsp;|&nbsp;undefined<br>&nbsp;&nbsp;rawResult:&nbsp;Result&nbsp;|&nbsp;LazyResult&nbsp;|&nbsp;undefined<br>&nbsp;&nbsp;errors:&nbsp;Error[]<br>&nbsp;&nbsp;modules?:&nbsp;Record&lt;string,&nbsp;string&gt;<br>&nbsp;&nbsp;dependencies:&nbsp;Set&lt;string&gt;<br>}<br></code>
```

这个是`debug`时`compileStyleAsync`函数返回值的截图：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`genStyleCode`函数的执行流程图如下：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### `transformMain`函数简化后的代码

现在我们可以来看`transformMain`函数简化后的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;transformMain(code,&nbsp;filename,&nbsp;options,&nbsp;pluginContext,&nbsp;ssr,&nbsp;customElement)&nbsp;{<br>&nbsp;&nbsp;const&nbsp;{&nbsp;descriptor,&nbsp;errors&nbsp;}&nbsp;=&nbsp;createDescriptor(filename,&nbsp;code,&nbsp;options);<br><br>&nbsp;&nbsp;const&nbsp;{&nbsp;code:&nbsp;scriptCode,&nbsp;map:&nbsp;scriptMap&nbsp;}&nbsp;=&nbsp;await&nbsp;genScriptCode(<br>&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;options,<br>&nbsp;&nbsp;&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement<br>&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;templateCode&nbsp;=&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;({&nbsp;code:&nbsp;templateCode,&nbsp;map:&nbsp;templateMap&nbsp;}&nbsp;=&nbsp;await&nbsp;genTemplateCode(<br>&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;options,<br>&nbsp;&nbsp;&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;&nbsp;&nbsp;ssr,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement<br>&nbsp;&nbsp;));<br><br>&nbsp;&nbsp;const&nbsp;stylesCode&nbsp;=&nbsp;await&nbsp;genStyleCode(<br>&nbsp;&nbsp;&nbsp;&nbsp;descriptor,<br>&nbsp;&nbsp;&nbsp;&nbsp;pluginContext,<br>&nbsp;&nbsp;&nbsp;&nbsp;customElement,<br>&nbsp;&nbsp;&nbsp;&nbsp;attachedProps<br>&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;const&nbsp;output&nbsp;=&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;scriptCode,<br>&nbsp;&nbsp;&nbsp;&nbsp;templateCode,<br>&nbsp;&nbsp;&nbsp;&nbsp;stylesCode<br>&nbsp;&nbsp;];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;resolvedCode&nbsp;=&nbsp;output.join(<span data-darkreader-inline-color="">"\n"</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;code:&nbsp;resolvedCode,<br>&nbsp;&nbsp;&nbsp;&nbsp;map:&nbsp;resolvedMap&nbsp;||&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mappings:&nbsp;<span data-darkreader-inline-color="">""</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;meta:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vite:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lang:&nbsp;descriptor.script?.lang&nbsp;||&nbsp;descriptor.scriptSetup?.lang&nbsp;||&nbsp;<span data-darkreader-inline-color="">"js"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;};<br>}<br></code>
```

`transformMain`函数中的代码执行主流程，其实就是对应了一个`vue`文件编译成`js`文件的流程。

首先调用`createDescriptor`函数将一个`vue`文件解析为一个`descriptor`对象。

然后以`descriptor`对象为参数调用`genScriptCode`函数，将`vue`文件中的`<script>`模块代码编译成浏览器可执行的`js`代码`code`字符串，赋值给`scriptCode`变量。

接着以`descriptor`对象为参数调用`genTemplateCode`函数，将`vue`文件中的`<template>`模块代码编译成`render`函数`code`字符串，赋值给`templateCode`变量。

然后以`descriptor`对象为参数调用`genStyleCode`函数，将`vue`文件中的`<style>`模块代码编译成了`import`语句`code`字符串，比如：`import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";`，赋值给`stylesCode`变量。

然后将`scriptCode`、`templateCode`、`stylesCode`使用换行符`\n`拼接起来得到`resolvedCode`，这个`resolvedCode`就是一个`vue`文件编译成`js`文件的代码`code`字符串。这个是`debug`时`resolvedCode`变量值的截图：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

这篇文章通过`debug`的方式一步一步的带你了解`vue`文件编译成`js`文件的完整流程，下面是一个完整的流程图。如果文字太小看不清，可以将图片保存下来或者放大看：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`@vitejs/plugin-vue-jsx`库中有个叫`transform`的钩子函数，每当`vite`加载模块的时候就会触发这个钩子函数。所以当`import`一个`vue`文件的时候，就会走到`@vitejs/plugin-vue-jsx`中的`transform`钩子函数中，在`transform`钩子函数中主要调用了`transformMain`函数。

第一次解析这个`vue`文件时，在`transform`钩子函数中主要调用了`transformMain`函数。在`transformMain`函数中主要调用了4个函数，分别是：`createDescriptor`、`genScriptCode`、`genTemplateCode`、`genStyleCode`。

`createDescriptor`接收的参数为当前`vue`文件代码`code`字符串，返回值为一个`descriptor`对象。对象中主要有四个属性`template`、`scriptSetup`、`script`、`styles`。

-   `descriptor.template.ast`就是由`vue`文件中的`template`模块生成的`AST抽象语法树`。
    
-   `descriptor.template.content`就是`vue`文件中的`template`模块的代码字符串。
    
-   `scriptSetup`和`script`的区别是分别对应的是`vue`文件中有`setup`属性的`<script>`模块和无`setup`属性的`<script>`模块。`descriptor.scriptSetup.content`就是`vue`文件中的`<script setup>`模块的代码字符串。
    

`genScriptCode`函数为底层调用`vue/compiler-sfc`的`compileScript`函数，根据第一步的`descriptor`对象将`vue`文件的`<script setup>`模块转换为浏览器可直接执行的`js`代码。

`genTemplateCode`函数为底层调用`vue/compiler-sfc`的`compileTemplate`函数，根据第一步的`descriptor`对象将`vue`文件的`<template>`模块转换为`render`函数。

`genStyleCode`函数为将`vue`文件的`style`模块转换为`import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";`样子的`import`语句。

然后使用换行符`\n`将`genScriptCode`函数、`genTemplateCode`函数、`genStyleCode`函数的返回值拼接起来赋值给变量`resolvedCode`，这个`resolvedCode`就是`vue`文件编译成`js`文件的`code`字符串。

当浏览器执行到`import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";`语句时，触发了加载模块操作，再次触发了`@vitejs/plugin-vue-jsx`中的`transform`钩子函数。此时由于有了`type=style`的`query`，所以在`transform`函数中会执行`transformStyle`函数，在`transformStyle`函数中同样也是调用`vue/compiler-sfc`的`compileStyleAsync`函数，根据第一步的`descriptor`对象将`vue`文件的`<style>`模块转换为编译后的`css`代码`code`字符串，至此编译`style`部分也讲完了。

\- END \-

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**敬请关注「Nodejs技术栈」微信公众号，期望与志同道合的你一起打造优质 “Nodejs技术栈” 交流群，一起互相学习进步！可长按下方二维码添加【五月君】个人微信备注 “Node” 邀请入群。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)