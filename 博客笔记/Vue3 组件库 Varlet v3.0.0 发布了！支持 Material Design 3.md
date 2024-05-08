### 写在前面

经过了社区贡献者们的三个多月的努力，Varlet 的 3.0 版本终于发布了！🎉🎉🎉，这次的版本升级主要围绕的是设计系统升级和组件视觉和交互优化。我们重构了几千个 css 变量，最终的最终，终于同时支持了 Material Design 2 和 Material Design 3 两种设计系统。同时对组件库整体做了一次重构和细节优化，又又又撇去了一些技术债务。

文档地址: https://varlet.gitee.io/varlet-ui/#/zh-CN/home  
github: https://github.com/varletjs/varlet

### 新增 Material Design 3 支持

Varlet 3.0 以前，我们以 Material Design 2 作为默认的设计系统，并且提供了暗黑模式的主题包。3.0 之后我们依然以 md2 为默认 ^\_^，提供了对 Material Design 3 的支持。(md3 真的很出色，作者个人真的超爱)。

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibs91pniaBGq7jnPUVDf52ZmjEZ9iahk6WHaqvxGdZYM89RMAgAoqPWUasrN0BfIbhSkHYWsKWcXJgGw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### 新增更多通用 css 变量，更易定制

为了使组件样式定制更加容易，并且支持 `Material Design 3`，`3.x` 版本对组件库的样式变量进行了一次大重构，新增了一些基础样式变量，每个组件都动了刀子。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""> `--color-on-primary`                <br> `--color-on-info`                   <br> `--color-on-success`                <br> `--color-on-warning`                <br> `--color-on-danger`                 <br> `--color-primary-container`         <br> `--color-info-container`            <br> `--color-success-container`         <br> `--color-warning-container`         <br> `--color-danger-container`          <br> `--color-on-primary-container`      <br> `--color-on-info-container`         <br> `--color-on-success-container`      <br> `--color-on-warning-container`      <br> `--color-on-danger-container`       <br> `--color-outline`                   <br> `--color-surface-container`        <br> `--color-surface-container-low`     <br> `--color-surface-container-high`    <br> `--color-surface-container-highest` <br> `--color-inverse-surface`           <br> `--color-on-surface-variant`<br></code>
```

### unplugin-vue-components resolver 独立为 @varlet/import-resolver

由于 unplugin-vue-components 内置的组件库 `resolver` 过于的多了，维护压力不小，antfu 推荐自行维护 resolver。趁这次 3.0 更新顺便也就独立了，按需引入方式有如下变化，原本 unplugin-vue-components 的 `varlet resolver` 也依然可以继续使用，但是建议迁移到 `@varlet/import-resolver`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;vue&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@vitejs/plugin-vue'</span>&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;components&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'unplugin-vue-components/vite'</span>&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;autoImport&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'unplugin-auto-import/vite'</span>&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;VarletImportResolver&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@varlet/import-resolver'</span>&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vite'</span>&nbsp;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;defineConfig({&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">plugins</span>:&nbsp;[&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;vue(),&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;components({&nbsp;<span data-darkreader-inline-color="">resolvers</span>:&nbsp;[VarletImportResolver()]&nbsp;}),&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;autoImport({&nbsp;<span data-darkreader-inline-color="">resolvers</span>:&nbsp;[VarletImportResolver({&nbsp;<span data-darkreader-inline-color="">autoImport</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})]&nbsp;})&nbsp;<br>&nbsp;&nbsp;]&nbsp;<br>})<br></code>
```

### 支持运行时转换主题包尺寸单位

为了满足移动端的适配需要，我们支持了运行时转换主题包 css 单位的能力。默认采用 `375px -> 100vmin` 的转换规则

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Themes&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@varlet/ui'</span>&nbsp;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;viewportTheme&nbsp;=&nbsp;Themes.toViewport(Themes.md3Dark)<br></code>
```

也可以对规则进行修改，比如。。。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Themes&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@varlet/ui'</span>&nbsp;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;viewportTheme&nbsp;=&nbsp;Themes.toViewport(Themes.md3Dark,&nbsp;{&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;默认值为&nbsp;375&nbsp;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">viewportWidth</span>:&nbsp;<span data-darkreader-inline-color="">750</span>,&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;默认值为&nbsp;'vmin'&nbsp;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">viewportUnit</span>:&nbsp;<span data-darkreader-inline-color="">'vw'</span>,&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;默认值为&nbsp;6&nbsp;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">unitPrecision</span>:&nbsp;<span data-darkreader-inline-color="">4</span>,&nbsp;<br>})<br></code>
```

### 功能移除

-   DatePicker 组件移除了对 `headerColor` 属性的兼容
    
-   TimePicker 组件移除了对 `headerColor` 属性的兼容
    
-   ImagePreview 组件移除了对 `current` 属性的兼容
    
-   Chip 组件移除了对 `closable` 属性的兼容
    
-   Progress 组件移除了对 `ripple` 属性的兼容
    
-   IndexBar 组件移除了对 `cssMode` 属性的兼容
    
-   LoadingBar 组件移除了对 `mergeConfig` 方法的兼容
    

### 2.x 版本状态

随着 3.x 的发布，varlet 2.x 原则上也将进入只修 bug 不再提供新特性的状态。2.x 的文档迁移至 https://varlet.gitee.io/varlet-ui/v2/#/zh-CN/home

### 最后的最后

开源不易，尤其是在如今这个浮躁的时代。作者已经开发 varlet ui 三年了，恍惚间竟然是发的第三个大版本了，十分感慨时间过的如此之快，我们一起继续努力。同时非常感谢社区对我们的帮助和支持。以及下面这些无私奉献的 contributor 们。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png