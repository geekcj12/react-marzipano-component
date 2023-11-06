import { useEffect } from "react";
import { CubeGeometry, EquirectGeometry, FlatGeometry } from "marzipano"
import { useSceneContext } from "../Scene";

const GeometryMap = {
  cube: CubeGeometry,
  equirect: EquirectGeometry,
  flat: FlatGeometry,
};

interface useCreateGeometryProps<T extends any> {
  type: 'cube' | 'equirect' | 'flat';
  levelPropertiesList: T;
}

export default function useCreateGeometry<T extends any>({ type, levelPropertiesList }: useCreateGeometryProps<T>) {
  const { setGeometry } = useSceneContext();

  useEffect(() => {
    const geometry = new GeometryMap[type](levelPropertiesList as any);
    setGeometry(geometry);
  }, [levelPropertiesList, setGeometry]);
}
