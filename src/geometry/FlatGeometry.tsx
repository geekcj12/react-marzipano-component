import useCreateGeometry from "../hooks/useCreateGeometry";

interface FlatGeometryProps {
  levelPropertiesList: { width: number; tileWidth: number; height: number; tileHeight: number; }[];
}

export default function FlatGeometry({ levelPropertiesList }: FlatGeometryProps) {
  useCreateGeometry({
    type: 'flat',
    levelPropertiesList,
  });
  
  return null;
}
