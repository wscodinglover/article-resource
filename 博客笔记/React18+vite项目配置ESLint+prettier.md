  

### ESLint

-   执行初始化命令：
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npx&nbsp;eslint&nbsp;--init<br></code>
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/wZydIHGg4BJcicBrlgVmDNBeQbOQZFZ73DYSS4eFkJeLRZfWcdpmmCy8iao6sKJS1uDck1ibHCj2OUefBVAdJVhXw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

image.png

-   ESLint React Hook
    

eslint-plugin-react-hooks链接：https://www.npmjs.com/package/eslint-plugin-react-hooks

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;eslint-plugin-react-hooks<br></code>
```

-   eslint-plugin-import
    

eslint-plugin-import链接：https://www.npmjs.com/package/eslint-plugin-import eslint-import-resolver-typescript链接：https://www.npmjs.com/package/eslint-import-resolver-typescript（不要这个也可以）

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;eslint-plugin-import&nbsp;eslint-import-resolver-typescript<br></code>
```

### prettier

-   安装
    

eslint-config-prettier链接：https://github.com/prettier/eslint-config-prettier

eslint-plugin-prettier链接：https://github.com/prettier/eslint-plugin-prettier

可以在插件的官网中，找到一些配置

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">yarn&nbsp;add&nbsp;prettier&nbsp;eslint-config-prettier&nbsp;eslint-plugin-prettier<br></code>
```

-   创建`.prettierrc.cjs`文件
    

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">echo</span>&nbsp;{}&gt;&nbsp;.prettierrc.cjs<br></code>
```

-   添加配置
    

根据你项目的要求进行配置

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//.prettierrc.cjs</span><br><span data-darkreader-inline-color="">module</span>.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"singleQuote"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"printWidth"</span>:&nbsp;<span data-darkreader-inline-color="">100</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"tabWidth"</span>:&nbsp;<span data-darkreader-inline-color="">2</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"useTabs"</span>:&nbsp;<span data-darkreader-inline-color="">false</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"semi"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">"trailingComma"</span>:&nbsp;<span data-darkreader-inline-color="">"none"</span><br>}<br></code>
```

### 配置`.eslintrc.cjs`文件

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">&nbsp;module.exports&nbsp;=&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"env"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"browser"</span>:&nbsp;<span data-darkreader-inline-color="">true</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"es2021"</span>:&nbsp;<span data-darkreader-inline-color="">true</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"extends"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"eslint:recommended"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugin:react/recommended"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugin:@typescript-eslint/recommended"</span>,<span data-darkreader-inline-color="">//以下是配置我们安装的eslint的一些依赖插件</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugin:import/typescript"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugin:react-hooks/recommended"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugin:prettier/recommended"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"overrides"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"parser"</span>:&nbsp;<span data-darkreader-inline-color="">"@typescript-eslint/parser"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"parserOptions"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"ecmaVersion"</span>:&nbsp;<span data-darkreader-inline-color="">"latest"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"sourceType"</span>:&nbsp;<span data-darkreader-inline-color="">"module"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"project"</span>:<span data-darkreader-inline-color="">"./tsconfig.json"</span>&nbsp;<span data-darkreader-inline-color="">//指定TypeScript配置文件的路径。这个配置项告诉ESLint去读取和使用指定路径下的tsconfig.json文件，</span><br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"plugins"</span>:&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react-hooks"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"@typescript-eslint"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"prettier"</span>&nbsp;<span data-darkreader-inline-color="">//添加prettier</span><br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"rules"</span>:&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//配置项目的一些规则，如下</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//React17后无需导入React</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react/react-in-jsx-scope"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;不检验类型</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react/prop-types"</span>:&nbsp;<span data-darkreader-inline-color="">"off"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;react-hooks</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react-hooks/rules-of-hooks"</span>:&nbsp;<span data-darkreader-inline-color="">"error"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"react-hooks/exhaustive-deps"</span>:&nbsp;<span data-darkreader-inline-color="">"warn"</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">"linebreak-style"</span>:&nbsp;[<span data-darkreader-inline-color="">"error"</span>,&nbsp;<span data-darkreader-inline-color="">"unix"</span>],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;"import/order":&nbsp;[</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"error",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"groups":&nbsp;[</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"builtin",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"external",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"internal",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"parent",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sibling",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"index",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"object"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"newlines-between":&nbsp;"always",</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"alphabetize":&nbsp;{&nbsp;"order":&nbsp;"asc",&nbsp;"caseInsensitive":&nbsp;true&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">//&nbsp;]</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></code>
```

### 修改`tsconfig.json`文件

指定了TypeScript编译器需要包含的文件和文件夹。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">//省略...</span><br>&nbsp;<span data-darkreader-inline-color="">"include"</span>:&nbsp;[<span data-darkreader-inline-color="">"vite.config.ts"</span>,<span data-darkreader-inline-color="">".eslintrc.cjs"</span>,<span data-darkreader-inline-color="">"src"</span>],<br>&nbsp;<span data-darkreader-inline-color="">//省略···</span><br></code>
```

### WebStorm中的配置

打开setting配置，如下：

-   勾选自动运行eslint![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
-   勾选保存时运行Prettier
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

image.png

当我们保存代码时，就会自动格式化代码。

以上就是今日分享的文章，晚安啦！！