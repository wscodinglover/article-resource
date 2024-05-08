> **来自：掘金，作者：去伪存真**
> 
> **链接：https://juejin.cn/post/7084926646033055752**

### 1.背景

在做移动端各种尺寸屏幕的适配时，用的最多的就是rem方案。我们都写过这样的代码,来设置根字体大小。这个计算公式中设备宽度，UI设计稿尺寸这两个参数比较好理解，可是为什么要除以100呢，为什么不是10,50或者其它的数值呢。

```
<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;setRem&nbsp;=&nbsp;<span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;deviceWidth&nbsp;=&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">document</span>.documentElement.clientWidth;<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;获取相对UI稿，屏幕的缩放比例</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">const</span>&nbsp;rem&nbsp;=&nbsp;(deviceWidth&nbsp;*<span data-darkreader-inline-outline="" data-darkreader-inline-color="">100</span>)&nbsp;/&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">750</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;动态设置html的font-size</span><br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">document</span>.querySelector(<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> html </span>).style.fontSize&nbsp;=&nbsp;&nbsp;rem&nbsp;+&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> px </span>;<br>};<br>
```

查了一番资料才得知，rem方案是viewport的过渡方案，将设计稿除以100，等分为7.5份来实现移动端不同屏幕尺寸适配的原理，与viewport中vw单位的定义，设计思想与想要解决的问题，是相同的。当时浏览器对viewport的支持性不好，而现在已经是2022年了，可以看到，各大浏览器厂商，对viewport的支持率已经很高了。可以放心使用。

![Image](https://mmbiz.qpic.cn/mmbiz/XP4dRIhZqqXibV6Nzgy0KVvzHav8mXaDffEJTTD4o8p6oApkWyp1yoMx5VnbVTSnCialEibQVBRzOpW0veFQ7yJpQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

### 2\. 相对于rem的优势

-   语义化更好, rem从本义上来说，是一种字体单位，不是用来做布局和各种屏幕尺寸大小适配的，如上面的示例，用rem做适配单位，计算根字体的时候，计算公式中的100这个参数让人感觉很费解，viewport词更达意。
    

可以直接在代码中书写px,借助postcss-px-to-viewport插件转换成vw单位，完美适配移动端各种屏幕尺寸。不用像之前那样，一是要在蓝湖上设置根字体基准尺寸，将设计稿标注的px单位转换成rem单位，然后摘抄到代码中。二是需要用js计算设置根字体大小。前端开发天然喜欢px单位，像rem,em,vw，vh这些单位，一般都不是UI设计稿标注的尺寸，开发时需要转换成本。不如直接在代码中写px直观高效。

### 3\. postcss-px-to-viewport方案正确的使用姿势

看到网上的教程都是说要在项目中安装postcss-px-to-viewport工具包，然而安装和配置完postcss-px-to-viewport之后，运行项目，发现命令行出现如下报错：

```
postcss-px-to-viewport:&nbsp;postcss.plugin&nbsp;was&nbsp;deprecated.&nbsp;Migration&nbsp;guide:&nbsp;https://evilmartians.com/chronicles/postcss-8-plugin-migration<br>
```

说安装的postcss-px-to-viewport已经过时了，迁移指南参考evilmartians.com/chronicles/…<sup data-darkreader-inline-outline="" data-darkreader-inline-color="">[1]</sup>

点进入一看，根本找不到配置px转vw单位的方法。后面经过一番尝试之后，最终找到了正确的使用方法。

#### 3.1 安装postcss-px-to-viewport-8-plugin

```
yarn&nbsp;add&nbsp;-D&nbsp;postcss-px-to-viewport-8-plugin<br>
```

#### 3.2 在项目下创建postcss.config.js

```
<span data-darkreader-inline-outline="" data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">plugins</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> postcss-px-to-viewport-8-plugin </span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">unitToConvert</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> px </span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;需要转换的单位，默认为"px"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">viewportWidth</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">750</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;设计稿的视口宽度</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">unitPrecision</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">5</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;单位转换后保留的精度</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">propList</span>:&nbsp;[<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> * </span>,<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> !font-size </span>],&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">viewportUnit</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> vw </span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;希望使用的视口单位</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">fontViewportUnit</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> vw </span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;字体使用的视口单位</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;下面配置表示类名中含有 keep-px 都不会被转换</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">selectorBlackList</span>:&nbsp;[<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> keep-px </span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">minPixelValue</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;设置最小的转换数值，如果为1的话，只有大于1的值会被转换</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">mediaQuery</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;媒体查询里的单位是否需要转换单位</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">replace</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;&nbsp;是否直接更换属性值，而不添加备用属性</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">exclude</span>:&nbsp;[<span data-darkreader-inline-outline="" data-darkreader-inline-color="">/node_modules/</span>],&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;忽略某些文件夹下的文件或特定文件，例如&nbsp; node_modules &nbsp;下的文件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">include</span>:&nbsp;[<span data-darkreader-inline-outline="" data-darkreader-inline-color="">/src/</span>],&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;如果设置了include，那将只有匹配到的文件才会被转换</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">landscape</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;是否添加根据&nbsp;landscapeWidth&nbsp;生成的媒体查询条件&nbsp;@media&nbsp;(orientation:&nbsp;landscape)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">landscapeUnit</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color=""> vw </span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;横屏时使用的单位</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">landscapeWidth</span>:&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">1338</span>,&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">//&nbsp;横屏时使用的视口宽度</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;},<br>};<br>
```

### 4 效果演示

在项目中直接写px,运行项目之后，可以看到px已经转换成vw单位了

```
<span data-darkreader-inline-outline="" data-darkreader-inline-color="">#app</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-outline="" data-darkreader-inline-color="">width</span>:<span data-darkreader-inline-outline="" data-darkreader-inline-color="">100px</span><br>}<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

需要注意的是：

-   1.postcss-px-to-viewport 对内联css样式，外联css样式，内嵌css样式有效，对js动态css无效。所以要动态改变css展示效果的话，要使用静态的class定义变化样式，通过js改变dom元素的class实现样式变化。
    
-   2.Vant组件的设计稿尺寸是375px，可用通过覆盖:root下的Vant的css变量中px单位的方式，对Vant组件做适配
    

3.vue模板中的px单位不会被转换，如需转换请使用postcss-style-px-to-viewport<sup data-darkreader-inline-outline="" data-darkreader-inline-color="">[2]</sup>工具

本文仅代表个人观点，非喜勿喷。

### 参考资料

\[1\]

https://evilmartians.com/chronicles/postcss-8-plugin-migration: _https://link.juejin.cn?target=https%3A%2F%2Fevilmartians.com%2Fchronicles%2Fpostcss-8-plugin-migration_

\[2\]

https://www.npmjs.com/package/postcss-style-px-to-viewport: _https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpostcss-style-px-to-viewport_

\---END---

**推荐↓↓↓**