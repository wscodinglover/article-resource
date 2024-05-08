**点击蓝字**

![Image](https://mmbiz.qpic.cn/mmbiz_gif/JaFvPvvA2J2EKZG0pxkE0JiaTtAyroUCMbhVvIsDOf5KjMe4velPPKybLkQI63qv51kZzJl4G5OQPVExYhAVhqg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

**关注我们**

本文由 TinyVue 组件库核心成员郑志超分享，首先分享了实现跨框架组件库的必要性，同时通过演示demo和实际操作向我们介绍了如何实现一个跨框架的组件库。

**前言**

**前端组件库跨框架是什么？**

前端组件库跨框架是指在不同的前端框架（如 React、Vue、Solid 等）之间共享和复用组件的能力。这种能力可以让开发者在不同的项目中使用同一套组件库，从而提高开发效率和代码复用性。

**为什么需要做前端组件库跨框架？**

首先，不同的前端框架有不同的语法和 API，如果每个框架都要写一套组件库，那么开发成本和维护成本都会很高。其次，跨框架的组件库可以让开发者更加灵活地选择框架，而不必担心组件库的兼容性问题。而 TinyVue 组件库在实现跨框架之前也经历了三个阶段。

#### **第一个阶段：**

2019年初，当时 Vue 3.0 还未发布，TinyVue创始团队 率先使用了 @vue/composition-api 和 renderless 无渲染函数隔离模板、样式和逻辑代码；经过两年的发展，支持的项目达到了800+，同时因为组件功能的丰富，代码量也达到了20w+。

#### **第二个阶段：**

2021年初，当时 Vue 3.0 已经发展了半年有余，各个方面已经逐步完善，TinyVue 支持的项目由 Vue2.0 切换 Vue3.0 的意愿日渐强烈；但是又苦于没有支持 Vue 3.0 的组件库； 于是 TinyVue 基于@vue/composition-api 和 renderless的架构的巨大优势体现了出来，在短短两个月通过适配层 vue-common 将 20w+ 行代码全部适配了 Vue3.0， 极大的减少了开发成本。2021年10月 TinyVue 组件库实现了一套代码同时支持 Vue2.0 和 Vue3.0 。

#### **第三个阶段：**

2023年6月，TinyVue 团队需要和开源的 openInula（完全兼容 React ）框架合作共同开发 Inula 组件库，并且通过中科院软件所的开源之夏活动与开发者共建 OpenTiny React 组件库。在此过程中，充分利用 TinyVue 的模板与逻辑分离的架构，完成了开发可以适配 React 的 common 适配层，并已完成 4 个 React 组件的开发，并且完全复用了 renderless 无渲染层的逻辑。

为了更好的理解，可以参考以下 TinyVue 组件库的架构图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过前端组件库跨框架，可以达到以下效果：

1\. 提高开发效率和代码复用性，减少重复开发的工作量。

2\. 统一 UI 风格和交互体验，提高产品的一致性和可用性。

3\. 支持多种前端框架，让开发者更加灵活地选择框架。

4\. 降低维护成本，减少代码冗余和重复的工作。

总之，前端组件库跨框架可以帮助开发者更加高效地开发和维护前端应用，提高产品的质量和用户体验。

**如何开发**

要实现前端组件库跨框架，需要使用一些技术手段。本文将要演示如何通过 common 适配层和 renderless 无渲染逻辑层实现跨框架组件库。

### **温馨提示：**本文涉及到的代码较多，所以无法将所有代码都罗列出来，因此演示流程主要以分析思路为主，如果想要运行完整流程建议下载演示 Demo 查看源码和展示效果（文章最后会介绍如何下载和运行）

### 因为 TinyVue 组件库已具备同时兼容 Vue2 和 Vue3 的能力，所以本文以 React 和 Solid 为例，介绍如何开发一套复用现有 TinyVue 代码逻辑的跨框架组件库

**首先开发 React 和 Solid 跨框架组件库主要分为几个步骤：**

1、使用 pnpm 管理 monorepo 工程的组件库，可以更好的管理本地和线上依赖包。

2、创建 React 框架和 Solid 框架的 common 适配层，目的是抹平不同框架之间的差异，并对接 renderless 无渲染逻辑层。

3、实现无渲染逻辑层 renderless，目的是抽离与框架和渲染无关的业务逻辑，然后复用这部分逻辑。

4、创建模板层去对接 common 适配层和 renderless 无渲染层，从而实现了框架、模板和业务逻辑的分离。

下面演示下如何开发一个跨框架的组件库

## **一、使用 pnpm 管理 monorepo 工程的组件库**

1、创建 monorepo 工程文件夹，使用 gitbash 输入以下命令（**以下所有命令均在 gitbase 环境下运行**）

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>mkdir&nbsp;cross-framework-component<br><br>cd&nbsp;cross-framework-component<br><br>#&nbsp;创建多包目录<br>mkdir&nbsp;packages</code>
```

2、在根目录下创建 package.json，并修改其内容

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>npm&nbsp;init&nbsp;-y</code>
```

package.json 内容主要分为两块：

（1）定义包管理工具和一些启动工程的脚本：

-   "preinstall": "npx only-allow pnpm"  -- 本项目只允许使用 pnpm 管理依赖
    
-   "dev": "node setup.js" -- 启动无界微前端的主工程和所有子工程
    
-   "dev:home": "pnpm -C packages/home dev" -- 启动无界微前端的主工程（Vue3 框架）
    
-   "dev:react": "pnpm -C packages/react dev" -- 启动无界微前端的 React 子工程
    
-   "dev:solid": "pnpm -C packages/solid dev" -- 启动无界微前端的 Solid 子工程
    
-   "dev:vue2": "pnpm -C packages/vue2 dev" -- 启动无界微前端的 Vue2 子工程
    
-   "dev:vue3": "pnpm -C packages/vue3 dev" -- 启动无界微前端的 Vue3 子工程
    

（2）解决一些 pnpm 针对 Vue 不同版本（Vue2、Vue3）的依赖冲突，packageExtensions 项可以让 Vue2 相关依赖可以找到正确的 Vue 版本，从而可以正常加载 Vue2 和 Vue3 的组件。

package.json 内容如下：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/cross-framework"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;"description":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"main":&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;"scripts":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"preinstall":&nbsp;<span data-darkreader-inline-color="">"npx&nbsp;only-allow&nbsp;pnpm"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev":&nbsp;<span data-darkreader-inline-color="">"node&nbsp;setup.js"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev:home":&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;-C&nbsp;packages/home&nbsp;dev"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev:react":&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;-C&nbsp;packages/react&nbsp;dev"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev:solid":&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;-C&nbsp;packages/solid&nbsp;dev"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev:vue2":&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;-C&nbsp;packages/vue2&nbsp;dev"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"dev:vue3":&nbsp;<span data-darkreader-inline-color="">"pnpm&nbsp;-C&nbsp;packages/vue3&nbsp;dev"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"repository":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"type":&nbsp;<span data-darkreader-inline-color="">"git"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"keywords":&nbsp;[],<br>&nbsp;&nbsp;"author":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"license":&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;"dependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"eslint":&nbsp;<span data-darkreader-inline-color="">"8.48.0"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"pnpm":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"packageExtensions":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"vue-template-compiler@2.6.14":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"peerDependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"vue":&nbsp;<span data-darkreader-inline-color="">"2.6.14"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/vue-locale@2.9.0":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"peerDependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"vue":&nbsp;<span data-darkreader-inline-color="">"2.6.14"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/vue-common@2.9.0":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"peerDependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"vue":&nbsp;<span data-darkreader-inline-color="">"2.6.14"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}</code>
```

3、在根目录创建 pnpm-workspace.yaml 文件并配置如下：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>packages:<br>&nbsp;&nbsp;-&nbsp;packages<span data-darkreader-inline-color="">/**&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;packages文件夹下所有包含package.json的文件夹都是子包</span><span data-darkreader-inline-color=""></span></code>
```

