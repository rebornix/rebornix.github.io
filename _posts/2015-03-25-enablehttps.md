--- 
layout: post
title: 博客上https啦
category: ssl
status: publish
published: true
meta: 
  _edit_last: ""
type: post
tags: 
- https

---
本来这篇文章是要叫“老板不在的日子里”，但是我不争气地在老板回到办公室的第一天，发烧了。貌似是吃坏东西了，但是这依然比较尴尬。我只能按下不表。

最近[Sneezry](https://sneezry.com)和[SNK](http://snk.me)给他们的网站都加持了https，还告诉我“这年头没有https都不好意思跟人打招呼”。表示再忍下去连朋友都没法做了，我决定充分利用下公司福利（150刀的Azure），上https！

回想起来，我最开始博客是基于wordpress的，由于没有养成定时备份的好习惯，也没有习得git大法，我经历了一次比较严重的数据丢失事件。非常痛心，于是决定给自己的博客加上source control。那是2012年，我刚到微软实习的日子。

那时候还没有女朋友，是一个彻头彻尾的码农。看到网上到处流行着“如何像Geek一样写博客”的洗脑文，我也上钩了。从此我的博客上了Github，一用就是两年。Github托管博客免费、速度也不慢，但是不支持custom domain的https。不过Github Page是基于Jekyll，我可以轻松在自己的服务器上达成相同的托管效果。现在我的博客框架大概是：

1. 文章还是保存在Github上，充当数据库；我依然没有丢失source control
2. 图片存放在七牛上，支持https而且免费，我找不到更好的选择。
3. 我自己的vps上使用nginx。使用cronjob，定期去check github repo是否有更新，有更新的话，执行`jekyll build`生成`_site`，ngix就是link这个文件夹。

That's it. 最后说句实话，这篇文章主要是想看看更新为https后，老的rss地址还能不能work，表打我。
