> 本文作者为 360 奇舞团前端开发工程师

## 前言

某些项目在进行私有化部署的时候遇到了一些问题：

1.  内网隔离环境，一些`npm`包需要先下载到`u`盘再拷贝到对应的机器上进行安装，安装起来很麻烦。
    
2.  测试环境下，代码和机器配置调试好了，部署到线上机器的时候却出现了问题。
    
3.  线上机器迁移的时候，又需要在新的机器上进行机器配置了调试，等于又把之前要做的事情重来一遍。
    
4.  在有部署文档的情况下交给其他人去给不同的用户部署的时候，自己还需要一直盯着，不然出问题了其他人也不一定能解决。比如说在这个机器上有些依赖装不上等问题。自己深陷其中，无法自拔。
    

那么面对这些问题，有没有办法可以解决呢？

答案是：使用`Docker`容器部署。

## 什么是 Docker?

`Docker`容器技术是一种轻量级的虚拟化解决方案，它通过将应用程序及其依赖项打包在一个独立的容器中，实现了应用程序的跨平台部署。`Docker`容器技术具有以下特点：

1.  轻量级：`Docker`容器技术无需额外的虚拟化层，因此具有较低的资源开销。
    
2.  可移植性：`Docker`容器可以将应用程序及其依赖项打包在一起，实现跨平台的部署。
    
3.  隔离性：`Docker`容器之间相互隔离，保证了应用程序的安全性和稳定性。
    
4.  版本控制：`Docker`容器可以使用版本控制系统进行管理，便于追踪和回滚。
    

## 使用 Docker 有什么好处？

在有`Docker`的环境中，可以将你的镜像放到其中运行，只需要简单的几行命令，你的项目就可以跑起来了。而且可以保证同个镜像的内置环境是一样的，避免了类似测试环境可以到线上环境就不行的情况。

### 一、传统的项目私有化部署方式

服务端：

-   服务器
    
-   `nignx`配置
    
-   `build` => 产物，放入指定文件夹
    
-   启动`node`服务
    

前端：

-   服务器
    
-   `nignx`配置
    
-   `build` \=> 产物，放入指定文件夹
    

#### 问题点

1.  部署的人需要对前端有一定的了解
    
2.  裸机，局域网，部署的耗时都比较长
    
3.  迁移的时候容易出错
    
4.  需要进行新的私有化部署时还得重来一次
    

### 二、使用Docker容器部署

1.  提供产物从数量上来看变少，只用提供镜像即可。
    
2.  迁移方便部署人不需要关心镜像内部逻辑，前端人员可以解放出来。
    
3.  降低出错率。
    

## 基础概念

这里简要地介绍一些概念，不会太深入，有需要的同学可以自行研究。

### 一、镜像

`Docker`镜像（Image），就相当于是一个`root`文件系统。比如官方镜像`ubuntu:16.04`就包含了完整的一套`Ubuntu16.04`最小系统的 `root`文件系统。启动一个容器，需要先有一个镜像。

### 二、容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器正常启动之后，就相当于你的项目跑起来了。

### 三、镜像仓库

仓库（Repository）：仓库可看成一个代码控制中心，用来保存镜像。类似 npm 包仓库一样，你可以从上面下载其他人上传的镜像，或者上传自己的镜像供其他人使用。

## 如何使用Docker容器来部署项目呢？

### 一、制作镜像

`Dockerfile`是一个文本文件，其内包含了一条条的 指令（Instruction），每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

一个很简单的例子

```
FROM&nbsp;node:lts-alpine&nbsp;AS&nbsp;builder<br>WORKDIR&nbsp;/home/node/app<br>COPY&nbsp;front&nbsp;.<br>COPY&nbsp;.yarnrc&nbsp;.<br>RUN&nbsp;yarn&nbsp;--registry=https://registry.npm.taobao.org&nbsp;&amp;&amp;&nbsp;yarn&nbsp;build<br><br>FROM&nbsp;nginx:stable-alpine<br>WORKDIR&nbsp;/usr/share/nginx/html<br>COPY&nbsp;--from=builder&nbsp;/home/node/app/dist&nbsp;.<br>COPY&nbsp;front/nginx.conf&nbsp;/etc/nginx/conf.d/default.conf<br>COPY&nbsp;front/ssl&nbsp;/etc/nginx/ssl<br>EXPOSE&nbsp;80&nbsp;443<br>
```

