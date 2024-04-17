我正在参加「掘金·启航计划」

## 什么是JWT 验证

JWT（JSON Web Token）是一种用于在网络应用中传输信息的开放标准（RFC 7519）。它是一种基于JSON的安全令牌，用于在不同系统之间传递声明（claims）。JWT通常用于身份验证和授权机制。

### JWT 组成

JWT由三个部分组成，它们通过点号（.）分隔：

1.  头部（Header）：描述令牌的元数据和签名算法。
2.  载荷（Payload）：包含声明信息，例如用户身份、权限等。
3.  签名（Signature）：用于验证令牌的完整性和真实性。

### JWT 验证流程

1.  接收到JWT后，首先将其拆分为头部、载荷和签名三个部分。
2.  验证签名：使用事先共享的密钥和签名算法对头部和载荷进行签名验证，确保令牌未被篡改。
3.  检查有效期：检查载荷中的声明，例如过期时间（exp）和生效时间（nbf），确保令牌在有效时间范围内。
4.  可选的其他验证：根据需要，可能还会验证其他声明，如发行者（iss）、受众（aud）等。

一旦JWT通过验证，可以信任其内容，并根据其中的声明执行相应的操作。常见的用途包括用户身份验证、授权访问资源和传递用户信息等。

需要注意的是，JWT的安全性依赖于密钥的保护和正确的实现。同时，由于JWT本身包含了用户信息，因此在传输过程中需要采取适当的安全措施，如使用HTTPS来保护通信。

## Nest JWT 实践

我们需要创建一个 `auth` 模块 和 一个 `user` 模块，还需要创建一个 `Guards` , 用来验证token是否通过放行。

### 创建 `auth`模块

通过指令快速创建一个 `auth` 模块。

```
<span data-line-num="1">nest g co auth </span>
<span data-line-num="2">nest g s auth </span>
<span data-line-num="3">nest g mo auth</span>
```

接着我们在 `controller` 中 写一个 验证签名的方法，然后调用 `service` 处理验证业务逻辑

`auth.controller`

```typescript
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'; import { AuthService } from './auth.service'; import { UserDto } from './dto/user.dto'; import { Public } from './public.auth'; @Controller('auth') export class AuthController { constructor(private authService: AuthService) {} @HttpCode(HttpStatus.OK) @Post('login') signIn(@Body() user:UserDto) { return this.authService.signIn(user.username, user.password); } }
```

`auth.service`

在`service` 中我们做的事情是，接收客户端发送过来的请求，处理签名验证。

1.  接收客户端发送的请求（用户名，密码）
2.  去数据库查询是否存在该用户，如果存在比对密码(示例中是伪代码)
3.  密码通过的话，配置 JWT 的 Payload ，声明信息，例如用户身份、权限等
4.  最终通过 `this.jwtService.signAsync(payload)` 异步生成token，返回给前端，客户端发起请求时，如果该请求需要 token 验证的，会验证 token 是否正确。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43b002da205e475b91e4eb36eb77ebaf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```typescript
import { Injectable , UnauthorizedException} from '@nestjs/common'; import { UserService } from 'src/user/user.service'; import { JwtService } from '@nestjs/jwt'; @Injectable() export class AuthService { constructor( private usersService: UserService, private jwtService: JwtService ) {} // 用来验证用户名和密码 async signIn(username: string, pass: string): Promise<any> { // 用来查找数据库是否存在该用户名 const user = await this.usersService.findOne(username); // 密码是否相等 if (user?.password !== pass) { throw new UnauthorizedException(); } // 结构数据库查出来的用户信息 const { password, ...result } = user; // TODO: Generate a JWT and return it here // instead of the user object const payload = { username: user.username, sub: user.userId }; return { access_token: await this.jwtService.signAsync(payload), }; return result; } }
```

`auth.module`

在 `module`中，我们需要 导入 `user.Module` 和 `jwt.module` 。

-   导入`user.Module` 的前提，在 `user` 模块需要导出 `service`, 这样可以达到依赖注入，我们在 auth 模块可以使用 user 模块的 service
-   导入 `jwt.module` 我们可以对jwt 进行配置密钥和过期时间等。

```php
imports:[UserModule, // 导入 jwt 模块，并对它进行配置，加入我的密钥，签名配置(过期时间等) JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: '9999999999s' }, }),] //导入用户模块，使用它的sercice
```

然后再在 `providers`注册一个全局守卫，这样每个路由都会走验证了，如果有的路由不需要验证，可加 一个装饰器即可（后面说）

如果默认情况下应保护绝大多数终结点，则可以将身份验证保护注册为[全局保护](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Fguards%23binding-guards "https://docs.nestjs.com/guards#binding-guards")，而不是在每个控制器顶部使用 @UseGuards() 装饰器，只需标记哪些路由应该是公共的。

```yaml
providers: [ { provide: APP_GUARD, useClass: AuthGuard, }, ],
```

Nest 将自动将 AuthGuard 绑定到所有端点

完整代码

```python
import { Module } from '@nestjs/common'; import { AuthService } from './auth.service'; import { AuthController } from './auth.controller'; import { UserModule } from 'src/user/user.module'; import { JwtModule } from '@nestjs/jwt'; import { jwtConstants } from './jwt.key'; import { APP_GUARD } from '@nestjs/core'; import { AuthGuard } from 'src/guard/auth.guard'; @Module({ providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard, },], controllers: [AuthController], imports:[UserModule, // 导入 jwt 模块，并对它进行配置，加入我的密钥，签名配置(过期时间等) JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: '9999999999s' }, }),] //导入用户模块，使用它的sercice }) export class AuthModule {}
```

