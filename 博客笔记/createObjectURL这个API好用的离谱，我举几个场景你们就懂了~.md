> **模拟面试、简历指导、入职指导、项目指导、答疑解惑**可私信找我~已帮助100+名同学完成改造！

## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心~

随着我用 `URL.createObjectURL` 这个 API 越来越多次，越发感觉真的是一个很好用的方法，列举一下我在项目中用到它的场景吧~

## 图片预览

以前我们想要预览图片，只能是上传图片到后端后，获取到url然后赋予给img标签，才能得到回显预览，但是有了`URL.createObjectURL`就不需要这么麻烦了，直接可以在前端就达到预览的效果~

```
<span>&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">input</span>&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"file"</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"fileInput"</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">img</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"preview"</span>&nbsp;<span data-darkreader-inline-color="">src</span>=<span data-darkreader-inline-color="">""</span>&nbsp;<span data-darkreader-inline-color="">alt</span>=<span data-darkreader-inline-color="">"Preview"</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">script</span>&gt;</span><span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fileInput&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'fileInput'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;fileInput.addEventListener(<span data-darkreader-inline-color="">'change'</span>,&nbsp;(event)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;file&nbsp;=&nbsp;event.target.files[<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fileUrl&nbsp;=&nbsp;URL.createObjectURL(file);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;previewElement&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'preview'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;previewElement.src&nbsp;=&nbsp;fileUrl;<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;</span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 音视频流传输

举个例子，我们通过`MediaStream` 去不断推流，达到了视频显示的效果，有了`URL.createObjectURL`我们并不需要真的有一个url赋予video标签，去让视频显示出来，只需要使用`URL.createObjectURL`去构造一个临时的url即可~非常方便~

```
<span>&lt;<span data-darkreader-inline-color="">body</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">video</span>&nbsp;<span data-darkreader-inline-color="">id</span>=<span data-darkreader-inline-color="">"videoElement"</span>&nbsp;<span data-darkreader-inline-color="">autoplay</span>&nbsp;<span data-darkreader-inline-color="">playsinline</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">video</span>&gt;</span><br><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">script</span>&gt;</span><span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;videoElement&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'videoElement'</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;navigator.mediaDevices.getUserMedia({&nbsp;<span data-darkreader-inline-color="">video</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;<span data-darkreader-inline-color="">audio</span>:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then(<span>(<span>stream</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;videoElement.srcObject&nbsp;=&nbsp;stream;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.catch(<span>(<span>error</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">'Error&nbsp;accessing&nbsp;webcam:'</span>,&nbsp;error);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;</span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;/<span data-darkreader-inline-color="">body</span>&gt;</span><br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 结合 Blob

`URL.createObjectURL`结合`Blob`也可以做很多方便开发的事情~

### WebWorker

我们知道，想要用 WebWorker 的话，是要先创建一个文件，然后在里面写代码，然后去与这个文件运行的代码进行通信，有了`URL.createObjectURL`就不需要新建文件了，比如下面这个解决excel耗时过长的场景，可以看到，我们传给WebWorker的不是一个真的文件路径，而是一个临时的路径~

```
<span data-darkreader-inline-color="">const</span>&nbsp;handleImport&nbsp;=&nbsp;<span>(<span>ev:&nbsp;Event</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;file&nbsp;=&nbsp;(ev.target&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;HTMLInputElement).files![<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;worker&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Worker(<br>&nbsp;&nbsp;&nbsp;&nbsp;URL.createObjectURL(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Blob([<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.4/xlsx.full.min.js');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onmessage&nbsp;=&nbsp;function(e)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;fileData&nbsp;=&nbsp;e.data;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;workbook&nbsp;=&nbsp;XLSX.read(fileData,&nbsp;{&nbsp;type:&nbsp;'array'&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;sheetName&nbsp;=&nbsp;workbook.SheetNames[0];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;sheet&nbsp;=&nbsp;workbook.Sheets[sheetName];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;data&nbsp;=&nbsp;XLSX.utils.sheet_to_json(sheet,&nbsp;{&nbsp;header:&nbsp;1&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;postMessage(data);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]),<br>&nbsp;&nbsp;&nbsp;&nbsp;),<br>&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用FileReader读取文件内容</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;reader&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;FileReader();<br><br>&nbsp;&nbsp;reader.onload&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>e:&nbsp;<span data-darkreader-inline-color="">any</span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;data&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Uint8Array</span>(e.target.result);<br>&nbsp;&nbsp;&nbsp;&nbsp;worker.postMessage(data);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;读取文件</span><br>&nbsp;&nbsp;reader.readAsArrayBuffer(file);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;监听Web&nbsp;Worker返回的消息</span><br>&nbsp;&nbsp;worker.onmessage&nbsp;=&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;(<span>e</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'解析完成'</span>,&nbsp;e.data);<br>&nbsp;&nbsp;&nbsp;&nbsp;worker.terminate();&nbsp;<span data-darkreader-inline-color="">//&nbsp;当任务完成后，终止Web&nbsp;Worker</span><br>&nbsp;&nbsp;};<br>};<br>
```

### 下载文件

同样也可以应用在下载文件上，下载文件其实就是有一个url赋予到a标签上，然后点击a标签就能下载了，我们也可以用`URL.createObjectURL`去生成一个临时url

```
<span data-darkreader-inline-color="">//&nbsp;创建文件&nbsp;Blob</span><br><span data-darkreader-inline-color="">const</span>&nbsp;blob&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Blob([<span data-darkreader-inline-color="">/*&nbsp;文件数据&nbsp;*/</span>],&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'application/pdf'</span>&nbsp;});<br><br><span data-darkreader-inline-color="">//&nbsp;创建下载链接</span><br><span data-darkreader-inline-color="">const</span>&nbsp;downloadUrl&nbsp;=&nbsp;URL.createObjectURL(blob);<br><span data-darkreader-inline-color="">const</span>&nbsp;downloadLink&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.createElement(<span data-darkreader-inline-color="">'a'</span>);<br>downloadLink.href&nbsp;=&nbsp;downloadUrl;<br>downloadLink.download&nbsp;=&nbsp;<span data-darkreader-inline-color="">'document.pdf'</span>;<br>downloadLink.textContent&nbsp;=&nbsp;<span data-darkreader-inline-color="">'Download&nbsp;PDF'</span>;<br><span data-darkreader-inline-color="">document</span>.body.appendChild(downloadLink);<br>
```

## 结语

我是林三心

-   一个待过**小型toG型外包公司、大型外包公司、小公司、潜力型创业公司、大公司**的作死型前端选手；
    
-   一个偏前端的全干工程师；
    
-   一个不正经的掘金作者；
    
-   逗比的B站up主；
    
-   不帅的小红书博主；
    
-   喜欢打铁的篮球菜鸟；
    
-   喜欢历史的乏味少年；
    
-   喜欢rap的五音不全弱鸡如果你想一起学习前端，一起摸鱼，一起研究简历优化，一起研究面试进步，一起交流历史音乐篮球rap，可以来俺的摸鱼学习群哈哈，点这个，有7000多名前端小伙伴在等着一起学习哦 --> 
    

> 广州的兄弟可以约饭哦，或者约球~我负责打铁，你负责进球，谢谢~