## 前言

习惯使用 markdown 写作的朋友，肯定会有自己的图床，七牛云的对象存储对于个人用户每月免费 10GB，可谓是白嫖的上上之选，只需要注册后，绑定一个域名就可以使用了。

我之前使用的是一款开源的软件 PicGo，它使用的时候 Electron+vue 开发，支持七牛图床、腾讯云 COS、阿里云 OSS、GitHub 等，可谓是非常方便。

我们知道使用了 Electron 相当于打包了一个 chromium，因此安装包会比较大，今天我打算使用浏览器扩展来完成同样的功能。

## 效果演示

![Image](https://mmbiz.qpic.cn/mmbiz_png/e4YNLngAJ87K6W2okZicaS1N5ic4TCkvvxldRKnUaibKGx4dJNz2qotrbqyqnANjkzJQPJeia12hEUvBibwhbNLrAibw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

支持手动上传和剪切板上传，并且自动复制到剪切板

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "历史记录")

上传后，可以查看历史记录，点击复制 url。

由于发布的 chrome 应用市场需要 5 美元，因此只提供的源码\[1\]的安装方式，感兴趣的朋友可以安装试试。

## chrome 插件介绍

chrome 插件相当于一个静态网页，但远比静态网页功能强大，chrome 插件通常由以下几部分组成：

-   `manifest.json`：相当于插件的 meta 信息，包含插件的名称、版本号、图标、脚本文件名称等，这个文件是每个插件都必须提供的，其他几部分都是可选的。
    
-   `background script`：可以调用全部的 chrome 插件 API，实现跨域请求、网页截屏、弹出 chrome 通知消息等功能。相当于在一个隐藏的浏览器页面内默默运行。功能页面：包括点击插件图标弹出的页面（简称 popup）、插件的配置页面（简称 options）。
    
-   `content script`：是插件注入到页面的脚本。`content script` 可以操作 DOM，但是它和页面其他的脚本是隔离的，访问不到其他脚本定义的变量、函数等，相当于运行在单独的沙盒里。`content script` 可以调用有限的 chrome 插件 API，通知到 `background script` ，实现网络请求。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配置这些参数很麻烦？我们可以使用一个框架帮我们自动搞定。

## Plasmo 框架

我选用的是 Plasmo。

Plasmo 框架是一个开源的浏览器扩展 SDK，支持所有主流的浏览器，构建你的插件，无需担心配置文件编写和构建浏览器扩展时的奇怪特性，plasmo 帮助我们屏蔽了底层的差异。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   支持 React + Typescript
    
-   声明式开发，自动生成 manifest.json (MV3)
    
-   热加载
    

### 初始化项目

使用下面的命令初始化项目：

```
<section><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span></section><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">pnpm</span> dlx plasmo init<br></span><span data-darkreader-inline-border-left=""><span data-darkreader-inline-color=""># 或者使用 npm v7</span><br></span><span data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">npm</span> x plasmo init<br></span></code>
```

上面的命令会创建一个最简单的 plasmo 浏览器插件项目，结构很简单。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   `popup.tsx` 该文件为默认的弹窗窗口入口文件。这就是你在插件弹出窗口上所需的全部内容！
    
-   `assets` Plasmo 会自动生成一些小的图标并将它们从 icon512.png 文件中配置到清单中
    
-   `package.json` 处理管理依赖包，也可以管理插件的 manifest 信息
    
-   `tsconfig.json` TypeScript 配置文件
    

要开发插件，执行

```
<section><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span></section><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">pnpm</span> dev<br></span></code>
```

会在 `build/chrome-mv3-dev`目录下构建出开发中的插件代码，将这个文件夹拖入到 `chrome://extensions/` 就可以查看效果了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后将扩展程序固定到 Chrome 工具栏可以更方便访问。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

要打包插件，执行

```
<section><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span><span data-darkreader-inline-bgcolor=""></span></section><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-border-left=""><span data-darkreader-inline-color="">pnpm</span> build<br></span></code>
```

会在 `build/chrome-mv3-build`目录下， 构建出压缩后的插件代码，安装与上面的方式相同。

## 存在问题

上传图片主要使用到的是 `qiniu-js`，这个是七牛云官方的 js-sdk，大家去看文档就可以了。

由于七牛云上传 js-sdk 需要使用到 `token`，而 token 是在服务端生成的，但我们的实现的是一个 chrome 插件，也就是没有服务端， 若在纯客户端实现，需要使用到 `crypto-js`，一个加密的 JavaScript 标准库。

运行 build 会在根目录下，生成`.plasmo`文件夹，为真实的入口文件。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看出 `plasmo` 是使用 `parcel` 来打包的。现在运行 `npm run build`，会在命令行中提示以下错误。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

也没提示那个文件打包错误。

经过测试后发现，因为项目中包含 `crypto-js`，而 `crypto-js` 的加载方式是 umd，目前还没解决，这就是 plasmo 的劣势吧，其实我们可以使用 webpack 来配置实现，只不过需要手动维护 `manifest.json` 的相关信息。

以上就是本文全部内容，如果对你有帮助，可以随手点个赞，这对我真的很重要，希望这篇文章对大家有所帮助，也可以参考我往期的文章或者在评论区交流你的想法和心得，欢迎一起探索前端。

\[1\]源码： _https://github.com/maqi1520/extension-qiniu-pic_

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点个在看你最好看