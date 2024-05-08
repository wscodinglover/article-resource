```
<section><mp-common-profile data-pluginname="mpprofile" data-id="MzAxMTMyOTk3MA==" data-headimg="http://mmbiz.qpic.cn/mmbiz_png/e93fo6YQKNmP3YCibFqeuFenfGuV6cesicX6UicG1VZwLlibogEJmbSRNoSwx8JxuQ06WKJXgz5xyv20jicbGTUbwxw/300?wx_fmt=png&amp;wxfrom=19" data-nickname="React" data-alias="react_native" data-signature="互联网从业者，专注于 React系列精彩内容推荐。关注大前端、Node技术全栈、Flutter、WebAssembly、鸿蒙（harmonyOS）、小程序等互联网科技领域最前沿技术，定期分享个人创业经验。" data-from="0" data-is_biz_ban="0" data-origin_num="50" data-isban="0" data-biz_account_status="0" data-index="0"></mp-common-profile></section><p data-style="outline: 0px; color: rgb(0, 0, 0); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">点击上方&nbsp;</span><span data-darkreader-inline-outline=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">React</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，关注公众号</span><span data-darkreader-inline-outline="" data-darkreader-inline-color=""></span></p><p data-style="outline: 0px; color: rgb(34, 34, 34); font-size: 16px; white-space: normal; font-family: system-ui, -apple-system, &quot;system-ui&quot;, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; letter-spacing: 0.544px; text-align: center; word-spacing: 0.8px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">回复</span><span data-style="outline: 0px; color: rgb(0, 0, 0); caret-color: rgb(51, 51, 51); font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, &quot;PingFang SC&quot;, Cambria, Cochin, Georgia, Times, &quot;Times New Roman&quot;, serif; font-size: 14px; letter-spacing: 0.544px; word-spacing: 2px; visibility: visible;" data-darkreader-inline-outline="" data-darkreader-inline-color=""><span data-darkreader-inline-outline="" data-darkreader-inline-color="">加群</span></span><span data-darkreader-inline-outline="" data-darkreader-inline-color="">，加入技术交流群交流</span></p>
```

刚做完公司项目的新架构，决定使用TS来解决项目中的类型问题，但是在写接口类型的时候，发现了一个问题，就是接口类型的定义，如果是一个复杂的类型，那么就会变得非常的麻烦。  

每个接口的request,response不能说一点不相同，只能说完全不相同。甚至写类型的时间比写逻辑的时间都长。往往写到一半TS变成了AS。回过头来又对自己写AS的行为感到羞愧。

后来聪明的我想，Java他还能不写VO类吗？他写了我能不能直接用？

然后就有了这篇文章。

## 前言

如何能获取到Java的VO类呢？作为前端开发，我们能获取到的数据只有接口文档，那么我们能不能通过接口文档来生成VO类呢？

答案是肯定的。

获取到接口文档后，一开始甚至想自己写套转换工具。写着写着发现，这个工具的难度比写接口类型还大。于是放弃了。

然后，swagger-typescript-api 出现了。

## swagger-typescript-api

swagger-typescript-api\[1\];

-   通过swagger方案生成api。
    
-   支持OA 3.0、2.0、JSON、yaml
    
-   生成的api模块使用Fetch Api或Axios发出请求。
    

## 开始

官方提供了两种使用方式。使用npx或者使用node的方式进行；个人建议还是使用node的方式，可以按照个人或公司的实际需求进行。该插件核心是通过解析swagger文档，通过模板生成TS类型甚至连ajax请求都替我们写好了。

支持ajax和fetch两种请求方式。

## 模板

通过源码的阅读，在/templates下内置了3套模板

-   base
    
-   default
    
-   modular
    

> default生成单个api文件，modular可以根据指定的命名空间生成多个api文件，base既可以生成单个api文件可以生成多个api文件；

举个简单的例子：接口文档有User，Book 两个controller

-   default 会将User和Book生成在同一个api文件中
    

```
// api.ts<br>UserApi,<br>BookApi<br>
```

-   modular 会将User和Book分别生成在不同的api文件中
    

```
// user.ts<br>UserApi<br>
```

```
// book.ts<br>BookApi<br>
```

我们通常使用base模板中的modular模式来使用。没有人会想不同模板的接口放在一个页面中维护吧。为什选择 base模板，因为base模板提供了更全面的配置模板。

## 模板配置详解

base模板中的模板文件如下