4、创建组件源代码目录

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>cd&nbsp;packages<br>mkdir&nbsp;components<span></span></code>
```

## **二、****创建 React 框架和 Solid 框架的 common 适配层**

将整个工程创建好之后，我们需要抹平不同框架之间的差异，这样才能实现一套代码能够去支持不同的框架，那如何来抹平不同框架之间的差异呢？这里出现一个重要概念--**common 适配层** 。它用来对接纯函数 renderless 无渲染逻辑层。

下面以 React 框架及 Solid 框架为例详细介绍如何构造两个框架的 common 适配层（Vue 的原理可以类比）

1、在上文创建的 components 文件夹中创建 React 和 Solid 文件夹，并初始化 package.json

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>mkdir&nbsp;react<br>mkdir&nbsp;solid<br>cd&nbsp;react<br>npm&nbsp;init&nbsp;-y<br>cd&nbsp;../solid<br>npm&nbsp;init&nbsp;-y</code>
```

package.json 的内容主要是把 dependencies 项中@opentiny/react-button 、@opentiny/react-countdown、@opentiny/solid-button、@opentiny/solid-countdown 4个依赖指向本地组件包，这是 pnpm 提供的本地包加载方式。

具体的配置如下所示：

@opentiny/react

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/react"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;"description":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"main":&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;"scripts":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"test":&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;\"Error:&nbsp;no&nbsp;test&nbsp;specified\"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"keywords":&nbsp;[],<br>&nbsp;&nbsp;"author":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"license":&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;"dependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/react-button":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/react-countdown":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span><br>&nbsp;&nbsp;}<br>}</code>
```

@opentiny/solid

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/solid"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;"description":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"main":&nbsp;<span data-darkreader-inline-color="">"index.js"</span>,<br>&nbsp;&nbsp;"scripts":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"test":&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;\"Error:&nbsp;no&nbsp;test&nbsp;specified\"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;"keywords":&nbsp;[],<br>&nbsp;&nbsp;"author":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"license":&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;"dependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/solid-button":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/solid-countdown":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span><br>&nbsp;&nbsp;}<br>}</code>
```

