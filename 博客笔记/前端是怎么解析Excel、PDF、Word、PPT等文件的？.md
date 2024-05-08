作为一名开发者，大家在开发过程中是不是经常遇到各种各样的文件，比如xlsx、word、ppt等办公类型的文件格式，还有pdf这种便携式的打印格式文件等。

但是通常情况下我们都是使用一个相关的第三方库，比如用 **「sheet.js」** 来解析xlsx，**「mammoth.js」** 来解析wrod，**「pptxjs」** 来解析ppt，如果这些库你不知道的话，你可以好好研究一下他们的文档，照着文档满足你的业务需求是肯定没问题的。

但是本文并不尝试跟大家过一遍这些库是如何使用的，因为笔者认为做一个API调用工程师意义并不大，本文的目的是跟大家分享这些文件的**「本质」**，从而能够在平常的开发中即便遇到棘手的问题，大家也能够从容的解决，而不会被第三方库所绑架。

**「如果你对以下问题有兴趣，那么仔细阅读本篇文章，你一定会有收获！」**

1.  办公文件发展史？
    
2.  前端为什么可以解析这些文件？
    
3.  第三库是怎么解析这些文件的？原理是什么？
    
4.  PDF是如何保持布局的稳定性的？
    

准备好我们开始发车！**「let\`s get start it!」**

## 二、办公文件的本质

### 历史

中国的 **「蔡伦」** 在公元105年发明了造纸术，它让人们进入了一个崭新的时代。从此纸张如一头猛兽闯入千家万户，人们可以在纸张上**「记录」**、**「编写」**、**「传播」**信息。

技术的突破往往会催生出新的需求，这种在纸张上记录、编写、和传播信息的需要渐渐成为人们生活不可或缺的一部分，历史、文学、科学、艺术、日常事物都需要依赖于这种技术，因为承载了信息，纸张慢慢被人们称为**「文件」**，无论从哪个角度来看，**「文件」**的出现都是人类文明史上浓墨重彩的一笔。

纸张统治了世界将近2000年，或许未来在相当长的时间内它还将一直存在，但是20世纪末，互联网的出现让纸质的文件地位出现了动摇，甚至大有退出历史舞台的趋势。人们发现将一切的**「纸张文件」**电子化会有令人意想不到的**「收益」**。电子文件传播更迅速、编写更方便、记录更便捷。尤其是个人PC和移动终端的出现让人们随时随地可以记录、编写、传播信息。

最早推动这一过程的是王安电脑公司在**「1971年」**推出**「WPS文字处理机-Wang 1200打印机」**，之后王安WPS成为美国每间办公室的必备。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

download.jfif

后续又有诸多的公司参与这场世纪之战，这个过程诞生了许许多多的办公设备，他们有软件也有硬件，它们的出现加速了这场文件数字化的革命。微软办公软件是这场战役的胜利者，在全球市场上一直占据主导地位。Microsoft Office套件是业界最受欢迎和广泛使用的办公软件套装之一。该套件包括诸如**「Word」**、**「Excel」**、**「PowerPoint」**等应用程序，它们在文档处理、电子表格和演示方面提供了强大的功能。

遗憾的是历史只记录胜利者，如果你希望了解更多办公软件历史，可以读读这篇文章

### 标准

大家是否思考过一个问题，为什么你创建了一个**「Word文档」**之后，既可以使用微软在Windows电脑中预装的Office软件打开，也可以使用金山软件的WPS打开。实际上市面上的办公软件其实非常的多，比如：**「Google Workspace (以前称为 G Suite):」**、 **「LibreOffice:」**、 **「Apache OpenOffice:」**、 **「Apple iWork:」**、 **「Zoho Office Suite」** 。

不知道你是否好奇，为什么对于同一份word文档，这些不同厂商的软件无一例外的都可以打开进行阅读和编辑。

这是为什么呢？

原来他们都遵循同一套标准，这套标准叫做`Microsoft Office Open XML 标准`，用于描述和存储电子文档（如文本、电子表格和演示文稿）。这个标准是由 **「Ecma International」**（欧洲计算机制造商协会）管理和维护的，这套标准文件，我放在这里，学有余力的同学可以阅读一下。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

这套标准定义了各种各样的组件例如：段落、表格、图片、布局等如何使用xml语言来进行描述，因此各个办公软件厂商只要遵循这套规范就可以解析对应的Word文件，当用户保存文件时它们也都会遵循这套规范去生成一份Word文件以便用户使用其他软件可以正常使用，就这样大家遵纪守法，其乐融融。

`那么我们的办公文件的本质是什么呢？我们继续来看！`

### 压缩包

如果是经常使用办公软件的同学有这样的体会，当我使用LibreOffice创建一个Word文档时会生成一个.odt的文件，如下图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

当我使用Microsoft Office创建一个Word文档时，会生成一个.doc或者.docx的文件。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

或许其他的软件还有其他的名字，如果你有兴趣可以试一下，不管这个后缀是什么名字，甚至你自己随便改个后缀，只要它是遵循上面我们提到的**「标准」**生成的，它都可以被所有主流的办公软件识别和正常使用。

想必计算机专业的同学或许都知道**「后缀名」**其实就是一个标识而已，帮助不同的软件去匹配对应的logo标识而已。而这个文件的本质其实就是个**「压缩包」**。而当你把这个压缩包解析之后，你就会得到一个文件夹里面全部都是xml和相关的配置文件。

你可以选择把你的word文档后缀改成`.zip`然后用一个解压缩工具解压就可以得到一个类似下面的文件夹（或者不改后缀，直接选择解压一个.doc格式的文件也行），你都会得到一个类似下面的文件夹：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

每个文件夹下面几乎都是清一色的.xml文件和少数的配置文件。不止word文档是如此、excel文件、ppt文件都可以按照上面的操作如法炮制，都可以得到一个文件夹，但遗憾的是pdf不是，我们后面再揭晓pdf的本质。

> ❝
> 
> **「小结」**：**「通过上面你的内容我们知道主流的三个办公文件excel、word、ppt本质上都是一个包含多个文件目录且每个目录中含有一些.xml文件的压缩包而已。另外我补充一下他们的压缩算法通常都是zip，如果你对压缩算法感兴趣，推荐你看这篇文章」**
> 
> ❞

### XML

如果是计算机专业的同学，对xml或许应该比较熟悉，但是我依然嘴碎一下，照顾下非计同学。

xml本质上就是一个文本文件，只不过文件后缀是`.xml`而已。它是一种用于标记电子文档结构的可扩展标记语言，被设计用于在信息传递和存储方面提供统一的方法，特别适用于互联网上的数据交换。它大概的样子像下面这样：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;?xml&nbsp;version="1.0"&nbsp;encoding="UTF-8"&nbsp;standalone="yes"?&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>w:jc</span>&nbsp;<span data-darkreader-inline-color="">w:val</span>=<span data-darkreader-inline-color="">"center"</span>/&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>w:rPr</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>w:rPr</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>w:pPr</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>w:r</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>w:rPr</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>w:rPr</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>w:t</span>&gt;</span>Hello<span data-darkreader-inline-color="">&lt;/<span>w:t</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>w:r</span>&gt;</span><br></code>
```

