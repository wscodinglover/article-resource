在本次会议中，受关注程度较高的装饰器提案与 Type Annotations 提案均取得了阶段性进展，分别进入到 Stage 3 与 Stage 1。另外，本次会议中没有提案从 Stage 3 进入到 Stage 4。

**Stage 2 → Stage 3**

提案从 Stage 2 进入到 Stage 3 有以下几个门槛：

1.  撰写了包含提案所有内容的标准文本，并有指定的 TC39 成员审阅并签署了同意意见；
    
2.  ECMAScript 编辑签署了同意意见。
    

**Decorators**

提案链接：https://github.com/tc39/proposal-decorators

装饰器语法在 JavaScript / TypeScript 中都有着广泛的使用，但需要注意的是，TypeScript 中的装饰器实现基于第一版的装饰器提案实现，而目前，即本文说明的装饰器提案已经演进到了第三版，在各方面都与原先存在着一定差异。本文只会着重介绍新版的装饰器提案带来的相关语法，关于此前版本的装饰器提案，你可以参考 TypeScript 文档中的装饰器功能进行了解。

装饰器的本质就是一个函数，它能够动态地修改被装饰的类或类成员，在这些部分的值未定义时进行初始化，或在这里已有值时，在值实例化后执行一些额外的代码。

装饰器在被调用时会接受两个参数，并基于其返回值进行实际应用。一个最基本的装饰器类型定义大致是这样的：

```
<span></span><code><span>type</span>&nbsp;Decorator&nbsp;=&nbsp;(value:&nbsp;Input,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>string</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>get</span>?():&nbsp;unknown;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>?(value:&nbsp;unknown):&nbsp;<span>void</span>;<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;isPrivate?:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isStatic?:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;addInitializer?<span>(<span>initializer:&nbsp;(<span></span>)&nbsp;=&gt;&nbsp;<span>void</span></span>):&nbsp;<span>void</span>;<br>})&nbsp;=&gt;</span>&nbsp;Output&nbsp;|&nbsp;<span>void</span>;<br></code>
```

value 为这个装饰器应用处的类或类成员的值，而 context 则包含了这一被装饰的值的上下文信息。这两个参数都基于装饰器实际应用的位置来决定，如果装饰器的调用返回了一个值（Output），那么被装饰位置的值会被这个返回值替换掉。

对于 context 参数，我们先对其内部的属性做一个简单介绍：

-   kind，被装饰的值的类型，如 class / method / field 等，这一属性可以被用来确认装饰器被应用在了正确的位置，或者在一个装饰器中，基于实际应用位置执行不同的装饰逻辑。
    
-   name，被装饰的值的名称，如类名、属性名、方法名等。
    
-   access，其包含了这个值的 getter 与 setter，我们会在下面详细介绍。
    
-   isStatic 与 isPrivate，在装饰器应用于类成员时提供这一成员的访问性修饰符信息。
    
-   addInitializer，可以通过这个属性添加要在类实例化时执行的逻辑。
    

需要注意的是，除了语义与参数地变化，在调用方面新版的装饰器也进行了一些调整：

-   类表达式现在也可以应用装饰器了，如：  
    

```
<span></span><code><span>const</span>&nbsp;Foo&nbsp;=&nbsp;@deco&nbsp;<span><span>class</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span>constructor</span>()&nbsp;{}<br>}<br></code>
```

-   装饰器与 export 关键字一同应用的方式调整为：  
    

```
<span></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;@deco&nbsp;<span><span>class</span>&nbsp;<span>Foo</span>&nbsp;</span>{&nbsp;}<br></code>
```

### 类装饰器

类装饰器的类型定义如下：

```
<span></span><code><span>type</span>&nbsp;ClassDecorator&nbsp;=&nbsp;(value:&nbsp;<span>Function</span>,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>"class"</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;<span>undefined</span>;<br>&nbsp;&nbsp;addInitializer(initializer:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span>void</span>):&nbsp;<span>void</span>;<br>})&nbsp;=&gt;&nbsp;<span>Function</span>&nbsp;|&nbsp;<span>void</span>;<br></code>
```

value 为被装饰的 Class，你可以通过返回一个新的 Class 来完全替换掉原来的 Class。或者由于你能拿到原先的 Class，你也可以直接返回一个它的子类：

```
<span></span><code><span><span>function</span>&nbsp;<span>logged</span>(<span>value,&nbsp;{&nbsp;kind,&nbsp;name&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(kind&nbsp;===&nbsp;<span>"class"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>class</span>&nbsp;<span>extends</span>&nbsp;<span>value</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>constructor</span>(...args)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>super</span>(...args);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br><br>@logged<br><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{}<br></code>
```

### 类方法装饰器

类方法装饰器的类型定义如下：