#### FROM 指定基础镜像

所谓定制镜像，那一定是以一个镜像为基础，在其上进行定制。就比如说我们的项目依赖于node环境，那么我们可以基于一个`node`镜像，再进行修改，基础镜像是必须指定的。而`FROM`就是指定基础镜像，因此一个`Dockerfile`中 `FROM`是必备的指令，并且必须是第一条指令。

#### RUN 执行命令

`RUN`指令是用来执行命令行命令的。由于命令行的强大能力，RUN 指令在定制镜像时是最常用的指令之一。其格式有两种：

-   `shell`格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的`Dockerfile`中的`RUN`指令就是这种格式。
    

```
RUN&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">'&lt;h1&gt;Hello,&nbsp;Docker!&lt;/h1&gt;'</span>&nbsp;&gt;&nbsp;/usr/share/nginx/html/index.html<br>
```

-   `exec` 格式：`RUN ["可执行文件", "参数1", "参数2"]`，这更像是函数调用中的格式。
    

就比如说我们需要去复制文件，安装依赖等。

#### 构建镜像

在`Dockerfile`文件所在目录执行：`$ docker build -t nginx:v3 .`

```
Sending&nbsp;build&nbsp;context&nbsp;to&nbsp;Docker&nbsp;daemon&nbsp;2.048&nbsp;kB<br>Step&nbsp;1&nbsp;:&nbsp;FROM&nbsp;nginx<br>&nbsp;---&gt;&nbsp;e43d811ce2f4<br>Step&nbsp;2&nbsp;:&nbsp;RUN&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">'&lt;h1&gt;Hello,&nbsp;Docker!&lt;/h1&gt;'</span>&nbsp;&gt;&nbsp;/usr/share/nginx/html/index.html<br>&nbsp;---&gt;&nbsp;Running&nbsp;<span>in</span>&nbsp;9cdc27646c7b<br>&nbsp;---&gt;&nbsp;44aa4490ce2c<br>Removing&nbsp;intermediate&nbsp;container&nbsp;9cdc27646c7b<br>Successfully&nbsp;built&nbsp;44aa4490ce2c<br>
```

这里我们使用了`docker build`命令进行镜像构建。其格式为：

```
docker&nbsp;build&nbsp;[选项]&nbsp;&lt;上下文路径/URL/-&gt;<br>
```

构建完成之后，咱们就可以通过镜像来启动容器了，也就是把咱们的项目跑起来。

### 二、Docker容器之间的互连

容器启动起来之后，咱们发现访问前端容器里的页面，接口请求404了。无法正确访问到服务端的容器上。这是为什么呢？因为每个容器是相互隔离的，容器内部的网络环境也是独立的，所以容器`test1`通过127.0.0.1+端口号是无法直接访问到容器`test2`里的。这时候该怎么办呢？可以使用自定义的`Docker`网络来连接多个容器

随着`Docker`网络的完善，强烈建议大家将容器加入自定义的`Docker` 网络来连接多个容器，而不是使用`--link`参数。

#### 新建网络

下面先创建一个新的`Docker`网络。

```
$&nbsp;docker&nbsp;network&nbsp;create&nbsp;-d&nbsp;bridge&nbsp;my-net<br>
```

`-d`参数指定`Docker`网络类型，有`bridge overlay`。其中`overlay` 网络类型用于`Swarm mode`。

#### 连接容器

运行一个容器并连接到新建的`my-net`网络

```
$&nbsp;docker&nbsp;run&nbsp;-it&nbsp;--rm&nbsp;--name&nbsp;busybox1&nbsp;--network&nbsp;my-net&nbsp;busybox&nbsp;sh<br>
```

打开新的终端，再运行一个容器并加入到 my-net 网络

