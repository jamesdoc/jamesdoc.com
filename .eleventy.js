const { buildSrc, buildDest } = require("./paths");
const markdownIt = require("markdown-it");
const markdownItResponsive = require("@gerhobbelt/markdown-it-responsive");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const filters = require("./utils/filters.js");
const collections = require("./utils/collections.js");
const shortcodes = require("./utils/shortcodes.js");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  // Watch assets folder for changes
  eleventyConfig.addWatchTarget("./src/_assets");

  // Copy these assets straight across
  eleventyConfig.addPassthroughCopy({ "./src/_assets/svg": "_assets/svg" });

  // Alias these layouts
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
      srcset: {
        "*": [
          {
            width: 320,
            rename: {
              suffix: "-320",
            },
          },
          {
            width: 550,
            rename: {
              suffix: "-550",
            },
          },
        ],
      },
      sizes: {
        "*": "(max-width: 550px) calc(100vw - 120px), 550px",
      },
    },
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options).use(markdownItResponsive, rwdOptions)
  );

  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: ["html", "njk", "md", "11ty.js"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: `${buildSrc}`,
      output: buildDest,
      data: "_data",
      includes: "_includes",
    },
  };
};
