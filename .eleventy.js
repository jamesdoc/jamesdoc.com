const { DateTime } = require("luxon");
const { buildSrc, buildDest } = require('./paths');

module.exports = function (eleventyConfig) {
  
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/blog\//) !== null;
    });
  });

  eleventyConfig.addPassthroughCopy("src/_assets/img");

  return {
    templateFormats: ["html", "njk", "md"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: buildSrc,
      output: buildDest,
      data: "_data",
      includes: "_includes"
    },
  };
};
