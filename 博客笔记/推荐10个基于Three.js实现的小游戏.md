大家好，我是itboy。

今天给大家分享10个基于Three.js 实现的小游戏。只需一个浏览器，就可以「打开下方链接,部分支持移动端」在线玩耍，简直不要泰裤辣！该学的学、想玩的玩，今天星期五，祝大家周末愉快。

《Slow Roads》3D赛车游戏

**01**

Slow Roads是一款程序生成的休闲驾驶游戏，可让您暂时脱离生活，无休止地奔向遥远的地平线。设置适合您心情的风景，播放一些音乐，然后开车就行了。

只需一个浏览器，就能驾车从森林、海滩，“无缝切换”到广袤的沙漠甚至平原，无论春夏秋冬还是白天黑夜，也无论你用的是电动汽车、自行车还是公共汽车，甚至不想开的时候，还可以开启自动驾驶模式，开启你的BGM，体验不一样的“速度与激情”。

**控件：WASD = 驱动器，Space = 手刹，R = 重生，鼠标 = 设置**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一个外国小哥经过16个月的全职开发，这个项目的最初目标已经实现。Slow Roads使用了Three.js开源框架构建，这是一个相当复杂且有趣的技术演示。用开发者 Anslo 自己的话来形容，「该游戏的实验正在挑战浏览器游戏的合理边界」。目前这款游戏还没有公开源代码的计划。但小哥表示，后续可能会开源部分有趣的子系统，如图形MOD接口等。

**相关地址**  

\[1\] **玩耍地址：**

https://slowroads.io/

\[2\] **完整预览版：**

https://roberttbs.github.io/slowroads/  

\[3\] **项目代码（非源码）：**

https://github.com/RobertTBS/slowroads

3D游戏：美女与龙珠

**02**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

游戏讲述的是一个小女生被恶魔诅咒找不到家了，她听说收集七龙珠可以召唤神龙，神龙可是帮她实现回家的愿望，于是她开启了她的冒险故事。

寻找散落各处的龙珠。当人物碰到龙珠时，龙珠发生变化，表示此龙珠被找到。当找完七颗时，寻找地图中出现的龙，按提示找出神龙，即可完成游戏！

**控件：W = 前进，W+E = 快跑，S = 后退，鼠标 = 控制视角，空格 = 跳跃**

这个游戏使用Vite + React技术栈，基于Three.js的Lingo3D实现，以及使用了这些工具：sketchfab：3D模型下载、mixamo：3D人物动作绑定及动画、    readyplayer：3D角色生产工具、gltf.report：模型压缩、polyhaven：hdr素材库(环境贴图)、textures：材质贴图素材。

**相关地址**  

\[1\] **玩耍地址：**

https://jcodelife.gitee.io/online/  

\[2\]**源码：**

https://github.com/jCodeLife/beauty-and-dragonball

3D乒乓球游戏

**03**

一个手握乒乓球拍的模型和一个乒乓球，球拍像现实生活中一样进行颠球施力操作，乒乓球可以在球拍上弹起，乒乓球弹起的高度随着施加在球拍上的力的大小的变化而变化，球拍中央显示的是连续颠球次数，当乒乓球从球拍掉落时一局游戏结束，球拍上的数字归零。

使用技术栈 React Three Fiber 和 Cannon.js搭建基础的三维场景，并给场景中对象添加物理特性等，实现一个简单的乒乓球小游戏。React Three Fiber是一个基于Three.js的React渲染器，简称R3F。

**相关地址**  

\[1\] **玩耍地址：**

https://dragonir.github.io/physics-pingpong/

\[2\]**源码：**

https://github.com/dragonir/threejs-odessey/tree/master/12-physics-pingpong

跳一跳游戏

**04**

2017年12月28日，微信更新的 6.6.1 版本开放了小游戏，微信启动页面还重点推荐了小游戏「跳一跳」。曾经一时间火遍朋友圈，2018年5月，研究公司QuestMobile，发布了微信小游戏《跳一跳》的数据，这款只有4MB大小的游戏截至2018年3月份已经积累了3.9亿玩家。

作者 奶油小泡芙 基于Three.js让经典重现「网页版跳一跳」，长按鼠标蓄力、放手，方块就会从一个盒子跳到另一个盒子「使用鼠标又是另一番体验，快去试试吧」。然而就是这个小动作，让你一旦开始就魔性地停不下来。

