今天分享11个yyds微信小程序开源项目，希望对大家有所帮助，同时祝大家学业有成、接私活赚钱赚到手软、技能更上一层楼。

## 全文大纲

1.  UrShop-多店铺SAAS+三级分销微信小程序
    
2.  ChatGPT-MP-基于 ChatGPT 实现的微信小程序，适配 H5 和 Web 端
    
3.  前端铺子-基于 Vue，使用 colorUi 与 uView，完美支持微信小程序
    
4.  叮点跑腿-小程序采用 uniapp 实现的一套跑腿下单接单系统
    
5.  wanyue\_dangjian-一套智慧党建小程序管理系统
    
6.  GarbageSort-一套垃圾识别精灵基于 uni-app 开发的微信小程序
    
7.  QuestionWechatApp-智慧考题宝小程序适用于考核，评测等场景
    
8.  BookChatApp-通用书籍阅读APP，使用 uni-app 实现，支持多端分发
    
9.  Mall4j商城-一个基于Vue、element ui 的轻量级、前后端分离、拥有完整 sku和下单流程的开源商城的小程序端
    
10.  WeTravel-一个为游客朋友提供多元化服务的一站式数字文旅平台
    
11.  bee-餐饮点餐微信小程序商城，是针对餐饮行业推出的一套完整的餐饮解决方案
    

## UrShop

Gitee：https://gitee.com/urselect/urshop

UrShop小程序商城基于原生微信小程序 + NetCore 技术构建 ，项目包含多店铺SAAS商城，三级分销，微信小程序，管理后台，物流配送，优惠券，积分，促销，插件管理等功能。

### 功能明细模块

-   支持多种电子商务交易模式，企业与个人间交易模式（B2C，网上零售）
    
-   SKU，支持单个产品的多产品规格（多SKU），每个SKU关联库存
    
-   每个产品均提供了重量、长宽高设置，方便物流计费
    
-   产品所属分类支持多个分类
    
-   订单管理支持对订单状态、订单价格、支付状态进行修改
    
-   订单可修改商品，客服人员可以给指定订单加赠品
    
-   订单配送 商品太多,可以分拆开配送，商品支持多张配送单
    
-   订单操作有记录，方便显示订单处理跟踪
    
-   配送发货收货，允许后台操作人员操作修改，对于货到付款商品、用户没有及时操作确定交货的配送单。可以按情况确定交货
    
-   配送提供区域限制、配送方式选择
    
-   畅销表报 可以指定条件查看畅销产品
    
-   低库存报表,分别你了解商品库存情况
    
-   客户信息，查看用户购物车、地址、活动记录。为客户添加积分
    
-   操作人员不限制，可以添加操作人员来管理指定后台板块
    
-   首页幻灯片大图，主题自带幻灯片功能（功能简单，设置简单）；
    
-   自带多种小插件（持续增加中）；
    
-   文章页面相关文章/产品展示；
    
-   热门产品轮播展示模块；
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## ChatGPT-MP

Gitee：https://gitee.com/smalle/ChatGPT-MP

基于 ChatGPT 实现的微信小程序，适配 H5 和 Web 端。包含前后端，支持打字效果输出流式输出，支持 AI 聊天次数限制，支持分享增加次数等功能。

### 功能明细

-   ChatGPT聊天
    
-   用户聊天次数限制
    
-   分享得聊天次数
    
-   每日领取免费次数
    
-   查看及清除聊天历史
    
-   显示连接情况
    
-   清除聊天历史
    
-   开通会员
    
-   购买次数包
    
-   联系客服领取次数
    
-   看广告得次数
    
-   后台管理系统，暂时为升级版功能，之后会择机开源
    
-   敏感词检测及设置
    
-   适配H5和WEB端
    
-   登录方式支持：小程序登录/微信公众号登录/手机号注册登录/邮箱注册登录
    
-   提示词功能(角色扮演)，内置近300种提示词，包含小红书文案书写、周报生成、异性对话生成器等
    
-   AI生成图片、语音转换等功能
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 前端铺子

Gitee：https://gitee.com/kevin\_chou/qdpz

基于 Vue，使用 colorUi 与 uView，完美支持微信小程序，包含功能：聊天室、自定义底部与顶部、地图轨迹回放、电子签名、图片/海报编辑器、自定义相机/键盘、拍照图片水印、智能抠图、照片墙、在线答题、证件识别、周边定位查询、文档预览、各种图表、行政区域、海报生成器、视频播放、主题切换、时间轴、瀑布流、排行榜、课程表、渐变、加载动画、请求封装等

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 叮点跑腿

Gitee：https://gitee.com/landalfyao/ddrun

后端采用 midway3.0，后台采用 nuxt2.x，小程序采用 uniapp 实现的一套跑腿下单接单系统。主要功能包括帮送服务、帮买服务、骑手注册、骑手接单、用户下单、提现、订单分配系统、优惠券、物品重量计算、距离计算等。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## wanyue\_dangjian

Gitee：https://gitee.com/WanYueKeJi/wanyue\_dangjian

