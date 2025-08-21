```
<pre data-style="margin-bottom: 1rem; outline: 0px; font-family: monospace, monospace; font-size: 32px; letter-spacing: 0.544px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); overflow: auto; text-align: left; visibility: visible;"><blockquote><p><span>译者：360&nbsp;奇舞团前端开发工程师&nbsp;</span><span>作者：Bonnie&nbsp;</span><span>原文：</span><span>https://dev.to/tcms/ai-powered-frontend-ui-components-generator-nextjs-gpt4-langchain-copilotkit-1hac</span></p></blockquote><section><br></section></pre><p data-style="margin-bottom: 0px; outline: 0px; color: rgb(34, 34, 34); font-family: system-ui, -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; white-space: normal; background-color: rgb(255, 255, 255); text-align: center; visibility: visible;"><span>本文将教您如何构建一个AI驱动的前端UI组件生成器，它可以帮助您生成Next.js Tailwind CSS UI组件，并提供实现教程。我们将涵盖以下内容：</span><br></p>
```

-   使用Next.js、TypeScript和Tailwind CSS构建UI组件生成器Web应用程序。
    
-   使用CopilotKit将AI功能集成到UI组件生成器中。
    
-   集成嵌入式代码编辑器，以对生成的代码进行更改。
    

### 前提条件

为了充分理解本教程，您需要对React或Next.js有基本的了解。以下是构建AI驱动的UI组件生成器所需的工具:

-   Ace Code Editor - 一个使用JavaScript编写的可嵌入代码编辑器，具有与原生编辑器相匹配的功能和性能。。
    
-   Langchain - 提供一个框架，使AI代理能够搜索网络并研究任何主题。
    
-   OpenAI API - 提供一个API密钥，使您能够使用ChatGPT模型执行各种任务。
    
-   Tavily AI - 一个搜索引擎，使AI代理能够在应用程序中进行研究并访问实时知识。。
    
-   CopilotKit - 一个用于构建自定义AI聊天机器人、应用内AI代理和文本区域的开源协作框架。
    

### 项目设置和包安装

首先，在终端中运行下面的代码片段来创建一个Next.js应用程序：

```
<span></span><code>npx&nbsp;create-next-app@latest&nbsp;aiuigenerator<br></code>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/cAd6ObKOzEAia7EpT7vjPm1zfMw2fND5AHLnWO1NicB3IXG0bQ6Diabdtia4UQictlYXpTvJRqeZuKdN7RxQO57q7zw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

npx create-next-app@latest aiuigenerator

接下来，安装Ace代码编辑器和Langchain包及其依赖项。

```
<span></span><code>npm&nbsp;install&nbsp;react-ace&nbsp;@langchain/langgraph<br></code>
```

最后，安装CopilotKit。这些包使我们能够从React状态中检索数据并将AI协同助手添加到应用程序中。

```
<span></span><code>npm&nbsp;install&nbsp;@copilotkit/react-ui&nbsp;@copilotkit/react-textarea&nbsp;@copilotkit/react-core&nbsp;@copilotkit/backend<br></code>
```

恭喜！您现在已经准备好构建一个由人工智能驱动的博客了。

### 构建UI组件生成器前端界面

在这个部分中，我将带您逐步完成创建UI组件生成器前端的过程，使用静态内容来定义生成器的用户界面。

首先，打开您的代码编辑器，前往`/[root]/src/app`目录，并创建一个名为`components`的文件夹。在`components`文件夹内，创建两个文件，分别命名为`Header.tsx`和`CodeTutorial.tsx`。

在`Header.tsx`文件中，添加以下代码，定义一个名为Header的函数组件，用于渲染生成器的导航栏。

```
<span></span><code><span>"use&nbsp;client"</span>;<br><br><span>import</span>&nbsp;Link&nbsp;<span>from</span>&nbsp;<span>"next/link"</span>;<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span>Header</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>header</span>&nbsp;<span>className</span>=<span>"flex&nbsp;flex-wrap&nbsp;sm:justify-start&nbsp;sm:flex-nowrap&nbsp;z-50&nbsp;w-full&nbsp;bg-gray-800&nbsp;border-b&nbsp;border-gray-200&nbsp;text-sm&nbsp;py-3&nbsp;sm:py-0&nbsp;"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>nav</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>className</span>=<span>"relative&nbsp;max-w-7xl&nbsp;w-full&nbsp;mx-auto&nbsp;px-4&nbsp;sm:flex&nbsp;sm:items-center&nbsp;sm:justify-between&nbsp;sm:px-6&nbsp;lg:px-8"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>aria-label</span>=<span>"Global"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"flex&nbsp;items-center&nbsp;justify-between"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Link</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>className</span>=<span>"w-full&nbsp;flex-none&nbsp;text-xl&nbsp;text-white&nbsp;font-semibold&nbsp;p-6"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>href</span>=<span>"/"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>aria-label</span>=<span>"Brand"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI-UI-Components-Generator<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>Link</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>nav</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>header</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

