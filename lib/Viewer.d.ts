/// <reference types="react" />
import { Viewer as MarzipanoViewer, ViewerOpts } from 'marzipano';
interface ViewerContext {
    viewerRef: React.RefObject<HTMLDivElement> | null;
    viewer: MarzipanoViewer | null;
}
export declare const useViewerContext: () => ViewerContext;
interface ViewerProps {
    children?: React.ReactNode;
    opts?: ViewerOpts;
    className?: string;
    style?: React.CSSProperties;
    onLoaded?: (viewer: MarzipanoViewer) => void;
}
export default function Viewer({ children, opts, className, style, onLoaded }: ViewerProps): import("react/jsx-runtime").JSX.Element;
export {};