```
$&nbsp;docker&nbsp;run&nbsp;-it&nbsp;--rm&nbsp;--name&nbsp;busybox2&nbsp;--network&nbsp;my-net&nbsp;busybox&nbsp;sh<br>
```

再打开一个新的终端查看容器信息

```
$&nbsp;docker&nbsp;container&nbsp;ls<br><br>CONTAINER&nbsp;ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IMAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COMMAND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CREATED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PORTS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NAMES<br>b47060aca56b&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;busybox&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"sh"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11&nbsp;minutes&nbsp;ago&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Up&nbsp;11&nbsp;minutes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;busybox2<br>8720575823ec&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;busybox&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"sh"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;minutes&nbsp;ago&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Up&nbsp;16&nbsp;minutes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;busybox1<br>
```

下面通过`ping`来证明`busybox1`容器和`busybox2`容器建立了互联关系。在`busybox1`容器输入以下命令

```
/&nbsp;<span data-darkreader-inline-color="">#&nbsp;ping&nbsp;busybox2</span><br>PING&nbsp;busybox2&nbsp;(172.19.0.3):&nbsp;56&nbsp;data&nbsp;bytes<br>64&nbsp;bytes&nbsp;from&nbsp;172.19.0.3:&nbsp;seq=0&nbsp;ttl=64&nbsp;time=0.072&nbsp;ms<br>64&nbsp;bytes&nbsp;from&nbsp;172.19.0.3:&nbsp;seq=1&nbsp;ttl=64&nbsp;time=0.118&nbsp;ms<br>
```

用`ping`来测试连接`busybox2`容器，它会解析成`172.19.0.3`。同理在`busybox2`容器执行`ping busybox1`，也会成功连接到。

```
/&nbsp;<span data-darkreader-inline-color="">#&nbsp;ping&nbsp;busybox1</span><br>PING&nbsp;busybox1&nbsp;(172.19.0.2):&nbsp;56&nbsp;data&nbsp;bytes<br>64&nbsp;bytes&nbsp;from&nbsp;172.19.0.2:&nbsp;seq=0&nbsp;ttl=64&nbsp;time=0.064&nbsp;ms<br>64&nbsp;bytes&nbsp;from&nbsp;172.19.0.2:&nbsp;seq=1&nbsp;ttl=64&nbsp;time=0.143&nbsp;ms<br>
```

这样，`busybox1` 容器和 `busybox2` 容器建立了互联关系。

### 三、导出镜像

OK，通过 使用自定义`Docker`网络，咱们可以实现`Docker`容器之间的互联了。

咱们在自己的机器上调通之后，怎么在其他的机器上进行部署呢？

1.  如果在公司内部有私有的`Docker`镜像仓库，我们可以把构建好的镜像上传至私有仓库，然后再从测试/线上的机器拉取对应的镜像即可，启动容器即可。
    
2.  在没有私有的`Docker`镜像仓库的情况下，可以将咱们的镜像进行导出，导出之后再拷贝到目标的机器上进行导入，然后启动容器。
    

#### 如何导出镜像

一、`docker save`是用来将一个或多个`image`打包保存的工具。

```
docker&nbsp;save&nbsp;-o&nbsp;images.tar&nbsp;postgres:9.6&nbsp;&nbsp;mongo:3.4<br>
```

二、`docker export`是用来将`container`的文件系统进行打包的。

```
docker&nbsp;<span data-darkreader-inline-color="">export</span>&nbsp;&nbsp;-o&nbsp;postgres-export.tar&nbsp;postgres<br>
```

两者之间有什么区别呢：

-   `docker save`保存的是镜像（image），`docker export`保存的是容器（container）；
    
-   `docker load`用来载入镜像包，`docker import`用来载入容器包，但两者都会恢复为镜像；\* `docker load`不能对载入的镜像重命名，而`docker import`可以为镜像指定新名称。
    

`docker save`的应用场景是，如果你的应用是使用`docker-compose.yml`编排的多个镜像组合，但你要部署的客户服务器并不能连外网。这时，你可以使用`docker save`将用到的镜像打个包，然后拷贝到客户服务器上使用`docker load`载入。

