import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

const commitMessage = execSync('git show -s --format=%s')
  .toString().trim()

const commitHash = execSync('git rev-parse --short HEAD')
  .toString().trim();

export default {
  env: process.env.ELEVENTY_ENV,
  timestamp: new Date(),
  commitMessage,
  commitHash,
  eleventyVersion: packageJson.dependencies["@11ty/eleventy"]
}
