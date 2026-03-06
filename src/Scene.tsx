import { createContext, useEffect, useMemo, useState } from "react";
import { Geometry, Scene as MarzipanoScene, Source, View } from "marzipano";
import { useViewerContext } from "./";

export interface SceneContext {
  setSource: (source: Source) => void;
  setGeometry: (geometry: Geometry) => void;
  setView: (view: View) => void;
  scene: MarzipanoScene | null;
}

export const Context = createContext<SceneContext>({
  setSource: () => {},
  setGeometry: () => {},
  setView: () => {},
  scene: null,
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
  const [sceneInstance, setSceneInstance] = useState<MarzipanoScene | null>(null);

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
    setSceneInstance(scene);

    if (onLoaded) {
      onLoaded(scene);
    }

    return () => {
      setSceneInstance(null);
      viewer.destroyScene(scene);
    };
  }, [viewerRef, viewer, source, geometry, view, pinFirstLevel, onLoaded]);

  const contextValue = useMemo<SceneContext>(() => ({
    setSource,
    setGeometry,
    setView,
    scene: sceneInstance,
  }), [setSource, setGeometry, setView, sceneInstance]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
