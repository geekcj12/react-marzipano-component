/// <reference types="react" />
import { RectilinearViewLimit, RectilinearViewLimiter } from "marzipano";
interface VideoViewerProps {
    source: string;
    className?: string;
    style?: React.CSSProperties;
    levelPropertiesList?: {
        width: number;
    }[];
    params?: Partial<{
        yaw: number;
        pitch: number;
        roll: number;
        fov: number;
    }>;
    limiters?: (limit: RectilinearViewLimit) => RectilinearViewLimiter[];
}
export default function VideoViewer({ source, className, style, levelPropertiesList, params, limiters }: VideoViewerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
