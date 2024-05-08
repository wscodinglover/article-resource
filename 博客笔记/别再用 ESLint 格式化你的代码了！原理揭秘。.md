多年来，我一直呼吁“停止使用 ESLint 进行格式化”<sup data-darkreader-inline-color="">[1]</sup>。我认为像Prettier<sup data-darkreader-inline-color="">[2]</sup>这样的格式化工具和像ESLint<sup data-darkreader-inline-color="">[3]</sup>这样的 linter 是两种不同的工具，它们有不同的用途。虽然你可以使用 ESLint 进行格式化，这要归功于ESLint Stylistic<sup data-darkreader-inline-color="">[4]</sup>，但ESLint 建议使用一个单独的专用格式化工具<sup data-darkreader-inline-color="">[5]</sup>，typescript-eslint 也建议不要使用 ESLint 进行格式化<sup data-darkreader-inline-color="">[6]</sup>。

以下两个工具通常被用来帮助 ESLint 与 Prettier 更好地交互：

-   \`eslint-config-prettier\`<sup data-darkreader-inline-color="">[7]</sup>：一个 ESLint \_共享配置\_，它禁用了与格式化相关的规则
    
-   \`eslint-plugin-prettier\`<sup data-darkreader-inline-color="">[8]</sup>：一个 ESLint \_插件\_，它将 Prettier 作为规则在 ESLint 内部运行
    

我认为在大多数项目中，这两个工具都不再有用。本文将解释每个工具的用途、它们之间的区别，以及为什么我通常不使用它们。

## 回顾：ESLint 自定义

ESLint<sup data-darkreader-inline-color="">[9]</sup>通过让用户单独配置“规则”或对代码库进行检查来工作。ESLint 将执行代码解析成规则可以理解的形式、将代码传递给这些规则，并让你知道任何由这些规则发出的报告。

ESLint 具有高度可扩展性：这意味着你可以自定义其运行的许多方面。最常见的自定义方式有：

-   解析器<sup data-darkreader-inline-color="">[10]</sup>：替换 ESLint 内置的 JavaScript 解析器，以支持读取与原生 JavaScript 语法不同的代码
    
-   插件<sup data-darkreader-inline-color="">[11]</sup>：提供一组可配置的规则
    
-   共享配置<sup data-darkreader-inline-color="">[12]</sup>：为任何数量的规则提供配置选项，无论是作为独立的 npm 包还是作为_插件_的一部分
    

请注意，_插件_和_共享配置_是两个不同的东西。

-   **插件**使规则可用，而不配置这些规则。
    
-   **共享配置**配置 ESLint 自带的规则和/或之前在插件中提供的规则。
    

### ESLint 自定义示例：TypeScript

如果你使用 ESLint 来检查 TypeScript 代码，那么你希望使用所有三种自定义：

-   **解析器**：\`@typescript-eslint/parser\`<sup data-darkreader-inline-color="">[13]</sup>支持解析 TypeScript 代码
    
-   **插件**：\`@typescript-eslint/eslint-plugin\`<sup data-darkreader-inline-color="">[14]</sup>加载特定于 TypeScript 的规则
    
-   **共享配置**：与`@typescript-eslint/eslint-plugin`一起打包的共享设置，可以一次性配置许多规则，例如\`plugin:@typescript-eslint/recommended\`<sup data-darkreader-inline-color="">[15]</sup>。
    

请注意，typescript-eslint 的_共享配置_来自`@typescript-eslint/eslint-plugin`npm 包。因此，它们前面有`plugin:`前缀：这是 ESLint 知道在哪里找到配置的方式。

## `eslint-config-prettier`

\`eslint-config-prettier\`<sup data-darkreader-inline-color="">[16]</sup>是一个_共享配置_，它禁用了与格式化相关的规则。你可以通过在 ESLint 配置中的`"extends"`数组中列出它来加载它：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;（简写为"eslint-config-prettier"）</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prettier"</span><br>&nbsp;&nbsp;]<br>}<br>
```

