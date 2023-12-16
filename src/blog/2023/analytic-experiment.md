---
title: Experimenting with analytics via Tinylytics
date: 2023-12-15
intro: I ripped Google Analytics out of my blog a number of years ago, and now I'm experimenting with Tinylytics…
tags: ["tech"]
---

The Christmas holidays have begun, which means that I have a bit of time to tinker… I can't remember _when_ I stopped using Google Analytics, but it was probably when I moved across to using [Eleventy](https://11ty.dev). However I recently came across [Tinylytics](https://tinylytics.app/) and figured I'd give it a try.

There are a number of <abbr title="Google Analytics">GA</abbr> alternatives out there such as [Fathom](https://usefathom.com/) or [Plausible](https://plausible.io/) which by all accounts are good, however I've always been put off from poking with them because of a lack of basic free tier. This site is a playground, not something that I want to put any $$$ investment into. Tinylytics has a [free tier](https://tinylytics.app/why-a-free-plan), so let the experimenting begin!

## Set up

Sign up and set up for an account is trivially simple; once the account is created you get an ID, [a couple of lines of JavaScript to add](https://github.com/jamesdoc/jamesdoc.com/commit/8e11d620099e9fc69ed22f97fdf8f2366256b4a0). Deploy it and then you're done. Now you're getting analytic data.

## What data?

Tinylytics is tiny– it simply tracks page views. No more, no less.  Behind the scenes the domain and path is being POSTed to the Tinylytics server. Nothing else. This enabled a simple dashboard of a list of pages and a hit counter next to them.

What you get out on the Tinylytics page is a list of pages with a number next to them. Helpful for working out which pages are popular, and which ones are not. Or in my case, which posts from many years ago still have good SEO juice even though they are probably very out of date technically!

## Helpful things to know

- It'll only track from the domain it is registered to– meaning that local development won't trigger hits. That's nice.
- You can also ensure that [it doesn't track your hits](https://tinylytics.app/docs/ignore_your_hits) when running on production. That's handy too.

## What next?

I'm planning to leave this running for the foreseeable future. I highly doubt that I'll max the 1000 page view limit of the free plan, and see what people are interested on reading here! Turns out that yesterday my post about [moving mail from Yahoo Mail to Google Workspace](https://jamesdoc.com/blog/2020/yahoo-mail-workspace-import/) was popular… a whole four hits!

Thanks [Vincent](https://vincentritter.com/).
