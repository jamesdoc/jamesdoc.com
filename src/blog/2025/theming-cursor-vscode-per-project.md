---
title: Theming VSCode or Cursor per repo
date: 2025-12-18
type: article
author: James Doc
intro: Do you ever find yourself juggling multiple VSCode or Cursor windows and struggling to quickly spot the right one? Customising your editor's theme per project is a quick config change that makes each window instantly recognisable.
leadImage: /_assets/img/blog/2025/vscode-theming.jpg
---

At work I'm in and out of many repos over the course of a day… and I'm bad at closing window. The result is that I often end up with at least five different Visual Studio Code or Cursor windows at one time. Finding the window that I want to write code in can be tricky when they all look the same.

As such I've recently started adding theme colours to each repo that I work on so I can quickly identify which window I want.

At the root of your repo you can add `.vscode/settings.json` which then overrides any global VSCode or Cursor config for the editor.

This is my config for this repo, which sets the outline for the window in this site's theme green:

```json
// .vscode/settings.json
{
  "workbench.colorCustomizations": {
    // Status Bar at the bottom of the window
    "statusBar.background" : "#a3de86",
    "statusBar.foreground" : "#1a1100",
    "statusBarItem.remoteBackground": "#a3de86",
    "statusBarItem.remoteForeground": "#1a1100",

    // Title bar at the top of the window (macos only I think)
    "titleBar.activeBackground": "#a3de86",
    "titleBar.activeForeground": "#1a1100",
    "titleBar.inactiveBackground": "#a3de86",
    "titleBar.inactiveForeground": "#1a1100",
    "titleBar.border": "#a3de86",

    // Window border around the entire window
    "window.activeBorder": "#a3de86",
    "window.inactiveBorder": "#a3de86",

    // Activity bar (left sidebar with the icons)
    // Might be a little bit overkill… I leave this commented out
    // "activityBar.background": "#a3de86",
    // "activityBar.dropBackground": "#a3de86",
    // "activityBar.foreground": "#1a1100",
    // "activityBarBadge.background": "#a3de86",
    // "activityBarBadge.foreground": "#1a1100",
  }
}
```

I cribbed this list from this gist: [workbench.colorCustomizations.json](https://gist.github.com/dcts/5b2af4c8b6918e7d35c4121f11d49fb1). The repos that I work on at [Beacon](https://beaconcrm.org/) are in their brand colours, etc, etc.
