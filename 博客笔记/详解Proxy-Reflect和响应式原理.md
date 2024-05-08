  

> 本文学习ES6后新增另外两个重要的知识：Proxy和Reflect。
> 
> 在学习它们之后，我们会利用它们实现Vue2和Vue3的响应式原理。

## 一. Proxy/Reflect

### 1.1. 监听对象的操作

我们先来看一个需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程

-   通过我们前面所学的知识，能不能做到这一点呢？
    
-   其实是可以的，我们可以通过之前的属性描述符中的存储属性描述符来做到；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span data-darkreader-inline-color="">Object</span>.keys(obj).forEach(<span><span>key</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;value&nbsp;=&nbsp;obj[key]<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.defineProperty(obj,&nbsp;key,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>newValue</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`监听到给<span data-darkreader-inline-color="">${key}</span>设置值`</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value&nbsp;=&nbsp;newValue<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`监听到获取<span data-darkreader-inline-color="">${key}</span>的值`</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>})<br><br>obj.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"kobe"</span><br>obj.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span><br><br><span data-darkreader-inline-color="">console</span>.log(obj.name)<br><span data-darkreader-inline-color="">console</span>.log(obj.age)<br></code>
```

上面这段代码就利用了前面讲过的 `Object.defineProperty` 的存储属性描述符来对属性的操作进行监听。

但是这样做有什么缺点呢？

-   首先，Object.defineProperty设计的初衷，不是为了去监听截止一个对象中所有的属性的。
    

-   我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强行将它变成了数据属性描述符。
    

-   其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么 Object.defineProperty是无能为力的。
    

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象。

### 1.2. Proxy基本使用

在ES6中，新增了一个Proxy类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的：

-   也就是说，如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy对象）；
    
-   之后对该对象的所有操作，都通过代理对象来完成，代理对象可以知道我们想要对原对象进行哪些操作；
    

我们可以将上面的案例用Proxy来实现一次：

-   首先，我们需要new Proxy对象，并且传入需要侦听的对象以及一个处理对象，可以称之为handler；
    

-   `const p = new Proxy(target, handler)`
    

-   其次，我们之后的操作都是直接对Proxy的操作，而不是原有的对象，因为我们需要在handler里面进行侦听；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;objProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{})<br><br>objProxy.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"kobe"</span><br>objProxy.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span><br><br><span data-darkreader-inline-color="">console</span>.log(objProxy.name)<br><span data-darkreader-inline-color="">console</span>.log(objProxy.age)<br></code>
```

如果我们想要侦听某些具体的操作，那么就可以在handler中添加对应的捕捉器（Trap）：

-   set和get分别对应的是函数类型；
    
-   set函数有四个参数：
    

-   target：目标对象（侦听的对象）；
    
-   property：将被设置的属性key；
    
-   value：新属性值；
    
-   receiver：调用的代理对象；
    

-   get函数有三个参数：
    

-   target：目标对象（侦听的对象）；
    
-   property：被获取的属性key；
    
-   receiver：调用的代理对象；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;objProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`侦听到代理对象被set操作`</span>,&nbsp;target,&nbsp;key,&nbsp;value)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`侦听到代理对象被get操作`</span>,&nbsp;target,&nbsp;key)<br>&nbsp;&nbsp;}<br>})<br><br>objProxy.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"kobe"</span><br>objProxy.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">30</span><br><br><span data-darkreader-inline-color="">console</span>.log(objProxy.name)<br><span data-darkreader-inline-color="">console</span>.log(objProxy.age)<br></code>
```

### 1.3. Proxy其他捕捉器

Proxy一共有13个捕捉器：

-   所有的捕捉器都是可选的，如果没有定义某个捕捉器，那么就会保留对象的默认行为；
    

13个活捉器分别是做什么的呢？

-   handler.getPrototypeOf()
    

-   Object.getPrototypeOf 方法的捕捉器。
    

-   handler.setPrototypeOf()
    

-   Object.setPrototypeOf 方法的捕捉器。
    

-   handler.isExtensible()
    

-   Object.isExtensible 方法的捕捉器。
    

-   handler.preventExtensions()
    

-   Object.preventExtensions 方法的捕捉器。
    

-   handler.getOwnPropertyDescriptor()
    

-   Object.getOwnPropertyDescriptor 方法的捕捉器。
    

-   handler.defineProperty()
    

-   Object.defineProperty 方法的捕捉器。
    

-   handler.ownKeys()
    

-   Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
    

-   **handler.has()**
    

-   in 操作符的捕捉器。
    

-   **handler.get()**
    

-   属性读取操作的捕捉器。
    

-   **handler.set()**
    

-   属性设置操作的捕捉器。
    

-   **handler.deleteProperty()**
    

-   delete 操作符的捕捉器。
    

-   handler.apply()
    

-   函数调用操作的捕捉器。
    

-   handler.construct()
    

-   new 操作符的捕捉器。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;objProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">has</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"has捕捉器"</span>,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;target<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"set捕捉器"</span>,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;target[key]&nbsp;=&nbsp;value<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"get捕捉器"</span>,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[key]<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">deleteProperty</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"delete捕捉器"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">delete</span>&nbsp;target[key]<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"name"</span>&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;objProxy)<br>objProxy.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"kobe"</span><br><span data-darkreader-inline-color="">console</span>.log(objProxy.name)<br><span data-darkreader-inline-color="">delete</span>&nbsp;objProxy.name<br></code>
```