2、在上文创建的 React 和 Solid 文件夹中创建适配层文件夹 common 并初始化package.json（路径：packages/components/react/common、packages/components/solid/common）

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>mkdir&nbsp;common<br>npm&nbsp;init&nbsp;-y<span></span></code>
```

package.json 内容中的一些重要依赖项及其说明：

-   "@opentiny/renderless": "workspace:~" --  使用本地的 renderless 包
    
-   "@opentiny/theme": "workspace:~" -- 使用本地的 theme 主题包
    
-   "classnames": "^2.3.2" -- 处理 html 标签的 class 类名
    
-   "ahooks": "3.7.8" -- 提供 React 响应式数据能力，对齐 Vue 的响应式数据
    

package.json 具体内容如下所示：

@opentiny/react-comon

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/react-common"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;"description":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"main":&nbsp;<span data-darkreader-inline-color="">"src/index.js"</span>,<br>&nbsp;&nbsp;"keywords":&nbsp;[],<br>&nbsp;&nbsp;"author":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"license":&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;"dependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/renderless":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/theme":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"//&nbsp;----&nbsp;处理html标签的class类名&nbsp;----":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"classnames":&nbsp;<span data-darkreader-inline-color="">"^2.3.2"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"//&nbsp;----&nbsp;提供react响应式数据能力，对齐vue的响应式数据&nbsp;----":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"ahooks":&nbsp;<span data-darkreader-inline-color="">"3.7.8"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"react":&nbsp;<span data-darkreader-inline-color="">"18.2.0"</span><br>&nbsp;&nbsp;}<br>}</code>
```

@opentiny/solid-common

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/solid-common"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;"description":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"main":&nbsp;<span data-darkreader-inline-color="">"src/index.js"</span>,<br>&nbsp;&nbsp;"keywords":&nbsp;[],<br>&nbsp;&nbsp;"author":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;"license":&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;"dependencies":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/renderless":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"@opentiny/theme":&nbsp;<span data-darkreader-inline-color="">"workspace:~"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"//&nbsp;----&nbsp;处理html标签的class类名&nbsp;----":&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"classnames":&nbsp;<span data-darkreader-inline-color="">"^2.3.2"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"solid-js":&nbsp;<span data-darkreader-inline-color="">"^1.7.8"</span><br>&nbsp;&nbsp;}<br>}<span></span></code>
```

3、在上文创建的 common 文件夹中继续创建适配层逻辑页面（路径：packages/components/react/common、packages/components/solid/common）

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97IVgaic3lyDyKWdeQQQPibBKPI46XialLA7icBgJ8kwnHVV9O3EhA6shrAxPmfhQ5xzghfLyic7D16AjT/640?wx_fmt=svg&amp;from=appmsg"></span><code>mkdir&nbsp;src<br>cd&nbsp;src<br>touch&nbsp;index.js<span></span></code>
```

React 具体的目录结构如下：

```
├─&nbsp;react<br>│&nbsp;&nbsp;├─&nbsp;common&nbsp;&nbsp;&nbsp;#&nbsp;react适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;├─&nbsp;README.md<br>│&nbsp;&nbsp;├─&nbsp;README.zh-CN.md<br>│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;button&nbsp;&nbsp;#&nbsp;react框架button组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;countdown&nbsp;&nbsp;#&nbsp;react框架倒计时组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx
```

Solid 具体的目录结构如下：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>├─&nbsp;solid<br>│&nbsp;&nbsp;├─&nbsp;common&nbsp;&nbsp;&nbsp;#&nbsp;solid适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;├─&nbsp;README.md<br>│&nbsp;&nbsp;├─&nbsp;README.zh-CN.md<br>│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;button&nbsp;&nbsp;#&nbsp;solid框架button组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;countdown&nbsp;&nbsp;#&nbsp;solid框架倒计时组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx</code>
```

4、最后把 props 和无渲染逻辑层 renderless 导出的 api 进行适配 React 的处理，以下这两段代码主要是分别从三个方面来处理这个问题。

-   **抹平响应式数据：**为 React（Solid 本身具有响应式能力）提供响应式数据能力，从而可以复用 OpentinyVue 已经写好组件的 state 数据响应能力，React 使用了 ahooks 去模拟了 Vue 的响应式数据，并且可以在响应式数据变化的时候调用 React 的setState方法，从而触发了视图的渲染；而 Solid 只需要使用 createSignal 方法去创建响应式对象，并且在模板中使用 state().xxx去使用 Solid 自带的响应式能力，从而触发视图渲染。
    
-   **抹平 Vue 的 nextTick：**使用微任务 queueMicrotask 模拟 Vue 框架的 nextTick。
    
-   **抹平事件触发机制：**使用自定义方法模拟 Vue 框架的事件触发机制 emit。
    

其中 React 具体代码如下所示（路径：packages/components/react/common/src/index.js）：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;hooks&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'react'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/theme/base/index.less'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useReactive&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'ahooks'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;使用ahooks提供的useReactive抹平vue框架的响应式数据</span><br><br><span data-darkreader-inline-color="">//&nbsp;抹平vue框架的事件触发机制</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>emit</span>&nbsp;=<br>&nbsp;&nbsp;(props)&nbsp;=&gt;<br>&nbsp;&nbsp;(evName,&nbsp;...args)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(props[evName]&nbsp;&amp;&amp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;props[evName]&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props[evName](...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br><span data-darkreader-inline-color="">//&nbsp;抹平vue框架的nextTick，等待&nbsp;dom&nbsp;更新后触发回调</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useNextTick</span>&nbsp;=&nbsp;(callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>queueMicrotask</span>(callback)<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useSetup</span>&nbsp;=&nbsp;({<br>&nbsp;&nbsp;props,&nbsp;//&nbsp;模板层传递过来的props属性<br>&nbsp;&nbsp;renderless,&nbsp;//&nbsp;renderless无渲染函数<br>&nbsp;&nbsp;extendOptions&nbsp;=&nbsp;{&nbsp;framework:&nbsp;<span data-darkreader-inline-color="">'React'</span>&nbsp;}&nbsp;//&nbsp;模板层传递过来的额外参数<br>})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;render&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;props.tiny_renderless&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;props.tiny_renderless<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;renderless<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;utils&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;parent:&nbsp;{},<br>&nbsp;&nbsp;&nbsp;&nbsp;emit:&nbsp;<span>emit</span>(props)<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;sdk&nbsp;=&nbsp;<span>render</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;props,<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;...hooks,&nbsp;useReactive,&nbsp;useNextTick&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;utils,<br>&nbsp;&nbsp;&nbsp;&nbsp;extendOptions<br>&nbsp;&nbsp;)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;...sdk,<br>&nbsp;&nbsp;&nbsp;&nbsp;type:&nbsp;props.type&nbsp;??&nbsp;<span data-darkreader-inline-color="">'default'</span><br>&nbsp;&nbsp;}<br>}</code>
```

