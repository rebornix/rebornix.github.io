--- 
layout: post
title: 海上日志 Try something new
category: 海上日志
status: publish
published: true
meta: 
  _edit_last: "1"
type: post
tags: 
- 工作/实习 
- 海上日志

---
<span style="color: #339966">11.1</span>
<ul>
<<<<<<< HEAD
<li>17:42，实在是fix不掉ersion不match和各种lib引用的问题，找Ryan给帮助，最后结论就是咱们被坑了，不干鸟</li>
<li>16;29，我已经花了一天半的时间在这个apache迁移上了。不仅是数据和apache本身，还要帮他们把各种适配给做好，也就是让网站在新的机器上重新run起来。但是由于其原先版本过老，直接迁移新机器上的一些tool不能不能适配，比如mysql和perl。其网站的代码里都是用的绝对地址，必须建立symbolic link为其保持原先的结构。一下午都在纠结如何把perl成功的run起来。</li>
=======
>>>>>>> ee43dfe4cb7670be659cf6e55b8dbe12cca29e81
<li>13:23，使用了git好处终于体现了，不小心删错了文件只要pull后merge一下就什么问题都没有了</li>
</ul>
<span style="color: #339966">10.30</span>
<ul>
<li>23:18，和Regina这事是迟早要提不可避免的，sheet</li>
<li>10:37，最近状态不对，心思完全不知道在哪儿，what's wrong with you?</li>
</ul>
<span style="color: #339966">10.29</span>
<ul>
<li>16:56，因为有dev_env，配置pymode简直是蛋都要碎了</li>
<li>13:22，写js的坏处之一时不得不面对cache问题，调试server端的js文件真纠结</li>
<li>10:43,还是Ryan回来后一切才能恢复正常啊，继续各种不懂得问</li>
</ul>
<span style="color: #339966">10.28</span>
<ul>
<li>20:13，终于算是把网搞的稳定一些了，至少断的少了.今天起来后干了什么呢，出去散了两次步，追了追最近的美剧.兄弟连不得不说是一部好剧，战争的残酷描述的淋漓尽致，倒是让我有一种不忍再看下去的心情.话刚说完网断了，linux下还是不行啊，但是刚才ipad是很nice的，真是奇了怪了.</li>
</ul>
<span style="color: #339966">10.27</span>
<ul>
<li>10:35，参加活动的有学生，老程序员们，start up团队两个;和Leon把Face1确定好开始看各种API啦</li>
<li>08:35，第一个非我的成员是一名linux工程师.</li>
<li>08:24, 在创智天地参加Gurudigger的Hobby Project Day. 今天和Leon一起做一个Cloud Management</li>
</ul>
<span style="color: #339966">10.26</span>
<ul>
<li>17:48，哭了，要处理的问题有Django的问题，Extjs的问题，还有SA issue. 不太好搞啊</li>
<li>15:36，第一次修bug要用到firebug看html，git创建分支，grep查找，改Django代码.</li>
<li>12:36，开始做Python开发的第一件事是配好Vim Python Mode，damn Cool!</li>
<li>14:14，又一次配好了Django和Mysql，尤其是配置二者之间的链接时还是有很多问题的，这些上一次装时都出现了，还要再次google真心麻烦。以后坚决不能偷懒写wiki，只要是在Linux上，因为说不定什么时候我就把linux换了。</li>
<li>11:57，给公司PC配Django，这次一定要写Wiki！</li>
<li>11:09，Oracle的问题还真是头疼, sheet</li>
<li>10:17，有了一个管理Cloud和Physics机器的想法，针对personal PC和Smart Phone及免费云服务</li>
<li>09:23，Good Morning, Rebornix and nobody else</li>
</ul>
<span style="color: #339966">10.25</span>
<ul>
<li>15:23，运维是一件需要经验的活儿，所以FTE的年龄都稍微大一些。于是老是有人生小孩、产假还有怀孕...</li>
<li>14:35，果然做过production之后sense就不一样了，之前八秒的latency降了一秒全世界都很开心，现在即使37s的awk时间大家都觉得没太所谓。</li>
<li>12:34，自己写的工具就叫rawk吧，在Ryan那台Solaris机器上完成相同的挑选单column的效率是awk的34/2.7倍。不过在我的laptop上就不明显了</li>
<li>10:15，awk作为一个强大的工具的最大问题在于反而过于庞大了。Ryan让我用C写个工具代替awk，至少完成查找column的功能。</li>
<li>09:22，睡到八点半再过来11路上人很少，不过you know what!我今天是Team第一个！</li>
</ul>
<span style="color: #339966">10.24</span>
<ul>
<li>23:30，既然考虑到排序时是否in-place，再次回到上午的日志分析。因为总共只有40thousand的unique item，我就直接使用了built-in sorted method。而如果数据量上去，sorted实际只能最大处理half-memory的数据量。这种情况下建立一个最大堆要合理些。Python内建Heap，明天学习一下。</li>
<li>23;28，sorted排序时创建了一个新的list，但是list.sort() 的话貌似是in-place的。</li>
<li>23:27，python的源码真不好读，想看一个built-in sorted method，各种云里雾里。不如看过的一些linux内核代码好看。</li>
<li>17:12，如果纯用Python写，split一句话就parser成功了，和awk一样方便但是高效，纯python9.9s，C的话快了一秒，但是处理string要稍微烦一些。不过我可以试试C++</li>
<li>15:51，Ryan把这个活丢给我时就说过Shell可能很慢让我用别的方法来做，不过他提前用awk帮我把parser做好了，这恰恰是最耗时的我一直没有去改进。看到网上有argue说awk比C要慢，于是自己来处理string，200MB的数据只需要5s左右，整个工作只要8.3s。这才是一个大的改进。</li>
<li>13:44，用shell和python多次测试，发现200MB（2million items）的数据即使用很naive的做法大部分时间也都是花在IO上面(34s)，sort的时间占的很小（不到3.4s），不上GB根本没有必要搞什么Big Data Way，神码最小堆之类的，是自己给自己找麻烦.当然，数据达到GB之后情况可能就不一样了</li>
<li>10:26, 要帮Ryan解析一个日志，找出DNS解析IP的top 10...为什么是这么经典的算法题</li>
<li>10:25，今儿闹钟没想，不过七点半就醒了，于是睡了个回笼觉到八点半，到公司九点半，也还不错，但是公交车上人还是很多...sheet</li>
</ul>
<span style="color: #339966">10.23</span>
<ul>
<li>00:19，在有网络的情况下，Ubuntu One很好地同步了公司的Ubuntu和我的主机。也就是说现在我的blog完全不担心丢失，有Ubuntu One及时地同步文件，当我想更新博客时，我及时地将staged的文件commit上去就okay了，同时在Jianguo yun上做了一个bare repository。三重保护，被dreamhost搞砸博客这种事情再也不能发生了。今儿还从Carl那儿血来用toodeldo来管理todolist，同样那句话，有网的情况下还是很无敌的。不管以后到哪儿生活，第一件事一定是把家里的网架好，之后是server。最后一件事情是现在用印象网页版来写wiki，毕竟服务器在国内，还是很快的。至于网不好时，the world sucks!</li>
<li>17:38，今天第一次参加了Group meeting和scrum meeting，数数指头发现在eBay待了三周了。Carl看我在忙Ryan忙很多SA的活儿，问我有没有时间，我本来想得是我对Django框架还不够了解，可以再看看testsites的代码，但是Carl和Allen都说看代码没有重点看不出什么东西，应该拿一些tiny的活来做，或者修一些bug先。这就让我想起了在MS，第二天Catherine和我首次见面就给我安排工作了“看/commerce和/cts目录下的代码，之后和dev，pm一起做一个prototype”，然后我就持续看了三周的代码。MS的观念就是没有文档，看代码基本可以搞定一切问题。Which one is better? Who knows.在MS，你的感觉是他们觉得你无所不能，什么都可以做，不需要太多的帮忙（你去ask for help你会得到最热情的帮助，当然还是不要问mananger，他们很忙的）；在eBay我就多次感到他们会希望你能够循序渐进，可以说是一个非常靠谱的建议，适合大部分人，只是我先入为主了不太习惯。好在Ryan每天都丢ticket给我让我能够先前的实习状态.</li>
<li>16:56，把手机的贴膜撕掉了，感觉这屏幕瞬间爽快多了（撕的时候更爽我知道），但这真是一件矛盾的事情</li>
<li>15:39，fabric确实是实际生产中的好工具，这好象是我这个sprint中第二次发出感慨了。</li>
<li>11:39，回到昨天single user mode的问题。我在看linux黑客入门这本书时（名字很土，但还是很hack的），里面讲过单用户模式登录修改密码的，我只事按照提供的修改方式去尝试登录fezhao的ubuntu，但是没有成功。直到昨天sudoers文件出错了不得不以single mode登录才hack出修改自己grub启动的方法（no google）。下下周回去再对fezhao来一次，还有毛博</li>
<li>11:35，刚才Ryan让我写个循环来ping，问我会不会我想都没想就说了会，然后google了一下写了出来。这合理么...所以说现在是能google到就不算不会么</li>
<li>11:04，要在30分钟内关闭96台VM，如果从Lom登录就需要96个console，真是又土又累的方式，还好可以使用脚本来shutdown, sh或者fabric循环就可以做了。</li>
<li>09:04，wow，今天事team来的最早的！真难得！新的一天又开始了筒子！</li>
</ul>
<span style="color: #339966">10.22</span>
<ul>
<li>00:14,修改/etc/sudoers文件，结果不小心出了typo，再想修改不能了，因为无法使用sudo命令（/etc/sudoers 解析错误）。而Ubuntu默认第一个用户可以获得root权限，当然是通过sudo来实现。理论上你仍然可以使用su操作，但是root账户的密码如果首个用户并未进行修改，那么它每次开机都会获得一个随即的密码，这是多么可怕的事情，意味着你无法使用su。最后的办法是，在进入grub时edit启动方式（ro后添加single，以root身份登陆）。如果为对grub加上锁的话，顺利登入，可以修改任何文件，当你忘记了密码时不失为一种fix问题的好方法。我想大部分人的grub是不加锁的，他们的pc有多么的不安全啊，哈哈.Laugh what!之前的你不也一样么！fix it tomorrow</li>
<li>19:22,为了防止回去后上不了网，必须要commit一下，不然明天过来没同步之后merge就蛋碎了~~~damn sheet dorm network!</li>
<li>19:12，终于自己的linux上也把博客同步过来了！马上安装坚果云，做两个git remote depot.</li>
<li>17:10, Ryan过来问最近有木有什么好玩的，于是我们聊了得有四十分钟的各种Project各种Code和算法...这就是码农的世界么，不过很爽是真的</li>
<li>16:29，今儿个还没汇报周末工作呢，你知道为什么我周末没有log吗?Yes，周末在家没有网；怎么会没有网?Yes，我的linux连不上；连不上怎么fix？Yes，重装别的版本。Yes，哥周六装了一天，从Ubuntu12.10到Mint13Xfce，到Mint13KDE，再到Mint13Maya，尼马没有一个可以成功的！至于我一条/etc/init.d/networking restart搞崩溃Ubuntu12.10再要没有起来过我就不说啥了，Damn Sheet!周日出去买衣服，终于买了老妈不喜欢的棉开衫，她不让买是觉得我肯定不会洗。晚上就去松江和阿福Celia吃了个饭，认识了一下美丽的Sofia。回来后神清气爽，装上LUbuntu，是啊，哥已经只能用Lubuntu了，时间是把杀猪刀啊。</li>
<li>16:28，实在忍不住，到楼下给自己买了杯可乐，sorry Regina，写代码时可乐才是王道啊。</li>
<li>13:30，oh come on！盗号这件小事将要持续影响我多长时间啊，搜不鸟！</li>
<li>10:45，不管是否可以恢复好友，是否可以回到过去，但故事的最后我好像还是要说拜拜。Find me by Google Talk(penn.lv#gmail.com) MSN(rebornix#live.com) Skype(njukidreborn) or just this Blog.</li>
<li>09:46，QQ被盗，怎么会有这么缺德的事情！哥决定不用了，相信别人总要办法找到我</li>
</ul>
<span style="color: #339966">10.17</span>
<ul>
<li>16:00，Physical machine上的安装了VMWare（就是之前我升级的那些），然后要再其上添加Virtual Machine。一共12台机器手动地设置Host Name,OS，Disk，Memory之类，其安装配置则是自动化配备好的。AWS或者Azure提供给用户自由创建虚拟机，其实就是将其全部实现automation。这些原本看似高端的技术的base也不见得就非常的深奥，一如Map Reduce.</li>
<li>14:59，remote machine上rsync路径不对，我虽然check到了这个manual，但是我一直用local的rsync来设置，真是太傻了。而且没有uptime看一下新build的机器是否是空的</li>
<li>12:46，居然重启之后就好了，Ubuntu的Network Module很成问题啊。反正我自己的电脑在宿舍连网都上不去。</li>
<li>12:29，Ryan和我看了十五分钟也没又抓出我呢提所在，reboot一下试试</li>
<li>11:25，今天的网络不知道为什么老是断，抽的不行，还好有screen帮助，不然啥活也干不下去了。但是不断地ssh重连也很蛋疼啊。</li>
<li>10:16，早上坐公交车结果把自己的公交卡又搞混了，sheet，哥还是把卡上的号码全部记住吧，就像记住每辆公交车的车牌号一样！</li>
</ul>
<span style="color: #339966">10.16</span>
<ul>
<li>19:04，最恨和ssh，https纠缠不清了，尤其是在一个VPN内，也不知道对外的ssh有没有被blockc掉，而https可以pull不能push，相当纠结。</li>
</ul>
<span style="color: #339966">10.11</span>
<ul>
<li>18:45，十几台机器终于全部都升级完了！虽然这些都是苦活儿累活儿，但SA很多时候就得做这个，之所以把它们交给SA，是因为一旦出现问题，得有专业的System和网络知识来帮助fix issue（故对于现在的我来说，现在是纯体力活啦，Ryan都帮我把坑填好了。越来越想真正地花三个月时间来做一个SA，这需要抛弃大部分开发（比如用Python、Java写Tool）。但我此次的目的就是挑战自己，System相关的升级、配置、网络上各种issue都是我最头疼的（看，哥连Veer的驱动都装不好），试一试，看看自己能有多大能耐。</li>
<li>16:07，接到M$ Bruce的电话，想想还是不要浪费别人的时间，就cancel了这个Telephone interview。祝大家都好运吧。</li>
<li>15:46，莫非我就是传说中的Server Killer</li>
<li>15:04，今儿活儿还真多，到现在才有机会腾出手来，因为有台机器在我升级的时候跪了，故得到一丝喘息。</li>
</ul>
<span style="color: #339966">10.10</span>
<ul>
<li>16:42，给VMWare升级，一大丢的细节要注意。</li>
<li>14:02，中午去接了马茜茜，和想象中不太一样，挺美的也很豪放。回来后就收到了veer，完全不懂结果自己就拆后盖，后盖坏了一小块，不过无伤大雅。点金石很漂亮，但是连不上网，虽然二奶机对于我来说能不能上网没太所谓，但依然需要搞一下。</li>
<li>09:26，QA老大说昨天那活儿不属于op，mission dismissed. 门卡终于办好了...</li>
</ul>
<span style="color: #339966">10.09</span>
<ul>
<li>21:59，和zeyu去家乐福买生活必需品，看着这几百块的枕头是真纠结啊，最终只买了一个回来两人睡。是明白了以前故事里的说法，到自己花钱的时候就心疼了。花钱买书和conference时倒是不含糊，别的先将就吧。</li>
<li>18:10，SA的活儿很陌生，但是因为未知而显得有趣，先花个一周时间试试看，然后再去做Tool写点代码。</li>
<li>17:02，web-based公司对开源就是有一种独特的喜好，总是赶时髦。</li>
<li>16:25，之前搞了两个月的Workflow，到这儿又遇到WF，熟悉的赶脚哈哈。</li>
<li>16:04，add the first meeting here</li>
<li>15:57，刚接了一个ticket，为用户添加sudo权限。对command还不太熟悉，不过fix掉之后略微有了SA的感觉～</li>
<li>15:07，刚一位老哥告诉我们，上别人机器chmod 4755，留个后门...嘿嘿嘿</li>
<li>14:32，Alen带我了解了下我们Team的情况，DBA,SA,Toos任选，时间较短DBA应该不合适，SA和Tools都可以接触一下。</li>
<li>13:25，一起入职的zhijun电脑Admin rights还没获取到，比较着急，我掐指一算，才第二天，离M$一周配置环境的宽限还有很远的距离，瞬间淡定了。</li>
<li>12:11，总算把corp security和各种配置搞定了。这次是全Windows，由于IT的限制不多，所以corp security和personal configure都顺利通过了。COC果然如果面试时所见到的那样，非常的欢乐。老哥们互相调戏真是不遗余力啊。之前三个月还要适应Intern氛围、环境、生活之类的，所以这次显得毫无压力。接下来三个月就用虎哥的一句话为slogan吧“卖命的员工最招老板喜欢”，好好学习做一点东西出来。拿到正式卡后去买点东西吃，这边木有零食还真是有点不习惯。</li>
</ul>
