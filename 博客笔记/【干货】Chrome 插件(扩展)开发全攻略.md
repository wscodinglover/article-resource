## 一、写在前面

本文所有涉及到的大部分代码均在这个demo里面：https://github.com/sxei/chrome-plugin-demo ，大家可以直接下载下来运行。

另外，本文图片较多，且图片服务器带宽有限，右下角的目录滚动监听必须等到图片全部加载完毕之后才会触发，所以请耐心等待加载完毕。

本文目录：

![Image](https://mmbiz.qpic.cn/mmbiz_png/CuarlDcuWP6xRN4WkDVsqXc1QqLia4P5Sjwx1m227hfZkPG97uhIJQHJQ8L2WMRbkkZOA00EYhTLCrI6PXPYTFA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

demo部分截图：

![Image](https://mmbiz.qpic.cn/mmbiz_png/CuarlDcuWP6xRN4WkDVsqXc1QqLia4P5SvibS9nGx7DJ53pYvxtucFrzTI3qm6PnHB54A5zTWcjj7W8AQDpeAkWQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 二、前言

## 2.1. 什么是Chrome插件

严格来讲，我们正在说的东西应该叫Chrome扩展(`Chrome Extension`)，真正意义上的Chrome插件是更底层的浏览器功能扩展，可能需要对浏览器源码有一定掌握才有能力去开发。

鉴于Chrome插件的叫法已经习惯，本文也全部采用这种叫法，但读者需深知本文所描述的Chrome插件实际上指的是Chrome扩展。

Chrome插件是一个用Web技术开发、用来增强浏览器功能的软件，它其实就是一个由HTML、CSS、JS、图片等资源组成的一个.crx后缀的压缩包.

个人猜测`crx`可能是`Chrome Extension`如下3个字母的简写：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

另外，其实不只是前端技术，Chrome插件还可以配合C++编写的dll动态链接库实现一些更底层的功能(NPAPI)，比如全屏幕截图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 由于安全原因，Chrome浏览器42以上版本已经陆续不再支持NPAPI插件，取而代之的是更安全的PPAPI。

## 2.2. 学习Chrome插件开发有什么意义

增强浏览器功能，轻松实现属于自己的“定制版”浏览器，等等。Chrome插件提供了很多实用API供我们使用，包括但不限于：

-   书签控制；
    
-   下载控制；
    
-   窗口控制；
    
-   标签控制；
    
-   网络请求控制，各类事件监听；
    
-   自定义原生菜单；
    
-   完善的通信机制；
    
-   等等；
    

## 2.3. 为什么是Chrome插件而不是Firefox插件

1.  Chrome占有率更高，更多人用；
    
2.  开发更简单；
    
3.  应用场景更广泛，Firefox插件只能运行在Firefox上，而Chrome除了Chrome浏览器之外，还可以运行在所有webkit内核的国产浏览器，比如360极速浏览器、360安全浏览器、搜狗浏览器、QQ浏览器等等；
    
4.  除此之外，Firefox浏览器也对Chrome插件的运行提供了一定的支持；
    

## 三、开发与调试

Chrome插件没有严格的项目结构要求，只要保证本目录有一个`manifest.json`即可，也不需要专门的IDE，普通的web开发工具即可。

从右上角菜单->更多工具->扩展程序可以进入 插件管理页面，也可以直接在地址栏输入 chrome://extensions 访问。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

勾选`开发者模式`即可以文件夹的形式直接加载插件，否则只能安装`.crx`格式的文件。Chrome要求插件必须从它的Chrome应用商店安装，其它任何网站下载的都无法直接安装，所以，其实我们可以把`crx`文件解压，然后通过开发者模式直接加载。

开发中，代码有任何改动都必须重新加载插件，只需要在插件管理页按下`Ctrl+R`即可，以防万一最好还把页面刷新一下。

## 四、核心介绍

## 4.1. manifest.json

这是一个Chrome插件最重要也是必不可少的文件，用来配置所有和插件相关的配置，必须放在根目录。其中，`manifest_version`、`name`、`version`3个是必不可少的，`description`和`icons`是推荐的。

下面给出的是一些常见的配置项，均有中文注释，完整的配置文档请戳这里。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;清单文件的版本，这个必须写，而且必须是2</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"manifest_version"</span>:&nbsp;<span data-darkreader-inline-color="">2</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件的名称</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"demo"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件的版本</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件描述</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"简单的Chrome扩展demo"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;图标，一般偷懒全部用一个尺寸的也没问题</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"icons"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"16"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"48"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"128"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;会一直常驻的后台JS或后台页面</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"background"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2种指定方式，如果指定JS，那么会自动生成一个背景页</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"page"</span>:&nbsp;<span data-darkreader-inline-color="">"background.html"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//"scripts":&nbsp;["js/background.js"]</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;浏览器右上角图标设置，browser_action、page_action、app必须三选一</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"browser_action"</span>:&nbsp;<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_icon"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;图标悬停时的标题，可选</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_title"</span>:&nbsp;<span data-darkreader-inline-color="">"这是一个示例Chrome插件"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_popup"</span>:&nbsp;<span data-darkreader-inline-color="">"popup.html"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;当某些特定页面打开才显示的图标</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/*"page_action":<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"default_icon":&nbsp;"img/icon.png",<br>&nbsp;&nbsp;&nbsp;&nbsp;"default_title":&nbsp;"我是pageAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;"default_popup":&nbsp;"popup.html"<br>&nbsp;&nbsp;},*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;需要直接注入页面的JS</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"content_scripts"</span>:&nbsp;<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//"matches":&nbsp;["http://*/*",&nbsp;"https://*/*"],</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;"&lt;all_urls&gt;"&nbsp;表示匹配所有地址</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"matches"</span>:&nbsp;[<span data-darkreader-inline-color="">"&lt;all_urls&gt;"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;多个JS按顺序注入</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"js"</span>:&nbsp;[<span data-darkreader-inline-color="">"js/jquery-1.8.3.js"</span>,&nbsp;<span data-darkreader-inline-color="">"js/content-script.js"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"css"</span>:&nbsp;[<span data-darkreader-inline-color="">"css/custom.css"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;代码注入的时间，可选值："document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"run_at"</span>:&nbsp;<span data-darkreader-inline-color="">"document_start"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里仅仅是为了演示content-script可以配置多个规则</span><br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"matches"</span>:&nbsp;[<span data-darkreader-inline-color="">"*://*/*.png"</span>,&nbsp;<span data-darkreader-inline-color="">"*://*/*.jpg"</span>,&nbsp;<span data-darkreader-inline-color="">"*://*/*.gif"</span>,&nbsp;<span data-darkreader-inline-color="">"*://*/*.bmp"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"js"</span>:&nbsp;[<span data-darkreader-inline-color="">"js/show-image-content-size.js"</span>]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;权限申请</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"permissions"</span>:<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"contextMenus"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;右键菜单</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"tabs"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;标签</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"notifications"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;通知</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"webRequest"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;web请求</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"webRequestBlocking"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"storage"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件本地存储</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"http://*/*"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以通过executeScript或者insertCSS访问的网站</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"https://*/*"</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以通过executeScript或者insertCSS访问的网站</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"web_accessible_resources"</span>:&nbsp;[<span data-darkreader-inline-color="">"js/inject.js"</span>],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件主页，这个很重要，不要浪费了这个免费广告位</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"homepage_url"</span>:&nbsp;<span data-darkreader-inline-color="">"https://www.baidu.com"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;覆盖浏览器默认页面</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"chrome_url_overrides"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;覆盖浏览器默认的新标签页</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"newtab"</span>:&nbsp;<span data-darkreader-inline-color="">"newtab.html"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Chrome40以前的插件配置页写法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"options_page"</span>:&nbsp;<span data-darkreader-inline-color="">"options.html"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"options_ui"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"page"</span>:&nbsp;<span data-darkreader-inline-color="">"options.html"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;添加一些默认的样式，推荐使用</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"chrome_style"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"omnibox"</span>:&nbsp;{&nbsp;<span data-darkreader-inline-color="">"keyword"</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">"go"</span>&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;默认语言</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_locale"</span>:&nbsp;<span data-darkreader-inline-color="">"zh_CN"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;devtools页面入口，注意只能指向一个HTML文件，不能是JS文件</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"devtools_page"</span>:&nbsp;<span data-darkreader-inline-color="">"devtools.html"</span><br>}<br></code>
```

## 4.2. content-scripts

所谓content-scripts，其实就是Chrome插件中向页面注入脚本的一种形式（虽然名为script，其实还可以包括css的），借助`content-scripts`我们可以实现通过配置的方式轻松向指定页面注入JS和CSS（如果需要动态注入，可以参考下文），最常见的比如：广告屏蔽、页面CSS定制，等等。

示例配置：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span>&nbsp;需要直接注入页面的JS<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"content_scripts"</span>:&nbsp;<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span><span data-darkreader-inline-color="">"matches"</span>:&nbsp;[<span data-darkreader-inline-color="">"http://*/*"</span>,&nbsp;<span data-darkreader-inline-color="">"https://*/*"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span>&nbsp;<span data-darkreader-inline-color="">"&lt;all_urls&gt;"</span>&nbsp;表示匹配所有地址<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"matches"</span>:&nbsp;[<span data-darkreader-inline-color="">"&lt;all_urls&gt;"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span>&nbsp;多个JS按顺序注入<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"js"</span>:&nbsp;[<span data-darkreader-inline-color="">"js/jquery-1.8.3.js"</span>,&nbsp;<span data-darkreader-inline-color="">"js/content-script.js"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span>&nbsp;JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"css"</span>:&nbsp;[<span data-darkreader-inline-color="">"css/custom.css"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span>&nbsp;代码注入的时间，可选值：<span data-darkreader-inline-color="">"document_start"</span>,&nbsp;<span data-darkreader-inline-color="">"document_end"</span>,&nbsp;<span data-darkreader-inline-color="">or</span>&nbsp;<span data-darkreader-inline-color="">"document_idle"</span>，最后一个表示页面空闲时，默认document_idle<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"run_at"</span>:&nbsp;<span data-darkreader-inline-color="">"document_start"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>}<br></code>
```

特别注意，如果没有主动指定`run_at`为`document_start`（默认为`document_idle`），下面这种代码是不会生效的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">document</span>.addEventListener(<span data-darkreader-inline-color="">'DOMContentLoaded'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'我被执行了！'</span>);<br>});<br></code>
```

`content-scripts`和原始页面共享DOM，但是不共享JS，如要访问页面JS（例如某个JS变量），只能通过`injected js`来实现。`content-scripts`不能访问绝大部分`chrome.xxx.api`，除了下面这4种：

-   chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
    
-   chrome.i18n
    
-   chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
    
-   chrome.storage
    

其实看到这里不要悲观，这些API绝大部分时候都够用了，非要调用其它API的话，你还可以通过通信来实现让background来帮你调用（关于通信，后文有详细介绍）。

好了，Chrome插件给我们提供了这么强大的JS注入功能，剩下的就是发挥你的想象力去玩弄浏览器了。

## 4.3. background

后台（姑且这么翻译吧），是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面。

background的权限非常高，几乎可以调用所有的Chrome扩展API（除了devtools），而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置`CORS`。

> 经过测试，其实不止是background，所有的直接通过`chrome-extension://id/xx.html`这种方式打开的网页都可以无限制跨域。

配置中，`background`可以通过`page`指定一张网页，也可以通过`scripts`直接指定一个JS，Chrome会自动为这个JS生成一个默认的网页：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;会一直常驻的后台JS或后台页面</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"background"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;2种指定方式，如果指定JS，那么会自动生成一个背景页</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"page"</span>:&nbsp;<span data-darkreader-inline-color="">"background.html"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//"scripts":&nbsp;["js/background.js"]</span><br>&nbsp;&nbsp;},<br>}<br></code>
```

需要特别说明的是，虽然你可以通过`chrome-extension://xxx/background.html`直接打开后台页，但是你打开的后台页和真正一直在后台运行的那个页面不是同一个，换句话说，你可以打开无数个`background.html`，但是真正在后台常驻的只有一个，而且这个你永远看不到它的界面，只能调试它的代码。

## 4.4. event-pages

这里顺带介绍一下event-pages，它是一个什么东西呢？鉴于background生命周期太长，长时间挂载后台可能会影响性能，所以Google又弄一个`event-pages`，在配置文件上，它与background的唯一区别就是多了一个`persistent`参数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"background"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;[<span data-darkreader-inline-color="">"event-page.js"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"persistent"</span>:&nbsp;<span data-darkreader-inline-color="">false</span><br>&nbsp;&nbsp;},<br>}<br></code>
```

它的生命周期是：在被需要时加载，在空闲时被关闭，什么叫被需要时呢？比如第一次安装、插件更新、有content-script向它发送消息，等等。

除了配置文件的变化，代码上也有一些细微变化，个人这个简单了解一下就行了，一般情况下background也不会很消耗性能的。

## 4.5. popup

`popup`是点击`browser_action`或者`page_action`图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`popup`可以包含任意你想要的HTML内容，并且会自适应大小。可以通过`default_popup`字段来指定popup页面，也可以调用`setPopup()`方法。配置方式：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"browser_action"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_icon"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;图标悬停时的标题，可选</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_title"</span>:&nbsp;<span data-darkreader-inline-color="">"这是一个示例Chrome插件"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_popup"</span>:&nbsp;<span data-darkreader-inline-color="">"popup.html"</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

需要特别注意的是，由于单击图标打开popup，焦点离开又立即关闭，所以popup页面的生命周期一般很短，需要长时间运行的代码千万不要写在popup里面。

在权限上，它和background非常类似，它们之间最大的不同是生命周期的不同，popup中可以直接通过`chrome.extension.getBackgroundPage()`获取background的window对象。

## 4.6. injected-script

这里的`injected-script`是我给它取的，指的是通过DOM操作的方式向页面注入的一种JS。为什么要把这种JS单独拿出来讨论呢？又或者说为什么需要通过这种方式注入JS呢？

这是因为`content-script`有一个很大的“缺陷”，也就是无法访问页面中的JS，虽然它可以操作DOM，但是DOM却不能调用它，也就是无法在DOM中通过绑定事件的方式调用`content-script`中的代码（包括直接写`onclick`和`addEventListener`2种方式都不行），但是，“在页面上添加一个按钮并调用插件的扩展API”是一个很常见的需求，那该怎么办呢？其实这就是本小节要讲的。

在`content-script`中通过DOM方式向页面注入`inject-script`代码示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;向页面注入JS</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">injectCustomJs</span>(<span>jsPath</span>)<br></span>{<br>&nbsp;&nbsp;jsPath&nbsp;=&nbsp;jsPath&nbsp;||&nbsp;<span data-darkreader-inline-color="">'js/inject.js'</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;temp&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'script'</span>);<br>&nbsp;&nbsp;temp.setAttribute(<span data-darkreader-inline-color="">'type'</span>,&nbsp;<span data-darkreader-inline-color="">'text/javascript'</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js</span><br>&nbsp;&nbsp;temp.src&nbsp;=&nbsp;chrome.extension.getURL(jsPath);<br>&nbsp;&nbsp;temp.onload&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;放在页面不好看，执行完后移除掉</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.parentNode.removeChild(<span data-darkreader-inline-color="">this</span>);<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.head.appendChild(temp);<br>}<br><br></code>
```

你以为这样就行了？执行一下你会看到如下报错：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Denying&nbsp;<span data-darkreader-inline-color="">load</span>&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;chrome-extension://efbllncjkjiijkppagepehoekjojdclc/js/inject.js.&nbsp;Resources&nbsp;must&nbsp;be&nbsp;listed&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;the&nbsp;web_accessible_resources&nbsp;manifest&nbsp;<span data-darkreader-inline-color="">key</span>&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;<span data-darkreader-inline-color="">order</span>&nbsp;<span data-darkreader-inline-color="">to</span>&nbsp;be&nbsp;loaded&nbsp;<span data-darkreader-inline-color="">by</span>&nbsp;pages&nbsp;outside&nbsp;the&nbsp;extension.<br></code>
```

意思就是你想要在web中直接访问插件中的资源的话必须显示声明才行，配置文件中增加如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"web_accessible_resources"</span>:&nbsp;[<span data-darkreader-inline-color="">"js/inject.js"</span>],<br>}<br></code>
```

至于`inject-script`如何调用`content-script`中的代码，后面我会在专门的一个消息通信章节详细介绍。

## 4.7. homepage\_url

开发者或者插件主页设置，一般会在如下2个地方显示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 五、Chrome插件的8种展示形式

## 5.1. browserAction(浏览器右上角)

通过配置`browser_action`可以在浏览器的右上角增加一个图标，一个`browser_action`可以拥有一个图标，一个`tooltip`，一个`badge`和一个`popup`。

示例配置如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">"browser_action"</span>:<br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_icon"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_title"</span>:&nbsp;<span data-darkreader-inline-color="">"这是一个示例Chrome插件"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_popup"</span>:&nbsp;<span data-darkreader-inline-color="">"popup.html"</span><br>}<br></code>
```

### 5.1.1. 图标

`browser_action`图标推荐使用宽高都为19像素的图片，更大的图标会被缩小，格式随意，一般推荐png，可以通过manifest中`default_icon`字段配置，也可以调用setIcon()方法。

### 5.1.2. tooltip

修改`browser_action`的manifest中`default_title`字段，或者调用`setTitle()`方法。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.1.3. badge

所谓`badge`就是在图标上显示一些文本，可以用来更新一些小的扩展状态提示信息。因为badge空间有限，所以只支持4个以下的字符（英文4个，中文2个）。

badge无法通过配置文件来指定，必须通过代码实现，设置badge文字和颜色可以分别使用`setBadgeText()`和`setBadgeBackgroundColor()`。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.browserAction</span><span data-darkreader-inline-color="">.setBadgeText</span>({<span data-darkreader-inline-color="">text</span>:&nbsp;<span data-darkreader-inline-color="">'new'</span>});<br><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.browserAction</span><span data-darkreader-inline-color="">.setBadgeBackgroundColor</span>({<span data-darkreader-inline-color="">color</span>:&nbsp;[<span data-darkreader-inline-color="">255</span>,&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;<span data-darkreader-inline-color="">255</span>]});<br></code>
```

