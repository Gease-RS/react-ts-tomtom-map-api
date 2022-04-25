import { useEffect, useRef, useState } from "react";
import "../App.css";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import ttapi from "@tomtom-international/web-sdk-services";
import Navbar from "../components/Navbar";

const RouterMapTwo: React.FC = () => {
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

  const drawRoute = (geoJson: any, map: tt.Map) => {
    if(map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": 'red',
        "line-width": 6,
      }
    })
  }
  
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
    const origin = new tt.LngLat(longitude, latitude);

    const destinations: tt.LngLat[] = [];

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
      element.className = "marker";
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

    const sortDestinations = (locations: any) => {
      const pointsForDestionations = locations.map((destination: tt.LngLat) => {
        return convertToPoints(destination);
      });
      const callParameters = {
        key: `${process.env.REACT_APP_API_TOMTOM}`,
        origins: [convertToPoints(origin)],
        destinations: pointsForDestionations,
      };
      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result: any, index: any) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a: any, b: any) => {
              return a.drivingtime - b.drivingtime;
            });

            const sortedLocations = resultsArray.map(
              (results: { location: any }) => {
                return results.location;
              }
            );
            resolve(sortedLocations);
          });
      });
    }

    const recalculateRoute = async () => {
      sortDestinations(destinations).then((sorted: any) => {
        sorted.unshift(origin)

        ttapi.services.calculateRoute({
          key: `${process.env.REACT_APP_API_TOMTOM}`,
          locations: sorted,
        })
        .then((routeData) => {
          const geoJson = routeData.toGeoJson();
          console.log(geoJson, "geoJson");
          drawRoute(geoJson, map);
        })

        /*ttapi.services
          .calculateRoute({
            key: `${process.env.REACT_APP_API_TOMTOM}`,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson()
            drawRoute(geoJson, map);
          });*/
      })
      
    }

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      recalculateRoute();
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

export default RouterMapTwo