在`CodeTutorial.tsx`文件中，添加以下代码，定义一个名为`CodeTutorial`的函数组件，用于渲染生成器的主页，显示生成的UI组件、嵌入式代码编辑器和生成的实现教程。

```
<span></span><code><span>"use&nbsp;client"</span>;<br><br><span>import</span>&nbsp;Markdown&nbsp;<span>from</span>&nbsp;<span>"react-markdown"</span>;<br><span>import</span>&nbsp;{&nbsp;useState&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"react"</span>;<br><span>import</span>&nbsp;AceEditor&nbsp;<span>from</span>&nbsp;<span>"react-ace"</span>;<br><span>import</span>&nbsp;React&nbsp;<span>from</span>&nbsp;<span>"react"</span>;<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span>CodeTutorial</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;[code,&nbsp;setCode]&nbsp;=&nbsp;useState&lt;string[]&gt;([<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>`&lt;h1&nbsp;class="text-red-500"&gt;Hello&nbsp;World&lt;/h1&gt;`</span>,<br>&nbsp;&nbsp;]);<br>&nbsp;&nbsp;<span>const</span>&nbsp;[codeToDisplay,&nbsp;setCodeToDisplay]&nbsp;=&nbsp;useState&lt;string&gt;(code[<span>0</span>]&nbsp;||&nbsp;<span>""</span>);<br>&nbsp;&nbsp;<span>const</span>&nbsp;[codeTutorial,&nbsp;setCodeTutorial]&nbsp;=&nbsp;useState(<span>``</span>);<br><br>&nbsp;&nbsp;<span><span>function</span>&nbsp;<span>onChange</span>(<span>newCode:&nbsp;any</span>)&nbsp;</span>{<br>&nbsp;&nbsp;&nbsp;&nbsp;setCodeToDisplay(newCode);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>main</span>&nbsp;<span>className</span>=<span>"&nbsp;min-h-screen&nbsp;px-4"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"w-full&nbsp;h-full&nbsp;min-h-[70vh]&nbsp;flex&nbsp;justify-between&nbsp;gap-x-1&nbsp;"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"w-2/3&nbsp;min-h-[60vh]&nbsp;rounded-lg&nbsp;bg-white&nbsp;shadow-lg&nbsp;p-2&nbsp;border&nbsp;mt-8&nbsp;overflow-auto"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>className</span>=<span>"w-full&nbsp;min-h-[60vh]&nbsp;rounded-lg"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>dangerouslySetInnerHTML</span>=<span>{{</span>&nbsp;__html:&nbsp;codeToDisplay&nbsp;}}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>AceEditor</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>placeholder</span>=<span>"Placeholder&nbsp;Text"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>mode</span>=<span>"html"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>theme</span>=<span>"monokai"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>=<span>"blah2"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>className</span>=<span>"w-[50%]&nbsp;min-h-[60vh]&nbsp;p-2&nbsp;mt-8&nbsp;rounded-lg"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>onChange</span>=<span>{onChange}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>fontSize</span>=<span>{14}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>lineHeight</span>=<span>{19}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>showPrintMargin</span>=<span>{true}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>showGutter</span>=<span>{true}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>highlightActiveLine</span>=<span>{true}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>value</span>=<span>{codeToDisplay}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>setOptions</span>=<span>{{</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableBasicAutocompletion:&nbsp;true,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableLiveAutocompletion:&nbsp;true,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableSnippets:&nbsp;false,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showLineNumbers:&nbsp;true,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tabSize:&nbsp;2,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"w-10/12&nbsp;mx-auto"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"mt-8"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>h1</span>&nbsp;<span>className</span>=<span>"text-white&nbsp;text-center&nbsp;text-xl&nbsp;font-semibold&nbsp;p-6"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Code&nbsp;Tutorial<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>h1</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{codeTutorial&nbsp;?&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Markdown</span>&nbsp;<span>className</span>=<span>"text-white"</span>&gt;</span>{codeTutorial}<span>&lt;/<span>Markdown</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;:&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>div</span>&nbsp;<span>className</span>=<span>"text-white"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;Code&nbsp;Tutorial&nbsp;Will&nbsp;Appear&nbsp;Here<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>div</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>main</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

接下来，进入`/[root]/src/page.tsx`文件，并添加以下代码，导入`CodeTutorial`和`Header`组件，并定义一个名为`Home`的函数组件。

```
<span></span><code><span>import</span>&nbsp;React&nbsp;<span>from</span>&nbsp;<span>"react"</span>;<br><span>import</span>&nbsp;Header&nbsp;<span>from</span>&nbsp;<span>"./components/Header"</span>;<br><span>import</span>&nbsp;CodeTutorial&nbsp;<span>from</span>&nbsp;<span>"./components/CodeTutorial"</span>;<br><br><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span>Home</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Header</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>CodeTutorial</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