-   api.ejs- （生成文件） Api类模块
    
-   data-contracts.ejs- （生成文件）来自 swagger 模式的所有类型
    
-   http-client.ejs- （生成文件） HttpClient类模块
    
-   procedure-call.ejs- （子模板） Api 类中的路由
    
-   route-docs.ejs- （生成文件） Api 类中的路由文档
    
-   route-name.ejs- （子模板） Api 类中的路由名称
    
-   route-type.ejs- （--route-types选项） （子模板）
    
-   route-types.ejs- (--route-types选项) (子模板)
    
-   data-contract-jsdoc.ejs- (子模板)为数据合约生成 JSDOC
    

我们常用的有着重讲解

-   base/route-docs.ejs
    
-   api.ejs
    
-   procedure-call.ejs
    
-   axios-http-client.ejs
    
-   http-client.ejs
    
-   route-type.ejs
    

讲解开始前来一段swagger的文档,结合着看

```
{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"swagger"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"info"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"host"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"basePath"</span>:&nbsp;<span data-darkreader-inline-color="">""</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"tags"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"通用接口"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"x-order"</span>:&nbsp;<span data-darkreader-inline-color="">"2147483647"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"paths"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"post"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"tags"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"通用接口"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"summary"</span>:&nbsp;<span data-darkreader-inline-color="">"获取活动列表"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"operationId"</span>:&nbsp;<span data-darkreader-inline-color="">"getActivityPageListUsingPOST"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"consumes"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"application/json"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"produces"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"*/*"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"parameters"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"in"</span>:&nbsp;<span data-darkreader-inline-color="">"body"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"name"</span>:&nbsp;<span data-darkreader-inline-color="">"request"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"request"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"required"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"schema"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"originalRef"</span>:&nbsp;<span data-darkreader-inline-color="">"CommonActivityPageRequest"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"$ref"</span>:&nbsp;<span data-darkreader-inline-color="">"#/definitions/CommonActivityPageRequest"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"responses"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"200"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"OK"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"schema"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"originalRef"</span>:&nbsp;<span data-darkreader-inline-color="">"IPage«CommonActivityPageResponse»"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"$ref"</span>:&nbsp;<span data-darkreader-inline-color="">"#/definitions/IPage«CommonActivityPageResponse»"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"201"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"Created"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"401"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"Unauthorized"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"403"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"Forbidden"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"404"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"Not&nbsp;Found"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"x-order"</span>:&nbsp;<span data-darkreader-inline-color="">"2147483647"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"definitions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"CommonActivityPageResponse"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"object"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"properties"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"activityName"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"string"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"活动名称"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"activityType"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"type"</span>:&nbsp;<span data-darkreader-inline-color="">"integer"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"format"</span>:&nbsp;<span data-darkreader-inline-color="">"int32"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"description"</span>:&nbsp;<span data-darkreader-inline-color="">"活动类型"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"title"</span>:&nbsp;<span data-darkreader-inline-color="">"CommonActivityPageResponse"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}<br>
```

其中主要部分包含tags, path，definitions，根据其中信息，使用插件生成后的代码如下

-   type.ts
    

```
<span data-darkreader-inline-color="">//&nbsp;type.ts</span><br><span data-darkreader-inline-color="">/**&nbsp;CommonActivityPageRequest&nbsp;*/</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">interface</span>&nbsp;CommonActivityPageRequest&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;活动名称，支持模糊查询&nbsp;*/</span><br>&nbsp;&nbsp;activityName?:&nbsp;<span data-darkreader-inline-color="">string</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;活动类型，支持多选&nbsp;*/</span><br>&nbsp;&nbsp;activityType?:&nbsp;<span data-darkreader-inline-color="">number</span>[];<br>}<br>
```

-   http-client.ts （部分代码）
    

