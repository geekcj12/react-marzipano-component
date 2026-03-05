import { createContext, useEffect, useMemo, useState } from "react";
import { Geometry, Scene as MarzipanoScene, Source, View } from "marzipano";
import { useViewerContext } from "./";

export interface SceneContext {
  setSource: (source: Source) => void;
  setGeometry: (geometry: Geometry) => void;
  setView: (view: View) => void;
}

export const Context = createContext<SceneContext>({
  setSource: () => {},
  setGeometry: () => {},
  setView: () => {},
});

interface SceneProps {
  children?: React.ReactNode;
  pinFirstLevel?: boolean;
  onLoaded?: (scene: MarzipanoScene) => void;
}

export default function Scene({
  children,
  pinFirstLevel = true,
  onLoaded,
}: SceneProps) {
  const { viewerRef, viewer } = useViewerContext();
  const [source, setSource] = useState<Source | null>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    if (!viewerRef || !viewer || !source || !geometry || !view) {
      return;
    }

    const scene = viewer.createScene({
      source,
      geometry,
      view,
      pinFirstLevel
    });

    scene.switchTo();

    if (onLoaded) {
      onLoaded(scene);
    }

    return () => {
      viewer.destroyScene(scene);
    };
  }, [viewerRef, viewer, source, geometry, view, pinFirstLevel, onLoaded]);

  const contextValue = useMemo<SceneContext>(() => ({
    setSource,
    setGeometry,
    setView,
  }), [setSource, setGeometry, setView]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
