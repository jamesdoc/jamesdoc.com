---
title: Subscribe to calendar link
date: 2024-01-07
intro: Create a link to subscribe to a calendar feed in Outlook, Apple Calendar, Google Calendar, etc.
tags: ["tech"]
---

Outlook, Google Calendar, Apple Calendar have functionality that allow you to subscribe to calendar feeds; add the URL of the feed, and then it will appear (and update) automatically in your calendar. There is a standardised format called `ical` [^ical], and it contains as you would expect – events on a calendar. This is useful to subscribing to public holiday calendar feeds, key dates within shared within your company, etc.

[[toc]]

I'm currently using an iCal feed to power [The Globe Church public calendar](https://www.globe.church/calendar). Behind the scenes the events are stored in Microsoft365 which exposes an iCal feed, this is then imported to the website (via Eleventy, obviously… [have a look at the code if you want](https://github.com/theglobechurch/globe-static/blob/main/src/_data/events.js)), and then from there the feed is parsed, reformatted, and turned into a beautiful page.

This is all fine and wonderfully technical, but what happens when you want to allow a non-technical user to subscribe this calendar in their calendar software of choice (eg on their iPhone Apple Calendar, or the Android Google Calendar, or in their work's Outlook calendar) so they don't have to keep on coming back to the website… That sent me down [a rabbit hole](https://elk.zone/mas.to/@jamesdoc/111710486285195956).

## Webcal <abbr title="Universal Resource Identifier">URIs</abbr>

> WebCal allows you to create and maintain an interactive events calendar or scheduling system on a Web site or app… The Webcal protocol prefix is used to trigger an external protocol handler which is passed the URL of the .ics file rather than being passed the downloaded contents of the file, in much the same way feed is sometimes used to trigger external RSS readers
> [Webcal on Wikipedia](https://en.wikipedia.org/wiki/Webcal)

So, this means that prefixing a link to an `ics` file with `webcal://` should work for _alot_ of things… (Apple Calendar, Outlook, etc)[^1].

If your file is hosted at `https://example.com/calendarFeed.ics`, this becomes `webcal://example.com/calendarFeed.ics`. Whack that in an anchor tag (`<a href="webcal://…"`) and test it.

So that's Outlook, Apple Calendar, etc sorted… what about calendars that are in the browser such as Google Calendar?

Google Calendar has an URL that you can use to add one-off events… and [Simon](https://til.simonwillison.net/ics/google-calendar-ics-subscribe-link) pointed out that you can do something similar with a webcal link:

```txt
https://calendar.google.com/calendar/r?cid=webcal://example.com/calendar.ics
```

Finally, a bit of digging later there is a similar link for Microsoft365:

```txt
https://outlook.office.com/calendar/0/addfromweb?url=webcal://example.com/calendar.ics
```

Put that all together and you have a set a links that you can create to enable people to click and automatically subscribe to a calendar feed.

## Something to copy and paste

This is what you're here for…

```html
<ul>
  <li>
    <a href="webcal://example.com/calendar.ics">Apple Calendar or Outlook</a>
  </li>
  <li>
    <a href="https://calendar.google.com/calendar/r?cid=webcal://example.com/calendar.ics">Google Calendar</a>
  </li>
  <li>
    <a href="https://outlook.office.com/calendar/0/addfromweb?url=webcal://example.com/calendar.ics">Microsoft365</a>
  </li>
  <li>
    <a href="https://example.com/calendar.ics">iCal Feed</a>
  </li>
</ul>
```

The final [implementation can be seen on the calendar page](https://www.globe.church/calendar/), and [the code is in GitHub](https://github.com/theglobechurch/globe-static/commit/9fefa2c070349d6233127df3927565380d98b98b#diff-ae00f40612ae738f208c7481e4ed0a68c115d56ffe32e88a64bd3f070f1cf2f4).

---

Thanks to [Simon Willison's](https://simonwillison.net/about/) blog post [Providing a "subscribe in Google Calendar" link for an ics feed](https://til.simonwillison.net/ics/google-calendar-ics-subscribe-link) which got me a long way towards an answer for this.

[^ical]: Short for iCalendar… which is short for internet calendar.
[^1]: [Simon says](https://til.simonwillison.net/ics/google-calendar-ics-subscribe-link) that _"I believe this only works if you are serving your ICS feed over HTTPS"_. Worth keeping in mind, but you're hosting over HTTPS already… right?
