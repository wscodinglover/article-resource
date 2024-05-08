## 前言

在网上找了很久都没有找到使用Three.js开发3d的免费文章或者免费视频,自己花了一点时间做了一个纯前端的项目demo。 模型<sup data-darkreader-inline-color="">[1]</sup>都是在网上免费下载的，没有那么精细、美观请见谅。技术栈都是最新的：`vue3+vite+typeScript+Three+antv G2` 项目源码<sup data-darkreader-inline-color="">[2]</sup>

此文章只用于想学习three.js的小伙伴做学习用途。

#### 有地面版本

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/9Z5K66tFPiazjcZ1AibsCqxSDlBQjzjqnicbSW3ibY6FyZseMYUBMK7zrZ1O0djHhw9vNaq9UV8kfxUWUA5MMWicoKQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 无地面版本

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/9Z5K66tFPiazjcZ1AibsCqxSDlBQjzjqnicamRia0ZSTettjYM80gThz8NRUsvic2ibu0ZEkGMicyVKibZQnQrePHZEiagg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 开发各种框架的版本

-   "vue": "^3.2.47"
    
-   "@antv/g2plot": "^2.4.29"
    
-   "typescript": "^5.0.2"
    
-   "vite": "^4.3.0"
    
-   "@types/three": "^0.150.2"
    

## 搭建three场景

