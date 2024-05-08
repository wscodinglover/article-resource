## 1\. 背景

我们 ShopeePay 团队是一个比较大的前端团队（**80**+成员），团队内部分布着 react native、javascript npm包、react component npm包、serverless、普通的react工程等多种类型的项目，每种项目类型中的每个项目都有它们自己的配置和工作流。比如代码格式化配置不统一（eslint、prettier 和 typescript），构建工具及其配置不一致（rollup、webpack、vite、tsc、babel、esbuild 使用混乱）。并且这些混乱会增加维护和交接成本并且对新人不友好。

基于以上因素，我们团队开发了hippo，旨在解决以下问题

-   不同项目或团队小组使用不同的cli工具和工作流命令（比如开发阶段一些项目称为dev，一些项目称为 serve），不同的cli或构建工具带来了混乱
    
-   当团队成员需要开发新项目时，通常有以下两种形式
    

-   每次都需要考虑使用哪些技术栈，包括构建工具选取和配置，代码格式化标准配置和测试用例配置等。
    
-   基于原有项目拷贝
    

这些方式会进一步导致 “熵增”，可能会造成一个团队中不同成员开发的项目目录结构各不相同，构建工具与配置不一致的问题进一步被放大

-   当一个项目越来越大，开发人员的数量也在增长时，我们无法保持代码的质量，并确保它始终遵循我们的最佳实践
    

-   有些人可能会使用eslint ignore修改eslint规则，或者当他在CI pipeline中看到lint错误时直接关闭该规则。
    
-   有些人发现了一个优化点，但是确发现很难使它适用于所有相同类型的项目
    
-   有些标准只存在于文档中，很难确保每个人都知道并遵循它们。
    

## 2\. hippo是什么？

`hippo` 是一个用于提高我们前端团队工程效率的`前端工作流和规范`的工具。它为我们团队的前端开发统一定义了整个工作流和规范并提供了一些命令来帮助不同的项目使用它并实现一套标准工作流。

同时 hippo 也提供了易于横向扩展的插件机制，方便团队接入不同的项目类型。

目前 ShopeePay 团队的项目工作流分为初始化、本地开发、代码校验、代码测试、打包构建和发布等步骤。分别对应以下命令

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHp65ZA3IxI96YkS0IwvB9mJlcy9Dvpql1rMtSeqLGI6UTOGwd4YrL0CtQ0yUEWzSfKNfqwz6P7kbA/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

workflow.png

> 为什么称之为 hippo？
> 
> hippo即河马🦛 ，河马是杂食性动物，什么都能吃，所以我们称为hippo的含义是打造团队统一的工具链。

## 3\. hippo架构设计

一张图概括hippo 架构

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHp65ZA3IxI96YkS0IwvB9mJZt2fcwib7SFicvYWdb9z5xtscTCnIggct5iarm7BWKkdym3zogibq0f5fw/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

hippo-attachment.png

hippo架构大致分为四层

-   顶层是 `@hippo/cli`, cli 只提供了一个基础内核和一些基础命令（比如version、help和一些与monorepo相关的命令），负责获取和注册各个toolkit实现的工作流命令并与命令行终端交互
    
-   第二层是 `toolkit` 。`toolkit` 是用于提供某种项目类型的工作流命令，通常是多个命令的集合。一个 `toolkit` 对应一种项目类型，需要按需实现 `@hippo/api` 中的抽象工作流命令
    
-   第三层是 `@hippo/api`。它是 hippo 核心包，提供了一些核心工作流命令（create、dev、lint、build、test、doctor等）的抽象实现，同时也提供了一些核心工具方法，比如fs操作、git 操作、logger等。`@hippo/cli` 和 `toolkit` 可以使用 `@hippo/api` 提供的工具方法，同时 `toolkit` 针对该项目类型按需实现 `@hippo/api` 中的核心工作流命令
    
-   最底层是 `@hippo/api` 依赖的一些第三方基础包
    

> `@hippo/cli` 和 `@hippo/api` 本身不包含任何与业务强相关的逻辑

hippo 核心工作流如下

```
sequenceDiagram<br>    autonumber<br>        User-&gt;&gt;Hippo: Input a command<br>        Hippo-&gt;&gt;Hippo: Check if there is a valid "type" in "package.json" or "hippo-config.js"<br>        opt When "type" is valid<br>            Hippo-&gt;&gt;Toolkit: Get the commands<br>            Toolkit--&gt;Hippo: Return the commands<br>            Hippo-&gt;&gt;Hippo: Register the commands<br>        end<br>        Hippo-&gt;&gt;User: Return the result<br>
```

## 4\. hippo的实现

## 4.1 @hippo/cli

我们使用 clipanion<sup data-darkreader-inline-color="">[1]</sup> 来实现cli。官方介绍它的优势如下

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHp65ZA3IxI96YkS0IwvB9mJ8Wetcib51wpjuEWksLicpXM0ib4hfkve2xF6icLibbZQ48juqPicx5LvONAg/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

2023-06-30-15-15-05-image.png

同时 berry/yarn3<sup data-darkreader-inline-color="">[2]</sup> 也在使用它

