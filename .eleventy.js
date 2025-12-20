const { buildSrc, buildDest } = require("./paths");
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

// const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

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
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  // eleventyConfig.addPlugin(directoryOutputPlugin);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

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
  eleventyConfig.addLayoutAlias("event", "layouts/event.njk");

  // Skip archived posts
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if ((data.archived || data.draft) && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Override Markdown config
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };

  let markdownLibrary = markdownIt(markdownItOptions);

  const mdiLinkAttrsOpts = {
    matcher(href) {
      return href.match(/^https?:\/\//);
    },
    attrs: {
      target: "_blank",
      rel: "noopener",
    },
  };

  markdownLibrary.use(require("markdown-it-footnote"));
  markdownLibrary.use(require("markdown-it-link-attributes"), mdiLinkAttrsOpts);
  markdownLibrary.use(require('markdown-it-anchor'));
  markdownLibrary.use(require("markdown-it-table-of-contents"));

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
                let outputFilename = filename.substring(0, (filename.length - 4));
                return `${outputFilename}.${format}`;
              }
            });
          }
        })
      }
    })
  });

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
