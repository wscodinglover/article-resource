## 前言：为什么需要项目规范

我们学习编程的方式各有不同，对于知识的理解也各有不同，在一天天的编程过后，每个人都养成了自己的代码习惯和理解。

代码习惯和理解的差异，导致了团队中会出现各种各样的 “规范” 代码。在你查看自己的代码时，你可能会觉得自己的代码看起来比较标准，只是有点乱。但是在团队成员查看你的代码时，他心里可能会这么想：wtf，他写的代码怎么是这个样子。这种风格的代码就好像是一个公司律师用 excel 规范自动格式化的沙拉食谱，看起来一点都不靠谱。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHopfL1k6muaOqdmibP7lelZE1Onk8KmLo3CXFkAmibS0gCDXIjuibAafqtMVXkLq2HocAy9TuxZ7PYyQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image

这种差异性导致了团队协作的效率低下，也影响了项目的健壮性和可维护性。所以，我们需要对代码风格进行规范。这种规范不仅可以使代码风格保持统一，并且可以在代码运行之前就检测出一些错误和 bug，提高协作开发效率。

而前端开发人员最常用的 Javascript 最初设计出来是只是为了解决一些简单的网页互动，是一种弱类型、基于原型的语言。

Javascript 拥有其它语言所没有的灵活性，这种灵活性带来了代码效率的提升，但相应也使得代码编写具有很大的随意性。另外 Javascript 的隐式类型转换规则混乱，允许同名函数的重复定义，这就增加了代码中存在隐患的可能性。

> 冷笑话：Javascript 权威指南和 Javascript 语言精粹的厚度区别。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/H8M5QJDxMHopfL1k6muaOqdmibP7lelZE7icHmxmY4Wibkibp7D6j4XtZRTjibSJANUl6JKttv2icUxwsAYt5aYj1l8w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image

如果能够在代码提交测试之前发现这些潜在的错误，就能够极大地减轻测试人员的压力，减少软件项目的除错成本。可是 Javascript 作为解释型语言，解释器被内嵌在对应的客户端，对此表示无能为力，这个任务只能由专用的代码检查工具完成。

在接下来，我会针对上述的这些问题展开讲述，首先介绍解决这些问题的工具，然后再介绍借助这项工具来解决团队规范和错误预检问题的步骤方法，最后再用一行命令来整合这些复杂的步骤，将使用门槛降到最低。

## Eslint 和 Prettier

### lint

lint 是最著名的 C 语言工具之一，是由贝尔实验室 SteveJohnson 于 1979 在 PCC(PortableC Compiler) 基础上开发的静态代码分析，一般由 UNIX 系统提供。

lint 被用于检查 C 程序中潜在的错误，包括（但不限于）可疑的类型组合、未使用的变量、不可达的代码以及不可移植的代码。lint会产生一系列程序员有必要从头到尾仔细阅读的诊断信息。使用lint的好处是：

1.  它可以检查出被编译器漏掉的错误;
    
2.  可以关联很多文件进行错误的检查和代码分析,具有较强大灵活性
    

> lint 应该也算是 lint 界的老祖宗了。

### Eslint

有个叫 Nicholas C. Zakas 的人在 2013 年推出了一个 Javascript 的 lint 工具，而 Javascript 也称作 ECMAScript（简称 ES），所以这个工具被叫做 ESlint。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

Eslint 可以在运行代码前就发现一些语法错误和潜在的 bug，极大地减轻测试人员的压力，减少软件项目的除错成本。同时，Eslint 允许开发者通过 rules 定义自己的代码规范，所以非常适合用于制定团队代码规范。

### Prettier

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

Prettier 是一款代码格式化工具，用于检测代码中的格式问题，比如单行代码长度、tab长度、空格、逗号表达式等。在功能职责上，ESlint 偏向于把控项目的代码质量，而 Prettier 更偏向于统一项目的编码风格。

在 ESlint 推出 `--fix` 参数前，ESLint 并没有自动化格式代码的功能，要对一些格式问题做批量格式化只能用 Prettier 这样的工具。并且，Prettier 在代码风格的检测上比 ESlint 更全面，所以两者通常是结合在一起使用的。

## 常见的标准规范

在介绍规范之前，可以先使用 `npm i eslint prettier \-g` 命令全局安装 `eslint` 和 `prettier`，在后面的教程中都会使用到这两个全局包。

### ESlint 推荐的规范

ESlint 在默认情况下是不开启任何自定义规则校验，只对错误的 ES5 语法和标准的语法错误进行检测，比如 `const` 这种 ES6 语法，还有莫名其妙的分号（如下图）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

