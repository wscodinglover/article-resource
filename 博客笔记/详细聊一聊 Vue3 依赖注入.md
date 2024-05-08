在 Vue.js 中，依赖注入<sup data-darkreader-inline-color="">[1]</sup>（DI）是一种非常常见的跨组件传递数据的方法，它可以帮助我们更好地管理组件之间的依赖关系。本文将介绍 Vue3 中的依赖注入机制，包括 `provide()` 和 `inject()` 函数的使用方法、使用注意以及优缺点和适用场景等方面的内容。

> 如果你对“依赖注入”的概念不熟悉，可以通过《Wiki - 依赖注入<sup data-darkreader-inline-color="">[2]</sup>》链接进行了解。

## ✨ 快速上手

Vue3 中的依赖注入机制提供 `provide()` 和 `inject()` 函数，用于实现**「组件之间的依赖关系传递和共享」**。

### 介绍

在没有依赖注入机制之前，开发者经常会遇到**「组件属性逐级透传」**的问题，也就是**「组件的属性需要逐层往深层子组件进行传递」**，导致链路很长，非常麻烦。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（图片来源：Vue.js<sup data-darkreader-inline-color="">[3]</sup>）

为了解决这个问题，Vue3 提供的依赖注入机制，只需要在父组件提供（provide）依赖，任何层级的后代组件注入该依赖即可。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)（图片来源：Vue.js<sup data-darkreader-inline-color="">[4]</sup>）

下面先介绍 `provide()` 和 `inject()` 这两个函数的接口定义：

-   `provide(name, value)`
    

通常在父组件使用，提供一个值，可以被任意层级子组件注入。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">provide</span>&lt;<span data-darkreader-inline-color="">T</span>&gt;(<span>key:&nbsp;InjectionKey&lt;T&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;value:&nbsp;T</span>):&nbsp;<span data-darkreader-inline-color="">void</span></span>;<br></code>
```

该函数接收 2 个参数，参数`name`为**「注入的 key」**，可以是**「字符串」**或者 `Symbol`，子组件通过该值来注入，参数`value`为需要注入的依赖值，可以是任何类型的值。

-   `inject`
    

常在子组件使用，注入一个由父组件或整个应用 (通过 `app.provide()`) 提供的值。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;没有默认值</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">inject</span>&lt;<span data-darkreader-inline-color="">T</span>&gt;(<span>key:&nbsp;InjectionKey&lt;T&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span></span>):&nbsp;<span data-darkreader-inline-color="">T</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span></span>;<br><br><span data-darkreader-inline-color="">//&nbsp;带有默认值</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">inject</span>&lt;<span data-darkreader-inline-color="">T</span>&gt;(<span>key:&nbsp;InjectionKey&lt;T&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;defaultValue:&nbsp;T</span>):&nbsp;<span data-darkreader-inline-color="">T</span></span>;<br><br><span data-darkreader-inline-color="">//&nbsp;使用工厂函数</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">inject</span>&lt;<span data-darkreader-inline-color="">T</span>&gt;(<span><br>&nbsp;&nbsp;key:&nbsp;InjectionKey&lt;T&gt;&nbsp;|&nbsp;<span data-darkreader-inline-color="">string</span>,<br>&nbsp;&nbsp;defaultValue:&nbsp;()&nbsp;=&gt;&nbsp;T,<br>&nbsp;&nbsp;treatDefaultAsFactory:&nbsp;<span data-darkreader-inline-color="">true</span><br></span>):&nbsp;<span data-darkreader-inline-color="">T</span></span>;<br></code>
```

该函数接收 2 个参数，参数 `key` 为父组件提供值的\*\* key\*\*，参数`defaultValue`为可选参数，作为依赖的默认值，可以是具体的值，也可以是函数，来创建复杂的值，参数`treatDefaultAsFactory`也是可选值，当 `defaultValue`为函数时，需要设置`treatDefaultAsFactory`为 `false`，表明这个函数是默认值，而不是工厂函数。

