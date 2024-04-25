持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第25天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

  

## 本文简介

**点赞 + 关注 + 收藏 = 学会了**

操作文件是服务端一个基础的功能，也是做后端开发的必备能力之一。

操作文件主要包括读和写。而这些功能 `NodeJS` 都已经提供了对应的方法。只要调用就行了。

## 创建文件夹

**同步方法**

```js
const fs = require('fs') fs.mkdirSync(`${__dirname}/雷猴`)
```

`NodeJS` 有一个文件模块，叫 `fs` 。对文件操作的话，必须先引入这个模块。

使用 `fs.mkdirSync` 方法可以创建一个文件夹。里面传入要创建的文件夹的名字即可。

`__dirname` 指的是当前文件所在文件夹的绝对路径。

**异步创建**

```js
const fs = require('fs') fs.mkdir(`${__dirname}/雷猴`, err => { if (err) { console.error(err) } })
```

使用 `fs.mkdir` 方法可以进行异步创建，第一个参数也是文件夹名称，第二个是回到函数，该函数里有一个 `err` 参数，可以返回错误信息。

## 删除文件

创建完文件夹，本来是想讲 “删除文件夹” 的。但由于删除文件夹之前要清空里面所有文件，所以就把 **删除文件** 的用法放在前面讲。

删除文件分 **同步** 和 **异步** 两种方法。

**同步 fs.unlinkSync**

```js
const fs = require('fs') fs.unlinkSync(`${__dirname}/test.txt`);
```

`fs.unlinkSync` 里传入要删除的文件路径和文件名，即可删除指定文件。

**异步 fs.unlink**

```js
const fs = require('fs') fs.unlink(`${__dirname}/test.txt`, err => { if (err) { console.error(err) } })
```

`fs.unlink` 方法有2个参数，第一个参数是文件路径和文件名，第二个参数是监听删除失败的回调函数。

## 删除文件夹

**删除文件夹之前要清空目标文件夹里的所有文件。** 可以使用 `fs.unlinkSync` 或 `fs.unlink` 删除文件。

**同步**

```js
const fs = require('fs') fs.rmdirSync(`${__dirname}/雷猴`)
```

**异步**

```js
const fs = require('fs') fs.rmdir(`${__dirname}/雷猴`, err => { if (err) { console.error(err) } })
```

和删除文件的用法差不多，删除文件夹的方法也有同步和异步，异步接受2个参数，第二个参数同样是监听报错的回调。

## 写入数据

```js
const fs = require('fs') const content = ' 雷猴雷猴\n' const opt = { flag: 'a', // a：追加写入；w：覆盖写入 } fs.writeFile('test.txt', content, opt, (err) => { if (err) { console.error(err) } })
```

`fs.writeFile` 方法可以将内容写入文件中。如果文件不存在，会自动创建文件。

`fs.writeFile` 参数说明：

-   第一个参数：文件名
-   第二个参数：写入的内容
-   第三个参数：写入模式（追加、覆盖等）
-   第四个参数：错误信息监听

## 读取数据

```js
const fs = require('fs') fs.readFile('fileName', (err, data) => { if (err) { console.error(err) return } // data 是二进制类型，需要转换成字符串 console.log(data.toString()) })
```

使用 `fs.readFile` 方法可以读取数据，第一个参数是文件名；第二个参数是回调，`err` 监听错误信息，`data` 是读取回来的数据。

需要注意的是，读取回来的 `data` 是一个二进制类型的数据，需要使用 `toString()` 方法转换成我们读得懂的数据。

## 检查文件是否存在

```js
const fs = require('fs') const exist = fs.existsSync('fileName') console.log(exist)
```

使用 `fs.existsSync` 方法可以检测指定文件是否存在，如果存在就返回 `true` ；否则返回 `false` 。

  

## 总结

如果你使用 `NodeJS` 做后台，读写文件这块知识点是逃不过去的。它最常见的功能可以写日志，比如收集错误日志等。

日志我们也可以写在数据库里，不过不是所有电脑都装了相同的数据库。但如果你将日志写在一个文件中，文件的内容在别的电脑一般都能轻易打开。

## 推荐阅读

👍[《『NodeJS http请求》](https://juejin.cn/post/7108112101729632293 "https://juejin.cn/post/7108112101729632293")

👍[《『NodeJS 5分钟 连接MySQL 增删改查》](https://juejin.cn/post/7108888491995430919 "https://juejin.cn/post/7108888491995430919")

👍[《『NodeJS 操作cookie》](https://juejin.cn/post/7109127893522841614 "https://juejin.cn/post/7109127893522841614")

👍[《『NodeJS 5分钟 连接 Redis 读写操作》](https://juejin.cn/post/7110042941694935048 "https://juejin.cn/post/7110042941694935048")

**点赞 + 关注 + 收藏 = 学会了**