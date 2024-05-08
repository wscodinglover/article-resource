上一篇文章中主要讲解了最优化算法中的梯度下降法，类似的算法还有牛顿法、高斯-牛顿法以及LM算法等，都属于多轮迭代中一步一步逼近最优解的算法，本文首先从数学的角度解释这些算法的原理与联系，然后使用Opencv与C++实现LM算法。

1\. 牛顿法。

(1) 牛顿法用于解方程的根。对于函数f(x)，对其进行一阶泰勒展开，并忽略余项得到：

![Image](https://mmbiz.qpic.cn/mmbiz_png/0BBrsKfFcVlrYPR1hpAzK5ibcSb3RVPNeLefFxewBbFibmJhnTVCD7oZgWnJAic8frPicZEIx7sCBKia0dCl5W4fusA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

解上式得到：  

![Image](https://mmbiz.qpic.cn/mmbiz_png/0BBrsKfFcVlrYPR1hpAzK5ibcSb3RVPNeHDAHBfHVpY5icuXthS9dKTmHEuz50UTqibibHeZ9T6ibns1YIBvyibr8Pxg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

上式就是牛顿法的迭代式，设置一个初值x<sub>0</sub>，然后经过多次迭代即可得到方程f(x)=0的根x<sub>*</sub>：

![Image](https://mmbiz.qpic.cn/mmbiz_png/0BBrsKfFcVlrYPR1hpAzK5ibcSb3RVPNebW4g5TRRsKPeBA7XWL4KoN4b3GUTfria5y69Vtalyf2TFYky9lL4whw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

(2) 牛顿法用于解决最优化问题，即求函数值取得最小值时的输入参数。求方程根时，是求满足f(x)=0时的x；而求解函数最优化问题时，是求满足f'(x)=0时的x，此时我们可以把f'(x)看成一个函数F(x)=f'(x)，那么问题就等效于求解F(x)=0的根，所以有迭代式：  

![Image](https://mmbiz.qpic.cn/mmbiz_png/0BBrsKfFcVlrYPR1hpAzK5ibcSb3RVPNeraUc1SGnbX5nPXKwOMLNqCQ7NbyIcCeiciaPPmnk9QwTqDgLyHZ95iazA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

而：  

![Image](https://mmbiz.qpic.cn/mmbiz_png/0BBrsKfFcVlrYPR1hpAzK5ibcSb3RVPNeeeeiaTMjeABGtuAn3lKxlv9JHwkibia949pMNRh23egWeNnEsJ8BmTeUg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

于是有下式，即为求解f(x)最优化参数的迭代式，其中f'(x)为一阶导数，f''(x)为二阶导数。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上述情况为一维函数的情况，即输入参数只有一个，如果是多维函数，其最优化迭代式也是相似的形式：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其中X<sub>k+1、</sub>X<sub>k</sub>、▽f(X<sub>k</sub>)都是列向量，X<sub>k+1</sub>和X<sub>k</sub>分别为第k+1轮迭代与第k轮迭代的输入参数，▽f(X<sub>k</sub>)为X<sub>k</sub>的梯度向量。而H是一个n\*n维（总共n个输入参数）的矩阵，通常称为Hessian矩阵，由X<sub>k</sub>的所有二阶偏导数构成：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2\. 高斯-牛顿法。对于多维函数，使用牛顿法进行优化时需要计算Hessian矩阵，该矩阵是一个对称矩阵，因此需要计算n\*n/2次二阶偏导数，计算量相当大，所以人们为了简化计算，在牛顿法的基础上，将其发展为高斯-牛顿法。  

对第k+1次逼近的目标函数进行泰勒展开，并忽略余项，则有下式：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其中▽f为梯度向量，也即在该点处所有输入参数的偏导数组成的向量，△x为从第k次到第k+1次逼近时输入参数的变化向量。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

假设目标函数的最小值为min，那么有：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在实际问题中，通常min为0或者一个很小的正值，因此可以将min忽略，于是有：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

即：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

记G=(▽f\*▽f<sup>T</sup>)：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

于是有下式，这就是高斯-牛顿法的迭代式，与牛顿法的迭代式进行比较，可以知道区别在于高斯-牛顿法使用矩阵G来代替Hessian矩阵，这样就能很大程度减小了计算量。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3\. LM算法。由上述可知，高斯-牛顿法的逼近步长由矩阵G的逆矩阵决定，如果矩阵G非正定，那么其逆矩阵不一定存在，即使存在逆矩阵，也会导致逼近方向出现偏差，严重影响优化方向。LM算法正是为了解决矩阵G的正定问题而提出的，其将矩阵G加上单位矩阵I的倍数来解决正定问题：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

于是有LM算法的迭代式：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

由上式可以知道，LM算法是高斯-牛顿法与梯度下降法的结合：当u很小时，矩阵J接近矩阵G，其相当于高斯-牛顿法，此时迭代收敛速度快，当u很大时，其相当于梯度下降法，此时迭代收敛速度慢。因此LM算法即具有高斯-牛顿法收敛速度快、不容易陷入局部极值的优点，也具有梯度下降法稳定逼近最优解的特点。

在LM算法的迭代过程中，需要根据实际情况改变u的大小来调整步长：  

(1) 如果当前轮迭代的目标函数值大于上轮迭代的目标函数值，即f<sub>k+1</sub>\>f<sub>k</sub>，说明当前逼近方向出现偏差，导致跳过了最优点，需要通过增大u值来减小步长。

(2) 如果当前轮迭代的目标函数值小于上轮迭代的目标函数值，即f<sub>k+1</sub><f<sub>k</sub>，说明当前步长合适，可以通过减小u值来增大步长，加快收敛速度。

下面还是举一个例子，并使用Opencv和C++来实现LM算法。首先是目标函数：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

目标函数的代码实现如下：  

```
<span><span>//目标函数</span></span>
```

求输入参数的近似偏导数的代码如下：  

```
<span><span>/*</span></span>
```

计算矩阵G的代码如下，  

```
<span><span>Mat&nbsp;cal_G_matrix(Mat&nbsp;gradient)</span></span>
```

最终的LM算法实现如下：  

```
<span><span><span>void</span> <span>LM_optimize</span><span>(<span>double</span> &amp;x0, <span>double</span> &amp;y0, <span>double</span> &amp;z0)</span></span></span>
```

运行上述代码，得到结果如下，可以看到，LM算法优化得到结果(2000.499998, -155.800001, 10.250005)接近最优解的精度是非常高的。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)