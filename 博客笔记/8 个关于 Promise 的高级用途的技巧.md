```
<section><mp-common-profile data-pluginname="mpprofile" data-id="MzkyOTE5NzQ2Nw==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/MDPRplBm9ZVicvbRDVk8icbaWUEAAx9CnmXUiaRLuNLTYSbfJQHeuJJ4uzmS0Ipy2IgK8He2AUSD4sUaGYk7kRFtw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="前端界" data-alias="" data-signature="高质量文章分享、实践干货、技术前沿、学习资料， 你感兴趣的都在前端界" data-from="0" data-is_biz_ban="0" data-origin_num="43" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><section data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">关注公众号&nbsp;</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">前端界</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，回复“</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">加群</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">”</span></section><p data-style="margin-bottom: 0px; outline: 0px; font-size: 16px; text-wrap: wrap; letter-spacing: 0.544px; color: rgb(34, 34, 34); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; background-color: rgb(255, 255, 255); text-align: center; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">加入我们一起学习，天天进步</span></p>
```

我发现很多人只知道如何常规地使用promise。

在js项目中，promise的使用应该是必不可少的，但我发现在同事和面试官中，很多中级以上的前端仍然坚持promiseInst.then()、promiseInst.catch()、Promise等常规用法等等。即使是 async/await 他们也只知道它但不知道为什么要使用它。

但实际上，Promise 有很多巧妙的高级用法，并且一些高级用法在 alova 请求策略库内部也被广泛使用。

现在，我将与大家分享8个高级使用技巧。希望这些技巧能够对你有所帮助，现在，我们就开始吧。

**1\. Promise数组的串行执行**

例如，如果你有一组接口需要串行执行，你可能首先想到使用await。

```
<span><span>const</span> requestAry = [<span><span>()</span> =&gt;</span> api.request1(), <span><span>()</span> =&gt;</span> api.request2(), <span><span>()</span> =&gt;</span> api.request3()];</span>
```

如果使用promise，可以使用then函数串联多个promise，实现串行执行。

```
<span><span>const</span> requestAry = [<span><span>()</span> =&gt;</span> api.request1(), <span><span>()</span> =&gt;</span> api.request2(), <span><span>()</span> =&gt;</span> api.request3()];</span>
```

**2\. 在新的 Promise 范围之外更改状态**

假设你有多个页面，其功能要求在允许使用之前收集用户信息。 点击使用某个功能之前，会弹出一个弹框进行信息收集。 你会如何实施这个？

以下是不同级别前端同学的实现思路：

初级前端：我写一个模态框，然后复制粘贴到其他页面。 效率非常高！

中级前端：这个不好维护。 我们需要单独封装这个组件，并在需要的页面引入！

高级前端：安装任何密封的东西！ ！ ！ 把方法调用写在所有页面都可以调用的地方不是更好吗？

想要了解高级前端是如何实现的，以vue3为例，看一下下面的例子。

```
<span><span>&lt;!-- App.vue --&gt;</span></span>
```

接下来，getInfoByModal就可以通过直接调用模态框来轻松获取用户填写的数据。

```
<span><span>&lt;<span>template</span>&gt;</span></span>
```

这也是很多UI组件库中封装常用组件的一种方式。

**3\. async/await 的替代用法**

很多人只知道它是用来在调用await时接收async函数的返回值的，却不知道async函数它实际上是一个返回promise的函数。 例如，以下两个函数是等效的：

```
<span><span>const</span> fn1 = <span>async</span> () =&gt; <span>1</span>;</span>
```

在大多数情况下，await 会跟随 Promise 对象并等待它完全填充。 因此，下面的 fn1 函数 wait 也是等价的：

```
<span><span>await</span> fn1();</span>
```

然而，await也有一个鲜为人知的秘密。 当它后面跟的值不是promise对象时，它会用promise对象包装该值，所以await后面的代码必须异步执行。 例子：

```
<span><span>Promise</span>.resolve().then(<span><span>()</span> =&gt;</span> {</span>
```

相当于

```
<span><span>Promise</span>.resolve().then(<span><span>()</span> =&gt;</span> {</span>
```

**4\. 承诺实施请求共享**

当一个请求已经发出但尚未得到响应时，再次发出相同的请求，就会造成请求的浪费。 此时，我们可以将第一个请求的响应与第二个请求共享。

```
<span>request(<span>'GET'</span>, <span>'/test-api'</span>).then(<span><span>response1</span> =&gt;</span> {</span>
```

上述两个请求实际上只发送一次，同时收到相同的响应值。

那么，请求共享有哪些使用场景呢？ 我认为有以下三个：

-   当页面渲染多个内部组件同时获取数据时；
    
-   提交按钮未禁用且用户连续多次点击提交按钮；
    
-   预加载数据的情况下，预加载完成之前进入预加载页面；
    

这也是alova的高级功能之一。 要实现请求共享，需要使用promise的缓存功能，即一个promise对象可以通过多次await获取数据。 简单的实现思路如下：

```
<span><span>const</span> pendingPromises = {};</span>
```

上述两个请求实际上只发送一次，同时收到相同的响应值。