解压后的word就有类似下面的xml文件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

实际上前端同学所熟悉的html就是一种特殊的xml，同属于标记语言，所以前端同学看到xml会有一种奇怪的熟悉感，更重要的是，在浏览器中是可以直接解析xml的，所以在浏览器端我们就不用通过字符串的方式自己实现解析的算法。解析的例子如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>html</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>head</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>meta</span>&nbsp;<span data-darkreader-inline-color="">charset</span>=<span data-darkreader-inline-color="">"UTF-8"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>meta</span>&nbsp;<span data-darkreader-inline-color="">name</span>=<span data-darkreader-inline-color="">"viewport"</span>&nbsp;<span data-darkreader-inline-color="">content</span>=<span data-darkreader-inline-color="">"width=device-width,&nbsp;initial-scale=1.0"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>title</span>&gt;</span>XML&nbsp;解析示例<span data-darkreader-inline-color="">&lt;/<span>title</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>head</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>body</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;<span>h1</span>&gt;</span>XML&nbsp;解析示例<span data-darkreader-inline-color="">&lt;/<span>h1</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;<span>script</span>&gt;</span><span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;假设有以下&nbsp;XML&nbsp;数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;xmlData&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;employees&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;employee&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;id&gt;1&lt;/id&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;name&gt;John&nbsp;Doe&lt;/name&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;position&gt;Developer&lt;/position&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/employee&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;employee&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;id&gt;2&lt;/id&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;name&gt;Jane&nbsp;Smith&lt;/name&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;position&gt;Designer&lt;/position&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/employee&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/employees&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;`</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;创建&nbsp;DOMParser&nbsp;对象</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;parser&nbsp;=&nbsp;<span>new</span>&nbsp;DOMParser();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用&nbsp;DOMParser&nbsp;解析&nbsp;XML&nbsp;字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;xmlDoc&nbsp;=&nbsp;parser.parseFromString(xmlData,&nbsp;<span data-darkreader-inline-color="">"text/xml"</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取&nbsp;XML&nbsp;中的元素</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;employees&nbsp;=&nbsp;xmlDoc.getElementsByTagName(<span data-darkreader-inline-color="">"employee"</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;遍历元素并输出内容</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(<span>var</span>&nbsp;i&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;i&nbsp;&lt;&nbsp;employees.length;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;id&nbsp;=&nbsp;employees[i].getElementsByTagName(<span data-darkreader-inline-color="">"id"</span>)[<span data-darkreader-inline-color="">0</span>].textContent;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;name&nbsp;=&nbsp;employees[i].getElementsByTagName(<span data-darkreader-inline-color="">"name"</span>)[<span data-darkreader-inline-color="">0</span>].textContent;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>var</span>&nbsp;position&nbsp;=&nbsp;employees[i].getElementsByTagName(<span data-darkreader-inline-color="">"position"</span>)[<span data-darkreader-inline-color="">0</span>].textContent;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Employee&nbsp;ID:&nbsp;"</span>&nbsp;+&nbsp;id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Name:&nbsp;"</span>&nbsp;+&nbsp;name);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Position:&nbsp;"</span>&nbsp;+&nbsp;position);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"--------------------"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br></span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;/<span>body</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>html</span>&gt;</span><br><br></code>
```

