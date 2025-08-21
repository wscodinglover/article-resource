#### 

> 本文作者系360奇舞团前端开发工程师

JSSDK的定义与分类

##### 什么是JSSDK

SDK是`Software Development Kit`（软件开发工具包）的缩写，`JSSDK`是为了帮助前端实现特定需求，而向开发者暴露的一些`JS-API`的集合，开发者可以通过它在网页中集成和使用某些特定的功能，例如社交分享、地图服务、支付功能等.它通常包括一下模块：

1.  `JavaScript`库：这是 `JSSDK` 的核心部分，包含了一系列预先编写好的`JavaScript`代码，这些代码实现了一些特定的功能，如用户认证、数据分析、社交分享等。
    
2.  `API` 文档：这部分文档详细描述了如何使用 `JSSDK` 中的各个功能。它通常会包含函数和方法的列表，以及如何使用这些函数和方法。
    
3.  `示例代码`：这部分代码展示了如何在实际项目中使用 `JSSDK`。通过阅读和运行示例代码，开发者可以更好地理解如何使用 `JSSDK`。
    

##### JSSDK的分类

`JSSDK` 的分类主要取决于它们提供的功能和服务。通常根据其功能不同分为：**UI组件库**、**JS工具库**、**分析统计SDK**、**社交媒体SDK**

-   `UI组件库`：通过封装一系列组件，通过配置帮助开发者调用，实现一些UI效果，例如：`Antd`、`ElementUI`、`Vant`、`Bootstrap`等
    
-   `JS类库`：通过实现一类常用的方法，便于开发处理数据，也不用再考虑兼容性，常用的如：`lodash`、`moment`、`axios`、`jQuery`等
    
-   `监控统计工具`：通过API，来监听前端系统的报错、统计数据，以及数据上报等，例如：`Sentry`、百度统计、`Google Analytics JSSDK`等
    
-   `其他第三方的SDK`：微信SDK、支付宝SDK、新浪微博SDK，`Facebook JSSDK`等
    

#### 如何设计JSSDK

##### 设计SDK要遵循的原则

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJMWM0FDUHH3W2eFdcWkpDqxuKSrZmsUwJlkl1UlaLmiaBd0Kic9wgmRww/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

1.  `单一职责原则`:SDK一般都是为了满足一类业务的需要，所以设计之初要明确业务范围，如果功能过于复杂，可以拆改成几个独立的SDK，在主SDK中引入相关逻辑就OK了，这样便于功能解耦和测试。
    
2.  `最小可用、最少依赖性原则`:能用确定的方法实现，就不要再去搞复杂的内容。SDK要减少依赖，一些工具库能不用就不用。尽可能自行实现必要的方法，或者引入尽量少的库。否则会导致SDK打包后过大，或者更新版本带来的兼容问题。
    
3.  `稳定性原则`:保持SDK足够的稳定性，一方面要保持API方法的稳定，另一方面在设计API的入参时，参数要用对象类型，这样便于后续扩展添加更多参数。如果SDK有升级要考虑兼容旧版本。新功能要新增API，旧的API不要删除。
    
4.  `易用性原则`:要满足易用性原则，首先要有简洁的API，明确的方法注释、文档跟示例代码很重要，不管SDK写的多漂亮，使用者首先接触的是接入文档，然后是覆盖所有API的示例代码，一个好的实例代码能起到事半功倍的效果。
    

##### 语言与构建工具选择

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJFUNhEbicIvtyW2ULLqFible58jjEvewbKwY2Ohndy1cOPyNibjticxHHuA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

1.  语言的选择 语言无非是选择`TS`还是`JS`,这里推荐使用`TS`来编写SDK代码因为相比`JS`而言他有如下优势：
    

-   `类型系统`：`TypeScript`的最大特点就是它的类型系统。这个类型系统可以在编译阶段捕获许多常见的错误，如类型错误、未定义的函数或属性等，从而提高代码的质量和可维护性。
    
-   `更好的工具支持`：由于`TypeScript`的类型信息，`IDE` 和编辑器可以提供更好的代码补全、自动提示等功能。
    

2.  构建工具的选择 推荐使用`Rollup`来作为SDK项目的打包构建工具
    

-   `Rollup`的配置通常比`Webpack`更简单，更易于理解。这对于新手或者希望快速开始项目的开发者来说是一个优点。
    
-   更好的`Tree-shaking`：`Rollup` 的`Tree-shaking`功能通常比`Webpack`更有效。`Tree-shaking` 是一种只包含实际使用的代码，而去除未使用代码的优化技术。这可以帮助减小最终打包文件的大小。
    
