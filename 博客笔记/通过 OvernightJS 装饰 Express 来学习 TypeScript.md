近期掘金上有小伙伴问阿宝哥装饰器的应用场景，这让阿宝哥突然萌生了通过优秀的 TS 开源项目，来学习 TS 的想法。

本文阿宝哥将以 Github 上的 **OvernightJS** 开源项目为例，来介绍一下如何使用 TypeScript 装饰器来装饰 Express，从而让你的 Express 好用得飞起来。

接下来本文的重心将围绕 **装饰器** 的应用展开，不过在分析装饰器在 OvernightJS 的应用之前，阿宝哥先来简单介绍一下 OvernightJS。

### 一、OvernightJS 简介

> TypeScript decorators for the ExpressJS Server.

OvernightJS 是一个简单的库，用于为要调用 Express 路由的方法添加 TypeScript 装饰器。此外，该项目还包含了用于管理 json-web-token 和打印日志的包。

![Image](https://mmbiz.qpic.cn/mmbiz_png/jQmwTIFl1V11SaMRmbN6ny2P3ia02uYlNoGgibuyZqNeg8iaKvyyrfX3outBLPIovJa7pvmfKGjKkAyNDUbXGc2cw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 1.1 OvernightJS 特性

OvernightJS 并不是为了替代 Express，如果你之前已经掌握了 Express，那你就可以快速地学会它。OvernightJS 为开发者提供了以下特性：

-   使用 `@Controller` 装饰器定义基础路由；
    
-   提供了把类方法转化为 Express 路由的装饰器（**比如 @Get，@Put，@Post，@Delete**）；
    
-   提供了用于处理中间件的 `@Middleware` 和 `@ClassMiddleware` 装饰器；
    
-   提供了用于处理异常的 `@ErrorMiddleware` 装饰器；
    
-   提供了 `@Wrapper` 和 `@ClassWrapper` 装饰器用于包装函数；
    
-   通过 `@ChildControllers` 装饰器支持子控制器。
    

出于篇幅考虑，阿宝哥只介绍了 OvernightJS 与装饰器相关的部分特性。了解完这些特性，我们来快速体验一下 OvernightJS。

#### 1.2 OvernightJS 入门

##### 1.2.1 初始化项目

首先新建一个 `overnight-quickstart` 项目，然后使用 `npm init -y` 命令初始化项目，然后在命令行中输入以下命令来安装项目依赖包：

```
<span data-darkreader-inline-color="">$</span><span>&nbsp;npm&nbsp;i&nbsp;@overnightjs/core&nbsp;express&nbsp;-S</span><br>
```

在 Express 项目中要集成 TypeScript 很简单，只需安装 `typescript` 这个包就可以了。但为了在开发阶段能够在命令行直接运行使用 TypeScript 开发的服务器，我们还需要安装 `ts-node` 这个包。要安装这两个包，我们只需在命令行中输入以下命令：

```
<span data-darkreader-inline-color="">$</span><span>&nbsp;npm&nbsp;i&nbsp;typescript&nbsp;ts-node&nbsp;-D</span><br>
```

##### 1.2.2 为 Node.js 和 Express 安装声明文件

声明文件是预定义的模块，用于告诉 TypeScript 编译器的 JavaScript 值的形状。类型声明通常包含在扩展名为 `.d.ts` 的文件中。这些声明文件可用于所有最初用 JavaScript 而非 TypeScript 编写的库。

幸运的是，我们不需要重头开始为 Node.js 和 Express 定义声明文件，因为在 Github 上有一个名为 DefinitelyTyped 项目已经为我们提供了现成的声明文件。

要安装 Node.js 和 Express 对应的声明文件，我们只需要在命令行执行以下命令就可以了：

```
<span data-darkreader-inline-color="">$</span><span>&nbsp;npm&nbsp;i&nbsp;@types/node&nbsp;@types/express&nbsp;-D</span><br>
```

该命令成功执行之后，`package.json` 中的 `devDependencies` 属性就会新增 Node.js 和 Express 对应的依赖包版本信息：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"devDependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/express"</span>:&nbsp;<span data-darkreader-inline-color="">"^4.17.8"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@types/node"</span>:&nbsp;<span data-darkreader-inline-color="">"^14.11.2"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"ts-node"</span>:&nbsp;<span data-darkreader-inline-color="">"^9.0.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"typescript"</span>:&nbsp;<span data-darkreader-inline-color="">"^4.0.3"</span><br>&nbsp;&nbsp;}<br>}<br>
```

##### 1.2.3 初始化 TypeScript 配置文件

为了能够灵活地配置 TypeScript 项目，我们还需要为本项目生成 TypeScript 配置文件，在命令行输入 `tsc --init` 之后，项目中就会自动创建一个 `tsconfig.json` 的文件。对于本项目来说，我们将使用以下配置项：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"compilerOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"target"</span>:&nbsp;<span data-darkreader-inline-color="">"es6"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"module"</span>:&nbsp;<span data-darkreader-inline-color="">"commonjs"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"rootDir"</span>:&nbsp;<span data-darkreader-inline-color="">"./src"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"outDir"</span>:&nbsp;<span data-darkreader-inline-color="">"./build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esModuleInterop"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"experimentalDecorators"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"strict"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;}<br>}<br>
```