效果：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 5.2. pageAction(地址栏右侧)

所谓`pageAction`，指的是只有当某些特定页面打开才显示的图标，它和`browserAction`最大的区别是一个始终都显示，一个只在特定情况才显示。

需要特别说明的是早些版本的Chrome是将pageAction放在地址栏的最右边，左键单击弹出popup，右键单击则弹出相关默认的选项菜单：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而新版的Chrome更改了这一策略，pageAction和普通的browserAction一样也是放在浏览器右上角，只不过没有点亮时是灰色的，点亮了才是彩色的，灰色时无论左键还是右键单击都是弹出选项：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 具体是从哪一版本开始改的没去仔细考究，反正知道v50.0的时候还是前者，v58.0的时候已改为后者。

调整之后的`pageAction`我们可以简单地把它看成是可以置灰的`browserAction`。

-   chrome.pageAction.show(tabId) 显示图标；
    
-   chrome.pageAction.hide(tabId) 隐藏图标；
    

示例(只有打开百度才显示图标)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;manifest.json</span><br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"page_action"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_icon"</span>:&nbsp;<span data-darkreader-inline-color="">"img/icon.png"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_title"</span>:&nbsp;<span data-darkreader-inline-color="">"我是pageAction"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_popup"</span>:&nbsp;<span data-darkreader-inline-color="">"popup.html"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"permissions"</span>:&nbsp;[<span data-darkreader-inline-color="">"declarativeContent"</span>]<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;background.js</span><br>chrome.runtime.onInstalled.addListener(<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{<br>&nbsp;&nbsp;chrome.declarativeContent.onPageChanged.removeRules(<span data-darkreader-inline-color="">undefined</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.declarativeContent.onPageChanged.addRules([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">conditions</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;只有打开百度才显示pageAction</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;chrome.declarativeContent.PageStateMatcher({<span data-darkreader-inline-color="">pageUrl</span>:&nbsp;{<span data-darkreader-inline-color="">urlContains</span>:&nbsp;<span data-darkreader-inline-color="">'baidu.com'</span>}})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">actions</span>:&nbsp;[<span data-darkreader-inline-color="">new</span>&nbsp;chrome.declarativeContent.ShowPageAction()]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;]);<br>&nbsp;&nbsp;});<br>});<br></code>
```

效果图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 5.3. 右键菜单

通过开发Chrome插件可以自定义浏览器的右键菜单，主要是通过`chrome.contextMenus`API实现，右键菜单可以出现在不同的上下文，比如普通页面、选中的文字、图片、链接，等等，如果有同一个插件里面定义了多个菜单，Chrome会自动组合放到以插件名字命名的二级菜单里，如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.3.1. 最简单的右键菜单示例

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;manifest.json</span><br>{<span data-darkreader-inline-color="">"permissions"</span>:&nbsp;[<span data-darkreader-inline-color="">"contextMenus"</span>]}<br><br><span data-darkreader-inline-color="">//&nbsp;background.js</span><br>chrome.contextMenus.create({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">"测试右键菜单"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">onclick</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{alert(<span data-darkreader-inline-color="">'您点击了右键菜单！'</span>);}<br>});<br></code>
```