在 `@hippo/cli` 中，我们需要内置一些 monorepo 命令并根据当前执行命令的cwd从 `hippo-config.js` 或 `package.json` 中获取toolkit type和对应的toolkit命令并注册到cli中，核心逻辑如下

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Cli,&nbsp;Builtins,&nbsp;apis&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/api'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;values&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;pkgJson&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../package.json'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;CloneCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./commands/CloneCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;FocusCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./commands/FocusCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;CreateCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./commands/CreateCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;ListCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./commands/ListCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;toolkit&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./utils/toolkit'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;HippoToolkit&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./interfaces'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;version,&nbsp;name&nbsp;}&nbsp;=&nbsp;pkgJson;<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;Check&nbsp;the&nbsp;version&nbsp;when&nbsp;the&nbsp;command&nbsp;is&nbsp;executed<br>&nbsp;*/</span><br>apis.npm.checkVersionAndLog(name,&nbsp;version);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;[,&nbsp;,&nbsp;...args]&nbsp;=&nbsp;process.argv;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;cli&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Cli({<br>&nbsp;&nbsp;binaryLabel:&nbsp;<span data-darkreader-inline-color="">`ShopeePay&nbsp;Hippo`</span>,<br>&nbsp;&nbsp;binaryName:&nbsp;<span data-darkreader-inline-color="">`hippo`</span>,<br>&nbsp;&nbsp;binaryVersion:&nbsp;version,<br>});<br><br>cli.register(FocusCommand);<br>cli.register(CreateCommand);<br>cli.register(ListCommand);<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;Find&nbsp;the&nbsp;current&nbsp;toolkit&nbsp;and&nbsp;register&nbsp;its&nbsp;plugin&nbsp;commands<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">const</span>&nbsp;toolkitType&nbsp;=&nbsp;apis.config.getToolkitType();<br><span data-darkreader-inline-color="">if</span>&nbsp;(toolkit.isValidToolkit(toolkitType))&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;commands&nbsp;=&nbsp;toolkit.requireModule(<br>&nbsp;&nbsp;&nbsp;&nbsp;toolkitType&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">string</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'commands'</span><br>&nbsp;&nbsp;)&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;HippoToolkit[<span data-darkreader-inline-color="">'commands'</span>];<br><br>&nbsp;&nbsp;values(commands).forEach(<span>(<span>plugin</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cli.register(plugin);<br>&nbsp;&nbsp;});<br>}<br><br>cli.register(Builtins.HelpCommand);<br>cli.register(Builtins.VersionCommand);<br><br>cli.runExit(args);<br>
```

可以看到，我们内置 clone、focus、create、list、help和version命令

### clone

此命令主要用于极速clone一个庞大的monorepo git仓库。clone命令使用部分clone的方式来显著减少开始使用存储库所需的数据量。通过延迟仓库所有blob下载（直到需要时），允许用户快速处理非常庞大的git仓库

内部使用了 microsoft/scalar<sup data-darkreader-inline-color="">[3]</sup> 的 clone 命令

### focus

focus命令主要用于我们团队的monorepo仓库，可以根据传入的workspace来安装此workspace和其依赖的workspace的依赖。类似于 pnpm 中的 pnpm install \\--filter ...package\\\_name<sup data-darkreader-inline-color="">[4]</sup> 命令。

-   为什么不直接使用pnpm命令？
    
    因为我们团队中使用 berry/yarn3<sup data-darkreader-inline-color="">[5]</sup> 来管理monorepo，它也没有提供类似于pnpm install \\--filter ...package\\\_name<sup data-darkreader-inline-color="">[6]</sup> 的命令。yarn3只提供了 yarn worspaces focus package\\\_name<sup data-darkreader-inline-color="">[7]</sup> 命令，然而此命令并不会安装 package\_name 依赖的workspace的依赖，所以我们实现了hippo focus命令来达到与pnpm一样的效果
    
-   为什么不使用pnpm来管理monorepo？
    
    因为当时pnpm没有支持patch命令，这对于我们非常重要。（现在pnpm已经支持patch命令了，后续我们可以考虑将yarn3切换为pnpm）
    

### list

list命令会列出 `@hippo/cli` 内置了哪些 toolkit

### help

cli帮助命令

### version

查看 cli 版本的命令

### create

理论上create命令应该放到 toolkit 中，但是在创建一个项目之前，我们并不知道用户想要创建哪种toolkit项目，所以我们只能将此命令提升到 `@hippo/cli`，让用户明确选择一个toolkit。同时也可以先在cli中收集要创建的项目名称等信息，接着将收集的项目信息传入并调用对应toolkit中的create命令。核心逻辑如下

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BaseCommand,&nbsp;Command,&nbsp;Option,&nbsp;apis,&nbsp;TemplateData&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/api'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;find&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><br><span data-darkreader-inline-color="">class</span>&nbsp;CreateCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BaseCommand&nbsp;{<br>&nbsp;&nbsp;...<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;run()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取toolkit列表</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;toolkits&nbsp;=&nbsp;toolkit.getList();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;用户选择toolkit</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;response&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;prompts({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'select'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'toolkitType'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">'Please&nbsp;select&nbsp;the&nbsp;project&nbsp;type&nbsp;you&nbsp;want&nbsp;to&nbsp;use'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choices:&nbsp;toolkits,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initial:&nbsp;<span data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;toolkitType&nbsp;=&nbsp;response.toolkitType;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;targetToolkit&nbsp;=&nbsp;find(toolkits,&nbsp;{&nbsp;value:&nbsp;toolkitType&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;收集项目名称、描述等信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;templateData&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;CreateCommand.getTemplateData(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targetToolkit?.title<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取对应toolkit的create命令并执行</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;create&nbsp;=&nbsp;toolkit.requireModule(toolkitType,&nbsp;<span data-darkreader-inline-color="">'create'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;create(templateData);<br>&nbsp;&nbsp;}<br>}<br>
```

