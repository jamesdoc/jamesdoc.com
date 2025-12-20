---
title: Grabbing a favicon from any website
type: article
tags: code
date: 2012-05-05 16:31:05
leadImage: /_assets/img/blog/imported/banners/grabbing-a-favicon-from-any-website.jpg
---

One of the great discoveries I made this week relates to grabbing a favicon from any website as required; Google has put together a handy API which takes in a URL, and outputs a PNG 16x16 image of the site's favicon. This has the potential to be very handy for something. I'm not 100% sure what I'm going to use it for, but I'm going to use it for something!

An example of this is:

<pre class="prettyPrint">
&lt;img src=&quot;https://www.google.com/s2/u/0/favicons?domain_url=http://google.com&quot;&gt;
</pre>

Which outputs: <img src="https://www.google.com/s2/u/0/favicons?domain_url=http://google.com" alt="" />

For a full demo of this head over the <a href="http://jamesdoc.com/snippets/favicons">snippet page</a>

---

Update: I've thrown together a <a href="https://jsfiddle.net/6yK6s/" target="_null">JS Fiddle demoing a possible use for this</a>. If anyone can work out a method of getting <code>url()</code> and <code>attr()</code> to concatinate nicely I will be a very happy person! I've got a <a href="https://jsfiddle.net/6yK6s/6/" target="_null">demo of what I'm after using JavaScript</a>, but I'm quite keen to have a CSS only method of achieving this!
