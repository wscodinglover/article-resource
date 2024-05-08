## 一、微前端的由来

由于现代项目迭代应用越来越庞大并且业务复杂，业务模块之间的关系错综复杂，跨组多人协作开发难以维护，为解决上述问题，微前端框架思想应运而生，

按照qiankun和Garfish等框架的设计理念，巨石应用会拆分为各个应用并独立维护，并在页面上整合各个应用，在用户层感知为一个单品。

## 二、业界微前端方案难以解决的痛点

但是 qiankun和Garfish等框架 是以应用维度进行载入，且是一个比较重量的解决方案

比如我们在业务中会遇到如下问题：

1\. 子应用过多，开发时服务器启动数量比较多，虽然有工具可以降低启停维护成本，但性能上开销比较大

2\. 发布时，需要多个子应用按照业务指定顺序发布，在没有一个很好的发布平台自动管理的情况下，发布简直就是噩梦

3\. 我需要仅仅在A应用中复用b应用的一个组件，在b应用中复用A应用的一个组件，此时一般的做法有以下几种：

（a）将组件copy一份，显然这种做法快速但不利于后期维护

（b）将组件提取到组件库中，但如果组件的复用范围比较小，又或者包含较多业务逻辑，此时放到组件库多少有些不合适，且不利于与项目统一维护

> _尤其在tob的大型saas应用中，会不可避免的将整个企业管理生命周期划分各个业务模块，甚至划分各个业务组来分别管理对应的业务项目，但是实际情况是各个业务模块间存在着比较复杂的业务关联，比如：用户需要在订单模块展示和编辑企业信息，用户需要在企业控制后台管理订单业务等_

\- 使用qiankun框架虽然可以将各个应用整合在一个页面，但是难以比较细粒度的复用各个应用的业务代码和功能。

\- Garfish虽然可以通过打包配置来生成单个业务脚本入口提供给主应用引入，尤其在vue项目中想要以正常引入组件方式来复用远程业务组件，并且公共基础库又不想重新加载，则还需要做更多的事情。

## 三、vite-micro的理念

为实现上述的设想，vite-micro 基于vite 将 模块联邦思想融入到微前端框架中，以组件维度进行载入，更细粒度的来复用业务，在vite-micro中，一个脚本，一个应用页面也可以称为一个组件，微应用类比后端的微服务，向外暴露的组件可以叫做接口，接口的request可以叫做依赖或者公共依赖，接口的response可以返回前端业务组件， vite-micro 使得微应用可以提供内部api供其他微应用相互调用，也可以提供开放api给客户使用，从而实现业务的闭环。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vite-micro架构图

## 四、vite-micro的核心原理

### 1\. 服务器按需启动机制

vite-micro基于monorap的架构构建了一个全局服务器，并根据workspace里面的模块包装为中间件，当访问页面时，中间件会根据路由地址动态的启动子应用的服务，这个服务本质是vite编译对应的配置文件返回的一个中间件。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vite-micro按需启动原理

### 2\. 便于路由配置

vite-micro 在追求轻装的前提下，不对路由进行过渡设计，将路由的权力交给项目，vue-router或者react-router等；vite-micr专注于帮助项目生成远程组件，加载远程组件，比如vite-micro提供entryImportVue接口加载远程组件并封装为vue组件，开发者按照正常的路由配置思路配置路由即可。

```
import { entryImportVue, remoteImport } from 'vite-micro/client'<br><br>const mainRoute = [<br>  {<br>    path: '/home',<br>    component: () =&gt; import('../../views/Home.vue'),<br>  },<br>  {<br>    path: '/user',<br>    component: () =&gt; entryImportVue('remote_app/entry'),<br>  },<br>  {<br>    path: '/button',<br>    component: () =&gt; remoteImport('remote_app/Button'),<br>  },<br>]
```

### 3\. 模块联邦

vite-micro 底层基于@originjs/vite-plugin-federation，模块的加载方式分为生产模式和开发模式，生产模式下模块的加载和打包方式采用@originjs/vite-plugin-federation，开发模式下模块无需打包，采用ES6原生的import 方式加载代码，vite-micro 分为node和client两个结构，node负责打包生成远程组件，client负责帮助应用加载远程组件。

### 4\. 子应用生命周期

应用分为mounted，unMouted, destroyed 这 3 个阶段（后续有需要会扩展）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vite-micro 生命周期

### 5\. 版本管理

由于远程组件会被远程应用依赖使用，远程组件的维护和发布就变得更为谨慎。vite-micro 提供加载远程脚本的版本管理功能

1\. 默认配置会每次加载最新版本的远程组件，vite-micro 默认去获取远程应用的remoteEntrys脚本，remoteEntrys 负责引入远程应用的最新版本

2\. 可以配置每次加载指定版本的远程组件