接下来，删除 `globals.css` 文件中的 CSS 代码，并添加以下 CSS 代码。

```
<span></span><code><span>@tailwind</span>&nbsp;base;<br><span>@tailwind</span>&nbsp;components;<br><span>@tailwind</span>&nbsp;utilities;<br><br><span>body</span>&nbsp;{<br>&nbsp;&nbsp;<span>height</span>:&nbsp;<span>100vh</span>;<br>&nbsp;&nbsp;<span>background-color</span>:&nbsp;<span>rgb</span>(<span>16</span>,&nbsp;<span>23</span>,&nbsp;<span>42</span>);<br>}<br><br><span>pre</span>&nbsp;{<br>&nbsp;&nbsp;<span>margin</span>:&nbsp;<span>1rem</span>;<br>&nbsp;&nbsp;<span>padding</span>:&nbsp;<span>1rem</span>;<br>&nbsp;&nbsp;<span>border-radius</span>:&nbsp;<span>10px</span>;<br>&nbsp;&nbsp;<span>background-color</span>:&nbsp;black;<br>&nbsp;&nbsp;<span>overflow</span>:&nbsp;auto;<br>}<br><br><span>h2</span>,<br><span>p</span>&nbsp;{<br>&nbsp;&nbsp;<span>padding-bottom</span>:&nbsp;<span>1rem</span>;<br>&nbsp;&nbsp;<span>padding-top</span>:&nbsp;<span>1rem</span>;<br>}<br><br><span>code</span>&nbsp;{<br>&nbsp;&nbsp;<span>margin-bottom</span>:&nbsp;<span>2rem</span>;<br>}<br></code>
```

最后，在命令行中运行 npm run dev 命令，然后导航至 http://localhost:3000/。

现在您应该在浏览器上查看UI组件生成器的前端界面，如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这是图片

### 使用 CopilotKit 将人工智能功能集成到组件生成器中

