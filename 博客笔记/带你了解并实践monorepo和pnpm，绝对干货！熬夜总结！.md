> **模拟面试、简历指导、入职指导、项目指导、答疑解惑**可私信找我~已帮助100+名同学完成改造！

## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心。分享一篇好文~

![Image](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdhXSdOdD9WbSLBU7icHaHsI5pgFBOcGTWQbovdwHnfTo1C6bq4qYviaWkvYYx1R2GicXibmMrIuF07LGg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 为什么使用monorepo

### 什么是monorepo

简单来说就是，将多个项目或包文件放到一个git仓库来管理。 目前比较广泛应用的是`yarn+lerna`的方式实现`monorepo`的管理。 一个简单的`monorepo`的目录结构类似这样：

```
js<br>复制代码<br>├──&nbsp;packages<br>|&nbsp;&nbsp;&nbsp;├──&nbsp;pkg1<br>|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;├──&nbsp;package.json<br>|&nbsp;&nbsp;&nbsp;├──&nbsp;pkg2<br>|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;├──&nbsp;package.json<br>├──&nbsp;package.json<br>├──&nbsp;lerna.json<br>
```

之所以应用`monorepo`，主要是解决以下问题：

-   代码复用的问题
    
-   开发流程统一
    
-   高效管理多项目/包
    

## pnpm的使用

### 为什么用pnpm

关于为什么越来越多的人推荐使用pnpm,可以参考这篇文章\[1\] 这里简单列一下pnpm相对于yarn/npm的优势：

1.  **安装速度最快**（非扁平的包结构，没有`yarn/npm`的复杂的扁平算法，且只更新变化的文件）
    
2.  **节省磁盘空间** （统一安装包到磁盘的某个位置，项目中的`node_modules`通过`hard-link`的方式链接到实际的安装地址）
    

### pnpm安装包有何不同

目前，使用`npm/yarn`安装包是扁平结构（以前是嵌套结构，npm3之后改为扁平结构）

**扁平结构** 就是安装一个包，那么这个包依赖的包将一起被安装到与这个包同级的目录下。比如安装一个`express`包，打开目录下的`node_modules`会发现除了`express`之外，多出很多其他的包。如图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

**嵌套结构** 就是一个包的依赖包会安装在这个包文件下的`node_modules`下，而依赖的依赖会安装到依赖包文件的`node_modules`下。依此类推。如下所示：

```
js<br>复制代码<br>node_modules<br>├─&nbsp;foo<br>&nbsp;&nbsp;├─&nbsp;node_modules<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;bar<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;index.js<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;package.json<br>&nbsp;&nbsp;├─&nbsp;index.js<br>&nbsp;&nbsp;└─&nbsp;package.json<br>
```

嵌套结构的问题在于：

-   **包文件的目录可能会非常长**
    
-   **重复安装包**
    
-   **相同包的实例不能共享**
    

而扁平结构也同样存在问题：

-   **依赖结构的不确定性**（不同包依赖某个包的不同版本 最终安装的版本具有不确定性）可通过lock文件确定安装版本
    
-   **扁平化算法复杂，耗时**
    
-   **非法访问未声明的包**
    

现在，我们使用`pnpm`来安装`express`，然后打开`node_modules`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

从上图可以发现：

1.  `node_modules`下只有`express`一个包，且这个被软链到了其他的地方。
    
2.  **.modlues.yaml**包含了一些`pnpm`包管理的配置信息。如下图：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

可以看到 **.pnpm目录的实际指向的pnpm store的路径**、**pnpm包的版本**等信息

3.  **.pnpm**目录可以看到所有安装了的依赖包。如下图：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

观察之后，发现安装结构和官方发布的图是完全一致的：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

由官方图我们可以了解到：

-   当我们安装`bar`包时，根目录下只包含安装的包`bar`
    
-   而`node_modules`目录下的`bar`包会`软链接`到`.pnpm/bar/node_modules/bar@*.*.*`
    
-   bar的依赖包foo会被提升到.pnpm的根目录下，其他包依赖foo时也会`软链接`到这里
    
-   而bar和foo实际通过`硬链接`到`.pnpm store`中
    

> 软链接可以理解成快捷方式。 它和windows下的快捷方式的作用是一样的。 硬链接等于`cp -p` 加 `同步更新`。即文件大小和创建时间与源文件相同，源文件修改，硬链接的文件会同步更新。应用：可以防止别人误删你的源文件

**软链接解决了磁盘空间占用的问题，而硬链接解决了包的同步更新和统一管理问题。** 还有一个巧妙的设计就是：**将安装包和依赖包放在同一级目录下，即.pnpm/依赖包/node\_modules下**。这个设计也就防止了 \*\*`依赖包间的非法访问`\*\*，根据Node模块路径解析规则\[2\]可知，不在安装包同级的依赖包无法被访问，即只能访问安装包依赖的包。

现在应该没理由不升级你的包管理工具了吧！

如果你还有使用`npm/yarn`的场景，那么，可以推荐使用 \*\*ni\*\*\[3\] 这个工具，它可以帮你自动识别项目使用的包管理工具，你只需要一行命名就搞定了。

比如： 执行命令`ni`安装依赖包，如果当前项目包含`pnpm-lock.yaml`，那么会使用 `pnpm install`执行安装命令，否则判断是否包含`package-lock.json`/`yarn.lock`/`bun.lockb`，来确定使用哪个包管理工具去执行安装命令。

## pnpm workspace实践

### 1\. 新建仓库并初始化

新建目录`pnpm-workspace-demo`，执行`npm init / pnpm init`初始化项目，生成 **package.json**

### 2\. 指定项目运行的Node、pnpm版本

为了减少因`node`或`pnpm`的版本的差异而产生开发环境错误，我们在package.json中增加`engines`字段来限制版本。

```
js<br>复制代码<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"engines"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"node"</span>:&nbsp;<span data-darkreader-inline-color="">"&gt;=16"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"pnpm"</span>:&nbsp;<span data-darkreader-inline-color="">"&gt;=7"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

### 3\. 安全性设置

为了防止我们的根目录被当作包发布，我们需要在package.json加入如下设置：

```
js<br>复制代码<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>}<br>
```

`pnpm`本身支持monorepo，不用额外安装包，真是太棒了！ 但是每个monorepo的根目录下必须包含`pnpm-workspace.yaml`文件。 目录下新建`pnpm-workspace.yaml`文件，内容如下：

```
yaml<br>复制代码<br>packages:&nbsp;&nbsp;<br><span data-darkreader-inline-color="">#&nbsp;all&nbsp;packages&nbsp;in&nbsp;direct&nbsp;subdirs&nbsp;of&nbsp;packages/&nbsp;&nbsp;</span><br>-&nbsp;<span data-darkreader-inline-color="">'packages/*'</span><br>
```

### 4\. 安装包

#### 4.1 安装全局依赖包

有些依赖包需要全局安装，也就是安装到根目录，比如我们常用的编译依赖包`rollup、execa、chalk、enquirer、fs-extra、minimist、npm-run-all、typescript`等 运行如下命令：

`-w` 表示在workspace的根目录下安装而不是当前的目录

```
sql<br>复制代码<br>pnpm&nbsp;add&nbsp;rollup&nbsp;chalk&nbsp;minimist&nbsp;npm-run-all&nbsp;typescript&nbsp;-Dw<br>
```

与安装命令`pnpm add pkgname`相反的的删除依赖包`pnpm rm/remove pkgname`或`pnpm un/uninstall pkgname`

#### 4.2 安装子包的依赖

除了进入子包目录直接安装`pnpm add pkgname`之外，还可以通过过滤参数 `--filter`或`-F`指定命令作用范围。格式如下：

`pnpm --filter/-F 具体包目录名/包的name/正则匹配包名/匹配目录 command`

比如：我在packages目录下新建两个子包，分别为`tools`和`mini-cli`，假如我要在`min-cli`包下安装`react`，那么，我们可以执行以下命令：

```
js<br>复制代码<br>pnpm&nbsp;--filter&nbsp;mini-cli&nbsp;add&nbsp;react<br>
```

更多的过滤配置可参考：www.pnpm.cn/filtering\[4\]

#### 4.3 打包输出包内容

这里选用rollup\[5\]作为打包工具，由于其打包具有**更小的体积**及**tree-shaking**的特性，可以说是作为工具库打包的最佳选择。

先安装打包常用的一些插件：

```
sql<br>复制代码<br>pnpm&nbsp;add&nbsp;rollup-plugin-typescript2&nbsp;@rollup/plugin-json&nbsp;@rollup/plugin-terser&nbsp;-Dw<br>
```

##### 基础编译配置

目录下新建rollup的配置文件`rollup.config.mjs`，考虑到多个包同时打包的情况，预留`input`为通过`rollup`通过参数传入。这里用`process.env.TARGET`表示不同包目录。

以下为编译的基础配置，主要包括:

-   支持的输出包格式，即`format`种类，预定义好输出配置，方便后面使用
    
-   根据`rollup`动态传入包名获取`input`
    
-   对浏览器端使用的format进行压缩处理
    
-   将`rollup`配置导出为数组，每种`format`都有一组配置，每个包可能需要导出多种`format`
    

```
js<br>复制代码<br>import&nbsp;{&nbsp;createRequire&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'module'</span><br>import&nbsp;{&nbsp;fileURLToPath&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'url'</span><br>import&nbsp;path&nbsp;from&nbsp;<span data-darkreader-inline-color="">'path'</span><br>import&nbsp;json&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-json'</span><br>import&nbsp;terser&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-terser'</span><br><br>const&nbsp;require&nbsp;=&nbsp;createRequire(import.meta.url)<br>const&nbsp;__dirname&nbsp;=&nbsp;fileURLToPath(new&nbsp;URL(<span data-darkreader-inline-color="">'.'</span>,&nbsp;import.meta.url))<br>const&nbsp;packagesDir&nbsp;=&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'packages'</span>)<br>const&nbsp;packageDir&nbsp;=&nbsp;path.resolve(packagesDir,&nbsp;process.env.TARGET)<br><br>const&nbsp;resolve&nbsp;=&nbsp;p&nbsp;=&gt;&nbsp;path.resolve(packageDir,&nbsp;p)<br>const&nbsp;pkg&nbsp;=&nbsp;require(resolve(`package.json`))<br>const&nbsp;packageOptions&nbsp;=&nbsp;pkg.buildOptions&nbsp;||&nbsp;{}<br>const&nbsp;name&nbsp;=&nbsp;packageOptions.filename&nbsp;||&nbsp;path.basename(packageDir)<br><br>//&nbsp;定义输出类型对应的编译项<br>const&nbsp;outputConfigs&nbsp;=&nbsp;{<br><span data-darkreader-inline-color="">'esm-bundler'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;resolve(`dist/<span data-darkreader-inline-color="">${name}</span>.esm-bundler.js`),<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;`es`<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'esm-browser'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;resolve(`dist/<span data-darkreader-inline-color="">${name}</span>.esm-browser.js`),<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;`es`<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;cjs:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;resolve(`dist/<span data-darkreader-inline-color="">${name}</span>.cjs.js`),<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;`cjs`<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;global:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;name,<br>&nbsp;&nbsp;&nbsp;&nbsp;file:&nbsp;resolve(`dist/<span data-darkreader-inline-color="">${name}</span>.global.js`),<br>&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;`iife`<br>&nbsp;&nbsp;}<br>}<br><br>const&nbsp;packageFormats&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'esm-bundler'</span>,&nbsp;<span data-darkreader-inline-color="">'cjs'</span>]<br>const&nbsp;packageConfigs&nbsp;=&nbsp;packageFormats.map(format&nbsp;=&gt;&nbsp;createConfig(format,&nbsp;outputConfigs[format]))<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;packageConfigs<br><br><span data-darkreader-inline-color="">function</span>&nbsp;createConfig(format,&nbsp;output,&nbsp;plugins&nbsp;=&nbsp;[])&nbsp;{<br>&nbsp;&nbsp;//&nbsp;是否输出声明文件<br>&nbsp;&nbsp;const&nbsp;shouldEmitDeclarations&nbsp;=&nbsp;!!pkg.types<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;const&nbsp;minifyPlugin&nbsp;=&nbsp;format&nbsp;===&nbsp;<span data-darkreader-inline-color="">'global'</span>&nbsp;&amp;&amp;&nbsp;format&nbsp;===&nbsp;<span data-darkreader-inline-color="">'esm-browser'</span>&nbsp;?&nbsp;[terser()]&nbsp;:&nbsp;[]<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input:&nbsp;resolve(<span data-darkreader-inline-color="">'src/index.ts'</span>),<br>&nbsp;&nbsp;//&nbsp;Global&nbsp;and&nbsp;Browser&nbsp;ESM&nbsp;builds&nbsp;inlines&nbsp;everything&nbsp;so&nbsp;that&nbsp;they&nbsp;can&nbsp;be<br>&nbsp;&nbsp;//&nbsp;used&nbsp;alone.<br>&nbsp;&nbsp;external:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...[<span data-darkreader-inline-color="">'path'</span>,&nbsp;<span data-darkreader-inline-color="">'fs'</span>,&nbsp;<span data-darkreader-inline-color="">'os'</span>,&nbsp;<span data-darkreader-inline-color="">'http'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...Object.keys(pkg.dependencies||{}),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...Object.keys(pkg.peerDependencies&nbsp;||&nbsp;{}),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...Object.keys(pkg.devDependencies||{}),<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;namedExports:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;...minifyPlugin,<br>&nbsp;&nbsp;&nbsp;&nbsp;...plugins<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;output,<br>&nbsp;&nbsp;onwarn:&nbsp;(msg,&nbsp;warn)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!/Circular/.<span data-darkreader-inline-color="">test</span>(msg))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;warn(msg)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;treeshake:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;moduleSideEffects:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

##### 多包同时编译

根目录下新建`scripts`目录，并新建`build.js`用于打包编译执行。为了实现多包同时进行打包操作，我们首先需要获取`packages`下的所有子包

```
js<br>复制代码<br>const&nbsp;fs&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'fs'</span>)<br>const&nbsp;{rm}&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'fs/promises'</span>)<br>const&nbsp;path&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'path'</span>)<br>const&nbsp;allTargets&nbsp;=&nbsp;(fs.readdirSync(<span data-darkreader-inline-color="">'packages'</span>).filter(f&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;过滤掉非目录文件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!fs.statSync(`packages/<span data-darkreader-inline-color="">${f}</span>`).isDirectory())&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pkg&nbsp;=&nbsp;require(`../packages/<span data-darkreader-inline-color="">${f}</span>/package.json`)<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;过滤掉私有包和不带编译配置的包<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(pkg.private&nbsp;&amp;&amp;&nbsp;!pkg.buildOptions)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;}))<br>
```

获取到子包之后就可以执行build操作，这里我们借助 execa\[6\] 来执行`rollup`命令。代码如下：

```
js<br>复制代码<br>const&nbsp;build&nbsp;=&nbsp;async&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(target)&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pkgDir&nbsp;=&nbsp;path.resolve(`packages/<span data-darkreader-inline-color="">${target}</span>`)<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;pkg&nbsp;=&nbsp;require(`<span data-darkreader-inline-color="">${pkgDir}</span>/package.json`)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;编译前移除之前生成的产物<br>&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;rm(`<span data-darkreader-inline-color="">${pkgDir}</span>/dist`,{&nbsp;recursive:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;force:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;-c&nbsp;指使用配置文件&nbsp;默认为rollup.config.js<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;--environment&nbsp;向配置文件传递环境变量&nbsp;配置文件通过proccess.env.获取<br>&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;execa(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'rollup'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'-c'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'--environment'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TARGET:<span data-darkreader-inline-color="">${target}</span>`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.filter(Boolean)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.join(<span data-darkreader-inline-color="">','</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;stdio:&nbsp;<span data-darkreader-inline-color="">'inherit'</span>&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>}<br>
```

同步编译多个包时，为了不影响编译性能，我们需要控制并发的个数，这里我们暂定并发数为`4`，编译入口大概长这样：

```
js<br>复制代码<br>const&nbsp;targets&nbsp;=&nbsp;allTargets&nbsp;//&nbsp;上面的获取的子包<br>const&nbsp;maxConcurrency&nbsp;=&nbsp;4&nbsp;//&nbsp;并发编译个数<br><br>const&nbsp;buildAll&nbsp;=&nbsp;async&nbsp;<span><span data-darkreader-inline-color="">function</span></span>&nbsp;()&nbsp;{<br>&nbsp;&nbsp;const&nbsp;ret&nbsp;=&nbsp;[]<br>&nbsp;&nbsp;const&nbsp;executing&nbsp;=&nbsp;[]<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(const&nbsp;item&nbsp;of&nbsp;targets)&nbsp;{<br>&nbsp;&nbsp;//&nbsp;依次对子包执行build()操作<br>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;p&nbsp;=&nbsp;Promise.resolve().<span data-darkreader-inline-color="">then</span>(()&nbsp;=&gt;&nbsp;build(item))<br>&nbsp;&nbsp;&nbsp;&nbsp;ret.push(p)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(maxConcurrency&nbsp;&lt;=&nbsp;targets.length)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;e&nbsp;=&nbsp;p.then(()&nbsp;=&gt;&nbsp;executing.splice(executing.indexOf(e),&nbsp;1))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;executing.push(e)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(executing.length&nbsp;&gt;=&nbsp;maxConcurrency)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;Promise.race(executing)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;Promise.all(ret)<br>}<br>//&nbsp;执行编译操作<br>buildAll()<br>
```

最后，我们将脚本添加到根目录的package.json中即可。

```
json<br>复制代码<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"node&nbsp;scripts/build.js"</span><br>&nbsp;&nbsp;},<br>}<br>
```

现在我们简单运行`pnpm run build`即可完成所有包的编译工作。（注：还需要添加后面的`TS`插件才能工作）。

此时，在每个包下面会生成`dist`目录，因为我们默认的是`esm-bundler`和`cjs`两种format，所以目录下生成的文件是这样的

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

那么，如果我们想自定义生成文件的格式该怎么办呢？

##### 子包自定义编译输出格式

最简单的方法其实就是在package.json里做配置，在打包的时候我们直接取这里的配置即可，比如我们在包`tools`里做如下配置：

```
json<br>复制代码<br>{<br><span data-darkreader-inline-color="">"buildOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"tools"</span>,&nbsp;//&nbsp;定义global时全局变量的名称<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"filename"</span>:&nbsp;<span data-darkreader-inline-color="">"tools"</span>,&nbsp;//&nbsp;定义输出的文件名&nbsp;比如tools.esm-browser.js&nbsp;生成的文件为[filename].[format].js<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"formats"</span>:&nbsp;[&nbsp;//&nbsp;定义输出<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esm-bundler"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esm-browser"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"cjs"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"global"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;},<br>}<br>
```

这里我们只需要在基础配置文件`rollup.config.mjs`里去做些改动即可：

```
js<br>复制代码<br>const&nbsp;defaultFormats&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'esm-bundler'</span>,&nbsp;<span data-darkreader-inline-color="">'cjs'</span>]<br>const&nbsp;packageFormats&nbsp;=&nbsp;packageOptions.formats&nbsp;||&nbsp;defaultFormats&nbsp;//&nbsp;优先使用每个包里自定义的formats<br>const&nbsp;packageConfigs&nbsp;=&nbsp;packageFormats.map(format&nbsp;=&gt;&nbsp;createConfig(format,&nbsp;outputConfigs[format]))<br>
```

##### 命令行自定义打包并指定其格式

比如我想单独打包`tools`并指定输出的文件为`global`类型，大概可以这么写：

```
arduino<br>复制代码<br>pnpm&nbsp;run&nbsp;build&nbsp;tools&nbsp;--formats&nbsp;global<br>
```

这里其实就是将命令行参数接入到打包脚本里即可。 大概分为以下几步：

1.  使用minimist\[7\]取得命令行参数
    

```
js<br>复制代码<br>const&nbsp;args&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'minimist'</span>)(process.argv.slice(2))<br>const&nbsp;targets&nbsp;=&nbsp;args._.length&nbsp;?&nbsp;args._&nbsp;:&nbsp;allTargets<br>const&nbsp;formats&nbsp;=&nbsp;args.formats&nbsp;||&nbsp;args.f<br>
```

2.  将取得的参数传递到`rollup`的环境变量中，修改`execa`部分
    

```
js<br>复制代码<br>await&nbsp;execa(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'rollup'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'-c'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'--environment'</span>,&nbsp;//&nbsp;传递环境变量&nbsp;&nbsp;配置文件可通过proccess.env.获取<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TARGET:<span data-darkreader-inline-color="">${target}</span>`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formats&nbsp;?&nbsp;`FORMATS:<span data-darkreader-inline-color="">${formats}</span>`&nbsp;:&nbsp;``&nbsp;//&nbsp;将参数继续传递&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.filter(Boolean)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.join(<span data-darkreader-inline-color="">','</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;stdio:&nbsp;<span data-darkreader-inline-color="">'inherit'</span>&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;)<br>
```

3.  在`rollup.config.mjs`中获取环境变量并应用
    

```
js<br>复制代码<br>const&nbsp;defaultFormats&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'esm-bundler'</span>,&nbsp;<span data-darkreader-inline-color="">'cjs'</span>]<br>const&nbsp;inlineFormats&nbsp;=&nbsp;process.env.FORMATS&nbsp;&amp;&amp;&nbsp;process.env.FORMATS.split(<span data-darkreader-inline-color="">','</span>)&nbsp;//&nbsp;获取rollup传递过来的环境变量process.env.FORMATS<br>const&nbsp;packageFormats&nbsp;=&nbsp;inlineFormats&nbsp;||&nbsp;packageOptions.formats&nbsp;||&nbsp;defaultFormats<br>
```

##### TS打包

对于ts编写的项目通常也会发布声明文件，只需要在`package.json`添加`types`字段来指定声明文件即可。那么，我们其实在做打包时就可以利用这个字段来判断是否要生成声明文件。对于rollup，我们利用其插件`rollup-plugin-typescript2`来解析ts文件并生成声明文件。 在rollup.config.mjs中添加如下配置：

```
js<br>复制代码<br>//&nbsp;是否输出声明文件&nbsp;取每个包的package.json的types字段<br>&nbsp;&nbsp;const&nbsp;shouldEmitDeclarations&nbsp;=&nbsp;!!pkg.types<br><br>&nbsp;&nbsp;const&nbsp;tsPlugin&nbsp;=&nbsp;ts({<br>&nbsp;&nbsp;&nbsp;&nbsp;tsconfig:&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'tsconfig.json'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;tsconfigOverride:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compilerOptions:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:&nbsp;format&nbsp;===&nbsp;<span data-darkreader-inline-color="">'cjs'</span>&nbsp;?&nbsp;<span data-darkreader-inline-color="">'es2019'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">'es2015'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceMap:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;declaration:&nbsp;shouldEmitDeclarations,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;declarationMap:&nbsp;shouldEmitDeclarations<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;json({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;namedExports:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tsPlugin,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...minifyPlugin,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...plugins<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>
```

##### 将生成的声明文件整理到指定文件

以上配置运行后会在每个包下面生成所有包的声明文件，如图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这并不是我们想要的，我们期望在dist目录下仅生成一个 **.d.ts**文件就好了，使用起来也方便。这里我们借助api-extractor\[8\]来做这个工作。这个工具主要有三大功能，我们要使用的是红框部分的功能，如图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)关键实现步骤：

1.  根目录下生成`api-extractor.json`并将`dtsRollup`设置为开启
    
2.  子包下添加`api-extractor.json`并定义声明文件入口及导出项，如下所示：
    

```
json<br>复制代码<br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;<span data-darkreader-inline-color="">"../../api-extractor.json"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"mainEntryPointFilePath"</span>:&nbsp;<span data-darkreader-inline-color="">"./dist/packages/&lt;unscopedPackageName&gt;/src/index.d.ts"</span>,&nbsp;//&nbsp;rollup生成的声明文件<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dtsRollup"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"publicTrimmedFilePath"</span>:&nbsp;<span data-darkreader-inline-color="">"./dist/&lt;unscopedPackageName&gt;.d.ts"</span>&nbsp;//&nbsp;抽离为一个声明文件到dist目录下<br>&nbsp;&nbsp;}<br>}<br>
```

3.  在rollup执行完成后做触发`API Extractor`操作，在build方法中增加以下操作：
    

```
js<br>复制代码<br>build(target)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;execa(<span data-darkreader-inline-color="">'rollup'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;执行完rollup生成声明文件后<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;package.json中定义此字段时执行<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(pkg.types)&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chalk.bold(chalk.yellow(`Rolling&nbsp;up&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;definitions&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;<span data-darkreader-inline-color="">${target}</span>...`))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;执行API&nbsp;Extractor操作&nbsp;重新生成声明文件<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;{&nbsp;Extractor,&nbsp;ExtractorConfig&nbsp;}&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'@microsoft/api-extractor'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;extractorConfigPath&nbsp;=&nbsp;path.resolve(pkgDir,&nbsp;`api-extractor.json`)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;extractorConfig&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ExtractorConfig.loadFileAndPrepare(extractorConfigPath)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;extractorResult&nbsp;=&nbsp;Extractor.invoke(extractorConfig,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localBuild:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showVerboseMessages:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(extractorResult.succeeded)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(`API&nbsp;Extractor&nbsp;completed&nbsp;successfully`);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.exitCode&nbsp;=&nbsp;0;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(`API&nbsp;Extractor&nbsp;completed&nbsp;with&nbsp;<span data-darkreader-inline-color="">${extractorResult.errorCount}</span>&nbsp;errors`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;`&nbsp;and&nbsp;<span data-darkreader-inline-color="">${extractorResult.warningCount}</span>&nbsp;warnings`);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.exitCode&nbsp;=&nbsp;1;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;删除ts生成的声明文件<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;rm(`<span data-darkreader-inline-color="">${pkgDir}</span>/dist/packages`,{&nbsp;recursive:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;force:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

4.  删除`rollup`生成的声明文件
    

那么，到这里，整个打包流程就比较完备了。

## changesets的使用

对于pnpm workspace实现的monorepo，如果要管理包版本并发布，需要借助一些工具，官方推荐使用如下工具：

-   changesets\[9\]
    
-   rush\[10\]
    

我们这里主要学习一下`changesets`的使用，它的主要作用有两个：

-   **管理包版本**
    
-   **生成changelog**
    

对于`monorepo`项目使用它会更加方便，当然单包也可以使用。主要区别在于项目下有没有`pnpm-workspace.yaml`，如果未指定多包，那么会当作普通包进行处理。 那么，我们来看一下具体的步骤：

## 1\. 安装

```
sql<br>复制代码<br>pnpm&nbsp;add&nbsp;@changesets/cli&nbsp;-Dw<br>
```

## 2\. 初始化changeset配置

```
csharp<br>复制代码<br>npx&nbsp;changeset&nbsp;init<br>
```

这个命令会在根目录下生成`.changeset`文件夹，文件夹下包含一个config文件和一个readme文件。生成的config文件长这样：

```
json<br>复制代码<br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$schema</span>"</span>:&nbsp;<span data-darkreader-inline-color="">"https://unpkg.com/@changesets/config@2.3.0/schema.json"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"changelog"</span>:&nbsp;<span data-darkreader-inline-color="">"@changesets/cli/changelog"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"commit"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;//&nbsp;是否提交因changeset和changeset&nbsp;version引起的文件修改<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"fixed"</span>:&nbsp;[],&nbsp;//&nbsp;设置一组共享版本的包&nbsp;一个组里的包，无论有没有修改、是否有依赖，都会同步修改到相同的版本<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"linked"</span>:&nbsp;[],&nbsp;//&nbsp;设置一组需要关联版本的包&nbsp;有依赖关系或有修改的包会同步更新到相同版本&nbsp;未修改且无依赖关系的包则版本不做变化<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"access"</span>:&nbsp;<span data-darkreader-inline-color="">"public"</span>,&nbsp;//&nbsp;发布为私有包/公共包<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"baseBranch"</span>:&nbsp;<span data-darkreader-inline-color="">"main"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"updateInternalDependencies"</span>:&nbsp;<span data-darkreader-inline-color="">"patch"</span>,&nbsp;//&nbsp;确保依赖包是否更新、更新版本的衡量单位<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"ignore"</span>:&nbsp;[]&nbsp;//&nbsp;忽略掉的不需要发布的包<br>}<br>
```

关于每个配置项的详细含义参考：config.json\[11\] 这里有几点需要注意的：

-   `access` 默认`restricted`发布为私有包，需要改为`public`公共包，否则发布时会报错
    
-   对于依赖包版本的控制，我们需要重点理解一下 \*\*fixed\*\*\[12\] 和 \*\*linked\*\*\[13\] 的区别
    
-   `fixed`和`linked`的值为二维数组，元素为具体的包名或匹配表达式，但是这些包必须在`pnpm-workspace.yaml`添加过
    

## 3\. 生成发布包版本信息

运行`npx changeset`，会出现一系列确认问题，包括：

-   需要为哪些包更新版本
    
-   哪些包更新为major版本
    
-   哪些包更新为minor版本
    
-   修改信息（会添加到最终生成的changelog.md中） 所有问题回答完成之后，会在`.changeset`下生成一个`Markdown`文件，这个文件的内容就是刚才问题的答案集合，大概长这样:
    

```
yaml<br>复制代码<br>---<br><span data-darkreader-inline-color="">'@scope/mini-cli'</span>:&nbsp;major<br><span data-darkreader-inline-color="">'@scope/tools'</span>:&nbsp;minor<br>---<br><br>update&nbsp;packages<br>
```

`—--` 中间为要更新版本的包列表 以及包对应的更新版本，最下面是修改信息

## 4\. 更新包版本并生成changelog

运行`npx changeset version` 这个命令会做以下操作

-   依据上一步生成的md文件和changeset的config文件更新相关包版本
    
-   为版本更新的包生成`CHANGELOG.md`文件 填入上一步填写的修改信息
    
-   删除上一步生成的`Markdown`文件，保证只使用一次
    

**建议执行此操作后，`pulish`之前将改动合并到主分支**

## 5\. 版本发布

这个没啥好说的，直接执行命令`npx changeset publish`即可

为了保证发布功能，添加如下脚本：

```
json<br>复制代码<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"release"</span>:&nbsp;<span data-darkreader-inline-color="">"run-s&nbsp;build&nbsp;releaseOnly"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"releaseOnly"</span>:&nbsp;<span data-darkreader-inline-color="">"changeset&nbsp;publish"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

## 预发布版本

changeset提供了带tag的预发布版本的模式，这个模式使用时候需要注意：

-   通过`pre enter/exit`进入或退出预发布模式，在这个模式下可以执行正常模式下的所有命令，比如`version`、`publish`
    
-   为了不影响正式版本，预发布模式最好**在单独分支进行操作**，以免带来不好修复的问题
    
-   预发布模式下，版本号为正常模式下应该生成的版本号加`-<tag>.<num>`结尾。`tag`为pre命令接的tag名，`num`每次发布都会递增 从0开始
    
-   **预发布的版本并不符合语义化版本的范围**，比如我的依赖包版本为"^1.0.0"，那么，预发布版本是不满足这个版本的，所以依赖包版本会保持不变
    

一个完整的预发布包大概要执行以下操作：

1.  `changeset pre enter <tag>` 进入预发布模式
    
2.  `changeset` 确认发布包版本信息
    
3.  `changeset version` 生成预发布版本号和changelog
    
4.  `changeset publish` 发布预发布版本
    

这里的`tag`可以是我们常用的几种类型：

| 名称 | 功能 |
| --- | --- |
| alpha | 是内部测试版，一般不向外部发布，会有很多Bug，一般只有测试人员使用 |
| beta | 也是测试版，这个阶段的版本会一直加入新的功能。在Alpha版之后推出 |
| rc | (Release　Candidate) 发行候选版本。RC版不会再加入新的功能了，主要着重于除错 |

**每次需要更新版本时从第二步往后再次执行即可**

如果需要发布正式版本，退出预发布模式`changeset pre exit`，然后切换到主分支操作即可

## 代码格式校验

这里主要对代码风格进行校验， 校验工具为`eslint` （主要对js、ts等js语言的文件）和 `prettier`（js、css等多种类型的文件）

辅助工具为

-   \*\*lint-stage\*\*\[14\] 检查暂存区中的文件
    
-   \*\*simple-git-hooks\*\*\[15\] 一个git钩子管理工具，优点是使用简单，缺点是每个钩子只能执行一个命令，如果需要执行多个命令可以选择`husky`
    

配置如下：

```
json<br>复制代码<br>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"simple-git-hooks"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"pre-commit"</span>:&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;lint-staged"</span>&nbsp;//&nbsp;注册提交前操作&nbsp;即进行代码格式校验<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"lint-staged"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"*.{js,json}"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prettier&nbsp;--write"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"*.ts?(x)"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"eslint"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prettier&nbsp;--parser=typescript&nbsp;--write"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>}<br>
```

对于钩子函数的注册通过`simple-git-hooks`来实现，在项目安装依赖之后触发钩子注册。可以添加以下脚本。（如果钩子操作改变，则需要重新执行安装依赖操作来更新）

```
json<br>复制代码<br><span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"postinstall"</span>:&nbsp;<span data-darkreader-inline-color="">"simple-git-hooks"</span>,<br>&nbsp;&nbsp;},<br>
```

## 代码规范提交

这里主要用到以下三个工具：

-   \*\*Commitizen\*\*\[16\]：**是一个命令行提示工具，它主要用于帮助我们更快地写出规范的commit message**
    
-   \*\*Commitlint\*\*\[17\]：**用于校验填写的commit message是否符合设定的规范**
    
-   \*\*simple-git-hooks\*\*\[18\]
    

## 1\. Commitizen的使用

1.  安装`Commitizen`
    

```
复制代码<br>npm&nbsp;install&nbsp;-g&nbsp;commitizen<br>
```

2.  安装`Commitizen`的适配器，确定使用的规范，这里使用cz-conventional-changelog\[19\]，也可以选择其他的适配器
    

```
复制代码<br>npm&nbsp;install&nbsp;-g&nbsp;cz-conventional-changelog<br>
```

3.  全局指定适配器
    

```
json<br>复制代码<br>//&nbsp;mac用户<br><span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">'{&nbsp;"path":&nbsp;"cz-conventional-changelog"&nbsp;}'</span>&nbsp;&gt;&nbsp;~/.czrc<br>
```

这个时候执行命令`git cz`会自动进入交互式生成commit message的询问中，如图：

2\. Commitlint如何配置

我们可以通过配置的`git cz`命令进行规范的代码提交，那么，如果其他同事依然使用的是`git commit`来提交代码的话，那么，提交信息就会比较乱。这时候就需要对`commit mesaage`进行校验了，如果不通过则中断提交。这个校验就可以通过`Commitlint`来完成。

对于按照何种规则来校验，我们就需要单独安装检验规则的包来进行检验，比如@commitlint/config-conventional\[20\]

如果想定义自己的规则可以参考cz-customizable\[21\]

1.  首先安装这两个包：
    

```
sql<br>复制代码<br>pnpm&nbsp;add&nbsp;@commitlint/config-conventional&nbsp;@commitlint/cli&nbsp;-Dw<br>
```

2.  根目录下写入`commitlint`配置，指定规则包
    

```
arduino<br>复制代码<br><span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">"module.exports&nbsp;=&nbsp;{extends:&nbsp;['@commitlint/config-conventional']}"</span>&nbsp;&gt;&nbsp;commitlint.config.js<br>
```

3.  配置git钩子执行校验操作 （执行`pnpm install`更新钩子）
    

```
json<br>复制代码<br><span data-darkreader-inline-color="">"simple-git-hooks"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"commit-msg"</span>:&nbsp;<span data-darkreader-inline-color="">"npx&nbsp;--no&nbsp;--&nbsp;commitlint&nbsp;--edit&nbsp;<span data-darkreader-inline-color="">${1}</span>"</span><br>&nbsp;&nbsp;},<br>
```

这个时候再提交会对commit message进行校验，不符合规范则会出现以下提示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 结语

我是林三心

-   一个待过**小型toG型外包公司、大型外包公司、小公司、潜力型创业公司、大公司**的作死型前端选手；
    
-   一个偏前端的全干工程师；
    
-   一个不正经的掘金作者；
    
-   逗比的B站up主；
    
-   不帅的小红书博主；
    
-   喜欢打铁的篮球菜鸟；
    
-   喜欢历史的乏味少年；
    
-   喜欢rap的五音不全弱鸡
    

如果你想一起学习前端，一起摸鱼，一起研究简历优化，一起研究面试进步，一起交流历史音乐篮球rap，可以来俺的摸鱼学习群哈哈，点这个，有7000多名前端小伙伴在等着一起学习哦 --> 

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 广州的兄弟可以约饭哦，或者约球~我负责打铁，你负责进球，谢谢~

> **模拟面试、简历指导、入职指导、项目指导、答疑解惑**可私信找我~已帮助100+名同学完成改造！

> 作者：三只小海豚  
> 链接：https://juejin.cn/post/7184392660939964474  
> 来源：稀土掘金