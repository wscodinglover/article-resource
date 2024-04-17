大家好，我是你们超碎了心的于小二。最近后台有人问我mysql5.7怎么安装配置，自己搞了好久也没搞定，这里我特意的给大家整理了一篇关于安装MySQL的文章，亲测好用，需要的可以来撸了

### 前言

在安装MySQL的时候会遇到很多问题，博客上有很多解决问题的办法，在这里我附上一些链接，遇到问题的朋友们可以阅读参考哈~本文主要针对于刚接触数据库的小白，来安装MySQL数据库。目前官网上的MySQL版本有5.5，5.6，5.7和8，在开发的时候我们一般要选择比最新版低1到2个版本的，因此我选择了5.7作为要安装的数据库

### 1.下载步骤

1.  访问官方网站：[https://www.mysql.com/](https://link.zhihu.com/?target=https%3A//www.mysql.com/)  
    选择Downloads下的Community

![](https://pic1.zhimg.com/v2-5b611399ecd38490740781befa29b05c_b.jpg)

1.  下载对应的版本  
    点击上图的**MySQL Community Server**,进入下载界面：

![](https://pic4.zhimg.com/v2-6402aa9b821ba0dab93e5d07c5422ba7_b.jpg)

找到**MySQL Community Server 5.7**这一链接，点击进入：

![](https://pic4.zhimg.com/v2-277e1fe043382705272f6ac2eebec1d3_b.jpg)

根据你电脑的版本选择**下载对应的ZIP文件**，我的电脑是64位的，因此选择这项进行下载，点击**Download**会进入以下界面：

![](https://pic4.zhimg.com/v2-a490211d5d2b1123330cc683d45ca22b_b.jpg)

点击**No thanks，just start my download**  
就好，然后开始下载

![](https://pic4.zhimg.com/v2-acb39f1848b7aba36246672ac50dfedb_b.jpg)

下载完毕后将文件解压到你想保存到的盘和目录内。我是将文件解压到**E:\\Program Files\\Mysql**目录下面。  

![](https://pic3.zhimg.com/v2-c0dfc1163359e13e33291e9010ee5a56_b.jpg)

以上就完成了下载的全部工作。

### 2.配置环境变量

1.  系统—>高级系统设置—>环境变量—>系统变量

![](https://pic2.zhimg.com/v2-6abad135c72081299bab702231b29efd_b.jpg)

![](https://pic4.zhimg.com/v2-8dee124ff4815104adebacae902a9a0b_b.jpg)

![](https://pic4.zhimg.com/v2-878dcc7ef41a7d46f184ab24707d53a3_b.jpg)

点击**新建**，变量名为：**MYSQL\_HOME**，添加你的mysql-5.7.27-winx64文件夹所在位置。  
我的是在**E:\\Program Files\\Mysql\\mysql-5.7.27-winx64**，如图：

![](https://pic2.zhimg.com/v2-8a43fe0af27b5f81a5f45f083880cdd9_b.jpg)

1.  编辑Path，复制`;%MYSQL_HOME%\bin`到原有值的后面，如图：

![](https://pic4.zhimg.com/v2-782586b30d1baf3fc07cb9c3844593df_b.jpg)

3.配置my.ini文件

在你的mysql-5.7.27-winx64目录下新建my.ini文件，我的是在E:\\Program Files\\Mysql\\mysql-5.7.27-winx64目录下新建，my.ini文件的内容为：

```java
[mysqld] #端口号 port = 3306 #mysql-5.7.27-winx64的路径 basedir=E:\Program Files\Mysql\mysql-5.7.27-winx64 #mysql-5.7.27-winx64的路径+\data datadir=E:\Program Files\Mysql\mysql-5.7.27-winx64\data #最大连接数 max_connections=200 #编码 character-set-server=utf8 default-storage-engine=INNODB sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES [mysql] #编码 default-character-set=utf8
```

![](https://pic1.zhimg.com/v2-1f90d696203024ce2c5d44921b5e0e48_b.jpg)

创建完成后进入下一步。

### 4.安装MySQL

1.在输入框内输入cmd，**以管理员的身份运行**，注意这里**一定一定一定要以管理员的身份运行**，否则在安装过程中会出现因为管理权限不够而导致的**Install/Remove of the Service Denied!（安装/卸载服务被拒绝）**，这一点非常重要！

![](https://pic4.zhimg.com/v2-3f412a36beba37f99750b2cba64d5f17_b.jpg)

1.  在**cmd**中进入到\*\*E:\\Program Files\\Mysql\\mysql-5.7.27-winx64\\bin

目录下:

![](https://pic3.zhimg.com/v2-de4349be3ecbe1c52040209dc4f93a06_b.jpg)

输入安装命令：`mysqld -install`，若出现**Service successfully installed**，

证明安装成功；如出现**Install of the Service Denied**，则说明没有以管理员权限来运行cmd：

![](https://pic3.zhimg.com/v2-0e963b999473de4cb30cc654715d29ae_b.png)

然后继续输入命令：`mysqld --initialize`，此时不会有任何提示：

![](https://pic3.zhimg.com/v2-1074900e7609c2b35716b92043891836_b.png)

再输入启动命令：`net start mysql`，出现以下提示证明MySQL启动成功：

![](https://pic3.zhimg.com/v2-3d06564bc32d05130aebfe42bb233a2a_b.jpg)

### 5.设置MySQL密码

1.在这里设置密码主要是为了解决：ERROR 1045 (28000): Access denied for user ‘root’@‘localhost’ (using password: NO)的问题

2\. 首先停止MySQL服务,输入命令行`net stop mysql`：

![](https://pic2.zhimg.com/v2-f3118a45417869343b2fb65b879caed5_b.jpg)

3\. 在E:\\Program Files\\Mysql\\mysql-5.7.27-winx64目录下找到**my.ini**，在\[mysqld\]字段下任意一行添加`skip-grant-tables`，保存即可：

![](https://pic1.zhimg.com/v2-605cefe53c3d5025803dfac8ac386f0c_b.jpg)

4\. 重启MySQL,输入启动命令：

`net start mysql`，出现以下提示证明MySQL启动成功：

![](https://pic3.zhimg.com/v2-3d06564bc32d05130aebfe42bb233a2a_b.jpg)

在输入命令`mysql -u root -p`，不需要输入密码，直接回车：

![](https://pic2.zhimg.com/v2-cf12843c353df051f3b06b99add1bbf9_b.jpg)

进入MySQL成功！哈哈，来到这一步后就应该值得高兴一下了！

5\. 输入命令行`use mysql`，进入数据库：

![](https://pic3.zhimg.com/v2-b0afd82d3add8ceb1ac69de4b46832de_b.jpg)

6.输入命令行\`update user set authentication\_string=password("xxxxxx") where user="root";

\`xxxxxx是你设置的新密码，敲击回车后若出现以下信息，证明修改成功！

![](https://pic3.zhimg.com/v2-a38ff3417e6952b69de008cb0be0e5da_b.png)

7\. 手动停止MySQL服务，在win10搜索栏内输入**服务**，找到**MySQL**。点击右键，然后点击停止即可。

![](https://pic3.zhimg.com/v2-c4ab2601b545368d9279b46fa289bdca_b.jpg)

然后在刚刚的my.ini文件中删除**skip-grant-tables**这一行，保存关闭。

8\. 再次启动cmd（管理员身份），输入启动命令：`net start mysql`，再输入`mysql -u root -p`，再输入你刚刚设置的密码，出现以下信息证明设置成功！

![](https://pic1.zhimg.com/v2-91651177bbb96857c6e0814fd772ee9c_b.jpg)

然后输入命令行`use mysql`验证一下，结果报错  

![](https://pic3.zhimg.com/v2-141bd9fab0a666a4e5568305d9e2ee42_b.png)

既然没有重置密码，那就重置一下呗  
键入命令行\`alter user user() identified by "xxxxxx";

`我的密码是123456，因此我键入`alter user user() identified by "123456";

`回车！离胜利越来越近了！ 再次输入命令行`use mysql\`验证一下，成功！

![](https://pic2.zhimg.com/v2-2180dd24e2cb39b6b56e157dae24f6e9_b.jpg)

### 总结

算上我写博客的时间，安装这个数据库差不多花掉我4个小时的时间，原因是在安装途中我遇到很多问题，在此总结一下，并附上解决链接：

1.[找不到my.ini文件](https://link.zhihu.com/?target=https%3A//blog.csdn.net/baidu_41909653/article/details/82148455)  
2.[ERROR 1045 (28000): Access denied for user ‘ODBC’@‘localhost’ (using password: NO)](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_41688619/article/details/79879003)  
3.[ERROR 1045 (28000): Access denied for user ‘ODBC’@‘localhost’ (using password: YES)](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_41688619/article/details/79879003)  
4.[Unknown column ‘password’ in ‘field list’](https://link.zhihu.com/?target=https%3A//blog.csdn.net/u010603691/article/details/50379282)  
5.[You must reset your password using ALTER USER statement before executing this statement](https://link.zhihu.com/?target=https%3A//blog.csdn.net/hj7jay/article/details/65626766)

安装和配置出错了好多次，每出错一次就卸载干净一次，一度想要放弃了  
感谢自己的坚持，终于征服了MySQL的安装和配置，即将开启MySQL的学习之路，相信这也是一条不简单的路，但我也相信我能够坚持走下去！

写到最后，这是我的第三篇博客也是最长的一篇，如果能够帮到大家，就希望大家收藏点赞咯~  
慢慢地我也会写更多技术博客的，敬请关注~

> 作者：ZZZhonngger  
> 链接：[https://blog.csdn.net/weixin\_43395911/article/details/99702121](https://link.zhihu.com/?target=https%3A//blog.csdn.net/weixin_43395911/article/details/99702121)  
> 来源：csdn

另外推之前也写过MySQL的相关教程，遇到有相关的问题也可以直接问我

技术github学习地址：[https://github.com/codeGoogler/JavaCodeHub](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/JavaCodeHub)

程序员编程书籍：[https://github.com/codeGoogler/ProgramBooks](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/ProgramBooks)

关于如何学习Java，一方面需要不断的去学习，把基础知识学扎实，另一方面也要认识到java的学习不能仅仅靠理论，更多的是靠实操，所以要多练习多做项目，在实践中学习才是最好的学习方法。很多人刚开始不知道怎么去学习，这里我将一些重要的技术文章整理到了[github](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/JavaCodeHub)上开源项目上，希望能给大家带来一些帮助,项目是：[JavaCodeHub](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/JavaCodeHub)

![](https://pic3.zhimg.com/v2-2ac7c3fd5de3a9d5329fce7221f4cf1a_b.jpg)

另外，还整理了一些针对于程序员的编程书籍项目，都放到了github上面，项目为：[ProgramBooks](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/ProgramBooks) 需要的话可以自取。地址：[https://github.com/codeGoogler/ProgramBooks](https://link.zhihu.com/?target=https%3A//github.com/codeGoogler/ProgramBooks)

如果github访问太慢？我同时也把去放到了码云上面[ProgramBooks](https://link.zhihu.com/?target=https%3A//gitee.com/codeGoogler/ProgramBooks)

最后，照旧安利一波我们的公众号：「终端研发部」，目前每天都会推荐一篇优质的技术相关的文章，主要分享java相关的技术与面试技巧，我们的目标是： 知道是什么，为什么，打好基础，做好每一点!这个主创技术公众号超级值得大家关注。