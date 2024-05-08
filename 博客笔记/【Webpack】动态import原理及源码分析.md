> 在开始之前，先给我的mini-react打个广告。对react源码感兴趣的朋友，走过路过的朋友点个star

## 前言

在平时的开发中，我们经常使用 import()实现代码分割和懒加载。在低版本的浏览器中并不支持动态 import()，那 webpack 是如何实现 import() polyfill 的？

点击下方“前端图形”，选择“设为星标”  

第一时间关注技术干货！

## 原理分析

我们先来看看下面的 demo

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1"><span data-darkreader-inline-color="">function</span> <span data-darkreader-inline-color="">component</span>(<span></span>) {</span><br><span data-line-num="2">  <span data-darkreader-inline-color="">const</span> btn = <span data-darkreader-inline-color="">document</span>.<span data-darkreader-inline-color="">createElement</span>(<span data-darkreader-inline-color="">"button"</span>);</span><br><span data-line-num="3">  btn.<span>onclick</span> = <span>() =&gt;</span> {</span><br><span data-line-num="4">    <span data-darkreader-inline-color="">import</span>(<span data-darkreader-inline-color="">"./a.js"</span>).<span data-darkreader-inline-color="">then</span>(<span>(<span>res</span>) =&gt;</span> {</span><br><span data-line-num="5">      <span data-darkreader-inline-color="">console</span>.<span data-darkreader-inline-color="">log</span>(<span data-darkreader-inline-color="">"动态加载a.js.."</span>, res);</span><br><span data-line-num="6">    });</span><br><span data-line-num="7">  };</span><br><span data-line-num="8">  btn.<span>innerHTML</span> = <span data-darkreader-inline-color="">"Button"</span>;</span><br><span data-line-num="9"></span><br><span data-line-num="10">  <span data-darkreader-inline-color="">return</span> btn;</span><br><span data-line-num="11">}</span><br><span data-line-num="12"></span><br><span data-line-num="13"><span data-darkreader-inline-color="">document</span>.<span>body</span>.<span data-darkreader-inline-color="">appendChild</span>(<span data-darkreader-inline-color="">component</span>());</span><br></code></code>
```

点击按钮，动态加载 `a.js`脚本，查看浏览器网络请求可以发现，`a.js`请求返回的内容如下：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/pqcWLvSo2kjnrIIFNPrIn4lPwvBzPvEJpdIlSDaRZHE4BQ0J9DQ4BlpZDTb79D1Tmfr3UEcEictPToW9XLQeGhw/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

简单看，实际上返回的就是下面这个东西：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1">(self[<span data-darkreader-inline-color="">"webpackChunkwebpack_demo"</span>] =</span><br><span data-line-num="2">  self[<span data-darkreader-inline-color="">"webpackChunkwebpack_demo"</span>] || []).<span data-darkreader-inline-color="">push</span>([</span><br><span data-line-num="3">  [<span data-darkreader-inline-color="">"src_a_js"</span>],</span><br><span data-line-num="4">  {</span><br><span data-line-num="5">    <span data-darkreader-inline-color="">"./src/a.js"</span>: <span>() =&gt;</span> {},</span><br><span data-line-num="6">  },</span><br><span data-line-num="7">]);</span><br></code></code>
```

从上面可以看出 3 点信息：

-   1.webpackChunkwebpack\_demo 是挂到全局 window 对象上的属性
    
-   2.webpackChunkwebpack\_demo 是个数组
    
-   3.webpackChunkwebpack\_demo 有个 push 方法，用于添加动态的模块。当`a.js`脚本请求成功后，这个方法会自动执行。
    

再来看看 main.js 返回的内容

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

