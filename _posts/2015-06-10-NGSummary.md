--- 
layout: post
title: 从StackOverflow看Angular 1.x
category: Frontend
status: publish 
published: true
type: post
tags: 
- 

---
去年 IE Team 把 issue tracker 放到 StackOverflow 之后，我一度以为 SO 会革了 MSDN Library 和 Forum 的命（也就是让我丢掉饭碗），就像 GitHub 干掉 Codeplex 和 Google Code 一样。刚好当时我学习和实践 AngularJS 有一段时间了，我就想到 SO 上试试身手，看看自己的水平，是否能够帮助到别人。

于是我每天大概花半个小时不到在 SO 的 [Angular JS](http://stackoverflow.com/questions/tagged/angularjs) tag 下面解答问题。玩了半个月左右，拿到一千多分。在 SO 上刷分当然不是目的，但是分数比较好的体现了你回答的问题的准确度和热门度，所以我比较关注这个指标，但这个过程只能用艰难来形容。之所以称之为艰难，主要原因有两个。

1. 如果题目比较基础，解答相对容易。但是你会遇到很多三哥朋友们第一时间冲出来回答。甚至很多时候，你已经做出解答了，他们还源源不断地 post 和你一模一样的 answer 。
2. 如果题目比较深入，确实没有三哥和你抢了，但很多时候这也意味着，没有多少人会关注这个问题，为你的答案点赞。

这两个现象其实都来源于一个 root cause ：基础的问题，回答起来更容易，花的时间更少，得到的分数更多。而这样的问题，受到所有人的喜爱。为什么呢？对于抢分狂魔而言，这种题目分数更好得；对于热心答题不计较分数的好心人而言，回答这种问题，能够把时间省下来帮助更多的人，何乐而不为？当整个社区都呈现这种状态是，你就不难得到当年老赵对 SO 的评论：`如果你经过深思熟虑也无法解决的问题，丢到 SO 上，也基本上不会得到你想要的答案`。这是个悲伤的结论，但 it's true 。

SO 其实也意识到这个问题了我估计，于是他们搞了个 Golden Badge 叫做`Unsung Hero`。获得这个 Badge 的条件是，你超过一半的答案被选为正确答案，但是没人给你 upvote（也就意味着关注度小）。真的是名副其实，无名英雄。最开始拿到这个 Badge 的时候，我并没有特别高兴。但当我得到上面的结论时，我就释然了。高兴了无聊了工作累了，我就爬上去回答一些我知道的问题。

这几天突然看到自己又一次上了 AngularJS 这个 Tag 的`Last 30 days top answerers`，我想，既然在 SO 上最热门最抢手的问题都是比较基础的、简单的，这也间接说明，对于新手而言，这些知识点具备一定学习曲线，并没有那么容易上手和熟悉。如果把这些知识点和问题做一个整理，这一定是一个不错的文档，也能从中看出这个语言或框架在设计方面的不足。于是我从前到后阅读了一遍我回答过的 Angular 的问题，很快发现不少反复出现或者同类型的提问。

下面让我们一起，从我的角度，看看大家学习 Angular 1.x 的时候通常会遇到哪些困难。

##一：Angular Principles

第一类问题是关于 Angular 的运行原理。像 ASP.NET 这种框架，你大部分时候都不需要理解它的机制，而当你不得不去理解 ASP.NET 是怎么运行，那基本说明你遇到了非常坑爹的问题了。但是 Angular 并不是这样的，即使你是上手才半个礼拜的新手，当你需要完成一些特定的功能，你就不得不理解 Angular 的 principles，否则你就会掉入坑中爬不出来。这也就是业界对 Angular 最大的批评，学习曲线比较高。

###Digest Loop

这是我心目中的 Angular 第一大杀手。很多前端工程师从纯 JS 或者别的框架迁移到 Angular 的时候，最经常问的就是，为什么我更新了某某 object 的值，页面上没有更新呢？ Angular 使用 Digest cycle 来实现 two way binding，而他们的操作并没有进入到这个 cycle 中，比如 [ace update text](http://stackoverflow.com/questions/30613139/ace-editor-replace-text/30613945#30613945)，[show json](http://stackoverflow.com/questions/28252432/angularjs-doesnt-show-json-data/28252476#28252476), [image change](http://stackoverflow.com/questions/28226525/angularjs-watch-for-image-change/28227729#28227729)。 GitHub 上有这样一群 repo ，他们专门负责把第三方的 library 进行包装，使得能够在 Angular 中使用。老实讲， Angular 养活了一批人呢。等2.0上市了，大家又要一股脑儿把这些 library 重新包装，有兴趣的同学不妨试试，是个不错的学习 Angular 和 Contribute to Open Source 的机会。

还有就是在写 directive 的时候，更新了 model 却不能[刷新](http://stackoverflow.com/questions/28207826/modifying-scope-variables-in-an-event-in-a-directives-link-function/28208216#28208216) [页面](http://stackoverflow.com/questions/28213976/ngmodel-value-is-not-updating-in-directive/28214184#28214184)

好不容易 developer 知道可以使用 `$apply` `$digest` 去手动 trigger digest loop，他们也会经常遇到 [infinite digest cycle](http://stackoverflow.com/questions/28310486/running-into-infinite-digest-cycle-while-binding-to-function-that-has-http-insi/28311493#28311493) 的问题，简直要疯了。

###Expressions
Angular 中有你可以这么使用expression

1. 在 built-in 的 directive 中，比如 `<input type="text" name="userName" ng-model="user.name"`
2. 另一种就是使用 double bracket {% raw %} `<p>My first expression: {{ value }}</p>`{% endraw %}。

可是奇怪的事情，当你使用`ng-src`的时候，你需要这样写 {% raw %}`<img src="http://www.gravatar.com/avatar/{{hash}}" alt="Description"/>` {% endraw %}... 我已经不知道该说什么好了 ...你可以再看看这里 [1](http://stackoverflow.com/questions/28232073/creating-a-directive-for-bootstrap-menuitems/28232195#28232195), [2](http://stackoverflow.com/questions/28379139/angularjs-ng-click-function-with-angular-expression-parameter-returning-a-syntax/28379163#28379163)。


###$scope

很多人搞不对expression也可能是因为没有理解 scope 。scope 既是连接 controller 和 view 的胶水，也是 expression 的运行环境。很多朋友在这里栽了，带来的结果往往是搞不定 [data](http://stackoverflow.com/questions/28207136/angularjs-injector-error-uncaught-error-injectormodulerr/28208023#28208023) [binding](http://stackoverflow.com/questions/28525717/angular-js-ng-include-binding-issues/28525878#28525878) 。

###Module definition

如果你只是通过官方的demo来学习Angular，你可能会搞不清楚`angular.module('app', [])`和`angular.module('app')`的区别，并且由于调用的错误，导致 module 不断地被反复 [initialize](http://stackoverflow.com/questions/28258655/angularjs-directive-definition-using-angular-module/28258670#28258670)。

###Angular config/run phase

在 module 的 bootstrap 过程中，你可以通过指定自定义的 Configuration blocks 来操作 provider/constants，或者使用 Run blocks 来配置 instances／constants ，千万不要[错用了](http://stackoverflow.com/questions/28541179/global-functions-in-angularjs/28541333#28541333)。

###DI
一般 dependency injection 出现问题，基本都是用户粗心[漏掉了某个 factory ](http://stackoverflow.com/questions/28585695/angularjs-1-0-7-locationprovider-undefined/28585749#28585749)，或者是使用了 minification 。


##二：Directive
什么是 directive ，这里我只简单贴一下官方的说法

> At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element or even transform the DOM element and its children.

directive 能够很好滴帮助实现模块化，在 Angular 在自己的实现过程中，就把不少功能以 directive 的方式提供给开发者。用户也可以自己书写 directive 对功能进行抽象。在我看来，directive 往往是初学者比较难以掌握的。

###Built-in Directives
首先是 Angular 提供的 directive 。有的时候，即使是认真研习文档，你也不一定能够成功理解它们的运行机制，很多朋友在这里就吃了苦头了。印象里 built-in directive 这个方面我拿分相对容易，因为我比较勤劳，如果文档不能够帮助解决问题的话，我会直接跑去看源码。如果问我泡 StackOverflow 最大的收获是什么，那一定是读了不少 Angular 的 source code。

SO 上经常会提及的 built-in directive 有

1. [ng-disabled](http://stackoverflow.com/questions/28575962/ng-disabled-of-image-in-angularjs/28576023#28576023)
2. [ng-change](http://stackoverflow.com/questions/28575500/how-to-set-default-value-in-an-angular-select-menu-based-on-data-binding-instead/28575607#28575607)
3. [ng-repeat](http://stackoverflow.com/questions/28533755/how-to-show-specific-element-in-table-cells-using-angularjs/28533798#28533798), [ng-repeat-start/ng-repeat-end](http://stackoverflow.com/questions/28409338/preprocess-ng-repeat-variables/28409606#28409606) 。尤其是后者，满多人上来问，我该怎么用 ng-repeat 实现 xxx 功能，基本都是因为他们不知道 ng-repeat-start/end .
4. [ng-cloak](http://stackoverflow.com/questions/28537190/is-it-possible-to-show-template-in-angular-when-data-is-ready/28537209#28537209) 玩过 Angular 的同学都知道，如果页面 loading 比较慢，就会看到页面上充满着各种花括号，然后才会变成相应的文字。为了解决这种问题， Angular 给我们提供了 ng-cloak （ng-bind也能实现一样的效果）。这是我给[microsoft.github.io](http://microsoft.github.io) 交的第一个 pr :)
5. [ng](http://stackoverflow.com/questions/28252017/how-to-assign-a-width-to-span-dynamically/28252247#28252247)-[style](http://stackoverflow.com/questions/30430443/how-can-i-use-ng-if-to-check-if-the-string-contains-others-substrings/30430469#30430469)/[ng-class](http://stackoverflow.com/questions/30552822/why-cant-i-set-the-height-of-an-element-with-ng-style/30552904#30552904) 在使用 JQuery 的时候，可以直接操作 DOM 来添加样式，但这并不是 Angular 推荐的方式。很多人意识到了这点，他们只是刚好没听说 ngStyle/ngClass 。

###Write your own directive
除了使用 built-in 的 directive ，Angular 也鼓励大家来写自己的 directive。但是这里大家经常会遇到 [model binding](http://stackoverflow.com/questions/28214948/angularjs-send-image-to-directive-and-show-directive/28216033#28216033) 或者是如何给 [attr 传值](http://stackoverflow.com/questions/28394118/angularjs-directive-scope-not-resolved-attr-name-is-not-defined-error/28394192#28394192)，再或者从 directive 中[访问 controller 的 scope](http://stackoverflow.com/questions/28425711/angularjs-pass-scope-variable-as-directive-attribute/28425856#28425856) 。 


##三：$http
$http 只是一个 built-in 的 service ，但我要把它单独拿出来讲一讲，一方面是因为这是一个非常基础的 service （访问后台 Rest API ），另一方面是 developer 在和 $http 总会不约而同的想静静。

1. Encoding 真的是所有程序员的噩梦。到底是 form 还是 json 还是 byte array ？如何设置 header ？如何配置 callback ？[问题](http://stackoverflow.com/questions/28384174/paypal-api-with-angular-400-bad-request/28389396#28389396) [多](http://stackoverflow.com/questions/30495962/angularjs-consume-asp-net-web-service/30496036#30496036) [多](http://stackoverflow.com/questions/30519568/what-data-attribute-to-use-when-returning-application-pdf/30520094#30520094)。
2. Cache 为了减少 call 后台的 cost，$http 提供了 [cache 的功能](http://stackoverflow.com/questions/28472395/how-to-cache-http-in-angular-until-parameters-changed/28472485#28472485)。
3. Headers 论如何为所有的 $http request 配置 [header](http://stackoverflow.com/questions/30557457/how-can-i-added-default-header-for-delete-in-angular-js/30557502#30557502)。
4. [JSONP](http://stackoverflow.com/questions/30634093/error-on-get-request-to-steam-market/30634248#30634248)
5. CORS. Angular 把 rendering engine 搬到了浏览器里，我们需要通过 ajax 向 backend server 抓取数据然后在页面上渲染，这就不可避免的遇到了 cross domain 的各种 failure ，算得上前端届又一个[老](http://stackoverflow.com/questions/28140859/angularjs-refused-to-set-unsafe-header-access-control-request-headers/28162228#28162228) [大](http://stackoverflow.com/questions/28269240/how-to-properly-separate-frontend-and-backend/28269626#28269626) [难](http://stackoverflow.com/questions/28515863/cross-origin-request-not-working-in-cordova-with-angularjs/28516044#28516044) [问题](http://stackoverflow.com/questions/28447391/http-how-to-get-filename-of-headers-from-webapi-with-cors/28447415#28447415)。
6. Promise. ASP.NET 有 async/wait，你猜 Angular 里面[都](http://stackoverflow.com/questions/28523621/returning-response-to-controller-from-factory-method-in-angular/28523666#28523666) [有](http://stackoverflow.com/questions/28207899/how-to-execute-an-action-only-after-success-angularjs/28208117#28208117) [啥](http://stackoverflow.com/questions/28469774/using-angular-how-can-we-make-a-call-after-completing-bunch-of-asynchronous-call/28469983#28469983)。
7. interceptor. Angular 允许你 customize $http 的 [error handling](http://stackoverflow.com/questions/28375505/angularjs-successful-401-intercept-still-throws-401/28377697#28377697)。

最后，读者朋友如何跑到我博客首页看一看，你还能看到去年我对 Angular 的吐槽 [Angular 一个值得当心的bug](https://rebornix.com/frontend/2014/12/07/AngularJSFuckMeUp/) 。是的，我喷的就是 $http ，虽然没有什么卵用。

##四：Best Practice
还有一类问题，来自有理想有追求的朋友。他们想知道如何 think in Angular，如何操作能够有比较好的 performance等等。

###Communication/Data Sharing between Controllers/Factories
当你想在不同的 context 之间共享 data 的时候，全局变量堪称 fast and dirty 。但不幸的是，从你上大学的第一天开始，就有人不断告诉你这么做是不负责任滴。于是为了避免被同事 code review 的时候 challenge，不断有人来问该[如何](http://stackoverflow.com/questions/28208523/how-to-change-the-scope-in-angular-in-a-view-which-you-are-not-yet-in/28208585#28208585) 在 [controller/factory/directive/etc](http://stackoverflow.com/questions/28235351/parent-view-does-not-get-updated/28235844#28235844) [之间](http://stackoverflow.com/questions/30524583/is-it-possible-to-share-value-between-controllers-without-ng-model-in-angularjs/30524689#30524689) [share](http://stackoverflow.com/questions/28337048/communicating-between-controllers-in-angularjs/28337130#28337130) [data](http://stackoverflow.com/questions/30507754/angular-js-api-using-a-factory/30507914#30507914) 。俗称，月经帖。

###Model binding/Performance Enhancement
其实这个和上文提到的 [digest loop](#digest-loop) 可以放在一起谈。Angular 使用了 dirty check 去实现 two-way binding，也就是很傻瓜地反复地遍历 watch list，看看大家有没有什么更新。当页面上的绑定的 element 开始增多（大概2000+），dirty check 就会严重拖累整个页面的 performance。

dirty check 简直是 Angular 1.x 的阿克琉斯之踵，然后谷歌的大大们在2.0中，把它无情地抛下了。听闻这个消息，我等屁民“弹冠相庆”，谁让它[老是](http://stackoverflow.com/questions/28289529/ng-model-is-overkill-for-me-any-alternative-which-will-update-scope-only-on-but/28290509#28290509) [折磨](http://stackoverflow.com/questions/28291569/elements-in-scope-missing-from-form/28291758#28291758) [我们](http://stackoverflow.com/questions/28378575/how-to-get-previous-value-and-compare-with-new-value-before-bind-value-in-angula/28379119#28379119) 呢。

---
去年四月我第一次接触 Angular，写了点自嗨的[小玩具](https://rebornix.com/海上日志/2014/04/20/SinglePageBlogWithAngularJS/)，转眼已经过去十三月了。短短的一年光阴，Angular 1.x 已经确立了不可撼动的一哥地位，而2.0 也已经“洗心革面”马上要出来重新做人。至于我，在尝试完各种姿势之后，也算是找到了一点方向。希望2015年剩下的时间里，做好一个产品，来一点 breaking change。

Breaking Change!! Hell Yeah!!