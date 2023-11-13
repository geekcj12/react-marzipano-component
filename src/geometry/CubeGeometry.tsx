import useCreateGeometry from "../hooks/useCreateGeometry";

interface CubeGeometryProps {
  levelPropertiesList: { tileSize: number; size: number; }[];
}

export default function CubeGeometry({ levelPropertiesList }: CubeGeometryProps) {
  useCreateGeometry({
    type: 'cube',
    levelPropertiesList,
  });

  return null;
}
