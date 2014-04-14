--- 
layout: post
title: Learn JavaScript in Code Review
category: 海上日志 
status: publish 
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- 工作/实习
- JavaScript

---

我一直很想学Javascript，我的基友Sneezry是知道这个惊天大秘密的。书翻了好几本之后，我觉得已经打通了任督二脉，变身JS Expert。紧接着我和每一位JS初学者一样，陷入究竟是干掉facebook还是twitter的深深的纠结之中。不过我很快就释然了，乔布斯重新定义了手机的时候可没有想过要干掉Windows Mobile和塞班，那不过碰巧是副作用而已，我应该立刻动手。我沐浴、更衣、摸香，从白天奋战到黑夜，我的成果是这样的：

<a href="http://www.flickr.com/photos/njukidreborn/12854428494/" title="Flickr 上 rebornix 的 chrome crash"><img src="https://v4s2.yimg.com/sk/3733/12854428494_1c72c98cde_z.jpg" width="640" height="392" alt="chrome crash"></a>

那一刻，我意识到，我可能真的不是那块料。

<a href="http://www.flickr.com/photos/njukidreborn/12854376623/" title="Flickr 上 rebornix 的 Iamnotthatpieceofmaterial"><img src="https://v4s2.yimg.com/so/7298/12854376623_b4cdbc73de_z.jpg" width="322" height="406" alt="Iamnotthatpieceofmaterial"></a>

我放弃了，一个聪明的人应该知道自己什么时候得坚持，什么时候要学会放弃。那之后，有那么几次，我重新燃起了对JS的兴趣，事实残酷地甩了我几个巴掌。

#Learn JS in Code Review#
最近老板让我多打了一份杂工，和周总他们一起写写JS。工资嘛，当然还是只有一份的，但我仿佛又看到了希望，我可能真的要达成我多年的夙愿，做一名服务水平一流的前台工程狮，哦不，前端工程师。

我接到的第一个前端的活儿，就是给我们页面上的TOC（table of content）加上搜索的功能，这个搜索需要先call后台，然后在前台的tree上定位。我们的tree是用jstree实现的，所以看到这个需求当时我就思密达了，别说jstree了，我连Jquery都没用过啊欧巴！

不过代码的问题终归不是问题，难不过硬件。挑灯夜战一晚上后，第二天我就提裤子上阵了。我以最快的速度完成了这不到三十行代码，但发出来给前辈们review之后，我发现，故事里说的“一行一个comment”原来不是骗人的。之后我就着同事们code review提的建议，一条条地修改。正所谓10%的时间完成了90%的功能，而剩下10%的功能则要花去我们90%的时间。反反复复修改三次后，我的代码终于上得了厅堂，斗得了前端工程师。

在研究前辈们给的意见时，之前在书本上看到的看似浅显简单的知识突然都跃然码上。当然我也尽可能的不卑不亢，虽然不说挑战“权威”，但我也绝不人云亦云，每一条知识我都会进行考证。有趣的是，我的同事们竟也百密一疏，某些地方他们凭借敏锐的直觉发现了问题，但却没能给出正确的建议。不过我想，Code Review更大的作用在于授人以渔而不是授人鱼，发现问题比找到答案更重要。后者你往往可以在文档源码甚至Google、SO中找到，而前者是一种预判和直觉，这也是为什么软件工程被称为一门艺术，而不仅仅是搬砖。

短短的半天时间，我的代码演变了三个版本，修改了不下七八处，虽然只是完成一个搜索的功能，但学到的知识却比以往任何时候都来的多，也更**深刻**。回想起老板之前给我的学习C#的建议之一就是去围观zhenhui大神的code review，我意识到，这可能是一条更适合我的学习方式。从Peer Review中去深入了解Javascript的best practice，在伙伴的批评和建议中培养起自己的critical thinking，和teammate一起成长。

这世界这么小这么挤这么瘦，肯定有很多伙伴在学习的过程中遇到和我一样的困惑，不如写个几篇文章，权当抛个砖头骗骗你们玉：）如果有JS大神走过路过，不妨看看我代码遇到的坑你们是否能720度转体两周完美跳过，或者能给我更多的建议。

