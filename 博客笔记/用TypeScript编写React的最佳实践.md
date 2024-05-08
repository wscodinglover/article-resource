> 本文译自 https://www.sitepoint.com/react-with-typescript-best-practices/

![Image](https://mmbiz.qpic.cn/mmbiz_png/aDoYvepE5x3Hh6eK2PeMZwh9YwmSF46vrUNsgF0rQJY8xPFnC5fYvicrRRIe96UYTQy4KXj8u2CGY2BYyY2iac1A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

如今， `React` 和 `TypeScript` 是许多开发人员正在使用的两种很棒的技术。但是把他们结合起来使用就变得很棘手了，有时很难找到正确的答案。不要担心，本文我们来总结一下两者结合使用的最佳实践。  

## React 和 TypeScript 如何一起使用

在开始之前，让我们回顾一下 `React` 和 `TypeScript` 是如何一起工作的。`React` 是一个 “用于构建用户界面的 `JavaScript` 库” ，而 `TypeScript` 是一个 “可编译为普通 `JavaScript` 的 `JavaScript`类型化超集” 。通过同时使用它们，我们实际上是使用 `JavaScript` 的类型化版本来构建 UI。

将它们一起使用的原因是为了获得静态类型化语言( `TypeScript` )对 `UI` 的好处：减少 JS 带来的 bug，让前端开发更安全。

### TypeScript 会编译我的 React 代码吗？

一个经常被提到的常见问题是 `TypeScript` 是否编译你的 `React` 代码。`TypeScript` 的工作原理类似于下面的方式：

-   TS：“嘿，这是你所有的UI代码吗？”
    
-   React：“是的！”
    
-   TS：“酷！我将对其进行编译，并确保你没有错过任何内容。”
    
-   React：“听起来对我很好！”
    

因此，答案是肯定的！但是稍后，当我们介绍 `tsconfig.json` 配置时，大多数时候你都想使用 `"noEmit": true` 。这是因为通常情况下，我们只是利用 `TypeScript` 进行类型检查。

概括地说， `TypeScript` 编译你的 `React` 代码以对你的代码进行类型检查。在大多数情况下，它不会发出任何 `JavaScript` 输出。输出仍然类似于非 `TypeScript React` 项目。

### TypeScript 可以与 React 和 Webpack 一起使用吗？

是的， `TypeScript` 可以与 `React` 和 `webpack` 一起使用。幸运的是，官方 `TypeScript` 手册对此提供了配置指南。

希望这能使你轻而易举地了解两者的工作方式。现在，进入最佳实践！

## 最佳实践

我们研究了最常见的问题，并整理了 `React with TypeScript` 最常用的一些写法和配置。这样，通过使用本文作为参考，你可以在项目中遵循最佳实践。

### 配置

配置是开发中最无趣但是最重要的部分之一。我们怎样才能在最短的时间内完成这些配置，从而提供最大的效率和生产力？我们一起来讨论下面的配置

-   `tsconfig.json`
    
-   `ESLint` / `Prettier`
    
-   `VS Code` 扩展和配置
    

#### 项目初始化

初始化一个 `React/TypeScript` 应用程序的最快方法是 `create-react-app` 与 `TypeScript` 模板一起使用。你可以运行以下面的命令：

```
npx create-react-app my-app --template typescript<br>
```

这可以让你开始使用 `TypeScript` 编写 `React` 。一些明显的区别是：

-   `.tsx`：`TypeScript JSX` 文件扩展
    
-   `tsconfig.json`：具有一些默认配置的 `TypeScript` 配置文件
    
-   `react-app-env.d.ts`：`TypeScript` 声明文件，可以进行允许引用 `SVG` 这样的配置
    

#### tsconfig.json

幸运的是，最新的 `React/TypeScript` 会自动生成 `tsconfig.json` ，并且默认带有一些最基本的配置。我们建议你修改成下面的内容：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"compilerOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"target"</span>:&nbsp;<span data-darkreader-inline-color="">"es5"</span>,&nbsp;//&nbsp;指定&nbsp;ECMAScript&nbsp;版本<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"lib"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dom"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dom.iterable"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esnext"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;],&nbsp;//&nbsp;要包含在编译中的依赖库文件列表<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"allowJs"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;允许编译&nbsp;JavaScript&nbsp;文件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"skipLibCheck"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;跳过所有声明文件的类型检查<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"esModuleInterop"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;禁用命名空间引用&nbsp;(import&nbsp;*&nbsp;as&nbsp;fs&nbsp;from&nbsp;<span data-darkreader-inline-color="">"fs"</span>)&nbsp;启用&nbsp;CJS/AMD/UMD&nbsp;风格引用&nbsp;(import&nbsp;fs&nbsp;from&nbsp;<span data-darkreader-inline-color="">"fs"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"allowSyntheticDefaultImports"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;允许从没有默认导出的模块进行默认导入<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"strict"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;启用所有严格类型检查选项<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"forceConsistentCasingInFileNames"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;不允许对同一个文件使用不一致格式的引用<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"module"</span>:&nbsp;<span data-darkreader-inline-color="">"esnext"</span>,&nbsp;//&nbsp;指定模块代码生成<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"moduleResolution"</span>:&nbsp;<span data-darkreader-inline-color="">"node"</span>,&nbsp;//&nbsp;使用&nbsp;Node.js&nbsp;风格解析模块<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"resolveJsonModule"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;允许使用&nbsp;.json&nbsp;扩展名导入的模块<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noEmit"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;不输出(意思是不编译代码，只执行类型检查)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"jsx"</span>:&nbsp;<span data-darkreader-inline-color="">"react"</span>,&nbsp;//&nbsp;在.tsx文件中支持JSX<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"sourceMap"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;生成相应的.map文件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"declaration"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;生成相应的.d.ts文件<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noUnusedLocals"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;报告未使用的本地变量的错误<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noUnusedParameters"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;报告未使用参数的错误<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"experimentalDecorators"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;启用对ES装饰器的实验性支持<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"incremental"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//&nbsp;通过从以前的编译中读取/写入信息到磁盘上的文件来启用增量编译<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"noFallthroughCasesInSwitch"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"include"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"src/**/*"</span>&nbsp;//&nbsp;***&nbsp;TypeScript文件应该进行类型检查&nbsp;***<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"exclude"</span>:&nbsp;[<span data-darkreader-inline-color="">"node_modules"</span>,&nbsp;<span data-darkreader-inline-color="">"build"</span>]&nbsp;//&nbsp;***&nbsp;不进行类型检查的文件&nbsp;***<br>}<br><br>
```

> 其他建议来自 react-typescript-cheatsheet 社区

#### ESLint / Prettier

为了确保你的代码遵循项目或团队的规则，并且样式保持一致，建议你设置 `ESLint` 和 `Prettier` 。为了让它们配合的很好，请按照以下步骤进行设置。

1.安装依赖

```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev<br>
```

2.在根目录下创建一个`eslintrc.js` 文件并添加以下内容：

```
<span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">parser</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">'@typescript-eslint/parser'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;指定ESLint解析器</span><br>&nbsp;&nbsp;extends:&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:react/recommended'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用来自&nbsp;@eslint-plugin-react&nbsp;的推荐规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:@typescript-eslint/recommended'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用来自@typescript-eslint/eslint-plugin的推荐规则</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">parserOptions</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">ecmaVersion</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">2018</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许解析最新的&nbsp;ECMAScript&nbsp;特性</span><br>&nbsp;&nbsp;sourceType:&nbsp;&nbsp;<span data-darkreader-inline-color="">'module'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许使用&nbsp;import</span><br>&nbsp;&nbsp;ecmaFeatures:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">jsx</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许对JSX进行解析</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;自定义规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;e.g.&nbsp;"@typescript-eslint/explicit-function-return-type":&nbsp;"off",</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">settings</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">react</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">version</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">'detect'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;告诉&nbsp;eslint-plugin-react&nbsp;自动检测&nbsp;React&nbsp;的版本</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>};<br><br>
```

3.添加 `Prettier` 依赖

```
yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev<br>
```

4.在根目录下创建一个 `.prettierrc.js` 文件并添加以下内容：

```
<span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">semi</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">trailingComma</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">'all'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">singleQuote</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">printWidth</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">120</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">tabWidth</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">4</span>,<br>};<br>
```

5.  更新 `.eslintrc.js` 文件：
    

```
<span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">parser</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">'@typescript-eslint/parser'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;指定ESLint解析器</span><br>&nbsp;&nbsp;extends:&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:react/recommended'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用来自&nbsp;@eslint-plugin-react&nbsp;的推荐规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:@typescript-eslint/recommended'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用来自@typescript-eslint/eslint-plugin的推荐规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'prettier/@typescript-eslint'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用&nbsp;ESLint&nbsp;-config-prettier&nbsp;禁用来自@typescript-eslint/&nbsp;ESLint&nbsp;与&nbsp;prettier&nbsp;冲突的&nbsp;ESLint&nbsp;规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:prettier/recommended'</span>,&nbsp;&nbsp;<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">parserOptions</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">ecmaVersion</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">2018</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许解析最新的&nbsp;ECMAScript&nbsp;特性</span><br>&nbsp;&nbsp;sourceType:&nbsp;&nbsp;<span data-darkreader-inline-color="">'module'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许使用&nbsp;import</span><br>&nbsp;&nbsp;ecmaFeatures:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">jsx</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;允许对JSX进行解析</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;自定义规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;e.g.&nbsp;"@typescript-eslint/explicit-function-return-type":&nbsp;"off",</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">settings</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">react</span>:&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">version</span>:&nbsp;&nbsp;<span data-darkreader-inline-color="">'detect'</span>,&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;告诉&nbsp;eslint-plugin-react&nbsp;自动检测&nbsp;React&nbsp;的版本</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>};<br>
```

#### VSCode 扩展和设置

我们添加了 `ESLint` 和 `Prettier` ，下一步就是在保存时自动修复/美化我们的代码。

首先，安装 VSCode 的 `ESLint extension` 和 `Prettier extension` 。这将使 `ESLint` 与您的编辑器无缝集成。

接下来，通过将以下内容添加到您的中来更新工作区设置 `.vscode/settings.json` ：

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"editor.formatOnSave"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>}<br>
```