当我们在项目目录下新增 `eslintrc.js` 文件，并写入以下内容后，将会启用 ESlint 推荐的规范：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;<span data-darkreader-inline-color="">'eslint:recommended'</span><br>};<br>复制代码<br></code>
```

在 ESlint 的推荐规范中，会有一些内置的规则，比如定义后未使用的变量将会抛出错误，使用常量作为循环条件也会抛出错误（如下图）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

ESlint 的推荐规范可以避免掉一些错误，比如上述两个错误就可以在运行前被检查到并解决，更多详细规范请参考 ESlint Recommend。

### standard

standard 是基于 ESlint Recommend 衍生出来的更严格的规范。这个规范和 recommended 大概有 88 处不同，主要是 recommended 很多都是 off, standard 是 error, 比如 `单行代码块两边加空格`、`禁止使用分号结尾`。

下面的代码在 `recommended` 规范下不会报错，而在 `standard` 规范中会报错。

> recommended 规范

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

> standard 规范

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

先使用 `npm i standard eslint-plugin-standard eslint-config-standard \-D` 命令安装 `standard` 插件，然后在 `eslintrc.js` 文件中写入以下内容后，将会启用 standard 规范：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<span data-darkreader-inline-color="">'standard'</span>]<br>};<br>复制代码<br></code>
```

standard 会比 recommended 更加严格，在代码风格上也做了一些限制。不过它的用户群体也是比较多的，也不乏一些大家耳熟能详的。（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

详细规范请参考 ESlint Standard。

### airbnb

airbnb 规范是最严格的 ESlint 规范，列出下面几点比较明显的区别：

1.  默认必须要分号，而eslint默认不添加分号
    
2.  不能使用for循环，推荐使用数组自带的 API 完成遍历工作。
    
3.  当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。
    

除了这些以外，还有更多严格的规则，可以查看 Airbnb 规范。

## 在项目中配置 Eslint + Prettier

由于 Eslint 和 Prettier 存在一些相同的规则，当同一个规则设置不同时，就会出现很诡异的现象：使用 prettier 格式化的代码，无法通过 eslint 校验。

下面，我们就以一份 `前端代码规范` 为例，为一个项目配置一套完整的 `ESlint + Prettier` 规范。

### 配置 .eslintrc.js

我们新建一个 `eslintrc.js` 文件，写入以下内容，作为我们的初始化配置。（如下）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;表示该文件为根配置文件</span><br>};<br>复制代码<br></code>
```

在上一章的示例代码中，我们发现 eslint 默认只能识别 `es5` 的语法，所以我们先配置 `env` 属性，让 `eslint` 支持到 `es6` 语法，并且我们设置环境为 `browser`（浏览器） 或 `node`（如下）。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">env</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">browser</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">node</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">es6</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;<span data-darkreader-inline-color="">'eslint:recommended'</span><br>};<br>复制代码<br></code>
```

如果使用 `standard` 标准则不需要额外设置，`standard` 支持最新的 ECMAScript 特性。而实验性的特性，则需要添加 `babel-eslint` 解析器。

所以，这里我们直接配置 `standard` 标准和 `babel-eslint` 解析器，再加上一些自定义规则后，最后配置的规则如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">root</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">parserOptions</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">parser</span>:&nbsp;<span data-darkreader-inline-color="">'babel-eslint'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;解析一些最新的&nbsp;es&nbsp;语法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">sourceType</span>:&nbsp;<span data-darkreader-inline-color="">'module'</span>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;模块为&nbsp;ECMAScript&nbsp;模块</span><br>&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">extends</span>:&nbsp;[<span data-darkreader-inline-color="">'standard'</span>],&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用&nbsp;standard&nbsp;标准</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">rules</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'no-debugger'</span>:&nbsp;<span data-darkreader-inline-color="">'error'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;禁止在代码中使用&nbsp;debugger</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">quotes</span>:&nbsp;[<span data-darkreader-inline-color="">'error'</span>,&nbsp;<span data-darkreader-inline-color="">'single'</span>],&nbsp;<span data-darkreader-inline-color="">//&nbsp;单引号</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">semi</span>:&nbsp;[<span data-darkreader-inline-color="">'error'</span>,&nbsp;<span data-darkreader-inline-color="">'always'</span>]&nbsp;<span data-darkreader-inline-color="">//&nbsp;代码需要以分号结尾</span><br>&nbsp;&nbsp;}<br>};<br>复制代码<br></code>
```

在 `ESlint` 规范文件配置完成后，我们再来添加 `Prettier` 配置文件，新建 `.prettierrc.js` 文件，添加以下内容：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">printWidth</span>:&nbsp;<span data-darkreader-inline-color="">800</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;单行宽度限制</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">tabWidth</span>:&nbsp;<span data-darkreader-inline-color="">2</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;tab&nbsp;使用两个空格</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">useTabs</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;不使用制表符缩进，使用空格缩进</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">semi</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;代码需要分号结尾</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">singleQuote</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;单引号</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">bracketSpacing</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;对象左右两侧需要空格</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">jsxBracketSameLine</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;html&nbsp;关闭标签换行</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">arrowParens</span>:&nbsp;<span data-darkreader-inline-color="">'avoid'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;单参数的箭头函数参数不需要括号</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">proseWrap</span>:&nbsp;<span data-darkreader-inline-color="">'never'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;参考&nbsp;https://prettier.io/docs/en/options.html#prose-wrap</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">trailingComma</span>:&nbsp;<span data-darkreader-inline-color="">'none'</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;参考&nbsp;https://prettier.io/docs/en/options.html#trailing-commas</span><br>};<br>复制代码<br></code>
```

