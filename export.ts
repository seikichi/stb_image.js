/// <reference path="./emscripten.d.ts"/>

declare var loadModule: (options: any) => typeof Module;

class STBImage {
  width: number;
  height: number;
  data: Uint8Array;
  _dataPtr: number;

  private static Module: typeof Module = null;
  private static filenameId: number = 0;

  static initialize(options: any): typeof Module {
    if (STBImage.Module === null) {
      STBImage.Module = loadModule(options);
    }
    return STBImage.Module;
  }

  constructor(buffer: ArrayBuffer) {
    var Module = STBImage.initialize({});
    var cwrap = Module['cwrap'];
    var ccall = Module['ccall'];
    var malloc: (size: number) => number =
      cwrap('malloc', 'number', ['number']);
    var free: (ptr: number) => number =
      cwrap('free', 'number', ['number']);
    var getValue = Module['getValue'];

    var filename = String(++STBImage.filenameId);
    var widthPtr = malloc(4);
    var heightPtr = malloc(4);
    var colorsPtr = malloc(4);
    (<any>Module)['FS_createDataFile']('/', filename, new Uint8Array(buffer), true, false);
    var dataPtr: number = this._dataPtr = ccall('stbi_load', 'number', [
      'string', 'number', 'number', 'number', 'number'], [
        filename, widthPtr, heightPtr, colorsPtr, 4]);
    this.width = getValue(widthPtr, 'i32');
    this.height = getValue(heightPtr, 'i32');
    var buffer: ArrayBuffer = Module['HEAP8'].buffer;
    this.data = new Uint8Array(buffer).subarray(
      dataPtr, dataPtr + this.width * this.height * 4);
    free(widthPtr);
    free(heightPtr);
    free(colorsPtr);
  }
  copyToImageData(imageData: ImageData): void {
    var source = this.data;
    var dest = imageData.data;
    if ('set' in dest) {
      dest.set(source);
    } else {
      for (var i = 0, len = dest.length; i < len; ++i) {
        dest[i] = source[i];
      }
    }
  }
  close(): void {
    var Module = STBImage.initialize({});
    var ccall = Module['ccall'];
    ccall('stbi_image_free', 'number', ['number'], [this._dataPtr]);
  }
}

STBImage.prototype['copyToImageData'] = STBImage.prototype.copyToImageData;
STBImage.prototype['close'] = STBImage.prototype.close;
STBImage['initialize'] = STBImage.initialize;

// export to node, amd, window or worker
declare var process: any;
declare var require: any;
declare var module: any;
declare var define: any;
declare var self: Window;

if (typeof process === 'object' && typeof require === 'function') { // NODE
  module['exports'] = STBImage;
} else if (typeof define === "function" && define.amd) { // AMD
  define('stb_image', <any>[], () => STBImage);
} else if (typeof window === 'object') { // WEB
  window['STBImage'] = STBImage;
} else if (typeof importScripts === 'function') { // WORKER
  self['STBImage'] = STBImage;
}
