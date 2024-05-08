一个`Hook`让你体验极致舒适的`Dialog`使用方式！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/mshqAkialV7GpnIJ7kwNibHQ95QW0yO1lUiaz7iaiaA2cMjWibiaKvPKS1OzZzyA9duiaoGciaibKkTA4oea8iaJOewFe2y2A/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## Dialog地狱

为啥是地狱？

因为凡是有`Dialog`出现的页面，其代码绝对优雅不起来！因为一旦你在也个组件中引入`Dialog`，就最少需要额外维护一个`visible`变量。如果只是额外维护一个变量这也不是不能接受，可是当同样的`Dialog`组件，即需要在父组件控制它的展示与隐藏，又需要在子组件中控制。

为了演示我们先实现一个`MyDialog`组件，代码来自ElementPlus的Dialog示例

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;computed&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ElDialog&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'element-plus'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;props&nbsp;=&nbsp;defineProps&lt;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">visible</span>:&nbsp;boolean;<br>&nbsp;&nbsp;title?:&nbsp;string;<br>}&gt;();<br><br><span data-darkreader-inline-color="">const</span>&nbsp;emits&nbsp;=&nbsp;defineEmits&lt;{<br>&nbsp;&nbsp;(event:&nbsp;<span data-darkreader-inline-color="">'update:visible'</span>,&nbsp;<span data-darkreader-inline-color="">visible</span>:&nbsp;boolean):&nbsp;<span data-darkreader-inline-color="">void</span>;<br>&nbsp;&nbsp;(event:&nbsp;<span data-darkreader-inline-color="">'close'</span>):&nbsp;<span data-darkreader-inline-color="">void</span>;<br>}&gt;();<br><br><span data-darkreader-inline-color="">const</span>&nbsp;dialogVisible&nbsp;=&nbsp;computed&lt;boolean&gt;({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;props.visible;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(visible)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;emits(<span data-darkreader-inline-color="">'update:visible'</span>,&nbsp;visible);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!visible)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;emits(<span data-darkreader-inline-color="">'close'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>});<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElDialog</span>&nbsp;<span data-darkreader-inline-color="">v-model</span>=<span data-darkreader-inline-color="">"dialogVisible"</span>&nbsp;<span data-darkreader-inline-color="">:title</span>=<span data-darkreader-inline-color="">"title"</span>&nbsp;<span data-darkreader-inline-color="">width</span>=<span data-darkreader-inline-color="">"30%"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">span</span>&gt;</span>This&nbsp;is&nbsp;a&nbsp;message<span>&lt;/<span data-darkreader-inline-color="">span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">template</span>&nbsp;#<span data-darkreader-inline-color="">footer</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">el-button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"dialogVisible&nbsp;=&nbsp;false"</span>&gt;</span>Cancel<span>&lt;/<span data-darkreader-inline-color="">el-button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">el-button</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"primary"</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"dialogVisible&nbsp;=&nbsp;false"</span>&gt;</span>&nbsp;Confirm&nbsp;<span>&lt;/<span data-darkreader-inline-color="">el-button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ElDialog</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

### 演示场景

就像下面这样：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/mshqAkialV7GpnIJ7kwNibHQ95QW0yO1lUiavibZ6kZcV3xAdMK9Iu5vgqUzom36SZATMz84L7f51Djk47QYPDsrew/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

Kapture 

示例代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ref&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ElButton&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'element-plus'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;Comp&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/Comp.vue'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;MyDialog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/MyDialog.vue'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;dialogVisible&nbsp;=&nbsp;ref&lt;boolean&gt;(<span data-darkreader-inline-color="">false</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;dialogTitle&nbsp;=&nbsp;ref&lt;string&gt;(<span data-darkreader-inline-color="">''</span>);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;handleOpenDialog&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;dialogVisible.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;dialogTitle.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">'父组件弹窗'</span>;<br>};<br><br><span data-darkreader-inline-color="">const</span>&nbsp;handleComp1Dialog&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;dialogVisible.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;dialogTitle.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">'子组件1弹窗'</span>;<br>};<br><br><span data-darkreader-inline-color="">const</span>&nbsp;handleComp2Dialog&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;dialogVisible.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;dialogTitle.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">'子组件2弹窗'</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElButton</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"handleOpenDialog"</span>&gt;</span>&nbsp;打开弹窗&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ElButton</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件1"</span>&nbsp;@<span data-darkreader-inline-color="">submit</span>=<span data-darkreader-inline-color="">"handleComp1Dialog"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件2"</span>&nbsp;@<span data-darkreader-inline-color="">submit</span>=<span data-darkreader-inline-color="">"handleComp2Dialog"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">MyDialog</span>&nbsp;<span data-darkreader-inline-color="">v-model:visible</span>=<span data-darkreader-inline-color="">"dialogVisible"</span>&nbsp;<span data-darkreader-inline-color="">:title</span>=<span data-darkreader-inline-color="">"dialogTitle"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">MyDialog</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

