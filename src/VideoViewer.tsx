import { useEffect, useMemo, useRef } from "react";
import { RectilinearViewLimit, RectilinearViewLimiter } from "marzipano";
import Viewer from "./Viewer";
import Scene from "./Scene";
import SingleAssetSource from "./source/SingleAssetSource";
import VideoAsset from "./VideoAsset";
import EquirectGeometry from "./geometry/EquirectGeometry";
import RectilinearView from "./view/RectilinearView";

function waitForReadyState(
  element: HTMLVideoElement,
  readyState: number,
  interval: number,
  done: (arg1: any, arg2: boolean) => void,
) {
  const timer = setInterval(function() {
    if (element.readyState >= readyState) {
      clearInterval(timer);
      done(null, true);
    }
  }, interval);
}

interface VideoViewerProps {
  source: string;
  paused?: boolean;
  muted?: boolean;
  currentTime?: number;
  volume?: number;
  className?: string;
  style?: React.CSSProperties;
  levelPropertiesList?: { width: number }[];
  params?: Partial<{ yaw: number, pitch: number, roll: number, fov: number }>;
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

export default function VideoViewer({
  source,
  paused = false,
  muted = true,
  currentTime = 0,
  volume = 0,
  className,
  style,
  levelPropertiesList = [{ width: 1 }],
  params = { fov: Math.PI / 2 },
  limiters = (limit) => ([
    limit.vfov(90 * Math.PI / 180, 90 * Math.PI / 180)
  ]),
  onAbort,
  onCanPlay,
  onCanPlayThrough,
  onDurationChange,
  onEmptied,
  onEncrypted,
  onPlay,
  onPause,
  onTimeUpdate,
  onLoaded,
  onEnded,
  onError,
  onLoadedData,
  onLoadedMetadata,
  onSeeked,
  onSeeking,
  onStalled,
  onSuspend,
  onVolumeChange,
  onWaiting,
}: VideoViewerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const asset = useMemo(() => {
    if (!source) {
      return null;
    }

    const videoAsset = new VideoAsset();
    videoRef.current = document.createElement('video');

    const video = videoRef.current;
    video.src = source;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.muted = muted;
    video.currentTime = currentTime;
    video.volume = volume;
    video.load();

    waitForReadyState(video, video.HAVE_METADATA, 100, () => {
      waitForReadyState(video, video.HAVE_ENOUGH_DATA, 100, () => {
        videoAsset.setVideo(video);
      });
    });

    return videoAsset;
  }, [source]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;

    const eventHandlers: { [event: string]: (event?: Event) => void } = {
      abort: () => onAbort && onAbort(video),
      canplay: () => onCanPlay && onCanPlay(video),
      canplaythrough: () => onCanPlayThrough && onCanPlayThrough(video),
      durationchange: () => onDurationChange && onDurationChange(video),
      emptied: () => onEmptied && onEmptied(video),
      encrypted: () => onEncrypted && onEncrypted(video),
      play: () => onPlay && onPlay(video),
      pause: () => onPause && onPause(video),
      timeupdate: () => onTimeUpdate && onTimeUpdate(video),
      loaded: () => onLoaded && onLoaded(video),
      ended: () => onEnded && onEnded(video),
      error: (event?: Event) => onError && onError(video, event!),
      loadeddata: () => onLoadedData && onLoadedData(video),
      loadedmetadata: () => onLoadedMetadata && onLoadedMetadata(video),
      seeked: () => onSeeked && onSeeked(video),
      seeking: () => onSeeking && onSeeking(video),
      stalled: () => onStalled && onStalled(video),
      suspend: () => onSuspend && onSuspend(video),
      volumechange: () => onVolumeChange && onVolumeChange(video),
      waiting: () => onWaiting && onWaiting(video),
    };

    const addEventListener = (event: string, handler: () => void) => {
      if (handler) {
        video.addEventListener(event, handler);
      }
    };

    const removeEventListener = () => {
      Object.keys(eventHandlers).forEach((event) => {
        const handler = eventHandlers[event as keyof typeof eventHandlers];
        if (handler) {
          video.removeEventListener(event, handler);
        }
      });
    };

    Object.keys(eventHandlers).forEach((event) => addEventListener(event, eventHandlers[event]));

    return removeEventListener;
  }, [
    onAbort,
    onCanPlay,
    onCanPlayThrough,
    onDurationChange,
    onEmptied,
    onEncrypted,
    onEnded,
    onError,
    onLoaded,
    onLoadedData,
    onLoadedMetadata,
    onPause,
    onPlay,
    onSeeked,
    onSeeking,
    onStalled,
    onSuspend,
    onTimeUpdate,
    onVolumeChange,
    onWaiting
  ]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    paused ? video.pause() : video.play();
  }, [paused]);

  useEffect(() => {
    const video = videoRef.current;
    video && (video.muted = muted);
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    video && (video.currentTime = currentTime);
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    video && (video.volume = volume);
  }, [volume]);

  if (!asset) {
    return null;
  }
  
  return (
    <Viewer className={className} style={style}>
      <Scene>
        <SingleAssetSource asset={asset} />
        <EquirectGeometry levelPropertiesList={levelPropertiesList} />
         <RectilinearView
            params={params}
            limiters={limiters}
        />
      </Scene>
    </Viewer>
  );
}
