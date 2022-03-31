---
title: Preventing Google Chrome from Hijacking Your Media Keys
type: article
author: James Doc
date: 2022-03-31
intro:
tags: ["tech"]
themeColor: hsl(215, 79%, 46%)
---

Chrome likes to steal your media keys - the play/pause buttons on your keyboard and then map them through to YouTube, or similar media. This is regardless of if Chrome has focus, or if the tab has focus - you can have a paused YouTube window in the background, want to pause your music via Spotify, hit the pause button on your keyboard… and suddenly you have Spotify still playing, and the YouTube video.

Nightmare.

To stop that from happening Chrome has a setting that you can toggle to disable this:

> chrome://flags/#hardware-media-key-handling

Copy that URL into the address bar, switch the setting from _default_, to _disabled_, and then reopen Chrome.



<small>_I'm documenting this here because every nine months (or so) I forget this, and need to look it up._</small>
