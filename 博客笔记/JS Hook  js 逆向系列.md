## 一、技术原理

简单来说，`js hook` 就是通过修改 `javascript` 代码，改变原有的代码执行流程，得到我们希望的结果

`javascript` 代码是在我们本地浏览器执行的，因此从理论上来说，无论执行流程多么长，多么复杂，我们想让其在某个位置停下，代码就得停下，之后我们进行一顿操作：修改变量的值、修改函数执行逻辑、修改类的原型等，之后代码根据我们的修改继续执行下去

这里引用**K哥爬虫**文章中的一个比喻，我觉得很恰当

> 通俗来讲，Hook 其实就是拦路打劫，马邦德带着老婆，出了城，吃着火锅，还唱着歌，突然就被麻匪劫了，张麻子劫下县长马邦德的火车，摇身一变化身县长，带着手下赶赴鹅城上任。Hook 的过程，就是张麻子顶替马邦德的过程。
> 
> https://segmentfault.com/a/1190000040756228

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/fZT30hrVgRfZqzWNgHKv2x9EduwkTHJUibNMTJSqGPat3X3JSoPk4WSDIUMS4w4efSKasUib32TnqqXA0mbSzj4w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这是一段大家经常在 `XSS` 中用来绕过 `WAF` 的语句

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">x<span data-darkreader-inline-color="">";&nbsp;var&nbsp;a&nbsp;=&nbsp;alert;&nbsp;a(1);&nbsp;var&nbsp;b&nbsp;=&nbsp;"</span>&nbsp;<br></code>
```

其实本质上就是一种 `hook`，只不过我们没有对 `alert` 做额外的操作来改变执行流程而已

## 二、Hook 的意义

这里主要谈 `hook` 对我们在进行 js 逆向过程中的意义

很多时候我们需要确定某个特定的值是如何生成的，例如请求数据的签名值 `sign`

即使请求参数没有加密，但是在请求数据包中的 `Cookie`、`Header`、`URL` 等部分加入了基于请求数据的加密签名值，这会导致我们在请求数据中加入 `payload` 后，签名验证不通过

通过对特定函数的 `hook` 可以有效监控特定值的添加位置，此时通过断点加上跟栈分析就可以有效追踪该签名值的生成过程

## 三、Hook 实现方法

### 1\. 赋值替换

其实之前在《Linux 后门系列》文章中就涉及到赋值替换的 `hook` 技术

上面举的关于`XSS`绕过`waf`的例子也是赋值替换的方法，但不够完整，现在我们尝试完善它

`hook alert`函数

首先，我们需要先找到 `alert` 函数的定义

> https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">alert(message)<br></code>
```

参数

`message`  可选

要显示在警告对话框中的字符串，如果传入其他类型的值，会转换成字符串。

返回值

无（`undefined`）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;备份需要&nbsp;hook&nbsp;的方法</span><br><span data-darkreader-inline-color="">const</span>&nbsp;originalAlert&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.alert;<br><br><span data-darkreader-inline-color="">//&nbsp;定义钩子函数</span><br><span data-darkreader-inline-color="">window</span>.alert&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;方法执行前执行的内容</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'alert&nbsp;初始化'</span>);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;执行原函数</span><br>&nbsp;&nbsp;originalAlert.apply(<span data-darkreader-inline-color="">this</span>,&nbsp;<span data-darkreader-inline-color="">arguments</span>);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;方法执行后执行的内容</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'alert&nbsp;执行结束'</span>);<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;防止钩子被检测</span><br><span data-darkreader-inline-color="">window</span>.alert.toString&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"function&nbsp;alert()&nbsp;{&nbsp;[native&nbsp;code]&nbsp;}"</span>;<br>};<br></code>
```

我们让 `chatgpt` 帮我们生成 `hook` 代码

`hook` 前的 `alert("hello")`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

`hook` 后的 `alert("hello")`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样我们就可以针对性的进行相关的检测和修改了

我希望在 `alert("hello")` 的时候进入 `debugger`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;originalAlert&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.alert;<br><br><span data-darkreader-inline-color="">window</span>.alert&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>...args</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;message&nbsp;=&nbsp;args[<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(message&nbsp;===&nbsp;<span data-darkreader-inline-color="">"hello"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"调试信息：参数值为&nbsp;'hello'"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;originalAlert.apply(<span data-darkreader-inline-color="">this</span>,&nbsp;args);<br>};<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

相信你看到这里已经知道我们为什么要 `hook` 了，当然不知道也没关系，后面会举例说明

### 2\. Object.defineProperty

> 直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象。
> 
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global\_Objects/Object/defineProperty

#### 语法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">Object</span>.defineProperty(obj,&nbsp;prop,&nbsp;descriptor)<br></code>
```

