import { useEffect, useRef, useState } from "react";
import "../App.css";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Navbar from "../components/Navbar";

const MapModelOne: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(-29.166775713057103);
  const [longitude, setLongitude] = useState(-51.51681979959098);

  const convertToPoints = (lngLat: tt.LngLat) => {
    return {
      point: {
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      },
    };
  };

  const addDeliveryMarker = (lngLat: tt.LngLat, map: tt.Map) => {
    const element = document.createElement("div");
    element.className = "marker-delivery";
    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };
    const destinations = [];

    let map = tt.map({
      key: `${process.env.REACT_APP_API_TOMTOM}`,
      container: mapElement.current,
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
      element.className = "marker-delivery";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });
    };
    addMarker();

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
    });

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      <Navbar />
      {map && (
        <div className="app">
          <div id="map" ref={mapElement}></div>
          <div className="search-bar">
            <label>Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
            />
            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MapModelOne;
