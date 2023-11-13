import { useEffect } from "react";
import { RectilinearView as MarzipanoRectilinearView, RectilinearViewLimit, RectilinearViewLimiter, util } from "marzipano";
import { useSceneContext } from "../Scene";

interface RectilinearViewProps {
  params?: Partial<{ yaw: number, pitch: number, roll: number, fov: number }>;
  limiters?: (limit: RectilinearViewLimit) => RectilinearViewLimiter[];
}

export default function RectilinearView({ params, limiters }: RectilinearViewProps) {
  const { setView } = useSceneContext();

  useEffect(() => {
    let limiter: RectilinearViewLimiter | null = null;

    if (limiters) {
      limiter = util.compose(...limiters(MarzipanoRectilinearView.limit));
    }
    
    const view = new MarzipanoRectilinearView(params, limiter ?? undefined);
    setView(view);
  }, [params, limiters, setView]);
  
  return null;
}