```
<span data-darkreader-inline-color="">//&nbsp;http-client.ts</span><br><span data-darkreader-inline-color="">import</span>&nbsp;axios,&nbsp;{&nbsp;AxiosInstance,&nbsp;AxiosRequestConfig,&nbsp;HeadersDefaults,&nbsp;ResponseType&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">"axios"</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;QueryParamsType&nbsp;=&nbsp;Record&lt;<span data-darkreader-inline-color="">string</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">number</span>,&nbsp;<span data-darkreader-inline-color="">any</span>&gt;;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">interface</span>&nbsp;FullRequestParams&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;Omit&lt;AxiosRequestConfig,&nbsp;"data"&nbsp;|&nbsp;"params"&nbsp;|&nbsp;"url"&nbsp;|&nbsp;"responseType"&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;set&nbsp;parameter&nbsp;to&nbsp;`true`&nbsp;for&nbsp;call&nbsp;`securityWorker`&nbsp;for&nbsp;this&nbsp;request&nbsp;*/</span><br>&nbsp;&nbsp;secure?:&nbsp;<span data-darkreader-inline-color="">boolean</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;request&nbsp;path&nbsp;*/</span><br>&nbsp;&nbsp;path:&nbsp;<span data-darkreader-inline-color="">string</span>;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;content&nbsp;type&nbsp;of&nbsp;request&nbsp;body&nbsp;*/</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>?:&nbsp;ContentType;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;query&nbsp;params&nbsp;*/</span><br>&nbsp;&nbsp;query?:&nbsp;QueryParamsType;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;format&nbsp;of&nbsp;response&nbsp;(i.e.&nbsp;response.json()&nbsp;-&gt;&nbsp;format:&nbsp;"json")&nbsp;*/</span><br>&nbsp;&nbsp;format?:&nbsp;ResponseType;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;request&nbsp;body&nbsp;*/</span><br>&nbsp;&nbsp;body?:&nbsp;unknown;<br>}<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">type</span>&nbsp;RequestParams&nbsp;=&nbsp;Omit&lt;FullRequestParams,&nbsp;<span data-darkreader-inline-color="">"body"</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">"method"</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">"query"</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">"path"</span>&gt;;<br><br>...sth<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;httpRequest&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;HttpClient();<br>
```

-   common.ts
    

```
<span data-darkreader-inline-color="">//&nbsp;commion.ts</span><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;@tags&nbsp;通用接口<br>&nbsp;*&nbsp;@summary&nbsp;获取活动列表<br>&nbsp;*&nbsp;@request&nbsp;POST:/common/getActivityPageList<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;getActivityPageList&nbsp;=&nbsp;(request:&nbsp;CommonActivityPageRequest):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;IPageCommonActivityPageResponse&gt;&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;httpRequest({<br>&nbsp;&nbsp;&nbsp;&nbsp;url:&nbsp;<span data-darkreader-inline-color="">'/common/getActivityPageList'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;method:&nbsp;<span data-darkreader-inline-color="">'post'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;data:&nbsp;request,<br>&nbsp;&nbsp;});<br>};<br>
```

### route-docs.ejs

该模板是用于生成API接口文档的JSDoc注释的。它会解析Raw API规范数据,并生成符合JSDoc标准的注释文档。

主要逻辑如下:

1.  从Raw API规范数据中提取出描述信息,生成@description注释。
    
2.  提取tags、summary等信息,生成对应注释。
    
3.  生成@request注释,标注请求方法和路径。
    
4.  如果有响应信息,遍历生成@response注释,包含状态码、响应类型等信息。
    
5.  使用模板字符串拼接所有信息,组成完整的JSDoc注释块。
    
6.  返回包含description和lines(注释细节)两个字段的对象。
    

上方解析结果中的注释部分由该文件控制。

### api.ejs

用来生成API服务接口的TypeScript client代码的。通用与procedure-call.ejs一起使用，主要包含以下几个方面

1.  导入必要的类型,包括HttpClient、响应类型等。
    
2.  如果使用了数据合约(Data Contracts),导入生成的数据合约类型。
    
3.  遍历所有API路由,为每个路由生成一个方法,调用HttpClient发送请求。
    
4.  使用ejs模板引擎,渲染procedure-call模板,生成每个方法的具体代码。
    
5.  procedure-call模板会包含方法名、请求配置、响应类型解析等代码。
    
6.  最终生成的TypeScript代码可以直接用于前端调用后端API。
    
7.  只需要导入这个生成的模块,就可以轻松调用各个接口,不需要再手写重复的请求代码。
    

### procedure-call.ejs

api.ejs中所需的生成模板内容，它通过模板引擎,根据API路由配置自动生成发起请求的函数。主要功能包括:

1.  引入httpRequest方法,用于发起请求。
    
2.  根据路由配置,渲染方法签名、请求参数等。
    
3.  插入由其他模板生成的JSDoc注释,作为方法注释。
    
4.  构造httpRequest配置,包含方法、URL、查询参数、请求体等。
    
5.  根据响应类型,设置返回Promise的泛型类型。
    
