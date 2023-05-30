import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import getConfig from "next/config";
import classes from "./Map.module.css";

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
      const popupContent = document.createElement("div");
      const image = document.createElement("img");
      image.src = house.image;
      image.alt = house.title;
      image.classList.add(classes.popupImage); // Apply CSS class for styling
      popupContent.appendChild(image);

      const title = document.createElement("h3");
      title.textContent = house.title;
      title.classList.add(classes.popupTitle);
      popupContent.appendChild(title);

      // const location = document.createElement("p");
      // location.textContent = `Location: ${house.location}`;
      // popupContent.appendChild(location);

      const price = document.createElement("p");
      price.textContent = `Price: ${house.price}`;
      popupContent.appendChild(price);

      new mapboxgl.Marker({ color: "rgb(255, 252, 59)" })
        .setLngLat([house.coordinates.latitude, house.coordinates.longitude])
        .setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
        .addTo(map.current);
    });
  }, [houses]);

  return (
    <div>
      <div
        className={classes.map}
        style={{ height: "100vh" }}
        ref={mapContainer}
      ></div>
    </div>
  );
}

export default Map;
