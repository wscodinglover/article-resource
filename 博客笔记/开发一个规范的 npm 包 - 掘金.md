## 技术选型

> 建议根据所开发的npm包功能，选择更加快速且合理的打包方案。如果开发的是一个 `tools` 这样的工具库，显然更适合用 `rollup` 打包。如果是开发的是一个业务组件（vue），则更加适合采用 `@vue/cli` 的 `lib` 模式来构建。

为什么一定要选择打包工具来开发 `npm` 包?

-   不一定非要使用构建工具来开发，使用构建工具主要是为了使用它强大的生态系统。比如代码风格检测、本地服务、同时构建多种规范的产物等等，方便我们的开发

为什么是 `rollup` 而不是 `webpack`?

-   随着 `rollup` 和 `webpack` 的版本更新，二者之间的差异性特性越来越小
-   `rollup` 配置简单，支持同时打包输出多种规范的产物（iife、cjs、umd、esm、amd、system）
-   `webpack` 功能强大社区丰富，更加适合大型应用；不支持打包输出为`es module`，而且产物不是很纯净
-   构建`App应用`时，webpack比较合适；如果是`类库（纯js项目）`，rollup更加适合。

## 完整的开发流程

1.  初始化项目
2.  创建合理的目录结构
3.  配置 `eslint` 统一代码风格
4.  配置 `typescript` 开发环境
5.  配置 `babel`
6.  配置 `git` 提交的校验钩子
7.  开始编写代码
8.  watch 模式开发(本地服务)
9.  添加单元测试，编写测试示例
10.  完善 `package.json` 必要字段
11.  配置合适的 `npm script`
12.  本地测试开发的 `npm` 包
13.  发布包到 `npm`
14.  提交代码到 `git` 仓库

## 合理的包结构

```js
├── bin // 用于存放可执行二进制文件的目录 ├── dist(lib) // 产物输出目录 ├── docs // 文档说明 ├── examples // 示例 ├── package.json ├── README.md // 包说明，会在npm展示 ├── scripts // 脚本 ├── src(packages) // 源码 ├── test // 单元测试 └── ... // 一些配置文件（eg: eslint、babel）
```

## 使用 rollup 开发

项目地址：[vtools](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftiandashu%2Fvtools "https://github.com/tiandashu/vtools")

### 初始化

```arduino
mkdir vtools npm init -y
```

### 配置 rollup

1.  根据开发环境区分不同的配置
2.  设置对应的 `npm script`
3.  输出不同规范的产物：umd、umd.min、cjs、esm
4.  兼容 `jest` 不支持 `es module`的问题

```arduino
mkdir scripts cd scripts touch rollup.config.base.js // 通用配置 touch rollup.config.dev.js // 开发环境配置 touch rollup.config.prod.js // 正式环境配置
```

rollup.config.base.js

```js
// 安装以下 npm 包 import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析 node_modules 中的模块 import commonjs from '@rollup/plugin-commonjs' // cjs => esm import alias from '@rollup/plugin-alias' // alias 和 reslove 功能 import replace from '@rollup/plugin-replace' import eslint from '@rollup/plugin-eslint' import { babel } from '@rollup/plugin-babel' import { terser } from 'rollup-plugin-terser' import clear from 'rollup-plugin-clear' import json from '@rollup/plugin-json' // 支持在源码中直接引入json文件，不影响下面的 import { name, version, author } from '../package.json' const pkgName = 'vtools' const banner = '/*!\n' + ` * ${name} v${version}\n` + ` * (c) 2014-${new Date().getFullYear()} ${author}\n` + ' * Released under the MIT License.\n' + ' */' export default { input: 'src/index.js', // 同时打包多种规范的产物 output: [ { file: `dist/${pkgName}.umd.js`, format: 'umd', name: pkgName, banner }, { file: `dist/${pkgName}.umd.min.js`, format: 'umd', name: pkgName, banner, plugins: [terser()] }, { file: `dist/${pkgName}.cjs.js`, format: 'cjs', name: pkgName, banner }, { file: `dist/${pkgName}.esm.js`, format: 'es', banner } ], // 注意 plugin 的使用顺序 plugins: [ json(), clear({ targets: ['dist'] }), alias(), replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), preventAssignment: true }), nodeResolve(), commonjs({ include: 'node_modules/**' }), eslint({ throwOnError: true, // 抛出异常并阻止打包 include: ['src/**'], exclude: ['node_modules/**'] }), babel({ babelHelpers: 'bundled' }) ] }
```

rollup.config.dev.js

```js
import baseConfig from './rollup.config.base' import serve from 'rollup-plugin-serve' import livereload from 'rollup-plugin-livereload' export default { ...baseConfig, plugins: [ ...baseConfig.plugins, serve({ port: 8080, contentBase: ['dist', 'examples/brower'], openPage: 'index.html', }), livereload({ watch: 'examples/brower', }) ] }
```

rollup.config.prod.js

