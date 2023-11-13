import { useEffect } from "react";
import { ImageUrlSource as MarzipanoImageUrlSource, ImageUrlSourceOpts, Rect, Tile } from "marzipano";
import { useSceneContext } from "../Scene";

interface ImageUrlSourceProps {
  source: string | ((tile: Tile) => { url: string; rect?: Rect; });
  options?: { cubeMapPreviewUrl?: string; cubeMapPreviewFaceOrder?: string } | ImageUrlSourceOpts;
}

export default function ImageUrlSource({ source, options }: ImageUrlSourceProps) {
  const { setSource } = useSceneContext();

  useEffect(() => {
    if (typeof source === 'string') {
      setSource(MarzipanoImageUrlSource.fromString(source, options as any));
    } else {
      setSource(new MarzipanoImageUrlSource(source, options as any));
    }
  }, [source, options, setSource]);
  
  return null;
}
