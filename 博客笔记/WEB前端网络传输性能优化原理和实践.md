摘要：通过使用网站的性能检测工具Lighthouse和Performance对网站的检测和问题梳理，针对性的分析问题产生的原因和设计合理的解决方案，并深入解析缓存策略、资源合并和压缩、图片资源优化、CDN加速和HTTP/2协议等方案的设计原理

关键词：性能优化  大前端  CDN  Lighthouse  Web  Nginx  HTTP/2

引言：随着业务的快速发展，Web前端网络传输性能优化显得尤为重要。本课程将深入探讨缓存策略、资源合并和压缩、图片资源优化、CDN加速和HTTP/2协议以及性能检测工具等方面的优化方法，帮助大家了解如何提高网站的访问速度和用户体验。

根据Aberdeen Group的调研，即时的网站响应会导致更高的转化率，页面加载每延迟1秒就会降低16%的客户满意度、11%的页面浏览量和7%的转化率 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/1xUYeuI4oKmrXpNp0c96c2S8LSn2tqfwrg8VbYFUp6ds9Q6bAmkYUp7foicdON75LKXwBO3OJibIBY80RvxyicsLA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

添加图片注释，不超过 140 字（可选）

如电商平台存在大量的图文资源，尤为重视传输过程中的性能优化；

在开始介绍网络传输性能优化之前，我们需要先了解浏览器与服务器处理用户请求的过程，以下是navigation timing监测指标图：https://www.w3.org/TR/navigation-timing/

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

从图中可以看出，浏览器在收到用户请求后，需要经历多个阶段才能完成页面的加载。这些阶段包括重定向、拉取缓存、DNS查询、建立TCP连接、发起请求、接收响应、处理HTML元素和加载元素。基于这些阶段，我们可以采取一些措施来提高网络传输过程中的性能。

一、缓存策略

1、浏览器缓存机制

浏览器缓存也称为HTTP缓存，是一种将网站资源存储在浏览器缓存中以便快速访问的技术。通过设置HTTP缓存头，我们可以控制浏览器缓存的内容和时间。例如，我们可以设置Cache-Control头来指定资源的缓存时间，或者设置ETag头来验证资源的有效性。这些技术可以帮助我们减少重复请求的次数，从而提高网站的响应速度。

-   减少网络带宽消耗；
    
-   降低服务器压力；
    
-   减少网络延迟，加快页面打开速度用户操作行为与缓存。
    

1.1 内存和硬盘存储

Memory Cache：浏览器内存，访问速度快，也会在网页关闭或者内存占用过大时缓存释放，优先级高，纳秒级；

Disk Cache：磁盘缓存，速度比Memory Cache慢，存储空间大，时效长，10毫秒级；

1.2 强制缓存

用户请求数据，如果命中了缓存且缓存没有失效，则不向服务端请求数据，而直接从本地资源获取。

用户请求数据，如果命中了缓存且缓存失效，会向服务器重新请求资源，资源返回后，再次根据缓存规则存入浏览器缓存。

强制缓存的 response header中有两个字段表明失效规则（Expires/ Cache-Control）;

Expires：Expires的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。不过Expires 是HTTP 1.0的规则，现在浏览器默认使用HTTP 1.1，有的使用http/2，所以它的作用除兼容外，基本忽略。另外，到期时间是由服务端生成的，但是客户端时间可能跟服务端时间有误差，这就会导致缓存命中的误差。 所以HTTP 1.1 的版本，使用Cache-Control替代。

Cache-Control：Cache-Control 是最重要的规则。常见的取值有public、private、no-cache、max-age、no-store;

-   public: 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容;
    
-   private: 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容，比如：对应用户的本地浏览器;
    
-   no-cache: 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证);
    
-   no-store: 缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存;
    

Expires 和 Cache-Control 的区别：

-   Expires是http1.0规定的，而Cache-Control是http1.1规定的；
    
-   Expires的过期时间采用的是绝对时间，容易造成差错； 而Cache-Control的过期时间采用的时相对时间，在缓存上不会出现问题；
    
