--- 
layout: post
title: 有点软文：Anders Hejlsberg 和 Erich Gamma
category: snippets
status: publish
published: true
meta: 
  _edit_last: ""
type: post
keywords:
  - Anders Hejlsberg
  - Erich Gamma
  - Visual Studio Code
  - VS Code
  - Angular 2
  - TypeScript
tags: 
- microsoft

---
大概半年前，我写了一篇名叫[《有点软文》](/snippets/2015/04/14/minisoft/)的文章，深情并茂地告诉大家，我司其实隐藏着很多牛人巨擘。有些人是身怀屠龙技，但是大家不认识；有些朋友则是声名远播，但可惜的是大家根本不知道他在微软。在看完 [Connect](https://connect2015.visualstudio.com) ( Visual Studio 大会 )之后，我决定克服拖延症，来讲一讲大会上除了 Scott Gu （Asp.Net 之父）以外的两个天王巨星。

那就是 Anders Hejlsberg 和 Erich Gamma

#[Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg)
![](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Anders_Hejlsberg.jpg/440px-Anders_Hejlsberg.jpg)

Anders 出席本次 Connect 大会，主要还是介绍他设计的 TypeScript 。那么谁是 Anders？

Anders 早年写了Compass Pascal编译器的 core，后来卖给了 Borland，也就开始为 Borland 打工。之后一直是 Turbo Pascal 的架构师。离开 Borland 之前，Anders 设计了 Delphi 语言。

96年，Anders 被 Bill Gates 亲自挖到了微软，给予了丰厚的薪水（百万美金，那还是20世纪哎我去）以及极大的权力。后果就是 Borland 和微软要死要活地打官司，控诉微软不正当拐骗，最后还真的赢了官司。之后 Anders 在微软主持开发 Visual J++，结果没几年就与 Sun 在 Java 的问题上发生了末日之战，不幸的是 Visual J++ 最终停止了开发（这哥们真是走哪儿官司打到哪儿）。随后 Anders 开始主持 .NET 的设计与开发，并且担任 C# 语言的首席架构师。

2012 年，Anders 宣布了他设计的新语言 TypeScript，这门语言是 JavaScript 的超集同时具备静态类型。TypeScript 虽然很年幼且有着浓浓的`软`味，但是社区已经开始展现对它的兴趣，比如 Angular 2 就是用 TypeScript 写的。

简言之，如果你是微软平台上的开发者，你几乎无法和 Anders 脱离关系。而如果你是 Angular 的开发者，不久的将来，你也会感受到 Anders 的荣光。这哥们就是语言设计专业户。

#[Erich Gamma](https://en.wikipedia.org/wiki/Erich_Gamma)
![](https://pbs.twimg.com/profile_images/66432812/eg2.gif)

相比于 Anders，Erich 的名声相对小一些，但这决不意味着这哥们的战斗力不强。我们知道 Anders 醉心于语言设计，而 Erich 就是软件开发的实践派。每每谈到软件开发，大家就不可避免地提及设计模式。而将设计模式从建筑行业引入到软件领域的，就是 Erich Gamma（当然，还有另外三个小伙伴，他们的统称十分霸气，Gang of Four，四人 帮）。Erich 91年博士毕业后就来到美国，与三个小伙伴一起布道设计模式。

*注解* ：经网友提醒，这里多讲点背景故事。Erich Gamma 在加入微软之前，和 Kent Beck 一起合作开发了单元测试框架 JUnit ，之后又领导了 Eclipse Java Development Tools 项目，真的是 IBM 的一个瑰宝啊。

有些工程师朋友会觉得设计模式不过是纸上谈兵，这里我们按下不表。Erich Gamma 在11年加入了 Visual Studio Team，开始在瑞士苏黎世独自带领团队（Erich 是瑞士人，我司为了大牛也真是大手笔）。加入 Visual Studio Team 之后，Erich 开始亲自操刀，用 JavaScript 实现的编辑器 Monaco。在 Visual Studio Online，Onedrive（线上），Office 365 中广泛应用。

我刚加入微软的时候，做的项目中就用了 Monaco，刚开始不知天高地厚，发现 Monaco 的 bug 后还嚷嚷着要去爆他们。有一次内部 Training，我们组也不知道怎么就请到了 Erich Gamma，他跟我们介绍如何利用 TypeScript （和 Anders 老兄产生了交集）重构 Monaco，把代码量从十万行硬是降到了两万以下。当时我都没好好听，觉得这又是一个爱忽悠的哥们。后来某次翻看设计模式的书，突然发现我天天想着要去爆的人，居然就是大名鼎鼎的 Erich。

不过凭良心讲，在没有意识到 Monaco 是 Erich 写的时候，我就已经深感 Monaco 比 Ace或者 CodeMirror 性能好的多。只不过由于只在内部使用且未开源，Monaco 并未声名远播。

直到，Erich Gamma 把 Monaco 用 Electron （跨平台包装工）包装了一下，瞬间变为多平台的编辑器 Visual Studio Code。刚发布的时候，很多朋友都以为这和 GitHub Atom 没区别，但下载使用后却发现性能比 Atom 好出很多。都是使用 Electron 实现跨平台，而编辑器本身，Monaco 暂时略甚一筹。希望切身实际地学习和领悟设计模式的最佳实践，快去看 Visual Studio Code 的[源码](https://github.com/Microsoft/vscode)吧！

#看到这里的朋友都是真爱，我决定透露一个我的惊人发现
从软文的角度，本文到这里其实就可以结束了。但是为了我的忠实听众们，我决定来讲一个 Google 的项目：Angular 2。 

AngularJS 在经历了大火之后，Google 的朋友们发现它的缺陷过于明显（暂时不展开，同学们可以参考我以前的几篇博客），于是决定重构。而在重构的过程中，Google 的 Angular team 和微软一起合作，研究新版本 Angular 的架构的各种可行性，最终选择了使用 TypeScript 作为开发语言。而他们使用的开发工具则是 Visual Studio Code。

你们想想，一群 Google 的天才，有 Anders 设计的 TypeScript 和 Erich Gamma 开发的 VS Code 保证代码质量和开发效率，Angular 2 要好成什么样你说！
