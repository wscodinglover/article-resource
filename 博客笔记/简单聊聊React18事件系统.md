## 前言

在进入正题之前，我们先思考一个问题，那就是事件系统重要吗？

事实上，前端应用因为离用户最近，所以会有很多交互逻辑，就会有很多事件与之绑定。正是有这些事件，才让页面‘活’起来，才能让用户通过浏览器完成想要做的事情。**所以事件系统对于用户是非常重要的。**

## 一、React事件系统介绍

对于不同的浏览器，对事件存在不同的兼容性，React 想实现一个兼容全浏览器的框架， 为了实现这个目标，就需要创建一个兼容全浏览器的事件系统，以此抹平不同浏览器的差异。

所以 React 也开发了一套自己的事件系统。正常在 React 中绑定事件，如下所示：

```
<span>const handleClick = ()=&gt;{console.log('冒泡阶段执行')}</span>
```

如上所示,给按钮绑定了一个 onClick事件，事件处理函数是 handleClick，那么真的就给 button 元素绑定事件了吗？实际上并没有，为了证实这一点，打开浏览器调试工具，如图1所示：

![Image](https://mmbiz.qpic.cn/mmbiz_png/3Ud2jCC78QicwTTs4aCy67WjBk5j6889YYdCF4Gu2CFmUgC8icyhuffa1uldDHqcoap2jl9exkibTibPd6XcZX31Lg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

图1

可以看到在 Event Listeners 中，button的处理事件并不是 handleClick，而是一个空函数 noop，这个函数是React底层绑定的。通过上面我们能知道，在 React 应用中，我们所看到的 React 事件都是‘假’的！主要体现在：

（1）给元素绑定的事件，不是真正的事件处理函数。

（2）甚至在事件处理函数中拿到的事件源e，也不是真正的事件源e。

**1．事件系统介绍**

在传统的 DOM 事件中，事件模型是这样样的：事件捕获阶段 -> 事件执行阶段 -> 事件冒泡阶段。

在React应用中，也可以让事件执行在捕获阶段，或者是冒泡阶段，以点击事件为例子，当给元素绑定onClick，执行时机类似于冒泡阶段，当给元素绑定onClickCapture，执行时机就类似于捕获阶段，我们来看一个Demo，如下所示：

```
<span>function Index(){</span>
```

通过onClick、onClickCapture和原生的DOM监听器给元素button绑定了三个事件处理函数，当触发一次点击事件的时候，处理函数的执行，打印顺序如下所示：

捕获阶段执行 -> 事件监听 -> 冒泡阶段执行。

通过上面的打印结果，可以明白：

冒泡阶段：开发者正常给 React 绑定的事件，比如onClick、onChange，执行时机类似于冒泡阶段。

捕获阶段：如果想要在类似捕获阶段执行，可以将事件后面加上Capture后缀，比如 onClickCapture、onChangeCapture。

阻止事件冒泡：

```
<span>function Index(){</span>
```

React 阻止冒泡和原生事件中的写法差不多，当handleClick上阻止冒泡，父级元素的 handleFatherClick 将不再执行，但是内部实现上和原生的事件有差异。

**2.阻止默认行为**

React 阻止默认行为和原生的事件也有一些区别。

原生事件：e.preventDefault() 和return false可以用来阻止事件默认行为，由于在React中给元素的事件并不是真正的事件处理函数，所以导致return false方法在 React 应用中完全失去了作用。

Reac事件：在 React 应用中，可以用 e.preventDefault() 阻止事件默认行为，这个方法并非是原生事件的 preventDefault，由于React事件源e也是独立组建的，所以preventDefault也是单独处理的。

## 二、事件系统设计

明白了 React 事件流中一些基础细节之后，我们来看一下 React 事件系统是如何设计的。

**1.事件可控性**

我们知道在 React 运行时中，有一个状态可以反映出当前更新上下文状态，那就是ExecutionContext，在React事件系统中触发的事件，ExecutionContext会合并 EventContext，接下来在执行上下文中，就可以通过EventContext判断是否是事件内部触发的更新，也就能方便做一些事情，比如像legacy模式的批量更新。

设想一下，如果给真实的DOM绑定事件的话，那么用户触发DOM事件，React就不能及时感知到有事件触发了，即便是可以通过事件监听器的方式，但是也很难改变事件触发的上下文，还是前面的例子，如何让事件执行的时候，能够判断ExecutionContext中存在 EventContext，并且当事件执行完毕后，可以重置ExecutionContext状态。

能够解决上面问题的就是，让React能够感知到事件的触发，并且让事件变成可控的。这样给onClick绑定的事件处理函数handleClick就不能直接绑定在原生 DOM 上，而是由外层 App 统一做事件代理，再主动去改变上下文状态，并且执行事件处理函数。逻辑类似如下：

```
<span>/* 改变状态 */</span>
```

**2.跨平台兼容**

React 并不仅仅能够运行在 Web 平台，同样也适用于一些跨端的场景，比如 Taro RN，微信小程序等，在这些跨平台场景中，是不能给元素绑定事件的，以微信小程序来说，虽然微信小程序是采用Webview的方式，但是对于原生DOM的操作，小程序并没有给开发者开口子，也就是说小程序里如果想要使用 React框架，就不能使用DOM的相关操作，也就不能直接绑定事件。但是 React事件系统的设计，就能够解决这个问题，因为 React的独立的事件系统，能够把原生 DOM元素和事件执行函数隔离开来，统一管理事件，这样事件的触发由DOM层面变成了JS层面。为React做跨平台兼容提供了技术支撑。

**3.事件合成机制**

React 对于事件的处理有一种事件合成的机制，首先需要弄清楚什么是事件合成？

本质上来说就是一个React事件，可能由多个原生事件合成。比如给input绑定一个onChange事件。

```
<span>function Index(){</span>
```

在原生DOM中是没有onChange事件的，对于onChange事件，原生事件中会有多个事件与之对应。比如上面onChange事件，会绑定 blur、change、focus、keydown、keyup等多个事件。

在React应用中，元素绑定的事件并不是原生事件，而是React合成的事件，比如onClick是由click合成，onChange是由 blur、change、focus 等多个事件合成。底层React用一个对象registrationNameDependencies保存React事件和合成的原生事件的映射关系。我们来看一下这个对象，如图2所示。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图2

当然上面只是对象的一部分。事件系统大致思路：在React中有一套事件系统来处理DOM事件，React的事件系统大致可以分为三个部分来消化。

第一个部分是事件合成系统，根据运行的平台，做事件的初始化操作。第二个就是在一次渲染过程中，收集并处理标签中的事件。第三个就是一次用户交互，事件触发，到事件执行一系列过程。

我们看一下这三个部分的关联和每一个部分都做了哪些事情。

上面说到，React中的事件并不是注册到真实DOM中的，而是通过事件系统统一处理的，首先就需要事件系统在初始化的时候，统一监听注册这些事件。在React V18新版本中，会在入口函数中，统一注册并监听事件，并且是在React root挂载容器上。在新版本React中，入口文件应该像如下的样子：

```
<span>const root = ReactDOM.createRoot(document.getElementById('app'))</span>
```

这个App就是绑定事件监听器的容器。在React V17 之前，React事件都是绑定在 document 上，React V17 之后，React把事件绑定在应用对应的容器container上，将事件绑定在同一容器统一管理。事件绑定采用的是 addEventListener 的方式。

**4.事件统一处理函数**

以React中点击事件为例子，本质上都是通过addEventListener进行监听的，但是处理点击事件的函数只有一个，在事件处理函数中，可以通过事件源来找到点击事件到底发生在哪个 DOM 上，这个方式在传统的事件流中叫作事件委托。

而在React中，也是收敛到一个函数中去执行，也就是说，当项目有很多个按钮，无论点击哪个按钮，都会由同一个函数去处理并执行，这个函数就是dispatchEvent。

**5.冒泡和捕获的处理**

明白了事件注册之后，那么还有一个问题，就是事件冒泡和捕获是如何处理的呢? 为什么onClick会在事件冒泡阶段执行，而onClickCapture会在事件捕获阶段执行呢？

想要解决这个问题也很容易，还是拿点击事件click为例子，addEventListener在绑定事件的时候，可以通过第三个参数来确定是在冒泡阶段执行，还是在捕获阶段执行：

```
<span>addEventListener(type, listener, useCapture)</span>
```

第一个参数，事件名称，字符串，必填，比如 click。第二个参数，执行函数，必填。第三个参数，触发类型，布尔型，可以为空。true  事件在捕获阶段执行，false 事件在冒泡阶段执行，默认是 false。

言归正传，在绑定事件监听器的时候，绑定两次就可以了，也就是在冒泡和捕获阶段各绑定一次。

```
<span>addEventListener('click',dispatchEvent$1,true)</span>
```

这样 onClick 事件就可以在冒泡阶段执行，onClickCapture 事件也可以在捕获阶段执行了。

**6.收集预处理事件**

在整个应用渲染阶段的时候，遍历fiber节点的时候，会对比props中的属性，来对事件做预处理，在老版本 React 事件系统中，事件函数是在这个阶段绑定的。

**7.事件执行**

如果触发一次点击事件，那么在新版React中会触发两次React的统一处理函数：第一次是捕获执行，onClick就会在此执行。第二次是冒泡执行，onClickCapture也会执行了。这样就保证了事件处理函数（例如onClick和onClickCapture）与原生的事件流保持一致。

## 三、新老版本事件系统差异

老版本事件系统，在 React V17 以前的版本中，对于事件系统的处理有一些不同之处。我们还是以刚开始的Demo为例子，当给button元素绑定 onClick、onClickCapture时，还有一个事件监听器，当触发点击事件的时候，新老版本打印的差异如下：

新版本事件系统：捕获阶段执行 -> 事件监听 -> 冒泡阶段执行。

老版本事件系统：事件监听 -> 捕获阶段执行 -> 冒泡阶段执行。

从前面直观地看出新版本的事件是最接近原生的事件流的，老版本事件系统执行顺序差别更大一些，至于为什么我们马上会讲到。

对于新老版本事件系统差异，还是比较大的，可以从事件初始化，事件执行差异，事件收集差异。

**1.初始化差异**

与新版本不同的是，老版本事件系统初始化过程中，并没有直接注册事件，取而代之的是形成了一个事件插件对象 registrationNameModules。

React有一种事件插件机制，比如上述onClick和onChange，会有不同的事件插件 SimpleEventPlugin、ChangeEventPlugin处理，先不必关心事件插件做了些什么，在后面会有相关的介绍。我们看一下老版本 registrationNameModule 长什么样子：

```
<span>const registrationNameModules = {</span>
```

registrationNameModules 记录了React事件（比如onBlur）和与之对应的处理插件映，比如上述的onClick，就会用SimpleEventPlugin 插件处理，onChange就会用ChangeEventPlugin处理。应用于事件触发阶段，根据不同事件使用不同的插件。

为什么要用不同的事件插件处理不同的React事件? 首先对于不同的事件，有不同的处理逻辑；对应的事件源对象也有所不同，React的事件和事件源是自己合成的，所以对于不同事件需要不同的事件插件处理。

**2.事件收集差异**

在老版本事件系统中，在渲染阶段会执行事件的收集和绑定，上面说到在老版本事件系统中，初始化阶段，会处理props，比如发现了onClick事件，那么才向外层容器中绑定 click 事件，如果发现了onChange事件，才向容器中绑定 blur、change、focus 等事件，而不是在初始化过程中统一绑定的。

**3.事件执行差异**

在事件执行阶段，老版本和新版本的事件系统也有本质的区别：

新版本事件系统会触发两次事件，分别是冒泡和捕获事件，优先执行捕获事件，onClickCapture等事件。接下来执行冒泡事件，onClick事件。

在老版本事件系统中，只会执行一次事件，本质上是在冒泡阶段执行的。而捕获阶段执行的事件，是事件系统模拟的。具体如何模拟的呢？React 会在事件底层用一个数组队列来收集fiber 树上一条分支上的所有的onClick和onClickCapture事件，遇到捕获阶段执行的事件，比如onClickCapture，就会通过unshift放在数组的前面，如果遇到冒泡阶段执行的事件，比如onClick，就会通过push放在数组的后面，最后依次执行队列中的事件处理函数，模拟事件流。这个就是为什么老版本的事件系统执行时机和真实的事件流相差很大的原因。

最后我们用一幅图描述一下，新老版本事件系统的差异，如图3所示。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)图3

## 四、图书推荐

点击封面图片，了解图书详情

本书讲述了React各个模块基础和进阶用法，并提供了相应的案例。还深入分析了React内部运转机制，同时详细介绍了React配套的生态系统。本书共14章，包括邂逅React、了解JSX、React组件、React更新驱动、React生命周期、React状态获取与传递、工程化配置及跨平台开发、React架构设计、高性能React、React运行时原理探秘、玩转React Hooks、React-Router、React-Redux状态管理工具和React实践。

本书适合具有一定React开发基础，但希望更加全面、深入理解React的前端开发者阅读。

**大咖推荐**  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

****作者介绍****

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**内容结构及配套资源**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

\-End-

撰  稿  人：计旭

责任编辑：张淑谦

审  核  人：时静