-   两者可以同时存在于一次请求中，但是不会同时在一次请求中起作用。 在HTTP1.0的环境下，Cache-Control不起作用，Expires起作用； 在HTTP1.1的环境之下， Expires不起作用，而Cache-Control起作用。当前一般都是http1.1的情况，所以Expires是作为一种向下兼容的形式而存在的；
    

1.3 协商缓存

用户请求数据，浏览器直接向服务器发送请求，协商对比服务器端和本地的资源，验证本地资源是否有效。协商缓存一般是使用 if-modified-since/Last-Modified 和 if-none-match/Etag 由服务器来决定浏览器缓存的资源是否可以使用。

Last-Modified / If-Modified-Since：

-   Last-Modified：服务器响应请求时，告诉浏览器资源最后的修改时间。
    
-   If-Modified-Since：浏览器再次请求资源时，浏览器通知服务器，上次请求时，返回的资源最后修改时间。
    

若最后修改时间小于等于If-Modified-Since，则response header返回304，告知浏览器继续使用所保存的cache。若大于If-Modified-Since，则说明资源被改动过，返回状态码200；

If-none-match / Etag：

-   Etag：服务器响应请求时，告诉浏览器当前资源在浏览器的唯一标识（生成规则由服务器确定）；
    
-   If-None-Match：再次请求服务器时，通过此字段通知服务器客户端缓存数据的唯一标识。服务器收到请求后发现有If-None-Match 则与被请求资源的唯一标识进行比对，不同，说明资源又被改动过，则响应整片资源内容，返回状态码200；相同，说明资源无新修改，则响应HTTP 304，告知浏览器继续使用所保存的cache。
    

Etag 与 Last-Modified 对比：

-   在精确度上，Etag优于Last-Modified。Last-Modified精确到秒，但1s内，资源多次改变，Etag是可以判断出来并返回最新的资源;
    
-   在性能上，Last-Modified优于Etag，因为Last-Modified只需要记录时间，而Etag需要服务器重新生成hash值，所以性能上略差;
    
-   在优先级上，Etag优于Last-Modified，Etag和Last-Modified可同时存在。本地缓存时间到期后，浏览器向服务端发送请求报文，其中Request Header中包含If-none-match和Last-Modified-Since（与服务端Etag和Last-Modified对比，Etag优先级高），用以验证本地缓存数据验证是否与服务端保持一致。在服务器端会优先判断Etag。如果相同，返回304；如果不同，就继续比较Last-Modified，然后决定是否返回新的资源。若服务端验证本地缓存与服务端一致，返回304，浏览器加载本地缓存；否则，服务器返回请求的资源，同时给出新的Etag以及Last-Modified时间;
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

1.4 DNS Prefetch 和Preload

DNS Prefetch是一种通过浏览器预解析域名并缓存结果，以减少后续DNS解析请求的技术。它可以缩短DNS解析时间，提高网站的访问速度。在HTTP/1.1中，可以使用DNS-Prefetch来减少DNS的请求次数；而在HTTP/2中，可以使用Server Push技术来实现多路复用。DNS Prefetch现已被主流浏览器支持，并且大多数浏览器针对DNS解析都进行了优化，典型的一次DNS解析会耗费20~120ms。减少DNS解析时间和次数是网站性能优化的重要措施之一。

这将告诉浏览器在页面加载时预先解析所有与example.com相关的域名，以便在需要时可以更快地获取它们。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

preload是CSS3中的一个新属性，它允许在页面加载时预加载资源，以提高页面加载速度。使用preload属性，你可以指定要预加载的资源，以及何时应该开始预加载它们。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

1.5 实践案例应用

缓存的关系，通过nginx强制对入口文件html进行缓存管理，每次拉去服务器最新资源，通过检测其他资源的版本情况，配合协商缓存完成对文件的适时及时更新。

部分预加载的资源可以添加Prefetch/DNS-Prefetch、preload等，提高加载速度；

以下是20MB带宽的网速下访问缓存情况：

首次请求：入口文件和其他资源文件依次按照依赖关系从服务器请求；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

再次请求：除入口文件从服务器请求（随时获取服务器最新入口文件），其余依赖文件分别从 Memory Cache 和 Disk Cache 中获取；

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

