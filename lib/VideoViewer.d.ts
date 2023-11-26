/// <reference types="react" />
import { RectilinearViewLimit, RectilinearViewLimiter } from "marzipano";
interface VideoViewerProps {
    source: string;
    paused?: boolean;
    muted?: boolean;
    currentTime?: number;
    volume?: number;
    className?: string;
    style?: React.CSSProperties;
    levelPropertiesList?: {
        width: number;
    }[];
    params?: Partial<{
        yaw: number;
        pitch: number;
        roll: number;
        fov: number;
    }>;
    limiters?: (limit: RectilinearViewLimit) => RectilinearViewLimiter[];
    onAbort?: (video: HTMLVideoElement) => void;
    onCanPlay?: (video: HTMLVideoElement) => void;
    onCanPlayThrough?: (video: HTMLVideoElement) => void;
    onDurationChange?: (video: HTMLVideoElement) => void;
    onEmptied?: (video: HTMLVideoElement) => void;
    onEncrypted?: (video: HTMLVideoElement) => void;
    onPlay?: (video: HTMLVideoElement) => void;
    onPause?: (video: HTMLVideoElement) => void;
    onTimeUpdate?: (video: HTMLVideoElement) => void;
    onLoaded?: (video: HTMLVideoElement) => void;
    onEnded?: (video: HTMLVideoElement) => void;
    onLoadedData?: (video: HTMLVideoElement) => void;
    onLoadedMetadata?: (video: HTMLVideoElement) => void;
    onSeeked?: (video: HTMLVideoElement) => void;
    onSeeking?: (video: HTMLVideoElement) => void;
    onStalled?: (video: HTMLVideoElement) => void;
    onSuspend?: (video: HTMLVideoElement) => void;
    onVolumeChange?: (video: HTMLVideoElement) => void;
    onWaiting?: (video: HTMLVideoElement) => void;
    onError?: (video: HTMLVideoElement, error: Event) => void;
}
export default function VideoViewer({ source, paused, muted, currentTime, volume, className, style, levelPropertiesList, params, limiters, onAbort, onCanPlay, onCanPlayThrough, onDurationChange, onEmptied, onEncrypted, onPlay, onPause, onTimeUpdate, onLoaded, onEnded, onError, onLoadedData, onLoadedMetadata, onSeeked, onSeeking, onStalled, onSuspend, onVolumeChange, onWaiting, }: VideoViewerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