当然，我们还会看到捕捉器中还有construct和apply，它们是应用于函数对象的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">foo</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"foo函数被调用了"</span>,&nbsp;<span data-darkreader-inline-color="">this</span>,&nbsp;<span data-darkreader-inline-color="">arguments</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"foo"</span><br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;fooProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(foo,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">apply</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;thisArg,&nbsp;otherArgs</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"函数的apply侦听"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target.apply(thisArg,&nbsp;otherArgs)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;construct(target,&nbsp;argArray,&nbsp;newTarget)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(target,&nbsp;argArray,&nbsp;newTarget)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;target()<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;fooProxy.apply({<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>},&nbsp;[<span data-darkreader-inline-color="">"aaa"</span>,&nbsp;<span data-darkreader-inline-color="">"bbb"</span>])<br><span data-darkreader-inline-color="">console</span>.log(result)<br><br><span data-darkreader-inline-color="">const</span>&nbsp;f&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;fooProxy(<span data-darkreader-inline-color="">"abc"</span>,&nbsp;<span data-darkreader-inline-color="">"cba"</span>)<br><span data-darkreader-inline-color="">console</span>.log(f)<br></code>
```

### 1.4. Reflect的使用

Reflect也是ES6新增的一个API，它是一个对象，字面的意思是反射。

那么这个Reflect有什么用呢？

-   它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法；
    
-   比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()；
    
-   比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty() ；
    

如果我们有Object可以做这些操作，那么为什么还需要有Reflect这样的新增对象呢？

-   这是因为在早期的ECMA规范中没有考虑到这种对 **对象本身** 的操作如何设计会更加规范，所以将这些API放到了Object上面；
    
-   但是Object作为一个构造函数，这些操作实际上放到它身上并不合适；
    
-   另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的；
    
-   所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上；
    

那么Object和Reflect对象之间的API关系，可以参考MDN文档：

-   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global\_Objects/Reflect/Comparing\_Reflect\_and\_Object\_methods
    

Reflect中有哪些常见的方法呢？它和Proxy是一一对应的：

-   Reflect.getPrototypeOf(target)
    

-   类似于 Object.getPrototypeOf()。
    

-   Reflect.setPrototypeOf(target, prototype)
    

-   设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true。
    

-   Reflect.isExtensible(target)
    

-   类似于 Object.isExtensible()
    

-   Reflect.preventExtensions(target)
    

-   类似于 Object.preventExtensions()。返回一个Boolean。
    

-   Reflect.getOwnPropertyDescriptor(target, propertyKey)
    

-   类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符,  否则返回 undefined.
    

-   Reflect.defineProperty(target, propertyKey, attributes)
    

-   和 Object.defineProperty() 类似。如果设置成功就会返回 true
    

-   Reflect.ownKeys(target)
    

-   返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
    

-   Reflect.has(target, propertyKey)
    

-   判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
    

-   Reflect.get(target, propertyKey\[, receiver\])
    

-   获取对象身上某个属性的值，类似于 target\[name\]。
    

-   Reflect.set(target, propertyKey, value\[, receiver\])
    

-   将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
    

-   Reflect.deleteProperty(target, propertyKey)
    

-   作为函数的delete操作符，相当于执行 delete target\[name\]。
    

-   Reflect.apply(target, thisArgument, argumentsList)
    

-   对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
    

-   Reflect.construct(target, argumentsList\[, newTarget\])
    

-   对构造函数进行 new 操作，相当于执行 new target(...args)。
    

那么我们可以将之前Proxy案例中对原对象的操作，都修改为Reflect来操作：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>&nbsp;height(newValue)&nbsp;{<br><br>&nbsp;&nbsp;}<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;objProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">has</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.has(target,&nbsp;key)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;key,&nbsp;value)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">deleteProperty</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.deleteProperty(target,&nbsp;key)<br>&nbsp;&nbsp;}<br>})<br><br><span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"name"</span>&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;objProxy)<br>objProxy.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"kobe"</span><br><span data-darkreader-inline-color="">console</span>.log(objProxy.name)<br><span data-darkreader-inline-color="">delete</span>&nbsp;objProxy.name<br><span data-darkreader-inline-color="">console</span>.log(objProxy)<br></code>
```

