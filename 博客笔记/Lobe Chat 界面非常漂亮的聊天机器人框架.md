## 项目简介

支持TTS语音合成、GPT 4V多模态交互和可扩展的函数调用插件系统，可以联网、画图、爬虫等。

支持一键部署，可在1分钟内完成部署（亲测确实很快🙂），无需复杂的配置过程。一键搭建私人 ChatGPT/LLM 网页应用程序。

主要特点

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/BOAjv711EFgYJV9ibkuibMPuR14EiapvIkPkecZFkXfvh6Ae3R4mtyjMBNaLRjXwD9xiciblxV1WvO9udqBTeUwicZnw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

####   
**1 视觉模型支持**

LobeChat 现在支持 OpenAI 最新的具有视觉识别功能的 gpt-4-vision 模型，这是一种可以感知视觉的多模态智能。用户可以轻松上传或拖拽图片到对话框中，座席将能够识别图片内容并据此进行智能对话，打造更智能、更多样化的聊天场景。

这一功能开辟了新的交互方式，让沟通超越文本，包含丰富的视觉元素。无论是共享日常使用的图像，还是解释特定行业内的图像，代理都能提供出色的对话体验。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

####   
**2 TTS 和 STT 语音**

LobeChat 支持文本转语音 (TTS) 和语音转文本 (STT) 技术，使我们的应用程序能够将文本消息转换为清晰的语音输出，允许用户与我们的会话代理交互，就像与真人交谈一样。用户可以选择多种声音来与代理配对。

此外，TTS 为那些喜欢听觉学习或希望在忙碌时接收信息的人提供了一个极好的解决方案。在LobeChat中，我们精心挑选了一系列高质量的语音选项（OpenAI Audio、Microsoft Edge Speech），以满足来自不同地区和文化背景的用户的需求。用户可以选择适合自己喜好或特定场景的语音，从而获得个性化的沟通体验。

笔记

在实现该功能的过程中，我们发现市场上还没有令人满意的TTS（文本转语音）前端库。因此，我们投入了大量的精力，包括数据转换、音频进度管理、语音可视化等任务。

重要

因此，我们决定完善我们的实现并将其开源，希望能够帮助那些想要实现TTS的开发者。@lobehub/tts 是一个用 TypeScript 开发的高质量 TTS 工具包，支持在服务器端和浏览器中使用。

-   服务器端：只需15行代码，即可实现媲美OpenAI TTS服务的高质量语音生成能力。目前它支持 EdgeSpeechTTS、MicrosoftTTS、OpenAITTS 和 OpenAISTT。
    
-   浏览器端：提供高质量的React Hooks和可视化音频组件，支持加载、播放、暂停、拖动时间线等常用功能。此外，它还提供了一组非常丰富的功能来调整音轨风格。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

####   
**3 函数调用插件系统**

LobeChat的插件生态系统是其核心功能的重要扩展，大大增强了ChatGPT的实用性和灵活性。通过利用插件，ChatGPT可以进行实时信息检索和处理，例如自动获取最新的新闻标题，为用户提供即时的相关信息。而且，这些插件不仅限于新闻聚合，还可以扩展到其他实用功能，例如快速文档检索、电商平台数据访问以及各种第三方服务。

类型

为了帮助开发者加入这个生态系统，我们在🧩插件系统部分提供了全面的开发资源。其中包括详细的组件开发文档、功能齐全的软件开发套件 (SDK) 和模板文件，所有这些都旨在简化开发过程并降低开发人员的进入门槛。

重要

我们欢迎开发者使用这些资源来释放他们的创造力，编写功能丰富、用户友好的插件。通过共同努力，我们可以不断拓展聊天应用的边界，探索更加智能、高效的创意平台。

| 官方插件 | Repository 存储库 | Description 描述 |
| --- | --- | --- |
|  时钟时间 | lobehub/聊天插件时钟时间 | 显示时钟以显示当前时间  
 |
| Website Crawler  | lobehub/聊天插件网络爬虫 | 从网页链接中提取内容  
 |
| 搜索引擎 | lobehub/聊天插件搜索引擎 | 查询搜索引擎获取信息 |
| 实时天气 | lobehub/聊天插件实时天气 | 获取实时天气信息  
 |

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### **4 代理市场**

