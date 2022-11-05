#!/bin/sh

mkdir ~/.local/share/fonts
cp src/_assets/fonts/space400.ttf ~/.local/share/fonts/space400.ttf
fc-cache -f -v