这里的`MyDialog`会被父组件和两个`Comp`组件都会触发，如果父组件并不关心子组件的`onSubmit`事件，那么这里的`submit`在父组件里唯一的作用就是处理`Dialog`的展示！！！🧐这样真的好吗？不好！

来分析一下，到底哪里不好！

**`MyDialog`本来是`submit`动作的后续动作，所以理论上应该将`MyDialog`写在`Comp`组件中。但是这里为了管理方便，将`MyDialog`挂在父组件上，子组件通过事件来控制`MyDialog`。**

**再者，这里的`handleComp1Dialog`和`handleComp2Dialog`函数除了处理`MyDialog`外，对于父组件完全没有意义却写在父组件里。**

如果这里的`Dialog`多的情况下，简直就是`Dialog`地狱啊！🤯

理想的父组件代码应该是这样：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ElButton&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'element-plus'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;Comp&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/Comp.vue'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;MyDialog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/MyDialog.vue'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;handleOpenDialog&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理&nbsp;MyDialog</span><br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElButton</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"handleOpenDialog"</span>&gt;</span>&nbsp;打开弹窗&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ElButton</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件1"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件2"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

在函数中处理弹窗的相关逻辑才更合理。

## 解决之道

没错现在网上对于`Dialog`的困境，给出的解决方案基本上就“`命令式Dialog`”看起来比较优雅！这里给出几个网上现有的`命令式Dialog`实现。

### 命令式一

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/mshqAkialV7GpnIJ7kwNibHQ95QW0yO1lUFtmaJ7beeh0KgG0dGOXvFHRzSy46vmG8nJh1pMNlLkHAksHVXYpsHA/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

codeimg-facebook-shared

吐槽一下～，这种是能在函数中处理弹窗逻辑，但是缺点是`MyDialog`组件与`showMyDialog`是两个文件，增加了维护的成本。

### 命令式二

基于第一种实现的问题，不就是想让`MyDialog.vue`和`.js`文件合体吗？于是诸位贤者想到了`JSX`。于是进一步的实现是这样：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/mshqAkialV7GpnIJ7kwNibHQ95QW0yO1lUI0s39aoPUIhZ8UqDKv97ibiboiaWQWAlxExMCSia3xIXia389HAd2con6lw/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

codeimg-facebook-shared

嗯，这下完美了！🌝

**完美？还是要吐槽一下～**

-   如果我的系统中有很多弹窗，难道要给每个弹窗都写成这样吗？
    
-   这种兼容`JSX`的方式，需要引入支持`JSX`的依赖！
    
-   如果工程中不想即用`template`又用`JSX`呢？
    
-   如果已经存在使用`template`的弹窗了，难道推翻重写吗？
    
-   ...
    

## 思考

首先承认一点命令式的封装的确可以解决问题，但是现在的封装都存一定的槽点。

如果有一种方式，**即保持原来对话框的编写方式不变，又不需要关心`JSX`和`template`的问题，还保存了命令式封装的特点**。这样是不是就完美了？

那真的可以同时做到这些吗？

如果存在一个这样的Hook可以将状态驱动的Dialog，转换为命令式的Dialog吗，那不就行了？

## 它来了：useCommandComponent

父组件这样写：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ElButton&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'element-plus'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useCommandComponent&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../../hooks/useCommandComponent'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;Comp&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/Comp.vue'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;MyDialog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./components/MyDialog.vue'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;myDialog&nbsp;=&nbsp;useCommandComponent(MyDialog);<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElButton</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"myDialog({&nbsp;title:&nbsp;'父组件弹窗'&nbsp;})"</span>&gt;</span>&nbsp;打开弹窗&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ElButton</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件1"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Comp</span>&nbsp;<span data-darkreader-inline-color="">text</span>=<span data-darkreader-inline-color="">"子组件2"</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Comp</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

