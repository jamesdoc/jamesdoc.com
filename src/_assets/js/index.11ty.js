import esbuild from 'esbuild';

export default class {
  data() {
    return {
      layout: '',
      permalink: false,
      eleventyExcludeFromCollections: true,
    };
  }

  async render(data) {
    esbuild
      .build({
        entryPoints: ['./src/_assets/js/index.js'],
        bundle: true,
        outfile: './dist/_assets/js/index.js',
      })
      .catch(() => process.exit(1));
  }
};
