---
layout: post
title: Web 性能优化、文档及代码编辑器相关的新提案
category: Work
status: publish
published: true
type: post
keywords:
  - Web
  - Editor
  - 提案
  - 性能优化
  - 文档
  - Google Docs
  - VS Code
  - Monaco
  - 语雀
---

作为使用 Web 技术的代码编辑器从业者，关注 Web 平台的各种新提案是工作的一部分。随着 Monaco Editor 被很多服务使用，我也开始收到各个新提案的发起者的邀请，对他们的提案提供反馈。其中一些提案跟编辑器开发效率和性能优化息息相关，但还处于非常早期的阶段，十分有潜力，所以我觉得值得分享出来，这样大家有机会可以参与到这些提案的设计讨论中。

首先，这篇文章的适用人群

* Web 文档和开发工具从业者。这里我还是举几个例子帮助理解
	* 你们的产品类似于 Office Online, Google Docs, 石墨, 语雀, Notion 等等
	* 你们的产品类似于 Monaco Editor, CodeMirror, Ace 等等
* 对 Web 平台**性能优化**感兴趣或者有需求的同
* 对 Web 平台技术和标准非常感兴趣的同学

好了，废话少说。本文要介绍的提案包含以下几个：

* Keyboard Map
* Edit Context
* Highlight API
* Virtual Scroller
* Display Locking

---

## Keyboard Map

