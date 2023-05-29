---
title: Building the DeepZoom- Concept to Creation
intro: A quick review on the building process behind digitising one of the artist in residence's work at the V&A
type: article
tags: vam
date: 2015-04-28
canonical: https://www.vam.ac.uk/blog/digital/building-the-deepzoom
---

![Screenshot of the DeepZoom Tool](/_assets/img/blog/2015/deepzoom-header.jpg)

The V&A has a wealth of creative talent within its walls, one of these areas is within the [artists in residency program](http://www.vam.ac.uk/page/m/museum-residency-programme/). Last month we said goodbye to [Liam O’Connor](http://www.vam.ac.uk/content/articles/e/exhibition-road-drawing-resident-liam-oconnor/), who spent the last year as our drawing artist in resident, specifically working on the [Exhibition Road Building Project](http://www.vam.ac.uk/page/e/exhibition-road-building-project/).

Towards the end of Liam’s residency the Digital Media team were invited to his studio to have a look at the work he had produced with the aim of building an online retrospective of his year with us. Richard, Luca, Simon and I were looking at umbrellas hung from walls, magnifying glasses dangling from the ceiling and many many models of hands made out of concrete. Despite all of this, the thing that drew the eye was a 12 metre scroll covered in pencil marks. At the time it had been fully unrolled and was taped around the walls of the studio.

![Liam fully unrolls the scroll in his studio towards the end of his residency.](/_assets/img/blog/2015/deepzoom-liam.jpg)

While we were with Liam, he was explained to us that the scroll captured everything that he was looking at while on the building site over the last year. It captured people and process over time, and these drawings were then used as a launchpad for different ideas when he was back in the studio. The scroll was not just documentation of the building site over the last year, but of Liam’s time in the V&A. Liam had used the scroll to capture ideas, we want to use the scroll as a tool for showing and explaining these ideas, and showing the progression over the year.

## The pitch and content capturing

The idea that we pitched was to create an interactive version of Liam’s scroll, that allowed visitors to zoom right into the details of the drawing, but then to allow Liam to talk about the key areas of the scroll and the ideas that were sparked from it. One of the features from [The Museum of Savage Beauty](http://www.vam.ac.uk/museumofsavagebeauty/) that we had really liked was the zooming into the details of the McQueen objects, so we started thinking around the ideas of fusing the deep zoom images with annotations on Liam’s scroll. (Richard also thought about a side-scrolling [Lemmings game…](http://cdn.duelinganalogs.com/wp-content/uploads/2013/05/lemmings-animated.gif) but copyright).

While we were thinking through how best to capture Liam’s annotations, we realised that writing about the different key areas and projects wasn’t going to be enough. The best way to capture these ideas was the record Liam talking about the different sections. Simon, equipped with an audio recorder and a 20 page print out of the scroll, spent an afternoon with Liam, talking about the different areas and then marking where the Mp3s fitted on the scroll. The second task for Simon was to digitally stitch all the photos of the scroll together into one giant (69664x3514px) image file, no small task!

## Technical build

![Liam O'Connor starts the scroll in the midst of the building work](/_assets/img/blog/2015/deepzoom-liam-working.jpg)

Meanwhile I was looking through various JavaScript libraries that would allow the functionality that we needed. [Open SeaDragon](https://openseadragon.github.io/) was the one we landed on, it had one of the smoothest zooms of all the libraries, had support for the annotations that we needed, and their [GitHub account](https://github.com/openseadragon/openseadragon) has been very active and the core developers being very quick at responding to questions and quandaries.

To fit the image into Open SeaDragon it first needed to be cut up into image tiles. This ensures that the browser only downloads the image tiles for the current zoom level rather than downloading the very large image. Over the top of the tiles sits the different markers at specific x,y positions. Each of these markers have content allocated to them and on click trigger a different part of Liam’s explanation.

All of the code that we have used is available on our GitHub account: [DeepZoom-Images](https://github.com/vanda/deepzoom-images).

## Making it Reusable

A key thing for the developers in the team is to try and ensure that what we are building is reusable; we don’t want to have to rebuild existing things for new projects in the future. As such the Annotated Deep Zoom Image Tool (ADZIT for short, and yes; it does need a better name) needed to be integrated with our CMS. Luca and Andrew took the lead on this, creating asset templates for the annotations and working out how to import the tiles into the CMS correctly.

With the CMS set up, it was back to Simon to work through adding each point to the scroll and uploading the content. The result can be seen on [Exhibition Road drawing scroll page](http://www.vam.ac.uk/content/articles/i/exhibition-road-drawing-scroll/).

Because this is a reusable tool, we are beginning to think about how else we can use deep zooming images across the site. Candidates so far include the [Ardabil Carpet](http://collections.vam.ac.uk/item/O54307/the-ardabil-carpet-carpet-unknown/), items in our [tapestry gallery](http://www.vam.ac.uk/page/t/tapestry-galleries/), the [Raphael Cartoons](http://www.vam.ac.uk/page/r/raphael-cartoons/) and we are also looking at items in the upcoming [Fabric of India exhibition](http://www.vam.ac.uk/content/exhibitions/the-fabric-of-india/).