其中 Solid 具体代码如下所示（路径：packages/components/solid/common/src/index.js)：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;hooks&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'solid-js'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;createSignal&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'solid-js'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/theme/base/index.less'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">EVENTS_PREFIX</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">'on'</span><br><br><span data-darkreader-inline-color="">//&nbsp;处理solid事件触发机制</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>emit</span>&nbsp;=<br>&nbsp;&nbsp;(props)&nbsp;=&gt;<br>&nbsp;&nbsp;(evName,&nbsp;...args)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;eventsName&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${EVENTS_PREFIX}</span><span data-darkreader-inline-color="">${evName[<span data-darkreader-inline-color="">0</span>].toLocaleUpperCase()}</span><span data-darkreader-inline-color="">${evName.slice(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">1</span><br>&nbsp;&nbsp;&nbsp;&nbsp;)}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(props[eventsName]&nbsp;&amp;&amp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;props[eventsName]&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props[eventsName](...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useSetState</span>&nbsp;=&nbsp;(initialState)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;equals:&nbsp;false&nbsp;配置非常重要，保证state对象属性发生变化后视图可以更新</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[state,&nbsp;setState]&nbsp;=&nbsp;<span>createSignal</span>(initialState,&nbsp;{&nbsp;equals:&nbsp;<span data-darkreader-inline-color="">false</span>&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;[state,&nbsp;setState]<br>}<br><br><span data-darkreader-inline-color="">// props 应该不用做处理， props 都是 . 访问。</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useReactive</span>&nbsp;=&nbsp;(staticObject)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[state,&nbsp;setState]&nbsp;=&nbsp;<span>useSetState</span>(staticObject)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;state,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里提供代理对象提供给renderless无渲染层使用</span><br>&nbsp;&nbsp;&nbsp;&nbsp;proxy:&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(<span>state</span>(),&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>get</span>(target,&nbsp;property)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">typeof</span>&nbsp;target[property]&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[property](target)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[property]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>(target,&nbsp;property,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Reflect</span>.<span>set</span>(target,&nbsp;property,&nbsp;value)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>setState</span>((val)&nbsp;=&gt;&nbsp;val)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;nextTick，&nbsp;等待&nbsp;dom&nbsp;更新后触发回调</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useNextTick</span>&nbsp;=&nbsp;(callback)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>queueMicrotask</span>(callback)<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;emitEvent,&nbsp;dispath,&nbsp;broadcast</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>emitEvent</span>&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>broadcast</span>&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">''</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;dispatch:&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">''</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;broadcast<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>useSetup</span>&nbsp;=&nbsp;({<br>&nbsp;&nbsp;props,<br>&nbsp;&nbsp;renderless,<br>&nbsp;&nbsp;extendOptions&nbsp;=&nbsp;{&nbsp;framework:&nbsp;<span data-darkreader-inline-color="">'Solid'</span>&nbsp;}<br>})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;render&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;props.tiny_renderless&nbsp;===&nbsp;<span data-darkreader-inline-color="">'function'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;props.tiny_renderless<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;renderless<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;utils&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;parent:&nbsp;{},<br>&nbsp;&nbsp;&nbsp;&nbsp;emit:&nbsp;<span>emit</span>(props)<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;sdk&nbsp;=&nbsp;<span>render</span>(<br>&nbsp;&nbsp;&nbsp;&nbsp;props,<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;...hooks,&nbsp;useReactive,&nbsp;useNextTick&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;utils,<br>&nbsp;&nbsp;&nbsp;&nbsp;extendOptions<br>&nbsp;&nbsp;)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;...sdk,<br>&nbsp;&nbsp;&nbsp;&nbsp;type:&nbsp;props.type&nbsp;??&nbsp;<span data-darkreader-inline-color="">'default'</span><br>&nbsp;&nbsp;}<br>}</code>
```

## **三、无渲染逻辑层 renderless 实现**

#### 接下来介绍下实现跨端组件库的第二个重要概念：**renderless 无渲染层** -- 这块分为两部分：一个是与框架相关的入口函数文件（react.js、vue.js、solid.js）另外一个是与框架无关的纯函数文件（index.js）。

1、在 components 文件夹中创建 renderless 文件夹，并初始化 package.json

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>mkdir&nbsp;renderless<br>npm&nbsp;init&nbsp;-y</code>
```

