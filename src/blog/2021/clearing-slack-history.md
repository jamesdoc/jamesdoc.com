---
title: Clearing a Slack Channel History
type: article
author: James Doc
date: 2021-07-19
intro: …
themeColor: hsl(341, 77%, 50%)
---

Today I had the challenge of wiping a Slack workspace/team of all the chat history. There isn't a handy one click button to do this. The slow way around this is to go through each channel one by one, deleting the channel and then recreating it. This works with everything until you get to the `#general` channel (or whatever it was set up to be).

There are a couple of Chrome extensions which promise to go through a given channel and delete each message one by one. They either don't work, or would have charged me money to (probably) not work. They might have worked a while ago, however Slack has changed, updated APIs, etc, and now they are dead.

Further reading of the internet led me a solution which involved a _very small_ amount of code (Python) and toying with the Slack API.

<small>⚠️ Being a tech post relying on a third party API and code tinkering, give it a couple of ~~years~~ weeks and it'll be out of date like those Chrome extensions. The year of writing is 2021[^1].</small>

Slack Cleaner 2 or [slack_cleaner2](https://github.com/sgratzl/slack_cleaner2) is the library of choice for this exercise. As with most things in the Python world you can install it via pip (`pip3 install slack_cleaner2`), or pull it straight [into a Docker container](https://github.com/sgratzl/slack_cleaner2#docker) if that's your thing.

Slack Cleaner 2 is a wrapper around the Slack API, so you'll need an API key. In Slack API tools you'll need to:

1. [Create a new app](https://api.slack.com/apps?new_app=1), and pick which workspace/team you want it to work in. I called mine Slack Wiper…
2. Go to the _OAuth & Permissions_ section from the sidebar and give your new app _User Token Scopes_ (note: this is different from bot scopes). The scopes you need will vary depending on what you need to delete (public channel history, private channel history, 1-1 direct messages, etc). For deleting messages from a channel you need: `users:read`, `channels:read`, `channels:history`, `chat:write` [^2].
3. With the permissions set, you can then scroll to the top of the _OAuth & Permissions_ page, and click the _'Install to Workspace'_ button. This will ask you to double check the permissions and will then give you a _User OAuth Token_.

The API access is all setup, and the permissions are granted. In a text editor you can copy-and-pasta the following python code into a new file called `cleaner.py`, replacing the OAuth token, and channel name as appropriate:

```python
from slack_cleaner2 import SlackCleaner
s = SlackCleaner("PUT-YOUR-USER-OAUTH-TOKEN-HERE", sleep_for=1)

for msg in s.c['replace-with-channel-name'].msgs(with_replies=True):
  msg.delete()
```

_👆 For each message in the channel name (including message threads)… delete it._

Save that file somewhere sensible… like your desktop… (why not!) And then run it with:

```bash
python3 ~/Desktop/cleaner.py
```

<small>That's assuming that you saved it to the desktop… But you're smart right?</small>

It'll take it's time, just deleting a message each second. If you have a particularly large channel history it _may_ timeout, but you can run the same command again and it'll start again where it left off.

Other links that may be helpful:

- [Other helpful recipes beyond deleting everything in one channel](https://github.com/sgratzl/slack-cleaner/issues/79)
- [Slack Cleaner 2 Documentation](https://slack-cleaner2.readthedocs.io/en/latest/)

[^1]: If you tried this and this didn't work, please don't come crying to me. [Go cry over here](https://github.com/sgratzl/slack_cleaner2), and [then let me know where this post goes wrong](https://github.com/jamesdoc/jamesdoc.com/issues).
[^2]: There is a list of the other standard use cases in the [Slack Cleaner 2 readme](https://github.com/sgratzl/slack_cleaner2#user-token-scopes-by-use-case).
