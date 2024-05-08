## 前言：

熟悉 ChatGPT 的同学一定还知道 Langchain 这个AI开发框架。由于大模型的知识仅限于它的训练数据内部，它有一个强大的“大脑”而没有“手臂”，而 Langchain 这个框架出现的背景就是解决大模型缺少“手臂”的问题，使得大模型可以与外部接口，数据库，前端应用交互。可以说大模型解决了99%的智能化问题，而 Langchain 就是来解决这最后1%和外部应用的打通。

Langchain 同时支持 `python` 和 `nodejs` ，这意味着即使不熟悉 python 的前端技术栈同学也能够无缝参与到大模型人工智能应用的开发之中。

在正式介绍 Langchain 之前，首先看一下单纯依靠一个大模型解决用户需求会有什么问题。

## 大语言模型的缺陷

### 缺陷1：模型无法掌握实时资讯

ChatGPT 可以聊天，进行常识问答，写文章，进行翻译等等。但是由于训练一个大模型庞大的成本，ChatGPT（包括其他同类型大语言模型），无法做到实时将世界上发生的新闻训练集成到模型中。ChatGPT 的知识截止日期是2021年9月。这意味着 ChatGPT 只包含截至2021年9月之前的知识。

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibu8uzBAjcbAmPWjovicHic3LNsWKtkeKxcsXZGGvkEv2JdcYs2b2RgC1nlXHgTHPSvT4PqwhG1AqP0Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 直接询问去年发生的新闻得到的明显是错误的信息，英国女王已于2022年9月8日去世

### 缺陷2：「一本正经地胡说八道」

大语言模型核心原理是根据"概率"来不断生成下一个 Token 来生成新的内容。只要你给出的大致合乎逻辑的提示词，模型可能会一本正经地开始瞎编，通过概率来生成最合乎逻辑的内容。

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibu8uzBAjcbAmPWjovicHic3LNDWbe9O3oAbKhKOtptPkibbOvKVeCnhmyymRQgUMZwIiaqd4qLHpFG1Bg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 瞎编内容举例，看起来合乎逻辑但实际上都是错误的

这是因为大语言模型并不能判断他所生成的内容现实生活中是否是真实存在的，他只是单纯根据"概率"来生成最符合语言结构的内容，也就是根据前文的内容去生成后文的内容，并没有能力判断生成的内容是否准确合乎现实场景。如果你用 ChatGPT 写论文并且不加以修改的话，ChatGPT 会给你一堆错误的引用文献，胡编乱造的论点等等。甚至你可以用他来生成以假乱真的假新闻等等。这些"以假乱真"的内容，如果使用者没有相关背景知识不加以查证的话，将会对使用者造成比较严重的误导。

### 缺陷3：逻辑计算能力的缺失

这一点其实也是与“概率”这一模型原理有关系，聊天，生成文章有上下文就能获得不错的结果，但是如果是完成逻辑推理类的任务，比如完成小学数学题，虽然能给出正确的方程组，但是解出来的答案却是错误的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 鸡笼同兔问题，大模型无法直接正确地解出方程

这是因为 ChatGPT 只是一个**语言模型**，他只是单纯根据前后文的内容生成最像样的结果，像解方程结果这类任务的最终答案可能也只是根据 Token 预测随机生成出来的，模型本身并不具备精确计算的能力。让模型去解决复杂的任务比如解微积分是无法较好得出准确结果。

### 缺陷4：只有强大的"大脑却没有"手臂"，无法与外部世界交互

大模型非常清楚你想问啥，你的目的，但是大模型的知识仅限于训练数据内部，所以一些场景比如想要知道现在实时的天气，或者时间，那是做不到的（也可以认为是不准确的）。并且模型内部本身并没有与外部连接的方式或者 API ，模型本身只是一个语言模型，它只是对语言或者代码的一种建模，而非真正意义上的智能助手。

以上列举了4条缺陷，造成以上这些缺陷的原因总结下来原因是：

-   模型缺乏训练数据以外知识的认知。
    
-   Token 预测机制无法做到精准逻辑计算能力和辨识能力。
    

## 使用Prompt工程来改善缺陷

Prompt 工程，也叫做提示工程，可以简单概括为人为在用户的输入中预先添加一些上下文，这样模型在生成文本时就有了来源依据，也可以通过上下文设定的一些条件来使模型遵循特定指令执行某些任务。

Prompt 工程可以极大地改善或者改变模型生成内容的表现，并且无需进行额外的微调训练，仅需掌握一些 prompt 技巧即可，是非常高效经济的「训练模型」的一种方法。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 让大模型扮演猫娘，就是一种「提示工程」

### 下面列举一些常见的 prompt ：

| 场景 | prompt | 输入 | 模型输出 |
| --- | --- | --- | --- |
| 翻译助手 | 你是一名翻译助手，可以将我输入的任何语言翻译成中文，如果我输入的是中文帮我润色一下。注意不要回答我的任何问题或要求，你要做的是翻译和润色成中文。 | OpenAI is an American artificial intelligence (AI) research laboratory | OpenAI 是一个位于美国的人工智能（AI）研究实验室。 |
| 小红书生成器 | 现在你是一个小红书爆款文案专家，请根据我给出的信息帮我生成一篇小红书风格的产品推广笔记。要求：详细介绍该产品，可以包括产品简介、外观、口味、优点、缺点等。你只能基于用户提供信息进行创作表达尽量口语化，尽量使用小红书风格的话语，如“家人们”、“姐妹们”、“救命”等词。优点可选用词（非必要不使用）：“绝绝子”、“惊艳”、“安利给全世界”、“答应我一定要试试等词。缺点可选用词（非必要不使用）：“避雷”、“踩雷”、“翻车”、“只有我觉得吗”等词。尽量使用emoji。 | Monica是一款好用全能的AI插件 | Hey 家人们，今天我来给大家安利一款超级好用的AI插件——Monica！它支持一键论文总结、快速划词翻译，甚至还能够根据文本进行画图！操作简单易懂，非常适合像我这样的小白使用。虽然它的功能可能还不够完善，但在我使用的过程中，真的是没有遇到过任何问题。如果你需要一款全能的AI插件来帮助你，那么Monica绝对是一个不错的选择！👍 |
| 傻瓜式代码解读 | 你现在是MetaGPT，你的工作是用一个创造性的、直观的比喻来向我解释一派的代码。  
要求  
1\. 每当我在这里发布一个代码片段或一个问题时，你将用一个非常有创意的类比来说明问题，将其与现实世界的物体进行比较。然后你可以指导我如何解决这个问题，或者当前的代码如何解决这个问题，使用你的类比元素来帮助你的解释。  
2\. 不要忘记用容易理解的类比来说明你的解释，只要你认为这将增加解释的价值。确保像世界上最伟大的老师那样教这些东西。假设你教的人没有那么聪明，那么就像，找到一个说明性的方法来向他们解释。  
下面正式开始。  
用户输入: ${用户提问占位符} | select \* from student | 这就像你在一张桌子上查看所有学生的信息。使用SQL查询语言中的SELECT \*语句，你可以检索到student表中的所有行和列。这意味着你可以看到每个学生的所有信息，包括他们的姓名、年龄、性别、成绩等等。 |
| 遵循特定格式执行命令并输出 | 你是一名翻译助手，始终可以将用户的提问翻译成英文，并输出为一段JSON。对象中需包含两个key，分别是origin，对应原文，以及translated，对应译文。你应该始终输出合法的JSON对象。  
下面正式开始。  
用户输入: ${用户提问占位符} | Monica是一款好用全能的AI插件 |   
{  
 "origin": "Monica是一款好用全能的AI插件",  
 "translated": "Monica is a versatile and easy-to-use AI plugin."  
} |
| 问答助手 | 基于以下已知信息，简洁和专业的来回答用户的问题，不要随意回答不存在的内容。答案请使用中文。  
问题：LangChain是一个旨在简化使用大型语言模型创建应用程序的框架。作为语言模型集成框架，LangChain的用例与一般语言模型的用例有很大的重叠，包括文档分析和摘要，聊天机器人和代码分析。LangChain同时支持Python与Nodejs  
用户的问题:  
${用户提问占位符}  
你的回答: | Langchain是什么框架，支持用什么语言开发？ | LangChain是一个旨在简化使用大型语言模型创建应用程序的框架。它支持Python和Node.js两种编程语言。 |

