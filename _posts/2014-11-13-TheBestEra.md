--- 
layout: post
title: 最好的时代
category: 海上日志 
status: publish 
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- 

---
今早起床又被Sneezry吐槽太久没有更新博客，万分羞愧，觉得如果再拖下去，我估计会丢掉我的最后几位读者。从昨天Connect大会开始我就基本处于亢奋状态，于是我决定来写一篇软文。

本篇文章仅代表博主本人想法，不代表雇主（Microsoft）。不为别的，就因为我的博客已经被IT部门残忍标记为违反公司security policy并且ban掉了...

一次编写 到处运行
-------------
这句话曾是Sun用来宣传Java的跨平台特性的口号，编写一次代码，然后程序就能够运行在所有装备JVM的机器上。当时Java也的确做到了这一点，风靡全球几乎快要动摇PHP的神圣地位（嗯，PHP是世界上最好的语言）。但是后来随着Sun的没落，某些大公司心照不宣的合力围剿，Java最终没能登顶而不得不走下神坛。

Java的流行有目共睹，微软从一开始就分外眼红，于是挖来了Boarland首席大师Anders Hejlsberg开发出了Visual J++（微软对于Java语言的实现），本来这是一件普大喜奔的好事，但是聪明人总是有很多奇怪的想法，微软逐渐往Visual J++中添加了各种各样黑科技。Sun觉得Visual J++违反了Java平台的中立性，并把微软直接告上了法院。

之后的故事想必大家早就耳濡目染，微软糅合了Java，VB，C++等多门语言，推出全新的C#，用来取代Visual J++。诉讼风波算是告一段落，微软也第一次尝到了“改名大法好”的甜头。

如果说Visual J++是对Java一次鸡贼的Copy-Paste，C#则是Anders Hejlsberg以及MS员工智慧的结晶。我有幸和C# team的开发做过一段时间的同事，如沐春风。微软上一个十年的计划，或者说Steve Ballmer的壮志雄心，是把Windows安装到任何一个电子设备当中去。在这样的大方向上，C#（or .NET）一直专心在Windows平台上大跨步前进，只要Windows一统天下，C#就能成为世界上最好的语言，可是...

Steve Ballmer宣布要辞职那天MS股票涨了，辞职那天又涨了。伟大计划直到SB离去也没能完成一半。不过值得高兴的是，快船成为第一只实现共产主义的球队，率先完成操作系统的大一统。之后微软进入了“Cloud First, Mobile First”的新纪元。三哥上台后，部门重组、大裁员、在某论坛说错话，人们一度以为这家公司找不到了方向。

而Java在这些年过的也不算如意，在Adobe的Flash的打压下基本失去了浏览器的阵地，HTML5到来之后也宣告Java再也无法回到浏览器的世界。手持设备上，随着Android的大卖以及iPhone凸起摄像头的神奇Design，Java出人意料的获得了处女座的好感，在Mobile领域依然保持其一哥的地位；服务器领域JSP凭借其一次编写到处运行的特性以及其出色的性能获得*inx世界的青睐。直到今天

.NET Core CLR 和ASP.NET 5 宣布同时支持Windows, Mac, Linux
-------------
这条新闻包含了一下几个意思，我们来深度解读一下：

 - .NET Core 5再也不是Windows独享，你可以在Mac和Linux上自由地运行。你写的每一行C# Code，此刻都能在你手中正在使用的系统中运行起来。
 - .NET Core 5通过NuGet发布，你可以将它和你的应用程序打包。这意味着你不用再担心你的程序因为使用了最新的.NET特性而无法在过时机器上运行，你也无需要求用户更新他们的系统来升级.NET。
 - ASP.NET 同样能够在Mac和Linux上运行。试想一下，在你的Windows上，用免费的几乎拥有全部人类所需功能的Visual Studio Community编写ASP.NET网站，然后把它deploy到任何一个便宜的Linux 虚拟机上。是的，你不需要满世界找Windows虚拟机并为它高昂的价格发愁，你那用来翻墙的一年5刀的debian可以把网站跑起来。
 - 一个你可能觉得蛮重要的消息：它们都是开源的。.NET开源，ASP.NET也开源，到[http://microsoft.github.io](http://microsoft.github.io) 查看更多~
 
 这里引用一下Scott Hanselman的一张图，这些你都可以在Github上细细品味。来宾请掌声鼓励鼓励。
 ![2015](http://www.hanselman.com/blog/content/binary/Windows-Live-Writer/Announcing-.NET-in-your-Editor-of-Choice_E16B/image_4034547f-9f37-4a27-8a0c-5eb89d13d944.png)

慢着！不是有个叫Mono早就能在*inx上运行了吗？
-------------
.NET在发布的六个月后，发表了Common Language Runtime的文档。用human readable的语言来解释就是，任何人都可以根据这个文档写出一个C#的编译器，只不过根据各自战斗力的不同，大家写出来的编译器性能和鲁棒性会有差距。

文档刚发出来不久，Xamarin的米格尔·德伊卡萨对.NET产生了兴趣，写出了一个他自己的.NET编译器。Xamarin内部产生了激烈的研究和讨论，最终他们决定创建一个mono小组来专门维护这个编译器，并且将其开源。

后来又发生了很多狗血剧情，充分体现了软件世界的血雨腥风。在经历裁员、专利纠纷等诸多扯淡之后，2011年，原先开发mono这批engineer们再一次坐下来成立了一家公司，还叫Xamarin。同时，他们再也不仅仅focus在把.NET run在桌面平台上，而是追随时代，致力于把C#的程序运行于Android和iPhone上。在平稳发展两年之后，13年，xamarin开始和微软大规模合作。

这之间合作的细节，我真的不知道，但我觉得这是人类史上的一大步。

Xamarin和Microsoft深度合作，Xamarin template随Visual Studio 2015一起release
-------------
我不确定在.NET开源和全平台之后，Mono会走向何处，但是我相信，xamarin这个产品会继续活下去且bigger than bigger。对于程序员来说，我们不关心跨平台到底是通过mono还是.NET Core 5，因为我们只需要写C#就可以了。

xamarin此次还特别*大方*地给Visual Studio用户提供了免费版本，并且给MSDN Visual Studio Ultimate用户提供了20%的折扣（Ultimate用户一年给MSDN交10000刀他们真的在乎吗？）。看到这里你心里有点不开心，在你的想象中，应该有一种免费的跨平台技术，时尚时尚最时尚。

没错，这真的有：

Apache Cordova和Xamarin两亿齐飞
-------------
也许你听说过PhoneGap，这是一个开源的JavaScript框架，你仅仅需要书写一份HTML、CSS和JavaScript代码，就能够运行在各个移动平台上。Sounds familiar? 这其实就是一个JS版的Xamarin。PhoneGap team把核心代码贡献给了Apache，也就是这里的Cordova，Cordova之于PhoneGap，就像Webkit之于Chrome。

而现在，Apache Cordova已经成为了Visual Studio的built-in feature，你可以直接在Visual Studio 2013 (update 4)里愉快地编写全平台移动应用程序啦。


看完上面这些新闻后我已泪流满面，忽闻已经有同学拿到了美帝第一批10年签证，我不禁怀疑，这是最好的时代
-------------

最后，为了回报那些一直观看我博客的朋友们，我决定对以下意淫不做任何评价：

 - PhoneGap会和某司合作吗？
 - xamarin和dropbox都已经站队了，其他童鞋呢？
 - 比特币今天怎么涨了那么多？
 - 瑞波币一定会涨到10块钱！

我反正是不信。
