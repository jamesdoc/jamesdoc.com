---
title: Migrating to PNPM
date: 2026-03-21
type: article
author: James Doc
intro: A brief set of notes exploring migrating to `pnpm` from `yarn` or `npm`.
---

[[toc]]

## Advantages (as I see them).

- It stores `node_modules` in a single place and references them, rather than having multiple copies of the same dependency across different files - this makes `pnpm install` and _a lot_ quicker and reduces disk space.
- You can `prune` dev dependencies ahead of deployment in CI, meaning you can run the test with your dev dependencies and then strip them out in one command before deploying.
- Workspaces allow you to install/update etc all dependencies from a top level.

## Quick start

- `rm -rf node_modules`
- `pnpm import` - generates a pnpm-lock.yaml from another package manager's lockfile.
- `rm package-lock.json`
- `pnpm install`
- Update any `yarn` or `npm` commands in the `package.json` scripts and documentation.

## These are handy things…

- `pnpm update` - updates all deps within their specified range (eg won't do major version bumps)
  - Key difference from yarn is that this also updates the `package.json` file to give clarity on which version you're running.
  - `pnpm update "@11ty/*"` - update specific packages that match `@11ty/*`
  - `pnpm update --latest --interactive` - pick and choose which packages to bump to their latest (beyond specified range).
- `pnpm prune --prod` - rips out all dev dependencies

## Gotchas

### Dependencies are (correctly) explicit

- If you've used a dependency from another dep in your code it will error
- You'll need to `pnpm add xxx` for it to work

### Using PNPM to manage Node versions

Note: PNPM does not allow different Node.js versions per project - it's global only, so only handy if you're consistent with your node version across all things. For the moment, sticking with `nvm` is probably preferred.

If you want to manage Node.js with PNPM, you need to remove any Node.js installed by other tools, then install PNPM using one of the standalone scripts that are provided on the installation page: https://pnpm.io/installation