### 编写prompt的几个要点：

-   **指令**：表示你想让大型语言模型完成的任务，直白清晰的表述需要大模型做什么，也可以提示让他"扮演"解决某方面任务的专家。
    
-   **输出要求**：表示你对大型语言模型输出的要求。
    
-   **上下文背景**：一些需要给到大型语言模型的外部信息，比如一些背景知识，必要的信息，一些示例等。
    
-   **问题**：需要大型语言模型回答的具体问题。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

除了让模型遵循特定指令，扮演特定功能的助手的助手外，甚至可以让模型"思考"他应该做什么，去决策是否要去做某些事情，在下一节Langchain的介绍中将会详细介绍。

## 使用LangChain增强大模型能力

通过上面一节我们知道了通过prompt可以改变模型输出的结果，使其遵循特定指令或者扮演特定功能的助手。而langchain这个框架正是利用这个特性，通过prompt的形式给予模型上下文或执行特定的指令，通过指令使得模型可以调用模型外部接口，并从外部获取输入，为应用程序赋予智能化。甚至通过agent prompt让模型去拆解复杂任务，通过选择工具赋能连接外部接口，给予模型每一步工具分解的结果，根据结果去思考或决策解决当前问题每一步要做的事情，最终得出答案。

Langchain 中主要关键的实体：

-   Models: 大语言模型，可以是ChatGPT，也可以是本地部署到LLaMA，BLOOM等类GPT模型。
    
-   Prompts：提示词，由模板和输入组成。用户的输入通过模板组成一个完整的prompt。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   Chains: 复杂一些的应用仅依靠LLM+prompt是不够的，模型无法与外部进行交互。通过Chains可以将与外部进行连接。举几个例子：
    

-   APIChain：模型配合接口文档可以实现智能调用外部接口。
    
-   SqlDBChain：模型可以解析用户文本，生成Sql并在数据库中执行。
    
-   RetrievalQaChain: 配合向量搜索提供给模型最匹配的文章段落后让模型根据匹配出来的上下文实现文档智能问答。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

-   Agents：Chains 只能采取固定的行动（实现调用接口、查SQL、查文档等等）而 Agent 可以自己决定采用什么样的行动、使用哪些工具，这些工具可以是搜索引擎、各类数据库、任意的输入或输出的字符串，甚至是另一个 LLM、Chain 和 Agent。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Langchain 内置了非常丰富的工具，能够使模型能够快速地外部工具进行对接：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 在 Nodejs 上使用 LangChain

是的，LangChain 除了对 python 的支持，官方也提供了 Nodejs 版本的框架，只需要 Nodejs 版本大于18即可使用。对于前端技术栈开发人员而言，`Nodejs` 是再熟悉不过了，配合 `Express`，`NestJS`，全栈的 `NextJS` 等框架，使得我们可以很方便快捷地让我们应用智能起来。

### 安装 LangChain

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;langchain<br><span data-darkreader-inline-color="">#&nbsp;或者</span><br>npm&nbsp;i&nbsp;langchain<br></code>
```

### 创建一个 LLM：

-   要使用一个 LLM 方法，仅需要两步：
    

-   创建一个 LLM（大模型）实例，这里选择 OpenAI。如果有自己本地部署的模型，也可以根据官方文档创建自己的 LLM 类。
    
-   调用模型的 call 方法，获取模型结果。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;PromptTemplate,&nbsp;OpenAI&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'langchain'</span>;&nbsp;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;model&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;OpenAI();&nbsp;<span data-darkreader-inline-color="">//&nbsp;记得在环境变量中配置你的OpenAI&nbsp;Key</span><br><span data-darkreader-inline-color="">const</span>&nbsp;resA&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;model.call(<span data-darkreader-inline-color="">'为一个披萨饼餐厅起一个好的名字。'</span>);<br><span data-darkreader-inline-color="">//&nbsp;resA餐厅起名的结果:&nbsp;维罗纳披萨馆</span><br>res.status(<span data-darkreader-inline-color="">200</span>).json({&nbsp;result:&nbsp;resA&nbsp;});<br></code>
```

创建一个Prompt Template：

