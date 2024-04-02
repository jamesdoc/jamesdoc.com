---
title: Changing a site's URL slug in Sharepoint
date: 2024-04-02
intro: You've got a Sharepoint site with a URL testSite2… you can fix that!
tags: ["tech", "til"]
themeColor: hsl(183, 91%, 22%)
---

I've recently needed to get my head around Sharepoint… as someone who has spent most of their time in Google Workspace this is a whole new world to me! What's interesting about jumping into the Microsoft 365 is you're never a few clicks away from uncovering a UI that looks like it was built in 2010. Today's challenge was trying to change the URL of a Sharepoint site that had started life as 'Test Group 2' with the slug 'testGroup2'… not pretty.

You'll need to be a Sharepoint administrator to do this…

1. Go to the [Sharepoint Admin Centre](https://go.microsoft.com/fwlink/?linkid=2185220)
2. Find the site name that you want to update
3. Under _Site Address_ you'll find an edit button and there you'll be able to update the slug

Once you click apply Sharepoint will make the site readonly while it updates all the different URLs. It will then restore access when it has been completed… so if this is a large well used Sharepoint site, you may want to wait until out of office hours before making that change.

When you change the URL Sharepoint will automatically set up the redirect from the old to the new, so you don't need to worry about that.