package.json 文件内容如下所示（其中 exports 项表示所有加载的资源都会从 randerless 目录下的 src 文件夹中按文件路径寻找）：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>{<br>&nbsp;&nbsp;"name":&nbsp;<span data-darkreader-inline-color="">"@opentiny/renderless"</span>,<br>&nbsp;&nbsp;"version":&nbsp;<span data-darkreader-inline-color="">"3.9.0"</span>,<br>&nbsp;&nbsp;"sideEffects":&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;"type":&nbsp;<span data-darkreader-inline-color="">"module"</span>,<br>&nbsp;&nbsp;"exports":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"./package.json":&nbsp;<span data-darkreader-inline-color="">"./package.json"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;"./*":&nbsp;<span data-darkreader-inline-color="">"./src/*"</span><br>&nbsp;&nbsp;}<br>}</code>
```

2、以 React 和 Solid 为例，采用无渲染逻辑的复用方式

首先看下 renderless 需要创建的文件夹和文件（注意：这里只是罗列了 renderless 文件夹中的文件结构，外部文件结构省略了）：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>├─&nbsp;renderless<br>│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.md<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.zh-<span data-darkreader-inline-color="">CN</span>.md<br>│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;button<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;index.js&nbsp;&nbsp;#&nbsp;公共逻辑层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;react.js&nbsp;&nbsp;#&nbsp;react相关api层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;solid.js&nbsp;&nbsp;#&nbsp;solid相关api层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;vue.js&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;vue相关api层<span></span></code>
```

**react.js 和solid.js 是@opentiny/react-button 组件和****@opentiny/solid-button组件的** **renderless 入口文件，它负责去对接 React 和 Solid 的适配层@opentiny/react-common，主要功能是去调用一些 React 和 Solid 相关的 api，比如生命周期函数等，在 renderless 函数最后返回了 state 响应式对象和一些方法，提供给 React 和 Solid 的函数式组件使用。**

文件主要有两个需要注意的点：

（1）使用 common 适配层传递过来的 useReactive 函数返回基于 React 和 Solid 的响应式数据，对齐 Vue 的响应式数据

（2）使用双层函数（闭包）保存了一些组件状态，方便用户和模板层调用方法。

react.js 具体代码内容如下所示：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;handleClick,&nbsp;clearTimer&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./index'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;api&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'state'</span>,&nbsp;<span data-darkreader-inline-color="">'handleClick'</span>]<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span>renderless</span>(<br>&nbsp;&nbsp;props,<br>&nbsp;&nbsp;{&nbsp;useReactive&nbsp;},<br>&nbsp;&nbsp;{&nbsp;emit&nbsp;},<br>&nbsp;&nbsp;{&nbsp;framework&nbsp;}<br>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;利用ahooks提供的useReactive模拟vue的响应式数据，并且使用react的useRef防止响应式数据被重复执行定义</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;<span>useReactive</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;timer:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;disabled:&nbsp;!!props.disabled,<br>&nbsp;&nbsp;&nbsp;&nbsp;plain:&nbsp;props.plain,<br>&nbsp;&nbsp;&nbsp;&nbsp;formDisabled:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;api&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;state,<br>&nbsp;&nbsp;&nbsp;&nbsp;clearTimer:&nbsp;<span>clearTimer</span>(state),<br>&nbsp;&nbsp;&nbsp;&nbsp;handleClick:&nbsp;<span>handleClick</span>({&nbsp;emit,&nbsp;props,&nbsp;state,&nbsp;framework&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;api<br>}</code>
```

solid.js具体代码内容如下所示：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;handleClick,&nbsp;clearTimer&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./index'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;api&nbsp;=&nbsp;[<span data-darkreader-inline-color="">'state'</span>,&nbsp;<span data-darkreader-inline-color="">'handleClick'</span>]<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span>renderless</span>(<br>&nbsp;&nbsp;props,<br>&nbsp;&nbsp;{&nbsp;useReactive&nbsp;},<br>&nbsp;&nbsp;{&nbsp;emit&nbsp;},<br>&nbsp;&nbsp;{&nbsp;framework&nbsp;}<br>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;prox是state执行时候的原始对象的代理</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;state,&nbsp;proxy&nbsp;}&nbsp;=&nbsp;<span>useReactive</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;timer:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;disabled:&nbsp;!!props.disabled,<br>&nbsp;&nbsp;&nbsp;&nbsp;plain:&nbsp;props.plain<br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;api&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;state,<br>&nbsp;&nbsp;&nbsp;&nbsp;clearTimer:&nbsp;<span>clearTimer</span>(proxy),<br>&nbsp;&nbsp;&nbsp;&nbsp;handleClick:&nbsp;<span>handleClick</span>({&nbsp;emit,&nbsp;props,&nbsp;state:&nbsp;proxy,&nbsp;framework&nbsp;})<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;api<br>}</code>
```

