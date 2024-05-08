> vue2-element-dict、vue3-element-dict、vue2-vant-dict、vue3-vant3-dict字典包，vue2-water-marker、vue3-water-marker防篡改的水印插件包，vue-axios-optimize请求优化包，大家有兴趣的可在npm官网搜索了解下，有疑问可咨询小布。

## 前言

大家好，我是沈小布，**勤能补拙，实践是检验真理的唯一标准**是我的座右铭，****帮助同行人员少走弯路，提高开发效率，提升代码质量****是我的初心。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KibUSudgqRBjEzmmDk4eaY8B5UGKCvfDblojTW8U6Il5ib8Ozbia6H9o3ZbeLYyibniadE5GexT51wjhp0xCyaakZKg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

喜欢小编的可添加小编微信获取相关前端资料并进前端交流群  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KibUSudgqRBhTdLIHxCzCBEeicP9C8Sx3MXzFIAhNVDA8We6bYmcS74tAEmzgDLrcMgHTWBugLP8bQBNLFiajVD7w/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 主题

今天的主题是揭秘van-form底下的部分组件是如何继承部分属性的。其实就是vue的provide和inject。

## provide/inject

这对选项是需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。  
简单来说，一个组件将自己的属性通过provide暴露出去，其下面的子孙后代组件使用inject即可直接收到暴露的属性。

## vant2中使用provide/inject

vant2中van-form组件就使用provide暴露自己的this出去，且字段为vanForm。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vant2中van-form底下的组件如van-field组件就是使用inject获取van-form的部分属性。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## vant3中使用provide/inject

vant3中将provide的方法封装成一个useChildren的方法，并且是在@vant/use的依赖包里。inject同样也是在该包里，暴露的是useParent方法  

```
<span><span>var</span> import_vue4 = <span>require</span>(<span>"vue"</span>);</span>
```

```
<span><span>var</span> import_vue3 = <span>require</span>(<span>"vue"</span>);</span>
```

## 继承form的属性且自身优先级最高

**vant2中**  
getProp获取属性值，自身组件有该属性值时返回自身组件的属性值，没有时获取form的属性值。vanForm为inject后获取到的祖先组件provide的值。

```
<span>&nbsp;&nbsp;&nbsp;getProp:&nbsp;function&nbsp;getProp(key)&nbsp;{</span>
```

```
<span><span><span>function</span> <span>isDef</span>(<span>val</span>) </span>{</span>
```

**vant3中**  
getProp获取属性值，自身组件有该属性值时返回自身组件的属性值，没有时获取form的属性值。vanForm为inject后获取到的祖先组件provide的值。

看上述useChildren的方法可知道，需要传入一个key，这个key相当于上述vant2版本中vanForm字段名，此处van3组件库中传入的key是一个**Symbol变量名。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

getprop方法及isDef方法同vant2

## vant3-xiaobu出现的原因

由于vant3继承form组件属性使用了Symbol变量名，因为Symbol(1) === symbol(1) 这个是false的。且vant3无暴露FORM\_KEY出来供大家使用，因此如果不搞一个能暴露出FORM\_KEY的vant3，vue3-vant3-dict插件包就无法实现继承van-form属性值的功能。Van-xiaobu就是单纯多暴露一个FORM\_KEY，供vue3-vant3-dict使用。

## 总结

vue3-vant3-dict马上出炉，快到碗里来。