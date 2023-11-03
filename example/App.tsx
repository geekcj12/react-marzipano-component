import React from 'react'
import { Viewer, Scene, EquirectGeometry, RectilinearView } from '../lib/react-marzipano'

function App() {    
  return (
    <Viewer style={{ position: 'absolute', inset: 0 }}>
      <Scene source="//www.marzipano.net/media/equirect/angra.jpg">
        <EquirectGeometry levelPropertiesList={[{ width: 4000 }]} />
        <RectilinearView params={{ yaw: Math.PI }} />
      </Scene>
    </Viewer>
  )
}

export default App