`Comp`组件这样写：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ElButton&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'element-plus'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useCommandComponent&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'../../../hooks/useCommandComponent'</span>;<br><br><span data-darkreader-inline-color="">import</span>&nbsp;MyDialog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./MyDialog.vue'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;myDialog&nbsp;=&nbsp;useCommandComponent(MyDialog);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;props&nbsp;=&nbsp;defineProps&lt;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">text</span>:&nbsp;string;<br>}&gt;();<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">span</span>&gt;</span>{{&nbsp;props.text&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElButton</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"myDialog({&nbsp;title:&nbsp;props.text&nbsp;})"</span>&gt;</span>提交（需确认）<span>&lt;/<span data-darkreader-inline-color="">ElButton</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

对于`MyDialog`无需任何改变，保持原来的样子就可以了！

`useCommandComponent`真的做到了，**即保持原来组件的编写方式，又可以实现命令式调用**！

使用效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Kapture

是不是感受到了莫名的舒适？🤨

不过别急😊，要想体验这种极致的舒适，你的`Dialog`还需要遵循两个约定！

## 两个约定

如果想要极致舒适的使用`useCommandComponent`，那么弹窗组件的编写就需要遵循一些约定（\_**其实这些约定应该是弹窗组件的最佳实践**\_）。

约定如下：

-   **弹窗组件的`props`需要有一个名为`visible`的属性**，用于驱动弹窗的打开和关闭。
    
-   **弹窗组件需要`emit`一个`close`事件**，用于弹窗关闭时处理命令式弹窗。
    

如果你的弹窗组件满足上面两个约定，那么就可以通过`useCommandComponent`极致舒适的使用了！！

> 这两项约定虽然不是强制的，但是这确实是最佳实践！不信你去翻所有的UI框看看他们的实现。我一直认为学习和生产中多学习优秀框架的实现思路很重要！

## 如果不遵循约定

这时候有的同学可能会说：**哎嘿，我就不遵循这两项约定呢？我的弹窗就是要标新立异的不用`visible`属性来控制打开和关闭，我起名为`dialogVisible`呢？我的弹窗就是没有`close`事件呢？我的事件是具有业务意义的`submit`、`cancel`呢？**...

得得得，如果真的没有遵循上面的两个约定，依然可以舒适的使用`useCommandComponent`，只不过在我看来没那么极致舒适！虽然不是极致舒适，但也要比其他方案舒适的多！

如果你的弹窗真的没有遵循“**两个约定**”，那么你可以试试这样做：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">//&nbsp;...</span><br><span data-darkreader-inline-color="">const</span>&nbsp;myDialog&nbsp;=&nbsp;useCommandComponent(MyDialog);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;handleDialog&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;myDialog({&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">'父组件弹窗'</span>,&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">dialogVisible</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onSubmit</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;myDialog.close(),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onCancel</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;myDialog.close(),<br>&nbsp;&nbsp;});<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ElButton</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"handleDialog"</span>&gt;</span>&nbsp;打开弹窗&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ElButton</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;!--...--&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

如上，只需要在调用`myDialog`函数时在`props`中将驱动弹窗的状态设置为`true`，在需要关闭弹窗的事件中调用`myDialog.close()`即可！

这样是不是看着虽然没有上面的极致舒适，但是也还是挺舒适的？

## 源码与实现

### 实现思路

对于`useCommandComponent`的实现思路，依然是**命令式封装**。相比于上面的那两个实现方式，`useCommandComponent`是将组件作为参数传入，这样**保持组件的编写习惯不变**。并且`useCommandComponent`**遵循单一职责原则**，只做好组件的挂载和卸载工作，提供**足够的兼容性**。

> 其实`useCommandComponent`有点像`React`中的高阶组件的概念

### 源码

源码不长，也很好理解！在实现`useCommandComponent`的时候参考了ElementPlus的MessageBox。