**index.js 是和 React、Solid、Vue 三大框架无关只和业务逻辑有关的公共逻辑层，因此这部分代码是和框架无关的纯业务逻辑代码。**

index.js 逻辑层一般都是双层函数（闭包：函数返回函数），第一层函数保存了一些组件状态，第二层函数可以很方便的让用户和模板层调用。

这里介绍下 button 组件的纯逻辑层的两个函数：

（1）handleClick：当点击按钮时会触发 handleClick 内层函数，如果用户传递的重置时间大于零，则在点击之后会设置按钮的 disabled 属性为 true 禁用按钮，并在重置时间后解除按钮禁用，然后打印出当前逻辑触发是来自哪个框架，并向外抛出 click 点击事件；

（2）clearTimer：调用 clearTimer 方法可以快速清除组件的 timer 定时器。

具体内容如下所示：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>handleClick</span>&nbsp;=<br>&nbsp;&nbsp;({&nbsp;emit,&nbsp;props,&nbsp;state,&nbsp;framework&nbsp;})&nbsp;=&gt;<br>&nbsp;&nbsp;(event)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(props.nativeType&nbsp;===&nbsp;<span data-darkreader-inline-color="">'button'</span>&nbsp;&amp;&amp;&nbsp;props.resetTime&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state.disabled&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state.timer&nbsp;=&nbsp;<span data-darkreader-inline-color="">setTimeout</span>(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state.disabled&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;props.resetTime)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.<span>log</span>(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${framework}</span>框架代码已触发！！！！！！！！！`</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>emit</span>(<span data-darkreader-inline-color="">'click'</span>,&nbsp;event)<br>&nbsp;&nbsp;}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span>clearTimer</span>&nbsp;=&nbsp;(state)&nbsp;=&gt;&nbsp;()&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">clearTimeout</span>(state.timer)</code>
```

## **四、创建模板层去对接 common 适配层和 renderless 无渲染层**

由于需要创建的文件太多，为了方便操作，可以直接参考我们提供的示例源码工程查看（**https://github.com/opentiny/cross-framework-component/tree/master/packages/components/react/src**）

React 具体的目录结构如下：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>├─&nbsp;react<br>│&nbsp;&nbsp;├─&nbsp;common&nbsp;&nbsp;&nbsp;#&nbsp;react适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.md<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.zh-<span data-darkreader-inline-color="">CN</span>.md<br>│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;button&nbsp;&nbsp;#&nbsp;react框架button组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;countdown&nbsp;&nbsp;#&nbsp;react框架倒计时组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx</code>
```

**（https://github.com/opentiny/cross-framework-component/tree/master/packages/components/solid/src）**

Solid 具体的目录结构如下：

```
├─&nbsp;solid<br>│&nbsp;&nbsp;├─&nbsp;common&nbsp;&nbsp;&nbsp;#&nbsp;solid适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;index.js<br>│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.md<br>│&nbsp;&nbsp;├─&nbsp;<span data-darkreader-inline-color="">README</span>.zh-<span data-darkreader-inline-color="">CN</span>.md<br>│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;button&nbsp;&nbsp;#&nbsp;solid框架button组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;countdown&nbsp;&nbsp;#&nbsp;solid框架倒计时组件的模板层<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─&nbsp;package.json<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;src<br>│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─&nbsp;pc.jsx
```

这里创建的模板层和一般的 React 和 Solid 函数式组件类似，都是接受使用组件的用户传递过来的属性，并返回需要渲染的 jsx 模板。不一样的地方是：jsx 绑定的数据是通过适配层和 renderless 无渲染层处理后的数据，并且数据发生变化的时候会触发视图渲染，比如下面代码中 useSetup 方法。

pc.jsx 的具体实现如下所示（React 路径：packages/components/react/src/button/src/pc.jsx）：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;renderless&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/renderless/button/react'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//</span><span data-darkreader-inline-color="">&nbsp;renderless无渲染层</span></code><code><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useSetup&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/react-common'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;抹平不同框架的适配层</span><br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/theme/button/index.less'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;复用OpenTinyVue的样式文件</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span>Button</span>(props)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;children,<br>&nbsp;&nbsp;&nbsp;&nbsp;text,<br>&nbsp;&nbsp;&nbsp;&nbsp;autofocus,<br>&nbsp;&nbsp;&nbsp;&nbsp;round,<br>&nbsp;&nbsp;&nbsp;&nbsp;circle,<br>&nbsp;&nbsp;&nbsp;&nbsp;icon:&nbsp;<span data-darkreader-inline-color="">Icon</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;size,<br>&nbsp;&nbsp;&nbsp;&nbsp;nativeType&nbsp;=&nbsp;<span data-darkreader-inline-color="">'button'</span><br>&nbsp;&nbsp;}&nbsp;=&nbsp;props<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过common适配层的useSetup处理props和renderless无渲染层</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;handleClick,&nbsp;state,&nbsp;tabindex,&nbsp;type,&nbsp;$attrs&nbsp;}&nbsp;=&nbsp;<span>useSetup</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;props:&nbsp;{&nbsp;nativeType:&nbsp;<span data-darkreader-inline-color="">'button'</span>,&nbsp;resetTime:&nbsp;<span data-darkreader-inline-color="">1000</span>,&nbsp;...props&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;renderless<br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;className&nbsp;=&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'tiny-button'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;?&nbsp;<span data-darkreader-inline-color="">'tiny-button--'</span>&nbsp;+&nbsp;type&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;size&nbsp;?&nbsp;<span data-darkreader-inline-color="">'tiny-button--'</span>&nbsp;+&nbsp;size&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;state.disabled&nbsp;?&nbsp;<span data-darkreader-inline-color="">'is-disabled'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;state.plain&nbsp;?&nbsp;<span data-darkreader-inline-color="">'is-plain'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;round&nbsp;?&nbsp;<span data-darkreader-inline-color="">'is-round'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;circle&nbsp;?&nbsp;<span data-darkreader-inline-color="">'is-circle'</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">''</span><br>&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;.<span>join</span>(<span data-darkreader-inline-color="">'&nbsp;'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;.<span>trim</span>()<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>button</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=<span data-darkreader-inline-color="">{className}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick=<span data-darkreader-inline-color="">{handleClick}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabled=<span data-darkreader-inline-color="">{state.disabled}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;autoFocus=<span data-darkreader-inline-color="">{autofocus}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=<span data-darkreader-inline-color="">{nativeType}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tabIndex=<span data-darkreader-inline-color="">{tabindex}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{...$attrs}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Icon&nbsp;?&nbsp;<span data-darkreader-inline-color="">&lt;<span>Icon</span>&nbsp;className=<span data-darkreader-inline-color="">{text</span>&nbsp;||&nbsp;children&nbsp;?&nbsp;'is-text'&nbsp;:&nbsp;''}&nbsp;/&gt;</span>&nbsp;:&nbsp;''}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>span</span>&gt;</span>{children&nbsp;||&nbsp;text}<span data-darkreader-inline-color="">&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;)<br>}</code>
```

(Solid 路径：packages/components/solid/src/button/src/pc.jsx)：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code><span data-darkreader-inline-color="">import</span>&nbsp;renderless&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/renderless/button/solid'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;renderless无渲染层</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useSetup&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/solid-common'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;抹平不同框架的适配层</span><br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">'@opentiny/theme/button/index.less'</span>&nbsp;</code><code><span data-darkreader-inline-color="">//&nbsp;复用OpenTinyVue的样式文件</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;<span>Button</span>(props)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;children,<br>&nbsp;&nbsp;&nbsp;&nbsp;text,<br>&nbsp;&nbsp;&nbsp;&nbsp;autofocus,<br>&nbsp;&nbsp;&nbsp;&nbsp;round,<br>&nbsp;&nbsp;&nbsp;&nbsp;circle,<br>&nbsp;&nbsp;&nbsp;&nbsp;icon:&nbsp;<span data-darkreader-inline-color="">Icon</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;size,<br>&nbsp;&nbsp;&nbsp;&nbsp;nativeType&nbsp;=&nbsp;<span data-darkreader-inline-color="">'button'</span><br>&nbsp;&nbsp;}&nbsp;=&nbsp;props<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过common适配层的useSetup处理props和renderless无渲染层</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;handleClick,&nbsp;state,&nbsp;tabindex,&nbsp;type,&nbsp;$attrs&nbsp;}&nbsp;=&nbsp;<span>useSetup</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;props:&nbsp;{&nbsp;nativeType:&nbsp;<span data-darkreader-inline-color="">'button'</span>,&nbsp;resetTime:&nbsp;<span data-darkreader-inline-color="">1000</span>,&nbsp;...props&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;renderless<br>&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里需要注意在模板中需要调用state函数才能正常使用solid的响应式能力</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>button</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=<span data-darkreader-inline-color="">{[</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'tiny-button',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;?&nbsp;'tiny-button--'&nbsp;+&nbsp;type&nbsp;:&nbsp;'',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size&nbsp;?&nbsp;'tiny-button--'&nbsp;+&nbsp;size&nbsp;:&nbsp;'',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state().disabled&nbsp;?&nbsp;'is-disabled'&nbsp;:&nbsp;'',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state().plain&nbsp;?&nbsp;'is-plain'&nbsp;:&nbsp;'',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;round&nbsp;?&nbsp;'is-round'&nbsp;:&nbsp;'',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;circle&nbsp;?&nbsp;'is-circle'&nbsp;:&nbsp;''<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.join('&nbsp;')<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.trim()}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick=<span data-darkreader-inline-color="">{handleClick}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabled=<span data-darkreader-inline-color="">{state().disabled}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;autoFocus=<span data-darkreader-inline-color="">{autofocus}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=<span data-darkreader-inline-color="">{nativeType}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tabIndex=<span data-darkreader-inline-color="">{tabindex}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{...$attrs}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Icon&nbsp;?&nbsp;<span data-darkreader-inline-color="">&lt;<span>Icon</span>&nbsp;className=<span data-darkreader-inline-color="">{text</span>&nbsp;||&nbsp;children&nbsp;?&nbsp;'is-text'&nbsp;:&nbsp;''}&nbsp;/&gt;</span>&nbsp;:&nbsp;''}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>span</span>&gt;</span>{children&nbsp;||&nbsp;text}<span data-darkreader-inline-color="">&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>button</span>&gt;</span><br>&nbsp;&nbsp;)<br>}</code>
```

到此大体上描述了跨框架组件库的实现原理。

**Demo演示**

### **如果想快速查看效果和源码，可以克隆我们提供的跨框架示例 Demo，具体操作步骤如下：**

1、使用如下命令把演示 Demo 克隆到本地：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>git&nbsp;clone&nbsp;https:<span data-darkreader-inline-color="">//github.com/opentiny/cross-framework-component.git</span><span data-darkreader-inline-color=""></span></code>
```

2、使用 pnpm 下载依赖：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>pnpm&nbsp;i<br><br>#&nbsp;如果没有pnpm需要执行以下命令<br>npm&nbsp;i&nbsp;pnpm&nbsp;-g</code>
```

3、工程目录结构分析

整个工程是基于 pnpm 搭建的多包 monorepo 工程，演示环境为无界微前端环境，整体工程的目录架构如下所示（本文主要介绍 packages/components 文件夹）：

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>├─&nbsp;package.json<br>├─&nbsp;packages&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>│&nbsp;&nbsp;├─&nbsp;components&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;组件库文件夹<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;react&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;react组件库及其适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;renderless&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;跨框架复用的跨框架无渲染逻辑层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;solid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;solid组件库及其适配层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;theme&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;跨框架复用的pc端样式层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;theme-mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;移动端模板样式层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;├─&nbsp;theme-watch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;手表带模板样式层<br>│&nbsp;&nbsp;│&nbsp;&nbsp;└─&nbsp;vue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;vue组件库及其适配层<br>│&nbsp;&nbsp;├─&nbsp;element-to-opentiny&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;element-ui切换<span data-darkreader-inline-color="">OpenTiny</span>演示工程<br>│&nbsp;&nbsp;├─&nbsp;home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;基于vue3搭建无界微前端主工程<br>│&nbsp;&nbsp;├─&nbsp;react&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;基于react搭建无界微前端子工程<br>│&nbsp;&nbsp;├─&nbsp;solid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;基于solid搭建无界微前端子工程<br>│&nbsp;&nbsp;├─&nbsp;vue2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;基于vue2搭建无界微前端子工程<br>│&nbsp;&nbsp;└─&nbsp;vue3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;基于vue3搭建无界微前端子工程<br>├─&nbsp;pnpm-workspace.yaml<br>├─&nbsp;<span data-darkreader-inline-color="">README</span>.md<br>├─&nbsp;<span data-darkreader-inline-color="">README</span>.zh-<span data-darkreader-inline-color="">CN</span>.md<br>└─&nbsp;setup.js</code>
```

4、启动本地的无界微前端本地服务

```
<span data-darkreader-inline-bgcolor="" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_svg/0T8yO33zeehU2cEsz9L97GaIVx9RWpqicibjwmRCZQC2Odxc6icNK32xcK9dPcDZNhtia5ZwibyhbA6aq97SISG6QzA8M7icV0kRLD/640?wx_fmt=svg&amp;from=appmsg"></span><code>pnpm&nbsp;dev</code>
```

启动后会总共启动5个工程，1个主工程和4个子工程，其中4个子工程分别引入了不同框架的组件库，但是不同框架的组件库复用了同一份交互逻辑代码和样式文件。

效果如下图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### **如何证明 Vue2、Vue3、React、Solid 都共用了一套逻辑了呢？**

我们可以点击按钮然后会在控制台打印，当前复用逻辑层是来自哪些不同的框架的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到不同框架代码都已触发。

感兴趣的朋友可以持续关注我们TinyVue组件库。也欢迎给 TinyVue 开源项目点个 Star 🌟支持下：https://github.com/opentiny/tiny-vue

**关于 OpenTiny**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

OpenTiny 是一套企业级 Web 前端开发解决方案，提供跨端、跨框架、跨版本的 TinyVue 组件库，包含基于 Angular+TypeScript 的 TinyNG 组件库，拥有灵活扩展的低代码引擎 TinyEngine，具备主题配置系统TinyTheme / 中后台模板 TinyPro/ TinyCLI 命令行等丰富的效率提升工具，可帮助开发者高效开发 Web 应用。

___

欢迎加入 OpenTiny 开源社区。添加微信小助手：opentiny-official 一起参与交流前端技术～

OpenTiny 官网：**https://opentiny.design/**

OpenTiny 代码仓库：**https://github.com/opentiny/**

TinyEngine 源码： **https://github.com/opentiny/tiny-engine**

欢迎进入代码仓库 Star🌟TinyEngine、TinyVue、TinyNG、TinyCLI~

如果你也想要共建，可以进入代码仓库，找到 good first issue标签，一起参与开源贡献~