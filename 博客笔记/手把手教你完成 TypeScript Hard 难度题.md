本文将会手把手带你解锁一道 TypeScript 类型挑战题 ——《实现 Camelize 函数》。

虽然难度为【困难】，但期间会对用到的 ts 知识（类型体操基础动作）做学习和讲解，理解起来依然轻松，让你从此不再害怕类型体操。

## 题目

type challenge<sup data-darkreader-inline-color="">[1]</sup> 是一个 TypeScript 类型体操姿势合集。里面有「简单」「中等」「困难」「地狱」四个等级的题目。

今天我们来完成其中的一道困难级别题目：**实现 Camelize 函数。**

> 原题地址：https://github.com/type-challenges/type-challenges/blob/main/questions/01383-hard-camelize/README.md

题目如下：

实现 Camelize 类型: 将对象属性名从 **蛇形命名(下划线命名)** 转换为 **小驼峰命名**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Camelize&lt;{<br>&nbsp;&nbsp;some_prop:&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;<br>&nbsp;&nbsp;prop:&nbsp;{&nbsp;another_prop:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;},<br>&nbsp;&nbsp;array:&nbsp;[{&nbsp;snake_case:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;}]<br>}&gt;<br><br><span data-darkreader-inline-color="">//&nbsp;expected&nbsp;to&nbsp;be</span><br><span data-darkreader-inline-color="">//&nbsp;{</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;someProp:&nbsp;string,&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;prop:&nbsp;{&nbsp;anotherProp:&nbsp;string&nbsp;},</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;array:&nbsp;[{&nbsp;snakeCase:&nbsp;string&nbsp;}]</span><br><span data-darkreader-inline-color="">//&nbsp;}</span><br></code>
```

为了了解 camelize 的实现原理，我们先用 js 自己实现一下。

## JS 代码实现 camelize

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;camelCase&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'lodash'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isPlainObjectX&nbsp;=&nbsp;<span>(<span>obj</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">Object</span>.prototype.toString.call(obj)&nbsp;===&nbsp;<span data-darkreader-inline-color="">'[object&nbsp;Object]'</span>;<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span>camelize</span>(<span>obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果是数组，遍历执行&nbsp;camelize</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<span data-darkreader-inline-color="">Array</span>.isArray(obj))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;obj.map(<span><span>item</span>&nbsp;=&gt;</span>&nbsp;camelize(item));<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果是对象</span><br>&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isPlainObjectX(obj))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">Object</span>.create(<span data-darkreader-inline-color="">null</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.keys(obj).forEach(<span><span>key</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将&nbsp;key&nbsp;改为驼峰，对&nbsp;value&nbsp;递归&nbsp;camelize</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newObj[camelCase(key)]&nbsp;=&nbsp;camelize(obj[key]);<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;newObj;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;其余情况，不处理</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;obj;<br>}<br><br></code>
```

理一下逻辑：

1.  入参是个对象或数组
    
2.  如果是数组，则对每一项递归进行 camelize
    
3.  如果是对象，将对象的 key 改为 **camelCase**，并对 value 递归进行 camelize
    
4.  否则，不处理直接返回
    

可以看到 camelize 的实现依赖 camelCase，camelCase 来自于 lodash。

但 ts 类型里没有 lodash，因此我们也首先用 ts 类型来实现 **CamelCase**。

## TS 实现 CamelCase

该题也是 ts 类型挑战中难度为 Hard 类型的题目。

> 原题地址：https://github.com/type-challenges/type-challenges/blob/main/questions/00114-hard-camelcase/README.md

### Test Case

