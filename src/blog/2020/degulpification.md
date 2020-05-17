---
title: Degulpification
type: article
author: James Doc
date: 2020-05-17
intro: When I rebuilt this site on top of Eleventy Gulp was very firmly wedged in my toolbox… over the last few weeks in the odd spare moment I started the process of degulpification…
---

Back in 2018 when I migrated the site [from Codeigniter to Eleventy](/blog/2018/11ty/) [Gulp](https://gulpjs.com/) was very firmly in my toolbox. It's been a while since I started a new project with Gulp, tending to favour [Laravel Mix](https://laravel-mix.com/), however Mix doesn't feel right for Eleventy.

About a month ago [Max Böck](https://mxb.dev/) shared his Eleventy starter kit call [Eleventastic](https://github.com/maxboeck/eleventastic), it were a whole host of clever things that I didn't know you could do… of note, the `*.11ty.js` template files ([docs](https://www.11ty.dev/docs/languages/javascript/)) which Max used to sort his CSS, JS and SVG.

Having dug into his code, pulled some across directly (the JS), modified others (CSS and SVG), and used to write my own ([responsive images](https://github.com/jamesdoc/jamesdoc.com/commit/3b03ce38e596d324ea9b78009d1e72081ee45e9e)), the build steps of this site are now 100% degulpified.

As with so much of my work with Eleventy it has been a result of standing on the shoulders of people who have open sourced their code, which has let me poke around and understand how it all works. Likewise, [the code for this site is on Github](https://github.com/jamesdoc/jamesdoc.com).

## Related git commits:

- [Decouple SCSS generation](https://github.com/jamesdoc/jamesdoc.com/commit/c2f2af87a2a8ee33a8f02a84c47bd910d343d9fd)
- [Decouple SVG generation](https://github.com/jamesdoc/jamesdoc.com/commit/917cd075977bed9ebcf3d7637ba683ca33b1d69a)
- [Decouple image generation](https://github.com/jamesdoc/jamesdoc.com/commit/3b03ce38e596d324ea9b78009d1e72081ee45e9e)
- [Build in potential JS generation](https://github.com/jamesdoc/jamesdoc.com/commit/11c331f4d59205f73c72b79a3b81df97f7c53181)
