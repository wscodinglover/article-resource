## 脚手架项目地址（https://github.com/xun082/create-neat）  

Husky 是一个流行的工具，它可以让你轻松地在 Git 钩子中使用脚本，从而在提交（commit）代码前运行诸如代码风格检查、单元测试等任务。这有助于保持代码库的质量和一致性。Husky 的工作原理是在你的项目中创建特定的钩子，当你执行 git 操作（如 commit）时，这些钩子会被触发。

## pre-commit 钩子和 commit-msg 钩子

## pre-commit 钩子

pre-commit 钩子是 Git 钩子系统中的一个重要部分，用于在提交（commit）操作完成之前执行特定的脚本或任务。这个钩子的主要作用是允许开发者检查即将提交的代码快照（也就是 commit），以确保它符合项目的质量标准和风格指南。如果 pre-commit 钩子中的脚本返回非零状态（即执行失败），Git 将阻止提交。

pre-commit 钩子产用于以下场景：

1.  代码风格检查：运行如 ESLint 或 Prettier 这样的工具，确保代码风格一致性。
    
2.  代码质量分析：执行静态代码分析工具，发现潜在的错误或代码异味。
    
3.  运行单元测试：确保更改没有破坏现有功能。
    
4.  自动格式化代码：在提交前自动格式化代码，以满足代码风格要求。
    

## commit-msg 钩子

commit-msg 钩子是 Git 的一个钩子，它在提交信息（commit message）被提交之前执行。这个钩子主要用于验证提交信息的格式，确保它遵循项目的规范或指南。如果 commit-msg 钩子脚本返回非零状态（即失败），Git 将拒绝提交。

commit-msg 钩子常用于以下场景：

1.  验证提交信息格式：确保提交信息遵循特定的模板或风格，例如包含一个特定前缀、遵循某种结构等。
    
2.  引用问题追踪器的 ID：要求提交信息包含对应的问题或故障单 ID，以便自动链接到问题追踪系统。
    
3.  强制包含更改类型：例如，要求提交信息明确标明是新增功能、修复 bug 还是性能改进等。
    
4.  检查提交信息的长度：确保提交信息不太长或不太短，便于阅读和理解。
    

## commit-msg 文件详解

接下来我们来看看我们项目中的代码，如下所示：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#!/bin/sh</span><br>.&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$(dirname&nbsp;"$0")</span>/_/husky.sh"</span><br><br><span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">'running&nbsp;commit-msg&nbsp;checks&nbsp;...'</span><br><br>./scripts/check_commit_msg.sh&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$1</span>"</span><br></code>
```

这段代码是在 Husky 钩子脚本文件 .husky/commit-msg 的开头常见的一个脚本引导部分。它的作用是为了在执行 Husky 钩子时，设置和加载必要的环境。下面是对这段代码的详细解释：

-   `#!/bin/sh`：这是一个 shebang 行，告诉系统这个脚本应该使用哪个解释器来执行。在这个例子中，它指定使用 sh（shell）作为解释器。这确保了脚本在 Unix-like 系统上的兼容性。
    
-   `. "$(dirname "$0")/_/husky.sh"`：`$0` 是当前脚本的路径。dirname 命令用于获取这个路径的目录部分，即去掉文件名，只留下路径。这意味着无论你从哪里运行这个 Husky 钩子，它都能找到正确的目录。`/husky.sh` 是 Husky 的环境脚本路径，相对于上一步得到的目录。Husky 使用这个脚本来设置一些环境变量和执行必要的初始化操作。
    

简而言之，这段代码是 Husky 钩子的初始化和环境设置的重要部分，确保了 Husky 钩子的可移植性和正确执行。

## 编写自己的 shell 脚本

既然 commit-msg 是一个 shell 文件，那么我们也可以自定义自己的一些 shell 脚本，并添加到 commit-msg 中让其执行。

> ❝
> 
> 为什么要自定义 shell 脚本？因为我要定义一个脚本，不仅可以在 husky 阶段使用，我也可以在 ci 阶段使用，提取公共配置将其提取到固定目录下统一管理。
> 
> ❞

