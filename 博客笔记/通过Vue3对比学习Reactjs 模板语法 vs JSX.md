**Vue** 使用一种基于 HTML 的模板语法，在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。Vue也支持jsx语法，**但请注意，jsx语法将不会享受到和模板同等级别的编译时优化。**

**JSX**是JavaScript的语法扩展，允许您在JavaScript文件中编写类似HTML的标记。尽管还有其他编写组件的方法，但大多数React开发人员更喜欢JSX的简洁性，大多数代码库都使用它。

## 文本插值

最基本的数据绑定形式是文本插值，同时都支持javascript表达式和函数调用

-   • Vue 使用 `{{}}`(双大括号语法)
    

```
<span>&lt;span&gt;</span><span>Message:&nbsp;{{&nbsp;msg&nbsp;}}</span><span>&lt;/span&gt;</span>
```

```
<span>{{</span><span>&nbsp;number&nbsp;</span><span>+</span><span>&nbsp;</span><span>1</span><span>&nbsp;</span><span>}}</span><span>&nbsp;</span><br><span>{{</span><span>&nbsp;ok&nbsp;</span><span>?</span><span>&nbsp;</span><span>'YES'</span><span>&nbsp;</span><span>:</span><span>&nbsp;</span><span>'NO'</span><span>&nbsp;</span><span>}}</span><span>&nbsp;</span><br><span>{{</span><span>&nbsp;message</span><span>.</span><span>split</span><span>(</span><span>''</span><span>).</span><span>reverse</span><span>().</span><span>join</span><span>(</span><span>''</span><span>)</span><span>&nbsp;</span><span>}}</span><br><br><span>&lt;time&gt;</span><span>&nbsp;</span><span>{{</span><span>&nbsp;formatDate</span><span>(</span><span>date</span><span>)</span><span>&nbsp;</span><span>}}</span><span>&nbsp;</span><span>&lt;/</span><span>time</span><span>&gt;</span>
```

-   • JSX 使用 `{}`(单大括号语法)
    

```
<span>{</span><span>&nbsp;number&nbsp;</span><span>+</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>1</span></span><span>&nbsp;</span><span>}</span><span>&nbsp;</span><br><span>&lt;span&gt;</span><span data-darkreader-inline-color=""><span>Message</span></span><span>:</span><span>&nbsp;</span><span>{</span><span>&nbsp;msg&nbsp;</span><span>}&lt;/</span><span>span</span><span>&gt;</span>
```

```
<span>&lt;h1&gt;</span><span data-darkreader-inline-color=""><span>To</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>Do</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>List</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>for</span></span><span>&nbsp;{</span><span data-darkreader-inline-color=""><span>formatDate</span></span><span>(today)}</span><span>&lt;/h1&gt;</span>
```

## 一般属性值

在Vue中，双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 `v-bind` 指令：

-   • 绑定单个动态值
    

```
<span>&lt;div</span><span>&nbsp;</span><span>v-bind:id</span><span>=</span><span>"dynamicId"</span><span>&gt;&lt;/div&gt;</span>
```

简写

```
<span>&lt;div</span><span>&nbsp;:</span><span>id</span><span>=</span><span>"dynamicId"</span><span>&gt;&lt;/div&gt;</span>
```

-   • 动态绑定多个值
    

有这样的一个包含多个 attribute 的 JavaScript 对象：

```
<span>const</span><span>&nbsp;objectOfAttrs&nbsp;</span><span>=</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;id</span><span>:</span><span>&nbsp;</span><span>'container'</span><span>,</span><br><span>&nbsp;&nbsp;</span><span>class</span><span>:</span><span>&nbsp;</span><span>'wrapper'</span><br><span>}</span>
```

通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上：

```
<span>&lt;div</span><span>&nbsp;</span><span>v-bind</span><span>=</span><span>"objectOfAttrs"</span><span>&gt;&lt;/div&gt;</span>
```

效果等价于

```
<span>&lt;div</span><span>&nbsp;</span><span>id</span><span>=</span><span>"container"</span><span>&nbsp;</span><span>class</span><span>=</span><span>"wrapper"</span><span>&gt;&lt;/div&gt;</span>
```

在jsx中，属性绑定和写HTML的属性类似，如果是动态属性则需要用 `{}`单括号

