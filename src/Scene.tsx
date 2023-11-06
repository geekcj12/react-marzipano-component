import { createContext, useContext, useEffect, useState } from "react";
import { Geometry, ImageUrlSource, ImageUrlSourceOpts, Scene as MarzipanoScene, Rect, Tile, View } from "marzipano";
import { useViewerContext } from "./Viewer";

interface SceneContext {
  setGeometry: (geometry: Geometry) => void;
  setView: (view: View) => void;
}

const Context = createContext<SceneContext>({
  setGeometry: () => {},
  setView: () => {},
});

export const useSceneContext = () => useContext(Context);

interface SceneProps {
  children?: React.ReactNode;
  source: string | ((tile: Tile) => { url: string; rect?: Rect; });
  imageUrlSourceFromStringOptions?: { cubeMapPreviewUrl?: string; cubeMapPreviewFaceOrder?: string };
  imageUrlSourceOptions?: ImageUrlSourceOpts;
  onLoaded?: (scene: MarzipanoScene) => void;
}

export default function Scene({
  children,
  source,
  imageUrlSourceFromStringOptions = {},
  imageUrlSourceOptions = {},
  onLoaded,
}: SceneProps) {
  const { viewerRef, viewer } = useViewerContext();
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    if (!viewerRef || !viewer || !geometry || !view) {
      return;
    }

    let imageUrlSource: ImageUrlSource;
      
    if (typeof source === 'string') {
      imageUrlSource = ImageUrlSource.fromString(source, imageUrlSourceFromStringOptions);
    } else {
      imageUrlSource = new ImageUrlSource(source, imageUrlSourceOptions);
    }
    
    const scene = viewer.createScene({
      source: imageUrlSource,
      geometry,
      view,
      pinFirstLevel: true
    });

    scene.switchTo();

    if (onLoaded) {
      onLoaded(scene);
    }

    return () => {
      if (scene) {
        scene.destroy();
      }
    }
  }, [viewerRef, viewer, onLoaded]);
  
  return (
    <Context.Provider value={{ setGeometry, setView }}>
      {children}
    </Context.Provider>
  );
}