```
<span></span><code><span>type</span>&nbsp;ClassMethodDecorator&nbsp;=&nbsp;(value:&nbsp;<span>Function</span>,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>"method"</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{&nbsp;<span>get</span>():&nbsp;unknown&nbsp;};<br>&nbsp;&nbsp;isStatic:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isPrivate:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;addInitializer(initializer:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span>void</span>):&nbsp;<span>void</span>;<br>})&nbsp;=&gt;&nbsp;<span>Function</span>&nbsp;|&nbsp;<span>void</span>;<br></code>
```

其 value 参数为被装饰的类方法，可以通过返回一个新的方法来直接在原型层面代替掉原来的方法（对于静态方法则在 Class 的层面替换）。或者你也可以包裹这个原来的方法，执行一些额外的逻辑：

```
<span></span><code><span><span>function</span>&nbsp;<span>logged</span>(<span>value,&nbsp;{&nbsp;kind,&nbsp;name&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(kind&nbsp;===&nbsp;<span>"method"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>function</span>&nbsp;(<span>...args</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;ret&nbsp;=&nbsp;value.call(<span>this</span>,&nbsp;...args);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;ret;<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br>}<br><br><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;@logged<br>&nbsp;&nbsp;m(arg)&nbsp;{}<br>}<br></code>
```

### 类访问器的装饰器

类访问器（getter / setter）的类型定义如下：

```
<span></span><code><span>type</span>&nbsp;ClassGetterDecorator&nbsp;=&nbsp;(value:&nbsp;<span>Function</span>,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>"getter"</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{&nbsp;<span>get</span>():&nbsp;unknown&nbsp;};<br>&nbsp;&nbsp;isStatic:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isPrivate:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;addInitializer(initializer:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span>void</span>):&nbsp;<span>void</span>;<br>})&nbsp;=&gt;&nbsp;<span>Function</span>&nbsp;|&nbsp;<span>void</span>;<br><br><span>type</span>&nbsp;ClassSetterDecorator&nbsp;=&nbsp;(value:&nbsp;<span>Function</span>,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>"setter"</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{&nbsp;<span>set</span>(value:&nbsp;unknown):&nbsp;<span>void</span>&nbsp;};<br>&nbsp;&nbsp;isStatic:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isPrivate:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;addInitializer(initializer:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span>void</span>):&nbsp;<span>void</span>;<br>})&nbsp;=&gt;&nbsp;<span>Function</span>&nbsp;|&nbsp;<span>void</span>;<br></code>
```

类似于方法装饰器，存取器的装饰器也会接受原本的方法，同时也能够进行替换。getter 与 setter 的装饰器是分开应用的，如以下的例子只对 getter 进行了装饰。

```
<span></span><code><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;@foo<br>&nbsp;&nbsp;<span>get</span>&nbsp;x()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;...</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>set</span>&nbsp;x(val)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>//&nbsp;...</span><br>&nbsp;&nbsp;}<br>}<br></code>
```

### 类属性装饰器

类属性装饰器的类型定义如下：

```
<span></span><code><span>type</span>&nbsp;ClassFieldDecorator&nbsp;=&nbsp;(value:&nbsp;<span>undefined</span>,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>"field"</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{&nbsp;<span>get</span>():&nbsp;unknown,&nbsp;<span>set</span>(value:&nbsp;unknown):&nbsp;<span>void</span>&nbsp;};<br>&nbsp;&nbsp;isStatic:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isPrivate:&nbsp;<span>boolean</span>;<br>})&nbsp;=&gt;&nbsp;<span>(<span>initialValue:&nbsp;unknown</span>)&nbsp;=&gt;</span>&nbsp;unknown&nbsp;|&nbsp;<span>void</span>;<br></code>
```

不同于上面的几种装饰器，属性装饰器的 value 并不是被装饰的属性的值。如果要获取被装饰的属性值，你可以让属性装饰器返回一个函数，这个函数会在属性被赋值时调用，拿到初始值作为入参，并可以返回一个新的值作为实际的赋值（属性装饰器同样拥有 addInitializer 入参，目前提案描述尚未更新）。

```
<span></span><code><span><span>function</span>&nbsp;<span>logged</span>(<span>value,&nbsp;{&nbsp;kind,&nbsp;name&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(kind&nbsp;===&nbsp;<span>"field"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>function</span>&nbsp;(<span>initialValue</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>599</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>//&nbsp;...</span><br>}<br><br><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;@logged&nbsp;x&nbsp;=&nbsp;<span>1</span>;<br>}<br><br><span>new</span>&nbsp;C().x;&nbsp;<span>//&nbsp;599</span><br></code>
```

### 自动访问器

这一提案除了装饰器以外，还引入了新的关键字 accessor，用于标识一个属性为自动访问器（Auto Accessor）。自动访问器属性的值、getter、setter 都会被定义在一个私有的存储空间中（类似于私有成员）。