2 服务端缓存机制

相对于前端来说，服务器端的提供给前端的缓存机制，更倾向理解为接口请求不经常变更的查询结果。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

3 代理服务器缓存机制，即CDN缓存

用户访问资源过程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

CDN服务器与源站点示意图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

用户访问资源时序关系：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

用户访问资源流程图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

二、资源合并和压缩

1 静态资源压缩

压缩HTML、CSS和JavaScript代码，去除注释、空格、不必要的代码片段，使用简短、高效的代码语句。压缩的工具很多，常用的打包工具（Gulp、Grunt、Webpack、vite等）均具备相关插件。

2 资源合并

手动根据业务，合并多个CSS/JavaScript文件，减少HTTP请求次数，降低页面加载时间。

除手动在项目代码层面做文件的合并优化外，也可以使用CDN的Combo服务。Combo 是 CDN 的一项技术，它的核心是把对静态资源文件们的多次请求合并到一起，达到请求一次 URL（减少了请求次数），就可以同时获取多个静态文件的目的。以下是参考代码：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

3 资源按需加载

按需加载js/css，减少不必要文件加载，通过设置路由的懒加载，来按页面需求来进行资源的获取和使用；

4 资源Gzip压缩

通过设置Nginx配置，使用Gzip压缩HTML、CSS和JavaScript等文件，减小文件体积，加速文件传输。

步骤如下：

安装Gzip模块：在Nginx的编译安装过程中，需要添加--with-http\_gzip\_static\_module参数，以启用Gzip静态文件模块。

配置Nginx：编辑Nginx的配置文件（通常位于/etc/nginx/nginx.conf），在http块中添加以下代码：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

上述代码中，gzip on表示启用Gzip压缩功能，gzip\_disable "msie6";禁用与Internet Explorer 6不兼容的压缩算法。根据实际需求，可以根据需要调整其他参数。

重启Nginx服务：完成配置后，执行以下命令重启Nginx服务使配置生效：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

通过以上步骤，你可以使用Gzip压缩技术来优化HTML、CSS和JavaScript文件的传输，从而减小文件体积并加速文件传输过程。

表现结果：流量减小，时间减小、速度变快，算力增加。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

HTTP压缩过程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

5 接口内容压缩

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding

HTTP 请求头 Accept-Encoding 会将客户端能够理解的内容编码方式——通常是某种压缩算法——进行通知（给服务端）。通过内容协商的方式，服务端会选择一个客户端提议的方式，使用并在响应头 Content-Encoding 中通知客户端该选择。

即使客户端和服务器都支持相同的压缩算法，在 identity 指令可以被接受的情况下，服务器也可以选择对响应主体不进行压缩。导致这种情况出现的两种常见的情形是：

要发送的数据已经经过压缩，再次进行压缩不会导致被传输的数据量更小。一些图像格式的文件会存在这种情况；

服务器超载，无法承受压缩需求导致的计算开销。通常，如果服务器使用超过 80% 的计算能力，微软建议不要压缩。

表现结果：流量减小，时间减小、速度变快，算力增加，单次Gzip过程基本都在几毫秒。

接口内容Gzip压缩过程：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

接口内容压缩前的体积和请求时间：20MB带宽的网速下访问

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

接口内容压缩后的体积和请求时间：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

三、图片资源优化

1、OSS

OSS是Object Storage Service的缩写，即对象存储服务。它是一种海量、安全、低成本、高可靠，使用HTTP API存储和检索非结构化数据和元数据对象的云存储服务工具。可以通过文件URL、API、SDK对OSS内图片进行处理，包括格式转换、缩放、裁剪、旋转、添加水印等各种操作。使用OSS存储图片可以帮助你节省服务器空间和带宽。此外，对象存储OSS具有读写速度快、利于分享等特点。

2、图片压缩

除OSS外，CDN也可以做压缩、转换、缩放、裁剪、旋转、添加水印等各种操作；

源站原图加载：20MB带宽的网速下访问

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

开启CDN原图加载：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

通过CDN进行无损压缩后：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

注意：经过CDN压缩的图片不要进行Gzip压缩，此时的图片内容已经不能被压缩了，除了增加额外的CPU开销外，还会增加文件的大小，效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

