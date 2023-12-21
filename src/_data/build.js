const eleventyPackage = require("@11ty/eleventy/package.json");
const childProcess = require('child_process');

const commitMessage = childProcess
  .execSync('git show -s --format=%s')
  .toString().trim()

const commitHash = childProcess
  .execSync('git rev-parse --short HEAD')
  .toString().trim();

module.exports = {
  env: process.env.ELEVENTY_ENV,
  timestamp: new Date(),
  commitMessage,
  commitHash,
  eleventyVersion: eleventyPackage.version
}
