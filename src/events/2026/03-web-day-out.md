---
title: Web Day Out
organiser: Clearleft
role: attendee
location:
  city: Brighton
  country: UK
externalUrl: https://webdayout.com/
date: 2026-03-12
endDate: 2025-03-12
layout: event
avatar: hidden

---

{{ toc }}

## I Can’t Believe It’s Not JS - Jemima Abu

HMW reduce package dependency? - we have a lot that we are lifting from MUI/other when it is baked into standard HTML?

FYI: Chrome Accessibility pane previews what is being exposed to voice over tools

html
- `details` - accordion
- `popover` and `popovertarget` - modal

css
- `has:` - pick up from child element selectors
- `@starting-style` - set animation starting props
- `animation-timeline` - scroll based animation (not baseline)
- `scroll-state`, `scroll-button()`, `::scroll-marker` - carousel
- `if()` - conditional styling

developers.chrome.com/new

## A Pragmatic Guide to Browser Support - Rachel Andrews

The common definition of baseline = available in all core browsers for at least 30 months.

Future gazing - baseline lets you look at what will be widely available next year, etc – eg if you know that you’re shipping 12 months away then you can make plans to use something that isn’t at baseline _yet_ because it will be soon.

https://web-platform-dx.github.io/web-features-explorer/features/subgrid

Somethings are going down the ‘standards process’; this means that some things are built in one engine, but the implementation isn’t set yet. MDN marks these as experimental. E.g. this happened for `view-transitions` which changed the syntax.

https://wpt.fyi/interop-2026

## Progressive Web Apps from the Trenches - Aleth Gueguen

alethgueguen.com

PWA’s now get `share_target` within the `manifest.json` allowing an action, target, etc; a user can share text or file straight into the PWA within a specific area of the PWA (android only at the moment).

persist data via indexeddb and cache storage.

Data syncing should be visible to the user; don’t hide the status

## Build for the Web, Build on the Web, Build with the Web - Harry Roberts

A lot has changed in the web, but a lot has stayed the same. The web is version-less.

Client lost 9 months on upgrade process (nuxt 3 –> 4).

innovation, adoption, (re)calibration
- innovators build, the world adopts, and then maybe we should calibrate so we don’t think about the defaults.

“that shouldn’t have been a SPA”
- optimising for a scenario that doesn’t exist

network conditions improve far quicker than devices
- we can get the data to the device, but can the device run the thing? - eg a low end android device in asia can data quickly…

> “the based spa is better than best ops, the average spa is worse than the average mpa” - nolan lawson

Every bit of complexity you introduce, you also have to maintain - everything we introduce is a liability.

prefetch and render via `type=speculationrules`

coming soon: compression dictionaries to send just the diff

Watch: The Unbearable Weight of Massive Jacascript: Ryan Townsend

**forwards compatibility**
- What we’re building skates to where the puck is heading
- we can have features that are dormant until they are supported

## Breaking with Habits - Manuel Matuzović

**Resetting**

Rather than than setting a blank state - setting sensible defaults.

https://fokus.dev/tools/uaplus

**Structure and organisation**

ITCSS- start with low specificity and then build up

cascade layers allow breaking into specific groups (@layer).

```css
@layer core, third-party, components, utilities;
@layer core.reset, core.tokens, core.base;
@layer third-party.import, third-party.overrides;
@layer compnents.base, components.variations;
```

@layer establishes the order of layers upfront - they are buckets you can throw into.

https://fokus.dev/tools/css-boilerplate

**Scalability and resilience**

```css
:root {
 --scale: 1.26;
 --base: 1rem;
}

h1 { --font-factor: 1; }
h2 { --font-factor: 2; }

h1, h2 {
 font-size: calc(var(--base) * pow(var(--scale), var(--font-factor, 0)));
}
```

https://matzo.at/type-scale

**Customisation**

Configure custom props to enable users to set their own preferences.

**Componentisation**

Throwing custom props into a `style=…` attribute means that your components (or children) will get the props applied.

## What’s New in Web Typography - Richard Rutter

```css
@keyframes flip-synthesis{
  0 { font-synthesis: off }
}
```

**@font-face rules**

- `font-display` - what should happen while the font is loading (fallback, swap). Swap for heading, fallback for main body.
- `size-adjust` - makes the font x% bigger (useful for mixing serif, sans, and monospaced in the same sentence)
- `font-size-adjust` - sets the size of the fallback font (in font-display)

`font-optical-sizing`
`font-variation-settings`

`hanging-punctuation: first` - sticks quote marks in the margin

https://clagnut.com/blog/2433

## Customisable `<select>` and the Friends we Made Along the Way - Jake Archibald


## The Browser is the Playground - Lola Odelola

Priority of constituents
- End user
- Developer
- Browser Engine
- Spec Author
- Theoretical technical ‘purity’

lolaslabs.co

lolaodelala.mstdn.social
