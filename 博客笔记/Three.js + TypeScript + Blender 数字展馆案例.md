> 本项目中使用的技术栈为three.js，使用blender进行建模，最后烘焙渲染场景贴图，导出glb地图格式在Web端渲染。此项目仅为数字展馆概念的demo项目，用于学习。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/9Z5K66tFPiay3rFmc9J1Chc5bOcNapCnQcZxNBylIkMZGHKYVRrpibYFlWmiclw2zr3buEh8mRBdrIajLnpic6dy8Q/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

作者 steve007<sup>[1]</sup> 受 three.js 官方示例启发，开发了这个项目并开源在码云平台上。该项目不仅展示了技术实现，还体现了作者对于开源精神的倡导和实践。

### 特点

-   高性能碰撞检测：因为这类项目对于物理引擎的应用场景并不多，经过不懈的技术方案调研后使用了一套不依赖于物理引擎的高性能的动态碰撞检测方案。比three.js官网的Octree方案性能还要好上几倍。
    
-   画展交互：利用光线投射进行物体探测触发互动效果。
    
-   位置音频：加入了位置音频，模拟现实中的听觉传播，使得场景中的音乐更具有空间感，提升浏览体验。
    

### 源码

https://gitee.com/steve007/gallery

注意：行走（W/S/A/D）、跳跃（空格）、控制视角（鼠标左键拖动）

参考资料

\[1\]

steve007: _https://gitee.com/steve007_

**感谢您的阅读**      

**在看点赞 好文不断**  ![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/9Z5K66tFPiazs3Z89Vu31cicxIlNVosLUvhm5NeWUmR81LicIsMwfpJ4RbgB7JHXiaapIw5Yu29m9Io2oC67zGGBqA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)