可以看到只要给前端一份xml文件我们就可以通过**「DOM相关的API」**拿到任何我们想要的东西。

## 解析

那么为什么前端可以解析excel、word、ppt等文件呢？

原因其实很简单，因为解析需要满足的条件前端都具备。首先浏览器可以读取磁盘的文件，如果想要了解浏览器如何读取磁盘的细节，我之前写过这篇文章欢迎你的阅读。

此外浏览器其实原生也提供了如何解压和压缩文件的API，但是浏览器提供的这个API可能使用上并不是非常的友好，需要对流有一定的理解才能得心应手。因此我推荐大家使用JSZip，它可以很方便的压缩和解压缩一个文件，并且在浏览器和Nodejs这两个运行时中都支持。接下来我们来看一下它的使用方法，以下是一个压缩和解压缩的还原字符串的案例。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!DOCTYPE&nbsp;<span>html</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;<span>html</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"en"</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>head</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>meta</span>&nbsp;<span data-darkreader-inline-color="">charset</span>=<span data-darkreader-inline-color="">"UTF-8"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>meta</span>&nbsp;<span data-darkreader-inline-color="">name</span>=<span data-darkreader-inline-color="">"viewport"</span>&nbsp;<span data-darkreader-inline-color="">content</span>=<span data-darkreader-inline-color="">"width=device-width,&nbsp;initial-scale=1.0"</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>title</span>&gt;</span>JSZip&nbsp;Demo<span data-darkreader-inline-color="">&lt;/<span>title</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>script</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>head</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>body</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span>script</span>&gt;</span><span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;压缩字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">compressString</span>(<span>originalString</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Promise</span>(<span>(<span>resolve,&nbsp;reject</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;zip&nbsp;=&nbsp;<span>new</span>&nbsp;JSZip();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zip.file(<span data-darkreader-inline-color="">"compressed.txt"</span>,&nbsp;originalString);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zip<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.generateAsync({&nbsp;<span>type</span>:&nbsp;<span data-darkreader-inline-color="">"blob"</span>&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>compressedBlob</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;reader&nbsp;=&nbsp;<span>new</span>&nbsp;FileReader();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reader.onload&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;resolve(reader.result);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reader.readAsText(compressedBlob);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(reject);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;解压缩字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span>function</span>&nbsp;<span data-darkreader-inline-color="">decompressString</span>(<span>compressedString</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Promise</span>(<span>(<span>resolve,&nbsp;reject</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;zip&nbsp;=&nbsp;<span>new</span>&nbsp;JSZip();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zip<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.loadAsync(compressedString)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>zipFile</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;compressedData&nbsp;=&nbsp;zipFile.file(<span data-darkreader-inline-color="">"compressed.txt"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;debugger;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(compressedData)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;compressedData.async(<span data-darkreader-inline-color="">"string"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span>else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reject(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>new</span>&nbsp;<span data-darkreader-inline-color="">Error</span>(<span data-darkreader-inline-color="">"Unable&nbsp;to&nbsp;find&nbsp;compressed&nbsp;data&nbsp;in&nbsp;the&nbsp;zip&nbsp;file."</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(resolve)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(reject);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;示例</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;originalText&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"Hello,&nbsp;this&nbsp;is&nbsp;a&nbsp;sample&nbsp;text&nbsp;for&nbsp;compression&nbsp;and&nbsp;decompression&nbsp;with&nbsp;JSZip."</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Original&nbsp;Text:"</span>,&nbsp;originalText);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;压缩字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compressString(originalText)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>compressedData</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Compressed&nbsp;Data:"</span>,&nbsp;compressedData);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;解压字符串</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decompressString(compressedData)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>decompressedText</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Decompressed&nbsp;Text:"</span>,&nbsp;decompressedText);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(<span>(<span>error</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">"Error&nbsp;during&nbsp;decompression:"</span>,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(<span>(<span>error</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">"Error&nbsp;during&nbsp;compression:"</span>,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color="">&lt;/<span>script</span>&gt;</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span>body</span>&gt;</span><br><span data-darkreader-inline-color="">&lt;/<span>html</span>&gt;</span><br><br></code>
```

当我们的办公文件（excel、word、ppt）解压缩之后就变成一堆xml文件了，然后在浏览器端可以通过前面小节提到的解析过程进行解析，可以把数据提取出来生成**「json」**，也可以创建为**「DOM」**，这个就由开发者自己选择了。

因此主流的第三方库解析路径如下图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Screen Shot 2023-12-16 at 11.46.08 AM.png

当然这个解析过程其实并不难，关键在于这些第三方库将依据`Microsoft Office Open XML 标准`提取信息的过程才是他们的亮点，因为篇幅有限，本篇文章就不涉及他们的源码解析了，有兴趣的同学可以去看看！

> ❝
> 
> **「小结：现在相信读者知道为什么前端有能力解析三大办公文件，以及主流库的解析方法了吧！」**
> 
> ❞

## 三、PDF

前面的文章都是提到的办公文件，也就是excel、word、ppt这些文件，但我们一字未提**「PDF」**。

那么PDF和这些文件有何不同呢？我们先从它为什么被大家使用谈起，大家可能有这样的体会，当你使用word文档软件写好了一篇论文之后，就会拿到打印店去打印，结果用打印店的软件一打开，发现辛辛苦苦排版好的内容全都乱了，虽然也没有特别丑，但是和你之前排版的完全不一样。

这个时候你的好室友就会建议你先将这份word文档转换为PDF格式，然后再去打印，结果会发现PDF无论在哪里打开，它几乎都是一模一样的，排版和导出时候的样子都是一样的。

### 本质

PDF对应的就是电子世界的打印纸张，它拥有**「不可编辑」**、**「占用空间小」**、**「稳定性强」**、**「可加密」**等特点，它由**「Adobe」**于1993年首次提出，旨在实现跨平台和可靠性的文档显示。PDF文件可以包含文本、图形、图像和其他多媒体元素，并以一种独立于操作系统和硬件的方式呈现。

我们前面说到办公软件的本质其实是压缩包，那么PDF是压缩包么？

虽然PDF存储空间小，感觉很像个压缩包，但其实还真不是，PDF的文件可以直接使用文本编辑器强行打开，打开之后可以看到一些似乎有意义的数据。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

可以看到第一行有一个PDF-1.6，它其实表明了应该使用pdf1.6版本的规范去解析这份文档，下面还有一些数字信息描述的其实是**「坐标」**相关的信息。

你也可以新建一个文本，把下面这段字符串**「粘贴」**其中，把后缀名改成\*\*.pdf\*\*，就会惊奇的发现你居然手写了一个PDF出来。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><br>%PDF-1.1<br>%¥±ë<br><br>1 0 obj<br>  &lt;&lt; /Type /Catalog<br>     /Pages 2 0 R<br>  &gt;&gt;<br>endobj<br><br>2 0 obj<br>  &lt;&lt; /Type /Pages<br>     /Kids [3 0 R]<br>     /Count 1<br>     /MediaBox [0 0 300 144]<br>  &gt;&gt;<br>endobj<br><br>3 0 obj<br>  &lt;&lt;  /Type /Page<br>      /Parent 2 0 R<br>      /Resources<br>       &lt;&lt; /Font<br>           &lt;&lt; /F1<br>               &lt;&lt; /Type /Font<br>                  /Subtype /Type1<br>                  /BaseFont /Times-Roman<br>               &gt;&gt;<br>           &gt;&gt;<br>       &gt;&gt;<br>      /Contents 4 0 R<br>  &gt;&gt;<br>endobj<br><br>4 0 obj<br>  &lt;&lt; /Length 55 &gt;&gt;<br>stream<br>  BT<br>    /F1 18 Tf<br>    0 0 Td<br>    (Hello World) Tj<br>  ET<br>endstream<br>endobj<br><br>xref<br>0 5<br>0000000000 65535 f <br>0000000018 00000 n <br>0000000077 00000 n <br>0000000178 00000 n <br>0000000457 00000 n <br>trailer<br>  &lt;&lt;  /Root 1 0 R<br>      /Size 5<br>  &gt;&gt;<br>startxref<br>565<br>%%EOF<br></code>
```

打开预览如图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

如果把PDF的语言翻译成人话大概是下面这个样子。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">【文字开始】<br>    缩放比例1倍 坐标(1036,572) 【文字定位】<br>    /TT1 12磅 【选择字体】<br>    [ (He) 间距24 (l) 间距-48 (l) 间距-48 (o) ] 【绘制文字】<br>【文字结束】<br>【文字开始】<br>    缩放比例1倍 坐标(1147,572) 【文字定位】<br>    /TT1 12磅 【选择字体】<br>    (空格) 【绘制文字】<br>【文字结束】<br>【文字开始】<br>    缩放比例1倍 坐标(1060,572) 【文字定位】<br>    /TT1 12磅 【选择字体】<br>    [ (w) 间距24 (or) 间距-84 (l) 间距-24 (d) ] 【绘制文字】<br>【文字结束】<br></code>
```

可以看到，PDF有一套自己的**「语法规则」**，这套规则描述了一张固定大小的纸张上哪个文字应该放在哪个位置，这个信息是绝对的。如果对比上面的word文档，他们描述信息的方式采用的是**「xml」**，xml只是存储了信息，但是这些信息的具体**「排布方式」**是由各自的软件决定的，我们举个简单的例子方便大家理解。

假设有一个段落存储了`大家好，我是一串文字`这样一串文字：

在word里xml的描述很可能是这样的

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;<span>paragraph</span>&nbsp;<span data-darkreader-inline-color="">font</span>=<span data-darkreader-inline-color="">"14"</span>&nbsp;<span data-darkreader-inline-color="">color</span>=<span data-darkreader-inline-color="">"#000"</span>&gt;</span>大家好，我是一串文字<span data-darkreader-inline-color="">&lt;/<span>paragraph</span>&gt;</span><br></code>
```

这段信息在微软里面可能占**「1」**行，在WPS中很可能占**「2」**行，因为这个xml并没有描述应该占几行这样的信息，所以留给各家软件在排版上的自由度还是比较高的。

但是在pdf中，可能就有以下的描述：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">【文字开始】<br>    颜色#000 坐标(0,0)<br>    字号14【大家好，我是一串文字】<br>【文字结束】<br><br>翻译以下就是：引擎你在画板0，0位置给我画个"大"，在0，1位置给我画个"家"...<br></code>
```

PDF中是描述了文字的布局信息，相当于一个指针告诉解析器应该在哪个位置画一个怎样的符号。

这样绝对的信息让得到这份文件的人可以在一个指定大小的空间每次都画出一模一样的内容来，因此是绝对稳定的。

如果需要实现一个PDF解析器，则需要对PDF使用的这套规则语法有深入的了解，因为这套规则就是一门语言，并且是**「图灵完备」**的，所以要实现能够解析它的引擎，并不比实现一个V8简单多少，幸好几乎现代浏览器都支持解析PDF。并且提供了强大的功能。

我们可以选择使用**「embed」**标签或者**「iframe」**标签来解析PDF。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;<span>embed</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"example.pdf"</span>&nbsp;<span data-darkreader-inline-color="">width</span>=<span data-darkreader-inline-color="">"800px"</span>&nbsp;<span data-darkreader-inline-color="">height</span>=<span data-darkreader-inline-color="">"600px"</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"application/pdf"</span>&gt;</span>&nbsp;<br><span data-darkreader-inline-color="">&lt;!--&nbsp;或&nbsp;--&gt;</span>&nbsp;<br><span data-darkreader-inline-color="">&lt;<span>iframe</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">"example.pdf"</span>&nbsp;<span data-darkreader-inline-color="">width</span>=<span data-darkreader-inline-color="">"800px"</span>&nbsp;<span data-darkreader-inline-color="">height</span>=<span data-darkreader-inline-color="">"600px"</span>&gt;</span><span data-darkreader-inline-color="">&lt;/<span>iframe</span>&gt;</span><br></code>
```

或者如果希望将PDF完全由DOM来渲染，则可以使用**「mozilla」**开源的pdf.js。

> ❝
> 
> 小结：PDF的本质就是一套有含义的指令集合，用来描述一份文档信息绝对位置。
> 
> ❞

## 四、最后的话

这是今年的第24篇文章，也是今年的最后一篇文章，完结撒花🎇！！！

如果读者朋友读到这里有收获，还请帮我点赞支持一下，愿各位大佬在新的一年健健康康，财源滚滚！

创作之路还在继续，衷心感谢你的阅读。

进入我的个人网站，查看更多精彩❤！

## 五、参考资料

https://www.ruanyifeng.com/blog/2007/10/ascii\_unicode\_and\_utf-8.html  
https://www.xjx100.cn/news/423171.html?action=onClick  
https://zhuanlan.zhihu.com/p/573114641