### 1.5. Receiver作用

我们发现在使用getter、setter的时候有一个receiver的参数，它的作用是什么呢？

-   如果我们的源对象（obj）有setter、getter的访问器属性，那么可以通过receiver来改变里面的this；
    

我们来看这样的一个对象：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">_height</span>:&nbsp;<span data-darkreader-inline-color="">1.88</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>&nbsp;height(newValue)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>._height&nbsp;=&nbsp;newValue<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>&nbsp;height()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>._height<br>&nbsp;&nbsp;}<br>}<br></code>
```

在创建它的代理，并且使用Reflect的时候，我们最好传入receiver参数：

-   如果不使用receiver，那么在setter和getter中访问到的this是obj对象；
    

### 1.6. construct使用

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Student</span>(<span>name,&nbsp;age</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.name&nbsp;=&nbsp;name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.age&nbsp;=&nbsp;age<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">Animal</span>(<span></span>)&nbsp;</span>{<br><br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;stu&nbsp;=&nbsp;<span data-darkreader-inline-color="">Reflect</span>.construct(Student,&nbsp;[<span data-darkreader-inline-color="">"why"</span>,&nbsp;<span data-darkreader-inline-color="">18</span>],&nbsp;Animal)<br><span data-darkreader-inline-color="">console</span>.log(stu.__proto__&nbsp;===&nbsp;Animal.prototype)&nbsp;<span data-darkreader-inline-color="">//&nbsp;true</span><br></code>
```

## 二. 响应式原理

### 2.1. 什么是响应式？

我们先来看一下响应式意味着什么？我们来看一段代码：

-   m有一个初始化的值，有一段代码使用了这个值；
    
-   那么在m有一个新的值时，这段代码可以自动重新执行；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;m&nbsp;=&nbsp;<span data-darkreader-inline-color="">20</span><br><span data-darkreader-inline-color="">console</span>.log(m)<br><span data-darkreader-inline-color="">console</span>.log(m&nbsp;*&nbsp;<span data-darkreader-inline-color="">2</span>)<br><br>m&nbsp;=&nbsp;<span data-darkreader-inline-color="">40</span><br></code>
```

上面的这样一种可以自动响应数据变量的代码机制，我们就称之为是响应式的。

那么我们再来看一下对象的响应式：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;obj.name<br><span data-darkreader-inline-color="">console</span>.log(obj.name)<br><br>obj.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"lilei"</span><br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

响应式原理

### 2.2. 响应式的设计

那么这种响应式我们应该怎么去设计呢？

#### 2.2.1. 响应式函数设计

首先，执行的代码中可能不止一行代码，所以我们可以将这些代码放到一个函数中：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">"why"</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">18</span><br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">foo</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;obj.name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(obj.name)<br>}<br></code>
```

那么我们的问题就变成了，当数据发生变化时，自动去执行某一个函数：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

响应式函数

但是有一个问题：在开发中我们是有很多的函数的，我们如何区分一个函数需要响应式，还是不需要响应式呢？

-   很明显，下面的函数中 foo 需要在obj的name发生变化时，重新执行，做出相应；
    
-   bar函数是一个完全独立于obj的函数，它不需要执行任何响应式的操作；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">foo</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;obj.name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(obj.name)<br>}<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">bar</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;<span data-darkreader-inline-color="">20</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">30</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Hello&nbsp;World"</span>)<br>}<br></code>
```

但是我们怎么区分呢？

-   这个时候我们封装一个新的函数watchFn；
    
-   凡是传入到watchFn的函数，就是需要响应式的；
    
-   其他默认定义的函数都是不需要响应式的；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">watchFn</span>(<span>fn</span>)&nbsp;</span>{<br><br>}<br><br><span data-darkreader-inline-color="">//&nbsp;需要响应式的函数</span><br>watchFn(<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">foo</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;obj.name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(obj.name)<br>})<br><br><span data-darkreader-inline-color="">//&nbsp;不需要响应式的函数</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">bar</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;<span data-darkreader-inline-color="">20</span>&nbsp;+&nbsp;<span data-darkreader-inline-color="">30</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"Hello&nbsp;World"</span>)<br>}<br></code>
```