引入three.js,先初始化场景,相机,渲染器,光线,轨道控制器。先打印一下three看一下有没有输出,然后再搭建场景等…

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"container"</span>&nbsp;id=<span data-darkreader-inline-color="">"container"</span>&gt;&lt;/div&gt;<br>&lt;/tempalte&gt;<br>&lt;script&nbsp;lang=<span data-darkreader-inline-color="">"ts"</span>&nbsp;setup&gt;<br><span data-darkreader-inline-color="">let</span>&nbsp;scene&nbsp;=&nbsp;null&nbsp;as&nbsp;any,//场景<br>camera&nbsp;=&nbsp;null&nbsp;as&nbsp;any,//相机<br>renderer&nbsp;=&nbsp;null&nbsp;as&nbsp;any,//渲染器<br>controls&nbsp;=&nbsp;null&nbsp;as&nbsp;any//轨道控制器<br>import&nbsp;{onMounted,&nbsp;reactive&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br>import&nbsp;*&nbsp;as&nbsp;THREE&nbsp;from&nbsp;<span data-darkreader-inline-color="">'three'</span>;<br>import&nbsp;{OrbitControls}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'three/examples/jsm/controls/OrbitControls'</span><br>//设置three的方法<br>const&nbsp;render&nbsp;=&nbsp;async&nbsp;()&nbsp;=&gt;{<br>&nbsp;&nbsp;//1.创建场景<br>&nbsp;&nbsp;scene&nbsp;=&nbsp;new&nbsp;THREE.Scene();<br>&nbsp;&nbsp;//2.创建相机<br>&nbsp;&nbsp;camera&nbsp;=&nbsp;new&nbsp;THREE.PerspectiveCamera(105,window.innerWidth/window.innerHeight,0.1,1000);<br>&nbsp;&nbsp;//3.设置相机位置<br>&nbsp;&nbsp;camera.position.set(0,0,4);<br>&nbsp;&nbsp;scene.add(camera);<br>&nbsp;&nbsp;//4.建立3个坐标轴<br>&nbsp;&nbsp;const&nbsp;axesHelper&nbsp;=&nbsp;new&nbsp;THREE.AxesHelper(5);<br>&nbsp;&nbsp;scene.add(axesHelper);<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;//6.设置环境光，要不然模型没有颜色<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;ambientLight&nbsp;=&nbsp;new&nbsp;THREE.AmbientLight();&nbsp;//设置环境光<br>&nbsp;&nbsp;scene.add(ambientLight);&nbsp;//将环境光添加到场景中<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;pointLight&nbsp;=&nbsp;new&nbsp;THREE.PointLight();<br>&nbsp;&nbsp;pointLight.position.set(200,&nbsp;200,&nbsp;200);&nbsp;//设置点光源位置<br>&nbsp;&nbsp;scene.add(pointLight);&nbsp;//将点光源添加至场景<br><br><br>&nbsp;&nbsp;//7.初始化渲染器<br>&nbsp;&nbsp;//渲染器透明<br>&nbsp;&nbsp;renderer&nbsp;=&nbsp;new&nbsp;THREE.WebGLRenderer({<br>&nbsp;&nbsp;&nbsp;&nbsp;alpha:<span data-darkreader-inline-color="">true</span>,//渲染器透明<br>&nbsp;&nbsp;&nbsp;&nbsp;antialias:<span data-darkreader-inline-color="">true</span>,//抗锯齿<br>&nbsp;&nbsp;&nbsp;&nbsp;precision:<span data-darkreader-inline-color="">'highp'</span>,//着色器开启高精度<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;//开启HiDPI设置<br>&nbsp;&nbsp;renderer.setPixelRatio(window.devicePixelRatio);<br>&nbsp;&nbsp;renderer.setSize(window.innerWidth,&nbsp;window.innerHeight);<br>&nbsp;&nbsp;//设置渲染器尺寸大小<br>&nbsp;&nbsp;renderer.setClearColor(0x228b22,0.1);<br>&nbsp;&nbsp;renderer.setSize(window.innerWidth,window.innerHeight);<br>&nbsp;&nbsp;//将webgl渲染的canvas内容添加到div<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;container&nbsp;=&nbsp;document.getElementById(<span data-darkreader-inline-color="">'container'</span>)&nbsp;as&nbsp;any;<br>&nbsp;&nbsp;container.appendChild(renderer.domElement);<br>&nbsp;&nbsp;//使用渲染器&nbsp;通过相机将场景渲染出来<br>&nbsp;&nbsp;renderer.render(scene,camera);<br>&nbsp;&nbsp;controls&nbsp;=&nbsp;new&nbsp;OrbitControls(camera,renderer.domElement);<br>}<br>const&nbsp;animate&nbsp;=&nbsp;()&nbsp;=&gt;{<br>&nbsp;&nbsp;&nbsp;requestAnimationFrame(animate);<br>&nbsp;&nbsp;&nbsp;renderer.render(scene,camera);<br>}<br>onMounted(()=&gt;{<br>&nbsp;&nbsp;render()<br>&nbsp;&nbsp;animate()<br>})<br>&lt;/script&gt;<br>&lt;style&nbsp;scoped&gt;<br>.container{<br>&nbsp;&nbsp;width:100vw;<br>&nbsp;&nbsp;height:&nbsp;100vh;<br>&nbsp;&nbsp;overflow:&nbsp;hidden;<br>}<br>&lt;/style&gt;<br></code>
```

现在我们就看到了three坐标轴了,接下来我们开始导入模型和天空图盒子

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 加载gltf模型

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;GLTFLoader&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'three/examples/jsm/loaders/GLTFLoader.js'</span>;<br><span data-darkreader-inline-color="">//5.导入gltf模型</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;gltfLoader&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;GLTFLoader();<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;gltfLoader.load(<span data-darkreader-inline-color="">'./model/scene.gltf'</span>,<span><span data-darkreader-inline-color="">function</span>(<span>object</span>)</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(object)<br>&nbsp;&nbsp;&nbsp;&nbsp;scene.add(object.scene);<br>&nbsp;&nbsp;});<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 加载天空盒子

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//1.1&nbsp;创建天空盒子</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;textureCubeLoader&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.CubeTextureLoader();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;textureCube&nbsp;=&nbsp;textureCubeLoader.load([<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/right.jpg"</span>,<span data-darkreader-inline-color="">//右</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/left.jpg"</span>,<span data-darkreader-inline-color="">//左</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/top.jpg"</span>,<span data-darkreader-inline-color="">//上</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/bottom.jpg"</span>,<span data-darkreader-inline-color="">//下</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/front.jpg"</span>,<span data-darkreader-inline-color="">//前</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"../public/img/back.jpg"</span>,<span data-darkreader-inline-color="">//后</span><br>&nbsp;&nbsp;])<br>&nbsp;&nbsp;scene.background&nbsp;=&nbsp;textureCube;<br>&nbsp;&nbsp;scene.environment&nbsp;=&nbsp;textureCube;<br><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在我们可以看到模型和天空盒子了,接下来我们讲如何给three加文字进去以及触发文字事件

## 加贴图文字

这里我们使用canvas写文字然后转成图片 最后使用three的纹理材质导入到three里面

-   1.写一个canvas文字
    
-   2.canvas转成图片
    
-   3.three纹理材质导入图片
    
-   4.定位到想要显示的地方
    

文字显示到three后,使用监听鼠标的方法，点击了网页触发事件

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;canvas&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;any&nbsp;<span data-darkreader-inline-color="">//文字</span><br><span data-darkreader-inline-color="">//创建three文字</span><br><span data-darkreader-inline-color="">const</span>&nbsp;threeText&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//用canvas生成图片</span><br>&nbsp;&nbsp;canvas&nbsp;=&nbsp;<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">'canvas'</span>);<br>&nbsp;&nbsp;canvas.width&nbsp;=&nbsp;<span data-darkreader-inline-color="">300</span><br>&nbsp;&nbsp;canvas.height&nbsp;=&nbsp;<span data-darkreader-inline-color="">300</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;ctx&nbsp;=&nbsp;canvas.getContext(<span data-darkreader-inline-color="">'2d'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//制作矩形</span><br>&nbsp;&nbsp;ctx.fillStyle&nbsp;=&nbsp;<span data-darkreader-inline-color="">"rgba(6,7,80,0.8)"</span>;<br>&nbsp;&nbsp;ctx.fillRect(<span data-darkreader-inline-color="">0</span>,<span data-darkreader-inline-color="">0</span>,<span data-darkreader-inline-color="">80</span>,<span data-darkreader-inline-color="">20</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//设置文字</span><br>&nbsp;&nbsp;ctx.fillStyle&nbsp;=&nbsp;<span data-darkreader-inline-color="">"#fff"</span>;<br>&nbsp;&nbsp;ctx.font&nbsp;=&nbsp;<span data-darkreader-inline-color="">'normal&nbsp;10pt&nbsp;"楷体"'</span><br>&nbsp;&nbsp;ctx.fillText(<span data-darkreader-inline-color="">'东方明珠'</span>,&nbsp;<span data-darkreader-inline-color="">12.5</span>,&nbsp;<span data-darkreader-inline-color="">15</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//生成图片</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;url&nbsp;=&nbsp;canvas.toDataURL(<span data-darkreader-inline-color="">'image/png'</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//将图片放到纹理中</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;geoMetry1&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.PlaneGeometry(<span data-darkreader-inline-color="">30</span>,<span data-darkreader-inline-color="">30</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;texture&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.TextureLoader().load(url);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;material1&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.MeshBasicMaterial({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">map</span>:texture,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">side</span>:THREE.DoubleSide,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">opacity</span>:<span data-darkreader-inline-color="">1</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transparent</span>:<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;rect&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.Mesh(geoMetry1,material1)<br>&nbsp;&nbsp;rect.position.set(<span data-darkreader-inline-color="">10</span>,<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">-13</span>)<br>&nbsp;&nbsp;scene.add(rect)<br>}<br><span data-darkreader-inline-color="">//触发东方明珠点击事件</span><br><span data-darkreader-inline-color="">const</span>&nbsp;threeTextClick&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">window</span>.addEventListener(<span data-darkreader-inline-color="">'click'</span>,(event)=&gt;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(event.clientX)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(event.clientX&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">855</span>&nbsp;&amp;&amp;&nbsp;event.clientX&nbsp;&lt;&nbsp;<span data-darkreader-inline-color="">1022</span>){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alert(<span data-darkreader-inline-color="">"触发了点击事件"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<span data-darkreader-inline-color="">else</span>{<span data-darkreader-inline-color="">return</span>}<br>&nbsp;&nbsp;})<br>}<br>onMounted(<span><span>()</span>=&gt;</span>{&nbsp;&nbsp;<br>&nbsp;&nbsp;threeText()<br>&nbsp;&nbsp;threeTextClick()<br>})<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们接下来做一个three动态光圈出来

## 做一个three动态光圈

-   1.先创建一个three的圆柱几何体
    
-   2.给几何体加载一个合适的纹理
    
-   3.然后让他缓慢变大,重复运动
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;cylinderGeometry&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span>&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;any<span data-darkreader-inline-color="">//光圈</span><br><span data-darkreader-inline-color="">//创建光圈</span><br><span data-darkreader-inline-color="">const</span>&nbsp;aperture&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//创建圆柱</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;gemetry&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.CylinderGeometry(<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">0.2</span>,<span data-darkreader-inline-color="">64</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//加载纹理</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;texture&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.TextureLoader().load(<span data-darkreader-inline-color="">'../public/img/cheng.png'</span>);<br>&nbsp;&nbsp;texture.wrapS&nbsp;=&nbsp;texture.wrapT&nbsp;=&nbsp;THREE.RepeatWrapping;<span data-darkreader-inline-color="">//每个都重复</span><br>&nbsp;&nbsp;texture.repeat.set(<span data-darkreader-inline-color="">1</span>,<span data-darkreader-inline-color="">1</span>);<br>&nbsp;&nbsp;texture.needsUpdate&nbsp;=&nbsp;<span data-darkreader-inline-color="">true</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;material&nbsp;=&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//圆柱侧面材质,使用纹理贴图</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.MeshBasicMaterial({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">map</span>:texture,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">side</span>:THREE.DoubleSide,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transparent</span>:<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//圆柱顶材质</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.MeshBasicMaterial({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transparent</span>:<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">opacity</span>:<span data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">side</span>:THREE.DoubleSide<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//圆柱顶材质</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.MeshBasicMaterial({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">transparent</span>:<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">opacity</span>:<span data-darkreader-inline-color="">0</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">side</span>:THREE.DoubleSide<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;];<br>&nbsp;&nbsp;cylinderGeometry&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.Mesh(gemetry,material);<br>&nbsp;&nbsp;cylinderGeometry.position.set(<span data-darkreader-inline-color="">0</span>,<span data-darkreader-inline-color="">-0.2</span>,<span data-darkreader-inline-color="">1</span>);<br>&nbsp;&nbsp;scene.add(cylinderGeometry);<br>}<br>onMounted(<span><span>()</span>=&gt;</span>{<br>&nbsp;&nbsp;aperture()<br>})<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

让几何体(光圈)动起来，这个动态方法要放在animate方法里面

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;cylinderRadius&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br><span data-darkreader-inline-color="">let</span>&nbsp;cylinderOpacity&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>;<br><span data-darkreader-inline-color="">//圆柱光圈扩散动画</span><br><span data-darkreader-inline-color="">const</span>&nbsp;cylinderAnimate&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;cylinderRadius&nbsp;+=&nbsp;<span data-darkreader-inline-color="">0.01</span>;<br>&nbsp;&nbsp;cylinderOpacity&nbsp;-=&nbsp;<span data-darkreader-inline-color="">0.003</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(cylinderRadius&nbsp;&gt;&nbsp;<span data-darkreader-inline-color="">1.6</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cylinderRadius&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;cylinderOpacity&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(cylinderGeometry)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;cylinderGeometry.scale.set(<span data-darkreader-inline-color="">1</span>&nbsp;+&nbsp;cylinderRadius,&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;+&nbsp;cylinderRadius);&nbsp;<span data-darkreader-inline-color="">//圆柱半径增大</span><br>&nbsp;&nbsp;&nbsp;&nbsp;cylinderGeometry.material[<span data-darkreader-inline-color="">0</span>].opacity&nbsp;=&nbsp;cylinderOpacity;&nbsp;<span data-darkreader-inline-color="">//圆柱可见度减小</span><br>&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">const</span>&nbsp;animate&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>{<br>&nbsp;&nbsp;&nbsp;cylinderAnimate()<br>&nbsp;&nbsp;&nbsp;requestAnimationFrame(animate);<br>&nbsp;&nbsp;&nbsp;renderer.render(scene,camera);<br>}<br><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样光圈就开始动起来了,3d部分就讲完了,接下来就是图表和页面样式

## 图标和头部

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&nbsp;class=<span data-darkreader-inline-color="">"container"</span>&nbsp;id=<span data-darkreader-inline-color="">"container"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;header&nbsp;class=<span data-darkreader-inline-color="">"header"</span>&gt;智慧上海驾驶舱&lt;/header&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftTop"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftCenter"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftFooter"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightTop"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightCenter"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightFooter"</span>&gt;&lt;/section&gt;<br>&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br>&lt;style&gt;<br>.container{<br>&nbsp;&nbsp;width:100vw;<br>&nbsp;&nbsp;height:&nbsp;100vh;<br>&nbsp;&nbsp;overflow:&nbsp;hidden;<br>}<br>.header{<br>&nbsp;&nbsp;width:&nbsp;100vw;<br>&nbsp;&nbsp;height:&nbsp;80px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;top:&nbsp;0;<br>&nbsp;&nbsp;text-align:&nbsp;center;<br>&nbsp;&nbsp;font-size:&nbsp;28px;<br>&nbsp;&nbsp;letter-spacing:&nbsp;4px;<br>&nbsp;&nbsp;line-height:&nbsp;65px;<br>&nbsp;&nbsp;color:<span data-darkreader-inline-color="">#fff;</span><br>&nbsp;&nbsp;background-image:&nbsp;url(<span data-darkreader-inline-color="">"../public/img/23.png"</span>);<br>&nbsp;&nbsp;background-size:&nbsp;100%&nbsp;100%;<br>&nbsp;&nbsp;background-repeat:&nbsp;no-repeat;<br>}<br>.leftTop{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;310px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;40px;<br>&nbsp;&nbsp;left:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>.leftCenter{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;310px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;370px;<br>&nbsp;&nbsp;left:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>.leftFooter{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;210px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;700px;<br>&nbsp;&nbsp;left:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>.rightTop{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;310px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;40px;<br>&nbsp;&nbsp;right:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>.rightCenter{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;310px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;370px;<br>&nbsp;&nbsp;right:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>.rightFooter{<br>&nbsp;&nbsp;width:&nbsp;400px;<br>&nbsp;&nbsp;height:&nbsp;210px;<br>&nbsp;&nbsp;position:&nbsp;fixed;<br>&nbsp;&nbsp;z-index:&nbsp;9999999;<br>&nbsp;&nbsp;top:&nbsp;700px;<br>&nbsp;&nbsp;right:20px;<br>&nbsp;&nbsp;border-radius:&nbsp;10px;<br>&nbsp;&nbsp;background-color:&nbsp;rgba(6,7,80,0.6);<br>}<br>&lt;/style&gt;<br></code>
```

