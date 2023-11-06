import useCreateGeometry from "./hooks/useCreateGeometry";

interface EquirectGeometryProps {
  levelPropertiesList: { width: number }[];
}

export default function EquirectGeometry({ levelPropertiesList }: EquirectGeometryProps) {
  useCreateGeometry({
    type: 'equirect',
    levelPropertiesList,
  });
  
  return null;
}