提案：[Keyboard Map](https://github.com/WICG/keyboard-map)

首先要介绍的提案 Keyboard Map，其实在我前面的几篇博客详细介绍过了 。如果你的产品的用户，使用非 US 标准键盘的话，请务必详细阅读下面这个系列的文章。

- Web 应用快捷键支持
  + [（一）正确处理 Keyboard Event](https://rebornix.com/vscode/2019/08/11/web-keyboard-support/)
  + [（二）code/key 的缺点和 Node Native Keymap](https://rebornix.com/vscode/2019/08/25/web-keyboard-support-2/)

简言之，在不同的标准的键盘上，按下同一个物理键时输入到系统中的字符可能是不同的。比如在 US 标准键盘上，Shift 旁边的键是 Z，而在德语键盘上则是 Y。

这个提案，就是为大家提供一个物理键和字符之间的映射关系，至于它能解决什么问题嘛，还请阅读上面的系列文章，抱歉，五百字可能都解释不完。

## Edit Context

提案：[EditContext API - WICG](https://discourse.wicg.io/t/proposal-editcontext-api/3656)

第二个要介绍的提案，来自微软的 Edge 团队。当我看到这个提案的时候，我是非常激动的，因为它就是为 Web 平台文档和代码编辑器设计的。

Web 平台要做一个文档或者代码编辑器，光靠 Textarea 和 Input 是肯定不行的，要实现文字多样式、快捷键支持、文档虚拟化渲染，大家一般会使用下面两种方案

* 一个隐形的 textarea
* ContentEditable

第一个方案，通过创建一个隐形的 textaea，监听发生在这个上面的所有事件，比如 `Input`， `keyDown`等等，然后再将输入的内容按照格式渲染在页面中。也就是说，textarea 监听事件，而用户看到的内容都是虚拟渲染出来的。

这种方案的工作量其实是非常大的，因为连 cursor 和 selection 都是自己渲染的。而且这也意味着，在触摸屏上，基本上没法通过手指选择文字。

而 ContentEditable 这个 API 的推出就是为了更方便的实现 WYSIWYG 编辑器的 API，但是 ContentEditable 早年的 bug 实在是太多了，大家在 textarea 这个方案上走的非常远了。现在 ContentEditable 成熟度好多了，但它有几个局限

* ContentEditable 本质上是把 View 当作 single source of truth，它接受用户输入，直接更新渲染。接着我们需要从 View 中检测出变动的内容和格式，最后更新 Model。
	* 当然也是可以在 ContentEditable 截断各种 event 的，但那就跟 textaea 没区别了。
* 用户跟 ContentEditable 的交互不能被打断。如果用户在输入时（比如说有 IME），这时候有其他对象更新了 ContentEditable 对象，那么用户的输入就会打断。对于强调 Collobration 的文档系统，这是不可以接受的。

EditContext 这个提案，解决方案是将用户输入这系列 API 独立出来，应用只需通过 EditContext 这个新的接口来接收用户的输入。换成大白话来说

* 你可以把 EditContext 当成一个隐藏的 textarea 那样去监听各种事件
* 你可以往 EditContext 中塞入当前光标附近的上下文，这样系统能够提供 Spell Check，Suggestion，Accessibility 等功能。
* 你可以利用 EditContext，告诉系统，你觉得当前光标应该在哪里，这样当用户使用输入法、调用 Emoji 输入框、调用字典时，系统就知道在哪里渲染对话框了。
* EditContext 是直接跟底层的输入 API 通讯的，不受页面增量渲染的影响。


这个提案看起来还是很有潜力的，如果最终的实现能够提升触屏上的使用体验，以及提升 Accessibility 的话，那是很值得一试的。

## Highlight API

提案：[MSEdgeExplainers/highlight](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/highlight/explainer.md)

Edge 团队另外一个有趣的提案就是 Highlight API。这个更好理解了，你可以异步地通知浏览器调整某段 DOM 节点的样式。

现在大家的做法都是在生成 HTML 的时候，就直接带上了样式信息（inline 或者通过 CSS）。Highlight API 将这个过程异步化，既简化了结构，又让渲染变的更加可控。理论上，Highlight API 的性能能更好些，也更干净。

---

如果说上面的提案跟编辑器强相关，下面的这两个提案就相对更通用了，对于大部分 Web 应用的性能优化都有潜在价值。

通常来说，页面中 DOM 结构越复杂、节点越多，给浏览器渲染带来的挑战就越大。解决这个问题的一个主要方法，就是把用户暂时看不到的内容暂时不塞入 DOM 中。Problem Solved。

这么做优化了性能，但是带来的体验上的问题却不小：

1. 当用户需要滚动页面时，将要看到的内容还未加载到页面中。我们需要在此处截断，提前把用户将要看到的内容塞入页面中。
2. 滚动条比例不正确。我们需要自行渲染滚动条，以展示当前页面在全部内容中所占的比重。
3. 浏览器默认的搜索框无法搜索全部内容。我们需要实现额外的搜索组件。

前两个难题，一般来说，只要你是使用主流的框架来开发项目的，基本坑都已经被填好了，按照 “框架名 virtual list ” 进行搜索就能找到答案。解决方案一般都是

* 在 model 和 view 之间，增加一个 view model，根据 container 和 list item 的大小，决定 view 中需要熏染的 list item 的数量。
* 监听 scroll event，在 scroll 发生前，将下一个 page 塞入到 view 中。
* 最后，非常重要，通过 `will-change` 或者 `translateZ`通知浏览器将 view 在新的 layer 中进行渲染。

完成上面的方案，对算法功底和浏览器渲染机制都是有一定的要求，而且每个框架，都可能需要一个自己的 virtual list。

而下面这个提案，就是要救大家于水火。

## Virtual Scroller

提案：[virtual scroller](https://github.com/WICG/virtual-scroller)


顾名思义，就是提供一个实现 virtual list 的内置方案，你负责塞数据，我负责渲染，而且尽可能保证只渲染用户需要看到的。语法也很直观：

```
<virtual-scroller id='scroller'>
  <div>Item 1</div>
  <div>Item 2</div>
  ...
  <div>Item 1000</div>
</virtual-scroller>
```

一个新语法，解决三大问题，不需要用户根据滚动加载数据，滚动条比例正确，浏览器也能正确搜索。不要问有什么潜在问题，问就是银弹。

当然我们知道，哪怕 virtual scroller 真的可以做到按需渲染，但我们也不能真的把内容全部都塞到 DOM 中。比如你打开一个文件，一百万行代码，如果全塞进去，再牛的引擎也不行。因此 virtual scroller 也是允许你自行做 paging 的，它会根据滚动的情况释放 rangechange 事件，让你有机会往里面塞入更多的内容。

到这里，哪怕你对实现一个虚拟化的 list 组件没什么概念，你肯定也意识到了，无论是土方法还是 virtual scroller ，万变不离其宗，都是减少渲染开销嘛。既然目标这么明确，那么干脆就对阵下药好了，Chrome 团队又提出了一个相对更底层的 API：Display Locking，让你直接控制渲染。

## Display Locking
提案：[Display Locking](https://github.com/WICG/display-locking)

一句话，将部分 DOM 节点锁定，让它跳过 rendering 这个环节，等到需要的时候再进行 render。

有了这个 API，上面的 Virtual Scoller 是不是实现起来也很简单？我们把所有 list item 都加载到 DOM 中，但是 lock 住用户看不到的部分。然后在 idle 或者用户滚动的时候，增量地渲染。

Virtual Scoller 抽象程度更高，解决的是 list view 这一类型的问题，而 Display Locking 这样底层的 API，你几乎可以用在任何地方。

---

# 小结

以上这五个提案，只是抛砖引玉，大家可以在 WICG 这个 github organization 里查看各种新提案，每个都有自己要解决问题。如果它们刚好跟你们的业务相关，不妨参与到提案的讨论中。