先看看测试用例，心里有个数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;camelCase1&nbsp;=&nbsp;CamelCase&lt;<span data-darkreader-inline-color="">'hello_world_with_types'</span>&gt;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;预期为&nbsp;'helloWorldWithTypes'</span><br><span data-darkreader-inline-color="">type</span>&nbsp;camelCase2&nbsp;=&nbsp;CamelCase&lt;<span data-darkreader-inline-color="">'HELLO_WORLD_WITH_TYPES'</span>&gt;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;预期为&nbsp;'helloWorldWithTypes'</span><br></code>
```

### 预备知识

#### 条件类型（extends 关键字）

extends 除了表示从一个类型扩展出另外一个新类型，还能用作条件类型，其写法有点像 JS 中的三元表达式（条件 ? true 表达式 : false 表达式）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">SomeType&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;OtherType&nbsp;?&nbsp;TrueType&nbsp;:&nbsp;FalseType;<br></code>
```

意为：如果 SomeType 可以分发给 OtherType，那么返回 TrueType，否则返回 FalseType。

比如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Example&nbsp;=&nbsp;Dog&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Animal&nbsp;<br>&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">number</span>&nbsp;<br>&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">string</span>;<br><span data-darkreader-inline-color="">//&nbsp;number</span><br></code>
```

Dog 可以分发给 Animal，属于 Animal 的子类型，Example 会得到 number 类型

#### **条件类型中的类型推断（infer 关键字）**

infer 可以在 extends 的条件语句中推断待推断的类型，它一定是出现在条件类型中的。

比如可以利用 infer 推断某个函数的返回值类型：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;ReturnType&lt;T&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;(...args:&nbsp;<span data-darkreader-inline-color="">any</span>[])&nbsp;=&gt;&nbsp;infer&nbsp;R&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;R&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span data-darkreader-inline-color="">any</span>;<br><span data-darkreader-inline-color="">//&nbsp;R&nbsp;就是函数的返回值类型</span><br></code>
```

利用 infer 推断某个数组每一项的类型：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;GetItem&lt;T&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;(infer&nbsp;R)[]&nbsp;?&nbsp;R&nbsp;:&nbsp;T;<br><span data-darkreader-inline-color="">//&nbsp;R&nbsp;就是数组每一项的类型</span><br></code>
```

它就是对于 extends 后面未知的某个类型进行一个占位 infer R，后续就可以使用推断出来的 R 这个类型。

#### 操作字符类型

ts 有一些内置的字符操作类型：

-   Uppercase<StringType>，把 string 都大写
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Greeting&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Hello,&nbsp;world"</span><br><span data-darkreader-inline-color="">type</span>&nbsp;ShoutyGreeting&nbsp;=&nbsp;Uppercase&lt;Greeting&gt;&nbsp;<span data-darkreader-inline-color="">//&nbsp;"HELLO,&nbsp;WORLD"</span><br></code>
```

-   Lowercase<StringType>，把 string 都小写
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Greeting&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Hello,&nbsp;world"</span><br><span data-darkreader-inline-color="">type</span>&nbsp;QuietGreeting&nbsp;=&nbsp;Lowercase&lt;Greeting&gt;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;"hello,&nbsp;world"</span><br></code>
```

-   Capitalize<StringType>，把 string 首字母大写
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;LowercaseGreeting&nbsp;=&nbsp;<span data-darkreader-inline-color="">"hello,&nbsp;world"</span>;<br><span data-darkreader-inline-color="">type</span>&nbsp;Greeting&nbsp;=&nbsp;Capitalize&lt;LowercaseGreeting&gt;;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;"Hello,&nbsp;world"</span><br></code>
```

-   Uncapitalize<StringType>，把 string 首字母小写
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;UppercaseGreeting&nbsp;=&nbsp;<span data-darkreader-inline-color="">"HELLO&nbsp;WORLD"</span>;<br><span data-darkreader-inline-color="">type</span>&nbsp;UncomfortableGreeting&nbsp;=&nbsp;Uncapitalize&lt;UppercaseGreeting&gt;;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;"hELLO&nbsp;WORLD"</span><br></code>
```

除了上面内置类型之外，还可以使用模板字符串

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;World&nbsp;=&nbsp;<span data-darkreader-inline-color="">'world'</span>;<br><br><span data-darkreader-inline-color="">type</span>&nbsp;Greeting&nbsp;=&nbsp;<span data-darkreader-inline-color="">`hello&nbsp;<span data-darkreader-inline-color="">${World}</span>`</span>;&nbsp;<br><span data-darkreader-inline-color="">//&nbsp;"hello&nbsp;world"</span><br></code>
```