仔细观察，动态 import 经过 webpack 编译后，变成了下面的一坨东西：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1">__webpack_require__.<span data-darkreader-inline-color="">e</span>(<span data-darkreader-inline-color="">"src_a_js"</span>)</span><br><span data-line-num="2">  .<span data-darkreader-inline-color="">then</span>(__webpack_require__.<span data-darkreader-inline-color="">bind</span>(__webpack_require__, <span data-darkreader-inline-color="">"./src/a.js"</span>))</span><br><span data-line-num="3">  .<span data-darkreader-inline-color="">then</span>(<span>(<span>res</span>) =&gt;</span> {</span><br><span data-line-num="4">    <span data-darkreader-inline-color="">console</span>.<span data-darkreader-inline-color="">log</span>(<span data-darkreader-inline-color="">"动态加载a.js.."</span>, res);</span><br><span data-line-num="5">  });</span><br></code></code>
```

上面代码中，`__webpack_require__` 用于执行模块，比如上面我们通过`webpackChunkwebpack_demo.push`添加的模块，里面的`./src/a.js`函数就是在`__webpack_require__`里面执行的。

`__webpack_require__.e`函数就是用来动态加载远程脚本。因此，从上面的代码中我们可以看出：

-   首先 webpack 将动态 import 编译成 `__webpack_require__.e` 函数
    
-   `__webpack_require__.e`函数加载远程的脚本，加载完成后调用 `__webpack_require__` 函数
    
-   `__webpack_require__`函数负责调用远程脚本返回来的模块，获取脚本里面导出的对象并返回
    

## 源码分析及实现

### 如何动态加载远程模块

在开始之前，我们先来看下如何使用 script 标签加载远程模块

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1"><span data-darkreader-inline-color="">var</span> inProgress = {};</span><br><span data-line-num="2"><span data-darkreader-inline-color="">// url: "http://localhost:8080/src_a_js.main.js"</span></span><br><span data-line-num="3"><span data-darkreader-inline-color="">// done: 加载完成的回调</span></span><br><span data-line-num="4"><span data-darkreader-inline-color="">const</span> <span data-darkreader-inline-color="">loadScript</span> = (<span>url, done</span>) =&gt; {</span><br><span data-line-num="5">  <span data-darkreader-inline-color="">if</span> (inProgress[url]) {</span><br><span data-line-num="6">    inProgress[url].<span data-darkreader-inline-color="">push</span>(done);</span><br><span data-line-num="7">    <span data-darkreader-inline-color="">return</span>;</span><br><span data-line-num="8">  }</span><br><span data-line-num="9">  <span data-darkreader-inline-color="">const</span> script = <span data-darkreader-inline-color="">document</span>.<span data-darkreader-inline-color="">createElement</span>(<span data-darkreader-inline-color="">"script"</span>);</span><br><span data-line-num="10"></span><br><span data-line-num="11">  script.<span>charset</span> = <span data-darkreader-inline-color="">"utf-8"</span>;</span><br><span data-line-num="12">  script.<span>src</span> = url;</span><br><span data-line-num="13"></span><br><span data-line-num="14">  inProgress[url] = [done];</span><br><span data-line-num="15">  <span data-darkreader-inline-color="">var</span> <span data-darkreader-inline-color="">onScriptComplete</span> = (<span>prev, event</span>) =&gt; {</span><br><span data-line-num="16">    <span data-darkreader-inline-color="">var</span> doneFns = inProgress[url];</span><br><span data-line-num="17">    <span data-darkreader-inline-color="">delete</span> inProgress[url];</span><br><span data-line-num="18">    script.<span>parentNode</span> &amp;&amp; script.<span>parentNode</span>.<span data-darkreader-inline-color="">removeChild</span>(script);</span><br><span data-line-num="19">    doneFns &amp;&amp; doneFns.<span data-darkreader-inline-color="">forEach</span>(<span>(<span>fn</span>) =&gt;</span> <span data-darkreader-inline-color="">fn</span>(event));</span><br><span data-line-num="20">    <span data-darkreader-inline-color="">if</span> (prev) <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">prev</span>(event);</span><br><span data-line-num="21">  };</span><br><span data-line-num="22"></span><br><span data-line-num="23">  script.<span>onload</span> = onScriptComplete.<span data-darkreader-inline-color="">bind</span>(<span data-darkreader-inline-color="">null</span>, script.<span>onload</span>);</span><br><span data-line-num="24">  <span data-darkreader-inline-color="">document</span>.<span>head</span>.<span data-darkreader-inline-color="">appendChild</span>(script);</span><br><span data-line-num="25">};</span><br></code></code>
```

`loadScript(url, done)` 函数比较简单，就是通过创建 script 标签加载远程脚本，加载完成后执行 done 回调。`inProgress`用于避免多次创建 script 标签。比如我们多次调用`loadScript('http://localhost:8080/src_a_js.main.js', done)`时，应该只创建一次 script 标签，不需要每次都创建。这也是为什么我们调用多次 `import('a.js')`，浏览器 network 请求只看到家在一次脚本的原因

