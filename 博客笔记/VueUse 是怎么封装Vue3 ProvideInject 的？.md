## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心~

## Provide/Inject

Provide 和 Inject 可以解决 Prop 逐级透传问题。注入值类型不会使注入保持响应性，但注入一个响应式对象，仍然有响应式的效果。

Provide 的问题是无法追踪数据的来源，在任意层级都能访问导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用了。

看看 VueUse 的 createInjectionState 是怎么封装 Provide 的，并且怎么避免 Provide 的问题。

## 介绍

createInjectionState：创建可以注入组件的全局状态。

```
<span data-darkreader-inline-color="">//useCounterStore.ts</span><br><span data-darkreader-inline-color="">const</span>&nbsp;[useProvideCounterStore,&nbsp;useCounterStore]&nbsp;=&nbsp;createInjectionState(<br>&nbsp;&nbsp;<span>(<span>initialValue:&nbsp;number</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;state</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;count&nbsp;=&nbsp;ref(initialValue)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;getters</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;double&nbsp;=&nbsp;computed(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;count.value&nbsp;*&nbsp;<span data-darkreader-inline-color="">2</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;actions</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">increment</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count.value++<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;count,&nbsp;double,&nbsp;increment&nbsp;}<br>&nbsp;&nbsp;})<br><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;useProvideCounterStore&nbsp;}<br><span data-darkreader-inline-color="">//&nbsp;If&nbsp;you&nbsp;want&nbsp;to&nbsp;hide&nbsp;`useCounterStore`&nbsp;and&nbsp;wrap&nbsp;it&nbsp;in&nbsp;default&nbsp;value&nbsp;logic&nbsp;or&nbsp;throw&nbsp;error&nbsp;logic,&nbsp;please&nbsp;don't&nbsp;export&nbsp;`useCounterStore`</span><br><span data-darkreader-inline-color="">export</span>&nbsp;{&nbsp;useCounterStore&nbsp;}<br>
```

```
<span data-darkreader-inline-color="">&lt;!--&nbsp;RootComponent.vue&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useProvideCounterStore&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./useCounterStore'</span><br><br>&nbsp;&nbsp;useProvideCounterStore(<span data-darkreader-inline-color="">0</span>)<br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">slot</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">div</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br>
```

```
<span data-darkreader-inline-color="">&lt;!--&nbsp;CountComponent.vue&nbsp;--&gt;</span><br><span>&lt;<span data-darkreader-inline-color="">script</span>&nbsp;<span data-darkreader-inline-color="">setup</span>&nbsp;<span data-darkreader-inline-color="">lang</span>=<span data-darkreader-inline-color="">"ts"</span>&gt;</span><span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useCounterStore&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./useCounterStore'</span><br><br><span data-darkreader-inline-color="">//&nbsp;use&nbsp;non-null&nbsp;assertion&nbsp;operator&nbsp;to&nbsp;ignore&nbsp;the&nbsp;case&nbsp;that&nbsp;store&nbsp;is&nbsp;not&nbsp;provided.</span><br><span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;count,&nbsp;double&nbsp;}&nbsp;=&nbsp;useCounterStore()!<br><span data-darkreader-inline-color="">//&nbsp;if&nbsp;you&nbsp;want&nbsp;to&nbsp;allow&nbsp;component&nbsp;to&nbsp;working&nbsp;without&nbsp;providing&nbsp;store,&nbsp;you&nbsp;can&nbsp;use&nbsp;follow&nbsp;code&nbsp;instead:</span><br><span data-darkreader-inline-color="">//&nbsp;const&nbsp;{&nbsp;count,&nbsp;double&nbsp;}&nbsp;=&nbsp;useCounterStore()&nbsp;??&nbsp;{&nbsp;count:&nbsp;ref(0),&nbsp;double:&nbsp;ref(0)&nbsp;}</span><br><span data-darkreader-inline-color="">//&nbsp;also,&nbsp;you&nbsp;can&nbsp;use&nbsp;another&nbsp;hook&nbsp;to&nbsp;provide&nbsp;default&nbsp;value</span><br><span data-darkreader-inline-color="">//&nbsp;const&nbsp;{&nbsp;count,&nbsp;double&nbsp;}&nbsp;=&nbsp;useCounterStoreWithDefaultValue()</span><br><span data-darkreader-inline-color="">//&nbsp;or&nbsp;throw&nbsp;error</span><br><span data-darkreader-inline-color="">//&nbsp;const&nbsp;{&nbsp;count,&nbsp;double&nbsp;}&nbsp;=&nbsp;useCounterStoreOrThrow()</span><br></span><span>&lt;/<span data-darkreader-inline-color="">script</span>&gt;</span><br><br><span>&lt;<span data-darkreader-inline-color="">template</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">ul</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count:&nbsp;{{&nbsp;count&nbsp;}}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;double:&nbsp;{{&nbsp;double&nbsp;}}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">li</span>&gt;</span><br>&nbsp;&nbsp;<span>&lt;/<span data-darkreader-inline-color="">ul</span>&gt;</span><br><span>&lt;/<span data-darkreader-inline-color="">template</span>&gt;</span><br>
```