3、图片格式化

除gif图外，利用CDN或者服务的能力，将一般格式的图片（png、jpg等）转化成webp、avif格式等。

以下是部分图片的转换之后的size和缩减的百分比：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

开启CDN原图加载：20MB带宽的网速下访问

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

转码前图片响应头：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

通过CDN进行转码后：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

4、实践案例应用

源站原图加载：20MB带宽的网速下访问

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

开启CDN原图加载：20MB带宽的网速下访问

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

开启CDN压缩和转码后：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

开启CDN压缩、CDN转码后响应头：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

综上所述，在20M网速下，用户从客户端直接访问OSS源站需要3.1秒（图片体积5.1MB），直接访问CDN需要1.48秒（不压缩、不转码），直接访问CDN仅压缩需要94毫秒，直接访问CDN仅转码需要1.21秒，访问CDN且压缩和转码耗时77毫秒（图片体积444KB），相较于访问OSS源站速度提升40倍，体积减少91.5%。大幅度提升网络访问速度，减少流量开销。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

四、CDN加速和HTTP/2

1、CDN加速

CDN加速是一种通过在多个地点部署服务器来缓存和分发内容的技术。它将资源缓存至全球的CDN节点上，使用户能够就近获取所需内容，并避免网络拥塞带来的延迟和故障。除此之外，CDN还提供以下加速方式：

-   缓存：将资源缓存到CDN节点上，以便快速响应用户请求。
    
-   负载均衡：将请求分配到最近的CDN节点上，以减少延迟和故障。
    
-   压缩：压缩资源以减少传输时间和带宽使用量。
    
-   SSL加速：加速SSL证书验证和加密过程，确保数据传输的安全和可靠性。
    
-   异步加载：在页面加载时异步加载脚本和CSS文件，以提高页面加载速度和用户体验。
    

以上这些技术手段共同构成了CDN的核心功能，使得网站访问速度更加快速、稳定和安全。

2、HTTP/2协议

HTTP/2是HTTP协议的重大升级，旨在提高客户端与服务器之间的交互速度和安全性。它由互联网工程任务组（IETF）的Hypertext Transfer Protocol Bis（httpbis）工作小组开发，并于2015年5月以RFC 7540正式发表。相比HTTP/1.x协议，HTTP/2具有更高的交互效率、更好的性能、更小的压缩率、更高效的解析能力、更简单的多路复用和更安全的传输方式。同时，它也保留了向后兼容性，因此没有支持HTTP/2的浏览器和服务器仍可正常运行。而拥有HTTP/2支持的浏览器和服务器则可以享受到性能提升的好处。

2.1 HTTPS

HTTPS是HTTP协议的安全版本，HTTP协议的数据传输是明文的，是不安全的，HTTPS使用了SSL/TLS协议进行了加密处理。 HTTPS 经由 HTTP 进行通信，但利用 SSL/TLS 来加密数据包，保护交换资料的隐私与完整性。

2.2 速度提升

HTTP/2 改进的重点是速度。HTTP/1 的一个主要限制因素是，一个给定连接在某个时刻只允许处理一个资源请求。为了最大限度地缩短网页（通常由数十个图像、脚本及样式表组成）的加载时间，浏览器通常会同时打开多个与站点的 HTTP/1 连接，以便其并行请求资源，但每个连接都需要大笔开销。HTTP/2 使用多路复用连接通过单个连接传输多个资源，可显著减少客户端和 Web 服务器之间的连接数。

HTTP/2 还广泛使用压缩技术，以节省带宽，从而提升性能。在 HTTP/2 中，请求头以压缩的二进制文件形式发送，而非人类可读的普通文本。虽然这会造成 CPU 负载的小幅增长（用于压缩和解压缩请求头）且因请求头无法被人类读取而引起不便（例如，无法通过人类能阅读的信息进行调试），但是大笔带宽成本节省抵消了这些负面影响。

