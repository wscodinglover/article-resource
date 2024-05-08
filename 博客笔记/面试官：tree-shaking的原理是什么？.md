> 作者：han\_  
> 
> https://juejin.cn/post/7265125368553685050

## 前言

在前端面试的过程中，`前端工程化`一直是考察面试者能力的一个重点，而在我们常用的项目打包工具中，无论是`webpack`还是`rollup`，都具备一项很强大的能力——`tree-shaking`，所以面试官也常常会问到`tree-shaking`的原理是什么，这时我们该如何回答呢？其实核心原理就是`AST`。

在前端开发中，其实`AST`的应用有很多，比如我们前端项目的打包工具`webpack`、代码检查工具`Eslint`，代码转换工具`babel`都依赖了`AST`的语法分析和转换能力。

## AST简单介绍

`AST`是`Abstract Syntax Tree`的缩写，这玩意儿的全称叫`抽象语法树`，它可以用来描述我们代码的`语法结构`。

举个例子：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;ast.js<br><span data-darkreader-inline-color="">let</span>&nbsp;a&nbsp;=&nbsp;1;<br><span>function</span>&nbsp;<span><span data-darkreader-inline-color="">add</span></span>()&nbsp;{}<br></code>
```

我这里创建了一个文件`ast.js`，可以把整个文件理解为一个`File`节点，存放`程序体`，而里面就是我们javascript的语法节点了，我们javascript语法节点的根节点是`Program`，而我们在里面定了了两个节点，第一个节点是`let a = 1`，解析为ast是`VariableDeclaration`，也就是**变量声明节点**，第二个节点是`function add() {}`，解析为ast是`FunctionDeclaration`，也就是**函数声明节点**。

这里给大家推荐一个平台：`AST Explorer`，能很清晰看到JavaScript代码转化为AST后的结果，看下下面这张图就一目了然了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## AST的作用

那拿到了代码的`ast信息`我们能做什么呢？

1.  **代码分析与转换**。`AST`可以将我们的代码解析成一棵`ast树`，我们自然可以将这棵树进行`处理和转换`，这个最经典的应用莫过于`babel`了，将我们的高级语法`ES6`转换为`ES5`后，然后再把`ast树`转换成代码输出。除此之外，webpack的处理ES6的`import和export`也是依赖了ast的能力，以及我们的`jsx`的语法转换等。
    
2.  **语法检查和错误提示**。我们把语法解析成`ast树`之后，自然就可以按照一定的语法规则去检查它的语法是否正确，一旦错误就可以抛出错误，提醒开发者去修正。比如我们使用的`vscode`就是利用AST 提供实时的语法检查和错误提示。而在前端项目中，应用的最广的语法检查工具就是`ESlint`了，基本就是前端项目必备。
    
3.  **静态类型检查**。这个其实跟第二点有点像，不过第二点是侧重于`语法检查`，而这个是针对`类型检查`的，比如我们的`Typescript`会利用ast进行类型检查和推断。
    
4.  **代码重构**。基于AST树，我们可以对代码进行`自动重构`。比如提取函数、变量重命名、语法升级、函数移动等。
    

其实在实际开发中，我们也可以利用做很多的事情，比如**实现自动埋点**、**自动国际化**、**依赖分析和治理**等等，有兴趣的小伙伴可以自行去探索。

而今天我主要介绍的就是`AST`的一大应用，就是我们webpack强大的`Tree-Shaking`能力。

## Tree-shaking

`Tree-shaking`翻译过来的意思就是`摇树`。这棵树可以把它比喻为现实中的树，可以这样理解，`摇树`就是把`发黄、没有作用还要汲取养分的叶子给给摇掉`。把这个搬到javascript程序里面来就是，`移除Javascript上下文中的未引用代码（dead-code）`。

废话不多说，直接看例子：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;test.js<br><span>function</span>&nbsp;add(a,&nbsp;b)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;+&nbsp;b;<br>}<br><span>function</span>&nbsp;multiple(a,&nbsp;b)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;*&nbsp;b;<br>}<br><span data-darkreader-inline-color="">let</span>&nbsp;firstNum&nbsp;=&nbsp;3,&nbsp;secondNum&nbsp;=&nbsp;4;<br>add(firstNum,&nbsp;secondNum);<br></code>
```

