#!/usr/bin/env bash

sed 's/<path/<path fill="#1f232d"/' favicon.svg \
    | magick -background '#ffffff' -size 570x512 - \
             -gravity Center -extent 512x512 github.png

sed 's/<path/<path fill="#4f3829"/' favicon.svg \
    | magick -background '#f9f5d7' -size 570x512 - \
             -gravity Center -extent 512x512 ../www/images/favicon.webp

sed 's/<path/<path fill="#4f3829"/' favicon.svg \
    | magick -background '#f9f5d7' -size 570x512 - \
             -gravity Center -extent 512x512 ../www/avatar/avatar.webp

sed 's/<path/<path fill="#4f3829"/' favicon.svg \
    | magick -background '#f9f5d7' -size 570x512 - \
             -gravity Center -extent 512x512 ../overlay/quartz/static/icon.png

sed 's/<path/<path fill="#4f3829"/' favicon.svg \
| magick -background '#f9f5d7' -size 285x256 - \
         -gravity Center -extent 256x256 \
      \( -clone 0 -resize 128x128 \) \
      \( -clone 0 -resize  96x96 \) \
      \( -clone 0 -resize  64x64 \) \
      \( -clone 0 -resize  48x48 \) \
      \( -clone 0 -resize  32x32 \) \
      \( -clone 0 -resize  16x16 \) \
         -alpha off -colors 256 ../www/favicon.ico
