## 前言

最近在社区看到很多类似 `typescript` 不适合写业务的言论，我觉得这些言论都是基于一些误解，用好 `typescript` 对业务代码的健壮性和可维护性是有很大帮助的，本文就来聊聊如何用好 `typescript`。

## 为什么你会觉得 `typescript` 不适合写业务

我们就用后台业务最常见的 `Form`,`Table` 页面来聊聊，你为什么会觉得 `typescript` 不适合写业务

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibsJN20iaCjKCicyeQb0m3fA05YHoDibfjCXRo3KB1CUiaXibw3KLuR38GCFlDIp9jhAVaRh53ybsoPDwyg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

首先,对于这个常见的页面，我们所有的查询操作都是基于列表的查询接口。而列表查询接口所有的参数，不管是 `page`, `size` 还是各种 `filter` 都会最终影响你表格数据的展示。

所以对于这类页面最常见的一个操作就是把这些参数都放到 你的 `deps` 中，我们只需要改变 `deps` 中的值，就会自动触发 `useEffect` 请求数据。当然，如果你使用了 `swr` `react-query` 这类请求库，`deps` 就应该换成 `key`。

下面我用 `swr` 一个常见的列表接口来举例。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;useSWR&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'swr'</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;swr&nbsp;传了范型这里&nbsp;axios&nbsp;的输入输出可以不用写，但是为了方便理解以及照顾不用&nbsp;swr&nbsp;的朋友，我还是写了</span><br><span data-darkreader-inline-color="">//&nbsp;不用&nbsp;axios&nbsp;的朋友换成自己项目的请求就好了</span><br><span data-darkreader-inline-color="">const</span>&nbsp;fetcher&nbsp;=&nbsp;<span>(<span>[url,&nbsp;params]:&nbsp;[url:&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;params:&nbsp;ListParams]</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;req_get&lt;ListOutput,&nbsp;ListParams&gt;<span>(<span>url,&nbsp;params</span>).<span>then</span>(<span>(<span>res</span>)&nbsp;=&gt;&nbsp;res.data</span>);<br>};<br><br><span>function</span>&nbsp;<span>useList</span>(<span>params:&nbsp;ListParams</span>)&nbsp;{<br>&nbsp;&nbsp;<span>const</span>&nbsp;{<span>data</span>,&nbsp;<span>isLoading</span>}&nbsp;=&nbsp;<span>useSWR</span>&lt;<span>ListOutput</span>&gt;(<span>['/api/list',&nbsp;params],&nbsp;fetcher</span>);<br>&nbsp;&nbsp;<span>return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>data</span>:&nbsp;<span>data</span>?.<span>list</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>count</span>:&nbsp;<span>data</span>?.<span>count</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>isLoading</span>,<br>&nbsp;&nbsp;};<br>}<br><br></span></code>
```

可以看到，相比 `javascript` ，需要额外做的工作其实就是定义参数类型 `ListParams` 和接口返回的类型 `ListOutPut`。（`ListParams` 也是我们需要定义的 `state` 的类型）

只要定义好了输入和输出的类型，`typescript` 就会帮你做好类型检查，并做好代码提示。这样你就不用担心参数传错了，或者接口返回的数据类型不对了, 也不用担心 `data` 为空的时候，出现以下常见的错误提示

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Cannot&nbsp;<span data-darkreader-inline-color="">read</span>&nbsp;properties&nbsp;of&nbsp;undefined&nbsp;(reading&nbsp;<span data-darkreader-inline-color="">'xxx'</span>)<br></code>
```

很多人觉得 `typescript` 不适合写业务，我想是因为他们觉得定义类型，特别是一些复杂的类型是一件很麻烦的事情。

如果体验过 tRPC , 或者 `graphql-codegen` 的话，你就会发现，其实这些类型都是可以复用的。我们的后台一般都是用强类型语言编写的。他们在写接口的时候，其实已经定义好了这些类型，我们只需要把这些类型拿过来就好了。

但是我们大多数人的项目前后端都不是一个仓库，也不是 `graphql` , 那么我们怎么拿到这些类型呢？

## OpenAPI

OpenAPI规范（以前称为Swagger规范）是一种机器可读的接口定义语言规范，用于描述，生成，使用和可视化Web服务。它以前是Swagger框架的一部分，在2016年成为一个独立的项目，由Linux基金会的一个开源协作项目OpenAPI Initiative监督。

如果你的项目遵循 `OpenAPI` 规范，后台会给你一个 `swagger` 文档。那么恭喜你，你可以直接用 `swagger` 生成的 `typescript` 类型。

如果你在 `github` 上用 `openapi` , `codegen` , `swagger` 之类的关键词搜索，你会发现有很多开源的工具可以帮你生成 `typescript` 类型。

甚至有很多项目会直接帮你生成接口，但是我觉得自动生成接口这种东西如果你自己用 `node` 写一个类似的工具会更加符合你的业务需求。我们需要的仅仅是开箱即用，生成类型

## 生成类型

我就用我们项目中常用的 `openapi-typescript` 来举例，选择他的原因纯粹是因为够简单,你可以自由选择你要的工具。首先安装

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;选择 5.4.1 版本，原因后面会说。使用 npm 的自行翻译一下<br>yarn&nbsp;add&nbsp;-D&nbsp;openapi-typescript@5.4.1<br></code>
```

然后在 `package.json` 中配置

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//没有&nbsp;prettier&nbsp;的话，不要&nbsp;--c&nbsp;.prettierrc.js</span><br>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"scripts"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"codegen"</span>:&nbsp;<span data-darkreader-inline-color="">"npx&nbsp;openapi-typescript&nbsp;这里你填你swagger.json的地址&nbsp;--c&nbsp;.prettierrc.js&nbsp;--make-paths-enum&nbsp;&nbsp;&nbsp;--output&nbsp;./src/ApiInterface.ts"</span>,<br>&nbsp;&nbsp;}<br>}<br><span data-darkreader-inline-color="">//&nbsp;这里的&nbsp;--make-paths-enum&nbsp;是为了生成路径的枚举</span><br><span data-darkreader-inline-color="">//&nbsp;最新版本去掉了这个功能，我觉得这个功能很实用，所以我选择了&nbsp;5.4.1&nbsp;版本</span><br></code>
```

然后我们每次运行 `yarn codegen` 就可以生成 `ApiInterface.ts` 文件了。

以我们的一个真实项目为例子，首先我们来看生成的路径枚举![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有了路径枚举我们就不需要自己写路径了，直接用枚举就好了，这样就不会出现路径写错的问题了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

hight.gif

然后我们来看看生成的类型![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到我们主要想要的都是 `components` 下的 `schemas` 类型。像上个 gif 一样，我们可以定义一个类型

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;components&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@/ApiInterface'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;ApiInterface&nbsp;=&nbsp;components[<span data-darkreader-inline-color="">'schemas'</span>]<br></code>
```

这样，我们就不再需要自己来手动定义输入输出的类型了，就可以愉快的回车到底了

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

code.gif

## 总结

这种方案虽然不如 `tRPC` 那样直接复用一个类型，后台只要更改类型，前端就会报错。但是 `tRPC` 迁移的成本是很高的，而且很多公司的后台都不是用 `typescript` 写的，但是很多公司都会遵循 `OpenAPI` 规范。

如果后台改了接口，只需要运行一下 `yarn codegen`，编辑器就会自动给你提示哪些地方需要修改，你就会觉得 `typescript` 写业务也是一件很愉快的事情了。

最后，希望本文能对你有所帮助，以上。

-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2023 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！