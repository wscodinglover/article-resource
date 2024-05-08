最近由于公司老项目上的问题，由于项目很老，之前交接的源码包中缺少了很大一部分模块，但是现在线上的环境和dist包是正常运行的，领导希望能够手动将这部分补全，由于前期项目的不规范，缺少接口文档以及原型图，因此无法知道到底该如何补全，因此，我想着能不能通过dist包去反编译源码包呢，经过多方面探索发现是可行的，但是只能编译出vue文件，但是也满足基本需要了。

## 1，如何反编译

1.首先需要在管理员模式下打开cmd

2.找到需要编译的dist/static/js的目录下 执行完成后在该目录会看到目录下存在下面的文件名：

0.7ab7d1434ffcc747c1ca.js.map，这里以0.7ab7d1434ffcc747c1ca.js.map为例，如下图:

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/xB67IcsqKk7Ru4tERfGkWZib0Nl7KibuA3zjEicjDlxtLoMwSdSZW0naYRBIwBekKlibUfhGYAHWXmyWbXmicw6xyMg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1 "图片")

图片

3.全局安装reverse-sourcemap资源

> npm install --global reverse-sourcemap4.反编译 执行：reverse-sourcemap --output-dir source

0.7ab7d1434ffcc747c1ca.js.map

## 2，脚本反编译

上面的方式执行完毕，确实在source中会出现源码，那么有没有可能用脚本去执行呢，通过node的child\_process模块中的exec方式便可以执行reverse-sourcemap --output-dir source这个命令，那么只需要拿到当前文件夹中包含.map文件即可，那么可以借助node中fs模块，递归读取文件名，并使用正则将所有.map的文件提取出来放在一个集合或数组中，在对数组进行递归循环执行reverse-sourcemap --output-dir source这个命令

## 2.1 根据child\_process模块编写执行函数

```
function&nbsp;executeReverseSourceMap(outputDir)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;构建&nbsp;reverse-sourcemap&nbsp;命令&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;command&nbsp;=&nbsp;`reverse-sourcemap&nbsp;--output-dir&nbsp;source&nbsp;${outputDir}`;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;执行命令&nbsp;&nbsp;&nbsp;&nbsp;exec(command,&nbsp;(error,&nbsp;stdout,&nbsp;stderr)&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(error)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(`执行命令时出错：${error.message}`);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(stderr)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(`命令输出错误：${stderr}`);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(`命令输出结果：${stdout}`);&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;}
```

## 2.2读取文件并匹配文件

```
//&nbsp;//&nbsp;读取文件夹中的文件fs.readdir(folderPath,&nbsp;(err,&nbsp;files)&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;if&nbsp;(err)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;console.error('读取文件夹时出错：',&nbsp;err);&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;}&nbsp;&nbsp;//&nbsp;遍历文件&nbsp;&nbsp;files.forEach(file&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;使用正则表达式匹配特定格式的文件名&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;match&nbsp;=&nbsp;/^(\d+)\..+\.js\.map$/.exec(file);&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(match)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;如果匹配成功，将文件名存入数组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targetFiles.push(match[0]);&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;});&nbsp;&nbsp;//&nbsp;输出目标文件名数组&nbsp;&nbsp;targetFiles.forEach(file=&gt;{&nbsp;&nbsp;&nbsp;&nbsp;executeReverseSourceMap(file)&nbsp;&nbsp;})});
```

## 2.3完整的执行代码

```
const&nbsp;fs&nbsp;=&nbsp;require('fs');const&nbsp;path&nbsp;=&nbsp;require('path');const&nbsp;{&nbsp;exec&nbsp;}&nbsp;=&nbsp;require('child_process');//&nbsp;文件夹路径const&nbsp;folderPath&nbsp;=&nbsp;'../js';//&nbsp;存放目标文件名的数组const&nbsp;targetFiles&nbsp;=&nbsp;[];function&nbsp;executeReverseSourceMap(outputDir)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;构建&nbsp;reverse-sourcemap&nbsp;命令&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;command&nbsp;=&nbsp;`reverse-sourcemap&nbsp;--output-dir&nbsp;source&nbsp;${outputDir}`;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;执行命令&nbsp;&nbsp;&nbsp;&nbsp;exec(command,&nbsp;(error,&nbsp;stdout,&nbsp;stderr)&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(error)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(`执行命令时出错：${error.message}`);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(stderr)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error(`命令输出错误：${stderr}`);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(`命令输出结果：${stdout}`);&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;}//&nbsp;//&nbsp;读取文件夹中的文件fs.readdir(folderPath,&nbsp;(err,&nbsp;files)&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;if&nbsp;(err)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;console.error('读取文件夹时出错：',&nbsp;err);&nbsp;&nbsp;&nbsp;&nbsp;return;&nbsp;&nbsp;}&nbsp;&nbsp;//&nbsp;遍历文件&nbsp;&nbsp;files.forEach(file&nbsp;=&gt;&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;使用正则表达式匹配特定格式的文件名&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;match&nbsp;=&nbsp;/^(\d+)\..+\.js\.map$/.exec(file);&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(match)&nbsp;{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;如果匹配成功，将文件名存入数组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;targetFiles.push(match[0]);&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;});&nbsp;&nbsp;//&nbsp;输出目标文件名数组&nbsp;&nbsp;targetFiles.forEach(file=&gt;{&nbsp;&nbsp;&nbsp;&nbsp;executeReverseSourceMap(file)&nbsp;&nbsp;})});
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "图片")

图片

## 3，最终结果展示图

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "图片")