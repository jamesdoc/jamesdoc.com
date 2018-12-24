---
title: Firewall blocking git-// URLs
type: article
tags: code
date: 2015-03-06 13:26:08
---
<p> I&#39;ve just discovered that git:// urls are blocked by internal policy. Frustrating. Fortunately http:// and https://github.com/etc still work for git commands.</p><p> Frontend tools such as <a href="http://bower.io" target="_blank">Bower</a> they assume that git:// urls will be fine, which if they are not creates lots of error messages.</p><p> However you can set your git config to rewrite the default protocol with the following command in the terminal:</p><p> <code>git config --global url.https://github.com/.insteadOf git://github.com/</code></p><p> Many thanks to Tobu on <a href="http://stackoverflow.com/a/11383587/355660" target="_blank">StackOverflow</a> for pointing this one out.</p>