6.  如果有安全性配置,生成安全验证参数。
    
7.  支持从请求参数中提取查询参数、路径参数等。
    
8.  设置请求体和响应体的内容类型/格式。
    
9.  支持测试环境配置不同的实例。
    

### axios-http-client.ejs

生成http客户端的模板。主要用途如下:

1.  定义了各种请求和响应相关的类型,如请求参数、响应格式等接口。
    
2.  实现了 HttpClient 类,封装了 axios 的实例,并定义了请求拦截、安全校验等逻辑。
    
3.  提供了请求方法 request,根据传入的请求参数,构造 axios 请求配置,发送请求。
    
4.  支持处理不同的请求数据格式,如 JSON、文本、FormData 等。
    
5.  支持响应格式化,和安全性校验。
    
6.  请求方法返回 Promise,并根据配置处理响应结果。
    
7.  默认导出一个 HttpClient 实例供外部使用。
    
8.  根据配置生成目标代码,开发者只需导入使用这个 HTTP 客户端即可,简化了HTTP请求逻辑的编码。
    

### http-client.ejs

生成http客户端的入口文件在此可在初始化时选择使用fetch or axios；

### route-type.ejs

生成接口的request和response类型，主要是通过definitions中的数据生成的。

1.  导入数据合约(Data Contracts)类型,如果配置了按模块分割数据合约的话。
    
2.  使用模块名生成接口命名空间,如UserApi。
    
3.  遍历所有模块下的路由配置。
    
4.  对每个路由,调用route-type.ejs模板,渲染接口类型定义。
    
5.  route-type.ejs模板会生成每个接口的类型签名,包含请求参数、响应类型等。
    
6.  最终会组织成一个命名空间,导出所有接口类型。
    
7.  开发者可以直接导入这个生成的类型模块,在代码中使用接口类型,带来良好的代码提示、检查等支持。
    
8.  不需要手写或者维护接口类型定义,可以通过接口定义直接生成。
    

## 初始化

此时的目录结构应该如下：

```
｜-&nbsp;templates<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;<span data-darkreader-inline-color="">base</span>&nbsp;<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;|&nbsp;-&nbsp;route-docs.ejs<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;api.ejs<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;procedure-call.ejs<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;axios-http-client.ejs<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;http-client.ejs<br>｜&nbsp;-&nbsp;|&nbsp;-&nbsp;route-type.ejs<br>｜&nbsp;-&nbsp;generator.js<br>
```

我们通常在generator进行初始化。具体配置参照官方文档

我的配置文件