##### 1.2.4 创建简单的 Web 服务器

在创建简单的 Web 服务器之前，我们先来初始化项目的目录结构。首先在项目的根目录下创建一个 `src` 目录及 `controllers` 子目录：

```
├──&nbsp;src<br>│&nbsp;&nbsp;&nbsp;├──&nbsp;controllers<br>│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└──&nbsp;UserController.ts<br>│&nbsp;&nbsp;&nbsp;└──&nbsp;index.ts<br>
```

接着新建 `UserController.ts` 和 `index.ts` 这两个文件并分别输入以下内容：

**UserController.ts**

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"@overnightjs/core"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Request,&nbsp;Response&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"express"</span>;<br><br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">"api/users"</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UserController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">""</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;getAll(req:&nbsp;Request,&nbsp;res:&nbsp;Response)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res.status(<span data-darkreader-inline-color="">200</span>).json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">"成功获取所有用户"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br>
```

**index.ts**

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Server&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"@overnightjs/core"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;UserController&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./controllers/UserController"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;PORT&nbsp;=&nbsp;<span data-darkreader-inline-color="">3000</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;SampleServer&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Server&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span></span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(process.env.NODE_ENV&nbsp;===&nbsp;<span data-darkreader-inline-color="">"development"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setupControllers();<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;setupControllers():&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;userController&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;UserController();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>.addControllers([userController]);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">public</span>&nbsp;start(port:&nbsp;<span data-darkreader-inline-color="">number</span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.app.listen(port,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`⚡️[server]:&nbsp;Server&nbsp;is&nbsp;running&nbsp;at&nbsp;http://localhost:<span data-darkreader-inline-color="">${PORT}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;sampleServer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;SampleServer();<br>sampleServer.start(PORT);<br>
```

完成上述步骤之后，我们在项目的 `package.json` 中添加一个 `start` 命令来启动项目：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"start"</span>:&nbsp;<span data-darkreader-inline-color="">"ts-node&nbsp;./src/index.ts"</span><br>&nbsp;&nbsp;},<br>}<br>
```

添加完 `start` 命令，我们就可以在命令行中通过 `npm start` 来启动 Web 服务器了。当服务器成功启动之后，命令行会输出以下消息：

```
&gt;&nbsp;ts-node&nbsp;./src/index.ts<br><br>⚡️[server]:&nbsp;Server&nbsp;is&nbsp;running&nbsp;at&nbsp;http://localhost:3000<br>
```

接着我们打开浏览器访问 http://localhost:3000/api/users 这个地址，你就会看到 `{"message":"成功获取所有用户"}` 这个信息。

##### 1.2.5 安装 nodemon

为了方便后续的开发，我们还需要安装一个第三方包 `nodemon`。对于写过 Node.js 应用的小伙伴来说，对 `nodemon` 这个包应该不会陌生。`nodemon` 这个包会自动检测目录中文件的更改，当发现文件异动时，会自动重启 Node.js 应用程序。

同样，我们在命令行执行以下命令来安装它：

