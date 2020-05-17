---
title: Dropbox Top Tip- Syncing Any Additional Folders [OS X]
type: article
tags: tech
date: 2011-05-13 18:36:00
---

As regular followers of this blog may know - I have [a lot of love for the piece of Software Dropbox](/blog/2010/you-dont-backup-foolish-a-simple-cheap-solution/); it is a nice quick and simple method of data backup online, and als facilitates syncing of data between many computers... very handy for me when I want to keep the files on my iMac and MacBook the same.

One of the frustations with the software is that, at the moment, you can only sync the files that are stored within the Dropbox, while you can set up the folder to be your Documents folder, any file stored outside this folder is ignored. However will a little bit of tech geekery you can set up any folder you want to appear within Dropbox.

The folder I wish to add to the Dropbox sync is my Sites folder, this is where I store all my web development tools, so it is pretty important for me to have everything in sync.

1. Exit Dropbox.
2. Open Terminal (don't freak out if you are not used to it).
3. Type the following command: `ln -s ~/Sites ~/Dropbox/`
4. Exit Terminal
5. Open Dropbox

What this does is tricks Dropbox into thinking that the Sites folder is stored inside by creating a symbolic link. You can of course set up any folder you want to appear within Dropbox, just replace ~/Sites with the path of the folder you wish to add. You'll need to do this for each computer you have Dropbox installed on.

If you haven't installed Dropbox yet you can get a free account from the <a href="https://www.dropbox.com/referrals/NTE2MzQzOQ">Dropbox Website</a>.
