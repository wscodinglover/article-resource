```
<section><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="0" data-is_biz_ban="0" data-origin_num="50" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><p data-style="outline: 0px; color: rgb(0, 0, 0); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">点击上方&nbsp;</span><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">React</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，关注公众号</span><span data-darkreader-inline-outline="" data-darkreader-inline-color=""></span></p><p data-style="outline: 0px; color: rgb(34, 34, 34); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; word-spacing: 0.8px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">回复</span><span data-style="outline: 0px; color: rgb(0, 0, 0); caret-color: rgb(51, 51, 51); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 14px; letter-spacing: 0.544px; word-spacing: 2px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">加群</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，加入技术交流群交流</span></p>
```

## 前言

好多人认为whistle是抓包工具，殊不知抓包只是whistle能力的冰山一角。除了抓包外，它还能修改请求与响应、真机调试h5移动端、解决跨域、域名映射等等等。总而言之，使用whistle能够提升我们的开发效率，改善开发体验。

whistle一出手就是抓包工具的极限，那年它双手插兜不知道什么是对手（doge）。

## 安装&使用

### 安装与启动whistle

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm install -g whistle<br>w2 start // 启动whistle<br><br>w2 stop //停止whistle<br></code>
```

启动之后会在本机启动一台服务器，默认端口是8899

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibsYRcoudOFibQ8Sa100mcJFeiaGPibs9kFD5qxdyiczZ1iaA2hk995GyHRfI6cpjKRibNSbkIDGojyfdFYw/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

在本机打开该地址会进入whistle的控制面板，如下图所示。抓包，修改请求和响应的内容都是在这个控制面板内进行配置的。_如果要防止其他人访问配置页面，可以在启动时加上登录用户名和密码_ _`-n yourusername -w yourpassword`_

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 浏览器代理插件

在启动本地启动了whistle之后，要抓包网络的请求并不会经过whistle，这时候我们就需要安装一个插件，让目标网站的请求经过whistle完成抓包等后续的操作。

官方推荐的插件是SwitchyOmega，如果你使用的谷歌浏览器需要在应用商店翻墙进行下载。如果不想翻墙可以直接使用自带的edge浏览器，在edge的应用商店下载可以免翻墙。点击获取即可轻松下载。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

安装完成之后浏览器的工具栏内就会出现一个圆圈图标。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们进入选项界面对浏览器代理进行配置，把代理服务器填写whistle启动的端口和地址，然后把switchyOmega的选项改为proxy服务器代理就完成了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这时候在浏览器内打开想要抓包的网站就可以抓包了。目前只可以抓http的请求，因为我们还没有进行证书配置，如何配置证书后面会说。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

注意如果使用edge下载的插件就只能在edge插件内进行抓包，如果在谷歌打开网站，并不会有抓包的信息。

### 配置证书

虽然现在在whistle的network内打印出了一些信息，但全部都是http的请求，并没有https的请求，这是因为我们没有配置证书。配置证书方法如下，点击二维码进行证书下载（没错这个二维码是可以点击的，绷住了），随后跟着步骤走就行了。

安装证书请参考文档: https://wproxy.org/whistle/webui/https.html

配置成功的话https这块会变成一个对勾。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配置完证书之后再次刷新页面，就可以看到所有的https请求了，可以清晰的看到请求体和响应体的内容

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 手机抓包

首先抓包的前提是手机和电脑要处于一个网络下。关闭电脑端的防火墙，然后在手机的wifi设置中，把WiFi的代理模式设置为手动代理，主机名和端口号是 电脑的ip地址+whistle的端口号。ip地址可以通过终端的ipconfig查询。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配置完之后手机发送的请求在whistle的network列表中就能看到了。在手机端访问一下掘金的官网。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在工具栏这块可以通过settings选项对请求进行过滤。可以在whistle中看到手机端访问的列表数据。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 应用场景

whistle的强大远远不止能够抓包这么简单，它还有很多其他的功能。

### Weinre控制台

> 集成weinre的功能，用户只需通过简单配置(`pattern weinre://id`)即可使用，具体参见weinre，更多移动端调试方法可以参考：利用whistle调试移动端页面。

相信有过h5开发经历的同学都遇到过这种情况，我电脑f12模拟移动端调试的时候非常的完美，但是一到真机上会出现各种奇奇怪怪的问题，而这些问题往往是比较难以定位问题并修复的，因为在真机的h5页面上没有控制台，我们无法审查元素。

