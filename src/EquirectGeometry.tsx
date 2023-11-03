import { useEffect } from "react";
import { EquirectGeometry as MarzipanoEquirectGeometry } from "marzipano";
import { useSceneContext } from "./Scene";

interface EquirectGeometryProps {
  levelPropertiesList: { width: number }[];
}

export default function EquirectGeometry({ levelPropertiesList }: EquirectGeometryProps) {
  const { setGeometry } = useSceneContext();

  useEffect(() => {
    const geometry = new MarzipanoEquirectGeometry(levelPropertiesList);
    setGeometry(geometry);
  }, [levelPropertiesList, setGeometry]);
  
  return null;
}
