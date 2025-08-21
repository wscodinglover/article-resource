封面设计器在西瓜和B站都有，但是想要一个属于自己的封面编辑器还得自己造轮子，很多功能都得写，除了学会应用架构，还学到了很多附加实用的插件库。只有自己写，才能画出自己想要的样子。本篇文章就聊聊实现封面编辑器的基本思路。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ODiaMNroZ9t85764jicLPbn9wBrdiaFQ9dqCm99hOBU8xRVlFzeBlxpNCCuZtStiarDdibE2OyiarJic5Yz7eECgka8cA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**技术栈**

这里主要展示核心的技术栈列表，如有更好的选择建议替换，这里是清单，下文会介绍他们的功能，能做什么，能实现什么。  

<table><tbody><tr><td><span>vue3</span></td><td><span>数据响应式<br></span></td></tr><tr><td><span>fabricjs</span></td><td><span>HTML5 Canvas库</span></td></tr><tr><td><span>event</span></td><td><span>自定义事件js库，用于组件通信，包括传播事件和监听器功能</span></td></tr><tr><td colspan="1" rowspan="1">tapable</td><td colspan="1" rowspan="1"><span>注册应用异步或者同步钩子</span></td></tr></tbody></table>

![Image](https://mmbiz.qpic.cn/mmbiz_png/ODiaMNroZ9t85764jicLPbn9wBrdiaFQ9dqr8h6yFA3dvsMFZyalMxibC5FLPZ4kVHcN64xBM6xWM42TPZMkSON8Jg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**什么是fabricjs？**

Fabric.js 是一个强大的 JavaScript 库，用于在网页上使用 HTML5 Canvas 创建、操作和渲染复杂的图形和图像。它的功能非常丰富，支持多种绘图和交互操作，非常适合用于制作在线设计工具、图像编辑器和各种可视化应用。以下是一些 Fabric.js 的主要特点和使用方法的介绍：

1.  **对象模型：**Fabric.js 提供了一个面向对象的模型来创建和操作 Canvas 上的图形对象。常见的对象包括矩形、圆形、文本、图像等。
    
2.  **交互性：** Fabric.js 支持拖动、缩放、旋转等交互操作，可以轻松实现用户与图形之间的互动。
    
3.  **动画：** 可以对对象进行动画处理，使得图形变化更加生动。
    
4.  **事件处理：** Fabric.js 提供了丰富的事件机制，允许开发者捕捉和处理用户的各种操作，如点击、移动等。
    
5.  **SVG 支持：** 可以导入和导出 SVG 格式的图形，方便与其他图形工具的集成。
    

![Image](https://mmbiz.qpic.cn/mmbiz_png/ODiaMNroZ9t85764jicLPbn9wBrdiaFQ9dqtodk8F5RZhK0Bib3QOylXWQicEGjz82Djkdv69rA0d2UXrN0Wb85BlCA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**什么是events ？**

events 是 Node.js 中的一个内置模块，用于处理事件驱动编程。它实现了一个事件触发器（EventEmitter），允许对象在发生特定事件时发出信号，并让其他对象订阅和响应这些事件。events 模块在 Node.js 中非常重要，因为许多核心模块（如 HTTP、文件系统等）都依赖于事件驱动机制。

主要功能：

1.  **事件发射器（EventEmitter）：** 核心类，用于注册事件监听器和触发事件。
    
2.  **事件监听和触发：** 可以为特定事件注册回调函数，并在事件发生时调用这些函数。
    
3.  **一次性监听器：** 可以注册只执行一次的监听器。
    
4.  **事件参数：** 触发事件时可以传递参数给监听器。
    
5.  **事件移除：** 可以移除指定的监听器，或移除所有监听器。
    

![Image](https://mmbiz.qpic.cn/mmbiz_png/ODiaMNroZ9t85764jicLPbn9wBrdiaFQ9dqo8an3rVC8kf3Y9uccAarqlFNpkHRcbN3ic9Yr2gicmXDrAsLibmuQwDPQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**什么是tapable？**

Tapable.js 是一个轻量级的 JavaScript 库，专注于为插件架构提供钩子（hook）机制。它广泛用于构建可扩展的软件系统，尤其在 Webpack 中扮演着核心角色，通过 Tapable.js，Webpack 实现了灵活的插件系统。

### **主要功能：**

1.  **钩子（Hooks）：** 提供多种类型的钩子，包括同步钩子、异步钩子、瀑布流钩子等，适用于不同的扩展需求。
    
2.  **插件注册和调用：** 允许插件通过注册钩子进行扩展，并在适当的时机调用这些钩子。
    
3.  **高扩展性：** 通过钩子机制，可以轻松地为应用程序添加新功能或修改现有功能，而无需修改核心代码。
    

### **钩子类型：**

Tapable.js 提供了多种钩子，每种钩子适用于不同的场景：

1.  **SyncHook：** 同步执行的钩子，按顺序调用所有注册的插件。
    
2.  **SyncBailHook：** 同步执行的钩子，只要有一个插件返回非 `undefined`，则中断后续插件的执行。
    
3.  **SyncWaterfallHook：** 同步执行的钩子，前一个插件的返回值会作为参数传递给下一个插件。
    
4.  **AsyncParallelHook：** 异步并行执行的钩子，所有插件同时执行，等待所有插件完成。
    
5.  **AsyncSeriesHook：** 异步串行执行的钩子，一个插件完成后再执行下一个插件。
    

![Image](https://mmbiz.qpic.cn/mmbiz_png/ODiaMNroZ9t85764jicLPbn9wBrdiaFQ9dqvr4QPdGzN4IEjro0ibXC7sKibx7bInqJticJqiaYTIOibw3nLwOMu6ibaMXg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**实现封面设计器架构的思维引导**

上面利用了资源，下面记录如何搭配使用这些库来实现封面设计器架构，以及组件间通信等等功能。为了实现模块化，封面设计器采用插件plugin模式来构建应用，利于应用后期迭代、维护和升级。小编认为只要是具有独立功能的模块，就是一个插件plugin，通过注入到主类里面进行初始化使用。  

**第一步：**

新增一个核心类，这里以CoverEditor为例，这里部分代码参考某个大佬的开源项目而来，文末有连接。该类CoverEditor继承events库，此时CoverEditor就拥有了事件广播和监听事件功能，这样可以在vue文件监听，也可以在js内部监听。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Cover类在实例化init()时还做了两件很重要的事情，就是注入插件功能和绑定插件自定义API方法。

**注入插件核心方法：**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**绑定插件自定义API方法：**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**编写一个插件测试**  

这里以写一个图层属性AttributesPlugin 插件为例，当用户点击右侧图层属性后，需要统一传递到这里，当然也可以直接在当前页面修改，这里是为了方便统一获取图层属性而写的插件，还有很多属性没有添加，随着图层复杂化，属性也变得复杂起来，需要统一管理。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**注入插件到coverEditor核心类进行初始化。**

此处必须先初始化CoverEditor核心类，通过引用变量去调用内部方法。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**插件注入部分：**  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**测试看效果：**  

当用户绘制一个path图层后，需要自定义path属性，这是需要更新图层属性到属性插件AttributesPlugin 内部更新属性，然后广播出去，所有监听当前事件的页面都会接到通知，还能获取属性信息。其他插件功能根据自己项目需求来写就可以了，页面布局这里不做讲解，因为不复杂。

**需求：vue页面用户绘制path图层后，想修改path样式。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**在绘制插件****DrawingPlugin****监听onAttributesChange事件：**

当用户修改path样式后，需要及时通知绘制插件，绘制插件获取用户最新设置样式属性，在画笔绘制时就能用上最新样式了。注意，js中监听events事件，需要在插件类初始化init()方法中完成监听绑定，否则无效哦。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有了这些画笔属性更新逻辑后，在用户设置画笔样式，再次使用画笔画图形时，就会用上当前设置的样式。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当然，有了events加持，事件定义变得简单方便。由于文章篇幅有限，大致记录了一下封面设计器基本实现思路，不足之处，不善言表。由于项目还在开发，这里贴出目录结构图，方便大家参考：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

注意：小编不提供源码，需要得伙伴可以参照某个开源项目源码来构建：https://github.com/nihaojob/vue-fabric-editor

**近期文章精选![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**  

1.  [推荐  27.6k star 全网顶尖的HTML5 Canvas 交互库](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485565&idx=1&sn=c7ac243ef4d0784fdcc2e47cbfcfc7ab&chksm=ec5c9927db2b10316817fb3585bc54826fe23be7d24c1cbc427478b72ea4628739b099421743&scene=21#wechat_redirect)
    
2.  [Vue 3 构建高效的组件通信: provide 和 inject API](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485657&idx=1&sn=4142fd425b9bbe7e94393fee504c9eca&chksm=ec5c9983db2b1095b43267d834e8850fc76c6a482380f9c97f19ea2b22e8e066cde981bfbf06&scene=21#wechat_redirect)  
    
3.  [推荐两个CSS生成器，专治各种不规则形状，建议收藏](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485555&idx=1&sn=db078177b083110033cf79317336eb50&chksm=ec5c9929db2b103fe752082d340b8ac0d5c08a7fb4d9c36e522a2b2637227cec3da6d83940a9&scene=21#wechat_redirect)[](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485524&idx=1&sn=e172fe722373e72459ebe84faf39d8b5&chksm=ec5c990edb2b1018654da421343f01d0abe6e1b680b95b5eaf600ff8a2e6e98b434203b64147&scene=21#wechat_redirect)
    
4.  [VUE3专属富文本，nice！！！](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485467&idx=1&sn=acf57db23c0096167208e9c4d77ba06b&chksm=ec5c9941db2b1057cc2da4ed7ab04ee0945092e78a6b60664844f26b019a0e75c309c1a77a73&scene=21#wechat_redirect)
    
5.  [CSS3实现无缝滚动scroll，实用=很丝滑+很漂亮+源码](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485431&idx=1&sn=d05fd110eed24a388d2f627cf478fce6&chksm=ec5c96addb2b1fbb0e7445bd298eef274779dc7c76ea431edd9207ca728f32b8a740bb2b76b3&scene=21#wechat_redirect)
    
6.  [Vue2/3富文本，很清爽很好用](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485372&idx=1&sn=ca1c65f63e9abf50f1e0e2033a403bdf&chksm=ec5c96e6db2b1ff0e6c493fc45697e3e3f8581bd9bf8d84d901a615d5a88ca4c3b1fc8ea51d5&scene=21#wechat_redirect)