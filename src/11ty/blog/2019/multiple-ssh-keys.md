---
title: Multiple BitBucket Accounts, Multiple SSH keys
type: article
author: James Doc
date: 2019-11-03
intro: Recently I found myself with the problem of having to set up a second account on BitBucket; one personal account, and one work account…
---

Recently I found myself with the problem after set up a second account on BitBucket; I had a personal account, and now required a separate work account.

This led to a whole manner of problems - each account requires a different `SSH` key for authentication. That in itself is fine, however each time I went to `git clone` I was getting back a `fatal: Could not read from remote repository` error.

## What's happening?

When doing the initial handshake with the BitBucket server my local computer offers up one `SSH` key after another, until it finds a key that BitBucket recognises. It's like working your way around different keys on your keychain until you find the right key for your door. However in my case the first key that BitBucket recognised is my personal `SSH` key, it knows that key, so authenticates as my personal account. My personal account did not have access to the repo, as a result I get back the error.

I need to make sure that the right `SSH` key is offered up each time I access a work or person repo.

## The solution

To fix this you need to make some additions to your `.ssh_config` file. If you're not familiar with `.ssh_config` files they make accessing remote machines quick and easy, Joël Perras has written a great post '[Simplify Your Life With an SSH Config File](https://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/). It's worth a quick read through…

Open up your `.ssh_config` file and add the following:

```
# Personal BitBucket
Host p-bitbucket.org
 HostName bitbucket.org
 User git
 IdentityFile ~/.ssh/[personal ssh key]
 IdentitiesOnly yes

# Work BitBucket
Host w-bitbucket.org
 HostName bitbucket.org
 User git
 IdentityFile ~/.ssh/[work ssh key]
 IdentitiesOnly yes
```

What this does is create two different alias for accessing your personal and work accounts, and offering up the right `SSH` keys with them.

## Testing it

You can verify if this work by testing with `ssh w-bitbucket.org` which should return:

```
logged in as your [work bitbucket username]
```

## Working with it…

This will mean that you need to make changes to how you clone a repo. Perviously you have have done something like `git clone git@bitbucket.org:user/repo`. Instead your clone command will need to reference the correct alias in your `.ssh_file`.

```
git clone w-bitbucket.org:user/repo
```

Note rather than git@bitbucket.org, I'm using the the custom `Host` that is set in the `.ssh_config` file.

---

I've written this for BitBucket because that is what I was using at the time, but the same _should_ work for GitHub, GitLabs, etc.
