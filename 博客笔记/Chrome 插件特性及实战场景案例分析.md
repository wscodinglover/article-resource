> 作者：vivo互联网前端团队-Zhang hao

一、前言

提起Chrome扩展插件(Chrome Extension)，每个人的浏览器中或多或少都安装了几个插件，像一键翻译、广告屏蔽、录屏等等，通过使用这些插件，可以有效的提高我们的工作效率；但有时候，我们想要的某个功能市面上没有现成的插件，作为开发者自然而然想到，自己是否可以动手开发一个定制化的插件？网上目前很多不错的关于Chrome插件的开发教程，可以帮助我们快速上手开发一个插件， 本文换个思路，从应用着手，通过讲解插件的特性来启发读者在工作中哪些场景可以通过插件来解决。

> 本文侧重点不是Chrome插件的基础开发，而是聚焦于原理及应用，会从插件的一些重要特性讲起，结合实际的插件案例，来分析这些特性的作用，从而能够启发读者利用这些特性开发出自己的效率工具，打造自己的趁手利器。

二、什么是Chrome扩展插件

什么是Chrome扩展插件？在我们印象中，它就像跑在浏览器中的应用，可以把浏览器想象成手机，那么插件就像是应用，我们从Chrome应用商店中下载，然后安装到Chrome浏览器中，就可以在浏览器中进行运行了。

我们看看官方解释：

> Chrome Extension是一个小的软件程序，它可以用来定义浏览器的浏览体验，让用户可以根据个人需求或者偏好定制Chrome浏览器的功能和行为，主要使用的技术栈是HTML、Javascript和CSS。

一句话总结：**Chrome扩展插件是用前端的技术栈，来定制浏览器的功能，改善用户体验**。

可能大家还听过一个词：Chrome Plugin。翻译过来是Chrome插件，和Chrome扩展插件很相近，特别容易搞混，那么他们之间有什么区别呢？

-   **Chrome Extension**仅仅是用来增强浏览器网页的功能，它是利用浏览器提供的已有功能和和各种API，进行功能组合，从而改善浏览器体验，停留在浏览器层面；
    
-   **Chrome Plugin**不仅能增强网页的功能，同时能够扩展浏览器本身的功能；当浏览器提供的功能已经无法满足你的需求，就需要你通过C/C++这样的编译语言来扩展浏览器的功能，例如我们常用的Flash 插件，Chrome Plugin工作在内核层面。
    

三、Chrome扩展插件组成及核心机制

3.1 Chrome扩展插件的组成

一个 Chrome 扩展插件通常由 3 类文件组成：

1） 配置文件 manifest.json，用于配置扩展的名称、版本号、作者、图标 icon、弹出界面、权限、脚本路径等信息；

2） 图片、css 等资源文件；

3）js脚本文件，其中包含：

-   **popup.js**：用于搭配 popup.html 使用，点击插件图标的时候展示页面及页面逻辑控制；
    
-   **background.js**：用于定义一个后台页面，相当于一个常驻页面，生命周期和浏览器一致；
    
-   **content\_scripts.js**：用于向页面中注入 JS 脚本，它可以操作页面dom，但不会和页面中的脚本产生冲突。
    

3.2 Chrome扩展插件的核心机制

Chrome扩展插件中比较核心的几个概念：Extension Page、background.js、Content\_script.js ，它们在什么时机触发，扮演着什么角色，彼此之间如何进行通信？可以看一下下面的关系图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从图中可以看出，存在三个进程：**扩展进程**（Extension Process）、**页面渲染进程**（Render Process）、**浏览器进程**（Browser Process）。

1）扩展进程中运行Extension Page，Extension Page主要包括backgrount.html和popup.html：

-   backgrount.html中没有任何内容，是通过background.js创建生成，当浏览器打开时，会自动加载插件的background.js文件，它独立于网页并且一直运行在后台，它主要通过调用浏览器提供的API和浏览器进行交互；
    
-   popup.html则不同，它有内容，是一个实实在在的页面，和我们普通的web页面一样，由html、css、Javascript组成，它是按需加载的，需要用户去点击地址栏的按钮去触发，才能弹出页面。
    

2）渲染进程主要运行Web Page,当打开页面时，会将content\_script.js加载并注入到该网页的环境中，它和网页中引入的Javascript一样，可以操作该网页的DOM Tree，改变页面的展示效果；

3）浏览器进程在这里更多起到桥梁作用，作为中转可以实现Extension Page和Content\_script.js之间的消息通信。

四、Chrome扩展插件能做什么

Chrome扩展插件的使用方向主要包含两个部分：

**改变浏览器的外观：**

-   brower Actions
    
-   page Actions
    
-   content menus
    
-   桌面通知
    
-   Omnibox
    
-   override 替代页
    

**和浏览器进行交互**：

-   Cookie控制
    
-   标签控制
    
-   书签控制
    
-   下载控制
    
-   事件监听
    
-   网络请求
    
-   代理...
    

下面我们通过实例来分析这些功能的使用案例：

**实例1:替换页面**

使用替代页，可以将Chrome默认的一些特定页面替换掉，改为使用扩展提供的页面。这让开发者可以开发更多有趣或者实用的基本功能页面。

```
<span> <span>"chrome_url_overrides"</span>: {</span>
```

下面是一个替换新标签页的效果图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**实例2：Cookie控制**

