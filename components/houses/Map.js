import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { MAPBOX_ACCESS_TOKEN } = publicRuntimeConfig;


function Map({ houses }) {
 

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [
          houses[0].coordinates.latitude,
          houses[0].coordinates.longitude,
        ],
        zoom: 9,
      });
    }

    houses.forEach((house) => {

      new mapboxgl.Marker({ color: "rgb(255, 252, 59)" })
        .setLngLat([
          house.coordinates.latitude,
          house.coordinates.longitude,
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${house.title}</h3>
            <p>Location: ${house.location}</p>
            <p>Price: ${house.price}</p>`
          )
        )
        .addTo(map.current);
    });
  }, [houses]);

  return (
    <div>
      <h1>Mapa</h1>
      <div style={{ height: "400px" }} ref={mapContainer}></div>
    </div>
  );
}

export default Map;
