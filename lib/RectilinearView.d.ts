interface RectilinearViewProps {
    params: Partial<{
        yaw: number;
        pitch: number;
        roll: number;
        fov: number;
    }>;
}
export default function RectilinearView({ params }: RectilinearViewProps): null;
export {};