效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.3.2. 添加右键百度搜索

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;manifest.json</span><br>{<span data-darkreader-inline-color="">"permissions"</span>:&nbsp;[<span data-darkreader-inline-color="">"contextMenus"</span>，&nbsp;<span data-darkreader-inline-color="">"tabs"</span>]}<br><br><span data-darkreader-inline-color="">//&nbsp;background.js</span><br>chrome.contextMenus.create({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">'使用度娘搜索：%s'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;%s表示选中的文字</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">contexts</span>:&nbsp;[<span data-darkreader-inline-color="">'selection'</span>],&nbsp;<span data-darkreader-inline-color="">//&nbsp;只有当选中文字时才会出现此右键菜单</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">onclick</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>params</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注意不能使用location.href，因为location是属于background的window对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.tabs.create({<span data-darkreader-inline-color="">url</span>:&nbsp;<span data-darkreader-inline-color="">'https://www.baidu.com/s?ie=utf-8&amp;wd='</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">encodeURI</span>(params.selectionText)});<br>&nbsp;&nbsp;}<br>});<br></code>
```

效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.3.3. 语法说明

这里只是简单列举一些常用的，完整API参见：https://developer.chrome.com/extensions/contextMenus

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">chrome.contextMenus.create({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'normal'</span>，&nbsp;//&nbsp;类型，可选：[<span data-darkreader-inline-color="">"normal"</span>,&nbsp;<span data-darkreader-inline-color="">"checkbox"</span>,&nbsp;<span data-darkreader-inline-color="">"radio"</span>,&nbsp;<span data-darkreader-inline-color="">"separator"</span>]，默认&nbsp;normal<br>&nbsp;&nbsp;title:&nbsp;<span data-darkreader-inline-color="">'菜单的名字'</span>,&nbsp;//&nbsp;显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s显示选定的文本<br>&nbsp;&nbsp;contexts:&nbsp;[<span data-darkreader-inline-color="">'page'</span>], //&nbsp;上下文环境，可选：[<span data-darkreader-inline-color="">"all"</span>,&nbsp;<span data-darkreader-inline-color="">"page"</span>,&nbsp;<span data-darkreader-inline-color="">"frame"</span>,&nbsp;<span data-darkreader-inline-color="">"selection"</span>,&nbsp;<span data-darkreader-inline-color="">"link"</span>,&nbsp;<span data-darkreader-inline-color="">"editable"</span>,&nbsp;<span data-darkreader-inline-color="">"image"</span>,&nbsp;<span data-darkreader-inline-color="">"video"</span>,&nbsp;<span data-darkreader-inline-color="">"audio"</span>]，默认page<br>&nbsp;&nbsp;onclick:&nbsp;<span><span data-darkreader-inline-color="">function</span></span>(){},&nbsp;//&nbsp;单击时触发的方法<br>&nbsp; parentId: 1, //&nbsp;右键菜单项的父菜单项ID。指定父菜单项将会使此菜单项成为父菜单项的子菜单<br>&nbsp;&nbsp;documentUrlPatterns:&nbsp;<span data-darkreader-inline-color="">'https://*.baidu.com/*'</span>&nbsp;//&nbsp;只在某些页面显示此右键菜单<br>});<br>//&nbsp;删除某一个菜单项<br>chrome.contextMenus.remove(menuItemId)；<br>//&nbsp;删除所有自定义右键菜单<br>chrome.contextMenus.removeAll();<br>//&nbsp;更新某一个菜单项<br>chrome.contextMenus.update(menuItemId,&nbsp;updateProperties);<br></code>
```

