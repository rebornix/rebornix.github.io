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

##Angular Principles

第一类问题是关于 Angular 的运行原理。像 ASP.NET 这种框架，你大部分时候都不需要理解它的机制，而当你不得不去理解 ASP.NET 是怎么运行，那基本说明你遇到了非常坑爹的问题了。但是 Angular 并不是这样的，即使你是上手才半个礼拜的新手，当你需要完成一些特定的功能，你就不得不理解 Angular 的 principles，否则你就会掉入坑中爬不出来。这也就是业界对 Angular 最大的批评，学习曲线比较高。

###Digest Loop

这是我心目中的 Angular 第一大杀手。很多前端工程师从纯 JS 或者别的框架迁移到 Angular 的时候，最经常问的就是，为什么我更新了某某 object 的值，页面上没有更新呢？ Angular 使用 Digest cycle 来实现 two way binding，而他们的操作并没有进入到这个 cycle 中，比如 [ace update text](http://stackoverflow.com/questions/30613139/ace-editor-replace-text/30613945#30613945)，[show json](http://stackoverflow.com/questions/28252432/angularjs-doesnt-show-json-data/28252476#28252476), [image change](http://stackoverflow.com/questions/28226525/angularjs-watch-for-image-change/28227729#28227729)。

还有就是在写 directive 的时候，更新了 model 却不能[刷新](http://stackoverflow.com/questions/28207826/modifying-scope-variables-in-an-event-in-a-directives-link-function/28208216#28208216)[页面](http://stackoverflow.com/questions/28213976/ngmodel-value-is-not-updating-in-directive/28214184#28214184)

好不容易 developer 知道可以使用 `$apply` `$digest` 去手动 trigger digest loop，他们也会经常遇到 [infinite digest cycle](http://stackoverflow.com/questions/28310486/running-into-infinite-digest-cycle-while-binding-to-function-that-has-http-insi/28311493#28311493) 的问题，简直要疯了。

###Expressions
Angular 中有两种使用 expression 的方式，一种是在 built-in 的 directive 中，比如 `<input type="text" name="userName" ng-model="user.name"`，另一种就是使用 double bracket `<p>My first expression: {{ value }}</p>`。

可是奇怪的事情，当你使用`ng-src`的时候，你需要这样写 `<img src="http://www.gravatar.com/avatar/{{hash}}" alt="Description"/>` ... 我已经不知道该说什么好了 ...你可以再看看这里 [1](http://stackoverflow.com/questions/28232073/creating-a-directive-for-bootstrap-menuitems/28232195#28232195), [2](http://stackoverflow.com/questions/28379139/angularjs-ng-click-function-with-angular-expression-parameter-returning-a-syntax/28379163#28379163)。


###Module definition

http://stackoverflow.com/questions/28258655/angularjs-directive-definition-using-angular-module/28258670#28258670

###$scope

http://stackoverflow.com/questions/28207136/angularjs-injector-error-uncaught-error-injectormodulerr/28208023#28208023
http://stackoverflow.com/questions/28525717/angular-js-ng-include-binding-issues/28525878#28525878

###Angular run phase

http://stackoverflow.com/questions/28541179/global-functions-in-angularjs/28541333#28541333

###DI

http://stackoverflow.com/questions/28585695/angularjs-1-0-7-locationprovider-undefined/28585749#28585749



##Directive

###Built-in Directives
ng-click/ng-disabled
http://stackoverflow.com/questions/28575962/ng-disabled-of-image-in-angularjs/28576023#28576023
ng-change
http://stackoverflow.com/questions/28575500/how-to-set-default-value-in-an-angular-select-menu-based-on-data-binding-instead/28575607#28575607
ng-repeat
http://stackoverflow.com/questions/28409338/preprocess-ng-repeat-variables/28409606#28409606
http://stackoverflow.com/questions/28533755/how-to-show-specific-element-in-table-cells-using-angularjs/28533798#28533798
ng-cloak
http://stackoverflow.com/questions/28537190/is-it-possible-to-show-template-in-angular-when-data-is-ready/28537209#28537209
ngStyle/ngClass
http://stackoverflow.com/questions/30430443/how-can-i-use-ng-if-to-check-if-the-string-contains-others-substrings/30430469#30430469
http://stackoverflow.com/questions/28252017/how-to-assign-a-width-to-span-dynamically/28252247#28252247
http://stackoverflow.com/questions/30552822/why-cant-i-set-the-height-of-an-element-with-ng-style/30552904#30552904

###$http
$http 也是一个built-in的directive
$http Encoding
http://stackoverflow.com/questions/28384174/paypal-api-with-angular-400-bad-request/28389396#28389396
http://stackoverflow.com/questions/30495962/angularjs-consume-asp-net-web-service/30496036#30496036
http://stackoverflow.com/questions/30519568/what-data-attribute-to-use-when-returning-application-pdf/30520094#30520094

$http cache
http://stackoverflow.com/questions/28472395/how-to-cache-http-in-angular-until-parameters-changed/28472485#28472485
$http Headers
http://stackoverflow.com/questions/30557457/how-can-i-added-default-header-for-delete-in-angular-js/30557502#30557502
JSONP
http://stackoverflow.com/questions/30634093/error-on-get-request-to-steam-market/30634248#30634248
CORS
http://stackoverflow.com/questions/28140859/angularjs-refused-to-set-unsafe-header-access-control-request-headers/28162228#28162228
http://stackoverflow.com/questions/28269240/how-to-properly-separate-frontend-and-backend/28269626#28269626
http://stackoverflow.com/questions/28515863/cross-origin-request-not-working-in-cordova-with-angularjs/28516044#28516044
http://stackoverflow.com/questions/28447391/http-how-to-get-filename-of-headers-from-webapi-with-cors/28447415#28447415
Promise
http://stackoverflow.com/questions/28207899/how-to-execute-an-action-only-after-success-angularjs/28208117#28208117
http://stackoverflow.com/questions/28469774/using-angular-how-can-we-make-a-call-after-completing-bunch-of-asynchronous-call/28469983#28469983
http://stackoverflow.com/questions/28523621/returning-response-to-controller-from-factory-method-in-angular/28523666#28523666
$http Angular interceptor
http://stackoverflow.com/questions/28375505/angularjs-successful-401-intercept-still-throws-401/28377697#28377697

###Write your own directive
Directive Model binding
http://stackoverflow.com/questions/28214948/angularjs-send-image-to-directive-and-show-directive/28216033#28216033
http://stackoverflow.com/questions/28394118/angularjs-directive-scope-not-resolved-attr-name-is-not-defined-error/28394192#28394192
http://stackoverflow.com/questions/28425711/angularjs-pass-scope-variable-as-directive-attribute/28425856#28425856

##Best Practice

###Communication/Data Sharing between Controllers/Factories
http://stackoverflow.com/questions/28208523/how-to-change-the-scope-in-angular-in-a-view-which-you-are-not-yet-in/28208585#28208585
http://stackoverflow.com/questions/28235351/parent-view-does-not-get-updated/28235844#28235844
http://stackoverflow.com/questions/28337048/communicating-between-controllers-in-angularjs/28337130#28337130
http://stackoverflow.com/questions/30507754/angular-js-api-using-a-factory/30507914#30507914
http://stackoverflow.com/questions/30524583/is-it-possible-to-share-value-between-controllers-without-ng-model-in-angularjs/30524689#30524689

###Third party library integration
http://stackoverflow.com/questions/28225799/chart-js-nuget-package-with-angularjs/28227997#28227997

###ngModel binding/Performance Enhancement
http://stackoverflow.com/questions/28289529/ng-model-is-overkill-for-me-any-alternative-which-will-update-scope-only-on-but/28290509#28290509
http://stackoverflow.com/questions/28291569/elements-in-scope-missing-from-form/28291758#28291758
http://stackoverflow.com/questions/28378575/how-to-get-previous-value-and-compare-with-new-value-before-bind-value-in-angula/28379119#28379119