效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大致结构我们搭建好了,接下来的步骤

-   1.我们做几个antv的组件柱状图、条形图、折线图的组件
    
-   2.然后引入到我们刚刚创建好的app.vue 的 div 里面去
    
-   3.创建一个地面
    

在views文件夹里面创建如下图的文件夹：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后在app.vue引入组件

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;div&nbsp;class=<span data-darkreader-inline-color="">"container"</span>&nbsp;id=<span data-darkreader-inline-color="">"container"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;header&nbsp;class=<span data-darkreader-inline-color="">"header"</span>&gt;three学习&lt;/header&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftTop"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;LeftTop&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftCenter"</span>&gt;&lt;/section&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"leftFooter"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightTop"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightCenter"</span>&gt;&lt;/section&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;section&nbsp;class=<span data-darkreader-inline-color="">"rightFooter"</span>&gt;&lt;/section&gt;<br>&lt;/div&gt;<br>&lt;script&nbsp;lang=<span data-darkreader-inline-color="">"ts"</span>&nbsp;setup&gt;<br>import&nbsp;LeftTop&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./views/leftTop/index.vue'</span><br>&lt;/script&gt;<br></code>
```

创建一个地面

素材：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图片放在public文件夹

-   1.创建一个three的纹理贴图并把草地加载进来
    
-   2.然后设置重复次数
    
-   3.定位到模型的下面
    
-   4.将地板添加到场景中
    

以下请加在加载gltf模型的前面

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;<span data-darkreader-inline-color="">//4.创建地面&nbsp;&nbsp;const&nbsp;groundTexture&nbsp;=&nbsp;new&nbsp;THREE.TextureLoader().load("./2.png");&nbsp;&nbsp;</span><br>&nbsp;groundTexture.wrapS&nbsp;=&nbsp;groundTexture.wrapT&nbsp;=&nbsp;THREE.RepeatWrapping;&nbsp;&nbsp;<br>&nbsp;groundTexture.repeat.set(<span data-darkreader-inline-color="">100</span>,&nbsp;<span data-darkreader-inline-color="">100</span>);&nbsp;&nbsp;<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ground&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.CircleGeometry(<span data-darkreader-inline-color="">500</span>,&nbsp;<span data-darkreader-inline-color="">100</span>);&nbsp;&nbsp;<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;groundMaterial&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.MeshLambertMaterial({&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">side</span>:&nbsp;THREE.DoubleSide,&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">map</span>:&nbsp;groundTexture,&nbsp;&nbsp;});&nbsp;&nbsp;<br>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;groundMesh&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;THREE.Mesh(ground,&nbsp;groundMaterial);&nbsp;&nbsp;<br>&nbsp;groundMesh.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"地面"</span>;&nbsp;&nbsp;<br>&nbsp;groundMesh.rotateX(-<span data-darkreader-inline-color="">Math</span>.PI&nbsp;/&nbsp;<span data-darkreader-inline-color="">2</span>);<br>&nbsp;groundMesh.position.set(<span data-darkreader-inline-color="">0</span>,&nbsp;<span data-darkreader-inline-color="">-0.345</span>,&nbsp;<span data-darkreader-inline-color="">1</span>);&nbsp;&nbsp;<br>&nbsp;scene.add(groundMesh);<br></code>
```

最终效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

参考资料

\[1\]

模型提取码1234: _https://pan.baidu.com/share/init?surl=07PKQEfDZfmsBN\_aKbPcgw_

\[2\]

项目源码: _https://gitee.com/fantianyuan/wisdom-city_

作者：范天缘

链接：https://juejin.cn/post/7293463921729372201

**感谢您的阅读**      

**在看点赞 好文不断**  ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)