智慧党建管理系统是一套集学习手册、党员风采、内容管理等功能为一体的智慧党建系统，满足用户对于组织学习、党建参阅、党员管理等多种活动的场景需求。

### 主要功能介绍

-   登录页面，可通过手机号码及验证码进行登录.
    
-   首页功能，展示Banner轮播图、工作提示、推荐文章
    
-   账号，展示头像、昵称等账号信息，可编辑头像、昵称
    
-   学习手册, 展示党史知识、党建参阅
    
-   先模风采, 展示党员风采和先进事迹
    
-   个人中心, 展示用户相关资料和修改密码
    

### UNI-APP端:

1.  一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序
    
2.  依托Dcloud公司强大的生态圈, 开发者无论是拿来直接用还是自己修改后使用都十分的方便, 网上资料/文档齐全,无需担心bug解决不了..
    
3.  项目占用空间小,全部加起来不到2MB,占用开发者磁盘空间极少.
    
4.  代码中做了多端适配, 小程序端、H5端、安卓、IOS端样式都做到了样式兼容.
    
5.  使用vue开发, 保证了样式美观的同时, 规避了nvue样式的兼容问题.
    
6.  配置方便, 无需安装, 下载之后使用Hbuilder编辑器即可运行查看.
    

### 后端:

1.  后台应用ThinkCMF快速生成现代化表单.
    
2.  PHPExcel数据导出,导出表格更加美观,可视.
    
3.  后台多任务窗口化操作界面.
    
4.  内置强大灵活的权限管理.
    
5.  内置组合数据,系统配置,管理碎片化数据.
    
6.  客户端完善的交互效果和动画.
    
7.  高频数据缓存.
    
8.  内置PhalApi接口框架,前后端分离更方便.
    
9.  支持队列降低流量高峰，解除耦合，高可用.
    
10.  无需安装, clone下来即可直接使用, 完全100%真开源.
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## GarbageSort

Gitee：https://gitee.com/aaluoxiang/GarbageSort

垃圾识别精灵是一个基于 uni-app 开发的微信小程序，使用 SpringBoot2 搭建后端服务，使用 Swagger2 构建 Restful 接口文档，实现了文字查询、语音识别、图像识别其垃圾分类等功能。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## QuestionWechatApp

Gitee：https://gitee.com/kesixin/QuestionWechatApp

智慧考题宝小程序适用于考核，评测等场景，功能包括：练习模式（顺序答题，随机答题，专项答题，题型答题，高频错题）、背题模式、模拟考试、错题集、收藏题集、搜索题目、排行榜、签到功能，资讯文章，答题设置，答题音效，积分功能，激活码功能，多级题库分类。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## BookChatApp

Gitee：https://gitee.com/truthhun/BookChatApp

通用书籍阅读APP，使用 uni-app 实现，支持多端分发，编译生成Android和iOS 手机APP以及各平台的小程序。注册、登录、搜索、书架、书签、阅读偏好设置等功能齐全。

### 特点

-   开源：基于 Apache 2.0 开源协议进行开源，对商业友好
    
-   秀气：简洁、美观，给您焕然一新的视觉体验，让你都不敢相信这是一个擅长后端的程序员设计和开发实现的
    
-   丰富：注册、登录、搜索、书架、书签、阅读偏好设置等功能齐全，麻雀虽小，五脏俱全
    
-   强大：尽管BookChatApp使用的是混合开发，但是编译生成的手机App以及各平台的小程序，性能和体验也没见得真比原生的差
    

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## Mall4j商城

Gitee：https://gitee.com/gz-yami/mall4m

一个基于Vue、element ui 的轻量级、前后端分离、拥有完整 sku和下单流程的开源商城的小程序端。mall4j商城项目致力于为中小企业打造一个完整、易于维护的开源的电商系统，采用现阶段流行技术实现。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## WeTravel

Gitee：https://gitee.com/voice-of-xiaozhuang/WeTravel

旅游景区门户是一个为游客朋友提供多元化服务的一站式数字文旅平台，提供“吃、住、游、购、娱”等旅游行程中的多种服务，全面支持景区介绍，景点攻略，景点预约，停车预约、景区导览等功能，游客可以在小程序中了解旅游度假区的景点信息、历史文化、各类活动等。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## bee

Gitee：https://gitee.com/woniudiancang/bee

微信小程序——餐饮点餐商城，是针对餐饮行业推出的一套完整的餐饮解决方案，实现了用户在线点餐下单、外卖、叫号排队、支付、配送等功能，完美的使餐饮行业更高效便捷！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 

**欢迎`长按图片加刷碗智为好友，定时分享 Vue React Ts 等。`**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 

最后：

[vue2与vue3技巧合集](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NDQ0ODU3MA==&scene=1&album_id=2509459125236416515&count=3#wechat_redirect)

[VueUse源码解读](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=2854832033280311296&from_itemidx=1&from_msgid=2247515074&scene=173&count=3&nolastread=1#wechat_redirect)