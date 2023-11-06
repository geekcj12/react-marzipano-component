import { RectilinearViewLimit, RectilinearViewLimiter } from "marzipano";
interface RectilinearViewProps {
    params?: Partial<{
        yaw: number;
        pitch: number;
        roll: number;
        fov: number;
    }>;
    limiters?: (limit: RectilinearViewLimit) => RectilinearViewLimiter[];
}
export default function RectilinearView({ params, limiters }: RectilinearViewProps): null;
export {};
