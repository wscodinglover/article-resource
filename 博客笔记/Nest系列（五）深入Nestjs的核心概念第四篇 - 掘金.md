开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第6天，[点击查看活动详情](https://juejin.cn/post/7167294154827890702 "https://juejin.cn/post/7167294154827890702")

系列文章目录：

[Nestjs系列（一）轻松搞定Nestjs用户名密码认证和Jwt的使用方法](https://juejin.cn/post/7171424088827625479 "https://juejin.cn/post/7171424088827625479")

[Nest系列（二）深入Nestjs的核心概念第一篇](https://juejin.cn/post/7171621691271938062 "https://juejin.cn/post/7171621691271938062")

[Nest系列（三）深入Nestjs的核心概念第二篇](https://juejin.cn/post/7171970153452666910 "https://juejin.cn/post/7171970153452666910")

[Nest系列（四）深入Nestjs的核心概念第三篇](https://juejin.cn/post/7172343322403405854 "https://juejin.cn/post/7172343322403405854")

接下来我们来看最后三个核心概念，Guards、Interceptors和Custom decorators，咱直接进入正题！

## 一、Guards

A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd51a71392a74fc08dab8ae87b427011~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

字面理解就是守卫，它最突出的作用就是用来做鉴权，就是来决定一个请求是否被处理及怎么处理，这依赖于一定的条件，比如权限、角色等等，它和用户权限挂钩。可能有的同志回想用中间件来处理，中间件对一般的要求还可以做到，但是对一些复杂需求，比如不同权限接下去要进行的操作是不一样的，我们使用中间件仅仅靠一个next函数是没法精确控制下一步往哪里走的。

Guards的执行顺序在所有的中间件之后，但是在任何的interceptor和pipe之前

### 1\. 基本示例代码

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; import { Observable } from 'rxjs'; @Injectable() export class AuthGuard implements CanActivate { canActivate( context: ExecutionContext, ): boolean | Promise<boolean> | Observable<boolean> { const request = context.switchToHttp().getRequest(); return validateRequest(request); } }
```

-   使用@Injectable装饰器，实现CanActivate接口
-   canActivate方法，重点关注context执行上下文对象，比较强大。
-   方法返回true继续执行，返回false拒绝该次请求

### 2\. Execution context

继承自ArgumentHost，详情见官网：[docs.nestjs.com/fundamental…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Ffundamentals%2Fexecution-context "https://docs.nestjs.com/fundamentals/execution-context")

Nest提供了很多实用的工具类来帮我们更轻松的编写应用，Execution context就是其一，后面单独开一篇来将ArgumentsHost和ExecutionContext。

### 3.基于Role的权限认证

这里主要讲一个东西就是@SetMetadata的使用，这是用来添加元数据的，我们想实现的功能大概如下：

在Controller或method-handler上加一个类似Roles('admin')装饰器，让只具有admin角色的用户能够访问和调用，如下表示只有admin权限的用户才有资格访问：

```less
@Post() @Roles('admin') async create(@Body() createCatDto: CreateCatDto) { this.catsService.create(createCatDto); }
```

如何做到这一点呢?先来个思路分析

我们在canActivate方法中需要做一下几个事情：

-   一是获取当前登录用户的role角色信息，这个可以通过contex拿到request，一般我们会在认证那一步就将user信息附加到request上，这样我们直接通过request.user即可拿到user信息，详见我的系列第一篇，主要就是将用户认证的[juejin.cn/post/717142…](https://juejin.cn/post/7171424088827625479 "https://juejin.cn/post/7171424088827625479")
-   二是要获取到@Roles()装饰器的参数信息，即标示了哪些用户角色可以访问，这就需要用到两个东西：①Roles装饰器需要自定义，通过对@SetMetadata进行一层包裹，对所装饰的Controller或method添加元数据；②Nest框架给我们提供的反射类，通过反射类拿到装饰器内的参数

具体做法如下：

自定义@Roles装饰器

```typescript
import { SetMetadata } from '@nestjs/common'; export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

构造一个Guard

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; @Injectable() export class RolesGuard implements CanActivate { constructor(private reflector: Reflector) {} canActivate(context: ExecutionContext): boolean { // 通过反射拿到，context.getHandler()拿到的是装饰的那个route handler // 而roles信息就放在Controller的元数据对象上 const roles = this.reflector.get<string[]>('roles', context.getHandler()); if (!roles) { return true; } const request = context.switchToHttp().getRequest(); // user在这里获取，其实在用户登录的时候会把用户信息都藏到token里，每次用户登录携带token // 应用在认证token的同时就把用户user信息附加到request中了，认证在这之前所以这里可以拿到 const user = request.user; return matchRoles(roles, user.roles); } }
```

对于鉴权后的一些操作，可以根据自己的业务逻辑需要进行定制，至此，Guard基本也讲完了。

## 二、Interceptors

An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6e1e9ce0fad4132abc21760b1bd3cef~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

拦截器！面向切面编程，具有以下能力：

-   在某个方法执行前后增加额外逻辑
-   修改一个方法返回的结果
-   修改一个方法抛出的错误
-   扩展一个方法的功能
-   根据某些特别的条件，重写一个方法，比如为了缓存目的

### 1\. 实现接口及方法参数解析

每一个拦截器都需要实现一个NestInterceptor接口，实现里面的intercept方法，接口定义如下：

```php
/** * Interface describing implementation of an interceptor. * * @see [Interceptors](https://docs.nestjs.com/interceptors) * * @publicApi */ export interface NestInterceptor<T = any, R = any> { /** * Method to implement a custom interceptor. * * @param context an `ExecutionContext` object providing methods to access the * route handler and class about to be invoked. * @param next a reference to the `CallHandler`, which provides access to an * `Observable` representing the response stream from the route handler. */ intercept(context: ExecutionContext, next: CallHandler<T>): Observable<R> | Promise<Observable<R>>; }
```

主要看需要实现的intercept方法，它有两个参数context和next

#### ①ExecutionContext

继承自ArgumentsHost，可以获取执行上下文，有自己的扩展，可以通过反射机制使用getClass()和getHandler()拿到class和method，详情

#### ②CallHandler

CallHandler是一个接口，实现了handle方法，接口如下：

```markdown
/** * Interface providing access to the response stream. * @see [Interceptors](https://docs.nestjs.com/interceptors) * @publicApi */ export interface CallHandler<T = any> { /** * Returns an `Observable` representing the response stream from the route * handler. */ handle(): Observable<T>; }
```

可以看出，该接口提供了访问Response流的能力，handle()函数的返回值就是response流，类型是一个Observable类型（Observable这是rxjs的内容了，后面有机会单独开一个rxjs的系列，这也是一个非常强大的库，在帮我们处理异步事件的时候用处很大，有兴趣的可移步官网提前学习：[rxjs.dev/guide/overv…](https://link.juejin.cn/?target=https%3A%2F%2Frxjs.dev%2Fguide%2Foverview "https://rxjs.dev/guide/overview")），你可以在合适的位置使用它来调用你的route handler，如果在intercept()方法的实现中没有调用过handle()方法，那么route handler将不会被执行。

**调用handle()方法前的处理逻辑相当与在route handler之前添加的逻辑，在handle()方法执行后的逻辑相当于在route handler之后添加的逻辑，实现了对route handler的拦截。**

### 2\. 简单示例

我们做一个日志相关的拦截器，实现的目的是route handler处理前记录时间并打印一段提示信息，处理之后打印另一段提示信息并记录route handler的执行时长

#### 构建拦截器

```typescript
@Injectable() export class LoggingInterceptor implements NestInterceptor { intercept( context: ExecutionContext, next: CallHandler<any>, ): Observable<any> | Promise<Observable<any>> { // 处理route handler前的逻辑 console.log('Before...'); const now = Date.now(); return next .handle().pipe( tap((value) => console.log(`After...${Date.now() - now}ms, return value: ${value}`), ), ); } }
```

#### 绑定拦截器

和pipes和guards一样，可以绑定到Controller层、method层以及全局作用域，下面绑定到method层面，使用@UseInterceptors拦截器

```less
@UseInterceptors(LoggingInterceptor) @Get('interceptor/test') testInterceptor() { return 'hello interceptor'; } }
```

测试结果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd4e37dbe8d46f392991b68006c7279~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**如果要绑定全局作用域，可以使用如下两种方式**

-   useGlobalInterceptors

```arduino
app.useGlobalInterceptors(new LoggingInterceptor());
```

-   依赖注入方式

```less
@Module({ providers: [ { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor, }, ], }) export class AppModule {}
```

**其实我们可以总结一下关于绑定的方式，我将在核心概念的最后一篇进行一个梳理，对所有涉及到的使用方式做一个总结，其实我个人比较推荐统一都使用注入的方式。**

### 3\. response结果转换

由上面可知，我们通过handle()方法拿到了响应流的Observable对象，进而可以对结果进行各种修改转换操作。但是有一点要注意：当route handler中接收 @Res装饰器装饰的参数时不能使用。经过我的测试，发现这么做会阻塞整个请求

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa868fe9ed064b44bf615c4775e3db01~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

做数据转换的拦截器很简单，只需要在pipe管道中进行map操作就行，可以参考官方的示例：

```kotlin
export interface Response<T> { data: T; } @Injectable() export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> { intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> { return next.handle().pipe(map(data => ({ data }))); } }
```

提示一下，intercept方法依然可以是同步也可以是异步

map操作可以做任意转换，如：

-   将值转换成一个对象
-   将null值转换默认的空字符串
-   对Exception的转换

具体的就不做演示了，这个大家应该很熟悉，和js中的map高阶函数一个道理

### 4\. 结果覆盖

说白了就是某些情况我们不在调用handle处理，为什么呢？可能有时候是多余的，比如结果已经在缓存中有，我们直接在缓存中提取就好了，不用做重复的处理，这可以大大提升性能和响应速度。伪代码逻辑大概如下：

```ini
const isCached = true; if (isCached) { return of(缓存中的数据); } return next.handle();
```

### 5\. 其它操作

我们可以充分利用rxjs的强大处理能力，实现更丰富的功能，官方举了一个例子，就是请求处理超时抛出错误的例子，可以参考一下代码，只截取了一部分，pipe中的操作是，超时5s就抛出异常取消该次请求

```scss
return next.handle().pipe( timeout(5000), catchError(err => { if (err instanceof TimeoutError) { return throwError(() => new RequestTimeoutException()); } return throwError(() => err); }), );
```

## 三、Custom decorators

装饰器这个概念对JavaScript来说感觉是一次小小的革新，非常好用，其实所谓的装饰器就是一个函数，@的写法是一个语法糖，它可以修饰类、方法、属性及参数，看一下es源码

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61f4971c974f40c49f7e9c82c664d1af~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

nest为我们内置了很多装饰器，各个层面的都有，我们定义类的时候用的最多的就是@Injectable了吧，哈哈，下面我们来自定义一些装饰器，非常好用！

### 1\. 参数级别装饰器

我们在一个系统登录认证后，token里的user信息都会被附加到request中，我们可以做一个参数装饰器直接获取当前请求携带的user，具体做法如下：

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common'; import { Request } from 'express'; export const UserDecorator = createParamDecorator( (data: unknown, ctx: ExecutionContext) => { const request = ctx.switchToHttp().getRequest<Request>(); return request.user; }, );
```

使用

```less
@Get('userDec/test') testUserDecorator(@UserDecorator() user) { console.log(user); return `hello ${user.username}`; }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b4d6ea782f340ca93a64ed019fc5548~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当然这个的前提是你request中得有user啊，这就涉及到认证相关的内容了，可以移步我的nestjs系列第一篇查看：[juejin.cn/post/717142…](https://juejin.cn/post/7171424088827625479 "https://juejin.cn/post/7171424088827625479")

### 2\. 给装饰器传参

给装饰器传参会放到factory方法的data域中，比如我们想给上面的User装饰器传一个属性名username直接获取用户的username，可以这么做：

```ini
export const UserDecorator = createParamDecorator( (data: string, ctx: ExecutionContext) => { const request = ctx.switchToHttp().getRequest<Request>(); const user = request.user; return data ? user?.[data] : user; }, );
```

```less
@Get('userDec/test') testUserDecorator(@UserDecorator('username') user) { console.log(user); // coderlj return `hello ${user}`; // hello coderlj }
```

### 3\. 结合pipes

可以对自定义的装饰器的参数进行校验，下面使用的是框架自带的ValidationPipe

```less
@Get() async findOne( @User(new ValidationPipe({ validateCustomDecorators: true })) user: UserEntity, ) { console.log(user); }
```

### 4\. 装饰器组合封装

有时候，我们对一个东西加的装饰器很多，看着代码非常复杂，可以进行抽取重构，将一些经常使用作用可以聚合的放在一起，最后实现用一个装饰器实现对好几个装饰器的封装，如下：

```javascript
import { applyDecorators } from '@nestjs/common'; export function Auth(...roles: Role[]) { return applyDecorators( SetMetadata('roles', roles), UseGuards(AuthGuard, RolesGuard), ApiBearerAuth(), ApiUnauthorizedResponse({ description: 'Unauthorized' }), ); }
```

使用的时候只需要用一个就行

```less
@Get('users') @Auth('admin') findAllUsers() {}
```

至此，所有核心概念已经讲完，下一节，我们将进行一次核心概念的总结！敬请期待...