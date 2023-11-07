import { useEffect, useRef, useState } from "react";
import { Viewer, ViewerOpts } from "marzipano";

interface useViewerPropps {
  viewerOpts?: ViewerOpts;
}

const defaultViewerOpts: ViewerOpts = {
  controls: {
    mouseViewMode: 'drag',
    scrollZoom: true,
  }
};

export default function useViewer({
  viewerOpts = defaultViewerOpts
}: useViewerPropps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    if (viewerRef.current && !viewer) {
      const viewer = new Viewer(viewerRef.current, viewerOpts);
      setViewer(viewer);
    }
  }, [viewer, viewerOpts]);

  return {
    viewerRef,
    viewer
  }
}
