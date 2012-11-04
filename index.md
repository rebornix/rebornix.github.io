---
layout: page
title: Rebornix
tagline: If you really want it
---
{% include JB/setup %}

You can read my blog from [Archive](/archive.html)

## As far as I can see.##
<a href="http://www.flickr.com/photos/njukidreborn/5189051166/" title="Flickr 上 njukidreborn 的 Moon-3"><img src="http://farm2.staticflickr.com/1268/5189051166_731c130f05_z.jpg" width="640" height="400" alt="Moon-3"></a>


Following is a piece of code(from my microsoft intern interview):

    def NameToNo(name):
        result = 0
        for ch in name.upper().strip("\n"):
            result = result * 26 + ord(ch) - ord('A') + 1
        return result

It would be better if the code can be highlighted.

End
