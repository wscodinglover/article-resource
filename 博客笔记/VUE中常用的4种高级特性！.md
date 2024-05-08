## 1\. provide/inject

provide/inject 是 Vue.js 中用于跨组件传递数据的一种高级技术，它可以将数据注入到一个组件中，然后让它的所有子孙组件都可以访问到这个数据。通常情况下，我们在父组件中使用 provide 来提供数据，然后在子孙组件中使用 inject 来注入这个数据。

使用 provide/inject 的好处是可以让我们在父组件和子孙组件之间传递数据，而无需手动进行繁琐的 props 传递。它可以让代码更加简洁和易于维护。

但需要注意的是，provide/inject 的数据是非响应式的，这是因为provide/inject是一种更加底层的 API，它是基于依赖注入的方式来传递数据，而不是通过响应式系统来实现数据的更新和同步。

具体来说，provide方法提供的数据会被注入到子组件中的inject属性中，但是这些数据不会自动触发子组件的重新渲染，如果provide提供的数据发生了变化，子组件不会自动感知到这些变化并更新。

如果需要在子组件中使用provide/inject提供的数据，并且希望这些数据能够响应式地更新，可以考虑使用Vue的响应式数据来代替provide/inject。例如，可以将数据定义在父组件中，并通过props将其传递给子组件，子组件再通过$emit来向父组件发送数据更新的事件，从而实现响应式的数据更新。

下面是一个简单的例子，展示了如何在父组件中提供数据，并在子孙组件中注入这个数据：

```
&lt;!--&nbsp;父组件&nbsp;--&gt;<br>&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;ChildComponent&nbsp;/&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;ChildComponent&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./ChildComponent.vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;provide:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">'Hello&nbsp;from&nbsp;ParentComponent'</span>,<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;components:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;ChildComponent,<br>&nbsp;&nbsp;},<br>};<br>&lt;/script&gt;<br><br>//上面provide还可以写成函数形式<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">provide</span>(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;this.message<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br>
```

```
&lt;!--&nbsp;子组件&nbsp;--&gt;<br>&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;GrandchildComponent&nbsp;/&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;GrandchildComponent&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./GrandchildComponent.vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;inject:&nbsp;[<span data-darkreader-inline-color="">'message'</span>],<br>&nbsp;&nbsp;components:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;GrandchildComponent,<br>&nbsp;&nbsp;},<br>};<br>&lt;/script&gt;<br>
```

```
&lt;!--&nbsp;孙子组件&nbsp;--&gt;<br>&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;{{&nbsp;message&nbsp;}}&lt;/p&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;inject:&nbsp;[<span data-darkreader-inline-color="">'message'</span>],<br>};<br>&lt;/script&gt;<br>
```

在上面的例子中，父组件中提供了一个名为 message 的数据，子孙组件中都可以使用 inject 来注入这个数据，并在模板中使用它。注意，子孙组件中的 inject 选项中使用了一个数组，数组中包含了需要注入的属性名。

在这个例子中，我们只注入了一个 message 属性，所以数组中只有一个元素。

## 2\. 自定义v-model

要使自定义的Vue组件支持v-model，需要实现一个名为value的prop和一个名为input的事件。在组件内部，将value prop 绑定到组件的内部状态，然后在对内部状态进行修改时触发input事件。

下面是一个简单的例子，展示如何创建一个自定义的输入框组件并支持v-model：

```
&lt;template&gt;<br>&nbsp;&nbsp;&lt;input&nbsp;:value=<span data-darkreader-inline-color="">"value"</span>&nbsp;@input=<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$emit</span>('input',&nbsp;<span data-darkreader-inline-color="">$event</span>.target.value)"</span>&nbsp;/&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'MyInput'</span>,<br>&nbsp;&nbsp;props:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;value:&nbsp;String<br>&nbsp;&nbsp;}<br>};<br>&lt;/script&gt;<br>
```

在上面的组件中，我们定义了一个value prop，这是与v-model绑定的数据。我们还将内置的input事件转发为一个自定义的input事件，并在事件处理程序中更新内部状态。

现在，我们可以在父组件中使用v-model来绑定这个自定义组件的值，就像使用普通的输入框一样：

```
&lt;template&gt;<br>&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;my-input&nbsp;v-model=<span data-darkreader-inline-color="">"message"</span>&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;{{&nbsp;message&nbsp;}}&lt;/p&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/template&gt;<br><br>&lt;script&gt;<br>import&nbsp;MyInput&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./MyInput.vue'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;components:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;MyInput<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">data</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">''</span><br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br>};<br>&lt;/script&gt;<br>
```

在上面的代码中，我们通过使用v-model指令来双向绑定message数据和MyInput组件的值。当用户在输入框中输入文本时，MyInput组件会触发input事件，并将其更新的值发送给父组件，从而实现了双向绑定的效果。

## 3\. 事件总线（EventBus）

Vue事件总线是一个事件处理机制，它可以让组件之间进行通信，以便在应用程序中共享信息。在Vue.js应用程序中，事件总线通常是一个全局实例，可以用来发送和接收事件。

以下是使用Vue事件总线的步骤：

3.1  创建一个全局Vue实例作为事件总线：

```
import&nbsp;Vue&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span>;<br><span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;eventBus&nbsp;=&nbsp;new&nbsp;Vue();<br>
```

3.2  在需要发送事件的组件中，使用$emit方法触发事件并传递数据：

```
<br>eventBus.<span data-darkreader-inline-color="">$emit</span>(<span data-darkreader-inline-color="">'eventName'</span>,&nbsp;data);<br>
```

3.3  在需要接收事件的组件中，使用$on方法监听事件并处理数据：

```
<br>eventBus.<span data-darkreader-inline-color="">$on</span>(<span data-darkreader-inline-color="">'eventName'</span>,&nbsp;(data)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;//&nbsp;处理数据<br>});<br>
```

