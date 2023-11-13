import { useEffect } from "react";
import { Asset, SingleAssetSource as MarzipanoSingleAssetSource } from "marzipano";
import { useSceneContext } from "../Scene";

interface SingleAssetSourceProps {
  asset: Asset;
}

export default function SingleAssetSource({ asset }: SingleAssetSourceProps) {
  const { setSource } = useSceneContext();

  useEffect(() => {
    setSource(new MarzipanoSingleAssetSource(asset));
  }, [asset, setSource]);
  
  return null;
}
