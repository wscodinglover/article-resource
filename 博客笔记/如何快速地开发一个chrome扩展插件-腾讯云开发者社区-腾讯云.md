说到现如今最流行的浏览器，那么一定是chrome，无论是它的速度，还是它的稳定性，还是它的简洁，都让人爱不释手，此外，更多的人选择它的理由是它有着丰富的扩展插件，这些扩展插件让你的浏览器变得异常强大，让你的浏览器不仅仅是浏览器。

![](https://developer.qcloudimg.com/http-save/yehe-1108709/28fe0a73ca443876f1fbebdc04abdcea.jpg)

### **chrome扩展结构**

chrome的扩展是以.crx结尾的安装包，如果你把它下载下来，并把它重命名为.rar压缩包文件，然后你就可以使用压缩软件对它进行解压，加压之后，就会发现其实chrome的扩展包里面就是一些js，css，html文件，可以说你只要会写前端，那么开发一个chrome扩展插件将会非常容易。

在这些文件中，有一个manifest.json文件，它是扩展的描述文件，定义了扩展的名称和版本号等信息。

```javascript
{ "name": "BrowserActionExtension", "version": "0.0.1", "manifest_version": 2, "browser_action": { "default_title": "That's the tool tip", "default_popup": "popup.html" } }
```

在这个配置文件中，你还可以添加其它属性，只要你的扩展需要的属性，你都可以在这里添加配置。

每一个扩展都有一个被浏览器运行的背景页，此外还有事件页面，背景页面是一直都是激活状态，而事件页面只是在触发事件的时候才会激活，因此为了节省内存和提高浏览器的性能，尽可能选择事件页面。两者通过`persistent`属性进行区分。

```javascript
"background": { "scripts": ["background.js"], "persistent": false/true }
```

当我们的扩展想要访问浏览器当前页面的dom树的时候，我们需要使用内容脚本，这些脚本会在页面刷新的时候执行。

```javascript
"content_scripts": [ { "matches": ["https://*/*", "https://*/*"], "js": ["content.js"] } ]
```

对于扩展的UI界面，我们可以通过browser\_action属性进行配置，通过此属性，我们可以设置扩展的图标，设置点击弹出的页面。

```javascript
"browser_action": { "default_icon": { "19": "icons/19x19.png", "38": "icons/38x38.png" }, "default_title": "That's the tool tip", "default_popup": "popup.html" }
```

除了`browser_action`可以配置扩展图标之外，`page_action`可以配置图标，两者的区别是，`browser_action`总是显示在扩展栏，而`page_action`则是满足一定条件才会显示，比如页面有vue脚本时候才会显示vue调试图标。

```javascript
"page_action": { "default_icon": { "19": "images/icon19.png", "38": "images/icon38.png" }, "default_title": "Google Mail", "default_popup": "popup.html" }
```

chrome被开发人员所喜爱的另一个原因是它提供了非常强大的调试工具栏，而我们的扩展也是可以加入到调试工具栏的。

通过使用`devtools_page`属性，我们就可以将我们的扩展加入到调试工具栏的一个tab中。

```javascript
"devtools_page": "devtools.html"
```

我们在`devtools.html`中只需要添加一个`js`引入语句就可以。

```javascript
<script src="devtools.js"></script>
```

在`devtools.js`文件里，我可以可以放入我们实际的扩展内容。

```javascript
chrome.devtools.panels.create( "MyExtension", "img/icon16.png", "index.html", function() { } );
```

### **扩展能够做什么**

扩展能够做什么主要取决于浏览器为我们提供了哪些API，庆幸的是，chrome为我们提供了足够多好用的API。

![](https://developer.qcloudimg.com/http-save/yehe-1108709/d80b4bb7d0a721bb8d3b8a75286f3069.jpg)

-   我们可以操作用户的书签和浏览记录
-   我们可以控制下载，管理下载内容
-   我们可以监听网络请求，监听事件响应
-   我们可以修改界面样式，可以添加自定义css
-   我们可以在页面添加想要的元素

总之，chrome几乎为我们提供了完整控制浏览器的扩展api，正是有了这些api，才诞生了几十万的扩展插件。

### **扩展的调试**

在我们本地开发好扩展之后，我们可以通过本地浏览器进行调试。

首先，我们需要先进入扩展程序页面，打开开发者模式

然后，我们可以通过选择加载已解压的扩展程序加载我们的扩展。

最后，我们通过在控制台输出调试信息来调试我们的扩展。

### **完整的示例**

manifest.json

```javascript
{ "name": "BrowserExtension", "version": "0.0.1", "manifest_version": 2, "description" : "Description ...", "icons": { "16": "icons/16x16.png", "48": "icons/48x48.png", "128": "icons/128x128.png" }, "omnibox": { "keyword" : "yeah" }, "browser_action": { "default_icon": { "19": "icons/19x19.png", "38": "icons/38x38.png" }, "default_title": "That's the tool tip", "default_popup": "browseraction/popup.html" }, "background": { "scripts": ["background.js"], "persistent": false }, "chrome_url_overrides" : { "newtab": "newtab/newtab.html" }, "content_scripts": [{ "matches": ["http://*/*", "https://*/*"], "js": ["content.js"] }], "devtools_page": "devtools/devtools.html" }
```

background.js

```javascript
// omnibox chrome.omnibox.onInputChanged.addListener(function(text, suggest) { suggest([ {content: "color-divs", description: "Make everything red"} ]); }); chrome.omnibox.onInputEntered.addListener(function(text) { if(text == "color-divs") colorDivs(); }); chrome.extension.onMessage.addListener(function(request, sender, sendResponse) { switch(request.type) { case "color-divs": colorDivs(); break; } return true; }); chrome.extension.onConnect.addListener(function (port) { port.onMessage.addListener(function (message) { switch(port.name) { case "color-divs-port": colorDivs(); break; } }); }); // send a message to the content script var colorDivs = function() { chrome.tabs.getSelected(null, function(tab){ chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"}); // setting a badge chrome.browserAction.setBadgeText({text: "red!"}); }); }
```

popup.html

```javascript
<script type="text/javascript" src="popup.js"></script> <div style="width:200px"> <button id="button">Color all the divs</button> </div>
```

popup.js

```javascript
window.onload = function() { document.getElementById("button").onclick = function() { chrome.extension.sendMessage({ type: "color-divs" }); } }
```

devtools.html

```javascript
window.onload = function() { var port = chrome.extension.connect({ name: "color-divs-port" }); document.getElementById("button").onclick = function() { port.postMessage({ type: "color-divs"}); } }
```

content.js

```javascript
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) { switch(message.type) { case "colors-div": var divs = document.querySelectorAll("div"); if(divs.length === 0) { alert("There are no any divs in the page."); } else { for(var i=0; i&lt;divs.length; i++) { divs[i].style.backgroundColor = message.color; } } break; } });
```

### **总结**

chrome浏览器的扩展开发其实并不难，用到的知识都是基础的js，html，css，我们只需要知道一些和浏览器交互的属性和操作的api，就可以开发出一个属于自己的浏览器扩展。

本文参与 [腾讯云自媒体分享计划](https://cloud.tencent.com/developer/support-plan)，分享自微信公众号。

原始发表：2022-04-18，如有侵权请联系 [cloudcommunity@tencent.com](mailto:cloudcommunity@tencent.com) 删除