**相关地址**  

\[1\] **玩耍地址：**

https://fwjzzz.gitee.io/jump/

\[2\]**源码：**

https://gitee.com/fwjzzz/Jump

全景侦探游戏

**05**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你是**嘿嘿嘿侦探社**实习侦探，接到上级指派任务，到**甄开心小镇**调查市民**甄不戳**宝石失窃案，根据线人**流浪汉老石**提供的线索，小偷就躲在小镇，快把他找出来，帮甄不戳寻回失窃的宝石吧！

左右滑动屏幕，找到3D全景场景中的交互点并点击，找出嫌疑人真正躲藏的位置。已适配移动端，可以在手机上打开访问。

使用 Three.js SphereGeometry 创建 3D 全景图预览功能，并在全景图中添加二维 SpriteMaterial、Canvas、三维 GLTF 等交互点，实现具备场景切换、点击交互的侦探小游戏。

**相关地址**  

\[1\] **玩耍地址：**

https://dragonir.github.io/3d-panoramic-vision/

\[2\]**源码：**

https://github.com/dragonir/3d-panoramic-vision

我的世界

**06**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

相信大家对我的世界应该都不太陌生, 它是一款 3D 像素风的生存类游戏, 本项目是模仿我的世界来进行实现的。

项目的初衷便是探索一下Three.js，所以除了Three.js之外并没有别的第三方库依赖，因此最后的打包大小其实是十分轻量级的， gzipped 后仅有 140kb 左右。在此之上笔者还添加了 TypeScript 来进行类型检测， 并且使用了Vite进行的开发。

**相关地址**  

\[1\] **源码****：**

https://github.com/vyse12138/minecraft-threejs

喷火龙小游戏

**07**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你点击的时间越长，它打喷嚏的力度越大。按住并拖动可转身，画面极度舒适、流畅。

基于HTML、CSS 和 Three.js 的喷火龙小游戏，案例虽小，却能让你重新发现编码的乐趣。

**相关地址**  

\[1\] **玩耍地址：**

https://haiyong.site/moyu/penhuolong.html

\[2\]**实验室（源码）****：**

http://yakudoo.com/work/webgl-experiments/

阿狸的多元宇宙

**08**

**2545光年**之外的**开普勒1028星系**，有一颗色彩斑斓的宜居星球 ，星际移民必须穿戴**基地**发放的防辐射服才能生存。阿狸驾驶星际飞行器降临此地，快帮它在限定时间内使用**轮盘**移动**找到基地**获取防辐射服吧！

使用 Three.js + React + CANNON 技术栈，通过滑动屏幕控制模型在 3D 世界里运动的 Low Poly 低多边形风格小游戏。本文主要涉及到的知识点包括：Three.js 阴影类型、创建粒子系统、cannon.js 基本用法、使用 cannon.js 高度场 Heightfield 创建地形、通过轮盘移动控制模型动画等。

**相关地址**  

\[1\] **玩耍地址：**

https://dragonir.github.io/3d/#/metaverse

\[2\]**源码：**

https://github.com/dragonir/3d/tree/master/src/containers/Metaverse

竞速类游戏

**09**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在浏览器中体验一场紧张刺激的躲避障碍物的小游戏，让你随时随地享受快速反应和精准操作的快感！在快速移动的赛道上，你需要眼疾手快地避开障碍物，努力成为躲避达人！右上角的得分，将证明你的能力！

**使用箭头键可快速移动，亦可加速、减速**

基于three.js实现的简单比赛游戏，源码简约易懂，快来举一反三吧。

**相关地址**  

\[1\] **玩耍地址：**

http://noiron.github.io/race-game-threejs/

\[2\]**源码：**

https://github.com/noiron/race-game-threejs

《Astray》迷宫游戏

**10**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

快来玩这个超棒的迷宫游戏！就像在大海里找鱼一样，你在迷宫里找路，解谜。全新关卡设计，难度逐渐升级，加入我们的迷宫世界，带你沉浸式体验富有挑战的冒险之旅！

**如何玩Astray？使用箭头键移动球并找到通往迷宫的出口。****或控件：H=左，J=后，K=前，L=右**

一个用Three.js和Box2dWeb构建的WebGL迷宫游戏。

**相关地址**  

\[1\] **玩耍地址：**

http://wwwtyro.github.io/Astray/

\[2\]源码**：**

https://github.com/wwwtyro/Astray