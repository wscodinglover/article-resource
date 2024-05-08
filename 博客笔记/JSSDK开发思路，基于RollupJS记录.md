文章来源于稀土掘金技术社区——极速蜗牛  

**背景**

项目需要开发一个发版通知插件，同时公司项目属于乾坤架构的微前端应用，涉及多个子应用，如果每个项目都写一遍逻辑，在修改时可能会重复修改多个项目，于是想着能不能通过开发一个插件，对项目侵入最少方式，插件升级后依赖项目`npm i`一下就可以了。

**调研**

待编

**行动**

基于Rollup开发一个插件，起步还是建议先阅读一遍官网的介绍，以便对它有一个基本的了解。

RollupJS 官网<sup data-darkreader-inline-color="">[1]</sup>

但是官网的资料很多有坑（因为版本更新然后没有人更新官网资料导致……），所以如果全部按官网的指导走，是走不下去的，一堆问题。

最明显的一个就是 babel，官网说明默认是 babel6，但如果直接从 npm 执行安装，默认安装 babel 则是 7+，配置起来完全不是一个世界的东西……

包括搜到的很多博文也都是过期状态，无法参考，所以决定写个分享来汇总下这次遇到的问题和一些可复用的配置。

注：以下大部分操作都是依赖于命令行操作，Windows 你可以用你熟悉的 `cmd` 或者 `powerShell` 或者我熟悉的 `cmder` ，macOS 可以用终端等等

**创建项目**

Rollup 只是个工具，不是脚手架，所以没有自己的创建命令，需要走传统的项目生成方法去创建。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;mkdir&nbsp;rollup-demo&nbsp;&amp;&amp;&nbsp;cd&nbsp;rollup-demo<br></code>
```

**初始化项目**

执行 `npm init` 命令，一路回车，生成package.json 文件。

建议把入口文件设置为`src/main.js`,因为实际项目会有很多个分文件，包括你自己编写的`lib`文件、`config`文件等，统一放在`src`下面进行归类管理。

然后打开package.json文件在scripts字段下新增build命令：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span><span data-darkreader-inline-color="">Error</span>:&nbsp;no&nbsp;test&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"rollup&nbsp;-c&nbsp;rollup.config.js"</span><br>&nbsp;&nbsp;},<br></code>
```

**安装依赖**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;install&nbsp;--save-dev&nbsp;rollup&nbsp;@rollup/plugin-node-resolve&nbsp;@rollup/plugin-babel&nbsp;@rollup/plugin-commonjs&nbsp;@rollup/plugin-json&nbsp;@rollup/plugin-alias&nbsp;rollup-plugin-terser&nbsp;rollup-plugin-banner&nbsp;@babel/core&nbsp;@babel/plugin-proposal-<span><span data-darkreader-inline-color="">class</span>-<span data-darkreader-inline-color="">properties</span>&nbsp;@<span data-darkreader-inline-color="">babel</span>/<span data-darkreader-inline-color="">preset</span>-<span data-darkreader-inline-color="">env</span><br></span></code>
```

各个包的作用如下

| 基础包名 | 作用 | 用途补充说明 |
| --- | --- | --- |
| rollup | Rollup 的核心包 |   
 |
| @rollup/plugin-node-resolve | Rollup 插件包，帮助 Rollup 识别 node\_modules 的包 |   
 |
| @rollup/plugin-babel | Rollup 插件包，自动化解决 babel 的转换问题 | 你可以更爽的写 ES6 以上的新语法… |
| @rollup/plugin-commonjs | Rollup 插件包，可将 CommonJS 模块转换为 ES6 | 大部分 npm 包都是 CommonJS，比如常用的 axios/qs 库，如果你项目里用到了他们，不引入这个插件的话会构建失败 |
| @rollup/plugin-json | Rollup 插件包，可将.json 文件转换为 ES6 模块 | 比如：作为类库当然要涉及到版本更新，版本号肯定不能各种地方都手写，这种情况下就可以从 package.json 读取 |
| @rollup/plugin-alias | Rollup 插件包，配置路径别名 | alias 的作用大家都懂，开发环境必备 |
| rollup-plugin-terser | Rollup 插件包，混淆压缩 js 代码 | 打包发布必备 |
| rollup-plugin-banner | Rollup 插件包，给打包后的文件添加注释 | 一般可以添加开发者信息、版本号等信息 |
| @babel/core | @rollup/plugin-babel 的依赖包，该插件基于 babel7 |   
 |
| @babel/plugin-proposal-class-properties | @rollup/plugin-babel 的依赖包，该插件基于 babel7 |   
 |
| @babel/preset-env | @rollup/plugin-babel 的依赖包，该插件基于 babel7 |   
 |

**配置文件**

上面提到修改了 `package.json` 的 `script` 字段，修改的含义是告知 node 在执行 build 命令的时候，通过 rollup 命令去运行一个叫 `rollup.config.js` 的配置文件（-c 是–config 的缩写）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;resolve&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-node-resolve'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;babel&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-babel'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;commonjs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-commonjs'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;json&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-json'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;alias&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@rollup/plugin-alias'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;terser&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'rollup-plugin-terser'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;banner&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'rollup-plugin-banner'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;path&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'path'</span>)<br><span data-darkreader-inline-color="">const</span>&nbsp;resolveDir&nbsp;=&nbsp;<span>(<span>dir</span>)&nbsp;=&gt;</span>&nbsp;path.join(__dirname,&nbsp;dir)<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">input</span>:&nbsp;<span data-darkreader-inline-color="">'src/main.js'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">output</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">file</span>:&nbsp;<span data-darkreader-inline-color="">`demo/js/demo.js`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">format</span>:&nbsp;<span data-darkreader-inline-color="">'umd'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'demo'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">file</span>:&nbsp;<span data-darkreader-inline-color="">`dist/<span data-darkreader-inline-color="">${process.env.npm_package_version}</span>/demo.min.js`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">format</span>:&nbsp;<span data-darkreader-inline-color="">'umd'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'demo'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">plugins</span>:&nbsp;[terser()],<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">plugins</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;resolve({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">browser</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;babel({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">babelHelpers</span>:&nbsp;<span data-darkreader-inline-color="">'bundled'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;commonjs(),<br>&nbsp;&nbsp;&nbsp;&nbsp;json(),<br>&nbsp;&nbsp;&nbsp;&nbsp;alias({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">entries</span>:&nbsp;[{&nbsp;<span data-darkreader-inline-color="">find</span>:&nbsp;<span data-darkreader-inline-color="">'@'</span>,&nbsp;<span data-darkreader-inline-color="">replacement</span>:&nbsp;resolveDir(<span data-darkreader-inline-color="">'src'</span>)&nbsp;}],<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;banner(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`name:&nbsp;&lt;%=&nbsp;pkg.name&nbsp;%&gt;\nversion:&nbsp;v&lt;%=&nbsp;pkg.version&nbsp;%&gt;\nauthor:&nbsp;&lt;%=&nbsp;pkg.author&nbsp;%&gt;`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;),<br>&nbsp;&nbsp;],<br>}<br></code>
```

