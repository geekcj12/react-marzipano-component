import React from 'react'
import { Viewer, Scene, EquirectGeometry, RectilinearView } from 'react-marzipano-component'

function App() {  
  return (
    <Viewer style={{ position: 'absolute', inset: 0 }}>
      <Scene source="//www.marzipano.net/media/equirect/angra.jpg">
        <EquirectGeometry levelPropertiesList={[{ width: 4000 }]} />
        <RectilinearView
          params={{ yaw: Math.PI }}
          limiters={(limit) => ([
            limit.traditional(1024, 100 * Math.PI / 180)
          ])}
        />
      </Scene>
    </Viewer>
  )
}

export default App