```js
import baseConfig from './rollup.config.base' import filesize from 'rollup-plugin-filesize' export default { ...baseConfig, plugins: [ ...baseConfig.plugins, filesize() ] }
```

### 配置eslint

```js
npm i eslint -D // 生成配置文件 npx eslint --init // 使用 standard 规范 npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node // .eslintrc.js 配置 module.exports = { root: true, env: { browser: true, es2021: true, jest: true // 支持jest }, extends: 'standard', parserOptions: { ecmaVersion: 12, sourceType: 'module' }, rules: { 'space-before-function-paren': ['error', 'never'] } } // .eslintignore 配置, 防止校验打包的产物 dist
```

### 配置 babel

```java
npm i -D @babel/core @babel/preset-env // .babelrc.js module.exports = { presets: [ ['@babel/preset-env', { // rollupjs 会处理模块，所以设置成 false modules: false }] ], plugins: [ ] }
```

### 单元测试

> test 目录下创建 xxx.test.js(xxx 和 源码中的文件名保持一致)

-   选用 `jest` 做单元测试
-   配置 `eslint` 的 `jest` 环境
-   解决 `jest` 不支持 `es module` 的问题

```json
npm i -D jest // 支持 `es module` npm i -D rollup-jest // package.json 中设置 "jest": { "preset": "rollup-jest" } // 执行测试 jest // 测试覆盖率 jest --coverage
```

### 添加忽略文件

.gitignore

```
<span data-line-num="1">node_modules</span>
<span data-line-num="2">dist</span>
<span data-line-num="3">coverage</span>
```

.npmignore

```arduino
node_modules test src .babelrc.js .eslintrc.js scripts coverage docs .czrc .eslintignore .huskyrc .commitlint.config.js .commitlint.config
```

### README.md

添加徽标

