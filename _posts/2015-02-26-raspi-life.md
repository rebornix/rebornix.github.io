--- 
layout: post
title: 派
category: Raspberry Pi
status: publish
published: true
meta: 
  _edit_last: ""
type: post
tags: 
- raspberry pi

---
先给读者们拜个年，新春快乐！

自从去年年底略有小恙、萌生了一些想法之后，我决定多多锻炼自己的动手能力，并治疗一下自己的拖延症。趁着寒假七天乐，除了天天耍大牌，我完成了以下几个任务，给自己打五颗星。

##一 把厕所的灯修好了
* 潜在的危险：变成闪电侠
* 难度：两颗星
* 耗时：五秒钟

还没开始就结束了，也就没有留下任何影音资料以作纪念。


##二 将树莓派打造成了一个小米盒子
* 潜在的危险：发烧
* 难度：一颗星
* 耗时：一个小时

我的第一个派是两年前买的，那时候还在读书。当时在学校没有显示器（其实就是没钱，钱都给铁路局局长家儿子泡妞用去了），一直拖到过年回家，才接上家里的电视把树莓派成功启动起来。但后来我的SD卡坏掉了。于是我让它吃了一年的灰。来上海工作的时候，手里有了一些*积蓄*，于是我怒买了几个TF卡，买回来却发现，无论是公司的显示器，还是租房的老式电视机，都没有hdmi接口。我的派，又垫了一年的桌脚。