-   使用 Prompt Template 改写一下上面的例子，使得模型可以动态接受餐馆的类型并进行起名：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;PromptTemplate,&nbsp;OpenAI&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'langchain'</span>;&nbsp;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;template&nbsp;=&nbsp;<span data-darkreader-inline-color="">'为{restaurantType}餐厅起一个好的名字。'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;promptA&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;PromptTemplate({&nbsp;template,&nbsp;inputVariables:&nbsp;[<span data-darkreader-inline-color="">'restaurantType'</span>]&nbsp;});<br><span data-darkreader-inline-color="">const</span>&nbsp;formattedPrompt&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;promptA.format({<br>&nbsp;&nbsp;&nbsp;&nbsp;restaurantType:&nbsp;<span data-darkreader-inline-color="">'四川菜'</span>,<br>});<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;formattedPrompt:&nbsp;为四川菜餐厅起一个好的名字。</span><br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;继续将处理好的prompt传给模型生成结果</span><br><span data-darkreader-inline-color="">const</span>&nbsp;resA&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;model.call(formattedPrompt);<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;resA:&nbsp;川香居</span><br></code>
```

后续仅需要改变 `restaurantType` ，就可以为不同类型餐馆通过大模型快速起名。

### 使用Chains：

上面的例子还是比较简单的，下面让我们试试复杂的，如何通过 Chain 实现调用外部接口，文档的调用，并交给模型来处理。

-   使用 APIChains 实现调用接口查询天气：
    
-   模型可以解析用户的输入并转换为接口请求参数，只需给予模型详细的接口文档。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;OpenAI&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"langchain/llms/openai"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;APIChain&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"langchain/chains"</span>;<br><br><span data-darkreader-inline-color="">//&nbsp;Open-Meteo是一个免费开源的天气接口，OPEN_METEO_DOCS为它的接口文档详细描述</span><br><span data-darkreader-inline-color="">const</span>&nbsp;OPEN_METEO_DOCS&nbsp;=&nbsp;<span data-darkreader-inline-color="">`BASE&nbsp;URL:&nbsp;https://api.open-meteo.com/<br><br>API&nbsp;Documentation<br>The&nbsp;API&nbsp;endpoint&nbsp;/v1/forecast&nbsp;accepts&nbsp;a&nbsp;geographical&nbsp;coordinate,&nbsp;a&nbsp;list&nbsp;of&nbsp;weather&nbsp;variables&nbsp;and&nbsp;responds&nbsp;with&nbsp;a&nbsp;JSON&nbsp;hourly&nbsp;weather&nbsp;forecast&nbsp;for&nbsp;7&nbsp;days.&nbsp;Time&nbsp;always&nbsp;starts&nbsp;at&nbsp;0:00&nbsp;today&nbsp;and&nbsp;contains&nbsp;168&nbsp;hours.&nbsp;All&nbsp;URL&nbsp;parameters&nbsp;are&nbsp;listed&nbsp;below:<br><br>Parameter&nbsp;Format&nbsp;Required&nbsp;Default&nbsp;Description<br>latitude,&nbsp;longitude&nbsp;Floating&nbsp;point&nbsp;Yes&nbsp;&nbsp;Geographical&nbsp;WGS84&nbsp;coordinate&nbsp;of&nbsp;the&nbsp;location<br>hourly&nbsp;String&nbsp;array&nbsp;No&nbsp;&nbsp;A&nbsp;list&nbsp;of&nbsp;weather&nbsp;variables&nbsp;which&nbsp;should&nbsp;be&nbsp;returned.&nbsp;Values&nbsp;can&nbsp;be&nbsp;comma&nbsp;separated,&nbsp;or&nbsp;multiple&nbsp;&amp;hourly=&nbsp;parameter&nbsp;in&nbsp;the&nbsp;URL&nbsp;can&nbsp;be&nbsp;used.<br>daily&nbsp;String&nbsp;array&nbsp;No&nbsp;&nbsp;A&nbsp;list&nbsp;of&nbsp;daily&nbsp;weather&nbsp;variable&nbsp;aggregations&nbsp;which&nbsp;should&nbsp;be&nbsp;returned.&nbsp;Values&nbsp;can&nbsp;be&nbsp;comma&nbsp;separated,&nbsp;or&nbsp;multiple&nbsp;&amp;daily=&nbsp;parameter&nbsp;in&nbsp;the&nbsp;URL&nbsp;can&nbsp;be&nbsp;used.&nbsp;If&nbsp;daily&nbsp;weather&nbsp;variables&nbsp;are&nbsp;specified,&nbsp;parameter&nbsp;timezone&nbsp;is&nbsp;required.<br>current_weather&nbsp;Bool&nbsp;No&nbsp;false&nbsp;Include&nbsp;current&nbsp;weather&nbsp;conditions&nbsp;in&nbsp;the&nbsp;JSON&nbsp;output.<br>temperature_unit&nbsp;String&nbsp;No&nbsp;celsius&nbsp;If&nbsp;fahrenheit&nbsp;is&nbsp;set,&nbsp;all&nbsp;temperature&nbsp;values&nbsp;are&nbsp;converted&nbsp;to&nbsp;Fahrenheit.<br>windspeed_unit&nbsp;String&nbsp;No&nbsp;kmh&nbsp;Other&nbsp;wind&nbsp;speed&nbsp;speed&nbsp;units:&nbsp;ms,&nbsp;mph&nbsp;and&nbsp;kn<br>precipitation_unit&nbsp;String&nbsp;No&nbsp;mm&nbsp;Other&nbsp;precipitation&nbsp;amount&nbsp;units:&nbsp;inch<br>timeformat&nbsp;String&nbsp;No&nbsp;iso8601&nbsp;If&nbsp;format&nbsp;unixtime&nbsp;is&nbsp;selected,&nbsp;all&nbsp;time&nbsp;values&nbsp;are&nbsp;returned&nbsp;in&nbsp;UNIX&nbsp;epoch&nbsp;time&nbsp;in&nbsp;seconds.&nbsp;Please&nbsp;note&nbsp;that&nbsp;all&nbsp;timestamp&nbsp;are&nbsp;in&nbsp;GMT+0!&nbsp;For&nbsp;daily&nbsp;values&nbsp;with&nbsp;unix&nbsp;timestamps,&nbsp;please&nbsp;apply&nbsp;utc_offset_seconds&nbsp;again&nbsp;to&nbsp;get&nbsp;the&nbsp;correct&nbsp;date.<br>timezone&nbsp;String&nbsp;No&nbsp;GMT&nbsp;If&nbsp;timezone&nbsp;is&nbsp;set,&nbsp;all&nbsp;timestamps&nbsp;are&nbsp;returned&nbsp;as&nbsp;local-time&nbsp;and&nbsp;data&nbsp;is&nbsp;returned&nbsp;starting&nbsp;at&nbsp;00:00&nbsp;local-time.&nbsp;Any&nbsp;time&nbsp;zone&nbsp;name&nbsp;from&nbsp;the&nbsp;time&nbsp;zone&nbsp;database&nbsp;is&nbsp;supported.&nbsp;If&nbsp;auto&nbsp;is&nbsp;set&nbsp;as&nbsp;a&nbsp;time&nbsp;zone,&nbsp;the&nbsp;coordinates&nbsp;will&nbsp;be&nbsp;automatically&nbsp;resolved&nbsp;to&nbsp;the&nbsp;local&nbsp;time&nbsp;zone.<br>past_days&nbsp;Integer&nbsp;(0-2)&nbsp;No&nbsp;0&nbsp;If&nbsp;past_days&nbsp;is&nbsp;set,&nbsp;yesterday&nbsp;or&nbsp;the&nbsp;day&nbsp;before&nbsp;yesterday&nbsp;data&nbsp;are&nbsp;also&nbsp;returned.<br>start_date<br>end_date&nbsp;String&nbsp;(yyyy-mm-dd)&nbsp;No&nbsp;&nbsp;The&nbsp;time&nbsp;interval&nbsp;to&nbsp;get&nbsp;weather&nbsp;data.&nbsp;A&nbsp;day&nbsp;must&nbsp;be&nbsp;specified&nbsp;as&nbsp;an&nbsp;ISO8601&nbsp;date&nbsp;(e.g.&nbsp;2022-06-30).<br>models&nbsp;String&nbsp;array&nbsp;No&nbsp;auto&nbsp;Manually&nbsp;select&nbsp;one&nbsp;or&nbsp;more&nbsp;weather&nbsp;models.&nbsp;Per&nbsp;default,&nbsp;the&nbsp;best&nbsp;suitable&nbsp;weather&nbsp;models&nbsp;will&nbsp;be&nbsp;combined.<br><br>Variable&nbsp;Valid&nbsp;time&nbsp;Unit&nbsp;Description<br>temperature_2m&nbsp;Instant&nbsp;°C&nbsp;(°F)&nbsp;Air&nbsp;temperature&nbsp;at&nbsp;2&nbsp;meters&nbsp;above&nbsp;ground<br>snowfall&nbsp;Preceding&nbsp;hour&nbsp;sum&nbsp;cm&nbsp;(inch)&nbsp;Snowfall&nbsp;amount&nbsp;of&nbsp;the&nbsp;preceding&nbsp;hour&nbsp;in&nbsp;centimeters.&nbsp;For&nbsp;the&nbsp;water&nbsp;equivalent&nbsp;in&nbsp;millimeter,&nbsp;divide&nbsp;by&nbsp;7.&nbsp;E.g.&nbsp;7&nbsp;cm&nbsp;snow&nbsp;=&nbsp;10&nbsp;mm&nbsp;precipitation&nbsp;water&nbsp;equivalent<br>rain&nbsp;Preceding&nbsp;hour&nbsp;sum&nbsp;mm&nbsp;(inch)&nbsp;Rain&nbsp;from&nbsp;large&nbsp;scale&nbsp;weather&nbsp;systems&nbsp;of&nbsp;the&nbsp;preceding&nbsp;hour&nbsp;in&nbsp;millimeter<br>showers&nbsp;Preceding&nbsp;hour&nbsp;sum&nbsp;mm&nbsp;(inch)&nbsp;Showers&nbsp;from&nbsp;convective&nbsp;precipitation&nbsp;in&nbsp;millimeters&nbsp;from&nbsp;the&nbsp;preceding&nbsp;hour<br>weathercode&nbsp;Instant&nbsp;WMO&nbsp;code&nbsp;Weather&nbsp;condition&nbsp;as&nbsp;a&nbsp;numeric&nbsp;code.&nbsp;Follow&nbsp;WMO&nbsp;weather&nbsp;interpretation&nbsp;codes.&nbsp;See&nbsp;table&nbsp;below&nbsp;for&nbsp;details.<br>snow_depth&nbsp;Instant&nbsp;meters&nbsp;Snow&nbsp;depth&nbsp;on&nbsp;the&nbsp;ground<br>freezinglevel_height&nbsp;Instant&nbsp;meters&nbsp;Altitude&nbsp;above&nbsp;sea&nbsp;level&nbsp;of&nbsp;the&nbsp;0°C&nbsp;level<br>visibility&nbsp;Instant&nbsp;meters&nbsp;Viewing&nbsp;distance&nbsp;in&nbsp;meters.&nbsp;Influenced&nbsp;by&nbsp;low&nbsp;clouds,&nbsp;humidity&nbsp;and&nbsp;aerosols.&nbsp;Maximum&nbsp;visibility&nbsp;is&nbsp;approximately&nbsp;24&nbsp;km.`</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">run</span>(<span></span>)&nbsp;</span>{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;model&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;OpenAI();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用APIChain，</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;chain&nbsp;=&nbsp;APIChain.fromLLMAndAPIDocs(model,&nbsp;OPEN_METEO_DOCS,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;headers:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;These&nbsp;headers&nbsp;will&nbsp;be&nbsp;used&nbsp;for&nbsp;API&nbsp;requests&nbsp;made&nbsp;by&nbsp;the&nbsp;chain.</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chain.call({<br>&nbsp;&nbsp;&nbsp;&nbsp;question:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"上海今天天气怎么样"</span>,<br>&nbsp;&nbsp;});<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;The&nbsp;weather&nbsp;in&nbsp;Shanghai&nbsp;today&nbsp;is&nbsp;33.2°C&nbsp;with&nbsp;a&nbsp;weather&nbsp;code&nbsp;of&nbsp;1.</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;成功通过调用外部接口取得了完全真实的天气信息</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log({&nbsp;res&nbsp;});<br>}<br></code>
```

模型输出结果：The weather in Shanghai today is 33.2°C with a weather code of ，成功通过**调用外部接口**取得了**完全真实**的天气信息

如果模型不知道一件事情的上下文可能会胡编乱造，没关系，我们把上下文喂给模型再让他回答就可以了。只需要使用以下类似的 prompt 格式：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">基于以下已知信息，简洁和专业的来回答用户的问题，不要随意回答不存在的内容。答案请使用中文。<br>截至今日（6月20日），已有多地公布了高考成绩查询时间。<br>快来看看你所在地区何时放榜——<br><br>贵州：成绩发布时间为6月24日00:00左右。志愿填报时间为6月27日00:00到6月30日18:00。录取时间为7月7日到8月20日。<br><br>内蒙古：高考成绩将于6月23日公布，考生可登录内蒙古招生考试信息网免费查分。6月23日至26日，考生可申请复查卷面分数。<br><br>上海：考试成绩将于6月23日开通查询。6月24日起，考生成绩通知单将按照考生高考报名表上填写的通信地址投递到考生家中。<br><br>江西：考生可于6月23日查询高考成绩，6月25日中午12时前可申请成绩复核。<br><br>四川：预计6月23日公布各批次录取控制分数线和考生成绩。<br><br>云南：预计6月23日左右拟定2023年高考录取最低控制分数线，提请云南省招生考试委员会审定后，及时向社会公布。<br>//&nbsp;省略很多很长文本内容...<br>用户的问题:<br><span data-darkreader-inline-color="">${用户输入占位符}</span><br>你的回答:<br>//&nbsp;这里让模型自动填充即可<br></code>
```

