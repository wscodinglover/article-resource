大厂技术  高级前端  Node进阶

点击上方 程序员成长指北，关注公众号  

回复1，加入高级Node交流群

## 前言

大家好，我是易师傅，在现如今 `vite` 工具快开始盛行之下，我们是不是可以去做一件有意义的事呢，比如写一个 `vite 插件`，你觉得怎么样？

刚好我们可以趁 `vite 插件` 生态还未很成熟阶段，做一个让自己顺心，让领导赏心，让社区开心的插件，与之携手共进。

如果大家对 vite 感兴趣可以去看看专栏： 《Vite 从入门到精通》：juejin.cn/column/7074954144817086472\[1\]

## 通过本文你可以学到

-   如何创建一个 `vite 插件模板`
    
-   vite 插件的 `各个钩子作用`
    
-   vite 插件的 `钩子执行顺序`
    
-   如何写一个自己的插件
    

## 了解 vite 插件

## 1\. 什么是 vite 插件

`vite` 其实就是一个由原生 `ES Module` 驱动的新型 Web 开发前端构建工具。

`vite 插件` 就可以很好的扩展 `vite` 自身不能做到的事情，比如 `文件图片的压缩`、 `对 commonjs 的支持`、 `打包进度条` 等等。

## 2\. 为什么要写 vite 插件

相信在座的每位同学，到现在对 `webpack` 的相关配置以及常用插件都了如指掌了吧；

`vite` 作为一个新型的前端构建工具，它还很年轻，也有很多扩展性，那么为什么我们不趁现在与它一起携手前进呢？做一些于你于我于大家更有意义的事呢？

## 快速体验

要想写一个插件，那必须从创建一个项目开始，下面的 `vite 插件通用模板` 大家以后写插件可以直接clone使用；

插件通用模板 github：体验入口：github.com/jeddygong/vite-templates/tree/master/vite-plugin-template\[2\]

插件 github：体验入口：github.com/jeddygong/vite-plugin-progress\[3\]

> 建议包管理器使用优先级：pnpm > yarn > npm > cnpm

长话短说，直接开干 ~

## 创建 `vite 插件通用模板`

## 1\. 初始化

**1.1** 创建一个文件夹并且初始化：初始化按照提示操作即可

```
mkdir&nbsp;vite-plugin-progress&nbsp;&amp;&amp;&nbsp;<span data-darkreader-inline-color="">cd</span>&nbsp;vite-plugin-progress&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;init&nbsp;<br>复制代码<br>
```

**1.2** 安装 `typescript`

```
pnpm&nbsp;i&nbsp;typescript&nbsp;@types/node&nbsp;-D<br>复制代码<br>
```

