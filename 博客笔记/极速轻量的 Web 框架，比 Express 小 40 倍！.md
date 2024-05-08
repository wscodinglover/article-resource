Hono<sup data-darkreader-inline-color="">[1]</sup> 是一个极速、轻量且简单的 Web 框架。它支持大量的 JavaScript 运行时：Cloudflare Workers、Fastly Compute、Deno、Bun、Vercel、Netlify、AWS Lambda、Lambda@Edge 和 Node.js。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/jQmwTIFl1V3QBK2sJxGI4aib6VK2QmyOMP5bmXLiaccI5g5oWsiccndG9L2ykeHDX7QljqeDnIaUzq20iaSkhl2D6A/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## Hono 的应用场景

Hono 是一个简单的 Web 应用程序框架，类似于 Express，没有前端。但它可以在 CDN 边缘网络上运行，与中间件结合后可以构建更大的应用程序。下面是一些应用场景。

-   构建 Web APIs
    
-   后端服务器代理
    
-   CDN 前端
    
-   边缘应用程序
    
-   基础服务器
    
-   全栈应用程序
    

基于 Hono 开发的应用程序，已经被成功运行在 Cloudflare Workers、Bun 和 Deno 等多种 JavaScript 运行时上。下图展示了一些比较知名的应用程序：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## Hono 的特性

-   超快🚀：路由器 `RegExpRouter` 非常快，不使用线性循环。
    
-   轻量级🪶：`hono/tiny` 小于 **14kB**。Hono 零依赖，并且仅使用 Web 标准 API。
    
-   多运行时🌍：支持 Cloudflare Workers、Fastly Compute、Deno、Bun、AWS Lambda 或 Node.js。**相同的代码在所有平台上运行。**
    
-   功能齐全🔋：内置开箱即用的中间件、支持自定义中间件、第三方中间件和多种工具类。
    
-   友好的开发体验😃：超简洁的 API，支持 TypeScript。
    

### 速度超快

相比 Cloudflare Workers 上 itty-router、sunder 等其他路由组件，Hono 是最快的👍：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Hono&nbsp;x&nbsp;402,820&nbsp;ops/sec&nbsp;±4.78%&nbsp;(80&nbsp;runs&nbsp;sampled)<br>itty-router&nbsp;x&nbsp;212,598&nbsp;ops/sec&nbsp;±3.11%&nbsp;(87&nbsp;runs&nbsp;sampled)<br>sunder&nbsp;x&nbsp;297,036&nbsp;ops/sec&nbsp;±4.76%&nbsp;(77&nbsp;runs&nbsp;sampled)<br>worktop&nbsp;x&nbsp;197,345&nbsp;ops/sec&nbsp;±2.40%&nbsp;(88&nbsp;runs&nbsp;sampled)<br>Fastest&nbsp;is&nbsp;Hono<br>✨&nbsp;&nbsp;Done&nbsp;in&nbsp;28.06s.<br></code>
```

### 轻量

Hono 非常小。在压缩后，`hono/tiny` 的大小小于 14kB。提供了非常多常用的中间件和适配器，仅在使用时才进行打包。相比 Express 来说，它的尺寸是 572 kB。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">$&nbsp;npx&nbsp;wrangler&nbsp;dev&nbsp;--minify&nbsp;./src/index.ts<br><span data-darkreader-inline-color="">&nbsp;⛅️&nbsp;wrangler&nbsp;2.20.0<br>--------------------</span><br>⬣&nbsp;Listening&nbsp;at&nbsp;http://0.0.0.0:8787<br><span data-darkreader-inline-color="">-&nbsp;</span>http://127.0.0.1:8787<br><span data-darkreader-inline-color="">-&nbsp;</span>http://192.168.128.165:8787<br>Total&nbsp;Upload:&nbsp;11.47&nbsp;KiB&nbsp;/&nbsp;gzip:&nbsp;4.34&nbsp;KiB<br></code>
```

### 支持多种路由

为了满足不同的使用情形，Hono 提供了多种路由组件：

-   RegExpRouter 是 JavaScript 世界中最快的路由器。它使用在调度之前创建的单个大型正则表达式来匹配路径。借助 SmartRouter，它支持所有路由模式。
    
-   LinearRouter 注册路由的速度非常快，因此适用于每次都要初始化应用程序的环境。PatternRouter 只需添加和匹配模式，因此它的体积很小。
    

### 内置丰富的中间件和工具类

Hono 提供了丰富的中间件和工具类，让 **“Write Less, do more”** 成为现实。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用 Hono 添加 ETag 和请求日志只需几行代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Hono&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'hono'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;etag&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'hono/etag'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;logger&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'hono/logger'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Hono()<br>app.use(etag(),&nbsp;logger())<br></code>
```

### 友好的开发体验

Hono 提供了友好的开发体验。通过 `Context` 对象，可以轻松访问请求/响应。此外，Hono 是用 TypeScript 编写的，所以 Hono 拥有 “类型”。

有 TypeScript 类型系统的支持，路径参数将被推断为字面量类型。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

此外，Validator 和 Hono Client 支持 RPC 模式。在 RPC 模式下，你可以使用自己喜欢的 Validator（如 Zod），轻松地与客户端共享服务器端 API 规范，并构建类型安全的应用程序。

## 快速开始

首先，使用 npm、yarn、pnpm、bun 或 deno 安装 hono：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;create&nbsp;hono@latest<br>yarn&nbsp;create&nbsp;hono<br>pnpm&nbsp;create&nbsp;hono<br>bunx&nbsp;create-hono<br>deno&nbsp;run&nbsp;-A&nbsp;npm:create-hono<br></code>
```

然后，从 `hono` 包导入 `Hono` 类并创建 Hono 实例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Hono&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'hono'</span><br><span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Hono()<br><br>app.get(<span data-darkreader-inline-color="">'/'</span>,&nbsp;(c)&nbsp;=&gt;&nbsp;c.text(<span data-darkreader-inline-color="">'Hono!'</span>))<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;app<br></code>
```

Cloudflare 提供的 CLI 工具，也提供了最精简的 `honojs/hono-minimal` 模板，让开发者能够基于 Hono 快速开发 Cloudflare Workers 应用程序：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npx&nbsp;wrangler&nbsp;generate&nbsp;my-app&nbsp;honojs/hono-minimal<br></code>
```

Cloudflare Workers 的功能还是很强大的，基于它可以开发很多有用的小工具。感兴趣的话，可以浏览 Github 上 awesome-cloudflare<sup data-darkreader-inline-color="">[2]</sup> 项目的内容。后续如果你也想开发 Cloudflare Workers、Fastly Compute 或 AWS Lambda 等 FaaS 应用，可以试试 Hono 这个轻量的开发框架。

参考资料

\[1\]

Hono: https://hono.dev/

\[2\]

awesome-cloudflare: https://github.com/zhuima/awesome-cloudflare