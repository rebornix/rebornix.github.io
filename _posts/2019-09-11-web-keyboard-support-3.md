---
layout: post
title: Web 应用快捷键支持（三）：VS Code 快捷键服务的实现
category: vscode
status: publish
published: true
type: post
tags: Web, Keyboard
keywords:
  - Web
  - Keyboard
  - Keybindings
---


这篇文章是系列文章《Web 应用快捷键支持》的第三篇。前两篇文章中介绍了如何正确处理浏览器 Keyboard Event。今天我们一起来看看，如何把正确解析的键盘事件，映射到对应的命令上。

- Web 应用快捷键支持
  - [（一）正确处理 Keyboard Event](https://rebornix.com/vscode/2019/08/11/web-keyboard-support/)
  - [（二）code/key 的缺点和 Node Native Keymap](https://rebornix.com/vscode/2019/08/25/web-keyboard-support-2/)
  - [（三）VS Code 快捷键服务的实现](https://rebornix.com/vscode/2019/09/11/web-keyboard-support-3/)

---

在 VS Code 中，用户有两种方式自定义快捷键。第一种是使用快捷键编辑器，也就是以图形化的方式修改快捷键到命令的绑定。第二种，也是 VS Code 从第一个版本就支持的方式，直接修改 JSON 格式的快捷键定义。一个快捷键到命令的定义，以 JSON 形式的来表示是

```json
{
  "key": "cmd+/",
  "command": "editor.action.commentLine",
  "when": "editorTextFocus && !editorReadonly"
}
```

`when`语句里可以组合使用各种 context key ，来决定这个绑定什么时候生效。比如上面的例子里，当用户把光标放到编辑器里，同时编辑器里的文件不是只读的（readonly），那么按下 `cmd+/`就是把当前行的代码注释掉。

你可以简单的把 VS Code 的快捷键服务存储着上面这种 JSON 格式的快捷键绑定定义。同时，VS Code 在整个 container 上监听 keyboard event，对于每个 keyboard event，在快捷键服务里进行查询，如果能够找到对应的命令，则执行命令，然后 `preventDefault()`。相信你对此已经比较有经验了，不多加赘述。

## Key/Command lookup
一个应用程序里的快捷键最多也就上百个，所以数据结构基本不是问题，你只需要两个 Map .

```js
_keyToKeybindings: Map<string, Keybinding[]>;
_commandTokeybindings: Map<string, Keybinding[]>
```

第一个 Map 是从 Keybinding stringify 的结果到 Keybinding 本身的映射。比如

```json
“cmd+/”: [
	{
		command: “editor.action.commentLine”,
		when: “editorTextFocus && !editorReadonly”,
		...
	},
	{
		command: ...
	},
	...
}
```

第二个 Map 则是从 Command Id 到 Keybinding 本身

```json
“editor.action.commentLine”: {
	command: “editor.action.commentLine”,
	when: “editorTextFocus && !editorReadonly”,
	...
}
```

简单的 Map 就能够避免每次都进行暴力搜索了，而且在这几百个快捷键的 scale下，Map 足够好了。

同时你也注意到了，第一个 Map 的值是一个 Array。这是因为真实环境下，是会出现 conflicts。比如应用已经使用了一个快捷键组合，然后用户将这个快捷键组合绑定到了另一个命令上。而我们并不希望出现 data loss，所以我们需要将它们都储存起来，然后执行合适的命令。

那么当快捷键组合出现 conflict 的时候，我们怎么决定哪条命令呢？有两个方法，我们先看简单的一个。

## Ordering
最简单的方法就是给每个快捷键添加一个新的属性 order，用于排序。Order 值更高的就拥有更高的优先级。

VS Code 在使用了这个方法，不过是却是隐式的。VS Code 在启动时，会先注册默认的快捷键，接着是加载插件注册的快捷键，最后加载用户修改的快捷键。然后遵循后注册优先级更高的方式进行覆盖。所以，如果用户将 `cmd+/`绑定给了其他的命令，那么 Toggle Line Comment 就不会被执行了。

要注意的是，如果要显式的使用 order 属性，只能在内部进行使用，但是不能面向用户，否则就会像 CSS 中的 `z-index` 一样，仍然可能存在 conflict。

## When
第二种方法，就是给快捷键绑定加上限定条件。Toggle Line Comment 只能在编辑器中使用，那么当用户在使用其他模块时，`cmd+/`理当不被占用才对。应用可以定义好足够多同时通用的 context key，用于描述应用所处的状态，比如

* `editorTextFocus` 当前焦点在编辑器文本上
* `terminalFocus`当前焦点在终端上
* `listFocus`当前焦点在某个 list 上，比如 File Explorer，Search Result View

上面的 `listFocus`是一个通用的 context key，VS Code 中有非常多的 list，如果为每个 list 都指定一个 context key，然后绑定上同一套快捷键，那就太麻烦了。

### Context Key Expression
有了 context key，接下来就是看如何让用户自组合使用 context key 来精确的指定快捷键绑定。我们依然是由简入繁。

第一步就是只支持单个 boolean 类型的 context key。那么只需直接拿 `when`的值进行查询就行了。

第二步支持单个 string 或者 number 类型的 context key。这一步就需要对 `when`语句进行解析了，因为我们得在 `when`语句中使用诸如 `==`， `!=`， `>`， `<`等等操作符。

```
"editorLangId == typescript"
"resourceExtname != .js"
```

第三步，支持与操作 `&&`和 `||`。在解析这个两个操作符的同时，要注意优先级，通识是 `&&`要优先于 `||`。

有了上面这三步，我们就可以非常准确的描述各种使用场景了。比如 VS Code 的内置终端有一个搜索框，我们想改变*跳转到下一个搜索结果*命令的快捷键时，我们就可以使用如下的 `when`条件语句

```
"when": "terminalFocus && terminalFindWidgetFocus"
```

借助描述精确地 `when` 条件语句，已经可以大大避免 conflict。但是有的时候我们会找到多个快捷键绑定，它们的 `when`都为真，比如下面两个快捷键定义

```json
[
  {
    "command": "findNext",
    "key": "enter",
    "when": "terminalFocus && terminalFindWidgetFocus"
  },
  {
    "command": "insertNewLine",
    "key": "enter",
    "when": "terminalFocus"
  }
]
```

当用户在内置终端的搜索框里按下 `enter`时，`terminalFocus`和 `terminalFocus && terminalFindWidgetFocus`都为真，那么如何判断该执行哪个命令呢？

我们应该找出 scope 更小的 `when`条件。由于 `terminalFocus && terminalFindWidgetFocus`能够推导出 `terminalFocus`，但是 `terminalFocus`并不能推出`terminalFocus && terminalFindWidgetFocus`，所以 `enter`应该为 `findNext`。

完成这样的推导，你可能需要一点数理逻辑的[知识](https://en.wikipedia.org/wiki/De_Morgan%27s_laws)。

如果完成以上的推导后，如果匹配的快捷键绑定仍然超过一个，那么这就是正儿八经的 conflict 里，我们可以按照上文提到的 Ordering 方式，选择后注册的快捷键绑定执行对应的命令。

## 小结
这三篇文章介绍了浏览器 keyboard event 的正确处理和如何实现一套快捷键系统，并且支持用户自由地修改快捷键绑定。

文章里没有讨论的是，当用户按下快捷键，我们查询到对应的命令后，如何在正确的上下文中执行命令。比如上面的例子里，Keybinding Service 在接受到 `enter`事件后，找到了 `findNext`命令并且执行。那么 `findNext`命令是如何被初始化的，如何访问到当前的 terminal 里的内容，我们没有深入讨论。在 VS Code 中，每个命令都是 stateless 的，然后命令本身通过控制反转（注入和查找都有使用）来获取当前的上下文。

关于在 Web 应用中实现快捷键服务，你还有别的感兴趣的知识点但是本文没有提及的，欢迎给我留言 ;)
