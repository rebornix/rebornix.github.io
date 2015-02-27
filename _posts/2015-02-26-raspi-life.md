--- 
layout: post
title: 派
category: Raspberry Pi
status: draft 
published: false
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

![installation](http://rebornix.qiniudn.com/raspi-0.jpg)

更新完全后，你看到的首页是这样的
![home](http://rebornix.qiniudn.com/raspi-2jpg)

第一次启动的xbmc只是一张白纸，你可以选择从硬盘或者局域网共享文件夹中访问音频、视频等，也可以通过安装插件来访问电视资源。插件可以从[官网](http://addons.xbmc.org/)下载，也可以下载至本地然后安装。比如[中文插件](https://github.com/taxigps/xbmc-addons-chinese)，安装完之后就可以访问优酷、搜狐视频和hpd的直播资源，和你的小米盒子，简直没有差别。更有趣的是，你甚至可以安装一些18+的插件，关注一些动作巨星，这里就不便具体展开了。

![fox](http://rebornix.qiniudn.com/raspi-1.jpg)

另一个有意思的细节是，xbmc不仅仅可以装在树莓派上，linux、mac、windows都可以安装，有网的地方，就能有直播。不得不承认，外国人动手的热情和能力都太棒了，无论什么都能start from scratch做出来，并且愿意把技术分享给他人。而在我朝，你所熟悉的story是，某山寨厂商抄袭国外某技术，然后量产，以低价卖给了所有人。

##三 将树莓派打造成一个BitTorrent 下载机
* 潜在的危险：撞墙
* 难度：一颗星
* 耗时：五分钟

由于树莓派功耗特别低(B+型只有3.0W)，所以利用pi来进行下载会比用常年开着电脑好很多（当然壕是不在乎电费的）。在pi上安装transmission和别的linux发行版并没有什么区别，你甚至可以把树莓派打造成一个乞丐版[NAS](http://chichou.0ginr.com/blog/315)，功效直逼小米路由器。这里我插一句话，但凡你不是特别穷困潦倒，玩NAS/离线下载的话，请买群晖。能花钱的地方，就不要花时间了。折腾完树莓派的效果如下

![bt](http://rebornix.qiniudn.com/raspi-3)

这时出现一点差错，transmission装好后，怎么都没法下载，transmission提示是端口映射失效。检查完树莓派、路由器之后我发现，原因出在服务商**长城宽带**上。人如其名，长城宽带，就是长城内的局域网，由于使用NAT，bt下载被无情阉割（有兴趣的朋友可以维基一下NAT，你简直不敢相信中国的部分网络已经糟糕成这样了）。

早日肉翻，否则你连Geek都没法好好当。

##总结
动手能力是可以提高的，但拖延症是没救的...
