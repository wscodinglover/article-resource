> **模拟面试、简历指导、入职指导、项目指导、答疑解惑**可私信找我~已帮助100+名同学完成改造！

## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心。

![Image](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdia8BrJfib3bjjZPg8fqsOOclGRaWUuIIDZm8CcCWJ8r2Z2uRtT9WdKn0y207A7iaMjeia5OpxpiazkplQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## JS 绕不开的精度丢失问题

在 javascript 中，当我们进行运算时

```
<span data-darkreader-inline-color="">0.1</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">0.2</span><br>
```

你觉得输出是 0.3 吗？显然不是的，由于 javascript 存在精度丢失问题，导致了输出的不是你预期的

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

至于为什么会精度丢失呢？我之前出过一篇文章专门讲了这个原因你知道 0.1+0.2 !==0.3是进制问题，但你讲不出个所以然，是吧？🐶，感兴趣的朋友可以看看，由于这不是本文的重点，所以我在这就不过多讲解~

## 解决精度丢失的方案？

我会选择使用 `decimal.js` 这个库，文档在 文档，他的基本使用如下：

```
<span data-darkreader-inline-color="">//&nbsp;先安装</span><br>npm&nbsp;install&nbsp;decimal.js<br><br><span data-darkreader-inline-color="">//&nbsp;后使用</span><br><span data-darkreader-inline-color="">const</span>&nbsp;Decimal&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'decimal.js'</span>);<br><br><span data-darkreader-inline-color="">new</span>&nbsp;Decimal(<span data-darkreader-inline-color="">0.1</span>).add(<span data-darkreader-inline-color="">0.2</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;加法&nbsp;输出&nbsp;0.3</span><br><span data-darkreader-inline-color="">new</span>&nbsp;Decimal(<span data-darkreader-inline-color="">0.1</span>).sub(<span data-darkreader-inline-color="">0.2</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;减法</span><br><span data-darkreader-inline-color="">new</span>&nbsp;Decimal(<span data-darkreader-inline-color="">0.1</span>).mul(<span data-darkreader-inline-color="">0.2</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;乘法</span><br><span data-darkreader-inline-color="">new</span>&nbsp;Decimal(<span data-darkreader-inline-color="">0.1</span>).div(<span data-darkreader-inline-color="">0.2</span>)&nbsp;<span data-darkreader-inline-color="">//&nbsp;除法</span><br>
```

使用 `decimal.js`进行运算，能解决精度丢失的问题~

## 不想手动！想自动！

### 很烦啊！

当我们拥有了`decimal.js`之后，每当我们进行运算的时候，就必须引入它进行使用，每一个页面都得重复这一操作，于是萌生了一个想法——我想自动！不想手动！

### 思路

那要怎么才能自动呢？由于前段时间群里很多人说想学习写 babel 插件，所以刚好，针对这个需求，我可以实现一个 babel 插件，它的功能是：将项目中 `0.1 + 0.2` 这种表达式，转换为 `new Decimal(0.1).add(0.2)`

```
<span data-darkreader-inline-color="">0.1</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">0.2</span><br><span data-darkreader-inline-color="">//&nbsp;转换为</span><br><span data-darkreader-inline-color="">new</span>&nbsp;Decimal(<span data-darkreader-inline-color="">0.1</span>).add(<span data-darkreader-inline-color="">0.2</span>)<br>
```

这样就能一次性把项目中的精度丢失问题解决了~

## 开发 babel 插件

### 前置准备

涉及到三个问题：

-   webpack 和 rollup 如何选择
    
-   rollup 打包环境的搭建
    
-   如何发布到 npm 上
    

这三个问题具体我在上一篇文章【[如何使用Rollup开发一个npm包并发布](http://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247489860&idx=1&sn=bbd1d556051a9157a1a2729e60afac68&chksm=ce460cd5f93185c39f8118658367b473c81aec2b550240b0ecf4621110303908811fa3208b91&scene=21#wechat_redirect)】里有提到过了，在本文我就不过多讲解

### 搭建一个 Rollup 打包环境

新建一个 `babel-plugin-sx-accuracy`文件夹，用来开发 babel 插件

> 名字可以自己取，但是为了规范，最好是 `babel-plugin-` 开头

接着进入 `babel-plugin-sx-accuracy` 文件夹，输入

```
npm&nbsp;init<br>npm&nbsp;i&nbsp;rollup&nbsp;@rollup/plugin-babel&nbsp;-D<br>npm&nbsp;i&nbsp;decimal.js&nbsp;-S<br>
```

`package.json` 中的内容为：

```
&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"babel-plugin-sx-accuracy"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.20"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"module"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"rollup&nbsp;-c"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"files"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dist/*"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"src/*"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"devDependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@rollup/plugin-babel"</span>:&nbsp;<span data-darkreader-inline-color="">"^6.0.3"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"rollup"</span>:&nbsp;<span data-darkreader-inline-color="">"^3.26.2"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"decimal.js"</span>:&nbsp;<span data-darkreader-inline-color="">"^10.4.3"</span><br>&nbsp;&nbsp;}<br>}<br>
```

然后在根目录下新建 `rollup.config.js` 文件，用来配置 rollup 打包

```
<span data-darkreader-inline-color="">//&nbsp;rollup.config.js</span><br><span data-darkreader-inline-color="">import</span>&nbsp;babel&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-babel'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">input</span>:&nbsp;<span data-darkreader-inline-color="">'src/index.js'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">output</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">file</span>:&nbsp;<span data-darkreader-inline-color="">'dist/index.js'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">format</span>:&nbsp;<span data-darkreader-inline-color="">'cjs'</span>,<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">plugins</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;babel({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">babelHelpers</span>:&nbsp;<span data-darkreader-inline-color="">'bundled'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;],<br>};<br>
```

最后新建 `src/index.js`，我们的插件逻辑就写在这里

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 什么是抽象语法树（AST）？

我们可以借助一个网站，来一睹抽象语法树的真容~ https://astexplorer.net/

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这里我们可以记住几个点

-   每一个代码片段都有属于自己的节点类型
    
-   代码最外层的节点类型为 `Program`
    
-   像 `0.1+0.2` 这种表达式，节点类型为 `BinaryExpression`
    
-   `BinaryExpression`节点里会有几个重要的东西
    

-   operaor：运算符号
    
-   left：左边的数字
    
-   right：右边的数字
    

其实抽象语法树的节点类型有很多种，我列举一些：

-   标识符（Identifier）：表示变量、函数名等标识符的节点
    
-   字面量（Literal）：表示字面量值，如字符串、数字、布尔值等
    
-   表达式语句（ExpressionStatement）：表示包含表达式的语句节点
    
-   赋值表达式（AssignmentExpression）：表示赋值操作的表达式节点，如 `x = 5`
    
-   二元表达式（BinaryExpression）：表示包含二元操作符的表达式节点，如 `x + y`
    
-   一元表达式（UnaryExpression）：表示包含一元操作符的表达式节点，如 `-x`
    
-   函数声明（FunctionDeclaration）：表示函数声明的节点，包括函数名、参数和函数体
    
-   变量声明（VariableDeclaration）：表示变量声明的节点，包含变量名和可选的初始值
    
-   条件语句（IfStatement）：表示 If 条件语句的节点，包括条件表达式、if 分支和可选的 else 分支
    
-   循环语句（WhileStatement、ForStatement）：表示循环语句的节点，分别代表 While 循环和 For 循环
    
-   对象字面量（ObjectLiteral）：表示对象字面量的节点，包含对象属性和属性值
    
-   数组字面量（ArrayLiteral）：表示数组字面量的节点，包含数组元素
    
-   函数调用（CallExpression）：表示函数调用的节点，包含调用的函数名和参数列表
    
-   返回语句（ReturnStatement）：表示返回语句的节点，包含返回的表达式
    

当然大家现阶段不需要去记，大家只需要记得这两个类型就行了：

-   代码最外层的节点类型为 `Program`
    
-   像 `0.1+0.2` 这种表达式，节点类型为 `BinaryExpression`
    

其实，我们平时在 webpack 开发时会接触到一系列的插件，他们的功能比如有

-   去除 console.log
    
-   压缩代码
    
-   去除注释
    

其实他们的原理整体上都是一致的，分为三步：

-   第一步：将代码转换成抽象语法树
    
-   第二步：使用 babel 为我们提供的方法，对语法树进行增删改查
    
-   第三步：将处理后的语法树重新转换成代码
    

而我们将要开发的插件，也是用到这个过程，但是第一步和第三步我们不需要管，我们只需要完成第二步中的增删改查操作即可~

> 注意点：在第二步中，babel 会对抽象语法树进行深度遍历，遍历到目标节点后，又会重新回到上层节点去重新遍历下一个目标节点，所以一个节点会被遍历两次，一来一回 进去是 `enter` 回去是 `exit`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 插件基本代码结构

> 下文使用 `AST` 来表达抽象语法树

```
<span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>{&nbsp;template:&nbsp;template,&nbsp;types:&nbsp;t&nbsp;}</span>)&nbsp;</span>{<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">visitor</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Program</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">exit</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">BinaryExpression</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">exit</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

开发一个 babel 插件，文件必须默认返回一个函数，接收一个对象参数，里面有个属性我们需要用到

-   **template：** 是`@babel/template`的一个方法，他能使用模板的方式生成AST节点
    

函数内部的东西，我们也介绍下

-   **vistor：** 你可以理解为修改AST节点的`入口`
    
-   **Program、BinaryExpression：** 你需要修改的AST节点类型
    
-   **exit：** 就是刚刚说的 `一来一回` 中的，`回`
    
-   **path：** 就是被遍历到的AST节点对象
    

### 插件完全实现

```
<span data-darkreader-inline-color="">//&nbsp;定义构造函数的名称常量</span><br><span data-darkreader-inline-color="">const</span>&nbsp;DECIMAL_FUN_NAME&nbsp;=&nbsp;<span data-darkreader-inline-color="">'Decimal'</span><br><span data-darkreader-inline-color="">//&nbsp;运算符号映射&nbsp;decimal.js&nbsp;的四个方法</span><br><span data-darkreader-inline-color="">const</span>&nbsp;OPERATIONS_MAP&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'+'</span>:&nbsp;<span data-darkreader-inline-color="">'add'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'-'</span>:&nbsp;<span data-darkreader-inline-color="">'sub'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'*'</span>:&nbsp;<span data-darkreader-inline-color="">'mul'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'/'</span>:&nbsp;<span data-darkreader-inline-color="">'div'</span><br>}<br><span data-darkreader-inline-color="">//&nbsp;运算符号数组</span><br><span data-darkreader-inline-color="">const</span>&nbsp;OPERATIONS&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>.keys(OPERATIONS_MAP)<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>{&nbsp;template:&nbsp;template&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;require&nbsp;decimal.js&nbsp;的节点模板</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;requireDecimalTemp&nbsp;=&nbsp;template(<span data-darkreader-inline-color="">`const&nbsp;<span data-darkreader-inline-color="">${DECIMAL_FUN_NAME}</span>=require('decimal.js')`</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将运算表达式转换为decimal函数的节点模板</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;operationTemp&nbsp;=&nbsp;template(<span data-darkreader-inline-color="">`new&nbsp;<span data-darkreader-inline-color="">${DECIMAL_FUN_NAME}</span>(LEFT).OPERATION(RIGHT).toNumber()`</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">visitor</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Program</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">exit</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用方法，往子节点body</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;中插入&nbsp;const&nbsp;Decimal&nbsp;=&nbsp;require('decimal.js')</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;表达式</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path.unshiftContainer(<span data-darkreader-inline-color="">"body"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requireDecimalTemp())<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">BinaryExpression</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">exit</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>path</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;operator&nbsp;=&nbsp;path.node.operator;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(OPERATIONS.includes(operator))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用方法替换节点</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path.replaceWith(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;传入&nbsp;operator&nbsp;left&nbsp;right</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;operationTemp({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">LEFT</span>:&nbsp;path.node.left,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">RIGHT</span>:&nbsp;path.node.right,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">OPERATION</span>:&nbsp;OPERATIONS_MAP[operator]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

### 打包 & 发布 NPM

当开发完成后，我们先 `npm run build`进行打包

然后运行 `npm publish` 发布到 NPM 上

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 项目使用

首先安装 `babel-plugin-sx-accuracy`

```
npm&nbsp;i&nbsp;babel-plugin-sx-accuracy<br>
```

只需要在项目中的 `.babelrc` 或者 `babel.config.js` 中加入 `babel-plugin-sx-accuracy`即可

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"presets"</span>:&nbsp;[<span data-darkreader-inline-color="">"@babel/preset-env"</span>],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugins"</span>:&nbsp;[<span data-darkreader-inline-color="">"babel-plugin-sx-accuracy"</span>]<br>}<br>
```

我们来试试，一开始代码是

```
<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">0.1</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">0.2</span>)<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">0.3</span>&nbsp;-&nbsp;<span data-darkreader-inline-color="">0.1</span>)<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">0.2</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">0.1</span>)<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">0.3</span>&nbsp;/&nbsp;<span data-darkreader-inline-color="">0.1</span>)<br>
```

打包后我们看看产物，并且输出的也都是没有精度丢失的结果！！！

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