保存时， `VS Code` 会发挥它的魔力并修复您的代码。很棒！

### 组件

`React` 的核心概念之一是组件。在这里，我们将引用 `React v16.8` 以后的标准组件，这意味着使用 `Hook` 而不是类的组件。

通常，一个基本的组件有很多需要关注的地方。让我们看一个例子：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><br><span data-darkreader-inline-color="">//&nbsp;函数声明式写法</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Heading</span>(<span></span>):&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">ReactNode</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>My&nbsp;Website&nbsp;Heading<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span></span><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;函数扩展式写法</span><br><span data-darkreader-inline-color="">const</span>&nbsp;OtherHeading:&nbsp;React.FC&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>My&nbsp;Website&nbsp;Heading<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span></span><br>
```

注意这里的关键区别。在第一个例子中，我们使用函数声明式写法，我们注明了这个函数返回值是 `React.ReactNode` 类型。相反，第二个例子使用了一个函数表达式。因为第二个实例返回一个函数，而不是一个值或表达式，所以我们我们注明了这个函数返回值是 `React.FC` 类型。

记住这两种方式可能会让人混淆。这主要取决于设计选择。无论您选择在项目中使用哪个，都要始终如一地使用它。

### Props

我们将介绍的下一个核心概念是 `Props`。你可以使用 `interface` 或 `type` 来定义 `Props` 。让我们看另一个例子：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><br>interface&nbsp;Props&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;string;<br>&nbsp;&nbsp;color:&nbsp;string;<br>}<br><br>type&nbsp;OtherProps&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;string;<br>&nbsp;&nbsp;color:&nbsp;string;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Notice&nbsp;here&nbsp;we're&nbsp;using&nbsp;the&nbsp;function&nbsp;declaration&nbsp;with&nbsp;the&nbsp;interface&nbsp;Props</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Heading</span>(<span>{&nbsp;name,&nbsp;color&nbsp;}:&nbsp;Props</span>):&nbsp;<span data-darkreader-inline-color="">React</span>.<span data-darkreader-inline-color="">ReactNode</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>My&nbsp;Website&nbsp;Heading<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span></span><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Notice&nbsp;here&nbsp;we're&nbsp;using&nbsp;the&nbsp;function&nbsp;expression&nbsp;with&nbsp;the&nbsp;type&nbsp;OtherProps</span><br><span data-darkreader-inline-color="">const</span>&nbsp;OtherHeading:&nbsp;React.FC&lt;OtherProps&gt;&nbsp;=&nbsp;<span>(<span>{&nbsp;name,&nbsp;color&nbsp;}</span>)&nbsp;=&gt;</span><br>&nbsp;&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>My&nbsp;Website&nbsp;Heading<span>&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span></span><br>
```

