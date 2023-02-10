---
title: Rebuilding 11ty on a schedule
date: 2023-02-10
intro: Automate the deployment of a website using Netlify and GitHub Actions at a specific time.
tags: ["tech", "11ty"]
themeColor: hsl(261, 57%, 61%)
---

On a recent Eleventy project I needed a [calendar of upcoming events](https://www.globe.church/calendar/#thisWeek). One of the challenges that a static site generator brings is that when the site is built, it is fixed… some may even go as far to say it is static. The implication of this, is that there's no dynamic pulling from a database when a user loads the page. So, if you have a section saying 'events happening today' that will very quickly, within 24 hours, start displaying out of date information.

---

TL;DR:

1. Set up a [Build Hook in Netlify](https://docs.netlify.com/configure-builds/build-hooks/).
2. Create a [GitHub Action](https://docs.github.com/en/actions) to [run on a schedule](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule), code example below.
3. Don't commit your build hook URL or ID to your repo, [that would be silly](https://www.youtube.com/watch?v=YXm1ICO8Nec).

---

Normally with 11ty, you just need to update a website when the content is changing. Netlify makes this very simple, hooking into a push to the `main` branch. To do the deploys a set times, requires something slightly different via GitHub Actions.

GitHub Actions has a huge number of triggers from pushing to a branch, opening an issue, or merging a pull request. The trigger needed here is running on a schedule. Schedule follows standard cron syntax. The [documentation provides some heavy caveats in it](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) such as delays during high loads, so I wouldn't recommend this for specific time sensitive work… but it's good enough for a daily build task.

Alongside an Action, you're also going to need a [Netlify Build Hook](https://docs.netlify.com/configure-builds/build-hooks/). When the Build Hook received a `POST` request, Netlify kicks of a new build. The URL looks like this: api.netlify.com/build_hooks/########, but with those hashes as a unique ID. You'll want to keep that secret, so bring that ID into GitHub as [an encrypted secret in your repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) with the name `NETLIFY_BUILD_HOOK_ID`. Actions will read it, but not expose it publically.

To get Actions working you'll need to create a new `yml` file at the root `.github/workflows/auto-deploy.yml` with the following [^1]:

```yml
name: "Auto-Deploy"

on:
  schedule:
    - cron: '30 1 * * *' # At 1:30am every day

jobs:
  deploy:
    name: 'Auto Deploy'
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to Netlify
        env:
          TOKEN: ${​{ secrets.NETLIFY_BUILD_HOOK_ID }​}
        run: curl -X POST -d {} https://api.netlify.com/build_hooks/${TOKEN}
```

Now, when you push this change to GitHub the new Action will be live, ready to run daily at 1.30am every day.

The schedule task doesn't just have to be used for doing a deploy via Netlify. You could self host this somewhere, and use GitHub Actions to SSH into your server and trigger `npx @11ty/eleventy` (or however you build your 11ty site).

[^1]: The original version of this used [fjogeleit/http-request-action@v1](https://github.com/fjogeleit/http-request-action), until Michelle Barker [pointed out that Actions can run cURL directly](https://front-end.social/@michelle/109783878677424745).
