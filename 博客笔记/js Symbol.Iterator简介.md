在介绍Symbol.Iterator前，先简单介绍一下Symbol吧：

Symbol是ES6中引入的一种新的原始数据类型，表示独一无二的值：

```
<span><span>const</span> sy = <span>Symbol</span>(<span>'kk'</span>)</span>
```

Symbol可以用来作为对象属性名，可以保证属性不重名：

```
<span><span>const</span> sy = <span>Symbol</span>(<span>'kk'</span>)</span>
```

Symbol作为对象中属性名不能被 for...in 、 for...of、Object.keys() 和 Object.getOwnPropertyNames() 取到，但可以通过下面方法：Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 取到：

```
<span><span>const</span>&nbsp;syObject&nbsp;=&nbsp;{}</span>
```

简单介绍完Symbol后，再来看一下Symbol.Iterator：Symbol.Iterator可以用来定义迭代器，即可以让不可迭代对象成为可迭代对象，让对象可以被 for...of 循环访问：

```
<span>const arr = [2,5,7]</span>
```

因为数组本身原型中是有默认迭代器的：arr.\_\_proto\_\_\[Symbol.iterator\]，所以可以使用 for...of 循环访问。

除了 for...of 外，还可以使用next()方法逐个打印值：

```
<span>const arr = [2,5,7]</span>
```

如果是下面这种普通对象呢：

```
<span><span>const</span> obj = { <span>a</span>: <span>1</span>, <span>b</span>:<span>7</span>, <span>c</span>: <span>9</span> }</span>
```

如果想要obj也可以被 for...of 访问，为obj自定义一个迭代器即可：

```
<span><span>const</span> obj = { <span>a</span>: <span>1</span>, <span>b</span>:<span>7</span>, <span>c</span>: <span>9</span> }</span>
```

除了 for...of 外，还可以使用next()方法逐个打印值：

```
<span>const iter = obj[Symbol.iterator]()</span>
```

再看下面几个例子：

例子a：

```
<span>class Food {</span>
```

例子b：  

```
<span>class Foo {</span>
```

例子c：  

```
<span><span><span>function</span> <span>rangeFunc</span>(<span>start, end</span>) </span>{</span>
```

本次内容介绍完毕~  

[js中一种将多层树状结构数组扁平化的方法](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484804&idx=1&sn=6a31f32ef05bd6bd1504011930e88c95&chksm=cff7e43bf8806d2d7920f9fcb1c8640f26af480274e2ec353acb929804a0cd80f5611c7170a5&scene=21#wechat_redirect)  

[java中一种设置jar运行参数的方法](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484796&idx=1&sn=3ff2260c81daf998cf937cb724005085&chksm=cff7e4c3f8806dd5a4b360131d10a6243c35ca69ecb5e8649a3d8d1f03744dd9ac80089dcab0&scene=21#wechat_redirect)  

[捞一下-css几种绘图方法](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484762&idx=1&sn=61f0fbc4d39e7fa734c876e891b4e062&chksm=cff7e4e5f8806df3e796f2817a97068be4ca6cd1ae76f603c78ece3c127feb113ce5468986d8&scene=21#wechat_redirect)  

[Java学习-入门介绍](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484091&idx=1&sn=7528c048bbc72156fe8a1e106c6425c2&chksm=cff7e304f8806a1239188950bbfddde68f2694cd6af8c1264d419ce3b698f8d11370729c60b5&scene=21#wechat_redirect)  

[js canvas生成随机个小圆球并做随机运动](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484782&idx=1&sn=81d372c5b438b649a3341b3eeda57452&chksm=cff7e4d1f8806dc7fe254745381d44fe09828c5fefc12067b7215990656c1c6300c1ba0b2dc1&scene=21#wechat_redirect)  

[js Object.freeze()方法](http://mp.weixin.qq.com/s?__biz=Mzg4ODczMTg1Ng==&mid=2247484770&idx=1&sn=6079fe7f78d506e9771b8609c7d4af06&chksm=cff7e4ddf8806dcb8feaf9a5c288aae4e7f966d1021d35e62cff003b80c0cc0e8c14f3532471&scene=21#wechat_redirect)