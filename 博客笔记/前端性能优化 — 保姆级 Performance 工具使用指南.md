本文转载于稀土掘金技术社区，作者：hprep

**您好，** **如果喜欢我的文章或者想上岸大厂，可以关注公众号[「量子前端」](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247483710&idx=1&sn=5d982e6368f1007356182d36844ac43e&chksm=cfa1d413f8d65d0556b1ecb7ab310c9f9d017399b84ef7e52aa83f13b8c185e1f512e82f21cf&token=875951818&lang=zh_CN&scene=21#wechat_redirect)，将不定期关注推送前端好文、分享就业资料秘籍，也希望有机会一对一帮助你实现梦想**

性能分析一直是前端er们津津乐道的话题；而俗话说得好：工欲善其事，必先利其器；

说到前端性能，就少不了性能分析的利器 —— _Performance_ 😎；我想各位前端小伙伴，在使用 Chrome 浏览器 `DevTool` 时或多或少都有留意到这个面板吧？

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/IlE1Y2rl1uZslOaCtzIxPlsIlPSPN0ibblBdOibxCfIvtskedm1lffQbQQQ5YOewfiaAFb9cN3tWicelQdpQX5UPmg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

今天我们就迈开性能分析的第一步，来探究一下 _Performance_ 这个强大的工具。

> 文章中提到的 _Performance_ 面板，以 Chrome 118 版本为参考。

## Performance 面板

我们打开 _Performance_ 面板：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/IlE1Y2rl1uZslOaCtzIxPlsIlPSPN0ibbPJGibuMMGVhbj9ciab7zMgKBsObuSTSXZgrxQocmuBjBXYowhubfmyvg/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

我把 _Performance_ 面板大概划分为操作区、设置区、报告区三块区域：

-   操作区：主要用于性能分析的开启、关闭、性能报告的上传下载等；
    
-   设置区：用于设置性能数据分析期间的各项指标，比如：CPU 运算能力、网络状态等等；
    
-   报告区：顾名思义，就是呈现最终性能分析报告的地方。
    

下面我们先来一起看看操作区的内容。

## 操作区

观察下图中用红线框起来的部分，这里有几个按钮：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 录制报告

按钮 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 与 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 的功能大致相同，都是用于**记录页面性能数据**；

两个按钮点击后都会出现下面这样的弹窗：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

不过需要注意的是，这两种录制方式之间有一些不同：

## 清除报告

录制完成的数据，如果我们不需要了，就可以点击 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) _(Clear)_ 按钮来**清除数据**；

是不是很一目了然呢？

## 上传/下载报告

当我们的数据录制完成，就可以 点击 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) _(Save Profile)_ 按钮来将**录制的报告下载保存在本地**；

有了下载，当然少不了它的好兄弟上传！

点击 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) _(Load Profile)_ 就可以将**本地报告再次上传到 _Performance_ 面板中**；

## 报告对比

实际上，我们每次录制的报告都被自动留存起来；

当存在多份性能报告时，还可以通过**下拉切换查看不同的报告**：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这样就能很方便地对比不同时间段的性能报告。

> 图中用红虚线框起来的部分，就是用于切换报告的下拉框。

## Screenshots 和 Memory

在操作区的右边还有两个复选框，_Screenshots_ 和 _Memory_：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### Screenshots

当勾选 _Screenshots_ 后，在生成的性能报告中就会多出一栏用于记录页面在加载过程中的每一帧的视觉变化，并生成一系列快照；

并且当鼠标 hover 在这个区域时，就可以查看当前帧的快照：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

通过查看这些快照，我们就可以了解页面在不同时间点的渲染情况。

### Memory

而 _Memory_ 功能则是用于观察页面的内存使用情况随时间的变化。

当勾选 _Memory_ 功能后，在性能报告中就会显示页面的总内存使用量、堆内存使用量以及各种 JavaScript 对象的内存分配情况：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

同样，**当鼠标 hover 在下方不同类型文件占据内存情况的折线图时，就可以查看当前时间点下这些文件使用内存的情况**。

## 垃圾回收

最后，操作区的 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) _(Collect garbage)_ 按钮用于手动触发 JavaScript 垃圾回收。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

当我们在进行性能测试时，就可以在特定的时间点手动触发垃圾回收，以确保测试结果的准确性。

## 设置区

在文章前面简单介绍过，设置区主要用于设置性能数据分析期间的各项指标；

下面我们来看看具体可以做哪些设置：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## Disable JavaScript samples

