import { Asset } from 'marzipano';
export default class VideoAsset implements Asset {
    private _videoElement;
    private _destroyed;
    private _emitChange;
    private _lastTimestamp;
    private _emptyCanvas;
    private _emitChangeIfPlayingLoop;
    private __events;
    constructor(videoElement?: HTMLVideoElement);
    setVideo(videoElement: HTMLVideoElement): void;
    width(): number;
    height(): number;
    element(): HTMLVideoElement | HTMLCanvasElement;
    isDynamic(): boolean;
    timestamp(): number;
    destroy(): void;
    addEventListener(event: string, fn: () => void): void;
    removeEventListener(event: string, fn: () => void): void;
    emit(event: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void;
}
