const dayjs = require('dayjs');
const { buildSrc, buildDest } = require('./paths');
const markdownIt = require("markdown-it");
const markdownItResponsive = require('@gerhobbelt/markdown-it-responsive');
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return dayjs(dateObj).format('dddd, D MMMM YYYY');
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return dayjs(dateObj).format('YYYY-MM-DD');
  });

  eleventyConfig.addFilter("dateComparison", (dateObj, compareWith)=> {
    return dayjs(dateObj).isBefore(dayjs(compareWith));
  })

  eleventyConfig.addFilter("imgSuffix", (imgStr, suffix)=> {
    const i = imgStr.lastIndexOf('.');
    const imgPath = imgStr.substring(0, i);
    const ext = imgStr.substring(i + 1);
    return `${imgPath}-${suffix}.${ext}`;
  });

  eleventyConfig.addFilter("activeBook", (bookList) => {
    return bookList.filter(item => item.active);
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/11ty\/blog\//) !== null;
    });
  });

  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("listing", "layouts/listing.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Override Markdown config

  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const rwdOptions = {
    responsive: {
      'srcset': {
        '*': [ {
          width: 320,
          rename: {
            suffix: '-320'
          }
        }, {
          width: 550,
          rename: {
            suffix: '-550'
          }
        } ]
      },
      'sizes': {
        '*': '(max-width: 550px) calc(100vw - 120px), 550px'
      }
    }
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItResponsive, rwdOptions));

  return {
    templateFormats: ["html", "njk", "md"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: `${buildSrc}/11ty`,
      output: buildDest,
      data: "_data",
      includes: "_includes"
    },
  };
};