### 代码实现 CamelCase

1.  因为待转换的字符是 snakeCase 下划线连接的，我们可以使用 infer 推断下划线前后的字符 P 和 T，并将 T 的首字母大写。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;CamelCase&lt;S&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;P}</span>_<span data-darkreader-inline-color="">${infer&nbsp;T}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${P}</span><span data-darkreader-inline-color="">${Capitalize&lt;T&gt;}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;S<br></code>
```

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;camelCase&nbsp;=&nbsp;CamelCase&lt;<span data-darkreader-inline-color="">'foo_bar'</span>&gt;<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  但是这样还不够，因为字符串可能是多个下划线连接的
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

需要递归对下划线后的字符继续调用 camelCase

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;CamelCase&lt;S&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;P}</span>_<span data-darkreader-inline-color="">${infer&nbsp;T}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${P}</span><span data-darkreader-inline-color="">${Capitalize&lt;CamelCase&lt;T&gt;&gt;}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;S<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3.  我们只对字符进行了首字母大写的操作，但是如果一开始都是大写字母，该操作没有意义
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以还需要将其余剩余字母转换成小写。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;CamelCase&lt;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Lowercase&lt;S&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;P}</span>_<span data-darkreader-inline-color="">${infer&nbsp;T}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${P}</span><span data-darkreader-inline-color="">${Capitalize&lt;CamelCase&lt;T&gt;&gt;}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;S<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;CamelCase&lt;Lowercase&lt;S&gt;&gt;<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

完整代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;CamelCase&lt;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Lowercase&lt;S&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;P}</span>_<span data-darkreader-inline-color="">${infer&nbsp;T}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${P}</span><span data-darkreader-inline-color="">${Capitalize&lt;CamelCase&lt;T&gt;&gt;}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;S<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;CamelCase&lt;Lowercase&lt;S&gt;&gt;<br></code>
```

## TS 实现 Camelize

实现了依赖的 CamelCase，现在可以来实现最终的 Camelize 了。

### Test Case

先看看测试用例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;camelize&nbsp;=&nbsp;Camelize&lt;{<br>&nbsp;&nbsp;some_prop:&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;<br>&nbsp;&nbsp;prop:&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;another_prop:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;array:&nbsp;[{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;snake_case:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;<br>&nbsp;&nbsp;}]<br>}&gt;<br><br><span data-darkreader-inline-color="">//&nbsp;expected&nbsp;to&nbsp;be</span><br><span data-darkreader-inline-color="">//&nbsp;{</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;someProp:&nbsp;string,&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;prop:&nbsp;{&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;anotherProp:&nbsp;string&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;},</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;array:&nbsp;[{&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;snakeCase:&nbsp;string&nbsp;</span><br><span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;}]</span><br><span data-darkreader-inline-color="">//&nbsp;}</span><br></code>
```

### 预备知识

#### 遍历对象

可以使用 keyof 获取某个对象类型 T 的所有 key 的集合，比如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">interface</span>&nbsp;Person&nbsp;{&nbsp;&nbsp;<br>&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">string</span>;<br>&nbsp;&nbsp;age:&nbsp;<span data-darkreader-inline-color="">number</span>;<br>}<br><br><span data-darkreader-inline-color="">type</span>&nbsp;attrs&nbsp;=&nbsp;keyof&nbsp;Person;<br><br><span data-darkreader-inline-color="">//&nbsp;attrs&nbsp;的类型为&nbsp;"name"&nbsp;|&nbsp;"age"&nbsp;的联合类型</span><br></code>
```

