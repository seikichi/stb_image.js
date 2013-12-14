importScripts('stb_image.js');

STBImage.initialize({
  TOTAL_MEMORY: 16777216 * 8
});

self.onmessage = function (event) {
  var url = event.data.url;
  var start = Date.now();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.responseType = 'arraybuffer';
  xhr.send(null);

  var buffer = xhr.response;
  var image = new STBImage(buffer);
  var end = Date.now();
  self.postMessage({
    diff: end - start,
    image: {
      data: image.data,
      width: image.width,
      height: image.height,
    }
  });
  image.close();
};
