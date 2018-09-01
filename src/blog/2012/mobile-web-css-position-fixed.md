---
title: Mobile Web- CSS position- fixed;
type: article
tags: code
date: 2012-01-14 15:17:24
leadImage: /_assets/img/blog/imported/banners/mobile-web-css-position-fixed.jpg
---
<p>Thanks to <a href="http://lncn.eu/ekrt">Aarron Walter's</a> <a href="http://lncn.eu/cdfv">talk at FOWD</a> last year I've started a side project. And it's great because I get to test and experiment with new techniques, I get to learn new skills and I get to do a bit of independent thinking. I&#39;m loving it because I&#39;m seeing an idea from start to finish! Right now I&#39;m designing and prototyping; there is paper everywhere; it&#39;s fantastic!</p>
<p class="p1">
 I&#39;m sure that I&#39;ll expand more regarding this project in a later blog, however right now all that you need to know is that I&#39;m working on a small web application (*surprise*).</p>
<p class="p1">
 At the moment I&#39;m thinking a lot about the user interface and the user experience while a user is engaging with the site. One of the things I&#39;m trying to do is create an interface that is familiar and recognisable, following Nielson&#39;s heuristic guideline of &#39;<i>recognition rather than recall</i>&#39; (see&nbsp;<a href="http://www.useit.com/papers/heuristic/heuristic_list.html"><span class="s1">useit.com</span></a>&nbsp;for more info). One of the design elements that is used heavily featured mobile interfaces is a banner going across the top and bottom of the screen. Normally the top banner is used for a logo perhaps with a search icon and the footer is used for action buttons, enabling the user to navigate through the app.</p>
<p class="p1">
 So my initial thought was &#39;<i>great; that will be really easy to reproduce with CSS</i>&#39;. There is a fantastic property within CSS called &#39;<i>position</i>&#39;. By giving an element the property <i>position: fixed; top: 0;</i>&nbsp;the element is always visible, staying fixed to the top of the screen even when you scroll up and down the page. So, by applying this to a banner on the page the application&#39;s title and search link will always stay visible to the user through out the app.</p>
<p class="p1">
 However it appears that in almost all mobile browsers <i>position: fixed;</i> behaves bizarrely, it gives an awful user experience and rarely fixes the element to the top of the screen. I&#39;ve found&nbsp;<a href="http://vimeo.com/31894069"><span class="s1">this video</span></a>&nbsp;by&nbsp;<a href="http://bradfrostweb.com/"><span class="s1">Brad Frost</span></a>&nbsp;which demonstrates just how bad mobile support for <i>position: fixed</i>&nbsp;really is.</p>
<p class="p1">
 After a lot of hunting around on the internet for a solution to this problem I came across several potential solutions involving JavaScript such as&nbsp;<a href="http://cubiq.org/iscroll-4"><span class="s1">iScroll</span></a>&nbsp;or the&nbsp;<a href="http://jquerymobile.com/test/docs/toolbars/bars-fixed.html"><span class="s1">jQuery Mobile UI</span></a>. I just can&#39;t help but feel this is over-complicating the solution a little bit&hellip; also I don&#39;t want to compromise the speed of my site by downloading another framework.</p>
<p class="p1">
 So, I&#39;m throwing the question out there&hellip; does anyone know how to make this work without falling back to JavaScript? Currently I&#39;ve got the to stage of frustration that I&#39;ve remodelled without these banners.</p>