`eslint-config-prettier`的唯一目的是关闭规则。在内部，它看起来像一个对象，其中包含许多值为`0`或`"off"`的属性。大致如下：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"curly"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"no-unexpected-multiline"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"@babel/object-curly-spacing"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"@typescript-eslint/lines-around-comment"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span><br>}<br>
```

### `eslint-config-prettier` 为何出现

过去，流行的共享配置，如 \`eslint-config-airbnb\`<sup data-darkreader-inline-color="">[17]</sup>，经常被用来一次启用许多规则。这些配置之所以流行，是因为它们建立了一个众所周知的、有意见的风格指南和代码逻辑检查。它们的缺点是它们经常过于武断——甚至启用了格式化规则。

开发者通过知道 ESLint 按照它们在`"extends"`下列出的顺序评估配置来绕过这些格式化规则。`eslint-config-prettier`可以在项目的 ESLint 配置中最后列出，以关闭之前插件启用的任何格式化规则。

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;1.&nbsp;配置许多ESLint规则，包括启用一些格式化规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"airbnb"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2.&nbsp;仅禁用之前配置中的格式化规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prettier"</span><br>&nbsp;&nbsp;]<br>}<br>
```

通过从`eslint-config-prettier`最后扩展，项目可以在不运行 ESLint 中的格式化规则的情况下获得那些流行共享配置的好处。

### `eslint-config-prettier` 为何通常不必要

在过去几年中，ESLint 最佳实践在两个方面（以及其他方面）得到了发展：

-   ESLint 核心和大多数社区插件已经确定，在共享配置中启用过于武断的规则——尤其是风格化规则——会让开发者不喜欢 ESLint 而没有太多实际好处
    
-   ESLint 和 typescript-eslint 的推荐规则集已经包括了大多数有益的逻辑规则，这些规则集如`eslint-config-airbnb`主要用于这些规则
    

因此，许多新项目没有感觉到需要加载如`eslint-config-airbnb`这样武断的共享配置。许多项目从一个更简单的配置集开始：

1.  开始：`"eslint:recommended"`，ESLint 的内置推荐配置
    
2.  如果使用 TypeScript：`"plugin:@typescript-eslint/recommended"`或`"plugin:@typescript-eslint/recommended-type-checked"`，用于推荐的 TypeScript 规则
    
3.  任何框架或库特定的插件，如\`eslint-plugin-jsx-a11y\`<sup data-darkreader-inline-color="">[18]</sup>的`"plugin:jsx-a11y/recommended"`
    

**如果你不使用一个启用格式化规则的遗留 ESLint 共享配置，你很可能不需要`eslint-config-prettier`。** 如果在`"extends"`列表末尾添加`eslint-config-prettier`，如果一开始没有启用格式化规则，则什么也不做。因此，大多数项目从`eslint-config-prettier`中没有获得任何好处。

此外，使用`eslint-config-prettier`冗余地使用可能会出现两个令人困惑的问题：

-   在 ESLint 配置中看到对**prettier**的引用可能会让新接触该领域的开发者感到困惑。
    
-   没有什么可以阻止项目在 ESLint 配置的`"overrides"`或`"rules"`属性下手动重新启用格式化规则。
    

我现在建议大多数新项目不要包含`eslint-config-prettier`。

> 💡 不确定是否可以安全地从`"extends"`中删除**prettier**？尝试删除它，然后运行`npx eslint-config-prettier some/file.js`，看看它是否指出了任何冲突的规则。运行 ESLint 时使用\`--print-config\`<sup data-darkreader-inline-color="">[19]</sup>可以打印出文件的完整列表。

## `eslint-plugin-prettier`

`eslint-plugin-prettier`是一个 ESLint \_插件\_，它提供了两样东西：

-   一个自定义规则，`prettier/prettier`，它在一个 ESLint 规则中运行所有 Prettier
    
-   一个共享配置，`plugin:prettier/recommended`，它启用了`prettier/prettier`规则
    

例如，在 ESLint 的遗留配置格式中，你可以通过扩展其推荐配置来启用它：

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;[<span data-darkreader-inline-color="">"plugin:prettier/recommended"</span>]<br>}<br>
```

扩展该配置：

1.  将`eslint-plugin-prettier`添加到扩展插件的`"plugins"`列表中，从而加载`prettier/prettier`规则
    
2.  启用`prettier/prettier`规则
    
3.  将`eslint-config-prettier`添加到扩展配置的`"extends"`列表中
    

这种方法的优点是你不需要单独配置 Prettier 和 ESLint。你可以有一个文件——你的 ESLint 配置——启用两者。

### `eslint-plugin-prettier` 为何经常有害

`eslint-plugin-prettier`以`eslint-plugin-prettier`的方式在 ESLint 规则中运行 Prettier 有两个大问题：

-   行为：它将 Prettier 的报告与 ESLint 的报告合并，根据我的经验，这会让不熟悉这些工具的开发者感到困惑
    
