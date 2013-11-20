--- 
layout: post
title: 卓有成效的Windows程序员
category: 海上日志 
status: publish 
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- 工作/实习

---
上了班之后换了组，Discipline也换成了SDE，老板还在忙原来team的活儿，鸟哥作先锋，先行一步对新team的活rampup。要学的新知识不少，花了蛮多心思，多少算是得到了老板的肯定，不过博客也就因此落下了得小半年。虽然我博客读者甚少，但也有脑残粉比如[Sneezry](http://www.sneezry.com)天天催我更博，实在是不好意思。

转眼又到了找工作的季节，微博上开始大V大拿们又开始给学弟学妹推荐这推荐那。自己是过来人，对面试有自己的感悟，不是很感冒，唯独对前辈们的“毕业生应该看的xxx书”特别感兴趣。举个栗子，Thoughtworks给新入职员工提供的[豆列](http://book.douban.com/doulist/3050243/)，以程序员自我修养和敏捷开发内容为主，其中《卓有成效的程序员》和《版本控制之道》就是两本不可多得的好书。

某个周末妹子回家，闲来无事，干脆一口气把《卓有成效的程序员》读完了。Neal Ford技术和讲故事水平都不错，但我觉得，这种介绍各类提高生产效率的tool的文章并没有必要成书（当然我们知道，这本书的目的一定是要同学们牢记“每天都要花点时间让工作更高效”），太容易old fashion。随便以toolset、config为关键词在google或github上一搜，你能得到成千上万个结果，尤其是在github上fork一个branch，你能够轻松地配置好自己的development toolset。

这里，我也就讲讲在windows下开发时，我都是通过哪些方法提高产出，权当抛砖引玉了（本文持续更新...）。
## Part I: The Basics

* Install Windows 8.1 or Windows Server 2012 
* Run System Updates
* [7zip](http://7-zip.org) 

## Part II: The Essentials

* [Console](http://www.hanselman.com/blog/Console2ABetterWindowsCommandPrompt.aspx)[download](http://sourceforge.net/projects/console/) 虽然windows下的shell 2的让人不想用（比如powershell的各版本互相不兼容），但这不阻碍我们可以拥有一款神奇的terminal。Command line在效率和可靠性上还是要高出一截，配置好Console是我安装好每一台Devbox必做的事情。
* [Vim](http://www.vim.org) [download](ftp://ftp.vim.org/pub/vim/pc/gvim74.exe)[config](https://github.com/rebornix/dev/tree/master/toolset/vim) 如果觉得Vim太装逼或者学习曲线太陡的话，还是用Emacs吧
* [notepad++](notepad-plus-plus.org/‎) npp是每一个程序员非程序员都必备的editor吧

## Part III: Development Tools

# Develop
* [Visual Studio](http://www.visualstudio.com/zh-cn) 发布这个网站的工具正是小弟最近在做的啦
* [Resharper](www.jetbrains.com/resharper) 如果觉得Visual Studio的IntelliSense功能还不够丰富，可以试一试JetBrains的Resharper。对于编程经验还不够丰富的年轻程序员，能从Resharper的建议中学到不少知识。
* [Stylecop](http://stylecop.codeplex.com) StyleCop analyzes C# source code to enfore a set of style and consistency rules. This is a good tool for team code style.
* FxCop An application that analyzes managed code assemblies and reports infomation about the assemblies. You can find this tool in Windows SDKs.

# Source control
* [Git](http://git-scm.com/) TFS也支持git，我司都没法否认的业界潮流啊

# Debugging and Testing
* [windbg](http://windbg.org/) 
* [Enterprise Library](entlib.codeplex.com) 我倾向于使用这个suite来做logging


## Part IX: Productivity Utilities
* [Windows Sysinternals Suite](http://technet.microsoft.com/en-us/sysinternals/bb842062) Windows Sysinternals suite, 不得不说是开发和调试Windows System和Windows Application的最佳工具套件。即使我平时只使用过其中三四个tool，但是已经让我觉得自己像是God（咦，Linuxer好像也是这么说的）。
* [Everything](http://www.voidtools.com/) 第一次安装Everything的时候会扫描disk所有文件夹和文件进行构建数据库，之后每当文件更新，会立刻更新数据库。搜索各种类型的文件速度完全是毫秒级的，支持wildcards和regex。没有linuxer引以为傲的grep那又如何？
* [grep](http://gnuwin32.sourceforge.net/packages/grep.htm)程序员有时候就是有些独特的品味，用过了\*inx之后我确实还是喜欢grep。gunwin32把一套linux上的toolset([bash](http://www.steve.org.uk/Software/bash/), grep, etc)移植到windows上啦。自由飞翔。
* [SourceGraph](https://sourcegraph.com/) source graph的slogan是“Search for code, see who uses it, and find usage examples”，[王垠](https://github.com/yinwang0/)倒是推荐过很多次，试试吧。
* [Fuslogvw](http://msdn.microsoft.com/en-us/library/e74a18c4(v=vs.110).aspx)用来查看所有的assembly binding。尤其是当你要和GAC打交道时，用这个tool简直是要哭了。
* [ILSpy](ilspy.net).NET反编译工具，Reflector开始收费后，这个选择也不错。
* [Fiddler](fiddler2.com) web service monitor工具，这都什么年代了，wireshark就丢一边去吧
* [putty](www.putty.org) 如果你想自由地穿梭在Windows/\*inx这些平行宇宙之间，putty就是一个虫洞


## Misc
* [Skydrive](https://skydrive.live.com) 从稳定性和易用程度来说，我觉得比Dropbox顺手。在Windows 平台上（Desktop,WP,Surface），他的作用和iCloud一样，而且更强大（请轻拍）
* [AWS](http://aws.amazon.com) 用过Azure，实在是想给大家推荐AWS，原因我就不说了吧，不打脸。
* [XMetaL](http://xmetal.com) 这是款收费的XML编辑器，如果贵司愿意为它付费，毫不犹豫的申请吧。个人的话，太贵了，1000+刀不是我等屌丝负担得起的。
* [Calibre](http://calibre-ebook.com) 我在任何一个平台下都会使用的ebook管理器，要说有什么缺点，源代码太难读了 :(
