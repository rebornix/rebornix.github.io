---
layout: page
title: Rebornix
tagline: If you really want it
---
{% include JB/setup %}

My old blog is [Rebornix](http://www.rebornix.com), but it can't be accessed now.

## A coder's blog should be controlled by a version-control-system

Following is a piece of code(from my microsoft intern interview):

    def NameToNo(name):
        result = 0
        for ch in name.upper().strip("\n"):
            result = result * 26 + ord(ch) - ord('A') + 1
        return result

It would be better if the code can be highlighted.

## Sample Posts

This blog contains sample posts which help stage pages and blog data.
When you don't need the samples anymore just delete the `_posts/core-samples` folder.

    $ rm -rf _posts/core-samples

End
