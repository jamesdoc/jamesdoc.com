import { buildSrc, buildDest } from "./paths.js";
import markdownIt from "markdown-it";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import filters from "./utils/filters.js";
import collections from "./utils/collections.js";

import fs from "fs";
import Image from "@11ty/eleventy-img";
import markdownItFootnote from "markdown-it-footnote";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTableOfContents from "markdown-it-table-of-contents";

export default function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    widths: ["auto"],
    formats: ["webp", "jpg"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
  });

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });

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

  markdownLibrary.use(markdownItFootnote);
  markdownLibrary.use(markdownItLinkAttributes, mdiLinkAttrsOpts);
  markdownLibrary.use(markdownItAnchor);
  markdownLibrary.use(markdownItTableOfContents);

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