这一元素类型被包括在装饰器提案的原因是其与许多装饰器使用场景的紧密结合，但自动存取器属性也可以独立地使用。

```
<span></span><code><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;accessor&nbsp;x&nbsp;=&nbsp;<span>1</span>;<br>}<br></code>
```

其等价于：

```
<span></span><code><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;#x&nbsp;=&nbsp;<span>1</span>;<br><br>&nbsp;&nbsp;<span>get</span>&nbsp;x()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>this</span>.#x;<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>set</span>&nbsp;x(val)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>this</span>.#x&nbsp;=&nbsp;val;<br>&nbsp;&nbsp;}<br>}<br></code>
```

同时，静态成员与私有成员也可以再次被修饰：

```
<span></span><code><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;<span>static</span>&nbsp;accessor&nbsp;x&nbsp;=&nbsp;<span>1</span>;<br>&nbsp;&nbsp;accessor&nbsp;#y&nbsp;=&nbsp;<span>2</span>;<br>}<br></code>
```

自动访问器的装饰器类型定义如下：

```
<span></span><code><span>type</span>&nbsp;ClassAutoAccessorDecorator&nbsp;=&nbsp;(<br>&nbsp;&nbsp;value:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>get</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;unknown;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>(value:&nbsp;unknown)&nbsp;=&gt;&nbsp;<span>void</span>;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;kind:&nbsp;<span>"accessor"</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;&nbsp;&nbsp;access:&nbsp;{&nbsp;<span>get</span>():&nbsp;unknown,&nbsp;<span>set</span>(value:&nbsp;unknown):&nbsp;<span>void</span>&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;isStatic:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;isPrivate:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;addInitializer(initializer:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span>void</span>):&nbsp;<span>void</span>;<br>&nbsp;&nbsp;}<br>)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span>get</span>?:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;unknown;<br>&nbsp;&nbsp;<span>set</span>?:&nbsp;<span>(<span>value:&nbsp;unknown</span>)&nbsp;=&gt;</span>&nbsp;<span>void</span>;<br>&nbsp;&nbsp;init?:&nbsp;<span>(<span>initialValue:&nbsp;unknown</span>)&nbsp;=&gt;</span>&nbsp;unknown;<br>}&nbsp;|&nbsp;<span>void</span>;<br></code>
```

其 value 入参为默认的 getter 与 setter 函数，可以通过在此处装饰器中返回新的 getter / setter 来进行替换。同时，自动访问器装饰器还能够拦截对属性的访问（而属性装饰器是不行的）。

自动访问器的装饰器返回结果还包含一个初始化函数，类似于属性装饰器的返回值，可以用来修改此属性的赋值。

使用示例如下：