所以遍历一个对象类型 T，获取它的 key 和 value 类型可以这样写：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;traverse&lt;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T]:&nbsp;T[P]<br>}<br></code>
```

P in keyof T 表示 P 是 T 的其中一个 key，P 就是 key 的联合类型，T\[P\] 表示 value 的联合类型

#### 遍历数组

参考上面操作，P 是 T 的某个索引，T\[P\] 可以表示对象 value 的联合类型，

数组的索引都是 number，所以可以用 T\[number\] 来表示数组 value 的联合类型

### 代码实现 Camelize

1.  依然从最简单的入手，先来处理简单对象的情况，无嵌套，只有一层：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;camelize&nbsp;=&nbsp;Camelize&lt;{<br>&nbsp;&nbsp;foo_bar:&nbsp;<span data-darkreader-inline-color="">'foo_bar'</span><br>}&gt;<br></code>
```

先根据上面遍历对象的方法，得到入参 key 和 value 对应的联合类型

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T]:&nbsp;T[P]<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;:&nbsp;T<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在先将 key 转换为 camelCase，调用一开始实现的 camelCase 方法，但是直接将 P in keyof T 这一整部分传入 CameCase 类型会报错

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里需要使用 as 断言，比如断言为 string。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;<span data-darkreader-inline-color="">string</span>]:&nbsp;T[P]<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;:&nbsp;T<br></code>
```

然后再把这个 string 通过 CamelCase 转换一下，这里要联合 extends 一起使用。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;:&nbsp;T<br></code>
```

结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.  递归处理对象
    

处理了 key，我们还需要继续对 T\[P\] 进行处理，如果 T\[P\] 是对象就继续递归调用 Camelize，保证嵌套的对象都能正确转换。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Camelize&lt;T[P]&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T[P]<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;:&nbsp;T<br></code>
```

验证下结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3.  处理数组
    

上面我们只处理了对象，接下来处理数组的场景。

在处理对象时，T\[P\] 可能是数组，所以 Camelize 的入参除了是对象，还可能是数组，需要在一开始新增判断数组的逻辑

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">any</span>[]<br>&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">//&nbsp;处理数组</span><br>&nbsp;&nbsp;:&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Camelize&lt;T[P]&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T[P]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T<br></code>
```

接着对数组中每一项都跑一遍 Camelize

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">any</span>[]<br>&nbsp;&nbsp;?&nbsp;[Camelize&lt;T[<span data-darkreader-inline-color="">number</span>]&gt;]<br>&nbsp;&nbsp;:&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Camelize&lt;T[P]&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T[P]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T<br></code>
```

完整代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">any</span>[]<br>&nbsp;&nbsp;?&nbsp;[Camelize&lt;T[<span data-darkreader-inline-color="">number</span>]&gt;]<br>&nbsp;&nbsp;:&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Camelize&lt;T[P]&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T[P]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T<br></code>
```

## 所有代码

至此，使用 ts 实现 Camelize 的所有代码如下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">type</span>&nbsp;CamelCase&lt;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Lowercase&lt;S&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;S&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;P}</span>_<span data-darkreader-inline-color="">${infer&nbsp;T}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${P}</span><span data-darkreader-inline-color="">${Capitalize&lt;CamelCase&lt;T&gt;&gt;}</span>`</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;S<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;CamelCase&lt;Lowercase&lt;S&gt;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;<br><span data-darkreader-inline-color="">type</span>&nbsp;Camelize&lt;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">any</span>[]&gt;&nbsp;=&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">any</span>[]<br>&nbsp;&nbsp;?&nbsp;[Camelize&lt;T[<span data-darkreader-inline-color="">number</span>]&gt;]<br>&nbsp;&nbsp;:&nbsp;T&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[P&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;keyof&nbsp;T&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;P&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;?&nbsp;CamelCase&lt;P&gt;&nbsp;:&nbsp;P]:&nbsp;T[P]&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Object</span>&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Camelize&lt;T[P]&gt;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T[P]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;T<br></code>
```

相信掌握了上面的知识以及完成本次实战的同学，大家完成其它的 ts 挑战也是分分钟的事。

## 谢谢支持❤️

如果觉得有用，就**点赞**、**在看**、**分享**吧，谢谢大家啦～

### 参考资料

\[1\]

type challenge: https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md