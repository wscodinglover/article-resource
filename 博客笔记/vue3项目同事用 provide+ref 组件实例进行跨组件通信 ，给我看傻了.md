## 前言

平常 你在开发过程中是不是经常会遇到这种场景：

> 一个页面共有多个区域， 头部区域和中间区域是兄弟组件 头部区域有一个 按钮 会修改 中间部分的内容

![Image](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibvYia1h8cHVzyk8ngfS9vSmmKBhjmxBXicMywiauphl7krHmEib0VI6nuWFbsLewicDhWpJEkwDA04iadIQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

## 正常解决方案

正常我们的解决方案 无非就是 props搭配emit 或者bus 总线：mitt 或者 子组件emit出去父组件用ref获取组件实例去改参数等等，但是我同事不一样 后面会叙述

### props+ emit

**父组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Header 组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Content 组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个应该是平常我们用的比较多的方式对吧

-   1）将 title变量提升到 父组件
    
-   2）header组件将事件emit 出去 在父组件中修改 title 的值
    

### emit + ref

省略  在header 中 点击事件中 emit 出去 在父组件利用 ref 获取 content 组件中的 实例 然后直接修改 title内容

### mitt

这里就省略了 无非是借用了 mitt 的**emit** 事件 和 **on** 事件 发布订阅 进行修改数据

或者你还有其他的方案 我觉得 应该也是大差不差 主要看下面的方式

## 我同事的方案

重点到了 我看了同事的方案是 provide + inject + ref 实例的方式

**父组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Header 组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Content 组件**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

他的思路是

-   利用**provide** 在父组件中 获取所有子组件的实例
    
-   利用 **inject** 将所有的子组件实例注入到所有的 给自的子组件中
    
-   这样 就可以直接 利用注入的provideRefs 获取到其他ref实例  就可以直接去修改 对应组件中的参数 或者调用 内部的方法
    
-   但是得注意 你必须要在子组件**defineExpose**  抛出你要修改的参数 或者 方法这样其他组件才能调用到
    

我看了之后 直呼一声：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  

## 总结

这种思路确实比较清奇 ，如果在 组件比较多、比较复杂的时候 ，跨组件通信 确实是比较麻烦的，你得写很多代码 各种 emit 各种 props  然后状态在父组件中 修改之后 同步到子组件中，举个例子：

### 场景一：

要是 header组件 按钮得调用 content的 刷新表格的方法的话 你八成得：

1、在父组件中 弄一个 **fetchTableFlag** 变量 传递到content 组件中

2、在header组件中 点击按钮的时候 emit 到父组件 去修改**fetchTableFlag**  的值

3、在 Content 组件中watch **fetchTableFlag**   的变化然后调用 刷新表格的方法

这样的交互多了话 可能就会导致会有很多变量 导致代码量增加  利用他的方法的话 某种程度上说确实 减少了不少代码

### 场景二：

如果组件有很多 不仅仅是这三种组件 比如 爷孙组件通信 或者兄弟组件有五六个的时候 你可能会考虑使用 pinia 但是 他们其实并没有多少的公用参数 可能只是这个组件改变了一下另一个组件的状态 给人感觉是不是放到 pinia 里面会比较重，用他的这种方式的话 就 就把传参扁平化了

但是我个人觉得这种方式，还是不推荐使用，因为他打破了vue 的单项数据流的规，导致数据流转不清晰，可是vue 既然创造了provide 和 ref 实例进行传参，那么自然有他存在的道理，我们同事之间对这种方式褒贬不一，jym 你们觉得呢？