之前由于项目使用的是 React 框架所以封装了 [前端防篡改水印（Ts 版本）](http://mp.weixin.qq.com/s?__biz=MzkyMjIwMTU2NA==&mid=2247483905&idx=1&sn=b5eff02eb38170ece37db5c4439c2a19&chksm=c1f6beb2f68137a4f43c26df8ba0ad9deecba17809e893da58dadedef95c02cb48780a69d40b&scene=21#wechat_redirect)，现在古董要重见天日了，就将上次的 Ts Class搞成 Js function的方式在项目中使用。  

**注意：有 4 个Class 转 function 的知识点。**

**水印：防止删除水印，防止修改水印元素的属性。  
**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/dLtTnNkuaUytljEtT1BfJsUJLdYicoaCZC3lDzVCClUZFxI0mcZ0PLeicHHQxYoSUJ3whOSnhY0ARV8lAKWEysoA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

```
<span><span>&lt;!DOCTYPE html&gt;</span></span>
```

**防篡改水印封装的 function**  

```
<span><span>//知识点1、 严格模式use strict使用实例</span></span>
```