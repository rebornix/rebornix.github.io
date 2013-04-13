## Farewell Nanjing ##


<a href="http://www.flickr.com/photos/91888344@N04/8604981891/" title="Flickr �� rebornix �� mmexport1364726425724"><img src="http://farm9.staticflickr.com/8539/8604981891_de00a94328_z.jpg" width="640" height="480" alt="mmexport1364726425724"></a>

<hr>
<ul>
　　{% for post in site.posts %}
　　　　<li>{{ post.date | date_to_string }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
　　{% endfor %}
</ul>
