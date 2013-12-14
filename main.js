var worker = new Worker('./main.worker.js');

worker.onmessage = function (event) {
  var image = event.data.image;
  var diff = event.data.diff;
  $('#time').html(diff);
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var context = canvas.getContext("2d");
  var imageData = context.createImageData(image.width, image.height);
  var source = image.data;
  var dest = imageData.data;
  if ('set' in dest) {
    dest.set(source);
  } else {
    for (var i = 0, len = dest.length; i < len; ++i) {
      dest[i] = source[i];
    }
  }
  context.putImageData(imageData, 0, 0);
  $('#output').html(canvas);
};
worker.onerror = function (error) {
  showError(error);
};

function showImage(file) {
  var url = (window.URL || window.webkitURL).createObjectURL(file);
  worker.postMessage({url: url});
}

function showError(message) {
  alert(message);
}

$('#file').on('change', function (event) {
  var file = event.target.files[0];
  showImage(file)
});

$('#drop-zone').on('dragover', function (jqEvent) {
  var event = jqEvent.originalEvent;
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
}).on('drop', function (jqEvent) {
  var event = jqEvent.originalEvent;
  event.stopPropagation();
  event.preventDefault();
  var file = event.dataTransfer.files[0];
  showImage(file)
});
