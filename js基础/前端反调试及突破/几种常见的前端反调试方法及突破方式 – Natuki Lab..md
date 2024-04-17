[跳至内容](https://tree.moe/anti-debug-and-solution/#content)

![file](https://tree.moe/wp-content/uploads/2023/07/image-1690554741989.png)  
![:hushed:](https://tree.moe/wp-content/plugins/wp-githuber-md/assets/vendor/emojify/images/hushed.png ":hushed:")前年有段时间沉迷于某H5的大逃杀小游戏~（闲的）~，起初也是中规中矩，后来因为存档丢失，遂开启了修改存档的不归路。  
最近的版本也更新的新的游戏模式和枪械，原本的小破枪再也不能称霸战局了，想再次修改存档时，发现网页也做了诸多反调试限制，通过一番折腾成功突破，那就以此为例总结下几种前端反调试方法及突破方式。

-   [欺负我没有鼠标/键盘？](https://tree.moe/anti-debug-and-solution/#%E6%AC%BA%E8%B4%9F%E6%88%91%E6%B2%A1%E6%9C%89%E9%BC%A0%E6%A0%87%E9%94%AE%E7%9B%98%EF%BC%9F "欺负我没有鼠标/键盘？")
    -   [实现方式](https://tree.moe/anti-debug-and-solution/#%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F "实现方式")
    -   [突破方法](https://tree.moe/anti-debug-and-solution/#%E7%AA%81%E7%A0%B4%E6%96%B9%E6%B3%95 "突破方法")
-   [更近一步，阻碍前进的debugger](https://tree.moe/anti-debug-and-solution/#%E6%9B%B4%E8%BF%91%E4%B8%80%E6%AD%A5%EF%BC%8C%E9%98%BB%E7%A2%8D%E5%89%8D%E8%BF%9B%E7%9A%84debugger "更近一步，阻碍前进的debugger")
    -   [实现方式](https://tree.moe/anti-debug-and-solution/#%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F-2 "实现方式")
    -   [突破方法](https://tree.moe/anti-debug-and-solution/#%E7%AA%81%E7%A0%B4%E6%96%B9%E6%B3%95-2 "突破方法")
-   [时停，但是被感知到了！](https://tree.moe/anti-debug-and-solution/#%E6%97%B6%E5%81%9C%EF%BC%8C%E4%BD%86%E6%98%AF%E8%A2%AB%E6%84%9F%E7%9F%A5%E5%88%B0%E4%BA%86%EF%BC%81 "时停，但是被感知到了！")
    -   [实现方式](https://tree.moe/anti-debug-and-solution/#%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F-3 "实现方式")
    -   [突破方法](https://tree.moe/anti-debug-and-solution/#%E7%AA%81%E7%A0%B4%E6%96%B9%E6%B3%95-3 "突破方法")
    -   [类似反调试实现](https://tree.moe/anti-debug-and-solution/#%E7%B1%BB%E4%BC%BC%E5%8F%8D%E8%B0%83%E8%AF%95%E5%AE%9E%E7%8E%B0 "类似反调试实现")
        -   [内存爆破](https://tree.moe/anti-debug-and-solution/#%E5%86%85%E5%AD%98%E7%88%86%E7%A0%B4 "内存爆破")
-   [参考文章](https://tree.moe/anti-debug-and-solution/#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0 "参考文章")

## 欺负我没有鼠标/键盘？

## 实现方式

主要是对键盘快捷键、鼠标右键的限制，无法直接打开开发者工具，用来欺负一些只使用键盘或者鼠标的人（狗头），在一些禁止复制的文章网站也会遇到，具体代码如下

```javascript
//屏蔽F12 $(document).keydown(function (event) { if (event.keyCode == 123) { if (event.preventDefault) { event.preventDefault(); } else { window.event.returnValue == false; } } }); //屏蔽ctrl+shift+i $(document).keydown(function (event) { if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { if (event.preventDefault) { event.preventDefault(); } else { window.event.returnValue == false; } } }); // 通过添加自定义事件屏蔽鼠标右键 $(document).ready(function () { $(document).bind("contextmenu", function (e) { return false; }); });
```

## 突破方法

解决方法主要有两种：

1.  通过浏览器的菜单找到开发者工具打开，例如Chrome浏览器可以在菜单-更多工具-开发者工具直接打开
2.  新建标签页，先打开开发者工具，再访问相关页面

## 更近一步，阻碍前进的debugger

## 实现方式

当打开开发者工具后，却被不断产生的莫名其妙的debugger断点卡着，在以前还只会禁用所有断点，虽然可以正常浏览，但是也无法继续调试了，要不忘初心啊，我是来改数据的（狗头）。  
![file](https://tree.moe/wp-content/uploads/2023/07/image-1690562543691.png)

这种不断产生debugger断点的反调试方法可以利用递归或者定时器的方式实现，该网站的实现方式如下，将两者结合了起来：

```javascript
// 通过递归反复构造匿名函数利用debugger断点阻止调试 var check = function () { function doCheck(a) { if (('' + a / a)['length'] !== 1 || a % 20 === 0) { (function () { }['constructor']('debugger')()); } else { (function () { }['constructor']('debugger')()); } doCheck(++a); } try { doCheck(0); } catch (err) { } }; check(); // 同时利用定时器定期产生debugger断点 setInterval(function () { check(); }, 2000);
```

## 突破方法

1.  如果只是为了开启开发者工具后也能够正常浏览网站，例如借鉴~Copy~元素的样式，那么直接禁用所有断点即可，但是也无法继续调试  
    ![file](https://tree.moe/wp-content/uploads/2023/07/image-1690560878545.png)
    
2.  可以在断点的右键菜单，单独取消阻止调试的断点，但是有时会对匿名函数产生的断点失效  
    ![file](https://tree.moe/wp-content/uploads/2023/07/image-1690561076180.png)
    
3.  利用Hook阻止调用产生debugger的匿名函数
    
    ```javascript
    Function.prototype.temp_constructor= Function.prototype.constructor; Function.prototype.constructor=function(){ if (arguments && typeof arguments[0]==="string"){ if (arguments[0]==="debugger") return "" } return Function.prototype.temp_constructor.apply(this, arguments); };
    ```
    
4.  对于这个已知名称为check的检测函数，也可以在控制台进行置空，在执行前将其设置为空函数
    

## 时停，但是被感知到了！

有些时候，在跳过第一个断点后，啪的一下很快啊，就是一个弹窗逮住我的调试行为，紧接着刷新，那么我的调试使如何被感知到的呢？  
![file](https://tree.moe/wp-content/uploads/2023/07/image-1690562688280.png)

## 实现方式

利用定时器定期产生debugger断点，在断点前后利用变量`before`和`after`计算时间差，如果相差在2秒后则说明开发者工具被打开，弹出弹窗并刷新页面；不排除某些人拥有单身20年的手速，能够快速跳过断点，则对小时间差进行统计，当存在2次及以上的小时间差，也可以说明打开了开发者工具。

该网站的实现代码如下：

```javascript
function consoleOpenCallback() { alert('关闭调试窗'); window.location.reload(); } var Anti_numtots = 0; (function () { window._windon_handler = setInterval( function() { var before = new Date(); debugger; var after = new Date(); if (after.getTime() - before.getTime() > 100) { if (after.getTime() - before.getTime() > 2000) { consoleOpenCallback(); clearInterval(_windon_handler); }else{ Anti_numtots++; if(Anti_numtots>=2){ consoleOpenCallback(); clearInterval(_windon_handler); } } }else{ Anti_numtots = 0; } }, 1000) })();
```

## 突破方法

这种计算时间差的反调试方法突破方式与上一种是相同的，都是阻止断点暂停或产生。

对于该网站，由于已知存储定时器的对象位置为`window._windon_handler`，因此也可以利用`clearInterval`清除该定时器即可。

## 类似反调试实现

### 内存爆破

通过时间差，在检测到被调试后疯狂创建对象，导致页面卡死

```javascript
setInterval(() => { let startTime = new Date(); debugger; let endTime = new Date(); let isDev = endTime - startTime > 100; let stack = []; if (isDev) { while (true) { stack.push(this); console.log(stack.length, this) } } }, 1000)
```

通常通过忽略该断点暂停以及取反判断标识可以处理，需要具体情况具体分析。

## 参考文章

-   [js无限debugger的原理，以及解决办法](https://blog.csdn.net/weixin_42567622/article/details/122194016 "js无限debugger的原理，以及解决办法")
-   [爬虫（js逆向）调试干扰-处理debugger-调试检测-内存爆破-JS逆向举例（4）](https://blog.csdn.net/weixin_44238683/article/details/118653968 "爬虫（js逆向）调试干扰-处理debugger-调试检测-内存爆破-JS逆向举例（4）")

## 文章导航