值此新春佳节，我在家拜读偶像Scott Hanselman的博客，无意中看到这篇关于将树莓派打造成家庭影院的[文章](http://www.hanselman.com/blog/AddingAirPlayToAReceiverWithoutAnAppleTVRaspbmcAndTheRaspberryPi.aspx)，决定也来试一试。其实网上关于将树莓派打造成家庭影院的文章非常多，甚至官方都已经提供了可以直接烧录的[镜像xbmc](http://www.raspberrypi.org/downloads/)。将xbmc的镜像烧录到sd卡上之后，直接加电启动，一个家庭影音中心已经出现了。

启动之后需要更新一下kernel和modules

<img src="http://rebornix.qiniudn.com/raspi-0.jpg" alt="installation" style="height: 400px;width: 600px;">

更新完全后，你看到的首页是这样的

<img src="http://rebornix.qiniudn.com/raspi-2.jpg" alt="installation" style="height: 400px;width: 600px;">

第一次启动的xbmc只是一张白纸，你可以选择从硬盘或者局域网共享文件夹中访问音频、视频等，也可以通过安装插件来访问电视资源。插件可以从[官网](http://addons.xbmc.org/)下载，也可以下载至本地然后安装。比如[中文插件](https://github.com/taxigps/xbmc-addons-chinese)，安装完之后就可以访问优酷、搜狐视频和hpd的直播资源，和你的小米盒子，简直没有差别。更有趣的是，你甚至可以安装一些18+的插件，关注一些动作巨星，这里就不便具体展开了。

<img src="http://rebornix.qiniudn.com/raspi-1.jpg" alt="installation" style="height: 400px;width: 600px;">

另一个有意思的细节是，xbmc不仅仅可以装在树莓派上，linux、mac、windows都可以安装，有网的地方，就能有直播。不得不承认，外国人动手的热情和能力都太棒了，无论什么都能start from scratch做出来，并且愿意把技术分享给他人。而在我朝，你所熟悉的story是，某山寨厂商抄袭国外某技术，然后量产，以低价卖给了所有人。

##三 将树莓派打造成一个BitTorrent 下载机
* 潜在的危险：撞墙
* 难度：一颗星
* 耗时：五分钟

由于树莓派功耗特别低(B+型只有3.0W)，所以利用pi来进行下载会比用常年开着电脑好很多（当然壕是不在乎电费的）。在pi上安装transmission和别的linux发行版并没有什么区别，你甚至可以把树莓派打造成一个乞丐版[NAS](http://chichou.0ginr.com/blog/315)，功效直逼小米路由器。这里我插一句话，但凡你不是特别穷困潦倒，玩NAS/离线下载的话，请买群晖。能花钱的地方，就不要花时间了。折腾完树莓派的效果如下

<img src="http://rebornix.qiniudn.com/raspi-3" alt="installation" style="height: 400px;width: 600px;">

这时出现一点差错，transmission装好后，怎么都没法下载，transmission提示是端口映射失效。检查完树莓派、路由器之后我发现，原因出在服务商**长城宽带**上。人如其名，长城宽带，就是长城内的局域网，由于使用NAT，bt下载被无情阉割（有兴趣的朋友可以维基一下NAT，你简直不敢相信中国的部分网络已经糟糕成这样了）。

早日肉翻，否则你连Geek都没法好好当。

##四 一个说走就走的docker registry
* 潜在的危险：太酷
* 难度：两颗星
* 耗时：半小时
 
这年头随着网速的大幅提升和无线技术的发展，网线对于普通用户都快成上世纪恐龙了。树莓派自带了一个网线接口，不够方便。于是我京东花30块钱撸了一个[无线网卡](http://item.jd.com/509932.html)，免驱动完美支持，一次点亮。然后我将我闲置快三年的移动电源拿了出来给树莓派供电，20Wh，够树莓派坚持五六个小时。从此我的派，说走就走。

<img src="http://rebornix.qiniudn.com/raspi-WP_20150227_002.jpg" alt="installation" style="height: 400px;width: 600px;">

你看，派和电源加起来，两张信用卡大小，就是一台随身携带的linux server，续航直逼macbook air哦！从此我可以在任何时间、任何地点，点亮树莓派，然后ssh上去，自由飞翔。就像这样：

<img src="http://rebornix.qiniudn.com/raspi-WP_20150227_003.jpg" alt="installation" style="height: 600px;width: 400px;">

一旦树莓派没有了网线和电源线的限制，它的便携性是完美的。我可以在上面安装一个private的docker registry，这样我自己的image就不用发布到public docker hub上。同时，由于派可以随身携带，无论我走到哪儿，在家，在公司，甚至在咖啡馆，我都能访问我的私人docker registry。

甚至你可以把它变成你的比特币钱包，安全且便携。而成本还不到300块！（派200+，一个小米移动电源现在只要60）。

不过这里童鞋们肯定会有疑问，即使树莓派很便携，当我们要访问或操控树莓派的时候，还是需要一个ssh client，大部分时候，我们需要一个PC或Mac才能传达复杂的指令啊？下面我给出一个答案

###一个web based的树莓派控制系统：[berryio](https://github.com/NeonHorizon/berryio)
Berryio是一个用于管理树莓派上GPIO接口或其他连接设备、监控树莓派各项参数的管理工具包，它支持从command line和browser访问管理树莓派。下面我做一下大自然的搬运工

* **Full GPIO control** including input/output mode switching and on off toggling.
* Support for Raspberry Pi Model A, Model B revision 1 and 2 (including both 256MB and 512MB versions) and Model B+.
* Ability to **take photos and adjust camera settings** (video coming soon).
* SPI DAC control and ADC values display.
* Control of **HDD44780 or KS0066U compatible LCD's (and VFD's)**.
* Realtime **CPU information** display, including temperature.
* Realtime **disk and memory** usage information.
* **Network status** view showing connectivity, signal strength, etc.
* Command line interface which offers the same level of control as the web browser interface.
* Email notification with a link to the BerryIO web browser interface.
* Integrated upgrade system.
* API system for developing mobile apps


除了功能强大以外，berryio的web UI做的也很cool

<img src="https://camo.githubusercontent.com/ad4bc37e7b5f5fe0184d1f35a1939021f40124f5/687474703a2f2f66726f7a656e6d6973742e636f2e756b2f646f776e6c6f6164732f6265727279696f2f494d414745532f6265727279696f2e706e67" alt="installation" style="height: 400px;width: 600px;">

使用这个工具最大的好处是摆脱ssh。你可以通过web来操控树莓派，这意味着即使没有ssh client，你可以通过手机完成对树莓派的操作。从此树莓派的便携性就显得不那么鸡肋。

<img src="http://rebornix.qiniudn.com/raspi-raspi-berryio-wifi.PNG" alt="installation" style="height: 400px;width: 600px;">

Berryio很好滴展示了我的派使用了无线网卡 :)

##Conclusion
可能在很多人看来，树莓派只是一个低配置的linux单片机，但正是它的简单、易用、便宜，才带来了极高的可玩性。只要有想象力，你可以将它变成任何设备。和乐高一样，它是每个人都值得拥有的玩具。

树莓派已经出了第二代啦，更有windows 10的支持，加量不加价，快去买一个玩玩吧！


