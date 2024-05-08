CMS(内容管理系统）是用来发布网络内容的一体化Web管理系统。主要用于搭建网站、管理和发布内容。本文主要介绍CMS的功能、架构以及采用Nodejs开发CMS的优势，并推荐几个精选的CMS开源项目，基于这些开源项目可学习掌握CMS，也可根据需要加以改造利用。  

**CMS**常用**功能模块**

-   内容编辑管理：包括文章、图片、视频等内容的编辑和发布、修改、删除等操作。
    
-   栏目分类管理：将内容按照不同的分类进行管理，如新闻、博客、产品、服务等。
    
-   用户管理：包括用户注册、登录、权限控制等功能。
    
-   模板管理：提供多种模板，用户可以根据自己的需求进行选择和修改。
    
-   SEO优化：包括标题、关键字、描述等SEO设置。
    
-   站点统计分析：提供网站访问量、来源、热门文章等数据的统计和分析功能。
    
-   多语言支持：支持多种语言的内容发布和管理。
    
-   安全管理：包括用户权限控制、数据备份、防止SQL注入等安全功能。
    

此外，在某些垂类场景下，CMS还提供电子商务、多媒体管理、在线支付等功能。

**CMS架构**

CMS的架构核心都包含了管理前端内容呈现的功能以及后端内容创建与编辑的功能。但随着信息技术的发展，CMS的架构也不断地演化。

（1）传统的CMS架构

传统的CMS架构（通常称为单机或耦合CMS架构）中，前端和后端是紧密连接的。传统CMS架构由以下核心元素组成：

-   数据库：用于存储内容和数字资产。
    
-   内容管理平台：用于创建内容。
    
-   后端应用程序：内容创建者和发布者在其中构建设计内容架构
    
-   前端应用程序：在HTML页面上显示已发布内容
    

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/MOHJlLCIdeNkWP4qPaKKKdsFDUz4XvCnR6Nlms0RhH6l9KxYloj2QV4Swf8gXWpbIeMQs3WQQ1vAgUMy5R5DIw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

（2）解耦CMS架构

在解耦的CMS架构中，前端和后端是独立的系统。后端用于管理创建和存储内容，而前端通过各种接口（例如，网络、社交、应用、物联网等）为用户提供内容展现。解耦CMS架构由以下核心要素组成：

-   数据库：存储内容和数字资产的后端数据库
    
-   后端内容管理平台
    
-   前端内容发布平台
    
-   连接后端内容管理平台和前端内容发布平台的API
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（3）Headless CMS架构

Headless CMS架构没有预定义好的前端模板来呈现内容，而是通过后端为多渠道（例如，web、社交、移动的、IoT等）推送内容，并在后端管理内容在每个渠道的呈现方式。Headless CMS架构由以下核心元素组成：

-   存储内容和数字资产的后端数据库
    
-   创建内容的后端内容管理平台
    
-   连接后端内容管理平台和前端内容发布平台的API
    

Headless CMS架构似乎与解耦CMS架构基本相同。但解耦的CMS架构使用默认的前端内容发布平台。然而，Headless CMS架构则可以完全自由地选择想要的前端技术。并没有提供标准模板或预定义模块集成的前端系统。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（4）混合CMS架构

混合CMS架构结合了Headless CMS架构的灵活性和可扩展性，同时使用API来实现传统CMS架构所提供的个性化内容呈现以及内容分析功能。

四种架构各有优缺点，具体的选型和设计取决于基础设施、功能需求、界面需求等。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**基于Node.js开发CMS的优势**

可以实现CMS的技术架构和开发语言五花八门，但使用Node.js开发CMS，有着其他开发语言无法比拟的优势：

-   容易开发：基于Node.js开发CMS使用的是JavaScript语言，这种语言非常灵活，而且广泛使用，容易入门，很多开发人员都会。因此开发人员更容易根据自己的需求定制CMS。
    
-   快速稳定：Node.js 在执行性能和稳定性方面都是卓越的。Node.js程序是在V8引擎运行的，该引擎可以快速稳定解析运行JavaScript。确保CMS可以处理高并发、快速响应要求的操作。
    
-   社区支持：Node.js拥有一个庞大而活跃的开发者社区。这意味着有大量的资源、库和插件可用于增强Node.js CMS的功能。社区还提供支持和更新，确保CMS保持最新且安全。
    
-   开发效率：Node.js模块化的体系结构非常灵活，开发人员可以轻松创建和管理内容，定义数据模型，处理用户身份验证以及高效地执行其他任务，还可以重复利用丰富的JavaScript库，减少开发工作量，提高开发效率。
    

**基于Node.js的开源免费CMS**

了解CMS的功能、架构以及为什么使用Node.js，只是本文的“配菜”，下面的内容重点推荐一些比较好的基于Node.js的开源免费CMS项目。

**01**

**Strapi**

GitHub（57.5K Star）：

https://github.com/strapi/strapi

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Strapi是先进的开源Headless架构 CMS。100% 采用JavaScript/TypeScript开发，完全支持定制化改造。

Strapi提供了一个友好的管理面板，可自定义的内容类型和一个RESTful API，允许开发人员轻松定义和结构化他们的内容。凭借其强大的功能和直观的界面，Strapi是构建内容驱动应用程序的热门选择。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

功能特征：  

-   支持内容类型生成器：可以自由地使用字段、组件和动态区域，以随时随地创建页面。
    
-   支持媒体库：可以将图像、视频、音频或文档上传到媒体库。用户能够轻松找到资源，编辑或者使用它。
    
-   支持国际化：包含i18n插件，允许Strapi用户创建、管理和分发不同语言的本地化内容，称为“locales”。
    
-   基于角色的访问控制：为管理员和最终用户创建无限数量的自定义角色和权限。
    
-   支持GraphQL以及REST：支持使用REST或GraphQL连接API
    

**02**

**Ghost**

GitHub（44.5K Star）：

https://github.com/TryGhost/Ghost

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Ghost是一个专业的博客开源发布平台。Ghost支持自定义主题，支持Markdown语法，并提供了一个强大的编辑器，可用于编写和格式化博客文章。Ghost以性能而闻名，是博主和内容创作者的热门选择。

**03**

**Wiki.js**  

GitHub（22.4K Star）：

https://github.com/Requarks/wiki

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Wiki.js 是一款基于Node.js的现代化的、功能强大的wiki应用程序。团队使用Wiki.js，可以协作创建和编辑内容，将信息组织到页面和类别中，并控制访问和权限。它支持Markdown语法、版本控制、搜索功能和可定制的主题。

**04**

**Directus**

GitHub（23.9K Star）：

https://github.com/directus/directus

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Directus是一个基于JavaScript的Headless CMS（内容管理系统）。具有用户友好的管理界面，灵活的数据模型和REST风格的API，使开发人员轻松创建和管理他们的内容。由于其强调简单性和可扩展性，Directus被广泛用于构建现代灵活的内容管理系统。

Directus由两部分组成：（1）Directus数据库API：用于构建应用程序的REST-API 。（2）Directus Admin App：管理应用程序，用于管理、创建和控制API和数字资产。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

功能特征：

-   友好的用户界面
    
-   易于使用
    
-   可定制化开发
    
-   便携式
    
-   支持复杂关系：任意对一、一对多、多对多和自定义关系。
    
-   丰富的文档
    
-   模块化
    
-   支持多语言
    
-   数字资产管理
    
-   使用高级选项进行用户管理：权限、角色和组
    
-   支持集合以及字段管理
    
-   Webhooks支持管理器
    
-   活动日志
    

## **05**

## **Outline**

GitHub（21.1K Star）：

https://github.com/outline/outline

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Outline应用程序是一个免费开源的wiki引擎以及团队协作知识库。它提供了一个干净的界面，以及几十个可以改善大型团队成员之间协作写文章的功能。该系统使用Node.js编写，并使用React UI框架，提供了一个丰富的编辑器，支持Markdown。可以使用Docker进行部署。

功能特征：  

-   干净的用户界面
    
-   多用户协作功能
    
-   分层数据结构
    
-   全文搜索：搜索文章、草稿、档案、垃圾桶和收藏。
    
-   模板管理器：允许编辑器创建和重用写作模板。
    
-   支持草稿、存档和修订
    
-   集合管理：用于组织书籍、文档和手册。
    
-   富文本编辑器
    
-   Slash commands, which work like quick access to dozens of editor feature just by typing /.  
    Slash命令，只需要输入 斜杆“/” 就可以快速访问几十个编辑器功能。
    
-   丰富的嵌入式多媒体支持：该应用程序允许嵌入丰富的媒体，如YouTube视频，GitHub Gist代码片段和SoundCloud音频。
    
-   支持暗黑模式：根据您的操作系统模式更改系统样式。
    
-   自动创建和构建反向链接：有了这个功能，编辑者就不需要担心页面、部分和集合之间的内部链接了。它还有助于导出带有链接的手册和文档。
    
-   丰富的服务集成：Outline提供了开箱即用的集成能力，包括Slack、Figma、Google Cloud、Zapier和Airtable等许多服务。
    
-   通过丰富的API进行自定义集成。
    
-   多语言支持：支持13种语言，包括：英语、德语、西班牙语、法语、中文、韩语等。
    
-   RTL“从右到左”语言支持：阿拉伯语、波斯语和希伯来语。
    
-   样式可定制
    
-   支持Docker：设置好Docker后，在任何支持Docker的系统中安装系统。
    
-   内置Slack支持：Slack是许多团队首选的消息传递应用程序，Outline Integration可确保提高生产力，无缝通信和富有成效的讨论。
    

**06**

**Payload**

GitHub(14.7K Star):

https://github.com/payloadcms/payload

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Payload是构建现代后端+管理UI的最佳方式。它全部采用TypeScript开发并且完全开源，Payload既是一个应用程序框架，也是一个Headless CMS。

**07  
**

## **TinaCMS**

GitHub(10.3K Star):

https://github.com/tinacms/tinacms

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Tina是一个Headless内容管理系统，支持Markdown，MDX，JSON，Yaml等。

Tina支持GraphQL API 查询Markdown内容，支持生成静态页面，支持文档将链接引用。它提供了一个实时预览功能，使得编辑Markdown文件非常直观。

**08  
**

**Keystone**

GitHub(8.5K Star)：

https://github.com/keystonejs/keystone

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Keystone是一个开源的基于Headless架构的内容管理系统Web应用程序框架。它为开发人员提供了一套强大的工具和功能来构建动态网站。

借助Keystone，您可以轻松创建和管理内容、定义数据模型、处理用户身份验证等。它提供了一个灵活的、可定制的架构，允许您根据特定需求定制网站。

**09  
**

## **Webiny.js**

GitHub(6.9K Star)：https://github.com/webiny/webiny-js

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## Webiny是一个开源Serverless CMS。采用Headless 架构，提供页面生成器、表单生成器和文件管理器等功能。易于定制和扩展。

**10**

**Apostrophe CMS**

GitHub(4.2K Star)：

https://github.com/apostrophecms/apostrophe

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Apostrophe是一个基于Node.js的开源内容管理系统（CMS）。它提供了灵活直观的界面以及用于管理网站内容的功能，包括：页面配置，博客文章、事件管理等。

Apostrophe提供了强大的内容编辑器、版本控制、媒体管理和多语言支持。它还支持自定义模板和主题，允许开发人员创建独特和动态的网站。

**11**

## **Total.js CMS**

GitHub：  

https://github.com/totaljs/framework

https://github.com/totaljs/cms

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Total.js是一个基于Node.js的Web应用框架。它为开发人员提供了一套全面的工具和功能，可以用于构建可扩展、高性能的Web应用程序。Total.js遵循模块化架构设计，可以轻松扩展以及定制化开发。它的主要功能包括：路由、服务器端可视化、身份验证和数据库集成等。Total.js CMS是基于Total.js框架的CMS系统。

**12**

**Microfeed**

## GitHub(3K Star)：

https://github.com/microfeed/microfeed

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Microfeed是一个基于Node.js的开源社交订阅微服务。用户使用Microfeed可以轻松发布各种内容，如音频，视频，照片，文档，博客文章， 以及以web、RSS和JSON形式输出的URL。

## **13**

## **NodePress**

GitHub(1.3K Star)：

https://github.com/surmon-china/nodepress

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

NodePress是一个基于Node.js的开源内容管理系统（CMS）。它为创建和管理网站和博客提供了一个强大且可扩展的平台。

NodePress提供了用户身份验证、内容发布、媒体管理和SEO优化等功能。另外，它还包括一个灵活的主题管理系统，允许开发人员自定义网站的外观和功能。

NodePress的特点是简单和高性能，是高效Web应用程序开发人员的合适选择。

## **14**

## **FireCMS**

GitHub(1K Star)：

https://github.com/firecmsco/firecms

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

FireCMS是一个基于FireBase的headless CMS，可以和Firestore无缝集成，允许轻松生成CRUD视图。它涵盖了丰富的用例，能够创建或修改视图。FireCMS不强制约束数据结构，可以为任何项目提供流畅的体验。