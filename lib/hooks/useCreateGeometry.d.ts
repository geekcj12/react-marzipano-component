interface useCreateGeometryProps {
    type: 'cube' | 'equirect' | 'flat';
    levelPropertiesList: Record<string, unknown>[];
}
export default function useCreateGeometry({ type, levelPropertiesList }: useCreateGeometryProps): void;
export {};
