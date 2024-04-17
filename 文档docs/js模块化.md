CommonJS 是同步加载模块，但其实也有浏览器端的实现，其原理是现将所有模块都定义好并通过 id 索引，这样就可以方便的在浏览器环境中解析了，可以参考 require1k 和 tiny-browser-require 的源码来理解其解析（resolve）的过程。

类似的还有 CommonJS Modules/2.0 规范，是 [BravoJS](https://github.com/pinf/loader-js/blob/master/lib/pinf-loader-js/bravojs/bravo.js) 在推广过程中对模块定义的规范化产出。

CommonJS 就是为 JS 的表现来制定规范，因为 js 没有模块的功能所以 CommonJS 应运而生，它希望 js 可以在任何地方运行，不只是浏览器中。  
CommonJS 能有一定的影响力，我觉得绝对离不开 Node 的人气。  
Node，CommonJS，浏览器甚至是 W3C 之间有什么关系呢，图：

```
  |---------------浏览器-----------------------|     |--------------------------CommonJS----------------------------------|

  |  BOM  |        | DOM |      | ECMAScript |       | FS |      | TCP |     | Stream |    | Buffer |      |........|

  |-------W3C-----------|    |---------------------------------------Node--------------------------------------------------|
```

复制

CommonJS 定义的模块分为:

- 模块引用(`require`)
- 模块定义(`exports`)
- 模块标识(`module`)

`require()`用来引入外部模块；`exports`对象用于导出当前模块的方法或变量，唯一的导出口；`module`对象就代表模块本身。

比如说我们就可以这样用了：

```
  // sum.js
 module.exports = {sum: function(){...做加操作..}; } //或者 exports.sum = function(){...做加操作..};

 // calculate.js
  var math = require('sum');
  exports.add = function(n){
      return math.sum(val,n);
  };
```

复制

虽说 Node 遵循 CommonJS 的规范，但是相比也是做了一些取舍，填了一些新东西的。

不过，说了 CommonJS 也说了 Node，那么我觉得也得先了解下 NPM 了。NPM 作为 Node 的包管理器，不是为了帮助 Node 解决依赖包的安装问题嘛，那它肯定也要遵循 CommonJS 规范啦，它遵循包规范（还是理论）的。

[CommonJS WIKI](http://en.wikipedia.org/wiki/CommonJS) 讲了它的历史，还介绍了 modules 和 packages 等。

## AMD

由于一个重大的局限，使得 CommonJS 规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？

```
var math = require('math');
math.add(2, 3);
```

复制

第二行`math.add(2, 3)`，在第一行`require('math')`之后运行，因此必须等 math.js 加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。  
这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。  
因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是 AMD 规范诞生的背景。

CommonJS 是主要为了 JS 在后端的表现制定的，他是不适合前端的，为什么这么说呢？  
这需要分析一下浏览器端的 js 和服务器端 js 都主要做了哪些事，有什么不同了：

| 服务器端 JS            | 浏览器端 JS                                |
| ---------------------- | ------------------------------------------ |
| 相同的代码需要多次执行 | 代码需要从一个服务器端分发到多个客户端执行 |
| CPU 和内存资源是瓶颈   | 带宽是瓶颈                                 |
| 加载时从磁盘中加载     | 加载时需要通过网络加载                     |

于是乎，AMD (异步模块定义) 出现了，它就主要为前端 JS 的表现制定规范。

AMD 就只有一个接口：

```
define(id?,dependencies?,factory);
```

复制

它要在声明模块的时候制定所有的依赖 (dep)，并且还要当做形参传到 factory 中，像这样：

```
define(['dep1','dep2'],function(dep1,dep2){...});
```

复制

要是没什么依赖，就定义简单的模块，下面这样就可以啦：

```
 define(function(){
      var exports = {};
      exports.method = function(){...};
      return exports;
  });
```

复制

咦，这里有 define，把东西包装起来啦，那 Node 实现中怎么没看到有 define 关键字呢，它也要把东西包装起来呀，其实吧，只是 Node 隐式包装了而已.....

[RequireJS](http://requirejs.org/)和[curl.js](https://github.com/cujojs/curl)就是实现了 AMD 规范  
更让人混乱的是，RequireJS 在实现 AMD 的同时，还提供了一个 CommonJS 包裹，这样 CommonJS 模块可以几乎直接被 RequireJS 引入。

```
define(function(require, exports, module) {
var someModule = require('someModule'); // in the vein of node
exports.doSomethingElse = function() { return someModule.doSomething() + "bar"; };
});
```

复制

这有 AMD 的 WIKI 中文版，讲了很多蛮详细的东西，用到的时候可以查看：\[AMD 的 WIKI 中文版\]([https://github.com/amdjs/amdjs-api/wiki/AMD-(中文版)](<https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)>)

## [CMD](https://seajs.github.io/seajs/docs/#docs)

CMD 规范在这里：[https://github.com/seajs/seajs/issues/242](https://github.com/seajs/seajs/issues/242) ，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

（1）CMD 全称为 Common Module Definition，它是国内**玉伯**大神在开发 SeaJS 的时候提出来的。  
（2）CMD 与 AMD 挺相近，二者区别如下：

- 对于依赖的模块 CMD 是延迟执行，而 AMD 是提前执行（不过 RequireJS 从 2.0 开始，也改成可以延迟执行。 ）
- CMD 推崇 as lazy as possible（依赖就近），AMD 推崇依赖前置。
- AMD 的 api 默认是一个当多个用，CMD 严格的区分推崇职责单一，其每个 API 都简单纯粹。例如：AMD 里 require 分全局的和局部的。CMD 里面没有全局的 require，提供 seajs.use() 来实现模块系统的加载启动。

```
define(function(require,exports,module){
    //TODO...
    /**
    *
    * 一：使用 exports 暴露模块接口
        define(function(require, exports) {
            // 对外提供name属性
            exports.name = 'hangge';
            // 对外提供hello方法
            exports.hello = function() {
              console.log('Hello hangge.com');
            };
        });

       二：使用 modul.exports 暴露模块对象
       define(function(require, exports, module) {
         // 对外提供接口
            module.exports = {
                name: 'hangge',
                hello: function() {
                  console.log('Hello hangge.com');
                }
            };
        });
    *
    */

});
```

复制

前面说 AMD，说 RequireJS 实现了 AMD，CMD 看起来与 AMD 好像呀，那 RequireJS 与 SeaJS 像不像呢？  
虽然 CMD 与 AMD 蛮像的，但区别还是挺明显的，官方非官方都有阐述和理解，我觉得吧，说的都挺好：  
[官方阐述 SeaJS 与 RequireJS 异同](https://github.com/seajs/seajs/issues/277)

[SeaJS 与 RequireJS 的最大异同（这个说的也挺好）](http://www.douban.com/note/283566440/)

移动端加载：  
[mt.js](https://github.com/mtjs/mt)是手机腾讯网前端团队开发维护的一个专注于移动端的、带有增量更新特色的 js 模块管理框架

> 摘自：[http://www.cnblogs.com/skylar/p/4065455.html](http://www.cnblogs.com/skylar/p/4065455.html)

## UMD（Universal Module Definition）

官网：[https://github.com/umdjs/umd](https://github.com/umdjs/umd)

缺点：

1.  代码量。兼容需要额外的代码，而且是每个文件都要写这么一大段代码。
2.  代码合并。我没试过用 webpack 去合并代码，但明显 requireJS 的方法是合不了 UMD 的代码的。  
    在什么时候不应该使用 UMD 呢，就是独立项目里，一般独立项目不会向外界提供 API，所以一种模块定义方法就好。  
    如果是要做 UI 或 SDK 要用在多种环境下，可以选择 UMD，当然是选择，但不一定只能 UMD。  
    其实还可以通过脚本打包的方式按需求打包成不同的模块定义方式提供给其他人调用，这样可以减少代码，应该也可以顺利地合并了。

### 统一模块加载代码

我们除了提供 AMD 模块接口，CMD 模块接口，还得提供原生的 JS 接口。  
由于 CMD 和 AMD 都可以使用 `return` 来定义对外接口，故可以合并成一句代码。

一个直接可以用的代码如下：

```
;(function(){
    function MyModule() {
        // ...
    }

    var moduleName = MyModule;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return moduleName; });
    } else {
        this.moduleName = moduleName;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
});
```

复制

从 knockoutjs 源码中读到了一个很好的能兼容 AMD , commonjs 规范的模块定义：

```
//闭包执行一个立即定义的匿名函数
!function(factory) {
    // factory是一个函数，下面的koExports就是他的参数
    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        // [1] 支持在module.exports.abc,或者直接exports.abc
        var target = module['exports'] || exports; // module.exports is for Node.js
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        // [2] AMD anonymous module
        // [2] AMD 规范
        //define(['exports'],function(exports){
           //    exports.abc = function(){}
        //});
        define(['exports'], factory);
    } else {
        // [3] No module loader (plain <script> tag) - put directly in global namespace
        factory(window['ko'] = {});
    }
}(function(koExports){
    // ko 的全局定义 koExports 是 undefined 对应着上面的[3] 这种情况
    var ko = typeof koExports !== 'undefined' ? koExports : {};

    // 定义一个ko的方法
    ko.abc = function(s){
        alert(s);
    }
});

// [3]中情况的调用
ko.abc("msg");
```

复制

兼容 CommonJS 和 CMD(SeaJS) 规范的。例子：

```
;(function(factory) {
  // CommonJS/NodeJS
  if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") {
  factory(require, exports, module);
  }
  // CMD/SeaJS
  else if(typeof define === "function") {
  define(factory);
  }
  // No module loader
  else {
  factory(function(){}, window['idcard']={}, {});
  }

  }(function(require, exports, module) {
    // something...
  exports.hello = function() {
  return 'hello212';
  }

}));
```

复制

## commonjs

实现：

- 服务器端的 Node.js
- Browserify，浏览器端的 CommonJS 实现，可以使用 NPM 的模块，但是编译打包后的文件体积可能很大

服务器端的 Node.js 遵循 CommonJS 规范，在 ES6 标准发布后 module 成为标准。标准的使用 `export` 指令导出接口，以 import 引入模块，但是在我们一贯的 node 模块中，我们仍然采用 CommonJs 规范。  
nodejs v6+ 开始支持 90% 以上的 ES6，however，import 还暂不支持。

## ES6 Import

[ES Modules in Node Today!](https://blogs.windows.com/msedgedev/2017/08/10/es-modules-node-today/)

2015 年 6 月， ES2015（即 ECMAScript 6、ES6） 正式发布。ES2015 是该语言的一个显著更新，也是自 2009 年 ES5 标准确定后的第一个重大更新。  
虽然 ES2015 提出了许多令人激动的新特性，但由于目前 JavaScript 的运行环境众多，对 ECMAScript 标准的支持程度也不一样。

## ES2015 的模块规范

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。  
`export` 命令用于规定模块的对外接口。  
`import` 命令用于输入其他模块提供的功能。  
ES6 模块的设计思想是尽量的静态化，**使得编译时就能确定模块的依赖关系，以及输入和输出的变量**。

## 使用 export 命令规定对外接口

（1）下面我们在 Node.js 中创建一个模块，文件名为：hangge.js

```
//圆面积计算
export function area(radius) {
  return Math.PI * radius * radius;
}

//圆周长计算
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

复制

（2）创建一个 main.js 文件，引入这个模块并调用。这里 `import` 命令使用大括号的形式加载模块对外的接口。

```
import {area,circumference} from './hangge';
console.log('圆面积：' + area(10));
console.log('圆周长：' + circumference(11));
```

复制

当然也可以使用星号（\*）指定一个对象，实现模块的整体加载。

```
import * as circle from './hangge';
console.log('圆面积：' + circle.area(10));
console.log('圆周长：' + circle.circumference(11));
```

复制

## 参考

[javascript 模块化之 CommonJS、AMD、CMD、UMD、ES6](http://blog.csdn.net/Real_Bird/article/details/54869066)  
[http://www.cnblogs.com/zzsdream/p/5158968.html](http://www.cnblogs.com/zzsdream/p/5158968.html)
