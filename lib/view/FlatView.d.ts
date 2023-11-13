import { FlatViewLimit, FlatViewLimiter } from "marzipano";
interface FlatViewProps {
    params?: Partial<{
        x: number;
        y: number;
        zoom: number;
        mediaAspectRatio: number;
    }>;
    limiters?: (limit: FlatViewLimit) => FlatViewLimiter[];
}
export default function FlatView({ params, limiters }: FlatViewProps): null;
export {};
