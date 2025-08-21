![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/f6F58IIXkYt6UwZdjj8YUeMEvvd71w1KfHjApHzicXpxOJjFYqfzJbRcasPicenbYiaRgib9Iw4icgGo0ibeBr82vAPw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)       

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/f6F58IIXkYt6UwZdjj8YUeMEvvd71w1KfHjApHzicXpxOJjFYqfzJbRcasPicenbYiaRgib9Iw4icgGo0ibeBr82vAPw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)      

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/f6F58IIXkYt6UwZdjj8YUeMEvvd71w1KNjN51ebBIjZh3odibRWwvC4mkLmDOVJSF4EYYMMJDw3siaW1WjYpUr5Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

不管是前端还是后端的伙伴，在工作中会经常遇到权限控制的场景，业务上无非就几种权限：**页面权限、操作权限、数据权限**，不同公司根据业务需要都采取不同的方法区控制权限，我们这里讨论一下使用 **JavaScript** 中的位运算符来控制权限。

## **进制类型**

**JavaScript** 中提供的进制表示方法有四种：**十进制、二进制、十六进制、八进制**。  
对于数值字面量，主要使用不同的前缀来区分：

-   十进制：取值数字 0-9；不用前缀。
    
-   二进制(Binary): 取值数字 0 和 1 ；前缀 0b 或 0B。
    
-   十六进制(Hexadecimal)：取值数字 0-9 和 a-f ；前缀 0x 或 0X。
    
-   八进制(Octal)：取值数字 0-7 ；前缀 0o 或 0O (ES6规定)。
    

## **位运算符**

什么是位运算符？  
位运算符指的是二进制位的运算，先将十进制数转成二进制后再进行运算。 在二进制位运算中，1表示true，0表示false。  
**JavaScript** 中的按位操作符有：

| 运算符 | 用法 | 描述 |
| --- | --- | --- |
| 按位与（AND） | A & B | 如果对应的二进制位都为 1，则该二进制位为 1 |
| 按位或（OR） | A 或 B | 如果对应的二进制位有一个为 1，则该二进制位为 1 |
| 按位异或（XOR） | A ^ B | 如果对应的二进制位只有一个为 1，则该二进制位为 1 |
| 按位非（NOT） | ~A | 反转所有二进制位，即 1 转换为 0，0 转换为 1 |
| 按位左移 | A << B | 将所有二进制位统一向左移动指定的位数，并在最右侧补 0 |
| 按位右移 | A >> B | 按位右移（有符号右移）：将所有二进制位统一向右移动指定的位数，并拷贝最左侧的位来填充左侧 |
| 无符号右移 | A >>> B | 按位右移零（无符号右移）：将所有二进制位统一向右移动指定的位数，并在最左侧补 0 |

示例：

```
<span><span>const</span> <span>A</span> <span>=</span> <span>0101</span><span>,</span><span>B</span> <span>=</span> <span>0001</span><br><span>// 按位与（AND）</span><br><span>A</span> <span>&amp;</span> <span>B</span> <span>=</span> <span>0001</span><br><br><span>// 按位或（OR）</span><br><span>A</span> <span>|</span> <span>B</span> <span>=</span> <span>0101</span><br><br><span>// 按位异或（XOR）</span><br><span>A</span> <span>^</span> <span>B</span> <span>=</span> <span>0100</span><br><br><span>// 按位非（NOT）</span><br><span>~</span><span>A</span> <span>=</span> <span>1010</span><br><br><span>// 按位左移</span><br><span>A</span> <span>&lt;&lt;</span> <span>1</span> <span>=</span> <span>1010</span><br><br><span>// 按位右移</span><br><span>A</span> <span>&gt;&gt;</span> <span>1</span> <span>=</span> <span>0010</span><br><br><span>// 无符号右移</span><br><span>A</span> <span>&gt;&gt;&gt;</span> <span>1</span> <span>=</span> <span>0010</span><br></span>
```

位运算符在工作中的应用得比较少，但有时候它可以很巧妙地解决我们工作中一些问题。

## **运用场景**

在传统的权限系统中，不同的权限之间存在很多关联关系，而且有很多种权限组合方式，在这种情况下，权限就越难以维护。这种情况我们就可以使用位运算符，可以很巧妙地解决这个问题。

