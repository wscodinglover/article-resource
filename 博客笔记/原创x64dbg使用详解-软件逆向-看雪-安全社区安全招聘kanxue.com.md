## 一、 函数调用堆栈

下图是x86架构函数调用堆栈布局  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_SFU9KWJXTRNYTPM.png)

## 二、 常用窗口

1、 CPU 汇编代码窗口  
2、 Symbols 模块列表窗口  
3、 Dump1-dump5 数据查看窗口  
4、 寄存器窗口  
5、 堆栈窗口  
6、 breakPoints 断点列表窗口

## 三、 常用功能键

1、 Ctrl + G 转到地址，计算表达式的值  
2、 H 高亮显示（使用方法：按下H后，会出现一个红框，双击要高亮的显示的文字，就可以高亮显示）  
3、 F4 运行到当前选中的行  
4、 F2 下断点  
5、 F7 单步步入  
6、 F8 单步步过  
7、 F9 运行  
8、 CTRL + F9 执行到本函数的返回处，也就是遇到本函数RET指令停下  
9、 \* 转到RIP指向地址，也就是但钱汇编指令所在地址  
10、 ; 给当前选中的行添加注释  
11、 查找常量或字符串  
汇编窗口右击->选择“当前区域”或“当前模块”或“所有模块”-> “常数”或者字符串

## [](https://bbs.kanxue.com/thread-272515.htm#%E4%B8%89%E3%80%81%E4%B8%8B%E6%96%AD%E7%82%B9%E5%B9%B6%E6%89%A7%E8%A1%8C%E5%88%B0%E6%96%AD%E7%82%B9%E5%A4%84)三、下断点并执行到断点处

1、pdb符号设置  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_39VAZ69NWWCGN7Q.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_X48GVREMFPXX4ZN.png)  
2、入口断点设置  
菜单栏–选项–设置–事件选项卡下，可以设置什么时候暂停，入口断点，就是进入代码段的第一个地址，就暂停下来。这个是可选头部AddressOfEntryPoint的内存位置。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_3NZ7HCRPMF5RYDJ.png)  
3、下载符号并下断点  
右击要调试的程序，选择“用x64dbg调试”  
或者先打开x64dbg，选择文件->打开要调试的程序  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_RTW4UZHNA5MT3FS.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_GB33UPY9364UFKF.png)  
很多情况下，x64dbg不会自动加载符号文件，这时候就需要我们手动加载了，右击要下载pdb的模块，例如鼠标右击kernelbase.dll，再右键菜单中选中“下载此模块的符号信息”。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_JCB3ZD7UE2E49Q6.png)  
对搜索到的函数GetModuleFileNameA的入口处下断点。按下F9,将运行到GetModuleFileNameA的入口处，此时GetModuleFileNameA函数的任何一条指令都没有执行，因为64位程序的前四个参数用RCX,RDX,R8,R9传递，所以RCX，RDX ,R8分别对应GetModuleFileNameA的第一个、第二个、第三个参数，我们之关心第二个参数路径信息lpFilename，它对应RDX, 此时查看RDX的值。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_WMCQ23Y5PDHBSW3.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_AMW9VE52DNEH7FW.png)  
双击右下角调用堆栈的红色文本。即可返回到函数GetModuleFileNameA的调用处。只是返回到调用处，便于用户查看何处调用，并不是程序执行到调用处。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_J5E2K4UTXS8YW4B.png)  
返回到GetModuleFileNameA的调用出后，选中GetModuleFileNameA的下一行，  
按下F2，下断点。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_MHR7MPAUN45WXRY.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_72R8TFX5D9T3G9Y.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_NWPCGV53NHVBTHF.png)  
因为RDX是易变寄存器，但仅仅用来传递参数，函数执行完后，它的值可能就发生了变化，  
所以GetModuleFileNameA的第二个参数，是个指针，必须是刚中断到GetModuleFileNameA到时，GetModuleFileNameA的任何汇编指令尚未执行时，RDX寄存器的值，参看图8  
程序运行到GetModuleFileNameA的下一行处时，GetModuleFileNameA的汇编指令执行完毕了，第二个参数（对应图8的RDX值）  
鼠标选中任何一个内存窗口(鼠标焦点必须在内存窗口中)，按下快捷键CTRL + G，输入  
图8的RDX值，如果鼠标焦点在反汇编窗口中，按下CTRL + G，跳转到代码段指令地址处。  
焦点在内存窗口处，跳转的是内存地址处。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_S22ASWU6A4C99GQ.png)  
也可以通过以下插件查看内存，选择 插件/Scylla 打开插件窗口，选择 File/ Dump memory  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_4WDTAX8TSZKUHGM.png)

## 四、 如何修改汇编代码方法1

1)测试源代码为下面的代码，用vs2017编译为x64 release版本。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_6DRYBQ295HQ2GCG.png)

2)用x64dbg调试生成exe程序，修改某一行的汇编代码（按下快捷键“空格键”）  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_FDZXQKWR66GTPG7.png)  
3)修改后保存exe文件，右击汇编窗口，选择 “补丁”  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_9NMJ4PYCKDP9K4E.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_7W8VG3FGAVRV6H6.png)

