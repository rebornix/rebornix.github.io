---
layout: page
title: Rebornix
tagline: Supporting tagline
---
{% include JB/setup %}

My instant blog is [Rebornix](http://www.rebornix.com)

## A coder's blog should be controlled by a version-control-system

Following is a piece of code:

    def NameToNo(name):
        result = 0
        for ch in name.upper().strip("\n"):
            result = result * 26 + ord(ch) - ord('A') + 1
        return result

It would be better if the code can be high-lighted.

## Sample Posts

This blog contains sample posts which help stage pages and blog data.
When you don't need the samples anymore just delete the `_posts/core-samples` folder.

    $ rm -rf _posts/core-samples

End