本教程适合于满足以下条件的伙伴：

 1. 翻阅过好几本JS的入门书籍、经典书籍，觉得这些书里讲的知识都差不多
 2. 但是感觉自己好像还是没有入门
 3. 当自己决定动手写点什么时，一下子什么都想不起来了。


好了废话少说，我的第一版(Iteration 1)是这样的：
```Javascript
function query() {
    var re = /[a-zA-Z]{2}\d+/;
    var isShortId = re.exec($("#searchboxText").attr("value"));

    if (isShortId) {
        $.ajax({
            type: "GET",
            url: "/query",
            data: {
                "term": $("#searchText").attr("value")
            },
            dataType: "json",
            async: true,
            cache: false,
            success: function (result) {
                tree.search(result, false);
            },
            error: function (data) {
                tree.search($("#searchText").attr("value"), false);
            }
        });
    } else {
        tree.search($("#searchText").attr("value"), false);
    }
};
            
// Click the search button for search results.
$("#searchButton").click(query);

// Press ENTER in search text box for search results.
$("#searchText").keyup(function (event) {
    if (event.which == KEY_ENTER) { // check if the enter was pressed.          
        query();
    }
});
```

##正则表达式##
在上面的code中，我使用正则表达式`var re = /[a-zA-Z]{2}\d+/;`来判断用户输入。很不幸地，就这么一段小小的代码，我收到了三条comment，简直是人类的耻辱。

我们先看第一条：

 - better naming 

这一点，是我没有以写C#的态度来写JS，觉得前端代码随便写写就好了。当然是不可取的。

第二条：

 - '/[a-zA-Z]{2}\d+/': make it a global variable to improve performance

我知道JavaScript中初始化正则表达式的两种方式：
```
var re = /ab+c/; // Using a regular expression literal
var re = new RegExp("ab+c"); // Calling the constructor function
```
莫非这里面大有来头？我速度查阅了一下mozilla的JS正则表达式的[文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)，分分钟就发现了问题所在。如果使用字面值初始化Regex，load script的时候就完成了这段regex的complication。而如果使用构造函数，regex complication则会发生在runtime。但从搜索这个功能的角度来看，使用literal性能会稍微好那么一丢丢。

我的代码里使用了literal而不是constructor function，这说明我刚好有一个正确的品味，而这往往是很难...慢着，先不要自我陶醉，回到这条comment，把正则表达式变成global variable真的有必要么？

我们知道，Performance除了考虑时间，还要考虑空间的问题。从经验上来看，literal regex这样的字面量，每次赋值应该都是使用的同一个object。熟练使用C/C++的朋友估计从来不会考虑到这个问题，因为我们知道编译器会对字面常量进行优化，哪怕你是看谭浩强的书长大的。

带着一点不解，我翻开了JavaScript权威指南，一分钟之后我发现这不过是我的一厢情愿。ECMA 5 中，解析regex表达式每次都会生成一个新的object，也就是说，如果我在两个函数里分别使用了这段`/[a-zA-Z]{2}\d+/`，JS Runtime会生成两个object。然而在ECMA 3中，则只会生成一个object。是的，历史有时候就是这么倒退的。

看完上面这一段，也许你明白了为啥现在浏览器们都这么吃内存了。下面我们看第三条comment。

 - use '^' & '$'

Mozila上对exec这个方法的定义是`A RegExp method that executes a search for a match in a string. It returns an array of information.`显然，如果我不加上`^`和`$`标记开头和结尾，是无法实现exact match的。出现这个错误完全是对JS Regex的不了解。

##Function##

除了正则表达式，同事们对我定义函数的方式似乎也有很大的意见：

 - use function variable

我从没想过函数的声明方式居然也能影响performance。长的好不好，和好不好使从来没有绝对的关系。如果哪个朋友对此有异议，回炉重造看个十来部岛国武打片你就了然于心了，不客气。JS定义函数的方式比较多，这里我就挑两种来比较一下，第一种是function declaration，也就是我使用的