## 5.4. override(覆盖特定页面)

使用`override`页可以将Chrome默认的一些特定页面替换掉，改为使用扩展提供的页面。

扩展可以替代如下页面：

-   历史记录：从工具菜单上点击历史记录时访问的页面，或者从地址栏直接输入 chrome://history
    
-   新标签页：当创建新标签的时候访问的页面，或者从地址栏直接输入 chrome://newtab
    
-   书签：浏览器的书签，或者直接输入 chrome://bookmarks
    

注意：

-   一个扩展只能替代一个页面；
    
-   不能替代隐身窗口的新标签页；
    
-   网页必须设置title，否则用户可能会看到网页的URL，造成困扰；
    

下面的截图是默认的新标签页和被扩展替换掉的新标签页。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)代码（注意，一个插件只能替代一个默认页，以下仅为演示）：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">"chrome_url_overrides"</span>:<br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"newtab"</span>:&nbsp;<span data-darkreader-inline-color="">"newtab.html"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"history"</span>:&nbsp;<span data-darkreader-inline-color="">"history.html"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"bookmarks"</span>:&nbsp;<span data-darkreader-inline-color="">"bookmarks.html"</span><br>}<br></code>
```

## 5.5. devtools(开发者工具)

### 5.5.1. 预热

使用过vue的应该见过这种类型的插件：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

是的，Chrome允许插件在开发者工具(devtools)上动手脚，主要表现在：

-   自定义一个和多个和`Elements`、`Console`、`Sources`等同级别的面板；
    
-   自定义侧边栏(sidebar)，目前只能自定义`Elements`面板的侧边栏；
    

先来看2张简单的demo截图，自定义面板（判断当前页面是否使用了jQuery）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

自定义侧边栏（获取当前页面所有图片）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.5.2. devtools扩展介绍

主页：https://developer.chrome.com/extensions/devtools

来一张官方图片：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

每打开一个开发者工具窗口，都会创建devtools页面的实例，F12窗口关闭，页面也随着关闭，所以devtools页面的生命周期和devtools窗口是一致的。devtools页面可以访问一组特有的`DevTools API`以及有限的扩展API，这组特有的`DevTools API`只有devtools页面才可以访问，background都无权访问，这些API包括：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.devtools</span><span data-darkreader-inline-color="">.panels</span>：面板相关；<br><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.devtools</span><span data-darkreader-inline-color="">.inspectedWindow</span>：获取被审查窗口的有关信息；<br><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.devtools</span><span data-darkreader-inline-color="">.network</span>：获取有关网络请求的信息；<br></code>
```

大部分扩展API都无法直接被`DevTools`页面调用，但它可以像`content-script`一样直接调用`chrome.extension`和`chrome.runtime`API，同时它也可以像`content-script`一样使用Message交互的方式与background页面进行通信。

### 5.5.3. 实例：创建一个devtools扩展

首先，要针对开发者工具开发插件，需要在清单文件声明如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;只能指向一个HTML文件，不能是JS文件</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"devtools_page"</span>:&nbsp;<span data-darkreader-inline-color="">"devtools.html"</span><br>}<br></code>
```

这个`devtools.html`里面一般什么都没有，就引入一个js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">html</span>&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">head</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">head</span>&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"text/javascript"</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"js/devtools.js"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">html</span>&gt;</span><br></code>
```

可以看出来，其实真正代码是`devtools.js`，html文件是“多余”的，所以这里觉得有点坑，`devtools_page`干嘛不允许直接指定JS呢？

再来看devtools.js的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;创建自定义面板，同一个插件可以创建多个自定义面板</span><br><span data-darkreader-inline-color="">//&nbsp;几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调</span><br>chrome.devtools.panels.create(<span data-darkreader-inline-color="">'MyPanel'</span>,&nbsp;<span data-darkreader-inline-color="">'img/icon.png'</span>,&nbsp;<span data-darkreader-inline-color="">'mypanel.html'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>panel</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'自定义面板创建成功！'</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;注意这个log一般看不到</span><br>});<br><br><span data-darkreader-inline-color="">//&nbsp;创建自定义侧边栏</span><br>chrome.devtools.panels.elements.createSidebarPane(<span data-darkreader-inline-color="">"Images"</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>sidebar</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;sidebar.setPage('../sidebar.html');&nbsp;//&nbsp;指定加载某个页面</span><br>&nbsp;&nbsp;sidebar.setExpression(<span data-darkreader-inline-color="">'document.querySelectorAll("img")'</span>,&nbsp;<span data-darkreader-inline-color="">'All&nbsp;Images'</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过表达式来指定</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//sidebar.setObject({aaa:&nbsp;111,&nbsp;bbb:&nbsp;'Hello&nbsp;World!'});&nbsp;//&nbsp;直接设置显示某个对象</span><br>});<br></code>
```

setPage时的效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以下截图示例的代码：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;检测jQuery</span><br><span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'check_jquery'</span>).addEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;访问被检查的页面DOM需要使用inspectedWindow</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;简单例子：检测被检查页面是否使用了jQuery</span><br>&nbsp;&nbsp;chrome.devtools.inspectedWindow.eval(<span data-darkreader-inline-color="">"jQuery.fn.jquery"</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>result,&nbsp;isException</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;html&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isException)&nbsp;html&nbsp;=&nbsp;<span data-darkreader-inline-color="">'当前页面没有使用jQuery。'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;html&nbsp;=&nbsp;<span data-darkreader-inline-color="">'当前页面使用了jQuery，版本为：'</span>+result;<br>&nbsp;&nbsp;&nbsp;&nbsp;alert(html);<br>&nbsp;&nbsp;});<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;打开某个资源</span><br><span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'open_resource'</span>).addEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;chrome.devtools.inspectedWindow.eval(<span data-darkreader-inline-color="">"window.location.href"</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>result,&nbsp;isException</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.devtools.panels.openResource(result,&nbsp;<span data-darkreader-inline-color="">20</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'资源打开成功！'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;审查元素</span><br><span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'test_inspect'</span>).addEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;chrome.devtools.inspectedWindow.eval(<span data-darkreader-inline-color="">"inspect(document.images[0])"</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>result,&nbsp;isException</span>)</span>{});<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;获取所有资源</span><br><span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'get_all_resources'</span>).addEventListener(<span data-darkreader-inline-color="">'click'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;chrome.devtools.inspectedWindow.getResources(<span><span data-darkreader-inline-color="">function</span>(<span>resources</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;alert(<span data-darkreader-inline-color="">JSON</span>.stringify(resources));<br>&nbsp;&nbsp;});<br>});<br></code>
```

### 5.5.4. 调试技巧

修改了devtools页面的代码时，需要先在 chrome://extensions 页面按下`Ctrl+R`重新加载插件，然后关闭再打开开发者工具即可，无需刷新页面（而且只刷新页面不刷新开发者工具的话是不会生效的）。

由于devtools本身就是开发者工具页面，所以几乎没有方法可以直接调试它，直接用 `chrome-extension://extid/devtools.html"`的方式打开页面肯定报错，因为不支持相关特殊API，只能先自己写一些方法屏蔽这些错误，调试通了再放开。

## 5.6. option(选项页)

所谓`options`页，就是插件的设置页面，有2个入口，一个是右键图标有一个“选项”菜单，还有一个在插件管理页面：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在Chrome40以前，options页面和其它普通页面没什么区别，Chrome40以后则有了一些变化。

我们先看老版的options：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Chrome40以前的插件配置页写法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"options_page"</span>:&nbsp;<span data-darkreader-inline-color="">"options.html"</span>,<br>}<br></code>
```

这个页面里面的内容就随你自己发挥了，配置之后在插件管理页就会看到一个`选项`按钮入口，点进去就是打开一个网页，没啥好讲的。

效果:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

再来看新版的optionsV2：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"options_ui"</span>:<br>&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"page"</span>:&nbsp;<span data-darkreader-inline-color="">"options.html"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;添加一些默认的样式，推荐使用</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"chrome_style"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;},<br>}<br></code>
```

