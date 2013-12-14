#!/bin/bash

export EMCC_CFLAGS="-O3"

rm -rf stb_image.c
wget http://nothings.org/stb_image.c

tsc --noImplicitAny export.ts

emcc stb_image.c -o a.out.js \
    --pre-js pre.js \
    --post-js <(cat post.js export.js) \
    -s EXPORTED_FUNCTIONS="['_stbi_load','_stbi_image_free','FS']"

cat <(echo "(function(){") a.out.js  <(echo "})();") > dist/stb_image.js
rm -rf a.out.js
