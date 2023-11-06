interface useCreateGeometryProps<T extends any> {
    type: 'cube' | 'equirect' | 'flat';
    levelPropertiesList: T;
}
export default function useCreateGeometry<T extends any>({ type, levelPropertiesList }: useCreateGeometryProps<T>): void;
export {};
