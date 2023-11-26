import { createContext, useCallback, useEffect, useRef } from "react";
import { Geometry, Scene as MarzipanoScene, Source, View } from "marzipano";
import { useViewerContext } from "./";

interface SceneContext {
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
  const sceneRef = useRef<MarzipanoScene | null>(null);
  const sourceRef = useRef<Source | null>(null);
  const geometryRef = useRef<Geometry | null>(null);
  const viewRef = useRef<View | null>(null);

  const setSource = useCallback((source: Source) => {
    sourceRef.current = source;
  }, []);

  const setGeometry = useCallback((geometry: Geometry) => {
    geometryRef.current = geometry;
  }, []);

  const setView = useCallback((view: View) => {
    viewRef.current = view;
  }, []);

  useEffect(() => {
    const source = sourceRef.current;
    const geometry = geometryRef.current;
    const view = viewRef.current;
    
    if (!viewerRef || !viewer || !source || !geometry || !view) {
      return;
    }
    
    sceneRef.current = viewer.createScene({
      source,
      geometry,
      view,
      pinFirstLevel
    });

    sceneRef.current.switchTo();

    if (onLoaded) {
      onLoaded(sceneRef.current);
    }
  }, [viewerRef, viewer, pinFirstLevel, onLoaded]);
  
  return (
    <Context.Provider value={{ setSource, setGeometry, setView }}>
      {children}
    </Context.Provider>
  );
}
