## Chrome插件开发

> Chrome插件是一种方便实用的浏览器扩展程序，可以增强用户的浏览器体验

## 前言

大家好、今天带大家一起学习Chrome插件开发的知识。基于Manifest V3版本的；

本篇文章，是一个插件开发的实战教程，通过实战，来学习Chrome插件开发的相关知识。

通过这篇文章，我们可以学习很多Chrome插件开发的知识:

-   插件开发流程
    
-   插件Manifest V3的配置
    
-   内容脚本content\_scripts相关知识
    
-   插件配置页面options\_page相关开发
    
-   后台页面background（service\_worker）相关知识
    
-   chrome.action，如：downloads
    
-   插件数据存储机制
    
-   消息通信机制
    
-   右键菜单
    
-   徽章配置
    

## 前置知识

在开始开发Chrome插件前，我们需要掌握一些基础知识，包括：

-   HTML、CSS、JavaScript的基础语法和操作
    
-   插件开发的基础知识。比如：`Manifest`
    

接下来跟大家一起开发吧。

## 功能介绍

我们要基于`Manifest V3`来开发这个插件。因为V2即将要遗弃了。

开始吧！

首先，给插件取个响亮的名字：`DragonFly（飞龙在天）`

当然，如果只是是名字好听，是没啥用的，得有内涵。它有以下功能。

1.  显示图片信息
    
2.  图片下载
    
3.  支持批量下载
    
4.  支持图片过滤配置
    
5.  显示图片数量
    

这里再介绍一下这个插件的应用场景。

1.  安装插件
    
2.  打开网页
    
3.  插件初始化，注入脚本
    
4.  脚本中获取img元素，给元素添加mouseover事件，用于显示图片信息（这里有问题，当img元素被其他元素遮住的时候，则获取不到这个元素）
    
5.  同时也给img元素添加dragend事件
    
6.  调用下载api进行下载图片
    

功能已经很丰富了，接下来我们开发了。

如果你还不会插件的开发知识，没关系，跟着我来一起学习

## 开始开发

### 新建项目

既然是开发工作，肯定得先建一个插件项目,怎么建呢？很简单，就是随便建一个文件夹。

```
mkdir&nbsp;dragon-fly<br>
```

ok。项目建好了。

接下来就是配置项目。配置项目呢，就得了解一下`manifest.json`配置文件

### 项目配置

接下来，编写一个`manifest.json`文件来描述你的插件。

这个文件必须放在插件的根目录中。也就是`dragon-fly`目录下。

```
{<br>&nbsp;&nbsp;<span>"manifest_version"</span>:&nbsp;<span>3</span>,<br>&nbsp;&nbsp;<span>"name"</span>:&nbsp;<span data-darkreader-inline-color="">"DragonFly（飞龙在天）"</span>,<br>&nbsp;&nbsp;<span>"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span>"description"</span>:&nbsp;<span data-darkreader-inline-color="">"一个非常高大上的图片下载插件"</span>,<br>&nbsp;&nbsp;<span>"icons"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"16"</span>:&nbsp;<span data-darkreader-inline-color="">"icon16.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"32"</span>:&nbsp;<span data-darkreader-inline-color="">"icon32.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"48"</span>:&nbsp;<span data-darkreader-inline-color="">"icon48.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"128"</span>:&nbsp;<span data-darkreader-inline-color="">"icon128.png"</span><br>&nbsp;&nbsp;}<br>}<br>
```

我们逐一解释每个属性：

-   manifest\_version: 描述manifest文件的版本号，必须为3。
    
-   name: 描述插件的名称。这个属性就是配置我们插件名称，用于显示在插件列表
    
-   version: 描述插件的版本号。
    
-   description: 描述插件的简要说明。
    
-   icons: 描述插件图标的大小和文件路径。
    

目前、我只需要这些插件配置信息就够了，只是啥功能也没有而已。

现在就可以安装一下这个插件了，感受一下吧。

