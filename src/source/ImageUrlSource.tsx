import { useEffect } from "react";
import { ImageUrlSource as MarzipanoImageUrlSource, ImageUrlSourceOpts, Rect, Tile } from "marzipano";
import { useSceneContext } from "../hooks";

type ImageUrlSourceFromStringOpts = {
  cubeMapPreviewUrl?: string;
  cubeMapPreviewFaceOrder?: string
};

interface ImageUrlSourceProps {
  source: string | ((tile: Tile) => { url: string; rect?: Rect; });
  options?: ImageUrlSourceFromStringOpts | ImageUrlSourceOpts;
}

export default function ImageUrlSource({ source, options }: ImageUrlSourceProps) {
  const { setSource } = useSceneContext();

  useEffect(() => {
    if (typeof source === 'string') {
      setSource(MarzipanoImageUrlSource.fromString(source, options as ImageUrlSourceFromStringOpts));
    } else {
      setSource(new MarzipanoImageUrlSource(source, options as ImageUrlSourceOpts));
    }
  }, [source, options, setSource]);
  
  return null;
}