默认情况下，**Chrome 在做性能分析采样时会记录当前 JavaScript 执行的堆栈信息，并在报告区的 Main 部分呈现出来**：

如果我们不关注 JavaScript 执行相关的性能，比如：测试在不同网络情况下的代码执行性能、测试渲染性能时；

这种情况下就可以勾选 _Disable JavaScript samples_ 这个选项，从而提高性能分析的效率；

未勾选 _Disable JavaScript samples_ 的情况下，报告区记录了 JavaScript 执行时的堆栈信息 _（图中红线框起的部分）_ ：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

勾选了 _Disable JavaScript samples_ 的情况下，**报告区只记录了一些高级事件**，比如：_Function Call_、渲染相关事件等：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## Enable advanced paint instrumentation

这个选项用于启用高级绘制仪器；当你勾选了这个选项后，Chrome 将记录更详细的绘制信息，包括每个绘制操作的时间、持续时间、绘制区域等。

勾选了 _Enable advanced paint instrumentation_ 后，当鼠标选中报告中 _Frames_ 数据的某一帧时，在下方的面板里就会多出一个 _Layers_ 的选项；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

我们知道，浏览器在渲染一个页面时会有针对性的对一些效果进行分层，**而 _Layers_ 的选项下展示的正是页面的图层树信息**：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

通过观察这些绘制操作的时间和持续时间，就能判断哪些绘制操作占用了较长的时间，可能导致页面渲染缓慢对症下药。

## CPU 和 Network

在 _CPU_ 下拉选项中，我们可以通过**降低 _CPU_ 的性能，来模拟低性能设备上的页面运行情况**；比如移动设备，或者一些比较老旧的计算机；

而 _Network_ 下拉框可以选择不同的网络条件，用于**模拟网络不佳的情况下页面的运行情况**。

## Hardware concurrency

_hardware concurrency_ 选项用于**模拟硬件并发性能**；勾选这个选项后，我们就可以选择从 1 到最大硬件并发性能水平之间的值，以模拟不同的硬件环境。

通过切换不同的 _hardware concurrency_ 值，可以观察页面在不同硬件并发性能水平下的性能表现；这对于优化页面的并发处理和多线程任务非常有帮助。

> 硬件并发性能是指处理器（CPU）同时执行多个线程或任务的能力。现代计算机通常具有多核处理器，每个核心都可以同时执行多个线程。硬件并发性能的提高可以显著提升计算机的性能和响应能力。

## 报告区

接下来就是我们的重头戏，最终性能分析报告呈现的区域；我们之前介绍的操作、设置最终都是为性能报告服务。

我们以掘金首页为例，来看看报告区都有哪些内容。

首先，我们要**打开谷歌浏览器的无痕模式**；默认快捷键是 `Command+Option+N` (Mac) 或者 `Control+Shift+N` (Windows, Linux)；

然后打开 掘金首页<sup data-darkreader-inline-color="">[1]</sup>，点击 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) _(Start Profiling and reload page)_ 按钮来进行录制；

等待几秒钟后，一份完整的性能报告就呈现出来啦：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

从上图中可以看出，这份性能报告大概可以分为两块区域：**概览区、性能报告区**。

而所有的这些性能指标都是基于时间的维度来展示的，因此在性能报告中还有一条**贯穿整个报告的时间线**。

> 使用无痕模式是为了避免安装的一些插件对性能测试产生影响。

## 概览区

首先，概览区的 x 轴就是时间线，而 y 轴展示了几个关键指标：**CPU 占用情况、NET 网络请求情况、HEAP 堆内存使用量等**；如果勾选了 _Screenshots_ 还会有**每一帧的绘制快照**。

这些指标会**以时间为顺序，通过图表的形式展现出来**。

当我们用鼠标点击这个区域，在下方的**性能报告和详情信息区域，就会呈现这一时间区间的性能情况**：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

同时，还支持通过多种方式改变时间区间的长度：

-   滚动鼠标滚轮；
    
-   按住鼠标左键拖动；
    
-   拖拽滑块时间区间两边的滑块；
    
-   键盘上的 _w_ 键和 _s_ 键。
    

而使用**键盘上的 _a_ 键和 _d_ 键则可以在固定时间区间长度的同时，精确修改时间区间的作用范围**。

## 性能报告区

这个区域呈现了许多性能指标项，我们一起来看看吧。

### Network

_Network_ 部分展现的是网络请求的瀑布图，我们点击 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 图标就可以展开这个面板：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

#### 请求的文件类型

