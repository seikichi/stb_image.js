importScripts('stb_image.js');

self.onmessage = function (event) {
  var url = event.data.url;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.responseType = 'arraybuffer';
  xhr.send(null);

  var buffer = xhr.response;
  var image = new STBImage(buffer, {
    TOTAL_MEMORY: 16777216 * 8
  });
  self.postMessage({
    data: image.data,
    width: image.width,
    height: image.height,
  });
};
