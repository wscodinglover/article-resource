> 导读：目前网络上可以随意查到各种VSCode插件的相关文章，但往往有一些特殊的功能需求找不到合适的插件。那么不如自己开发一个插件吧，打造一把称手的兵器！

VSCode (全称：Vistual Studio Code) 由 Microsoft 出品，其具备启动快速、稳定性好、占用内存较小、插件越来越丰富、社区活跃等特点，目前是个人和团队中很多小伙伴的主力代码编辑器。

下面直奔主题，本文你将了解简单的 VSCode 的插件开发入门，感兴趣的同学可以继续阅读。

> 以下文中提到的“插件”均为 Vistual Studio Code 的插件，Vistual Studio Code 也简称 VSCode

## 环境准备

-   nodejs \[1\] 建议使用 LTS 版本，截止发文 v8.11.3
-   npm \[2\] 建议最新版本，截止发文 v6.1.0
-   yeoman \[3\] `npm install -g yo`
-   generator-code \[4\]`npm install -g generator-code`

做好上面的环境准备，正式进入开发，下面我会以自己刚做好的一个查询北京地区空气质量为例子，继续介绍（安心してください，代码很少，很好入门）。

## 数据准备

下面补充一下我们的例子的功能，首先明确我们要获取城市的 AQI（空气质量）信息，网络上可以搜索到直接调用 API 或者 SDK，笔者目前使用的京东云的一个产品京东万象中的一个天气免费 API\[10\]， 注册实名认证后可以获得一个调用应用的 KEY，便可以获取天气数据了。更多其他方面的 API 读者可以自行探索。

