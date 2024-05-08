```
<section mpa-from-tpl="t" data-mpa-template="t"><section><mp-common-profile data-pluginname="mpprofile" data-id="MzIyNDU2NTc5Mw==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatLLr9icXoiaicWVpP2qs2evQ1IS2yISdyzBa9szaVKQ3P6j1ibibQhpyj86YiaBbmSAOCEscXII8rQe11wQ/300?wx_fmt=png&amp;wxfrom=19" data-nickname="Nodejs技术栈" data-alias="NodejsRoadmap" data-signature="聚集所有 Nodejs 爱好者，共建互帮互助的 Nodejs 技术栈交流平台" data-from="2" data-origin_num="134" data-is_biz_ban="0" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><section mpa-from-tpl="t"><span data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkmode-color="rgb(136, 136, 136)" data-darkmode-original-color="rgb(136, 136, 136)" data-darkreader-inline-color="">点击上方&nbsp;</span><span data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkmode-color="rgb(136, 136, 136)" data-darkmode-original-color="rgb(136, 136, 136)"><span data-darkreader-inline-color="">Nodejs技术栈</span></span><span data-darkmode-bgcolor="rgb(36, 36, 36)" data-darkmode-original-bgcolor="rgb(255, 255, 255)" data-darkmode-color="rgb(136, 136, 136)" data-darkmode-original-color="rgb(136, 136, 136)" data-darkreader-inline-color="">，关注公众号</span></section><p data-darkreader-inline-color=""><span data-darkreader-inline-color="">回复</span><span><span data-darkreader-inline-color="">加群</span></span><span data-darkreader-inline-color="">，加入Nodejs技术栈交流群</span></p></section><section data-mpa-template="t" mpa-from-tpl="t" data-darkreader-inline-color=""><br></section>
```

> 原文链接: https://juejin.cn/post/7320949203542409231  
> 作者：不要秃头啊

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfONW2j57pdX26QFV6zjNDdDXibjOB8OxrfIwJqGwSNuHd7RBx8JQZ1fLg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  

## 一、前言

最近在 GitHub 上发现了一个非常有意思的项目：GitHub链接<sup>1</sup>。

该作者巧妙地结合 `GPT` 和 `RPA` 技术，打造了一个自动投简历助手。这是原作者分享的效果展示视频：B站视频链接<sup>2</sup>。

然而，由于原项目存在以下问题：

-   代码使用 **Python** 编写，对于前端开发者不够友好。
    
-   运行该项目需要充值 **OpenAI** 账户，而且只支持使用国外的信用卡，国内用户想充钱都没地。
    
-   运行该项目还需要配置代理，对一些用户而言可能不太友好。
    

折腾无果，遂决定使用 **Node.js** 重新实现该项目，并且完全免费、一键运行，无需设置代理：GitHub项目地址<sup>3</sup>。

在这个寒冷的招聘季，这个脚本能为您提供一些帮助，为您带来一些温暖。如果您觉得这个项目有价值，希望您能帮忙点个 star<sup>4</sup>，将不胜感激。

## 二、整体思路

首先，我们会使用 selenium-webdriver<sup>5</sup> 来模拟用户行为，该库是一个强大的自动化测试工具。它能够通过编程方式控制浏览器交互，通常用于自动化测试、网页抓取以及模拟用户交互等任务。

1.  用 selenium-webdriver<sup>5</sup> 模拟用户打开浏览器窗口，并导航至直聘网的主页。
    
2.  等待页面加载完成，找到登录按钮的 `DOM` 节点，模拟用户点击触发登录，等待用户扫码操作。
    
3.  在用户成功扫码登录后，进入招聘信息列表页面。
    
4.  遍历招聘信息列表，对每一项进行以下操作：
    

-   点击招聘信息，找到该项招聘信息的职位描述信息
    
-   结合上传的简历信息与招聘信息传递给 `GPT`，等待 `GPT` 的响应
    
-   在 `GPT` 响应后，点击“立即沟通”按钮，进入沟通聊天界面
    
-   在聊天界面中找到输入框，将 `GPT` 返回的信息填入聊天框，并触发发送事件
    
-   返回招聘信息列表页面，点击下一项招聘信息
    
-   重复上述步骤，遍历下一项招聘信息的职位描述信息
    

## 三、具体实现

### 3.1、获取免费的 API Key 并初始化 OpenAI 客户端

做过 GPT 开发的应该知道，调用 GPT 的接口是要付费的，而且充值过程异常繁琐，需要使用境外银行卡。

为了简化这个过程，我在 GitCode 上找到了一个提供免费 API\_KEY 的项目<sup>6</sup>，只需使用 GitHub 账户登录即可轻松领取。