比如下面的两个函数都是需要响应式的：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">watchFn(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;obj.name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(obj.name)<br>})<br><br>watchFn(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"my&nbsp;name&nbsp;is&nbsp;"</span>&nbsp;+&nbsp;obj.name)<br>})<br></code>
```

那么我们可以对watchFn进行函数的收集和保存：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;reactiveFns&nbsp;=&nbsp;[]<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">watchFn</span>(<span>fn</span>)&nbsp;</span>{<br>&nbsp;&nbsp;reactiveFns.push(fn)<br>&nbsp;&nbsp;fn()<br>}<br></code>
```

#### 2.2.2. 响应式依赖收集

目前我们收集的依赖是放到一个数组中来保存的，但是这里会存在数据管理的问题：

-   我们在实际开发中需要监听很多对象的响应式；
    
-   这些对象需要监听的不只是一个属性，它们很多属性的变化，都会有对应的响应式函数；
    
-   我们不可能在全局维护一大堆的数组来保存这些响应函数；
    

所以我们要设计一个类，这个类用于管理某一个对象的某一个属性的所有响应式函数：

-   相当于替代了原来的简单 `reactiveFns` 的数组；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Depend</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns&nbsp;=&nbsp;[]<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;addDepend(fn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns.push(fn)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;notify()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns.forEach(<span><span>fn</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn()<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br>}<br></code>
```

那么我们收集依赖的地方代码应该变成下面的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Depend()<br><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">watchFn</span>(<span>fn</span>)&nbsp;</span>{<br>&nbsp;&nbsp;dep.addDepend(fn)<br>&nbsp;&nbsp;fn()<br>}<br></code>
```

#### 2.2.3. 监听对象的变化

那么我们接下来就可以通过之前学习的方式来监听对象的变量：

-   方式一：通过 Object.defineProperty的方式（vue2采用的方式）；
    
-   方式二：通过new Proxy的方式（vue3采用的方式）；
    

我们这里先以Proxy的方式来监听：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"设置了新的值"</span>,&nbsp;key,&nbsp;value)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;key,&nbsp;value,&nbsp;receiver)<br>&nbsp;&nbsp;&nbsp;&nbsp;dep.notify()<br>&nbsp;&nbsp;}<br>})<br><br>proxyObj.name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"lilei"</span><br></code>
```

#### 2.2.4. 对象依赖的管理

我们目前是创建了一个Depend对象，用来管理对于name变化需要监听的响应函数：

-   但是实际开发中我们会有不同的对象，另外会有不同的属性需要管理；
    
-   我们如何可以使用一种数据结构来管理不同对象的不同依赖关系呢？
    

在前面我们刚刚学习过WeakMap，并且在学习WeakMap的时候我讲到了后面通过WeakMap如何管理这种响应式的数据依赖：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

依赖对象的管理

我们可以写一个getDepend函数专门来管理这种依赖关系：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;targetMap&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">WeakMap</span>()<br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">getDepends</span>(<span>obj,&nbsp;key</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据对象获取对应的Map对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;objMap&nbsp;=&nbsp;targetMap.get(obj)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!objMap)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;objMap&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Map</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;targetMap.set(obj,&nbsp;objMap)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据key获取Depend对象</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;depend&nbsp;=&nbsp;objMap.get(key)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!depend)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;depend&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Depend()<br>&nbsp;&nbsp;&nbsp;&nbsp;objMap.set(key,&nbsp;depend)<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;depend<br>}<br></code>
```

但是目前我们在set中获取到的depend只是一个对象，它里面是不包含我们想要的依赖函数的：

-   注意set获取到的虽然是一个depend对象，但是里面是没有依赖的；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"设置了新的值"</span>,&nbsp;key,&nbsp;value)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;key,&nbsp;value,&nbsp;receiver)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;dep.notify()<br>&nbsp;&nbsp;}<br>})<br></code>
```

#### 2.2.5. 正确的收集依赖

我们之前收集依赖的地方是在 watchFn 中：

-   但是这种收集依赖的方式我们根本不知道是哪一个key的哪一个depend需要收集依赖；
    
-   你只能针对一个单独的depend对象来添加你的依赖对象；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">watchFn</span>(<span>fn</span>)&nbsp;</span>{<br>&nbsp;&nbsp;dep.addDepend(fn)<br>&nbsp;&nbsp;fn()<br>}<br></code>
```

