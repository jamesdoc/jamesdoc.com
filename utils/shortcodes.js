const eleventyImage = require("@11ty/eleventy-img");

module.exports = {
  imgBookCover: async function (filepath, alt, widths, classes, sizes) {
    if (!filepath) {
      return;
    }

    let options = {
      formats: ["webp", "jpg"],
      widths: widths || [null],
      urlPath: "/_assets/img/bookCovers/",
      outputDir: "./dist/_assets/img/bookCovers/",
    };

    let stats = await eleventyImage(filepath, options);

    return eleventyImage.generateHTML(stats, {
      alt,
      loading: "lazy",
      decoding: "async",
      sizes: sizes || "(min-width: 22em) 30vw, 100vw",
      class: classes,
    });
  },

  rwdImg: (
    src,
    alt,
    sizes = "100vw",
    classes = " ",
    widths = [320, 550, 800, 1000, 1200],
    formats = ["webp", "jpeg"]
  ) => {
    if (!src) {
      return;
    }

    src = `./src${src}`;

    const options = {
      widths,
      formats,
      urlPath: "/_assets/img/",
      outputDir: "./dist/_assets/img",
    };

    const imageAttributes = {
      class: classes,
      alt: alt,
      sizes: sizes,
      loading: "lazy",
      decoding: "async",
    };

    return imageGen(src, options, imageAttributes);
  },
};

function imageGen(src, options, attributes) {
  eleventyImage(src, options);
  metadata = eleventyImage.statsSync(src, options);
  return eleventyImage.generateHTML(metadata, attributes);
}
