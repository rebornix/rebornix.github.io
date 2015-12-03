--- 
layout: post
title: 理解Angular Nested Scope 的关键：Prototype Chain
category: Frontend
status: publish 
published: true
type: post
tags: 
- 

---
#一个人人都要踩的坑
Angular容易上手的一个重要原因就是data binding非常简单，当你在controller里面给scope绑定上一个object，立刻就能在view中show出来，而且也能够非常轻松地实现two way binding。生活十分愉快。

但突然有一天，不知道从加了哪一行代码开始，two way binding不工作了。你翻箱倒柜把书从头翻到尾，到SO上求爷爷告奶奶，最终你发现，你遇到了一个名叫`nested scope`的问题。

#这个坑长什么样
我们来举一个不能再简单的栗子，童鞋们可以到[这里](http://plnkr.co/edit/zOtVDpNPP8XpaDhYkNnE)看demo。首先我们有个html页面充当view

    <body ng-controller="MainCtrl">
      <p>Hello {{name}}!</p>
      <input ng-model="name">
      <div ng-if="includeForm">
        <input ng-model="name">
      </div>
    </body>

接着咱们有段javascript

    var app = angular.module('plunker', []);
    app.controller('MainCtrl', function($scope) {
      $scope.name = 'World';
      $scope.includeForm = true;
    });

很容易看出，我们这个 angular app，其实就是把 `$scope.name` 绑定到 `p` 和两个 `input` element 上。初始化后，页面是这样的，初始值都是 world

![一切都在掌控之中](https://dn-rebornix.qbox.me/nestedscope-1.png)

然后我们在第一个 input box 里面将文字改成 kitty
![完美！](https://dn-rebornix.qbox.me/nestedscope-2.png)

接下来属于高危动作，睁大你的双眼：修改第二个 input box 里的 text，把它改成 peng 。惊人的是，Title 和 第一个 input 里的 kitty 并未随之改变。
![发生了什么...](https://dn-rebornix.qbox.me/nestedscope-3.png)

最后就是见证奇迹的时刻，修改第一个 input box 的值，改回成 world，Title 立刻随着一起改变，但第二个 input box 像是与这个世界失去了联系。

![已经彻底被玩坏](https://dn-rebornix.qbox.me/nestedscope-4.png)

在分析上面的 case 中 到底发生了什么之前，我们一起回顾一下 JavaScript 的基础知识 [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)。JS 高玩自行跳过这个章节 :)

#什么是prototype 
我们知道在 C++/Java/C# 这样的面向对象编程语言中，我们可以使用继承（inheritance）来实现属性和方法的共享，减少冗余代码的书写。

JavaScript 也支持继承，但是它并没有类的概念，而是使用 prototype 来实现这一目标。JavaScript 中的每个对象都有一个内部私有的链接指向另一个对象，这个对象就是原对象的原型(prototype)。这个原型对象也有自己的原型，直到对象的原型为 null 为止（也就是没有原型）。这种一级一级的链结构就称为原型链。

拥有了继承之后，JavaScript 的 Object 就拥有了两种属性，一种是对象自身的属性，另外一种是继承于原型链上的属性。当我们去读取 Object 的某个属性时，首先查看当前 Object 是否拥有该属性，有的话返回值，如果没有的话，找到它的 prototype，看看这个对象上是否有有该属性。JavaScript 会顺着 prototype chain 一路上去，直到找到这个属性活着 prototype chain 到头为止。

关于 prototype 更加详细和通透的解释，大家可以参考 [这篇文章](https://github.com/norfish/blog/blob/master/prototype.md) 和 ruanyf 老师的[大作](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)，我高中语文老是不及格，就不给大家添麻烦了。我就带大家来看个小小的栗子。第一步，我们创建一个 object，就叫它爹吧。
    
    > parent = { "first_name": "Peng"}
    < Object {first_name: "Peng"}

爹有一个属性叫做 first_name，值为 Peng。接着我们生一个儿子，

    > child = Object.create(parent)

[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 这个函数会创建一个新的 Object 并将新Object 的 prototype 指定为 传入的参数。比如这里，我们传入的参数是 parent，那么 child 的prototype 就是 parent，child 会从 parent 这里继承属性。比如：

    > child.first_name
    < "Peng"

child 上本身并没有 first_name 这个属性，但是他爹有，于是依然得到了 Peng 这个值。到这里为止，我们展示了如何从 prototype 上继承一个 primitive value 。继承 object property 也是一样的。

    > parent = { "name" : { "first": "peng", "last": "lv"}}
    > child = Object.create(parent)
    > child.name.first
    < "peng"

童鞋们可以在浏览器的 console 里面玩一下
![没图我说个球啊](https://dn-rebornix.qbox.me/nestedscope-5.png)

到这里，即使是从没听说过 prototype 的朋友肯定也明白了，这不就是老鼠的儿子会打洞么。但是关于 prototype 的继承，我想把 MDN 文档里的一句话高亮出来

>Setting a property to an object creates an own property. The only exception to the getting and setting behavior rules is when there is an inherited property with a [getter or a setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Defining_getters_and_setters).

最重要的就是第一句了，**Setting a property to an object creates an own property**。当我们去 get property 的时候，会顺着 prototype chain 一直往上找，但是 set property 并不会这样，而是为当前对象生成一个新的 property 。比如这样：

![右手 左手 不是慢动作重播！](https://dn-rebornix.qbox.me/nestedscope-6.png)

自此 child 和 parent 就失联了。下面我们可以来看看 Angular 的 nested scope 是怎么一回事。

#Angular 如何创建child scope
在使用 Angular 的一些 built-in directive 时，比如 ng-if/ng-include/ng-repeat/ng-switch/etc 时，需要注意的一点是，Angular 会为其生成一个新的 scope，这个 scope 继承自 外层的 scope。回到我们最上面提到的 demo

    <body ng-controller="MainCtrl">
      <p>Hello {{name}}!</p>
      <input ng-model="name">
      <div ng-if="includeForm">
        <input ng-model="name">
      </div>
    </body>

`MainCtrl` 上有一个 scope 作为胶水来粘合 controller 和 view，而`ng-if` 又会生成一个 scope，这个 scope 向上继承 controller 的 scope。这个继承 Angular 是如何实现的呢，我们来看[源码](
https://github.com/angular/angular.js/blob/291d7c467fba51a9cb89cbeee62202d51fe64b09/src/ng/rootScope.js#L83-L95)

    function createChildScopeClass(parent) {
      function ChildScope() {
        this.$$watchers = this.$$nextSibling =
            this.$$childHead = this.$$childTail = null;
        this.$$listeners = {};
        this.$$listenerCount = {};
        this.$$watchersCount = 0;
        this.$id = nextUid();
        this.$$ChildScope = null;
      }
      ChildScope.prototype = parent;
      return ChildScope;
    }

我们看到，创建 child scope 的时候，会把 child scope 的 prototype (原型) 设置为 parent 。根据我们上面刚刚温习的 prototype 继承机制，当在第二个 input box 里访问 `ng-model="name"` 时，会先到 ng-if 上的 child scope 寻找 name 这个属性，如果没有，沿着 prototype 找到 parent scope，最终找到 `name` 这个属性。

而当我们往第二个 input box 里面输入新的值（见 第三张图片），则触发了 prototype 的另一个规则 **Setting a property to an object creates an own property** , ng-if 上的 child scope 增加了一个新的属性 name ，parent scope 上的 name 和 child scope 的 name 从此再无瓜葛。当我们再次修改 第一个 input box 里的值时，实际上我们修改的 parent scope 上的 name ，对于 第二个 input box 来说，并没有什么卵用。

![鸟都不鸟你啊](https://dn-rebornix.qbox.me/nestedscope-4.png)

问题到这里已经清楚了，Angular 的 nested scope 使用了 prototype 这个机制来实现 child scope 对 parent scope 的继承，当我们修改 child scope 上的属性时，会导致无法更新 parent scope 的属性。那么该如何解救它们呢？

有两招

# Dot Notation 和 $parent

## 第一招，江湖人称 Dot Notation

换做人能够听懂的语言就是，避免给 child scope 上的属性赋值。还记得上文我们讲解 prototype chain 的时候说过，属性是 object 也可以继承

    > parent = { "name" : { "first": "peng", "last": "lv"}}
    > child = Object.create(parent)
    > child.name.first ＝ "hulk"
    < "hulk"
    > parent.name
    < Object {first: "hulk", last: "lv"}

parent 有个属性叫 name，name 有个属性叫 first 。如果我们修改 child.name.first ，第一步是查找 child 上的 name 属性，没有找到，根据 prototype chain 找到了 parent 上的 name 属性，然后修改了它的 property `first` 。整个过程并没有给 child 的 property `name` 赋值。

当然，如果你直接修改 `child.name`，name 的继承就消失了。

    > child.name = {"first": "captain", last: "america"}
    < Object {first: "captain", last: "america"}
    > parent.name
    < Object {first: "hulk", last: "lv"}

Dot Notation，这个名字真的是传神啊，修改和访问 $scope上属性的属性（$scope.name.first），而不是直接操作 $scope的属性（$scope.name），多一个 Dot ，就解决了 two way binding 的坑。

##第二招，见招拆招，使用$parent。
不是担心修改 child scope 上的属性么，直接访问 parent scope 上的属性不就行了么。我们再来看 Angular 的[代码](https://github.com/angular/angular.js/blob/291d7c467fba51a9cb89cbeee62202d51fe64b09/src/ng/rootScope.js#L231)

    child.$parent = parent;

child scope 直接有个 $parent 属性来 reference parent scope。

    <body ng-controller="MainCtrl">
      <p>Hello {{name}}!</p>
      <input ng-model="name">
      <div ng-if="includeForm">
        <input ng-model="$parent.name">
      </div>
    </body>

这个方法过于暴力，博主不推荐使用，被同事爆的风险太高了。

---
每篇文章的最后总该总结点什么，不能虎头蛇尾....

想到了！以上问题只在 Angular 1.x 出现，因为2.0开始就没有 scope 咯～