```
function fn() { return 1; };

var result = fn();
```

第二种，是function expression，即同事们希望我使用的function variable

```
var fn = function() { return 1; };

var result = fn();
```

已经备受打击的我决定到jsperf上跑一跑分，[结果](http://jsperf.com/function-declaration-vs-function-expression2/5)出乎我的意料！在和Function expression的较量中，Function declaration完胜，在Chrome v33 上，declaration的性能甚至达到了expression的**20倍**。那感觉就像你第一次玩骷髅王中单遇到了敌法师，不作死就不会死。

最后一条comment：

 - check returned value

你瞧，有的时候我的同事们就是这么较真，一点细节都不放过。经过这次大兴土木，我的代码洗心革面，终于迎来了第二春，是这样的：
```
function metadataQuery() {
    var isShortIdRegex = /^[a-zA-Z]{2}\d+$/;
    var isShortId = isShortIdRegex.exec($("#searchText").attr("value"));

    if (isShortId) {
        $.ajax({
            type: "GET",
            url: "/query",
            data: {
                "term": $("#searchText").attr("value")
            },
            dataType: "json",
            async: true,
            cache: false,
            success: function (result) {
                var isClixIdRegex = /^\d+$/;
                            
                if (!isClixIdRegex.exec(result) || result == 0) {
                    tree.search($("#searchText").attr("value"), false);
                } else {
                    tree.search(result, false);
                }
            },
            error: function (data) {
                tree.search($("#searchText").attr("value"), false);
            }
        });
    } else {
        tree.search($("#searchText").attr("value"), false);
    }
};
            
// Click the search button for search results.
$("#searchButton").click(metadataQuery);

// Press ENTER in search text box for search results.
$("#searchText").keyup(function (event) {
    if (event.which == KEY_ENTER) { // check if the enter was pressed.          
        metadataQuery();
    }
});
```

##代码冗余##
发完第二版之后，我以为终于可以告一段落迎来新的篇章了，结果同事们百折不挠。不过这次的comment和JavaScript语言本身没有太大的关系。

首先是要减少if/else深度和分支，我的上一段代码里有三个分支最终都要call到`jstree.search()`，不同只是传入的参数。其次，ajax的参数complete、success、error都是optional的，不需要的地方可以略去。总结一下就是尽可能地减少代码冗余。

修改完上述问题后，他们终于不好意思再给我comment了，最终版是这样的：
```
var ShortIdRegexPattern = /^[a-zA-Z]{2}\d+$/;
            
function metadataQuery() {
    var queryTerm = $("#searchboxText").attr("value");
    var isShortId = ShortIdRegexPattern.exec(queryTerm);

    if (isShortId) {
        $.ajax({
            type: "GET",
            url: "/query",
            data: {
                "term": $("#searchText").attr("value")
            },
            dataType: "json",
            async: true,
            cache: false,
            success: function (result) {
                if (result != 0) {
                    queryTerm = result;
                }
            },
            complete: function(data) {
                tree.search(queryTerm, false);
            }
        });
    } else {
        tree.search(queryTerm, false);
    }
};
            
// Click the search button for search results.
$("#searchButton").click(metadataQuery);

// Press ENTER in search text box for search results.
$("#searchText").keyup(function (event) {
    if (event.which == KEY_ENTER) { // check if the enter was pressed.          
        metadataQuery();
    }
});
```

#Conclusion#
经历了这次Code Review后，我再次感受到，写出能用的代码和高质量的代码是有很大距离的。在短短三十行代码里我比较深入地研究了下JavaScript的正则表达式、函数定义和性能上的优化，学习的效率和成果让我颇为满意。

如果你也有一群追求代码质量且愿意帮助他人提高的同事，Code Review不失为一个老少皆宜的学习方法。如果你的团队没有这样的氛围，这也没关系，你只需找一个愿意和你一起专研某门技术的好基友作peer review就好了。别忘了送他一块肥皂。
