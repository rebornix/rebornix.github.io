---
layout: post
title: 从 mCast 聊聊声明式 UI（Vue.js 与 SwiftUI）和原型构建效率
category: Swift
status: publish
published: true
type: post
tags: SwiftUI, Vue
keywords:
  - Swift
  - SwiftUI
  - Vue
  - Prototype
  - iOS
  - macOS
  - cocoa
---

作为玩票性质的 Vue.js 用户和 iOS/macOS 开发，这个标题对于我来说，写起来本来是没有多少底气的。不过半年前我花了点业余时间和朋友写了个 macOS 的播客客户端 [‎mCast](https://apps.apple.com/us/app/mcast/id1462802606?ls=1&mt=12) ，获得了一些第一手的感悟，故此写篇文章聊聊我的想法。

先说结论，声明式 UI 及配套的现代工具链（Hot Reload，Live Editing）能够大幅提高原型构建的效率，而且对经验不丰富的开发者尤为明显。

我们先不妨看看 mCast 的设计、原型和最终实现的过程。


## 设计

 [‎mCast](https://apps.apple.com/us/app/mcast/id1462802606?ls=1&mt=12)  并不是要做一个全尺寸的桌面端播客客户端，它只是来自我几个简单的想法

* 一个 macOS menubar 应用，永远可以快速通过鼠标访问
* 类似于 iOS 的应用设计
* 核心功能就是：搜索、浏览热门，然后收听

第一点对于一个开了十几个应用窗口的人来说是刚需，第二点意味着这个应用就是个 Single Page App，第三点代表着这个应用不会去做播客下载等功能，因为在桌面平台上，我们假设网络是永远可达的。

有了这几个点子，这个应用该长什么样在脑海里就有个基本的概念了。接下来只需花个两分钟，把一个 iOS 播客应用的截图，放到 macOS menubar 上就行了

![PH3@1x](https://user-images.githubusercontent.com/876920/65824642-373c2f00-e221-11e9-89dd-46afcb8e0c51.png)

对于首页而言，这个可以说就是设计稿了。我们觉得它看起来还不错，像那么一回事。接下来就是写个原型，看看如果这个应用跑起来的话，是不是能够解决我们前面提到的那些痛点。

## 原型
既然是要写原型的话，一定是尽可能的使用廉价的方式。这里就不得不提我的情况，我并没有太多的设计经验，不具备专业的设计能力。

也就是说，这个页面里面，字体是多大，部件的大小、间距、阴影该是多少，我还没有一套科学的方案。这种情况下，要想知道怎么进行布局才最“悦目”，唯一的办法就是不断的试错。所以，在构建原型时，代码/UI 修改一定要尽可能的轻松和快速。

此外，原型设计工具如果能够尽可能接近我的 mental model，那就再好过了。

基于以上两点，我决定在 codesandbox 上，使用 Vue.js 来书写第一个原型。完成以下的效果，花了一小时不到。

<img width="887" alt="image" src="https://user-images.githubusercontent.com/876920/65824657-75395300-e221-11e9-8197-1677fc179acf.png">


核心模板代码也很简单

```html
<template>
  <div id="home">
    <input v-model="query" type="search" placeholder="Search or enter url" v-on:change="updateQuery" spellcheck="false" />
    <div class="filters">
      <div class="filter">
        ...
      </div>
      <div class="filter">
        ...
      </div>
      <div class="setting">
      </div>
    </div>
    <div class="results">
      <div class="result" v-for="user in podcasts" v-bind:key="user.id">
        <router-link
          :to="{ name: 'Podcast', params: { id: user.id, podcast: user } }"
          ><img class="artwork" :src="user.artwork" :title="user.title"
        /></router-link>
      </div>
    </div>
  </div>
</template>
```

Vue.js 的模版是非常直观的，一个 input，两个 filter，一个 button，和一个 list。借助 Hot Reload，我可以通过修改 CSS，实时地修改最终的渲染效果，找到最佳的图片大小和间距。

之后我只需创建一个 menubar app，在窗口中放一个 wkwebview，加载这个 codesandbox 页面即可。一个以假乱真的 mCast 原型就实现出来了。从想法，到这个原型的实现，一共也就个把小时。

## 实现
接下来要做的就是产品化了。这里我有两个不同的技术选型，第一个是继续使用 Web 技术，第二个是使用 Native 方案重写。尽管我对 Web 技术的掌握程度比较高，我最终还是选择了后者。因为 Web 方案潜在会带来体验上的损失（好比说毛玻璃背景效果），我情愿在开发过程中多花一些时间。

但事实上我低估了使用 Native 方案开发的时间成本，投入的大部分时间基本归于以下几类

* 没有 Hot Reload。我的 iOS/macOS 开发经验还不足以支持我光看代码就能够想象出它最终的呈现效果，导致的结果是我频繁的需要修改各类参数，然后等待编译部署然后在 Simulator 中看到结果。
* Layout。无论是在 Storyboard 中使用 Auto Layout，还是编程的方式调整布局，都远不如 CSS 书写来的直观。
* 代码过于冗余。本来就是非常简单的 List/Collection View，你依然得实现一套 UICollectionView data source 和 delegate，更别说如果要自定义 layout 了。（哪怕可以借助 IDE 的 code snippet 和 auto complete）
* 自定义 View 过于繁琐，无论是 xib 还是完全代码来实现。某次我忘记调整 xib 里 custom view 的 file owner，花了很长的时间才明白为啥 custom view 无法被创建。

mCast 一共就三个主要页面，但是使用 Web 技术实现一遍的时间，可能是最终 Native 方案的 1/10。当然，这一部分要归功于我对 Web 技术的熟练，但是 Vue/HTML 模版的表达能力，CSS 的布局，以及 Hot Reload 起了决定性的作用。

当然，能够使用 iPad Pro 随时随地书写 Vue，可能也是一个不大不小的原因。

## SwiftUI
苹果在 19 年 WWDC 上宣布了 SwiftUI，很快就成为了热门话题。虽然有不少类似于 “这不是 xyz 吗” 或者 “声明式 UI xyz 老早以前就支持了” 的论调，但作为成熟的工程师，我们应该关注的是 SwiftUI 实际解决的问题，以及苹果提供的一整套工具类和框架类库等基础设施对于现阶段的开发效率能有怎么样的影响。对此我的观察是

* 声明式 UI 加上界面预览，优于 Storyboard 和现有的纯代码构建方式。
* Hot Reload 保证代码更改可以被实时预览。大大利好 UI 的调优。
* 可以直接修改 UI ，SwiftUI 代码自动更新。类似于浏览器里的 Web Inspector。
* SwiftUI 是 platform agnostic ，不用关心底层是 AppKit 还是 UIKit

以上几点很好的解决了我在把 Vue.js 原型使用 Native 的痛点。于是我迫不及待地装上 Catalina Beta 和 Xcode 11 尝尝鲜，先看看实现首页的列表复杂度有多少。

不幸的是，SwiftUI 没有 Collection View。万幸的是我们可以用 List 来间接地实现同样的效果。代码大致如下

```swift
struct ContentView: View {
	  ...
    var body: some View {
        NavigationView {
            ScrollView (.vertical, showsIndicators: false) {
                VStack {
                    ForEach(0...1, id: \.self) { row in
                        HStack {
                            Spacer()
                            ForEach(0...3, id: \.self) { col in
                                BoxView(box: self.boxes[row * 3 + col]).padding(5)
                            }
                            Spacer()
                        }
                    }
                }
                Spacer()
            }.padding(10)
            .navigationBarTitle("mCast")
        }
}

struct BoxView: View {
    let box: Box

    var body: some View {
        ZStack {
            NavigationLink(destination: DetailedPodcastView(box: box) ) {
                Image("\(box.imageUrl)")
                    .resizable()
                    .cornerRadius(10)
                    .frame(width: 80, height: 80)
            }.buttonStyle(PlainButtonStyle())
        }
    }
}
```

写起来真的是太简单了，也很容易对 View 进行抽象封装。而实时预览和操作惊为天人

![mcast-swiftui](https://user-images.githubusercontent.com/876920/65824694-eaa52380-e221-11e9-8e43-322f6973417e.gif)

如果 SwiftUI 早出来一年的话，我一定会用它来完成原型到产品的全部书写。因为用 SwiftUI 进行想法的尝试，已经足够高效了。

## 小结

从时代的角度来说，苹果推出 SwiftUI 一点也不奇怪，甚至是必然的结果（当然这里我有“马后炮”的嫌疑）

* 声明式 UI 已经有了广泛的群众基础。WPF、React、Flutter 已经花了足够多的时间教育用户，而前端社区的爆发式增长也降低了推广难度。
* 为 iOS/macOS 跨平台提供基础。
* 无论是近些年流行的 Full Stack，还是苹果社区推崇的独立开发，再或是降低设计和开发之间协作鸿沟的需求，都在要求开发者能够完成一定的设计或者原型构建的工作。SwiftUI 无疑是一枚“银弹”。

现在是学习声明式 UI 的最佳时机，不能再晚了。不过如果要真的在生产环境使用 SwiftUI 的话，建议还是再等个半年。苹果向来是一流的设计（UI、语言、框架均是如此），二流的实现和工具链，现在就强行推 SwiftUI 的话，要踩的坑会比较多。在等待 SwiftUI 的同时，不妨学习一下 Swift 和响应式编程。
