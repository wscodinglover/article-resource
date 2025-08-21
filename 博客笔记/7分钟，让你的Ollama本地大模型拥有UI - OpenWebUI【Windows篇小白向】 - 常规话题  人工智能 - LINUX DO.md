**上期帖子：**

现在，给你的小羊驼穿件衣服吧~

## [](https://linux.do/t/topic/66426#a-1)A.开始准备

-   **windows docker安装指南：**  
    [Install Docker Desktop on Windows | Docker Docs 14](https://docs.docker.com/desktop/install/windows-install/)  
    ![:point_down:](https://cdn.linux.do/images/emoji/apple/point_down.png?v=12 ":point_down:") 当然，针对小白，我专门写了个Docker简易安装指南请查看 ：

-   **OpenWebUI项目链接：**  
    官网：  
    [https://openwebui.com/ 30](https://openwebui.com/)  
    GitHub：  
    [GitHub - open-webui/open-webui: User-friendly WebUI for LLMs (Formerly Ollama WebUI) 27](https://github.com/open-webui/open-webui)

## [](https://linux.do/t/topic/66426#b-2)B.开始部署

-   **备注事项：**
    -   我们使用的是**本机部署方式**，不同服务器我会写在后续进阶中
    -   建议配置docker镜像加速，因为接下来使用的镜像很大！为了教程更简单，我在此不配置，直接在命令中使用南京大学镜像站 `ghcr.nju.edu.cn` 拉取镜像

___

-   打开你的**Windows 命令提示符（CMD）**，运行以下命令：

```kotlin
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.nju.edu.cn/open-webui/open-webui:main
```

点击查看命令解释

```kotlin
# 运行 Docker 容器并将容器内部的 8080 端口映射到宿主机的 3000 端口 docker run -d -p 3000:8080 \ # 添加一个自定义的主机名映射，将 host.docker.internal 映射到容器的主机网关 --add-host=host.docker.internal:host-gateway \ # 将容器内的 /app/backend/data 目录挂载到名为 open-webui 的卷上，用于持久化数据 -v open-webui:/app/backend/data \ # 指定容器的名称为 open-webui --name open-webui \ # 指定容器的重启策略为 always，即总是自动重启 --restart always \ # 使用 ghcr.nju.edu.cn 上的 open-webui 镜像的 main 分支（原版是ghcr.io，为了加速，我改为了ghcr.nju.edu.cn） ghcr.nju.edu.cn/open-webui/open-webui:main
```

-   部署完成！访问 [http://localhost:3000 17](http://localhost:3000/)，如果打开了，那么恭喜你，小衣服已经穿好了~  
    

## [](https://linux.do/t/topic/66426#c-3)C.开始配置

-   点击**Sign up**，创建一个账号吧~

-   设置模型，点击右上角小齿轮~  
    ![image](https://cdn.linux.do/uploads/default/original/3X/2/c/2cfb6b472668dde3a281971fd22cf26282dfc3bb.png)
    -   切换中文  
        
    -   模型选项，输入模型名称，点击右侧下载按钮，自动下载安装模型~  
        
    -   选择模型，开始对话~  
        

### [](https://linux.do/t/topic/66426#h-4)恭喜你！开始享受自己部署模型的乐趣吧~

更多技巧慢慢探索吧~官方文档是个好东西

___

如有不足，还请各佬指导~ ![:kissing_heart:](https://cdn.linux.do/images/emoji/apple/kissing_heart.png?v=12 ":kissing_heart:")

> 随着版本飞速迭代升级，本指南可能无法满足你的需求，食用时建议结合官方文档！

-   #### created
    
    Apr 25
    
-   [
    
    #### last reply
    
    ](https://linux.do/t/topic/66426/22)
    
    [](https://linux.do/t/topic/66426/22)6d
    
-   1.3k
    
    #### views
    
-   19
    
    #### users
    
-   28
    
    #### likes
    
-   5
    
    #### links
    
-    ![](https://cdn.linux.do/user_avatar/linux.do/bntang/48/791_2.png "Neo")
    

话说这个要怎么设置GPU max啊，用cpu太慢了~

试试看能否加chat2api对接 一直没时间试，你那边试成了说下

ollama他本身自带这个接口哒

```cpp
curl http://localhost:11434/api/chat -d '{ "model": "llama3", "messages": [ { "role": "user", "content": "why is the sky blue?" } ] }'
```

部署3000端口一直不成功，换了下端口就可以了。

docker run -d -p 5000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always [ghcr.nju.edu.cn/open-webui/open-webui:main](http://ghcr.nju.edu.cn/open-webui/open-webui:main)

不成功的可以使用这个。