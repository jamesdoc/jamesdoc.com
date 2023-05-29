---
title: Content Drilldown with the Google Analytics Core Reporting API
type: article
tags: code, vam
date: 2014-12-17 15:30:39
---
Today I've been trying to replicate the content drilldown function from Google Analytics through their Core Reporting API. The solution I came to requests pagePathLevel# in the dimension, and then filters on various `pagePathLevel#`:

For example if you wanted to the page views for the content drilldown at `/level1/level2/level3` you could run this:

```
id=ga:#######
metrics=PageView, Sessions, etc
sort=-ga:page views
start-date=2014-11-16
end-date=2014-12-16
filters=ga:pagePathLevel1==/level1/;ga:pagePathLevel2==/level2/dimensions=ga:pagePathLevel3
```

A handy tool to test these queries is the <a href="https://ga-dev-tools.appspot.com/explorer/" target="_blank">Google Analytics Query Explorer</a>.

In my case I wanted to get a list of the <a href="http://www.vam.ac.uk/page/e/exhibitions/" target="_blank">most popular exhibitions at the V&amp;A</a>. The URL structure is: content/exhibitions/[expo-slug], so the query I am running is:

```
id=ga:#######
dimensions=ga:pagePathLevel3
metrics=ga:pageviews
filters=ga:pagePathLevel1==/content/;ga:pagePathLevel2==/exhibitions/
sort=-ga:pageviews
start-date=2014-11-1
end-date=2014-12-16
max-results=50
```

Right now, <a href="http://www.vam.ac.uk/content/exhibitions/exhibition-constable-the-making-of-a-master" target="_blank">Constable</a> and <a href="http://www.vam.ac.uk/content/exhibitions/exhibition-horst-photographer-of-style" target="_blank">Horst</a> are top of the list!

Hopefully this will help someone else.</p>