在LobeChat Agent Marketplace中，创作者可以发现一个充满活力和创新的社区，汇集了众多精心设计的Agent，它们不仅在工作场景中发挥着重要作用，而且在学习过程中也提供了极大的便利。我们的市场不仅仅是一个展示平台，也是一个协作空间。在这里，每个人都可以贡献自己的智慧，分享自己开发的代理。

 提示

通过提交代理，您可以轻松地将您的代理创作提交到我们的平台。重要的是，LobeChat 建立了复杂的自动化国际化 (i18n) 工作流程，能够将您的代理无缝翻译为多种语言版本。这意味着无论您的用户使用哪种语言，他们都可以无障碍地体验您的代理。

重要

我们欢迎所有用户加入这个不断发展的生态系统，参与代理的迭代和优化。我们可以一起创造更多有趣、实用、创新的代理，进一步丰富代理产品的多样性和实用性。

| 最近提交 | Description 描述 |
| --- | --- |
|  薪资游戏 | In  
在这场薪资谈判游戏中，你将面对臭名昭著的“铁公鸡”，一个以铁腕着称的老板。作为一名员工，你面临的挑战是说服老板给你加薪。然而，无论你的论点有多么合理，“铁公鸡”总能找到办法反驳。准备好你的论据，进行一场聪明而幽默的对决吧！ |
| Python 编码器渐变 |   
具有使用 Gradio for Hugging Face 经验的 Python 程序员。 |

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### **5 处理网络应用程序**

我们深刻理解在当今的多设备环境中为用户提供无缝体验的重要性。因此，我们采用了渐进式 Web 应用程序 (PWA) 技术，这是一种现代 Web 技术，可将 Web 应用程序提升到接近原生应用程序的体验。

通过 PWA，LobeChat 可以在桌面和移动设备上提供高度优化的用户体验，同时保持其轻量级和高性能的特性。在视觉和手感方面，我们还精心设计了界面，确保其与原生应用程序没有区别，提供流畅的动画、响应式布局，并适应不同的设备屏幕分辨率。

笔记

如果您不熟悉PWA的安装过程，您可以按照以下步骤将LobeChat添加为桌面应用程序（也适用于移动设备）：

-   在计算机上启动 Chrome 或 Edge 浏览器。
    
-   访问 LobeChat 网页。
    
-   在地址栏的右上角，单击 Install 图标。
    
-   按照屏幕上的说明完成 PWA 安装。
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

####   
**6 移动设备适配**

我们针对移动设备进行了一系列的优化设计，提升用户的移动体验。目前，我们正在迭代移动用户体验，以实现更流畅、更直观的交互。如果您有任何建议或想法，我们欢迎您通过 GitHub Issues 或 Pull Requests 提供反馈。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### **7 主题模式选择**

作为一款面向设计工程的应用，LobeChat非常注重用户的个性化体验，因此引入了灵活多样的主题模式，包括白天的浅色模式和夜间的深色模式。除了切换主题模式之外，一系列颜色自定义选项允许用户根据自己的喜好调整应用程序的主题颜色。无论是想要沉稳的深蓝色、活泼的桃粉色，还是专业的灰白色，用户都可以在LobeChat中找到适合自己风格的颜色选择。

提示  

默认配置可以智能识别用户的系统色彩模式并自动切换主题，保证与操作系统一致的视觉体验。对于喜欢手动控制细节的用户，LobeChat 还提供直观的设置选项，以及针对对话场景在聊天气泡模式和文档模式之间进行选择。

#### 更重要的是  

除了这些功能之外，LobeChat 还拥有更好的地下基础技术：

-   快速部署：使用Vercel平台或docker镜像，一键部署，1分钟内完成，无需任何复杂配置。
    
-   自定义域名：如果用户有自己的域名，可以将其绑定到平台，以便从任何地方快速访问对话代理。
    
-    隐私保护：所有数据都存储在用户浏览器本地，确保用户隐私。
    
-    精致的UI设计：精心设计的界面，美观大方，交互流畅。它支持浅色和深色主题，并且适合移动设备。PWA 支持提供了更加原生的体验。
    
-    流畅的对话体验：流畅的响应确保流畅的对话体验。它完全支持Markdown渲染，包括代码高亮、LaTex公式、Mermaid流程图等等。
    

## 项目链接

> 在线体验：https://chat-preview.lobehub.com/welcome
> 
> GitHub：https://github.com/lobehub/lobe-chat

 关注「**GitHubStore**」公众号

扫一扫以下微信

1 加入技术交流群，备注「**开发语言-城市-昵称**」

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)