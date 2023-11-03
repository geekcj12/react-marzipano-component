declare module 'marzipano' {
  class Viewer {
    constructor(element: HTMLElement, options: ViewerOpts);
    breakIdleMovement: () => void;
    controls: () => Controls;
    createEmptyScene: (opts: ViewerCreateEmptySceneOpts) => Scene;
    createScene: (opts: ViewerCreateSceneOpts) => Scene;
    destroy: () => void;
    destroyAllScenes: () => void;
    destroyScene: (scene: Scene) => void;
    domElement: () => Element;
    hasScene: (scene: Scene) => boolean;
    listScenes: () => Scene[];
    lookTo: (opts: SceneLookToOpts, done: () => any) => void;
    movement: () => () => any;
    renderLoop: () => RenderLoop;
    scene: () => Scene;
    setIdleMovement(timeout: number, movement: () => any);
    stage: () => Stage;
    startMovement: (fn: () => any, done: () => any) => any;
    stopMovement: () => void;
    switchScene: (
      newScene: Scene,
      opts: {
        transitionDuration?: number,
        transitionUpdate?: number,
      },
      done: () => any
    ) => void;
    updateSize: () => void;
    view: () => View;
    addEventListener: (name: ViewerEventName, fn: () => any) => void;
    removeEventListener: (name: ViewerEventName, fn: () => any) => void;
  }

  class Controls {
    addMethodGroup: (groupId: string, methodIds: string[]) => void;
    attach: (renderLoop: RenderLoop) => void;
    attached: () => boolean;
    destroy: () => void;
    detach: () => void;
    disable: () => void;
    disableMethod: (id: string) => void;
    disableMethodGroup: (groupId: string) => void;
    enable: () => void;
    enabled: () => boolean;
    enableMethod: (id: string) => void;
    enableMethodGroup: (groupId: string) => void;
    method: (id: string) => ControlMethod;
    methodGroups: () => any[];
    methods: () => ControlMethod[];
    registerMethod: (id: string, instance: ControlMethod, enable: boolean) => void;
    removeMethodGroup: (groupId: string) => void;
    unregisterMethod: (id: string) => void;
  }

  class RenderLoop {
    constructor(stage: Stage)
    destroy: () => void;
    renderOnNextFrame: () => void;
    stage: () => Stage;
    start: () => void;
    stop: () => void;
    addEventListener: (name: 'afterRender' | 'beforeRender', fn: () => any) => void;
    removeEventListener: (name: 'afterRender' | 'beforeRender', fn: () => any) => void;
  }

  class RectilinearView implements View {
    constructor(params?: Partial<RectilinearViewParams>, limiter?: RectilinearViewLimiter);
    static limit: RectilinearViewLimit;
    type: string;
    coordinatesToPerspectiveTransform: (coords: RectilinearViewCoords, radius: number, extraTransforms: string) => string;
    coordinatesToScreen: (coords: RectilinearViewCoords, result?: Coords) => Coords;
    destroy: () => void;
    fov: () => number;
    height: () => number;
    intersects: (rectangle: any) => void;
    inverseProjection: () => any;
    limiter: () => RectilinearViewLimiter | null;
    normalizeToClosest: (coords: RectilinearViewCoords, result: RectilinearViewCoords) => void;
    offsetFov: (fovOffset: number) => void;
    offsetPitch: (pitchOffset: number) => void;
    offsetRoll: (rollOffset: number) => void;
    offsetYaw: (yawOffset: number) => void;
    parameters: (obj?: RectilinearViewParams) => RectilinearViewParams;
    pitch: () => number;
    projection: () => any;
    roll: () => number;
    screenToCoordinates: (coords: Coords, result?: RectilinearViewCoords) => RectilinearViewCoords;
    selectLevel: (levelList: any[]) => any;
    setFov: (fov: number) => void;
    setLimiter: (limiter: RectilinearViewLimiter | null) => void;
    setParameters: (params: RectilinearViewParams) => void;
    setPitch: (pitch: number) => void;
    setRoll: (roll: number) => void;
    setSize: (size: Size) => void;
    setYaw: (yaw: number) => void;
    size: (size?: Size) => Size;
    width: () => number;
    yaw: () => number;
    addEventListener: (name: 'change' | 'resize', fn: (e?: any) => any) => void;
    removeEventListener: (name: 'change' | 'resize', fn: (e?: any) => any) => void;
  }

  class FlatView implements View {
    constructor(params: Partial<FlatViewParams>, limiter?: FlatViewLimiter);
    static limit: FlatViewLimit;
    type: string;
    coordinatesToScreen: (coords: FlatViewCoords, result?: Coords) => Coords;
    destroy: () => void;
    height: () => number;
    intersects: (rectangle: any) => void;
    inverseProjection: () => any;
    limiter: () => FlatViewLimiter | null;
    mediaAspectRatio: () => number;
    offsetX: (xOffset: number) => void;
    offsetY: (yOffset: number) => void;
    offsetZoom: (zoomOffset: number) => void;
    parameters: (paramsopt?: FlatViewParams) => FlatViewParams;
    projection: () => any;
    screenToCoordinates: (coords: Coords, result?: FlatViewCoords) => FlatViewCoords;
    selectLevel: (levelList: any[]) => any;
    setLimiter: (limiter?: FlatViewLimiter) => void;
    setMediaAspectRatio: (mediaAspectRatio: number) => void;
    setParameters: (params: FlatViewParams) => void;
    setSize: (size: Size) => void;
    setX: (x: number) => void;
    setY: (y: number) => void;
    setZoom: (zoom: number) => void;
    size: (size?: Size) => Size;
    width: () => number;
    x: () => number;
    y: () => number;
    zoom: () => number;
    addEventListener: (name: 'change' | 'resize', fn: (e?: any) => any) => void;
    removeEventListener: (name: 'change' | 'resize', fn: (e?: any) => any) => void;
  }

  class EquirectGeometry implements Geometry {
    constructor(levelPropertiesList: { width: number }[]);
    type: string;
    visibleTiles: (view: View, level: number) => Tile[];
    levelList?: any[];
  }

  class CubeGeometry implements Geometry {
    constructor(levelPropertiesList: { size: number; tileSize: number; }[]);
    type: string;
    visibleTiles: (view: MarzipanoView, level: any) => Tile[];
  }

  class FlatGeometry implements Geometry {
    constructor(levelPropertiesList: { width: number; tileWidth: number; height: number; tileHeight: number; }[]);
    type: string;
    visibleTiles: (view: View, level: any) => Tile[];
  }

  class ImageUrlSource implements Source {
    constructor(sourceFromTile: (tile: Tile) => { url: string; rect?: Rect }, opts: ImageUrlSourceOpts);
    static fromString(url: string, opts: { cubeMapPreviewUrl?: string; cubeMapPreviewFaceOrder?: string }): Source;
    loadAsset: (stage: Stage, tile: Tile, done: () => any) => () => any;
  }

  class Scene {
    constructor(viewer: Viewer, view: View);
    id: number;
    createLayer: (opts: SceneCreateLayerOpts) => Layer;
    destroy: () => void;
    destroyAllLayers: () => void;
    destroyLayer: (layer: Layer) => void;
    hotspotContainer: () => HotspotContainer;
    layer: () => Layer;
    listLayers: () => Layer[];
    lookTo: (
      params: any,
      opts: SceneLookToOpts,
      done?: () => any
    ) => void;
    movement: () => () => any;
    startMovement: (fn: () => any, done: () => any) => void;
    stopMovement: () => void;
    switchTo: (opts?: any, done?: () => any) => void;
    view: () => View;
    viewer: () => Viewer;
    visible: () => boolean;
    addEventListener: (name: 'layerChange' | 'viewChange', fn: () => any) => void;
    removeEventListener: (name: 'layerChange' | 'viewChange', fn: () => any) => void;
  }

  class Layer {
    constructor(source: Source, geometry: Geometry, view: View, textureStore: TextureStore, opts?: LayerOpts);
    destroy: () => void;
    effects: () => Effects;
    fixedLevel: () => number | null;
    geometry: () => Geometry;
    mergeEffects: (effects: Effects) => void;
    pinFirstLevel: () => void;
    pinLevel: (levelIndex: number) => void;
    setEffects: (effects: Effects) => void;
    setFixedLevel: (levelIndex: number | null) => void;
    source: () => Source;
    textureStore: () => TextureStore;
    unpinFirstLevel: () => void;
    unpinLevel: (levelIndex: number) => void;
    view: () => View;
    addEventListener: (name: 'renderComplete', fn: () => any) => void;
    removeEventListener: (name: 'renderComplete', fn: () => any) => void;
  }

  class HotspotContainer {
    constructor(parentDomElement: Element, stage: Stage, view: View, renderLoop: RenderLoop, opts: { rect: RectSpec });
    createHotspot: (domElement: Element, coords: RectilinearViewCoords | FlatViewCoords, opts?: HotspotOpts) => Hotspot;
    destroy: () => void;
    destroyHotspot: (hotspot: Hotspot) => void;
    domElement: () => any;
    hasHotspot: (hotspot: Hotspot) => boolean;
    hide: () => void;
    listHotspots: () => Hotspot[];
    rect: () => Rect;
    setRect: (rect: Rect) => void;
    show: () => void;
    addEventListener: (name: 'hotspotsChange', fn: () => any) => void;
    removeEventListener: (name: 'hotspotsChange', fn: () => any) => void;
  }

  class Hotspot {
    constructor(domElement: Element, view: View, coords: RectilinearViewCoords | FlatViewCoords, opts: HotspotOpts);
    destroy: () => void;
    domElement: () => Element;
    hide: () => void;
    perspective: () => object;
    position: () => object;
    setPerspective: (perspective: object) => void;
    setPosition: (position: object) => void;
    show: () => void;
  }

  class TextureStore {
    constructor(source: Source, stage: Stage, opts: TextureStoreOpts);
    clear: () => void;
    clearNotPinned: () => void;
    destroy: () => void;
    endFrame: () => void;
    markTile: (tile: Tile) => void;
    pin: (tile: Tile) => number;
    query: (tile: Tile) => TileState;
    source: () => Source;
    stage: () => Stage;
    startFrame: () => void;
    unpin: (tile: Tile) => number;
    addEventListener: (name: TextureStoreEventName, fn: () => any) => void;
    removeEventListener: (name: TextureStoreEventName, fn: () => any) => void;
  }

  interface ViewerCreateSceneOpts {
    view: View;
    source: Source;
    geometry: Geometry;
    pinFirstLevel?: boolean;
    textureStoreOpts?: TextureStoreOpts;
    layerOpts?: LayerOpts;
  }

  export interface View {
    type: string;
    addEventListener: (name: 'change', fn: (e?: any) => any) => void;
    removeEventListener: (name: 'change' | 'resize', fn: (e?: any) => any) => void;
  }

  export interface ViewerOpts {
    controls?: {
      controls?: Controls;
      element?: Element;
      mouseViewMode?: 'drag' | 'qtvr';
      dragMode?: 'pan' | 'pinch';
      scrollZoom?: boolean;
    };
    stage?: {};
    cursors?: {
      drag?: any;
    };
  }

  interface Stage {
    type: string; // "webgl", "css" and "flash"
    addLayer: (layer: Layer, i: number | undefined) => void;
    createTexture: (tile: Tile, asset: Asset, done: () => any) => void;
    destroy: () => void;
    domElement: () => any;
    endFrame: () => any;
    hasLayer: (layer: Layer) => boolean;
    height: () => number;
    listLayers: () => Layer[];
    loadImage: (url: string, rect: Rect, done: () => any) => () => any;
    moveLayer: (layer: Layer, i: number) => void;
    registerRenderer: (geometryType: string, viewType: string, Renderer: any) => void;
    removeAllLayers: () => void;
    removeLayer: (layer: Layer) => void;
    render: () => void;
    setSize: (size: Size) => void;
    setSizeForType: (size: Size) => void;
    size: (size?: Size) => void;
    startFrame: () => void;
    validateLayer: (layer: Layer) => void;
    width: () => number;
    // Events
    addEventListener: (name: 'renderComplete' | 'renderInvalid', fn: () => any) => void;
    removeEventListener: (name: 'renderComplete' | 'renderInvalid', fn: () => any) => void;
  }
  
  interface ControlMethod {
    active: any;
    inactive: any;
    parameterDynamics: any;
  }

  interface ImageUrlSourceOpts {
    /**
     * Maximum number of tiles to request at the same time. The limit is per ImageSourceUrl instance. The default is 4.
     */
    concurrency?: number;
    /**
     * Time in milliseconds to wait before retrying a failed request. The default is 10000.
     */
    retryDelay?: number;
  }

  interface Tile {
    cmp: (that: Tile) => number;
    equals: (that: Tile) => boolean;
    hash: () => number
  }

  interface RectilinearViewParams {
    yaw: number;
    pitch: number;
    roll: number;
    fov: number;
  }

  type RectilinearViewLimiter = (params: RectilinearViewParams) => RectilinearViewParams;

  interface RectilinearViewLimit {
    hfov: (min: number, max: number) => RectilinearViewLimiter,
    pitch: (min: number, max: number) => RectilinearViewLimiter,
    resolution: (size: number) => RectilinearViewLimiter,
    roll: (min: number, max: number) => RectilinearViewLimiter,
    traditional: (maxResolution: number, maxVFov: number, maxHFov?: number) => RectilinearViewLimiter,
    vfov: (min: number, max: number) => RectilinearViewLimiter,
    yaw: (min: number, max: number) => RectilinearViewLimiter,
  }

  interface RectilinearViewCoords {
    yaw: number;
    pitch: number;
  }

  interface Coords {
    x: number;
    y: number;
  }

  interface FlatViewCoords {
    x: number;
    y: number;
  }

  interface Size {
	  width: number;
	  height: number
  }

  interface ViewerCreateEmptySceneOpts {
    view: View;
  }

  interface SceneCreateLayerOpts {
    source: Source;
    geometry: Geometry;
    pinFirstLevel?: boolean;
    textureStoreOpts?: TextureStoreOpts;
    layerOpts?: LayerOpts;
  }

  interface Source {
    loadAsset: (stage: Stage, tile: Tile, done: () => any) => () => any
  }

  interface Geometry {
    type: string;
    visibleTiles: (view: View, level: number) => Tile[];
    levelList?: any[];
  }

  interface TextureStoreOpts {
    previouslyVisibleCacheSize: number;
  }

  interface LayerOpts {
    effects: Effects;
  }

  interface Effects {
    opacity: number;
    rect: RectSpec;
    colorOffset: any;
    colorMatrix: any;
    textureCrop: Rect;
  }

  interface RectSpec {
    relativeX: number;
    relativeY: number;
    relativeWidth: number;
    relativeHeight: number
    absoluteX: number;
    absoluteY: number;
    absoluteWidth: number
    absoluteHeight: number;
  }

  interface TileState {
    visible: boolean;
    previouslyVisible: boolean;
    hasAsset: boolean;
    hasTexture: boolean;
    pinned: boolean;
    pinCount: boolean;
  }

  type TextureStoreEventName = 'textureCancel' | 'textureError' | 'textureInvalid' | 'textureLoad' | 'textureStartLoad' | 'textureUnload';

  interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface HotspotOpts {
    perspective: {
      radius?: number;
      extraTransforms?: string;
    };
  }

  interface FlatViewParams {
    x: number;
    y: number;
    zoom: number;
    mediaAspectRatio: number;
  }

  type FlatViewLimiter = (params: FlatViewParams) => FlatViewParams;

  interface FlatViewLimit {
    letterbox: () => FlatViewLimiter;
    resolution: (size: number) => FlatViewLimiter;
    visibleX: (min: number, max: number) => FlatViewLimiter;
    visibleY: (min: number, max: number) => FlatViewLimiter;
    x: (min: number, max: number) => FlatViewLimiter;
    y: (min: number, max: number) => FlatViewLimiter;
    zoom: (min: number, max: number) => FlatViewLimiter;
  }

  interface SceneLookToOpts {
    ease?: () => any,
    controlsInterrupt?: boolean;
    transitionDuration?: number;
    closest?: boolean;
  }

  type ViewerEventName = 'sceneChange' | 'viewChange';

  namespace util {
    function compose<T extends Function>(...functions: T[]): T;
    function degToRad(deg: number): number;
    function mod(divided: number, divisor: number): number;
    function radToDeg(rad: number): number;
  }
}
