import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";

mapboxgl.accessToken =
process.env.MAPBOX_ACCESS_TOKEN

function Map({ houses }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

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
    }

    houses.forEach((house) => {
      const markerElement = document.createElement("div");
      markerElement.style.width = "30px";
      markerElement.style.height = "30px";
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = "yellow";

      new mapboxgl.Marker({ element: markerElement })
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