#### 参数

-   `obj`
    
    要定义属性的对象。
    
-   `prop`
    
    一个字符串或 `Symbol`，指定了要定义或修改的属性键。
    
-   `descriptor`
    
    要定义或修改的属性的描述符。
    

#### 返回值

-   传入函数的对象，其指定的属性已被添加或修改。
    

相比于直接给对象的属性赋值，`Object.defineProperty` 方法提供了更细粒度的属性控制和定制能力

对象中存在的属性描述符有两种主要类型：数据描述符和访问器描述符。**数据描述符**是一个具有可写或不可写值的属性。**访问器描述符**是由 `getter/setter` 函数对描述的属性。描述符只能是这两种类型之一，不能同时为两者(常规情况)。

#### 1) 数据描述符

-   value   数据的值
    
-   writable             属性是否可写
    
-   enumerable      属性是否可枚举
    
-   configurable     属性的描述符是否可以配置（更改）
    

举个例子

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{};&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建一个空对象</span><br><br><span data-darkreader-inline-color="">Object</span>.defineProperty(obj,&nbsp;<span data-darkreader-inline-color="">'name'</span>,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">value</span>:&nbsp;<span data-darkreader-inline-color="">'hello'</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;属性的值</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">writable</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;属性是否可写，默认为&nbsp;false</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">enumerable</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;属性是否可枚举，默认为&nbsp;false</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">configurable</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;<span data-darkreader-inline-color="">//&nbsp;属性是否可配置，默认为&nbsp;false</span><br>});<br></code>
```

相比于 `obj.name='hello'`,还可以通过 `descriptor` 变量设置该属性是否可写、可枚举、可配置的描述符

-   `writable` 如果设置为 `false`，则属性的值不可修改
    
-   `enumerable` 如果设置为 `true`，则属性可以被 `for...in` 循环或 `Object.keys()` 获取到
    
-   `configurable` 如果设置为 `false`，则属性的描述符不可更改，也不能被删除
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果设置该属性为不可写

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果设置该属性的描述符为不可更改

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里可以发现一个例外，就是设置为不可配置时，仍然可以将可写属性由 `true` 配置为 `false`，反过来则不行

#### 2) 访问器描述符

-   enumerable      属性是否可枚举
    
-   configurable     属性的描述符是否可以配置（更改）
    
-   get                    用作属性 getter 的函数
    
-   set                    用作属性 setter 的函数
    

举个例子

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">_value</span>:&nbsp;<span data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;定义访问器属性</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>&nbsp;value()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Getting&nbsp;value"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>._value;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>&nbsp;value(newValue)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Setting&nbsp;value&nbsp;to"</span>,&nbsp;newValue);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._value&nbsp;=&nbsp;newValue;<br>&nbsp;&nbsp;}<br>};<br><br><span data-darkreader-inline-color="">console</span>.log(obj.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Getting&nbsp;value,&nbsp;0</span><br>obj.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">5</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Setting&nbsp;value&nbsp;to&nbsp;5</span><br><span data-darkreader-inline-color="">console</span>.log(obj.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Getting&nbsp;value,&nbsp;5</span><br></code>
```

`obj` 对象的 `_value` 属性为数据属性；`value` 属性为访问器属性

!\[\](../../../../../Library/Application Support/typora-user-images/image-20231128184842648.png)

可以通过 `Object.defineProperty` 来定义一个访问器描述符的属性 `value`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">_value</span>:&nbsp;<span data-darkreader-inline-color="">0</span><br>};<br><br><span data-darkreader-inline-color="">Object</span>.defineProperty(obj,&nbsp;<span data-darkreader-inline-color="">"value"</span>,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Getting&nbsp;value"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>._value;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>newValue</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Setting&nbsp;value&nbsp;to"</span>,&nbsp;newValue);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._value&nbsp;=&nbsp;newValue;<br>&nbsp;&nbsp;}<br>});<br><br><span data-darkreader-inline-color="">console</span>.log(obj.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Getting&nbsp;value,&nbsp;0</span><br>obj.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">5</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Setting&nbsp;value&nbsp;to&nbsp;5</span><br><span data-darkreader-inline-color="">console</span>.log(obj.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;Getting&nbsp;value,&nbsp;5</span><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 3) document.cookie

`document.cookie` 是一个特殊的属性，它既不是典型的数据属性也不是典型的访问器属性。它是一个混合类型的属性，可以被视为既包含数据属性的特征，又包含访问器属性的特征。

也就是说我们可以设置 `set` 描述符，进而监控 `cookie` 中值的添加与修改

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"use&nbsp;strict"</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;cookieTemp&nbsp;=&nbsp;<span data-darkreader-inline-color="">""</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.defineProperty(<span data-darkreader-inline-color="">document</span>,&nbsp;<span data-darkreader-inline-color="">"cookie"</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">writable</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;表示能否修改属性的值，即值是可写的还是只读</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">configurable</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;表示能否通过&nbsp;delete&nbsp;删除属性、能否修改属性的特性，或者将属性修改为访问器属性</span><br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>val</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(val.indexOf(<span data-darkreader-inline-color="">"cookie的参数名称"</span>)&nbsp;!==&nbsp;<span data-darkreader-inline-color="">-1</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Hook捕获Cookie设置&nbsp;-&gt;"</span>,&nbsp;val);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cookieTemp&nbsp;=&nbsp;val;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;val;<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cookieTemp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;});<br>})();<br><span data-darkreader-inline-color="">//&nbsp;代码来自&nbsp;https://blog.csdn.net/Python_DJ/article/details/125360704</span><br></code>
```

假设网站通过 `javascript` 添加了一个 `cookie` 名为 `sign` ，那么程序就会进入 `debugger`

### 3\. Proxy

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global\_Objects/Proxy

代理是 `javaScript` 中的一种高级特性，它允许你拦截并自定义对目标对象的操作。通过使用代理，你可以在目标对象的操作前后注入自己的逻辑，或者修改默认的行为。这为你提供了更大的灵活性和控制力。

`proxy` 这个特性看官方介绍很容易看迷糊，其实非常简单，我们定义了一个对象，其中包含一些属性，之后根据需要对这些属性进行增删改查，如果我们不满足于当前的这些功能，对其进行修改，就用 `proxy` 来进行处理

所以其实 `proxy` 就是一种 `hook`

#### 语法

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;p&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(target,&nbsp;handler)<br></code>
```

#### 参数

-   `target`
    
    要使用 `Proxy` 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
    
-   `handler`
    
    一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。
    

在 `handler` 中我们可以对各种方法进行修改，例如我们之前遇到的 `get`、`set`等，这些方法称为捕获器`（trap）`

举个例子大家就能明白了

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;target&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"John"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span><br>};<br><br><span data-darkreader-inline-color="">var</span>&nbsp;handler&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"正在读取属性:&nbsp;"</span>&nbsp;+&nbsp;property);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[property];<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property,&nbsp;value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"正在设置属性:&nbsp;"</span>&nbsp;+&nbsp;property&nbsp;+&nbsp;<span data-darkreader-inline-color="">"，值为:&nbsp;"</span>&nbsp;+&nbsp;value);<br>&nbsp;&nbsp;&nbsp;&nbsp;target[property]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;}<br>};<br><br><span data-darkreader-inline-color="">var</span>&nbsp;proxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(target,&nbsp;handler);<br><br><span data-darkreader-inline-color="">console</span>.log(proxy.name);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;正在读取属性:&nbsp;name&nbsp;\n&nbsp;John</span><br>proxy.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">35</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;正在设置属性:&nbsp;age，值为:&nbsp;35</span><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里基于对象 `target` 创建了代理对象 `proxy` ， `proxy` 中的 `handler` 针对 `get` 和 `set` 方法进行了设置，除了基本的功能以外，还添加了打印输出功能