> 本地插件的安装需要打开开发模式 在浏览器输入`chrome://extensions/`打开插件页面，点击右上角的开发者模式，在点击加载已解压的扩展程序，选择我们刚刚新建的那个插件项目文件夹。

可以看到插件正常显示了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 添加功能

好的,接下来，我们给插件添加第一个功能：鼠标移动到图片元素上，显示图片的信息(存储大小，真实尺寸，显示尺寸)

由于我们的插件是需要操作dom，并且不需要一直在后台运行，只需要再打开网页的时候运行。

所以我们使用内容脚本（`content_scripts`）的方式运行插件即可。（插件还支持后台页面，后面再说这个）

内容脚本（`content_scripts`）的特性:

-   在页面打开，或者页面加载结束，或者页面空闲的时候注入
    
-   共享页面dom，也就是说可以操作页面的dom
    
-   JS隔离的，插件中的js定义并不会影响页面的js，也不能引用页面中的js变量、函数
    

开始使用`content_scripts`:

`content_scripts` 有多种使用方式：

1.  静态注入。在`manifest.json`文件中声明
    
2.  动态注入。`chrome.scripting.registerContentScripts`
    
3.  编码注入。`chrome.scripting.executeScript`
    

我们一般使用静态注入。

在`manifest.json`文件中添加一下`content_scripts`配置:

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"content_scripts"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"matches"</span>:&nbsp;[<span data-darkreader-inline-color="">"https://*/*"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"js"</span>:&nbsp;[<span data-darkreader-inline-color="">"src/main.js"</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

以上代码就是静态声明了`content_scripts`。

`content_scripts`还有动态注入的方式，其实就是通过调用api的方法来注入，如下示例代码：

```
chrome.scripting<br>&nbsp;&nbsp;.registerContentScripts([{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>id</span>:&nbsp;<span data-darkreader-inline-color="">"session-script"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>js</span>:&nbsp;[<span data-darkreader-inline-color="">"content.js"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>persistAcrossSessions</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>matches</span>:&nbsp;[<span data-darkreader-inline-color="">"*://example.com/*"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>runAt</span>:&nbsp;<span data-darkreader-inline-color="">"document_start"</span>,<br>&nbsp;&nbsp;}])<br>&nbsp;&nbsp;.then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"registration&nbsp;complete"</span>))<br>&nbsp;&nbsp;.catch(<span>(<span>err</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.warn(<span data-darkreader-inline-color="">"unexpected&nbsp;error"</span>,&nbsp;err))<br>
```

动态注入可以scripts注入的时机更可控、或者可以更新、删除content\_scripts。

`content_scripts`属性是一个数组，也就是说我们可以配置多个脚本规则，数组的每个元素包含多个属性:

-   matches 指定此内容脚本将被注入到哪些页面。必填
    
-   js 要注入匹配页面的 JavaScript 文件列表。选填
    
-   css 要注入匹配页面的 CSS 文件列表。选填
    
-   run\_at 指定何时应将脚本注入页面。有三种类型,`document_start`,`document_end`,`document_idle`。默认为document\_idle。选填
    

当然了，还有一些其他很少用到的属性，这里就不介绍了。有兴趣的可以自己查看官方文档。文章最后有官方文档链接。

#### 显示图片信息

通过上面的配置，可以发现，脚本的路径为`src/main.js`,所以我们在项目根目录下新建一个`src`目录，然后再`src`目录下新建一个`mian.js`文件。

添加第一个功能,显示图片基本信息：

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;显示网络图片的内存大小<br>&nbsp;*&nbsp;<span>@param&nbsp;<span data-darkreader-inline-color="">{*}</span>&nbsp;</span>src&nbsp;<br>&nbsp;*&nbsp;<span>@returns&nbsp;</span><br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">getByte</span>(<span>src</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;fetch(src).then(<span><span data-darkreader-inline-color="">function</span>(<span>res</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;res.blob()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}).then(<span><span data-darkreader-inline-color="">function</span>(<span>data</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(data.size/(<span>1024</span>)).toFixed(<span>2</span>)+<span data-darkreader-inline-color="">'kB'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;基于dom的title属性来设置显示图片信息<br>&nbsp;*&nbsp;<span>@param&nbsp;<span data-darkreader-inline-color="">{*}</span>&nbsp;</span>el&nbsp;<br>&nbsp;*&nbsp;<span>@param&nbsp;<span data-darkreader-inline-color="">{number}</span>&nbsp;</span>byte&nbsp;zijie<br>&nbsp;*/</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">showInfo</span>(<span>el,byte</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;html=<span data-darkreader-inline-color="">`真实尺寸:<span>${el.naturalWidth}</span>*<span>${el.naturalHeight}</span>\n显示尺寸:<span>${el.width}</span>*<span>${el.height}</span>\n存储大小:<span>${byte}</span>`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;el.title=html<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;在document上代理mouseover事件<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'mouseover'</span>,<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//移动到图片元素上时、则显示信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(e.target.tagName==<span data-darkreader-inline-color="">'IMG'</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getByte(e.target.src).then(<span><span>byte</span>=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showInfo(e.target,byte)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>},<span data-darkreader-inline-color="">true</span>)<br>
```

好了，让我体验一下自己开的插件吧。

由于我们前面已经安装过插件了，所以在浏览器的插件页面直接点击插件的刷新按钮即可重新加载插件。

然后打开需要测试的网站，鼠标移动到图片上即可看到图片信息。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

#### 添加拖拽事件

接下来、我们给图片元素添加拖拽事件，因为是拖拽下载，所以我们只使用`dragend`事件即可.

在`main.js`中添加以下代码:

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;在document上代理mouseover事件<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'dragend'</span>,<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(e.target.tagName==<span data-darkreader-inline-color="">'IMG'</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//TODO&nbsp;下载</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>})<br>
```

上面代码，实现了图片的拖拽事件。接下来、要在这里实现下载功能

#### 下载功能

实现图片下载功能有俩种方式：

1.  在内容脚本(`content_scripts`)中使用原生js实现下载图片功能
    
2.  使用插件`chrome.downloads.download`API实现下载
    

原生实现下载就是我们平时在页面开发中那种。在`main.js`中直接下载就行了。

这里由于是介绍插件开发，所以我们使用`chrome.downloads.download`来实现下载。

我们需要再`manifest.json`中添加`downloads`权限来使用该api。

注意，chrome的部分api不能直接在`content_scripts`中使用，所以我们需要一个后台页面来使用这个api来实现下载。

首先，添加权限：

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"permissions"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"downloads"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

添加后台页面脚本(`background`)配置:

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"background"</span>:{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"service_worker"</span>:&nbsp;<span data-darkreader-inline-color="">"src/service_worker.js"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

通过上面的配置。

我们需要一个后台脚本(`src/service_worker.js`),在`src`目录下新建一个`service_worker.js`脚本文件

```
<span data-darkreader-inline-color="">//service_worker.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">download</span>(<span>url</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;options={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>url</span>:url<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.downloads.download(options)<br>}<br>
```

问题来了、在`content_scripts`中如何调用`background`中的函数呢？

那就是通过`页面通信`的机制来调用。

#### 页面通信

为什么需要页面通信？

> 由于`content_scripts`是在网页中运行的，而非在扩展的上下文中，因此它们通常需要某种方式与扩展的其余部分进行通信。 扩展页面（`options_page,bakcground,popup`）和内容脚本(`content_scripts`)之间的通信通过使用消息传递进行。 任何一方都可以侦听从另一端发送的消息，并在同一通道上做出响应。消息可以包含任何有效的 JSON 对象（空值、布尔值、数字、字符串、数组或对象）。

##### 发送

从内容脚本(`content_scripts`) 发送到 扩展页面（`options_page,bakcground,popup`），代码示例：

```
(<span data-darkreader-inline-color="">async</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;response&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.runtime.sendMessage({<span>greeting</span>:&nbsp;<span data-darkreader-inline-color="">"hello"</span>});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(response);<br>})();<br>
```

从扩展页面（`options_page,bakcground,popup`）发送到 内容脚本(`content_scripts`) 代码示例:

```
(<span data-darkreader-inline-color="">async</span>&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//获取当前的tab页面</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[tab]&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.query({<span>active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span>lastFocusedWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;response&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.sendMessage(tab.id,&nbsp;{<span>greeting</span>:&nbsp;<span data-darkreader-inline-color="">"hello"</span>});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(response);<br>})();<br>
```

##### 接收

接收消息的方法都是一样的，通过`runtime.onMessage`事件侦听器来处理消息

```
chrome.runtime.onMessage.addListener(<br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>request,&nbsp;sender,&nbsp;sendResponse</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(sender.tab&nbsp;?<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"from&nbsp;a&nbsp;content&nbsp;script:"</span>&nbsp;+&nbsp;sender.tab.url&nbsp;:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"from&nbsp;the&nbsp;extension"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(request.greeting&nbsp;===&nbsp;<span data-darkreader-inline-color="">"hello"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//处理完消息后、通知发送方</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sendResponse({<span>farewell</span>:&nbsp;<span data-darkreader-inline-color="">"goodbye"</span>});<br>&nbsp;&nbsp;}<br>);<br>
```

除了上面介绍`runtime.onMessage`的方式进行通信。插件还提供了长连接和消息传递API的方法来实现通信：

这里不做介绍了，可以访问官方文档(https://developer.chrome.com/docs/extensions/mv3/messaging)

接下来改造前面的下载功能，让功能可以跑起来。

#### 实现下载功能

在前面的`main.js`脚本中的`dragend`事件中，添加发送消息的代码：

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;在document上代理dragend事件<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'dragend'</span>,<span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(e.target.tagName==<span data-darkreader-inline-color="">'IMG'</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//发生消息，从content_scripts发送到扩展页面</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.runtime.sendMessage({<span>type</span>:<span data-darkreader-inline-color="">'down'</span>,<span>data</span>:e.target.src});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>})<br>
```

然后再`src/service_worker.js`中添加接收消息的处理器:

```
<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">download</span>(<span>url</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;options={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>url</span>:url<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.downloads.download(options)<br>}<br><span data-darkreader-inline-color="">//接收消息处理器</span><br>chrome.runtime.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>message,&nbsp;sender,sendResponse</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(message.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'down'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//调用下载方法</span><br>&nbsp;&nbsp;download(message.data)<br>&nbsp;}<br>});<br><br>
```

这样就完成了下载功能的开发。

安装插件试一试吧。刷新页面，鼠标移动到一个图片元素上，显示图片信息，然后拖拽一下图片，图片就下载到本地了。

完美。

接下来，我们加一点个性化的功能，比如右键菜单批量下载，配置页面实现图片过滤，在插件图标上显示当前页面上图片的数量。这些功能增加用户的体验。

#### 右键菜单

当用户在网页中单击鼠标右键时，会打开一个列有复制、粘贴等选项的菜单，即右键菜单。它可以为用户提供很多快捷便利的功能。

Chrome 将右键菜单的权限开放，因此开发者可以在里面添加一个菜单

同样、右键菜单功能需要权限配置，在`manifest.json`中添加权限配置：

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"permissions"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"contextMenus"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

同时我们需要显示一个菜单前的图标，需要再icons里配置一个16像素的图标。我们在`项目配置`章节已经配置好了。

`contextMenus`api也不能再`content_scripts`中使用。所以需要再扩展页面（后台页面）中创建菜单。

示例代码:

```
chrome.contextMenus.create({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'normal'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>title</span>:&nbsp;<span data-darkreader-inline-color="">'右键菜单'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>contexts</span>:[<span data-darkreader-inline-color="">'all'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>id</span>:<span data-darkreader-inline-color="">'menu-1'</span><br>});<br>
```

代码解释：

-   type 用于配置菜单的类型，有4中类型：普通菜单，复选菜单，单选菜单，分割线。
    
-   title 菜单的名字。
    
-   contexts 用于配置菜单在什么情况下可以显示。包括all、page、frame、selection、link、editable、image、video、audio和 launcher。
    

-   比如在有内容被选择的时候才显示菜单
    

-   id 菜单的编号，唯一。
    

同时可以给菜单配置子菜单,如：

```
chrome.contextMenus.create({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'normal'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>title</span>:&nbsp;<span data-darkreader-inline-color="">'右键菜单-子'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>contexts</span>:[<span data-darkreader-inline-color="">'all'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>id</span>:<span data-darkreader-inline-color="">'menu-2'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>parentId</span>:<span data-darkreader-inline-color="">'menu-1'</span><br>});<br>
```

这样、我们在点击右键的时候，就可以看到我们配置的菜单了。

对于我们这个插件而言，只需要1个菜单就够了。

在`src/service_worker.js`添加方法：

```
chrome.contextMenus.create({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'normal'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>title</span>:&nbsp;<span data-darkreader-inline-color="">'批量导出'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>id</span>:<span data-darkreader-inline-color="">'menu-1'</span><br>});<br>
```

由于我们需要实现一个批量导出页面上所有的图片的功能，所以需要操作dom，根据前面说的，我们需要消息机制在内容脚本（`content_scripts`）中获取图片元素的地址，然后再交给扩展页面来下载。

注意：

右键菜单的点击事件，需要通过`chrome.contextMenus.onClicked`来实现。

代码量比较多，我就直接贴代码了:

```
<span data-darkreader-inline-color="">//src/main.js&nbsp;</span><br><span data-darkreader-inline-color="">//接收扩展页面的请求，获取图片元素返回</span><br>chrome.runtime.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>message,&nbsp;sender,sendResponse</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(message.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'images'</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;imgs=<span data-darkreader-inline-color="">document</span>.querySelectorAll(<span data-darkreader-inline-color="">'img'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;srcs=<span data-darkreader-inline-color="">Array</span>.from(imgs).map(<span><span>img</span>=&gt;</span>img.src)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sendResponse(srcs);<br>&nbsp;}<br>});<br>
```

```
<span data-darkreader-inline-color="">//src/service_worker.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">download</span>(<span>url</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;options={<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>url</span>:url<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.downloads.download(options)<br>}<br><br><span data-darkreader-inline-color="">//通过消息机制获取页面上的image元素</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">onMenuClick</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//获取当前打开的tab</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[tab]&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.query({<span>active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span>lastFocusedWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//发送消息，告诉页面，我们需要获取图片元素</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;response=<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.sendMessage(tab.id,{<span>type</span>:<span data-darkreader-inline-color="">'images'</span>});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//循环下载</span><br>&nbsp;&nbsp;&nbsp;&nbsp;(response||[]).map(download)<br>}<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;添加右键菜单<br>&nbsp;*/</span><br>chrome.contextMenus.create({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'normal'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>title</span>:&nbsp;<span data-darkreader-inline-color="">'批量导出'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>contexts</span>:[<span data-darkreader-inline-color="">'all'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>id</span>:<span data-darkreader-inline-color="">'menu-1'</span><br>});<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;右键菜单点击事件<br>&nbsp;*/</span><br>chrome.contextMenus.onClicked.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>data</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(data.menuItemId==<span data-darkreader-inline-color="">'menu-1'</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onMenuClick(data)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;消息接收机制<br>&nbsp;*/</span><br>chrome.runtime.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>message,&nbsp;sender,sendResponse</span>)&nbsp;</span>{<br>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(message.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'down'</span>)&nbsp;{<br>&nbsp;&nbsp;download(message.data)<br>&nbsp;}<br>});<br><br>
```

这样就完成了右键批量下载的功能。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

#### 配置页面

上面的批量下载功能是不是很棒，但是有个问题，它会把当前页面所有的image都下载下来了，这样不好，有些图片不是我们想要的。

这个时候我们就可以通过配置页面来，实现插件的个性化配置。

在`manifest.json`中可以通过配置`options page`属性，为插件指定一个配置页面。当用户在插件图标上点击右键，选择菜单中的“选项”后，就会打开这个页面。

对于没有图标的扩展，可以在 chrome://extensions 页面中单击“选项”

那么配置的数据存在哪呢？

不用慌，chrome的插件机制提供了存储相关的api`chrome.storage`,可以实现在插件中数据共享。 一般有三种模式:

-   chrome.storage.local
    

-   数据存储在本地，在删除扩展时会被清除。配额限制约为 5 MB，但可以通过请求权限来增加"unlimitedStorage"。
    

-   chrome.storage.sync
    

-   如果启用同步，数据将同步到用户登录的任何 Chrome 浏览器。如果禁用，它的行为类似于storage.local.
    

-   chrome.storage.session
    

-   在浏览器会话期间将数据保存在内存中。默认情况下，它不会暴露给内容脚本，但可以通过设置更改此行为chrome.storage.session.setAccessLevel()。配额限制约为 10 MB。
    

开始把。

添加配置:

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"options_ui"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"page"</span>:&nbsp;<span data-darkreader-inline-color="">"./src/options.html"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"open_in_tab"</span>:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

上面配置页面，是使用窗口ui的模式打开配置页面。

或者使用下面的配置方式:

```
{<br>&nbsp;&nbsp;&nbsp;&nbsp;...,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"options_page"</span>:<span data-darkreader-inline-color="">"./src/options.html"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>}<br>
```

在新的tab里打开配置页面。

实现页面UI：

我这里为了简单实现这个UI，我集成了bootstrap ui框架，可以简单，美观的实现这个UI页面。

在src目录下添加boostrap框架，然后再options.html里引用。详细操作可以看代码。

注意:

> 扩展页面，只能通过`script`标签外链的形式引入脚本

`src/options.html`:

```
<span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>html</span>&nbsp;<span>lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>head</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>meta</span>&nbsp;<span>charset</span>=<span data-darkreader-inline-color="">"UTF-8"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>link</span>&nbsp;<span>rel</span>=<span data-darkreader-inline-color="">"stylesheet"</span>&nbsp;<span>href</span>=<span data-darkreader-inline-color="">"./vendor/bootstrap/bootstrap.min.css"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>script</span>&nbsp;<span>src</span>=<span data-darkreader-inline-color="">"./vendor/bootstrap/bootstrap.min.js"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>script</span>&nbsp;<span>src</span>=<span data-darkreader-inline-color="">"./options.js"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>head</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>body</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"mb-3"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>label</span>&nbsp;<span>for</span>=<span data-darkreader-inline-color="">"basic-url"</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"form-label"</span>&gt;</span>按域名过滤<span data-darkreader-inline-color="">&lt;/<span>label</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"input-group"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>span</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"input-group-text"</span>&gt;</span>domian:<span data-darkreader-inline-color="">&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>input</span>&nbsp;<span>id</span>=<span data-darkreader-inline-color="">"filter-url"</span>&nbsp;<span>type</span>=<span data-darkreader-inline-color="">"text"</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"form-control"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>div</span>&nbsp;<span>class</span>=<span data-darkreader-inline-color="">"form-text"</span>&gt;</span>只下载匹配该domain的图片<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>body</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>html</span>&gt;</span><br>
```

然后再新建一个`src/options.js`文件，添加以下内容:

```
<br><span data-darkreader-inline-color="">window</span>.onload=<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//定义存储key</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;FILTER_KEY=<span data-darkreader-inline-color="">'filterUrl'</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//保存用户配置</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">saveOptions</span>(<span>value</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chrome.storage.local.set(value)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//监听输入框</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'filter-url'</span>).addEventListener(<span data-darkreader-inline-color="">'change'</span>,<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;saveOptions({[FILTER_KEY]:e.target.value||<span data-darkreader-inline-color="">''</span>})<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//加在默认数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.storage.local.get([FILTER_KEY]).then(<span>(<span>result</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;value=&nbsp;result[FILTER_KEY];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'filter-url'</span>).value=value||<span data-darkreader-inline-color="">''</span><br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>}<br>
```

接着，修改`src/service_worker.js`批量下载的方法。实现根据配置信息来过滤下载：

```
<span data-darkreader-inline-color="">//通过消息机制获取页面上的image元素</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">onMenuClick</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//获取当前打开的tab</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[tab]&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.query({&nbsp;<span>active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span>lastFocusedWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//发送消息，告诉页面，我们需要获取图片元素</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;response&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.tabs.sendMessage(tab.id,&nbsp;{&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">'images'</span>&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;data=response&nbsp;||&nbsp;[]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//获取配置信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.storage.local.get([<span data-darkreader-inline-color="">'filterUrl'</span>]).then(<span>(<span>result</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;value&nbsp;=&nbsp;result[<span data-darkreader-inline-color="">'filterUrl'</span>];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//循环下载</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data.filter(<span><span>src</span>&nbsp;=&gt;</span>&nbsp;src.indexOf(value)&nbsp;!=&nbsp;<span>-1</span>).map(download)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<span data-darkreader-inline-color="">else</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data.map(download)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br>
```

一切都搞定了。然后安装插件运行一下吧。完美。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

接下来、我们在插件图标上添加一个badge，用于显示当前页面上image的数量。

#### 标题和badge

Badge

> 插件可以选择显示一个徽章，一个叠加在图标上的文本。 徽章可以很容易地更新浏览器操作以显示有关扩展状态的少量信息。

使用方法比较简单：

-   browserAction.setBadgeText 设置徽章文本
    
-   browserAction.setBadgeBackgroundColor 设置徽章背景色
    

同样这个api只能在扩展页面上使用，所以我们需要再内容脚本（`content_scripts`）中获取图片数量后，通过消息机制发送到`service_worker.js`中，然后调用api显示：

```
<span data-darkreader-inline-color="">//src/main.js&nbsp;添加一下代码</span><br><br><span data-darkreader-inline-color="">window</span>.addEventListener(<span data-darkreader-inline-color="">'load'</span>,<span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;imgs=<span data-darkreader-inline-color="">document</span>.querySelectorAll(<span data-darkreader-inline-color="">'img'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chrome.runtime.sendMessage({<span>type</span>:<span data-darkreader-inline-color="">'badge'</span>,<span>data</span>:imgs.length+<span data-darkreader-inline-color="">''</span>});<br>})<br><br>
```

由于badge text只能是string类型，所以需要将number类型转成string类型；

然后再`src/service_worker.js`添加显示徽章的方法：

```
<span data-darkreader-inline-color="">//src/service_worker.js&nbsp;添加一下代码</span><br><br>chrome.runtime.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>message,&nbsp;sender,&nbsp;sendResponse</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(message.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'down'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;download(message.data)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>(message.type==<span data-darkreader-inline-color="">'badge'</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chrome.action.setBadgeBackgroundColor({<span>color</span>:<span data-darkreader-inline-color="">'#f00'</span>})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chrome.action.setBadgeText({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>text</span>:message.data<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>});<br>
```

好了、插件就开发好了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

安装体验一下把。是不是很酷炫。

项目代码可以参考以下链接。

项目地址：https://gitee.com/jojowwbb/dragon-fly-chrome

## 参考

官方文档