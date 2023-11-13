import { ImageUrlSourceOpts, Rect, Tile } from "marzipano";
interface ImageUrlSourceProps {
    source: string | ((tile: Tile) => {
        url: string;
        rect?: Rect;
    });
    options?: {
        cubeMapPreviewUrl?: string;
        cubeMapPreviewFaceOrder?: string;
    } | ImageUrlSourceOpts;
}
export default function ImageUrlSource({ source, options }: ImageUrlSourceProps): null;
export {};
