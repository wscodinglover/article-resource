> **来自：掘金，作者：落云**
> 
> **链接：https://juejin.cn/post/7211521650252398649**

## 环境搭建

目前流行的组件库搭建方式都是使用monorepo的方式，好处很多，可以在一个代码仓库中管理多个项目，可以达到项目之间的资源共享。这里也是使用这种方式。

### 以 pnpm 构建 monorepo

首先全局安装pnpm

```
npm&nbsp;install&nbsp;pnpm&nbsp;-g<br>复制代码<br>
```

pnpm初始化

```
pnpm&nbsp;init<br>复制代码<br>
```

得到 `package.json` 的初始内容后删除 package.json 中的 name ，添加 `"private": true` 属性，因为这个作为一个整体是不需要发布的。组件都是写在`packages`中。

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span>Error:&nbsp;no&nbsp;<span data-darkreader-inline-color="">test</span>&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span><br>}<br>复制代码<br>
```

### 配置 pnpm 的 monorepo 工作区

这是我目前的结构目录，`docs`用来存放组件库文档，`examples`用于调试编写好的组件，`packages`里的`compnents`用于存放自己的组件。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比如我使用到`packages`和`examples`这两个，那么就将这两个都配置进去,在`pnpm-workspace.yaml`中配置

```
packages:<br>&nbsp;&nbsp;-&nbsp;<span data-darkreader-inline-color="">'packages/**'</span><br>&nbsp;&nbsp;-&nbsp;<span data-darkreader-inline-color="">'examples'</span><br>复制代码<br>
```

每个子模块都有属于自己的`package.json`文件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

以components包的`package.json`举例，其中`"@uv-ui/hooks": "workspace:^1.0.0"`和 `"@uv-ui/utils": "workspace:^1.0.0"`是依赖于其他目录的包，如果这个components包需要用到这两个包，需要在这个目录下也安装上，之后发布npm包的时候将`workspace:^`去掉即可，这两个依赖的包也需要独立发布npm包，这些在发布组件中有详细描述。

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"uv-ui"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.11"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"module"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"style"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/style.css"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"基于vue3的移动端组件库"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"vite&nbsp;build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"lint"</span>:&nbsp;<span data-darkreader-inline-color="">"eslint&nbsp;./src/**/*.{js,jsx,vue,ts,tsx}&nbsp;--fix"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"repository"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"git"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"url"</span>:&nbsp;<span data-darkreader-inline-color="">"https://github.com/monsterxwx/uv-ui"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"directory"</span>:&nbsp;<span data-darkreader-inline-color="">"packages/uv-ui"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"uv-ui"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vue3组件库"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"mobile"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"frontend"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"components"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"files"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dist"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">"coderxwx"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"MIT"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@uv-ui/hooks"</span>:&nbsp;<span data-darkreader-inline-color="">"workspace:^1.0.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@uv-ui/utils"</span>:&nbsp;<span data-darkreader-inline-color="">"workspace:^1.0.0"</span><br>&nbsp;&nbsp;}<br>}<br>复制代码<br>
```

其他两个的包名则分别为：`@uv-ui/hooks` 和 `@uv-ui/utils`，创建过程同上。

### 仓库项目内的包相互调用

如何对`hooks`、`utils`和`components`这三个包进行互相调用呢？我们只需要把这三个包都安装到仓库根目录下的 `node_modules` 目录中即可。所有的依赖都在根目录下安装，安装到根目录需要加上`-w` ，表示安装到公共模块的 packages.json 中。

```
pnpm&nbsp;install&nbsp;uv-ui&nbsp;-w<br>pnpm&nbsp;install&nbsp;@uv-ui/hooks&nbsp;-w<br>pnpm&nbsp;install&nbsp;@uv-ui/utils&nbsp;-w<br>复制代码<br>
```

根目录的`package.json`将会出现如下依赖，这三个就是我们刚刚安装的包

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 组件编写

如果我们的组件库包需要支持按需引入，那么每个组件都需要进行vue的注册`app.component(comp.name,comp)`。每个都写一遍会比较麻烦，可以封装成一个函数。

```
<span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;withInstall&nbsp;=&nbsp;(comp)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;comp.install&nbsp;=&nbsp;(app)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;注册组件<br>&nbsp;&nbsp;&nbsp;&nbsp;app.component(comp.name,&nbsp;comp)<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;comp<br>}<br>复制代码<br>
```

