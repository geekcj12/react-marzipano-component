/// <reference types="react" />
import { Geometry, ImageUrlSourceOpts, Scene as MarzipanoScene, Rect, Tile, View } from "marzipano";
interface SceneContext {
    setGeometry: (geometry: Geometry) => void;
    setView: (view: View) => void;
}
export declare const useSceneContext: () => SceneContext;
interface SceneProps {
    children?: React.ReactNode;
    source: string | ((tile: Tile) => {
        url: string;
        rect?: Rect;
    });
    imageUrlSourceFromStringOptions?: {
        cubeMapPreviewUrl?: string;
        cubeMapPreviewFaceOrder?: string;
    };
    imageUrlSourceOptions?: ImageUrlSourceOpts;
    onLoaded?: (scene: MarzipanoScene) => void;
}
export default function Scene({ children, source, imageUrlSourceFromStringOptions, imageUrlSourceOptions, onLoaded, }: SceneProps): import("react/jsx-runtime").JSX.Element;
export {};
