---
title: Side Project - Trello Overview
intro: I kicked off a side project which pulls in multiple cards on different Trello boards…
type: article
date: 2020-07-12
tags: ["11ty", "code"]
leadImage: /_assets/img/blog/2020/trello-overview.jpg
---

I think that [Trello](https://www.trello.com) is up there in my favourite online tools. It's a simple project management tool; I've used in each job I've had since leaving uni, and it has been a staple for me keeping track of other things such as [my reading list](https://trello.com/b/HQyrNteG/reading-list).

Previously I've tinkered around with the API, but it has only been recently that I used it for a live project; pulling in the reading list board onto my [reading list page](/reading-list) here on this site. Oh, the Trello API is easy to work with and [well documented](https://developer.atlassian.com/cloud/trello/rest/api-group-actions/)! All this kicked off an idea of scratching and itch I've had for a while…

The itch has been that when you have a team working on many different projects, each project will have different boards… that makes it difficult to have a top level overview of what is happening across the team. To check the status of everything that is being worked on right now you need to jump in and out of each board. It's fine, but a little bit annoying if the team has a lot going on.

Trello has a neat feature that lets you see what cards have been assigned to you across multiple boards, but you there isn't that top level picture for the whole team. This is where [Trello Overview](https://jamesdoc.github.io/trello-overview/) comes in.

## Trello Overview

Trello Overview pulls in cards from specific lists in specific Trello boards and displays them in one unified board. Think of it like a top-level meta overview of several boards.

If you work in sprints it's likely that your boards will have many lists on them ranging from a simple _Backlog_ list through to lists of cards to go into future sprints, but for the top level all that you really care about is the _To Do_, _Doing_, and _Done_ lists. Trello Overview will filter out only the lists that you care about.

It also gives you the ability to filter to display only the cards on a certain board, and also the cards assigned to a specific member of the team. It's simple, clear, and has a familiar UI to Trello.

**[Look at the demo hosted on Netlify](https://trello-overview.netlify.app/).**

This demo pulls in cards from three different boards (imaginatively titled Test Board A, B, and C) with two different members on it. The cards with the key emoji (🔑) are being pulled from private boards.

## Behind the scenes

The technology in the background is:

- [Eleventy](https://www.11ty.dev/) - The simple static site generator that I've been for a whole host of things recently.
- [Trello API](https://developer.atlassian.com/cloud/trello/rest/api-group-actions/) - Obviously.
- [TailwindCSS](https://tailwindcss.com/) and [AlpineJS](https://github.com/alpinejs/alpine) because I wanted to get better at using them (still waiting to be 100% convinced by either… but that's a different story).

As part of the Trello build process [an API call is made for each of the Trello boards](https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-get) provided in the config, this is then locally cached as 11ty builds a very simple index page.

At the moment it isn't very clever; specifically it doesn't respond to changes made in Trello, instead it waits until someone re-runs the build script. A less than clever way of automating this would be to deploy it to a server and then have a cronjob rebuild at set times in the day… or if you deploy to Netlify you can set up a [Zapier](https://flaviocopes.com/netlify-auto-deploy/) or [IFTTT](https://ifttt.com/date_and_time) trigger to hit the [build hook](https://docs.netlify.com/configure-builds/build-hooks/) URL.

## Have a play

You can have a look at [the demo site](https://trello-overview.netlify.app/), or [fork the repo](https://github.com/jamesdoc/trello-overview) and build your own.

There's plenty on the backlog, <s>if</s> when you spot a bug, or want to add a feature please put in a pull request.
