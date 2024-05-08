 **一、引言**  

    在很长的一段时间内，人工智能被认为是不可能战胜人类围棋棋手的，虽然在1997年5月11日，AI“深蓝”战胜棋王卡斯帕罗夫，但是在围棋方面人们仍认为人类棋手更有获胜的可能。随着阿尔法狗的出现，人们改变了这一看法，也好奇阿尔法狗背后的原理。这期我们要说的就是阿尔法狗的重要组成部分——蒙特卡洛树搜索算法。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/w3g4zLWWjVLeYOGmQroD5FY9icQw4G7UKHDJ5pneokiaXqSqU09ulvM6AlaSHbpNZupIc3ribql8oGdvkbj7gSWuQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**二、算法原理**

    在这里我们先给出蒙特卡洛树搜索算法的流程图，我们再分模块进行解释。  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/w3g4zLWWjVLeYOGmQroD5FY9icQw4G7UKkibWhH2AvEsu19gZ9Ich5TA9SH9u2Pkpniat6Pm1zZjibdDqXEgiaEFeGA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**1、拓展（Extension）**

    拓展简单来说就是从当前节点的子节点中随机找到未被拓展的节点；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**2**、模拟（Simulation）****

    模拟就是对拓展出的节点进行随机游戏直至有一个结果，通常我们将这个结果用0/1来表示。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**3、回溯（BackPropagation）**

    我们对当前节点的子节点模拟结束之后，就需要将这一整个模拟过程中所有节点的状态进行更新，每个节点的访问次数加一，奖励次数根据模拟的结果进行处理。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**4**、选择（Selection）****

    如果我们将当前节点的所有子节点都进行了拓展、模拟、回溯，那么我们就依据UCT公式选择一个节点作为下一个节点的待拓展节点：  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其中：wi为节点的胜利次数，ni为当前节点的被拜访次数，Ni为总共的模拟次数。随着访问次数的增加，加号后面的值越来越小，因此我们的选择会更加倾向于选择那些还没怎么被统计过的节点，避免了蒙特卡洛树搜索到次优的节点。

**三、伪代码**

```
<span data-darkreader-inline-color="">&nbsp;首先阐明一些符号的概念：</span><br>
```

```
<p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">s(v): 与节点v相关的状态</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">a(v): 导致v状态的动作</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">N(v): 访问过v的次数</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">Q(v): 总共的对于v的仿真reword</span></code></p>
```

    总体的,对于当前的状态、应用蒙特卡洛树搜索、找到其子节点以及用模拟的方法确定该节点的值，返回一个具有最佳的reward的子节点。

```
<p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">function MCTS(s0)</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;create root node v0 with state s0</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;while within computational budget do</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vl &lt;- TreePolicy(v0)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></code></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delta &lt;- DefaultPolicy(s(vl))</span></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">BackUp(vl,delta)</span></span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;return a(BestChild(v0,0))</span></p>
```

TreePolicy：对当前节点拓展或者选一个最佳子节点进行拓展。

```
<p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">function TreePolicy(v)</span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">while v is nonterinal do</span></span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">if v&nbsp;is not fully expanded then</span></span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">return Expand(v)</span></span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">else</span></span></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">v &lt; BestChild(v,Cp)</span></span></p><p><span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="" data-darkreader-inline-bgcolor="">return v</span></span></p>
```

    拓展：

```
<p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>function Expand(v)</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>choose a in untried acions from A(s(v))</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;add a new child v' to v</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with s(v') = f(s(v),a) #f表示一个从（state,action)到state的映射&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></code></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and a(v') = a</span></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;v'</span></p>
```

DefaultPolicy：  

```
<p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>function DefaultPolicy(s)</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>while s is non-terminal do</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choose a in A(s) uniformly at random #随机选择一个动作</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></code><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;s &lt;- f(s,a)</span></code></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;return reward for state s</span></p>
```

BackUp：

```
<p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>function BackUp(v,delta)</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>while v is not null do</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N(v) &lt;- N(v) + 1</span></code></p><p><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></code><code data-darkreader-inline-outline="" data-darkreader-inline-bgcolor=""><span>&nbsp;Q(v) &lt;- Q(v) + delta</span></code></p><p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v &lt;- parent of v</span></p>
```