这里有一点需要注意，创建的 `proxy` 对象并不是将原本的 `target` 对象复制了一遍。对于`proxy` 属性的修改也会同步作用在 `target` 上

接下来我们尝试通过 `proxy` 的方法监控 `Cookie` 的添加,这是一个简单的 `demo`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;创建一个代理对象，用于拦截&nbsp;document.cookie&nbsp;的&nbsp;get&nbsp;和&nbsp;set&nbsp;方法</span><br><span data-darkreader-inline-color="">var</span>&nbsp;cookieProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(<span data-darkreader-inline-color="">document</span>,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'cookie'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'正在读取&nbsp;cookie'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回原始的&nbsp;document.cookie&nbsp;值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target.cookie;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对于其他属性，直接返回原始对象的属性值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;property,&nbsp;receiver);<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property,&nbsp;value,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'cookie'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'正在设置&nbsp;cookie，值为:'</span>,&nbsp;value);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置原始的&nbsp;document.cookie&nbsp;值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target.cookie&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回设置后的值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对于其他属性，直接设置原始对象的属性值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;property,&nbsp;value,&nbsp;receiver);<br>&nbsp;&nbsp;}<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;使用代理对象访问&nbsp;document.cookie</span><br><span data-darkreader-inline-color="">console</span>.log(cookieProxy.cookie);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;正在读取&nbsp;cookie&nbsp;\n&nbsp;&lt;当前&nbsp;cookie&nbsp;值&gt;</span><br>cookieProxy.cookie&nbsp;=&nbsp;<span data-darkreader-inline-color="">'username=John'</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出:&nbsp;正在设置&nbsp;cookie，值为:&nbsp;username=John</span><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们在通过 `cookieProxy.cookie = 'username=John'`添加 `cookie` 时被成功被捕获。但是通过 `document.cookie = 'pass=123'` 添加 `cookie` 时并未被捕获到，毕竟我们不是通过代理访问的嘛