但是当你使用了whistle你会发现只需要配置一行规则，就可以轻松的调出控制台调试真机的h5页面，这就是Weinre控制台。具体效果如下图，这里为了方便展示，真机调试就用pc端模拟手机代替（真实调试的时候，需要先实现上述的手机抓包，即手机电脑在同一网络下，并且修改手机wifi的代理。）。可以看到左侧并不是浏览器自带的控制台，而是whistle自带的功能，在视察与修改左侧元素时，我们手机上的内容也会随之改变。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那么如何实现上面的效果呢？

我们只需要在Whistle控制台左侧的Rules中添加一条规则即可。

`${监听的网址} weinre://${实例名称}` 这个实例名称是工具栏中Weinre下拉框中的名字可以任意起

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">https://juejin.cn/ weinre://juejin<br></code>
```

点击工具栏中Weinre下面的juejin即可跳转到Weinre控制台页面，再刷新下监听网址的页面即可审查元素。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

借助Weinre控制台，我们可以更加容易的解决真机兼容性问题。

### 篡改响应

修改响应体还是很常用的，例如修复bug的时候，如果怀疑是接口返回值有误导致的问题，就可以通过修改响应体，来排查到底是不是后端的问题。

在调试接口的时候，例如后端接口新增了一个返回值，我们需要根据这个返回值进行相应的逻辑处理，这时候我们也可以通过修改响应体的方式mock一下新增的字段，只要确保自己mock的结果和接口返回的结构一样，就可以提前完成接口联调。

具体做法：

前半段是请求地址（支持正则匹配） 后半段是响应体的文件。`file://${路径}` 默认找的是Values下文件。

`Ctrl+右键`点击橘色的路径，会自动跳转到Values下对应的文件里，如果没有会自动创建非常方便。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

mock.json

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到 加完配置之后对应接口的响应体就变成了mock.json里面的内容。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 解决跨域

解决跨域是篡改响应的一种应用，有的后端接口没有配置CORS，导致前端接口跨域

历史解决：通过vite 或者 webpack 等工具做一个反向代理

通过Whistle的`resHeaders`可直接修改跨域接口的响应头，增加cors 配置

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">/getList/ resHeaders://{cors}<br><br># cors 文件<br>access-control-allow-credentials: true always<br>access-control-allow-headers: *<br>access-control-allow-methods: GET, PUT, POST, DELETE, HEAD, OPTIONS<br>access-control-allow-origin: *<br>access-control-expose-headers: *<br>access-control-max-age: 18000L<br>content-type: application/json<br>date: Fri, 02 Dec 2022 04:00:28 GMT<br>server: 123123<br>Access-Control-Allow-Origin: *<br></code>
```

当然功能远不止这些，还可以 篡改 API响应时间、HTTP响应状态码等。。。

### 篡改请求

可以使用reqMerge修改修改请求体，它会把`merge.json`文件的请求体合并到原本接口的请求体中。

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">/savePerson/ reqMerge://{merge.json}<br><br># merge.json<br>{<br>    name:'张三'<br>}<br></code>
```

### jsPrepend 进行js注入

使用jsPrepend可以在目标网址的srcipt中添加任意的js代码。我们这里向页面中注入一个Vconsole移动端调试工具。`${注入到哪个地址} jsPrepend://${注入的js路径}`

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">https://juejin.cn/ jsPrepend://https://cdn.jsdelivr.net/npm/eruda@2.4.1/eruda.min.js<br>https://juejin.cn/ jsPrepend://{test.js}<br></code>
```

test.js

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">var vConsole = new window.VConsole();<br></code>
```

打开控制台可以发现，我们注入的js被添加到了head的最顶部。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

VConsole成功显示到了页面上

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 域名映射

```
<span data-style="display: block; background: url(&quot;https://mmbiz.qpic.cn/mmbiz_svg/Jiavz9UrH80n3ZPbDJCb5Z2n819ehOWdJTibzcQwPIbesmM75NickNgXOcclKlpz8nuZksMYtjU7WX2jkbLlvo6O1IAFoFV8VXo/640?wx_fmt=svg&amp;from=appmsg&quot;) 10px 10px / 40px no-repeat rgb(40, 44, 52); height: 30px; width: 100%; margin-bottom: -7px; border-radius: 5px;" data-darkreader-inline-bgcolor=""></span><code data-style="overflow-x: auto; padding: 15px 16px 16px; color: rgb(171, 178, 191); display: -webkit-box; font-family: &quot;Operator Mono&quot;, Consolas, Monaco, Menlo, monospace; font-size: 12px; background: rgb(40, 44, 52); border-radius: 5px;" data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""># 可以一个ip 配置多个域名 并且支持端口号<br>127.0.0.1:9000 ddd.com aaa.com<br></code>
```