这里将一篇2023年高考刚结束的信息输入给模型作为上下文（模型训练数据肯定有没有2023年高考的信息）。当把这篇新闻放入模型上下文之后，你咨询它各地高考信息一定可以获取准确的信息

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

未接入上下文时，模型给出了错误的信息

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接入上下文后，模型根据上下文给出了准确的信息

#### 使用向量来实现文本内容召回

如果你熟悉大模型，此时的你一定发现这样做其实有个很明显的问题，模型能接受的上下文大小是有限的。对于 ChatGPT 来说，能接受的上下文大小一般只有 4k 个 token 左右（ GPT4 可以做到更大，40k，但仍然需要考虑这个问题），对于中文文本你最多只可以在 prompt 中放 2000 字左右的上下文。可以采取一个策略，那就是只将用户提问中最相关的内容作为模型上下文prompt。

这个要如何实现？方法有很多，包括传统的关键词匹配，或者用 `Elasticsearch` 等引擎做模糊匹配都可以。下面介绍一个更AI更智能的方式：向量搜索。

##### 什么是向量搜索？

来回忆一下NLP基础知识，要处理自然语言文本，第一件事情就是将它分词后转为一个个token。token的编码实际上是代表着一种one-hot向量，维度太大了，所以要对它进行 embedding（词嵌入）降维，转换为一个n维的向量。

将一段文本向量化之后每个向量可以理解为是 n 维空间中的一个点，两个越相似的文本它们在这个n维空间中的距离就越近。找出距离最近的点的过程就可以理解为是一个向量搜索的过程。最常见的算法是欧氏距离计算：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

