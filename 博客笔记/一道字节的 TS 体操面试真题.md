前天，小册群友问了我一个 TS 体操问题，说是面字节时遇到的。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YprkEU0TtGg2kcP4icaX0EJNyyQibJg5uU25WGlgMDxqZqIDCxibHK3rjI3QFdibHGzaDYFlCTqCbh9YJtXkR169ww/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

今天又催了一下：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YprkEU0TtGg2kcP4icaX0EJNyyQibJg5uUj9DNgeibMtNicg3YdGjHMhX0unRNlVTcOPCgvUKqWZNkWCwnamOEHM2Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

面试题是这样的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

让实现这个 FormatDate 的类型，用来限制字符串只能是指定的日期格式。

看起来好像没多大难度，就是提取出 YY、MM、DD 和分隔符，然后构造对应的字符串类型就好了。

但上手试了一下，还真没那么简单。

首先，我们用模式匹配的方式，也就是 extends + infer 来提取出 YY、MM、DD 这三部分：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">type&nbsp;Seperator&nbsp;=&nbsp;<span data-darkreader-inline-color="">'-'</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">'.'</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">'/'</span>;<br><br>type&nbsp;FormatDate&lt;Pattern&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Pattern&nbsp;extends&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;Aaa}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Bbb}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Ccc}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;[Aaa,Bbb,Ccc]<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;never;<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

同样，也可以提取出分隔符部分：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">type&nbsp;FormatDate&lt;Pattern&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Pattern&nbsp;extends&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;Aaa}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Bbb}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Ccc}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Pattern&nbsp;extends&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${Aaa}</span><span data-darkreader-inline-color="">${infer&nbsp;Sep}</span><span data-darkreader-inline-color="">${Bbb}</span><span data-darkreader-inline-color="">${infer&nbsp;_}</span><span data-darkreader-inline-color="">${Ccc}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;[Aaa,&nbsp;Bbb,&nbsp;Ccc,&nbsp;Sep]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;never<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;never;<br></code>
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后根据 YY、MM、DD 分别构造 4 位和 2 位的字符串，最后组合起来不就行了？

但问题就在这里。

组合字符串字面量类型是这样写：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">type&nbsp;Num&nbsp;=&nbsp;<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">5</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">6</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">7</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">8</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">9</span>;<br><br>type&nbsp;YY&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${Num}</span><span data-darkreader-inline-color="">${Num}</span><span data-darkreader-inline-color="">${Num}</span><span data-darkreader-inline-color="">${Num}</span>`</span>;<br><br>type&nbsp;MM&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${Num}</span><span data-darkreader-inline-color="">${Num}</span>`</span>;<br><br>type&nbsp;DD&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${Num}</span><span data-darkreader-inline-color="">${Num}</span>`</span>;<br><br>type&nbsp;GenStr&lt;Type&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'YY'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;YY<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'MM'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;MM<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;DD;<br><br>type&nbsp;res3&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'YY'</span>&gt;}</span>-<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'MM'</span>&gt;}</span>-<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'DD'</span>&gt;}</span>`</span>;<br></code>
```

就是根据 YY、MM 还是 DD 生成不同的字符串字面量，然后组合到一块。

这时候会提示你 union 数量太多：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因为组合起来的情况太多了。

这时候需要减少 union 数量才行。

所以我们可以改成这样：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">type&nbsp;Num&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">5</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">6</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">7</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">8</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">9</span>;<br><br>type&nbsp;Num2&nbsp;=&nbsp;Num&nbsp;|&nbsp;<span data-darkreader-inline-color="">0</span><br><br>type&nbsp;YY&nbsp;=&nbsp;<span data-darkreader-inline-color="">`19<span data-darkreader-inline-color="">${Num2}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`20<span data-darkreader-inline-color="">${Num2}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>;<br><br>type&nbsp;MM&nbsp;=&nbsp;<span data-darkreader-inline-color="">`0<span data-darkreader-inline-color="">${Num}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`1<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>}</span>`</span>;<br><br>type&nbsp;DD&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>}</span><span data-darkreader-inline-color="">${Num}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`3<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>}</span>`</span>;<br><br>type&nbsp;GenStr&lt;Type&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'YY'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;YY<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'MM'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;MM<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;DD;<br><br>type&nbsp;res3&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'YY'</span>&gt;}</span>-<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'MM'</span>&gt;}</span>-<span data-darkreader-inline-color="">${GenStr&lt;<span data-darkreader-inline-color="">'DD'</span>&gt;}</span>`</span>;<br></code>
```

也就是年份只能是 19 和 20 开头，月份只能是 1-12 的数字，日期是 01-31 的数字。

这样，组合就少了很多。