### 使用示例

下面是 `provide()` 和 `inject()` 函数的使用示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">&lt;!--&nbsp;父组件&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">child-component</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">child-component</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br>provide(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"Chris"</span>);<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span data-darkreader-inline-color="">&lt;!--&nbsp;子组件&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>name:&nbsp;{{&nbsp;name&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;inject&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"defaultName"</span>);<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br></code>
```

在上面的示例中，我们在父组件中使用 `provide('name', 'Chris')` 提供了一个注入名为 `name` 的值，值为 `'Chris'`。在子组件中使用 `inject('name', 'defaultName')`注入这个值，并赋值给变量 `name`，添加到模版中。

## 🚀 使用场景

通常有以下使用常见：

-   **「大型项目」**：在大型项目中，组件之间的依赖关系比较复杂，使用依赖注入可以更好地管理这些依赖关系。
    
-   **「可重用性要求高的项目」**：在需要重用代码的项目中，使用依赖注入可以提高代码的可重用性。
    
-   **「需要进行单元测试的项目」**：在需要进行单元测试的项目中，使用依赖注入可以使测试更容易进行。
    

## ❓ 常见问题

使用 `provide()` 和 `inject()` 时需要注意以下问题：

### `inject()` 只能使用在 setup() 或函数组件中

如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 内同步调用： 比如：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br>provide(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"Chris"</span>);<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br></code>
```

或者：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;inject&nbsp;}&nbsp;from&nbsp;'vue'&nbsp;export&nbsp;default&nbsp;{&nbsp;setup()&nbsp;{&nbsp;const&nbsp;message&nbsp;=<br>inject('message')&nbsp;return&nbsp;{&nbsp;message&nbsp;}&nbsp;}&nbsp;}<br></code>
```

### `provide()` 注入名可以为 Symbol 类型

使用`provide(name, value)`，`name`参数可以支持不同类型的值，包括：

-   字符串：如 `provide('name', 'Chris')`；
    
-   `Symbol`：如 `provide(Symbol(), 'Chris')`，当我们在开发大型且依赖多的应用时，可以使用 `Symbol`类型作为注入名，**「避免冲突」**；
    

接下来是使用 `Symbol`\+ TypeScript 的一个示例代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;key.ts</span><br><span data-darkreader-inline-color="">import</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;{&nbsp;InjectionKey&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;symbolStringKey&nbsp;=&nbsp;Symbol()&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;InjectionKey&lt;<span data-darkreader-inline-color="">string</span>&gt;;<br><br><span data-darkreader-inline-color="">//&nbsp;父组件</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;symbolStringKey&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./key"</span>;<br>provide(symbolStringKey,&nbsp;<span data-darkreader-inline-color="">"Chris"</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;子组件</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;inject&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;symbolNumberKey&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./key"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;symbolNumber&nbsp;=&nbsp;inject(symbolNumberKey);<br></code>
```

在使用 TypeScript 时，可以使用 `InjectionKey`泛型类型，并使用注入值的类型作为泛型参数。

### `provide()` 注入值为响应式数据

使用`provide(name, value)`， `value` 参数可以支持不同类型的值，包括：

-   普通类型：如字符串，数字，普通对象等；
    
-   响应式类型：如 Vue3 的 `ref`，`reactive`，`readonly` 等，如果是响应式数据，则该值发生变化后，有注入该值的任何层级的子组件，都会更新这个值；
    

接下来演示一下响应式类型的示例：

