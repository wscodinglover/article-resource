![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[丸子爱学习！](https://blog.csdn.net/weixin_64064486 "丸子爱学习！") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2022-04-03 17:30:50 修改

GCC是由[GNU](https://so.csdn.net/so/search?q=GNU&spm=1001.2101.3001.7020)开发的编程语言译器。最近复现代码时需要编译源文件，总是报错，后来查验报错原因后，是由于电脑没能安装GCC。C 语言编译器用于把源代码编译成最终的可执行程序。但是本人不是很懂编译原理，这里仅提供安装步骤。

综合网上一系列步骤，以此记录windows下[安装gcc](https://so.csdn.net/so/search?q=%E5%AE%89%E8%A3%85gcc&spm=1001.2101.3001.7020)的办法。

**STEP 1 ：下载.exe文件**

打开一下网页，下载Download mingw-get-setup.exe (86.5 kB)

[MinGW - Minimalist GNU for Windows - Browse Files at SourceForge.net](http://sourceforge.net/projects/mingw/files/ "MinGW - Minimalist GNU for Windows -  Browse Files at SourceForge.net")  
安装目录推荐非C盘的位置，记住安装位置，如本人D:\\MinGw

![](https://img-blog.csdnimg.cn/d800940340e3414392af3af4f827d18f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_9,color_FFFFFF,t_70,g_se,x_16)

**STEP 2：安装.exe**

运行 Download mingw-get-setup.exe，就注意下安装目录就好，其他就是continue什么的

**STEP 3：环境变量配置**

需要修改环境变量 **选择计算机—属性---高级系统设置---环境变量**，在系统变量中找到 Path 变量，在后面加入 min-gw的安装目录，如 D:\\MinGw\\bin

![](https://img-blog.csdnimg.cn/14dce1c46f1c43eb8b68062c9978b03c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_10,color_FFFFFF,t_70,g_se,x_16)

 ![](https://img-blog.csdnimg.cn/a7782af3ede94ad88d13b53211e79654.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_17,color_FFFFFF,t_70,g_se,x_16)

![](https://img-blog.csdnimg.cn/56a68f5c811a45ccbfad69ab0f61c430.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_18,color_FFFFFF,t_70,g_se,x_16)

![](https://img-blog.csdnimg.cn/340bfdb9185d4c58b95b7f1763539613.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_19,color_FFFFFF,t_70,g_se,x_16)

 **STEP 4：确认MinGw的安装成功**

win+r打开cmd，输入**mingw-get**，此时会弹出 MinGw installation manager 的窗口，这时候证明MinGW的安装成功，**此时需要关闭MinGW的窗口**，否则会报错。

![](https://img-blog.csdnimg.cn/6bd969981791449696e9f7314884baa4.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_20,color_FFFFFF,t_70,g_se,x_16)

  **STEP 5：安装gcc**

在cmd窗口输入命令：**mingw-get install gcc** 来安装gcc，会有一些慢，稍等

![](https://img-blog.csdnimg.cn/f3324d804aae4ad4853e7f8c4ec86ce6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_20,color_FFFFFF,t_70,g_se,x_16)

 如果想安装 g++,gdb,只要输入命令 mingw-get install g++ 和 mingw-get install gdb

  **STEP 6：查看gcc**

在cmd中输入**gcc -v**来查看gcc安装是否成功，成功如下

![](https://img-blog.csdnimg.cn/24851cab89814d19b3168052f8a51147.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Li45a2Q54ix5a2m5Lmg77yB,size_20,color_FFFFFF,t_70,g_se,x_16)