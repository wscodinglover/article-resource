## 前言

我司的技术基建在`Midway`之上，主要是面向中后台前后端一体化方案，大白话就是全栈应用解决方案，什么是`Midway`呢？

`Midway Serverless` 是用于构建 Node.js 云函数的 `Serverless` 框架。帮助您在云原生时代大幅降低维护成本，更专注于产品研发，而其专注于函数即服务，你只需要编写`JavaScript`函数就可以像编写`Java`接口一样的简单，并且提供了开箱即用的部署解决方案。

## 多编程范式

`Midway`支持面向对象与函数式两种编程范式，你可以根据实际研发的需要，选择不同的编程范式来开发应用。

从官网中搬移两种案例，相同的`hello midway`接口编写，是这样的：

#### 面向对象（OOP + Class + IoC）

面向对象写法，采用类+装饰器的形式，可能看起来有点陌生~

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//&nbsp;src/controller/home.ts&nbsp;&nbsp;</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;&nbsp;&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Context&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/koa'</span>;&nbsp;&nbsp;<br>&nbsp;&nbsp;<br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'/'</span>)&nbsp;&nbsp;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;HomeController&nbsp;{&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;ctx:&nbsp;Context&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">'/'</span>)&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;home()&nbsp;{&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">'Hello&nbsp;Midwayjs!'</span>,&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query:&nbsp;<span data-darkreader-inline-color="">this</span>.ctx.ip&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br>}<br></code>
```

#### 函数式（FP + Function + Hooks）

和`React`很相像的一种写法~

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;useContext&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/hooks'</span>&nbsp;&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Context&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/koa'</span>;&nbsp;&nbsp;<br>&nbsp;&nbsp;<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">default</span>&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;<span><span data-darkreader-inline-color="">function</span>&nbsp;<span data-darkreader-inline-color="">home</span>&nbsp;(<span></span>)&nbsp;</span>{&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;ctx&nbsp;=&nbsp;useContext&lt;Context&gt;()&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:&nbsp;<span data-darkreader-inline-color="">'Hello&nbsp;Midwayjs!'</span>,&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;query:&nbsp;ctx.ip&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br>}<br></code>
```

本文将以`OOP + Class + IoC`的形式来进行实践演示。

## 初始化构建项目

只需要两行命令，即可启动一个`Midway`项目，你可以理解为一个启动一个后端服务。

```
npm init midway<br>npm run dev<br>
```

在 `controller` 目录中，新建一个 `src/controller/weather.controller.ts` 文件，内容如下。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'/'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;WeatherController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里是装饰器，定义一个路由</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">'/weather'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getWeatherInfo():&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">string</span>&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;这里是&nbsp;http&nbsp;的返回，可以直接返回字符串，数字，JSON，Buffer&nbsp;等</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">'Hello&nbsp;Weather!'</span>;<br>&nbsp;&nbsp;}<br>}<br></code>
```

这样你就可以通过前端请求的形式获取到`/weather`接口了。

就像这样：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">fetch(<span data-darkreader-inline-color="">'http://127.0.0.1/weather'</span>).then(<span><span>res</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;res.json().then(<span><span>data</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(data);&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;Hello&nbsp;Weather</span><br>&nbsp;&nbsp;&nbsp;&nbsp;})<br>})<br></code>
```

对于`@Controller`你可以理解为一个后端项目通过一个控制器来启动一个个接口，在里面包含了许多模块的服务，如`user`类、`list`类、`upload`类等等，而`user`中可能包含注册、登录、注销；`upload`中可能包含上传、删除图片等等，所以你的接口看起来会像是这样的：

**controller.ts**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Post,&nbsp;Inject,&nbsp;Query,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;UserService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./service/user.service'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ListService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./service/list.service'</span>;<br><br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'/'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;CommonController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;ctx;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;UserService:&nbsp;UserService;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;ListService:&nbsp;ListService;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;UploadService:&nbsp;UploadService;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'/register'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;register(<span data-darkreader-inline-color="">@Query</span>(<span data-darkreader-inline-color="">'userId'</span>)&nbsp;userId:&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;<span data-darkreader-inline-color="">@Query</span>(<span data-darkreader-inline-color="">'password'</span>)&nbsp;password:&nbsp;<span data-darkreader-inline-color="">string</span>):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">boolean</span>&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.UserService.register({userId,&nbsp;password});<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">'/getUserInfo'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getUserInfo()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.UserService.getUserInfo();<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;List和Upload的接口...</span><br>}<br></code>
```

**user.service.ts**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Provide,&nbsp;Inject,&nbsp;Context&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><br><span data-darkreader-inline-color="">interface</span>&nbsp;UserInfo&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;userName:&nbsp;<span data-darkreader-inline-color="">string</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;<span data-darkreader-inline-color="">number</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;sex:&nbsp;<span data-darkreader-inline-color="">string</span>;<br>}<br><br><span data-darkreader-inline-color="">@Provide</span>()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UserService&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;ctx:&nbsp;Context;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;register(params):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">boolean</span>&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;注册逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span>;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getUserInfo():&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;UserInfo&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取用户信息逻辑</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userName:&nbsp;<span data-darkreader-inline-color="">'量子前端'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;<span data-darkreader-inline-color="">20</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sex:&nbsp;<span data-darkreader-inline-color="">'不详'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

看起来有没有感受到编写一个接口就像是写一个函数/类一样简单呢？并且`Midway`还提供了很多强大的功能，如中间件、组件、Http服务等等，接下来我们实践两个全栈场景，分别是图片上传和验证码，来具体感受一下。

## 案例

#### 图片上传

首先安装依赖包。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm i @midwayjs/upload@3 --save<br></code>
```

