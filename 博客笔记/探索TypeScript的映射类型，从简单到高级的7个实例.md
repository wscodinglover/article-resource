![Image](https://mmbiz.qpic.cn/mmbiz_png/KEXUm19zKo7ibRVaz6QB76MuribsmucWvdS7UcnibVqB7PkGGCfHJJvex5E3mJKlzicfTTCqQk9G17SeJibUc7AmxwA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

映射类型（Mapped Types）是TypeScript中将一种类型的属性转换为另一种类型的强大工具。它们类似于数组的方法，如map和filter，但这是针对类型的操作。为了更好地理解映射类型，我们需要先了解以下几个概念：

1.  keyof 操作符：keyof 是TypeScript中的一个操作符，它返回一个类型的所有属性名的联合类型。比如，keyof { name: string, age: number } 返回 'name' | 'age'。
    
2.  in 操作符：in 用于遍历类型的每个属性。例如，Key in keyof Type 会遍历 Type 的每个属性。
    
3.  as 关键字：as 用于给类型分配一个新名字。例如，Type as NewType 将 Type 赋值为 NewType。
    
4.  never 类型：never 类型表示没有值。它通常在条件类型中用于过滤掉某些属性。
    
5.  ? 操作符：? 用于将属性设置为可选的。例如，Key?: Type 使 Key 成为可选属性。
    
6.  readonly 修饰符：readonly 用于将属性设置为只读。例如，readonly Key: Type 使 Key 成为只读属性。
    
7.  联合类型（Union types）：联合类型是将多个类型组合成一个类型的方法。例如，Type1 | Type2 是一个联合类型，可以是 Type1 或 Type2。
    
8.  工具类型（Utility types）： 工具类型是内置的类型，提供常见的类型转换。例如，Partial是一个工具类型，使 Type 的所有属性都变为可选。我们将在高级示例中使用 Capitalize 工具类型。
    
9.  泛型类型（Generic types）：泛型类型是创建依赖于另一种类型的类型的方法。例如，Type是一个依赖于 T 的泛型类型。
    

通过这些概念，我们可以更深入地了解TypeScript的映射类型，并通过实际的例子来掌握它们的用法。接下来，我们将逐步展示从简单到高级的7个映射类型的实例，让你轻松掌握这一强大的类型转换工具。

## 相关文章推荐

-   [让你的TypeScript代码更优雅，这10个特性你需要了解下](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517609&idx=1&sn=a2338d43db681096cdf5908512ddab73&chksm=a6a6961591d11f035b51d8d470a7d46e42fba6470322de43d815c47bb29bb3ff3902d7c287d5&scene=21#wechat_redirect)
    
-   [在 TypeScript 中，定义类型时你用 Types 还是 Interfaces？](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517651&idx=1&sn=5d5c8fc61825d203d8d3db40409555db&chksm=a6a6966f91d11f795984dae1173152b48f20331e13152f41cfb28d09b78cf3b702d47007a0d8&scene=21#wechat_redirect)
    
-   [深入理解 TypeScript 中的 Keyof 运算符，让你的代码更安全、更灵活！](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517713&idx=1&sn=1854ca6ff3341f6ebd38b5bfd2347844&chksm=a6a695ad91d11cbb9631c82bdef4ebac3db1ff0b4e658d40f843bdec242fb75db12d18f0b639&scene=21#wechat_redirect)
    
-   [一文搞懂TypeScript泛型，让你的组件复用性大幅提升](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517742&idx=1&sn=a454c60a33eb067862fa6c5d4c140130&chksm=a6a6959291d11c846367dfcd460a1cf454ed0cef7cb321739f1da66b681ad68d8bfa25287181&scene=21#wechat_redirect)
    
-   [如何利用 TypeScript 的 Extract 提升类型定义与代码清晰度](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517800&idx=1&sn=4e49aed00ea1bfa8d90810bd5eabcfc3&chksm=a6a695d491d11cc296deaed1cf38ac0543c6ae5d42348ef08ae947d3f380084e1677862cd984&scene=21#wechat_redirect)
    
-   [如何利用 TypeScript 的 Exclude 提升状态管理与代码健壮性](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517819&idx=2&sn=5abf6d03bd736309c31c9e9dc21b346d&chksm=a6a695c791d11cd155d2b5fdb3cdbbb23fded34af63d263047013c9287c91cba8aec27c29c9e&scene=21#wechat_redirect)
    
-   [TypeScript 进阶，深入理解并运用索引访问类型提升代码质量](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517828&idx=1&sn=27e9a4acd5a7785ceeecb61ed0c1b104&chksm=a6a6953891d11c2eff49b95bd28d87493f70f2d03bb2d6b88546a96ee6dec78a562690ce8d41&scene=21#wechat_redirect)
    
-   [如何利用 TypeScript 的判别联合类型提升错误处理与代码安全性](http://mp.weixin.qq.com/s?__biz=MjM5MjU2NDk0Nw==&mid=2247517857&idx=1&sn=cefb4b5b1a6ff9b669ae68fc64a21adb&chksm=a6a6951d91d11c0b5bf7fb66af87f416b6960e942645ecc6d4a942a07564b2b658c92ac660aa&scene=21#wechat_redirect)
    

## 一、布尔类型的转换

在TypeScript中，有时候我们需要将一种类型的属性转换为另一种类型。使用映射类型可以轻松实现这一点。下面我们通过一个具体的例子来展示如何将User类型的属性转换为布尔类型。

## 1\. 定义User类型

首先，我们定义一个User类型，其中包含三个属性：name（字符串类型）、age（数字类型）和email（字符串类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

## 2\. 定义UserToBoolean类型

接下来，我们定义一个新的类型UserToBoolean，它将User类型中的所有属性都转换为布尔类型。这里我们使用keyof和in操作符。

```
<span></span><code><span>type</span>&nbsp;UserToBoolean&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;User]:&nbsp;boolean;<br>};<br><br></code>
```

在这个定义中，Key in keyof User会遍历User类型的每个属性，并创建一个具有相同属性名但类型为布尔的属性。

## 3\. 结果类型

最终，我们得到的结果类型 UserToBoolean如下：

```
<span></span><code><span>type</span>&nbsp;UserToBoolean&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;boolean;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;boolean;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;boolean;<br>};<br><br></code>
```

## 4\. 类比JavaScript中的map函数

是不是觉得这和JavaScript中的map函数非常相似呢？在JavaScript中，map函数用于遍历数组并对每个元素执行指定操作。同样，在TypeScript中，映射类型可以遍历类型的每个属性并对其进行转换。

## 二、 将类型属性设为可选

在TypeScript中，我们常常需要将某个类型的所有属性设为可选属性。通常，我们会使用内置的Partial工具类型来实现这一点。不过，我们也可以通过映射类型来实现同样的效果。让我们通过一个例子来展示如何做到这一点。

## 1\. 使用映射类型将属性设为可选

首先，我们定义一个User类型，其中包含三个属性：name（字符串类型）、age（数字类型）和email（字符串类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

接下来，我们定义一个新的类型UserToOptional，它将User类型中的所有属性都变为可选的。

```
<span></span><code><span>type</span>&nbsp;UserToOptional&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;User]?:&nbsp;User[Key];<br>};<br><br></code>
```

在这个定义中，Key in keyof User会遍历User类型的每个属性，并在属性名后加上?，使其成为可选属性。同时，User\[Key\]用于获取User类型中对应属性的类型。

最终，我们得到的结果类型UserToOptional如下：

```
<span></span><code><span>type</span>&nbsp;UserToOptional&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name?:&nbsp;string&nbsp;|&nbsp;undefined;<br>&nbsp;&nbsp;&nbsp;&nbsp;age?:&nbsp;number&nbsp;|&nbsp;undefined;<br>&nbsp;&nbsp;&nbsp;&nbsp;email?:&nbsp;string&nbsp;|&nbsp;undefined;<br>};<br><br></code>
```

## 2\. 使用泛型类型实现Partial工具类型

此外，我们还可以通过泛型类型来实现Partial工具类型。这样可以使我们的代码更加通用和复用。

首先，定义一个泛型类型MyPartial：

```
<span></span><code><span>type</span>&nbsp;MyPartial&lt;Type&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Property&nbsp;<span>in</span>&nbsp;keyof&nbsp;Type]?:&nbsp;Type[Property];<br>};<br><br></code>
```

然后，我们可以使用MyPartial来定义UserToOptional：

```
<span></span><code><span>type</span>&nbsp;UserToOptional&nbsp;=&nbsp;MyPartial&lt;User&gt;;<br><br></code>
```

结果类型与之前相同：

```
<span></span><code><span>type</span>&nbsp;UserToOptional&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name?:&nbsp;string&nbsp;|&nbsp;undefined;<br>&nbsp;&nbsp;&nbsp;&nbsp;age?:&nbsp;number&nbsp;|&nbsp;undefined;<br>&nbsp;&nbsp;&nbsp;&nbsp;email?:&nbsp;string&nbsp;|&nbsp;undefined;<br>};<br><br></code>
```

通过这两个例子，我们展示了如何使用映射类型将类型的所有属性设为可选属性。掌握这一技巧可以让你在开发TypeScript应用时更加灵活地处理类型转换问题。

## 三、将可选属性设为必需属性

在TypeScript中，有时我们需要将类型中所有可选属性变为必需属性。通过映射类型，我们可以轻松实现这一点。下面我们通过一个具体的例子来展示如何将User类型中的可选属性转换为必需属性。

## 1\. 定义User类型

首先，我们定义一个User类型，其中包含三个可选属性：name（字符串类型）、age（数字类型）和email（字符串类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name?:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age?:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email?:&nbsp;string;<br>};<br><br></code>
```

## 2\. 定义UserToRequired类型

接下来，我们定义一个新的类型UserToRequired，它将User类型中的所有可选属性都变为必需的。

```
<span></span><code><span>type</span>&nbsp;UserToRequired&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;User]-?:&nbsp;User[Key];<br>};<br><br></code>
```

在这个定义中，Key in keyof User会遍历User类型的每个属性，并在属性名后的?前加上-，使其成为必需属性。同时，User\[Key\]用于获取User类型中对应属性的类型。

## 3\. 结果类型

最终，我们得到的结果类型UserToRequired如下：

```
<span></span><code><span>type</span>&nbsp;UserToRequired&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

通过这个简单的例子，我们可以看到如何使用映射类型将类型的可选属性变为必需属性。掌握这一技巧可以让你在开发TypeScript应用时更加灵活地处理类型转换问题。

## 四、将属性设为只读

在TypeScript中，有时我们需要将某个类型的所有属性设为只读。使用映射类型可以轻松实现这一点。我们也可以使用内置的Readonly工具类型来实现同样的效果。下面通过具体的例子来展示这两种方法的实现。

## 1\. 使用映射类型将属性设为只读

首先，我们定义一个User类型，其中包含三个属性：name（字符串类型）、age（数字类型）和email（字符串类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

接下来，我们定义一个新的类型UserToReadonly，它将User类型中的所有属性都变为只读属性。

```
<span></span><code><span>type</span>&nbsp;UserToReadonly&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;User]:&nbsp;User[Key];<br>};<br><br></code>
```

在这个定义中，Key in keyof User会遍历User类型的每个属性，并在属性名前加上readonly，使其成为只读属性。同时，User\[Key\]用于获取User类型中对应属性的类型。

## 2\. 结果类型

最终，我们得到的结果类型UserToReadonly如下：

```
<span></span><code><span>type</span>&nbsp;UserToReadonly&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

## 3\. 使用Readonly工具类型

我们还可以通过内置的Readonly工具类型来实现同样的效果：

```
<span></span><code><span>type</span>&nbsp;UserToReadonly&nbsp;=&nbsp;Readonly&lt;User&gt;;<br><br></code>
```

## 4\. 实现Readonly工具类型

此外，我们可以通过泛型类型和映射类型来实现Readonly工具类型，使我们的代码更加通用和复用。

首先，定义一个泛型类型MyReadonly：

```
<span></span><code><span>type</span>&nbsp;MyReadonly&lt;Type&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;[Property&nbsp;<span>in</span>&nbsp;keyof&nbsp;Type]:&nbsp;Type[Property];<br>};<br><br></code>
```

然后，我们可以使用MyReadonly来定义UserToReadonly：

```
<span></span><code><span>type</span>&nbsp;UserToReadonly&nbsp;=&nbsp;MyReadonly&lt;User&gt;;<br><br></code>
```

结果类型与之前相同：

```
<span></span><code><span>type</span>&nbsp;UserToReadonly&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>readonly</span>&nbsp;email:&nbsp;string;<br>};<br></code>
```

## 五、移除某些属性

在TypeScript中，我们有时需要从一个类型中移除某些属性。通常，我们会使用内置的Omit工具类型来实现这一点。不过，我们也可以通过映射类型来实现同样的效果。下面通过具体的例子来展示如何实现这一点。

## 1\. 定义User类型

首先，我们定义一个User类型，其中包含三个属性：name（字符串类型）、age（数字类型）和email（字符串类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

## 2\. 使用映射类型移除属性

接下来，我们定义一个新的类型UserWithoutAgeAndEmail，它将User类型中的age和email属性移除，只保留name属性。

```
<span></span><code><span>type</span>&nbsp;UserWithoutAgeAndEmail&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;User&nbsp;as&nbsp;Key&nbsp;extends&nbsp;<span>'age'</span>&nbsp;|&nbsp;<span>'email'</span>&nbsp;?&nbsp;never&nbsp;:&nbsp;Key]:&nbsp;User[Key];<br>};<br><br></code>
```

在这个定义中，Key in keyof User会遍历User类型的每个属性，然后通过条件类型Key extends 'age' | 'email' ? never : Key来决定是否保留该属性。如果Key是age或email，那么结果类型中将不会包含这个属性。

3.  结果类型 最终，我们得到的结果类型UserWithoutAgeAndEmail如下：
    

```
<span></span><code><span>type</span>&nbsp;UserWithoutAgeAndEmail&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>};<br><br></code>
```

通过这个例子，我们展示了如何使用映射类型从一个类型中移除某些属性。掌握这一技巧可以让你在开发TypeScript应用时更加灵活地处理类型转换问题。

## 六、创建仅包含特定类型属性的类型

在TypeScript中，我们可以使用条件类型来创建仅包含某种类型属性的新类型。下面通过一个具体的例子来展示如何实现这一点。

## 1\. 定义User类型

首先，我们定义一个User类型，其中包含四个属性：name（字符串类型）、age（数字类型）、email（字符串类型）和isAdmin（布尔类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;isAdmin:&nbsp;boolean;<br>};<br><br></code>
```

## 2\. 定义OnlyStringProperties类型

接下来，我们定义一个泛型类型OnlyStringProperties，它仅包含Type中类型为字符串的属性。

```
<span></span><code><span>type</span>&nbsp;OnlyStringProperties&lt;Type&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;Type&nbsp;as&nbsp;Type[Key]&nbsp;extends&nbsp;string&nbsp;?&nbsp;Key&nbsp;:&nbsp;never]:&nbsp;Type[Key];<br>};<br><br></code>
```

## 3\. 使用OnlyStringProperties

我们可以使用OnlyStringProperties来创建一个新的类型UserOnlyStringProperties，它仅包含User类型中类型为字符串的属性。

```
<span></span><code><span>type</span>&nbsp;UserOnlyStringProperties&nbsp;=&nbsp;OnlyStringProperties&lt;User&gt;;<br><br></code>
```

## 4\. 结果类型

最终，我们得到的结果类型UserOnlyStringProperties如下：

```
<span></span><code><span>type</span>&nbsp;UserOnlyStringProperties&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>};<br><br></code>
```

## 七、使用模板字面量类型创建新属性名

在TypeScript中，我们可以使用模板字面量类型来创建带有特定前缀和大写属性名的新类型。通过这个技巧，我们可以生成新的类型，其属性名称带有get或set前缀，同时保留原属性的类型。

## 1\. 定义User类型

首先，我们定义一个User类型，其中包含四个属性：name（字符串类型）、age（数字类型）、email（字符串类型）和isAdmin（布尔类型）。

```
<span></span><code><span>type</span>&nbsp;User&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;email:&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;isAdmin:&nbsp;boolean;<br>};<br><br></code>
```

## 2\. 创建带有get前缀的属性类型

接下来，我们定义一个泛型类型Getters，它会为类型中的每个属性创建一个带有get前缀的函数。

```
<span></span><code><span>type</span>&nbsp;Getters&lt;Type&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;Type&nbsp;as&nbsp;`get<span>${Capitalize&lt;string&nbsp;&amp;&nbsp;Key&gt;}</span>`]:&nbsp;()&nbsp;=&gt;&nbsp;Type[Key];<br>};<br><br></code>
```

在这个定义中，Key in keyof Type会遍历Type类型的每个属性，通过Capitalize工具类型将属性名的首字母大写，并使用模板字面量类型来生成新的属性名称。

我们可以使用Getters来创建一个新的类型UserGetters，它包含所有User类型的属性，但带有get前缀。

```
<span></span><code><span>type</span>&nbsp;UserGetters&nbsp;=&nbsp;Getters&lt;User&gt;;<br><br></code>
```

结果类型如下：

```
<span></span><code><span>type</span>&nbsp;UserGetters&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;getName:&nbsp;()&nbsp;=&gt;&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;getAge:&nbsp;()&nbsp;=&gt;&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;getEmail:&nbsp;()&nbsp;=&gt;&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;getIsAdmin:&nbsp;()&nbsp;=&gt;&nbsp;boolean;<br>};<br><br></code>
```

## 3\. 创建带有set前缀的属性类型

同样，我们可以定义一个泛型类型Setters，它会为类型中的每个属性创建一个带有set前缀的函数。

```
<span></span><code><span>type</span>&nbsp;Setters&lt;Type&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[Key&nbsp;<span>in</span>&nbsp;keyof&nbsp;Type&nbsp;as&nbsp;`<span>set</span><span>${Capitalize&lt;string&nbsp;&amp;&nbsp;Key&gt;}</span>`]:&nbsp;(value:&nbsp;Type[Key])&nbsp;=&gt;&nbsp;void;<br>};<br><br></code>
```

使用Setters来创建一个新的类型UserSetters，它包含所有User类型的属性，但带有set前缀。

```
<span></span><code><span>type</span>&nbsp;UserSetters&nbsp;=&nbsp;Setters&lt;User&gt;;<br><br></code>
```

结果类型如下：

```
<span></span><code><span>type</span>&nbsp;UserSetters&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;setName:&nbsp;(value:&nbsp;string)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setAge:&nbsp;(value:&nbsp;number)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setEmail:&nbsp;(value:&nbsp;string)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setIsAdmin:&nbsp;(value:&nbsp;boolean)&nbsp;=&gt;&nbsp;void;<br>};<br><br></code>
```

## 4\. 组合Getters和Setters

最后，我们可以将Getters和Setters组合起来，创建一个同时包含get和set方法的类型

```
<span></span><code><span>type</span>&nbsp;GettersAndSetters&lt;Type&gt;&nbsp;=&nbsp;Getters&lt;Type&gt;&nbsp;&amp;&nbsp;Setters&lt;Type&gt;;<br><br><span>type</span>&nbsp;UserGettersAndSetters&nbsp;=&nbsp;GettersAndSetters&lt;User&gt;;<br><br></code>
```

结果类型如下：

```
<span></span><code><span>type</span>&nbsp;UserGettersAndSetters&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;getName:&nbsp;()&nbsp;=&gt;&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;getAge:&nbsp;()&nbsp;=&gt;&nbsp;number;<br>&nbsp;&nbsp;&nbsp;&nbsp;getEmail:&nbsp;()&nbsp;=&gt;&nbsp;string;<br>&nbsp;&nbsp;&nbsp;&nbsp;getIsAdmin:&nbsp;()&nbsp;=&gt;&nbsp;boolean;<br>&nbsp;&nbsp;&nbsp;&nbsp;setName:&nbsp;(value:&nbsp;string)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setAge:&nbsp;(value:&nbsp;number)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setEmail:&nbsp;(value:&nbsp;string)&nbsp;=&gt;&nbsp;void;<br>&nbsp;&nbsp;&nbsp;&nbsp;setIsAdmin:&nbsp;(value:&nbsp;boolean)&nbsp;=&gt;&nbsp;void;<br>};<br><br></code>
```

## 结束

TypeScript的映射类型真的是一项非常强大的功能，能让我们实现各种复杂的类型转换。它们不仅可以：

-   转换属性：改变类型中现有属性的类型。
    
-   添加或移除属性：添加新的属性或移除已有的属性。
    
-   控制可选性和只读状态：将属性设置为可选或只读。
    
-   创建动态类型：通过条件类型和模板字面量类型构建新类型，适用于高级场景（如生成getter和setter）。
    

尽管内置的工具类型如Partial、Readonly和Omit提供了便捷的快捷方式，但映射类型让我们能够深入理解和精确控制类型。

希望通过这篇文章，你能更好地掌握这些技巧，让你的代码更加干净、可预测和易于维护。如果你觉得这篇文章对你有帮助，欢迎关注我的公众号「前端达人」！在这里，你不仅可以获取更多前端开发的干货内容，还可以与我互动、留言、转发、点赞。你的支持是我最大的动力！期待你的关注和反馈！