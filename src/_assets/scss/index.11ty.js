import path from 'path';
import * as sass from 'sass'

export default class {
  async data() {
    return {
      permalink: '_assets/css/main.css',
      eleventyExcludeFromCollections: true,
      entryFile: path.join(process.cwd(), 'src/_assets/scss/main.scss'),
    }
  }

  // Return compiled css
  async compileSass(options) {
    const file = options.file;

    const result = await sass.compileAsync(
      file,
      {
        loadPaths: [
          path.join(process.cwd(), 'node_modules/lite-youtube-embed/src')
        ]
      }
    );

    return result.css
  }

  async render({ entryFile }) {
    try {
      return await this.compileSass({
        file: entryFile
      })
    } catch (error) {
      throw error
    }
  }
}
