const { buildSrc, buildDest } = require("./paths");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItResponsive = require("@gerhobbelt/markdown-it-responsive");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

const filters = require("./utils/filters.js");
const collections = require("./utils/collections.js");
const shortcodes = require("./utils/shortcodes.js");

const fs = require("fs");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  // eleventyConfig.addPlugin(directoryOutputPlugin);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

  // Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode(
    "imgBookCover",
    shortcodes.imgBookCover
  );
  eleventyConfig.addNunjucksShortcode("rwdImg", shortcodes.rwdImg);

  // Object.keys(shortcodes).forEach((shortcodeName) => {
  //   eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  // });

  // Watch assets folder for changes
  eleventyConfig.addWatchTarget("./src/_assets");

  // Copy these assets straight across
  eleventyConfig.addPassthroughCopy({ "./src/_assets/svg": "_assets/svg" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/img": "_assets/img" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/fonts": "_assets/fonts" });

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

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    // .use(markdownItAnchor, {
    //   permalink: true,
    //   permalinkClass: "direct-link",
    //   permalinkSymbol: "#",
    // })
    .use(markdownItFootnote);

  markdownLibrary.renderer.rules.footnote_block_open = () => {
    return (
      '<div class="footnotes">\n' +
      "<h4>Footnotes</h4>\n" +
      '<ol class="footnotes-list">\n'
    );
  };

  markdownLibrary.renderer.rules.footnote_block_close = () => {
    return "</ol>\n" + "</div>\n";
  };

  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.setDataDeepMerge(true);

  // Social previews
  eleventyConfig.on('afterBuild', () => {
    const socialPreviewImagesDir = "dist/_assets/socialPreviews/";
    fs.readdir(socialPreviewImagesDir, function (err, files) {
      if (files.length > 0) {
        files.forEach(function (filename) {
          if (filename.endsWith(".svg")) {
            let imageUrl = socialPreviewImagesDir + filename;
            Image(imageUrl, {
              formats: ["jpg"],
              outputDir: "./" + socialPreviewImagesDir,
              filenameFormat: function (id, src, width, format, options) {
                let outputFilename = filename.substring(0, (filename.length-4));
                return `${outputFilename}.${format}`;
              }
            });
          }
        })
      }
    })
});

  return {
    templateFormats: ["html", "njk", "md"],
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
