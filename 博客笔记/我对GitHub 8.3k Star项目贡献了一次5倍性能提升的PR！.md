  

本文是一次优秀的反哺开源社区贡献实践，腾讯工程师在日常工作中基于对开源库 qs 的使用，发现了其在某些业务场景下存在的瓶颈问题。通过对测试数据的复现，debug 定位了真正的问题原因，并基于对问题的分析提出了一个稳定提升 5 倍性能的调优方案。

本次调优方案在他发起 pull request 后，仅耗时 34 小时便被开源库作者合入主线并发布新版本，成为截至目前唯一的性能优化更新。他是怎么做到的，一起来看看吧！

## 01

qs 库简介

qs 是 JavaScript 领域最流行的解析和序列化 URL 查询字符串开源库。  

GitHub 上依赖 qs 的代码库超过2760万，npm 上每周下载量超过7000万。

作者 Jordan Harband 自2014年以来一直是 TC39（JavaScript 标准委员会）成员，并在18-21年担任编辑。

## 02

优化过程

   2.1 发现问题

-   实际业务场景中使用包含了 30M+ 的中文文本的数据在 Windows 上 node 进程出现了 crash 的现象。
    
-   好在该问题有相关的测试数据可以在特定环境下稳定复现，debug 发现导致 crash 的原因是 JavaScript heap out of memory。
    

   2.2 定位问题

1.  解决 OOM 问题的主要挑战在于定位内存泄漏的源头。在庞大且复杂的项目中，追踪内存泄漏的线索尤其困难，但是一旦准确地定位到位置，通常该问题就解决了99%。
    
2.  基于以往处理 Node 内存泄漏的经验，问题往往出现在某些变量的生命周期管理不当，导致它们持续占用了大量内存。因此，我最初尝试使用 Chrome 的开发者工具来对 Node.js 进程进行内存快照分析，以便发现是否有堆栈占用了异常的内存量。遗憾的是，这次尝试并未成功，未能发现任何某些变量内存占用特别大的情况。
    
3.  既然能稳定复现该 OOM 的环境，那么就直接在相关业务流程的关键点打内存变化日志，最终通过日志逐步排查定位到内存激增的地方是 qs.stringify 附近。
    
4.  qs 库已经持续十多年更新上百版本，所以一开始是不太敢确认一定是 qs 库处理大数据性能有问题，还是项目复杂的环境干扰到了。那就单独起一个独立干净的测试 Demo，引入与项目相同的 qs 库，构造同级数据量测试内存和耗时，发现确实是 qs 的问题。
    
5.  看到项目中 qs 不是最新版本，那么就升级下 qs 看看性能问题是否已经优化了，可惜最新版本测试效果一样。既然这样，那就自己动手丰衣足食，去寻找 qs 性能瓶颈并尝试优化。
    

   2.3 原因分析

-   直接下载 qs 库源代码进行 debug，在关键路径上输出耗时和内存。
    
    最终发现 encode 函数性能不佳，encode 是 qs 库核心功能的底层函数。
    
    把这个函数单独拿出来简化后使用 30M 中文测试耗时8092ms，内存2.369G。
    
-   以下代码是encode函数的性能不佳的部分，分析可知：
    
    当 string 的长度为 30M，那么 for 循环需要遍历30 ✖1024 ✖1024，超过3000万次。
    
    JavaScript 中，字符串是不可变的，每次字符串拼接操作都会创建一个新的字符串，这会导致大量的内存分配和垃圾回收，从而增加内存占用和处理时间。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

   2.4 解决思路

1、通过以上分析，优化一个方向在于通过减少字符串拼接的次数而减少临时变量的产生以降低内存的消耗。

2、如何减少字符串的拼接呢？考虑换一种数据结构来存放这些被 encode 后的字符，最终再把这些字符一次性转成字符串。

3、首先尝试把 encode 后的字符放在一个数组中，这样就不会产生临时的字符串变量了，等 string 的每个字符都处理完成，再把数组转成最终结果的字符串。

