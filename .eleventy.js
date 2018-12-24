const { DateTime } = require("luxon");
const { buildSrc, buildDest } = require('./paths');

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("dateComparison", (dateObj, compareWith)=> {
    return DateTime.fromJSDate(dateObj) < DateTime.fromISO(compareWith)
  })

  eleventyConfig.addFilter("imgSuffix", (imgStr, suffix)=> {
    const i = imgStr.lastIndexOf('.');
    const imgPath = imgStr.substring(0, i);
    const ext = imgStr.substring(i + 1);
    return `${imgPath}-${suffix}.${ext}`;
  })

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/11ty\/blog\//) !== null;
    });
  });

  // eleventyConfig.addPassthroughCopy("src/_assets/svg");

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