在这个部分，您将学习如何在UI组件生成器中添加一个AI copilot，使用CopilotKit生成UI组件代码和实现教程。

CopilotKit提供了前端和后端两个包。它们可以让您将React状态连接起来，并使用AI代理在后端处理应用程序数据。

首先，让我们将CopilotKit的React组件添加到博客前端。

### 将CopilotKit添加到博客前端

在这里，我将引导您完成将UI组件生成器与CopilotKit前端集成的过程，以促进UI组件代码和实现教程的生成。

首先，请使用以下代码片段，在 `/[root]/src/app/components/CodeTutorial.tsx` 文件的顶部导入 `useMakeCopilotReadable` 和 `useCopilotAction`自定义钩子。

```
<span></span><code><span>import</span>&nbsp;{<br>&nbsp;&nbsp;useCopilotAction,<br>&nbsp;&nbsp;useMakeCopilotReadable,<br>}&nbsp;<span>from</span>&nbsp;<span>"@copilotkit/react-core"</span>;<br></code>
```

在 `CodeTutorial` 函数内部，状态变量下面，添加以下代码，该代码使用 `useMakeCopilotReadable` 钩子(hook)来添加将作为应用内聊天机器人上下文的代码。该钩子使得代码对于copilot易于可读。

```
<span></span><code>useMakeCopilotReadable(codeToDisplay);<br></code>
```

在上述代码下方，添加以下代码，该代码使用`useCopilotAction`钩子来设置一个名为`generateCodeAndImplementationTutorial`的动作，该动作将启用生成UI组件代码和实现教程的功能。

该动作接收两个参数，分别名为`code`和`tutorial`，用于生成UI组件代码和实现教程。

该动作包含一个处理函数，该函数根据给定的提示生成UI组件代码和实现教程。

在处理函数内部，`codeToDisplay`状态被更新为新生成的代码，而`codeTutorial`状态被更新为新生成的教程，如下所示。

```
<span></span><code>useCopilotAction(<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>"generateCodeAndImplementationTutorial"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>description</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"Create&nbsp;Code&nbsp;Snippet&nbsp;with&nbsp;React.js(Next.js),&nbsp;tailwindcss&nbsp;and&nbsp;an&nbsp;implementation&nbsp;tutorial&nbsp;of&nbsp;the&nbsp;code&nbsp;generated."</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>parameters</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>"code"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span>"string"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>description</span>:&nbsp;<span>"Code&nbsp;to&nbsp;be&nbsp;generated"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>required</span>:&nbsp;<span>true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>"tutorial"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span>"string"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>description</span>:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"Markdown&nbsp;of&nbsp;step&nbsp;by&nbsp;step&nbsp;guide&nbsp;tutorial&nbsp;on&nbsp;how&nbsp;to&nbsp;use&nbsp;the&nbsp;generated&nbsp;code&nbsp;accompanied&nbsp;with&nbsp;the&nbsp;code.&nbsp;Include&nbsp;introduction,&nbsp;prerequisites&nbsp;and&nbsp;what&nbsp;happens&nbsp;at&nbsp;every&nbsp;step&nbsp;accompanied&nbsp;with&nbsp;code&nbsp;generated&nbsp;earlier.&nbsp;Don't&nbsp;forget&nbsp;to&nbsp;add&nbsp;how&nbsp;to&nbsp;render&nbsp;the&nbsp;code&nbsp;on&nbsp;browser."</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>required</span>:&nbsp;<span>true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>handler</span>:&nbsp;<span>async</span>&nbsp;({&nbsp;code,&nbsp;tutorial&nbsp;})&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setCode(<span>(<span>prev</span>)&nbsp;=&gt;</span>&nbsp;[...prev,&nbsp;code]);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setCodeToDisplay(code);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setCodeTutorial(tutorial);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;[codeToDisplay,&nbsp;codeTutorial]<br>&nbsp;&nbsp;);<br></code>
```

