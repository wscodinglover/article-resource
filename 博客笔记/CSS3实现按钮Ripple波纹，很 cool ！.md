在现代的Web设计中，用户交互效果对于提升用户体验至关重要。按钮波纹效果是一种常见的交互效果，它为用户的点击行为增加了视觉反馈，使界面更加生动和直观。本文将介绍按钮波纹(Ripple)效果的原理和实现方法，并通过一个简单的示例来演示如何使用HTML、CSS和JavaScript来实现这一效果。按钮波纹效果是一种在按钮被点击时产生的视觉反馈效果，它通过在按钮点击位置产生波纹的扩散动画来模拟水波纹的效果，从而提升了用户对于点击行为的感知和反馈。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/ODiaMNroZ9t9uwVClwRyWJKCfHsS3yTmyTYIozxyHzl8KKJVCicNmBhZFp3zQDDQZNlztL0hP24iboeB7OvDwuMtA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**实现原理**

1.  **创建按钮元素：**使用HTML创建一个按钮元素，作为用户交互的目标对象。
    
2.  **添加波纹效果样式：**使用CSS为按钮元素添加样式，包括按钮的基本样式和波纹效果的样式。
    
3.  **监听点击事件：**使用JavaScript监听按钮的点击事件，获取点击位置的坐标。
    
4.  **创建波纹元素：**在按钮点击位置创建一个波纹元素，用于展示波纹扩散效果。
    
5.  **执行波纹动画：**使用CSS动画或者JavaScript实现波纹的扩散动画效果。
    
6.  **结束动画：**在动画结束后，移除波纹元素，完成一次点击效果的展示。
    

**思维导图**

要实现按钮波纹效果，依赖于绝对定位，波纹元素在父元素按钮内，其设置相对定位，波纹设置绝对定位，当用户点击按钮区域任意位置时，创建波纹元素span，捕获父元素偏移坐标值 offsetX 和 offsetY , 并赋值给span的left和top值，添加基本类名 ripple-effect，类名下增加波纹span元素放大功能，利用animation的线性函数来执行动画，时间0.6s，可以自行调整，然后添加到按钮元素内部，动画执行完毕需要移除波纹span元素。当然，用户连续点击多次，会创建多个span元素，需要用settimeout 函数来清理。这样一套思维下来，就出现了这个结构图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图的释义：示例图原点 x 和 y 就是点击按钮元素后捕获的offsetx和offsety坐标，值得注意的是，css中定位都是在元素的左上角，需要把波纹span元素的left和top减半，也就是除以2，甚至更大的数，以此调整波纹大小。别忘了设置 ripple-effect的 transform-origin: center center，同时设置圆角50%; 保障动画执行是以span元素中心进行的。

span中心坐标转换，用span元素的宽高的一半实现中心点:  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**完整源代码**

下面是一个简单的示例代码，演示了如何使用HTML、CSS和JavaScript来实现按钮波纹效果，js中包含了两种计算波纹span元素大小和坐标的方案，可以切换查看效果哦。

```
<span><span>&lt;!DOCTYPE html&gt;</span></span>
```

不出意外的话，以上代码跑起来就是文章开头的样子了。gif图片有点卡，真实效果比这图更有意思。如果有更好的实现方法，欢迎大家评论区留言讨论，共同进步，掌握css 技巧。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**近期文章精选![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**  

1.  [Vuetifyjs强大Vue3 UI组件库，80+精美组件，遵循Material Design设计规范](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485444&idx=1&sn=d233fbc6582716be97cd2203bcbe5fc7&chksm=ec5c995edb2b10486d513ec9afca31d16377a898ed323dd100f9f965a06c748b22edd416eda2&scene=21#wechat_redirect)  
    
2.  [CSS3实现无缝滚动scroll，实用=很丝滑+很漂亮+源码](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485431&idx=1&sn=d05fd110eed24a388d2f627cf478fce6&chksm=ec5c96addb2b1fbb0e7445bd298eef274779dc7c76ea431edd9207ca728f32b8a740bb2b76b3&scene=21#wechat_redirect)  
    
3.  [CSS3的outline属性，制作不一样的交互效果](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485418&idx=1&sn=47a2b38d77fa3fba5f938eeaed3f1e2d&chksm=ec5c96b0db2b1fa62b4334228ac30ce932d0b100bdd899742c1f9571be328a5a7218b6b2dc92&scene=21#wechat_redirect)
    
4.  [Vue2/3富文本，很清爽很好用](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485372&idx=1&sn=ca1c65f63e9abf50f1e0e2033a403bdf&chksm=ec5c96e6db2b1ff0e6c493fc45697e3e3f8581bd9bf8d84d901a615d5a88ca4c3b1fc8ea51d5&scene=21#wechat_redirect)  
    
5.  [推荐 16.4k star 滚动插件BetterScroll，增强用户交互体验，太丝滑了](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485349&idx=1&sn=7c86ca0158b8da452bedd55e62c03086&chksm=ec5c96ffdb2b1fe91220ab9f40bddda4ce5e71b197243c5e2e7626da00a6772941940e4e50c2&scene=21#wechat_redirect)