---
title: Dropbox Top Tip- Syncing Any Additional Folders [OS X]
type: article
tags: tech
date: 2011-05-13 18:36:00
leadImage: http://img14.imageshack.us/img14/8682/dropbox.jpg
---
<p>As regular followers of this blog may know - I have <a href="http://www.jamesdoc.co.uk/2010/06/you-dont-backup-foolish-simple-cheap.html">a lot of love</a> for the piece of Software Dropbox; it is a nice quick and simple method of data backup online, and also&nbsp;facilitates syncing of data between many computers... very handy for me when I want to keep the files on my iMac and MacBook the same.</p>
<p>One of the frustations with the software is that, at the moment, you can only sync the files that are stored within the Dropbox, while you can set up the folder to be your Documents folder, any file stored outside this folder is ignored. &nbsp;However will a little bit of tech geekery you can set up any folder you want to appear within Dropbox.<br /><br />The folder I wish to add to the Dropbox sync is my Sites folder, this is where I store all my web development tools, so it is pretty important for me to have everything in sync.</p>
<ol><li>Exit Dropbox.</li><li>Open Terminal (don't freak out if you are not used to it).</li><li>Type the following command:</li><ul><li>ln -s ~/Sites ~/Dropbox/</li></ul><li>Exit Terminal</li><li>Open Dropbox</li></ol><p>What this does is tricks Dropbox into thinking that the Sites folder is stored inside by creating a symbolic link. &nbsp;You can of course set up any folder you want to appear within Dropbox, just replace ~/Sites with the path of the folder you wish to add. &nbsp;You'll need to do this for each computer you have Dropbox installed on.</p>
<p>If you haven't installed Dropbox yet you can get a free account from the <a href="https://www.dropbox.com/referrals/NTE2MzQzOQ">Dropbox Website</a>.</p>
