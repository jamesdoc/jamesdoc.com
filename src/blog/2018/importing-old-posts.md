---
title: Importing old posts
intro: I've been writing blog posts (of varying quality) since 2006. One of the things that I always dread about moving blogging platforms is the export and import process…
type: article
tags:
  - 11ty
date: 2018-09-01
---

I've been writing blog posts (of varying quality) since 2006. One of the things that I always dread about moving blog platforms is the export and import process. This morning I managed to get all the blog posts across surprisingly quickly.

The last system I was using that the posts existed in was a simple MySQL database (simple because I built it quickly in 2010). I still haven't turned off my old hosting which provides a PHP MySQL interface so I able to export all that history to a JSON file in one click.

A few lines of Python later and there is a simple method of opening up the JSON file and outputting a new MarkDown file for each blog post complete with Front Matter. [The Gist is on Github](https://gist.github.com/jamesdoc/564b70613121265027bb232bddfee437).

<script src="https://gist.github.com/jamesdoc/564b70613121265027bb232bddfee437.js"></script>

The other thing I dread about moving platforms is the words in those old posts… Each time I flick back through the older posts, I remember that I really don't recommend reading the blog posts pre 2010… I mean, teenage me had far too much time on his hands, and decided to use that to [write mostly drivel](http://localhost:8000/blog/2008/what-have-they-done-to-you-pleo/)…

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Currently reading through blog posts I wrote when I was 16… Blegh. Trying to work out if I want to put them back online for the history of it all…</p>&mdash; James Doc (@jamesdoc) <a href="https://twitter.com/jamesdoc/status/1035827160676745217?ref_src=twsrc%5Etfw">1 September 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

But, it feels wrong to just delete them. So they are there. For the histories. It made sense to include a health warning at the top of those posts so I've added a new filter my 11ty config to warn people if they stumble upon them:

```
eleventyConfig.addFilter("dateComparison", (dateObj, compareWith)=> {
  return DateTime.fromJSDate(dateObj) < DateTime.fromISO(compareWith)
})
```

You can see it being used in my [post template file](https://github.com/jamesdoc/jamesdoc.com/commit/b3e0b2bfef5fb609a4e14a1ef5a7b65eb629bcf9#diff-aa8ef715ceaaf08525acde64154ad888R15).
