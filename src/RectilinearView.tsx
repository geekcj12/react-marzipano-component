import { useEffect } from "react";
import { RectilinearView as MarzipanoRectilinearView } from "marzipano";
import { useSceneContext } from "./Scene";

interface RectilinearViewProps {
  params: Partial<{ yaw: number, pitch: number, roll: number, fov: number }>;
}

export default function RectilinearView({ params }: RectilinearViewProps) {
  const { setView } = useSceneContext();

  useEffect(() => {
    const view = new MarzipanoRectilinearView(params);
    setView(view);
  }, [params, setView]);
  
  return null;
}
