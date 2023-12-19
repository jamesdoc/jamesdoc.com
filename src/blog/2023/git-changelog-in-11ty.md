---
title: Adding a git based changelog in 11ty
date: 2023-12-19
intro: How to add a changelog to your 11ty pages based on commits made to your site's git repository.
tags: ["tech", "11ty"]
leadImage: /_assets/img/blog/2023/changelog.png
themeColor: hsl(11, 92%, 56%)
---

I had an idea yesterday to pull the last commit detail from the git repo for this site and put it as an `HTML` comment so I can identify deploy issues quickly. A little bit of googling later I had a couple of extra lines hidden away in the generated HTML. (Go on, right click, view source, and scroll to the bottom)…

```html
<!--
  generator: Eleventy v3.0.0
  last build: production – Tue Dec 18 2023 15:55:02 GMT+0000 (Coordinated Universal Time)
  last commit: https://github.com/jamesdoc/jamesdoc.com/commit/68ae2d9 – Add commit info to debug lines
-->
```

The implementation [was pretty simple](https://github.com/jamesdoc/jamesdoc.com/commit/68ae2d9d98fc1c97e0836d25fb8e0489f82ab06c):

- Get the latest commit message with the git command: `git rev-parse --short HEAD`
- Add the output to [11ty's data cascade ](https://www.11ty.dev/docs/data-global/)
- Expose it in the base template

Which got me thinking… would it be possible to use something similar to get a changelog for each blog post on the site?

Yes it is, [here's the related commit](https://github.com/jamesdoc/jamesdoc.com/commit/8d5749faa98a16daf55b4eb0465ee67e7742c962). Or keep reading for a step-by-step explainer.

## Get the changelog for a file in git

Git has a [log method](https://git-scm.com/docs/git-log) which shows the changes across the repo. Just type `git log` and you'll get a full history of the changes made:

```git
commit 8d5749faa98a16daf55b4eb0465ee67e7742c962 (HEAD -> master, origin/master, origin/HEAD)
Author: James Doc <***@jamesdoc.com>
Date:   Tue Dec 19 12:51:27 2023 +0000

    Add changelog for blog posts

commit 09779dabdc7c726e749ecf4f63de7c63c0b9ffaa
Author: James Doc <***@jamesdoc.com>
Date:   Mon Dec 18 16:13:02 2023 +0000

    Preload tinylytics
```

It's much more powerful than that though– by putting a specific filepath after that command you can narrow it down to just display the commits made on that file. Handy.

However, as you can see from the output above, there is a lot of fluff in there that we don't need. This is where the [pretty format modifier](https://git-scm.com/docs/pretty-formats#Documentation/pretty-formats.txt) comes in. For the changelog I want to display the date of the commit and the subject line, behind the scenes I also want the commit hash so I can link to it. This can be achieved with:

```bash
git log --pretty=tformat:"%h | %cs | %s" ./eleventy.js
# tformat - appends a new line after each commit
# %h  - Abbreviated commit hash
# %cs - Date formatted as YYYYMMDD
# %s  - Subject
# Replace ./eleventy.js with a file in your repo
```

This outputs something like

```git
68ae2d9 | 2023-12-18 | Add commit info to debug lines
0813ab2 | 2023-01-22 | Add albums to now
a153a4c | 2022-11-05 | Social previews
aae3fa2 | 2022-09-12 | Update now
909bef2 | 2022-09-12 | Misc performance tweaks
```

The pipes (` | `) are going to be important in a second.

## Running the git log command in Eleventy

Now that we have a git command that will get the history of a file, we now need to run that for each page that we're building[^slow]. To do this we're going to [create a filter in 11ty](https://www.11ty.dev/docs/filters/) which accepts a file path.

```javascript
// .eleventy.js (or wherever you store your filters)
const childProcess = require('child_process');

module.exports = function(eleventyConfig) {
  // The start of your 11ty config…

  eleventyConfig.addFilter("changelog", function(filePath) {
    // Run the git log command
    let fileHistory = childProcess
      .execSync(`git log --pretty=tformat:"%h | %cs | %s" ${filePath}`)
      .toString()
      .trim();

    // If the file isn't committed to git then ignore
    if (fileHistory == "") { return false }

    const fileLog = [];

    // Split the response on a new line (for each commit)
    fileHistory.split(/\r?\n/).forEach((change) => {
      // Split out the string at the pipe
      const commitInfo = change.split(' | ');
      // Destructure the array into named vars
      const [hash, date, subject] = commitInfo;
      // Create a new object with the commit history and push it to the log
      fileLog.push({hash, date, subject});
    });

    return fileLog;
  });

  // The rest of your 11ty config…
}
```

If you were to log this out to the console, for each file that is fed into the filter you would get an array formatted like this:

```javascript
// Input ./src/blog/2023/defaults-in-2023.md
[
  { hash: '62657ed', date: '2023-11-25', subject: 'Fix link' },
  { hash: '0ee9b8d', date: '2023-11-24', subject: 'Pocketcasts -> Pocket Casts' },
  { hash: 'd841313', date: '2023-11-24', subject: 'Add links' },
  { hash: 'cbd8031', date: '2023-11-24', subject: 'Default apps' }
]
```

With this as an array, we can now format it as we want on the frontend.

## Handing on the frontend

Because I _only_ want to display this changelog on blog posts, I am updating the post layout file (read about [layout in 11ty](https://www.11ty.dev/docs/layouts/). 11ty provides a bunch of [data at build time about the current page](https://www.11ty.dev/docs/data-eleventy-supplied/#page-variable) from which we can pull `page.inputPath`. This enables sending it through the filter that we have just created with `page.inputPath | changelog`. And from there we can format this as you want.

{% raw %}
```njk
{% set changeLog = page.inputPath | changelog %}
{% if changeLog %}
<ul role="list">
{% for change in changeLog %}
  <li>{{ change.date }} – <a href="{{ metadata.gitRepo }}commit/{{ change.hash }}" target="_blank" rel="noopener">{{ change.subject }}</a></li>
{% endfor %}
</ul>
{% endif %}
```
{% endraw %}

Add some CSS to make it all pretty, and job is a good 'un.

## Caveat

There are times where you may not want to display that you updated a post– e.g. you _may not_ want to admit how many typos you corrected in a post, etc… for that [rewriting your git history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) is an `amend` or a `rebase` away.

[^slow]: The health warning here is that for each page you run this on you're going to be extending your build time. If you are doing this over a lot of pages you may only want to run this on production builds only, cache the result, or something else.