实际上，这就是 webpack 用于加载远程模块的极简版本。

### \_\_webpack\_require\_\_.e 函数的实现

首先我们使用`installedChunks`对象保存动态加载的模块。key 是 chunkId

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1"><span data-darkreader-inline-color="">// 存储已经加载和正在加载的chunks，此对象存储的是动态import的chunk，对象的key是chunkId，值为</span></span><br><span data-line-num="2"><span data-darkreader-inline-color="">// 以下几种：</span></span><br><span data-line-num="3"><span data-darkreader-inline-color="">// undefined: chunk not loaded</span></span><br><span data-line-num="4"><span data-darkreader-inline-color="">// null: chunk preloaded/prefetched</span></span><br><span data-line-num="5"><span data-darkreader-inline-color="">// [resolve, reject, Promise]: chunk loading</span></span><br><span data-line-num="6"><span data-darkreader-inline-color="">// 0: chunk loaded</span></span><br><span data-line-num="7"><span data-darkreader-inline-color="">var</span> installedChunks = {</span><br><span data-line-num="8">  <span data-darkreader-inline-color="">main</span>: <span data-darkreader-inline-color="">0</span>,</span><br><span data-line-num="9">};</span><br></code></code>
```

由于 `import()` 返回的是一个 promise，然后`import()`经过 webpack 编译后就是一个`__webpack_require__.e`函数，因此可以得出`__webpack_require__.e`返回的也是一个 promise，如下所示：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1"><span data-darkreader-inline-color="">const</span> scriptUrl = <span data-darkreader-inline-color="">document</span>.<span>currentScript</span>.<span>src</span></span><br><span data-line-num="2">  .<span data-darkreader-inline-color="">replace</span>(<span data-darkreader-inline-color="">/#.*$/</span>, <span data-darkreader-inline-color="">""</span>)</span><br><span data-line-num="3">  .<span data-darkreader-inline-color="">replace</span>(<span data-darkreader-inline-color="">/\?.*$/</span>, <span data-darkreader-inline-color="">""</span>)</span><br><span data-line-num="4">  .<span data-darkreader-inline-color="">replace</span>(<span data-darkreader-inline-color="">/\/[^\/]+$/</span>, <span data-darkreader-inline-color="">"/"</span>);</span><br><span data-line-num="5"></span><br><span data-line-num="6">__webpack_require__.<span>e</span> = <span>(<span>chunkId</span>) =&gt;</span> {</span><br><span data-line-num="7">  <span data-darkreader-inline-color="">return</span> <span data-darkreader-inline-color="">Promise</span>.<span data-darkreader-inline-color="">resolve</span>(<span data-darkreader-inline-color="">ensureChunk</span>(chunkId, promises));</span><br><span data-line-num="8">};</span><br><span data-line-num="9"></span><br><span data-line-num="10"><span data-darkreader-inline-color="">const</span> <span data-darkreader-inline-color="">ensureChunk</span> = (<span>chunkId</span>) =&gt; {</span><br><span data-line-num="11">  <span data-darkreader-inline-color="">var</span> installedChunkData = installedChunks[chunkId];</span><br><span data-line-num="12">  <span data-darkreader-inline-color="">if</span> (installedChunkData === <span data-darkreader-inline-color="">0</span>) <span data-darkreader-inline-color="">return</span>;</span><br><span data-line-num="13">  <span data-darkreader-inline-color="">let</span> promise;</span><br><span data-line-num="14">  <span data-darkreader-inline-color="">// 1.如果多次调用了__webpack_require__.e函数，即多次调用import('a.js')加载相同的模块，只要第一次的加载还没完成，就直接使用第一次的Promise</span></span><br><span data-line-num="15">  <span data-darkreader-inline-color="">if</span> (installedChunkData) {</span><br><span data-line-num="16">    promise = installedChunkData[<span data-darkreader-inline-color="">2</span>];</span><br><span data-line-num="17">  } <span data-darkreader-inline-color="">else</span> {</span><br><span data-line-num="18">    promise = <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Promise</span>(<span>(<span>resolve, reject</span>) =&gt;</span> {</span><br><span data-line-num="19">      <span data-darkreader-inline-color="">// 2.注意，此时的resolve，reject还没执行</span></span><br><span data-line-num="20">      installedChunkData = installedChunks[chunkId] = [resolve, reject];</span><br><span data-line-num="21">    });</span><br><span data-line-num="22">    installedChunkData[<span data-darkreader-inline-color="">2</span>] = promise; <span data-darkreader-inline-color="">//3. 此时的installedChunkData 为[resolve, reject, promise]</span></span><br><span data-line-num="23"></span><br><span data-line-num="24">    <span data-darkreader-inline-color="">var</span> url = scriptUrl + chunkId;</span><br><span data-line-num="25">    <span data-darkreader-inline-color="">var</span> error = <span data-darkreader-inline-color="">new</span> <span data-darkreader-inline-color="">Error</span>();</span><br><span data-line-num="26">    <span data-darkreader-inline-color="">// 4.在script标签加载完成或者加载失败后执行loadingEnded方法</span></span><br><span data-line-num="27">    <span data-darkreader-inline-color="">var</span> <span data-darkreader-inline-color="">loadingEnded</span> = (<span>event</span>) =&gt; {</span><br><span data-line-num="28">      <span data-darkreader-inline-color="">if</span> (<span data-darkreader-inline-color="">Object</span>.<span><span data-darkreader-inline-color="">prototype</span></span>.<span>hasOwnProperty</span>.<span data-darkreader-inline-color="">call</span>(installedChunks, chunkId)) {</span><br><span data-line-num="29">        installedChunkData = installedChunks[chunkId];</span><br><span data-line-num="30">        <span data-darkreader-inline-color="">if</span> (installedChunkData !== <span data-darkreader-inline-color="">0</span>) installedChunks[chunkId] = <span data-darkreader-inline-color="">undefined</span>;</span><br><span data-line-num="31">        <span data-darkreader-inline-color="">if</span> (installedChunkData) {</span><br><span data-line-num="32">          <span data-darkreader-inline-color="">console</span>.<span data-darkreader-inline-color="">log</span>(<span data-darkreader-inline-color="">"加载失败....."</span>);</span><br><span data-line-num="33">          installedChunkData[<span data-darkreader-inline-color="">1</span>](error); <span data-darkreader-inline-color="">// 5.执行上面的reject，那resolve在哪里执行呢？</span></span><br><span data-line-num="34">        }</span><br><span data-line-num="35">      }</span><br><span data-line-num="36">    };</span><br><span data-line-num="37">    <span data-darkreader-inline-color="">loadScript</span>(url, loadingEnded, <span data-darkreader-inline-color="">"chunk-"</span> + chunkId, chunkId);</span><br><span data-line-num="38">  }</span><br><span data-line-num="39">  <span data-darkreader-inline-color="">return</span> promise;</span><br><span data-line-num="40">};</span><br></code></code>
```