在js逆向的使用场景中，显然后续代码不可能是使用的我们的代理对象，所以我们尝试以下代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;创建一个代理对象，用于拦截&nbsp;document.cookie&nbsp;的&nbsp;get&nbsp;和&nbsp;set&nbsp;方法</span><br><span data-darkreader-inline-color="">document</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(<span data-darkreader-inline-color="">document</span>,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'cookie'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'正在读取&nbsp;cookie'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回原始的&nbsp;document.cookie&nbsp;值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target.cookie;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对于其他属性，直接返回原始对象的属性值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;property,&nbsp;receiver);<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;property,&nbsp;value,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'cookie'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'正在设置&nbsp;cookie，值为:'</span>,&nbsp;value);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置原始的&nbsp;document.cookie&nbsp;值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target.cookie&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回设置后的值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;对于其他属性，直接设置原始对象的属性值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;property,&nbsp;value,&nbsp;receiver);<br>&nbsp;&nbsp;}<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;使用代理对象访问&nbsp;document.cookie</span><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">document</span>.cookie);<br><span data-darkreader-inline-color="">document</span>.cookie&nbsp;=&nbsp;<span data-darkreader-inline-color="">'username=John'</span>;<br></code>
```

既然我们是对 `document` 对象创建的代理，我们直接将代理的名字设置为 `document`，这样就直接覆盖了之前的 `document`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

显然，我们这个想法有点天真了，`document` 对象不允许被直接覆盖，因此 `proxy` 这种方法得选择合适的时机使用

## 四、Hook 案例脚本

> 搞爬虫的这些博主早就已经写好了常用的 hook 脚本，这里将其直接拿过来进行分析

### 1\. Hook Cookie

> https://www.dnslin.com/archives/104.html

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">var</span>&nbsp;code&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;org&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.cookie.__lookupSetter__(<span data-darkreader-inline-color="">'cookie'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.__defineSetter__(<span data-darkreader-inline-color="">"cookie"</span>,<span><span data-darkreader-inline-color="">function</span>(<span>cookie</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(cookie.indexOf(<span data-darkreader-inline-color="">'TSdc75a61a'</span>)&gt;<span data-darkreader-inline-color="">-1</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;org&nbsp;=&nbsp;cookie;<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">document</span>.__defineGetter__(<span data-darkreader-inline-color="">"cookie"</span>,<span><span data-darkreader-inline-color="">function</span>(<span></span>)</span>{<span data-darkreader-inline-color="">return</span>&nbsp;org;});<br>}<br><span data-darkreader-inline-color="">var</span>&nbsp;script&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'script'</span>);<br>script.textContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">'('</span>&nbsp;+&nbsp;code&nbsp;+&nbsp;<span data-darkreader-inline-color="">')()'</span>;<br>(<span data-darkreader-inline-color="">document</span>.head||<span data-darkreader-inline-color="">document</span>.documentElement).appendChild(script);<br>script.parentNode.removeChild(script);<br><br><span data-darkreader-inline-color="">//&nbsp;当cookie中匹配到了 TSdc75a61a，&nbsp;则插入断点。</span><br></code>
```

