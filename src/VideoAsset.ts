import { Asset } from 'marzipano';

export default class VideoAsset implements Asset {
  private _videoElement: HTMLVideoElement | null;
  private _destroyed: boolean;
  private _emitChange: any;
  private _lastTimestamp: number;
  private _emptyCanvas: HTMLCanvasElement;
  private _emitChangeIfPlayingLoop: any;
  private __events: any;
  
  constructor(videoElement?: HTMLVideoElement) {
    this._videoElement = null;
    this._destroyed = false;
    this._emitChange = this.emit.bind(this, 'change');
    this._lastTimestamp = -1;

    this._emptyCanvas = document.createElement('canvas');
    this._emptyCanvas.width = 1;
    this._emptyCanvas.height = 1;

    if (videoElement) {
      this.setVideo(videoElement);
    }
  }

  setVideo(videoElement: HTMLVideoElement) {
    var self = this;

    if (this._videoElement) {
      this._videoElement.removeEventListener('timeupdate', this._emitChange);
    }

    this._videoElement = videoElement;

    if (!this._videoElement) {
      return;
    }

    this._videoElement.addEventListener('timeupdate', this._emitChange);

    // Emit a change event on every frame while the video is playing.
    // TODO: make the loop sleep when video is not playing.
    if (this._emitChangeIfPlayingLoop) {
      cancelAnimationFrame(this._emitChangeIfPlayingLoop);
      this._emitChangeIfPlayingLoop = null;
    }

    function emitChangeIfPlaying() {
      if (self._videoElement && !self._videoElement.paused) {
        self.emit('change');
      }
      if (!self._destroyed) {
        self._emitChangeIfPlayingLoop = requestAnimationFrame(emitChangeIfPlaying);
      }
    }
    emitChangeIfPlaying();

    this.emit('change');
  }

  width() {
    if (this._videoElement) {
      return this._videoElement.videoWidth;
    } else {
      return this._emptyCanvas.width;
    }
  }

  height() {
    if (this._videoElement) {
      return this._videoElement.videoHeight;
    } else {
      return this._emptyCanvas.height;
    }
  }

  element() {
    // If element is null, show an empty canvas. This will cause a transparent
    // image to be rendered when no video is present.
    if (this._videoElement) {
      return this._videoElement;
    } else {
      return this._emptyCanvas;
    }
  }
  
  isDynamic() {
    return true;
  }

  timestamp() {
    if (this._videoElement) {
      this._lastTimestamp = this._videoElement.currentTime;
    }
    return this._lastTimestamp;
  }

  destroy() {
    this._destroyed = true;
    if (this._videoElement) {
      this._videoElement.removeEventListener('timeupdate', this._emitChange);
    }
    if (this._emitChangeIfPlayingLoop) {
      cancelAnimationFrame(this._emitChangeIfPlayingLoop);
      this._emitChangeIfPlayingLoop = null;
    }
  }

  addEventListener(event: string, fn: () => void) {
    var eventMap = this.__events = this.__events || {};
    var handlerList = eventMap[event] = eventMap[event] || [];
    handlerList.push(fn);
  }

  removeEventListener(event: string, fn: () => void) {
    var eventMap = this.__events = this.__events || {};
    var handlerList = eventMap[event];
    if (handlerList) {
      var index = handlerList.indexOf(fn);
      if (index >= 0) {
        handlerList.splice(index, 1);
      }
    }
  }

  emit(event: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
    var eventMap = this.__events = this.__events || {};
    var handlerList = eventMap[event];
    if (handlerList) {
      for (var i = 0; i < handlerList.length; i++) {
        var fn = handlerList[i];
        fn.call(this, arg1, arg2, arg3, arg4, arg5);
      }
    }
  }
}
