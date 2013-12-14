# stb_image.js
stb_image.js is a pure Javascript image decoder.

It is a port of the [stb_image.c](http://nothings.org/) by compiling the C code with Emscripten.

## Demo
- [http://seikichi.github.io/stb_image.js/](http://seikichi.github.io/stb_image.js/)

## Usage
```javascript
  var image = new STBImage(arrayBufferData);
  var width = image.width;
  var height = image.height;
  var pixels = image.data;
  image.close();
```

## Supported Image Formats
- JPEG baseline (no JPEG progressive)
- PNG 8-bit-per-channel only
- TGA (not sure what subset, if a subset)
- BMP non-1bpp, non-RLE
- PSD (composited view only, no extra channels)
- GIF (*comp always reports as 4-channel)
- HDR (radiance rgbE format)
- PIC (Softimage PIC)

## License
MIT