```
<span>remotes</span><span>:</span> <span>{</span><br>    <span data-darkreader-inline-color="">// 默认会引入loginRemote 应用的remoteEntrys.js ， 这个文件会去加载该应用最新版本的remoteEntry文件<br></span><span data-darkreader-inline-color=""></span>    <span data-darkreader-inline-color="">'loginRemote'</span><span>:</span> <span>{</span><br>      <span>url</span><span>:</span> <span data-darkreader-inline-color="">`/assets/login`</span><br>    <span>},</span><br>    <span data-darkreader-inline-color="">// 会将 `/assets/login/0.0.1/remoteEntry.js` 作为入口文件引入<br></span><span data-darkreader-inline-color=""></span>    <span data-darkreader-inline-color="">'userRemote'</span><span>:</span> <span>{</span><br>      <span>url</span><span>:</span> <span data-darkreader-inline-color="">`/assets/login`</span><span>,</span><br>      <span>filename</span><span>:</span> <span data-darkreader-inline-color="">'0.0.1/remoteEntry.js'</span><br>    <span>},</span><br><span>}</span><br>
```

## 五、如何使用

vite-micro 架构需要采用 monorapo 项目结构，可参考 example 的项目结构，</br>

packages 里面通常会有 2 个或 2 个以上的微应用，一个作为 Host 端，一个作为 Remote 端。

### 步骤一：Remote 端配置暴露的模块

```
// vite.config.js<br>import { federation } from 'vite-micro/node'<br>export default {<br>  build: {<br>    // 如果出现top level await问题，则需使用import topLevelAwait from 'vite-plugin-top-level-await'<br>    target: ['chrome89', 'edge89', 'firefox89', 'safari15'],<br>    // 输出目录<br>    outDir: `${path.resolve(__dirname, '../../dist')}`,<br>    // 资源存放目录<br>    assetsDir: `assets/user/${packageJson.version}`,<br>  },<br>  plugins: [<br>    federation({<br>      mode<br>      // 需要暴露的模块,<br>      //远程模块对外暴露的组件列表,远程模块必填<br>      exposes: {<br>        Button: './src/Button.vue',<br>        entry: './src/bootstrap.ts',<br>      },<br>      shared: ['vue'],<br>    }),<br>  ],<br>}
```

这里的 entry 对应的 bootstrap.ts 来源于 main.ts(项目的入口文件) ,如果有以下配置，则需使用 bootstrap.ts,否则会产生冲突错误

```
rollupOptions: {<br>  input: main: `${path.resolve(__dirname, './src/main.ts')}`,<br>}<br><br>// bootstrap.ts<br>export { mount, unMount } from './main'
```

### 步骤二：Remote 端配置应用入口文件（如果 Host 端需要调用 Remote 微应用）

```
// main.ts<br>import { createApp } from 'vue'<br>import App from './App.vue'<br><br>let app: any = null<br>export async function mount(name: string, base: string) {<br>  app = createApp(App)<br><br>  // 其他配置......<br><br>  app.mount(name)<br><br>  console.log('start mount!!!', name)<br><br>  return app<br>}<br><br>export function unMount() {<br>  console.log('start unmount ---&gt;')<br>  app &amp;&amp; app.$destroy()<br>}
```

> 1\. Host 端拿到 Remote 微应用入口文件后，会执行里面的 mount 方法初始化并挂载微应用  
> 2\. mount 和 unmount 方法 约定导出

### 步骤三：Host 端配置暴露的模块

```
<span data-darkreader-inline-color="">// vite.config.js<br></span><span data-darkreader-inline-color=""></span><span>import</span> <span>{</span> <span>federation</span> <span>}</span> <span>from</span> <span data-darkreader-inline-color="">'vite-micro/node'</span><br><span>export</span> <span>default</span> <span>{</span><br>  <span>build</span><span>:</span> <span>{</span><br>    <span data-darkreader-inline-color="">// 如果出现top level await问题，则需使用import topLevelAwait from 'vite-plugin-top-level-await'<br></span><span data-darkreader-inline-color=""></span>    <span>target</span><span>:</span> <span>[</span><span data-darkreader-inline-color="">'chrome89'</span><span>,</span> <span data-darkreader-inline-color="">'edge89'</span><span>,</span> <span data-darkreader-inline-color="">'firefox89'</span><span>,</span> <span data-darkreader-inline-color="">'safari15'</span><span>],</span><br>    <span data-darkreader-inline-color="">// 输出目录<br></span><span data-darkreader-inline-color=""></span>    <span>outDir</span><span>:</span> <span data-darkreader-inline-color="">`</span><span data-darkreader-inline-color="">${</span><span>path</span><span>.</span><span>resolve</span><span>(</span><span>__dirname</span><span>,</span> <span data-darkreader-inline-color="">'../../dist'</span><span>)</span><span data-darkreader-inline-color="">}</span><span data-darkreader-inline-color="">`</span><span>,</span><br>    <span data-darkreader-inline-color="">// 资源存放目录<br></span><span data-darkreader-inline-color=""></span>    <span>assetsDir</span><span>:</span> <span data-darkreader-inline-color="">`assets/main/</span><span data-darkreader-inline-color="">${</span><span>packageJson</span><span>.</span><span>version</span><span data-darkreader-inline-color="">}</span><span data-darkreader-inline-color="">`</span><span>,</span><br>  <span>},</span><br>  <span>plugins</span><span>:</span> <span>[</span><br>    <span>federation</span><span>({</span><br>      <span>mode</span><br>      <span>remotes</span><span>:</span> <span>{</span><br>        <span>loginRemote</span><span>:</span> <span>{</span><br>          <span>url</span><span>:</span> <span data-darkreader-inline-color="">`/assets/login`</span><span>,</span><br>        <span>},</span><br>        <span>userRemote</span><span>:</span> <span>{</span><br>          <span>url</span><span>:</span> <span data-darkreader-inline-color="">'/assets/user'</span><span>,</span><br>        <span>},</span><br>      <span>},</span><br>      <span>shared</span><span>:</span> <span>[</span><span data-darkreader-inline-color="">'vue'</span><span>],</span><br>    <span>}),</span><br>  <span>],</span><br><span>}</span><br>
```