需要注意的是，事件总线是全局的，所以在不同的组件中，需要保证事件名称的唯一性。另外，需要在组件销毁前使用$off方法取消事件监听：

```
eventBus.<span data-darkreader-inline-color="">$off</span>(<span data-darkreader-inline-color="">'eventName'</span>);<br>
```

这样就可以在Vue.js应用程序中使用事件总线来实现组件之间的通信了。

## 4\. render方法

Vue 的 render 方法是用来渲染组件的函数，它可以用来替代模板语法，通过代码的方式来生成 DOM 结构。相较于模板语法，render 方法具有更好的类型检查和代码提示。

下面详细介绍 Vue 的 render 方法的使用方法：

4.1 基本语法

render 方法的基本语法如下：

```
render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement)&nbsp;{<br>&nbsp;&nbsp;//&nbsp;返回一个&nbsp;VNode<br>}<br>
```

其中 createElement 是一个函数，它用来创建 VNode（虚拟节点），并返回一个 VNode 对象。

4.2 创建 VNode

要创建 VNode，可以调用 createElement 函数，该函数接受三个参数：

标签名或组件名

可选的属性对象

子节点数组

例如，下面的代码创建了一个包含文本节点的 div 元素：

```
render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;createElement(<span data-darkreader-inline-color="">'div'</span>,&nbsp;<span data-darkreader-inline-color="">'Hello,&nbsp;world!'</span>)<br>}<br>
```

如果要创建一个带有子节点的元素，可以将子节点作为第三个参数传递给 createElement 函数。

例如，下面的代码创建了一个包含两个子元素的 div 元素：

```
render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;createElement(<span data-darkreader-inline-color="">'div'</span>,&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;createElement(<span data-darkreader-inline-color="">'h1'</span>,&nbsp;<span data-darkreader-inline-color="">'Hello'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;createElement(<span data-darkreader-inline-color="">'p'</span>,&nbsp;<span data-darkreader-inline-color="">'World'</span>)<br>&nbsp;&nbsp;])<br>}<br>
```

如果要给元素添加属性，可以将属性对象作为第二个参数传递给 createElement 函数。

例如，下面的代码创建了一个带有样式和事件处理程序的 button 元素：

```
<br>render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;createElement(<span data-darkreader-inline-color="">'button'</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;style:&nbsp;{&nbsp;backgroundColor:&nbsp;<span data-darkreader-inline-color="">'red'</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;on:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;click:&nbsp;this.handleClick<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},&nbsp;<span data-darkreader-inline-color="">'Click&nbsp;me'</span>)<br>},<br>methods:&nbsp;{<br>&nbsp;&nbsp;handleClick:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span data-darkreader-inline-color="">'Button&nbsp;clicked'</span>)<br>&nbsp;&nbsp;}<br>}<br>
```

4.3 动态数据

render 方法可以根据组件的状态动态生成内容。要在 render 方法中使用组件的数据，可以使用 this 关键字来访问组件实例的属性。

例如，下面的代码根据组件的状态动态生成了一个带有计数器的 div 元素：

```
<br>render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;createElement(<span data-darkreader-inline-color="">'div'</span>,&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;createElement(<span data-darkreader-inline-color="">'p'</span>,&nbsp;<span data-darkreader-inline-color="">'Count:&nbsp;'</span>&nbsp;+&nbsp;this.count),<br>&nbsp;&nbsp;&nbsp;&nbsp;createElement(<span data-darkreader-inline-color="">'button'</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;on:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;click:&nbsp;this.increment<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;<span data-darkreader-inline-color="">'Increment'</span>)<br>&nbsp;&nbsp;])<br>},<br>data:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;()&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;count:&nbsp;0<br>&nbsp;&nbsp;}<br>},<br>methods:&nbsp;{<br>&nbsp;&nbsp;increment:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;this.count++<br>&nbsp;&nbsp;}<br>}<br>
```

4.4 JSX

在使用 Vue 的 render 方法时，也可以使用 JSX（JavaScript XML）语法，这样可以更方便地编写模板。要使用 JSX，需要在组件中导入 Vue 和 createElement 函数，并在 render 方法中使用 JSX 语法。

例如，下面的代码使用了 JSX 语法来创建一个计数器组件：

```
import&nbsp;Vue&nbsp;from&nbsp;<span data-darkreader-inline-color="">'vue'</span><br><br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">render</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Count:{this.count}&lt;/p&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button&nbsp;onClick={this.increment}&gt;Increment&lt;/button&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">data</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;count:&nbsp;0&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;methods:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">increment</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.count++<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br>
```

注意，在使用 JSX 时，需要使用 {} 包裹 JavaScript 表达式。

4.5 生成函数式组件

除了生成普通的组件，render 方法还可以生成函数式组件。函数式组件没有状态，只接收 props 作为输入，并返回一个 VNode。因为函数式组件没有状态，所以它们的性能比普通组件更高。

要生成函数式组件，可以在组件定义中将 functional 属性设置为 true。

例如，下面的代码定义了一个函数式组件，用于显示列表项：

```
<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;{<br>&nbsp;&nbsp;functional:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;props:&nbsp;[<span data-darkreader-inline-color="">'item'</span>],<br>&nbsp;&nbsp;render:&nbsp;<span data-darkreader-inline-color="">function</span>&nbsp;(createElement,&nbsp;context)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;createElement(<span data-darkreader-inline-color="">'li'</span>,&nbsp;context.props.item);<br>&nbsp;&nbsp;}<br>}<br>
```

注意，在函数式组件中，props 作为第二个参数传递给 render 方法。

作者：阿虎儿  
链接：https://juejin.cn/post/7225921305597820985