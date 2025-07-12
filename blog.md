---
layout: default
title: "Blog"
description: "Thoughts on technology, AI, development, and life"
---
{% include JB/setup %}

<div class="container">
  <header>
    <h1>Blog Posts</h1>
    <p>Writing about technology, AI, VS Code development, and occasional life reflections.</p>
  </header>

  <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-item">
        <time class="post-date">{{ post.date | date: "%B %d, %Y" }}</time>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        {% if post.description %}
          <p class="post-excerpt">{{ post.description }}</p>
        {% elsif post.excerpt %}
          <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
        {% endif %}
        {% if post.category %}
          <span class="post-category">{{ post.category }}</span>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</div>
