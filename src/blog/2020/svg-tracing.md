---
title: Tracing a JPG to SVG
type: article
author: James Doc
date: 2020-02-26
intro: It's 2020, and I'm back tracing JPGs and trying to turn them into vectors… It's kind of okay now.
---

Every so often I find myself with a JPG logo that I really want an SVG for… It's a pain because the JPG just won't scale for web or print work.

There are a number of tracers out there, however until recently I've always found that they create more problems than they solve. A recent project put me back looking for one of those tools, and figuring that it is 2020, things must have improved by now… I was pleased to find [svg-tracer.glitch.me](https://svg-tracer.glitch.me/) which seems to do a decent job.

A couple of lessons I learnt in the process:

1. _Black logos on white backgrounds work the best._ It's obvious, but worth stating.
2. _Multicoloured logos might require a little more work._ If you have seperate blocks of colour in the logo (cleared with a gap between them) everything is happy, however if you have overlapping colours, things get interesting. I ended up selecting the colours in the logo and then creating different graphics which I then sent through the tracer seperately. I then pulled the different layers in Sketch (Inkscape would be fine) and lined everything up.
3. _Logos with overlapping transparency…_ Forget it unless you are more patient than me!

I would recommend sending the final SVG through a SVG optimiser like [ImageOptim](https://imageoptim.com) (make sure to disable lossy minification otherwise the ViewBox attribute gets ripped out) or Jake Archibald's [OMGSVG](https://jakearchibald.github.io/svgomg/).

Yes, I know that Adobe Illustrator has [this kind of thing built in](https://www.stickermule.com/uk/blog/how-to-use-image-trace-in-adobe-illustrator)… But I'm not investing in Adobe products.
