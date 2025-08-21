![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDxd59X8eG63vGpjBVO2Hzmcvltibrx0r8ic6R9ibibFgdho8ZM4yYrVB5oA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

端午三天，你们在放假，而我，一个人躲在家里，苦练 tailwindcss。

我在准备这样一个学习项目，它与传统的文章/视频类学习不同，我会在教程中内置大量的**可交互**案例，**提供沉浸式的学习体验**，并且还可以支持实时修改代码观察案例更改结果。大家可以期待一下。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDbMtJJC7U07ZvvoGPDmt5jibkzfYhVmLhvHrMpQElBywpcic1t2QxtjeQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

经过这个项目的历练，现在，我已熟练度拉满，彻底拿捏了 tailwindcss。

魔功大成！

这篇文章，就跟大家分享一下我在 tailwindcss 中已经使用到的高级用法。

-   一、彻底读懂配置文件 tailwind.config.js
    
-   二、定义自己喜欢的语法
    
-   二、定义自己喜欢的功能块
    
-   三、定义自己想要的插件
    
-   三、高级用法：简单实现皮肤切换
    

## _0_

**高端，从读懂配置文件开始**

在使用 tailwindcss 时，我们可以在项目根目录创建一个配置文件 `tailwind.confing.js`，用于控制 tailwindcss 的语法，理论上来说，你可以把 tw 调整成任何你需要的形状。

使用如下指令，可以在根目录创建一个最简单的配置文件模板

```
npx&nbsp;tailwindcss&nbsp;init<br>
```

```
<span>/**&nbsp;<span>@type&nbsp;<span>{import('tailwindcss').Config}</span>&nbsp;</span>*/</span><br><span>module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>content</span>:&nbsp;[],<br>&nbsp;&nbsp;<span>theme</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>extend</span>:&nbsp;{},<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span>plugins</span>:&nbsp;[],<br>}<br>
```

**content**

content 选项是一个数组，用于指定 tailwindcss 语法生效的文件集合。

```
content:&nbsp;[<br>&nbsp;&nbsp;<span>'./pages/**/*.{js,jsx}'</span>,<br>&nbsp;&nbsp;<span>'./components/**/*.{js,jsx}'</span>,<br>&nbsp;&nbsp;<span>'./app/**/*.{js,jsx}'</span>,<br>&nbsp;&nbsp;<span>'./src/**/*.{js,jsx}'</span>,<br>]<br>
```

tailwind 使用 `fast-glob` 库来匹配文件。其中，`*` 匹配任意字符，`**` 匹配 0 个或者多个目录，`{js, jsx}` 匹配多个值。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClD0uLN9cXia3ZURz8Gnd8RyIhLIJporpVt78R7SdET3dBNkuhDBtGYoUQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

配置完之后的文件数量越多，编译时的压力就越大，因此我们应该尽可能缩小 tailwindcss 的配置范围，只在需要它的地方使用。例如 `utils` 目录可能会包含大量的文件，但是不会使用 tailwindcss，那么我们就应该把他剔除掉。

当然我们还可以做其他的一些配置增强，但是大多都没什么用，对我来说，这里一个比较有用的配置项是 `transform`。我写的文章内容，源文件是 `.md` 格式，此时如果我想要在 `.md` 中使用 tailwindcss，那么就需要将其转换为 `html` 之后再适配 tailwindcss，我们就可以这样配置

```
<span>const</span>&nbsp;remark&nbsp;=&nbsp;<span>require</span>(<span>'remark'</span>)<br><br><span>module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>content</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>files</span>:&nbsp;[<span>'./src/**/*.{html,md}'</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>transform</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>md</span>:&nbsp;<span>(<span>content</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;remark().process(content)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span>//&nbsp;...</span><br>}<br>
```

**theme**

theme 字段的配置是我们拿捏 tailwindcss 的核心关键。我们可以通过这个字段自定义任意语法。但是这个语法新人玩家容易看不懂，一长串不知道如何使用。我给大家讲解一下很快就很搞懂了

首先，`theme` 中包含了大量的字段，这些字段有 `colors`，`textColor`，这个是啥意思呢？就很迷惑。

> ✓
> 
> 我们可以在这个地址中，查看默认的完整配置项 https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L5

其实，我们只需要利用好官方文档，就能很轻松的搞懂这些配置。theme 中的字段主要分为两类，一类表示 css 属性。一类表示配置。

例如在配置文件中，有一个 `borderWidth`的配置如下

```
borderWidth:&nbsp;{<br>&nbsp;&nbsp;<span>DEFAULT</span>:&nbsp;<span>'1px'</span>,<br>&nbsp;&nbsp;<span>0</span>:&nbsp;<span>'0px'</span>,<br>&nbsp;&nbsp;<span>2</span>:&nbsp;<span>'2px'</span>,<br>&nbsp;&nbsp;<span>4</span>:&nbsp;<span>'4px'</span>,<br>&nbsp;&nbsp;<span>8</span>:&nbsp;<span>'8px'</span>,<br>},<br>
```

这看上去像是一个 css 属性，又像是一个配置项，那么我们可以去官方文档的如下地址中，直接查这个单词. 点开之后发现，这里确实是一个属性值。并且具体的缩写与写法，配置参数都一目了然，比只看官方文档更加具体。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDGbQWtnWsRNVdzicdPibWxgib4pibGJksFoJYs5gRGfciaHprgscclymP0XQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

又例如，我们在配置项中发现了一个属性 `spacing`

```
spacing:&nbsp;{<br>&nbsp;&nbsp;<span>px</span>:&nbsp;<span>'1px'</span>,<br>&nbsp;&nbsp;<span>0</span>:&nbsp;<span>'0px'</span>,<br>&nbsp;&nbsp;<span>0.5</span>:&nbsp;<span>'0.125rem'</span>,<br>&nbsp;&nbsp;<span>1</span>:&nbsp;<span>'0.25rem'</span>,<br>&nbsp;&nbsp;<span>1.5</span>:&nbsp;<span>'0.375rem'</span>,<br>&nbsp;&nbsp;<span>2</span>:&nbsp;<span>'0.5rem'</span>,<br>&nbsp;&nbsp;<span>2.5</span>:&nbsp;<span>'0.625rem'</span>,<br>&nbsp;&nbsp;<span>3</span>:&nbsp;<span>'0.75rem'</span>,<br>&nbsp;&nbsp;<span>3.5</span>:&nbsp;<span>'0.875rem'</span>,<br>&nbsp;&nbsp;<span>4</span>:&nbsp;<span>'1rem'</span>,<br>&nbsp;&nbsp;<span>5</span>:&nbsp;<span>'1.25rem'</span>,<br>&nbsp;&nbsp;<span>6</span>:&nbsp;<span>'1.5rem'</span>,<br>&nbsp;&nbsp;<span>7</span>:&nbsp;<span>'1.75rem'</span>,<br>&nbsp;&nbsp;<span>8</span>:&nbsp;<span>'2rem'</span>,<br>&nbsp;&nbsp;<span>9</span>:&nbsp;<span>'2.25rem'</span>,<br>&nbsp;&nbsp;<span>10</span>:&nbsp;<span>'2.5rem'</span>,<br>&nbsp;&nbsp;<span>11</span>:&nbsp;<span>'2.75rem'</span>,<br>&nbsp;&nbsp;<span>12</span>:&nbsp;<span>'3rem'</span>,<br>&nbsp;&nbsp;<span>14</span>:&nbsp;<span>'3.5rem'</span>,<br>&nbsp;&nbsp;<span>16</span>:&nbsp;<span>'4rem'</span>,<br>&nbsp;&nbsp;<span>20</span>:&nbsp;<span>'5rem'</span>,<br>&nbsp;&nbsp;<span>24</span>:&nbsp;<span>'6rem'</span>,<br>&nbsp;&nbsp;<span>28</span>:&nbsp;<span>'7rem'</span>,<br>&nbsp;&nbsp;<span>32</span>:&nbsp;<span>'8rem'</span>,<br>&nbsp;&nbsp;<span>36</span>:&nbsp;<span>'9rem'</span>,<br>&nbsp;&nbsp;<span>40</span>:&nbsp;<span>'10rem'</span>,<br>&nbsp;&nbsp;<span>44</span>:&nbsp;<span>'11rem'</span>,<br>&nbsp;&nbsp;<span>48</span>:&nbsp;<span>'12rem'</span>,<br>&nbsp;&nbsp;<span>52</span>:&nbsp;<span>'13rem'</span>,<br>&nbsp;&nbsp;<span>56</span>:&nbsp;<span>'14rem'</span>,<br>&nbsp;&nbsp;<span>60</span>:&nbsp;<span>'15rem'</span>,<br>&nbsp;&nbsp;<span>64</span>:&nbsp;<span>'16rem'</span>,<br>&nbsp;&nbsp;<span>72</span>:&nbsp;<span>'18rem'</span>,<br>&nbsp;&nbsp;<span>80</span>:&nbsp;<span>'20rem'</span>,<br>&nbsp;&nbsp;<span>96</span>:&nbsp;<span>'24rem'</span>,<br>},<br>
```

然后对应去官方文档查一下，发现这是一个配置项。那么我们就可以知道，这可能会作为入参运用到其他属性的设置中去。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClD1ZQ00USDX6zzR7c4A3j7RhEugicuT3iamrclgLuFkzbV8ZheJx3eSbiaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> ✓
> 
> 我们也可以自己定义非 rem 的属性单位，使用数组遍历的方式生成 1px -> 500px 中比较常用的一些数值，具体要结合实际情况和设计规范来约定它的配置

有了这个配置项之后，我们就可以使用它作为入参去配置其他 css 属性，例如 margin 值。这里的 `theme` 表示一个 get 方法，可以获取到 `theme` 配置项中对应属性的具体值。例如这里的 `theme('spacing')` 就是获取到我们刚才的配置项

```
margin:&nbsp;<span>(<span>{&nbsp;theme&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;({<br>&nbsp;&nbsp;<span>auto</span>:&nbsp;<span>'auto'</span>,<br>&nbsp;&nbsp;...theme(<span>'spacing'</span>),<br>}),<br>
```

这样，margin 写法后面跟的数字，就是我们约定的 `spacing` 中具体的值了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDvTxoVMHHXmQ5W7Ap3JqcdCqbJwDEDaYiamNWnejU6JjHIEVIiaibkTibuw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

`m-0.5` ，对应的值，就是 `spacing` 中的 `0.5:0.125rem`

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDaXzqlLOdj50SICrOaMHtLyVgeD37vTNGicQ9ZC4uacC57SdUITBkyAg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

theme 中的大多数属性值，都是 css 属性值，只有少数几个值是表示配置项，具体内容不用刻意去记忆，只需要在用到的时候查阅文档即可。如果你只是需要做简单粗暴的自定义修改，直接在默认配置的基础之上修改样式就可以

## _1_

**定义自己喜欢的语法**

自定义语法更好的方式是使用 `extend` 配置去覆盖原有配置项。例如，我想要重新针对 `background-color` 定义一个语法写法如下，使用黑色的拼音缩写来表达颜色，使用数字来表示不同程度的黑色

```
<span>bg-heise-0</span><br><span>bg-heise-1</span><br><span>bg-heise-2</span><br><span>bg-heise-3</span><br><span>bg-heise-4</span><br>
```

首先我们要做的第一件事情，是在官方文档中，找到 `background color` 对应的缩写是什么

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDKcQs3N50FWgvl2dWj0bIGCcsSicYQpztBIUTFMIcnic6BzafIibIdccRg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

然后在 extend 字段中，对应的字段里，配置自定义的语法，`heise`.

```
theme:&nbsp;{<br>&nbsp;&nbsp;<span>extend</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>backgroundColor</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>heise</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>0</span>:&nbsp;<span>'rgba(0,&nbsp;0,&nbsp;0,&nbsp;0)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>1</span>:&nbsp;<span>'rgba(0,&nbsp;0,&nbsp;0,&nbsp;0.1)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>2</span>:&nbsp;<span>'rgba(0,&nbsp;0,&nbsp;0,&nbsp;0.2)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>3</span>:&nbsp;<span>'rgba(0,&nbsp;0,&nbsp;0,&nbsp;0.3)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>4</span>:&nbsp;<span>'rgba(0,&nbsp;0,&nbsp;0,&nbsp;0.4)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
```

此时，我们的语法就是属性缩写开头的方式， `bg-heise-0`，我们可以看到，在文件中使用改语法时，智能提示已经有了我们自己定义的语法，完美！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDIFB5HOHokdFibl6DSqUqGiaEI37XSDibsJoJWZduhOsol4MmjhPAZzH7Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## _2_

**定义自己想要的功能块**

tailwindcss 有三个模块。

```
<span>@tailwind</span>&nbsp;base;<br><span>@tailwind</span>&nbsp;components;<br><span>@tailwind</span>&nbsp;utilities;<br>
```

base 表示样式重置模块。components 表示组件模块，utilities 表示功能模块，我们可以通过插件的形式，往这几个功能模块中新增我们想要的功能块。

例如，我希望自定义默认的 button 元素的样式，那么我们就可以往 base 模块中注入样式，首先引入插件方法

```
<span>const</span>&nbsp;plugin&nbsp;=&nbsp;<span>require</span>(<span>'tailwindcss/plugin'</span>)<br>
```

然后在 `plugins` 字段中新增配置样式

```
<span>module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>plugins</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;plugin(<span><span>function</span>(<span>{&nbsp;addBase,&nbsp;theme&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addBase({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'button'</span>:&nbsp;{&nbsp;<span>color</span>:&nbsp;theme(<span>'colors.orange.700'</span>)&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;]<br>}<br>
```

然后，我在项目中写上如下代码，对应的结果如图所示，文字颜色变成了 `orange.700`

```
<span>&lt;<span>button</span>&gt;</span>自定义button默认样式<span>&lt;/<span>button</span>&gt;</span><br>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClD6NqC9pUc51vo5Dtasulkp8fwA21Wf2eCpaZpkTSy1tIgXP06hRShIg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们可以通过这中方式约定所有的基础样式，`button, input` 等都非常需要这样的约定。

当然，我们也可以通过类似的方式往 `components` 中新增样式。例如我希望新增一个 `card` 组件，用于表示一个区域的容器，那么我就可以这样写

```
plugin(<span>(<span>{addComponents,&nbsp;theme}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;addComponents({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>'.card'</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>display</span>:&nbsp;<span>'inline-block'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>padding</span>:&nbsp;<span>'1rem'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>border</span>:&nbsp;<span>'1px&nbsp;solid'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>borderRadius</span>:&nbsp;<span>'4px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>borderColor</span>:&nbsp;theme(<span>'colors.red.400'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>margin</span>:&nbsp;<span>'1rem'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>}),<br>
```

然后我在项目中编写如下代码

```
<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>'card'</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span>button</span>&gt;</span>自定义button默认样式<span>&lt;/<span>button</span>&gt;</span><br><span>&lt;/<span>div</span>&gt;</span><br>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClDMp5fDibiaEkrkNL0osSgtfpHTuyNvRabA20ibufrr8bWVpHjRBxSekEVg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

给力！

## _3_

**定义自己想要的插件**

如下图所示，此时我们想要实现的一个功能是自定义字体大小的递增序列。具体的编号和对应的值都由我们自己来定 `fsize-12`，而不是通过默认的 `text-xxx` 来约定。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Kn1wMOibzLcHShnxTCWIsfPibiad3ytMClD2MTyjK3eMACtWE7T9LoY70IBSoLZcfKW6GIdRmr7qvGAawXb5cas3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

首先，我们先在 theme 中约定配置项，数量太多的时候，你也可以通过数组遍历来快速创建

```
theme:&nbsp;{<br>&nbsp;&nbsp;<span>fsizes</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>12</span>:&nbsp;<span>'12px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>14</span>:&nbsp;<span>'14px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>16</span>:&nbsp;<span>'16px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>18</span>:&nbsp;<span>'18px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>24</span>:&nbsp;<span>'24px'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>32</span>:&nbsp;<span>'32px'</span>,<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;...<br>
```

然后，plugins 字段中，使用 `matchUtilities` 方法动态匹配后缀自增的 class

```
plugin(<span>(<span>{matchUtilities,&nbsp;theme}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;matchUtilities({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>fsize</span>:&nbsp;<span>(<span>value</span>)&nbsp;=&gt;</span>&nbsp;({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>fontSize</span>:&nbsp;value<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;},&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>values</span>:&nbsp;theme(<span>'fsizes'</span>)<br>&nbsp;&nbsp;})<br>})<br>
```

搞定，最后的演示结果如图所示

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## _4_

**高级用法：简单实现皮肤切换**

最后，我们再来一个具体的，实用功能的实现：皮肤切换。具体的实现方式仍然是利用 css 自定义变量来做到。

实现效果如图所示

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> ✓
> 
> 主题来源于 tailwindcss 官方教学视频

我们来看一下实现步骤。

首先，我们要在入口 css 中文件中，约定不同主题的 css 变量。

```
<span>@layer</span>&nbsp;base&nbsp;{<br>&nbsp;&nbsp;<span>:root</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-base</span>:&nbsp;<span>#FFF</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-muted</span>:&nbsp;<span>#c7d2f7</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-inverted</span>:&nbsp;<span>#4f46e5</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-fill</span>:&nbsp;<span>#4338ca</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent</span>:&nbsp;<span>#FFF</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent-hover</span>:&nbsp;<span>#eef2ff</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-muted</span>:&nbsp;<span>99</span>,&nbsp;<span>102</span>,&nbsp;<span>241</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span>.theme-swiss</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-base</span>:&nbsp;<span>#FFF</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-muted</span>:&nbsp;<span>#fecaca</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-inverted</span>:&nbsp;<span>#dc2626</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-fill</span>:&nbsp;<span>#b91c1c</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent</span>:&nbsp;<span>#FFF</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent-hover</span>:&nbsp;<span>#fef2f2</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-muted</span>:&nbsp;<span>239</span>,&nbsp;<span>68</span>,&nbsp;<span>68</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span>.theme-neon</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-base</span>:&nbsp;<span>#111802</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-muted</span>:&nbsp;<span>#2fc306</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-text-inverted</span>:&nbsp;<span>#ebfacc</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-fill</span>:&nbsp;<span>#b3ff17</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent</span>:&nbsp;<span>#243403</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-accent-hover</span>:&nbsp;<span>#374f05</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>--color-button-muted</span>:&nbsp;<span>212</span>,&nbsp;<span>255</span>,&nbsp;<span>122</span>;<br>&nbsp;&nbsp;}<br>}<br>
```

`@layer base` 表示这些定义会运用到 base 模块中。

定义好了主题之后，我们就需要去 `extend` 字段中自定义语法。首先是针对于文字颜色字段，该字段在 css 中为  `color`，不过在 tailwind 中，被重新定义了语义，称之为 text color

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因此，我们要使用 `textColor` 来定义该语法，

```
extend:&nbsp;{<br>&nbsp;&nbsp;<span>textColor</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>skin</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>base</span>:&nbsp;<span>'var(--color-text-base)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>muted</span>:&nbsp;<span>'var(--color-text-muted)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>inverted</span>:&nbsp;<span>'var(--color-text-inverted)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>
```

`textColor` 的对应缩写为 text，因此最终我们自定义的语法名如下所示

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

用同样的方式定义背景颜色

```
backgroundColor:&nbsp;{<br>&nbsp;&nbsp;<span>skin</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>fill</span>:&nbsp;<span>'var(--color-fill)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>'button-accent'</span>:&nbsp;<span>'var(--color-button-accent)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>'button-accent-hover'</span>:&nbsp;<span>'var(--color-button-accent-hover)'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>'button-muted'</span>:&nbsp;<span>(<span>{opacityValue}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(opacityValue)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(opacityValue&nbsp;!==&nbsp;<span>undefined</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>`rgba(var(--color-button-muted),&nbsp;<span>${opacityValue}</span>)`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>`rgb(var(--color-button-muted))`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;}<br>},<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在需要颜色的地方，我们使用自己定义好的语法来设置颜色。

他们的值，都由 `var` 来声明，对应到我们刚才定义的 css 变量。因此，这样做好之后，当我们改变 css 变量的生效结果，那么皮肤切换就能自定生成。

我们可以更改顶层父组件的 className 来做到变量名的整体切换。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实现完成之后，再来看一眼演示效果，没有问题，搞定！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## _5_

**总结**

实践中的需求非常复杂，每个团队对于 UI 的设计规范不同，那么默认样式就很难满足所有团队的需求，因此，掌握如何将 tailwindcss 配置为你的形状，是在团队中推广和运用它的必要条件。

但是官方文档对于配置文件的讲解有一些缺漏，导致我也花了很长时间，查了不少资料才最终读懂，因此这篇文章我把缺漏的部分补上，有助于道友们更加方便理解它，并结合官方文档彻底拿捏 tailwindcss 的自定义配置。

## _\-_

**友情链接**

-   成为 React 高手，推荐阅读 [React 哲学](http://mp.weixin.qq.com/s?__biz=MzI4NjE3MzQzNg==&mid=2649867007&idx=1&sn=6443ff970cd077bbb50de74ce84afa06&chksm=f3e5936cc4921a7aba3fbf748b2f5a40369d8be7b6b2acf618f0701f477abea48b00e953165e&scene=21#wechat_redirect)