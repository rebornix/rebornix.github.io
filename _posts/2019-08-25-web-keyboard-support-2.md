---
layout: post
title: Web 应用快捷键支持（二）：code/key 的缺点和 Node native keymap
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

这篇文章是系列文章《Web 应用快捷键支持》的第二篇。上一篇文章中介绍了处理快捷键常见的方式，以及 keyCode 潜在的问题。而 keyCode 已经被新的标准 code 和 key 取代了，这个新的标准能够解决问题吗？

- Web 应用快捷键支持
  - [（一）正确处理 Keyboard Event](https://rebornix.com/vscode/2019/08/11/web-keyboard-support/)
  - [（二）code/key 的缺点和 Node Native Keymap](https://rebornix.com/vscode/2019/08/25/web-keyboard-support-2/)
  - （三）VS Code 快捷键服务的实现

---

## code / key

还是先看看来 code 和 key 的定义吧。

> code holds a string that identifies the physical key being pressed. The value is not affected by the current keyboard layout or modifier state, so a particular key will always return the same value.

code 代表着用户按下的物理键，这个值不会因为用户所使用的键盘布局或者是否按下了 Modifier 影响。挺好。

> key holds a  [key attribute value](https://www.w3.org/TR/uievents-key/#key-attribute-value)  corresponding to the key pressed.
>
> A *key attribute value* is defined as being a string that contains one of the following:
> * A key string that corresponds to the character typed by the user, taking into account the user’s current locale setting, modifier state, and any system-level keyboard mapping overrides that are in effect.
> * A named key attribute value, as defined by the tables in this document …

大部分情况下，key 代表着用户按下某个键后生成的字符，这个字符会受用户的键盘布局、语言、是否按下了 Modifer以及系统级别的键盘映射等等。除此之外还有一些附加条件。

code 和 key 这两个属性，一个只关心物理按键，一个只关心最终的按键输出结果，比 keyCode 这样模棱两可的属性容易理解多了。不过它们能解决前一篇文章里的问题吗？

我们再回顾一下我们在德语键盘上遇到的快捷键处理的问题。在 macOS 德语键盘上按下 `ctrl+shift+7` 时，我们得到的 keyboard event 如下

```
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

用户按下 `ctrl+shift+7` 的目的是为了实现 `ctrl+/`。在不知道用户键盘布局类型的情况下，这个 keyboard event 能告诉我们的是

* 用户按下这几个键能够生成的字符是 `/`
* 在用户的键盘上，用户实际按下的物理键是 `ctrl`, `shift`和 `7`。

没了。而如果要推断出用户的目标是 `ctrl+/`，缺失的关键信息是 `shift+7`能够生成 `/`。

天下果然没有免费的午餐。不过问题还是要解决的，既然浏览器没有给我们提供充足的信息，我们就自己动手吧。

## Node native keymap
VS Code 基于 Electron ，它是一个 Web 应用没错，但同时它也是一个 Native 应用，我们是可以访问操作系统 API 的。我们写了一个 Node native module [GitHub - microsoft/node-native-keymap: Provide OS keyboard layout functionality as a nodejs module](https://github.com/microsoft/node-native-keymap)，完成以下工作：

* 检测当前的键盘布局类型
* 监听键盘布局变化
* 获取当前键盘布局下，按下每个键、以及不同的 Modifier 时，能够产生的字符。

通过使用这个模块，我们就能知道当前键盘是德语键盘，`shift+7`生成 `/`，`ctrl+7`生成的字符是 `7`。因此 `ctrl+shift+7`是可以被简化为 `ctrl+/`的。问题解决了。

## Web 环境
VS Code 快捷键的问题算是解决了，但这个方案的缺点就是必须要能够访问操作系统 API。对于纯粹的 Web 环境，这个是不可能的，我们只能想想办法 workaround 了。

首先，虽然不能够通过访问操作系统获取 `code + modifier <—> key`的映射关系，但是这个世界上流行的键盘布局毕竟还是有限的。我们可以在主流的键盘布局上运行 node-native-keymap，获取这些映射关系，将它们提前缓存。

而检测当前的键盘布局类型以及键盘布局变化，可以通过检测用户出发的 keyboard event 来实现。比如当用户在德语键盘里按下 `Y`，`code` 是 `KeyZ`而 `key`是`Y`，我们可以判断这不是标准键盘，然后我们可以通过第一步提前缓存的 `code + modifier <—> key` 映射里进行一一比对，找出最接近的键盘布局即可。

## Keyboard Map 提案
除了上面的这种穷人版键盘布局检测和监听方案以外，我们还可以借用 Chrome 提交的 Keyboard Map 提案，来优化这个步骤。Keyboard Map https://github.com/WICG/keyboard-map 提案的目标，可以理解为简化版的 Node native keymap，且看它的说明：

> Draft specification for an API that returns a mapping table from KeyboardEvent.code values into strings that can be shown to the user to identify that physical key.

Keyboard Map 将提供当前键盘布局下 `code` 和 `key` 之间的映射关系。这个 API 提供的信息如下

```js
navigator.keyboard.getLayoutMap().then(e=>{
  for(letkeyofe){
    console.log(key,e[key]);
  }
});

["KeyE","e"]
["KeyD","d"]
["Minus","-"]
["KeyH","h"]
["KeyZ","z"]
["Equal","="]
["KeyN","n"]
["KeyP","p"]
["BracketRight","]"]
["BracketLeft","["]
["Digit8","8"]
["Digit9","9"]
["KeyS","s"]
["Semicolon",";"]
["Digit5","5"]
["KeyQ","q"]
["KeyO","o"]
["Period","."]
["Digit6","6"]
["KeyV","v"]
...
```

与此同时，它还会在键盘布局发生变化时提供事件通知。在阅读完它的文档后，我发现使用它有两个大问题和两个小问题

* 首先，这个提案的出发点是游戏。
	* 它的目标是能够让游戏开发者，能够正确的显示快捷键，比如说，在标准键盘上你可以使用 WASD 来操作方向。在其他键盘布局上，你可能还是会使用这四个物理键，但是它们对应的字符变了。游戏开发者可以通过这个 API 获取到物理键与字符的映射。
	* 基于此，这个提案提供 `code` 和 `key` 之间的映射，不会考虑 Modifier。无论你是否按下 `shift/ctrl/alt`，都不会对结果有任何的影响。也就是说我们仍然需要使用 `node-native-keymap` 生成各种流行键盘布局的缓存。只不过 Keyboard Map API 能够提高我们匹配键盘布局的准确性，因为我们不再只使用 Keyboard Event 这样单一的信息了。
* 因为还只是提案，所以只能在 Chromium 上使用。
* 这个 API 提供的映射关系，还有一些 bug，也就是映射关系不准确。不过在我们提供 bug report 后，有些已经修复了。
* 监听键盘布局变化的这个 API 还没有实现。

简言之，由于有上面的局限，Keymap API 能够提供的只是帮助我们确认当前的键盘布局类型。不过这比只能检测 Keyboard Event 前进了一大步了。

接下来我们希望 Keymap API 能够考虑 Web 开发工具（不限于 Web IDE 和文档工具）的体验，提供`code + modifier <—> key`的映射关系。具体的 tracking issue 是 [Broaden the scope of the specification to support web IDEs · Issue #26 · WICG/keyboard-map · GitHub](https://github.com/WICG/keyboard-map/issues/26) ，有兴趣的同学可以关注一下。

## 小结

到这里这篇文章介绍了

* code/key 的用途和局限性
* Electron 应用如何通过 node-native-keymap 实现准确的快捷键映射
* 纯 Web 应用支持不同键盘布局时可以使用的 API 和其局限

当然，知道用户按下了什么键只是快捷键服务的第一步，接下来我们还要找到正确的命令。而这一步的难点则是在于快捷键到命令的映射往往不是一对一的。拿 VS Code 的快捷键定义来举例（JSON 输出）

```json
{
  "key": "cmd+/",
  "command": "editor.action.commentLine",
  "when": "editorTextFocus && !editorReadonly"
}
```

除了快捷键、命令以外，另一个重要的属性就是执行条件 `when`，只有当 `when`条件为真时，这个快捷键才会被映射到这个命令上。如何解析 `when` 条件语句，如何支持 `&&`、`||`和基本的正则表达式语法，咱们下一篇文章继续探讨。