---
title: Running Age of Empires 2 on Big Sur
type: article
author: James Doc
date: 2020-12-28
intro: In an effort to avoid recreational coding during the Christmas break I've got Age of Empires 2 running on Big Sur…
---

As with all technical blog posts as the technology gets updated things will break - this post will probably become out of date very quickly.

My setup is a 2017 Macbook Pro running Big Sur, playing Age of Empires 2 HD (not the newer definitive edition)… This will almost certainly _not_ work with the new Apple hardware on Apple Silicon.

These steps are modified from [this gist](https://gist.github.com/contra/554f541f7fa93c12499e0829439860eb) which went out of date with Catalina.

## Step One - Get Age of Empires

I already had AoE HD edition purchased, if you already purchased AoE2, jump straight to step 2.

Create a [Steam account](https://store.steampowered.com/about/), and install Steam on MacOS. From there you'll be able to purchase AoE, but not install it.

## Step Two - Install PlayOnMac

If you have homebrew installed that's as simple as `brew install playonmac`

Otherwise, head over to [playonmac.com](https://www.playonmac.com/) and download the dmg and copy it across to your applications folder.

Open up PlayOnMac and jump through it's set up process.

## Step Three - Install Steam through PlayOnMac

You need to install the windows variant of Steam to enable you to download the Windows version of Age of Empires.

In PlayOnMac click the install button and search for Steam.

## Step Four - Tweak Steam start up settings

There is something interesting in steam so that while it'll boot out of the box, nothing appears in it's webviews, you just get a black void where there should be content.

Select Steam in PlayOnMac, and then click configure.

Under Arguments, set:

```
wine steam.exe -no-browser +open steam://open/minigameslist
```

In Wine configuration, set the Windows Version to be `Windows 7`

In display, set the Video memory size to be `1024`

This should get Steam going, double click on Steam to start it up.

## Step Five - Install Age of Empires 2

As you purchased AoE in step 1, AoE will be in your game list. You can download it through the miniview.

This took a long time to download for me… might just be me?

## Step Six - Adjust AoE's launcher.exe

Find where Age of Empires has installed on your hard drive. It should be something like:

```
~/Library/PlayOnMac/wineprefix/Steam/drive_c/Program\ Files\ \(x86\)/Steam/steamapps/common/Age2HD
```

In Finder you can press Cmd+Shift+G and paste that line in.

You'll find two `.exe` files there, one called `launcher.exe` and the other called `AoK HD.exe`

- Delete `Launcher.exe`
- Rename `AoK HD.exe` to `Launcher.exe`

## Maybe? Step Seven - Solve the Texture Problem.

[Luis Reid noted that there may be texture problems](https://twitter.com/luisrgtel/status/1376240158400462855), while I didn't have this issue, he did, and solved it by:

> In the Launcher.exe directory you will find `D3D9_DLLBACKUP` directory. Copy from that directory the DLL -> `d3dx9_43.dll` to the directory where `Launcher.exe` is. This solves the texture problem. [Ref](https://twitter.com/luisrgtel/status/1376242073003819012).

## Step Eight - Profit?

That was enough for me to be able to get AoE2 up and running. Your milage may vary. As I said, this pathway was modified from [this gist](https://gist.github.com/contra/554f541f7fa93c12499e0829439860eb), there are further helpful comments there which might help if you're on a different set up.
