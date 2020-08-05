---
title: Craft CMS, Code Snippets and PrismJS
type: article
author: James Doc
date: 2020-06-10
intro: Over at OneSheepland we've been tinkering a lot with CraftCMS. One of the recent challenges was to output code snippets from a Redactor text field…
canonical: https://onesheep.org/insights/craft-cms-code-snippets-and-prismjs
---

In the coming weeks and months ahead in this Insights section we're going to be posting a few tips and tricks that we've discovered as we have been building sites for our partners. One of the key things we've needed on this site to make that possible is the ability to display code snippets in these blog posts…

```html
<h1>Like this HTML block</h1>
```

This syntax highlighting is handled by PrismJS, which touts itself as:

> Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind. It’s used in thousands of websites, including some of those you visit daily.

Behind the scenes here we're running a standard version of [Craft CMS 3](https://craftcms.com/), with [Laravel Mix](https://laravel-mix.com/) looking after webpack (because a wrapper around Webpack is better for everyone). Craft has a wonderful plugin community that has built many wonderful things, including Josh Smith's [Prism Syntax Highlight plugin](https://github.com/thejoshsmith/craft-prism-syntax-highlighting), however support for Redactor, Craft's WYSIWYG, hasn't been built yet… so we need to build something custom.

At time of writing we're using:

- Craft CMS v3.4
- Craft Redactor Plugin v2.6
- Prism JS v1.3

## Pull in Prism

There are a couple of ways of doing this (such as injecting a `<script>` tag) but it is [packaged on NPM](https://www.npmjs.com/package/prismjs), and there is a [handy babel plugin](https://github.com/mAAdhaTTah/babel-plugin-prismjs) to do some set up for us:

```bash
npm install prismjs babel-plugin-prismjs
```

One of the benefits of Prism, is the [additional plugins that it comes with](https://prismjs.com/#plugins), installing from NPM will pull them all into your node_module folder, but they won't get pulled in straight away; you need to add them to your .babelrc file (if you don't have one and are using Laravel Mix, just create one, it'll know what to do with it):

```json
{
  "plugins": [
    [
      "prismjs",
      {
        "languages": ["javascript", "css", "markup", "php"],
        "plugins": ["show-language"],
        "css": false
      }
    ]
  ]
}
```

We're adding Prism JS, telling it what languages to look out for, pulling in a plugin, and telling it not to pull in the CSS (that's up to you, we're going to handle the CSS differently later)…

Jumping over to your main Javascript file you can import Prism:

```javascript
import Prism from "prismjs";
Prism.highlightAll();
```

## Adding in the styles

Prism comes with a number of different themes you can use, and modify to match your site. If you're going via the babelrc file, [you can configure it there](https://github.com/mAAdhaTTah/babel-plugin-prismjs#configuring-the-plugin). We've got a slightly different method of CSS here, with Tailwind + SCSS coming together. Laravel Mix handles that nicely. On the Prism download page you can pull down the relevant CSS file, or you can fish it out of node_modules/prismjs/themes and import / bundle it with Mix (or your preferred bundler. Or if you would prefer to use a <link> tag, or just copy and paste the CSS straight into your CSS file, you can do that too…

## In Redactor…

Over in Craft CMS and Redactor you need to make sure that the code that you want to be highlighted is wrapped as Prism wants it… In a `<pre><code class="language-"></code></pre>` or just a `<code class="language-">…</code>` tag. Eg:

```html
<pre>
  <code class="language-css">…</code>
</pre>
```

If you haven't enable the HTML view in Redactor json config you're going to want to do that so you can tell Prism which language to look at. In Craft, the Redactor config file(s) are found in `<code class="language-">config/redactor/{settingsFile}.json</code>`.

And that's it. Write your blog post, add your code, and hit publish.

## The gotcha (whitespace)

You may find that Redactor / Craft CMS rips out `&nbsp;` and replaces them with normal spaces - that means that your code formats really badly! In Craft admin, in the field you have put Redactor on, under Advanced untick 'Replace non-breaking spaces with regular spaces'.

## There's more you can do…

Inspired by [Mike Street's blog post about his integration of Prism and Craft](https://www.mikestreety.co.uk/blog/making-craft-cms-work-with-prism-js-using-pre-and-code-blocks) our Javascript has the following lines to mean that need to wrap code with a `<pre class="language-javascript">…</pre>`:

```js
var elements = document.querySelectorAll("pre");
if (elements !== null) {
  Array.prototype.forEach.call(elements, function (el, i) {
    el.innerHTML =
      '<code class="' + el.className + '">' + el.innerHTML + "</code>";
  });
}
```

Also, to simplify the process further, we're running the [Redactor Custom Styles plugin](https://github.com/carlcs/craft-redactorcustomstyles). This allows additional buttons and dropdowns to be added to Redactor that create elements with classes added automagically.

Our `article.json` Redactor config has the following (and a little bit more) in:

```json
{
 "buttons": [...],
 "plugins": ["customstyles"],
 "customStyles": {
  "style": {
   "dropdown": {
    "codeBlock": {
     "args": {
      "tag": "pre",
      "class": "language-",
      "type": "toggle"
     }
    },
   }
  }
 }
}
```

All we have to do now is remember to go back and finish off that class to indicate the language for Prism.

## Further reading

- [PrismJS](https://prismjs.com/#basic-usage)
- [Redactor Config in Craft](https://github.com/craftcms/redactor#redactor)
- [Redactor Custom Styles Plugin](https://github.com/carlcs/craft-redactorcustomstyles)
