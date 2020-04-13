// Shamelessly modified from Eleventastic:
// https://github.com/maxboeck/eleventastic

const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');
const File = require('vinyl');
const SVGSpriter = require('svg-sprite');

const isProd = process.env.ELEVENTY_ENV === 'production'
const fileName = 'sprite.svg'

module.exports = class {
  async data() {
    const filePath = path.join(__dirname, `/svg/${fileName}`);
    return {
      permalink: `/assets/svg/sprite.svg`,
      eleventyExcludeFromCollections: true,
      filePath,
    }
  }

  async compile() {
    const cwd = path.resolve('src/_assets/svg')
    const config = {
      mode: {
        inline: true,
        symbol: {
          sprite: 'sprite.svg',
          example: false
        }
      },
      shape: {
        transform: ['svgo'],
        id: {
          generator: '%s'
        }
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
      }
    }
    const spriter = new SVGSpriter(config)
    const getFiles = util.promisify(glob)

    const compileSprite = async (args) => {
      return new Promise((resolve, reject) => {
        spriter.compile(args, (error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result.symbol.sprite)
        })
      })
    }

    const files = await getFiles('**/*.svg', { cwd: cwd })
    files.forEach(function (file) {
      spriter.add(
        new File({
          path: path.join(cwd, file),
          base: cwd,
          contents: fs.readFileSync(path.join(cwd, file))
        })
      )
    })

    const sprite = await compileSprite(config.mode)
    const spriteContent = sprite.contents.toString('utf8')

    return spriteContent
  }

  // render the SVG file
  async render({ filePath }) {
    try {
      return await this.compile({ file: filePath });
    } catch (err) {
      throw new Error(err);
    }
  }
}

// module.exports = async () => {
//     const cwd = path.resolve('src/_assets/svg')
//     const config = {
//         mode: {
//             inline: true,
//             symbol: {
//                 sprite: 'sprite.svg',
//                 example: false
//             }
//         },
//         shape: {
//             transform: ['svgo'],
//             id: {
//                 generator: 'icon-%s'
//             }
//         },
//         svg: {
//             xmlDeclaration: false,
//             doctypeDeclaration: false
//         }
//     }
//     const spriter = new SVGSpriter(config)
//     const getFiles = util.promisify(glob)

//     const compileSprite = async (args) => {
//         return new Promise((resolve, reject) => {
//             spriter.compile(args, (error, result) => {
//                 if (error) {
//                     return reject(error)
//                 }
//                 resolve(result.symbol.sprite)
//             })
//         })
//     }

//     const files = await getFiles('**/*.svg', { cwd: cwd })
//     files.forEach(function (file) {
//         spriter.add(
//             new File({
//                 path: path.join(cwd, file),
//                 base: cwd,
//                 contents: fs.readFileSync(path.join(cwd, file))
//             })
//         )
//     })

//     const sprite = await compileSprite(config.mode)
//     const spriteContent = sprite.contents.toString('utf8')

//     return spriteContent
// }