-   父组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide,&nbsp;ref,&nbsp;reactive,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;Child1&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./Child1.vue"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;user&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;};<br><span data-darkreader-inline-color="">const</span>&nbsp;userRef&nbsp;=&nbsp;ref({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br><span data-darkreader-inline-color="">const</span>&nbsp;userReactive&nbsp;=&nbsp;reactive({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br><span data-darkreader-inline-color="">const</span>&nbsp;userReadonly&nbsp;=&nbsp;readonly({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br><br>provide(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"Chris"</span>);<br>provide(<span data-darkreader-inline-color="">"age"</span>,&nbsp;<span data-darkreader-inline-color="">18</span>);<br>provide(<span data-darkreader-inline-color="">"user"</span>,&nbsp;user);<br>provide(<span data-darkreader-inline-color="">"userRef"</span>,&nbsp;userRef);<br>provide(<span data-darkreader-inline-color="">"userReactive"</span>,&nbsp;userReactive);<br>provide(<span data-darkreader-inline-color="">"userReadonly"</span>,&nbsp;userReadonly);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;changeUser&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;user.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"New&nbsp;Chris"</span>;<br>&nbsp;&nbsp;user.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserRef&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userRef.value.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Ref&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userRef.value.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReactive&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userReactive.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Reactive&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userReactive.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReadonly&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Readonly&nbsp;Chris"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"ProvideInject"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Root&nbsp;Component<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUser"</span>&gt;</span>Update&nbsp;user<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserRef"</span>&gt;</span>Update&nbsp;userRef<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReactive"</span>&gt;</span>Update&nbsp;userReactive<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReadonly"</span>&gt;</span>Update&nbsp;userReadonly<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>user：&nbsp;{{&nbsp;user.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;user.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userRef：&nbsp;{{&nbsp;userRef.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userRef.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReactive：&nbsp;{{&nbsp;userReactive.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReactive.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReadonly：&nbsp;{{&nbsp;userReadonly.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReadonly.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child1</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

-   子组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;inject,&nbsp;ref,&nbsp;reactive,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"defaultName"</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;age&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"age"</span>,&nbsp;<span data-darkreader-inline-color="">20</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;user&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"user"</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">22</span>&nbsp;});<br><span data-darkreader-inline-color="">const</span>&nbsp;userRef&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"userRef"</span>,&nbsp;ref({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">22</span>&nbsp;}));<br><span data-darkreader-inline-color="">const</span>&nbsp;userReactive&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"userReactive"</span>,&nbsp;reactive({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">22</span>&nbsp;}));<br><span data-darkreader-inline-color="">const</span>&nbsp;userReadonly&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"userReadonly"</span>,&nbsp;readonly({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">22</span>&nbsp;}));<br><br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserRef&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userRef.value.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Child1&nbsp;Ref&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userRef.value.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReactive&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userReactive.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Child1&nbsp;Reactive&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userReactive.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReadonly&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Child1&nbsp;Readonly&nbsp;Chris"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"Child1"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Child&nbsp;Component&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserRef"</span>&gt;</span>Update&nbsp;userRef<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReactive"</span>&gt;</span>Update&nbsp;userReactive<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReadonly"</span>&gt;</span>Update&nbsp;userReadonly<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>name：&nbsp;{{&nbsp;name&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>age：&nbsp;{{&nbsp;age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>user：&nbsp;{{&nbsp;user.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;user.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userRef：&nbsp;{{&nbsp;userRef.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userRef.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReactive：&nbsp;{{&nbsp;userReactive.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReactive.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReadonly：&nbsp;{{&nbsp;userReadonly.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReadonly.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

在这个示例中，父组件使用 `provide()` 函数提供普通对象、`ref`响应式对象、`reactive`响应式对象、`readonly`响应式对象，然后子组件分别注入这些依赖并将值展示在视图中。最后在父子组件分别提供按钮修改这些值，观察父子组件视图上数据的变化。 可以观察到，普通对象变化后，子组件视图并不会更新，而如果是**「响应式对象」**发生变化，则**「子组件视图更新」**。

> 示例代码地址：https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Vue/Demo/ProvideInject<sup data-darkreader-inline-color="">[5]</sup>

### 尽量在提供方组件更新响应式数据

由于响应式数据作为 `provide()`提供的值，可以在任意层级的子组件注入，并且修改后会响应式变化，这就导致很多时候，**「我们无法知道是在哪个子组件修改了这个响应式数据」**。 因此建议开发者尽量在父组件，也就是响应式数据提供方的组件进行更新数据，确保提供状态声明和变更操作都在同一个组件，方便维护。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide,&nbsp;ref,&nbsp;reactive,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;Child1&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./Child1.vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;userRef&nbsp;=&nbsp;ref({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br>provide(<span data-darkreader-inline-color="">"userRef"</span>,&nbsp;userRef);<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserRef&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userRef.value.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Ref&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userRef.value.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"ProvideInject"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Root&nbsp;Component<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserRef"</span>&gt;</span>Update&nbsp;userRef<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userRef：&nbsp;{{&nbsp;userRef.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userRef.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child1</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

在这个示例代码中，父组件通过 `provide()`提供了 `userRef`响应式数据，并且通过 `changeUserRef`方法修改 `userRef`的值。 当子组件需要修改响应式数据时，可以在父组件也提供一个修改值的方法：

-   父组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide,&nbsp;ref,&nbsp;reactive,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;Child1&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./Child1.vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;userRef&nbsp;=&nbsp;ref({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br>provide(<span data-darkreader-inline-color="">"userRef"</span>,&nbsp;{&nbsp;userRef,&nbsp;changeUserRef&nbsp;});<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserRef&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;userRef.value.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Ref&nbsp;Chris"</span>;<br>&nbsp;&nbsp;userRef.value.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"ProvideInject"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Root&nbsp;Component<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserRef"</span>&gt;</span>Update&nbsp;userRef<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userRef：&nbsp;{{&nbsp;userRef.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userRef.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child1</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

-   子组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;inject&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;userRef,&nbsp;changeUserRef&nbsp;}&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"userRef"</span>);<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"Child1"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Child&nbsp;Component&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserRef"</span>&gt;</span>Update&nbsp;userRef<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userRef：&nbsp;{{&nbsp;userRef.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userRef.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

上面示例代码中，父组件通过 `provide('userRef', {userRef, changeUserRef})`将修改响应式数据的方法也提供出去，子组件注入依赖后，通过解构获取到 `changeUserRef` 方法，即可修改该响应式数据。

### 使用 readonly() 让注入方无法修改提供的数据

如果开发者想让父组件提供的值数据，不能被子组件，也就是注入方修改，可以通过 Vue3 提供的 `readonly()`方法来包装该值，接下来看个示例代码。

-   父组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;provide,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;Child1&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./Child1.vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;userReadonly&nbsp;=&nbsp;readonly({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"Chris"</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>&nbsp;});<br>provide(<span data-darkreader-inline-color="">"userReadonly"</span>,&nbsp;userReadonly);<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReadonly&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Readonly&nbsp;Chris"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"ProvideInject"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Root&nbsp;Component<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReadonly"</span>&gt;</span>Update&nbsp;userReadonly<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReadonly：&nbsp;{{&nbsp;userReadonly.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReadonly.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child1</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

-   子组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;inject,&nbsp;readonly&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"vue"</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;userReadonly&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"userReadonly"</span>,&nbsp;readonly({&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">22</span>&nbsp;}));<br><span data-darkreader-inline-color="">const</span>&nbsp;changeUserReadonly&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"Child1&nbsp;Readonly&nbsp;Chris"</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;@ts-ignore</span><br>&nbsp;&nbsp;userReadonly.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span>;<br>};<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&nbsp;<span data-darkreader-inline-color="">class</span>=<span data-darkreader-inline-color="">"Child1"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>Child&nbsp;Component&nbsp;1<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">button</span>&nbsp;@<span data-darkreader-inline-color="">click</span>=<span data-darkreader-inline-color="">"changeUserReadonly"</span>&gt;</span>Update&nbsp;userReadonly<span>&lt;/<span data-darkreader-inline-color="">button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>userReadonly：&nbsp;{{&nbsp;userReadonly.name&nbsp;}}&nbsp;/&nbsp;{{&nbsp;userReadonly.age&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

这个示例代码中，父组件使用 `provide()`提供的值是个 `readonly()`包装的值，子组件在注入之后，无法修改。

### 在嵌套 provide 时，存在同名的 key 会如何？

由于 `provide`可以无限层级的使用，经常就会出现 `provide`的 `key` 名称重复的情况，那么这时候 `inject`注入的值会变成什么？我们看看下面这个示例代码：

-   父组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br>provide(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"Chris"</span>);<br><span data-darkreader-inline-color="">//&nbsp;省略其他</span><br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child1</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

-   子组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br>provide(<span data-darkreader-inline-color="">'name'</span>,&nbsp;<span data-darkreader-inline-color="">'Child&nbsp;Provide'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;省略其他</span><br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">Child2</span>&gt;</span><span>&lt;/<span data-darkreader-inline-color="">Child1</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

-   孙组件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">const</span>&nbsp;name&nbsp;=&nbsp;inject(<span data-darkreader-inline-color="">"name"</span>,&nbsp;<span data-darkreader-inline-color="">"defaultName"</span>);<br><span data-darkreader-inline-color="">//&nbsp;省略其他</span><br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span>name：&nbsp;{{&nbsp;name&nbsp;}}<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br></code>
```

最后可以看到视图显示的是 "`name：Child Provide`"。 所以当出现嵌套 `provide` 时，存在同名的 `key` 时，会优先使用最近的父组件的 `provide` 值。

## 🤔 优缺点

### 优点

-   **「减少组件之间的耦合度」**：依赖注入可以帮助我们更好地管理组件之间的依赖关系，减少组件之间的耦合度，使代码更容易维护和扩展。
    
-   **「提高代码的可重用性」**：依赖注入可以使代码更加模块化，提高代码的可重用性。
    
-   **「更容易进行单元测试」**：依赖注入可以使代码更容易进行单元测试，因为我们可以用 mock 对象替代实际对象，更方便地进行测试。
    

### 缺点

-   **「增加代码的复杂度」**：依赖注入需要增加一些额外的代码来实现，这会增加代码的复杂度。
    
-   **「可能会导致性能问题」**：依赖注入可能会导致性能问题，因为它需要在运行时动态获取依赖关系。
    

## 🔍 总结

本文主要介绍了 Vue3 中的依赖注入机制，包括 `provide()` 和 `inject()` 函数的使用方法、使用注意以及优缺点和适用场景等方面的内容。通过本文的介绍，相信读者可以更好地理解 Vue3 中的依赖注入机制，并在实际项目中进行应用。

## 📚 拓展资料

如果你想深入了解 Vue3 中的依赖注入机制，可以参考以下资料：

-   Vue.js - Provide / Inject<sup data-darkreader-inline-color="">[6]</sup>
    
-   Vue.js Internals: Understanding the Dependency Injection System<sup data-darkreader-inline-color="">[7]</sup>
    
-   The new Provide and Inject in Vue 3<sup data-darkreader-inline-color="">[8]</sup>
    

希望这些资料能够对你有所帮助！

### 参考资料

\[1\]

依赖注入: https://vuejs.org/guide/components/provide-inject.html

\[2\]

Wiki - 依赖注入: https://zh.wikipedia.org/wiki/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5

\[3\]

Vue.js: https://vuejs.org/guide/components/provide-inject.html#prop-drilling

\[4\]

Vue.js: https://vuejs.org/guide/components/provide-inject.html#prop-drilling

\[5\]

https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Vue/Demo/ProvideInject: https://github.com/pingan8787/Leo-JavaScript/tree/master/Cute-Vue/Demo/ProvideInject

\[6\]

Vue.js - Provide / Inject: https://vuejs.org/guide/components/provide-inject.html

\[7\]

Vue.js Internals: Understanding the Dependency Injection System: https://codedamn.com/news/vuejs/vuejs-internals-dependency-injection-system

\[8\]

The new Provide and Inject in Vue 3: https://vuedose.tips/the-new-provide-inject-in-vue-3