在这段代码中，我们定义了两个函数`add`和`multiple`，两个变量`firstNum`和`secondNum`，然后调用了`add`方法并将`firstNum`和`secondNum`作为参数传入。

很明显，`multiple`方法是没有被调用到的，打包的时候其实是可以被删除掉的，以减少我们打包后的代码体积。

那么，如何删除`multiple`呢？这时候就该我们的`ast`就登场了！要实现这个功能，分三步走。

## 第一步：解析源代码生成ast

先看如下代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;acorn&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'acorn'</span>);<br>const&nbsp;fs&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'fs'</span>);<br>const&nbsp;path&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'path'</span>);<br>const&nbsp;buffer&nbsp;=&nbsp;fs.readFileSync(path.resolve(process.cwd(),&nbsp;<span data-darkreader-inline-color="">'test.js'</span>)).toString();<br>const&nbsp;body&nbsp;=&nbsp;acorn.parse(buffer,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaVersion:&nbsp;<span data-darkreader-inline-color="">'latest'</span>,<br>}).body;<br></code>
```

这里我们选中`acorn`（babel其实是基于acorn实现解析器的）来对我们的代码进行解析，运行前需要先执行`npm install acorn`安装下`acorn`，然后读取文件内容传入`acorn`，得到`ast`。

我们可以用`AST Explorer`，来看一眼我们现在的`AST`。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 第二步：遍历ast，记录相关信息

一、先明确下我们要记录哪些信息？

我们的主要目的是收集到未引用的代码，然后将它们删除掉，所以我们最容易想到的需要收集的信息有两个：

1.  收集所有的`函数或变量类型节点`
    
2.  收集所有使用过的`函数或变量类型节点`
    

那我们先试试看：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;acorn&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'acorn'</span>);<br>const&nbsp;fs&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'fs'</span>);<br>const&nbsp;path&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'path'</span>);<br>const&nbsp;buffer&nbsp;=&nbsp;fs.readFileSync(path.resolve(process.cwd(),&nbsp;<span data-darkreader-inline-color="">'./src/index.js'</span>)).toString();<br>const&nbsp;body&nbsp;=&nbsp;acorn.parse(buffer,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaVersion:&nbsp;<span data-darkreader-inline-color="">'latest'</span>,<br>}).body;<br>//&nbsp;引用一个&nbsp;Generator&nbsp;类，用来生成&nbsp;ast&nbsp;对应的代码<br>const&nbsp;Generator&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'./generator'</span>);<br>//&nbsp;创建&nbsp;Generator&nbsp;实例<br>const&nbsp;gen&nbsp;=&nbsp;new&nbsp;Generator();<br>//&nbsp;定义变量decls&nbsp;&nbsp;存储所有的函数或变量类型节点&nbsp;Map类型<br>const&nbsp;decls&nbsp;=&nbsp;new&nbsp;Map();<br>//&nbsp;定义变量calledDecls&nbsp;存储被用到过的函数或变量类型节点&nbsp;数组类型<br>const&nbsp;calledDecls&nbsp;=&nbsp;[];<br></code>
```

这里我引入了一个`Generator`，其作用就是`将每个ast节点转化成对应的代码`，来看下`Generator`的实现:

