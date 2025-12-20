---
title: Responsive images in Eleventy
intro: Adding responsive images to my 11ty build has been on my to-do list for a while… I've finally got it working 🎉
type: article
tags:
  - 11ty
date: 2018-12-26
leadImage: /_assets/img/blog/2018/rwd-images-11ty.jpg
---

> ⚠️ This post is not how I do things any more
> The official [Images plugin from Eleventy](https://www.11ty.dev/docs/plugins/image/) is great, and solves all my responsive image needs.

There's nothing quite like a little bit of Christmas eve coding… Adding responsive images to my [Eleventy](https://www.11ty.dev/) (11ty) build has been on my to-do list for a while… I've finally got it working 🎉. And on the basis that I couldn't find a write up of how other people have done it… this is how I've got mine set up.

## Generate all the images

_**May 2020 Update:** I changed this step when I migrated away from Gulp. [Read about the degulpification](/blog/2020/degulpification/)_

When I switched my site across to 11ty I used Gulp as my build tool. There is a handy image generator which you can point at a folder and it will generate different sized images based on a set of configuration. Imaginatively it is called [Gulp Responsive](https://www.npmjs.com/package/gulp-responsive).

You can see the (basic) configuration I'm using over in this [Github commit](https://github.com/jamesdoc/jamesdoc.com/blob/586e6e107ad8f83669831d7df73fe58af2bec676/gulpfile.js#L31-L53). The summary version is that I generate two smaller versions of the input image which have their image width added into the file name (`exampleimage-550.jpg`) and all the metadata is stripped out for a small file size. The newly generated images are then exported into the build folder.

## From the front matter

My blog posts are all written in Markdown, they have a little bit of custom meta-data stored in [Front Matter](https://www.11ty.dev/docs/data-frontmatter/). One specific bit is the lead image which is output at the top of this blog post.

The front matter stores the original image path, which is fine, however the new image tag requires the modified filename which includes the image width. To get this working I've added a [universal filter](https://www.11ty.dev/docs/filters/#universal-filters) in my 11ty config file which takes in an image path and an image size and returns the correct URL for the image:

<script src="https://gist.github.com/jamesdoc/a6b6c38b0b7e6addc1611c833dc7513e.js"></script>

## Into the Markdown

The images that are included by referencing them in the Markdown is different - you can't fix that with a filter from 11ty.

11ty (in it's default) setup uses [markdown-it](https://markdown-it.github.io/) for Markdown parsing. This is good because markdown-it is remarkably extensible, and people have. So, enter [markdown-it-responsive](https://www.npmjs.com/package/@gerhobbelt/markdown-it-responsive) which _"…overloads original image renderer of markdown-it"_.

Having got that installed in the 11ty config file, you can feed in a couple of options and enjoy new image tags in your HTML:

<script src="https://gist.github.com/jamesdoc/6e558599d462977aa3f32873662bc110.js"></script>

The output can be seen here:
![Ooh, responsive images from eleventy](/_assets/img/blog/2018/rwd-images-11ty.jpg)

The commits I made over the course of doing this show the progress of this. I also used the time to do a little bit of tidying up around the place:

1. [Generate images](https://github.com/jamesdoc/jamesdoc.com/commit/6d25c00d73071d004501044523e94b35ce119ef8)
2. [RWD the lead image](https://github.com/jamesdoc/jamesdoc.com/commit/7241215de159da6b2de7fcfb019bfb66de1f5691)
3. [Overload markdown-it image tags](https://github.com/jamesdoc/jamesdoc.com/commit/36f1c3972ba7837050d30cea485f977a5fe286bd)
