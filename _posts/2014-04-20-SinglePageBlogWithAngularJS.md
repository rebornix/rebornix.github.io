--- 
layout: post
title: Single Page Blog with AngularJS
category: 海上日志 
status: publish 
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- JavaScript

---
今天这篇博客的主题是Single-page blog with AugularJS，也就是说，用AngualrJS做一个Single-page app（SPA），并用在博客系统上。对于这个topic，我觉得有责任对读者朋友们说点什么。我一定不是第一个做这件事的人，我肯定也不会是最后一个，但我还是要把自己的切身经历讲一讲，尽可能地让部分读者知道，因为这些open source tool/library的存在，开发一个你想象中的产品变得如此容易。


#前因#
前段日子我和sneezry吐槽，我们组这次re-arch打算纯用AngularJS做一个SPA。是的你没看错，庞大臃肿如我司现在也突然开始更大限度地鼓励开发拥抱新的（或者叫 外面的）技术，就像了迎来了改革开放。没有一丁点儿的.NET code，换做谁都是要有顾虑的，可以想象，这样一个决定在公司内引起多大的波澜。sneezry甚至还写了这样一篇[博客](http://sneezry.com/#!/2014/03/18/JS_is_candy)。

一个月过去了，产品渐渐成型。我和大小伙伴们惊奇地发现，prototype的效果比想象中好非常多，performance问题也不算大。周五看完他们的demo，被小小震撼的我决定自己也来试试AngularJS。

#Single-Page App#
简单来说，一个SPA就是动态地加载资源，把所有的功能都在单个页面实现，用户访问不同的功能时不需要页面的跳转，就像你使用大部分桌面应用一样。这里我们只是管中窥豹说到SPA，我第一个想到的，其实是Sneezry的博客系统Hooloo，无论是查看博客列表还是阅读文章，都不用离开当前页面。不过Sneezry的大神比较土豪，没有使用什么库，自己拿JS手写的。我等学渣肯定学不来，我就来看看用AngularJS该怎么达到相同的目的。

##View Engine##
作为一个简陋的博客，只需要两种页面，第一个是blog list，第二个就是article content。只要有一个section能够动态加载页面，就大功告成了。我虽然没有一丁点儿AngularJS的知识，但是我知道在Asp.NET里面是这么做的：

    <div role="main">
            @RenderBody()
    </div>

于是我到famous website上查了一把，发现AngularJS的做法也是非常的类似：

    <html data-ng-app="SinglePageBlogApp">
        <div data-ng-view=""></div>
    </html>
    
知道把动态的page往哪儿塞，任务已经刚完成了一半，剩下的另一半就是怎么往里面塞呢？

##Routing##
用一个小学生都能懂的话来解释，要访问不同的页面，输入不同的url就行了。回到我熟悉的Asp.NET，我知道，通过访问不同的view，Asp.NET的view engine会把对应的html渲染后扔回去（也就是RenderBody）。殊途同归，我想AngularJS的做法肯定不会差太远。稍微调整了几个搜索关键词后，我找到了答案：

    app.config(function ($routeProvider) {

        $routeProvider.when("/home", {
            controller: "BlogController",
            templateUrl: "app/views/home.html"
        });
	      $routeProvider.when("/:year/:month/:day/:name", {
            controller: "EntryController",
            templateUrl: "app/views/entry.html"
        });
        $routeProvider.otherwise({ redirectTo: "/home" });
    });
    
上面的code简直就像普通话一样通俗易懂。引入一个名叫ngRoute的module后，我可以定义不同url pattern对应的页面，比如访问"/home"，就会得到"home.html"；访问"2014/04/20/SinglePageBlog"，会得到"entry.html"。

不过"home.html"依然只是static page，我们肯定不希望每次写了一篇新的文章，我都去更新"home.html"中的blog list。这样虽然够静态够环保，但是实在是原始了。

好在Angular能够允许我们定义怎么渲染页面，这也就是上面代码中controller的作用，通过自己定义controller，能够动态的创建页面。下面我们来看看我是怎么做的。

home.html它长这样，虽然有点磕碜：

    <div>
	<ul>
		<li ng-repeat="blog in blogList">
			<a ng-click="selectBlog(blog)" >{{blog["name"]}}</a>
		</li>
	</ul>
	<hr>
    </div>

ng-repeat的作用是轮询`blogList`里的blog object，为每个blog创建一个对应的`<li>`，`{{blog["name"]}}`则是访问这个blog对象的field：name。定义完这个动态的html，下面我们来看看负责渲染的controller `BlogController.js`

    app.controller('BlogController', function($scope, $http, $log, $window, blogEntryService) {
		    $scope.blogList = [];
		    $http({method: 'GET', url: 'https://api.github.com/repos/rebornix/rebornix.github.io/contents/_posts'}).
			    success(function(data, status, headers, config) {
					    var alldata = data.reverse();
					    $scope.blogList = [];
					    alldata.forEach(function(entry) {
						    var suffix = "md";
						    if (entry["name"].indexOf(suffix, entry["name"].length - suffix.length) !== -1){
							    $scope.blogList.push(entry);
						    }
				 	    });
				    });
			    });
		    $scope.currentBlog= $scope.blogList[0];

		    $scope.selectBlog = function(blog) {
			    blogEntryService.setBlogEntry(blog);
			    params = blog["name"].split('-');
			    $window.location.href = "#/" + params[0] + "/" + params[1] + "/" + params[2] + "/" + params[3].replace(".md", "");
		    }
    });
    
读者可能并不知道上面代码里`$scope $http`的含义，但不影响我们理解这段代码的作用。我对`https://api.github.com/repos/rebornix/rebornix.github.io/contents/_posts`Get了一把，获得了我写过的文章的列表，然后赋值给了blogList，因为blogList是一个list，我们最终能够在`home.html`里对它做了一个轮询`ng-repeat="blog in blogList"`，记得吗？

通过相同的方式，我给"entry.html"写了一个controller用来显示blog content。一个简易的博客系统就完成啦~

#后果#
就这样，写了不到一百行代码（如果我把html也当代码的话），我就已经实现了一个single-page blog，详情可见 [rebornix.com/spa.html](http://rebornix.com/spa.html) 。而我只是对angularjs的view-engine和routing有了些许的了解。从学习angularJS到最终完成不到半天，这其中还夹杂着洗衣做饭陪女王大人看电视。

当然对于一个功能完备的博客来说，还有很多坑要踩，比如博文被Google收录的问题，这些在Sneezry介绍[Hooloo的博客](http://sneezry.com/#!/2014/02/11/基于Github的前端轻量级博客系统)里也都有提到（不得不佩服Sneezry，这货几乎是完成了和AngularJS相似的功能，造轮子万岁！），但我就不继续了。毕竟，我的目的并不是拿AngularJS再造一个Hooloo。

作为一个吃软饭的.NET程序员，我只是突然意识到，如果把AngularJS（或者knockout，whatever）和Asp.NET结合在一起，能够创造出无与伦比的Single-page Blog Application。To be continued...