同时 `@hippo/cli` 会根据当前执行命令的cwd获取对应的toolkit命令并注册到cli中，这样在一个toolkit项目中，当调用hippo build、hippo lint等工作流命令时，就会执行到相应的toolkit中的实现的工作流命令

> 当一个新的toolkit开发完毕后，`@hippo/cli` 可以安装它作为一个内置toolkit。但这种方式需要在每次新增toolkit之后修改 `@hippo/cli` 代码并且发版，同时使用方还需要更新，效率比较低。
> 
> 所以为了优化操作流程，在 `toolkit.getList()` 和 `toolkit.requireModule` 方法中我们会同时require当前项目的node-modules目录中安装的toolkit，这意味着项目中只需要安装对应的toolkit，hippo cli也会resolve它们并且注册相应的命令

## 4.2 @hippo/api

此包主要提供了一些工具方法和工作流命令的抽象实现。抽象命令核心逻辑如下

### BaseCommand

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Command,&nbsp;Option&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'clipanion'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;$&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'zx'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;apis&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../utils'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;BaseCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Command&nbsp;{<br>&nbsp;&nbsp;verbose&nbsp;=&nbsp;Option.Boolean(<span data-darkreader-inline-color="">'--verbose'</span>,&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;{&nbsp;hidden:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Set&nbsp;apis&nbsp;as&nbsp;an&nbsp;property<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;apis&nbsp;=&nbsp;apis;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;execute()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;$.verbose&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.verbose;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.run();<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;run():&nbsp;<span data-darkreader-inline-color="">void</span>;<br>}<br>
```

### BuildCommand

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Command&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'clipanion'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;BaseCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./BaseCommand'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;BuildCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BaseCommand&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;paths&nbsp;=&nbsp;[[<span data-darkreader-inline-color="">'build'</span>]];<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;usage&nbsp;=&nbsp;Command.Usage({<br>&nbsp;&nbsp;&nbsp;&nbsp;description:&nbsp;<span data-darkreader-inline-color="">'Build&nbsp;the&nbsp;resources'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;examples:&nbsp;[[<span data-darkreader-inline-color="">'Build&nbsp;the&nbsp;resources'</span>,&nbsp;<span data-darkreader-inline-color="">'$0&nbsp;build'</span>]],<br>&nbsp;&nbsp;});<br>}<br>
```

