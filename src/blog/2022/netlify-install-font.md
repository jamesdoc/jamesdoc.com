---
title: Install a custom font into a Netlify Docker Container
type: article
author: James Doc
date: 2022-11-05
intro: This weekend I explored getting open graph images custom generated for each blog post and discovered that I'd need to install a custom font into my Netlify Docker container…
tags: ["tech", "11ty", "code"]
themeColor: hsl(180, 60%, 49%)
---

This weekend I've been implementing automatically generated opengraph images for blog posts as a quick experiment for a side project I've been planning. There are number of methods to achieve this, Bernard Nijenhuis' [Eleventy only solution is really neat](https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/)[^1]. I've followed that implementation ([related commit](https://github.com/jamesdoc/jamesdoc.com/commit/a153a4c965d356e3a2b9c99ab933186caa42101e)) and it's working really nicely[^2].

The issue is that my modifications (and design for the social graphic) relies on having a custom font install at build time. That's not something that Netlify has in place.

So… how do you get around this minor issue? You install the font.

Netlify spins up a Docker container to run your build, this means that you can run a bash script in the container:

```bash
#!/bin/sh

# Make a local font folder
mkdir ~/.local/share/fonts

# Copy the font from the repo to the right place
cp src/_assets/fonts/space400.ttf ~/.local/share/fonts/space400.ttf

# Reload the font cache
fc-cache -f -v
```

Then, in `package.json` file for the script that Netlify runs we can trigger that bash script to be run before anything else (such as the 11ty build) kicks off.

```json
  "scripts": {
    "dev": "ELEVENTY_ENV=development eleventy --serve --incremental & mix watch",
    "netlify": "bash utils/fontInstall.sh && ELEVENTY_ENV=production eleventy && mix --production"
  },
```

Magically the custom font is installed and is now available for any requirements you have later on, like generating a whole bunch of social media graphics.

The tweaks to make this work are all in [a commit for reference](https://github.com/jamesdoc/jamesdoc.com/commit/1eb5efb491fb07c5b4b780378fc69288c067d6b0). Many thanks to [Bernard](https://bnijenhuis.nl/) for open sourcing [his 11ty site](https://github.com/bnijenhuis/bnijenhuis-nl).

[^1]: The basic summary is that 11ty can be used to generate more than `html` files. Eg, it can generate `svg` files, and then the 11ty Image plugin can convert an `svg` to a `jpg`… Pull this together and you can get a unique `svg` for each blog post or page, and then that svg can be turned into an image ready to be served up as an open graph graphic.
[^2]: When I say really nicely… all the images are generated, however it turns out that I'm generating a lot of images which has slightly slowed down a fresh build (thank you 11ty caching for saving the day there).
