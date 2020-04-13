const { buildSrc, buildDest } = require('./paths');
const markdownIt = require("markdown-it");
const markdownItResponsive = require('@gerhobbelt/markdown-it-responsive');
const pluginRss = require("@11ty/eleventy-plugin-rss");

const filters = require('./utils/filters.js');
const collections = require('./utils/collections.js');

module.exports = function (eleventyConfig) {

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // eleventyConfig.addCollection("posts", function (collection) {
  //   return collection.getAllSorted().filter(function (item) {
  //     return item.inputPath.match(/^\.\/src\/11ty\/blog\//) !== null;
  //   });
  // });

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