以button组件为例，首先目录结构如下，在src目录下编写各个组件，在components目录下有一个index用于将所有的组件导出

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

`button`的`index.js`代码如下：将编写的button组件导进来，然后导出去即可实现组件每个都是按需加载

```
import&nbsp;Button&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./button.vue'</span><br>import&nbsp;{withInstall}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@uv-ui/utils'</span><br><br>const&nbsp;UvButton&nbsp;=&nbsp;withInstall(Button)<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;UvButton<br><br>复制代码<br>
```

再来看看components目录下的`index.js`文件，写多少个组件就引入多少个，然后全部导出去，这么做的目的是在全量导入的时候，可以直接引入组件，然后`vue.use(uv-ui)`即可将全部的组件注册

```
import&nbsp;uvButton&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./button'</span><br><br>const&nbsp;components&nbsp;=&nbsp;[<br>&nbsp;&nbsp;uvButton<br>]<br><br>const&nbsp;install&nbsp;=&nbsp;(Vue)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;components.forEach(component&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;Vue.component(component.name,&nbsp;component)<br>&nbsp;&nbsp;})<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{<br>&nbsp;&nbsp;uvButton<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;install<br><br>复制代码<br>
```

再来看看`button.vue`文件,由于写的比较多，这里直接省略部分代码，只保留关键代码。

可以看到每个组件都需要给他一个名字方便在vue中注册，`export default { name: 'UvButton' }`， 其次样式通过css变量抽离出来，方便样式的更改，样式不用加`scoped`作用域，只要命名好样式名称即可。其他组件同理。

```
&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"uv-button"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&nbsp;setup&gt;<br>//&nbsp;代码<br>&lt;/script&gt;<br>&lt;script&gt;<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'UvButton'</span><br>}<br>&lt;/script&gt;<br><br>&lt;style&nbsp;lang=<span data-darkreader-inline-color="">"scss"</span>&gt;<br>:root&nbsp;{<br>&nbsp;&nbsp;--uv-button-primary:&nbsp;<span data-darkreader-inline-color="">#409eff;</span><br>&nbsp;&nbsp;--uv-button-success:&nbsp;<span data-darkreader-inline-color="">#67c23a;</span><br>&nbsp;&nbsp;--uv-button-warning:&nbsp;<span data-darkreader-inline-color="">#e6a23c;</span><br>&nbsp;&nbsp;--uv-button-error:&nbsp;<span data-darkreader-inline-color="">#f56c6c;</span><br>&nbsp;&nbsp;--uv-button-info:&nbsp;<span data-darkreader-inline-color="">#909399;</span><br>&nbsp;&nbsp;--uv-button-text:&nbsp;<span data-darkreader-inline-color="">#303133;</span><br>}<br><br><span data-darkreader-inline-color="">$primary</span>:&nbsp;var(--uv-button-primary);<br><span data-darkreader-inline-color="">$success</span>:&nbsp;var(--uv-button-success);<br><span data-darkreader-inline-color="">$warning</span>:&nbsp;var(--uv-button-warning)&nbsp;;<br><span data-darkreader-inline-color="">$error</span>:&nbsp;var(--uv-button-error)&nbsp;;<br><span data-darkreader-inline-color="">$info</span>:&nbsp;var(--uv-button-info)&nbsp;;<br><span data-darkreader-inline-color="">$text</span>:&nbsp;var(--uv-button-text)&nbsp;;<br>.uv-button&nbsp;{<br>&nbsp;&nbsp;font-size:&nbsp;var(--uv-button-font-size);<br>&nbsp;&nbsp;border:&nbsp;0;<br>&nbsp;&nbsp;border-radius:&nbsp;var(--uv-button-border-radius);<br>&nbsp;&nbsp;white-space:&nbsp;nowrap;<br>&nbsp;&nbsp;color:&nbsp;<span data-darkreader-inline-color="">#ffffff;</span><br>&nbsp;&nbsp;background:&nbsp;none;<br>&nbsp;&nbsp;outline:&nbsp;none;<br>&nbsp;&nbsp;cursor:&nbsp;pointer;<br>}<br><br>&lt;/style&gt;<br><br>复制代码<br>
```

## 组件打包