这是一段赋值替换型的 hook 代码

具体来说，这段代码做了以下几件事情：

1.  定义了一个名为 `code` 的函数，函数内部包含了对 `document.cookie` 的拦截和监控逻辑。
    
2.  使用 `__lookupSetter__` 方法获取原始的 `document.cookie` 的 `setter` 函数，并将它保存在变量 `org` 中。
    
3.  使用 `__defineSetter__` 方法重新定义了 `document.cookie` 的 `setter` 函数。在新定义的 `setter` 函数中，如果设置的 `cookie` 值中包含特定的字符串`（"TSdc75a61a"）`，则会触发一个断点调试器（`debugger`）。
    
4.  同样使用 `__defineGetter__` 方法重新定义了 `document.cookie` 的`getter` 函数，使其返回变量 `org` 的值，即原始的 `document.cookie` 的值。
    
5.  创建了一个 `<script>` 元素，并将其内容设置为调用 `code` 函数的代码字符串，通过在代码字符串外添加括号和调用操作符 `()` 来立即执行该函数。
    
6.  将 `<script>` 元素添加到当前文档的 `<head>` 元素或根元素中。
    
7.  最后，从文档中移除这个 `<script>` 元素。
    

通过以上步骤，这段代码成功地将对 `document.cookie` 的读取和设置操作进行了拦截和监控。如果设置的 `cookie` 值中包含字符串`"TSdc75a61a"`，则会触发一个断点调试器，允许开发者在浏览器的调试工具中进行进一步的调试和处理。

