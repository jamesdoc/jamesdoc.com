#!/bin/sh

# Social preview images are rendered from SVG using system fonts
mkdir -p ~/.local/share/fonts
cp src/_assets/fonts/spaceGrotesk-regular.ttf ~/.local/share/fonts/spaceGrotesk-regular.ttf
fc-cache -f -v
