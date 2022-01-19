---
title: Lessons from Netlify CMS
type: article
tags: ["11ty", "code"]
author: James Doc
date: 2021-01-19
intro: Notes for future James, and maybe current you, about implementing Netlify CMS.
---

Over at OneSheep we've just launched the new website for [Carnelian Search](https://carneliansearch.com). Carnelian is company who works with charities or social impact organisations to help them fill leadership position such as executive, director or trustee roles. Behind the scenes of their new site is a fresh [Eleventy](https://www.11ty.dev/) build, with [Tailwind CSS](http://tailwindcss.com/), and a small sprinkling of [AlpineJS](https://github.com/alpinejs/alpine/), all deployed on top of [Netlify](https://www.netlify.com/). We think it's come together well.

This is the first Eleventy site that we've handed over to partner - up until this project I've been nervous about such things - Eleventy requires asking non technical users to edit markdown files, commit them to a git repo, deploy the changes. Yuck. And I know you can pull the content from an API served up by another tool, but by the time you've done that we might as well have built this site in that CMS like CraftCMS, SquareSpace, or WordPress.

The gamechanger - [Netlify CMS](https://www.netlifycms.org/).

Netlify CMS drops into your Eleventy static site and makes every data controlled element of your site content editable. For free. Like magic. And then commits it to your git repo. More magic.

There are tutorials both written and video all over the internet, this isn't a start from scratch post, instead some notes for you, and future James, for some lessons learnt along the way.

## The config.yml file is the best and worst of Netlify CMS

All the setup for Netlify CMS happens in the `config.yml` file. In this file you define all your configuration, from the branch that it will commit changes to through to the data types (widgets) of content editable fields.

Having everything in one place is great - you can quickly skim through it to check and look things up, make changes, etc. However, one mistake, one piece of malformed `yaml`, missing indent, etc, and your CMS is gone.

The best thing I've found is get into object notation in the `yaml` as quickly as possible. The [introduction to the config file](https://www.netlifycms.org/docs/configuration-options/#configuration-file) in the documentation says this:

> Note that YAML syntax allows lists and objects to be written in block or inline style, and the code samples below include a mix of both.

While object notation is just as unforgiving, it is a lot easier to eyeball and spot an error in a complex config file.

Maybe I just wish it was a JSON file?

An example of the `config.yml` file being used on the Carnelian Site is [on Github](https://github.com/carneliansearch/carneliansearch.com/blob/main/src/admin/config.yml).

## Make sure you process your images at the build stage

Editors can upload images through Netlify CMS. This is really powerful and such an important feature for this tool.

It also means that your editors can upload 100mb jpeg images if they want to, and your static site will just spit them out. Always always always process your uploaded images before outputting them to protect your front-end file size.

There are many ways of processing your images depending on your build process, for Carnelian Search I've reached for the [image plugin for Eleventy](https://www.11ty.dev/docs/plugins/image/). It's simple to use, outputs useful image formats (include `webp` and `avif`), and lets you have control of your HTML too.

## Set some sort orders

Netlify CMS will automagically sort your content by title, author, date (sometimes) and description. Sometimes this automagicalness is helpful. Overriding that, and being explicit about the the sort order is helpful too.

Blog posts should be sorted by date. It's okay to be opinionated.

You can override sort order in the `config.yml` file with the `sortable_fields` key. [Details in the documentation](https://www.netlifycms.org/docs/configuration-options/#sortable_fields).

## Test with Netlify CMS locally

As a developer you don't need to use the CMS - you have access to the markdown files, to the JSON data sources, you can go in an edit that stuff manually. It's quicker, simpler, etc. However running Netlify CMS locally and using it regularly helps you understand what your editors are going to be doing. There are elements of it that are not obvious in the CMS, and getting to know it well as an editor helps you to be able to hand over well.

You can run Netlify CMS locally with the command:

```
npx netlify-cms-proxy-server
```

Or, because I forget that, add it to your scripts in `package.json` so you can instead run

```
npm run cms
```

## Final words

There will be more lessons to learn with Netlify CMS. But I'm convinced that it is a gamechanger for building small and simple static sites. It's going to become a primary tool in my toolbox when a 'big' CMS such [Craft CMS](https://craftcms.com/) is just too much and we don't want a server to manage. I'll even get over my dislike of `yaml` for it.
