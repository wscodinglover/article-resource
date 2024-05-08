![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/XkJj1PGrCcWpk4VRpQiasWsKEElLLAKWTCT0jgrTlbPQwwNIgJGxuictpTCqd1ECrMXlOob9iaf5XmJnKzPIiaiathw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



## 前言

之前开源了 babel-plugin-enhance-log<sup data-darkreader-inline-color="">[1]</sup>，也通过写了文章<sup data-darkreader-inline-color=""><a localeditorid="jyj1jdxfl14aqtlqtc" href="https://mp.weixin.qq.com/s?__biz=MzkwMTI4MjgxNA==&amp;mid=2247484402&amp;idx=1&amp;sn=0f1acff92580c02f7f1758ff3fa4b114&amp;scene=21#wechat_redirect" textvalue="偏爱console.log的你，肯定会觉得这个插件泰裤辣！" target="_blank" data-linktype="2">偏爱console.log的你，肯定会觉得这个插件泰裤辣！</a></sup>来分享该插件如何使用，不过，看到评论里面有好几个都在问 vite+vue 如何使用：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/XkJj1PGrCcX9ibfm7HsmE2KUEjNwKyJgnic60Jw5iaaawb3LtJxYicCFr4QvEVYlnes37nebvgKPqL0dYGRmqYibTnQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我稍微看了下，vite+vue 使用的是 esbuild，没有用到 babel，确实没法直接使用。但既然有小伙伴需要，我则尽量满足。所以抱着试试的心态看能否实现，幸好，皇天不负有心人，经过昨天几个小时的折腾，终于将其开源 👉🏻 vite-plugin-enhance-log<sup data-darkreader-inline-color="">[2]</sup>，有兴趣可以看看~

## 咋使用捏，先安装呗 📦

国际惯例，先安装插件

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;add&nbsp;vite-plugin-enhance-log&nbsp;-D<br><span data-darkreader-inline-color="">#</span><span>&nbsp;or</span><br>yarn&nbsp;add&nbsp;vite-plugin-enhance-log&nbsp;-D<br><span data-darkreader-inline-color="">#</span><span>&nbsp;or</span><br>npm&nbsp;i&nbsp;vite-plugin-enhance-log&nbsp;-D<br></code>
```

## vue 中如何使用

然后再 vite.config.ts 里面配置即可，比如 vue：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vite'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;Vue&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@vitejs/plugin-vue'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;EnhanceLog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vite-plugin-enhance-log'</span><br><br><span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;Vue(),<br>&nbsp;&nbsp;&nbsp;&nbsp;EnhanceLog({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;splitBy:&nbsp;<span data-darkreader-inline-color="">';'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preTip:&nbsp;<span data-darkreader-inline-color="">'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;],<br>})<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;config<br></code>
```

> ⚠️ 请确保 EnhanceLog 在@vitejs/plugin-vue 后面

跑项目后就有这效果啦：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## react 呢？

react 里面实际上有两种：

1.第一种还是使用 babel-plugin-enhance-log，然后再 react 插件里面配置即可：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;react({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;babel:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;plugins:&nbsp;[<span data-darkreader-inline-color="">'enhance-log'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;]<br>&nbsp;&nbsp;})<br></code>
```

2.跟 vue 一样，使用 vite-plugin-enhance-log

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;defineConfig&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vite'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;react&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@vitejs/plugin-react'</span><br><span data-darkreader-inline-color="">import</span>&nbsp;EnhanceLog&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'vite-plugin-enhance-log'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;defineConfig({<br>&nbsp;&nbsp;plugins:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;react(),<br>&nbsp;&nbsp;&nbsp;&nbsp;EnhanceLog({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;splitBy:&nbsp;<span data-darkreader-inline-color="">'\n'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}),<br><br>&nbsp;&nbsp;],<br>})<br></code>
```

## 通过 playgrounds 来了解其他参数吧

实际上 vite-plugin-enhance-log 已经尽量做到开箱即用了，但如何你想要自定义，可以把项目拉下来，看下 playgrounds 里面是vue<sup data-darkreader-inline-color="">[3]</sup>或者react<sup data-darkreader-inline-color="">[4]</sup>是如何使用的。

以下是目前提供的参数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">interface</span>&nbsp;Options&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;打印文件名<br>&nbsp;&nbsp;&nbsp;*&nbsp;如果你文件名太长，希望不显示文件path的目录，比如src/pages/xxx/yyy/a.tsx,&nbsp;那么可以配置enableDir为false，则只打印a.tsx<br>&nbsp;&nbsp;&nbsp;*<br>&nbsp;&nbsp;&nbsp;*&nbsp;@default&nbsp;true<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;enableFileName?:&nbsp;<span data-darkreader-inline-color="">boolean</span>&nbsp;|&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;enableDir?:&nbsp;<span data-darkreader-inline-color="">boolean</span><br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;打印的前缀提示，这样方便快速找到log&nbsp;🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀<br>&nbsp;&nbsp;&nbsp;*&nbsp;@example<br>&nbsp;&nbsp;&nbsp;*&nbsp;console.log('&nbsp;🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀',&nbsp;...)<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;preTip?:&nbsp;<span data-darkreader-inline-color="">string</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;每个参数分隔符，默认空字符串，你也可以使用换行符\n，分号；逗号，甚至猪猪🐖都行~&nbsp;*/</span><br>&nbsp;&nbsp;splitBy?:&nbsp;<span data-darkreader-inline-color="">boolean</span><br>}<br></code>
```

我们来一个个了解。

## 👇 例子

拉项目后通过运行启动 playgrounds：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;play&nbsp;#&nbsp;对应vue<br><span data-darkreader-inline-color="">#</span><span>&nbsp;或者</span><br>pnpm&nbsp;play:react&nbsp;#&nbsp;对应react<br></code>
```

来启动项目。

比如说，你不喜欢小 🚀，你喜欢猪猪 🐖，那可以配置 preTip 为 🐖🐖🐖🐖🐖🐖🐖🐖🐖🐖：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比如说，在参数较多的情况下，你希望 log 每个参数都换行，那可以配置 splitBy 为 \\n：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

或者分隔符是;:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当然，你也可以随意指定，比如用个狗头 🐶 来分隔：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比如说，你希望知道 log 所在的文件名，那么可以配置 enableFileName 为 true（当然默认就是 true）：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果文件路径太长:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你只希望打印文件名，不需要目录前缀，那么可以配置 `enableFileName: { enableDir: false }`:

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当然，你不希望打印文件名的话，把 enableFileName 设为 false 就好啦。

## 目前存在的问题 ☹️

用过 babel-plugin-enhance-log 的肯定知道插件会自动打印 log 所在行，虽然说我在做 vite-plugin-enhance-log 的时候也可以拿到行数，但是由于输入代码已经被处理过一遍，导致跟真正的源码有所出入，可以通过 vite-plugin-inspect 看到效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后我也没法拿到之前的 sourcemap，所以导致拿到代码行数有所出入

> 我日常工作都是使用webpack，vite不是特别熟，有知道怎么解决的大佬还请指教下，或者提个 pr，谢谢，谢谢！

## 最后

本文介绍了 vite-plugin-enhance-log 插件的由来，尽量满足了 vite+vue 中实现同等的 babel-plugin-enhance-log 功能，同时也支持了打印文件名的功能，但是由于没有拿到正确的代码行，所以目前版本把相关行功能的代码暂时注释了。

好了，文章是在顺风车上敲的，今天是周一，好困呀，我要去睡觉啦~

### 参考资料

\[1\]

babel-plugin-enhance-log: _https://github.com/baozouai/babel-plugin-enhance-log_

\[2\]

vite-plugin-enhance-log: _https://github.com/baozouai/vite-plugin-enhance-log_

\[3\]

vue: _https://github.com/baozouai/vite-plugin-enhance-log/blob/master/playgrounds/vue/vite.config.ts_

\[4\]

react: _https://github.com/baozouai/vite-plugin-enhance-log/blob/master/playgrounds/react/vite.config.ts_