const Image = require("@11ty/eleventy-img");

module.exports = {
  rwdImg: (src, alt, sizes = "100vw", classes = " ") => {
    if (!src) {
      return;
    }

    src = `./src${src}`;

    const options = {
      widths: [320, 550, 800, 1000, 1200],
      formats: ["webp", "jpeg"],
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
  Image(src, options);
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, attributes);
}
