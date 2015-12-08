--- 
layout: post
title: 升级 Jekyll 3 之前你一定要注意的一件事情
category: Engineering
status: publish 
published: true
type: post
keywords:
  - jekyll
  - jekyll 3.0
  - bug
  - permalink
  - 升级
tags: 
- jekyll
- ruby

---
Jekyll 在不久之前发布了 [3.0](http://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/)，读完整个 release notes后，我并未发现任何潜在的风险，于是我果断跑到我的服务器上（没错，我自己托管了 Jekyll 服务而不是使用 GitHub Page，为了逼格，为了 [https](https://rebornix.com/ssl/2015/03/25/enablehttps/)）升级了 Jekyll。

##接着惨绝人寰的悲剧发生了
升级后，我访问了我的博客，首页一切完美如初。然后我试着打开某篇我自认为写的还不错的文章，拉到页面底端，打算再次回味一下粉丝们的评论。wat，怎么评论都没了！！！辛辛苦苦写软文骗来的粉丝和眼球，就这么消失了！！！

我第一时间看了下浏览器地址栏，holly f**k，我的精心设计的大小写交错的 url 已经全部变成了小写。我迅速滚回了2.5.3，坐和放宽了一会会儿，小站又恢复了平静。

##变成小写究竟意味着什么
首先，即使你不是处女座，你的内心也会因为这样一个不小的变化感到内心煎熬，不是吗？为什么要改变我的 url 呢。

然后是正经的，我们曾经发布的博客的 url，已经出现在各种 RSS、Twitter、Google 的索引等等之中，一旦 url 发生改变，之前的所有链接都失效了。我不确定谷歌的索引是否大小写敏感，但是我确定是，feedly 中我的文章的性感度（hot！）已经被清零了，twitter上 ifttt 自动发布的更新消息也无法成功的打开。

也就是说，这是一个 **breaking change**，然而这并没有出现在 Jekyll 3.0 的 [release notes](http://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/) 中。

##那个第五分钟出现的红裙子小妹妹就是凶手！
为了找出问题的真凶，我立刻到 GitHub 上查看 Jekyll 的源码。经过一段时间的比对，root cause 出现了。在 2.x 中，Jekyll 使用 `post.rb` 来处理文章，同时存在一个 `document.rb` 来应对别的类型的文件。下面摘录一小段代码

    #post.rb
    :title  => slug,
    
    def process(name)
      m, cats, date, slug, ext = *name.match(MATCHER)
      self.date = Utils.parse_date(date, "Post '#{relative_path}' does not have a valid date in the filename.")
      self.slug = slug
      self.ext = ext
    end
    
    #document.rb
    title: Utils.slugify(data['slug']) || Utils.slugify(basename_without_ext)
    
简单来说，post 中的 title，就是你文件中的名字，比如`2015-11-16-IAmAwesome.md`的 title 就是 `IAmAwesome`。但是在 `document.rb` 中，Jekyll 额外进行了一步处理 `Utils.slugify`，我们看看这个函数会做什么：

    SLUGIFY_RAW_REGEXP = Regexp.new('\\s+').freeze
    SLUGIFY_DEFAULT_REGEXP = Regexp.new('[^[:alnum:]]+').freeze
    SLUGIFY_PRETTY_REGEXP = Regexp.new("[^[:alnum:]._~!$&'()+,;=@]+").freeze
    
    def slugify(string, mode=nil)
      mode ||= 'default'
      return nil if string.nil?
      return string.downcase unless SLUGIFY_MODES.include?(mode)

      # Replace each character sequence with a hyphen
      re = case mode
      when 'raw'
        SLUGIFY_RAW_REGEXP
      when 'default'
        SLUGIFY_DEFAULT_REGEXP
      when 'pretty'
        # "._~!$&'()+,;=@" is human readable (not URI-escaped) in URL
        # and is allowed in both extN and NTFS.
        SLUGIFY_PRETTY_REGEXP
      end

      string.
        # Strip according to the mode
        gsub(re, '-').
        # Remove leading/trailing hyphen
        gsub(/^\-|\-$/i, '').
        # Downcase
        downcase
    end
    
Jekyll 把它认为不正常的字符都替换成`-`，并且把字符都换成小写的。

为了修复我博客的小问题，我立刻发了个 [Pull request](https://github.com/jekyll/jekyll/pull/4100)，然而这个 pr 是有私心的，我当时只考虑了大小写的问题。后来有哥们[表示](https://github.com/jekyll/jekyll/issues/4135)他写在文件名里的`_`都被换成了`-`，不开心。

可以想见，以后会不断有人跑过来说，把我的什么什么符号还给我...

##终极解决方案
我的 pr 之后只会保留大小写和`-`、`_`，其他的符号依然会被替换掉，这不是一个一劳永逸的修复。再加上 Jekyll 目测进入了 maintain mode，feature change 和 bug fix 现在都需要多人 review 才能进入主分支。我的 pr 写了两周了，一个 maintainer 表示可以 merge，但要等别人再 review。结果我这一等就是两周，这期间我给 Jekyll 提了四个 issue，三个 pr，通通 pending。所以，要想等 Jekyll 发布新的版本，可能不是一个明智的做法。

为此，我写了一个插件，叫做 [jekyll-post-unslugify](https://github.com/rebornix/jekyll-post-unslugify)，大家可以参考[文档](https://github.com/rebornix/jekyll-post-unslugify/blob/master/README.md)进行安装，安装配置完毕后，你的文章的 title 就会像 Jekyll 2.x 里面一样随心所欲。只有 title 回到了过去，你依然可以享受 Jekyll 3.0 的新功能。

最后，May the title be with you.
