---
title: RSS + Eleventy
date: 2019-10-24
intro: It turns out that adding RSS into 11ty is pretty simple…
type: article
---

When I switched this site [across to Eleventy](/blog/2018/11ty/) I left myself with a to-do list which I've slowly been working through- one of them was to re-implement the [RSS feed](https://en.wikipedia.org/wiki/RSS). Good news, I did that this evening. Turns out it was really simple 🎉

The steps are trivial:

1. [Install the Eleventy RSS plugin](https://github.com/11ty/eleventy-plugin-rss) and follow the two step instructions and [the sample](https://github.com/11ty/eleventy-plugin-rss/blob/master/sample/feed.njk).

The other two things that are useful to do:

**One**: Add the RSS feed to the `head` with a `link` tag:

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="Blog RSS"
  href="/blog/feed.xml"
/>
```

**Two**: Exclude files that shouldn't be there from collections (like the [blog listing page](https://github.com/jamesdoc/jamesdoc.com/commit/01167cab36485cb83af84a24719e58d1fdf390af)).

```json
eleventyExcludeFromCollections: true
```

I realise that I might be too [late to the party](https://techcrunch.com/2018/04/07/rss-is-undead/) on this and [everyone has gone home…](https://www.vice.com/en_us/article/a3mm4z/the-rise-and-demise-of-rss)
