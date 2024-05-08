## 大厂技术  高级前端  Node进阶  

大家好我是考拉🐨，这是 **Nest.js 实战系列第二篇**，我要用最真实的场景让你学会使用 Node 主流框架。  

先对最近催更的几个小伙伴，说一句 **sorry**，最近工作中 Node 后端内容做的不多，一直在做 低代码平台 相关，所以延迟了一些，不知道截图中这个小伙伴还关注我没，嘻嘻🐨，**你若还在便是铁粉无疑了！**  

![Image](https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwvT5KCrictkejA4GBwbkQNXTtTDytQtkRtRGqJUBIEVQvJcq6LvYNG0vFhvS1EuDz37rWZBf0yOjgw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

上一篇中 【[Nest.js入门之基本项目搭建](http://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247500758&idx=1&sn=5fe702af0f8238d9d7c3a0950349f56f&chksm=f992c507cee54c1167bb05e409ef3595b8538e1818cf0c1ac8efebaf3f295f604de81b725433&scene=21#wechat_redirect)】 带大家入门了`Nest.js`, 接下来在之前的代码上继续进行开发， 主要两个任务：实现用户的注册与登录。

在实现登录注册之前，需要先整理一下需求， 我们希望用户有两种方式可以登录进入网站来写文章， 一种是账号密码登录，另一种是微信扫码登录。文章内容大纲

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接着上章内容开始...

前面我们创建文件都是一个个创建的， 其实还有一个快速创建`Contoller`、`Service`、`Module`以及`DTO`文件的方式:

```
nest&nbsp;g&nbsp;resouce&nbsp;user<br>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这样我们就快速的创建了一个`REST API`的模块，里面简单的`CRUD`代码都已经实现了，哈哈，发现我们前面一章学习的一半的内容，可以一句命令就搞定~

## 用户注册

在注册功能中，当用户是通过用户名和密码进行注册，密码我们不能直接存明文在数据库中，所以采用`bcryptjs`实现加密， 然后再存入数据库。

实现注册之前，先了解一下加密方案`bcryptjs`,安装一下依赖包：

```
npm&nbsp;install&nbsp;bcryptjs<br>
```

`bcryptjs` 是nodejs中比较好的一款加盐(`salt`)加密的包, 我们处理密码加密、校验要使用到的两个方法：

```
<span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;加密处理&nbsp;-&nbsp;同步方法<br>&nbsp;*&nbsp;bcryptjs.hashSync(data,&nbsp;salt)<br>&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;data&nbsp;&nbsp;要加密的数据<br>&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;- slat &nbsp;用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">const</span>&nbsp;hashPassword&nbsp;=&nbsp;bcryptjs.hashSync(password,&nbsp;<span>10</span>)<br><br><br><span data-darkreader-inline-color="">/**<br>&nbsp;*&nbsp;校验&nbsp;-&nbsp;使用同步方法<br>&nbsp;*&nbsp;bcryptjs.compareSync(data,&nbsp;encrypted)<br>&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;data&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要比较的数据,&nbsp;使用登录时传递过来的密码<br>&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;encrypted&nbsp;&nbsp;&nbsp;要比较的数据,&nbsp;使用从数据库中查询出来的加密过的密码<br>&nbsp;*/</span><br><span data-darkreader-inline-color="">const</span>&nbsp;isOk&nbsp;=&nbsp;bcryptjs.compareSync(password,&nbsp;encryptPassword)<br>
```

接下来设计用户实体：

```
<span data-darkreader-inline-color="">//&nbsp;use/entities/user.entity.ts</span><br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Column,&nbsp;Entity,&nbsp;PrimaryGeneratedColumn&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'typeorm'</span>;<br><br><span data-darkreader-inline-color="">@Entity</span>(<span data-darkreader-inline-color="">'user'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;User&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@PrimaryGeneratedColumn</span>(<span data-darkreader-inline-color="">'uuid'</span>)<br>&nbsp;&nbsp;id:&nbsp;<span data-darkreader-inline-color="">number</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>({&nbsp;length:&nbsp;<span>100</span>&nbsp;})<br>&nbsp;&nbsp;username:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;<span data-darkreader-inline-color="">//&nbsp;用户名</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>({&nbsp;length:&nbsp;<span>100</span>&nbsp;})<br>&nbsp;&nbsp;nickname:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//昵称</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>()<br>&nbsp;&nbsp;password:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;密码</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>()<br>&nbsp;&nbsp;avatar:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//头像</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>()<br>&nbsp;&nbsp;email:&nbsp;<span data-darkreader-inline-color="">string</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>(<span data-darkreader-inline-color="">'simple-enum'</span>,&nbsp;{&nbsp;<span data-darkreader-inline-color="">enum</span>:&nbsp;[<span data-darkreader-inline-color="">'root'</span>,&nbsp;<span data-darkreader-inline-color="">'author'</span>,&nbsp;<span data-darkreader-inline-color="">'visitor'</span>]&nbsp;})<br>&nbsp;&nbsp;role:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;用户角色</span><br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'create_time'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'timestamp'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">default</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">'CURRENT_TIMESTAMP'</span>,<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;createTime:&nbsp;<span data-darkreader-inline-color="">Date</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Column</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;<span data-darkreader-inline-color="">'update_time'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'timestamp'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">default</span>:&nbsp;<span><span>()</span>&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">'CURRENT_TIMESTAMP'</span>,<br>&nbsp;&nbsp;})<br>&nbsp;&nbsp;updateTime:&nbsp;<span data-darkreader-inline-color="">Date</span>;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@BeforeInsert</span>()&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;encryptPwd()&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.password&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;bcrypt.hashSync(<span data-darkreader-inline-color="">this</span>.password);&nbsp;<br>&nbsp;&nbsp;}&nbsp;<br>}<br>
```

1.  在创建`User`实体, 使用`@PrimaryGeneratedColumn('uuid')`创建一个主列`id`，该值将使用`uuid`自动生成。`Uuid` 是一个独特的字符串;
    
2.  实现**字段名驼峰转下划线**命名, `createTime`和`updateTime`字段转为下划线命名方式存入数据库， 只需要在`@Column`装饰器中指定`name`属性；
    
3.  我们使用了装饰器`@BeforeInsert`来装饰`encryptPwd`方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
    
4.  给博客系统设置了三种角色`root`、`autor`和 `visitor`, `root`有所以权限，`author`有写文章权限，`visitor`只能阅读文章， 注册的用户默认是`visitor`,`root`权限的账号可以修改用户角色。
    

接下来实现注册用户的业务逻辑

### register 注册用户

实现`user.service.ts`逻辑：

```
<span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;User&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./entities/user.entity'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Injectable,&nbsp;HttpException,&nbsp;HttpStatus&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;InjectRepository&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;CreateUserDto&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./dto/create-user.dto'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Repository&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'typeorm'</span>;<br><br><span data-darkreader-inline-color="">@Injectable</span>()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;UserService&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@InjectRepository</span>(User)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;userRepository:&nbsp;Repository&lt;User&gt;,<br>&nbsp;&nbsp;</span>)&nbsp;{}<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;register(createUser:&nbsp;CreateUserDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;username&nbsp;}&nbsp;=&nbsp;createUser;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;existUser&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository.findOne({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where:&nbsp;{&nbsp;username&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>(existUser){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;HttpException(<span data-darkreader-inline-color="">"用户名已存在"</span>,&nbsp;HttpStatus.BAD_REQUEST)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;newUser&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository.create(createUser)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository.save(newUser);<br>&nbsp;&nbsp;}<br>}<br>
```

犹记当时，写向数据库插入数据时，没仔细看文档，直接调用了`create`，结果发现数据并没有插入数据库， 后来发现`save`方法才是执行插入数据。

```
<span data-darkreader-inline-color="">this</span>.userRepository.create(createUser)<br><span data-darkreader-inline-color="">//&nbsp;相当于</span><br><span data-darkreader-inline-color="">new</span>&nbsp;User(createUser)&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;只是创建了一个新的用户对象</span><br>
```

到这里就实现了注册用户的业务逻辑， `Controller`比较简单, 后面登录等业务实现，不再一一呈现`Controller`代码：

```
<span data-darkreader-inline-color="">//&nbsp;user.controller.ts</span><br>&nbsp;<span data-darkreader-inline-color="">@ApiOperation</span>({&nbsp;summary:&nbsp;<span data-darkreader-inline-color="">'注册用户'</span>&nbsp;})<br>&nbsp;<span data-darkreader-inline-color="">@ApiResponse</span>({&nbsp;status:&nbsp;<span>201</span>,&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;[User]&nbsp;})<br>&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'register'</span>)<br>&nbsp;register(<span data-darkreader-inline-color="">@Body</span>()&nbsp;createUser:&nbsp;CreateUserDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userService.register(createUser);<br>&nbsp;&nbsp;}<br>
```

执行上面代码， 返回的数据内容如下：

```
{<br>&nbsp;&nbsp;<span>"data"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"username"</span>:&nbsp;<span data-darkreader-inline-color="">"admin"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"password"</span>:&nbsp;<span data-darkreader-inline-color="">"$2a$10$vrgqi356K00XY6Q9wrSYyuBpOIVf2E.Vu6Eu.HQcUJP.hDTuclSEW"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"nickname"</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"avatar"</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"email"</span>:&nbsp;<span data-darkreader-inline-color="">null</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"id"</span>:&nbsp;<span data-darkreader-inline-color="">"5c240dcc-a9b1-4262-8212-d5ceb2815ef8"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"createTime"</span>:&nbsp;<span data-darkreader-inline-color="">"2021-11-16T03:00:16.000Z"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"updateTime"</span>:&nbsp;<span data-darkreader-inline-color="">"2021-11-16T03:00:16.000Z"</span><br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;<span>"code"</span>:&nbsp;<span>0</span>,<br>&nbsp;&nbsp;<span>"msg"</span>:&nbsp;<span data-darkreader-inline-color="">"请求成功"</span><br>}<br>
```

可以发现密码也被返回了，这个接口的风险不言而喻，如何处理呢？可以思考一下~

从两方面考虑， 一个是数据层面，从数据库就不返回`password`字段，另一种方式是在返回数据给用户时，处理数据，不返回给前端。我们分别看一下这两种方式：

**方法1**

TypeORM提供的列属性`select`，**进行查询时是否默认隐藏此列**。但是这只能用于查询时， 比如`save`方法的返回的数据就仍然会包含`password`。

```
<span data-darkreader-inline-color="">//&nbsp;user.entity.ts</span><br>&nbsp;<span data-darkreader-inline-color="">@Column</span>({&nbsp;select:&nbsp;<span data-darkreader-inline-color="">false</span>})&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;表示隐藏此列</span><br>&nbsp;password:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;密码</span><br>
```

使用这种方式，我们`user.service.ts`中的代码可以做如下修改：

```
<span data-darkreader-inline-color="">//&nbsp;user.service.ts</span><br>&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;register(createUser:&nbsp;CreateUserDto)&nbsp;{<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository.save(newUser);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository.findOne({where:{username}})<br>&nbsp;}<br>
```

**方法2**

使用`class-transformer`提供的`Exclude`来序列化，对返回的数据实现过滤掉`password`字段的效果。首先在`user.entity.ts`中使用`@Exclude`装饰：

```
<span data-darkreader-inline-color="">//&nbsp;user.entity.ts</span><br>...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;Exclude&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'class-transformer'</span>;<br><br><span data-darkreader-inline-color="">@Exclude</span>()<br><span data-darkreader-inline-color="">@Column</span>()&nbsp;<br>password:&nbsp;<span data-darkreader-inline-color="">string</span>;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;密码</span><br>
```

接着在对应请求的地方标记使用`ClassSerializerInterceptor`，此时，`POST /api/user/register`这个请求返回的数据中，就不会包含`password`这个字段。

```
&nbsp;&nbsp;<span data-darkreader-inline-color="">@UseInterceptors</span>(ClassSerializerInterceptor)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'register'</span>)<br>&nbsp;&nbsp;register(<span data-darkreader-inline-color="">@Body</span>()&nbsp;createUser:&nbsp;CreateUserDto)&nbsp;{...}<br>
```

此时可以不用像方法1那样，修改`user.service.ts`中的逻辑。如果你想让该`Controller`中所有的请求都不包含`password`字段， 那可以直接用`ClassSerializerInterceptor`标记类。

> 其实这两种方式结合使用也完全可以的。

## 用户登录

用户登录这块，前面也提到了打算使用两种方式，一种是本地身份验证（用户名&密码），另一种是使用微信扫码登录。先来看一下本地身份验证登录如何实现。

### passport.js

首先介绍有个专门做身份认证的Nodejs中间件：`Passport.js`,它功能单一，只能做登录验证，但非常强大，支持本地账号验证和第三方账号登录验证（OAuth和OpenID等），支持大多数Web网站和服务。

`passport`中最重要的概念是策略，`passport`模块本身不能做认证，所有的认证方法都以策略模式封装为插件，需要某种认证时将其添加到`package.json`即可, 这里我不会详细去讲`passport`实现原理这些， 如果感兴趣可以留言，我单独准备一篇文章来分享登录认证相关的一些内容(Nodejs不止可以用`passport`,还有其他不错的包)。

### local 本地认证

首先安装一下依赖包，前面说了`passport`本身不做认证， 所以我们至少要安装一个`passport`策略， 这里先实现本地身份验证，所以先安装`passport-local`:

```
npm&nbsp;install&nbsp;@nestjs/passport&nbsp;passport&nbsp;passport-local<br>npm&nbsp;install&nbsp;@types/passport&nbsp;@types/passport-local<br>
```

我们还安装了一个类型提示，因为`passport`是纯js的包，不装也不会影响程序运行，只是写的过程中没有代码提示。

创建一个`auth`模块，用于处理认证相关的代码，`Controller`、`service`等这些文件夹创建方式就不重复了。我们还需要创建一个`local.strategy.ts`文件来写本地验证策略代码：

```
<span data-darkreader-inline-color="">//&nbsp;local.strategy.ts</span><br>...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;compareSync&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'bcryptjs'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;PassportStrategy&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/passport'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;IStrategyOptions,&nbsp;Strategy&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'passport-local'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;User&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'src/user/entities/user.entity'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;LocalStorage&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;PassportStrategy(Strategy)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@InjectRepository</span>(User)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;readonly&nbsp;userRepository:&nbsp;Repository&lt;User&gt;,<br>&nbsp;&nbsp;</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usernameField:&nbsp;<span data-darkreader-inline-color="">'username'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;passwordField:&nbsp;<span data-darkreader-inline-color="">'password'</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;IStrategyOptions);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;validate(username:&nbsp;<span data-darkreader-inline-color="">string</span>,&nbsp;password:&nbsp;<span data-darkreader-inline-color="">string</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;user&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userRepository<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.createQueryBuilder(<span data-darkreader-inline-color="">'user'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.addSelect(<span data-darkreader-inline-color="">'user.password'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.where(<span data-darkreader-inline-color="">'user.username=:username'</span>,&nbsp;{&nbsp;username&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.getOne();<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!user)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;BadRequestException(<span data-darkreader-inline-color="">'用户名不正确！'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!compareSync(password,&nbsp;user.password))&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;BadRequestException(<span data-darkreader-inline-color="">'密码错误！'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;user;<br>&nbsp;&nbsp;}<br>}<br>
```

我们从上至下的分析一下代码实现：

-   首先定义了一个`LocalStorage`继承至`@nestjs/passport`提供的`PassportStrategy`类, 接受两个参数
    

-   第一个参数: Strategy，你要用的策略，这里是passport-local
    
-   第二个参数:是策略别名，上面是`passport-local`,默认就是`local`
    

-   接着调用`super`传递策略参数， 这里如果传入的就是`username`和`password`，可以不用写，使用默认的参数就是，比如我们是用邮箱进行验证，传入的参数是`email`, 那`usernameField`对应的value就是`email`。
    
-   `validate`是`LocalStrategy`的内置方法， 主要实现了用户查询以及密码对比，因为存的密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码。
    

-   这里还有一个注意点， 通过`addSelect`添加`password`查询， 否则无法做密码对比。
    

有了这个策略，我们现在就可以实现一个简单的 `/auth/login` 路由，并应用`Nest.js`内置的守卫`AuthGuard`来进行验证。打开 `app.controller.ts` 文件，并将其内容替换为以下内容:

```
...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;AuthGuard&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/passport'</span>;<br><br><span data-darkreader-inline-color="">@ApiTags</span>(<span data-darkreader-inline-color="">'验证'</span>)<br><span data-darkreader-inline-color="">@Controller</span>(<span data-darkreader-inline-color="">'auth'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;AuthController&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@UseGuards</span>(AuthGuard(<span data-darkreader-inline-color="">'local'</span>))<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@UseInterceptors</span>(ClassSerializerInterceptor)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'login'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;login(<span data-darkreader-inline-color="">@Body</span>()&nbsp;user:&nbsp;LoginDto,&nbsp;<span data-darkreader-inline-color="">@Req</span>()&nbsp;req)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;req.user;<br>&nbsp;&nbsp;}<br>}<br>
```

同时不要忘记在`auth.module.ts`导入`PassportModule`和实体`User`，并且将`LocalStorage`注入，提供给其模块内共享使用。

```
<span data-darkreader-inline-color="">//&nbsp;auth.module.ts</span><br>...&nbsp;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;PassportModule&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/passport'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;User&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'src/user/entities/user.entity'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;LocalStorage&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./local.strategy'</span>;<br><br><span data-darkreader-inline-color="">@Module</span>({<br>&nbsp;&nbsp;imports:&nbsp;[TypeOrmModule.forFeature([User]),&nbsp;PassportModule],<br>&nbsp;&nbsp;controllers:&nbsp;[AuthController],<br>&nbsp;&nbsp;providers:&nbsp;[AuthService,&nbsp;LocalStorage],<br>})<br>
```

接口返回的数据如下，这是我们所需要的吗？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

开发中登录完，不是应该返回一个可以识别用户`token`这样的吗？

是的，客户端使用用户名和密码进行身份验证，服务器验证成功后应该签发一个身份标识的东西给客户端，这样以后客户端就拿着这个标识来证明自己的身份。而标识用户身份的方式有多种，这里我们采用`jwt`方式（关于身份认证可以看这篇文章 [前端鉴权必须了解的5种方式：cookie、session、token、jwt与单点登录](http://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247497640&idx=1&sn=edf914791045705aa0284869c8465e87&chksm=f992f179cee5786f03764b940489fe728274cf0ff3d6b728a330ba533ece21becff56bf2b4eb&scene=21#wechat_redirect)）。

### jwt 生成token

接着我们要实现的就是，验证成功后，生成一个`token`字符串返回去。而`jwt`是一种成熟的生成`token`字符串的方案，它生成的`token`内容是这种形式：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyZTZkNjRlLWU1YTAtNDhhYi05ZjU2LWMyMjY3ZjRkZGMyNyIsInVzZXJuYW1lIjoiYWRtaW4xIiwicm9sZSI6InZpc2l0b3IiLCJpYXQiOjE2Mzc1NjMzNjUsImV4cCI6MTYzNzU3Nzc2NX0.NZl4qLA2B4C9qsjMjaXmZoFUyNjt2FH4C-zGSlviiXA<br>
```

这种东西怎么生成的呢？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)通过上图可以看出`JWT token`由三个部分组成，头部（header）、有效载荷（payload）、签名（signature）。实践一下

```
npm&nbsp;install&nbsp;@nestjs/jwt<br>
```

首先注册一下`JwtModule`, 在`auth.module.ts`中实现：

```
...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;JwtModule&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/jwt'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;jwtModule&nbsp;=&nbsp;JwtModule.register({<br>&nbsp;&nbsp;&nbsp;&nbsp;secret:<span data-darkreader-inline-color="">"test123456"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;signOptions:&nbsp;{&nbsp;expiresIn:&nbsp;<span data-darkreader-inline-color="">'4h'</span>&nbsp;},<br>})<br><br><span data-darkreader-inline-color="">@Module</span>({<br>&nbsp;&nbsp;imports:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;jwtModule,<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;exports:&nbsp;[jwtModule],<br>})<br>
```

上面代码中，是通过将`secret`写死在代码中实现的，这种方案实际开发中是不推荐的，`secret`这种私密的配置，应该像数据库配置那样，从环境变量中获取，不然`secret`泄露了，别人一样可以生成相应的的`token`，随意获取你的数据, 我们采用下面这种异步获取方式：

```
...<br><span data-darkreader-inline-color="">const</span>&nbsp;jwtModule&nbsp;=&nbsp;JwtModule.registerAsync({<br>&nbsp;&nbsp;inject:&nbsp;[ConfigService],<br>&nbsp;&nbsp;useFactory:&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;(configService:&nbsp;ConfigService)&nbsp;=&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secret:&nbsp;configService.get(<span data-darkreader-inline-color="">'SECRET'</span>,&nbsp;<span data-darkreader-inline-color="">'test123456'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signOptions:&nbsp;{&nbsp;expiresIn:&nbsp;<span data-darkreader-inline-color="">'4h'</span>&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;},<br>});<br>...<br>
```

注意不要忘记在`.env`文件中设置`SECRET`配置信息。

最后我们在`auth.service.ts`中实现业务逻辑：

```
<span data-darkreader-inline-color="">//auth.service.ts</span><br>...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;JwtService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/jwt'</span>;<br><br><span data-darkreader-inline-color="">@Injectable</span>()<br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;AuthService&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;jwtService:&nbsp;JwtService,<br>&nbsp;&nbsp;</span>)&nbsp;{}<br><br>&nbsp;<span data-darkreader-inline-color="">//&nbsp;生成token</span><br>&nbsp;&nbsp;createToken(user:&nbsp;Partial&lt;User&gt;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.jwtService.sign(user);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;login(user:&nbsp;Partial&lt;User&gt;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;token&nbsp;=&nbsp;<span data-darkreader-inline-color="">this</span>.createToken({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;user.id,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username:&nbsp;user.username,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;role:&nbsp;user.role,<br>&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{&nbsp;token&nbsp;};<br>&nbsp;&nbsp;}<br>}<br>
```

到目前为止， 我们已经通过`passport-local`结合`jwt`实现了给用户返回一个`token`, 接下来就是用户携带`token`请求数据时，我们要验证携带的`token`是否正确，比如获取用户信息接口。

如果对 jwt 内容感觉看的不过瘾，可以看下我之前写的这篇 jwt 完整讲解。    [搞懂 JWT 这个知识点](http://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247486975&idx=2&sn=389712285083ace9afa020201bbc215f&chksm=f9910b2ecee682383d13b8b1aabd9e4554a709912c7eb03bed063de2cf104d10abf9e146ef00&scene=21#wechat_redirect)

### 获取用户信息接口实现

实现`token`认证,`passport`也给我们提供了对应的`passport-jwt`策略，实现起来也是非常的方便，废话不多，直接Q代码：

首先安装：

```
npm&nbsp;install&nbsp;passport-jwt&nbsp;@types/passport-jwt<br>
```

其实`jwt` 策略主要实现分两步

-   第一步: 如何取出`token`
    
-   第二步: 根据`token`拿到用户信息
    

我们看一下实现：

```
<span data-darkreader-inline-color="">//jwt.strategy.ts</span><br>...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;ConfigService&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/config'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;UnauthorizedException&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;PassportStrategy&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'@nestjs/passport'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;StrategyOptions,&nbsp;Strategy,&nbsp;ExtractJwt&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'passport-jwt'</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;<span data-darkreader-inline-color="">class</span>&nbsp;JwtStorage&nbsp;<span data-darkreader-inline-color="">extends</span>&nbsp;PassportStrategy(Strategy)&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">@InjectRepository</span>(User)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;readonly&nbsp;userRepository:&nbsp;Repository&lt;User&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;readonly&nbsp;configService:&nbsp;ConfigService,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;readonly&nbsp;authService:&nbsp;AuthService,<br>&nbsp;&nbsp;</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">super</span>({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jwtFromRequest:&nbsp;ExtractJwt.fromAuthHeaderAsBearerToken(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secretOrKey:&nbsp;configService.get(<span data-darkreader-inline-color="">'SECRET'</span>),<br>&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<span data-darkreader-inline-color="">as</span>&nbsp;StrategyOptions);<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;validate(user:&nbsp;User)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;existUser&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.authService.getUser(user);<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!existUser)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;UnauthorizedException(<span data-darkreader-inline-color="">'token不正确'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;existUser;<br>&nbsp;&nbsp;}<br>}<br>
```

在上面策略中的`ExtractJwt`提供多种方式从请求中提取`JWT`，常见的方式有以下几种：

-   fromHeader：在Http 请求头中查找`JWT`
    
-   fromBodyField: 在请求的`Body`字段中查找`JWT`
    
-   fromAuthHeaderAsBearerToken：在授权标头带有`Bearer`方案中查找`JWT`我们采用的是`fromAuthHeaderAsBearerToken`，后面请求操作演示中可以看到，发送的请求头中需要带上,这种方案也是现在很多后端比较青睐的：
    

```
<span data-darkreader-inline-color="">'Authorization:&nbsp;Bearer&nbsp;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQyZTZkNjRlLWU1YTAtNDhhYi05ZjU2LWMyMjY3ZjRkZGMyNyIsInVzZXJuYW1lIjoiYWRtaW4xIiwicm9sZSI6InZpc2l0b3IiLCJpYXQiOjE2Mzc1NzUxMzMsImV4cCI6MTYzNzU4OTUzM30._-v8V2YG8hZWpL1Jq3puxBlETeSuWg8DBEPCL2X-h5c'</span><br>
```

不要忘记在`auth.module.ts`中注入`JwtStorage`：

```
...<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;JwtStorage&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./jwt.strategy'</span>;<br><br><span data-darkreader-inline-color="">@Module</span>({<br>&nbsp;&nbsp;...<br>&nbsp;&nbsp;providers:&nbsp;[AuthService,&nbsp;LocalStorage,&nbsp;JwtStorage],<br>&nbsp;&nbsp;...<br>})<br>
```

最后只需要在`Controller`中使用绑定`jwt`授权守卫：

```
<span data-darkreader-inline-color="">//&nbsp;user.controller.ts</span><br><br><span data-darkreader-inline-color="">@ApiOperation</span>({&nbsp;summary:&nbsp;<span data-darkreader-inline-color="">'获取用户信息'</span>&nbsp;})<br><span data-darkreader-inline-color="">@ApiBearerAuth</span>()&nbsp;<span data-darkreader-inline-color="">//&nbsp;swagger文档设置token</span><br><span data-darkreader-inline-color="">@UseGuards</span>(AuthGuard(<span data-darkreader-inline-color="">'jwt'</span>))<br><span data-darkreader-inline-color="">@Get</span>()<br>getUserInfo(<span data-darkreader-inline-color="">@Req</span>()&nbsp;req)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;req.user;<br>}<br>
```

到这里获取用户信息接口就告一段落， 最后为了可以顺畅的使用`Swagger`来测试传递`bearer token`接口，需要添加一个`addBearerAuth`:

```
<span data-darkreader-inline-color="">//&nbsp;main.ts</span><br>...<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;config&nbsp;=&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;DocumentBuilder()<br>&nbsp;&nbsp;&nbsp;&nbsp;.setTitle(<span data-darkreader-inline-color="">'管理后台'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;.setDescription(<span data-darkreader-inline-color="">'管理后台接口文档'</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;.addBearerAuth()<br>&nbsp;&nbsp;&nbsp;&nbsp;.build();<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;<span data-darkreader-inline-color="">document</span>&nbsp;=&nbsp;SwaggerModule.createDocument(app,&nbsp;config);<br>&nbsp;&nbsp;SwaggerModule.setup(<span data-darkreader-inline-color="">'docs'</span>,&nbsp;app,&nbsp;<span data-darkreader-inline-color="">document</span>);<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;app.listen(<span>9080</span>);<br>&nbsp;&nbsp;...
```

## 微信扫码登录

到这里本地验证登录就完成了，通过上面的学习，关于登录这块的流程相信大家都已经掌握了， 接下来我再分享一下开发过程中我是如何实现微信扫码登录的。

> 注意：这块需要有微信开放平台的账号，如果没有也可以通过公众平台测试账号系统申请，具体流程这里就不说了。

### 需要准备什么

首先需要申请一个应用，拿到`AppID`和`AppSecret`

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

其次需要配置授权回到域名，也就是扫码成功后跳转的网站的域名。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

假如你设置的是`www.baidu.com`,那么`http://www.baidu.com/aaa?code=xxx`是可以成功的，但是扫码成功后你要跳转`http://lms.baidu.com/aaa?code=xxx`, 那就不行，会提示：redirect\_uri 参数错误。

准备好账号后，再看看我们要做的需求是什么样的。

### 扫码登录功能长什么样？

微信扫码登录时非常常见的需求，让用户使用微信登录第三方应用或者网站，一般就两种展现方式：

-   第一种：重定向到微信指定的扫码页面
    
-   第二种：将微信登录二维码内嵌到我们的网站页面中
    

这里采用的是第一种，直接重定向的方式，重定向后页面展示这样的：![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

用一张图来展示整个流程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)从图中可以看出微信登录需要网站页面，微信客户端，网站服务端和微信开放平台服务的参与，上面这些流程微信官方文档也有，就不详细的解释了。下面我们会以代码来实现一下， 后端分为以下四个步骤：

1.  获取授权登录二维码
    
2.  使用`code`换取微信接口调用凭证`access_token`
    
3.  使用`access_token`获取用户信息
    
4.  通过用户信息完成登录/注册，返回`token`给前端
    

### 代码实现

首先实现重定向到微信扫码登录页面，这部分可以前端来完成，也可以后端来进行重定向。如果后端来做重定向也是比较简单， 只需要使用`AppId`和`redirectUri`回调地址就能拼接出来，代码如下：

```
<span data-darkreader-inline-color="">//&nbsp;auth.controller.ts</span><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@ApiOperation</span>({&nbsp;summary:&nbsp;<span data-darkreader-inline-color="">'微信登录跳转'</span>&nbsp;})<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">@Get</span>(<span data-darkreader-inline-color="">'wechatLogin'</span>)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;wechatLogin(<span data-darkreader-inline-color="">@Headers</span>()&nbsp;header,&nbsp;<span data-darkreader-inline-color="">@Res</span>()&nbsp;res)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;APPID&nbsp;=&nbsp;process.env.APPID;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;redirectUri&nbsp;=&nbsp;urlencode(<span data-darkreader-inline-color="">'http://lms.siyuanren.com/web/login_front.html'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;res.redirect(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`https://open.weixin.qq.com/connect/qrconnect?appid=<span>${APPID}</span>&amp;redirect_uri=<span>${header.refere}</span>&amp;response_type=code&amp;scope=snsapi_login&amp;state=STATE#wechat_redirect`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;}<br>
```

通过微信客户端扫码登录后，会重定向`redirect_uri`传递的地址，并且带上`code`参数的，此时前端将`code`传给后端， 后端就可以完成接下来的`2,3,4`步骤了。

在`auth.controller.ts`中继续写微信登录接口：

```
<span data-darkreader-inline-color="">//auth.controller.ts</span><br>&nbsp;<span data-darkreader-inline-color="">@ApiOperation</span>({&nbsp;summary:&nbsp;<span data-darkreader-inline-color="">'微信登录'</span>&nbsp;})<br>&nbsp;<span data-darkreader-inline-color="">@ApiBody</span>({&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;WechatLoginDto,&nbsp;required:&nbsp;<span data-darkreader-inline-color="">true</span>&nbsp;})<br>&nbsp;<span data-darkreader-inline-color="">@Post</span>(<span data-darkreader-inline-color="">'wechat'</span>)<br>&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;loginWithWechat(<span data-darkreader-inline-color="">@Body</span>(<span data-darkreader-inline-color="">'code'</span>)&nbsp;code:&nbsp;<span data-darkreader-inline-color="">string</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.authService.loginWithWechat(code);<br>&nbsp;}<br>
```

接着在`auth.service.ts`中实现获取`access_token`具体的逻辑：

```
<span data-darkreader-inline-color="">//&nbsp;auth.service.ts</span><br>...<br><span data-darkreader-inline-color="">import</span>&nbsp;{AccessTokenInfo,&nbsp;AccessConfig,&nbsp;WechatError,&nbsp;WechatUserInfo}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'./auth.interface'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;lastValueFrom&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'rxjs'</span>;<br><span data-darkreader-inline-color="">import</span>&nbsp;{&nbsp;AxiosResponse&nbsp;}&nbsp;<span data-darkreader-inline-color="">from</span>&nbsp;<span data-darkreader-inline-color="">'axios'</span>;<br><br>&nbsp;&nbsp;<span data-darkreader-inline-color="">constructor</span>(<span><br>&nbsp;&nbsp;&nbsp;&nbsp;...<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;userService:&nbsp;UserService,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">private</span>&nbsp;httpService:&nbsp;HttpService,<br>&nbsp;&nbsp;</span>)&nbsp;{}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取access_token</span><br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">async</span>&nbsp;getAccessToken(code)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;{&nbsp;APPID,&nbsp;APPSECRET&nbsp;}&nbsp;=&nbsp;process.env;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!APPSECRET)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;BadRequestException(<span data-darkreader-inline-color="">'[getAccessToken]必须有appSecret'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!<span data-darkreader-inline-color="">this</span>.accessTokenInfo&nbsp;||<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span data-darkreader-inline-color="">this</span>.accessTokenInfo&nbsp;&amp;&amp;&nbsp;<span data-darkreader-inline-color="">this</span>.isExpires(<span data-darkreader-inline-color="">this</span>.accessTokenInfo))<br>&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;使用httpService请求accessToken数据</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;res:&nbsp;AxiosResponse&lt;WechatError&nbsp;&amp;&nbsp;AccessConfig,&nbsp;<span data-darkreader-inline-color="">any</span>&gt;&nbsp;=<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;lastValueFrom(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.httpService.get(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`<span>${<span data-darkreader-inline-color="">this</span>.apiServer}</span>/sns/oauth2/access_token?appid=<span>${APPID}</span>&amp;secret=<span>${APPSECRET}</span>&amp;code=<span>${code}</span>&amp;grant_type=authorization_code`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(res.data.errcode)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;BadRequestException(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">`[getAccessToken]&nbsp;errcode:<span>${res.data.errcode}</span>,&nbsp;errmsg:<span>${res.data.errmsg}</span>`</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">this</span>.accessTokenInfo&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accessToken:&nbsp;res.data.access_token,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expiresIn:&nbsp;res.data.expires_in,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getTime:&nbsp;<span data-darkreader-inline-color="">Date</span>.now(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;openid:&nbsp;res.data.openid,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.accessTokenInfo.accessToken;<br>&nbsp;&nbsp;}<br>
```

获取到`access_token`, 其实这个接口中除了`access_token`还有几个参数，我们也是需要使用到的,这里简单说明一下：

| 参数 | 版本 |
| --- | --- |
| access\_token | 接口调用凭证 |
| expires\_in | access\_token 接口调用凭证超时时间，单位（秒） |
| refresh\_token | 用户刷新 access\_token |
| openid | 授权用户唯一标识 |
| scope | 用户授权的作用域，使用逗号（,）分隔 |

`openid`就是我们对于微信注册的用户的唯一标识， 那么此时就可以去数据库中查找用户是否存在，如果不存在就注册一个新用户：

```
<span data-darkreader-inline-color="">//&nbsp;auth.service.ts</span><br><span data-darkreader-inline-color="">async</span>&nbsp;loginWithWechat(code)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!code)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">throw</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;BadRequestException(<span data-darkreader-inline-color="">'请输入微信授权码'</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.getAccessToken(code);<br><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;查找用户是否存在</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;user&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.getUserByOpenid();<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!user)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;获取微信用户信息，注册新用户</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">const</span>&nbsp;userInfo:&nbsp;WechatUserInfo&nbsp;=&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.getUserInfo();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userService.registerByWechat(userInfo);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">this</span>.login(user);<br>}<br><br><span data-darkreader-inline-color="">async</span>&nbsp;getUserByOpenid()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">await</span>&nbsp;<span data-darkreader-inline-color="">this</span>.userService.findByOpenid(<span data-darkreader-inline-color="">this</span>.accessTokenInfo.openid);<br>}<br>
```

这里实现的代码比较长，就不全部展示，请求微信开放平台接口都类似，就省略了使用`access_token`获取用户信息，需要源码可以自行获取。

如果你有兴趣，可以将微信登录这块封装成一个模块，这样微信公众平台的请求就不用都混杂在`auth`模块中。

最后给大家演示一下成果：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

微信扫码登录实现起来还是比较简单的，登录注册这块文章介绍的比较详细，内容比较长，就单独一章吧，将完善文章模块以及上传文件功能放在下一篇文章中，希望对大家的学习能提供一点帮助。

## 总结

**项目实战 git 地址**：https://github.com/koala-coding/

文章实现了实现了注册、以及JWT本地认证登录和微信扫码登录，总体看起来可以， 实际上埋了两个坑。  

-   其一，本地认证登录的`token`没有设置过期时间，这样风险极大；
    
-   其二，微信扫码登录的`access_token`是都时效性的，如何实现在有效期内多次使用，而不是每次扫码都去获取`access_token`
    

这两个问题可以结合`Redis`来解决， 在后面`Redis`讲解中， 会针对这两个问题给出解决方案，小伙伴们可以先思考一下，我们下一篇见🐨。

参考文章：  

-   passport.js学习笔记