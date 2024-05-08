在我上高中的时候，第一次知道了自然常数e

当时我对它的印象只有：e=2.71828……

至于这个数是怎么来的？为什么要专门把这个数拿出来？这个数又为什么叫自然常数？

课本上没写，我也没细究，当时这些问题不了了之。

等我上了大学，又遇到自然常数e，好的一点是，我知道了它是怎么来的，它是一个“重要极限”：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/umba9AepMJQM3gsibibJkZzMvuclQ6l679LSRTGGjENDtX3pOHmWpuIibictjuIAnTHBBNpM4vLbGOe4dQ3K3FC2Hg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

不过，新的问题又来了。

这个“重要极限”是怎么来的？为什么要计算这个“重要极限”？为什么要把这个“重要极限”叫做自然常数？它到底有什么用？

那个时候，我留了个心眼，专门查了查自然常数e的实际作用，查到的结果都非常相似：复利。

几乎所有资料都只提e和复利的关系，但是复利只是计算银行利息的一种方法，和自然有什么关系吗？

又过了很久，我才终于发现e和自然的一些联系：本征方程。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/umba9AepMJQM3gsibibJkZzMvuclQ6l679cic2icnL8x6KrficbYNDUZzuL0v9uqogomRfgXQdNMvr4ecdONys0oUicg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 从自然现象开始

本文就不多谈复利了，直接从一个自然现象开始引出e。

一些元素是放射性元素，它们会衰变，衰变之后就变成了另一种元素，同时还会释放一些射线，这些射线对人体有害。

比如铀元素可以衰变成钍元素。

但是，对于一个放射性元素，比如一个铀原子，我们根本不知道它什么时候会衰变。它可能在下一秒就衰变，也可能在一年后衰变，还可能在一千年后衰变。

不过，一旦有很多个铀原子，我们就能发现关于衰变的统计规律。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一个铀原子在下一时刻会不会衰变？

这其实是一个概率问题，每一种放射性元素都有固定的衰变概率。

一旦有很多个铀原子，我们就能统计出衰变概率，从而预测：经过多长时间以后，还有多少个铀原子没有衰变。

比如：

如果某种原子在单位时间内的衰变概率是10%，那么：

-   每10000个这种原子，大概会有1000个原子在单位时间内衰变，剩下9000个这种原子。
    
-   每9000个这种原子，大概会有900个原子在单位时间内衰变，剩下8100个这种原子。
    
-   每8100个这种原子，大概会有810个原子在单位时间内衰变，剩下7290个这种原子。
    
-   ……
    

看上去好像衰变越来越慢，其实衰变概率不变。只是由于体量越来越小，导致单位时间内衰变的原子越来越少。

这个过程和“复利”很像，只不过是“复亏”。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上面描述原子衰变的方法并不好，因为它只能描述：经过整数个单位时间，大概还剩多少个原子没衰变。

如果我想知道：经过任意时间，大概还剩多少个原子没衰变？

此时就需要引入自然常数e

我们一步步来考虑，首先就是把单位时间缩短。单位时间只是人为规定的一个时间，可以认为它就是我们对时间的“最小分辨率”。

只要单位时间足够短（无穷小），我们就能用任意数量（无穷大）的单位时间来表示任意时间。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 具体做法

可以用x表示某种放射性原子的数量，最开始的数量是x0

我们要求解的是：经过时间t以后，x的数值是多少？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

首先把t分成n小段，每一小段的时间间隔都是τ

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

假设：放射性原子在单位时间内的衰变概率是k，并且经过一个τ的时间，放射性原子的数量从x0变成x1

由此，我们可以用一个式子计算x1

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

再经过一个τ的时间，放射性原子的数量从x1变成x2

我们可以用相同的方法计算x2

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)以此类推，从最开始到经过n个τ的时间，放射性原子的数量变成xn

我们可以用相同的方法计算xn，这就是我们要求解的最终结果：经过时间t以后，x的数值。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在这里，t是一个任意的时间，τ就是我们上面所说的单位时间。

