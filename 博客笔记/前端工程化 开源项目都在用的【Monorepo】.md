## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心~

## Monorepo

Monorepo 是一种项目代码管理方式，指单个仓库中管理多个项目，有助于简化代码共享、版本控制、构建和部署等方面的复杂性，并提供更好的可重用性和协作性。

简单理解：所有的项目在一个代码仓库中，但并不是说代码没有组织的都放在一个文件夹里面。

Monorepo 提倡了开放、透明、共享的组织文化，这种方法已经被很多大型公司广泛使用🧐，如 Google、Facebook 和 Microsoft 等，很多前端常用的开源库也在使用，如Vue、React、Element-plus

## 发展历程

### Monolith时期

单一代码仓库：传统的单体式应用程序通常将所有的功能和模块打包在一起，形成一个单一的代码库和部署单元。这种单一的代码库包含了应用程序的所有部分，从前端界面到后端逻辑，甚至包括数据库模式和配置文件等。🚧

存在问题：

-   难以实现部分更新和独立扩展的灵活性
    
-   高度耦合，代码臃肿
    

### MultiRepo时期

多代码仓库：将不同的功能模块、组件或服务等分别存放在独立的仓库中，可以单独进行版本控制、构建、部署和发布，使得不同的团队或开发者可以独立地开发、测试和维护各自的模块，更容易实现并行开发和团队协作。😆

存在问题：

-   跨仓库开发：多仓维护成本高
    
-   开发调试：npm包(修改->发布->安装成本高)，调试麻烦
    
-   版本管理：依赖版本同步升级管理麻烦
    
-   项目基建：脚手架升级，新老项目规范很难保证统一
    

### MonoRepo时期

随着业务复杂度的提升，模块仓库越来越多，MultiRepo这种方式虽然从业务上解耦了，但增加了项目工程管理的难度，随着模块仓库达到一定数量级，会有几个问题：跨仓库代码难共享；分散在单仓库的模块依赖管理复杂；增加了构建耗时。于是将多个项目集成到一个仓库下，共享工程配置，同时又快捷地共享模块代码，成为趋势🎯

## Monorepo的优点

-   **代码复用**：因为多个项目共享一个代码库，所以避免了在不同项目中重复编写相同功能代码的问题，提高了开发效率。
    
-   **提升协作效率**：多个项目在同一个代码库中进行开发，可以方便地共享代码和文档，避免不同项目之间的沟通和协调成本。
    
-   **集中管理**：Monorepo 架构中，不同的应用程序都在同一个代码库中，方便管理和监控。这一点非常重要，特别是在需要同时对多个版本进行修改和维护的情况下。
    
-   **统一构建**：Monorepo 的一个重要特点是可以共用一套构建系统和工具链进行构建和部署，提升了构建的效率。
    
-   **可以快速定位问题**：由于所有的代码都在同一个代码库中进行开发，debugger 可以很快找出问题所在的代码文件和行数，便于开发人员调试问题。
    
-   **一个版本**：无需担心因为项目依赖于第三方库的冲突版本而导致的不兼容问题。
    

## Monorepo的坑

### 幽灵依赖

npm/yarn 安装依赖时，存在依赖提升，某个项目使用的依赖，并没有在其 package.json 中声明，也可以直接使用，这种现象称之为 “幽灵依赖”；随着项目迭代，这个依赖不再被其他项目使用，不再被安装，使用幽灵依赖的项目，会因为无法找到依赖而报错。😤

基于 npm/yarn 的 Monorepo 方案，依然存在 “幽灵依赖” 问题，我们可以通过 pnpm 彻底解决这个问题

### 依赖安装耗时长

MonoRepo 中每个项目都有自己的 package.json 依赖列表，随着 MonoRepo 中依赖总数的增长，每次 `install` 时，耗时会较长。😭

相同版本依赖提升到 Monorepo 根目录下，减少冗余依赖安装；使用 pnpm 按需安装及依赖缓存。

## pnpm 包管理

### 为什么选择pnpm

`Monorepo` 的单仓分模块的要求，使得仓库内的模块不仅要处理与外部模块的关系，还要处理内部之间相互的依赖关系。因此我们需要选择一个强大的包管理工具帮助处理这些任务。

目前前端包管理的根基是 npm，在其基础上衍生出了 yarn、pnpm。在 2022 年以后，我们推荐使用 pnpm 来管理项目依赖。`pnpm` 覆盖了 `npm`、`yarn` 的大部分能力，且多个维度的体验都有大幅度提升。💯

> pnpm 是一款快速、高效使用磁盘空间的包管理器。

它具有以下优势：

-   速度快：多数场景下，安装速度是 `npm/yarn` 的 2 - 3 倍。
    
