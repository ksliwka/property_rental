import { useRouter } from "next/router";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import getConfig from "next/config";
import classes from "./Map.module.css";

const { publicRuntimeConfig } = getConfig();
const { MAPBOX_ACCESS_TOKEN } = publicRuntimeConfig;

function Map({ houses }) {
  const router = useRouter();
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
      function showDetailsHandler() {
        router.push("/" + house.id);
      }

      const popupContent = document.createElement("div");
      const image = document.createElement("img");
      image.src = house.image;
      image.alt = house.title;
      image.classList.add(classes.popupImage);
      popupContent.appendChild(image);

      const title = document.createElement("h3");
      title.textContent = house.title;
      title.classList.add(classes.popupTitle);
      popupContent.appendChild(title);

      const location = document.createElement("p");
      location.textContent = `Location: ${house.location}`;
      location.classList.add('text-muted')
      popupContent.appendChild(location);

      const price = document.createElement("p");
      price.textContent = `Price: ${house.price}`;
      price.classList.add('text-muted')
      popupContent.appendChild(price);

      const button = document.createElement("button");
      button.textContent = "Show Details";
      button.classList.add("btn", classes.popupButton);
      button.addEventListener("click", () => showDetailsHandler(house.id));
      popupContent.appendChild(button);

      new mapboxgl.Marker({ color: "black" })
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