-   `Rollup`是以`ES6`模块标准为中心设计的，这使得它在处理`ES6`模块时更加高效。
    
-   适合库的打包：由于`Rollup`的特性，它通常更适合用于打包库（library）或者工具，而`Webpack`则更适合用于打包应用（`application`）。
    

#### SDK核心功能的实现

##### 需求

假设我们开发一款问卷投放SDK，满足问卷的自动投放、代码控制投放、事件触发投放、问卷回收等逻辑。注意单一职责原则的应用，只做问卷的投放、回收逻辑。问卷里面内容展示，以及内部相关逻辑不涉及。

##### 项目结构

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJLvo7cYnDBoVibxYj5N5gwIpKXBQ6gskYd5gpsh0Wwa1eiaWjlo5SQCicA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)\`src\`: 源代码

-   `api/index.t`s: 网络请求的API封装
    
-   `core/index.ts`:核心入口文件
    
-   `core/dependencies.ts`:核心逻辑实现文件
    
-   `style/index.css`: 样式文件
    
-   `types/index.ts`: 声明的类型文件
    
-   `utils/constants.ts`: 常量文件
    
-   `utils/http.ts`: 网络请求封装库
    
-   `utils/index.ts`: 工具函数
    
-   `utils/pv.ts`: 路由监听处理函数
    

##### API的设计

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJPpXzaBaNs0iaFwLdx6pS5BMLoJN4vxM1M3EBQpb6QC1omQ8OUO1uaVA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)\`SDK API\`的设计根据功能分为两大类：\`生命周期方法\`与\`实例方法\`.

-   生命周期方法：主要是SDK的生命周期回调函数：从init初始化方法，问卷的打开与关闭回调。
    
-   实例方法：负责具体的业务实现
    

> 需要注意的是在设计对外API时，每个API都要有方法执行完成后回调，便于用户执行后续逻辑。

##### 项目架构

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJOzYAddqHynQuF0WvyqNyb0PksOjcdp8t36hSEEuqagDkEXVG4xDhhg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

-   `Index`入口文件里面主要是对外的 SDK生命周期方法与实例方法。首先调用initQaSDK,完成问卷SDK实例的创建， 里面主要包含：
    

1.  单例模式来创建实例
    
2.  接受用户的必要入参与参数校验
    
3.  设置路由变化监听
    
4.  完成与服务端的对接逻辑
    

-   `Dependencies`：里面是核心逻辑层的实现。单独抽出一个文件的目的是，便于方法的复用。再下面是对`Dom`的操作：`Dom`元素的创建、更新、与移除逻辑，最底下是依赖语言与构建工具
    

##### rollup.config.mjs

```
<span></span><code><span>import</span>&nbsp;ts&nbsp;<span>from</span>&nbsp;<span>"rollup-plugin-typescript2"</span>;<br><span>import</span>&nbsp;dts&nbsp;<span>from</span>&nbsp;<span>"rollup-plugin-dts"</span>;<br><span>import</span>&nbsp;commonjs&nbsp;<span>from</span>&nbsp;<span>'@rollup/plugin-commonjs'</span><br><span>//&nbsp;es6&nbsp;转&nbsp;es5</span><br><span>import</span>&nbsp;babel&nbsp;<span>from</span>&nbsp;<span>'@rollup/plugin-babel'</span><br><span>//&nbsp;模块自动导入并导出</span><br><span>import</span>&nbsp;{&nbsp;importExportPlugin&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'rollup-plugin-import-export'</span><br><span>import</span>&nbsp;postcss&nbsp;<span>from</span>&nbsp;<span>'rollup-plugin-postcss'</span>;&nbsp;<span>//&nbsp;处理css&nbsp;的插件</span><br><span>//&nbsp;代码压缩</span><br><span>import</span>&nbsp;terser&nbsp;<span>from</span>&nbsp;<span>'@rollup/plugin-terser'</span><br><span>//&nbsp;配置环境变量</span><br><span>import</span>&nbsp;replace&nbsp;<span>from</span>&nbsp;<span>'rollup-plugin-replace'</span>;<br><span>import</span>&nbsp;{&nbsp;nodeResolve&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'@rollup/plugin-node-resolve'</span>;<br><span>import</span>&nbsp;json&nbsp;<span>from</span>&nbsp;<span>'@rollup/plugin-json'</span>;<br><br><span>import</span>&nbsp;path&nbsp;<span>from</span>&nbsp;<span>"path"</span><br><span>import</span>&nbsp;{&nbsp;fileURLToPath&nbsp;}&nbsp;<span>from</span>&nbsp;<span>'url'</span><br><span>const</span>&nbsp;__filenameNew&nbsp;=&nbsp;fileURLToPath(<span>import</span>.meta.url)<br><span>const</span>&nbsp;__dirnameNew&nbsp;=&nbsp;path.dirname(__filenameNew)<br><br><span>const</span>&nbsp;isProduction&nbsp;=&nbsp;process.env.NODE_ENV&nbsp;===&nbsp;<span>'production'</span>;<br><br><span>const</span>&nbsp;API_URL_MAP&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;production:&nbsp;<span>'https://prod.***'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;pre:&nbsp;<span>'https://pre.*****'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;development:&nbsp;<span>'https://dev.***'</span><br>};<br><br><span><span>function</span>&nbsp;<span>getEnvApiUrl</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;API_URL_MAP[process.env.NODE_ENV]&nbsp;||&nbsp;API_URL_MAP.production;<br>}<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//入口文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input:&nbsp;<span>'./src/core/index.ts'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//打包esModule</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;path.resolve(__dirnameNew,&nbsp;<span>"./dist/index.esm.js"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span>"es"</span>,&nbsp;<span>//输出类型&nbsp;ESM&nbsp;支持通过import&nbsp;export引入</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourcemap:&nbsp;<span>false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//打包common&nbsp;js&nbsp;支持&nbsp;require&nbsp;exports&nbsp;引入</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;path.resolve(__dirnameNew,&nbsp;<span>"./dist/index.cjs.js"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span>"cjs"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourcemap:&nbsp;<span>false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//打包&nbsp;AMD&nbsp;CMD&nbsp;UMD&nbsp;global&nbsp;引入&nbsp;将依赖包注入到全局变量中&nbsp;支持&lt;script&gt;引入</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;path.resolve(__dirnameNew,&nbsp;<span>"./dist/index.js"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span>"umd"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span>"QaSdk"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourcemap:&nbsp;<span>false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//配置ts</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeResolve(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;json(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;postcss(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ts(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;importExportPlugin(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;babel(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commonjs(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isProduction&nbsp;?&nbsp;terser()&nbsp;:&nbsp;<span>null</span>,&nbsp;<span>//&nbsp;生成环境启用压缩</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replace({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.API_URL'</span>:&nbsp;<span>JSON</span>.stringify(getEnvApiUrl()),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.API_URL_MAP'</span>:&nbsp;<span>JSON</span>.stringify(API_URL_MAP),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.NODE_ENV'</span>:&nbsp;<span>JSON</span>.stringify(process.env.NODE_ENV),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>//打包声明文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input:&nbsp;<span>"./src/core/index.ts"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;path.resolve(__dirnameNew,&nbsp;<span>"./dist/index.d.ts"</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span>"es"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[dts()],<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>]<br></code>
```

`rollup.config.mjs` 是 `Rollop` 构建工具的核心配置文件，相当于 `webpack.config.js` 文件在 `Webpack` 构建工具中的作用。用于定义构建过程的各种设置。例如，入口文件、输出文件、模块解析规则、插件等。

\-`input`: 入口文件

\- `output`: 输出配置项

定义了三种输出格式：

`es`：这是`ES`模块格式。这种格式的模块可以通过 `import` 和 `export` 关键字在现代浏览器或 Node.js 中使用。

`cjs`：这是`CommonJS`格式。这种格式的模块可以通过 `require` 和 `module.exports` 在 `Node.js` 中使用。

`umd`：这是通用模块定义格式。这种格式的模块可以在各种环境中使用，包括浏览器（通过 <script> 标签引入）和\` Node.js\`

\- `plugins`: 依赖的插件列表

\- `external`: 忽略打包模块列表

\- `cache`: 构建缓存，通过增量构建提高构建速度

##### 环境变量的设置

```
<span></span><code>plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;nodeResolve(),<br>&nbsp;&nbsp;&nbsp;&nbsp;json(),<br>&nbsp;&nbsp;&nbsp;&nbsp;postcss(),<br>&nbsp;&nbsp;&nbsp;&nbsp;ts(),<br>&nbsp;&nbsp;&nbsp;&nbsp;importExportPlugin(),<br>&nbsp;&nbsp;&nbsp;&nbsp;babel(),<br>&nbsp;&nbsp;&nbsp;&nbsp;commonjs(),<br>&nbsp;&nbsp;&nbsp;&nbsp;isProduction&nbsp;?&nbsp;terser()&nbsp;:&nbsp;<span>null</span>,&nbsp;<span>//&nbsp;生成环境启用压缩</span><br>&nbsp;&nbsp;&nbsp;&nbsp;replace({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.API_URL'</span>:&nbsp;<span>JSON</span>.stringify(getEnvApiUrl()),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.API_URL_MAP'</span>:&nbsp;<span>JSON</span>.stringify(API_URL_MAP),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'process.env.NODE_ENV'</span>:&nbsp;<span>JSON</span>.stringify(process.env.NODE_ENV),<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>]<br></code>
```

环境变量的配置使用`rollup-plugin-replace`这个`Rollup`插件，它的作用是在源代码中查找并替换特定的字符串，我们常用它进行处理环境变量。

比如：要根据不通的环境，请求不同的服务，可以在代码中使用 `process.env.API_URL` 。在打包过程中，`rollup-plugin-replace` 插件，会根据当前的环境将这个字符串替换为实际的值。

##### 注意点

1.  做好入参校验，你不知道用户是否传递以及传递何种类型的参数，做好入参校验与错误提示。
    
2.  对外API保持入参的数据结构统一。最好是都用对象来作为入参，便于后续扩展更多参数
    
3.  有些方法要有`onCompleted` 回调，比如`init`初始化完成后，有回调，便于用户处理一些其他逻辑
    
4.  下面是两个自动写注释的Vscode插件
    

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJSU2iaR0osrOta8meChhBhR96edInuqFDM0smb9YaONyDn95hjyoZtUA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJNkwqWDjc6icmBRh8QTxYLfH4FjPVSFH2dUob0ibmRgOBnmYOxrffZeaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 发布、维护、更新

##### 发布到CDN或是NPM

-   为了便于用户使用，SDK要发布CDN与NPM上，打包完成后，js 文件要有一定的命名规范：
    

\[名称\]\_\[prod/test\]\_\[版本\].js

将打包好的js文件进行发布到CDN，用户通过引入链接的形式进行访问

-   `Npm`发布
    
    需要注意的是，如果要将包发布到npm上，需要设置`package.json` 的几个关键参数：
    
    • `name`: 名称
    
    • `version`：版本：遵循`Major. Minor. Patch`规范
    
    • `description`：描述
    
    • `main`：主文件
    
    • `keywords`：SDK搜索关键词
    
    • `maintainers`: 列表，维护者信息可以是多个
    
    最后执行：
    
    ```
    <span></span><code>npm&nbsp;login<br>npm&nbsp;publish<br></code>
    ```
    
    进行包的发布
    

##### 维护与更新

SDK的维护更新关键是要做好两个关键文档的书写：**SDK接入文档**与**SDK维护文档**，这两个文档一个是对外的，便于开发者接入的文档，一个是对内的，便于项目开发者的维护文档，这两个文档需要包含一下内容：

-   SDK 接入文档（对外）
    
    • SDK简介
    
    • SDK支持的平台
    
    • SDK接入方式：`cdn & npm`
    
    • SDK API的介绍：API简介&示例&参数说明
    
    • 示例代码：`example`
    
-   SDK维护更新文档（对内）
    
    • SDK目录文件说明
    
    • 如何运行调试SDK
    
    • 打包发布SDK
    
    • SDK更新记录：版本&发布时间&cdn地址&更新内容
    

#### 总结

开发一款 `JavaScript SDK` 需要考虑到诸多方面，除了以上提到的，SDK还需要考虑到用户友好性、性能、安全性、易用性等方面，这里就不展开了。另外，一个SDK写的再好不如有个好文档，特别是对外的SDK接入文档，它可以为开发者提供更好的开发体验。

\- END -

**如果您关注前端+AI 相关领域可以扫码进群交流**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEDYlwyCsMFm6vU2KOOvlDKJaC3L63iagrzMmwlBy0ibc8CjH5Sx9jmxra9GJr1qeqDduKGhGILAWuBg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)   ![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cAd6ObKOzEArGqlLlZmLVB61keywZ2APgWHNwTdK8OicE1utUcAJj1m5ZMFTL8iac51bGglnIeCR5KHicCBh5lh3A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

扫码进群2或添加小编微信进群1😊  

## 关于奇舞团

奇舞团是 360 集团最大的大前端团队，非常重视人才培养，有工程师、讲师、翻译官、业务接口人、团队 Leader 等多种发展方向供员工选择，并辅以提供相应的技术力、专业力、通用力、领导力等培训课程。奇舞团以开放和求贤的心态欢迎各种优秀人才关注和加入奇舞团。  

![Image](https://mmbiz.qpic.cn/mmbiz_png/cAd6ObKOzEBLicibtcprJISN18FgTtg2N1ichPnMqRhicrP20VfwnC4vday7gtEoiaSynIH1bas4N5kgicliakrLdtT2Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)