关于 `interface` 或 `type` ，我们建议遵循 `react-typescript-cheatsheet` 社区提出的准则：

-   在编写库或第三方环境类型定义时，始终将 `interface` 用于公共 `API` 的定义。
    
-   考虑为你的 React 组件的 `State` 和 `Props` 使用 `type` ，因为它更受约束。”
    

让我们再看一个示例：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><br>type&nbsp;Props&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;color&nbsp;to&nbsp;use&nbsp;for&nbsp;the&nbsp;background&nbsp;*/</span><br>&nbsp;&nbsp;color?:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;standard&nbsp;children&nbsp;prop:&nbsp;accepts&nbsp;any&nbsp;valid&nbsp;React&nbsp;Node&nbsp;*/</span><br>&nbsp;&nbsp;children:&nbsp;React.ReactNode;<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;callback&nbsp;function&nbsp;passed&nbsp;to&nbsp;the&nbsp;onClick&nbsp;handler*/</span><br>&nbsp;&nbsp;onClick:&nbsp;<span><span>()</span>&nbsp;&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">void</span>;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;Button:&nbsp;React.FC&lt;Props&gt;&nbsp;=&nbsp;<span>(<span>{&nbsp;children,&nbsp;color&nbsp;=&nbsp;<span data-darkreader-inline-color="">'tomato'</span>,&nbsp;onClick&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;<span data-darkreader-inline-color="">style</span>=<span data-darkreader-inline-color="">{{</span>&nbsp;backgroundColor:&nbsp;color&nbsp;}}&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{onClick}</span>&gt;</span>{children}<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span></span><br>}<br><br>
```

在此 `<Button />` 组件中，我们为 `Props` 使用 `type`。每个 `Props` 上方都有简短的说明，以为其他开发人员提供更多背景信息。`?` 表示 `Props` 是可选的。`children props` 是一个 `React.ReactNode` 表示它还是一个 `React` 组件。

通常，在 `React` 和 `TypeScript` 项目中编写 `Props` 时，请记住以下几点：

-   始终使用 `TSDoc` 标记为你的 `Props` 添加描述性注释 `/** comment */`。
    
-   无论你为组件 `Props` 使用 `type` 还是 `interfaces` ，都应始终使用它们。
    
-   如果 `props` 是可选的，请适当处理或使用默认值。
    

### Hooks

幸运的是，当使用 `Hook` 时， `TypeScript` 类型推断工作得很好。这意味着你没有什么好担心的。举个例子:

```
<span data-darkreader-inline-color="">//&nbsp;`value`&nbsp;is&nbsp;inferred&nbsp;as&nbsp;a&nbsp;string</span><br><span data-darkreader-inline-color="">//&nbsp;`setValue`&nbsp;is&nbsp;inferred&nbsp;as&nbsp;(newValue:&nbsp;string)&nbsp;=&gt;&nbsp;void</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[value,&nbsp;setValue]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">''</span>)<br>
```

`TypeScript` 推断出 `useState` 钩子给出的值。这是一个 `React` 和 `TypeScript` 协同工作的成果。

在极少数情况下，你需要使用一个空值初始化 `Hook` ，可以使用泛型并传递联合以正确键入 `Hook` 。查看此实例：

```
type&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">email</span>:&nbsp;string;<br>&nbsp;&nbsp;id:&nbsp;string;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;the&nbsp;generic&nbsp;is&nbsp;the&nbsp;&lt;&nbsp;&gt;</span><br><span data-darkreader-inline-color="">//&nbsp;the&nbsp;union&nbsp;is&nbsp;the&nbsp;User&nbsp;|&nbsp;null</span><br><span data-darkreader-inline-color="">//&nbsp;together,&nbsp;TypeScript&nbsp;knows,&nbsp;"Ah,&nbsp;user&nbsp;can&nbsp;be&nbsp;User&nbsp;or&nbsp;null".</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[user,&nbsp;setUser]&nbsp;=&nbsp;useState&lt;User&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&gt;(<span data-darkreader-inline-color="">null</span>);<br>
```

下面是一个使用 `userReducer` 的例子：

```
type&nbsp;AppState&nbsp;=&nbsp;{};<br>type&nbsp;Action&nbsp;=<br>&nbsp;&nbsp;|&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">"SET_ONE"</span>;&nbsp;payload:&nbsp;string&nbsp;}<br>&nbsp;&nbsp;|&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">"SET_TWO"</span>;&nbsp;payload:&nbsp;number&nbsp;};<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reducer</span>(<span>state:&nbsp;AppState,&nbsp;action:&nbsp;Action</span>):&nbsp;<span data-darkreader-inline-color="">AppState</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">switch</span>&nbsp;(action.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;<span data-darkreader-inline-color="">"SET_ONE"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...state,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">one</span>:&nbsp;action.payload&nbsp;<span data-darkreader-inline-color="">//&nbsp;`payload`&nbsp;is&nbsp;string</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">case</span>&nbsp;<span data-darkreader-inline-color="">"SET_TWO"</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...state,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">two</span>:&nbsp;action.payload&nbsp;<span data-darkreader-inline-color="">//&nbsp;`payload`&nbsp;is&nbsp;number</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">default</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;state;<br>&nbsp;&nbsp;}<br>}<br>
```

可见，Hooks 并没有为 `React` 和 `TypeScript` 项目增加太多复杂性。

### 常见用例

本节将介绍人们在将 `TypeScript` 与 `React` 结合使用时一些常见的坑。我们希望通过分享这些知识，您可以避免踩坑，甚至可以与他人分享这些知识。

#### 处理表单事件

最常见的情况之一是 `onChange` 在表单的输入字段上正确键入使用的。这是一个例子：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;MyInput&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[value,&nbsp;setValue]&nbsp;=&nbsp;React.useState(<span data-darkreader-inline-color="">''</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;事件类型是“ChangeEvent”</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;我们将&nbsp;“HTMLInputElement”&nbsp;传递给&nbsp;input</span><br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">onChange</span>(<span>e:&nbsp;React.ChangeEvent&lt;HTMLInputElement&gt;</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;setValue(e.target.value)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">value</span>=<span data-darkreader-inline-color="">{value}</span>&nbsp;<span data-darkreader-inline-color="">onChange</span>=<span data-darkreader-inline-color="">{onChange}</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"input-example"</span>/&gt;</span><br>}<br></span>
```

