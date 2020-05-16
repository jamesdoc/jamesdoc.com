const path = require('path');
const util = require('util');
const glob = require('glob');
const sharp = require('sharp');
const mkdirp = require('mkdirp');

const outputPath = 'dist/_assets/img/';

const resizeConf = {
  sizes: [
    {
      width: 320,
      rename: { suffix: '-320' },
    }, {
      width: 550,
      rename: { suffix: '-550' },
    }
  ],
  // // Not implemented yet…
  // options: {
  //   quality: 80,
  //   progressive: true,
  //   withMetadata: false,
  //   withoutEnlargement: true,
  //   errorOnUnusedImage: false,
  //   errorOnEnlargement: false
  // }
};

module.exports = class {

  async data() {
    const filePath = path.join(__dirname, `/img/`);
    return {
      permalink: `/_assets/img/images.json`,
      eleventyExcludeFromCollections: true,
      filePath,
    }
  }

  async loadImages(imgFolder) {

    const cwd = path.resolve(imgFolder.file);
    const getImages = util.promisify(glob);
    const processedImages = [];

    const imgs = await getImages('**/*(*.jpg|*.png|*.gif)', { cwd: cwd });
    imgs.forEach(function (img) {

      const ext = path.extname(img);
      const base = path.basename(img, ext);
      const dir = path.dirname(img);

      mkdirp.sync(path.join(outputPath, dir));

      let passThroughImg = sharp(imgFolder.file + img);
      passThroughImg.toFile(path.join(outputPath, dir, base + ext));

      resizeConf.sizes.forEach(function (size) {
        const newPath = path.join(outputPath, dir, base + size.rename.suffix + ext);
        const image = sharp(imgFolder.file + img);
        image.resize(size.width);
        image.toFile(newPath);
      });

      processedImages.push(img);
    });

    return JSON.stringify(processedImages, null, '\t');
  }

  async render({ filePath }) {
    try {
      return await this.loadImages({ file: filePath });
    } catch (err) {
      throw new Error(err);
    }
  }
}
