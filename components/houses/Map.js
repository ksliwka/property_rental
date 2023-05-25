import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import classes from "./Map.module.css";
import { useRef, useState, useEffect } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2F0ZXBsdW05OSIsImEiOiJjbDdqN3F3MXgwdmd2M25zYWNpbzliYmk2In0.uw0jdxsDGljCb7YXqZbJdw";

function Map({ houses }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
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

      houses.forEach((house) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([
            house.coordinates.latitude,
            house.coordinates.longitude,
          ])
          .addTo(map.current);

        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${house.title}</h3>
          <p>Location: ${house.location}</p>
          <p>Price: ${house.price}</p>`
        );

        marker.setPopup(popup);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      });
    }
  }, [houses]);

  useEffect(() => {
    markers.forEach((marker) => marker.addTo(map.current));

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [markers]);

  return (
    <div>
      <h1>Mapa</h1>
      <div className={classes.map_container} ref={mapContainer}></div>
    </div>
  );
}

export default Map;