接下来，进入`/[root]/src/app/page.tsx`文件，并在顶部使用以下代码导入CopilotKit前端包和样式。

```
<span></span><code>&nbsp;&nbsp;<span>import</span>&nbsp;{&nbsp;CopilotKit&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"@copilotkit/react-core"</span>;<br>&nbsp;&nbsp;<span>import</span>&nbsp;{&nbsp;CopilotSidebar&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"@copilotkit/react-ui"</span>;<br>&nbsp;&nbsp;<span>import</span>&nbsp;<span>"@copilotkit/react-ui/styles.css"</span>;<br></code>
```

然后，使用CopilotKit来包裹`CopilotSidebar`和`CodeTutorial`组件，如下所示。CopilotKit组件指定了CopilotKit后端端点的URL（`/api/copilotkit/`），而CopilotSidebar渲染了应用内聊天机器人，你可以通过它给出提示来生成UI组件代码和实现教程。

```
<span></span><code><span>export</span>&nbsp;<span>default</span>&nbsp;<span><span>function</span>&nbsp;<span>Home</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span>return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span>&lt;&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>Header</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>CopilotKit</span>&nbsp;<span>url</span>=<span>"/api/copilotkit"</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>CopilotSidebar</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>instructions</span>=<span>"Help&nbsp;the&nbsp;user&nbsp;generate&nbsp;code.&nbsp;Ask&nbsp;the&nbsp;user&nbsp;if&nbsp;to&nbsp;generate&nbsp;its&nbsp;tutorial."</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>defaultOpen</span>=<span>{true}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>labels</span>=<span>{{</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:&nbsp;"Code&nbsp;&amp;&nbsp;Tutorial&nbsp;Generator",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initial:&nbsp;"Hi!&nbsp;👋&nbsp;I&nbsp;can&nbsp;help&nbsp;you&nbsp;generate&nbsp;code&nbsp;and&nbsp;its&nbsp;tutorial.",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;<span>CodeTutorial</span>&nbsp;/&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>CopilotSidebar</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/<span>CopilotKit</span>&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;/&gt;</span></span><br>&nbsp;&nbsp;);<br>}<br></code>
```

接下来，运行开发服务器并在浏览器中导航到http://localhost:3000。你应该会看到应用内聊天机器人已经被集成到了UI组件生成器中。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 将CopilotKit后端添加到博客

在这里，我将引导您完成将UI组件生成器与CopilotKit后端集成的过程，该后端负责处理来自前端的请求，并提供函数调用以及各种大型语言模型（LLM）后端，例如GPT。

此外，我们还将集成一个名为Tavily的AI agent，它能够在网上研究任何主题。

要开始，请在项目的根目录下创建一个名为.env.local的文件。然后，在文件中添加以下环境变量，这些变量将存储您的ChatGPT和Tavily搜索API密钥。

```
<span></span><code>OPENAI_API_KEY=<span>"Your&nbsp;ChatGPT&nbsp;API&nbsp;key"</span><br>TAVILY_API_KEY=<span>"Your&nbsp;Tavily&nbsp;Search&nbsp;API&nbsp;key"</span><br></code>
```

要获取ChatGPT API密钥，请导航到 https://platform.openai.com/api-keys。

要获取Tavily搜索API密钥，请访问 https://app.tavily.com/home。

之后，前往/\[root\]/src/app目录并创建一个名为api的文件夹。在api文件夹中，创建一个名为copilotkit的文件夹。

在copilotkit文件夹中，创建一个名为research.ts的文件。然后导航到这个research.ts gist文件，复制代码，并将其添加到research.ts文件中。

接下来，在/\[root\]/src/app/api/copilotkit文件夹中创建一个名为route.ts的文件。该文件将包含设置后端功能以处理POST请求的代码。它条件性地包含一个“research”动作，该动作对给定主题进行研究。

现在，在文件的顶部导入以下模块：

