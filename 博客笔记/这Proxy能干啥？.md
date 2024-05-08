提到 proxy，貌似很多人的印象是这东西是实现 vue3 的核心，但好像除此以外就没有什么关于 proxy 实际应用的场景了。今天就重新在了解一下 proxy，并在文章最后会给出几个 proxy 的实际应用案例，扩展下对 proxy 使用的场景。让大家写出逼格更高，更有深度的代码。

首先我们要先复习下 proxy 的基本知识。

## Proxy 基础

## proxy 是个啥？

在 JavaScript 中，`Proxy` 对象是 ES6 引入的一种机制，它允许你创建一个代理对象，用于拦截和定义基本操作的自定义行为。`Proxy` 出现的主要原因包括：

1.  拦截和修改操作：`Proxy` 允许你拦截并重定义对象上的基本操作，比如读取属性、设置属性、函数调用等。这使得你可以在这些操作发生前后插入自定义逻辑。
    
2.  数据绑定和观察：你可以使用 `Proxy` 监听对象属性的变化。当被代理对象的属性发生变化时，可以触发相关操作，这对于实现数据绑定和观察模式非常有用。
    
3.  安全性：`Proxy` 可以用于创建安全的对象，限制对对象的访问和操作。你可以通过拦截器来验证用户的操作，以确保对象的安全性。
    
4.  元编程：`Proxy` 提供了元编程的能力，即在运行时改变语言的行为。通过拦截器，你可以动态地修改对象的行为，这为实现更高级的编程模式提供了可能性。
    
5.  函数式编程：在函数式编程中，`Proxy` 可以用于创建不可变（immutable）的数据结构，确保数据不被修改，从而避免副作用。
    

总的来说，`Proxy` 出现的主要原因是为了提供更灵活、可控制、可定制的对象操作和行为，使得开发者能够更好地掌握和管理代码的执行过程。

## 为啥要有 proxy

在 JavaScript 中引入 `Proxy` 的历史原因主要是为了提供更灵活和可扩展的对象操作机制。在 ES6 之前，JavaScript 语言中并没有原生的方式来实现对象的拦截和定制操作行为。开发者通常需要依赖对象的 getter 和 setter 方法，或者使用一些特定的命名约定来模拟拦截操作，但这些方法都有限制和局限性。

随着应用程序变得越来越复杂，需要更多灵活性和可控性来处理对象的操作。因此，在 ECMAScript 6（ES6）标准中引入了 `Proxy`，以提供一种通用的、标准化的机制，使开发者可以在对象上定义自定义的操作行为。这种机制的引入使得 JavaScript 的对象系统更加强大和灵活，为开发者提供了更多处理对象的方式，也为实现各种高级编程模式和设计模式提供了基础。

因此，`Proxy` 的引入主要是为了满足 JavaScript 编程语言在处理对象时的需求，提供了一种更现代、更强大的对象操作机制。

## Proxy 的好兄弟 Reflect

`Proxy` 和 `Reflect` 是 ES6 中引入的两个相关的特性。这两者常常一起使用，因为 `Reflect` 提供了一套默认行为，这些行为与函数调用对应，与 `Proxy` 的 handler 对象能处理的各种相对应。

## Proxy 和 Reflect 的交互

1.  对称性：`Reflect` API 的设计目标之一是与 `Proxy` handlers 的方法保持一致性。例如，`Reflect.get(target, property, receiver)` 与 `get` 方法具有相同的参数。这使得我们在编写 `Proxy` 时，可以很方便地调用对应的 `Reflect` 方法来保留默认行为。
    
2.  默认行为：`Proxy` 的方法可以让我们自定义基本操作，但有时我们想要修改某些行为的同时保留默认行为。这时，我们可以在 `Proxy` 内调用对应的 `Reflect` 方法。这样做不仅代码更简洁，而且 `Reflect` 的方法会处理原型链相关的细节。
    

## 没有 Reflect 呢？

如果没有 `Reflect`，我们通常需要手动复制原有的行为，这可能导致代码冗长且容易出错。例如，如果你想在 `get` 操作前添加日志记录，没有 `Reflect` 你可能需要这样做：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;proxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(target,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;property,&nbsp;receiver)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Property&nbsp;<span data-darkreader-inline-color="">${property}</span>&nbsp;has&nbsp;been&nbsp;read.`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[property];&nbsp;<span data-darkreader-inline-color="">//&nbsp;如果属性在原型链上，这里就不够用了</span><br>&nbsp;&nbsp;}<br>});<br></code>
```