假设我们现在权限系统中有4种基本权限：**可读、可写、创建、删除**。  
那么我们可以定义4个二进制变量表示：

```
<span><span>// 所有权限码的二进制数形式，有且只有一位值为 1，其余全部为 0</span><br><span>const</span> <span>READ</span> <span>=</span> <span>0b1000</span> <span>// 可读</span><br><span>const</span> <span>WRITE</span> <span>=</span> <span>0b0100</span> <span>// 可写</span><br><span>const</span> <span>CREATE</span> <span>=</span> <span>0b0010</span> <span>// 创建</span><br><span>const</span> <span>DELETE</span> <span>=</span> <span>0b0001</span> <span>// 删除</span><br></span>
```

## **权限操作**

1、使用 **按位或（OR）**添加权限：

```
<span><span>// 赋予用户全部权限</span><br><span>const</span> <span>ALL</span> <span>=</span> <span>READ</span> <span>|</span> <span>WRITE</span> <span>|</span> <span>CREATE</span> <span>|</span> <span>DELETE</span> <br><br>console<span>.</span><span>log</span><span>(</span><span>ALL</span><span>)</span><br><span>// 结果位 1111,每个位置的1就代表拥有这个权限，这里全部是1，就代表拥有全部权限。</span><br><br><span>// 同样的，这些权限可以自由组合</span><br><span>const</span> <span>READ_AND_WRITE</span> <span>=</span> <span>READ</span> <span>|</span> <span>WRITE</span>  <span>// 可读和可写，结果为 1100</span><br><span>const</span> <span>READ_AND_CREATE</span> <span>=</span> <span>READ</span> <span>|</span> <span>CREATE</span>  <span>// 可读和创建，结果为 1010</span><br><span>const</span> <span>WRITE_AND_DELETE</span> <span>=</span> <span>WRITE</span> <span>|</span> <span>DELETE</span>  <span>// 可写和删除，结果为 0101</span><br></span>
```

2、使用 **按位与（AND）**校验权限：

```
<span><span>// 比如我们拿到一个用户的权限，我们怎么根据返回的数据判断是否拥有某个权限呢？</span><br><br><span>// 假设现在返回了 拥有可读可写的权限组合：1100</span><br><span>const</span> auth <span>=</span> <span>READ</span> <span>|</span> <span>WRITE</span>  <span>// 可读和可写，结果为 1100</span><br><br><span>// 判断是否包含 READ 权限</span><br><span>const</span> isRead <span>=</span> <span>(</span>auth <span>&amp;</span> <span>READ</span><span>)</span> <span>===</span> <span>READ</span> <span>// true</span><br><br><span>// 是否包含 DELETE 权限</span><br><span>const</span> isDelete <span>=</span> <span>(</span>auth <span>&amp;</span> <span>DELETE</span><span>)</span> <span>===</span> <span>DELETE</span> <span>// false</span><br></span>
```

3、使用 **按位非（NOT）**剔除权限：

```
<span><span>// 全部权限</span><br><span>const</span> <span>ALL</span> <span>=</span> <span>READ</span> <span>|</span> <span>WRITE</span> <span>|</span> <span>CREATE</span> <span>|</span> <span>DELETE</span> <br><br><span>// 如果要剔除 WRITE 权限，应该怎么做呢，先执行 ~ 取反，再执行 &amp; 运算</span><br><span>const</span> notWrite <span>=</span> <span>ALL</span> <span>&amp;</span> <span>~</span><span>WRITE</span> <span>// 输出 1011</span><br><span>// 剔除 DELETE 权限</span><br><span>const</span> notDelete <span>=</span> <span>ALL</span> <span>&amp;</span> <span>~</span><span>DELETE</span> <span>// 输出 1110</span><br></span>
```

## 局限性

本文提到的这种位运算符方案，有一定的前提条件：

-   每种权限码都是唯一的，有且只有一位值为 1。
    
-   一个数字的范围只能在 -(2^53 -1) 和 2^53 -1 之间，如果权限系统设计得比较庞大，这种方式可能不合适。
    

**不过总的来说，这种方式在中小型业务中应该够用了。**      

end

“        

本期故事到这里就结束了，大家好，我是白雾茫茫丶！一名深漂程序员，深漂多年，这里有故事、有情怀、有分享，若本文得到您的认可，期望您的点赞、在看、转发。您的支持是我前进最大的动力！

”