# React Marzipano Component

Use Marzipano in React through JSX syntax and components.

## Installation

```bash
npm install react-marzipano-component
# or
yarn add react-marzipano-component
# or
pnpm add react-marzipano-component
```

## Usage

### Single Resolution Cube

```tsx
import { Viewer, Scene, CubeGeometry, ImageUrlSource, RectilinearView } from 'react-marzipano-component'

export default function App() {  
  return (
    <Viewer style={{ position: 'absolute', inset: 0 }}>
      <Scene>
        <ImageUrlSource source="//www.marzipano.net/media/cubemap/{f}.jpg" />
        <CubeGeometry levelPropertiesList={[{ tileSize: 1024, size: 1024 }]} />
        <RectilinearView
          limiters={(limit) => ([
            limit.traditional(4096, 100 * Math.PI / 180)
          ])}
        />
      </Scene>
    </Viewer>
  );
}
```

### Multiresolution Flat

```tsx
import { Viewer, Scene, FlatGeometry, FlatView, ImageUrlSource } from 'react-marzipano-component'

export default function App() {
  const urlPrefix = '//www.marzipano.net/media/lisboa';

  const tileUrl = (z: number, x: number, y: number) => {
    return urlPrefix + "/l" + z + "/" + y + "/l" + z + '_' + y + '_' + x + ".jpg";
  };
  
  return (
    <Viewer style={{ position: 'absolute', inset: 0 }}>
      <Scene>
        <ImageUrlSource
          source={(tile) => ({ url: tileUrl(tile.z+1, tile.x+1, tile.y+1) })}
        />
        <FlatGeometry
          levelPropertiesList={[
            { width: 756,   height: 312,   tileWidth: 756, tileHeight: 756 },
            { width: 1512,  height: 624,   tileWidth: 756, tileHeight: 756 },
            { width: 3024,  height: 1248,  tileWidth: 756, tileHeight: 756 },
            { width: 6048,  height: 2496,  tileWidth: 756, tileHeight: 756 },
            { width: 12096, height: 4992,  tileWidth: 756, tileHeight: 756 },
            { width: 24192, height: 9984,  tileWidth: 756, tileHeight: 756 },
            { width: 48384, height: 19968, tileWidth: 756, tileHeight: 756 }
          ]}
        />

        <FlatView
          params={{ mediaAspectRatio: 48384/19968 }}
          limiters={(limit) => ([
            limit.resolution(48384),
            limit.letterbox(),
          ])}
        />
      </Scene>
    </Viewer>
  );
}
```

### Equirectangular

```tsx
import { Viewer, Scene, EquirectGeometry, ImageUrlSource, RectilinearView } from 'react-marzipano-component'

export default function App() {  
  return (
    <Viewer style={{ position: 'absolute', inset: 0 }}>
      <Scene>
        <ImageUrlSource source="//www.marzipano.net/media/equirect/angra.jpg" />
        <EquirectGeometry levelPropertiesList={[{ width: 4000 }]} />
        <RectilinearView
          params={{ yaw: Math.PI }}
          limiters={(limit) => ([
            limit.traditional(1024, 100 * Math.PI / 180)
          ])}
        />
      </Scene>
    </Viewer>
  );
}
```

### Video

```tsx
import { VideoViewer } from 'react-marzipano-component';

const videoSrc = '//www.marzipano.net/media/video/mercedes-f1-1280x640.mp4';

function App() {
  return (
    <VideoViewer
      source={videoSrc}
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}

export default App
```

## License

MIT