如果 `property` 属性存在于原型链上，这种方法就会失败。而使用 `Reflect.get()`，它会自动处理这些细节：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">let</span>&nbsp;proxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(target,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;property,&nbsp;receiver)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Property&nbsp;<span data-darkreader-inline-color="">${property}</span>&nbsp;has&nbsp;been&nbsp;read.`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;property,&nbsp;receiver);<br>&nbsp;&nbsp;}<br>});<br></code>
```

使用 `Reflect` 还可以确保返回值和异常的正确传递，因为 `Reflect` 的方法返回的是操作的状态（成功或者失败），这正好与 `Proxy` 的要求相符合。

## 举几个使用案例

## 模拟对象关系数据库

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;模拟数据库</span><br><span data-darkreader-inline-color="">const</span>&nbsp;database&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">users</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'Alice'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">25</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">2</span>,&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'Bob'</span>,&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...more&nbsp;users</span><br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">posts</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">1</span>,&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">'Post&nbsp;1'</span>,&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'Content&nbsp;1'</span>,&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">id</span>:&nbsp;<span data-darkreader-inline-color="">2</span>,&nbsp;<span data-darkreader-inline-color="">title</span>:&nbsp;<span data-darkreader-inline-color="">'Post&nbsp;2'</span>,&nbsp;<span data-darkreader-inline-color="">content</span>:&nbsp;<span data-darkreader-inline-color="">'Content&nbsp;2'</span>,&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;...more&nbsp;posts</span><br>&nbsp;&nbsp;],<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;模拟ORM生成器</span><br><span data-darkreader-inline-color="">const</span>&nbsp;createORM&nbsp;=&nbsp;<span>(<span>tableName,&nbsp;primaryKey</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(database[tableName],&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;property)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'findAll'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回所有记录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;target;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'findById'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据主键查找记录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;target.find(<span><span>item</span>&nbsp;=&gt;</span>&nbsp;item[primaryKey]&nbsp;===&nbsp;id);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(property&nbsp;===&nbsp;<span data-darkreader-inline-color="">'findBy'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;根据条件查找记录</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span>(<span>condition</span>)&nbsp;=&gt;</span>&nbsp;target.filter(<span><span>item</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;key&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;condition)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(item[key]&nbsp;!==&nbsp;condition[key])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;其他属性返回原始值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[property];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;});<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;使用ORM生成器创建User和Post对象</span><br><span data-darkreader-inline-color="">const</span>&nbsp;User&nbsp;=&nbsp;createORM(<span data-darkreader-inline-color="">'users'</span>,&nbsp;<span data-darkreader-inline-color="">'id'</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;Post&nbsp;=&nbsp;createORM(<span data-darkreader-inline-color="">'posts'</span>,&nbsp;<span data-darkreader-inline-color="">'id'</span>);<br><br><span data-darkreader-inline-color="">//&nbsp;使用ORM查询数据</span><br><span data-darkreader-inline-color="">console</span>.log(User.findAll());&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回所有用户</span><br><span data-darkreader-inline-color="">console</span>.log(User.findById(<span data-darkreader-inline-color="">1</span>));&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回id为1的用户</span><br><span data-darkreader-inline-color="">console</span>.log(User.findBy({&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>&nbsp;}));&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回年龄为30的用户</span><br><span data-darkreader-inline-color="">console</span>.log(Post.findAll());&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回所有帖子</span><br><span data-darkreader-inline-color="">console</span>.log(Post.findBy({&nbsp;<span data-darkreader-inline-color="">userId</span>:&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;}));&nbsp;<span data-darkreader-inline-color="">//&nbsp;返回userId为1的帖子</span><br></code>
```

首先，我们有一个名为 `database` 的模拟数据库，其中包含两个表：`users` 和 `posts`。每个表都有一些示例记录，包括用户信息和帖子信息。

然后，我们有一个 `createORM` 函数，它是一个 ORM 生成器。这个函数接受两个参数：`tableName` 表示表的名称，`primaryKey` 表示主键的名称。它返回了一个代理对象，这个代理对象通过 Proxy 对象对数据库中的表进行了包装。

这个代理对象中的 `get` 方法用于捕获对对象属性的访问。在这个方法中，我们检查了被访问的属性是否是 `findAll`、`findById` 或 `findBy`。如果是其中之一，它们分别返回了对应的函数：