源码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;AppContext,&nbsp;Component,&nbsp;ComponentPublicInstance,&nbsp;createVNode,&nbsp;getCurrentInstance,&nbsp;render,&nbsp;VNode&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">interface</span>&nbsp;Options&nbsp;{<br>&nbsp;&nbsp;visible?:&nbsp;<span data-darkreader-inline-color="">boolean</span>;<br>&nbsp;&nbsp;onClose?:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">void</span>;<br>&nbsp;&nbsp;appendTo?:&nbsp;HTMLElement&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span>;<br>&nbsp;&nbsp;[key:&nbsp;<span data-darkreader-inline-color="">string</span>]:&nbsp;unknown;<br>}<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">interface</span>&nbsp;CommandComponent&nbsp;{<br>&nbsp;&nbsp;(options:&nbsp;Options):&nbsp;VNode;<br>&nbsp;&nbsp;close:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">void</span>;<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;getAppendToElement&nbsp;=&nbsp;(props:&nbsp;Options):&nbsp;<span><span>HTMLElement</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;appendTo:&nbsp;HTMLElement&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.body;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(props.appendTo)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">typeof</span>&nbsp;props.appendTo&nbsp;===&nbsp;<span data-darkreader-inline-color="">'string'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;appendTo&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.querySelector&lt;HTMLElement&gt;(props.appendTo);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(props.appendTo&nbsp;<span data-darkreader-inline-color="">instanceof</span>&nbsp;HTMLElement)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;appendTo&nbsp;=&nbsp;props.appendTo;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!(appendTo&nbsp;<span data-darkreader-inline-color="">instanceof</span>&nbsp;HTMLElement))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;appendTo&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.body;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;appendTo;<br>};<br><br><span data-darkreader-inline-color="">const</span>&nbsp;initInstance&nbsp;=&nbsp;&lt;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Component&gt;(<br>&nbsp;&nbsp;Component:&nbsp;T,<br>&nbsp;&nbsp;props:&nbsp;Options,<br>&nbsp;&nbsp;container:&nbsp;HTMLElement,<br>&nbsp;&nbsp;appContext:&nbsp;AppContext&nbsp;|&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span><br>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;vNode&nbsp;=&nbsp;createVNode(Component,&nbsp;props);<br>&nbsp;&nbsp;vNode.appContext&nbsp;=&nbsp;appContext;<br>&nbsp;&nbsp;render(vNode,&nbsp;container);<br><br>&nbsp;&nbsp;getAppendToElement(props).appendChild(container);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;vNode;<br>};<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useCommandComponent&nbsp;=&nbsp;&lt;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Component&gt;(Component:&nbsp;T):&nbsp;<span><span>CommandComponent</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;appContext&nbsp;=&nbsp;getCurrentInstance()?.appContext;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;补丁：Component中获取当前组件树的provides</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(appContext)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;currentProvides&nbsp;=&nbsp;(getCurrentInstance()&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">any</span>)?.provides;<br>&nbsp;&nbsp;&nbsp;&nbsp;Reflect.set(appContext,&nbsp;<span data-darkreader-inline-color="">'provides'</span>,&nbsp;{...appContext.provides,&nbsp;...currentProvides});<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;container&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'div'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;close&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;render(<span data-darkreader-inline-color="">null</span>,&nbsp;container);<br>&nbsp;&nbsp;&nbsp;&nbsp;container.parentNode?.removeChild(container);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;CommandComponent&nbsp;=&nbsp;(options:&nbsp;Options):&nbsp;<span><span>VNode</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!Reflect.has(options,&nbsp;<span data-darkreader-inline-color="">'visible'</span>))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.visible&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">typeof</span>&nbsp;options.onClose&nbsp;!==&nbsp;<span data-darkreader-inline-color="">'function'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.onClose&nbsp;=&nbsp;close;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;originOnClose&nbsp;=&nbsp;options.onClose;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;options.onClose&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;originOnClose();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;close();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;vNode&nbsp;=&nbsp;initInstance&lt;T&gt;(Component,&nbsp;options,&nbsp;container,&nbsp;appContext);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;vm&nbsp;=&nbsp;vNode.component?.proxy&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;ComponentPublicInstance&lt;Options&gt;;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;prop&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;options)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(Reflect.has(options,&nbsp;prop)&nbsp;&amp;&amp;&nbsp;!Reflect.has(vm.$props,&nbsp;prop))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vm[prop&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;keyof&nbsp;ComponentPublicInstance]&nbsp;=&nbsp;options[prop];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;vNode;<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;CommandComponent.close&nbsp;=&nbsp;close;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;CommandComponent;<br>};<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;useCommandComponent;<br></code>
```

除了命令式的封装外，我加入了`const appContext = getCurrentInstance()?.appContext;`。这样做的目的是，传入的组件在这里其实已经独立于应用的Vue上下文了。为了让组件依然保持和调用方相同的Vue上下文，我这里加入了获取上下文的操作！

基于这个情况，在使用`useCommandComponent`时需要保证它在`setup`中被调用，而不是在某个点击事件的处理函数中哦~

## 源码补丁

非常感谢@bluryar关于命令式组件无法获取当前组件树的 injection 的指出！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

趁着热乎，我想到一个解决获取当前injection的解决办法。那就是将当前组件树的`provides`与`appContext.provides`合并，这样传入的弹窗组件就可以顺利的获取到`app`和当前组件树的`provides`了！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)