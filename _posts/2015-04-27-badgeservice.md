--- 
layout: post
title: 造一个Badge Service的轮子
category: snippets
status: publish
published: true
meta: 
  _edit_last: ""
type: post
tags: 
- microsoft

---
##什么是Badge Service
细心的读者朋友一定在很多Github的Repo，npm的package页面看到过诸如![Dependence](https://david-dm.org/rebornix/delta.png) ![DevDependence](https://david-dm.org/rebornix/delta/dev-status.png)的徽章。这些徽章是干什么用的？

大家看到上文中我引用的Badge的左侧，是`Downloads`，`Build`，`Dependency`之类的，不难猜出，这些Badge是用于一些信息的统计，然后以图片的形式展示出来。比如我的一个小项目[Delta](https://github.com/rebornix/delta)是用js写的，我使用了Travis CI来进行持续的编译和测试。每次我checkin了新的代码，Travis CI就会对最新的代码进行build，然后把build的结果，画成一张矢量图，放在`https://travis-ci.org/rebornix/delta.svg`下。于是同学们就能及时地从我的项目主页看到该项目的最近build情况，如果挂了，就可以肆意地爆我。

其实这就是个把numbers变成图片的小玩意。

##[Shield Badge](https://github.com/badges/shields)
为了让.NET世界的朋友也和前端朋友们一样酷，我们决定在[Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/en-us)中也提供这样的服务。很快我写了一个版本，用来生成PNG。效果还不错，但是PNG唯一的缺点就是无法scale，如果能生成矢量图会更好。由于.NET在绘制矢量图上天生残疾，我尝试着找找有没有现成的方案。于是我发现了Sheild.io.

Shield提供了一套绘制badge的方案，并且开源了nodejs、php、go等语言的实现方式，甚至他们提供了一个服务[Shield.io](http://shield.io)方便大家使用。这几乎是完美的。

##那为啥我要造轮子
原因也挺简单的，shield并不可能像Azure，AWS那样提供SLA（我们也不该要求他们提供）。我们要尽可能地为我们的网站减少这样的external dependency。既然他们开源了，我干脆就写了一个.NET版本，通过[Nuget](https://www.nuget.org/packages/DotBadge)管理Assembly，然后把这个服务run在我们自己的机器上。我给它取了个很俗的名字，叫DotBadge，大家可以前去[Github](https://github.com/rebornix/DotBadge)围观。

##如何使用
大家可以通过nuget下载dll来引用，另外为了大家更好地玩耍已经体验，我写了个小小的命令行工具。

### 命令行工具
首先[下载](http://cmy.me/dotbadge)，然后打开命令行，到DotBadge的目录下，执行 `DotBadge.exe --help`.

### 例子
    DotBadge.exe -sb "Downloads" -st "1000" -c "Green" -sl 0
	
![demo1](http://rebornix.qiniudn.com/demo1.svg)


    DotBadge.exe -sb "Build" -st "fail" -c "Red" -sl 0
	
![demo2](http://rebornix.qiniudn.com/demo2.svg)


    DotBadge.exe -sbhttps://github.com/rebornix/DotBadge/edit/master/Readme.md# "Star" -st "234" -c "#ddf" -sl 1
	
![demo3](http://rebornix.qiniudn.com/demo3.svg)

### 如何放到你自己的项目里面
在Nuget的 Package Manager Console里面运行


    PM> Install-Package DotBadge

或者使用Nuget的UI tool搜索下载。

### 例子
    using DotBadge;
    using System.IO;
    
    namespace Badge
    {
        class Program
        {
            static void Main(string[] args)
            {
                var bp = new BadgePainter();
                File.WriteAllText(@"C:\Users\peng\Desktop\nuget.svg", bp.DrawSVG("Badge", ".Net", ColorScheme.Red, Style.Flat));
    
            }
        }
    }

##造轮子充满乐趣
![Yeah](http://rebornix.qiniudn.com/yeah.svg)

![Report Bug](http://rebornix.qiniudn.com/reportbug.svg)
