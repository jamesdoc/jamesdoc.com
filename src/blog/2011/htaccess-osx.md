---
title: .htaccess + OS X
type: article
tags: code
date: 2011-07-24 19:25:00
leadImage: /_assets/img/blog/imported/banners/htaccess.jpg
---
<p>Words cannot contain the frustration I have configuring a Apache with .htaccess files on OS X.  Having followed various online instructions I have many times open up the http.conf file (/etc/apache2/httpd.conf) and edited the line AllowOverride None to AllowOverride All. However it was helpfully not obvious that I needed to edit the section straight afterwards where there is another AllowOverride statement...</p>

<p>I hope this post saves you some bother. I can get back to work now!</p>

<p>Hat Tip: <a href="http://chibimagic.wordpress.com/2009/02/27/apache-htaccess-mac-os-x/" target="_blank">http://chibimagic.wordpress.com/2009/02/27/apache-htaccess-mac-os-x/</a></p>

