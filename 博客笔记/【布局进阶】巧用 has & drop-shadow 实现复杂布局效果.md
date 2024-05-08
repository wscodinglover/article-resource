> 本文为稀土掘金技术社区首发签约文章，30天内禁止转载，30天后未获授权禁止转载，侵权必究！

最近，群里聊到了一个很有意思的布局效果。大致效果如下所示，希望使用 CSS 实现如下所示的布局效果：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/SMw0rcHsoNKP49B2KGibEQKeLhoKgUouyuCPdrCnlJUoibPibiadcaaHwRC0zCVSOHh3tcYvoicyXY6qicmNpWane20w/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

正常而言，我们的 HTML 结构大致是如下所示：

```
<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-container"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-nav"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;2<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;3<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;4<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-main"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-content"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>
```

对于 Hover 导航 Tab 时候的内容切换，暂且不谈。本文，我们核心想探讨的是两个点：

1.  一是对于如下所示的不规则布局，应该如何实现：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

并且，这里我们可能还需要给它加上阴影效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  如何配合 Hover 动作，实现整个切换效果
    

带着这两个问题，我们一起来尝试慢慢把这个效果实现。

## 借助伪元素实现不规则按钮

首先，我们需要实现这个效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个，其实在很多篇文章都有提及过：

-   由小见大！不规则造型按钮解决方案<sup data-darkreader-inline-color="">[1]</sup>
    
-   使用 CSS 轻松实现高频出现的各类奇形怪状按钮<sup data-darkreader-inline-color="">[2]</sup>
    

想一想，这里其实就是竖向的 Chrome 分 Tab 的效果：

像是这样：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们对这个按钮形状拆解一下，这里其实是 3 块的叠加：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

只需要想清楚如何实现两侧的弧形三角即可。这里还是借助了渐变 -- **径向渐变**，其实他是这样，如下图所示，我们只需要把黑色部分替换为透明即可，使用两个伪元素即可：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

代码如下：

```
<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"outside-circle"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>
```

```
<span data-darkreader-inline-color="">.outside-circle</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;relative;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#e91e63</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">border-radius</span>:&nbsp;<span data-darkreader-inline-color="">10px</span>&nbsp;<span data-darkreader-inline-color="">10px</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;::before&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;absolute;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">left</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">bottom</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#000</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#e91e63&nbsp;<span data-darkreader-inline-color="">21px</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;<span data-darkreader-inline-color="">::after</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;absolute;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">right</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">bottom</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#000</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">100%</span>&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#e91e63&nbsp;<span data-darkreader-inline-color="">21px</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

即可得到：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们照葫芦画瓢，即可非常轻松的实现竖向的相同的效果，示意图如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 利用 drop-shadow 实现按钮阴影

好，接下来，我们需要给按钮添加上阴影效果，像是这样：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因为使用了两个伪元素，当前单个按钮在 Hover 状态下的大致代码如下：

```
<br><span data-darkreader-inline-color="">li</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;relative;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">160px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">36px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">border-radius</span>:&nbsp;<span data-darkreader-inline-color="">10px</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">10px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#ddd</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;::before,<br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;::after&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;absolute;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">right</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">border-radius</span>:&nbsp;unset;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;<span data-darkreader-inline-color="">::before</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">top</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;transparent,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">19.5px</span>,&nbsp;#ddd&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#ddd);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&amp;<span data-darkreader-inline-color="">::after</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">bottom</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">100%</span>,&nbsp;transparent,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">19.5px</span>,&nbsp;#ddd&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#ddd);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

如果使用 `box-shadow` 肯定是不行的，整个效果就会露馅：

尝试给按钮添加一个 `box-shadow: 0 0 5px 0 #333`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

弯曲的连接处，明显没有阴影效果，怎么解决呢？

嗯哼，老读者一定也知道，这里我们需要对整个可见部分添加阴影，需要使用 `filter:drop-shadow()`。

`drop-shadow()` 滤镜的作用用于创建一个符合元素（图像）本身形状（alpha 通道）的阴影。其中，最为常见的技巧，就是利用它生成不规则图形的阴影。

因此，我们把上述的 `box-shadow` 替换成：`filter: drop-shadow(0 0 5px #ddd)`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样，我们就实现了基于单个不规则按钮的阴影效果。

但是，显然事情还没有结束。

## 修改布局结构，再借助利用 drop-shadow 实现统一阴影