-   性能：现在格式化被阻塞在所有 linting 上，这通常比格式化慢得多
    

性能点在使用类型检查规则<sup data-darkreader-inline-color="">[20]</sup>的项目中可能会变得很糟糕。

-   如果`prettier/prettier`是唯一产生包含自动修复器的报告的 lint 规则，则 linting 必须运行两次
    
-   如果任何其他规则引入自动修复，一个或多个额外的周期可能从`prettier/prettier`修复格式问题与那些自动修复
    

> 😬 请记住，lint 规则没有格式设置的可见性。它们的自动修复器不太可能产生与你的格式化工具对齐的代码。

类型检查的 linting 本质上通常至少与在所有 linted 文件上运行 TypeScript 类型检查器一样慢。Rust-Based JavaScript Linters: Fast, But No Typed Linting Right Now<sup data-darkreader-inline-color="">[21]</sup>解释了原因。运行额外的 linting 多次累积 - 并导致对 ESLint 和 typescript-eslint 性能的错误负面看法。

**我强烈建议你不要使用`eslint-plugin-prettier`。**我们在typescript-eslint 格式化常见问题解答<sup data-darkreader-inline-color="">[22]</sup>和typescript-eslint 性能故障排除文档<sup data-darkreader-inline-color="">[23]</sup>中甚至明确建议不要使用`eslint-plugin-prettier`。

如果`prettier/prettier`在你的 ESLint 配置中启用，你可以采取的最佳步骤是将其从配置中删除，并完全卸载`eslint-plugin-prettier`包。否则，你可以手动禁用该规则(`"prettier/prettier": "off"`在`"rules"`下)。到那时，你仍然启用了`eslint-config-prettier`共享配置。

## 结论

