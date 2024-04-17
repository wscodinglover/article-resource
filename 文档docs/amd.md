## 简介

AMD 规范在这里：  
中文：[https://github.com/amdjs/amdjs-api/wiki/AMD-(中文版)](<https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)>)  
英文：[http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)

AMD 提出了一种基于模块的异步加载 JavaScript 代码的机制，它推荐开发人员将 JavaScript 代码封装进一个个模块，对全局对象的依 赖变成了对其他模块的依赖，无须再声明一大堆的全局变量。  
通过延迟和按需加载来解决各个模块的依赖关系。模块化的 JavaScript 代码好处很明显，各 个功能组件的松耦合性可以极大的提升代码的复用性、可维护性。  
这种非阻塞式的并发式快速加载 JavaScript 代码，使 Web 页面上其他不依赖 JavaScript 代码的 UI 元素，如图片、CSS 以及其他 DOM 节点得以先加载完毕，Web 页面加载速度更快，用户也得到更好的体验。

## CMD 推崇异步加载，遵循依赖前置(加载前置)(提前加载)

CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

```
// CMD
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
   //...
})
```

复制

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

## define 方法：定义模块

作为一个规范，只需定义其语法 API，而不关心其实现。CommonJS 的 AMD 规范中只定义了一个全局的方法，即`define`函数：

```
　define([module-name?], [array-of-dependencies?], [module-factory-or-object]);
```

复制

其中：

1.  `module-name`: 模块标识，为文件名（没有 js 后缀），可以省略。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
2.  `array-of-dependencies`:  
    是一个字符串 Array，表示该模块依赖的其他所有模块标识，模块依赖必须在真正执行具体的 factory 方法前解决，这 些依赖对象加载执行以后的返回值，可以以默认的顺序作为 factory 方法的参数。`array-of-dependencies` 也是可选参数，当用户不提供该参数时，实现 AMD 的框架应提供默认值为`[“require”，”exports”，“module”]`。所依赖的模块，可以省略。
3.  `module-factory-or-object`: 模块的实现，或者一个 JavaScript 对象。

`module-name` 遵循 [CommonJS Module Identifiers](http://wiki.commonjs.org/wiki/Modules/1.1.1#Module_Identifiers) 。array-of-dependencies 元素的顺序和 module-factory-or-object 参数一一对应。

从中可以看到，第一个参数和第二个参数都是可以省略的，第三个参数则是模块的具体实现本身。后面将介绍在不同的应用场景下，他们会使用不同的参数组合。

CommonJS 在规范中并没有详细规定其他的方法（只有 define 函数），一些主要的 AMD 框架如 RequireJS、curl、bdload 等都实现了 define 方法，同时各个框架都有自己的补充使得其 API 更实用。

## 加载模块的 require 方法（全局 require）

实际中，我们经常会遇到一些阻塞模块加载的依赖,如果交互次数很多，需要大量的模块加载，应该采用**全局依赖**的形式去加载顶层模块。

require 方法用于调用模块。它的参数与 define 方法类似。

```
require(['foo', 'bar'], function ( foo, bar ) {
        foo.doSomething();
});
```

复制

上面方法表示加载 foo 和 bar 两个模块，当这两个模块都加载成功后，执行一个回调函数。该回调函数就用来完成具体的任务。

require 方法的第一个参数，是一个表示依赖关系的数组。这个数组可以写得很灵活，请看下面的例子。

```
require( [ window.JSON ? undefined : 'util/json2' ], function ( JSON ) {
  JSON = JSON || window.JSON;
  console.log( JSON.parse( '{ "JSON" : "HERE" }' ) );
});
```

复制

上面代码加载 JSON 模块时，首先判断浏览器是否原生支持 JSON 对象。如果是的，则将 undefined 传入回调函数，否则加载 util 目录下的 json2 模块。  
require 方法也可以用在 define 方法内部。

```
define(function (require) {
   var otherModule = require('otherModule');
});
```

复制

下面的例子显示了如何动态加载模块。

```
define(function ( require ) {
    var isReady = false, foobar;

    require(['foo', 'bar'], function (foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });

    return {
        isReady: isReady,
        foobar: foobar
    };
});
```

复制

上面代码所定义的模块，内部加载了 foo 和 bar 两个模块，在没有加载完成前，isReady 属性值为 false，加载完成后就变成了 true。因此，可以根据 isReady 属性的值，决定下一步的动作。  
下面的例子是模块的输出结果是一个 promise 对象。

```
define(['lib/Deferred'], function( Deferred ){
    var defer = new Deferred();
    require(['lib/templates/?index.html','lib/data/?stats'],
        function( template, data ){
            defer.resolve({ template: template, data:data });
        }
    );
    return defer.promise();
});
```

复制

上面代码的 define 方法返回一个 promise 对象，可以在该对象的 then 方法，指定下一步的动作。  
如果服务器端采用 JSONP 模式，则可以直接在 require 中调用，方法是指定 JSONP 的 callback 参数为 define。

```
require( [
    "http://someapi.com/foo?callback=define"
], function (data) {
    console.log(data);
});
```

复制

require 方法允许添加第三个参数，即错误处理的回调函数。

```
require(
    [ "backbone" ],
    function ( Backbone ) {
        return Backbone.View.extend({ /* ... */ });
    },
    function (err) {
        // ...
    }
);
```

复制

require 方法的第三个参数，即处理错误的回调函数，接受一个 error 对象作为参数。  
require 对象还允许指定一个全局性的 Error 事件的监听函数。所有没有被上面的方法捕获的错误，都会被触发这个监听函数。

```
requirejs.onError = function (err) {
    // ...
};
```

复制

`define`和`require`在依赖处理和回调执行上都是一样的，不一样的地方是 define 的回调函数需要有 return 语句返回模块对象，这样`define`定义的模块才能被其他模块引用；`require`的回调函数不需要 return 语句。

## 局部 require

局部 require 可以被解析成一个符合 AMD 工厂函数规范的 require 函数。

例如：

```
define(['require'], function (require) {
// the require in here is a local require.
});

define(function (require, exports, module) {
// the require in here is a local require.
});
```

复制

局部 require 也支持其他标准实现的 API：

```
define( function( require ){
    var a = require('a'); // 加载模块a
} );

define( function( require ){
    require( ['a', 'b'], function( a,b ){ // 加载模块a b 使用
        // 依赖 a b 模块的运行代码
    } );
} );

define( function( require ){
    var temp = require.toUrl('./temp/a.html'); // 加载页面
} );

```

复制

## AMD 实例：如何定义一个模块

下面代码定义了一个 alpha 模块，并且依赖于内置的 require，exports 模块，以及外部的 beta 模块。可以看到，第三个参数是回调函数，可以直接使用依赖的模块，他们按依赖声明顺序作为参数提供给回调函数。

这里的 require 函数让你能够随时去依赖一个模块，即取得模块的引用，从而即使模块没有作为参数定义，也能够被使用；exports 是定义的 alpha 模块的实体，在其上定义的任何属性和方法也就是 alpha 模块的属性和方法。通过`exports.verb = ...`就是为 alpha 模块定义了一个`verb`方法。  
例子中是简单调用了模块 beta 的 verb 方法。

```
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
      exports.verb = function() {
      return beta.verb();
      //或者:
      return require("beta").verb();//require函数用来加载一个模块

      }
});
```

复制

## 实际应用

```
//定义M模块，本申明一个全局变量
define('M',[],function(){
    window.M={};
    return M;
})
//定义模块a 依赖模块 M,b,c
define('a',['M','b','c'],function(M){
    alert(M.ob);
    alert(M.oc);
})
//定义b模块
define('b',[],function(){
    M.ob = 2;
    return M;
})
//定义c模块
define('c',[],function(){
    M.oc = 3;
    return M;
})
//引入a模块
require(['a'],function(a){

})
```

复制

## CommonJS wrapping

其实是标准的 AMD 规范里面是完全兼容 CommonJs 的，AMD 本意是想统一前后端的，现在 AMD 一般在前端比较多。  
为了复用已有的 CommonJS 模块，AMD 规定了 [Simplified CommonJS wrapping](https://github.com/amdjs/amdjs-api/wiki/AMD#simplified-commonjs-wrapping-)，然后 RequireJS 实现了它（先后顺序不一定对）。它提供了类似于 CommonJS 的模块定义方式，如下：

```
define(function(require, exports, module) {
    var A = require('a');//就近定义

    return function () {};
});
```

复制

这样，模块的依赖可以像 CommonJS 一样「就近定义」。但就是这个看上去两全其美的做法，给大家带来了很多困扰。

### 困扰

```
//mod1.js
define(function() {
    console.log('require module: mod1');

    return {
        hello: function() {
            console.log("hello mod1");
        }
    };
});
JS
//mod2.js
define(function() {
    console.log('require module: mod2');

    return {
        hello: function() {
            console.log("hello mod2");
        }
    };
});

//main.js
define(function(require, exports, module) {//CommonJS写法
    //运行至此，mod1.js 和 mod2.js 已经下载完成；
    console.log('require module: main');

    var mod1 = require('./mod1'); //这里才执行 mod1 ？
    mod1.hello();
    var mod2 = require('./mod2'); //这里才执行 mod2 ？
    mod2.hello();

    return {
        hello: function() {
            console.log('hello main');
        }
    };
});
```

复制

CommonJS Wrapper 只是书写上兼容了 CommonJS 的写法，模块运行逻辑并不会改变。  
因为 main.js 中 mod1 和 mod2 两个模块并行加载，且加载完就执行，所以前两行输出顺序取决于哪个 js 先加载完。  
这种「就近」书写的依赖，非常容易让人认为 main.js 执行到对应 require 语句时才执行 mod1 或 mod2，但这是错误的，因为 CommonJS Wrapper 并不会改变 AMD「尽早执行」依赖的本质！  
实际上，对于按需执行依赖的加载器，如 [SeaJS](http://seajs.org/)，上述代码结果一定是：

```
require module: main
require module: mod1
hello mod1
require module: mod2
hello mod2
hello main
```

复制

于是，了解过 CommonJS 或 CMD 模块规范的同学，看到使用 CommonJS Wrapper 方式写的 AMD 模块，容易产生理解偏差，从而误认为 RequireJS 有 bug。  
我觉得「尽早执行」或「按需执行」两种策略没有明显的优劣之分，但 AMD 这种「模仿别人写法，却提供不一样的特性」这个做法十分愚蠢。

## 具体实现

[http://requirejs.org/](http://requirejs.org/)  
[https://github.com/cujojs/curl](https://github.com/cujojs/curl)

## 参考

[https://imququ.com/post/amd-simplified-commonjs-wrapping.html](https://imququ.com/post/amd-simplified-commonjs-wrapping.html)  
[https://github.com/amdjs/amdjs-api/wiki](https://github.com/amdjs/amdjs-api/wiki)  
[http://www.cnblogs.com/happyPawpaw/archive/2012/05/31/2528864.html](http://www.cnblogs.com/happyPawpaw/archive/2012/05/31/2528864.html)  
[http://www.jianshu.com/p/9b44a1fa8a96](http://www.jianshu.com/p/9b44a1fa8a96)

[使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](http://justineo.github.io/singles/writing-modular-js/)