所以应该让τ无穷小，相当于让n无穷大。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对上面的式子做一些变形，就能得到本文开头提到的那个“重要极限”，也就是自然常数e的定义式。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

由此得到放射性原子的数量变化规律：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这就是e指数衰减，自然界普遍存在的衰减规律。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 微分方程

在上文中，出现了这种式子：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

由于我们要让τ无穷小（无限接近零，但不是零），所以上面这些式子其实就是x关于t的导数。

导数也叫变化率，在上面的例子里，就是：随着t变化，x变化的快慢。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上面的式子其实是一个微分方程（含有导数的方程）。

微分方程是博大精深的数学，它描述了自然界最基本的现象：变化。

一切自然科学，归根结底，都是关于变化的科学。一切自然科学的公式，归根结底，都是微分方程。

就比如上面描述放射性原子衰变的微分方程，它简洁地描述了原子衰变的基本规则：一种原子数量的变化率，正比于衰变概率。

求解它，就能得到放射性原子衰变规律（e指数衰减）。上文推导e的方法其实就是在变相求解微分方程。

它就像一段最基本的程序，求解它的过程就是运行程序的过程。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那些著名的公式：  

-   描述宏观物体运动的牛顿第二定律、欧拉-拉格朗日方程、哈密顿正则方程。
    
-   描述流体运动的纳维-斯托克斯方程。
    
-   描述电磁场的麦克斯韦方程组。
    
-   描述引力场的爱因斯坦场方程。
    
-   描述低速微观粒子的薛定谔方程。
    
-   描述高速微观粒子的狄拉克方程。
    
-   描述希格斯粒子的克莱因-戈登方程。
    
-   描述弱核力、强核力的杨-米尔斯方程。
    
-   ……
    

它们全是微分方程。

举这些例子，只是想让大家具体感受一下微分方程的强大。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 本征方程

回到上面描述原子衰变的微分方程。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这种形式的微分方程揭示了e的本质：一个量的变化率，与这个量自身成正比。  

熟悉微积分的读者应该更有感触，以e为底的指数函数，它的导数等于它本身。如果指数项乘了一个常数，它的导数等于它本身乘那个常数。

这种性质最能揭示e的本质。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在原子衰变的例子里，一种原子数量的变化率，正比于这种原子的数量。

自然界的这种例子其实很多：

-   化学反应，反应速率正比于反应物的浓度，而反应速率又是反应物浓度的变化率。
    
-   电容器放电，导体上的电流正比于电压，电容器与导体的电流相同，而电容器的电流又正比于电压的变化率。
    
-   定态薛定谔方程，波函数的变化率正比于波函数。
    
-   ……
    

e指数衰减的模式在自然界非常普遍，就是因为“一个量的变化率，与这个量自身成正比”很普遍。

这种模式其实就是本征方程。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本征方程可以简单理解成：一顿操作猛如虎，结果就是乘个数。

还是看描述原子衰变的微分方程。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

它对应的“一顿操作”就是：求一次导数。

求一次导数，就等于原本的函数乘以常数，这是一阶微分本征方程。

e指数函数是一阶微分本征方程的通解，表示e指数衰减。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

相应的还有二阶微分本征方程，求两次导数，才等于原本的函数乘以常数。  

二阶微分本征方程的解，通常表示振荡，对应正弦函数或余弦函数。但欧拉公式告诉我们，正弦函数和余弦函数也和e有关，只不过此时e的指数是虚数。

e复指数函数是二阶微分本征方程的解，表示振荡。最出名的例子应该是：简谐振动。

当然，还有更高阶的微分方程。

它们的解，都可以看成是由一阶微分方程、二阶微分方程的解组合而成。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以说，一切与衰减、振荡有关的现象，都和e有关。  

___

本文原创作者为：认知皆模型。

未经原创作者授权，任何个人与机构不得转载此文。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)