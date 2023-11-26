import { useEffect } from "react";
import { FlatViewLimit, FlatViewLimiter, FlatView as MarzipanoFlatView, util } from "marzipano";
import { useSceneContext } from "../";

interface FlatViewProps {
  params?: Partial<{x: number; y: number; zoom: number; mediaAspectRatio: number}>;
  limiters?: (limit: FlatViewLimit) => FlatViewLimiter[];
}

export default function FlatView({ params, limiters }: FlatViewProps) {
  const { setView } = useSceneContext();
  
  useEffect(() => {
    let limiter: FlatViewLimiter | null = null;
    
    if (limiters) {
      limiter = util.compose(...limiters(MarzipanoFlatView.limit));
    }
    
    const view = new MarzipanoFlatView(params ?? {}, limiter ?? undefined);
    setView(view);
  }, [params, limiters, setView]);

  return null;
}