> https://zhuanlan.zhihu.com/p/231651573

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;==UserScript==</span><br><span data-darkreader-inline-color="">//&nbsp;@name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hook&nbsp;Cookie</span><br><span data-darkreader-inline-color="">//&nbsp;@namespace&nbsp;&nbsp;&nbsp;http://tampermonkey.net/</span><br><span data-darkreader-inline-color="">//&nbsp;@version&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.1</span><br><span data-darkreader-inline-color="">//&nbsp;@description&nbsp;try&nbsp;to&nbsp;take&nbsp;over&nbsp;the&nbsp;world!</span><br><span data-darkreader-inline-color="">//&nbsp;@author&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You</span><br><span data-darkreader-inline-color="">//&nbsp;@include&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*</span><br><span data-darkreader-inline-color="">//&nbsp;@grant&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;none</span><br><span data-darkreader-inline-color="">//&nbsp;@run-at&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document-start</span><br><span data-darkreader-inline-color="">//&nbsp;==/UserScript==</span><br><br>(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'use&nbsp;strict'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;cookie_cache&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.cookie;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.defineProperty(<span data-darkreader-inline-color="">document</span>,&nbsp;<span data-darkreader-inline-color="">'cookie'</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cookie_cache;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>val</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'Setting&nbsp;cookie'</span>,&nbsp;val);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;填写cookie名</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(val.indexOf(<span data-darkreader-inline-color="">'cookie名'</span>)&nbsp;!=&nbsp;<span data-darkreader-inline-color="">-1</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;cookie&nbsp;=&nbsp;val.split(<span data-darkreader-inline-color="">";"</span>)[<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;ncookie&nbsp;=&nbsp;cookie.split(<span data-darkreader-inline-color="">"="</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;flag&nbsp;=&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;cache&nbsp;=&nbsp;cookie_cache.split(<span data-darkreader-inline-color="">";&nbsp;"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cache&nbsp;=&nbsp;cache.map(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>a</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(a.split(<span data-darkreader-inline-color="">"="</span>)[<span data-darkreader-inline-color="">0</span>]&nbsp;===&nbsp;ncookie[<span data-darkreader-inline-color="">0</span>])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flag&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cookie;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;a;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cookie_cache&nbsp;=&nbsp;cache.join(<span data-darkreader-inline-color="">";&nbsp;"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!flag)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cookie_cache&nbsp;+=&nbsp;cookie&nbsp;+&nbsp;<span data-darkreader-inline-color="">";&nbsp;"</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cookie_cache;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>})();<br></code>
```

这是一段 `Object.defineProperty` 类型的 hook 代码

具体来说，这段代码做了以下几件事情：

1.  在严格模式下执行代码。
    
2.  创建了一个变量 `cookie_cache`，用于缓存原始的 `document.cookie` 的值。
    
3.  使用 `Object.defineProperty` 方法重新定义了 `document.cookie`属性的 getter 和 setter 方法。
    

-   在 getter 方法中，返回缓存的 `cookie_cache` 值，即原始的 `document.cookie` 的值。
    
-   在 setter 方法中，首先打印设置的 cookie 值，然后根据特定的条件（例如包含特定的 cookie 名）触发一个断点调试器（`debugger`）。
    
-   然后，将设置的 cookie 值进行处理，提取第一个 cookie，并将其与缓存中的 cookie 进行比较。
    
-   如果已存在相同的 cookie 名，则更新缓存中的对应 cookie 值，否则将新的 cookie 添加到缓存中。
    
-   最后，返回更新后的 `cookie_cache` 值。
    

5.  将这段代码包裹在立即执行函数表达式中，使其在加载时立即执行。
    

通过以上步骤，这段代码成功地将对 `document.cookie` 的读取和设置操作进行了拦截和监控。在设置 cookie 值时，会进行特定条件的判断和处理，并更新缓存中的 cookie 值。你可以根据实际需求修改代码中的条件和处理逻辑。

### 2\. Hook Header

> https://www.dnslin.com/archives/104.html

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;定义拦截函数</span><br><span data-darkreader-inline-color="">var</span>&nbsp;code&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;保存原始的&nbsp;setRequestHeader&nbsp;方法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;org&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.XMLHttpRequest.prototype.setRequestHeader;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;重定义&nbsp;setRequestHeader&nbsp;方法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">window</span>.XMLHttpRequest.prototype.setRequestHeader&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>key,&nbsp;value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果请求头中包含&nbsp;'Authorization'&nbsp;字段，则触发断点调试器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(key&nbsp;===&nbsp;<span data-darkreader-inline-color="">'Authorization'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用原始的&nbsp;setRequestHeader&nbsp;方法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;org.apply(<span data-darkreader-inline-color="">this</span>,&nbsp;<span data-darkreader-inline-color="">arguments</span>);<br>&nbsp;&nbsp;};<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;创建一个&nbsp;&lt;script&gt;&nbsp;元素</span><br><span data-darkreader-inline-color="">var</span>&nbsp;script&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'script'</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;将拦截函数代码作为文本内容赋给&nbsp;&lt;script&gt;&nbsp;元素</span><br>script.textContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">'('</span>&nbsp;+&nbsp;code&nbsp;+&nbsp;<span data-darkreader-inline-color="">')()'</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;将&nbsp;&lt;script&gt;&nbsp;元素添加到文档的头部或根元素中</span><br>(<span data-darkreader-inline-color="">document</span>.head&nbsp;||&nbsp;<span data-darkreader-inline-color="">document</span>.documentElement).appendChild(script);<br><br><span data-darkreader-inline-color="">//&nbsp;从文档中移除&nbsp;&lt;script&gt;&nbsp;元素</span><br>script.parentNode.removeChild(script);<br></code>
```

