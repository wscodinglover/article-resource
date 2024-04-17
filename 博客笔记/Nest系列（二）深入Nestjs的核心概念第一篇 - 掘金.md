开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第2天，[点击查看活动详情](https://juejin.cn/post/7167294154827890702 "https://juejin.cn/post/7167294154827890702")

Nestjs的核心概念很多，如果是学过java的兄弟会比较熟悉，刚开始接触还是会有一些陌生，希望通过本文轻轻松松理解Nestjs的这些核心概念，先来整体看一下有哪些：

-   Controllers
-   Providers
-   Modules
-   Middleware
-   Exception filters
-   Pipes
-   Guards
-   Interceptors
-   Custom decorators

总共9个东西，要想全部掌握还是需要一定时间的，本文是个人学习笔记，也算是抛砖引玉，说的不到位的地方，大佬勿喷。

熟悉java的同学，对spring容器一定很熟悉，它可以用来管理对象，这些对象不用自己new出来，只需要加上类似@Controller的注解就会自动产生一个对象，全全由容器负责管理，这其实是一种单例模式的思想。

本文先讲前面三个即Controllers、Providers、Modules，这也是最核心的三个概念。

## 一、Controllers

Controllers are responsible for handling incoming **requests** and returning **responses** to the client.

控制器是用来做路由导航的，控制着你的请求路径去往何方，比如[xxx.com/user，匹配的路径是…](https://link.juejin.cn/?target=http%3A%2F%2Fxxx.com%2Fuser%25EF%25BC%258C%25E5%258C%25B9%25E9%2585%258D%25E7%259A%2584%25E8%25B7%25AF%25E5%25BE%2584%25E6%2598%25AF%2Fuser%25E3%2580%2582 "http://xxx.com/user%EF%BC%8C%E5%8C%B9%E9%85%8D%E7%9A%84%E8%B7%AF%E5%BE%84%E6%98%AF/user%E3%80%82")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18ce1d3e647f41cda8e7402d0e730a93~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

-   通过@Controller(...path...)来构造一个控制器，
-   在Module的中的@Module装饰器内放入控制器，@Module({controllers:\[xxxController\]})只有这样，Nest的Ioc容器才会产生出该控制器的实例，才能为你的application所用
-   常用的方法装饰器有@Get()、@Post()、@Patch()、@Delete()、等等
-   常用的方法参数装饰器有@Body()、@Query()、@Param()、@Request()/@Req()、@Response()/@Res()
-   @HttpCode()、@Header()、@Redirect()等这几个可能用的比较少，反正我目前基本不用

## 二、Providers

Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be **injected** as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system.

Providers是一个很基本的概念，很多Nest中定义的类可以被视为一个Provider，我理解的Provider其实就是可以为各个模块提供服务的，这个服务范围很广，例如可以是一个操作数据库某张表的Service，还可以是一个具体的值，这些服务可以被注入依赖体系，注入相关依赖后，可以在方使用。这个和java中的@Autowired()自动装配比较类似，但是也有很多不同，

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54e7c70ff49b4f6ab8d4f9e45da03ef6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们使用最多的还是类，下面主要以类来举例

### 1\. 最常用的服务就是类！

-   **服务类使用@Injectable()装饰器装饰，表明该类可以由Nest的IoC容器管理**
-   **服务需要在对应的module中进行注册，如果不注册IoC容器是不会帮你创建对象的，而且还会报错**
-   **在其它类中使用时（如Controller控制器中），在该类的构造函数的参数中进行注入(后面也会讲通过属性注入的方法)**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bae2b388774d4b069a686bc7d9a85740~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

强调一下这里的依赖注入，可以看到是通过类构造函数来的， constructor(private readonly userService: UserService) {}，Nest提供了IoC容器利用Typescript自带类型的特点自动创建对象的能力，注意这里是单例模式，如果该Service在其它地方也被用过，那么会在不会重新创建对象，各个应用只会有一个该Service的对象，容器会先寻找当前有没有，如果没有再进行创建。

-   **生命周期：默认情况下随着整个应用的启动而产生，随着应用的关闭而销毁，但是也可以自定义，可以随着请求的生命周期进行调整**

### 2\. 自定义的provider

就如刚开始将Provider的图示所描述的，provider可以是单纯地值，可以是类，可以一个工厂函数，其实上面类的写法是一种语法糖写法

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df26a426f4364a439d393b7570543779~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看出完整写法，通过给不同的provider标注不同的token，注入的时候使用@Inject(对应的token)进行注入

注意这里的provide属性，可以使用类名、strings、symbols或者enums，最佳实践中，一般把所有用到的token单独放到一个文件中，比如constants.ts，专门用来提供程序用到的所有token。

#### useFactory

关于工厂函数useFactory，多说几句。它可以提供动态的provider，由factory函数的返回值来确定，factory函数可以很简单也可以很复杂，它也可以使用其它provider，不过需要注入，在inject属性进行注入，注入的provider可以是可选的

```kotlin
const connectionProvider = { provide: 'CONNECTION', useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => { const options = optionsProvider.get(); return new DatabaseConnection(options); }, inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }], // _____________/ __________________/ // This provider The provider with this // is mandatory. token can resolve to `undefined`. }; @Module({ providers: [ connectionProvider, OptionsProvider, // { provide: 'SomeOptionalProvider', useValue: 'anything' }, ], }) export class AppModule {}
```

#### useExisting

这其实只是一个别名的使用，相当于给同一个provider多个token，如下，当我们注入的时候@Inject('AliasedLoggerService')和@Inject(LoggerService)，最终使用的是同一个LoggerService的实例

```kotlin
@Injectable() class LoggerService { /* implementation details */ } const loggerAliasProvider = { provide: 'AliasedLoggerService', useExisting: LoggerService, }; @Module({ providers: [LoggerService, loggerAliasProvider], }) export class AppModule {}
```

想了解更多关于自定义provider的知识，请移步官网：[docs.nestjs.com/fundamental…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Ffundamentals%2Fcustom-providers "https://docs.nestjs.com/fundamentals/custom-providers")

### 3\. 跨模块共享服务

provider具有自己的作用域，默认只在声明provider的模块内起效。如果要跨模块进行共享，前提是该服务要在在module中进行导出，也就是exports操作，exports可以填入完整的provider，也可以只填它的token(token后面会说)

```less
@Module({ controllers: [UserController], providers: [UserService], exports: [UserService], }) export class UserModule {}
```

其它模块想使用的话可以直接在module的imports中添加该模块或者在providers中添加该服务

```less
@Module({ // 方法一 imports: [UserModule], // 方法二 providers: [UserService], }) export class UserModule {}
```

或者也可以使用全局模块，为Module增加@Global()装饰器，比如我的数据库Orm的Module就作为了全局模块

```kotlin
import { Global, Module } from '@nestjs/common'; import { PrismaService } from './prisma.service'; @Global() @Module({ providers: [PrismaService], exports: [PrismaService], }) export class PrismaModule {}
```

当然，咱们所有的模块都需要在根模块AppModule中的imports引入进去

### 4.可选的provider

有些时候可能不需要实例化一个服务类，可能需要根据配置文件灵活处理，这时候可以给对应的注入服务再增加一个@Optional()装饰器就行

```less
constructor(@Optional() @Inject('service') private service: xxxService) {}
```

### 5\. 通过属性注入

这种注入方式用的极少，一种情况是你的顶级服务类class依赖了一个或多个providers，它的后代class将一直通过super()的方式进行构造，想想也还是比较可怕的。这时可以使用属性构造的方法：

```kotlin
import { Injectable, Inject } from '@nestjs/common'; @Injectable() export class HttpService<T> { @Inject('HTTP_OPTIONS') private readonly httpClient: T; }
```

如果你的服务类没有继承自别的类，那请继续使用constructor构造函数来注入

## 三、Modules

A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that **Nest** makes use of to organize the application structure.

可以看出，nestjs也是模块化编程的思想，一个应用由一个个拆分的模块来组成，每个模块负责自己的一部分业务，一个应用至少有一个模块，也就是根模块，使用@Module()装饰器来声明一个模块，模块也是一个类。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ccda297aaf148a2818955d21233ff4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 1\. @Module()装饰器

需要一个参数，是一个对象，里面包含四个属性，用来描述这个module，上面其实已经都讲到了

```less
@Module({ imports: [OtherModule], controllers: [UserController], providers: [UserService], exports:[UserService] }) export class UserModule {}
```

对于imports中导入的OtherModule，意味着OtherModule里exports的provider，可以在UserModule中使用

exports可以使用provider本身，亦可以使用provider的token

### 2\. 模块共享

在Provider中已经讲过了，就是通过exports导出相应的Service，在别的模块通过imports导入该模块

### 3\. 模块重导出

这个感觉还是挺有用的，可以把一些常用的，公共的模块，全部先import进一个CommonModule，然后再把它们从exprots全部导出，以后如果有那个模块想要使用其中某个模块的Service，只需要将这个CommonModule导入即可，不用再导入所有的依赖模块

```kotlin
@Module({ imports: [Module1, Module2, Module3, Module4], exports: [Module1, Module2, Module3, Module4], }) export class CommonModule {}
```

### 4\. 模块类中也可以注入Service

```typescript
import { Module } from '@nestjs/common'; import { CatsController } from './cats.controller'; import { CatsService } from './cats.service'; @Module({ controllers: [CatsController], providers: [CatsService], }) export class CatsModule { constructor(private catsService: CatsService) {} }
```

### 5\. 全局模块Global modules

通过@Global()装饰器声明一个全局模块，只需要在根模块imports注册该全局模块，就可以在其他所有模块内使用它导出的Service

### 6\. 动态模块Dynamic modules

这是nest提供的一个强大功能，可以让我们对模块进行定制化操作，自定义模块的注册，动态提供providers，看一下官方的示例

```java
import { Module, DynamicModule } from '@nestjs/common'; import { createDatabaseProviders } from './database.providers'; import { Connection } from './connection.provider'; @Module({ providers: [Connection], }) export class DatabaseModule { static forRoot(entities = [], options?): DynamicModule { const providers = createDatabaseProviders(options, entities); return { module: DatabaseModule, providers: providers, exports: providers, }; } }
```

原理其实很简单，就是给当前Module类提供一个forRoot方法，该方法返回一个新的Module，这个Module的类型是一个DynamicModule，在其他模块需要注册使用时，可以使用DatabaseModule.forRoot(参数)来动态的注册不同的Module，以达到提供不同providers的目的。

```kotlin
@Module({ imports: [DatabaseModule.forRoot([User])], }) export class AppModule {}
```

**如果想在全局作用域内注册一个动态Module，则在forRoot方法的返回值对象中加入global:true这个属性，当然一般情况下，nestjs其实不提倡搞全局模块的，我们按需使用就行。**

```yaml
{ global: true, module: DatabaseModule, providers: providers, exports: providers, }
```

**动态模块的重导出可以省略forRoot()方法，如**

```kotlin
@Module({ imports: [DatabaseModule.forRoot([User])], exports: [DatabaseModule], }) export class AppModule {}
```

想了解更多关于动态模块的内容，请异步官网：[docs.nestjs.com/fundamental…](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.nestjs.com%2Ffundamentals%2Fdynamic-modules "https://docs.nestjs.com/fundamentals/dynamic-modules")

其实就是阅读官网的学习心得体会，跟大家分享交流，不足之处请大佬们批评指正！