在配置完成后，我们新建一个文件，测试一下效果。在 `src` 目录下新建文件 `test.js`，填入以下内容：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

### 使用自动格式化

从上面可以看出，文件并不符合我们制定的 eslint 规范，我们下面分别使用 eslint 格式化和 prettier 格式化功能来尝试修正。

首先，我们在命令行输入 `eslint \--fix src/test.js`，然后看看效果（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

我们可以看到，多余的空格被删除了，双引号被换成了双引号，赋值运算符的左右两侧也被加上了空格。

接下来，我们先把文件还原，然后使用 `prettier \-w src/test.js` 命令进行格式化，效果如下图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

从上图可以看出，由于我们设置的 `eslint` 和 `prettier` 的规则一致，所以格式化后的文件也是高度相似的。

这样一来，我们就完成了代码规范格式的统一。

## vscode 插件

大家从上面的示例代码中可以看出，编写不合规范的代码会直接在编辑器中报出错误，这是因为上面的示例代码使用 `vscode` 展示，并安装了一些插件来辅助开发。

下面，我们就来介绍一下这些插件。

我们先通过 `vscode` 安装 `ESLint` 插件（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

在安装了 `ESLint` 插件后，插件会读取目录下的 `eslint` 配置文件，然后对代码中的错误进行检查后提示出来（如下图）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

如果我们在 `vscode` 中设置了下面这个属性的话，在保存文件的时候将会自动格式化代码。（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

下面，我们可以再安装 `Prettier` 插件（如下图）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

在安装好插件后，使用键盘组合键 `shift + command/ctrl + p` 唤起设置，然后输入 `Format Selection With...` 后，按回车键，在选项中选择 `Prettier` 即可（如下图）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

在设置完成后，使用组合键 `shift + option/alt + f` 即可完成对文件的格式化。

这两个插件还有更多的功能，大家可以自行探索一下。

### 插件的三两事

> 如果你对 vscode 的插件比较熟悉，可以跳过本章节内容。

在 `vscode` 的插件安装过程中，有很多童鞋反馈过问题，这里给出一些常见问题的解决方案。

#### 插件不工作

1.  全局安装 `npm i eslint prettier -g`
    
2.  安装好 `vscode` 插件后，重启 `vscode`
    
3.  如果还是不行的话，升级 `vscode`
    

#### 插件未启用

新版 `vscode` 需要手动启用 `eslint` 插件，在右下角查看 eslint 工作状态，可以点击开启。（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

#### 启用后不工作

右下角查看 eslint 工作状态，点击会输出日志。（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

根据输出日志，进行修复，比如上图就是缺少对应插件，安装即可。

#### 保存没有按照 eslint 的规则修复

这可能是因为你的 `vscode` 开启了保存自动格式化（代码格式化），先打开 `首选项 > 设置`，搜索 `format on save`，然后关闭这个选项（如下图）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

#### 正常工作

正常工作的 `eslint` 和 `prettier` 插件状态如下图所示。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

## 在提交时自动检测和格式化代码

在项目开发过程中，自动格式化并不总是让人安心的，因为并不是项目组的所有成员都会使用 `vscode` 插件来做自动格式化。

这样的情况会导致有一些不规范的代码被提交到服务端，依然会造成团队规范不一致的问题，这个时候就需要用到提交时自动检测和格式化代码的功能。

接下来，我们将使用 `husky` 来进行代码提交时的自动检测工作。