以上代码的作用是拦截并监控浏览器中的 `XMLHttpRequest` 对象的 `setRequestHeader` 方法，因为在浏览器环境下，使用 `XMLHttpRequest` 对象的 `setRequestHeader` 方法是一种常见的设置 HTTP 请求头的方式，我们通过 `hook` 该函数找到特定的 `header` 添加到请求对象的位置，之后向前跟栈分析就好

具体解释如下：

1.  创建一个名为 `code` 的函数，用于定义拦截逻辑。
    
2.  在函数中，保存原始的 `setRequestHeader` 方法到变量 `org` 中。
    
3.  重新定义 `XMLHttpRequest` 对象的 `setRequestHeader` 方法。在新定义的方法中，如果请求头中包含 `'Authorization'` 字段，则会触发一个断点调试器。
    
4.  创建一个 `<script>` 元素。
    
5.  将拦截函数代码作为文本内容赋值给 `<script>` 元素。
    
6.  将 `<script>` 元素添加到文档的头部或根元素中。
    
7.  从文档中移除 `<script>` 元素。
    

通过以上步骤，这段代码成功地拦截并监控了 `XMLHttpRequest` 对象的 `setRequestHeader` 方法。如果请求头中包含 `'Authorization'`字段，则会触发一个断点调试器，允许开发者在浏览器的调试工具中进行进一步的调试和处理。

### 3\. Hook URL