HTTP/2 还引入了资源优先级排序，可改善页面加载的用户体验。Web 浏览器及其他客户端现在可以指定其想要接收资源的顺序。具有良好 HTTP/2 支持的浏览器能够对用户首先需要查看的资源进行优先级排序，从而显著加快网页渲染速度。早期 HTTP/2 性能测试显示，一些页面的加载速度几乎快了两倍。

2.3 安全性提升

尽管 HTTP/2 没有明确更改 HTTP 的安全要求，但几乎所有使用 HTTP/2 的浏览器都要求网站启用 SSL/TLS，使其实际成为一种强制要求。由于 HTTP/2 为每个客户端使用单个多路复用连接，因此确保网站安全性的成本大大降低了。不必对浏览器打开的每个连接执行 SSL/TLS 握手（客户端和服务器验证身份并交换加密密钥），只需执行一次即可覆盖客户端会话的整个持续时间。

2.4 和HTTP/1.1对比优势

·HTTP/2采用二进制格式而非文本格式；

·HTTP/2是完全多路复用的，而非有序并阻塞的——只需一个连接即可实现并行；

·使用报头压缩，HTTP/2降低了开销；

·HTTP/2让服务器可以将响应主动“推送”到客户端缓存中。

2.5 什么是多路复用

在 HTTP/1.1 中，每次请求都需要建立一次 HTTP 连接，这个过程占用了相当长的时间，而且逻辑上是非必需的。为了解决这个问题，HTTP/1.1 提供了 Keep-Alive，允许我们建立一次 HTTP 连接，来返回多次请求数据。但是这里有两个问题：

-   一是 HTTP/1.1 基于串行文件传输数据，因此这些请求必须是有序的；
    
-   二是 HTTP/2 引入二进制数据帧和流的概念，其中帧对数据进行顺序标识，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况。同样是因为有了序列，服务器就可以并行的传输数据。
    

HTTP/2 对同一域名下所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立一路连接。一个域名对应一个连接，一个流代表了一个完整的请求-响应过程。帧是最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。

多路复用，就是在一个 TCP 连接中可以存在多个流，以下HTTP/2连接示意图：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

2.6 HTTP/2浏览器支持

Google Chrome和Firefox 多年来一直支持该技术 ，Apple早在2014年就为Safari网络浏览器添加了HTTP/2浏览器支持。 Internet Explorer要求用户运行Windows 8以支持最新的应用程序协议。

移动网络浏览器，包括Android恰当命名的浏览器、Android和iOS版Chrome，以及iOS 8及更高版本中的Safari，都支持HTTP/2进行移动网络访问。

HTTP/2 兼容性问题，可通过访问嗅探后自动降级回源到HTTP/1.1，以下是HTTP/2 兼容性情况：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

五、性能检测工具（Lighthouse和Performance）

1、Lighthouse

Lighthouse是Google Chrome推出的一款开源自动化工具（Page Speed），它可以搜集多个现代网页性能指标，分析Web应用的性能并生成报告，为开发人员进行性能优化的提供了参考方向 。Lighthouse可以作为Chrome扩展程序运行，或从命令行运行。为Lighthouse提供一个要审查的网址，它将针对此页面运行一连串的测试，然后生成一个报告，其中包含有关页面性能的详细信息和建议 。

它为网站页面评估了五个关键指标，包括页面性能（performance）、Progressive（渐进式 Web 应用）、Accessibility（可访问性）、Best Practices（最佳实践）、SEO。报告不仅会给出每个指标的分数，还会针对潜在的性能问题提供实用的建议和预期的优化时间。这份报告具有很强的可操作性——只需按照 Lighthouse 的建议逐一尝试，你就能见证你的网站在每一秒都在变得更快。

1.1 性能指标

First Contentful Paint（FCP）标记了绘制出首个文本或首张图片的时间。

Largest Contentful Paint（LCP）标记了绘制出最大文本或图片的时间。

Total Blocking Time（TBT）当任务用时超过 50 毫秒时计算首次内容绘制 (FCP) 和可交互时间之间的所有时间段的总和，以毫秒表示。

Cumulative Layout Shift（CLS）旨在衡量可见元素在视口内的移动情况。

Speed Index 表明了网页内容的可见填充速度。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

1.2 性能优化建议

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

1.3 诊断结果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

2、Performance