组件打包采用的是vite的库模式打包，没有使用gulp这些工具，是比较简单的打包方式，只需要简单配置即可实现每个组件都单独打包，目前打包后所有组件样式会合成一个`style.css`文件，样式需要全部引入，组件是按需引入的方式，如果样式也想做分离就需要使用到gulp等这些工具，将样式全部拆分出来作为一个包`theme-chalk`,然后引入就类似element-ui那种方式，比较麻烦这里就不详细描述了，可以找找相关的文章了解。

```
import&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vite'</span><br>import&nbsp;vue&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@vitejs/plugin-vue'</span><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;defineConfig({<br>&nbsp;&nbsp;build:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;target:&nbsp;<span data-darkreader-inline-color="">'modules'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;压缩<br>&nbsp;&nbsp;&nbsp;&nbsp;minify:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;rollupOptions:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;忽略打包vue文件<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;external:&nbsp;[<span data-darkreader-inline-color="">'vue'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input:&nbsp;[<span data-darkreader-inline-color="">'src/index.js'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span data-darkreader-inline-color="">'es'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entryFileNames:&nbsp;<span data-darkreader-inline-color="">'[name].js'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preserveModules:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;配置打包根目录<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dir:&nbsp;<span data-darkreader-inline-color="">'dist/es'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preserveModulesRoot:&nbsp;<span data-darkreader-inline-color="">'src'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format:&nbsp;<span data-darkreader-inline-color="">'cjs'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entryFileNames:&nbsp;<span data-darkreader-inline-color="">'[name].js'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preserveModules:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dir:&nbsp;<span data-darkreader-inline-color="">'dist/lib'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preserveModulesRoot:&nbsp;<span data-darkreader-inline-color="">'src'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;lib:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entry:&nbsp;<span data-darkreader-inline-color="">'./index.js'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;formats:&nbsp;[<span data-darkreader-inline-color="">'es'</span>,&nbsp;<span data-darkreader-inline-color="">'cjs'</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;vue()<br>&nbsp;&nbsp;]<br>})<br>复制代码<br>
```

下面是打包后的结构，分别拆成es和lib，样式在es目录下的style.css

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

使用方式就比较简单了

**第一种：全量使用 main.js中导入**

```
import&nbsp;uvUI&nbsp;from&nbsp;<span data-darkreader-inline-color="">'uv-ui'</span><br>import&nbsp;<span data-darkreader-inline-color="">'uv-ui/dist/es/style.css'</span><br><br>app.use(uvUI)<br>复制代码<br>
```

**第二种：按需导入 在main.js中引入样式文件**

```
import&nbsp;<span data-darkreader-inline-color="">'uv-ui/dist/es/style.css'</span><br>复制代码<br>
```

其他用到的地方引入相关组件

```
&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;uvButton&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"primary"</span>&gt;切换&lt;/uvButton&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&nbsp;setup&gt;<br>import&nbsp;{&nbsp;uvButton&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'uv-ui'</span><br><br>&lt;/script&gt;<br>复制代码<br>
```

## 组件发布

### 编写package.json

**package.json重要字段说明：**

-   **name** 即npm项目包名，发布到npm时就是取的这个name名，你自己取个语义化的名字，和已有的npm库不能重复；
    
-   **private** 是否私有包，要发布到npm需要关闭
    
-   **version** 版本号，更新npm包时必须修改一个更高的版本号后才能成功发布到npm，版本号最好遵循npm版本管理规范；
    
-   **description** 包的描述，发布到npm后你搜索该npm包时，在搜索联想列表里会显示在包名的下方，作为描述说明；
    
-   **main** 入口文件路径，在你通过import或require引用该npm包时就是引入的该路径的文件
    
-   **keywords** 该包的关键词
    
-   **files** 白名单目录，配置哪些文件会上传到npm包中。有些文件是必定会上传的，无法控制，例如package.json、LICENSE、README.md等等
    
-   **repository** 关联github地址
    

