---
layout: page
title: "Blog"
description: ""
---
{% include JB/setup %}
<div style="font-size:14px">
<ul>
　　{% for post in site.posts %}
　　　　<li>{{ post.date | date_to_string }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
　　{% endfor %}
</ul>
</div>