Performance是Chrome浏览器自带的一个简单的性能监测工具。通过录制记录一段时间的浏览器活动来获取页面的活动数据，然后使用Performance工具来分析这些数据。

Performance工具提供了非常多的运行时数据，如加载时间、CPU使用率、内存占用等细节数据，让我们能够更全面地了解应用程序的性能状况。

此外，Lighthouse生成的报告也使用了Performance API的数据，具有实时性和多维度的特点，能够帮助我们更好地定位性能问题并提供改进建议。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加图片注释，不超过 140 字（可选）

2.1 Performance指标值

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>详细</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>FP (First Paint)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>首次绘制</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>FCP (First Contentful Paint)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>首次内容绘制</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>标记浏览器渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、非空白canvas或SVG 甚至 元素。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>LCP (Largest Contentful Paint)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>最大内容渲染</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>代表在viewport中最大的页面元素加载的时间。 LCP的数据会通过PerformanceEntry对象记录, 每次出现更大的内容渲染, 则会产生一个新的PerformanceEntry对象。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>DCL (Dom Content loaded)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><br></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>当 HTML文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>FMP(First Meaningful Paint)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>首次有效绘制</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><br></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>L (onLoad)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>加载完成</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>当依赖的资源, 全部加载完毕之后才会触发。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>TTI (Time to Interactive)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>可交互时间</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>指标用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>TBT (Total Blocking Time)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>页面阻塞总时长</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>TBT汇总所有加载过程中阻塞用户操作的时长，在FCP和TTI之间任何long task中阻塞部分都会被汇总。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>FID (First Input Delay)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>首次输入延迟</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>指标衡量的是从用户首次与网站进行交互（即当他们单击链接，点击按钮等）到浏览器实际能够访问之间的时间。</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>CLS (Cumulative Layout Shift)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>累积布局偏</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>总结起来就是一个元素初始时和其hidden之间的任何时间如果元素偏移了, 则会被计算进去。具体的计算方法可看这篇文章 《Cumulative Layout Shift (CLS)》</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>SI (Speed Index)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><br></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>指标用于显示页面可见部分的显示速度, 单位是时间</p></td></tr></tbody></table>

2.2 RAIL性能模型

RAIL 性能模型是一种以用户为中心的性能模型，它提供了一种考虑性能的结构。该模型将用户体验分解为关键操作（例如，点击、滚动、加载）并帮助你为每个操作定义性能目标。RAIL代表Web应用程序生命周期的四个不同方面：响应（response）、动画（animation）、空闲（idle）和加载（load） 。

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>详细</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>response</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>响应</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>用户输入之后是否能在100ms之内响应 这里的输入包括点击按钮、切换表单控件等，但不包括触摸滑动或滚动（50ms内完成较好）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>animation</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>动画</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>最近手机圈很流行将屏幕刷新率提升为90hz，这里hz就是帧率，90hz就是每秒有90帧，一帧就是一个画面。每秒看到的画面越多，我们就会感到越流畅，（每10ms内产生一帧较好）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>idle</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>浏览器空置状态</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>利用空闲的时间完成一些推迟的工作。推迟的工作应分为50ms的多个块进行。（尽可能增加空闲时间）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>load</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>加载</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>5s加载完成并且可以交互</p></td></tr></tbody></table>

2.3 Performance面板参数

       Chrome浏览器自带的Performance面板可以提供多种参数，这些参数可以帮助你了解应用程序的性能状况并找出瓶颈。此外，你还可以使用Performance面板来记录和分析应用程序的运行时活动，以便更好地了解应用程序的性能。

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>no recordings</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>就是每一次的检测报告，可以根据每一次的检测报告，去进行性能优化的对比</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Screenshots</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>是用来查看在每个时间段界面的变化</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Memory</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>存储调用栈的大小，在不同时间段的不同大小</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Disable Javascript samples</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>禁用 javascript 调用栈,关闭javaScript样本减少在手机运行时的开销，模拟手机运行时勾选</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Enable advanced paint instrumentation (slow)</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>记录渲染事件的细节,选择frames中的一块，可以看到区域四多了个Layers</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Network</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>网络模拟,可以模拟在3G,4G等网络条件下运行页面</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>CPU</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>用来查看电脑的性能问题,主要为了模拟底CPU下运行性能</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>HEAP</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>JavaScrip 执行的时间分布</p></td></tr></tbody></table>

