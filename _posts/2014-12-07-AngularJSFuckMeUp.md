--- 
layout: post
title: Angular 一个值得当心的bug
category: Frontend
status: publish 
published: true
meta: 
  _edit_last: "2"
type: post
tags: 
- 

---

上周四早上收到美帝客户的邮件爆我们，说咱们的编辑器不能编辑markdown也不能preview。美帝同志还是很体贴的，虽然这周我on call，他们也没有惨无人道地半夜把我喊起来，只是静静地等我们都来了公司才呼唤我们。这里给你们点赞！

##Live Site

上线一看，只有部分文章的内容load不出来，导致无法编辑和预览。抓包看了下，HTTP request call全部都是成功了，也就是说问题没有出在后台，至少浏览器已经成功获取content。那问题很显然出在JS代码上，而获取markdown文档代码其实只有一行：
    
    $http.get(url).then(function(response) { ... } ;

不幸的是`$http.get`函数都没执行完就挂了，抛出了这样的exception `Syntax Error: undefined token D`。看到这里同学们肯定都笑了，这不就是JSON没处理好嘛，不怨别人，backend server返回的JSON格式不对。

可剧情在这里发生了反转，我们在后台使用Azure Blob作为storage，无论是markdown文档，还是图片，视频，都以Blob (binary large object)进行存储，也就是说后台把数据传送给前台就是一串byte。而且，会在response headers里面加上这样一条`content-type: applicaiton/octet-stream`，而不是常见的`applicaiton/json`。

问题到这里变得比较清晰了，backend server显式地申明response的content-type为任意二进制数据，为何AngularJS坚持要把数据当JSON解析呢？

##打开AngularJS $http 瞧一瞧
带着疑惑我打开anguarjs关于$http的代码，看看究竟是什么样的逻辑。[AngularJS/src/ng/http.js](https://github.com/angular/angular.js/blob/master/src/ng/http.js)代码的第一段就把故事交代了，我们看


    var APPLICATION_JSON = 'application/json';
    var CONTENT_TYPE_APPLICATION_JSON = {'Content-Type':APPLICATION_JSON + ';charset=utf-8'};
    var JSON_START = /^\s*(\[|\{[^\{])/;
    var JSON_END = /[\}\]]\s*$/;
    var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;

    function defaultHttpResponseTransform(data, headers) {
      if (isString(data)) {
        // strip json vulnerability protection prefix
        data = data.replace(JSON_PROTECTION_PREFIX, '');
        var contentType = headers('Content-Type');
        if ((contentType && contentType.indexOf(APPLICATION_JSON) === 0 && data.trim()) || (JSON_START.test(data) && JSON_END.test(data))) 
        {
          data = fromJson(data);
        }
      }
      return data;
    }


我们看到，在浏览器收到HTTP response后，AngularJS会试图对response body的数据进行一些transform，而默认的transform方法就是判断数据是否为JSON。判断的方式有两种

1. 看Response Headers里面是否有`Content-Type`，如果有，判断一下是否为`application/json`。
2. 使用两个正则表达式`JSON_START = /^\s*(\[|\{[^\{])/;`和`JSON_END = /[\}\]]\s*$/;`。

我们的这条HTTP Response肯定不符合第一条，那么就到了第二条check。只要`JSON_START.test(data) && JSON_END.test(data)`为`true`，那么AngularJS就会试图把response data当作JSON来parse。可是这两条正则表达式弱到你可以分分钟想到一个满足条件的值：


    > JSON_START.test('[a}') && JSON_END.test('[a}')
    < true

老师们，你确定这两条正则表达式不是在逗我？

找到root cause，我们再来看下导火索是啥。提示，我们的response data是markdown文档，你能构造出一个让AngularJS误以为是JSON的文档吗？

这里我就不卖关子了。我们的用户写的文档，是类似于这样的：


    [link](some links...)

    Function bar definition:

    function bar() {
      if (a > b) {
        foo();
      }
    }
    

这是一种典型的API文档。这年头无论是technical writer都开始追求文档书写的轻便化，无论是开源项目（比如AngularJS自己）还是MSDN的一些API文档都开始使用Markdown来书写。

于是我被爆了，华丽丽地，连肥皂都没捡。

##那什么时候这个Bug会被修掉呢？
发现问题后我给AngularJS开了一个[issue](https://github.com/angular/angular.js/issues/10349)，他们很快确认了这个bug。我建议能不能把这条非常弱的RegEx去掉，或者是实现像Jquery一样的Intelligence。

他们表示，remove掉是肯定不可能的，由于他们从一开始就有这段代码，一些`non-well-behaving`的backend可能偷懒不添加`content-type`，把这段remove掉，这些用户一更新AngularJS就挂掉了，这种属于breaking change，只能等到1.4这样的大版本更新。而现在的code base里这个黑科技出现在很多地方，没法简单地修改，所以一时半会儿也没法引入类似Jquery的智能监测。

现在这个[issue](https://github.com/angular/angular.js/issues/10349)被放入了`1.4 candidate`中，最终能不能在1.4修复，大家可以继续关注这个issue。NG team的不同成员对这个问题怎么修好像有不同的看法，截至作者发博客，他们已经快要打起来了。

当然，他们对于`[a}`这样的string都能被认为是JSON自己都受不了，于是他们发了一个[pull request](https://github.com/angular/angular.js/blob/master/src/ng/http.js)，保证opening/closing brackets是一样的。我觉得吧，这是条不归路。

##如果AngularJS还没修，我们该怎么workaround呢
AngularJS 1.2正式release和1.3release之间隔了11一个月，如果我们傻傻分不清再等个11个月，早就被老板爆了。不过还好还是有一个比较clean的方式避开这个bug，你只需要在$http的request中显式地申明response content-type，就像这样


    $http.get(url,{responseType:'byteArray'}).then(function(response) { ... } ;


当然，你是没法从官方文档看到这个奇淫巧计的，他们只是告诉你这里可以填responseType，类型是string，具体参考MDN，[点这里](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType)。

看来我只能把他们吵架的故事告诉我的老板，希望他不要嫌我这个bug fix的太dirty。

--------
分割线。周四live site被爆了一天，没想到礼拜五我又被爆了，这一次，我被Angular-ui某个库的一个特别stupid的bug玩地死去活来。不过我现在要去打扫了，下次再来和大家讲故事。当然，你可以Donate(ripple: [rf25Qv2Y3wbBYBgkXTmHMFeq1kGc6hVaXc](https://rippletrade.com/#/send?to=rf25Qv2Y3wbBYBgkXTmHMFeq1kGc6hVaXc), btc: [19yAgh8uDZJNaeVQmh7iiuzE8Y7amkx8St](bitcoin:19yAgh8uDZJNaeVQmh7iiuzE8Y7amkx8St))助我一臂之力，早日买到扫地机器人，把省下的时间写博客(陪妹子)。
