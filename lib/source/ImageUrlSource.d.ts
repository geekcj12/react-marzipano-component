import { ImageUrlSourceOpts, Rect, Tile } from "marzipano";
type ImageUrlSourceFromStringOpts = {
    cubeMapPreviewUrl?: string;
    cubeMapPreviewFaceOrder?: string;
};
interface ImageUrlSourceProps {
    source: string | ((tile: Tile) => {
        url: string;
        rect?: Rect;
    });
    options?: ImageUrlSourceFromStringOpts | ImageUrlSourceOpts;
}
export default function ImageUrlSource({ source, options }: ImageUrlSourceProps): null;
export {};
