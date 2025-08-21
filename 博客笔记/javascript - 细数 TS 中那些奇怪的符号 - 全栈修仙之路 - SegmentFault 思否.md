[TypeScript](https://link.segmentfault.com/?enc=hkvFjgKHrX8Q5HYgonjjDA%3D%3D.KuJV8nPS8Gsdi58xzw5r7ggs0ATamTYvuvCqBAQsrDY%3D) 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

本文阿宝哥将分享这些年在学习 TypeScript 过程中，遇到的 10 大 “奇怪” 的符号。其中有一些符号，阿宝哥第一次见的时候也觉得 “一脸懵逼”，希望本文对学习 TypeScript 的小伙伴能有一些帮助。

好的，下面我们来开始介绍第一个符号 —— **! 非空断言操作符**。

### 一、! 非空断言操作符

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined 。**

那么非空断言操作符到底有什么用呢？下面我们先来看一下非空断言操作符的一些使用场景。

#### 1.1 忽略 undefined 和 null 类型

```typescript
function myFunc(maybeString: string | undefined | null) {
  
  
  const onlyString: string = maybeString; 
  const ignoreUndefinedAndNull: string = maybeString!; 
}
```

```typescript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  
  
  const num1 = numGenerator(); 
  const num2 = numGenerator!(); 
}
```

```typescript
const a: number | undefined = undefined;
const b: number = a!;
console.log(b); 
```

```javascript
"use strict";
const a = undefined;
const b = a;
console.log(b);
```

### 二、?. 运算符

TypeScript 3.7 实现了呼声最高的 ECMAScript 功能之一：可选链（Optional Chaining）。有了可选链后，我们编写代码时如果遇到 `null` 或 `undefined` 就可以立即停止某些表达式的运行。可选链的核心是新的 `?.` 运算符，它支持以下语法：

> ```scss
> obj?.prop
> obj?.[expr]
> arr?.[index]
> func?.(args)
> ```

这里我们来举一个可选的属性访问的例子：

```typescript
const val = a?.b;
```

```javascript
var val = a === null || a === void 0 ? void 0 : a.b;
```

```typescript
if(a && a.b) { } 

if(a?.b){ }
```

#### 2.1 可选元素访问

可选链除了支持可选属性的访问之外，它还支持可选元素的访问，它的行为类似于可选属性的访问，只是可选元素的访问允许我们访问非标识符的属性，比如任意字符串、数字索引和 Symbol：

```typescript
function tryGetArrayElement<T>(arr?: T[], index: number = 0) {
  return arr?.[index];
}
```

```javascript
"use strict";
function tryGetArrayElement(arr, index) {
    if (index === void 0) { index = 0; }
    return arr === null || arr === void 0 ? void 0 : arr[index];
}
```

#### 2.2 可选链与函数调用

当尝试调用一个可能不存在的方法时也可以使用可选链。在实际开发过程中，这是很有用的。系统中某个方法不可用，有可能是由于版本不一致或者用户设备兼容性问题导致的。函数调用时如果被调用的方法不存在，使用可选链可以使表达式自动返回 `undefined` 而不是抛出一个异常。

可选调用使用起来也很简单，比如：

```typescript
let result = obj.customMethod?.();
```

```javascript
var result = (_a = obj.customMethod) === null
  || _a === void 0 ? void 0 : _a.call(obj);
```

-   如果存在一个属性名且该属性名对应的值不是函数类型，使用 `?.` 仍然会产生一个 [`TypeError`](https://link.segmentfault.com/?enc=G37f8d7tRxWfwynET5HyNQ%3D%3D.T1Sn5KOSqH7FXBVfRkrSM6C1oJIewrCpk3g9Jrch3%2Fi5hoNsU16lpP5NQ7VP38dfoqsQLEVdEWxy7qiab0%2F%2Fcz6wRKdaLmWW2LGpJXO7jqmBoIZK7B%2Bb2Ag12rm4DAdg) 异常。
-   可选链的运算行为被局限在属性的访问、调用以及元素的访问 —— 它不会沿伸到后续的表达式中，也就是说可选调用不会阻止 `a?.b / someMethod()` 表达式中的除法运算或 `someMethod` 的方法调用。

### 三、?? 空值合并运算符

在 TypeScript 3.7 版本中除了引入了前面介绍的可选链 `?.` 之外，也引入了一个新的逻辑运算符 —— 空值合并运算符 `??`。**当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数**。

与逻辑或 `||` 运算符不同，逻辑或会在左操作数为 falsy 值时返回右侧操作数。也就是说，如果你使用 || 来为某些变量设置默认的值时，你可能会遇到意料之外的行为。比如为 falsy 值（''、NaN 或 0）时。

这里来看一个具体的例子：

```typescript
const foo = null ?? 'default string';
console.log(foo); 

const baz = 0 ?? 42;
console.log(baz); 
```

```java
"use strict";
var _a, _b;
var foo = (_a = null) !== null && _a !== void 0 ? _a : 'default string';
console.log(foo); 

var baz = (_b = 0) !== null && _b !== void 0 ? _b : 42;
console.log(baz); 
```

#### 3.1 短路

当空值合并运算符的左表达式不为 `null` 或 `undefined` 时，不会对右表达式进行求值。

```javascript
function A() { console.log('A was called'); return undefined;}
function B() { console.log('B was called'); return false;}
function C() { console.log('C was called'); return "foo";}

console.log(A() ?? C());
console.log(B() ?? C());
```

```shell
A was called 
C was called 
foo 
B was called 
false 
```

若空值合并运算符 `??` 直接与 AND（&&）和 OR（||）操作符组合使用 ?? 是不行的。这种情况下会抛出 SyntaxError。

```typescript
null || undefined ?? "foo"; 


true && undefined ?? "foo"; 
```

```typescript
(null || undefined ) ?? "foo"; 
```

空值合并运算符针对 undefined 与 null 这两个值，可选链式操作符 `?.` 也是如此。可选链式操作符，对于访问属性可能为 undefined 与 null 的对象时非常有用。

```typescript
interface Customer {
  name: string;
  city?: string;
}

let customer: Customer = {
  name: "Semlinker"
};

let customerCity = customer?.city ?? "Unknown city";
console.log(customerCity); 
```

### 四、?: 可选属性

在面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类去实现。 **TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述**。

在 TypeScript 中使用 `interface` 关键字就可以声明一个接口：

```typescript
interface Person {
  name: string;
  age: number;
}

let semlinker: Person = {
  name: "semlinker",
  age: 33,
};
```

```typescript
let lolo: Person  = { 
  name: "lolo"  
}
```

```typescript
interface Person {
  name: string;
  age?: number;
}

let lolo: Person  = {
  name: "lolo"  
}
```

##### 4.1.1 `Partial<T>`

在实际项目开发过程中，为了提高代码复用率，我们可以利用 TypeScript 内置的工具类型 `Partial<T>` 来快速把某个接口类型中定义的属性变成可选的：

```typescript
interface PullDownRefreshConfig {
  threshold: number;
  stop: number;
}

 
type PullDownRefreshOptions = Partial<PullDownRefreshConfig>
```

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

既然可以快速地把某个接口中定义的属性全部声明为可选，那能不能把所有的可选的属性变成必选的呢？答案是可以的，针对这个需求，我们可以使用 `Required<T>` 工具类型，具体的使用方式如下：

```typescript
interface PullDownRefreshConfig {
  threshold: number;
  stop: number;
}

type PullDownRefreshOptions = Partial<PullDownRefreshConfig>


type PullDownRefresh = Required<Partial<PullDownRefreshConfig>>
```

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### 五、& 运算符

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 `&` 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```typescript
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```

#### 5.1 同名基础类型属性的合并

那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：

```typescript
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
```

```typescript
p = { c: 6, d: "d", e: "e" }; 
```

```typescript
q = { c: "c", d: "d", e: "e" }; 
```

为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 `never` 呢？这是因为混入后成员 c 的类型为 `string & number`，即成员 c 的类型既可以是 `string` 类型又可以是 `number` 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 `never`。

#### 5.2 同名非基础类型属性的合并

在上面示例中，刚好接口 X 和接口 Y 中内部成员 c 的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：

```typescript
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);
```

![](https://segmentfault.com/img/remote/1460000023943957)

由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。

### 六、| 分隔符

在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的一种，联合类型使用 `|` 分隔每个类型。联合类型通常与 `null` 或 `undefined` 一起使用：

```typescript
const sayHello = (name: string | undefined) => {  };
```

```typescript
sayHello("semlinker");
sayHello(undefined);
```

```typescript
let num: 1 | 2 = 1;
type EventNames = 'click' | 'scroll' | 'mousemove';
```

#### 6.1 类型保护

当使用联合类型时，我们必须尽量把当前值的类型收窄为当前值的实际类型，而类型保护就是实现类型收窄的一种手段。

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数字。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。

目前主要有四种的方式来实现类型保护：

##### 6.1.1 in 关键字

```typescript
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

##### 6.1.3 instanceof 关键字

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  
}
```

```typescript
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

TypeScript 2.7 带来了对数字分隔符的支持，正如数值分隔符 ECMAScript 提案中所概述的那样。对于一个数字字面量，你现在可以通过把一个下划线作为它们之间的分隔符来分组数字：

```typescript
const inhabitantsOfMunich = 1_464_301;
const distanceEarthSunInKm = 149_600_000;
const fileSystemPermission = 0b111_111_000;
const bytes = 0b1111_10101011_11110000_00001101;
```

```typescript
"use strict";
var inhabitantsOfMunich = 1464301;
var distanceEarthSunInKm = 149600000;
var fileSystemPermission = 504;
var bytes = 262926349;
```

虽然数字分隔符看起来很简单，但在使用时还是有一些限制。比如你只能在两个数字之间添加 `_` 分隔符。以下的使用方式是非法的：

```typescript
3_.141592 
3._141592 


1_e10 
1e_10 


_126301  

126301_ 



0_b111111000 


0b_111111000 
```

```typescript
123__456 
```

此外，需要注意的是以下用于解析数字的函数是不支持分隔符：

-   `Number()`
-   `parseInt()`
-   `parseFloat()`

这里我们来看一下实际的例子：

```javascript
Number('123_456')
NaN
parseInt('123_456')
123
parseFloat('123_456')
123
```

```javascript
const RE_NON_DIGIT = /[^0-9]/gu;

function removeNonDigits(str) {
  str = str.replace(RE_NON_DIGIT, '');
  return Number(str);
}
```

```javascript
removeNonDigits('123_456')
123456
removeNonDigits('149,600,000')
149600000
removeNonDigits('1,407,836')
1407836
```

#### 8.1 TypeScript 断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

类型断言有两种形式：

##### 8.1.1 “尖括号” 语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

对于刚接触 TypeScript 泛型的读者来说，首次看到 `<T>` 语法会感到陌生。其实它没有什么特别，就像传递参数一样，我们传递了我们想要用于特定函数调用的类型。

![](https://segmentfault.com/img/remote/1460000023858359)

参考上面的图片，当我们调用 `identity<Number>(1)` ，`Number` 类型就像参数 `1` 一样，它将在出现 `T` 的任何位置填充该类型。图中 `<T>` 内部的 `T` 被称为类型变量，它是我们希望传递给 identity 函数的类型占位符，同时它被分配给 `value` 参数用来代替它的类型：此时 `T` 充当的是类型，而不是特定的 Number 类型。

其中 `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

-   K（Key）：表示对象中的键类型；
-   V（Value）：表示对象中的值类型；
-   E（Element）：表示元素类型。

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 `U`，用于扩展我们定义的 `identity` 函数：

```typescript
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));
```

除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：

```typescript
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));
```

### 九、@XXX 装饰器

#### 9.1 装饰器语法

对于一些刚接触 TypeScript 的小伙伴来说，在第一次看到 `@Plugin({...})` 这种语法可能会觉得很惊讶。其实这是装饰器的语法，装饰器的本质是一个函数，通过装饰器我们可以方便地定义与对象相关的元数据。

```typescript
@Plugin({
  pluginName: 'Device',
  plugin: 'cordova-plugin-device',
  pluginRef: 'device',
  repo: 'https://github.com/apache/cordova-plugin-device',
  platforms: ['Android', 'Browser', 'iOS', 'macOS', 'Windows'],
})
@Injectable()
export class Device extends IonicNativePlugin {}
```

```javascript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Device =  (function (_super) {
    __extends(Device, _super);
    function Device() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Device = __decorate([
        Plugin({
            pluginName: 'Device',
            plugin: 'cordova-plugin-device',
            pluginRef: 'device',
            repo: 'https://github.com/apache/cordova-plugin-device',
            platforms: ['Android', 'Browser', 'iOS', 'macOS', 'Windows'],
        }),
        Injectable()
    ], Device);
    return Device;
}(IonicNativePlugin));
```

#### 9.2 装饰器的分类

在 TypeScript 中装饰器分为类装饰器、属性装饰器、方法装饰器和参数装饰器四大类。

##### 9.2.1 类装饰器

类装饰器声明：

```typescript
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
```

-   target: TFunction - 被装饰的类

看完第一眼后，是不是感觉都不好了。没事，我们马上来个例子：

```typescript
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); 
```

> 友情提示：读者可以直接复制上面的代码，在 [TypeScript Playground](https://link.segmentfault.com/?enc=hW1wFWWOlptgYq23ZNhu%2BQ%3D%3D.E1wX3ouSIHvtHEpfoNVO8nGMlXli0AFFa%2BN47xF9chSEVCcwHGkVRzQqYKR8d%2FW3) 中运行查看结果。

##### 9.2.2 属性装饰器

属性装饰器声明：

```typescript
declare type PropertyDecorator = (target:Object, 
  propertyKey: string | symbol ) => void;
```

-   target: Object - 被装饰的类
-   propertyKey: string | symbol - 被装饰类的属性名

趁热打铁，马上来个例子热热身：

```typescript
function logProperty(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true
  });

  
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Person { 
  @logProperty
  public name: string;

  constructor(name : string) { 
    this.name = name;
  }
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";
```

```arcade
Set: name => semlinker
Set: name => kakuqo
```

方法装饰器声明：

```typescript
declare type MethodDecorator = <T>(target:Object, propertyKey: string | symbol,          
  descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;
```

-   target: Object - 被装饰的类
-   propertyKey: string | symbol - 方法名
-   descriptor: TypePropertyDescript - 属性描述符

废话不多说，直接上例子：

```typescript
function LogOutput(tarage: Function, key: string, descriptor: any) {
  let originalMethod = descriptor.value;
  let newMethod = function(...args: any[]): any {
    let result: any = originalMethod.apply(this, args);
    if(!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameters: args,
      output: result,
      timestamp: new Date()
    });
    return result;
  };
  descriptor.value = newMethod;
}

class Calculator {
  @LogOutput
  double (num: number): number {
    return num * 2;
  }
}

let calc = new Calculator();
calc.double(11);

console.log(calc.loggedOutput); 
```

参数装饰器声明：

```typescript
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, 
  parameterIndex: number ) => void
```

-   target: Object - 被装饰的类
-   propertyKey: string | symbol - 方法名
-   parameterIndex: number - 方法中参数的索引值

```typescript
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
    been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
    this.greeting = phrase; 
  }
}


```

在 TypeScript 3.8 版本就开始支持 **ECMAScript 私有字段**，使用方式如下：

```typescript
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

let semlinker = new Person("Semlinker");

semlinker.#name;


```

-   私有字段以 `#` 字符开头，有时我们称之为私有名称；
-   每个私有字段名称都唯一地限定于其包含的类；
-   不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
-   私有字段不能在包含的类之外访问，甚至不能被检测到。

#### 10.1 私有字段与 private 的区别

说到这里使用 `#` 定义的私有字段与 `private` 修饰符定义字段有什么区别呢？现在我们先来看一个 `private` 的示例：

```typescript
class Person {
  constructor(private name: string){}
}

let person = new Person("Semlinker");
console.log(person.name);
```

```delphi
Property 'name' is private and only accessible within class 'Person'.(2341)
```

```javascript
console.log((person as any).name);
```

```javascript
var Person =  (function () {
    function Person(name) {
      this.name = name;
    }
    return Person;
}());

var person = new Person("Semlinker");
console.log(person.name);
```

```javascript
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
```

```javascript
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) 
  || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) 
  || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};

var _name;
class Person {
    constructor(name) {
      _name.set(this, void 0);
      __classPrivateFieldSet(this, _name, name);
    }
    greet() {
      console.log(`Hello, my name is ${__classPrivateFieldGet(this, _name)}!`);
    }
}
_name = new WeakMap();
```

### 十一、参考资源

-   [ES proposal: numeric separators](https://link.segmentfault.com/?enc=hYJprkmlssEpDBwOdBR8TA%3D%3D.8%2B5jpeBaFrMuMLh39xmc5%2F3HD2ZCZXkx%2FD8jDj%2F29jLZjMLG0%2B6%2BvzOBmtS4lxXE9WtbZnFqJk%2FdX2XG%2B8%2FjWw%3D%3D)
-   [typescriptlang.org](https://link.segmentfault.com/?enc=rcjDXUD5Vx992Drp%2Bx4C7g%3D%3D.1gEqkv7xC2z5JxUncaVpUdrmgeIcMb5oBOZ8bxfeIIY%3D)

### 十二、推荐阅读

-   [了不起的 TypeScript 入门教程](https://link.segmentfault.com/?enc=fggFrRw9vauGOlX4ck2LcA%3D%3D.zIok70NwU03HwFo%2F510wlitw2OmaS0%2Fjs%2FbgtzTPo9WB%2BEANmG%2FN2bBDag7pI68W)
-   [一文读懂 TypeScript 泛型及应用](https://link.segmentfault.com/?enc=JldzcCvSBXC6u%2FFEikd4sA%3D%3D.lD64M%2FGvQNSy114nuZDbd55d8J6kK1s0Y25jiEnQi4yg3EZ1lsPQlOLNgkhYTGNw)
-   [你不知道的 WebSocket](https://link.segmentfault.com/?enc=ti54FcmvNS%2Bn%2BRZoVenXDA%3D%3D.QDHrBcG07NxyprNZoIvhf%2BK7navGDn7uAgAQ%2FIF5uYKkHd1dXdaOvvOQOOfv3LYlw0LnOWsyOJ01UCSwlz%2F1fw%3D%3D)
-   [你不知道的 Blob](https://link.segmentfault.com/?enc=aq0wAIzxH%2FgJR6qzmc8rrA%3D%3D.0ZyZsqI0XXZiu3vqgnioy%2BNUTMLAF07jq5j0wtzOiYDSDbJtRyfBdd7m9gP%2BP6Pc)
-   [你不知道的 WeakMap](https://link.segmentfault.com/?enc=rMWrCfCf7EKTyhadhNC12A%3D%3D.oADyDayUdh1ywXIn5tM8kqOlKJAxnyhs63A%2BcaXdgOvH8q1WzXbdXheJmFQ2rHgO)