-   `findAll` 返回指定表中的所有记录。
    
-   `findById` 根据指定的主键值返回对应的记录。
    
-   `findBy` 根据指定的条件返回符合条件的记录。
    

除了以上三个特殊属性外，对于其他属性，代理对象会直接返回数据库中对应表的属性值。

接着，我们使用 `createORM` 函数创建了 `User` 和 `Post` 对象，分别对应于 `users` 表和 `posts` 表。

最后，我们使用这些生成的对象执行了一些查询操作。例如，我们调用 `User.findAll()` 返回了所有用户的信息，调用 `Post.findBy({ userId: 1 })` 返回了所有 `userId` 为 1 的帖子的信息。

## 表单验证器

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;Validator&nbsp;=&nbsp;<span>(<span>rules</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>({},&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(target,&nbsp;property,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;rule&nbsp;=&nbsp;rules[property];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(rule)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;验证规则存在</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;validation&nbsp;<span data-darkreader-inline-color="">of</span>&nbsp;rule)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;type,&nbsp;message,&nbsp;condition&nbsp;}&nbsp;=&nbsp;validation;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用Reflect进行验证</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;isValid&nbsp;=&nbsp;<span data-darkreader-inline-color="">Reflect</span>[type](value,&nbsp;condition);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!isValid)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.error(<span data-darkreader-inline-color="">`Validation&nbsp;failed&nbsp;for&nbsp;<span data-darkreader-inline-color="">${property}</span>:&nbsp;<span data-darkreader-inline-color="">${message}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">false</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;符合规则，设置值</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target[property]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;});<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;定义表单验证规则</span><br><span data-darkreader-inline-color="">const</span>&nbsp;formRules&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">username</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isString'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Username&nbsp;must&nbsp;be&nbsp;a&nbsp;string'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{}&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isLength'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Username&nbsp;must&nbsp;be&nbsp;between&nbsp;5&nbsp;and&nbsp;15&nbsp;characters'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{&nbsp;<span data-darkreader-inline-color="">min</span>:&nbsp;<span data-darkreader-inline-color="">5</span>,&nbsp;<span data-darkreader-inline-color="">max</span>:&nbsp;<span data-darkreader-inline-color="">15</span>&nbsp;}&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">password</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isString'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Password&nbsp;must&nbsp;be&nbsp;a&nbsp;string'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{}&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isLength'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Password&nbsp;must&nbsp;be&nbsp;at&nbsp;least&nbsp;8&nbsp;characters'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{&nbsp;<span data-darkreader-inline-color="">min</span>:&nbsp;<span data-darkreader-inline-color="">8</span>&nbsp;}&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'matches'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Password&nbsp;must&nbsp;contain&nbsp;at&nbsp;least&nbsp;one&nbsp;uppercase&nbsp;letter'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;<span data-darkreader-inline-color="">/[A-Z]/</span>&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">email</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isString'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Email&nbsp;must&nbsp;be&nbsp;a&nbsp;string'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{}&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'isEmail'</span>,&nbsp;<span data-darkreader-inline-color="">message</span>:&nbsp;<span data-darkreader-inline-color="">'Invalid&nbsp;email&nbsp;format'</span>,&nbsp;<span data-darkreader-inline-color="">condition</span>:&nbsp;{}&nbsp;},<br>&nbsp;&nbsp;],<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;使用表单验证器</span><br><span data-darkreader-inline-color="">const</span>&nbsp;formValidator&nbsp;=&nbsp;Validator(formRules);<br><br><span data-darkreader-inline-color="">//&nbsp;模拟表单数据</span><br><span data-darkreader-inline-color="">const</span>&nbsp;formData&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">username</span>:&nbsp;<span data-darkreader-inline-color="">'john_doe'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">password</span>:&nbsp;<span data-darkreader-inline-color="">'SecurePass123'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">email</span>:&nbsp;<span data-darkreader-inline-color="">'john.doe@example.com'</span>,<br>};<br><br><span data-darkreader-inline-color="">//&nbsp;验证表单数据</span><br><span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">const</span>&nbsp;field&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;formData)&nbsp;{<br>&nbsp;&nbsp;formValidator[field]&nbsp;=&nbsp;formData[field];<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;表单验证结果</span><br><span data-darkreader-inline-color="">console</span>.log(formValidator);<br></code>
```

首先，我们有一个名为 `Validator` 的函数，它接受一个规则对象作为参数，并返回了一个代理对象。这个代理对象用于捕获对属性的赋值操作，即在设置属性值时进行验证。

在代理对象的 `set` 方法中，我们首先检查给定属性的验证规则是否存在。如果存在规则，我们就遍历这些规则，并对属性值进行验证。验证规则包括 `type`（验证函数名称）、`message`（验证失败时的错误消息）和 `condition`（验证条件）。

接着，我们使用 `Reflect[type]` 来调用相应的内置验证函数，比如 `isString`、`isLength`、`matches`、`isEmail` 等。如果验证失败，我们会输出相应的错误消息，并阻止属性值的设置。

如果所有的验证规则都通过了，我们就将属性值设置到目标对象中，并返回 `true`，表示设置成功。

接下来，我们定义了一个 `formRules` 对象，其中包含了对表单字段的验证规则。每个字段都有一个对应的验证规则数组。

然后，我们使用 `Validator` 函数并传入 `formRules` 来创建了一个表单验证器 `formValidator`。

接着，我们定义了一个模拟的表单数据对象 `formData`，其中包含了要验证的字段和对应的值。

然后，我们遍历 `formData` 中的每个字段，并将其值赋给 `formValidator` 对象中的相应属性。这会触发代理对象的 `set` 方法进行验证。

最后，我们输出了经过验证后的 `formValidator` 对象，其中包含了验证通过的表单数据。

## 日志

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;创建一个目标对象</span><br><span data-darkreader-inline-color="">const</span>&nbsp;targetObject&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">value</span>:&nbsp;<span data-darkreader-inline-color="">42</span>&nbsp;};<br><br><span data-darkreader-inline-color="">//&nbsp;创建一个日志对象</span><br><span data-darkreader-inline-color="">const</span>&nbsp;logger&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Logger();<br><br><span data-darkreader-inline-color="">//&nbsp;创建一个&nbsp;Proxy，用于记录日志</span><br><span data-darkreader-inline-color="">const</span>&nbsp;logProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(targetObject,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;prop)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;logger.log(<span data-darkreader-inline-color="">`Getting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[prop];<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(target,&nbsp;prop,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;logger.log(<span data-darkreader-inline-color="">`Setting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>&nbsp;to&nbsp;<span data-darkreader-inline-color="">${value}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;target[prop]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;deleteProperty(target,&nbsp;prop)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;logger.warn(<span data-darkreader-inline-color="">`Deleting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">delete</span>&nbsp;target[prop];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;apply(target,&nbsp;thisArg,&nbsp;args)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;logger.log(<span data-darkreader-inline-color="">`Applying&nbsp;function&nbsp;<span data-darkreader-inline-color="">${target.name&nbsp;||&nbsp;<span data-darkreader-inline-color="">'anonymous'</span>}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target.apply(thisArg,&nbsp;args);<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;construct(target,&nbsp;args)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;logger.log(<span data-darkreader-inline-color="">`Constructing&nbsp;object&nbsp;with&nbsp;<span data-darkreader-inline-color="">${target.name&nbsp;||&nbsp;<span data-darkreader-inline-color="">'anonymous'</span>}</span>&nbsp;constructor`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;target(...args);<br>&nbsp;&nbsp;},<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;使用&nbsp;Proxy&nbsp;访问目标对象</span><br>logProxy.value;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取属性，触发日志</span><br>logProxy.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置属性，触发日志</span><br><span data-darkreader-inline-color="">delete</span>&nbsp;logProxy.value;&nbsp;<span data-darkreader-inline-color="">//&nbsp;删除属性，触发日志</span><br></code>
```

首先，我们有一个名为 `targetObject` 的目标对象，其中包含一个属性 `value`，其初始值为 `42`。

然后，我们创建了一个 `Logger` 类的实例，用于记录日志。该 `Logger` 类在代码中没有完全显示，但我们可以假设它包含了一些日志记录的方法，如 `log`、`warn`。

接着，我们使用 `Proxy` 构造函数创建了一个名为 `logProxy` 的代理对象。这个代理对象包含了一系列处理器（handler），用于捕获对目标对象的不同操作，比如 `get`、`set`、`deleteProperty`、`apply`、`construct`。

在 `get` 处理器中，每当获取目标对象的属性时，会触发日志记录，指示正在获取哪个属性。

在 `set` 处理器中，每当设置目标对象的属性时，会触发日志记录，指示正在设置哪个属性以及设置的值。

在 `deleteProperty` 处理器中，每当删除目标对象的属性时，会触发日志记录，指示正在删除哪个属性。

在 `apply` 处理器中，每当对目标对象进行函数调用时，会触发日志记录，指示正在调用哪个函数。

在 `construct` 处理器中，每当使用 `new` 操作符创建对象时，会触发日志记录，指示正在构造哪个对象。

最后，我们使用 `logProxy` 对象进行了一系列操作，包括获取属性、设置属性、删除属性。每次操作都触发了相应的日志记录，以便跟踪对象的行为。

## 缓存

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;promisify&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'util'</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;redis&nbsp;=&nbsp;<span data-darkreader-inline-color="">require</span>(<span data-darkreader-inline-color="">'redis'</span>);<br><span data-darkreader-inline-color="">const</span>&nbsp;client&nbsp;=&nbsp;redis.createClient();<br><br><span data-darkreader-inline-color="">//&nbsp;模拟数据库查询</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">queryDatabase</span>(<span>query</span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;在实际应用中，这里会是真实的数据库查询操作</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Executing&nbsp;database&nbsp;query:&nbsp;<span data-darkreader-inline-color="">${query}</span>`</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">`Result&nbsp;for&nbsp;query:&nbsp;<span data-darkreader-inline-color="">${query}</span>`</span>;<br>}<br><br><span data-darkreader-inline-color="">//&nbsp;使用&nbsp;Proxy&nbsp;创建一个带缓存的数据库查询代理</span><br><span data-darkreader-inline-color="">const</span>&nbsp;cachedDatabaseQuery&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(queryDatabase,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;apply(target,&nbsp;thisArg,&nbsp;argumentsList)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;query&nbsp;=&nbsp;argumentsList[<span data-darkreader-inline-color="">0</span>];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;cacheKey&nbsp;=&nbsp;<span data-darkreader-inline-color="">`cache:<span data-darkreader-inline-color="">${query}</span>`</span>;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;尝试从缓存中获取结果</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;cachedResult&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;promisify(client.get).bind(client)(cacheKey);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(cachedResult)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Cache&nbsp;hit!&nbsp;Returning&nbsp;cached&nbsp;result&nbsp;for&nbsp;query:&nbsp;<span data-darkreader-inline-color="">${query}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cachedResult;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;缓存中没有结果，执行数据库查询</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;target(...argumentsList);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将查询结果存入缓存</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;promisify(client.set).bind(client)(cacheKey,&nbsp;result);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Database&nbsp;query&nbsp;result&nbsp;stored&nbsp;in&nbsp;cache&nbsp;for&nbsp;query:&nbsp;<span data-darkreader-inline-color="">${query}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;result;<br>&nbsp;&nbsp;},<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;测试代理</span><br><span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">testProxy</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result1&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;cachedDatabaseQuery(<span data-darkreader-inline-color="">'SELECT&nbsp;*&nbsp;FROM&nbsp;users&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;1'</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result2&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;cachedDatabaseQuery(<span data-darkreader-inline-color="">'SELECT&nbsp;*&nbsp;FROM&nbsp;users&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;2'</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;result3&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;cachedDatabaseQuery(<span data-darkreader-inline-color="">'SELECT&nbsp;*&nbsp;FROM&nbsp;users&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;1'</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result1);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result2);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(result3);<br>}<br><br>testProxy();<br></code>
```

首先，我们引入了 `util` 模块中的 `promisify` 函数和 `redis` 模块，然后创建了一个 Redis 客户端 `client`。

接着，我们定义了一个模拟数据库查询的异步函数 `queryDatabase`，在实际应用中，这里会是真实的数据库查询操作。这个函数接受一个查询字符串作为参数，打印出执行的查询，并返回一个包含查询结果的字符串。

然后，我们使用 Proxy 创建了一个名为 `cachedDatabaseQuery` 的代理对象。这个代理对象用于包装 `queryDatabase` 函数，实现了带缓存的数据库查询功能。

在代理对象的 `apply` 处理器中，我们首先从 Redis 缓存中尝试获取查询结果。如果缓存中有结果，则直接返回缓存的结果，并打印相应的日志。

如果缓存中没有结果，则调用原始的 `queryDatabase` 函数执行数据库查询，并将结果存入缓存中，并打印相应的日志。

最后，我们定义了一个名为 `testProxy` 的异步函数，用于测试代理对象。在这个函数中，我们多次调用 `cachedDatabaseQuery` 函数执行数据库查询，并输出查询结果。

## 看看平常可以用的

上面的讲的都是比较高大上的东西，其实很多小功能点也可以利用 proxy 来优化代码。

如果你需要一个对照的 MapObject，用来映射 server 传递来的一些特殊值，但 server 有可能传过来一个 null 或者空怎么办呢？

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;MAP&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">a</span>:&nbsp;<span data-darkreader-inline-color="">'342412'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">b</span>:&nbsp;<span data-darkreader-inline-color="">'qwerasd'</span><br>}<br><span data-darkreader-inline-color="">if</span>(!serverKey)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'xxxx'</span>)<br>}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(MAP[serverKey])<br>}<br></code>
```

可以写个 if 但是如果判断逻辑哪的代码又多又杂，或者是需求让你写出越来越多的特殊情况，那 if 就显得不那么优雅了， 我们这个时候就可以用 proxy 来解耦

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;createObjMapProxy&nbsp;=&nbsp;<span>(<span>obj</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(obj,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>:&nbsp;<span>(<span>target,&nbsp;propKey:&nbsp;string,&nbsp;receiver</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;keys&nbsp;=&nbsp;**<span data-darkreader-inline-color="">Object</span>**.keys(target)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(keys.includes(propKey))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">Reflect</span>.get(target,&nbsp;propKey,&nbsp;receiver)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;将判断逻辑或其他逻辑放到这里</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(xxx)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;x<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">else</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;xx<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;})<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;orderTypeProxy&nbsp;=&nbsp;createObjMapProxy({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">a</span>:&nbsp;<span data-darkreader-inline-color="">'342412'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">b</span>:&nbsp;<span data-darkreader-inline-color="">'qwerasd'</span><br>})<br></code>
```

创建一个 createObjMapProxy 方法传入一个对象，这个方法返回一个 Proxy 对象，用入参的对象初始化一个 proxy 对象并监听对象的 get 行为，并在 get 行为中构建逻辑。

这时我们就将使用的功能和构建逻辑的功能彻底分开了，createObjMapProxy 方法随便丢到别的文件中去引用出来，也能有效降低单文件代码量。

## 重复包装 `Proxy`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;targetObject&nbsp;=&nbsp;{&nbsp;<span data-darkreader-inline-color="">value</span>:&nbsp;<span data-darkreader-inline-color="">42</span>&nbsp;};<br><br><span data-darkreader-inline-color="">//&nbsp;第一个&nbsp;Proxy</span><br><span data-darkreader-inline-color="">const</span>&nbsp;firstProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(targetObject,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;prop)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Getting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>&nbsp;via&nbsp;the&nbsp;first&nbsp;Proxy`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[prop];<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(target,&nbsp;prop,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Setting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>&nbsp;via&nbsp;the&nbsp;first&nbsp;Proxy`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;target[prop]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;},<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;第二个&nbsp;Proxy</span><br><span data-darkreader-inline-color="">const</span>&nbsp;secondProxy&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(firstProxy,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;prop)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Getting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>&nbsp;via&nbsp;the&nbsp;second&nbsp;Proxy`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[prop];<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(target,&nbsp;prop,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Setting&nbsp;property&nbsp;<span data-darkreader-inline-color="">${prop}</span>&nbsp;via&nbsp;the&nbsp;second&nbsp;Proxy`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;target[prop]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;},<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;使用第二个&nbsp;Proxy</span><br><span data-darkreader-inline-color="">console</span>.log(secondProxy.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过第二个&nbsp;Proxy&nbsp;获取属性</span><br>secondProxy.value&nbsp;=&nbsp;<span data-darkreader-inline-color="">100</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过第二个&nbsp;Proxy&nbsp;设置属性</span><br><span data-darkreader-inline-color="">console</span>.log(secondProxy.value);&nbsp;<span data-darkreader-inline-color="">//&nbsp;通过第二个&nbsp;Proxy&nbsp;获取更新后的属性</span><br></code>
```

每个 `Proxy` 可以只做一个独立的事情然后一层一层的包给属性，进一步解耦代码。

## 总结

## proxy 的优点

1.  灵活性和可扩展性：`Proxy` 提供了强大的拦截和定制能力，使开发者能够在对象的访问、修改和删除等操作上进行细粒度的控制，从而实现各种高级功能。
    
2.  代码可读性和维护性：使用 `Proxy` 可以将对象的行为和结构分离开，使代码更加清晰、可读，并且更容易维护。
    
3.  通用性：由于 `Proxy` 可以拦截多种操作，因此可以创建通用的功能，比如数据绑定、表单验证等。
    
4.  无侵入性：`Proxy` 可以在不修改原始对象的情况下实现功能，使得代码更加模块化和可复用。
    

## proxy 的缺陷

1.  性能：相对于直接访问对象的操作，`Proxy` 的性能会略逊一筹。如果性能是关键问题，而且不需要 `Proxy` 提供的特殊功能，可以选择传统的操作方式。
    
2.  兼容性：一些较老版本的浏览器可能不支持 `Proxy`，因此在考虑兼容性时需要注意。
    
3.  学习成本：对于新手来说，掌握 `Proxy` 的使用可能需要一些时间，因为它提供了丰富的特性和选项。
    
4.  不可逆性：一旦使用 `Proxy` 修改了对象的行为，有可能导致代码的不可逆转。这也意味着在使用 `Proxy` 时需要谨慎，确保了解其对对象的影响。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;user&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">name</span>:&nbsp;<span data-darkreader-inline-color="">'John'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">age</span>:&nbsp;<span data-darkreader-inline-color="">30</span>,<br>};<br><br><span data-darkreader-inline-color="">const</span>&nbsp;loggedUser&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(user,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">get</span>(target,&nbsp;key)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">`Getting&nbsp;<span data-darkreader-inline-color="">${key}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;target[key];<br>&nbsp;&nbsp;},<br>});<br><br><span data-darkreader-inline-color="">console</span>.log(loggedUser.name);&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出&nbsp;"Getting&nbsp;name"</span><br><span data-darkreader-inline-color="">console</span>.log(loggedUser.age);&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;输出&nbsp;"Getting&nbsp;age"</span><br></code>
```

这种行为是可逆的，我们可以选择不使用这个 proxy

但如果是这样

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;securedUser&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Proxy</span>(user,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">set</span>(target,&nbsp;key,&nbsp;value)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(key&nbsp;===&nbsp;<span data-darkreader-inline-color="">'age'</span>&nbsp;&amp;&amp;&nbsp;<span data-darkreader-inline-color="">typeof</span>&nbsp;value&nbsp;!==&nbsp;<span data-darkreader-inline-color="">'number'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Error</span>(<span data-darkreader-inline-color="">'Age&nbsp;must&nbsp;be&nbsp;a&nbsp;number'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;target[key]&nbsp;=&nbsp;value;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;},<br>});<br><br>securedUser.age&nbsp;=&nbsp;<span data-darkreader-inline-color="">'thirty'</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;抛出错误：Age must be a number</span><br></code>
```

如果已经设置成了这样 我们使用 securedUser.age 时 只要不是 number 类型他就会一直报错

如果是正在写代码没有问题，但如果别人已经写好了现在你要改代码，哪你就得小心了。

这样的修改是不可逆的，因为一旦我们使用了这个 `Proxy`，就无法回到没有这个检查的状态。如果后续发现这个检查有问题，需要去掉或者修改，就需要谨慎操作，以免影响到代码的其他部分。这就是 "不可逆性" 的一个例子。

文章到此其实大家也能从上述的例子中发现一些共性，proxy 的本质其实就是为对象提供了一层中间层，让我们在操作对象的时候同时触发一些事情，也就是说如果未来我们的场景需要着重对操作对象这件事做很多事情的时候，那么 proxy 就会成为一个很好的方案。

___

-   我是 ssh，工作 6 年+，阿里云、字节跳动 Web infra 一线拼杀出来的资深前端工程师 + 面试官，非常熟悉大厂的面试套路，Vue、React 以及前端工程化领域深入浅出的文章帮助无数人进入了大厂。
    
-   欢迎`长按图片加 ssh 为好友`，我会第一时间和你分享前端行业趋势，学习途径等等。2023 陪你一起度过！
    

-   ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

关注公众号，发送消息：

指南，获取高级前端、算法**学习路线**，是我自己一路走来的实践。

简历，获取大厂**简历编写指南**，是我看了上百份简历后总结的心血。

面经，获取大厂**面试题**，集结社区优质面经，助你攀登高峰

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！