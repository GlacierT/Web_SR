import React, {Component, useState} from 'react'
import { Navbar} from 'react-bootstrap'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as stateData from "./data/us-state.json";
import mapStyles from "./mapStyles";

function Map() {

  const [selectedState, setSelectedState] = useState(null); 

   return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 40.6754, lng: -95.8612 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {stateData.features.map(state => (
        <Marker
          key={state.properties.STATE_ID}
          position={{
            lat: state.geometry.coordinates[0],
            lng: state.geometry.coordinates[1]
          }}
          onClick={() => {
            setSelectedState(state);
          }}
        />
      ))}

      {selectedState && (
        <InfoWindow
          position={{
            lat: selectedState.geometry.coordinates[0],
            lng: selectedState.geometry.coordinates[1]
          }}
          onCloseClick={() => {
            setSelectedState(null);
          }}
        >
          <div>
            <h2>{selectedState.properties.NAME}</h2>
            <p>{selectedState.properties.FACILITY}</p>
          </div>
        </InfoWindow>
      )}

    </GoogleMap>
   );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

class App extends Component
{

  render()
  {
    
    return (
      <main>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            US STATE MAP
          </Navbar.Brand>
        </Navbar>
        <div style={{ width: "100vw", height: "100vh" }}>
           <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
      </main>
    )
    }
}

export default App;