```
<span data-darkreader-inline-color="">$</span><span>&nbsp;npm&nbsp;i&nbsp;nodemon&nbsp;-D</span><br>
```

安装完成后，我们需要更新一下前面已经创建的 `start` 命令：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"start"</span>:&nbsp;<span data-darkreader-inline-color="">"nodemon&nbsp;./src/index.ts"</span><br>&nbsp;&nbsp;}<br>}<br>
```

好的，现在我们已经知道如何使用 OvernightJS 来开发一个简单的 Web 服务器。接下来，阿宝哥将带大家一起来分析 OvernightJS 是如何使用 TypeScript 装饰器实现上述的功能。

### 二、OvernightJS 原理分析

在分析前面示例中 `@Controller` 和 `@Get` 装饰器原理前，我们先来看一下直接使用 Express 如何实现同样的功能：

```
<span data-darkreader-inline-color="">import</span>&nbsp;express,&nbsp;{&nbsp;Router,&nbsp;Request,&nbsp;Response&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"express"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;app&nbsp;=&nbsp;express();<br><br><span data-darkreader-inline-color="">const</span>&nbsp;PORT&nbsp;=&nbsp;<span data-darkreader-inline-color="">3000</span>;<br><span data-darkreader-inline-color="">class</span>&nbsp;UserController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">public</span>&nbsp;getAll(req:&nbsp;Request,&nbsp;res:&nbsp;Response)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res.status(<span data-darkreader-inline-color="">200</span>).json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">"成功获取所有用户"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;userRouter&nbsp;=&nbsp;Router();<br><span data-darkreader-inline-color="">const</span>&nbsp;userCtrl&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;UserController();<br>userRouter.get(<span data-darkreader-inline-color="">"/"</span>,&nbsp;userCtrl.getAll);<br><br>app.use(<span data-darkreader-inline-color="">"/api/users"</span>,&nbsp;userRouter);<br><br>app.listen(PORT,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`⚡️[server]:&nbsp;Server&nbsp;is&nbsp;running&nbsp;at&nbsp;http://localhost:<span data-darkreader-inline-color="">${PORT}</span>`</span>);<br>});<br>
```

在以上代码中，我们先通过调用 `Router` 方法创建了一个 `userRouter` 对象，然后进行相关路由的配置，接着使用 `app.use` 方法应用 `userRouter` 路由。下面我们用一张图来直观感受一下 OvernightJS 与 Express 在使用上的差异：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过以上对比可知，利用 OvernightJS 提供的装饰器，可以让我们开发起来更加便捷。但大家要记住 OvernightJS 底层还是基于 Express，其内部最终还是通过 Express 提供的 API 来处理路由。

接下来为了能更好理解后续的内容，我们先来简单回顾一下 TypeScript 装饰器。

#### 2.1 TypeScript 装饰器简介

装饰器是一个表达式，该表达式执行后，会返回一个函数。在 TypeScript 中装饰器可以分为以下 4 类：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

需要注意的是，若要启用实验性的装饰器特性，你必须在命令行或 `tsconfig.json` 里启用 `experimentalDecorators` 编译器选项：

**命令行**：

```
tsc&nbsp;--target&nbsp;ES5&nbsp;--experimentalDecorators<br>
```

**tsconfig.json**：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"compilerOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"experimentalDecorators"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;}<br>}<br>
```

了解完 TypeScript 装饰器的分类，我们来开始分析 OvernightJS 框架中提供的装饰器。

#### 2.2 @Controller 装饰器

在前面创建的简单 Web 服务器中，我们通过以下方式来使用 `@Controller` 装饰器：

```
<span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">"api/users"</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UserController&nbsp;{}<br>
```

