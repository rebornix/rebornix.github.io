---
layout: post
title: Web 应用快捷键支持（一）：正确处理 Keyboard Event
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

这篇文章是系列文章《Web 应用快捷键支持》的第一篇。《Web 应用快捷键支持》将介绍 Web 应用中实现快捷键支持面临的 Web 标准的问题，以及 VS Code 中如何处理快捷键国际化以及快捷键服务的实现方法。

- Web 应用快捷键支持
  - （一）正确处理 Keyboard Event
  - （二）scanCode/key 的缺点和 Node Native Keymap
  - （三）VS Code 快捷键服务的实现

---

转眼 2019 年已经过去了一半，Electron 和 PWA 之间的竞争可以说是逐渐激烈起来了。一方面随着微软的大力投资，以及和社区的每半年一次的 private meetup/conference， Electron 在稳定上已经上了好几个台阶了。而发布周期上，Electron 团队更是在 Chrome 76 发布的同一天，发布了携带了与 Chrome 76 相同的版本的 Chromium 的 Electron 6。而说到 PWA （Progressive Web App），谷歌和微软一直以来都是最大的推动者，随着 Edge 转投了 Chromium 阵营，将 PWA 落地替代传统桌面应用则更具有实际意义。

不管哪个技术最后能成为赢家，我们在桌面端见到更多的基于 Web 技术的应用几乎是板上钉钉了。但是，要想在 Web 应用里实现一套跟传统桌面应用一致的快捷键体验，是比较有挑战的，几乎没有什么应用能够实现完美的快捷键支持（包括 VS Code ;( ）。这个锅并不能由应用开发者来背，Web 标准的不完整以及不完善的更新才是始作俑者。

## Keyboard Event

要实现快捷键支持，第一步要做的就是监听键盘事件并且合适地进行截断。当用户按下某几个键之后，浏览器会发送 `keydown`, `keypress` 和 `keyup` 等事件。`keypress`只有在按下的键能够生成字符时才会触发，比如你在键盘上按下 Shift 键时，并不会触发 `keypress` 事件。而且 `keypress` 已经被从标准里移除了，所以正确的做法就是只处理 `keydown` 和 `keyup`  事件。至于这两个事件该使用哪一个，完全取决于应用决定什么时候触发快捷键的执行。VS Code 中使用的是 `keydown`。

一个 `keydown` 事件会携带以下主要信息（例子中我在 US 标准键盘上按下 `ctrl+/`）：

```json
{
  keyCode: 191,
  shift: false,
  ctrl: true,
  alt: false,
  meta: false,
  key: ‘/’,
  code: ‘Slash’
}
```

Keyboard Event 中还包含了 charCode、which、keyIdentifier 等等，它们都已经被从标准移除，而且问题不少。Monaco Editor（VS Code 中的核心编辑器）在就是通过 `keyCode` 和 Modifiers (shift, alt, ctrl 和 meta) 来进行快捷键的设置和分发，这也是现在比较流行/主流的做法。

比如在上面的例子里，Monaco 在启动时，注册了快捷键命令 Toggle Line Comment ，并且指定了快捷键为 `Ctrl+/`。在 US 标准键盘上，`/`对应的 keyCode 就是 191，那么这个命令的快捷键可以被简单的记录为

```json
{
  keyCode: 191,
  ctrl: true,
  alt: false,
  shift: false,
  meta: false
}
```

那么当用户按下 `Ctrl+/`时，我们只要拿着这个事件对着所有的命令一一比对，就可以找到 Toggle Line Comment 这个命令了。接下来就可以使用 `event.preventDefault()`来截断这个事件，并且处理命令本身了。

## keyCode 有什么问题吗 ？

如果 keyCode 很完美的话，这篇文章就可以到此为止了，就像打平即可出线一样，当然是不可能的。

首先我们来了解 keyCode 的定义 [w3c](https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html) 。如果对看定义没兴趣的话，可以直接看后面的例子。

> The keyCode for keydown / keyup events is calculated as follows:
>
> 	1	Read the virtual key code from the operating system's event information, if such information is available.
>
> 	2	If an Input Method Editor is processing key input and the event is keydown, return 229.
>
> 	3	If input key when pressed without modifiers would insert a numerical character (0-9), return the ASCII code of that numerical character.
>
> 	4	If input key when pressed without modifiers would insert a a lower case character in the a-z alphabetical range, return the ASCII code of the upper case equivalent.
>
> 	5	If the implementation supports a key code conversion table for the operating system and platform, look up the value. If the conversion table specifies an alternate virtual key value for the given input, return the specified value.
>
> 	6	If the key's function, as determined in an implementation-specific way, corresponds to one of the keys in the ~table of fixed virtual key codes~, return the corresponding key code.
>
> 	7	Return the virtual key code from the operating system.
>
> 	8	If no key code was found, return 0.

如果你拿上面这八条定义跟 Google 上搜索 `keyCode`得到的各种结果进行比对的话，你会发现，大部分内容都只描述了 `3` 和 `4`

> 如果你按下的键能够生成 0-9 数字，或者 a-zA-Z 字母的话，返回数字或者字母所对应的 ASCII 值

就这两个规则而言，无论你使用的什么键盘，什么操作系统，都应该是没有歧义的。但是剩下的几条问题可就多了

> 2.  如果输入法正在处理键盘输入时，返回 229

不是每个浏览器都这么做，不过这个问题到是不大，因为当输入法正在处理输入时，我们一般会把控制权完全交给浏览器

> 5. 如果浏览器有一个系统事件到 keyCode 的查询表的话，就从表里面读取
> 6. 如果按下的键的功能 （由浏览器具体实现决定） 刚好与固定 Virtual Key Code 表格中的某条相同的话，就使用这一条所对应的 keyCode

已经开始鸡同鸭讲了，keyCode 怎么生成，这两条完全由浏览器实现决定。

> 7. 返回操作系统提供的 virtual key code

关于操作系统提供的 virtual key code ，Windows 是有非常明确的[定义](https://docs.microsoft.com/en-us/windows/win32/inputdev/about-keyboard-input)的。 可惜的是，macOS 和 Linux 上我没有找到具体的文档。

看到这里你可能已经感觉到问题出在哪里了，以及为什么 w3c 已经将 keyCode **从标准里移除**了。它的值仅在有限情况下是 OS independent 且 Browser independent 的（ASCII），其他情况下全看系统或者浏览器是怎么实现的。

来个实际的例子来解释一下 keyCode 的不可预知性。我们将分别在 Windows / macOS，US / 德语键盘上按下 `Y`，`Z`，`7`，`Shift+7` 。选这几个键的原因是，US 和德语键盘上这几个键的位置和作用是不同的。

当我们在操作系统上添加德语输入法，切换到德语输入后，可以查看当前的键盘布局：

![German keyboard layout](https://user-images.githubusercontent.com/876920/62841557-807af400-bc5e-11e9-98d3-39624ef0066f.png)

你可以拿上图和你电脑上的物理键盘布局比较。你会发现

* `Z` 和 `Y` 的位置变了
* 德语键盘上没有 `/`。而要打出这个键的话，需要按下 `shift+7`

按下这几个键的结果如下

<table>
  <tr>
    <td>物理按键</td>
    <td>US 键盘布局 Windows</td>
    <td>US 键盘布局 macOS</td>
    <td>德语键盘布局 Windows</td>
    <td>德语键盘布局 macOS</td>
  </tr>
  <tr>
    <td><kbd>Y</kbd></td>
    <td><pre>shift: false<br/>keyCode: 89</pre></td>
    <td><pre>shift: false<br/>keyCode: 89</pre></td>
    <td><pre>shift: false<br/>keyCode: 90</pre></td>
    <td><pre>shift: false<br/>keyCode: 90</pre></td>
  </tr>
  <tr>
    <td><kbd>Z</kbd></td>
    <td><pre>shift: false<br/>keyCode: 90</pre></td>
    <td><pre>shift: false<br/>keyCode: 90</pre></td>
    <td><pre>shift: false<br/>keyCode: 89</pre></td>
    <td><pre>shift: false<br/>keyCode: 89</pre></td>
  </tr>
  <tr>
    <td><kbd>7</kbd></td>
    <td><pre>shift: false<br/>keyCode: 55</pre></td>
    <td><pre>shift: false<br/>keyCode: 55</pre></td>
    <td><pre>shift: false<br/>keyCode: 55</pre></td>
    <td><pre>shift: false<br/>keyCode: 55</pre></td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd>+<kbd>7</kbd></td>
    <td><pre>shift: true<br/>keyCode: 55</pre></td>
    <td><pre>shift: true<br/>keyCode: 55</pre></td>
    <td><pre>shift: true<br/>keyCode: 55</pre></td>
    <td><pre>shift: true<br/>keyCode: <b>191</b></pre></td>
  </tr>
</table>


首先前两排，你可以看出，无论是是是用 US 还是德语虚拟键盘，按下的键如果生成`Y`，那么 keyCode 就是 89，如果生成的是`Z`，那么 keyCode 就是 90。这个结果对应上面 keyCode 生成规则的 3。操作系统对结果也没影响。

如果按下了`7`，无论是哪个键盘上，keyCode 都是 55。

如果按下 `shift+7`，结果就开始变得奇怪了。首先，在 US 键盘上，keyCode 总是 55，也就是`7`的所对应的 ASCII 值，同时 shift 是 true。虽然 `shift+7`能够生成 `&`，但不满足条件 2 和 3，所以并不能使用 `&`的 ASCII 值。

而在德语键盘上，Windows 系统上，keyCode 55，shift 为 true，跟 US 保持一致。同样的，虽然德语键盘上，`shift+7`生成 `/`，但是不满足 2 和 3，所以 keyCode 依然按照`7`返回了 55。

可是 macOS 德语键盘给出的结果居然是

```json
{
    keyCode: 191,
    shift: true
}
```

这是上面的例子里，唯一一个不符合预期的。同时 191 是 `/`所对应的 keyCode，由于 shift 仍然是 true，这个结果跟 US 键盘上，按下 `shift+/`生成的事件是一样的。

这样的害群之马还有很多，导致如果你只看 keyCode 和 modifiers，你根本不知道用户真正按下的是什么键，也就别说进行快捷键的处理了。

文章最开始提到的 Toggle Line Comment 命令，在 VS Code / Monaco 中，我们给 macOS 预设的快捷键是 `Ctrl+/` 。在 US 键盘上按下 Ctrl 和`/`就行了。但是在德语键盘上，因为没有`/`键，用户的直觉会是用`shift+7`代替`/`。也就是说用户会按下`ctrl+shift+7`。

但是我们在 macOS 得到的 Keyboard Event 是

```json
{
  keyCode: 191,
  shift: true,
  ctrl: true,
  alt: false,
  meta: false,
  key: ‘/’,
  code: ‘Digit7’
}
```

我们既可以把它理解为 `ctrl+shift+/`，也可以理解为 `ctrl+/`。请允许我说一句 what the ...

## w3c 的替代方案

w3c 将 keyCode 从标准移除了，这个我们要举双手赞成，因为 keyCode 是有歧义的。用来替代 keyCode 将是两个属性，key 和 code。key 是用于表示按下这几个键将会生成的字符，而 code 则是代表用户在键盘上按下了哪个物理键。前者只关心用户看到的什么，后者只与物理键盘有关，相当于将 keyCode 拆分开了。

比如在 macOS 德语键盘上按下 Ctrl+Shift+7 时

```json
{
  keyCode: 191,
  shift: true,
  ctrl: true,
  alt: false,
  meta: false,
  key: ‘/’,
  code: ‘Digit7’
}
```

key 是 `/`，因为 `shift+7` 能够打出`/`。而 code 则是 `Digit7`，说明用户按下了`7`这个键，结合`shift`和`ctrl`，我们就知道用户同时按下了`ctrl+shift+7`。

那么通过使用 key 和 code，能够完美实现一套快捷键服务吗？答案是不能。而 key/code 属性存在的问题，以及 VS Code 中我们是如何解决这些问题的，我们下一篇文章继续聊。