我们在和 husky 同级目录下创建一个文件，路径名为 scripts/check\_commit\_msg.sh 文件，并编写如下代码：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor=""><span data-darkreader-inline-color="">#!/bin/sh<br></span><br><span data-darkreader-inline-color="">#&nbsp;获取两个参数：起始SHA和结束SHA</span><br>start_sha=<span data-darkreader-inline-color="">$1</span><br>end_sha=<span data-darkreader-inline-color="">$2</span><br><br><span data-darkreader-inline-color="">#&nbsp;设置颜色变量</span><br>RED=<span data-darkreader-inline-color="">'\033[0;31m'</span><br>BLUE=<span data-darkreader-inline-color="">'\033[0;34m'</span><br>NC=<span data-darkreader-inline-color="">'\033[0m'</span>&nbsp;<span data-darkreader-inline-color="">#&nbsp;No&nbsp;Color</span><br><br><span data-darkreader-inline-color="">#&nbsp;定义提交信息规范函数</span><br><span>check_commit_message</span>()&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;commit_msg=<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$1</span>"</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">#&nbsp;检查提交信息是否以指定的前缀开头</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;!&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$commit_msg</span>"</span>&nbsp;|&nbsp;grep&nbsp;-qE&nbsp;<span data-darkreader-inline-color="">"^(feat|fix|docs|style|refactor|test|chore|ci):"</span>;&nbsp;<span data-darkreader-inline-color="">then</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;-e&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">${RED}</span>Inappropriate&nbsp;commit&nbsp;message:"</span>&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">${NC}</span><span data-darkreader-inline-color="">$1</span>"</span>&nbsp;&gt;&amp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;-e&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">${RED}</span>Error:<span data-darkreader-inline-color="">${NC}</span>&nbsp;Commit&nbsp;message&nbsp;format&nbsp;is&nbsp;incorrect.&nbsp;It&nbsp;should&nbsp;start&nbsp;with&nbsp;one&nbsp;of&nbsp;'<span data-darkreader-inline-color="">${BLUE}</span>feat|fix|docs|style|refactor|test|chore|ci:<span data-darkreader-inline-color="">${NC}</span>'."</span>&nbsp;&gt;&amp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">exit</span>&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">fi</span><br>}<br><br><span data-darkreader-inline-color="">#&nbsp;workflows传入两个参数，遍历从start_sha到end_sha的所有提交</span><br>&nbsp;<span data-darkreader-inline-color="">if</span>&nbsp;[&nbsp;<span data-darkreader-inline-color="">$#</span>&nbsp;-eq&nbsp;2&nbsp;];&nbsp;<span data-darkreader-inline-color="">then</span><br><span data-darkreader-inline-color="">for</span>&nbsp;sha&nbsp;<span data-darkreader-inline-color="">in</span>&nbsp;$(git&nbsp;rev-list&nbsp;<span data-darkreader-inline-color="">$start_sha</span>..<span data-darkreader-inline-color="">$end_sha</span>);&nbsp;<span data-darkreader-inline-color="">do</span><br>&nbsp;&nbsp;&nbsp;&nbsp;commit_msg=$(git&nbsp;show&nbsp;--format=%B&nbsp;-s&nbsp;<span data-darkreader-inline-color="">$sha</span>)<br>&nbsp;&nbsp;&nbsp;&nbsp;check_commit_message&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$commit_msg</span>"</span><br><span data-darkreader-inline-color="">done</span><br><span data-darkreader-inline-color="">#&nbsp;huksy触发commit-msg钩子时传入一个参数</span><br><span data-darkreader-inline-color="">elif</span>&nbsp;[&nbsp;<span data-darkreader-inline-color="">$#</span>&nbsp;-eq&nbsp;1&nbsp;];&nbsp;<span data-darkreader-inline-color="">then</span><br>&nbsp;&nbsp;&nbsp;check_commit_message&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$(cat&nbsp;$1)</span>&nbsp;"</span><br><span data-darkreader-inline-color="">else</span><br>&nbsp;&nbsp;&nbsp;<span data-darkreader-inline-color="">echo</span>&nbsp;-e&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">${RED}</span>&nbsp;error:&nbsp;Failed&nbsp;to&nbsp;get&nbsp;commit&nbsp;message\n"</span><br><span data-darkreader-inline-color="">fi</span><br><br><span data-darkreader-inline-color="">echo</span>&nbsp;-e&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">${BLUE}</span>Commit&nbsp;message&nbsp;check&nbsp;passed.<span data-darkreader-inline-color="">${NC}</span>\n"</span><br></code>
```

在上面的这段代码中，它是一个用于校验 Git 提交信息是否符合规定格式的脚本。它可以在 commit-msg 钩子中，被用来确保提交信息遵循一定的命名规范，从而帮助维护项目的提交历史清晰和一致。

该脚本它接收两个参数，起始 SHA (start\_sha) 和结束 SHA (end\_sha)。这两个参数用于指定要检查的提交范围。这对于在 CI/CD 流程中检查一系列提交非常有用，如下图所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在函数内部主要使用 grep -qE 命令配合正则表达式来检查提交信息是否以 feat|fix|docs|style|refactor|test|chore|ci: 其中之一开头。这些前缀代表了不同类型的提交，例如新功能（feat）、修复（fix）等。

如果脚本接收到两个参数，它会使用 git rev-list 命令遍历从 start\_sha 到 end\_sha 的所有提交，并对每个提交调用 check\_commit\_message 函数进行检查。

如果只接收到一个参数（在 commit-msg 钩子场景中），脚本会读取该文件中的提交信息，并对其进行检查。

如果脚本未能接收到期望的参数数量，它会打印一个错误消息。如果所有检查都通过，脚本会打印“Commit message check passed.”，表示提交信息符合规范。

这个脚本主要用于确保项目提交遵循一定的格式规范，通过在 Git 钩子中使用这个脚本，团队可以自动化地维护代码仓库的质量和一致性，帮助开发者避免提交包含不规范信息的提交。

要在 commit-msg 钩子中使用，我们只需要添加如下代码即可：

```
<span data-darkreader-inline-bgcolor=""></span><code data-darkreader-inline-color="" data-darkreader-inline-bgimage="" data-darkreader-inline-bgcolor="">./scripts/check_commit_msg.sh&nbsp;<span data-darkreader-inline-color="">"<span data-darkreader-inline-color="">$1</span>"</span><br></code>
```

当你在 Git 提交操作中触发 commit-msg 钩子时，Git 会将即将提交的消息传递给这个钩子。在钩子中调用 ./scripts/check\_commit\_msg.sh "$1" 实际上是执行了 check\_commit\_msg.sh 脚本，并将包含提交信息的文件路径作为参数传递给它。check\_commit\_msg.sh 脚本会根据其内部逻辑来验证提交信息是否符合项目规定的格式。

当我们输出了不合适的提交信息，它会报错，如下所示：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

通过这种方式可以告知用户输入规范的提交标题。

## 总结

封装一下公用的 shell 脚本到特定目录下，我们可以进行复用，不仅可以使用在 husky 中还可以使用在 ci 环境下，通过集成自定义 shell 脚本到 Shell 脚本到 Husky 的 Git 钩子中，为项目带来了以下几点显著的好处：

1.  自动化流程：自动执行代码检查、测试、格式化等操作，减少人工干预，提高开发效率。
    
2.  保证代码质量：在代码提交前强制执行质量控制步骤，确保提交到仓库的代码符合项目标准。
    
3.  统一开发标准：通过脚本统一代码提交规范（如提交信息格式），帮助维护项目的一致性和可维护性。
    
4.  减少错误：在代码进入仓库之前捕捉和修正问题，减少了后期调试和修复的工作量。
    

总之，通过 Husky 加入自定义脚本，可以有效地集成和自动化开发流程中的关键步骤，对提升团队的工作效率、保持代码质量和项目的长期健康发展都至关重要。

最后分享两个我的两个开源项目,它们分别是:

-   前端脚手架 create-neat（https://github.com/xun082/create-neat）
    
-   在线代码协同编辑器  
    （https://github.com/xun082/online-edit）