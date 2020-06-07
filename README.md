# JamesDoc.com

Simple static site via [Eleventy](https://www.11ty.io), deploying to [Netlify](https://jamesdoc.com).

[![Netlify Status](https://api.netlify.com/api/v1/badges/44c5f763-2223-448e-bcd8-f137d8c778b8/deploy-status)](https://app.netlify.com/sites/jamesdoc/deploys)

## What's in the box?

- [Eleventy](https://www.11ty.io)

## Getting going (dev)

- `npm install` - Install dev dependancies
- `npm run importReadingList` - Hydrate the reading list
- `npm run dev` - Build the site for dev

## Deploying

- `npm run build` - Build the production assets
- `scp -r dist jimmy@jimmyserve.com:/www/` - Move it to your server\*

* Other methods are possible, eg automated deploys via Github + Netlify

## What's I've learnt about Eleventy:

- [Initial site move](https://jamesdoc.com/blog/2018/11ty/)
- [Importing old blog posts (MySQL to Markdown)](https://jamesdoc.com/blog/2018/importing-old-posts/)
- [Responsive images in 11ty](https://jamesdoc.com/blog/2018/rwd-img-11ty/)
- [RSS in 11ty](https://jamesdoc.com/blog/2019/adding-rss/)
- [Degulpification of Eleventy](https://jamesdoc.com/blog/2020/degulpification/)
