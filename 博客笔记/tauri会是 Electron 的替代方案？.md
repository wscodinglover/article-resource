  

大厂技术  高级前端  Node进阶

点击上方 程序员成长指北，关注公众号  

回复1，加入高级Node交流群

## 一、简介

  Tauri 是一个跨平台 GUI 框架，与 Electron 的思想基本类似。都是属于跨平台技术的解决方案

![Image](https://mmbiz.qpic.cn/mmbiz_png/T81bAV0NNN9sKMV02nIfejfVDNgsCce8G2nqumBNz9ZjYsvUgTg6D1IQIG9Zt6l5bWBVvibDKQ4WnToeJ6L8Wiaw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "![点击查看Tauri官方文档介绍")

### 优缺点快速分析

  我们一般会把tauri作为 Electron 的替代方案，electron优点咱们不看，这里就提两个electron比较明显的问题：

1.  安装包大小。Electron 应用程序需要内置 Chromium 渲染引擎和 Node.js 环境，导致项目安装包很大。
    
2.  资源占用。Electron 占用较高的 CPU 和内存资源，作为小型的工具类项目应用，用户体验会不太友好。
    
3.  启动时间稍显长。
    

  Tauri 作为一种使用 Rust 和 Web 技术栈构建跨平台桌面应用的框架。这里也分析一下它的几个优点和缺点：

-   优点
    

1.  高性能：Tauri 使用 Rust 语言编写底层代码，具有内存安全、高性能和并发性等优点。
    
2.  跨平台支持：Tauri 支持多个平台，如 Windows、macOS 和 Linux，可以帮助开发者轻松地构建跨平台的应用。
    
3.  小安装包：由于 Tauri 应用程序使用原生控件和 Web 技术结合的方式，因此安装包相对较小。
    
4.  启用时间较短。
    
5.  安全性：使用操作系统的原生 GUI 控件来创建应用程序界面，从而提高了应用程序的可访问性和安全性。
    

-   缺点
    

1.  学习成本：由于 Tauri 使用 Rust 和 Web 技术进行开发，因此需要具备一定的 Rust 和 Web 开发经验，对于新手开发者来说可能需要一定的学习成本。
    
2.  社区规模：相比于其他框架，Tauri 的社区规模还相对较小，可能需要开发者自行解决一些问题。
    
3.  可维护性：Tauri 尚处于快速发展阶段，可能存在 API 变动和不稳定的情况。以及webview也会有一些本身自带的兼容性问题等等。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对比Tauri和Electron

  总的来说，Tauri 是一种非常有潜力的框架，它可以帮助开发者快速构建高性能、跨平台的桌面应用。但是，它也存在一些学习成本和可维护性等方面的问题，需要开发者在选型的时候有更多的思考。

## 二、使用教程

### 2.1 环境准备（以mac环境为例）

  其他环境的可以参考官方教学文档，在此不做赘述

1.  安装 CLang 和 macOS 开发依赖项
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">xcode-select&nbsp;--install<br></code>
```

2.  安装Rust
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">curl&nbsp;--proto&nbsp;<span data-darkreader-inline-color="">'=https'</span>&nbsp;--tlsv1.2&nbsp;https://sh.rustup.rs&nbsp;-sSf&nbsp;|&nbsp;sh<br></code>
```

### 2.2 构建项目

  使用 pnpm 创建项目

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;create&nbsp;tauri-app<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  选择完你熟悉的项目配置后，执行提示的内容，运行项目，会自动在桌面弹出初始化的窗口

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2.3 项目构成

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   dist：web项目打包编译目录
    
-   src：vue前端页面代码（渲染进程）
    
-   src-tauri：rust相关（主进程）
    

### 2.4 完善项目配置

  完成项目内容后，我们可以在 tauri.conf.json 文件中配置 Webview 的选项，包括 Webview 库的版本、窗口大小、窗口样式、窗口标题、用户代理字符串等。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2.5 打包

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;tauri&nbsp;build<br></code>
```

  直接执行打包会直接报个错![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  将tauri.conf.js的默认配置修改为build

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  再次执行打包就好了，然后直接安装使用

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  到此为止，我们体验了一把使用 Tauri 开发桌面端应用的流程。可以感知到，它对前端开发者是比较友好的，但是如果想深入掌握它，需要学习 Rust。

## 三、整体构成

  Tauri主要基于以下几个关键技术：

1.  Rust
    
2.  Web技术
    
3.  Webview
    

  整体结构大致长这样👇🏻![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   在 Tauri 架构中，Rust 应用程序是整个系统的核心，它提供了 Tauri API 的实现。通过tauri api让 Rust 应用程序与 WebView 和 Web 内容进行交互。
    
-   WebView 是一个通用的 Web 容器，通常基于底层平台的内置 Web 技术实现，例如：macOS 上的 WKWebView 和 Windows 上的 Edge WebView。WebView 用于加载 Web 内容，使其可以显示在原生桌面应用程序中。
    
-   Web 内容是在 WebView 中加载的 HTML、CSS 和 JavaScript 代码。Tauri 可以加载远程 Web 内容，也可以加载本地 Web 内容，例如打包在原生应用程序中的 Web 资源。
    

  通过这个架构，Tauri 提供了一种快速创建跨平台原生桌面应用程序的方法，充分利用了 Rust 的性能和 Web 技术的灵活性。那么，接下来简单讲一下这三块都有哪些内容。

### 3.1  Rust

1.  语言
    
      Tauri的核心是使用 Rust 语言编写的。在 Tauri 中，Rust 代码用于调用本地操作系统的 API，实现应用的后端逻辑，并与前端 Web 技术进行交互。Rust的一些主要特性包括：
    

-   内存安全：Rust 的所有权系统可以有效避免内存泄漏和空指针等问题，确保程序在运行时不会发生崩溃。
    
-   线程安全：Rust 的并发模型允许开发者编写线程安全的代码，可以在多核处理器上并行执行，提高应用的性能。
    
-   高性能：Rust 的编译器会在编译时进行优化，生成的二进制文件具有很好的性能表现。
    
-   易于与其他语言交互：Rust 支持与其他语言进行交互，例如与 JavaScript 进行交互，这在 Tauri 中非常重要。
    
-   除了上述特性，Rust 还有其他很多特性和优点，如代码可读性、错误处理、模式匹配等，这些特性在 Tauri 中也会得到充分的发挥。
    

  总之，Tauri 的 Rust 代码是实现其核心功能的关键，使用 Rust 可以有效避免一些常见的安全漏洞，并且可以保证应用具有高性能、可靠性和扩展性。

2.  库的使用
    

  Tauri 使用了多个 Rust 库，主要包括以下几个方面：

-   底层平台库：Tauri 使用了多个底层平台库，包括 winapi（Windows 平台）、cocoa（macOS 平台）、gtk（Linux 平台）等，这些库提供了与操作系统交互的接口，使得 Tauri 可以在不同的平台上实现一致的行为，达到抹平差异的目的。
    
-   Webview 库：Tauri 使用了多个 Webview 库，包括 webview, wry, cef, tao, nwjs 等，不同的平台使用不同的 Webview 库。这些库提供了在 Rust 代码中嵌入 Webview 的能力，使得 Tauri 可以在桌面应用中集成 Web 技术。
    
-   异步编程库：Tauri 使用了 async-std 库来实现异步编程。这个库提供了基于 async/await 的异步编程模型，使得 Tauri 可以使用 Rust 的强类型和安全性，同时又能够处理异步操作。
    
-   序列化和反序列化库：Tauri 使用了 serde 库来进行数据的序列化和反序列化。这个库提供了基于属性宏的序列化和反序列化方式，使得 Tauri 可以方便地在 JavaScript 和 Rust 之间传递数据。
    
-   日志库：Tauri 使用了 env\_logger 库来进行日志记录。这个库提供了一种灵活的日志记录方式，使得 Tauri 可以在开发和调试时方便地记录日志。
    
-   其他库：除了上述库之外，Tauri 还使用了其他一些 Rust 库，包括 lazy\_static（懒加载静态变量库）、serde\_json（JSON 序列化和反序列化库）、walkdir（遍历目录和文件库）等，这些库提供了丰富的功能，使得 Tauri 可以实现更加复杂的功能。
    

### 3.2  Web

  在Tauri中，Web技术主要用于两个方面：一是创建应用程序的UI界面，二是通过Webview与Rust代码通信。

  先看看创建界面：我们可以使用HTML、CSS和JavaScript来创建应用程序的UI界面，也能够集成当前所有Web项目里头（包括React、Vue、Angular等等）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  接下来看看如何让Webview与Rust代码通信。

#### 定义Tauri事件

  可以写在main.rs里

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#[tauri::command]</span><br>fn&nbsp;hello(name:&nbsp;String)&nbsp;-&gt;&nbsp;String&nbsp;{<br>&nbsp;&nbsp;format!(<span data-darkreader-inline-color="">"Hello,&nbsp;{}!"</span>,&nbsp;name)<br>}<br><br>fn&nbsp;<span><span data-darkreader-inline-color="">main</span></span>()&nbsp;{<br>&nbsp;&nbsp;tauri::Builder::default()<br>&nbsp;&nbsp;&nbsp;&nbsp;.invoke_handler(tauri::generate_handler![hello])<br>&nbsp;&nbsp;&nbsp;&nbsp;.run(tauri::generate_context!())<br>&nbsp;&nbsp;&nbsp;&nbsp;.expect(<span data-darkreader-inline-color="">"error&nbsp;while&nbsp;running&nbsp;tauri&nbsp;application"</span>);<br>}<br></code>
```

  在上面的代码中，我们定义了一个hello函数，并使用tauri::command宏将其注册为一个Tauri事件。该函数接受一个名为name的字符串参数，并返回一个格式化的问候语

#### 在JavaScript代码中发送事件

  在JavaScript代码中，我们可以使用window.tauri.invoke方法来发送一个Tauri事件。例如，我们可以编写以下代码来调用Rust中的hello事件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">window.tauri.invoke(<span data-darkreader-inline-color="">'hello'</span>,&nbsp;{&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'Alice'</span>&nbsp;})<br>&nbsp;&nbsp;.<span data-darkreader-inline-color="">then</span>(response&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(response);&nbsp;//&nbsp;输出&nbsp;<span data-darkreader-inline-color="">"Hello,&nbsp;Alice!"</span><br>&nbsp;&nbsp;});<br></code>
```

### 3.3  Webview

  在Tauri中，Webview是负责渲染应用程序UI的核心组件。具体来说，Webview是一个用于显示网页内容的窗口，类似于浏览器中的标签页。Tauri使用Webview作为应用程序的UI引擎，并使用Rust和JavaScript代码来控制UI的行为。

  Tauri使用了一些第三方的Webview引擎，例如：webview、wry 和 cocoa webview。这些Webview引擎为Tauri提供了不同的支持平台和不同的性能特征。

  另外，Tauri提供了一组Rust API，可以用于与Webview进行交互，例如：

-   tauri::window: 用于与当前窗口进行交互。
    
-   tauri::event: 用于发送事件到Webview。
    
-   tauri::menu: 用于在Webview中创建菜单。
    

  除了使用Rust API之外，我们还可以使用JavaScript代码与Webview进行交互。例如，我们可以使用以下代码在JavaScript代码中获取Webview的引用：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">const&nbsp;webview&nbsp;=&nbsp;window.tauri.promisified({<br>&nbsp;&nbsp;cmd:&nbsp;<span data-darkreader-inline-color="">'getWebview'</span><br>});<br></code>
```

  当我们获取了Webview的引用之后，我们可以使用JavaScript API来控制Webview的行为，例如：

-   webview.addEventListener: 监听Webview事件。
    
-   webview.postMessage: 向Webview发送消息。
    
-   webview.executeJavaScript: 在Webview中执行JavaScript代码。
    

  通过使用这些API，我们可以实现高度自定义的UI界面，同时也可以方便地与Rust代码进行通信和交互。

## 四、资源 & 文档

-   Tauri官方文档 - https://tauri.app/
    
-   Awesome Tauri（精选的 Tauri 生态系统和社区中最好的东西，包含插件和应用，可以借鉴和学习） -  http://github.com/tauri-apps/awesome-tauri。
    
-   Tauri issues（Tauri问答）- http://github.com/tauri-apps/tauri/issues
    
-   Tauri discussions（Tauri讨论社区） - http://github.com/tauri-apps/tauri/discussions
    
-   Rust 编程语言基本语法学习- http://doc.rust-lang.org/book/
    
-   crates.io（Rust生态的包管理网站） - http://doc.rust-lang.org/book/
    

Node 社群  

```
<section mpa-from-tpl="t" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-tools="135编辑器" data-id="89226"><section mpa-from-tpl="t" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section><section mpa-from-tpl="t" data-style="margin-left: 10px; outline: 0px; border-top: 4px solid rgb(68, 68, 68); display: inline-block; width: 50px;" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-border-top=""><br></section></section><p data-style="outline: 0px; color: rgb(34, 34, 34); letter-spacing: 0.544px; white-space: normal; font-family: system-ui, -apple-system, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;" data-darkmode-color="rgb(196, 196, 196)" data-darkmode-original-color="rgb(34, 34, 34)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-style="outline: 0px; color: rgb(63, 63, 63); font-variant-ligatures: common-ligatures; letter-spacing: 0.544px; text-align: left; font-family: -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; word-spacing: 0.8px; caret-color: rgb(51, 51, 51);" data-darkmode-color="rgb(167, 167, 167)" data-darkmode-original-color="rgb(63, 63, 63)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline="" data-darkreader-inline-color="">我组建了一个氛围特别好的 Node.js 社群，里面有很多 Node.js小伙伴，如果你对Node.js学习感兴趣的话（后续有计划也可以），我们可以一起进行Node.js相关的交流、学习、共建。下方加 考拉 好友回复「Node」即可。</span></p><p data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><img data-cropselx1="0" data-cropselx2="147" data-cropsely1="0" data-cropsely2="178" data-fileid="100016913" data-galleryid="" data-ratio="1.29073482428115" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwtUt8z7MwaX6yicG6weUJYZ4kDUq34gs35gHuAVHnxrwxSQgclB6MXAyUIogJvUrFgZA7CuuFjNeLA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" data-type="jpeg" data-w="626" data-darkreader-inline-outline="" data-darkreader-inline-bgcolor="" data-darkreader-inline-color="" data-original-style="outline: 0px; border-style: none; background-color: rgb(36, 36, 36); color: rgb(18, 18, 18); font-family: -apple-system, system-ui, system-ui, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; display: initial; visibility: visible !important; width: 236.945px !important; --darkreader-inline-outline: initial; --darkreader-inline-bgcolor: #1b1d1e; --darkreader-inline-color: #dddad5;" data-index="14" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="236.945px" crossorigin="anonymous" alt="Image"></p><pre data-style="margin-bottom: 1rem; outline: 0px; color: rgb(0, 0, 0); font-size: 16px; letter-spacing: 0.544px; font-family: SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace; overflow: auto; font-weight: 700; background-color: rgb(255, 255, 255); text-align: center;" data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><p data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><span data-darkmode-color="rgb(255, 255, 255)" data-darkmode-original-color="rgb(255, 255, 255)" data-darkmode-bgcolor="rgb(19, 92, 224)" data-darkmode-original-bgcolor="rgb(19, 92, 224)" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;</span><span data-darkmode-color="rgb(230, 230, 230)" data-darkmode-original-color="rgb(0, 0, 0)" data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkreader-inline-outline=""><span data-darkmode-color="rgb(255, 255, 255)" data-darkmode-original-color="rgb(255, 255, 255)" data-darkmode-bgcolor="rgb(19, 92, 224)" data-darkmode-original-bgcolor="rgb(19, 92, 224)" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;“分享、点赞</span><span data-darkmode-color="rgb(255, 255, 255)" data-darkmode-original-color="rgb(255, 255, 255)" data-darkmode-bgcolor="rgb(19, 92, 224)" data-darkmode-original-bgcolor="rgb(19, 92, 224)" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">、</span><span data-darkmode-color="rgb(255, 255, 255)" data-darkmode-original-color="rgb(255, 255, 255)" data-darkmode-bgcolor="rgb(19, 92, 224)" data-darkmode-original-bgcolor="rgb(19, 92, 224)" data-darkreader-inline-outline="" data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">在看” 支持一下</span></span></p></pre>
```