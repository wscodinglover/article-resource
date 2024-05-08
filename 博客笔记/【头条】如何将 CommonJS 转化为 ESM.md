![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/WOeOmUjdHrsqTOFrn26AgaGnlicu702OibianPlznzmjFHOrIDC1YvEbZJ1WepdDN6HPznBudIU9n9htr1JeBibblA/640?tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

双杰克湖，班夫国家公园，艾伯塔省，加拿大  
(© SnapRapid/Offset)

> ❝
> 
> 本文收录于互联网大厂每日一题: Daily Question<sup data-darkreader-inline-color="">[1]</sup>，内含大厂内推机会、面经大全及若干面试题，每天学习五分钟，一年进入大厂中。可在右下角打开原文查看
> 
> -   大厂面经大全: https://q.shanyue.tech/interview
>     
> -   面试准备路线: https://q.shanyue.tech/roadmap
>     
> 
> ❞

> ❝
> 
> 本篇文章/答案本计划是三四百字，没想到最后越写越多，写了一千字。
> 
> ❞

由于 Bundless 构建工具的兴起，要求所有的模块都是 ESM 模块化格式。

目前社区有一部分模块同时支持 ESM 与 CommonJS，但仍有许多模块仅支持 CommonJS/UMD，因此将 CommonJS 转化为 ESM 是全部模块 ESM 化的过渡阶段。

## ESM 与 CommonJS 的导入导出的不同

在 ESM 中，导入导出有两种方式:

1.  具名导出/导入: `Named Import/Export`
    
2.  默认导出/导入: `Default Import/Export`
    

代码示例如下:

```
<span data-darkreader-inline-color="">//&nbsp;Named&nbsp;export/import</span><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;sum&nbsp;}<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;sum&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'sum'</span><br><br><span data-darkreader-inline-color="">//&nbsp;Default&nbsp;export/import</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;sum<br><span data-darkreader-inline-color="">import</span>&nbsp;sum&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'sum'</span><br>
```

而在 CommonJS 中，导入导出的方法只有一种:

```
<span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;sum<br>
```

而所谓的 `exports` 仅仅是 `module.exports` 的引用而已

```
<span data-darkreader-inline-color="">//&nbsp;实际上的&nbsp;exports</span><br>exports&nbsp;=&nbsp;<span data-darkreader-inline-color="">module</span>.exports<br><br><span data-darkreader-inline-color="">//&nbsp;以下两个是等价的</span><br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">module</span>.exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br>
```

> ❝
> 
> PS: 一道题关于 `exports` 与 `module.exports` 的区别，以下 `console.log` 输出什么
> 
> ```
> <span data-darkreader-inline-color="">//&nbsp;hello.js</span><br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">module</span>.exports.b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span><br><br><span data-darkreader-inline-color="">//&nbsp;index.js</span><br><span data-darkreader-inline-color="">const</span>&nbsp;hello&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'./hello'</span>)<br><span data-darkreader-inline-color="">console</span>.log(hello)<br>
> ```
> 
> ❞

> ❝
> 
> 再来一道题:
> 
> ```
> <span data-darkreader-inline-color="">//&nbsp;hello.js</span><br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">b</span>:&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;}<br><br><span data-darkreader-inline-color="">//&nbsp;index.js</span><br><span data-darkreader-inline-color="">const</span>&nbsp;hello&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'./hello'</span>)<br><span data-darkreader-inline-color="">console</span>.log(hello)<br>
> ```
> 
> ❞

正因为有二者的不同，因此在二者转换的时候有一些兼容问题需要解决。

## exports 的转化

正因为，二者有所不同，当 exports 转化时，既要转化为 `export {}`，又要转化为 `export default {}`

```
<span data-darkreader-inline-color="">//&nbsp;Input:&nbsp;&nbsp;index.cjs</span><br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><br><span data-darkreader-inline-color="">//&nbsp;Output:&nbsp;index.mjs</span><br><span data-darkreader-inline-color="">//&nbsp;此处既要转化为默认导出，又要转化为具名导出！</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;{&nbsp;a&nbsp;}<br>
```

如果仅仅转为 `export const a = 3` 的具名导出，而不转换 `export default { a }`，将会出现什么问题？以下为例:

```
<span data-darkreader-inline-color="">//&nbsp;Input:&nbsp;CJS</span><br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;index.cjs</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;o&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'.'</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;foo.cjs</span><br><span data-darkreader-inline-color="">console</span>.log(o.a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;foo.cjs</span><br><br><span data-darkreader-inline-color="">//&nbsp;Output:&nbsp;ESM</span><br><span data-darkreader-inline-color="">//&nbsp;这是有问题的错误转换示例:</span><br><span data-darkreader-inline-color="">//&nbsp;此处&nbsp;a&nbsp;应该再&nbsp;export&nbsp;default&nbsp;{&nbsp;a&nbsp;}&nbsp;一次</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;index.mjs</span><br><br><span data-darkreader-inline-color="">import</span>&nbsp;o&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'.'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;foo.mjs</span><br><span data-darkreader-inline-color="">console</span>.log(o.a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;foo.mjs&nbsp;这里有问题，这里有问题，这里有问题</span><br>
```

## module.exports 的转化

对于 `module.exports`，我们可以遍历其中的 key (通过 AST)，将 key 转化为 `Named Export`，将 `module.exports` 转化为 `Default Export`

```
<span data-darkreader-inline-color="">//&nbsp;Input:&nbsp;&nbsp;index.cjs</span><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">a</span>:&nbsp;<span data-darkreader-inline-color="">3</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">b</span>:&nbsp;<span data-darkreader-inline-color="">4</span><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;Output:&nbsp;index.mjs</span><br><span data-darkreader-inline-color="">//&nbsp;此处既要转化为默认导出，又要转化为具名导出！</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">a</span>:&nbsp;<span data-darkreader-inline-color="">3</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">b</span>:&nbsp;<span data-darkreader-inline-color="">4</span><br>}<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span><br>
```

如果 `module.exports` 导出的是函数如何处理呢，特别是 `exports` 与 `module.exports` 的程序逻辑混合在一起？

以下是一个正确的转换结果：

```
<span data-darkreader-inline-color="">//&nbsp;Input:&nbsp;index.cjs</span><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{}<br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br>exports.b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span><br><br><span data-darkreader-inline-color="">//&nbsp;Output:&nbsp;index.mjs</span><br><span data-darkreader-inline-color="">const</span>&nbsp;sum&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{}<br>sum.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br>sum.b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;=&nbsp;sum<br>
```

也可以这么处理，将 `module.exports` 与 `exports` 的代码使用函数包裹起来，此时我们无需关心其中的逻辑细节。

```
<span data-darkreader-inline-color="">var</span>&nbsp;esm$<span data-darkreader-inline-color="">1</span>&nbsp;=&nbsp;{<span data-darkreader-inline-color="">exports</span>:&nbsp;{}};<br><br>(<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>module,&nbsp;exports</span>)&nbsp;</span>{<br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{};<br>exports.a&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span>;<br>exports.b&nbsp;=&nbsp;<span data-darkreader-inline-color="">4</span>;<br>}(esm$<span data-darkreader-inline-color="">1</span>,&nbsp;esm$<span data-darkreader-inline-color="">1.</span>exports));<br><br><span data-darkreader-inline-color="">var</span>&nbsp;esm&nbsp;=&nbsp;esm$<span data-darkreader-inline-color="">1.</span>exports;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;esm&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;};<br>
```

## 一些复杂的转化

ESM 与 CommonJS 不仅仅是简单的语法上的不同，它们在思维方式上就完全不同，因此还有一些较为复杂的转换，本篇先不做谈论，感兴趣的可以去我的博客上查找相关文章。

1.  如何处理 `__dirname`
    
2.  如何处理 `require(dynamicString)`
    
3.  如何处理 CommonJS 中的编程逻辑，如下
    

以下代码涉及到编程逻辑，由于 `exports` 是一个动态的 Javascript 对象，而它自然可以使用两次，那应该如何正确编译为 ESM 呢？

```
<span data-darkreader-inline-color="">//&nbsp;input:&nbsp;index.cjs</span><br>exports.sum&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span><br><span data-darkreader-inline-color="">Promise</span>.resolve().then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;exports.sum&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span><br>})<br>
```

以下是一种不会出问题的代码转换结果

```
<span data-darkreader-inline-color="">//&nbsp;output:&nbsp;index.mjs</span><br><span data-darkreader-inline-color="">const</span>&nbsp;_default&nbsp;=&nbsp;{&nbsp;}<br><span data-darkreader-inline-color="">let</span>&nbsp;sum&nbsp;=&nbsp;_default.sum&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span><br><span data-darkreader-inline-color="">Promise</span>.resolve().then(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;sum&nbsp;=&nbsp;_default.sum&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span><br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;_default<br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;sum&nbsp;}<br>
```

## CommonJS To ESM 的构建工具

CommonJS 向 ESM 转化，自然有构建工具的参与，比如

-   @rollup/plugin-commonjs<sup data-darkreader-inline-color="">[2]</sup>
    

甚至把一些 CommonJS 库转化为 ESM，并且置于 CDN 中，使得我们可以直接使用，而无需构建工具参与

-   https://cdn.skypack.dev/
    
-   https://jspm.org/
    

## 更多面试

-   [【头条】http2 中的首部压缩的实现原理是什么](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484050&idx=1&sn=4ed1a1ef94f2d0a130f8f99f5265d1ef&chksm=9f0c3daba87bb4bd21dcd67bdccda6cd1c22ab7ca28e6703a55e535af0ae2f4186b259036f0f&scene=21#wechat_redirect)
    
-   [【蚂蚁】http 状态码中 301，302和307有什么区别](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484158&idx=1&sn=fce575df0d28e3fb3c512dc18c986a48&chksm=9f0c3dc7a87bb4d190c8df28d2fc1497f937e94e7356185464c97db1291c9376b7048dc5d47a&scene=21#wechat_redirect)
    
-   [【字节】如何实现选中复制的功能](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484309&idx=1&sn=56d0cc2e30a43db89c0d4d88f92d0902&chksm=9f0c3caca87bb5bafeff129838b572986a08a252cea448a94e23faa73092e8893ba2765a5577&scene=21#wechat_redirect)
    
-   [【美团】如何获取一个进程的内存并监控](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247483815&idx=1&sn=f4a2a02232695f3f4d8ec1afda3788d8&chksm=9f0c3e9ea87bb788fbd2b0f191c4a61dc3fb1acc81844c9d0a4d8467dcb9702b9ff976300f55&scene=21#wechat_redirect)
    
-   [【蚂蚁】no-cache 与 no-store 的区别是什么](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484191&idx=1&sn=d54c943c7126db95d22cf12986e7239f&chksm=9f0c3c26a87bb5305e7609f224fbb374245080d3b8caee4cf8cd291bd33526febbcd257bbc87&scene=21#wechat_redirect)
    

### Reference

\[1\]

Daily Question: _https://q.shanyue.tech_

\[2\]

@rollup/plugin-commonjs: _https://github.com/rollup/plugins/tree/master/packages/commonjs_