1.  先定义好`Generator`类，将其导出。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;generator.js<br>class&nbsp;Generator&nbsp;{<br>}<br><br>module.exports&nbsp;=&nbsp;Generator;<br></code>
```

2.  定义`run`方法以及`visitNode`和`visitNodes`方法。
    

-   `run`：调用`visitNodes`方法生成代码。
    
-   `visitNode`：根据`节点类型`，调用对应的方法进行对应处理。
    
-   `visitNodes`：就是处理数组类型的节点用的，内部循环调用了`visitNode`方法。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;generator.js<br>class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;run(body)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNodes(body);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;visitNodes(nodes)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;node&nbsp;of&nbsp;nodes)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;visitNode(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch&nbsp;(node.type)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'VariableDeclaration'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitVariableDeclaration(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'VariableDeclarator'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitVariableDeclarator(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'Literal'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitLiteral(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'Identifier'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitIdentifier(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'BinaryExpression'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitBinaryExpression(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'FunctionDeclaration'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitFunctionDeclaration(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'BlockStatement'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitBlockStatement(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'CallExpression'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitCallExpression(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'ReturnStatement'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitReturnStatement(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>case</span>&nbsp;<span data-darkreader-inline-color="">'ExpressionStatement'</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitExpressionStatement(node);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">break</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

3.  再分别介绍下每个处理节点类型的方法实现
    

### 实现visitVariableDeclaration方法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>&nbsp;&nbsp;&nbsp;&nbsp;visitVariableDeclaration(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;node.kind&nbsp;+&nbsp;<span data-darkreader-inline-color="">'&nbsp;'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNodes(node.declarations);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>}<br></code>
```

`visitVariableDeclaration`就是处理`let firstNum = 3`这种变量声明的节点，`node.kind`就是`let/const/var`，然后变量可以一次声明多个，比如我们`test.js`里面写的`let firstNum = 3, secondNum = 4;`，这样`node.declarations`就有两个节点了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>&nbsp;&nbsp;&nbsp;&nbsp;visitVariableDeclaration(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;node.kind&nbsp;+&nbsp;<span data-darkreader-inline-color="">'&nbsp;'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNodes(node.declarations);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>}<br></code>
```

### 实现visitVariableDeclarator方法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>&nbsp;&nbsp;&nbsp;&nbsp;visitVariableDeclarator(node,&nbsp;kind)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;kind&nbsp;?&nbsp;(kind&nbsp;+&nbsp;<span data-darkreader-inline-color="">'&nbsp;'</span>)&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">'='</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.init);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">';'</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略xxx<br>}<br></code>
```