```
<span></span><code><span>import</span>&nbsp;{&nbsp;CopilotBackend,&nbsp;OpenAIAdapter&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"@copilotkit/backend"</span>;&nbsp;<span>//&nbsp;For&nbsp;backend&nbsp;functionality&nbsp;with&nbsp;CopilotKit.</span><br><span>import</span>&nbsp;{&nbsp;researchWithLangGraph&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"./research"</span>;&nbsp;<span>//&nbsp;Import&nbsp;a&nbsp;custom&nbsp;function&nbsp;for&nbsp;conducting&nbsp;research.</span><br><span>import</span>&nbsp;{&nbsp;AnnotatedFunction&nbsp;}&nbsp;<span>from</span>&nbsp;<span>"@copilotkit/shared"</span>;&nbsp;<span>//&nbsp;For&nbsp;annotating&nbsp;functions&nbsp;with&nbsp;metadata.</span><br></code>
```

在上述代码下方，定义一个运行时环境变量和一个名为researchAction的函数，该函数使用以下代码研究某个特定主题。

```
<span></span><code><span>//&nbsp;Define&nbsp;a&nbsp;runtime&nbsp;environment&nbsp;variable,&nbsp;indicating&nbsp;the&nbsp;environment&nbsp;where&nbsp;the&nbsp;code&nbsp;is&nbsp;expected&nbsp;to&nbsp;run.</span><br><span>export</span>&nbsp;<span>const</span>&nbsp;runtime&nbsp;=&nbsp;<span>"edge"</span>;<br><br><span>//&nbsp;Define&nbsp;an&nbsp;annotated&nbsp;function&nbsp;for&nbsp;research.&nbsp;This&nbsp;object&nbsp;includes&nbsp;metadata&nbsp;and&nbsp;an&nbsp;implementation&nbsp;for&nbsp;the&nbsp;function.</span><br><span>const</span>&nbsp;researchAction:&nbsp;AnnotatedFunction&lt;any&gt;&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span>name</span>:&nbsp;<span>"research"</span>,&nbsp;<span>//&nbsp;Function&nbsp;name.</span><br>&nbsp;&nbsp;<span>description</span>:&nbsp;<span>"Call&nbsp;this&nbsp;function&nbsp;to&nbsp;conduct&nbsp;research&nbsp;on&nbsp;a&nbsp;certain&nbsp;topic.&nbsp;Respect&nbsp;other&nbsp;notes&nbsp;about&nbsp;when&nbsp;to&nbsp;call&nbsp;this&nbsp;function"</span>,&nbsp;<span>//&nbsp;Function&nbsp;description.</span><br>&nbsp;&nbsp;<span>argumentAnnotations</span>:&nbsp;[&nbsp;<span>//&nbsp;Annotations&nbsp;for&nbsp;arguments&nbsp;that&nbsp;the&nbsp;function&nbsp;accepts.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>name</span>:&nbsp;<span>"topic"</span>,&nbsp;<span>//&nbsp;Argument&nbsp;name.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>type</span>:&nbsp;<span>"string"</span>,&nbsp;<span>//&nbsp;Argument&nbsp;type.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>description</span>:&nbsp;<span>"The&nbsp;topic&nbsp;to&nbsp;research.&nbsp;5&nbsp;characters&nbsp;or&nbsp;longer."</span>,&nbsp;<span>//&nbsp;Argument&nbsp;description.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>required</span>:&nbsp;<span>true</span>,&nbsp;<span>//&nbsp;Indicates&nbsp;that&nbsp;the&nbsp;argument&nbsp;is&nbsp;required.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span>implementation</span>:&nbsp;<span>async</span>&nbsp;(topic)&nbsp;=&gt;&nbsp;{&nbsp;<span>//&nbsp;The&nbsp;actual&nbsp;function&nbsp;implementation.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>console</span>.log(<span>"Researching&nbsp;topic:&nbsp;"</span>,&nbsp;topic);&nbsp;<span>//&nbsp;Log&nbsp;the&nbsp;research&nbsp;topic.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span>return</span>&nbsp;<span>await</span>&nbsp;researchWithLangGraph(topic);&nbsp;<span>//&nbsp;Call&nbsp;the&nbsp;research&nbsp;function&nbsp;and&nbsp;return&nbsp;its&nbsp;result.</span><br>&nbsp;&nbsp;},<br>};<br></code>
```