记得我们上面提到过的 HTML 的布局吗？正常而言，右侧的主体内容和左侧的导航，结构是分离的：

```
<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-container"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-nav"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-main"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-content"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>
```

因此，这里最为麻烦的地方在于，**左侧按钮的阴影，需要和右侧的主体内容连在一起！**，所以当我们给右侧的 `.g-main` 也添加上相同的 `filter:drop-shadow()` 时，整个效果会变得非常奇怪：

```
//&nbsp;当前被&nbsp;<span data-darkreader-inline-color="">Hover</span>&nbsp;的&nbsp;<span data-darkreader-inline-color="">li</span><br><span data-darkreader-inline-color="">.g-nav</span>&nbsp;<span data-darkreader-inline-color="">li</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">filter</span>:&nbsp;<span data-darkreader-inline-color="">drop-shadow</span>(<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">5px</span>&nbsp;#ddd)<br>}<br>//&nbsp;右侧的主体<br><span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">filter</span>:&nbsp;<span data-darkreader-inline-color="">drop-shadow</span>(<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">5px</span>&nbsp;#ddd)<br>}<br>
```

无论层级谁在上，整体阴影的展示都会瑕疵：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以，如果想要实现整个元素的阴影是一整个的整体的效果，我们就不得不另辟蹊径。

这里，我们的思路如下：

1.  可以尝试在 `.g-main` 中，添加一组与 `.g-nav` 相同的结构，负责样式层面的展示
    
2.  把新增的结构，利用绝对定位，让其与实际的导航位置重叠
    
3.  在原本的 `.g-nav` 中，通过 `:has()` 伪类，传递实时的 Hover 状态
    

基于此，我们需要改造一下我们的结构：

```
<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-container"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-nav"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;2<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;3<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>Tab&nbsp;4<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-main"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-status"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"g-content"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span>...<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>
```

仔细看上面的结构，我们多了一组 `.g-stauts` 结构，放置在了 `.g-main` 之下。其 li 个数与实际的导航 `.g-nav` 保持一致，并且高宽大小都是一模一样的。

并且，可以利用绝对定位，让其完全叠加在 `.g-nav` 的位置上。

然后，我们把上述类 Chrome Tab 样式的不规则按钮结构的 CSS 代码结构，都赋给 `.g-status` 下的 li。

此时，由于不规则按钮结构和右侧的主体内容结构，其实是在一个父 div 之下，所以，我们只需要给 `.g-main` 元素添加 `filter: drop-shadow()`，就可以实现一整个整体的阴影效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最后，我们利用 `:has()` 伪类，传递实时的 Hover 状态，把内外的结构连接起来。

最为核心的代码如下：

```
<span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#ddd</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">filter</span>:&nbsp;<span data-darkreader-inline-color="">drop-shadow</span>(<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">3px</span>&nbsp;#<span data-darkreader-inline-color="">999</span>);<br>}<br><span data-darkreader-inline-color="">.g-status</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:absolute;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">left</span>:&nbsp;-<span data-darkreader-inline-color="">160px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">top</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">160px</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;li&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">160px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">36px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;relative;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">#ddd</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">opacity</span>:<span data-darkreader-inline-color="">0</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&amp;::before,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&amp;::after&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">""</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">position</span>:&nbsp;absolute;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">right</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">border-radius</span>:&nbsp;unset;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&amp;<span data-darkreader-inline-color="">::before</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">top</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;transparent,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">19.5px</span>,&nbsp;#ddd&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#ddd);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&amp;<span data-darkreader-inline-color="">::after</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">width</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">height</span>:&nbsp;<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">bottom</span>:&nbsp;-<span data-darkreader-inline-color="">20px</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">background</span>:&nbsp;<span data-darkreader-inline-color="">radial-gradient</span>(circle&nbsp;at&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;<span data-darkreader-inline-color="">100%</span>,&nbsp;transparent,&nbsp;transparent&nbsp;<span data-darkreader-inline-color="">19.5px</span>,&nbsp;#ddd&nbsp;<span data-darkreader-inline-color="">20px</span>,&nbsp;#ddd);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">.g-status</span>&nbsp;<span data-darkreader-inline-color="">li</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">opacity</span>:&nbsp;<span data-darkreader-inline-color="">0</span>;<br>}<br><span data-darkreader-inline-color="">.g-nav</span><span data-darkreader-inline-color="">:has(li</span><span data-darkreader-inline-color="">:nth-child(1)</span><span data-darkreader-inline-color="">:hover)</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;.g-status&nbsp;<span data-darkreader-inline-color="">li</span>:<span data-darkreader-inline-color="">nth-child</span>(<span data-darkreader-inline-color="">1</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">.g-nav</span><span data-darkreader-inline-color="">:has(li</span><span data-darkreader-inline-color="">:nth-child(2)</span><span data-darkreader-inline-color="">:hover)</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;.g-status&nbsp;<span data-darkreader-inline-color="">li</span>:<span data-darkreader-inline-color="">nth-child</span>(<span data-darkreader-inline-color="">2</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">.g-nav</span><span data-darkreader-inline-color="">:has(li</span><span data-darkreader-inline-color="">:nth-child(3)</span><span data-darkreader-inline-color="">:hover)</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;.g-status&nbsp;<span data-darkreader-inline-color="">li</span>:<span data-darkreader-inline-color="">nth-child</span>(<span data-darkreader-inline-color="">3</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">.g-nav</span><span data-darkreader-inline-color="">:has(li</span><span data-darkreader-inline-color="">:nth-child(4)</span><span data-darkreader-inline-color="">:hover)</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">.g-main</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;.g-status&nbsp;<span data-darkreader-inline-color="">li</span>:<span data-darkreader-inline-color="">nth-child</span>(<span data-darkreader-inline-color="">4</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>
```

