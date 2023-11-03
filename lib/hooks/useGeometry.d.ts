import { CubeGeometry, EquirectGeometry, FlatGeometry } from "marzipano";
export default function useGeometry(): {
    CubeGeometry: (levelPropertiesList: {
        size: number;
        tileSize: number;
    }[]) => CubeGeometry;
    EquirectGeometry: (levelPropertiesList: {
        width: number;
    }[]) => EquirectGeometry;
    FlatGeometry: (levelPropertiesList: {
        width: number;
        tileWidth: number;
        height: number;
        tileHeight: number;
    }[]) => FlatGeometry;
};
