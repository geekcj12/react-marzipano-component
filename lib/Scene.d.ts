/// <reference types="react" />
import { Geometry, Scene as MarzipanoScene, Source, View } from "marzipano";
interface SceneContext {
    setSource: (source: Source) => void;
    setGeometry: (geometry: Geometry) => void;
    setView: (view: View) => void;
}
export declare const Context: import("react").Context<SceneContext>;
interface SceneProps {
    children?: React.ReactNode;
    pinFirstLevel?: boolean;
    onLoaded?: (scene: MarzipanoScene) => void;
}
export default function Scene({ children, pinFirstLevel, onLoaded, }: SceneProps): import("react/jsx-runtime").JSX.Element;
export {};