很明显该装饰器应用在 `UserController` 类上，它属于类装饰器。OvernightJS 的项目结构很简单，我们可以很容易找到 `@Controller` 装饰器的定义：

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/decorators/class.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Controller</span>(<span>path:&nbsp;<span data-darkreader-inline-color="">string</span></span>):&nbsp;<span data-darkreader-inline-color="">ClassDecorator</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;&lt;TFunction&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Function</span>&gt;(target:&nbsp;TFunction):&nbsp;<span><span>void</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;addBasePathToClassMetadata(target.prototype,&nbsp;<span data-darkreader-inline-color="">"/"</span>&nbsp;+&nbsp;path);<br>&nbsp;&nbsp;};<br>}<br>
```

通过观察以上代码可知，Controller 函数是一个装饰器工厂，即调用该工厂方法之后会返回一个 ClassDecorator 对象。在 ClassDecorator 内部，会继续调用 `addBasePathToClassMetadata` 方法，把基础路径添加到类的元数据中：

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/decorators/class.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">addBasePathToClassMetadata</span>(<span>target:&nbsp;<span data-darkreader-inline-color="">Object</span>,&nbsp;basePath:&nbsp;<span data-darkreader-inline-color="">string</span></span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;metadata:&nbsp;IClassMetadata&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;=&nbsp;Reflect.getOwnMetadata(classMetadataKey,&nbsp;target);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!metadata)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata&nbsp;=&nbsp;{};<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;metadata.basePath&nbsp;=&nbsp;basePath;<br>&nbsp;&nbsp;Reflect.defineMetadata(classMetadataKey,&nbsp;metadata,&nbsp;target);<br>}<br>
```

`addBasePathToClassMetadata` 函数的实现很简单，主要是利用 Reflect API 实现元数据的存取操作。在以上代码中，会先获取 `target` 对象上已保存的 `metadata` 对象，如果不存在的话，会创建一个空的对象，然后把参数 `basePath` 的值添加该对象的 `basePath` 属性中，元数据设置完成后，在通过 `Reflect.defineMetadata` 方法进行元数据的保存。

下面我们用一张图来说明一下 `@Controller` 装饰器的处理流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 OvernightJS 项目中，所使用的 Reflect API 是来自 reflect-metadata 这个第三方库。该库提供了很多 API 用于操作元数据，这里我们只简单介绍几个常用的 API：

```
<span data-darkreader-inline-color="">//&nbsp;define&nbsp;metadata&nbsp;on&nbsp;an&nbsp;object&nbsp;or&nbsp;property</span><br>Reflect.defineMetadata(metadataKey,&nbsp;metadataValue,&nbsp;target);<br>Reflect.defineMetadata(metadataKey,&nbsp;metadataValue,&nbsp;target,&nbsp;propertyKey);<br><br><span data-darkreader-inline-color="">//&nbsp;check&nbsp;for&nbsp;presence&nbsp;of&nbsp;a&nbsp;metadata&nbsp;key&nbsp;on&nbsp;the&nbsp;prototype&nbsp;chain&nbsp;of&nbsp;an&nbsp;object&nbsp;or&nbsp;property</span><br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.hasMetadata(metadataKey,&nbsp;target);<br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.hasMetadata(metadataKey,&nbsp;target,&nbsp;propertyKey);<br><br><span data-darkreader-inline-color="">//&nbsp;get&nbsp;metadata&nbsp;value&nbsp;of&nbsp;an&nbsp;own&nbsp;metadata&nbsp;key&nbsp;of&nbsp;an&nbsp;object&nbsp;or&nbsp;property</span><br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.getOwnMetadata(metadataKey,&nbsp;target);<br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.getOwnMetadata(metadataKey,&nbsp;target,&nbsp;propertyKey);<br><br><span data-darkreader-inline-color="">//&nbsp;get&nbsp;metadata&nbsp;value&nbsp;of&nbsp;a&nbsp;metadata&nbsp;key&nbsp;on&nbsp;the&nbsp;prototype&nbsp;chain&nbsp;of&nbsp;an&nbsp;object&nbsp;or&nbsp;property</span><br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.getMetadata(metadataKey,&nbsp;target);<br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.getMetadata(metadataKey,&nbsp;target,&nbsp;propertyKey);<br><br><span data-darkreader-inline-color="">//&nbsp;delete&nbsp;metadata&nbsp;from&nbsp;an&nbsp;object&nbsp;or&nbsp;property</span><br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.deleteMetadata(metadataKey,&nbsp;target);<br><span data-darkreader-inline-color="">let</span>&nbsp;result&nbsp;=&nbsp;Reflect.deleteMetadata(metadataKey,&nbsp;target,&nbsp;propertyKey);<br>
```