什么意思呢？解释一下：

1.  事先把每一个 Tab 被 Hover 时的样式，都写在了 `.g-stauts` 中，并且再提醒一下，这个结构是在 `.g-main` 之下的。然后，默认设置隐藏即可；
    
2.  实际触发 Hover 动画效果，是正常的 `.g-nav` 下的一个一个的 li 结构；
    
3.  当 `.g-nav` 下的一个一个的 li 被 Hover 时，我们通过 `:has()` 伪类，能够拿到此事件，并且根据当前是第几个元素被 hover，对应的控制实际在 `.g-main` 下的结构进行样式的展示；
    

> 不太了解的 `:has()` 伪类的小伙伴，可以先读一读这篇文章 -- 浅谈逻辑选择器 is、where、not、has<sup data-darkreader-inline-color="">[3]</sup>，此伪类的诞生，填补了在之前 CSS 选择器中，没有父选择器的空缺。让我们能够在父元素节点上，根据子元素的状态变化，做出样式的调整。

这样，我们就最终实现了我们文章一开始的效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

文章可能有部分内容没有阐述的很清晰，完整的代码其实行数非常之少，对文章内容还不太理解的建议戳进 DEMO 中看看。

完整的 DEMO 效果：CodePen Demo -- Tab Hover Effect<sup data-darkreader-inline-color="">[4]</sup>

有小伙伴会有疑问，为什么不直接在 `.g-nav` 导航结构和 `.g-main` 结构的父节点直接添加 `drop-shadow()`，不是也可以实现一样的效果吗？

是的，对于本文贴出的代码效果，是可以实现一样的效果。但是，实际业务中，`.g-nav` 会更复杂，它们的共同父元素下也可能还有其他元素，实际情况远比本文贴出来的结构复杂，因此借助多一层虚拟 ul，实际上是更好的解法。

## 最后

好了，本文到此结束，希望本文对你有所帮助 :)

更多精彩 CSS 技术文章汇总在我的 Github -- iCSS<sup data-darkreader-inline-color="">[5]</sup> ，持续更新，欢迎点个 star 订阅收藏。

如果还有什么疑问或者建议，可以多多交流，原创文章，文笔有限，才疏学浅，文中若有不正之处，万望告知。

参考资料

\[1\]

由小见大！不规则造型按钮解决方案: _https://github.com/chokcoco/iCSS/issues/224_

\[2\]

使用 CSS 轻松实现高频出现的各类奇形怪状按钮: _https://github.com/chokcoco/iCSS/issues/152_

\[3\]

浅谈逻辑选择器 is、where、not、has: _https://github.com/chokcoco/iCSS/issues/181_

\[4\]

CodePen Demo -- Tab Hover Effect: _https://codepen.io/Chokcoco/pen/oNONwdM?editors=0100_

\[5\]

Github -- iCSS: _https://github.com/chokcoco/iCSS_