2.4 网页性能总览

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>FPS</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>每秒帧数，是用来分析动画的一个主要性能指标，对于动画而言标准是保持在60FPS。绿色越高越好，出现红色则表示FPS低（这就是你为啥觉得页面卡顿了），你可以在区域三Frames中看到具体的FPS值</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>CPU</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>处理各个任务花费的时间，选择一段CPU统计可以在区域四的Summary看到统计表格 Scripting 脚本 Rendering 渲染 Painting 绘制 Loading 加载 ldle 闲置</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>NET</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）</p></td></tr></tbody></table>

2.5 线程面板

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Frames</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>帧线程，鼠标悬浮绿色块可以看到fps</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Main</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>主线程，负责执行Javascript, 解析HTML/CSS, 完成绘制。 可以看到主线程调用栈和耗时情况，每个长条都是一个事件，悬浮可以看到耗时和事件名 x轴指时间： 最上面的第一条就是事件触发的地方，直到结束，这条线是最长的 y轴指调用栈：上面的event调用了下面的子event，越到下面数量越少（瀑布）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Raster</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Raster线程，负责完成某个layer或者某些块(tile)的绘制。光栅化线程池，用来让 GPU执行光栅化的任务</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Interactions</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>用来记录用户交互操作，比如点击鼠标、输入文字、动画等</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Timings</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>用来记录一些关键的时间节点在何时产生的数据信息，诸如 FP、FCP、LCP 等</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Compositor</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>合成线程的执行记录，用来记录html绘制阶段 (Paint)结束后的图层合成操作</p></td></tr></tbody></table>

2.5 统计面板

<table data-draft-node="block" data-draft-type="table" data-size="normal" data-row-style="normal"><tbody><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>名词</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>解析</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Summary</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>统计图：展示各个事件阶段耗费的时间</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Bottom-Up</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>排序：可以看到各个事件消耗时间排序 (1)self-time 指除去子事件这个事件本身消耗的时间 (2)total-time 这个事件从开始到结束消耗的时间（包含子事件）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Call Tree</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>调用栈：Main选择一个事件，表示事件调用顺序列表（从最顶层到最底层，而不是只有当前事件）</p></td></tr><tr><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>Event Log</p></td><td data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><p>事件日志 (1) 多了个start time，指事件在多少毫秒开始触发的 (2) 右边有事件描述信息</p></td></tr></tbody></table>

综上所述，大家可以根据以下优化点进行逐个check：

-   入口资源进行更新机制，其他资源按需进行各级缓存处理
    
-   请求的静态资源（js/css等）添加prefetch/dns-prefetch、preload、prerender等
    
-   静态资源（js、css等）请求和返回添加gzip/br 压缩（nginx处理）
    
-   js/css等按需加载，懒执行和懒加载
    
-   所有请求http1.x 改成http2 （运维网络服务处理）
    
-   支持ipv6网络（好处多多）
    
-   接口内容请求和返回添加gzip/br 压缩（后端组件处理）
    
-   图片增加OSS存储服务或者CDN回源服务
    
-   图片添加CDN/OSS 压缩和转码webp/avif （已经压缩的图片，不要再gzip压缩）
    
-   图片按需加载
    

参考材料：

Navigation-Timing：https://www.w3.org/TR/navigation-timing/

Accept-Encoding：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding

网站性能优化实战——从12.67s到1.06s的故事

前端性能优化——首页资源压缩63%、白屏时间缩短86%

说下浏览器缓存策略

web性能优化（Lighthouse和performance）：从实际项目入手，如何监测性能问题、如何解决。

combo 技术简单介绍

5分钟了解CDN 加速原理

图片要启用gzip压缩吗(绝对不要)

网站图片无缝兼容 WebP/AVIF

如何优雅的支持Webp、Avif格式的图片

基础知识扫盲：什么是HTTP/2

什么是 HTTP/2？

HTTP/2兼容情况