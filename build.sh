#!/bin/bash

export EMCC_CFLAGS="-O3"

rm -rf stb_image.c
wget http://nothings.org/stb_image.c

tsc --noImplicitAny export.ts

emcc stb_image.c -o dist/stb_image.js \
    --post-js <(cat <(echo "(function() {") pre.js) \
    --post-js <(cat post.js export.js <(echo "})();")) \
    -s EXPORTED_FUNCTIONS="['_stbi_load','_stbi_image_free']"
