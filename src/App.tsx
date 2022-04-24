import { useEffect, useState } from "react";
import "./App.css";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const App: React.FC = (y) => {
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(-29.166775713057103);
  const [longitude, setLongitude] = useState(-51.51681979959098);
  
  function setDataLatitude(e: any) {
    e.preventDefault();
    setLatitude(e.target.elements.latitude.value);
  }

  function setDataLongitude(e: any) {
    e.preventDefault();
    setLongitude(e.target.elements.longitude.value);
  }

  useEffect(() => {
    let map = tt.map({
      key: `${process.env.REACT_APP_API_KEY_TOMTOM}`,
      container: "map",
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });
    setMap(map);

    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
      .setLngLat([longitude, latitude])
      .addTo(map);

      marker.on("dragend", (e) => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      })
    }



    addMarker();

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      {map && (
        <div className="app">
          <div id="map" />
          <div className="search-bar"></div>
          <h1>Pesquise</h1>
          <input
            type="text"
            placeholder="Digite a longitude"
            onChange={setDataLatitude}
          />
          <input
            type="text"
            placeholder="Digite a latitude"
            onChange={setDataLongitude}
          />
          <button>Pesquisar</button>
        </div>
      )}
    </>
  );
};

export default App;