```
<span></span><code><span><span>function</span>&nbsp;<span>logged</span>(<span>value,&nbsp;{&nbsp;kind,&nbsp;name&nbsp;}</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>if</span>&nbsp;(kind&nbsp;===&nbsp;<span>"accessor"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>let</span>&nbsp;{&nbsp;<span>get</span>,&nbsp;<span>set</span>&nbsp;}&nbsp;=&nbsp;value;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>get</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>`getting&nbsp;<span>${name}</span>`</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>get</span>.call(this);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>(val)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>`setting&nbsp;<span>${name}</span>&nbsp;to&nbsp;<span>${val}</span>`</span>);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>set</span>.call(this,&nbsp;val);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;init(initialValue)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>`initializing&nbsp;<span>${name}</span>&nbsp;with&nbsp;value&nbsp;<span>${initialValue}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;initialValue;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br><br>}<br><br><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;@logged&nbsp;accessor&nbsp;x&nbsp;=&nbsp;<span>1</span>;<br>}<br><br><span>let</span>&nbsp;c&nbsp;=&nbsp;<span>new</span>&nbsp;C();<br><span>//&nbsp;读取操作能够在返回的&nbsp;getter&nbsp;中被拦截</span><br>c.x;<br><span>//&nbsp;赋值操作同理</span><br>c.x&nbsp;=&nbsp;<span>123</span>;<br></code>
```

### 元数据 Metadata 的替代方案

在先前版本的装饰器中，我们通常通过元数据（Reflect Metadata）的方式来实现依赖注入与 IoC 机制，如 NestJS、Angular、MidwayJs 等一系列框架中都重度使用了装饰器与 IoC 能力。

在此版本的装饰器提案中，已不再强依赖元数据来实现依赖注入，如我们可以通过 context 参数中的 access 属性来模拟元数据的存储与读取：

```
<span></span><code><span>const</span>&nbsp;INJECTIONS&nbsp;=&nbsp;<span>new</span>&nbsp;<span>WeakMap</span>();<br><br><span><span>function</span>&nbsp;<span>createInjections</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;injections&nbsp;=&nbsp;[];<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span>injectable</span>(<span>Class</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;INJECTIONS.set(Class,&nbsp;injections);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span>inject</span>(<span>injectionKey</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span><span>function</span>&nbsp;<span>applyInjection</span>(<span>v,&nbsp;context</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;injections.push({&nbsp;injectionKey,&nbsp;<span>set</span>:&nbsp;context.access.set&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;{&nbsp;injectable,&nbsp;inject&nbsp;};<br>}<br><br><span><span>class</span>&nbsp;<span>Container</span>&nbsp;</span>{<br>&nbsp;&nbsp;registry&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Map</span>();<br><br>&nbsp;&nbsp;register(injectionKey,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>this</span>.registry.set(injectionKey,&nbsp;value);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;lookup(injectionKey)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>this</span>.registry.get(injectionKey);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;create(Class)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>let</span>&nbsp;instance&nbsp;=&nbsp;<span>new</span>&nbsp;Class();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>for</span>&nbsp;(<span>const</span>&nbsp;{&nbsp;injectionKey,&nbsp;<span>set</span>&nbsp;}&nbsp;of&nbsp;INJECTIONS.<span>get</span>(Class)&nbsp;||&nbsp;[])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>.call(instance,&nbsp;this.lookup(injectionKey));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;instance;<br>&nbsp;&nbsp;}<br>}<br><br>class&nbsp;Store&nbsp;{}<br><br><span>const</span>&nbsp;{&nbsp;injectable,&nbsp;inject&nbsp;}&nbsp;=&nbsp;createInjections();<br><br>@injectable<br><span><span>class</span>&nbsp;<span>C</span>&nbsp;</span>{<br>&nbsp;&nbsp;@inject(<span>'store'</span>)&nbsp;store;<br>}<br><br><span>let</span>&nbsp;container&nbsp;=&nbsp;<span>new</span>&nbsp;Container();<br><span>let</span>&nbsp;store&nbsp;=&nbsp;<span>new</span>&nbsp;Store();<br><br>container.register(<span>'store'</span>,&nbsp;store);<br><br><span>let</span>&nbsp;c&nbsp;=&nbsp;container.create(C);<br><br>c.store&nbsp;===&nbsp;store;&nbsp;<span>//&nbsp;true</span><br></code>
```

-   injectable 装饰器会为当前类的注入信息实例化一个单独的数组，而 inject 装饰器会将要注入的 key 与此属性的 setter 放入数组中。
    
-   container 是全局的容器存储，在注册时，会将 key 与对应的 value 存储起来。在调用 create 方法创建一个实例时，会使用要实例化的类作为 key ，拿到需要进行注入的属性名与其 setter，并使用要进行注入的值来调用 setter，以此完成一次依赖注入过程。
    

### 现有的装饰器将如何取舍

阅读完上面的内容后，你肯定会想到，现在已经被广泛使用的装饰器要怎么办？是否会带来巨大的迁移成本？考虑到这一点，装饰器提案的小组建议目前继续使用旧版装饰器（在 Babel 中被标记为 legacy 的装饰器语法，或是在 TypeScript 中被标记为 experimental 的装饰器语法），在提案的后续演进中，旧版装饰器的特殊功能也将逐渐在新版中被实现。

对于框架开发者来说，两个版本装饰器之间的兼容性确实存在较大的差异，如装饰器在调用时传入的参数。另外，目前这一提案并不包括参数的装饰器（如常见的构造函数参数装饰器），但可能在未来被支持。同时装饰器的运行顺序方面，TypeScript 装饰器的运行顺序是实例成员装饰器先于静态成员装饰器，而新版装饰器的运行顺序则是静态成员装饰器优先。因此，对于某些重度依赖装饰器的框架来说，甚至可能需要完全重写底层的依赖注入相关逻辑。

而作为使用者则并不需要过多担心迁移成本，新旧版装饰器语法基本一致，同时，新版的装饰器在大部分情况下是可以完全代替掉旧版装饰器能力的，甚至还犹有过之。

而旧版装饰器被废弃的重要原因之一则是其运行性能，如旧版装饰器的调用参数中能拿到被装饰成员所在的 Class 以及属性描述符（descriptor），因此能对 Class 上的属性方法进行魔改，这就导致了引擎在解析完 Class 体后再去执行装饰器时，最终的 Class 结构可能发生较大的改变，导致引擎的优化无法生效。而在新版装饰器中，调用入参并不包含 Class 构造函数与原型对象，对 Class 的访问与改装需要通过 addInitializer 来进行（也就提升了一定的复杂度），使得引擎的优化工作更有可能生效。

## Change array by copy

提案链接：https://github.com/tc39/proposal-change-array-by-copy

JavaScript 中的数组操作方法中有一部分是会改变原数组的，如 sort、reverse、splice 等，在需要保持原数组不变时，我们往往需要先复制一份原数组。这一提案引入了一系列秉持 Change Array by Copy 理念的方法，它们的功能完全对应于会改变原数组的版本，惟一的区别是方法调用将产生一个新的数组：

-   Array.prototype.toReversed
    
-   Array.prototype.toSorted
    
-   Array.prototype.toSpliced
    
-   Array.prototype.with
    

类似的，TypedArray 以及其子类的原型上也将新增这四个方法。

这些方法实际上最早来自于 Record and Tuple 这个目前处于 Stage2 的提案，其为 JavaScript 引入了不可变的对象（Record）与数组（也称元组，Tuple）。在 Tuple 的原型上就不存在数组那样将会修改自身的方法（push，pop等），你可以阅读 Tuple Prototype 了解更多 Tuple 上存在的方法。

为了使数组也能享受一部分“不可变”的特性，同时在未来能更容易处理数组和元组的兼容性，这些方法成为了一个独立的提案，即 Change Array by Copy 。

这四个方法目前已经拥有对应的 Polyfill 支持，参考 CoreJS 或 ES Shims。

## RegExp set notation

提案链接：https://github.com/tc39/proposal-regexp-set-notation

这一提案目前包含了两个部分：

-   在正则表达式中，引入新的 & 语法来支持集合操作，如交集与并集，以及嵌套字符类。
    
-   字符类的字符串字面量属性支持，其原提案为 proposal-regexp-unicode-sequence-properties。
    

许多正则表达式引擎都支持预设的字符集（通常都是 Unicode 的各种字符集），避免开发者需要在正则表达式中硬编码字符集。同时提案也包含了字符集的交集、差集操作，便于自由组合多个字符集。

```
<span></span><code>//&nbsp;差集<br>[A--B]<br><br>//&nbsp;交集<br>[A&amp;&amp;B]<br><br>//&nbsp;嵌套字符集<br>[A--[0-9]]<br></code>
```

比如下面这个正则表达式可以匹配所有非 ASCII 数字，然后我们就可以将这些非 ASCII 数字转换成 ASCII 数字：

```
<span></span><code>[\p{Decimal_Number}--[0-9]]<br></code>
```

或者匹配所有非 ASCII 的 Emoji：

```
<span></span><code>[\p{Emoji}--\p{ASCII}]</code>
```

**Stage 1 → Stage 2**

从 Stage 1 进入到 Stage 2 需要完成撰写包含提案所有内容的标准文本的初稿。

## Decorator Metadata

提案链接：https://github.com/tc39/proposal-decorator-metadata

元数据提案将从装饰器提案中独立出来进行迭代，目前其处于 Stage 2 阶段（而装饰器提案处于 Stage 3 阶段）。在装饰器提案中，我们已经知道目前版本的装饰器相比之前发生了较大的变化，而元数据也是如此。

在此前的版本中，由于所有类型的装饰器都能够访问整个类原型级别的元数据，我们可以很容易地通过定义与收集元数据来实现校验、依赖注入、路由注册（如 NestJs 与 MidwayJs）等功能。而由于最新版本的装饰器中，各个类型的装饰器只能够访问目前被装饰的成员，如属性装饰器成员将无法再访问类的原型。因此，新的元数据提案旨在进一步扩展装饰器的入参来实现这一功能：

```
<span></span><code><span>interface</span>&nbsp;MetadataKey&nbsp;{<br>&nbsp;&nbsp;parent:&nbsp;MetadataKey&nbsp;|&nbsp;<span>null</span>;<br>}<br><br><span>type</span>&nbsp;Decorator&nbsp;=&nbsp;(value:&nbsp;Input,&nbsp;context:&nbsp;{<br>&nbsp;&nbsp;kind:&nbsp;<span>string</span>;<br>&nbsp;&nbsp;name:&nbsp;<span>string</span>&nbsp;|&nbsp;symbol;<br>&nbsp;&nbsp;access:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>get</span>?():&nbsp;unknown;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>set</span>?(value:&nbsp;unknown):&nbsp;<span>void</span>;<br>&nbsp;&nbsp;};<br>&nbsp;&nbsp;isPrivate?:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;isStatic?:&nbsp;<span>boolean</span>;<br>&nbsp;&nbsp;addInitializer?<span>(<span>initializer:&nbsp;(<span></span>)&nbsp;=&gt;&nbsp;<span>void</span></span>):&nbsp;<span>void</span>;<br>+&nbsp;<span>metadataKey</span>?:&nbsp;<span>MetadataKey</span>;<br>+&nbsp;<span>class</span>?:&nbsp;{<br>+&nbsp;&nbsp;&nbsp;<span>metadataKey</span>:&nbsp;<span>MetadataKey</span>;<br>+&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>string</span>;<br>+&nbsp;}<br>})&nbsp;=&gt;</span>&nbsp;Output&nbsp;|&nbsp;<span>void</span>;<br></code>
```

通过新的入参 metadataKey 以及 Class 定义上的 `Symbol.metadataKey` ，就能够访问到对应的元数据。

-   metadataKey 将会出现在出属性装饰器以外的装饰器入参中，可以使用它来作为元数据的 Key：  
    

```
<span></span><code><span>const</span>&nbsp;METADATA&nbsp;=&nbsp;<span>new</span>&nbsp;WeakMap();<br><br><span><span>function</span>&nbsp;<span>meta</span>(<span>value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span>(<span>_,&nbsp;context</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;METADATA.set(context.metadataKey,&nbsp;value);<br>&nbsp;&nbsp;};<br>}<br><br><span>@meta</span>(<span>'a'</span>)<br><span>class</span>&nbsp;C&nbsp;{<br>&nbsp;&nbsp;<span>@meta</span>(<span>'b'</span>)<br>&nbsp;&nbsp;m()&nbsp;{}<br>}<br><br>METADATA.get(C[Symbol.metadata]);&nbsp;<span>//&nbsp;'a'</span><br>METADATA.get(C.m[Symbol.metadata]);&nbsp;<span>//&nbsp;'b'</span><br></code>
```

-   class 参数将会出现在所有类成员装饰器的装饰器入参中，包含当前从属 Class 的 metadataKey 以及其名称。可以通过这一方式来在类成员装饰器中去注册类级别的元数据，同时，由于类属性装饰器并没有实际与元数据关联的价值与方式，这也是它唯一存储元数据的方式。  
    

```
<span></span><code><span>const</span>&nbsp;METADATA&nbsp;=&nbsp;<span>new</span>&nbsp;WeakMap();<br><span>const</span>&nbsp;CLASS&nbsp;=&nbsp;Symbol();<br><br><span><span>function</span>&nbsp;<span>meta</span>(<span>value</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;<span>(<span>_,&nbsp;context</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;metadataKey&nbsp;=&nbsp;context.class?.metadataKey&nbsp;??&nbsp;context.metadataKey;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>const</span>&nbsp;metadataName&nbsp;=&nbsp;context.kind&nbsp;===&nbsp;<span>'class'</span>&nbsp;?&nbsp;CLASS&nbsp;:&nbsp;context.name;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>let</span>&nbsp;meta&nbsp;=&nbsp;METADATA.get(metadataKey);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span>&nbsp;(meta&nbsp;===&nbsp;<span>undefined</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;meta&nbsp;=&nbsp;<span>new</span>&nbsp;Map();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;METADATA.set(metadataKey,&nbsp;meta);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;meta.set(metadataName,&nbsp;value);<br>&nbsp;&nbsp;};<br>}<br><br><span>@meta</span>(<span>'a'</span>)<br><span>class</span>&nbsp;C&nbsp;{<br>&nbsp;&nbsp;<span>@meta</span>(<span>'b'</span>)<br>&nbsp;&nbsp;foo;<br><br>&nbsp;&nbsp;<span>@meta</span>(<span>'c'</span>)<br>&nbsp;&nbsp;<span>get</span>&nbsp;bar()&nbsp;{}<br><br>&nbsp;&nbsp;<span>@meta</span>(<span>'d'</span>)<br>&nbsp;&nbsp;baz()&nbsp;{}<br>}<br><br><span>//&nbsp;访问类的元数据</span><br><span>const</span>&nbsp;meta&nbsp;=&nbsp;METADATA.get(C[Symbol.metadataKey]);<br><br>meta.get(CLASS);&nbsp;<span>//&nbsp;'a';</span><br>meta.get(<span>'foo'</span>);&nbsp;<span>//&nbsp;'b';</span><br>meta.get(<span>'bar'</span>);&nbsp;<span>//&nbsp;'c';</span><br>meta.get(<span>'baz'</span>);&nbsp;<span>//&nbsp;'d';</span><br></code>
```

**Stage 0 → Stage 1**

从 Stage 0 进入到 Stage 1 有以下门槛：

1.  找到一个 TC39 成员作为 champion 负责这个提案的演进；
    
2.  明确提案需要解决的问题与需求和大致的解决方案；
    
3.  有问题、解决方案的例子；
    
4.  对 API 形式、关键算法、语义、实现风险等有讨论、分析。  
    Stage 1 的提案会有可预见的比较大的改动，以下列出的例子并不代表提案最终会是例子中的语法、语义。
    

Type Annotations

提案链接：https://github.com/tc39/proposal-type-annotations

这一提案是本次会议受关注程度最高的一项，由于讨论事项太多，甚至在3.29、3.31两天的会议里都占据了较长的会议时间。同时，TypeScript、C#、Delphi 的作者 Anders Hejlsberg 也到场参加了讨论。

这一提案尝试为灵活的 JavaScript 引入原生的静态类型检查，而在社区，我们能看到许多类似的方案，如 Meta 的 Flow（React 与 GraphQL  均使用 flow 编写），Google 的 Closure Compiler 以及目前被广泛使用的微软的 TypeScript 等。实际上这一提案的提出者就是 TypeScript 团队。

TypeScript 与 Flow 这一类方案除了编译时外的类型，还提供了一个重要的功能：语法降级，这也是 Babel 的核心功能之一，让我们可以提前享受到 ECMAScript 未完全进入标准的语法和提案。由于这些类型同样是在编译时被擦除，因此开发者能够在一次编译中完成类型的抹除和语法的降级。但随着运行时的支持不断提升，语法降级这一功能的重要性在逐步降低，阻拦在开发者面前的往往就只剩下了类型抹除这一工作，如果 JavaScript 以及运行时能够原生支持类型，连这一步骤都能被跳过，这无疑会带来更好的开发体验。

此提案引入的语法和 TypeScript 的类型语法基本一致，如基本的类型标注，函数类型签名，接口，类型导入/导出以及基础的类型别名功能：

> 为了实现正确的 markdown 语法高亮，这里使用 TypeScript 代码格式，但在此提案中也是完全合法的语法。

```
<span></span><code><span>import</span>&nbsp;<span>type</span>&nbsp;{&nbsp;Foo&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"foo"</span>;<br><span>import</span>&nbsp;<span>type</span>&nbsp;*&nbsp;<span>as</span>&nbsp;Bar&nbsp;<span>from</span>&nbsp;<span>"bar"</span>;<br><br><span>let</span>&nbsp;x:&nbsp;<span>string</span>;<br>x&nbsp;=&nbsp;<span>"hello"</span>;<br>x&nbsp;=&nbsp;<span>100</span>;<br><br><span><span>function</span>&nbsp;<span>equals</span>(<span>x:&nbsp;<span>number</span>,&nbsp;y?:&nbsp;<span>number</span></span>):&nbsp;<span>boolean</span>&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;x&nbsp;===&nbsp;y;<br>}<br><br><span>interface</span>&nbsp;Person&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span>string</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;<span>number</span>;<br>}<br><br><span>export</span>&nbsp;<span>type</span>&nbsp;CoolBool&nbsp;=&nbsp;<span>boolean</span>;<br></code>
```

除了这些基础类型语法外，此提案还引入了相当大一部分 TypeScript 中类型编程的相关语法，如类型断言、泛型：

```
<span></span><code><span>const</span>&nbsp;point&nbsp;=&nbsp;<span>JSON</span>.parse(serializedPoint)&nbsp;<span>as</span>&nbsp;({&nbsp;x:&nbsp;<span>number</span>,&nbsp;y:&nbsp;<span>number</span>&nbsp;});<br><span>//&nbsp;非空断言</span><br><span>document</span>.getElementById(<span>"entry"</span>)!.innerText&nbsp;=&nbsp;<span>"..."</span>;<br><br><span>type</span>&nbsp;Foo&lt;T&gt;&nbsp;=&nbsp;T[]<br><br><span>interface</span>&nbsp;Bar&lt;T&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;x:&nbsp;T;<br>}<br><br><span><span>function</span>&nbsp;<span>foo</span>&lt;<span>T</span>&gt;(<span>x:&nbsp;T</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;x;<br>}<br></code>
```

对于函数的泛型调用，如 `add<number>(4, 5)` 的形式，由于这一语法已经在 JavaScript 中被视为是正确的，为了进行区分，此提案考虑引入 `::` 符号来作为替代，即 `add::<number>(4, 5)` 的形式。

此提案暂不准备一次性将 TypeScript 的所有功能都融入进来，如声明文件、函数重载、基于 `private` 关键字的私有成员声明等，这些功能都被视为是可选的。同时，由于此提案的核心关注点仍然是编译时的可擦除类型，部分涉及到运行时定义的语法如枚举、命名空间等都不在本提案的包含范围内。

这一提案虽然目前基本只对 TypeScript 语法兼容，但提出者解释道他们会在尽可能兼容 TypeScript 的同时，也允许其他类型系统如 Flow 的语法兼容。实际上，它最核心的目的即是为了解决目前 ECMAScript 中，由于缺少类型相关语法导致的各个社区方案逐渐开始分裂这一问题。同时，TypeScript 现在以及未来的部分语法可能与 ECMAScript 的语法产生冲突，这就将导致进一步的分裂。因此，如果能在 ECMAScript 中，为类型相关的语法提前预留出一部分适用于各个类型方案的语法空间，就能够避免社区方案进一步的分裂以及可能存在的语法冲突。

需要注意的是，目前此提案仍在设计中，未来可能有较大规模的改动，请关注提案仓库来了解最新的变化。

你可能认为，带上类型就是束缚了以灵活著称的 JavaScript 的翅膀，但实际上这些类型，以及类型的严格程度是完全可选的（就好像 TypeScript 在不同的配置与要求下简直就是两门语言），你还是可以拥抱无类型的 JavaScript。同时你无法忽略一个事实：社区对 JavaScript 类型的呼声正在越来越高，静态类型在 2020 年与 2021年的 _What do you feel is currently missing from JavaScript_ 中都排名第一。也就说，摆在我们眼前的并不是**要不要给 JavaScript 带来类型**，而是**如何为 JavaScript 更好地带来类型**。

## Function.prototype.once

提案链接：https://github.com/tc39/proposal-function-once

在 JavaScript 中的异步、事件监听器等场景中，回调函数是一个被广泛使用的编程范式。在部分场景下，我们可能会希望回调函数仅被调用一次。而 JavaScript 目前并不原生支持此能力，因此社区出现了 once 和 onetime 这些库来支持对一个函数的单次调用，它们均有着 3000w+ 的周下载量。

而这一提案就旨在为 JavaScript 引入原生的单次调用支持。它的语法为通过调用一个函数的 `once` 方法来创建一个单次调用版本的函数。同时，对于这个单次函数除了首次以外的调用，都不会再次执行此函数，而是之前返回首次调用的结果。

```
<span></span><code><span><span>function</span>&nbsp;<span>f</span>&nbsp;(<span>x</span>)&nbsp;</span>{&nbsp;<span>console</span>.log(x);&nbsp;<span>return</span>&nbsp;x&nbsp;*&nbsp;<span>2</span>;&nbsp;}<br><br><span>const</span>&nbsp;fOnce&nbsp;=&nbsp;f.once();<br>fOnce(<span>3</span>);&nbsp;<span>//&nbsp;打印3，返回6</span><br>fOnce(<span>3</span>);&nbsp;<span>//&nbsp;并不会打印3，但仍然会返回6</span><br></code>
```

## Intl.MessageFormat

提案链接：https://github.com/tc39/proposal-intl-messageformat

类似于其他 Intl 下的提案，MessageFormat 同样旨在进一步地提升Web 前端中本地化工作的便捷性。此提案引入了 Intl.MessageFormatter API 来作为 Message Format 2.0 的本地解析器与格式化工具。作为在 Unicode 联盟下开展的规范，MF2 得到了相当广泛的支持，即此提案将允许通过行业级别的标准来实现 Web 中的本地化工作。

此提案的使用场景主要在于对给定的消息进行对应的语言环境与语言情景下地翻译，比如对于这样一条消息："你当前有三条新信息"，首先需要给到其 MF2 定义：

```
<span></span><code>new_notifications&nbsp;[<span>$count</span>]&nbsp;=<br>&nbsp;&nbsp;[0]&nbsp;&nbsp;&nbsp;你现在还没有信息<br>&nbsp;&nbsp;[one]&nbsp;你收到新信息了~<br>&nbsp;&nbsp;[_]&nbsp;&nbsp;&nbsp;你收到了&nbsp;{<span>$count</span>}&nbsp;条新信息，快打开看看吧！<br></code>
```

这里定义了无消息、单条消息、多条消息的几种情况，然后在 JavaScript 中就可以通过 Intl.MessageFormatter 进行调用：

```
<span></span><code><span>const</span>&nbsp;resource&nbsp;=&nbsp;...&nbsp;<span>//&nbsp;即以上的&nbsp;MF2&nbsp;定义</span><br><span>const</span>&nbsp;mf&nbsp;=&nbsp;<span>new</span>&nbsp;<span>Intl</span>.MessageFormat(resource,&nbsp;[<span>'en'</span>]);<br><span>const</span>&nbsp;msg&nbsp;=&nbsp;mf.resolveMessage(<span>'new_notifications'</span>,&nbsp;{&nbsp;<span>count</span>:&nbsp;<span>3</span>&nbsp;});<br>msg.toString();&nbsp;<span>//&nbsp;'你收到了 3 条新信息，快打开看看吧！'</span><br></code>
```

此提案将引入的 API 具体格式将取决于 MF2 工作组最终为 MF2 落地的语法。

**结语**

由贺师俊牵头，阿里巴巴前端标准化小组等多方参与组建的 JavaScript 中文兴趣小组（JSCIG，JavaScript Chinese Interest Group）在 GitHub 上开放讨论各种 ECMAScript 的问题，非常欢迎有兴趣的同学参与讨论：https://github.com/JSCIG/es-discuss/discussions 。

___

关注「Alibaba F2E」微信公众号把握阿里巴巴前端新动向