-   基于内容寻址：硬链接节约磁盘空间，不会重复安装同一个包，对于同一个包的不同版本采取增量写入新文件的策略。
    
-   依赖访问安全性强：优化了 `node_modules` 的扁平结构，提供了限制**依赖的非法访问(幽灵依赖)** 的手段。
    
-   支持 `Monorepo`：自身能力就对 `Monorepo` 工程模式提供了有力的支持。在轻量场景下，无需集成 `lerna ``Turborepo` 等工具。
    

### workspace 模式

`pnpm` 支持 `Monorepo` 模式的工作机制叫做 `workspace(工作空间)`。

它要求在代码仓的根目录下存有 `pnpm-workspace.yaml` 文件指定哪些目录作为独立的工作空间，这个工作空间可以理解为一个子模块或者 `npm` 包。

例如以下的 `pnpm-workspace.yaml` 文件定义：`a` 目录、`b` 目录、`c` 目录下的所有子目录，都会各自被视为独立的模块。

```
packages:<br>&nbsp;&nbsp;-&nbsp;a<br>&nbsp;&nbsp;-&nbsp;b<br>&nbsp;&nbsp;-&nbsp;c<span data-darkreader-inline-color="">/*<br></span>
```

```
📦my-project<br>&nbsp;┣&nbsp;📂a<br>&nbsp;┃&nbsp;┗&nbsp;📜package.json<br>&nbsp;┣&nbsp;📂b<br>&nbsp;┃&nbsp;┗&nbsp;📜package.json<br>&nbsp;┣&nbsp;📂c<br>&nbsp;┃&nbsp;┣&nbsp;📂c<span data-darkreader-inline-color="">-1</span><br>&nbsp;┃&nbsp;┃&nbsp;┗&nbsp;📜package.json<br>&nbsp;┃&nbsp;┣&nbsp;📂c<span data-darkreader-inline-color="">-2</span><br>&nbsp;┃&nbsp;┃&nbsp;┗&nbsp;📜package.json<br>&nbsp;┃&nbsp;┗&nbsp;📂c<span data-darkreader-inline-color="">-3</span><br>&nbsp;┃&nbsp;&nbsp;&nbsp;┗&nbsp;📜package.json<br>&nbsp;┣&nbsp;📜package.json<br>&nbsp;┣&nbsp;📜pnpm-workspace.yaml<br>
```

需要注意的是，`pnpm` 并不是通过目录名称，而是通过目录下 `package.json` 文件的 `name` 字段来识别仓库内的包与模块的。

## Monorepo 环境搭建

通过上文我们了解了Monorepo的优点以及选择pnpm的原因

那么到底该如何搭建Monorepo呢🤔

下面我们就通过Element Plus来了解如何搭建 Monorepo 环境🤝

#### 首先进行全局安装 pnpm

```
npm&nbsp;install&nbsp;pnpm&nbsp;-g<br>
```

然后在项目下使用 pnpm init 进行 package.json 的初始化。这跟 npm init 是一样的。

```
pnpm&nbsp;init<br>
```

得到 package.json 初始内容，然后把 package.json 中的 name 属性删掉，并且添加一个 `"private": true` 属性，因为它是不需要发布的。

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span><span data-darkreader-inline-color="">Error</span>:&nbsp;no&nbsp;test&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span><br>}<br>
```

#### 配置 pnpm 的 monorepo 工作区

在我们这个仓库下，我们需要管理多个项目，就可以采用 pnpm 的 monorepo。我们在仓库的根目录下创建一个 pnpm-workspace.yaml 文件，可以在 pnpm-workspace.yaml 配置文件中指定这个仓库中有多少个项目。

```
packages:<br>&nbsp;&nbsp;-&nbsp;play&nbsp;#&nbsp;存放组件测试的代码<br>&nbsp;&nbsp;-&nbsp;docs&nbsp;#&nbsp;存放组件文档<br>&nbsp;&nbsp;-&nbsp;packages<span data-darkreader-inline-color="">/*&nbsp;#&nbsp;packages&nbsp;目录下都是组件包<br></span>
```

可以在 play 目录中运行我们写好的组件，相当于一个测试环境，在开发的时候可以知道效果是否达到预期；还需要一个组件说明文档的项目目录：docs; packages 目录则是所有组件的项目目录了，在 packages 目录中又可以放很多包的项目目录，比如，组件包目录：components、主题包目录：theme-chalk、工具包目录：utils 等。然后每一个包目录里面也需要一个 package.json 文件进行声明这是一个 NPM 包目录。所以我们需要进入每个包目录进行初始一个 package.json 文件。

以 components 包为例，我们进入到 components 目录底下初始化一个 package.json 文件，更改包名：`@elemnet-plus/components`。文件内容如下：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"@elemnet-plus/components"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span><span data-darkreader-inline-color="">Error</span>:&nbsp;no&nbsp;test&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span><br>}<br>
```

