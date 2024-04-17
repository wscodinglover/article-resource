## getUserMedia API简介

HTML5的**getUserMedia API**为用户提供访问硬件设备媒体（摄像头、视频、音频、地理位置等）的接口，基于该接口，开发者可以在不依赖任何浏览器插件的条件下访问硬件媒体设备。   
getUserMedia API最初是`navigator.getUserMedia`，目前已被最新Web标准废除，变更为`navigator.mediaDevices.getUserMedia（）`，但浏览器支持情况不如旧版API普及。   
`MediaDevices.getUserMedia（）`方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。如果用户给予许可，就返回一个`Promise`对象，`MediaStream`对象作为此`Promise`对象的`Resolved`［成功］状态的回调函数参数，相应的，如果用户拒绝了许可，或者没有媒体可用的情况下`PermissionDeniedError`或者`NotFoundError`作为此`Promise`的`Rejected`［失败］状态的回调函数参数。注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的`Promise`对象可能既不会触发`resolve`也不会触发 `reject`。

## 浏览器兼容性

![](https://img2018.cnblogs.com/blog/1313648/201901/1313648-20190102194803996-878521781.png)

## 语法

```
<span>navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) { ... })
.catch(function(error) { ... })</span>
```

## 参数

**`containers：`**指定请求的媒体类型，主要包含`video`和`audio`，必须至少一个类型或者两个同时可以被指定。如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的`Promise`对象就会处于`rejected`［失败］状态，`NotFoundError`作为`rejected`［失败］回调的参数。

_【例】同时请求不带任何参数的音频和视频：_

```
 { audio: true, video: true }
```

_【例】使用1280x720的摄像头分辨率：_

```
<span>{
  audio: true,
  video: { width: 1280, height: 720 }
}</span>
```

_【例】要求获取最低为1280x720的分辨率：_

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
<span>{
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
}</span>
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

当请求包含一个**`ideal`**（应用最理想的）值时，这个值有着更高的权重，意味着浏览器会先尝试找到最接近指定的理想值的设定或者摄像头（如果设备拥有不止一个摄像头）。

_【例】优先使用前置摄像头（如果有的话）：_

```
{ audio: true, video: { facingMode: "user" } }
```

_【例】强制使用后置摄像头：_

```
{ audio: true, video: { facingMode: { exact: "environment" } } }
```

___

成功回调函数`seccessCallback`的参数**`stream`**：`stream`是`MediaStream`的对象，表示媒体内容的数据流，可以通过`URL.createObjectURL`转换后设置为`Video`或`Audio`元素的`src`属性来使用，部分较新的浏览器也可以直接设置为`srcObject`属性来使用。

**注意：新版的谷歌浏览器不能直接将MediaStream对象直接作为URL.createObjectURL的参数使用，会报TypeError Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided的错误，具体用法在后面说明。**

___

失败回调函数`errorCallback`的参数**`error`**，可能的异常有：

-   `AbortError`：硬件问题
-   `NotAllowedError`：用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。
-   `NotFoundError`：找不到满足请求参数的媒体类型。
-   `NotReadableError`：操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。
-   `OverConstrainedError`：指定的要求无法被设备满足。
-   `SecurityError`：安全错误，在`getUserMedia()` 被调用的 `Document`  
    上面，使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。
-   `TypeError`：类型错误，`constraints`对象未设置［空］，或者都被设置为`false`。

## 示例：HTML 5调用媒体设备摄像头

这个例子中，请求访问用户硬件设备的摄像头，并把视频流通过Video元素显示出来。网页中提供一个"拍照"的按钮，通过Canvas将Video的画面截取并绘制，核心代码如下：

**HTML**

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
<span>&lt;!--</span><span>video用于显示媒体设备的视频流，自动播放</span><span>--&gt;</span>
<span>&lt;</span><span>video </span><span>id</span><span>="video"</span><span> autoplay style</span><span>="width: 480px;height: 320px"</span><span>&gt;&lt;/</span><span>video</span><span>&gt;</span>
<span>&lt;!--</span><span>拍照按钮</span><span>--&gt;</span>
<span>&lt;</span><span>div</span><span>&gt;</span>
<span>&lt;</span><span>button </span><span>id</span><span>="capture"</span><span>&gt;</span>拍照<span>&lt;/</span><span>button</span><span>&gt;</span>
<span>&lt;/</span><span>div</span><span>&gt;</span>
<span>&lt;!--</span><span>描绘video截图</span><span>--&gt;</span>
<span>&lt;</span><span>canvas </span><span>id</span><span>="canvas"</span><span> width</span><span>="480"</span><span> height</span><span>="320"</span><span>&gt;&lt;/</span><span>canvas</span><span>&gt;</span>
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

**JavaScript**

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
<span>//</span><span>访问用户媒体设备的兼容方法</span>
<span>function</span><span> getUserMedia(constrains,success,error){
    </span><span>if</span><span>(navigator.mediaDevices.getUserMedia){
        </span><span>//</span><span>最新标准API</span>
        navigator.mediaDevices.getUserMedia(constrains).then(success).<span>catch</span><span>(error);
    } </span><span>else</span> <span>if</span><span> (navigator.webkitGetUserMedia){
        </span><span>//</span><span>webkit内核浏览器</span>
        navigator.webkitGetUserMedia(constrains).then(success).<span>catch</span><span>(error);
    } </span><span>else</span> <span>if</span><span> (navigator.mozGetUserMedia){
        </span><span>//</span><span>Firefox浏览器</span>
        navagator.mozGetUserMedia(constrains).then(success).<span>catch</span><span>(error);
    } </span><span>else</span> <span>if</span><span> (navigator.getUserMedia){
        </span><span>//</span><span>旧版API</span>
        navigator.getUserMedia(constrains).then(success).<span>catch</span><span>(error);
    }
}

</span><span>var</span> video = document.getElementById("video"<span>);
</span><span>var</span> canvas = document.getElementById("canvas"<span>);
</span><span>var</span> context = canvas.getContext("2d"<span>);

</span><span>//</span><span>成功的回调函数</span>
<span>function</span><span> success(stream){
    </span><span>//</span><span>兼容webkit内核浏览器</span>
    <span>var</span> CompatibleURL = window.URL ||<span> window.webkitURL;
    </span><span>//</span><span>将视频流设置为video元素的源</span>
    video.src =<span> CompatibleURL.createObjectURL(stream);   // 此处的代码将会报错  解决的办法是将video的srcObject属性指向stream即可
    </span><span>//</span><span>播放视频</span>
<span>    video.play();
}

</span><span>//</span><span>异常的回调函数</span>
<span>function</span><span> error(error){
    console.log(</span>"访问用户媒体设备失败："<span>,error.name,error.message);
}
</span><span>if</span> (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia ||<span> navigator.mozGetUserMedia){
    </span><span>//</span><span>调用用户媒体设备，访问摄像头</span>
<span>    getUserMedia({
        video:{width:</span>480,height:320<span>}
    },success,error);
} </span><span>else</span><span> {
    alert(</span>"你的浏览器不支持访问用户媒体设备"<span>);
}

</span><span>//</span><span>注册拍照按钮的单击事件</span>
document.getElementById("capture").addEventListener("click",<span>function</span><span>(){
    </span><span>//</span><span>绘制画面</span>
    context.drawImage(video,0,0,480,320<span>);
});</span>
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

关闭摄像头或者麦克风：需要注意的是，MediaStream.getTracks() 返回的Tracks数组是按第一个参数倒序排列的

比如现在定义了

```
{
    video: true,
    audio: true
}
```

想关闭摄像头，就需要调用MediaStream.getTracks()\[1\].stop();

同理，0对应于audio的track

## 进阶

对本示例进行功能加强，比如使用CSS 3 的滤镜实现模糊、黑白等效果。

## 麦克风

因为纯粹用一个audio标签来播放麦克风拾取到的声音显得太没特色了，于是我用到了以前写的一个音频可视化库[Vudio.js](https://github.com/margox/vudio.js)，代码如下:

创建一个canvas来显示音频波形图

```
<span>&lt;</span><span>canvas </span><span>id</span><span>="canvas"</span><span>&gt;&lt;/</span><span>canvas</span><span>&gt;</span>
```

通过Vudio.js和getUserMedia来显示麦克风拾取到的音频的波形

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
<span>var</span> canvas = document.querySelector('#canvas'<span>)

navigator.mediaDevices.getUserMedia({
 audio: </span><span>true</span><span>
}).then((stream) </span>=&gt;<span> {

  </span><span>//</span><span> 调用Vudio</span>
  <span>var</span> vudio = <span>new</span><span> Vudio(stream, canvas, {
    accuracy: </span>256<span>,
    width: </span>1024<span>,
    height: </span>200<span>,
    waveform: {
      fadeSide: </span><span>false</span><span>,
      maxHeight: </span>200<span>,
      verticalAlign: </span>'middle'<span>,
      horizontalAlign: </span>'center'<span>,
      color: </span>'#2980b9'<span>
    }
  })

  vudio.dance()

}).</span><span>catch</span>((error) =&gt;<span> {
 console.error(error.name </span>||<span> error)
})</span>
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

 vudio.js源码：[https://github.com/margox/vudio.js/blob/master/vudio.js](https://github.com/margox/vudio.js/blob/master/vudio.js)

效果如下图所示：

![](https://img2018.cnblogs.com/blog/1313648/201901/1313648-20190102201206471-1721156186.png)