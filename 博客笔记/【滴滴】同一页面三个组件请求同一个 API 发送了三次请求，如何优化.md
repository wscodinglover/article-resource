![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/WOeOmUjdHruDBSp51t0plCmZqCk5EFHOGLgmCZ4xKOTtTG2H3nZJepxj4aLCoTDHbWxQbQvOaDnDg7cY5eItLA/640?tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

阿罗内镇的村落，意大利翁布里亚大区  
(© Maurizio Rellini/eStock Photo)

> ❝
> 
> 本文收录于互联网大厂每日一题: Daily Question<sup data-darkreader-inline-color="">[1]</sup>，内含大厂内推机会、面经大全及若干面试题，每天学习五分钟，一年进入大厂中。可在右下角打开原文查看
> 
> -   大厂面经大全: https://q.shanyue.tech/interview
>     
> -   面试准备路线: https://q.shanyue.tech/roadmap
>     
> 
> ❞

```
<span data-darkreader-inline-color="">const</span>&nbsp;fetchUser&nbsp;=&nbsp;<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;<span data-darkreader-inline-color="">new</span>&nbsp;<span data-darkreader-inline-color="">Promise</span>(<span><span>resolve</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(<span><span>()</span>&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">console</span>.log(<span data-darkreader-inline-color="">'Fetch:&nbsp;'</span>,&nbsp;id)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolve(id)<br>&nbsp;&nbsp;&nbsp;&nbsp;},&nbsp;<span data-darkreader-inline-color="">5000</span>)<br>&nbsp;&nbsp;})<br>}<br><br><span data-darkreader-inline-color="">const</span>&nbsp;cache&nbsp;=&nbsp;{}<br><span data-darkreader-inline-color="">const</span>&nbsp;cacheFetchUser&nbsp;=&nbsp;<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;{<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;(cache[id])&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cache[id]<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;cache[id]&nbsp;=&nbsp;fetchUser(id)<br>&nbsp;&nbsp;<span data-darkreader-inline-color="">return</span>&nbsp;cache[id]<br>}<br>
```

```
cacheFetchUser(<span data-darkreader-inline-color="">3</span>).then(<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(id))<br>cacheFetchUser(<span data-darkreader-inline-color="">3</span>).then(<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(id))<br>cacheFetchUser(<span data-darkreader-inline-color="">3</span>).then(<span>(<span>id</span>)&nbsp;=&gt;</span>&nbsp;<span data-darkreader-inline-color="">console</span>.log(id))<br><br><span data-darkreader-inline-color="">//&nbsp;Fetch:&nbsp;&nbsp;3</span><br><span data-darkreader-inline-color="">//&nbsp;3</span><br><span data-darkreader-inline-color="">//&nbsp;3</span><br><span data-darkreader-inline-color="">//&nbsp;3&nbsp;</span><br>
```

## 更多面试

-   [【美团】如何获取一个进程的内存并监控](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247483815&idx=1&sn=f4a2a02232695f3f4d8ec1afda3788d8&chksm=9f0c3e9ea87bb788fbd2b0f191c4a61dc3fb1acc81844c9d0a4d8467dcb9702b9ff976300f55&scene=21#wechat_redirect)
    
-   [【阿里】如何把 json 数据转化为 demo.json 并下载文件](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247483928&idx=1&sn=745bd569bfd3c41e0a4e7cbc0b3616ef&chksm=9f0c3d21a87bb437feb82f955009ac08fe105c88bb90d6ce9ecbe3c871d3dd07aa4445d3eba9&scene=21#wechat_redirect)
    
-   [【阿里】如何加速 npm install](https://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247490701&idx=1&sn=10334f6cb79bfe0ee6856f2864ef9c48&chksm=9f0c23b4a87baaa2aa57a49c91fe48dbd548c788fb12f2ed8255908f2769250ad124254adaa8&token=1118450308&lang=zh_CN&scene=21#wechat_redirect)
    
-   [【滴滴】如何实现无限累加的一个函数](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484141&idx=1&sn=70adfdbd0c257820c84af6a3235b3fac&chksm=9f0c3dd4a87bb4c2824e7d236ba2688fe7c93786cd3863111deff9d2450f66f45eb201ec92eb&scene=21#wechat_redirect)
    
-   [【淘宝】实现一个函数用来解析 URL 的 querystring](http://mp.weixin.qq.com/s?__biz=MzA3MzU0MjIzMA==&mid=2247484134&idx=1&sn=1a6a5605df53f112a23df674acf70c31&chksm=9f0c3ddfa87bb4c975d45de4220e1c11a8cdefb56bf740c03d8baabc562e27c23d57015c0a60&scene=21#wechat_redirect)
    

### Reference

\[1\]

Daily Question: _https://q.shanyue.tech_