笔者使用的 API 是 [wx.jdcloud.com/market/data…](https://link.juejin.cn/?target=https%3A%2F%2Fwx.jdcloud.com%2Fmarket%2Fdatas%2F26%2F10610 "https://wx.jdcloud.com/market/datas/26/10610") 参数 city 支持 中英文名称、ID 和 IP 限制 5000次/天。

## 锦囊

已有插件所在目录如下：

| os | path |
| --- | --- |
| windows | %USERPROFILE%\\.vscode\\extensions |
| macOS | ~/.vscode/extensions |
| Linux | ~/.vscode/extensions |

在这个目录下我们可以看到已经安装的所有插件的代码，即使插件是使用 typescript 编写， out 文件夹也可以看到编译后的 javascript 代码，感兴趣的同学可以直接看一看自己平时最常用的插件是如何实现的。

## 开发

执行下面代码：

```armasm
yo code  
```

执行后会提示几个问题，第一个问题我们选择 `New Extension (JavaScript)`，其他正常填写即可。（可以使用 yo code 来创建插件、主题、代码片段、语言支持、键盘映射、插件包，本文我们只讨论插件，其他暂且放在一边。）

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bafea675a1e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

填写完成后，会自动创建文件夹并帮助初始化完成文件，我们先来看下目录结构。

```clean
. ├── CHANGELOG.md ## 修改记录 ├── README.md ## 插件说明 README ├── extension.js ## 入口 ├── jsconfig.json ## JavaScript 配置 ├── node_modules ## 依赖 ├── package-lock.json ├── package.json ├── test └── vsc-extension-quickstart.md  
```

熟悉了项目文件结构之后，直接查看 `vsc-extension-quickstart.md` 这个文档，文中提到 `package.json` 声明当前插件和命令的配置文件，用来注册命令等配置；`extension.js` 是主入口文件，插件的具体实现代码可以放在这里；

简单了解一下两个重要文件：

```awk
{ "name": "city-aqi", // 插件名称 "displayName": "city-aqi", // 插件显示名称 "description": "Air Quaility Index of City", // 插件描述 "version": "0.0.1", "publisher": "beanleecode", // 插件发布者 ... "activationEvents": [ // 活动事件列表 "onCommand:extension.sayHello" ], "main": "./extension", // 入口文件 "contributes": { "commands": [ // 对应命令列表 { "command": "extension.sayHello", "title": "Hello World" } ] }, ... }  
```

```javascript
<br />const vscode = require('vscode');   function activate(context) {   // 这里的代码将只会在插件激活时执行一次 console.log('Congratulations, your extension "city-aqi" is now active!');   // 定义在 package.json 中的命令在这里定义 // 提供 registerCommand 来注册实现代码 // commandId 参数必须与 package.json 匹配 let disposable = vscode.commands.registerCommand('extension.sayHello', function () { // 这里的代码每次执行 这个命令 的时候都会被执行   // 显示信息框 vscode.window.showInformationMessage('Hello World!'); });   context.subscriptions.push(disposable); } exports.activate = activate;   // 插件被停用的时候被调用 function deactivate() { } exports.deactivate = deactivate;  
```

下面我们直接用 VSCode 打开这个项目的根目录，打开 `extension.js` 按下键盘 `F5` 或启动调试，接下来就可以看到，已经启动一个新的窗口，我们按下 `command + shift + p` 或 `command + p 再输入 >` 即可调用插件，在 package.json 中已经定义过 commands 我们直接输入 `Hello World` 直接启动插件，此时可以看到 Hello World 的通知框，就可以调试代码了。

OK，下面我们来进一步实现我们的功能，调取天气 API 数据并展示。

```reasonml
const vscode = require('vscode'); const axios = require('axios');   function activate(context) { let cityAqi = vscode.commands.registerCommand('extension.sayCityAqi', function () {   const options = { ignoreFocusOut: true, password: false, prompt: "Please type your city (eg.beijing or 北京)" };   vscode.window.showInputBox(options).then((value) =&gt; { if (value === undefined || value.trim() === '') { vscode.window.showInformationMessage('Please type your city.'); } else { const cityName = value.trim(); // appkey=xxxxxxxx 替换成事先申请好的 key axios.get(`https://way.jd.com/he/freeweather?city=${cityName}&amp;appkey=xxxxxxxx`) .then((rep) =&gt; { if(rep.data.code !== '10000') { vscode.window.showInformationMessage('Sorry, Please try again.'); return; } const weatherData = rep.data.result.HeWeather5[0] if(weatherData.status !== 'ok') { vscode.window.showInformationMessage(`Sorry, ${weatherData.status}`); return; } vscode.window.showInformationMessage(`${weatherData.basic.city} 's AQI =&gt; PM25: ${weatherData.aqi.city.pm25}, PM10: ${weatherData.aqi.city.pm10} ${weatherData.aqi.city.qlty}`); }); } }); });   context.subscriptions.push(cityAqi); } exports.activate = activate;   function deactivate() { } exports.deactivate = deactivate;  
```

Tadaaa，简单的功能就完成了！

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bafecd4f846~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

代码中用到了两个 vscode windows 的 api，_showInputBox_ 和 _showInformationMessage_ 更多 API 详见\[5\]

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bafece82471~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

可以看到 API 包含了很多信息，所以可以做的事还可以很多。

## 打包

```cmake
npm install -g vsce  
```

发布前我们可以把开发好的插件打包成 `.vsix` 文件，提供给身边的小伙伴试用一下。

```ada
vsce package  
```

`city-aqi-0.0.1.vsix` 就打包完成了，在插件面板上选择 从 VSIX 安装 或命令行 \[6\] 安装完成后重新加载 VSCode 就可以使用了。

> 过程中可能会提示你先修改 README.md 文件才能打包，简单描述功能即可。

## 发布

详细完善过 README.md 和 CHANGELOG.md 并且删除了一些冗余的文件，你就可以将插件发布到微软的插件市场 Extension Marketplace 供他人下载使用了。

在发布插件之前，首先，获取 token，登录 \[Visual Studio Team Services\]\[7\] 注册并登录账户，在 Security 中找到 Personal access tokens 新建一个 token。回到命令行：

```dsconfig
vsce create-publisher xxxx  
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bafea50cd9e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

> 完成后不需要重新 login ，因为 vsce 已经帮你记录当前的 publisher。

```crystal
$ vsce publish Publishing city-aqi@0.0.1... Successfully published city-aqi@0.0.1!  
```

ALL Done ![🎉](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bb073bf8142~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bb01088e17e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

## 写在最后

笔者几年前一直是 `Sublime Text` 的使用者，修改 jsp、vm、sql等等文本文件，后来出现了 `Atom` 社区也相当活跃，用户同样很多，笔者也曾试用过一段时间。近两年 VSCode 一直是我的主力开发编辑器，虽然它也有缺点，但它在不断精进和完善，微软大厂的维护和更新频率也很及时。

很多大牛们喜爱的 `Vim` 和 `Emcas` 笔者没有用过，甚至连尝试都没有，可能是被过于灵活的配置**吓到了**…

PS，最近知道一个词**宜家理论**，套在上面几个工具上，应该都适用，**合适的才是最好的** 。现在 VSCode 的前端开发环境，可以使用同步插件来进行备份和还原配置。

VSCode 有很多方便的插件，可以帮助我们提高开发效率，以后找机会写一个推荐列表分享出来。

## 扩展阅读

\[1\]https://nodejs.org/en/  
\[2\]https://www.npmjs.com/package/npm  
\[3\]http://yeoman.io/  
\[4\]https://github.com/Microsoft/vscode-generator-code  
\[5\]https://code.visualstudio.com/docs/extensionAPI/vscode-api  
\[6\]https://code.visualstudio.com/docs/editor/extension-gallery#\_install-from-a-vsix  
\[7\]https://docs.microsoft.com/vsts/accounts/create-account-msa-or-work-student  
\[8\]https://code.visualstudio.com/docs/extensions/overview  
\[9\]https://code.visualstudio.com/docs/extensionAPI/vscode-api  
\[10\]https://wx.jdcloud.com/

有兴趣欢迎关注我们的公众号：全栈探索。欢迎交流。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/19/164b1bb019aec86d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)