_格式化_和_linting_是两个单独的问题。将两者混合可能会对你的开发工具的性能和可理解性产生负面影响。我的标准存储库模板，\`create-typescript-app\`<sup data-darkreader-inline-color="">[24]</sup>，明确将两者分开。

如果你的 ESLint 配置引用了\`eslint-config-prettier\`<sup data-darkreader-inline-color="">[25]</sup>，我建议你尝试将其从配置中删除。你可能不再需要它了。

如果你的 ESLint 配置引用了\`eslint-plugin-prettier\`<sup data-darkreader-inline-color="">[26]</sup>，我强烈建议你改用单独的 ESLint 启用 Prettier。运行`prettier/prettier`规则可能会给你的项目带来显著的性能问题。

无论你的 ESLint 配置启用了哪些工具，如果你已经有一段时间没有对其进行大修，我强烈建议：

1.  确保`"eslint:recommended"`在你的规则扩展中
    
2.  如果你使用 TypeScript：
    

1.  确保至少启用了\`plugin:@typescript-eslint/recommended\`<sup data-darkreader-inline-color="">[27]</sup> - 或者更好的是，启用了\`plugin:@typescript-eslint/recommended-type-checked\`<sup data-darkreader-inline-color="">[28]</sup>
    
2.  查看\`create-typescript-app\`<sup data-darkreader-inline-color="">[29]</sup>的\`.eslintrc.cjs\`<sup data-darkreader-inline-color="">[30]</sup>，查看任何适用于你项目的规则或插件
    
3.  查看github.com/dustinspecker/awesome-eslint<sup data-darkreader-inline-color="">[31]</sup>，查看任何与你的项目相关的其他插件
    

> 💡 Configuring ESLint, Prettier, and TypeScript Together<sup data-darkreader-inline-color="">[32]</sup>是我的一篇博客文章，更详细地介绍了如何配置这些工具。

祝大家快乐 linting！🎉

### 致谢

非常感谢Anisha Malde<sup data-darkreader-inline-color="">[33]</sup>建议我写一篇关于这个领域的解释文章，并帮助构思内容。谢谢！🙌

感谢Ben Scott<sup data-darkreader-inline-color="">[34]</sup>，`eslint-config-prettier`的维护者之一，审阅了这篇文章，并建议了如何描述`eslint-plugin-prettier`的澄清和更正。

感谢Simon Lydell<sup data-darkreader-inline-color="">[35]</sup>，`eslint-config-prettier`的原始创建者和长期维护者，审阅了这篇文章，并建议了`npx eslint-config-prettier`方法。

我们还应该注意到，尽管我个人不同意现在使用`eslint-config-prettier`和`eslint-plugin-prettier`，但它们多年来一直是合法有用的工具，非常感谢所有贡献者和维护者！

___

-   我是 ssh，工作 6 年+，阿里云、字节跳动 Web infra 一线拼杀出来的资深前端工程师 + 面试官，非常熟悉大厂的面试套路，Vue、React 以及前端工程化领域深入浅出的文章帮助无数人进入了大厂。
    
-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2023 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！

> 参考地址：https://www.joshuakgoldberg.com/blog/you-probably-dont-need-eslint-config-prettier-or-eslint-plugin-prettier/

### 参考资料

\[1\]

“停止使用 ESLint 进行格式化”: _https://www.joshuakgoldberg.com/blog/configuring-eslint-prettier-and-typescript-together#stop-using-eslint-for-formatting_

\[2\]

Prettier: _https://prettier.io/_

\[3\]

ESLint: _https://eslint.org/_

\[4\]

ESLint Stylistic: _https://eslint.style/_

\[5\]

ESLint 建议使用一个单独的专用格式化工具: _https://eslint.org/blog/2023/10/deprecating-formatting-rules_

\[6\]

typescript-eslint 也建议不要使用 ESLint 进行格式化: _https://typescript-eslint.io/linting/troubleshooting/formatting_

\[7\]

`eslint-config-prettier`: _https://github.com/prettier/eslint-config-prettier_

\[8\]

`eslint-plugin-prettier`: _https://github.com/prettier/eslint-plugin-prettier_

\[9\]

ESLint: _https://eslint.org/_

\[10\]

解析器: _https://eslint.org/docs/latest/extend/ways-to-extend#custom-parsers_

\[11\]

插件: _https://eslint.org/docs/latest/extend/ways-to-extend#plugins_

\[12\]

共享配置: _https://eslint.org/docs/latest/extend/ways-to-extend#shareable-configs_

\[13\]

`@typescript-eslint/parser`: _https://typescript-eslint.io/packages/parser_

\[14\]

`@typescript-eslint/eslint-plugin`: _https://typescript-eslint.io/packages/eslint-plugin_

\[15\]

`plugin:@typescript-eslint/recommended`: _https://typescript-eslint.io/linting/configs#recommended_

\[16\]

`eslint-config-prettier`: _https://github.com/prettier/eslint-config-prettier_

\[17\]

`eslint-config-airbnb`: _https://www.npmjs.com/package/eslint-config-airbnb_

\[18\]

`eslint-plugin-jsx-a11y`: _https://github.com/jsx-eslint/eslint-plugin-jsx-a11y_

\[19\]

`--print-config`: _https://eslint.org/docs/latest/use/command-line-interface#--print-config_

\[20\]

使用类型检查规则: _https://typescript-eslint.io/linting/typed-linting_

\[21\]

Rust-Based JavaScript Linters: Fast, But No Typed Linting Right Now: _https://www.joshuakgoldberg.com/blog/rust-based-javascript-linters-fast-but-no-typed-linting-right-now_

\[22\]

typescript-eslint 格式化常见问题解答: _https://typescript-eslint.io/linting/troubleshooting/formatting#eslint-plugin-prettier_

\[23\]

typescript-eslint 性能故障排除文档: _https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-prettier_

\[24\]

`create-typescript-app`: _https://github.com/JoshuaKGoldberg/create-typescript-app_

\[25\]

`eslint-config-prettier`: _https://github.com/prettier/eslint-config-prettier_

\[26\]

`eslint-plugin-prettier`: _https://github.com/prettier/eslint-plugin-prettier_

\[27\]

`plugin:@typescript-eslint/recommended`: _https://typescript-eslint.io/linting/configs#recommended_

\[28\]

`plugin:@typescript-eslint/recommended-type-checked`: _https://typescript-eslint.io/linting/configs#recommended-type-checked_

\[29\]

`create-typescript-app`: _https://github.com/JoshuaKGoldberg/create-typescript-app_

\[30\]

`.eslintrc.cjs`: _https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/.eslintrc.cjs_

\[31\]

github.com/dustinspecker/awesome-eslint: _https://github.com/dustinspecker/awesome-eslint_

\[32\]

Configuring ESLint, Prettier, and TypeScript Together: _https://www.joshuakgoldberg.com/blog/configuring-eslint-prettier-and-typescript-together_

\[33\]

Anisha Malde: _https://www.anisha.dev/_

\[34\]

Ben Scott: _https://github.com/BPScott_

\[35\]

Simon Lydell: _https://github.com/lydell_