```
<span><span>// 简化代码示意</span></span>
```

然而，经过测试发现该方法：

-   字符放入数组，耗时5168ms，内存1.928G。
    
-   数组转字符串，总耗时7040ms，内存3.535G。
    

**耗时略降，内存暴增，负优化！初步探索失败告终！**

4、直接把字符串改数组来存放临时变量，虽然失败了，但是会发现，改成数组存放，耗时和内存确实有所减少，只是大数组转字符串这一步又大幅消耗了内存。

5、那么是不是可以尝试分片：限制一定数量的字符放入到数组中，然后把数组转成字符串，再把这些片段字符串拼接成最终的结果，这样可以减少字符串拼接过程产生的临时变量，也会控制数组的大小和生命周期，避免内存占用过高。

   2.5 方案优化

1、首先把string进行分片，每片 string 遍历进行 encode，encode 后的字符放入到 array 中存储，当一片 string encode 完成后，把 array 转字符串拼接到最终结果中去，这样这个临时存储的 array 就可以及时释放掉。

```
<span><span>// 简化代码示意</span></span>
```

2、根据以上方案进行多项测试，最终对比之后发现分片大小为1024时性能最好。同样 30M 的数据测试，耗时1701ms，内存459M，**性能提升约5倍！**

3、为什么分片是1024呢？qs 的作者也问了这个问题。如果分片太小，那么字符串拼接的次数还是很多，效果不明显。如果分片太大，临时数组本身占用内存不能及时释放掉，并且大的数组转字符串性能也不佳。1024是考虑到减少字符串拼接次数和能让临时数组及时释放掉之间的平衡，综合测试得到的最好结果。

## 03

开源贡献

   3.1 历程（仅 34 hours）

本以为给开源库提交代码到进入正式的版本会经过较长周期，但是本次贡献在和作者15个小时时差的情况下，从 GitHub 上发起 pull request 到 npm 新版本发布全程仅34小时！尤其是代码合入主线后一小时内就发布了新版本！

-   04.11 20:53 提交 pull request。
    
-   04.11 22:49 作者第一次 review；
    
    review & fix 耗时15小时。
    
-   04.12 13:39 作者 approved；
    
    自动化测试耗时13小时，approved 后需要321项测试 checks passed 才能合入主线。
    
-   04.13 05:36 代码合入主线。
    
-   04.13 06:24 npm 上 qs 新版发布。
    

看 qs 历史发布记录一个新版需要几个月时间，如果是这样那在业务中还需要自己先单独维护一个包非常麻烦，好在作者的支持非常及时高效。

   3.2 结果

-   #### 【前无古人】截至目前唯一的性能优化更新 ：
    
    成为 qs 库 GitHub 上的 contributors 之一。
    
    通过变更日志 CHANGELOG.md 文件查询可知截止目前是 qs 库唯一的性能优化更新。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   【数据对比】qs 库处理大数据性能提升约5倍：
    
    qs 库版本升级前后 30M 中文测试耗时和内存对比。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span><span>// 测试脚本</span></span>
```

## 04

总结

-   本次性能优化虽然修改量不大范围可控，但是收获颇丰，性能提升约5倍
    
-   qs 库在十多年的历史中已持续不断更新了数百个版本，在社区有着广泛的影响力，但直到今天依然可以从实际业务中出发，发现性能瓶颈并优化改进。日常开发中如果发现开源库有哪些有待改进的地方，可以积极参与，不仅解决实际业务问题还可以反哺开源社区。
    
-   本次优化和版本发布与作者沟通过程中非常高效，并得到其积极支持，review 时其给出改进意见，深受启发受益匪浅。
    

\-End-  

原创作者 | 李鑫

敬请关注「Nodejs技术栈」微信公众号，期望与志同道合的你一起打造优质 “Nodejs技术栈” 交流群，一起互相学习进步！可长按下方二维码添加【五月君】个人微信备注 “Node” 邀请入群。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

