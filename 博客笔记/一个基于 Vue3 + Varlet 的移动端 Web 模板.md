### 写在前面

掘金的同学们大家好呀，首先自我介绍一下，作者是 Vue3 Material Design 移动端组件库 Varlet 的作者。

`Varlet` 经历了两年多的开发和维护，现在终于有了一个官方维护的移动端项目模板（一切都源自于作者是个懒狗）。今天作者在这里诚挚的将此项目分享给大家，同时欢迎对此项目有兴趣的同学，贡献更多的模板和功能，让它越来越成熟。

![Image](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibvNMNfpoMdnJw9icIzZ5uXvTSZdBFLmL6rJmqk8jf7XicRmnTxJxK54hFogLu6sKGuVpznwic6eXRhfQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

### 相关链接

在线预览: https://varletjs.github.io/varlet-app-template    
仓库地址: https://github.com/varletjs/varlet-app-template  
Varlet 组件库仓库地址:  https://github.com/varletjs/varlet  

### 介绍

varlet-app-template 是一个开箱即用的轻量化移动端 Web 模板，基于 `Vue3`、 `Varlet`、 `Vite`、`Typescript` 开发。

### 协议

本项目基于 `MIT` 协议，也就是免费～，随便怎么用。

### 特性

-   ⚡️   基于 `Vue3`、 `Varlet`、 `Vite`、`Typescript` 开发
    
-   📦   内置组件库和第三方库的自动引入和按需引入
    
-   🗂   内置与原生应用类似的堆栈路由导航
    
-   🗂   内置基于文件目录结构的约定式路由
    
-   🌍   内置应用级国际化
    
-   📦   内置请求库封装，拥抱 composition api
    
-   📦   内置主题定制
    
-   📦   内置移动端调试工具
    
-   📦   内置 `pinia` 进行状态管理
    
-   📦   内置 `mockjs` 进行数据 mock
    
-   📦   内置 `vitest` 进行单元测试
    
-   📦   内置 `eslint`、`commitlint`、`lint-staged`、`prettier` 等代码检查/格式化工具
    
-   💪   由 `varletjs` 官方维护，第一方提供对 `varlet` 的支持
    

### 安装使用

#### 获取项目

##### 通过模板仓库创建一个你的仓库

https://github.com/varletjs/varlet-app-template/generate

##### 或通过 git clone 直接克隆仓库

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">git&nbsp;clone&nbsp;https://github.com/varletjs/varlet-app-template.git<br></code>
```

#### 安装依赖

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;install<br></code>
```

#### 启动开发环境

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;dev<br></code>
```

#### 构建打包

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;build<br></code>
```

#### 预览

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;preview<br></code>
```

#### 代码检查

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;lint<br></code>
```

#### TS 类型检查

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;type-check<br></code>
```

#### 代码格式化

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;format<br></code>
```

#### 运行单元测试

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;test<br></code>
```

#### 运行单元测试并生成测试报告

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">pnpm&nbsp;test:coverage<br></code>
```

### 路由导航

此项目使用 `varlet 组件库`内置的层级管理器模拟了类似原生 app 的堆栈导航，这使得用户可以得到更接近原生的导航体验，并且不破坏传统路由的导航方式(做 webview 套壳更像真的了）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

1.gif

### 请求库

我们是基于 `axios` 封装了一个渐进式的请求工具 axle。在兼容 `axios` 的同时，对 `axios` 的方法进行了简化和归一化，并支持了 `Vue3 Composition API`。我们希望做到只要会使用 `axios`，就可以很容易的上手 `axle`。下面是一些简单的代码片段。更多详情见: https://github.com/varletjs/axle

#### 基本调用

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">import { createAxle } from '@varlet/axle'<br><br>const axle = createAxle(/** 配置与 axios 一致 **/)<br><br>axle.get('/url', { current: 1, pageSize: 10 }, { headers: {} })<br><br>axle.post('/url', { name: 'Axle' }, { headers: {} })<br><br>axle.postMultipart('/url', { name: 'foo', file: new File() })<br></code>
```

#### Vue3 Composition API

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&lt;script setup&gt;<br>import { createAxle } from '@varlet/axle'<br>import { createUseAxle } from '@varlet/axle/use'<br><br>const axle = createAxle(/** @see 配置与 axios 一致 **/)<br>const useAxle = createUseAxle()<br><br>const [<br>  users, <br>  getUsers, <br>  { loading, error, uploadProgress, downloadProgress, abort }<br>] = useAxle({<br>  data: [],<br>  runner: axle.get,<br>  url: '/api/user',<br>  params: { current: 1, pageSize: 10 },<br>  immediate: true,<br>  retry: 3<br>})<br>&lt;/script&gt;<br><br>&lt;template&gt;<br>  &lt;span&gt;返回数据: {{ users }}&lt;/span&gt;<br>  &lt;span&gt;加载状态: {{ loading }}&lt;/span&gt;<br>  &lt;span&gt;异常信息: {{ error }}&lt;/span&gt;<br>  &lt;span&gt;上传进度: {{ uploadProgress }}&lt;/span&gt;<br>  &lt;span&gt;下载进度: {{ downloadProgress }}&lt;/span&gt;<br>  &lt;button @click="getUsers"&gt;发送请求&lt;/button&gt;<br>  &lt;button @click="abort"&gt;中断请求&lt;/button&gt;<br>&lt;/template&gt;<br></code>
```

我们不希望强制的去改变用户的一些开发习惯，如果您不喜欢 `axle`，将其替换成您更偏好的请求方案也很容易。我们只在主页使用了 `axle` 去请求 mock 的数据，这有利于您更方便的迁移。

### 结尾

感谢同学们能看到这，我们会尽力将 varlet 的生态做的更好，同学们的支持和鼓励是我们的全部动力～。发布这篇文章的时候项目刚刚开源，如果在使用的时候发现任何问题，欢迎在 issue 反馈给我们。