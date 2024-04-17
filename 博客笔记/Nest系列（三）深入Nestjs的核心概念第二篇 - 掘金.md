开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第4天，[点击查看活动详情](https://juejin.cn/post/7167294154827890702 "https://juejin.cn/post/7167294154827890702")

系列文章目录：

[Nestjs系列（一）轻松搞定Nestjs用户名密码认证和Jwt的使用方法](https://juejin.cn/post/7171424088827625479 "https://juejin.cn/post/7171424088827625479")

[Nest系列（二）深入Nestjs的核心概念第一篇](https://juejin.cn/post/7171621691271938062 "https://juejin.cn/post/7171621691271938062")

今天我们接着来学习后面的内容，今天主要看两个概念，即：

-   Middleware
-   ExceptionFilter

## 一、Middleware

Middleware is a function which is called **before** the route handler. Middleware functions have access to the [request](https://link.juejin.cn/?target=https%3A%2F%2Fexpressjs.com%2Fen%2F4x%2Fapi.html%23req "https://expressjs.com/en/4x/api.html#req") and [response](https://link.juejin.cn/?target=https%3A%2F%2Fexpressjs.com%2Fen%2F4x%2Fapi.html%23res "https://expressjs.com/en/4x/api.html#res") objects, and the next() middleware function in the application’s request-response cycle. The **next** middleware function is commonly denoted by a variable named next.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d15accfc9be34cf99a5fb542d4914792~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**中间件**，学过Express和Koa的同学，对中间件这个概念应该很熟悉了。看官方说明，中间件可以拿到Request、Response对象及next函数，其实nest默认和express的中间件是等效的

再来回忆一下中间件的功能特性：

-   可以执行任意的代码
-   对request和response对象进行改造
-   结束request-response循环
-   通过next()调用下一个中间件
-   如果当前中间件没有结束当前request-response循环，必须调用next()函数，否则请求会处于挂起状态，阻塞整个应用

构造中间件的方式有两种，一种是通过函数，一种是通过类，下面看类的方式

### 1\. 创建类中间件

需要使用@Injectable()装饰器，类需要实现NestMiddleware接口(里面实现use方法)

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'; import { Request, Response, NextFunction } from 'express'; @Injectable() export class LoggerMiddleware implements NestMiddleware { use(req: Request, res: Response, next: NextFunction) { console.log('Request...'); next(); } }
```

### 2\. 应用类中间件

我们知道@Module()装饰器内没有给middleware的配置，那么怎么办呢？这时候我们需要在module类中使用config进行加载，需要让module类实现NestModule接口，实现里面configure方法进行

```php
@Module({ imports: [], controllers: [], providers: [], }) export class AppModule implements NestModule { configure(consumer: MiddlewareConsumer): any { consumer.apply(LoggerMiddleware).forRoutes(''); } }
```

apply方法表名要加载的是哪个中间件，forRootes方法表名对哪个请求路径起作用，这个和app.use(路径, 中间件)如出一辙，这里还可以对forRoutes进行更详细的配置，传入一个对象针对特定的某一个请求，path可以使用正则匹配？、+、_、()等，使用fastify驱动的需要注意不能使用_，如下：

```php
export class AppModule implements NestModule { configure(consumer: MiddlewareConsumer) { consumer .apply(LoggerMiddleware) .forRoutes({ path: 'ab*cd', method: RequestMethod.GET }); } }
```

**注意，configure方法可以是异步的，如果里面有需要异步处理的操作，可以使用async/await来等待操作完成再往下进行**

```typescript
export class AppModule implements NestModule { async configure(consumer: MiddlewareConsumer) { await ... consumer .apply(LoggerMiddleware) .forRoutes({ path: 'cats', method: RequestMethod.GET }); } }
```

默认情况下Nestjs应用使用express驱动，会使用body-parser来解析response的数据，如果你想自定义的话，需要在NestFactory.create()时将bodyParser置为false

#### MiddlewareConsumer

-   实现链式调用
-   apply可以放置多个middleware
-   forRoutes可以使用单个string路径，多个string路径，RouteInfo对象，单个Controller，多个Controller

```scss
@Module({ imports: [], }) export class AppModule implements NestModule { configure(consumer: MiddlewareConsumer) { consumer .apply(LoggerMiddleware, xxxMiddleware,...) .forRoutes(CatsController,UserController,...); } }
```

-   exclude可以排除不使用中间件的路径

```php
consumer .apply(LoggerMiddleware) .exclude( { path: 'cats', method: RequestMethod.GET }, { path: 'cats', method: RequestMethod.POST }, 'cats/(.*)', ) .forRoutes(CatsController);
```

### 3\. 函数式中间件

```vbscript
import { Request, Response, NextFunction } from 'express'; export function logger(req: Request, res: Response, next: NextFunction) { console.log(`Request...`); next
```

使用

```scss
consumer .apply(logger) .forRoutes(CatsController);
```

如果你的中间件不需要依赖其它东西时，可以尽可能使用函数式中间件，较为简单

### 4\. 全局中间件

在main.ts中直接使用app.use(中间件)

如经常添加的解决跨域的中间件(下面还自定义了logger日志系统，后面抽空再单独出一篇关于日志的)

```scss
async function bootstrap() { // 使用自定义winston日志 const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: WinstonModule.createLogger({ instance: logInstance, }), }); // 跨域设置 app.use(cors()); await app.listen(7777); } bootstrap();
```

## 二、Exception filters

Nest comes with a built-in **exceptions layer** which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

nest内置了一个异常处理层，如果我们没有手动处理异常，所有的异常都会进到这里，系统将给出响应的提示信息。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a6de167abec43d7bb8c1be759105d64~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如果没有手动做处理，发生异常时，response返回给前端的信息将是如下形式：

```json
{ "statusCode": 500, "message": "Internal server error" }
```

### 1\. 抛出标准异常

nest内置了HttpException，可以直接抛出该异常

```typescript
@Get() async findAll() { throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); }
```

客户端请求的得到的结果如下：

```json
{ "statusCode": 403, "message": "Forbidden" }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3920f483b8d740f68e452918e2435dca~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

关于参数：

-   第1个参数是response，定义了返回给前端的response body，可以是一个字符串，也可以是一个对象
-   第2个参数是status，定义了HTTP的状态码，一般使用枚举来赋值，如HttpStatus.FORBIDDEN
-   第3个参数是可选的额外配置参数，提供一个cause属性，接收错误，在日志记录方面比较有用

```typescript
getHello(@Request() req) { throw new HttpException( { status: HttpStatus.EXPECTATION_FAILED, error: 'this is a error msg', custom: 'this is a custom res', }, HttpStatus.EXPECTATION_FAILED, { cause: new Error('实际的错误信息'), }, ); return req.user; }
```

请求返回值将变成：

```vbnet
{ status: HttpStatus.EXPECTATION_FAILED, error: 'this is a error msg', custom: 'this is a custom res', },
```

### 2\. 自定义异常

我们可以创建一个类继承HttpException，在里面进行一些自定义配置，然后使用的时候直接throw xxxException

官网给我们内置了很多HttpException的子类，可以直接抛出。详见官网[docs.nestjs.com/exception-f…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Fexception-filters "https://docs.nestjs.com/exception-filters")

如下：

```javascript
new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
```

返回结果如下：

```json
{ "message": "Something bad happened", "error": "Some error description", "statusCode": 400, }
```

**这里再提示一下：如果response参数只是一个字符串，那返回体将会把status作为statusCode属性的值，会把options里的description作为error属性的值，如果response参数是一个对象，那返回体就只有这个对象里的属性**

### 3\. 异常过滤器Exception filters

如果想要更加个性化的定制Exception返回数据格式，可以使用Exception filters，下面是我自定义的HttpExceptionFilter，它需要实现ExceptionFilter接口，实现里面catch方法，并使用@Catch()装饰器进行修饰，它接收一个或多个参数，表明要捕获哪些异常.

```php
import { Catch, ExceptionFilter, ArgumentsHost, HttpException, } from '@nestjs/common'; import { Request, Response } from 'express'; @Catch(HttpException) export class httpExceptionFilter implements ExceptionFilter { catch(exception: HttpException, host: ArgumentsHost): any { // 拿到ctx对象 const ctx = host.switchToHttp(); const request = ctx.getRequest<Request>(); const response = ctx.getResponse<Response>(); const status = exception.getStatus(); response.status(status).json({ code: status, success: false, data: { requestQuery: request.query, requestParam: request.params, requestBody: request.body, }, time: new Date().getTime(), url: request.url, }); } }
```

catch()方法的两个参数，其中host参数的类型为ArgumentHost，可以通过它拿到Request和Response对象，从而进行相应的操作。ArgumentHost是一个很丰富很复杂的接口，可以简单看一下它的定义，可以针对不同的请求协议拿到不同的host，这个以后有机会再研究。有兴趣的可以移步官网查看：[docs.nestjs.com/fundamental…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Ffundamentals%2Fexecution-context "https://docs.nestjs.com/fundamentals/execution-context")

```scss
/** * Provides methods for retrieving the arguments being passed to a handler. * Allows choosing the appropriate execution context (e.g., Http, RPC, or * WebSockets) to retrieve the arguments from. * * @publicApi */ export interface ArgumentsHost { /** * Returns the array of arguments being passed to the handler. */ getArgs<T extends Array<any> = any[]>(): T; /** * Returns a particular argument by index. * @param index index of argument to retrieve */ getArgByIndex<T = any>(index: number): T; /** * Switch context to RPC. * @returns interface with methods to retrieve RPC arguments */ switchToRpc(): RpcArgumentsHost; /** * Switch context to HTTP. * @returns interface with methods to retrieve HTTP arguments */ switchToHttp(): HttpArgumentsHost; /** * Switch context to WebSockets. * @returns interface with methods to retrieve WebSockets arguments */ switchToWs(): WsArgumentsHost; /** * Returns the current execution context type (string) */ getType<TContext extends string = ContextType>(): TContext; }
```

### 4\. 使用filters

#### ①方法作用域

可以绑定到具体的方法上，使用@UseFilters(new HttpExceptionFilter())装饰器，可以传多个filter，**亦可以使用类名作为参数，创建实例的事就交给nest框架帮我们处理，尽可能使用类作为参数，可以减小内存开支，因为全局公用一个实例instance**

```less
@Post() @UseFilters(HttpExceptionFilter) async create(@Body() createCatDto: CreateCatDto) { throw new ForbiddenException(); }
```

#### ②Controller作用域

```kotlin
@UseFilters(new HttpExceptionFilter()) export class CatsController {}
```

#### ③全局作用域

```csharp
async function bootstrap() { const app = await NestFactory.create(AppModule); app.useGlobalFilters(new HttpExceptionFilter()); await app.listen(3000); } bootstrap();
```

我试验了一下，全局使用时不能使用类作为useGlobalFilters的参数

注意：当使用全局模式的时候，如果想用依赖注入的方式，必须使用特定的方式，在任意一个模块下使用如下方法：

```less
@Module({ providers: [ { provide: APP_FILTER, useClass: HttpExceptionFilter, }, ], }) export class AppModule {}
```

这跟后面要将的全局Guard类似

### 5\. 捕获所有异常

@Catch()的参数列表为空时修饰的filter就是一个能捕获所有异常的filter，贴出官网的示例代码

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, } from '@nestjs/common'; import { HttpAdapterHost } from '@nestjs/core'; @Catch() export class AllExceptionsFilter implements ExceptionFilter { constructor(private readonly httpAdapterHost: HttpAdapterHost) {} catch(exception: unknown, host: ArgumentsHost): void { // In certain situations `httpAdapter` might not be available in the // constructor method, thus we should resolve it here. const { httpAdapter } = this.httpAdapterHost; const ctx = host.switchToHttp(); const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; const responseBody = { statusCode: httpStatus, timestamp: new Date().toISOString(), path: httpAdapter.getRequestUrl(ctx.getRequest()), }; httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus); } }
```

使用的时候，可以给构造器传入一个httpAdapter参数

```csharp
async function bootstrap() { const app = await NestFactory.create(AppModule); const { httpAdapter } = app.get(HttpAdapterHost); app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); await app.listen(3000); } bootstrap();
```

### 6.继承BaseExceptionFilter

用于修改默认的内置全局异常，对于这种异常类，如果作用于方法或者Controller，则UseFilters()的参数只能使用类，让nest帮我们做剩下的事

```scala
import { Catch, ArgumentsHost } from '@nestjs/common'; import { BaseExceptionFilter } from '@nestjs/core'; @Catch() export class AllExceptionsFilter extends BaseExceptionFilter { catch(exception: unknown, host: ArgumentsHost) { //....处理相关逻辑 super.catch(exception, host); } }
```

第5点和第6点其实都是全局异常，看你的业务进行相应的选择