先使用 `npm i husky \-D` 安装依赖，在依赖完成完成后，我们需要使用下面这条命令初始化 `husky`（如下）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npx&nbsp;husky&nbsp;install&nbsp;&amp;&amp;&nbsp;npx&nbsp;husky&nbsp;<span data-darkreader-inline-color="">set</span>&nbsp;.husky/pre-commit&nbsp;<span data-darkreader-inline-color="">"npm&nbsp;run&nbsp;pre-commit"</span><br>复制代码<br></code>
```

上面的命令是初始化 `git hook`，在 `git commit` 之前会先执行 `pre-commit` 命令。

所以，我们还需要在项目的 `package.json` 中，添加 `pre-commit`，这个命令运行时进行 `eslint` 检测（如下）。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"pre-commit"</span>:&nbsp;<span data-darkreader-inline-color="">"eslint&nbsp;src"</span><br>}<br>复制代码<br></code>
```

接下来，我们运行 `git add .` 和 `git commit \-m 'test'` 命令，尝试提交代码，会发现提交失败，命令行输出如下图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

如上图所示，在提交时检测到代码不符合 `eslint` 规范，提交失败了。

如果我们希望在检测错误的同时，自动修复 `eslint` 语法错误，则需要用到 `lint-staged`，使用 `npm i lint-staged \-D` 先进行安装，然后在 `package.json` 中修改 `pre-commit` 命令，再添加以下内容。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"pre-commit"</span>:&nbsp;<span data-darkreader-inline-color="">"lint-staged"</span><br>},<br><span data-darkreader-inline-color="">"lint-staged"</span>:&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"src/**"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"eslint&nbsp;--fix"</span><br>&nbsp;&nbsp;]<br>}<br>复制代码<br></code>
```

接下来，我们再次运行 `git add .` 和 `git commit \-m 'test'` 命令，尝试提交代码，输出如下图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

从上图可以看出，在运行 `lint-staged` 命令后，会通过 `eslint \--fix` 自动将不符合规格的代码正确格式化。

这样一来，代码提交时的自动检测和格式化代码工作就完成了。

## 使用脚手架，将配置自动化

### 手动配置的问题

在完成上述配置后，似乎已经大功告成，马上可以走在规范编码的愉快道路上，但是并没有。

我们仔细梳理一下会发现，我们需要在某个新项目中配置代码规范时，需要进行以下繁琐的步骤。

1.  安装 Eslint。
    
2.  根据项目类型安装对应的 ESLint 规则配置 npm 包。
    
3.  根据项目类型安装相关的插件、解析器等。
    
4.  根据项目类型配置 .eslintrc .prettierrc 文件。
    
5.  安装代码提交检查 + 自动格式化工具。husky + lint-staged
    
6.  配置 package.json。
    
7.  测试及修复问题。
    

这些繁琐的步骤会耗费大量的时间，并且可能还会出现一些错误需要额外花时间去排查。这样的流程对于个人来说可能是个比较好的学习机会，但是对于团队来说确实是个低效的协作方式。

所以，我们可以借助一些工具来帮忙完成上述工作，这个工具可以根据配置选择，生成对应的规范配置，并安装可以互相兼容的依赖包。

### 使用脚手架进行自动配置

我们先使用 `npm i standard-config-cli \-g` 命令全局安装脚手架工具，然后在对应的目录下运行 `jgxl standard` 命令。

这里我们以 `vue + typescript` 命令为例，选择的配置如下图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

在初始化完成后，对应的几个配置文件内容如下：

> .eslintrc.js

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

> .prettierrc.js

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

> package.json

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image

从上面可以看出，我们的规范配置会根据所选配置，生成对应的规范配置文件，并且已经安装了相关版本的依赖。

作为团队成员，不需要关心这些规范的细枝末节，只需要进行核心业务开发即可。

> TIPS：`自动修正` 功能只能修正部分代码风格规范，对于一些可能产生隐患的代码问题不会自动修正（例如：定义而未使用的变量）。

## 小结

在代码风格规范的争论上，每个人都有自己的理解，永远没有正确的答案。把时间用于细枝末节上争论，不如多把关注点聚焦在核心业务上。

而不管怎样争论，总归会选择一种风格。在这个方面，也需要在个人语义和普适价值上做一个权衡。

所以，选择一份前端规范标准（如 `standard`），然后保持吧。把时间留下来解决其他有意义的问题！(^\_\_\_\_^)/

参考资料：

-   Javascript的10个设计缺陷
    
-   eslint
    
-   standard
    
-   prettier
    
-   使用ESLint+Prettier来统一前端代码风格
    
-   ESLint 在中大型团队(美团)的应用实践
    
-   Why (and how) to use eslint in your project
    
-   Automate Your Coding Standard