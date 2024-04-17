开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第5天，[点击查看活动详情](https://juejin.cn/post/7167294154827890702 "https://juejin.cn/post/7167294154827890702")

系列文章目录：

[Nestjs系列（一）轻松搞定Nestjs用户名密码认证和Jwt的使用方法](https://juejin.cn/post/7171424088827625479 "https://juejin.cn/post/7171424088827625479")

[Nest系列（二）深入Nestjs的核心概念第一篇](https://juejin.cn/post/7171621691271938062 "https://juejin.cn/post/7171621691271938062")

[Nest系列（三）深入Nestjs的核心概念第二篇](https://juejin.cn/post/7171970153452666910 "https://juejin.cn/post/7171970153452666910")

本讲我们把接着来看后两个核心概念，ExceptionFilter和Pipes，咱直接进入正题！

## 一、Exception filters

Nest comes with a built-in **exceptions layer** which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

nest内置了一个异常处理层，如果我们没有手动处理异常，所有的异常都会进到这里，系统将给出响应的提示信息。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21969ad5ebc3427f9a98a9ac10790a2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

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

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5cdca7e27dc483e96ac8f7e0e04d2ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

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

## 二、Pipes

A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

管道也是一个类，使用装饰器@Injectable()，并实现接口PipeTransform

管道有两个典型的应用场景

-   transformation：数据转换，如将请求的输入数据从string转为integer
-   validation：对请求的输入数据进行验证，验证不通过抛出异常，这一部分其实感觉也可以让前台来做

以上两种场景下，管道都是对Controller控制器中的handler处理函数的参数进行操作，这个操作发生在handler函数真正执行之前，如果在pipes中抛出异常，会直接跳到异常处理，并返回前端，Controller下的处理函数压根不会执行，这也算是一种应用保护机制。

-   如果是做validation，那么要么验证通过返回没有经过修改的value，要么验证失败，抛出错误
-   如果是transformation：那么转换为想要的类型，如果转换失败则抛出异常

### 1\. 内置pipes

-   ValidationPipe
-   ParseIntPipe
-   ParseFloatPipe
-   ParseBoolPipe
-   ParseArrayPipe
-   ParseUUIDPipe
-   ParseEnumPipe
-   DefaultValuePipe
-   ParseFilePipe

#### Parse\*Pipe系列

-   使用类

这一系列都是转换数据用的，可以在Controller的handler方法参数上使用，如下直接给@Param()提供第二个参数，用于转换，这里提供一个类，nest会自动将其实力为一个对象

```less
@Get('hello/:id') getHello(@Param('id', ParseIntPipe) id: number, @Request() req) { console.log(typeof id); return req.user; }
```

到请求为/hello/123时正常返回

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e9af5dd2dd14461b9e0724958b0cb60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当请求为/hello/123a时，转换出错，抛出异常

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdc65119443b4ea4895ac3073477b878~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

-   使用自定义的实例

如下自定义statuscode

```less
getHello( @Param( 'id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, }), ) id: number, @Request() req, ) { console.log(typeof id); return req.user; }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01df501b269d44e1b92f2501e686938e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 2\. 自定义Pipes(validation为例)

不论是transformation还是validation都需要使用@Injectable()装饰器，并实现PipeTransform接口，基本实现如下：

```typescript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'; @Injectable() export class CustomValidationPipe implements PipeTransform { transform(value: any, metadata: ArgumentMetadata): any { console.log('====custom-pipe-value====', value); console.log('====custom-pipe-metadata====', metadata); return value; } }
```

其中value就是被CustomValidationPipe修饰的参数，metadata是该参数的meta属性，它类型如下：

```typescript
export interface ArgumentMetadata { type: 'body' | 'query' | 'param' | 'custom'; metatype?: Type<unknown>; data?: string; }
```

##### 使用class validator

官网上讲了好几种不同实现，我们主要看class validator，依托于class-validator和class-transformer，先安装依赖

```ruby
$ npm i --save class-validator class-transformer
```

对于我们新建用户来说，要校验创建用户的信息，对创建用户的Dto类使用class-validator的各种验证装饰器

```less
import { IsOptional, IsString } from 'class-validator'; export class CreateUserDto { @IsString() username: string; @IsString() password: string; @IsString() @IsOptional() role?: string; }
```

编写validation-pipes类

```typescript
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common'; import { validate } from 'class-validator'; import { plainToInstance } from 'class-transformer'; @Injectable() export class CustomValidationPipe implements PipeTransform<any> { async transform(value: any, metadata: ArgumentMetadata) { console.log('====custom-pipe-value====', value); console.log('====custom-pipe-metadata====', metadata); const { metatype } = metadata; // 判断传入的参数有没有类型，如果没有相当于是原生的js，则不做校验 // 这里的类型指的就是Controller中的参数有没有指定类型，只有制定了类型的参数才需要校验 if (!metatype || !this.toValidate(metatype)) { return value; } // 获取带有类型的obj对象 const object = plainToInstance(metatype, value); // 校验 const errors = await validate(object); // 如果校验出错，抛出异常 if (errors.length > 0) { throw new BadRequestException('Validation failed'); } // 如果校验通过返回value unchanged return value; } private toValidate(metatype: Function): boolean { const types: Function[] = [String, Boolean, Number, Array, Object]; return !types.includes(metatype); } }
```

使用：

```typescript
@Post() async create(@Body(new CustomValidationPipe()) createUserDto: CreateUserDto) { const newUser = await this.userService.create(createUserDto); this.logger.log( `新建用户成功,用户名[${newUser.username}],角色[${newUser.role}]`, ); return RespBean.success(newUser); }
```

验证如下，将password写成了number而不是string

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcded6dddd6c4ce1a01c636dd0851bfa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 3\. 全局作用域下的pipes

依然是两种形式

-   使用useGlobalPipes

```arduino
// 全局validationPipes app.useGlobalPipes(new CustomValidationPipe());
```

-   使用依赖注入，在任意一个模块注入都可以

```less
@Module({ providers: [ { provide: APP_PIPE, useClass: CustomValidationPipe, }, ], }) export class AppModule {}
```

### 4\. 内置validationPipe

当然讲了这么多，只是说明了原理，其实我们大可不必自己写，直接使用内置的就行，而且提供了丰富的配置自定义功能，具体详情可移步官网：[docs.nestjs.com/techniques/…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Ftechniques%2Fvalidation "https://docs.nestjs.com/techniques/validation")

基本使用：

```javascript
import { ValidationPipe } from '@nestjs/common'; app.useGlobalPipes( new ValidationPipe({ disableErrorMessages: true, }), );
```

### 5\. transformation-pipes自定义使用场景

我们也可以自定义transformation pipes，这个很简单，就是在transform方法内返回不同的结果就行了，它会覆盖之前的value，这是对前端传值的干预，有时候也会很有用

-   比如将数据类型进行转换
-   对需要的数据如果某个属性不存在那就给它一个默认值，比如做查询操作的时候，有些查询参数没传那就使用默认值

官网示例：

```typescript
@Injectable() export class ParseIntPipe implements PipeTransform<string, number> { transform(value: string, metadata: ArgumentMetadata): number { const val = parseInt(value, 10); if (isNaN(val)) { throw new BadRequestException('Validation failed'); } return val; } }
```

注意这里PipeTransform<T, R>泛型的使用，T表示输入的类型，R表示返回的类型

使用和之前讲的一样：

```less
@Get(':id') async findOne(@Param('id', new ParseIntPipe()) id) { return this.catsService.findOne(id); }
```

### 6\. 实现id转user实体的transformation pipe

这里实现一下官网上的另外一个留给读者的例子，就是前端传入的是一个userId，我们需要在transformation pipe中根据这个id来返回一个用户对象，也就是将id转换为用户

```typescript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'; import { UserService } from '../../modules/user/user.service'; @Injectable() export class UserByIdPipe implements PipeTransform<any> { constructor(private readonly userService: UserService) {} async transform(value: string, metadata: ArgumentMetadata) { const value1 = parseInt(value, 10); // 这里从数据库查找user，我使用的是prisma const user = await this.userService.findOneById(value1); if (user) { // 去除密码 const { password, ...res } = user; return res; } } }
```

使用

```less
@Get('users/:id') getUser(@Param('id', UserByIdPipe) user: User) { return user; }
```

测试

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/695b8739bce240d8b338c6a4029b7fff~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 7\. pipe提供默认值

主要用在前端传过来的数据是null或者undefined，如果我们不做处理可能会抛出异常，所以我们可以在他们转换前再加一层提供默认值的管道，较为简单，直接引用官方的示例

```less
@Get() async findAll( @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean, @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number, ) { return this.catsService.findAll({ activeOnly, page }); }
```