在`configuration.ts`中导入：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">@Configuration</span>({<br>&nbsp;&nbsp;imports:&nbsp;[upload],<br>&nbsp;&nbsp;importConfigs:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">default</span>:&nbsp;defaultConfig,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prod:&nbsp;prodConfig,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;conflictCheck:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>})<br></code>
```

接下来在控制器中声明并引用接口：

**controller.ts**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Post,&nbsp;Inject,&nbsp;Files&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;UploadService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./service/upload.service'</span>;<br><br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'/'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;CommonController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;UploadService:&nbsp;UploadService;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'/upload'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;upload(<span data-darkreader-inline-color="">@Files</span>()&nbsp;files):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">string</span>[]&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.UploadService.upload(files);<br>&nbsp;&nbsp;}<br>}<br></code>
```

**upload.service.ts**

官方有文件上传和流上传两种模式，这里以文件上传的方式将图片保存在`Midway`项目的`public`目录中。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Provide,&nbsp;Inject,&nbsp;Context&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;path&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'path'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;moment&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'moment'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;uuid&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'uuid'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;*&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;fs&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'fs'</span>;<br><br><span data-darkreader-inline-color="">@Provide</span>()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UploadService&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;ctx:&nbsp;Context;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;upload(files):&nbsp;<span data-darkreader-inline-color="">Promise</span>&lt;<span data-darkreader-inline-color="">string</span>[]&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fileDir&nbsp;=&nbsp;path.join(<span data-darkreader-inline-color="">this</span>.ctx.app.getBaseDir(),&nbsp;<span data-darkreader-inline-color="">'..'</span>,&nbsp;<span data-darkreader-inline-color="">'public'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;timeDir&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${moment().format(<span data-darkreader-inline-color="">'YYYY'</span>)}</span>/<span data-darkreader-inline-color="">${moment().format(<span data-darkreader-inline-color="">'MM-DD'</span>)}</span>`</span>;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;url&nbsp;=&nbsp;path.join(fileDir,&nbsp;timeDir);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fileList&nbsp;=&nbsp;[];<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!fs.existsSync(url))&nbsp;fs.mkdirSync(url,&nbsp;{&nbsp;recursive:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">for</span>&nbsp;(<span data-darkreader-inline-color="">let</span>&nbsp;i&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>;&nbsp;i&nbsp;&lt;&nbsp;files.length;&nbsp;i++)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;file&nbsp;=&nbsp;files[i];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;extname:&nbsp;<span data-darkreader-inline-color="">string</span>&nbsp;=&nbsp;path.extname(file.filename).toLowerCase();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;data&nbsp;=&nbsp;fs.readFileSync(file.data);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;fileName&nbsp;=&nbsp;uuid.v1();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;target&nbsp;=&nbsp;path.join(url,&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${fileName}</span><span data-darkreader-inline-color="">${extname}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fs.writeFileSync(target,&nbsp;data);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileList.push(<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${url}</span>/<span data-darkreader-inline-color="">${fileName}</span><span data-darkreader-inline-color="">${extname}</span>`</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;fileList;<br>&nbsp;&nbsp;}<br>}<br></code>
```

接下来我们简单写一个前端请求来测试。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;fileUpload&nbsp;=&nbsp;<span>(<span>e</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;formData&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;FormData();<br>&nbsp;&nbsp;&nbsp;&nbsp;formData.append(<span data-darkreader-inline-color="">'file'</span>,&nbsp;e.target.files[<span data-darkreader-inline-color="">0</span>]);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(e.target.files);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">360</span>,&nbsp;formData);<br>&nbsp;&nbsp;&nbsp;&nbsp;fetch(<span data-darkreader-inline-color="">'http://127.0.0.1:7002/upload'</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method:&nbsp;<span data-darkreader-inline-color="">'POST'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body:&nbsp;formData,<br>&nbsp;&nbsp;&nbsp;&nbsp;}).then(<span>(<span>res</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res.json().then(<span>(<span>data</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取到图片上传的fileList，回显在DOM中</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>}<br><br><span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;<span data-darkreader-inline-color="">type</span>=<span data-darkreader-inline-color="">"file"</span>&nbsp;onChange={fileUpload}&nbsp;/&gt;<br>)<br></code>
```

