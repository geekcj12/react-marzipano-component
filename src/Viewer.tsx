import { createContext, useEffect } from "react";
import { Viewer as MarzipanoViewer, ViewerOpts } from 'marzipano';
import useViewer from "./hooks/useViewer";

interface ViewerContext {
  viewerRef: React.RefObject<HTMLDivElement> | null;
  viewer: MarzipanoViewer | null;
}

const defaultValue: ViewerContext = {
  viewerRef: null,
  viewer: null,
};

export const Context = createContext<ViewerContext>(defaultValue);

interface ViewerProps {
  children?: React.ReactNode;
  opts?: ViewerOpts;
  className?: string;
  style?: React.CSSProperties;
  onLoaded?: (viewer: MarzipanoViewer) => void;
}

export default function Viewer({ children, opts, className, style, onLoaded }: ViewerProps) {
  const { viewerRef, viewer } = useViewer({ viewerOpts: opts });

  useEffect(() => {
    if (!viewerRef.current || !viewer) {
      return;
    }
    if (onLoaded) {
      onLoaded(viewer);
    }
  }, [viewerRef, viewer, onLoaded]);
  
  return (
    <div
      ref={viewerRef}
      className={className}
      style={style}
    >
      <Context.Provider value={{ viewerRef, viewer }}>
        {children}
      </Context.Provider>
    </div>
  )
}