这样你就可以用免费的 `API_KEY` 来初始化 OpenAI 客户端。

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;初始化OpenAI客户端</span><br><span data-darkreader-inline-color="">const</span>&nbsp;openai&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;OpenAI({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;代理地址，这样国内用户就可以访问了</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">baseURL</span>:&nbsp;<span data-darkreader-inline-color="">"https://api.chatanywhere.com.cn"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">apiKey</span>:&nbsp;<span data-darkreader-inline-color="">"你的apiKey"</span>,<br>});<br></code>
```

### 3.2、模拟用户打开浏览器并前往主页

在这一步中，我们要实现的是打开浏览器并导航至指定的 URL。具体操作就是调用 selenium-webdriver<sup>5</sup> 的 API，直接上代码：

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;Builder,&nbsp;By,&nbsp;until&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"selenium-webdriver"</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;chrome&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">"selenium-webdriver/chrome"</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;全局&nbsp;WebDriver&nbsp;实例</span><br><span data-darkreader-inline-color="">let</span>&nbsp;driver;<br><br><span data-darkreader-inline-color="">//&nbsp;使用指定的选项打开浏览器</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;openBrowserWithOptions(url,&nbsp;browser)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;options&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;chrome.Options();<br>&nbsp;&nbsp;options.addArguments(<span data-darkreader-inline-color="">"--detach"</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(browser&nbsp;===&nbsp;<span data-darkreader-inline-color="">"chrome"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;初始化一个谷歌浏览器客户端</span><br>&nbsp;&nbsp;&nbsp;&nbsp;driver&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Builder()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.forBrowser(<span data-darkreader-inline-color="">"chrome"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.setChromeOptions(options)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.build();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;全屏打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.manage().window().maximize();<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Error(<span data-darkreader-inline-color="">"不支持的浏览器类型"</span>);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.get(url);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;等待直到页面包含登录按钮dom</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;loginDom&nbsp;=&nbsp;By.xpath(<span data-darkreader-inline-color="">"//*[@id='header']/section[1]/section[3]/section/a"</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(until.elementLocated(loginDom),&nbsp;<span data-darkreader-inline-color="">10000</span>);<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;openBrowserWithOptions(url,&nbsp;browserType);<br><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;url&nbsp;=<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"https://www.zhipin.com/web/geek/job-recommend?ka=header-job-recommend"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;browserType&nbsp;=&nbsp;<span data-darkreader-inline-color="">"chrome"</span>;<br><br>main(url,&nbsp;browserType);<br></code>
```

### 3.3、找到登录按钮的DOM节点并点击

这一步中我们需要找到 **登录按钮** 的 DOM 节点，然后模拟点击登录。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;省略上一步的代码</span><br><br><span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;logIn()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;loginButton&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(<br>&nbsp;&nbsp;&nbsp;&nbsp;By.xpath(<span data-darkreader-inline-color="">"//*[@id='header']/section[1]/section[3]/section/a"</span>)<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;loginButton.click();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;等待微信登录按钮出现</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;xpathLocatorWechatLogin&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"//*[@id='wrap']/section/section[2]/section[2]/section[2]/section[1]/section[4]/a"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(<br>&nbsp;&nbsp;&nbsp;&nbsp;until.elementLocated(By.xpath(xpathLocatorWechatLogin)),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">10000</span><br>&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;wechatButton&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(<br>&nbsp;&nbsp;&nbsp;&nbsp;By.xpath(<span data-darkreader-inline-color="">"//*[@id='wrap']/section/section[2]/section[2]/section[2]/section[1]/section[4]/a"</span>)<br>&nbsp;&nbsp;);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;选择微信扫码登录</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;wechatButton.click();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;xpathLocatorWechatLogo&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"//*[@id='wrap']/section/section[2]/section[2]/section[1]/section[2]/section[1]/img"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(<br>&nbsp;&nbsp;&nbsp;&nbsp;until.elementLocated(By.xpath(xpathLocatorWechatLogo)),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">10000</span><br>&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;等待用户扫码，登录成功</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;xpathLocatorLoginSuccess&nbsp;=&nbsp;<span data-darkreader-inline-color="">"//*[@id='header']/section[1]/section[3]/ul/li[2]/a"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(<br>&nbsp;&nbsp;&nbsp;&nbsp;until.elementLocated(By.xpath(xpathLocatorLoginSuccess)),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">60000</span><br>&nbsp;&nbsp;);<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br>+&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;logIn();<br><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

### 3.4、遍历招聘信息列表

登录成功后进入到招聘信息列表页面，这一步中我们需要遍历招聘信息并依次点击，找到每一项招聘信息的职位描述信息，如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;省略上一步的代码</span><br><br><span data-darkreader-inline-color="">//&nbsp;根据索引获取职位描述</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;getJobDescriptionByIndex(index)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jobSelector&nbsp;=&nbsp;<span data-darkreader-inline-color="">`//*[@id='wrap']/section[2]/section[2]/section/section/section[1]/ul/li[<span data-darkreader-inline-color="">${index}</span>]`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jobElement&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(By.xpath(jobSelector));<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击招聘信息列表中的项</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;jobElement.click();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;找到描述信息节点并获取文字</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;descriptionSelector&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"//*[@id='wrap']/section[2]/section[2]/section/section/section[2]/section/section[2]/p"</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;until.elementLocated(By.xpath(descriptionSelector)),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">10000</span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jobDescriptionElement&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By.xpath(descriptionSelector)<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;jobDescriptionElement.getText();<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">`在索引&nbsp;<span data-darkreader-inline-color="">${index}</span>&nbsp;处找不到工作。`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">null</span>;<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始的索引</span><br>+&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;jobIndex&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>;<br><br>+&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(<span data-darkreader-inline-color="">true</span>)&nbsp;{<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取对应下标的职位描述</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;jobDescription&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;getJobDescriptionByIndex(jobIndex);<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">`职位描述信息/n：<span data-darkreader-inline-color="">${jobDescription}</span>`</span>);<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(jobDescription)&nbsp;{<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobIndex&nbsp;+=&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

接着结合上传的简历信息与招聘信息传递给 `GPT`，等待 `GPT` 的响应：

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;省略上一步的代码</span><br><br><span data-darkreader-inline-color="">//&nbsp;读取简历信息</span><br><span data-darkreader-inline-color="">const</span>&nbsp;getResumeInfo&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;fs.readFile(<span data-darkreader-inline-color="">"./简历基本信息.txt"</span>,&nbsp;<span data-darkreader-inline-color="">"utf8"</span>,&nbsp;<span data-darkreader-inline-color="">(<span data-darkreader-inline-color="">err,&nbsp;data</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(err)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">"读取文件时出错:"</span>,&nbsp;err);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出文件内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;data;<br>&nbsp;&nbsp;});<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;与GPT进行聊天的函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;chat(jobDescription)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取简历信息</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;resumeInfo&nbsp;=&nbsp;getResumeInfo();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;askMessage&nbsp;=&nbsp;<span data-darkreader-inline-color="">`你好，这是我的简历：<span data-darkreader-inline-color="">${resumeInfo}</span>，这是我所应聘公司的要求：<span data-darkreader-inline-color="">${jobDescription}</span>。我希望您能帮我直接给HR写一个礼貌专业的求职新消息，要求能够用专业的语言将简历中的技能结合应聘工作的描述，来阐述自己的优势，尽最大可能打动招聘者。并且请您始终使用中文来进行消息的编写,开头是招聘负责人。这是一封完整的求职信，不要包含求职信内容以外的东西，例如“根据您上传的求职要求和个人简历，我来帮您起草一封求职邮件：”这一类的内容，以便于我直接自动化复制粘贴发送，字数控制在80字左右为宜`</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;completion&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;openai.chat.completions.create({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">messages</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">role</span>:&nbsp;<span data-darkreader-inline-color="">"system"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;askMessage,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">model</span>:&nbsp;<span data-darkreader-inline-color="">"gpt-3.5-turbo"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取gpt返回的信息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;formattedMessage&nbsp;=&nbsp;completion.choices[<span data-darkreader-inline-color="">0</span>].message.content.replace(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/\n/g</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"&nbsp;"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;formattedMessage;<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`gpt返回时发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;errorResponse&nbsp;=&nbsp;JSON.stringify({&nbsp;<span data-darkreader-inline-color="">error</span>:&nbsp;String(error)&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;errorResponse;<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始的索引</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(<span data-darkreader-inline-color="">true</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取对应下标的职位描述</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(jobDescription)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;发送描述到聊天并打印响应</span><br>&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;response&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chat(jobDescription);<br>&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">"gpt给的回复"</span>,&nbsp;response);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobIndex&nbsp;+=&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

GPT 响应完成后，找到 **立即沟通按钮** 并模拟点击，此时进入沟通聊天界面，如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;省略上一步的代码</span><br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始的索引</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(<span data-darkreader-inline-color="">true</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取对应下标的职位描述</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(jobDescription)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;发送描述到聊天并打印响应</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击沟通按钮</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;contactButton&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By.xpath(<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"//*[@id='wrap']/section[2]/section[2]/section/section/section[2]/section/section[1]/section[2]/a[2]"</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;contactButton.click();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobIndex&nbsp;+=&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

此时进入到聊天界面，将 GPT 的返回信息填入到输入框中，触发发送事件。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
<span data-lazy-bgimg="https://mmbiz.qpic.cn/sz_mmbiz_png/YBFV3Da0NwvjDWzqyOh9kBic4yZvviadfOVH2auIGrCnWcIeu9jJcNlWFiauXUmHQNXTchXfJ8yzicXx2ic5LKEml0Q/640?wx_fmt=png"></span><code data-darkreader-inline-bgimage=""><span data-darkreader-inline-color="">//&nbsp;省略上一步的代码</span><br><br><span data-darkreader-inline-color="">//&nbsp;发送响应到聊天框</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;sendResponseToChatBox(driver,&nbsp;response)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;请找到聊天输入框</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;chatBox&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.findElement(By.xpath(<span data-darkreader-inline-color="">"//*[@id='chat-input']"</span>));<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;清除输入框中可能存在的任何文本</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chatBox.clear();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将响应粘贴到输入框</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chatBox.sendKeys(response);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;sleep(<span data-darkreader-inline-color="">1000</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;模拟按下回车键来发送消息</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chatBox.sendKeys(Key.RETURN);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;sleep(<span data-darkreader-inline-color="">2000</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;模拟等待2秒</span><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发送响应到聊天框时发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;主函数</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;main(url,&nbsp;browserType)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;打开浏览器</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击登录按钮，并等待登录成功</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;开始的索引</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">while</span>&nbsp;(<span data-darkreader-inline-color="">true</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取对应下标的职位描述</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(jobDescription)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;发送描述到聊天并打印响应</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;点击沟通按钮</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;等待回复框出现</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;chatBox&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.wait(<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;until.elementLocated(By.xpath(<span data-darkreader-inline-color="">"//*[@id='chat-input']"</span>)),<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">10000</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;调用函数发送响应</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;sendResponseToChatBox(driver,&nbsp;response);<br><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回到上一个页面</span><br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;driver.navigate().back();<br>+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;sleep(<span data-darkreader-inline-color="">2000</span>);&nbsp;<span data-darkreader-inline-color="">//&nbsp;模拟等待3秒</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobIndex&nbsp;+=&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.error(<span data-darkreader-inline-color="">`发生错误:&nbsp;<span data-darkreader-inline-color="">${error}</span>`</span>);<br>&nbsp;&nbsp;}<br>}<br></code>
```

发送完成后返回招聘列表页面，以此往复。

## 四、最后

该项目只是简单的将简历信息结合职位信息发送给 GPT，然后用 GPT 的回复发送给招聘者，实际上并没有什么难度，意在抛砖引玉。

这里其实还有更优雅的做法，比如将个人简历传给 GPT，让 GPT 去提炼有效信息（原作者就是这么做的）。但由于 GPT-API-free 项目<sup>7</sup> 并没有提供 assistant<sup>8</sup> 服务，实现这一点需要付费，有充值渠道的朋友可以尝试一下。

此外，对于有兴趣的朋友，还可以进一步深挖，例如：

-   根据职位详情进行分词权重分析，生成岗位热点词汇云图，帮助分析简历匹配度
    
-   自动过滤掉最近未活跃的 Boss 发布的信息，以免浪费每天的 100 次机会
    
-   设置过滤薪资范围，防止无效投递
    
-   自动检测上下文，排除【外包、外派、驻场】等字眼的职位信息
    
-   ...
    

> 最后，这里重申原作者的观点：
> 
> 希望不要有人拿着我的脚本割韭菜，都已经被逼到用这种脚本投简历的地步了，还有啥油水可去榨，当个人吧。

参考资料

\[1\]

GitHub链接:https://github.com/Frrrrrrrrank/auto\_job\_\_find\_\_chatgpt\_\_rpa

\[2\]

B站视频链接:https://www.bilibili.com/video/BV1UC4y1N78v/?share\_source=copy\_web&vd\_source=b2608434484091fcc64d4eb85233122d

\[3\]

GitHub项目地址:https://github.com/noBaldAaa/find-job

\[4\]

star:https://github.com/noBaldAaa/find-job

\[5\]

selenium-webdriver:https://www.npmjs.com/package/selenium-webdriver

\[6\]

selenium-webdriver:https://www.npmjs.com/package/selenium-webdriver

\[7\]

GitCode 上找到了一个提供免费 API\_KEY 的项目:https://gitcode.com/chatanywhere/gpt\_api\_free/overview

\[8\]

selenium-webdriver:https://www.npmjs.com/package/selenium-webdriver

\[9\]

GPT-API-free 项目:https://gitcode.com/chatanywhere/gpt\_api\_free/overview

\[10\]

assistant:https://platform.openai.com/docs/assistants/overview

\- END \-

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**[新开了 Node 8 群](http://mp.weixin.qq.com/s?__biz=MzIyNDU2NTc5Mw==&mid=2247515124&idx=1&sn=bb3171170027f9967e2619c622bc8858&chksm=e80ff4badf787dac435ec3fb98618d99200d7bcb2b6d2352e4d2346de8c2071e97e2feec37ce&scene=21#wechat_redirect)， 想要入群的朋友可长按下方二维码添加【五月君】小助手微信备注 “Node” 邀请入群。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)