```
<span data-darkreader-inline-color="">const</span>&nbsp;options&nbsp;=&nbsp;{<br>&nbsp;&nbsp;url:&nbsp;openApiUrl,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//openapi接口url</span><br>&nbsp;&nbsp;output:&nbsp;outputDir,&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//输出目录</span><br>&nbsp;&nbsp;templates:&nbsp;path.resolve(__dirname,&nbsp;<span data-darkreader-inline-color="">'templates'</span>),&nbsp;<span data-darkreader-inline-color="">//模板目录</span><br>&nbsp;&nbsp;modular:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;为客户端、数据类型和路由生成单独的文件</span><br>&nbsp;&nbsp;cleanOutput:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//清除输出目录</span><br>&nbsp;&nbsp;enumNamesAsValues:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;moduleNameFirstTag:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;generateUnionEnums:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;extractRequestBody:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;生成请求体类型</span><br>&nbsp;&nbsp;extractRequestParams:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//提取请求参数,将路径参数和查询参数合并到一个对象中</span><br>&nbsp;&nbsp;unwrapResponseData:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;从响应中展开数据项&nbsp;res&nbsp;或&nbsp;res.data</span><br>&nbsp;&nbsp;httpClientType:&nbsp;<span data-darkreader-inline-color="">'axios'</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;可选&nbsp;'fetch'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//http客户端类型</span><br>&nbsp;&nbsp;defaultResponseAsSuccess:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;generateClient:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//生成http客户端</span><br>&nbsp;&nbsp;generateRouteTypes:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//生成路由器类型</span><br>&nbsp;&nbsp;generateResponses:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//生成响应类型</span><br>&nbsp;&nbsp;defaultResponseType:&nbsp;<span data-darkreader-inline-color="">'void'</span>,<br>&nbsp;&nbsp;typePrefix:&nbsp;<span data-darkreader-inline-color="">''</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;类型前缀</span><br>&nbsp;&nbsp;typeSuffix:&nbsp;<span data-darkreader-inline-color="">''</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;类型后缀</span><br>&nbsp;&nbsp;enumKeyPrefix:&nbsp;<span data-darkreader-inline-color="">''</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;枚举key前缀</span><br>&nbsp;&nbsp;enumKeySuffix:&nbsp;<span data-darkreader-inline-color="">''</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;枚举key后缀</span><br>&nbsp;&nbsp;addReadonly:&nbsp;<span data-darkreader-inline-color="">false</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;设置只读</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">/**&nbsp;允许根据这些额外模板生成额外文件,请参阅下文&nbsp;*/</span><br>&nbsp;&nbsp;extraTemplates:&nbsp;[],<br>&nbsp;&nbsp;anotherArrayType:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;fixInvalidTypeNamePrefix:&nbsp;<span data-darkreader-inline-color="">'Type'</span>,&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//修复无效类型名称前缀</span><br>&nbsp;&nbsp;fixInvalidEnumKeyPrefix:&nbsp;<span data-darkreader-inline-color="">'Value'</span>,&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//修复无效枚举键前缀</span><br>&nbsp;&nbsp;hooks:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;onPrepareConfig:&nbsp;<span>(<span>currentConfiguration</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;currentConfiguration.config<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config.fileNames.httpClient&nbsp;=&nbsp;<span data-darkreader-inline-color="">'httpClient'</span>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//http客户端文件名</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;config.fileNames.dataContracts&nbsp;=&nbsp;<span data-darkreader-inline-color="">'types'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//类型文件名</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{...currentConfiguration,&nbsp;config}<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;onFormatRouteName:&nbsp;<span>(<span>routeInfo,&nbsp;templateRouteName</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(routeInfo.method&nbsp;===&nbsp;<span data-darkreader-inline-color="">'get'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">`Get<span data-darkreader-inline-color="">${lodash.upperFirst(routeInfo.moduleName)}</span>Request`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;templateRouteName;<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;onPreParseSchema:&nbsp;<span>(<span>originalSchema,&nbsp;typeName,&nbsp;schemaType</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(originalSchema.type&nbsp;===&nbsp;<span data-darkreader-inline-color="">'integer'</span>&nbsp;&amp;&amp;&nbsp;originalSchema.format&nbsp;===&nbsp;<span data-darkreader-inline-color="">'int64'</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;originalSchema.type&nbsp;=&nbsp;<span data-darkreader-inline-color="">'string'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;originalSchema.format&nbsp;=&nbsp;<span data-darkreader-inline-color="">'string'</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;}<br>};<br><br>generateApi(options)<br>
```

其中generateApi方法是官方提供的方法，用于生成api文件。该方法返回promise，可以在其生成后在进行其他额外的配置。

比如将首字母大写，将文件名改为index.ts等等。

```
generateApi(options).then(<span>(<span>{files,&nbsp;configuration}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;do&nbsp;something</span><br>})<br>
```

## 最后

我们只要在接口文档更新后，每次使用node执行generator.js文件即可每次更新。使用也只需要在需要的地方导入接口即可。

一个字真他妈爽！

## 注意

该插件已经投入生产环境使用，也遇到了一些问题。

对后端代码来说，注释规范要求极高。否则生成的接口文档会出现问题。

1.  vo类不能出现非英文字符，否则会报错。
    
2.  接口如果存在使用query接受动态参数也会容易出错，前端解析后会出现$字符导致解析失败。
    
3.  下载类接口返回流，无法生成responseType: 'blob',导致流解析失败。即使手动修改下载生成也会被覆盖。暂时解决 方案为约定末尾均为export字段在模板中加入。修改axios-http-client.ejs文件，在发起请求前加入。
    

> 作者：IAmor  
> 链接：https://juejin.cn/post/7295343805020274698  
> 来源：稀土掘金

欢迎关注「React」

号内回复

 "精选" ，将为您推送 历史精选文章"react" ，将为您推送 React.js 相关的学习资料 "学习指南" ，将为您推送 React-Native学习指南 "vue" ，将为您推送vue.js 相关文章 "小程序" ，将为您推送小程序相关文章 "微信小商店"，将为您推送小程序相关文章 "加群" ，添加群主好友拉你进群

加我私人微信，拉你进 React进阶、面试交流群，互相监督学习进步等！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

“在看和转发”就是最大的支持