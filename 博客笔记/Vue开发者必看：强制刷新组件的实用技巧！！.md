## 需求背景

这几天开发项目，做了一个**「可滚动的表格」**，表格用的是**「公司的组件」**。正常情况下，一切滚动行为正常。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibvxKeswYwrSiaRIzGia8G66bwIPp4zPIE8LubnCeSXIxg35icnvjWxM3sZgNvATPibObibvQklVv6iag1qQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

但，当我通过页面内的操作改变表格高度时，bug出现了！`如图，可以清楚的发现，滚动条滚动异常了！有一部分超出了表格区域。`

![Image](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibvxKeswYwrSiaRIzGia8G66bwXLFurBClv9YJAhibBfcUsiaqic5hdzTJIjZXMLibwnHeDicBPOrJBbqfichg/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

一番检查下来，我发现了问题：`公司表格组件的内部滚动组件封装的有问题，当表格的高度变化时，它没有监听响应，依旧使用之前的容器高度作为滚动区域。因此，滚动条才会出现如此怪异的问题。`

我尝试改变手动改变组件内的dom高度，但是滚动条依旧有问题，因为这里的滚动条高度是在组件内部计算的。

> ❝
> 
> 显然，要解决这个问题，最好的办法就是从源头出发，去**「更改组件库底层源码」**。但这不现实，公司底层组件的bug修复需要很久，还要求爷爷告奶奶，最后发版才能用。
> 
> ❞

于是，我想到了一个简单的办法：**「强制更新组件，让它的样式什么的全部重新加载！」**

## 如何强制更新组件

## 使用v-if

在vue中，我们通常会使用**「v-if」**或者**「v-show」**来控制组件的显示与隐藏，`v-if会让组件销毁与重新渲染`，显然，我可以使用v-if来强制重新渲染组件。

```
<span></span><code>&lt;template&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>span</span>&nbsp;@<span>click</span>=<span>"update"</span>&gt;</span>组件重新渲染<span>&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ControlTable</span>&nbsp;<span>v-if</span>=<span>"show"</span>&gt;</span><span>&lt;/<span>ControlTable</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&lt;<span>/template&gt;<br>&lt;script&nbsp;setup&gt;<br>import&nbsp;ControlTable&nbsp;from&nbsp;'./</span>ControlTable.vue<span>';<br><br>const&nbsp;show&nbsp;=&nbsp;ref(true);<br><br>const&nbsp;update&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;show.value&nbsp;=&nbsp;false;<br>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show.value&nbsp;=&nbsp;true;<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;500);<br>};<br>&lt;/script&gt;<br></span></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过设置定时器及控制show的状态，我们实现了强制更新组件的目的。但是，由于定时器设置了500ms，导致页面有短暂的空白。其实，这个问题很好解决，我们将时间设置为0就可以了。

```
<span></span><code><span>const</span>&nbsp;update&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;show.value&nbsp;=&nbsp;<span>false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;show.value&nbsp;=&nbsp;<span>true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;<span>0</span>);<br>};<br></code>
```

如图，这样就解决了短暂白屏的问题。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> ❝
> 
> 你可能好奇为啥设置0也能实现，这其实和js的事件循环有关，setTimeout是宏任务，它会在所有微任务执行完后才继续执行。
> 
> ❞

## 使用v-bind:key

**「v-bind:key」**（通常简写为 :key）是我们非常熟悉的东西。它用于在渲染列表时为每个元素提供唯一标识，以便 Vue 能够高效地更新和重新渲染元素。

我们熟悉的它经常这么用

```
<span></span><code>&lt;template&gt;<br>&nbsp;&nbsp;<span><span>&lt;<span>ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>li</span>&nbsp;<span>v-for</span>=<span>"user&nbsp;in&nbsp;users"</span>&nbsp;<span>:key</span>=<span>"user.id"</span>&gt;</span>{{&nbsp;user.name&nbsp;}}<span>&lt;/<span>li</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span>ul</span>&gt;</span></span><br>&lt;<span>/template&gt;<br></span></code>
```

它还有另一个作用：**「当它变化时，它会强制更新组件！」**

```
<span></span><code>&lt;template&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>span</span>&nbsp;@<span>click</span>=<span>"update"</span>&gt;</span>组件重新渲染<span>&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ControlTable</span>&nbsp;<span>:key</span>=<span>'time'</span>&gt;</span><span>&lt;/<span>ControlTable</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&lt;<span>/template&gt;<br>&lt;script&nbsp;setup&gt;<br>import&nbsp;ControlTable&nbsp;from&nbsp;'./</span>ControlTable.vue<span>';<br><br>const&nbsp;time&nbsp;=&nbsp;ref(0);<br><br>const&nbsp;update&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;time.value++<br>};<br>&lt;/script&gt;<br></span></code>
```

上述代码中，当点击按钮时，key的值会变化，从而强制重新渲染子组件。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

它的效果和v-if完全一致。

## 什么情况下还可以强制更新组件

除了解决样式问题，我们还可以使用强制更新组件的方式重置组件内的数据状态等内容。

假设我们接手了一个项目，项目要求我们点击某个按钮后，重新请求组件内的数据。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

正常情况下，我们肯定是在组件外部调用组件内的初始化方法或者接口。

```
<span></span><code>&lt;template&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>span</span>&nbsp;@<span>click</span>=<span>"update"</span>&gt;</span>更新组件内数据<span>&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ControlTable</span>&nbsp;<span>ref</span>=<span>'table'</span>&gt;</span><span>&lt;/<span>ControlTable</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&lt;<span>/template&gt;<br>&lt;script&nbsp;setup&gt;<br>import&nbsp;ControlTable&nbsp;from&nbsp;'./</span>ControlTable.vue<span>';<br><br>const&nbsp;table&nbsp;=&nbsp;ref(null);<br><br>const&nbsp;update&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;调用组件内的初始化方法<br>&nbsp;&nbsp;&nbsp;&nbsp;table.value.init();<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;调用组件内的某个数据请求<br>&nbsp;&nbsp;&nbsp;&nbsp;table.value.fecth1();<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;调用组件内的某个数据请求<br>&nbsp;&nbsp;&nbsp;&nbsp;table.value.fecth2();<br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;调用组件内的某个数据请求<br>&nbsp;&nbsp;&nbsp;&nbsp;table.value.fecth2();&nbsp;<br>};<br>&lt;/script&gt;<br></span></code>
```

基于这种方法，我们必须看别人的（shishan）代码，知道哪些方法用来更新数据，费时费力！

但是，我们如果强制更新组件，组件会重新加载，一切就会变得非常简单！

```
<span></span><code>&lt;template&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>span</span>&nbsp;@<span>click</span>=<span>"update"</span>&gt;</span>更新组件内数据<span>&lt;/<span>span</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>ControlTable</span>&nbsp;<span>:key</span>=<span>'time'</span>&gt;</span><span>&lt;/<span>ControlTable</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span></span><br>&lt;<span>/template&gt;<br>&lt;script&nbsp;setup&gt;<br>import&nbsp;ControlTable&nbsp;from&nbsp;'./</span>ControlTable.vue<span>';<br><br>&nbsp;const&nbsp;time&nbsp;=&nbsp;ref(new&nbsp;Date().getTime());<br><br>const&nbsp;update&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;time.value&nbsp;=&nbsp;new&nbsp;Date().getTime();<br>};<br>&lt;/script&gt;<br></span></code>
```

## 总结

在Vue中，`通常不需要强制更新组件，因为Vue的响应式系统会自动追踪依赖并在数据变化时自动更新视图`。然而，基于时间、条件等现实情况下，我们有时迫不得已需要强制更新组件，解决一些难以处理的问题。主要方法就是使用v-if或者更新组件的key值，实际开发中，大家还是仁者见仁，结合实际情况，尽量避免使用把。