**1.3** 配置 `tsconfig.json`

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"compilerOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"module"</span>:&nbsp;<span data-darkreader-inline-color="">"ESNext"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"target"</span>:&nbsp;<span data-darkreader-inline-color="">"esnext"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"moduleResolution"</span>:&nbsp;<span data-darkreader-inline-color="">"node"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"strict"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"declaration"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noUnusedLocals"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esModuleInterop"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"outDir"</span>:&nbsp;<span data-darkreader-inline-color="">"dist"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"lib"</span>:&nbsp;[<span data-darkreader-inline-color="">"ESNext"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"sourceMap"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noEmitOnError"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noImplicitAny"</span>:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"include"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"src/*"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"*.d.ts"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"exclude"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"node_modules"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"examples"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dist"</span><br>&nbsp;&nbsp;]<br>}<br>复制代码<br>
```

**1.4** 安装 `vite`

```
<span data-darkreader-inline-color="">//&nbsp;进入&nbsp;package.json</span><br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"devDependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vite"</span>:&nbsp;<span data-darkreader-inline-color="">"*"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>复制代码<br>
```

## 2\. 配置 `eslint` 和 `prettier`（可选）

1.  安装 `eslint`
    

```
pnpm&nbsp;i&nbsp;eslint&nbsp;@typescript-eslint/parser&nbsp;@typescript-eslint/eslint-plugin&nbsp;--save-dev<br>
```

2.  配置 `.eslintrc`：配置连接\[4\]
    
3.  安装 `prettier` （可选）
    

```
pnpm&nbsp;i&nbsp;prettier&nbsp;eslint-config-prettier&nbsp;eslint-plugin-prettier&nbsp;--save-dev<br><br>
```

4.  配置 `.prettierrc` ：配置连接\[5\]
    

## 3\. 新增 `src/index.ts` 入口

```
import type { PluginOption } from 'vite';<br><br>export default function vitePluginTemplate(): PluginOption {<br>  return {<br>    // 插件名称<br>    name: 'vite-plugin-template',<br><br>    // pre 会较于 post 先执行<br>    enforce: 'pre', // post<br><br>    // 指明它们仅在 'build' 或 'serve' 模式时调用<br>    apply: 'build', // apply 亦可以是一个函数<br><br>    config(config, { command }) {<br>      console.log('这里是config钩子');<br>    },<br><br>    configResolved(resolvedConfig) {<br>      console.log('这里是configResolved钩子');<br>    },<br><br>    configureServer(server) {<br>      console.log('这里是configureServer钩子');<br>    },<br><br>    transformIndexHtml(html) {<br>      console.log('这里是transformIndexHtml钩子');<br>    },<br>  }<br>}<br>复制代码<br>
```

**其中的 vite 插件函数钩子会在下面详细详解 ~**

到这里，那么我们的基本模版就建好了，但是我们现在思考一下，我们应该怎么去运行这个插件呢？

那么我们就需要创建一些 `examples` 例子来运行这个代码了；

## 4\. 创建 examples 目录

我这里创建了三套项目 demo，大家直接 copy 就行了，这里就不详细介绍了

1.  vite-react：github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-react\[6\]
    
2.  vite-vue2：github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-vue2\[7\]
    
3.  vite-vue3：github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-vue3\[8\]
    

如果你的插件需要多跑一些 demo，自行创建项目即可；

**那么下面我们就需要配置 examples 下的项目与当前根目录的插件做一个联调了（下面以 `examples/vite-vue3` 为例）。**

## 5\. 配置 `examples/vite-vue3` 项目

1.  修改 `examples/vite-vue3/package.json`
    

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"devDependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vite"</span>:&nbsp;<span data-darkreader-inline-color="">"link:../../node_modules/vite"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vite-plugin-template"</span>:&nbsp;<span data-darkreader-inline-color="">"link:../../"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

**上面意思就是说：**

-   要把 `examples/vite-vue3` 项目中的 vite 版本与根目录 `vite-plugin-template` 的版本一致；
    
-   同时要把 `examples/vite-vue3` 项目中的 `vite-plugin-template` 指向你当前根目录所开发的插件；
    

2.  引入插件： `examples/vite-vue3/vite.config.ts`
    

```
import template from 'vite-plugin-template';<br><br>export default defineConfig({<br>    ...<br>    plugins: [vue(), template()],<br>    ...<br>});<br>
```

3.  安装： `cd examples/vite-vue3 && pnpm install`
    

```
<span data-darkreader-inline-color="">cd</span>&nbsp;examples/vite-vue3&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;install<br><br>
```

> **注意：** `examples/vite-vue2` 和 `examples/vite-react` 的配置与这一致

**思考：**

到这里，我们再思考一下，我们把 `examples/vite-vue3` 中的项目配置好了，但是我们应该怎么去运行呢？

直接去 `examples/vite-vue3` 目录下运行 `pnpm run build` 或者 `pnpm run dev` ？

这样显然是不能运行成功的，因为我们的根目录下的 `src/index.ts` 是没法直接运行的，所以我们需要把 `.ts` 文件转义成 `.js` 文件；

那么我们怎么处理呢？

那么我们不得不去试着用用一个轻小且无需配置的工具 `tsup` 了。

## 6\. 安装 `tsup` 配置运行命令

`tsup` 是一个轻小且无需配置的，由 `esbuild` 支持的构建工具；

同时它可以直接把 `.ts、.tsx` 转成不同格式 `esm、cjs、iife` 的工具；

1.  安装 `tsup`
    

```
pnpm&nbsp;i&nbsp;tsup&nbsp;-D<br>
```

2.  在根目录下的 `package.json` 中配置
    

```
{<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dev"</span>:&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;run&nbsp;build&nbsp;--&nbsp;--watch&nbsp;--ignore-watch&nbsp;examples"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"tsup&nbsp;src/index.ts&nbsp;--dts&nbsp;--format&nbsp;cjs,esm"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"example:react"</span>:&nbsp;<span data-darkreader-inline-color="">"cd&nbsp;examples/vite-react&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;run&nbsp;build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"example:vue2"</span>:&nbsp;<span data-darkreader-inline-color="">"cd&nbsp;examples/vite-vue2&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;run&nbsp;build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"example:vue3"</span>:&nbsp;<span data-darkreader-inline-color="">"cd&nbsp;examples/vite-vue3&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;run&nbsp;build"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;...<br>}<br>
```

## 7\. 开发环境运行

1.  `开发环境运行`：实时监听文件修改后重新打包（热更新）
    

```
pnpm&nbsp;run&nbsp;dev<br>
```

2.  运行 `examples` 中的任意一个项目（以 vite-vue3 为例）
    

```
pnpm&nbsp;run&nbsp;example:vue3<br>
```

**注意：**

> 如果你的插件只会在 build 时运行，那就设置 `"example:vue3": "cd examples/vite-vue3 && pnpm run build"` ；
> 
> 反之就运行 `pnpm run dev`

3.  输出：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Untitled.png

**到这里你就可以 `边开发边运行` 了，尤雨溪看了都说爽歪歪 ~**

## 8\. 发布

1.  ```
    安装 `bumpp` 添加版本控制与 tag<br>
    ```
    

```
pnpm&nbsp;i&nbsp;bumpp&nbsp;-D<br>复制代码<br>
```

2.  ```
    配置 `package.json`<br>
    ```
    

```
{<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prepublishOnly"</span>:&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;run&nbsp;build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"release"</span>:&nbsp;<span data-darkreader-inline-color="">"npx&nbsp;bumpp&nbsp;--push&nbsp;--tag&nbsp;--commit&nbsp;&amp;&amp;&nbsp;pnpm&nbsp;publish"</span>,<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;...<br>}<br>复制代码<br>
```

3.  ```
    开发完插件后运行发布<br>
    ```
    

```
<span data-darkreader-inline-color="">#&nbsp;第一步</span><br>pnpm&nbsp;run&nbsp;prepublishOnly<br><br><span data-darkreader-inline-color="">#&nbsp;第二步</span><br>pnpm&nbsp;run&nbsp;release<br>复制代码<br>
```

那么到这里，我们的 `vite 插件模板` 就已经写好了，大家可以直接克隆 vite-plugin-template 模板\[9\] 使用；

如果你对 `vite 的插件钩子` 和 `实现一个真正的 vite 插件` 感兴趣可以继续往下面看；

## vite 的插件钩子 hooks 们

## 1\. vite 独有的钩子

1.  `enforce` ：值可以是`pre` 或 `post` ， `pre` 会较于 `post` 先执行；
    
2.  `apply` ：值可以是 `build` 或 `serve` 亦可以是一个函数，指明它们仅在 `build` 或 `serve` 模式时调用；
    
3.  `config(config, env)` ：可以在 vite 被解析之前修改 vite 的相关配置。钩子接收原始用户配置 config 和一个描述配置环境的变量env；
    
4.  `configResolved(resolvedConfig)` ：在解析 vite 配置后调用。使用这个钩子读取和存储最终解析的配置。当插件需要根据运行的命令做一些不同的事情时，它很有用。
    
5.  `configureServer(server)` ：主要用来配置开发服务器，为 dev-server (connect 应用程序) 添加自定义的中间件；
    
6.  `transformIndexHtml(html)` ：转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文；
    
7.  `handleHotUpdate(ctx)`：执行自定义HMR更新，可以通过ws往客户端发送自定义的事件；
    

## 2\. vite 与 rollup 的通用钩子之构建阶段

1.  `options(options)` ：在服务器启动时被调用：获取、操纵Rollup选项，严格意义上来讲，它执行于属于构建阶段之前；
    
2.  `buildStart(options)`：在每次开始构建时调用；
    
3.  `resolveId(source, importer, options)`：在每个传入模块请求时被调用，创建自定义确认函数，可以用来定位第三方依赖；
    
4.  `load(id)`：在每个传入模块请求时被调用，可以自定义加载器，可用来返回自定义的内容；
    
5.  `transform(code, id)`：在每个传入模块请求时被调用，主要是用来转换单个模块；
    
6.  `buildEnd()`：在构建阶段结束后被调用，此处构建结束只是代表所有模块转义完成；
    

## 3\. vite 与 rollup 的通用钩子之输出阶段

1.  `outputOptions(options)`：接受输出参数；
    
2.  `renderStart(outputOptions, inputOptions)`：每次 bundle.generate 和 bundle.write 调用时都会被触发；
    
3.  `augmentChunkHash(chunkInfo)`：用来给 chunk 增加 hash；
    
4.  `renderChunk(code, chunk, options)`：转译单个的chunk时触发。rollup 输出每一个chunk文件的时候都会调用；
    
5.  `generateBundle(options, bundle, isWrite)`：在调用 bundle.write 之前立即触发这个 hook；
    
6.  `writeBundle(options, bundle)`：在调用 bundle.write后，所有的chunk都写入文件后，最后会调用一次 writeBundle；
    
7.  `closeBundle()`：在服务器关闭时被调用
    

## 4\. 插件钩子函数 hooks 的执行顺序（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vite插件开发钩子函数 (1).png

## 5\. 插件的执行顺序

1.  别名处理Alias
    
2.  用户插件设置`enforce: 'pre'`
    
3.  vite 核心插件
    
4.  用户插件未设置`enforce`
    
5.  vite 构建插件
    
6.  用户插件设置`enforce: 'post'`
    
7.  vite 构建后置插件(minify, manifest, reporting)
    

## 手撸一个 vite 插件

下面以 `vite 打包进度条` 插件为例；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

demo.gif

插件地址：github\[10\] 如果您觉得不错欢迎 star ⭐️

该插件已被 vite 官方收集至官方文档：链接地址\[11\]

因为文章的重点不在于这个插件的详细实现过程，所以本文只会贴上源代码供大家参考，详细介绍会在下一篇文章中讲解，请大家拭目以待吧！

1.  ```
    `inde.ts`<br>
    ```
    

```
import type { PluginOption } from 'vite';<br>import colors from 'picocolors';<br>import progress from 'progress';<br>import rd from 'rd';<br>import { isExists, getCacheData, setCacheData } from './cache';<br><br>type Omit&lt;T, K extends keyof T&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;;<br>type Merge&lt;M, N&gt; = Omit&lt;M, Extract&lt;keyof M, keyof N&gt;&gt; &amp; N;<br><br>type PluginOptions = Merge&lt;<br>    ProgressBar.ProgressBarOptions,<br>    {<br>        /**<br>         * total number of ticks to complete<br>         * @default 100<br>         */<br>        total?: number;<br><br>        /**<br>         * The format of the progress bar<br>         */<br>        format?: string;<br>    }<br>&gt;;<br><br>export default function viteProgressBar(options?: PluginOptions): PluginOption {<br><br>    const { cacheTransformCount, cacheChunkCount } = getCacheData()<br><br>    let bar: progress;<br>    const stream = options?.stream || process.stderr;<br>    let outDir: string;<br>    let transformCount = 0<br>    let chunkCount = 0<br>    let transformed = 0<br>    let fileCount = 0<br>    let lastPercent = 0<br>    let percent = 0<br><br>    return {<br>        name: 'vite-plugin-progress',<br><br>        enforce: 'pre',<br><br>        apply: 'build',<br><br>        config(config, { command }) {<br>            if (command === 'build') {<br>                config.logLevel = 'silent';<br>                outDir = config.build?.outDir || 'dist';<br><br>                options = {<br>                    width: 40,<br>                    complete: '\u2588',<br>                    incomplete: '\u2591',<br>                    ...options<br>                };<br>                options.total = options?.total || 100;<br><br>                const transforming = isExists ? `${colors.magenta('Transforms:')} :transformCur/:transformTotal | ` : ''<br>                const chunks = isExists ? `${colors.magenta('Chunks:')} :chunkCur/:chunkTotal | ` : ''<br>                const barText = `${colors.cyan(`[:bar]`)}`<br><br>                const barFormat =<br>                    options.format ||<br>                    `${colors.green('Bouilding')} ${barText} :percent | ${transforming}${chunks}Time: :elapseds`<br><br>                delete options.format;<br>                bar = new progress(barFormat, options as ProgressBar.ProgressBarOptions);<br><br><br><br>                // not cache: Loop files in src directory<br>                if (!isExists) {<br>                    const readDir = rd.readSync('src');<br>                    const reg = /\.(vue|ts|js|jsx|tsx|css|scss||sass|styl|less)$/gi;<br>                    readDir.forEach((item) =&gt; reg.test(item) &amp;&amp; fileCount++);<br>                }<br>            }<br>        },<br><br>        transform(code, id) {<br>            transformCount++<br>            <br>            // not cache<br>            if(!isExists) {<br>                const reg = /node_modules/gi;<br><br>                if (!reg.test(id) &amp;&amp; percent &lt; 0.25) {<br>                    transformed++<br>                    percent = +(transformed / (fileCount * 2)).toFixed(2)<br>                    percent &lt; 0.8 &amp;&amp; (lastPercent = percent)<br>                  }<br>          <br>                if (percent &gt;= 0.25 &amp;&amp; lastPercent &lt;= 0.65) {<br>                    lastPercent = +(lastPercent + 0.001).toFixed(4)<br>                } <br>            }<br><br>            // go cache<br>            if (isExists) runCachedData()<br>            <br>            bar.update(lastPercent, {<br>                transformTotal: cacheTransformCount,<br>                transformCur: transformCount,<br>                chunkTotal: cacheChunkCount,<br>                chunkCur: 0,<br>            })<br><br>            return {<br>                code,<br>                map: null<br>            };<br>        },<br><br>        renderChunk() {<br>            chunkCount++<br><br>            if (lastPercent &lt;= 0.95) <br>                isExists ? runCachedData() : (lastPercent = +(lastPercent + 0.005).toFixed(4))<br><br>            bar.update(lastPercent, {<br>                transformTotal: cacheTransformCount,<br>                transformCur: transformCount,<br>                chunkTotal: cacheChunkCount,<br>                chunkCur: chunkCount,<br>            })<br><br>            return null<br>        },<br><br>        closeBundle() {<br>            // close progress<br>            bar.update(1)<br>            bar.terminate()<br><br>            // set cache data<br>            setCacheData({<br>                cacheTransformCount: transformCount,<br>                cacheChunkCount: chunkCount,<br>            })<br><br>            // out successful message<br>            stream.write(<br>                `${colors.cyan(colors.bold(`Build successful. Please see ${outDir} directory`))}`<br>            );<br>            stream.write('\n');<br>            stream.write('\n');<br>        }<br>    };<br><br>    /**<br>     * run cache data of progress<br>     */<br>    function runCachedData() {<br>        <br>        if (transformCount === 1) {<br>            stream.write('\n');<br>            <br>            bar.tick({<br>                transformTotal: cacheTransformCount,<br>                transformCur: transformCount,<br>                chunkTotal: cacheChunkCount,<br>                chunkCur: 0,<br>            })<br>        }<br><br>        transformed++<br>        percent = lastPercent = +(transformed / (cacheTransformCount + cacheChunkCount)).toFixed(2)<br>    }<br>}<br><br>复制代码<br>
```

2.  ```
    `cache.ts`<br>
    ```
    

```
import fs from 'fs';<br>import path from 'path';<br><br>const dirPath = path.join(process.cwd(), 'node_modules', '.progress');<br>const filePath = path.join(dirPath, 'index.json');<br><br>export interface ICacheData {<br>    /**<br>     * Transform all count<br>     */<br>    cacheTransformCount: number;<br><br>    /**<br>     * chunk all count<br>     */<br>    cacheChunkCount: number<br>}<br><br>/**<br> * It has been cached<br> * @return boolean<br> */<br>export const isExists = fs.existsSync(filePath) || false;<br><br>/**<br> * Get cached data<br> * @returns ICacheData<br> */<br>export const getCacheData = (): ICacheData =&gt; {<br>    if (!isExists) return {<br>        cacheTransformCount: 0,<br>        cacheChunkCount: 0<br>    };<br><br>    return JSON.parse(fs.readFileSync(filePath, 'utf8'));<br>};<br><br>/**<br> * Set the data to be cached<br> * @returns <br> */<br>export const setCacheData = (data: ICacheData) =&gt; {<br>    !isExists &amp;&amp; fs.mkdirSync(dirPath);<br>    fs.writeFileSync(filePath, JSON.stringify(data));<br>};<br><br>复制代码<br>
```

## 最后

该系列会是一个持续更新系列，关于整个《Vite 从入门到精通》专栏\[12\]，我主要会从如下图几个方面讲解，请大家拭目以待吧！！！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Untitled.png

`宝贝们`，都看到这里了，要不点个赞呗 👍

关于本文  

来自：易师傅

https://juejin.cn/post/7103165205483356168

```
<section data-tool="mdnice编辑器" data-website="https://www.mdnice.com" data-darkmode-color-16057140139831="rgb(163, 163, 163)" data-darkmode-original-color-16057140139831="rgb(0,0,0)" data-style="padding-right: 10px; padding-left: 10px; color: rgb(0, 0, 0); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; letter-spacing: 0px; text-align: left; white-space: normal; font-size: 16px; line-height: 1.6; word-break: break-word;" data-darkmode-color-16072568501583="rgb(163, 163, 163)" data-darkmode-original-color-16072568501583="rgb(0, 0, 0)" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkreader-inline-outline="" data-darkreader-inline-color=""><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-darkreader-inline-color=""><section><mp-common-profile data-index="1" data-id="MzUxNzk1MjQ0Ng==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0Nwvv72YkFO0qPibDKicOCsfltiaE9070DOu4iahXnicYwRIHcxe9VBicAy45MkPqy8nZzLTVibugOtV0ORFcg/300?wx_fmt=png&amp;wxfrom=19" data-nickname="程序员成长指北" data-alias="coder_growth" data-signature="专注 Node.js 技术栈分享，从 前端 到 Node.js 再到 后端数据库，祝您成为优秀的高级 Node.js 全栈工程师。一个有趣的且乐于分享的人。座右铭：今天未完成的，明天更不会完成。" data-origin_num="101" data-is_biz_ban="0" data-isban="0" data-biz_account_status="0"></mp-common-profile></section><section label="Copyright © 2016 playhudong All Rights Reserved." donone="shifuMouseDownPayStyle('shifu_t_042')" mpa-from-tpl="t" data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">Node 社群</span><br></section></section><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-tools="135编辑器" data-id="89226" data-darkreader-inline-color=""><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section><section mpa-from-tpl="t" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section></section><p data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">我组建了一个氛围特别好的 Node.js 社群，里面有很多 Node.js小伙伴，如果你对Node.js学习感兴趣的话（后续有计划也可以），我们可以一起进行Node.js相关的交流、学习、共建。下方加 考拉 好友回复「Node」即可。</span></p><p data-darkreader-inline-outline="" data-darkreader-inline-color=""><img data-croporisrc="https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwsF7OKB4iaaXAzQPbNstk2LybA0Zz5I1hiaiazE9W7WH2Ojt2dibDODWMVUmHqgfXCefVwt7z5ibNMWLvg/0?wx_fmt=jpeg" data-cropx1="0" data-cropx2="578.2649006622516" data-cropy1="0" data-cropy2="700.2119205298013" data-fileid="100016913" data-galleryid="" data-ratio="1.2093425605536332" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/YBFV3Da0NwvFQgO67XibvUG5S2UMXwCghOuJvE8BFRzUXnCAfWXkU1qHld6Ly9xiarib3siaWicJWJ0U3lI8kSgD38w/640?wx_fmt=jpeg" data-type="jpeg" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-original-style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; vertical-align: bottom; color: rgb(18, 18, 18); font-family: -apple-system, system-ui, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; box-sizing: border-box !important; overflow-wrap: break-word !important; height: auto !important; visibility: visible !important; width: 147px !important; --darkreader-inline-outline: initial; --darkreader-inline-color: #dddad5;" data-index="6" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="147px" crossorigin="anonymous" alt="Image"></p><p data-tool="mdnice编辑器" data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-style="padding-top: 8px; padding-bottom: 8px; color: rgb(89, 89, 89); line-height: 26px;" data-darkmode-color-16072568501583="rgb(141, 141, 141)" data-darkmode-original-color-16072568501583="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="">如果你觉得这篇内容对你有帮助，我想请你帮我2个小忙：</span><br></p><section data-darkreader-inline-outline=""><span data-darkreader-inline-outline=""><span data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkmode-color-16072568501583="rgb(141, 141, 141)" data-darkmode-original-color-16072568501583="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color="">1. 点个</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">「在看」</span><span data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkmode-color-16072568501583="rgb(141, 141, 141)" data-darkmode-original-color-16072568501583="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color="">，让更多人也能看到这篇文章</span></span></section><section data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkmode-color-16072568501583="rgb(141, 141, 141)" data-darkmode-original-color-16072568501583="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color="">2. 订阅官方博客&nbsp;</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">www.inode.club&nbsp;</span><span data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkmode-color-16072568501583="rgb(141, 141, 141)" data-darkmode-original-color-16072568501583="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color="">让我们一起成长</span></span></section><section data-darkreader-inline-outline="" data-darkreader-inline-color=""><br></section></section><p data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""></span><span data-darkreader-inline-outline="">点赞和在看就是最大的支持</span></p>
```