那么，请求共享有哪些使用场景呢？ 我认为有以下三个：

-   当页面渲染多个内部组件同时获取数据时；
    
-   提交按钮未禁用且用户连续多次点击提交按钮；
    
-   预加载数据的情况下，预加载完成之前进入预加载页面；
    

这也是alova的高级功能之一。 要实现请求共享，需要使用promise的缓存功能，即一个promise对象可以通过多次await获取数据。 简单的实现思路如下：

```
<span><span>const</span> promise = <span>new</span> <span>Promise</span>(<span>(<span>resolve, reject</span>) =&gt;</span> {</span>
```

正确答案是已满状态。 我们只需要记住，一旦待处理的promise从一种状态转移到另一种状态，就无法更改。 因此，例子中是先转为fulfilled状态，然后reject()就不会再转为rejected状态。

**6.彻底明确then/catch/finally返回值**

一句话概括就是，上面三个函数都会返回一个新的promise包装对象。 包装后的值是执行回调函数的返回值。 如果回调函数抛出错误，它将包装拒绝状态承诺。 似乎不太容易理解，我们来看一个例子：

我们可以将它们一一复制到浏览器控制台并运行它们以帮助理解。

```
<span><span>// then function</span></span>
```

**7、then函数的第二次回调和catch回调有什么区别？**

当请求发生错误时，会触发 Promise 的 then 的第二个回调函数和 catch。 乍一看没有区别，但实际上前者无法捕获then当前第一个回调函数中抛出的错误，但catch可以。

```
<span><span>Promise</span>.resolve().then(</span>
```

原理就如上一点所说的。 catch 函数是在 then 函数返回的处于拒绝状态的 Promise 上调用的，因此它的错误自然可以被捕获。

**8.（最终）Promise实现koa2洋葱中间件模型**

koa2框架引入了洋葱模型，可以让你的请求像剥洋葱一样一层层进去，再一层层出来，从而实现请求前后处理的统一。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们来看一个简单的 koa2 洋葱模型：

```
<span><span>const</span> app = <span>new</span> Koa();</span>
```

上面的输出是a-start -> b-start -> b-end -> a-end，这样神奇的输出序列是如何实现的呢？ 有人没天赋，简单的用20行左右的代码就实现了。 如有雷同，纯属巧合。

接下来我们分析一下

注：以下内容对新手不友好，请谨慎阅读。

首先先保存中间件函数，在listen函数中收到请求后调用洋葱模型执行。

```
<span><span><span>function</span> <span>action</span><span>(koaInstance, ctx)</span> </span>{</span>
```

收到请求后，从第一个中间件开始串行执行next之前的前置逻辑。

```
<span><span>//Start to start middleware call</span></span>
```

处理next之后的post逻辑

```
<span><span><span>function</span> <span>action</span>(<span>koaInstance, ctx</span>) </span>{</span>
```

至此，一个简单的洋葱模型就已经实现了。

**总结**

以上就是我今天想与你分享的8个关于Promise的高级用途的全部内容，如果你觉得有用的话，请记得点赞我，关注我，并将这个内容分享给你的小伙伴们，也许能够帮助到他。

最后，感谢你的阅读，祝编程愉快！

加我微信，拉你进前端进阶、面试交流群，互相监督学习进步等！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 推荐链接

-   [TypeScript中 interface 和 type 的区别，你真的懂了吗](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247485013&idx=1&sn=9324e663eb2d6ed02a2f167e12b56692&chksm=c20c7aa1f57bf3b7f7e00ecc07d753a201ea08da5ad083dc5f70adc8553ef731f9e295afe8a2&scene=21#wechat_redirect)？
    
-   [2022年，前端er们都在看哪些网站？](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247485101&idx=1&sn=09322752bb7e63dea5286f9a0c51164a&chksm=c20c7a59f57bf34f2142aef77367ec01e1cd2471637920f48f53552eafcca8b35f93625eaec9&scene=21#wechat_redirect)
    
-   [良心提醒：这些你常用的vscode 扩展，应该卸载啦!](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247487807&idx=1&sn=272daf982b072f39d882d85577d5f398&chksm=c20c6dcbf57be4dd9a53642843a41ba179b8d8789e7ac1c3182cf35bbf2a0642f81f8f2b7eea&scene=21#wechat_redirect)
    
-   [百度一面，手写 EventBus 直接被三连问，来看看最优解](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247488056&idx=1&sn=b09e4e666b19b20d93f5e02a28363ad7&chksm=c20c6eccf57be7dae02650c4a85abebf3b5def85e3c8951ab1b9b33809fe0ef7659632980c20&scene=21#wechat_redirect)
    
-   [线上紧急Bug：80%你可能会遇到的数据精度问题](http://mp.weixin.qq.com/s?__biz=MzkyOTE5NzQ2Nw==&mid=2247487908&idx=1&sn=a85832bb76575a59721c5138ab93916e&chksm=c20c6d50f57be446ad1054c79064c76b87923754dcf2a3e8d186c7dc63cc8d78625c019364ab&scene=21#wechat_redirect)
    

创作不易，加个点赞、在看 支持一下