--- 
layout: post
title: SignalR The new old thing.
category: 海上日志 
status: publish 
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- 工作/实习

---
As you can see, this is my first blog written in English since I started blogging here. Obviously English writing is not that easy for me (what a shame, how dare I call myself a chatterbox), that's why I couldn't deliver this article last weekend as I promised. If you find any mistake, don't hesitate to tell me, I will buy you ice cream.

Today I want to talk about SignalR, a .Net real time library provided by Asp.Net team, which is such an old concept that it has been around for over 10 years. But real time technology is relatively recently that we've started seeing them used (or advertised). I think it's mainly because this tech has matured and become standardised. 

#Warm up#
If this is the first time you heard of SignalR, you may want to get started with some [tutorials](http://www.signalr.net/) about adding real-time functionality to a web/desktop application. It's a good habit to code yourself while learning new things. 

#Architecture#
After going through the samples, you can know how this is implemented, the architecture is really simple. All connections between clients and server side are full duplex. Clients can send messages to the server as they always do, server can also push notifications to a specific client. But clients won't talk to each other. From this point of view, you may find the server code is more or less a router. 

The only question left for us is , what kind of message should we send? 

"There is one thousand Hamlet in one thousand reader's eyes". If you are building a online chat room like Jabbr, you'd like to send/receive encrypted texts and images. If you are developing an online game, the messages would be more complex. Anyway, it just depends on your needs.

#Platform and Protocol#
SignalR is supported under a variety of server and client configurations. Meanwhile, each transport option has a set of need of its own. Like WebSocket, SignalR supports this new technique, but it falls back to other compatible techniques for older browsers or clients gracefully. 

In server side, If you want to use WebSocket, Windows Server 2012 or Windows 8 is required. WebSocket can even be used on Windows Azure websites, as long as the site's .NET framework version is set to 4.5 and WebSocket option is enabled. 

While in Client side, the situation may be more complex. It varies from Web Browser, Windows desktop applications, Silverlight application to mobile devices. Just as you can see below, SignalR may use Forever Frame, Server-Sent Events or Long Polling if WS is somehow not supported.

![SignalR Protocols](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-60-23/2605.4.jpg)

Yet, as a .NET developer, you will never be bothered which protocol to choose. You can even regard SignalR as a wrapper and do not care about the inner implementation. SignalR would decide which protocol is the best and switch to it.

As SignalR supports multi platforms, it is such a relief to .NET developers that we don't need to learn more libraries doing the same thing. A stable and  easy-to-use library is enough. I even leverage SignalR in my personal Chrome Extension then I have a perfect real time logging module.

#For more information#
You can read its documentation for more details. As SignalR is open-source, you can follow its repo in github then read its source code directly. BTW, I have to say .NET is really powerful and I'm just a newbie to this fresh new world.