-   • 动态绑定单个值
    

```
<span data-darkreader-inline-color=""><span>export</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>default</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>function</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>Avatar</span></span><span>(</span><span></span><span>)</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;avatar&nbsp;</span><span>=</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'https://i.imgur.com/7vQD0fPs.jpg'</span></span><span>;</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;description&nbsp;</span><span>=</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Gregorio&nbsp;Y.&nbsp;Zara'</span></span><span>;</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span>(</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>img</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"avatar"</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>src</span></span><span>=</span><span data-darkreader-inline-color=""><span>{</span><span>avatar</span><span>}</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>alt</span></span><span>=</span><span data-darkreader-inline-color=""><span>{</span><span>description</span><span>}</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>/&gt;</span></span></span><br><span>&nbsp;&nbsp;</span><span>);</span><br><span>}</span>
```

-   • 动态绑定多个值
    

在jsx中想把一个对象中的全部属性都作为属性传递给组件，需要用到`javascript`中的析构语法

```
<span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;person&nbsp;</span><span>=</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'kevin'</span></span><span>,</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>age</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>20</span></span><br><span>}</span><br><span data-darkreader-inline-color=""><span>function</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>Profile</span></span><span>(</span><span></span><span>)</span><span>&nbsp;</span><span>{</span><span>&nbsp;&nbsp;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span>(</span><span>&nbsp;&nbsp;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>div</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"card"</span></span><span>&gt;</span></span><span>&nbsp;&nbsp;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>Avatar</span></span><span>&nbsp;</span><span>{</span><span data-darkreader-inline-color=""><span>...</span><span>person</span></span><span>}</span><span>&nbsp;</span><span>/&gt;</span></span><span>&nbsp;&nbsp;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>div</span></span><span>&gt;</span></span></span><span>&nbsp;&nbsp;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>);</span><span>&nbsp;&nbsp;</span><br><span>}</span>
```

等价于

```
<span>&lt;</span><span data-darkreader-inline-color=""><span>Avatar</span></span><span>&nbsp;</span><span>name</span><span>=</span><span data-darkreader-inline-color=""><span>"kevin"</span></span><span>&nbsp;</span><span>age</span><span>=</span><span>{</span><span data-darkreader-inline-color=""><span>20</span></span><span>}</span><span>&nbsp;</span><span>/&gt;</span><span>&nbsp;</span>
```

这种方法最好慎用，可能会引起意料之外的错误

## CSS

来看一下css和对象，作为属性传递时，这两者有什么区别

