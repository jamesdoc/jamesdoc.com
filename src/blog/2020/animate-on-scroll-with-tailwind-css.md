---
title: Animate on scroll with Tailwind CSS
type: article
author: James Doc
date: 2020-07-31
tags: ["code"]
intro: With the release of Tailwind CSS 1.6.0 which includes animation support, how can we use it for animate on scroll?
---

One of the requirements of a classic brochureware website these days is animated elements that fade into view as the visitor scrolls to the website. There are a number of Javascript libraries to help you do this, like [Michał Sajnoóg's](https://github.com/michalsnik) [AOS - Animate on Scroll Library](https://michalsnik.github.io/aos/)… but how do you do this kind of thing with Tailwind CSS and as little JavaScript as you can get away with?!

## Tailwind 1.6

[Tailwind 1.6](https://blog.tailwindcss.com/tailwindcss-1-6) introduced [animation as a core plugin](https://github.com/tailwindlabs/tailwindcss/pull/2068) which is an excellent start, so the first step is to make sure that you're running the latest and greatest version of Tailwind. In your `package.json` file make sure your dependancies are up to date:

```json
  "dependencies": {
    "tailwindcss": "^1.6.0"
  }
```

_Remember to run `npm install`_

## Configuring Tailwind

We're going to keep things simple, and apply a fade in on scroll on an element. To do this we need to jump into the `tailwind.config.js` file and extend our theme with the new animations. This is all wonderfully documented on the Tailwind CSS site. [Read the animation documentation](https://tailwindcss.com/docs/animation/).

```javascript
extend: {
  animation: {
    fadeIn: "fadeIn 2s ease-in forwards"
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 }
    }
  }
```

If you've written CSS animations before, you'll recognise this syntax from CSS animations. As always the [MDN documentation for CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) is a great place to start for a primer on this.

Here we're defining the animation name, `fadeIn`, setting it to take 2 seconds, slowly easing in, and then run only once so the element doesn't vanish straight away. The `keyframes` reference sets the start and end state, going from an `opacity: 0` to `opacity: 1`.

Before we leave the `tailwind.config.js` one extra tweak to make is to add the `motion-safe` to the animation variants:

```javascript
variants: {
  animation: ["motion-safe"];
}
```

You can read a little bit more about it [on the pull request in the Tailwind repo](https://github.com/tailwindlabs/tailwindcss/pull/2071), but the summary is that for accessiblity users can opt-out of animations, and that is exposed by a the [prefers-reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

If you jump into your HTML you can add your new class behind the variant and get your new animation:

```html
<div class="h-8 w-8 bg-blue motion-safe:animate-fadeIn">
  FadeIn
</div>
```

Magic! Your element will fade in… but not on scroll. Not quite the dream. Into the Javascript!

## Entering on scroll

There are a couple of ways to add or remove a class on an element as the user scrolls… adding an `eventListener` to the `scroll` event, running a loop over `requestAnimationFrame`, but my preference is to use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which to quote MDN:

> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Or… simply put - check if the element in the viewport.

```javascript
// Get all the elements you want to show on scroll
const targets = document.querySelectorAll(".js-show-on-scroll");

// Set up a new observer
const observer = new IntersectionObserver(callback);

// Loop through each of the target
targets.forEach(function (target) {
  // Hide the element
  target.classList.add("opacity-0");

  // Add the element to the watcher
  observer.observe(target);
});

// Callback for IntersectionObserver
const callback = function (entries) {
  entries.forEach((entry) => {
    // Is the element in the viewport?
    if (entry.isIntersecting) {
      // Add the fadeIn class:
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {
      // Otherwise remove the fadein class
      entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};
```

Those comments should explain what is happening through the code, as the element enters or leaves the viewport the `callback` will be fired, and then the Tailwind class will be toggled accordingly.

**Note:** Older browsers will need [a polyfill in place for the Intersection Observer](https://github.com/Financial-Times/polyfill-library/tree/master/polyfills/IntersectionObserver), happily [Polyfill.io](https://polyfill.io/v3/url-builder/) has one built in for you to use. [Thanks FT](https://github.com/Financial-Times/polyfill-library).

With that bit of Javascript in place, all that remains is for you to update your HTML:

```html
<div class="h-8 w-8 bg-blue js-show-on-scroll">
  FadeIn
</div>
```

[See a demo on Codepen](https://codepen.io/jamesdoc/pen/qBbeOym?editors=1010)

## Extending this…

There is a lot more you could do, from more complicated animations, through to customising which animations are used by using a `data-attribute` on the HTML.

With this method, it becomes customise which animation you are using in the JS (just make sure you whitelist the [PurgeCSS](https://github.com/tailwindlabs/tailwindcss/pull/1639) because you have enabled PurgeCSS right… right?!)

```html
<div … data-animate-type="motion-safe:animate-fadeIn">…</div>
```

```javascript
const animationType = entry.target.dataset.animateType;

if (entry.isIntersecting) {
  entry.target.classList.add(animationType);
}
```

<aside class="boxedMessage boxedMessage--info">
  <p>This post originally appears on onesheep.org. Their website shutdown in Dec 2023.</p>
</aside>