相信看到这里，可能有一些小伙伴会有疑问，通过 Reflect API 保存的元数据什么时候使用呢？这里我们先记住这个问题，后面我们再来分析它，接下来我们来开始分析 `@Get` 装饰器。

#### 2.3 @Get 装饰器

在前面创建的简单 Web 服务器中，我们通过以下方式来使用 `@Get` 装饰器，该装饰器用于配置 Get 请求：

```
<span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UserController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">""</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;getAll(req:&nbsp;Request,&nbsp;res:&nbsp;Response)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res.status(<span data-darkreader-inline-color="">200</span>).json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">"成功获取所有用户"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br>
```

`@Get` 装饰器应用在 `UserController` 类的 `getAll` 方法上，它属于方法装饰器。它的定义如下所示：

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/decorators/method.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Get</span>(<span>path?:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">RegExp</span></span>):&nbsp;<span data-darkreader-inline-color="">MethodDecorator</span>&nbsp;&amp;&nbsp;<span data-darkreader-inline-color="">PropertyDecorator</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;helperForRoutes(HttpVerb.GET,&nbsp;path);<br>}<br>
```

与 `Controller` 函数一样，`Get` 函数也是一个装饰器工厂，调用该函数之后会返回 `MethodDecorator & PropertyDecorator` 的交叉类型。除了 Get 请求方法之外，常见的 HTTP 请求方法还有 Post、Delete、Put、Patch 和 Head 等。为了统一处理这些请求方法，OvernightJS 内部封装了一个 `helperForRoutes` 函数，该函数的具体实现如下：

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/decorators/method.ts</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">helperForRoutes</span>(<span>httpVerb:&nbsp;HttpDecorator,&nbsp;path?:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">RegExp</span></span>):&nbsp;<span data-darkreader-inline-color="">MethodDecorator</span>&nbsp;&amp;&nbsp;<span data-darkreader-inline-color="">PropertyDecorator</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(target:&nbsp;<span data-darkreader-inline-color="">Object</span>,&nbsp;propertyKey:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;symbol):&nbsp;<span><span>void</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newPath:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">RegExp</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(path&nbsp;===&nbsp;<span data-darkreader-inline-color="">undefined</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newPath&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(path&nbsp;<span data-darkreader-inline-color="">instanceof</span>&nbsp;<span data-darkreader-inline-color="">RegExp</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newPath&nbsp;=&nbsp;addForwardSlashToFrontOfRegex(path);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">//&nbsp;assert&nbsp;(path&nbsp;instanceof&nbsp;string)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newPath&nbsp;=&nbsp;<span data-darkreader-inline-color="">'/'</span>&nbsp;+&nbsp;path;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addHttpVerbToMethodMetadata(target,&nbsp;propertyKey,&nbsp;httpVerb,&nbsp;newPath);<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>}<br>
```

观察以上代码可知，在 `helperForRoutes` 方法内部，会继续调用 `addHttpVerbToMethodMetadata` 方法把请求方法和请求路径这些元数据保存起来。

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/decorators/method.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">addHttpVerbToMethodMetadata</span>(<span>target:&nbsp;<span data-darkreader-inline-color="">Object</span>,&nbsp;metadataKey:&nbsp;<span data-darkreader-inline-color="">any</span>,&nbsp;<br>&nbsp;&nbsp;httpDecorator:&nbsp;HttpDecorator,&nbsp;path:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">RegExp</span></span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;metadata:&nbsp;IMethodMetadata&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;=&nbsp;Reflect.getOwnMetadata(metadataKey,&nbsp;target);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!metadata)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata&nbsp;=&nbsp;{};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!metadata.httpRoutes)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata.httpRoutes&nbsp;=&nbsp;[];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newArr:&nbsp;IHttpRoute[]&nbsp;=&nbsp;[{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;httpDecorator,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path,<br>&nbsp;&nbsp;&nbsp;&nbsp;}];<br>&nbsp;&nbsp;&nbsp;&nbsp;newArr.push(...metadata.httpRoutes);<br>&nbsp;&nbsp;&nbsp;&nbsp;metadata.httpRoutes&nbsp;=&nbsp;newArr;<br>&nbsp;&nbsp;&nbsp;&nbsp;Reflect.defineMetadata(metadataKey,&nbsp;metadata,&nbsp;target);<br>}<br>
```

在 `addHttpVerbToMethodMetadata` 方法中，会先获取已保存的元数据，如果 `metadata` 对象不存在则会创建一个空的对象。然后会继续判断该对象上是否含有 `httpRoutes` 属性，没有的话会使用 `[]` 对象来作为该属性的属性值。而请求方法和请求路径这些元数据会以对象的形式保存到数组中，最终在通过 `Reflect.defineMetadata` 方法进行元数据的保存。

同样，我们用一张图来说明一下 `@Get` 装饰器的处理流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

分析完 `@Controller` 和 `@Get` 装饰器，我们已经知道元数据是如何进行保存的。下面我们来回答 “通过 Reflect API 保存的元数据什么时候使用呢？” 这个问题。

#### 2.4 元数据的使用

要搞清楚通过 Reflect API 保存的元数据什么时候使用，我们就需要来回顾一下前面开发的 `SampleServer` 服务器：

```
<span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;SampleServer&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Server&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span></span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>(process.env.NODE_ENV&nbsp;===&nbsp;<span data-darkreader-inline-color="">"development"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setupControllers();<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;setupControllers():&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;userController&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;UserController();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>.addControllers([userController]);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">public</span>&nbsp;start(port:&nbsp;<span data-darkreader-inline-color="">number</span>):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.app.listen(port,&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`⚡️[server]:&nbsp;Server&nbsp;is&nbsp;running&nbsp;at&nbsp;http://localhost:<span data-darkreader-inline-color="">${PORT}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;sampleServer&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;SampleServer();<br>sampleServer.start(PORT);<br>
```

在以上代码中 `SampleServer` 类继承于 OvernightJS 内置的 `Server` 类，对应的 UML 类图如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

此外，在 `SampleServer` 类中我们定义了 `setupControllers` 和 `start` 方法，分别用于初始化控制器和启动服务器。我们在自定义的控制器上使用了 `@Controller` 和 `@Get` 装饰器，因此接下来我们的重点就是分析 `setupControllers` 方法。该方法的内部实现很简单，就是手动创建控制器实例，然后调用父类的 `addControllers` 方法。

下面我们来分析 `addControllers` 方法，该方法位于 `src/core/lib/Server.ts` 文件中，具体实现如下：

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/Server.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;Server&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">public</span>&nbsp;addControllers(<br>&nbsp;&nbsp;&nbsp;&nbsp;controllers:&nbsp;Controller&nbsp;|&nbsp;Controller[],<br>&nbsp;&nbsp;&nbsp;&nbsp;routerLib?:&nbsp;RouterLib,<br>&nbsp;&nbsp;&nbsp;&nbsp;globalMiddleware?:&nbsp;RequestHandler,<br>&nbsp;&nbsp;):&nbsp;<span data-darkreader-inline-color="">void</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controllers&nbsp;=&nbsp;(controllers&nbsp;<span data-darkreader-inline-color="">instanceof</span>&nbsp;<span data-darkreader-inline-color="">Array</span>)&nbsp;?&nbsp;controllers&nbsp;:&nbsp;[controllers];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;①&nbsp;支持动态设置路由库</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;routerLibrary:&nbsp;RouterLib&nbsp;=&nbsp;routerLib&nbsp;||&nbsp;Router;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controllers.forEach(<span>(<span>controller:&nbsp;Controller</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(controller)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;②&nbsp;为每个控制器创建对应的路由对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;routerAndPath:&nbsp;IRouterAndPath&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.getRouter(routerLibrary,&nbsp;controller);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;③&nbsp;注册路由</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(routerAndPath)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(globalMiddleware)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.app.use(routerAndPath.basePath,&nbsp;globalMiddleware,&nbsp;routerAndPath.router);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.app.use(routerAndPath.basePath,&nbsp;routerAndPath.router);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

`addControllers` 方法的整个执行过程还是比较清晰，最核心的部分就是 `getRouter` 方法。在该方法内部就会处理通过装饰器保存的元数据。其实 `getRouter` 方法内部还会处理其他装饰器保存的元数据，简单起见我们只考虑与 `@Controller` 和 `@Get` 装饰器相关的处理逻辑。

```
<span data-darkreader-inline-color="">//&nbsp;src/core/lib/Server.ts</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;Server&nbsp;{<br>&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;getRouter(routerLibrary:&nbsp;RouterLib,&nbsp;controller:&nbsp;Controller):&nbsp;IRouterAndPath&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;prototype:&nbsp;<span data-darkreader-inline-color="">any</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>.getPrototypeOf(controller);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;classMetadata:&nbsp;IClassMetadata&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;=&nbsp;Reflect.getOwnMetadata(classMetadataKey,&nbsp;prototype);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;<span data-darkreader-inline-color="">//&nbsp;省略部分代码</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;basePath,&nbsp;options,&nbsp;...}:&nbsp;IClassMetadata&nbsp;=&nbsp;classMetadata;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;①&nbsp;基于配置项创建Router对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;router:&nbsp;IRouter&nbsp;=&nbsp;routerLibrary(options);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span data-darkreader-inline-color="">//&nbsp;②&nbsp;为路由对象添加路径和请求处理器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;members:&nbsp;<span data-darkreader-inline-color="">any</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>.getOwnPropertyNames(controller);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;members&nbsp;=&nbsp;members.concat(<span data-darkreader-inline-color="">Object</span>.getOwnPropertyNames(prototype));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;members.forEach(<span>(<span>member:&nbsp;<span data-darkreader-inline-color="">any</span></span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;③&nbsp;获取方法中保存的元数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;methodMetadata:&nbsp;IMethodMetadata&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;=&nbsp;Reflect.getOwnMetadata(member,&nbsp;prototype);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(methodMetadata)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;httpRoutes,&nbsp;...}:&nbsp;IMethodMetadata&nbsp;=&nbsp;methodMetadata;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;callBack:&nbsp;<span>(<span>...args:&nbsp;<span data-darkreader-inline-color="">any</span>[]</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">any</span>&nbsp;=&nbsp;(...args:&nbsp;<span data-darkreader-inline-color="">any</span>[]):&nbsp;<span><span>any</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;controller[member](...args);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;省略部分代码</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(httpRoutes)&nbsp;{&nbsp;<span data-darkreader-inline-color="">//&nbsp;httpRoutes数组中包含了请求的方法和路径</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;④&nbsp;处理控制器类中通过@Get、@Post、@Put或@Delete装饰器保存的元数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;httpRoutes.forEach(<span>(<span>route:&nbsp;IHttpRoute</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;httpDecorator,&nbsp;path&nbsp;}:&nbsp;IHttpRoute&nbsp;=&nbsp;route;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;⑤&nbsp;为router对象设置对应的路由信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(middlewares)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;router[httpDecorator](path,&nbsp;middlewares,&nbsp;callBack);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;router[httpDecorator](path,&nbsp;callBack);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;basePath,&nbsp;router,&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

现在我们已经知道 OvernightJS 内部如何利用装饰器来为控制器类配置路由信息，这里阿宝哥用一张图来总结 OvernightJS 的工作流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 OvernightJS 内部除了 `@Controller`、`@Get`、`@Post`、`@Delete` 等装饰器之外，还提供了用于注册中间件的 `@Middleware` 装饰器及用于设置异常处理中间件的 `@ErrorMiddleware` 装饰器。感兴趣的小伙伴可以参考一下阿宝哥的学习思路，自行阅读 OvernightJS 项目的源码。

希望通过这篇文章，可以让小伙伴们对装饰器的应用场景有一些更深刻的理解。

### 三、参考资源

-   Github - overnight
    
-   expressjs.com
    

\- END -

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**敬请关注「Nodejs技术栈」微信公众号，期望与志同道合的你一起打造优质 “Nodejs技术栈” 交流群，一起互相学习进步！可长按下方二维码添加【五月君】个人微信备注 “Node” 邀请入群。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)