这份配置的功能是，在执行了 `npm run build` 之后，会在 `dist` 文件夹里，生成一个 “版本号” 文件夹，版本号文件夹下是一个被压缩混淆了的版本。

同时在 `demo` 的 js 文件夹下，会生成一个没有混淆的版本用于 demo 的开发调试。

核心配置选项说明：

| 字段 | 作用 |
| --- | --- |
| input | 入口文件 |
| output | 出口文件，一个数组，支持打包多个版本（通常是一个完整版开发，一个混淆压缩上线） |
| output.file | 出口的文件名，需要包含到文件夹里就把路径也写上，上面的 ({}).npm\_package\_version 是以版本号为文件夹归类发布 |
| output.format | 输出格式：amd=异步模块、cjs=CommonJS、es=ES 模块文件、iife=自动执行、umd=通用模块（包含 amd/cjs/iife 为一体） |
| output.name | 暴露的全局变量，可以通过 window.xxx 来访问你的类库，类似 window.jQuery 的作用 |
| output.plugins | 打包插件，目前只配置了一个 terser 用于打包一个压缩版本发布 |

完整配置项请参考Rollup官网<sup data-darkreader-inline-color="">[2]</sup>。

**编译打包**

开发阶段你可以根据自己的习惯使用各种 npm 包、自己写的 `lib/module` 文件等等，但是最终都需要在 `main.js` 导出一个变量

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Demo</span>&nbsp;</span>{<br>&nbsp;&nbsp;sayHi(name)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Hi,&nbsp;<span data-darkreader-inline-color="">${name}</span>`</span>)<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;demo&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Demo()<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;demo<br></code>
```

这样使用的人就可以在引入你打包好的文件之后，通过这个变量去使用你的类库里的方法，觉得有点绕？看看最后的例子。

**Babel配置**

因为开发阶段会使用大量的 ES6 等浏览器还不完全兼容的新特性，或者引入一些第三方库，比如 axios 之类的，对于低版本 IE 还不太友好，这些情况下都需要进行 Babel 转换。

命名为 `.babelrc` 保存到项目根目录下

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"presets"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@babel/preset-env"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"modules"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"targets"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"browsers"</span>:&nbsp;<span data-darkreader-inline-color="">"&gt;&nbsp;1%,&nbsp;IE&nbsp;11,&nbsp;not&nbsp;op_mini&nbsp;all,&nbsp;not&nbsp;dead"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"useBuiltIns"</span>:&nbsp;<span data-darkreader-inline-color="">"usage"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"corejs"</span>:&nbsp;<span data-darkreader-inline-color="">2</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugins"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@babel/plugin-proposal-class-properties"</span><br>&nbsp;&nbsp;]<br>}<br></code>
```

**🌰**

我在 `main.js` 编写一个简单的函数，通过预设好的 `demo` 变量名打包导出。

dist 文件夹是最终要发版的混淆压缩版，每个版本都有独立的归类；demo 文件夹是用于开发调试的，这里的是未混淆的版本。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

微信的 JSSDK 也是类似的用法 `wx.config(options);` 、`wx.chooseImage()` 等等

****因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本公众号星标，看完文章后记得点下赞或者在看，谢谢各位！****

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)