`options.html`的代码我们没有任何改动，只是配置文件改了，之后效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

看起来是不是高大上了？几点注意：

-   为了兼容，建议2种都写，如果都写了，Chrome40以后会默认读取新版的方式；
    
-   新版options中不能使用alert；
    
-   数据存储建议用chrome.storage，因为会随用户自动同步；
    

## 5.7. omnibox

`omnibox`是向用户提供搜索建议的一种方式。先来看个`gif`图以便了解一下这东西到底是个什么鬼：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

注册某个关键字以触发插件自己的搜索建议界面，然后可以任意发挥了。

首先，配置文件如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"omnibox"</span>:&nbsp;{&nbsp;<span data-darkreader-inline-color="">"keyword"</span>&nbsp;:&nbsp;<span data-darkreader-inline-color="">"go"</span>&nbsp;},<br>}<br></code>
```

然后`background.js`中注册监听事件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;omnibox&nbsp;演示</span><br>chrome.omnibox.onInputChanged.addListener(<span>(<span>text,&nbsp;suggest</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'inputChanged:&nbsp;'</span>&nbsp;+&nbsp;text);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(!text)&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(text&nbsp;==&nbsp;<span data-darkreader-inline-color="">'美女'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;suggest([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'中国'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'你要找“中国美女”吗？'</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'日本'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'你要找“日本美女”吗？'</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'泰国'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'你要找“泰国美女或人妖”吗？'</span>},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'韩国'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'你要找“韩国美女”吗？'</span>}<br>&nbsp;&nbsp;&nbsp;&nbsp;]);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>(text&nbsp;==&nbsp;<span data-darkreader-inline-color="">'微博'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;suggest([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'新浪'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'新浪'</span>&nbsp;+&nbsp;text},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'腾讯'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'腾讯'</span>&nbsp;+&nbsp;text},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'搜狐'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'搜索'</span>&nbsp;+&nbsp;text},<br>&nbsp;&nbsp;&nbsp;&nbsp;]);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;suggest([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'百度搜索&nbsp;'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'百度搜索&nbsp;'</span>&nbsp;+&nbsp;text},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'谷歌搜索&nbsp;'</span>&nbsp;+&nbsp;text,&nbsp;<span data-darkreader-inline-color="">description</span>:&nbsp;<span data-darkreader-inline-color="">'谷歌搜索&nbsp;'</span>&nbsp;+&nbsp;text},<br>&nbsp;&nbsp;&nbsp;&nbsp;]);<br>&nbsp;&nbsp;}<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;当用户接收关键字建议时触发</span><br>chrome.omnibox.onInputEntered.addListener(<span>(<span>text</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'inputEntered:&nbsp;'</span>&nbsp;+&nbsp;text);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(!text)&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;href&nbsp;=&nbsp;<span data-darkreader-inline-color="">''</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(text.endsWith(<span data-darkreader-inline-color="">'美女'</span>))&nbsp;href&nbsp;=&nbsp;<span data-darkreader-inline-color="">'http://image.baidu.com/search/index?tn=baiduimage&amp;ie=utf-8&amp;word='</span>&nbsp;+&nbsp;text;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>(text.startsWith(<span data-darkreader-inline-color="">'百度搜索'</span>))&nbsp;href&nbsp;=&nbsp;<span data-darkreader-inline-color="">'https://www.baidu.com/s?ie=UTF-8&amp;wd='</span>&nbsp;+&nbsp;text.replace(<span data-darkreader-inline-color="">'百度搜索&nbsp;'</span>,&nbsp;<span data-darkreader-inline-color="">''</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>(text.startsWith(<span data-darkreader-inline-color="">'谷歌搜索'</span>))&nbsp;href&nbsp;=&nbsp;<span data-darkreader-inline-color="">'https://www.google.com.tw/search?q='</span>&nbsp;+&nbsp;text.replace(<span data-darkreader-inline-color="">'谷歌搜索&nbsp;'</span>,&nbsp;<span data-darkreader-inline-color="">''</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;href&nbsp;=&nbsp;<span data-darkreader-inline-color="">'https://www.baidu.com/s?ie=UTF-8&amp;wd='</span>&nbsp;+&nbsp;text;<br>&nbsp;&nbsp;openUrlCurrentTab(href);<br>});<br><span data-darkreader-inline-color="">//&nbsp;获取当前选项卡ID</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">getCurrentTabId</span>(<span>callback</span>)<br></span>{<br>&nbsp;&nbsp;chrome.tabs.query({<span data-darkreader-inline-color="">active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">currentWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>tabs</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(callback)&nbsp;callback(tabs.length&nbsp;?&nbsp;tabs[<span data-darkreader-inline-color="">0</span>].id:&nbsp;<span data-darkreader-inline-color="">null</span>);<br>&nbsp;&nbsp;});<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;当前标签打开某个链接</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">openUrlCurrentTab</span>(<span>url</span>)<br></span>{<br>&nbsp;&nbsp;getCurrentTabId(<span><span>tabId</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.tabs.update(tabId,&nbsp;{<span data-darkreader-inline-color="">url</span>:&nbsp;url});<br>&nbsp;&nbsp;})<br>}<br></code>
```

## 5.8. 桌面通知

Chrome提供了一个`chrome.notifications`API以便插件推送桌面通知，暂未找到`chrome.notifications`和HTML5自带的`Notification`的显著区别及优势。

在后台JS中，无论是使用`chrome.notifications`还是`Notification`都不需要申请权限（HTML5方式需要申请权限），直接使用即可。

最简单的通知：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">chrome</span><span data-darkreader-inline-color="">.notifications</span><span data-darkreader-inline-color="">.create</span>(<span data-darkreader-inline-color="">null</span>,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'basic'</span>,<br>&nbsp;&nbsp;iconUrl:&nbsp;<span data-darkreader-inline-color="">'img/icon.png'</span>,<br>&nbsp;&nbsp;title:&nbsp;<span data-darkreader-inline-color="">'这是标题'</span>,<br>&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">'您刚才点击了自定义右键菜单！'</span><br>});<br></code>
```

通知的样式可以很丰富：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个没有深入研究，有需要的可以去看官方文档。

## 六、5种类型的JS对比

Chrome插件的JS主要可以分为这5类：`injected script`、`content-script`、`popup js`、`background js`和`devtools js`，

## 6.1. 权限对比

| JS种类 | 可访问的API | DOM访问情况 | JS访问情况 | 直接跨域 |
| --- | --- | --- | --- | --- |
| injected script | 和普通JS无任何差别，不能访问任何扩展API | 可以访问 | 可以访问 | 不可以 |
| content script | 只能访问 extension、runtime等部分API | 可以访问 | 不可以 | 不可以 |
| popup js | 可访问绝大部分API，除了devtools系列 | 不可直接访问 | 不可以 | 可以 |
| background js | 可访问绝大部分API，除了devtools系列 | 不可直接访问 | 不可以 | 可以 |
| devtools js | 只能访问 devtools、extension、runtime等部分API | 可以 | 可以 | 不可以 |

## 6.2. 调试方式对比

| JS类型 | 调试方式 | 图片说明 |
| --- | --- | --- |
| injected script | 直接普通的F12即可 | 懒得截图 |
| content-script | 打开Console,如图切换 | ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) |
| popup-js | popup页面右键审查元素 | ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) |
| background | 插件管理页点击背景页即可 | ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) |
| devtools-js | 暂未找到有效方法 | \- |

## 七、消息通信

通信主页：https://developer.chrome.com/extensions/messaging

前面我们介绍了Chrome插件中存在的5种JS，那么它们之间如何互相通信呢？下面先来系统概况一下，然后再分类细说。

需要知道的是，popup和background其实几乎可以视为一种东西，因为它们可访问的API都一样、通信机制一样、都可以跨域。

## 7.1. 互相通信概览

注：`-`表示不存在或者无意义，或者待验证。

|   
 | injected-script | content-script | popup-js | background-js |
| --- | --- | --- | --- | --- |
| injected-script | \- | window.postMessage | \- | \- |
| content-script | window.postMessage | \- | chrome.runtime.sendMessage chrome.runtime.connect | chrome.runtime.sendMessage chrome.runtime.connect |
| popup-js | \- | chrome.tabs.sendMessage chrome.tabs.connect | \- | chrome.extension. getBackgroundPage() |
| background-js | \- | chrome.tabs.sendMessage chrome.tabs.connect | chrome.extension.getViews | \- |
| devtools-js | chrome.devtools. inspectedWindow.eval | \- | chrome.runtime.sendMessage | chrome.runtime.sendMessage |

## 7.2. 通信详细介绍

### 7.2.1. popup和background

popup可以直接调用background中的JS方法，也可以直接访问background的DOM：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;background.js</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">test</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;alert(<span data-darkreader-inline-color="">'我是background！'</span>);<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;popup.js</span><br><span data-darkreader-inline-color="">var</span>&nbsp;bg&nbsp;=&nbsp;chrome.extension.getBackgroundPage();<br>bg.test();&nbsp;<span data-darkreader-inline-color="">//&nbsp;访问bg的函数</span><br>alert(bg.document.body.innerHTML);&nbsp;<span data-darkreader-inline-color="">//&nbsp;访问bg的DOM</span><br></code>
```

