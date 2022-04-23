import { useEffect, useState } from 'react';
import './App.css';
import tt from '@tomtom-international/web-sdk-maps';


const App: React.FC = () => {

  const [map, setMap] = useState({});

  useEffect(( ) => {
    let map = tt.map({
      "key": `${process.env.REACT_APP_TOMTOM_API_KEY}`,
      "container": 'map',
    })
    console.log('map', map)

    setMap(map)
    }, [])

  return (
    <>
      <div id="map"></div>
    </>
  );
}

export default App;