`package.json完整代码`

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"uv-ui"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.11"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"module"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"style"</span>:&nbsp;<span data-darkreader-inline-color="">"dist/es/style.css"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"基于vue3的移动端组件库"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"build"</span>:&nbsp;<span data-darkreader-inline-color="">"vite&nbsp;build"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"lint"</span>:&nbsp;<span data-darkreader-inline-color="">"eslint&nbsp;./src/**/*.{js,jsx,vue,ts,tsx}&nbsp;--fix"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"repository"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"git"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"url"</span>:&nbsp;<span data-darkreader-inline-color="">"https://github.com/monsterxwx/uv-ui"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"directory"</span>:&nbsp;<span data-darkreader-inline-color="">"packages/uv-ui"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"uv-ui"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"vue3组件库"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"mobile"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"frontend"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"components"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"files"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"dist"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">"coderxwx"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"MIT"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@coderxwx/uv-ui-hooks"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@coderxwx/uv-ui-utils"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span><br>&nbsp;&nbsp;}<br>}<br>复制代码<br>
```

### 添加LICENSE

Copyright (c) 2023代表年份，coderxwx替换成自己的名字

```
MIT&nbsp;License<br><br>Copyright&nbsp;(c)&nbsp;2023&nbsp;coderxwx<br><br>Permission&nbsp;is&nbsp;hereby&nbsp;granted,&nbsp;free&nbsp;of&nbsp;charge,&nbsp;to&nbsp;any&nbsp;person&nbsp;obtaining&nbsp;a&nbsp;copy<br>of&nbsp;this&nbsp;software&nbsp;and&nbsp;associated&nbsp;documentation&nbsp;files&nbsp;(the&nbsp;<span data-darkreader-inline-color="">"Software"</span>),&nbsp;to&nbsp;deal<br><span data-darkreader-inline-color="">in</span>&nbsp;the&nbsp;Software&nbsp;without&nbsp;restriction,&nbsp;including&nbsp;without&nbsp;limitation&nbsp;the&nbsp;rights<br>to&nbsp;use,&nbsp;copy,&nbsp;modify,&nbsp;merge,&nbsp;publish,&nbsp;distribute,&nbsp;sublicense,&nbsp;and/or&nbsp;sell<br>copies&nbsp;of&nbsp;the&nbsp;Software,&nbsp;and&nbsp;to&nbsp;permit&nbsp;persons&nbsp;to&nbsp;whom&nbsp;the&nbsp;Software&nbsp;is<br>furnished&nbsp;to&nbsp;<span data-darkreader-inline-color="">do</span>&nbsp;so,&nbsp;subject&nbsp;to&nbsp;the&nbsp;following&nbsp;conditions:<br><br>The&nbsp;above&nbsp;copyright&nbsp;notice&nbsp;and&nbsp;this&nbsp;permission&nbsp;notice&nbsp;shall&nbsp;be&nbsp;included&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;all<br>copies&nbsp;or&nbsp;substantial&nbsp;portions&nbsp;of&nbsp;the&nbsp;Software.<br><br>THE&nbsp;SOFTWARE&nbsp;IS&nbsp;PROVIDED&nbsp;<span data-darkreader-inline-color="">"AS&nbsp;IS"</span>,&nbsp;WITHOUT&nbsp;WARRANTY&nbsp;OF&nbsp;ANY&nbsp;KIND,&nbsp;EXPRESS&nbsp;OR<br>IMPLIED,&nbsp;INCLUDING&nbsp;BUT&nbsp;NOT&nbsp;LIMITED&nbsp;TO&nbsp;THE&nbsp;WARRANTIES&nbsp;OF&nbsp;MERCHANTABILITY,<br>FITNESS&nbsp;FOR&nbsp;A&nbsp;PARTICULAR&nbsp;PURPOSE&nbsp;AND&nbsp;NONINFRINGEMENT.&nbsp;IN&nbsp;NO&nbsp;EVENT&nbsp;SHALL&nbsp;THE<br>AUTHORS&nbsp;OR&nbsp;COPYRIGHT&nbsp;HOLDERS&nbsp;BE&nbsp;LIABLE&nbsp;FOR&nbsp;ANY&nbsp;CLAIM,&nbsp;DAMAGES&nbsp;OR&nbsp;OTHER<br>LIABILITY,&nbsp;WHETHER&nbsp;IN&nbsp;AN&nbsp;ACTION&nbsp;OF&nbsp;CONTRACT,&nbsp;TORT&nbsp;OR&nbsp;OTHERWISE,&nbsp;ARISING&nbsp;FROM,<br>OUT&nbsp;OF&nbsp;OR&nbsp;IN&nbsp;CONNECTION&nbsp;WITH&nbsp;THE&nbsp;SOFTWARE&nbsp;OR&nbsp;THE&nbsp;USE&nbsp;OR&nbsp;OTHER&nbsp;DEALINGS&nbsp;IN&nbsp;THE<br>SOFTWARE.<br>复制代码<br>
```

### npm账号注册登录

要发布到npm上首先就要注册npm账号，通过官网进行账号注册：www.npmjs.com/\[1\] 。

```
npm&nbsp;login<br>复制代码<br>
```

登录npm,输入账号和密码，密码输入不会有显示，正常输入即可，然后输入自己的邮箱，邮箱验证码验证通过后即成功登录，后续不需要重复登录。

### 调试npm

如果不需要调试，可以跳过调试步骤，直接发布。

-   npm项目根目录运行终端命令：运行后该npm包会放进本地npm缓存
    

```
npm&nbsp;link<br>复制代码<br>
```

-   如果要在其他项目（例如项目名叫aaa）里引用调试，只需要在aaa里运行命令：
    

```
npm&nbsp;link&nbsp;包名<br>复制代码<br>
```

-   如果要取消项目aaa与npm包的关联，在aaa项目下运行命令：
    

```
npm&nbsp;unlink&nbsp;包名<br>复制代码<br>
```

为了防止本地调试npm与发布后的npm混淆冲突，在调试完成后一定记得手动取消项目关联。

### 发布组件

在npm包项目根目录运行命令：

```
npm&nbsp;publish<br>复制代码<br>
```

运行完稍等一段时间即可在npm官网搜索到发布的npm包。

**关于发布的一些错误汇总**

-   **403错误**
    

-   检查npm源是否是官方源registry.npmjs.org/\[2\]，比如之前是淘宝的源则需要切换回官方源，否则发布失败；
    
-   是否登录成功（npm login 或者npm adduser 登录）；
    
-   是否已有重复的包名（修改package.json里的name或者使用scope）。
    

-   **402错误**
    

-   当使用npm publish发布带有`scope`作用域的包时，会出现402错误；
    
-   需使用npm publish --access=public；
    
-   详细发布请看下面的发布私有包。
    

-   **404错误**
    

-   没有找到对应的路径，其实跟402错误差不多，基本都是作用域的问题
    

### 发布私有包

我们在写组件库的时候会用到一些函数，这些都可以作为一个包进行发布，但是这些不需要发布为正式的包，只需要给组件库的主包使用，比如：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

`package.json`中如果name 是使用`@xx`来表示的则代表私有包，如果发布npm为私有包则需要收费，我们可以通过配置`publishConfig`字段将其表示为共有包，然后进行`npm publish`进行发布，如果不想写这个可以直接输入`npm publish --access=public` 比如我的私有包的前缀是这个@coderxwx，@后面跟的是你npm的账号名

```
<span>{</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"@coderxwx/uv-ui-hooks"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"private"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span>Error:&nbsp;no&nbsp;<span data-darkreader-inline-color="">test</span>&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"publishConfig"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"access"</span>:&nbsp;<span data-darkreader-inline-color="">"public"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"registry"</span>:&nbsp;<span data-darkreader-inline-color="">"https://registry.npmjs.org/"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">"coderxwx"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"MIT"</span><br>}<br>复制代码<br>
```

如果不想使用自己的账号名作为私有包的前缀，可以创建一个组织

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

创建完成后就可以使用这个名字来当前缀了，比如我创建的是uv-ui,之后就可以使用@uv-ui进行发布了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 更新组件

当完成组件的修改后需要重新发布更新组件，这里有两种方式，一种是直接修改`package.json`中的`version`信息，然后进行`npm publish`

还有一种更规范的方式是使用npm的指令。

其中type有这些：

`patch`：小变动，比如修复bug等 版本号变动 **v1.0.0->v1.0.1**

`minor`：增加新功能，不影响现有功能 版本号变动 **v1.0.0->v1.1.0**

`major`：破坏模块对向后的兼容性，大版本更新 版本号变动 **v1.0.0->v2.0.0**

```
npm&nbsp;version&nbsp;[<span data-darkreader-inline-color="">type</span>]<br><br>npm&nbsp;publish<br>复制代码<br>
```

## 文档编写

我用的是vitepress来构建文档，基本没啥难度

安装

```
pnpm&nbsp;install&nbsp;-D&nbsp;vitepress&nbsp;vue<br>复制代码<br>
```

vitepress的具体使用可以参考这篇文章：juejin.cn/post/716427…\[3\]

教程到这里就结束了，如有错误欢迎指出！

\---END---