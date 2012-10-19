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
<span style="color: #339966">10.18</span>
<ul>
<li>17:50，build的机器多了之后，自己也不记得哪些是自己做的，这样不好！</li>
<li>16:38，SA和Dev双管齐下百花齐放的结果就是忙得跟个狗一样！</li>
<li>13:46，装完ubuntu12.10后win8没了，修了一个中午都没搞定，尼马马上全组人都要来看了...算了，还是回去重装win8吧，谁让我把linux放在了猪分区！</li>
<li>10:41，根据最近工作的经验来看，三个屏幕是工作最合理的配置（或者是对于我的工作习惯来说），中间那个用来code或处理issue，右边展示需求或流程，左侧那个用来do some research. 而更多时候我们手里头不可能只有一件事情在做，你也总会经常被打断，Ubuntu的多工作界面就显得很重要。我先在Stage1，2是SA的两份不同的工作，Stage3是Tools Dev，Stage4 Personal Staff，做一些记录和wiki。但还是会感到界面还不够多。王母娘娘，赐我一墙的显示器吧！</li>
<li>10:19，真是每天来的时候都是一阵忙活。如果你想要干活，ticket是可以源源不断的，虽然活儿都很tiny，但需求之间各有差异，实际也比较难写脚本automation。可能人工智能更靠谱一些。昨晚睡之前Ubuntu12.10都还没有final release，万恶的时区，躺在床上想应该写个脚本一直check官网看是否有更新，一旦发现就叫我起床。早上六点起来发现release出来了，点击下载后又睡了一觉。Come On 12.10，让蹩脚的网络管理和网卡驱动们都一边玩蛋儿去吧！</li>
</ul>
<span style="color: #339966">10.18</span>
<ul>
<li>20:09, SA+Dev的活儿一旦一起都要干，事情就变多了。中午睡了一觉，Happy Hour时看到公司还是有不少美女的，瞬间感觉又会爱了。晚上回去实在是累，啥都不想聊，不合理啊少年。</li>
<li>18:56，今天在公司吃罗森的盒饭～不是说好的今天Ubuntu12.10 final release的么，UTC都11点了怎么还没有，搞我呀，哥还指望着蹭公司的网下好了回家装呢,what the fucking hell!</li>
<li>17:06, Fabric seems cool!</li>
<li>16:35，FreeMind果然好用，思维导图才是帮助我思考的最佳工具，赞一个。学习思维导图的理论得有一年了到现在才开始实践是不是反应太慢了？</li>
<li>16:27，Happy Hour各种没节操啊，调戏老板们是这家公司的企业文化么～～～</li>
<li>15:02，Keywords: Python, Django, Extjs.</li>
<li>13:39，join QA Tools Team, start some coding work.</li>
<li>11:05，为12台server mount NFS share folder，要修改/etc/fstab，创建dir，然后mount，做到第六台觉得自己真傻，居然不写脚本来做这个事情。</li>
</ul>
<span style="color: #339966">10.17</span>
<ul>
<li>17:23，公司有个果粉在宣扬iPad mini有多好，并一直在讲一个笑话“Surface 32GB要4488，系统就占了12GB”.首先Surface 32GB只要3600+，加上键盘才事4488，别说和iPad一样贵，你要是再买一个高质量的case要再加上500+。其次，Surface可以插U盘和microSD卡好么，吐嘈无力。</li>
<li>16:00，Physical machine上的安装了VMWare（就是之前我升级的那些），然后要再其上添加Virtual Machine。一共12台机器手动地设置Host Name,OS，Disk，Memory之类，其安装配置则是自动化配备好的。AWS或者Azure提供给用户自由创建虚拟机，其实就是将其全部实现automation。这些原本看似高端的技术的base也不见得就非常的深奥，一如Map Reduce.
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