#### 扩展组件的 Props

有时，您希望获取为一个组件声明的 `Props`，并对它们进行扩展，以便在另一个组件上使用它们。但是你可能想要修改一两个属性。还记得我们如何看待两种类型组件 `Props`、`type` 或 `interfaces` 的方法吗?取决于你使用的组件决定了你如何扩展组件 `Props` 。让我们先看看如何使用 `type`:

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br>type&nbsp;ButtonProps&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;background&nbsp;color&nbsp;of&nbsp;the&nbsp;button&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;text&nbsp;to&nbsp;show&nbsp;inside&nbsp;the&nbsp;button&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;text:&nbsp;string;<br>}<br><br>type&nbsp;ContainerProps&nbsp;=&nbsp;ButtonProps&nbsp;&amp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;height&nbsp;of&nbsp;the&nbsp;container&nbsp;(value&nbsp;used&nbsp;with&nbsp;'px')&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;number;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;Container:&nbsp;React.FC&lt;ContainerProps&gt;&nbsp;=&nbsp;<span>(<span>{&nbsp;color,&nbsp;height,&nbsp;width,&nbsp;text&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">style</span>=<span data-darkreader-inline-color="">{{</span>&nbsp;backgroundColor:&nbsp;color,&nbsp;height:&nbsp;`${height}px`&nbsp;}}&gt;</span>{text}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>}<br>
```

如果你使用 `interface` 来声明 `props`，那么我们可以使用关键字 `extends` 从本质上“扩展”该接口，但要进行一些修改：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span>;<br><br>interface&nbsp;ButtonProps&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;background&nbsp;color&nbsp;of&nbsp;the&nbsp;button&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;text&nbsp;to&nbsp;show&nbsp;inside&nbsp;the&nbsp;button&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;text:&nbsp;string;<br>}<br><br>interface&nbsp;ContainerProps&nbsp;extends&nbsp;ButtonProps&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;the&nbsp;height&nbsp;of&nbsp;the&nbsp;container&nbsp;(value&nbsp;used&nbsp;with&nbsp;'px')&nbsp;*/</span><br>&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;number;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;Container:&nbsp;React.FC&lt;ContainerProps&gt;&nbsp;=&nbsp;<span>(<span>{&nbsp;color,&nbsp;height,&nbsp;width,&nbsp;text&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">style</span>=<span data-darkreader-inline-color="">{{</span>&nbsp;backgroundColor:&nbsp;color,&nbsp;height:&nbsp;`${height}px`&nbsp;}}&gt;</span>{text}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span></span><br>}<br>
```

两种方法都可以解决问题。由您决定使用哪个。就个人而言，扩展 `interface` 更具可读性，但最终取决于你和你的团队。

### 第三方库

无论是用于诸如 `Apollo` 之类的 `GraphQL` 客户端还是用于诸如 `React Testing Library` 之类的测试，我们经常会在 `React` 和 `TypeScript` 项目中使用第三方库。发生这种情况时，你要做的第一件事就是查看这个库是否有一个带有 `TypeScript` 类型定义 `@types` 包。你可以通过运行：

```
#yarn<br>yarn add @types/&lt;package-name&gt;<br><br>#npm<br>npm install @types/&lt;package-name&gt;<br>
```

例如，如果您使用的是 `Jest` ，则可以通过运行以下命令来实现：

```
#yarn<br>yarn add @types/jest<br><br>#npm<br>npm install @types/jest<br>
```

这样，每当在项目中使用 `Jest` 时，就可以增加类型安全性。

该 `@types` 命名空间被保留用于包类型定义。它们位于一个名为 `DefinitelyTyped` 的存储库中，该存储库由 `TypeScript` 团队和社区共同维护。

## 总结

由于信息量大，以最佳方式一起使用 `React` 和 `TypeScript` 需要一些学习时间，但是从长远来看，其收益是巨大的。在本文中，我们介绍了配置，组件，Props，Hook，常见用例和第三方库。尽管我们可以更深入地研究各个领域，但这应涵盖帮助您遵循最佳实践所需的 `80％` 。

如果您希望看到它的实际效果，可以在GitHub上看到这个示例。

> https://github.com/jsjoeio/react-ts-example