就这样一个简单基础版本的图片上传接口就写完啦~

#### 验证码校验

首先安装依赖包。

```
npm i @midwayjs/captcha@3 --save<br>
```

在`configuration.ts`中导入：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">@Configuration</span>({<br>&nbsp;&nbsp;imports:&nbsp;[captcha],<br>&nbsp;&nbsp;importConfigs:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">default</span>:&nbsp;defaultConfig,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prod:&nbsp;prodConfig,<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;conflictCheck:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>})<br></code>
```

然后我们声明两个接口，分别是`获取验证码`接口和`验证码校验`接口，这里以图形验证码为例：

**controller.ts**

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Controller,&nbsp;Post,&nbsp;Inject,&nbsp;Get&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/core'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;CaptchaService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@midwayjs/captcha'</span>;<br><br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'/'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;CommonController&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@Inject</span>()<br>&nbsp;&nbsp;&nbsp;&nbsp;CaptchaService:&nbsp;CaptchaService;<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">'/get-image-captcha'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getImageCaptcha()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;id,&nbsp;imageBase64&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.CaptchaService.image({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;<span data-darkreader-inline-color="">120</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;<span data-darkreader-inline-color="">40</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size:&nbsp;<span data-darkreader-inline-color="">6</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'number'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id,&nbsp;<span data-darkreader-inline-color="">//&nbsp;验证码&nbsp;id</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;imageBase64,&nbsp;<span data-darkreader-inline-color="">//&nbsp;验证码&nbsp;SVG&nbsp;图片的&nbsp;base64&nbsp;数据，可以直接放入前端的&nbsp;img&nbsp;标签内</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;验证验证码是否正确</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'/check-captcha'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getCaptcha()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;id,&nbsp;answer&nbsp;}&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.ctx.request.body;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;passed:&nbsp;<span data-darkreader-inline-color="">boolean</span>&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.CaptchaService.check(id,&nbsp;answer);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;passed;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

这里直接用官方的服务接口。

-   获取验证码接口直接返回给前端一个验证码图片id和图片base64地址；
    
-   校验验证码接口前端将验证的结果和获取验证码的id给后端来校验是否一致；
    

这里简单写一段`react`伪代码调试一下：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">const</span>&nbsp;openCheckCaptchaModal&nbsp;=&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取所有tab的商户数量，默认选中的tab不取，走列表</span><br>&nbsp;&nbsp;&nbsp;&nbsp;fetch(<span data-darkreader-inline-color="">'http://127.0.0.1:7002/get-image-captcha'</span>).then(<span>(<span>res</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res.json().then(<span>(<span>{&nbsp;id,&nbsp;imageBase64&nbsp;}</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modal.alert({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content:&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img&nbsp;src={imageBase64}&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Form&nbsp;form={form}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Form.Item&nbsp;name=<span data-darkreader-inline-color="">"captcha"</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Input&nbsp;placeholder=<span data-darkreader-inline-color="">"请输入验证码"</span>&nbsp;/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/Form.Item&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>Form&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick={<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modal.clear();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;openCheckCaptchaModal();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;换一张<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span data-darkreader-inline-color="">/span&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onConfirm:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;captcha&nbsp;=&nbsp;form.getFieldValue(<span data-darkreader-inline-color="">'captcha'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(captcha)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fetch(<span data-darkreader-inline-color="">'http://127.0.0.1:7002/check-captcha'</span>,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method:&nbsp;<span data-darkreader-inline-color="">'POST'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body:&nbsp;<span data-darkreader-inline-color="">JSON</span>.stringify({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer:&nbsp;captcha,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;headers:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">'Content-Type'</span>:&nbsp;<span data-darkreader-inline-color="">'application/json'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}).then(<span>(<span>res</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;res.json().then(<span>(<span>data</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(data)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;Message.success(<span data-darkreader-inline-color="">'验证成功'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;};<br><br><span data-darkreader-inline-color="">return</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span onClick={openCheckCaptchaModal}&gt;验证&lt;<span data-darkreader-inline-color="">/span&gt;<br>)<br></span></code>
```

前端效果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

获取验证码：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

校验：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

## 部署接口

部署接口很方便，在`Midway`项目中执行`npm run deploy`即可进入部署流程，需前置准备阿里云 or 其他服务器账号，阿里云首次部署需要`accountId`、`accountKey`、`accountSecret`。

具体文档在这里：

Midway接口部署方案

## 总结

如果你没有`Serverless`相关概念，通过本文了解`Midway`是一个快速入门认知到概念的方式，`Midway`的能力有很多，可以继续在官方文档中探索。