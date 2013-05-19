---
layout: page
title: "Blog"
description: ""
---
{% include JB/setup %}
<div style="font-size:14px">
{% for post in site.posts %}
    {{ post.date | date_to_string }} <a href="{{ post.url }}">{{ post.title }}</a><br><br>
{% endfor %}
</div>