> 小插曲，碰到一个情况，发现popup无法获取background的任何方法，找了半天才发现是因为background的js报错了，而你如果不主动查看background的js的话，是看不到错误信息的，特此提醒。

至于`background`访问`popup`如下（前提是`popup`已经打开）：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;views&nbsp;=&nbsp;chrome.extension.getViews({<span data-darkreader-inline-color="">type</span>:<span data-darkreader-inline-color="">'popup'</span>});<br><span data-darkreader-inline-color="">if</span>(views.length&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">0</span>)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(views[<span data-darkreader-inline-color="">0</span>].location.href);<br>}<br></code>
```

### 7.2.2. popup或者bg向content主动发送消息

background.js或者popup.js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">sendMessageToContentScript</span>(<span>message,&nbsp;callback</span>)<br></span>{<br>&nbsp;&nbsp;chrome.tabs.query({<span data-darkreader-inline-color="">active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">currentWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>tabs</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.tabs.sendMessage(tabs[<span data-darkreader-inline-color="">0</span>].id,&nbsp;message,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>response</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(callback)&nbsp;callback(response);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>}<br>sendMessageToContentScript({<span data-darkreader-inline-color="">cmd</span>:<span data-darkreader-inline-color="">'test'</span>,&nbsp;<span data-darkreader-inline-color="">value</span>:<span data-darkreader-inline-color="">'你好，我是popup！'</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>response</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'来自content的回复：'</span>+response);<br>});<br></code>
```

`content-script.js`接收：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">chrome.runtime.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>request,&nbsp;sender,&nbsp;sendResponse</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;console.log(sender.tab&nbsp;?"from&nbsp;a&nbsp;content&nbsp;script:"&nbsp;+&nbsp;sender.tab.url&nbsp;:"from&nbsp;the&nbsp;extension");</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(request.cmd&nbsp;==&nbsp;<span data-darkreader-inline-color="">'test'</span>)&nbsp;alert(request.value);<br>&nbsp;&nbsp;sendResponse(<span data-darkreader-inline-color="">'我收到了你的消息！'</span>);<br>});<br></code>
```

双方通信直接发送的都是JSON对象，不是JSON字符串，所以无需解析，很方便（当然也可以直接发送字符串）。

> 网上有些老代码中用的是`chrome.extension.onMessage`，没有完全查清二者的区别(貌似是别名)，但是建议统一使用`chrome.runtime.onMessage`。

### 7.2.3. content-script主动发消息给后台

content-script.js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">chrome.runtime.sendMessage({<span data-darkreader-inline-color="">greeting</span>:&nbsp;<span data-darkreader-inline-color="">'你好，我是content-script呀，我主动发消息给后台！'</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>response</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'收到来自后台的回复：'</span>&nbsp;+&nbsp;response);<br>});<br></code>
```

background.js 或者 popup.js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><br><br>// 监听来自content-script的消息<br>chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)<br>{<br>  console.log('收到来自content-script的消息：');<br>  console.log(request, sender, sendResponse);<br>  sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));<br>});<br><br></code>
```

注意事项：

-   content\_scripts向`popup`主动发消息的前提是popup必须打开！否则需要利用background作中转；
    
-   如果background和popup同时监听，那么它们都可以同时收到消息，但是只有一个可以sendResponse，一个先发送了，那么另外一个再发送就无效；
    

### 7.2.4. injected script和content-script

`content-script`和页面内的脚本（`injected-script`自然也属于页面内的脚本）之间唯一共享的东西就是页面的DOM元素，有2种方法可以实现二者通讯：

1.  可以通过`window.postMessage`和`window.addEventListener`来实现二者消息通讯；
    
2.  通过自定义DOM事件来实现；
    

第一种方法（推荐）：`injected-script`中：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">window</span>.postMessage({<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">'你好！'</span>},&nbsp;<span data-darkreader-inline-color="">'*'</span>);<br></code>
```

content script中：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">window</span>.addEventListener(<span data-darkreader-inline-color="">"message"</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>e</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(e.data);<br>},&nbsp;<span data-darkreader-inline-color="">false</span>);<br></code>
```

第二种方法：`injected-script`中：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;customEvent&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createEvent(<span data-darkreader-inline-color="">'Event'</span>);<br>customEvent.initEvent(<span data-darkreader-inline-color="">'myCustomEvent'</span>,&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">true</span>);<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">fireCustomEvent</span>(<span>data</span>)&nbsp;</span>{<br>&nbsp;&nbsp;hiddenDiv&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'myCustomEventDiv'</span>);<br>&nbsp;&nbsp;hiddenDiv.innerText&nbsp;=&nbsp;data<br>&nbsp;&nbsp;hiddenDiv.dispatchEvent(customEvent);<br>}<br>fireCustomEvent(<span data-darkreader-inline-color="">'你好，我是普通JS！'</span>);<br></code>
```

`content-script.js`中：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;hiddenDiv&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'myCustomEventDiv'</span>);<br><span data-darkreader-inline-color="">if</span>(!hiddenDiv)&nbsp;{<br>&nbsp;&nbsp;hiddenDiv&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'div'</span>);<br>&nbsp;&nbsp;hiddenDiv.style.display&nbsp;=&nbsp;<span data-darkreader-inline-color="">'none'</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.body.appendChild(hiddenDiv);<br>}<br>hiddenDiv.addEventListener(<span data-darkreader-inline-color="">'myCustomEvent'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;eventData&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'myCustomEventDiv'</span>).innerText;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'收到自定义事件消息：'</span>&nbsp;+&nbsp;eventData);<br>});<br></code>
```

## 7.3. 长连接和短连接

其实上面已经涉及到了，这里再单独说明一下。Chrome插件中有2种通信方式，一个是短连接（`chrome.tabs.sendMessage`和`chrome.runtime.sendMessage`），一个是长连接（`chrome.tabs.connect`和`chrome.runtime.connect`）。

短连接的话就是挤牙膏一样，我发送一下，你收到了再回复一下，如果对方不回复，你只能重新发，而长连接类似`WebSocket`会一直建立连接，双方可以随时互发消息。

短连接上面已经有代码示例了，这里只讲一下长连接。

popup.js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">getCurrentTabId(<span>(<span>tabId</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;port&nbsp;=&nbsp;chrome.tabs.connect(tabId,&nbsp;{<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'test-connect'</span>});<br>&nbsp;&nbsp;port.postMessage({<span data-darkreader-inline-color="">question</span>:&nbsp;<span data-darkreader-inline-color="">'你是谁啊？'</span>});<br>&nbsp;&nbsp;port.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>msg</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;alert(<span data-darkreader-inline-color="">'收到消息：'</span>+msg.answer);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(msg.answer&nbsp;&amp;&amp;&nbsp;msg.answer.startsWith(<span data-darkreader-inline-color="">'我是'</span>))<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port.postMessage({<span data-darkreader-inline-color="">question</span>:&nbsp;<span data-darkreader-inline-color="">'哦，原来是你啊！'</span>});<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;});<br>});<br></code>
```

