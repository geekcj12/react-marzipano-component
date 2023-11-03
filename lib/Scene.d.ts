/// <reference types="react" />
import { Geometry, ImageUrlSource, Scene as MarzipanoScene, View } from "marzipano";
interface SceneContext {
    setGeometry: (geometry: Geometry) => void;
    setView: (view: View) => void;
}
export declare const useSceneContext: () => SceneContext;
interface SceneProps {
    children?: React.ReactNode;
    source: string | ImageUrlSource;
    onLoaded?: (scene: MarzipanoScene) => void;
}
export default function Scene({ children, source, onLoaded }: SceneProps): import("react/jsx-runtime").JSX.Element;
export {};
