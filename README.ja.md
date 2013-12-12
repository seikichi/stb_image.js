# stb_image.js
かきかけ

## これはなに？
- emscripten を用いて stb_image.c を JavaScript に移植したライブラリ
- 画像のデコードができる
-- 画像のバイナリデータをピクセルデータに復元できます
- Canvas を使っていないので，WebWorker でも画像のデコードが出来る
- フォーマット

## でも

## つかいかた
```
self.onmessage = function (event) {
  var url = event.data.url;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();
  var buffer = xhr.response;

  var image = new STBImage(buffer);
  self.postMessage({
    width: image.width,
    height: image.height,
    data: image.data
  }, [image.data.buffer]);
};
```

## らいせんす
- たぶんMIT

