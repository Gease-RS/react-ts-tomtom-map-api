import tt from "@tomtom-international/web-sdk-services";
import ttmaps from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react" ;
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

export default function MapModelThree() {
    const [startLatitude, setStartLatitude] = useState("");
const [startLongitude, setStartLongitude] = useState("");
const [destinationLatitude, setDestinationLatitude] = useState("");
const [destinationLongitude, setDestinationLongitude] = useState("");
const [result, setResult] = useState({});
const mapElement = useRef<HTMLDivElement>({} as HTMLDivElement);
const [map, setMap] = useState({});
const [longitude, setLongitude] = useState(-121.91599);
const [latitude, setLatitude] = useState(37.36765);

useEffect(() => {
    let map = ttmaps.map({
      key: `${process.env.REACT_APP_API_TOMTOM}`,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude],
      zoom: 14
    });
    setMap(map);

  }, [])

  const calculateRoute = () => {
    tt.services
      .calculateRoute({
        key: `${process.env.REACT_APP_API_TOMTOM}`,
        locations: `${startLatitude},${startLongitude}:${destinationLatitude},${destinationLongitude}`
      })
      .then((routeData) => {    
        setResult(routeData);
        console.log(routeData);
        const data = routeData.toGeoJson()
        setResult(data);    
      })
      .catch((err) => {
        console.log(err);

      });
  };

  


  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <div>
        <h3>Start Location</h3>
        <input
          className="input"
          type="text"
          placeholder="Latitude"
          value={startLatitude}
          onChange={(e) => {
            setStartLatitude(e.target.value);
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Longitude"
          value={startLongitude}
          onChange={(e) => {
            setStartLongitude(e.target.value);
          }}
          required
        />
        <h3>Destination</h3>
        <input
          className="input"
          type="text"
          placeholder="Latitude"
          value={destinationLatitude}
          onChange={(e) => {
            setDestinationLatitude(e.target.value);
          }}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Longitude"
          value={destinationLongitude}
          onChange={(e) => {
            setDestinationLongitude(e.target.value);
          }}
          required
        />
      </div>
      <button
        onClick={(e) => {
          calculateRoute();
        }}
      >
        Calculate routeData
      </button>
      <div className="map" ref={mapElement}></div>
    </div>
  )
}

