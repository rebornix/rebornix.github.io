--- 
layout: post
title: 远程下载：一点野路子
category: Raspberry Pi
status: publish
published: true
meta: 
  _edit_last: ""
type: post
tags: 
- raspi

---
##闲言乱语
等待了四个月之后，我终于拿到了新的笔记本。不过仔细想来，这个笔记本我其实等了一年半了。新员工入职的时候理论上都能拿到一台服务器，两个24寸显示器和一个笔记本。但是由于种种原因，有的时候你只能拿到baseline（一台服务器，一个显示器），如果你入职的是美国MS，基本上你只能拿到这些。

但是我是讨人厌的处女座啊，入职的时候AA发给我的邮件上写我能拿到笔记本，那就不能框我们嘛。转到VS team后，先后拿到两台比较老的笔记本Thinkpad T420s和X220，后者是我至今用过最顺手的laptop（超过Macbook）。X220续航和性能都非常出色，但是牺牲很大：12寸的屏幕和加持的电池让它变得不那么“便携”和酷。

不过苦日子总算过完了:)

<img src="https://dn-rebornix.qbox.me/raspi-WP_20150319_004[1].jpg" alt="installation" style="width: 100%;">

<img src="https://dn-rebornix.qbox.me/raspi-WP_20150320_001[1].jpg" alt="installation" style="width: 100%;">


##谈正事：远程下载
如果你是迅雷会员，或者你有朋友是，我想你一定听说过迅雷的远程下载。身在公司心在家的你，坐在办公室无聊地磨洋工时看到一些让人心跳的资源，轻松点击一下，回到家它们已经躺在你深深的硬盘里，这是多么的美妙。对于每一个喜爱看电影看美剧的上班族来说，这都是一个值得拥有的服务，比那些“你一回到家空调/电饭锅/洗衣机 已经打开了”的所谓智能家居要有意义的多。

热心的读者朋友知道，我这个把月都在玩树莓派，而且把树莓派当作我家中的主力下载机。我决定想一点办法，在pi上实现这个功能。

##一点善意的提醒
1. 由于远程下载深受群众喜爱，它几乎成为了NAS的必备功能。你只需要购买一个NAS和迅雷会员，成本不到2000元，幸福指数就能大幅提升，无需任何折腾。当然，如果你和我一样，在家里没有任何财政方面的话语权，请看第二条建议。
2. 给你的领导普及一点初中物理知识，比如树莓派的功率是3W，1000WH等于1度之类的。然后再给她展示一下你的数学功底，3*24*30=2160WH=2度。剩下的就不用你操心了，你家领导肯定比你更清楚一度电几个钱。只要晓之以理，动之以情，我想领导肯定会允许你一直开着树莓派的。然后可以参考我下面的教程 :)

##解决方案
原理其实非常简单。我们使用的下载工具aria支持[json-rpc](http://www.jsonrpc.org/)，这是一个轻量级的远程procedure调用协议。因此我们可以在家中使用诸如[webui-aria2](http://ziahamza.github.io/webui-aria2/)或者[yaaw](http://binux.github.io/yaaw/demo/)，通过浏览器操控aria来进行下载。在webui和yaaw中，你需要配置json-rpc服务的地址，你在家中使用的时候，这个地址就是树莓派的ip地址。那么问题来了，当你离开家中局域网来到公司，要怎么配置json-rpc endpoint呢。

如果你家里是独立IP，最好的办法就是通过动态更新DNS绑定一个独立的域名，这样你就能够在任意时候访问家中的树莓派了。实现方法网上非常多，这里不做展开。

如果你家的网络没有独立IP，比如被挡在NAT后面，你可以借助一台拥有独立IP的VPS来实现翻越。方法有以下几种

1. 在VPS上搭建一个VPN，然后把树莓派连上这个VPN。当你在公司需要访问家里的aria json-rpc的时候，连上这个VPN，你就可以和家里的树莓派通讯了。
2. 把树莓派上aria的json-rpc的端口映射到VPS上，这样访问vps的port时，request会被redirect到家里的树莓派上。步骤如下
  *  使用ssh进行端口映射 `ssh -qTfnN rebornix@VPSDOMAIN -R 6800:RASPBERRYPI_IP:6800` 。完成映射后，你已经可以在webui-aria和yaaw中配置`VPSDOMAIN:6800/json-rpc`来管理树莓派上的aria进行下载了。
  * 写一个脚本，让你的pi在boot时自动进行端口的映射。当然可能pi启动的时候，你的路由器还没有启动，这种情况下，cronjob比较合适。我写了一个脚本，然后配置它每十五分钟跑一次

脚本如下:

    #!/bin/bash
	  wget -q --tries=10 --timeout=100 --spider http://www.baidu.com
	  if [[ $? -eq 0 ]]; then
	        echo "Online"
	        if ps aux | grep "[s]sh -qTfnN" > /dev/null
	        then
	            echo "ssh port forward running"
	        else
	            echo "ssh port forward not running!"
	            ssh -qTfnN rebornix@VPSDOMAIN -R 6800:RASPBERRYPI_IP:6800
	        fi
	  else
	        echo "Offline"
	  fi


----------
技术上实现后，你最后需要做的就是保持政治正确。比如我就会在上班时驱使pi下载生活大爆炸，这样比我早下班的妹子回到家就可以大饱眼福了。这是一次便宜且有趣的尝试。
