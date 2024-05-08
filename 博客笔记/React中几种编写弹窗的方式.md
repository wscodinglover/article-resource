## 方式一:按钮与弹窗封装成一个组件

将按钮和弹窗封装成一个组件，可以大大提高 React 代码的可重用性、可维护性和可扩展性。以下是示例代码：

```
<span data-darkreader-inline-color="">import</span>&nbsp;React,&nbsp;{&nbsp;useState&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Button,&nbsp;Modal&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"antd"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;MixWay&nbsp;=&nbsp;<span data-darkreader-inline-color="">(<span data-darkreader-inline-color="">props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;[visiable,&nbsp;setVisiable]&nbsp;=&nbsp;useState(<span data-darkreader-inline-color="">false</span>);<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onOk&nbsp;=&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"编写自己的onOk逻辑"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;closeModal();<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;closeModal&nbsp;=&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;setVisiable(<span data-darkreader-inline-color="">false</span>);<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">Button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;setVisiable(true)}&gt;按钮+弹窗<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">Button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">Modal</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>=<span data-darkreader-inline-color="">"按钮+弹窗"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">open</span>=<span data-darkreader-inline-color="">{visiable}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onOk</span>=<span data-darkreader-inline-color="">{onOk}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onCancel</span>=<span data-darkreader-inline-color="">{closeModal}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">afterClose</span>=<span data-darkreader-inline-color="">{closeModal}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">p</span>&gt;</span>弹窗内容<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">p</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">Modal</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/&gt;</span><br>&nbsp;&nbsp;);<br>};<br><br>export&nbsp;default&nbsp;MixWay;<br></span>
```

封装成一个组件后，我们可以轻松地复用该组件并根据需要进行扩展。

### 实际例子

比如下面两个回放按钮

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/crnnj7HUxp55cUM5YSL9d8UBkAblEZ0Z6SxKsXc0PwfmeL1xibIwicHTK8rzuErEGVvUIJjhvKAGNHFtzFcaiaW5Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

按钮

-   单批次回放
    

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/crnnj7HUxp55cUM5YSL9d8UBkAblEZ0ZYubuahR8cmG9t5bIFrwM5uc0KeMhF2iaKCibm1kIWhCmyfqv7pVDBiboA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

单批次回放

-   单接口批量回放
    

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/crnnj7HUxp55cUM5YSL9d8UBkAblEZ0Z4K2Eib2YeEWKoEZjZ78vHWvEzkiaGicGvsxyaXtSiaeNmt8PHiagKiamrwibw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

单接口批量回放

两者弹窗内容基本一致,只是单接口批量回放需要指定接口,单批回放不需要指定接口

所以将它封装成一个组件

## 方式二:函数式弹出弹窗

https://juejin.cn/post/7130623457993162759

https://opensource.ebay.com/nice-modal-react/#real

使用https://github.com/ebay/nice-modal-react,它帮助我们快速创建弹框，写起来更加简洁

### MyModal弹窗

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;NiceModal,&nbsp;{&nbsp;useModal&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"@ebay/nice-modal-react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Modal&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"antd"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;MyModal&nbsp;=&nbsp;NiceModal.create(<span data-darkreader-inline-color="">(<span data-darkreader-inline-color="">props</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;name&nbsp;}&nbsp;=&nbsp;props;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;modal&nbsp;=&nbsp;useModal();<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;onOk&nbsp;=&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">"编写自己的onOk逻辑"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;modal.hide();<br>&nbsp;&nbsp;};<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">Modal</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">title</span>=<span data-darkreader-inline-color="">"Hello&nbsp;Antd"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">open</span>=<span data-darkreader-inline-color="">{modal.visible}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onOk</span>=<span data-darkreader-inline-color="">{onOk}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">onCancel</span>=<span data-darkreader-inline-color="">{modal.hide}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">afterClose</span>=<span data-darkreader-inline-color="">{modal.remove}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Greetings:&nbsp;{name}!<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">Modal</span>&gt;</span></span><br>&nbsp;&nbsp;);<br>});<br><br>MyModal.propTypes&nbsp;=&nbsp;{};<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;MyModal;<br>
```

### AntdSample使用

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Button&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"antd"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;NiceModal&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"@ebay/nice-modal-react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;MyModal&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./MyModal"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;AntdSample&nbsp;=&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color=""><span data-darkreader-inline-color="">&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;<span data-darkreader-inline-color="">Button</span>&nbsp;<span data-darkreader-inline-color="">onClick</span>=<span data-darkreader-inline-color="">{()</span>&nbsp;=&gt;</span>&nbsp;NiceModal.show(MyModal,&nbsp;{&nbsp;name:&nbsp;"Nate"&nbsp;})}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show&nbsp;Modal<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/<span data-darkreader-inline-color="">Button</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">&lt;/&gt;</span><br>&nbsp;&nbsp;);<br>};<br><br>export&nbsp;default&nbsp;AntdSample;<br></span>
```

### index.js

```
<span data-darkreader-inline-color="">import</span>&nbsp;React&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;ReactDOM&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"react-dom/client"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;App&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./App"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;NiceModal&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"@ebay/nice-modal-react"</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;root&nbsp;=&nbsp;ReactDOM.createRoot(<span data-darkreader-inline-color="">document</span>.getElementById(<span data-darkreader-inline-color="">"root"</span>));<br>root.render(<br>&nbsp;&nbsp;&lt;React.StrictMode&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;NiceModal.Provider&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;App&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/NiceModal.Provider&gt;<br>&nbsp;&nbsp;&lt;/React.StrictMode&gt;<br>);<br>
```

这段代码使用了 `NiceModal` 和 `useModal`，这是 eBay 开发的一个 React 组件库，能够帮助我们快速创建模态框（Modal）。使用它有以下好处：

1.  代码简洁：NiceModal 将 Modal 的显示逻辑和 UI 逻辑封装好，我们只需要编写自己的逻辑即可。在这段代码中，我们只需要编写 MyModal 组件的内容，而不用关心 Modal 的显示和关闭逻辑。
    
2.  可维护性高：使用 NiceModal，我们可以将重复的 Modal 逻辑封装成一个组件，便于统一管理和维护。下次再有类似的 Modal 需求时，我们只需要拿出这个组件进行改造即可。
    
3.  可扩展性好：NiceModal 提供了一些钩子函数（例如 useModal）和配置项，可以方便地扩展自己的 Modal 组件。例如，在 MyModal 组件中使用了 useModal 钩子函数获取 modal 对象，然后就可以调用它提供的一些方法（例如 hide()）来控制 Modal 的显示和关闭。
    

## 小结

以上两种编写弹窗的方式，方式二使用 `nice-modal-react` 更加简洁，不需要手动编写显示关闭逻辑。