通过Cookie的API，可以对浏览器的Cookie进行增删改查工作。例如我们在开发工作中，经常需要频繁的清除浏览器缓存，每次都需要先找到清除按钮，弹出对话框，进行确认，操作很繁琐，如果开发一个chrome扩展插件，就可以轻松实现一键快捷清除浏览器Cookie等缓存，可以参考Clear Store插件。

**实例3：标签控制** 

使用chrome.tabs API与浏览器的标签系统进行交互，可以查询，创建、修改和重新排列浏览器中的标签页;我们在使用浏览器时，经常会打开很多标签页，显得很混乱，中途想要找打开的某个页面时，效率低且痛苦，如果能将这些标签页进行整理并有序的展示该多好，这里给大家推荐一个Chrome扩展插件：OneTab，该插件将所有打开的标签页在新的页面中有序的排列出来，如下图，一目了然。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们甚至可以通过tabs 实现页签之间的交互，出于安全考虑，tab的属性中没有document, 因此无法在扩展中直接获取某个标签页面中的dom元素，但是可以通过发送事件请求来实现：

```
<span>chrome.tabs.sendRequest(tab_id, {</span>
```

```
<span>chrome.extension.onRequest.addListener(</span>
```

**实例4：拦截请求或者反向代理**

在在页面性能点检时，我们经常会检查页面图片资源是否存在尺寸过大，例如200K，获取一个过大的图片列表页面。

chrome.webRequest API只能在background.js中使用，所以可以通过图片拦截，将链接通过消息传给当前页面的content\_script.js，然后在content\_script.js中进行图片下载和大小检查。

```
<span><span>// background.js</span></span>
```

```
<span><span>// content_script.js</span></span>
```

**实例5：页面元素操作**

利用Content\_script.js可操作dom元素，进行对页面元素进行操作，实现自动化登录，解放双手。

```
<span><span>//输入</span></span>
```

五、业务实践

**痛点**：我目前主要负责vivo全球商城的业务，全球化的业务都会面临国际化语言的问题，我们自主开发了一个多语言管理后台，配置key-value,前端通过接口获取多语言在页面展示；如果运营查看页面，觉得某个文案不太合适，想要修改，需要进行如下图的一系列操作：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到当运营想要修改文案时，他先要知道该文案对应的key值，而页面上面无法获取到key值，需要让开发提供，然后需要到多语言管理平台去更新对应key的值。 

这样遇到两个问题：

-   不能所见即所得，看到页面不能知道key值；
    
-   所见无法直接修改，需要到另一个管理平台去修改 ；
    

目前这个在修改内容少的情况下，还是可以操作的，当修改内容很多时，这样操作起来很繁琐，效率很低。

**思考：**

> 1）运营是否可以直接在页面上修改并生效？
> 
> 2）如果可以修改，怎么去实现跨域请求？
> 
> 3）怎么实现登录授权？

如果对Chrome扩展插件熟悉，会发现Chrome就是为这量身定制，可以完美解决这些问题。

**实现方案：** 

1）对页面中涉及文案dom进行修改，绑定多语言key值。

```
<span><span>&lt;<span>div</span> <span>data-lang-key</span>=<span>"address.delete.button"</span>&gt;</span>{{ language.addressDeleteButton }}<span>&lt;/<span>div</span>&gt;</span></span>
```

2）利用Content\_script,js可以操作页面dom元素，当启动插件时，将页面所有可修改的文案的dom增加contenteditable属性，支持可编辑，如图；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3）创建一个修改面板，获取当前选中的key值和value值，和修改后的值，如上图，右上角面板。

4）利用Chrome插件支持跨站请求的特性，向多语言平台直接发送修改请求。

```
<span>chrome.runtime.onMessage.addListener(</span>
```

5）利用Chrome插件可以获取浏览器中Cookie特性，新开一个标签页打开多语言后台，进行登录，登录成功后就可以实现请求的授权修改了。

六、总结

最后总结一下，生活中经常会感叹：看过好多人生道理，依然过不好这一生。同样，使用过很多Chrome插件，依然码不好自己的一个插件，所以最后再送给你一个阅读Chrome插件源码的插件，堪称插件中的插件，插件中的王者——**Chrome extension source viewer。**通过它可以很方便的查看其它插件的源码，让我们能够站在巨人的肩膀上往前走~~

END

猜你喜欢

-   [如何“拼”出一个页面-游戏中心模块化实践](http://mp.weixin.qq.com/s?__biz=MzI4NjY4MTU5Nw==&mid=2247492357&idx=1&sn=d9fdee91fe59988b35a407305b1380bc&chksm=ebdb9397dcac1a8138e3b56edf4f04d15afeedd8f6ea482848704dce6ce9124bd97a98738027&scene=21#wechat_redirect)
    
-   [富文本及编辑器的跨平台方案](http://mp.weixin.qq.com/s?__biz=MzI4NjY4MTU5Nw==&mid=2247491685&idx=2&sn=e703482f8523816b9a8413425cce9fbe&chksm=ebdb90f7dcac19e110b8f9a00d9d34f91e314f070b28755ff3a542adaab1fe59bd0d84611153&scene=21#wechat_redirect)
    
-   [解放生产力，自动化生成Vue组件文档](http://mp.weixin.qq.com/s?__biz=MzI4NjY4MTU5Nw==&mid=2247491367&idx=2&sn=184b48330e598ab4be2d462823ec17a9&chksm=ebd86fb5dcafe6a38b05f0424baa2642751b7ae32ce5c3d23f5ebac5ab2dea3be1c5e0164a48&scene=21#wechat_redirect)