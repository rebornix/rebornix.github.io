--- 
layout: post
title: Visual Studio Code 1.7 发布为何会影响 NPM 服务
category: vscode
status: publish
published: true
type: post
tags: Visual Studio Code
keywords:
  - Visual Studio Code
  - VS Code
  - NPM
  - Automatic Type Acquisition
---

十天之前（11 月 2 日）Visual Studio Code 发布十月 Iteration （1.7）的更新，但三个小时后之后 1.7.0 便被从服务器上拿下，用户收到 roll back 回 1.6.1 的更新通知。第二天（11 月 3 日）我们便发布了 VS Code 1.7.1，并且发表了一个[申明](http://code.visualstudio.com/blogs/2016/11/3/rollback)，详细解释了此次事故的来龙去脉，以及为何此次事故会牵扯到 NPM。

写不下去了，以上字正腔圆的“官方”解释是我的极限了 :( 我还是来通俗地简单地解释一下当时发生了什么。

## Automatic Type Acquisition
在 VS Code 中，我们借助于 TypeScript 的语言支持来实现 JavaScript 的 Intellisense，而 TypeScript 是使用类型申明文件（typings）来达到这个功能的。在 1.7 之前，用户需要手动（当然是肯定可以用脚本代劳的）为自己引用的 npm package 下载 typings 文件到本地从而激活 VS Code 里的 Intellisense。

在 1.7 中，我们试图把这个过程自动化，即 Automatic Type Acquisition ，自动地为用户写在 `package.json` 的 npm package 下载 typings 文件。由于现在 typings 文件都存放在 npm 的 [typigns scope](https://www.npmjs.com/~types) 下，所以当用户用 1.7 版本的 VS Code 打开某个 node project，这个 feature 将会发送若干个请求给到 npm registry 来查询 typings 文件并下载。

## 问题来了
当时每个得到更新的 VS Code 打开 node project 时都会给 npm registry 发送 query 请求，以确定是否有 typings 供本地下载。这里我们得承认的是，并不是所有 JavaScript 的 npm package 都是有 typings 文件的（否则年底工资涨一万倍）。因此 npm 的 CDN 满地打滚无数次命中 404 ，进而间接影响了 npm 的 availability。

## 修复
我们在十一月三号发布了 1.7.1 ，暂时把 ATA 这个功能禁用。这只是一个暂时的 roll back，ATA 是一定会有的，请大家耐心等待，1.7.2 即将到来, stay Connected.