### TestCommand

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;argv&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'zx'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Command,&nbsp;Option&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'clipanion'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;runCLI&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'jest'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;omit&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;{&nbsp;Config&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@jest/types'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;BaseCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./BaseCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;fs,&nbsp;createLogger&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../utils'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;CI&nbsp;}&nbsp;=&nbsp;process.env;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;TestCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BaseCommand&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;paths&nbsp;=&nbsp;[[<span data-darkreader-inline-color="">'test'</span>]];<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;usage&nbsp;=&nbsp;Command.Usage({<br>&nbsp;&nbsp;&nbsp;&nbsp;description:&nbsp;<span data-darkreader-inline-color="">'Run&nbsp;unit&nbsp;test&nbsp;using&nbsp;Jest'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;examples:&nbsp;[[<span data-darkreader-inline-color="">'Run&nbsp;unit&nbsp;test&nbsp;using&nbsp;Jest'</span>,&nbsp;<span data-darkreader-inline-color="">'$0&nbsp;test'</span>]],<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;logger&nbsp;=&nbsp;createLogger(<span data-darkreader-inline-color="">'hippo-test'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;All&nbsp;the&nbsp;last&nbsp;args&nbsp;to&nbsp;pass&nbsp;to&nbsp;"Jest"&nbsp;directly<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;args&nbsp;=&nbsp;Option.Proxy();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Get&nbsp;the&nbsp;jest&nbsp;configs<br>&nbsp;&nbsp;&nbsp;*&nbsp;@returns<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;getJestConfig():&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;Config.InitialOptions&gt;;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;run()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Get&nbsp;the&nbsp;toolkit&nbsp;dev&nbsp;function<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jestConfigs&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.getJestConfig();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jestCliArgs&nbsp;=&nbsp;omit(argv,&nbsp;[<span data-darkreader-inline-color="">'_'</span>]);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(jestConfigs)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.env.NODE_ENV&nbsp;===&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.env.NODE_ENV&nbsp;===&nbsp;<span data-darkreader-inline-color="">undefined</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;When&nbsp;we&nbsp;use&nbsp;jest&nbsp;in&nbsp;normal&nbsp;scenes,&nbsp;jest&nbsp;would&nbsp;add&nbsp;this&nbsp;env&nbsp;automatically&nbsp;in&nbsp;its&nbsp;bin(https://github.com/facebook/jest/blob/39667e3680fb463eb8caedfa7e1f9edb3f0b69a2/packages/jest-cli/bin/jest.js#L13).<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;In&nbsp;hippo&nbsp;we&nbsp;directly&nbsp;used&nbsp;runCLI&nbsp;from&nbsp;jest&nbsp;to&nbsp;run&nbsp;test,&nbsp;so&nbsp;this&nbsp;env&nbsp;variable&nbsp;is&nbsp;null&nbsp;in&nbsp;hippo.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.env.NODE_ENV&nbsp;=&nbsp;<span data-darkreader-inline-color="">'test'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;We&nbsp;need&nbsp;add&nbsp;some&nbsp;options&nbsp;when&nbsp;it&nbsp;is&nbsp;in&nbsp;"CI"&nbsp;environment</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ciArgs&nbsp;=&nbsp;CI<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxWorkers:&nbsp;<span data-darkreader-inline-color="">3</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ci:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;results&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;runCLI(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config:&nbsp;<span data-darkreader-inline-color="">JSON</span>.stringify(jestConfigs),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;We&nbsp;don't&nbsp;collect&nbsp;coverage&nbsp;by&nbsp;default</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;coverage:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...ciArgs,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...jestCliArgs,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;Config.Argv,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[fs.cwd]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Exit&nbsp;the&nbsp;process&nbsp;when&nbsp;these&nbsp;are&nbsp;failed&nbsp;tests</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;numFailedTests&nbsp;}&nbsp;=&nbsp;results;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(numFailedTests&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.exit(<span data-darkreader-inline-color="">1</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(e)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.logger.error(<span data-darkreader-inline-color="">'%o'</span>,&nbsp;e);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.exit(<span data-darkreader-inline-color="">1</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

test命令使用jest来运行，同时在toolkit test命令中只需要继承 `@hippo/api`中的TestCommand，然后实现 `getJestConfig` 方法返回相应的jest配置即可

### LintCommand

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;path&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'zx'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Command,&nbsp;Option&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'clipanion'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;t&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'typanion'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;filter&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ESLINT_FILE_EXT&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./constant'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;eslintCheck&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./eslint'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;typeCheck&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./typeCheck'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;print&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./print'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;BaseCommand&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../BaseCommand'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createLogger,&nbsp;fs,&nbsp;git&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;getAddedFiles&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../../utils'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;HippoLintConfig&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../../interfaces'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;LintCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BaseCommand&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;paths&nbsp;=&nbsp;[[<span data-darkreader-inline-color="">'lint'</span>]];<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;usage&nbsp;=&nbsp;Command.Usage({<br>&nbsp;&nbsp;&nbsp;&nbsp;description:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'Check&nbsp;the&nbsp;code&nbsp;by&nbsp;ESLint,&nbsp;tsc&nbsp;according&nbsp;to&nbsp;the&nbsp;hippo&nbsp;type&nbsp;setting'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;examples:&nbsp;[[<span data-darkreader-inline-color="">'Lint&nbsp;a&nbsp;workspace'</span>,&nbsp;<span data-darkreader-inline-color="">'$0&nbsp;lint'</span>]],<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Tag&nbsp;if&nbsp;it&nbsp;is&nbsp;strict&nbsp;mode(warn&nbsp;message&nbsp;also&nbsp;trigger&nbsp;process.exit)<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;strict&nbsp;=&nbsp;Option.Boolean(<span data-darkreader-inline-color="">'--strict'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Auto&nbsp;Fix&nbsp;Option<br>&nbsp;&nbsp;&nbsp;*&nbsp;Only&nbsp;works&nbsp;for&nbsp;'ESLint'<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;fix&nbsp;=&nbsp;Option.Boolean(<span data-darkreader-inline-color="">'--fix'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;If&nbsp;Check&nbsp;Commit&nbsp;Files<br>&nbsp;&nbsp;&nbsp;*&nbsp;Only&nbsp;works&nbsp;for&nbsp;'ESLint'<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;checkCommit&nbsp;=&nbsp;Option.Boolean(<span data-darkreader-inline-color="">'--check-commit'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Lint&nbsp;Source&nbsp;Option<br>&nbsp;&nbsp;&nbsp;*&nbsp;Only&nbsp;works&nbsp;for&nbsp;'ESLint'<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;src&nbsp;=&nbsp;Option.String(<span data-darkreader-inline-color="">'--src'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Limit&nbsp;the&nbsp;max&nbsp;warn&nbsp;numbers<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;maxWarnings&nbsp;=&nbsp;Option.String(<span data-darkreader-inline-color="">'--max-warnings'</span>,&nbsp;{&nbsp;validator:&nbsp;t.isNumber()&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Logger<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;logger&nbsp;=&nbsp;createLogger(<span data-darkreader-inline-color="">'hippo-lint'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Get&nbsp;the&nbsp;Lint&nbsp;Configs<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">abstract</span>&nbsp;getLintConfigs():&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;HippoLintConfig&gt;;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;run()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;lint&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.getLintConfigs();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Get&nbsp;the&nbsp;files&nbsp;from&nbsp;git&nbsp;diff</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;gitCommittedFiles&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.checkCommit<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;getAddedFiles()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">undefined</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.logger.debug(<span data-darkreader-inline-color="">'The&nbsp;committed&nbsp;files&nbsp;are&nbsp;%o'</span>,&nbsp;gitCommittedFiles);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Execute&nbsp;the&nbsp;type&nbsp;check.&nbsp;If&nbsp;you&nbsp;don't&nbsp;add&nbsp;this&nbsp;path&nbsp;in&nbsp;config,&nbsp;we&nbsp;won't&nbsp;do&nbsp;any&nbsp;type&nbsp;check<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;tscResults&nbsp;=&nbsp;lint?.lintConfig?.typescript<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;typeCheck(lint.lintConfig.typescript)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">null</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Get&nbsp;the&nbsp;eslint&nbsp;files<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;eslintFiles&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.getLintFiles(ESLINT_FILE_EXT,&nbsp;gitCommittedFiles);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.logger.debug(<span data-darkreader-inline-color="">'The&nbsp;lint&nbsp;file&nbsp;pattern&nbsp;is&nbsp;%o'</span>,&nbsp;eslintFiles);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;eslintResults&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;eslintCheck(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fix:&nbsp;<span data-darkreader-inline-color="">this</span>.fix,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;strict:&nbsp;<span data-darkreader-inline-color="">this</span>.strict,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eslintrc:&nbsp;lint?.lintConfig?.eslint&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">string</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eslintIgnore:&nbsp;lint?.ignorePath?.eslint,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eslintFiles<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Print&nbsp;the&nbsp;result</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;errorCount,&nbsp;warningCount&nbsp;}&nbsp;=&nbsp;print({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;eslint:&nbsp;eslintResults,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tsc:&nbsp;tscResults,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Exit&nbsp;the&nbsp;process&nbsp;when&nbsp;check&nbsp;commit&nbsp;and&nbsp;errorCount&nbsp;is&nbsp;not&nbsp;0<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Exit&nbsp;the&nbsp;process&nbsp;when&nbsp;check&nbsp;commit&nbsp;and&nbsp;warnCount&nbsp;is&nbsp;not&nbsp;0&nbsp;and&nbsp;it&nbsp;is&nbsp;strict&nbsp;mode<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;Exit&nbsp;the&nbsp;process&nbsp;when&nbsp;the&nbsp;warn&nbsp;count&nbsp;is&nbsp;more&nbsp;than&nbsp;the&nbsp;limit<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;errorCount&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span data-darkreader-inline-color="">this</span>.strict&nbsp;&amp;&amp;&nbsp;warningCount&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span data-darkreader-inline-color="">this</span>.maxWarnings&nbsp;&amp;&amp;&nbsp;warningCount&nbsp;-&nbsp;<span data-darkreader-inline-color="">this</span>.maxWarnings&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process.exit(<span data-darkreader-inline-color="">1</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;Get&nbsp;the&nbsp;lint&nbsp;file&nbsp;pattern&nbsp;for&nbsp;different&nbsp;path<br>&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{string[]}&nbsp;ext&nbsp;File&nbsp;extension&nbsp;list<br>&nbsp;&nbsp;&nbsp;*&nbsp;@param&nbsp;{string[]}&nbsp;files&nbsp;File&nbsp;List<br>&nbsp;&nbsp;&nbsp;*&nbsp;@returns<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;getLintFiles(ext:&nbsp;<span data-darkreader-inline-color="">string</span>[],&nbsp;files?:&nbsp;<span data-darkreader-inline-color="">string</span>[])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(files&nbsp;&amp;&amp;&nbsp;files.length)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;filter(files,&nbsp;<span>(<span>fileName</span>)&nbsp;=&gt;</span>&nbsp;ext.includes(path.extname(fileName)));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;pattern&nbsp;=&nbsp;<span data-darkreader-inline-color="">`**/*.{<span data-darkreader-inline-color="">${ext.map((e)&nbsp;=&gt;&nbsp;e.replace(<span data-darkreader-inline-color="">/^./</span>,&nbsp;<span data-darkreader-inline-color="">''</span>)).join(<span data-darkreader-inline-color="">','</span>)}</span>}`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;path.resolve(fs.cwd,&nbsp;<span data-darkreader-inline-color="">this</span>.src&nbsp;||&nbsp;fs.cwd,&nbsp;pattern);<br>&nbsp;&nbsp;}<br>}<br>
```

可以看到，在 `@hippo/api` LintCommand 中，内部会调用Eslint和 Typescript API来校验代码，在toolkit lint命令中只需要继承 `@hippo/api` 中的LintCommand，然后实现 `getLintConfigs` 方法传入相应的eslint和typescript配置文件路径即可

其他 `@hippo/api` 抽象命令实现逻辑大同小异，这里就不在赘述了。

> 以上代码只是核心逻辑，不包含完整的逻辑链路

## 4.3 @hippo/toolkit-\*

开发的toolkit名称必须要以 `@hippo/toolkit-` 开头。toolkit需要依赖 `@hippo/api` 并且按需实现对应的工作流命令。比如

`BuildCommand`

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BuildCommand&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;BuildBaseCommand&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/api'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;BuildCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BuildBaseCommand&nbsp;{<br>&nbsp;&nbsp;logger&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.apis.createLogger(<span data-darkreader-inline-color="">'library-build'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;run()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;do&nbsp;something...</span><br>&nbsp;&nbsp;}<br>}<br>
```

`LintCommand`

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;LintCommand&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;LintBaseCommand&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/api'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;path&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">LintCommand</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">LintBaseCommand</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getLintConfigs()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">ignorePath</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">eslint</span>:&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'../../configs/.eslintignore'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">lintConfig</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">eslint</span>:&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'../../configs/.eslintrc.yml'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">typescript</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'../../configs/tsconfig.json'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br>}<br>
```

同时toolkit除了工作流命令，也可以实现其他非工作流命令。只需要继承 `@hippo/api` 中的 `BaseCommand` , 同时导出到 `commands` 属性中即可（`@hippo/cli` 会从toolkit的 `commands` 属性中获取所有命令依次注册到cli中）

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BaseCommand,&nbsp;Option,&nbsp;Command&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/api'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;OtherCommand&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;BaseCommand&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">static</span>&nbsp;paths&nbsp;=&nbsp;[[<span data-darkreader-inline-color="">'other'</span>]];<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;run()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;do&nbsp;something...</span><br>&nbsp;&nbsp;}<br>}<br>
```

toolkit 的入口文件一般如下：

```
<span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;displayName&nbsp;=&nbsp;<span data-darkreader-inline-color="">'Monorepo'</span>;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;description&nbsp;=&nbsp;<span data-darkreader-inline-color="">'A&nbsp;monorepo&nbsp;project'</span>;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;<span data-darkreader-inline-color="">'monorepo'</span>;<br><br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;version&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../package.json'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;create&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./create'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;commands&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./commands'</span>;<br>
```

> 目前我们内置了6种toolkit
> 
> ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
> 
> 2023-06-30-17-36-35-image.png

## 5\. hippo规范

从上文得知，在toolkit lint命令中，一般会返回相应的eslint配置文件，eslint配置文件其一般为

```
<span data-darkreader-inline-color="">extends:</span>&nbsp;<span data-darkreader-inline-color="">'@hippo/eslint-config/recommended'</span><br>
```

## 5.1 @hippo/eslint-config

`@hippo/eslint-config` 是我们提供的一套 eslint 规范，目前我们团队严格遵循此规范，它基于 eslint-config-airbnb-base<sup data-darkreader-inline-color="">[8]</sup> 并且修改了一些我们认为不合理的规则，同时也继承了我们实现 `@hippo/eslint-plugin` 。

此外，`@hippo/eslint-config` 也支持 `all-in-one` 特性，即使用方不需要安装任何 `eslint-config-*` 或 `eslint-plugin` 依赖

> 目前社区上主流的 eslint config 都需要使用方在自己的项目中安装额外的eslint plugin依赖，比如
> 
> -   eslint-config-airbnb-base<sup data-darkreader-inline-color="">[9]</sup>
>     
> -   eslint-config-standard<sup data-darkreader-inline-color="">[10]</sup>
>     
> -   eslint-config-alloy<sup data-darkreader-inline-color="">[11]</sup>
>     
> -   ...
>     
> 
> 然而 `@hippo/eslint-config` 内置了config必要的eslint plugin
> 
> -   eslint-plugin-import<sup data-darkreader-inline-color="">[12]</sup>
>     
> -   eslint-plugin-react<sup data-darkreader-inline-color="">[13]</sup>
>     
> -   eslint-plugin-react-hooks<sup data-darkreader-inline-color="">[14]</sup>
>     
> -   eslint-plugin-react-native<sup data-darkreader-inline-color="">[15]</sup>
>     
> -   eslint-plugin-eslint-comments<sup data-darkreader-inline-color="">[16]</sup>
>     
> -   \\@typescript-eslint/eslint-plugin<sup data-darkreader-inline-color="">[17]</sup>
>     
> -   @hippo/eslint-plugin
>     
> 
> 使用方只需要安装 `@hippo/eslint-config` 即可，降低心智负担

目前 `@hippo/eslint-config` 提供了四种config set，分别为

### recommended

提供给node项目或者纯JavaScript项目使用

```
<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>);<br><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'airbnb-base'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'eslint:recommended'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:@typescript-eslint/recommended'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'prettier'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:@hippo/recommended'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:eslint-comments/recommended'</span>,<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">reportUnusedDisableDirectives</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">settings</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'import/resolver'</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'eslint-import-resolver-node'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'eslint-import-resolver-typescript'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Append&nbsp;'ts'&nbsp;extensions&nbsp;to&nbsp;Airbnb&nbsp;'import/extensions'&nbsp;setting</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'import/extensions'</span>:&nbsp;[<span data-darkreader-inline-color="">'.js'</span>,&nbsp;<span data-darkreader-inline-color="">'.mjs'</span>,&nbsp;<span data-darkreader-inline-color="">'.jsx'</span>,&nbsp;<span data-darkreader-inline-color="">'.ts'</span>,&nbsp;<span data-darkreader-inline-color="">'.tsx'</span>,&nbsp;<span data-darkreader-inline-color="">'.d.ts'</span>],<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;The&nbsp;reason&nbsp;why&nbsp;Airbnb&nbsp;turned&nbsp;on&nbsp;this&nbsp;rule&nbsp;is&nbsp;that&nbsp;they&nbsp;discourage&nbsp;to&nbsp;use&nbsp;loops</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Details&nbsp;in&nbsp;https://github.com/airbnb/javascript/issues/1103</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;That&nbsp;doesn't&nbsp;make&nbsp;sense&nbsp;to&nbsp;us&nbsp;since&nbsp;we&nbsp;allow&nbsp;to&nbsp;use&nbsp;`while`&nbsp;and&nbsp;early-return&nbsp;technique&nbsp;relies&nbsp;on&nbsp;`continue`&nbsp;in&nbsp;loops</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'no-continue'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;}<br>}<br>
```

### react-native

提供给react native项目使用

```
<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>);<br><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">env</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react-native/react-native'</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'./react'</span>),&nbsp;<span data-darkreader-inline-color="">'plugin:react-native/all'</span>],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">settings</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'import/resolver'</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'./utils/aliasResolver'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'eslint-import-resolver-typescript'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'eslint-import-resolver-react-native'</span>)]:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;which&nbsp;extensions&nbsp;will&nbsp;be&nbsp;searched</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">extensions</span>:&nbsp;[<span data-darkreader-inline-color="">'.tsx'</span>,&nbsp;<span data-darkreader-inline-color="">'.ts'</span>,&nbsp;<span data-darkreader-inline-color="">'.js'</span>,&nbsp;<span data-darkreader-inline-color="">'.jsx'</span>,&nbsp;<span data-darkreader-inline-color="">'.mjs'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;<span data-darkreader-inline-color="">FIXME:</span>&nbsp;we&nbsp;might&nbsp;need&nbsp;to&nbsp;develop&nbsp;a&nbsp;similar&nbsp;but&nbsp;specific&nbsp;rule&nbsp;for&nbsp;react-native</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'@typescript-eslint/no-use-before-define'</span>:&nbsp;[<span data-darkreader-inline-color="">'error'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">variables</span>:&nbsp;<span data-darkreader-inline-color="">false</span>&nbsp;}],<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react-native/no-color-literals'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react-native/sort-styles'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br>&nbsp;&nbsp;},<br>};<br>
```

注意，这里我们配置了一个额外的 aliasResolver，这是因为我们的 RN项目中使用了别名，是通过 babel-plugin-module-resolver<sup data-darkreader-inline-color="">[18]</sup> 此babel plugin支持的。为了让 `eslint-plugin-import` 中的需要resolve文件的规则能解析到正确的文件路径，所以我们需要自定义一个 resolver<sup data-darkreader-inline-color="">[19]</sup>。其内部原理比较简单与babel-plugin-module-resolver<sup data-darkreader-inline-color="">[20]</sup> 基本一致。

### react

提供给保持老的JSX transform（turned JSX into `React.createElement(...)` calls）的react项目使用

```
<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>);<br><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'airbnb/rules/react'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;don't&nbsp;import&nbsp;a11y&nbsp;rules</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'airbnb/hooks'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'./recommended'</span>),<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Since&nbsp;we&nbsp;already&nbsp;use&nbsp;TypeScript,&nbsp;we&nbsp;don't&nbsp;quite&nbsp;need&nbsp;this&nbsp;rule</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react/require-default-props'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Since&nbsp;we&nbsp;already&nbsp;use&nbsp;TypeScript,&nbsp;turning&nbsp;on&nbsp;this&nbsp;rule&nbsp;will&nbsp;conflict&nbsp;with&nbsp;ts&nbsp;type&nbsp;detection</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react/static-property-placement'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react/function-component-definition'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react/jsx-filename-extension'</span>:&nbsp;[<span data-darkreader-inline-color="">1</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">extensions</span>:&nbsp;[<span data-darkreader-inline-color="">'.tsx'</span>]&nbsp;}],<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;No&nbsp;worries&nbsp;since&nbsp;we&nbsp;write&nbsp;in&nbsp;TypeScript</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'react/jsx-props-no-spreading'</span>:&nbsp;<span data-darkreader-inline-color="">'off'</span>,<br>&nbsp;&nbsp;},<br>};<br>
```

### react-17

提供给使用了新的 new-jsx-transform<sup data-darkreader-inline-color="">[21]</sup> JSX transform的react项目使用

```
<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>);<br><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<span data-darkreader-inline-color="">require</span>.resolve(<span data-darkreader-inline-color="">'./react'</span>),&nbsp;<span data-darkreader-inline-color="">'plugin:react/jsx-runtime'</span>],<br>};<br>
```

### 如何支持 all-in-one 特性？

这里我们使用 \\@rushstack/eslint-patch/modern-module-resolution<sup data-darkreader-inline-color="">[22]</sup>

我们在每个config set之前会调用

```
<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>);<br>
```

它将resolve `eslint-plugin-*` 或 `eslint-config-*` 的方式从用户项目中的node\_modules改变为我们config中的node\_modules，从而完美的支持 `all-in-one` 特性

## 5.2 @hippo/eslint-plugin

`@hippo/eslint-plugin` 实现了一些我们团队的Eslint rule，由于篇幅有限这里就不再赘述了。

参考：

-   Feflow<sup data-darkreader-inline-color="">[23]</sup>
    
-   modernjs.dev/<sup data-darkreader-inline-color="">[24]</sup>
    
-   GitHub - yarnpkg/berry: 📦🐈 Active development trunk for Yarn ⚒<sup data-darkreader-inline-color="">[25]</sup>
    

关于本文  

## 作者：lcwlucky

https://juejin.cn/post/7250375753597943863

The End

如果你觉得这篇内容对你挺有启发，我想请你帮我三个小忙：

1、点个 「在看」，让更多的人也能看到这篇内容

2、关注官网 https://muyiy.cn，让我们成为长期关系

3、关注公众号「高级前端进阶」，公众号后台回复 「加群」 ，加入我们一起学习并送你精心整理的高级前端面试题。

》》面试官都在用的题库，快来看看《《  

```
<section data-tool="mdnice编辑器" data-website="https://www.mdnice.com" data-darkmode-bgcolor-15987645674728="rgb(25, 25, 25)" data-darkmode-original-bgcolor-15987645674728="rgb(255, 255, 255)" data-darkmode-color-15987645674728="rgb(163, 163, 163)" data-darkmode-original-color-15987645674728="rgb(62, 62, 62)" data-style="letter-spacing: 0px; white-space: normal; font-size: 16px; color: rgb(62, 62, 62); font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; widows: 1; line-height: 1.6;" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkmode-color-16030305897056="rgb(141, 141, 141)" data-darkmode-original-color-16030305897056="rgb(89, 89, 89)" data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkreader-inline-outline=""><pre data-original-code="<br><br>The End如果你觉得这篇内容对你挺有启发，我想请你帮我三个小忙：点个「在看」，让更多的人也能看到这篇内容<br>关注官网 https://muyiy.cn，让我们成为长期关系<br>关注公众号「高级前端进阶」，公众号后台回复「加群」 加入我们一起学习并送你精心整理的高级前端面试题。<br>》》面试官都在用的题库，快来看看《《                        高级前端进阶 发起了一个读者讨论         参与讨论                                        <br>“在看”吗？在看就点一下吧<br>" data-snippet-id="ext.89a96a6ef2d46757b2677de8206703d5" data-snippet-saved="false" data-codota-status="done" data-darkmode-color-16030305897056="rgb(141, 141, 141)" data-darkmode-original-color-16030305897056="rgb(89, 89, 89)" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkreader-inline-outline=""><section data-darkmode-color-16030305897056="rgb(141, 141, 141)" data-darkmode-original-color-16030305897056="rgb(89, 89, 89)" data-style="padding-right: 10px; padding-left: 10px; letter-spacing: 0px; background-color: rgb(255, 255, 255); line-height: 1.6; word-break: break-word;" data-darkmode-color="rgb(137, 137, 137)" data-darkmode-original-color="rgb(89, 89, 89)" data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-tools="新媒体排版" data-id="13777" data-style-type="关注" data-tool="mdnice编辑器" data-website="https://www.mdnice.com" data-darkmode-bgcolor-16018219266315="rgb(25, 25, 25)" data-darkmode-original-bgcolor-16018219266315="rgb(255, 255, 255)" data-darkmode-color-16018219266315="rgb(163, 163, 163)" data-darkmode-original-color-16018219266315="rgb(0,0,0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkmode-bgcolor-16020008769986="rgb(25, 25, 25)" data-darkmode-original-bgcolor-16020008769986="rgb(255, 255, 255)" data-darkmode-color-16020008769986="rgb(163, 163, 163)" data-darkmode-original-color-16020008769986="rgb(0,0,0)" data-darkmode-color-16021670869911="rgb(163, 163, 163)" data-darkmode-original-color-16021670869911="rgb(0,0,0)" data-darkmode-bgcolor-16021670869911="rgb(25, 25, 25)" data-darkmode-original-bgcolor-16021670869911="rgb(255, 255, 255)"><p data-tool="mdnice编辑器" data-darkmode-color-16057140139831="rgb(141, 141, 141)" data-darkmode-original-color-16057140139831="rgb(89, 89, 89)" data-style="padding-top: 8px; padding-bottom: 8px; line-height: 26px; color: rgb(89, 89, 89);" data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">最后不要忘了点赞呦！</span></p></section></pre></section>
```