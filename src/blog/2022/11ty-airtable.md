---
title: Using Airtable as a CMS for Eleventy
type: article
author: James Doc
date: 2022-01-17
intro: On a recent project I've been experimenting with adding Airtable as a content management system for Eleventy. In this post I document the notes around how I've got a simple set up running…
tags: ["tech", "11ty", "code"]
themeColor: hsl(344, 99%, 58%)
---

On a recent project I've been experimenting with adding Airtable as a content management system for Eleventy (11ty). Below I document the notes around how I've got a simple set up running…

Because tech posts tend to date, I'm using the following npm packages… there may be modifications needed for newer (or older) releases!

- @11ty/eleventy: v0.12.1
- @11ty/eleventy-cache-assets: 2.3.0
- airtable: 0.11.1

I'm going to make some assumptions- firstly that you know how to use Airtable, and you have a basic table set up already. And secondly you know the basics of 11ty.

To summerise what we're aiming for… when 11ty generated the site it will pull data in from a table view within Airtable, and then use that to populate a page or create a set of pages, and we're going to make sure that it is cached for a day for local development.

An early commit of this work [can be found in Github](https://github.com/kingdom-code/kingdom-code/commit/f13156f2c1a090ab50697a901710740928a64747), and the resulting Airtable powered page is the [Kingdom Code Jobs board](https://kingdomcode.org.uk/jobs).

## .gitignore

Because we're setting a cache, and we're going to need an environment file to store the Airtable API key we want to make sure that we're never going to commit these things to the git repo. In your `.gitignore` file add the following:

```txt
.cache
.env
```

## Install your packages

The three packages we're using here are:

- **Eleventy Cache Assets**- to locally cache what we get from Airtable so we don't need to go back to Airtable every time we make a change during development.
- **Airtable JS Library** - to do the heavy lifting of talking to Airtable and handling the response
- **dotenv** - so we don't have to hard code any API keys into our code.

```
npm install @11ty/eleventy-cache-assets airtable dotenv
```

## Get the details from Airtable

From Airtable you're going to need the following things:

1. An API key. You get this from [the account page](https://airtable.com/account) within Airtable, and find the API section.
2. The table or base ID - this is the first ID string in the URL when you open a new table
3. The base view name - this is the name that you've given your filtered data in the sidebar on the left in Airtable.

The API key should get placed into a new `.env` file in the root folder. We don't want that in our git repo though- so make sure it is in your `.gitignore`:

```txt
AIRTABLE_API = "API KEY FROM AIRTABLE"
```

## Create a JavaScript data file

> You can export data from a JavaScript file to add data, too. This allows you to execute arbitrary code to fetch data at build time. [^11tyData]

This means that we can do an API call to Airtable as the site builds - and the data that is returned is automagically exposed to our templates.

Example code is in [the gist below](https://gist.github.com/jamesdoc/11a91c4d8bf751be55cb5ba26171aeb2), but in summary what we're doing here is:

1. Setting up a new item within the 11ty cache with `new AssetCache(assetCacheId);`
2. Checking if the cached item exists or is valid, if it is, then returning it rather than calling the Airtable API with `if (asset.isCacheValid("1d"))`
3. Using the Airtable JS library we pull the data from a specific view in our table: `base(airtableTable).select({…`. We could do a lot of filtering of the data in JavaScript, but I prefer to keep this in Airtable so it is possible for a non-technical editor to see what is going to be published.
4. With the data returned we add it to the 11ty cache: `asset.save(allDatasets, "json");` before resolving the JS promise with the data.

<script src="https://gist.github.com/jamesdoc/11a91c4d8bf751be55cb5ba26171aeb2.js"></script>

<small><a href="https://gist.github.com/jamesdoc/11a91c4d8bf751be55cb5ba26171aeb2" target="_blank">View the gist on github</a></small>

## Build a page with your data

At this stage you can make a test with your new data. With 11ty anything within the `data` folder is exposed in the global data structure with the file name as the key in the data object. So if you've named your data file `airtableData.js`, you're able to access in your views with `{% raw %}{{ airtableData }}{% endraw %}`.

This means that in a new view you'll be able to have the following to test your view:

```html
{% raw %}{% if airtableData.length %}
  {% for item in airtableData %}
    {{ item | dump }}
  {% endfor %}
{% else %}
  <p>No data pulled from Airtable</p>
{% endif %}{% endraw %}
```

When you trigger an 11ty build the first time round 11ty will pull the data from Airtable, store the returned JSON in the `.cache` folder, and then deliver it to the template for you to use as any other data in 11ty.

## Bonus task - deploy 11ty from Airtable (via Netlify)

I'm hosting most of my 11ty projects with [Netlify](https://https://netlify.com/) which has the deploys triggered by commit. By pulling the data out of the deploy push to deploy doesn't work… so it would be nice to be able to trigger the deploy from Airtable.

Helpfully, Netlify gives you a 'Build Hook' URL, even on the free plan. You can read [all about build hooks on the Netlify Documentation](https://docs.netlify.com/configure-builds/build-hooks/), however the summary is that you submit a `POST` to the unique URL, and a deploy is triggered.

Airtable allows you build custom 'apps' in each table, which can be hooked up to run some JavaScript… so three lines of JS later and you have a very simple deploy button within Airtable:

```javascript
const deployHook = "https://api.netlify.com/build_hooks/[[ YOUR HOOK ID ]]";
output.markdown(`Deploying to **Netlify**.`);
const request = await fetch(deployHook, {method: 'POST'});
```

Very simple… there's lots of areas where this can be improved on, but it's simple enough to do the job.

[^11tyData]: Reference from [11ty Documentation: JavaScript Data Files](https://www.11ty.dev/docs/data-js/)