`docker export`的应用场景主要用来制作基础镜像，比如你从一个`ubuntu`镜像启动一个容器，然后安装一些软件和进行一些设置后，使用`docker export`保存为一个基础镜像。然后，把这个镜像分发给其他人使用，比如作为基础的开发环境。

### 四、导入镜像

一、使用 `docker import` 命令则可将这个镜像文件导入进来（跟`docker export`配对使用）。

```
docker&nbsp;import&nbsp;/path/to/latest.tar<br>
```

二、使用`docker load`命令则可将这个镜像文件载入进来（跟`docker save`配对使用）。

```
docker&nbsp;load&nbsp;-i&nbsp;/path/to/fedora-latest.tar<br>
```

### 五、启动容器

假设我们已经导入了服务端镜像`my-server`以及前端镜像`my-front`，我们该如何启动呢？

首先我们需要先创建一个网络，让容器具备互联的基础：

```
docker&nbsp;network&nbsp;create&nbsp;-d&nbsp;bridge&nbsp;my-net<br>
```

然后，分别启动一下我们的服务端和前端容器。

-   服务端启动：`docker run -d -p 8360:8360 --network my-net --network-alias myserver my-server`
    
-   web端启动 `docker run -d -p 8080:80 --network my-net --network-alias myfront my-front`
    

## 真实场景下的部署体验感觉

### 一、传统模式下的部署

传统的部署模式下，我们需要挨个去安装各种各样的环境：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

安装完成之后，再拷贝相关的代码以及配置文件到目标的机器上：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

启动服务，调试一下前端、服务端、数据库是否能正常链接。

### 二、使用Docker改造之后的部署

1.  安装docker 环境
    
2.  创建 docker 网络：sudo docker network create -d bridge my-net
    
3.  上传镜像文件（my-front.tar、my-server.tar）至服务器
    
4.  导入镜像：sudo docker load -i my-front.tar、sudo docker load -i my-server.tar
    
5.  启动服务端容器：docker run -d -p 8360:8360 --network wenjuan-net --network-alias myserver  my-server
    
6.  启动系统前端容器：sudo docker run -d -p 8080:80 --network my-net --network-alias myfront  my-front
    

在传统的模式下我们完成部署以及调试可能需要一天甚至更多的时间（不熟悉项目的情况下）。使用`Docker`容器部署之后，参照给定的文档，大概 10 分钟左右就可以完成部署了。我们再也不用担心测试环境和线上环境配置统一的问题了，只要使用的是同一个环境，那么它们的环境配置都是一样的。而且交给其他人去进行部署，也不用咱们时刻盯着了，只需几行简单的命令，项目就可以正常跑起来了。

## 结语

通过`Docker`来进行私有化部署，可以大大缩减了部署的时间以及人力投入。在其他场景应用中，使用`Docker`容器部署也可以提高项目的开发效率以及项目的可维护性，比如：一些处于维护状态的老旧项目，经过无数代的流转连文档都没有了。一般都是能不动就不动，但是突然某一天需要进行项目的迁移，那可就头大了（想想看，你花费了很大的力气觉得已经迁移好了，却发现在哪个犄角旮旯里少了一个配置文件，这得有多崩溃）。如果说是通过`Docker`进行部署的，迁移的时候，基本上使用镜像进行重新部署以及配置好环境变量就可以了。

这都是`Docker`的一些比较基本的使用方式，`Docker`还有很多进阶的使用方式，如`docker-compose.yml`编排之类的，还需要去进行更深入的探索。

## 参考资料

【详解 docker save 与 docker export 的区别】

【docker docs】

【Docker-从入门到实践】

奇舞团是 360 集团最大的大前端团队，代表集团参与 W3C 和 ECMA 会员（TC39）工作。奇舞团非常重视人才培养，有工程师、讲师、翻译官、业务接口人、团队 Leader 等多种发展方向供员工选择，并辅以提供相应的技术力、专业力、通用力、领导力等培训课程。奇舞团以开放和求贤的心态欢迎各种优秀人才关注和加入奇舞团。