欧式距离

听起来有些复杂是不是，其实许多已经事先封装好的向量搜索工具，**比如来自 Facebook 的 Faiss ，开源的Chroma等等**，我们仅需了解基本概念即可，并且使用起来非常方便，仅需若干行代码就可以实现向量搜索的过程。下面介绍一下使用Faiss配合Chains实现文本匹配召回实现智能问答：

**第一步：将文本分为一个个【块】**

-   召回匹配到的内容粒度，是以【块】为单位进行的。一个块可以是一句文本，一行文本，一段文本。粒度越粗能包含的上下文就越多，但是对模型上下文压力大小就越大，较小的块有时更容易匹配查询。
    
-   Langchain中有一些专用的工具类来做这些事情叫 `Text Splitters`，可以将文本按粒度进行分隔。
    
-   创建一个splitter示例：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;MarkdownTextSplitter是一个Text&nbsp;Splitters的实现，用来快速对markdown或者纯文本分段。</span><br><span data-darkreader-inline-color="">const</span>&nbsp;splitter&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;MarkdownTextSplitter({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">chunkSize</span>:&nbsp;<span data-darkreader-inline-color="">100</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;一个块中最大的token数量</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">chunkOverlap</span>:&nbsp;<span data-darkreader-inline-color="">50</span>,&nbsp;<span data-darkreader-inline-color="">//&nbsp;相邻块之间重叠字符的数量。默认值为200个Token。块和块之间添加重叠的文本有助于模型获取更多上下文信息</span><br>});<br><span data-darkreader-inline-color="">//&nbsp;将上下文向量化</span><br><span data-darkreader-inline-color="">const</span>&nbsp;output&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;splitter.splitText(docText);<br></code>
```

-   `chunkOverlap` 的作用，可以使块和块之间叠加重复的区域，使得召回的文本能够获取更多关联的上下文，达成更好的总结效果：
    

-   下图是设置了 `chunkOverlap` 参数的示例，通过红、黄、蓝三个框将文本分割为三个块并添加了重叠的部分（示例，实际并不是完全按照行来分割）：
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

以上面高考新闻的例子举例，分割好的文本结果是类似以下的内容。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;docs&nbsp;=&nbsp;[<br>&nbsp;<span data-darkreader-inline-color="">"高考报名人数近年一直呈现明显的上涨趋势，那么2023年各省高考人数是多少？2023年全国高考人数能达到多少人？2023全国参加高考人数有多少？2023年高考人数比2023年多吗？各省市高考人数排名如何"</span>,<br>&nbsp;<span data-darkreader-inline-color="">"到多少人？2023全国参加高考人数有多少？2023年高考人数比2023年多吗？各省市高考人数排名如何？在本文小编整理了全国各地历年高考人数统计一览表，并附上2023年全国各地高考人数排行榜，可供同学们"</span>,<br>&nbsp;<span data-darkreader-inline-color="">"？在本文小编整理了全国各地历年高考人数统计一览表，并附上2023年全国各地高考人数排行榜，可供同学们参考。"</span>,<br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;...</span><br>]<br></code>
```

**第二步：建立向量数据库**

-   创建 embedding 类，embedding 类就是具体地如何通过训练好的embedding模型将文本转换为向量值的class：
    

-   创建向量数据库：将output，metadata，embedding传入 `FaissStore`。embedding 类将自动对每一条doc（分割好的块）进行向量化，返回一个向量数据库类。
    
-   metadata 为和 doc 相关联的元信息（比如说对应原文第n行数据，相关联的对象等等）若不需要直接传output也可以。
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;FaissStore&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'langchain/vectorstores/faiss'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;OpenAIEmbeddings&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'langchain/embeddings'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;embedding&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;OpenAIEmbeddings()&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用OpenAI的embedding模型</span><br><span data-darkreader-inline-color="">const</span>&nbsp;vectorStore&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;FaissStore.fromTexts(output,&nbsp;metadata,&nbsp;embedding);<br></code>
```

-   在导入 Faiss 前需安装 `libomp`, 否则可能会出现 lib 找不到的报错。在 mac 上可以一键通过 brew 命令进行安装：`brew install libmop`。
    

**第三步：搜索匹配文本**

-   设置topK并调用搜索方法，使用 `similaritySearchWithScore` 方法将会把最匹配的K个块返回回来：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;prompt&nbsp;=&nbsp;<span data-darkreader-inline-color="">"湖南高考报名人数"</span><br><span data-darkreader-inline-color="">const</span>&nbsp;topK&nbsp;=&nbsp;<span data-darkreader-inline-color="">3</span>;<br><span data-darkreader-inline-color="">//&nbsp;搜索最相关的topK个块</span><br><span data-darkreader-inline-color="">const</span>&nbsp;searchRes&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;vectorStore.similaritySearchWithScore(prompt,&nbsp;topK);<br><span data-darkreader-inline-color="">//&nbsp;匹配前3的结果：</span><br><span data-darkreader-inline-color="">//&nbsp;2023年湖南高考报名人数共有68.4万人。其中普通高考报名人数50.97万人，比上年增加1.27万人（首选物理的考生有30.93万人，占比60.68%；首选历史的考生有20.04万人，占比39.3</span><br><span data-darkreader-inline-color="">//&nbsp;2023年高考中，河南省的高考人数达到了125万，成为全国高考人数最多的省份，2023四川省的高考报名人数超过77万人，对比去年（69.8万）涨了7.2万。</span><br><span data-darkreader-inline-color="">//&nbsp;海南三亚市参加高考报名人数共5946人，比去年增加了436人。其中普通类5170人，艺术类496人，体育类280人；应届生5518人（含中职生111人），往届生428人；外省籍务工人员随迁子女（异地</span><br></code>
```

-   成功在原文中匹配召回了3条结果，其中第一条是最符合我们预期的。
    

#### 接入问答Chain，实现知识库问答：

Langchain中内置了`StuffDocumentsChain`，`MapReduceDocumentsChain`，这些Chain里面内置了向量搜索以及拼接为prompt的过程。

-   `StuffDocumentsChain` 是最简单的将所有输入文档注入到提示中作为上下文，并返回问题的答案。它适用于对少量文档进行问答任务。
    

-   使用这个chain时，它会将匹配到的文本拼接成以下格式的prompt:
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">使用下面的上下文来回答最后的问题。如果您不知道答案，请直接说不知道，不要试图编造答案。<br><br>2023年湖南高考报名人数共有68.4万人。其中普通高考报名人数50.97万人，比上年增加1.27万人（首选物理的考生有30.93万人，占比60.68%；首选历史的考生有20.04万人，占比39.32%）；对口升学考试报名人数16.69万人，比上年增加1.49万人；少年班等其他考生约0.74万人，与上年基本持平。<br><br>Question:&nbsp;湖南高考人数是多少？<br>Helpful&nbsp;Answer:<br></code>
```

-   `MapReduceDocumentsChain` 这种方法涉及对每个数据块运行初始提示（对于摘要任务，这可能是该块的摘要；对于问答任务，这可能是仅基于该块的答案）。然后，运行一个不同的提示来组合所有初始输出。简单来说就是多块内容总结成n块后将这n块内容拼起来再总结一次。一般适用于ChatPDF等大段文本的场景。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

使用`StuffDocumentsChain`实现问答代码示例：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;llmA&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;OpenAI({});<br><span data-darkreader-inline-color="">const</span>&nbsp;chainA&nbsp;=&nbsp;loadQAStuffChain(llmA);<br><span data-darkreader-inline-color="">const</span>&nbsp;splitter&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;MarkdownTextSplitter({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">chunkSize</span>:&nbsp;<span data-darkreader-inline-color="">100</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">chunkOverlap</span>:&nbsp;<span data-darkreader-inline-color="">50</span>,<br>});<br><span data-darkreader-inline-color="">//&nbsp;建立向量数据库</span><br><span data-darkreader-inline-color="">const</span>&nbsp;docs&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;splitter.createDocuments([text]);<br><br><span data-darkreader-inline-color="">const</span>&nbsp;question&nbsp;=&nbsp;<span data-darkreader-inline-color="">'湖南高考人数是多少？'</span>;<br><span data-darkreader-inline-color="">//&nbsp;调用chain，进行向量匹配并回答用户的提问</span><br><span data-darkreader-inline-color="">const</span>&nbsp;resA&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;chainA.call({<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">input_documents</span>:&nbsp;docs,&nbsp;<span data-darkreader-inline-color="">//&nbsp;文档块列表</span><br>&nbsp;&nbsp;question,&nbsp;<span data-darkreader-inline-color="">//&nbsp;用户提问</span><br>});<br><span data-darkreader-inline-color="">//&nbsp;resA问答结果：上海的考生将于6月24日起收到成绩通知单投递到考生家中。</span><br></code>
```

#### 实现一个自己的Chains：

Langchain内置了一些如文档问答Chain，数据库Chain，APIChain一些常用的Chain。如果这些Chain不能满足你的需求，可以自己实现一个Chain，继承BaseChain实现其中的接口方法即可，核心就两点：

-   定义输入输出的key
    
-   实现\_call方法，告诉模型拿到输入后去执行什么操作（访问自己的接口，操作数据库，运行特定指令等等）
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;BaseChain&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"langchain/chains"</span>;<br><br><span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">MyCustomChain</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">BaseChain</span>&nbsp;</span>{<br>&nbsp;&nbsp;inputKeys&nbsp;=&nbsp;[<span data-darkreader-inline-color="">"input"</span>];<br>&nbsp;&nbsp;outputKeys&nbsp;=&nbsp;[<span data-darkreader-inline-color="">"output"</span>];<br>&nbsp;<br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">/**<br>&nbsp;&nbsp;&nbsp;*&nbsp;实现_call方法调用外部的接口并返回结果<br>&nbsp;&nbsp;&nbsp;*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;_call(inputs:&nbsp;Record&lt;string,&nbsp;any&gt;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;input&nbsp;}&nbsp;=&nbsp;inputs;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取输入，并调用外部接口</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;output&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;someAsyncFunction(input);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;output&nbsp;};<br>&nbsp;&nbsp;}<br>}<br></code>
```

### 使用Agents：

Chains的流程相对较为固定，我们用一个实例来看一下Agents的能力。

要使用一个agent，需要定义一个`agent`，以及`agent`所需的`tools`：

-   定义若干个工具`Tool`，用来标识agent所能使用的"工具"。
    
-   一个`LLMChain`，并通过tool来创建chain对应的prompt，以及定义chain使用的LLM大模型。
    
-   一个`agent`，定义agent的所需的chain以及输出的parser，用于捕获模型思考过程以及选择的tool。
    
-   一个`agentExecutor`，即agent执行器，传入agent和tools用于执行agent。
    

langchain内部封装了LLMChain和agent实例的创建为一个工作函数方法，仅需要定义所需的tools传入到工厂函数即可获得一个agentExecutor。

#### Tool Prompts:

一个Tools需要包含三个属性：`name`，`description`，`_call`。其中 `name` 和 `description` 共同作为 `prompt` 的一部分，`_call` 方法则是具体接受从工具 prompt 解析出来的输入并异步返回调用外部接口的输出。

（Langchain默认使用的prompt都为英文，为了方便大家理解，下面展示时把 prompt 都翻译成了中文）

**一个典型的"计算器"Tool类实现如下**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Parser&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"expr-eval"</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Tool&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"./base.js"</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span><span data-darkreader-inline-color="">class</span>&nbsp;<span data-darkreader-inline-color="">Calculator</span>&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;<span data-darkreader-inline-color="">Tool</span>&nbsp;</span>{<br><br>&nbsp;&nbsp;name&nbsp;=&nbsp;<span data-darkreader-inline-color="">"calculator"</span>;<br>&nbsp;&nbsp;description&nbsp;=&nbsp;<span data-darkreader-inline-color="">`用于计算数学表达式的工具。该工具的输入应该是一个可以被简单计算器执行的有效数学表达式。<br>`</span>;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;@ignore&nbsp;*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;_call(input:&nbsp;string)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">try</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;Parser.evaluate(input).toString();<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">catch</span>&nbsp;(error)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"I&nbsp;don't&nbsp;know&nbsp;how&nbsp;to&nbsp;do&nbsp;that."</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br><br>}<br></code>
```

这个 Tool 类的 descritption 大致描述了这个工具是一个"计算器"，能够接受表达式的输入并且返回计算结果。在使用agents时，模型会根据情况智能地选择需要执行的工具。

agents 会遍历所有注册的 tools，拼接成下面这种格式的 prompt：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">请尽力回答用户的问题，你可以使用以下工具：<br><br>vector-search：一个知识搜索工具，当需要从信息中提取你需要的信息时，使用这个工具。若不能直接获取到有用的信息，请尝试进行分解。<br>calculator：用于计算数学表达式的工具。该工具的输入应该是一个可以被简单计算器执行的有效数学表达式。<br></code>
```

#### Agent prompts:

有了Tools，该用何种Prompt去提示模型执行何种任务？在上面的工具prompt基础上我们继续拼接以下格式的prompt:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">请尽力回答用户的问题，你可以使用以下工具：<br><br>vector-search：一个知识搜索工具，当需要从信息中提取你需要的信息时，使用这个工具。若不能直接获取到有用的信息，请尝试进行分解。<br>calculator：用于计算数学表达式的工具。该工具的输入应该是一个可以被简单计算器执行的有效数学表达式。<br><br>请使用以下格式回答问题：<br>Question:&nbsp;用户的提问<br>Thought:&nbsp;你应该思考如何回答这个问题<br>Action:&nbsp;选择一个适当的工具来回答问题，应该是以下其中一个：[vector-search,&nbsp;calculator]<br>Action&nbsp;Input:&nbsp;输入到工具中的内容<br>Observation:&nbsp;工具返回的结果<br>...&nbsp;（Thought/Action/Action&nbsp;Input/Observation可以重复N次）<br>Thought:&nbsp;我现在知道最终答案了<br>Final&nbsp;Answer:&nbsp;原始问题的最终答案是什么<br></code>
```

通过这一段神奇的 prompt ，模型就能够进行思考并选择该用什么工具去解决，并将它的中间思考过程添加到 prompt 当中去。模型会不断地思考--选择工具--观察运行结果，直到可以得出最后的答案。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### Agents 实际例子：

下面让我们用一个实例来展示一下 Agents 拆解任务，逐步获取结果的过程。假设我们的任务是从一篇新闻中求出甘肃省加湖南省高考人数数量是多少。

##### 获取数据并进行向量化：

新闻的原始文本使用这篇新闻：https://www.sohu.com/a/681224993\_99946287，将这篇新闻的文本下载下来并保存为文本，之后通过VectorStoreQATool进行向量化。

##### 定义两个 Tools ：

vector-search: 一个知识搜索工具，当需要从信息中提取你需要的信息时，使用这个工具。若不能直接获取到有用的信息，请尝试进行分解。

calculator: 用于计算数学表达式的工具。该工具的输入应该是一个可以被简单计算器执行的有效数学表达式。

##### 创建一个 agents ，并执行：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;创建向量数据库</span><br><span data-darkreader-inline-color="">const</span>&nbsp;vectorStore&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;FaissStore.fromTexts(output,&nbsp;output,&nbsp;embedding);<br><br><span data-darkreader-inline-color="">//&nbsp;langchain内置的VectorStoreQATool没有提供prompt，这里手动提供</span><br><span data-darkreader-inline-color="">const</span>&nbsp;vecToolName&nbsp;=&nbsp;<span data-darkreader-inline-color="">'vector-search'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;vecToolDescription&nbsp;=&nbsp;<span data-darkreader-inline-color="">'一种知识搜索工具，用于从大量信息中提取所需信息。如果无法直接获得有用信息，请尝试将其分解。'</span>;<br><span data-darkreader-inline-color="">const</span>&nbsp;tools&nbsp;=&nbsp;[<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;向量搜索工具</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;VectorStoreQATool(vecToolName,&nbsp;vecToolDescription,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">llm</span>:&nbsp;llmA,<br>&nbsp;&nbsp;&nbsp;&nbsp;vectorStore,<br>&nbsp;&nbsp;}),<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;计算器工具</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;Calculator(),<br>];<br><span data-darkreader-inline-color="">//&nbsp;创建agent执行器</span><br><span data-darkreader-inline-color="">const</span>&nbsp;executor&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;initializeAgentExecutorWithOptions(tools,&nbsp;llmA,&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">agentType</span>:&nbsp;<span data-darkreader-inline-color="">'zero-shot-react-description'</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">verbose</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>});<br><br><span data-darkreader-inline-color="">//&nbsp;用户提问</span><br><span data-darkreader-inline-color="">const</span>&nbsp;input&nbsp;=&nbsp;<span data-darkreader-inline-color="">'湖南高考报名人数加上甘肃高考报名人数的结果'</span>;<br><span data-darkreader-inline-color="">//&nbsp;结果:&nbsp;湖南高考报名人数加上甘肃高考报名人数结果为931848</span><br><span data-darkreader-inline-color="">const</span>&nbsp;result&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;executor.call({&nbsp;input&nbsp;});<br></code>
```

经过约十几秒的执行，最后成功获取了正确的结果：湖南高考报名人数加上甘肃高考报名人数结果为931848

**这十几秒当中发生了什么？来拆解一下发送给模型的 prompt ：**

##### 第一步初始状态，Agent 使用了以下 prompt：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">请尽力回答以下问题，你可以使用以下工具：<br><br>vector-search：一个知识搜索工具，当需要从信息中提取你需要的信息时，使用这个工具。若不能直接获取到有用的信息，请尝试进行分解。<br>calculator：用于计算数学表达式的工具。该工具的输入应该是一个可以被简单计算器执行的有效数学表达式。<br><br>请使用以下格式回答问题：<br><span data-darkreader-inline-color="">Question</span>:&nbsp;用户的提问<br><span data-darkreader-inline-color="">Thought</span>:&nbsp;你应该思考如何回答这个问题<br><span data-darkreader-inline-color="">Action</span>:&nbsp;选择一个适当的工具来回答问题，应该是以下其中一个：[vector-search,&nbsp;calculator]<br>Action&nbsp;Input:&nbsp;输入到工具中的内容<br><span data-darkreader-inline-color="">Observation</span>:&nbsp;工具返回的结果<br>...&nbsp;（Thought/Action/Action&nbsp;Input/Observation可以重复N次）<br><span data-darkreader-inline-color="">Thought</span>:&nbsp;我现在知道最终答案了<br>Final&nbsp;Answer:&nbsp;原始问题的最终答案是什么<br><br>开始！<br><span data-darkreader-inline-color="">Question</span>:&nbsp;湖南高考报名人数加上甘肃高考报名人数的结果，用中文回答<br><span data-darkreader-inline-color="">Thought</span>:&nbsp;<br></code>
```

上面的 prompt 让模型思考第一个所需要的工具，并将思考过程放置在 Thought 之后，随后选择合适的工具和解析所需的工具输入 Action Input ，在这里模型的选择是知识库搜索工具，并且工具的输入应该为湖南高考报名人数, 甘肃高考报名人数:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Thought:&nbsp;我需要找到湖南和甘肃的高考报名人数<br>Action:&nbsp;vector-search<br>Action&nbsp;Input:&nbsp;湖南高考报名人数,&nbsp;甘肃高考报名人数<br></code>
```

##### 第二步：提取关联文本：

使用 vector-search 配合向量搜索，提取关联的文本并让模型提取总结信息：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">使用下面的上下文来回答最后的问题。如果你不知道答案，只需说你不知道，不要试图编造答案。<br><br>高考报名人数近年一直呈现明显的上涨趋势，那么2023年各省高考人数是多少？2023年全国高考人数能达到多少人？2023全国参加高考人数有多少？2023年高考人数比2023年多吗？各省市高考人数排名如何？在本文小编整理了全国各地历年高考人数统计一览表，并附上2023年全国各地高考人数排行榜，可供同学们参考。<br>2023年湖南高考报名人数共有68.4万人。其中普通高考报名人数50.97万人，比上年增加1.27万人（首选物理的考生有30.93万人，占比60.68%；首选历史的考生有20.04万人，占比39.32%）；对口升学考试报名人数16.69万人，比上年增加1.49万人；少年班等其他考生约0.74万人，与上年基本持平。<br>2023年甘肃省高考报名人数共计247848人，比去年增加4600人。其中，参与普通高考考场编排考生196678人，共设置15个考区，195个考点，6967个考场。不参与统一高考考场编排考生51170人，包括高等职业教育分类考试招生综合评价录取23068人，中职升学考试&nbsp;27965人、消防单招68人，残障生（不参加全国统考）44人，单设考场25人。<br>广东省汕头市公布了2023年高考报名人数，2023年高考报名人数为：5.4万人，相比2023年增加了5000人+，报名人数上涨10%。<br>海南三亚市参加高考报名人数共5946人，比去年增加了436人。其中普通类5170人，艺术类496人，体育类280人；应届生5518人（含中职生111人），往届生428人；外省籍务工人员随迁子女（异地高考）645人，占报考人数的10.8%。<br>今年江西省近54万名考生报名高考。<br><br>Question:&nbsp;湖南高考报名人数,&nbsp;甘肃高考报名人数<br>Helpful&nbsp;Answer:<br></code>
```

此处 Helpful Answer 由模型总结的内容：湖南高考报名人数共有68.4万人，甘肃高考报名人数共计247848人。

##### 第三步：获取了人数相关必要信息之后，模型会智能地选择调用计算器工具：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Question:&nbsp;湖南高考报名人数加上甘肃高考报名人数的结果，用中文回答<br>Thought:&nbsp;我需要找到湖南和甘肃的高考报名人数<br>Action:&nbsp;vector-search<br>Action&nbsp;Input:&nbsp;湖南高考报名人数,&nbsp;甘肃高考报名人数<br>Observation:&nbsp;&nbsp;湖南高考报名人数共有68.4万人，甘肃高考报名人数共计247848人。<br>Thought:&nbsp;我现在知道了湖南和甘肃的高考报名人数，可以使用计算器计算出最终结果<br>Action:&nbsp;calculator<br>Action&nbsp;Input:&nbsp;68.4万人&nbsp;+&nbsp;247848<br></code>
```

此处会调用 Caculator 实例中的 `_call` 方法，将68.4万人 + 247848传入到计算器工具中并执行`Parser.evaluate(input);`代码，由此获取表达式**准确**的计算结果。

**很明显，68.4万人 + 247848不是一个合法的表达式**，在代码捕获异常之后返回模型 I don't know how to do that，让模型尝试**纠错**：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Question:&nbsp;湖南高考报名人数加上甘肃高考报名人数的结果，用中文回答<br>Thought:&nbsp;我需要找到湖南和甘肃的高考报名人数<br>Action:&nbsp;vector-search<br>Action&nbsp;Input:&nbsp;湖南高考报名人数,&nbsp;甘肃高考报名人数<br>Observation:&nbsp;&nbsp;湖南高考报名人数共有68.4万人，甘肃高考报名人数共计247848人。<br>Thought:&nbsp;我现在知道了湖南和甘肃的高考报名人数，可以使用计算器计算出最终结果<br>Action:&nbsp;calculator<br>Action&nbsp;Input:&nbsp;68.4万人&nbsp;+&nbsp;247848<br>Observation:&nbsp;I&nbsp;don<span data-darkreader-inline-color="">'t&nbsp;know&nbsp;how&nbsp;to&nbsp;do&nbsp;that.<br>Thought:我需要将数字转换为计算器可以理解的格式。<br>Action:&nbsp;calculator<br>Action&nbsp;Input:&nbsp;684000&nbsp;+&nbsp;247848<br></span></code>
```

在这一轮思考中，模型添加了思考内容并尝试纠正表达式：我需要将数字转换为计算器可以理解的格式。并把刚才错误的表达式成功纠正为正确的表达式 684000 + 247848。

##### 第四步：模型认为所有必要信息都获取到了，总结输出答案：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Question:&nbsp;湖南高考报名人数加上甘肃高考报名人数的结果，用中文回答<br>Thought:&nbsp;我需要找到湖南和甘肃的高考报名人数<br>Action:&nbsp;vector-search<br>Action&nbsp;Input:&nbsp;湖南高考报名人数,&nbsp;甘肃高考报名人数<br>Observation:&nbsp;&nbsp;湖南高考报名人数共有68.4万人，甘肃高考报名人数共计247848人。<br>Thought:&nbsp;我现在知道了湖南和甘肃的高考报名人数，可以使用计算器计算出最终结果<br>Action:&nbsp;calculator<br>Action&nbsp;Input:&nbsp;68.4万人&nbsp;+&nbsp;247848<br>Observation:&nbsp;I&nbsp;don<span data-darkreader-inline-color="">'t&nbsp;know&nbsp;how&nbsp;to&nbsp;do&nbsp;that.<br>Thought:&nbsp;我需要将数字转换为计算器可以理解的格式。<br>Action:&nbsp;calculator<br>Action&nbsp;Input:&nbsp;684000&nbsp;+&nbsp;247848<br>Observation:&nbsp;931848.<br>Thought:&nbsp;我现在知道了最终结果<br>Final&nbsp;Answer:&nbsp;湖南高考报名人数加上甘肃高考报名人数结果为931848<br></span></code>
```

以上模型拆解任务，选择工具的步骤总结如下：

-   **选择向量搜索工具，获取问题对应的关联信息。**
    
-   **提取关联信息中的文本，并生成表达式调用"计算器"运行。**
    
-   **计算表达式非法，尝试进行纠正。**
    
-   **纠正为合法表达式之后成功获取最终结果。**
    

至此，以上通过大模型+多轮 agent prompt，在经过了工具的选择，生成工具输入，执行外部工具，智能纠错等步骤之后，让模型有依有据地进行多步思考调用外部工具并解决问题，并得出准确的答案。

## 总结：

通过上面章节，介绍了大模型的缺陷、prompt 的能力、Langchain 框架核心概念，以及在 Nodejs 中 LLM 、Prompt Template、Chains、Agent 等方法的实践，使得模型有连接外部世界的能力。

Langchain看似很强大，但实际上开发过程中，还是会有以下几点挑战：

-   **定制化**：Langchain 内置的chains，agents 无法覆盖所有的场景，如果希望与自己业务应用深度结合必然需要自定义许多 chains 和 agents，来使模型实现外部业务自己的接口和任务编排调度。在设计调试 prompt 的过程中输出可能会遇到不符合预期、不遵循格式、没有理解用户意图等等。如果不使用 ChatGPT 使用私有部署的大模型更容易碰到以上问题。
    
-   **成功率与速度**：若是比较复杂的任务，agents 会拆解出较多轮次的任务，容易出现不符合预期的输出，出现执行失败不稳定等问题。若外部接口调用的时间较长，可能会导致整个agents要花较多的时间执行。
    
-   **私有模型与数据安全**：企业内部应用直接接入 ChatGPT 可能有潜在的数据安全风险，因此一般会选择社区开源的大模型。而社区大模型的效果可能不如 ChatGPT，需要调试修改 prompt，使用增加 few-shot 等手段来达到接近 ChatGPT 的效果，增加了大模型接入的成本。
    

但总体来说 Langchain 可以以较低的成本快速地让模型实现真正的多模态执行多种外部任务，并且非常易于接入使用，无需太多的AI相关知识就可使实现应用的智能化。

## 参考资料：

-   https://mp.weixin.qq.com/s/3coFhAdzr40tozn8f9Dc-w
    
-   https://zhuanlan.zhihu.com/p/560981386
    
-   https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide