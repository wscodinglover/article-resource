## 写在前面

TypeScript 是 Airbnb 前端 Web 开发的官方语言。然而，采用 TypeScript 和迁移包含数千个 JavaScript 文件的成熟代码库的过程并非一日之功。TypeScript 的采用经历了初始提议、多个团队采用、测试阶段以及最终成为 Airbnb 前端开发的官方语言的过程。您可以在 Brie Bunge 的这次演讲中了解更多关于我们如何大规模采用 TypeScript 的信息。

## 迁移策略

大规模迁移是一项复杂的任务，我们探索了从 JavaScript 迁移到 TypeScript 的几个选项：

### 混合迁移策略

逐个文件部分迁移，修复类型错误，然后重复，直到迁移完整项目。allowJS 配置选项允许我们让 TypeScript 和 JavaScript 文件并排共存于项目中，这使得这种方法成为可能！

在混合迁移策略中，我们不必暂停开发，可以逐个文件逐步迁移。虽然，在大规模上，这个过程可能需要很长时间。此外，还需要对来自组织不同部门的工程师进行培训和入职培训。

### 全面迁移

获取 JavaScript 或部分 TypeScript 项目并将其完全转换。我们需要添加一些 any 类型和 @ts-ignore 注释，以便项目编译时不会出错，但随着时间的推移，我们可以用更具描述性的类型替换它们。

选择 all-in 迁移策略有几个显著优势：

-   跨项目的一致性：整体迁移将保证每个文件的状态相同，工程师无需记住他们可以在哪里使用 TypeScript 功能以及编译器将在何处防止基本错误。
    
-   只修复一种类型比修复文件容易得多：修复整个文件可能非常复杂，因为文件可能有多个依赖项。使用混合迁移，很难跟踪迁移的实际进度和文件的状态。
    

看起来整体迁移是这里的明显赢家！

但是，对大型成熟代码库执行全面迁移的过程是一个沉重而复杂的问题。为了解决这个问题，我们决定使用代码修改脚本——codemods！通过我们最初手动迁移到 TypeScript 的过程，我们认识到可以自动化的重复操作。我们为这些步骤中的每一个都制作了代码模块，并将它们组合到总体迁移管道中

根据我们的经验，并不能 100% 保证自动迁移会产生完全没有错误的项目，但我们发现下面概述的步骤组合为我们提供了最终迁移到无错误 TypeScript 的最佳结果项目。使用 codemods，我们能够在一天内将包含 50,000 多行代码和 1,000 多个文件的项目从 JavaScript 转换为 TypeScript！

基于这个管道，我们创建了一个名为“ts-migrate”的工具：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 Airbnb，我们将 React 用于我们前端代码库的重要部分。这就是为什么 codemods 的某些部分与基于 React 的概念相关。ts-migrate 可以通过额外的配置和测试与其他框架或库一起使用。

## 迁移过程的步骤

让我们来看看将项目从 JavaScript 迁移到 TypeScript 所需的主要步骤以及这些步骤是如何实现的：

1、每个 TypeScript 项目的第一部分是创建一个 tsconfig.json 文件，如果需要可以通过ts-migrate执行此操作。有一个默认的配置文件模板和一个验证检查，可以帮助我们确保所有项目的配置一致。

这是基本级别配置的示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span>"extends"</span>:&nbsp;<span data-darkreader-inline-color="">"../typescript/tsconfig.base.json"</span>,<br>&nbsp;&nbsp;<span>"include"</span>:&nbsp;[<span data-darkreader-inline-color="">"."</span>,&nbsp;<span data-darkreader-inline-color="">"../typescript/types"</span>]<br>}<br></code>
```

2、tsconfig.json 文件就位后，下一步是将源代码文件的文件扩展名从 .js/.jsx 更改为 .ts/.tsx 。此步骤的自动化非常简单，而且还消除了大量手动工作。

3、下一步是运行 codemods！我们称它们为“插件”。ts-migrate 的插件是代码模块，可以通过 TypeScript 语言服务器访问其他信息。插件将字符串作为输入并生成更新的字符串作为输出。jscodeshift、TypeScript API、字符串替换或其他 AST 修改工具可用于为代码转换提供动力。

在每个步骤之后，我们检查 Git 历史记录中是否有任何待处理的更改并提交它们。这有助于将迁移拉取请求拆分为更易于理解的提交，还可以跟踪文件重命名。

我们将 ts-migrate 分成 3 个包：

-   ts-migrate\[https://github.com/airbnb/ts-migrate\]
    
-   ts-migrate-server\[ter/packages/ts-migrate-server\]
    
-   ts-migrate-plugins\[https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate-plugins\]
    

通过这样做，我们能够将转换逻辑与核心运行器分开，并为不同的目的创建多个配置。目前，我们有两个主要配置：migration 和 reignore 。

虽然迁移配置的目标是从 JavaScript 迁移到 TypeScript，但 reignore 的目的是通过简单地忽略所有错误使项目可编译。当代码库很大并且正在执行以下任务时，Reignore 很有用：

-   升级 TypeScript 版本
    
-   对代码库进行重大更改或重构
    
-   改进一些常用库的类型
    

这样，即使有一些我们不想立即处理的错误，我们也可以迁移项目。它使 TypeScript 或库的更新变得更加容易。

这两个配置都在 ts-migrate-server 上运行，它由两部分组成：

-   TSServer ：这部分与 VSCode 编辑器为编辑器和语言服务器之间的通信所做的非常相似。TypeScript 语言服务器的新实例作为单独的进程运行，开发工具使用语言协议与服务器通信。
    
-   迁移运行器：这部分运行并协调迁移过程。
    

它需要以下参数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">interface</span>&nbsp;MigrateParams&nbsp;{<br>&nbsp;&nbsp;rootDir:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;path&nbsp;to&nbsp;the&nbsp;root&nbsp;directory&nbsp;&nbsp;</span><br>&nbsp;&nbsp;config:&nbsp;MigrateConfig;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;migration&nbsp;config,&nbsp;including&nbsp;list&nbsp;of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;plugins&nbsp;it&nbsp;contains</span><br>&nbsp;&nbsp;server:&nbsp;TSServer;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;an&nbsp;instance&nbsp;of&nbsp;the&nbsp;TSServer&nbsp;fork</span><br>}<br></code>
```

它执行以下操作：

1.  解析 tsconfig.json 。
    
2.  创建 .ts 源文件。
    
3.  将每个文件发送到 TypeScript 语言服务器进行诊断。编译器为我们提供了三种类型的诊断：semanticDiagnostics 、 syntacticDiagnostics 和 suggestionDiagnostics 。我们使用这些诊断来查找源代码中有问题的地方。基于唯一的诊断代码和行号，我们可以识别问题的潜在类型并应用必要的代码修改。
    
4.  在每个文件上运行所有插件。如果文本因插件执行而发生变化，我们会更新原始文件的内容并通知 TypeScript 语言服务器文件已更改。
    

您可以在示例包或主包中找到 ts-migrate-server 用法示例。ts-migrate-example 还包含插件的基本示例。它们分为 3 个主要类别：

-   基于js代码转化
    
-   基于 TypeScript 抽象语法树 (AST)
    
-   基于文本
    

存储库中有一组示例来演示如何构建各种简单的插件并将它们与 ts-migrate-server 结合使用。以下是转换以下代码的示例迁移管道：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">mult</span>(<span>first,&nbsp;second</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;first&nbsp;*&nbsp;second;<br>}<br></code>
```

into:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">tlum</span>(<span>tsrif:&nbsp;<span data-darkreader-inline-color="">number</span>,&nbsp;dnoces:&nbsp;<span data-darkreader-inline-color="">number</span></span>):&nbsp;<span data-darkreader-inline-color="">number</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`args:&nbsp;<span>${<span>arguments</span>}</span>`</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;tsrif&nbsp;*&nbsp;dnoces;<br>}<br></code>
```

ts-migrate 在上面的例子中做了 3 次转换：

-   反转所有标识符 first -> tsrif
    
-   添加类型到函数声明 function tlum(tsrif, dnoces) -> function tlum(tsrif: number, dnoces: number): number
    
-   插入 console.log(‘args:${arguments}’);
    

## 生成插件

实际的插件位于一个单独的包中 — ts-migrate-plugins。让我们来看看其中的一些。我们有两个基于 jscodeshift 的插件：explicitAnyPlugin 和 declareMissingClassPropertiesPlugin。jscodeshift 是一个可以使用 recast 包将 AST 转换回字符串的工具通过使用函数 toSource() ，我们可以直接更新文件的源代码。

explicitAnyPlugin 背后的主要思想在于从 TypeScript 语言服务器中提取所有语义诊断错误以及行号。然后，我们需要在诊断中指定的行上添加 any 类型。这种方法允许我们解决错误，因为添加 any 类型可以修复编译错误。

使用前：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fn2&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>p3,&nbsp;p4</span>)&nbsp;</span>{}<br><span data-darkreader-inline-color="">const</span>&nbsp;var1&nbsp;=&nbsp;[];<br></code>
```

使用后：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fn2&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>p3:&nbsp;<span data-darkreader-inline-color="">any</span>,&nbsp;p4:&nbsp;<span data-darkreader-inline-color="">any</span></span>)&nbsp;</span>{}<br><span data-darkreader-inline-color="">const</span>&nbsp;var1:&nbsp;<span data-darkreader-inline-color="">any</span>&nbsp;=&nbsp;[];<br></code>
```

declareMissingClassPropertiesPlugin 使用代码 2339 进行所有诊断（你能猜出这段代码的含义吗？），如果它可以找到缺少标识符的类声明，插件将使用 any 类型注释将它们添加到类主体中。顾名思义，这个 codemod 只适用于 ES6 类。

下一类插件是基于 TypeScript AST 的插件。通过解析 AST，我们可以在源文件中生成一个包含以下类型的更新数组：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><br><span data-darkreader-inline-color="">type</span>&nbsp;Insert&nbsp;=&nbsp;{&nbsp;kind:&nbsp;<span data-darkreader-inline-color="">'insert'</span>;&nbsp;index:&nbsp;<span data-darkreader-inline-color="">number</span>;&nbsp;text:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;};<br><span data-darkreader-inline-color="">type</span>&nbsp;Replace&nbsp;=&nbsp;{&nbsp;kind:&nbsp;<span data-darkreader-inline-color="">'replace'</span>;&nbsp;index:&nbsp;<span data-darkreader-inline-color="">number</span>;&nbsp;length:&nbsp;<span data-darkreader-inline-color="">number</span>;&nbsp;text:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;};<br><span data-darkreader-inline-color="">type</span>&nbsp;Delete&nbsp;=&nbsp;{&nbsp;kind:&nbsp;<span data-darkreader-inline-color="">'delete'</span>;&nbsp;index:&nbsp;<span data-darkreader-inline-color="">number</span>;&nbsp;length:&nbsp;<span data-darkreader-inline-color="">number</span>&nbsp;};<br></code>
```

生成更新后，唯一剩下的就是以相反的顺序应用更改。如果通过这些操作的结果，我们收到新文本，我们将更新源文件。让我们来看看其中几个基于 AST 的插件：stripTSIgnorePlugin 和 hoistClassStaticsPlugin。

stripTSIgnorePlugin 是迁移管道中的第一个插件。它从文件中删除所有 @ts-ignore ¹ 实例。如果我们将一个 JavaScript 项目转换为 TypeScript，这个插件将不会做任何事情。但是，如果它是部分 TypeScript 项目（在 Airbnb，我们有几个项目处于这种状态），这是必不可少的第一步。只有在删除 @ts-ignore 注释后，TypeScript 编译器才会发出所有需要解决的诊断错误。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;str3&nbsp;=&nbsp;foo<br>&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore&nbsp;comment</span><br>&nbsp;&nbsp;&nbsp;&nbsp;bar<br>&nbsp;&nbsp;:&nbsp;baz;<br></code>
```

转换：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;str3&nbsp;=&nbsp;foo<br>&nbsp;&nbsp;?&nbsp;bar<br>&nbsp;&nbsp;:&nbsp;baz;<br></code>
```

删除 @ts-ignore 评论后，我们运行 hoistClassStaticsPlugin 。该插件遍历文件中的所有类声明。它决定了我们是否可以提升标识符或表达式，并决定一个赋值是否已经被提升到一个类。

为了能够快速迭代并防止回归，我们为每个插件和 ts-migrate 添加了一系列单元测试。

## React相关插件

reactPropsPlugin 将类型信息从 PropTypes 转换为 TypeScript 道具类型定义。它基于 Mohsen Azimi 编写的出色工具。我们只需要在包含至少一个 React 组件的 .tsx 文件上运行这个插件。reactPropsPlugin 查找所有 PropTypes 声明并尝试使用 AST 和简单的正则表达式（如 /number/ 或更复杂的情况如 /objectOf$/ ）来解析它们。当检测到 React 组件（功能组件或类组件）时，它会转换为具有新属性类型的组件：type Props = {…}; 。

reactDefaultPropsPlugin 涵盖了 React 组件的 defaultProps 模式。我们使用一种特殊类型来表示具有默认值的props：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Defined&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">undefined</span>&nbsp;?&nbsp;never&nbsp;:&nbsp;T;<br><span data-darkreader-inline-color="">type</span>&nbsp;WithDefaultProps&lt;P,&nbsp;DP&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Partial&lt;P&gt;&gt;&nbsp;=&nbsp;Omit&lt;P,&nbsp;keyof&nbsp;DP&gt;&nbsp;&amp;&nbsp;{<br>&nbsp;&nbsp;[K&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;Extract&lt;keyof&nbsp;DP,&nbsp;keyof&nbsp;P&gt;]:<br>&nbsp;&nbsp;&nbsp;&nbsp;DP[K]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Defined&lt;P[K]&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Defined&lt;P[K]&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;Defined&lt;P[K]&gt;&nbsp;|&nbsp;DP[K];<br>};<br></code>
```

我们试图找到默认的 props 声明并将它们与上一步生成的组件 props 类型合并。

状态和生命周期的概念在 React 生态系统中非常普遍。我们在两个插件中解决了这些问题。如果组件是有状态的，则 reactClassStatePlugin 会生成一个新的 type State = any; 并且 reactClassLifecycleMethodsPlugin 会使用适当的类型注释组件生命周期方法。这些插件的功能可以扩展，包括用更具描述性的类型替换 any 的能力。

对于状态和道具，还有更多改进和更好类型支持的空间。然而，作为一个起点，这个功能被证明是足够的。我们也不涉及 hooks，因为在迁移开始时我们的代码库使用的是旧版本的 React。

## 确保项目编译成功

我们的目标是获得一个具有基本类型覆盖率的编译 TypeScript 项目，不会导致应用程序运行时行为发生变化。

在所有转换和代码修改之后，我们的代码可能具有不一致的格式并且一些 lint 检查可能会失败。我们的前端代码库依赖于 prettier-eslint 设置——Prettier 用于自动格式化代码，ESLint 确保代码遵循最佳实践。因此，我们可以通过从我们的插件运行 eslint-prettier 来快速修复前面步骤可能引入的任何格式问题。

迁移管道的最后一部分确保解决所有 TypeScript 编译违规问题。为了检测和修复潜在的错误，tsIgnorePlugin 使用行号进行语义诊断，并插入带有有用解释的 @ts-ignore 注释，例如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;@ts-ignore&nbsp;ts-migrate(7053)&nbsp;<span>FIXME:</span>&nbsp;No&nbsp;index&nbsp;signature&nbsp;with&nbsp;a&nbsp;parameter&nbsp;of&nbsp;type&nbsp;'string...</span><br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;field1,&nbsp;field2,&nbsp;field3&nbsp;}&nbsp;=&nbsp;DATA[prop];<br><span data-darkreader-inline-color="">//&nbsp;@ts-ignore&nbsp;ts-migrate(2532)&nbsp;<span>FIXME:</span>&nbsp;Object&nbsp;is&nbsp;possibly&nbsp;'undefined'.</span><br><span data-darkreader-inline-color="">const</span>&nbsp;field2&nbsp;=&nbsp;object.some_property;<br></code>
```

我们还添加了对 JSX 语法的支持：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{*<br><span data-darkreader-inline-color="">//&nbsp;@ts-ignore&nbsp;ts-migrate(2339)&nbsp;<span>FIXME:</span>&nbsp;Property&nbsp;'NORMAL'&nbsp;does&nbsp;not&nbsp;exist&nbsp;on&nbsp;type&nbsp;'typeof&nbsp;W...&nbsp;*/}</span><br>&lt;Text&nbsp;weight={WEIGHT.NORMAL}&gt;<br>&nbsp;&nbsp;some&nbsp;text<br>&lt;<span data-darkreader-inline-color="">/Text&gt;<br>&lt;input<br>&nbsp;&nbsp;id="input"<br>&nbsp;&nbsp;/</span><span data-darkreader-inline-color="">/&nbsp;@ts-ignore&nbsp;ts-migrate(2322)&nbsp;FIXME:&nbsp;Type&nbsp;'Element'&nbsp;is&nbsp;not&nbsp;assignable&nbsp;to&nbsp;type&nbsp;'string'.<br>&nbsp;&nbsp;name={getName()}<br>/</span>&gt;<br></code>
```