### 创建一个守卫 Guard

#### 为什么创建 Guard

这样我们很好的可以控制哪些路由需要验证哪些路由不需要验证。

如果大部分路由都需要验证，则注册到全局即可。

#### 如何创建一个 Guard

我们可以通过 nest 指令 来快速创建一个 Guard

```bash
nest g gu guard/auth
```

每个守卫 必须实现 `CanActivate`类，必须实现一个canActivate()函数。此函数应该返回一个布尔值，指示是否允许当前请求。它可以同步或异步地返回响应(通过 Promise 或 Observable)。Nest使用返回值来控制下一个行为:

-   如果返回 true, 将处理用户调用。
-   如果返回 false, 则 Nest 将忽略当前处理的请求。

`canActivate()` 函数接收单个参数 `ExecutionContext` 实例。ExecutionContext 继承自 ArgumentsHost 。ArgumentsHost 是传递给原始处理程序的参数的包装器。

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'; import { Observable } from 'rxjs'; @Injectable() export class RoleGuard implements CanActivate { canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> { return true; } }
```

### 编写一个JWT 守卫验证

在这个JWT 守卫验证里，我们要做的事是：

1.  验证 token 是否通过

我们可以通过 `context.switchToHttp().getRequest()` 拿到客户端的信息，以及是否携带token， 然后进行验证

```typescript
// 通过 请求头拿到 token private extractTokenFromHeader(request: Request): string | undefined { const [type, token] = request.headers.authorization?.split(' ') ?? []; // return token return type === 'Bearer' ? token : undefined; } // 获取请求的内容 const request = context.switchToHttp().getRequest(); const token = this.extractTokenFromHeader(request); // token 不存在，则抛出异常 if (!token) { console.log("token 验证没有通过") throw new UnauthorizedException(); } try { // 生成token 通过 jwtService.verifyAsync const payload = await this.jwtService.verifyAsync( token, { secret: jwtConstants.secret } ); request['user'] = payload; } catch { throw new UnauthorizedException(); } console.log("token 验证通过啦 哈哈哈哈哈") //最后 放行，可以访问路由 return true;
```

2.  如果 是公开路由的路由话，直接放行，可以访问。

我们可以 通过 SetMetadata 装饰器工厂函数创建自定义装饰器

```javascript
import { SetMetadata } from '@nestjs/common'; export const IS_PUBLIC_KEY = 'isPublic'; export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

这样我就拥有了一个 `@Public` 装饰器，当 Controller 的方法挂载上它，那么请求就无需验证了。

在守卫中，我们 可以 通过 `this.reflector.getAllAndOverride` 拿到哪些路由不需要验证，可以直接访问路由。

```kotlin
constructor(private reflector: Reflector) {} const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ context.getHandler(), context.getClass(), ]); if (isPublic) { // 💡 See this condition return true; }
```

完整代码

```typescript
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'; import { JwtService } from '@nestjs/jwt'; import { Observable } from 'rxjs'; import { jwtConstants } from 'src/auth/jwt.key'; import { Request } from 'express'; import { IS_PUBLIC_KEY } from 'src/auth/public.auth'; import { Reflector } from '@nestjs/core'; @Injectable() export class AuthGuard implements CanActivate { // 实例化 jwtService constructor(private jwtService: JwtService, private reflector: Reflector) {} async canActivate( context: ExecutionContext, ): Promise<boolean> { const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ context.getHandler(), context.getClass(), ]); if (isPublic) { // 💡 See this condition return true; } // 获取请求的内容 const request = context.switchToHttp().getRequest(); console.log(request) console.log("===========") const token = this.extractTokenFromHeader(request); console.log(222222) console.log(token) console.log("===========") if (!token) { console.log("token 验证没有通过") throw new UnauthorizedException(); } try { // 生成token 通过 jwtService.verifyAsync const payload = await this.jwtService.verifyAsync( token, { secret: jwtConstants.secret } ); // 💡 We're assigning the payload to the request object here // so that we can access it in our route handlers // console.log(payload) request['user'] = payload; } catch { throw new UnauthorizedException(); } console.log("token 验证通过啦 哈哈哈哈哈") return true; } // 通过 请求头拿到 token private extractTokenFromHeader(request: Request): string | undefined { const [type, token] = request.headers.authorization?.split(' ') ?? []; // return token return type === 'Bearer' ? token : undefined; } }
```

### 验证是否成功

当我们给 `Controller` 或者 `Controller 的方法` 加了 `@Public`装饰器，那么访问时，路由是不需要验证的，因为我们在守卫中放行了。

```less
@Controller('auth') export class AuthController { constructor(private authService: AuthService) {} @HttpCode(HttpStatus.OK) @Public() //自定义的装饰器， 不需要token 验证 @Post('login') signIn(@Body() user:UserDto) { return this.authService.signIn(user.username, user.password); } }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4f0ef606a014fdd8539208fe213ded6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

它成功的返回了 token

当我们访问需要token 验证的路由时，如果没有携带token 的话，会没有权限访问接口

因为我们把守卫 挂载到全局了，不需要每个`Controller` 上挂载了

```less
@Controller('author') // @UseFilters(new LoggerFilterFilter()) export class AuthorController { constructor(private readonly authorService: AuthorService) {} @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.authorService.findOne(id) } }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5314d7cc1c704fd0a889e0354c52b3de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们传递token，它就可以成功请求了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15a0cb77b2b84cb18e0023dffdcd88da~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

最后，大功告成，开始CURD , Show Time !

### 参考文献

-   🔗官方文档： [docs.nestjs.com/security/au…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Fsecurity%2Fauthentication "https://docs.nestjs.com/security/authentication")