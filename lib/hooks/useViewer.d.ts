/// <reference types="react" />
import { Viewer, ViewerOpts } from "marzipano";
interface useViewerPropps {
    viewerOpts?: ViewerOpts;
}
export default function useViewer({ viewerOpts }: useViewerPropps): {
    viewerRef: import("react").MutableRefObject<HTMLDivElement | null>;
    viewer: Viewer | null;
};
export {};
