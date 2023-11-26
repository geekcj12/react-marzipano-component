import { useEffect } from "react";
import { CubeGeometry, EquirectGeometry, FlatGeometry } from "marzipano"
import { useSceneContext } from "./";

const GeometryMap = {
  cube: CubeGeometry,
  equirect: EquirectGeometry,
  flat: FlatGeometry,
};

interface useCreateGeometryProps {
  type: 'cube' | 'equirect' | 'flat';
  levelPropertiesList: Record<string, unknown>[];
}

export default function useCreateGeometry({ type, levelPropertiesList }: useCreateGeometryProps) {
  const { setGeometry } = useSceneContext();

  useEffect(() => {
    const geometry = new GeometryMap[type](levelPropertiesList as any);
    setGeometry(geometry);
  }, [levelPropertiesList, type, setGeometry]);
}
