import { useMemo } from "react";
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
  let timer = setInterval(function() {
    if (element.readyState >= readyState) {
      clearInterval(timer);
      done(null, true);
    }
  }, interval);
}

interface VideoViewerProps {
  source: string;
  className?: string;
  style?: React.CSSProperties;
  levelPropertiesList?: { width: number }[];
}

export default function VideoViewer({
  source,
  className,
  style,
  levelPropertiesList = [{ width: 1 }],
}: VideoViewerProps) {
  const asset = useMemo(() => {
    if (!source) {
      return null;
    }

    const videoAsset = new VideoAsset();
    const video = document.createElement('video');
    video.src = source;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.load();
    video.play();

    waitForReadyState(video, video.HAVE_METADATA, 100, () => {
      waitForReadyState(video, video.HAVE_ENOUGH_DATA, 100, () => {
        videoAsset.setVideo(video);
      });
    });

    return videoAsset;
  }, [source]);

  if (!asset) {
    return null;
  }
  
  return (
    <Viewer className={className} style={style}>
      <Scene>
        <SingleAssetSource asset={asset} />
        <EquirectGeometry levelPropertiesList={levelPropertiesList} />
         <RectilinearView
            params={{
              fov: Math.PI / 2,
            }}
            limiters={(limit) => ([
              limit.vfov(90 * Math.PI / 180, 90 * Math.PI / 180)
            ])}
        />
      </Scene>
    </Viewer>
  );
}