`visitVariableDeclarator`就是上面`VariableDeclaration`的子节点，可以接收到父节点的`kind`，比如`let firstNum = 3`它的`id`就是`变量名firstNum`，init就是`初始化的值3`。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 实现visitLiteral方法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visitLiteral(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;node.raw;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

`Literal`即`字面量`，比如`let firstNum = 3`里面的3就是一个`字符串字面量`，除此之外，还有`数字字面量`，`布尔字面量`等等，这个直接返回它的`raw`属性就行啦。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 实现visitIdentifier方法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visitIdentifier(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;node.name;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

`Identifier`即`标识符`，比如`变量名、属性名、参数名`等都是，比如`let firstNum = 3`的`firstNum`,直接返回它的`name`属性即可。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 实现visitBinaryExpression方法

`BinaryExpression`即`二进制表达式`，比如我们的加减乘除运算都是，比如`a + b`的ast如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 我们需要拿到它的左右节点和中间的标识符拼接起来。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visitBinaryExpression(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.left);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;node.operator;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.right);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

### 实现visitFunctionDeclaration方法

`FunctionDeclaration`即为`函数声明节点`，稍微复杂一些，因为我们要拼接一个函数出来。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>function</span>&nbsp;add(a,&nbsp;b)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;+&nbsp;b;<br>}<br></code>
```

比如我们这个`add`函数转成ast如下图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visitFunctionDeclaration(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">'function&nbsp;'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">'('</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(<span data-darkreader-inline-color="">let</span>&nbsp;paramIndex&nbsp;=&nbsp;0;&nbsp;paramIndex&nbsp;&lt;&nbsp;node.params.length;&nbsp;paramIndex++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.params[paramIndex]);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;((node.params[paramIndex]&nbsp;===&nbsp;undefined)&nbsp;?&nbsp;<span data-darkreader-inline-color="">''</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">','</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;=&nbsp;str.slice(0,&nbsp;str.length&nbsp;-&nbsp;1);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">'){\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(node.body);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">'}'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

先拿到`node.id`，即`add`，然后处理函数的参数params，由于存在多个params需要循环处理，用逗号拼接，然后再调用visitNode方法拼接`node.body`即`函数体`。

### 实现visitBlockStatement方法

`BlockStatement`即`块语句`，就是我们的大括号包裹的部分。比如`add`函数里面的`块语句`的ast如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;visitBlockStatement(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNodes(node.body);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

只需要用`visitNodes`函数拼接它的`node.body`即可。

### 实现visitCallExpression方法

`CallExpression`也就是`函数调用`，比如`add(firstNum, secondNum)`，它比较重要的属性有：

-   `callee`：也就是 `add`
    
-   `arguments`：也就是调用的参数 `firstNum` 和 `secondNum` 其ast如下：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;visitCallExpression(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitIdentifier(node.callee);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">'('</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;arg&nbsp;of&nbsp;node.arguments)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;this.visitNode(arg)&nbsp;+&nbsp;<span data-darkreader-inline-color="">','</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;=&nbsp;str.slice(0,&nbsp;-1);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;+=&nbsp;<span data-darkreader-inline-color="">');'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

只需要将它的`callee`以及参数`arguments`处理好用小括号`()`拼接起来即可。

### 实现visitReturnStatement方法

`ReturnStatement`即`返回语法`，比如`return a + b`这种，它的ast如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 它的实现也比较简单，直接拼接`node.argument`就好啦：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;visitReturnStatement(node)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;str&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str&nbsp;=&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'&nbsp;&nbsp;return&nbsp;'</span>&nbsp;+&nbsp;this.visitNode(node.argument);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;str&nbsp;+&nbsp;<span data-darkreader-inline-color="">'\n'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

### 实现visitExpressionStatement方法

`ExpressionStatement`即`表达式语句`，它的特点是`执行完之后有返回值`，比如`add(firstNum, secondNum);`，它是在`CallExpression`外面包裹了一层`ExpressionStatement`，执行完之后返回函数的调用结果，其ast如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

所以实现也比较简单，我们只需要处理它的`expression`返回就好了。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">class&nbsp;Generator&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;this.visitNode(node.expression);<br>}<br></code>
```

这样，我们就完整实现`Generator`了，接下来就可以开始遍历ast了。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;tree-shaking.js<br>const&nbsp;acorn&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'acorn'</span>);<br>const&nbsp;fs&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'fs'</span>);<br>const&nbsp;path&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'path'</span>);<br>const&nbsp;buffer&nbsp;=&nbsp;fs.readFileSync(path.resolve(process.cwd(),&nbsp;<span data-darkreader-inline-color="">'./src/index.js'</span>)).toString();<br>const&nbsp;body&nbsp;=&nbsp;acorn.parse(buffer,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaVersion:&nbsp;<span data-darkreader-inline-color="">'latest'</span>,<br>}).body;<br>//&nbsp;引用一个&nbsp;Generator&nbsp;类，用来生成&nbsp;ast&nbsp;对应的代码<br>const&nbsp;Generator&nbsp;=&nbsp;require(<span data-darkreader-inline-color="">'./generator'</span>);<br>//&nbsp;创建&nbsp;Generator&nbsp;实例<br>const&nbsp;gen&nbsp;=&nbsp;new&nbsp;Generator();<br>//&nbsp;定义变量decls&nbsp;&nbsp;存储所有的函数或变量类型节点&nbsp;Map类型<br>const&nbsp;decls&nbsp;=&nbsp;new&nbsp;Map();<br>//&nbsp;定义变量calledDecls&nbsp;存储被用到过的函数或变量类型节点&nbsp;数组类型<br>const&nbsp;calledDecls&nbsp;=&nbsp;[];<br>//&nbsp;开始遍历&nbsp;ast<br>body.forEach(node&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'FunctionDeclaration'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;code&nbsp;=&nbsp;gen.run([node]);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decls.set(gen.visitNode(node.id),&nbsp;code);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'VariableDeclaration'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;decl&nbsp;of&nbsp;node.declarations)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decls.set(gen.visitNode(decl.id),&nbsp;gen.visitVariableDeclarator(decl,&nbsp;node.kind));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'ExpressionStatement'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.expression.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'CallExpression'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;callNode&nbsp;=&nbsp;node.expression;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(gen.visitIdentifier(callNode.callee));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;arg&nbsp;of&nbsp;callNode.arguments)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(arg.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Identifier'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(arg.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Identifier'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(node.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>})<br>console.log(<span data-darkreader-inline-color="">'decls'</span>,&nbsp;decls);<br>console.log(<span data-darkreader-inline-color="">'calledDecls'</span>,&nbsp;decls);<br></code>
```

使用`node tree-shaking.js`运行一下，结果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

很明显，我们`decls`总共有四个节点`函数或变量类型节点`，而被调用的`calledDecls`只有三个，很明显`multiple`函数没被调用，可以被`tree-shaking`掉，拿到这些信息之后，接下来我们开始生成`tree-shaking`后的代码。

## 第三步：根据第二步得到的信息，生成新代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;...省略<br>code&nbsp;=&nbsp;calledDecls.map(c&nbsp;=&gt;&nbsp;decls.get(c)).join(<span data-darkreader-inline-color="">''</span>);<br>console.log(code);<br></code>
```

