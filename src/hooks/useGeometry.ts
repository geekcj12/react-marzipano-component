import { CubeGeometry, EquirectGeometry, FlatGeometry } from "marzipano";

export default function useGeometry() {
  return {
    CubeGeometry: (levelPropertiesList: { size: number; tileSize: number; }[]) => {
      return new CubeGeometry(levelPropertiesList);
    },
    EquirectGeometry: (levelPropertiesList: { width: number }[]) => {
      return new EquirectGeometry(levelPropertiesList);
    },
    FlatGeometry: (levelPropertiesList: { width: number; tileWidth: number; height: number; tileHeight: number; }[]) => {
      return new FlatGeometry(levelPropertiesList);
    },
  };
}
