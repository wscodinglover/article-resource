今天来说说 `npm install` 和 `npm ci` 的区别，以及附加选项`—legacy-peer-deps` 和`--force`。

最近，在stack overflow 经常 看到开发者提出以下问题：

-   为什么 CI/CD 管道不再工作？我们只是想做一个错误修复。两周前一切正常，现在管道却失灵了。
    
-   我们运行了 "npm install"，现在却出现了类型错误。我们做错了什么？
    
-   "npm install "失败的原因是某些对等依赖冲突。我们添加了"- legacy-peer-deps"，现在有些依赖在构建时丢失了。为什么会这样？
    
-   更改了 `.npmrc` 中的 artifactory URL。但是，每次执行 `npm install` 时，旧的 artifactory URL 都会添加到 `package-lock.json` 中。为什么会这样？
    

## "npm install" vs "npm ci"

大多数时候，依赖版本都列在一个插入符号(`^`)或波浪号(`~`)前面。在这种情况下，`npm` 将不会安装给定的确切版本，而是在给定范围内的最新版本。

-   ~version：“大约等于版本”(~1.2.3 := >=1.2.3 <1.(2+1).0 := >=1.2.3 <1.3.0–0)
    
-   ^version：“与版本兼容”(1.2.3 := >=1.2.3 <2.0.0–0)
    

## npm install

使用 `npm install` 时，不仅会下载并将 `package.json` 中列出的最新依赖包及其对等依赖包添加到本地的 `node_modules` 文件夹中，还会将其放入操作系统特定的缓存文件夹中，并将给定的依赖树存储在 `package-lock.json` 中。因此，删除整个 `node_modules` 文件夹并不意味着重新下载所有内容，而是在缓存文件夹中搜索相关软件包。

## npm ci

与 `npm install` 不同，`npm ci` 命令使用 `package-lock.json`，并根据此树安装所有依赖项。因此，只要 `package-lock.json` 不发生变化，每次执行 `npm ci` 时都会安装完全相同的依赖项。

## “—legacy-peer-deps”与“—force”

在安装过程中，可能会出现对等依赖冲突。

什么是对等依赖冲突？如果两个或多个依赖需要不同版本的包。例如，如果包A需要版本`2.0.0`，包B需要版本`1.0.0`。

使用`-legacy-peer-deps`时，安装过程中会忽略并跳过对等依赖关系\[ 3\]。因此，不会再发生对等依赖关系冲突。这是推荐使用的选项。不过，这也可能导致软件包丢失。

如何应用此选项？该选项可以添加到 npm 配置中，也可以作为附加参数传递。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;config&nbsp;<span data-darkreader-inline-color="">set</span>&nbsp;legacy-peer-deps=<span data-darkreader-inline-color="">true</span>&nbsp;--location=project<br>npm&nbsp;ci&nbsp;--legacy-peer-deps<br></code>
```

另一方面，`-force` 不会跳过对等依赖关系，而是安装所有相关的对等依赖关系版本。这可能不是我们想要的行为，因为这会增大 `node_modules` 文件夹。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;install&nbsp;--force<br></code>
```

简而言之，使用 `-legacy-peer-deps` 就可以了。不过，如果遇到依赖项缺失的情况，则应使用 `-force`。

## 从头开始安装依赖

有时，开发人员希望删除所有现有的本地依赖项，然后重新安装所有内容。例如，如果 artifactory URL 已经更改，他们被要求本地测试更改。这可以按照以下方式完成。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">//&nbsp;删除本地node_modules文件夹<br>rm&nbsp;-rf&nbsp;node_modules<br><br>//&nbsp;删除所有缓存的依赖<br>npm&nbsp;cache&nbsp;clean&nbsp;--force<br><br>npm&nbsp;install&nbsp;--force<br></code>
```

## 设置正确的artifactory

artifactory 必须在用户文件夹中存储的`.npmrc`文件中设置。不幸的是，只能配置一个artifactory。然而，如果你想使用多个，可以使用范围限定仓库。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">registry=https://FIRST-REPO-URL<br><br>//&nbsp;定义一个范围限定的存储库<br>@<span data-darkreader-inline-color="">test</span>:registry=http://SECOND-REPO-URL<br></code>
```

## 问题

\*\* 提问1：为什么 CI/CD 管道不再工作？我们只是想做一个错误修复。两周前一切正常，现在管道却失灵了。\*\*

在本例中，CI/CD 管道没有使用 `npm ci`，而是使用了 `npm install`。由于版本库不是定期更新，只是偶尔更新一次，因此安装了较新的软件包，并覆盖了 `package-lock.json`。这确实导致了一些类型错误。因此，请始终使用 `npm ci`。

**问题2：我们运行了 "npm install"，现在却出现了类型错误。我们做错了什么？**

与之前的问题相同。出现以下错误：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">Type&nbsp;<span data-darkreader-inline-color="">'Server'</span>&nbsp;is&nbsp;not&nbsp;generic<br></code>
```

`@types/ws` 必须添加确切的版本。

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">"@types/ws"</span>:&nbsp;<span data-darkreader-inline-color="">"8.5.4"</span><br></code>
```

**问题3："npm install "失败的原因是某些对等依赖冲突。我们添加了"- legacy-peer-deps"，现在有些依赖在构建时丢失了。为什么会这样？**

跳过了同行依赖关系。这确实导致了依赖关系的缺失。因此，必须使用 `npm ci - force`。

**问题4:我们更改了 .npmrc 中的 artifactory URL。但是，每次执行 "npm install "时，旧的 artifactory URL 都会添加到 package-lock.json 中。为什么会这样？**

本地节点模块文件夹已被删除。但是，操作系统专用缓存文件夹中仍包含所请求的依赖项。必须执行以下命令:

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">npm&nbsp;cache&nbsp;clean&nbsp;--force<br></code>
```

## 总结

总之，请在 CI/CD 管道中使用 `npm ci`。否则，由于依赖版本的更新，构建可能会中断。

### 

最后：

[vue2与vue3技巧合集](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NDQ0ODU3MA==&scene=1&album_id=2509459125236416515&count=3#wechat_redirect)

[VueUse源码解读](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=2854832033280311296&from_itemidx=1&from_msgid=2247515074&scene=173&count=3&nolastread=1#wechat_redirect)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因为微信公众号修改规则，如果不标星或点在看，你可能会收不到我公众号文章的推送，请大家将本**公众号星标**，看完文章后记得**点下赞**或者**在看**，谢谢各位！