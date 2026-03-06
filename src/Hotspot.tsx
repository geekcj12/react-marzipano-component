import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Hotspot as MarzipanoHotspot,
  HotspotOpts,
  RectilinearViewCoords,
  FlatViewCoords,
} from "marzipano";
import { useSceneContext } from "./hooks";

interface HotspotProps {
  children?: React.ReactNode;
  position: RectilinearViewCoords | FlatViewCoords;
  opts?: HotspotOpts;
}

export default function Hotspot({ children, position, opts }: HotspotProps) {
  const { scene } = useSceneContext();
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const hotspotRef = useRef<MarzipanoHotspot | null>(null);

  useEffect(() => {
    if (!scene) {
      return;
    }

    const container = scene.hotspotContainer();
    const hotspot = container.createHotspot(
      containerRef.current,
      position,
      opts
    );
    hotspotRef.current = hotspot;

    return () => {
      hotspotRef.current = null;
      container.destroyHotspot(hotspot);
    };
  }, [scene, position, opts]);

  return createPortal(children, containerRef.current);
}