从图中可以看出，这些网络请求的瀑布图有许多种颜色，这些**颜色就代表了请求对应的文件类型**：

#### 请求时长的构成

不知道小伙伴们有没有注意到，瀑布图中的每个请求都被分为了四个部分：**左侧的线条、中间浅色的条形图形、中间深色的条形图以及右侧的线条**；

这些划分又有什么含义呢？

-   左侧的线：我们知道，在发送一个网络请求前，需要先解析 URL、建立连接等一系列操作；而左侧的线代表了 **请求的开始，直到 Connection Start 事件组相关事件结束（包括 Connection Start 事件）** ；
    
-   中间的浅色部分条形图代表了 **Request Sent 和 Waiting _（TTFB，即 Time To First Byte）_ 的时间**；TTFB 是指从发送请求到接收到第一个字节的时间，它表示了服务器响应的延迟时间。
    
-   中间的深色部分条形图代表了**从接收到第一个字节到请求的所有内容都被下载完成的时间**。
    
-   最后右侧的线代表了**主线程等待的时间**。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

#### 请求的优先级

仔细观察每个请求，会发现请求左上角有个小小的方块，这个方块代表了本次请求的优先级。

**深蓝色的方块表示本次请求优先级更高；而浅蓝色方块表示优先级较低**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

#### 请求的详细信息

接下来，我们点击其中一个网络请求，可以看到下方的面板**展示了请求的详情信息，包括请求时间、请求方法、优先级等等**：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### Frames

_Frames_ 区域展示了绘制一个帧所花费的确切时间；在这个部分，同样用颜色来区分了四种类型的帧：

1.  空闲帧（白色）：表示在该帧中**没有发生任何渲染或更新**。
    
2.  正常帧（绿色 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)）：表示该帧**在适当的时间内被渲染出来**，没有出现延迟或问题。
    
3.  部分呈现帧（黄色，带有稀疏的宽虚线图案 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)）：表示 Chrome 尽力**在适当的时间内渲染了部分视觉更新**。例如：渲染器进程的主线程的工作延迟了，但合成器线程（如滚动）按时完成了渲染，则会出现这种情况。
    
4.  丢帧（红色，带有密集的实线图案 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)）：表示**该帧由于性能问题或其他原因导致延迟，无法按时渲染**。
    

### Timings

_Timings_ 这个模块展示了衡量网页性能（FP、FCP、DCL、LCP、L）的几个关键指标，以及完成指标对应的时间：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

我们来看看这些指标都代表什么含义：

#### FP _（First Paint）_

**指页面的首次渲染的时间点**。在完成首次渲染之前，用户看到的都是 **没有任何内容的白色页面**，也就是我们常说的 **白屏时间**。

_FP_ 可以**反映页面加载的整体速度**。

#### FCP _（First Contentful Paint）_

**指页面的首个内容绘制时间**，即浏览器在页面上绘制出第一块有实际内容的区域（如文本、图像等）的时间点。

_FCP_ 反映了用户可以看到**有意义的内容的时间**。

#### DCL _（DOM Content Loaded）_

**指当 HTML 文档被完全加载和解析后，DOM 树构建完成并且所有关联资源（如样式表、脚本等）已经下载完成，触发 DOMContentLoaded 事件的时间点**。

_DCL_ 反映了页面的可交互性，表示**页面已经准备好响应用户的操作**。

#### LCP _（Largest Contentful Paint）_

指页面上**最大的一个可见元素（如图片、文本等）绘制完成的时间点**。

_LCP_ 是衡量页面加载速度的重要指标，它反映了页面主要内容的加载完成时间。

#### L _（Load）_

**指页面完全加载完成的时间点**。包括所有资源（如图片、样式表、脚本等）都已下载完成，并且相关的 DOM、CSSOM 和 JavaScript 都已经处理完成。

_L_ 反映了整个页面加载的时间。

### Layout Shifts

这个指标用于衡量 **页面加载过程中发生的视觉不稳定性**。

那么什么叫做视觉不稳定性呢？

实际上，当用户在页面加载期间进行交互时，如果页面中的元素发生意外的移动或调整，会导致页面上的元素重新排列，从而造成视觉上的不连续和不稳定感。

这种 **元素的移动可能会干扰用户的操作**，例如点击了一个不想点到的按钮，或者导致误触其他元素。

我们点击 _Layout Shifts_ 区域的色具体色块，在下方的 _Summary_ 一栏就会展示此次位移的具体信息：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

### Main

这项指标可谓是整个性能报告中的重点区域，其中展示了 **主线程在进行的相关活动**。

