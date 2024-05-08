![Image](https://mmbiz.qpic.cn/mmbiz_png/zwgqxRDyClgia9QiaT0ticJibKywPLGWYozhbP2fy1uaVL87uPGjQiao9egybc3tRQebU4qTF9rhBOWevicYiaoic0SI4Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Vue3 发布至今，周边的生态、技术方案已足够成熟，个人认为新项目是时候切换到 Vite + Vue3 了。今天就给大家操作一下这种技术方案实现前端工程化。

## 1\. 初始化项目

**通过官方脚手架初始化项目**

-   第一种方式，这是使用vite命令创建，这种方式除了可以创建vue项目，还可以创建其他类型的项目，比如react项目
    
    ```
    npm&nbsp;init&nbsp;vite@latest<br>
    ```
    
-   第二种方式，这种方式是vite专门为vue做的配置，这种方式创建的项目在创建时会提示是否需要安装各种插件配置
    
    ```
    npm&nbsp;init&nbsp;vue@latest<br>
    ```
    
-   第三种方式，直接快速通过参数生成
    
    ```
    npm&nbsp;init&nbsp;vite@latest&nbsp;project-engineer&nbsp;--template&nbsp;vue-ts<br>
    ```
    

**询问的相关问题：**

```
Project name:&nbsp;…&nbsp;//&nbsp;项目名称，默认值：vue-project，可输入想要的项目名称，此处不建议中文。<br>Add TypeScript? … No / Yes //&nbsp;是否加入TypeScript组件？<br>Add JSX Support? … No / Yes //&nbsp;是否加入JSX支持？<br>Add&nbsp;Vue&nbsp;Router&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;Single Page Application development? … No / Yes //&nbsp;是否为单页应用程序开发添加Vue Router路由管理组件？<br>Add&nbsp;Pinia&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;state management? … No / Yes //&nbsp;是否添加Pinia组件来进行状态管理？<br>Add&nbsp;Vitest&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;Unit Testing? … No / Yes //&nbsp;是否添加Vitest来进行单元测试？<br>Add&nbsp;an&nbsp;End-to-End&nbsp;Testing&nbsp;Solution?&nbsp;»&nbsp;No&nbsp;//&nbsp;是否添加一个端到端测试解决方案?<br>Add&nbsp;ESLint&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;code quality? … No / Yes //&nbsp;是否添加ESLint来进行代码质量检查？<br>Add&nbsp;Prettier&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;code&nbsp;formatting?&nbsp;…&nbsp;No&nbsp;/&nbsp;Yes&nbsp;//&nbsp;是否添加Prettier代码格式化?<br>
```

执行结束后进入项目目录，安装依赖后执行 `npm run dev` 即可秒开项目

**命令行演示操作**![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**生成的项目目录如下：**![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**但此项目目录不足以支持项目的复杂度，因此对目录结构进行扩展如下：**![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 2\. 定制化 plugins

在初始化的项目中 `vite.config.js` 只是引入了提供 Vue 3 单文件组件支持的 plugin，大家可以根据项目需要进行个性化配置，详见 awesome-vite。

### 2.1 @vitejs/plugin-vue-jsx

提供 Vue 3 JSX & TSX 支持（通过 专用的 Babel 转换插件）。

安装

```
npm&nbsp;i&nbsp;-D&nbsp;@vitejs/plugin-vue-jsx<br>
```

配置 `vite.config.ts`

```
import&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vite'</span><br>import&nbsp;vueJsx&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@vitejs/plugin-vue-jsx'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;vueJsx({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;options&nbsp;参数将传给&nbsp;@vue/babel-plugin-jsx<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;],<br>})<br>
```

### 2.2 rollup-plugin-visualizer

可视化并分析构建包，查看哪些模块占用空间大小，以此来优化构建包的大小。这是一个 Rollup 的 plugin，推荐这个也是 vite 的一个特性，vite 默认已经支持大部分的 Rollup 的 plugin，从这点来看，vite 的 plugin 库更加丰富了。

安装

```
npm&nbsp;i&nbsp;-D&nbsp;rollup-plugin-visualizer<br>
```

配置 `vite.config.ts`

```
import&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vite'</span><br>import&nbsp;visualizer&nbsp;from&nbsp;<span data-darkreader-inline-color="">'rollup-plugin-visualizer'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[visualizer()],<br>})<br>
```

### 2.3 vite-plugin-element-plus

为 ElementPlus 提供按需引入能力。全量导入 ElementPlus 导致构建包的体积过大，按需引入有效的减小包的体积。此包的原理是动态将每个按需引入的组件 css 写入。

```
import&nbsp;{&nbsp;ElButton&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'element-plus'</span><br>import&nbsp;<span data-darkreader-inline-color="">'element-plus/es/components/button/style/css'</span><br>
```

安装

```
npm&nbsp;i&nbsp;-D&nbsp;vite-plugin-element-plus<br>
```

配置 `vite.config.ts`

```
import&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vite'</span><br>import&nbsp;importElementPlus&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vite-plugin-element-plus'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;@ts-ignore&nbsp;此处暂时需要使用&nbsp;ignore<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;原因是包内部的&nbsp;options&nbsp;未做非必填兼容<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;目前已有人提了&nbsp;PR，未合并，使用可以观望下<br>&nbsp;&nbsp;&nbsp;&nbsp;importElementPlus(),<br>&nbsp;&nbsp;],<br>})<br>
```

## 3\. 基于 husky + lint-staged 项目规范化

-   Husky 支持所有 Git 钩子，当您提交或推送时，您可以使用 husky 来检查**您的提交消息**、**运行测试**、**检查代码**等。安装后，它会自动在仓库中的 `.git/` 目录下增加相应的钩子，比如 `pre-commit` 钩子就会在你执行 `git commit` 的触发。那么我们可以在 `pre-commit` 中实现一些比如 `lint` 检查、单元测试、代码美化等操作。当然，`pre-commit` 阶段执行的命令当然要保证其速度不要太慢，每次 commit 都等很久也不是什么好的体验。
    
-   `lint-staged`，一个过滤出 Git 代码暂存区文件（被 git add 的文件）的工具。这个很实用，因为我们如果对整个项目的代码做一个检查，可能耗时很长，如果是老项目，要对之前的代码做一个代码规范检查并修改的话，这可能就麻烦了呀，可能导致项目改动很大。所以 `lint-staged`，对团队项目和开源项目来说，是一个很好的工具，它是对个人要提交的代码的一个规范和约束。
    

### 3.1 Eslint

**`eslint` 用于配置代码风格、质量的校验，`prettier`用于代码格式的校验，`lint-staged` 过滤文件。**

本项目已经默认安装 eslint、prettier，如果需要单独安装，执行以下命令：

```
<span data-darkreader-inline-color="">#&nbsp;安装&nbsp;eslint</span><br>npm&nbsp;i&nbsp;eslint&nbsp;-D<br><span data-darkreader-inline-color="">#&nbsp;利用&nbsp;eslint&nbsp;命令行工具生成基本配置</span><br>npx&nbsp;eslint&nbsp;--init<br>
```

生成的 .eslintrc.cjs 文件，如下：

```
/*&nbsp;eslint-env&nbsp;node&nbsp;*/<br>require(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>)<br><br>module.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;root:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'extends'</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:vue/vue3-essential'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'eslint:recommended'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'@vue/eslint-config-typescript'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'@vue/eslint-config-prettier/skip-formatting'</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;parserOptions:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaVersion:&nbsp;<span data-darkreader-inline-color="">'latest'</span><br>&nbsp;&nbsp;}<br>}<br>
```

做一下配置补充

```
/*&nbsp;eslint-env&nbsp;node&nbsp;*/<br>require(<span data-darkreader-inline-color="">'@rushstack/eslint-patch/modern-module-resolution'</span>)<br><br>module.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;root:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;env:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;browser:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;node:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;es6:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">'extends'</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'plugin:vue/vue3-essential'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'eslint:recommended'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'@vue/eslint-config-typescript'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'@vue/eslint-config-prettier/skip-formatting'</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;parserOptions:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaVersion:&nbsp;<span data-darkreader-inline-color="">'latest'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;sourceType:&nbsp;<span data-darkreader-inline-color="">'module'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;ecmaFeatures:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsx:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;plugins:&nbsp;[<span data-darkreader-inline-color="">'@typescript-eslint'</span>],<br>&nbsp;&nbsp;rules:&nbsp;{}<br>}<br>
```

> **这里为什么生成的配置文件名称是.eslintrc.cjs而不是.eslintrc.js？**
> 
> 因为我们将项目定义为 ESM，`eslint --init` 会自动识别 type，并生成兼容的配置文件名称，如果我们改回 `.js` 结尾，再运行 `eslint` 将会报错。出现这个问题是 `eslint` 内部使用了 `require()` 语法读取配置。
> 
> 同样，这个问题也适用于其他功能的配置，比如后面会讲到的 Prettier、Commitlin t等，配置文件都不能以 xx.js 结尾，而要改为当前库支持的其他配置文件格式，如：.xxrc、.xxrc.json、.xxrc.yml。

验证配置是否生效，在任意组件脚本中定义如下代码：

```
const&nbsp;calc&nbsp;=&nbsp;(a:number,&nbsp;b:number)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;+b<br>}<br><br>//&nbsp;console.log(calc(10,&nbsp;20))<br>
```

执行 package.json 中的 lint 命令（没有的话需要自行配置，package.json指令配置如下）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

注释上面打印信息的情况下，执行 `npm run lint` 指令，将会出现 1 条错误提示信息

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

注释放开后，变量被调用，再次执行指令，则校验通过

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3.2 Prettier

Prettier 如果需要单独安装，执行以下命令：

```
<span data-darkreader-inline-color="">#&nbsp;安装&nbsp;prettier</span><br>npm&nbsp;i&nbsp;prettier&nbsp;-D<br>
```

.prettierrc.json 默认配置如下（没有这个文件的需要自行创建）

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$schema</span>"</span>:&nbsp;<span data-darkreader-inline-color="">"https://json.schemastore.org/prettierrc"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"semi"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"tabWidth"</span>:&nbsp;2,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"singleQuote"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"printWidth"</span>:&nbsp;100,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"trailingComma"</span>:&nbsp;<span data-darkreader-inline-color="">"none"</span><br>}<br>
```

-   semi:false 句末是否使用分号（false | true）
    
-   singleQuote:true 是否使用单引号代替双引号（false | true）
    
-   trailingComma:'none' 最后一个对象元素是否加逗号, 'none' 为不加
    
-   tabWidth 设置工具每一个水平缩进的空格数
    
-   printWidth 换行字符串阈值
    
-   bracketSpacing:true 对象，数组是否加空格（false | true）
    
-   jsxBracketSameLine:true jsx > 是否另起一行（false | true）
    
-   arrowParens :’always‘ (x) => {} 是否要有小括号，值为 ’always‘ 则需要
    
-   requirePragma:false 是否需要写文件开头的 @prettier （false | true）
    
-   insertPragma:false 是否需要自动在文件开头插入 @prettier
    

### 3.3 Prettierrc & ESLint 规则冲突的解决

上面讲过 **，`eslint` 用于配置代码风格、质量的校验，`prettier`用于代码格式的校验，`lint-staged` 过滤文件**。

但两者在使用过程中，会因为规则不同，有出现冲突的可能性，所以需要通过插件加强两者的配合：

-   `eslint-plugin-prettier` 一个 ESLint 插件， 由 prettier 生态提供，用于关闭可能与 prettier 冲突的规则
    
-   `eslint-config-prettier` 使用 prettier 代替 eslint 格式化，防止 Prettier 和 ESLint 的自动格式化冲突
    

安装

```
<span data-darkreader-inline-color="">#&nbsp;带&nbsp;lint-staged</span><br>npm&nbsp;i&nbsp;eslint&nbsp;prettier&nbsp;lint-staged&nbsp;eslint-plugin-prettier&nbsp;eslint-config-prettier&nbsp;-D<br><br><span data-darkreader-inline-color="">#&nbsp;不带&nbsp;lint-staged（本文采用方式）</span><br>npm&nbsp;i&nbsp;eslint-config-prettier&nbsp;eslint-plugin-prettier&nbsp;-D<br>
```

.eslintrc.cjs 配置文件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

控制台执行 `npm run lint` 可以做代码校验和格式化了（Vite+Vue3项目搭建时选择了 eslint、prettier 配置的情况下，默认配置已够用，可根据需要做增项）

完成了eslint和prettier的集成配置，无论你使用什么编辑器，有没有安装相关插件，都不会影响代码校验的效果。

### 3.4 Husky

因为一个项目通常是团队合作，我们不能保证每个人在提交代码之前执行一遍 lint 校验， 所以需要 git hooks 来自动化校验的过程，否则禁止提交。

```
<span data-darkreader-inline-color="">#&nbsp;安装&nbsp;husky</span><br>npm&nbsp;i&nbsp;husky&nbsp;-D<br><br><span data-darkreader-inline-color="">#&nbsp;生成 .husky 文件夹（注意：这一步操作之前，一定要执行 git init 初始化当前项目仓库，.husky 文件夹才能创建成功）</span><br>npx&nbsp;husky-init&nbsp;install<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 package.json 中添加 'prepare' 指令

```
<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;省略其它指令<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prepare"</span>:&nbsp;<span data-darkreader-inline-color="">"husky&nbsp;install"</span><br>}<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

`.husky/pre-commit` 文件修改如下

```
<span data-darkreader-inline-color="">#!/usr/bin/env&nbsp;sh</span><br>.&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$(dirname&nbsp;--&nbsp;"$0")</span>/_/husky.sh"</span><br><br>npm&nbsp;run&nbsp;lint<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**测试钩子（git hooks）是否生效**

修改组件代码（变量声明调用和不调用两种情况），执行如下 git 命令提交代码，查看结果

```
git&nbsp;add<br>git&nbsp;commit&nbsp;-m&nbsp;<span data-darkreader-inline-color="">'测试husky'</span><br>
```

**变量声明未调用**

```
const&nbsp;calc&nbsp;=&nbsp;(a:&nbsp;number,&nbsp;b:&nbsp;number):&nbsp;number&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;+&nbsp;b<br>}<br>//&nbsp;console.log(calc(1024,&nbsp;28))<br>
```

执行结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 当 `git commit` 时，它会自动检测到不符合规范的代码，如果无法自主修复就会抛出错误提示。

**变量声明并调用**

```
const&nbsp;calc&nbsp;=&nbsp;(a:&nbsp;number,&nbsp;b:&nbsp;number):&nbsp;number&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a&nbsp;+&nbsp;b<br>}<br>console.log(calc(1024,&nbsp;28))<br>
```

执行结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3.5 Commitlint

为什么需要 Commitlint，除了在后续生成的 changelog 文件和语义发版中需要提取 commit 中的信息外，也利于其他团队开发者分析你提交的代码，所以我们要约定commit的规范。

安装如下两个插件：

-   @commitlint/cli Commitlint 命令行工具
    
-   @commitlint/config-conventional 基于 Angular 的约定规范
    

```
npm&nbsp;i&nbsp;@commitlint/config-conventional&nbsp;@commitlint/cli&nbsp;-D<br>
```

最后将 Commitlint 添加到钩子：

```
npx&nbsp;husky&nbsp;add&nbsp;.husky/commit-msg&nbsp;<span data-darkreader-inline-color="">'npx&nbsp;--no-install&nbsp;commitlint&nbsp;--edit&nbsp;"$1"'</span><br>
```

创建 `.commitlintrc`，并写入配置

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@commitlint/config-conventional"</span><br>&nbsp;&nbsp;]<br>}<br>
```

> 注意，这里配置文件名使用的是.commitlintrc而不是默认的.commitlintrc.js

测试 Commitlint 是否生效，与上面同样的方式提交“符合规范和不符合规范的代码”，查看结果。

**Angular 规范说明：**

-   feat：新功能
    
-   fix：修补 BUG
    
-   docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
    
-   style：不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
    
-   refactor：重构（既不修复错误也不添加功能）
    
-   perf：优化相关，比如提升性能、体验
    
-   test：增加测试，包括单元测试、集成测试等
    
-   build：构建系统或外部依赖项的更改
    
-   ci：自动化流程配置或脚本修改
    
-   chore：非 src 和 test 的修改，发布版本等
    
-   revert：恢复先前的提交
    

**如果感觉文章还不错，给博主一个点赞、在看，作为继续创作的动力。**