其他两个的包名则分别为：`@elemnet-plus/theme-chalk` 和 `@elemnet-plus/utils`，创建过程同上。

至此我们一个初步搭建的项目目录结构如下：

```
├──&nbsp;README.md<br>├──&nbsp;package.json<br>├──&nbsp;packages<br>│&nbsp;&nbsp;&nbsp;├──&nbsp;components<br>│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└──&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;├──&nbsp;theme-chalk<br>│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└──&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;└──&nbsp;utils<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──&nbsp;package.json<br>├──&nbsp;play<br>└──&nbsp;pnpm-workspace.yaml<br>
```

#### 仓库项目内的包相互调用

`@elemnet-plus/components` 、`@elemnet-plus/theme-chalk` 、`@elemnet-plus/utils` 这几个包要互相进行调用呢，就需要把它们安装到仓库根目录下的 `node_modules` 目录中。

然后我们在根目录下进行安装操作。

```
js<br>复制代码<br>pnpm&nbsp;install&nbsp;@elemnet-plus/components&nbsp;-w<br>pnpm&nbsp;install&nbsp;@elemnet-plus/theme-chalk&nbsp;-w<br>pnpm&nbsp;install&nbsp;@elemnet-plus/utils&nbsp;-w<br>
```

`-w` 表示安装到共公模块的 packages.json 中，也就是根目录下的 packages.json。

安装后根目录下的 package.json 的内容为：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@elemnet-plus/components"</span>:&nbsp;<span data-darkreader-inline-color="">"workspace:*"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@elemnet-plus/theme-chalk"</span>:&nbsp;<span data-darkreader-inline-color="">"workspace:*"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@elemnet-plus/utils"</span>:&nbsp;<span data-darkreader-inline-color="">"workspace:*"</span><br>&nbsp;&nbsp;},<br>}<br>
```

注意：`workspace:*` 将来发布的时候会被转换成具体的版本号。

#### TypeScript 初始化配置文件

接下来继续安装一些我们开发时所需要的依赖。

```
pnpm&nbsp;install&nbsp;vue&nbsp;typescript&nbsp;@types/node&nbsp;-D&nbsp;-w<br>
```

因为 `vue` 、 `typescript` 和 `@types/node` 只是开发环境需要的，所以安装的时候需要添加一个 `-D` 参数表示安装到开发环境，`-w` 表示安装到共公模块的 packages.json 中，也就是根目录下的 packages.json。

因为我们使用了 TypeScript，这样我们想要去校验我们的代码，让我们代码有提示，并且可以按照一些规则来解析我们的语法，给我们更友好的提示，我们就需要去初始化一下这个 TypeScript 配置命令。 又因为我们安装了 typescript，所以在 `node_modules` 目录下 `bin` 目录里面就会存在一个 tsc 的命令，这个命令，就可以帮我们进行初始化，我们可以使用 `npm tsc --init` 来初始化，也可以使用 `pnpm tsc --init` 那么执行这个命令，它就会去 `node_modules` 目录下 `bin` 目录找这个 tsc 命令进行执行。

```
pnpm&nbsp;tsc&nbsp;--init<br>
```

## 总结

至此一个通过 pnpm 方式配置的 monorepo 基础环境就搭建好了。

到底什么是工程化的含义呢？在配置这个开发环境的过程中，我们好像只是使用了一堆工具进行各种配置，那么是否意味着前端工程化就是工具化呢？🔧

其实不是，工程化的核心并非工具，而是以工具为实现媒介进行规范工作流程。

也就是通过工具表达你的思想，通过工具规范你的项目，通过工具管理写代码的人员。🙆🏿♂️

> 作者：Tooy8  
> 链接：https://juejin.cn/post/7285373518836826167  
> 来源：稀土掘金

## 结语

我是林三心

-   一个待过**小型toG型外包公司、大型外包公司、小公司、潜力型创业公司、大公司**的作死型前端选手；
    
-   一个偏前端的全干工程师；
    
-   一个不正经的掘金作者；
    
-   逗比的B站up主；
    
-   不帅的小红书博主；
    
-   喜欢打铁的篮球菜鸟；
    
-   喜欢历史的乏味少年；
    
-   喜欢rap的五音不全弱鸡如果你想一起学习前端，一起摸鱼，一起研究简历优化，一起研究面试进步，一起交流历史音乐篮球rap，可以来俺的摸鱼学习群哈哈，点这个，有7000多名前端小伙伴在等着一起学习哦 --> 
    

> 广州的兄弟可以约饭哦，或者约球~我负责打铁，你负责进球，谢谢~