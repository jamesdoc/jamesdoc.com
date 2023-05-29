---
title: Implementing View Transitions in Two Minutes
date: 2023-05-29
intro: View transitions are one of the latest and greatest things to be working their way through the web specifications; and they are pleasingly simple to implement.
tags: ["tech"]
---

At the moment view transitions are still being implemented, but it doesn't mean that you can't get ahead of the curve and experiment with them. However they're not enabled by default; so in Chrome Canary you'll need to toggle the following settings first:

```
chrome://flags#view-transition
chrome://flags#view-transition-on-navigation
```

## Cross fade

The default behaviour for view transitions is a simple cross fade between two pages and to get that working all you need to do is add this `meta` tag to the `<head>` of your page:

```
<meta name="view-transition" content="same-origin">
```

Deploy that, and you're done. This will give you a cross fade between every page. Nice and neat.

## Going further

There's a lot more power in view transitions, but that will take you more than two minutes to implement. However, not by much; 28 lines of CSS, and 3 tweaks to the HTML later and there is a nice tween between the blog listing page and the blog post itself. You can see [the related commit on Github](https://github.com/jamesdoc/jamesdoc.com/commit/4d825f7823717672b0a14410af6c5a4aa771ffad).

## More words

Many more words have been shared about view transitions… I have particularly enjoyed and benefited from these ones:

- [Dave Rupert: Getting Started with View Transitions](https://daverupert.com/2023/05/getting-started-view-transitions/)
- [Jeremy Keith: Adding View Transitions to Your Site](https://adactio.com/journal/20195)