> https://www.dnslin.com/archives/104.html

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;定义拦截函数</span><br><span data-darkreader-inline-color="">var</span>&nbsp;code&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;保存原始的&nbsp;open&nbsp;方法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">var</span>&nbsp;open&nbsp;=&nbsp;<span data-darkreader-inline-color="">window</span>.XMLHttpRequest.prototype.open;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;重定义&nbsp;open&nbsp;方法</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">window</span>.XMLHttpRequest.prototype.open&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>method,&nbsp;url,&nbsp;async</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果&nbsp;URL&nbsp;中包含特定字符串（"MmEwMD"），则触发断点调试器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(url.indexOf(<span data-darkreader-inline-color="">"MmEwMD"</span>)&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">-1</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">debugger</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用原始的&nbsp;open&nbsp;方法</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;open.apply(<span data-darkreader-inline-color="">this</span>,&nbsp;<span data-darkreader-inline-color="">arguments</span>);<br>&nbsp;&nbsp;};<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;创建一个&nbsp;&lt;script&gt;&nbsp;元素</span><br><span data-darkreader-inline-color="">var</span>&nbsp;script&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'script'</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;将拦截函数代码作为文本内容赋给&nbsp;&lt;script&gt;&nbsp;元素</span><br>script.textContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">'('</span>&nbsp;+&nbsp;code&nbsp;+&nbsp;<span data-darkreader-inline-color="">')()'</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;将&nbsp;&lt;script&gt;&nbsp;元素添加到文档的头部或根元素中</span><br>(<span data-darkreader-inline-color="">document</span>.head&nbsp;||&nbsp;<span data-darkreader-inline-color="">document</span>.documentElement).appendChild(script);<br><br><span data-darkreader-inline-color="">//&nbsp;从文档中移除&nbsp;&lt;script&gt;&nbsp;元素</span><br>script.parentNode.removeChild(script);<br></code>
```

以上代码的作用是拦截并监控浏览器中的 `XMLHttpRequest` 对象的 `open` 方法，可以在发送 `AJAX` 请求之前检查和干预请求的 `URL` 地址。

具体解释如下：

1.  创建一个名为 `code` 的函数，用于定义拦截逻辑。
    
2.  在函数中，保存原始的 `open` 方法到变量 `open` 中。
    
3.  重新定义 `XMLHttpRequest` 对象的 `open` 方法。在新定义的方法中，如果 `URL` 中包含特定字符串`（"MmEwMD"）`，则会触发一个断点调试器。
    
4.  创建一个 `<script>` 元素。
    
5.  将拦截函数代码作为文本内容赋值给 `<script>` 元素。
    
6.  将 `<script>` 元素添加到文档的头部或根元素中。
    
7.  从文档中移除 `<script>` 元素。
    

通过以上步骤，这段代码成功地拦截并监控了 `XMLHttpRequest` 对象的 `open` 方法。如果请求的 `URL` 中包含特定字符串`（"MmEwMD"）`，则会触发一个断点调试器，允许开发者在浏览器的调试工具中进行进一步的调试和处理。

### 4\. ...

以上三种主要是为了在http请求包中找到加密的值添加位置，之后再跟栈分析定位到加密位置，进而确定原始数据以及加密方法，但 `hook` 在 `js` 逆向过程中可不只是这点作用，前端攻防现在打得很激烈，各种检测，加密都可以通过 `hook` 来进行辅助，甚至可以用 `hook` 来绕过反 `hook`

可以看看上面代码的来源文章，里面介绍了近 30 种 `hook` 脚本

> https://www.dnslin.com/archives/104.html

## 五、Hook 实施方法

一般可以通过浏览器、代理软件、浏览器插件三种方法实施 `hook`

### 1\. 浏览器

源代码 -> 片段 -> 新片段

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以 `Hook Cookie` 为例

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击即可运行

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里我们监控了 `Cookie H_PS_645EC`的添加，发现添加后就进入 `debugger`，搜索 `123` 就生成了该 `Cookie`

如果页面刷新，脚本功能就会失效

### 2\. 代理软件

我们最常用的 `burpsuite` ，直接抓页面返回包，之后将 `hook` 代码添加进去

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

搜索 `123`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

成功在添加该 `Cookie` 时进入断点

### 3\. 浏览器插件

浏览器插件可能最知名的就是油猴了

> https://www.tampermonkey.net/

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以直接在官网上搜索并安装脚本，官网也可以找到详细的脚本编写规范，当然文章之前部分提到的脚本可以直接使用

这里推荐一个监控 `Cookie` 变化的脚本

> https://github.com/CC11001100/js-cookie-monitor-debugger-hook

这个脚本有 500 多行，就不在这里展示了，我们还是以百度为例

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

刷新页面，打开开发者工具，搜索 `123`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

成功在添加该 `Cookie` 时进入断点

## 六、Hook 的时机

除非你想在特定时机进行 `hook` ,不然一般就是在网页最开始进行

-   油猴脚本默认情况下存在 `@run-at` 配置项，可以指定 `hook` 的时机![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
-   代理软件可以考虑在网页代码中可以执行 `js` 代码的最前端插入 `hook` 脚本
    
-   浏览器的话，可以根据网页 `html` 以及 `js` 加载顺序，在其中搭上断点，刷新网页，在断点处添加 `hook` 脚本
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    在网络的响应处是无法直接打断点的，我们需要右键在源面板中打开
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    这里就可以打断点了，刷新网页
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
    此时就可以注入我们的 `hook` 脚本了
    

## 七、往期文章