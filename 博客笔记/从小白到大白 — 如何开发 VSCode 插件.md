> 作者：熊的猫
> 
> https://juejin.cn/post/7270486384102801468

## **前言**  

由于之前的国际化的项目中总是要统计老项目中待翻译的内容，然后再交由业务进行翻译，如果总是人为统计不仅相当耗费精力和时间，而且还不能保证是否有遗漏，因此想通过编写一个 i18n-helper 插件来实现这个功能。

然而，大家的需求总是出奇的相似（`因为已经有很多类似的插件存在了`），因此没必要重复造轮子了，但是 如何开发 vscode 插件 的过程可以记录下来，分享给大家！

希望本文对你有所帮助！！！

## **跑通官方插件示例**

好了，话不多说，我们先按着 官方文档 跑一下它的插件用例吧！

## **生成插件目录**

### **安装脚手架**

`npm install -g yo generator-code`

### **初始化插件目录**

终端运行 `yo code`，按照提示生成目录即可。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/p3q0CDzmjJNCBf8ggoROWePP8JgiczTqst4mgjDImkjzx3jicjhn5efoFbIN0EoUxNaXksQyky2tvbEYS28cgJ3A/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## **调试插件**

由于官方文档缺少一些细节，很容易导致小白调试插件失败，再常见的有如下情况。

### **找不到 Hello World 命令**

进入对应项目目录后，按照官方文档的指示可通过如下两种方式进行调试：

-   按快捷键 F5
    
-   点击编辑器左下方的 `Run Extension`
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

接着按下 Ctrl + Shift + P，并输入 `Hello World` 命令，发现无法找到对应的命令：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### **这个原因主要是因为 vscode 版本不一致造成的：**

-   package.json 文件中指定的 vscode 版本号
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    
-   当前实际的 vscode 版本号：
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

#### **解决方案自然就是保持版本的一致性**

-   升级 vscode 版本
    

-   适用于当前版本号低于 package.json 文件中指定的版本号
    
-   `【注意】` 现在 vscode 版本的更新模型已经调整为 “默认” 模式，所以现在不会收到 vscode 需要更新的信息，也无法进行通过 “检查更新” 按钮来进行更新
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

-   修改 package.json 文件中的 vscode 对应版本号  
    

-   这种方式比较简单直接，就是修改为和当前正在使用的 vscode 版本保持一致即可，如下：
    
    ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

### **Hello World 命令报错**

经过上述操作后，重新启动调试，按下 Ctrl + Shift + P，并输入 `Hello World` 命令，就可以找到对应的命令了，但是执行该命令时报错了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

原因就在于我们没有编译文件，此时注意查看 `package.json` 文件中的 `main` 字段会发现：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

很明显，我们没有编译源文件生成目标文件，此时我们只需要通过 `npm run watch` 启用监听模式，让其进行编译即可：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

此时在执行命令，就会发现成功了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## **【实战】编写 VSCode 插件**

## **插件的三个概念**

-   激活事件（针对 V1.74.0 之前的 VSCode 版本）
    

-   即插件激活的时机，目的是支持用户在输入 `Hello World` 命令后能够激活插件
    
-   例如，使用 `onCommand` 进行注册 `onCommand:extension.helloWorld` ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
    

-   发布内容配置  
    

-   VS Code 通过 `package.json` 进行扩展，通过配置 插件清单字段 便于开发插件
    
-   例如，使用 `contributes.commands` 绑定一个 命令 ID `extension.helloWorld`，目的是让 `Hello World` 命令就可以在命令面板中匹配到等
    

-   VS Code API  
    

-   插件代码中需要调用的一系列 JavaScript API 使用 VS Code 的一些功能特性
    
-   例如，通过 `vscode.commands.registerCommand` 将一个函数绑定到对应的 命令 ID `extension.helloWorld` 上，激活命令时执行的就是该函数等
    

目录结构比较简单就不过多介绍了。

## **在 VSCode 中预览 SVG 文件** **—** `<img />` 标签预览

当然相关的 svg 插件已经有不少了，这里只是用这个简单的需求来举个例子，方便让大家更容易理解。

### **SVG 文件在 VSCode 中的原始展示效果**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### **发布内容配置 — package.json 文件**

#### **面向用户的命令**

首先，我们要注册命令，让用户能够使用我们的插件，这里我们就简单支持如下两种方式：

-   Ctrl + Shift + P 匹配命令
    

-   只需要在 package.json 中的 `contributes.commands` 进行如下配置即可，详情可见 contributes.commands
    
    ```
    <span><span>"contributes"</span>: {</span>
    ```
    

-   鼠标右键菜单选择命令
    

-   这种方式相对于上面的方式来讲更简便，只需要在 package.json 中的 `contributes.menus` 进行如下配置即可，详情可见 contributes.menus
    
    ```
    <span><span>"contributes"</span>: {</span>
    ```
    

