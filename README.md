# JamesDoc.com

Simple static site via [Eleventy](https://www.11ty.io)

## What's in the box?

- [Eleventy](https://www.11ty.io)
- [Gulp](https://www.gulpjs.com)

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