再试下：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

现在就能正常计算出类型了。

然后用之前提取出的 Aaa、Bbb、Ccc 和 Sep 来生成字符串字面量类型：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样，就完成了需求：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

回过头来看一下，这个类型难么？

思路并不难，就是通过模式匹配（extends + infer）提取出各部分，然后构造对应的字符串字面量类型，组合起来就好了。

它难在如果直接组合，union 数量会过多，从而报错。

所以需要根据年月日的特点，对生成的字符串字面量类型做更精准的控制。

这样，就能生成满足需求的日期字符串类型。

全部代码如下，大家可以试试：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">type&nbsp;Seperator&nbsp;=&nbsp;<span data-darkreader-inline-color="">'-'</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">'.'</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">'/'</span>;<br><br>type&nbsp;Num&nbsp;=&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">3</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">4</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">5</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">6</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">7</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">8</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">9</span>;<br><br>type&nbsp;Num2&nbsp;=&nbsp;Num&nbsp;|&nbsp;<span data-darkreader-inline-color="">0</span><br><br>type&nbsp;YY&nbsp;=&nbsp;<span data-darkreader-inline-color="">`19<span data-darkreader-inline-color="">${Num2}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`20<span data-darkreader-inline-color="">${Num2}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>;<br><br>type&nbsp;MM&nbsp;=&nbsp;<span data-darkreader-inline-color="">`0<span data-darkreader-inline-color="">${Num}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`1<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>}</span>`</span>;<br><br>type&nbsp;DD&nbsp;=&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>}</span><span data-darkreader-inline-color="">${Num}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">1</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">2</span>}</span><span data-darkreader-inline-color="">${Num2}</span>`</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">`3<span data-darkreader-inline-color="">${<span data-darkreader-inline-color="">0</span>&nbsp;|&nbsp;<span data-darkreader-inline-color="">1</span>}</span>`</span>;<br><br>type&nbsp;GenStr&lt;Type&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'YY'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;YY<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;Type&nbsp;extends&nbsp;<span data-darkreader-inline-color="">'MM'</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;MM<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;DD;<br><br>type&nbsp;FormatDate&lt;Pattern&nbsp;extends&nbsp;string&gt;&nbsp;=&nbsp;<br>&nbsp;&nbsp;Pattern&nbsp;extends&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${infer&nbsp;Aaa}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Bbb}</span><span data-darkreader-inline-color="">${Seperator}</span><span data-darkreader-inline-color="">${infer&nbsp;Ccc}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;Pattern&nbsp;extends&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${Aaa}</span><span data-darkreader-inline-color="">${infer&nbsp;Sep}</span><span data-darkreader-inline-color="">${Bbb}</span><span data-darkreader-inline-color="">${infer&nbsp;_}</span><span data-darkreader-inline-color="">${Ccc}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?&nbsp;<span data-darkreader-inline-color="">`<span data-darkreader-inline-color="">${GenStr&lt;Aaa&gt;}</span><span data-darkreader-inline-color="">${Sep}</span><span data-darkreader-inline-color="">${GenStr&lt;Bbb&gt;}</span><span data-darkreader-inline-color="">${Sep}</span><span data-darkreader-inline-color="">${GenStr&lt;Ccc&gt;}</span>`</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;never<br>&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;never;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;a:&nbsp;FormatDate&lt;<span data-darkreader-inline-color="">'YY-MM-DD'</span>&gt;&nbsp;=&nbsp;<span data-darkreader-inline-color="">'2023-01-02'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;b:&nbsp;FormatDate&lt;<span data-darkreader-inline-color="">'DD/MM/YY'</span>&gt;&nbsp;=&nbsp;<span data-darkreader-inline-color="">'01/02/2024'</span>;<br><br><span data-darkreader-inline-color="">const</span>&nbsp;c:&nbsp;FormatDate&lt;<span data-darkreader-inline-color="">'DD/MM/YY'</span>&gt;&nbsp;=&nbsp;<span data-darkreader-inline-color="">'2024-01-02'</span>;<br><br></code>
```

更多内容可以看我的小册：TypeScript 类型体操通关秘籍

## 总结

今天我们做了一道字节的 ts 体操真题。

核心思路就是模式匹配（extends + infer）提取出各部分内容，然后构造日期字符串。

答出这个，应该就有大部分的分了。

但是如果直接构造，会因为 union 数量太多导致失败。

这时候要根据日期的特点想办法减少 union 的数量，直到可以顺利生成。

再答出这个，这道面试题就稳了。

这道题整体来说还是比较难的，既考察了模式匹配+ 构造的 ts 类型编程基础，又考察了对 union 太多的情况的处理，算是一道比较高阶的面试题。