#### 火焰图

_Main_ 指标中图表的这种展现方式称为火焰图；而堆叠组成火焰图的这些彩色矩形，则代表一个个函数调用堆栈：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

#### 矩形颜色

与 _Network_ 用固定颜色来区分请求类型不同，**_Main_ 指标中的颜色是随机分配的**。

但是**来自同一个脚本的调用在记录中会被分配为相同的颜色**。

#### 长任务

小伙伴们可能已经留意到了，在有的 _Task_ 中除了灰色的区域外，还有部分被红色密集实线覆盖，同时右上角还有一个红色的三角 ：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这实际上是用来标识这个任务是个**长任务**。

执行时长超过 50 毫秒的任务会被定义为长任务；而超过 50 毫秒的部分就会用这种红色密集实线覆盖 ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 。

这些长任务可能会阻塞主线程，导致页面卡顿、无法及时响应用户输入等等；是我们需要 **重点关注** 的对象。

#### 矩形堆叠逻辑

图中位于最上方的 _Task_ 表示 **一个由浏览器调度和执行的任务单元**；_Task_ 的 **长度就表示这个任务执行时间的跨度**。

而 _Task_ 下方的**这些矩形是根据函数之间的调用关系来堆放的**，比如 ——

上图中，一个指针事件 _pointermove_ 的触发，导致了一个 _（匿名函数调用（Function Call）_ ；而这个匿名函数调用又引起了 _value_ 函数的调用...以此类推一直到最后的函数 _n_。

#### 任务具体信息

下面我们来查看一下对应任务的具体信息。

当我们选中任意一个任务时，下方的面板就会展现对应的信息：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

##### Summary

_Summary_ 选项卡展示了 **当前任务的具体信息**，包括长任务警告、总任务时长、各个子任务耗时等等：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

##### Bottom-Up

_Bottom-Up_ 选项卡将**当前任务下所有活动都展示出来，并且根据时间进行倒序排序**。

这样一来，一眼就能看出是哪个活动耗费了较长的时间：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

并且还贴心的提供了筛选 _（Filter）_ 功能和分组 _（Grouping）_ 功能，方便我们分类查看：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

图中可以看出，整个图表分为三列：

-   _Self Time_ 表示这个根活动自身花费的时间；
    
-   _Total Time_ 表示这个根活动自身以及导致的子活动花费的时间总和。
    
-   _Activity_ 就是对应的活动名称；并且点击活动名称右侧的链接，还可以直接跳转到对应的源码。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

##### Call Tree

_Call Tree_ 选项卡可以用来**查看当前任务下的根活动，以及根活动引发的一系列子活动的耗时**。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

> 根活动是那些导致浏览器做一些工作的活动。比如前面提到的 _pointermove_ ，浏览器会触发一个Event活动作为根活动，该事件可能导致处理程序执行，依此类推。
> 
> 可以简单理解为火焰图顶层的活动。

##### Event Log

最后的 _Event Log_ 选项卡是**按照活动在记录过程中发生的先后顺序**来呈现表格的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这里的下拉不是用来做分组 _（Grouping）_ 的，而是**以时间为维度来过滤滤掉耗时少于 1 毫秒或 15 毫秒的活动**：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

而旁边 _Loading_、_Scripting_、_Rending_、_Painting_ 这些复选框，是用于通过类型来过滤表格中的数据：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

并且这里的表格多了一列 _Start Time_；顾名思义就是对应活动的开始时间。

### 其余部分

报告区中剩余的信息，比如 ——

-   _GPU_：展示了 GPU 的活动情况；
    
-   _Compositor_：展示了合成线程的活动情况；
    

这些都大同小异，在这里就不一一展开讲啦，留给大家自己去探索。

## 总结一下

经过上面几万字的输出，想来你已经对 _Performance_ 工具的使用知根知底了；

但是，学会使用它还只是纸上谈兵；更多的是需要我们自己动手去分析实战。

各位小伙伴不妨找几个网站来练练手，相信很快就能熟能生巧啦~

**如果喜欢我的文章或者想上岸大厂，可以关注公众号[「量子前端」](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247483710&idx=1&sn=5d982e6368f1007356182d36844ac43e&chksm=cfa1d413f8d65d0556b1ecb7ab310c9f9d017399b84ef7e52aa83f13b8c185e1f512e82f21cf&token=875951818&lang=zh_CN&scene=21#wechat_redirect)，将不定期关注推送前端好文、分享就业资料秘籍，也希望有机会一对一帮助你实现梦想。**