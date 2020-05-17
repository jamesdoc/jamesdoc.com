---
title: How to Install Google Quick Search Box for Windows
type: article
tags: tech
date: 2010-07-28 07:43:00
---

A while back I wrote top five list of light weight Mac apps that everyone should be using. Right at the top of that list was a program called QuickSilver. Recently the developer of this program has been hired by Google and they released an app called Google Quick Search Box, a program to launch applications through the keyboard rather than navigating the start menu with the mouse; you trigger it with a pre-defined shortcut and then type the first couple of letters of the program you want and the program appear. Very handy if you are faster at typing that you are at using a mouse!

Originally the Google Quick Search Box was only available for OS X computers, then Google bundled it with their Google Toolbar for Windows, which was nice because PC users could also have the launcher. However back in March it was removed from the Toolbar. At work I have been using Windows a lot recently, and having been missing it's features, so after a bit of searching and hunting, here is a five step guide to get Quick Search Box running in Windows again.

<ol><li>Download it! (<a href="http://dl.google.com/quick_search_box/1.2.1151.245/googlequicksearchboxsetup.exe">Click Me</a>)</li><li>Open up Command Prompt (Win+R and type 'cmd')</li><li>Navigate in Command Prompt to where the file is saved. eg: type 'CD C:/Users/JamesDoc/Downloads'</li><li>Type 'googlequicksearchboxsetup.exe /install /bundle=tbie /global /brand=GGLL /hl=en'</li><li>No step five!</li></ol>

Quick Search will be installed and you will then be able to configure it from the little button that appeared on your start menu.

Should you want to uninstall it, just follow the same steps, just replace step four with 'googlequicksearchboxsetup.exe /uninstall /bundle=tbie /global'

Update - Jaime has pointed out that the command prompt must be running with administrator privileges first.</div>