## 源码

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;Create&nbsp;global&nbsp;state&nbsp;that&nbsp;can&nbsp;be&nbsp;injected&nbsp;into&nbsp;components.<br>&nbsp;*<br>&nbsp;*&nbsp;<span data-darkreader-inline-color="">@see&nbsp;</span>https://vueuse.org/createInjectionState<br>&nbsp;*<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">createInjectionState</span>&lt;<span data-darkreader-inline-color="">Arguments</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Array</span>&lt;<span data-darkreader-inline-color="">any</span>&gt;,&nbsp;<span data-darkreader-inline-color="">Return</span>&gt;(<span><br>&nbsp;&nbsp;composable:&nbsp;(...args:&nbsp;Arguments</span>)&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">Return</span>,<br>):&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;[<span data-darkreader-inline-color="">useProvidingState</span>:&nbsp;(<span>...args:&nbsp;Arguments</span>)&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">Return</span>,&nbsp;<span data-darkreader-inline-color="">useInjectedState</span>:&nbsp;(<span></span>)&nbsp;=&gt;&nbsp;<span data-darkreader-inline-color="">Return</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">undefined</span>]&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;key:&nbsp;string&nbsp;|&nbsp;InjectionKey&lt;Return&gt;&nbsp;=&nbsp;<span data-darkreader-inline-color="">Symbol</span>(<span data-darkreader-inline-color="">'InjectionState'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useProvidingState&nbsp;=&nbsp;<span>(<span>...args:&nbsp;Arguments</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;state&nbsp;=&nbsp;composable(...args)<br>&nbsp;&nbsp;&nbsp;&nbsp;provide(key,&nbsp;state)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;state<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;useInjectedState&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;inject(key)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;[useProvidingState,&nbsp;useInjectedState]<br>}<br>
```

## 思考

## 为什么返回的是数组

createInjectionState 返回的数组，使用 demo 中采用的数组解构的方式。那么数组解构和对象解构有什么区别么？

提到数组解构首先想到的是 react 的 useState。

```
<span data-darkreader-inline-color="">const</span>&nbsp;[count,setCount]&nbsp;=useState(<span data-darkreader-inline-color="">0</span>)<br>
```

之所以用数组解构是因为在调用多个 useState 的时候，方便命名变量。

```
<span data-darkreader-inline-color="">const</span>&nbsp;[count,setCount]&nbsp;=useState(<span data-darkreader-inline-color="">0</span>)<br><span data-darkreader-inline-color="">const</span>&nbsp;[double,&nbsp;setDouble]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">0</span>);<br>
```

如果用对象解构，代码会是

```
typescript<br>复制代码<br>const&nbsp;{state:count,setState:setCount}&nbsp;=useState(0)<br>const&nbsp;{state:double,&nbsp;setState:setDouble}&nbsp;=&nbsp;useState(0);<br>
```

相比之下数组显得代码更加简洁。

数组解构也有缺点：返回值必须按顺序取值。返回值中只取其中一个，代码就很奇怪。

```
<span data-darkreader-inline-color="">const</span>&nbsp;[,setCount]&nbsp;=useState(<span data-darkreader-inline-color="">0</span>)<br>
```

因此数组解构时适合使用所有返回值，并且多次调用方法的情况；对象解构适合只使用其中部分返回值，并且一次调用方法的情况。

createInjectionState 创建的注入状态 key 是 Symbol('InjectionState')，也就是每次运行的 key 都不一样，有可能多次调用 createInjectionState，因此 createInjectionState 采用数组解构的方式。但使用返回值可能只使用 useInjectedState，所有在 useCounterStore.ts 中又将 useProvideCounterStore 和 useInjectedState 以对象的方式导出避免出现下面奇怪的写法。

```
<span data-darkreader-inline-color="">const</span>&nbsp;[,useCounterStore]&nbsp;=useCounterStore()<br>
```

## 使用例子中的 state 结构

使用案例中将 provide 中的对象分为 state、getters、actions。结构很想 vuex，而 useProvideCounterStore 相当于 vuex 中的 mutation。采用这种结构是因为 provide 的缺点：无法追踪数据的来源，在任意层级都能访问导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用了。

采用类似 vuex 的结构能相对比较好的追踪状态。

```
&nbsp;<span data-darkreader-inline-color="">//&nbsp;state</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;count&nbsp;=&nbsp;ref(initialValue)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;getters</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;double&nbsp;=&nbsp;computed(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;count.value&nbsp;*&nbsp;<span data-darkreader-inline-color="">2</span>)<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;actions</span><br>&nbsp;&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">increment</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;count.value++<br>&nbsp;&nbsp;}<br>
```

## readonly

createInjectionState 返回的数组是 readonly 修饰的，useInjectedState 返回的对象并没有用 readonly 修饰，provide/inject 的缺点就是状态对象不好跟踪，容易导致状态变更失控。既然提供了 useProvidingState 修改状态的方法，useInjectedState 返回的状态如果是只读的能更好防止状态变更失控。

> 作者：余子酱  
> 链接：https://juejin.cn/post/7229971998545838135  
> 来源：稀土掘金

## 结语

我是林三心

-   一个待过**小型toG型外包公司、大型外包公司、小公司、潜力型创业公司、大公司**的作死型前端选手；
    
-   一个偏前端的全干工程师；
    
-   一个不正经的掘金作者；
    
-   逗比的B站up主；
    
-   不帅的小红书博主；
    
-   喜欢打铁的篮球菜鸟；
    
-   喜欢历史的乏味少年；
    
-   喜欢rap的五音不全弱鸡如果你想一起学习前端，一起摸鱼，一起研究简历优化，一起研究面试进步，一起交流历史音乐篮球rap，可以来俺的摸鱼学习群哈哈，点这个，有7000多名前端小伙伴在等着一起学习哦 --> 
    

> 广州的兄弟可以约饭哦，或者约球~我负责打铁，你负责进球，谢谢~