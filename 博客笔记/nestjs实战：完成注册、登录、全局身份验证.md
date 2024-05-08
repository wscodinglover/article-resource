最近也是在学习nestjs这一块的内容，也是看到nestjs安全这一块内容，顺便就使用jwt去实现了一下注册、登录、用户密码加密和对后端接口做一个统一的权限处理，注册登录功能大家都很熟悉，而接口权限统一处理，也就是咱们平时开发时，除了登录注册等一些公共接口以外的接口，需要对token进行一个验证，验证不通过则返回401，通过才去返回正确的状态码和数据。下面是整体的一个流程，可能有点长，我会一步一步带大家去完成这些功能，并附上源码，希望大家耐心看完。

首先，咱们去创建一个nestjs项目,使用`nest new xxx`,我这里简单取名为auth，包管理工具我这里就用pnpm了，大家可以根据自己电脑上安装的包管理工具去选择,选择好回车一下去安装,安装时间可能有点长，大家耐心等待一下

![Image](https://mmbiz.qpic.cn/mmbiz_png/1W6by1JJ9TJe5LW0IOCG97EpoNsIq8HfwBEJpvedZPdia38yVUACCe3Xffcic0oqRAjRzqibG2uUYO2WqELPia2gSw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

1692408270852.jpg

安装完成后，使用`nest g res auth`去生成restful风格的auth模块，下面是具体操作

![Image](https://mmbiz.qpic.cn/mmbiz_png/1W6by1JJ9TJe5LW0IOCG97EpoNsIq8HfXsE3rapClNTXdeicHwTbB3iahswnIz9AxibZk6pPiaGKge6vdTF6NLZETA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

然后我们找到`auth.controllert.ts`和`auth.service.ts`文件，把这些方法先去除掉，移除完成后长下面这样

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

由于咱们要去注册用户，肯定是需要一张用户的表，接着咱们先去连接数据库，我这里使用mysql数据库，Nest提供了与现成的 TypeORM与 @nestjs/typeorm的紧密集成，我这里也是使用TypeORM，对于数据库的安装，网上也是有很多教程，我这里就不具体去讲了。咱们先去安装这三个包

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;install&nbsp;--save&nbsp;@nestjs/typeorm&nbsp;typeorm&nbsp;mysql2<br></code>
```

然后在`app.module.ts`文件去配置连接mysql

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Module&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AppController&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./app.controller'</span>;<br>import&nbsp;{&nbsp;AppService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./app.service'</span>;<br>import&nbsp;{&nbsp;AuthModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth/auth.module'</span>;<br>import&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br><br>@Module({<br>&nbsp;&nbsp;imports:&nbsp;[AuthModule,&nbsp;TypeOrmModule.forRoot({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'mysql'</span>,&nbsp;//&nbsp;数据库类型<br>&nbsp;&nbsp;&nbsp;&nbsp;host:&nbsp;<span data-darkreader-inline-color="">'localhost'</span>,&nbsp;//&nbsp;主机名<br>&nbsp;&nbsp;&nbsp;&nbsp;port:&nbsp;3306,&nbsp;//&nbsp;端口<br>&nbsp;&nbsp;&nbsp;&nbsp;username:&nbsp;<span data-darkreader-inline-color="">'root'</span>,&nbsp;//&nbsp;用户名<br>&nbsp;&nbsp;&nbsp;&nbsp;password:&nbsp;<span data-darkreader-inline-color="">'123456'</span>,&nbsp;//&nbsp;密码<br>&nbsp;&nbsp;&nbsp;&nbsp;database:&nbsp;<span data-darkreader-inline-color="">'nestjs'</span>,&nbsp;//&nbsp;数据库名称<br>&nbsp;&nbsp;&nbsp;&nbsp;synchronize:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;retryDelay:&nbsp;500,&nbsp;//重试连接数据库间隔<br>&nbsp;&nbsp;&nbsp;&nbsp;retryAttempts:&nbsp;10,//重试连接数据库的次数<br>&nbsp;&nbsp;&nbsp;&nbsp;autoLoadEntities:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//如果为<span data-darkreader-inline-color="">true</span>,将自动加载实体&nbsp;forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中<br>&nbsp;&nbsp;}),],<br>&nbsp;&nbsp;controllers:&nbsp;[AppController],<br>&nbsp;&nbsp;providers:&nbsp;[AppService],<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AppModule&nbsp;{&nbsp;}<br></code>
```

接着在`auth.entity.ts`文件中去写关于用户表的配置，我这里就做三个字段id,username,password

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Column,&nbsp;PrimaryGeneratedColumn&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"typeorm"</span>;<br><br>@Entity()<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;NV_Users&nbsp;{<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;id为主键并且自动递增<br>&nbsp;&nbsp;&nbsp;&nbsp;@PrimaryGeneratedColumn()<br>&nbsp;&nbsp;&nbsp;&nbsp;id:number<br><br>&nbsp;&nbsp;&nbsp;&nbsp;@Column()<br>&nbsp;&nbsp;&nbsp;&nbsp;username:string<br><br>&nbsp;&nbsp;&nbsp;&nbsp;@Column()<br>&nbsp;&nbsp;&nbsp;&nbsp;password:string<br>}<br><br></code>
```

然后使用`TypeOrmModule.forFeature()`方法注册该表，这样我们可以使用`@InjectRepository()`装饰器将`NV_UsersRepository`注入到`auth.service.ts`中。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Module&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AuthService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.service'</span>;<br>import&nbsp;{&nbsp;AuthController&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.controller'</span>;<br>import&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br><br><br>@Module({<br>&nbsp;&nbsp;imports:&nbsp;[TypeOrmModule.forFeature([NV_Users])],<br>&nbsp;&nbsp;controllers:&nbsp;[AuthController],<br>&nbsp;&nbsp;providers:&nbsp;[AuthService]<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthModule&nbsp;{&nbsp;}<br><br></code>
```

注入`NV_UsersRepository`到`auth.service.ts`中。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Injectable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;CreateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/create-auth.dto'</span>;<br>import&nbsp;{&nbsp;UpdateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/update-auth.dto'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br>import&nbsp;{&nbsp;Repository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'typeorm'</span>;<br>import&nbsp;{&nbsp;InjectRepository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br><br><br>@Injectable()<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthService&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;constructor(@InjectRepository(NV_Users)&nbsp;private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;user:Repository&lt;NV_Users&gt;){}<br>}<br><br></code>
```

接着在`auth.controller.ts`去写对应的方法，去调用`auth.service.ts`中对应的方法。下面是`auth.controller.ts`文件代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Controller,&nbsp;Post,&nbsp;Body&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AuthService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.service'</span>;<br>import&nbsp;{&nbsp;CreateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/create-auth.dto'</span>;<br><br>@Controller(<span data-darkreader-inline-color="">'auth'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthController&nbsp;{<br>&nbsp;&nbsp;constructor(private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;authService:&nbsp;AuthService)&nbsp;{&nbsp;}<br><br><br>&nbsp;&nbsp;//&nbsp;注册<br>&nbsp;&nbsp;@Post(<span data-darkreader-inline-color="">"/signup"</span>)<br>&nbsp;&nbsp;signup(@Body()&nbsp;signupData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;this.authService.signup(signupData)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;//&nbsp;登录<br>&nbsp;&nbsp;@Post(<span data-darkreader-inline-color="">"/login"</span>)<br>&nbsp;&nbsp;login(@Body()&nbsp;loginData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;this.authService.login(signupData)<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

写了这么多，咱们先跑起来(`pnpm run start:dev`)看看`nv_users`这张表有没有创建，我这里推荐大家去装一个vscode插件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

装了之后vscode左边会多一个这个东西

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)如果有`Navicat`这个软件也是可以的，下面我们看下我们创建的表：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)这里也是创建好了`Navicat`中长这样，也是非常的像。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

然后我们先简单写下`auth.service.ts`中的代码

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Injectable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;CreateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/create-auth.dto'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br>import&nbsp;{&nbsp;Repository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'typeorm'</span>;<br>import&nbsp;{&nbsp;InjectRepository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br><br><br>@Injectable()<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthService&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;constructor(@InjectRepository(NV_Users)&nbsp;private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;user:&nbsp;Repository&lt;NV_Users&gt;)&nbsp;{&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;注册<br>&nbsp;&nbsp;&nbsp;&nbsp;signup(signupData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(signupData);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"注册成功"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;登录<br>&nbsp;&nbsp;&nbsp;&nbsp;login(loginData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(loginData);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"登录成功"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></code>
```

接着就是来测试下接口有没有问题，这里我使用`apifox`这个软件，当然其他接口测试软件也是可以的，比如postman等等。nestjs默认端口是3000，可以在main.ts去修改，我这里就使用默认的了,然后接口路径就是`auth.controller.ts`中拼接起来,比如我这里注册接口就是`/auth/signup`，其他同理。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

接口测试没问题，接着就是写业务代码了，写业务代码前需要安装几个包：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;i&nbsp;bcryptjs&nbsp;//&nbsp;这个是对用户密码进行加密的<br>pnpm&nbsp;i&nbsp;@nestjs/jwt&nbsp;//&nbsp;用于生成token<br></code>
```

其中也是用到了几个方法：`bcryptjs.hashSync()`方法是对用户密码进行加密用的，`hashSync()`方法第一个参数为用户密码，第二个为密码盐(简单理解为加密的程度)。`bcryptjs.compareSync()`方法是对用户的密码和加密后的密码进行比较的，如果正确返回true，错误则返回fasle,第一个参数为登录时用户输入的密码，第二个为查出来的加密后的密码。这里提一下，加密密码的方法是不可逆的，也就是没有解密的功能，这样做也是保证用户的安全。`JwtService.sign()`方法即生成token的方法，参数可传入我们想传入给前端的用户对象，这样前端可以把token拿去解密，拿到用户对象，切记不能将密码传入。

我们先新建一个关于token相关的配置文件`constants.ts`

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;jwtConstants&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;secret:&nbsp;<span data-darkreader-inline-color="">"leeKey"</span>,&nbsp;//&nbsp;密钥<br>&nbsp;&nbsp;&nbsp;&nbsp;expiresIn:&nbsp;<span data-darkreader-inline-color="">"60s"</span>&nbsp;//&nbsp;token有效时间&nbsp;&nbsp;<br>}<br></code>
```

接着在`auth.module.ts`中配置

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Module&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AuthService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.service'</span>;<br>import&nbsp;{&nbsp;AuthController&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.controller'</span>;<br>import&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br>import&nbsp;{&nbsp;JwtModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/jwt'</span>;<br>import&nbsp;{&nbsp;jwtConstants&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"./constants"</span><br><br><br>@Module({<br>&nbsp;&nbsp;imports:&nbsp;[TypeOrmModule.forFeature([NV_Users]),&nbsp;JwtModule.register({<br>&nbsp;&nbsp;&nbsp;&nbsp;secret:&nbsp;jwtConstants.secret,<br>&nbsp;&nbsp;&nbsp;&nbsp;signOptions:&nbsp;{&nbsp;expiresIn:&nbsp;jwtConstants.expiresIn&nbsp;}<br>&nbsp;&nbsp;})],<br>&nbsp;&nbsp;controllers:&nbsp;[AuthController],<br>&nbsp;&nbsp;providers:&nbsp;[AuthService]<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthModule&nbsp;{&nbsp;}<br><br></code>
```

登录注册我这里就一次性写完了，代码看下面👇

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;BadRequestException,&nbsp;Injectable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;CreateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/create-auth.dto'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br>import&nbsp;{&nbsp;Repository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'typeorm'</span>;<br>import&nbsp;{&nbsp;InjectRepository&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br>import&nbsp;*&nbsp;as&nbsp;bcryptjs&nbsp;from&nbsp;<span data-darkreader-inline-color="">"bcryptjs"</span><br>import&nbsp;{&nbsp;JwtService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/jwt"</span><br><br><br>@Injectable()<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthService&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;constructor(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@InjectRepository(NV_Users)&nbsp;private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;user:&nbsp;Repository&lt;NV_Users&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;JwtService:&nbsp;JwtService<br>&nbsp;&nbsp;&nbsp;&nbsp;)&nbsp;{&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;注册<br>&nbsp;&nbsp;&nbsp;&nbsp;async&nbsp;signup(signupData:&nbsp;CreateAuthDto)&nbsp;{<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;findUser&nbsp;=&nbsp;await&nbsp;this.user.findOne({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">where</span>:&nbsp;{&nbsp;username:&nbsp;signupData.username&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(findUser&nbsp;&amp;&amp;&nbsp;findUser.username&nbsp;===&nbsp;signupData.username)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"用户已存在"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;对密码进行加密处理<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signupData.password&nbsp;=&nbsp;bcryptjs.hashSync(signupData.password,&nbsp;10)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;this.user.save(signupData)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">"注册成功"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;登录<br>&nbsp;&nbsp;&nbsp;&nbsp;async&nbsp;login(loginData:&nbsp;CreateAuthDto)&nbsp;{<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;findUser&nbsp;=&nbsp;await&nbsp;this.user.findOne({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">where</span>:&nbsp;{&nbsp;username:&nbsp;loginData.username&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;没有找到<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!findUser)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;new&nbsp;BadRequestException(<span data-darkreader-inline-color="">"用户不存在"</span>)<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;找到了对比密码<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;compareRes:&nbsp;boolean&nbsp;=&nbsp;bcryptjs.compareSync(loginData.password,&nbsp;findUser.password)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;密码不正确<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(!compareRes)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;new&nbsp;BadRequestException(<span data-darkreader-inline-color="">"密码不正确"</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;payload&nbsp;=&nbsp;{&nbsp;username:&nbsp;findUser.username&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;access_token:&nbsp;this.JwtService.sign(payload),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;msg:&nbsp;<span data-darkreader-inline-color="">"登录成功"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></code>
```

接着我们注册两个用户试一试

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

也是没有问题,接着测试登录，也是正确返回token

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

以上是关于登录注册功能，下面我们来看看身份验证这一块的功能，如何完成。首先我们新建文件`/common/public.decorator.ts`,创建自定义装饰器

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;SetMetadata&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/common"</span>;<br><br><span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;IS_PUBLIC_KEY&nbsp;=&nbsp;<span data-darkreader-inline-color="">'isPublic'</span><br><span data-darkreader-inline-color="">export</span>&nbsp;const&nbsp;Public&nbsp;=&nbsp;()&nbsp;=&gt;&nbsp;SetMetadata(IS_PUBLIC_KEY,&nbsp;<span data-darkreader-inline-color="">true</span>);<br></code>
```

接着我们安装这几个包

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;install&nbsp;--save&nbsp;@nestjs/passport&nbsp;passport-jwt<br>pnpm&nbsp;install&nbsp;@types/passport-jwt&nbsp;--save-dev<br></code>
```

新建`jwt-auth.grard.ts`文件，用于全局守卫，将未携带token的接口进行拦截，代码👇

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;ExecutionContext,&nbsp;Injectable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/common"</span>;<br>import&nbsp;{&nbsp;AuthGuard&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/passport"</span><br>import&nbsp;{&nbsp;Reflector&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/core"</span>;<br>import&nbsp;{&nbsp;Observable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"rxjs"</span><br>import&nbsp;{&nbsp;IS_PUBLIC_KEY&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"src/common/public.decorator"</span>;<br><br><br>@Injectable()<br><br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;jwtAuth&nbsp;extends&nbsp;AuthGuard(<span data-darkreader-inline-color="">"jwt"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;constructor(private&nbsp;reflector:&nbsp;Reflector)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super()<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;canActivate(context:&nbsp;ExecutionContext):&nbsp;boolean&nbsp;|&nbsp;Promise&lt;boolean&gt;&nbsp;|&nbsp;Observable&lt;boolean&gt;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;isPublic&nbsp;=&nbsp;this.reflector.getAllAndOverride&lt;boolean&gt;(IS_PUBLIC_KEY,&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.getHandler(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.getClass()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(isPublic,&nbsp;<span data-darkreader-inline-color="">"isPublic"</span>);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(isPublic)&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;super.canActivate(context)<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

新建`jwt-auth.strategy.ts`,该文件为验证策略，也就是验证前端请求头中携带的token，代码👇

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Injectable&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/common"</span>;<br>import&nbsp;{&nbsp;PassportStrategy&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"@nestjs/passport"</span>;<br>import&nbsp;{&nbsp;ExtractJwt,&nbsp;Strategy&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"passport-jwt"</span>;<br>import&nbsp;{&nbsp;jwtConstants&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"./constants"</span>;<br><br><br><span data-darkreader-inline-color="">export</span>&nbsp;interface&nbsp;JwtPayload&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;username:&nbsp;string<br>}<br><br><br>@Injectable()<br>//&nbsp;验证请求头中的token<br><span data-darkreader-inline-color="">export</span>&nbsp;default&nbsp;class&nbsp;JwtAuthStrategy&nbsp;extends&nbsp;PassportStrategy(Strategy,&nbsp;<span data-darkreader-inline-color="">"jwt"</span>)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span><span data-darkreader-inline-color="">constructor</span></span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super({<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jwtFromRequest:&nbsp;ExtractJwt.fromAuthHeaderAsBearerToken(),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ignoreExpiration:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secretOrKey:&nbsp;jwtConstants.secret<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;async&nbsp;validate(payload:&nbsp;JwtPayload)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(payload.username);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;{&nbsp;username&nbsp;}&nbsp;=&nbsp;payload<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></code>
```

接着在`auth.module.ts`的`providers`中配置`JwtAuthStrategy`,代码👇

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Module&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AuthService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.service'</span>;<br>import&nbsp;{&nbsp;AuthController&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.controller'</span>;<br>import&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br>import&nbsp;{&nbsp;NV_Users&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./entities/auth.entity'</span>;<br>import&nbsp;{&nbsp;JwtModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/jwt'</span>;<br>import&nbsp;{&nbsp;jwtConstants&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"./constants"</span><br>import&nbsp;{&nbsp;JwtAuthStrategy&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">"./jwt-auth.strategy"</span><br><br><br>@Module({<br>&nbsp;&nbsp;imports:&nbsp;[TypeOrmModule.forFeature([NV_Users]),&nbsp;JwtModule.register({<br>&nbsp;&nbsp;&nbsp;&nbsp;secret:&nbsp;jwtConstants.secret,<br>&nbsp;&nbsp;&nbsp;&nbsp;signOptions:&nbsp;{&nbsp;expiresIn:&nbsp;jwtConstants.expiresIn&nbsp;}<br>&nbsp;&nbsp;})],<br>&nbsp;&nbsp;controllers:&nbsp;[AuthController],<br>&nbsp;&nbsp;providers:&nbsp;[AuthService,&nbsp;JwtAuthStrategy]<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthModule&nbsp;{&nbsp;}<br><br></code>
```

最后在`app.module.ts`将其注册为全局守卫

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Module&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AppController&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./app.controller'</span>;<br>import&nbsp;{&nbsp;AppService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./app.service'</span>;<br>import&nbsp;{&nbsp;AuthModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth/auth.module'</span>;<br>import&nbsp;{&nbsp;TypeOrmModule&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/typeorm'</span>;<br>import&nbsp;{&nbsp;APP_GUARD&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/core'</span>;<br>import&nbsp;{&nbsp;JwtAuthGuard&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth/jwt-auth.grard'</span>;<br><br>@Module({<br>&nbsp;&nbsp;imports:&nbsp;[AuthModule,&nbsp;TypeOrmModule.forRoot({<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">type</span>:&nbsp;<span data-darkreader-inline-color="">'mysql'</span>,&nbsp;//&nbsp;数据库类型<br>&nbsp;&nbsp;&nbsp;&nbsp;host:&nbsp;<span data-darkreader-inline-color="">'localhost'</span>,&nbsp;//&nbsp;主机名<br>&nbsp;&nbsp;&nbsp;&nbsp;port:&nbsp;3306,&nbsp;//&nbsp;端口<br>&nbsp;&nbsp;&nbsp;&nbsp;username:&nbsp;<span data-darkreader-inline-color="">'root'</span>,&nbsp;//&nbsp;用户名<br>&nbsp;&nbsp;&nbsp;&nbsp;password:&nbsp;<span data-darkreader-inline-color="">'123456'</span>,&nbsp;//&nbsp;密码<br>&nbsp;&nbsp;&nbsp;&nbsp;database:&nbsp;<span data-darkreader-inline-color="">'nestjs'</span>,&nbsp;//&nbsp;数据库名称<br>&nbsp;&nbsp;&nbsp;&nbsp;synchronize:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;retryDelay:&nbsp;500,&nbsp;//重试连接数据库间隔<br>&nbsp;&nbsp;&nbsp;&nbsp;retryAttempts:&nbsp;10,//重试连接数据库的次数<br>&nbsp;&nbsp;&nbsp;&nbsp;autoLoadEntities:&nbsp;<span data-darkreader-inline-color="">true</span>,&nbsp;//如果为<span data-darkreader-inline-color="">true</span>,将自动加载实体&nbsp;forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中<br>&nbsp;&nbsp;}),],<br>&nbsp;&nbsp;controllers:&nbsp;[AppController],<br>&nbsp;&nbsp;//&nbsp;注册为全局守卫<br>&nbsp;&nbsp;providers:&nbsp;[AppService,&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;provide:&nbsp;APP_GUARD,<br>&nbsp;&nbsp;&nbsp;&nbsp;useClass:&nbsp;JwtAuthGuard<br>&nbsp;&nbsp;}],<br>})<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AppModule&nbsp;{&nbsp;}<br><br></code>
```

以上配置完成后，再次请求注册接口,返回401，表示我们没有权限

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

然后我们给通用接口(注册和登录接口)都加上@Public装饰器后

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import&nbsp;{&nbsp;Controller,&nbsp;Post,&nbsp;Body&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'@nestjs/common'</span>;<br>import&nbsp;{&nbsp;AuthService&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./auth.service'</span>;<br>import&nbsp;{&nbsp;CreateAuthDto&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'./dto/create-auth.dto'</span>;<br>import&nbsp;{&nbsp;Public&nbsp;}&nbsp;from&nbsp;<span data-darkreader-inline-color="">'src/common/public.decorator'</span>;<br><br>@Controller(<span data-darkreader-inline-color="">'auth'</span>)<br><span data-darkreader-inline-color="">export</span>&nbsp;class&nbsp;AuthController&nbsp;{<br>&nbsp;&nbsp;constructor(private&nbsp;<span data-darkreader-inline-color="">readonly</span>&nbsp;authService:&nbsp;AuthService)&nbsp;{&nbsp;}<br><br><br>&nbsp;&nbsp;//&nbsp;注册<br>&nbsp;&nbsp;@Public()<br>&nbsp;&nbsp;@Post(<span data-darkreader-inline-color="">"/signup"</span>)<br>&nbsp;&nbsp;//&nbsp;@Public()<br>&nbsp;&nbsp;signup(@Body()&nbsp;signupData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;this.authService.signup(signupData)<br>&nbsp;&nbsp;}<br><br>&nbsp;&nbsp;//&nbsp;登录<br>&nbsp;&nbsp;@Public()<br>&nbsp;&nbsp;@Post(<span data-darkreader-inline-color="">"/login"</span>)<br>&nbsp;&nbsp;login(@Body()&nbsp;loginData:&nbsp;CreateAuthDto)&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;this.authService.login(loginData)<br>&nbsp;&nbsp;}<br>}<br><br></code>
```

再去请求，发现没有问题

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

源码地址<sup>[1]</sup>

以上就是关于全局身份验证的内容了，这样做之后，我们只需要给你通用接口加上@Pulic()装饰器即可，随后我们需要验证的接口就不用一个一个去加守卫了。以上就是本次文章的全部内容，创作不易，如有帮助，记得点赞收藏，感谢您的观看。

> ❝
> 
> 原文地址：https://juejin.cn/post/7268622342728695860
> 
> 原文作者: Leec
> 
> 本文来自掘金文章分享
> 
> ❞

## 最后

觉得本文有用的小伙伴，可以帮忙点个“在看”，让更多的朋友看到咱们的文章。

### Reference

\[1\]

https://gitee.com/xu-jile/nest-auth.git: https://link.juejin.cn?target=https%3A%2F%2Fgitee.com%2Fxu-jile%2Fnest-auth.git