-   GitHub徽标官网是[shields.io](https://link.juejin.cn/?target=https%3A%2F%2Fshields.io%2F "https://shields.io/")
-   普通徽标

```js
https://img.shields.io/badge/{徽标标题}-{徽标内容}-{徽标颜色}.svg // eg ![build](https://img.shields.io/badge/build-passing-success.svg)
```

-   动态徽标

```ruby
https://img.shields.io/github/issues/{github用户名}/{仓库名}.svg https://img.shields.io/github/forks/{github用户名}/{仓库名}.svg https://img.shields.io/github/stars/{github用户名}/{仓库名}.svg https://img.shields.io/github/license/{github用户名}/{仓库名}.svg
```

### git 提交校验

```java
npm install --save-dev husky @commitlint/config-conventional @commitlint/cli commitizen cz-conventional-changelog // commitlint.config touch commitlint.config.js module.exports = { extends: ["@commitlint/config-conventional"] }; // huskyrc touch .huskyrc { "hooks": { "pre-commit": "npm run format && npm run lint && npm test", "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" } } // touch .czrc touch .czrc { "path": "cz-conventional-changelog" } // package.json { "scripts": { "commit": "git-cz" } }
```

### package.json

```bash
{ "name": "@vtian/vtools", "version": "2.0.0", "description": "tools", "main": "dist/vtools.umd.js", "module": "dist/vtools.esm.js", "repository": { "type": "git", "url": "https://github.com/tiandashu/vtools.git" }, "bugs": { "url": "https://github.com/tiandashu/vtools/issues" }, "bin": { "hello": lib/index.js }, "homepage": "https://github.com/tiandashu/vtools#readme", "scripts": { "dev": "rollup -w --environment NODE_ENV:development -c scripts/rollup.config.dev.js", "build": "rollup --environment NODE_ENV:development -c scripts/rollup.config.prod.js", "x": "npm --no-git-tag-version version major", "y": "npm --no-git-tag-version version minor", "z": "npm --no-git-tag-version version patch", "lint": "eslint src", "fix": "npm run lint --fix", "commit": "git-cz", "test": "jest", "test:c": "jest --coverage", "prepublish": "npm run build", "pub": "npm publish --access=public", "pub:x": "npm run x && npm publish --access=public", "pub:y": "npm run y && npm publish --access=public", "pub:z": "npm run z && npm publish --access=public" }, "author": "tiandashu", "license": "ISC", # 开发依赖（作为npm包被install时，开发依赖不会被下载进node_modules） "devDependencies": {}, # 依赖（作为npm包被install时，依赖会被下载进node_modules） "dependencies": {}, "jest": { "preset": "rollup-jest" } }
```

## 使用 @vue/cli 开发

项目地址：[admin-widgets](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftiandashu%2Fadmin-widgets "https://github.com/tiandashu/admin-widgets")

1.  @vue/cli 初始化项目
2.  修改目录
3.  配置vue.config.js
4.  修改package.json

```js
npm i -g @vue/cli vue create qqmap-track
```

### 目录结构

```arduino
├── babel.config.js ├── docs // 文档 ├── examples // 示例 ├── lib // 构建目录 ├── package.json ├── packages // 源码 ├── public ├── README.md ├── types └── vue.config.js
```

### vue.config.js

```css
// vue.config.js module.exports = { pages: { index: { entry: 'examples/main.js', template: 'public/index.html', filename: 'index.html' } }, css: { extract: false // 是否单独抽离css }, configureWebpack: { output: { libraryExport: 'default', } } }
```

### package.json

```json
{ "name": "@vtian/admin-widgets", "version": "0.0.1", "private": false, "scripts": { "serve": "vue-cli-service serve", "build": "vue-cli-service build", "lint": "vue-cli-service lint", "lib": "vue-cli-service build --target lib --name adminWidgets --dest lib ./packages/index.js", "prepublish": "npm run lib2" }, "main": "lib/adminWidgets.umd.js", "typings": "types/index.d.ts", "homepage": "https://github.com/tiandashu/admin-widgets#README.md", "repository": { "type": "git", "url": "https://github.com/tiandashu/admin-widgets.git" }, "bugs": { "url": "https://github.com/tiandashu/admin-widgets/issues" }, "dependencies": { "core-js": "^3.6.5", "vue": "^2.6.11" }, "devDependencies": {}, "eslintConfig": { "root": true, "globals": { "TMap": "readonly" }, "env": { "node": true }, "extends": [ "plugin:vue/essential", "eslint:recommended" ], "parserOptions": { "parser": "babel-eslint" }, "rules": {} }, "browserslist": [ "> 1%", "last 2 versions", "not dead" ] }
```

## 测试 npm 包

> 如果我们每次验证功能都发布到 `npm` 无疑是不合理的（耗时、污染版本）, 我们可以使用以下2种方式进行验证

-   npm link

```js
// 包根目录下 npm link // 测试目录下 npm link vtools
```

-   通过 file 协议安装

```bash
npm i ../../vtools
```

## 发布

-   版本号严格按照 主版本号.次版本号.修订号 格式命名
-   版本是严格递增的，：1.8.0 -> 1.8.1 -> 16.8.2
-   发布重大版本或版本改动较大时，先发布alpha、beta、rc等先行版本
-   内部版本(alpha)；公测版本(beta)；正式版本的候选版本rc: 即 Release candiate

```arduino
npm login npm run pub
```

## 使用

```js
npm i -D @vtian/vtools import vtools from '@vtian/vtools'
```

### 存在的问题

通常在实际的开发中，我们都会像上面这种方式一样直接安装使用。但是这样使用有一个很大的问题。比如有10个项目使用了我们的 `vtools@1.0.0` 包，如果工具包需要开发新的功能发布为 `vtools@2.0.0` 了，难道要让所有的工程都升级一遍么（我相信很少会有人这么干）？或者工具包进行了破坏性的更新，对于用户来说可能并不清楚，如果升级会造成未知错误。

### 推荐的方式

如果你的包改动比较频繁或者考虑后期的可扩展，我更加推荐使用 `cdn` 的方式在项目中使用。

所以需要将包文件上传到 `cdn` 么？

-   其实完全不需要，当你发布为一个 `npm package` 时，我们就能及时的通过 [unpkg](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2F "https://unpkg.com/") 或 [jsdelivr](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdelivr.com%2F "https://www.jsdelivr.com/") 访问到我们的包文件，具体使用如下：

```js
// 使用格式 https://cdn.jsdelivr.net/npm/(your packagename)@(version)/(file) // eg: https://cdn.jsdelivr.net/npm//@vtian/vtools@0.0.3/dist/vtools.esm.js
```

如何自动升级，破坏性更新怎么办？

-   答案很简单就是让 [unpkg](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2F "https://unpkg.com/") 或 [jsdelivr](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdelivr.com%2F "https://www.jsdelivr.com/") 配合 `npm tag` 功能使用

```js
// 使用npm最后的版本，达到自动更新的目的 https://cdn.jsdelivr.net/npm//@vtian/vtools@latest/dist/vtools.esm.js // 如果最新的2.0.0版本是破坏性更新, 我们可以锁定之前的版本使用，非常灵活 https://cdn.jsdelivr.net/npm//@vtian/vtools@0.0.1/dist/vtools.esm.js // 破坏性更新 https://cdn.jsdelivr.net/npm//@vtian/vtools@2.0.0/dist/vtools.esm.js
```

[unpkg](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2F "https://unpkg.com/") 和 [jsdelivr](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdelivr.com%2F "https://www.jsdelivr.com/")

-   [unpkg](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2F "https://unpkg.com/") 和 [jsdelivr](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdelivr.com%2F "https://www.jsdelivr.com/") 用法一致
-   [unpkg](https://link.juejin.cn/?target=https%3A%2F%2Funpkg.com%2F "https://unpkg.com/") 可以理解为是 `npm` 官方提供的
-   [jsdelivr](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdelivr.com%2F "https://www.jsdelivr.com/") 还支持 `github` 和 `WordPress` 资源访问

## 参考资料

[cloud.tencent.com/developer/a…](https://link.juejin.cn/?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Farticle%2F1361698 "https://cloud.tencent.com/developer/article/1361698")