-   • class \`\`\`vue const isActive = ref(true) const hasError = ref(false)
    

\`\`\` 最终渲染成 \`\`\`html\`\`\` 动态的\`class\`，还支持数组 \`\`\`vue const activeClass = ref('active') const errorClass = ref('text-danger')\`\`\` 会渲染成 \`\`\`vue\`\`\` 还支持以下方式 \`\`\`vue\`\`\` \* style

对于内联样式

```
<span>&lt;div</span><span>&nbsp;:</span><span>style</span><span>=</span><span>"</span><span>{</span><span>&nbsp;color</span><span>:</span><span>&nbsp;</span><span>'red'</span><span>,</span><span>&nbsp;fontSize</span><span>:</span><span>&nbsp;</span><span>'20px'</span><span>&nbsp;</span><span>}</span><span>"</span><span>&gt;&lt;/div&gt;</span>
```

推荐使用 camelCase，但 `:style` 也支持 kebab-cased 形式的 CSS 属性 key (对应其 CSS 中的实际名称)，例如：

```
<span>&lt;div</span><span>&nbsp;:</span><span>style</span><span>=</span><span>"</span><span>{</span><span>&nbsp;</span><span>'font-size'</span><span>:</span><span>&nbsp;</span><span>'20px'</span><span>&nbsp;</span><span>}</span><span>"</span><span>&gt;&lt;/div&gt;</span>
```

`:style`也支持对象格式

```
<span>const</span><span>&nbsp;styleObject&nbsp;</span><span>=</span><span>&nbsp;reactive</span><span>({</span><br><span>&nbsp;&nbsp;color</span><span>:</span><span>&nbsp;</span><span>'red'</span><span>,</span><br><span>&nbsp;&nbsp;fontSize</span><span>:</span><span>&nbsp;</span><span>'13px'</span><br><span>})</span><br><br><span>&lt;</span><span>div&nbsp;</span><span>:</span><span>style</span><span>=</span><span>"styleObject"</span><span>&gt;&lt;/</span><span>div</span><span>&gt;</span>
```

我们还可以给 `:style` 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```
<span>&lt;div</span><span>&nbsp;:</span><span>style</span><span>=</span><span>"</span><span>[</span><span>baseStyles</span><span>,</span><span>&nbsp;overridingStyles</span><span>]</span><span>"</span><span>&gt;&lt;/div&gt;</span>
```

在`jsx`中的样式的写法有它自己的一套 `css-in-js`的方案，如果在`jsx`中使用简单的`class`和`style`，可以使用下面的方式，在`jsx`中，`class`要用`className`替换，css中的style属性要用camelCase格式

```
<span>&lt;ul</span><span>&nbsp;</span><span>style</span><span>={{</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>backgroundColor</span></span><span>:&nbsp;</span><span data-darkreader-inline-color=""><span>'black'</span></span><span>,</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>color</span></span><span>:&nbsp;</span><span data-darkreader-inline-color=""><span>'pink'</span></span><br><span>}}</span><span>&gt;</span><br><br><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>ul</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>""</span></span><span>&gt;</span></span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>ul</span></span><span>&gt;</span></span></span>
```

## 条件渲染(if)

在vue中条件渲染需要用到指令有 `v-show`、`v-if`、`v-else`、`v-else-if`

```
<span>&lt;div</span><span>&nbsp;</span><span>v-if</span><span>=</span><span>"type&nbsp;===&nbsp;'A'"</span><span>&gt;</span><br><span>&nbsp;&nbsp;A</span><br><span>&lt;/div&gt;</span><br><span>&lt;div</span><span>&nbsp;</span><span>v-else-if</span><span>=</span><span>"type&nbsp;===&nbsp;'B'"</span><span>&gt;</span><br><span>&nbsp;&nbsp;B</span><br><span>&lt;/div&gt;</span><br><span>&lt;div</span><span>&nbsp;</span><span>v-else-if</span><span>=</span><span>"type&nbsp;===&nbsp;'C'"</span><span>&gt;</span><br><span>&nbsp;&nbsp;C</span><br><span>&lt;/div&gt;</span><br><span>&lt;div</span><span>&nbsp;</span><span>v-else</span><span>&gt;</span><br><span>&nbsp;&nbsp;Not&nbsp;A/B/C</span><br><span>&lt;/div&gt;</span>
```

关于`v-if` `v-show` `v-for`之间的关系和区别，会用单独的一篇文章介绍

而在`jsx`中的条件渲染有以下几种方式

-   • **if**
    

```
<span data-darkreader-inline-color=""><span>if</span></span><span>&nbsp;</span><span>(</span><span>isPacked</span><span>)</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>li</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"item"</span></span><span>&gt;</span></span><span>{</span><span>name</span><span>}</span><span>&nbsp;</span><span>✔</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span></span><span>;</span><br><span>}</span><br><span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>li</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"item"</span></span><span>&gt;</span></span><span>{</span><span>name</span><span>}</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span></span><span>;</span>
```

-   • **&&** `{cond && <A />}`
    

```
<span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span>(</span><br><span>&nbsp;&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>li</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"item"</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{</span><span>name</span><span>}</span><span>&nbsp;</span><span>{</span><span>isPacked&nbsp;</span><span>&amp;&amp;</span><span>&nbsp;</span><span>'✔'</span><span>}</span><br><span>&nbsp;&nbsp;</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span></span><br><span>);</span>
```

-   • **? :** `{cond ? <A /> : <B />}`
    

```
<span data-darkreader-inline-color=""><span>return</span></span><span>&nbsp;</span><span>(</span><br><span>&nbsp;&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>li</span></span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>className</span></span><span>=</span><span data-darkreader-inline-color=""><span>"item"</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{</span><span>isPacked&nbsp;</span><span>?</span><span>&nbsp;name&nbsp;</span><span>+</span><span>&nbsp;</span><span>'&nbsp;✔'</span><span>&nbsp;</span><span>:</span><span>&nbsp;name</span><span>}</span><br><span>&nbsp;&nbsp;</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span></span><br><span>);</span>
```

## 列表渲染(list)

在`Vue`中我们可以使用 `v-for` 指令基于一个数组来渲染一个列表。有以下几种写法

-   • 数组`<li v-for="item in items" :key={}>   {{ item.message }}   </li>`
    
-   • 带索引
    

```
<span>&lt;li</span><span>&nbsp;</span><span>v-for</span><span>=</span><span>"(item,&nbsp;index)&nbsp;in&nbsp;items"</span><span>&nbsp;:</span><span>key</span><span>=</span><span>{}</span><span>&gt;</span><br><span>&nbsp;&nbsp;{{&nbsp;parentMessage&nbsp;}}&nbsp;-&nbsp;{{&nbsp;index&nbsp;}}&nbsp;-&nbsp;{{&nbsp;item.message&nbsp;}}</span><br><span>&lt;/li&gt;</span>
```

-   • 使用析构
    

```
<span>&lt;li</span><span>&nbsp;</span><span>v-for</span><span>=</span><span>"{&nbsp;message&nbsp;}&nbsp;in&nbsp;items"</span><span>&nbsp;:</span><span>key</span><span>=</span><span>{}</span><span>&gt;</span><br><span>&nbsp;&nbsp;{{&nbsp;message&nbsp;}}</span><br><span>&lt;/li&gt;</span><br><br><span>&lt;!--&nbsp;有&nbsp;index&nbsp;索引时&nbsp;--&gt;</span><br><span>&lt;li</span><span>&nbsp;</span><span>v-for</span><span>=</span><span>"({&nbsp;message&nbsp;},&nbsp;index)&nbsp;in&nbsp;items"</span><span>&gt;</span><br><span>&nbsp;&nbsp;{{&nbsp;message&nbsp;}}&nbsp;{{&nbsp;index&nbsp;}}</span><br><span>&lt;/li&gt;</span>
```

-   • 使用 `of` 代替 `in`
    

```
<span>&lt;div</span><span>&nbsp;</span><span>v-for</span><span>=</span><span>"item&nbsp;of&nbsp;items"</span><span>&gt;&lt;/div&gt;</span>
```

-   • 遍历对象
    

你也可以使用 v-for 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 Object.keys() 的返回值来决定。

```
<span>const</span><span>&nbsp;myObject&nbsp;</span><span>=</span><span>&nbsp;reactive</span><span>({</span><br><span>&nbsp;&nbsp;title</span><span>:</span><span>&nbsp;</span><span>'How&nbsp;to&nbsp;do&nbsp;lists&nbsp;in&nbsp;Vue'</span><span>,</span><br><span>&nbsp;&nbsp;author</span><span>:</span><span>&nbsp;</span><span>'Jane&nbsp;Doe'</span><span>,</span><br><span>&nbsp;&nbsp;publishedAt</span><span>:</span><span>&nbsp;</span><span>'2016-04-10'</span><br><span>})</span><br><br><span>#1</span><br><span>&lt;ul&gt;</span><br><span>&nbsp;&nbsp;</span><span>&lt;</span><span>li&nbsp;v</span><span>-</span><span>for</span><span>=</span><span>"value&nbsp;in&nbsp;myObject"</span><span>&nbsp;</span><span>:</span><span>key</span><span>={}&gt;</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{{</span><span>&nbsp;value&nbsp;</span><span>}}</span><br><span>&nbsp;&nbsp;</span><span>&lt;/</span><span>li</span><span>&gt;</span><br><span>&lt;/</span><span>ul</span><span>&gt;</span><br><br><span>#2&nbsp;可以通过提供第二个参数表示属性名&nbsp;(例如&nbsp;key)：</span><br><br><span>&lt;</span><span>li&nbsp;v</span><span>-</span><span>for</span><span>=</span><span>"(value,&nbsp;key)&nbsp;in&nbsp;myObject"</span><span>&nbsp;</span><span>:</span><span>key</span><span>={}&gt;</span><br><span>&nbsp;&nbsp;</span><span>{{</span><span>&nbsp;key&nbsp;</span><span>}}:</span><span>&nbsp;</span><span>{{</span><span>&nbsp;value&nbsp;</span><span>}}</span><br><span>&lt;/</span><span>li</span><span>&gt;</span><br><br><span>#3&nbsp;第三个参数表示位置索引：</span><br><br><span>&lt;</span><span>li&nbsp;v</span><span>-</span><span>for</span><span>=</span><span>"(value,&nbsp;key,&nbsp;index)&nbsp;in&nbsp;myObject"</span><span>&nbsp;</span><span>:</span><span>key</span><span>={}&gt;</span><br><span>&nbsp;&nbsp;</span><span>{{</span><span>&nbsp;index&nbsp;</span><span>}}.</span><span>&nbsp;</span><span>{{</span><span>&nbsp;key&nbsp;</span><span>}}:</span><span>&nbsp;</span><span>{{</span><span>&nbsp;value&nbsp;</span><span>}}</span><br><span>&lt;/</span><span>li</span><span>&gt;</span>
```

在`jsx`中，需要用到`javascript`中的数组的方法，常用数组的 `map`方法

```
<span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;people&nbsp;</span><span>=</span><span>&nbsp;</span><span>[{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>id</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>0</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Creola&nbsp;Katherine&nbsp;Johnson'</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>profession</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'mathematician'</span></span><span>,</span><br><span>},</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>id</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>1</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Mario&nbsp;José&nbsp;Molina-Pasquel&nbsp;Henríquez'</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>profession</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'chemist'</span></span><span>,</span><br><span>},</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>id</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>2</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Mohammad&nbsp;Abdus&nbsp;Salam'</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>profession</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'physicist'</span></span><span>,</span><br><span>},</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Percy&nbsp;Lavon&nbsp;Julian'</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>profession</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'chemist'</span></span><span>,</span><span>&nbsp;&nbsp;</span><br><span>},</span><span>&nbsp;</span><span>{</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>name</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'Subrahmanyan&nbsp;Chandrasekhar'</span></span><span>,</span><br><span>&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>profession</span></span><span>:</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'astrophysicist'</span></span><span>,</span><br><span>}];</span><br><br><span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;chemists&nbsp;</span><span>=</span><span>&nbsp;people</span><span>.</span><span data-darkreader-inline-color=""><span>filter</span></span><span>(</span><span><span><span>person</span></span><span>&nbsp;</span><span>=&gt;</span></span><br><span>&nbsp;&nbsp;person</span><span>.</span><span><span>profession</span></span><span>&nbsp;</span><span>===</span><span>&nbsp;</span><span data-darkreader-inline-color=""><span>'chemist'</span></span><br><span>);</span><br><span data-darkreader-inline-color=""><span>const</span></span><span>&nbsp;listItems&nbsp;</span><span>=</span><span>&nbsp;chemists</span><span>.</span><span data-darkreader-inline-color=""><span>map</span></span><span>(</span><span><span><span>person</span></span><span>&nbsp;</span><span>=&gt;</span></span><br><span>&nbsp;&nbsp;</span><span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>img</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>src</span></span><span>=</span><span data-darkreader-inline-color=""><span>{</span><span>getImageUrl</span><span>(</span><span>person</span><span>)}</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span data-darkreader-inline-color=""><span>alt</span></span><span>=</span><span data-darkreader-inline-color=""><span>{</span><span>person</span><span>.</span><span>name</span><span>}</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>/&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>p</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;</span><span data-darkreader-inline-color=""><span>b</span></span><span>&gt;</span></span><span>{</span><span>person</span><span>.</span><span>name</span><span>}:</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>b</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{</span><span>'&nbsp;'</span><span>&nbsp;</span><span>+</span><span>&nbsp;person</span><span>.</span><span>profession&nbsp;</span><span>+</span><span>&nbsp;</span><span>'&nbsp;'</span><span>}</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;known&nbsp;</span><span>for</span><span>&nbsp;</span><span>{</span><span>person</span><span>.</span><span>accomplishment</span><span>}</span><br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>p</span></span><span>&gt;</span></span><br><span>&nbsp;&nbsp;</span><span><span>&lt;/</span><span data-darkreader-inline-color=""><span>li</span></span><span>&gt;</span></span></span><br><span>);</span><br>
```

不管是在`vue`还是在`jsx`，渲染列表时，都需要 `key`元素，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素