### 步骤四：Host 端使用远程模块

1.  使用微组件方式
    

```
<span>import</span> <span>{</span> <span>createApp</span><span>,</span> <span>defineAsyncComponent</span> <span>}</span> <span>from</span> <span data-darkreader-inline-color="">"vue"</span><span>;</span><br><span>import</span> <span>{</span> <span>remoteImport</span> <span>}</span> <span>from</span> <span data-darkreader-inline-color="">'vite-micro/client'</span><br><span>const</span> <span>app</span> <span>=</span> <span>createApp</span><span>(</span><span>Layout</span><span>);</span><br><span>...</span><br><span>const</span> <span>RemoteButton</span> <span>=</span> <span>defineAsyncComponent</span><span>(()</span> <span>=&gt;</span> <span>remoteImport</span><span>(</span><span data-darkreader-inline-color="">"remote_app/Button"</span><span>));</span><br><span>app</span><span>.</span><span>component</span><span>(</span><span data-darkreader-inline-color="">"RemoteButton"</span><span>,</span> <span>RemoteButton</span><span>);</span><br><span>app</span><span>.</span><span>mount</span><span>(</span><span data-darkreader-inline-color="">"#root"</span><span>);</span><br>
```

2\. 使用微应用入口方式

```
<span>import</span> <span>{</span> <span>entryImportVue</span><span>,</span> <span>remoteImport</span> <span>}</span> <span>from</span> <span data-darkreader-inline-color="">'vite-micro/client'</span><br><br><span>const</span> <span>mainRoute</span> <span>=</span> <span>[</span><br>  <span>{</span><br>    <span>path</span><span>:</span> <span data-darkreader-inline-color="">'/home'</span><span>,</span><br>    <span>component</span><span>:</span> <span>()</span> <span>=&gt;</span> <span>import</span><span>(</span><span data-darkreader-inline-color="">'../../views/Home.vue'</span><span>),</span><br>  <span>},</span><br>  <span>{</span><br>    <span>path</span><span>:</span> <span data-darkreader-inline-color="">'/user'</span><span>,</span><br>    <span>component</span><span>:</span> <span>()</span> <span>=&gt;</span> <span>entryImportVue</span><span>(</span><span data-darkreader-inline-color="">'remote_app/entry'</span><span>),</span><br>  <span>},</span><br>  <span>{</span><br>    <span>path</span><span>:</span> <span data-darkreader-inline-color="">'/button'</span><span>,</span><br>    <span>component</span><span>:</span> <span>()</span> <span>=&gt;</span> <span>remoteImport</span><span>(</span><span data-darkreader-inline-color="">'remote_app/Button'</span><span>),</span><br>  <span>},</span><br><span>]</span><br>
```

> _\- entryImportVue('remote\_app/entry') 在本质上也是一个微组件，同样可以使用微组件方式调用_  
> _\- 对于 Remote 模块暴露的脚本有时并非 vue 组件，也可能是 React 组件或其他，也可能是远程应用的入口文件，这种类型的脚本很明显是无法直接被 Host 模块 vue 项目所消费的，entryImportVue 的内部使用一个简单的 vue 组件将这些脚本包裹进来形成一个可以直接被 vue 项目使用的组件_  
> _\- 对于可以直接被 Host 模块直接引用的远程组件，直接使用 remoteImport 即可_

## 七、vite-micro需要注意的地方

1\. vite-micro 目前是轻量化的微前端框架，满足了基础和常用的功能，还有些特定场景功能待完善

2 . vite-micro. 目前 没有提供沙箱的功能，这就要求 每个微应用需要在开发时约定代码的规则，定义window下的全局变量尽可能提供命名空间，css名称尽量符合特定项目特征