那么正确的应该是在哪里收集呢？应该在我们调用了Proxy的get捕获器时

-   因为如果一个函数中使用了某个对象的key，那么它应该被收集依赖；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;}<br>})<br></code>
```

当我们的依赖函数中使用了某个对象的某个key时，那么这个函数应该要被收集依赖：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">watchFn(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;newName&nbsp;=&nbsp;proxyObj.name<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(proxyObj.name)<br>})<br><br>watchFn(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"my&nbsp;name&nbsp;is&nbsp;"</span>&nbsp;+&nbsp;proxyObj.name)<br>})<br></code>
```

所以get函数应该改成下面的代码：

-   但是这个代码有一个问题，我们怎么去拿到响应函数，并且将其添加进来呢？
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;dep.addDepend()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;}<br>})<br></code>
```

我们可以先修改收集依赖的函数：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;reactiveFn&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span><br><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">watchFn</span>(<span>fn</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;dep.addDepend(fn)</span><br>&nbsp;&nbsp;reactiveFn&nbsp;=&nbsp;fn<br>&nbsp;&nbsp;fn()<br>&nbsp;&nbsp;reactiveFn&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span><br>}<br></code>
```

然后在get函数中修改成如下的代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;dep.addDepend(reactiveFn)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;}<br>})<br></code>
```

#### 2.2.6. 对Depend重构

但是这里有两个问题：

-   问题一：如果函数中有用到两次key，比如name，那么这个函数会被收集两次；
    
-   问题二：我们并不希望将添加reactiveFn放到get中，以为它是属于Dep的行为；
    

所以我们需要对Depend类进行重构：

-   解决问题一的方法：不使用数组，而是使用Set；
    
-   解决问题二的方法：添加一个新的方法，用于收集依赖；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;reactiveFn&nbsp;=&nbsp;<span data-darkreader-inline-color="">null</span><br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Depend</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Set</span>()<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;addDepend(fn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns.push(fn)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;depend()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(reactiveFn)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns.add(reactiveFn)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;notify()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.reactiveFns.forEach(<span><span>fn</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn()<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;}<br>}<br></code>
```

那么在get方法中，我们只需要直接去调用depend方法即可：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;proxyObj&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;dep.depend()<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;}<br>})<br></code>
```

#### 2.2.7. 创建响应式对象

我们目前的响应式是针对于obj一个对象的，我们可以创建出来一个函数，针对所有的对象都可以变成响应式对象：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reactive</span>(<span>obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dep.depend()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;key,&nbsp;receiver)<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>target,&nbsp;key,&nbsp;value,&nbsp;receiver</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Reflect</span>.set(target,&nbsp;key,&nbsp;value,&nbsp;receiver)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(target,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dep.notify()<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>}<br></code>
```

那么如果我们有一个新的对象，就可以这样来使用了：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;obj2&nbsp;=&nbsp;reactive({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">address</span>:&nbsp;<span data-darkreader-inline-color="">"广州市"</span><br>})<br><br>watchFn(<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"我的地址:"</span>,&nbsp;obj2.address)<br>})<br><br>obj2.address&nbsp;=&nbsp;<span data-darkreader-inline-color="">"北京市"</span><br></code>
```

#### 2.2.8. Vue2响应式原理

我们前面所实现的响应式的代码，其实就是Vue3中的响应式原理：

-   Vue3主要是通过Proxy来监听数据的变化以及收集相关的依赖的；
    
-   Vue2中通过我们前面学习过的Object.defineProerty的方式来实现对象属性的监听；
    

我们可以将reactive函数进行如下的重构：

-   首先，在传入对象时，我们可以遍历所有的key，并且通过属性存储描述符来监听属性的获取和修改；
    
-   在setter和getter方法中的逻辑和前面的Proxy是一致的；
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">reactive2</span>(<span>obj</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.keys(obj).forEach(<span><span>key</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">let</span>&nbsp;value&nbsp;=&nbsp;obj[key]<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">Object</span>.defineProperty(obj,&nbsp;key,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(obj,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dep.depend()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;value<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>:&nbsp;<span><span data-darkreader-inline-color="">function</span>(<span>newValue</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;dep&nbsp;=&nbsp;getDepends(obj,&nbsp;key)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value&nbsp;=&nbsp;newValue<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dep.notify()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;obj<br>}<br></code>
```