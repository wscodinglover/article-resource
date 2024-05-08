## 求求你别用轮询了！手把手教你封装WebSocket消息推送，彻底告别轮询！

> 在做一些后台项目的时候，有时候需要前端去实时接收消息；一种比较原始的做法就是前端每隔一段时间主动去轮询服务器，如果用户较多的情况下，会给服务器造成一定的压力，而且访问的频率也无法准确把握，所以这种需求还是使用`websocket`来解决。 下面我们就从0到1封装一套`websocket`消息推送功能模块。文章涉及到的知识均为前端部分，后端部分我们就不展开来说了。如果文章对你有帮助，记得👍点赞🌟收藏！

## 需求梳理

我们还是使用`class`来封装，该模块需要提供以下功能：

-   `WebSocket`对象的创建
-   `WebSocket`对象的关闭
-   启用心跳机制，避免断连
-   消息推送，接收到消息后进行业务逻辑处理
-   重连机制，如果断连后尝试一定次数的重连，超过最大次数后仍然失败则关闭连接

下面我们就逐一实现这些功能。

## 功能实现

下面我们就逐个实现一下相关功能。

### 创建WebSocket类

新建`WebSocketManager.js`文件，创建一个`WebSocketManager`类，同时初始化一些参数，具体代码如下：

```js
export default class WebSocketManager { constructor(url = null, userId = null, receiveMessageCallback = null) { this.socket = null // WebSocket 对象 this.pingTimeout = null // 心跳计时器 this.reconnectTimeout = 5000 // 重连间隔，单位：毫秒 this.maxReconnectAttempts = 10 // 最大重连尝试次数 this.reconnectAttempts = 0; // 当前重连尝试次数 this.id = userId //用户ID（业务逻辑，根据自己业务需求调整） this.url = url // WebSocket 连接地址 this.receiveMessageCallback = receiveMessageCallback // 接收消息回调函数 } }
```

### 初始化WebSocket对象

初始化完成后，我们先实现一个`initialize`方法，在这里我们要监测一下使用时候是否传入了`webSocket`连接的服务器地址、用户`id`等；如果没有问题，则连接`WebSocket`。

```js
export default class WebSocketManager { constructor() { // ...省略 } /** * 初始化 */ async start() { if( this.url && this.id){ // 连接WebSocket this.connectWebSocket() }else{ console.error('WebSocketManager erros: 请传入连接地址和用户id') } } }
```

### 创建WebSocket连接

初始化完成后，我们就开始来实现一下`WebSocket`连接，标准的`WebSocket`构造函数以`url`作为其第一个参数，第二个参数是可选的，这里根据服务端那边的约定去进行处理即可，这里要求传入`用户id+一个随机值`去生成唯一标识符。

```js
export default class WebSocketManager { constructor() { // ...省略 } /** * 创建WebSocket连接 */ connectWebSocket() { // 通过id生成唯一值（服务端要求，具体根据自己业务去调整） let id = `${this.id}-${Math.random()}` // 创建 WebSocket 对象 this.socket = new WebSocket(this.url, id) // 处理连接打开事件 this.socket.addEventListener('open', event => { // 心跳机制 this.startHeartbeat() }) // 处理接收到消息事件 this.socket.addEventListener('message', event => { this.receiveMessage(event) }) // 处理连接关闭事件 this.socket.addEventListener('close', event => { // 清除定时器 clearTimeout(this.pingTimeout) clearTimeout(this.reconnectTimeout) // 尝试重连 if (this.reconnectAttempts < this.maxReconnectAttempts) { this.reconnectAttempts++ this.reconnectTimeout = setTimeout(() => { this.connectWebSocket() }, this.reconnectTimeout) } else { // 重置重连次数 this.reconnectAttempts = 0 console.error('WebSocketManager erros: Max reconnect attempts reached. Unable to reconnect.') } }) // 处理 WebSocket 错误事件 this.socket.addEventListener('error', event => { console.error('WebSocketManager error:', event) }) } }
```

### 心跳机制

心跳机制主要用于检测客户端是否在线，如果客户端超过一定时间没有发送消息，服务端就会断开连接。所以我们需要每隔一段时间发送一个心跳消息，这样就可以避免长时间的连接断开。具体实现代码如下：

```js
export default class WebSocketManager { constructor() { // ...省略 } /** * 启动心跳机制 */ startHeartbeat() { this.pingTimeout = setInterval(() => { // 发送心跳消息 this.sendMessage('ping') }, 10000) // 每隔 10 秒发送一次心跳 } /** * 发送消息 * @param {String} message 消息内容 */ sendMessage(message) { if (this.socket.readyState === WebSocket.OPEN) { this.socket.send(message); } else { console.error('WebSocketManager error: WebSocket connection is not open. Unable to send message.') } } }
```

### 接收消息

这里我们只简单处理一下，接收到消息后，我们根据消息内容做不同的处理。

```js
export default class WebSocketManager { constructor() { // ...省略 } /** * 接收到消息 */ receiveMessage(event) { // 根据业务自行处理 console.log('receiveMessage:', event.data) this.receiveMessageCallback && receiveMessageCallback(event.data) } }
```

### 关闭连接

如果用户要退出登录，我们可以写一个方法来实现关闭连接，同时清除定时器以及当前重连尝试次数，具体代码如下：

```js
export default class WebSocketManager { constructor() { // ...省略 } /** * 关闭连接 */ closeWebSocket() { this.socket.close() // 清除定时器 重置重连次数 clearTimeout(this.pingTimeout) clearTimeout(this.reconnectTimeout) this.reconnectAttempts = 0 } }
```

### 使用方法

导入`WebSocketManager`后，我们就可以使用它了，如下所示：

```js
/** * 接收消息回调 */ const receiveMessage = (res)=>{ console.log('接收消息回调：'res) } const socketManager = new WebSocketManager('ws://example.com/socket', 'userid292992', receiveMessage) socketManager.start()
```

## 总结

> 以上就是使用`WebSocket`的一个简单例子，具体实现根据业务需求进行调整即可。全部代码比较多，就不在这里展示了，需要的可以到[GitHub](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FLonJinUp%2FwebSocketManager "https://github.com/LonJinUp/webSocketManager")下载。如果对你有帮助，记得记得👍点赞🌟收藏支持一下。欢迎关注我的掘金专栏:[前端365](https://juejin.cn/column/6961059476208091149 "https://juejin.cn/column/6961059476208091149")，不定时分享前端知识。

## 往期推荐文章📚

🏷️[小程序网络监控大揭秘：如何实时监听网络变化](https://juejin.cn/post/7324384083429261351 "https://juejin.cn/post/7324384083429261351")

🏷️["5.25秒变0.023秒：小程序图片优化全攻略"](https://juejin.cn/post/7322032390574473235 "https://juejin.cn/post/7322032390574473235")

🏷️[如何封装优雅、高效的uni-app请求：让开发更轻松](https://juejin.cn/post/7262003094162243643 "https://juejin.cn/post/7262003094162243643")

🏷️[uni-app开发小程序：项目架构以及经验分享](https://juejin.cn/post/7259589417736847416 "https://juejin.cn/post/7259589417736847416")

🏷️[小程序TabBar创意动画(文末附完整源代码)](https://juejin.cn/post/6963194943506645005 "https://juejin.cn/post/6963194943506645005")

> 本文首发于[陇锦的个人博客](https://link.juejin.cn/?target=https%3A%2F%2Flonjinup.github.io "https://lonjinup.github.io")，转载请注明出处！