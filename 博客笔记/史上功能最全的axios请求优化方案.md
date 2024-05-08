> vue2-element-dict、vue3-element-dict、vue2-vant-dict字典包，vue2-water-marker、vue3-water-marker防篡改的水印插件包，vue-axios-optimize请求优化包，大家有兴趣的可在npm官网搜索了解下，有疑问可咨询小布。

## 前言

大家好，我是沈小布，**勤能补拙，实践是检验真理的唯一标准**是我的座右铭，****帮助同行人员少走弯路，提高开发效率，提升代码质量****是我的初心。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KibUSudgqRBjEzmmDk4eaY8B5UGKCvfDblojTW8U6Il5ib8Ozbia6H9o3ZbeLYyibniadE5GexT51wjhp0xCyaakZKg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

喜欢小编的可添加小编微信获取相关前端资料并进前端交流群  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KibUSudgqRBjqz52lbnLMOFPLRdIkibjVX0LMZy5ryga1y56feFxhC0iaLvvm1lVTJso0TFGfALwpwvZOgFNDv2cA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 主题

今天的主题是分享一个史上最全的axios请求优化包——[vue-axios-optimize](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484571&idx=1&sn=703e7e8e10223a2bc1a12ca197f55943&chksm=f9c5da20ceb2533627b440a2e47631decc411f2e8e30a4b3c218ad253809ab20d7a1415f5d74&scene=21#wechat_redirect)。为什么说他是史上最全的优化包呢？用了它之后，您可以轻松实现如下功能：  
1. 可精准实现全局请求动画的控制  
2\. 相同的请求重复请求时，可配置取消前面相同的请求或者阻止后面重复的请求，可配置url为唯一标识或者url加入参组成的字符串作为唯一标识  
3\. 可配置接口缓存及缓存数量，如配置了缓存，则当缓存中存在数据则不再调用接口请求  
4. 可配置同时最多可以请求多少个接口，即控制高并发请求数量  
5\. 如项目有可达成无感知刷新token的条件，也可经过配置简单实现无感知刷新Token。  

## 快速使用

1\. 安装  

```
<span><span>npm</span>&nbsp;install&nbsp;vue-axios-optimize -S</span>
```

2. vue2项目切记在vue.config.js文件中做如下配置

```
<span><span>module</span>.<span>exports</span> = {  </span>
```

3. 在src新建api目录，并结构如下，可前往[《vue-axios-optimize最初版查阅》](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484571&idx=1&sn=703e7e8e10223a2bc1a12ca197f55943&chksm=f9c5da20ceb2533627b440a2e47631decc411f2e8e30a4b3c218ad253809ab20d7a1415f5d74&scene=21#wechat_redirect)  
![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

4\. axios-optimize代码大致如下, 如果没有无感知刷新token的需求 仅前面六项配置有用。  

```
<span><span>import</span> axios <span>from</span> <span>"axios"</span></span>
```

5. axios.js示例代码及注意事项如下  

```
<span><span>import</span> axios from <span>"axios"</span></span>
```

6\. common-api.js接口文件代码如下，五种请求示例代码，及配置参数说明  

```
<span><span>import</span> axiosRequest <span>from</span> <span>"@/api/axios-optimize"</span></span>
```

8\. 页面上使用

```
<span>    <span>/** 查询列表 */</span></span>
```

    如果是取消请求的异常，不进行关闭动画处理。  
9\. 配置缓存后，页面进行刷新操作如需清除接口缓存，可进行如下操作

```
<span><span>import</span> axiosRequest <span>from</span> <span>"@/api/axios-optimize"</span></span>
```

10\. 配置缓存后，如需查看缓存中存储的数据，可进行如下操作

```
<span><span>import</span>&nbsp;axiosRequest&nbsp;<span>from</span>&nbsp;<span>"@/api/axios-optimize"</span></span>
```

## 重复请求取消配置效果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 重复请求阻止配置效果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  

## 配置缓存的效果

配置缓存后，缓存中存在数据的地方将不再请求接口。当refreshToken也过期的时候，会清空缓存数据。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配置了cache为true后，该接口请求过的将会存储在缓存中，再次调用时不调用接口请求而是直接从缓存中获取数据，缓存数量可配置 cacheNum。遵循LRU原则，点击[此处](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484892&idx=1&sn=6fe7761274c8d05154b2beca5369fb0a&chksm=f9c5db67ceb252715e747a0611decdc8a093dabf1fa8ffcf7e374ca8c92c28c9091fb7e37bab&scene=21#wechat_redirect)了解什么时LRU  

## 配置高并发请求的效果

配置maxReqNum后，系统同时可请求的接口将受限制，得排队进行接口请求。欲知包是如何实现此功能的可阅读[《js控制高并发任务》](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484863&idx=1&sn=d87f31526aa3f63efab7a1d1d97b3d4e&chksm=f9c5db04ceb252123d141996442ebc070d79eab9749ac08ec59e9afb3b3b0173e076e8257029&scene=21#wechat_redirect)

下列示例配置了最大并发量为2，点击按钮，一次性请求5个接口。效果如下。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上述效果中，同时只能请求最多两个接口，两个接口都返回401，因此系统前往请求刷新token接口，刷新token接口请求成功后继续请求刚刚401的两个接口，然后剩下的三个接口继续排队执行任务，直到执行完毕。

## accessToken过期，无感知请求refreshToken的效果

请求时刚好遇到accessToken过期，系统自动请求刷新Token接口，用户无感知的情况下，系统就完成了续签。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

看了这些效果后，还不赶紧试试，有问题关注公众号私信反馈，也可添加小布微信进行反馈。强烈建议大家使用vue-axios-optimize。

## 广告时间

**喜欢喝茶的看过来，可加好友报上爆米花小布，优惠多多**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 写在最后

希望我的文章能够或多或少帮助到大家，如果有点帮助，可分享给更多人，予人玫瑰![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)，手有余香![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)。最后可以的话三连击![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)是对小编写文最大的动力![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)。

> `公众号`：`爆米花小布` 专注分享 `web` 前端相关`技术文章`、**工具包、软件工具**等，如果喜欢我的分享，给 小布 点一个`赞` 👍 或者 ➕`关注` 都是对我最大的支持。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

[vue项目轻松实现防篡改的水印](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484493&idx=1&sn=24cdae142026c957cbbd052991928d1d&chksm=f9c5daf6ceb253e088504797679732d7ec66e98bc9532d466944a0cf0176ec4debf19b382329&scene=21#wechat_redirect)

[LRU最近最少使用缓存策略](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484892&idx=1&sn=6fe7761274c8d05154b2beca5369fb0a&chksm=f9c5db67ceb252715e747a0611decdc8a093dabf1fa8ffcf7e374ca8c92c28c9091fb7e37bab&scene=21#wechat_redirect)  

[js高并发任务的处理！](http://mp.weixin.qq.com/s?__biz=MzUyMjkxNDc3Mg==&mid=2247484863&idx=1&sn=d87f31526aa3f63efab7a1d1d97b3d4e&chksm=f9c5db04ceb252123d141996442ebc070d79eab9749ac08ec59e9afb3b3b0173e076e8257029&scene=21#wechat_redirect)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)