我们直接遍历`calledDecls`生成新的源代码，打印结果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 咦！跟我们最开始的文件内容一比，发现`multiple`虽然被移除掉了，但我们的函数调用语句`add(firstNum, secondNum);`却丢了，那我们简单处理下。

我们声明一个`code`数组：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;...省略<br>const&nbsp;calledDecls&nbsp;=&nbsp;[];<br>//&nbsp;保存代码信息<br>const&nbsp;code&nbsp;=&nbsp;[];<br>//&nbsp;省略<br></code>
```

然后把不是`FunctionDeclaration`和`VariableDeclaration`的信息都存储一下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;tree-shaking.js<br>body.forEach(node&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'FunctionDeclaration'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;code&nbsp;=&nbsp;gen.run([node]);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decls.set(gen.visitNode(node.id),&nbsp;code);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'VariableDeclaration'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;decl&nbsp;of&nbsp;node.declarations)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decls.set(gen.visitNode(decl.id),&nbsp;gen.visitVariableDeclarator(decl,&nbsp;node.kind));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'ExpressionStatement'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.expression.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'CallExpression'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;callNode&nbsp;=&nbsp;node.expression;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(gen.visitIdentifier(callNode.callee));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(const&nbsp;arg&nbsp;of&nbsp;callNode.arguments)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(arg.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Identifier'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(arg.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(node.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Identifier'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;calledDecls.push(node.name);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;存储代码信息<br>&nbsp;&nbsp;&nbsp;&nbsp;code.push(gen.run([node]));<br>})<br></code>
```

最后输出的时候，把code里面的信息也带上：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;tree-shaking.js<br>code&nbsp;=&nbsp;calledDecls.map(c&nbsp;=&gt;&nbsp;decls.get(c)).concat(code).join(<span data-darkreader-inline-color="">''</span>);<br>console.log(code);<br></code>
```

然后运行一下，打印结果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这样我们一个简易版本的`tree-shaking`就完成了，当然，webpack的`tree-shaking`的能力远比这个强大的多，我们只是写了个最简单版本，实际项目要比这复杂得多：

-   处理文件依赖`import/export`
    
-   作用域`scope`的处理
    
-   `递归`tree-shaking，因为可能去除了某些代码后，又会产生新的未被引用的代码，所以需要递归处理
    
-   等等..
    

## 小结

本文通过`ast`的语法分析能力，分析JavaScript代码中`未被引用的函数或变量`，进而实现了一个最简单版本的`tree-shaking`，希望大家看完都能有所收获哦~