`__webpack_require__.e`的主要逻辑在`ensureChunk`方法中，注意该方法里面的第 1 到第 5 个注释。这个方法创建一个 promise，并调用`loadScript`方法加载动态模块。需要特别主要的是，返回的 promise 的 resolve 方法并不是在 script 标签加载完成后改变。如果脚本加载错误或者超时，会在 loadingEnded 方法里调用 promise 的 reject 方法。实际上，**promise 的 resolve 方法是在脚本请求完成后，在 self\["webpackChunkwebpack\_demo"\].push()执行的时候调用的**

### 如何执行远程模块？

远程模块是通过`self["webpackChunkwebpack_demo"].push()`函数执行的

前面我们提到，`a.js`请求返回的内容是一个`self["webpackChunkwebpack_demo"].push()`函数。当请求完成，会自动执行这个函数。实际上，这就是一个 jsonp 的回调方式。该方法的实现如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1"><span data-darkreader-inline-color="">var</span> <span data-darkreader-inline-color="">webpackJsonpCallback</span> = (<span>data</span>) =&gt; {</span><br><span data-line-num="2">  <span data-darkreader-inline-color="">var</span> [chunkIds, moreModules] = data;</span><br><span data-line-num="3"></span><br><span data-line-num="4">  <span data-darkreader-inline-color="">var</span> moduleId,</span><br><span data-line-num="5">    chunkId,</span><br><span data-line-num="6">    i = <span data-darkreader-inline-color="">0</span>;</span><br><span data-line-num="7">  <span data-darkreader-inline-color="">for</span> (moduleId <span data-darkreader-inline-color="">in</span> moreModules) {</span><br><span data-line-num="8">    <span data-darkreader-inline-color="">// 1.__webpack_require__.m存储的是所有的模块，包括静态模块和动态模块</span></span><br><span data-line-num="9">    __webpack_require__.<span>m</span>[moduleId] = moreModules[moduleId];</span><br><span data-line-num="10">  }</span><br><span data-line-num="11"></span><br><span data-line-num="12">  <span data-darkreader-inline-color="">for</span> (; i &lt; chunkIds.<span>length</span>; i++) {</span><br><span data-line-num="13">    chunkId = chunkIds[i];</span><br><span data-line-num="14">    <span data-darkreader-inline-color="">if</span> (installedChunks[chunkId]) {</span><br><span data-line-num="15">      <span data-darkreader-inline-color="">// 2.调用ensureChunk方法生成的promise的resolve回调</span></span><br><span data-line-num="16">      installedChunks[chunkId][<span data-darkreader-inline-color="">0</span>]();</span><br><span data-line-num="17">    }</span><br><span data-line-num="18">    <span data-darkreader-inline-color="">// 3.将该模块标记为0，表示已经加载过</span></span><br><span data-line-num="19">    installedChunks[chunkId] = <span data-darkreader-inline-color="">0</span>;</span><br><span data-line-num="20">  }</span><br><span data-line-num="21">};</span><br><span data-line-num="22"></span><br><span data-line-num="23">self[<span data-darkreader-inline-color="">"webpackChunkwebpack_demo"</span>] = [];</span><br><span data-line-num="24">self[<span data-darkreader-inline-color="">"webpackChunkwebpack_demo"</span>].<span>push</span> = webpackJsonpCallback.<span data-darkreader-inline-color="">bind</span>(<span data-darkreader-inline-color="">null</span>);</span><br></code></code>
```

所有通过`import()`加载的模块，经过 webpack 编译后，都会被 `self["webpackChunkwebpack_demo"].push()`包裹。

## 总结

在 webpack 构建编译阶段，`import()`会被编译成类似`__webpack_require__.e("src_a_js").then(__webpack_require__.bind(__webpack_require__, "./src/a.js"))`的调用方式

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><p><span>js</span></p><p>复制代码</p><code lang="js" data-darkreader-inline-bgimage=""><span data-line-num="1">__webpack_require__</span><br><span data-line-num="2">  .<span data-darkreader-inline-color="">e</span>(<span data-darkreader-inline-color="">"src_a_js"</span>)</span><br><span data-line-num="3">  .<span data-darkreader-inline-color="">then</span>(__webpack_require__.<span data-darkreader-inline-color="">bind</span>(__webpack_require__, <span data-darkreader-inline-color="">"./src/a.js"</span>))</span><br><span data-line-num="4">  .<span data-darkreader-inline-color="">then</span>(<span>(<span>res</span>) =&gt;</span> {</span><br><span data-line-num="5">    <span data-darkreader-inline-color="">console</span>.<span data-darkreader-inline-color="">log</span>(<span data-darkreader-inline-color="">"动态加载a.js.."</span>, res);</span><br><span data-line-num="6">  });</span><br></code></code>
```

`__webpack_require__.e()`方法会创建一个 script 标签用于请求脚本，方法执行完返回一个 promise，此时的 promise 状态还没改变。

script 标签被添加到 document.head 后，触发浏览器网络请求。请求成功后，动态的脚本会自动执行，此时`self["webpackChunkwebpack_demo"].push()`方法执行，将动态的模块添加到`__webpack_require__.m`属性中。同时调用 promise 的 resolve 方法改变状态，模块加载完成。

脚本执行完成后，最后执行 script 标签的 onload 回调。onload 回调主要是用于处理脚本加载失败或者超时的场景，并调用 promise 的 reject 回调，表示脚本加载失败

点击下方“前端图形”，选择“设为星标”  

第一时间关注技术干货！

作者：runnerdancer  
链接：https://juejin.cn/post/7225989692562047033