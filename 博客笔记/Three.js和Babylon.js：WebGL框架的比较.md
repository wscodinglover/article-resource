![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/9Z5K66tFPiaw4PwIC6dMtWyIff2VbnU1fDHG6iaPFVtFqJaqYicfzRy8SEwOVE7EvI0AoNfWcibAszRNL6qFdP4Y9Q/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

大家好，我是itboy。

星期五是“工作一周的最后一天”，所以大家觉得它有点像一个“奖励”，可能也有朋友被安排了更多的任务。总的来说，这一天是一个有点复杂的日子，但只要你好好地规划时间，那么一定有一天属于你，祝大家周末愉快。

为了迎合大家，今天的分享可以选择戴上耳机听，但仍然希望您能发现每个库的特点，并为您的项目选择最适合的库。

## 3D框架起源：

著名的脚本语言自1995年推出以来，已经走了很长一段路。虽然它可能不是每个人的最爱，但它似乎每天都有新的的粉丝，也被一群人称为最受欢迎的语言。

如今，您可以将JavaScript用于几乎所有您可以想象自己使用计算机做的事情， 得益于类似WebGL这样的出色的JavaScript API，能够以多种方式渲染2D和3D交互式对象，使我们的网页可以访问动态着色和逼真的物理效果。不过，自己使用它可能会有点不知所措，我们最好使用框架来提高工作效率。Babylon.js和Three.js已经是家喻户晓的名字了，它们底层都是基于WebGL。

___

Three.js<sup data-darkreader-inline-color="">[1]</sup>来自西班牙巴塞罗那的 Ricardo Cabello 在2010年4月于GitHub<sup data-darkreader-inline-color="">[2]</sup>首次发布，它的起源可以追溯到2009年，最初是用ActionScript编写的，后来被转移到JavaScript。在Cabello看来，转移到 JavaScript 有两个优点：每次运行前没有编译代码和平台独立性。它最初是作为一个小项目开始的，随着时间的推移，Three.js不断发展和改进变得越来越流行。

在Web Infra大咖面对面<sup data-darkreader-inline-color="">[3]</sup>采访活动中，Cabello表示正在努力研发Three.js的WebGPU渲染器以及支持在WebGPU上跑WebXR。

___

Babylon.js<sup data-darkreader-inline-color="">[4]</sup>于2013年夏天崭露头角，它与Internet Explorer 11首次正式支持WebGL API一起推出。尽管源于Redmond的实验室，Babylon.js<sup data-darkreader-inline-color="">[5]</sup>（以及Three.js）仍然拥有开源许可证。

Babylon.js的命名源于对最伟大的科幻剧之一的深深喜爱和钦佩，正如官网所说：我们的使命是构建世界上最强大、最美观、最简单、最开放的 Web 渲染引擎之一。

Babylon.js 5.0的发布是一个重要的里程碑，它对WebGPU的全面支持，意味着你可以同时使用WebGL和WebGPU开发令人兴奋的渲染体验，而无需学习新的图形API，这一切问题Babylon.js已为你解决了！截止目前已发布Babylon.js 6.0， 这个新版本带来了性能改进、渲染增强和令人兴奋的新功能。

## 设计的差别：

Three.js和Babylon.js是当今Web开发人员和游戏设计师使用的两个最受欢迎的3D渲染引擎。这两种引擎都为在 Web上创建交互式3D图形提供了强大的工具，但它们在功能、性能和易用性方面存在一些关键差异。两者之间的主要区别在于它们的预期用途。虽然这些框架中的任何一个都可以硬塞进去创建相同的3D动画，但重要的是要知道每个框架都是为了完成什么而创建的。

Three.js它轻巧且易于使用，并且可以与其它JavaScript库和框架集成，使其成为不熟悉3D编程或正在构建更简单应用程序的开发人员的热门选择。Three.js还拥有一个庞大而活跃的社区，在线提供大量资源用于学习和修复Bug。

Three.js的创建只有一个目标：利用基于Web的渲染器来创建GPU增强的3D图形和动画。因此，该框架采用非常广泛的Web图形方法，而不需要关注单个动画的细节。

___

Babylon.js它的预期用途是提供一整套API，以便开发人员能够轻松地创建出复杂的3D场景和游戏。与Three.js不同，Babylon.js是用TypeScript实现的，这使得其源代码对于那些喜欢使用TypeScript的开发人员来说更易于理解。

Babylon.js的主要优势之一是内置的物理和动画引擎，这使得创建逼真的动作和对象之间的交互变得容易，这对于创建沉浸式游戏和增强现实应用程序至关重要。尽管与Three.js有相似之处，但Babylon.js通过专注于传统的游戏引擎要求（如引擎和自定义光照）来巧妙地区分自己。

总体而言，Babylon.js是想要创建具有复杂物理和动画的高级3D应用程序的开发人员的绝佳选择。虽然学习和使用可能比Three.js更具挑战性，但它提供了更高级的特性和功能。

最后，这两个框架使得Web开发人员可以创造无限可能。因此，任何对3D Web开发感兴趣的人都应该仔细研究这项尖端技术。

### 相关资料

\[1\]

Three.js官网: _https://threejs.org/_

\[2\]

Three.js源码 93.8k: _https://github.com/mrdoob/three.js/_

\[3\]

大咖面对面: _https://live.juejin.cn/4354/three-js_

\[4\]

Babylon.js官网: _https://www.babylonjs.com/_

\[5\]

Babylon.js源码 21.2k: _https://github.com/BabylonJS/Babylon.js_

### 参考资料  

\[1\]

_https://www.sitepoint.com/three-js-babylon-js-comparison-webgl-frameworks/_

\[2\]

_https://dev.to/mohammadrahi/comparing-threejs-and-babylonjs-which-javascript-3d-library-is-right-for-you-50nj_

### **感谢您的阅读**![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)