content-script.js：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;监听长连接</span><br>chrome.runtime.onConnect.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>port</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(port);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(port.name&nbsp;==&nbsp;<span data-darkreader-inline-color="">'test-connect'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;port.onMessage.addListener(<span><span data-darkreader-inline-color="">function</span>(<span>msg</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'收到长连接消息：'</span>,&nbsp;msg);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(msg.question&nbsp;==&nbsp;<span data-darkreader-inline-color="">'你是谁啊？'</span>)&nbsp;port.postMessage({<span data-darkreader-inline-color="">answer</span>:&nbsp;<span data-darkreader-inline-color="">'我是你爸！'</span>});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>});<br></code>
```

## 八、其它补充

## 8.1. 动态注入或执行JS

虽然在`background`和`popup`中无法直接访问页面DOM，但是可以通过`chrome.tabs.executeScript`来执行脚本，从而实现访问web页面的DOM（注意，这种方式也不能直接访问页面JS）。

示例`manifest.json`配置：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"动态JS注入演示"</span>,<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"permissions"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"tabs"</span>,&nbsp;<span data-darkreader-inline-color="">"http://*/*"</span>,&nbsp;<span data-darkreader-inline-color="">"https://*/*"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;...<br>}<br></code>
```

JS：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;动态执行JS代码</span><br>chrome.tabs.executeScript(tabId,&nbsp;{<span data-darkreader-inline-color="">code</span>:&nbsp;<span data-darkreader-inline-color="">'document.body.style.backgroundColor="red"'</span>});<br><span data-darkreader-inline-color="">//&nbsp;动态执行JS文件</span><br>chrome.tabs.executeScript(tabId,&nbsp;{<span data-darkreader-inline-color="">file</span>:&nbsp;<span data-darkreader-inline-color="">'some-script.js'</span>});<br></code>
```

## 8.2. 动态注入CSS

示例`manifest.json`配置：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"动态CSS注入演示"</span>,<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"permissions"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"tabs"</span>,&nbsp;<span data-darkreader-inline-color="">"http://*/*"</span>,&nbsp;<span data-darkreader-inline-color="">"https://*/*"</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;...<br>}<br></code>
```

JS代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;动态执行CSS代码，TODO，这里有待验证</span><br>chrome.tabs.insertCSS(tabId,&nbsp;{<span data-darkreader-inline-color="">code</span>:&nbsp;<span data-darkreader-inline-color="">'xxx'</span>});<br><span data-darkreader-inline-color="">//&nbsp;动态执行CSS文件</span><br>chrome.tabs.insertCSS(tabId,&nbsp;{<span data-darkreader-inline-color="">file</span>:&nbsp;<span data-darkreader-inline-color="">'some-style.css'</span>});<br></code>
```

## 8.3. 获取当前窗口ID

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">chrome.windows.getCurrent(<span><span data-darkreader-inline-color="">function</span>(<span>currentWindow</span>)<br></span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'当前窗口ID：'</span>&nbsp;+&nbsp;currentWindow.id);<br>});<br></code>
```

## 8.4. 获取当前标签页ID

一般有2种方法：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;获取当前选项卡ID</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">getCurrentTabId</span>(<span>callback</span>)<br></span>{<br>&nbsp;&nbsp;chrome.tabs.query({<span data-darkreader-inline-color="">active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">currentWindow</span>:&nbsp;<span data-darkreader-inline-color="">true</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>tabs</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(callback)&nbsp;callback(tabs.length&nbsp;?&nbsp;tabs[<span data-darkreader-inline-color="">0</span>].id:&nbsp;<span data-darkreader-inline-color="">null</span>);<br>&nbsp;&nbsp;});<br>}<br></code>
```

获取当前选项卡id的另一种方法，大部分时候都类似，只有少部分时候会不一样（例如当窗口最小化时）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;获取当前选项卡ID</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">getCurrentTabId2</span>(<span></span>)<br></span>{<br>&nbsp;&nbsp;chrome.windows.getCurrent(<span><span data-darkreader-inline-color="">function</span>(<span>currentWindow</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.tabs.query({<span data-darkreader-inline-color="">active</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">windowId</span>:&nbsp;currentWindow.id},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>tabs</span>)<br></span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(callback)&nbsp;callback(tabs.length&nbsp;?&nbsp;tabs[<span data-darkreader-inline-color="">0</span>].id:&nbsp;<span data-darkreader-inline-color="">null</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;});<br>}<br></code>
```

## 8.5. 本地存储

本地存储建议用`chrome.storage`而不是普通的`localStorage`，区别有好几点，个人认为最重要的2点区别是：

-   `chrome.storage`是针对插件全局的，即使你在`background`中保存的数据，在`content-script`也能获取到；
    
-   `chrome.storage.sync`可以跟随当前登录用户自动同步，这台电脑修改的设置会自动同步到其它电脑，很方便，如果没有登录或者未联网则先保存到本地，等登录了再同步至网络；
    

需要声明`storage`权限，有`chrome.storage.sync`和`chrome.storage.local`2种方式可供选择，使用示例如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;读取数据，第一个参数是指定要读取的key以及设置默认值</span><br>chrome.storage.sync.get({<span data-darkreader-inline-color="">color</span>:&nbsp;<span data-darkreader-inline-color="">'red'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>items</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(items.color,&nbsp;items.age);<br>});<br><span data-darkreader-inline-color="">//&nbsp;保存数据</span><br>chrome.storage.sync.set({<span data-darkreader-inline-color="">color</span>:&nbsp;<span data-darkreader-inline-color="">'blue'</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'保存成功！'</span>);<br>});<br></code>
```

## 8.6. webRequest

通过webRequest系列API可以对HTTP请求进行任性地修改、定制，这里通过`beforeRequest`来简单演示一下它的冰山一角：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//manifest.json</span><br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;权限申请</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"permissions"</span>:<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"webRequest"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;web请求</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"webRequestBlocking"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;阻塞式web请求</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"storage"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;插件本地存储</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"http://*/*"</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以通过executeScript或者insertCSS访问的网站</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"https://*/*"</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;可以通过executeScript或者insertCSS访问的网站</span><br>&nbsp;&nbsp;],<br>}<br><br><br><span data-darkreader-inline-color="">//&nbsp;background.js</span><br><span data-darkreader-inline-color="">//&nbsp;是否显示图片</span><br><span data-darkreader-inline-color="">var</span>&nbsp;showImage;<br>chrome.storage.sync.get({<span data-darkreader-inline-color="">showImage</span>:&nbsp;<span data-darkreader-inline-color="">true</span>},&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>items</span>)&nbsp;</span>{<br>&nbsp;&nbsp;showImage&nbsp;=&nbsp;items.showImage;<br>});<br><span data-darkreader-inline-color="">// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking</span><br>chrome.webRequest.onBeforeRequest.addListener(<span><span>details</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;cancel&nbsp;表示取消本次请求</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(!showImage&nbsp;&amp;&amp;&nbsp;details.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'image'</span>)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<span data-darkreader-inline-color="">cancel</span>:&nbsp;<span data-darkreader-inline-color="">true</span>};<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;简单的音视频检测</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(details.type&nbsp;==&nbsp;<span data-darkreader-inline-color="">'media'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;chrome.notifications.create(<span data-darkreader-inline-color="">null</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'basic'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">iconUrl</span>:&nbsp;<span data-darkreader-inline-color="">'img/icon.png'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">'检测到音视频'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'音视频地址：'</span>&nbsp;+&nbsp;details.url,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>},&nbsp;{<span data-darkreader-inline-color="">urls</span>:&nbsp;[<span data-darkreader-inline-color="">"&lt;all_urls&gt;"</span>]},&nbsp;[<span data-darkreader-inline-color="">"blocking"</span>]);<br></code>
```

## 8.7. 国际化

插件根目录新建一个名为`_locales`的文件夹，再在下面新建一些语言的文件夹，如`en`、`zh_CN`、`zh_TW`，然后再在每个文件夹放入一个`messages.json`，同时必须在清单文件中设置`default_locale`。

