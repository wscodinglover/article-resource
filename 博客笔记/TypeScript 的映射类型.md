在 JavaScript 中，数组的 _map_ 方法可以**把元素映射为新值**。  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rFnC9Zib9UA0761h1DwibdLJ9libobpbtXBhBsa4d7468YMWxicawrhFbS4iaWx7vxNv0NaJibXEKeMPKCHTzpYRhGeQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

TypeScript 借鉴 map 方法的思路，创造出**映射类型**（_mapped type_）。映射类型是一种**泛型类型**，它会**遍历已有类型**，然后通过变换操作产生新类型。

最常见的用法，是使用 _keyof_ 关键词获取所有的字段，使用 _in_ 关键词进行遍历。在下面的例子中，新类型和旧类型的字段名相同，但所有字段类型映射为布尔值。  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rFnC9Zib9UA0761h1DwibdLJ9libobpbtXBAPHCerJMZBbKEzmr0PHYWCSxj1UMjian5WIiby7xRzoh2GmibUCXfQptg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**一、映射修饰符**

在映射过程中，可以使用**映射修饰符**（_mapping modifiers_）对结果进行微调精修。  

TypeScript 提供了两个修饰符，一个是 _readonly_，用于调整字段**是否可以被修改**（即可变性，_mutability_）。另一个是问号（_?_），用于调整字段**是否必填**。

使用前缀加号（+）增加修饰符，使用前缀减号（-）移除修饰符。如果没有任何前缀，默认是增加。  

在下面的例子中，移除了所有字段的只读修饰符，因此新类型的所有字段都可以被编辑。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在下面例子中，移除了所有字段的可选修饰符，新类型的所有字段都是必填项。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**二、使用 as 的重新映射**

TypeScript 4.1 引入一个新的关键词 _as_，用于在映射过程中创建新的字段名。这个关键词通常与**模板字面量类型**（_Template Literal Types_）搭配使用。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果要剔除某个字段，可以使用**条件类型**返回 never 。因为剔除类型的操作很常见，TypeScript 内置了工具类型 _Exclude<T, U>_ ，它其实是条件类型的一个别名。  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**三、遍历任意类型**

上面的例子中，都是通过 _P in keyof T_ 的形式遍历类型的键。其实，遍历并不局限于键，你可以遍历任意联合类型。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**参考资料**

1.  Mapped Types，https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
    
2.  Key Remaping in Mapped Types - TypeScript 4.1，https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types
    
3.  Template Literal Types，https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
    

完