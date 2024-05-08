_**点击**__**小卡片**_

_**_![Image](https://mmbiz.qpic.cn/mmbiz_png/b96CibCt70iaajvl7fD4ZCicMcjhXMp1v6UibM134tIsO1j5yqHyNhh9arj090oAL7zGhRJRq6cFqFOlDZMleLl4pw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)_参与粉丝**__**专属福利**__![Image](https://mmbiz.qpic.cn/mmbiz_png/b96CibCt70iaajvl7fD4ZCicMcjhXMp1v6UibM134tIsO1j5yqHyNhh9arj090oAL7zGhRJRq6cFqFOlDZMleLl4pw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)_

哦哦哦，最近，又有一个新词蹦进俺这本就不大的脑里，并在脑子里来回转圈，在好奇心的促使下，我开始试着去了解了一下它，那它究竟是什么呢，标题已经告诉你答案了，**「TensorFlow.js」**。

可能会有人问了：`TensorFlow.js` 不是早就推出了吗，咋现在才知道。俺吧，天生脑子就不太好，学东西就慢，对知识这种东西有选择性障碍，这样解释你可还满意😔。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/lCQLg02gtibuQcdCSicNvkJwI3iab9ZBj28DjPbLubyiaMOBbAVbia2VDt9yjWZFGTibYZJ6Qm07X8YSiaIYUjwo82PibA/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  

## 唠叨唠叨

`TensorFlow` 对于学习前端的应该比较陌生，它主要是用在人工智能领域的，俺在网上找了一篇文章TensorFlow 简介\_tensorflow简介-CSDN博客，帮助你简单理解 `TensorFlow` 是干啥的，其实吧，这东西本来是跟咱们干前端的是毫无关系的，但谁知道，前端都是卷王，一个比一个能卷。就在2018， `TensorFlow` 开发者峰会上，`TensorFlow` 宣布重大更新：增加支持JavaScript，并推出开源库 `TensorFlow.js` ，用户可以完全在浏览器定义、训练和运行机器学习模型。好家伙，这下，跟咱们前端就有关系了（俺只能说，谷歌，你是懂得卷死前端滴😭）。

`TensorFlow.js` 相当于把 `TensorFlow` 中的一些核心功能移植到了JavaScript中去，它主要是可以应用在开发一些比较轻量级的前端应用上的一些小的功能模块。

## 啥是TensorFlow.js

`TensorFlow.js(tfjs)` 是一个用于在浏览器或 `Node.js` 中创建、训练和部署机器学习模型的 JavaScript 库，由 Nikhil Thorat 和 Daniel Smilkov 在谷歌创建，最初名为 Deeplearn.js，2018 年被合并到 TensorFlow 团队，更名为 TensorFlow.js。

## 它能在前端开发上干啥用

1.  **「运行模型」**
    

它可以在我们的浏览器上运行一些已经训练好的一些简单的模型；

2.  **「再训练模型」**
    

如果你已经有模型了，先把它在浏览器上运行起来，然后通过使用 `JavaScript` 做再训练，这样可以把它更加贴近我们所需要的应用场景；

3.  **「用JS开发机器学习」**
    

你可以不用 `Python` ，采用 `JavaScript` 就可以开发属于自己的机器模型（那这就有点高级了，俺有点完不来）。

**「小提示：」** 可能有人会问那个模型指的是什么，俺在网上搜了搜，简单理解就是 **「如何对现实当中的一些真实事件进行简化的理解，就是通过这个模型去实现的，就例如咱们常用的高德地图，它就是对真实事件进行了简化的理解从而实现在应用上的」**

## 作为前端开发人员学习这个有啥用

> ❝
> 
> 前端开发领域，不是在浏览器中用到就是在 `nodeJS` 中用到，通过这两种采用 `JavaScript` 使用 `TensorFlow.js` 。真的，干前端的没有一个不是卷王，俺认为的，因为俺身边的，干前端的，都比俺还能卷，一个比一个卷，**「嘴讲着我不卷，半夜偷偷去了解」**。
> 
> ❞

### 在浏览器中使用

1.  利于用户交互，对于许多产品和公司来讲，一个网站是与客户或用户互动的主要方式，也可能有一个应用程序，但通常这些应用程序是使用与网站，因此，对于面向用户的应用程序，直接集成机器学习模型可能会非常有益进入用户界面；
    
2.  现在的 `web api` 使我们可以访问许多设备输入。例如，相机，无论是在手机上还是在电脑上。因此，在用户允许的情况下，我们可以在机器学习任务中使用来自相机的图像，这种环境的另一个优点是我们正在利用设备的计算能力，因此，它是用户的设备，而不是中央处理器或云环境，这极大的有助于扩展产品，因为我们不必去使用昂贵的集中式资源。
    
3.  它可以保护用户的隐私。如果我们可以在浏览器中，在用户的设备上进行机器学习，那我们不一定需要向服务器发送可能是个人数据。根据应用程序和目标受众，这可能会让用户放心。
    

### 在 nodeJs 中使用

如果我们的后端是采用 `nodeJs` 写的，那么使用 `JavaScript` 添加机器学习会容易得多。基于框架，而不是必须与另一种语言如 Python 集成，特别是使用 `JavaScript` 环境中的 `TensorFlow.js` 对于初创企业来说是一种很好的文化契合。`nodeJs` 是初创企业非常受欢迎的选择，因为它允许后端快速 开发和在相同的语言 `JavaScript` 作为前端。

## 上手试一试

> ❝
> 
> 俺会在浏览器和nodeJs两个环境都使用一下
> 
> ❞

## 浏览器中使用

在浏览器中可通过两种方法去使用它：

### 使用包管理器（npm、yarn、pnpm）以及构建工具（vite、webpack）

可以通过`npm`或`yarn`或`pnpm`等包管理器安装`tfjs`。当您需要在客户端项目（如 React 和 Vue 项目）中使用`tfjs`时，这会非常有用（俺这里用 `pnpm`，采用vue构建）。

1.  构建vue（这里就不去说咱构建了）：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm create vue<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

2.  引入 `TensorFlow.js` 包：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm install @tensorflow/tfjs<br></code>
```

3.  在 `components/HelloWorld.vue` 下添加如下代码（俺这用另一个测试代码去测试一下 `TensorFlow.js` 是否运行成功）：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;script setup&gt;<br>import * as tf from "@tensorflow/tfjs";<br>const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);<br>const y = tf.tensor2d([1, 3, 5, 7], [2, 2]);<br>const sum = x.add(y);<br>sum.print();<br>&lt;/script&gt;<br><br>&lt;template&gt;<br> &nbsp;&lt;div class="greetings"&gt;<br> &nbsp; &nbsp;&lt;h1&gt;Hello TensorFlow&lt;/h1&gt;<br> &nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br></code>
```

4.  接着打开浏览器控制台，如果会打印如下内容，则说明运行成功：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 使用脚本标签，也就是cdn

新建一个html文件（俺这是TensorFlow.html），复制官网的cdn：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">html</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">head</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">meta</span>&nbsp;<span data-darkreader-inline-color="">charset</span>=<span data-darkreader-inline-color="">"UTF-8"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">meta</span>&nbsp;<span data-darkreader-inline-color="">name</span>=<span data-darkreader-inline-color="">"viewport"</span>&nbsp;<span data-darkreader-inline-color="">content</span>=<span data-darkreader-inline-color="">"width=device-width,&nbsp;initial-scale=1.0"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">title</span>&gt;</span>TensorFlow<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">title</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">head</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello&nbsp;TensorFlow<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">html</span>&gt;</span><br><br></code>
```

在浏览器（俺这用的是Google Chrome）上运行，打开控制台 `Console` 如果加载出来后没有报错（要是报错的话，你可以刷新一下试试看），那就没问题：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

导入成功后，你可以在控制台中输入一些内容，比如，你想知道 `TensorFlow.js` 当前的版本：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">tf.version<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

接着找到官网的运行示例，该示例以便于我们快速测试 `TensorFlow.js` 库提供的，复制它：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">html</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br>&nbsp;&nbsp;//&nbsp;略<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">h1</span>&gt;</span>Hello&nbsp;TensorFlow<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"micro-out-div"</span>&gt;</span>Training...<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">script</span>&gt;</span><span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Create&nbsp;a&nbsp;simple&nbsp;model.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;model&nbsp;=&nbsp;tf.sequential();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model.add(tf.layers.dense({&nbsp;<span data-darkreader-inline-color="">units</span>:&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">inputShape</span>:&nbsp;[<span data-darkreader-inline-color="">1</span>]&nbsp;}));<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Prepare&nbsp;the&nbsp;model&nbsp;for&nbsp;training:&nbsp;Specify&nbsp;the&nbsp;loss&nbsp;and&nbsp;the&nbsp;optimizer.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model.compile({&nbsp;<span data-darkreader-inline-color="">loss</span>:&nbsp;<span data-darkreader-inline-color="">"meanSquaredError"</span>,&nbsp;<span data-darkreader-inline-color="">optimizer</span>:&nbsp;<span data-darkreader-inline-color="">"sgd"</span>&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Generate&nbsp;some&nbsp;synthetic&nbsp;data&nbsp;for&nbsp;training.&nbsp;(y&nbsp;=&nbsp;2x&nbsp;-&nbsp;1)</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;xs&nbsp;=&nbsp;tf.tensor2d([<span data-darkreader-inline-color="">-1</span>,&nbsp;<span data-darkreader-inline-color="">0</span>,&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">2</span>,&nbsp;<span data-darkreader-inline-color="">3</span>,&nbsp;<span data-darkreader-inline-color="">4</span>],&nbsp;[<span data-darkreader-inline-color="">6</span>,&nbsp;<span data-darkreader-inline-color="">1</span>]);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ys&nbsp;=&nbsp;tf.tensor2d([<span data-darkreader-inline-color="">-3</span>,&nbsp;<span data-darkreader-inline-color="">-1</span>,&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">3</span>,&nbsp;<span data-darkreader-inline-color="">5</span>,&nbsp;<span data-darkreader-inline-color="">7</span>],&nbsp;[<span data-darkreader-inline-color="">6</span>,&nbsp;<span data-darkreader-inline-color="">1</span>]);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Train&nbsp;the&nbsp;model&nbsp;using&nbsp;the&nbsp;data.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model.fit(xs,&nbsp;ys,&nbsp;{&nbsp;<span data-darkreader-inline-color="">epochs</span>:&nbsp;<span data-darkreader-inline-color="">250</span>&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Use&nbsp;the&nbsp;model&nbsp;to&nbsp;do&nbsp;inference&nbsp;on&nbsp;a&nbsp;data&nbsp;point&nbsp;the&nbsp;model&nbsp;hasn't&nbsp;seen.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Should&nbsp;print&nbsp;approximately&nbsp;39.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">"micro-out-div"</span>).innerText&nbsp;=&nbsp;model<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.predict(tf.tensor2d([<span data-darkreader-inline-color="">20</span>],&nbsp;[<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">1</span>]))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.dataSync();<br>&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">html</span>&gt;</span><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

刷新后，数字也会发生变化。如果到这一步了，没用出现任何问题，那就说明你已经成功导入并正常运行 `TensorFlow.js` 了。

## nodeJs中使用

1.  初始化：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm init<br></code>
```

2.  安装依赖：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm install @tensorflow/tfjs<br></code>
```

3.  新建js文件（俺这是TensorFlow.js）:
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)4\.  编写测试代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;tf&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"@tensorflow/tfjs"</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;xs&nbsp;=&nbsp;tf.randomNormal([<span data-darkreader-inline-color="">100</span>,&nbsp;<span data-darkreader-inline-color="">10</span>]);<br><span data-darkreader-inline-color="">const</span>&nbsp;ys&nbsp;=&nbsp;tf.randomNormal([<span data-darkreader-inline-color="">100</span>,&nbsp;<span data-darkreader-inline-color="">1</span>]);<br><span data-darkreader-inline-color="">const</span>&nbsp;sum&nbsp;=&nbsp;xs.add(ys);<br><span data-darkreader-inline-color="">const</span>&nbsp;xsSum&nbsp;=&nbsp;xs.sum();<br><span data-darkreader-inline-color="">const</span>&nbsp;xsMean&nbsp;=&nbsp;xs.mean();<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Sum&nbsp;of&nbsp;xs&nbsp;and&nbsp;ys"</span>);<br>sum.print();<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Sum&nbsp;of&nbsp;xs"</span>);<br>xsSum.print();<br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Mean&nbsp;of&nbsp;xs"</span>);<br>xsMean.print();<br></code>
```

当我们想要查看底层数据时，我们在张量上调用`print()`函数。如果我们使用默认的`console.log`，我们会得到`Tensor`对象。

5.  运行js文件：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">node TensorFlow.js<br></code>
```

6.  出现如下输出，说明运行测试成功：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 当TensorFlow.js遇上了微信小程序

> ❝
> 
> 谷歌在上海开发者大会（GDD）上，介绍了基于微信小程序的 TensorFlow.js 插件，该插件可帮助开发者将机器学习能力简洁地带到小程序里，它的识别类型包括图像、语音、文字等。现在，机器学习的能力在小程序中应用十分广泛，为各类行业带来了便利。那么接下来，让俺来瞅瞅能摩擦出什么样的火花。
> 
> ❞

## 创建微信小程序项目

首先进入这个网站：https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx6afed118d9e81df9&token=776787123&lang=zh\_CN，如果没添加，点击添加即可。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

创建一个微信小程序的基础项目（如果你没有安装微信开发工具，那需要先安装一下，并注册个微信小程序的账号。不会微信小程序开发的话可以去网上搜索相关教程学一下）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 删除无用代码段

删除app.js多余代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">App({<br>&nbsp;&nbsp;onLaunch()&nbsp;{}<br>})<br></code>
```

删除 `logs` 日志目录，并删除 `app.json` 对应的文件路径

目前代码目录：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 安装TensorFlow.js相关

接下来通过 `pnpm/npm/yarn` （俺用的pnpm）,安装第一个项目所需要的包：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""># 打开控制台，进入项目根目录，初始化<br>pnpm init<br># 安装相关依赖， 暂时只用这两个后面需要的话再安<br>pnpm i @tensorflow/tfjs-core @tensorflow/tfjs-converter @tensorflow/tfjs-backend-webgl fetch-wechat<br></code>
```

将`index.js`修改为`app.js`：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

包都安装好后，选择菜单栏上的工具-构建npm：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**「牢记：」** 每次安装一个新的包的时候，都需要进行一次构建npm，不然项目就无法使用这些包。

### 引入插件包

在 app.json 中声明需要使用的插件：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;略</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugins"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"tfjsPlugin"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"0.2.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"provider"</span>:&nbsp;<span data-darkreader-inline-color="">"wx6afed118d9e81df9"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;略</span><br>}<br></code>
```

对于小程序而言，由于有2M的app大小限制，不建议直接使用联合包，而是按照需求加载分包

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;package.json</span><br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"tensor-flow"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"version"</span>:&nbsp;<span data-darkreader-inline-color="">"1.0.0"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"tensorflow"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"main"</span>:&nbsp;<span data-darkreader-inline-color="">"app.js"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"test"</span>:&nbsp;<span data-darkreader-inline-color="">"echo&nbsp;"</span>Error:&nbsp;no&nbsp;test&nbsp;specified<span data-darkreader-inline-color="">"&nbsp;&amp;&amp;&nbsp;exit&nbsp;1"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"keywords"</span>:&nbsp;[],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"author"</span>:&nbsp;<span data-darkreader-inline-color="">"https://gitee.com/tease-not-bald"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"license"</span>:&nbsp;<span data-darkreader-inline-color="">"ISC"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"dependencies"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@tensorflow/tfjs-backend-webgl"</span>:&nbsp;<span data-darkreader-inline-color="">"^4.13.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@tensorflow/tfjs-converter"</span>:&nbsp;<span data-darkreader-inline-color="">"^4.13.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@tensorflow/tfjs-core"</span>:&nbsp;<span data-darkreader-inline-color="">"^4.13.0"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"fetch-wechat"</span>:&nbsp;<span data-darkreader-inline-color="">"^0.0.3"</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

相关包的解释，在文档中都有解释，俺这就不一一说明了：https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx6afed118d9e81df9&token=776787123&lang=zh\_CN#tensorflow-js-

### 使用插件

在app.js的onLaunch里调用插件configPlugin函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;fetchWechat&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'fetch-wechat'</span>);<br><span data-darkreader-inline-color="">var</span>&nbsp;tf&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@tensorflow/tfjs-core'</span>);<br><span data-darkreader-inline-color="">var</span>&nbsp;webgl&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'@tensorflow/tfjs-backend-webgl'</span>);<br><span data-darkreader-inline-color="">var</span>&nbsp;plugin&nbsp;=&nbsp;requirePlugin(<span data-darkreader-inline-color="">'tfjsPlugin'</span>);<br>App({<br>&nbsp;&nbsp;onLaunch()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;plugin.configPlugin({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;polyfill&nbsp;fetch&nbsp;function</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">fetchFunc</span>:&nbsp;fetchWechat.fetchFunc(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;inject&nbsp;tfjs&nbsp;runtime</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tf,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;inject&nbsp;webgl&nbsp;backend</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;webgl,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;provide&nbsp;webgl&nbsp;canvas</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">canvas</span>:&nbsp;wx.createOffscreenCanvas()<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;}<br>})<br></code>
```

在控制台打印一下，测试插件是否引入成功：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">App({<br>&nbsp;&nbsp;onLaunch()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;plugin.configPlugin({});<br>&nbsp;&nbsp;&nbsp;&nbsp;tf.tensor([<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">2</span>,<span data-darkreader-inline-color="">3</span>,<span data-darkreader-inline-color="">4</span>]).print()<br>&nbsp;&nbsp;}<br>})<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如果控制台打印以下内容，则说明插件引入成功了。

## camera对象和canvas对象

再`index.wxml`添加`camera`，修改index目录下相关文件的代码段：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;scroll-view class="scrollarea" scroll-y type="list"&gt;<br>  &lt;view class="container"&gt;<br> &nbsp;  &lt;camera&gt;&lt;/camera&gt;<br>  &lt;/view&gt;<br>&lt;/scroll-view&gt;<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">page {<br>  height: 100vh;<br>  display: flex;<br>  flex-direction: column;<br>}<br>.scrollarea {<br>  flex: 1;<br>  overflow-y: hidden;<br>}<br></code>
```

删除 `app.wxss` 内的 `padding`

### 调取摄像头

通过微信文档里的代码段，测试摄像头是否启用：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">// index.wxml<br>&lt;view class="container"&gt;<br>  &lt;camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"&gt;&lt;/camera&gt;<br>  &lt;button type="primary" bindtap="takePhoto"&gt;拍照&lt;/button&gt;<br>  &lt;view&gt;预览&lt;/view&gt;<br>  &lt;image mode="widthFix" src="{{src}}"&gt;&lt;/image&gt;<br>&lt;/view&gt;<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;index.js</span><br>Page({<br>&nbsp;&nbsp;takePhoto()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;wx.createCameraContext()<br>&nbsp;&nbsp;&nbsp;&nbsp;ctx.takePhoto({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">quality</span>:&nbsp;<span data-darkreader-inline-color="">'high'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">success</span>:&nbsp;<span>(<span>res</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.setData({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">src</span>:&nbsp;res.tempImagePath<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;error(e)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(e.detail)<br>&nbsp;&nbsp;}<br>})<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

俺也就暂时学到这里，后面还没开始，等学到了，俺再来继续分享。

好了，广大网友们，开喷😓

如果文章对你有帮助的话欢迎

**「关注+点赞+收藏」**