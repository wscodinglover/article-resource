## class-transformer （翻译文档）

[github.com/typestack/c…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypestack%2Fclass-transformer "https://github.com/typestack/class-transformer")

## Table of contents

-   [什么是class-transformer](https://juejin.cn/post/6904890590602330119#%E4%BB%80%E4%B9%88%E6%98%AFclass-transformer "#%E4%BB%80%E4%B9%88%E6%98%AFclass-transformer")
-   [安装](https://juejin.cn/post/6904890590602330119#%E5%AE%89%E8%A3%85 "#%E5%AE%89%E8%A3%85")
    -   [Node.js](https://juejin.cn/post/6904890590602330119#Node.js "#Node.js")
    -   [Browser](https://juejin.cn/post/6904890590602330119#Browser "#Browser")
-   [Methods](https://juejin.cn/post/6904890590602330119#Methods "#Methods")
    -   [plainToClass](https://juejin.cn/post/6904890590602330119#plaintoclass "#plaintoclass")
    -   [plainToClassFromExist](https://juejin.cn/post/6904890590602330119#plaintoclassfromexist "#plaintoclassfromexist")
    -   [classToPlain](https://juejin.cn/post/6904890590602330119#classtoplain "#classtoplain")
    -   [classToClass](https://juejin.cn/post/6904890590602330119#classtoclass "#classtoclass")
    -   [serialize](https://juejin.cn/post/6904890590602330119#serialize "#serialize")
    -   [deserialize and deserializeArray](https://juejin.cn/post/6904890590602330119#deserialize-and-deserializearray "#deserialize-and-deserializearray")
-   [执行类型安全的实例](https://juejin.cn/post/6904890590602330119#%E6%89%A7%E8%A1%8C%E7%B1%BB%E5%9E%8B%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9E%E4%BE%8B "#%E6%89%A7%E8%A1%8C%E7%B1%BB%E5%9E%8B%E5%AE%89%E5%85%A8%E7%9A%84%E5%AE%9E%E4%BE%8B")
-   [使用嵌套对象](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E5%B5%8C%E5%A5%97%E5%AF%B9%E8%B1%A1 "#%E4%BD%BF%E7%94%A8%E5%B5%8C%E5%A5%97%E5%AF%B9%E8%B1%A1")
    -   [提供多个类型选项](https://juejin.cn/post/6904890590602330119#%E6%8F%90%E4%BE%9B%E5%A4%9A%E4%B8%AA%E7%B1%BB%E5%9E%8B%E9%80%89%E9%A1%B9 "#%E6%8F%90%E4%BE%9B%E5%A4%9A%E4%B8%AA%E7%B1%BB%E5%9E%8B%E9%80%89%E9%A1%B9")
-   [暴露getter方法和方法返回值](https://juejin.cn/post/6904890590602330119#%E6%9A%B4%E9%9C%B2getter%E6%96%B9%E6%B3%95%E5%92%8C%E6%96%B9%E6%B3%95%E8%BF%94%E5%9B%9E%E5%80%BC "#%E6%9A%B4%E9%9C%B2getter%E6%96%B9%E6%B3%95%E5%92%8C%E6%96%B9%E6%B3%95%E8%BF%94%E5%9B%9E%E5%80%BC")
-   [使用不同的名称公开属性](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E7%9A%84%E5%90%8D%E7%A7%B0%E5%85%AC%E5%BC%80%E5%B1%9E%E6%80%A7 "#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E7%9A%84%E5%90%8D%E7%A7%B0%E5%85%AC%E5%BC%80%E5%B1%9E%E6%80%A7")
-   [跳过特定属性](https://juejin.cn/post/6904890590602330119#%E8%B7%B3%E8%BF%87%E7%89%B9%E5%AE%9A%E5%B1%9E%E6%80%A7 "#%E8%B7%B3%E8%BF%87%E7%89%B9%E5%AE%9A%E5%B1%9E%E6%80%A7")
-   [跳越依赖于操作](https://juejin.cn/post/6904890590602330119#%E8%B7%B3%E8%B6%8A%E4%BE%9D%E8%B5%96%E4%BA%8E%E6%93%8D%E4%BD%9C "#%E8%B7%B3%E8%B6%8A%E4%BE%9D%E8%B5%96%E4%BA%8E%E6%93%8D%E4%BD%9C")
-   [跳过类的所有属性](https://juejin.cn/post/6904890590602330119#%E8%B7%B3%E8%BF%87%E7%B1%BB%E7%9A%84%E6%89%80%E6%9C%89%E5%B1%9E%E6%80%A7 "#%E8%B7%B3%E8%BF%87%E7%B1%BB%E7%9A%84%E6%89%80%E6%9C%89%E5%B1%9E%E6%80%A7")
-   [跳过私有属性或一些带前缀的属性](https://juejin.cn/post/6904890590602330119#%E8%B7%B3%E8%BF%87%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7%E6%88%96%E4%B8%80%E4%BA%9B%E5%B8%A6%E5%89%8D%E7%BC%80%E7%9A%84%E5%B1%9E%E6%80%A7 "#%E8%B7%B3%E8%BF%87%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7%E6%88%96%E4%B8%80%E4%BA%9B%E5%B8%A6%E5%89%8D%E7%BC%80%E7%9A%84%E5%B1%9E%E6%80%A7")
-   [使用组来控制被排除的属性](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E7%BB%84%E6%9D%A5%E6%8E%A7%E5%88%B6%E8%A2%AB%E6%8E%92%E9%99%A4%E7%9A%84%E5%B1%9E%E6%80%A7 "#%E4%BD%BF%E7%94%A8%E7%BB%84%E6%9D%A5%E6%8E%A7%E5%88%B6%E8%A2%AB%E6%8E%92%E9%99%A4%E7%9A%84%E5%B1%9E%E6%80%A7")
-   [使用版本控制来控制公开的和排除的属性](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E6%9D%A5%E6%8E%A7%E5%88%B6%E5%85%AC%E5%BC%80%E7%9A%84%E5%92%8C%E6%8E%92%E9%99%A4%E7%9A%84%E5%B1%9E%E6%80%A7 "#%E4%BD%BF%E7%94%A8%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E6%9D%A5%E6%8E%A7%E5%88%B6%E5%85%AC%E5%BC%80%E7%9A%84%E5%92%8C%E6%8E%92%E9%99%A4%E7%9A%84%E5%B1%9E%E6%80%A7")
-   [转换日期字符串到日期对象](https://juejin.cn/post/6904890590602330119#%E8%BD%AC%E6%8D%A2%E6%97%A5%E6%9C%9F%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%88%B0%E6%97%A5%E6%9C%9F%E5%AF%B9%E8%B1%A1 "#%E8%BD%AC%E6%8D%A2%E6%97%A5%E6%9C%9F%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%88%B0%E6%97%A5%E6%9C%9F%E5%AF%B9%E8%B1%A1")
-   [使用数组](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E6%95%B0%E7%BB%84 "#%E4%BD%BF%E7%94%A8%E6%95%B0%E7%BB%84")
-   [额外的数据转换](https://juejin.cn/post/6904890590602330119#%E9%A2%9D%E5%A4%96%E7%9A%84%E6%95%B0%E6%8D%AE%E8%BD%AC%E6%8D%A2 "#%E9%A2%9D%E5%A4%96%E7%9A%84%E6%95%B0%E6%8D%AE%E8%BD%AC%E6%8D%A2")
    -   [基本用法](https://juejin.cn/post/6904890590602330119#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95 "#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95")
    -   [高级用法](https://juejin.cn/post/6904890590602330119#%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95 "#%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95")
-   [其他修饰符](https://juejin.cn/post/6904890590602330119#%E5%85%B6%E4%BB%96%E4%BF%AE%E9%A5%B0%E7%AC%A6 "#%E5%85%B6%E4%BB%96%E4%BF%AE%E9%A5%B0%E7%AC%A6")
-   [使用泛型](https://juejin.cn/post/6904890590602330119#%E4%BD%BF%E7%94%A8%E6%B3%9B%E5%9E%8B "#%E4%BD%BF%E7%94%A8%E6%B3%9B%E5%9E%8B")
-   [隐式类型转换](https://juejin.cn/post/6904890590602330119#%E9%9A%90%E5%BC%8F%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2 "#%E9%9A%90%E5%BC%8F%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2")
-   [它如何处理循环引用?](https://juejin.cn/post/6904890590602330119#%E5%AE%83%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8? "#%E5%AE%83%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8?")
-   [在Angular2中使用](https://juejin.cn/post/6904890590602330119#%E5%9C%A8Angular2%E4%B8%AD%E4%BD%BF%E7%94%A8 "#%E5%9C%A8Angular2%E4%B8%AD%E4%BD%BF%E7%94%A8")
-   [例子](https://juejin.cn/post/6904890590602330119#%E4%BE%8B%E5%AD%90 "#%E4%BE%8B%E5%AD%90")
-   [发行说明](https://juejin.cn/post/6904890590602330119#%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E "#%E5%8F%91%E8%A1%8C%E8%AF%B4%E6%98%8E")

## 什么是class-transformer[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

在JavaScript中有两种类型的对象:

-   plain (literal) objects
-   class (constructor) objects

纯对象是\`Object”类的实例。 当通过“{}”符号创建时，有时它们被称为**文字**对象。

那么，问题是什么呢?

有时候你想把普通的javascript对象转换成你拥有的ES6类。

例如，在“users”中有一个用户列表。

```json
[ { "id": 1, "firstName": "Johny", "lastName": "Cage", "age": 27 }, { "id": 2, "firstName": "Ismoil", "lastName": "Somoni", "age": 50 }, { "id": 3, "firstName": "Luke", "lastName": "Dacascos", "age": 12 } ]
```

你有一个' User '类:

```typescript
export class User { id: number; firstName: string; lastName: string; age: number; getName() { return this.firstName + ' ' + this.lastName; } isAdult() { return this.age > 36 && this.age < 60; } }
```

假设您正在从“users”下载类型为“User”的用户：

```typescript
fetch('users.json').then((users: User[]) => { // you can use users here, and type hinting also will be available to you, // but users are not actually instances of User class // this means that you can't use methods of User class });
```

在此代码中，您可以使用' users\[0\] '。id '，你也可以用' users\[0\]。firstName”和“用户\[0\].lastName”。

那么该怎么办呢?如何使' User '对象的实例的' users '数组而不是普通的javascript对象?

是的，您可以使用类转换器。这个库的目的是帮助您映射普通的javascript

这个库对于在api中公开的模型也很有用， 这里有个例子:

```typescript
fetch('users.json').then((users: Object[]) => { const realUsers = plainToClass(User, users); // now each user in realUsers is instance of User class });
```

现在可以使用' users\[0\]. getname() '和' users\[0\]. isadult() '方法。

## 安装[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

### Node.js[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

1.  安装模块:
    
    `npm install class-transformer --save`
    
2.  `reflect-metadata` 是必需的，安装:
    
    `npm install reflect-metadata --save`
    
    确保导入到全局位置，比如app.ts:
    
    ```typescript
    import 'reflect-metadata';
    ```
    
3.  使用ES6特性，如果您使用旧版本的node.js，您可能需要安装ES6 -shim:
    
    `npm install es6-shim --save`
    
    然后导入到全局位置，比如app.ts:
    
    ```typescript
    import 'es6-shim';
    ```
    

### Browser[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

1.  安装模块：
    
    `npm install class-transformer --save`
    
2.  `reflect-metadata` 是必需的，安装:
    
    `npm install reflect-metadata --save`
    
    在' index.html '的头部添加 :
    
    ```html
    <html> <head> <!-- ... --> <script src="node_modules/reflect-metadata/Reflect.js"></script> </head> <!-- ... --> </html>
    ```
    
    如果你使用的是angular 2，你应该已经安装了这个垫片。
    
3.  如果你正在使用system.js，你可能想要把它添加到' map '和' package ' config中:
    
    ```json
    { "map": { "class-transformer": "node_modules/class-transformer" }, "packages": { "class-transformer": { "main": "index.js", "defaultExtension": "js" } } }
    ```
    

## Methods[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

### plainToClass[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

此方法将普通javascript对象转换为特定类的实例。

```typescript
import { plainToClass } from 'class-transformer'; let users = plainToClass(User, userJson); // 将用户纯对象转换为单个用户。还支持数组
```

### plainToClassFromExist[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

该方法使用已填充的对象(目标类的实例)将普通对象转换为实例。

```typescript
const defaultUser = new User(); defaultUser.role = 'user'; let mixedUser = plainToClassFromExist(defaultUser, user); // 混合后的 user.role = 'user'
```

### classToPlain[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

这个方法将你的类对象转换回普通的javascript对象，也就是 ' JSON .stringify '。

```typescript
import { classToPlain } from 'class-transformer'; let photo = classToPlain(photo);
```

### classToClass[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

此方法将您的类对象转换为类对象的新实例。

```typescript
import { classToClass } from 'class-transformer'; let photo = classToClass(photo);
```

你也可以在转换选项中使用`ignoreDecorators` 选项来忽略你的类正在使用的所有decorator。

### serialize[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

使用 `serialize` 方法，您可以将您的模型直接序列化为json：

```typescript
import { serialize } from 'class-transformer'; let photo = serialize(photo);
```

`serialize` 可以同时使用与数组和非数组.

### deserialize and deserializeArray[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

使用`deserialize` 方法，你可以从一个json反序列化为你的模型:

```typescript
import { deserialize } from 'class-transformer'; let photo = deserialize(Photo, photo);
```

使反序列化在数组中工作使用 `deserializeArray` 方法:

```typescript
import { deserializeArray } from 'class-transformer'; let photos = deserializeArray(Photo, photos);
```

## 执行类型安全的实例[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

`plainToClass` 方法的默认行为是设置plain对象的所有属性，

```typescript
import { plainToClass } from 'class-transformer'; class User { id: number; firstName: string; lastName: string; } const fromPlainUser = { unkownProp: 'hello there', firstName: 'Umed', lastName: 'Khudoiberdiev', }; console.log(plainToClass(User, fromPlainUser)); // User { // unkownProp: 'hello there', // firstName: 'Umed', // lastName: 'Khudoiberdiev', // }
```

如果此行为不符合您的需要，您可以使用`excludeExtraneousValues`选项

```typescript
import { Expose, plainToClass } from 'class-transformer'; class User { @Expose() id: number; @Expose() firstName: string; @Expose() lastName: string; } const fromPlainUser = { unkownProp: 'hello there', firstName: 'Umed', lastName: 'Khudoiberdiev', }; console.log(plainToClass(User, fromPlainUser, { excludeExtraneousValues: true })); // User { // id: undefined, // firstName: 'Umed', // lastName: 'Khudoiberdiev' // }
```

## 使用嵌套对象[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

当你试图转换有嵌套对象的对象时， 它需要知道你要转换的对象的类型。 因为Typescript还没有很好的反射能力， 我们应该隐式地指定每个属性包含的对象类型。 这是使用 `@Type` 装饰器完成的。

假设我们有一个带有照片的相册，我们正在尝试将相册纯对象转换为类对象:

```typescript
import { Type, plainToClass } from 'class-transformer'; export class Album { id: number; name: string; @Type(() => Photo) photos: Photo[]; } export class Photo { id: number; filename: string; } let album = plainToClass(Album, albumJson); // now album is Album object with Photo objects inside
```

### 提供多个类型选项[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

如果嵌套对象可以是不同类型的，您可以提供一个额外的options对象， 它指定了一个鉴别器（ `property` ）。鉴别器选项必须定义一个“属性”来保存子程序 对象的类型名称和可能的“子类型”，嵌套对象可以转换为。子类型 有一个`value`，它包含类型的构造函数和`name`，可以与 `property` 匹配。

假设我们有一个相册，上面有一张照片。但这张照片可以是某些不同的类型。 我们试图将普通对象的相册转换为类对象。必须定义普通对象输入 附加属性`__type`。默认情况下，这个属性在转换期间被删除:

**JSON input**:

```json
{ "id": 1, "name": "foo", "topPhoto": { "id": 9, "filename": "cool_wale.jpg", "depth": 1245, "__type": "underwater" } }
```

```typescript
import { Type, plainToClass } from 'class-transformer'; export abstract class Photo { id: number; filename: string; } export class Landscape extends Photo { panorama: boolean; } export class Portrait extends Photo { person: Person; } export class UnderWater extends Photo { depth: number; } export class Album { id: number; name: string; @Type(() => Photo, { discriminator: { property: '__type', subTypes: [ { value: Landscape, name: 'landscape' }, { value: Portrait, name: 'portrait' }, { value: UnderWater, name: 'underwater' }, ], }, }) topPhoto: Landscape | Portrait | UnderWater; } let album = plainToClass(Album, albumJson); // now album is Album object with a UnderWater object without `__type` property.
```

提示:这同样适用于具有不同子类型的数组。此外，你可以指定`keepDiscriminatorProperty: true` 在选项中，将`discriminator`属性也保留在生成的类中。

## 暴露getter方法和方法返回值[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

您可以通过为这些getter或方法设置一个`@Expose()`装饰器来公开您的getter或方法返回的内容:

```typescript
import { Expose } from 'class-transformer'; export class User { id: number; firstName: string; lastName: string; password: string; @Expose() get name() { return this.firstName + ' ' + this.lastName; } @Expose() getFullName() { return this.firstName + ' ' + this.lastName; } }
```

## 使用不同的名称公开属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

如果你想用不同的名字公开一些属性， 你可以通过为`@Expose`装饰器指定一个`name`选项来实现:

```typescript
import { Expose } from 'class-transformer'; export class User { @Expose({ name: 'uid' }) id: number; firstName: string; lastName: string; @Expose({ name: 'secretKey' }) password: string; @Expose({ name: 'fullName' }) getFullName() { return this.firstName + ' ' + this.lastName; } }
```

## 跳过特定属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

有时您希望在转换期间跳过某些属性。 这可以通过使用`@Exclude`装饰器来完成:

```typescript
import { Exclude } from 'class-transformer'; export class User { id: number; email: string; @Exclude() password: string; }
```

现在，当您转换User时，`password`属性将被跳过，并且不会包含在转换后的结果中。

## 跳越依赖于操作[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

使用`toClassOnly`或`toPlainOnly`选项：您可以控制排除某个属性。

```typescript
import { Exclude } from 'class-transformer'; export class User { id: number; email: string; @Exclude({ toPlainOnly: true }) password: string; }
```

现在，`password`属性将只在`classToPlain`操作期间被排除。反之，使用`toClassOnly`选项。

## 跳过类的所有属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

您可以跳过类的所有属性，只显式地公开那些需要的:

```typescript
import { Exclude, Expose } from 'class-transformer'; @Exclude() export class User { @Expose() id: number; @Expose() email: string; password: string; }
```

现在`id`和`email`将被暴露，密码将在转换过程中被排除。 或者，您可以在转换期间设置排除策略:

```typescript
import { classToPlain } from 'class-transformer'; let photo = classToPlain(photo, { strategy: 'excludeAll' });
```

在这种情况下，您不需要`@Exclude()`整个类。

## 跳过私有属性或一些带前缀的属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

如果你用前缀来命名你的私有属性，比如 `_`， 然后你也可以从转换中排除这些属性:

```typescript
import { classToPlain } from 'class-transformer'; let photo = classToPlain(photo, { excludePrefixes: ['_'] });
```

这将跳过所有以 `_` 开头的属性。 您可以传递任意数量的前缀，并且以这些前缀开头的所有属性都将被忽略。 例如:

```typescript
import { Expose, classToPlain } from 'class-transformer'; export class User { id: number; private _firstName: string; private _lastName: string; _password: string; setName(firstName: string, lastName: string) { this._firstName = firstName; this._lastName = lastName; } @Expose() get name() { return this._firstName + ' ' + this._lastName; } } const user = new User(); user.id = 1; user.setName('Johny', 'Cage'); user._password = '123'; const plainUser = classToPlain(user, { excludePrefixes: ['_'] }); // here plainUser will be equal to // { id: 1, name: "Johny Cage" }
```

## 使用组来控制被排除的属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

您可以使用组来控制哪些数据会被公开，哪些不会:

```typescript
import { Exclude, Expose, classToPlain } from 'class-transformer'; export class User { id: number; name: string; @Expose({ groups: ['user', 'admin'] }) // this means that this data will be exposed only to users and admins email: string; @Expose({ groups: ['user'] }) // this means that this data will be exposed only to users password: string; } let user1 = classToPlain(user, { groups: ['user'] }); // will contain id, name, email and password let user2 = classToPlain(user, { groups: ['admin'] }); // will contain id, name and email
```

## 使用版本控制来控制公开的和排除的属性[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

如果你正在构建一个有不同版本的API, class transformer有非常有用的工具。 您可以控制模型的哪些属性应该在哪个版本中公开或排除。例子:

```typescript
import { Exclude, Expose, classToPlain } from 'class-transformer'; export class User { id: number; name: string; @Expose({ since: 0.7, until: 1 }) // this means that this property will be exposed for version starting from 0.7 until 1 email: string; @Expose({ since: 2.1 }) // this means that this property will be exposed for version starting from 2.1 password: string; } let user1 = classToPlain(user, { version: 0.5 }); // will contain id and name let user2 = classToPlain(user, { version: 0.7 }); // will contain id, name and email let user3 = classToPlain(user, { version: 1 }); // will contain id and name let user4 = classToPlain(user, { version: 2 }); // will contain id and name let user5 = classToPlain(user, { version: 2.1 }); // will contain id, name and password
```

## 转换日期字符串到日期对象[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

有时，在普通javascript对象中有一个以字符串格式接收的日期。 你想从中创建一个真正的javascript Date对象。 你可以简单地通过传递一个日期对象给 `@Type` 装饰器来完成:

```typescript
import { Type } from 'class-transformer'; export class User { id: number; email: string; password: string; @Type(() => Date) registrationDate: Date; }
```

注意，当您试图将类对象转换为普通对象时，日期将被转换为字符串。

同样的方式也可以用于`Number`, `String`, `Boolean` 当您希望将值转换为这些类型时，可以使用基本类型。

## 使用数组[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

在使用数组时，必须提供数组包含的对象的类型。 这种类型，您在`@Type()` 装饰器中指定:

```typescript
import { Type } from 'class-transformer'; export class Photo { id: number; name: string; @Type(() => Album) albums: Album[]; }
```

你也可以使用自定义数组类型:

```typescript
import { Type } from 'class-transformer'; export class AlbumCollection extends Array<Album> { // custom array functions ... } export class Photo { id: number; name: string; @Type(() => Album) albums: AlbumCollection; }
```

库将自动处理正确的转换。

ES6集合`Set` 和`Map` 也需要`@Type`装饰器:

```typescript
export class Skill { name: string; } export class Weapon { name: string; range: number; } export class Player { name: string; @Type(() => Skill) skills: Set<Skill>; @Type(() => Weapon) weapons: Map<string, Weapon>; }
```

## 额外的数据转换[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

### 基本用法[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

您可以使用`@Transform`装饰器执行额外的数据转换。 例如，你想让你的 `Date` 对象成为一个`moment`对象(transforming object from plain to class):

```typescript
import { Transform } from 'class-transformer'; import * as moment from 'moment'; import { Moment } from 'moment'; export class Photo { id: number; @Type(() => Date) @Transform(value => moment(value), { toClassOnly: true }) date: Moment; }
```

当你调用`plainToClass` 转换 `Photo object` 的普通对象（`plain`）时， 它将把对象中的 `date` 转换为 `moment`。 `@Transform` 装饰器也支持组和版本控制。

### 高级用法[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

`@Transform` 装饰器提供了更多参数，让您可以配置如何完成转换。

```python
@Transform((value, obj, type) => value)
```

| Argument | Description |
| --- | --- |
| `value` | 转换前的属性值. |
| `obj` | 转换源对象。 |
| `type` | 转换类型。 |

## 其他修饰符[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

| Signature | Example | Description |
| --- | --- | --- |
| `@TransformClassToPlain` | `@TransformClassToPlain({ groups: ["user"] })` | Transform the method return with classToPlain and expose the properties on the class. |
| `@TransformClassToClass` | `@TransformClassToClass({ groups: ["user"] })` | Transform the method return with classToClass and expose the properties on the class. |
| `@TransformPlainToClass` | `@TransformPlainToClass(User, { groups: ["user"] })` | Transform the method return with plainToClass and expose the properties on the class. |

上面的decorator接受一个可选参数: ClassTransformOptions — 转换选项，如: groups, version, name

An example:

```typescript
@Exclude() class User { id: number; @Expose() firstName: string; @Expose() lastName: string; @Expose({ groups: ['user.email'] }) email: string; password: string; } class UserController { @TransformClassToPlain({ groups: ['user.email'] }) getUser() { const user = new User(); user.firstName = 'Snir'; user.lastName = 'Segal'; user.password = 'imnosuperman'; return user; } } const controller = new UserController(); const user = controller.getUser();
```

`user` 变量将只包含firstName,lastName, email属性，因为它们是 暴露变量。email属性也暴露了，因为我们将组指定为 "user.email"。

## 使用泛型[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

不支持泛型，因为TypeScript还没有很好的反射能力。 一旦TypeScript团队为我们提供更好的运行时类型反射工具，泛型就会被实现。 有一些调整你可以使用，也许可以解决你的问题。 [Checkout this example.](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpleerock%2Fclass-transformer%2Ftree%2Fmaster%2Fsample%2Fsample4-generics "https://github.com/pleerock/class-transformer/tree/master/sample/sample4-generics")

## 隐式类型转换[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

> **NOTE** 如果同时使用类验证器和类转换器，则可能不希望启用此函数。

启用基于Typescript提供的类型信息的内置类型之间的自动转换。默认情况下禁用。

```ts
import { IsString } from 'class-validator'; class MyPayload { @IsString() prop: string; } const result1 = plainToClass(MyPayload, { prop: 1234 }, { enableImplicitConversion: true }); const result2 = plainToClass(MyPayload, { prop: 1234 }, { enableImplicitConversion: false }); /** * result1 will be `{ prop: "1234" }` - 请注意：prop值转换为了string。 * result2 will be `{ prop: 1234 }` - 默认行为 */
```

## 它如何处理循环引用?[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

循环引用被忽略。 例如，如果你要将包含属性`photos`的类`User`转换为`Photo`类型， 和`Photo`包含`user`到其父`user`的链接，那么`user`将在转换过程中被忽略。 循环引用只在`classToClass`有效。

## 在Angular2中使用[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

假设您想加载 `users` ，并希望他们自动映射到`User`类的实例。

```typescript
import { plainToClass } from 'class-transformer'; this.http .get('users.json') .map(res => res.json()) .map(res => plainToClass(User, res as Object[])) .subscribe(users => { // 现在`users`是User[]类型，每个用户都有getName()和isAdult()方法可用 console.log(users); });
```

您还可以将类`ClassTransformer` 作为服务注入到`providers`中，并使用它的方法。

示例:如何在[plunker](https://link.juejin.cn/?target=http%3A%2F%2Fplnkr.co%2Fedit%2FMja1ZYAjVySWASMHVB9R "http://plnkr.co/edit/Mja1ZYAjVySWASMHVB9R")中使用angular 2

源代码[在这里](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpleerock%2Fclass-transformer-demo "https://github.com/pleerock/class-transformer-demo")。

## 例子[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

查看[./sample](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpleerock%2Fclass-transformer%2Ftree%2Fmaster%2Fsample "https://github.com/pleerock/class-transformer/tree/master/sample")中的示例以获得更多示例 用法。

## 发行说明[⬆](https://juejin.cn/post/6904890590602330119#table-of-contents "#table-of-contents")

参见有关破坏更改的信息和发布说明[此处](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypestack%2Fclasstransformer%2Fblob%2Fmaster%2Fchangelog.md "https://github.com/typestack/classtransformer/blob/master/changelog.md")。