在注释中包含有意义的错误消息可以更轻松地解决问题并重新访问需要注意的代码。这些注释与 $TSFixMe ² 相结合，使我们能够收集有关代码质量的有用数据并识别代码中可能存在问题的区域。

最后但同样重要的是，我们需要运行 eslint-fix 插件两次。在 tsIgnorePlugin 之前给定的格式可能会影响我们将在何处获得编译器错误。在 tsIgnorePlugin 之后再次出现，因为插入 @ts-ignore 注释可能会引入新的格式错误。

## 总结

我们的迁移故事正在进行中：我们有一些遗留项目仍在使用 JavaScript，我们的代码库中仍然有大量的 $TSFixMe 和 @ts-ignore 评论。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然而，使用 ts-migrate 极大地加快了我们的迁移过程和生产力。工程师们能够专注于编码优化，而不是手动逐个文件迁移。目前，我们的 600 万行前端 monorepo 中约有 86% 已转换为 TypeScript，我们有望在年底前实现 95% 的转换。

您可以查看 ts-migrate 并在 Github 存储库的主包中找到有关如何安装和运行 ts-migrate 的说明。如果您发现任何问题或有改进的想法，我们欢迎您的贡献！

非常感谢 Brie Bunge，他是 Airbnb TypeScript 的推动者，也是 ts-migrate 的创建者。感谢 Joe Lencioni 帮助我们在 Airbnb 采用 TypeScript 并改进我们的 TypeScript 基础设施和工具。特别感谢 Elliot Sachs 和 John Haytko 为 ts-migrate 做出的贡献。感谢所有提供反馈和帮助的人！

## Footnote

我们想记下我们在此过程中发现的一些关于迁移的事情，它们可能会有用：

-   TypeScript 3.7 版本引入了 @ts-nocheck 注释，可以将其添加到 TypeScript 文件的顶部以禁用语义检查。我们没有使用这个注释，因为它之前不支持 .ts/.tsx 文件，但它在迁移过程中也可以成为一个很好的中间阶段帮手。
    
-   TypeScript 3.9 版本引入了 @ts-expect-error 注释。当一行以 @ts-expect-error 注释为前缀时，TypeScript 将禁止报告该错误。如果没有错误，TypeScript 将报告不需要 @ts-expect-error 。在 Airbnb 代码库中，我们改用 @ts-expect-error 注释而不是 @ts-ignore 。
    
-   @ts-ignore 注释允许我们告诉编译器忽略下一行的错误。
    
-   我们为 any 类型引入了自定义别名 — TSFixMeFunction = (…args: any\[\]) => any; 。尽管最佳实践是避免使用 any 类型，但使用它可以帮助我们简化迁移过程并明确应该重新访问哪些类型。
    

## 写在最后

在ts大量应用在新项目，而对于js老项目维护却日益艰难，在前端行业有很多人做过很多尝试将js项目迁移到ts代码。ts-migrate的出现在一定程度上，能够帮助我们渐进式迁移到ts，减少使用和开发成本。

学而知不足，水平有限，还望诸君多多指教。觉得文章不错的读者，不妨点个关注，收藏起来上班摸鱼的时候品尝。