`_locales\en\messages.json`内容：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"pluginDesc"</span>:&nbsp;{<span data-darkreader-inline-color="">"message"</span>:&nbsp;<span data-darkreader-inline-color="">"A&nbsp;simple&nbsp;chrome&nbsp;extension&nbsp;demo"</span>},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"helloWorld"</span>:&nbsp;{<span data-darkreader-inline-color="">"message"</span>:&nbsp;<span data-darkreader-inline-color="">"Hello&nbsp;World!"</span>}<br>}<br></code>
```

`_locales\zh_CN\messages.json`内容：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"pluginDesc"</span>:&nbsp;{<span data-darkreader-inline-color="">"message"</span>:&nbsp;<span data-darkreader-inline-color="">"一个简单的Chrome插件demo"</span>},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"helloWorld"</span>:&nbsp;{<span data-darkreader-inline-color="">"message"</span>:&nbsp;<span data-darkreader-inline-color="">"你好啊，世界！"</span>}<br>}<br></code>
```

在`manifest.json`和`CSS`文件中通过`__MSG_messagename__`引入，如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"__MSG_pluginDesc__"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;默认语言</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"default_locale"</span>:&nbsp;<span data-darkreader-inline-color="">"zh_CN"</span>,<br>}<br></code>
```

JS中则直接`chrome.i18n.getMessage("helloWorld")`。

测试时，通过给chrome建立一个不同的快捷方式`chrome.exe --lang=en`来切换语言，如：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

英文效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

中文效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 8.8. API总结

比较常用用的一些API系列：

-   chrome.tabs
    
-   chrome.runtime
    
-   chrome.webRequest
    
-   chrome.window
    
-   chrome.storage
    
-   chrome.contextMenus
    
-   chrome.devtools
    
-   chrome.extension
    

## 九、经验总结

## 9.1. 查看已安装插件路径

已安装的插件源码路径：`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Extensions`，每一个插件被放在以插件ID为名的文件夹里面，想要学习某个插件的某个功能是如何实现的，看人家的源码是最好的方法了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如何查看某个插件的ID？进入 chrome://extensions ，然后勾线开发者模式即可看到了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 9.2. 特别注意background的报错

很多时候你发现你的代码会莫名其妙的失效，找来找去又找不到原因，这时打开background的控制台才发现原来某个地方写错了导致代码没生效，正式由于background报错的隐蔽性(需要主动打开对应的控制台才能看到错误)，所以特别注意这点。

## 9.3. 如何让popup页面不关闭

在对popup页面审查元素的时候popup会被强制打开无法关闭，只有控制台关闭了才可以关闭popup，原因很简单：如果popup关闭了控制台就没用了。这种方法在某些情况下很实用！

## 9.4. 不支持内联JavaScript的执行

也就是不支持将js直接写在html中，比如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;input&nbsp;id=<span data-darkreader-inline-color="">"btn"</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"button"</span>&nbsp;value=<span data-darkreader-inline-color="">"收藏"</span>&nbsp;onclick=<span data-darkreader-inline-color="">"test()"</span>/&gt;<br></code>
```

报错如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Refused&nbsp;to&nbsp;<span data-darkreader-inline-color="">execute</span>&nbsp;inline&nbsp;<span data-darkreader-inline-color="">event</span>&nbsp;<span data-darkreader-inline-color="">handler</span>&nbsp;because&nbsp;it&nbsp;violates&nbsp;the&nbsp;<span data-darkreader-inline-color="">following</span>&nbsp;<span data-darkreader-inline-color="">Content</span>&nbsp;<span data-darkreader-inline-color="">Security</span>&nbsp;<span data-darkreader-inline-color="">Policy</span>&nbsp;directive:&nbsp;<span data-darkreader-inline-color="">"script-src&nbsp;'self'&nbsp;blob:&nbsp;filesystem:&nbsp;chrome-extension-resource:"</span>.&nbsp;Either&nbsp;the&nbsp;<span data-darkreader-inline-color="">'unsafe-inline'</span>&nbsp;keyword,&nbsp;a&nbsp;<span data-darkreader-inline-color="">hash</span>&nbsp;(<span data-darkreader-inline-color="">'sha256-...'</span>),&nbsp;<span data-darkreader-inline-color="">or</span>&nbsp;a&nbsp;nonce&nbsp;(<span data-darkreader-inline-color="">'nonce-...'</span>)&nbsp;<span data-darkreader-inline-color="">is</span>&nbsp;<span data-darkreader-inline-color="">required</span>&nbsp;<span data-darkreader-inline-color="">to</span>&nbsp;<span data-darkreader-inline-color="">enable</span>&nbsp;inline&nbsp;execution.<br></code>
```

解决方法就是用JS绑定事件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">$(<span data-darkreader-inline-color="">'#btn'</span>).on(<span data-darkreader-inline-color="">'click'</span>,&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{alert(<span data-darkreader-inline-color="">'测试'</span>)});<br></code>
```

另外，对于A标签，这样写`href="javascript:;"`然后用JS绑定事件虽然控制台会报错，但是不受影响，当然强迫症患者受不了的话只能写成`href="#"`了。

如果这样写：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">a</span>&nbsp;<span data-darkreader-inline-color="">href</span>=<span data-darkreader-inline-color="">"javascript:;"</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"get_secret"</span>&gt;</span>请求secret<span>&lt;/<span data-darkreader-inline-color="">a</span>&gt;</span><br></code>
```

报错如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Refused&nbsp;to&nbsp;<span data-darkreader-inline-color="">execute</span>&nbsp;JavaScript&nbsp;<span data-darkreader-inline-color="">URL</span>&nbsp;because&nbsp;it&nbsp;violates&nbsp;the&nbsp;<span data-darkreader-inline-color="">following</span>&nbsp;<span data-darkreader-inline-color="">Content</span>&nbsp;<span data-darkreader-inline-color="">Security</span>&nbsp;<span data-darkreader-inline-color="">Policy</span>&nbsp;directive:&nbsp;<span data-darkreader-inline-color="">"script-src&nbsp;'self'&nbsp;blob:&nbsp;filesystem:&nbsp;chrome-extension-resource:"</span>.&nbsp;Either&nbsp;the&nbsp;<span data-darkreader-inline-color="">'unsafe-inline'</span>&nbsp;keyword,&nbsp;a&nbsp;<span data-darkreader-inline-color="">hash</span>&nbsp;(<span data-darkreader-inline-color="">'sha256-...'</span>),&nbsp;<span data-darkreader-inline-color="">or</span>&nbsp;a&nbsp;nonce&nbsp;(<span data-darkreader-inline-color="">'nonce-...'</span>)&nbsp;<span data-darkreader-inline-color="">is</span>&nbsp;<span data-darkreader-inline-color="">required</span>&nbsp;<span data-darkreader-inline-color="">to</span>&nbsp;<span data-darkreader-inline-color="">enable</span>&nbsp;inline&nbsp;execution.<br></code>
```

## 9.5. 注入CSS的时候必须小心

由于通过`content_scripts`注入的CSS优先级非常高，几乎仅次于浏览器默认样式，稍不注意可能就会影响一些网站的展示效果，所以尽量不要写一些影响全局的样式。

之所以强调这个，是因为这个带来的问题非常隐蔽，不太容易找到，可能你正在写某个网页，昨天样式还是好好的，怎么今天就突然不行了？然后你辛辛苦苦找来找去，找了半天才发现竟然是因为插件里面的一个样式影响的！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 十、打包与发布

打包的话直接在插件管理页有一个打包按钮：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后会生成一个`.crx`文件，要发布到Google应用商店的话需要先登录你的Google账号，然后花5个$注册为开发者，本人太穷，就懒得亲自验证了，有发布需求的自己去整吧。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 十一、参考

## 11.1. 官方资料

推荐查看官方文档，虽然是英文，但是全且新，国内的中文资料都比较旧（注意以下全部需要FQ）：

-   Chrome插件官方文档主页
    
-   Chrome插件官方示例
    
-   manifest清单文件
    
-   permissions权限
    
-   chrome.xxx.api文档
    
-   模糊匹配规则语法详解
    

## 11.2. 第三方资料

部分中文资料，不是特别推荐：

-   360安全浏览器开发文档
    
-   360极速浏览器Chrome扩展开发文档
    
-   Chrome扩展开发极客系列博客
    

## 十二、附图

附图：Chrome高清png格式logo：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)