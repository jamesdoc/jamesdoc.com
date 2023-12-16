---
title: Running Age of Empires 2 on Apple Silicon
type: article
author: James Doc
date: 2023-12-16
intro: Step by step guide to running Age of Empires Definitive Edition on Apple Silicon computers.
themeColor: hsl(7, 66%, 48%)
leadImage: /_assets/img/blog/2023/aoe2-macos.png
tags: ["tech", "software"]
---

My setup for running Age of Empires 2 is on M1 MacBook Pro running MacOS Sonoma (14.2), the following steps worked for me. Your milage may vary.

## Step One: Buy Age of Empires

If you don't own [Age of Empires II Definitive Edition](https://store.steampowered.com/app/813780/Age_of_Empires_II_Definitive_Edition/), buying it is a good place to start.

## Step Two: Download Porting Kit

To get AoE 2 running nicely on your Apple Silicon Mac you need to have a wrapper around the game that makes the game think that it is running on Windows. Porting Kit does that.

- [Download Porting Kit](https://www.portingkit.com/download)

You can read more about [what Porting Kits does](https://www.portingkit.com/about)… if you are so inclined.

## Step Three: Make Your Steam Profile Public

By making your Steam profile public Porting Kit can pull a list of the games that you own into a list quickly.

- Edit Profile
- Privacy Settings
- Game details: Public

## Step Four: Open up Porting Kit and Install the wrapper for AoE2:DE

You'll be asked for your Steam username, put that in, and then under Games > Steam Account you'll find Age of Empires 2, alongside other Windows games that you own.

Click the install button, and then step your way through the installer. It's all very normal. You'll even be asked for your password.

## Step Five: Install it again

Now that the wrapper has been installed you now need to actually install the game. In Porting Kit, go to Games > Installed and you'll see AoE in the list. You'll be able to click a Play button, which will open up Steam.

Sign into Steam, find Ages of Empires 2 Definitive Edition, and install it.

Once that is complete, you'll be able to play Age of Empires 2 Definitive Edition on your Apple Silicon Mac.

---

Point to note:

- Running this is very processor hungry– meaning that if you're running this on a laptop the battery is going to be drained very quickly.


---

This blog post replaces the [AoE2 on Big Sur](/blog/2020/aoe2-on-big-sur/) post, that for some reason still gets a lot of traffic!
