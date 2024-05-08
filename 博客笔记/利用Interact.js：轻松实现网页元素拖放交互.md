**Interact.js介绍**

在网页开发的过程中，实现交互是一个必不可少的环节。JavaScript提供了诸如onclick、onmousemove等事件来实现这些交互，但真要利用这些原生事件来实现诸如拖拽、缩放、旋转等复杂的交互，就需要付出很大的代码成本。而Interact.js的出现，就是为了轻松实现这些复杂的交互。

Interact.js 是一个强大、灵活、具有快速学习曲线的JavaScript库，用于处理用户的拖动、放大、旋转和触摸手势。它利用浏览器的 PointerEvent、TouchEvent 和 MouseEvent，提供了一种更高级和一致的方式来处理这些事件。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/ODiaMNroZ9tibJpicra2n2DkO07ibGib5CcsbiaL6CbxBlxxhlohxDseicWxzUnQ3tAhob2iaY13z2JMWkSlicXbyLJViaaw/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**Interact.js特性**

Interact.js库拥有更多出色的特性，元素控制更加友好。

1.  **多点触摸：**Interact.js非常完美的支持多点触摸，可以同时处理多个手指的交互。
    
2.  **惯性和摩擦：**在拖动动作结束后，可以设置元素以一定的惯性继续移动，还可以设置元素的摩擦力，让元素平滑的停下。
    
3.  **自动滚动：**当元素被拖到边缘时，Interact.js可以自动将页面滚动到合适的位置。
    
4.  **交互事件：**Interact.js提供了一系列丰富的交互事件，比如dragstart、dragmove、dragend、resizestart、resizemove、resizeend等，可以非常灵活的控制交互行为。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**资源获取**  

<table><tbody><tr><td>GitHub<br></td><td><span data-darkreader-inline-color="">https://github.com/taye/interact.js</span></td></tr><tr><td>官方文档<br></td><td><span data-darkreader-inline-color="">https://interactjs.io/</span></td></tr></tbody></table>

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

****Interact.js是否支持自动滚动功能？****

是的，Interact.js支持自动滚动功能。当你在拖动一个元素，例如在拖拽操作或调整对象大小时，如果该元素移动到浏览器视窗的边缘，Interact.js可以自动将页面滚动到相应的方向，使你可以继续你的操作。这种功能在处理大型页面或应用时非常有用。

在Interact.js中，可以通过在`draggable`、`resizable` 或`gesturable` 方法的选项参数中设置`autoScroll`为`true`来启用自动滚动功能。代码示例如下：

```
<span>interact(target).draggable({</span>
```

上述代码中，`target`是你打算应用拖拽操作的元素。当元素被拖动并且接近于视窗的边缘时，页面会自动滚动。

**总结**  

Interact.js为我们提供了强大而灵活的交互处理能力，而且其API设计简洁易懂。无论是简单的拖拽，还是复杂的触摸手势，使用Interact.js都能让我们的工作变得简单而愉快。作为一个现代网页开发者，掌握Interact.js无疑是提升我们开发效率的一个好助手。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**近期文章精选![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**  

1.  [42.6k Star PixiJS：强大的2D WebGL渲染库](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485500&idx=1&sn=fd760111782f041b6089890fe274a5cd&chksm=ec5c9966db2b107066dfb306f2e6f03e3f942c378169d11a0ad0015fe90d94bd98962e9d1c97&scene=21#wechat_redirect)  
    
2.  [dagrejs案例升级2.0，优化视觉效果，附源码+完整版](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485488&idx=1&sn=a6d8ead5f5731e32a2e0cc52152c86e3&chksm=ec5c996adb2b107c45bba4b0a041fa09f77a4d815e249096c0f60408d4c92339c03117a09b8c&scene=21#wechat_redirect)  
    
3.  [推荐DagreJS库，构建强大复杂的图形布局](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485475&idx=1&sn=29d570fce48af8e917bee0c1932ae5c1&chksm=ec5c9979db2b106f7cf08fd681936e0a5592bfa505a2c17b4d1c6c23a45f52ed46f91e6f4d2d&scene=21#wechat_redirect)  
    
4.  [VUE3专属富文本，nice！！！](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485467&idx=1&sn=acf57db23c0096167208e9c4d77ba06b&chksm=ec5c9941db2b1057cc2da4ed7ab04ee0945092e78a6b60664844f26b019a0e75c309c1a77a73&scene=21#wechat_redirect)
    
5.  [CSS3实现无缝滚动scroll，实用=很丝滑+很漂亮+源码](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485431&idx=1&sn=d05fd110eed24a388d2f627cf478fce6&chksm=ec5c96addb2b1fbb0e7445bd298eef274779dc7c76ea431edd9207ca728f32b8a740bb2b76b3&scene=21#wechat_redirect)
    
6.  [Vue2/3富文本，很清爽很好用](http://mp.weixin.qq.com/s?__biz=MzI5NDc2NjY0NQ==&mid=2247485372&idx=1&sn=ca1c65f63e9abf50f1e0e2033a403bdf&chksm=ec5c96e6db2b1ff0e6c493fc45697e3e3f8581bd9bf8d84d901a615d5a88ca4c3b1fc8ea51d5&scene=21#wechat_redirect)