上述 鼠标右键菜单选择命令 的配置有一点不好，那就是安装此插件后，在任何文件中右键都会显示 Preview SVG 选项，此时 调试效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因为我们的本意是预览 SVG 文件，而不是其他文件，因此对于不符合的文件就没有必要展示此选项了，此时可以通过 when 子句上下文 来控制显示隐藏命令选项，此时配置更改为：

```
<span><span>"contributes"</span>: {</span>
```

调试效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 使用 VSCode API

#### **注册命令**

上述我们配置好了命令，现在就需要注册命令了，也就是决定当命令激活时需要做些什么事情，即只需要在 extension.ts 文件的 activate 方法中做如下修改即可：

```
<span><span>// 执行命令时被激活</span></span>
```

#### **使用 Webview**

平时我们通过浏览器使用 `<img>` 标签可以查看 svg 文件的效果，例如：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那么在 VSCode 中可不可以也以这样的方式来实现呢？

那当然是可以的。

我们可以使用如下代码编辑器中创建一个 Webview ，然后其中的 html 选项内容就可以用我们常见的 html 结构 来填充，并作为最终结果来进行 渲染，例如：

```
<span>  // 创建并显示新的 webview</span>
```

#### **获取目标文件的 base64 格式**

由于我们打开相应 svg 文件后右键进行预览，那么第一步就得先获取当前这个文件的路径，这就又得需要使用的 VSCode API 了，如下

```
<span> <span>const</span> editor = vscode.window.activeTextEditor;</span>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但是如果你直接把这个路径作为 `<img>` 标签的 src 属性是没法没正常渲染的，大致如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

既然如此，那么我们可以把这个 svg 文件读取到，然后把它转成 base64 的格式，再交由 `<img>` 标签使用即可，此时我们就需要使用到 node 内置的 fs 模块了，即：

```
<span>  <span>const</span> fs = <span>require</span>(<span>"fs"</span>);</span>
```

### **源代码 & 效果展示**

需要查看源码的可点此获取：源代码

经过上述的处理我们就可以在 VSCode 中预览 svg 文件了，效果如下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## **在 VSCode 中预览 SVG 文件 —** `<svg>` 标签预览

上述方案虽然可以实现我们需要的功能，但是对于 svg 文件来讲还是复杂了，因为在浏览其中是可以直接渲染 `<svg>` 标签的，而 svg 文件的内容不就是 `<svg>` 标签吗，那么我们只需要把文件内容读取出来，直接填充到 webview.html 中就好了，根本不需要转成 base64 格式。

这个方案比较简单，这里直接贴出 extension.ts 文件中的代码了：

```
<span><span>import</span> * <span>as</span> vscode <span>from</span> <span>"vscode"</span>;</span>
```

## **发布**

## **发布到官网应用市场**

通过 这个地址 注册开发者账号，然后按提示发布到官网应用市场即可。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## **使用 vsce 打成 vsix 插件**

这种方式可以实现即使 没有发布到应用市场，也可以直接通过对应文件的方式进行插件的安装和使用。

### **安装 vsce 工具**

安装命令 `npm i vsce -g`

### **打包生成 .vsix 文件**

直接使用 `vsce package` 命令进行打包，完成后就会生成一个 `.vsix` 文件，这个也就是在后续安装插件时要使用的文件。

> 【`注意`】 在使用这个命令打包时，可能会出现 vsce 所需要支持的 VSCode 最低版本和当前使用版本之间存在出入，导致打包失败：
> 
> ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) 特别是如果按照前文的方式直接修改 `package.json` 文件中的版本号时，此时最好还是将 VSCode 版本进行升级，而不是手动修改版本号。

### **安装 vsix 插件**

按照如下方式操作并选择对应的 `.vsix` 文件即可.

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## **最后**

以上就是本文的全部内容了，文中没有过多介绍那些没有用到的内容（如 `package.json` 相关配置），因为内容太多了，所以大家多查阅下官方文档即可。

通过本篇文章，希望能让你从一个 VSCode 插件开发 的小白变成大白，能够为团队赋能，或者作为自己的一个技能亮点。

推荐阅读  点击标题可跳转

1、[前端流程图插件对比选型](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617394&idx=1&sn=55979e109fafab1c0e613dd47f34bae9&chksm=8022afb3b75526a5a9316e58292656e806ffa396b61b8ebdee5754ac2512889a5d6d81946275&scene=21#wechat_redirect)

2、[这些天，我们前端组一起处理的项目优化](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617386&idx=1&sn=d3ef410baee45ee82be55d3eeaee5f2d&chksm=8022afabb75526bd4db8e33749910b6c1b0e14f29656979bd9416d6f835fd5fc405c54a38285&scene=21#wechat_redirect)

3、[用代码聊聊我们跟目前主流前端编程不一样的地方](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651617386&idx=2&sn=93a3ef6fa22435507bf0b274f489c327&chksm=8022afabb75526bdcf2f424450f8b059676b65e2cf27a3718ab0f72a8c9844eb09a5304103f2&scene=21#wechat_redirect)