## 五、 如何修改汇编代码方法2

1、鼠标选中需要修改的汇编代码（可选中多行），选择“二进制” -> “编辑”（或者使用快捷键Ctrl + E）  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_6QZBYS4QSY3DYM6.png)  
2、修改十六进制代码后，点击确定。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_HFQPVNA8JJ62BQG.png)  
3、修改十六进制代码后，按下快捷键CTRL+ P,或者右击，选择“补丁”，弹出“补丁对话框”  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_67AEQ66JEG3Y6NC.png)  
4、选择“修改补丁”按钮，另存为  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_D9SRGBZA46HG9F3.png)

## 六、 在某一行汇编代码前插入新的汇编代码

切换到"CPU"标签页，右击选择“二进制”=》“填充”（或者直接按下快捷键F）  
![图片描述](https://bbs.kanxue.com/upload/attach/202208/917132_YUMUYYGHETP76Y9.png)  
如果想把某几行用用nop空指令填充，选中要填充的行（可多行）可以选择“二进制”=》“用NOP填充”(或者快捷键Ctrl + 9)  
![图片描述](https://bbs.kanxue.com/upload/attach/202208/917132_A8ZPBXQ5R4V7XFX.png)

## 七、 查找程序中的字符串（在栈空间中或者堆字符串）

![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_76WT7W3UZZG9FR3.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_59GYYRG5UZTAYEF.png)

## 八、 消息断点

1、观察程序  
程序有两个文本框、按钮。为了学习消息断点，这次将会从使用消息断点的角度来分析程序。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_XXD5J4UEGP5DVS7.png)

2、分析程序  
将程序拖入到调试器中直接运行程序，接着在句柄标签栏——>右键刷新，就可以在窗口这个界面看到按钮窗口  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_ZFRBS89R7TVTRXP.png)  
选中我们需要下的按钮断点，右键——>消息断点，就会出现下图选择消息的界面  
按钮有几种状态？  
两种：按下、弹起  
这两个状态对应到消息断点就是按下“WM\_LBUTTONDOWN”，弹起“WM\_LBUTTONUP”  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_SNQ2P27YMZTG9HE.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_97F8252GPEZVDKM.png)  
接着我们在文本框中输入测试数据。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_HCBWFHM74YQP2TQ.png)  
当按下“Check”按钮后调试器会在下图的位置断下，这个时候如果一直单步调试是走不出user32.dll的，这是因为IsDialogMessage会把句柄传递位ring0。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_WUHCKEPUE2MK6DK.png)  
这个时候我们只需要在内存布局——>代码段右键——>内存执行断点——>运行  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_KMFSPU5VDGC8PZV.png)  
这个时候程序会在下图的位置断下。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_KJDJ75DB9SZBFDQ.png)  
继续往后分析发现GetDlgItemTextA函数，接着对这段代码进行详细分析，分析结果如下。  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_7U6WJWRAU4AVRTT.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_XEH87KEURGFRER8.png)

## [](https://bbs.kanxue.com/thread-272515.htm#%E4%B9%9D%E3%80%81%E8%B7%B3%E8%BD%AC%E5%88%B0%E6%8C%87%E5%AE%9A%E5%86%85%E5%AD%98%E5%9C%B0%E5%9D%80%E5%92%8C%E4%BB%A3%E7%A0%81%E5%9C%B0%E5%9D%80)九、跳转到指定内存地址和代码地址

1、跳转到指定代码地址

选择cpu标签，点击任意汇编代码处，按下ctrl + G,输入要跳转到的代码地址，  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_NPMD5UN4P4GRRBT.png)

2、跳转到指定内存地址  
鼠标点击下内存1窗口，按下ctrl + G  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_THC7Y39TCPVQ3Z4.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_H3WKRECFMWVSZHE.png)  
![图片描述](https://bbs.kanxue.com/upload/attach/202204/917132_8S9HXKWC7TMQFH8.png)

## [](https://bbs.kanxue.com/thread-272515.htm#%E5%8D%81%E3%80%81%E6%B3%A8%E5%85%A5dll%E5%88%B0%E8%BF%9B%E7%A8%8B)十、注入dll到进程

切换到“符号”标签页面，右键菜单选择“注入模块”  
![图片描述](https://bbs.kanxue.com/upload/tmp/917132_M75RVSWYGRVHDTE.png)  
选择要注入的dll  
![图片描述](https://bbs.kanxue.com/upload/tmp/917132_BQ6YEU9RMBEKK35.png)  
注入成功  
![图片描述](https://bbs.kanxue.com/upload/tmp/917132_BSMEA2F8T2F5BSV.png)

[\[培训\]《安卓高级研修班(网课)》月薪三万计划，掌握调试、分析还原ollvm、vmp的方法，定制art虚拟机自动化脱壳的方法](https://www.kanxue.com/book-section_list-84.htm)

最后于 2022-8-19 21:36 被sanganlei编辑 ，原因：

[#调试逆向](https://bbs.kanxue.com/forum-4-1-1.htm) [#其他内容](https://bbs.kanxue.com/forum-4-1-10.htm)