然后在上述代码下方添加以下代码，定义一个处理POST请求的异步函数。

```
<span></span><code><span>//&nbsp;Define&nbsp;an&nbsp;asynchronous&nbsp;function&nbsp;that&nbsp;handles&nbsp;POST&nbsp;requests.</span><br><span>export</span>&nbsp;<span>async</span>&nbsp;<span><span>function</span>&nbsp;<span>POST</span>(<span>req:&nbsp;Request</span>):&nbsp;<span>Promise</span>&lt;<span>Response</span>&gt;&nbsp;</span>{<br>&nbsp;&nbsp;<span>const</span>&nbsp;actions:&nbsp;AnnotatedFunction&lt;any&gt;[]&nbsp;=&nbsp;[];&nbsp;<span>//&nbsp;Initialize&nbsp;an&nbsp;array&nbsp;to&nbsp;hold&nbsp;actions.</span><br><br>&nbsp;&nbsp;<span>//&nbsp;Check&nbsp;if&nbsp;a&nbsp;specific&nbsp;environment&nbsp;variable&nbsp;is&nbsp;set,&nbsp;indicating&nbsp;access&nbsp;to&nbsp;certain&nbsp;functionality.</span><br>&nbsp;&nbsp;<span>if</span>&nbsp;(process.env.TAVILY_API_KEY)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;actions.push(researchAction);&nbsp;<span>//&nbsp;Add&nbsp;the&nbsp;research&nbsp;action&nbsp;to&nbsp;the&nbsp;actions&nbsp;array&nbsp;if&nbsp;the&nbsp;condition&nbsp;is&nbsp;true.</span><br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span>//&nbsp;Instantiate&nbsp;CopilotBackend&nbsp;with&nbsp;the&nbsp;actions&nbsp;defined&nbsp;above.</span><br>&nbsp;&nbsp;<span>const</span>&nbsp;copilotKit&nbsp;=&nbsp;<span>new</span>&nbsp;CopilotBackend({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>actions</span>:&nbsp;actions,<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span>//&nbsp;Use&nbsp;the&nbsp;CopilotBackend&nbsp;instance&nbsp;to&nbsp;generate&nbsp;a&nbsp;response&nbsp;for&nbsp;the&nbsp;incoming&nbsp;request&nbsp;using&nbsp;an&nbsp;OpenAIAdapter.</span><br>&nbsp;&nbsp;<span>return</span>&nbsp;copilotKit.response(req,&nbsp;<span>new</span>&nbsp;OpenAIAdapter());<br>}<br><br></code>
```

### 如何生成UI组件

现在请转到您之前集成的应用内聊天机器人，并给它一个提示，例如：“生成一个联系表单”。一旦生成完成，您应该会看到生成的联系表单组件以及其使用教程，如下所示。您还可以使用嵌入式代码编辑器修改生成的代码。![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

恭喜！您已经完成了这个教程的项目。

**结论**

CopilotKit是一个令人惊叹的工具，它允许您在几分钟内将AI副驾驶添加到您的产品中。无论您对AI聊天机器人和助手感兴趣，还是希望自动化复杂任务，CopilotKit都能让这一切变得简单。

如果您需要构建一个AI产品或将其集成到您的软件应用程序中，您应该考虑使用CopilotKit。

您可以在GitHub上找到本教程的源代码：https://github.com/TheGreatBonnie/AIPoweredUIComponentsGenerator

### 参考链接

https://ace.c9.io/

https://www.langchain.com/

https://platform.openai.com/api-keys

https://tavily.com/

https://github.com/CopilotKit