## 文档

whistle文档

## 结尾

头一次接触到抓包工具，感觉打开了新世界的大门。使用whistle，以后不管是开发mock接口数据，还是定位bug都方便了很多。

希望大家能有所收获！

```
<section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 2px; word-spacing: 2px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">欢迎关注「</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">React</span><span data-darkreader-inline-outline="">」</span></span></section><section data-style="margin-bottom: 0px; outline: 0px; background-color: rgb(255, 255, 255); font-size: 16px; text-align: left; white-space: normal; letter-spacing: 0.544px; color: rgb(102, 102, 102); font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-variant-ligatures: common-ligatures;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="2" data-is_biz_ban="0" has-insert-preloading="1" data-index="1" data-origin_num="50" data-isban="0" data-weui-theme="light" data-biz_account_status="0"></mp-common-profile></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 20px; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 2px; word-spacing: 2px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="">号内回复</span></span></section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;" data-darkreader-inline-outline="" data-darkreader-inline-color="">&nbsp;"<span data-darkreader-inline-outline="">精选</span>" ，将为您推送 历史精选文章"<span data-darkreader-inline-outline="">react"</span>&nbsp;，将为您推送 React.js 相关的学习资料&nbsp;"<span data-darkreader-inline-outline="">学习指南</span>" ，将为您推送 React-Native学习指南&nbsp;"<span data-darkreader-inline-outline="">vue</span>" ，将为您推送vue.js 相关文章&nbsp;"<span data-darkreader-inline-outline="">小程序</span>" ，将为您推送小程序相关文章&nbsp;"<span data-darkreader-inline-outline="">微信小商店</span>"，将为您推送小程序相关文章&nbsp;"<span data-darkreader-inline-outline="">加群</span>" ，添加群主好友拉你进群</section><section mp-original-font-size="16" mp-original-line-height="28.799999237060547" data-style="margin-bottom: 5px; outline: 0px; color: rgb(58, 58, 58); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-size-adjust: inherit; line-height: 28.8px; word-break: break-word;" data-darkreader-inline-outline="" data-darkreader-inline-color="">加我私人微信，拉你进 React进阶、面试交流群，互相监督学习进步等！</section><p data-style="margin-bottom: 0em; outline: 0px; color: rgb(0, 0, 0); letter-spacing: 0.544px; word-spacing: 0.8px; white-space: normal; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 16px; text-align: center;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><img data-galleryid="" data-imgfileid="308971424" data-ratio="1.261480787253983" data-s="300,640" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/e93fo6YQKNlJReqfJKqeft8SuT9o4DliaoUIJqmbtBw72F7nYumlpJ5dxIvLfbNv5W0Nf1ZtIltr9bFsL4qd6fg/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" data-type="jpeg" data-w="1067" data-darkreader-inline-outline="" data-original-style="outline: 0px; border-style: none; border-radius: 3px; display: initial; background-size: 16px !important; visibility: visible !important; width: 343.976px !important; --darkreader-inline-outline: initial;" data-index="20" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E" _width="343.976px" crossorigin="anonymous" alt="Image"><span data-style="outline: 0px; color: rgb(51, 51, 51); font-family: mp-quote, -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; text-align: justify; word-spacing: 0.8px;" data-darkreader-inline-outline="" data-darkreader-inline-color=""></span></p><section data-brushtype="text" mp-original-font-size="16" mp-original-line-height="25.600000381469727" data-darkreader-inline-outline="" data-style="margin-bottom: 0em; padding-right: 0.5em; padding-left: 0.5em; outline: 0px; background-color: rgb(255, 255, 255); color: rgb(89, 89, 89); font-size: 16px; white-space: normal; letter-spacing: 2px; font-variant-ligatures: common-ligatures; text-size-adjust: inherit; widows: 1; word-spacing: 2px; font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light; border-width: 0px; border-style: none; border-color: initial; text-align: right; line-height: 25.6px;" data-lazy-bgimg="https://mmbiz.qpic.cn/mmbiz_png/Pn4Sm0RsAuhpplm16ibb8iaib7RoGQ5iaHEdy66AHd7QqL7A2s5icSBE0aw4iaKOKPnXGYxQPhG7VMpbbYV6VJprSh7w/640?wx_fmt=png" data-darkreader-inline-color="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">“在看和转发”</span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">就是最大的支持</span></section>
```