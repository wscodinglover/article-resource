- [什么是 monorepo](https://www.kancloud.cn/chandler/web_technology/3076199#_monorepo_2)
- [常见](https://www.kancloud.cn/chandler/web_technology/3076199#_11)

- [monorepo 就一定需要专门的工具（库）才能实现吗？](https://www.kancloud.cn/chandler/web_technology/3076199#monorepo__12)
- [monorepo 的好处](https://www.kancloud.cn/chandler/web_technology/3076199#monorepo__16)
- [复用 packages：workspace](https://www.kancloud.cn/chandler/web_technology/3076199#_packagesworkspace_26)

- [lerna](https://www.kancloud.cn/chandler/web_technology/3076199#lerna_61)

- [pnpm](https://www.kancloud.cn/chandler/web_technology/3076199#pnpm_70)

- [统一配置：合并同类项](https://www.kancloud.cn/chandler/web_technology/3076199#_73)

- [TypeScript](https://www.kancloud.cn/chandler/web_technology/3076199#TypeScript_78)
- [Eslint](https://www.kancloud.cn/chandler/web_technology/3076199#Eslint_92)
- [Babel](https://www.kancloud.cn/chandler/web_technology/3076199#Babel_105)

- [当然还有其他事项](https://www.kancloud.cn/chandler/web_technology/3076199#_135)

- [统一命令脚本](https://www.kancloud.cn/chandler/web_technology/3076199#_136)
- [npm 包本地发布](https://www.kancloud.cn/chandler/web_technology/3076199#npm__140)
- [格式化 commit 信息](https://www.kancloud.cn/chandler/web_technology/3076199#_commit__143)
- [changelog](https://www.kancloud.cn/chandler/web_technology/3076199#changelog_146)

- [lerna 主要能力：](https://www.kancloud.cn/chandler/web_technology/3076199#lerna__147)
- [changesets 主要能力：](https://www.kancloud.cn/chandler/web_technology/3076199#changesets_152)

- [lint、测试](https://www.kancloud.cn/chandler/web_technology/3076199#lint_159)
- [现有项目迁移至 monorepo 项目的方法](https://www.kancloud.cn/chandler/web_technology/3076199#_monorepo__161)

- [JavaScript Monorepo 工具](https://www.kancloud.cn/chandler/web_technology/3076199#JavaScript__Monorepo__168)

- [Turbo](https://www.kancloud.cn/chandler/web_technology/3076199#Turbo_178)
- [Syncpack](https://www.kancloud.cn/chandler/web_technology/3076199#Syncpack_182)
- [preconstruct](https://www.kancloud.cn/chandler/web_technology/3076199#preconstruct_185)
- [Ultra Runner](https://www.kancloud.cn/chandler/web_technology/3076199#Ultra_Runner_189)
- [manypkg](https://www.kancloud.cn/chandler/web_technology/3076199#manypkg_193)
- [rushjs](https://www.kancloud.cn/chandler/web_technology/3076199#rushjs_196)
- [Bit](https://www.kancloud.cn/chandler/web_technology/3076199#Bit_200)
- [nx](https://www.kancloud.cn/chandler/web_technology/3076199#nx_202)
- [@nrwl/tao](https://www.kancloud.cn/chandler/web_technology/3076199#nrwltao_209)
- [Bolt](https://www.kancloud.cn/chandler/web_technology/3076199#Bolt_212)
- [multipack](https://www.kancloud.cn/chandler/web_technology/3076199#multipack_216)

- [参考](https://www.kancloud.cn/chandler/web_technology/3076199#_219)

## 什么是 monorepo

美 `[mɑːnoʊˈriːpoʊ]`

[monorepo-starter](https://github.com/thinkmill/monorepo-starter)  
monorepo 是一个单个 git 存储库，可容纳多个应用程序和库的源代码以及它们的工具。

目前 Babel, Angular, React,Vue, Ember, Meteor, Jest 等许多开源项目都使用该种模式来管理代码。  
![](https://img.kancloud.cn/b6/73/b673d8f996d04e30310c930cd6b30f4c_1080x458.png)

## 常见

## monorepo 就一定需要专门的工具（库）才能实现吗？

答案当然是否定的，严格意义上说，只要将多个项目放在一个存储库里就算 monorepo。  
现在主流的 monorepo 所承担的责任并不只是存储的问题，还可以承担比如依赖管理，增量构建等一系列工程化的功能，已经成为工程化技术中非常有价值的一块领域，所以有时你为了实现某个特殊的功能不得不借助社区的力量，或者站在大佬的肩膀上。

## monorepo 的好处

- **共享代码和可见性** - 在整个组织中保持代码 DRY。在代码库中重用验证代码、UI 组件和类型。在后端、前端和程序库之间重用代码。
- **原子性的更改** - 更改一个 API 接口，并在同一提交中修改使用了该 API 的下游应用程序。您可以在同一个提交中更改共享库中的按钮组件和使用该组件的应用程序。monorepo 省去了在多个存储库之间协调提交的麻烦。
- **开发人员的移动性** - 以一致的方式构建和测试使用不同工具和技术编写的应用程序。开发人员可以自信地为其他团队的应用程序做出贡献，并验证他们的更改是安全的。
- **单一版本的依赖项** - 使用所有第三方依赖项的单个版本，从而减少了应用程序之间的不一致性。对于较少积极开发的应用程序仍然会保持使用到最新版本的框架，库或构建工具。  
  Angular,

## 复用 packages：workspace

接下来，简单罗列一下各个包管理工具的 workspaces 特性和注意点（主观观点：从上至下，由差到好）。

| **包管理工具**                                                             | **准备工作**                  | **依赖统一管理**                    | **添加本地子项目为依赖**                    | **注意点**                                                                                           |
| -------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [yarn2](https://yarnpkg.com/features/workspaces)                           | 配置`workspaces`字段          | ✅ 支持                             | ⚠️ 支持，但使用的是 yarn2 的 workspace 协议 | 功能很多，基本可以和大型的 monorepo 解决方案媲美。 但 yarn2 自身可用性和稳定性尚待考验，请谨慎选择。 |
| [yarn](https://classic.yarnpkg.com/en/docs/workspaces/)                    | 配置`workspaces`字段          | ⚠️ 默认不支持（需要关闭`nohoist`）  | ⚠️ 支持，但第一次添加依赖需要指定版本号     | 不支持子项目为依赖 yarn 的 bug 太多了，官方不怎么维护。 如果没有太多需求需要实现，可以一试。         |
| [npm](https://docs.npmjs.com/cli/v7/using-npm/workspaces#using-workspaces) | 配置`workspaces`字段          | ⚠️ 支持（子项目需要通过专门的指令） | ✅ 支持                                     | 起步较晚，需要很新版本的 npm 但是功能稳定且实用，值得一试                                            |
| [pnpm](https://pnpm.io/zh/workspaces)                                      | 添加`pnpm-workspace.yaml`文件 | ✅ 支持                             | ⚠️ 支持，但使用的是 pnpm 的 workspace 协议  | 好使 👍                                                                                              |

使用 monorepo 策略后，收益最大的两点是：

1.  避免重复安装包，因此减少了磁盘空间的占用，并降低了构建时间；
2.  内部代码可以彼此相互引用；

这两项好处全部都可以由一个成熟的包管理工具来完成，对前端开发而言，即是 yarn（1.0 以上）或 npm（7.0 以上）通过名为 workspaces 的特性实现的；推荐使用 pnpm；

为了实现前面提到的两点收益，您需要在代码中做三件事：

1.  调整目录结构，将相互关联的项目放置在同一个目录，推荐命名为 **packages**；
2.  在项目根目录里的`package.json`文件中，设置`workspaces`属性，属性值为之前创建的目录；
3.  同样，在`package.json`文件中，设置`private`属性为 true（为了避免我们误操作将仓库发布）；

经过修改，您的项目目录看起来应该是这样：

```
.
├── package.json    // `devDependencies`and`scripts`for the monorepo
└── packages/
    ├── @mono/project_1    // 社区推荐使用 `@<项目名>/<子项目名>` 的方式命名
    │   ├── index.js
    │   └── package.json    // `dependencies`, unique`devDependencies`and`scripts`for the package
    └── @mono/project_2/
    │   ├── index.js
    │   └── package.json
```

复制

至此，我们已经完成了 monorepo 策略的核心部分，实在是很容易不是吗？但是老话说「行百里者半九十」，距离优雅的搭建一个 monorepo 项目，我们还有一些路要走。

## lerna

`mono-repo`最出名是使用 [Lerna](https://github.com/lerna/lerna/) 管理 workspaces。（参见：Node - 常用库）

- 使用`lerna bootstrap --hoist`可以将子项目的`node_modules`提升到顶层，解决`node_modules`重复的问题。
- 但是`lerna bootstrap --hoist`在提升时如果遇到各个子项目引用的依赖版本不一致，会提升使用最多的版本，从而导致少数派那个找不到正确的依赖，发生错误。
- 为了解决提升时版本冲突的问题，引入了`yarn workspace`，他也会提升用的最多的版本，但是会为少数派保留自己的依赖在自己的`node_modules`下面。
- 发布的时候使用`lerna publish`，它会自动更新内部依赖，并更新各个子项目自己的版本号。
- 子项目的版本号规则可以在`lerna.json`里面配置，如果配置为固定版本号，则各个子项目保持一致的版本，如果配置为`independent`关键字，各个子项目可以有自己不同的版本号。

## pnpm

[pnpm](https://pnpm.io/zh/workspaces) 是一个包管理器，它将`node_modules`从一个单一的可寻址存储连接(links)起来，使得安装速度更快，`node_module`的目录更小。它有像 yarn workspaces 这样的工作空间功能，当涉及到 node 应用时，它是 monorepo 开发的一个很好的选择。

## 统一配置：合并同类项

( - Eslint，Typescript 与 Babel 等)

您一定同意，编写代码要遵循 DRY 原则（Don't Repeat Yourself 的缩写）。那么，理所当然地，我们应该尽量避免在多个子项目中放置重复的 eslintrc，tsconfig 等配置文件。幸运的是，Babel，Eslint 和 Typescript 都提供了相应的功能让我们减少自我重复。

## TypeScript

我们可以在 packages 目录中放置`tsconfig.settting.json`文件，并在文件中定义通用的 ts 配置，然后，在每个子项目中，我们可以通过`extends`属性，引入通用配置，并设置`compilerOptions.composite`的值为`true`，理想情况下，子项目中的`tsconfig`文件应该仅包含下述内容：

```
{
    "extends": "../tsconfig.setting.json",    // 继承 packages 目录下通用配置
    "compilerOptions": {
        "composite": true,    // 用于帮助 TypeScript 快速确定引用工程的输出文件位置
        "outDir": "dist",
        "rootDir": "src"
    },
    "include": ["src"]
}
```

复制

## Eslint

对于 Eslint 配置文件，我们也可以如法炮制，这样定义子项目的`.eslintrc`文件内容：

```
{
    "extends": "../../.eslintrc", // 注意这里的不同
    "parserOptions": {
     "project": "tsconfig.json"
    }
}
```

复制

注意到了吗，对于通用的 eslint 配置，我们并没有将其放置在 packages 目录中，而是放在整个项目的根目录下，这样做是**因为一些编辑器插件只会在项目根目录寻找**`.eslintrc`文件，因此为了我们的项目能够保持良好的「开发环境一致性」，请务必将通用配置文件放置在项目的根目录中。

## Babel

> [Config Files · Babel](https://babeljs.io/docs/en/config-files#monorepos)

Babel 配置文件合并的方式与 TypeScript 如出一辙，甚至更加简单，我们只需在子项目中的`.babelrc`文件中这样声明即可：

```
{ "extends": "../.babelrc" }
```

复制

当一切准备就绪后，我们的项目目录应该大致呈如下所示的结构：

```
.
├── package.json
├── .eslintrc
└── packages/
│   ├── tsconfig.settings.json
│   ├── .babelrc
├── @mono/project_1/
│   ├── index.js
│   ├── .eslintrc
│   ├── .babelrc
│   ├── tsconfig.json
│   └── package.json
└───@mono/project_2/
    ├── index.js
    ├── .eslintrc
    ├── .babelrc
    ├── tsconfig.json
    └── package.json
```

复制

## 当然还有其他事项

## 统一命令脚本

## npm 包本地发布

体验一把使用 管理/发布 monorepo 项目的感觉。将示例代码发布到真实世界的 npm 仓库并非一个好主意，可以使用 Verdaccio 在本地创建一个 npm 仓库作为代理。

## 格式化 commit 信息

## changelog

#### lerna 主要能力：

1.  生成新版本。
2.  lerna-changelog 只能生成一套 changelog，所有包都一样
3.  一键发布所有包

#### changesets 主要能力：

1.  每个包分别生成新版本。
2.  分别生成 changelog
3.  一键发布

changesets 相比于 lerna 最关键的地方在于更**灵活**和更**细粒度**的控制每个 package。

## lint、测试

```
eslint、prettier、 lint-staged
```

复制

## 现有项目迁移至 monorepo 项目的方法

```
使用 tomono，其内容是一个 shell 脚本
```

复制

## JavaScript Monorepo 工具

> [JavaScript Monorepo Tooling](https://dev.to/hipstersmoothie/javascript-monorepo-tooling-48b9)

这些工具的功能可以组织成 3 个功能：  
`installer` - 帮助安装 monorepo 依赖项的工具  
`task-runner` - 帮助在整个 repo 中运行命令或脚本的工具，并可能在 repo 中创建新 package  
`publisher` - 帮助/强制向 monorepo 进行版本控制的工具

某些工具具有多种功能，可以包含多种功能。

## Turbo

[Turborepo](https://turborepo.org/)  
Turborepo 是一个高性能的 JavaScript 和 TypeScript 代码库构建系统。

## Syncpack

[Syncpack](https://github.com/JamieMason/syncpack) 是 monorepo 依赖管理工具。如果你曾经纠结于软件包之间的细微依赖差异，或者维护统一的`package.json` 。那么你就可以想象 Syncpack 有多有用了

## preconstruct

[preconstruct/preconstruct](https://github.com/preconstruct/preconstruct)  
🎁 Dev and build your code painlessly in monorepos

## Ultra Runner

[folke/ultra-runner: 🏃⛰ Ultra fast monorepo script runner and build tool (github.com)](https://github.com/folke/ultra-runner)  
🏃⛰️ 超快速 monorepo 脚本运行器和构建工具

## manypkg

[Thinkmill/manypkg: ☔️ An umbrella for your monorepo (github.com)](https://github.com/Thinkmill/manypkg)

## rushjs

[@microsoft/rush](https://rushjs.io/)  
Rush 是由微软开发的 monorepo 解决方案，它可以结合 pnpm 来使用，所以解决了很多 yarn 和 npm 的问题，同时具备着更强大的链路设施。

## Bit

## nx

[Nx: Smart, Extensible Build Framework](https://nx.dev/)  
[https://github.com/nrwl/nx](https://github.com/nrwl/nx)  
随着存储源代码的 monorepo 策略的日益流行，在 monorepo 中管理项目的工具也越来越多，比如[Bazel](https://bazel.build/)、[Lerna](https://lerna.js.org/)、[changesets](https://github.com/atlassian/changesets)、[Rush](https://rushjs.io/)或[Nx](https://nx.dev/)。

NX 由 [NRWL](https://nrwl.io/) 发布，该公司是一家咨询公司，该公司的使命是帮助客户更好地构建软件并更快。NRWL 专为帮助软件组织而制造的 NX 更加富有成效，以更安全，可预测和可扩展的方式组织其代码。NRWL 正在积极构建 NX 周围的社区，包括博客帖子，培训和咨询，以协助组织采用 NX。

## @nrwl/tao

[@nrwl/tao](https://github.com/nrwl/nx)

## Bolt

[Bolt](https://github.com/boltpkg/bolt) 旨在成为一个“超级功能 JavaScript 项目管理工具”。  
Bolt 在 Yarn 的基础上实现了 workspaces 的概念。Bolt CLI 在很大程度上是 Yarn CLI 的替代品，你可以在任何 Yarn 项目中使用它。

## multipack

[episclera/multipack: 🔱 All in one tool for monorepos. (github.com)](https://github.com/episclera/multipack)

## 参考

> [korfuri/awesome-monorepo: A curated list of awesome Monorepo tools, software and architectures.](https://github.com/korfuri/awesome-monorepo)  
> [如何利用 monorepo 策略管理代码？](https://mp.weixin.qq.com/s/ZP2IigNVSIZKGuYxNYOYgw)  
> [Monorepo 的这些坑，我们帮你踩过了！ (qq.com)](https://mp.weixin.qq.com/s/PIdmJ2cHmq9QBj6MBJ9ygQ)
