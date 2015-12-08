--- 
layout: post
title: 编写可维护的JavaScript
category: Frontend
status: publish 
published: true
type: post
keywords:
  - javascript
  - maintainable
  - Nicholas
  - 可维护的
  - 耦合
tags: 
- 

---
每次亚马逊或者京东满xxx打折的时候，总会凑单撸各种奇怪的不知道哪年才会翻开来看看的书（大家不是都这样么:) ）。前两天给同事 code review JavaScript 代码，由于我经验不丰富，看着总觉得心里没底。转眼瞥见书架上夹着一本[《编写可维护的 JavaScript》](http://book.douban.com/subject/21792530/) ，虽然怎么想也想不起是什么时候买回来的,但记得 [Sneezry](https://sneezry.com) 老师推荐过本书，便立马拿出来翻了翻。

作者 [Nicholas C.Zakas](https://github.com/nzakas) 曾是 Yahoo! 的首席前端开发工程师（现在跑到 Box 去了），在书中介绍了编程风格、编程实践和自动化方面的 best practice 。大师果然就是大师啊，短短数小时内，我便产生了深深的共鸣，脑洞也各种大开。内心的喜悦不能独享，我决定为它写篇博文，讲一讲其中的“高光时刻”。

#编程风格
本书的第一部分讲解如何使用统一的编程风格，降低团队项目的维护成本。几乎每一门语言都有自己的 styling rule ，靠谱的技术企业甚至会在企业内部推行的自己的编程风格（比如在 baidu 写 C++ ）。

当我们谈论风格时，我们其实是在说

* 缩进
* 换行
* 行的长度
* 花括号的对齐
* 注释
* 命名
* etc

你几乎可以在每一本语言书上找到这些章节。书中推荐使用 [JSHint](http://jshint.com/) [JSLint](http://www.jslint.com/) 等编程风格检查工具，个人觉得，选择其中一种并且推行下去既可以了，事半功倍。

#编程实践
这一部分就是讲编程过程中的 best practice 

##UI层的松耦合
我们知道在Web开发中，用户界面由 HTML, CSS 和 JavaScript 三层一起构建的

1. HTML 定义页面数据和语义
2. CSS 给页面添加样式，创建视觉特征
3. JavaScript 用来给页面添加行为
 
我们应当努力减少这三层之间的依赖性，让更改单独修改某个组件时无需修改其他组建。作者给出的建议，有这几条我觉得值得牢记

1. 将 CSS 从 JavaScript 中抽离。举一个实际的栗子，我们经常在页面上实现 lazy loading，在 request 发送出去之后，我们会秀出一张菊花图提示用户正在加载，加载完毕后，隐藏或者删除掉这个张菊花图。最直接的做法就是在 ajax call 前后调整这张图片的 display 属性。但是这么做会带来一个问题，样式是由 JavaScript 而非 CSS 来加载的，当出现样式的问题时，我们会第一时间查看 CSS，但�最直   当我们查到精尽人亡的时候，我们才发现样式是由 JavaScript 改变的，一定会哭的。Best practise 是把所有样式保留在 CSS 中，当需要用 JavaScript 来修改元素样式时，**操作 CSS 的 className**（计算元素定位例外）。
2. 将 JavaScript 从 HTML 中抽离。很多初学者都会把脚本嵌入到 HTML 中来运行，比如在 element 上绑定 onclick 属性或者使用 `<script>` 标签。在这种情况下，当你需要更新这个方法的命名，你总需要更新 HTML 页面；内嵌的 JavaScript 会给调试和 troubleshoot 带来难度（至少是增加了复杂度）。Best practise 是 把绝大多数的** JavaScript 代码放在外部文件中**。
3. 将 HTML 从 JavaScript 中抽离。模版化发展到今天，这条规律几乎不言自明了。

##避免空比较
这个比较绕口，举个例子大家就明白了，通畅我们设计一个函数时，需要考虑传进来的参数是否正确，比如不能为空，不能为 undefined 。像下面这段代码：

    function Process(items) {
		if (items !== null) {
		    items.sort();
			items.forEach(function (item) {});
		}
	}

事实上在这段代码中，我们真正关心的是 items 这个 object 是否为一个 Array 。单纯的和 null 进行比较，代码的可读性不好，coverage 也不够。本书的建议是，使用诸如 typeof, instance of 等来检测原始值（ primitive value）、引用值和函数等。

     if (typeof name === "string") {
	 }
	 
上面的代码就清晰的交代了函数期待 name 这个 variable 是一个 string 而非其他类型的值。

##其他
这一部分其他章节，个人觉得在其他编程语言中也基本适用，比如

* 避免使用全局变量
* 使用命名空间和模块
* 将配置数据从代码中分离出来
* 自定义 error 

或者比较 hacky，比如 浏览器嗅探。读者可以在互联网上找到更全面的解决方案。

#自动化
第三部分，作者花了八个章节来讲解如何对前端代码进行开发、测试、部署、文档的自动化。作者写这本书的时间距离现在已经过去数年，前端自动化已经逐渐成熟并且被广泛接受，你一定或多或少见到过以下工具

* Task Runner. Grunt/Gulp，这两个工具其实代表的是一套工具链，比如代码合并（concat），代码压缩（minification），代码风格审查（ JSHint/Lint）等等，然后通过 task runner 将这些工具组合到一起。
* CI. Jenkins/TeamCity
* Test Framework. Protractor/Selenium
* etc...

如果你们的前端团队还没有使用到上面提到的任何工具（或者自己造了类似的轮子），那情况可能就有点不妙了。

#放在最后
不管我自己是否承认，我已经成为了一个半路出家的前端工程师了，和我最先估计的职业生涯路线有点偏差。我司大部分部门招人的策略是招聪明的人而非招专业的人，这就导致了来我司前你耍什么技术已经不那么重要。过去我司比较保守，一定要 dogfood，大家来了就只能使用 .NET，使用开源或者别家的技术十分谨慎。但是这两年突然 open 起来了，按照需求你可以自由地选择前端框架（像我们就用 Angular）、缓存（Redis已经称为第一选择，大阿哥AppFabric被废黜了）、搜索引擎（elastic search 大家都得用啊）、测试框架（Selenium已经接连KO VS测试框架和MTM）等等等等，不知不觉中人人都变成了全栈工程师。也不知道这算不算好事。

简言之，读者朋友们不太可能在我的博客上看到 .NET 的文章了，让你们失望啦 :)
