---
title: Grouping blog posts by year in Eleventy
intro: Create an archive page grouped by year (or anything you want!) using 11ty's built in pagination and a modified collection.
type: article
author: James Doc
tags: post
date: 2021-01-26
leadImage: /_assets/img/blog/2021/group-by-year.png
themeColor: hsl(187, 97%, 42%)
---

It's been on my list to get a good archive page of blog posts for a while, [^todo] more than just simple pagination where you have to click though posts in groups of six at a time… Instead grouped by the year they were published. I had a hunch that that [11ty's pagination tool](https://www.11ty.dev/docs/pagination/) would help me out, I just hadn't worked it out until this weekend…

<small>**[Skip the rest of the intro and take me to the code](#the-code)**</small>

## More preamble

The pagination tool is really clever because you can paginate pretty much any data format that Eleventy can consume. [^paginationdata] For example, if you have a JSON file containing a list of people, you can paginate that file and turn out a page for each author. And with that you can also paginate over a [collection](https://www.11ty.dev/docs/collections/). A collection is 11ty's way of grouping data together - all the blog posts on this site exist in markdown, but are grouped together in the collection `posts` ([see the code](https://github.com/jamesdoc/jamesdoc.com/blob/e6b9018a4ef880c0773da6e6ed87d5a1d516ec7b/utils/collections.js#L20-L22)). The pagination can loop through this and chunk them into groups. However, [while you can manipulate the data as the pagination is being performed](https://www.11ty.dev/docs/pagination/#the-before-callback), it doesn't do the grouping by year which is what we need.

To get the grouping by year we first need to create a new collection of data that structured by year, and then pass that to pagination. What we're aiming for is something like:

```json
[
  [2021]: [{post-one}, {post-two}],
  [2020]: [{post-one}, {post-two}, {post-three}]
  [2019]: [{post-one}]
]
```

Warning - there are horrible things ahead with array keys…

<a id="the-code"></a>

## The implementation

First we're going to need to create a new collection grouped by year. To keep my `.eleventy.js` clean I've extracted this into a new file called `collections.js`:

```javascript
const dayjs = require("dayjs");

// This is a little bit over engineered, but I _may_ want to filter by more than just year later down the line…
function getByDate(collection, dateFormat) {
  let postsByDate = {};
  // Update this to point to where you want to get your posts from:
  let posts = collection.getFilteredByGlob(["./src/blog/**/*.md"]);
  posts.forEach(function (post) {
    // Get the year from the date
    let d = dayjs(post.data.date).format(dateFormat);
    // Create a new array key with the year
    if (!postsByDate[d]) {
      postsByDate[d] = new Array();
    }
    // Add the post to the year array key
    postsByDate[d].push(post);
  });
  return postsByDate;
}

// Create the new collection
exports.postsByYear = (collection) => {
  return getByDate(collection, "YYYY");
};
```

In your `.eleventy.js` file you can then loop through the collections exported from the `collections.js` file and `addCollection`:

```javascript
const collections = require("./collections.js");
module.exports = function (eleventyConfig) {
  //…
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });
  //…
};
```

The result will be that Eleventy now has the collection `collection.postsByYear`.

With this done, you can jump into the frontmatter in one of your template files and add the following keys:

{% raw %}

```markdown
---
title: Blog
permalink: "blog/{% if pagination.pageNumber > 0 %}{{ posts }}/{% endif %}index.html"
pagination:
  data: collections.postsByYear
  size: 1
  alias: posts
  reverse: true
---
```

{% endraw %}

The important thing to notice here is that the `size `of the pagination is set to `1` - or in English - one page for each year. We're also re-writing the `permalink` to create a url of `/blog/####/index.html`.

Now, in the body of the template we can loop through `postsByYear` collection, based on the year set by the pagination:

{% raw %}

```html
<ul>
  {% for post in collections.postsByYear[posts] | reverse %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </li>
  {% endfor %}
</ul>
```

{% endraw %}

Add some [pagination navigation ](https://www.11ty.dev/docs/pagination/nav/) to the bottom of your template. And you've got an archive-by-year page from a collection in Eleventy.

You can see it in action at the bottom of the [Thoughts listing](/blog) and [the related commit on Github](https://github.com/jamesdoc/jamesdoc.com/commit/e6b9018a4ef880c0773da6e6ed87d5a1d516ec7b).

[^todo]: This item has been on my todo list for this site since [I moved this site across to Eleventy in August 2018](/blog/2018/11ty)… It's good to have another one ticked off the list!
[^paginationdata]: There is _so_ much you can do with [data and pagination](https://www.11ty.dev/docs/pagination/#paginate-a-global-or-local-data-file), it's really clever.
